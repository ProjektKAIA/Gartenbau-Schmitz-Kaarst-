/**
 * Material-Katalog des Shops – einzige Quelle für Produkte, Körnungen, Gebinde und Preise.
 *
 * Kein CMS: Ergänzungen laufen über den Wartungsvertrag und werden hier eingetragen.
 * Preise in Cent, inklusive MwSt. und Lieferung. Alle Preise stehen vorerst auf 0 € (Preise folgen vom Kunden).
 * Kein Lagerbestand – Ware wird nach Bestellung beschafft und geliefert.
 */

export type ShopVariant = {
  readonly id: string;
  /** Körnung bzw. Größe, z. B. „16–32 mm". */
  readonly size: string;
  /** Lieferform, z. B. „lose" oder „70-L-Sack". */
  readonly packaging: string;
  /** Mengeneinheit, auf die sich Preis und Menge beziehen. */
  readonly unit: string;
  readonly priceCents: number;
  /** Eigenes Foto der Variante; fehlt es, zeigt die Karte das Produktfoto als „Abbildung ähnlich". */
  readonly image?: string;
};

export type ShopProduct = {
  readonly id: string;
  readonly name: string;
  readonly category: ShopCategoryId;
  readonly description: string;
  readonly image: string;
  /** Kurzer Einsatzhinweis je Körnung, erscheint unter der Auswahl. */
  readonly sizeNotes?: Readonly<Record<string, string>>;
  readonly variants: readonly [ShopVariant, ...ShopVariant[]];
};

export const shopCategories = [
  { id: 'kies', label: 'Kies & Splitt' },
  { id: 'schotter', label: 'Schotter & Kalkstein' },
  { id: 'sand-erde', label: 'Sand & Erde' },
  { id: 'rinde', label: 'Rinde & Mulch' },
  { id: 'winter', label: 'Winterdienst' },
] as const;

export type ShopCategoryId = (typeof shopCategories)[number]['id'];

/** Einheit für lose geladene Schüttgüter – hier zentral, falls auf Tonnen umgestellt wird. */
const LOOSE_UNIT = 'm³';
const SACK_UNIT = 'Sack';
const PRICE_PENDING = 0;

const img = (name: string) => `/assets/shop/${name}.webp`;

/** Lose geladene Variante. */
const loose = (id: string, size: string, image?: string): ShopVariant => ({
  id,
  size,
  packaging: 'lose',
  unit: LOOSE_UNIT,
  priceCents: PRICE_PENDING,
  ...(image ? { image } : {}),
});

/** Sackware mit Volumenangabe. */
const sack = (id: string, size: string, liters: number, image?: string): ShopVariant => ({
  id,
  size,
  packaging: `${liters}-L-Sack`,
  unit: SACK_UNIT,
  priceCents: PRICE_PENDING,
  ...(image ? { image } : {}),
});

export const shopProducts = [
  {
    id: 'kies',
    name: 'Kies',
    category: 'kies',
    description:
      'Runder Kies in natürlichen Beige-, Braun- und Grautönen. Wasser läuft gut durch – für Drainagen, Traufstreifen am Haus und als dekorative Abdeckung von Beeten und Flächen.',
    image: img('kies-16-32'),
    variants: [loose('kies-16-32', '16–32 mm', img('kies-16-32'))],
  },
  {
    id: 'splitt',
    name: 'Splitt',
    category: 'kies',
    description:
      'Fein gebrochener grauer Splitt – vor allem für den Pflaster- und Plattenbau, als Bettung unter den Steinen und zum Verfüllen der Fugen.',
    sizeNotes: {
      '2–5 mm': 'Ohne Feinanteil, wasserdurchlässig – typisch als Bettung unter Pflaster und Platten.',
      '0–5 mm': 'Brechsand-Splitt-Gemisch mit Feinanteil – hält gut in Fugen, auch als Bettung.',
    },
    image: img('splitt-2-5'),
    variants: [loose('splitt-2-5', '2–5 mm', img('splitt-2-5')), loose('splitt-0-5', '0–5 mm')],
  },
  {
    id: 'basalt',
    name: 'Basalt',
    category: 'kies',
    description:
      'Dunkelgrauer, kantig gebrochener Basalt. Gibt Steinbeeten, Hausumrandungen und Wegen einen ruhigen, dunklen Look und eignet sich auch zum Befüllen von Gabionen.',
    image: img('basalt-16-32'),
    variants: [loose('basalt-16-32', '16–32 mm', img('basalt-16-32'))],
  },
  {
    id: 'kalksteinschotter',
    name: 'Kalksteinschotter',
    category: 'schotter',
    description:
      'Gebrochener Kalkstein mit Feinanteil. Lässt sich gut verdichten und dient als Unterbau für Wege, Einfahrten, Terrassen und Pflasterflächen.',
    sizeNotes: {
      '0–22 mm': 'Feinere Mischung – für Tragschichten unter Wegen und Terrassen und zum Ausgleich.',
      '0–45 mm': 'Gröbere Mischung – für dickere untere Schichten, z. B. unter Einfahrten.',
    },
    image: img('kalksteinschotter-0-22'),
    variants: [
      loose('kalksteinschotter-0-22', '0–22 mm', img('kalksteinschotter-0-22')),
      loose('kalksteinschotter-0-45', '0–45 mm'),
    ],
  },
  {
    id: 'kalkstein',
    name: 'Kalkstein',
    category: 'schotter',
    description:
      'Heller, grau-weißer Kalksteinsplitt mit kantiger Form. Hellt Steingärten, Beete, Baumscheiben und Hausumrandungen auf und eignet sich als Deckschicht für Gartenwege.',
    image: img('kalkstein-16-22'),
    variants: [loose('kalkstein-16-22', '16–22 mm', img('kalkstein-16-22'))],
  },
  {
    id: 'sand',
    name: 'Sand',
    category: 'sand-erde',
    description:
      'Feiner Sand für viele Arbeiten im Garten: zum Verfüllen und Ausgleichen, zum Einarbeiten in schwere Böden oder zum Einkehren in schmale Fugen.',
    image: img('sand-0-2'),
    variants: [loose('sand-0-2', '0–2 mm', img('sand-0-2'))],
  },
  {
    id: 'pflanzenerde',
    name: 'Pflanzenerde',
    category: 'sand-erde',
    description:
      'Gebrauchsfertige Erde im handlichen Sack – zum Anlegen und Auffüllen von Beeten, für Hochbeete, Kübel und Neupflanzungen.',
    image: img('pflanzenerde'),
    variants: [sack('pflanzenerde-70l', 'Standard', 70, img('pflanzenerde'))],
  },
  {
    id: 'pinienrinde',
    name: 'Pinienrinde',
    category: 'rinde',
    description:
      'Rötlich-braune Pinienrinde als dekorative Beetabdeckung. Sie bremst Unkraut, schützt den Boden vor dem Austrocknen und wirkt ruhig und warm.',
    sizeNotes: {
      '0–8 mm': 'Fein – für Kübel, Töpfe und kleine Beete.',
      '7–15 mm': 'Mittel – für frisch angelegte Beete und junge Pflanzen.',
      '15–25 mm': 'Mittelgrob – vielseitige Beetabdeckung, zersetzt sich langsamer.',
      '25–45 mm': 'Grob – für große Flächen und Wege, besonders langlebig.',
    },
    image: img('pinienrinde-7-15'),
    variants: [
      loose('pinienrinde-0-8', '0–8 mm', img('pinienrinde-0-8')),
      sack('pinienrinde-0-8-sack', '0–8 mm', 70, img('pinienrinde-0-8')),
      loose('pinienrinde-7-15', '7–15 mm', img('pinienrinde-7-15')),
      sack('pinienrinde-7-15-sack', '7–15 mm', 70, img('pinienrinde-7-15')),
      loose('pinienrinde-15-25', '15–25 mm'),
      sack('pinienrinde-15-25-sack', '15–25 mm', 70),
      loose('pinienrinde-25-45', '25–45 mm', img('pinienrinde-25-45')),
      sack('pinienrinde-25-45-sack', '25–45 mm', 70, img('pinienrinde-25-45')),
    ],
  },
  {
    id: 'rindenmulch',
    name: 'Rindenmulch',
    category: 'rinde',
    description:
      'Deckt Beete und Pflanzflächen ab, bremst Unkraut, hält Feuchtigkeit im Boden und schützt ihn vor starker Sonne und Frost.',
    sizeNotes: {
      '0–20 mm': 'Fein – für kleine Beete, Kübel und Pflanzkästen; muss öfter nachgestreut werden.',
      '10–40 mm': 'Mittel – der Allrounder für Stauden- und Gehölzbeete, hält länger.',
    },
    image: img('rindenmulch-0-20'),
    variants: [
      loose('rindenmulch-0-20', '0–20 mm', img('rindenmulch-0-20')),
      sack('rindenmulch-10-40-sack', '10–40 mm', 60, img('rindenmulch-10-40')),
    ],
  },
  {
    id: 'streugranulat',
    name: 'Streugranulat ohne Tauwirkung',
    category: 'winter',
    description:
      'Streumittel, das nicht taut, sondern abstumpft: Die Körner greifen in Eis und Schnee und machen Wege griffiger – ohne Tausalz.',
    image: img('streugranulat'),
    variants: [sack('streugranulat-25l', 'Standard', 25, img('streugranulat'))],
  },
] as const satisfies readonly ShopProduct[];

export const shopTerms = {
  /**
   * Vorschau-Modus: Solange `false`, nimmt der Shop keine Online-Bestellungen an
   * (Formular ausgeblendet, API antwortet 503) – Bestellung nur per Telefon/E-Mail.
   * Erst auf `true` setzen, wenn alle Preise gesetzt und die Rechtstexte anwaltlich geprüft sind.
   */
  ordersOpen: false,
  deliveryRadiusKm: 30,
  /** Liefer- und Zahlungsbedingungen, so wie sie auf der Shop-Seite stehen. */
  items: [
    { title: 'Lieferung bis zum Haus', body: 'Im Umkreis von ca. 30 km um Kaarst, an Privatkunden.' },
    { title: 'Zahlung auf Rechnung', body: 'Sie zahlen bequem nach Lieferung per Überweisung.' },
    { title: 'Preise inkl. MwSt. & Lieferung', body: 'Keine versteckten Kosten – den Liefertermin stimmen wir mit Ihnen ab.' },
  ],
} as const;

export const shopCopy = {
  label: 'Materiallieferung',
  title: 'Kies, Schotter & Rinde – geliefert bis vor Ihr Haus.',
  intro:
    'Wählen Sie Material, Körnung und Menge und stellen Sie Ihre Bestellung zusammen. Wir bestätigen sie und stimmen den Liefertermin mit Ihnen ab – bezahlt wird auf Rechnung.',
  moreTitle: 'Ihre Anfrage ist hier nicht aufgeführt?',
  moreBody: 'Wir bieten vieles mehr an – kontaktieren Sie uns direkt.',
  /** Wortlaut nach § 312j Abs. 3 BGB – nicht ändern ohne rechtliche Prüfung. */
  submitLabel: 'zahlungspflichtig bestellen',
  submitHint:
    'Sie erhalten sofort eine Eingangsbestätigung per E-Mail. Der Vertrag kommt mit unserer Annahme per E-Mail oder Telefon zustande.',
  previewTitle: 'Online-Bestellung startet in Kürze',
  previewBody:
    'Die Preise werden gerade festgelegt. Bis dahin nehmen wir Ihre Bestellung gern telefonisch oder per E-Mail auf – Ihre Liste übernehmen wir in die E-Mail.',
  sentMessage:
    'Vielen Dank! Ihre Bestellung ist bei uns eingegangen. Die Eingangsbestätigung ist per E-Mail unterwegs – wir melden uns zur Annahme und zum Liefertermin.',
} as const;
