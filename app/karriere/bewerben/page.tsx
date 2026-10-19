import { ApplicationForm } from '@/components/career/ApplicationForm';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageHero } from '@/components/pages/PageHero';
import { applicationCopy, karrierePage } from '@/content/karriere';
import { breadcrumbTrail, pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Bewerbung als Landschaftsgärtner/in (m/w/d)',
  description: 'Online bewerben bei Gartenbau Kaarst: ein paar Angaben zu Ausbildung, Erfahrung und Verfügbarkeit genügen – kein Anschreiben nötig.',
  path: routes.careerApply.path,
});

const breadcrumbs = breadcrumbTrail(
  { name: karrierePage.label, path: routes.career.path },
  { name: applicationCopy.label, path: routes.careerApply.path },
);

export default function BewerbenPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={breadcrumbs}
          label={applicationCopy.label}
          title={applicationCopy.title}
          lead={applicationCopy.intro}
        />
        <div className="shell max-w-[860px] pt-12 pb-20 max-md:pt-10 max-md:pb-14">
          <ApplicationForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
