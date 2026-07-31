# CLAUDE.md — make/c Website

Kompaktes Projekt-Gedächtnis für Claude-Sessions und Subagents. Stand: 31.07.2026 (nach der Sanity-Reduktion auf Case Studies).

## Projekt

Firmenwebsite der Videoproduktions-Agentur **make/c** (Köln & Essen). Landingpage (One-Pager) + `/work`-Referenzen mit Case-Study-Detailseiten + Legal-Seiten. Dark-Premium-Look nach Figma-Design (`make_c Landingpage_PAUL`, fileKey `CtBJCsJbEpjFdqtm1Q4ODq`; Landing = Node `1:2`, Case-Study-Detail = Node `25:90`). Sprache: Deutsch.

## Tech-Stack & Struktur

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3.4 · framer-motion · Lenis · Sanity v5 (Studio embedded unter `/studio`) · Vercel (Auto-Deploy bei Push auf `main`).

- `app/page.tsx` — Landing: Header → Hero → Stats → LogoBanner → Showreel → Approach → ServiceList → SelectedWork → Testimonials → AboutTeam → VideoCheck → Contact → FloatingContact → Footer
- `app/leistungen/page.tsx` — Hub aller sechs Leistungen · `app/leistungen/[slug]/page.tsx` — SEO/GEO-Detailseite (SSG über `generateStaticParams`)
- `components/services/` — die Bausteine der Leistungsseite (ServiceHero, ServiceFacts, ServiceBlocks, ServiceSteps, ServiceAudience, ServiceFaq, ServiceCases, ServiceRelated, ServiceCta)
- `components/sections/` (Landing-Sections) · `components/layout/` (Header/Footer) · `components/ui/` (Swoosh, SquiggleUnderline, Magnetic, CustomCursor, SmoothScroll, WaveField, …) · `components/seo/JsonLd.tsx`
- `sanity/` — **nur noch Case Studies**: Schema (`schemaTypes/documents/caseStudy.ts` + 7 Objekte), Queries (`lib/queries.ts`, 3 Stück), Fetcher (`lib/getCaseStudies.ts`), Types (`types.ts`), Bild-Builder (`lib/image.ts`)
- `lib/content/` — **der gesamte übrige Seiteninhalt**, hartcodiert: `landing.ts` (alle Landing-Sections), `services.ts` (die 6 Leistungs-Kacheln), `site.ts` (Header/Footer), `legal.ts` (Impressum + Datenschutz als Portable Text), `types.ts`
- `lib/data.ts` — `NAV_LINKS`, `HEADER_NAV_LINKS`, `SELECTED_WORK` (Landing-Grid)
- `lib/leistungen.ts` — der komplette Text der sechs Leistungsseiten. `SERVICE_PAGES[].slug` muss zu `SERVICES[].slug` in `lib/content/services.ts` passen, sonst verlinkt eine Kachel ins Leere.
- `lib/seo.ts` — Basis-URL, Indexierungs-Schalter, NAP-Daten (Köln/Essen), **`pageMetadata()`** (Pflichtmuster für Unterseiten-Metadata, siehe unten), JSON-LD-Bausteine (Organization/ProfessionalService, WebSite, Service, BreadcrumbList, FAQPage, CollectionPage)
- `lib/og.tsx` — Gestaltung der OG-Bilder (1200×630, Marken-Muster). Ausgeliefert über **normale Routen**: `app/og/route.tsx` (Marke) und `app/leistungen/[slug]/og/route.tsx` (je Leistung). Fontdateien dafür in `app/fonts/` (Montserrat Bold + EB Garamond SemiBoldItalic als statische TTF, OFL-Lizenzen daneben) — `next/font/google` ist für `ImageResponse` nicht erreichbar, und Satori kann kein WOFF2 und keine Variable Fonts gewichten.

## Commands

```bash
npm run dev          # localhost:3000 — läuft mit Turbopack
npm run dev:webpack  # Fallback auf webpack, falls Turbopack mal Ärger macht
npm run build        # Production-Build (ISR) — nutzt weiterhin webpack
npx tsc --noEmit     # WICHTIG: next.config.ts ignoriert Typ- UND ESLint-Fehler im Build
                     # (ignoreBuildErrors + ignoreDuringBuilds) — daher tsc separat laufen lassen!
```

**Dev-Server läuft seit 30.07.2026 mit `--turbopack`.** Gemessene Kaltkompilierung (je 2 Läufe, `.next` vorher gelöscht): Leistungsseite 1,08–1,26 s → **0,72–0,75 s** · `/studio` 7,78–7,96 s → **4,69–4,82 s** · `/` schwankt zu stark für eine Aussage (webpack 3,6–4,6 s, Turbopack 3,2–8,3 s). Also **rund 1,6–1,7× schneller**, kein Quantensprung — der Dev-Server bleibt naturgemäß viel langsamer als der Production-Build. Der `webpack()`-React-Alias in `next.config.ts` wird von Turbopack ignoriert; verifiziert, dass Landing, Leistungsseiten, `/work` und das eingebettete Studio (Login-Maske rendert) fehlerfrei und ohne Konsolenfehler laufen. Für `npm run build` gilt der Alias unverändert weiter.

**Dev-Werte sagen nichts über die Live-Performance.** Gemessen am Production-Build: Leistungsseite `load` **49 ms**, 0,25 MB, TTFB 4 ms; Startseite `load` 163 ms, 3,09 MB — davon **2,75 MB allein `Header_video.mp4`** (89 % des Gewichts). Wer die Startseite schneller machen will, muss dort ansetzen, nicht am CMS.

Nicht `npm run build` bei laufendem Dev-Server (beide nutzen `.next/` → Dev-Server vorher stoppen, danach neu starten). **Wenn die Seite „komplett kaputt" aussieht** (keine Farben, keine Typo): fast immer eine `.next/`-Kollision zwischen Build und Dev → Dev stoppen, `rm -rf .next`, neu starten. Erkennbar daran, dass `/_next/static/css/app/layout.css` und die JS-Chunks **404** liefern — bei Layout-/Styling-Arbeit also nicht nur das HTML prüfen, sondern auch die Bundles auf 200.

**Visuelle Prüfung / Messen ohne Chrome-Extension** (Extension war 07/2026 nicht verbunden): Playwright in ein Temp-Verzeichnis installieren — **nicht** ins Repo — und das System-Chrome als Binary nutzen, weil der Playwright-Browser-Cache älter ist als das Paket:

```bash
npm i --prefix /tmp/pw playwright --no-save
# im Skript: chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" })
NODE_PATH=/tmp/pw/node_modules node skript.mjs
```

Damit lassen sich Elementgeometrien messen, Animationen über die Zeit sampeln und Sections screenshotten. Für Pixel-Fragen („Striche nicht auf einer Linie") ist das der einzige belastbare Weg — Grep im HTML reicht dafür nicht.

## Sanity

**Sanity verwaltet ausschließlich die Case Studies** (User-Entscheidung 31.07.2026). Alles
andere — Landing, Leistungen, Header/Footer, Impressum, Datenschutz — liegt hartcodiert in
`lib/content/` bzw. `lib/leistungen.ts`. Außerhalb der Cases gibt es keinen CMS-Fetch.

- Project `ppeo9yox`, Dataset `production` (public), API `2024-10-01`. Env in `.env.local`, zentral gelesen in `sanity/env.ts`.
- **Ein Dokumenttyp:** `caseStudy` (18 Stück: 6 echte + 12 `referenzprojekt-*`-Platzhalter) plus 7 Objekttypen (`projectMeta`, `mainMedia`, `galleryItem`, `seo` + die Archiv-Typen `headline`, `solutionSection`, `ctaSection`).
- **Drei Queries** in `sanity/lib/queries.ts`: `ALL_CASE_STUDIES_QUERY` (Landing-Modal + `/work`), `CASE_STUDIES_BY_SLUGS_QUERY` (3 Cases je Leistungsseite), `NEWEST_CASE_UPDATED_AT_QUERY` (nur `lastModified` für `/work` in der Sitemap).
- ⚠️ **Alt-Dokumente liegen weiter im Dataset**: `landingPage`, 6× `service`, `siteSettings`, 2× `legalPage`. Bewusst nicht gelöscht (Rückweg offen). Im Studio nicht mehr sichtbar, von keiner Query gelesen, zur Laufzeit gratis. Ein entferntes Schema **löscht keine Daten**.
- ⚠️ **`mcp__Sanity__get_schema` ohne `type`-Argument liefert einen veralteten Stand** (verifiziert 31.07.2026: listete `landingPage` samt der schon am 30.07. entfernten `insight`/`questions`). Belastbar ist der deployte Manifest selbst — `*[_id == "_.schemas.make-c"][0].schema`, das Feld ist ein JSON-**String**, also zweimal parsen. Mit `type: "caseStudy"` ist die Antwort korrekt.
- **Schema-Deploy:** Workspace `make-c` ist Studio-deployed → `npx sanity schema deploy` benutzen, **nicht** `mcp__Sanity__deploy_schema`. Wichtig: die Sanity-CLI liest `.env.local` nicht von allein — sonst greift der Platzhalter `missing-project-id`. Also immer `set -a; . ./.env.local; set +a; npx sanity …`.
- **Query-Pattern:** GROQ in `queries.ts` → `getCaseStudies()` / `getCaseStudiesBySlugs()` in `sanity/lib/getCaseStudies.ts` → typisierte Props. **Keine Fallback-Merges mehr** — Case-Content ist Sanity-only, bei Fehler kommt ein leeres Array. Damit sind auch die alten Merge-Fallen weg (`null` aus GROQ überschrieb Fallbacks, Längen-Checks holten sie zurück): es gibt nichts mehr zu mergen.
- Seiten mit Case-Inhalt behalten `export const revalidate = 60` (`/`, `/work`, `/leistungen/[slug]`). `/leistungen`, `/impressum` und `/datenschutz` haben keinen CMS-Fetch mehr und sind vollständig statisch.
- Neues Case-Feld: Schema (`schemaTypes/documents/caseStudy.ts`) + `sanity/types.ts` + Projektion in `queries.ts` — drei Stellen.
- `patch_documents` schreibt **Drafts**, die Seite liest `perspective: "published"` → immer `publish_documents` hinterher. Kontrolle: `*[_id in path("drafts.**")]` muss leer sein.
- Es gibt **keinen Revalidierungs-Webhook** (`app/api/` existiert nicht). Die `tags` an `sanityFetch` sind daher wirkungslos, Invalidierung läuft rein über `revalidate = 60` — Studio-Änderungen brauchen bis zu 60 s + ISR.

## Design-System

- **Farben:** `makec-dark #14140F` (BG), `makec-blue #2C2CC6` (Akzent/Blöcke), Weiß-Abstufungen (`white`, `/80`, `/70`, `/60`, `/40`) für Hierarchie.
- **Typo-Tokens** in `tailwind.config.ts` (aus Figma-Variablen, responsiv via clamp): `text-h2` (Gotham Bold 76/76, −0.05em), `text-h4` (40/40, −0.05em), `text-body-lg` (Book 24/36), `text-small` (Bold 18/26), `text-meta` (Book 14/20). Figma-letterSpacing „−5" = −5% = −0.05em.
- **Misch-Typo-Muster** (Markenzeichen, überall auf der Seite): erster Teil Gotham Bold (Italic bei Display-Headlines, uppercase) + zweiter Teil EB Garamond SemiBold Italic **größer** (1.076em bei Display, 1.2em bei H2-Zeilen, leading 0.85–1). Beispiele: SHOW/REEL, SELECTED/WORK, „We make video *that work.*"
- **Fonts:** EB Garamond via next/font/google (`--font-garamond`). **Gotham-Ersatz: Montserrat** (next/font/google, Variable Font inkl. Italic) liefert `--font-gotham` und ist Body-Font — echte Gotham später via `next/font/local` unter derselben Variable einhängen (nur `app/layout.tsx`, README in `app/fonts/`).
- **Wiederkehrende Elemente:** `Swoosh` (handgezeichneter Trenner, sitzt halb/halb auf Section-Kanten via translate-y-1/2), `SquiggleUnderline` (Unterstreichung), **`MixedHeadline`** (`components/ui/MixedHeadline.tsx` — das Misch-Typo-Muster als Komponente, Varianten `h2`/`display`, `slash` funktioniert auch gestapelt; nicht neu inline bauen), **`EmphasizedText`** (hebt ein per CMS gepflegtes Wort in einer Zeile kursiv hervor — das „make" in „We make video"), **`WordSlot`** (Slot-Machine für die Wortmarke `make/…`), **`PillButton`** (Größen lg/md, Tones dark/blue), **`LazyVideo`** (Autoplay-Loops erst im Viewport laden; aktuell unreferenziert, für die Service-Detailseiten vorgesehen), Headlines überlappen Medienkanten (negative margins). Token `text-display` = Display-Overlap-Headlines.
- **Section-Padding-Standard:** `py-16 md:py-32` für normale Sections; nur Overlap-Sections (Approach, Showreel, SelectedWork) weichen gezielt ab. **Gilt auch für `components/services/*` und `app/leistungen/page.tsx` — keine Ausnahme.**
- ⚠️ **Die Leistungsseiten nicht „straffen".** Am 31.07.2026 auf `py-14 md:py-24` (Facts `md:py-20`, Headline-Margins `mb-8 md:mb-12`) reduziert — rein rechnerisch ein guter Deal (Detailseite 9.048 → 8.035 px Desktop, ~2.900 px Weißraum waren es vorher). **Der User hat es gesehen und verworfen:** „alles zu eng … sieht nicht gut aus, sondern nur so gequetscht." Am selben Tag vollständig zurückgenommen. Die 9 Sections dürfen lang scrollen; die Höhe ist kein Problem, das gelöst werden muss.
- **Masken-Falle:** `overflow-hidden` schneidet den Italic-Überhang des letzten Glyphs ab. Kompensation wie in `Hero.tsx` / `WordSlot.tsx`: `pr-[0.15em]` (ggf. plus negativer Margin). Vertikal: Montserrats Content-Box ist **1.299em** (ascent 1.024 + descent 0.275) — `leading-[1.3]` lässt also praktisch null Luft und die Maske schneidet oben ab. In Masken `leading-[1.5]` setzen (überschreibt das Token, weil `lineHeight` in Tailwind hinter `fontSize` steht).
- **`WordSlot` – drei Fallen, die alle drei zugeschlagen haben** (bitte nicht „vereinfachen"): (1) Die Maske ist ein Flex-Item → ohne `min-w-0` greift `min-width: auto` und eine animierte Breite kann die Inhaltsbreite nicht unterschreiten. (2) framer-motion tweent `width` nur mit bekanntem Ausgangswert — über das `animate`-Prop ohne vorher gesetzte Breite snappt es; deshalb läuft die Breite über einen `useMotionValue` + imperatives `animate()`. (3) Die Messhilfe-Kinder brauchen `w-fit`; als reine `block`-Elemente ziehen sie alle auf die Breite des längsten Wortes auf und jede Messung liefert denselben Wert.
- Animation: framer-motion (Stagger, AnimatePresence height-auto für Aufklappen), `MotionSection`-Wrapper, `Magnetic`-Hover. `MotionConfig reducedMotion="user"` in `SiteEffects` + globale `prefers-reduced-motion`-CSS — neue Animationen müssen nichts extra tun, aber nichts einbauen, das das umgeht.

## Harte Regeln

1. **Content gehört in den Code, Sanity nur für Case Studies.** (User-Entscheidung 31.07.2026 — vorher galt das Gegenteil.) Neuer Text/neue Bilder außerhalb der Cases gehen nach `lib/content/` (bzw. `lib/leistungen.ts` für die Leistungsseiten), **nicht** in ein neues Sanity-Schema. Nur Case-Inhalte kommen aus dem CMS. Weiter außerhalb von `lib/content/` hartcodiert und so gewollt: `lib/data.ts` (Navigation, Selected-Work-Grid), die LogoBanner-Dateiliste, die Wortmarke `make/` selbst, die Stadt→Icon-Zuordnung in `Contact.tsx` und **VideoCheck.tsx komplett** (Quiz und Ergebnistexte, User-Entscheidung 07/2026 — nicht migrieren; die FAQ darin ist 07/2026 entfallen).
2. **Figma nur als Token-Quelle.** Niemals absolute Pixel-Positionen/Canvas-Koordinaten übernehmen (kein `position:absolute` mit top/left aus Figma). Layout mit Flex/Grid, rem/%, clamp().
3. **Bestehende Komponenten/Patterns wiederverwenden** statt neu bauen (Tokens, Misch-Typo-Muster, Swoosh, Pill-Buttons, Query-Pattern).
4. Nicht ungefragt committen/pushen.

## Fallstricke (schon passiert / leicht übersehen)

- Build ist grün trotz Typfehlern (`ignoreBuildErrors: true`) → immer `npx tsc --noEmit`.
- **Nicht mehr aktuell, aber gut zu wissen:** bis 31.07.2026 überschrieben Live-Sanity-Inhalte die Code-Fallbacks — Text im Code ändern hatte dann keine sichtbare Wirkung. Seit der Reduktion gibt es außer Cases keine Fallback-Merges mehr; was in `lib/content/` steht, wird gerendert.
- Asset-Pfade in `public/` enthalten Leerzeichen/Umlaute (`Seite Logos Kopie/`, `icon /`, `Selected Work/`) — beim Referenzieren exakt übernehmen.
- `NEXT_PUBLIC_*`-Env wird statisch inlined; Doc-IDs ohne Punkt — Details in `docs/MAINTENANCE.md`.
- **Metadata einer neuen Unterseite immer über `pageMetadata()`** aus `lib/seo.ts`, nie per Hand. Next merged `openGraph` **nicht** feldweise: eine Seite, die nur `title`/`description` setzt, erbt das komplette `openGraph` des Layouts — also og:title *und* og:url der **Startseite**. Genau das war bis 31.07.2026 auf `/work`, `/impressum` und `/datenschutz` der Fall (geteilte Links zeigten die Startseite).
- **OG-Bilder laufen über normale Routen (`/og`, `/leistungen/<slug>/og`), nicht über `opengraph-image.tsx`.** Grund: Nexts Dateikonvention gilt nur für ihr eigenes Segment und wird von Kindsegmenten mit eigenem `openGraph` verworfen — dabei lässt Next den Wert `"/opengraph-image"` in `openGraph.images` auch noch stillschweigend fallen. Verifiziert: mit der Konvention hatten `/work`, `/impressum`, `/datenschutz`, `/leistungen` **kein** og:image. Also `ogImage` in `pageMetadata()` explizit setzen und im ausgelieferten HTML prüfen.
- **SEO/GEO-Schalter:** `NEXT_PUBLIC_SEO_INDEX` steuert `robots` im Layout **und** `app/robots.ts`. Ohne die Variable ist die Seite `noindex` und `Disallow: /` — Zustand bis zum Go-Live. Zum Freischalten `NEXT_PUBLIC_SEO_INDEX=true` **plus** `NEXT_PUBLIC_SITE_URL=https://<echte-domain>` setzen und **neu deployen** (build-time inlined!). Die frühere statische `public/robots.txt` wurde entfernt — eine Datei in `public/` gewinnt gegen den gleichnamigen Route Handler und hätte `app/robots.ts` wirkungslos gemacht. Nicht wieder anlegen.
- Leistungs-Detailseiten liegen unter **`/leistungen/[slug]`** (nicht `/services/…`). Ihr Text kommt aus `lib/leistungen.ts`, das Bild (Fallback, wenn es kein Loop-Video gibt) aus `lib/content/services.ts`. **Zwei Listen mit denselben Slugs**: `SERVICE_PAGES` (`lib/leistungen.ts`) und `SERVICES` (`lib/content/services.ts`) — weicht ein Slug ab, verlinkt die Kachel auf eine 404. Das prüft kein Typ, nur der Blick.
- Die Loop-Videos in `public/` sind **4× 512×512 quadratisch** (`Beratung loop`, `Vidoe Produktion Loop`, `Event Loop`, `Studio Loop`) und **1× 1224×752** (`AI Video Loop`). `ServiceBlocks.tsx` schaltet deshalb den Medienrahmen auf `aspect-square`, sobald ein Loop gesetzt ist, und nur beim Bild-Fallback auf `aspect-[730/462]`. Inhaltlich sind es helle Stock-Aufnahmen, die nicht zum Dark-Premium-Look passen — Austausch offen.
- `npm run lint` läuft nicht: es gibt keine ESLint-Config im Repo, `next lint` fragt interaktiv nach dem Setup. Gate ist `npx tsc --noEmit`.
- Die Loop-Videos laufen auf den Detailseiten (`ServiceBlocks`), auf den **Kacheln** von `/` und `/leistungen` steht dagegen die Grafik aus `lib/content/services.ts` (handgezeichnete Platzhalter).
- `scripts/` enthält nur noch die drei Case-Seeds (`seed-case-studies`, `seed-placeholder-cases`, `seed-case-credits`). Die fünf Skripte für Landing/Services/Legal/Bild-Upload/ID-Migration sind am 31.07.2026 entfernt worden — sie schrieben auf Dokumenttypen, die es nicht mehr gibt (zwei davon per `createOrReplace`). Nicht aus der Git-Historie zurückholen, ohne zu prüfen, was sie anfassen.

## Weitere Doku (`docs/`)

- `HANDOVER.md` — **Übergabe 30./31.07.2026**: Landingpage-Umbau, SEO-Nachbesserung und die Sanity-Reduktion. Zuerst lesen, solange nichts committet ist.
- `PROJECT_OVERVIEW.md` — ⚠️ **stark veraltet, mit Vorsicht lesen.** Beschreibt den Stand *vor* dem Umbau vom 30.07.2026: `ServiceAccordion`, `InsightGeneration`, `QuestionsEntry`, `BudgetTool`, `/services/[slug]` und „landingPage/service/siteSettings aus Sanity" existieren so alle nicht mehr. Die Verzeichnisstruktur und die Design-Abschnitte stimmen noch grob.
- `MAINTENANCE.md` — Deploy/Env/Sanity-Betriebswissen (aktuell)
- `SANITY_CMS.md` — aktuell: beschreibt `caseStudy`, und „nur Case Studies aus Sanity" stimmt seit 31.07.2026 wieder.
- `DESIGN_GUIDELINES.md` — Marken-Basics; die verbindliche Token-Definition ist `tailwind.config.ts` (dieses Dokument kennt die neue Typo-Scale noch nicht)

## Offene Punkte (Stand 31.07.2026)

- 🔴 **Telefonnummer fehlt an zwei Stellen — und steht schon im Impressum.** `lib/content/legal.ts` führt unter „Kontakt" `Fon: +49 221 – 4 56 – 7 62 12`. Der Kontakt-Block (`LANDING.contact.phone`, auskommentiert) und `ORG.telephone` (`lib/seo.ts`, an beide `Place`-Knoten in `organizationGraph()`) sind bewusst leer geblieben, weil unklar ist, ob die Zentrale neben „Paul Zajonc · Ansprechpartner" stehen soll. Bis zur Klärung rendert die Telefonzeile nicht — statt der Platzhalter-Nummer `+49 123 455667`, die bis 31.07.2026 live als `tel:`-Link ausgeliefert wurde.
- **Instagram-URL fehlt.** `SITE.socials` (`lib/content/site.ts`) hat für LINKEDIN eine URL (aus `ORG.linkedin`), für INSTAGRAM nicht → `Footer.tsx` rendert dort weiter ein nicht klickbares `<span>`. Bewusst so, statt ein Profil zu raten. Mit URL wandert sie sinnvollerweise auch als `sameAs` in `organizationGraph()`.
- **Kontakt-Mail ist absichtlich zweigleisig:** Kontakt-Sektion und FloatingContact zeigen `pz@make-c.de` (persönlicher Ansprechpartner), Footer und JSON-LD `info@make-c.de` (allgemeiner Kanal). User-Entscheidung 31.07.2026 — kein Bug, nicht „vereinheitlichen".
- **Kein Verweis auf `/llms.txt` in der `robots.txt`.** Nexts `MetadataRoute.Robots` kennt kein Feld dafür und serialisiert keine Kommentare — es gäbe ihn nur, wenn `app/robots.ts` durch einen Text-Route-Handler ersetzt würde. Dafür ist der Nutzen zu klein: es gibt keine standardisierte Direktive, kein Crawler liest robots-Kommentare, und die Auffindbarkeit läuft ohnehin über den Konventionspfad `/llms.txt` (erreichbar und per `Allow: /` erlaubt). Bewusst offen gelassen.
- Die 18 Case Studies haben seit der Modal-Umstellung (`b890bf9`) **keine eigenen URLs**. Das Sanity-Feld `seo.ogImage` wird abgefragt, aber von keiner Route benutzt. 18 Inhalte, 0 indexierbare Seiten — größter struktureller SEO-Verlust, aber eine Produktentscheidung. `/work` zeichnet sie seit 31.07.2026 wenigstens als `CollectionPage`/`ItemList` (ohne `url`) aus.

## Ältere offene Punkte (Stand 30.07.2026)

- **Alle Bilder aus dem Umbau sind handgezeichnete Platzhalter** (Magnific, Stil: weiße Marker-Linien auf `#14140F` mit sparsamen blauen Akzenten): die 6 Leistungs-Grafiken (`public/leistungen/*.png`), das CEO-Portrait (`public/team/ceo-portrait.png`) und die drei Selected-Work-Kacheln (`public/Selected Work/BarmeniaGothaer_Bild.png`, `FOM_Bild.png`, `Telekom_Bild.png`). **Alle zehn per Dateitausch ersetzbar** — seit 31.07.2026 liegen sie in `public/` statt auf dem Sanity-CDN, ein Studio-Upload ist nicht mehr nötig.
- **Das CEO-Portrait ist bewusst eine abstrakte, gesichtslose Skizze** — kein Abbild von Jens Kemper. Echtes Foto einhängen, sobald vorhanden.
- **Das CEO-Zitat ist ein Entwurf** (`LANDING.about.ceoQuote`) und will gegengelesen werden.
- **Testimonials zeigen Lorem ipsum** (`LANDING.testimonials.items`) — auf User-Entscheidung 31.07.2026 bewusst sichtbar gelassen, echte Zitate kommen später. Zum Ausblenden: `items: []` → `Testimonials.tsx` gibt bei leerer Liste `null` zurück. Erst mit echten Bewertungen darf `AggregateRating`/`Review` in die JSON-LD.
- **Leistungsseiten sind gebaut** (30.07.2026) unter `/leistungen/<slug>`; Slugs: `video-strategie`, `video-produktion`, `video-motion-design`, `event-content`, `artificial-intelligence`, `studiobau` — nur die ersten drei tragen ein `video-*`-Präfix, das ist gewollt inkonsistent gelassen. Offen: die Texte in `lib/leistungen.ts` wollen fachlich gegengelesen werden (Dauern, Ablauf, Preisaussagen in den FAQ) und die drei Cases je Seite sind teils Platzhalter (`referenzprojekt-*`). Eine Migration nach Sanity steht **nicht** mehr aus — sie ist mit der Reduktion vom Tisch.
- Die drei neuen Selected-Work-Kacheln (BarmeniaGothaer, FOM, TELEKOM) haben **kein** `caseStudy`-Dokument → nicht klickbar, kein Modal, nicht auf `/work`. `SelectedWork.tsx` rendert sie dafür als `div` ohne `data-cursor`.
- Echte Gotham-Fontdateien fehlen weiterhin — Montserrat läuft als Ersatz unter `--font-gotham` (Austausch nur in `app/layout.tsx`).
- ~~`siteSettings` im CMS: Instagram-/Vimeo-URLs fehlen, Copyright steht auf „© 2025".~~ Erledigt 31.07.2026: LinkedIn verlinkt, Copyright auf „© 2026", Vimeo war schon vorher raus. Nur Instagram fehlt weiter (siehe oben).
- Case Studies außer `merkur`: `headline`, `introHeading`, `credits`, Galerie-Bilder pflegen. `zeitgeist`, `aldi`, `kpmg` sind weiter `featured` und damit auf `/work`, nur nicht mehr im Landing-Grid.
- Vor Go-Live: `NEXT_PUBLIC_SEO_INDEX=true` + `NEXT_PUBLIC_SITE_URL` auf die echte Domain (aktueller Default: `https://make-c-website.vercel.app`), danach Sitemap in der Search Console einreichen. **Erledigt 30.07.2026:** eigene Metadata für `/work`, `/impressum`, `/datenschutz` und alle Leistungsseiten, Default-OpenGraph + `metadataBase` + `title.template`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`, JSON-LD (Organization/ProfessionalService mit beiden Standorten, WebSite, je Leistungsseite Service + BreadcrumbList + FAQPage).
- Bewusst **nicht** ausgezeichnet: `AggregateRating`/`Review` — die Testimonials sind Platzhalter, strukturierte Daten dafür wären ein Richtlinienverstoß. Erst nach echten Bewertungen ergänzen.
- Erledigt 30.07.2026 (Landingpage-Umbau): InsightGeneration + FAQ + QuestionsEntry entfernt, Leistungen von Accordion auf statische 6er-Liste, Selected Work neu (Genre-Label statt Jahr), AboutTeam auf CEO-Block + Marken-Zitat reduziert, `WordSlot`-Slot-Machine in Approach (groß und zentriert unter beiden Spalten), Copy-Patches in Sanity, Schema aufgeräumt (`insight`/`questions`/`powerWord`/`approach.kicker`/`showreel.kicker`/`service.features`/`processSteps` raus). Weitere Kicker entfernt: „/Ansatz/" (Approach) und das hardcodierte „/ Kontakt". Nav: „Team" raus dem Seitenmenü, Socials ohne Vimeo, Quiz heißt „Der Video-Check".
- **Erledigt 31.07.2026 (SEO/GEO-Nachbesserung + Kompaktierung der Unterseiten):**
  - `pageMetadata()` in `lib/seo.ts`; alle fünf Unterseiten darauf umgestellt. Behebt: `/work`, `/impressum`, `/datenschutz` gaben og:title und og:url der **Startseite** aus.
  - OG-Bilder neu (`lib/og.tsx` + `/og` + `/leistungen/<slug>/og`, 7 PNGs, alle zur Build-Zeit prerendert), `twitter: summary_large_image`. Vorher hatte **keine** der 11 URLs ein Vorschaubild.
  - `/work` aufgewertet: sichtbare Breadcrumb, `BreadcrumbList`, `CollectionPage` + `ItemList` über 18 Cases → JSON-LD-Blöcke 1 → 3.
  - `app/sitemap.ts` ist jetzt `async` und zieht echte `_updatedAt` aus Sanity; die sechs Leistungsseiten und `/leistungen` bewusst **ohne** `lastModified` (hartcodierter Text = kein echter Zeitstempel). Vorher stand überall die Build-Zeit.
  - `app/not-found.tsx` (branded 404, Status 404 verifiziert).
  - `WorkGrid.tsx`: Case-Kacheln von `h3` auf **`h2`**. `/work` sprang von der h1 direkt auf h3 — die Kacheln stehen ohne Zwischenebene unter „Referenzen". War vorbestehend; der Verifikationsvermerk „lückenlose H2/H3-Hierarchie" vom 30.07. traf auf `/work` nicht zu.
  - Dubletten raus: `kicker` (Feld + alle 6 Werte + Render — dupliziert die Breadcrumb), Audience-Füllsatz, zweiter Hero-CTA (identisches Label *und* href wie `ServiceCta`). **Das bleibt so** — nur die Abstände wurden zurückgenommen.
  - Weißraum gestrafft und auf Wunsch des Users **wieder zurückgenommen** (siehe Warnung im Design-System). Endstand: alle Abstände wie ursprünglich, `/leistungen` wieder exakt 5.618 px. Die Detailseite ist mit 8.787 px noch 261 px kürzer als vorher — das sind die drei entfernten Dubletten, kein Abstand.
- **Erledigt 31.07.2026 (Sanity-Reduktion auf Case Studies + Bugfixes):**
  - Inhalt aus Sanity nach `lib/content/` gezogen (`landing`, `services`, `site`, `legal`, `types`). Die alten `*_FALLBACK`-Konstanten waren mit dem Live-Dataset schon byte-identisch (per GROQ verglichen) — bei `contact` lieferte das CMS ohnehin nur `kicker` und die zwei Standort-Überschriften. Die Legal-Texte wurden live exportiert statt abgeschrieben und gegen das damalige Seed-Skript gegengeprüft: 0 Abweichungen.
  - 7 Bilder vom CDN nach `public/team/` + `public/leistungen/` geholt. `/` und `/leistungen` laden jetzt **0** Bilder von `cdn.sanity.io` (vorher 14 bzw. 12); `/work` unverändert 7.
  - Gelöscht: 3 Fetcher, 4 Dokument-Schemas, 5 Objekt-Schemas, 6 Queries, 5 Seed-/Migrationsskripte, `FOOTER_CONTENT`, die Singleton-Filter in `sanity.config.ts`. `Header`/`Footer` sind keine `async`-Komponenten mehr — sie holten `siteSettings` auf **jeder** Route, doppelt.
  - `SITE.locations` leitet sich jetzt aus `ORG` (`lib/seo.ts`) ab, statt Adressen ein zweites Mal zu tippen. Die Doppelpflege war dort selbst als Fallstrick vermerkt.
  - Behoben: 🔴 `/impressum` + `/datenschutz` antworteten mit **404**, wenn Sanity `null` lieferte (auch bei fehlender Env) — bei Impressumspflicht der schwerste Fund · 🔴 Platzhalter-Telefonnummer `+49 123 455667` als klickbarer `tel:`-Link · 🟡 framer-motion-Warnung „backgroundColor not animatable" (Ursache: konstanter Wert im `animate` von `CustomCursor.tsx`, seit 07/2026 offen) · 🟡 LINKEDIN im Footer war unklickbarer Text · 🟡 `© 2025` · ⚪ totes `rating`-Feld · ⚪ toter `approach.closing`-Render.
  - Verifiziert: `npx tsc --noEmit` grün · sichtbarer Text aller 12 Routen vor/nach dem Umbau verglichen, **einziger Unterschied sind die zwei entfernten Telefonzeilen** · 0 Konsolenfehler/-warnungen auf 11 von 12 Routen (Rest: erwarteter 404 auf der Probe-URL, plus eine vorbestehende LCP-Empfehlung zu einem Case-Bild auf `/work`) · Case-Modal öffnet, lädt Sanity-Bilder, schließt mit Escape · Sitemap weiter 11 URLs, `lastModified` nur noch auf `/work` · deploytes Schema enthält genau `caseStudy` + 7 Objekttypen · alle 28 Alt-Dokumente unangetastet im Dataset, keine Drafts.
- Erledigt 07/2026: Landingpage-CMS auf Figma-Copy gepatcht, Bilder als WebP, Loop-Videos lazy, A11y-Paket (reduced-motion, Dialog-Semantik, Skip-Link).
