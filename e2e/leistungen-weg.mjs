import { chromium, sleep, BASE as B, CHROME as C } from "./config.mjs";
const rows=[]; const check=(n,ok,d)=>{rows.push({n,ok});console.log(`${ok?"OK  ":"FAIL"}  ${n}  ${JSON.stringify(d)}`)};
const b=await chromium.launch({executablePath:C});

for (const vp of [{width:1440,height:900},{width:390,height:844}]) {
  const ctx=await b.newContext({viewport:vp});
  const p=await ctx.newPage();
  const errs=[]; p.on("console",m=>{if(m.type()==="error"||m.type()==="warning")errs.push(m.text().slice(0,120))});
  p.on("pageerror",e=>errs.push(String(e).slice(0,120)));

  // 1) Header-Link "Leistungen" auf der Startseite -> springt zur Sektion
  await p.goto(`${B}/`,{waitUntil:"networkidle"}); await sleep(900);
  const zielTop=await p.evaluate(()=>{const e=document.getElementById("service");return Math.round(e.getBoundingClientRect().top+window.scrollY)});
  let geklickt=await p.evaluate(()=>{const a=[...document.querySelectorAll("header a")].find(x=>x.textContent.trim()==="Leistungen");if(!a)return false;a.click();return true});
  if(!geklickt){ // Mobile: Link steckt im Menü
    await p.evaluate(()=>document.querySelector('button[aria-label="Menü öffnen"]')?.click()); await sleep(800);
    geklickt=await p.evaluate(()=>{const a=[...document.querySelectorAll("a")].find(x=>x.textContent.trim()==="Leistungen");if(!a)return false;a.click();return true});
  }
  await sleep(2800);
  const y1=await p.evaluate(()=>window.scrollY);
  check(`header-link-startseite@${vp.width}`, geklickt && Math.abs(y1-(zielTop-84))<=8, {ziel:zielTop, y:y1, erwartet:zielTop-84});

  // 2) Von der Startseite in eine Detailseite und per Zurück wieder hin
  const vorher=await p.evaluate(()=>window.scrollY);
  await p.evaluate(()=>document.querySelector('#service a[href^="/leistungen/"]')?.click());
  await sleep(2400);
  const auf=await p.evaluate(()=>({y:window.scrollY,url:location.pathname}));
  await p.goBack(); await sleep(2600);
  const zurueck=await p.evaluate(()=>{const e=document.getElementById("service");const r=e.getBoundingClientRect();return {y:Math.round(window.scrollY),sektionImBild:r.top<window.innerHeight&&r.bottom>0}});
  check(`zurueck-landet-bei-leistungen@${vp.width}`, auf.y===0 && Math.abs(zurueck.y-vorher)<=40 && zurueck.sektionImBild, {vorher:Math.round(vorher),unterseite:auf,zurueck});

  // 3) Brotkrume "Leistungen" auf der Detailseite -> zurück zur Sektion
  await p.goto(`${B}/leistungen/video-produktion`,{waitUntil:"networkidle"}); await sleep(900);
  await p.evaluate(()=>{const a=[...document.querySelectorAll('nav[aria-label="Brotkrumen"] a')].find(x=>x.textContent.trim()==="Leistungen");a?.click()});
  await sleep(2800);
  const bc=await p.evaluate(()=>{const e=document.getElementById("service");const r=e.getBoundingClientRect();return {url:location.pathname+location.hash,y:Math.round(window.scrollY),sektionOben:Math.round(r.top)}});
  check(`brotkrume-zur-sektion@${vp.width}`, bc.url==="/#service" && Math.abs(bc.sektionOben-84)<=8, bc);

  // 4) Header-Link von einer Detailseite aus
  await p.goto(`${B}/leistungen/studiobau`,{waitUntil:"networkidle"}); await sleep(900);
  let ok2=await p.evaluate(()=>{const a=[...document.querySelectorAll("header a")].find(x=>x.textContent.trim()==="Leistungen");if(!a)return false;a.click();return true});
  if(!ok2){await p.evaluate(()=>document.querySelector('button[aria-label="Menü öffnen"]')?.click());await sleep(800);
    ok2=await p.evaluate(()=>{const a=[...document.querySelectorAll("a")].find(x=>x.textContent.trim()==="Leistungen");if(!a)return false;a.click();return true});}
  await sleep(2800);
  const hd=await p.evaluate(()=>{const e=document.getElementById("service");return {url:location.pathname,sektionOben:Math.round(e.getBoundingClientRect().top)}});
  check(`header-von-detailseite@${vp.width}`, ok2 && hd.url==="/" && Math.abs(hd.sektionOben-84)<=8, hd);

  // 5) Alte URL /leistungen aufrufen
  await p.goto(`${B}/leistungen`,{waitUntil:"networkidle"}); await sleep(2400);
  const rd=await p.evaluate(()=>{const e=document.getElementById("service");return {url:location.pathname+location.hash,sektionOben:Math.round(e.getBoundingClientRect().top)}});
  check(`alte-url-leitet-um@${vp.width}`, rd.url==="/#service" && Math.abs(rd.sektionOben-84)<=10, rd);

  check(`konsole@${vp.width}`, errs.length===0, errs.slice(0,3));
  await ctx.close();
}
await b.close();
const f=rows.filter(r=>!r.ok);
console.log(`\n=== ${rows.length-f.length}/${rows.length} bestanden ===`);
