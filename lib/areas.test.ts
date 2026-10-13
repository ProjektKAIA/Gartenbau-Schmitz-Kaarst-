import { describe, expect, it } from 'vitest';
import { serviceAreas } from '@/content/areas';
import { site } from '@/lib/site';
import { areaLocation, findArea, isInDeliveryArea, otherAreas } from './areas';

describe('serviceAreas (Datenqualität)', () => {
  it('hat eindeutige, URL-taugliche Slugs', () => {
    const slugs = serviceAreas.map((area) => area.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it('hat je Ort eigene Texte – keine Doorway-Kopien', () => {
    for (const key of ['metaTitle', 'metaDescription', 'headline', 'lead', 'localBody'] as const) {
      const values = serviceAreas.map((area) => area[key]);
      expect(new Set(values).size, key).toBe(values.length);
    }
    const questions = serviceAreas.flatMap((area) => area.faqs.map((faq) => faq.question));
    expect(new Set(questions).size).toBe(questions.length);
  });

  it('hält 3–5 FAQ und Meta-Längen ein', () => {
    for (const area of serviceAreas) {
      expect(area.faqs.length).toBeGreaterThanOrEqual(3);
      expect(area.faqs.length).toBeLessThanOrEqual(5);
      expect(area.metaDescription.length, area.slug).toBeLessThanOrEqual(200);
      expect(area.metaTitle).toContain(area.city);
    }
  });
});

describe('findArea / otherAreas', () => {
  it('findet Orte per Slug und liefert undefined für Unbekanntes', () => {
    expect(findArea('meerbusch')?.city).toBe('Meerbusch');
    expect(findArea('duesseldorf')).toBeUndefined();
  });

  it('liefert alle Orte außer dem aktuellen', () => {
    const others = otherAreas('neuss');
    expect(others).toHaveLength(serviceAreas.length - 1);
    expect(others.some((area) => area.slug === 'neuss')).toBe(false);
  });
});

describe('areaLocation', () => {
  it('erkennt den Betriebssitz', () => {
    expect(areaLocation(site.geo)).toEqual({ kind: 'home' });
  });

  it('liefert gerundete Entfernung und Richtung', () => {
    expect(areaLocation({ latitude: 51.2, longitude: 6.69 })).toEqual({
      kind: 'nearby',
      distanceKm: 6,
      direction: 'südöstlich',
    });
  });
});

describe('isInDeliveryArea', () => {
  it('prüft gegen den Radius (Grenze inklusive)', () => {
    const north = { latitude: site.geo.latitude + 0.2, longitude: site.geo.longitude }; // ~22 km
    expect(isInDeliveryArea(north, 30)).toBe(true);
    expect(isInDeliveryArea(north, 20)).toBe(false);
  });
});
