/**
 * Einfaches Sliding-Window-Limit im Speicher einer Funktionsinstanz.
 * Schützt vor versehentlichem Mehrfachsenden und naiven Bots – kein Ersatz für ein
 * plattformweites Limit (Vercel Firewall), weil jede Instanz ihren eigenen Zähler hat.
 */
/** Obergrenze der gemerkten Schlüssel je Instanz – gefälschte IPs lassen den Speicher nicht wachsen. */
export const MAX_TRACKED_KEYS = 10_000;

export const createRateLimiter = (limit: number, windowMs: number) => {
  const hits = new Map<string, number[]>();

  const prune = (now: number) => {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(key);
    }
    // Immer noch zu viele (Flut aktiver Schlüssel): die ältesten Einträge verwerfen.
    for (const key of hits.keys()) {
      if (hits.size < MAX_TRACKED_KEYS) break;
      hits.delete(key);
    }
  };

  return (key: string, now: number = Date.now()): boolean => {
    if (!hits.has(key) && hits.size >= MAX_TRACKED_KEYS) prune(now);
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
