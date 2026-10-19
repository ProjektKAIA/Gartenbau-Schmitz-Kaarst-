'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import { Honeypot } from '@/components/ui/Honeypot';
import { Select } from '@/components/ui/Select';
import { TextField } from '@/components/ui/TextField';
import { contactCopy as copy, contactTopics, replyChannels, type ContactTopicId } from '@/content/contact';
import { cn } from '@/lib/cn';
import { fieldErrorsFrom, readApiError, type FieldErrors } from '@/lib/forms';
import { site } from '@/lib/site';
import { contactSchema } from '@/types/contact';

type Status =
  | { readonly state: 'idle' }
  | { readonly state: 'sending' }
  | { readonly state: 'failed'; readonly message: string }
  | { readonly state: 'sent' };

const fallbackMessage = `Der Versand ist fehlgeschlagen. Bitte rufen Sie uns an (${site.contact.phone}) oder schreiben Sie an ${site.contact.email}.`;

const text = (data: FormData, name: string): string => {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
};

/** Fokus auf das erste fehlerhafte Feld setzen (Tastatur- und Screenreader-Nutzer). */
const focusFirstError = (form: HTMLFormElement, errors: FieldErrors) => {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const element = form.elements.namedItem(first);
  const target = element instanceof RadioNodeList ? element[0] : element;
  if (target instanceof HTMLElement) target.focus();
};

function ErrorText({ name, error }: { readonly name: string; readonly error: string | undefined }) {
  return error ? (
    <span id={`err-${name}`} className="text-[0.75rem] text-error">
      {error}
    </span>
  ) : null;
}

export function ContactForm({ initialTopic }: { readonly initialTopic?: ContactTopicId | undefined }) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: text(data, 'name'),
      email: text(data, 'email'),
      phone: text(data, 'phone'),
      replyVia: text(data, 'replyVia'),
      topic: text(data, 'topic'),
      street: text(data, 'street'),
      postalCode: text(data, 'postalCode'),
      city: text(data, 'city'),
      timeframe: text(data, 'timeframe'),
      message: text(data, 'message'),
      privacyConsent: data.get('privacyConsent') === 'on',
    });
    if (!parsed.success) {
      const nextErrors = fieldErrorsFrom(parsed.error.issues);
      setErrors(nextErrors);
      focusFirstError(form, nextErrors);
      return;
    }

    setErrors({});
    setStatus({ state: 'sending' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: parsed.data, website: text(data, 'website') }),
      });
      if (!response.ok) {
        setStatus({ state: 'failed', message: await readApiError(response, fallbackMessage) });
        return;
      }
      setStatus({ state: 'sent' });
    } catch {
      setStatus({
        state: 'failed',
        message: `Keine Verbindung. Bitte versuchen Sie es erneut oder rufen Sie uns an (${site.contact.phone}).`,
      });
    }
  };

  if (status.state === 'sent') {
    return (
      <div role="status" className="border-l-4 border-olive bg-mist p-6">
        <h2 className="text-[1.6rem] leading-tight font-bold text-charcoal">{copy.sentTitle}</h2>
        <p className="mt-2 text-stone">{copy.sentBody}</p>
      </div>
    );
  }

  const sending = status.state === 'sending';

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid grid-cols-2 gap-x-5 gap-y-5 max-sm:grid-cols-1" aria-busy={sending}>
      <Honeypot />
      <p className="col-span-full text-[0.8rem] text-stone">{copy.requiredNote}</p>

      <TextField name="name" label={copy.fields.name} autoComplete="name" maxLength={100} error={errors.name} />
      <TextField name="email" label={copy.fields.email} type="email" autoComplete="email" maxLength={254} error={errors.email} />
      <TextField
        name="phone"
        label={copy.fields.phone}
        type="tel"
        autoComplete="tel"
        maxLength={40}
        required={false}
        hint={copy.fields.phoneHint}
        error={errors.phone}
      />

      <fieldset className="grid gap-1" aria-describedby={errors.replyVia ? 'err-replyVia' : undefined}>
        <legend className="mb-1 text-[0.75rem] font-bold text-stone">{copy.fields.replyVia}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {replyChannels.map((channel, index) => (
            <label key={channel.id} className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-[0.92rem]">
              <input
                type="radio"
                name="replyVia"
                value={channel.id}
                defaultChecked={index === 0}
                className="size-5 accent-olive"
              />
              {channel.label}
            </label>
          ))}
        </div>
        <ErrorText name="replyVia" error={errors.replyVia} />
      </fieldset>

      <div className="col-span-full grid gap-1">
        <Select
          id="field-topic"
          name="topic"
          label={copy.fields.topic}
          defaultValue={initialTopic ?? ''}
          required
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={errors.topic ? 'err-topic' : undefined}
        >
          <option value="" disabled>
            {copy.fields.topicPlaceholder}
          </option>
          {contactTopics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.label}
            </option>
          ))}
        </Select>
        <ErrorText name="topic" error={errors.topic} />
      </div>

      <fieldset className="col-span-full grid grid-cols-[1fr_120px_1fr] gap-x-5 gap-y-4 border-t border-line pt-5 max-md:grid-cols-[110px_1fr] max-sm:grid-cols-1">
        <legend className="float-left col-span-full mb-1 w-full text-[0.85rem] font-bold text-charcoal">
          {copy.fields.objectLegend}
          <span className="block text-[0.75rem] font-normal text-stone">{copy.fields.objectHint}</span>
        </legend>
        <TextField
          name="street"
          label={copy.fields.street}
          autoComplete="address-line1"
          maxLength={120}
          required={false}
          error={errors.street}
          className="max-md:col-span-full"
        />
        <TextField
          name="postalCode"
          label={copy.fields.postalCode}
          autoComplete="postal-code"
          maxLength={5}
          required={false}
          error={errors.postalCode}
        />
        <TextField name="city" label={copy.fields.city} autoComplete="address-level2" maxLength={80} required={false} error={errors.city} />
      </fieldset>

      <TextField
        name="timeframe"
        label={copy.fields.timeframe}
        hint={copy.fields.timeframeHint}
        maxLength={120}
        required={false}
        error={errors.timeframe}
        className="col-span-full"
      />
      <TextField name="message" label={copy.fields.message} rows={6} maxLength={3000} error={errors.message} className="col-span-full" />

      <div className="col-span-full grid gap-1">
        <label className="flex items-start gap-3 text-[0.85rem] text-stone">
          <input
            type="checkbox"
            name="privacyConsent"
            required
            aria-invalid={errors.privacyConsent ? true : undefined}
            aria-describedby={errors.privacyConsent ? 'err-privacyConsent' : undefined}
            className="mt-0.5 size-5 shrink-0 accent-olive"
          />
          <span>
            {copy.fields.privacyBefore}
            <Link href="/datenschutz" target="_blank" className="font-semibold text-charcoal underline">
              {copy.fields.privacyLink}
            </Link>
            {copy.fields.privacyAfter}
          </span>
        </label>
        <ErrorText name="privacyConsent" error={errors.privacyConsent} />
      </div>

      <div className="col-span-full grid gap-3">
        <button
          type="submit"
          disabled={sending}
          className={cn(
            'min-h-[54px] justify-self-start rounded-[2px] border px-[26px] text-[0.91rem] font-bold transition-colors disabled:cursor-wait disabled:opacity-70 max-sm:w-full',
            buttonVariants.olive,
          )}
        >
          {sending ? copy.sendingLabel : copy.submitLabel}
        </button>
        <p aria-live="polite" className="text-[0.88rem] text-error">
          {status.state === 'failed' ? status.message : ''}
        </p>
      </div>
    </form>
  );
}
