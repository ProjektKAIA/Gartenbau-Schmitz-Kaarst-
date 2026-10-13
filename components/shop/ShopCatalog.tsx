'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { shopCategories, shopCopy, shopProducts } from '@/content/shop';
import { cn } from '@/lib/cn';
import { filterProducts, type CategoryFilter } from '@/lib/shop/search';
import { site } from '@/lib/site';
import { ProductCard } from './ProductCard';
import { categoryLabel } from '@/lib/shop/catalog';

const categoryChips: readonly { readonly id: CategoryFilter; readonly label: string }[] = [
  { id: 'all', label: 'Alle' },
  ...shopCategories,
];

/** Die ersten Produktbilder laden vorrangig (LCP) – so viele, wie in die erste Reihe passen. */
const PRIORITY_IMAGES = 4;

/** Katalog mit Suche und Kategorie-Filter; der Warenkorb liegt global im Header. */
export function ShopCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const matches = useMemo(
    () => filterProducts(shopProducts, shopCategories, { query, category }),
    [query, category],
  );
  // Ein durchgehendes Raster statt Gruppen je Kategorie: keine halbleeren Reihen, weniger Höhe.
  // Die Gruppierung übernehmen die Kategorie-Chips, die Karte nennt ihre Kategorie.

  return (
    <div>
      <div className="grid gap-3 border-b border-line pb-5 xl:flex xl:items-center xl:gap-5">
        <div role="search" className="relative max-w-[560px] xl:w-[360px] xl:shrink-0">
          <label htmlFor="shop-search" className="sr-only">
            Material suchen
          </label>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-stone"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Suchen: Material, Körnung, Einsatz …"
            autoComplete="off"
            className="min-h-[48px] w-full border border-line bg-white pr-3 pl-11 text-[0.95rem] text-charcoal placeholder:text-stone"
          />
        </div>
        <div
          role="group"
          aria-label="Kategorie"
          className="flex gap-2 max-sm:-mx-4 max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-1 sm:flex-wrap"
        >
          {categoryChips.map((chip) => {
            const active = chip.id === category;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(chip.id)}
                className={cn(
                  'min-h-[36px] rounded-full border px-3.5 text-[0.82rem] font-semibold whitespace-nowrap transition-colors',
                  active
                    ? 'border-charcoal bg-charcoal text-white'
                    : 'border-line bg-white text-charcoal hover:border-charcoal',
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="sr-only">
          {matches.length === 1 ? '1 Produkt gefunden' : `${matches.length} Produkte gefunden`}
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="mt-8 max-w-[620px] border-l-4 border-olive bg-mist p-5">
          <h2 className="text-[1.2rem] font-bold">{shopCopy.noResultsTitle}</h2>
          <p className="mt-1 text-[0.9rem] text-stone">{shopCopy.noResultsBody}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href={site.contact.phoneHref} variant="dark" size="small">
              {site.contact.phone}
            </ButtonLink>
            <ButtonLink href={`mailto:${site.contact.email}?subject=Materialanfrage`} variant="olive" size="small">
              E-Mail schreiben
            </ButtonLink>
          </div>
        </div>
      ) : (
        <section aria-labelledby="shop-products-title" className="mt-6">
          <h2 id="shop-products-title" className="sr-only">
            Produkte
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-[1024px]:grid-cols-3 xl:grid-cols-4">
            {matches.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryLabel={categoryLabel(shopCategories, product.category)}
                priority={index < PRIORITY_IMAGES}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
