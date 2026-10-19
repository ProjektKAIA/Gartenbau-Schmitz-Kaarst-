import type { FormEvent } from 'react';
import type { FieldErrors } from '@/lib/forms';

/** Zustand eines Formulars mit Versand an eine API-Route. */
export type FormStatus =
  | { readonly state: 'idle' }
  | { readonly state: 'sending' }
  | { readonly state: 'failed'; readonly message: string }
  | { readonly state: 'sent' };

/** Textwert eines Formularfelds – fehlende Felder und Dateien ergeben einen leeren String. */
export const formText = (data: FormData, name: string): string => {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
};

/**
 * Fehler eines Felds entfernen, sobald es geändert wird – als `onChange` am <form> (Events steigen auf).
 * So stehen keine veralteten Meldungen unter bereits korrigierten Feldern.
 */
export const clearErrorOnChange =
  (setErrors: (update: (errors: FieldErrors) => FieldErrors) => void) => (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const { name } = target;
    setErrors((errors) => (name in errors ? Object.fromEntries(Object.entries(errors).filter(([key]) => key !== name)) : errors));
  };

/** Fokus auf das erste fehlerhafte Feld setzen (Tastatur- und Screenreader-Nutzer). */
export const focusFirstError = (form: HTMLFormElement, errors: FieldErrors) => {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const element = form.elements.namedItem(first);
  const target = element instanceof RadioNodeList ? element[0] : element;
  if (target instanceof HTMLElement) target.focus();
};

/** Fehlermeldung unter einem Feld; die ID passt zu `aria-describedby="err-<name>"`. */
export function ErrorText({ name, error }: { readonly name: string; readonly error: string | undefined }) {
  return error ? (
    <span id={`err-${name}`} className="text-[0.75rem] text-error">
      {error}
    </span>
  ) : null;
}

/**
 * Danke-Meldung nach erfolgreichem Versand. Man steht nach dem Absenden unten am Formular –
 * die Meldung wird deshalb ins Bild geholt und fokussiert.
 */
export function SentMessage({ title, body }: { readonly title: string; readonly body: string }) {
  return (
    <div
      role="status"
      tabIndex={-1}
      ref={(node) => {
        node?.scrollIntoView({ block: 'center' });
        node?.focus({ preventScroll: true });
      }}
      className="border-l-4 border-olive bg-mist p-6 outline-none"
    >
      <h2 className="text-[1.6rem] leading-tight font-bold text-charcoal">{title}</h2>
      <p className="mt-2 text-stone">{body}</p>
    </div>
  );
}
