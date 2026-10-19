import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { ButtonLink } from '@/components/ui/Button';
import { shopCategories, shopCopy, shopProducts, shopTerms } from '@/content/shop';
import { breadcrumbJsonLd, pageBreadcrumbs, pageMetadata, routes } from '@/lib/seo';
import { buildShopItemList } from '@/lib/shop/structured-data';
import { site } from '@/lib/site';

const title = 'Kies, Schotter & Rindenmulch mit Lieferung';
const description = `Kies, Schotter, Splitt, Sand, Rindenmulch und Pinienrinde online anfragen – Lieferung bis zum Haus in Kaarst, Neuss und Umgebung (ca. ${shopTerms.deliveryRadiusKm} km), Zahlung auf Rechnung.`;

export const metadata: Metadata = pageMetadata({ title, description, path: routes.shop.path });

const itemListJsonLd = buildShopItemList(shopProducts, shopCategories, routes.shop.path);

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-paper">
        <JsonLd data={itemListJsonLd} />
        <JsonLd data={breadcrumbJsonLd(pageBreadcrumbs(shopCopy.breadcrumb, routes.shop.path))} />
        <h1 className="sr-only">{shopCopy.title}</h1>

        {/* Liefer- und Zahlungshinweise als ruhige Info-Leiste – bewusst nicht als Knöpfe, damit sie nicht wie Filter wirken. */}
        <div className="border-b border-line bg-mist">
          <ul className="shell flex list-none flex-wrap gap-x-8 gap-y-1.5 py-3 text-[0.85rem] font-semibold max-sm:flex-col">
            {shopTerms.items.map((term) => (
              <li key={term} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-olive">
                  ✓
                </span>
                {term}
              </li>
            ))}
          </ul>
        </div>

        <div className="shell pt-6 pb-16">
          <ShopCatalog />
        </div>

        <section aria-labelledby="more-title" className="bg-olive py-16 text-white">
          <div className="shell flex items-center justify-between gap-10 max-md:flex-col max-md:items-start">
            <div>
              <h2 id="more-title" className="display-section">
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
