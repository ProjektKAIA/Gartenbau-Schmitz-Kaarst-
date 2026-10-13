import { shopProducts } from '@/content/shop';
import { cartReducer, type CartAction, type CartLine } from './cart';
import { CART_STORAGE_KEY, parseStoredCart, serializeCart } from './cart-storage';
import { findVariant } from './catalog';

/**
 * Globaler Warenkorb als Modul-Store für `useSyncExternalStore` – ohne Provider, damit
 * der Header auf jeder Seite und der Shop denselben Zustand sehen.
 * Persistenz in `sessionStorage` (technisch notwendig, endet mit dem Tab, kein Consent nötig).
 */

export type CartState = {
  readonly lines: readonly CartLine[];
  readonly isOpen: boolean;
};

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

export type CartStore = {
  readonly subscribe: (listener: () => void) => () => void;
  readonly getSnapshot: () => CartState;
  readonly getServerSnapshot: () => CartState;
  readonly dispatch: (action: CartAction) => void;
  readonly open: () => void;
  readonly close: () => void;
};

const EMPTY_STATE: CartState = { lines: [], isOpen: false };

export const createCartStore = (
  getStorage: () => StorageLike | undefined,
  isKnownVariant: (variantId: string) => boolean,
): CartStore => {
  let state = EMPTY_STATE;
  let hydrated = false;
  const listeners = new Set<() => void>();

  // Erst beim ersten Lesen im Browser laden – auf dem Server gibt es keinen Speicher.
  const hydrate = () => {
    if (hydrated) return;
    hydrated = true;
    try {
      const lines = parseStoredCart(getStorage()?.getItem(CART_STORAGE_KEY), isKnownVariant);
      if (lines.length > 0) state = { ...state, lines };
    } catch {
      // Speicher gesperrt (z. B. privater Modus) – Warenkorb lebt dann nur im Speicher.
    }
  };

  const persist = () => {
    try {
      getStorage()?.setItem(CART_STORAGE_KEY, serializeCart(state.lines));
    } catch {
      // Siehe oben – kein Abbruch, nur keine Persistenz.
    }
  };

  const set = (next: CartState) => {
    if (next === state) return;
    state = next;
    for (const listener of listeners) listener();
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => {
      hydrate();
      return state;
    },
    getServerSnapshot: () => EMPTY_STATE,
    dispatch: (action) => {
      hydrate();
      const lines = cartReducer(state.lines, action);
      set({ ...state, lines });
      persist();
    },
    open: () => {
      hydrate();
      if (!state.isOpen) set({ ...state, isOpen: true });
    },
    close: () => {
      if (state.isOpen) set({ ...state, isOpen: false });
    },
  };
};

const browserSessionStorage = (): StorageLike | undefined =>
  typeof window === 'undefined' ? undefined : window.sessionStorage;

/** Der eine Warenkorb der Website. */
export const cartStore = createCartStore(
  browserSessionStorage,
  (variantId) => findVariant(shopProducts, variantId) !== undefined,
);
