import type { MetadataRoute } from 'next';

/*
 * Bewusst ohne weitere Imports: Inhalte (Navigation) und SEO-Modul nutzen die Pfade gemeinsam,
 * ohne dass ein Zirkelbezug entsteht.
 */

export type SitemapSettings = Pick<MetadataRoute.Sitemap[number], 'changeFrequency' | 'priority'>;

export type IndexableRoute = SitemapSettings & { readonly path: `/${string}` };

/**
 * Alle festen, indexierbaren Routen. Neue Seite → hier eintragen, dann landet sie in der Sitemap.
 * Nicht indexiert (und deshalb nicht hier): /vertrag-widerrufen (Formular), /api/*.
 */
export const routes = {
  home: { path: '/', changeFrequency: 'monthly', priority: 1 },
  services: { path: '/leistungen', changeFrequency: 'monthly', priority: 0.9 },
  about: { path: '/ueber-uns', changeFrequency: 'yearly', priority: 0.6 },
  projects: { path: '/projekte', changeFrequency: 'monthly', priority: 0.7 },
  process: { path: '/ablauf', changeFrequency: 'yearly', priority: 0.6 },
  career: { path: '/karriere', changeFrequency: 'monthly', priority: 0.5 },
  careerApply: { path: '/karriere/bewerben', changeFrequency: 'yearly', priority: 0.3 },
  contact: { path: '/kontakt', changeFrequency: 'yearly', priority: 0.8 },
  shop: { path: '/shop', changeFrequency: 'weekly', priority: 0.8 },
  imprint: { path: '/impressum', changeFrequency: 'yearly', priority: 0.2 },
  privacy: { path: '/datenschutz', changeFrequency: 'yearly', priority: 0.2 },
  terms: { path: '/agb', changeFrequency: 'yearly', priority: 0.2 },
  withdrawal: { path: '/widerruf', changeFrequency: 'yearly', priority: 0.2 },
} as const satisfies Record<string, IndexableRoute>;
