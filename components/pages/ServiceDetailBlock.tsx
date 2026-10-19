import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { leistungenPage, type ServiceDetail } from '@/content/leistungen';
import { cn } from '@/lib/cn';
import { contactHref } from '@/lib/contact';

function CheckList({ title, items }: { readonly title: string; readonly items: readonly string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-[0.75rem] font-extrabold tracking-[0.14em] text-olive uppercase">{title}</h3>
      <ul className="list-none p-0">
        {items.map((item) => (
          <li key={item} className="border-b border-line py-2.5 text-[0.95rem]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ausführliche Leistung (Gestalten/Bauen/Pflegen) als eigene Sektion mit Anker. */
export function ServiceDetailBlock({ service, tone }: { readonly service: ServiceDetail; readonly tone: 'paper' | 'mist' }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={cn('section-pad', tone === 'mist' ? 'bg-mist' : 'bg-paper')}
    >
      <div className="shell grid grid-cols-[0.85fr_1.15fr] gap-16 max-lg:gap-10 max-md:grid-cols-1">
        <div>
          <p className="mb-3 text-[0.78rem] font-extrabold tracking-[0.18em] text-olive">{service.number}</p>
          <h2 id={`${service.id}-title`} className="display-section">
            {service.title}
          </h2>
          <p className="mt-4 max-w-[480px] text-stone">{service.lead}</p>
          <ButtonLink href={contactHref(service.topic)} variant="olive" className="mt-7">
            {service.cta}
          </ButtonLink>
        </div>
        <div className="grid grid-cols-2 gap-10 max-sm:grid-cols-1 max-sm:gap-7">
          <CheckList title={leistungenPage.includesLabel} items={service.includes} />
          <CheckList title={leistungenPage.benefitsLabel} items={service.benefits} />
        </div>
      </div>
    </section>
  );
}

/** Zusatzleistung (Technik & Service) als kompakte Karte mit Anker. */
export function ExtraServiceCard({ service }: { readonly service: ServiceDetail }) {
  return (
    <article id={service.id} aria-labelledby={`${service.id}-title`} className="flex flex-col border border-line bg-white p-8 max-sm:p-6">
      <p className="text-[0.75rem] text-stone">{service.number}</p>
      <h3 id={`${service.id}-title`} className="mt-2 text-[1.35rem] leading-[1.15] font-bold tracking-[-0.02em]">
        {service.title}
      </h3>
      <p className="mt-3 text-stone">{service.lead}</p>
      <dl className="mt-5 grid gap-4 text-[0.92rem]">
        <div>
          <dt className="text-[0.72rem] font-extrabold tracking-[0.14em] text-olive uppercase">{leistungenPage.includesLabel}</dt>
          <dd className="m-0 mt-1">{service.includes.join(' · ')}</dd>
        </div>
        <div>
          <dt className="text-[0.72rem] font-extrabold tracking-[0.14em] text-olive uppercase">{leistungenPage.benefitsLabel}</dt>
          <dd className="m-0 mt-1">{service.benefits.join(' · ')}</dd>
        </div>
      </dl>
      <Link href={contactHref(service.topic)} className="mt-auto inline-flex min-h-[44px] items-end pt-6 font-bold text-olive hover:text-olive-dark">
        {service.cta} <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </article>
  );
}
