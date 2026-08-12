"use client";

import type Lenis from "lenis";

/**
 * Zugriff auf die eine Lenis-Instanz (erzeugt in `components/ui/SmoothScroll.tsx`)
 * und ein gezählter Scroll-Lock für Dialoge.
 *
 * Warum überhaupt: `document.body.style.overflow = "hidden"` hält Lenis **nicht** auf.
 * Lenis scrollt programmatisch über `wrapper.scrollTo({ behavior: "instant" })` und
 * ignoriert `overflow` am Body vollständig. Gemessen: bei offenem Case-Fenster
 * scrollte der Hintergrund per Mausrad neben der Karte von y=300 auf y=2700.
 * Wirksam ist nur `lenis.stop()` — gestoppt ruft Lenis auf Wheel-/Touch-Events
 * `preventDefault()` auf.
 *
 * Und warum gezählt: Header-Menü und Case-Fenster sind zwei unabhängige Schreiber
 * auf dieselbe Eigenschaft. Vorher hob das Schließen des Menüs den Lock des
 * offenen Case-Fensters mit auf (`overflow` bedingungslos auf "unset").
 */

/**
 * Höhe des fixen Headers (`h-[70px]` in HeaderClient.tsx) plus etwas Luft.
 * Muss zu `scroll-padding-top` in `app/globals.css` passen — dort gilt es für
 * die nativen Anker-Sprünge, hier für den Deep-Link beim ersten Laden.
 */
export const HEADER_OFFSET = 84;

let instance: Lenis | null = null;

/** Dialoge: sperren den Body UND Lenis. */
let bodyLocks = 0;
/** Nur Lenis, ohne den Body anzufassen (Nachlauf-Fenster nach einer Navigation). */
let lenisHolds = 0;

/**
 * Ein einziger Ort entscheidet, ob Lenis laufen darf. Vorher stoppten und
 * starteten mehrere Stellen unabhängig voneinander — dabei ging der Zustand
 * verloren, sobald die Instanz dazwischen ausgetauscht wurde.
 */
function applyLenisState() {
  if (!instance) return;
  if (bodyLocks + lenisHolds > 0) instance.stop();
  else instance.start();
}

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
  // Eine neu erzeugte Instanz ist immer ungestoppt und muss einen bestehenden
  // Lock erben. Passiert real, wenn jemand „Bewegung reduzieren" bei offenem
  // Case-Fenster umschaltet: Lenis wird dann neu aufgebaut, der Lock steht noch.
  applyLenisState();
}

export function lockScroll() {
  if (bodyLocks++ === 0) document.body.style.overflow = "hidden";
  applyLenisState();
}

export function unlockScroll() {
  bodyLocks = Math.max(0, bodyLocks - 1);
  if (bodyLocks === 0) document.body.style.overflow = "";
  applyLenisState();
}

/**
 * Hält Lenis kurz an, ohne den Body zu sperren (kein Scrollbalken-Sprung).
 *
 * Gebraucht direkt nach einer Navigation: Rad- und Trackpad-Ereignisse laufen
 * nach einer Wischbewegung noch einige hundert Millisekunden nach. Committet die
 * neue Seite in der Zwischenzeit — bei statischen, vorgeladenen Seiten dauert
 * das gemessen 13 ms —, dann scrollen diese Nachläufer die frisch geladene
 * Seite nach unten. Gemessen: y=3000 statt 0.
 *
 * Gibt eine Freigabe zurück, die mehrfach aufgerufen werden darf.
 */
export function holdLenis(): () => void {
  lenisHolds++;
  applyLenisState();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lenisHolds = Math.max(0, lenisHolds - 1);
    applyLenisState();
  };
}
