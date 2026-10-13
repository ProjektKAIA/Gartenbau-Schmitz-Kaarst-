import { describe, expect, it } from 'vitest';
import { shopCategories, shopProducts } from '@/content/shop';
import { site } from '@/lib/site';
import { buildShopItemList } from './structured-data';

describe('buildShopItemList', () => {
  const data = buildShopItemList(shopProducts, shopCategories, '/shop');

  it('listet alle Produkte mit Position, absoluter Bild-URL und Kategorie', () => {
    expect(data['@type']).toBe('ItemList');
    expect(data.itemListElement).toHaveLength(shopProducts.length);
    const first = data.itemListElement[0];
    expect(first?.position).toBe(1);
    expect(first?.item.image).toBe(`${site.url}/assets/shop/kies-16-32.webp`);
    expect(first?.item.url).toBe(`${site.url}/shop#kies`);
    expect(first?.item.category).toBe('Kies & Splitt');
  });

  it('nennt Körnungen, lässt „Standard" weg und gibt keine Preise aus', () => {
    const rinde = data.itemListElement.find((entry) => entry.item.name === 'Pinienrinde');
    expect(rinde?.item.description).toContain('Körnungen: 0–8 mm, 7–15 mm');
    const erde = data.itemListElement.find((entry) => entry.item.name === 'Pflanzenerde');
    expect(erde?.item.description).not.toContain('Standard');
    const json = JSON.stringify(data);
    expect(json).not.toContain('offers');
    expect(json).not.toContain('price');
  });
});
