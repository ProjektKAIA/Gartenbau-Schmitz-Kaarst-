'use client';

import { useState, type FormEvent } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import { Honeypot } from '@/components/ui/Honeypot';
import { TextField } from '@/components/ui/TextField';
import { withdrawalCopy as copy } from '@/content/withdrawal';
import { fieldErrorsFrom, readApiError, type FieldErrors } from '@/lib/forms';
import { site } from '@/lib/site';
import { withdrawalSchema, type Withdrawal } from '@/types/withdrawal';

type Step =
  | { readonly step: 'edit' }
  | { readonly step: 'review'; readonly withdrawal: Withdrawal; readonly website: string }
  | { readonly step: 'sending'; readonly withdrawal: Withdrawal; readonly website: string }
  | { readonly step: 'failed'; readonly withdrawal: Withdrawal; readonly website: string; readonly message: string }
  | { readonly step: 'sent' };

const buttonClass =
  'min-h-[50px] border px-6 text-[0.9rem] font-bold transition-colors disabled:cursor-wait disabled:opacity-70';

/**
 * Online-Widerruf in zwei Schritten (§ 356a BGB):
 * 1. Name, Vertrag, E-Mail erfassen → 2. prüfen und „Widerruf bestätigen".
 */
export function WithdrawalForm() {
  const [state, setState] = useState<Step>({ step: 'edit' });
  const [errors, setErrors] = useState<FieldErrors>({});
  // Eingaben bleiben beim Zurückgehen erhalten.
  const [draft, setDraft] = useState<Withdrawal>({ name: '', contract: '', email: '' });

  const onNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = { name: data.get('name'), contract: data.get('contract'), email: data.get('email') };
    const parsed = withdrawalSchema.safeParse(input);
    if (!parsed.success) {
      setErrors(fieldErrorsFrom(parsed.error.issues));
      return;
    }
    setErrors({});
    setDraft(parsed.data);
    setState({ step: 'review', withdrawal: parsed.data, website: String(data.get('website') ?? '') });
  };

  const onConfirm = async () => {
    if (state.step !== 'review' && state.step !== 'failed') return;
    const { withdrawal, website } = state;
    setState({ step: 'sending', withdrawal, website });
    try {
      const response = await fetch('/api/withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawal, website }),
      });
      if (!response.ok) {
        const message = await readApiError(
          response,
          `Der Versand ist fehlgeschlagen. Bitte widerrufen Sie per E-Mail an ${site.contact.email}.`,
        );
        setState({ step: 'failed', withdrawal, website, message });
        return;
      }
      setState({ step: 'sent' });
    } catch {
      setState({
        step: 'failed',
        withdrawal,
        website,
        message: `Keine Verbindung. Bitte versuchen Sie es erneut oder widerrufen Sie per E-Mail an ${site.contact.email}.`,
      });
    }
  };

  if (state.step === 'sent') {
    return (
      <div role="status" className="border-l-4 border-olive bg-mist p-6">
        <h2 className="text-[1.6rem] text-charcoal">{copy.sentTitle}</h2>
        <p className="mt-2">{copy.sentBody}</p>
      </div>
    );
  }

  if (state.step === 'edit') {
    return (
      <form noValidate onSubmit={onNext} className="grid gap-4">
        <Honeypot />
        <TextField name="name" label={copy.fields.name} autoComplete="name" defaultValue={draft.name} error={errors.name} />
        <TextField
          name="contract"
          label={copy.fields.contract}
          hint={copy.fields.contractHint}
          rows={4}
          maxLength={1000}
          defaultValue={draft.contract}
          error={errors.contract}
        />
        <TextField
          name="email"
          label={copy.fields.email}
          type="email"
          autoComplete="email"
          defaultValue={draft.email}
          error={errors.email}
        />
        <button type="submit" className={`${buttonClass} justify-self-start ${buttonVariants.dark}`}>
          {copy.nextLabel}
        </button>
      </form>
    );
  }

  const { withdrawal } = state;
  return (
    <div className="grid gap-5">
      <h2 className="text-[1.6rem] text-charcoal">{copy.reviewTitle}</h2>
      <dl className="grid gap-3 border border-line bg-white p-5 text-charcoal">
        <div>
          <dt className="text-[0.75rem] font-bold text-stone">{copy.fields.name}</dt>
          <dd>{withdrawal.name}</dd>
        </div>
        <div>
          <dt className="text-[0.75rem] font-bold text-stone">{copy.fields.contract}</dt>
          <dd className="whitespace-pre-line">{withdrawal.contract}</dd>
        </div>
        <div>
          <dt className="text-[0.75rem] font-bold text-stone">{copy.fields.email}</dt>
          <dd>{withdrawal.email}</dd>
        </div>
      </dl>
      <p className="text-[0.85rem]">{copy.reviewHint}</p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onConfirm}
          disabled={state.step === 'sending'}
          className={`${buttonClass} ${buttonVariants.olive}`}
        >
          {state.step === 'sending' ? 'Wird gesendet …' : copy.confirmLabel}
        </button>
        <button
          type="button"
          onClick={() => setState({ step: 'edit' })}
          disabled={state.step === 'sending'}
          className={`${buttonClass} border-line bg-white text-charcoal hover:bg-mist`}
        >
          {copy.backLabel}
        </button>
      </div>
      <p aria-live="polite" className="text-[0.85rem] text-error">
        {state.step === 'failed' ? state.message : ''}
      </p>
    </div>
  );
}
