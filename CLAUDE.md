# CLAUDE.md — make/c Website

Kompaktes Projekt-Gedächtnis für Claude-Sessions und Subagents. Stand: Juli 2026 (nach Figma-Redesign).

## Projekt

Firmenwebsite der Videoproduktions-Agentur **make/c** (Köln & Essen). Landingpage (One-Pager) + `/work`-Referenzen mit Case-Study-Detailseiten + Legal-Seiten. Dark-Premium-Look nach Figma-Design (`make_c Landingpage_PAUL`, fileKey `CtBJCsJbEpjFdqtm1Q4ODq`; Landing = Node `1:2`, Case-Study-Detail = Node `25:90`). Sprache: Deutsch.

## Tech-Stack & Struktur

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3.4 · framer-motion · Lenis · Sanity v5 (Studio embedded unter `/studio`) · Vercel (Auto-Deploy bei Push auf `main`).

- `app/page.tsx` — Landing: Header → Hero → Stats → LogoBanner → Showreel → Approach → ServiceAccordion → InsightGeneration → SelectedWork → AboutTeam → BudgetTool → QuestionsEntry → Contact → Footer
- `app/work/[slug]/page.tsx` + `components/work/CaseStudyPage.tsx` — Referenz-Detailseite
- `components/sections/` (Landing-Sections) · `components/layout/` (Header/Footer) · `components/ui/` (Swoosh, SquiggleUnderline, Magnetic, CustomCursor, SmoothScroll, …)
- `sanity/` — Schemas (`schemaTypes/`), Queries (`lib/queries.ts`), Fetcher mit Fallbacks (`lib/get*.ts`), Types (`types.ts`)
- `lib/data.ts` — Ausnahmen vom Sanity-Prinzip: `NAV_LINKS`, `HEADER_NAV_LINKS`, `SELECTED_WORK` (Landing-Grid), `FOOTER_CONTENT` (Fallback)

## Commands

```bash
npm run dev          # localhost:3000
npm run build        # Production-Build (ISR)
npx tsc --noEmit     # WICHTIG: next.config.ts ignoriert Typ- UND ESLint-Fehler im Build
                     # (ignoreBuildErrors + ignoreDuringBuilds) — daher tsc separat laufen lassen!
```

Nicht `npm run build` bei laufendem Dev-Server (beide nutzen `.next/` → Dev-Server vorher stoppen, danach neu starten).

## Sanity

- Project `ppeo9yox`, Dataset `production` (public), API `2024-10-01`. Env in `.env.local`, zentral gelesen in `sanity/env.ts`.
- **Code-first Schemas** in `sanity/schemaTypes/documents/`: `landingPage` (Singleton, alle Landing-Sections), `service` (5 Stück, Accordion), `caseStudy` (6 Stück, /work), `siteSettings` (Header/Footer/Kontakt), `legalPage`. Kein MCP-Schema-Deploy — Schema-Änderungen im Code, Studio zieht sie automatisch.
- **Query-Pattern** (immer so, nicht neu erfinden): GROQ-Query in `sanity/lib/queries.ts` → Fetcher in `sanity/lib/get*.ts` (`sanityFetch` + Tags) → Merge mit `*_FALLBACK`-Konstanten → typisierte Props an Section-Komponenten. Seiten: `export const revalidate = 60`.
- **Kritisch:** Live-Sanity-Inhalte **überschreiben** die Code-Fallbacks. Fallback im Code ändern reicht nicht — der sichtbare Text ändert sich erst nach Patch/Pflege des Sanity-Dokuments (Studio oder Sanity-MCP `patch_documents` + `publish_documents`).
- Neues Feld: Schema (`schemaTypes/`) + `sanity/types.ts` + Query in `queries.ts` + ggf. Fallback ergänzen — alle vier Stellen.

## Design-System

- **Farben:** `makec-dark #14140F` (BG), `makec-blue #2C2CC6` (Akzent/Blöcke), Weiß-Abstufungen (`white`, `/80`, `/70`, `/60`, `/40`) für Hierarchie.
- **Typo-Tokens** in `tailwind.config.ts` (aus Figma-Variablen, responsiv via clamp): `text-h2` (Gotham Bold 76/76, −0.05em), `text-h4` (40/40, −0.05em), `text-body-lg` (Book 24/36), `text-small` (Bold 18/26), `text-meta` (Book 14/20). Figma-letterSpacing „−5" = −5% = −0.05em.
- **Misch-Typo-Muster** (Markenzeichen, überall auf der Seite): erster Teil Gotham Bold (Italic bei Display-Headlines, uppercase) + zweiter Teil EB Garamond SemiBold Italic **größer** (1.076em bei Display, 1.2em bei H2-Zeilen, leading 0.85–1). Beispiele: SHOW/REEL, SELECTED/WORK, „We make video *that work.*"
- **Fonts:** EB Garamond via next/font/google (`--font-garamond`). **Gotham-Ersatz: Montserrat** (next/font/google, Variable Font inkl. Italic) liefert `--font-gotham` und ist Body-Font — echte Gotham später via `next/font/local` unter derselben Variable einhängen (nur `app/layout.tsx`, README in `app/fonts/`).
- **Wiederkehrende Elemente:** `Swoosh` (handgezeichneter Trenner, sitzt halb/halb auf Section-Kanten via translate-y-1/2), `SquiggleUnderline` (Unterstreichung), **`MixedHeadline`/`MixedText`** (`components/ui/MixedHeadline.tsx` — das Misch-Typo-Muster als Komponente, Varianten `h2`/`display`; nicht neu inline bauen), **`PillButton`** (`components/ui/PillButton.tsx`, Größen lg/md, Tones dark/blue), **`LazyVideo`** (Autoplay-Loops erst im Viewport laden), Headlines überlappen Medienkanten (negative margins). Token `text-display` = Display-Overlap-Headlines.
- **Section-Padding-Standard:** `py-16 md:py-32` für normale Sections; nur Overlap-Sections (Approach, Showreel, InsightGeneration, SelectedWork) weichen gezielt ab.
- Animation: framer-motion (Stagger, AnimatePresence height-auto für Aufklappen), `MotionSection`-Wrapper, `Magnetic`-Hover. `MotionConfig reducedMotion="user"` in `SiteEffects` + globale `prefers-reduced-motion`-CSS — neue Animationen müssen nichts extra tun, aber nichts einbauen, das das umgeht.

## Harte Regeln

1. **Kein hartcodierter Content.** Alle Texte/Bilder aus Sanity (bekannte Alt-Ausnahmen: `lib/data.ts`, LogoBanner-Dateiliste, **VideoCheck.tsx komplett** — FAQ, Quiz und Ergebnistexte bleiben auf User-Entscheidung vom 07/2026 bewusst hartcodiert, Komponente nicht auf Sanity migrieren). Bei neuen Inhalten immer prüfen, ob sie in Sanity liegen — sonst dort anlegen (Schema + Seed via MCP).
2. **Figma nur als Token-Quelle.** Niemals absolute Pixel-Positionen/Canvas-Koordinaten übernehmen (kein `position:absolute` mit top/left aus Figma). Layout mit Flex/Grid, rem/%, clamp().
3. **Bestehende Komponenten/Patterns wiederverwenden** statt neu bauen (Tokens, Misch-Typo-Muster, Swoosh, Pill-Buttons, Query-Pattern).
4. Nicht ungefragt committen/pushen.

## Fallstricke (schon passiert / leicht übersehen)

- Build ist grün trotz Typfehlern (`ignoreBuildErrors: true`) → immer `npx tsc --noEmit`.
- Text im Code geändert, Seite zeigt alten Text → Live-Sanity-Dokument überschreibt Fallback (siehe oben).
- Asset-Pfade in `public/` enthalten Leerzeichen/Umlaute (`Seite Logos Kopie/`, `icon /`, `Selected Work/`) — beim Referenzieren exakt übernehmen.
- `NEXT_PUBLIC_*`-Env wird statisch inlined; Doc-IDs ohne Punkt — Details in `docs/MAINTENANCE.md`.
- SEO: `robots: noindex` ist aktuell absichtlich aktiv (`app/layout.tsx`).
- Services-Detailseiten (`/services/[slug]`) wurden bewusst entfernt — Inhalte klappen inline im ServiceAccordion auf (Single-Open, X schließt, Escape, A11y-Fokus-Handling).

## Weitere Doku (`docs/`)

- `PROJECT_OVERVIEW.md` — ausführliche Architektur (englisch, weitgehend aktuell)
- `MAINTENANCE.md` — Deploy/Env/Sanity-Betriebswissen (aktuell)
- `SANITY_CMS.md` — ⚠️ teilweise veraltet (behauptet, nur Case Studies kämen aus Sanity — inzwischen sind auch Landing, Services, Site-Settings, Legal in Sanity)
- `DESIGN_GUIDELINES.md` — Marken-Basics; die verbindliche Token-Definition ist `tailwind.config.ts` (dieses Dokument kennt die neue Typo-Scale noch nicht)

## Offene Punkte (Stand 07.07.2026)

- Echte Gotham-Fontdateien fehlen weiterhin — Montserrat läuft als Ersatz unter `--font-gotham` (Austausch nur in `app/layout.tsx`).
- `siteSettings` im CMS: Instagram-/Vimeo-URLs fehlen (LinkedIn-URL bekannt: linkedin.com/company/make-c-video-content-marketing-gmbh), Copyright steht noch auf „© 2025" — Patch war durch Permission blockiert.
- Case Studies außer `merkur`: `headline`, `introHeading`, `credits`, Galerie-Bilder pflegen.
- Selected-Work-Grid der Landing (`lib/data.ts`) ist hardcoded — Kandidat für Migration auf `caseStudy`-Dokumente (`featured`-Flag existiert schon); Slugs müssen exakt zu Sanity passen, sonst 404.
- Vor Go-Live: `robots` noindex raus, eigene Metadata für /work + Legal, Default-OpenGraph, `sitemap.ts`, JSON-LD.
- Erledigt 07/2026: Landingpage-CMS auf Figma-Copy gepatcht, Schema-Manifest deployt (`npx sanity schema deploy` — bei Schema-Änderungen wiederholen), Bilder als WebP, Loop-Videos lazy, A11y-Paket (reduced-motion, Dialog-Semantik, Skip-Link).
