/**
 * „Do Not Track" des Besuchers.
 *
 * Das ist der technische Widerspruch aus Abschnitt 6 der Datenschutzerklärung
 * (`lib/content/legal.ts`) — und er gilt dort für **beide** Messungen. Deshalb
 * liegt die Prüfung hier und nicht in einer der beiden Einbindungen:
 *
 *   - `instrumentation-client.ts` (PostHog) prüft vor `init()`
 *   - `components/layout/WebAnalytics.tsx` (Vercel) rendert sonst gar nichts
 *
 * ⚠️ Wer eine dritte Messung einbaut, hängt sie hier mit ein. Eine Messung, die
 * das Signal ignoriert, macht den Satz „findet für Sie überhaupt keine Messung
 * statt" falsch — und zwar unsichtbar.
 *
 * ⚠️ PostHogs eigene Option `respect_dnt` reicht dafür nicht: in der
 * cookiefreien Betriebsart ist sie nachweislich wirkungslos (Begründung steht
 * an der Option in `instrumentation-client.ts`). `@vercel/analytics` kennt
 * überhaupt keine.
 *
 * Die vier abgefragten Signale sind dieselben, die posthog-js selbst prüft:
 * der klassische DNT-Header in seinen drei Schreibweisen und Global Privacy
 * Control, das Brave und DuckDuckGo von Haus aus senden.
 *
 * Läuft serverseitig immer auf `false` — es gibt dort keinen Browser, dessen
 * Einstellung man lesen könnte. Aufrufer müssen das berücksichtigen: aus einer
 * Komponente heraus nur im Effekt prüfen, sonst weicht das erste Client-Rendern
 * vom Server-HTML ab (Hydration-Mismatch).
 */
export function doNotTrack(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const nav = navigator as Navigator & {
    msDoNotTrack?: unknown;
    globalPrivacyControl?: unknown;
  };
  return [
    nav.doNotTrack,
    nav.msDoNotTrack,
    (window as Window & { doNotTrack?: unknown }).doNotTrack,
    nav.globalPrivacyControl,
  ].some((signal) => signal === true || signal === "1" || signal === "yes");
}
