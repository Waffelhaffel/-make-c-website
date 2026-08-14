# CLAUDE.md — make/c Website

Kompaktes Projekt-Gedächtnis für Claude-Sessions und Subagents. Stand: 13.08.2026.

Diese Datei enthält nur, was aus dem Code **nicht** hervorgeht: Entscheidungen, Fallstricke, Begründungen. Verzeichnisstruktur, Stack und Token-Werte stehen in `package.json`, `tailwind.config.ts` und im Dateibaum — bitte nicht hierher zurückkopieren. Was bereits erledigt ist, steht in `docs/CHANGELOG.md`.

## Projekt

Firmenwebsite der Videoproduktions-Agentur **make/c** (Köln & Essen). Landingpage (One-Pager) + `/work`-Referenzen mit Case-Study-Detailseiten + Legal-Seiten. Dark-Premium-Look nach Figma-Design (`make_c Landingpage_PAUL`, fileKey `CtBJCsJbEpjFdqtm1Q4ODq`; Landing = Node `1:2`, Case-Study-Detail = Node `25:90`). Sprache: Deutsch.

## Tech-Stack & Struktur

Stack siehe `package.json`. Nicht daraus ablesbar: **Vercel deployt automatisch bei jedem Push auf `main`.**

**Kein CMS.** Seit 10.08.2026 liegt der gesamte Inhalt im Repo; Sanity ist samt Studio, Schema und Paketen entfernt. Der Build ist vollständig statisch — keine Route hat noch `revalidate`, zur Laufzeit wird nichts nachgeladen.

- `app/leistungen/[slug]/page.tsx` — SEO/GEO-Detailseite je Leistung (SSG über `generateStaticParams`). Eine Übersichtsseite `/leistungen` gibt es **nicht mehr** (User-Entscheidung 10.08.2026, siehe unten) — die sechs Leistungen stehen auf der Startseite unter dem Anker `#service`, und `/leistungen` leitet per `redirects()` in `next.config.ts` dorthin um.
- `components/services/` — die Bausteine der Leistungsseite (ServiceHero, ServiceFacts, ServiceBlocks, ServiceSteps, ServiceImageBand, ServiceFaq, ServiceCases, ServiceRelated, ServiceCta). ⚠️ `ServiceAudience` ist am 12.08.2026 entfallen — „Für wen das passt" steht jetzt im blauen `ServiceFacts`-Block.
- `e2e/` — fünf Playwright-Suiten, 55 Checks, `npm run e2e`. Details unten unter „Commands".
- `lib/content/` — **der gesamte Seiteninhalt**, hartcodiert: `landing.ts` (alle Landing-Sections), `cases.ts` (**die 31 Referenzen ab 2022** + `getCasesBySlugs()`), `workCategories.ts` (die 6 Filter-Kategorien = die 6 Leistungen), `services.ts` (die 6 Leistungs-Kacheln), `site.ts` (Header/Footer), `legal.ts` (Impressum + Datenschutz als Portable Text), `types.ts`
- `lib/leistungen.ts` — der komplette Text der sechs Leistungsseiten. `SERVICE_PAGES[].slug` muss zu `SERVICES[].slug` in `lib/content/services.ts` passen, sonst verlinkt eine Kachel ins Leere.
- `lib/seo.ts` — Basis-URL, Indexierungs-Schalter, NAP-Daten (Köln/Essen), **`pageMetadata()`** (Pflichtmuster für Unterseiten-Metadata, siehe unten), JSON-LD-Bausteine (Organization/ProfessionalService, WebSite, Service, BreadcrumbList, FAQPage, CollectionPage)
- `lib/og.tsx` — Gestaltung der OG-Bilder (1200×630, Marken-Muster). Ausgeliefert über **normale Routen**: `app/og/route.tsx` (Marke) und `app/leistungen/[slug]/og/route.tsx` (je Leistung). Fontdateien dafür in `app/fonts/` (Montserrat Bold + EB Garamond SemiBoldItalic als statische TTF, OFL-Lizenzen daneben) — `next/font/google` ist für `ImageResponse` nicht erreichbar, und Satori kann kein WOFF2 und keine Variable Fonts gewichten.

## Commands

```bash
npm run dev          # localhost:3000 — läuft mit Turbopack
npm run dev:webpack  # Fallback auf webpack, falls Turbopack mal Ärger macht
npm run build        # Production-Build (voll statisch) — nutzt weiterhin webpack
npm run start        # Production-Server, Voraussetzung für npm run e2e
npx tsc --noEmit     # WICHTIG: next.config.ts ignoriert Typ- UND ESLint-Fehler im Build
npm run lint         # (ignoreBuildErrors + ignoreDuringBuilds) — beide daher separat!
npm run e2e          # 55 Playwright-Checks gegen den laufenden Production-Server
```

**Dev-Server läuft seit 30.07.2026 mit `--turbopack`** (rund 1,6–1,7× schnellere Kaltkompilierung, gemessen). ⚠️ **Der `webpack()`-React-Alias in `next.config.ts` wird von Turbopack ignoriert** — für `npm run build` gilt er unverändert weiter.

**Dev-Werte sagen nichts über die Live-Performance.** Gemessen am Production-Build: Leistungsseite `load` **49 ms**, 0,25 MB, TTFB 4 ms; Startseite `load` 163 ms, 3,09 MB — davon **2,75 MB allein `Header_video.mp4`** (89 % des Gewichts). Wer die Startseite schneller machen will, muss dort ansetzen.

Nicht `npm run build` bei laufendem Dev-Server (beide nutzen `.next/` → Dev-Server vorher stoppen, danach neu starten). **Wenn die Seite „komplett kaputt" aussieht** (keine Farben, keine Typo): fast immer eine `.next/`-Kollision zwischen Build und Dev → Dev stoppen, `rm -rf .next`, neu starten. Erkennbar daran, dass `/_next/static/css/app/layout.css` und die JS-Chunks **404** liefern — bei Layout-/Styling-Arbeit also nicht nur das HTML prüfen, sondern auch die Bundles auf 200.

**Visuelle Prüfung / Messen ohne Chrome-Extension** (Extension war 07/2026 nicht verbunden): Playwright in ein Temp-Verzeichnis installieren — **nicht** ins Repo — und das System-Chrome als Binary nutzen, weil der Playwright-Browser-Cache älter ist als das Paket:

```bash
npm i --prefix /tmp/pw playwright --no-save
# im Skript: chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" })
NODE_PATH=/tmp/pw/node_modules node skript.mjs
```

Damit lassen sich Elementgeometrien messen, Animationen über die Zeit sampeln und Sections screenshotten. Für Pixel-Fragen („Striche nicht auf einer Linie") ist das der einzige belastbare Weg — Grep im HTML reicht dafür nicht.

**Für wiederkehrende Prüfungen gibt es seit 11.08.2026 `e2e/`** — fünf Suiten, 55 Checks, `npm run e2e` gegen den laufenden Production-Server (`npm run start`, **nicht** den Dev-Server). Sie sichern genau das ab, was sich im HTML nicht ablesen lässt: Scrollpositionen, Einblend-Zeitpunkte, Scroll-Locks, Zurück-Navigation, Weiterleitungen. `e2e/config.mjs` kapselt Playwright-Pfad, Chrome und Basis-URL (alle per Env überschreibbar). ⚠️ Die Suiten behaupten **feste Zahlen** — die drei inhaltlichen stehen seit 12.08.2026 gebündelt in `CONTENT` (`e2e/config.mjs`): 31 Cases, 9 Treffer im Filter „Video Event Content", 6 Selected-Work-Kacheln. Wer Inhalt ändert, fasst nur diese Konstante an; Details in `e2e/README.md`.

## Referenzen (Cases)

Die 31 Referenzen stehen in **`lib/content/cases.ts`** und werden von Hand gepflegt —
seit 10.08.2026 gibt es kein CMS mehr. Ein Case ohne Eintrag dort existiert nicht;
ein `featured`-Flag gibt es nicht mehr, die **Array-Reihenfolge ist die Reihenfolge
auf `/work`**.

⚠️ **Nur Projekte ab 2022** (User-Entscheidung 12.08.2026). Die 33 Cases mit `year`
2020 oder 2021 sind ersatzlos gestrichen; 63 → 30 (seither ein neuer Case dazu:
`cwh-bih-sbv-wahl`, 14.08.2026). Wer ein älteres Projekt wieder
aufnehmen will, holt den Block per `git show` aus dem Stand vom 11.08.2026 — die
Bilddateien liegen unverändert in `public/work/`. ⚠️ Der Schnitt läuft über `year`,
und `year` ist das **Veröffentlichungsdatum der alten Portfolio-Seite**: wo
Veröffentlichung und Produktion auseinanderfallen, kann ein Projekt knapp falsch
einsortiert sein. Ein besseres Kriterium gab es in den Daten nicht.

⚠️ **Die ersten drei Einträge (`telekom`, `fom-studio`, `barmenia-gothaer`) sind
Platzhalter** (11.08.2026): angelegt, damit die zugehörigen Selected-Work-Kacheln
klickbar sind. `summary` steht als sichtbarer Platzhaltertext im Case-Fenster,
`year` ist ungeprüft auf 2026 gesetzt, `video`/`credits`/`services` fehlen. Sie
stehen bewusst oben — also in der ersten Reihe von `/work`. Ein Kommentarblock im
Code markiert sie.

- **Herkunft:** die Projekte kommen aus der alten Portfolio-Seite (`make-c.de/portfolio`) —
  Titel, Untertitel und Bilder aus einem HTML-Export, Texte/Jahre/Videos/Credits von
  den Detailseiten — plus `merkur` und `aldi`, die es nur im CMS gab. Die Skripte, die das
  gebaut haben, liegen zur Nachvollziehbarkeit in `scripts/` (`extract-portfolio.ts`,
  `build-case-images.ts`, `generate-cases.ts`) samt Rohdaten in `scripts/data/`.
  ⚠️ **`generate-cases.ts` nicht erneut laufen lassen** — es überschreibt `cases.ts`
  komplett und damit jede Handkorrektur, inklusive des 2022-Schnitts und der
  Kategorie-Zuordnung.
- **Bilder:** `public/work/<slug>.webp` (max. 1600 px, q82). Merkur hat zusätzlich
  `-poster` und `-gallery-1..3`, Telekom ein `-poster`. Neuer Case = Datei dort ablegen und
  in `cases.ts` referenzieren; `next/image` optimiert selbst. ⚠️ Seit dem 2022-Schnitt
  liegen dort **33 Dateien ohne Case** (~3 MB) — sie sind **nicht in git**, also nicht
  ohne Weiteres wiederherstellbar, und deshalb bewusst liegen geblieben.
- **Kategorien** stehen in `lib/content/workCategories.ts` — seit 12.08.2026 **die sechs
  Leistungen** (`video-strategie`, `video-produktion`, `video-motion-design`,
  `event-content`, `artificial-intelligence`, `studiobau`), Slug für Slug und in derselben
  Reihenfolge wie `SERVICES` und `SERVICE_PAGES`. `categories[]` am Case steuert die
  Filterleiste auf `/work`, `category` ist dieselbe Information ausgeschrieben als
  Metazeile im Case-Fenster — **beides zusammen ändern**. Ein Slug, der nicht in
  `WORK_CATEGORIES` steht, taucht als Chip nicht auf; der Filter zeigt nur belegte
  Kategorien.
- **Wer referenziert Slugs:** `SELECTED_WORK` (`lib/data.ts`, Landing-Raster) und
  `SERVICE_PAGES[].caseSlugs` (`lib/leistungen.ts`, drei Kacheln je Leistungsseite — bei
  `studiobau` nur zwei, über `getCasesBySlugs()`). Beide lassen unbekannte Slugs still
  fallen — beim Umbenennen oder Löschen eines Cases also mitziehen, das prüft kein Typ.
- **Video:** `video` nimmt eine Vimeo- oder YouTube-URL in der **Watch-Form**
  (`https://vimeo.com/<id>`, `https://www.youtube.com/watch?v=<id>`).
  `VideoFacade.toEmbedUrl()` kennt die `…/embed/<id>`-Form **nicht** und würde die URL
  stattdessen in einem neuen Tab öffnen. Ohne `video` zeigt das Case-Fenster nur ein
  statisches Bild, ohne Play-Button.
- **`summary` trennt Absätze mit `\n\n`** — das Case-Fenster rendert sie über
  `whitespace-pre-line`.
- ⚠️ **`year` ist das Veröffentlichungsdatum der alten Seite**, nicht zwingend das
  Produktionsjahr. Steht auf der Kachel neben dem Kunden — und ist seit 12.08.2026
  zugleich das Kriterium dafür, ob ein Case überhaupt auf der Seite steht.

## Design-System

- **Farben und Typo-Tokens stehen verbindlich in `tailwind.config.ts`** (aus Figma-Variablen, responsiv via clamp) — dort nachsehen, nicht hier. Zwei Dinge, die die Datei nicht erklärt: Figma-letterSpacing „−5" bedeutet −5 % = `-0.05em`, und `text-small` bringt **18 px Bold** mit (ein Fließtext in diesem Token liest sich wie eine zweite Überschrift → `font-normal` setzen).
- ⚠️ **`display`, `h2` und `h4` tragen seit 13.08.2026 eine Mobil-Deckelung `min(Xvw, clamp(…))`** (12,5 / 10,5 / 7,5vw). **Nicht zur „reinen" clamp() zurückvereinfachen.** Grund: die clamp-Untergrenze steht *flach* (52/40/28 px), weil der vw-Anteil erst ab 945/400/390 px darüber liegt — auf dem Handy wuchs die Schrift also überhaupt nicht mit, und die längsten Lockups liefen aus dem Bild (h1 „Video/**Produktion**" 78 px über den Rand bei 320 px). Deutsche Komposita können nicht umbrechen, kleiner setzen ist der einzige Weg. Die Deckelung greift **nur unter 416/381/373 px**; darüber sind die Werte rechnerisch identisch mit vorher — Desktop ist unberührt und darf es bleiben.
- **Misch-Typo-Muster** (Markenzeichen, überall auf der Seite): erster Teil Gotham Bold (Italic bei Display-Headlines, uppercase) + zweiter Teil EB Garamond SemiBold Italic **größer** (1.076em bei Display, 1.2em bei H2-Zeilen, leading 0.85–1). Beispiele: SHOW/REEL, SELECTED/WORK, „We make video *that work.*"
- **Fonts:** EB Garamond via next/font/google (`--font-garamond`). **Gotham-Ersatz: Montserrat** (next/font/google, Variable Font inkl. Italic) liefert `--font-gotham` und ist Body-Font — echte Gotham später via `next/font/local` unter derselben Variable einhängen (nur `app/layout.tsx`, README in `app/fonts/`).
- **Wiederkehrende Elemente:** `Swoosh` (handgezeichneter Trenner, sitzt halb/halb auf Section-Kanten via translate-y-1/2), `SquiggleUnderline` (Unterstreichung), **`MixedHeadline`** (`components/ui/MixedHeadline.tsx` — das Misch-Typo-Muster als Komponente, Varianten `h2`/`display`, `slash` funktioniert auch gestapelt; nicht neu inline bauen. `stacked` nimmt seit 13.08.2026 auch **`"mobile"`**: bis md gestapelt, ab md einzeilig — in Gebrauch an SELECTED/WORK, das einzeilig auf keinem Handy ins Bild passt. ⚠️ Nur mit `slash` benutzen: der Wortabstand, den `stacked: true` in den Textinhalt legt, entfällt dort, weil er ab md sichtbar mitten im Lockup stünde), **`EmphasizedText`** (hebt ein per Datenfeld bestimmtes Wort in einer Zeile kursiv hervor — das „make" in „We make video"), **`WordSlot`** (Slot-Machine für die Wortmarke `make/…`), **`PillButton`** (Größen lg/md, Tones dark/blue — dazu seit 13.08.2026 `variant="box"`: eckig, im Look der Testimonial-Karten, mit hartem Versatz-Schatten als 3D-Kante. In Gebrauch an den „Mehr erfahren"-Buttons (`ServiceList.tsx`) und an beiden „Alle Referenzen anzeigen" (`SelectedWork.tsx` lg, `ServiceCases.tsx` md). **Weiße Pills geblieben:** der Abschluss-CTA der Leistungsseiten (`ServiceCta.tsx`, steht auf **Blau** — die Box-Füllung ist aus `bg-makec-dark` abgeleitet und passt dort nicht) und die 404-Links. Zwei Fallen: die Box-Füllung ist **deckend** (`#1c1c18`), nicht `bg-white/[0.035]` wie die Karten — der Button steht in `ServiceList` über dem Loop-Video, und auf hellen Frames verschwände eine 3,5-%-Weißfläche; und bei der Kante muss **Restkante + Hover-Versatz = Ausgangskante** bleiben (md 3+3=6, lg 4+5=9), sonst wandert die Außenkontur beim Hover), **`LazyVideo`** (Autoplay-Loops erst im Viewport laden, mit `poster` und eigener `prefers-reduced-motion`-Prüfung; in Gebrauch in `ServiceHero.tsx` und `ServiceList.tsx`), Headlines überlappen Medienkanten (negative margins). Token `text-display` = Display-Overlap-Headlines.
- **Section-Padding-Standard:** `py-16 md:py-32` für normale Sections; nur Overlap-Sections (Approach, Showreel, SelectedWork) weichen gezielt ab. **Gilt auch für `components/services/*` — keine Ausnahme.**
- ⚠️ **Die Leistungsseiten nicht „straffen".** Am 31.07.2026 auf `py-14 md:py-24` (Facts `md:py-20`, Headline-Margins `mb-8 md:mb-12`) reduziert — rein rechnerisch ein guter Deal (Detailseite 9.048 → 8.035 px Desktop, ~2.900 px Weißraum waren es vorher). **Der User hat es gesehen und verworfen:** „alles zu eng … sieht nicht gut aus, sondern nur so gequetscht." Am selben Tag vollständig zurückgenommen. Die Sections dürfen lang scrollen.
  ⚠️ **Das gilt für den Weißraum, nicht für die Menge an Text.** Am 12.08.2026 hat der User selbst gebeten, die Unterseiten „einen Ticken zu kürzen, da das doch sehr viel ist". Gekürzt wurde deshalb **Inhalt** (eine Sektion weniger, Blöcke 4 → 3, Ablauf 6 → 4), **kein einziger Abstand**. Beides nicht verwechseln: `py-16 md:py-32` bleibt unangetastet.
- **Masken-Falle:** `overflow-hidden` schneidet den Italic-Überhang des letzten Glyphs ab. Kompensation wie in `Hero.tsx` / `WordSlot.tsx`: `pr-[0.15em]` (ggf. plus negativer Margin). Vertikal: Montserrats Content-Box ist **1.299em** (ascent 1.024 + descent 0.275) — `leading-[1.3]` lässt also praktisch null Luft und die Maske schneidet oben ab. In Masken `leading-[1.5]` setzen (überschreibt das Token, weil `lineHeight` in Tailwind hinter `fontSize` steht).
- **`WordSlot` – drei Fallen, die alle drei zugeschlagen haben** (bitte nicht „vereinfachen"): (1) Die Maske ist ein Flex-Item → ohne `min-w-0` greift `min-width: auto` und eine animierte Breite kann die Inhaltsbreite nicht unterschreiten. (2) framer-motion tweent `width` nur mit bekanntem Ausgangswert — über das `animate`-Prop ohne vorher gesetzte Breite snappt es; deshalb läuft die Breite über einen `useMotionValue` + imperatives `animate()`. (3) Die Messhilfe-Kinder brauchen `w-fit`; als reine `block`-Elemente ziehen sie alle auf die Breite des längsten Wortes auf und jede Messung liefert denselben Wert.
- Animation: framer-motion (Stagger, AnimatePresence height-auto für Aufklappen), `MotionSection`-Wrapper, `Magnetic`-Hover. `MotionConfig reducedMotion="user"` in `SiteEffects` + globale `prefers-reduced-motion`-CSS — neue Animationen müssen nichts extra tun, aber nichts einbauen, das das umgeht.
- **Testimonial-Karten** (`Testimonials.tsx`): `border-white/10` + `bg-white/[0.035]` **ohne Radius** — außer den Pill-Buttons ist auf der Seite kein Kasten gerundet. **2×2 statt 3 Spalten**: bei vier Zitaten stünde das vierte sonst allein in einer zweiten Reihe, bei vier Spalten bricht jeder Satz sechsmal um. Die Karten einer Reihe sind über `h-full` gleich hoch, deshalb sitzt das Zitat in einem `flex-1 items-center`-Wrapper — sonst hinterlässt ein kurzes Zitat ein Loch über der Autorenzeile. **Bei anderer Anzahl Zitate die Spaltenzahl nachziehen.** ⚠️ Der Wortlaut der Zitate ist Fremdrede — nicht eigenmächtig kürzen oder glätten. Zum Ausblenden `items: []` → die Sektion gibt `null` zurück.
- ⚠️ **`LandingTestimonial.logo` braucht `width`/`height` — die Leinwandmaße der Datei**, nicht die Anzeigegröße: die Karte setzt `h-12 w-auto`, die Breite rechnet der Browser aus dem Seitenverhältnis. Höhe ist bei allen Dateien in `public/logos/` 240.
- ⚠️ **`initial={{ opacity: 0 }}` versteckt Inhalt schon im ausgelieferten HTML.** framer-motion schreibt `initial` als Inline-Style — der Inhalt ist bis zur Hydration unsichtbar. Above the fold ist das ein Ladefehler, kein Effekt: auf `/work` erschien die erste Kachelreihe erst nach 1,15 s. Regel: **oberhalb des Falzes nichts an die Hydration hängen** (`initial={false}`, siehe `ABOVE_THE_FOLD` in `WorkGrid.tsx`). Unterhalb ist `whileInView` weiter richtig.

## Scrollen (Lenis + Next.js) — nach den Bugfixes vom 10.08.2026

Zuständigkeiten, bitte nicht wieder vermischen:

| Wer | Wofür |
|---|---|
| **Next.js** | Vorwärtsnavigation (`scrollTop = 0`) und Anker-Sprünge (`scrollIntoView`) — beides in der Layout-Phase, also **vor** jedem `useEffect` |
| **Browser** | Wiederherstellung der Position bei Zurück/Vorwärts. Der App Router scrollt bei `popstate` bewusst gar nicht |
| **`SmoothScroll.tsx`** | nur Lenis verwalten: einfrieren vor der Navigation, neu vermessen danach. **Scrollt nicht selbst** (Ausnahme: der Deep-Link-Sprung beim ersten Laden und das Durchsetzen des Seitenanfangs bei Vorwärtsnavigation) |
| **`lib/scroll.ts`** | die eine Lenis-Instanz + gezählter Scroll-Lock (`lockScroll`/`unlockScroll` für Dialoge, `holdLenis` für kurze Pausen) |

- ⛔ **Nie wieder `window.scrollTo(0,0)` im `[pathname]`-Effekt und nie `history.scrollRestoration = "manual"`.** Genau das waren die drei gemeldeten Bugs: der Effekt läuft nach Nexts Scroll und überschrieb ihn (Anker-Links von Unterseiten landeten immer oben), und `"manual"` schaltet die einzige Instanz ab, die beim Zurückgehen die alte Position kennt.
- **`body { overflow: hidden }` hält Lenis nicht auf** — Lenis scrollt programmatisch. Ein Dialog muss `lockScroll()` benutzen, das zusätzlich `lenis.stop()` ruft. Zwei Dialoge gleichzeitig gehen nur über den Zähler.
- **Lenis' `reset()` ist privat** (bricht `tsc`). Der öffentliche Weg ist `stop()` — `scrollTo(y, { immediate: true })` ist es **nicht**: es steigt bei `target === targetScroll` vorzeitig aus und lässt eine laufende Animation weiterlaufen. Vor jedem Ziel `resize()`, sonst klemmt Lenis auf die alte Seitenhöhe (250 ms Debounce).
- `scroll-behavior: smooth` steht **nur** in `globals.css`; `<html>` trägt dazu `data-scroll-behavior="smooth"` — ohne das Attribut warnt Next 15 und hört ab Version 16 auf, die Eigenschaft bei Routenwechseln abzuschalten.
- `scroll-padding-top: 84px` (globals.css) hält Anker-Ziele unter dem 70 px hohen fixen Header frei. Derselbe Wert nochmal als `HEADER_OFFSET` in `lib/scroll.ts` — beide zusammen ändern.

## Harte Regeln

1. **Aller Content gehört in den Code.** (User-Entscheidung 10.08.2026: kein Sanity mehr, die Pflege läuft manuell — davor galt das nur außerhalb der Cases, davor das Gegenteil.) Neuer Text/neue Bilder gehen nach `lib/content/` (bzw. `lib/leistungen.ts` für die Leistungsseiten, `lib/content/cases.ts` für Referenzen), **kein CMS wieder einführen**. Weiter außerhalb von `lib/content/` hartcodiert und so gewollt: `lib/data.ts` (Navigation, Selected-Work-Grid), die Logo-Liste in `LogoBanner.tsx`, die Wortmarke `make/` selbst, die Stadt→Icon-Zuordnung in `Contact.tsx` und **VideoCheck.tsx komplett** (Quiz und Ergebnistexte, User-Entscheidung 07/2026 — nicht migrieren; die FAQ darin ist 07/2026 entfallen).
2. **Figma nur als Token-Quelle.** Niemals absolute Pixel-Positionen/Canvas-Koordinaten übernehmen (kein `position:absolute` mit top/left aus Figma). Layout mit Flex/Grid, rem/%, clamp().
3. **Bestehende Komponenten/Patterns wiederverwenden** statt neu bauen (Tokens, Misch-Typo-Muster, Swoosh, Pill-Buttons, Query-Pattern).
4. Nicht ungefragt committen/pushen.

## Fallstricke (schon passiert / leicht übersehen)

- Build ist grün trotz Typfehlern (`ignoreBuildErrors: true`) → immer `npx tsc --noEmit`.
- ⚠️ **Überlauf misst man am gerenderten Text, nicht an der Elementbox.** Ein `block`-Span füllt seine Spalte, während sein Text rechts herausläuft — `getBoundingClientRect()` meldet dann brav „passt". Genau so blieb der 78-px-Überlauf der h1 „Video/Produktion" bei 320 px unentdeckt, bis am 13.08.2026 über `Range.selectNodeContents(el).getClientRects()` gemessen wurde. Dasselbe gilt für `document.documentElement.scrollWidth`: der bleibt bei Viewportbreite, wenn irgendein Vorfahr `overflow-hidden` trägt — der Text ist dann trotzdem abgeschnitten. Für Mobil-Prüfungen also **immer Range-Rects**, und die Skripte aus dem Muster oben (Playwright + System-Chrome) über mehrere Breiten laufen lassen; 320/360/375/390/430 decken das Feld ab.
- **In `public/` gibt es seit 12.08.2026 keine Leerzeichen, Doppelpunkte und Großbuchstaben mehr** — alles klein, mit Bindestrichen. Vorher: zwei Ordner mit **Leerzeichen am Ende** (`icon `, `Leistungen Loops `), einer mit Leerzeichen (`Selected Work`), dazu `make:c_logo_icon.png` mit Doppelpunkt und `Makec_Reel 1.mp4`. Bilder, die zu einem Case oder einer Leistung gehören, heißen jetzt **wie deren Slug** (`selected-work/telekom.webp`, `leistungen/video-strategie.png`, `leistungen-loops/studiobau.mp4`). Das `encodeURI()` in `ServiceBlocks.tsx` ist damit entfallen. Bitte so halten.
- ⚠️ **Wer eine Bilddatei unter gleichem Namen neu schneidet, muss `.next/cache/images` löschen.** Nexts Optimizer cacht die abgeleiteten Varianten und liefert sie am Dev-Server weiter aus — man misst und sieht dann den Vorzustand, obwohl die Datei auf der Platte längst neu ist (14.08.2026 genau so passiert). Nebenbei: `img.naturalWidth` ist bei `srcset`/`sizes` **dichte-normalisiert**, also nicht die echte Pixelbreite — zum Prüfen `currentSrc` lesen, nicht `naturalWidth`.
- `NEXT_PUBLIC_*`-Env wird statisch inlined; Doc-IDs ohne Punkt — Details in `docs/MAINTENANCE.md`.
- **Metadata einer neuen Unterseite immer über `pageMetadata()`** aus `lib/seo.ts`, nie per Hand. Next merged `openGraph` **nicht** feldweise: eine Seite, die nur `title`/`description` setzt, erbt das komplette `openGraph` des Layouts — also og:title *und* og:url der **Startseite**. Genau das war bis 31.07.2026 auf `/work`, `/impressum` und `/datenschutz` der Fall (geteilte Links zeigten die Startseite).
- ⚠️ **Die Tab-Icons laufen über die Next-Dateikonventionen — `app/layout.tsx` hat deshalb bewusst *kein* `icons`-Feld** in der Metadata (13.08.2026). `app/icon.png` (512), `app/apple-icon.png` (180) und `app/favicon.ico` (16/32/48) verlinkt Next von selbst; ein `icons`-Feld hätte **Vorrang** und würde sie wieder abschalten. Genau das war vorher der Fall: alle drei Einträge zeigten auf `/makec-logo-icon.png`, die **Wortmarke** in 1921×1081 schwarz auf Weiß — im Tab ein weißer Balken mit unlesbarem Text. Die drei Dateien baut `node scripts/build-favicon.mjs` aus der Wortmarke (schneidet das „/c" heraus, invertiert, setzt es auf `#14140F`). `/makec-logo-icon.png` bleibt richtig als **Organisations-Logo in der JSON-LD** (`lib/seo.ts`) — dort will Google die Wortmarke, kein Signet. Nicht verwechseln.
- **OG-Bilder laufen über normale Routen (`/og`, `/leistungen/<slug>/og`), nicht über `opengraph-image.tsx`.** Grund: Nexts Dateikonvention gilt nur für ihr eigenes Segment und wird von Kindsegmenten mit eigenem `openGraph` verworfen — dabei lässt Next den Wert `"/opengraph-image"` in `openGraph.images` auch noch stillschweigend fallen. Verifiziert: mit der Konvention hatten `/work`, `/impressum`, `/datenschutz`, `/leistungen` **kein** og:image. Also `ogImage` in `pageMetadata()` explizit setzen und im ausgelieferten HTML prüfen.
- **SEO/GEO-Schalter:** `NEXT_PUBLIC_SEO_INDEX` steuert `robots` im Layout **und** `app/robots.ts`. Ohne die Variable ist die Seite `noindex` und `Disallow: /` — Zustand bis zum Go-Live. Zum Freischalten `NEXT_PUBLIC_SEO_INDEX=true` **plus** `NEXT_PUBLIC_SITE_URL=https://<echte-domain>` setzen und **neu deployen** (build-time inlined!). Die frühere statische `public/robots.txt` wurde entfernt — eine Datei in `public/` gewinnt gegen den gleichnamigen Route Handler und hätte `app/robots.ts` wirkungslos gemacht. Nicht wieder anlegen.
- Leistungs-Detailseiten liegen unter **`/leistungen/[slug]`** (nicht `/services/…`). Ihr Text kommt aus `lib/leistungen.ts`, das Bild (Fallback, wenn es kein Loop-Video gibt) aus `lib/content/services.ts`. **Zwei Listen mit denselben Slugs**: `SERVICE_PAGES` (`lib/leistungen.ts`) und `SERVICES` (`lib/content/services.ts`) — weicht ein Slug ab, verlinkt die Kachel auf eine 404. Das prüft kein Typ, nur der Blick.
- Die Loop-Videos liegen unter `public/leistungen-loops/<leistungs-slug>.mp4`, dazu je ein `-poster.webp`. **Alle sechs sind 1280×720 (16:9)**. Auf der Detailseite läuft der Loop seit 12.08.2026 als **Header** (`ServiceHero`), nicht mehr im Medienrahmen von `ServiceBlocks` — dort steht jetzt ein Set-Foto. Das Poster leiten alle Stellen über `loopPoster()` (`lib/leistungen.ts`) aus dem Videonamen ab, es steht bewusst nicht als zweites Datenfeld daneben.
- ⚠️ **Das Header-Band beschneidet nur von unten** (`object-top`, `md:aspect-[2/1] lg:aspect-[21/9]`, auf Mobil volles `aspect-video`). Grund: **der Studiobau-Loop trägt „FULLY FLEXIBLE" ab etwa 13 % Bildhöhe.** Ein mittiger Beschnitt (`object-center`) oder ein Höhendeckel per `max-h`/vh schneidet die Oberkante der Lettern an — bei 21:9 mittig gerechnet nur zwei Prozentpunkte Reserve. Unten kostet der Beschnitt nichts: dort liegen der Verlauf und die H1. **Wer das Band flacher will, muss `object-top` behalten.**
- **Zwei Gates, beide von Hand:** `npx tsc --noEmit` und `npm run lint`. Der Build prüft nichts (`ignoreBuildErrors` + `ignoreDuringBuilds`) — das bleibt bewusst so, damit ein Lint-Fund kein Deploy blockiert. `npm run lint` ruft seit 11.08.2026 **direkt die ESLint-CLI** (`eslint . --ext …`), nicht `next lint`: das ist in Next 16 entfernt. Config: `.eslintrc.json` (`next/core-web-vitals` + `next/typescript`). `next-env.d.ts` steht in `ignorePatterns` — die Datei ist generiert, und die CLI beanstandet ohne das ihre Triple-Slash-Referenz.
- ⚠️ **`prefers-reduced-motion` deckt `<video autoplay>` nicht ab.** Die globale Regel in `globals.css` kürzt nur CSS-Animationen und Übergänge. `LazyVideo` prüft die Einstellung deshalb seit 12.08.2026 selbst und lädt dann gar nicht erst — dann steht nur das Poster. Wer ein neues Autoplay-Video einbaut, muss dasselbe tun.
- **Derselbe Loop läuft an zwei Stellen:** als Header der Detailseite (`ServiceHero`) und seit 12.08.2026 auch in der Kachel der Startseite (`ServiceList`). Beide holen den Pfad aus `SERVICE_PAGES[].loopVideo` — `ServiceList` über `getServicePage(slug)`, damit er nur an einer Stelle steht. Das Poster leiten beide über `loopPoster()` (`lib/leistungen.ts`) ab. ⚠️ Die Kachel behält `aspect-[730/462]`, **nicht** `aspect-video`: die Headline überlappt die Bildkante bei 40,5 %, und diese Überlappung ist auf genau dieses Format eingestellt. Der 16:9-Loop verliert dort oben und unten zusammen rund 11 % — trägt `object-cover` unauffällig.
- **Der Anker `#service` ist seit 10.08.2026 ein Navigationsziel, kein Dekor.** Er sitzt an `MotionSection` in `ServiceList.tsx` und ist das Ziel von: Header-Nav und Seitenmenü (`lib/data.ts`), der Brotkrume aller sechs Detailseiten (`ServiceHero.tsx` + `breadcrumbGraph` in `app/leistungen/[slug]/page.tsx`), der 404-Seite und der Weiterleitung von `/leistungen`. Wer die id umbenennt oder `ServiceList` von der Startseite nimmt, bricht alle fünf Stellen — das prüft kein Typ.
- `scripts/` hält die Generatoren und ihre Rohdaten: `extract-portfolio.ts`, `build-case-images.ts`, `generate-cases.ts` (Referenzen-Import 08/2026) und **`build-logo-banner.mjs`** (Kundenlogos) und **`build-service-loops.mjs`** (Loop-Videos der Leistungsseiten) und **`build-service-images.mjs`** (Set-Fotos der Leistungsseiten, zwei je Seite — die Zuordnung Motiv → Leistung steht als `MAPPING` **nur** in diesem Skript), alle drei 12.08.2026, dazu **`build-favicon.mjs`** (Tab-Icons aus der Wortmarke, 13.08.2026 — ⚠️ die Zuschnittkante `CROP_X = 1404` ist an `public/makec-logo-icon.png` gemessen und gilt nur für diese Datei). Rohdaten liegen in `scripts/data/` (u. a. `logos-white/`) und — für die schweren Originale — in **`assets/masters/`**, das gitignored ist. ⚠️ Die fünf Sanity-Skripte für Landing/Services/Legal/Bild-Upload/ID-Migration sind am 31.07.2026 entfernt worden; nicht aus der Git-Historie zurückholen, sie schrieben auf Dokumenttypen, die es nicht mehr gibt.

## Weitere Doku (`docs/`)

- `CHANGELOG.md` — **das Änderungsprotokoll** (alle „Erledigt"-Blöcke von 07/2026 bis 12.08.2026). Am 13.08.2026 aus `CLAUDE.md` ausgelagert, wo es die Hälfte der Datei ausmachte. Archiv zum Nachschlagen — was daraus noch gilt, steht oben in „Offene Punkte", „Design-System" und „Fallstricke".
- `HANDOVER.md` — **Übergabe**: Landingpage-Umbau, SEO-Nachbesserung, Sanity-Reduktion (30./31.07.2026) und der Referenzen-Import samt CMS-Ausbau (10.08.2026). Zuerst lesen, solange nichts committet ist.
- `PROJECT_OVERVIEW.md` — ⚠️ **stark veraltet, mit Vorsicht lesen.** Beschreibt den Stand *vor* dem Umbau vom 30.07.2026: `ServiceAccordion`, `InsightGeneration`, `QuestionsEntry`, `BudgetTool`, `/services/[slug]` und „landingPage/service/siteSettings aus Sanity" existieren so alle nicht mehr. Die Verzeichnisstruktur und die Design-Abschnitte stimmen noch grob.
- `MAINTENANCE.md` — Deploy- und Env-Betriebswissen. `SANITY_CMS.md` ist am 10.08.2026 mit dem CMS entfallen.
- `DESIGN_GUIDELINES.md` — Marken-Basics; die verbindliche Token-Definition ist `tailwind.config.ts` (dieses Dokument kennt die neue Typo-Scale noch nicht)

## Offene Punkte (Stand 12.08.2026)

- 🟡 **Die Leistungsseite `studiobau` zeigt nur zwei statt drei Cases.** `shop-apotheke-produktvideos` (2020) und `zeg-tv-spot` (2021) sind mit dem 2022-Schnitt entfallen, und unter den 31 Referenzen baut make/c nur bei `db-schenker` und `fom-studio` ein Studio **für den Kunden**. Alles andere wäre bloß „in einem Studio gedreht" — eine andere Leistung. Das Raster (`sm:grid-cols-2 lg:grid-cols-3`) trägt zwei Kacheln sauber. Sobald es einen echten Studiobau-Case ab 2022 gibt, gehört er in `SERVICE_PAGES[].caseSlugs`. ⚠️ Zweiter Haken: `fom-studio` ist einer der drei Platzhalter-Cases, steht also mit „Platzhalter — Beschreibung folgt." auch auf dieser Leistungsseite.
- ~~🟡 33 verwaiste Case-Bilder in `public/work/`~~ Erledigt 12.08.2026: nach `assets/_unused/work/` verschoben (nicht gelöscht — `public/work/` war nie in git).
- ⚠️ **Der Strategie-Loop enthält einen Tippfehler:** in der animierten Liste steht **„Artificial Itelligence"** statt „Intelligence", mehrfach und gut lesbar. ⚠️ **Seit 12.08.2026 wiegt das schwerer:** der Loop steht als Header ganz oben auf `/leistungen/video-strategie` und läuft zusätzlich in der Kachel der Startseite — der Tippfehler ist damit an prominentester Stelle. Das lässt sich nur in der Videoquelle beheben — danach `node scripts/build-service-loops.mjs`. Zweitens ist dieser Loop als einziger **hellblau**, die anderen fünf sind dunkel; ob das gewollt ist, entscheidet ihr.
- 🔴 **Drei Platzhalter-Cases stehen in der ersten Reihe von `/work`** (`telekom`, `fom-studio`, `barmenia-gothaer`, seit 11.08.2026). Sichtbar ist „Platzhalter — Beschreibung folgt." Das ist Absicht: erfundene Projektbeschreibungen über echte Kunden wären schlimmer als ein sichtbarer Platzhalter (dieselbe Logik wie bei den Lorem-ipsum-Testimonials). **Vor Go-Live zwingend ersetzen:** `summary`, `year` (ungeprüft auf 2026), dazu optional `video`, `credits`, `services`. Ein Kommentarblock in `lib/content/cases.ts` markiert die Stelle. `summary` speist zusätzlich die `CreativeWork.description` in der `ItemList` von `/work` — der Platzhalter steht also auch in den strukturierten Daten. Aktuell folgenlos (`NEXT_PUBLIC_SEO_INDEX` ist aus → `noindex` + `Disallow: /`), aber genau deshalb vor dem Freischalten prüfen.
- **`npm audit`: 11 Meldungen, davon 4 im Produktionsbaum** (`next` selbst, dazu `postcss`, `sharp`, `nanoid` über Next). **Die praktische Angriffsfläche ist hier nahe null** — nachgeprüft: es gibt **keine Middleware** (der „Middleware/Proxy bypass" greift also nicht) und **keine dynamische Route** (alles prerendert, der „DoS with Server Components" braucht eine Render-Pipeline zur Laufzeit); `postcss`/`sharp`/`nanoid` laufen nur zur Build-Zeit und landen nie im Browser. Trotzdem vor dem Go-Live erledigen: `npm audit fix` reicht, der Sprung ist **15.5.15 → 15.5.23**, also semver-verträglich. Danach `npx tsc --noEmit`, `npm run lint`, `npm run build` und `npm run e2e` — mehr Absicherung braucht es dafür nicht.
- ⚠️ **`backup-landing-rebuild-20260730.tar.gz` (16 MB) liegt noch im Projektordner** — der vollständige Sanity-Dataset-Export vom 30.07.2026, gitignored und deshalb bei allen Aufräumrunden übersehen. Die letzte echte Sanity-Altlast auf der Platte. Löschbar, sobald du sicher bist, dass du das Cloud-Projekt nicht mehr brauchst.
- ~~**13,7 MB unreferenzierte Bilder in `public/`**~~ Erledigt 12.08.2026 mit dem großen Aufräumen: `public/` ist von 70 auf 29 MB geschrumpft, **0 Dateien ohne Referenz**. Was übrig blieb, liegt in `assets/` (gitignored). `Kontakt_Guy.webp`, „Budget tool/" und `Team Bild1.JPG` hatte der User zwischenzeitlich selbst entfernt.
- **Die Startseite bleibt der schwerste Brocken:** `header-video.mp4` wiegt 2,89 MB und ist das Video hinter dem Hero. Dazu `showreel.mp4` mit **12,2 MB** — das lädt zwar erst auf Klick, ist aber die mit Abstand größte Datei im Projekt und ein lohnendes Ziel für dieselbe Behandlung wie die Loops (`scripts/build-service-loops.mjs` zeigt das Muster: −85 % bei praktisch gleichem Bild). `/work` 0,39 MB, Leistungsseite ~0,9 MB inkl. Loop. ⚠️ Die zwei Set-Fotos vom 12.08.2026 kosten **+0,22 MB** — am Dev-Server gemessen und deshalb nur als Medienlast belastbar (Loop 0,40 MB + Fotos 0,22 MB); die Gesamtzahl der Seite stammt aus einem Production-Build und wurde seither nicht neu erhoben. Die 1600-px-Quellen schlagen nicht voll durch, weil `next/image` passende Varianten ausliefert.
- `docs/PROJECT_OVERVIEW.md` ist weiter stark veraltet (siehe unten).
- ⚠️ **Die Guide-Zuordnung im Video-Strategie-Check ist gegenläufig zur Punktzahl — bitte gegenlesen.** Der User hat sie beim Liefern der PDFs andersherum beschrieben („die nächste Stufe ist für mehr als 5 Punkte"); eingebaut ist die Zuordnung nach **Inhalt**, weil im Quiz **viele Punkte = viel Bedarf** heißt (`score: 0` = gut abgedeckt). „Die nächste Stufe" richtet sich laut Deckblatt ausdrücklich an „gut aufgestellte Unternehmen" und behandelt Serienformate, Skalierung, KI und Distribution — das passt zum **niedrigen** Score. „Videos, die wirken" behandelt Briefing, Rhythmus, Kanalwahl und Messung — das passt zum **hohen** Score. Tauschen geht über die beiden `guide`-Blöcke in `VideoCheck.tsx`, nicht über die Schwelle.
- ~~⚠️ **Zwei verschiedene Telefonnummern auf der Seite.**~~ Erledigt 13.08.2026: der User hat auf **eine** Nummer vereinheitlicht, `+49 221 456 76390`. Sie steht an genau **zwei** Stellen im Code — `ORG.telephone` (`lib/seo.ts`, speist Kontakt-Sektion, Organization-Knoten und Köln-`Place`) und der Impressums-Block in `lib/content/legal.ts` (dort mit „Fon: " davor). **Beide zusammen ändern**, das prüft kein Typ. Die frühere Mobilnummer `+49 178 8800035` und die alte Impressums-Nummer `+49 221 – 4 56 – 7 62 12` kommen nirgends mehr vor; die Ortsvorwahl am Köln-Knoten passt jetzt auch geografisch.
- **LinkedIn-Firmenseite läuft über die numerische ID** (`.../company/7263738/`), abgeleitet aus der vom User gelieferten Admin-URL. LinkedIn leitet auf den Vanity-Namen weiter; der frühere geratene Slug `make-c-video-content-marketing-gmbh` ist raus. Wenn der echte Vanity-Name bekannt ist, in `ORG.linkedin` eintragen — von dort ziehen Footer **und** `sameAs`.
- **Kein Verweis auf `/llms.txt` in der `robots.txt`.** Nexts `MetadataRoute.Robots` kennt kein Feld dafür und serialisiert keine Kommentare — es gäbe ihn nur, wenn `app/robots.ts` durch einen Text-Route-Handler ersetzt würde. Dafür ist der Nutzen zu klein: es gibt keine standardisierte Direktive, kein Crawler liest robots-Kommentare, und die Auffindbarkeit läuft ohnehin über den Konventionspfad `/llms.txt` (erreichbar und per `Allow: /` erlaubt). Bewusst offen gelassen.
- **Die Übersichtsseite `/leistungen` ist entfallen (User-Entscheidung 10.08.2026).** Begründung des Users: die Leistungen stehen auf der Startseite, die Zwischenseite war eine Ebene zu viel. Was dabei geprüft wurde: die Seite war **kein** Duplikat (nur der Kachelblock war wortgleich mit der Startseite, 309 Zeichen; 65 von 109 Wörtern kamen dort nicht vor), aber sie listete die sechs Leistungen **auf sich selbst zweimal** (Bildkacheln + „Im Überblick") und hatte mit ~1.900 Zeichen wenig Substanz. Ich hatte zum Behalten geraten — sie war die Brotkrumen-Elternebene aller sechs Detailseiten und mit 12 Links deren stärkster interner Verteiler. Der User hat anders entschieden; die Ebene liegt jetzt auf dem Anker `/#service`. **Falls sie je zurückkommt:** `git show` auf `app/leistungen/page.tsx`, dazu Sitemap-Eintrag, `llms.txt`, den Redirect in `next.config.ts` und die Nav-Links in `lib/data.ts` zurückdrehen.
- **Zwei latente Sichtbarkeits-Fallen, bewusst nicht angefasst** (gemessen, treten aktuell nicht ein): (1) `MotionSection` reicht `viewport={{ amount: 0.25 }}` ungeprüft als IntersectionObserver-`threshold` durch — eine Sektion, die höher als das Vierfache des Viewports wird, erreicht den Schwellwert nie und bleibt dauerhaft auf `opacity: 0`. Die höchste Sektion liegt bei 3,32× (Leistungen auf `/`), also noch mit Reserve. Wer dort Inhalt ergänzt, muss nachmessen oder auf `amount: "some"` wechseln. (2) Die Landing-H1 und alle acht `MotionSection`-Sektionen stehen mit `opacity:0` im HTML und hängen an der Hydration — anders als auf `/work` ist das dort eine gewollte Intro-Animation und wurde deshalb belassen.
- **Nachlauf nach einer Navigation:** Trackpad-Momentum, das nach dem Klick noch eintrifft, wird 400 ms lang geschluckt (`SETTLE_MS` in `SmoothScroll.tsx`). Im Extremfall (Klick ohne Pause nach der Wischbewegung, 1,2 s Nachlauf) bleiben gemessen 276 px Restversatz. Längeres Warten würde ein absichtliches Scrollen direkt nach dem Klick verschlucken — bewusst so.
- Die Cases haben seit der Modal-Umstellung (`b890bf9`) **keine eigenen URLs**: 31 Inhalte, 0 indexierbare Seiten — der größte strukturelle SEO-Verlust, aber eine Produktentscheidung. `/work` zeichnet sie als `CollectionPage`/`ItemList` (ohne `url`) aus. Falls das je gedreht wird: `/work/[slug]` wäre aus `CASES` heraus trivial zu bauen (`generateStaticParams` über die Slugs), und die Texte sind jetzt lang genug, dass sich eigene Seiten lohnen.
- **Echte Gotham-Fontdateien fehlen weiterhin** — Montserrat läuft als Ersatz unter `--font-gotham`, der Austausch passiert allein in `app/layout.tsx`.
- **Die Texte der sechs Leistungsseiten wollen fachlich gegengelesen werden** (`lib/leistungen.ts`): Dauern, Ablauf und die Preisaussagen in den FAQ.
- **Case Studies außer `merkur`:** `headline`, `introHeading`, `credits` und Galerie-Bilder sind noch zu pflegen.
- ⚠️ **Die Zuordnung Set-Foto → Leistung ist eine Ermessensfrage.** Für **Motion Design** und **AI** gibt es unter den zwölf Fotos kein wörtlich passendes Motiv; dort ist nach Bildwirkung sortiert. Zum Tauschen die Dateinamen im `MAPPING` von `scripts/build-service-images.mjs` vertauschen und das Skript neu laufen lassen — die Pfade in `lib/leistungen.ts` bleiben unverändert.
- **Die sechs Platzhalter-PNGs liegen noch in `public/leistungen/`** und `SERVICES[].image` zeigt darauf, **gerendert wird beides nicht mehr** (deshalb ist `image` optional geworden). Wer die Dateien entfernt, löscht am jeweiligen Eintrag in `lib/content/services.ts` auch das `image`-Feld — sonst zeigen tote Pfade in den Code.
- Bewusst **nicht** ausgezeichnet: `AggregateRating`/`Review` — auch mit den echten Zitaten seit 12.08.2026. Zwei Gründe: die Zitate tragen keine Bewertung (`AggregateRating` bräuchte Zahlen, die es nicht gibt), und Bewertungen, die ein Unternehmen über sich selbst ausgibt, sind bei Google seit 2019 von Review-Rich-Results ausgeschlossen. Das änderte sich erst mit Bewertungen samt Skala von einer unabhängigen Plattform.

