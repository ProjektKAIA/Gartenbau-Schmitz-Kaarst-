import type { ShopCategory, ShopProduct } from '@/content/shop';
import { absoluteUrl } from '@/lib/seo';
import { sizesOf } from './catalog';
import { categoryLabel } from './catalog';

type ProductListItem = {
  readonly '@type': 'ListItem';
  readonly position: number;
  readonly item: {
    readonly '@type': 'Product';
    readonly '@id': string;
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly category: string;
    readonly url: string;
  };
};

export type ShopItemListJsonLd = {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'ItemList';
  readonly name: string;
  readonly itemListElement: readonly ProductListItem[];
};

/** Körnungen als Zusatz zur Beschreibung, z. B. „Körnungen: 0–8 mm, 7–15 mm". */
const sizesNote = (product: ShopProduct): string => {
  const sizes = sizesOf(product).filter((size) => size !== 'Standard');
  if (sizes.length === 0) return '';
  return ` ${sizes.length > 1 ? 'Körnungen' : 'Körnung'}: ${sizes.join(', ')}.`;
};

/**
 * Strukturierte Daten (schema.org `ItemList` aus `Product`) für die Shop-Seite.
 * Bewusst **ohne** `offers`: Die Preise stehen noch nicht fest (0 €) und dürfen nicht
 * als echte Preise in Suchmaschinen landen. URLs sind absolut auf der kanonischen Domain.
 */
export const buildShopItemList = (
  products: readonly ShopProduct[],
  categories: readonly ShopCategory[],
  path: string,
): ShopItemListJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Materiallieferung – Kies, Schotter, Splitt und Rinde',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': absoluteUrl(`${path}#${product.id}`),
        name: product.name,
        description: `${product.description}${sizesNote(product)}`,
        image: absoluteUrl(product.image),
        category: categoryLabel(categories, product.category),
        url: absoluteUrl(`${path}#${product.id}`),
      },
    })),
  };
};
