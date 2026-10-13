const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

/** Cent-Betrag als Euro-Preis, z. B. 1250 → „12,50 €". */
export const formatPrice = (cents: number): string => euro.format(cents / 100);

/** Anzeige, solange ein Katalogpreis noch nicht feststeht (0 €). */
export const PRICE_PENDING_LABEL = 'Preis folgt';

export const isPricePending = (cents: number): boolean => cents <= 0;

/** Preis für die Anzeige im Shop: Euro-Betrag oder „Preis folgt". */
export const formatShopPrice = (cents: number): string =>
  isPricePending(cents) ? PRICE_PENDING_LABEL : formatPrice(cents);
