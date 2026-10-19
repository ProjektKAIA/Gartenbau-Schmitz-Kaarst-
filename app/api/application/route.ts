import { errorMessage, jsonResponse, readJsonRequest } from '@/lib/api/json-request';
import { buildApplicationMail } from '@/lib/application';
import { createRateLimiter } from '@/lib/rate-limit';
import { site } from '@/lib/site';
import { formatReceivedAt } from '@/lib/withdrawal';
import { sendMail, tryReadMailConfig } from '@/services/mail';
import { applicationRequestSchema } from '@/types/application';

/** 5 Bewerbungen je 10 Minuten und IP (pro Instanz, s. lib/rate-limit.ts). */
const allowRequest = createRateLimiter(5, 10 * 60 * 1000);

const unavailable = `Der Versand ist gerade nicht möglich. Bitte ruf uns an (${site.contact.phone}) oder schreib an ${site.contact.email}.`;

/**
 * Bewerbung als E-Mail an den Betrieb (Reply-To = Bewerber/in).
 * Bewusst keine Bestätigungsmail – nach dem Absenden zeigt die Seite eine Danke-Meldung.
 */
export async function POST(request: Request): Promise<Response> {
  const receivedAt = formatReceivedAt(new Date());

  const body = await readJsonRequest(request, { maxBytes: 20_000, allowRequest });
  if (!body.ok) return body.response;

  const parsed = applicationRequestSchema.safeParse(body.payload);
  if (!parsed.success) {
    return jsonResponse({ ok: false, error: 'Bitte prüfe deine Angaben.' }, 400);
  }

  const { application, website } = parsed.data;
  // Honeypot ausgefüllt → Bot. Still „Erfolg" melden, nichts senden.
  if (website !== '') return jsonResponse({ ok: true }, 200);

  const config = tryReadMailConfig();
  if (!config) return jsonResponse({ ok: false, error: unavailable }, 503);

  try {
    await sendMail({ to: config.MAIL_TO, replyTo: application.email, ...buildApplicationMail(application, receivedAt) }, config);
  } catch (error) {
    console.error('Bewerbung: Versand an den Betrieb fehlgeschlagen', errorMessage(error));
    return jsonResponse({ ok: false, error: unavailable }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
