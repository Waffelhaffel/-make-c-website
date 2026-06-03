# Wartung, Deployment & wichtige Lektionen

Diese Datei hält das operative Projektwissen fest, das **nicht** aus dem Code allein
ersichtlich ist – damit es bei einem neuen Chat / neuen Entwickler nicht verloren geht.

> Stand: 2026-06-03 · Live: <https://make-c-website.vercel.app> · GitHub:
> `Waffelhaffel/-make-c-website`

---

## 1. Eckdaten

| Was | Wert |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| CMS | Sanity **v5** (eingebettetes Studio unter `/studio`) |
| Hosting | Vercel (Auto-Deploy bei Push auf `main`) |
| Sanity Project-ID | `ppeo9yox` |
| Sanity Dataset | `production` (Sichtbarkeit: **public**) |
| Sanity Org-ID | `oFwy24FBb` |
| Sanity API-Version | `2024-10-01` |

---

## 2. Environment-Variablen (Vercel + lokal)

Vollständig dokumentiert in [`.env.example`](../.env.example). Zentral gelesen/validiert in
[`sanity/env.ts`](../sanity/env.ts) – diese Datei wirft **nie** beim Import (verhindert
Build-Crashes) und liefert bei fehlender Konfiguration eine klare Warnung.

**Auf Vercel gesetzt** (Settings → Environment Variables, für **Production + Preview +
Development**):

```
NEXT_PUBLIC_SANITY_PROJECT_ID = ppeo9yox
NEXT_PUBLIC_SANITY_DATASET    = production
NEXT_PUBLIC_SANITY_API_VERSION= 2024-10-01
```

Optional / nur bei Bedarf (nicht gesetzt, da Dataset public):
- `SANITY_API_READ_TOKEN` bzw. `SANITY_API_TOKEN` – nur bei privatem Dataset / Draft-Preview.
- `SANITY_API_WRITE_TOKEN` – **nur lokal** für Seed-/Migrations-Skripte, nie in Production.

> ⚠️ `NEXT_PUBLIC_*` werden zur **Build-Zeit** eingebettet. Nach dem Setzen/Ändern auf
> Vercel **immer neu deployen**, sonst greifen die Werte nicht.

---

## 3. Wichtige Lektionen / Stolperfallen (unbedingt beachten)

### 3.1 `NEXT_PUBLIC_*` nur STATISCH lesen
In `sanity/env.ts` müssen die öffentlichen Vars als **statische Literale** gelesen werden:

```ts
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID   // ✅ wird in den Client-Bundle eingebettet
process.env[key]                            // ❌ im Browser undefined!
```

Grund: Next.js inlined `NEXT_PUBLIC_*` nur bei statischem Zugriff. Dynamischer Zugriff
(`process.env[key]`) funktioniert nur serverseitig. Das **eingebettete Studio läuft rein
clientseitig** – mit dynamischem Zugriff fiel es auf den Platzhalter `missing-project-id`
zurück und zeigte „Connect this studio to your project". (War ein echter Bug, behoben.)

### 3.2 Sanity-Dokument-IDs dürfen KEINEN Punkt enthalten
Sanity interpretiert den Teil vor dem ersten Punkt einer `_id` als Version/Bundle-Prefix
(wie `drafts.` / `versions.`). IDs wie `legalPage.impressum` sind dadurch **nicht** im
öffentlich-veröffentlichten Layer → anonyme Queries liefern `null` → 404.

➡️ **Immer Bindestriche statt Punkte** verwenden: `legalPage-impressum`,
`service-video-produktion`, `caseStudy-aldi`. Die Seed-Skripte sind entsprechend
korrigiert. Migrations-Skript: [`scripts/fix-document-ids.ts`](../scripts/fix-document-ids.ts)
(idempotent, benötigt `SANITY_API_WRITE_TOKEN`).

### 3.3 Eingebettetes Studio: kein `appId` / `autoUpdates`
Das Studio ist als `NextStudio` unter `/studio` eingebettet. Laut Sanity-Docs ist
`deployment.appId` / `autoUpdates` **ausschließlich für `sanity deploy` / `sanity build`**
(Sanity-gehostete Studios) – **nicht** für eingebettete Studios. Diesen Snippet also
**nicht** in `sanity.cli.ts`/`sanity.config.ts` eintragen.

### 3.4 CORS-Origins fürs Studio
Damit sich das Studio authentifizieren kann, müssen die Hosts als CORS-Origins (mit
Credentials) im Sanity-Projekt eingetragen sein (sanity.io/manage → API → CORS Origins).
**Bereits eingetragen:**
- `https://make-c-website.vercel.app`
- `http://localhost:3000`
- `https://*.vercel.app` (deckt Preview- & Deployment-URLs ab)

Beim erstmaligen Öffnen zeigt Sanity v5 „Connect this studio" → **„Register this studio"**
klicken (funktioniert, sobald die Project-ID korrekt ist, s. 3.1).

### 3.5 Fehlertoleranz / Fallbacks
- [`sanity/lib/fetch.ts`](../sanity/lib/fetch.ts): gibt bei fehlender Config **oder**
  Query-Fehlern `null` zurück (kein Crash) → Aufrufer rendern Fallback-Inhalte.
- Die Data-Getter (`getLandingPage`, `getServices`, `getSiteSettings`) haben eingebaute
  Fallback-Inhalte.
- Bilder: [`sanity/lib/image.ts`](../sanity/lib/image.ts) hat `hasImageAsset()`-Guard,
  `urlFor()` wirft nie. Vor dem Rendern eines Sanity-Bildes immer `hasImageAsset()` prüfen
  (sonst Crash, wenn `asset` nach Bildwechsel `null` ist).

---

## 4. Deployment-Workflow

1. Änderungen committen und auf `main` pushen → Vercel deployt automatisch.
2. Lokaler Produktions-Check vor dem Push:
   ```sh
   npm run build && npm run start
   ```
3. Env-Var auf Vercel geändert? → **Redeploy** nötig (NEXT_PUBLIC ist build-time).
4. Status der Deployments: GitHub → Deployments, oder Vercel-Dashboard.

---

## 5. Changelog dieser Arbeitsphase (Juni 2026)

- **Code-Cleanup**: ungenutzte Komponenten (VideoEngine/VideoSystem/OperatingModel/
  Leadership/LiquidDistortion), tote `lib/data.ts`-Exports und Dependencies (`clsx`,
  `tailwind-merge`) entfernt.
- **Kontakt-Sektion** neu: Formular ersetzt durch Ansprechpartner-Bild + Telefon + E-Mail,
  in Sanity editierbar (`landingPage.contact`). Plus **schwebender CTA**
  ([`FloatingContact`](../components/ui/FloatingContact.tsx)).
- **404-Fix Impressum/Datenschutz/Services**: Dokument-IDs Punkt → Bindestrich migriert
  (s. 3.2).
- **Bild-Null-Checks** projektweit (s. 3.5).
- **Robuste Env-Config** (s. 2 / 3.1) für stabile Vercel-Builds.
- **Vercel-Env-Vars gesetzt** + Redeploy → Sanity-Inhalte laden live.
- **Studio-CORS** eingetragen + **Client-Inlining-Bug** der Project-ID behoben (s. 3.1).

---

## 6. Verwandte Docs
- [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md)
- [`SANITY_CMS.md`](./SANITY_CMS.md)
- [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md)
