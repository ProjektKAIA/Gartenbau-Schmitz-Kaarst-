import { z } from 'zod';
import { contactTopics, replyChannels, type ContactTopicId, type ReplyChannelId } from '@/content/contact';
import { emailField, honeypotField, phoneField, postalCodeField, singleLine } from './common';

const topicIds: readonly ContactTopicId[] = contactTopics.map((topic) => topic.id);
const channelIds: readonly ReplyChannelId[] = replyChannels.map((channel) => channel.id);

export const contactTopicSchema = z.enum(topicIds, 'Bitte wählen Sie Ihr Anliegen.');
export const replyChannelSchema = z.enum(channelIds, 'Bitte wählen Sie, wie wir uns melden sollen.');

/** Telefon- und PLZ-Regel aus types/common.ts – dieselben wie im Shop. */
const phoneRule = phoneField;
const postalCodeRule = postalCodeField;

/** Optionales Feld: leer erlaubt, sonst muss die Regel des Pflichtfelds greifen. */
const optionalOf = (rule: z.ZodType<string>, message: string) =>
  z
    .string(message)
    .trim()
    .refine((value) => value === '' || rule.safeParse(value).success, message);

const PHONE_MESSAGE = 'Bitte geben Sie eine gültige Telefonnummer an.';

/** Kontaktanfrage – gilt für Formular (Client) und API (Server). */
export const contactSchema = z
  .object({
    name: singleLine(2, 100, 'Bitte geben Sie Ihren Namen an.'),
    email: emailField,
    phone: optionalOf(phoneRule, PHONE_MESSAGE),
    replyVia: replyChannelSchema,
    topic: contactTopicSchema,
    street: singleLine(0, 120, 'Bitte prüfen Sie Straße und Hausnummer (höchstens 120 Zeichen).'),
    postalCode: optionalOf(postalCodeRule, 'Bitte geben Sie eine fünfstellige Postleitzahl an.'),
    city: singleLine(0, 80, 'Bitte prüfen Sie den Ort (höchstens 80 Zeichen).'),
    timeframe: singleLine(0, 120, 'Bitte fassen Sie den Zeitraum kürzer (höchstens 120 Zeichen).'),
    message: z
      .string('Bitte schreiben Sie uns kurz, worum es geht.')
      .trim()
      .min(10, 'Bitte schreiben Sie uns kurz, worum es geht (mindestens 10 Zeichen).')
      .max(3000, 'Bitte fassen Sie sich kürzer (höchstens 3000 Zeichen).'),
  })
  .refine((contact) => contact.replyVia !== 'phone' || contact.phone !== '', {
    path: ['phone'],
    message: 'Für einen Rückruf brauchen wir Ihre Telefonnummer.',
    // Auch prüfen, wenn andere Felder noch Fehler haben – nur Telefon/Rückweg müssen gültig sein.
    // Ein Fehler ohne Pfad heißt: Es liegt gar kein Objekt vor (null, Array, Text) – dann nicht prüfen.
    when: (payload) =>
      payload.issues.every(
        (issue) => issue.path !== undefined && issue.path.length > 0 && !['phone', 'replyVia'].includes(String(issue.path[0])),
      ),
  });

export type ContactRequest = z.infer<typeof contactSchema>;

/** Body von `POST /api/contact`. */
export const contactRequestSchema = z.strictObject({
  contact: contactSchema,
  website: honeypotField,
});
