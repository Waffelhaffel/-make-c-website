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
  //
  // ── Alt-URLs der WordPress-Seite (Umzug 09/2026) ───────────────────────────
  // Unter derselben Domain lief bis zum Go-Live eine WordPress-Seite mit rund
  // 120 Adressen. Sie sind indexiert und werden weiter angeklickt — ohne die
  // Regeln unten antwortet jede davon mit 404. Die Karte ist rekonstruiert aus
  // der Yoast-Sitemap im Webarchiv, dem dortigen Crawl-Index und den
  // `sourceSlug`-Feldern in `scripts/data/portfolio-cases.json`.
  //
  // Alles hier mit `permanent: true` — Next liefert dafür 308, Google behandelt
  // das wie einen 301. Der `/leistungen`-Eintrag oben bleibt bewusst 307, seine
  // Begründung ist eine andere; nicht mitziehen.
  //
  // ⚠️ Die Reihenfolge ist Teil der Konfiguration: Next nimmt den ersten
  // Treffer. Umbenannte Slugs und Paginierung müssen vor den Auffang-Einträgen
  // (`:slug`, `:path*`) stehen, sonst schluckt der Auffang sie.
  //
  // ⚠️ Alt-Adressen enden auf einen Schrägstrich. Dass `source: "/imagefilm"`
  // auch `/imagefilm/` trifft, gilt trotz `skipTrailingSlashRedirect: true` —
  // der Schalter unterdrückt nur die Normalisierungs-Umleitung, nicht die
  // Normalisierung beim Abgleich. Nachgemessen (14.09.2026, Live-Domain): die
  // bestehende Regel `/leistungen` fängt `/leistungen/` in einem Sprung.
  //
  // `/impressum/` steht bewusst nicht in der Liste: alte und neue Adresse sind
  // identisch, die Schrägstrich-Form liefert direkt 200.
  async redirects() {
    return [
      { source: "/leistungen", destination: "/#service", permanent: false },

      // ── A · Seiten der alten Seite ──────────────────────────────────────
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/datenschutzerklaerung", destination: "/datenschutz", permanent: true },
      { source: "/beratung-und-strategie", destination: "/leistungen/video-strategie", permanent: true },
      { source: "/kreation-und-visual-storytelling", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/produktvideo", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/imagefilm", destination: "/leistungen/video-produktion", permanent: true },
      // ⚠️ Nicht auf `studiobau`. Die alte Seite meinte den Dreh *in* einem
      // Greenscreen-Studio („nutzt dafür doch einfach eines unserer
      // hochmodernen Greenscreen-Studios"), die neue Leistung meint den Bau
      // eines Studios *für den Kunden*. Ein falscher thematischer Treffer ist
      // schlechter als die allgemeinere Seite.
      { source: "/studio-produktion", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/erklaervideo-diy", destination: "/leistungen/video-motion-design", permanent: true },
      { source: "/event-messe-kommunikation", destination: "/leistungen/event-content", permanent: true },
      { source: "/live-streaming", destination: "/leistungen/event-content", permanent: true },
      // Die Leistung „Video AI" hat seit 01.09.2026 keine Unterseite mehr — die
      // Kachel trägt `externalUrl` (siehe `lib/content/services.ts`).
      // `/leistungen/artificial-intelligence` wäre eine 404.
      { source: "/kuenstliche-intelligenz", destination: "https://make-ai.de", permanent: true },
      { source: "/makec-ki-chatbot", destination: "https://make-ai.de", permanent: true },
      // Ohne Gegenstück im heutigen Angebot — auf die Leistungsübersicht.
      { source: "/socialmedia-influencer-marketing", destination: "/#service", permanent: true },
      { source: "/distribution-und-performance", destination: "/#service", permanent: true },
      { source: "/virtual-augmented-reality", destination: "/#service", permanent: true },
      // ⚠️ `/partner-fuer-agenturen` steht hier bewusst NICHT: seit 14.09.2026
      // gibt es unter genau dieser Adresse wieder eine Seite
      // (`app/partner-fuer-agenturen/page.tsx`). Die alte URL rankt in Google,
      // und eine Seite unter derselben Adresse erbt das direkt. `redirects()`
      // läuft vor dem Routing — eine Regel hier würde die eigene Seite
      // unerreichbar machen. Nicht wieder eintragen.
      // Keine Leistungsseite, sondern ein Easter Egg der alten Seite
      // („Congrats, you just found a little easter egg") mit Verweis auf die
      // Werke eines Fotografen. Deshalb auf die Startseite, nicht auf Motion Design.
      { source: "/vertical-in-motion", destination: "/", permanent: true },
      // Lokale Landingpages ohne Nachfolger.
      { source: "/nrw", destination: "/", permanent: true },
      { source: "/ruhrgebiet", destination: "/", permanent: true },

      // ── B · Referenzen ──────────────────────────────────────────────────
      // Die Cases haben keine eigenen URLs (Modal-Umstellung). `?case=<slug>`
      // öffnet stattdessen das passende Fenster auf /work — ausgewertet in
      // `components/work/useCaseModal.ts`. Ein Slug ohne Case fällt still auf
      // /work zurück; das betrifft die 2020/2021-Projekte aus dem Schnitt vom
      // 12.08.2026 und `ihk-koeln`.
      { source: "/portfolio/page/:n*", destination: "/work", permanent: true },
      // Drei Slugs heißen heute anders — von Hand vor den Auffang-Eintrag.
      { source: "/portfolio/zieglers-zeitgeist", destination: "/work?case=zeitgeist", permanent: true },
      { source: "/portfolio/thermengruppe-josef-wund", destination: "/work?case=wundholding", permanent: true },
      { source: "/portfolio/bih", destination: "/work?case=cwh-bih-sbv-wahl", permanent: true },
      // ⚠️ `koeln-bonn-airport` läuft bewusst hier durch auf /work, nicht auf
      // `flughafen-koeln-bonn`: gleicher Kunde, aber zwei verschiedene Werke
      // (alt „Content Timelapse" 2020, neu Imagefilm „Tag und Nacht" 2026).
      { source: "/portfolio/:slug", destination: "/work?case=:slug", permanent: true },
      // Ältere Portfolio-Generation der alten Seite, teils noch http-only. Das
      // Slug-Schema passt zu keinem heutigen Case, deshalb gesammelt auf /work.
      { source: "/portfolio-item/:path*", destination: "/work", permanent: true },

      // ── C · Taxonomie-Archive ───────────────────────────────────────────
      { source: "/project-type/beratung-strategie", destination: "/leistungen/video-strategie", permanent: true },
      { source: "/project-type/erklaervideo", destination: "/leistungen/video-motion-design", permanent: true },
      { source: "/project-type/event-messe-kommunikation", destination: "/leistungen/event-content", permanent: true },
      { source: "/project-type/live-streaming", destination: "/leistungen/event-content", permanent: true },
      { source: "/project-type/imagefilm", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/project-type/kreation-visual-storytelling", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/project-type/produktvideo", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/project-type/studio-produktion", destination: "/leistungen/video-produktion", permanent: true },
      { source: "/project-type/kuenstliche-intelligenz", destination: "https://make-ai.de", permanent: true },
      { source: "/project-type/partner-fuer-agenturen", destination: "/partner-fuer-agenturen", permanent: true },
      // Auffang für die restlichen Terms und ihre Paginierung (`…/page/2`):
      // employer-branding, distribution-performance,
      // social-media-influencer-marketing, virtual-augmented-reality.
      { source: "/project-type/:path*", destination: "/work", permanent: true },
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
