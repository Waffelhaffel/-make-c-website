/**
 * Baut die Set-Fotos der Leistungsseiten für den Web-Einsatz.
 *
 *   node scripts/build-service-images.mjs
 *
 * Quelle:  assets/masters/unterseite-bilder/   (gitignored, siehe .gitignore)
 * Ziel:    public/leistungen-bilder/<leistungs-slug>-1.webp  und  -2.webp
 *
 * Warum umrechnen: die zwölf Lieferdateien sind 6.200–7.000 px breite JPGs mit
 * zusammen **159 MB** — eine einzelne davon wiegt mehr als die komplette
 * Startseite samt Header-Video. Auf 1600 px WebP q82 (dieselbe Einstellung wie
 * bei den Case-Bildern, `scripts/build-case-images.ts`) bleiben rund 200 kB je
 * Bild. Der größte Rahmen auf der Seite ist das Band mit 1480 px Inhaltsbreite.
 *
 * ⚠️ Die Zuordnung unten ist der einzige Ort, an dem steht, welches Foto auf
 * welcher Leistungsseite landet. Alle zwölf Bilder sind Set-/Behind-the-Scenes-
 * Fotos; für „Motion Design" und „AI" gibt es kein wörtlich passendes Motiv,
 * dort ist nach Bildwirkung sortiert (grafisch/aufgeräumt bzw. dunkel/technisch).
 * Zum Tauschen die Dateinamen hier vertauschen, Skript neu laufen lassen — die
 * Pfade in `lib/leistungen.ts` bleiben dabei unverändert.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets", "masters", "unterseite-bilder");
const OUT = path.join(ROOT, "public", "leistungen-bilder");

/** Deckel wie bei den Case-Bildern. Breitester Rahmen: das Band mit 1480 px. */
const MAX_WIDTH = 1600;
const QUALITY = 82;

/** Leistungs-Slug → [Bild 1 (Textblock), Bild 2 (Band)] */
const MAPPING = {
  "video-strategie": ["A7400168.jpg", "A7400415.jpg"],
  "video-produktion": ["A7400507.jpg", "A7400432.jpg"],
  "video-motion-design": ["A7400632.jpg", "A7401150.jpg"],
  "event-content": ["A7401157.jpg", "A7401256.jpg"],
  "artificial-intelligence": ["A7408896.jpg", "A7409669.jpg"],
  studiobau: ["A7409855.jpg", "A7409933.jpg"],
};

fs.mkdirSync(OUT, { recursive: true });

let vorher = 0;
let nachher = 0;

for (const [slug, dateien] of Object.entries(MAPPING)) {
  for (const [i, datei] of dateien.entries()) {
    const src = path.join(SRC, datei);
    if (!fs.existsSync(src)) {
      console.log(`übersprungen (fehlt): ${datei}`);
      continue;
    }

    const ziel = path.join(OUT, `${slug}-${i + 1}.webp`);
    const meta = await sharp(src).metadata();
    await sharp(src)
      .resize({ width: Math.min(MAX_WIDTH, meta.width), withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(ziel);

    const neuMeta = await sharp(ziel).metadata();
    const alt = fs.statSync(src).size;
    const neu = fs.statSync(ziel).size;
    vorher += alt;
    nachher += neu;

    console.log(
      `${`${slug}-${i + 1}`.padEnd(28)} ${datei}  ` +
        `${meta.width}x${meta.height} → ${neuMeta.width}x${neuMeta.height}  ` +
        `${(alt / 1048576).toFixed(1)} MB → ${(neu / 1024).toFixed(0)} kB`
    );
  }
}

console.log(
  `\nGesamt: ${(vorher / 1048576).toFixed(1)} MB → ` +
    `${(nachher / 1048576).toFixed(2)} MB ` +
    `(${(100 - (nachher / vorher) * 100).toFixed(1)} % gespart)`
);
