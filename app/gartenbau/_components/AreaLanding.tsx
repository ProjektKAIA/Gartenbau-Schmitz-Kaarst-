import Link from 'next/link';
import { PageHero } from '@/components/pages/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { areaPageCopy as copy, type ServiceArea } from '@/content/areas';
import type { AreaLocation } from '@/lib/areas';
import { contactHref } from '@/lib/contact';
import type { BreadcrumbItem } from '@/lib/seo';
import { areaPath, routes } from '@/lib/seo';
import { site } from '@/lib/site';

type AreaLandingProps = {
  readonly area: ServiceArea;
  readonly breadcrumbs: readonly BreadcrumbItem[];
  readonly location: AreaLocation;
  readonly deliverable: boolean;
  readonly others: readonly ServiceArea[];
};

function locationText(location: AreaLocation): string {
  switch (location.kind) {
    case 'home':
      return copy.locationHome;
    case 'nearby':
      return copy.locationNearby(location.distanceKm, location.direction);
    default: {
      const unreachable: never = location;
      return unreachable;
    }
  }
}

/** Interner Textlink mit Pfeil – wie TextLink, aber über next/link (kein voller Seiten-Reload). */
function ArrowLink({ href, children }: { readonly href: string; readonly children: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-3.5 border-b border-current pb-1 font-bold">
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/** Lokale Landingpage eines Einsatzgebiets – reine Darstellung, Inhalte aus content/areas.ts. */
export function AreaLanding({ area, breadcrumbs, location, deliverable, others }: AreaLandingProps) {
  const facts = [
    { label: copy.factLocation, value: locationText(location) },
    { label: copy.factDistricts, value: area.districts.join(', ') },
    { label: copy.factDelivery, value: deliverable ? copy.deliveryIn : copy.deliveryOut },
  ] as const;

  return (
    <main id="main" className="bg-paper">
      <PageHero breadcrumbs={breadcrumbs} label={copy.eyebrow(area.county)} title={area.headline} lead={area.lead}>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={contactHref()} variant="light">
            {copy.ctaProject(area.city)}
          </ButtonLink>
          {deliverable ? (
            <ButtonLink href={routes.shop.path} variant="olive">
              {copy.ctaShop}
            </ButtonLink>
          ) : null}
        </div>
        <dl className="mt-10 grid grid-cols-3 border-t border-white/15 max-md:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.label} className="border-white/15 py-5 pr-6 md:border-r md:pl-6 md:first:pl-0 md:last:border-r-0 max-md:border-b">
              <dt className="text-[0.72rem] font-bold tracking-[0.13em] text-white/55 uppercase">{fact.label}</dt>
              <dd className="m-0 mt-1 text-[0.95rem] text-white/90">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-labelledby="local-title" className="py-20 max-md:py-14">
        <div className="shell grid grid-cols-[1.2fr_0.8fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
          <div>
            <h2 id="local-title" className="display-section">
              {area.localTitle}
            </h2>
            <p className="mt-5 max-w-[640px] text-stone">{area.localBody}</p>
          </div>
          <div>
            <h3 className="text-[0.78rem] font-extrabold tracking-[0.18em] text-olive uppercase">
              {copy.districtsTitle(area.city)}
            </h3>
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
              {area.districts.map((district) => (
                <li key={district} className="border border-line bg-white px-3 py-1.5 text-[0.9rem]">
                  {district}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="bg-mist py-20 max-md:py-14">
        <div className="shell">
          <Eyebrow>{copy.focusLabel(area.city)}</Eyebrow>
          <h2 id="focus-title" className="display-section">
            {copy.focusTitle}
          </h2>
          <ul className="mt-10 grid list-none grid-cols-3 gap-[18px] p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {area.focus.map((item, index) => (
              <li key={item.title} className="flex flex-col bg-white p-8 shadow-frame max-sm:p-6">
                <span className="text-[0.82rem] font-extrabold tracking-[0.14em] text-olive">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[1.25rem] leading-snug font-bold">{item.title}</h3>
                <p className="mt-3 text-stone">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <ArrowLink href={routes.services.path}>{copy.focusLink}</ArrowLink>
          </p>
        </div>
      </section>

      {deliverable ? (
        <section aria-labelledby="delivery-title" className="py-20 max-md:py-14">
          <div className="shell grid grid-cols-[1.2fr_0.8fr] items-center gap-16 max-md:grid-cols-1 max-md:gap-8">
            <div>
              <h2 id="delivery-title" className="display-section">
                {copy.deliveryTitle(area.city)}
              </h2>
              <p className="mt-5 max-w-[640px] text-stone">{copy.deliveryBody(area.city)}</p>
            </div>
            <p>
              <ArrowLink href={routes.shop.path}>{copy.deliveryLink}</ArrowLink>
            </p>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="border-t border-line py-20 max-md:py-14">
        <div className="shell">
          <h2 id="faq-title" className="display-section">
            {copy.faqTitle(area.city)}
          </h2>
          <dl className="mt-8 grid max-w-[820px] gap-0">
            {area.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-line py-6">
                <dt className="text-[1.1rem] font-bold">{faq.question}</dt>
                <dd className="m-0 mt-2 text-stone">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="bg-olive py-16 text-white max-md:py-12">
        <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
          <div>
            <h2 id="cta-title" className="display-section max-w-[620px]">
              {copy.ctaTitle(area.city)}
            </h2>
            <p className="mt-3 max-w-[560px] text-white/75">{copy.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={contactHref()} variant="light">
              {copy.ctaProject(area.city)}
            </ButtonLink>
            <ButtonLink href={site.contact.phoneHref} variant="dark">
              {site.contact.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <nav aria-labelledby="others-title" className="py-14">
        <div className="shell">
          <h2 id="others-title" className="text-[0.78rem] font-extrabold tracking-[0.18em] text-olive uppercase">
            {copy.othersTitle}
          </h2>
          <ul className="mt-4 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={areaPath(other.slug)} className="underline underline-offset-4 hover:text-olive">
                  Gartenbau {other.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
}
