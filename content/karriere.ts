/**
 * Inhalte der Unterseite /karriere.
 * Nur belegte Fakten (Ausbildungsbetrieb seit, Einsatzgebiet, Leistungen) – keine Gehälter,
 * Benefits oder Teamgrößen, solange der Betrieb sie nicht geliefert hat. Vom Betrieb gegenzulesen.
 */

import { site } from '@/lib/site';
import { career } from './home';

/** Bewerbung per E-Mail – einzige Stelle für Betreff und Adresse. */
export const careerApplyHref = `mailto:${site.contact.email}?subject=${encodeURIComponent('Bewerbung bei Gartenbau Kaarst')}`;

export const karrierePage = {
  label: career.label,
  title: career.title,
  intro: `${career.body} Oder du suchst einen Ausbildungsplatz? Seit ${site.trainingCompanySince} bilden wir selbst aus.`,
} as const;

export const openings = {
  label: 'Wen wir suchen',
  title: 'Zwei Wege in unser Team.',
  items: [
    {
      title: 'Landschaftsgärtner/in (m/w/d)',
      body: 'Du hast deine Ausbildung im Garten- und Landschaftsbau abgeschlossen oder bringst vergleichbare Erfahrung mit und packst bei Pflaster, Pflanzung und Pflege mit an.',
    },
    {
      title: 'Ausbildung Gärtner/in, Garten- & Landschaftsbau (m/w/d)',
      body: `Du arbeitest gern draußen und mit den Händen? Als Ausbildungsbetrieb seit ${site.trainingCompanySince} begleiten wir dich vom ersten Tag bis zur Prüfung.`,
    },
  ],
} as const;

export const workPoints = {
  label: 'Was dich erwartet',
  title: 'Abwechslung statt Fließband.',
  items: [
    { title: 'Vielfältige Projekte', body: 'Gartengestaltung, Terrassen und Wege, Pflege, Bewässerung und Winterdienst – kein Tag ist wie der andere.' },
    { title: 'Kurze Wege', body: `Einsätze in ${site.serviceArea}. Ansprechpartner ist direkt ${site.owner}.` },
    { title: 'Privat und Gewerbe', body: 'Wir arbeiten für private Auftraggeber, Gewerbekunden und Hausverwaltungen.' },
  ],
} as const;

export const applyBand = {
  label: 'Bewerbung',
  title: 'Kein Anschreiben-Marathon.',
  body: 'Ein paar Zeilen zu dir, gern mit Lebenslauf – per E-Mail, über das Kontaktformular oder einfach anrufen.',
  mailCta: 'Per E-Mail bewerben',
  formCta: 'Über das Formular',
} as const;
