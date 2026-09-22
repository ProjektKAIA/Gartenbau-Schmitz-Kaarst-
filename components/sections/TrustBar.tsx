import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

type Fact = {
  readonly label: string;
  readonly value: string;
  readonly href?: string;
  readonly arrow?: boolean;
};

const facts: readonly Fact[] = [
  { label: 'Standort', value: site.address.city },
  { label: 'Einsatzgebiet', value: 'Neuss & Umgebung' },
  { label: `Seit ${site.trainingCompanySince}`, value: 'Ausbildungsbetrieb' },
  { label: 'Direkter Kontakt', value: site.contact.phone, href: site.contact.phoneHref, arrow: true },
];

const cellBase =
  'flex min-h-[96px] flex-col justify-center gap-1 pr-6 max-sm:min-h-[82px] max-sm:border-r-0 max-sm:border-b max-sm:border-b-white/15';

/**
 * Vertrauensleiste unter dem Hero.
 * Trennlinien hängen an der Position: 4 Spalten ab 820px, darunter 2, auf Mobil 1.
 */
export function TrustBar() {
  return (
    <section className="bg-pine text-white" aria-label="Eckdaten">
      <div className="shell grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        {facts.map((fact, index) => {
          const isLast = index === facts.length - 1;
          const className = cn(
            cellBase,
            !isLast && 'border-r border-white/15',
            index === 1 && 'max-md:border-r-0',
            index < 2 && 'max-md:border-b max-md:border-b-white/15',
          );

          const content = (
            <>
              <span className="text-[0.72rem] tracking-[0.08em] text-white/55 uppercase">
                {fact.label}
              </span>
              <strong className="text-[0.95rem] font-semibold">
                {fact.value}
                {fact.arrow ? <span aria-hidden="true"> ↗</span> : null}
              </strong>
            </>
          );

          return fact.href ? (
            <a key={fact.label} href={fact.href} className={className}>
              {content}
            </a>
          ) : (
            <div key={fact.label} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
