import { describe, expect, it } from 'vitest';
import { shopCustomerSchema } from './shop';
import { withdrawalSchema } from './withdrawal';

const customer = {
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

describe('Felder, die in Mails an den Kunden zurückgespiegelt werden', () => {
  it.each([
    'Ihr Paket wartet: evil.example/xyz',
    'Jetzt bestätigen https://phish.test',
    'Login unter www.bank-sicher.com',
    'Konto gesperrt – bank-login.net',
  ])('lehnen Webadressen ab: %s', (text) => {
    expect(shopCustomerSchema.safeParse({ ...customer, name: text }).success).toBe(false);
    expect(shopCustomerSchema.safeParse({ ...customer, city: text }).success).toBe(false);
    expect(
      withdrawalSchema.safeParse({ name: 'Erika Muster', contract: text, email: 'erika@example.de' }).success,
    ).toBe(false);
  });

  it.each(['Hans-Peter Müller-Lüdenscheidt', "O'Brien", 'Dr. Erika Muster', 'Hauptstr. 12a', 'St. Tönis'])(
    'lassen normale Angaben durch: %s',
    (text) => {
      expect(shopCustomerSchema.safeParse({ ...customer, name: text, street: text }).success).toBe(true);
    },
  );

  it('lässt eine normale Widerrufserklärung durch', () => {
    const contract = 'Bestellung vom 03.10.2026: 2 m³ Kies 16–32 mm, Lieferung nach Kaarst, Bestell-Nr. 4711.';
    expect(withdrawalSchema.safeParse({ name: 'Erika Muster', contract, email: 'erika@example.de' }).success).toBe(true);
  });
});
