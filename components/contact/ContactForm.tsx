'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import { clearErrorOnChange, ErrorText, focusFirstError, formText, SentMessage, type FormStatus } from '@/components/forms/form-parts';
import { Honeypot } from '@/components/ui/Honeypot';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Select } from '@/components/ui/Select';
import { TextField } from '@/components/ui/TextField';
import { contactCopy as copy, contactTopics, replyChannels, type ContactTopicId } from '@/content/contact';
import { cn } from '@/lib/cn';
import { fieldErrorsFrom, readApiError, type FieldErrors } from '@/lib/forms';
import { site } from '@/lib/site';
import { contactSchema } from '@/types/contact';

const fallbackMessage = `Der Versand ist fehlgeschlagen. Bitte rufen Sie uns an (${site.contact.phone}) oder schreiben Sie an ${site.contact.email}.`;

export function ContactForm({ initialTopic }: { readonly initialTopic?: ContactTopicId | undefined }) {
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: formText(data, 'name'),
      email: formText(data, 'email'),
      phone: formText(data, 'phone'),
      replyVia: formText(data, 'replyVia'),
      topic: formText(data, 'topic'),
      street: formText(data, 'street'),
      postalCode: formText(data, 'postalCode'),
      city: formText(data, 'city'),
      timeframe: formText(data, 'timeframe'),
      message: formText(data, 'message'),
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
        body: JSON.stringify({ contact: parsed.data, website: formText(data, 'website') }),
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

  if (status.state === 'sent') return <SentMessage title={copy.sentTitle} body={copy.sentBody} />;

  const sending = status.state === 'sending';

  return (
    <form noValidate onSubmit={onSubmit} onChange={clearErrorOnChange(setErrors)} className="relative grid grid-cols-2 gap-x-5 gap-y-5 max-sm:grid-cols-1" aria-busy={sending}>
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

      <RadioGroup
        name="replyVia"
        legend={copy.fields.replyVia}
        options={replyChannels}
        defaultValue={replyChannels[0].id}
        error={errors.replyVia}
      />

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
        <p className="text-[0.85rem] text-stone">
          {copy.fields.privacyBefore}
          <Link href="/datenschutz" target="_blank" className="font-semibold text-charcoal underline">
            {copy.fields.privacyLink}
          </Link>
          {copy.fields.privacyAfter}
        </p>
        <p aria-live="polite" className="text-[0.88rem] text-error">
          {status.state === 'failed' ? status.message : ''}
        </p>
      </div>
    </form>
  );
}
