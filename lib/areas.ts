/**
 * Reine Ableitungen aus den Einsatzgebieten (content/areas.ts):
 * Suche per Slug, Lage relativ zum Betrieb und Zugehörigkeit zum Liefergebiet des Shops.
 */

import { serviceAreas, type ServiceArea } from '@/content/areas';
import { shopTerms } from '@/content/shop';
import { compassDirection, distanceKm, type CompassDirection, type GeoPoint } from '@/lib/geo';
import { site } from '@/lib/site';

export type AreaLocation =
  | { readonly kind: 'home' }
  | { readonly kind: 'nearby'; readonly distanceKm: number; readonly direction: CompassDirection };

/** Unterhalb dieser Luftlinie gilt ein Ort als Betriebssitz (Rundungsrauschen der Koordinaten). */
const HOME_THRESHOLD_KM = 1;

export function findArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

/** Lage eines Orts relativ zum Betrieb; Entfernung auf ganze Kilometer gerundet. */
export function areaLocation(center: GeoPoint, origin: GeoPoint = site.geo): AreaLocation {
  const km = distanceKm(origin, center);
  if (km < HOME_THRESHOLD_KM) return { kind: 'home' };
  return { kind: 'nearby', distanceKm: Math.round(km), direction: compassDirection(origin, center) };
}

/** Liegt die Ortsmitte im Liefergebiet des Shops (Luftlinie um den Betrieb)? */
export function isInDeliveryArea(
  center: GeoPoint,
  radiusKm: number = shopTerms.deliveryRadiusKm,
  origin: GeoPoint = site.geo,
): boolean {
  return distanceKm(origin, center) <= radiusKm;
}

/** Alle anderen Einsatzgebiete – für die Querverlinkung zwischen den Ortsseiten. */
export function otherAreas(slug: string): readonly ServiceArea[] {
  return serviceAreas.filter((area) => area.slug !== slug);
}
