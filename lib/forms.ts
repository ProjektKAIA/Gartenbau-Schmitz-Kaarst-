/** Gemeinsame Helfer für die Formulare (Shop-Bestellung, Online-Widerruf). */

export type FieldErrors = Partial<Record<string, string>>;

/** Zod-Issues → erste Fehlermeldung je Feld. */
export const fieldErrorsFrom = (
  issues: readonly { readonly path: readonly PropertyKey[]; readonly message: string }[],
): FieldErrors => {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? 'form');
    errors[key] ??= issue.message;
  }
  return errors;
};

/** Fehlermeldung aus einer API-Antwort lesen – Antwort ist extern, also nur das Nötigste prüfen. */
export const readApiError = async (response: Response, fallback: string): Promise<string> => {
  try {
    const body: unknown = await response.json();
    if (typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string') {
      return body.error;
    }
  } catch {
    // Kein JSON – Standardtext verwenden.
  }
  return fallback;
};
