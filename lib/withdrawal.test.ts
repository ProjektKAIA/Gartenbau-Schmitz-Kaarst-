import { describe, expect, it } from 'vitest';
import { withdrawalSchema } from '@/types/withdrawal';
import { buildWithdrawalBusinessMail, buildWithdrawalConfirmation, formatReceivedAt } from './withdrawal';

const withdrawal = { name: 'Erika Muster', contract: 'Bestellung vom 01.10.2026, 2 m³ Kies', email: 'erika@example.de' };
const business = { name: 'Gartenbau Matthias Schmitz', phone: '0177 2770274', email: 'info@example.de' };

describe('formatReceivedAt', () => {
  it('formatiert in deutscher Zeit (Sommerzeit berücksichtigt)', () => {
    expect(formatReceivedAt(new Date('2026-10-12T13:42:07Z'))).toBe('12.10.2026, 15:42:07 Uhr');
    expect(formatReceivedAt(new Date('2026-12-01T08:00:00Z'))).toBe('01.12.2026, 09:00:00 Uhr');
  });
});

describe('Widerrufs-Mails', () => {
  it('Bestätigung enthält Erklärung, Eingangszeitpunkt und keine Wirksamkeitsaussage', () => {
    const mail = buildWithdrawalConfirmation(withdrawal, '12.10.2026, 15:42:07 Uhr', business);
    expect(mail.subject).toBe('Eingangsbestätigung Ihres Widerrufs bei Gartenbau Matthias Schmitz');
    expect(mail.text).toContain('Hiermit widerrufe ich den folgenden Vertrag.');
    expect(mail.text).toContain('Bestellung vom 01.10.2026, 2 m³ Kies');
    expect(mail.text).toContain('Eingegangen am: 12.10.2026, 15:42:07 Uhr');
    expect(mail.text).toContain('Wirksamkeit haben wir damit noch nicht geprüft');
  });

  it('Mail an den Betrieb nennt Name und Zeitpunkt', () => {
    const mail = buildWithdrawalBusinessMail(withdrawal, 'JETZT');
    expect(mail.subject).toBe('Online-Widerruf – Erika Muster');
    expect(mail.text).toContain('Eingegangen am: JETZT');
  });
});

describe('withdrawalSchema', () => {
  it('verlangt Name, Vertragsangabe und gültige E-Mail', () => {
    expect(withdrawalSchema.safeParse(withdrawal).success).toBe(true);
    const result = withdrawalSchema.safeParse({ name: 'E', contract: '', email: 'x' });
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(['name', 'contract', 'email']);
  });
});
