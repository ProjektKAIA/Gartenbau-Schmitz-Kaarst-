import { site } from './site';

/** Betreff und Text einer Mail – reine Daten, der Versand liegt in services/mail.ts. */
export type MailContent = {
  readonly subject: string;
  readonly text: string;
};

export type BusinessContact = {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
};

/** Absender-Angaben in allen Kunden-Mails. */
export const businessContact: BusinessContact = {
  name: site.legalName,
  phone: site.contact.phone,
  email: site.contact.email,
};
