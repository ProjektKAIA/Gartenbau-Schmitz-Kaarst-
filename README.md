# Gartenbau Kaarst — Matthias Schmitz

Website-Relaunch für einen Garten- und Landschaftsbaubetrieb in Kaarst.
Zwei Design-Varianten, jede vollständig umgesetzt und deployed, damit der Kunde
nicht an Bildschirmfotos, sondern an der fertigen Seite entscheiden kann.

| Branch     | Variante                             | Live                                           |
| ---------- | ------------------------------------ | ---------------------------------------------- |
| `main`     | Fundament ohne Design                | –                                              |
| `Version1` | Editorial, Serifen, Vorher-Nachher   | https://gartenbau-kaarst-version1.vercel.app   |
| `entwurf`  | Bildstark, serifenlos, Karten-Layout | https://gartenbau-kaarst-entwurf.vercel.app    |

`main` enthält nur, was beide Varianten teilen: Toolchain, Stammdaten und die
rechtlichen Seiten. Die beiden Design-Branches zweigen davon ab und laufen als
getrennte Vercel-Projekte.

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
app/              Routen: Startseite, Impressum, Datenschutz
components/
  layout/         Kopf- und Fußzeile
  sections/       Je eine Komponente pro Abschnitt der Startseite
  ui/             Primitive: Button, Eyebrow, Reveal, Vorher-Nachher-Regler
content/home.ts   Sämtliche Texte der Startseite
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
- Der Vorher-Nachher-Regler ist ein echter `<input type="range">` mit `aria-valuetext`,
  also auch ohne Maus bedienbar
- Bedienelemente mindestens 44 px hoch
- Dekorative Grafiken sind konsequent `aria-hidden`, Bilder mit Aussage haben eine Beschreibung
- `prefers-reduced-motion` schaltet Einblend- und Übergangseffekte ab

Breakpoints liegen bei 560/590, 820 und 1050 px. Geprüft wird zusätzlich bei
1280 px, weil Windows-Anzeigeskalierung von 150 % aus einem 1920-px-Monitor
genau diese Breite macht — dort bricht eine Desktop-Navigation zuerst.

## Entwicklung

```bash
npm install
npm run dev          # http://localhost:3000

npm run lint
npm run typecheck
npm run build
```

Deployment pro Branch:

```bash
vercel link --yes --project gartenbau-kaarst-version1   # bzw. gartenbau-kaarst-entwurf
vercel deploy --prod
```

## Stand

Beide Varianten sind vollständig gebaut und live. Offen ist:

- Der Kunde entscheidet sich für eine Variante; die andere Branch wird dann archiviert.
- Die Projektbilder sind Platzhalter und werden durch echte Referenzfotos ersetzt.
- Die Datenschutzerklärung ist bewusst ein Platzhalter (`noindex`): Die bestehende
  beschreibt Webflow als Hoster und passt zu diesem Deployment nicht.
- Kontakt läuft über `mailto:`; ein Formular mit serverseitiger Validierung folgt.
- `package-lock.json` wird beim ersten lokalen `npm install` erzeugt und nachgereicht.

## Rechtliches

Kundenprojekt, veröffentlicht als Arbeitsprobe. Logo, Firmenname und Inhalte
gehören Gartenbau Matthias Schmitz. Die Kontaktdaten im Code entsprechen dem
öffentlichen Impressum des Betriebs. Keine Lizenz zur Weiterverwendung des Codes
oder der Inhalte.
