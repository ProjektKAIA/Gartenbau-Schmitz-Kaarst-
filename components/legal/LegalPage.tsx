import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/ui/SkipLink';
import type { LegalBlock, LegalDocument } from '@/content/legal/types';
import { site } from '@/lib/site';

export const legalMetadata = (document: LegalDocument): Metadata => ({
  title: `${document.title} | ${site.name}`,
  robots: { index: false },
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
      <SkipLink />
      <SiteHeader />
      <main id="main" className="shell py-[100px] max-md:py-16">
        <h1 className="display-2 mb-4 hyphens-auto wrap-break-word">{document.title}</h1>
        <p className="mb-12 text-[0.85rem] text-stone">Stand: {document.updated}</p>
        <div className="grid max-w-[760px] gap-10 text-stone">
          {document.intro ? <p className="text-[1.05rem] text-charcoal">{document.intro}</p> : null}
          {document.sections.map((section) => (
            <section key={section.heading} className="grid gap-3">
              <h2 className="text-[1.5rem] leading-tight text-charcoal">{section.heading}</h2>
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
