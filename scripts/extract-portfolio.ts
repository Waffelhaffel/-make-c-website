/**
 * Einmal-Skript: baut aus dem HTML-Export der alten Portfolio-Seite und den
 * Detailseiten auf make-c.de die Datengrundlage für `lib/content/cases.ts`.
 *
 *   npx tsx scripts/extract-portfolio.ts
 *
 * Schreibt `scripts/data/portfolio-cases.json` (Maschinenformat) und
 * `scripts/data/portfolio-cases.md` (Prüfliste zum Gegenlesen).
 *
 * Die Detailseiten werden im Scratchpad gecacht — ein zweiter Lauf zieht nichts
 * erneut. Das Skript verändert nichts außer den beiden Ausgabedateien.
 *
 * Liegt nur bei, um den Import von 08/2026 nachvollziehbar zu machen. Quelle der
 * Wahrheit ist seitdem `lib/content/cases.ts`, das von Hand gepflegt wird.
 * Die zwei Cases, die es damals nur im CMS gab (`merkur`, `aldi`), wurden einmalig
 * per GROQ exportiert und sind dort eingearbeitet — dieser Teil ist mit dem
 * Sanity-Ausbau entfallen.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const HTML_PATH =
  "/Users/paul/Downloads/Portfolio - make_c video content marketing GmbH.html";
const IMAGE_DIR =
  "/Users/paul/Downloads/Portfolio - make_c video content marketing GmbH_files";
const CACHE_DIR =
  "/private/tmp/claude-501/-Users-paul-Desktop-make-c-web-make-c-seite-v-2/3809f8a6-9ff5-4380-a793-6dac1511454c/scratchpad/portfolio-cache";
const OUT_DIR = resolve(process.cwd(), "scripts/data");

/**
 * Nur `merkur` liegt als echter, ausformulierter Case in Sanity vor (410 Zeichen
 * Text, 5 echte Credits, 3 Galeriebilder) — der wird nicht überschrieben.
 *
 * Die übrigen fünf Bestandscases (kpmg, zeitgeist, wundholding,
 * koeln-bonn-airport, aldi) tragen ~140 Zeichen Schablonentext („Für X haben wir
 * eine visuelle Storyline entwickelt …") und fünf Credits namens „Vorname
 * Nachname". Für vier davon liefert die alte Portfolio-Seite echten Text, echtes
 * Jahr und teils Video — die gewinnen. `aldi` hat dort keine Entsprechung und
 * bleibt als einziger Schablonen-Case bestehen (ohne die falschen Credits).
 */
const SKIP_SLUGS = new Set(["merkur"]);

/**
 * Slug beibehalten, wo anderer Code darauf zeigt: `lib/data.ts` (SELECTED_WORK)
 * und `lib/leistungen.ts` (caseSlugs) referenzieren die Sanity-Slugs.
 */
const SLUG_OVERRIDE: Record<string, string> = {
  "zieglers-zeitgeist": "zeitgeist",
  "thermengruppe-josef-wund": "wundholding",
};

/** Kategorie-Slug → Label, aus der Filterleiste der alten Seite. */
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

/**
 * Nachträge, wo die alte Seite keine Kategorie gesetzt hatte. `insurenxt` hat
 * ein leeres `data-project-cat`, das Projekt heißt aber „Messe Live-Stream".
 */
const CATEGORY_FALLBACK: Record<string, string[]> = {
  insurenxt: ["event-messe-kommunikation", "live-streaming"],
};

/** Rollenbegriffe, an denen eine „Rolle: Name"-Zeile als Credit erkannt wird. */
const CREDIT_ROLE_WORDS = [
  "regie",
  "konzept",
  "kamera",
  "dop",
  "schnitt",
  "postproduktion",
  "produktion",
  "redaktion",
  "projektkoordination",
  "beratung",
  "artist",
  "motion",
  "animation",
  "grafik",
  "ton",
  "musik",
  "sprecher",
  "licht",
  "drohne",
];

/** Absätze mit diesen Signaturen sind Seiten-Boilerplate, kein Projekttext. */
const BOILERPLATE = [
  "Mehr erfahren",
  "Sie sehen gerade einen Platzhalterinhalt",
  "Bitte beachten Sie, dass dabei Daten an Drittanbieter",
  "Datenschutzerklärung",
  "Um auf den eigentlichen Inhalt zuzugreifen",
  "Cookie",
];

type RawItem = {
  /** Slug auf make-c.de — nur zum Nachladen der Detailseite. */
  sourceSlug: string;
  /** Slug im neuen Code; weicht ab, wo ein Bestands-Slug erhalten bleibt. */
  slug: string;
  client: string;
  project: string;
  categorySlugs: string[];
  imageFile: string;
};

type DetailData = {
  summary: string;
  extraParagraphs: string[];
  video: string | null;
  year: string | null;
  credits: { role: string; name: string }[];
};

type ExportedCase = RawItem &
  DetailData & {
    source: "portfolio";
    categoryLabel: string;
  };

// ── HTML-Helfer ────────────────────────────────────────────────────────────

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&auml;/g, "ä")
    .replace(/&ouml;/g, "ö")
    .replace(/&uuml;/g, "ü")
    .replace(/&Auml;/g, "Ä")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/g, "ß")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&#821[67];/g, "'")
    .replace(/&#822[01];/g, '"')
    .replace(/&#\d+;/g, "");
}

function stripTags(s: string): string {
  return decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

// ── 1. Übersichtsseite parsen ──────────────────────────────────────────────

async function parseOverview(): Promise<RawItem[]> {
  const doc = await readFile(HTML_PATH, "utf8");
  const blocks = doc.match(
    /<div class="col elastic-portfolio-item[\s\S]*?<!--\/col-->/g
  );
  if (!blocks) throw new Error("Keine Portfolio-Kacheln in der HTML gefunden");

  return blocks.map((b) => {
    const cats = /data-project-cat="([^"]*)"/.exec(b)?.[1] ?? "";
    const img = /<img[^>]*src="([^"]+)"/.exec(b)?.[1] ?? "";
    const href = /<a href="([^"]+)"/.exec(b)?.[1] ?? "";
    const h3 = /<h3>([\s\S]*?)<\/h3>/.exec(b)?.[1] ?? "";
    const p = /<h3>[\s\S]*?<\/h3>[\s\S]*?<p>([\s\S]*?)<\/p>/.exec(b)?.[1] ?? "";
    const sourceSlug = href.replace(/\/$/, "").split("/").pop() ?? "";

    return {
      sourceSlug,
      slug: SLUG_OVERRIDE[sourceSlug] ?? sourceSlug,
      client: stripTags(h3),
      project: stripTags(p),
      categorySlugs: (() => {
        const parsed = cats.split(/\s+/).filter((c) => c in CATEGORY_LABELS);
        return parsed.length ? parsed : CATEGORY_FALLBACK[sourceSlug] ?? [];
      })(),
      imageFile: decodeURIComponent(img.split("/").pop() ?? ""),
    };
  });
}

// ── 2. Detailseite holen und auswerten ─────────────────────────────────────

async function fetchDetail(slug: string): Promise<string> {
  const cacheFile = resolve(CACHE_DIR, `${slug}.html`);
  if (existsSync(cacheFile)) return readFile(cacheFile, "utf8");

  const res = await fetch(`https://www.make-c.de/portfolio/${slug}/`, {
    headers: { "user-agent": "Mozilla/5.0 (make-c site migration)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} für ${slug}`);
  const html = await res.text();
  await writeFile(cacheFile, html, "utf8");
  await new Promise((r) => setTimeout(r, 400)); // freundlich zum eigenen Server
  return html;
}

function extractParagraphs(html: string, item: RawItem): string[] {
  const raw = html.match(/<p[^>]*>([\s\S]*?)<\/p>/g) ?? [];
  const header = `${item.client} ${item.project}`.toLowerCase();

  return raw
    .map(stripTags)
    .filter((t) => t.length >= 60)
    .filter((t) => !t.startsWith("…"))
    .filter((t) => !BOILERPLATE.some((b) => t.includes(b)))
    .filter((t) => t.toLowerCase() !== header)
    .filter((t, i, arr) => arr.indexOf(t) === i);
}

function extractVideo(html: string): string | null {
  const vimeo = /(?:player\.vimeo\.com\/video\/|vimeo\.com\/)(\d+)/.exec(html);
  if (vimeo) return `https://vimeo.com/${vimeo[1]}`;
  const yt = /youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/.exec(html);
  if (yt) return `https://www.youtube.com/watch?v=${yt[1]}`;
  const ytWatch = /youtube\.com\/watch\?v=([\w-]{6,})/.exec(html);
  if (ytWatch) return `https://www.youtube.com/watch?v=${ytWatch[1]}`;
  return null;
}

function extractYear(html: string): string | null {
  const m = /"datePublished"\s*:\s*"(\d{4})-/.exec(html);
  return m ? m[1] : null;
}

function extractCredits(html: string): { role: string; name: string }[] {
  // Tags zu Zeilenumbrüchen machen, dann zeilenweise nach „Rolle: Name" suchen.
  const lines = decode(html.replace(/<[^>]+>/g, "\n"))
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const out: { role: string; name: string }[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Entweder „Rolle: Name" in einer Zeile …
    let m = /^([A-ZÄÖÜ][\wÄÖÜäöüß,&\-. ]{2,60}):\s*(.+)$/.exec(line);
    let name = m?.[2]?.trim();
    // … oder „Rolle:" allein, Name in der nächsten Zeile (typisch für <strong>).
    if (m && !name) name = lines[i + 1]?.trim();
    if (!m) {
      const roleOnly = /^([A-ZÄÖÜ][\wÄÖÜäöüß,&\-. ]{2,60}):$/.exec(line);
      if (roleOnly) {
        m = roleOnly as RegExpExecArray;
        name = lines[i + 1]?.trim();
      }
    }
    if (!m || !name) continue;

    const role = m[1].trim();
    if (!CREDIT_ROLE_WORDS.some((w) => role.toLowerCase().includes(w))) continue;
    // Namen sind kurz und beginnen groß — Fließtext fliegt raus.
    if (!/^[A-ZÄÖÜ][A-Za-zÄÖÜäöüß.\-]+(?: [A-ZÄÖÜ][A-Za-zÄÖÜäöüß.\-]+){0,3}$/.test(name)) {
      continue;
    }
    const key = `${role}|${name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ role, name });
  }
  return out;
}

/**
 * Manche Seiten stellen dem Text eine Überschriftszeile voran („ZURICH
 * Versicherung Erklärfilmreihe …") — kurz und ohne Satzzeichen am Ende. Die
 * doppelt nur Kunde und Projekt und wird verworfen.
 */
function isHeadingLike(p: string): boolean {
  return p.length < 110 && !/[.!?…]\s*$/.test(p);
}

function buildSummary(paragraphs: string[]): string {
  const usable = paragraphs.filter((p, i) => !(i === 0 && isHeadingLike(p)));
  if (usable.length === 0) return "";
  let summary = usable[0];
  if (usable[1] && summary.length + usable[1].length <= 700) {
    summary += `\n\n${usable[1]}`;
  }
  return summary;
}

// ── Hauptlauf ──────────────────────────────────────────────────────────────

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  await mkdir(OUT_DIR, { recursive: true });

  const items = await parseOverview();
  console.log(`Übersicht: ${items.length} Projekte gefunden`);

  const missingImages = items.filter(
    (i) => !existsSync(resolve(IMAGE_DIR, i.imageFile))
  );
  if (missingImages.length) {
    throw new Error(
      `Fehlende Bilddateien: ${missingImages.map((i) => i.imageFile).join(", ")}`
    );
  }

  const imported: ExportedCase[] = [];
  // Übersprungene Einträge bleiben in der Ausgabe: der Generator braucht ihre
  // Position in der Reihenfolge und ihre Kategorien.
  const skipped: RawItem[] = [];
  for (const item of items) {
    if (SKIP_SLUGS.has(item.sourceSlug)) {
      console.log(`  – ${item.sourceSlug} (übersprungen, echter Case in Sanity)`);
      skipped.push(item);
      continue;
    }
    process.stdout.write(
      `  → ${item.slug}${item.slug !== item.sourceSlug ? ` (aus ${item.sourceSlug})` : ""} … `
    );
    let detail: DetailData = {
      summary: "",
      extraParagraphs: [],
      video: null,
      year: null,
      credits: [],
    };
    try {
      const html = await fetchDetail(item.sourceSlug);
      const paragraphs = extractParagraphs(html, item).filter(
        (p, i) => !(i === 0 && isHeadingLike(p))
      );
      detail = {
        summary: buildSummary(paragraphs),
        extraParagraphs: paragraphs.slice(2),
        video: extractVideo(html),
        year: extractYear(html),
        credits: extractCredits(html),
      };
      console.log(
        `${detail.summary ? `${detail.summary.length} Zeichen` : "KEIN TEXT"}` +
          `${detail.video ? " · Video" : ""}` +
          `${detail.year ? ` · ${detail.year}` : ""}` +
          `${detail.credits.length ? ` · ${detail.credits.length} Credits` : ""}`
      );
    } catch (err) {
      console.log(`FEHLER: ${(err as Error).message}`);
    }

    imported.push({
      ...item,
      ...detail,
      source: "portfolio",
      categoryLabel: item.categorySlugs
        .map((c) => CATEGORY_LABELS[c])
        .join(" · "),
    });
  }

  const payload = {
    generatedFrom: HTML_PATH,
    /** Reihenfolge der alten Portfolio-Seite, für den Generator. */
    order: items.map((i) => i.slug),
    imported,
    skipped,
  };
  await writeFile(
    resolve(OUT_DIR, "portfolio-cases.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  );

  await writeFile(resolve(OUT_DIR, "portfolio-cases.md"), renderReview(imported), "utf8");

  const noText = imported.filter((c) => !c.summary);
  const noYear = imported.filter((c) => !c.year);
  console.log(
    `\nFertig. ${imported.length} importierbar, ${noText.length} ohne Text, ` +
      `${noYear.length} ohne Jahr, ${imported.filter((c) => c.video).length} mit Video.`
  );
}

function renderReview(cases: ExportedCase[]): string {
  const lines: string[] = [
    "# Prüfliste: 54 Cases aus dem alten Portfolio",
    "",
    "Automatisch aus make-c.de extrahiert. Bitte Texte, Jahr und Credits gegenlesen —",
    "korrigiert wird später direkt in `lib/content/cases.ts`.",
    "",
    "| # | Kunde | Projekt | Jahr | Video | Credits | Text |",
    "|---|---|---|---|---|---|---|",
  ];
  cases.forEach((c, i) => {
    lines.push(
      `| ${i + 1} | ${c.client} | ${c.project} | ${c.year ?? "—"} | ` +
        `${c.video ? "ja" : "—"} | ${c.credits.length || "—"} | ` +
        `${c.summary ? `${c.summary.length} Z.` : "**fehlt**"} |`
    );
  });

  lines.push("", "---", "");
  cases.forEach((c, i) => {
    lines.push(`## ${i + 1}. ${c.client} — ${c.project}`);
    lines.push("");
    lines.push(`- Slug: \`${c.slug}\` · Bild: \`${c.imageFile}\``);
    lines.push(`- Kategorien: ${c.categoryLabel || "—"}`);
    lines.push(`- Jahr: ${c.year ?? "—"} · Video: ${c.video ?? "—"}`);
    if (c.credits.length) {
      lines.push(`- Credits: ${c.credits.map((x) => `${x.role}: ${x.name}`).join(" · ")}`);
    }
    lines.push("");
    lines.push(c.summary || "> ⚠️ Kein Text gefunden.");
    if (c.extraParagraphs.length) {
      lines.push("");
      lines.push("<details><summary>Weitere Absätze auf der alten Seite</summary>");
      lines.push("");
      c.extraParagraphs.forEach((p) => lines.push(`> ${p}`, ""));
      lines.push("</details>");
    }
    lines.push("");
  });
  return lines.join("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
