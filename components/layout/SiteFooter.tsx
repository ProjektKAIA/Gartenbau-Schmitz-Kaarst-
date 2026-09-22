import Image from 'next/image';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-pine-deep pt-16 pb-[26px] text-white">
      <div className="shell">
        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-9 max-md:grid-cols-1">
          <div className="flex items-center gap-4">
            <Image src="/assets/logo.png" alt="" width={54} height={54} className="size-[54px]" />
            <span className="grid text-[1rem] leading-[1.08] tracking-[0.08em] uppercase">
              <strong className="text-[1.17rem] tracking-[0.11em]">Gartenbau</strong>
              <span>Kaarst</span>
            </span>
          </div>
          <p className="text-white/50">{site.claim}</p>
          <nav aria-label="Rechtliches und Social Media" className="flex gap-5 text-[0.8rem] text-white/66">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
          </nav>
        </div>
        <div className="mt-12 flex justify-between border-t border-white/12 pt-5 text-[0.74rem] text-white/40 max-sm:flex-col max-sm:gap-2.5">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.owner}
          </p>
          <p>{site.serviceArea}</p>
        </div>
      </div>
    </footer>
  );
}
