import { describe, expect, it } from 'vitest';
import { shopCategories, shopProducts, type ShopCategoryId } from '@/content/shop';
import { filterProducts, normalizeSearchText } from './search';

const ids = (query: string, category: ShopCategoryId | 'all' = 'all') =>
  filterProducts(shopProducts, shopCategories, { query, category }).map((p) => p.id);

describe('normalizeSearchText', () => {
  it('ignoriert Groß-/Kleinschreibung, Umlaute, ß und Strich-Varianten', () => {
    expect(normalizeSearchText('  KÖRNUNG  16–32 ')).toBe('kornung 16-32');
    expect(normalizeSearchText('Straße')).toBe('strasse');
  });
});

describe('filterProducts', () => {
  it('liefert ohne Suche und Filter den ganzen Katalog in Katalog-Reihenfolge', () => {
    expect(ids('')).toEqual(shopProducts.map((p) => p.id));
  });

  it('findet nach Name, auch ohne Umlaut', () => {
    expect(ids('pinienrinde')).toEqual(['pinienrinde']);
    expect(ids('streugranulat')).toEqual(['streugranulat']);
  });

  it('findet nach Beschreibung', () => {
    expect(ids('gabionen')).toEqual(['basalt']);
  });

  it('findet nach Körnung mit normalem Bindestrich', () => {
    expect(ids('0-45')).toEqual(['kalksteinschotter']);
    expect(ids('16-32')).toEqual(expect.arrayContaining(['kies', 'basalt']));
  });

  it('findet nach Kategorie-Bezeichnung und Lieferform', () => {
    expect(ids('winterdienst')).toEqual(['streugranulat']);
    expect(ids('70-l-sack')).toEqual(expect.arrayContaining(['pinienrinde', 'pflanzenerde']));
  });

  it('verknüpft mehrere Wörter mit UND', () => {
    expect(ids('rinde sack 0-8')).toEqual(['pinienrinde']);
  });

  it('filtert nach Kategorie und kombiniert mit der Suche', () => {
    expect(ids('', 'rinde')).toEqual(['pinienrinde', 'rindenmulch']);
    expect(ids('mulch', 'kies')).toEqual([]);
  });

  it('liefert keine Treffer für Unbekanntes', () => {
    expect(ids('rasenmäher')).toEqual([]);
  });
});
