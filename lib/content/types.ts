// Typen der hartcodierten Inhalte.
//
// Bis 07/2026 lagen diese Typen in `sanity/types.ts` und beschrieben
// Sanity-Dokumente. Sanity verwaltet jetzt nur noch die Case Studies; die Typen
// hier beschreiben reinen Code-Inhalt. Sie sind bewusst so geschnitten geblieben,
// wie die Komponenten sie schon konsumieren — die Sections mussten dadurch nur die
// Import-Pfade und die Bildfelder anpassen.
//
// Bilder sind jetzt `LocalImage` statt Sanity-Bildobjekte. Dadurch fällt
// `urlFor()`/`hasImageAsset()` weg (das bleibt nur für Case-Bilder) und
// `next/image` optimiert die Dateien aus `public/` selbst.

/**
 * Bild in `public/`. `src` ist der Pfad ab Web-Wurzel.
 * Ohne width/height, weil alle Verwendungsstellen `fill` benutzen.
 */
export type LocalImage = {
  src: string;
  alt: string;
};

// ── Site-weit (Header, Footer) ─────────────────────────────────────────────

export type Location = {
  city: string;
  address: string[];
};

export type SocialLink = {
  label: string;
  /** Ohne URL rendert der Footer bewusst ein <span> statt eines toten Links. */
  url?: string;
};

export type SiteSettings = {
  email: string;
  locations: Location[];
  socials: SocialLink[];
  footerHeadline: {
    lineOne: string;
    lineTwo: string;
  };
  copyright: string;
};

// ── Landing-Sections ───────────────────────────────────────────────────────

export type LandingHero = {
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  subheadline: string;
  cornerLeft: string;
  cornerCenter: string;
  cornerRight: string;
};

export type StatIcon = "users" | "play" | "clock" | "mapPin";

export type LandingStatItem = {
  icon: StatIcon;
  number: string;
  label: string;
  subtext: string;
};

export type LandingStats = {
  kicker: string;
  headlineLine1: string;
  headlineLine2: string;
  items: LandingStatItem[];
};

export type LandingShowreel = {
  headlinePart1: string;
  headlinePart2: string;
  /** Poster, das vor dem Start gezeigt wird. */
  thumbnail: LocalImage;
  /** Datei in `public/` oder eine Vimeo-/YouTube-URL — `Showreel.tsx` erkennt beides. */
  videoUrl: string;
};

export type LandingApproach = {
  headlineLine1: string;
  headlineLine2: string;
  /** Wort aus headlineLine1, das kursiv gesetzt wird (wie das „make" im Logo) */
  italicWord: string;
  /** Begriffe der make/…-Slot-Machine */
  wordmarkWords: string[];
  paragraphs: string[];
};

export type LandingAbout = {
  /** Optional: ohne Portrait läuft das Zitat über die volle Breite. */
  ceoImage?: LocalImage;
  ceoQuote: string;
  ceoName: string;
  ceoRole: string;
  quoteLine1: string;
  quoteLine2: string;
};

export type LandingTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type LandingTestimonials = {
  kicker: string;
  headlineLine1: string;
  headlineLine2: string;
  /** Leere Liste → `Testimonials.tsx` rendert die Sektion nicht. */
  items: LandingTestimonial[];
};

export type LandingLocationCard = {
  headlineLineOne: string;
  headlineLineTwo: string;
  cityLabel: string;
  addressLine1: string;
  addressLine2: string;
  mapsUrl: string;
};

export type LandingContact = {
  kicker: string;
  headlineLine1: string;
  headlineLine2: string;
  introLinkText: string;
  ctaButtonText: string;
  contactImage: LocalImage;
  contactName: string;
  contactRole: string;
  /**
   * Bis 07/2026 stand hier die Platzhalter-Nummer „+49 123 455667", die live als
   * `tel:`-Link ausgeliefert wurde. Ohne Wert rendert `Contact.tsx` die
   * Telefonzeile gar nicht — das ist der gewollte Zustand, solange die echte
   * Nummer nicht eingetragen ist.
   */
  phone?: string;
  email: string;
  floatingCtaEnabled: boolean;
  ctaLabel: string;
  locations: LandingLocationCard[];
};

export type LandingContent = {
  hero: LandingHero;
  stats: LandingStats;
  showreel: LandingShowreel;
  approach: LandingApproach;
  testimonials: LandingTestimonials;
  about: LandingAbout;
  contact: LandingContact;
};

// ── Leistungen (die 6 Kacheln auf / und /leistungen) ───────────────────────

/**
 * Nur was gerendert wird. Die frühere Sanity-Variante trug zusätzlich
 * `description`, `detailText`, `externalLink`, `buttonText` und drei
 * Titel-Varianten (`title`/`displayTitle`/`headline`) — alles ungerendert bzw.
 * redundant. Der Seitentext der Leistungen steht in `lib/leistungen.ts`.
 */
export type Service = {
  /** Muss zu einem `slug` in `lib/leistungen.ts` passen → `/leistungen/<slug>` */
  slug: string;
  /** Wird an der ersten Leerstelle für die Misch-Typo-Headline getrennt: „Video / Produktion" */
  title: string;
  image: LocalImage;
};
