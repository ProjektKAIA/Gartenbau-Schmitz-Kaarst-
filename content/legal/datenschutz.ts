/**
 * Datenschutzerklärung (Art. 13 DSGVO) für die Website inkl. Material-Shop.
 * Entwurf – vor Veröffentlichung anwaltlich prüfen lassen.
 *
 * Stand der Technik laut Projekt: Hosting bei Vercel, keine Cookies, kein Tracking, keine
 * externen Schriften/Karten/Videos/Social-Plugins, Shop-Anfragen werden per SMTP als E-Mail
 * versendet und nicht in einer Datenbank gespeichert. Ändert sich daran etwas, muss dieser
 * Text nachgezogen werden.
 */

import { site } from '@/lib/site';
import type { LegalDocument } from './types';

const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const datenschutz = {
  title: 'Datenschutzerklärung',
  updated: 'Oktober 2026',
  intro:
    'Hier erfahren Sie, welche personenbezogenen Daten wir verarbeiten, wenn Sie diese Website besuchen oder über den Shop Material bestellen, wofür wir sie verwenden und welche Rechte Sie haben.',
  sections: [
    {
      heading: '1. Verantwortlicher',
      blocks: [
        {
          type: 'p',
          text: `Verantwortlich für die Datenverarbeitung auf dieser Website ist ${site.owner}, ${site.legalName}, ${address}, Telefon ${site.contact.phone}, E-Mail ${site.contact.email}.`,
        },
        {
          type: 'p',
          text: 'Bei Fragen zum Datenschutz wenden Sie sich bitte direkt an uns.',
        },
      ],
    },
    {
      heading: '2. Das Wichtigste in Kürze',
      blocks: [
        {
          type: 'list',
          items: [
            'Diese Website setzt keine Cookies und verwendet keine Analyse-, Tracking- oder Werbedienste.',
            'Schriften werden nicht von fremden Servern geladen; es werden keine Karten, Videos oder Social-Media-Plugins eingebunden.',
            'Beim Aufruf der Website entstehen technisch notwendige Server-Logdaten beim Hoster.',
            'Wenn Sie über den Shop bestellen, erhalten wir Ihre Angaben per E-Mail und verwenden sie für Ihre Bestellung.',
          ],
        },
      ],
    },
    {
      heading: '3. Hosting und Server-Logdaten',
      blocks: [
        {
          type: 'p',
          text: 'Diese Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Bei jedem Aufruf der Website verarbeitet Vercel automatisch Daten, die Ihr Browser übermittelt (Server-Logdaten):',
        },
        {
          type: 'list',
          items: [
            'IP-Adresse des anfragenden Geräts',
            'Datum und Uhrzeit des Zugriffs',
            'aufgerufene Seite bzw. Datei und übertragene Datenmenge',
            'Statuscode der Anfrage (z. B. erfolgreich, nicht gefunden)',
            'Browsertyp und -version, Betriebssystem',
            'Referrer-URL (die zuvor besuchte Seite), soweit übermittelt',
          ],
        },
        {
          type: 'p',
          text: 'Diese Daten sind technisch nötig, um die Website auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Angriffe oder Fehler zu erkennen. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und funktionsfähigen Internetauftritt (Art. 6 Abs. 1 lit. f DSGVO). Wir führen diese Daten nicht mit anderen Daten zusammen und werten sie nicht zu Werbe- oder Analysezwecken aus.',
        },
        {
          type: 'todo',
          text: 'Speicherdauer der Logdaten bei Vercel für den gebuchten Tarif prüfen (Vercel-Dashboard / Dokumentation „Runtime Logs") und hier konkret eintragen.',
        },
        {
          type: 'p',
          text: 'Mit Vercel haben wir einen Vertrag über Auftragsverarbeitung (Data Processing Addendum) nach Art. 28 DSGVO geschlossen. Vercel verarbeitet die Daten nur nach unseren Weisungen.',
        },
        {
          type: 'p',
          text: 'Dabei können Daten in die USA übermittelt werden. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert. Für zertifizierte Unternehmen besteht ein Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Die Zertifizierung können Sie unter www.dataprivacyframework.gov einsehen.',
        },
      ],
    },
    {
      heading: '4. Bestellungen über den Shop',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie über den Shop eine Bestellung abschicken, verarbeiten wir folgende Angaben:',
        },
        {
          type: 'list',
          items: [
            'Name',
            'Lieferadresse (Straße, Hausnummer, Postleitzahl, Ort)',
            'Telefonnummer',
            'E-Mail-Adresse',
            'die bestellten Materialien und Mengen',
            'Ihre Nachricht an uns, falls Sie eine schreiben',
            'Ihre Bestätigung, dass die Lieferadresse eine Privatadresse im Liefergebiet ist',
          ],
        },
        {
          type: 'p',
          text: 'Wir verwenden diese Daten, um Ihre Bestellung zu prüfen, mit Ihnen Rückfragen und den Liefertermin zu klären, die Ware zu beschaffen und zu liefern und die Rechnung zu stellen. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen und die Erfüllung des Vertrags mit Ihnen (Art. 6 Abs. 1 lit. b DSGVO).',
        },
        {
          type: 'p',
          text: 'Die Pflichtfelder sind für die Bestellung erforderlich. Ohne diese Angaben können wir Ihre Bestellung nicht bearbeiten und nicht liefern. Eine Nachricht ist freiwillig.',
        },
        {
          type: 'p',
          text: 'Technischer Ablauf: Ihre Angaben werden verschlüsselt an unseren Server bei Vercel übertragen, dort geprüft und als E-Mail an unser Postfach gesendet. Gleichzeitig erhalten Sie eine automatische Eingangsbestätigung an die angegebene E-Mail-Adresse. Wir speichern die Bestellung nicht in einer Datenbank, sondern nur als E-Mail in unserem Postfach.',
        },
        {
          type: 'p',
          text: 'Für den Versand der E-Mails nutzen wir einen E-Mail-Dienstleister, der in unserem Auftrag tätig ist (Art. 28 DSGVO).',
        },
        {
          type: 'todo',
          text: 'E-Mail-Versanddienst (SMTP-Anbieter) eintragen: Name, Anschrift, Serverstandort, Auftragsverarbeitungsvertrag; bei Sitz oder Verarbeitung außerhalb der EU/des EWR zusätzlich die Grundlage der Drittlandübermittlung (z. B. DPF-Zertifizierung oder Standardvertragsklauseln).',
        },
        {
          type: 'todo',
          text: `Anbieter des E-Mail-Postfachs ${site.contact.email} eintragen (bei wem liegt das Postfach?) – ebenfalls mit Auftragsverarbeitungsvertrag und ggf. Drittlandangaben.`,
        },
      ],
    },
    {
      heading: '5. Online-Widerruf',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie einen Vertrag über die Funktion „Vertrag widerrufen" widerrufen, verarbeiten wir Ihren Namen, Ihre Angaben zum widerrufenen Vertrag, Ihre E-Mail-Adresse sowie Datum und Uhrzeit des Eingangs. Wir benötigen diese Daten, um den Widerruf zu bearbeiten und Ihnen den Eingang zu bestätigen, wozu wir gesetzlich verpflichtet sind (Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit § 356a BGB). Der Versand läuft über denselben Weg wie bei Bestellungen (Abschnitt 4).',
        },
      ],
    },
    {
      heading: '6. Kontakt per E-Mail oder Telefon',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten. Geht es um einen Auftrag oder eine Bestellung, ist Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, sonst unser berechtigtes Interesse an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO).',
        },
      ],
    },
    {
      heading: '7. Speicherdauer',
      blocks: [
        {
          type: 'p',
          text: 'Wir speichern Ihre Daten nur so lange, wie es für den jeweiligen Zweck nötig ist. Kommt ein Vertrag zustande, bewahren wir Bestellung, Schriftverkehr und Rechnung so lange auf, wie es das Handels- und Steuerrecht vorschreibt (§ 257 HGB, § 147 AO): empfangene und versandte Geschäftsbriefe in der Regel sechs Jahre, Rechnungen und andere Buchungsbelege in der Regel acht Jahre, jeweils ab Ende des Kalenderjahres. Rechtsgrundlage dafür ist Art. 6 Abs. 1 lit. c DSGVO. Danach löschen wir die Daten.',
        },
        {
          type: 'p',
          text: 'Kommt kein Vertrag zustande, löschen wir Ihre Bestellung, sobald sie abschließend bearbeitet ist und keine Rückfragen mehr zu erwarten sind.',
        },
        {
          type: 'todo',
          text: 'Konkrete Löschfrist für nicht angenommene Bestellungen und reine Kontaktanfragen mit dem Betrieb festlegen (z. B. sechs Monate) und hier eintragen.',
        },
      ],
    },
    {
      heading: '8. Links zu Instagram und Facebook',
      blocks: [
        {
          type: 'p',
          text: 'Auf unserer Website verlinken wir auf unsere Seiten bei Instagram und Facebook. Es handelt sich um einfache Links, keine eingebundenen Plugins. Beim Besuch unserer Website werden deshalb keine Daten an diese Dienste übertragen. Erst wenn Sie einen Link anklicken, gelangen Sie auf die Seite des jeweiligen Anbieters (Meta Platforms Ireland Limited); dort gelten dessen Datenschutzhinweise.',
        },
      ],
    },
    {
      heading: '9. Verschlüsselung',
      blocks: [
        {
          type: 'p',
          text: 'Diese Website nutzt eine TLS-Verschlüsselung. Sie erkennen sie an „https://" in der Adresszeile Ihres Browsers. Ihre Angaben im Bestellformular werden dadurch verschlüsselt übertragen.',
        },
      ],
    },
    {
      heading: '10. Ihre Rechte',
      blocks: [
        {
          type: 'p',
          text: 'Sie haben uns gegenüber folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:',
        },
        {
          type: 'list',
          items: [
            'Auskunft über die gespeicherten Daten (Art. 15 DSGVO)',
            'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
            'Löschung (Art. 17 DSGVO), soweit keine Aufbewahrungspflicht entgegensteht',
            'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
            'Datenübertragbarkeit (Art. 20 DSGVO) für Daten, die Sie uns zur Vertragserfüllung bereitgestellt haben',
          ],
        },
        {
          type: 'p',
          text: 'Widerspruchsrecht (Art. 21 DSGVO): Soweit wir Daten auf Grundlage unseres berechtigten Interesses verarbeiten (Art. 6 Abs. 1 lit. f DSGVO), können Sie dieser Verarbeitung jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben, widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
        },
        {
          type: 'p',
          text: `Für die Ausübung Ihrer Rechte genügt eine formlose Nachricht an ${site.contact.email} oder per Post an die oben genannte Anschrift.`,
        },
      ],
    },
    {
      heading: '11. Beschwerderecht bei der Aufsichtsbehörde',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt, können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist:',
        },
        {
          type: 'p',
          text: 'Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Postfach 20 04 44, 40102 Düsseldorf, Telefon 0211 38424-0, E-Mail poststelle@ldi.nrw.de, www.ldi.nrw.de',
        },
      ],
    },
    {
      heading: '12. Keine automatisierte Entscheidungsfindung',
      blocks: [
        {
          type: 'p',
          text: 'Wir treffen keine Entscheidungen, die ausschließlich auf einer automatisierten Verarbeitung einschließlich Profiling beruhen (Art. 22 DSGVO).',
        },
      ],
    },
  ],
} as const satisfies LegalDocument;
