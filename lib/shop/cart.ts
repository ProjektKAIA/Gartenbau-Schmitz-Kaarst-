/**
 * Anfrageliste als reiner Reducer – keine React-Abhängigkeit, damit testbar.
 * Kein Lagerbestand: Mengen sind nur nach oben gedeckelt, um Tippfehler abzufangen.
 */

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

export type CartLine = {
  readonly variantId: string;
  readonly quantity: number;
};

export type CartAction =
  | { readonly type: 'add'; readonly variantId: string; readonly quantity: number }
  | { readonly type: 'setQuantity'; readonly variantId: string; readonly quantity: number }
  | { readonly type: 'remove'; readonly variantId: string }
  | { readonly type: 'clear' };

export const clampQuantity = (value: number): number => {
  if (!Number.isFinite(value)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.round(value)));
};

export const cartReducer = (lines: readonly CartLine[], action: CartAction): readonly CartLine[] => {
  switch (action.type) {
    case 'add': {
      const existing = lines.find((line) => line.variantId === action.variantId);
      if (!existing) {
        return [...lines, { variantId: action.variantId, quantity: clampQuantity(action.quantity) }];
      }
      return lines.map((line) =>
        line === existing ? { ...line, quantity: clampQuantity(line.quantity + action.quantity) } : line,
      );
    }
    case 'setQuantity':
      return lines.map((line) =>
        line.variantId === action.variantId ? { ...line, quantity: clampQuantity(action.quantity) } : line,
      );
    case 'remove':
      return lines.filter((line) => line.variantId !== action.variantId);
    case 'clear':
      return [];
    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
};

export const countItems = (lines: readonly CartLine[]): number =>
  lines.reduce((sum, line) => sum + line.quantity, 0);
