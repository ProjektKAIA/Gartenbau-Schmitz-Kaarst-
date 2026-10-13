'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { Select } from '@/components/ui/Select';
import type { ShopProduct } from '@/content/shop';
import { clampQuantity, MAX_QUANTITY, MIN_QUANTITY } from '@/lib/shop/cart';
import { cartStore } from '@/lib/shop/cart-store';
import { priceUnitLabel, sizesOf, variantsForSize } from '@/lib/shop/catalog';
import { formatShopPrice, isPricePending } from '@/lib/shop/price';

type ProductCardProps = {
  readonly product: ShopProduct;
  /** Kategorie als kleine Zeile über dem Namen (das Raster ist nicht mehr nach Kategorien gruppiert). */
  readonly categoryLabel: string;
  /** Bilder der ersten Reihe vorrangig laden (LCP). */
  readonly priority?: boolean;
};

/** Feste Angabe statt Auswahlfeld, wenn es nur eine Option gibt – damit niemand ins Leere klickt. */
function FixedOption({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <p className="text-[0.82rem]">
      <span className="text-stone">{label}:</span> <strong className="font-semibold">{value}</strong>
    </p>
  );
}

/** Kompakte Produktkarte: Körnung/Lieferform (Auswahl nur bei mehreren Optionen), Menge, „In den Warenkorb". */
export function ProductCard({ product, categoryLabel, priority = false }: ProductCardProps) {
  const uid = useId();
  const sizes = sizesOf(product);
  const [size, setSize] = useState(product.variants[0].size);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [added, setAdded] = useState(false);

  const options = variantsForSize(product, size);
  // Fällt die gewählte Lieferform bei einer neuen Körnung weg, gilt die erste verfügbare.
  const variant = options.find((option) => option.id === variantId) ?? options[0] ?? product.variants[0];
  const image = variant.image ?? product.image;
  const showSize = size !== 'Standard';
  const sizeNote = product.sizeNotes?.[size];

  const selectSize = (next: string) => {
    setSize(next);
    const first = variantsForSize(product, next)[0];
    if (first) setVariantId(first.id);
    setAdded(false);
  };

  return (
    <article id={product.id} className="flex scroll-mt-6 flex-col border border-line bg-white/70">
      <div className="relative aspect-[2/1] overflow-hidden bg-sand">
        <Image
          src={image}
          alt={`${product.name}${variant.image && showSize ? `, Körnung ${variant.size}` : ''}`}
          fill
          priority={priority}
          sizes="(max-width: 589px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 300px"
          className="object-cover"
        />
        {variant.image ? null : (
          <span className="absolute bottom-2 left-2 bg-charcoal-deep/75 px-2 py-0.5 text-[0.65rem] tracking-[0.08em] text-white uppercase">
            Abbildung ähnlich
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          {categoryLabel ? (
            <p className="mb-1 text-[0.68rem] font-bold tracking-[0.12em] text-olive uppercase">{categoryLabel}</p>
          ) : null}
          <h3 className="text-[1.15rem] leading-tight font-bold">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-[0.82rem] leading-snug text-stone">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {sizes.length > 1 ? (
            <Select
              id={`${uid}-size`}
              label="Körnung"
              value={size}
              onChange={(event) => selectSize(event.target.value)}
              className={options.length > 1 ? '' : 'col-span-2'}
            >
              {sizes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          ) : null}
          {options.length > 1 ? (
            <Select
              id={`${uid}-packaging`}
              label="Lieferform"
              value={variant.id}
              onChange={(event) => {
                setVariantId(event.target.value);
                setAdded(false);
              }}
              className={sizes.length > 1 ? '' : 'col-span-2'}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.packaging}
                </option>
              ))}
            </Select>
          ) : null}
          <div className="col-span-2 grid gap-0.5 empty:hidden">
            {sizes.length > 1 || !showSize ? null : <FixedOption label="Körnung" value={size} />}
            {options.length > 1 ? null : <FixedOption label="Lieferform" value={variant.packaging} />}
          </div>
        </div>

        {sizeNote ? <p className="-mt-1 text-[0.78rem] leading-snug text-olive">{sizeNote}</p> : null}

        <p className="mt-auto text-[0.78rem] text-stone">
          <strong className="text-[1.15rem] font-bold text-charcoal">{formatShopPrice(variant.priceCents)}</strong>{' '}
          {isPricePending(variant.priceCents) ? '' : `/ ${priceUnitLabel(variant)} · `}inkl. MwSt. & Lieferung
        </p>

        <div className="flex items-end gap-2">
          <label className="grid w-[76px] shrink-0 gap-1" htmlFor={`${uid}-qty`}>
            <span className="text-[0.68rem] font-bold tracking-[0.1em] whitespace-nowrap text-stone uppercase">
              Menge ({variant.unit})
            </span>
            <input
              id={`${uid}-qty`}
              type="number"
              inputMode="numeric"
              min={MIN_QUANTITY}
              max={MAX_QUANTITY}
              step={1}
              value={quantity}
              onChange={(event) => setQuantity(clampQuantity(event.target.valueAsNumber))}
              className="min-h-[44px] w-full border border-line bg-white px-2.5 text-[0.92rem] font-semibold"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              cartStore.dispatch({ type: 'add', variantId: variant.id, quantity });
              setAdded(true);
            }}
            className="min-h-[44px] flex-1 border border-olive bg-olive px-3 text-[0.85rem] font-bold whitespace-nowrap text-white transition-colors hover:bg-olive-dark"
          >
            In den Warenkorb
          </button>
        </div>
        <p aria-live="polite" className="-mt-1 min-h-[1.5em] text-[0.8rem] text-olive">
          {added ? (
            <>
              ✓ Im Warenkorb ·{' '}
              <button type="button" onClick={cartStore.open} className="inline-block min-h-6 font-semibold underline hover:text-olive-dark">
                ansehen
              </button>
            </>
          ) : null}
        </p>
      </div>
    </article>
  );
}
