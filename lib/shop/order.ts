import type { ShopProduct } from '@/content/shop';
import type { BusinessContact, MailContent } from '@/lib/mail';
import type { ShopCustomer } from '@/types/shop';
import type { CartLine } from './cart';
import { findVariant, variantLabel } from './catalog';
import { formatPrice } from './price';

export type ResolvedLine = {
  readonly variantId: string;
  readonly label: string;
  readonly quantity: number;
  readonly unit: string;
  readonly unitPriceCents: number;
  readonly totalCents: number;
};

/**
 * Art des Vorgangs: verbindliche Bestellung (Shop offen) oder unverbindliche Anfrage
 * (Vorschau-Modus, Platzhalterpreise). Einzige Stelle, die den Schalter auswertet –
 * UI und API leiten beide daraus ab.
 */
export type ShopRequestKind = 'order' | 'inquiry';

export const requestKindOf = (ordersOpen: boolean): ShopRequestKind => (ordersOpen ? 'order' : 'inquiry');

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

/** Gesamtpreis für die Anzeige (Warenkorb, Bestellübersicht). */
export const formatOrderTotal = (lines: readonly ResolvedLine[]): string => formatPrice(totalCents(lines));

/** Warenkorb als Mail-Text – Ausweg per E-Mail, wenn der Online-Versand nicht klappt. */
export const orderListMailBody = (lines: readonly ResolvedLine[]): string =>
  [
    'Guten Tag,',
    '',
    'ich möchte folgendes Material anfragen:',
    ...lines.map((line) => `- ${line.quantity} ${line.unit} ${line.label}`),
    '',
    'Lieferadresse:',
    '',
    'Telefon:',
  ].join('\n');

/** Positionen mit Preisen (Bestellung) bzw. nur Mengen (Anfrage – Platzhalterpreise werden nicht genannt). */
const positionLines = (lines: readonly ResolvedLine[], kind: ShopRequestKind): string[] => {
  switch (kind) {
    case 'order':
      return [
        ...lines.map(
          (line) =>
            `- ${line.quantity} ${line.unit} ${line.label} (à ${formatPrice(line.unitPriceCents)}) = ${formatPrice(line.totalCents)}`,
        ),
        '',
        `Gesamt inkl. MwSt. und Lieferung: ${formatPrice(totalCents(lines))}`,
        'Zahlung auf Rechnung.',
      ];
    case 'inquiry':
      return lines.map((line) => `- ${line.quantity} ${line.unit} ${line.label}`);
    default: {
      const unreachable: never = kind;
      return unreachable;
    }
  }
};

const addressLines = (customer: ShopCustomer): string[] => [
  customer.name,
  customer.street,
  `${customer.postalCode} ${customer.city}`,
];

const businessMailCopy = {
  order: { subject: 'Shop-Bestellung', intro: 'Neue Bestellung aus dem Material-Shop (noch nicht angenommen):' },
  inquiry: {
    subject: 'Shop-Anfrage',
    intro: 'Neue unverbindliche Anfrage aus dem Material-Shop – bitte mit Preis und Liefertermin antworten:',
  },
} as const satisfies Record<ShopRequestKind, { subject: string; intro: string }>;

/** Mail an den Betrieb: alle Angaben, Antworten gehen per Reply-To direkt an den Kunden. */
export const buildBusinessMail = (
  lines: readonly ResolvedLine[],
  customer: ShopCustomer,
  kind: ShopRequestKind,
): MailContent => ({
  subject: `${businessMailCopy[kind].subject} – ${customer.name}`,
  text: [
    businessMailCopy[kind].intro,
    '',
    ...positionLines(lines, kind),
    '',
    'Lieferadresse:',
    ...addressLines(customer),
    '',
    `Telefon: ${customer.phone}`,
    `E-Mail: ${customer.email}`,
    'Lieferadresse als Privatadresse im Liefergebiet bestätigt: ja',
    'AGB akzeptiert und Datenschutzerklärung zur Kenntnis genommen: ja',
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
    ...positionLines(lines, 'order'),
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

/**
 * Bestätigung einer unverbindlichen Anfrage an den Kunden – ohne Rechtstexte (kein Vertrag)
 * und, wie bei der Bestellung, ohne Freitext-Nachricht des Kunden.
 */
export const buildCustomerInquiryConfirmation = (
  lines: readonly ResolvedLine[],
  customer: ShopCustomer,
  business: BusinessContact,
): MailContent => ({
  subject: `Ihre Anfrage bei ${business.name}`,
  text: [
    `Guten Tag ${customer.name},`,
    '',
    'vielen Dank für Ihre Anfrage. Sie ist bei uns eingegangen.',
    'Die Anfrage ist unverbindlich – wir melden uns in Kürze mit Preis und möglichem Liefertermin bei Ihnen.',
    '',
    'Ihre Anfrage:',
    ...positionLines(lines, 'inquiry'),
    '',
    'Lieferadresse:',
    ...addressLines(customer),
    '',
    'Viele Grüße',
    business.name,
    `Telefon ${business.phone} · ${business.email}`,
  ].join('\n'),
});
