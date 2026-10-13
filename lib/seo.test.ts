import { describe, expect, it } from 'vitest';
import { serviceAreas } from '@/content/areas';
import { site } from '@/lib/site';
import {
  absoluteUrl,
  areaPath,
  breadcrumbJsonLd,
  buildSitemap,
  faqPageJsonLd,
  fullTitle,
  geoMeta,
  localBusinessJsonLd,
  pageMetadata,
  routes,
  serializeJsonLd,
} from './seo';

describe('absoluteUrl / fullTitle', () => {
  it('baut URLs auf der kanonischen Domain', () => {
    expect(absoluteUrl('/')).toBe(`${site.url}/`);
    expect(absoluteUrl('/gartenbau/neuss')).toBe(`${site.url}/gartenbau/neuss`);
  });

  it('hängt den Markennamen wie das Layout-Template an', () => {
    expect(fullTitle('Impressum')).toBe(`Impressum | ${site.name}`);
  });
});

describe('buildSitemap', () => {
  const sitemap = buildSitemap();
  const urls = sitemap.map((entry) => entry.url);

  it('enthält alle festen Routen und alle Orte genau einmal', () => {
    expect(sitemap).toHaveLength(Object.keys(routes).length + serviceAreas.length);
    expect(new Set(urls).size).toBe(urls.length);
    for (const area of serviceAreas) expect(urls).toContain(absoluteUrl(areaPath(area.slug)));
    expect(urls).toContain(absoluteUrl('/shop'));
  });

  it('enthält keine Formular- oder API-Routen', () => {
    expect(urls.some((url) => url.includes('/vertrag-widerrufen') || url.includes('/api/'))).toBe(false);
  });

  it('nutzt gültige Prioritäten mit der Startseite ganz oben', () => {
    for (const entry of sitemap) {
      expect(entry.priority).toBeGreaterThan(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    }
    expect(sitemap.find((entry) => entry.url === absoluteUrl('/'))?.priority).toBe(1);
  });
});

describe('pageMetadata', () => {
  it('setzt Canonical, Open Graph inkl. Bild und Twitter-Card', () => {
    const metadata = pageMetadata({ title: 'Gartenbau Neuss', description: 'Text', path: '/gartenbau/neuss' });
    expect(metadata.title).toBe('Gartenbau Neuss');
    expect(metadata.alternates?.canonical).toBe('/gartenbau/neuss');
    expect(metadata.openGraph).toMatchObject({
      url: '/gartenbau/neuss',
      title: fullTitle('Gartenbau Neuss'),
      locale: 'de_DE',
      siteName: site.name,
    });
    expect(metadata.openGraph?.images).toBeDefined();
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('nutzt auf Wunsch einen absoluten Titel ohne Template', () => {
    const metadata = pageMetadata({ title: 'Start', description: 'Text', path: '/', absoluteTitle: true });
    expect(metadata.title).toEqual({ absolute: 'Start' });
    expect(metadata.openGraph?.title).toBe('Start');
  });
});

describe('geoMeta', () => {
  it('liefert Region, Ort und Koordinaten aus den Stammdaten', () => {
    expect(geoMeta()).toEqual({
      'geo.region': 'DE-NW',
      'geo.placename': 'Kaarst',
      'geo.position': `${site.geo.latitude};${site.geo.longitude}`,
      ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
    });
  });
});

describe('serializeJsonLd', () => {
  it('escaped Zeichen, die das Script-Tag verlassen könnten', () => {
    const output = serializeJsonLd({ name: '</script><script>alert(1)</script> & \u2028' });
    expect(output).not.toContain('<');
    expect(output).not.toContain('>');
    expect(output).not.toContain('&');
    expect(output).not.toContain('\u2028');
    expect(JSON.parse(output)).toEqual({ name: '</script><script>alert(1)</script> & \u2028' });
  });
});

describe('localBusinessJsonLd', () => {
  const business = localBusinessJsonLd();

  it('beschreibt den Betrieb aus den Stammdaten', () => {
    expect(business).toMatchObject({
      '@type': 'HomeAndConstructionBusiness',
      name: site.name,
      telephone: '+491772770274',
      email: site.contact.email,
      foundingDate: '2015',
      founder: { name: site.owner },
      address: { postalCode: site.address.postalCode, addressLocality: 'Kaarst', addressCountry: 'DE' },
      sameAs: [site.social.instagram, site.social.facebook],
    });
  });

  it('nennt jedes Einsatzgebiet als areaServed', () => {
    const served = business.areaServed;
    expect(Array.isArray(served) ? served.length : 0).toBe(serviceAreas.length);
  });

  it('enthält keine erfundenen Bewertungen, Öffnungszeiten oder Preise', () => {
    for (const key of ['aggregateRating', 'review', 'openingHours', 'openingHoursSpecification', 'priceRange']) {
      expect(business).not.toHaveProperty(key);
    }
  });
});

describe('breadcrumbJsonLd / faqPageJsonLd', () => {
  it('nummeriert Breadcrumbs ab 1 mit absoluten URLs', () => {
    const crumbs = breadcrumbJsonLd([
      { name: 'Startseite', path: '/' },
      { name: 'Gartenbau Neuss', path: '/gartenbau/neuss' },
    ]);
    expect(crumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Gartenbau Neuss', item: `${site.url}/gartenbau/neuss` },
    ]);
  });

  it('bildet FAQ als Question/Answer ab', () => {
    const faq = faqPageJsonLd([{ question: 'Frage?', answer: 'Antwort.' }]);
    expect(faq).toMatchObject({
      '@type': 'FAQPage',
      mainEntity: [{ '@type': 'Question', name: 'Frage?', acceptedAnswer: { '@type': 'Answer', text: 'Antwort.' } }],
    });
  });
});
