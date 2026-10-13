/**
 * Einfaches Sliding-Window-Limit im Speicher einer Funktionsinstanz.
 * Schützt vor versehentlichem Mehrfachsenden und naiven Bots – kein Ersatz für ein
 * plattformweites Limit (Vercel Firewall), weil jede Instanz ihren eigenen Zähler hat.
 */
export const createRateLimiter = (limit: number, windowMs: number) => {
  const hits = new Map<string, number[]>();

  return (key: string, now: number = Date.now()): boolean => {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    return true;
  };
};
