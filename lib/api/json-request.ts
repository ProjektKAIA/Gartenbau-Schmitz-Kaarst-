/**
 * Gemeinsame Eingangsprüfung für die JSON-POST-Routen (Bestellung, Widerruf):
 * Content-Type, Rate-Limit je IP, Größenlimit und JSON-Parsing an genau einer Stelle.
 */

export type ApiResponseBody = { ok: true } | { ok: false; error: string };

export const jsonResponse = (body: ApiResponseBody, status: number): Response => Response.json(body, { status });

type ReadOptions = {
  readonly maxBytes: number;
  readonly allowRequest: (key: string) => boolean;
};

export type JsonRequestResult = { ok: true; payload: unknown } | { ok: false; response: Response };

export const clientIp = (request: Request): string =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

export const readJsonRequest = async (request: Request, options: ReadOptions): Promise<JsonRequestResult> => {
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return { ok: false, response: jsonResponse({ ok: false, error: 'Ungültige Anfrage.' }, 415) };
  }

  if (!options.allowRequest(clientIp(request))) {
    return {
      ok: false,
      response: jsonResponse({ ok: false, error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }, 429),
    };
  }

  // Vorab per Content-Length ablehnen, damit große Bodies gar nicht erst eingelesen werden.
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > options.maxBytes) {
    return { ok: false, response: jsonResponse({ ok: false, error: 'Die Anfrage ist zu groß.' }, 413) };
  }

  const raw = await request.text();
  if (raw.length > options.maxBytes) {
    return { ok: false, response: jsonResponse({ ok: false, error: 'Die Anfrage ist zu groß.' }, 413) };
  }

  try {
    return { ok: true, payload: JSON.parse(raw) };
  } catch {
    return { ok: false, response: jsonResponse({ ok: false, error: 'Ungültige Anfrage.' }, 400) };
  }
};

export const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'unbekannter Fehler';
