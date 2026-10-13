import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { leistungenPage, type ServiceDetail } from '@/content/leistungen';
import { cn } from '@/lib/cn';
import { contactHref } from '@/lib/contact';

function CheckList({ title, items, tone }: { readonly title: string; readonly items: readonly string[]; readonly tone: 'light' | 'dark' }) {
  return (
    <div>
      <h3 className={cn('mb-3 text-[0.75rem] font-extrabold tracking-[0.14em] uppercase', tone === 'dark' ? 'text-olive-pale' : 'text-olive')}>
        {title}
      </h3>
      <ul className="list-none p-0">
        {items.map((item) => (
          <li key={item} className={cn('border-b py-2.5 text-[0.95rem]', tone === 'dark' ? 'border-white/13' : 'border-line')}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ausführliche Leistung (Gestalten/Bauen/Pflegen) als eigene Sektion mit Anker. */
export function ServiceDetailBlock({ service, dark }: { readonly service: ServiceDetail; readonly dark: boolean }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={cn('scroll-mt-6 py-[96px] max-md:py-16', dark ? 'bg-charcoal text-white' : 'bg-paper')}
    >
      <div className="shell grid grid-cols-[0.9fr_1.1fr] gap-[80px] max-lg:gap-12 max-md:grid-cols-1">
        <div>
          <p className={cn('text-[0.82rem] font-extrabold tracking-[0.14em]', dark ? 'text-olive-pale' : 'text-olive')}>
            {service.number}
          </p>
          <h2 id={`${service.id}-title`} className="mt-3 text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.035em]">
            {service.title}
          </h2>
          <p className={cn('mt-6 max-w-[520px] text-[1.05rem]', dark ? 'text-white/72' : 'text-stone')}>{service.lead}</p>
          <ButtonLink href={contactHref(service.topic)} variant={dark ? 'light' : 'olive'} className="mt-8">
            {service.cta}
          </ButtonLink>
        </div>
        <div className="grid grid-cols-2 gap-10 max-sm:grid-cols-1">
          <CheckList title={leistungenPage.includesLabel} items={service.includes} tone={dark ? 'dark' : 'light'} />
          <CheckList title={leistungenPage.benefitsLabel} items={service.benefits} tone={dark ? 'dark' : 'light'} />
        </div>
      </div>
    </section>
  );
}

/** Zusatzleistung (Technik & Service) als kompakte Karte mit Anker. */
export function ExtraServiceCard({ service }: { readonly service: ServiceDetail }) {
  return (
    <article id={service.id} aria-labelledby={`${service.id}-title`} className="flex scroll-mt-6 flex-col border border-line bg-white p-8 max-sm:p-6">
      <p className="text-[0.75rem] text-stone">{service.number}</p>
      <h3 id={`${service.id}-title`} className="mt-2 text-[1.6rem] leading-[1.1] font-bold tracking-[-0.03em]">
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
