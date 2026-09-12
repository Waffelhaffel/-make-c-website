/**
 * Reichweitenmessung mit PostHog — cookiefrei.
 *
 * Next lädt diese Datei (Konvention `instrumentation-client.ts` im Projekt-
 * wurzelverzeichnis, seit Next 15.3) als erstes Client-Modul, noch vor der
 * Hydration. Deshalb steht hier **keine** React-Komponente: der Seitenbaum
 * bleibt unberührt, und es hängt nichts Sichtbares an der Hydration — genau
 * die Falle, die in CLAUDE.md unter `initial={{ opacity: 0 }}` beschrieben ist.
 *
 * ⚠️ Diese Konfiguration ist die Grundlage von **Abschnitt 6 der
 * Datenschutzerklärung** (`lib/content/legal.ts`). Jede Zeile hier hat dort
 * einen Satz. Wer eine Option ändert, ändert den Text mit — eine
 * Datenschutzerklärung darf keine Verarbeitung beschreiben, die es so nicht
 * gibt (und umgekehrt). Die Zuordnung steht an den Optionen unten.
 *
 * ⚠️ `posthog-js` wird bewusst **dynamisch** geladen und nicht oben importiert.
 * Ein statischer Import läge im gemeinsamen Bundle jeder Route und würde auch
 * dann ausgeliefert, wenn gar kein Projekt-Token gesetzt ist. So entsteht ein
 * eigener Chunk, den der Browser nur anfordert, wenn die Prüfung unten
 * durchgeht — ohne Token kostet die Messung null Bytes.
 */

/**
 * Projekt-Token aus dem PostHog-Projekt (Settings → Project → Project ID).
 * Öffentlich und für den Browser bestimmt — er erlaubt nur das Senden von
 * Ereignissen, kein Lesen. Auf Vercel als Typ **Config** anlegen, nicht als
 * Secret: `NEXT_PUBLIC_*` wird zur Build-Zeit ins Browser-Bundle geschrieben.
 *
 * ⚠️ Die Prüfung auf das Präfix `phc_` ist Absicht und kein Zierrat: ein
 * **leerer** Wert überlebt jede `??`- oder `||`-Absicherung als gültiger String
 * und hat am 11.09.2026 schon einmal einen Build gerissen (siehe
 * `.env.example`). Ein falscher oder leerer Wert schaltet die Messung hier
 * still ab, statt bei jedem Seitenaufruf gegen einen toten Endpunkt zu laufen.
 */
const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;

/**
 * Pfad des eigenen Reverse Proxy (die Gegenstelle steht in `next.config.ts`).
 * Der Browser spricht damit ausschließlich `make-c.de` an; die Weiterleitung
 * an PostHog EU passiert serverseitig. Das hält die Zusage aus Abschnitt 5 und
 * 6 der Datenschutzerklärung — beim Seitenaufruf wird **kein fremder Host**
 * kontaktiert — und nebenbei zählen auch Besucher mit Adblocker mit.
 * Muss mit `PROXY_PATH` in `next.config.ts` übereinstimmen.
 */
const PROXY_PATH = "/mc-relay";

/**
 * „Do Not Track" des Besuchers — der technische Widerspruch aus Abschnitt 6
 * der Datenschutzerklärung.
 *
 * ⚠️ Das muss hier von Hand stehen, obwohl posthog-js dafür `respect_dnt`
 * kennt. Nachgemessen am Production-Build (12.09.2026): in der cookiefreien
 * Betriebsart ist die Option **wirkungslos**. `is_capturing()` in posthog-js
 * lautet sinngemäß `cookieless_mode === "always" || …` und steigt damit aus,
 * bevor die Opt-out-Prüfung überhaupt erreicht wird — in der die DNT-Auswertung
 * sitzt. Mit `respect_dnt: true` allein gingen die Ereignisse also trotz
 * gesetztem DNT-Signal raus, und die Datenschutzerklärung behauptete etwas
 * Falsches. Die Prüfung vor `init()` ist zugleich die gründlichere: bei
 * gesetztem Signal wird PostHog nicht einmal heruntergeladen.
 *
 * Die vier abgefragten Signale sind dieselben, die posthog-js selbst prüft.
 */
function doNotTrack(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const nav = navigator as Navigator & {
    msDoNotTrack?: unknown;
    globalPrivacyControl?: unknown;
  };
  return [
    nav.doNotTrack,
    nav.msDoNotTrack,
    (window as Window & { doNotTrack?: unknown }).doNotTrack,
    nav.globalPrivacyControl,
  ].some((signal) => signal === true || signal === "1" || signal === "yes");
}

if (
  process.env.NODE_ENV === "production" &&
  typeof token === "string" &&
  token.startsWith("phc_") &&
  !doNotTrack()
) {
  void import("posthog-js").then(({ default: posthog }) => {
    posthog.init(token, {
      // ── Wohin ─────────────────────────────────────────────────────────────
      // Eigener Pfad statt eu.i.posthog.com; `ui_host` braucht PostHog
      // trotzdem, damit Links in die eigene Oberfläche (Toolbar) stimmen.
      api_host: PROXY_PATH,
      ui_host: "https://eu.posthog.com",

      // Versionierte Vorbelegung der Bibliothek. Ohne diesen Schlüssel verhält
      // sich posthog-js wie 2024 (u. a. Pageviews ohne SPA-Navigation).
      defaults: "2026-08-30",

      // ── Cookiefrei (Datenschutzerklärung Abschnitt 5 und 6) ───────────────
      // `cookieless_mode: "always"` ist der eigentliche Schalter: die
      // Bibliothek legt nichts auf dem Endgerät ab — keine Cookies, kein Local
      // Storage, kein Session Storage. Wiederkehrende Aufrufe zählt PostHog
      // stattdessen über einen Hash, den der **Server** aus IP, Browserkennung
      // und einem täglich wechselnden Zufallswert bildet; nach 24 h ist er
      // wertlos.
      // ⚠️ Dafür muss im Projekt „Cookieless server hash mode" eingeschaltet
      // sein (Settings → Project → Web analytics). Ohne den Schalter verwirft
      // PostHog die Ereignisse — dann kommen schlicht keine Daten an.
      cookieless_mode: "always",
      // Gürtel und Hosenträger: fiele der Modus oben je weg, bliebe die
      // Speicherung im Arbeitsspeicher — auf dem Endgerät landet nichts.
      persistence: "memory",
      // Keine Personenprofile. In der cookiefreien Betriebsart empfiehlt
      // PostHog das ausdrücklich — `identify()` würde eine dauerhafte ID
      // erzeugen und damit genau das personenbezogene Datum, das hier nicht
      // entstehen soll.
      person_profiles: "never",
      // ⚠️ Wirkungslos, solange `cookieless_mode: "always"` gesetzt ist — die
      // Auswertung von „Do Not Track" übernimmt deshalb `doNotTrack()` weiter
      // oben, noch vor dem Laden der Bibliothek. Der Schalter bleibt trotzdem
      // stehen: fiele die cookiefreie Betriebsart je weg, greift er sofort.
      respect_dnt: true,
      // Maskiert Werte in URL und Eigenschaften, die wie personenbezogene
      // Daten aussehen (E-Mail-Adressen, Namen in Query-Parametern). Diese
      // Seite hat keine solchen URLs — die Option ist die Absicherung für den
      // Fall, dass später doch eine dazukommt.
      mask_personal_data_properties: true,

      // ── Was erfasst wird (Datenschutzerklärung Abschnitt 6, Aufzählung) ───
      // Seitenaufrufe inkl. der Navigation innerhalb der App: die Seite
      // wechselt Routen über den Next-Router, ein klassisches `load` gibt es
      // dabei nicht.
      capture_pageview: "history_change",
      capture_pageleave: true,
      // Klicks auf Schaltflächen und Links samt deren Beschriftung. Eingaben
      // in Textfelder erfasst PostHog dabei nicht — und Formulare hat diese
      // Seite ohnehin keine.
      autocapture: true,

      // ── Was ausdrücklich nicht erfasst wird ───────────────────────────────
      // Sitzungsaufzeichnung wäre eine Aufzeichnung des Bildschirms und damit
      // eine völlig andere Verarbeitung — sie bräuchte eine Einwilligung und
      // steht in der Datenschutzerklärung nicht.
      disable_session_recording: true,
      // Heatmaps zeichnen Mauswege und Scrollpositionen auf, Dead Clicks laden
      // eine weitere Erweiterung nach. Beides geht über die Aufzählung in
      // Abschnitt 6 hinaus.
      capture_heatmaps: false,
      capture_dead_clicks: false,
      // Umfragen und A/B-Tests werden nicht genutzt; ohne diese Schalter lädt
      // PostHog dafür je ein weiteres Skript nach.
      disable_surveys: true,
      disable_web_experiments: true,
      // Keine Feature Flags im Einsatz — spart eine Anfrage je Seitenaufruf.
      advanced_disable_flags: true,

      // ⚠️ `defaults: "2026-08-30"` bringt `internal_or_test_user_hostname`
      // auf localhost mit: PostHog markiert dann den Besucher als Testnutzer.
      // Das läuft über eine **Personen**-Eigenschaft und ist mit
      // `person_profiles: "never"` wirkungslos — übrig bliebe nur ein
      // Konsolenfehler („This call will be ignored"), sobald jemand den
      // Production-Build lokal startet. Deshalb ausdrücklich aus.
      internal_or_test_user_hostname: undefined,
    });
  });
}
