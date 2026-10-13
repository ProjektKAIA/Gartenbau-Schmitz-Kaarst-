import { describe, expect, it } from 'vitest';
import { contactSchema, type ContactRequest } from '@/types/contact';
import { buildContactBusinessMail, contactHref, topicFromQuery } from './contact';

const valid = {
  name: 'Erika Muster',
  email: 'erika@example.de',
  phone: '',
  replyVia: 'email',
  topic: 'winterdienst',
  street: '',
  postalCode: '',
  city: '',
  timeframe: '',
  message: 'Wir brauchen Winterdienst für unsere Einfahrt.',
  privacyConsent: true,
};

const parse = (overrides: Record<string, unknown>) => contactSchema.safeParse({ ...valid, ...overrides });
const firstPath = (overrides: Record<string, unknown>) => parse(overrides).error?.issues[0]?.path[0];

describe('contactSchema', () => {
  it('akzeptiert eine Anfrage nur mit Pflichtfeldern', () => {
    expect(parse({}).success).toBe(true);
  });

  it('verlangt Name, E-Mail, Anliegen, Nachricht und Einwilligung', () => {
    expect(firstPath({ name: ' ' })).toBe('name');
    expect(firstPath({ email: 'kein-at' })).toBe('email');
    expect(firstPath({ topic: 'garten' })).toBe('topic');
    expect(firstPath({ message: 'kurz' })).toBe('message');
    expect(firstPath({ privacyConsent: false })).toBe('privacyConsent');
  });

  it('prüft optionale Felder nur, wenn sie ausgefüllt sind', () => {
    expect(parse({ postalCode: '41564', phone: '0177 2770274' }).success).toBe(true);
    expect(firstPath({ postalCode: '415' })).toBe('postalCode');
    expect(firstPath({ phone: 'abc' })).toBe('phone');
  });

  it('verlangt die Telefonnummer, wenn ein Rückruf gewünscht ist – auch neben anderen Fehlern', () => {
    expect(firstPath({ replyVia: 'phone' })).toBe('phone');
    const issues = parse({ replyVia: 'phone', name: '' }).error?.issues.map((issue) => issue.path[0]);
    expect(issues).toEqual(expect.arrayContaining(['name', 'phone']));
  });

  it('lehnt Zeilenumbrüche in einzeiligen Feldern ab (Mail-Header-Injection)', () => {
    expect(firstPath({ name: 'Erika\nBcc: x@y.de' })).toBe('name');
  });
});

describe('topicFromQuery', () => {
  it('liest bekannte Anliegen und normalisiert Schreibweise', () => {
    expect(topicFromQuery('winterdienst')).toBe('winterdienst');
    expect(topicFromQuery(' Winterdienst ')).toBe('winterdienst');
    expect(topicFromQuery(['pflege', 'karriere'])).toBe('pflege');
  });

  it('ignoriert unbekannte oder fehlende Werte', () => {
    expect(topicFromQuery('<script>')).toBeUndefined();
    expect(topicFromQuery(undefined)).toBeUndefined();
    expect(topicFromQuery(42)).toBeUndefined();
  });

  it('passt zu den Links, die contactHref baut', () => {
    const href = contactHref('sturmschaden');
    expect(href).toBe('/kontakt?anliegen=sturmschaden');
    expect(topicFromQuery(new URL(href, 'http://x').searchParams.get('anliegen'))).toBe('sturmschaden');
    expect(contactHref()).toBe('/kontakt');
  });
});

describe('buildContactBusinessMail', () => {
  const contact: ContactRequest = contactSchema.parse({
    ...valid,
    phone: '0171 1234567',
    replyVia: 'phone',
    street: 'Musterweg 1',
    postalCode: '41564',
    city: 'Kaarst',
    timeframe: 'ab November',
  });

  it('nennt Anliegen und Name im Betreff', () => {
    expect(buildContactBusinessMail(contact, 'x').subject).toBe('Kontaktanfrage: Winterdienst – Erika Muster');
  });

  it('enthält alle Angaben und den Eingangszeitpunkt', () => {
    const { text } = buildContactBusinessMail(contact, '12.10.2026, 10:00:00 Uhr');
    expect(text).toContain('Telefon: 0171 1234567');
    expect(text).toContain('Rückmeldung gewünscht: Per Telefon');
    expect(text).toContain('Adresse des Objekts: Musterweg 1, 41564 Kaarst');
    expect(text).toContain('Gewünschter Zeitraum: ab November');
    expect(text).toContain(valid.message);
    expect(text).toContain('Eingegangen am: 12.10.2026, 10:00:00 Uhr');
  });

  it('markiert leere optionale Angaben mit Strich', () => {
    const { text } = buildContactBusinessMail(contactSchema.parse(valid), 'x');
    expect(text).toContain('Telefon: –');
    expect(text).toContain('Adresse des Objekts: –');
  });
});
