import { chromium, sleep, BASE, CHROME, CONTENT } from "./config.mjs";
const rows = [];
const check = (n, ok, d) => { rows.push({ n, ok, d }); console.log(`${ok ? "OK  " : "FAIL"}  ${n}  ${JSON.stringify(d)}`); };

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

// A) Direkter Aufruf mit Hash (frischer Load)
for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/#contact`, { waitUntil: "networkidle" });
  await sleep(2500);
  const r = await p.evaluate(() => {
    const el = document.getElementById("contact");
    const h = el?.querySelector("h2, h1, h3");
    return {
      scrollY: Math.round(window.scrollY),
      sectionTopViewport: el ? Math.round(el.getBoundingClientRect().top) : null,
      headingTopViewport: h ? Math.round(h.getBoundingClientRect().top) : null,
    };
  });
  check(`A-direkter-load-#contact@${vp.width}`, r.scrollY > 100 && r.sectionTopViewport >= 60, r);
  await ctx.close();
}

// B) Same-Page-Anker per Menue (der realistische Weg)
for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(900);
  await p.evaluate(() => document.querySelector('button[aria-label="Menü öffnen"]')?.click());
  await sleep(900);
  const clicked = await p.evaluate(() => {
    const a = [...document.querySelectorAll("a")].find((x) => x.getAttribute("href") === "#contact");
    if (!a) return false; a.click(); return true;
  });
  await sleep(3000);
  const r = await p.evaluate(() => {
    const el = document.getElementById("contact");
    const h = el?.querySelector("h2, h1, h3");
    return {
      scrollY: Math.round(window.scrollY),
      sectionTopViewport: el ? Math.round(el.getBoundingClientRect().top) : null,
      headingTopViewport: h ? Math.round(h.getBoundingClientRect().top) : null,
      overflow: document.body.style.overflow,
    };
  });
  check(`B-menue-anker-#contact@${vp.width}`, clicked && r.scrollY > 100 && r.sectionTopViewport >= 60, r);
  await ctx.close();
}

// C) Same-Page-Anker im Header (#work, Desktop-Nav)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(900);
  await p.evaluate(() => { const a = [...document.querySelectorAll("a")].find((x) => x.getAttribute("href") === "#work"); a?.click(); });
  await sleep(3000);
  const r = await p.evaluate(() => {
    const el = document.getElementById("work");
    return { scrollY: Math.round(window.scrollY), sectionTopViewport: Math.round(el.getBoundingClientRect().top) };
  });
  check("C-header-anker-#work", r.scrollY > 100 && r.sectionTopViewport >= 60, r);
  await ctx.close();
}

// D) Funktionsprobe: /work Filter + Case-Fenster
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 140)); });
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
  await p.goto(`${BASE}/work`, { waitUntil: "networkidle" });
  await sleep(1200);
  const alle = await p.evaluate(() => document.querySelectorAll(".grid > div").length);
  await p.evaluate((label) => {
    const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.trim() === label);
    b?.click();
  }, CONTENT.FILTER.label);
  await sleep(1200);
  const gefiltert = await p.evaluate(() => document.querySelectorAll(".grid > div").length);
  // Erwartung: alles, was im Viewport steht, ist sichtbar. Der Rest blendet
  // beim Scrollen ein — das ist gewollt, nicht der Bug.
  const sichtbarGefiltert = await p.evaluate(() => {
    const vh = window.innerHeight;
    const tiles = [...document.querySelectorAll(".grid > div")];
    const drin = tiles.filter((d) => { const r = d.getBoundingClientRect(); return r.top < vh && r.bottom > 0; });
    return { imViewport: drin.length, davonUnsichtbar: drin.filter((d) => Number(getComputedStyle(d).opacity) < 1).length };
  });
  await p.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.trim() === "Alle");
    b?.click();
  });
  await sleep(1400);
  const zurueck = await p.evaluate(() => document.querySelectorAll(".grid > div").length);
  await p.evaluate(() => document.querySelector(".grid button")?.click());
  await sleep(1000);
  const modal = await p.evaluate(() => {
    const d = document.querySelector('[role="dialog"][aria-modal="true"]');
    return { offen: !!d, titel: d?.querySelector("h2,h3")?.textContent?.slice(0, 40) ?? null };
  });
  await p.keyboard.press("Escape");
  await sleep(700);
  check("D-work-funktion", alle === CONTENT.CASES && gefiltert === CONTENT.FILTER.treffer && sichtbarGefiltert.davonUnsichtbar === 0 && zurueck === CONTENT.CASES && modal.offen && errs.length === 0, { alle, gefiltert, sichtbarGefiltert, zurueck, modal, konsole: errs.slice(0, 3) });
  await ctx.close();
}

// E) Landing: Kacheln klickbar, Hero da
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(1500);
  const r = await p.evaluate(() => ({
    klickbareKacheln: document.querySelectorAll('[data-cursor="VIEW"]').length,
    heroSichtbar: !!document.querySelector("h1"),
  }));
  check("E-landing", r.klickbareKacheln >= 3, r);
  await ctx.close();
}

await browser.close();
const failed = rows.filter((r) => !r.ok);
console.log(`\n=== ${rows.length - failed.length}/${rows.length} bestanden ===`);
if (failed.length) console.log("FEHLGESCHLAGEN:\n" + failed.map((f) => ` - ${f.n}: ${JSON.stringify(f.d)}`).join("\n"));
