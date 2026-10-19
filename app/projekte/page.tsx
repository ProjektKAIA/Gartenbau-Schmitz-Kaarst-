import Image from 'next/image';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactCtaBand } from '@/components/pages/ContactCtaBand';
import { PageHero } from '@/components/pages/PageHero';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { moreProjects, processTeaser, projektePage, showcase } from '@/content/projekte';
import { contactHref } from '@/lib/contact';
import { pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projekte – Gartengestaltung, Wege & Pflanzung in Kaarst',
  description:
    'Ausgewählte Gartenprojekte von Gartenbau Kaarst: Gestaltung, Wege, Naturstein und Bepflanzung in Kaarst, Neuss und Umgebung.',
  path: routes.projects.path,
});

export default function ProjektePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={pageBreadcrumbs(projektePage.label, routes.projects.path)}
          label={projektePage.label}
          title={projektePage.title}
        />

        {showcase.map((item, index) => (
          <section key={item.id} id={item.id} aria-labelledby={`${item.id}-title`} className="bg-paper py-16 max-md:py-12">
            <div className="shell grid grid-cols-[1.25fr_0.75fr] items-center gap-12 max-lg:gap-8 max-md:grid-cols-1">
              <figure className="m-0">
                <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 820px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[0.78rem] text-stone">{item.draftNote}</figcaption>
              </figure>
              <div>
                <Eyebrow className="mb-3">{item.label}</Eyebrow>
                <h2 id={`${item.id}-title`} className="display-section">
                  {item.title}
                </h2>
                <p className="mt-4 text-stone">{item.body}</p>
                <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
                  {item.services.map((service) => (
                    <li key={service} className="border border-line bg-white px-3 py-1 text-[0.85rem]">
                      {service}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={contactHref('gestaltung')} variant="olive" className="mt-7">
                  {item.cta}
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}

        <section aria-labelledby="more-title" className="border-t border-line bg-mist py-14 max-md:py-12">
          <div className="shell grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-10">
            <div>
              <h2 id="more-title" className="text-[1.35rem] font-bold">
                {moreProjects.title}
              </h2>
              <p className="mt-3 max-w-[520px] text-stone">{moreProjects.body}</p>
            </div>
            <div>
              <h2 className="text-[1.35rem] font-bold">{processTeaser.title}</h2>
              <p className="mt-3 max-w-[520px] text-stone">{processTeaser.body}</p>
              <TextLink href={routes.process.path} className="mt-5">
                {processTeaser.cta}
              </TextLink>
            </div>
          </div>
        </section>

        <ContactCtaBand topic="gestaltung" />
      </main>
      <SiteFooter />
    </>
  );
}
