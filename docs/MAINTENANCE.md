# Wartung, Deployment & wichtige Lektionen

Diese Datei hält das operative Projektwissen fest, das **nicht** aus dem Code allein
ersichtlich ist – damit es bei einem neuen Chat / neuen Entwickler nicht verloren geht.

> Stand: 2026-08-10 · Live: <https://make-c-website.vercel.app> · GitHub:
> `Waffelhaffel/-make-c-website`

---

## 1. Eckdaten

| Was | Wert |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| CMS | **keins** – der gesamte Inhalt liegt im Repo (`lib/content/`, `lib/leistungen.ts`, `lib/data.ts`) |
| Rendering | vollständig statisch, keine Route hat `revalidate`, kein Fetch zur Laufzeit |
| Hosting | Vercel (Auto-Deploy bei Push auf `main`) |

Sanity wurde am 10.08.2026 entfernt (User-Entscheidung: „lohnt sich nicht, wir pflegen
manuell"). Was dabei wegfiel: `sanity/`, `app/studio/`, `sanity.config.ts`, `sanity.cli.ts`,
die Seed-Skripte, `docs/SANITY_CMS.md`, fünf Env-Variablen und die Pakete `sanity`,
`next-sanity`, `@sanity/vision`, `@sanity/image-url`, `styled-components`.

> Das Sanity-Projekt in der Cloud (`ppeo9yox`, Dataset `production`) besteht unangetastet
> weiter — es wird nur von nichts mehr gelesen. Wer es endgültig loswerden will, löscht es
> selbst unter sanity.io/manage. Die Alt-Inhalte sind vollständig ins Repo übernommen.

---

## 2. Environment-Variablen (Vercel + lokal)

Vollständig dokumentiert in [`.env.example`](../.env.example). Es gibt nur noch zwei, beide
für SEO – **die Seite rendert auch ganz ohne sie** (dann `noindex` und Fallback-Domain):

```
NEXT_PUBLIC_SITE_URL   = https://<echte-domain>
NEXT_PUBLIC_SEO_INDEX  = true
```

> ⚠️ `NEXT_PUBLIC_*` werden zur **Build-Zeit** eingebettet. Nach dem Setzen/Ändern auf
> Vercel **immer neu deployen**, sonst greifen die Werte nicht.

Die fünf `*SANITY*`-Variablen sind am **11.08.2026 aus der lokalen `.env.local`
entfernt** — sie wurden von nichts mehr gelesen. Die Datei war nie committet, es
gibt also keinen Token in der git-Historie.

> ⚠️ **Zwei Dinge sind damit noch nicht erledigt** und brauchen dich:
> 1. **Auf Vercel** stehen die fünf Variablen vermutlich noch → Settings →
>    Environment Variables löschen.
> 2. **Die Tokens gelten weiter, bis sie widerrufen sind.** Besonders
>    `SANITY_API_WRITE_TOKEN` — ein Schreibrecht auf das Dataset, das niemand mehr
>    braucht. Widerrufen unter sanity.io/manage → Projekt `ppeo9yox` → API → Tokens.

---

## 3. Wichtige Lektionen / Stolperfallen (unbedingt beachten)

### 3.1 `NEXT_PUBLIC_*` nur STATISCH lesen

```ts
process.env.NEXT_PUBLIC_SITE_URL   // ✅ wird in den Client-Bundle eingebettet
process.env[key]                   // ❌ im Browser undefined!
```

Next.js inlined `NEXT_PUBLIC_*` nur bei statischem Zugriff; dynamischer Zugriff funktioniert
nur serverseitig. Das kostete früher einen halben Tag, als das eingebettete Studio deshalb
auf den Platzhalter `missing-project-id` fiel.

### 3.2 Inhalt ändern heißt committen

Es gibt keine Redaktionsoberfläche mehr. Jede Text- oder Bildänderung ist ein Commit und
ein Deploy — dafür ist sie sofort sichtbar, ohne ISR-Wartezeit.

- Referenzen: [`lib/content/cases.ts`](../lib/content/cases.ts) (60 Stück, Array-Reihenfolge
  = Reihenfolge auf `/work`), Bilder unter `public/work/<slug>.webp`.
- Landing: [`lib/content/landing.ts`](../lib/content/landing.ts) · Leistungsseiten:
  [`lib/leistungen.ts`](../lib/leistungen.ts) · Header/Footer:
  [`lib/content/site.ts`](../lib/content/site.ts) · Legal:
  [`lib/content/legal.ts`](../lib/content/legal.ts) (Portable Text, gerendert über
  `@portabletext/react` — deshalb bleibt das Paket).
- NAP-Daten, Telefon und Social-URLs stehen **nur** in `ORG` ([`lib/seo.ts`](../lib/seo.ts))
  und werden von Footer und JSON-LD abgeleitet.

### 3.3 Slug-Referenzen prüft kein Typ

`SELECTED_WORK` (`lib/data.ts`) und `SERVICE_PAGES[].caseSlugs` (`lib/leistungen.ts`)
zeigen per String auf `CASES`. Unbekannte Slugs fallen **still** weg: die Landing-Kachel
wird dann nicht klickbar, die Leistungsseite zeigt weniger als drei Cases. Beim Umbenennen
eines Case-Slugs also beide Stellen mitziehen.

### 3.4 Bilder

Alles liegt in `public/`; `next/image` optimiert selbst. `next.config.ts` hat **keine**
`images.remotePatterns` mehr — ein `<Image src="https://…">` würde zur Laufzeit werfen.
Erst wieder eintragen, wenn tatsächlich eine externe Quelle dazukommt.

### 3.5 Video-URLs in Cases

`CaseStudy.video` erwartet die **Watch-Form** (`https://vimeo.com/<id>` oder
`https://www.youtube.com/watch?v=<id>`). `VideoFacade.toEmbedUrl()` erkennt die
`…/embed/<id>`-Form nicht und öffnet sie stattdessen in einem neuen Tab.

---

## 4. Deployment-Workflow

1. Änderungen committen und auf `main` pushen → Vercel deployt automatisch.
2. Lokaler Produktions-Check vor dem Push:
   ```sh
   npx tsc --noEmit && npm run build && npm run start
   ```
   `npx tsc --noEmit` ist Pflicht: `next.config.ts` setzt `ignoreBuildErrors` **und**
   `ignoreDuringBuilds`, der Build ist also auch mit Typfehlern grün.
3. Env-Var auf Vercel geändert? → **Redeploy** nötig (NEXT_PUBLIC ist build-time).
4. Status der Deployments: GitHub → Deployments, oder Vercel-Dashboard.

---

## 5. Changelog

**08/2026 — Referenzen in den Code, CMS raus**
- 58 Projekte aus der alten Portfolio-Seite importiert (Texte, Jahre, Videos, Credits von
  den Detailseiten auf make-c.de), zusammen mit `merkur` und `aldi` aus dem CMS →
  60 Cases in `lib/content/cases.ts`. Die 12 `referenzprojekt-*`-Platzhalter sind weg.
- `/work` mit Kategorie-Filterleiste; alle sechs Leistungsseiten zeigen echte Cases.
- Sanity vollständig entfernt, Build vollständig statisch.

**06/2026 — Aufräumen und Stabilisierung**
- Code-Cleanup: ungenutzte Komponenten (VideoEngine/VideoSystem/OperatingModel/
  Leadership/LiquidDistortion), tote `lib/data.ts`-Exports und Dependencies (`clsx`,
  `tailwind-merge`) entfernt.
- Kontakt-Sektion neu: Formular ersetzt durch Ansprechpartner-Bild + Telefon + E-Mail,
  plus schwebender CTA ([`FloatingContact`](../components/ui/FloatingContact.tsx)).
- 404-Fix Impressum/Datenschutz/Services: Dokument-IDs Punkt → Bindestrich migriert.
  (Historisch: Sanity las den Teil vor dem ersten Punkt einer `_id` als Bundle-Prefix,
  `legalPage.impressum` war dadurch nie im veröffentlichten Layer.)
- Robuste Env-Config für stabile Vercel-Builds.

---

## 6. Verwandte Docs
- [`HANDOVER.md`](./HANDOVER.md)
- [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) — ⚠️ stark veraltet
- [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md)
