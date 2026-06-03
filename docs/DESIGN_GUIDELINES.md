# make/c — Design-Vorgaben

## Markenidentität

Das Design folgt einem **Premium-Dark-Aesthetic**: schwarz, hochkontrastig, typografisch stark. Die Seite wirkt wie ein hochwertiges Filmstudio-Portfolio — dunkel, edgy, professionell.

---

## Farben

| Name | Hex | Verwendung |
|---|---|---|
| **make/c Dark** | `#14140F` | Hintergrundfarbe (fast schwarz, leicht warm) |
| **make/c Blue** | `#2C2CC6` | Akzentfarbe — Headlines, Links, CTA-Blöcke |
| **Weiß** | `#FFFFFF` | Primäre Textfarbe |
| **Schwarz** | `#000000` | Mobile Menü, Header-Hintergrund |
| **Deep Blue** | `#05060B` | Hintergrund der Case Study Pages |
| **Helles Grau** | `#EFEFEF` | CTA-Sektion am Ende der Case Studies |

### CSS-Custom-Properties
```css
--background-color: #14140F;
--makec-blue: #2C2CC6;
--makec-dark: #14140F;
--foreground-rgb: 255, 255, 255;
```

### Tailwind-Tokens
```
bg-makec-dark   → #14140F
text-makec-blue → #2C2CC6
```

---

## Typografie

### Schriftfamilien

| Font | Quelle | Verwendung |
|---|---|---|
| **EB Garamond** | Google Fonts | Akzent-Font — kursive Headlines, Zitate, Sektions-Highlights |
| **Gotham** | Lokal (fallback: system-ui) | Bold-Headlines, Navigationstexte |
| **Inter** | Google Fonts | Body-Text, Standard-Interface-Texte |

### Typografische Prinzipien

- **Hero-Headlines:** Extrem groß (`text-[16vw]`), uppercase, bold, tracking-tighter
- **Mixed-Type-Headlines:** Kombination aus Gotham Bold Italic (weiß) + EB Garamond Italic (blau)
  - Beispiel: `das` (Gotham, weiß) + `Projekt.` (Garamond, `#2C2CC6`)
  - Beispiel: `the ` (Gotham, weiß) + `Solution.` (Garamond, blau)
- **Navigation:** Uppercase, `tracking-widest`, `text-[11px]`, font-bold
- **Body:** Kleine Schriftgröße (`text-sm`/`text-base`), `text-white/70` (70% Deckkraft)
- **Labels / Meta:** `text-[10px]`, uppercase, `tracking-[0.2em]` bis `tracking-[0.4em]`

### Font-CSS-Variablen
```css
--font-garamond  → EB Garamond (via Next.js Font)
--font-gotham    → Gotham (lokal, mit System-Fallback)
```

### Utility-Klassen
```css
.font-gotham-bold-italic       → Gotham, weight 700, italic
.font-garamond-semibold-italic → EB Garamond, weight 600, italic
```

---

## Layout & Spacing

- **Max-Width:** `max-w-7xl` (1280px) für Haupt-Content, `max-w-6xl` für Case Studies
- **Padding:** `px-6 md:px-12` (24px mobil, 48px Desktop)
- **Grid:** 12-spaltig für Case Study Layouts
- **Sektions-Abstände:** `pb-20 pt-12` bis `pb-24`

---

## Animation & Interaktion

### Framer Motion
- **Hero-Buchstaben:** Stagger-Animation, jeder Buchstabe einzeln von unten eingeblendet
  - `y: 100 → 0`, `opacity: 0 → 1`, ease `[0.22, 1, 0.36, 1]`
- **Scroll-Skew im Hero:** Beim Scrollen schrägt sich der Text leicht (`skewY: 0 → -15deg`)
- **Mobile Menü:** Spring-Animation, von rechts: `x: 100% → 0`
- **Mobile Nav-Links:** Stagger-Einblendung mit `delay: 0.1 + i * 0.05`

### Custom Cursor (Desktop only)
- Versteckter System-Cursor (`cursor-none`)
- Weißer Kreis-Cursor mit `mix-blend-difference` (invertiert Farben unter dem Cursor)
- **Ruhend:** 12×12px kleiner Kreis
- **Hover über Links/Buttons:** Expandiert auf 60×60px
- **Hover über Projekt-Cards:** Expandiert auf 100×100px, zeigt `data-cursor`-Text an
- Spring-Animation: `damping: 25, stiffness: 250`

### Magnetic-Effekt
- Navigation-Links ziehen den Cursor leicht an (`strength: 0.2`)
- Implementiert via `<Magnetic>`-Wrapper-Komponente

### Grain-Overlay
- Subtile Filmkorn-Textur über der gesamten Seite
- `mix-blend-overlay`, niedrige Deckkraft

### Smooth Scroll
- Lenis-Library für physikalisch wirkungsvolles Scrollverhalten

---

## Visuelle Leitmotive

1. **Video als Hero** — Fullscreen-Videos als Hintergrund im Header und in Service-Sektionen
2. **Dunkel & Kontrastreich** — Fast-Schwarz Hintergründe, weißer Text
3. **Blau als Highlight** — `#2C2CC6` sparsam aber wirkungsvoll eingesetzt
4. **Typografie als Design-Element** — Massive Schrift, mixed Serif + Sans-Serif
5. **Handgezeichnete SVG-Linien** — Dekorative geschwungene Linie als Trenner
6. **Thin Borders** — `border-white/5` bis `border-white/10` für subtile Trennlinien
7. **Gradient-Overlays** — Auf allen Video- und Bild-Elementen für Lesbarkeit
8. **Grain Texture** — Filmkorn-Optik unterstreicht den cinematografischen Anspruch

---

## Responsive Design

- **Breakpoints:** Standard Tailwind (sm: 640px, md: 768px, lg: 1024px)
- **Mobile-first** — alle Layouts starten mobil, dann erweiternd
- **Cursor-Effekte** — nur Desktop (`hidden lg:flex`)
- **Navigation** — Desktop horizontal, Mobil als Fullscreen-Overlay
- **Typography Scaling** — Hero nutzt `vw`-Einheiten für proportionale Skalierung

---

## Header-Verhalten

```
Position: fixed, top-0
Hintergrund: bg-black/80 backdrop-blur-md
Border: border-b border-white/5
Z-Index: z-50
```

Der Header bleibt immer oben und hat ein leichtes Blur-Frosted-Glass-Effekt.
