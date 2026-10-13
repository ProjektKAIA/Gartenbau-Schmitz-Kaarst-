import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionLabel';
import { SkipLink } from '@/components/ui/SkipLink';
import { shopCategories, shopCopy, shopProducts, shopTerms } from '@/content/shop';
import { pageMetadata, routes } from '@/lib/seo';
import { buildShopItemList } from '@/lib/shop/structured-data';
import { site } from '@/lib/site';

const title = 'Kies, Schotter & Rindenmulch mit Lieferung';
const description = `Kies, Schotter, Splitt, Sand, Rindenmulch und Pinienrinde online anfragen – Lieferung bis zum Haus in Kaarst, Neuss und Umgebung (ca. ${shopTerms.deliveryRadiusKm} km), Zahlung auf Rechnung.`;

export const metadata: Metadata = pageMetadata({ title, description, path: routes.shop.path });

const itemListJsonLd = buildShopItemList(shopProducts, shopCategories, routes.shop.path);

export default function ShopPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="bg-paper">
        <JsonLd data={itemListJsonLd} />
        <section className="border-b border-line bg-mist py-7 max-md:py-5">
          <div className="shell">
            <Eyebrow className="mb-2">{shopCopy.label}</Eyebrow>
            <h1 className="display-page">
              {shopCopy.title}
            </h1>
            <p className="mt-2 text-[0.98rem] text-stone">{shopCopy.intro}</p>
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0 max-sm:mt-3 max-sm:gap-1.5">
              {shopTerms.items.map((term) => (
                <li
                  key={term}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-[0.8rem] font-semibold max-sm:min-h-7 max-sm:px-2.5 max-sm:text-[0.72rem]"
                >
                  <span aria-hidden="true" className="text-olive">
                    ✓
                  </span>
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="shell pt-6 pb-16">
          <ShopCatalog />
        </div>

        <section aria-labelledby="more-title" className="bg-olive py-16 text-white">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <h2 id="more-title" className="text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-bold">
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
