'use client';

import { useState } from 'react';
import type { ShopProduct, ShopVariant } from '@/content/shop';
import { clampQuantity, MIN_QUANTITY } from '@/lib/shop/cart';
import { cartStore } from '@/lib/shop/cart-store';
import { resolveVariant, sizesOf, variantsForSize } from '@/lib/shop/catalog';

export type ProductSelection = {
  readonly product: ShopProduct;
  readonly sizes: readonly string[];
  readonly size: string;
  /** Lieferformen der gewählten Körnung. */
  readonly options: readonly ShopVariant[];
  readonly variant: ShopVariant;
  readonly quantity: number;
  /** Seit der letzten Auswahländerung in den Warenkorb gelegt. */
  readonly added: boolean;
  readonly selectSize: (size: string) => void;
  readonly selectVariant: (variantId: string) => void;
  readonly setQuantity: (quantity: number) => void;
  readonly addToCart: () => void;
};

/**
 * Auswahl eines Produkts (Körnung, Lieferform, Menge) – eine Quelle für Karte und Detail-Dialog,
 * damit beide immer dieselbe Variante zeigen.
 */
export const useProductSelection = (product: ShopProduct): ProductSelection => {
  const [size, setSize] = useState<string>(product.variants[0].size);
  const [variantId, setVariantId] = useState<string>(product.variants[0].id);
  const [quantity, setQuantityState] = useState(MIN_QUANTITY);
  const [added, setAdded] = useState(false);

  const variant = resolveVariant(product, size, variantId);

  return {
    product,
    sizes: sizesOf(product),
    size,
    options: variantsForSize(product, size),
    variant,
    quantity,
    added,
    selectSize: (next) => {
      setSize(next);
      setVariantId(resolveVariant(product, next, variantId).id);
      setAdded(false);
    },
    selectVariant: (next) => {
      setVariantId(next);
      setAdded(false);
    },
    setQuantity: (next) => setQuantityState(clampQuantity(next)),
    addToCart: () => {
      cartStore.dispatch({ type: 'add', variantId: variant.id, quantity });
      setAdded(true);
    },
  };
};
