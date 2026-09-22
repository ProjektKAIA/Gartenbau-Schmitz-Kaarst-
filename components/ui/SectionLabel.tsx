import { cn } from '@/lib/cn';

type SectionLabelProps = {
  readonly number?: string;
  readonly children: string;
  readonly tone?: 'olive' | 'light';
  readonly className?: string;
};

/** Kleine Marginalie über jeder Sektion: „01 Leistungen". */
export function SectionLabel({ number, children, tone = 'olive', className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'mb-5 text-[0.76rem] font-extrabold tracking-[0.16em] uppercase',
        tone === 'olive' ? 'text-olive' : 'text-bronze-light',
        className,
      )}
    >
      {number ? <span className="mr-[13px] text-bronze">{number}</span> : null}
      {children}
    </p>
  );
}
