/**
 * Struktur der Rechtstexte (AGB, Widerrufsbelehrung, Datenschutz).
 * Texte liegen als Daten vor, damit eine Darstellungskomponente alle drei Seiten rendert.
 */

export type LegalBlock =
  | { readonly type: 'p'; readonly text: string }
  | { readonly type: 'list'; readonly items: readonly string[] }
  /** Platzhalter für Angaben, die noch fehlen – wird auf der Seite deutlich markiert. */
  | { readonly type: 'todo'; readonly text: string };

export type LegalSection = {
  readonly heading: string;
  readonly blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  readonly title: string;
  /** Stand-Datum, z. B. „Oktober 2026". */
  readonly updated: string;
  readonly intro?: string;
  readonly sections: readonly LegalSection[];
};
