import type { ShopProduct } from '@/content/shop';
import type { BusinessContact, MailContent } from '@/lib/mail';
import type { ShopCustomer } from '@/types/shop';
import type { CartLine } from './cart';
import { findVariant, variantLabel } from './catalog';
import { PRICE_PENDING_LABEL, formatPrice, isPricePending } from './price';

export type ResolvedLine = {
  readonly variantId: string;
  readonly label: string;
  readonly quantity: number;
  readonly unit: string;
  readonly unitPriceCents: number;
  readonly totalCents: number;
};

/** Bestellzeilen gegen den Katalog auflösen; unbekannte Varianten fallen heraus. */
export const resolveLines = (
  products: readonly ShopProduct[],
  lines: readonly CartLine[],
): ResolvedLine[] =>
  lines.flatMap((line) => {
    const match = findVariant(products, line.variantId);
    if (!match) return [];
    return [
      {
        variantId: line.variantId,
        label: variantLabel(match.product, match.variant),
        quantity: line.quantity,
        unit: match.variant.unit,
        unitPriceCents: match.variant.priceCents,
        totalCents: match.variant.priceCents * line.quantity,
      },
    ];
  });

export const totalCents = (lines: readonly ResolvedLine[]): number =>
  lines.reduce((sum, line) => sum + line.totalCents, 0);

/** Gesamtpreis für die Anzeige – „Preis folgt", sobald eine Position noch keinen Preis hat. */
export const formatOrderTotal = (lines: readonly ResolvedLine[]): string =>
  lines.some((line) => isPricePending(line.unitPriceCents)) ? PRICE_PENDING_LABEL : formatPrice(totalCents(lines));

/** Bestellliste als Mail-Text für die Bestellung per E-Mail im Vorschau-Modus. */
export const orderListMailBody = (lines: readonly ResolvedLine[]): string =>
  [
    'Guten Tag,',
    '',
    'ich möchte folgendes Material bestellen:',
    ...lines.map((line) => `- ${line.quantity} ${line.unit} ${line.label}`),
    '',
    'Lieferadresse:',
    '',
    'Telefon:',
  ].join('\n');

const positionLines = (lines: readonly ResolvedLine[]): string[] => [
  ...lines.map(
    (line) =>
      `- ${line.quantity} ${line.unit} ${line.label} (à ${formatPrice(line.unitPriceCents)}) = ${formatPrice(line.totalCents)}`,
  ),
  '',
  `Gesamt inkl. MwSt. und Lieferung: ${formatPrice(totalCents(lines))}`,
  'Zahlung auf Rechnung.',
];

const addressLines = (customer: ShopCustomer): string[] => [
  customer.name,
  customer.street,
  `${customer.postalCode} ${customer.city}`,
];

/** Mail an den Betrieb: alle Angaben, Antworten gehen per Reply-To direkt an den Kunden. */
export const buildBusinessMail = (lines: readonly ResolvedLine[], customer: ShopCustomer): MailContent => ({
  subject: `Shop-Bestellung – ${customer.name}`,
  text: [
    'Neue Bestellung aus dem Material-Shop (noch nicht angenommen):',
    '',
    ...positionLines(lines),
    '',
    'Lieferadresse:',
    ...addressLines(customer),
    '',
    `Telefon: ${customer.phone}`,
    `E-Mail: ${customer.email}`,
    'Lieferadresse als Privatadresse im Liefergebiet bestätigt: ja',
    ...(customer.message ? ['', 'Nachricht:', customer.message] : []),
  ].join('\n'),
});

/**
 * Eingangsbestätigung an den Kunden (§ 312i BGB) – ausdrücklich noch keine Annahme.
 * Hängt AGB, Widerrufsbelehrung und Muster-Formular als Text an.
 * Enthält bewusst keine Freitext-Nachricht, damit das Formular nicht zum Versand
 * beliebiger Inhalte an fremde Adressen taugt.
 */
export const buildCustomerConfirmation = (
  lines: readonly ResolvedLine[],
  customer: ShopCustomer,
  business: BusinessContact,
  legalTexts: readonly string[],
): MailContent => ({
  subject: `Eingangsbestätigung Ihrer Bestellung bei ${business.name}`,
  text: [
    `Guten Tag ${customer.name},`,
    '',
    'vielen Dank für Ihre Bestellung. Hiermit bestätigen wir den Eingang.',
    'Dies ist noch keine Annahme Ihrer Bestellung: Der Vertrag kommt erst zustande, wenn wir Ihre Bestellung per E-Mail oder telefonisch annehmen oder die Ware liefern. Dabei stimmen wir auch den Liefertermin mit Ihnen ab.',
    '',
    'Ihre Bestellung:',
    ...positionLines(lines),
    '',
    'Lieferadresse:',
    ...addressLines(customer),
    '',
    'Viele Grüße',
    business.name,
    `Telefon ${business.phone} · ${business.email}`,
    ...legalTexts.flatMap((text) => ['', '', '----------------------------------------', '', text]),
  ].join('\n'),
});
