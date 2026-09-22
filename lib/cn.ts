/** Klassen zusammenfügen und Falsy-Werte verwerfen. */
export const cn = (...classes: ReadonlyArray<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
