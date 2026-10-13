/**
 * Einsatzgebiete für die lokalen Landingpages unter `/gartenbau/[slug]`.
 * Einzige Quelle für Orte, Slugs und ortsbezogene Texte (Sitemap, Footer, Seiten, JSON-LD).
 *
 * Redaktionelle Regeln (gegen Doorway-Seiten und gegen falsche Versprechen):
 * - Jeder Ort hat eigenen Text – keine Kopie mit ausgetauschtem Ortsnamen.
 * - Ortsteile nur mit offiziellen, nachprüfbaren Namen.
 * - Keine erfundenen Projekte, Kunden, Referenzen, Preise oder Reaktionszeiten.
 * - Entfernung, Himmelsrichtung und Liefergebiet werden aus `center` berechnet (lib/areas.ts),
 *   nicht von Hand geschrieben.
 * - Slugs nicht umbenennen: der Footer und externe Links zeigen darauf.
 */

import { shopTerms } from '@/content/shop';
import type { GeoPoint } from '@/lib/geo';
import { site } from '@/lib/site';

export type AreaFocus = {
  readonly title: string;
  readonly body: string;
};

export type AreaFaq = {
  readonly question: string;
  readonly answer: string;
};

export type ServiceArea = {
  readonly slug: string;
  readonly city: string;
  /** Kreis, zu dem der Ort gehört – für die Einordnung im Text. */
  readonly county: string;
  /** Ortsmitte, auf zwei Nachkommastellen (~1 km) gerundet. */
  readonly center: GeoPoint;
  /** Title-Tag ohne Markenzusatz (der kommt über das Template im Layout). */
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly headline: string;
  readonly lead: string;
  /** Offizielle Stadt- bzw. Ortsteile. */
  readonly districts: readonly string[];
  readonly localTitle: string;
  readonly localBody: string;
  /** Leistungen, die vor Ort typischerweise angefragt werden – als Angebot formuliert. */
  readonly focus: readonly [AreaFocus, AreaFocus, AreaFocus];
  readonly faqs: readonly [AreaFaq, AreaFaq, AreaFaq, ...AreaFaq[]];
};

const radius = shopTerms.deliveryRadiusKm;

export const serviceAreas = [
  {
    slug: 'kaarst',
    city: 'Kaarst',
    county: 'Rhein-Kreis Neuss',
    center: site.geo,
    metaTitle: 'Gartenbau in Kaarst – Büttgen, Holzbüttgen, Vorst & Driesch',
    metaDescription:
      'Garten- und Landschaftsbau direkt aus Kaarst: Gestaltung, Pflaster- und Terrassenbau, Gartenpflege und Winterdienst in Kaarst, Büttgen, Holzbüttgen, Vorst und Driesch.',
    headline: 'Gartenbau in Kaarst – hier sind wir zu Hause.',
    lead: 'In Kaarst hat unser Betrieb seinen Sitz. Für Gärten in Büttgen, Holzbüttgen, Vorst, Driesch und Kaarst selbst sind die Wege kurz – das macht vor allem Leistungen einfach, die regelmäßig oder kurzfristig gebraucht werden.',
    districts: ['Kaarst', 'Büttgen', 'Holzbüttgen', 'Vorst', 'Driesch'],
    localTitle: 'Kurze Wege im eigenen Ort',
    localBody:
      'Wer in Kaarst wohnt, hat seinen Gartenbauer quasi um die Ecke. Eine Besichtigung vor Ort lässt sich unkompliziert einplanen, und bei Pflegeverträgen, Winterdienst oder nach einem Sturm ist die Anfahrt kein Thema. Von der ersten Beratung bis zur laufenden Pflege haben Sie einen festen Ansprechpartner.',
    focus: [
      {
        title: 'Regelmäßige Gartenpflege',
        body: 'Rasen, Beete, Hecken und Gehölze – einmalig oder in festen Abständen. Gerade bei wiederkehrenden Terminen zahlen sich die kurzen Wege innerhalb Kaarsts aus.',
      },
      {
        title: 'Winterdienst',
        body: 'Räumen und Streuen von Wegen und Zufahrten für Privathaushalte, Gewerbe und Hausverwaltungen. Umfang und Einsatzbedingungen stimmen wir vorab mit Ihnen ab.',
      },
      {
        title: 'Sturmschäden',
        body: 'Umgestürzte Gehölze, beschädigte Zäune oder Pflanzungen: Wir räumen auf und stellen die Außenanlage wieder her.',
      },
    ],
    faqs: [
      {
        question: 'Wo hat Gartenbau Kaarst seinen Sitz?',
        answer: `Unser Betrieb sitzt im ${site.address.street}, ${site.address.postalCode} ${site.address.city}. Von hier aus sind alle Kaarster Stadtteile in wenigen Minuten erreichbar.`,
      },
      {
        question: 'Arbeiten Sie in allen Kaarster Stadtteilen?',
        answer: 'Ja – in Kaarst-Mitte ebenso wie in Büttgen, Holzbüttgen, Vorst und Driesch.',
      },
      {
        question: 'Übernehmen Sie in Kaarst auch den Winterdienst?',
        answer:
          'Ja, Winterdienst gehört zu unseren Zusatzleistungen. Welche Flächen geräumt werden und unter welchen Bedingungen wir ausrücken, vereinbaren wir vor der Saison mit Ihnen. Streugut können Sie außerdem über unseren Shop bestellen.',
      },
      {
        question: 'Kann ich Kies oder Rindenmulch nach Kaarst liefern lassen?',
        answer: `Ja. Kaarst liegt mitten in unserem Liefergebiet von ca. ${radius} km. Material wählen Sie im Shop aus, den Liefertermin stimmen wir mit Ihnen ab.`,
      },
    ],
  },
  {
    slug: 'neuss',
    city: 'Neuss',
    county: 'Rhein-Kreis Neuss',
    center: { latitude: 51.2, longitude: 6.69 },
    metaTitle: 'Gartenbau Neuss – Gartenpflege, Terrassen & Grünanlagen',
    metaDescription:
      'Gartenbau für Neuss aus dem Nachbarort Kaarst: Pflege von Gärten und Grünanlagen für Privatkunden und Hausverwaltungen, Terrassen, Wege und Heckenschnitt.',
    headline: 'Gartenbau in Neuss – vom Stadtgarten bis zur Wohnanlage.',
    lead: 'Neuss grenzt direkt an Kaarst. Wir arbeiten dort für private Gartenbesitzer ebenso wie für Gewerbekunden und Hausverwaltungen – vom kompakten Reihenhausgarten bis zur Grünfläche einer Wohnanlage.',
    districts: ['Furth', 'Holzheim', 'Reuschenberg', 'Grimlinghausen', 'Weckhoven', 'Norf', 'Rosellen', 'Uedesheim'],
    localTitle: 'Großstadt mit vielen kleinen Gärten',
    localBody:
      'In einer Stadt wie Neuss ist Platz oft knapp. Kleine Gärten und Innenhöfe brauchen eine Planung, bei der jeder Quadratmeter zählt – und Gemeinschaftsflächen von Wohnanlagen eine Pflege, auf die sich Eigentümer und Verwaltung verlassen können. Beides gehört zu unserem Alltag.',
    focus: [
      {
        title: 'Grünflächenpflege für Hausverwaltungen',
        body: 'Rasen, Beete, Hecken und Wege von Wohnanlagen und Gewerbeobjekten – mit festem Ansprechpartner und abgestimmtem Pflegeplan.',
      },
      {
        title: 'Terrassen & Wege im kleinen Garten',
        body: 'Pflaster- und Natursteinflächen, die zum Grundstück passen und auch auf wenig Raum großzügig wirken.',
      },
      {
        title: 'Hecken-, Strauch- & Baumschnitt',
        body: 'Fachgerechter Schnitt, der die Pflanzen gesund hält – inklusive Abfuhr des Schnittguts.',
      },
    ],
    faqs: [
      {
        question: 'Arbeiten Sie in Neuss auch für Hausverwaltungen und Gewerbe?',
        answer:
          'Ja. Neben Privatkunden betreuen wir Außenanlagen für Gewerbekunden und Hausverwaltungen. Umfang und Rhythmus der Pflege legen wir gemeinsam fest.',
      },
      {
        question: 'Lohnt sich eine Umgestaltung auch für einen kleinen Stadtgarten?',
        answer:
          'Gerade dort. Eine durchdachte Aufteilung in Terrasse, Wege und Pflanzflächen macht aus wenig Fläche einen gut nutzbaren Außenraum. Bei einem Termin vor Ort klären wir, was sinnvoll ist.',
      },
      {
        question: 'Welche Neusser Stadtteile fahren Sie an?',
        answer:
          'Das gesamte Stadtgebiet – von Furth und Holzheim über die Innenstadt bis nach Norf, Rosellen und Uedesheim.',
      },
      {
        question: 'Wie läuft ein Gartenprojekt in Neuss ab?',
        answer:
          'In vier Schritten: Beratung vor Ort, Planung mit Materialauswahl, Ausführung durch unser Team und auf Wunsch die anschließende Pflege.',
      },
    ],
  },
  {
    slug: 'meerbusch',
    city: 'Meerbusch',
    county: 'Rhein-Kreis Neuss',
    center: { latitude: 51.25, longitude: 6.68 },
    metaTitle: 'Gartenbau Meerbusch – Gartengestaltung, Naturstein & Bewässerung',
    metaDescription:
      'Gartengestaltung in Meerbusch: Umgestaltung gewachsener Gärten, Terrassen und Wege aus Naturstein, Bewässerungssysteme und Pflege – für Büderich, Osterath, Strümp und Lank-Latum.',
    headline: 'Gartenbau in Meerbusch – gewachsene Gärten neu gedacht.',
    lead: 'Meerbusch grenzt an Kaarst und ist durch seine vielen Gärten geprägt. Oft geht es dort nicht um eine leere Fläche, sondern um einen Garten mit Geschichte, der an neue Ansprüche angepasst werden soll.',
    districts: ['Büderich', 'Osterath', 'Strümp', 'Lank-Latum', 'Ossum-Bösinghoven', 'Nierst', 'Langst-Kierst', 'Ilverich'],
    localTitle: 'Bestehendes erhalten, Neues ergänzen',
    localBody:
      'Alte Hecken, eingewachsene Gehölze und gewachsene Beete sind ein Wert, den man nicht leichtfertig ersetzt. Bei einer Umgestaltung prüfen wir deshalb zuerst, was bleiben kann – und ergänzen dann Terrasse, Wege oder Pflanzungen so, dass Alt und Neu zusammenpassen.',
    focus: [
      {
        title: 'Neu- und Umgestaltung',
        body: 'Vom Konzept bis zur Pflanzung: Wir planen Veränderungen so, dass der vorhandene Charakter des Gartens erhalten bleibt.',
      },
      {
        title: 'Naturstein, Terrassen & Wege',
        body: 'Flächen aus Natur- und Betonstein mit tragfähigem Unterbau – passend zu Haus, Grundstück und Pflanzung.',
      },
      {
        title: 'Bewässerungssysteme',
        body: 'Planung, Installation und Wartung von Bewässerung, damit größere Pflanzflächen auch in trockenen Sommern versorgt sind.',
      },
    ],
    faqs: [
      {
        question: 'Gestalten Sie auch bestehende Gärten um, ohne alles neu anzulegen?',
        answer:
          'Ja, das ist sogar der häufigere Fall. Wir sehen uns den Bestand vor Ort an und schlagen vor, was erhalten, ergänzt oder ersetzt werden sollte.',
      },
      {
        question: 'Bauen Sie in Meerbusch auch Bewässerungsanlagen ein?',
        answer:
          'Ja. Wir planen und installieren Bewässerungssysteme und übernehmen auf Wunsch die Wartung, etwa die Inbetriebnahme im Frühjahr und das Entleeren vor dem Frost.',
      },
      {
        question: 'Kommen Sie auch nach Lank-Latum und Ossum-Bösinghoven?',
        answer:
          'Ja, wir arbeiten in allen Meerbuscher Stadtteilen – von Büderich und Osterath bis in den Norden nach Lank-Latum, Nierst und Ossum-Bösinghoven.',
      },
    ],
  },
  {
    slug: 'korschenbroich',
    city: 'Korschenbroich',
    county: 'Rhein-Kreis Neuss',
    center: { latitude: 51.19, longitude: 6.51 },
    metaTitle: 'Gartenbau Korschenbroich – Pflaster, Einfahrten & Rasen',
    metaDescription:
      'Garten- und Landschaftsbau in Korschenbroich, Kleinenbroich, Glehn, Pesch und Liedberg: Pflaster und Einfahrten, Rasenanlage, Mähroboter und Gartenpflege aus dem Nachbarort Kaarst.',
    headline: 'Gartenbau in Korschenbroich – solide Flächen, gepflegtes Grün.',
    lead: 'Korschenbroich ist unser direkter Nachbar auf dem Weg nach Mönchengladbach. Viele Anfragen von dort drehen sich um Flächen, die täglich genutzt werden: Einfahrten, Wege und der Rasen hinter dem Haus.',
    districts: ['Korschenbroich', 'Kleinenbroich', 'Glehn', 'Pesch', 'Liedberg'],
    localTitle: 'Flächen, die im Alltag halten',
    localBody:
      'Eine Einfahrt, über die jeden Tag ein Auto rollt, braucht einen anderen Aufbau als ein Gartenweg. Wir planen Tragschicht, Bettung und Belag nach der tatsächlichen Belastung – und sorgen dafür, dass Regenwasser sauber abläuft.',
    focus: [
      {
        title: 'Einfahrten & Pflasterarbeiten',
        body: 'Pflaster- und Natursteinflächen mit tragfähigem Unterbau, Einfassungen und durchdachter Entwässerung.',
      },
      {
        title: 'Rasen, Beete & Pflanzung',
        body: 'Neuanlage oder Sanierung von Rasenflächen sowie Beete, die zum Grundstück und zum Pflegeaufwand passen.',
      },
      {
        title: 'Mähroboter',
        body: 'Einrichtung inklusive Begrenzungskabel und Service – damit der Rasen gepflegt bleibt, ohne dass Sie selbst mähen müssen.',
      },
    ],
    faqs: [
      {
        question: 'Pflastern Sie in Korschenbroich auch Einfahrten?',
        answer:
          'Ja. Einfahrten, Stellplätze, Wege und Terrassen gehören zu unseren Kernleistungen – inklusive Unterbau, Einfassung und Entwässerung.',
      },
      {
        question: 'Richten Sie auch Mähroboter ein?',
        answer:
          'Ja. Wir verlegen das Begrenzungskabel, richten den Mähroboter auf Ihr Grundstück ein und kümmern uns auf Wunsch um den Service.',
      },
      {
        question: 'Fahren Sie auch nach Glehn, Pesch und Liedberg?',
        answer: 'Ja, alle Korschenbroicher Ortsteile gehören zu unserem Einsatzgebiet.',
      },
      {
        question: 'Wie bekomme ich ein Angebot für mein Grundstück?',
        answer:
          'Schildern Sie uns Ihr Vorhaben über das Kontaktformular oder telefonisch. Wir vereinbaren einen Termin vor Ort und erstellen danach ein Angebot.',
      },
    ],
  },
  {
    slug: 'dormagen',
    city: 'Dormagen',
    county: 'Rhein-Kreis Neuss',
    center: { latitude: 51.1, longitude: 6.84 },
    metaTitle: 'Gartenbau Dormagen – Gartengestaltung, Terrassen & Wege',
    metaDescription:
      'Gartengestaltung, Terrassen- und Wegebau in Dormagen, Nievenheim, Delrath, Zons und Hackenbroich – geplant und ausgeführt von Gartenbau Kaarst.',
    headline: 'Gartenbau in Dormagen – gut geplante Projekte am Rhein.',
    lead: 'Dormagen liegt im Süden des Rhein-Kreises Neuss, zwischen Neuss und Köln. Die Anfahrt ist länger als zu unseren direkten Nachbarn – deshalb eignen sich vor allem gut planbare Vorhaben wie Neu- und Umgestaltungen oder der Bau von Terrassen und Wegen.',
    districts: ['Nievenheim', 'Delrath', 'Zons', 'Stürzelberg', 'Hackenbroich', 'Horrem', 'Delhoven'],
    localTitle: 'Planung, die den Weg lohnt',
    localBody:
      'Bei Projekten in Dormagen klären wir beim ersten Termin vor Ort möglichst viel: Maße, Untergrund, Zufahrt für Material und Maschinen. So lässt sich die Ausführung in zusammenhängenden Bauabschnitten planen. Ob sich zusätzlich eine regelmäßige Pflege einrichten lässt, besprechen wir für Ihren Ortsteil individuell.',
    focus: [
      {
        title: 'Terrassen & Gartenwege',
        body: 'Neue Terrassen- und Wegeflächen aus Pflaster oder Naturstein – von der Planung bis zur fertigen Fläche.',
      },
      {
        title: 'Neu- und Umgestaltung',
        body: 'Gärten, die neu angelegt oder grundlegend verändert werden sollen, begleiten wir von der Beratung bis zur Pflanzung.',
      },
      {
        title: 'Einfassungen & Zäune',
        body: 'Saubere Kanten zwischen Rasen, Beet und Weg sowie Zäune, die Grundstücke klar abgrenzen.',
      },
    ],
    faqs: [
      {
        question: 'Arbeiten Sie trotz der Entfernung in Dormagen?',
        answer:
          'Ja. Dormagen gehört zu unserem Einsatzgebiet. Am besten passen Vorhaben, die sich gut planen lassen – etwa Neugestaltungen, Terrassen oder Wege.',
      },
      {
        question: 'Übernehmen Sie in Dormagen auch regelmäßige Gartenpflege?',
        answer:
          'Sprechen Sie uns an. Ob und in welchem Rhythmus sich eine regelmäßige Pflege einrichten lässt, klären wir je nach Ortsteil und Umfang.',
      },
      {
        question: 'Liefern Sie Material nach Zons oder Nievenheim?',
        answer: `Dormagen liegt innerhalb unseres Liefergebiets von ca. ${radius} km um Kaarst. Für Adressen am südlichen Stadtrand fragen Sie bitte kurz nach, bevor Sie bestellen.`,
      },
    ],
  },
  {
    slug: 'willich',
    city: 'Willich',
    county: 'Kreis Viersen',
    center: { latitude: 51.26, longitude: 6.55 },
    metaTitle: 'Gartenbau Willich – Hecken, Zäune & Gartenpflege',
    metaDescription:
      'Gartenbau in Willich, Schiefbahn, Anrath und Neersen: Hecken- und Gehölzschnitt, Zäune und Einfassungen, Gartenpflege und Gestaltung – aus dem benachbarten Kaarst.',
    headline: 'Gartenbau in Willich – über die Kreisgrenze hinweg.',
    lead: 'Willich gehört zum Kreis Viersen und grenzt direkt an Kaarst. Für uns spielt die Kreisgrenze keine Rolle: Schiefbahn, Anrath, Neersen und Willich selbst liegen in unserem direkten Umfeld.',
    districts: ['Willich', 'Schiefbahn', 'Anrath', 'Neersen'],
    localTitle: 'Grenzen, die man sehen soll – und solche, die wachsen',
    localBody:
      'Ob Zaun, Sichtschutz oder Hecke: Die Grenze zum Nachbarn prägt einen Garten mehr als man denkt. Wir setzen Zäune und Einfassungen und schneiden Hecken so, dass sie dicht bleiben und gesund wachsen.',
    focus: [
      {
        title: 'Hecken- & Gehölzschnitt',
        body: 'Form- und Pflegeschnitt von Hecken, Sträuchern und Bäumen – fachgerecht und zur richtigen Jahreszeit.',
      },
      {
        title: 'Zäune & Einfassungen',
        body: 'Zäune, Sichtschutz und Einfassungen, die Grundstücke sauber gliedern und lange halten.',
      },
      {
        title: 'Garten- & Grünflächenpflege',
        body: 'Einmalige Pflegeeinsätze, etwa im Frühjahr oder Herbst, oder eine regelmäßige Betreuung Ihres Gartens.',
      },
    ],
    faqs: [
      {
        question: 'Arbeiten Sie auch außerhalb des Rhein-Kreises Neuss, zum Beispiel in Willich?',
        answer:
          'Ja. Willich grenzt direkt an Kaarst und gehört selbstverständlich zu unserem Einsatzgebiet – mit allen Stadtteilen.',
      },
      {
        question: 'Wann darf eine Hecke geschnitten werden?',
        answer:
          'Starke Rückschnitte und das Entfernen von Hecken sind nach dem Bundesnaturschutzgesetz vom 1. März bis 30. September nicht erlaubt. Schonende Form- und Pflegeschnitte sind ganzjährig möglich – vorher prüfen wir, ob Vögel in der Hecke brüten.',
      },
      {
        question: 'Setzen Sie auch Zäune und Sichtschutz?',
        answer:
          'Ja. Zäune und Einfassungen gehören zu unseren Bauleistungen – inklusive Fundamenten und passendem Anschluss an Beete und Wege.',
      },
      {
        question: 'Fahren Sie nach Anrath und Neersen?',
        answer: 'Ja, alle vier Willicher Stadtteile – Willich, Schiefbahn, Anrath und Neersen – liegen in unserem Einsatzgebiet.',
      },
    ],
  },
  {
    slug: 'grevenbroich',
    city: 'Grevenbroich',
    county: 'Rhein-Kreis Neuss',
    center: { latitude: 51.09, longitude: 6.59 },
    metaTitle: 'Gartenbau Grevenbroich – Pflanzung, Bewässerung & Pflege',
    metaDescription:
      'Gartenbau in Grevenbroich, Wevelinghoven, Kapellen, Hemmerden und Elsen: Pflanzungen, Bewässerungssysteme, Gartenpflege und Gestaltung von Gartenbau Kaarst.',
    headline: 'Gartenbau in Grevenbroich – Pflanzen, die gut anwachsen.',
    lead: 'Grevenbroich liegt an der Erft im Rhein-Kreis Neuss. Wir unterstützen dort bei neuen Pflanzungen, bei der Bewässerung und bei der Pflege – damit ein Garten nicht nur am ersten Tag gut aussieht.',
    districts: ['Wevelinghoven', 'Kapellen', 'Hemmerden', 'Elsen', 'Orken', 'Gustorf', 'Neukirchen'],
    localTitle: 'Gut gepflanzt ist halb gepflegt',
    localBody:
      'Ob Beet, Hecke oder Baum: Standort, Bodenvorbereitung und die richtige Pflanzzeit entscheiden darüber, wie gut eine Pflanzung anwächst. Eine passende Bewässerung hilft in den ersten Jahren über trockene Phasen – und spart später viel Arbeit.',
    focus: [
      {
        title: 'Beete & Pflanzung',
        body: 'Auswahl und Pflanzung von Stauden, Sträuchern und Gehölzen, abgestimmt auf Standort und gewünschten Pflegeaufwand.',
      },
      {
        title: 'Bewässerungssysteme',
        body: 'Tropf- und Sprühbewässerung für Beete und Rasen – geplant, installiert und auf Wunsch gewartet.',
      },
      {
        title: 'Garten- & Grünflächenpflege',
        body: 'Pflege für private Gärten und für Außenanlagen von Gewerbekunden, einmalig oder regelmäßig.',
      },
    ],
    faqs: [
      {
        question: 'Wann ist die beste Zeit für neue Pflanzungen?',
        answer:
          'Für Gehölze und Hecken mit Wurzelballen sind Herbst und Frühjahr ideal. Pflanzen im Container lassen sich fast das ganze Jahr setzen, solange der Boden nicht gefroren ist – im Sommer brauchen sie dann mehr Wasser.',
      },
      {
        question: 'Lohnt sich eine automatische Bewässerung?',
        answer:
          'Bei größeren Beeten, neuen Pflanzungen oder viel Rasenfläche oft ja. Wir sehen uns die Flächen an und schlagen ein System vor, das zu Garten und Wasseranschluss passt.',
      },
      {
        question: 'Kommen Sie auch nach Kapellen und Wevelinghoven?',
        answer:
          'Ja. Wir arbeiten im gesamten Grevenbroicher Stadtgebiet, von Kapellen und Wevelinghoven im Norden bis nach Elsen, Orken und Gustorf.',
      },
    ],
  },
] as const satisfies readonly ServiceArea[];

export type ServiceAreaSlug = (typeof serviceAreas)[number]['slug'];

/** Feste Texte der Ortsseiten; ortsbezogene Inhalte stehen in `serviceAreas`. */
export const areaPageCopy = {
  breadcrumbLabel: 'Seitenpfad',
  eyebrow: (county: string) => `Einsatzgebiet · ${county}`,
  ctaProject: (city: string) => `Projekt in ${city} anfragen`,
  ctaShop: 'Material bestellen',
  factLocation: 'Lage',
  factDistricts: 'Ortsteile',
  factDelivery: 'Materiallieferung',
  locationHome: `Firmensitz im ${site.address.street}`,
  locationNearby: (km: number, direction: string) => `ca. ${km} km Luftlinie ${direction} des Betriebs in Kaarst`,
  deliveryIn: `Im Liefergebiet (ca. ${radius} km um Kaarst)`,
  deliveryOut: 'Außerhalb des Liefergebiets – bitte anfragen',
  districtsTitle: (city: string) => `Ortsteile von ${city}`,
  focusLabel: (city: string) => `Gefragt in ${city}`,
  focusTitle: 'Leistungen vor Ort',
  focusLink: 'Alle Leistungen ansehen',
  deliveryTitle: (city: string) => `Material nach ${city} liefern lassen`,
  deliveryBody: (city: string) =>
    `Kies, Schotter, Sand, Rindenmulch und Streugut liefern wir an Privatkunden im Umkreis von ca. ${radius} km um Kaarst bis zum Haus – ${city} gehört dazu. Material, Körnung und Menge wählen Sie im Shop, den Liefertermin stimmen wir mit Ihnen ab.`,
  deliveryLink: 'Zum Material-Shop',
  faqTitle: (city: string) => `Häufige Fragen aus ${city}`,
  ctaTitle: (city: string) => `Ihr Garten in ${city}?`,
  ctaBody:
    'Schildern Sie uns kurz Ihr Vorhaben. Wir melden uns persönlich und vereinbaren bei Bedarf einen Termin vor Ort.',
  othersTitle: 'Weitere Einsatzgebiete',
} as const;
