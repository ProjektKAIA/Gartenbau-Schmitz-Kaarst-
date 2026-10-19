'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ShopProduct } from '@/content/shop';
import { cartStore } from '@/lib/shop/cart-store';
import { AddToCart, PriceLine, ProductOptions } from './ProductControls';
import { ProductDetailDialog } from './ProductDetailDialog';
import { useProductSelection } from './useProductSelection';

type ProductCardProps = {
  readonly product: ShopProduct;
  /** Kategorie – erscheint nur im Detail-Dialog, die Karte bleibt schlank. */
  readonly categoryLabel: string;
  /** Bilder der ersten Reihe vorrangig laden (LCP). */
  readonly priority?: boolean;
};

/**
 * Bildbetonte Produktkarte: großes Foto, Name, Preis, Auswahl nur bei echten Optionen,
 * Menge + „In den Warenkorb". Beschreibung und Details öffnen sich per Klick auf Bild oder Name.
 */
export function ProductCard({ product, categoryLabel, priority = false }: ProductCardProps) {
  const selection = useProductSelection(product);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { variant } = selection;
  const image = variant.image ?? product.image;

  const closeDetails = () => setDetailsOpen(false);

  return (
    <article id={product.id} className="group flex flex-col border border-line bg-white">
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px"
            className="object-cover transition-transform duration-300 group-has-[button[data-details]:hover]:scale-[1.03]"
          />
          {variant.image ? null : (
            <span className="absolute bottom-2.5 left-2.5 bg-charcoal-deep/65 px-2 py-0.5 text-[0.68rem] tracking-[0.04em] text-white">
              Abbildung ähnlich
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-3 px-4 pt-4">
          <h3 className="text-[1.2rem] leading-tight font-bold">
            {/* Ein fokussierbares Element für Bild + Name: die Fläche reicht per ::after über das Foto. */}
            <button
              type="button"
              data-details
              aria-haspopup="dialog"
              onClick={() => setDetailsOpen(true)}
              className="text-left after:absolute after:inset-0 hover:underline focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-olive-soft"
            >
              {product.name}
              <span className="sr-only">, Details anzeigen</span>
            </button>
          </h3>
          <span aria-hidden="true" className="shrink-0 text-[0.8rem] font-semibold text-olive underline-offset-2 group-has-[button[data-details]:hover]:underline">
            Details
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pt-1.5 pb-3">
        <PriceLine selection={selection} />
        <div className="mt-auto grid gap-3 pt-1">
          <ProductOptions selection={selection} />
          <AddToCart selection={selection} />
        </div>
      </div>

      {detailsOpen ? (
        <ProductDetailDialog
          selection={selection}
          categoryLabel={categoryLabel}
          onClose={closeDetails}
          onViewCart={() => {
            closeDetails();
            cartStore.open();
          }}
        />
      ) : null}
    </article>
  );
}
