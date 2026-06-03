import { sanityFetch } from "./fetch";
import { LANDING_PAGE_QUERY } from "./queries";
import type {
  LandingAbout,
  LandingApproach,
  LandingContact,
  LandingHero,
  LandingInsight,
  LandingPage,
  LandingQuestions,
  LandingShowreel,
  LandingStats,
} from "../types";

const HERO_FALLBACK: LandingHero = {
  headlineLine1: "DIE",
  headlineLine2: "VIDEO",
  headlineLine3: "AGENTUR",
  subheadline: "VIDEO MARKETING & PRODUCTION",
  cornerLeft: "BASED IN KÖLN & ESSEN",
  cornerCenter: "SCROLL DOWN",
  cornerRight: "SINCE 2015",
};

const STATS_FALLBACK: LandingStats = {
  kicker: "/ Mehr als nur Videoproduktion /",
  headlineLine1: "Ein Team, das skalierbare Video-Lösungen für",
  headlineLine2: "Marken, Unternehmen und Events baut.",
  items: [
    {
      icon: "users",
      number: "15+",
      label: "Mitarbeiter",
      subtext:
        "plus Hinweis, dass ihr Zugriff auf ein Netzwerk von ~80 weiteren Expert:innen habt.",
    },
    {
      icon: "play",
      number: "5.000+",
      label: "Videos",
      subtext: "Anzahl produzierter Videos seit der Gründung.",
    },
    {
      icon: "mapPin",
      number: "2",
      label: "Standorte",
      subtext: "Köln & Essen, mitten in der Metropolregion Rhein/Ruhr.",
    },
  ],
};

const SHOWREEL_FALLBACK: LandingShowreel = {
  kicker: "/ High-End Produktion für skalierbare Video-Systeme /",
  headlinePart1: "SHOW",
  headlinePart2: "REEL",
};

const APPROACH_FALLBACK: LandingApproach = {
  headlineLine1: "WE MAKE VIDEOS",
  headlineLine2: "THAT WORK",
  kicker: "/ Approach /",
  paragraphs: [
    "make/c entwickelt und produziert Bewegtbild für Marken – klar in der Idee, hochwertig in der Umsetzung und abgestimmt auf die richtigen Kanäle. Von Social Content bis Imagefilm, von Animation bis Live.",
    "Unser Team arbeitet mit einem integrierten Ansatz aus Strategie, Kreation und Produktion.",
  ],
  closing:
    "UNSER TEAM ARBEITET MIT EINEM INTEGRIERTEN ANSATZ AUS STRATEGIE, KREATION UND PRODUKTION.",
};

const INSIGHT_FALLBACK: LandingInsight = {
  headlineLine1: "Mehr Output.",
  headlineLine2: "Mehr Insights.",
  kicker: "Insights /",
  body:
    "Häufige Video-Produktion erzeugt Daten. Diese Daten zeigen gnadenlos, was funktioniert, was nicht konvertiert und wo Kommunikation bricht.",
};

const ABOUT_FALLBACK: LandingAbout = {
  quoteLine1: '"WE BELIEVE IN THE',
  quoteLine2: 'POWER OF MOVING IMAGES."',
  powerWords: [{ label: "Power" }, { label: "Leidenschaft" }, { label: "Umsetzung" }],
  teamTitlePart1: "MAKE/",
  teamTitlePart2: "TEAM",
  kicker: "/ Highend Produktion für skalierbare Video-Systeme /",
  paragraphs: [
    "Video ist die stärkste Form moderner Kommunikation – emotional, schnell und überall präsent. Doch ohne klare Strategie bleibt viel Potenzial ungenutzt.",
    "Wir sind ein Team aus vielseitigen Kreativen und Medienschaffenden, das jedes Projekt mit Leidenschaft, Erfahrung und dem Blick fürs Wesentliche umsetzt.",
  ],
};

const QUESTIONS_FALLBACK: LandingQuestions = {
  headlineLine1: "Der richtige Startpunkt",
  headlineLine2: "sind die richtigen Fragen.",
  linkText: "Lass uns über Wirkung sprechen",
};

const CONTACT_FALLBACK: LandingContact = {
  kicker: "Unsere 2 Standorte von make/c",
  contactName: "Paul Zajonc",
  contactRole: "Ansprechpartner",
  phone: "+49 123 455667",
  email: "pz@make-c.de",
  floatingCtaEnabled: true,
  ctaLabel: "Let's talk",
  locations: [
    {
      headlineLineOne: "Im Herzen",
      headlineLineTwo: "der Dom Stadt.",
      cityLabel: "Köln /",
    },
    {
      headlineLineOne: "Im Zentrum",
      headlineLineTwo: "des Ruhrgebiets",
      cityLabel: "Essen /",
    },
  ],
};

export type ResolvedLandingPage = {
  hero: LandingHero;
  stats: LandingStats;
  showreel: LandingShowreel;
  approach: LandingApproach;
  insight: LandingInsight;
  about: LandingAbout;
  questions: LandingQuestions;
  contact: LandingContact;
};

export async function getLandingPage(): Promise<ResolvedLandingPage> {
  const data = await sanityFetch<LandingPage | null>({
    query: LANDING_PAGE_QUERY,
    tags: ["landingPage"],
  });

  return {
    hero: { ...HERO_FALLBACK, ...(data?.hero ?? {}) },
    stats: {
      ...STATS_FALLBACK,
      ...(data?.stats ?? {}),
      items:
        data?.stats?.items && data.stats.items.length > 0
          ? data.stats.items
          : STATS_FALLBACK.items,
    },
    showreel: { ...SHOWREEL_FALLBACK, ...(data?.showreel ?? {}) },
    approach: {
      ...APPROACH_FALLBACK,
      ...(data?.approach ?? {}),
      paragraphs:
        data?.approach?.paragraphs && data.approach.paragraphs.length > 0
          ? data.approach.paragraphs
          : APPROACH_FALLBACK.paragraphs,
    },
    insight: { ...INSIGHT_FALLBACK, ...(data?.insight ?? {}) },
    about: {
      ...ABOUT_FALLBACK,
      ...(data?.about ?? {}),
      powerWords:
        data?.about?.powerWords && data.about.powerWords.length > 0
          ? data.about.powerWords
          : ABOUT_FALLBACK.powerWords,
      paragraphs:
        data?.about?.paragraphs && data.about.paragraphs.length > 0
          ? data.about.paragraphs
          : ABOUT_FALLBACK.paragraphs,
    },
    questions: { ...QUESTIONS_FALLBACK, ...(data?.questions ?? {}) },
    contact: {
      ...CONTACT_FALLBACK,
      ...(data?.contact ?? {}),
      contactName: data?.contact?.contactName || CONTACT_FALLBACK.contactName,
      contactRole: data?.contact?.contactRole || CONTACT_FALLBACK.contactRole,
      phone: data?.contact?.phone || CONTACT_FALLBACK.phone,
      email: data?.contact?.email || CONTACT_FALLBACK.email,
      ctaLabel: data?.contact?.ctaLabel || CONTACT_FALLBACK.ctaLabel,
      locations:
        data?.contact?.locations && data.contact.locations.length > 0
          ? data.contact.locations
          : CONTACT_FALLBACK.locations,
    },
  };
}
