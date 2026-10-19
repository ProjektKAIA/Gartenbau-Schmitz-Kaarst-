/**
 * Allgemeine Geschäftsbedingungen für die Materiallieferung (Shop).
 * Entwurf – vor Veröffentlichung anwaltlich prüfen lassen.
 *
 * Grundannahme: Das Absenden des Shop-Formulars ist ein verbindliches Angebot des Kunden
 * (Bestellung), der Betrieb nimmt es per E-Mail/Telefon oder durch Lieferung an.
 * Deshalb muss der Absende-Knopf „zahlungspflichtig bestellen" heißen (§ 312j Abs. 3 BGB).
 */

import { site } from '@/lib/site';
import { shopTerms } from '@/content/shop';
import type { LegalDocument } from './types';

const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const agb = {
  title: 'Allgemeine Geschäftsbedingungen',
  updated: 'Oktober 2026',
  intro: `Diese Bedingungen gelten für die Bestellung von Material (z. B. Kies, Schotter, Sand, Rinde, Erde und Streugut) über den Shop auf dieser Website. Unsere Garten- und Landschaftsbauleistungen vereinbaren wir gesondert.`,
  sections: [
    {
      heading: '1. Anbieter und Geltungsbereich',
      blocks: [
        {
          type: 'p',
          text: `Ihr Vertragspartner ist ${site.owner}, ${site.legalName} („${site.name}"), ${address}, Telefon ${site.contact.phone}, E-Mail ${site.contact.email}, USt-IdNr. ${site.vatId} (im Folgenden „wir").`,
        },
        {
          type: 'p',
          text: 'Diese Bedingungen gelten für alle Verträge über die Lieferung von Material, die über den Shop dieser Website zustande kommen, in der zum Zeitpunkt Ihrer Bestellung gültigen Fassung.',
        },
        {
          type: 'p',
          text: 'Der Shop richtet sich ausschließlich an Verbraucher, also an Personen, die das Material überwiegend für private Zwecke bestellen (§ 13 BGB).',
        },
      ],
    },
    {
      heading: '2. Liefergebiet und Lieferbeschränkungen',
      blocks: [
        {
          type: 'p',
          text: `Wir liefern ausschließlich an Privatadressen im Umkreis von ca. ${shopTerms.deliveryRadiusKm} km um ${site.address.city}. Liegt die Lieferadresse außerhalb dieses Gebiets, nehmen wir die Bestellung nicht an und teilen Ihnen das mit.`,
        },
        {
          type: 'p',
          text: 'Wir halten kein Lager vor. Das Material wird nach Ihrer Bestellung für Sie beschafft. Ist ein Material oder eine Körnung nicht verfügbar, sagen wir Ihnen das vor der Annahme Ihrer Bestellung.',
        },
      ],
    },
    {
      heading: '3. Vertragsschluss',
      blocks: [
        {
          type: 'p',
          text: 'Die Darstellung der Materialien im Shop ist noch kein verbindliches Angebot von uns, sondern eine Einladung an Sie, eine Bestellung abzugeben.',
        },
        {
          type: 'p',
          text: 'So läuft die Bestellung ab:',
        },
        {
          type: 'list',
          items: [
            'Sie wählen Material, Körnung bzw. Gebinde und Menge und legen die Positionen in Ihre Bestellliste.',
            'Sie geben Ihren Namen, die Lieferadresse, Ihre Telefonnummer und E-Mail-Adresse an und bestätigen, dass es sich um eine Privatadresse im Liefergebiet handelt.',
            'Vor dem Absenden sehen Sie eine Übersicht mit allen Positionen und dem Gesamtpreis. Dort können Sie Mengen ändern, Positionen entfernen und Ihre Angaben korrigieren.',
            'Mit dem Klick auf die Schaltfläche „zahlungspflichtig bestellen" geben Sie ein verbindliches Angebot zum Kauf der ausgewählten Waren ab.',
            'Wir bestätigen Ihnen den Eingang Ihrer Bestellung unverzüglich per E-Mail. Diese Eingangsbestätigung ist noch keine Annahme Ihrer Bestellung.',
          ],
        },
        {
          type: 'p',
          text: 'Der Vertrag kommt erst zustande, wenn wir Ihre Bestellung per E-Mail oder telefonisch annehmen oder die Ware an Sie ausliefern – je nachdem, was zuerst geschieht. Mit der Annahme stimmen wir mit Ihnen auch den Liefertermin ab.',
        },
        {
          type: 'p',
          text: 'Nehmen wir Ihre Bestellung nicht innerhalb von 5 Werktagen an, sind Sie nicht mehr an sie gebunden.',
        },
      ],
    },
    {
      heading: '4. Vertragstext und Vertragssprache',
      blocks: [
        {
          type: 'p',
          text: 'Die Vertragssprache ist Deutsch. Wir speichern Ihre Bestellung als E-Mail in unserem Postfach; ein Kundenkonto oder einen Online-Abruf gibt es nicht. Sie erhalten die Bestelldaten mit der Eingangsbestätigung per E-Mail. Diese Bedingungen und die Widerrufsbelehrung können Sie jederzeit auf dieser Website aufrufen, ausdrucken oder speichern; wir senden sie Ihnen außerdem mit der Bestätigung Ihrer Bestellung zu.',
        },
      ],
    },
    {
      heading: '5. Preise',
      blocks: [
        {
          type: 'p',
          text: 'Alle Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer sowie die Lieferung bis zu Ihrem Haus. Zusätzliche Liefer- oder Versandkosten fallen nicht an. Der Gesamtpreis ergibt sich aus den bestellten Mengen und wird Ihnen vor dem Absenden der Bestellung angezeigt.',
        },
      ],
    },
    {
      heading: '6. Zahlung',
      blocks: [
        {
          type: 'p',
          text: 'Sie zahlen ausschließlich auf Rechnung per Überweisung. Andere Zahlungsarten bieten wir nicht an. Die Rechnung erhalten Sie mit oder nach der Lieferung.',
        },
        {
          type: 'p',
          text: 'Der Rechnungsbetrag ist innerhalb von 14 Tagen nach Erhalt der Rechnung ohne Abzug zu zahlen.',
        },
      ],
    },
    {
      heading: '7. Lieferung',
      blocks: [
        {
          type: 'p',
          text: 'Wir holen die Ware selbst beim Hersteller bzw. Händler ab und liefern sie mit eigenem Fahrzeug bis zu Ihrem Haus. Lose Ware wird an einer mit dem Lieferfahrzeug sicher erreichbaren, befestigten Stelle vor Ihrem Grundstück oder auf Ihrer Einfahrt abgeladen; Sackware stellen wir dort ab. Ein Tragen in den Garten oder ein Einbau ist nicht Teil der Lieferung.',
        },
        {
          type: 'p',
          text: 'Bitte teilen Sie uns enge Zufahrten, Gewichtsbeschränkungen oder andere Besonderheiten der Lieferstelle in Ihrer Nachricht mit. Den Liefertermin stimmen wir mit Ihnen ab.',
        },
        {
          type: 'p',
          text: 'Kies, Sand, Schotter, Rinde und Erde sind Naturprodukte. Farbe und Struktur können innerhalb der Sorte natürlich schwanken; Abbildungen im Shop sind Beispielfotos.',
        },
      ],
    },
    {
      heading: '8. Eigentumsvorbehalt',
      blocks: [
        {
          type: 'p',
          text: 'Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.',
        },
      ],
    },
    {
      heading: '9. Widerrufsrecht',
      blocks: [
        {
          type: 'p',
          text: 'Als Verbraucher haben Sie ein gesetzliches Widerrufsrecht. Einzelheiten stehen in unserer Widerrufsbelehrung, die auch das Muster-Widerrufsformular enthält. Den Widerruf können Sie außerdem online über die Schaltfläche „Vertrag widerrufen" erklären.',
        },
        {
          type: 'p',
          text: 'Das Widerrufsrecht besteht nicht, wenn die Ware nach der Lieferung auf Grund ihrer Beschaffenheit untrennbar mit anderen Gütern vermischt wurde (§ 312g Abs. 2 Nr. 4 BGB), etwa wenn Sand, Erde, Rinde oder Streugut bereits ausgebracht, eingearbeitet oder mit anderem Material vermischt wurde. Für einen Wertverlust durch einen Umgang mit der Ware, der zur Prüfung nicht notwendig war, müssen Sie Wertersatz leisten. Einzelheiten stehen in der Widerrufsbelehrung.',
        },
      ],
    },
    {
      heading: '10. Mängel und Haftung',
      blocks: [
        {
          type: 'p',
          text: 'Es gelten die gesetzlichen Rechte bei Mängeln. Bitte melden Sie offensichtliche Mängel oder Fehlmengen möglichst bald nach der Lieferung, damit wir sie schnell prüfen können; Ihre gesetzlichen Rechte hängen davon nicht ab.',
        },
        {
          type: 'p',
          text: 'Wir haften nach den gesetzlichen Vorschriften.',
        },
      ],
    },
    {
      heading: '11. Verbraucherstreitbeilegung',
      blocks: [
        {
          type: 'p',
          text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
        },
      ],
    },
    {
      heading: '12. Anwendbares Recht',
      blocks: [
        {
          type: 'p',
          text: 'Es gilt das Recht der Bundesrepublik Deutschland. Zwingende Verbraucherschutzvorschriften des Staates, in dem Sie Ihren gewöhnlichen Aufenthalt haben, bleiben unberührt.',
        },
      ],
    },
  ],
} as const satisfies LegalDocument;
