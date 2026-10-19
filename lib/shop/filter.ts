import type { ShopCategoryId, ShopProduct } from '@/content/shop';

/** Kategorie-Filter: eine Kategorie oder „alle". */
export type CategoryFilter = ShopCategoryId | 'all';

/** Produkte einer Kategorie – Reihenfolge des Katalogs bleibt erhalten. */
export const filterByCategory = <P extends ShopProduct>(products: readonly P[], category: CategoryFilter): P[] =>
  category === 'all' ? [...products] : products.filter((product) => product.category === category);
