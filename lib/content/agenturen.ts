import type { ServiceBlock, ServiceFact } from "@/lib/leistungen";
import type { LocalImage } from "./types";

/**
 * Inhalt der Unterseite `/partner-fuer-agenturen`.
 *
 * **Herkunft:** Der Text ist die eigene Copy von make/c. Die alte
 * WordPress-Seite hatte unter **demselben Pfad** eine Seite „Partner für
 * Agenturen", die bis heute in Google steht — die neue Seite übernimmt deshalb
 * die Adresse unverändert, damit das Ranking nicht verloren geht. Aus der alten
 * Fassung übernommen sind Argumentation, Tonfall und die Formulierungen
 * („skalierbar, spezialisiert & uneitel", „wir segeln unter Eurer Flagge").
 *
 * ⚠️ **Die Zahlen der alten Seite sind bewusst NICHT übernommen.** Dort stand
 * „über 120 festangestellte Video-Profis" und „5.000+ Videos" — die Startseite
 * sagt heute „> 100 feste Mitarbeiter im Firmennetzwerk" und „> 10.000 Videos
 * in über 3.000 Projekten" (`lib/content/landing.ts`). Hier gilt der aktuelle
 * Stand; zwei verschiedene Zahlen auf derselben Website wären schlimmer als
 * gar keine.
 *
 * ⚠️ **Drei Angaben stammen unbestätigt aus der alten Seite** und gehören
 * gegengelesen, bevor die Seite indexiert wird: die Vorlaufzeit „7 bis 14 Tage",
 * das „eigene Greenbox-Studio" und die Aussage zu Retainern und
 * Rahmenverträgen. Sie sind unten jeweils mit ⚠️ markiert.
 */

export const AGENTUR_PAGE = {
  kicker: "Für Agenturen",
  /** MixedHeadline part1 (Gotham Bold Italic) */
  titlePart1: "Partner für",
  /** MixedHeadline part2 (Garamond SemiBold Italic) */
  titlePart2: "Agenturen",
  /** Für Metadata, JSON-LD und Brotkrume — die Headline als reiner Text. */
  h1Plain: "Partner für Agenturen",

  intro:
    "Warum sind wir der optimale Video-Partner für Eure Agentur? Wir haben schon für und mit vielen Agenturen zusammengearbeitet. Viele Agenturen stehen vor der Frage, inwieweit sie sich eine eigene Video-Unit aufbauen sollen — und kommen dabei zu den unterschiedlichsten Ergebnissen. Wie das Ergebnis auch aussieht: früher oder später könnt Ihr uns gebrauchen.",

  facts: [
    {
      label: "Zusammenarbeit",
      value:
        "Als verlängerte Werkbank oder als Ergänzung Eures Teams — an genau den Punkten, an denen Ihr Unterstützung braucht.",
    },
    {
      label: "Auftritt beim Kunden",
      value:
        "Wir segeln unter Eurer Flagge. Beim Endkunden taucht make/c nur auf, wenn Ihr es wollt.",
    },
    {
      label: "Kapazität",
      value:
        "Über 100 feste Mitarbeiter im Firmennetzwerk, Standorte in Köln und Essen, dazu bundesweite und internationale Partner.",
    },
    {
      label: "Spektrum",
      value:
        "Realdreh, Animation, Motion Design, Live-Streaming, AR/VR und Studioproduktion. Kamera, Schnitt und Live-Regie liegen im Haus.",
    },
    {
      // ⚠️ Aus der alten Seite übernommen, nicht gegengelesen.
      label: "Vorlauf",
      value:
        "In der Regel 7 bis 14 Tage zwischen Konzeption und Fertigstellung. Kurzfristige Anpassungen sind eingeplant, nicht die Ausnahme.",
    },
    {
      // ⚠️ Aus der alten Seite übernommen, nicht gegengelesen.
      label: "Abrechnung",
      value:
        "Transparente Tagespreise in der Kalkulation. Bei größeren Mengen auch Retainer oder Rahmenverträge.",
    },
  ] satisfies ServiceFact[],

  audience: [
    "Kreativ- und Werbeagenturen ohne eigene Video-Unit",
    "Agenturen mit eigenem Team, das bei Auftragsspitzen an die Grenze kommt",
    "Event- und Messeagenturen, die Live-Streaming und Bühnencontent brauchen",
    "Kommunikationsberatungen, die Bewegtbild aus einer Hand einkaufen wollen",
  ],

  blocks: [
    {
      title: "Skalierbar",
      body:
        "Der Aufwand für eine eigene Video-Unit mit Equipment ist hoch — und am Ende hat das Team nie die richtige Größe. Entweder ist es zu klein oder zu groß. Das Brot-und-Butter-Geschäft deckt Ihr vielleicht selbst ab. Aber was ist mit den Spitzen? Kunden werden in ihren Wünschen immer spontaner: „Könnt Ihr mal eben …“ Agenturen — und seien sie noch so groß — brauchen irgendwann Unterstützung von außen, damit sie skalieren können.",
    },
    {
      title: "Spezialisiert",
      body:
        // ⚠️ „eigenes Greenbox-Studio" stammt aus der alten Seite.
        "Einen normalen Film bekommt die eigene Truppe gut gestemmt. Aber was ist bei Live-Streaming? Animationen? Augmented Reality? Spezial-Equipment? Genau da fangen wir an. Kamera, Schnitt, Live-Regie und ein eigenes Greenbox-Studio liegen bei uns im Haus, dazu Jahrzehnte an Produktionserfahrung.",
    },
    {
      title: "Uneitel",
      body:
        "Ihr macht Euch Sorgen um Eure Kundenbeziehung? Das ist unbegründet. Wir treten in Euren Schatten und segeln unter Eurer Flagge — und das gerne. Eine Video-Produktion besteht aus vielen Schritten: Kreation, Planung, Pre-Produktion, Dreh, Post, Grafik, Vertonung, Distribution. Ihr deckt einige davon selbst ab und braucht Unterstützung bei anderen? Kein Problem. Bei Bedarf übernehmen wir auch das gesamte Projekt.",
    },
  ] satisfies ServiceBlock[],

  /**
   * ⚠️ Beide Fotos sind aus der Strecke der Leistungsseiten
   * (`public/leistungen-bilder/`, gebaut von `scripts/build-service-images.mjs`)
   * wiederverwendet — es gibt keine eigenen Motive für diese Seite. Wer zwei
   * frische Aufnahmen liefert: nach `public/leistungen-bilder/` legen bzw. das
   * `MAPPING` im Skript ergänzen und hier die beiden Pfade tauschen. Sonst
   * ändert sich nichts.
   *
   * `images[0]` steht im Textblock, `images[1]` läuft als Band über die volle
   * Breite und wird auf Desktop nach 21:9 beschnitten — dort also kein Motiv
   * mit wichtigen Randdetails.
   */
  images: [
    {
      src: "/leistungen-bilder/video-produktion-2.webp",
      alt: "Kameramann richtet eine Cinema-Kamera auf dem Stativ ein",
    },
    {
      src: "/leistungen-bilder/studiobau-2.webp",
      alt: "Kamera auf einer Fahrt über das Set eines eingerichteten Studios",
    },
  ] satisfies LocalImage[],

  /**
   * Drei Referenzen, bei denen die Zusammenarbeit mit einer Agentur im
   * Case-Text belegt ist: Storymachine (`zeitgeist`), CW Haarfeld
   * (`cwh-bih-sbv-wahl`) und NJU (`obi-gartenmagazin`). Keine Behauptung,
   * sondern nachlesbar in `lib/content/cases.ts`.
   * ⚠️ Unbekannte Slugs fallen still weg (`getCasesBySlugs`) — beim Umbenennen
   * eines dieser Cases hier mitziehen.
   */
  caseSlugs: ["zeitgeist", "cwh-bih-sbv-wahl", "obi-gartenmagazin"],

  cta: {
    headline: "Lasst uns über Euer Projekt sprechen",
    body:
      "Schickt uns das Briefing oder auch nur die grobe Idee — wir sagen Euch ehrlich, ob und wie wir der richtige Partner dafür sind.",
    buttonText: "Als Agentur anfragen",
  },

  seo: {
    metaTitle: "Video-Partner für Agenturen | make/c Köln & Essen",
    metaDescription:
      "Produktionspartner für Agenturen: skalierbar bei Auftragsspitzen, spezialisiert bei Live-Streaming, Animation und AR — und uneitel beim Endkunden. make/c aus Köln und Essen.",
  },
} as const;
