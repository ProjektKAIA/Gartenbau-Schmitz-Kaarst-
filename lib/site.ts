/**
 * Einzige Quelle für Stammdaten des Betriebs.
 * Telefonnummer, E-Mail und Adresse stehen genau hier – nirgends sonst im Code.
 * Quelle: Impressum von gartenbau-kaarst.de (Stand 21.09.2026).
 */

export const site = {
  name: 'Gartenbau Kaarst',
  owner: 'Matthias Schmitz',
  legalName: 'Gartenbau Matthias Schmitz',
  qualification: 'Staatl. geprüfter Techniker im Garten- & Landschaftsbau',
  claim: 'gestalten · bauen · pflegen',
  description:
    'Gartenbau Kaarst – Gestaltung, Bau und Pflege von Gärten und Außenanlagen in Kaarst, Neuss und Umgebung.',
  serviceArea: 'Kaarst, Neuss & Umgebung',
  foundedYear: 2015,
  trainingCompanySince: 2020,
  vatId: 'DE308017471',
  address: {
    street: 'Fasanenweg 14',
    postalCode: '41564',
    city: 'Kaarst',
    country: 'DE',
  },
  contact: {
    phone: '0177 2770274',
    phoneHref: 'tel:+491772770274',
    email: 'info@gartenbau-kaarst.de',
  },
  social: {
    instagram: 'https://www.instagram.com/gartenbau_matthiasschmitz/',
    facebook: 'https://www.facebook.com/Gartenbau-Matthias-Schmitz-101631288001701/',
  },
} as const;

export type Site = typeof site;
