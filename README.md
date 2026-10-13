# Gartenbau Kaarst — Matthias Schmitz

Website-Relaunch für einen Garten- und Landschaftsbaubetrieb in Kaarst: Startseite,
Material-Shop, Rechtstexte und Online-Widerruf.

Gewählt wurde das bildstarke, serifenlose Design mit großem Hero (vormals Branch
`entwurf`). Es liegt auf `main`; die zweite Variante (`Version1`) ist verworfen.
Vorschau: https://gartenbau-kaarst-entwurf.vercel.app

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components) |
| UI | React 19, Tailwind CSS 4 (CSS-first `@theme`) |
| Sprache | TypeScript 6, `strict` plus verschärfte Flags |
| Hosting | Vercel, Node 24 |

TypeScript läuft nicht nur mit `strict`, sondern zusätzlich mit
`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`,
`noFallthroughCasesInSwitch`, `noUnusedLocals` und `noUnusedParameters`.
Kein `any` im Projekt; der einzige Typ-Cast ist kommentiert (React typisiert
CSS-Custom-Properties nicht).

## Aufbau

```
app/              Routen: Startseite, Shop, Rechtsseiten, Widerruf, API (shop-order, withdrawal)
components/
  layout/         Kopf- und Fußzeile
  sections/       Je eine Komponente pro Abschnitt der Startseite
  shop/, legal/, withdrawal/  Shop, Rechtsseiten, Widerrufsformular
  ui/             Primitive: Button, Eyebrow, Reveal, Formularfelder
content/          Texte: home.ts, shop.ts (Katalog + Preise), withdrawal.ts, legal/
lib/              Reine Logik (Shop, Formulare, Rate-Limit, Widerruf) mit Tests
services/mail.ts  Mailversand (Nodemailer) – einziger Ort mit SMTP-Zugriff
types/            Zod-Schemas – Schema-Wahrheit für Formulare und API
lib/site.ts       Stammdaten des Betriebs — einzige Quelle
lib/cn.ts         Klassen zusammenfügen
```

Zwei Regeln halten das zusammen:

**Jede Angabe genau einmal.** Telefonnummer, E-Mail, Adresse und USt-IdNr. stehen
ausschließlich in `lib/site.ts` und werden überall importiert. Eine Nummer zu
ändern heißt, eine Zeile zu ändern.

**Texte getrennt von Darstellung.** Die Komponenten enthalten kein Copy, nur
Layout. Wer eine Formulierung ändern will, öffnet `content/home.ts` und kommt mit
keiner Klasse in Berührung.

## Barrierefreiheit

Ziel ist WCAG 2.2 Level AA:

- Skip-Link, durchgehende Tastaturbedienung, sichtbarer Fokus mit Abstand zum Element
- Navigation mit Unterpunkten öffnet bei Hover und bei Tastaturfokus
- Bedienelemente mindestens 44 px hoch
- Dekorative Grafiken sind konsequent `aria-hidden`, Bilder mit Aussage haben eine Beschreibung
- `prefers-reduced-motion` schaltet Einblend- und Übergangseffekte ab

Breakpoints liegen bei 590, 820 und 1050 px. Geprüft wird zusätzlich bei
1280 px, weil Windows-Anzeigeskalierung von 150 % aus einem 1920-px-Monitor
genau diese Breite macht — dort bricht eine Desktop-Navigation zuerst.

## Entwicklung

```bash
npm install
npm run dev          # http://localhost:3000

npm run lint
npm run typecheck
npm run test
npm run build
```

### Shop und Mailversand

Der Material-Shop (`/shop`) hat kein Zahlungssystem (Zahlung auf Rechnung). Bestellungen
(Knopf „zahlungspflichtig bestellen", § 312j BGB) gehen an `POST /api/shop-order`; der
Server prüft sie mit Zod, rechnet die Preise selbst aus `content/shop.ts` und verschickt
per Nodemailer zwei Mails: an den Betrieb und eine Eingangsbestätigung mit AGB und
Widerrufsbelehrung an den Kunden. Produkte und Preise stehen ausschließlich in
`content/shop.ts`.

Online-Widerruf (§ 356a BGB): Knopf „Vertrag widerrufen" im Footer jeder Seite →
`/vertrag-widerrufen` (zweistufig) → `POST /api/withdrawal` mit Eingangszeitpunkt.
Rechtstexte liegen als Daten in `content/legal/` (Entwürfe, anwaltlich zu prüfen).

Benötigte Umgebungsvariablen (Vorlage: `.env.example`; lokal in `.env.local`, auf
Vercel im Dashboard, nie committen):

| Variable | Zweck |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | SMTP-Server des Mail-Anbieters (465/`true` oder 587/`false`) |
| `SMTP_USER`, `SMTP_PASS` | Zugangsdaten des Absender-Postfachs |
| `MAIL_FROM` | Absender, z. B. `Gartenbau Kaarst <shop@gartenbau-kaarst.de>` |
| `MAIL_TO` | Empfänger der Anfragen im Betrieb |

Fehlen sie, antwortet die API mit 503 und das Formular nennt die Telefonnummer.
Die Begrenzung auf 5 Anfragen pro IP in 10 Minuten gilt je Funktionsinstanz; für ein
hartes Limit eine Rate-Limit-Regel in der Vercel Firewall auf `/api/shop-order` und
`/api/withdrawal` setzen.

Deployment:

```bash
vercel link --yes --project gartenbau-kaarst-entwurf
vercel deploy --prod
```

## Stand

Offen ist:

- Die Projektbilder sind Platzhalter und werden durch echte Referenzfotos ersetzt.
- AGB, Widerrufsbelehrung und Datenschutzerklärung sind recherchierte Entwürfe mit
  markierten offenen Punkten („Offen:") und müssen vor dem Livegang anwaltlich geprüft werden.
- Shop-Preise stehen auf 0 € (Anzeige „Preis folgt"). Bis dahin läuft der Shop im
  Vorschau-Modus (`shopTerms.ordersOpen: false` in `content/shop.ts`): Katalog und
  Bestellliste funktionieren, bestellt wird per Telefon oder E-Mail, die API nimmt nichts an.
  Freischalten erst mit echten Preisen und geprüften Rechtstexten – ein Test verhindert
  das Freischalten, solange ein Preis fehlt.
- Kontakt läuft über `mailto:`; der Shop verschickt Anfragen serverseitig (s. oben).

## Rechtliches

Kundenprojekt, veröffentlicht als Arbeitsprobe. Logo, Firmenname und Inhalte
gehören Gartenbau Matthias Schmitz. Die Kontaktdaten im Code entsprechen dem
öffentlichen Impressum des Betriebs. Keine Lizenz zur Weiterverwendung des Codes
oder der Inhalte.
