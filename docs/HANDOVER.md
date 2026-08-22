# Handover — make/c Website

Übergabe an die nächste Session. Die dauerhaften Regeln und Fallstricke stehen in
`CLAUDE.md` — das ist die Quelle der Wahrheit; das Änderungsprotokoll in
`docs/CHANGELOG.md`. Dieses Dokument beschreibt nur den **Zustand der jeweiligen
Übergabe**: was gemacht wurde, was verifiziert ist, was noch offen ist.

⚠️ **Der Stand vom 22.08.2026 ist committet und gepusht** — Vercel hat also deployt.
Die Abschnitte darunter sind chronologisch gewachsen und tragen teils doppelte Nummern
(zweimal „0", zweimal „0a"); die Datumsangabe in der Überschrift ist verlässlicher als
die Nummer. Die Zeile „Alles ist uncommitted", die hier bis zum 22.08.2026 stand, galt
für die Übergabe vom 30.07.2026 und ist überholt.

---

## Nachtrag: Hero-Video, Case-Inhalte, neue Datenschutzerklärung (22.08.2026)

Vier Aufträge des Users in einer Sitzung. Alles committet und gepusht — **Vercel deployt
bei jedem Push auf `main`**, der Stand ist also live. Indexiert wird er nicht:
`NEXT_PUBLIC_SEO_INDEX` ist weiterhin aus, die Seite antwortet mit `noindex` und
`Disallow: /`.

### 1 · Neues Hero-Video, in drei Codecs

Der User hat `Makec_Web_Header.mp4` geliefert (1920×1080, 21,24 s, 6,1 MB, mit Tonspur).
Es ersetzt das alte `header-video.mp4` (1600×900, 2,75 MB).

Ausgeliefert werden **drei Fassungen, geladen wird genau eine** — der Browser nimmt die
erste `<source>`, deren `type` er kennt:

| Datei | Auflösung | Größe | Wer |
|---|---|---|---|
| `header-video-av1.mp4` | 1920×1080 | 2,20 MB | Chrome, Edge, Firefox |
| `header-video-hevc.mp4` | 1920×1080 | 2,45 MB | Safari (macOS/iOS) |
| `header-video.mp4` (H.264) | 1600×900 | 2,73 MB | universeller Fallback |

Gebaut von **`scripts/build-header-video.mjs`** aus `assets/masters/header/` (gitignored).
Das Skript gibt die `codecs=`-Strings aus, die wörtlich nach `Hero.tsx` gehören.

**Warum nicht CRF wie bei den Loops:** die Lieferdatei ist bereits ein Web-Encode
(2,4 Mbit/s). Ein CRF-Lauf konserviert deren Artefakte mit und wird **größer als die
Quelle** — `-crf 26` bei 1920 ergab 7,1 MB aus 6,1 MB. Für H.264 steht deshalb eine
2-Pass-Zielbitrate im Skript. Neun Kandidaten wurden per SSIM/PSNR gegen eine verlustarme
Fassung gemessen, alle auf 1920 hochskaliert (das Video läuft bildfüllend):
H.264 1600 @1100k = 0,9768 · HEVC 1920 crf34 = 0,9811 · **AV1 1920 crf47 = 0,9829 bei
867 kbit/s**. AV1 liefert bei weniger Bytes die bessere Qualität. VP9 lag pro Byte etwa
auf H.264-Niveau und ist deshalb nicht dabei.

Tonspur raus (`-an`, die Quelle trug 317 kbit/s AAC), `+faststart` bei allen dreien,
Poster neu aus dem ersten Bild: `header-video-poster.jpg` (46 kB) → `-poster.webp` (21 kB).

**Seitengewicht der Startseite:** 3,49 → **2,91 MB** auf dem AV1-Pfad (echter Transfer über
`encodedDataLength`), 3,17 MB via HEVC, 3,44 MB via H.264. Kein Browser bekommt mehr als
vorher.

### 2 · Autoplay-Konflikt aufgelöst (User-Entscheidung)

**Das Hero-Video spielt in jedem Browser, sobald jemand die Seite öffnet.** Es bekommt
bewusst **kein** `prefers-reduced-motion`-Gate — das ginge nur nach der Hydration und wäre
genau der `initial={{opacity:0}}`-Fallstrick aus `CLAUDE.md`. Stattdessen steht in
`Hero.tsx` ein Nachstarter: ein Effekt setzt `video.muted = true`, ruft `play()` und hängt
sich bei Abweisung an `canplay` und an die erste Eingabe des Besuchers (iOS-Stromsparmodus,
strenge Firefox-Einstellung). `preload` von `metadata` auf `auto`.

Gemessen in **Chrome und WebKit**, je mit und ohne `prefers-reduced-motion`: spielt in
allen vier Fällen (`paused: false`, `currentTime` > 3 s).

### 3 · Vier Case-Inhalte vom User eingepflegt

`flughafen-koeln-bonn` (5 Absätze, Projekt „Tag und Nacht", 5 Credits — **ohne Videolink**,
den hat der User nicht geliefert) · `wundholding` (3 Absätze) · `koelner-zoo` (3 Absätze,
Vimeo-Link, Tag „Hybrides KI-Videoprojekt") · `merkur` (4 Absätze, Credits neu, **Jahr
2024 → 2025**, Kunde `Merkur` → `MERKUR`, zwei YouTube-Links).

Neu im Typ: **`secondaryVideos?: { url, poster? }[]`** — weitere Videos je Case, gerendert
unter „Weitere Videos" zwischen Text und Credits. In Gebrauch bei `merkur`.
⚠️ Das `poster` gehört nach `public/work/`; ein Thumbnail direkt von `img.youtube.com`
würde schon beim Öffnen des Fensters Daten an Google schicken.

Sechs offensichtliche Tippfehler in der gelieferten Copy wurden korrigiert (u. a. „ein
umfassende" → „eine umfassende", „auf Ihrem Weg" → „auf ihrem Weg", „Bewegbild" →
„Bewegtbild") — dem User gemeldet.

Nebenbei: `hyphenate-limit-chars: 10 4 4` auf den `/work`-Kacheln. Das `lang="de"` legte
deutsche Trennregeln über englische Wörter, „Social Media Spot" brach auf Mobil als
„SOCI-AL".

### 4 · Zwei-Klick-Lösung und neue Datenschutzerklärung

⚠️ **Juristisch nicht geprüft. Das gehört gegengelesen.**

**Unter jedem Play-Button** steht jetzt ein sichtbarer Hinweis auf die Datenübertragung
samt Link auf `/datenschutz` (User-Vorgabe). Der Anbietername kommt aus der URL. Dazu läuft
YouTube über `youtube-nocookie.com` und Vimeo mit `dnt=1`. **Der Hinweis ist die Grundlage
der Einwilligung, nicht Dekoration** — wer ihn entfernt, nimmt der Zwei-Klick-Lösung ihren
Sinn.

**Die Datenschutzerklärung ist komplett neu** (`lib/content/legal.ts`, 20 Abschnitte). Die
Fassung von Dezember 2025 kannte weder die eingebetteten Videos noch eine
Reichweitenmessung. Zuerst gemessen, dann geschrieben — am Production-Build über alle zehn
Routen, inklusive Scrollen bis zum Seitenende:

> **0 fremde Hosts · 0 Cookies · localStorage und sessionStorage leer · vier Schriftdateien,
> alle vier von der eigenen Domain**

Damit ist auch die Frage des Users beantwortet: **Google Fonts werden nicht geladen.**
`next/font/google` holt Montserrat und EB Garamond zur Build-Zeit und legt sie unter
`/_next/static/media/` ab.

**Kein Cookie-Banner nötig** (Abschnitt 5 begründet es): § 25 TDDDG verlangt eine
Einwilligung nur für Zugriff auf das Endgerät, und der findet nicht statt. Das gilt, solange
drei Bedingungen halten — PostHog wirklich cookiefrei, Videos bei der Zwei-Klick-Lösung,
nichts Neues von fremden Servern.

Der Datenschutztext wird jetzt über **Bauhelfer** (`h2`/`h3`/`p`/`li`) geschrieben statt als
rohes Portable Text; als Blockliteral wären es rund 2.500 Zeilen und der Rechtstext nicht
mehr prüfbar. Das Impressum darüber bleibt unverändert roh.

🔴 **Offen an der Datenschutzerklärung:**
- **PostHog ist noch nicht eingebaut.** Abschnitt 6 beschreibt den geplanten Zustand. Er ist
  nur richtig mit `persistence: "memory"`, `person_profiles: "never"` und der EU-Instanz.
  Kommt PostHog nicht, muss der Abschnitt raus — ein ⚠️-Kommentar steht im Code darüber.
- **AVV müssen tatsächlich bestehen** (Vercel läuft über deren AGB, PostHog aktiv abschließen).
- **Datenschutzbeauftragter** ist nicht genannt, weil unbekannt. Falls es einen gibt, muss er rein.
- **Speicherdauer der Server-Protokolle** ist bewusst ohne Zahl formuliert — die hängt vom
  Vercel-Tarif ab und war nicht belegbar. Sobald sie feststeht, gehört sie in Abschnitt 15.

⚠️ **`Showreel.tsx` kann Vimeo/YouTube einbetten — ohne Hinweis, ohne `nocookie`, ohne
`dnt`.** Aktuell steht in `LANDING.showreel.videoUrl` die lokale `/showreel.mp4`, es geht
also nichts nach außen. Trägt dort jemand eine Vimeo-URL ein, stimmt Abschnitt 7 der
Datenschutzerklärung nicht mehr. Vorher die Anbieter-Logik aus `VideoFacade` nachziehen.

### 5 · Stand der Case-Inhalte

Alle 31 Referenzen wurden maschinell aus `lib/content/cases.ts` ausgewertet. **2 sind
inhaltlich fertig** (`cwh-bih-sbv-wahl`, `merkur`):

- **16 ohne Videolink**, **26 ohne Credits**, **27 ohne Leistungs-Tags**
- **3 mit sichtbarem Platzhaltertext** (`telekom`, `fom-studio`, `barmenia-gothaer`) — alle
  drei auch als Kachel auf der Startseite verlinkt, Jahr 2026 ungeprüft. 🔴 Vor Go-Live weg.
- **23 Texte sind „Import, ungeprüft"** — maschinell von der alten Portfolio-Seite übernommen
  und nie redigiert. Nur fünf Texte sind bewusst geschrieben.

Die vollständige Liste nach Dringlichkeit liegt als Artefakt beim User:
`https://claude.ai/code/artifact/584daaf3-2b3c-4d09-98a2-24de80a49701` (Stand 22.08.2026).
⚠️ Das ist eine Momentaufnahme — das Auswertungsskript lag nur in `/tmp` und ist **nicht**
im Repo. Wenn die Zahlen regelmäßig gebraucht werden, gehört es als `scripts/check-cases.mjs`
dazu; der User hat es bisher nicht angefordert.

### Verifikationsstand dieser Übergabe

`npx tsc --noEmit` grün · `npm run lint` grün · `npm run build` grün · **55/55 e2e** grün.

Im echten Browser gegen den Production-Server nachgemessen (Playwright + System-Chrome,
Muster in `CLAUDE.md`):

- Hero: `currentSrc` = `/header-video-av1.mp4`, **eine einzige Videoanfrage** statt drei,
  1920×1080, spielt — auf 1440×900 und 390×844, in Chrome und WebKit, mit und ohne
  reduced-motion.
- Alle drei `canPlayType`-Strings liefern `probably`, auch in WebKit; jede der drei Dateien
  spielt einzeln. Für HEVC zusätzlich über `qlmanage` bestätigt, dass **AVFoundation** sie
  dekodiert — dieselbe Medienschicht wie Safari.
- Case-Fenster: **0** Anfragen an youtube/ytimg/google/vimeo vor dem Play-Klick; danach lädt
  der iframe von `youtube-nocookie.com` bzw. `player.vimeo.com` mit `dnt=1`.
- `/datenschutz`: alle 20 Abschnitte und alle sechs Links im ausgelieferten HTML.
- Kacheltexte laufen bei 320 px und 390 px nirgends über ihre Kachel hinaus (Range-Rects).

---

## 0. Nachtrag: echte Selected-Work-Stills + drei Platzhalter-Cases (11.08.2026)

Der User hat Stills aus den drei Filmen geliefert, die bis dahin handgezeichnete
Skizzen waren (BarmeniaGothaer, FOM, Telekom), mit dem Auftrag, „schon Platzhalter-Case-
Kacheln anzulegen wie bei den anderen Cases".

- **Bilder:** 11,1 MB PNG/JPG → 350 kB WebP (q82). Zwei Größen je Motiv, weil es zwei
  Rahmen gibt: `public/Selected Work/*.webp` (1920 px, Full-Bleed-Kachel der Startseite)
  und `public/work/<slug>.webp` (max. 1600 px, 4:5-Raster). Die beiden übrig gebliebenen
  Skizzen `FOM_Bild.png` und `Telekom_Bild.png` sind gelöscht (über git wiederholbar).
- **Telekom braucht einen Sonderweg:** im 4:5-Raster fiel das „R" von READY weg.
  `public/work/telekom.webp` ist deshalb vorgeschnitten (614×768, Fenster 30 px nach
  links → Anschnitt beidseitig gleich; vollständig passt der Schriftzug in kein
  4:5-Fenster). Das Case-Fenster zeigt Standbilder im `aspect-video`-Rahmen, dort hängt
  über `poster` das ungeschnittene `telekom-poster.webp`.
- **Drei Platzhalter-Cases** `telekom`, `fom-studio`, `barmenia-gothaer` — ganz oben in
  `CASES`, also in der ersten Reihe von `/work`. Damit **63 Referenzen** und alle sechs
  Landing-Kacheln klickbar.
- Verifiziert am Production-Build (12/12): 6/6 Kacheln klickbar mit geladenem Bild, alle
  drei Case-Fenster öffnen, `/work` zeigt 63 Kacheln und „63 Projekte", Filter hin und
  zurück, Mobile 390 px, 0 Konsolenfehler/-warnungen, keine 4xx/5xx.

🔴 **Zu erledigen:** In den drei Cases steht sichtbar „Platzhalter — Beschreibung folgt."
Das ist Absicht — erfundene Beschreibungen über echte Kunden wären schlimmer als ein
sichtbarer Platzhalter. Vor Go-Live `summary` und `year` (ungeprüft auf 2026) ersetzen,
optional `video`, `credits`, `services` ergänzen. Der Kommentarblock in
`lib/content/cases.ts` markiert die Stelle.

⚠️ Die Originale liegen noch in `public/Selected Work/` (`BarmeniaGothaer_Bild.png` 7,1 MB,
`makec_fom_studio_trailer.png` 4,2 MB, `Telekom_Bidl.jpg`) und werden von nichts mehr
referenziert. Bewusst nicht gelöscht — das sind die Master des Users, und zwei davon sind
nirgends sonst gesichert. Vor dem Commit entscheiden, ob sie mit ins Repo sollen.

---

## 0a. Nachtrag: 60 Referenzen im Code, Sanity entfernt (10.08.2026)

Basis-Commit inzwischen `c2dfbd0`. Zwei Anliegen: die Referenzen der alten Portfolio-Seite
sollten auf `/work` erscheinen, und **Sanity fliegt raus** — User-Entscheidung: „lohnt sich
nicht, wir werden manuell die Pflege betreiben."

- **60 Cases** in `lib/content/cases.ts` (vorher 18 in Sanity): 58 aus dem HTML-Export von
  `make-c.de/portfolio` samt Texten, Jahren, 26 Videos und 26 Credit-Sätzen von den
  Detailseiten, plus `merkur` und `aldi` aus dem CMS. Bilder als WebP in `public/work/`
  (5,9 MB statt 27,7 MB Original).
- Die 12 `referenzprojekt-*`-Platzhalter sind ersatzlos weg; alle sechs Leistungsseiten
  zeigen jetzt drei thematisch passende echte Cases.
- `/work` hat eine Kategorie-Filterleiste (14 Kategorien, clientseitig).
- Sanity ist vollständig entfernt (Ordner, Studio, Configs, Seeds, Doku, Env, fünf Pakete).
  Das Cloud-Projekt bleibt unangetastet bestehen — löschen kannst du es selbst.
- Der Build ist damit **vollständig statisch**: kein `revalidate`, kein Fetch zur Laufzeit.

⚠️ Zu prüfen: die 58 Beschreibungstexte sind maschinell von eurer alten Seite übernommen
und ungelesen, und `year` ist deren Veröffentlichungsdatum, nicht zwingend das
Produktionsjahr. Prüfliste: `scripts/data/portfolio-cases.md`.

Details und die gekippte Dubletten-Entscheidung stehen in `CLAUDE.md` unter
„Erledigt 10.08.2026".

---

## 0b. Nachtrag: Sanity auf Case Studies reduziert + Bug-Durchgang (31.07.2026)

Zwei Anliegen in einem Durchgang: eine Prüfung auf Fehler/Bugs/Sackgassen, und die
User-Entscheidung, **Sanity nur noch für die Case Studies** zu verwenden.

### Befund der Prüfung — 6 echte Funde

`npx tsc --noEmit` war grün, alle referenzierten `public/`-Assets existierten (21 statische
Pfade + 18 Logos + 7 Videos einzeln geprüft), alle Anker-Ziele (`#approach`, `#work`,
`#video-check`, `#contact`, `#team`) existierten, keine internen `<a>` statt `<Link>`. Die
Funde lagen woanders:

1. 🔴 **`/impressum` + `/datenschutz` konnten 404 liefern.** Beide riefen `notFound()`, wenn
   der Sanity-Fetch `null` gab — und `sanityFetch` gibt `null` auch bei **fehlenden
   Env-Variablen**. Für diese zwei Seiten gab es keinen Code-Fallback. Ein Vercel-Build ohne
   gesetzte Env hätte eine Seite ohne Impressum ergeben. Behoben durch das Hartcodieren.
2. 🔴 **Erfundene Telefonnummer, klickbar:** `+49 123 455667` stand im `CONTACT_FALLBACK`,
   das CMS-Feld war leer, `Contact.tsx` baute daraus `tel:+49123455667`. Im ausgelieferten
   HTML verifiziert. Entfernt.
3. 🟡 **Ursache der framer-motion-Warnung gefunden** (stand seit 07/2026 als „Ursache noch
   nicht gesucht" in §4.7): `CustomCursor.tsx` animierte einen **konstanten**
   `backgroundColor: "white"` auf einem Element ohne Start-Hintergrund → Tween von
   `rgba(0,0,0,0)` zum Schlüsselwort `white`. Farbe in die `className`, raus aus `animate`.
4. 🟡 **INSTAGRAM und LINKEDIN im Footer waren unklickbarer Text** — im CMS war an den
   `socialLink`-Objekten keine URL hinterlegt. LinkedIn zeigt jetzt auf `ORG.linkedin`,
   Instagram bleibt bewusst ohne URL, bis eine vorliegt.
5. 🟡 Copyright stand auf `© 2025` → `© 2026`.
6. ⚪ Totes Feld `rating` (abgefragt, getypt, gesetzt — seit `c84122b` nirgends gerendert)
   und ein toter `approach.closing`-Render (Feld im CMS nie gefüllt, Fallback `""`).

**Geprüft und bewusst so gelassen:** `/work` zeigt 18 Kacheln, aber nur 7 verschiedene
Bilder — die 12 `referenzprojekt-*`-Platzhalter recyceln die Bilder der 6 echten Cases
(User-Entscheidung: bleibt). Kein Case hat eine `mainMedia.videoUrl`, der Play-Button ist
überall dekorativ. Die `tags` an `sanityFetch` sind wirkungslos, weil es keinen
Revalidierungs-Webhook gibt (`app/api/` existiert nicht).

### Der Umbau

**Der Grund, warum das billig war:** die `*_FALLBACK`-Konstanten im Code waren für hero,
stats, showreel, approach, about, services und siteSettings schon **byte-identisch** mit dem
Live-Dataset (per GROQ verglichen). Bei `contact` lieferte das CMS ohnehin nur `kicker` und
die zwei Standort-Überschriften — alles andere kam aus dem Code. Das Hartcodieren war ein
Umzug bestehender Konstanten, keine Neuschreibung.

**Drei Dinge fehlten im Code und wurden zuerst gesichert:**
- Die zwei Legal-Texte — **live exportiert**, nicht aus `scripts/seed-phase-a.ts`
  abgeschrieben, und danach dagegen gegengeprüft: **0 Abweichungen** (22 bzw. 49 Text-Spans).
  Bleiben Portable Text, `PortableTextRenderer` unverändert. Rechtsverbindlicher Text soll
  sich beim Umzug nicht um ein Zeichen ändern.
- **7 Bilder vom Sanity-CDN** nach `public/team/ceo-portrait.png` und
  `public/leistungen/*.png` (Alt-Texte mitgenommen).
- Die Testimonials gibt es nirgends echt — Lorem ipsum bleibt auf User-Entscheidung sichtbar.

**Neu:** `lib/content/{landing,services,site,legal,types}.ts`.
**Gelöscht:** 3 Fetcher, 4 Dokument-Schemas, 5 Objekt-Schemas, 6 Queries, `FOOTER_CONTENT`,
die Singleton-Filter in `sanity.config.ts`, und 5 Skripte (`seed-phase-a/b/c`,
`upload-placeholders`, `fix-document-ids`) — die schrieben auf Typen, die es nicht mehr gibt,
zwei davon per `createOrReplace`.
**Vereinfacht:** `Header`/`Footer` sind keine `async`-Komponenten mehr (sie holten
`siteSettings` auf **jeder** Route, doppelt). `Service` schrumpft von 11 auf 3 Felder — vier
davon wurden nirgends gerendert, drei Titel-Varianten waren redundant. `SITE.locations`
leitet sich aus `ORG` (`lib/seo.ts`) ab, statt Adressen ein zweites Mal zu tippen (die
Doppelpflege war dort selbst als Fallstrick vermerkt).

**Im Dataset gelöscht wurde nichts** (User-Entscheidung): `landingPage`, 6× `service`,
`siteSettings`, 2× `legalPage` liegen unangetastet weiter da, tauchen im Studio aber nicht
mehr auf. `landingPage._updatedAt` steht unverändert auf 30.07., keine Drafts.

### Verifiziert

- `npx tsc --noEmit` grün.
- **Der wichtigste Test:** sichtbarer Text aller 12 Routen vor und nach dem Umbau
  abgezogen und gediffed → **einziger Unterschied sind die zwei entfernten Telefonzeilen**
  („Telefon" + die Nummer). Impressum, Datenschutz, `/leistungen`, `/work` und die 404 sind
  byte-identisch, die 6 Detailseiten nach Sortierung identisch (der `<title>` wandert im
  `<head>` nur an eine andere Position).
- 0 Konsolenfehler **und -warnungen** auf 11 von 12 Routen; keine HTTP ≥ 400. Rest: der
  erwartete 404 auf der Probe-URL und eine **vorbestehende** LCP-Empfehlung von `next/image`
  zu einem Case-Bild auf `/work` (`WorkGrid.tsx` war in dieser Session nicht angefasst).
  Die framer-motion-Warnung ist weg.
- Kein `tel:` mehr im HTML. LINKEDIN ist ein `<a href>` mit `target="_blank"`, INSTAGRAM
  weiter ein `<span>`. `© 2026`.
- `/` und `/leistungen` laden **0** Bilder von `cdn.sanity.io` (vorher 14 bzw. 12).
  `/work` unverändert 7, Detailseiten je 3 (die Case-Kacheln).
- Case-Pfad intakt: `/work` mit 18 Kachel-Überschriften, Modal öffnet, lädt ein
  Sanity-Bild, schließt mit Escape.
- Sitemap weiter 11 URLs, `lastModified` jetzt nur noch auf `/work`. `robots.txt` weiter
  `Disallow: /`.
- Deploytes Schema-Manifest enthält genau `caseStudy` + 7 Objekttypen.
- Kein `@/sanity`-Import mehr in `/impressum`, `/datenschutz`, `/leistungen` und
  `components/layout/*` — Fund 1 ist strukturell behoben, nicht zufällig grün.

⚠️ **`mcp__Sanity__get_schema` ohne `type`-Argument liefert einen veralteten Stand** —
es listete nach dem Deploy noch `landingPage` samt der am 30.07. entfernten
`insight`/`questions` auf. Belastbar ist `*[_id == "_.schemas.make-c"][0].schema` (das Feld
ist ein JSON-**String**, also zweimal parsen) oder `get_schema` **mit** `type`.

### Offen geblieben

- 🔴 **Die echte Telefonnummer steht im Impressum**: `Fon: +49 221 – 4 56 – 7 62 12`
  (`lib/content/legal.ts`, Abschnitt „Kontakt"). Bewusst **nicht** automatisch in den
  Kontakt-Block übernommen — unklar, ob die Zentrale neben „Paul Zajonc · Ansprechpartner"
  gehört. Sobald geklärt: `LANDING.contact.phone` einkommentieren **und** `ORG.telephone`
  in `lib/seo.ts` an beide `Place`-Knoten hängen (erledigt damit auch den offenen
  Local-SEO-Punkt).
- Instagram-URL fehlt weiter.
- `npm run build` gegen den Produktionsbuild stand zum Übergabezeitpunkt noch aus — es lief
  ein Dev-Server auf `:3000` und `npm run build` hätte dessen `.next/` zerschossen (§6.1).
  Verifiziert wurde deshalb gegen den Dev-Server.

---

## 0a. Nachtrag: SEO/GEO-Nachbesserung + Kompaktierung (31.07.2026)

Nachprüfung der am 30.07. gebauten SEO-Infrastruktur — mit zwei echten Funden — plus
Straffung der Leistungsseiten. Alles am ausgelieferten HTML verifiziert, nicht nur im Code.

**Zwei Bugs gefunden und behoben**
1. `/work`, `/impressum`, `/datenschutz` gaben **og:title und og:url der Startseite** aus. Next
   merged `openGraph` nicht feldweise — wer nur `title`/`description` überschreibt, erbt das
   komplette Layout-Objekt. Wer `/work` teilte, postete die Startseite. Fix: `pageMetadata()`
   in `lib/seo.ts`, alle fünf Unterseiten darauf umgestellt.
2. **Keine der 11 URLs hatte ein OG-Bild.** Neu: `lib/og.tsx` + `/og` + `/leistungen/<slug>/og`
   (7 PNGs, alle zur Build-Zeit prerendert), `twitter: summary_large_image`.

⚠️ **Falle dabei, die zweimal zugeschlagen hat:** `app/opengraph-image.tsx` (Nexts
Dateikonvention) reicht **nicht**. Sie gilt nur für ihr eigenes Segment; Kindsegmente mit
eigenem `openGraph` verwerfen sie — und Next lässt zusätzlich den Wert `"/opengraph-image"`
in `openGraph.images` still fallen. Ergebnis war: `/work`, `/impressum`, `/datenschutz`,
`/leistungen` ohne og:image, während die Leistungs-Detailseiten (eigene Datei im eigenen
Segment) eins hatten. Deshalb laufen die Bilder jetzt über **normale Routen** und werden
in `pageMetadata({ ogImage })` explizit gesetzt.

**Dritter Fund, vorbestehend:** `/work` sprang von der `h1` direkt auf `h3` — die 18 Case-Kacheln
in `WorkGrid.tsx` stehen ohne Zwischenebene unter „Referenzen". Auf `h2` korrigiert. Der Vermerk
„lückenlose H2/H3-Hierarchie" in §0 traf für `/work` also nicht zu.

**Weiter erledigt:** `/work` mit Breadcrumb + `BreadcrumbList` + `CollectionPage`/`ItemList`
(18 Cases, ohne `url` — sie haben keine eigenen Seiten) → JSON-LD 1 → 3 Blöcke ·
`app/sitemap.ts` async mit echten `_updatedAt` aus Sanity (`SITEMAP_DATES_QUERY`), Leistungsseiten
bewusst ohne `lastModified` · `app/not-found.tsx` (branded 404).

**Kompaktierung — Dubletten ja, Abstände nein.** Entfernt und so geblieben: `kicker` (Feld,
alle 6 Werte, Render — dupliziert die Breadcrumb zwei Zeilen darüber), Audience-Füllsatz,
zweiter Hero-CTA (identisches Label *und* href wie `ServiceCta`).

⚠️ Die Abstände waren zusätzlich gestrafft (`py-14 md:py-24`, Headline-Margins
`mb-8 md:mb-12`) — gemessen brachte das Desktop **9.048 → 8.035 px**. **Der User hat es
gesehen und verworfen:** „alles zu eng … sieht nicht gut aus, sondern nur so gequetscht."
Vollständig zurückgenommen, Endstand = Originalabstände. `/leistungen` liegt wieder exakt auf
5.618 px (Ausgangswert), die Detailseite auf 8.787 px — die verbleibenden 261 px Differenz
sind die drei Dubletten, kein Abstand. Lehre für die nächste Session: bei Layout-Wünschen
den Effekt zeigen, nicht die Pixelzahl argumentieren.

**Gemessen** (Playwright + System-Chrome): `/work` +68 px durch die neue Breadcrumb.
Kein horizontaler Overflow bei 390/1440 px.

**Verifiziert:** `npx tsc --noEmit` grün · `npm run build` grün, 6 Detailseiten + 6 OG-Routen
als SSG, alle 7 OG-PNGs im Build · og:title/og:url/og:image/twitter:image auf allen 7 Seiten
korrekt und absolut · JSON-LD parst (`/work` 3, `/leistungen` 3, Detailseite 4 Blöcke) ·
Sitemap 11 URLs mit echten Daten · 404 liefert Status 404 mit Header/Footer · robots.txt
weiterhin `Disallow: /` · Bundles 200.

**Offen geblieben** (bewusst, siehe CLAUDE.md): `ORG.telephone` fehlt — braucht die Nummer ·
kein `/llms.txt`-Verweis in robots.txt, weil Nexts `robots.ts` keine Kommentare kann und der
Nutzen den Umbau auf einen Text-Handler nicht trägt.

---

## 0. Nachtrag: SEO/GEO-Leistungsseiten (30.07.2026, nach dem Landingpage-Umbau)

Sechs neue Detailseiten unter `/leistungen/<slug>` plus Hub `/leistungen`, dazu die
komplette bis dahin fehlende SEO-Infrastruktur.

**Neu**
`lib/leistungen.ts` (kompletter Seitentext aller sechs Leistungen, hartcodiert —
User-Entscheidung, Typ ist wie das spätere Sanity-Dokument geschnitten) ·
`lib/seo.ts` (Basis-URL, Index-Schalter, NAP, JSON-LD-Bausteine) ·
`app/leistungen/page.tsx` + `app/leistungen/[slug]/page.tsx` ·
`app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts` ·
`components/seo/JsonLd.tsx` · `components/ui/WaveField.tsx` (Wellen-Canvas) ·
`components/services/` (9 Sektions-Komponenten).

**Geändert**
`app/layout.tsx` (metadataBase, title.template, OpenGraph, robots hinter Env-Schalter,
Organization-JSON-LD) · Metadata für `/work`, `/impressum`, `/datenschutz` ·
`ServiceList.tsx` (Kacheln verlinken auf die Detailseiten, neue `headingLevel`-Prop) ·
`lib/data.ts` („Leistungen" → `/leistungen`) · `queries.ts` + `getServices.ts` +
`getCaseStudies.ts` (`SERVICE_BY_SLUG_QUERY`, `CASE_STUDIES_BY_SLUGS_QUERY`,
`getServiceBySlug`, `getCaseStudiesBySlugs`) · `MixedHeadline.tsx` (Leerzeichen zwischen
gestapelten Teilen — ohne das las sich „Was wir"+„konkret machen" als
„Was wirkonkret machen"; visuell inert, da beide Teile block-Elemente sind) ·
`.env.example`.

**Gelöscht:** `public/robots.txt` (enthielt `Disallow: /` und hätte `app/robots.ts`
überstimmt — eine Datei in `public/` gewinnt gegen den gleichnamigen Route Handler).

**Kein Sanity-Eingriff.** Kein Schema-Deploy, keine Patches — es wird nur gelesen.

**Verifiziert** (Playwright + System-Chrome, Dev-Server): `npx tsc --noEmit` grün ·
`npm run build` grün, alle 6 Seiten als SSG · alle Routen 200, alle Bundles 200 ·
0 HTTP≥400, 0 Konsolenfehler auf allen 7 Seiten · je genau **eine** `<h1>`, lückenlose
H2/H3-Hierarchie · FAQ-Antworten stehen im ausgelieferten HTML (nicht per JS) ·
4 JSON-LD-Blöcke parsen sauber (Organization+ProfessionalService/WebSite, Service,
BreadcrumbList, FAQPage) · kein horizontaler Overflow bei 390/768/1440/1920 px ·
Wellen-Canvas animiert und **steht** bei `prefers-reduced-motion` (statisches Frame
gezeichnet) · Case-Modal öffnet und schließt mit Escape · `noindex` weiterhin aktiv.

**Offen:** Texte fachlich gegenlesen (besonders Dauern und die Preisaussagen in den FAQ) ·
Cases je Seite sind teils `referenzprojekt-*`-Platzhalter · die Loop-Videos sind helle
Stock-Aufnahmen, die nicht zum Dark-Look passen · Migration von `lib/leistungen.ts` nach
Sanity · vor Go-Live `NEXT_PUBLIC_SEO_INDEX=true` und `NEXT_PUBLIC_SITE_URL` setzen.

---

## 1. Was gemacht wurde

Inhaltlicher Neuaufbau der Landingpage nach User-Input. Zwei Sections raus, Leistungen von
Aufklapp-Accordion auf statische Liste, Selected Work neu, Team-Section durch CEO-Block
ersetzt, neues Slot-Machine-Element.

**Zielkomposition (`app/page.tsx`)**

```
Header → Hero → Stats → LogoBanner → Showreel → Approach (+WordSlot)
→ ServiceList → SelectedWork → Testimonials → AboutTeam → VideoCheck
→ Contact → FloatingContact → Footer
```

| Section | Änderung |
|---|---|
| Hero | Subline → „Mehr Impact für **Dein** Videobudget." |
| Stats | Kicker → „Video ist ein Werkzeug." · 3 Items neu · Uhr-Icon statt Standort-Pin bei „10 Jahre" · `leading-[1.1] text-balance` gegen berührende Zeilen bei „100 feste Mitarbeiter" |
| Showreel | Kicker „/ Was wir können /" raus (Feld komplett entfernt) |
| Approach | „make" kursiv via CMS-Feld · „Es braucht eine Strategie." · Kicker „/Ansatz/" raus (Feld entfernt) · **neu: `WordSlot`** groß + zentriert unter beiden Spalten |
| Leistungen | `ServiceAccordion` → **`ServiceList`** (Server-Komponente, nichts interaktiv), 6 Leistungen, alle mit handgezeichneter Grafik |
| ~~InsightGeneration~~ | entfällt; ihr Swoosh sitzt jetzt auf der Kante Dunkel→Blau in `SelectedWork` |
| Selected Work | 6 neue Tiles, Genre-Label statt Jahr, `caseSlug` optional |
| Testimonials | unverändert (⚠️ siehe §4) |
| AboutTeam | CEO-Block (Jens Kemper) zuerst, „WE BELIEVE…" darunter; Zahlen-Kreise, MAKE/TEAM, Teambild, Absätze raus. Kein `"use client"` mehr |
| VideoCheck | FAQ-Spalte raus, Quiz einspaltig `max-w-3xl`, heißt jetzt „Der Video-**Check**" |
| Contact | hardcodierter Kicker „/ Kontakt" raus · `md:pt-[9.5px]` richtet den Strich unter dem letzten Standort auf den E-Mail-Strich links aus |
| Footer/Nav | „Team" raus dem Seitenmenü · Socials ohne Vimeo (nur Instagram, LinkedIn) |

**Gelöscht:** `InsightGeneration.tsx`, `QuestionsEntry.tsx` (war nie importiert),
`ServiceAccordion.tsx`, `PowerCounter.tsx`, `MixedText` aus `MixedHeadline.tsx`,
`SERVICE_LOOP_VIDEOS` aus `getServices.ts`, `powerWord`-Objekttyp.
Außerdem der Altlast-404: `bg-[url('/noise.svg')]` in `HeaderClient.tsx`.

**Neu:** `components/sections/ServiceList.tsx`, `components/ui/EmphasizedText.tsx`,
`components/ui/WordSlot.tsx`, `scripts/upload-placeholders.ts`.

**Eine Änderung an bestehender Komponente, die alle Display-Headlines betrifft:**
`MixedHeadline.tsx` erlaubt den `slash` jetzt auch in der *gestapelten* Display-Variante
(Bedingung `!stack` entfernt). Geprüft nicht-brechend für Showreel, SelectedWork, AboutTeam.

---

## 2. Sanity — was im Dataset passiert ist

Project `ppeo9yox`, Dataset `production`, Workspace `make-c`. **Alle Änderungen sind
published**, keine Drafts übrig (geprüft).

**Backup vor den Änderungen:** `backup-landing-rebuild-20260730.tar.gz` im Repo-Root
(gitignored, 27 Dokumente + 13 Assets).

**Neue Felder:** `approach.italicWord` (init „make"), `approach.wordmarkWords` (6 Begriffe),
`about.ceoImage/ceoQuote/ceoName/ceoRole`, `statItem.icon` +Option `clock`.

**Entfernte Felder** (Schema + types + Query + Fallback + Wert per `unset` geleert):
`insight` (Gruppe), `questions` (Gruppe), `showreel.kicker`, `approach.kicker`,
`about.powerWords/teamTitlePart1/teamTitlePart2/teamImage/kicker/paragraphs`,
`service.features/processSteps`, plus die Waisen-`keywords` auf allen Service-Docs.

**Services → 6 Leistungen**, alle mit `heroImage`:

| order | `_id` | `slug` | `displayTitle` | rendert |
|---|---|---|---|---|
| 10 | `service-video-beratung` | `video-strategie` | Video Strategie | Video / Strategie |
| 20 | `service-video-produktion` | `video-produktion` | Video Produktion | Video / Produktion |
| 30 | `service-video-motion-design` (neu) | `video-motion-design` | Video Motion Design | Video / Motion Design |
| 40 | `service-event-content` | `event-content` | Video Event Content | Video / Event Content |
| 50 | `service-artificial-intelligence` | `artificial-intelligence` | Video AI | Video / AI |
| 60 | `service-studiobau` | `studiobau` | Video Studiobau | Video / Studiobau |

`splitTitle()` in `ServiceList.tsx` trennt am **ersten Leerzeichen** und setzt dort den `/`
— deshalb tragen alle `displayTitle` das Präfix „Video ". Die Doc-`_id` von Strategie
bleibt `service-video-beratung` (nur der Slug wurde umbenannt).
`"STUDIO BAU test "` wurde mitbereinigt.

⚠️ **Die Reihenfolge hat sich geändert:** Strategie steht jetzt auf Position 1 statt 3.
Weil `ServiceList` die Bildseite per Array-Index alterniert, ist damit die Links/Rechts-Seite
jeder Zeile gekippt. War so gewollt.

---

## 3. Bilder — alles Platzhalter

10 handgezeichnete Grafiken via Magnific (`recraft-v4-1`). Stil: weiße Marker-Linien auf
`#14140F`, sparsame Akzente in `#2C2CC6`, kein Text, keine Logos — passt zum
`Swoosh`/`SquiggleUnderline`-Look.

| Set | Ziel | Ersetzen durch echte Assets |
|---|---|---|
| 6 Leistungs-Grafiken (3:2) | Sanity `service.heroImage` | im Studio hochladen |
| 1 CEO-Portrait (4:5) | Sanity `about.ceoImage` | im Studio hochladen |
| 3 Case-Thumbnails (16:9) | `public/Selected Work/{BarmeniaGothaer,FOM,Telekom}_Bild.png` | Datei tauschen |

Erneut hochladen: `npx tsx scripts/upload-placeholders.ts <verzeichnis>` (erwartet die
Dateinamen aus dem `MAPPING` im Skript).

⚠️ Das CEO-Portrait ist eine **bewusst abstrakte, gesichtslose Skizze** — kein Abbild von
Jens Kemper. Kein `public/`-Fallback: ohne Bild rendert das Zitat volle Breite, damit nie
ein falsches Gesicht erscheint.

---

## 4. Offene Punkte — was der User noch entscheiden/liefern muss

1. 🔴 **Testimonials zeigen live Lorem ipsum.** `landingPage.testimonials` ist im CMS leer,
   deshalb greifen die drei Platzhalter aus `TESTIMONIALS_FALLBACK`
   („Vorname Nachname · Position, Firma"). Der User hat gesagt, die Section bleibt und
   Inhalt kommt später — deshalb **absichtlich nicht angefasst**. Ein-Zeilen-Alternative,
   wenn er es doch ausblenden will: `TESTIMONIALS_FALLBACK.items = []` → `Testimonials.tsx`
   gibt bei leerer Liste `null` zurück und die Section kommt automatisch wieder, sobald
   echte Zitate gepflegt sind.
2. **CEO-Zitat ist mein Entwurf** (`about.ceoQuote`) und will gegengelesen werden.
   `ceoRole` steht auf „CEO · make/c" — bewusst nicht „Gründer", weil unverifiziert.
3. **„Über Uns" in der Header-Leiste zeigt weiter auf `#team`.** Der User wollte „den Punkt
   Team" weg; ich habe nur den Eintrag entfernt, der wörtlich „Team" heißt (Seitenmenü).
   Ob „Über Uns" auch weg soll, ist offen.
4. **Service-Detailseiten (`/services/[slug]`)** sind der nächste geplante Schritt. Slugs
   stehen schon, `description`/`detailText`/`externalLink`/`buttonText` liegen gepflegt in
   Sanity und sind im Studio mit „⚠️ wird derzeit NICHT gerendert" markiert. Die
   Loop-Videos (`public/*Loop.mp4`) und `LazyVideo` sind dafür aufbewahrt.
5. **Die 3 neuen Selected-Work-Tiles** (BarmeniaGothaer, FOM, TELEKOM) haben kein
   `caseStudy`-Dokument → nicht klickbar, kein Modal, nicht auf `/work`.
   `SelectedWork.tsx` rendert sie deshalb als `div` ohne `data-cursor`.
6. Zeitgeist, ALDI und KPMG sind weiter `featured` → weiter auf `/work`, nur nicht mehr im
   Landing-Grid.
7. **Konsolen-Warnung, nicht von diesem Umbau:** framer-motion meldet
   „animate backgroundColor from rgba(0,0,0,0) to white is not animatable". Harmlos,
   Ursache noch nicht gesucht.
8. Vor Go-Live unverändert offen: `robots` noindex raus, Metadata für /work + Legal,
   Default-OpenGraph, `sitemap.ts`, JSON-LD. Echte Gotham-Fonts fehlen weiterhin
   (Montserrat als Ersatz unter `--font-gotham`).

---

## 5. Verifikationsstand

**Grün:** `npx tsc --noEmit` · `npm run build` · 212/212 Assets HTTP 200 · alle
Inhalts-Checks im gerenderten HTML · Sanity-Kontroll-Queries (Copy published, keine Drafts,
6 Services in Order 10–60, keine Feld-Reste) · `WordSlot` bei 390/768/1440/1920 px ohne
Überlauf und ohne Clipping, jedes Wort identisch zentriert, Breiten-Tween über 600 ms
gemessen · Reduced Motion stoppt Rotation und Breitenanimation · Kontakt-Striche links/rechts
auf **Δ 0,0 px** bei 1280/1440/1920.

**Nicht geprüft:** Mobile-Optik jenseits der Messwerte, Safari/Firefox, `/work` und die
Legal-Seiten nach den Typ-Änderungen (tsc ist grün, aber nicht visuell angesehen).

`npm run lint` **läuft nicht** — es gibt keine ESLint-Config im Repo, `next lint` fragt
interaktiv nach dem Setup. Gate ist `npx tsc --noEmit`.

### Visuelle Prüfung ohne Chrome-Extension

Die Claude-Chrome-Extension war nicht verbunden. Workaround, der funktioniert hat: Playwright
in ein Temp-Verzeichnis installieren (**nicht** ins Repo, `package.json` bleibt unberührt)
und das vorhandene System-Chrome als Binary nutzen — der Playwright-Browser-Cache war eine
Version zu alt.

```bash
npm i --prefix /tmp/pw playwright --no-save
# im Skript:
chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" })
# Ausführen:
NODE_PATH=/tmp/pw/node_modules node skript.mjs
```

Damit lassen sich Elementgeometrien messen (`getBoundingClientRect`), Animationen über die
Zeit sampeln und Screenshots einzelner Sections schießen. Für Layout-Feinheiten wie die
9,5-px-Abweichung im Kontaktblock war das der einzige belastbare Weg.

---

## 6. Zwei Fehler dieser Session, die man kennen sollte

1. **`npm run build` bei laufendem Dev-Server** (bzw. Dev-Start auf einem Production-`.next`)
   → CSS und **alle** JS-Chunks liefern 404, die Seite sieht komplett kaputt aus. Fix:
   Dev stoppen, `rm -rf .next`, neu starten. Steht in `CLAUDE.md`, ich hatte es übersehen.
2. **„Verifiziert" war zu schwach:** Ich hatte Inhalte im HTML und Bilder unter ihren
   direkten Pfaden geprüft, aber **nie die CSS-/JS-Bundles selbst** — genau daran wäre (1)
   sofort aufgefallen. Bei Layout-/Styling-Arbeit immer auch die Bundles auf 200 prüfen,
   nicht nur das HTML.
