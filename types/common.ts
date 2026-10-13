import { z } from 'zod';

/** Einzeiliger Text ohne Steuerzeichen – verhindert Zeilenumbrüche in Mail-Betreff und -Kopfzeilen. */
export const singleLine = (min: number, max: number, message: string) =>
  z
    .string(message)
    .trim()
    .min(min, message)
    .max(max, message)
    .regex(/^[^\p{Cc}]*$/u, message);

export const emailField = z.email('Bitte geben Sie eine gültige E-Mail-Adresse an.').max(254);

/** Honeypot: für Menschen unsichtbar, Bots füllen es aus. */
export const honeypotField = z.string().max(200);
