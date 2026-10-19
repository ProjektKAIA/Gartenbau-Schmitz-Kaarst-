import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageHero } from '@/components/pages/PageHero';
import { PageSection } from '@/components/pages/PageSection';
import { process } from '@/content/home';
import { ablaufPage } from '@/content/projekte';
import { pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ablauf – von der Beratung bis zur Gartenpflege',
  description:
    'So arbeitet Gartenbau Kaarst: Beratung vor Ort, Planung, Ausführung und Pflege – vier klare Schritte zu Ihrem Garten in Kaarst, Neuss und Umgebung.',
  path: routes.process.path,
});

export default function AblaufPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={pageBreadcrumbs(ablaufPage.label, routes.process.path)}
          label={ablaufPage.label}
          title={ablaufPage.title}
          lead={ablaufPage.lead}
        />

        <PageSection id="schritte" title={ablaufPage.stepsTitle}>
          <ol className="grid list-none grid-cols-4 gap-[18px] p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {process.steps.map((step) => (
              <li key={step.number} className="flex flex-col border-t-4 border-olive bg-white p-7 shadow-[0_10px_30px_rgba(33,35,23,0.06)]">
                <span className="text-[0.78rem] font-extrabold tracking-[0.18em] text-olive">{step.number}</span>
                <h3 className="mt-2 text-[1.35rem] font-bold">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] text-stone">{step.body}</p>
              </li>
            ))}
          </ol>
        </PageSection>

        <ContactCtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
