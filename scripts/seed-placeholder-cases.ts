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

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// Wie viele Platzhalter-Projekte anlegen (Nummerierung startet nach den 6 echten).
const COUNT = 12;
const START_NUMBER = 7;

const PLACEHOLDER_ROLES = ["Regie", "Kamera", "Schnitt", "Redaktion", "Produktion"];

function placeholderCredits() {
  return PLACEHOLDER_ROLES.map((role) => ({
    _key: randomUUID(),
    _type: "creditItem",
    role,
    name: "Vorname Nachname",
  }));
}

function imageField(assetRef: string, alt: string) {
  return { _type: "image", asset: { _type: "reference", _ref: assetRef }, alt };
}

async function run() {
  // Vorhandene Bild-Assets der echten Cases wiederverwenden (kein Upload).
  const refs = (
    await client.fetch<(string | null)[]>(
      `*[_type == "caseStudy" && !(_id in path("drafts.**")) && defined(heroImage.asset._ref)].heroImage.asset._ref`,
    )
  ).filter((r): r is string => Boolean(r));

  if (refs.length === 0) {
    throw new Error("Keine vorhandenen Bild-Assets gefunden — kann heroImage/posterImage nicht setzen.");
  }
  console.log(`Wiederverwendbare Bild-Assets: ${refs.length}`);

  const tx = client.transaction();

  for (let i = 0; i < COUNT; i++) {
    const n = START_NUMBER + i;
    const nn = String(n).padStart(2, "0");
    const slug = `referenzprojekt-${nn}`;
    const docId = `caseStudy-${slug}`;
    const ref = refs[i % refs.length];

    const doc = {
      _id: docId,
      _type: "caseStudy",
      title: `Referenzprojekt ${nn} (Platzhalter)`,
      slug: { _type: "slug", current: slug },
      order: 200 + i, // hinter den 6 echten (order 10–60)
      featured: true,
      kicker: "Platzhalter",
      project: `Referenzprojekt ${nn}`,
      summary:
        "Platzhalter-Projekt. Hier steht später eine kurze Beschreibung, was für diesen Kunden umgesetzt wurde. Bitte im Studio durch echte Inhalte, Bilder und ein Video ersetzen.",
      services: ["Konzept", "Produktion", "Postproduktion"],
      projectMeta: {
        _type: "projectMeta",
        client: "Platzhalter-Kunde",
        year: "2024",
        category: "Video",
      },
      heroImage: imageField(ref, `Platzhalter Referenzprojekt ${nn}`),
      mainMedia: {
        _type: "mainMedia",
        posterImage: imageField(ref, `Platzhalter Referenzprojekt ${nn}`),
      },
      thumbnailImage: imageField(ref, `Platzhalter Referenzprojekt ${nn}`),
      credits: placeholderCredits(),
    };

    tx.createOrReplace(doc);
    console.log(`  ✓ ${slug}`);
  }

  const result = await tx.commit();
  console.log(`\n✓ ${result.results.length} Platzhalter-Cases angelegt/aktualisiert.`);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
