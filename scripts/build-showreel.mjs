/**
 * Baut das Showreel der Startseite für den Web-Einsatz.
 *
 *   node scripts/build-showreel.mjs
 *
 * Quelle:  assets/masters/showreel/Makec_Showreel_260827.mp4  (gitignored, siehe .gitignore)
 * Ziel:    public/showreel.mp4   H.264 1920×1080, Ton übernommen
 *
 * ── Warum überhaupt umrechnen ───────────────────────────────────────────────
 * Die Lieferdatei vom 01.09.2026 wiegt **27,4 MB** (1920×1080, 25 fps, 51,6 s,
 * H.264 Main @ 4,33 Mbit/s). Sie lädt zwar erst auf Klick, wäre damit aber die
 * mit Abstand größte Datei im Projekt — mehr als das Doppelte der Fassung, die
 * bis dahin dort lag (11,7 MB, 40,5 s, 2,00 Mbit/s).
 *
 * Das Ziel ist deshalb bewusst **dasselbe Bitratenprofil wie vorher**: gleiche
 * Auflösung, gleiche 2,0 Mbit/s. Die neue Datei ist trotzdem etwas größer als
 * die alte, und zwar nur, weil der Reel 11 Sekunden länger ist.
 *
 * Gemessen gegen die Lieferdatei (SSIM, alle Kandidaten auf 1920×1080 gebracht,
 * damit die Skalierung nicht als Qualitätsverlust mitzählt):
 *
 *   1600×900  @1600k   10,61 MB   SSIM 0,9913
 *   1920×1080 @2000k   13,08 MB   SSIM 0,9924   ← gewählt
 *   1920×1080 @2600k   16,74 MB   SSIM 0,9948
 *   1920×1080 crf23    32,35 MB   SSIM 0,9967   ← größer als die Quelle
 *
 * Zum Maßstab: die drei Hero-Fassungen liegen bei SSIM 0,977–0,983 und sind so
 * abgenommen. 900p würde 2,5 MB sparen, ist für ein Agentur-Showreel aber der
 * falsche Tauschhandel — das ist die Arbeitsprobe.
 *
 * ── Warum nicht CRF ─────────────────────────────────────────────────────────
 * Derselbe Fallstrick wie beim Hero-Video, hier noch deutlicher: die Quelle ist
 * schon ein Web-Encode. Ein CRF-Lauf versucht deren Kompressionsartefakte
 * mitzukonservieren und wird **größer als die Quelle** — `-crf 23` ergab 32,35 MB
 * aus 27,4 MB. Für H.264 auf vorkomprimiertem Material gehört eine 2-Pass-
 * Zielbitrate her, nicht CRF.
 *
 * ── Fallstricke ─────────────────────────────────────────────────────────────
 *  - **Ton bleibt.** Anders als Hero und Loops läuft dieses Video nicht `muted`;
 *    `Showreel.tsx` rendert einen `<video controls>`. Die Spur wird per
 *    `-c:a copy` **übernommen**, nicht neu codiert: die Quelle liefert AAC-LC
 *    128 kbit/s, ein zweiter Durchlauf würde sie nur verschlechtern.
 *  - Die Quelle führt eine **dritte Spur** (`tmcd`, Timecode). `-map` nimmt
 *    deshalb ausdrücklich nur Bild und Ton — **das genügt aber nicht**: der
 *    mp4-Muxer schreibt von sich aus wieder eine `tmcd`-Spur, sobald der
 *    Videostream Timecode-Metadaten trägt. Erst `-write_tmcd 0` hält sie
 *    draußen. Nachprüfen mit `ffprobe -show_entries stream=codec_tag_string`;
 *    die fertige Datei hat genau zwei Spuren, `avc1` und `mp4a`.
 *  - `+faststart`: sonst steht der Index am Dateiende und die Wiedergabe startet
 *    erst, wenn fast alles geladen ist. Bei 13 MB wäre das gut sichtbar.
 *  - Die Log-Dateien des 2-Pass-Laufs landen in einem Temp-Verzeichnis, nicht im
 *    Repo — `ffmpeg` legt sie sonst als `ffmpeg2pass-0.log` ins Arbeitsverzeichnis.
 *  - ⚠️ **Das Standbild wird hier nicht gebaut.** `public/showreel-thumbnail.webp`
 *    ist ein gestaltetes Bild und stammt noch von der Fassung bis 01.09.2026.
 *    Wenn es zum neuen Reel passen soll, muss es jemand ersetzen — bewusst nicht
 *    automatisch aus einem Frame gezogen.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets", "masters", "showreel", "Makec_Showreel_260827.mp4");
const OUT = path.join(ROOT, "public", "showreel.mp4");

/** Volle Auflösung der Quelle — der Player ist bis 1480 px breit. */
const BREITE = 1920;
/** kbit/s Video. Dasselbe Profil wie die Fassung bis 01.09.2026. */
const BITRATE = 2000;

const mb = (bytes) => (bytes / 1024 ** 2).toFixed(2);
const ffmpeg = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
const ffprobe = (args) => execFileSync("ffprobe", ["-v", "error", ...args]).toString().trim();

if (!fs.existsSync(SRC)) {
  console.error(`Quelle fehlt: ${SRC}`);
  console.error("Die Masters sind gitignored — Datei aus der Ablage dorthin kopieren.");
  process.exit(1);
}

const [w, h, fpsRoh] = ffprobe([
  "-select_streams", "v:0",
  "-show_entries", "stream=width,height,r_frame_rate",
  "-of", "csv=p=0",
  SRC,
]).split(",");
const dauer = Number(ffprobe(["-show_entries", "format=duration", "-of", "csv=p=0", SRC]));
const vorher = fs.statSync(SRC).size;

console.log(`Quelle:  ${w}×${h}  ${fpsRoh} fps  ${dauer.toFixed(1)} s  ${mb(vorher)} MB`);
console.log(`Ziel:    ${BREITE}px  ${BITRATE} kbit/s  2-Pass\n`);

// 2-Pass: der erste Durchlauf analysiert nur, der zweite schreibt die Datei.
const logPrefix = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "showreel-")), "pass");
const gemeinsam = [
  "-i", SRC,
  "-vf", `scale=${BREITE}:-2`,
  "-c:v", "libx264",
  "-profile:v", "high",
  "-pix_fmt", "yuv420p",
  "-preset", "slow",
  "-b:v", `${BITRATE}k`,
  "-passlogfile", logPrefix,
];

console.log("Durchlauf 1/2 (Analyse) …");
ffmpeg([...gemeinsam, "-map", "0:v:0", "-an", "-pass", "1", "-f", "mp4", "/dev/null"]);

console.log("Durchlauf 2/2 (Ausgabe) …");
// -map + -write_tmcd: nur Bild und Ton, keine Timecode-Spur (siehe Fallstricke).
ffmpeg([
  ...gemeinsam,
  "-map", "0:v:0",
  "-map", "0:a:0",
  "-pass", "2",
  "-c:a", "copy",
  // Ohne das legt der mp4-Muxer eine eigene tmcd-Spur an, obwohl -map sie nicht
  // anfordert — siehe Fallstricke oben.
  "-write_tmcd", "0",
  "-movflags", "+faststart",
  OUT,
]);

const nachher = fs.statSync(OUT).size;
const spuren = ffprobe(["-show_entries", "stream=codec_type,codec_name", "-of", "csv=p=0", OUT])
  .split("\n")
  .join(" · ");

console.log(`\nfertig: public/showreel.mp4`);
console.log(`  ${mb(vorher)} MB → ${mb(nachher)} MB  (${(-(1 - nachher / vorher) * 100).toFixed(0)} %)`);
console.log(`  Spuren: ${spuren}`);
console.log(`\nSSIM gegen die Quelle prüfen:`);
console.log(`  ffmpeg -i public/showreel.mp4 -i "${SRC}" \\`);
console.log(`    -filter_complex "[0:v]scale=1920:1080[a];[1:v]scale=1920:1080[b];[a][b]ssim" -f null -`);
