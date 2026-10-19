import { describe, expect, it } from 'vitest';
import { shopCategories, shopProducts } from '@/content/shop';
import { filterByCategory } from './filter';

describe('filterByCategory', () => {
  it('liefert bei „alle" den ganzen Katalog in Katalog-Reihenfolge', () => {
    expect(filterByCategory(shopProducts, 'all').map((p) => p.id)).toEqual(shopProducts.map((p) => p.id));
  });

  it('liefert nur Produkte der gewählten Kategorie', () => {
    for (const category of shopCategories) {
      const result = filterByCategory(shopProducts, category.id);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((product) => product.category === category.id)).toBe(true);
    }
  });
});
