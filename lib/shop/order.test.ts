import { describe, expect, it } from 'vitest';
import type { ShopProduct } from '@/content/shop';
import { shopCustomerSchema, shopOrderSchema, type ShopCustomer } from '@/types/shop';
import { formatPrice } from './price';
import {
  buildBusinessMail,
  buildCustomerConfirmation,
  buildCustomerInquiryConfirmation,
  formatOrderTotal,
  orderListMailBody,
  requestKindOf,
  resolveLines,
  totalCents,
} from './order';

const catalog: readonly ShopProduct[] = [
  {
    id: 'kies',
    name: 'Kies',
    category: 'kies',
    description: '',
    image: '/x.webp',
    variants: [{ id: 'kies-16-32', size: '16–32 mm', packaging: 'lose', unit: 'm³', priceCents: 4550 }],
  },
];

const customer: ShopCustomer = {
  name: 'Erika Muster',
  street: 'Gartenweg 1',
  postalCode: '41564',
  city: 'Kaarst',
  phone: '02131 12345',
  email: 'erika@example.de',
  message: '',
  confirmDeliveryArea: true,
  acceptTerms: true,
};

/** Intl setzt vor das Euro-Zeichen ein geschütztes Leerzeichen. */
const eur = (amount: string) => `${amount}\u00a0€`;

describe('formatPrice', () => {
  it('formatiert deutsch mit Euro-Zeichen', () => {
    expect(formatPrice(0)).toBe(eur('0,00'));
    expect(formatPrice(123456)).toBe(eur('1.234,56'));
  });
});

describe('formatOrderTotal', () => {
  it('summiert alle Positionen – auch Platzhalterpreise (0 €) erscheinen als Betrag, nie als Text', () => {
    const withPlaceholder: readonly ShopProduct[] = [
      ...catalog,
      { ...catalog[0]!, id: 'sand', variants: [{ id: 'sand', size: '0–2 mm', packaging: 'lose', unit: 'm³', priceCents: 0 }] },
    ];
    const lines = resolveLines(withPlaceholder, [
      { variantId: 'kies-16-32', quantity: 2 },
      { variantId: 'sand', quantity: 3 },
    ]);
    expect(formatOrderTotal(lines)).toBe(eur('91,00'));
    expect(formatOrderTotal(lines.slice(1))).toBe(eur('0,00'));
    expect(formatOrderTotal([])).toBe(eur('0,00'));
  });
});

describe('orderListMailBody', () => {
  it('listet die Positionen für die Bestellung per E-Mail', () => {
    const body = orderListMailBody(resolveLines(catalog, [{ variantId: 'kies-16-32', quantity: 2 }]));
    expect(body).toContain('- 2 m³ Kies');
    expect(body).toContain('Lieferadresse:');
  });
});

describe('resolveLines / totalCents', () => {
  it('rechnet Zeilensummen und verwirft unbekannte Varianten', () => {
    const lines = resolveLines(catalog, [
      { variantId: 'kies-16-32', quantity: 3 },
      { variantId: 'weg', quantity: 1 },
    ]);
    expect(lines).toHaveLength(1);
    expect(lines[0]?.totalCents).toBe(13650);
    expect(totalCents(lines)).toBe(13650);
  });
});

const business = { name: 'Gartenbau Matthias Schmitz', phone: '0177 2770274', email: 'info@example.de' };

describe('requestKindOf', () => {
  it('leitet aus dem Schalter Bestellung oder Anfrage ab', () => {
    expect(requestKindOf(true)).toBe('order');
    expect(requestKindOf(false)).toBe('inquiry');
  });
});

describe('buildBusinessMail', () => {
  it('enthält Positionen, Gesamtsumme, Rechnungshinweis, Adresse und Nachricht', () => {
    const lines = resolveLines(catalog, [{ variantId: 'kies-16-32', quantity: 2 }]);
    const mail = buildBusinessMail(lines, { ...customer, message: 'Bitte vormittags.' }, 'order');
    expect(mail.subject).toBe('Shop-Bestellung – Erika Muster');
    expect(mail.text).toContain(`- 2 m³ Kies, 16–32 mm, lose (à ${eur('45,50')}) = ${eur('91,00')}`);
    expect(mail.text).toContain(`Gesamt inkl. MwSt. und Lieferung: ${eur('91,00')}`);
    expect(mail.text).toContain('Zahlung auf Rechnung');
    expect(mail.text).toContain('41564 Kaarst');
    expect(mail.text).toContain('Bitte vormittags.');
    expect(mail.text).toContain('AGB akzeptiert');
  });

  it('kennzeichnet Anfragen und nennt keine (Null-)Preise', () => {
    const lines = resolveLines(catalog, [{ variantId: 'kies-16-32', quantity: 2 }]);
    const mail = buildBusinessMail(lines, customer, 'inquiry');
    expect(mail.subject).toBe('Shop-Anfrage – Erika Muster');
    expect(mail.text).toContain('unverbindliche Anfrage');
    expect(mail.text).toContain('- 2 m³ Kies, 16–32 mm, lose');
    expect(mail.text).not.toContain('€');
  });
});

describe('buildCustomerInquiryConfirmation', () => {
  it('bestätigt unverbindlich, ohne Rechtstexte, Preise oder Freitext', () => {
    const lines = resolveLines(catalog, [{ variantId: 'kies-16-32', quantity: 1 }]);
    const mail = buildCustomerInquiryConfirmation(lines, { ...customer, message: 'SPAM http://evil' }, business);
    expect(mail.subject).toBe('Ihre Anfrage bei Gartenbau Matthias Schmitz');
    expect(mail.text).toContain('unverbindlich');
    expect(mail.text).toContain('Preis und möglichem Liefertermin');
    expect(mail.text).toContain('- 1 m³ Kies, 16–32 mm, lose');
    expect(mail.text).not.toContain('€');
    expect(mail.text).not.toContain('SPAM');
    expect(mail.text).not.toContain('----');
  });
});

describe('buildCustomerConfirmation', () => {
  it('bestätigt nur den Eingang, hängt Rechtstexte an und gibt keinen Freitext wieder', () => {
    const lines = resolveLines(catalog, [{ variantId: 'kies-16-32', quantity: 1 }]);
    const mail = buildCustomerConfirmation(lines, { ...customer, message: 'SPAM http://evil' }, business, [
      'AGB-TEXT',
      'WIDERRUF-TEXT',
    ]);
    expect(mail.subject).toBe('Eingangsbestätigung Ihrer Bestellung bei Gartenbau Matthias Schmitz');
    expect(mail.text).toContain('Dies ist noch keine Annahme Ihrer Bestellung');
    expect(mail.text).toContain('AGB-TEXT');
    expect(mail.text).toContain('WIDERRUF-TEXT');
    expect(mail.text).toContain('Kies, 16–32 mm, lose');
    expect(mail.text).not.toContain('SPAM');
  });
});

describe('shopCustomerSchema', () => {
  it('akzeptiert gültige Daten', () => {
    expect(shopCustomerSchema.safeParse(customer).success).toBe(true);
  });

  it('lehnt falsche PLZ, fehlende Bestätigungen und Formular-null ab', () => {
    const result = shopCustomerSchema.safeParse({
      ...customer,
      postalCode: '4156',
      confirmDeliveryArea: false,
      acceptTerms: false,
      email: null,
    });
    expect(result.success).toBe(false);
    const paths = result.error?.issues.map((issue) => issue.path[0]);
    expect(paths).toEqual(expect.arrayContaining(['postalCode', 'confirmDeliveryArea', 'acceptTerms', 'email']));
  });
});

describe('shopOrderSchema', () => {
  const valid = { customer, lines: [{ variantId: 'kies-16-32', quantity: 2 }], website: '' };

  it('akzeptiert eine gültige Anfrage', () => {
    expect(shopOrderSchema.safeParse(valid).success).toBe(true);
  });

  it('lehnt mitgeschickte Preise, leere Listen und Kommamengen ab', () => {
    expect(shopOrderSchema.safeParse({ ...valid, lines: [{ variantId: 'x', quantity: 1, priceCents: 1 }] }).success).toBe(false);
    expect(shopOrderSchema.safeParse({ ...valid, lines: [] }).success).toBe(false);
    expect(shopOrderSchema.safeParse({ ...valid, lines: [{ variantId: 'x', quantity: 1.5 }] }).success).toBe(false);
  });

  it('lehnt Zeilenumbrüche im Namen ab (Header-Injection)', () => {
    const result = shopOrderSchema.safeParse({
      ...valid,
      customer: { ...customer, name: 'Erika\r\nBcc: opfer@example.de' },
    });
    expect(result.success).toBe(false);
  });
});
