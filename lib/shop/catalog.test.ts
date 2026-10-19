import { describe, expect, it } from 'vitest';
import { shopModeCopy, shopProducts, shopTerms, type ShopProduct } from '@/content/shop';
import {
  findVariant,
  priceUnitLabel,
  resolveVariant,
  sizesOf,
  unitPriceLabel,
  variantLabel,
  variantsForSize,
} from './catalog';

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

describe('resolveVariant', () => {
  const rinde = product('pinienrinde');
  const mulch = product('rindenmulch');

  it('behält die gewählte Lieferform, wenn es sie für die Körnung gibt', () => {
    expect(resolveVariant(rinde, '7–15 mm', 'pinienrinde-7-15-sack').id).toBe('pinienrinde-7-15-sack');
  });

  it('fällt bei neuer Körnung auf die erste Lieferform dieser Körnung zurück', () => {
    expect(resolveVariant(rinde, '15–25 mm', 'pinienrinde-7-15-sack').id).toBe('pinienrinde-15-25');
    expect(resolveVariant(mulch, '10–40 mm', 'rindenmulch-0-20').id).toBe('rindenmulch-10-40-sack');
  });

  it('nimmt bei unbekannter Körnung die erste Variante des Produkts', () => {
    expect(resolveVariant(rinde, 'gibt-es-nicht', 'x').id).toBe('pinienrinde-0-8');
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

  it('zeigt den Preis mit Bezugsgröße – 0 € als „0,00 €", nicht als Text', () => {
    const eur = (amount: string) => `${amount}\u00a0€`;
    const sack = findVariant(shopProducts, 'pinienrinde-7-15-sack');
    if (!sack) throw new Error('Variante fehlt');
    expect(unitPriceLabel(product('kies').variants[0])).toBe(`${eur('0,00')} / m³ lose`);
    expect(unitPriceLabel({ ...sack.variant, priceCents: 1250 })).toBe(`${eur('12,50')} / 70-L-Sack`);
  });

  it('beschriftet den Bestellknopf exakt nach § 312j Abs. 3 BGB', () => {
    expect(shopModeCopy.order.submitLabel).toBe('zahlungspflichtig bestellen');
  });
});
