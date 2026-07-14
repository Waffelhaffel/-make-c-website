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
  subheadline: "Mehr Impact für dein Videobudget",
  cornerLeft: "Köln, Essen /",
  cornerCenter: "SCROLL DOWN",
  cornerRight: "/ Seit 2015",
};

const STATS_FALLBACK: LandingStats = {
  kicker: "Video ist kein Produkt. Video ist ein Werkzeug.",
  headlineLine1: "Wir zeigen Unternehmen,",
  headlineLine2: "wie man es richtig einsetzt.",
  items: [
    {
      icon: "mapPin",
      number: "10",
      label: "Jahre",
      subtext: "Erfahrung im Bereich",
    },
    {
      icon: "users",
      number: "Mehr als",
      label: "100",
      subtext: "Mitarbeiter Netzwerk",
    },
    {
      icon: "play",
      number: "Mehr als",
      label: "10 Tsd.",
      subtext: "Video Produktion",
    },
  ],
};

const SHOWREEL_FALLBACK: LandingShowreel = {
  kicker: "/ Was wir können /",
  headlinePart1: "SHOW",
  headlinePart2: "REEL",
};

const APPROACH_FALLBACK: LandingApproach = {
  headlineLine1: "We make video",
  headlineLine2: "that work.",
  kicker: "/Ansatz/",
  paragraphs: [
    "Video ist mehr als Produktion. Es ist Strategie.",
    "Wir beraten, entwickeln und produzieren Videokommunikation ganzheitlich. Statt isolierter Inhalte schaffen wir strategische Lösungen, die nachhaltig wirken. So holen unsere Kunden das Maximum aus ihrem Video-Budget heraus.",
  ],
  closing: "",
};

const INSIGHT_FALLBACK: LandingInsight = {
  headlineLine1: "Mehr Output,",
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
  headlineLine1: "Der richtige Startpunkt",
  headlineLine2: "sind die richtigen Fragen.",
  introLinkText: "Lass uns über dein Projekt sprechen",
  ctaButtonText: "Gespräch anfragen",
  contactName: "Paul Zajonc",
  contactRole: "Ansprechpartner · make/c",
  phone: "+49 123 455667",
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
      headlineLine1: data?.contact?.headlineLine1 || CONTACT_FALLBACK.headlineLine1,
      headlineLine2: data?.contact?.headlineLine2 || CONTACT_FALLBACK.headlineLine2,
      introLinkText: data?.contact?.introLinkText || CONTACT_FALLBACK.introLinkText,
      ctaButtonText: data?.contact?.ctaButtonText || CONTACT_FALLBACK.ctaButtonText,
      contactName: data?.contact?.contactName || CONTACT_FALLBACK.contactName,
      contactRole: data?.contact?.contactRole || CONTACT_FALLBACK.contactRole,
      phone: data?.contact?.phone || CONTACT_FALLBACK.phone,
      email: data?.contact?.email || CONTACT_FALLBACK.email,
      ctaLabel: data?.contact?.ctaLabel || CONTACT_FALLBACK.ctaLabel,
      // Per-Feld-Merge: Live-Locations haben (noch) keine Adresse/Maps — diese
      // aus dem Fallback (nach Index) auffüllen, damit sie sofort rendern.
      locations:
        data?.contact?.locations && data.contact.locations.length > 0
          ? data.contact.locations.map((loc, i) => {
              const fb = CONTACT_FALLBACK.locations?.[i];
              return {
                ...fb,
                ...loc,
                addressLine1: loc.addressLine1 || fb?.addressLine1,
                addressLine2: loc.addressLine2 || fb?.addressLine2,
                mapsUrl: loc.mapsUrl || fb?.mapsUrl,
              };
            })
          : CONTACT_FALLBACK.locations,
    },
  };
}
