/**
 * Einmal-Skript: schreibt `lib/content/cases.ts` aus
 * `scripts/data/portfolio-cases.json`.
 *
 *   npx tsx scripts/generate-cases.ts
 *
 * Danach ist die erzeugte Datei die Quelle der Wahrheit und wird von Hand
 * gepflegt — das Skript nicht erneut laufen lassen, ohne die Änderungen dort
 * zu sichern. Es liegt nur bei, um den Import nachvollziehbar zu machen.
 */

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const DATA = resolve(process.cwd(), "scripts/data/portfolio-cases.json");
const OUT = resolve(process.cwd(), "lib/content/cases.ts");

const CATEGORY_LABELS: Record<string, string> = {
  "beratung-strategie": "Beratung & Strategie",
  "distribution-performance": "Distribution & Performance",
  "employer-branding": "Employer Branding",
  erklaervideo: "Erklärvideo",
  "event-messe-kommunikation": "Event & Messe Kommunikation",
  imagefilm: "Imagefilm",
  "kreation-visual-storytelling": "Kreation & Visual Storytelling",
  "kuenstliche-intelligenz": "Künstliche Intelligenz",
  "live-streaming": "Live-Streaming",
  "partner-fuer-agenturen": "Partner für Agenturen",
  produktvideo: "Produktvideo",
  "social-media-influencer-marketing": "Social Media & Influencer Marketing",
  "studio-produktion": "Studio-Produktion",
  "virtual-augmented-reality": "Virtual & Augmented Reality",
};

/** ALDI kommt im alten Portfolio nicht vor — Kategorien aus seiner Sanity-Kategorie abgeleitet. */
const EXTRA_CATEGORIES: Record<string, string[]> = {
  aldi: ["produktvideo", "social-media-influencer-marketing"],
};

type Case = {
  slug: string;
  project: string;
  kicker?: string;
  client: string;
  year: string;
  category: string;
  categories: string[];
  summary: string;
  services?: string[];
  credits?: { role: string; name: string }[];
  image: { src: string; alt: string };
  poster?: { src: string; alt: string };
  video?: string;
  gallery?: { src: string; alt: string; ratio: string }[];
};

function quote(s: string): string {
  return JSON.stringify(s);
}

function serialize(c: Case, indent = "  "): string {
  const i = `${indent}  `;
  const lines: string[] = [`${indent}{`];
  lines.push(`${i}slug: ${quote(c.slug)},`);
  lines.push(`${i}client: ${quote(c.client)},`);
  lines.push(`${i}project: ${quote(c.project)},`);
  lines.push(`${i}year: ${quote(c.year)},`);
  lines.push(`${i}category: ${quote(c.category)},`);
  lines.push(
    `${i}categories: [${c.categories.map(quote).join(", ")}],`
  );
  if (c.kicker) lines.push(`${i}kicker: ${quote(c.kicker)},`);
  lines.push(`${i}summary:`);
  lines.push(`${i}  ${quote(c.summary)},`);
  if (c.services?.length) {
    lines.push(`${i}services: [${c.services.map(quote).join(", ")}],`);
  }
  if (c.video) lines.push(`${i}video: ${quote(c.video)},`);
  lines.push(
    `${i}image: { src: ${quote(c.image.src)}, alt: ${quote(c.image.alt)} },`
  );
  if (c.poster) {
    lines.push(
      `${i}poster: { src: ${quote(c.poster.src)}, alt: ${quote(c.poster.alt)} },`
    );
  }
  if (c.credits?.length) {
    lines.push(`${i}credits: [`);
    c.credits.forEach((cr) =>
      lines.push(`${i}  { role: ${quote(cr.role)}, name: ${quote(cr.name)} },`)
    );
    lines.push(`${i}],`);
  }
  if (c.gallery?.length) {
    lines.push(`${i}gallery: [`);
    c.gallery.forEach((g) =>
      lines.push(
        `${i}  { src: ${quote(g.src)}, alt: ${quote(g.alt)}, ratio: ${quote(g.ratio)} },`
      )
    );
    lines.push(`${i}],`);
  }
  lines.push(`${indent}},`);
  return lines.join("\n");
}

async function main() {
  const data = JSON.parse(await readFile(DATA, "utf8"));
  const imported = new Map<string, Case>();

  for (const c of data.imported) {
    imported.set(c.slug, {
      slug: c.slug,
      client: c.client,
      project: c.project,
      year: c.year,
      category: c.categorySlugs
        .map((s: string) => CATEGORY_LABELS[s])
        .filter(Boolean)
        .join(" · "),
      categories: c.categorySlugs,
      kicker: "/ Case Study /",
      summary: c.summary,
      ...(c.video ? { video: c.video } : {}),
      image: { src: `/work/${c.slug}.webp`, alt: `${c.client} — ${c.project}` },
      ...(c.credits.length ? { credits: c.credits } : {}),
    });
  }

  // Bestandscases aus Sanity (merkur, aldi) in dieselbe Form bringen.
  const skippedCats = new Map<string, string[]>(
    data.skipped.map((s: { slug: string; categorySlugs: string[] }) => [
      s.slug,
      s.categorySlugs,
    ])
  );
  for (const e of data.existing) {
    const categories = skippedCats.get(e.slug) ?? EXTRA_CATEGORIES[e.slug] ?? [];
    const alt = `${e.projectMeta.client} — ${e.project}`;
    imported.set(e.slug, {
      slug: e.slug,
      client: e.projectMeta.client,
      project: e.project,
      year: e.projectMeta.year,
      category: e.projectMeta.category,
      categories,
      kicker: e.kicker || "/ Case Study /",
      summary: e.summary,
      ...(e.services?.length ? { services: e.services } : {}),
      ...(e.videoUrl ? { video: e.videoUrl } : {}),
      image: { src: `/work/${e.slug}.webp`, alt },
      ...(e.posterUrl && e.posterUrl !== e.thumbUrl
        ? { poster: { src: `/work/${e.slug}-poster.webp`, alt } }
        : {}),
      // Platzhalter-Credits („Vorname Nachname") kommen nicht mit.
      ...(() => {
        const real = (e.credits ?? []).filter(
          (c: { name: string }) => c.name !== "Vorname Nachname"
        );
        return real.length ? { credits: real } : {};
      })(),
      ...((e.gallery ?? []).length
        ? {
            gallery: (e.gallery as { ratio: string; alt: string }[]).map((g, i) => ({
              src: `/work/${e.slug}-gallery-${i + 1}.webp`,
              alt: g.alt || `${alt} — Still ${i + 1}`,
              ratio: g.ratio || "standard",
            })),
          }
        : {}),
    });
  }

  // Reihenfolge der alten Portfolio-Seite; was dort fehlt (aldi), hängt hinten an.
  const ordered: Case[] = [];
  for (const slug of data.order as string[]) {
    const c = imported.get(slug);
    if (c) {
      ordered.push(c);
      imported.delete(slug);
    }
  }
  ordered.push(...imported.values());

  const header = `import type { CaseStudy } from "./types";

// Die Referenzen von make/c — hartcodiert (siehe CLAUDE.md, Regel 1).
//
// Herkunft (08/2026): 58 Projekte aus der alten Portfolio-Seite make-c.de/portfolio
// (Titel, Untertitel, Kategorien und Bilder aus dem HTML-Export, Beschreibungstexte,
// Jahre, Videos und Credits von den zugehörigen Detailseiten) plus die beiden Cases,
// die nur in Sanity existierten: \`merkur\` (der einzige ausformulierte Bestands-Case)
// und \`aldi\`.
//
// Die Reihenfolge hier ist die Reihenfolge auf /work — sie entspricht der alten
// Portfolio-Seite (grob neu → alt). Es gibt kein \`featured\`-Flag mehr: was hier
// steht, wird gezeigt.
//
// ⚠️ \`year\` stammt aus dem Veröffentlichungsdatum der alten Seite und kann vom
// Produktionsjahr abweichen. \`summary\` ist die Original-Copy von make-c.de,
// maschinell übernommen und nicht redigiert.
//
// Bilder liegen unter \`public/work/<slug>.webp\` (max. 1600 px, WebP).

export const CASES: CaseStudy[] = [
`;

  const footer = `];

const BY_SLUG = new Map(CASES.map((c) => [c.slug, c]));

/**
 * Cases in der Reihenfolge der übergebenen Slugs — für die drei kuratierten
 * Kacheln je Leistungsseite (\`SERVICE_PAGES[].caseSlugs\`) und für das
 * Selected-Work-Raster der Startseite. Unbekannte Slugs fallen still weg;
 * genauso verhielt sich vorher \`getCaseStudiesBySlugs()\`.
 */
export function getCasesBySlugs(slugs: string[]): CaseStudy[] {
  return slugs.flatMap((slug) => {
    const found = BY_SLUG.get(slug);
    return found ? [found] : [];
  });
}
`;

  const body = ordered.map((c) => serialize(c)).join("\n");
  await writeFile(OUT, `${header}${body}\n${footer}`, "utf8");

  console.log(`${ordered.length} Cases → lib/content/cases.ts`);
  console.log(
    `  mit Video: ${ordered.filter((c) => c.video).length} · ` +
      `mit Credits: ${ordered.filter((c) => c.credits?.length).length} · ` +
      `mit Galerie: ${ordered.filter((c) => c.gallery?.length).length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
