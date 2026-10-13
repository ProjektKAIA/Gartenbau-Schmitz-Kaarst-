import { errorMessage, jsonResponse, readJsonRequest } from '@/lib/api/json-request';
import { businessContact } from '@/lib/mail';
import { createRateLimiter } from '@/lib/rate-limit';
import { site } from '@/lib/site';
import { buildWithdrawalBusinessMail, buildWithdrawalConfirmation, formatReceivedAt } from '@/lib/withdrawal';
import { sendMail, tryReadMailConfig } from '@/services/mail';
import { withdrawalRequestSchema } from '@/types/withdrawal';

/** 5 Erklärungen je 10 Minuten und IP (pro Instanz, s. lib/rate-limit.ts). */
const allowRequest = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request): Promise<Response> {
  // Fristwahrend ist der Zeitpunkt des Absendens – deshalb sofort beim Eingang festhalten.
  const receivedAt = formatReceivedAt(new Date());

  const body = await readJsonRequest(request, { maxBytes: 10_000, allowRequest });
  if (!body.ok) return body.response;

  const parsed = withdrawalRequestSchema.safeParse(body.payload);
  if (!parsed.success) {
    return jsonResponse({ ok: false, error: 'Bitte prüfen Sie Ihre Angaben.' }, 400);
  }

  const { withdrawal, website } = parsed.data;
  if (website !== '') return jsonResponse({ ok: true }, 200);

  const unavailable = `Der Versand ist gerade nicht möglich. Bitte widerrufen Sie per E-Mail an ${site.contact.email}.`;
  const config = tryReadMailConfig();
  if (!config) return jsonResponse({ ok: false, error: unavailable }, 503);

  try {
    await sendMail(
      { to: config.MAIL_TO, replyTo: withdrawal.email, ...buildWithdrawalBusinessMail(withdrawal, receivedAt) },
      config,
    );
  } catch (error) {
    console.error('Online-Widerruf: Versand an den Betrieb fehlgeschlagen', errorMessage(error));
    return jsonResponse({ ok: false, error: unavailable }, 502);
  }

  try {
    const confirmation = buildWithdrawalConfirmation(withdrawal, receivedAt, businessContact);
    await sendMail({ to: withdrawal.email, replyTo: config.MAIL_TO, ...confirmation }, config);
  } catch (error) {
    // Die Erklärung liegt beim Betrieb vor; die fehlende Bestätigung muss er manuell nachholen.
    console.error('Online-Widerruf: Eingangsbestätigung fehlgeschlagen', errorMessage(error));
  }

  return jsonResponse({ ok: true }, 200);
}
