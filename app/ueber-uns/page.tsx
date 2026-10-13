import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageIntro } from '@/components/pages/PageIntro';
import { areaPath, pageMetadata, routes } from '@/lib/seo';
import { Process } from '@/components/sections/Process';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { SkipLink } from '@/components/ui/SkipLink';
import { serviceAreas } from '@/content/areas';
import { area, attitude, careerTeaser, facts, owner, training, ueberUnsPage } from '@/content/ueber-uns';
import { contactHref } from '@/lib/contact';

export const metadata = pageMetadata({
  title: 'Über uns – Garten- und Landschaftsbau aus Kaarst',
  description:
    'Gartenbau Kaarst: 2015 von Matthias Schmitz gegründet, Ausbildungsbetrieb seit 2020. Gartengestaltung, Bau und Pflege für Kaarst, Neuss und Umgebung.',
  path: routes.about.path,
});

export default function UeberUnsPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <PageIntro
          label={ueberUnsPage.label}
          title={
            <>
              {ueberUnsPage.titleFirst}
              <br />
              {ueberUnsPage.titleSecond}
            </>
          }
          intro={ueberUnsPage.intro}
          image={{ src: '/assets/logo.png', alt: ueberUnsPage.imageAlt, contain: true }}
        >
          <dl className="mt-10 grid max-w-[720px] grid-cols-3 gap-5 border-t border-line pt-6 max-sm:grid-cols-1">
            {facts.map((fact) => (
              <div key={fact.label} className="grid">
                <dt className="order-2 text-[0.8rem] text-stone">{fact.label}</dt>
                <dd className="order-1 m-0 text-[1.35rem] font-bold text-olive">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </PageIntro>

        <section aria-labelledby="owner-title" className="bg-charcoal py-[96px] text-white max-md:py-16">
          <div className="shell grid grid-cols-2 gap-[80px] max-md:grid-cols-1 max-md:gap-12">
            <div>
              <Eyebrow tone="light">{owner.label}</Eyebrow>
              <h2 id="owner-title" className="text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] font-bold tracking-[-0.035em]">
                {owner.name}
              </h2>
              <p className="mt-3 font-semibold text-olive-pale">{owner.qualification}</p>
              <p className="mt-6 max-w-[540px] text-white/72">{owner.body}</p>
            </div>
            <div>
              <Eyebrow tone="light">{attitude.label}</Eyebrow>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08] font-bold tracking-[-0.03em]">
                {attitude.title}
              </h2>
              <p className="mt-6 max-w-[540px] text-white/72">{attitude.body}</p>
            </div>
          </div>
        </section>

        <Process />

        <section aria-labelledby="training-title" className="bg-mist py-[96px] max-md:py-16">
          <div className="shell grid grid-cols-2 gap-[80px] max-md:grid-cols-1 max-md:gap-14">
            <div>
              <Eyebrow>{training.label}</Eyebrow>
              <h2 id="training-title" className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                {training.title}
              </h2>
              <p className="mt-5 max-w-[520px] text-stone">{training.body}</p>
              <TextLink href={contactHref('karriere')} className="mt-7 text-charcoal">
                {training.cta}
              </TextLink>
            </div>
            <div id="einsatzgebiet" className="scroll-mt-6">
              <Eyebrow>{area.label}</Eyebrow>
              <h2 className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em]">{area.title}</h2>
              <p className="mt-5 text-stone">{area.body}</p>
              <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
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

        <section aria-labelledby="career-teaser-title" className="bg-sand py-[80px] max-md:py-14">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <Eyebrow>{careerTeaser.label}</Eyebrow>
              <h2 id="career-teaser-title" className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08] font-bold tracking-[-0.03em]">
                {careerTeaser.title}
              </h2>
              <p className="mt-4 max-w-[560px] text-stone">{careerTeaser.body}</p>
            </div>
            <ButtonLink href="/#karriere" variant="dark">
              {careerTeaser.cta}
            </ButtonLink>
          </div>
        </section>

        <ContactCtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
