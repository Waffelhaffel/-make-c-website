import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });

const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
const token = requireEnv("SANITY_API_WRITE_TOKEN");
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const key = () => randomUUID();

const landingPage = {
  _id: "landingPage",
  _type: "landingPage",
  hero: {
    headlineLine1: "DIE",
    headlineLine2: "VIDEO",
    headlineLine3: "AGENTUR",
    subheadline: "VIDEO MARKETING & PRODUCTION",
    cornerLeft: "BASED IN KÖLN & ESSEN",
    cornerCenter: "SCROLL DOWN",
    cornerRight: "SINCE 2015",
  },
  stats: {
    kicker: "/ Mehr als nur Videoproduktion /",
    headlineLine1: "Ein Team, das skalierbare Video-Lösungen für",
    headlineLine2: "Marken, Unternehmen und Events baut.",
    items: [
      {
        _key: key(),
        _type: "statItem",
        icon: "users",
        number: "15+",
        label: "Mitarbeiter",
        subtext:
          "plus Hinweis, dass ihr Zugriff auf ein Netzwerk von ~80 weiteren Expert:innen habt.",
      },
      {
        _key: key(),
        _type: "statItem",
        icon: "play",
        number: "5.000+",
        label: "Videos",
        subtext: "Anzahl produzierter Videos seit der Gründung.",
      },
      {
        _key: key(),
        _type: "statItem",
        icon: "mapPin",
        number: "2",
        label: "Standorte",
        subtext: "Köln & Essen, mitten in der Metropolregion Rhein/Ruhr.",
      },
    ],
  },
  showreel: {
    kicker: "/ High-End Produktion für skalierbare Video-Systeme /",
    headlinePart1: "SHOW",
    headlinePart2: "REEL",
  },
  approach: {
    headlineLine1: "WE MAKE VIDEOS",
    headlineLine2: "THAT WORK",
    kicker: "/ Approach /",
    paragraphs: [
      "make/c entwickelt und produziert Bewegtbild für Marken – klar in der Idee, hochwertig in der Umsetzung und abgestimmt auf die richtigen Kanäle. Von Social Content bis Imagefilm, von Animation bis Live.",
      "Unser Team arbeitet mit einem integrierten Ansatz aus Strategie, Kreation und Produktion.",
    ],
    closing:
      "UNSER TEAM ARBEITET MIT EINEM INTEGRIERTEN ANSATZ AUS STRATEGIE, KREATION UND PRODUKTION.",
  },
  insight: {
    headlineLine1: "Mehr Output.",
    headlineLine2: "Mehr Insights.",
    kicker: "Insights /",
    body:
      "Häufige Video-Produktion erzeugt Daten. Diese Daten zeigen gnadenlos, was funktioniert, was nicht konvertiert und wo Kommunikation bricht.",
  },
  about: {
    quoteLine1: '"WE BELIEVE IN THE',
    quoteLine2: 'POWER OF MOVING IMAGES."',
    powerWords: [
      { _key: key(), _type: "powerWord", label: "Power" },
      { _key: key(), _type: "powerWord", label: "Leidenschaft" },
      { _key: key(), _type: "powerWord", label: "Umsetzung" },
    ],
    teamTitlePart1: "MAKE/",
    teamTitlePart2: "TEAM",
    kicker: "/ Highend Produktion für skalierbare Video-Systeme /",
    paragraphs: [
      "Video ist die stärkste Form moderner Kommunikation – emotional, schnell und überall präsent. Doch ohne klare Strategie bleibt viel Potenzial ungenutzt.",
      "Wir sind ein Team aus vielseitigen Kreativen und Medienschaffenden, das jedes Projekt mit Leidenschaft, Erfahrung und dem Blick fürs Wesentliche umsetzt.",
    ],
  },
  questions: {
    headlineLine1: "Der richtige Startpunkt",
    headlineLine2: "sind die richtigen Fragen.",
    linkText: "Lass uns über Wirkung sprechen",
  },
  contact: {
    kicker: "Unsere 2 Standorte von make/c",
    locations: [
      {
        _key: key(),
        _type: "locationCard",
        headlineLineOne: "Im Herzen",
        headlineLineTwo: "der Dom Stadt.",
        cityLabel: "Köln /",
      },
      {
        _key: key(),
        _type: "locationCard",
        headlineLineOne: "Im Zentrum",
        headlineLineTwo: "des Ruhrgebiets",
        cityLabel: "Essen /",
      },
    ],
  },
};

async function run() {
  console.log("Seeding Landing Page...");
  const result = await client.createOrReplace(landingPage);
  console.log(`✓ Wrote landingPage (${result._id})`);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
