import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageHero } from '@/components/pages/PageHero';
import { PageSection } from '@/components/pages/PageSection';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { karrierePage, opening, workPoints } from '@/content/karriere';
import { pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Karriere – Landschaftsgärtner/in (m/w/d) in Kaarst gesucht',
  description:
    'Gartenbau Kaarst sucht Landschaftsgärtner/innen (m/w/d) in Vollzeit oder Teilzeit für Kaarst, Neuss und Umgebung – jetzt in wenigen Minuten online bewerben.',
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
        />

        <section aria-labelledby="opening-title" className="bg-paper py-16 max-md:py-12">
          <div className="shell">
            <article className="flex items-center justify-between gap-10 border border-line bg-white p-10 max-md:flex-col max-md:items-start max-md:gap-6 max-sm:p-6">
              <div>
                <Eyebrow className="mb-3">{opening.label}</Eyebrow>
                <h2 id="opening-title" className="display-section">
                  {opening.title}
                </h2>
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {opening.terms.map((term) => (
                    <li key={term} className="border border-line bg-mist px-3 py-1 text-[0.85rem] font-semibold">
                      {term}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-[620px] text-stone">{opening.body}</p>
              </div>
              <ButtonLink href={routes.careerApply.path} variant="olive" className="shrink-0">
                {opening.applyCta}
              </ButtonLink>
            </article>
          </div>
        </section>

        <PageSection id="arbeiten" label={workPoints.label} title={workPoints.title} tone="mist">
          <ul className="grid list-none grid-cols-3 gap-10 p-0 max-md:grid-cols-1 max-md:gap-7">
            {workPoints.items.map((item) => (
              <li key={item.title} className="border-t border-line pt-5">
                <h3 className="text-[1.15rem] font-bold">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] text-stone">{item.body}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href={routes.careerApply.path} variant="olive" className="mt-10">
            {opening.applyCta}
          </ButtonLink>
        </PageSection>
      </main>
      <SiteFooter />
    </>
  );
}
