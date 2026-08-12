import type { CaseStudy } from "./types";

// Die Referenzen von make/c — hartcodiert (siehe CLAUDE.md, Regel 1).
//
// ⚠️ **Nur Projekte ab 2022** (User-Entscheidung 12.08.2026). Vorher standen
// hier 63 Cases; die 33 mit `year` 2020 oder 2021 sind ersatzlos entfernt —
// die Seite soll nur zeigen, was aktuell ist. Wer ein älteres Projekt wieder
// aufnehmen will, holt es per `git show` aus dem Stand vom 11.08.2026 zurück;
// die Bilddateien liegen unverändert unter `public/work/`.
//
// Herkunft (08/2026): die Projekte kommen aus der alten Portfolio-Seite
// make-c.de/portfolio (Titel, Untertitel und Bilder aus dem HTML-Export,
// Beschreibungstexte, Jahre, Videos und Credits von den zugehörigen
// Detailseiten) plus `merkur` und `aldi`, die es nur in Sanity gab.
//
// Die Reihenfolge hier ist die Reihenfolge auf /work — grob neu → alt. Es gibt
// kein `featured`-Flag mehr: was hier steht, wird gezeigt.
//
// ⚠️ `categories` sind seit 12.08.2026 **die sechs Leistungs-Slugs** aus
// `./workCategories.ts`, nicht mehr die 14 Genre-Kategorien der alten
// Portfolio-Seite. `category` ist dieselbe Information ausgeschrieben, mit
// „ · " verbunden — beides zusammen ändern.
//
// ⚠️ `year` stammt aus dem Veröffentlichungsdatum der alten Seite und kann vom
// Produktionsjahr abweichen. Es ist zugleich das Kriterium für den Schnitt bei
// 2022 — wo Veröffentlichung und Produktion auseinanderfallen, kann ein Projekt
// also knapp falsch einsortiert sein. `summary` ist die Original-Copy von
// make-c.de, maschinell übernommen und nicht redigiert.
//
// Bilder liegen unter `public/work/<slug>.webp` (max. 1600 px, WebP).

export const CASES: CaseStudy[] = [
  // ── ⚠️ Platzhalter (11.08.2026) ────────────────────────────────────────────
  // Die drei folgenden Cases gehören zu den Selected-Work-Kacheln der Startseite
  // und existieren, damit die Kacheln anklickbar sind. Angelegt sind nur die
  // Felder, die aus den Kacheln selbst hervorgehen (Kunde, Genre, Bild).
  //
  // Zu ersetzen, bevor die Seite live geht:
  //   `summary` — steht bewusst als sichtbarer Platzhalter da, statt erfundene
  //               Projektbeschreibungen zu behaupten
  //   `year`    — auf 2026 gesetzt, nicht verifiziert
  //   `video`, `credits`, `services` — fehlen ganz; das Case-Fenster lässt die
  //               Blöcke dann einfach weg (kein Play-Button, keine Credits)
  {
    slug: "telekom",
    client: "Telekom",
    project: "Event Content",
    year: "2026",
    category: "Video Event Content",
    categories: ["event-content"],
    kicker: "/ Case Study /",
    summary: "Event Content für die Telekom.\n\nPlatzhalter — Beschreibung folgt.",
    // 4:5 vorgeschnitten (614×768): im mittigen Beschnitt des Rasters fiel das
    // „R" von READY weg. Das Case-Fenster zeigt das Standbild im 16:9-Rahmen,
    // deshalb dort das ungeschnittene Poster.
    image: { src: "/work/telekom.webp", alt: "Telekom — Event Content" },
    poster: { src: "/work/telekom-poster.webp", alt: "Telekom — Event Content" },
  },
  {
    slug: "fom-studio",
    client: "FOM",
    project: "Studiobau und Betrieb",
    year: "2026",
    category: "Video Studiobau",
    categories: ["studiobau"],
    kicker: "/ Case Study /",
    summary: "Studiobau und Studiobetrieb für die FOM.\n\nPlatzhalter — Beschreibung folgt.",
    image: { src: "/work/fom-studio.webp", alt: "FOM — Studiobau und Betrieb" },
  },
  {
    slug: "barmenia-gothaer",
    client: "BarmeniaGothaer",
    project: "KI Avatar",
    year: "2026",
    category: "Video AI",
    categories: ["artificial-intelligence"],
    kicker: "/ Case Study /",
    summary: "KI-Avatar für die BarmeniaGothaer.\n\nPlatzhalter — Beschreibung folgt.",
    image: { src: "/work/barmenia-gothaer.webp", alt: "BarmeniaGothaer — KI Avatar" },
  },
  // ── Ende Platzhalter ───────────────────────────────────────────────────────
  {
    slug: "flughafen-koeln-bonn",
    client: "Flughafen Köln Bonn",
    project: "Imagefilm",
    year: "2026",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Der Flughafen Köln Bonn ist mehr als ein Ort für Passagiere – durch seinen 24-Stunden-Betrieb ist er auch ein zentraler Knotenpunkt für die weltweite Luftfracht. Genau diese beiden Geschäftsfelder, Passagier- und Frachtverkehr, stehen im Mittelpunkt unseres Imagefilms.",
    image: { src: "/work/flughafen-koeln-bonn.webp", alt: "Flughafen Köln Bonn — Imagefilm" },
    credits: [
      { role: "Postproduktion", name: "Christian Wesner" },
      { role: "Konzept und Beratung", name: "Jens Kemper" },
    ],
  },
  {
    slug: "wundholding",
    client: "Thermengruppe Josef Wund",
    project: "Imagespot und Erklärvideos",
    year: "2025",
    category: "Video Produktion · Video Motion Design",
    categories: ["video-produktion", "video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Die Thermengruppe Josef Wund ist ein führender Anbieter von Wellness Einrichtungen in Deutschland.\n\nmake/c hat schon mehrere innovative Wellnessangebote für den Kunden in Bewegtbildprojekten festgehalten. Hier geht es um das immersive Erlebnis „Breathing Planet“ der Thermen & Badewelt Sinsheim. In dieser Anwendung verbinden sich Technologie, Kunst und Natur auf eindrucksvolle Weise – Entschleunigung garantiert!",
    video: "https://www.youtube.com/watch?v=AyIptBu0qG8",
    image: { src: "/work/wundholding.webp", alt: "Thermengruppe Josef Wund — Imagespot und Erklärvideos" },
    credits: [
      { role: "Konzept & Regie", name: "Jason Philipp" },
      { role: "DOP", name: "Mohamed Bangura" },
      { role: "Postproduktion", name: "Jason Philipp" },
    ],
  },
  {
    slug: "koelner-zoo",
    client: "Kölner Zoo",
    project: "Kinospot und Social Media Spot",
    year: "2025",
    category: "Video Produktion · Video AI",
    categories: ["video-produktion", "artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "Die Dinos kommen wieder nach Köln – nach 65 Millionen Jahren… Doch auf Ihrem Weg in den Zoo, wo sie in einer Langzeitausstellung zu bewundern sind, müssen sie zuerst durch die Innenstadt…\n\nWas noch vor kurzer Zeit einen großen Aufwand im Bereich VFX und Motion Design nach sich gezogen hätte, geht dank modernster KI Technologie heute einfacher, schneller, günstiger und auch besser.",
    image: { src: "/work/koelner-zoo.webp", alt: "Kölner Zoo — Kinospot und Social Media Spot" },
    credits: [
      { role: "Konzept", name: "Christian Wesner" },
      { role: "DOP", name: "Mohamed Bangura" },
      { role: "Postproduktion und KI Artist", name: "Christian Wesner" },
    ],
  },
  {
    slug: "merkur",
    client: "Merkur",
    project: "Powerclip Campaign",
    year: "2024",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Die MERKUR Gruppe erneuerte ihren gesamten Außenauftritt grundlegend – und Bewegtbild sollte dabei keine Nebenrolle spielen, sondern das Herzstück sein. Das haben wir wörtlich genommen: MERKUR wurde auch im Video optisch neu erfunden. Die zentrale Herausforderung: sieben optisch sehr unterschiedliche Geschäftsbereiche zu einer visuell kohärenten und gleichzeitig emotional mitreißenden Welt zusammenzuführen.",
    services: ["Creative Direction", "Konzept & Story", "Regie & Produktion", "Postproduktion", "Social Adaptions"],
    image: { src: "/work/merkur.webp", alt: "Merkur — Powerclip Campaign" },
    poster: { src: "/work/merkur-poster.webp", alt: "Merkur — Powerclip Campaign" },
    credits: [
      { role: "Regie, Konzept & Beratung", name: "Luis Fernandez" },
      { role: "Director of Photography", name: "Mohamed Bangura" },
      { role: "Konzept, Kamera & Post Production", name: "Christian Wesner" },
      { role: "Projektkoordination", name: "Eric Nitschke" },
      { role: "Konzept & Beratung", name: "Jens Kemper" },
    ],
    gallery: [
      { src: "/work/merkur-gallery-1.webp", alt: "Merkur Powerclip — Behind the Scenes", ratio: "wide" },
      { src: "/work/merkur-gallery-2.webp", alt: "Merkur Powerclip — Produktion", ratio: "wide" },
      { src: "/work/merkur-gallery-3.webp", alt: "Merkur Powerclip — Portrait", ratio: "tall" },
    ],
  },
  {
    slug: "koelnmesse-anuga-pressekonferenz",
    client: "Koelnmesse",
    project: "Interaktive PK mit KI-gesteuerten Avataren",
    year: "2023",
    category: "Video Event Content · Video AI",
    categories: ["event-content", "artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "Mit der Anuga FoodTec Pressekonferenz setzt die Koelnmesse ein starkes Zeichen für ihre digitale Innovationsbereitschaft. Die PK richtete sich an ein asiatisches Fachpublikum in China und Japan und fand erstmalig mit KI-gesteuerten Avataren statt.\n\nmake/c hat dafür das Tool des „24/7 Beraters“ angepasst. Es wurden Avatare der Protagonisten erstellt, die dann in Echtzeit und interaktiv sowohl chinesisch als auch japanisch mit den Journalisten gesprochen haben, obwohl sie in Wirklichkeit beide Sprachen nicht sprechen.",
    image: { src: "/work/koelnmesse-anuga-pressekonferenz.webp", alt: "Koelnmesse — Interaktive PK mit KI-gesteuerten Avataren" },
  },
  {
    slug: "dmexco-2023",
    client: "DMEXCO 2023",
    project: "Video Produktionen und Trailer",
    year: "2023",
    category: "Video Produktion · Video Event Content",
    categories: ["video-produktion", "event-content"],
    kicker: "/ Case Study /",
    summary:
      "Die DMEXCO öffnet wieder die Pforten in Köln und Marketeers aus der ganzen Welt schauen vorbei. make/c ist seit 2018 durchgehend – ob rein virtuell oder live vor Ort – als Videopartner für die Bühnen dabei.\n\nDiesmal waren es 13 Bühnen parallel. Über 60 makerinnen und maker waren dafür 3 Tage vor Ort. Dazu haben wir fünf, zum Teil tagesaktuelle Trailer produziert.",
    video: "https://vimeo.com/882229550",
    image: { src: "/work/dmexco-2023.webp", alt: "DMEXCO 2023 — Video Produktionen und Trailer" },
  },
  {
    slug: "db-schenker",
    client: "DB Schenker",
    project: "Corporate Studio",
    year: "2023",
    category: "Video Studiobau",
    categories: ["studiobau"],
    kicker: "/ Case Study /",
    summary:
      "DB Schenker ist ein global tätiger Logistik Konzern mit Sitz vor der Haustür unseres Essener Standortes. Wunsch des Kunden war der Bau eines multifunktionsfähigen, hybriden Studios ausgelegt auf Selbstfahrerbetrieb im Alltag.\n\nmake/c konnte im Pitch mit seinem hybriden, leanen und ganzheitlichen Ansatz überzeugen. Wir haben das ganze Projekt von der Nutzung her gedacht und mit unserer langjährigen Content- und Technikexpertise aus einer Hand umgesetzt. Unsere 3D Visualisierung aus den frühen Konzepttagen deckt sich mit der späteren Umsetzung bis in viele Details.",
    image: { src: "/work/db-schenker.webp", alt: "DB Schenker — Corporate Studio" },
  },
  {
    slug: "kpmg",
    client: "KPMG",
    project: "Imagetrailer Insights Center",
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Das Insights Center von KPMG steht für Top Beratung im Bereich KI, Digitalisierung und Advanced Analytics. Doch wie lassen sich diese abstrakten Themen bildstark und dynamisch wie in einem Musikvideo umsetzen? Hier konnten wir unserer Kreativität freien Lauf lassen. Ein Blick in die Umsetzung lohnt sich.\n\nSie müssen den Inhalt von reCAPTCHA laden, um das Formular abzuschicken. Bitte beachten Sie, dass dabei Daten mit Drittanbietern ausgetauscht werden.",
    video: "https://vimeo.com/859822560",
    image: { src: "/work/kpmg.webp", alt: "KPMG — Imagetrailer Insights Center" },
  },
  {
    slug: "format-tools-katalog",
    client: "FORMAT",
    project: "3D Animation",
    year: "2023",
    category: "Video Motion Design",
    categories: ["video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Unter der Marke „FORMAT Tools for Professionals“ produziert die Wuppertaler Firma E/D/E Werkzeuge für echte Profis. Zur Bewerbung des neuen Katalogs sollten ausgewählte Werkzeuge emotional und hochwertig in Szene gesetzt werden. Das Video wird als Header auf der Website und zur Social Media Bewerbung eingesetzt.\n\nmake/c hat im ersten Schritt 3D Modelle der Werkzeuge erstellt und diese im zweiten Schritt emotional in Szene gesetzt – in Verbindung mit dem Katalog. Der Kunde ist happy und wir entsprechend auch!",
    video: "https://www.youtube.com/watch?v=d9gvWj3kgF0",
    image: { src: "/work/format-tools-katalog.webp", alt: "FORMAT — 3D Animation" },
  },
  {
    slug: "zeitgeist",
    client: "Ziegler Zeitgeist",
    project: "Werbespot",
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Sommer, Sonne, Zieglers „Zeitgeist“. Ein Getränk, das Lust auf Sommer macht. Wir durften für unseren Partner Storymachine aus Berlin diesen Spot realisieren. Das Timing war wie immer bei Produktionen sportlich, die Anforderungen an den Cast und die Locations ebenso.\n\nDas maker-Team hat sich der Aufgabe gestellt und binnen kürzester Zeit diesen Spot geplant, organisiert, produziert und postproduziert. Die Creation kommt von Storymachine. Neben dem unten verlinkten Spot haben wir natürlich noch cut-downs für alle gängigen Social-Media-Kanäle angefertigt.",
    image: { src: "/work/zeitgeist.webp", alt: "Ziegler Zeitgeist — Werbespot" },
  },
  {
    slug: "zurich-strategiegarten-2023",
    client: "Zurich StrategieGarten 2023",
    project: "TV-Format „Fernsehgarten“",
    year: "2023",
    category: "Video Strategie · Video Event Content",
    categories: ["video-strategie", "event-content"],
    kicker: "/ Case Study /",
    summary:
      "Seit 2020 dürfen wir bereits die jährlichen Kommunikationsformate der ZURICH Versicherung zum „Strategie 2023“ als Content- und Konzept-Partner begleiten.\n\nNach einer „Late-Night-Show“, einer „digitalen Musical Inszenierung“ war es in diesem Jahr der „ZURICH Strategiegarten“. Angelehnt an den ZDF Fernsehgarten fand die Veranstaltung für über 2.000 Mitarbeiterinnen und Mitarbeiter bei uns gegenüber im legendären Kölner Tanzbrunnen statt.",
    image: { src: "/work/zurich-strategiegarten-2023.webp", alt: "Zurich StrategieGarten 2023 — TV-Format „Fernsehgarten“" },
  },
  {
    slug: "mvv-energie-ag-buga-ar-app",
    client: "MVV Energie AG BUGA",
    project: "Augmented Reality App",
    year: "2023",
    category: "Video Produktion · Video Event Content",
    categories: ["video-produktion", "event-content"],
    kicker: "/ Case Study /",
    summary:
      "Durch die Entwickelung einer speziellen Augmented Reality App können die Besucher der diesjährigen BUGA sechs Kunstwerke von Horst Hamann, ausgestellt von der MVV Mannheim, zum Leben erwecken und sehen durch ihr Handykamerabild Tänzer/innen, die innerhalb und außerhalb des Kunstwerkes performen.\n\nWir haben das künstlerische Konzept dazu entwickelt, die App programmiert und die Aufnahmen mit den Tänzern produziert und choreographiert. Mit Hilfe der App werden die Kunstwerke mit tänzerischen Szenen ergänzt und erwecken die Fotografien „zum Leben“.",
    image: { src: "/work/mvv-energie-ag-buga-ar-app.webp", alt: "MVV Energie AG BUGA — Augmented Reality App" },
  },
  {
    slug: "buga-2023-ki-chatbot",
    client: "Bundesgartenschau 2023 KI Chatbot",
    project: "KI Chatbot",
    year: "2023",
    category: "Video Event Content · Video AI",
    categories: ["event-content", "artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "In Zusammenarbeit mit dem Institut für Künstliche Intelligenz der Uniklinik in Marburg haben wir einen interaktiven, KI-gesteuerten virtuellen Arzt-Avatar entwickelt. Dieser greift auf eine eigens entwickelte künstliche Intelligenz zurück und kann medizinische Fragen fachlich fundiert beantworten und eine Konversation in Echtzeit und in jeder gewünschten Sprache mit den Nutzern führen.\n\nDiese Mechanik ist nach unserem Wissen bisher einzigartig und kann auf alle möglichen Use-Cases auch außerhalb der Medizin übertragen werden. Sprecht uns an. Uns gibt es sogar (noch) in echt ☺",
    image: { src: "/work/buga-2023-ki-chatbot.webp", alt: "Bundesgartenschau 2023 KI Chatbot — KI Chatbot" },
  },
  {
    slug: "obi-gartenmagazin",
    client: "OBI Gartenmagazin",
    project: "Gartenmagazin Motion Graphics Trailer",
    year: "2023",
    category: "Video Motion Design",
    categories: ["video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Seit einigen Jahren begleiten wir schon mit der Agentur NJU zusammen die Digital Signage Aktivitäten von OBI. In dem Zusammenhang sind schon viele Grafiken und Videos bei uns entstanden. Dazu gehört auch dieser Trailer fürs OBI Gartenmagazin 2022. Hier verbinden wir After Effects mit normalem Bewegtbild und machen aus einem vermeintlich statischen Katalog einen echten Hingucker.\n\nSie müssen den Inhalt von reCAPTCHA laden, um das Formular abzuschicken. Bitte beachten Sie, dass dabei Daten mit Drittanbietern ausgetauscht werden.",
    image: { src: "/work/obi-gartenmagazin.webp", alt: "OBI Gartenmagazin — Gartenmagazin Motion Graphics Trailer" },
  },
  {
    slug: "masco-group",
    client: "Masco Group",
    project: "Imagefilm",
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Die Masco Group ist ein international tätiges Unternehmen mit Hauptsitz in Italien. In Zusammenarbeit mit unserem langjährigen Technikpartner Qvest Media haben wir diesen Brandfilm umgesetzt. Masco Group hatte sich zuvor einen neuen “look” und eine neue brand identity geschaffen und seinen „purpose“ und seine „mission“ nachgeschärft. All das sollte in dem neuen Film verarbeitet werden.\n\nmake/c hat das Konzept und das Storyboard entwickelt sowie das video postproduziert – in enger Abstimmung mit Qvest Media und Masco Group.",
    video: "https://vimeo.com/833481331",
    image: { src: "/work/masco-group.webp", alt: "Masco Group — Imagefilm" },
  },
  {
    slug: "workshop-selber-drehen-und-schneiden",
    client: "Workshop",
    project: "selber drehen und schneiden",
    year: "2023",
    category: "Video Strategie",
    categories: ["video-strategie"],
    kicker: "/ Case Study /",
    summary:
      "Manchmal ist es das Budget, manchmal der Zeitdruck: in Unternehmen steigt der Bedarf, selber Video Content produzieren zu können. Was vor einigen Jahren noch undenkbar schien, vermitteln wir heute als Basiswissen in einem eintägigen Workshop.\n\nDie Hürden sind denkbar niedrig, schließlich hat jede/r sein Handy immer dabei. Aber auch wenn das Handy in der Theorie tolle Videos produziert, so sieht es in der Praxis doch oft anders aus. Bildformat, Bildaufbau, Hintergrund, Audio, … Es gibt viele Gründe, die ein Video im Ergebnis schlecht machen können. Und vieles davon ist ganz einfach zu vermeiden.",
    image: { src: "/work/workshop-selber-drehen-und-schneiden.webp", alt: "Workshop — selber drehen und schneiden" },
  },
  {
    slug: "zurich-sicherheit-im-strassenverkehr",
    client: "ZURICH",
    project: "Erklärfilmreihe",
    year: "2023",
    category: "Video Produktion · Video Motion Design",
    categories: ["video-produktion", "video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Für diese Erklärfilm Reihe haben wir eine eigene Handschrift entwickelt, da wir weg wollten von dem 08/15 Erklärfilm Stil. Nach ersten Testläufen in unserem Parkhaus waren der Kunde und wir sofort begeistert.\n\nAm Ende haben wir die fünf Videos in einem Greenscreen Studio mit einem echten Auto und echten Darstellern gedreht und in der Postproduktion entsprechend verfremdet und mit Motion Graphics in eine stilisierte Landschaft versetzt. Die Soundeffekte unterstützen die oft beklemmenden Botschaften eindrucksvoll.",
    video: "https://www.youtube.com/watch?v=D73J23W1pdM",
    image: { src: "/work/zurich-sicherheit-im-strassenverkehr.webp", alt: "ZURICH — Erklärfilmreihe" },
  },
  {
    slug: "ihk-koeln",
    client: "IHK Köln",
    project: "Rahmenvertragspartner Streaming",
    year: "2023",
    category: "Video Event Content",
    categories: ["event-content"],
    kicker: "/ Case Study /",
    summary:
      "Seit Frühjahr 2022 sind wir Rahmenvertragspartner der IHK Köln für Streaming Projekte. Auch in der „Post-Corona“ Zeit erweist sich Streaming für die IHK Veranstaltungen als tragende Säule der Kommunikation und des Austauschs.\n\nSeitdem durften wir schon einige Veranstaltungen in die große weite Welt streamen – u.a. den Frauen-Business-Tag 2022. More to come…",
    video: "https://www.youtube.com/watch?v=wwBqU3QcCXU",
    image: { src: "/work/ihk-koeln.webp", alt: "IHK Köln — Rahmenvertragspartner Streaming" },
  },
  {
    slug: "atlantik-bruecke-70-jahre",
    client: "ATLANTIK-BRÜCKE e.V.",
    project: "Jubiläumsfilm 70 Jahre",
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Schon seit 2020 arbeiten wir immer wieder für die renommierte Atlantik-Brücke in Berlin. In 2022 stand der Festakt zum 70jährigen Jubiläum mit vielen Prominenten Weggefährten an.\n\nWir durften in Form eines Rück- und Ausblicks die Geschichte und Bedeutung der Atlantik-Brücke filmisch in Szene setzen. Dafür standen uns viele renommierte Interviewpartner auf beiden Seiten des Atlantiks zur Verfügung.",
    video: "https://www.youtube.com/watch?v=J4carNHyMvk",
    image: { src: "/work/atlantik-bruecke-70-jahre.webp", alt: "ATLANTIK-BRÜCKE e.V. — Jubiläumsfilm 70 Jahre" },
  },
  {
    slug: "simon-mobile",
    client: "SIMon Mobile",
    project: "Instagram & Facebook Kampagne",
    year: "2022",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Der süße Waschbär SIMON ist das Testimonial der jungen Vodafone Marke „SIMon Mobile“. Als Werbepartner der AdAlliance für das „Sommerhaus der Stars“ wollte sich SIMON gerne selber einen Eindruck vom „Sommerhaus“ machen.\n\nWir haben SIMON dabei mit der Kamera begleitet. Er hat in alle Ecken geschaut und das Haus für die Stars freigegeben…",
    image: { src: "/work/simon-mobile.webp", alt: "SIMon Mobile — Instagram & Facebook Kampagne" },
  },
  {
    slug: "bdsi-twitter-videos",
    client: "BDSI",
    project: "Twitter Videos",
    year: "2022",
    category: "Video Motion Design",
    categories: ["video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Seit einigen Jahren dürfen wir regelmäßig süße Videos machen – für den BDSI. Das aktuellste Projekt sind eine Reihe von Twitter Videos, die der BDSI fortlaufend posted.\n\nHierfür haben wir auf Basis des Kunden CD ein Motion Graphics Design entwickelt und adaptieren es für die jeweilige kurze Story. So kann der BDSI schnell und wirkungsvoll aktuelle Themen der Branche per Video kommunizieren.",
    video: "https://www.youtube.com/watch?v=ql_WuGraClg",
    image: { src: "/work/bdsi-twitter-videos.webp", alt: "BDSI — Twitter Videos" },
  },
  {
    slug: "high-tech-gruenderfonds",
    client: "High-Tech Gründerfonds",
    project: "High-Tech Gründerfonds Start-Up Stories",
    year: "2022",
    category: "Video Strategie · Video Produktion",
    categories: ["video-strategie", "video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Was macht euer Start-Up aus? Warum habt Ihr es gegründet? Welche Tipps könnt Ihr anderen mit auf den Weg geben? Diese Fragen sind für junge Start-Ups, wie sie der High-Tech Gründerfonds berät, essenziell und vielfältig.\n\nDaher produzieren wir eine Reihe kurzer Clips mit erfolgreichen Gründer/innen, die von ihrer Start-Up-Journey berichten. Extra hierfür haben wir ein stark stilisiertes Format mit einer durchgängigen „Dual Tone Beleuchtung“ und eingeblendeten Interviewfragen im „Billboard-Stil“ entwickelt. Die Umsetzung ist eher aus dem Musikvideo-Bereich bekannt und erzeugt visuelle Aufmerksamkeit und einen modernen Look.",
    video: "https://www.youtube.com/watch?v=cuIqtmjkPzQ",
    image: { src: "/work/high-tech-gruenderfonds.webp", alt: "High-Tech Gründerfonds — High-Tech Gründerfonds Start-Up Stories" },
  },
  {
    slug: "greentech-festival",
    client: "Greentech Festival",
    project: "Live-Streaming und Stage Video Produktionen",
    year: "2022",
    category: "Video Event Content",
    categories: ["event-content"],
    kicker: "/ Case Study /",
    summary:
      "Das Greentech-Festival von Nico Rosberg feiert 2022 schon 15jähriges Jubiläum. Vieles war in diesem Jahr neu – z.B. die Location auf dem alten Flughafen Gelände in Tegel und auch der Partner für die (Live) Video Produktionen: make/c.\n\nMit über 30 Personen aus Berlin und Köln waren wir fast eine Woche vor Ort und konnten viele beeindruckende Innovationen aus der Greentech Welt kennenlernen. Höhepunkt war sicher die glamouröse Verleihung der Greentech Awards.",
    video: "https://www.youtube.com/watch?v=VcMqbNpX5pk",
    image: { src: "/work/greentech-festival.webp", alt: "Greentech Festival — Live-Streaming und Stage Video Produktionen" },
  },
  {
    slug: "gothaer-versicherung",
    client: "GOTHAER Versicherung",
    project: "Social Media Spot",
    year: "2022",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Ein Job in der Versicherungsbranche? Klingt langweilig, kann aber ganz schön spannend sein. Und viele Vorteile für Arbeitnehmer/innen gibt es auch noch. Aber wir zeigt man das in einem Spot, der Lust auf mehr macht und nicht „more of the same“ ist.\n\nWir haben eine Kreation entwickelt, die bekannte Elemente der Dating Welt aufgreift, und spielerisch und mit einer Prise Humor auf die Job-Möglichkeiten bei der Gothaer hinweist.",
    image: { src: "/work/gothaer-versicherung.webp", alt: "GOTHAER Versicherung — Social Media Spot" },
  },
  {
    slug: "toyota-cross-und-quer",
    client: "Toyota",
    project: "Cross & Quer",
    year: "2022",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Im September 2021 ging es mit Jan Köppen und seinem filmenden Kumpel „Jimmie“ auf einen Road Trip. „Cross und Quer“ durch Deutschland war die Aufgabenstellung und zeigt, wie schön es vor der eigenen Haustür sein kann.\n\nWir haben entsprechende Locations in der Eifel, im Weltkulturerbe Mittelrheintal und in Bonn gefunden. Dazu entsprechende Storyboards entwickelt und unser Team mit einer Sony FX6, Sony FX3 und einer Drohne ausgestattet. Die Stimmung war – anders als das Wetter – durchgehend gut.",
    image: { src: "/work/toyota-cross-und-quer.webp", alt: "Toyota — Cross & Quer" },
  },
  {
    slug: "anuga-live-stream",
    client: "Anuga",
    project: "Live-Streams und Trailer",
    year: "2022",
    category: "Video Event Content",
    categories: ["event-content"],
    kicker: "/ Case Study /",
    summary:
      "Als Live-Streaming Partner der Koelnmesse durften wir im Jahr 2021 u.a. die Weltleitmesse für die Lebensmittel- und Getränkeindustrie `Anuga´ produzieren. An 10 Tagen mehr als 100 Speaker von 6 Bühnen mit ca. 74 Stunden Programm.\n\nAußerdem haben wir in Form eines Trailers einen kurzweiligen und informativen Rückblick auf die erfolgreiche und hybride `Anuga´ 2021 hergestellt. Die Messe findet alle zwei Jahre statt und der Trailer sorgt jetzt schon für große Vorfreude auf die nächste `Anuga´ im Jahr 2023.",
    video: "https://www.youtube.com/watch?v=bhiYsZTc7t4",
    image: { src: "/work/anuga-live-stream.webp", alt: "Anuga — Live-Streams und Trailer" },
  },
  {
    slug: "aldi",
    client: "ALDI",
    project: "Retail Campaign Assets",
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "Case ALDI",
    summary:
      "Für ALDI wurden Hero-Assets und Content-Cuts entwickelt, die kanalübergreifend funktionieren und gleichzeitig den Markencharakter konsequent transportieren.",
    services: ["Kampagnenkonzept", "Produktion", "Postproduktion", "Format-Adaption", "Rollout Support"],
    image: { src: "/work/aldi.webp", alt: "ALDI — Retail Campaign Assets" },
  },
];

const BY_SLUG = new Map(CASES.map((c) => [c.slug, c]));

/**
 * Cases in der Reihenfolge der übergebenen Slugs — für die drei kuratierten
 * Kacheln je Leistungsseite (`SERVICE_PAGES[].caseSlugs`) und für das
 * Selected-Work-Raster der Startseite. Unbekannte Slugs fallen still weg;
 * genauso verhielt sich vorher `getCaseStudiesBySlugs()`.
 */
export function getCasesBySlugs(slugs: string[]): CaseStudy[] {
  return slugs.flatMap((slug) => {
    const found = BY_SLUG.get(slug);
    return found ? [found] : [];
  });
}
