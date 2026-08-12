# E2E-Prüfungen

55 Checks in fünf Suiten, mit echtem Chrome gegen den **Production-Build**. Sie
sichern das Verhalten ab, das sich nicht im HTML ablesen lässt: Scrollpositionen,
Einblend-Zeitpunkte, Scroll-Locks, Zurück-Navigation, Weiterleitungen.

```bash
npm i --prefix /tmp/pw playwright --no-save   # einmalig, siehe unten
npm run build && npm run start                # Terminal 1
npm run e2e                                   # Terminal 2
```

Einzelne Suite: `node e2e/verify-anchor.mjs`.

## Warum Playwright nicht in den devDependencies steht

Zwei Gründe, beide praktisch erprobt:

1. **Der Browser-Cache ist älter als das Paket.** `chromium.launch()` ohne
   `executablePath` sucht einen Build, den die lokale Playwright-Installation nie
   heruntergeladen hat, und scheitert. Die Suiten starten deshalb das
   **System-Chrome** über `executablePath`.
2. Playwright zieht ~300 MB Browser nach. Das gehört nicht in ein Repo, dessen
   Deploy aus statischem HTML besteht.

Alles ist über Env überschreibbar (`e2e/config.mjs`):

| Variable | Vorgabe |
|---|---|
| `PW_PATH` | `/tmp/pw/node_modules/playwright/index.mjs` |
| `E2E_BASE_URL` | `http://localhost:3000` |
| `E2E_CHROME` | `/Applications/Google Chrome.app/…/Google Chrome` |
| `E2E_ARTIFACTS` | `e2e/artifacts/` (gitignored) |

## Production-Build, nicht Dev-Server

Der Dev-Server kompiliert beim ersten Aufruf und verfälscht damit jede Zeitmessung.
Mehrere Checks hängen an Ladezeiten (etwa: steht die erste Kachelreihe auf `/work`
sofort da oder erst nach der Hydration) — gegen `npm run dev` schlagen sie
grundlos fehl. Und nicht `npm run build` laufen lassen, während der Dev-Server
läuft: beide schreiben nach `.next/`.

## Die Suiten

| Datei | Checks | Deckt ab |
|---|---|---|
| `verify-fix.mjs` | 20 | Die drei Scroll-Bugs von 08/2026: Momentum beim Navigieren, Zurück-Position, Anker von Unterseiten. Dazu Modal-Lock und Konsole über alle Routen. |
| `verify-anchor.mjs` | 7 | Deep-Link mit Hash, Anker aus Seitenmenü und Header, Filter und Case-Fenster auf `/work` |
| `journey.mjs` | 4 | Der vom Nutzer beschriebene Weg: scrollen, Kachel klicken, zurück — mit echtem Mausrad, Desktop und Mobile |
| `leistungen-weg.mjs` | 12 | Nach dem Entfall der Übersichtsseite: `#service` als Ziel von Nav, Brotkrume und 404, plus die 307 von `/leistungen` |
| `selected-work.mjs` | 12 | Die sechs Selected-Work-Kacheln, ihre Case-Fenster, das Raster auf `/work`, Kategoriefilter, Mobile |

## ⚠️ Die Suiten behaupten feste Zahlen

Sie prüfen nicht nur „irgendwas ist da", sondern konkrete Werte — das ist Absicht,
macht sie aber pflegebedürftig. Wer Inhalt ändert, muss sie nachziehen:

| Erwartung | Wo |
|---|---|
| **30** Cases, Trefferanzeige „30 Projekte" | `CONTENT.CASES` in `config.mjs` |
| **9** Treffer im Filter „Video Event Content" | `CONTENT.FILTER` in `config.mjs` |
| **6** Selected-Work-Kacheln, alle klickbar | `CONTENT.SELECTED_WORK` in `config.mjs` |
| Die Filter-Chips heißen wie die sechs Leistungen | `selected-work.mjs` (Schleife bei „5-filter-…") |
| **12** Elemente mit `data-cursor="VIEW"` auf der Startseite | `verify-anchor.mjs` |
| Scrollwerte wie `sectionTop ≥ 60` (Header ist 70 px, `scroll-padding-top` 84 px) | mehrere |

Die drei Inhaltszahlen stehen seit 12.08.2026 gebündelt in `CONTENT`
(`config.mjs`) — vorher lagen sie an fünf Stellen in zwei Dateien, und beim
Schnitt der Referenzen auf „ab 2022" (63 → 30 Cases) waren alle fünf einzeln
nachzuziehen. Neue Cases oder eine geänderte Kategorie: nur `CONTENT` anfassen.

Ein Fehlschlag heißt also erst einmal: *hier hat sich etwas geändert* — nicht
zwingend *hier ist etwas kaputt*. Erst nachsehen, dann die Zahl anpassen.
