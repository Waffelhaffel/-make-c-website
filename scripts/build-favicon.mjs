/**
 * Baut das Tab-Icon (die „/c"-Marke, weiß auf Markendunkel) aus der Wortmarke.
 *
 *   node scripts/build-favicon.mjs
 *
 * Quelle ist `public/makec-logo-icon.png` — die Wortmarke „make/c" in Schwarz auf
 * Weiß. Daraus wird nur das „/c" beschnitten, invertiert und auf `#14140F`
 * gesetzt. Bewusst aus dem vorhandenen Marken-Asset gerechnet statt nachgebaut:
 * so sind Schrägstrich und „c" exakt die Original-Glyphen, nicht eine
 * Montserrat-Näherung.
 *
 * Erzeugt (Next.js-Dateikonventionen, werden automatisch verlinkt —
 * `app/layout.tsx` braucht dafür **kein** `icons`-Feld in der Metadata):
 *   app/icon.png        512×512  → <link rel="icon">
 *   app/apple-icon.png  180×180  → <link rel="apple-touch-icon">
 *   app/favicon.ico     16/32/48 → /favicon.ico für alles, was nicht das
 *                                  Link-Tag liest (Lesezeichen, Crawler)
 *
 * ⚠️ Die Zuschnittkante steht als Zahl im Skript (CROP_X). Sie stammt aus einer
 * Profilmessung der Quelle: dunkle Pixel liegen in Zeile 289–658, und die letzte
 * Spaltenlücke der Wortmarke endet bei 1403 — dahinter beginnt das „/c". Wird
 * die Wortmarke je ersetzt, muss der Wert neu gemessen werden.
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/makec-logo-icon.png";
const BG = { r: 0x14, g: 0x14, b: 0x0f, alpha: 1 }; // makec-dark
const CROP_X = 1404; // erste Spalte des „/c" in der Quelle
/** Anteil der Kantenlänge, den die Marke einnimmt — Rest ist Rand. */
const MARK_RATIO = 0.62;

const raw = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data, info } = raw;
const { width: W, height: H, channels: C } = info;

// Enge Bounding-Box der Glyphen rechts von CROP_X (dunkel + deckend).
let x0 = W, x1 = -1, y0 = H, y1 = -1;
for (let y = 0; y < H; y++) {
  for (let x = CROP_X; x < W; x++) {
    const i = (y * W + x) * C;
    if (data[i + 3] > 128 && (data[i] + data[i + 1] + data[i + 2]) / 3 < 128) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
}
const markW = x1 - x0 + 1;
const markH = y1 - y0 + 1;
console.log(`„/c" gefunden bei ${x0},${y0} — ${markW}×${markH}`);

// Schwarz auf Weiß → Weiß auf Schwarz. Über `screen` auf den dunklen Grund
// gelegt bleibt Schwarz unsichtbar und Weiß deckend — das spart einen
// Alphakanal-Umbau und hält die Kantenglättung der Quelle intakt.
const markWhiteOnBlack = await sharp(SRC)
  .extract({ left: x0, top: y0, width: markW, height: markH })
  .flatten({ background: "#ffffff" })
  .negate({ alpha: false })
  .toBuffer();

/** Ein quadratisches Icon der Kantenlänge `size`. */
async function icon(size) {
  const target = Math.round(size * MARK_RATIO);
  // Die Marke ist breiter als hoch → an der Breite ausrichten, Höhe folgt.
  const mark = await sharp(markWhiteOnBlack)
    .resize({ width: target, fit: "inside" })
    .toBuffer();
  const { height: mh } = await sharp(mark).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([
      {
        input: mark,
        left: Math.round((size - target) / 2),
        top: Math.round((size - mh) / 2),
        blend: "screen",
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

writeFileSync("app/icon.png", await icon(512));
writeFileSync("app/apple-icon.png", await icon(180));

// ICO von Hand: sharp kann kein ICO schreiben, und ein Paket dafür wäre eine
// Abhängigkeit für 40 Zeilen Binärformat. Jeder Eintrag ist ein eingebettetes
// PNG — das versteht jeder Browser seit IE11.
const SIZES = [16, 32, 48];
const pngs = await Promise.all(SIZES.map(icon));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserviert
header.writeUInt16LE(1, 2); // Typ 1 = Icon
header.writeUInt16LE(SIZES.length, 4);
let offset = 6 + SIZES.length * 16;
const dir = SIZES.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size === 256 ? 0 : size, 0); // Breite
  e.writeUInt8(size === 256 ? 0 : size, 1); // Höhe
  e.writeUInt8(0, 2); // Palettengröße
  e.writeUInt8(0, 3); // reserviert
  e.writeUInt16LE(1, 4); // Farbebenen
  e.writeUInt16LE(32, 6); // Bit pro Pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
writeFileSync("app/favicon.ico", Buffer.concat([header, ...dir, ...pngs]));

console.log("geschrieben: app/icon.png (512), app/apple-icon.png (180), app/favicon.ico (16/32/48)");
