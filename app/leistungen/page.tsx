import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { JumpLinks } from '@/components/pages/JumpLinks';
import { PageHero } from '@/components/pages/PageHero';
import { PageSection } from '@/components/pages/PageSection';
import { ExtraServiceCard, ServiceDetailBlock } from '@/components/pages/ServiceDetailBlock';
import { ButtonLink } from '@/components/ui/Button';
import { coreServices, extraServices, leistungenPage, shopTeaser } from '@/content/leistungen';
import { pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Leistungen – Gartengestaltung, Pflaster & Gartenpflege in Kaarst',
  description:
    'Gartengestaltung, Terrassen, Wege und Pflaster, Gartenpflege, Bewässerung, Mähroboter, Winterdienst und Hilfe bei Sturmschäden – Gartenbau Kaarst für Kaarst, Neuss und Umgebung.',
  path: routes.services.path,
});

const EXTRAS_ID = 'technik-service';

const jumps = [
  ...coreServices.map((service) => ({ href: `#${service.id}`, label: service.title })),
  { href: `#${EXTRAS_ID}`, label: leistungenPage.extrasLabel },
];

export default function LeistungenPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={pageBreadcrumbs(leistungenPage.label, routes.services.path)}
          label={leistungenPage.label}
          title={leistungenPage.title}
          lead={leistungenPage.intro}
        >
          <JumpLinks label={leistungenPage.jumpLabel} links={jumps} />
        </PageHero>

        {coreServices.map((service, index) => (
          <ServiceDetailBlock key={service.id} service={service} tone={index % 2 === 0 ? 'paper' : 'mist'} />
        ))}

        <PageSection
          id={EXTRAS_ID}
          label={leistungenPage.extrasLabel}
          title={leistungenPage.extrasTitle}
          intro={leistungenPage.extrasBody}
          tone={coreServices.length % 2 === 0 ? 'paper' : 'mist'}
        >
          <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
            {extraServices.map((service) => (
              <ExtraServiceCard key={service.id} service={service} />
            ))}
          </div>
        </PageSection>

        <section aria-labelledby="shop-teaser-title" className="border-t border-line bg-sand py-14 max-md:py-12">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <h2 id="shop-teaser-title" className="display-section max-w-[680px]">
                {shopTeaser.title}
              </h2>
              <p className="mt-3 max-w-[560px] text-stone">{shopTeaser.body}</p>
            </div>
            <ButtonLink href={routes.shop.path} variant="dark">
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
