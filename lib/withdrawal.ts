import type { Withdrawal } from '@/types/withdrawal';
import type { BusinessContact, MailContent } from './mail';

const berlinTime = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  dateStyle: 'medium',
  timeStyle: 'medium',
});

/** Eingangszeitpunkt in deutscher Zeit, z. B. „12.10.2026, 15:42:07 Uhr". */
export const formatReceivedAt = (date: Date): string => `${berlinTime.format(date)} Uhr`;

const declaration = (withdrawal: Withdrawal, receivedAt: string): string[] => [
  'Widerrufserklärung:',
  `Hiermit widerrufe ich den folgenden Vertrag.`,
  '',
  `Name: ${withdrawal.name}`,
  `E-Mail: ${withdrawal.email}`,
  'Vertrag:',
  withdrawal.contract,
  '',
  `Eingegangen am: ${receivedAt}`,
];

/** Mail an den Betrieb – Antworten gehen per Reply-To an den Kunden. */
export const buildWithdrawalBusinessMail = (withdrawal: Withdrawal, receivedAt: string): MailContent => ({
  subject: `Online-Widerruf – ${withdrawal.name}`,
  text: ['Über die Website ist ein Widerruf eingegangen:', '', ...declaration(withdrawal, receivedAt)].join('\n'),
});

/**
 * Eingangsbestätigung nach § 356a Abs. 3 BGB: Inhalt der Erklärung plus Datum und Uhrzeit.
 * Ausdrücklich ohne Aussage zur Wirksamkeit.
 */
export const buildWithdrawalConfirmation = (
  withdrawal: Withdrawal,
  receivedAt: string,
  business: BusinessContact,
): MailContent => ({
  subject: `Eingangsbestätigung Ihres Widerrufs bei ${business.name}`,
  text: [
    `Guten Tag ${withdrawal.name},`,
    '',
    'wir bestätigen den Eingang Ihres Widerrufs. Die Wirksamkeit haben wir damit noch nicht geprüft – wir melden uns bei Ihnen.',
    '',
    ...declaration(withdrawal, receivedAt),
    '',
    'Viele Grüße',
    business.name,
    `Telefon ${business.phone} · ${business.email}`,
  ].join('\n'),
});
