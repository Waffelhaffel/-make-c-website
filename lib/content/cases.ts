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
  // Die ersten Einträge gehören zu den Selected-Work-Kacheln der Startseite und
  // stehen deshalb bewusst vorn — also in der ersten Reihe von /work.
  {
    slug: "telekom",
    client: "Telekom",
    project: "Event Content",
    // ⚠️ Jahr **abgeleitet, nicht vom User bestätigt**: der Platzhalter stand auf
    // 2026, das verlinkte Video heißt bei Vimeo „Telekom: DIGITAL X 2025
    // (Opener)" und ist am 29.09.2025 hochgeladen — die DIGITAL X 2025 fand im
    // September 2025 statt. Bitte gegenlesen.
    year: "2025",
    category: "Video Event Content",
    categories: ["event-content"],
    kicker: "/ Case Study /",
    summary:
      "Für die DIGITAL X von der Telekom haben wir sämtliche Assets für die Event-Technik entwickelt und produziert. Am wichtigsten war die Entwicklung eines Event-Opening-Clips, welcher zwar auch aus Stock-Footage bestand, aber durch den Einsatz von KI so angepasst wurde, dass die Magenta-Farbe des Kunden immer wieder auftaucht.",
    // ⚠️ Privacy-Hash `/c758523c3c` muss dranbleiben — ohne ihn 403.
    video: "https://vimeo.com/1122980838/c758523c3c",
    // 4:5 vorgeschnitten (614×768): im mittigen Beschnitt des Rasters fiel das
    // „R" von READY weg. Das Case-Fenster zeigt das Standbild im 16:9-Rahmen,
    // deshalb dort das ungeschnittene Poster.
    image: { src: "/work/telekom.webp", alt: "Telekom — Event Content" },
    poster: { src: "/work/telekom-poster.webp", alt: "Telekom — Event Content" },
    credits: [
      { role: "Projektsteuerung", name: "Paul Zajonc, Michael Ramlau" },
      { role: "Produktion", name: "Jason Philip, Tobias Mächler, Jennifer Lorey" },
    ],
  },
  {
    slug: "fom-studio",
    client: "FOM",
    project: "Studiobau und Betrieb",
    // ⚠️ Jahr **abgeleitet, nicht vom User bestätigt**: der Platzhalter stand auf
    // 2026, der verlinkte Trailer ist am 02.11.2022 bei Vimeo hochgeladen. Wie
    // bei `ihk-koeln` ein laufendes Engagement — make/c betreibt das Studio
    // weiter —, deshalb das **Startjahr**. Bitte gegenlesen.
    year: "2022",
    category: "Video Studiobau",
    categories: ["studiobau"],
    kicker: "/ Case Study /",
    // ⚠️ Dieser Text ist nach Stichworten des Users formuliert („komplettes
    // Studio gebaut und betrieben, dort finden sämtliche Produktionen und
    // Live-Streams statt"), nicht von ihm geliefert. Bewusst kurz gehalten:
    // alles Weitere wäre erfunden. Gehört gegengelesen.
    summary:
      "Für die FOM haben wir ein komplettes Studio gebaut – und betreiben es seitdem auch. Bau und laufender Betrieb kommen damit aus einer Hand.\n\n" +
      "Dort finden sämtliche Produktionen und Live-Streams der FOM statt.",
    // ⚠️ Privacy-Hash `/34049b2655` muss dranbleiben — ohne ihn 403.
    video: "https://vimeo.com/766440947/34049b2655",
    image: { src: "/work/fom-studio.webp", alt: "FOM — Studiobau und Betrieb" },
  },
  {
    slug: "barmenia-gothaer",
    client: "BarmeniaGothaer",
    project: "KI Avatar",
    // Veröffentlichung: 2026.
    year: "2026",
    category: "Video AI",
    categories: ["artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "Wie gibt man einem Chatbot ein Gesicht – glaubwürdig, sympathisch, und mit exakt derselben Stimme wie am Telefon?\n\n" +
      "Für die BarmeniaGothaer haben wir genau das für ihren Chatbot „Stella“ umgesetzt: von der Charakter- und Location-Auswahl über die Feinjustierung von Outfit und Farbkontrast bis zur fertigen KI-Videoproduktion.\n\n" +
      "Das Ergebnis: ein 2:25-minütiges internes Trainingsvideo mit 25 Szenen, das Stella den Vermittler:innen der BarmeniaGothaer nahbar und hilfreich näherbringt – inklusive Tipps, wie man Stella am schnellsten zur richtigen Antwort bringt.\n\n" +
      "Technisch entstanden dabei: 5 Charakter-Entwürfe, 6 Locations, 5 Outfit-Alternativen – und für jede finale Szene im Schnitt rund neun verworfene Testläufe. KI-Video ist eben kein Knopfdruck, sondern Prompt für Prompt erarbeitetes Handwerk.",
    // ⚠️ Privacy-Hash `/7bba868bfd` muss dranbleiben — ohne ihn 403.
    // Hinweis: das verlinkte Video heißt bei Vimeo „Vorstellungsvideo: KI-Chatbot
    // „Stella" (BarmeniaGothaer)" und läuft **45 s** — der Text oben beschreibt
    // das 2:25-minütige **interne** Trainingsvideo. Der Link ist also der
    // öffentliche Ausschnitt, nicht der Film selbst.
    video: "https://vimeo.com/1220776527/7bba868bfd",
    image: { src: "/work/barmenia-gothaer.webp", alt: "BarmeniaGothaer — KI Avatar" },
    credits: [{ role: "Steuerung", name: "Christian Wesner" }],
  },
  {
    // ⚠️ Nicht mit `merkur` verwechseln — das ist der Imagefilm samt sieben
    // Produktvideos (2025). Dieser Case ist die achtteilige Doku (2026); die
    // Selected-Work-Kachel „Merkur Lighthouse" auf der Startseite zeigte bis
    // 24.08.2026 auf `merkur` und damit auf den falschen Case.
    slug: "merkur-lighthouse",
    client: "MERKUR GROUP",
    project: "Dokumentation über Change Prozess (8 Folgen)",
    // Veröffentlichung: Sommer 2026.
    year: "2026",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Die MERKUR GROUP ist ein führender Anbieter im europäischen Glücksspielmarkt und darüber hinaus weltweit tätig.\n\n" +
      "Seit 2025 vollzieht die Gruppe einen tiefgreifenden Change-Prozess, der sich unter anderem auch auf die interne Spiele-Entwicklung auswirkt. Im Auftrag von Aufsichtsrat und Vorstand haben wir über einen Zeitraum von mehr als zwölf Monaten zwei Entwickler-Teams aus dem österreichischen Graz und dem ostwestfälischen Lübbecke intensiv bei der Entwicklung von zwei neuen Spielen begleitet.\n\n" +
      "Die Spiele werden intern als „Lighthouse-Spiele“ bezeichnet, da sie die Art und Weise, wie Merkur in dem Bereich arbeitet, grundlegend ändern und zur Blaupause für die verschiedenen weltweiten Entwickler-Studios gelten sollen.\n\n" +
      "make/c hat die Teams international begleitet – nach Las Vegas, Barcelona und natürlich nach Graz und Lübbecke. Dabei sind acht Doku-Folgen als Heldenreise entstanden, die einen ungewöhnlich ehrlichen und ungeschönten Einblick in den Maschinenraum eines Mittelständlers mit über 15.000 Mitarbeitern liefern.\n\n" +
      "Als Video Agentur haben wir hier eine umfassende Kreativ- und Beratungsleistung abgeliefert und einen komplexen Produktions- und Postproduktionsprozess intern durchgeführt. Hier zeigt sich die große Bandbreite des make/c Portfolios inklusive anspruchsvoller redaktioneller und dramaturgischer Fähigkeiten. Regisseur der Folgen ist der Gewinner des Bayerischen Fernsehpreises und make/c-Geschäftsführer Jens Kemper.",
    // ⚠️ **Kein Video, sondern eine Website.** Zu dieser Doku gibt es keinen
    // Vimeo-/YouTube-Link, nur die Merkur-Microsite. `VideoFacade` erkennt keinen
    // Anbieter und öffnet die URL deshalb beim Klick in einem neuen Tab, statt
    // etwas einzubetten — der Datenschutzhinweis entfällt dann bewusst, weil
    // nichts nachgeladen wird. Der Play-Kreis auf dem Standbild führt also nach
    // außen. UTM-Parameter der E-Mail-Kampagne (`utm_source=email…`) sind
    // entfernt: von der Website aus wären sie schlicht falsche Zuordnung.
    video: "https://lighthouse.merkur.group/",
    // Die Titelkarte ist 1,88:1. Das /work-Raster ist 4:5 — ein mittiger
    // Beschnitt macht aus „MERKUR" ein „MER" (geprüft). Deshalb liegt die ganze
    // Karte auf `makec-dark` (#14140F), nach oben versetzt, damit die
    // Textauszeichnung der Kachel unten freien Grund hat. Ein echtes Standbild
    // aus der Doku im Hochformat wäre hier besser.
    image: { src: "/work/merkur-lighthouse.webp", alt: "MERKUR Lighthouse — Doku über den Change-Prozess" },
    poster: { src: "/work/merkur-lighthouse-poster.webp", alt: "MERKUR Lighthouse — Titelkarte „Von Lübbecke nach Las Vegas“" },
    credits: [
      { role: "Konzept & Regie", name: "Jens Kemper" },
      { role: "Creative Producer", name: "Daria Semcov" },
      { role: "Redaktion", name: "Marco Gromotka" },
      { role: "DOP", name: "Leonard Küper, Christian Wesner, Tommy Zander, Fynn Reifenrath" },
      { role: "Postproduktion", name: "Santo Kocans, Leonard Küper" },
    ],
  },
  {
    slug: "cwh-bih-sbv-wahl",
    client: "CWH | BIH",
    project: "Mockumentary zur SBV-Wahl",
    year: "2026",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Inklusion trifft Comedy: Die Schwerbehindertenvertretung übernimmt eine wichtige Aufgabe in Unternehmen und Dienststellen. Um Beschäftigte für dieses Ehrenamt zu gewinnen, braucht es vor allem eines: einen Zugang, der Berührungsängste abbaut und Lust darauf macht, selbst Verantwortung zu übernehmen.\n\nIm Stil einer Mockumentary à la The Office haben wir für die BIH einen Motivationsfilm entwickelt, der das Thema mit trockenem Humor, starken Figuren und viel Gespür für den ganz normalen Büroalltag erzählt. Im Mittelpunkt steht Martin. Seine Kolleginnen und Kollegen halten ihn für genau den Richtigen, um sich als SBV zur Wahl zu stellen. Martin selbst muss sich mit diesem Gedanken allerdings erst einmal anfreunden. Zwischen gut gemeinten Überredungsversuchen, skeptischen Blicken in die Kamera und herrlich unangenehmen Büromomenten erkennt er nach und nach, wie viel er in diesem Amt für andere bewegen kann.\n\nGemeinsam mit unserer Partneragentur CW Haarfeld haben wir das Projekt von der ersten Idee bis zum fertigen Film realisiert. Aus dem inhaltlichen Ansatz entwickelten wir das Drehbuch und übersetzten die Geschichte anschließend in ein detailliertes Shootingboard. Parallel entstand mit dem Casting, der Auswahl der Motive sowie der Gestaltung von Set und Requisite nach und nach Martins Bürowelt.\n\nDie Mockumentary haben wir konsequent wie eine fiktionale Kurzfilmproduktion umgesetzt. Denn hier entscheidet das Timing: ein zu langer Blick, eine kleine Irritation, eine beiläufige Geste oder ein schief hängendes Türschild. Was leicht und spontan wirkt, ist bis ins Detail entwickelt und präzise inszeniert.\n\nEntstanden ist ein unterhaltsamer Kampagnenfilm, der ein komplexes Thema leicht und zugänglich vermittelt und gleichzeitig zeigt, wie wichtig die Schwerbehindertenvertretung ist. Der Film ist Teil des umfangreichen Informationsangebots der BIH zur SBV-Wahl und wurde mit Untertiteln sowie in einer Fassung mit Audiodeskription veröffentlicht.",
    // Aus der Projektbeschreibung abgeleitet — jeder Punkt steht dort wörtlich.
    services: [
      "Konzept & Drehbuch",
      "Shootingboard",
      "Casting",
      "Set & Requisite",
      "Regie & Produktion",
      "Postproduktion",
      "Untertitel & Audiodeskription",
    ],
    video: "https://www.youtube.com/watch?v=F2H8z1DMiBk",
    // Titelbild ist das YouTube-Thumbnail (1280×720). Kein eigenes `poster`
    // nötig: 16:9 passt im Case-Fenster, und das 4:5-Raster auf /work schneidet
    // mittig auf den Protagonisten — geprüft.
    image: { src: "/work/cwh-bih-sbv-wahl.webp", alt: "CWH | BIH — Mockumentary zur SBV-Wahl" },
    credits: [
      { role: "Regie, Konzept und Beratung", name: "Marco Gromotka" },
      { role: "Kamera", name: "Mohamed Bangura" },
      { role: "Postproduktion", name: "Jennifer Lorej" },
      { role: "Projektkoordination", name: "Marie Hill, Marco Gromotka" },
    ],
    // Reihenfolge ist Layout: Position 1 läuft über die volle Breite (16:9),
    // 2 und 3 stehen im Case-Fenster nebeneinander (4:5). ⚠️ Das erste Bild ist
    // deshalb schon als 16:9 abgelegt und **von oben** geschnitten — die Quelle
    // ist 4:3, und der mittige Beschnitt des `wide`-Rahmens hat beiden Personen
    // die Gesichter gekappt (geprüft).
    gallery: [
      { src: "/work/cwh-bih-sbv-wahl-gallery-1.webp", alt: "Mockumentary zur SBV-Wahl — Team am Set", ratio: "wide" },
      { src: "/work/cwh-bih-sbv-wahl-gallery-2.webp", alt: "Mockumentary zur SBV-Wahl — Vorbereitung im Büro-Set", ratio: "tall" },
      { src: "/work/cwh-bih-sbv-wahl-gallery-3.webp", alt: "Mockumentary zur SBV-Wahl — Szene auf dem Kameramonitor", ratio: "tall" },
    ],
  },
  {
    slug: "flughafen-koeln-bonn",
    client: "Flughafen Köln Bonn",
    project: "Imagefilm „Tag und Nacht“",
    // Veröffentlichung: Frühjahr 2026.
    year: "2026",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Der Flughafen Köln Bonn ist mehr als ein Ort für Passagiere – durch seinen 24-Stunden-Betrieb ist er auch ein zentraler Knotenpunkt für die weltweite Luftfracht. Genau diese beiden Geschäftsfelder, Passagier- und Frachtverkehr, stehen im Mittelpunkt unseres Imagefilms.\n\n" +
      "Nach 2017 konnten wir uns auch im Pitch um den neuen Imagefilm 2025 durchsetzen. Im Nachgang haben wir den Flughafen umfassend beraten. Das Ergebnis: die Produktion von zwei Filmen für drei Zielgruppen. Der hier gezeigte Film ist die „informative Basis“ – für Kunden (Passagiere und Fracht) und Besucher des Flughafens. Ein weiterer Film zeigt in einer szenischen und emotionalen Umsetzung die Bedeutung des wichtigen Verkehrsknotenpunkts für die Region.\n\n" +
      "In enger Abstimmung mit dem Flughafen haben wir ein Storyboard entwickelt und alle relevanten Stakeholder eingebunden. An mehr als zehn Drehtagen haben wir beide Bereiche (Passagier und Fracht) bei Tag und Nacht bildgewaltig in Szene gesetzt – auf der Landebahn, im Bauch einer Boeing 747 Cargo und in der Gepäck-Sortieranlage. Entstanden ist ein informativer Film, der bewusst auch nonverbal funktioniert und so vielseitig einsetzbar ist, etwa in POS-Installationen oder auf Messen.\n\n" +
      "Ein Flughafen als Drehlocation stellt besondere Anforderungen an die Sicherheit. Drei Mitglieder unseres Teams haben dafür nicht nur eine Sicherheitsschulung durchlaufen, sondern eigens Führerscheine für den Flughafenbereich erworben, um während des Drehs maximal flexibel agieren zu können. Ebenfalls in Abstimmung mit dem Flughafen und der Deutschen Flugsicherung konnten wir zudem einen Drohneneinsatz im laufenden Passagierflugbetrieb realisieren.\n\n" +
      "Zusätzlich haben wir für den Flughafen eine umfangreiche Auswahl an hochwertigen Aufnahmen vom allgemeinen Flughafengeschehen erstellt.",
    // „Flughafen Köln/Bonn: CGN Tag und Nacht", bei Vimeo hochgeladen am
    // 12.12.2025, 3:12 — passt zu Titel und `year: "2026"`. ⚠️ Hier stand
    // kurzzeitig `766440834/75b98ea4b3`: das ist der **Vorgängerfilm** von
    // 11/2022 („Köln Bonn Flughafen Imagefilm", 3:41). Beim nächsten Linkwechsel
    // also erst über die Vimeo-oEmbed-API gegenprüfen, welcher Film das ist —
    // an der URL sieht man es nicht.
    //
    // ⚠️ Der zweite Pfadteil `/bcd6146c00` ist der Privacy-Hash des nicht
    // gelisteten Videos und **muss dranbleiben** — ohne ihn antwortet der Player
    // mit 403. `VideoFacade.toProvider()` reicht ihn seit 24.08.2026 als `h=`
    // an die Embed-URL weiter.
    video: "https://vimeo.com/1145863082/bcd6146c00",
    image: { src: "/work/flughafen-koeln-bonn.webp", alt: "Flughafen Köln Bonn — Imagefilm „Tag und Nacht“" },
    credits: [
      { role: "Regie, Konzept und Beratung", name: "Mike Krack, Christian Wesner" },
      { role: "Kamera", name: "Mohamed Bangura, Christian Wesner" },
      { role: "Postproduktion", name: "Christian Wesner" },
      { role: "Projektkoordination", name: "Eric Nitschke, Mike Krack" },
      { role: "Konzept und Beratung", name: "Jens Kemper" },
    ],
    gallery: [
      { src: "/work/flughafen-koeln-bonn-gallery-1.webp", alt: "Flughafen Köln Bonn — Fluggastbrücke am Vorfeld", ratio: "wide" },
      { src: "/work/flughafen-koeln-bonn-gallery-2.webp", alt: "Flughafen Köln Bonn — zwei Maschinen aus der Vogelperspektive", ratio: "wide" },
    ],
  },
  {
    slug: "wundholding",
    client: "Thermengruppe Josef Wund",
    project: "Imagespot und diverse Erklärvideos",
    // Veröffentlichung: August 2025.
    year: "2025",
    category: "Video Produktion · Video Motion Design",
    categories: ["video-produktion", "video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Die Thermengruppe Josef Wund ist ein führender Anbieter von Wellness Einrichtungen in Deutschland.\n\n" +
      "make/c hat schon mehrere innovative Wellnessangebote für den Kunden in Bewegtbildprojekten festgehalten. Hier geht es um das immersive Erlebnis „Breathing Planet“ der Thermen & Badewelt Sinsheim. In dieser Anwendung verbinden sich Technologie, Kunst und Natur auf eindrucksvolle Weise – Entschleunigung garantiert!\n\n" +
      "Als Video Agentur haben wir hier eine umfassende Kreativ- und Beratungsleistung abgeliefert und einen komplexen Produktions- und Postproduktionsprozess intern durchgeführt.",
    video: "https://www.youtube.com/watch?v=AyIptBu0qG8",
    image: { src: "/work/wundholding.webp", alt: "Thermengruppe Josef Wund — Imagespot und diverse Erklärvideos" },
    credits: [
      { role: "Konzept & Regie", name: "Jason Philipp" },
      { role: "DOP", name: "Mohamed Bangura" },
      { role: "Postproduktion", name: "Jason Philipp" },
    ],
  },
  {
    slug: "koelner-zoo",
    client: "Kölner Zoo",
    project: "Kinospot und Social Media Spot „Dinosaurier in Köln“",
    // Veröffentlichung: Mai 2025.
    year: "2025",
    category: "Video Produktion · Video AI",
    categories: ["video-produktion", "artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "Die Dinos kommen wieder nach Köln – nach 65 Millionen Jahren… Doch auf ihrem Weg in den Zoo, wo sie in einer Langzeitausstellung zu bewundern sind, müssen sie zuerst durch die Innenstadt…\n\n" +
      "Was noch vor kurzer Zeit einen großen Aufwand im Bereich VFX und Motion Design nach sich gezogen hätte, geht dank modernster KI Technologie heute einfacher, schneller, günstiger und auch besser.\n\n" +
      "Als langjährige Video Agentur und Partner des Kölner Zoos haben wir dieses Pionierprojekt von A-Z inhouse realisiert.",
    // Aus der Projektinfo des Users: „(Hybrides KI-Videoprojekt)“.
    services: ["Hybrides KI-Videoprojekt"],
    video: "https://vimeo.com/1082112601",
    image: { src: "/work/koelner-zoo.webp", alt: "Kölner Zoo — Kinospot und Social Media Spot „Dinosaurier in Köln“" },
    credits: [
      { role: "Konzept", name: "Christian Wesner" },
      { role: "DOP", name: "Mohamed Bangura" },
      { role: "Postproduktion und KI Artist", name: "Christian Wesner" },
    ],
  },
  {
    slug: "merkur",
    client: "MERKUR",
    project: "Imagefilm und 7 Produktvideos",
    // Veröffentlichung: Juni 2025 (stand vorher auf 2024).
    year: "2025",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Die MERKUR Gruppe hat ihren Außenauftritt grundlegend erneuert. Dabei soll Bewegtbild eine wesentliche Rolle spielen. Das haben wir wörtlich genommen und MERKUR auch im Video optisch „neu erfunden“.\n\n" +
      "Über ein Jahr hat die Vorbereitung gedauert, angefangen mit einem weißen Blatt Papier und der großen Frage: Wie kann man sieben auch optisch sehr unterschiedliche Geschäftsbereiche visuell attraktiv in Szene setzen? Die Lösung: wir haben einen sehr dynamischen kurzen und emotionalen Imagefilm entwickelt und daraus sieben weitere Produktvideos abgeleitet.\n\n" +
      "Sie wurden alle im gleichen Studio aber mit unterschiedlichen Setups produziert und zwei Darsteller leiten durch alle Filme. Das Ergebnis ist ein optisches Powerplay und wurde der begeisterten Belegschaft unter anderem in einem Kino präsentiert.\n\n" +
      "Als Video Agentur haben wir hier eine umfassende Kreativ- und Beratungsleistung abgeliefert und einen komplexen Produktions- und Postproduktionsprozess intern durchgeführt. Dazu gehörten auch KI gesteuerte Prozesse, aufwändige 3D Grafiken und ein professionelles Color Grading.",
    services: ["Creative Direction", "Konzept & Story", "Regie & Produktion", "Postproduktion", "Social Adaptions"],
    video: "https://www.youtube.com/watch?v=-kbigMenDpM",
    // Eines der sieben Produktvideos. Steht im Case-Fenster unter dem Text
    // als „Weiteres Video“ — siehe `secondaryVideos` in ./types.ts.
    secondaryVideos: [
      {
        url: "https://www.youtube.com/watch?v=jV5H2FSu5Mg",
        // Standbild ist das YouTube-Thumbnail, aber **lokal** abgelegt — direkt
        // von ytimg.com geladen ginge sonst schon beim Öffnen des Fensters eine
        // Anfrage an Google raus.
        poster: { src: "/work/merkur-video-2.webp", alt: "MERKUR — Produktvideo" },
      },
    ],
    image: { src: "/work/merkur.webp", alt: "MERKUR — Imagefilm und 7 Produktvideos" },
    poster: { src: "/work/merkur-poster.webp", alt: "MERKUR — Imagefilm und 7 Produktvideos" },
    credits: [
      { role: "Regie, Konzept und Beratung", name: "Luis Fernandez" },
      { role: "Konzept, Beratung, Kamera und Postproduktion", name: "Christian Wesner" },
      { role: "DOP", name: "Mohamed Bangura" },
      { role: "Projektkoordination", name: "Eric Nitschke" },
      { role: "Konzept und Beratung", name: "Jens Kemper" },
    ],
    gallery: [
      { src: "/work/merkur-gallery-1.webp", alt: "MERKUR — Behind the Scenes", ratio: "wide" },
      { src: "/work/merkur-gallery-2.webp", alt: "MERKUR — Produktion", ratio: "wide" },
      { src: "/work/merkur-gallery-3.webp", alt: "MERKUR — Portrait", ratio: "tall" },
    ],
  },
  {
    slug: "koelnmesse-anuga-pressekonferenz",
    client: "Koelnmesse",
    project: "Interaktive PK mit KI-gesteuerten Avataren",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Event Content · Video AI",
    categories: ["event-content", "artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "Mit der Anuga FoodTec Pressekonferenz setzt die Koelnmesse ein starkes Zeichen für ihre digitale Innovationsbereitschaft. Die PK richtete sich an ein asiatisches Fachpublikum in China und Japan und fand erstmalig mit KI-gesteuerten Avataren statt.\n\nmake/c hat dafür das Tool des „24/7 Beraters“ angepasst. Es wurden Avatare der Protagonisten erstellt, die dann in Echtzeit und interaktiv sowohl chinesisch als auch japanisch mit den Journalisten gesprochen haben, obwohl sie in Wirklichkeit beide Sprachen nicht sprechen.\n\n" +
      // ⚠️ Der User schrieb hier „Hier geht es zum Beitrag bei RTL!" mit
      // Doppelpunkt davor — **ohne URL**. `summary` ist reiner Text und rendert
      // ohnehin keine Links, deshalb steht hier ein vollständiger Satz statt
      // eines ins Leere zeigenden Verweises. Wenn die RTL-URL nachkommt, braucht
      // es ein eigenes Feld am Typ (oder einen `secondaryVideos`-Eintrag).
      "Diese „kleine Weltpremiere“ hat auch die Kollegen von RTL begeistert – es war ihnen einen eigenen Beitrag wert, über den wir uns sehr gefreut haben.\n\n" +
      // ⚠️ Kundenzitat, wie bei `db-schenker` mangels eigenem Feld im Fließtext.
      // Wortlaut ist Fremdrede: nicht kürzen, nicht übersetzen.
      "„Many thanks to our partners from make/c - video content marketing GmbH for the creativity and realization.“\n\n" +
      "— Oliver Frese, Geschäftsführer Koelnmesse",
    services: ["Pressekonferenz mit interaktiven, KI-gesteuerten Avataren auf chinesisch und japanisch"],
    image: { src: "/work/koelnmesse-anuga-pressekonferenz.webp", alt: "Koelnmesse — Interaktive PK mit KI-gesteuerten Avataren" },
    credits: [
      { role: "Kunde", name: "Koelnmesse, Anuga FoodTec" },
      { role: "Projektsteuerung", name: "Michael Ramlau, Melissa Eken, Eric Nitschke" },
    ],
  },
  {
    slug: "dmexco-2023",
    client: "DMEXCO 2023",
    project: "13 Stages: Video Produktionen und Trailer",
    // ⚠️ **Kein Jahr, sondern eine Dauer** (User-Vorgabe 24.08.2026): make/c ist
    // seit 2018 durchgehend Videopartner der DMEXCO-Bühnen, und das soll auf der
    // Kachel stehen — nicht „2023". `year` ist ein freier String und wird nur
    // angezeigt (`WorkGrid`, `CaseModal`), nie gerechnet, das geht also.
    // ⚠️ Zwei Nebenwirkungen: die Metazeile liest sich jetzt „DMEXCO 2023 · seit
    // 2018", und `year` ist zugleich das Kriterium für den 2022-Schnitt — dieser
    // Case fällt damit aus der Sortierlogik heraus.
    year: "seit 2018",
    category: "Video Produktion · Video Event Content",
    categories: ["video-produktion", "event-content"],
    kicker: "/ Case Study /",
    summary:
      "Die DMEXCO öffnet wieder die Pforten in Köln und Marketeers aus der ganzen Welt schauen vorbei. make/c ist seit 2018 durchgehend – ob rein virtuell oder live vor Ort – als Videopartner für die Bühnen dabei.\n\n" +
      "Diesmal waren es 13 Bühnen parallel. Über 60 makerinnen und maker waren dafür 3 Tage vor Ort. Dazu haben wir fünf, zum Teil tagesaktuelle Trailer produziert.\n\n" +
      "Die Messe war ein voller Erfolg, der überall greifbar zur spüren war – auch an unserem make/c Stand, den wir traditionell auf der DMEXCO betreiben.",
    // ⚠️ Der Vimeo-Player antwortet für dieses Video mit **401**, auch mit
    // Referer make-c.de (geprüft 24.08.2026, im Browser: „We couldn't verify
    // the security of your connection"). Die anderen Vimeo-Videos der Seite
    // liefern von derselben Leitung 200 — es liegt also am Video, nicht an der
    // Verbindung. Der Link stand schon vorher hier; vor dem Go-Live auf der
    // echten Domain gegenprüfen, sonst zeigt das Case-Fenster nach dem
    // Play-Klick eine Fehlermeldung von Vimeo.
    video: "https://vimeo.com/882229550",
    image: { src: "/work/dmexco-2023.webp", alt: "DMEXCO 2023 — 13 Stages: Video Produktionen und Trailer" },
    credits: [
      { role: "Kunde", name: "Koelnmesse, DMEXCO 2023" },
      { role: "Ort", name: "Köln" },
      { role: "Steuerung", name: "Philip Welkisch, Mike Krack, Marie Lindner, Eric Nitschke" },
    ],
  },
  {
    slug: "db-schenker",
    client: "DB Schenker",
    project: "Konzeption und Bau eines Corporate Studios",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Studiobau",
    categories: ["studiobau"],
    kicker: "/ Case Study /",
    // ⚠️ Der letzte Absatz ist ein **Kundenzitat**. Der `CaseStudy`-Typ hat kein
    // Feld dafür, deshalb steht es im Fließtext — es wird also wie normaler
    // Absatz gesetzt, nicht als hervorgehobenes Zitat. Wortlaut ist Fremdrede:
    // nicht kürzen oder glätten. Wer es gestaltet haben will, braucht ein
    // eigenes Feld am Typ und einen Block in `CaseModal.tsx`.
    summary:
      "DB Schenker ist ein global tätiger Logistik Konzern mit Sitz vor der Haustür unseres Essener Standortes. Wunsch des Kunden war der Bau eines multifunktionsfähigen, hybriden Studios ausgelegt auf Selbstfahrerbetrieb im Alltag.\n\n" +
      "make/c konnte im Pitch mit seinem hybriden, leanen und ganzheitlichen Ansatz überzeugen. Wir haben das ganze Projekt von der Nutzung her gedacht und mit unserer langjährigen Content- und Technikexpertise aus einer Hand umgesetzt. Unsere 3D Visualisierung aus den frühen Konzepttagen deckt sich mit der späteren Umsetzung bis in viele Details.\n\n" +
      "Nach der Fertigstellung haben wir das Schenker-Personal für den Selbstfahrer-Betrieb geschult und helfen bei größeren Produktionen auf Anfrage immer wieder aus. Das Studio erfreut sich im Schenker Universum großer Beliebtheit.\n\n" +
      "„Das fertige Studio entspricht genau unseren Erwartungen aus unserem Briefing und der Visualisierung von make/c. Sie haben den Prozess zu unserer vollsten Zufriedenheit gesteuert – immer kreativ, zuverlässig und lösungsorientiert. Wir freuen uns auf die weitere Zusammenarbeit.“\n\n" +
      "— Christoph Kocher, Head of Competence Center „Content & Internal Communications“, Schenker AG",
    image: { src: "/work/db-schenker.webp", alt: "DB Schenker — Corporate Studio" },
    credits: [
      { role: "Kunde", name: "Schenker AG" },
      { role: "Ort", name: "Essen" },
      { role: "Steuerung", name: "Philip Welkisch, Malte Hoffmann" },
    ],
  },
  {
    slug: "kpmg",
    client: "KPMG",
    project: "Imagetrailer Insights Center",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      // ⚠️ Hier stand bis 24.08.2026 ein zweiter Absatz „Sie müssen den Inhalt
      // von reCAPTCHA laden, um das Formular abzuschicken…" — Consent-Text der
      // alten Portfolio-Seite, den der Import 08/2026 mit eingesammelt hat. Er
      // war sichtbar im Case-Fenster und speiste die `CreativeWork.description`
      // in der `ItemList` von /work. Entfernt; kein Ersatztext, weil es keinen
      // gibt.
      "Das Insights Center von KPMG steht für Top Beratung im Bereich KI, Digitalisierung und Advanced Analytics. Doch wie lassen sich diese abstrakten Themen bildstark und dynamisch wie in einem Musikvideo umsetzen? Hier konnten wir unserer Kreativität freien Lauf lassen. Ein Blick in die Umsetzung lohnt sich.",
    services: ["Kreation", "Produktion", "Postproduktion"],
    video: "https://vimeo.com/859822560",
    image: { src: "/work/kpmg.webp", alt: "KPMG — Imagetrailer Insights Center" },
    credits: [
      { role: "Kunde", name: "KPMG Insights Center" },
      { role: "Umsetzung", name: "Christian Wesner, Mohamed Bangura" },
    ],
  },
  {
    slug: "format-tools-katalog",
    client: "FORMAT",
    project: "3D Animation „Katalog“",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Motion Design",
    categories: ["video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Unter der Marke „FORMAT Tools for Professionals“ produziert die Wuppertaler Firma E/D/E Werkzeuge für echte Profis. Zur Bewerbung des neuen Katalogs sollten ausgewählte Werkzeuge emotional und hochwertig in Szene gesetzt werden. Das Video wird als Header auf der Website und zur Social Media Bewerbung eingesetzt.\n\nmake/c hat im ersten Schritt 3D Modelle der Werkzeuge erstellt und diese im zweiten Schritt emotional in Szene gesetzt – in Verbindung mit dem Katalog. Der Kunde ist happy und wir entsprechend auch!",
    services: ["3D Rendering der Werkzeuge", "Animation in 3D"],
    video: "https://www.youtube.com/watch?v=d9gvWj3kgF0",
    image: { src: "/work/format-tools-katalog.webp", alt: "FORMAT — 3D Animation „Katalog“" },
    credits: [
      { role: "Kunde", name: "FORMAT, E/D/E" },
      { role: "Projektsteuerung und -umsetzung", name: "Uwe Komorowski, Jens Kemper" },
    ],
  },
  {
    slug: "zeitgeist",
    client: "Ziegler Zeitgeist",
    project: "Werbespot",
    // Veröffentlichung: Juni 2023.
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Sommer, Sonne, Zieglers „Zeitgeist“. Ein Getränk, das Lust auf Sommer macht. Wir durften für unseren Partner Storymachine aus Berlin diesen Spot realisieren. Das Timing war wie immer bei Produktionen sportlich, die Anforderungen an den Cast und die Locations ebenso.\n\n" +
      "Das maker-Team hat sich der Aufgabe gestellt und binnen kürzester Zeit diesen Spot geplant, organisiert, produziert und postproduziert. Die Creation kommt von Storymachine. Neben dem unten verlinkten Spot haben wir natürlich noch cut-downs für alle gängigen Social-Media-Kanäle angefertigt.\n\n" +
      "Der Sommer kann also kommen. Wir wissen was zu tun ist.",
    services: ["Casting", "Location Scouting", "Produktion", "Post-Produktion"],
    // ⚠️ Watch-Form, **nicht** der Vimeo-Einbettcode: `VideoFacade` baut den
    // iframe selbst — erst nach dem Klick und mit `dnt=1`. Der gelieferte
    // <iframe>+player.js würde schon beim Öffnen des Fensters laden und die
    // Zwei-Klick-Lösung samt Abschnitt 7 der Datenschutzerklärung aushebeln.
    video: "https://vimeo.com/838986402",
    image: { src: "/work/zeitgeist.webp", alt: "Ziegler Zeitgeist — Werbespot" },
    credits: [
      // Der Auftraggeber steht hier statt im `client`-Feld: auf der Kachel und
      // in der Metazeile soll allein die Marke stehen (User-Entscheidung
      // 24.08.2026), in der Projektinfo die volle Fassung mit der Agentur.
      { role: "Kunde", name: "Storymachine (Ziegler Zeitgeist)" },
      {
        role: "Projektsteuerung und Umsetzung",
        name: "Christian Wesner, Mohamed Bangura, Jens Kemper, Philip Welkisch, Marie Lindner, Eric Nitschke, Markus Lompa",
      },
    ],
    // Beide Quellen sind exakt 16:9 — deshalb zweimal `wide` und kein Beschnitt.
    // Bei zwei Bildern stehen sie im Case-Fenster nebeneinander.
    gallery: [
      { src: "/work/zeitgeist-gallery-1.webp", alt: "Ziegler Zeitgeist — Kameramann im Pool beim Nachtdreh", ratio: "wide" },
      { src: "/work/zeitgeist-gallery-2.webp", alt: "Ziegler Zeitgeist — Set im Park mit Kamerawagen und Cast", ratio: "wide" },
    ],
  },
  {
    slug: "zurich-strategiegarten-2023",
    client: "ZURICH Versicherung",
    project: "StrategieGarten",
    // Veröffentlichung: Juni 2023.
    year: "2023",
    category: "Video Strategie · Video Event Content",
    categories: ["video-strategie", "event-content"],
    kicker: "/ Case Study /",
    summary:
      "Seit 2020 dürfen wir bereits die jährlichen Kommunikationsformate der ZURICH Versicherung zum „Strategie 2023“ als Content- und Konzept-Partner begleiten.\n\n" +
      "Nach einer „Late-Night-Show“, einer „digitalen Musical Inszenierung“ war es in diesem Jahr der „ZURICH Strategiegarten“. Angelehnt an den ZDF Fernsehgarten fand die Veranstaltung für über 2.000 Mitarbeiterinnen und Mitarbeiter bei uns gegenüber im legendären Kölner Tanzbrunnen statt.\n\n" +
      "Gemeinsam mit dem #love2becomms Team der ZURICH durften wir das Konzept kreativ mitgestalten und den gesamten Videocontent produzieren (über 80 Content Pieces). Dazu haben wir die Veranstaltung mit mehreren Kameras aufgezeichnet und in verschiedenen Versionen postproduziert.\n\n" +
      "Die Veranstaltung hat nicht nur den Kunden glücklich gemacht, sondern vor allem auch die Zielgruppe, für die sie stattgefunden hat: die Mitarbeiterinnen und Mitarbeiter der ZURICH Versicherung waren von dem Event begeistert.\n\n" +
      "Die interessanten Vorträge des ZURICH Managements wurden begleitet von vielen Künstlern, darunter z. B. Ross Antony, Chris Böhm und der TV Tanzperformance Gruppe „BreakALeg“.\n\n" +
      // ⚠️ Letzter Absatz: SEO-Text von der alten Portfolio-Seite, in Sie-Form.
      // Kein anderer der 31 Cases spricht die Leserin direkt an — beim
      // Gegenlesen bitte entscheiden, ob er bleibt.
      "Wenn Sie auf der Suche nach einer professionellen Videoagentur mit viel Eventerfahrung und einer ausgeprägten Kreativader sind, die Ihr Event oder Ihre Unternehmenskommunikation in unvergesslichen Aufnahmen festhält, sind Sie bei uns genau richtig. Unsere erfahrenen Videografen und Produktionsteams sind darauf spezialisiert, Ihr Unternehmen und Ihre Botschaft mit höchster Qualität und Kreativität in Szene zu setzen.",
    // ⚠️ Dieses Video ist bei Vimeo **domain-beschränkt**: der Player antwortet
    // nur von freigegebenen Domains mit 200, sonst mit 403 („Aufgrund seiner
    // eigenen Datenschutzeinstellungen…"). make-c.de ist freigegeben, localhost
    // und Vercel-Preview-URLs sind es nicht — hier also nur live prüfbar
    // (gemessen 24.08.2026).
    video: "https://vimeo.com/838328749",
    image: { src: "/work/zurich-strategiegarten-2023.webp", alt: "ZURICH Versicherung — StrategieGarten" },
    credits: [{ role: "Umsetzung", name: "Michael Ramlau, Christian Wesner, Mohamed Bangura, Bastian Westholt" }],
    gallery: [
      { src: "/work/zurich-strategiegarten-2023-gallery-1.webp", alt: "ZURICH StrategieGarten — Luftaufnahme des Kölner Tanzbrunnens", ratio: "wide" },
      { src: "/work/zurich-strategiegarten-2023-gallery-2.webp", alt: "ZURICH StrategieGarten — Finale auf der Bühne", ratio: "wide" },
    ],
  },
  {
    slug: "mvv-energie-ag-buga-ar-app",
    // Kunde laut Projektinfo des Users „MVV Energie AG" — der Import hatte den
    // Messeauftritt („BUGA") an den Kundennamen gehängt.
    client: "MVV Energie AG",
    project: "Augmented Reality App",
    // Produktionsjahr: 2023.
    year: "2023",
    category: "Video Produktion · Video Event Content",
    categories: ["video-produktion", "event-content"],
    kicker: "/ Case Study /",
    summary:
      "Durch die Entwickelung einer speziellen Augmented Reality App können die Besucher der diesjährigen BUGA sechs Kunstwerke von Horst Hamann, ausgestellt von der MVV Mannheim, zum Leben erwecken und sehen durch ihr Handykamerabild Tänzer/innen, die innerhalb und außerhalb des Kunstwerkes performen.\n\nWir haben das künstlerische Konzept dazu entwickelt, die App programmiert und die Aufnahmen mit den Tänzern produziert und choreographiert. Mit Hilfe der App werden die Kunstwerke mit tänzerischen Szenen ergänzt und erwecken die Fotografien „zum Leben“.",
    image: { src: "/work/mvv-energie-ag-buga-ar-app.webp", alt: "MVV Energie AG — Augmented Reality App zur BUGA 2023" },
    credits: [{ role: "Umsetzung", name: "Michael Ramlau, Melissa Eken" }],
  },
  {
    slug: "buga-2023-ki-chatbot",
    // Der Import hatte den Projekttitel an den Kundennamen gehängt
    // („Bundesgartenschau 2023 KI Chatbot") — die Metazeile las sich dadurch
    // „… KI Chatbot · 2023 · …" unter der Überschrift „KI Chatbot".
    client: "Bundesgartenschau 2023",
    project: "KI Chatbot „Dr. KI“",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Event Content · Video AI",
    categories: ["event-content", "artificial-intelligence"],
    kicker: "/ Case Study /",
    summary:
      "In Zusammenarbeit mit dem Institut für Künstliche Intelligenz der Uniklinik in Marburg haben wir einen interaktiven, KI-gesteuerten virtuellen Arzt-Avatar entwickelt. Dieser greift auf eine eigens entwickelte künstliche Intelligenz zurück und kann medizinische Fragen fachlich fundiert beantworten und eine Konversation in Echtzeit und in jeder gewünschten Sprache mit den Nutzern führen.\n\nDiese Mechanik ist nach unserem Wissen bisher einzigartig und kann auf alle möglichen Use-Cases auch außerhalb der Medizin übertragen werden. Sprecht uns an. Uns gibt es sogar (noch) in echt ☺",
    image: { src: "/work/buga-2023-ki-chatbot.webp", alt: "Bundesgartenschau 2023 — KI Chatbot „Dr. KI“" },
    credits: [
      { role: "Kunde", name: "Bundesgartenschau 2023, in Kooperation mit der Universitätsklinik Marburg" },
      { role: "Umsetzung", name: "Michael Ramlau, Melissa Eken" },
    ],
  },
  {
    slug: "obi-gartenmagazin",
    client: "OBI",
    project: "Gartenmagazin Motion Graphics Trailer",
    // ⚠️ 2023 → 2022: Projektinfo des Users sagt „Veröffentlichung: 2022", und
    // der Text nennt selbst das „OBI Gartenmagazin 2022".
    year: "2022",
    category: "Video Motion Design",
    categories: ["video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Seit einigen Jahren begleiten wir schon mit der Agentur NJU zusammen die Digital Signage Aktivitäten von OBI. In dem Zusammenhang sind schon viele Grafiken und Videos bei uns entstanden. Dazu gehört auch dieser Trailer fürs OBI Gartenmagazin 2022. Hier verbinden wir After Effects mit normalem Bewegtbild und machen aus einem vermeintlich statischen Katalog einen echten Hingucker.",
    // ⚠️ **Datum prüfen.** Das verlinkte Video heißt bei Vimeo „HEY OBI" und ist
    // am 12.04.2024 hochgeladen — der Case beschreibt den Trailer zum
    // Gartenmagazin **2022**. Entweder ein späterer Upload desselben Films oder
    // ein anderer Trailer (geprüft 24.08.2026 über die Vimeo-oEmbed-API).
    // ⚠️ Privacy-Hash `/3ec6d0b203` muss dranbleiben — ohne ihn 403.
    video: "https://vimeo.com/933672329/3ec6d0b203",
    image: { src: "/work/obi-gartenmagazin.webp", alt: "OBI — Gartenmagazin Motion Graphics Trailer" },
    credits: [
      { role: "Kunde", name: "OBI (über Agentur NJU)" },
      { role: "Umsetzung", name: "Marius Wiemann" },
    ],
    gallery: [
      { src: "/work/obi-gartenmagazin-gallery-1.webp", alt: "OBI Gartenmagazin — Doppelseite „Stufenweise hoch hinaus“", ratio: "wide" },
      { src: "/work/obi-gartenmagazin-gallery-2.webp", alt: "OBI Gartenmagazin — Titelmotiv „Jetzt im Markt erhältlich“", ratio: "wide" },
    ],
  },
  {
    slug: "masco-group",
    client: "Masco Group",
    project: "Imagefilm",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Die Masco Group ist ein international tätiges Unternehmen mit Hauptsitz in Italien. In Zusammenarbeit mit unserem langjährigen Technikpartner Qvest Media haben wir diesen Brandfilm umgesetzt. Masco Group hatte sich zuvor einen neuen „look“ und eine neue brand identity geschaffen und seinen „purpose“ und seine „mission“ nachgeschärft. All das sollte in dem neuen Film verarbeitet werden.\n\n" +
      "make/c hat das Konzept und das Storyboard entwickelt sowie das Video postproduziert – in enger Abstimmung mit Qvest Media und Masco Group.",
    services: ["Kreation Storyboard", "Postproduktion"],
    // ⚠️ Wie beim ZURICH-StrategieGarten ist dieses Video bei Vimeo
    // **domain-beschränkt**: Player 200 mit Referer make-c.de, 403 von überall
    // sonst (geprüft 24.08.2026). Läuft live, nicht auf localhost und vermutlich
    // nicht auf Vercel-Preview-URLs.
    video: "https://vimeo.com/833481331",
    image: { src: "/work/masco-group.webp", alt: "Masco Group — Imagefilm" },
    credits: [{ role: "Umsetzung", name: "Eric Nitschke, Marius Wiemann" }],
    gallery: [
      { src: "/work/masco-group-gallery-1.webp", alt: "Masco Group — Brandfilm, Kapitel „Knowledge“", ratio: "wide" },
      { src: "/work/masco-group-gallery-2.webp", alt: "Masco Group — Brandfilm, Themenfeld Precision Medicine", ratio: "wide" },
    ],
  },
  {
    slug: "workshop-selber-drehen-und-schneiden",
    // ⚠️ Der Import hatte „Workshop" als Kundennamen übernommen — die Kachel las
    // sich „WORKSHOP · 2023". Kunde ist laut Projektinfo des Users die
    // Koelnmesse; „Workshop" steckt jetzt im Projekttitel.
    client: "Koelnmesse",
    project: "Workshop „Videos selber drehen und schneiden“",
    // Durchführung: 2023.
    year: "2023",
    category: "Video Strategie",
    categories: ["video-strategie"],
    kicker: "/ Case Study /",
    summary:
      "Manchmal ist es das Budget, manchmal der Zeitdruck: in Unternehmen steigt der Bedarf, selber Video Content produzieren zu können. Was vor einigen Jahren noch undenkbar schien, vermitteln wir heute als Basiswissen in einem eintägigen Workshop.\n\nDie Hürden sind denkbar niedrig, schließlich hat jede/r sein Handy immer dabei. Aber auch wenn das Handy in der Theorie tolle Videos produziert, so sieht es in der Praxis doch oft anders aus. Bildformat, Bildaufbau, Hintergrund, Audio, … Es gibt viele Gründe, die ein Video im Ergebnis schlecht machen können. Und vieles davon ist ganz einfach zu vermeiden.\n\n" +
      "Durch unsere langjährige Erfahrung im Bereich Bewegtbildproduktion sind wir euer kompetenter Partner und vermitteln euch zuerst ein theoretisches Grundgerüst von „Worauf muss ich bei der Kamera-Perspektive achten?“ über „Welches Format eignet sich für welche social media-Seite?“ bis zu „Wie betreibe ich Visual Storytelling?“.\n\n" +
      "Der Workshop gliedert sich in einen Theorie- und einen Praxisteil, in dem die Teilnehmer eigene Videos erstellen. Dazu beraten wir auch bei der Auswahl der Technik und wir zeigen die Grenzen des selber erstellbaren Contents.\n\n" +
      // ⚠️ Kundenzitat, wie bei `db-schenker` und `koelnmesse-anuga-pressekonferenz`
      // mangels eigenem Feld im Fließtext. Wortlaut ist Fremdrede.
      "„Ein großes Dankeschön für den tollen Workshop, praxisnah und mit Leidenschaft vermittelt. Wir haben sehr viel mitgenommen und waren alle durchweg begeistert.“\n\n" +
      "— Miriam de Montigny, Koelnmesse GmbH",
    image: { src: "/work/workshop-selber-drehen-und-schneiden.webp", alt: "Koelnmesse — Workshop „Videos selber drehen und schneiden“" },
    credits: [{ role: "Leitung", name: "Christian Wesner, Michael Ramlau" }],
  },
  {
    slug: "zurich-sicherheit-im-strassenverkehr",
    client: "ZURICH",
    project: "Erklärfilmreihe",
    // Veröffentlichung: 2023.
    year: "2023",
    category: "Video Produktion · Video Motion Design",
    categories: ["video-produktion", "video-motion-design"],
    kicker: "/ Case Study /",
    summary:
      "Für diese Erklärfilm Reihe haben wir eine eigene Handschrift entwickelt, da wir weg wollten von dem 08/15 Erklärfilm Stil. Nach ersten Testläufen in unserem Parkhaus waren der Kunde und wir sofort begeistert.\n\n" +
      "Am Ende haben wir die fünf Videos in einem Greenscreen Studio mit einem echten Auto und echten Darstellern gedreht und in der Postproduktion entsprechend verfremdet und mit Motion Graphics in eine stilisierte Landschaft versetzt. Die Soundeffekte unterstützen die oft beklemmenden Botschaften eindrucksvoll.\n\n" +
      "Die Videoinhalte basieren auf den Ergebnissen einer Studie und dienen der Kommunikation mit Journalisten und natürlich auch für die Social Media Kommunikation.\n\n" +
      "Der Kunde schreibt: „Die Videos sind wirklich sehr gelungen. Gute Arbeit!“",
    services: ["Produktion im Greenscreen Studio", "Motion Graphics", "Postproduktion"],
    video: "https://www.youtube.com/watch?v=D73J23W1pdM",
    // Zweites der fünf Videos, unter dem Text als „Weiteres Video". ⚠️ Das
    // Standbild ist das YouTube-Thumbnail, aber **lokal** abgelegt — direkt von
    // img.youtube.com geladen ginge sonst schon beim Öffnen des Fensters eine
    // Anfrage an Google raus und die Zwei-Klick-Lösung wäre ausgehebelt.
    secondaryVideos: [
      {
        url: "https://youtu.be/3fRAW08NBi8",
        poster: {
          src: "/work/zurich-sicherheit-im-strassenverkehr-video-2.webp",
          alt: "ZURICH — „#BleibFokussiert: Ablenkungsrisiko Schilderwald“",
        },
      },
    ],
    image: { src: "/work/zurich-sicherheit-im-strassenverkehr.webp", alt: "ZURICH — Erklärfilmreihe „Sicherheit im Straßenverkehr“" },
    credits: [{ role: "Projektsteuerung", name: "Christian Wesner, Michael Ramlau, Tobias Mächler" }],
  },
  {
    slug: "ihk-koeln",
    client: "IHK Köln",
    project: "Rahmenvertragspartner Streaming",
    // ⚠️ Laufender Rahmenvertrag, keine einmalige Veröffentlichung: „seit
    // Frühjahr 2022" (Projektinfo des Users, 24.08.2026) — stand vorher auf
    // 2023. Das verlinkte Video ist der Frauen-Business-Tag 2022.
    year: "2022",
    category: "Video Event Content",
    categories: ["event-content"],
    kicker: "/ Case Study /",
    summary:
      "Seit Frühjahr 2022 sind wir Rahmenvertragspartner der IHK Köln für Streaming Projekte. Auch in der „Post-Corona“ Zeit erweist sich Streaming für die IHK Veranstaltungen als tragende Säule der Kommunikation und des Austauschs.\n\nSeitdem durften wir schon einige Veranstaltungen in die große weite Welt streamen – u.a. den Frauen-Business-Tag 2022. More to come…",
    services: ["Live-Streaming"],
    video: "https://www.youtube.com/watch?v=wwBqU3QcCXU",
    image: { src: "/work/ihk-koeln.webp", alt: "IHK Köln — Rahmenvertragspartner Streaming" },
    credits: [{ role: "Projektsteuerung", name: "Marius Wiemann" }],
  },
  {
    slug: "atlantik-bruecke-70-jahre",
    client: "ATLANTIK-BRÜCKE e.V.",
    project: "Jubiläumsfilm 70 Jahre",
    // ⚠️ 2023 → 2022: Projektinfo des Users sagt „Produktionsjahr: 2022", und
    // der Text nennt den Festakt selbst „In 2022".
    year: "2022",
    category: "Video Produktion",
    categories: ["video-produktion"],
    kicker: "/ Case Study /",
    summary:
      "Schon seit 2020 arbeiten wir immer wieder für die renommierte Atlantik-Brücke in Berlin. In 2022 stand der Festakt zum 70jährigen Jubiläum mit vielen Prominenten Weggefährten an.\n\nWir durften in Form eines Rück- und Ausblicks die Geschichte und Bedeutung der Atlantik-Brücke filmisch in Szene setzen. Dafür standen uns viele renommierte Interviewpartner auf beiden Seiten des Atlantiks zur Verfügung.\n\n" +
      "Da die Umsetzung auf Grund dünner Bewegtbildarchiv-Lage nicht so ganz einfach war, haben wir mit After Effects Templates einen einheitlichen, hochwertigen und zeitgemäßen Rahmen entwickelt.",
    services: ["Interviews", "Stock Footage", "Dreh", "After Effects"],
    video: "https://www.youtube.com/watch?v=J4carNHyMvk",
    image: { src: "/work/atlantik-bruecke-70-jahre.webp", alt: "ATLANTIK-BRÜCKE e.V. — Jubiläumsfilm 70 Jahre" },
    credits: [{ role: "Projektsteuerung", name: "Mike Krack" }],
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
