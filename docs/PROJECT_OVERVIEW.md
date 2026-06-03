# make/c — Projekt Übersicht

## Was ist dieses Projekt?

Die **make/c Website** ist die offizielle Unternehmenswebseite der Videoproduktionsagentur **make/c** mit Sitz in Köln und Essen. Die Agentur existiert seit 2015 und entwickelt sowie produziert Bewegtbild für Marken.

**Live-URL:** Gehostet auf Vercel (Deployment via `vercel deploy`)
**Kontakt:** info@make-c.de
**Standorte:** Picassoplatz 1, 50679 Köln · Sigsfeldstraße 5, 45141 Essen

---

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| **Next.js** | ^15.5 | React-Framework (App Router) |
| **React** | ^19 | UI-Library |
| **TypeScript** | ^5 | Typsicherheit |
| **Tailwind CSS** | ^3.4 | Styling |
| **Framer Motion** | ^11.15 | Animationen |
| **Lenis** | ^1.3 | Smooth Scroll |
| **Sanity** | ^5.21 | Headless CMS |
| **next-sanity** | ^11.6 | Sanity-Next.js-Integration |
| **styled-components** | ^6.4 | Ergänzendes Styling |

---

## Seitenstruktur

### Routen

```
/                  → Hauptseite (One-Pager mit allen Sektionen)
/work              → Work-Übersichtsseite (aus Sanity CMS)
/work/[slug]       → Einzelne Case Study (aus Sanity CMS)
/studio            → Sanity CMS Studio (nur intern)
/impressum         → Impressum
/datenschutz       → Datenschutzerklärung
```

### Sektionen der Hauptseite (in Reihenfolge)

1. **Hero** — Fullscreen-Video-Background mit großer Typografie „DIE VIDEO AGENTUR"
2. **Stats** — Kennzahlen & Referenzlogos (18 Logos bekannter Marken)
3. **Showreel** — Video-Player mit make/c Reel
4. **Approach** — „We make videos that work." — Beschreibung der Arbeitsweise
5. **ServiceAccordion** — 5 Leistungsbereiche (mit Loop-Videos)
6. **InsightGeneration** — Weitere Content-Sektion
7. **SelectedWork** — 6 ausgewählte Projekte (mit Bild-Grid)
8. **AboutTeam** — Team und Unternehmensphilosophie
9. **BudgetTool** — Interaktives Budget-Kalkulationswerkzeug (auch FAQ-Bereich)
10. **QuestionsEntry** — Einstieg in FAQ / Fragen
11. **Contact** — Kontaktformular

---

## Navigation

```
Approach | Leistungen | Selected Work | Team | FAQ | Kontakt
```

- **Desktop:** Horizontale Navigation mit Magnetic-Effekt (leichte Anziehungskraft bei Hover)
- **Mobile:** Vollbild-Overlay-Menü, von rechts einslidend, mit großen Linkbuttons

---

## Leistungsbereiche (Services)

| ID | Titel | Keywords |
|---|---|---|
| `video-produktion` | VIDEO PRODUKTION | Imagefilm, Brand Story, Kampagnenfilm, Produktvideo, Social-First |
| `event-content` | EVENT CONTENT | Livestream, Hybrid-Event, Eventdokumentation, Highlight-Clips |
| `video-beratung` | VIDEO BERATUNG | Content-Strategie, Formatentwicklung, Redaktionsprozesse, KPIs |
| `studiobau` | STUDIO BAU | Corporate Studio, Licht & Kamera, Regietechnik, Workflow-Setup |
| `artificial-intelligence` | ARTIFICIAL INTELLIGENCE | AI Unit make/ai, Generative Video, Automation |

Jeder Service hat ein **Loop-Video** als Hintergrund. Der AI-Service verlinkt auf `https://make-ai.de`.

---

## Referenzkunden (Logo-Liste)

Atlantik-Brücke, Covestro, DFL, Flughafen Köln/Bonn, Fressnapf, Funny-frisch, Gothaer, HARIBO, HDI, Institut der deutschen Wirtschaft, Köln Marathon, LANXESS, Pfeifer und Langen, Renault, REWE, Shop Apotheke, Universität Köln, Zurich

---

## Selected Work (Fallstudien)

| Projekt | Jahr | Slug |
|---|---|---|
| Köln Bonn Airport | 2024 | `koeln-bonn-airport` |
| Zeitgeist | 2024 | `zeitgeist` |
| Merkur | 2024 | `merkur` |
| Wundholding | 2024 | `wundholding` |
| ALDI | 2023 | `aldi` |
| KPMG | 2025 | `kpmg` |

---

## Globale Site-Effekte (SiteEffects)

Werden auf allen Seiten außer `/studio` angewendet:

- **SmoothScroll** — via Lenis-Library (flüssiges Scrollen)
- **Grain** — Film-Korn-Textur-Overlay (subtile Rausch-Optik)
- **CustomCursor** — Benutzerdefinierter Cursor (nur Desktop, `cursor-none` im Body)

---

## SEO & Robots

- Aktuell: `index: false` / `follow: false` — Seite ist **nicht für Suchmaschinen freigegeben**
- Sprache: Deutsch (`lang="de"`)
- Titel: „make/c - Video Marketing & Production"

---

## Umgebungsvariablen

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01   # Standard-Fallback
```
