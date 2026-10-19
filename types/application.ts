import { z } from 'zod';
import {
  experienceLevels,
  licenseClasses,
  workloads,
  yesNo,
  type ExperienceId,
  type LicenseId,
  type WorkloadId,
  type YesNoId,
} from '@/content/karriere';
import { emailFieldWith, honeypotField, phoneFieldWith, singleLine } from './common';

const ids = <T extends string>(list: readonly { readonly id: T }[]): readonly T[] => list.map((entry) => entry.id);

const workloadIds: readonly WorkloadId[] = ids(workloads);
const yesNoIds: readonly YesNoId[] = ids(yesNo);
const experienceIds: readonly ExperienceId[] = ids(experienceLevels);
const licenseIds: readonly LicenseId[] = ids(licenseClasses);

/** Bewerbung als Landschaftsgärtner/in – gilt für Formular (Client) und API (Server). */
export const applicationSchema = z.object({
  name: singleLine(2, 100, 'Bitte gib deinen Namen an.'),
  email: emailFieldWith('Bitte gib eine gültige E-Mail-Adresse an.'),
  phone: phoneFieldWith('Bitte gib eine Telefonnummer für Rückfragen an.'),
  city: singleLine(2, 80, 'Bitte gib deinen Wohnort an.'),
  workload: z.enum(workloadIds, 'Bitte wähle Vollzeit oder Teilzeit.'),
  galabauTraining: z.enum(yesNoIds, 'Bitte beantworte die Frage zur Ausbildung.'),
  otherTraining: singleLine(0, 120, 'Bitte fasse dich kürzer (höchstens 120 Zeichen).'),
  experience: z.enum(experienceIds, 'Bitte wähle deine Berufserfahrung.'),
  license: z.enum(licenseIds, 'Bitte wähle deinen Führerschein.'),
  availableFrom: singleLine(2, 60, 'Bitte gib an, ab wann du anfangen kannst.'),
  message: z.string('Bitte prüfe deine Nachricht.').trim().max(2000, 'Bitte fasse dich kürzer (höchstens 2000 Zeichen).'),
});

export type Application = z.infer<typeof applicationSchema>;

/** Body von `POST /api/application`. */
export const applicationRequestSchema = z.strictObject({
  application: applicationSchema,
  website: honeypotField,
});
