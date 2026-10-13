import { errorMessage, jsonResponse, readJsonRequest } from '@/lib/api/json-request';
import { buildContactBusinessMail } from '@/lib/contact';
import { createRateLimiter } from '@/lib/rate-limit';
import { site } from '@/lib/site';
import { formatReceivedAt } from '@/lib/withdrawal';
import { sendMail, tryReadMailConfig } from '@/services/mail';
import { contactRequestSchema } from '@/types/contact';

/** 5 Anfragen je 10 Minuten und IP (pro Instanz, s. lib/rate-limit.ts). */
const allowRequest = createRateLimiter(5, 10 * 60 * 1000);

const unavailable = `Der Versand ist gerade nicht möglich. Bitte rufen Sie uns an (${site.contact.phone}) oder schreiben Sie an ${site.contact.email}.`;

/**
 * Kontaktformular: Anfrage als E-Mail an den Betrieb (Reply-To = Kunde).
 * Bewusst KEINE automatische Bestätigungsmail an den Kunden – die richtet der Betrieb
 * später selbst ein (dann analog zu app/api/withdrawal/route.ts ergänzen).
 */
export async function POST(request: Request): Promise<Response> {
  const receivedAt = formatReceivedAt(new Date());

  const body = await readJsonRequest(request, { maxBytes: 20_000, allowRequest });
  if (!body.ok) return body.response;

  const parsed = contactRequestSchema.safeParse(body.payload);
  if (!parsed.success) {
    return jsonResponse({ ok: false, error: 'Bitte prüfen Sie Ihre Angaben.' }, 400);
  }

  const { contact, website } = parsed.data;
  // Honeypot ausgefüllt → Bot. Still „Erfolg" melden, nichts senden.
  if (website !== '') return jsonResponse({ ok: true }, 200);

  const config = tryReadMailConfig();
  if (!config) return jsonResponse({ ok: false, error: unavailable }, 503);

  try {
    await sendMail({ to: config.MAIL_TO, replyTo: contact.email, ...buildContactBusinessMail(contact, receivedAt) }, config);
  } catch (error) {
    console.error('Kontaktformular: Versand an den Betrieb fehlgeschlagen', errorMessage(error));
    return jsonResponse({ ok: false, error: unavailable }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
