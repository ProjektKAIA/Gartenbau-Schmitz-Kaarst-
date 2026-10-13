'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { Select } from '@/components/ui/Select';
import type { ShopProduct } from '@/content/shop';
import { clampQuantity, MAX_QUANTITY, MIN_QUANTITY } from '@/lib/shop/cart';
import { priceUnitLabel, sizesOf, variantsForSize } from '@/lib/shop/catalog';
import { formatShopPrice, isPricePending } from '@/lib/shop/price';

type ProductCardProps = {
  readonly product: ShopProduct;
  readonly onAdd: (variantId: string, quantity: number) => void;
};

/** Produktkarte: Körnung und Lieferform per Auswahlfeld, Menge, „In die Bestellliste". */
export function ProductCard({ product, onAdd }: ProductCardProps) {
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

  const selectSize = (next: string) => {
    setSize(next);
    const first = variantsForSize(product, next)[0];
    if (first) setVariantId(first.id);
    setAdded(false);
  };

  return (
    <article className="flex flex-col border border-line bg-white/70">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={image}
          alt={`${product.name}${variant.image ? `, Körnung ${variant.size}` : ''}`}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 1050px) 50vw, 380px"
          className="object-cover"
        />
        {variant.image ? null : (
          <span className="absolute bottom-3 left-3 bg-[rgba(18,34,29,.72)] px-2.5 py-1 text-[0.68rem] tracking-[0.08em] text-white uppercase">
            Abbildung ähnlich
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-[1.45rem] leading-tight font-bold">{product.name}</h3>
          <p className="mt-1.5 text-[0.88rem] text-stone">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            id={`${uid}-size`}
            label={product.variants[0].size === 'Standard' ? 'Ausführung' : 'Körnung'}
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
          {options.length > 1 ? (
            <Select
              id={`${uid}-packaging`}
              label="Lieferform"
              value={variant.id}
              onChange={(event) => {
                setVariantId(event.target.value);
                setAdded(false);
              }}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.packaging}
                </option>
              ))}
            </Select>
          ) : null}
        </div>

        {product.sizeNotes?.[size] ? (
          <p className="-mt-1 text-[0.82rem] text-olive">{product.sizeNotes[size]}</p>
        ) : null}

        <p className="text-[0.85rem] text-stone">
          <strong className="text-[1.45rem] font-bold text-charcoal">
            {formatShopPrice(variant.priceCents)}
          </strong>{' '}
          {isPricePending(variant.priceCents) ? '' : `/ ${priceUnitLabel(variant)} · `}inkl. MwSt. & Lieferung
        </p>

        <div className="mt-auto flex items-end gap-3">
          <label className="grid w-28 shrink-0 gap-1.5" htmlFor={`${uid}-qty`}>
            <span className="text-[0.7rem] font-bold tracking-[0.12em] whitespace-nowrap text-stone uppercase">
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
              className="min-h-[44px] w-full border border-line bg-white px-3 text-[0.92rem] font-semibold"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              onAdd(variant.id, quantity);
              setAdded(true);
            }}
            className="min-h-[44px] flex-1 border border-olive bg-olive px-4 text-[0.85rem] font-bold text-white transition-colors hover:bg-olive-dark"
          >
            In die Bestellliste
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.2em] text-[0.8rem] text-olive">
          {added ? '✓ In die Bestellliste gelegt' : ''}
        </p>
      </div>
    </article>
  );
}
