import { chromium, sleep, BASE, CHROME } from "./config.mjs";
const rows = [];
const check = (n, ok, d) => { rows.push({ n, ok }); console.log(`${ok ? "OK  " : "FAIL"}  ${n}  ${JSON.stringify(d)}`); };

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

// === Der vom User beschriebene Weg, mit echtem Mausrad und echten Klicks ====
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const isMobile = vp.width < 700;
  const ctx = await browser.newContext({
    viewport: vp,
    hasTouch: isMobile,
    isMobile,
  });
  const p = await ctx.newPage();
  const label = `${vp.width}px`;

  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await sleep(1000);

  // Mit dem Mausrad / per Touch zur Leistungs-Sektion scrollen
  const ziel = await p.evaluate(() => {
    const el = document.getElementById("service");
    return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
  });
  if (isMobile) {
    await p.evaluate((t) => window.scrollTo(0, t), ziel);
  } else {
    await p.mouse.move(720, 450);
    let guard = 0;
    while ((await p.evaluate(() => window.scrollY)) < ziel - 200 && guard++ < 120) {
      await p.mouse.wheel(0, 400);
      await sleep(14);
    }
  }
  await sleep(1600);
  const vorher = await p.evaluate(() => window.scrollY);

  // Eine Leistungs-Kachel anklicken (echter Klick auf das Element)
  const linkInfo = await p.evaluate(() => {
    const sec = document.getElementById("service");
    const a = sec?.querySelector('a[href^="/leistungen/"]');
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return { href: a.getAttribute("href"), x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), imViewport: r.top >= 0 && r.bottom <= window.innerHeight };
  });
  if (!linkInfo) { check(`journey-${label}`, false, "keine Leistungs-Kachel in #service gefunden"); await ctx.close(); continue; }

  if (isMobile) {
    await p.tap(`a[href="${linkInfo.href}"]`).catch(async () => { await p.evaluate((h) => document.querySelector(`a[href="${h}"]`).click(), linkInfo.href); });
  } else if (linkInfo.imViewport) {
    await p.mouse.click(linkInfo.x, linkInfo.y);
  } else {
    await p.evaluate((h) => document.querySelector(`a[href="${h}"]`).click(), linkInfo.href);
  }
  await sleep(2400);
  const aufSeite = await p.evaluate(() => ({ y: window.scrollY, url: location.pathname }));

  // Zurück
  await p.goBack();
  await sleep(2600);
  const nach = await p.evaluate(() => {
    const el = document.getElementById("service");
    const r = el.getBoundingClientRect();
    return {
      y: Math.round(window.scrollY),
      sektionImBild: r.top < window.innerHeight && r.bottom > 0,
      sektionTopViewport: Math.round(r.top),
    };
  });

  check(`journey-${label}`, aufSeite.y === 0 && Math.abs(nach.y - vorher) <= 40 && nach.sektionImBild, {
    scrollVorher: Math.round(vorher), unterseite: aufSeite, zurueck: nach,
  });
  await ctx.close();
}

// === Weg über die Übersichtsseite /leistungen ===============================
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/leistungen/video-produktion`, { waitUntil: "networkidle" });
  await sleep(900);
  await p.evaluate(() => window.scrollTo(0, 2600));
  await sleep(1000);
  const vorher = await p.evaluate(() => window.scrollY);
  await p.evaluate(() => document.querySelector('a[href^="/leistungen/"]')?.click());
  await sleep(2200);
  const auf = await p.evaluate(() => ({ y: window.scrollY, url: location.pathname }));
  await p.goBack();
  await sleep(2400);
  const zurueck = await p.evaluate(() => window.scrollY);
  check("journey-detail-zu-detail", auf.y === 0 && Math.abs(zurueck - vorher) <= 40, { vorher, auf, zurueck });
  await ctx.close();
}

// === Modal: Link im Modal (Lock + Navigation) ===============================
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/work`, { waitUntil: "networkidle" });
  await sleep(1300);
  await p.evaluate(() => document.querySelector(".grid button")?.click());
  await sleep(900);
  // Über das Header-Logo navigieren, während das Modal offen ist
  await p.evaluate(() => document.querySelector('header a[href="/"]')?.click());
  await sleep(2400);
  const r = await p.evaluate(async () => {
    const before = window.scrollY;
    window.scrollTo(0, 600);
    await new Promise((res) => setTimeout(res, 400));
    return { url: location.pathname, overflow: document.body.style.overflow, vorher: before, konnteScrollen: window.scrollY };
  });
  // Und danach per Mausrad
  await p.mouse.move(720, 450);
  for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 300); await sleep(30); }
  await sleep(1200);
  const rad = await p.evaluate(() => window.scrollY);
  check("modal-offen-dann-navigiert", r.url === "/" && r.overflow === "" && rad > 600, { ...r, nachMausrad: rad });
  await ctx.close();
}

await browser.close();
const failed = rows.filter((r) => !r.ok);
console.log(`\n=== ${rows.length - failed.length}/${rows.length} bestanden ===`);
