/**
 * Baut aus „_White Versions" die Logo-Dateien für den LogoBanner.
 *
 * Warum nicht einfach kopieren: die Quellen haben Seitenverhältnisse von 1,00
 * (Bayer) bis 9,91 (Serviceplan) und teils riesige transparente Ränder
 * (Gerolsteiner: 14617×11300, davon 4 % Farbe). Der Banner setzt eine feste
 * Höhe und `w-auto` — ungetrimmt und ohne Angleichung wäre Bayer ein Fleck und
 * Serviceplan ein Balken.
 *
 * Verfahren: beschneiden → auf gleiche optische *Fläche* skalieren
 * (h = K/√Seitenverhältnis, gedeckelt) → auf eine Leinwand mit **konstanter
 * Höhe** zentrieren. Die konstante Leinwandhöhe ist der Trick: weil das CSS die
 * Bildhöhe fixiert, bestimmt sie und nicht das Logo, wie groß das Motiv am Ende
 * erscheint.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = new URL("./data/logos-white/", import.meta.url).pathname;
const OUT = process.argv[2] ?? new URL("../public/logos/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const CANVAS_H = 240; // ~2,9× der 84 px im Banner — reicht für Retina
const K = 240; // Zielfläche: h = K/√ar
const H_MIN = 105; // sonst werden 9:1-Wortmarken unlesbar flach
const W_MAX = 630; // sonst reißen Serviceplan/Vok Dams die Leiste auseinander

// Quelle → Zieldatei + Alt-Text. Reihenfolge = Reihenfolge im Banner.
const LOGOS = [
  ["Telekom.png", "telekom", "Telekom"],
  ["18d743ee603cc666d83dc5bc6f5b1772822ef426-2560x450.png.avif", "db-schenker", "DB Schenker"],
  ["Covestro_Logo.png", "covestro", "Covestro"],
  ["CGN Logo.png", "koeln-bonn-airport", "Köln Bonn Airport"],
  ["Bayer Logo.png", "bayer", "Bayer"],
  ["Zurich Logo.png", "zurich", "Zurich"],
  ["Koelnmesse_Logo.png", "koelnmesse", "Koelnmesse"],
  ["Evonik Logo.png", "evonik", "Evonik"],
  ["Rewe-group.png", "rewe-group", "REWE Group"],
  ["ERGO_Claim-DE_Lock-up-centered_Red_RGB.png", "ergo", "ERGO"],
  ["Merkur Logo.png", "merkur", "Merkur"],
  ["HDI-Logo.png", "hdi", "HDI"],
  ["shop-com-ueber-uns-section1-logo-rebranding.png", "shop-apotheke", "shop-apotheke.com"],
  ["Logo_UniKoeln.png", "uniklinik-koeln", "Uniklinik Köln"],
  ["eckes-granini-logo.png", "eckes-granini", "Eckes-Granini"],
  ["TUEV-Rheinland-Logo1.png", "tuev-rheinland", "TÜV Rheinland"],
  ["Adalliance Logo.png", "adalliance", "AdAlliance"],
  ["Logo-KM.png", "rheinenergie-marathon-koeln", "RheinEnergie Marathon Köln"],
  ["gerolsteinerlogoohneclaimschwarz72dpi.png", "gerolsteiner", "Gerolsteiner"],
  ["lorenz-logo.png", "lorenz", "Lorenz"],
  ["funny-frisch-logo-black-and-white.png", "funny-frisch", "funny-frisch"],
  ["Vok_Dams_Logo.png", "vok-dams", "VOK DAMS"],
  ["serviceplanbanner_EogYfGV.png", "serviceplan", "Serviceplan"],
];

/**
 * funny-frisch liegt als **deckendes** Schwarz-Weiß-Raster vor (kein Alpha-Motiv,
 * 100 % deckend) — auf dunklem Grund wäre das ein weißer Kasten. Deshalb hier
 * umgerechnet: Helligkeit invertiert wird zur Deckkraft, die Farbe wird Weiß.
 * Danach sieht die Datei aus wie die anderen 22: weißes Motiv auf transparent.
 */
async function schwarzweissZuWeissMitAlpha(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = Math.round((255 - lum) * (data[i + 3] / 255));
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

const manifest = [];
for (const [datei, slug, alt] of LOGOS) {
  const p = path.join(SRC, datei);
  let buf = await sharp(p).ensureAlpha().png().toBuffer();
  if (slug === "funny-frisch") buf = await schwarzweissZuWeissMitAlpha(buf);

  const trimmed = await sharp(buf).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
  const ar = trimmed.info.width / trimmed.info.height;

  let h = Math.round(Math.max(H_MIN, K / Math.sqrt(ar)));
  let w = Math.round(h * ar);
  if (w > W_MAX) { w = W_MAX; h = Math.round(W_MAX / ar); }

  const skaliert = await sharp(trimmed.data).resize(w, h, { fit: "fill" }).png().toBuffer();
  const ziel = path.join(OUT, `${slug}.png`);
  await sharp({ create: { width: w, height: CANVAS_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: skaliert, left: 0, top: Math.round((CANVAS_H - h) / 2) }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(ziel);

  const kb = (fs.statSync(ziel).size / 1024).toFixed(1);
  manifest.push({ slug, alt, w, canvasH: CANVAS_H, logoH: h, ar: ar.toFixed(2), kb });
  console.log(`${slug.padEnd(28)} ${String(w).padStart(3)}×${CANVAS_H}  Motiv ${String(w)}×${h}  ar ${ar.toFixed(2).padStart(5)}  ${kb.padStart(6)} kB`);
}

fs.writeFileSync(path.join(OUT, "_manifest.json"), JSON.stringify(manifest, null, 2));
const gesamt = manifest.reduce((s, m) => s + Number(m.kb), 0);
const breite = manifest.reduce((s, m) => s + m.w, 0);
console.log(`\n${manifest.length} Logos, ${gesamt.toFixed(0)} kB gesamt`);
console.log(`Leinwandbreite gesamt: ${breite} px → bei 84 px Höhe im Banner ${Math.round((breite * 84) / CANVAS_H)} px`);
