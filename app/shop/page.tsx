import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { SkipLink } from '@/components/ui/SkipLink';
import { shopCopy, shopTerms } from '@/content/shop';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Materiallieferung – Kies, Schotter & Rinde | ${site.name}`,
  description:
    'Kies, Splitt, Schotter, Sand, Pinienrinde und Rindenmulch bestellen – Lieferung bis zum Haus im Umkreis von 30 km um Kaarst, Zahlung auf Rechnung.',
};

export default function ShopPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="bg-paper">
        <section className="bg-mist pt-[96px] pb-14 max-md:pt-16">
          <div className="shell">
            <Eyebrow>{shopCopy.label}</Eyebrow>
            <h1 className="display-2 max-w-[900px]">{shopCopy.title}</h1>
            <p className="mt-6 max-w-[640px] text-[1.05rem] text-stone">{shopCopy.intro}</p>
            <ul className="mt-10 grid list-none grid-cols-3 gap-0 border-t border-line p-0 max-md:grid-cols-1">
              {shopTerms.items.map((term) => (
                <li key={term.title} className="border-line py-5 pr-6 md:border-r md:last:border-r-0 max-md:border-b">
                  <strong className="block text-[0.95rem]">{term.title}</strong>
                  <span className="text-[0.85rem] text-stone">{term.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="shell py-16">
          <ShopCatalog />
        </div>

        <section aria-labelledby="more-title" className="bg-olive py-20 text-white">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <h2 id="more-title" className="text-[clamp(2rem,3.4vw,3rem)] leading-tight font-bold">
                {shopCopy.moreTitle}
              </h2>
              <p className="mt-3 max-w-[560px] text-white/75">{shopCopy.moreBody}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={site.contact.phoneHref} variant="light">
                {site.contact.phone}
              </ButtonLink>
              <ButtonLink href={`mailto:${site.contact.email}?subject=Materialanfrage`} variant="olive">
                E-Mail schreiben
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
