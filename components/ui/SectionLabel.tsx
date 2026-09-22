import { cn } from '@/lib/cn';

type EyebrowProps = {
  readonly children: string;
  readonly tone?: 'olive' | 'light';
  readonly className?: string;
};

/** Kleine Überschrift über einer Sektion. */
export function Eyebrow({ children, tone = 'olive', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'mb-[18px] text-[0.78rem] font-extrabold tracking-[0.18em] uppercase',
        tone === 'olive' ? 'text-olive' : 'text-olive-pale',
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionKickerProps = {
  readonly number: string;
  readonly children: string;
  readonly className?: string;
};

/** Nummerierte Marginalie („01  Unsere Haltung"). */
export function SectionKicker({ number, children, className }: SectionKickerProps) {
  return (
    <p
      className={cn(
        'flex gap-4 pt-2.5 text-[0.82rem] tracking-[0.14em] text-stone uppercase max-sm:mb-[30px]',
        className,
      )}
    >
      <span className="font-extrabold text-olive">{number}</span>
      {children}
    </p>
  );
}
