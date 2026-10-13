'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav, navContact, type NavItem } from '@/content/home';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

type NavEntryProps = {
  readonly item: NavItem;
  readonly variant: 'plain' | 'cta';
  readonly onNavigate: () => void;
};

/**
 * Menüpunkt mit weißer Box beim Hovern und optionaler Unterpunkt-Box darunter.
 * Desktop: Box erscheint bei Hover und bei Tastaturfokus (focus-within) – solange sie
 * unsichtbar ist, liegen die Unterpunkte dank `invisible` auch nicht in der Tab-Reihenfolge.
 * Mobil: Unterpunkte stehen eingerückt direkt unter dem Hauptpunkt.
 */
function NavEntry({ item, variant, onNavigate }: NavEntryProps) {
  const isCta = variant === 'cta';

  return (
    <div className="group relative max-md:flex max-md:flex-col">
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          'flex min-h-[44px] items-center gap-2 whitespace-nowrap transition-colors duration-200',
          isCta
            ? 'ml-4 rounded-[2px] border border-olive bg-olive px-[18px] text-white group-hover:border-olive-dark group-hover:bg-olive-dark max-lg:ml-2 max-md:ml-0 max-md:justify-center'
            : 'px-3.5 group-focus-within:bg-white group-focus-within:text-charcoal group-hover:bg-white group-hover:text-charcoal max-lg:px-2.5 max-md:min-h-0 max-md:p-2 max-md:group-focus-within:bg-transparent max-md:group-hover:bg-mist',
        )}
      >
        {item.label}
        {item.children ? (
          <span
            aria-hidden="true"
            className="text-[0.7rem] transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180 max-md:hidden"
          >
            ▾
          </span>
        ) : null}
      </Link>

      {item.children ? (
        // pt-2 überbrückt den Spalt zwischen Menüpunkt und Box, damit Hover nicht abreißt.
        <div
          className={cn(
            'invisible absolute top-full z-30 pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100',
            isCta ? 'right-0' : 'left-0',
            'max-md:visible max-md:static max-md:pt-0 max-md:opacity-100',
          )}
        >
          <ul className="min-w-[210px] list-none bg-white p-2 text-charcoal shadow-frame max-md:min-w-0 max-md:bg-transparent max-md:p-0 max-md:pl-4 max-md:shadow-none">
            {item.children.map((child) => (
              <li key={child.href + child.label}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="flex min-h-[44px] items-center px-4 whitespace-nowrap hover:bg-mist focus-visible:bg-mist max-md:px-2 max-md:font-normal"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type SiteHeaderProps = {
  /** Startseite: transparent über dem Hero-Bild. Unterseiten: dunkel hinterlegt. */
  readonly overlay?: boolean;
};

/** Kopfzeile; unterhalb von 820px klappt die Navigation auf. */
export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape schließt das mobile Menü.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      id={overlay ? undefined : 'top'}
      className={cn(
        'inset-x-0 top-0 z-20 text-white',
        overlay ? 'absolute' : 'relative bg-charcoal-deep',
      )}
    >
      <div className="border-b border-white/20 text-[0.78rem] tracking-[0.04em]">
        <div className="shell flex min-h-9 items-center justify-between max-sm:justify-end">
          <span className="max-sm:hidden">{site.serviceArea}</span>
          <div className="flex gap-6">
            <a href={site.contact.phoneHref} className="max-md:hidden">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
      </div>

      <div className="shell relative flex min-h-[104px] items-center justify-between max-md:min-h-[86px]">
        <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} – Startseite`}>
          <Image
            src="/assets/logo.png"
            alt=""
            width={62}
            height={62}
            priority
            className="size-[62px] object-contain max-md:size-[51px]"
          />
          <span className="grid text-[1.04rem] leading-[1.05] tracking-[0.08em] uppercase max-md:text-[0.85rem]">
            <strong className="text-[1.17rem] tracking-[0.1em] max-md:text-[0.96rem]">Gartenbau</strong>
            <span>Kaarst</span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen((value) => !value)}
          className="hidden size-[46px] p-2.5 text-white max-md:block"
        >
          <span className="my-1.5 block h-0.5 bg-current" />
          <span className="my-1.5 block h-0.5 bg-current" />
          <span className="my-1.5 block h-0.5 bg-current" />
        </button>

        <nav
          id="hauptnavigation"
          aria-label="Hauptnavigation"
          data-open={open}
          className="flex items-center gap-1.5 text-[0.91rem] font-semibold max-lg:gap-1 max-lg:text-[0.82rem] max-md:absolute max-md:top-[86px] max-md:right-0 max-md:left-0 max-md:z-30 max-md:hidden max-md:flex-col max-md:items-stretch max-md:gap-1 max-md:bg-paper max-md:p-6 max-md:text-charcoal max-md:shadow-frame max-md:data-[open=true]:flex"
        >
          {nav.map((item) => (
            <NavEntry key={item.href} item={item} variant="plain" onNavigate={close} />
          ))}
          <NavEntry item={navContact} variant="cta" onNavigate={close} />
        </nav>
      </div>
    </header>
  );
}
