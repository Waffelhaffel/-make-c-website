"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { HEADER_OFFSET, holdLenis, registerLenis } from "@/lib/scroll";

/**
 * So lange bleibt Lenis nach einem Routenwechsel still.
 *
 * Grund: vorgeladene statische Seiten committen in ~15 ms, das Momentum eines
 * Trackpads läuft danach aber noch nach — und würde die frisch geladene Seite
 * nach unten ziehen. Mit abklingendem Nachlauf gemessen: 250 ms Pause zwischen
 * Wischen und Klick plus 400 ms Nachlauf → y=0; im Extremfall (Klick ohne
 * Pause, 1200 ms Nachlauf) bleiben 276 px. Länger zu warten würde ein
 * absichtliches Scrollen direkt nach dem Klick spürbar verschlucken.
 */
const SETTLE_MS = 400;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  /** Wurde ein Link geklickt, dessen Ziel oben beginnen soll? */
  const pendingTopRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const startLenis = () => {
      if (lenisRef.current) return;
      // Nutzer mit reduzierter Bewegung bekommen natives Scrollen
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;
      registerLenis(lenis);

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stopLenis = () => {
      if (!lenisRef.current) return;
      // Die rAF-ID muss gemerkt und abgebrochen werden: `destroy()` räumt nur
      // Lenis' *eigene* Schleife auf (Option `autoRaf`, hier aus). Ohne das lief
      // die Schleife nach dem Unmount weiter und scrollte über eine zerstörte
      // Instanz weiter das Fenster.
      cancelAnimationFrame(rafId);
      rafId = 0;
      lenisRef.current.destroy();
      lenisRef.current = null;
      registerLenis(null);
    };

    // matchMedia live auswerten statt nur einmal beim Mount — CSS und
    // framer-motion (MotionConfig reducedMotion="user") schalten sofort um,
    // Lenis tat es bis dahin erst nach einem Reload.
    const sync = () => (media.matches ? stopLenis() : startLenis());
    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      stopLenis();
    };
  }, []);

  /**
   * Deep-Link mit Anker (`/#contact` direkt aufgerufen oder geteilt) beim
   * ersten Laden anspringen — sofort, ohne Animation.
   *
   * Der Browser erledigt das zwar selbst, aber wegen `scroll-behavior: smooth`
   * als Animation über die ganze Seitenlänge: auf dem Desktop eine 1,6-Sekunden-
   * Fahrt über 10.000 px, auf 390 px Breite kam sie gar nicht erst an (gemessen:
   * y blieb bei 3 statt 10.787). Ein Deep-Link soll landen, nicht reisen.
   *
   * Läuft nur beim Mount. Die Seitenhöhe steht zu dem Zeitpunkt schon fest —
   * alle Bilder haben reservierte Seitenverhältnisse.
   */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    let letztesZiel = -1;
    const springen = () => {
      const target = document.getElementById(id);
      if (!target) return;
      // Nur nachkorrigieren, solange der Nutzer nicht selbst gescrollt hat.
      if (letztesZiel >= 0 && Math.abs(window.scrollY - letztesZiel) > 4) return;
      letztesZiel = Math.round(
        target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
      );
      window.scrollTo({ top: letztesZiel, behavior: "instant" });
    };

    springen();
    // Noch einmal, sobald die Webfonts stehen: `display: swap` tauscht die
    // Ersatzschrift erst nach dem Mount, und über 10.000 px Seitenlänge
    // verschiebt das den Anker um mehrere Dutzend Pixel — gemessen landete der
    // Deep-Link dadurch 52 px zu tief, die Sektion lag danach unter dem Header.
    document.fonts?.ready.then(springen).catch(() => {});
  }, []);

  /**
   * Lenis vor jeder Navigation einfrieren.
   *
   * Der Kern von Bug 1: Nach jedem Mausrad-Tick animiert Lenis bis zu 1,2 s
   * weiter und schreibt in dieser Zeit **jeden Frame** seine eigene Zielposition
   * ins DOM — fremde Scroll-Änderungen ignoriert es dabei komplett
   * (`onNativeScroll` übernimmt nur bei `isScrolling === false | "native"`).
   * Wer scrollt und sofort einen Link klickt, landete deshalb auf der Unterseite
   * an der alten Position (gemessen: y=3600 statt 0, 3 von 3 Versuchen).
   *
   * Anhalten ist der öffentliche Weg zu Lenis' privatem `reset()`: es bricht die
   * laufende Animation ab und übernimmt die Ist-Position. Ein
   * `scrollTo(window.scrollY, { immediate: true })` wäre hier falsch — es steigt
   * bei `target === targetScroll` vorzeitig aus und ließe die Animation laufen.
   */
  useEffect(() => {
    // Anhalten und sofort wieder freigeben: schon das Anhalten bricht die
    // laufende Animation ab und übernimmt die Ist-Position. Über `holdLenis()`
    // statt direkt über die Instanz, damit ein Dialog, der gerade den Lock
    // hält, nicht versehentlich entsperrt wird.
    const freeze = () => holdLenis()();

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      // Cmd/Strg/Shift/Alt-Klick öffnet einen neuen Tab — die aktuelle Seite
      // navigiert nicht und soll ihren Schwung behalten.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      freeze();

      // Merken, ob diese Navigation oben landen soll. Nur dann, wenn der Link
      // ohne Anker auf einen anderen Pfad derselben Seite zeigt — genau der
      // Fall, in dem Next selbst `scrollTop = 0` setzt.
      //
      // Warum überhaupt: `freeze()` löscht nur den Schwung, der im Moment des
      // Klicks da ist. Scrollt jemand WEITER, während die Navigation noch
      // aussteht (langsame Verbindung, kalter Router-Cache), startet Lenis eine
      // neue 1,2-s-Animation, die den Routenwechsel überlebt und die neue Seite
      // wieder in die Mitte zieht. Der Effekt unten setzt dann hart auf 0.
      const href = link.getAttribute("href") ?? "";
      const url = new URL(href, window.location.href);
      pendingTopRef.current =
        url.origin === window.location.origin &&
        !url.hash &&
        url.pathname !== window.location.pathname;
    };

    const onPopState = () => {
      // Zurück/Vorwärts: die alte Position gilt, nicht der Seitenanfang.
      pendingTopRef.current = false;
      freeze();
    };

    // Capture-Phase: vor next/link, damit Lenis schon still steht, wenn Next
    // gleich nach oben bzw. zum Anker scrollt.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  /**
   * Nach dem Routenwechsel: Lenis neu vermessen und mit dem Ist-Stand
   * synchronisieren. Bewusst **ohne eigenes Scrollen**.
   *
   * Vorher stand hier `window.scrollTo(0, 0)` plus
   * `history.scrollRestoration = "manual"`. Beides war schädlich:
   *  - Next scrollt bei einer Link-Navigation längst selbst nach oben und bei
   *    einem Anker-Link zum Ziel — und zwar in der Layout-Phase, also *vor*
   *    diesem Effekt. Unser Nachschlag überschrieb das: Anker-Links von
   *    Unterseiten (`/#contact` — der CTA aller sechs Leistungsseiten) landeten
   *    dadurch immer ganz oben.
   *  - Bei Zurück/Vorwärts scrollt der App Router bewusst gar nicht, weil das
   *    der Browser übernimmt. `scrollRestoration = "manual"` schaltete genau
   *    diese Wiederherstellung ab — deshalb landete man beim Zurückgehen oben
   *    statt an der alten Stelle.
   *
   * Was hier bleibt: neu vermessen, eine noch laufende Lenis-Animation
   * abbrechen und den Nachlauf der Eingabegeräte für einen Moment schlucken.
   */
  useEffect(() => {
    // Vorwärtsnavigation ohne Anker: den Seitenanfang durchsetzen. Das ist
    // dasselbe, was Next in der Layout-Phase tut — nur noch einmal, nachdem
    // Lenis' rAF-Frame dazwischenfunken konnte (siehe onClick oben).
    // Bewusst NICHT bei Zurück/Vorwärts und nicht bei Anker-Links.
    if (pendingTopRef.current) {
      pendingTopRef.current = false;
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    // Neu vermessen: Lenis klemmt jedes Scroll-Ziel auf die zwischengespeicherte
    // Seitenhöhe und führt sie sonst erst 250 ms später nach.
    lenisRef.current?.resize();

    // Kurz anhalten, damit nachlaufende Rad-/Trackpad-Ereignisse die neue Seite
    // nicht gleich wieder nach unten ziehen. Das Anhalten bricht zugleich eine
    // noch laufende Lenis-Animation ab und übernimmt die Ist-Position.
    const release = holdLenis();
    const timer = window.setTimeout(release, SETTLE_MS);
    return () => {
      window.clearTimeout(timer);
      release();
    };
  }, [pathname]);

  return <>{children}</>;
}
