'use client';

import Link from 'next/link';
import { useState, type FormEvent, type ReactNode } from 'react';
import { ButtonLink, buttonVariants } from '@/components/ui/Button';
import { Honeypot } from '@/components/ui/Honeypot';
import { TextField } from '@/components/ui/TextField';
import { shopModeCopy, shopTerms } from '@/content/shop';
import { fieldErrorsFrom, readApiError, type FieldErrors } from '@/lib/forms';
import { cartStore } from '@/lib/shop/cart-store';
import { formatOrderTotal, orderListMailBody, type ResolvedLine, type ShopRequestKind } from '@/lib/shop/order';
import { formatPrice } from '@/lib/shop/price';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';
import { shopCustomerSchema } from '@/types/shop';

type CheckoutFormProps = {
  readonly lines: readonly ResolvedLine[];
  readonly kind: ShopRequestKind;
  readonly onSent: () => void;
};

type SubmitState =
  | { readonly status: 'idle' }
  | { readonly status: 'sending' }
  | { readonly status: 'failed'; readonly message: string };

const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name', type: 'text', wide: true },
  { name: 'street', label: 'Straße & Hausnummer', autoComplete: 'street-address', type: 'text', wide: true },
  { name: 'postalCode', label: 'PLZ', autoComplete: 'postal-code', type: 'text', wide: false },
  { name: 'city', label: 'Ort', autoComplete: 'address-level2', type: 'text', wide: false },
  { name: 'phone', label: 'Telefon', autoComplete: 'tel', type: 'tel', wide: false },
  { name: 'email', label: 'E-Mail', autoComplete: 'email', type: 'email', wide: false },
] as const;

type CheckboxProps = {
  readonly name: 'confirmDeliveryArea' | 'acceptTerms';
  readonly error: string | undefined;
  readonly children: ReactNode;
};

/** Pflicht-Checkbox mit Fehlermeldung, die per aria-describedby angebunden ist. */
function Checkbox({ name, error, children }: CheckboxProps) {
  return (
    <div className="col-span-2 grid gap-1">
      <label className="flex items-start gap-2.5 text-[0.8rem] text-stone">
        <input
          type="checkbox"
          name={name}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `err-${name}` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-olive"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <span id={`err-${name}`} className="text-[0.75rem] text-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Kundendaten und Absenden des Warenkorbs. Kein Zahlungssystem – Zahlung immer auf Rechnung.
 * Geht an `/api/shop-order`; der Server rechnet Preise selbst aus dem Katalog.
 * Bestellung: Aufbau nach § 312j BGB – Übersicht aller Positionen und Gesamtpreis direkt über
 * dem Knopf „zahlungspflichtig bestellen". Anfrage: gleicher Aufbau, Knopf „Unverbindlich anfragen".
 */
export function CheckoutForm({ lines, kind, onSent }: CheckoutFormProps) {
  const copy = shopModeCopy[kind];
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submit.status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = shopCustomerSchema.safeParse({
      name: data.get('name'),
      street: data.get('street'),
      postalCode: data.get('postalCode'),
      city: data.get('city'),
      phone: data.get('phone'),
      email: data.get('email'),
      message: data.get('message') ?? '',
      confirmDeliveryArea: data.get('confirmDeliveryArea') === 'on',
      acceptTerms: data.get('acceptTerms') === 'on',
    });

    if (!parsed.success) {
      const nextErrors = fieldErrorsFrom(parsed.error.issues);
      setErrors(nextErrors);
      // Erstes fehlerhaftes Feld fokussieren, damit Tastatur- und Screenreader-Nutzer es finden.
      const firstInvalid = Object.keys(nextErrors)[0];
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setSubmit({ status: 'sending' });
    try {
      const response = await fetch('/api/shop-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: parsed.data,
          lines: lines.map(({ variantId, quantity }) => ({ variantId, quantity })),
          website: String(data.get('website') ?? ''),
        }),
      });
      if (!response.ok) {
        setSubmit({
          status: 'failed',
          message: await readApiError(response, `Der Versand ist fehlgeschlagen. Bitte rufen Sie uns an: ${site.contact.phone}.`),
        });
        return;
      }
      form.reset();
      setSubmit({ status: 'idle' });
      onSent();
      cartStore.dispatch({ type: 'clear' });
    } catch {
      setSubmit({
        status: 'failed',
        message: `Keine Verbindung. Bitte versuchen Sie es erneut oder rufen Sie uns an: ${site.contact.phone}.`,
      });
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="checkout-title" className="mt-6 grid grid-cols-2 gap-3">
      <h3 id="checkout-title" className="col-span-2 text-[1.05rem] font-bold">
        Ihre Lieferadresse
      </h3>
      <Honeypot />
      {fields.map((field) => (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          autoComplete={field.autoComplete}
          error={errors[field.name]}
          className={field.wide ? 'col-span-2' : 'max-[400px]:col-span-2'}
        />
      ))}
      <TextField
        name="message"
        label="Nachricht (optional)"
        rows={3}
        maxLength={1000}
        required={false}
        error={errors.message}
        className="col-span-2"
      />

      <Checkbox name="confirmDeliveryArea" error={errors.confirmDeliveryArea}>
        Die Lieferadresse ist eine Privatadresse im Umkreis von ca. {shopTerms.deliveryRadiusKm} km um{' '}
        {site.address.city}.
        {kind === 'order' ? ' Mir ist bewusst, dass der Vertrag erst mit Ihrer Annahme zustande kommt.' : null}
      </Checkbox>
      <Checkbox name="acceptTerms" error={errors.acceptTerms}>
        Ich akzeptiere die{' '}
        <Link href="/agb" target="_blank" className="underline">
          AGB
        </Link>{' '}
        und habe die{' '}
        <Link href="/datenschutz" target="_blank" className="underline">
          Datenschutzerklärung
        </Link>{' '}
        zur Kenntnis genommen.
        {kind === 'order' ? (
          <>
            {' '}
            Bitte beachten Sie die{' '}
            <Link href="/widerruf" target="_blank" className="underline">
              Widerrufsbelehrung
            </Link>
            .
          </>
        ) : null}
      </Checkbox>

      <section aria-labelledby="summary-title" className="col-span-2 mt-2 border-y-2 border-olive py-4">
        <h3 id="summary-title" className="text-[0.75rem] font-bold tracking-[0.12em] uppercase">
          {copy.summaryTitle}
        </h3>
        <ul className="mt-2 grid list-none gap-1 p-0 text-[0.85rem]">
          {lines.map((line) => (
            <li key={line.variantId} className="flex justify-between gap-3">
              <span>
                {line.quantity} {line.unit} {line.label}
              </span>
              <span className="whitespace-nowrap">{formatPrice(line.totalCents)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between gap-3 text-[1rem] font-bold">
          <span>{copy.totalLabel}</span>
          <span className="whitespace-nowrap">{formatOrderTotal(lines)}</span>
        </p>
        <p className="mt-1 text-[0.75rem] text-stone">Zahlung auf Rechnung nach Lieferung.</p>
      </section>

      <button
        type="submit"
        disabled={submit.status === 'sending'}
        className={cn(
          'col-span-2 min-h-[50px] border px-4 text-[0.9rem] font-bold disabled:cursor-wait disabled:opacity-70',
          buttonVariants.olive,
        )}
      >
        {submit.status === 'sending' ? 'Wird gesendet …' : copy.submitLabel}
      </button>
      <p
        aria-live="polite"
        className={cn('col-span-2 text-[0.75rem]', submit.status === 'failed' ? 'text-error' : 'text-stone')}
      >
        {submit.status === 'failed' ? submit.message : copy.submitHint}
      </p>

      {submit.status === 'failed' ? (
        <div className="col-span-2 grid gap-2">
          <ButtonLink href={site.contact.phoneHref} variant="dark" size="small">
            {site.contact.phone}
          </ButtonLink>
          <ButtonLink
            variant="olive"
            size="small"
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Materialanfrage')}&body=${encodeURIComponent(orderListMailBody(lines))}`}
          >
            Liste per E-Mail senden
          </ButtonLink>
        </div>
      ) : null}
    </form>
  );
}
