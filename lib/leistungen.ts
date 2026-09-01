// Content der Leistungs-Detailseiten (/leistungen/<slug>).
//
// ⚠️ Es sind **fünf**, nicht sechs: `artificial-intelligence` hat seit
// 01.09.2026 keine eigene Seite mehr (siehe den Block unten, wo sie stand).
// `SERVICES` in `lib/content/services.ts` führt weiter alle sechs Kacheln.
//
// Hartcodiert und so gewollt (CLAUDE.md Regel 1): Content gehört seit 31.07.2026
// in den Code, Sanity verwaltet nur noch die Case Studies. Die früher hier
// vermerkte „Migration nach Sanity" ist damit vom Tisch.
//
// ⚠️ `slug` muss zum gleichnamigen Eintrag in `SERVICES` (`lib/content/services.ts`)
// passen — daher kommt das Bild der Seite. Weicht ein Slug ab, verlinkt die Kachel
// auf `/leistungen/<slug>` ins Leere. Das prüft kein Typ.
//
// Die Tonalität stammt aus den früher in Sanity gepflegten
// `description`/`detailText`-Feldern der `service`-Dokumente.

import type { LocalImage } from "./content/types";

export type ServiceFaq = { question: string; answer: string };
export type ServiceStep = { title: string; body: string };
export type ServiceFact = { label: string; value: string };
export type ServiceBlock = { title: string; body: string };

export type ServicePageContent = {
  /** identisch mit `SERVICES[].slug` in lib/content/services.ts — niemals abweichen */
  slug: string;
  /** MixedHeadline part1 (Gotham Bold Italic) */
  titlePart1: string;
  /** MixedHeadline part2 (Garamond SemiBold Italic) */
  titlePart2: string;
  /** Klartext-H1 für Metadata und JSON-LD */
  h1Plain: string;
  /** Keyword-tragende Zeile direkt unter der H1 */
  subline: string;
  /**
   * Der GEO-Absatz: 40–60 Wörter, nennt make/c beim Namen, beantwortet
   * „Was ist X?" vollständig und ist ohne Kontext zitierfähig.
   */
  definition: string;
  facts: ServiceFact[];
  blocks: ServiceBlock[];
  steps: ServiceStep[];
  audience: string[];
  faq: ServiceFaq[];
  /** zwei Schwester-Slugs für die interne Verlinkung */
  relatedSlugs: string[];
  /** genau drei Case-Slugs aus `lib/content/cases.ts` */
  caseSlugs: string[];
  /**
   * Loop-Video unter `public/leistungen-loops/`, benannt nach dem Slug.
   * Ohne Wert zeigt `ServiceBlocks` das Bild aus `SERVICES` (`lib/content/services.ts`).
   *
   * ⚠️ Der Dateiname darf **kein Leerzeichen** enthalten. Die alten Loops lagen
   * mit Leerzeichen direkt in `public/` („Beratung loop.mp4"), was `ServiceBlocks`
   * zu einem `encodeURI()` zwang.
   */
  loopVideo?: string;
  /**
   * Genau zwei Set-Fotos, gebaut von `scripts/build-service-images.mjs` aus
   * `assets/masters/unterseite-bilder/`. Reihenfolge ist Platzierung:
   * `[0]` steht im Medienrahmen von „Was wir konkret machen" (3:2),
   * `[1]` als Band unter dem Ablauf (`ServiceImageBand`, dort auf 21:9 beschnitten).
   *
   * ⚠️ Welches Motiv wohin gehört, steht in der `MAPPING`-Tabelle des Skripts —
   * die Pfade hier ändern sich beim Tauschen nicht.
   */
  images: LocalImage[];
  cta: { headline: string; body: string; buttonText: string };
  seo: { metaTitle: string; metaDescription: string; keywords: string[] };
};

/**
 * Zum Loop gehört ein gleichnamiges Poster — beide erzeugt
 * `scripts/build-service-loops.mjs` im selben Durchlauf. Deshalb abgeleitet
 * statt als zweites Datenfeld gepflegt: die Kopplung besteht ohnehin, und ein
 * vergessenes Feld fiele erst im Browser auf.
 *
 * Benutzt von `ServiceBlocks` (Detailseite) und `ServiceList` (Startseite).
 */
export function loopPoster(loopVideo: string): string {
  return loopVideo.replace(/\.mp4$/, "-poster.webp");
}

export const SERVICE_PAGES: ServicePageContent[] = [
  // ---------------------------------------------------------------------
  {
    slug: "video-strategie",
    titlePart1: "Video",
    titlePart2: "Strategie",
    h1Plain: "Video Strategie",
    subline:
      "Videostrategie für Unternehmen — entwickelt in Köln und Essen, umgesetzt bundesweit.",
    definition:
      "Videostrategie bei make/c heißt: Video wird als System geplant, nicht als Einzelprojekt. Wir definieren, welche Formate auf welchen Kanälen welches Ziel erfüllen, legen Produktionsprozesse und Verantwortlichkeiten fest und machen den Erfolg über KPIs messbar. Am Ende weiß jedes Video, warum es existiert — und was es kosten darf.",
    facts: [
      { label: "Leistungsumfang", value: "Analyse, Formatentwicklung, Kanalstrategie, Prozessdesign, KPI-Framework" },
      { label: "Typische Ergebnisse", value: "Video-Strategiepapier, Formatbaukasten, Redaktionsplan, Produktionsworkflow" },
      { label: "Dauer", value: "4 bis 8 Wochen bis zur fertigen Strategie" },
      { label: "Format", value: "Workshops vor Ort in Köln oder Essen, remote oder hybrid" },
      { label: "Einsatzgebiet", value: "Köln, Essen, Nordrhein-Westfalen und bundesweit" },
    ],
    blocks: [
      {
        title: "Standortbestimmung",
        body: "Wir sehen uns an, was bereits produziert wird, wie es performt und wo Budget versickert. Aus Bestandsanalyse, Zielgruppen und Wettbewerbsumfeld entsteht ein ehrliches Bild davon, was Video in deinem Unternehmen heute leistet — und was nicht.",
      },
      {
        title: "Formate statt Einzelvideos",
        body: "Statt Projekt für Projekt neu anzufangen, entwickeln wir einen Baukasten wiederkehrender Formate mit festem Look, festem Ablauf und klarer Aufgabe. Das senkt die Produktionskosten pro Video deutlich und macht die Marke über alle Kanäle hinweg wiedererkennbar.",
      },
      {
        title: "Prozesse und Messbarkeit",
        body: "Eine Strategie funktioniert nur, wenn klar ist, wer briefed, wer freigibt und wer produziert. Wir definieren Freigabewege, Vorlaufzeiten und Schnittstellen — und legen pro Format fest, woran sich Erfolg ablesen lässt: Reichweite, Verweildauer, Conversion oder interne Nutzung. So wird aus einem Bauchgefühl eine Entscheidungsgrundlage für das nächste Budget.",
      },
    ],
    steps: [
      { title: "Analyse und Ziele", body: "Bestandsaufnahme der bisherigen Videos, Kanäle und Budgets — und die Klärung, was Video konkret leisten soll: Bekanntheit, Recruiting, Vertrieb oder interne Kommunikation." },
      { title: "Formatentwicklung", body: "Entwicklung eines Formatbaukastens mit Look, Länge, Frequenz und Kanalzuordnung." },
      { title: "Prozesse und KPIs", body: "Produktionsworkflow, Rollen, Freigaben und Vorlaufzeiten — dazu die Kennzahlen je Format und das passende Reporting." },
      { title: "Umsetzungsbegleitung", body: "Wir begleiten die ersten Produktionen und übergeben auf Wunsch ins Inhouse-Setup." },
    ],
    audience: [
      "Unternehmen, die viel Video produzieren, aber keinen roten Faden erkennen",
      "Marketing- und Kommunikationsabteilungen vor der Jahresplanung",
      "Organisationen, die Video-Produktion teilweise ins Haus holen wollen",
      "Teams, die ihr Videobudget gegenüber der Geschäftsführung begründen müssen",
    ],
    faq: [
      {
        question: "Was kostet eine Videostrategie?",
        answer:
          "Der Aufwand richtet sich nach Unternehmensgröße, Anzahl der Kanäle und Tiefe der Analyse. make/c kalkuliert Strategieprojekte als Festpreis auf Basis eines gemeinsamen Scopings, damit vor dem Start klar ist, welche Ergebnisse geliefert werden. Ein erstes Gespräch zur Einordnung ist kostenfrei.",
      },
      {
        question: "Wie lange dauert die Entwicklung einer Videostrategie?",
        answer:
          "Von der Analyse bis zum fertigen Strategiepapier vergehen typischerweise vier bis acht Wochen. Der größte Zeitfaktor ist nicht die Ausarbeitung, sondern die Abstimmung innerhalb des Unternehmens — je klarer die Entscheidungswege, desto schneller steht das Ergebnis.",
      },
      {
        question: "Brauchen wir eine Strategie, wenn wir nur ein Video produzieren wollen?",
        answer:
          "Für ein einzelnes Video reicht ein gutes Briefing. Eine Strategie lohnt sich ab dem Punkt, an dem regelmäßig produziert wird und mehrere Kanäle bespielt werden. Faustregel: Wer mehr als vier bis fünf Videos im Jahr produziert, zahlt ohne Formatbaukasten jedes Mal die Konzeptionskosten neu.",
      },
      {
        question: "Setzt make/c die Strategie auch selbst um?",
        answer:
          "Ja. make/c produziert die entwickelten Formate auf Wunsch direkt weiter, begleitet ein internes Team beim Aufbau eigener Produktionskompetenz oder kombiniert beides. Die Strategie ist bewusst so dokumentiert, dass auch andere Dienstleister damit arbeiten können.",
      },
      {
        question: "Was unterscheidet eine Videostrategie von einer Content-Strategie?",
        answer:
          "Eine Content-Strategie legt Themen und Botschaften über alle Formate hinweg fest. Eine Videostrategie übersetzt diese Themen in konkrete Bewegtbild-Formate und klärt zusätzlich Produktionsfragen: Welche Technik, welche Vorlaufzeit, welches Budget, welcher Workflow. Beides greift ineinander, ersetzt sich aber nicht.",
      },
    ],
    relatedSlugs: ["video-produktion", "studiobau"],
    // Strategie-lastige Projekte: Format-Entwicklung, Beratung, Bühnenregie.
    // `dmexco-live-stream` (2020) ist mit dem Schnitt bei 2022 entfallen
    // (12.08.2026); an seine Stelle rückt der Gründerfonds — eine fortlaufende
    // Clip-Reihe und damit ein Formatbaukasten, wie ihn diese Seite beschreibt.
    caseSlugs: [
      "zurich-strategiegarten-2023",
      "workshop-selber-drehen-und-schneiden",
      "high-tech-gruenderfonds",
    ],
    loopVideo: "/leistungen-loops/video-strategie.mp4",
    images: [
      {
        src: "/leistungen-bilder/video-strategie-1.webp",
        alt: "Zwei Personen besprechen an einem Laptop die Planung, im Vordergrund eine Kamera",
      },
      {
        src: "/leistungen-bilder/video-strategie-2.webp",
        alt: "Mitglied des make/c-Teams stimmt sich am Set über den Kameramonitor ab",
      },
    ],
    cta: {
      headline: "Video als System denken",
      body: "Erzähl uns, was Video bei euch leisten soll — wir sagen dir ehrlich, ob eine Strategie der richtige nächste Schritt ist.",
      buttonText: "Gespräch vereinbaren",
    },
    seo: {
      metaTitle: "Videostrategie für Unternehmen | make/c Köln & Essen",
      metaDescription:
        "Videostrategie statt Einzelprojekte: Formate, Kanäle, Prozesse und KPIs. make/c entwickelt Video-Systeme für Unternehmen in Köln und Essen.",
      keywords: [
        "Videostrategie",
        "Videokonzept",
        "Content-Strategie Video",
        "Formatentwicklung",
        "Video KPIs",
        "Videoagentur Köln",
      ],
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: "video-produktion",
    titlePart1: "Video",
    titlePart2: "Produktion",
    h1Plain: "Video Produktion",
    subline:
      "Videoproduktion in Köln und Essen — Imagefilm, Kampagne, Produktvideo und Social Content.",
    definition:
      "Videoproduktion bei make/c umfasst den kompletten Weg von der Idee bis zum fertigen Film: Konzept, Drehbuch, Dreh, Postproduktion und Ausspielung in allen benötigten Formaten. Produziert wird von den Standorten Köln und Essen aus — vom cineastischen Imagefilm über Kampagnen- und Produktvideos bis zu skalierbaren Social-Formaten und Studioproduktionen.",
    facts: [
      { label: "Leistungsumfang", value: "Konzept, Drehbuch, Casting, Dreh, Schnitt, Farbkorrektur, Sounddesign, Ausspielung" },
      { label: "Formate", value: "Imagefilm, Employer Branding, Kampagnenfilm, Produktvideo, Social-Clip, Dokumentation" },
      { label: "Seitenverhältnisse", value: "16:9, 9:16, 1:1 und 4:5 aus einem Dreh" },
      { label: "Dauer", value: "3 bis 10 Wochen je nach Umfang, Social-Formate deutlich schneller" },
      { label: "Einsatzgebiet", value: "Köln, Essen, Nordrhein-Westfalen und bundesweit" },
    ],
    blocks: [
      {
        title: "Imagefilm und Employer Branding",
        body: "Filme, die zeigen, wofür ein Unternehmen steht — für Website, Messe, Vertrieb und Recruiting. Wir arbeiten mit echten Menschen aus dem Unternehmen statt mit austauschbaren Stock-Situationen, weil Glaubwürdigkeit der einzige Vorteil ist, den ein Imagefilm gegenüber Werbung hat.",
      },
      {
        title: "Kampagnen- und Produktvideos",
        body: "Bewegtbild, das ein konkretes Ziel hat: ein Produkt erklären, eine Kampagne tragen, eine Zielgruppe aktivieren. Wir denken Kampagnen von Anfang an in Varianten, damit aus einem Dreh Material für mehrere Kanäle und Laufzeiten entsteht.",
      },
      {
        title: "Social-First und Studioproduktion",
        body: "Vertikale Formate, die für den Feed gebaut sind und nicht nachträglich beschnitten wurden: kurze Vorlaufzeiten, wiederkehrende Formate, ein Look, der auch ohne Ton funktioniert. Unter Studiobedingungen entstehen daraus ganze Formatstrecken — Interviews, Testimonials und Produktaufnahmen sind der günstigste Weg zu vielen Videos in gleichbleibender Qualität.",
      },
    ],
    steps: [
      { title: "Briefing und Konzept", body: "Ziel, Zielgruppe, Kanal und Budget klären, bevor über Bilder gesprochen wird — daraus entstehen Idee, Erzählform und Drehbuch samt Moodboard." },
      { title: "Vorproduktion", body: "Location-Scouting, Casting, Drehplan, Genehmigungen und Technikdisposition." },
      { title: "Dreh", body: "Produktion vor Ort oder im Studio, mit eingespieltem Team aus Regie, Kamera, Licht und Ton." },
      { title: "Postproduktion und Ausspielung", body: "Schnitt, Farbkorrektur, Motion Design und Ton — am Ende finale Dateien in allen benötigten Seitenverhältnissen, Längen und Untertitelvarianten." },
    ],
    audience: [
      "Unternehmen, die ihre Marke über Bewegtbild aufbauen wollen",
      "Marketing-Teams mit Kampagnen, die Bewegtbild als Leitmedium nutzen",
      "Personalabteilungen mit Recruiting-Bedarf",
      "Hersteller, die erklärungsbedürftige Produkte zeigen müssen",
    ],
    faq: [
      {
        question: "Was kostet eine Videoproduktion?",
        answer:
          "Der Preis hängt vor allem von Drehtagen, Teamgröße und Postproduktionsaufwand ab, nicht von der Videolänge. Ein Social-Clip aus einem halben Drehtag liegt in einer völlig anderen Größenordnung als ein Imagefilm mit mehreren Drehorten. make/c kalkuliert nach Briefing als Festpreis, damit während der Produktion keine Überraschungen entstehen.",
      },
      {
        question: "Wie lange dauert eine Videoproduktion von der Idee bis zur Auslieferung?",
        answer:
          "Für einen Imagefilm sollten sechs bis zehn Wochen eingeplant werden, für Kampagnen- und Produktvideos drei bis sechs. Social-Formate mit festem Konzept lassen sich deutlich schneller umsetzen. Der Engpass ist in der Praxis fast immer die Freigabeschleife auf Kundenseite, nicht die Produktion.",
      },
      {
        question: "Produziert make/c auch außerhalb von Köln und Essen?",
        answer:
          "Ja. Die beiden Standorte Köln und Essen sind der Ausgangspunkt, gedreht wird bundesweit und auf Anfrage auch international. Für Drehs im Rheinland und im Ruhrgebiet entfallen Reisekosten weitgehend, was sich bei kleineren Produktionen spürbar auf das Budget auswirkt.",
      },
      {
        question: "Bekommen wir aus einem Dreh Material für mehrere Kanäle?",
        answer:
          "Ja, das ist der Standardfall. make/c plant Drehs von vornherein so, dass neben der Hauptfassung auch vertikale Schnitte, Kurzversionen und Stills entstehen. Das ist deutlich günstiger, als einzelne Formate nachträglich separat zu produzieren.",
      },
      {
        question: "Wer hält die Nutzungsrechte an den Videos?",
        answer:
          "Die Nutzungsrechte für die vereinbarten Kanäle und Laufzeiten gehen an den Auftraggeber über. Bei Musik, Stock-Material und gebuchten Darstellern gelten eigene Lizenzzeiträume — diese werden vor der Produktion schriftlich festgehalten, damit später niemand über abgelaufene Rechte stolpert.",
      },
      {
        question: "Kann make/c ein bestehendes Konzept umsetzen?",
        answer:
          "Ja. make/c übernimmt Produktionen auf Basis eines vorhandenen Konzepts oder Storyboards, etwa wenn die Idee aus einer Leadagentur kommt. In dem Fall beginnt die Zusammenarbeit bei der Vorproduktion.",
      },
    ],
    relatedSlugs: ["video-strategie", "video-motion-design"],
    caseSlugs: ["merkur", "flughafen-koeln-bonn", "wundholding"],
    loopVideo: "/leistungen-loops/video-produktion.mp4",
    images: [
      {
        src: "/leistungen-bilder/video-produktion-1.webp",
        alt: "Filmklappe vor einer gestellten Krankenhausszene während des Drehs",
      },
      {
        src: "/leistungen-bilder/video-produktion-2.webp",
        alt: "Kameramann richtet eine Cinema-Kamera auf dem Stativ ein",
      },
    ],
    cta: {
      headline: "Ein Projekt im Kopf?",
      body: "Schick uns dein Briefing oder auch nur die grobe Idee — wir melden uns mit einer ehrlichen Einschätzung zu Aufwand und Budget.",
      buttonText: "Projekt anfragen",
    },
    seo: {
      metaTitle: "Videoproduktion Köln & Essen | Imagefilm & Content",
      metaDescription:
        "Imagefilme, Kampagnen- und Produktvideos, Social-Formate und Studioproduktionen. make/c produziert Bewegtbild für Marken in Köln und Essen.",
      keywords: [
        "Videoproduktion",
        "Videoproduktion Köln",
        "Imagefilm",
        "Unternehmensfilm",
        "Kampagnenfilm",
        "Produktvideo",
        "Employer Branding Video",
      ],
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: "video-motion-design",
    titlePart1: "Video",
    titlePart2: "Motion Design",
    h1Plain: "Video Motion Design",
    subline:
      "Motion Design und Videoanimation — Animations-Systeme, die zum Corporate Design passen.",
    definition:
      "Motion Design bei make/c ist die Gestaltung von Bewegung: Logo-Animationen, Bauchbinden, animierte Infografiken, Erklärvideos und vollständig animierte Kampagnen-Spots. Statt Einzelanimationen entwickeln wir Animations-Systeme, die aus dem Corporate Design abgeleitet sind und sich über alle Formate und Kanäle hinweg wiederverwenden lassen.",
    facts: [
      { label: "Leistungsumfang", value: "Animations-Konzept, Storyboard, Illustration, 2D-Animation, Sounddesign" },
      { label: "Formate", value: "Logo-Animation, Bauchbinden, Erklärvideo, Infografik-Animation, animierter Spot" },
      { label: "Ergebnis", value: "Fertige Animationen plus wiederverwendbares Template-Set" },
      { label: "Dauer", value: "2 bis 6 Wochen je nach Umfang" },
      { label: "Einsatzgebiet", value: "Köln, Essen und bundesweit — Motion Design entsteht ortsunabhängig" },
    ],
    blocks: [
      {
        title: "Animations-Systeme statt Einzelstücke",
        body: "Wir leiten aus dem Corporate Design ein Bewegungsvokabular ab: wie sich Elemente einblenden, in welchem Tempo, mit welcher Kurve. Daraus entsteht ein Template-Set, mit dem auch das interne Team später konsistente Videos bauen kann.",
      },
      {
        title: "Erklärvideos und animierte Spots",
        body: "Komplexe Produkte, Prozesse und Dienstleistungen verständlich gemacht — der Aufwand steckt weniger in der Animation als im Skript. Vollanimierte Kampagnen-Spots kommen dort dazu, wo ein Realdreh nicht möglich oder nicht sinnvoll ist: bei abstrakten Themen, Software-Produkten oder international ausgespielten Kampagnen mit mehreren Sprachfassungen.",
      },
      {
        title: "Bauchbinden und Grafikpakete",
        body: "Titel, Namenseinblendungen, Zahlenanimationen und Abbinder als sauberes Paket, das über alle Produktionen hinweg gleich aussieht. Das ist der unspektakulärste und gleichzeitig wirksamste Hebel für einen einheitlichen Markenauftritt im Bewegtbild.",
      },
    ],
    steps: [
      { title: "Briefing und Skript", body: "Ziel, Zielgruppe und Botschaft klären, bestehendes Corporate Design sichten — dann Text und Dramaturgie festlegen. Bei Erklärvideos der wichtigste Schritt." },
      { title: "Storyboard und Design", body: "Visuelle Umsetzung als Bildfolge mit Stilrahmen und Farbwelt, danach die Ausarbeitung aller Bausteine im finalen Look." },
      { title: "Animation", body: "Umsetzung der Bewegung, Timing und Übergänge." },
      { title: "Ton und Finalisierung", body: "Voiceover, Sounddesign, Untertitel und Export in alle Zielformate." },
    ],
    audience: [
      "Unternehmen mit erklärungsbedürftigen Produkten oder Software",
      "Marken, die einen einheitlichen Bewegtbild-Look über alle Videos brauchen",
      "Teams, die bestehende Videos mit professionellen Grafiken aufwerten wollen",
      "Kampagnen mit mehreren Sprachfassungen",
    ],
    faq: [
      {
        question: "Was kostet ein Erklärvideo?",
        answer:
          "Der Preis wird vor allem von der Laufzeit und dem Illustrationsstil bestimmt. Ein Video mit einfachen, aus dem Corporate Design abgeleiteten Formen ist deutlich günstiger als individuell illustrierte Charaktere. make/c kalkuliert nach Skriptlänge und Stilrahmen als Festpreis.",
      },
      {
        question: "Wie lange dauert die Produktion einer Animation?",
        answer:
          "Ein Erklärvideo von 60 bis 90 Sekunden benötigt je nach Stil drei bis sechs Wochen. Ein Bauchbinden- und Grafikpaket ist meist in zwei bis drei Wochen fertig. Skript und Storyboard beanspruchen dabei regelmäßig mehr Zeit als die eigentliche Animation.",
      },
      {
        question: "Können wir die Animationen später selbst anpassen?",
        answer:
          "Ja. make/c liefert auf Wunsch ein Template-Set aus, mit dem sich Texte, Farben und einzelne Elemente ohne Motion-Design-Kenntnisse austauschen lassen. Das ist besonders sinnvoll bei Bauchbinden und wiederkehrenden Formaten.",
      },
      {
        question: "Braucht Motion Design ein fertiges Corporate Design?",
        answer:
          "Ein bestehendes Corporate Design macht die Arbeit schneller und das Ergebnis konsistenter, ist aber keine Voraussetzung. Liegt kein Design vor, entwickelt make/c einen eigenständigen visuellen Rahmen, der sich später an ein Corporate Design anschließen lässt.",
      },
      {
        question: "Ist Motion Design günstiger als ein Realdreh?",
        answer:
          "Nicht grundsätzlich. Kurze Animationen sind oft günstiger als ein Drehtag, aufwendig illustrierte Spots können teurer sein als eine Realproduktion. Der eigentliche Vorteil liegt woanders: Animationen lassen sich nachträglich ändern und in andere Sprachen übertragen, ein gedrehtes Bild nicht.",
      },
    ],
    // ⚠️ Zweiter Slug war bis 01.09.2026 `artificial-intelligence`. Mit dem
    // Wegfall jener Detailseite hätte `ServiceRelated` den Slug still
    // fallen gelassen und nur **eine** Karte in ein zweispaltiges Raster
    // gestellt. `event-content` ist der sachlich nächste Ersatz: Opener,
    // Lower Thirds und Bumper für Events sind Motion-Design-Arbeit.
    relatedSlugs: ["video-produktion", "event-content"],
    caseSlugs: [
      "format-tools-katalog",
      "obi-gartenmagazin",
      "zurich-sicherheit-im-strassenverkehr",
    ],
    loopVideo: "/leistungen-loops/video-motion-design.mp4",
    images: [
      {
        src: "/leistungen-bilder/video-motion-design-1.webp",
        alt: "Ausgeleuchtete Drehsituation auf einem Bahnsteig, Flächenlicht vor Betonwand",
      },
      {
        src: "/leistungen-bilder/video-motion-design-2.webp",
        alt: "Person in Warnweste blickt über das Vorfeld des Flughafens Köln Bonn",
      },
    ],
    cta: {
      headline: "Bewegung mit System",
      body: "Von der einzelnen Logo-Animation bis zum kompletten Grafikpaket — sag uns, wo ihr steht.",
      buttonText: "Animation anfragen",
    },
    seo: {
      metaTitle: "Motion Design & Videoanimation | make/c Köln",
      metaDescription:
        "Von der Logo-Animation bis zum animierten Kampagnen-Spot: make/c entwickelt Motion-Design-Systeme, die zum Corporate Design passen.",
      keywords: [
        "Motion Design",
        "Motion Design Köln",
        "Erklärvideo",
        "Logo-Animation",
        "2D-Animation",
        "Videoanimation",
        "Bauchbinden",
      ],
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: "event-content",
    titlePart1: "Video",
    titlePart2: "Event Content",
    h1Plain: "Video Event Content",
    subline:
      "Eventvideo und Livestream für Konferenzen, Townhalls und Messen — live, hybrid oder on demand.",
    definition:
      "Event Content bei make/c bedeutet, ein Event für alle Kanäle nutzbar zu machen: als Livestream für Teilnehmende, die nicht vor Ort sind, als Aufzeichnung für die Mediathek und als kurze Clips für Social Media und interne Kommunikation. Produziert werden Konferenzen, Townhalls, Messeauftritte und Preisverleihungen — live, hybrid oder rein digital.",
    facts: [
      { label: "Leistungsumfang", value: "Livestream, Regie, Kamera, Ton, Aufzeichnung, Schnitt, Highlight-Clips" },
      { label: "Formate", value: "Konferenz, Townhall, Messe, Preisverleihung, digitale Bühne, Produktlaunch" },
      { label: "Ausspielung", value: "YouTube, LinkedIn, Vimeo, interne Plattformen und geschlossene Streaming-Portale" },
      { label: "Vorlauf", value: "Ab 2 Wochen, bei mehrtägigen Events und Mehrkamera-Setups länger" },
      { label: "Einsatzgebiet", value: "Köln, Essen, Ruhrgebiet, Rheinland und bundesweit" },
    ],
    blocks: [
      {
        title: "Livestream und Hybrid-Events",
        body: "Professionelle Übertragung mit Mehrkamera-Regie, eingespielten Grafiken und Moderationsstrecken. Wer remote zuschaut, soll nicht das Gefühl haben, die zweite Reihe erwischt zu haben — deshalb planen wir digitale Teilnehmende von Anfang an als eigene Zielgruppe mit.",
      },
      {
        title: "Dokumentation und Highlight-Clips",
        body: "Der Zusammenschnitt, der das Event für alle sichtbar macht, die nicht dabei waren: Atmosphäre, Kernaussagen, Menschen — nutzbar für die Nachberichterstattung, die Einladung zum nächsten Jahr und den Vertrieb. Dazu kurze, vertikale Schnitte für Social Media und interne Kanäle, idealerweise noch am selben Tag, solange das Event Aufmerksamkeit hat.",
      },
      {
        title: "Digitale Bühne",
        body: "Wenn ein Event vollständig digital stattfindet, wird das Studio zur Bühne: Moderation, Einspieler, Zuschaltungen und Interaktion mit dem Publikum aus einer Regie.",
      },
    ],
    steps: [
      { title: "Konzept", body: "Ziel, Zielgruppen vor Ort und remote, Kanäle und gewünschte Ergebnisse klären." },
      { title: "Planung und Vorproduktion", body: "Location-Begehung, Strom, Netzwerk, Kamerapositionen und Streaming-Setup — dazu Ablaufregie, Grafikpaket, Einspieler und ein Testlauf mit allen Beteiligten." },
      { title: "Durchführung", body: "Aufbau, Generalprobe, Live-Regie und Aufzeichnung während des Events." },
      { title: "Auskopplung und Nachbereitung", body: "Erste Highlight-Clips zeitnah nach dem Event, häufig noch am selben Tag. Danach Dokumentation, Vortragsmitschnitte und finale Dateien für die Mediathek." },
    ],
    audience: [
      "Unternehmen mit jährlichen Konferenzen oder Kundenveranstaltungen",
      "Interne Kommunikation mit Townhalls und Mitarbeiterversammlungen",
      "Messeauftritte, die über den Messestand hinaus wirken sollen",
      "Verbände und Institutionen mit hybridem Veranstaltungsformat",
    ],
    faq: [
      {
        question: "Was kostet ein Livestream für eine Firmenveranstaltung?",
        answer:
          "Ausschlaggebend sind die Anzahl der Kameras, die Dauer des Events und der Umfang der Regie. Ein einfacher Stream mit einer Kamera und Präsentationseinbindung ist deutlich günstiger als eine Mehrkamera-Produktion mit Moderation und Einspielern. make/c erstellt das Angebot nach einer Begehung oder anhand des Ablaufplans.",
      },
      {
        question: "Wie viel Vorlauf braucht ihr für ein Event?",
        answer:
          "Zwei Wochen sind das Minimum für ein überschaubares Setup. Für mehrtägige Konferenzen, Mehrkamera-Regie oder Locations mit schwieriger Netzanbindung sollten vier bis acht Wochen eingeplant werden, weil dann eine Begehung und ein technischer Testlauf sinnvoll sind.",
      },
      {
        question: "Wann sind die Highlight-Clips fertig?",
        answer:
          "Wenn die Auskopplung vorab geplant ist, liefert make/c erste Clips noch am Eventtag oder am Folgetag. Das ist der entscheidende Zeitraum, denn die Aufmerksamkeit für ein Event fällt danach schnell ab. Die ausführliche Dokumentation folgt in der Regel innerhalb von zwei Wochen.",
      },
      {
        question: "Könnt ihr auch in einer Location ohne eigene Technik streamen?",
        answer:
          "Ja. make/c bringt Kamera-, Licht-, Ton- und Streamingtechnik vollständig mit. Kritisch ist in der Praxis fast immer nur die Internetanbindung — deshalb prüfen wir sie vorab und bringen bei Bedarf eine eigene Mobilfunk-Absicherung mit.",
      },
      {
        question: "Kann der Stream geschlossen und passwortgeschützt laufen?",
        answer:
          "Ja. Neben öffentlichen Plattformen wie YouTube oder LinkedIn kann der Stream über geschlossene Portale, das Intranet oder passwortgeschützte Seiten laufen. Das ist bei Townhalls und internen Veranstaltungen der Normalfall.",
      },
    ],
    relatedSlugs: ["video-produktion", "studiobau"],
    caseSlugs: ["dmexco-2023", "greentech-festival", "anuga-live-stream"],
    loopVideo: "/leistungen-loops/event-content.mp4",
    images: [
      {
        src: "/leistungen-bilder/event-content-1.webp",
        alt: "Kamerateam filmt die Beladung eines Eurowings-Flugzeugs auf dem Vorfeld",
      },
      {
        src: "/leistungen-bilder/event-content-2.webp",
        alt: "Kameramann in Warnweste dreht auf dem Rollfeld vor einem Flugzeug",
      },
    ],
    cta: {
      headline: "Euer nächstes Event steht an?",
      body: "Je früher wir dabei sind, desto mehr lässt sich aus dem Event herausholen. Ein Ablaufplan reicht für den Anfang.",
      buttonText: "Event besprechen",
    },
    seo: {
      metaTitle: "Eventvideo & Livestream Köln | make/c",
      metaDescription:
        "Event-Content für Konferenzen, Townhalls und Messen — live, hybrid oder on demand. Livestreams, digitale Bühnen und Social-Clips von make/c.",
      keywords: [
        "Eventvideo",
        "Livestream Köln",
        "Hybrid-Event",
        "Eventdokumentation",
        "Messevideo",
        "Townhall Streaming",
      ],
    },
  },

  // ---------------------------------------------------------------------
  // ⚠️ Hier stand bis zum 01.09.2026 die Leistung **`artificial-intelligence`
  // („Video AI")**. Sie hat auf Wunsch des Users keine Detailseite mehr: die
  // Kachel auf der Startseite verlinkt direkt nach `make-ai.de`. Der komplette
  // Text der Seite — Definition, fünf Eckdaten, drei Blöcke, vier Schritte, fünf
  // FAQ, CTA und SEO-Felder — liegt in der Git-Historie und kommt per
  // `git show <commit>:lib/leistungen.ts` zurück, falls die Seite je wieder
  // gewünscht ist.
  //
  // Was mit ihr entfallen ist, ohne dass es hier sichtbar wäre: der Eintrag in
  // `app/sitemap.ts` und `app/llms.txt/route.ts` (beide lesen `SERVICE_PAGES`),
  // das OG-Bild `/leistungen/artificial-intelligence/og` und der
  // „Passt dazu"-Verweis von `video-motion-design`.
  //
  // ⚠️ **Nicht** entfallen ist die Filter-Kategorie `artificial-intelligence`
  // auf `/work` (`lib/content/workCategories.ts`) — vier Cases tragen sie. Diese
  // Liste ist damit fünfteilig, `SERVICES` und `WORK_CATEGORIES` bleiben
  // sechsteilig. Das ist gewollt.

  // ---------------------------------------------------------------------
  {
    slug: "studiobau",
    titlePart1: "Video",
    titlePart2: "Studiobau",
    h1Plain: "Video Studiobau",
    subline:
      "Corporate Studiobau — Planung, Technik und Betrieb eigener Videostudios in Köln, Essen und bundesweit.",
    definition:
      "Studiobau bei make/c heißt: Unternehmen bekommen ein eigenes Videostudio, das zu ihrer Kommunikation passt. Wir übernehmen Bedarfsanalyse, Raum- und Technikplanung, Licht- und Tonkonzept, Set-Design sowie die Einrichtung der Workflows — und schulen das interne Team, damit das Studio nach der Übergabe tatsächlich genutzt wird.",
    facts: [
      { label: "Leistungsumfang", value: "Bedarfsanalyse, Raumplanung, Technikkonzept, Licht und Ton, Set-Design, Schulung" },
      { label: "Typische Nutzung", value: "Townhalls, Interviews, Schulungsvideos, Podcasts, Produktvideos, Livestreams" },
      { label: "Raumgröße", value: "Von der Studioecke im Bestandsraum bis zum ausgebauten Vollstudio" },
      { label: "Dauer", value: "8 bis 20 Wochen von der Analyse bis zur Übergabe" },
      { label: "Einsatzgebiet", value: "Köln, Essen, Nordrhein-Westfalen und bundesweit" },
    ],
    blocks: [
      {
        title: "Bedarfsanalyse vor Technik",
        body: "Bevor über Kameras gesprochen wird, klären wir, was tatsächlich produziert werden soll und wie oft. Der häufigste Fehler beim Studiobau ist ein überdimensioniertes Setup, das niemand bedienen kann — die Technik richtet sich nach dem Alltag, nicht nach dem Datenblatt.",
      },
      {
        title: "Raum, Licht und Ton",
        body: "Akustik ist der unterschätzte Faktor: Ein Raum mit gutem Ton und einfachem Licht liefert bessere Ergebnisse als ein hallendes Studio mit teuren Kameras. Wir planen Absorption, Lichtpositionen und Stromversorgung gemeinsam mit dem Set-Design.",
      },
      {
        title: "Set-Design, Workflows und Schulung",
        body: "Hintergründe, Möblierung und Grafikflächen, die zur Marke passen und mehrere Szenarien zulassen — vom Interview über die Ansprache der Geschäftsführung bis zur Produktvorstellung, ohne jedes Mal umzubauen. Dazu Presets, Bedienungsanleitungen und feste Abläufe, damit das Studio auch ohne Produktionsteam funktioniert. Wir schulen die Personen, die es später täglich nutzen.",
      },
    ],
    steps: [
      { title: "Analyse und Raumkonzept", body: "Welche Formate, welche Frequenz, welche Personen bedienen das Studio später? Dazu die Begehung mit Bewertung von Raumhöhe, Akustik, Licht und Stromversorgung." },
      { title: "Technikplanung", body: "Auswahl von Kamera, Licht, Ton, Regie und Streaming — abgestimmt auf die Bediener." },
      { title: "Set-Design und Aufbau", body: "Gestaltung der Hintergründe und Szenarien im Corporate Design, danach Installation, Verkabelung, Einmessung von Licht und Ton sowie die Einrichtung der Presets." },
      { title: "Schulung und Übergabe", body: "Einweisung des Teams, Dokumentation und begleitete Erstproduktion." },
    ],
    audience: [
      "Unternehmen mit regelmäßiger interner Videokommunikation",
      "Organisationen, die Produktionskosten durch Inhouse-Produktion senken wollen",
      "Personalentwicklung mit laufendem Bedarf an Schulungsvideos",
      "Teams, die kurzfristig und ohne Dreh-Vorlauf produzieren müssen",
    ],
    faq: [
      {
        question: "Was kostet der Bau eines Corporate Studios?",
        answer:
          "Die Spanne ist groß, weil sie vom Ausbaugrad abhängt: Eine gut geplante Studioecke in einem vorhandenen Raum liegt deutlich unter einem ausgebauten Vollstudio mit Regie und fester Lichtinstallation. make/c erstellt nach der Bedarfsanalyse eine Kostenschätzung in Ausbaustufen, damit später erweitert werden kann.",
      },
      {
        question: "Wie lange dauert es, bis das Studio nutzbar ist?",
        answer:
          "Von der Bedarfsanalyse bis zur Übergabe vergehen typischerweise acht bis zwanzig Wochen. Der größte Zeitfaktor sind bauliche Maßnahmen und Lieferzeiten für Technik, nicht die Planung selbst.",
      },
      {
        question: "Welchen Raum braucht man für ein Videostudio?",
        answer:
          "Wichtiger als die Fläche sind Raumhöhe, Akustik und die Möglichkeit, Tageslicht auszuschließen. Für Interview- und Ansprache-Formate genügen häufig rund 25 Quadratmeter. Kritisch wird es bei niedrigen Decken, weil dann weder Licht noch Hintergrundabstand sauber funktionieren.",
      },
      {
        question: "Kann unser Team das Studio ohne Vorkenntnisse bedienen?",
        answer:
          "Ja, wenn es von Anfang an so geplant wird. make/c legt Presets an, dokumentiert die Abläufe und schult die späteren Nutzerinnen und Nutzer. Genau daran scheitern Studios in der Praxis am häufigsten — nicht an der Technik, sondern daran, dass niemand sie bedienen mag.",
      },
      {
        question: "Betreut make/c das Studio auch nach der Übergabe?",
        answer:
          "Ja. Auf Wunsch übernimmt make/c die laufende Betreuung: Wartung, Aktualisierung der Technik, neue Formatvorlagen sowie Unterstützung bei größeren Produktionen im eigenen Studio.",
      },
    ],
    relatedSlugs: ["event-content", "video-strategie"],
    // ⚠️ Nur zwei statt drei Kacheln: `shop-apotheke-produktvideos` (2020) und
    // `zeg-tv-spot` (2021) sind mit dem Schnitt bei 2022 entfallen (12.08.2026),
    // und unter den verbliebenen Referenzen baut make/c nur in diesen beiden ein
    // Studio *für den Kunden*. Alles andere wäre bloß „in einem Studio gedreht"
    // und damit eine andere Leistung. Ein dritter Case gehört hier hin, sobald
    // es einen echten Studiobau-Case ab 2022 gibt.
    caseSlugs: ["db-schenker", "fom-studio"],
    loopVideo: "/leistungen-loops/studiobau.mp4",
    images: [
      {
        src: "/leistungen-bilder/studiobau-1.webp",
        alt: "Studioaufbau mit heller Hohlkehle, Licht und Kamerateam bei der Produktion",
      },
      {
        src: "/leistungen-bilder/studiobau-2.webp",
        alt: "Kamera auf einer Fahrt über das Set eines eingerichteten Studios",
      },
    ],
    cta: {
      headline: "Ein eigenes Studio?",
      body: "Wir schauen uns den Raum an und sagen dir ehrlich, was darin möglich ist — und was nicht.",
      buttonText: "Studio planen",
    },
    seo: {
      metaTitle: "Corporate Studiobau & Videostudio | make/c",
      metaDescription:
        "make/c plant und baut Corporate Studios: Technikplanung, Set-Design, Workflows und laufende Betreuung — für Unternehmen in Köln und Essen.",
      keywords: [
        "Corporate Studiobau",
        "Videostudio einrichten",
        "Studiotechnik",
        "Inhouse-Studio",
        "Studiobau Köln",
        "Firmenstudio",
      ],
    },
  },
];

export const SERVICE_PAGE_SLUGS: string[] = SERVICE_PAGES.map((p) => p.slug);

export function getServicePage(slug: string): ServicePageContent | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}

/** Pfad zur Detailseite — an einer Stelle definiert, damit Links konsistent bleiben. */
export function servicePagePath(slug: string): string {
  return `/leistungen/${slug}`;
}
