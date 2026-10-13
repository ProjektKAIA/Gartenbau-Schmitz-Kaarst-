import { describe, expect, it, vi } from 'vitest';
import { CART_STORAGE_KEY, parseStoredCart } from './cart-storage';
import { createCartStore } from './cart-store';

const known = (id: string) => id !== 'weg';

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    data,
  };
};

describe('parseStoredCart', () => {
  it('liest gültige Zeilen und verwirft unbekannte Artikel', () => {
    const raw = JSON.stringify([
      { variantId: 'kies-16-32', quantity: 2 },
      { variantId: 'weg', quantity: 1 },
    ]);
    expect(parseStoredCart(raw, known)).toEqual([{ variantId: 'kies-16-32', quantity: 2 }]);
  });

  it('liefert bei leerem, kaputtem oder manipuliertem Inhalt einen leeren Warenkorb', () => {
    expect(parseStoredCart(null, known)).toEqual([]);
    expect(parseStoredCart('{kaputt', known)).toEqual([]);
    expect(parseStoredCart(JSON.stringify([{ variantId: 'a', quantity: 500 }]), known)).toEqual([]);
    expect(parseStoredCart(JSON.stringify({ variantId: 'a' }), known)).toEqual([]);
  });
});

describe('createCartStore', () => {
  it('lädt den gespeicherten Warenkorb beim ersten Lesen und speichert Änderungen', () => {
    const storage = memoryStorage({ [CART_STORAGE_KEY]: JSON.stringify([{ variantId: 'a', quantity: 1 }]) });
    const store = createCartStore(() => storage, known);
    expect(store.getServerSnapshot().lines).toEqual([]);
    expect(store.getSnapshot().lines).toEqual([{ variantId: 'a', quantity: 1 }]);

    store.dispatch({ type: 'add', variantId: 'a', quantity: 2 });
    expect(store.getSnapshot().lines).toEqual([{ variantId: 'a', quantity: 3 }]);
    expect(storage.data.get(CART_STORAGE_KEY)).toBe(JSON.stringify([{ variantId: 'a', quantity: 3 }]));
  });

  it('liefert einen stabilen Snapshot und benachrichtigt nur bei Änderungen', () => {
    const store = createCartStore(() => memoryStorage(), known);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    const first = store.getSnapshot();
    expect(store.getSnapshot()).toBe(first);

    store.open();
    store.open();
    expect(store.getSnapshot().isOpen).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);

    store.close();
    expect(store.getSnapshot().isOpen).toBe(false);
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    store.dispatch({ type: 'add', variantId: 'b', quantity: 1 });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('funktioniert ohne Speicher und wenn der Speicher wirft', () => {
    const throwing = {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem: () => {
        throw new Error('QuotaExceeded');
      },
    };
    const store = createCartStore(() => throwing, known);
    store.dispatch({ type: 'add', variantId: 'a', quantity: 1 });
    expect(store.getSnapshot().lines).toEqual([{ variantId: 'a', quantity: 1 }]);

    const noStorage = createCartStore(() => undefined, known);
    noStorage.dispatch({ type: 'clear' });
    expect(noStorage.getSnapshot().lines).toEqual([]);
  });
});
