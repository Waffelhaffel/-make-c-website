import { chromium, sleep, BASE, CHROME } from "./config.mjs";
const rows = [];
const check = (name, ok, detail) => {
  rows.push({ name, ok, detail });
  console.log(`${ok ? "OK  " : "FAIL"}  ${name}  ${JSON.stringify(detail)}`);
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const consoleMsgs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
page.on("pageerror", (e) => consoleMsgs.push(`pageerror: ${String(e).slice(0, 160)}`));

const y = () => page.evaluate(() => window.scrollY);
const wheelDown = async (n = 12) => {
  await page.mouse.move(720, 450);
  for (let i = 0; i < n; i++) { await page.mouse.wheel(0, 300); await sleep(16); }
};

// ---------------------------------------------------------- 1) Momentum-Klick
console.log("\n--- 1) Vorwaertsnavigation waehrend Lenis-Momentum ---");
for (const [i, href] of [["a", "/work"], ["b", "/impressum"], ["c", "/leistungen/video-strategie"]]) {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(500);
  await wheelDown(12);
  const before = await y();
  await page.evaluate((h) => document.querySelector(`a[href="${h}"]`)?.click(), href);
  await sleep(2500);
  const after = await y();
  check(`1-momentum-${i} ${href}`, after === 0, { vorher: before, nachher: after, url: page.url().replace(BASE, "") });
}
// Kontrolle ohne Momentum
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await sleep(500);
await page.evaluate(() => document.querySelector('a[href="/work"]')?.click());
await sleep(2000);
check("1-ohne-momentum", (await y()) === 0, { y: await y() });

// ---------------------------------------------- 2) Anker-Links von Unterseiten
console.log("\n--- 2) Anker von Unterseiten ---");
for (const [from, hash] of [["/leistungen/studiobau", "team"], ["/leistungen/video-strategie", "contact"], ["/work", "work"]]) {
  await page.goto(`${BASE}${from}`, { waitUntil: "networkidle" });
  await sleep(700);
  const clicked = await page.evaluate((h) => {
    const a = [...document.querySelectorAll("a")].find((x) => x.getAttribute("href") === `/#${h}`);
    if (!a) return false;
    a.click();
    return true;
  }, hash);
  if (!clicked) { check(`2-anker-${from}->#${hash}`, false, "Link nicht gefunden"); continue; }
  await sleep(2600);
  const info = await page.evaluate((h) => {
    const el = document.getElementById(h);
    return { scrollY: Math.round(window.scrollY), ziel: el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null };
  }, hash);
  // Toleranz: scroll-padding-top 84px
  const delta = info.ziel == null ? null : info.scrollY - (info.ziel - 84);
  check(`2-anker-${from}->#${hash}`, delta != null && Math.abs(delta) <= 6, { ...info, abweichung: delta });
}

// ------------------------------------------------- 3) Zurueck stellt Position her
console.log("\n--- 3) Zurueck-Navigation ---");
async function backTest(label, scrollTo, forwardSel) {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(600);
  await page.evaluate((t) => window.scrollTo(0, t), scrollTo);
  await sleep(1000);
  const vorher = await y();
  const ok = await page.evaluate((s) => { const a = document.querySelector(s); if (!a) return false; a.click(); return true; }, forwardSel);
  if (!ok) { check(label, false, "Link nicht gefunden"); return; }
  await sleep(2200);
  const aufUnterseite = await y();
  await page.goBack();
  await sleep(2600);
  const nachher = await y();
  check(label, Math.abs(nachher - vorher) <= 40, { vorher, aufUnterseite, nachher, url: page.url().replace(BASE, "") });
}
await backTest("3-zurueck-von-leistungsseite", 3530, 'a[href^="/leistungen/"]');
await backTest("3-zurueck-von-work", 6300, 'a[href="/work"]');
// Kritischer Fall: kurze Seite -> lange Seite
await backTest("3-zurueck-von-impressum(kurz)", 9000, 'a[href="/impressum"]');

// Zwei Ebenen tief und zweimal zurueck
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await sleep(600);
await page.evaluate(() => window.scrollTo(0, 3530));
await sleep(900);
const l0 = await y();
// Ebene 1: Startseite -> Leistungs-Detailseite
await page.evaluate(() => document.querySelector('a[href^="/leistungen/"]')?.click());
await sleep(1800);
await page.evaluate(() => window.scrollTo(0, 2200));
await sleep(900);
const l1 = await y();
// Ebene 2: Detailseite -> Schwesterleistung (ServiceRelated am Seitenende)
const tiefer = await page.evaluate(() => {
  const hier = location.pathname;
  const a = [...document.querySelectorAll('a[href^="/leistungen/"]')].find((x) => x.getAttribute("href") !== hier);
  if (!a) return null;
  a.click();
  return a.getAttribute("href");
});
if (!tiefer) check("3-zwei-ebenen-vorbereitung", false, "keine zweite Leistungsseite verlinkt");
await sleep(1800);
await page.goBack(); await sleep(2200);
const b1 = await y();
await page.goBack(); await sleep(2400);
const b2 = await y();
check("3-zwei-ebenen-zurueck", Math.abs(b1 - l1) <= 40 && Math.abs(b2 - l0) <= 40, { l0, l1, zurueck1: b1, zurueck2: b2 });

// Vorwaerts wieder hin
await page.goForward(); await sleep(2200);
check("3-vorwaerts-wieder", Math.abs((await y()) - l1) <= 40, { y: await y(), erwartet: l1 });

// Zurueck waehrend Momentum
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await sleep(600);
await page.evaluate(() => window.scrollTo(0, 3530));
await sleep(900);
const mVor = await y();
await page.evaluate(() => document.querySelector('a[href^="/leistungen/"]')?.click());
await sleep(1800);
await wheelDown(8);
await page.goBack();
await sleep(2800);
check("3-zurueck-waehrend-momentum", Math.abs((await y()) - mVor) <= 60, { erwartet: mVor, y: await y() });

// ------------------------------------------------------------- 4) /work Kacheln
console.log("\n--- 4) /work erste Reihe ---");
{
  const slow = await ctx.newPage();
  const cdp = await ctx.newCDPSession(slow);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const t0 = Date.now();
  await slow.goto(`${BASE}/work`, { waitUntil: "commit" });
  let firstPaint = null;
  for (let i = 0; i < 45; i++) {
    const s = await slow.evaluate(() => {
      const tiles = [...document.querySelectorAll(".grid > div")].slice(0, 4);
      if (tiles.length < 4) return null;
      return tiles.every((t) => Number(getComputedStyle(t).opacity) === 1);
    }).catch(() => null);
    if (s) { firstPaint = Date.now() - t0; break; }
    await sleep(60);
  }
  check("4-erste-reihe-sichtbar", firstPaint !== null && firstPaint < 500, { nachMs: firstPaint, vorher: 1152 });
  await slow.close();
}

// -------------------------------------------------- 5) Scroll-Lock Case-Fenster
console.log("\n--- 5) Scroll-Lock ---");
await page.goto(`${BASE}/work`, { waitUntil: "networkidle" });
await sleep(1200);
await page.evaluate(() => window.scrollTo(0, 300));
await sleep(900);
const lockVor = await y();
await page.evaluate(() => document.querySelector(".grid button")?.click());
await sleep(900);
await page.mouse.move(20, 450);
for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 400); await sleep(30); }
await sleep(1200);
check("5-hintergrund-bleibt-stehen", (await y()) === lockVor, { vorher: lockVor, nachher: await y() });

// Menue auf/zu waehrend Modal offen
await page.evaluate(() => document.querySelector('button[aria-label="Menü öffnen"]')?.click());
await sleep(700);
await page.evaluate(() => document.querySelector('button[aria-label="Menü schließen"]')?.click());
await sleep(800);
const stillOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"][aria-modal="true"]'));
const ovl = await page.evaluate(() => document.body.style.overflow);
await page.mouse.move(20, 450);
for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 400); await sleep(30); }
await sleep(1000);
check("5-menue-zu-haelt-modal-lock", ovl === "hidden" && (await y()) === lockVor, { modalOffen: stillOpen, overflow: ovl, y: await y(), erwartet: lockVor });

// Modal schliessen -> Scroll wieder frei
await page.keyboard.press("Escape");
await sleep(900);
await page.mouse.move(720, 450);
for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 400); await sleep(30); }
await sleep(1200);
check("5-nach-schliessen-wieder-scrollbar", (await y()) > lockVor, { y: await y(), overflow: await page.evaluate(() => document.body.style.overflow) });

// ----------------------------------------- 6) Anker nicht mehr unter dem Header
console.log("\n--- 6) Anker unter fixem Header ---");
{
  const mob = await ctx.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(`${BASE}/#video-check`, { waitUntil: "networkidle" });
  await sleep(2200);
  const r = await mob.evaluate(() => {
    const el = document.getElementById("video-check");
    if (!el) return null;
    const h = el.querySelector("h2, h3, h1");
    return { sectionTop: Math.round(el.getBoundingClientRect().top), headingTop: h ? Math.round(h.getBoundingClientRect().top) : null };
  });
  check("6-anker-frei-vom-header", r != null && r.sectionTop >= 60, { ...r, headerHoehe: 70 });
  await mob.close();
}

// ------------------------------------------------------- 7) reduced motion
console.log("\n--- 7) prefers-reduced-motion ---");
{
  const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await rm.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(1000);
  await p.evaluate(() => window.scrollTo(0, 3530));
  await sleep(600);
  const yy = await p.evaluate(() => window.scrollY);
  await p.evaluate(() => document.querySelector('a[href^="/leistungen/"]')?.click());
  await sleep(1800);
  const top = await p.evaluate(() => window.scrollY);
  await p.goBack(); await sleep(2000);
  const back = await p.evaluate(() => window.scrollY);
  check("7-reduced-motion", top === 0 && Math.abs(back - yy) <= 40 && errs.length === 0, { hin: top, zurueck: back, erwartet: yy, fehler: errs.length });
  await rm.close();
}

// ------------------------------------------------------------- 8) Konsole
console.log("\n--- 8) Konsole ueber alle Routen ---");
consoleMsgs.length = 0;
for (const r of ["/", "/work", "/leistungen/studiobau", "/leistungen/video-produktion", "/impressum", "/datenschutz"]) {
  await page.goto(`${BASE}${r}`, { waitUntil: "networkidle" });
  await sleep(700);
}
// plus eine Client-Navigation (dort erschienen die Next-Warnungen)
await page.evaluate(() => document.querySelector('a[href="/"]')?.click());
await sleep(1800);
check("8-konsole-sauber", consoleMsgs.length === 0, consoleMsgs.slice(0, 6));

await browser.close();

const failed = rows.filter((r) => !r.ok);
console.log(`\n=== ${rows.length - failed.length}/${rows.length} bestanden ===`);
if (failed.length) console.log("FEHLGESCHLAGEN:\n" + failed.map((f) => ` - ${f.name}: ${JSON.stringify(f.detail)}`).join("\n"));
