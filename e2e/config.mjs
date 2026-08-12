/**
 * Gemeinsame Konfiguration der E2E-Suiten.
 *
 * Playwright liegt bewusst NICHT in den devDependencies dieses Repos — die
 * Begründung steht in `e2e/README.md`. Der Pfad zum Paket und zum Browser sind
 * deshalb überschreibbar, damit die Suiten auch auf einem anderen Rechner oder
 * in CI laufen, ohne dass jemand die Dateien anfassen muss.
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

/** Installiert per `npm i --prefix /tmp/pw playwright --no-save`. */
const PW_PATH =
  process.env.PW_PATH ?? "/tmp/pw/node_modules/playwright/index.mjs";

export const { chromium } = await import(PW_PATH).catch(() => {
  console.error(
    `\nPlaywright nicht gefunden unter ${PW_PATH}.\n` +
      `  npm i --prefix /tmp/pw playwright --no-save\n` +
      `oder PW_PATH auf eine vorhandene Installation setzen.\n`
  );
  process.exit(2);
});

/** Muss auf einen **Production**-Server zeigen (`npm run build && npm run start`). */
export const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3000";

/**
 * System-Chrome statt des von Playwright mitgelieferten Browsers: der lokale
 * Browser-Cache ist älter als das Paket, `chromium.launch()` ohne
 * `executablePath` scheitert deshalb.
 */
export const CHROME =
  process.env.E2E_CHROME ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** Screenshots und andere Artefakte (gitignored). */
export const ARTIFACTS = process.env.E2E_ARTIFACTS ?? resolve(HERE, "artifacts");
mkdirSync(ARTIFACTS, { recursive: true });

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Inhaltszahlen, gegen die die Suiten prüfen. Sie standen bis 12.08.2026 in
 * jeder Datei einzeln — beim Schnitt der Referenzen auf „ab 2022" (63 → 30
 * Cases) waren dadurch fünf Stellen in zwei Dateien nachzuziehen. Jetzt nur
 * noch hier.
 *
 * Quelle: `lib/content/cases.ts` (Anzahl) und `lib/content/workCategories.ts`
 * (Chip-Beschriftung). `FILTER` muss ein Chip sein, der tatsächlich belegt ist —
 * `WorkGrid` blendet leere Kategorien aus.
 */
export const CONTENT = {
  /** Cases in `CASES` = Kacheln auf /work. */
  CASES: 30,
  /** Ein Filter-Chip und seine erwartete Trefferzahl. */
  FILTER: { label: "Video Event Content", treffer: 9 },
  /** Kacheln in `SELECTED_WORK` (`lib/data.ts`). */
  SELECTED_WORK: 6,
};
