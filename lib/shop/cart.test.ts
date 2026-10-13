import { describe, expect, it } from 'vitest';
import { cartReducer, clampQuantity, countItems, MAX_QUANTITY } from './cart';

describe('clampQuantity', () => {
  it('begrenzt auf 1 bis MAX_QUANTITY und rundet', () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-4)).toBe(1);
    expect(clampQuantity(2.6)).toBe(3);
    expect(clampQuantity(500)).toBe(MAX_QUANTITY);
  });

  it('fängt ein geleertes Zahlenfeld (NaN) ab', () => {
    expect(clampQuantity(Number.NaN)).toBe(1);
  });
});

describe('cartReducer', () => {
  it('fügt neue Varianten hinzu und addiert bei gleicher Variante', () => {
    let state = cartReducer([], { type: 'add', variantId: 'kies-16-32', quantity: 2 });
    state = cartReducer(state, { type: 'add', variantId: 'sand-0-2', quantity: 1 });
    state = cartReducer(state, { type: 'add', variantId: 'kies-16-32', quantity: 3 });
    expect(state).toEqual([
      { variantId: 'kies-16-32', quantity: 5 },
      { variantId: 'sand-0-2', quantity: 1 },
    ]);
    expect(countItems(state)).toBe(6);
  });

  it('deckelt die Summe beim Addieren', () => {
    const state = cartReducer([{ variantId: 'a', quantity: 98 }], { type: 'add', variantId: 'a', quantity: 5 });
    expect(state[0]?.quantity).toBe(MAX_QUANTITY);
  });

  it('setzt Mengen, entfernt und leert', () => {
    const start = [
      { variantId: 'a', quantity: 1 },
      { variantId: 'b', quantity: 2 },
    ];
    expect(cartReducer(start, { type: 'setQuantity', variantId: 'b', quantity: 7 })[1]?.quantity).toBe(7);
    expect(cartReducer(start, { type: 'remove', variantId: 'a' })).toEqual([{ variantId: 'b', quantity: 2 }]);
    expect(cartReducer(start, { type: 'clear' })).toEqual([]);
  });
});
