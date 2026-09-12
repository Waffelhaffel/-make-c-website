"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { doNotTrack } from "@/lib/doNotTrack";

/**
 * Vercel Web Analytics — die zweite, gröbere Reichweitenmessung neben PostHog.
 *
 * ⚠️ Diese Komponente ist die Grundlage von **Abschnitt 6 der
 * Datenschutzerklärung**, Unterabschnitt „Vercel Web Analytics"
 * (`lib/content/legal.ts`). Wer sie entfernt oder anders konfiguriert, ändert
 * den Text mit.
 *
 * **Warum ein eigener Wrapper und nicht `<Analytics />` direkt im Layout:**
 *
 *  1. `@vercel/analytics` kennt **keine** Auswertung von „Do Not Track". Ohne
 *     diese Hülle liefe die Messung auch bei gesetztem Signal weiter — und der
 *     Satz „findet für Sie überhaupt keine Messung statt" in Abschnitt 6 wäre
 *     für die Hälfte der Messungen falsch. Hier wird bei gesetztem Signal
 *     nichts gerendert, das Skript also gar nicht erst geladen.
 *  2. Die Prüfung läuft im Effekt und nicht beim Rendern. `doNotTrack()` kann
 *     serverseitig nichts wissen und gibt dort `false` zurück; würde direkt
 *     beim Rendern geprüft, wiche das erste Client-Rendern vom Server-HTML ab.
 *     ⚠️ Kein Fall des `initial={{ opacity: 0 }}`-Fallstricks aus CLAUDE.md:
 *     die Komponente zeichnet nichts, sie hängt nur ein Skript ein. Der erste
 *     Seitenaufruf wird trotzdem gezählt — das Skript meldet ihn beim Laden.
 *
 * `beforeSend` schneidet zusätzlich alles ab, was hinter der Adresse steht.
 * Diese Seite hat keine Query-Parameter und kein Formular, das welche erzeugen
 * könnte; die Zeile ist die Absicherung für den Fall, dass später doch eine
 * Kampagnen-URL mit personenbezogenem Inhalt kursiert. Die Aufzählung in
 * Abschnitt 6 nennt deshalb bewusst keine Query-Parameter.
 */
/**
 * Rechner, auf denen das Skript gar nicht existieren kann.
 *
 * ⚠️ `/_vercel/insights/script.js` liefert die **Plattform** aus, nicht Next.
 * Unter `npm run start` gibt es den Pfad deshalb nicht, und die Seite meldete
 * bei jedem Aufruf einen 404 in der Konsole — was am 12.09.2026 prompt sechs
 * Checks der e2e-Suite umgeworfen hat (`3-konsole-landing`, `7-konsole-work`,
 * `8-konsole-sauber`, `konsole@390`, `konsole@1440`, `D-work-funktion`). Die
 * prüfen zu Recht auf eine fehlerfreie Konsole; eine Suite, deren Fehlschläge
 * man wegerklären muss, ist keine mehr.
 *
 * Auf der Live-Domain liefert derselbe Pfad 200 (nachgemessen) — dort ändert
 * diese Prüfung nichts. Nebenbei bleiben lokale Testläufe aus der Statistik,
 * dieselbe Linie wie bei PostHog, das am Dev-Server gar nicht erst startet.
 */
const NUR_LOKAL = /^(localhost|127\.0\.0\.1|\[::1\])$/;

export function WebAnalytics() {
  const [erlaubt, setErlaubt] = useState(false);

  useEffect(() => {
    setErlaubt(!doNotTrack() && !NUR_LOKAL.test(window.location.hostname));
  }, []);

  if (!erlaubt) return null;

  return (
    <Analytics
      beforeSend={(event) => ({ ...event, url: event.url.split("?")[0] })}
    />
  );
}
