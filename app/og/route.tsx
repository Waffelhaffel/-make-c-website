import { brandOgImage } from "@/lib/og";

/**
 * Markenbild für OpenGraph/Twitter — Default aller Seiten ohne eigenes Motiv.
 *
 * Bewusst eine normale Route und **kein** `app/opengraph-image.tsx`: Nexts
 * Dateikonvention gilt nur für ihr eigenes Segment. Sobald eine Unterseite ein
 * eigenes `openGraph` setzt (das tun bei uns alle über `pageMetadata`), wird
 * ein geerbtes Konventionsbild verworfen und `/opengraph-image` als Wert in
 * `openGraph.images` stillschweigend fallen gelassen. Über diesen Pfad zeigt
 * jede Seite ihr Bild explizit an — nachprüfbar im ausgelieferten HTML.
 */
export const dynamic = "force-static";

export function GET() {
  return brandOgImage();
}
