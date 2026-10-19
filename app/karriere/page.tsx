import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageHero } from '@/components/pages/PageHero';
import { PageSection } from '@/components/pages/PageSection';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { applyBand, careerApplyHref, karrierePage, openings, workPoints } from '@/content/karriere';
import { contactHref } from '@/lib/contact';
import { pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Karriere – Jobs & Ausbildung im Garten- und Landschaftsbau in Kaarst',
  description: `Landschaftsgärtner/in oder Ausbildung im GaLaBau gesucht? Gartenbau Kaarst ist Ausbildungsbetrieb seit ${site.trainingCompanySince} – jetzt einfach bewerben.`,
  path: routes.career.path,
});

export default function KarrierePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={pageBreadcrumbs(karrierePage.label, routes.career.path)}
          label={karrierePage.label}
          title={karrierePage.title}
          lead={karrierePage.intro}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={careerApplyHref} variant="light">
              {applyBand.mailCta}
            </ButtonLink>
          </div>
        </PageHero>

        <PageSection id="stellen" label={openings.label} title={openings.title}>
          <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
            {openings.items.map((item) => (
              <article key={item.title} className="border border-line bg-white p-8 max-sm:p-6">
                <h3 className="text-[1.3rem] leading-tight font-bold">{item.title}</h3>
                <p className="mt-3 text-stone">{item.body}</p>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection id="arbeiten" label={workPoints.label} title={workPoints.title} tone="mist">
          <ul className="grid list-none grid-cols-3 gap-10 p-0 max-md:grid-cols-1 max-md:gap-7">
            {workPoints.items.map((item) => (
              <li key={item.title} className="border-t border-line pt-5">
                <h3 className="text-[1.15rem] font-bold">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] text-stone">{item.body}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <section aria-labelledby="apply-title" className="bg-olive py-16 text-white max-md:py-12">
          <div className="shell flex items-center justify-between gap-10 max-lg:flex-col max-lg:items-start">
            <div>
              <Eyebrow tone="light" className="mb-3">
                {applyBand.label}
              </Eyebrow>
              <h2 id="apply-title" className="display-section max-w-[620px]">
                {applyBand.title}
              </h2>
              <p className="mt-3 max-w-[560px] text-white/75">{applyBand.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={careerApplyHref} variant="light">
                {applyBand.mailCta}
              </ButtonLink>
              <ButtonLink href={contactHref('karriere')} variant="dark">
                {applyBand.formCta}
              </ButtonLink>
              <ButtonLink href={site.contact.phoneHref} variant="dark">
                {site.contact.phone}
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
