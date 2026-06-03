import type { QueryParams } from "next-sanity";

import { isSanityConfigured, warnIfUnconfigured } from "../env";
import { client } from "./client";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

/**
 * Fehlertoleranter Sanity-Fetch.
 * - Ohne gültige Konfiguration: überspringt den Netzwerkaufruf und gibt `null`
 *   zurück, sodass die Aufrufer ihre Fallback-Inhalte rendern (kein Crash).
 * - Bei Netzwerk-/Query-Fehlern: loggt verständlich und gibt `null` zurück,
 *   statt die Seite zur Laufzeit abstürzen zu lassen.
 *
 * Aufrufer sollten den Rückgabetyp daher immer als `T | null` behandeln.
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    warnIfUnconfigured();
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
  } catch (error) {
    console.error(
      "[sanity] Query fehlgeschlagen – es werden Fallback-Inhalte genutzt.",
      {
        query: query.slice(0, 120),
        error: error instanceof Error ? error.message : String(error),
      }
    );
    return null;
  }
}
