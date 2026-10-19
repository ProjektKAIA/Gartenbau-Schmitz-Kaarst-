'use client';

import { useMemo, useState } from 'react';
import { shopCategories, shopProducts } from '@/content/shop';
import { cn } from '@/lib/cn';
import { filterByCategory, type CategoryFilter } from '@/lib/shop/filter';
import { categoryLabel } from '@/lib/shop/catalog';
import { ProductCard } from './ProductCard';

const categoryChips: readonly { readonly id: CategoryFilter; readonly label: string }[] = [
  { id: 'all', label: 'Alle' },
  ...shopCategories,
];

/** Die ersten Produktbilder laden vorrangig (LCP) – so viele, wie in die erste Reihe passen (max. 3 Spalten). */
const PRIORITY_IMAGES = 3;

/** Katalog mit Kategorie-Filter; der Warenkorb liegt global im Header. */
export function ShopCatalog() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const matches = useMemo(() => filterByCategory(shopProducts, category), [category]);
  // Ein durchgehendes Raster statt Gruppen je Kategorie: keine halbleeren Reihen, weniger Höhe.
  // Die Gruppierung übernehmen die Kategorie-Chips; die Kategorie steht im Detail-Dialog.

  return (
    <div>
      <div
        role="group"
        aria-label="Nach Kategorie filtern"
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
                'min-h-[40px] rounded-full border px-4 text-[0.85rem] font-semibold whitespace-nowrap transition-colors',
                active ? 'border-charcoal bg-charcoal text-white' : 'border-line bg-white text-charcoal hover:border-charcoal',
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {matches.length === 1 ? '1 Produkt' : `${matches.length} Produkte`}
      </p>

      <section aria-labelledby="shop-products-title" className="mt-6">
        <h2 id="shop-products-title" className="sr-only">
          Produkte
        </h2>
        <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 lg:gap-6">
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
    </div>
  );
}
