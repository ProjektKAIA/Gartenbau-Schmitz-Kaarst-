/**
 * Einsatzgebiete für die lokalen Landingpages unter `/gartenbau/[slug]`.
 * Einzige Quelle für Orte, Slugs und ortsbezogene Texte (Sitemap, Footer, Seiten).
 * Inhalte je Ort: werden ausgearbeitet (SEO-Agent).
 */

export type ServiceArea = {
  readonly slug: string;
  readonly city: string;
};

export const serviceAreas = [
  { slug: 'kaarst', city: 'Kaarst' },
  { slug: 'neuss', city: 'Neuss' },
  { slug: 'meerbusch', city: 'Meerbusch' },
  { slug: 'korschenbroich', city: 'Korschenbroich' },
  { slug: 'dormagen', city: 'Dormagen' },
  { slug: 'willich', city: 'Willich' },
  { slug: 'grevenbroich', city: 'Grevenbroich' },
] as const satisfies readonly ServiceArea[];
