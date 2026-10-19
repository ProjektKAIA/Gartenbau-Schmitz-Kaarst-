/**
 * Datenschutzerklärung (Art. 13 DSGVO) für die Website inkl. Material-Shop.
 * Entwurf – vor Veröffentlichung anwaltlich prüfen lassen.
 *
 * Stand der Technik laut Projekt: Hosting bei Vercel, keine Cookies, kein Tracking, keine
 * externen Schriften/Karten/Videos/Social-Plugins. Shop-Anfragen/-Bestellungen, Kontaktformular
 * und Online-Widerruf werden per SMTP als E-Mail versendet und nicht in einer Datenbank gespeichert.
 * Der Warenkorb liegt ausschließlich im sessionStorage des Browsers (lib/shop/cart-storage.ts).
 * Ändert sich daran etwas, muss dieser Text nachgezogen werden.
 */

import { site } from '@/lib/site';
import type { LegalDocument } from './types';

const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const datenschutz = {
  title: 'Datenschutzerklärung',
  updated: 'Oktober 2026',
  intro:
    'Hier erfahren Sie, welche personenbezogenen Daten wir verarbeiten, wenn Sie diese Website besuchen, uns über das Kontaktformular schreiben oder über den Shop Material anfragen oder bestellen, wofür wir sie verwenden und welche Rechte Sie haben.',
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
            'Der Warenkorb des Shops wird nur im Speicher Ihres Browsers (sessionStorage) abgelegt – technisch notwendig, ohne Cookie und ohne Tracking.',
            'Wenn Sie über den Shop anfragen oder bestellen, erhalten wir Ihre Angaben per E-Mail und verwenden sie für Ihre Anfrage bzw. Bestellung.',
            'Wenn Sie uns über das Kontaktformular schreiben, erhalten wir Ihre Angaben per E-Mail und verwenden sie für die Bearbeitung Ihres Anliegens.',
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
          // Quelle: vercel.com/docs/logs/runtime (Stand 28.08.2026) – Pro: 1 Tag, Pro mit
          // Observability Plus: 30 Tage. „Höchstens 30 Tage" stimmt für beide Einstellungen.
          type: 'p',
          text: 'Speicherdauer: In unserem Tarif (Vercel Pro) werden die Logdaten höchstens 30 Tage vorgehalten und danach nicht mehr gespeichert.',
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
      heading: '4. Anfragen und Bestellungen über den Shop',
      blocks: [
        {
          type: 'p',
          text: 'Warenkorb: Was Sie in den Warenkorb legen (Artikel und Mengen), speichern wir ausschließlich im sogenannten sessionStorage Ihres Browsers, damit der Warenkorb beim Wechsel zwischen den Seiten erhalten bleibt. Diese Daten verlassen Ihr Gerät erst, wenn Sie das Formular abschicken. Sie werden gelöscht, sobald Sie den Browser-Tab bzw. das Fenster schließen; Sie können sie auch jederzeit über die Einstellungen Ihres Browsers löschen. Es handelt sich nicht um ein Cookie, und die Daten werden nicht für Analyse- oder Werbezwecke verwendet. Die Speicherung ist für den von Ihnen gewünschten Warenkorb unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).',
        },
        {
          type: 'p',
          text: 'Wenn Sie über den Warenkorb eine Anfrage oder Bestellung abschicken, verarbeiten wir folgende Angaben:',
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
            'Ihre Bestätigung, dass Sie die AGB akzeptieren und die Datenschutzerklärung zur Kenntnis genommen haben',
          ],
        },
        {
          type: 'p',
          text: 'Wir verwenden diese Daten, um Ihre Anfrage zu beantworten (Preis und möglicher Liefertermin) bzw. Ihre Bestellung zu prüfen, mit Ihnen Rückfragen und den Liefertermin zu klären, die Ware zu beschaffen und zu liefern und die Rechnung zu stellen. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen und die Erfüllung des Vertrags mit Ihnen (Art. 6 Abs. 1 lit. b DSGVO).',
        },
        {
          type: 'p',
          text: 'Die Pflichtfelder sind für die Anfrage bzw. Bestellung erforderlich. Ohne diese Angaben können wir sie nicht bearbeiten und nicht liefern. Eine Nachricht ist freiwillig.',
        },
        {
          type: 'p',
          text: 'Technischer Ablauf: Ihre Angaben werden verschlüsselt an unseren Server bei Vercel übertragen, dort geprüft und als E-Mail an unser Postfach gesendet. Gleichzeitig erhalten Sie eine automatische Eingangsbestätigung an die angegebene E-Mail-Adresse. Wir speichern Anfrage und Bestellung nicht in einer Datenbank, sondern nur als E-Mail in unserem Postfach.',
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
      heading: '5. Kontaktformular',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir folgende Angaben:',
        },
        {
          type: 'list',
          items: [
            'Name und E-Mail-Adresse (Pflicht)',
            'Telefonnummer (freiwillig; erforderlich, wenn Sie einen Rückruf wünschen)',
            'den gewünschten Weg unserer Rückmeldung (E-Mail oder Telefon)',
            'Ihr Anliegen (Auswahl) und Ihre Nachricht (Pflicht)',
            'Adresse des Objekts (Straße, Postleitzahl, Ort) und gewünschter Zeitraum (freiwillig)',
            'Datum und Uhrzeit des Eingangs',
          ],
        },
        {
          type: 'p',
          text: 'Zweck: Wir verwenden die Angaben, um Ihr Anliegen zu bearbeiten, mit Ihnen auf dem gewünschten Weg Kontakt aufzunehmen und gegebenenfalls einen Termin vor Ort vorzubereiten. Geht es um einen möglichen oder bestehenden Auftrag, ist Rechtsgrundlage die Durchführung vorvertraglicher Maßnahmen bzw. die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Bei sonstigen Anfragen (z. B. allgemeine Fragen oder eine erste Kontaktaufnahme wegen einer Bewerbung) ist Rechtsgrundlage unser berechtigtes Interesse an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO).',
        },
        {
          type: 'p',
          text: 'Technischer Ablauf und Empfänger: Ihre Angaben werden verschlüsselt an unseren Server bei Vercel übertragen (Abschnitt 3), dort geprüft und als E-Mail an unser Postfach gesendet. Empfänger sind damit unser E-Mail-Versanddienst und der Anbieter unseres Postfachs, die jeweils in unserem Auftrag tätig sind (Art. 28 DSGVO; Angaben siehe Abschnitt 4). Eine Bestätigungs-E-Mail an Sie versenden wir nicht; nach dem Absenden sehen Sie direkt auf der Seite, dass Ihre Anfrage angekommen ist. Wir speichern die Anfrage nicht in einer Datenbank, sondern nur als E-Mail in unserem Postfach.',
        },
        {
          type: 'p',
          text: 'Schutz vor Missbrauch: Damit die Formulare dieser Website (Kontakt, Shop, Online-Widerruf) nicht massenhaft automatisiert genutzt werden, zählt unser Server kurzzeitig, wie viele Anfragen von einer IP-Adresse kommen. Diese Zählung liegt nur im Arbeitsspeicher und wird nach spätestens zehn Minuten verworfen. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren Betrieb der Formulare (Art. 6 Abs. 1 lit. f DSGVO).',
        },
        {
          type: 'p',
          text: 'Speicherdauer: Wir löschen Ihre Anfrage, sobald sie abschließend bearbeitet ist und keine Rückfragen mehr zu erwarten sind. Entsteht daraus ein Auftrag, gelten die gesetzlichen Aufbewahrungsfristen (Abschnitt 8).',
        },
      ],
    },
    {
      heading: '6. Online-Widerruf',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie einen Vertrag über die Funktion „Vertrag widerrufen" widerrufen, verarbeiten wir Ihren Namen, Ihre Angaben zum widerrufenen Vertrag, Ihre E-Mail-Adresse sowie Datum und Uhrzeit des Eingangs. Wir benötigen diese Daten, um den Widerruf zu bearbeiten und Ihnen den Eingang zu bestätigen, wozu wir gesetzlich verpflichtet sind (Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit § 356a BGB). Der Versand läuft über denselben Weg wie bei Bestellungen (Abschnitt 4).',
        },
      ],
    },
    {
      heading: '7. Kontakt per E-Mail oder Telefon',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten. Geht es um einen Auftrag oder eine Bestellung, ist Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, sonst unser berechtigtes Interesse an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO).',
        },
      ],
    },
    {
      heading: '8. Speicherdauer',
      blocks: [
        {
          type: 'p',
          text: 'Wir speichern Ihre Daten nur so lange, wie es für den jeweiligen Zweck nötig ist. Kommt ein Vertrag zustande, bewahren wir Bestellung, Schriftverkehr und Rechnung so lange auf, wie es das Handels- und Steuerrecht vorschreibt (§ 257 HGB, § 147 AO): empfangene und versandte Geschäftsbriefe in der Regel sechs Jahre, Rechnungen und andere Buchungsbelege in der Regel acht Jahre, jeweils ab Ende des Kalenderjahres. Rechtsgrundlage dafür ist Art. 6 Abs. 1 lit. c DSGVO. Danach löschen wir die Daten.',
        },
        {
          type: 'p',
          text: 'Kommt kein Vertrag zustande – etwa bei unverbindlichen Shop-Anfragen oder Kontaktanfragen ohne Auftrag –, löschen wir Ihre Angaben, sobald die Anfrage bzw. Bestellung abschließend bearbeitet ist und keine Rückfragen mehr zu erwarten sind.',
        },
        {
          type: 'todo',
          text: 'Konkrete Löschfrist für nicht angenommene Bestellungen und reine Kontaktanfragen mit dem Betrieb festlegen (z. B. sechs Monate) und hier eintragen.',
        },
      ],
    },
    {
      heading: '9. Links zu Instagram und Facebook',
      blocks: [
        {
          type: 'p',
          text: 'Auf unserer Website verlinken wir auf unsere Seiten bei Instagram und Facebook. Es handelt sich um einfache Links, keine eingebundenen Plugins. Beim Besuch unserer Website werden deshalb keine Daten an diese Dienste übertragen. Erst wenn Sie einen Link anklicken, gelangen Sie auf die Seite des jeweiligen Anbieters (Meta Platforms Ireland Limited); dort gelten dessen Datenschutzhinweise.',
        },
      ],
    },
    {
      heading: '10. Verschlüsselung',
      blocks: [
        {
          type: 'p',
          text: 'Diese Website nutzt eine TLS-Verschlüsselung. Sie erkennen sie an „https://" in der Adresszeile Ihres Browsers. Ihre Angaben in den Formularen (Kontakt, Shop, Online-Widerruf) werden dadurch verschlüsselt übertragen.',
        },
      ],
    },
    {
      heading: '11. Ihre Rechte',
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
      heading: '12. Beschwerderecht bei der Aufsichtsbehörde',
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
      heading: '13. Keine automatisierte Entscheidungsfindung',
      blocks: [
        {
          type: 'p',
          text: 'Wir treffen keine Entscheidungen, die ausschließlich auf einer automatisierten Verarbeitung einschließlich Profiling beruhen (Art. 22 DSGVO).',
        },
      ],
    },
  ],
} as const satisfies LegalDocument;
