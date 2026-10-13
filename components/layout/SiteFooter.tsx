import Image from 'next/image';
import Link from 'next/link';
import { withdrawalCopy } from '@/content/withdrawal';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-[#222220] pt-[66px] pb-7 text-white">
      <div className="shell">
        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-11 max-sm:grid-cols-1">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="" width={54} height={54} className="size-[54px]" />
            <span className="grid text-[1.04rem] leading-[1.05] tracking-[0.08em] uppercase">
              <strong className="text-[1.17rem] tracking-[0.1em]">Gartenbau</strong>
              <span>Kaarst</span>
            </span>
          </div>
          <p className="text-white/58">{site.claim}</p>
          <nav
            aria-label="Rechtliches und Social Media"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[0.82rem] text-white/72"
          >
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/agb">AGB</Link>
            <Link href="/widerruf">Widerruf</Link>
            <a href={site.social.instagram} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
          </nav>
        </div>
        {/* § 356a BGB: auf jeder Seite verfügbar und hervorgehoben – nicht in ein Menü verschieben. */}
        <div className="mt-10">
          <Link
            href="/vertrag-widerrufen"
            className="inline-flex min-h-[44px] items-center rounded-[2px] border-2 border-olive-pale px-5 text-[0.85rem] font-bold text-white transition-colors hover:bg-olive-pale hover:text-charcoal-deep"
          >
            {withdrawalCopy.entryLabel}
          </Link>
        </div>
        <div className="mt-[50px] flex justify-between border-t border-white/12 pt-[22px] text-[0.75rem] text-white/44 max-sm:flex-col max-sm:gap-2.5">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.owner}
          </p>
          <a href="#top">Nach oben ↑</a>
        </div>
      </div>
    </footer>
  );
}
