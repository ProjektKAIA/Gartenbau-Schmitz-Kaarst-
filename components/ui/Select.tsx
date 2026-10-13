import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  readonly label: string;
};

/** Natives Auswahlfeld mit Pfeil – wie die Größenauswahl in Online-Shops, voll tastaturbedienbar. */
export function Select({ label, className, children, id, ...props }: SelectProps) {
  return (
    <label className={cn('grid gap-1.5', className)} htmlFor={id}>
      <span className="text-[0.7rem] font-bold tracking-[0.12em] text-stone uppercase">{label}</span>
      <span className="relative">
        <select
          id={id}
          className="min-h-[44px] w-full cursor-pointer appearance-none border border-line bg-white py-2 pr-10 pl-3.5 text-[0.92rem] font-semibold text-charcoal"
          {...props}
        >
          {children}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[0.75rem] text-olive"
        >
          ▼
        </span>
      </span>
    </label>
  );
}
