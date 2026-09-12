import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const require = createRequire(import.meta.url);
const reactPath = path.dirname(require.resolve("react/package.json"));
const reactDomPath = path.dirname(require.resolve("react-dom/package.json"));
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Kein `images.remotePatterns` mehr: seit dem CMS-Ausbau (08/2026) liegen alle
  // Bilder in `public/`, die Seite lädt von keinem fremden Host. Erst wieder
  // eintragen, wenn tatsächlich eine externe Bildquelle dazukommt — jeder
  // Eintrag hier ist eine Erlaubnis für Nexts Optimizer-Proxy.
  // Die Übersichtsseite /leistungen ist 08/2026 entfallen — die sechs
  // Leistungen stehen auf der Startseite. Der Pfad leitet dorthin weiter,
  // damit Bookmarks und alte Links nicht auf einer 404 landen. Die
  // Detailseiten /leistungen/<slug> bleiben unberührt: `source` matcht exakt.
  //
  // Bewusst `permanent: false` (307): die Seite war nie indexiert
  // (NEXT_PUBLIC_SEO_INDEX ist bis zum Go-Live aus), es gibt also keine
  // Ranking-Signale zu übertragen — und ein 308 brennt sich in den
  // Browser-Cache ein, was ein späteres Zurückdrehen unnötig zäh macht.
  async redirects() {
    return [
      { source: "/leistungen", destination: "/#service", permanent: false },
    ];
  },
  // ── Reverse Proxy für die Reichweitenmessung ───────────────────────────────
  // Der Browser spricht ausschließlich die eigene Domain an; die Weiterleitung
  // an PostHog EU passiert auf dem Server. Zwei Gründe, warum das so und nicht
  // direkt über `eu.i.posthog.com` läuft:
  //
  //  1. Datenschutz. Beim Seitenaufruf baut der Browser keine Verbindung zu
  //     einem fremden Host auf, die IP-Adresse des Besuchers geht nicht
  //     unmittelbar an einen Dritten. Das ist die Zusage aus Abschnitt 5 und 6
  //     der Datenschutzerklärung (`lib/content/legal.ts`).
  //  2. Vollständigkeit. Inhaltsblocker filtern `*.posthog.com` — ohne Proxy
  //     fehlte ein guter Teil der Besucher in der Statistik.
  //
  // ⚠️ Die Reihenfolge ist Teil der Konfiguration: `static` und `array` liegen
  // bei PostHog auf einem **anderen** Host (`eu-assets`) als die Ereignisse.
  // Stünde der Auffang-Eintrag oben, gingen auch die Skriptanfragen dorthin.
  // `PROXY_PATH` muss zu `api_host` in `instrumentation-client.ts` passen.
  async rewrites() {
    const PROXY_PATH = "/mc-relay";
    return [
      {
        source: `${PROXY_PATH}/static/:path*`,
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: `${PROXY_PATH}/array/:path*`,
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: `${PROXY_PATH}/:path*`,
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // ⚠️ Gehört zum Proxy oben und ist dort Pflicht: PostHogs Endpunkte enden auf
  // einen Schrägstrich (`/e/`, `/i/v0/e/`). Nexts automatische Umleitung von
  // `/pfad/` auf `/pfad` liefe vor dem Rewrite und würde jedes Ereignis über
  // eine zusätzliche 308-Umleitung schicken — bei `sendBeacon` beim Verlassen
  // der Seite ein verlorenes Ereignis.
  //
  // Die Kehrseite: Next leitet damit auch die eigenen Seiten nicht mehr von
  // `/work/` auf `/work` um. Nachgemessen am Production-Build (12.09.2026):
  // beide Formen liefern 200 mit identischem HTML, es entsteht also keine tote
  // URL. Wer hier etwas ändert, prüft genau das nach.
  skipTrailingSlashRedirect: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        react: reactPath,
        "react-dom": reactDomPath,
      };
    }
    return config;
  },
};

export default nextConfig;
