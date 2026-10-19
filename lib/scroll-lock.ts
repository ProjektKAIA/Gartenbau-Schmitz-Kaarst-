/**
 * Sperrt das Scrollen der Seite hinter Overlays (Warenkorb, Produktdetails).
 * Einzige Stelle dafür – gibt die Funktion zum Aufheben zurück, die den vorherigen Zustand wiederherstellt.
 */
export function lockPageScroll(): () => void {
  const root = document.documentElement;
  const previous = root.style.overflow;
  root.style.overflow = 'hidden';
  return () => {
    root.style.overflow = previous;
  };
}
