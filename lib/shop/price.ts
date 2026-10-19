const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

/**
 * Cent-Betrag als Euro-Preis, z. B. 1250 → „12,50 €". Einzige Preisformatierung im Shop –
 * auch 0 € wird als „0,00 €" angezeigt (Platzhalter, bis die echten Preise feststehen).
 */
export const formatPrice = (cents: number): string => euro.format(cents / 100);
