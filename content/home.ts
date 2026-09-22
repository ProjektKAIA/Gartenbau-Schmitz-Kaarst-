/**
 * Inhalte der Startseite – zweiter Entwurf.
 * Alle Texte liegen hier, damit Komponenten reine Darstellung bleiben.
 */

export const nav = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Karriere', href: '#karriere' },
] as const;

export const hero = {
  eyebrow: 'Garten- & Landschaftsbau aus Kaarst',
  titleFirst: 'Gärten,',
  titleSecond: 'die bleiben.',
  text: 'Wir gestalten, bauen und pflegen Außenbereiche mit einem Blick für das Ganze – präzise geplant, zuverlässig umgesetzt und dauerhaft schön.',
  primaryCta: 'Projekt besprechen',
  secondaryCta: 'Leistungen ansehen',
  facts: [
    { title: 'Seit 2015', text: 'regional verwurzelt' },
    { title: 'Seit 2020', text: 'Ausbildungsbetrieb' },
    { title: 'Privat · Gewerbe', text: 'und Hausverwaltungen' },
  ],
} as const;

export const intro = {
  number: '01',
  label: 'Unsere Haltung',
  titleLead: 'Aus Ideen werden ',
  titleAccent: 'echte Außenräume.',
  body: 'Ein Garten soll nicht nur gut aussehen. Er soll zu seinem Ort passen, im Alltag funktionieren und lange Freude machen. Deshalb denken wir Gestaltung, Ausführung und Pflege von Anfang an zusammen.',
} as const;

export type ServiceIcon = 'leaf' | 'paver' | 'shear';

export type Service = {
  readonly index: string;
  readonly icon: ServiceIcon;
  readonly title: string;
  readonly body: string;
  readonly items: readonly string[];
  readonly cta: string;
  readonly dark: boolean;
};

export const services = {
  label: 'Leistungen',
  titleFirst: 'Drei Bereiche.',
  titleSecond: 'Ein stimmiges Ergebnis.',
  intro:
    'Vom ersten Entwurf bis zur dauerhaften Pflege: Wir begleiten Gartenprojekte durchgängig und mit einem festen Ansprechpartner.',
  items: [
    {
      index: '01',
      icon: 'leaf',
      title: 'Gestalten',
      body: 'Wir entwickeln Außenbereiche, die Architektur, Grundstück und persönliche Wünsche sinnvoll verbinden.',
      items: ['Beratung & Planung', 'Neu- und Umgestaltung', 'Rasen, Beete & Pflanzung'],
      cta: 'Projekt planen',
      dark: false,
    },
    {
      index: '02',
      icon: 'paver',
      title: 'Bauen',
      body: 'Saubere Linien, passende Materialien und ein tragfähiger Aufbau schaffen Flächen, die dauerhaft funktionieren.',
      items: ['Terrassen & Gartenwege', 'Pflaster- & Naturstein', 'Einfahrten, Einfassungen & Zäune'],
      cta: 'Bauvorhaben anfragen',
      dark: true,
    },
    {
      index: '03',
      icon: 'shear',
      title: 'Pflegen',
      body: 'Damit ein Garten seinen Charakter behält, kümmern wir uns fachgerecht um Grünflächen, Gehölze und Saisonarbeiten.',
      items: ['Garten- & Grünflächenpflege', 'Hecken-, Strauch- & Baumschnitt', 'Einmalig oder regelmäßig'],
      cta: 'Pflege besprechen',
      dark: false,
    },
  ] as const satisfies readonly Service[],
} as const;

export const project = {
  label: 'Ausgewähltes Projekt',
  titleFirst: 'Garten und Wege',
  titleSecond: 'als eine Einheit',
  cta: 'Ähnliches Projekt anfragen',
  imageAlt: 'Moderner Garten mit Natursteinwegen und gepflegten Grünflächen',
  draftNote: 'Entwurfsbild – wird später durch ein echtes Kundenprojekt ersetzt.',
} as const;

export const extras = {
  label: 'Technik & Service',
  title: 'Damit draußen alles läuft.',
  body: 'Durchdachte Technik und zuverlässige Zusatzleistungen machen die Außenanlage im Alltag einfacher und sicherer.',
  items: [
    { number: '01', title: 'Bewässerungssysteme', text: 'Planung, Installation & Wartung' },
    { number: '02', title: 'Mähroboter', text: 'Einrichtung, Kabel & Service' },
    { number: '03', title: 'Winterdienst', text: 'Für sichere Wege und Flächen' },
    { number: '04', title: 'Sturmschäden', text: 'Schnelle Hilfe und Wiederherstellung' },
  ],
} as const;

export const process = {
  label: 'Unser Weg',
  titleFirst: 'Klar geplant.',
  titleSecond: 'Sauber umgesetzt.',
  intro:
    'Vier nachvollziehbare Schritte sorgen dafür, dass aus Ihrer Vorstellung ein Garten wird, der wirklich zu Ihnen passt.',
  steps: [
    {
      number: '01',
      title: 'Beratung',
      body: 'Wir hören zu, sehen uns die Gegebenheiten vor Ort an und klären die wichtigsten Wünsche.',
    },
    {
      number: '02',
      title: 'Planung',
      body: 'Wir entwickeln den Ablauf, wählen passende Materialien und machen Ihre Ideen konkret.',
    },
    {
      number: '03',
      title: 'Ausführung',
      body: 'Unser Team setzt die Planung präzise um und hält Sie über den Fortschritt auf dem Laufenden.',
    },
    {
      number: '04',
      title: 'Pflege',
      body: 'Auf Wunsch sorgen wir auch langfristig dafür, dass Ihr Garten schön und gesund bleibt.',
    },
  ],
} as const;

export const about = {
  label: 'Über uns',
  titleFirst: 'Handwerk mit Haltung.',
  titleSecond: 'Direkt aus Kaarst.',
  body: 'Matthias Schmitz gründete das Unternehmen 2015. Heute arbeitet das Team für private Auftraggeber, Gewerbekunden und Hausverwaltungen – mit festen Abläufen, regionalen Partnern und einem hohen Anspruch an Qualität und Zuverlässigkeit.',
  facts: [
    { value: '2015', label: 'gegründet' },
    { value: '2020', label: 'Ausbildungsbetrieb' },
    { value: 'Kaarst', label: 'regional verbunden' },
  ],
  cta: 'Gartenbau Kaarst kennenlernen',
} as const;

export const career = {
  label: 'Karriere',
  title: 'Gute Arbeit entsteht im Team.',
  body: 'Du bist Landschaftsgärtner/in und möchtest abwechslungsreiche Projekte in einem motivierten Team umsetzen?',
  cta: 'Jetzt bewerben',
} as const;

export const contact = {
  label: 'Ihr Projekt',
  title: 'Lassen Sie uns über Ihren Garten sprechen.',
  body: 'Schildern Sie uns kurz, was Sie planen. Wir melden uns persönlich und besprechen die nächsten sinnvollen Schritte.',
  cta: 'Projektanfrage senden',
} as const;
