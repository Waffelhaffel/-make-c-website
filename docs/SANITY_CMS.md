# make/c — Sanity CMS Dokumentation

> **Stand 31.07.2026.** Zwei Einschränkungen zu diesem Dokument:
> 1. Zwischen 06/2026 und 31.07.2026 lagen auch Landing, Leistungen, Site-Settings und die
>    Legal-Seiten in Sanity. Das ist zurückgenommen — „ausschließlich Case Studies" stimmt
>    wieder. Der übrige Inhalt liegt in `lib/content/` und `lib/leistungen.ts`.
> 2. **Die Case-Detailseiten `/work/[slug]` gibt es nicht mehr** (Commit `b890bf9`, Umstellung
>    auf Modal-Fenster). Die Abschnitte „Einzelne Case Study" und „Alle Slugs (für Static
>    Generation)" beschreiben deshalb Queries, die im Code nicht existieren — sie sind
>    historisch. Aktuell gibt es genau drei Queries, siehe `sanity/lib/queries.ts`.

## Übersicht

Das Projekt nutzt **Sanity v5** als Headless CMS. Der Inhalt, der über Sanity verwaltet wird, sind ausschließlich die **Case Studies** (Fallstudien / Work-Projekte).

- **Studio-URL:** `/studio` (im Browser erreichbar)
- **API-Version:** `2024-10-01`
- **Dataset:** wird über `NEXT_PUBLIC_SANITY_DATASET` gesetzt

---

## Sanity Studio Setup

```typescript
// sanity.config.ts
defineConfig({
  name: "make-c",
  title: "make/c Studio",
  basePath: "/studio",         // Erreichbar unter /studio
  plugins: [
    structureTool({ structure }),
    visionTool(),              // GROQ-Query-Tool für Entwickler
  ],
})
```

Das Studio ist **direkt in die Next.js-App eingebettet** (`app/studio/layout.tsx`) und damit kein separates Deployment nötig.

---

## Daten-Schema

### Dokument: `caseStudy`

Das einzige Dokument-Typ im CMS. Jede Case Study hat drei Gruppen:

| Gruppe | Felder |
|---|---|
| **Inhalt** | title, slug, kicker, project, headline, intro, summary, services, projectMeta, solution, cta |
| **Medien** | heroImage, mainMedia, gallery, thumbnailImage |
| **Meta & SEO** | order, featured, seo |

---

### Alle Felder im Detail

#### Grundfelder
| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `title` | string | Ja | Interner Titel, nur im Studio sichtbar (z. B. „Merkur Powerclip 2024") |
| `slug` | slug | Ja | URL-Segment, auto-generiert aus `title` |
| `order` | number | — | Reihenfolge auf /work (kleiner = weiter oben), Standard: 100 |
| `featured` | boolean | — | Ob auf /work angezeigt wird, Standard: `true` |
| `kicker` | string | — | Kleiner Kopfzeilen-Text, z. B. „Case Merkur" |
| `project` | string | Ja | Projektname, z. B. „Powerclip Campaign" |

#### Inhaltsfelder
| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `headline` | `headline` (Objekt) | Ja | Hero-Headline (zweiteilig: lead + impact) |
| `intro` | text | — | Kurzer Einleitungssatz, SEO-Fallback |
| `summary` | text | Ja | Ausführliche Projektbeschreibung |
| `services` | array[string] | — | Service-Tags, z. B. „Video Produktion", „Postproduktion" |
| `projectMeta` | `projectMeta` (Objekt) | Ja | Kunde, Jahr, Kategorie, Studio-Label |

#### Medienfelder
| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `heroImage` | image | Ja | Großes Headerbild der Case Study |
| `mainMedia` | `mainMedia` (Objekt) | Ja | Hauptvideo mit Poster-Bild |
| `gallery` | array[galleryItem] | — | Optionale Bildergalerie |
| `thumbnailImage` | image | — | Thumbnail für /work-Grid, Fallback: heroImage |

#### Weitere Sektionen
| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `solution` | `solutionSection` (Objekt) | Ja | „Die Lösung"-Sektion mit Heading, Text, 2 Bildern |
| `cta` | `ctaSection` (Objekt) | Ja | Call-to-Action am Ende |
| `seo` | `seo` (Objekt) | — | Meta-Title, Meta-Description, OG-Image |

---

## Objekt-Typen

### `headline`
Zweiteilige Hero-Überschrift. Das erste Teil (`lead`) wird in Garamond kursiv gerendert, das zweite (`impact`) als massive Gotham-Bold-Italic-Headline.

```
lead:   "We shot the spot."  → klein, Garamond, kursiv
impact: "POWERCLIP"          → groß, fett, uppercase
```

### `projectMeta`
Meta-Informationen, die in einer 2×2-Grid-Box angezeigt werden:
```
Kunde    | Jahr
Kategorie| Studio (optional)
```

| Feld | Beschreibung |
|---|---|
| `client` | Kundenname |
| `year` | Jahr, z. B. „2024" |
| `category` | Projektkategorie, z. B. „Brand Campaign / Social Video" |
| `studio` | Studio-Label, z. B. „2024–2025 Video Production" |

### `mainMedia`
Hauptvideo der Case Study:
| Feld | Beschreibung |
|---|---|
| `posterImage` | Vorschaubild für den Video-Frame |
| `videoUrl` | Externer Video-Link (Vimeo, YouTube etc.) |

### `solutionSection`
Die „Lösung"-Sektion der Case Study:
| Feld | Beschreibung |
|---|---|
| `heading` | Z. B. „the Solution." — letztes Wort wird blau in Garamond gerendert |
| `body` | Beschreibungstext |
| `imageLeft` | Linkes Bild (16:10 Seitenverhältnis) |
| `imageRight` | Rechtes Bild |
| `footerLabel` | Kleiner Text rechts unten, z. B. „2024–2025 Video Produktion" |

### `ctaSection`
Call-to-Action am Ende jeder Case Study:
| Feld | Beschreibung |
|---|---|
| `title` | Großer CTA-Titel (in Garamond italic) |
| `text` | Begleittext |
| `mail` | E-Mail-Adresse als klickbarer Link |

### `galleryItem`
| Feld | Beschreibung |
|---|---|
| `ratio` | Seitenverhältnis des Bildes |
| `image` | Sanity-Image mit Alt-Text |

### `seo`
| Feld | Beschreibung |
|---|---|
| `metaTitle` | SEO-Seitentitel |
| `metaDescription` | Meta-Beschreibung |
| `ogImage` | Open Graph Bild |

---

## GROQ Queries

### Alle Case Studies (für /work)
```groq
*[_type == "caseStudy" && (featured == true || !defined(featured))]
  | order(coalesce(order, 100) asc, _createdAt desc)
{
  _id, title, project, "slug": slug.current,
  projectMeta, thumbnailImage, heroImage
}
```

### Einzelne Case Study (für /work/[slug])
```groq
*[_type == "caseStudy" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, kicker, project,
  intro, summary, services, projectMeta, headline,
  heroImage, mainMedia, solution, gallery, cta,
  thumbnailImage, seo
}
```

### Alle Slugs (für Static Generation)
```groq
*[_type == "caseStudy" && defined(slug.current)][].slug.current
```

---

## Daten-Fetching in Next.js

```typescript
// sanity/lib/fetch.ts — gecachtes Fetching mit ISR
import { sanityFetch } from "@/sanity/lib/fetch";

const data = await sanityFetch<CaseStudy>({
  query: CASE_STUDY_BY_SLUG_QUERY,
  params: { slug },
  tags: ["caseStudy"],
});
```

- **Revalidation:** `/work`-Seite revalidiert alle **60 Sekunden** (`export const revalidate = 60`)
- **Cache-Tags:** `["caseStudy"]` — ermöglicht gezielte Cache-Invalidierung

---

## Bild-Handling

```typescript
// sanity/lib/image.ts
import { urlFor } from "@/sanity/lib/image";

urlFor(image).width(2000).auto("format").quality(80).url()
```

- **Auto-Format:** Sanity liefert WebP/AVIF je nach Browser-Support
- **Hotspot:** Alle Images haben Hotspot-Unterstützung (Zuschnitt-Fokuspunkt)
- **Größen:** Hero 2000px, Solution-Bilder 1200px/900px, Poster 1600px

---

## Studio-Sortierung

Case Studies können im Studio nach zwei Kriterien sortiert werden:
1. **Reihenfolge (order)** — numerisch aufsteigend (Standard)
2. **Jahr (neueste zuerst)** — nach `projectMeta.year` absteigend

---

## Seed-Script

Es gibt ein Script zum initialen Befüllen von Case Studies:
```bash
npx tsx scripts/seed-case-studies.ts
```

---

## Wichtige Dateipfade

```
sanity.config.ts              → Studio-Konfiguration
sanity.cli.ts                 → Sanity CLI-Konfiguration
sanity/env.ts                 → Umgebungsvariablen
sanity/lib/client.ts          → Sanity-Client
sanity/lib/fetch.ts           → Fetch-Helper mit Caching
sanity/lib/image.ts           → Bild-URL-Builder
sanity/lib/queries.ts         → GROQ-Queries
sanity/types.ts               → TypeScript-Typen
sanity/schemaTypes/index.ts   → Schema-Registrierung
sanity/schemaTypes/documents/ → Dokument-Typen (caseStudy)
sanity/schemaTypes/objects/   → Objekt-Typen (headline, projectMeta, etc.)
sanity/structure.ts           → Studio-Sidebar-Struktur
```
