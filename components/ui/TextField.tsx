import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import { cn } from '@/lib/cn';

type TextFieldProps = {
  readonly name: string;
  readonly label: string;
  readonly error?: string | undefined;
  readonly hint?: string;
  readonly type?: HTMLInputTypeAttribute;
  readonly autoComplete?: HTMLInputAutoCompleteAttribute;
  /** Mehrzeilig als Textarea mit dieser Zeilenzahl. */
  readonly rows?: number;
  readonly maxLength?: number;
  readonly required?: boolean;
  readonly defaultValue?: string;
  readonly className?: string;
};

const inputClass = 'min-h-[44px] w-full border border-line bg-white px-3 text-[0.92rem] text-charcoal';

/** Beschriftetes Eingabefeld mit Fehlermeldung (aria-invalid/-describedby) für alle Formulare. */
export function TextField({
  name,
  label,
  error,
  hint,
  type = 'text',
  autoComplete,
  rows,
  maxLength,
  required = true,
  defaultValue,
  className,
}: TextFieldProps) {
  const describedBy = [hint ? `hint-${name}` : null, error ? `err-${name}` : null].filter(Boolean).join(' ');
  const shared = {
    id: `field-${name}`,
    name,
    required,
    ...(maxLength ? { maxLength } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
  };

  return (
    <div className={cn('grid gap-1', className)}>
      <label htmlFor={`field-${name}`} className="text-[0.75rem] font-bold text-stone">
        {label}
      </label>
      {rows ? (
        <textarea rows={rows} className={cn(inputClass, 'py-2')} {...shared} />
      ) : (
        <input type={type} autoComplete={autoComplete} className={inputClass} {...shared} />
      )}
      {hint ? (
        <span id={`hint-${name}`} className="text-[0.75rem] text-stone">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`err-${name}`} className="text-[0.75rem] text-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
