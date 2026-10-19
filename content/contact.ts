/**
 * Texte und Auswahllisten der Kontaktseite.
 * Die Anliegen sind die einzige Quelle für Select, Zod-Schema, Query-Param und Mail-Betreff.
 */

import { contact as homeContact } from './home';

export const contactTopics = [
  { id: 'gestaltung', label: 'Gartengestaltung & Planung' },
  { id: 'pflaster', label: 'Pflaster, Terrasse & Wege' },
  { id: 'pflege', label: 'Gartenpflege' },
  { id: 'bewaesserung', label: 'Bewässerung' },
  { id: 'maehroboter', label: 'Mähroboter' },
  { id: 'winterdienst', label: 'Winterdienst' },
  { id: 'sturmschaden', label: 'Sturmschaden' },
  { id: 'material', label: 'Materiallieferung / Shop' },
  { id: 'karriere', label: 'Bewerbung / Karriere' },
  { id: 'sonstiges', label: 'Sonstiges' },
] as const;

export type ContactTopicId = (typeof contactTopics)[number]['id'];

export const replyChannels = [
  { id: 'email', label: 'Per E-Mail' },
  { id: 'phone', label: 'Per Telefon' },
] as const;

export type ReplyChannelId = (typeof replyChannels)[number]['id'];

export const contactCopy = {
  label: 'Kontakt',
  title: 'Erzählen Sie uns von Ihrem Vorhaben.',
  intro:
    'Je genauer Sie Ihr Anliegen beschreiben, desto gezielter können wir uns vorbereiten. Wir melden uns persönlich – auf dem Weg, den Sie bevorzugen.',
  /** Knopf auf der Startseite (Sektion „Ihr Projekt"). */
  formLinkLabel: 'Zum Kontaktformular',
  fields: {
    name: 'Name *',
    email: 'E-Mail *',
    phone: 'Telefon',
    phoneHint: 'Nötig, wenn wir Sie anrufen sollen.',
    replyVia: 'Wie dürfen wir uns melden?',
    topic: 'Anliegen *',
    topicPlaceholder: 'Bitte wählen',
    objectLegend: 'Adresse des Objekts (optional)',
    objectHint: 'Hilft uns, einen Termin vor Ort vorzubereiten.',
    street: 'Straße & Hausnummer',
    postalCode: 'PLZ',
    city: 'Ort',
    timeframe: 'Gewünschter Zeitraum (optional)',
    timeframeHint: 'z. B. „Frühjahr 2027" oder „so bald wie möglich"',
    message: 'Ihre Nachricht *',
    // Bewusst Hinweis statt Pflicht-Checkbox: Rechtsgrundlage ist Art. 6 Abs. 1 lit. b/f DSGVO,
    // keine Einwilligung (Art. 13 DSGVO verlangt Information, keine Zustimmung).
    privacyBefore: 'Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer ',
    privacyLink: 'Datenschutzerklärung',
    privacyAfter: '.',
  },
  requiredNote: 'Mit * markierte Felder sind Pflichtfelder.',
  submitLabel: 'Anfrage senden',
  sendingLabel: 'Wird gesendet …',
  sentTitle: 'Vielen Dank für Ihre Kontaktaufnahme.',
  sentBody: 'Wir melden uns zeitnah bei Ihnen.',
  asideTitle: 'Direkter Draht',
  asideBody: 'Lieber gleich sprechen? Rufen Sie an oder schreiben Sie uns eine E-Mail.',
} as const;

/** Abschluss-Band auf den Unterseiten (Leistungen, Über uns) – Texte wie auf der Startseite. */
export const contactCta = {
  label: homeContact.label,
  title: homeContact.title,
  body: homeContact.body,
  cta: contactCopy.formLinkLabel,
} as const;
