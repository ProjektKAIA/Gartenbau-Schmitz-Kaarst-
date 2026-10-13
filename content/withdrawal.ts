/**
 * Texte der Online-Widerrufsfunktion (§ 356a BGB, gilt seit 19.06.2026).
 * Die Beschriftungen der beiden Schaltflächen sind gesetzlich vorgegeben – nicht umformulieren.
 */
export const withdrawalCopy = {
  entryLabel: 'Vertrag widerrufen',
  confirmLabel: 'Widerruf bestätigen',
  title: 'Vertrag widerrufen',
  intro:
    'Hier können Sie einen mit uns geschlossenen Vertrag online widerrufen. Bitte geben Sie Ihren Namen, den Vertrag und Ihre E-Mail-Adresse an. Im zweiten Schritt bestätigen Sie den Widerruf.',
  reviewTitle: 'Bitte prüfen Sie Ihre Angaben',
  reviewHint: 'Mit „Widerruf bestätigen" senden Sie Ihre Widerrufserklärung ab. Maßgeblich für die Frist ist der Zeitpunkt des Absendens.',
  backLabel: 'Angaben ändern',
  nextLabel: 'Weiter zur Bestätigung',
  sentTitle: 'Ihr Widerruf ist bei uns eingegangen',
  sentBody:
    'Wir haben Ihnen eine Eingangsbestätigung mit dem Inhalt Ihrer Erklärung sowie Datum und Uhrzeit des Eingangs per E-Mail geschickt. Die Wirksamkeit des Widerrufs haben wir damit noch nicht geprüft – wir melden uns bei Ihnen.',
  fields: {
    name: 'Ihr Name',
    contract: 'Welchen Vertrag möchten Sie widerrufen?',
    contractHint: 'z. B. Bestelldatum, Material und Menge, Lieferadresse – ggf. nur die Positionen, die Sie widerrufen.',
    email: 'E-Mail-Adresse für die Eingangsbestätigung',
  },
} as const;
