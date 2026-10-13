import type { MetadataRoute } from 'next';
import { buildSitemap } from '@/lib/seo';

/** /sitemap.xml – Routenliste und Gewichtung leben in lib/seo.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
