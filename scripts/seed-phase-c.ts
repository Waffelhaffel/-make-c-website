import { createClient } from "@sanity/client";
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

type ServiceSeed = {
  slug: string;
  title: string;
  displayTitle: string;
  headline: string;
  description: string;
  keywords: string;
  order: number;
  externalLink?: string;
  buttonText?: string;
};

const services: ServiceSeed[] = [
  {
    slug: "video-produktion",
    title: "VIDEO PRODUKTION",
    displayTitle: "Video Produktion",
    headline: "Video Produktion",
    description:
      "Wir planen und produzieren Video-Content, der Marken langfristig aufbaut: von cineastischen Imagefilmen über Kampagnen- und Produktvideos bis zu skalierbaren Social-Formaten und Studio-Produktionen.",
    keywords:
      "Imagefilm • Brand Story • Kampagnenfilm • Produktvideo • Social-First Content • Studio Produktionen",
    order: 10,
  },
  {
    slug: "event-content",
    title: "EVENT CONTENT",
    displayTitle: "Event Content",
    headline: "Event Content",
    description:
      "Wir produzieren professionellen Event-Content für Konferenzen, Townhalls und Messen – live, hybrid oder on demand. Livestreams, digitale Bühnen und Social-Clips.",
    keywords: "Livestream • Hybrid-Event • Eventdokumentation • Highlight-Clips",
    order: 20,
  },
  {
    slug: "video-beratung",
    title: "VIDEO BERATUNG",
    displayTitle: "Video Beratung",
    headline: "Video Beratung",
    description:
      "Wir beraten Unternehmen dabei, Video strategisch einzusetzen – mit klaren Formaten, Prozessen und KPIs. Content-Strukturen, Distributionsstrategien und Inhouse-Setups.",
    keywords: "Content-Strategie • Formatentwicklung • Redaktionsprozesse • KPIs",
    order: 30,
  },
  {
    slug: "studiobau",
    title: "STUDIO BAU",
    displayTitle: "Studio Bau",
    headline: "Studio Bau",
    description:
      "Wir planen und bauen Corporate Studios, die perfekt auf interne und externe Kommunikation abgestimmt sind. Technikplanung, Workflows, Set-Design und Betreuung.",
    keywords: "Corporate Studio • Licht & Kamera • Regietechnik • Workflow-Setup",
    order: 40,
  },
  {
    slug: "artificial-intelligence",
    title: "ARTIFICIAL INTELLIGENCE",
    displayTitle: "Artificial Intelligence",
    headline: "Artificial Intelligence",
    description:
      "Wir haben eine eigene AI Unit namens make/ai. Wir nutzen KI für Skripte, Storyboards, Voiceover und Video-Generierung, um effizienter und kreativer zu produzieren.",
    keywords: "AI Unit • make/ai • Generative Video • Automation • Innovation",
    order: 50,
    externalLink: "https://make-ai.de",
    buttonText: "ZUR MAKE/AI WEBSITE",
  },
];

async function run() {
  console.log("Seeding Services...");
  const tx = client.transaction();
  for (const s of services) {
    tx.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      displayTitle: s.displayTitle,
      slug: { _type: "slug", current: s.slug },
      headline: s.headline,
      description: s.description,
      keywords: s.keywords,
      order: s.order,
      ...(s.externalLink ? { externalLink: s.externalLink } : {}),
      ...(s.buttonText ? { buttonText: s.buttonText } : {}),
    });
  }
  const result = await tx.commit();
  console.log(`✓ Wrote ${result.results.length} services`);
  for (const r of result.results) {
    console.log(`  - ${r.id} (${r.operation})`);
  }
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
