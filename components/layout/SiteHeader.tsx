'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { nav } from '@/content/home';
import { site } from '@/lib/site';

/** Kopfzeile liegt über dem Hero-Bild; unterhalb von 820px klappt die Navigation auf. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20 text-white">
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

      <div className="shell flex min-h-[104px] items-center justify-between max-md:min-h-[86px]">
        <a href="#top" className="inline-flex items-center gap-3" aria-label={`${site.name} – Startseite`}>
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
        </a>

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
          className="flex items-center gap-1.5 text-[0.91rem] font-semibold max-lg:gap-1 max-lg:text-[0.82rem] max-md:absolute max-md:top-[122px] max-md:right-4 max-md:left-4 max-md:hidden max-md:flex-col max-md:items-stretch max-md:gap-3.5 max-md:bg-paper max-md:p-6 max-md:text-charcoal max-md:shadow-frame max-md:data-[open=true]:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[44px] items-center px-3.5 whitespace-nowrap transition-colors duration-200 hover:bg-white hover:text-charcoal focus-visible:bg-white focus-visible:text-charcoal max-lg:px-2.5 max-md:min-h-0 max-md:p-2 max-md:hover:bg-mist"
            >
              {item.label}
            </a>
          ))}
          <ButtonLink href="#kontakt" size="small" onClick={() => setOpen(false)} className="ml-4 max-lg:ml-2 max-md:ml-0">
            Projekt anfragen
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
