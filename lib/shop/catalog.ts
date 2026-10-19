import type { ShopCategory, ShopCategoryId, ShopProduct, ShopVariant } from '@/content/shop';
import { formatPrice } from './price';

/** Körnungen eines Produkts in Katalog-Reihenfolge, ohne Dubletten. */
export const sizesOf = (product: ShopProduct): string[] => [
  ...new Set(product.variants.map((variant) => variant.size)),
];

/** Alle Lieferformen (lose, Sack …), die es für eine Körnung gibt. */
export const variantsForSize = (product: ShopProduct, size: string): ShopVariant[] =>
  product.variants.filter((variant) => variant.size === size);

/**
 * Aktuell gewählte Variante zu Körnung und Lieferform. Gibt es die gewählte Lieferform
 * für die Körnung nicht (mehr), gilt die erste verfügbare – zuletzt die erste des Produkts.
 */
export const resolveVariant = (product: ShopProduct, size: string, variantId: string): ShopVariant => {
  const options = variantsForSize(product, size);
  return options.find((option) => option.id === variantId) ?? options[0] ?? product.variants[0];
};

export const findVariant = (
  products: readonly ShopProduct[],
  variantId: string,
): { product: ShopProduct; variant: ShopVariant } | undefined => {
  for (const product of products) {
    const variant = product.variants.find((candidate) => candidate.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
};

/** Lesbare Bezeichnung einer Variante, z. B. „Pinienrinde, 7–15 mm, 70-L-Sack". */
export const variantLabel = (product: ShopProduct, variant: ShopVariant): string =>
  [product.name, variant.size === 'Standard' ? null : variant.size, variant.packaging]
    .filter(Boolean)
    .join(', ');

/** Bezugsgröße des Preises: „m³" bei loser Ware, sonst das Gebinde („70-L-Sack"). */
export const priceUnitLabel = (variant: ShopVariant): string =>
  variant.packaging === 'lose' ? `${variant.unit} lose` : variant.packaging;

/** Preis mit Bezugsgröße, z. B. „0,00 € / m³ lose" oder „12,50 € / 70-L-Sack". */
export const unitPriceLabel = (variant: ShopVariant): string =>
  `${formatPrice(variant.priceCents)} / ${priceUnitLabel(variant)}`;

/** Anzeigename einer Kategorie – einzige Stelle für dieses Nachschlagen (Karte, Suche, JSON-LD). */
export const categoryLabel = (categories: readonly ShopCategory[], id: ShopCategoryId): string =>
  categories.find((category) => category.id === id)?.label ?? '';
