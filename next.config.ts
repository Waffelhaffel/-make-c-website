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
