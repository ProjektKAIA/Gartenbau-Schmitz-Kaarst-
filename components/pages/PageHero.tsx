import Link from 'next/link';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';
import { breadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo';

type PageHeroProps = {
  readonly breadcrumbs: readonly BreadcrumbItem[];
  readonly label: string;
  readonly title: ReactNode;
  readonly lead?: string;
  /** Zusatz unter dem Text, z. B. Knöpfe, Sprungmarken oder Eckdaten. */
  readonly children?: ReactNode;
  /** `compact`: flacher Kopf, wenn der Inhalt sofort sichtbar sein muss (Shop). */
  readonly size?: 'default' | 'compact';
};

/** Sichtbarer Seitenpfad – dieselben Einträge wie im BreadcrumbList-JSON-LD. */
function Breadcrumbs({ items, compact }: { readonly items: readonly BreadcrumbItem[]; readonly compact: boolean }) {
  return (
    <nav aria-label="Seitenpfad" className={cn('text-[0.8rem] text-white/60', compact ? 'mb-4' : 'mb-7')}>
      <ol className="flex list-none flex-wrap gap-2 p-0">
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <li key={item.path} aria-current="page" className="text-white/85">
              {item.name}
            </li>
          ) : (
            <li key={item.path} className="flex gap-2">
              <Link href={item.path} className="underline underline-offset-2 hover:text-white">
                {item.name}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/**
 * Einheitlicher Seitenkopf aller Unterseiten: dunkles, kompaktes Band mit Seitenpfad,
 * Titel und kurzem Einleitungssatz. Bewusst ohne Bild – der Inhalt darunter steht im Vordergrund.
 */
export function PageHero({ breadcrumbs, label, title, lead, children, size = 'default' }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-charcoal text-white">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 h-[420px] w-[560px] -rotate-[14deg] text-white opacity-[0.05] paver-grid [background-size:70px_38px] [mask-image:radial-gradient(circle_at_50%_50%,#000_20%,transparent_70%)]"
      />
      <div className={size === 'compact' ? 'shell py-8 max-md:py-6' : 'shell py-14 max-md:py-10'}>
        <Breadcrumbs items={breadcrumbs} compact={size === 'compact'} />
        <Eyebrow tone="light" className="mb-3">
          {label}
        </Eyebrow>
        <h1 id="page-title" className="display-page max-w-[860px]">
          {title}
        </h1>
        {lead ? <p className="mt-5 max-w-[680px] text-[1.05rem] text-white/75">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
