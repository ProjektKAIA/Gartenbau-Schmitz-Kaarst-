/**
 * Inhalte der Unterseite /leistungen.
 * Titel, Kurztexte und Stichpunkte kommen aus content/home.ts (eine Quelle) –
 * hier stehen nur die ausführlicheren Ergänzungen für die Detailseite.
 */

import type { ContactTopicId } from './contact';
import { extras, services } from './home';

export type ServiceDetail = {
  /** Anker-ID, z. B. `/leistungen#bauen`. */
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly lead: string;
  readonly includes: readonly string[];
  readonly benefits: readonly string[];
  readonly topic: ContactTopicId;
  readonly cta: string;
};

const [gestalten, bauen, pflegen] = services.items;
const [bewaesserung, maehroboter, winterdienst, sturm] = extras.items;

export const leistungenPage = {
  label: 'Leistungen',
  title: 'Gestalten, bauen, pflegen – aus einer Hand.',
  intro: `${services.intro} Für private Auftraggeber, Gewerbekunden und Hausverwaltungen in Kaarst, Neuss und Umgebung.`,
  imageAlt: 'Gestalteter Garten mit Wegen und Pflanzflächen',
  jumpLabel: 'Direkt zu',
  includesLabel: 'Dazu gehört',
  benefitsLabel: 'Ihr Nutzen',
  extrasLabel: extras.label,
  extrasTitle: extras.title,
  extrasBody: extras.body,
} as const;

export const coreServices = [
  {
    id: 'gestalten',
    number: gestalten.index,
    title: gestalten.title,
    lead: gestalten.body,
    includes: [
      ...gestalten.items,
      'Aufnahme der Gegebenheiten vor Ort',
      'Auswahl passender Pflanzen und Materialien',
    ],
    benefits: [
      'Ein Garten, der zu Haus, Grundstück und Alltag passt',
      'Klare Grundlage für Entscheidungen, bevor gebaut wird',
      'Gestaltung, Ausführung und Pflege von Anfang an zusammengedacht',
    ],
    topic: 'gestaltung',
    cta: gestalten.cta,
  },
  {
    id: 'bauen',
    number: bauen.index,
    title: bauen.title,
    lead: bauen.body,
    includes: [...bauen.items, 'Tragfähiger Unterbau für dauerhaft ebene Flächen'],
    benefits: [
      'Flächen, die im Alltag belastbar bleiben',
      'Saubere Linien und stimmige Übergänge zum Garten',
      'Materialien, die zum Haus und zur Nutzung passen',
    ],
    topic: 'pflaster',
    cta: bauen.cta,
  },
  {
    id: 'pflegen',
    number: pflegen.index,
    title: pflegen.title,
    lead: pflegen.body,
    includes: [...pflegen.items, 'Saisonarbeiten im Frühjahr und Herbst'],
    benefits: [
      'Ihr Garten behält Form und Charakter',
      'Gesunde Gehölze durch fachgerechten Schnitt',
      'Weniger Aufwand für Sie – ob Privatgarten oder Wohnanlage',
    ],
    topic: 'pflege',
    cta: pflegen.cta,
  },
] as const satisfies readonly ServiceDetail[];

export const extraServices = [
  {
    id: 'bewaesserung',
    number: bewaesserung.number,
    title: bewaesserung.title,
    lead: `${bewaesserung.text}: Wir planen die Bewässerung passend zu Ihren Flächen und Pflanzen.`,
    includes: ['Planung der Bewässerung', 'Installation', 'Wartung'],
    benefits: ['Pflanzen werden gleichmäßig versorgt', 'Weniger Gießaufwand im Sommer'],
    topic: 'bewaesserung',
    cta: 'Bewässerung anfragen',
  },
  {
    id: 'maehroboter',
    number: maehroboter.number,
    title: maehroboter.title,
    lead: `${maehroboter.text}: Wir richten Ihren Mähroboter so ein, dass er zuverlässig arbeitet.`,
    includes: ['Einrichtung', 'Verlegen des Begrenzungskabels', 'Service'],
    benefits: ['Ein gepflegter Rasen ohne eigenen Mähaufwand'],
    topic: 'maehroboter',
    cta: 'Mähroboter anfragen',
  },
  {
    id: 'winterdienst',
    number: winterdienst.number,
    title: winterdienst.title,
    lead: `${winterdienst.text}: Wir halten Wege und Flächen im Winter begehbar.`,
    includes: ['Räumen von Wegen und Flächen', 'Streuen bei Glätte'],
    benefits: ['Mehr Sicherheit für Bewohner, Kunden und Besucher'],
    topic: 'winterdienst',
    cta: 'Winterdienst anfragen',
  },
  {
    id: 'sturmschaeden',
    number: sturm.number,
    title: sturm.title,
    lead: `${sturm.text}: Wir helfen, wenn ein Unwetter im Garten Spuren hinterlassen hat.`,
    includes: ['Beseitigen von Ästen und beschädigten Gehölzen', 'Wiederherstellen von Flächen und Pflanzungen'],
    benefits: ['Ihr Grundstück ist schnell wieder sicher und nutzbar'],
    topic: 'sturmschaden',
    cta: 'Sturmschaden melden',
  },
] as const satisfies readonly ServiceDetail[];

export const shopTeaser = {
  label: 'Material-Shop',
  title: 'Kies, Splitt, Rinde & Co. – Lieferung bis zum Haus.',
  body: 'Sie legen lieber selbst Hand an? Im Material-Shop bestellen Sie Schüttgüter, Rindenmulch und Streugranulat für Ihren Garten.',
  cta: 'Zum Material-Shop',
} as const;
