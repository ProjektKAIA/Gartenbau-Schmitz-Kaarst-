import { agb } from '@/content/legal/agb';
import { widerruf } from '@/content/legal/widerruf';
import { shopProducts, shopTerms } from '@/content/shop';
import { errorMessage, jsonResponse, readJsonRequest } from '@/lib/api/json-request';
import { legalDocumentToText } from '@/lib/legal/to-text';
import { businessContact } from '@/lib/mail';
import { createRateLimiter } from '@/lib/rate-limit';
import { buildBusinessMail, buildCustomerConfirmation, resolveLines } from '@/lib/shop/order';
import { sendMail, tryReadMailConfig } from '@/services/mail';
import { shopOrderSchema } from '@/types/shop';

/** 5 Bestellungen je 10 Minuten und IP (pro Instanz, s. lib/rate-limit.ts). */
const allowRequest = createRateLimiter(5, 10 * 60 * 1000);

/** AGB und Widerrufsbelehrung (inkl. Muster-Formular) als Text für die Eingangsbestätigung. */
const legalTexts = [legalDocumentToText(agb), legalDocumentToText(widerruf)];

export async function POST(request: Request): Promise<Response> {
  if (!shopTerms.ordersOpen) {
    return jsonResponse(
      { ok: false, error: 'Online-Bestellungen sind noch nicht freigeschaltet. Bitte rufen Sie uns an.' },
      503,
    );
  }

  const body = await readJsonRequest(request, { maxBytes: 20_000, allowRequest });
  if (!body.ok) return body.response;

  const parsed = shopOrderSchema.safeParse(body.payload);
  if (!parsed.success) {
    return jsonResponse({ ok: false, error: 'Bitte prüfen Sie Ihre Angaben.' }, 400);
  }

  const { customer, lines, website } = parsed.data;

  // Honeypot gefüllt → Bot. Erfolg vortäuschen, damit er nicht nachjustiert.
  if (website !== '') return jsonResponse({ ok: true }, 200);

  // Preise kommen ausschließlich aus dem Katalog auf dem Server, nie vom Client.
  const resolved = resolveLines(shopProducts, lines);
  if (resolved.length !== lines.length) {
    return jsonResponse(
      { ok: false, error: 'Ein Artikel ist nicht mehr verfügbar. Bitte laden Sie die Seite neu.' },
      400,
    );
  }

  const config = tryReadMailConfig();
  if (!config) {
    return jsonResponse({ ok: false, error: 'Der Versand ist gerade nicht möglich. Bitte rufen Sie uns an.' }, 503);
  }

  try {
    await sendMail({ to: config.MAIL_TO, replyTo: customer.email, ...buildBusinessMail(resolved, customer) }, config);
  } catch (error) {
    console.error('Shop-Bestellung: Versand an den Betrieb fehlgeschlagen', errorMessage(error));
    return jsonResponse({ ok: false, error: 'Der Versand ist fehlgeschlagen. Bitte rufen Sie uns an.' }, 502);
  }

  try {
    const confirmation = buildCustomerConfirmation(
      resolved,
      customer,
      businessContact,
      legalTexts,
    );
    await sendMail({ to: customer.email, replyTo: config.MAIL_TO, ...confirmation }, config);
  } catch (error) {
    // Die Bestellung ist beim Betrieb angekommen – fehlende Bestätigung ist kein Abbruchgrund.
    console.error('Shop-Bestellung: Eingangsbestätigung fehlgeschlagen', errorMessage(error));
  }

  return jsonResponse({ ok: true }, 200);
}
