/**
 * Einmal-Skript: baut `public/work/` aus zwei Quellen.
 *
 *   npx tsx scripts/build-case-images.ts
 *
 * 1. die 54 Bilder des alten Portfolio-Exports (lokaler Downloads-Ordner)
 * 2. die Bilder der 6 bestehenden Cases vom Sanity-CDN (einmalig geholt, damit
 *    sie den CMS-Ausbau überleben)
 *
 * Alles wird auf max. 1600 px lange Kante gebracht und als WebP (q82) abgelegt.
 * Braucht `scripts/data/portfolio-cases.json` aus `extract-portfolio.ts`.
 */

import { mkdir, readFile, writeFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

import sharp from "sharp";

const IMAGE_DIR =
  "/Users/paul/Downloads/Portfolio - make_c video content marketing GmbH_files";
const DATA = resolve(process.cwd(), "scripts/data/portfolio-cases.json");
const OUT_DIR = resolve(process.cwd(), "public/work");

const MAX_EDGE = 1600;
const QUALITY = 82;

type Imported = { slug: string; imageFile: string };
type Existing = {
  slug: string;
  thumbUrl: string | null;
  posterUrl: string | null;
  gallery: { url: string | null }[] | null;
};

async function toWebp(input: Buffer, outName: string): Promise<void> {
  const out = resolve(OUT_DIR, outName);
  await sharp(input)
    .rotate() // EXIF-Orientierung anwenden, bevor die Metadaten wegfallen
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(out);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const data = JSON.parse(await readFile(DATA, "utf8")) as {
    imported: Imported[];
    existing: Existing[];
  };

  console.log(`Portfolio-Bilder → ${OUT_DIR}`);
  for (const item of data.imported) {
    const buf = await readFile(resolve(IMAGE_DIR, item.imageFile));
    await toWebp(buf, `${item.slug}.webp`);
    process.stdout.write(".");
  }
  console.log(`\n  ${data.imported.length} konvertiert`);

  console.log("Bestandscases vom Sanity-CDN …");
  // Gleiches Asset in mehreren Feldern → nur einmal laden.
  const cache = new Map<string, Buffer>();
  async function download(url: string): Promise<Buffer> {
    const hit = cache.get(url);
    if (hit) return hit;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} für ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    cache.set(url, buf);
    return buf;
  }

  for (const c of data.existing) {
    if (c.thumbUrl) {
      await toWebp(await download(c.thumbUrl), `${c.slug}.webp`);
    }
    // Poster nur separat ablegen, wenn es ein anderes Asset ist als das Thumbnail.
    if (c.posterUrl && c.posterUrl !== c.thumbUrl) {
      await toWebp(await download(c.posterUrl), `${c.slug}-poster.webp`);
    }
    const gallery = c.gallery ?? [];
    for (let i = 0; i < gallery.length; i++) {
      const url = gallery[i]?.url;
      if (url) await toWebp(await download(url), `${c.slug}-gallery-${i + 1}.webp`);
    }
    console.log(`  ✓ ${c.slug}`);
  }

  const files = await readdir(OUT_DIR);
  const sizes = await Promise.all(
    files.map(async (f) => (await stat(resolve(OUT_DIR, f))).size)
  );
  const total = sizes.reduce((a, b) => a + b, 0);
  console.log(
    `\n${files.length} Dateien, ${(total / 1e6).toFixed(1)} MB gesamt ` +
      `(Ø ${Math.round(total / files.length / 1024)} kB)`
  );

  // Kleine Manifest-Datei, damit der nächste Schritt weiß, was existiert.
  await writeFile(
    resolve(process.cwd(), "scripts/data/case-images.json"),
    JSON.stringify(files.sort(), null, 2),
    "utf8"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
