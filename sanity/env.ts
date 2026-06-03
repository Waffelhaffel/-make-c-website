/**
 * Zentrale, fehlertolerante Sanity-Umgebungskonfiguration.
 *
 * Ziele:
 * - Wirft NIE beim Import -> verhindert Next.js Build-/Runtime-Crashes, wenn
 *   Env-Variablen fehlen (z. B. frisches Vercel-Projekt). Stattdessen rendert
 *   die App ihre eingebauten Fallback-Inhalte.
 * - Validiert die benötigten Variablen und liefert EINE klare, umsetzbare
 *   Meldung (statt kryptischer Einzelfehler).
 * - `assertSanityConfigured()` für Kontexte, die ohne Konfiguration nicht
 *   sinnvoll laufen können (z. B. CLI-/Seed-Skripte).
 *
 * Hinweis zu NEXT_PUBLIC_*: Diese Werte werden zur Build-Zeit eingebettet.
 * Sie müssen daher sowohl lokal (.env.local) als auch im Vercel-Projekt
 * (Settings → Environment Variables) für ALLE Environments gesetzt sein.
 */

const FALLBACK_API_VERSION = "2024-10-01";

// Syntaktisch gültige Platzhalter, damit der Sanity-Client / Image-Builder
// auch ohne echte Konfiguration konstruiert werden kann, ohne zu werfen.
// Bei fehlender Konfiguration überspringt die Fetch-Schicht Netzwerkaufrufe.
const PLACEHOLDER_PROJECT_ID = "missing-project-id";
const PLACEHOLDER_DATASET = "production";

function readEnv(key: string): string | undefined {
  const value = process.env[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

const rawProjectId = readEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const rawDataset = readEnv("NEXT_PUBLIC_SANITY_DATASET");

export const apiVersion = readEnv("NEXT_PUBLIC_SANITY_API_VERSION") ?? FALLBACK_API_VERSION;

/**
 * Server-only Read-Token (optional). Nur nötig bei privatem Dataset oder
 * Draft-Vorschau. Unterstützt den konventionellen Namen sowie das generische
 * SANITY_API_TOKEN, damit die Config projektübergreifend kompatibel ist.
 */
export const readToken =
  readEnv("SANITY_API_READ_TOKEN") ?? readEnv("SANITY_API_TOKEN");

/** Server-only Write-Token – ausschließlich für Seed-/Migrations-Skripte. */
export const writeToken =
  readEnv("SANITY_API_WRITE_TOKEN") ?? readEnv("SANITY_API_TOKEN");

/** Pflicht-Variablen, ohne die der Client nicht mit Sanity sprechen kann. */
const missing: string[] = [];
if (!rawProjectId) missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!rawDataset) missing.push("NEXT_PUBLIC_SANITY_DATASET");

export const missingSanityEnv: readonly string[] = missing;
export const isSanityConfigured = missing.length === 0;

export const projectId = rawProjectId ?? PLACEHOLDER_PROJECT_ID;
export const dataset = rawDataset ?? PLACEHOLDER_DATASET;

export const sanityConfigMessage = isSanityConfigured
  ? ""
  : [
      "Sanity ist nicht vollständig konfiguriert.",
      `Fehlende Variablen: ${missing.join(", ")}.`,
      "Setze sie in .env.local sowie im Vercel-Projekt (Settings → Environment",
      "Variables) für Production, Preview und Development. Siehe .env.example.",
    ].join(" ");

let warned = false;
/** Loggt die Konfigurationswarnung einmalig (für Build-/Server-Logs). */
export function warnIfUnconfigured(): void {
  if (!isSanityConfigured && !warned) {
    warned = true;
    console.warn(`[sanity/env] ⚠️  ${sanityConfigMessage}`);
  }
}

/** Wirft mit klarer Meldung – für Kontexte, die zwingend Konfiguration brauchen. */
export function assertSanityConfigured(): void {
  if (!isSanityConfigured) {
    throw new Error(`[sanity/env] ${sanityConfigMessage}`);
  }
}
