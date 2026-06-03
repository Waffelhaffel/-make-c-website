import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

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

type CaseSeed = {
  slug: string;
  order: number;
  title: string;
  kicker: string;
  project: string;
  category: string;
  client: string;
  year: string;
  studio: string;
  headlineLead: string;
  headlineImpact: string;
  intro: string;
  summary: string;
  services: string[];
  solutionBody: string;
  solutionFooterLabel: string;
  heroImage: string;
  mainPosterImage: string;
  detailLeftImage: string;
  detailRightImage: string;
  thumbnailImage?: string;
  ctaText: string;
  videoUrl?: string;
};

const PUBLIC = resolve(process.cwd(), "public");

const cases: CaseSeed[] = [
  {
    slug: "koeln-bonn-airport",
    order: 10,
    title: "Köln Bonn Airport — Airport Story Campaign",
    kicker: "Case Köln Bonn Airport",
    project: "Airport Story Campaign",
    category: "Brand Film / Employer Branding",
    client: "Köln Bonn Airport",
    year: "2024",
    studio: "2024 Video Production",
    headlineLead: "Köln Bonn Airport:",
    headlineImpact: "TAKE OFF",
    intro: "Kampagnenproduktion für einen modernen Markenauftritt rund um Mobilität und Menschen.",
    summary:
      "Für Köln Bonn Airport haben wir eine visuelle Storyline entwickelt, die Standort, Dynamik und Arbeitgebermarke in einem hochwertigen Filmkonzept bündelt.",
    services: ["Creative Direction", "Konzept", "Produktion", "Postproduktion", "Social Cuts"],
    solutionBody:
      "Über einen filmischen, urbanen Look mit klaren Bildachsen entstand eine Kampagne, die sowohl emotional als auch informativ performt.",
    solutionFooterLabel: "2024 Video Produktion",
    heroImage: "Selected Work/Flughafen_Bild.jpg",
    mainPosterImage: "Selected Work/Flughafen_Bild.jpg",
    detailLeftImage: "Selected Work/Flughafen_Bild.jpg",
    detailRightImage: "Selected Work/KMNPG_Bild.png",
    ctaText:
      "Wir entwickeln für Marken cineastische Kampagnen mit klarer Strategie und starker visueller Handschrift.",
  },
  {
    slug: "zeitgeist",
    order: 20,
    title: "Zeitgeist — Culture Campaign",
    kicker: "Case Zeitgeist",
    project: "Culture Campaign",
    category: "Brand Content / Editorial Film",
    client: "Zeitgeist",
    year: "2024",
    studio: "2024 Video Production",
    headlineLead: "Zeitgeist:",
    headlineImpact: "VIBES",
    intro: "Editorial Kampagnenkonzept für eine visuell mutige Markenpräsenz.",
    summary:
      "Für Zeitgeist entstand eine visuelle Kampagnenwelt mit markanter Typografie, starken Kontrasten und einer klaren Social-First Dramaturgie.",
    services: ["Art Direction", "Regie", "Produktion", "Postproduktion", "Content Adaptions"],
    solutionBody:
      "Mit einem reduzierten Set-Design und ausdrucksstarken Color-Layern konnten wir einen eigenständigen Bildcharakter über alle Assets hinweg sichern.",
    solutionFooterLabel: "2024 Video Produktion",
    heroImage: "Selected Work/Zeitgeist_Bild.png",
    mainPosterImage: "Selected Work/Zeitgeist_Bild.png",
    detailLeftImage: "Selected Work/Zeitgeist_Bild.png",
    detailRightImage: "Selected Work/Wundholding_Bild.jpg",
    ctaText:
      "Wenn ihr eine Kampagne im Premium-Look plant, entwickeln wir Konzept, Produktion und Distribution aus einer Hand.",
  },
  {
    slug: "merkur",
    order: 30,
    title: "Merkur — Powerclip Campaign",
    kicker: "Case Merkur",
    project: "Powerclip Campaign",
    category: "Brand Campaign / Social Video",
    client: "Merkur",
    year: "2024",
    studio: "2024–2025 Video Production",
    headlineLead: "Merkur.",
    headlineImpact: "POWERCLIP",
    intro: "Cineastische Kampagnenstrecke mit hohem Wiedererkennungswert für Digital und Social.",
    summary:
      "Das Ziel war ein Auftritt, der digital zuerst gedacht ist und trotzdem die Wertigkeit einer großen Filmproduktion transportiert. Entstanden ist ein modulares Bewegtbild-Set aus Hero-Film, Cutdowns und Social-Assets.",
    services: ["Creative Direction", "Konzept & Story", "Regie & Produktion", "Postproduktion", "Social Adaptions"],
    solutionBody:
      "Über eine Mischung aus filmischen Nahaufnahmen, präzisem Color-Grading und bewusst gesetzten Blue-Akzenten entstand ein hochwertiger Bildstil. Die Assets wurden so angelegt, dass sie in Paid und Organic performant eingesetzt werden können.",
    solutionFooterLabel: "2024–2025 Video Produktion",
    heroImage: "Selected Work/Merkur_Bild.jpg",
    mainPosterImage: "Selected Work/Merkur_Bild.jpg",
    detailLeftImage: "Selected Work/Zeitgeist_Bild.png",
    detailRightImage: "Selected Work/Flughafen_Bild.jpg",
    ctaText:
      "Wenn ihr eine Kampagne mit cineastischem Anspruch plant, entwickeln wir das passende Format von der Idee bis zur finalen Ausspielung.",
  },
  {
    slug: "wundholding",
    order: 40,
    title: "Wundholding — Healthcare Brand Film",
    kicker: "Case Wundholding",
    project: "Healthcare Brand Film",
    category: "Imagefilm / Corporate Content",
    client: "Wundholding",
    year: "2024",
    studio: "2024 Video Production",
    headlineLead: "Wundholding:",
    headlineImpact: "CAREFRAME",
    intro: "Hochwertiger Markenfilm mit Fokus auf Vertrauen, Kompetenz und moderne Gesundheitskommunikation.",
    summary:
      "Für Wundholding haben wir eine klare visuelle Geschichte entwickelt, die Expertise und Menschlichkeit gleichermaßen sichtbar macht.",
    services: ["Strategie", "Konzept", "Filmproduktion", "Postproduktion", "Social Versioning"],
    solutionBody:
      "Mit ruhigen Kamerabewegungen, präzisem Lichtdesign und einer aufgeräumten Farbdramaturgie entstand ein hochwertiger, nahbarer Markenauftritt.",
    solutionFooterLabel: "2024 Video Produktion",
    heroImage: "Selected Work/Wundholding_Bild.jpg",
    mainPosterImage: "Selected Work/Wundholding_Bild.jpg",
    detailLeftImage: "Selected Work/Wundholding_Bild.jpg",
    detailRightImage: "Selected Work/Aldi_Bild.png",
    ctaText:
      "Wir übersetzen komplexe Themen in klar verständliche, hochwertige Videoformate für Marke und Vertrieb.",
  },
  {
    slug: "aldi",
    order: 50,
    title: "ALDI — Retail Campaign Assets",
    kicker: "Case ALDI",
    project: "Retail Campaign Assets",
    category: "Campaign Production / Social",
    client: "ALDI",
    year: "2023",
    studio: "2023 Video Production",
    headlineLead: "ALDI:",
    headlineImpact: "MOMENTS",
    intro: "Schnelle, präzise Kampagnenproduktion mit klarer Markenführung für Retail-Umfelder.",
    summary:
      "Für ALDI wurden Hero-Assets und Content-Cuts entwickelt, die kanalübergreifend funktionieren und gleichzeitig den Markencharakter konsequent transportieren.",
    services: ["Kampagnenkonzept", "Produktion", "Postproduktion", "Format-Adaption", "Rollout Support"],
    solutionBody:
      "Die Lösung war ein modularer Produktionsansatz mit klaren Master-Shots und variablen Social-Formaten für effiziente Ausspielung.",
    solutionFooterLabel: "2023 Video Produktion",
    heroImage: "Selected Work/Aldi_Bild.png",
    mainPosterImage: "Selected Work/Aldi_Bild.png",
    detailLeftImage: "Selected Work/Aldi_Bild.png",
    detailRightImage: "Selected Work/Merkur_Bild.jpg",
    ctaText:
      "Von Hero-Film bis Social-Cut: Wir bauen Kampagnen-Setups, die schnell ausspielbar und hochwertig produziert sind.",
  },
  {
    slug: "kpmg",
    order: 60,
    title: "KPMG — Corporate Storytelling",
    kicker: "Case KPMG",
    project: "Corporate Storytelling",
    category: "Corporate Film / Campaign",
    client: "KPMG",
    year: "2025",
    studio: "2025 Video Production",
    headlineLead: "KPMG:",
    headlineImpact: "IMPACT",
    intro: "Corporate Storytelling mit cinematic Look für einen starken und modernen Markenauftritt.",
    summary:
      "Für KPMG haben wir eine hochwertige Bewegtbildstrecke produziert, die Expertise, Haltung und Zukunftsthemen in eine klare visuelle Sprache übersetzt.",
    services: ["Creative Concept", "Regie", "Produktion", "Postproduktion", "Distribution Assets"],
    solutionBody:
      "Durch eine klare visuelle Hierarchie und konsequente Bildführung konnten wir komplexe Inhalte präzise und markengerecht inszenieren.",
    solutionFooterLabel: "2025 Video Produktion",
    heroImage: "Selected Work/KMNPG_Bild.png",
    mainPosterImage: "Selected Work/KMNPG_Bild.png",
    detailLeftImage: "Selected Work/KMNPG_Bild.png",
    detailRightImage: "Selected Work/Zeitgeist_Bild.png",
    ctaText:
      "Wir konzipieren und produzieren Corporate-Filme, die komplexe Botschaften verständlich und hochwertig visualisieren.",
  },
];

const assetCache = new Map<string, string>();

async function uploadImage(relativePath: string): Promise<string> {
  if (assetCache.has(relativePath)) {
    return assetCache.get(relativePath)!;
  }
  const fullPath = resolve(PUBLIC, relativePath);
  const buffer = await readFile(fullPath);
  const filename = basename(relativePath);
  console.log(`  ↑ uploading ${filename}...`);
  const asset = await client.assets.upload("image", buffer, { filename });
  assetCache.set(relativePath, asset._id);
  return asset._id;
}

function imageField(assetId: string, alt: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

async function main() {
  console.log(`Seeding ${cases.length} case studies into project ${projectId}/${dataset}...`);

  for (const c of cases) {
    const docId = `caseStudy-${c.slug}`;
    console.log(`\n→ ${c.slug}`);

    const heroAsset = await uploadImage(c.heroImage);
    const mainPosterAsset = await uploadImage(c.mainPosterImage);
    const leftAsset = await uploadImage(c.detailLeftImage);
    const rightAsset = await uploadImage(c.detailRightImage);
    const thumbnailAsset = c.thumbnailImage ? await uploadImage(c.thumbnailImage) : heroAsset;

    const doc = {
      _id: docId,
      _type: "caseStudy",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      order: c.order,
      featured: true,
      kicker: c.kicker,
      project: c.project,
      intro: c.intro,
      summary: c.summary,
      services: c.services,
      projectMeta: {
        _type: "projectMeta",
        client: c.client,
        year: c.year,
        category: c.category,
        studio: c.studio,
      },
      headline: {
        _type: "headline",
        lead: c.headlineLead,
        impact: c.headlineImpact,
      },
      heroImage: imageField(heroAsset, `${c.client} Hero Visual`),
      mainMedia: {
        _type: "mainMedia",
        posterImage: imageField(mainPosterAsset, `${c.client} Main Video Vorschau`),
        videoUrl: c.videoUrl,
      },
      solution: {
        _type: "solutionSection",
        heading: "the Solution.",
        body: c.solutionBody,
        imageLeft: imageField(leftAsset, `${c.client} Solution Detail Left`),
        imageRight: imageField(rightAsset, `${c.client} Solution Detail Right`),
        footerLabel: c.solutionFooterLabel,
      },
      cta: {
        _type: "ctaSection",
        title: "LET'S TALK",
        text: c.ctaText,
        mail: "info@make-c.de",
      },
      thumbnailImage: imageField(thumbnailAsset, `${c.client} Thumbnail`),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ upserted ${docId}`);
  }

  console.log(`\nDone. Open http://localhost:3000/studio to verify.`);
}

void randomUUID;

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
