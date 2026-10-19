/**
 * Inhalte der Unterseiten /projekte und /ablauf.
 * Bisher ein Entwurfsbild – echte Kundenprojekte folgen, sobald der Betrieb Fotos liefert.
 */

import { process, project } from './home';

export const projektePage = {
  label: 'Projekte',
  title: 'Ausgewählte Projekte',
} as const;

/** Vorgestellte Projekte – neue Einträge hier ergänzen, die Seite listet sie automatisch. */
export const showcase = [
  {
    id: 'garten-und-wege',
    label: project.label,
    title: `${project.titleFirst} ${project.titleSecond}`,
    body: 'Natursteinwege verbinden Terrasse, Rasen und Beete zu einem ruhigen Gesamtbild. Gestaltung, Wegebau und Bepflanzung kamen aus einer Hand.',
    services: ['Gartengestaltung', 'Wege & Naturstein', 'Bepflanzung'],
    image: '/assets/hero.webp',
    imageAlt: project.imageAlt,
    draftNote: project.draftNote,
    cta: project.cta,
  },
] as const;

export const moreProjects = {
  title: 'Weitere Projekte folgen.',
  body: 'Wir stellen hier nach und nach Gärten aus Kaarst und Umgebung vor. Sie möchten vorab Beispiele sehen? Sprechen Sie uns an.',
} as const;

export const processTeaser = {
  title: 'Wie läuft ein Projekt bei uns ab?',
  body: 'Von der Beratung vor Ort bis zur Pflege – vier klare Schritte.',
  cta: 'Zum Ablauf',
} as const;

export const ablaufPage = {
  label: 'Ablauf',
  title: `${process.titleFirst} ${process.titleSecond}`,
  lead: process.intro,
  stepsTitle: 'Vier Schritte zu Ihrem Garten',
} as const;
