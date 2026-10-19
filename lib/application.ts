import { experienceLevels, licenseClasses, opening, workloads, yesNo } from '@/content/karriere';
import type { Application } from '@/types/application';
import type { MailContent } from './mail';

const labelOf = (list: readonly { readonly id: string; readonly label: string }[], id: string): string =>
  list.find((entry) => entry.id === id)?.label ?? id;

/** Bewerbung als Mail an den Betrieb – Antworten gehen per Reply-To direkt an die Bewerberin/den Bewerber. */
export const buildApplicationMail = (application: Application, receivedAt: string): MailContent => ({
  subject: `Bewerbung: ${opening.title} – ${application.name}`,
  text: [
    `Über die Karriereseite ist eine Bewerbung als ${opening.title} eingegangen:`,
    '',
    `Name: ${application.name}`,
    `E-Mail: ${application.email}`,
    `Telefon: ${application.phone}`,
    `Wohnort: ${application.city}`,
    '',
    `Gewünschte Arbeitszeit: ${labelOf(workloads, application.workload)}`,
    `Ausbildung im GaLaBau: ${labelOf(yesNo, application.galabauTraining)}`,
    `Andere handwerkliche Ausbildung: ${application.otherTraining || '–'}`,
    `Berufserfahrung im GaLaBau: ${labelOf(experienceLevels, application.experience)}`,
    `Führerschein: ${labelOf(licenseClasses, application.license)}`,
    `Verfügbar ab: ${application.availableFrom}`,
    '',
    'Nachricht:',
    application.message || '–',
    '',
    `Eingegangen am: ${receivedAt}`,
  ].join('\n'),
});
