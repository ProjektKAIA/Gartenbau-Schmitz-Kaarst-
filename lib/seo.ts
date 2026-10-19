/**
 * SEO-Grundlagen – einzige Quelle für Routenliste (Sitemap), Seiten-Metadaten,
 * Geo-Meta-Tags und strukturierte Daten (JSON-LD).
 * Reine Funktionen ohne I/O; die Darstellung übernimmt components/seo/JsonLd.tsx.
 */

import type { Metadata, MetadataRoute } from 'next';
import { serviceAreas, type AreaFaq } from '@/content/areas';
import { extras, services } from '@/content/home';
import { site } from '@/lib/site';
import { routes, type SitemapSettings } from './routes';

/* ------------------------------------------------------------------ URLs & Titel */

/** Absolute URL auf der kanonischen Domain. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Title-Template des Layouts – `fullTitle` nutzt dasselbe, damit OG- und HTML-Titel gleich sind. */
export const titleTemplate = `%s | ${site.name}`;

export function fullTitle(title: string): string {
  return titleTemplate.replace('%s', title);
}

export const homeTitle = `${site.name} – Garten- und Landschaftsbau in Kaarst, Neuss & Umgebung`;

export const homeDescription =
  'Gartenbau Kaarst: Garten- und Landschaftsbau von Matthias Schmitz – Gartengestaltung, Pflaster- und Terrassenbau, Gartenpflege und Winterdienst für Kaarst, Neuss und Umgebung.';

/** Teilen-Bild für Open Graph/Twitter, solange es kein eigenes OG-Motiv gibt. */
export const defaultShareImage = {
  url: '/assets/hero.webp',
  width: 1672,
  height: 941,
  alt: 'Gepflegter Garten mit Natursteinwegen – Gartenbau Kaarst',
} as const;

/* ------------------------------------------------------------------ Routen */

export { routes, type IndexableRoute, type SitemapSettings } from './routes';

/** Pfad der lokalen Landingpage eines Orts – einzige Stelle, die das URL-Schema kennt. */
export function areaPath(slug: string): `/gartenbau/${string}` {
  return `/gartenbau/${slug}`;
}

const areaSitemapSettings = { changeFrequency: 'monthly', priority: 0.8 } as const satisfies SitemapSettings;

/** Sitemap-Einträge: feste Routen plus eine Landingpage je Einsatzgebiet. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const fixed = Object.values(routes).map(({ path, ...settings }) => ({ url: absoluteUrl(path), ...settings }));
  const areas = serviceAreas.map((area) => ({ url: absoluteUrl(areaPath(area.slug)), ...areaSitemapSettings }));
  return [...fixed, ...areas];
}

/* ------------------------------------------------------------------ Metadaten */

type PageMetadataInput = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  /** true: Titel ohne Markenzusatz aus dem Template (Startseite). */
  readonly absoluteTitle?: boolean;
};

/**
 * Metadaten einer Seite inkl. Canonical, Open Graph und Twitter.
 * Next ersetzt `openGraph`/`twitter` des Layouts komplett, sobald eine Seite sie setzt –
 * deshalb baut diese Funktion sie vollständig (inkl. Bild) und nicht nur teilweise.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataInput): Metadata {
  const shareTitle = absoluteTitle ? title : fullTitle(title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: site.name,
      url: path,
      title: shareTitle,
      description,
      images: [defaultShareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [defaultShareImage.url],
    },
  };
}

/** Geo-Meta-Tags (regionale Zuordnung) aus den Stammdaten. */
export function geoMeta(): Record<string, string> {
  const { latitude, longitude } = site.geo;
  return {
    'geo.region': site.address.regionCode,
    'geo.placename': site.address.city,
    'geo.position': `${latitude};${longitude}`,
    ICBM: `${latitude}, ${longitude}`,
  };
}

/* ------------------------------------------------------------------ JSON-LD */

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue };

export type JsonLdObject = { readonly [key: string]: JsonLdValue };

/**
 * Serialisiert JSON-LD für ein <script>-Tag. `<`, `>` und `&` werden als Unicode-Escape
 * geschrieben, damit kein Inhalt das Script-Tag schließen kann (`</script>`-Injection);
 * U+2028/U+2029 sind in JSON gültig, in JavaScript-Kontexten aber Zeilenumbrüche.
 */
export function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

const SCHEMA = 'https://schema.org';

/** Stabile Kennung des Betriebs, damit andere Knoten darauf verweisen können. */
export const businessId = `${site.url}/#business`;

/** E.164-Telefonnummer, abgeleitet aus dem tel:-Link der Stammdaten. */
const telephone = site.contact.phoneHref.replace(/^tel:/, '');

/** Fachgebiete aus den Leistungstexten der Startseite – keine zweite Liste pflegen. */
function knowsAbout(): string[] {
  const serviceItems = services.items.flatMap((service) => service.items);
  const extraItems = extras.items.map((item) => item.title);
  return [...new Set(['Garten- und Landschaftsbau', ...serviceItems, ...extraItems])];
}

/**
 * Betriebsdaten als LocalBusiness. Bewusst ohne Öffnungszeiten, Preise und Bewertungen –
 * dafür gibt es keine belastbare Quelle, und erfundene Angaben verstoßen gegen die
 * Richtlinien für strukturierte Daten.
 */
export function localBusinessJsonLd(): JsonLdObject {
  return {
    '@context': SCHEMA,
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    additionalType: 'https://de.wikipedia.org/wiki/Garten-_und_Landschaftsbau',
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.claim,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/logo.png'),
    image: absoluteUrl(defaultShareImage.url),
    telephone,
    email: site.contact.email,
    vatID: site.vatId,
    foundingDate: String(site.foundedYear),
    founder: { '@type': 'Person', name: site.owner, jobTitle: site.qualification },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: 'NRW',
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.city,
      containedInPlace: { '@type': 'AdministrativeArea', name: area.county },
    })),
    sameAs: Object.values(site.social),
    knowsAbout: knowsAbout(),
  };
}

export type BreadcrumbItem = { readonly name: string; readonly path: string };

/** Seitenpfad ab der Startseite. Einzige Stelle für den Namen der Startseite im Pfad. */
export function breadcrumbTrail(...items: readonly BreadcrumbItem[]): readonly BreadcrumbItem[] {
  return [{ name: 'Startseite', path: routes.home.path }, ...items];
}

/** Seitenpfad einer Unterseite der ersten Ebene: Startseite → Seite. */
export function pageBreadcrumbs(name: string, path: string): readonly BreadcrumbItem[] {
  return breadcrumbTrail({ name, path });
}

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': SCHEMA,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(faqs: readonly AreaFaq[]): JsonLdObject {
  return {
    '@context': SCHEMA,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
