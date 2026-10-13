/**
 * Widerrufsbelehrung und Muster-Widerrufsformular für die Materiallieferung.
 * Entwurf – vor Veröffentlichung anwaltlich prüfen lassen.
 *
 * Grundlage: Muster-Widerrufsbelehrung nach Anlage 1 zu Art. 246a § 1 Abs. 2 Satz 2 EGBGB
 * in der Fassung ab 19.06.2026 (BGBl. 2026 I Nr. 28) und Muster-Widerrufsformular nach Anlage 2.
 * Gewählte Gestaltungshinweise: 1 b) Kaufvertrag, 2 Kontaktdaten, 3 Online-Widerrufsfunktion
 * (§ 356a BGB), 5 a) „Wir holen die Waren ab", 5 b) Kosten mit Schätzung (Ware nicht
 * postversandfähig), 5 c) Wertverlust. Hinweis 4 entfällt, weil wir die Abholung anbieten.
 * Die Abschnitte „Widerrufsrecht" und „Folgen des Widerrufs" folgen dem Mustertext wörtlich –
 * nicht umformulieren, sonst entfällt die Gesetzlichkeitsfiktion (Art. 246a § 1 Abs. 2 Satz 2 EGBGB).
 */

import { site } from '@/lib/site';
import type { LegalDocument } from './types';

const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const widerruf = {
  title: 'Widerrufsbelehrung',
  updated: 'Oktober 2026',
  intro:
    'Verbraucher haben bei Bestellungen über unseren Shop ein Widerrufsrecht nach Maßgabe der folgenden Belehrung.',
  sections: [
    {
      heading: 'Widerrufsrecht',
      blocks: [
        {
          type: 'p',
          text: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
        },
        {
          type: 'p',
          text: 'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.',
        },
        {
          type: 'p',
          text: `Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${site.owner}, ${site.legalName}, ${address}, Telefon ${site.contact.phone}, E-Mail ${site.contact.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.`,
        },
        {
          type: 'p',
          text: 'Sie können Ihr Widerrufsrecht auch online auf dieser Website über die Schaltfläche „Vertrag widerrufen" ausüben, die auf jeder Seite verfügbar ist. Wenn Sie diese Online-Funktion nutzen, übermitteln wir Ihnen auf einem dauerhaften Datenträger (z. B. durch eine E-Mail) unverzüglich eine Eingangsbestätigung mit Informationen zum Inhalt der Widerrufserklärung sowie dem Datum und der Uhrzeit ihres Eingangs.',
        },
        {
          type: 'p',
          text: 'Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.',
        },
      ],
    },
    {
      heading: 'Folgen des Widerrufs',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.',
        },
        {
          type: 'p',
          text: 'Wir holen die Waren ab.',
        },
        {
          type: 'p',
          text: 'Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.',
        },
        {
          type: 'todo',
          text: 'Pflichtangabe ergänzen, weil Schüttgut und schwere Sackware nicht normal mit der Post zurückgesandt werden können: „Die Kosten werden auf höchstens etwa … EUR geschätzt." (z. B. Kosten einer Abholfahrt im Liefergebiet). Alternative: Der Betrieb übernimmt die Kosten – dann beide Sätze ersetzen durch „Wir holen die Waren ab." und „Wir tragen die Kosten der Rücksendung der Waren."',
        },
        {
          type: 'p',
          text: 'Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.',
        },
      ],
    },
    {
      heading: 'Ausschluss des Widerrufsrechts',
      blocks: [
        {
          type: 'p',
          text: 'Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, wenn diese nach der Lieferung auf Grund ihrer Beschaffenheit untrennbar mit anderen Gütern vermischt wurden (§ 312g Abs. 2 Nr. 4 BGB). Das kann zum Beispiel der Fall sein, wenn Sand, Erde, Rinde oder Streugut bereits ausgebracht, eingearbeitet oder mit anderem Material vermischt wurden. Solange die Ware unverändert dort liegt, wo wir sie abgeladen haben, besteht das Widerrufsrecht.',
        },
      ],
    },
    {
      heading: 'Muster-Widerrufsformular',
      blocks: [
        {
          type: 'p',
          text: '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)',
        },
        {
          type: 'list',
          items: [
            `An ${site.owner}, ${site.legalName}, ${address}, E-Mail: ${site.contact.email}:`,
            'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)',
            'Bestellt am (*)/erhalten am (*)',
            'Name des/der Verbraucher(s)',
            'Anschrift des/der Verbraucher(s)',
            'Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)',
            'Datum',
          ],
        },
        {
          type: 'p',
          text: '(*) Unzutreffendes streichen.',
        },
      ],
    },
  ],
} as const satisfies LegalDocument;
