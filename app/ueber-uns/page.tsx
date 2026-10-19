import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageHero } from '@/components/pages/PageHero';
import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { serviceAreas } from '@/content/areas';
import { area, attitude, facts, owner, training, ueberUnsPage } from '@/content/ueber-uns';
import { areaPath, pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Über uns – Garten- und Landschaftsbau aus Kaarst',
  description:
    'Gartenbau Kaarst: 2015 von Matthias Schmitz gegründet, Ausbildungsbetrieb seit 2020. Gartengestaltung, Bau und Pflege für Kaarst, Neuss und Umgebung.',
  path: routes.about.path,
});

export default function UeberUnsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={pageBreadcrumbs(ueberUnsPage.label, routes.about.path)}
          label={ueberUnsPage.label}
          title={`${ueberUnsPage.titleFirst} ${ueberUnsPage.titleSecond}`}
          lead={ueberUnsPage.intro}
        >
          <dl className="mt-9 grid max-w-[720px] grid-cols-3 gap-5 border-t border-white/15 pt-6 max-sm:grid-cols-1 max-sm:gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="grid">
                <dt className="order-2 text-[0.8rem] text-white/60">{fact.label}</dt>
                <dd className="order-1 m-0 text-[1.3rem] font-bold text-olive-pale">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        <section aria-labelledby="owner-title" className="bg-paper py-20 max-md:py-14">
          <div className="shell grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-12">
            <div>
              <Eyebrow className="mb-3">{owner.label}</Eyebrow>
              <h2 id="owner-title" className="display-section">
                {owner.name}
              </h2>
              <p className="mt-2 font-semibold text-olive">{owner.qualification}</p>
              <p className="mt-4 max-w-[520px] text-stone">{owner.body}</p>
            </div>
            <div>
              <Eyebrow className="mb-3">{attitude.label}</Eyebrow>
              <h2 className="display-section">{attitude.title}</h2>
              <p className="mt-4 max-w-[520px] text-stone">{attitude.body}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="training-title" className="bg-mist py-20 max-md:py-14">
          <div className="shell grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-12">
            <div>
              <Eyebrow className="mb-3">{training.label}</Eyebrow>
              <h2 id="training-title" className="display-section">
                {training.title}
              </h2>
              <p className="mt-4 max-w-[520px] text-stone">{training.body}</p>
              <TextLink href={routes.career.path} className="mt-6">
                {training.cta}
              </TextLink>
            </div>
            <div id="einsatzgebiet">
              <Eyebrow className="mb-3">{area.label}</Eyebrow>
              <h2 className="display-section">{area.title}</h2>
              <p className="mt-4 text-stone">{area.body}</p>
              <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
                {serviceAreas.map((place) => (
                  <li key={place.slug}>
                    <Link
                      href={areaPath(place.slug)}
                      className="inline-flex min-h-[40px] items-center border border-line bg-white px-3.5 text-[0.9rem] font-semibold transition-colors hover:border-olive hover:text-olive"
                    >
                      Gartenbau {place.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ContactCtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
