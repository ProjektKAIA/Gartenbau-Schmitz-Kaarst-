import { z } from 'zod';
import { MAX_QUANTITY, MIN_QUANTITY } from '@/lib/shop/cart';
import { echoedLine, emailField, honeypotField, phoneField, postalCodeField } from './common';

/** Kontaktdaten aus dem Warenkorb-Formular des Shops – externe Eingabe, deshalb per Zod geprüft. */
export const shopCustomerSchema = z.object({
  // Name und Adresse stehen in der Bestätigungsmail an den Kunden → ohne Webadressen.
  name: echoedLine(2, 100, 'Bitte geben Sie Ihren Namen an.'),
  street: echoedLine(3, 120, 'Bitte geben Sie Straße und Hausnummer an.'),
  postalCode: postalCodeField,
  city: echoedLine(2, 80, 'Bitte geben Sie den Ort an.'),
  phone: phoneField,
  email: emailField,
  message: z.string().trim().max(1000, 'Die Nachricht ist zu lang.'),
  confirmDeliveryArea: z.literal(true, {
    error: 'Bitte bestätigen Sie die Lieferbedingungen.',
  }),
  /** Annahme der AGB und Kenntnisnahme der Datenschutzerklärung – Pflicht, auch serverseitig. */
  acceptTerms: z.literal(true, {
    error: 'Bitte akzeptieren Sie die AGB und bestätigen Sie die Datenschutzerklärung.',
  }),
});

export type ShopCustomer = z.infer<typeof shopCustomerSchema>;

export const MAX_ORDER_LINES = 40;

/** Eine Warenkorb-Zeile – gilt für die API und für den gespeicherten Warenkorb im Browser. */
export const cartLineSchema = z.strictObject({
  variantId: z.string().min(1).max(80),
  quantity: z.number().int().min(MIN_QUANTITY).max(MAX_QUANTITY),
});

export const cartLinesSchema = z
  .array(cartLineSchema)
  .max(MAX_ORDER_LINES)
  // Jede Variante höchstens einmal – sonst ließe sich MAX_QUANTITY über Dubletten umgehen.
  .refine((lines) => new Set(lines.map((line) => line.variantId)).size === lines.length, {
    message: 'Jeder Artikel darf nur einmal vorkommen.',
  });

/** Komplette Bestellung bzw. Anfrage an `/api/shop-order`. Preise schickt der Client bewusst nicht mit. */
export const shopOrderSchema = z.strictObject({
  customer: shopCustomerSchema,
  lines: cartLinesSchema.min(1),
  website: honeypotField,
});

export type ShopOrder = z.infer<typeof shopOrderSchema>;
