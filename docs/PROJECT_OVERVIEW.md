# PROJECT_OVERVIEW — make/c Website

> Comprehensive technical documentation generated from a full codebase analysis.
> Audience: developers and AI agents picking up this project.
> Language note: the project content is German; this document is in English, but quotes German field names/content verbatim.

---

## 1. PROJECT SUMMARY

- **Project name & purpose:** **make/c Website** — the official corporate site of **make/c**, a video-production agency (Köln & Essen, founded 2015). It is a single-page marketing site (one-pager) plus a Sanity-backed "Work" case-study section and legal pages.
- **Live URL:** Hosted on **Vercel** (deploy via `vercel deploy`). No production domain is hardcoded in the repo. Search engine indexing is currently **disabled** (`robots: index:false` in `app/layout.tsx`).
- **Tech stack:** Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 3.4 · Framer Motion · Lenis smooth-scroll · deployed on Vercel.
- **Sanity CMS:** **Yes.** Sanity **v5.21** (`sanity`, `next-sanity` ^11.6). Studio is **embedded** in the Next.js app at route `/studio` (`app/studio/[[...tool]]/`). Studio config: `sanity.config.ts`.

---

## 2. TECH STACK DETAILS

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js (App Router) | ^15.5.15 | RSC + Client Components. `app/` directory. |
| UI library | React / React DOM | ^19.2.5 | React 19. Aliased in `next.config.ts` webpack to dedupe client React. |
| Language | TypeScript | ^5 | `ignoreBuildErrors: true` in `next.config.ts` (⚠️ type errors do NOT fail builds). |
| Styling | Tailwind CSS | ^3.4.1 | Config `tailwind.config.ts`. Custom colors `makec-dark`, `makec-blue`. PostCSS + autoprefixer. |
| Styling (aux) | styled-components | ^6.4.0 | Dependency present; used by the embedded Sanity Studio runtime. |
| Animation | framer-motion | ^11.15 | Used across almost all section components. |
| Smooth scroll | lenis | ^1.3.16 | Wired via `components/ui/SmoothScroll.tsx`. |
| Icons | lucide-react | ^0.468.0 | Icon set used site-wide. |
| CMS | Sanity | ^5.21.0 | Embedded studio + `@sanity/vision`, `@sanity/image-url`. |
| CMS bridge | next-sanity | ^11.6.13 | `createClient`, `groq`. |
| Portable Text | @portabletext/react | ^6.2.0 | Renders legal-page rich text (`components/ui/PortableTextRenderer.tsx`). |
| Deployment | Vercel | — | ISR via `revalidate = 60` on pages. ESLint ignored during builds. |
| Tooling | tsx, dotenv | ^4.21 / ^17.4 | Run seed/migration scripts in `scripts/`. |

---

## 3. PROJECT STRUCTURE

```
/
├── app/                  → Next.js App Router. Routes, root layout, global CSS, embedded Studio.
│   ├── page.tsx            → Home one-pager (RSC; fetches landingPage + services).
│   ├── layout.tsx          → Root layout: fonts (Inter, EB Garamond), metadata, SiteEffects wrapper.
│   ├── globals.css         → Tailwind layers + global styles.
│   ├── work/               → /work list + /work/[slug] case-study detail (Sanity).
│   ├── impressum/, datenschutz/ → Legal pages (Sanity legalPage).
│   └── studio/[[...tool]]/  → Embedded Sanity Studio (catch-all route).
├── components/
│   ├── layout/             → Header (server) + HeaderClient, Footer (server), SiteEffects.
│   ├── sections/           → Home-page sections (Hero, Stats, Showreel, Approach, ServiceAccordion, …).
│   ├── work/               → WorkGrid (list) + CaseStudyPage (detail renderer).
│   └── ui/                 → Reusable primitives (CustomCursor, Grain, Magnetic, MotionSection, …).
├── sanity/
│   ├── env.ts              → Fault-tolerant env config (never throws on import).
│   ├── lib/                → client, fetch wrapper, image url builder, typed getters (getLandingPage…).
│   ├── schemaTypes/        → documents/ + objects/ schema definitions + index.ts registry.
│   └── structure.ts        → Studio desk structure (singletons + lists).
├── lib/data.ts           → ⚠️ HARDCODED data: NAV_LINKS, SELECTED_WORK, FOOTER_CONTENT (fallbacks).
├── scripts/              → tsx seed/migration scripts (seed-phase-a/b/c, seed-case-studies, fix-document-ids).
├── public/              → Static assets: videos (.mp4), images, client logos, icons.
├── docs/                → DESIGN_GUIDELINES.md, MAINTENANCE.md, SANITY_CMS.md, this file.
├── sanity.config.ts      → Studio config (schema, structure, singleton lock).
├── sanity.cli.ts         → Sanity CLI config.
├── next.config.ts        → Next config (image domains, React alias, ESLint/TS ignore).
└── tailwind.config.ts    → Tailwind theme.
```

---

## 4. PAGE INVENTORY

### `/` — Home (one-pager)
- **File:** `app/page.tsx`
- **Purpose:** Full marketing one-pager. Renders all sections in order: Hero → Stats → Showreel → Approach → ServiceAccordion → InsightGeneration → SelectedWork → AboutTeam → BudgetTool → QuestionsEntry → Contact (+ FloatingContact, Footer).
- **Rendering:** Server Component, `export const revalidate = 60` (ISR). Fetches `getLandingPage()` + `getServices()` in parallel.
- **Sanity-connected:** **Partially.** `landingPage` (singleton) feeds Hero/Stats/Showreel/Approach/Insight/About/Questions/Contact/FloatingContact. `service` feeds ServiceAccordion. **`SelectedWork` and `BudgetTool` are NOT Sanity-connected** (see §8).
- **Status:** ✅ Done (functional, with hardcoded gaps).

### `/work` — Case-study list
- **File:** `app/work/page.tsx`
- **Purpose:** Grid of featured case studies. Renders `components/work/WorkGrid.tsx`.
- **Rendering:** Server Component, `revalidate = 60`.
- **Sanity-connected:** **Yes** → `caseStudy` via `ALL_CASE_STUDIES_QUERY` (filters `featured == true || !defined(featured)`, ordered by `order`).
- **Status:** ✅ Done.

### `/work/[slug]` — Case-study detail
- **File:** `app/work/[slug]/page.tsx`
- **Purpose:** Single case study. Renders `components/work/CaseStudyPage.tsx`.
- **Rendering:** SSG via `generateStaticParams()` (from `CASE_STUDY_SLUGS_QUERY`) + `revalidate = 60`. `generateMetadata` builds SEO/OG from `seo`/`heroImage`. `notFound()` when missing.
- **Sanity-connected:** **Yes** → `caseStudy` via `CASE_STUDY_BY_SLUG_QUERY`.
- **Status:** ✅ Done.

### `/impressum` — Imprint
- **File:** `app/impressum/page.tsx`
- **Purpose:** Legal imprint, rendered from Portable Text.
- **Sanity-connected:** **Yes** → `legalPage` (slug `impressum`) via `LEGAL_PAGE_BY_SLUG_QUERY`. `notFound()` if no document.
- **Status:** ✅ Done. ⚠️ Hard dependency on a Sanity document existing — there is **no local fallback**; the page 404s if the document is missing.

### `/datenschutz` — Privacy policy
- **File:** `app/datenschutz/page.tsx`
- **Purpose:** Privacy policy from Portable Text.
- **Sanity-connected:** **Yes** → `legalPage` (slug `datenschutz`). Same 404-if-missing behavior as `/impressum`.
- **Status:** ✅ Done.

### `/studio` — Sanity Studio (internal)
- **File:** `app/studio/[[...tool]]/page.tsx` + `Studio.tsx` + `app/studio/layout.tsx`
- **Purpose:** Embedded Sanity content editor. Client-side only.
- **Sanity-connected:** It **is** the CMS. Config in `sanity.config.ts`, desk in `sanity/structure.ts`.
- **Status:** ✅ Done. Excluded from global `SiteEffects` (no custom cursor / grain inside studio).

> ⚠️ **Removed route — discrepancy:** A `/services/[slug]` detail page existed and is **deleted** (git status: `D app/services/[slug]/page.tsx`, plus deleted `components/sections/VideoProductionPage.tsx`). The `service` schema still references this URL (slug help text "Wird Teil der URL: /services/<slug>", `headline`/`detailText`/`referenceVideoUrl` fields were meant for the detail page, and `externalLink` says "statt /services/<slug>"). Today all service detail content renders **inline inside the accordion** (`ServiceAccordion.tsx`). See §8.

---

## 5. COMPONENT INVENTORY

### Layout
- **Header** — `components/layout/Header.tsx` (server) → fetches `getSiteSettings()`, renders **HeaderClient**. Used on every page. Editable via Sanity: socials + email (from `siteSettings`).
- **HeaderClient** — `components/layout/HeaderClient.tsx` (client). Desktop nav + mobile overlay. ⚠️ **Nav items hardcoded** via `NAV_LINKS` (`lib/data.ts`); `LEGAL_LINKS` hardcoded inline. Socials/email/copyright come from `settings` (Sanity).
- **Footer** — `components/layout/Footer.tsx` (server) → `getSiteSettings()`. Editable via Sanity: `footerHeadline`, `email`, `locations`, `socials`, `copyright`. Impressum/Datenschutz links hardcoded.
- **SiteEffects** — `components/layout/SiteEffects.tsx`. Wraps children with SmoothScroll + Grain + CustomCursor; disabled on `/studio`.

### Home sections (`components/sections/`)
| Component | Used on | Editable via Sanity | Notes |
|-----------|---------|---------------------|-------|
| `Hero` | Home | Partial (`landingPage.hero` text) | ⚠️ Background video `/Header_video.mp4` is **hardcoded**. |
| `Stats` | Home | Yes (`landingPage.stats`) | Icons mapped from `users/play/mapPin` keys. ⚠️ Client-logo grid is **not rendered** (logos exist in `public/Seite Logos Kopie/` but unused). |
| `Showreel` | Home | Yes (`landingPage.showreel`) | Supports Vimeo/YouTube/MP4. Falls back to `/Makec_Reel 1.mp4` + `/thumbnail_Showreel.png`. |
| `Approach` | Home | Yes (`landingPage.approach`) | Paragraph array + closing line. |
| `ServiceAccordion` | Home | Yes (`service` docs) | ⚠️ Loop videos hardcoded via `SERVICE_LOOP_VIDEOS` keyed by slug. Section title "UNSERE LEISTUNGEN" hardcoded. **Modified** in current working tree. |
| `InsightGeneration` | Home | Yes (`landingPage.insight`) | Headline + body. |
| `SelectedWork` | Home | ⚠️ **NO** | Uses hardcoded `SELECTED_WORK` (`lib/data.ts`) + local images. **Not** linked to `caseStudy`. See §8. |
| `AboutTeam` | Home | Yes (`landingPage.about`) | Power-words → `PowerCounter`. Team image falls back to `/Team Bild1.JPG`. |
| `BudgetTool` | Home | ⚠️ **NO** | FAQ copy, slider images, all text hardcoded. Anchor `#budget-tool` is the "FAQ" nav target. |
| `QuestionsEntry` | Home | Yes (`landingPage.questions`) | Headline + link text. |
| `Contact` | Home | Yes (`landingPage.contact`) | Contact card + location cards. Image fallback `/Kontakt_Guy.png`. |

### Work (`components/work/`)
- **WorkGrid** — `components/work/WorkGrid.tsx`. Renders `caseStudy` summaries on `/work`.
- **CaseStudyPage** — `components/work/CaseStudyPage.tsx`. Renders a full `caseStudy` on `/work/[slug]`.

### UI primitives (`components/ui/`)
- **FloatingContact** — scroll-triggered side CTA → `landingPage.contact` (`floatingCtaEnabled`, `ctaLabel`, image). Editable via Sanity.
- **CustomCursor**, **Grain**, **Magnetic**, **MotionSection**, **PowerCounter**, **SmoothScroll**, **PortableTextRenderer** — presentational/utility; not Sanity-editable.

---

## 6. SANITY CMS SCHEMA OVERVIEW

Schema registry: `sanity/schemaTypes/index.ts`. **Documents** (5) + **objects** (12).

### Documents

#### `landingPage` (singleton) — "Startseite"
- **File:** `sanity/schemaTypes/documents/landingPage.ts` · singleton id `landingPage` (locked in `sanity.config.ts` + `structure.ts`).
- **Fields:** `hero` {headlineLine1-3, subheadline, cornerLeft/Center/Right}, `stats` {kicker, headlineLine1/2, items[]→`statItem`}, `showreel` {kicker, headlinePart1/2, thumbnail(image), videoUrl}, `approach` {headlineLine1/2, kicker, paragraphs[], closing}, `insight` {headlineLine1/2, kicker, body}, `about` {quoteLine1/2, powerWords[]→`powerWord`, teamTitlePart1/2, teamImage, kicker, paragraphs[]}, `questions` {headlineLine1/2, linkText}, `contact` {kicker, contactImage, contactName, contactRole, phone, email, floatingCtaEnabled, ctaLabel, locations[]→`locationCard`}.
- **Connected to:** Home page sections (§5). Query `LANDING_PAGE_QUERY` → `getLandingPage()`.
- **Editable:** all of the above (organized into field groups in Studio).
- **Missing/TODO:** No field for Hero background video, client logos, BudgetTool FAQ, or SelectedWork items.

#### `service` — "Dienstleistung"
- **File:** `documents/service.ts` · ordered list (field `order`).
- **Fields:** `title` (UPPERCASE, req), `displayTitle`, `slug` (req; custom German slugify), `headline`, `description` (req), `detailText`, `features[]` {title, description}, `processSteps[]` {title, description}, `keywords` (string), `heroImage`, `referenceVideoUrl`, `externalLink`, `buttonText`, `order`.
- **Connected to:** `ServiceAccordion` via `ALL_SERVICES_QUERY` → `getServices()`.
- **Editable:** all content/media/link fields.
- **Missing/TODO:** `slug` / `headline` / `detailText` / `referenceVideoUrl` were designed for the now-deleted `/services/[slug]` page (§4, §8). Loop video is **not** a field — it is mapped from slug in `SERVICE_LOOP_VIDEOS` (`getServices.ts`).

#### `caseStudy` — "Case Study"
- **File:** `documents/caseStudy.ts` · ordered (`order`), `featured` boolean.
- **Fields:** `title` (internal, req), `slug` (req), `order`, `featured`, `kicker`, `project` (req), `headline`→`headline` obj (req), `intro`, `summary` (req), `services[]` (tags), `projectMeta`→`projectMeta` (req), `heroImage` (req), `mainMedia`→`mainMedia` (req), `solution`→`solutionSection` (req), `gallery[]`→`galleryItem`, `cta`→`ctaSection` (req), `thumbnailImage`, `seo`→`seo`.
- **Connected to:** `/work` (WorkGrid) and `/work/[slug]` (CaseStudyPage).
- **Editable:** all.

#### `siteSettings` (singleton) — "Site-Einstellungen"
- **File:** `documents/siteSettings.ts` · singleton id `siteSettings`.
- **Fields:** `email` (req, regex), `phone`, `locations[]`→`location` (req, min 1), `socials[]`→`socialLink`, `footerHeadline` {lineOne, lineTwo}, `copyright`.
- **Connected to:** Header/HeaderClient + Footer via `getSiteSettings()`.
- **Editable:** all.

#### `legalPage` (singleton-style) — "Rechtsseite"
- **File:** `documents/legalPage.ts` · two instances, ids `legalPage-impressum` & `legalPage-datenschutz` (created via desk structure). Slug is `readOnly`, validated to `impressum`|`datenschutz`.
- **Fields:** `slug` (readOnly), `title` (req), `body` (Portable Text: H2/H3/blockquote, bullet/number lists, strong/em, links) (req), `effectiveDate`.
- **Connected to:** `/impressum`, `/datenschutz`.
- **Editable:** title, body, effectiveDate.

### Objects (`sanity/schemaTypes/objects/`)
`headline`, `projectMeta`, `mainMedia`, `solutionSection`, `ctaSection`, `galleryItem` — used by `caseStudy`. `seo` — used by `caseStudy`. `statItem`, `powerWord`, `locationCard` — used by `landingPage`. `location`, `socialLink` — used by `siteSettings`. All objects are wired to at least one document (none orphaned).

### ⚠️ NOT YET CONNECTED TO SANITY (page/component exists, no schema link)
- **`SelectedWork` section** (home) — hardcoded; should likely reuse `caseStudy`.
- **`BudgetTool` section** (home, incl. FAQ) — fully hardcoded; no schema.
- **Hero background video** — hardcoded file; no schema field.
- **Client logo wall** — assets present, no rendering and no schema.

---

## 7. DATA FLOW

- **Client config:** `sanity/lib/client.ts` → `createClient` from `next-sanity`. `useCdn: !readToken` (CDN when no token; live when a server read-token is present). `perspective: "published"`. Project/dataset/apiVersion/token come from `sanity/env.ts`.
- **Env handling:** `sanity/env.ts` is **fault-tolerant by design** — it never throws on import (uses placeholder project id/dataset if env missing) so builds never crash; `isSanityConfigured` gates real network calls. `NEXT_PUBLIC_*` are read as **static literals** (required so they get inlined into the client bundle / embedded studio). Required: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. Optional: `NEXT_PUBLIC_SANITY_API_VERSION` (default `2024-10-01`), `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `SANITY_API_TOKEN`.
- **GROQ queries:** **Centralized** in `sanity/lib/queries.ts` (one shared `IMAGE_PROJECTION`). Typed getter functions in `sanity/lib/` (`getLandingPage`, `getServices`, `getSiteSettings`) wrap queries and **merge Sanity data over local fallbacks**.
- **Fetch wrapper:** `sanity/lib/fetch.ts` → `sanityFetch<T>()`. Returns `null` (never throws) when unconfigured or on error, logging a clear message — callers always treat the result as `T | null` and render fallback content. Passes Next.js `{ next: { revalidate, tags } }`.
- **Rendering strategy:**
  - Home `/`, `/work`, legal pages: **ISR** (`revalidate = 60`), server components.
  - `/work/[slug]`: **SSG** via `generateStaticParams()` + ISR revalidation.
  - `/studio`: **client-side** only.
- **Images:** `sanity/lib/image.ts` (`urlFor`, `hasImageAsset`). `cdn.sanity.io` whitelisted in `next.config.ts`. Components fall back to local `/public` assets when no Sanity image set.
- **Cache tags:** Fetches pass `tags` (e.g. `["caseStudy", "caseStudy:<slug>"]`) but ⚠️ **there is no `/api/revalidate` webhook route** — so tag-based on-demand revalidation is not wired; only the 60s time-based ISR is active.
- **Preview / live preview:** **None.** No draft mode, no `previewDrafts`/`stega` perspective, no preview route. Editors see changes after publish + ISR window.

---

## 8. KNOWN ISSUES & PLANNED CHANGES

- [ ] **Resolve the deleted `/services/[slug]` route vs. `service` schema mismatch.** Either rebuild a service detail page or prune the now-unused detail-oriented fields (`headline`, `detailText`, `referenceVideoUrl`) and the slug help text that promises `/services/<slug>`. (git: `D app/services/[slug]/page.tsx`, `D components/sections/VideoProductionPage.tsx`.)
- [ ] **Connect the home `SelectedWork` grid to Sanity.** Currently `SELECTED_WORK` is `⚠️ HARDCODED` in `lib/data.ts` (6 projects + local images) and must be kept in manual sync with `caseStudy` slugs. Recommended: query featured `caseStudy` docs (reuse `ALL_CASE_STUDIES_QUERY`).
- [ ] **Move `BudgetTool` content to Sanity** — `⚠️ HARDCODED` `FAQ_DATA`, slider images, headline and disclaimer copy in `components/sections/BudgetTool.tsx`. No schema exists for it.
- [ ] **Make the Hero background video editable** — `⚠️ HARDCODED` `/Header_video.mp4` in `Hero.tsx`. Add a field to `landingPage.hero`.
- [ ] **Decide on the client-logo wall.** 18 brand logos exist in `public/Seite Logos Kopie/` but are `⚠️ NOT rendered` anywhere (the previous overview claimed they were in Stats; the current `Stats.tsx` does not render them). Either render + model them in Sanity or remove the assets.
- [ ] **Hardcoded navigation** — `NAV_LINKS` (`lib/data.ts`) and `LEGAL_LINKS` (`HeaderClient.tsx`) are `⚠️ HARDCODED`. Consider moving to `siteSettings`.
- [ ] **Add an on-demand revalidation webhook** (`/api/revalidate`) so the cache `tags` already passed in fetches actually invalidate on publish; today only 60s ISR applies.
- [ ] **Re-enable indexing before launch** — `app/layout.tsx` sets `robots: { index:false, follow:false }`. Intentional pre-launch, but a launch blocker to track.
- [ ] **Build hardening** — `next.config.ts` has `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`. Bugs can ship silently; consider tightening before launch.
- [ ] **Legal pages have no fallback** — `/impressum` & `/datenschutz` 404 if the Sanity document is absent (unlike every other surface, which has local fallbacks). Ensure both `legalPage` docs are seeded in every dataset/environment.
- [ ] **Inconsistent dark background tokens** — pages mix `bg-makec-dark` and `bg-black` (e.g. `/work`, legal pages use `bg-black`; home uses `bg-makec-dark`). Confirm intended.

---

## 9. AGENT QUICK-START GUIDE

- **To add a new page:** create `app/<route>/page.tsx`. If it shows CMS data, add a GROQ query to `sanity/lib/queries.ts`, fetch through `sanityFetch()` (handle the `null` case with a fallback), and set `export const revalidate = 60`. Wrap with `<Header />` / `<Footer />` for consistency.
- **To make text editable via Sanity:** (1) add the field to the relevant schema in `sanity/schemaTypes/` (document or object), (2) add it to the matching projection in `sanity/lib/queries.ts`, (3) add it to the TypeScript type in `sanity/types.ts`, (4) add a fallback in the getter (`sanity/lib/getLandingPage.ts` / `getServices.ts` / `getSiteSettings.ts`), (5) consume it in the component.
- **To add a new component:** put presentational pieces in `components/ui/`, page sections in `components/sections/`. Use `MotionSection` for scroll-in sections and Tailwind tokens `bg-makec-dark` / `bg-makec-blue`.
- **Sanity Studio runs at:** `/studio` (embedded). Config `sanity.config.ts`, desk `sanity/structure.ts`. Singletons (`landingPage`, `siteSettings`, `legalPage`) are locked — no create/delete.
- **Key files to always check before changes:** `sanity/lib/queries.ts`, `sanity/types.ts`, `sanity/lib/getLandingPage.ts`, `sanity/lib/fetch.ts`, `sanity/env.ts`, `lib/data.ts`, `sanity/schemaTypes/index.ts`, and `docs/MAINTENANCE.md` / `docs/SANITY_CMS.md`.
- **Do NOT change without care:** `sanity/env.ts` (static `NEXT_PUBLIC_*` reads — dynamic access breaks the client bundle/studio); singleton document ids (`landingPage`, `siteSettings`, `legalPage-impressum`, `legalPage-datenschutz`) and the legal-page `readOnly` slug; the React webpack alias in `next.config.ts`.

---

## 10. OPEN QUESTIONS

1. **Service detail pages:** Was the `/services/[slug]` route removed permanently (accordion-only), or should it be rebuilt? This determines whether to keep or prune several `service` fields.
2. **SelectedWork vs. caseStudy:** Should the home "Selected Work" grid be driven by the Sanity `caseStudy` documents (single source of truth), or stay a curated hardcoded list?
3. **Client logos:** Should the brand-logo wall be (re)built and made CMS-editable, or are the assets in `public/Seite Logos Kopie/` deprecated?
4. **BudgetTool:** Should the budget tool / FAQ become editable in Sanity, and is the slider purely illustrative (no real pricing logic)?
5. **Launch / SEO:** When should indexing be enabled (`robots`)? Is there a production domain to configure (canonical URLs, OG base URL)?
6. **Drafts/preview:** Is a Sanity preview / draft mode needed for editors, or is publish-then-ISR sufficient?
7. **Revalidation:** Should we add a Sanity → Vercel webhook for on-demand revalidation, or is the 60s window acceptable?

---

### Follow-up questions for the project owner
1. Are there pages or features **not yet in the codebase** that still need to be built (e.g. a real services detail page, a blog, an English version)?
2. Are there any **design files (Figma, etc.)** to reference for the unfinished/hardcoded sections?
3. What is the **priority order** for the open items in §8 (e.g. is launch/indexing the top priority, or CMS-ifying SelectedWork/BudgetTool first)?
