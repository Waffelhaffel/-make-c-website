# Gotham-Fontdateien hier ablegen

**Aktueller Stand (Juli 2026):** Als kostenloser Ersatz ist **Montserrat** (Google Fonts,
Variable Font inkl. Italic) über `next/font/google` in `app/layout.tsx` eingebunden und
liefert die CSS-Variable `--font-gotham`. Alle Tailwind-Tokens (`font-gotham`, Typo-Scale)
laufen darüber — die Seite rendert also bereits im Gotham-ähnlichen Look.

Sobald die lizenzierten Gotham-Schnitte vorliegen: als `.woff2` (bevorzugt) oder `.otf`
in diesen Ordner legen und in `app/layout.tsx` den `Montserrat`-Import durch
`next/font/local` mit **derselben Variable `--font-gotham`** ersetzen. Sonst ist nichts
anzupassen.

Benötigte Schnitte (Dateinamen gern genau so):

| Datei                     | Schnitt              | Verwendung im Design                    |
|---------------------------|----------------------|-----------------------------------------|
| `Gotham-Book.woff2`       | Book (Weight 325)    | Fließtext (Body 24/36, META 14/20)      |
| `Gotham-Bold.woff2`       | Bold (Weight 700)    | Small 18/26, Buttons                    |
| `Gotham-BoldItalic.woff2` | Bold Italic          | Große Headlines (H2 76, H4 40)          |
| `Gotham-BookItalic.woff2` | Book Italic          | optional, falls vorhanden               |
