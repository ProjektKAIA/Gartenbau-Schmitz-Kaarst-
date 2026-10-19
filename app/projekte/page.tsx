import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageIntro } from '@/components/pages/PageIntro';
import { Process } from '@/components/sections/Process';
import { ProjectStage } from '@/components/sections/ProjectStage';
import { SkipLink } from '@/components/ui/SkipLink';
import { projektePage } from '@/content/projekte';
import { pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projekte & Ablauf – Gartengestaltung in Kaarst und Umgebung',
  description:
    'Einblick in unsere Gartenprojekte und unseren Ablauf: Beratung, Planung, Ausführung und Pflege – Gartenbau Kaarst für Kaarst, Neuss und Umgebung.',
  path: routes.projects.path,
});

export default function ProjektePage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <PageIntro label={projektePage.label} title={projektePage.title} intro={projektePage.intro}>
          <nav aria-label={projektePage.jumpLabel} className="mt-8">
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {projektePage.jumps.map((jump) => (
                <li key={jump.href}>
                  <a
                    href={jump.href}
                    className="inline-flex min-h-[40px] items-center border border-line bg-white px-3.5 text-[0.85rem] font-semibold transition-colors hover:border-olive hover:text-olive"
                  >
                    {jump.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageIntro>
        <ProjectStage />
        <Process />
        <ContactCtaBand topic="gestaltung" />
      </main>
      <SiteFooter />
    </>
  );
}
