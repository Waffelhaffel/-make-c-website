import { chromium, sleep, BASE, CHROME, ARTIFACTS, CONTENT } from "./config.mjs";
const rows = [];
const check = (n, ok, d) => { rows.push({ n, ok, d }); console.log(`${ok ? "OK  " : "FAIL"}  ${n}  ${JSON.stringify(d)}`); };

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

// 1) Startseite: alle sechs Selected-Work-Kacheln klickbar, Bilder laden ---------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  const bad = [];
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 160)); });
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
  p.on("response", (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url().slice(0, 90)}`); });

  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await sleep(2500);

  const grid = await p.evaluate(() => {
    const sec = document.getElementById("work");
    const tiles = [...sec.querySelectorAll(".grid > *")];
    return tiles.map((t) => {
      const img = t.querySelector("img");
      return {
        tag: t.tagName,
        klickbar: t.tagName === "BUTTON",
        cursor: t.getAttribute("data-cursor"),
        name: t.querySelector("p:last-of-type")?.textContent?.trim() ?? null,
        src: img?.getAttribute("src") ?? null,
        geladen: img ? img.naturalWidth > 0 : false,
      };
    });
  });
  const alleKlickbar = grid.length === CONTENT.SELECTED_WORK && grid.every((t) => t.klickbar && t.cursor === "VIEW" && t.geladen);
  check("1-selected-work-kacheln", alleKlickbar, { anzahl: grid.length, nichtKlickbar: grid.filter((t) => !t.klickbar).map((t) => t.name), nichtGeladen: grid.filter((t) => !t.geladen).map((t) => t.src) });

  // 2) Die drei neuen Kacheln öffnen ihr Case-Fenster ---------------------------
  for (const name of ["BarmeniaGothaer", "FOM Video", "TELEKOM"]) {
    const idx = grid.findIndex((t) => t.name === name);
    await p.evaluate((i) => {
      const sec = document.getElementById("work");
      [...sec.querySelectorAll(".grid > *")][i].click();
    }, idx);
    await sleep(900);
    const modal = await p.evaluate(() => {
      const d = document.querySelector('[role="dialog"][aria-modal="true"]');
      if (!d) return null;
      const img = d.querySelector("img");
      return {
        titel: d.querySelector("h2")?.textContent?.trim() ?? null,
        meta: d.querySelector("h2 + p")?.textContent?.trim() ?? null,
        text: d.querySelector("p.whitespace-pre-line")?.textContent?.trim().slice(0, 60) ?? null,
        bildGeladen: img ? img.naturalWidth > 0 : false,
        playButton: !!d.querySelector('button[aria-label*="abspielen" i], button[aria-label*="Video" i]'),
      };
    });
    await p.keyboard.press("Escape");
    await sleep(700);
    check(`2-modal-${name}`, !!modal && !!modal.titel && modal.bildGeladen, modal);
  }

  check("3-konsole-landing", errs.length === 0 && bad.length === 0, { konsole: errs.slice(0, 3), http: bad.slice(0, 3) });
  await ctx.close();
}

// 4) /work: alle Kacheln, Leistungs-Filter, neue Cases oben --------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  const bad = [];
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 160)); });
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
  p.on("response", (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url().slice(0, 90)}`); });

  await p.goto(`${BASE}/work`, { waitUntil: "networkidle" });
  await sleep(1500);

  const r = await p.evaluate(() => {
    const tiles = [...document.querySelectorAll(".grid > div")];
    const vh = window.innerHeight;
    return {
      anzahl: tiles.length,
      ersteVier: tiles.slice(0, 4).map((t) => t.querySelector("h2")?.textContent?.trim()),
      ersteVierKunde: tiles.slice(0, 4).map((t) => t.querySelector("p")?.textContent?.trim()),
      imViewportUnsichtbar: tiles.filter((t) => { const b = t.getBoundingClientRect(); return b.top < vh && b.bottom > 0 && Number(getComputedStyle(t).opacity) < 1; }).length,
      bilderKaputt: tiles.map((t) => t.querySelector("img")).filter((i) => i && i.complete && i.naturalWidth === 0).length,
      chips: [...document.querySelectorAll('[role="group"] button')].map((b) => b.textContent.trim()),
      trefferText: document.querySelector('[aria-live="polite"]')?.textContent?.trim(),
    };
  });
  check("4-work-raster", r.anzahl === CONTENT.CASES && r.imViewportUnsichtbar === 0 && r.bilderKaputt === 0 && r.trefferText === `${CONTENT.CASES} Projekte`, { anzahl: r.anzahl, ersteVier: r.ersteVier, kunde: r.ersteVierKunde, unsichtbar: r.imViewportUnsichtbar, kaputt: r.bilderKaputt, treffer: r.trefferText, chips: r.chips });

  // Die drei Filter, in denen die Selected-Work-Cases liegen. Seit 12.08.2026
  // sind das Leistungs-Namen, keine Genre-Kategorien mehr.
  for (const [chip, mind] of [["Video Studiobau", 1], ["Video AI", 1], ["Video Event Content", 1]]) {
    await p.evaluate((c) => { [...document.querySelectorAll('[role="group"] button')].find((b) => b.textContent.trim() === c)?.click(); }, chip);
    await sleep(800);
    const g = await p.evaluate(() => ({
      n: document.querySelectorAll(".grid > div").length,
      kunden: [...document.querySelectorAll(".grid > div p")].map((p) => p.textContent.trim()),
    }));
    check(`5-filter-${chip}`, g.n >= mind, { treffer: g.n, enthaeltNeuen: g.kunden.some((k) => /Telekom|FOM|BarmeniaGothaer/.test(k)) });
  }
  await p.evaluate(() => { [...document.querySelectorAll('[role="group"] button')].find((b) => b.textContent.trim() === "Alle")?.click(); });
  await sleep(800);
  const zurueck = await p.evaluate(() => document.querySelectorAll(".grid > div").length);
  check("6-filter-zurueck", zurueck === CONTENT.CASES, { zurueck });
  check("7-konsole-work", errs.length === 0 && bad.length === 0, { konsole: errs.slice(0, 3), http: bad.slice(0, 3) });

  // Screenshot der ersten Reihe
  await p.screenshot({ path: `${ARTIFACTS}/work-erste-reihe.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await ctx.close();
}

// 8) Mobile: Kacheln klickbar ---------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await sleep(2000);
  const n = await p.evaluate(() => document.querySelectorAll('#work .grid > button').length);
  await p.evaluate(() => document.querySelectorAll('#work .grid > button')[5]?.click());
  await sleep(1000);
  const offen = await p.evaluate(() => !!document.querySelector('[role="dialog"][aria-modal="true"]'));
  check("8-mobile", n === CONTENT.SELECTED_WORK && offen, { klickbareKacheln: n, modalOffen: offen });
  await ctx.close();
}

await browser.close();
const failed = rows.filter((r) => !r.ok);
console.log(`\n=== ${rows.length - failed.length}/${rows.length} bestanden ===`);
if (failed.length) console.log("FEHLGESCHLAGEN:\n" + failed.map((f) => ` - ${f.n}: ${JSON.stringify(f.d)}`).join("\n"));
