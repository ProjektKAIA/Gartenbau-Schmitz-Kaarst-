/**
 * Inhalte der Unterseite /ueber-uns.
 * Bewusst nur Fakten aus lib/site.ts und content/home.ts – keine Mitarbeiterzahlen, Namen,
 * Zitate oder Referenzen, solange der Betrieb sie nicht geliefert hat.
 */

import { site } from '@/lib/site';
import { about, intro } from './home';

export const ueberUnsPage = {
  label: about.label,
  titleFirst: about.titleFirst,
  titleSecond: about.titleSecond,
  intro: about.body,
} as const;

export const facts = [
  { value: String(site.foundedYear), label: `gegründet von ${site.owner}` },
  { value: `seit ${site.trainingCompanySince}`, label: 'Ausbildungsbetrieb' },
  { value: site.address.city, label: 'Sitz des Betriebs' },
] as const;

export const owner = {
  label: 'Inhaber',
  name: site.owner,
  qualification: site.qualification,
  body: `${site.owner} hat ${site.name} ${site.foundedYear} in ${site.address.city} gegründet und ist von der ersten Beratung bis zur fertigen Fläche Ihr fester Ansprechpartner.`,
} as const;

export const attitude = {
  label: intro.label,
  title: `${intro.titleLead}${intro.titleAccent}`,
  body: intro.body,
} as const;

export const training = {
  label: 'Ausbildung',
  title: `Ausbildungsbetrieb seit ${site.trainingCompanySince}.`,
  body: 'Wir geben unser Handwerk weiter. Wer den Garten- und Landschaftsbau von Grund auf lernen möchte, kann sich gern bei uns melden.',
  cta: 'Zur Karriereseite',
} as const;

export const area = {
  label: 'Einsatzgebiet',
  title: site.serviceArea,
  body: `Von unserem Sitz in ${site.address.city} aus sind wir in diesen Orten für Sie im Einsatz:`,
} as const;
