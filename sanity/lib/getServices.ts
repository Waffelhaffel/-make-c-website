import { sanityFetch } from "./fetch";
import { ALL_SERVICES_QUERY } from "./queries";
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
    detailText:
      "Von der ersten Idee bis zum fertigen Film begleiten wir den gesamten Produktionsprozess. Wir denken in Kampagnen statt in Einzelvideos und entwickeln Content, der zu deiner Marke, deinen Kanälen und deinen Zielen passt.",
    features: [
      { title: "Imagefilm", description: "Cineastische Markeninszenierung, die Haltung und Qualität transportiert." },
      { title: "Kampagnen- & Produktvideos", description: "Werblicher Content für klare Botschaften und messbare Wirkung." },
      { title: "Social-First Content", description: "Skalierbare Formate, gedacht für Reels, Shorts und Feeds." },
    ],
    processSteps: [
      { title: "Briefing & Konzept", description: "Wir verstehen Ziel, Zielgruppe und Botschaft – und entwickeln das passende Format." },
      { title: "Pre-Produktion", description: "Drehbuch, Storyboard, Casting, Location und Planung." },
      { title: "Dreh", description: "Professionelle Umsetzung mit erfahrenem Team und Equipment." },
      { title: "Postproduktion", description: "Schnitt, Color, Sound und Motion – bis das Ergebnis sitzt." },
    ],
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
    detailText:
      "Egal ob Konferenz, Townhall oder Messe – wir fangen die Momente ein, die zählen, und machen sie für alle Kanäle nutzbar. Live, hybrid oder on demand.",
    features: [
      { title: "Livestream", description: "Professionelle Übertragung auf digitale Bühnen und Plattformen." },
      { title: "Eventdokumentation", description: "Der Tag als Film – stimmungsvoll und auf den Punkt." },
      { title: "Highlight-Clips", description: "Schnelle Social-Schnitte, die das Event weiterleben lassen." },
    ],
    processSteps: [
      { title: "Planung", description: "Ablauf, Technik und Drehplan abgestimmt auf dein Event." },
      { title: "Setup vor Ort", description: "Kameras, Ton und Streaming-Technik einsatzbereit." },
      { title: "Live-Produktion", description: "Regie und Aufzeichnung in Echtzeit." },
      { title: "Auslieferung", description: "Schnitt und Clips für alle gewünschten Kanäle." },
    ],
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
    detailText:
      "Wir helfen Unternehmen, Video nicht als Einzelprojekt, sondern als System zu denken – mit klaren Formaten, effizienten Prozessen und messbaren Ergebnissen.",
    features: [
      { title: "Content-Strategie", description: "Welche Inhalte zahlen wirklich auf deine Ziele ein?" },
      { title: "Formatentwicklung", description: "Wiederholbare Formate statt teurer Einzelstücke." },
      { title: "Inhouse-Setups", description: "Wir befähigen dein Team, selbst zu produzieren." },
    ],
    processSteps: [
      { title: "Analyse", description: "Status quo, Kanäle und Potenziale verstehen." },
      { title: "Strategie", description: "Formate, Prozesse und KPIs definieren." },
      { title: "Umsetzung", description: "Pilotformate produzieren und etablieren." },
      { title: "Optimierung", description: "Auswerten, lernen, skalieren." },
    ],
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
    detailText:
      "Wir planen und bauen Corporate Studios, die genau auf eure Kommunikation zugeschnitten sind – von der Technik bis zum Set-Design, inklusive Workflows und laufender Betreuung.",
    features: [
      { title: "Technikplanung", description: "Licht, Kamera, Ton und Regietechnik aus einer Hand." },
      { title: "Set-Design", description: "Räume, die zur Marke passen und flexibel nutzbar sind." },
      { title: "Workflow-Setup", description: "Prozesse, mit denen euer Team effizient produziert." },
    ],
    processSteps: [
      { title: "Bedarfsanalyse", description: "Was soll das Studio leisten – und für wen?" },
      { title: "Konzept & Planung", description: "Raum, Technik und Budget abgestimmt." },
      { title: "Aufbau", description: "Installation und Einrichtung vor Ort." },
      { title: "Einweisung", description: "Schulung und laufende Betreuung." },
    ],
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
    detailText:
      "Mit make/ai haben wir eine eigene AI-Unit. Wir setzen KI gezielt entlang der gesamten Produktion ein – für mehr Tempo, mehr Möglichkeiten und neue kreative Wege.",
    features: [
      { title: "Generative Video", description: "KI-gestützte Bild- und Videogenerierung für neue Looks." },
      { title: "Skript & Storyboard", description: "Schnellere Konzeptphasen durch KI-Unterstützung." },
      { title: "Voiceover & Automation", description: "Synthetische Stimmen und automatisierte Workflows." },
    ],
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
  // Leere Detail-Felder pro Slug aus dem Fallback ergänzen, bis die
  // Sanity-Dokumente gepflegt sind — gepflegte Felder gewinnen immer.
  return data.map((service) => {
    const fallback = SERVICES_FALLBACK.find((f) => f.slug === service.slug);
    if (!fallback) return service;
    return {
      ...service,
      description: service.description || fallback.description,
      detailText: service.detailText || fallback.detailText,
      features:
        service.features && service.features.length > 0
          ? service.features
          : fallback.features,
      processSteps:
        service.processSteps && service.processSteps.length > 0
          ? service.processSteps
          : fallback.processSteps,
    };
  });
}
