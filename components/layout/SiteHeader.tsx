'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartButton } from '@/components/shop/CartButton';
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
    <div className="group relative max-lg:flex max-lg:flex-col">
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          'flex min-h-[44px] items-center gap-2 whitespace-nowrap transition-colors duration-200',
          isCta
            ? 'ml-4 rounded-[2px] border border-olive bg-olive px-[18px] text-white group-hover:border-olive-dark group-hover:bg-olive-dark max-lg:ml-0 max-lg:justify-center'
            : 'px-3.5 group-focus-within:bg-white group-focus-within:text-charcoal group-hover:bg-white group-hover:text-charcoal max-lg:min-h-0 max-lg:p-2 max-lg:group-focus-within:bg-transparent max-lg:group-hover:bg-mist',
        )}
      >
        {item.label}
        {item.children ? (
          <span
            aria-hidden="true"
            className="text-[0.7rem] transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180 max-lg:hidden"
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
            'max-lg:visible max-lg:static max-lg:pt-0 max-lg:opacity-100',
          )}
        >
          <ul className="min-w-[210px] list-none bg-white p-2 text-charcoal shadow-frame max-lg:min-w-0 max-lg:bg-transparent max-lg:p-0 max-lg:pl-4 max-lg:shadow-none">
            {item.children.map((child) => (
              <li key={child.href + child.label}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="flex min-h-[44px] items-center px-4 whitespace-nowrap hover:bg-mist focus-visible:bg-mist max-lg:px-2 max-lg:font-normal"
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
  /** Startseite: transparent über dem Hero-Bild, beim Scrollen hell hinterlegt. Unterseiten: immer hell. */
  readonly overlay?: boolean;
};

/** Ab dieser Scrolltiefe bekommt der transparente Header der Startseite seinen hellen Hintergrund. */
const SOLID_AFTER_PX = 40;

/**
 * Kopfzeile – bleibt beim Scrollen immer sichtbar (Startseite `fixed`, Unterseiten `sticky`).
 * Unterhalb von 1050px (lg) klappt die Navigation auf – darüber passen alle Punkte einzeilig neben das Logo.
 */
export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  // Nur die Startseite braucht den Scroll-Zustand (transparent → hell).
  useEffect(() => {
    if (!overlay) return;
    const update = () => setScrolled(window.scrollY > SOLID_AFTER_PX);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [overlay]);

  // Transparent nur oben auf der Startseite und solange das mobile Menü zu ist.
  const transparent = overlay && !scrolled && !open;

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
        'inset-x-0 top-0 z-40 border-b transition-[background-color,color,border-color,box-shadow] duration-200',
        overlay ? 'fixed' : 'sticky',
        transparent
          ? 'border-transparent text-white'
          : 'border-line bg-mist text-charcoal shadow-[0_6px_24px_rgba(33,35,23,0.06)]',
      )}
    >
      <div className="shell relative flex min-h-(--header-h) items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} – Startseite`}>
          <Image
            src="/assets/logo.png"
            alt=""
            width={62}
            height={62}
            priority
            className="size-[56px] object-contain max-md:size-[46px]"
          />
          <span className="grid text-[1.04rem] leading-[1.05] tracking-[0.08em] uppercase max-md:text-[0.85rem]">
            <strong className="text-[1.17rem] tracking-[0.1em] max-md:text-[0.96rem]">Gartenbau</strong>
            <span>Kaarst</span>
          </span>
        </Link>

        {/* Warenkorb: Desktop rechts neben dem Kontakt-Knopf, mobil rechts neben dem Burger (nicht im Menü). */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            aria-controls="hauptnavigation"
            onClick={() => setOpen((value) => !value)}
            className="hidden size-[46px] p-2.5 max-lg:block"
          >
            <span className="my-1.5 block h-0.5 bg-current" />
            <span className="my-1.5 block h-0.5 bg-current" />
            <span className="my-1.5 block h-0.5 bg-current" />
          </button>
          <nav
            id="hauptnavigation"
            aria-label="Hauptnavigation"
            data-open={open}
            className="flex items-center gap-1.5 text-[0.91rem] font-semibold max-lg:absolute max-lg:top-(--header-h) max-lg:max-h-[calc(100dvh-var(--header-h))] max-lg:overflow-y-auto max-lg:right-0 max-lg:left-0 max-lg:z-30 max-lg:hidden max-lg:flex-col max-lg:items-stretch max-lg:gap-1 max-lg:bg-paper max-lg:p-6 max-lg:text-charcoal max-lg:shadow-frame max-lg:data-[open=true]:flex"
          >
            {nav.map((item) => (
              <NavEntry key={item.href} item={item} variant="plain" onNavigate={close} />
            ))}
            <NavEntry item={navContact} variant="cta" onNavigate={close} />
          </nav>
          <CartButton className="ml-2 max-lg:ml-0" />
        </div>
      </div>
    </header>
  );
}
