import { ORG } from "@/lib/seo";
import type { LandingContent } from "./types";

// Inhalte der Startseite — hartcodiert (siehe CLAUDE.md, Regel 1).
//
// Bis 07/2026 kam dieser Text aus dem Sanity-Singleton `landingPage` und wurde in
// `sanity/lib/getLandingPage.ts` mit gleichnamigen `*_FALLBACK`-Konstanten
// zusammengeführt. Beim Umzug wurden Code-Fallback und Live-Dataset verglichen:
// hero, stats, showreel, approach und about waren byte-identisch, bei `contact`
// lieferte das CMS nur `kicker` und die zwei Standort-Überschriften — alles andere
// kam ohnehin aus dem Code. Der sichtbare Text ändert sich durch den Umzug also
// nicht (Ausnahmen: siehe `contact.phone` in `./types`).
//
// Was damit ebenfalls entfällt: die drei verschiedenen Merge-Strategien
// (Spread, Längen-Check, `||`-Guard pro Feld) und die Falle, dass ein `null` aus
// GROQ den Fallback überschreibt.

export const LANDING: LandingContent = {
  hero: {
    headlineLine1: "DIE",
    headlineLine2: "VIDEO",
    headlineLine3: "AGENTUR",
    subheadline: "Mehr Impact für Dein Videobudget.",
    cornerLeft: "Köln, Essen /",
    cornerCenter: "SCROLL DOWN",
    cornerRight: "/ Seit 2015",
  },

  stats: {
    kicker: "Video ist ein Werkzeug.",
    headlineLine1: "Wir zeigen Unternehmen,",
    headlineLine2: "wie man es richtig einsetzt.",
    // Das „>" gehört zur Zahl („mehr als 10 Jahre"). Getrennt durch ein
    // geschütztes Leerzeichen (\u00A0), damit `text-balance` in `Stats.tsx` das
    // Zeichen nicht allein auf eine Zeile schiebt.
    items: [
      {
        icon: "clock",
        number: ">\u00A010",
        label: "Jahre",
        subtext: "Video Expertise",
      },
      {
        icon: "users",
        number: ">\u00A0100",
        label: "feste Mitarbeiter",
        subtext: "im Firmennetzwerk",
      },
      {
        icon: "play",
        number: ">\u00A010.000",
        label: "Videos",
        subtext: "in über 3.000 Projekten",
      },
    ],
  },

  showreel: {
    headlinePart1: "SHOW",
    headlinePart2: "REEL",
    thumbnail: {
      src: "/showreel-thumbnail.webp",
      alt: "make/c Showreel",
    },
    // Lokale Datei. Für einen gehosteten Reel hier stattdessen die Vimeo-/
    // YouTube-URL eintragen — `Showreel.tsx` erkennt beides und bettet dann ein.
    videoUrl: "/showreel.mp4",
  },

  approach: {
    headlineLine1: "We make video",
    headlineLine2: "that work.",
    italicWord: "make",
    // Durchgängig klein geschrieben (User-Entscheidung 11.08.2026): der Slot
    // setzt die Wortmarke `make/` fort, und dort steht das „c" klein. Ein großes
    // „C" liest sich als zweites Wort statt als Fortsetzung des Lockups.
    wordmarkWords: [
      "creative",
      "communities",
      "channels",
      "creator",
      "content",
      "campaigns",
    ],
    paragraphs: [
      "Video ist mehr als Produktion. Es braucht eine Strategie.",
      "Wir beraten, entwickeln und produzieren Videokommunikation ganzheitlich. Statt isolierter Inhalte schaffen wir strategische Lösungen, die nachhaltig wirken. So holen unsere Kunden das Maximum aus ihrem Video-Budget heraus.",
    ],
  },

  testimonials: {
    kicker: "Testimonials",
    headlineLine1: "Das sagen",
    headlineLine2: "unsere Kunden",
    // Echte Kundenzitate, vom User geliefert (12.08.2026) — ersetzen die
    // Lorem-ipsum-Platzhalter. Wortlaut unverändert übernommen; geändert wurde
    // nur „Marketing § Sales" → „Marketing & Sales" (Tippfehler in der Rolle,
    // nicht im Zitat).
    //
    // ⚠️ Der Wortlaut ist Fremdrede — Kürzungen oder „Glättungen" sind hier
    // nicht dasselbe wie bei eigener Copy. Vor Änderungen rückfragen.
    //
    // Vier statt drei Einträge: `Testimonials.tsx` steht deshalb auf
    // `md:grid-cols-2` (2×2), sonst stünde das vierte Zitat allein in einer
    // zweiten Reihe. Bei anderer Anzahl dort nachziehen.
    //
    // `logo` ist optional; seit 12.08.2026 haben alle vier eins — die
    // Weiß-Versionen aus `public/logos/`, dieselben Dateien wie im LogoBanner.
    //
    // Zur JSON-LD siehe `organizationGraph()` in `lib/seo.ts`: `Review` bleibt
    // auch mit echten Zitaten draußen — sie enthalten keine Bewertung, und
    // selbst ausgezeichnete Bewertungen über das eigene Unternehmen sind bei
    // Google nicht für Rich Results zugelassen.
    items: [
      {
        quote:
          "Das finale Produkt übertrifft unsere Erwartungen. Danke für die tolle Umsetzung",
        author: "Tobias Lyssy",
        role: "Vice President Marketing & Sales, Köln Bonn Airport",
        logo: {
          src: "/logos/koeln-bonn-airport.png",
          alt: "Köln Bonn Airport",
          width: 453,
          height: 240,
        },
      },
      {
        quote: "Great, Greater, make/c! Nothing left to say. Einfach nur top!",
        author: "Sven Schirmer",
        role: "Director Communications, shop-apotheke.com",
        logo: {
          src: "/logos/shop-apotheke.png",
          alt: "shop-apotheke.com",
          width: 240,
          height: 240,
        },
      },
      {
        quote:
          "Ich bin froh, mit Euch einen so zuverlässigen und starken Video-Partner zu haben. Ihr tragt maßgeblich zum Erfolg meiner Video-Themen bei.",
        author: "Lena Weith",
        role: "Corporate Channels, Covestro AG",
        logo: {
          src: "/logos/covestro.png",
          alt: "Covestro",
          width: 240,
          height: 240,
        },
      },
      {
        quote:
          "Wenn make/c involviert ist, gehe ich entspannt in die Produktion.",
        author: "Sandra Spiecker",
        role: "Abteilungsleiterin Marktmanagement, ERGO",
        // Seit 12.08.2026 vorhanden: die Weiß-Versionen vom User brachten das
        // ERGO-Logo mit, das im alten Ordner fehlte. Damit tragen alle vier
        // Karten ein Logo.
        logo: {
          src: "/logos/ergo.png",
          alt: "ERGO",
          width: 441,
          height: 240,
        },
      },
    ],
  },

  about: {
    // Echtes Portrait (08/2026). Die frühere Platzhalter-Skizze liegt weiterhin
    // unter /team/ceo-portrait.png, wird aber nicht mehr referenziert.
    ceoImage: {
      src: "/team/jens-kemper.png",
      alt: "Jens Kemper, CEO von make/c",
    },
    // Vom User freigegebene Fassung (11.08.2026) — ersetzt den Entwurf, der bis
    // dahin als „noch nicht gegengelesen" markiert war.
    ceoQuote:
      "Kunden sind für uns Partner. Wir hören zu, denken mit und entwickeln individuelle Videokommunikation, die hilft, die Unternehmensziele zu erreichen. Kein Werkzeug ist dabei so mächtig wie das richtige Video.",
    ceoName: "Jens Kemper",
    // Bewusst nicht „Gründer" — unverifiziert.
    ceoRole: "CEO · make/c",
    ceoLinkedin: "https://www.linkedin.com/in/jens-kemper-70758882/",
    quoteLine1: '"WE BELIEVE IN THE',
    quoteLine2: 'POWER OF MOVING IMAGES."',
  },

  contact: {
    kicker: "Unsere 2 Standorte von make/c",
    headlineLine1: "Der richtige Startpunkt",
    headlineLine2: "sind die richtigen Fragen.",
    introLinkText: "Lass uns über dein Projekt sprechen",
    ctaButtonText: "Gespräch anfragen",
    // Echtes Portrait (08/2026), quadratisch — `Contact.tsx` zeigt es rund
    // beschnitten. Die frühere 3D-Illustration /Kontakt_Guy.webp liegt weiter
    // in public/, wird aber nicht mehr referenziert.
    contactImage: {
      src: "/team/marie-hill.png",
      alt: "Marie Hill, Ansprechpartnerin bei make/c",
    },
    contactName: "Marie Hill",
    contactRole: "Ansprechpartnerin · make/c",
    // Zentrale Nummer aus `ORG` — eine Quelle für Sichtbares und JSON-LD.
    phone: ORG.telephone,
    // Seit 08/2026 auch hier der allgemeine Kanal (vorher pz@make-c.de als
    // persönliche Adresse) — Footer und JSON-LD führen dieselbe Adresse.
    email: ORG.email,
    floatingCtaEnabled: true,
    ctaLabel: "Let's talk",
    locations: [
      {
        headlineLineOne: "Im Herzen",
        headlineLineTwo: "der Dom Stadt.",
        cityLabel: "Köln /",
        addressLine1: "Picassoplatz 1",
        addressLine2: "50679 Köln",
        mapsUrl: "https://maps.google.com/?q=Picassoplatz+1+50679+K%C3%B6ln",
      },
      {
        headlineLineOne: "Im Zentrum",
        headlineLineTwo: "des Ruhrgebiets",
        cityLabel: "Essen /",
        addressLine1: "Sigsfeldstraße 5",
        addressLine2: "45141 Essen",
        mapsUrl: "https://maps.google.com/?q=Sigsfeldstra%C3%9Fe+5+45141+Essen",
      },
    ],
  },
};
