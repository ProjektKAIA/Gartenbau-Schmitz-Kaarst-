import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageHero } from '@/components/pages/PageHero';
import { PageSection } from '@/components/pages/PageSection';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
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
          <ProcessSteps />
        </PageSection>

        <ContactCtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
