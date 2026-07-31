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
    items: [
      {
        icon: "clock",
        number: "10",
        label: "Jahre",
        subtext: "Video Expertise",
      },
      {
        icon: "users",
        number: "100",
        label: "feste Mitarbeiter",
        subtext: "im Firmennetzwerk",
      },
      {
        icon: "play",
        number: "10.000",
        label: "Videos",
        subtext: "in über 3.000 Projekten",
      },
    ],
  },

  showreel: {
    headlinePart1: "SHOW",
    headlinePart2: "REEL",
    thumbnail: {
      src: "/thumbnail_Showreel.webp",
      alt: "make/c Showreel",
    },
    // Lokale Datei. Für einen gehosteten Reel hier stattdessen die Vimeo-/
    // YouTube-URL eintragen — `Showreel.tsx` erkennt beides und bettet dann ein.
    videoUrl: "/Makec_Reel 1.mp4",
  },

  approach: {
    headlineLine1: "We make video",
    headlineLine2: "that work.",
    italicWord: "make",
    wordmarkWords: [
      "Creative",
      "Communities",
      "Channels",
      "Creator",
      "Content",
      "Campaigns",
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
    // ⚠️ TODO: Platzhalter. Echte Kundenzitate ersetzen Autor, Rolle und Text.
    // Soll die Sektion bis dahin verschwinden: `items: []` — `Testimonials.tsx`
    // gibt bei leerer Liste `null` zurück. Erst mit echten Bewertungen darf
    // `AggregateRating`/`Review` in die JSON-LD (`lib/seo.ts`).
    items: [
      {
        quote:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit.",
        author: "Vorname Nachname",
        role: "Position, Firma",
      },
      {
        quote: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        author: "Vorname Nachname",
        role: "Position, Firma",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
        author: "Vorname Nachname",
        role: "Position, Firma",
      },
    ],
  },

  about: {
    // ⚠️ Bewusst eine abstrakte, gesichtslose Skizze — kein Abbild von Jens Kemper.
    // Echtes Foto: Datei unter demselben Pfad austauschen.
    ceoImage: {
      src: "/team/ceo-portrait.png",
      alt: "Platzhalter-Illustration: Geschäftsführung make/c",
    },
    // ⚠️ Entwurf, noch nicht gegengelesen.
    ceoQuote:
      "Unsere Kunden sind für uns Partner, keine Auftraggeber. Wir hören zu, denken mit und entwickeln Videokommunikation, die zum Unternehmen passt – nicht zum Trend. Genau daraus entstehen Filme, die wirklich etwas bewegen.",
    ceoName: "Jens Kemper",
    // Bewusst nicht „Gründer" — unverifiziert.
    ceoRole: "CEO · make/c",
    quoteLine1: '"WE BELIEVE IN THE',
    quoteLine2: 'POWER OF MOVING IMAGES."',
  },

  contact: {
    kicker: "Unsere 2 Standorte von make/c",
    headlineLine1: "Der richtige Startpunkt",
    headlineLine2: "sind die richtigen Fragen.",
    introLinkText: "Lass uns über dein Projekt sprechen",
    ctaButtonText: "Gespräch anfragen",
    contactImage: {
      src: "/Kontakt_Guy.webp",
      alt: "Ansprechpartner make/c",
    },
    contactName: "Paul Zajonc",
    contactRole: "Ansprechpartner · make/c",
    // ⚠️ Absichtlich leer, siehe Kommentar am Feld in `./types`. Die echte
    // Nummer steht im Impressum (`lib/content/legal.ts`) — sobald sie hier
    // eintragen wird, gehört sie auch als `telephone` in `ORG` (`lib/seo.ts`).
    // phone: "+49 …",
    // Bewusst die persönliche Adresse des Ansprechpartners; der Footer und die
    // JSON-LD führen weiter info@make-c.de als allgemeinen Kanal.
    email: "pz@make-c.de",
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
