import { contactTopics, replyChannels, type ContactTopicId } from '@/content/contact';
import { contactTopicSchema, type ContactRequest } from '@/types/contact';
import type { MailContent } from './mail';

/** Name des Query-Params, mit dem sich das Anliegen vorbelegen lässt (`/kontakt?anliegen=winterdienst`). */
export const TOPIC_QUERY_PARAM = 'anliegen';

/** Link auf das Kontaktformular, optional mit vorbelegtem Anliegen – einzige Stelle, die die URL baut. */
export const contactHref = (topic?: ContactTopicId): string =>
  topic ? `/kontakt?${TOPIC_QUERY_PARAM}=${topic}` : '/kontakt';

/**
 * Anliegen aus dem Query-Param lesen. Der Wert ist externe Eingabe: unbekannte Werte,
 * Mehrfach-Parameter oder Groß-/Kleinschreibung-Varianten ergeben `undefined` bzw. werden normalisiert.
 */
export const topicFromQuery = (value: unknown): ContactTopicId | undefined => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = contactTopicSchema.safeParse(typeof raw === 'string' ? raw.trim().toLowerCase() : raw);
  return parsed.success ? parsed.data : undefined;
};

const labelOf = <T extends { readonly id: string; readonly label: string }>(list: readonly T[], id: string): string =>
  list.find((entry) => entry.id === id)?.label ?? id;

export const topicLabel = (topic: ContactTopicId): string => labelOf(contactTopics, topic);

/** Mail an den Betrieb – Antworten gehen per Reply-To direkt an den Kunden. */
export const buildContactBusinessMail = (contact: ContactRequest, receivedAt: string): MailContent => {
  const address = [contact.street, [contact.postalCode, contact.city].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ');

  return {
    subject: `Kontaktanfrage: ${topicLabel(contact.topic)} – ${contact.name}`,
    text: [
      'Über das Kontaktformular der Website ist eine Anfrage eingegangen:',
      '',
      `Anliegen: ${topicLabel(contact.topic)}`,
      `Name: ${contact.name}`,
      `E-Mail: ${contact.email}`,
      `Telefon: ${contact.phone || '–'}`,
      `Rückmeldung gewünscht: ${labelOf(replyChannels, contact.replyVia)}`,
      `Adresse des Objekts: ${address || '–'}`,
      `Gewünschter Zeitraum: ${contact.timeframe || '–'}`,
      '',
      'Nachricht:',
      contact.message,
      '',
      `Eingegangen am: ${receivedAt}`,
      'Einwilligung in die Datenverarbeitung (Datenschutzerklärung): erteilt',
    ].join('\n'),
  };
};
