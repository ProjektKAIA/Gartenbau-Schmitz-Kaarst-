'use client';

import Image from 'next/image';
import { useState } from 'react';
import { nav } from '@/content/home';
import { site } from '@/lib/site';

/** Kopfzeile mit Burger-Menü unterhalb von 820px – Desktop-Navigation passt bis 1280px einzeilig. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-line bg-cream">
      <div className="shell flex h-[104px] items-center justify-between max-md:h-[88px]">
        <a href="#top" className="flex items-center gap-4" aria-label={`${site.name} – Startseite`}>
          <Image
            src="/assets/logo.png"
            alt=""
            width={56}
            height={56}
            priority
            className="size-14 object-contain max-md:size-[50px]"
          />
          <span className="grid text-[1rem] leading-[1.08] tracking-[0.08em] uppercase">
            <strong className="text-[1.17rem] tracking-[0.11em]">Gartenbau</strong>
            <span>Kaarst</span>
          </span>
        </a>

        <button
          type="button"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen((value) => !value)}
          className="hidden size-[46px] p-2.5 max-md:block"
        >
          <span className="my-2 block h-0.5 bg-current" />
          <span className="my-2 block h-0.5 bg-current" />
        </button>

        <nav
          id="hauptnavigation"
          aria-label="Hauptnavigation"
          data-open={open}
          className="flex items-center gap-8 text-[0.9rem] font-semibold max-lg:gap-5 max-md:absolute max-md:top-[88px] max-md:right-[17px] max-md:left-[17px] max-md:hidden max-md:flex-col max-md:items-stretch max-md:bg-paper max-md:p-6 max-md:shadow-[0_22px_55px_rgba(23,52,45,.18)] max-md:data-[open=true]:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="whitespace-nowrap max-md:p-2"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="flex min-h-[44px] items-center gap-2 border border-pine px-[18px] whitespace-nowrap max-md:justify-center"
          >
            Kontakt <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
