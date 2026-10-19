import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import type { LegalBlock, LegalDocument } from '@/content/legal/types';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

/**
 * Metadaten der Rechtstexte: indexierbar (stehen in der Sitemap), mit Canonical.
 * Die Beschreibung entsteht aus Titel und Betrieb, damit jede Seite eine eigene hat.
 */
export const legalMetadata = (document: LegalDocument, path: string): Metadata =>
  pageMetadata({
    title: document.title,
    description: `${document.title} von ${site.name} (${site.legalName}), ${site.address.city}. Stand: ${document.updated}.`,
    path,
  });

function Block({ block }: { readonly block: LegalBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="whitespace-pre-line">{block.text}</p>;
    case 'list':
      return (
        <ul className="list-disc space-y-1 pl-5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'todo':
      return (
        <p className="border-l-4 border-olive bg-mist px-4 py-3 text-charcoal">
          <strong>Offen:</strong> {block.text}
        </p>
      );
    default: {
      const unreachable: never = block;
      return unreachable;
    }
  }
}

/** Gemeinsame Darstellung für AGB, Widerrufsbelehrung und Datenschutzerklärung. */
export function LegalPage({ document }: { readonly document: LegalDocument }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="shell py-14 max-md:py-10">
        {/* Rechtstitel sind lange Komposita („Geschäftsbedingungen“) – hier trennen statt hart umbrechen. */}
        <h1 className="display-page mb-4 hyphens-auto">{document.title}</h1>
        <p className="mb-12 text-[0.85rem] text-stone">Stand: {document.updated}</p>
        <div className="grid max-w-[760px] gap-10 text-stone wrap-anywhere">
          {document.intro ? <p className="text-[1.05rem] text-charcoal">{document.intro}</p> : null}
          {document.sections.map((section) => (
            <section key={section.heading} className="grid gap-3">
              <h2 className="text-[1.5rem] leading-tight font-bold text-charcoal">{section.heading}</h2>
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </section>
          ))}
          <p>
            <Link href="/" className="border-b border-current text-charcoal">
              Zurück zur Startseite
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
