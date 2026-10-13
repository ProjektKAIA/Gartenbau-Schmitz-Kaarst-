import { z } from 'zod';
import { echoedLine, emailField, hasWebAddress, honeypotField, NO_WEB_ADDRESS_MESSAGE } from './common';

/** Widerrufserklärung nach § 356a BGB: Name, Vertrag, E-Mail für die Eingangsbestätigung. */
export const withdrawalSchema = z.object({
  // Name und Vertragstext stehen in der Eingangsbestätigung (§ 356a BGB verlangt den Inhalt)
  // an die eingegebene Adresse → ohne Webadressen.
  name: echoedLine(2, 100, 'Bitte geben Sie Ihren Namen an.'),
  contract: z
    .string('Bitte beschreiben Sie den Vertrag.')
    .trim()
    .min(5, 'Bitte beschreiben Sie den Vertrag, z. B. Bestelldatum und Material.')
    .max(1000, 'Bitte fassen Sie sich kürzer (höchstens 1000 Zeichen).')
    .refine((value) => !hasWebAddress(value), NO_WEB_ADDRESS_MESSAGE),
  email: emailField,
});

export type Withdrawal = z.infer<typeof withdrawalSchema>;

export const withdrawalRequestSchema = z.strictObject({
  withdrawal: withdrawalSchema,
  website: honeypotField,
});
