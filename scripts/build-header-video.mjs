/**
 * Baut das Hero-Video der Startseite für den Web-Einsatz.
 *
 *   node scripts/build-header-video.mjs
 *
 * Quelle:  assets/masters/header/Makec_Web_Header.mp4   (gitignored, siehe .gitignore)
 * Ziel:    public/header-video-av1.mp4      AV1   1920×1080  — Chrome, Edge, Firefox
 *          public/header-video-hevc.mp4     HEVC  1920×1080  — Safari (macOS/iOS)
 *          public/header-video.mp4          H.264 1600×900   — universeller Fallback
 *          public/header-video-poster.webp  erstes Bild
 *
 * ── Warum drei Dateien ──────────────────────────────────────────────────────
 * Der Browser lädt **genau eine** davon: `<source>` wird der Reihe nach geprüft,
 * die erste abspielbare gewinnt (`Hero.tsx`). Im Repo liegen also 7,4 MB, beim
 * Besucher kommen 2,20–2,73 MB an — je nach Browser. Die alte Datei wog 2,75 MB,
 * und zwar für jeden.
 *
 * Gemessen an dieser Quelle (SSIM/PSNR gegen eine visuell verlustfreie Fassung,
 * alle Kandidaten auf 1920 hochskaliert, weil das Video bildfüllend läuft):
 *
 *   H.264 1600 @1100k  2,84 MB   SSIM 0,9768   ← Bitratenprofil der alten Datei
 *   HEVC  1920 crf34   2,45 MB   SSIM 0,9811
 *   AV1   1920 crf47   2,19 MB   SSIM 0,9829
 *
 * Zum Vergleich, was H.264 für dieselbe Qualität bräuchte: 1600 @1420k kommt auf
 * SSIM 0,9805 und wiegt 3,59 MB — AV1 liefert das mit 39 % weniger Bytes. VP9
 * (1600 @800k, SSIM 0,9780) lag pro Byte etwa auf H.264-Niveau und ist deshalb
 * nicht dabei.
 *
 * AV1 liefert also bei **weniger** Bytes die **bessere** Qualität und dazu die
 * volle Auflösung der Quelle. Keine der drei Fassungen ist schlechter als das,
 * was vorher ausgeliefert wurde.
 *
 * ── Warum nicht einfach CRF wie bei den Loops ───────────────────────────────
 * Die Lieferdatei ist bereits ein Web-Encode (2,4 Mbit/s H.264). Ein CRF-Lauf
 * versucht, deren Kompressionsartefakte mitzukonservieren, und wird dadurch
 * **größer** als die Quelle: `-crf 26` bei 1920 ergab 7,1 MB. Für H.264 steht
 * deshalb hier eine 2-Pass-Zielbitrate; AV1 und HEVC sind effizient genug, dass
 * CRF trägt.
 *
 * ── Fallstricke ─────────────────────────────────────────────────────────────
 *  - HEVC braucht `-tag:v hvc1`. Mit dem Standard-Tag `hev1` spielt Safari die
 *    Datei nicht ab und fällt still auf H.264 zurück — der Gewinn wäre weg.
 *  - Die `codecs=`-Angaben in `Hero.tsx` müssen zu den Dateien passen. Das
 *    Skript gibt sie am Ende aus (ffprobe `mime_codec_string`); weicht eine ab,
 *    überspringt der Browser die Quelle, ohne dass es auffällt.
 *  - `+faststart` bei allen dreien: sonst steht der Index am Dateiende und die
 *    Wiedergabe startet erst, wenn fast alles geladen ist.
 *  - Tonspur raus (`-an`). Das Video läuft `muted`, die Spur der Quelle wiegt
 *    317 kbit/s — reines Gewicht.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets", "masters", "header", "Makec_Web_Header.mp4");
const OUT = path.join(ROOT, "public");

/** Volle Quellauflösung für AV1/HEVC — das Video läuft bildfüllend über den
 *  ganzen Viewport, da ist jede Skalierung sichtbar. H.264 bleibt bei 1600, weil
 *  es die Bytes sonst nicht trägt (und 1600 war der bisherige Auslieferstand). */
const H264_WIDTH = 1600;

const ffmpeg = (args) =>
  execFileSync("ffmpeg", ["-y", "-v", "error", ...args], {
    stdio: ["ignore", "ignore", "inherit"],
  });

const ffprobe = (args) =>
  execFileSync("ffprobe", ["-v", "error", ...args]).toString().trim();

if (!fs.existsSync(SRC)) {
  console.error(`Quelle fehlt: ${path.relative(ROOT, SRC)}`);
  process.exit(1);
}

const dauer = Number(ffprobe(["-show_entries", "format=duration", "-of", "csv=p=0", SRC]));
const quelle = fs.statSync(SRC).size;

// ── AV1 (Chrome, Edge, Firefox; Safari ab 17.4 auf Geräten mit AV1-Hardware) ──
// preset 4 ist der Punkt, an dem mehr Rechenzeit kaum noch Bytes spart.
const av1 = path.join(OUT, "header-video-av1.mp4");
console.log("AV1  … (dauert ein paar Minuten)");
ffmpeg([
  "-i", SRC,
  "-an",
  "-c:v", "libsvtav1", "-crf", "47", "-preset", "4", "-g", "125",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  av1,
]);

// ── HEVC (Safari; Hardware-Dekoder in jedem Apple-Gerät ab ca. 2015) ──────────
const hevc = path.join(OUT, "header-video-hevc.mp4");
console.log("HEVC …");
ffmpeg([
  "-i", SRC,
  "-an",
  "-c:v", "libx265", "-preset", "slow", "-crf", "34",
  "-pix_fmt", "yuv420p",
  "-tag:v", "hvc1",
  "-x265-params", "log-level=error",
  "-movflags", "+faststart",
  hevc,
]);

// ── H.264 (universeller Fallback, 2-Pass auf feste Zielbitrate) ──────────────
const h264 = path.join(OUT, "header-video.mp4");
const passlog = path.join(os.tmpdir(), "makec-header-x264");
console.log("H.264 … (2 Durchläufe)");
const h264Basis = [
  "-i", SRC,
  "-an",
  "-vf", `scale=${H264_WIDTH}:-2`,
  "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
  // 1050 kbit/s statt der 1103, mit denen die alte Datei ausgeliefert wurde:
  // so bleibt auch der Fallback-Pfad unter dem bisherigen Gewicht. Der
  // Unterschied von 5 % ist bei diesem Material nicht zu sehen.
  "-b:v", "1050k",
];
ffmpeg([...h264Basis, "-pass", "1", "-passlogfile", passlog, "-f", "null", "/dev/null"]);
ffmpeg([
  ...h264Basis,
  "-maxrate", "1800k", "-bufsize", "3000k",
  "-pass", "2", "-passlogfile", passlog,
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  h264,
]);
for (const rest of [`${passlog}-0.log`, `${passlog}-0.log.mbtree`]) {
  if (fs.existsSync(rest)) fs.unlinkSync(rest);
}

// ── Poster ───────────────────────────────────────────────────────────────────
// Bewusst das **erste** Bild: das Poster steht so lange, bis der erste Frame
// dekodiert ist — ein anderes Motiv gäbe an der Stelle einen sichtbaren Sprung.
// ⚠️ Nicht direkt als WebP encodieren: der Homebrew-ffmpeg ist ohne WebP-Encoder
// gebaut. Deshalb PNG über die Pipe und die Umwandlung mit sharp.
const poster = path.join(OUT, "header-video-poster.webp");
console.log("Poster …");
const png = execFileSync(
  "ffmpeg",
  ["-y", "-v", "error", "-i", SRC, "-frames:v", "1",
   "-vf", `scale=${H264_WIDTH}:-2`, "-f", "image2pipe", "-vcodec", "png", "-"],
  { stdio: ["ignore", "pipe", "inherit"], maxBuffer: 64 * 1024 * 1024 }
);
await sharp(png).webp({ quality: 72 }).toFile(poster);

// ── Bericht ──────────────────────────────────────────────────────────────────
const mb = (b) => (b / 1048576).toFixed(2);
console.log(`\nQuelle: ${mb(quelle)} MB, ${dauer.toFixed(2)} s\n`);
console.log("Datei                        Maße        MB     kbit/s  codecs= für <source>");

for (const datei of [av1, hevc, h264]) {
  const { streams: [s] } = JSON.parse(
    ffprobe([
      "-select_streams", "v:0",
      "-show_entries", "stream=width,height,level,codec_name,mime_codec_string",
      "-of", "json",
      datei,
    ])
  );
  // Was hier ausgegeben wird, gehört wörtlich als codecs= nach Hero.tsx.
  //  - AV1: ffprobe hängt an `av01.0.08M.08` noch die volle Farbbeschreibung
  //    (`.0.111.01.01.01.0`). Die kurze Form ist die übliche und die
  //    verträglichere: jedes zusätzliche Feld muss exakt stimmen, sonst
  //    verwirft der Browser die Quelle.
  //  - HEVC: ffprobe kennt dafür gar keinen `mime_codec_string`, der Wert
  //    (`hvc1.<profil>.<kompat>.L<level>.B0`) wird deshalb selbst gebaut.
  const codec =
    s.codec_name === "av1"
      ? s.mime_codec_string.split(".").slice(0, 4).join(".")
      : s.codec_name === "hevc"
        ? `hvc1.1.6.L${s.level}.B0`
        : s.mime_codec_string;
  const size = fs.statSync(datei).size;
  console.log(
    `${path.basename(datei).padEnd(28)} ${`${s.width}×${s.height}`.padEnd(11)} ` +
      `${mb(size).padStart(5)}  ${String(Math.round((size * 8) / dauer / 1000)).padStart(6)}  ${codec}`
  );
}
console.log(
  `${path.basename(poster).padEnd(28)} ${"".padEnd(11)} ` +
    `${mb(fs.statSync(poster).size).padStart(5)}`
);
console.log(
  "\n⚠️ Wenn sich eine codecs=-Angabe geändert hat, muss sie in " +
    "components/sections/Hero.tsx nachgezogen werden."
);
