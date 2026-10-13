/**
 * Reine Geo-Helfer für die lokalen Landingpages: Entfernung und Himmelsrichtung
 * zwischen zwei Punkten. Ohne I/O, damit Liefergebiet und Anfahrtsangaben testbar sind.
 */

export type GeoPoint = {
  readonly latitude: number;
  readonly longitude: number;
};

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** Luftlinie in Kilometern (Haversine-Formel). */
export function distanceKm(from: GeoPoint, to: GeoPoint): number {
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/** Acht Himmelsrichtungen im Uhrzeigersinn, beginnend bei Nord. */
const COMPASS = [
  'nördlich',
  'nordöstlich',
  'östlich',
  'südöstlich',
  'südlich',
  'südwestlich',
  'westlich',
  'nordwestlich',
] as const;

export type CompassDirection = (typeof COMPASS)[number];

/** Anfangskurs von `from` nach `to` in Grad (0 = Nord, 90 = Ost). */
export function bearingDegrees(from: GeoPoint, to: GeoPoint): number {
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  const degrees = (Math.atan2(y, x) * 180) / Math.PI;
  return (degrees + 360) % 360;
}

/** Himmelsrichtung, in der `to` von `from` aus liegt – z. B. „südöstlich". */
export function compassDirection(from: GeoPoint, to: GeoPoint): CompassDirection {
  const sector = Math.round(bearingDegrees(from, to) / 45) % COMPASS.length;
  const direction = COMPASS[sector];
  // Mit noUncheckedIndexedAccess ist der Index typseitig optional; sector liegt immer in 0..7.
  if (direction === undefined) throw new RangeError(`Ungültiger Sektor: ${sector}`);
  return direction;
}
