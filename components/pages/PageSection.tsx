import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

type PageSectionProps = {
  /** Anker und Basis der Überschriften-ID. */
  readonly id: string;
  readonly label?: string;
  readonly title: string;
  readonly intro?: string;
  /** Hintergrund im Wechsel: paper (hell) und mist (leicht grau). */
  readonly tone?: 'paper' | 'mist';
  readonly children?: ReactNode;
};

/** Einheitliche Inhaltssektion der Unterseiten: gleiche Abstände, gleiche Überschriftgröße. */
export function PageSection({ id, label, title, intro, tone = 'paper', children }: PageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('py-20 max-md:py-14', tone === 'mist' ? 'bg-mist' : 'bg-paper')}
    >
      <div className="shell">
        {label ? <Eyebrow className="mb-3">{label}</Eyebrow> : null}
        <h2 id={`${id}-title`} className="display-section max-w-[760px]">
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-[640px] text-stone">{intro}</p> : null}
        {children ? <div className="mt-10 max-md:mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
