/**
 * Migration: Dokument-IDs mit Punkt auf punktfreie IDs umziehen.
 *
 * Hintergrund: Sanity interpretiert den Teil vor dem ersten Punkt einer
 * Dokument-ID als Version/Bundle-Prefix (analog zu `drafts.` / `versions.`).
 * IDs wie `legalPage.impressum` oder `service.video-produktion` landen dadurch
 * nicht im öffentlich-veröffentlichten Layer -> anonyme Reads liefern null
 * -> die Impressum-/Datenschutz-/Service-Seiten zeigten 404.
 *
 * Fix: Punkte in den IDs durch Bindestriche ersetzen (z. B.
 * `legalPage.impressum` -> `legalPage-impressum`). Inhalt bleibt identisch,
 * die App fragt über `slug.current` ab, daher ändert sich am Frontend nichts.
 *
 * Ausführen mit:  npx tsx scripts/fix-document-ids.ts
 */
import { resolve } from "node:path";

import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: resolve(process.cwd(), ".env.local") });

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
const token = requireEnv("SANITY_API_WRITE_TOKEN");
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function run() {
  const docs: Array<Record<string, unknown> & { _id: string }> = await client.fetch(
    `*[_type in ["legalPage", "service"]]`
  );

  const toMigrate = docs.filter((d) => d._id.includes("."));
  if (toMigrate.length === 0) {
    console.log("✓ Nichts zu migrieren – keine IDs mit Punkt gefunden.");
    return;
  }

  const tx = client.transaction();
  const moves: string[] = [];

  for (const doc of toMigrate) {
    const oldId = doc._id;
    const newId = oldId.replace(/\./g, "-");
    // System-Felder entfernen, Rest 1:1 übernehmen
    const { _id, _rev, _createdAt, _updatedAt, ...rest } = doc;
    void _id;
    void _rev;
    void _createdAt;
    void _updatedAt;
    tx.createOrReplace({ _id: newId, ...rest } as { _id: string; _type: string });
    tx.delete(oldId);
    moves.push(`  ${oldId}  ->  ${newId}`);
  }

  await tx.commit();
  console.log(`✓ ${moves.length} Dokument(e) migriert:`);
  console.log(moves.join("\n"));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
