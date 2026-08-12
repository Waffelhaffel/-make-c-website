# make/c — Website

Firmenwebsite der Videoproduktions-Agentur **make/c** (Köln & Essen). Landingpage
als One-Pager, sechs Leistungs-Detailseiten, `/work` mit 63 Referenzen und den
Legal-Seiten. Dark-Premium-Look nach Figma, Sprache Deutsch.

**Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3.4 · framer-motion ·
Lenis · Vercel** (Auto-Deploy bei Push auf `main`).

## Los geht's

```bash
npm install
npm run dev          # http://localhost:3000 (Turbopack)
```

| Command | Zweck |
|---|---|
| `npm run dev` | Dev-Server mit Turbopack |
| `npm run dev:webpack` | Fallback, falls Turbopack zickt |
| `npm run build` | Production-Build (voll statisch, nutzt webpack) |
| `npm run start` | Production-Server, Voraussetzung für `npm run e2e` |
| `npx tsc --noEmit` | **Pflicht-Gate, siehe unten** |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run e2e` | 55 Playwright-Checks gegen den Production-Build → [`e2e/README.md`](e2e/README.md) |

⚠️ **Der Build ist kein Gate.** `next.config.ts` setzt `typescript.ignoreBuildErrors`
und `eslint.ignoreDuringBuilds` auf `true` — ein Typfehler bricht den Build **nicht**
ab und landet unbemerkt im Deploy. Deshalb vor jedem Commit `npx tsc --noEmit` und
`npm run lint` von Hand. Bewusst so, damit ein Lint-Fund kein Deploy blockiert; wer
es hart will, dreht die beiden Flags in `next.config.ts` um.

Nicht `npm run build` bei laufendem Dev-Server — beide schreiben nach `.next/`.
Sieht die Seite plötzlich ungestylt aus, ist das fast immer diese Kollision:
Dev stoppen, `rm -rf .next`, neu starten.

## Wo der Inhalt liegt

**Es gibt kein CMS.** Seit 08/2026 steht der gesamte Seiteninhalt im Repo, der Build
ist vollständig statisch — keine Route lädt zur Laufzeit etwas nach.

| Datei | Inhalt |
|---|---|
| `lib/content/landing.ts` | alle Sections der Startseite |
| `lib/content/cases.ts` | die 63 Referenzen (Array-Reihenfolge = Reihenfolge auf `/work`) |
| `lib/content/workCategories.ts` | die 14 Filter-Kategorien |
| `lib/content/services.ts` | die sechs Leistungs-Kacheln |
| `lib/content/site.ts`, `legal.ts` | Header/Footer, Impressum, Datenschutz |
| `lib/leistungen.ts` | der komplette Text der sechs Leistungsseiten |
| `lib/data.ts` | Navigation und das Selected-Work-Raster |
| `lib/seo.ts` | Basis-URL, NAP-Daten, `pageMetadata()`, JSON-LD |

Bilder liegen in `public/`, Case-Bilder als WebP unter `public/work/<slug>.webp`.

## Vor dem Go-Live

`NEXT_PUBLIC_SEO_INDEX=true` **und** `NEXT_PUBLIC_SITE_URL=https://<echte-domain>`
setzen und **neu deployen** — beide Werte werden zur Build-Zeit eingebettet. Ohne
sie ist die Seite `noindex` und `robots.txt` sagt `Disallow: /`. Details in
`.env.example`.

## Weiterlesen

- **[`CLAUDE.md`](CLAUDE.md)** — Projekt-Gedächtnis: Design-System, Scroll-Architektur,
  harte Regeln, Fallstricke, offene Punkte. Zuerst lesen.
- [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) — Deploy- und Env-Betriebswissen
- [`docs/HANDOVER.md`](docs/HANDOVER.md) — Chronik der letzten Umbauten
- [`docs/DESIGN_GUIDELINES.md`](docs/DESIGN_GUIDELINES.md) — Marken-Basics
  (verbindlich für Tokens ist `tailwind.config.ts`)
- ⚠️ `docs/PROJECT_OVERVIEW.md` ist stark veraltet und beschreibt entfernte
  Komponenten als existierend.
