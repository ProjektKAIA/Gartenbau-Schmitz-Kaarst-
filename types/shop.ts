import { z } from 'zod';
import { MAX_QUANTITY, MIN_QUANTITY } from '@/lib/shop/cart';
import { emailField, honeypotField, singleLine } from './common';

/** Kontaktdaten aus dem Anfrageformular des Shops – externe Eingabe, deshalb per Zod geprüft. */
export const shopCustomerSchema = z.object({
  name: singleLine(2, 100, 'Bitte geben Sie Ihren Namen an.'),
  street: singleLine(3, 120, 'Bitte geben Sie Straße und Hausnummer an.'),
  postalCode: z
    .string('Bitte geben Sie eine fünfstellige Postleitzahl an.')
    .trim()
    .regex(/^\d{5}$/, 'Bitte geben Sie eine fünfstellige Postleitzahl an.'),
  city: singleLine(2, 80, 'Bitte geben Sie den Ort an.'),
  phone: z
    .string('Bitte geben Sie eine Telefonnummer für Rückfragen an.')
    .trim()
    .regex(/^[+\d][\d\s/()-]{5,30}$/, 'Bitte geben Sie eine Telefonnummer für Rückfragen an.'),
  email: emailField,
  message: z.string().trim().max(1000, 'Die Nachricht ist zu lang.'),
  confirmDeliveryArea: z.literal(true, {
    error: 'Bitte bestätigen Sie die Lieferbedingungen.',
  }),
});

export type ShopCustomer = z.infer<typeof shopCustomerSchema>;

export const MAX_ORDER_LINES = 40;

/** Komplette Bestellung an `/api/shop-order`. Preise schickt der Client bewusst nicht mit. */
export const shopOrderSchema = z.strictObject({
  customer: shopCustomerSchema,
  lines: z
    .array(
      z.strictObject({
        variantId: z.string().min(1).max(80),
        quantity: z.number().int().min(MIN_QUANTITY).max(MAX_QUANTITY),
      }),
    )
    .min(1)
    .max(MAX_ORDER_LINES),
  website: honeypotField,
});

export type ShopOrder = z.infer<typeof shopOrderSchema>;
