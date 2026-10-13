import type { ShopCategory, ShopCategoryId, ShopProduct } from '@/content/shop';
import { categoryLabel } from './catalog';

/** Kategorie-Filter: eine Kategorie oder „alle". */
export type CategoryFilter = ShopCategoryId | 'all';

export type ProductFilter = {
  readonly query: string;
  readonly category: CategoryFilter;
};

/**
 * Suchtext vereinheitlichen: Kleinschreibung, Umlaute/Akzente ohne Zeichen („Körnung" ≙ „kornung"),
 * Gedankenstriche als Bindestrich („16-32" findet „16–32 mm"), Mehrfach-Leerraum zusammengefasst.
 */
export const normalizeSearchText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/[‐-―−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

/** Alle durchsuchbaren Texte eines Produkts: Name, Beschreibung, Kategorie, Körnungen, Lieferformen. */
const searchableText = (product: ShopProduct, categoryLabel: string): string =>
  normalizeSearchText(
    [
      product.name,
      product.description,
      categoryLabel,
      ...product.variants.flatMap((variant) => [variant.size, variant.packaging]),
    ].join(' '),
  );

/**
 * Produkte nach Kategorie und Suchbegriff filtern. Jedes Wort der Suche muss vorkommen
 * (UND-Verknüpfung), die Reihenfolge des Katalogs bleibt erhalten.
 */
export const filterProducts = <P extends ShopProduct>(
  products: readonly P[],
  categories: readonly ShopCategory[],
  filter: ProductFilter,
): P[] => {
  const terms = normalizeSearchText(filter.query).split(' ').filter(Boolean);
  return products.filter((product) => {
    if (filter.category !== 'all' && product.category !== filter.category) return false;
    if (terms.length === 0) return true;
    const haystack = searchableText(product, categoryLabel(categories, product.category));
    return terms.every((term) => haystack.includes(term));
  });
};
