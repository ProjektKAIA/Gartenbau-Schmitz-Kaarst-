import { describe, expect, it } from 'vitest';
import { shopProducts, shopTerms, type ShopProduct } from '@/content/shop';
import { findVariant, priceUnitLabel, sizesOf, variantLabel, variantsForSize } from './catalog';

const product = (id: string): ShopProduct => {
  const match = shopProducts.find((candidate) => candidate.id === id);
  if (!match) throw new Error(`Produkt ${id} fehlt im Katalog`);
  return match;
};

describe('Katalog', () => {
  it('hat eindeutige Varianten-IDs über alle Produkte', () => {
    const ids = shopProducts.flatMap((p) => p.variants.map((v) => v.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('enthält die vom Kunden genannten Körnungen', () => {
    expect(sizesOf(product('pinienrinde'))).toEqual(['0–8 mm', '7–15 mm', '15–25 mm', '25–45 mm']);
    expect(sizesOf(product('splitt'))).toContain('0–5 mm');
    expect(sizesOf(product('kalksteinschotter'))).toContain('0–45 mm');
  });

  it('bietet Pinienrinde je Körnung lose und im 70-L-Sack an', () => {
    for (const size of sizesOf(product('pinienrinde'))) {
      expect(variantsForSize(product('pinienrinde'), size).map((v) => v.packaging)).toEqual(['lose', '70-L-Sack']);
    }
  });

  it('öffnet Online-Bestellungen erst, wenn jede Variante einen Preis hat', () => {
    const allPriced = shopProducts.flatMap((p) => p.variants).every((v) => v.priceCents > 0);
    expect(shopTerms.ordersOpen && !allPriced).toBe(false);
  });
});

describe('findVariant / Labels', () => {
  it('findet Produkt und Variante oder liefert undefined', () => {
    expect(findVariant(shopProducts, 'pinienrinde-15-25-sack')?.product.id).toBe('pinienrinde');
    expect(findVariant(shopProducts, 'gibt-es-nicht')).toBeUndefined();
  });

  it('baut lesbare Bezeichnungen und lässt „Standard" weg', () => {
    const rinde = findVariant(shopProducts, 'pinienrinde-7-15-sack');
    const erde = findVariant(shopProducts, 'pflanzenerde-70l');
    if (!rinde || !erde) throw new Error('Variante fehlt');
    expect(variantLabel(rinde.product, rinde.variant)).toBe('Pinienrinde, 7–15 mm, 70-L-Sack');
    expect(variantLabel(erde.product, erde.variant)).toBe('Pflanzenerde, 70-L-Sack');
    expect(priceUnitLabel(rinde.variant)).toBe('70-L-Sack');
    expect(priceUnitLabel(product('kies').variants[0])).toBe('m³ lose');
  });
});
