import { describe, expect, it } from 'vitest';
import { bearingDegrees, compassDirection, distanceKm } from './geo';

const origin = { latitude: 51.23, longitude: 6.62 };

describe('distanceKm', () => {
  it('ist 0 für denselben Punkt', () => {
    expect(distanceKm(origin, origin)).toBe(0);
  });

  it('misst einen Breitengrad mit ca. 111 km', () => {
    expect(distanceKm({ latitude: 51, longitude: 6 }, { latitude: 52, longitude: 6 })).toBeCloseTo(111.2, 0);
  });

  it('ist symmetrisch', () => {
    const neuss = { latitude: 51.2, longitude: 6.69 };
    expect(distanceKm(origin, neuss)).toBeCloseTo(distanceKm(neuss, origin), 10);
  });
});

describe('compassDirection', () => {
  it.each([
    [{ latitude: 52, longitude: 6.62 }, 'nördlich'],
    [{ latitude: 51.23, longitude: 7.5 }, 'östlich'],
    [{ latitude: 50.5, longitude: 6.62 }, 'südlich'],
    [{ latitude: 51.23, longitude: 5.8 }, 'westlich'],
    [{ latitude: 51.2, longitude: 6.69 }, 'südöstlich'],
    [{ latitude: 51.26, longitude: 6.55 }, 'nordwestlich'],
  ] as const)('ordnet %o als %s ein', (target, expected) => {
    expect(compassDirection(origin, target)).toBe(expected);
  });

  it('liefert Kurse im Bereich 0–360°', () => {
    const bearing = bearingDegrees(origin, { latitude: 51.23, longitude: 5.8 });
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
  });
});
