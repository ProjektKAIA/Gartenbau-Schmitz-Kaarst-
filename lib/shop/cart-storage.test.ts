import { describe, expect, it } from 'vitest';
import { cartLinesSchema } from '@/types/shop';
import { parseStoredCart, serializeCart } from './cart-storage';

const known = (id: string) => id === 'kies-16-32' || id === 'sand';

describe('parseStoredCart', () => {
  it('liest einen gültigen Warenkorb und verwirft unbekannte Artikel', () => {
    const raw = serializeCart([
      { variantId: 'kies-16-32', quantity: 2 },
      { variantId: 'weg', quantity: 1 },
    ]);
    expect(parseStoredCart(raw, known)).toEqual([{ variantId: 'kies-16-32', quantity: 2 }]);
  });

  it('ergibt bei kaputtem oder manipuliertem Inhalt einen leeren Warenkorb', () => {
    expect(parseStoredCart('{kaputt', known)).toEqual([]);
    expect(parseStoredCart(JSON.stringify([{ variantId: 'sand', quantity: 10_000 }]), known)).toEqual([]);
    // Dubletten würden doppelte React-Keys und eine Umgehung der Höchstmenge erzeugen.
    const duplicated = JSON.stringify([
      { variantId: 'sand', quantity: 99 },
      { variantId: 'sand', quantity: 99 },
    ]);
    expect(parseStoredCart(duplicated, known)).toEqual([]);
  });
});

describe('cartLinesSchema', () => {
  it('lässt jede Variante nur einmal zu', () => {
    expect(cartLinesSchema.safeParse([{ variantId: 'sand', quantity: 1 }]).success).toBe(true);
    expect(
      cartLinesSchema.safeParse([
        { variantId: 'sand', quantity: 1 },
        { variantId: 'sand', quantity: 1 },
      ]).success,
    ).toBe(false);
  });
});
