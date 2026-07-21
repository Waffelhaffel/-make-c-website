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

// Platzhalter-Team: Rollen fest, Namen als klar erkennbarer Platzhalter.
// Der Kunde ersetzt "Vorname Nachname" im Studio durch die echten Namen.
const PLACEHOLDER_ROLES = ["Regie", "Kamera", "Schnitt", "Redaktion", "Produktion"];

function placeholderCredits() {
  return PLACEHOLDER_ROLES.map((role) => ({
    _key: randomUUID(),
    _type: "creditItem",
    role,
    name: "Vorname Nachname",
  }));
}

type CaseRow = { _id: string; slug: string | null; creditCount: number };

async function run() {
  // Nur veröffentlichte Cases (keine drafts.*), mit aktueller Credit-Anzahl.
  const rows = await client.fetch<CaseRow[]>(
    `*[_type == "caseStudy" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, "creditCount": count(credits) }`,
  );

  console.log(`Gefundene Cases: ${rows.length}`);

  const tx = client.transaction();
  let patched = 0;

  for (const row of rows) {
    if (row.creditCount > 0) {
      console.log(`  – ${row.slug ?? row._id}: hat bereits ${row.creditCount} Credits → übersprungen`);
      continue;
    }
    tx.patch(row._id, (p) => p.set({ credits: placeholderCredits() }));
    patched++;
    console.log(`  ✓ ${row.slug ?? row._id}: Platzhalter-Credits (${PLACEHOLDER_ROLES.length}) gesetzt`);
  }

  if (patched === 0) {
    console.log("Nichts zu tun — alle Cases haben bereits Credits.");
    return;
  }

  const result = await tx.commit();
  console.log(`\n✓ ${result.results.length} Dokument(e) aktualisiert.`);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
