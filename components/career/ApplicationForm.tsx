'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { clearErrorOnChange, ErrorText, focusFirstError, formText, SentMessage, type FormStatus } from '@/components/forms/form-parts';
import { buttonVariants } from '@/components/ui/Button';
import { Honeypot } from '@/components/ui/Honeypot';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Select } from '@/components/ui/Select';
import { TextField } from '@/components/ui/TextField';
import {
  applicationCopy as copy,
  experienceLevels,
  licenseClasses,
  workloads,
  yesNo,
  type YesNoId,
} from '@/content/karriere';
import { cn } from '@/lib/cn';
import { fieldErrorsFrom, readApiError, type FieldErrors } from '@/lib/forms';
import { routes } from '@/lib/routes';
import { site } from '@/lib/site';
import { applicationSchema } from '@/types/application';

const fallbackMessage = `Der Versand ist fehlgeschlagen. Bitte ruf uns an (${site.contact.phone}) oder schreib an ${site.contact.email}.`;

/** Bewerbung als Landschaftsgärtner/in – Versand per Mail an den Betrieb, keine Bestätigungsmail. */
export function ApplicationForm() {
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});
  // Die Frage nach einer anderen Ausbildung erscheint erst nach „Nein".
  const [galabauTraining, setGalabauTraining] = useState<YesNoId | undefined>(undefined);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = applicationSchema.safeParse({
      name: formText(data, 'name'),
      email: formText(data, 'email'),
      phone: formText(data, 'phone'),
      city: formText(data, 'city'),
      workload: formText(data, 'workload'),
      galabauTraining: formText(data, 'galabauTraining'),
      otherTraining: galabauTraining === 'nein' ? formText(data, 'otherTraining') : '',
      experience: formText(data, 'experience'),
      license: formText(data, 'license'),
      availableFrom: formText(data, 'availableFrom'),
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
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application: parsed.data, website: formText(data, 'website') }),
      });
      if (!response.ok) {
        setStatus({ state: 'failed', message: await readApiError(response, fallbackMessage) });
        return;
      }
      setStatus({ state: 'sent' });
    } catch {
      setStatus({ state: 'failed', message: `Keine Verbindung. Bitte versuch es erneut oder ruf uns an (${site.contact.phone}).` });
    }
  };

  if (status.state === 'sent') return <SentMessage title={copy.sentTitle} body={copy.sentBody} />;

  const sending = status.state === 'sending';

  return (
    <form noValidate onSubmit={onSubmit} onChange={clearErrorOnChange(setErrors)} className="grid grid-cols-2 gap-x-5 gap-y-5 max-sm:grid-cols-1" aria-busy={sending}>
      <Honeypot />
      <p className="col-span-full text-[0.8rem] text-stone">{copy.requiredNote}</p>

      <TextField name="name" label={copy.fields.name} autoComplete="name" maxLength={100} error={errors.name} />
      <TextField name="email" label={copy.fields.email} type="email" autoComplete="email" maxLength={254} error={errors.email} />
      <TextField name="phone" label={copy.fields.phone} type="tel" autoComplete="tel" maxLength={40} error={errors.phone} />
      <TextField name="city" label={copy.fields.city} autoComplete="address-level2" maxLength={80} error={errors.city} />

      <div className="col-span-full grid grid-cols-2 gap-x-5 gap-y-5 border-t border-line pt-5 max-sm:grid-cols-1">
        <RadioGroup name="workload" legend={copy.fields.workload} options={workloads} error={errors.workload} />
        <TextField
          name="availableFrom"
          label={copy.fields.availableFrom}
          hint={copy.fields.availableFromHint}
          maxLength={60}
          error={errors.availableFrom}
        />

        <RadioGroup
          name="galabauTraining"
          legend={copy.fields.galabauTraining}
          options={yesNo}
          error={errors.galabauTraining}
          onChange={setGalabauTraining}
          className="col-span-full"
        />
        {galabauTraining === 'nein' ? (
          <TextField
            name="otherTraining"
            label={copy.fields.otherTraining}
            hint={copy.fields.otherTrainingHint}
            maxLength={120}
            required={false}
            error={errors.otherTraining}
            className="col-span-full"
          />
        ) : null}

        <div className="grid gap-1">
          <Select
            id="field-experience"
            name="experience"
            label={copy.fields.experience}
            defaultValue=""
            required
            aria-invalid={errors.experience ? true : undefined}
            aria-describedby={errors.experience ? 'err-experience' : undefined}
          >
            <option value="" disabled>
              {copy.fields.experiencePlaceholder}
            </option>
            {experienceLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </Select>
          <ErrorText name="experience" error={errors.experience} />
        </div>
        <div className="grid gap-1">
          <Select
            id="field-license"
            name="license"
            label={copy.fields.license}
            defaultValue=""
            required
            aria-invalid={errors.license ? true : undefined}
            aria-describedby={errors.license ? 'err-license' : undefined}
          >
            <option value="" disabled>
              {copy.fields.licensePlaceholder}
            </option>
            {licenseClasses.map((license) => (
              <option key={license.id} value={license.id}>
                {license.label}
              </option>
            ))}
          </Select>
          <ErrorText name="license" error={errors.license} />
        </div>
      </div>

      <TextField
        name="message"
        label={copy.fields.message}
        rows={4}
        maxLength={2000}
        required={false}
        error={errors.message}
        className="col-span-full"
      />

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
          <Link href={routes.privacy.path} target="_blank" className="font-semibold text-charcoal underline">
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
