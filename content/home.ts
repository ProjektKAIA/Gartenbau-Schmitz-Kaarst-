/**
 * Inhalte der Startseite – Entwurf „Variante B".
 * Alle Texte liegen hier, damit Komponenten reine Darstellung bleiben.
 */

export const nav = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Arbeitsweise', href: '#ablauf' },
  { label: 'Unternehmen', href: '#unternehmen' },
] as const;

export const hero = {
  eyebrow: 'Garten- & Landschaftsbau aus Kaarst',
  titleLine: 'Außenräume',
  titleAccent: 'mit Charakter.',
  intro:
    'Individuell geplant, fachgerecht gebaut und zuverlässig gepflegt – für Gärten, Wege und Außenanlagen, die dauerhaft funktionieren.',
  primaryCta: 'Kostenloses Erstgespräch',
  secondaryCta: 'Unsere Leistungen',
  pillars: [
    { number: '01', label: 'Gestalten' },
    { number: '02', label: 'Bauen' },
    { number: '03', label: 'Pflegen' },
  ],
} as const;

export const statement = {
  label: 'Unser Anspruch',
  titleLead: 'Ein Garten entsteht nicht aus einzelnen Arbeiten – sondern aus einem ',
  titleAccent: 'stimmigen Ganzen.',
  body: 'Wir verbinden natürliche Gestaltung mit sauberem Handwerk. So entstehen Außenbereiche, die zum Grundstück passen, im Alltag überzeugen und sich auch nach Jahren richtig anfühlen.',
} as const;

export type ServiceTone = 'plan' | 'build' | 'care';

export type Service = {
  readonly number: string;
  readonly kicker: string;
  readonly title: string;
  readonly body: string;
  readonly tags: readonly string[];
  readonly tone: ServiceTone;
};

export const services = {
  label: 'Leistungen',
  title: 'Von der Idee bis zum gepflegten Garten.',
  intro:
    'Alle Arbeitsbereiche greifen ineinander. Sie entscheiden, ob wir ein einzelnes Vorhaben übernehmen oder Ihr Projekt vollständig begleiten.',
  cta: 'Vor-Ort-Termin anfragen',
  items: [
    {
      number: '01',
      kicker: 'Planung & Natur',
      title: 'Gestalten',
      body: 'Aus Grundstück, Architektur und persönlichen Vorstellungen entsteht ein schlüssiges Gartenkonzept.',
      tags: ['Beratung', 'Planung', 'Pflanzung', 'Rasen'],
      tone: 'plan',
    },
    {
      number: '02',
      kicker: 'Stein & Konstruktion',
      title: 'Bauen',
      body: 'Wir schaffen langlebige Wege und Flächen mit passendem Material, präziser Ausführung und einem sicheren Aufbau.',
      tags: ['Terrassen', 'Pflaster', 'Einfahrten', 'Zäune'],
      tone: 'build',
    },
    {
      number: '03',
      kicker: 'Erhalt & Entwicklung',
      title: 'Pflegen',
      body: 'Fachgerechte Pflege erhält die Struktur des Gartens und lässt Pflanzen gesund weiterwachsen.',
      tags: ['Grünpflege', 'Hecken', 'Bäume', 'Saisonarbeiten'],
      tone: 'care',
    },
  ] as const satisfies readonly Service[],
} as const;

export const project = {
  label: 'Ausgewähltes Projekt',
  titleFirst: 'Klare Wege.',
  titleSecond: 'Lebendiges Grün.',
  body: 'Wenn Linienführung, Material und Bepflanzung zusammenspielen, wirkt ein Garten ruhig und selbstverständlich.',
  cta: 'Ähnliches Projekt anfragen',
  imageAlt: 'Moderner Garten mit Natursteinflächen und gepflegtem Grün',
  draftNote: 'Entwurfsbilder – später durch ein echtes Vorher-/Nachher-Projekt ersetzen.',
} as const;

export const process = {
  label: 'Arbeitsweise',
  title: 'Ein klarer Weg zum neuen Garten.',
  steps: [
    {
      number: '01',
      title: 'Verstehen',
      body: 'Wir sehen uns Ihr Grundstück an und sprechen über Wünsche, Nutzung und Möglichkeiten.',
    },
    {
      number: '02',
      title: 'Planen',
      body: 'Materialien, Pflanzen, Abläufe und Kosten werden zu einem nachvollziehbaren Konzept.',
    },
    {
      number: '03',
      title: 'Umsetzen',
      body: 'Unser Team koordiniert die Arbeiten und hält Sie während der Ausführung auf dem Laufenden.',
    },
    {
      number: '04',
      title: 'Erhalten',
      body: 'Auf Wunsch begleiten wir den Garten weiter – einmalig, regelmäßig oder ganzjährig.',
    },
  ],
} as const;

export const company = {
  label: 'Unternehmen',
  title: 'Persönlich geführt. Regional verbunden.',
  lead: 'Matthias Schmitz gründete das Unternehmen 2015. Heute arbeitet Gartenbau Kaarst für private Auftraggeber, Gewerbekunden und Hausverwaltungen.',
  body: 'Das Team verbindet Erfahrung, feste Abläufe und zuverlässige Partner aus der Region. Seit 2020 ist der Betrieb außerdem anerkannter Ausbildungsbetrieb.',
  facts: [
    { value: '2015', label: 'Gründung' },
    { value: '2020', label: 'Ausbildungsbetrieb' },
    { value: '365', label: 'Tage Garten im Blick' },
  ],
} as const;

export const specials = {
  label: 'Ergänzende Leistungen',
  title: 'Technik und Service, die Arbeit abnehmen.',
  items: [
    { number: '01', title: 'Bewässerung', body: 'Planung, Installation und Wartung moderner Systeme.' },
    { number: '02', title: 'Mähroboter', body: 'Standortanalyse, Kabelverlegung und Einrichtung.' },
    { number: '03', title: 'Winterdienst', body: 'Sichere Wege, Zufahrten und Gewerbeflächen.' },
    { number: '04', title: 'Sturmschäden', body: 'Schnelle Hilfe, Aufräumen und Wiederherstellung.' },
  ],
} as const;

export const career = {
  label: 'Karriere',
  title: 'Gute Arbeit entsteht im Team.',
  body: 'Du bist Landschaftsgärtner/in und möchtest abwechslungsreiche Projekte in einem motivierten Team umsetzen?',
  cta: 'Jetzt bewerben',
} as const;

export const contact = {
  label: 'Projektanfrage',
  title: 'Was können wir für Sie gestalten?',
  cta: 'Projekt besprechen',
} as const;
