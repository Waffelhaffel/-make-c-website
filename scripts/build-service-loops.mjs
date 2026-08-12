/**
 * Baut die Loop-Videos der Leistungsseiten für den Web-Einsatz.
 *
 *   node scripts/build-service-loops.mjs
 *
 * Quelle:  assets/masters/leistungen-loops/   (gitignored, siehe .gitignore)
 * Ziel:    public/leistungen-loops/<leistungs-slug>.mp4  + <slug>-poster.webp
 *
 * Warum überhaupt umrechnen: die Lieferdateien wiegen zusammen rund 22 MB. Eine
 * Leistungsseite wiegt heute 0,22 MB — ein einzelner ungetesteter Loop wäre also
 * das Zwanzigfache der ganzen Seite. Die Videos laufen zudem stumm als
 * Dauerschleife hinter Text; sie brauchen weder Tonspur noch Kinoqualität.
 *
 * Was passiert:
 *   - Tonspur raus (`-an`) — die Videos sind `muted`, die Spur wäre reines Gewicht
 *   - auf MAX_WIDTH herunterskaliert, Seitenverhältnis bleibt (`-2` = gerade Höhe)
 *   - H.264 High, CRF-gesteuert (Qualität statt fester Bitrate)
 *   - `+faststart`: der Index wandert an den Dateianfang, sonst startet die
 *     Wiedergabe erst, wenn die Datei fast durch ist
 *   - Bildrate auf MAX_FPS gedeckelt
 *   - dazu ein Poster aus der ersten Sekunde: `LazyVideo` lädt mit
 *     `preload="none"`, ohne Poster ist der Rahmen bis zum Start schwarz
 *
 * Die Zieldateien heißen wie die Leistungs-Slugs — wer eine Datei sucht, muss
 * nicht raten, zu welcher Seite sie gehört. Und kein Leerzeichen mehr im Pfad:
 * `ServiceBlocks` musste die alten Namen durch `encodeURI()` schicken.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets", "masters", "leistungen-loops");
const OUT = path.join(ROOT, "public", "leistungen-loops");

/** Obergrenze der Breite. Der Rahmen ist `lg:col-span-5` von max. 1480 px, also
 *  rund 570 px breit — 1280 px deckt auch 2×-Displays ab. */
const MAX_WIDTH = 1280;
const MAX_FPS = 30;
/** Höher = kleiner. 28 ist für weiche, dunkle Loops ohne feine Textur unauffällig. */
const CRF = 28;

/** Lieferdatei → Leistungs-Slug (`SERVICE_PAGES[].slug`). */
const MAPPING = {
  "Makec_Web_Loop_Strategie.mp4": "video-strategie",
  "Makec_Web_Loop_Produktion.mp4": "video-produktion",
  "Makec_Web_Loop_MotionDesign.mp4": "video-motion-design",
  "Makec_Web_Loop_Event.mp4": "event-content",
  "Makec_Web_Loop_AI.mp4": "artificial-intelligence",
  "Makec_Web_Loop_Studiobau.mp4": "studiobau",
};

const ffprobe = (args) =>
  execFileSync("ffprobe", ["-v", "error", ...args]).toString().trim();

fs.mkdirSync(OUT, { recursive: true });

let vorher = 0;
let nachher = 0;
const zeilen = [];

for (const [datei, slug] of Object.entries(MAPPING)) {
  const src = path.join(SRC, datei);
  if (!fs.existsSync(src)) {
    console.log(`übersprungen (fehlt): ${datei}`);
    continue;
  }

  const [w, h, fpsRoh] = ffprobe([
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,r_frame_rate",
    "-of", "csv=p=0",
    src,
  ]).split(",");
  const [zaehler, nenner] = fpsRoh.split("/").map(Number);
  const fps = zaehler / (nenner || 1);
  const dauer = Number(
    ffprobe(["-show_entries", "format=duration", "-of", "csv=p=0", src])
  );

  // Bildrate nur **senken**, nie anheben: ein `fps=30`-Filter auf 25-fps-Material
  // dupliziert Bilder und macht die Datei größer statt kleiner.
  const filter =
    `scale='min(${MAX_WIDTH},iw)':-2` + (fps > MAX_FPS ? `,fps=${MAX_FPS}` : "");

  const ziel = path.join(OUT, `${slug}.mp4`);
  execFileSync("ffmpeg", [
    "-y", "-i", src,
    "-an",
    "-vf", filter,
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
    "-crf", String(CRF),
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    ziel,
  ], { stdio: ["ignore", "ignore", "pipe"] });

  // Poster aus der Mitte der ersten Sekunde. ⚠️ Nicht direkt als WebP: der
  // Homebrew-ffmpeg hier ist ohne WebP-Encoder gebaut („Default encoder for
  // format webp is probably disabled"). Deshalb PNG über die Pipe und die
  // Umwandlung mit sharp, das im Projekt ohnehin liegt.
  const poster = path.join(OUT, `${slug}-poster.webp`);
  const pngBuffer = execFileSync("ffmpeg", [
    "-y", "-ss", String(Math.min(1, dauer / 2)), "-i", src,
    "-frames:v", "1",
    "-vf", `scale='min(${MAX_WIDTH},iw)':-2`,
    "-f", "image2pipe", "-vcodec", "png", "-",
  ], { stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 });
  await sharp(pngBuffer).webp({ quality: 78 }).toFile(poster);

  const [nw, nh] = ffprobe([
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-of", "csv=p=0",
    ziel,
  ]).split(",").map(Number);

  const alt = fs.statSync(src).size;
  const neu = fs.statSync(ziel).size;
  const pos = fs.statSync(poster).size;
  vorher += alt;
  nachher += neu + pos;

  zeilen.push({ slug, w, h, nw, nh, dauer, alt, neu, pos });
  console.log(
    `${slug.padEnd(24)} ${w}x${h} → ${nw}x${nh}  ` +
      `${(alt / 1048576).toFixed(2)} MB → ${(neu / 1048576).toFixed(2)} MB ` +
      `(+ ${(pos / 1024).toFixed(0)} kB Poster)  ${dauer.toFixed(1)}s`
  );
}

console.log(
  `\nGesamt: ${(vorher / 1048576).toFixed(2)} MB → ` +
    `${(nachher / 1048576).toFixed(2)} MB ` +
    `(${(100 - (nachher / vorher) * 100).toFixed(0)} % gespart)`
);

const seitenverhaeltnisse = [...new Set(zeilen.map((z) => (z.nw / z.nh).toFixed(3)))];
console.log(
  seitenverhaeltnisse.length === 1
    ? `Alle Loops im selben Seitenverhältnis: ${seitenverhaeltnisse[0]}:1`
    : `⚠️ Unterschiedliche Seitenverhältnisse: ${seitenverhaeltnisse.join(", ")} — ` +
        `der Rahmen in ServiceBlocks.tsx passt dann nicht für alle.`
);
