import { cartLinesSchema } from '@/types/shop';
import type { CartLine } from './cart';

/** Schlüssel des Warenkorbs in `sessionStorage` (Version im Namen, falls sich das Format ändert). */
export const CART_STORAGE_KEY = 'gartenbau-kaarst.cart.v1';

/**
 * Gespeicherten Warenkorb lesen. Der Inhalt stammt aus dem Browser und gilt als extern:
 * kaputtes JSON, falsches Format oder unbekannte Artikel ergeben einen leeren bzw. bereinigten Warenkorb.
 */
export const parseStoredCart = (
  raw: string | null | undefined,
  isKnownVariant: (variantId: string) => boolean,
): readonly CartLine[] => {
  if (!raw) return [];
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return [];
  }
  const parsed = cartLinesSchema.safeParse(json);
  if (!parsed.success) return [];
  return parsed.data.filter((line) => isKnownVariant(line.variantId));
};

export const serializeCart = (lines: readonly CartLine[]): string => JSON.stringify(lines);
