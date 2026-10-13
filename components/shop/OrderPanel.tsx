'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ButtonLink, buttonVariants } from '@/components/ui/Button';
import { Honeypot } from '@/components/ui/Honeypot';
import { TextField } from '@/components/ui/TextField';
import { MAX_QUANTITY, MIN_QUANTITY, type CartAction } from '@/lib/shop/cart';
import { formatShopPrice } from '@/lib/shop/price';
import { fieldErrorsFrom, readApiError, type FieldErrors } from '@/lib/forms';
import { formatOrderTotal, orderListMailBody, type ResolvedLine } from '@/lib/shop/order';
import { site } from '@/lib/site';
import { shopCopy, shopTerms } from '@/content/shop';
import { shopCustomerSchema } from '@/types/shop';

type OrderPanelProps = {
  readonly lines: readonly ResolvedLine[];
  readonly dispatch: (action: CartAction) => void;
};

type SubmitState =
  | { readonly status: 'idle' }
  | { readonly status: 'sending' }
  | { readonly status: 'sent' }
  | { readonly status: 'failed'; readonly message: string };

const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name', type: 'text', wide: true },
  { name: 'street', label: 'Straße & Hausnummer', autoComplete: 'street-address', type: 'text', wide: true },
  { name: 'postalCode', label: 'PLZ', autoComplete: 'postal-code', type: 'text', wide: false },
  { name: 'city', label: 'Ort', autoComplete: 'address-level2', type: 'text', wide: false },
  { name: 'phone', label: 'Telefon', autoComplete: 'tel', type: 'tel', wide: false },
  { name: 'email', label: 'E-Mail', autoComplete: 'email', type: 'email', wide: false },
] as const;

/**
 * Bestellliste und Bestellformular. Kein Zahlungssystem – Zahlung immer auf Rechnung.
 * Die Bestellung geht an `/api/shop-order`; der Server rechnet Preise selbst aus dem Katalog.
 * Aufbau nach § 312j BGB: Übersicht aller Positionen und Gesamtpreis direkt über dem
 * Knopf „zahlungspflichtig bestellen".
 */
export function OrderPanel({ lines, dispatch }: OrderPanelProps) {
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
    });

    if (!parsed.success) {
      setErrors(fieldErrorsFrom(parsed.error.issues));
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
          message: await readApiError(
            response,
            `Der Versand ist fehlgeschlagen. Bitte rufen Sie uns an: ${site.contact.phone}.`,
          ),
        });
        return;
      }
      form.reset();
      dispatch({ type: 'clear' });
      setSubmit({ status: 'sent' });
    } catch {
      setSubmit({
        status: 'failed',
        message: `Keine Verbindung. Bitte versuchen Sie es erneut oder rufen Sie uns an: ${site.contact.phone}.`,
      });
    }
  };

  return (
    <aside id="bestellung" aria-labelledby="order-title" className="border border-line bg-white/80 p-6">
      <h2 id="order-title" className="text-[1.7rem] font-bold">
        Ihre Bestellung
      </h2>

      {submit.status === 'sent' ? (
        <p role="status" className="mt-3 border-l-4 border-olive bg-mist p-4 text-[0.9rem]">
          {shopCopy.sentMessage}
        </p>
      ) : null}

      {lines.length === 0 ? (
        <p className="mt-3 text-[0.9rem] text-stone">
          Noch leer – wählen Sie Material und Menge und legen Sie es in die Bestellliste.
        </p>
      ) : (
        <>
          <ul className="mt-4 grid list-none gap-3 p-0">
            {lines.map((line) => (
              <li key={line.variantId} className="grid grid-cols-[1fr_auto] items-center gap-x-3 border-b border-line pb-3">
                <span className="text-[0.88rem] font-semibold">{line.label}</span>
                <span className="text-[0.88rem]">{formatShopPrice(line.totalCents)}</span>
                <span className="mt-1.5 flex items-center gap-2 text-[0.8rem] text-stone">
                  <label className="sr-only" htmlFor={`qty-${line.variantId}`}>
                    Menge {line.label}
                  </label>
                  <input
                    id={`qty-${line.variantId}`}
                    type="number"
                    inputMode="numeric"
                    min={MIN_QUANTITY}
                    max={MAX_QUANTITY}
                    value={line.quantity}
                    onChange={(event) =>
                      dispatch({ type: 'setQuantity', variantId: line.variantId, quantity: event.target.valueAsNumber })
                    }
                    className="min-h-[36px] w-16 border border-line bg-white px-2 text-charcoal"
                  />
                  {line.unit}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'remove', variantId: line.variantId })}
                  className="mt-1.5 min-h-[36px] text-[0.8rem] text-stone underline hover:text-charcoal"
                >
                  Entfernen <span className="sr-only">{line.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between text-[0.95rem] font-bold">
            <span>Gesamt inkl. MwSt. & Lieferung</span>
            <span className="whitespace-nowrap">{formatOrderTotal(lines)}</span>
          </p>
          <p className="mt-1 text-[0.75rem] text-stone">Zahlung auf Rechnung</p>

          {shopTerms.ordersOpen ? (
            <form noValidate onSubmit={onSubmit} className="mt-6 grid grid-cols-2 gap-3">
              <Honeypot />
              {fields.map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  error={errors[field.name]}
                  className={field.wide ? 'col-span-2' : 'max-sm:col-span-2'}
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
              <label className="col-span-2 flex items-start gap-2.5 text-[0.8rem] text-stone">
                <input
                  type="checkbox"
                  name="confirmDeliveryArea"
                  aria-invalid={errors.confirmDeliveryArea ? true : undefined}
                  aria-describedby={errors.confirmDeliveryArea ? 'err-confirmDeliveryArea' : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-olive"
                />
                <span>
                  Die Lieferadresse ist eine Privatadresse im Umkreis von ca. {shopTerms.deliveryRadiusKm} km um
                  Kaarst. Mir ist bewusst, dass der Vertrag erst mit Ihrer Annahme zustande kommt.
                </span>
              </label>
              {errors.confirmDeliveryArea ? (
                <span id="err-confirmDeliveryArea" className="col-span-2 text-[0.75rem] text-error">
                  {errors.confirmDeliveryArea}
                </span>
              ) : null}
              <div className="col-span-2 mt-2 border-y-2 border-olive py-4" aria-labelledby="summary-title">
                <h3 id="summary-title" className="text-[0.75rem] font-bold tracking-[0.12em] uppercase">
                  Bestellübersicht
                </h3>
                <ul className="mt-2 grid list-none gap-1 p-0 text-[0.85rem]">
                  {lines.map((line) => (
                    <li key={line.variantId} className="flex justify-between gap-3">
                      <span>
                        {line.quantity} {line.unit} {line.label}
                      </span>
                      <span className="whitespace-nowrap">{formatShopPrice(line.totalCents)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex justify-between text-[1rem] font-bold">
                  <span>Gesamtpreis inkl. MwSt. & Lieferung</span>
                  <span className="whitespace-nowrap">{formatOrderTotal(lines)}</span>
                </p>
                <p className="mt-1 text-[0.75rem] text-stone">Zahlung auf Rechnung nach Lieferung.</p>
              </div>
              <p className="col-span-2 text-[0.75rem] text-stone">
                Mit Ihrer Bestellung gelten unsere{' '}
                <Link href="/agb" className="underline">
                  AGB
                </Link>
                . Bitte beachten Sie die{' '}
                <Link href="/widerruf" className="underline">
                  Widerrufsbelehrung
                </Link>{' '}
                und die{' '}
                <Link href="/datenschutz" className="underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
              <button
                type="submit"
                disabled={submit.status === 'sending'}
                className={`col-span-2 min-h-[50px] border px-4 text-[0.9rem] font-bold disabled:cursor-wait disabled:opacity-70 ${buttonVariants.olive}`}
              >
                {submit.status === 'sending' ? 'Wird gesendet …' : shopCopy.submitLabel}
              </button>
              <p
                aria-live="polite"
                className={`col-span-2 text-[0.75rem] ${submit.status === 'failed' ? 'text-error' : 'text-stone'}`}
              >
                {submit.status === 'failed' ? submit.message : shopCopy.submitHint}
              </p>
            </form>
          ) : (
            <div className="mt-6 border-l-4 border-olive bg-mist p-4">
              <h3 className="text-[0.95rem] font-bold">{shopCopy.previewTitle}</h3>
              <p className="mt-1.5 text-[0.85rem] text-stone">{shopCopy.previewBody}</p>
              <div className="mt-4 grid gap-3">
                <ButtonLink href={site.contact.phoneHref} variant="dark">
                  {site.contact.phone}
                </ButtonLink>
                <ButtonLink
                  variant="olive"
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Materialbestellung')}&body=${encodeURIComponent(orderListMailBody(lines))}`}
                >
                  Liste per E-Mail senden
                </ButtonLink>
              </div>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
