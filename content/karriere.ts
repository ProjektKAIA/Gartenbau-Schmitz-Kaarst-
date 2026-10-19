/**
 * Inhalte der Unterseiten /karriere und /karriere/bewerben.
 * Nur belegte Fakten – Details zur Stelle (Arbeitszeiten, Vergütung, Benefits) liefert der Betrieb nach.
 * Die Auswahllisten sind die einzige Quelle für Formular, Zod-Schema und Bewerbungs-Mail.
 */

import { site } from '@/lib/site';
import { career } from './home';

export const karrierePage = {
  label: career.label,
  title: career.title,
  intro: career.body,
} as const;

export const opening = {
  label: 'Offene Stelle',
  title: 'Landschaftsgärtner/in (m/w/d)',
  terms: ['Vollzeit oder Teilzeit', `${site.address.city} & Umgebung`],
  body: 'Du packst bei Gestaltung, Pflaster, Pflanzung und Pflege mit an und setzt unsere Projekte gemeinsam mit dem Team sauber um.',
  applyCta: 'Hier bewerben',
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

/* ------------------------------------------------------------------ Bewerbungsformular */

export const workloads = [
  { id: 'vollzeit', label: 'Vollzeit' },
  { id: 'teilzeit', label: 'Teilzeit' },
] as const;
export type WorkloadId = (typeof workloads)[number]['id'];

export const yesNo = [
  { id: 'ja', label: 'Ja' },
  { id: 'nein', label: 'Nein' },
] as const;
export type YesNoId = (typeof yesNo)[number]['id'];

export const experienceLevels = [
  { id: 'keine', label: 'Keine' },
  { id: 'unter-1', label: 'Unter 1 Jahr' },
  { id: '1-3', label: '1–3 Jahre' },
  { id: '3-5', label: '3–5 Jahre' },
  { id: 'ueber-5', label: 'Mehr als 5 Jahre' },
] as const;
export type ExperienceId = (typeof experienceLevels)[number]['id'];

export const licenseClasses = [
  { id: 'keiner', label: 'Kein Führerschein' },
  { id: 'b', label: 'Klasse B' },
  { id: 'be', label: 'Klasse BE (mit Anhänger)' },
  { id: 'c1e', label: 'Klasse C1E oder höher' },
] as const;
export type LicenseId = (typeof licenseClasses)[number]['id'];

export const applicationCopy = {
  label: 'Bewerbung',
  title: 'Bewirb dich als Landschaftsgärtner/in.',
  intro: 'Ein paar Angaben genügen – kein Anschreiben nötig. Wir melden uns persönlich bei dir.',
  requiredNote: 'Mit * markierte Felder sind Pflichtfelder.',
  fields: {
    name: 'Name *',
    email: 'E-Mail *',
    phone: 'Telefon *',
    city: 'Wohnort *',
    workload: 'Gewünschte Arbeitszeit *',
    galabauTraining: 'Abgeschlossene Ausbildung im Garten- und Landschaftsbau? *',
    otherTraining: 'Andere handwerkliche Ausbildung',
    otherTrainingHint: 'z. B. Maurer/in, Tischler/in – oder „keine"',
    experience: 'Berufserfahrung im GaLaBau *',
    experiencePlaceholder: 'Bitte wählen',
    license: 'Führerschein *',
    licensePlaceholder: 'Bitte wählen',
    availableFrom: 'Verfügbar ab *',
    availableFromHint: 'z. B. „sofort" oder „01.03.2027"',
    message: 'Noch etwas zu dir? (optional)',
    privacyBefore: 'Informationen zur Verarbeitung deiner Daten findest du in unserer ',
    privacyLink: 'Datenschutzerklärung',
    privacyAfter: '.',
  },
  submitLabel: 'Bewerbung senden',
  sendingLabel: 'Wird gesendet …',
  sentTitle: 'Vielen Dank für deine Bewerbung.',
  sentBody: 'Wir melden uns zeitnah bei dir.',
} as const;
