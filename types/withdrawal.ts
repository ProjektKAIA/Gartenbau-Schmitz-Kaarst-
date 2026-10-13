import { z } from 'zod';
import { emailField, honeypotField, singleLine } from './common';

/** Widerrufserklärung nach § 356a BGB: Name, Vertrag, E-Mail für die Eingangsbestätigung. */
export const withdrawalSchema = z.object({
  name: singleLine(2, 100, 'Bitte geben Sie Ihren Namen an.'),
  contract: z
    .string('Bitte beschreiben Sie den Vertrag.')
    .trim()
    .min(5, 'Bitte beschreiben Sie den Vertrag, z. B. Bestelldatum und Material.')
    .max(1000, 'Bitte fassen Sie sich kürzer (höchstens 1000 Zeichen).'),
  email: emailField,
});

export type Withdrawal = z.infer<typeof withdrawalSchema>;

export const withdrawalRequestSchema = z.strictObject({
  withdrawal: withdrawalSchema,
  website: honeypotField,
});
