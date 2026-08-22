// Typen der hartcodierten Inhalte.
//
// Bis 07/2026 lagen diese Typen in `sanity/types.ts` und beschrieben
// Sanity-Dokumente. Sanity verwaltet jetzt nur noch die Case Studies; die Typen
// hier beschreiben reinen Code-Inhalt. Sie sind bewusst so geschnitten geblieben,
// wie die Komponenten sie schon konsumieren — die Sections mussten dadurch nur die
// Import-Pfade und die Bildfelder anpassen.
//
// Bilder sind `LocalImage` statt Sanity-Bildobjekte: ein Pfad ab Web-Wurzel,
// `next/image` optimiert die Dateien aus `public/` selbst. Die früheren Helfer
// `urlFor()`/`hasImageAsset()` gibt es seit dem CMS-Ausbau (08/2026) nirgends
// mehr — auch nicht für Case-Bilder.

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
  /** Optional: mit URL wird der Name in der Bildunterschrift zum LinkedIn-Link. */
  ceoLinkedin?: string;
  quoteLine1: string;
  quoteLine2: string;
};

export type LandingTestimonial = {
  quote: string;
  author: string;
  role: string;
  /**
   * Kundenlogo für die Karte, Pfad unter `public/`. Optional: fehlt es, bleibt
   * die Stelle leer — der Firmenname steht ohnehin in `role`.
   *
   * Seit 12.08.2026 dieselben weißen Dateien wie im LogoBanner (`public/logos/`,
   * gebaut von `scripts/build-logo-banner.mjs`). Vorher lagen hier die dunklen
   * Graustufen-PNGs der alten weißen Leiste, die `Testimonials.tsx` per
   * `brightness-0 invert` nach Weiß kippen musste — der Filter ist mit den
   * weißen Dateien entfallen.
   *
   * ⚠️ `width`/`height` sind Pflicht und müssen die **Leinwandmaße der Datei**
   * sein, nicht die Anzeigegröße: die Karte setzt `h-14 w-auto`, und die Breite
   * rechnet der Browser aus genau diesem Seitenverhältnis. Ein falscher Wert
   * verzerrt oder staucht das Logo. Die Höhe ist bei allen Dateien 240.
   */
  logo?: { src: string; alt: string; width: number; height: number };
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
   * Ohne Wert rendert `Contact.tsx` die Telefonzeile gar nicht (so war es
   * 07–08/2026, nachdem die Platzhalter-Nummer „+49 123 455667" entfernt war).
   * Der Wert kommt aus `ORG.telephone` (`lib/seo.ts`) — dort ändern, dann
   * stimmen Sichtbares und JSON-LD automatisch überein.
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

// ── Case Studies (Referenzen) ──────────────────────────────────────────────
//
// Bis 08/2026 kamen die Cases als einziger Inhalt noch aus Sanity. Seit dem
// Ausbau des CMS stehen sie in `./cases.ts`. Der Typ ist bewusst schlanker als
// das frühere Sanity-Schema: `headline`, `intro`, `introHeading`, `solution`,
// `cta` und `seo` sind ersatzlos entfallen — sie wurden von keiner Komponente
// gerendert.

export type CaseCredit = {
  role: string;
  name: string;
};

export type CaseGalleryItem = {
  src: string;
  alt: string;
  /** Steuert das Seitenverhältnis der Kachel im Case-Fenster. */
  ratio: "wide" | "tall" | "standard";
};

export type CaseStudy = {
  /** Referenziert aus `SELECTED_WORK` (`lib/data.ts`) und `SERVICE_PAGES[].caseSlugs`. */
  slug: string;
  /** Überschrift auf der Kachel und im Case-Fenster, z. B. „Kinospot und Social Media Spot". */
  project: string;
  kicker?: string;
  client: string;
  year: string;
  /** Ausgeschriebene Kategorien für die Metazeile, mit „ · " verbunden. */
  category: string;
  /** Kategorie-Slugs aus `./workCategories.ts` — steuert die Filterleiste auf /work. */
  categories: string[];
  /** Fließtext im Case-Fenster. Absätze mit `\n\n` trennen. */
  summary: string;
  services?: string[];
  credits?: CaseCredit[];
  /** Kachelbild und, ohne eigenes `poster`, auch das Standbild im Case-Fenster. */
  image: LocalImage;
  poster?: LocalImage;
  /** Vimeo- oder YouTube-URL. Ohne Wert zeigt das Case-Fenster nur das Standbild. */
  video?: string;
  /**
   * Weitere Videos zum selben Case, unterhalb der Credits. `video` bleibt das
   * Hauptvideo ganz oben — diese hier stehen darunter unter „Weitere Videos".
   * Ohne `video` werden sie **nicht** gerendert (dann fehlt der Hauptfilm).
   *
   * ⚠️ `poster` gehört nach `public/work/` und **nicht** als externe URL: das
   * Standbild lädt beim Öffnen des Case-Fensters, ein Thumbnail von ytimg.com
   * würde also schon vor dem Play-Klick Daten an Google schicken und die
   * Zwei-Klick-Lösung in `VideoFacade` aushebeln. Ohne `poster` steht dort ein
   * schwarzer Rahmen mit Play-Kreis.
   */
  secondaryVideos?: { url: string; poster?: LocalImage }[];
  gallery?: CaseGalleryItem[];
};

// ── Leistungen (die 6 Kacheln auf / und /leistungen) ───────────────────────

/**
 * Nur was gerendert wird. Die frühere CMS-Variante trug zusätzlich
 * `description`, `detailText`, `externalLink`, `buttonText` und drei
 * Titel-Varianten (`title`/`displayTitle`/`headline`) — alles ungerendert bzw.
 * redundant. Der Seitentext der Leistungen steht in `lib/leistungen.ts`.
 */
export type Service = {
  /** Muss zu einem `slug` in `lib/leistungen.ts` passen → `/leistungen/<slug>` */
  slug: string;
  /** Wird an der ersten Leerstelle für die Misch-Typo-Headline getrennt: „Video / Produktion" */
  title: string;
  /**
   * Rückfall, wenn die Leistung **kein** `loopVideo` in `SERVICE_PAGES` hat.
   * Seit 12.08.2026 optional und bei allen sechs Leistungen ungenutzt: Startseite
   * (`ServiceList`) und Detailseite (`ServiceBlocks`) zeigen beide den Loop.
   * Die handgezeichneten Platzhalter unter `public/leistungen/` können damit weg
   * — dann hier auch das Feld am jeweiligen Eintrag löschen.
   */
  image?: LocalImage;
};
