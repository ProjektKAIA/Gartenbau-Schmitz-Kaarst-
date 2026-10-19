import { z } from 'zod';

/** Einzeiliger Text ohne Steuerzeichen – verhindert Zeilenumbrüche in Mail-Betreff und -Kopfzeilen. */
export const singleLine = (min: number, max: number, message: string) =>
  z
    .string(message)
    .trim()
    .min(min, message)
    .max(max, message)
    .regex(/^[^\p{Cc}]*$/u, message);

/**
 * Webadressen (http://, www., „name.tld“). Einzige Quelle für diese Erkennung.
 * Hintergrund: Bestätigungsmails gehen an eine vom Besucher eingegebene, ungeprüfte Adresse.
 * Felder, die darin zurückgespiegelt werden, dürfen deshalb keine Links tragen – sonst
 * ließe sich das Formular nutzen, um Phishing-Texte mit unserer Absender-Domain zu versenden.
 */
const WEB_ADDRESS = /(https?:\/\/|www\.|[\p{L}\d-]{2,}\.[a-z]{2,24}(?![\p{L}\d]))/iu;

export const NO_WEB_ADDRESS_MESSAGE = 'Bitte ohne Web- oder E-Mail-Adressen.';

export const hasWebAddress = (value: string): boolean => WEB_ADDRESS.test(value);

/** Einzeiliger Text, der in einer Mail an den Kunden zurückgespiegelt wird – ohne Webadressen. */
export const echoedLine = (min: number, max: number, message: string) =>
  singleLine(min, max, message).refine((value) => !hasWebAddress(value), NO_WEB_ADDRESS_MESSAGE);

export const postalCodeField = z
  .string('Bitte geben Sie eine fünfstellige Postleitzahl an.')
  .trim()
  .regex(/^\d{5}$/, 'Bitte geben Sie eine fünfstellige Postleitzahl an.');

/** Telefonnummer: Ziffern, Leerzeichen, + / ( ) - – einzige Quelle für das Format. */
const PHONE_PATTERN = /^[+\d][\d\s/()-]{5,30}$/;

/** Telefon- und E-Mail-Regel mit eigener Ansprache (Kundenformulare „Sie", Bewerbung „du"). */
export const phoneFieldWith = (message: string) => z.string(message).trim().regex(PHONE_PATTERN, message);
export const emailFieldWith = (message: string) => z.email(message).max(254);

export const phoneField = phoneFieldWith('Bitte geben Sie eine Telefonnummer für Rückfragen an.');
export const emailField = emailFieldWith('Bitte geben Sie eine gültige E-Mail-Adresse an.');

/** Honeypot: für Menschen unsichtbar, Bots füllen es aus. */
export const honeypotField = z.string().max(200);
