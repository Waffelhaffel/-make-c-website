import { sanityFetch } from "./fetch";
import {
  ALL_SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
} from "./queries";
import type { Service } from "../types";

export const SERVICE_LOOP_VIDEOS: Record<string, string> = {
  "video-produktion": "/Vidoe Produktion Loop.mp4",
  "event-content": "/Event Loop.mp4",
  "video-beratung": "/Beratung loop.mp4",
  studiobau: "/Studio Loop.mp4",
  "artificial-intelligence": "/AI Video Loop.mp4",
};

const SERVICES_FALLBACK: Service[] = [
  {
    _id: "fallback-video-produktion",
    title: "VIDEO PRODUKTION",
    displayTitle: "Video Produktion",
    slug: "video-produktion",
    headline: "Video Produktion",
    description:
      "Wir planen und produzieren Video-Content, der Marken langfristig aufbaut: von cineastischen Imagefilmen über Kampagnen- und Produktvideos bis zu skalierbaren Social-Formaten und Studio-Produktionen.",
    keywords:
      "Imagefilm • Brand Story • Kampagnenfilm • Produktvideo • Social-First Content • Studio Produktionen",
    order: 10,
  },
  {
    _id: "fallback-event-content",
    title: "EVENT CONTENT",
    displayTitle: "Event Content",
    slug: "event-content",
    headline: "Event Content",
    description:
      "Wir produzieren professionellen Event-Content für Konferenzen, Townhalls und Messen – live, hybrid oder on demand. Livestreams, digitale Bühnen und Social-Clips.",
    keywords: "Livestream • Hybrid-Event • Eventdokumentation • Highlight-Clips",
    order: 20,
  },
  {
    _id: "fallback-video-beratung",
    title: "VIDEO BERATUNG",
    displayTitle: "Video Beratung",
    slug: "video-beratung",
    headline: "Video Beratung",
    description:
      "Wir beraten Unternehmen dabei, Video strategisch einzusetzen – mit klaren Formaten, Prozessen und KPIs. Content-Strukturen, Distributionsstrategien und Inhouse-Setups.",
    keywords: "Content-Strategie • Formatentwicklung • Redaktionsprozesse • KPIs",
    order: 30,
  },
  {
    _id: "fallback-studiobau",
    title: "STUDIO BAU",
    displayTitle: "Studio Bau",
    slug: "studiobau",
    headline: "Studio Bau",
    description:
      "Wir planen und bauen Corporate Studios, die perfekt auf interne und externe Kommunikation abgestimmt sind. Technikplanung, Workflows, Set-Design und Betreuung.",
    keywords: "Corporate Studio • Licht & Kamera • Regietechnik • Workflow-Setup",
    order: 40,
  },
  {
    _id: "fallback-artificial-intelligence",
    title: "ARTIFICIAL INTELLIGENCE",
    displayTitle: "Artificial Intelligence",
    slug: "artificial-intelligence",
    headline: "Artificial Intelligence",
    description:
      "Wir haben eine eigene AI Unit namens make/ai. Wir nutzen KI für Skripte, Storyboards, Voiceover und Video-Generierung, um effizienter und kreativer zu produzieren.",
    keywords: "AI Unit • make/ai • Generative Video • Automation • Innovation",
    externalLink: "https://make-ai.de",
    buttonText: "ZUR MAKE/AI WEBSITE",
    order: 50,
  },
];

export async function getServices(): Promise<Service[]> {
  const data = await sanityFetch<Service[] | null>({
    query: ALL_SERVICES_QUERY,
    tags: ["service"],
  });
  if (!data || data.length === 0) return SERVICES_FALLBACK;
  return data;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await sanityFetch<Service | null>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["service", `service:${slug}`],
  });
  if (data) return data;
  return SERVICES_FALLBACK.find((s) => s.slug === slug) ?? null;
}

export async function getServiceSlugs(): Promise<string[]> {
  const data = await sanityFetch<string[] | null>({
    query: SERVICE_SLUGS_QUERY,
    tags: ["service"],
  });
  if (data && data.length > 0) return data;
  return SERVICES_FALLBACK.map((s) => s.slug);
}
