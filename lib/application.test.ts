import { describe, expect, it } from 'vitest';
import { applicationSchema, type Application } from '@/types/application';
import { buildApplicationMail } from './application';

const valid = {
  name: 'Max Muster',
  email: 'max@example.de',
  phone: '0177 1234567',
  city: 'Neuss',
  workload: 'vollzeit',
  galabauTraining: 'nein',
  otherTraining: 'Maurer',
  experience: '1-3',
  license: 'be',
  availableFrom: 'sofort',
  message: '',
} as const;

const parse = (overrides: Record<string, unknown>) => applicationSchema.safeParse({ ...valid, ...overrides });
const firstPath = (overrides: Record<string, unknown>) => parse(overrides).error?.issues[0]?.path[0];

describe('applicationSchema', () => {
  it('akzeptiert eine vollständige Bewerbung, Nachricht und andere Ausbildung sind optional', () => {
    expect(parse({}).success).toBe(true);
    expect(parse({ otherTraining: '', message: '' }).success).toBe(true);
  });

  it('verlangt Kontaktdaten, Wohnort und Verfügbarkeit', () => {
    expect(firstPath({ name: ' ' })).toBe('name');
    expect(firstPath({ email: 'kein-at' })).toBe('email');
    expect(firstPath({ phone: '' })).toBe('phone');
    expect(firstPath({ city: '' })).toBe('city');
    expect(firstPath({ availableFrom: '' })).toBe('availableFrom');
  });

  it('nimmt nur bekannte Auswahlwerte an', () => {
    expect(firstPath({ workload: 'minijob' })).toBe('workload');
    expect(firstPath({ galabauTraining: 'vielleicht' })).toBe('galabauTraining');
    expect(firstPath({ experience: '10' })).toBe('experience');
    expect(firstPath({ license: 'a' })).toBe('license');
  });

  it('lässt keine Zeilenumbrüche in einzeiligen Feldern zu (Mail-Betreff)', () => {
    expect(firstPath({ name: 'Max\nBcc: x@y.de' })).toBe('name');
  });
});

describe('buildApplicationMail', () => {
  it('nennt Stelle und Name im Betreff und alle Angaben mit lesbaren Bezeichnungen', () => {
    const application: Application = applicationSchema.parse(valid);
    const mail = buildApplicationMail(application, '19.10.2026, 10:00 Uhr');
    expect(mail.subject).toBe('Bewerbung: Landschaftsgärtner/in (m/w/d) – Max Muster');
    expect(mail.text).toContain('Gewünschte Arbeitszeit: Vollzeit');
    expect(mail.text).toContain('Ausbildung im GaLaBau: Nein');
    expect(mail.text).toContain('Andere handwerkliche Ausbildung: Maurer');
    expect(mail.text).toContain('Berufserfahrung im GaLaBau: 1–3 Jahre');
    expect(mail.text).toContain('Führerschein: Klasse BE (mit Anhänger)');
    expect(mail.text).toContain('Verfügbar ab: sofort');
  });
});
