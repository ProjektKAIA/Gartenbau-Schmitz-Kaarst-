import { describe, expect, it } from 'vitest';
import { createRateLimiter } from './rate-limit';

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
});
