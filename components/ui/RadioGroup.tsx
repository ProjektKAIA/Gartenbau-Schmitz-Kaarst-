import { ErrorText } from '@/components/forms/form-parts';
import { cn } from '@/lib/cn';

type RadioGroupProps<T extends string> = {
  readonly name: string;
  readonly legend: string;
  readonly options: readonly { readonly id: T; readonly label: string }[];
  readonly error?: string | undefined;
  /** Vorauswahl; ohne Wert ist nichts gewählt (Pflichtfrage bewusst beantworten). */
  readonly defaultValue?: T;
  readonly onChange?: (value: T) => void;
  readonly className?: string;
};

/** Auswahl aus wenigen Optionen als Radio-Knöpfe mit Fehlermeldung – für alle Formulare. */
export function RadioGroup<T extends string>({ name, legend, options, error, defaultValue, onChange, className }: RadioGroupProps<T>) {
  return (
    <fieldset className={cn('grid gap-1', className)} aria-describedby={error ? `err-${name}` : undefined}>
      <legend className="mb-1 text-[0.75rem] font-bold text-stone">{legend}</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {options.map((option) => (
          <label key={option.id} className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-[0.92rem]">
            <input
              type="radio"
              name={name}
              value={option.id}
              defaultChecked={option.id === defaultValue}
              onChange={onChange ? () => onChange(option.id) : undefined}
              className="size-5 accent-olive"
            />
            {option.label}
          </label>
        ))}
      </div>
      <ErrorText name={name} error={error} />
    </fieldset>
  );
}
