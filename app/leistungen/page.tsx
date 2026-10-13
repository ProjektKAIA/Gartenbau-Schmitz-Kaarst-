import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageIntro } from '@/components/pages/PageIntro';
import { pageMetadata, routes } from '@/lib/seo';
import { ExtraServiceCard, ServiceDetailBlock } from '@/components/pages/ServiceDetailBlock';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { SkipLink } from '@/components/ui/SkipLink';
import { coreServices, extraServices, leistungenPage, shopTeaser } from '@/content/leistungen';

export const metadata = pageMetadata({
  title: 'Leistungen – Gartengestaltung, Pflaster & Gartenpflege in Kaarst',
  description:
    'Gartengestaltung, Terrassen, Wege und Pflaster, Gartenpflege, Bewässerung, Mähroboter, Winterdienst und Hilfe bei Sturmschäden – Gartenbau Kaarst für Kaarst, Neuss und Umgebung.',
  path: routes.services.path,
});

const allServices = [...coreServices, ...extraServices];

export default function LeistungenPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <PageIntro
          label={leistungenPage.label}
          title={leistungenPage.title}
          intro={leistungenPage.intro}
          image={{ src: '/assets/hero.webp', alt: leistungenPage.imageAlt }}
        >
          <nav aria-label={leistungenPage.jumpLabel} className="mt-8">
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {allServices.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="inline-flex min-h-[40px] items-center border border-line bg-white px-3.5 text-[0.85rem] font-semibold transition-colors hover:border-olive hover:text-olive"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageIntro>

        {coreServices.map((service, index) => (
          <ServiceDetailBlock key={service.id} service={service} dark={index % 2 === 0} />
        ))}

        <section aria-labelledby="extras-title" className="bg-mist py-[96px] max-md:py-16">
          <div className="shell">
            <Eyebrow>{leistungenPage.extrasLabel}</Eyebrow>
            <h2 id="extras-title" className="display-2 max-w-[760px]">
              {leistungenPage.extrasTitle}
            </h2>
            <p className="mt-6 max-w-[560px] text-stone">{leistungenPage.extrasBody}</p>
            <div className="mt-12 grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
              {extraServices.map((service) => (
                <ExtraServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="shop-teaser-title" className="bg-sand py-[80px] max-md:py-14">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <Eyebrow>{shopTeaser.label}</Eyebrow>
              <h2 id="shop-teaser-title" className="max-w-[680px] text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08] font-bold tracking-[-0.03em]">
                {shopTeaser.title}
              </h2>
              <p className="mt-4 max-w-[560px] text-stone">{shopTeaser.body}</p>
            </div>
            <ButtonLink href="/shop" variant="dark">
              {shopTeaser.cta}
            </ButtonLink>
          </div>
        </section>

        <ContactCtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
