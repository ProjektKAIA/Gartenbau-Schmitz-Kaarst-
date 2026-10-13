import { describe, expect, it } from 'vitest';
import { createRateLimiter, MAX_TRACKED_KEYS } from './rate-limit';

describe('createRateLimiter', () => {
  it('lässt bis zum Limit durch und sperrt danach je Schlüssel', () => {
    const allow = createRateLimiter(2, 1000);
    expect(allow('a', 0)).toBe(true);
    expect(allow('a', 10)).toBe(true);
    expect(allow('a', 20)).toBe(false);
    expect(allow('b', 20)).toBe(true);
  });

  it('gibt nach Ablauf des Fensters wieder frei', () => {
    const allow = createRateLimiter(1, 1000);
    expect(allow('a', 0)).toBe(true);
    expect(allow('a', 999)).toBe(false);
    expect(allow('a', 1000)).toBe(true);
  });

  it('merkt sich nicht unbegrenzt viele Schlüssel (gefälschte IPs)', () => {
    const allow = createRateLimiter(1, 1000);
    for (let i = 0; i < MAX_TRACKED_KEYS + 50; i += 1) allow(`ip-${i}`, 0);
    // Abgelaufene Einträge werden verworfen, ein neuer Schlüssel kommt weiter durch.
    expect(allow('neu', 2000)).toBe(true);
    // Aktive Sperre bleibt für einen kürzlich gesehenen Schlüssel erhalten.
    expect(allow('neu', 2001)).toBe(false);
  });
});
