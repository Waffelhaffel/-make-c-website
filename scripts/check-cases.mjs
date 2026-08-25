/**
 * Inhaltsstand der Referenzen — wertet `lib/content/cases.ts` maschinell aus.
 *
 *   node scripts/check-cases.mjs          Tabelle auf der Konsole
 *   node scripts/check-cases.mjs --json   GRUPPEN/SUMMEN für das Artefakt
 *
 * Speist das Artefakt „Case-Lücken" beim User
 * (claude.ai/code/artifact/584daaf3-2b3c-4d09-98a2-24de80a49701). Bis zum
 * 25.08.2026 lag dieses Skript nur in /tmp und musste zweimal neu geschrieben
 * werden — die Übergabe vom 22.08. hatte genau das schon vorgeschlagen.
 *
 * ⚠️ **Eine Angabe ist nicht ableitbar und wird von Hand gepflegt:** `IMPORTIERT`
 * unten. Die Ersterhebung hat „Text nie bestätigt" an der Schreibweise im
 * Quelltext erkannt — ein String-Literal galt als Import, ein per `+`
 * umbrochener Text als redigiert. Das trägt nicht mehr, seit der User Copy
 * geliefert hat, die wortgleich mit dem Importtext ist: die Schreibweise ändert
 * sich dadurch nicht, der Status schon. Wer einen dieser Texte bestätigt
 * bekommt, streicht den Slug hier.
 *
 * Das Skript liest nur — es schreibt nichts und ändert nichts.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..") + "/";
const src = readFileSync(ROOT + "lib/content/cases.ts", "utf8");

// Array-Literal herausschneiden und als JS auswerten (die Datei ist bis auf die
// Typ-Annotation reines JS).
const start = src.indexOf("export const CASES");
const arrStart = src.indexOf("[", start);
const arrEnd = src.indexOf("\n];", arrStart);
const literal = src.slice(arrStart, arrEnd + 2);
const CASES = eval(literal);

// Welche Cases sind verlinkt? (Startseite + Leistungsseiten)
const data = readFileSync(ROOT + "lib/data.ts", "utf8");
const leist = readFileSync(ROOT + "lib/leistungen.ts", "utf8");
const prominent = new Set([
  ...[...data.matchAll(/caseSlug: "([^"]+)"/g)].map((m) => m[1]),
  ...[...leist.matchAll(/caseSlugs:\s*\[([^\]]*)\]/g)].flatMap((m) =>
    [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
  ),
]);

// „Import, ungeprüft" — ausdrückliche Liste. Die erste Erhebung (22.08.) hat das
// noch an der Schreibweise im Quelltext erkannt (ein String-Literal = Import,
// per `+` umbrochen = redigiert). Das trägt seit dem 24.08. nicht mehr: der User
// hat an dem Tag für 15 dieser Cases die Copy geliefert, teils wortgleich mit dem
// Importtext — die Schreibweise im Code ändert sich dadurch nicht, der Status
// aber schon. Übrig bleiben die Cases, zu denen bis heute nie jemand etwas
// bestätigt hat.
const IMPORTIERT = new Set([
  "simon-mobile",
  "gothaer-versicherung",
  "toyota-cross-und-quer",
  "bdsi-twitter-videos",
  "high-tech-gruenderfonds",
  "greentech-festival",
  "anuga-live-stream",
  "aldi",
]);
// Sonderfall: Text von mir nach Stichworten formuliert, nicht vom User geliefert.
/** Text von Claude nach Stichworten des Users formuliert, nicht geliefert. */
const SELBST_FORMULIERT = new Set(["fom-studio"]);

const absaetze = (s) => s.split("\n\n").filter(Boolean).length;

const eintraege = CASES.map((c) => {
  const platzhalter = /Platzhalter — Beschreibung folgt/.test(c.summary);
  const istImport = IMPORTIERT.has(c.slug) && !platzhalter;
  const nVideos = (c.video ? 1 : 0) + (c.secondaryVideos?.length ?? 0);
  const felder = [
    platzhalter
      ? { k: "Text", s: 0, v: "Platzhalter" }
      : SELBST_FORMULIERT.has(c.slug)
      ? { k: "Text", s: 1, v: "von mir formuliert" }
      : istImport
      ? { k: "Text", s: 1, v: "Import, ungeprüft" }
      : { k: "Text", s: 2, v: `${absaetze(c.summary)} Absätze` },
    c.video
      ? { k: "Video", s: 2, v: nVideos > 1 ? `${nVideos} Videos` : "vorhanden" }
      : { k: "Video", s: 0, v: "fehlt" },
    c.credits?.length
      ? { k: "Credits", s: 2, v: `${c.credits.length} ${c.credits.length === 1 ? "Rolle" : "Rollen"}` }
      : { k: "Credits", s: 0, v: "fehlen" },
    c.services?.length
      ? { k: "Leistungen", s: c.services.length === 1 ? 1 : 2, v: `${c.services.length} ${c.services.length === 1 ? "Tag" : "Tags"}` }
      : { k: "Leistungen", s: 0, v: "fehlen" },
  ];
  return {
    slug: c.slug,
    client: c.client,
    year: c.year,
    prominent: prominent.has(c.slug),
    galerie: c.gallery?.length ?? 0,
    platzhalter,
    felder,
    punkte: felder.reduce((a, f) => a + f.s, 0),
  };
});

const S = {
  gesamt: eintraege.length,
  fertig: eintraege.filter((e) => e.punkte === 8).length,
  ohneVideo: eintraege.filter((e) => e.felder[1].s === 0).length,
  ohneCredits: eintraege.filter((e) => e.felder[2].s === 0).length,
  ohneLeistungen: eintraege.filter((e) => e.felder[3].s === 0).length,
  platzhalter: eintraege.filter((e) => e.platzhalter).length,
  importText: eintraege.filter((e) => e.felder[0].s === 1).length,
  mitGalerie: eintraege.filter((e) => e.galerie > 0).length,
};



// ── Gruppierung wie in der Erstfassung: fertig raus, dann verlinkt / nur /work,
//    innerhalb der Gruppen die schlechtesten zuerst.
const sortiert = (a) => [...a].sort((x, y) => x.punkte - y.punkte || x.slug.localeCompare(y.slug));
const platz = eintraege.filter((e) => e.platzhalter);
const rest = eintraege.filter((e) => !e.platzhalter);
const fertig = rest.filter((e) => e.punkte === 8);
const offen = rest.filter((e) => e.punkte < 8);

const GRUPPEN = [
  { id: "platzhalter", titel: "Platzhaltertext steht sichtbar auf der Seite",
    hinweis: "Im Case-Fenster stand wörtlich „Platzhalter — Beschreibung folgt.“ Seit dem 24.08.2026 leer.",
    art: "alarm", eintraege: sortiert(platz) },
  { id: "prominent", titel: "Von Startseite oder Leistungsseite verlinkt",
    hinweis: "Diese Cases erreicht jeder Besucher über das Selected-Work-Raster oder eine Leistungsseite — hier fallen Lücken am ehesten auf.",
    art: "wichtig", eintraege: sortiert(offen.filter((e) => e.prominent)) },
  { id: "uebrig", titel: "Nur über /work erreichbar",
    hinweis: "Dieselben Lücken, aber weniger Laufkundschaft.",
    art: "normal", eintraege: sortiert(offen.filter((e) => !e.prominent)) },
  { id: "fertig", titel: "Vollständig",
    hinweis: "Text, Video, Credits und Leistungen sind gepflegt.",
    art: "fertig", eintraege: sortiert(fertig) },
];

if (process.argv.includes("--json")) {
  console.log("const GRUPPEN = " + JSON.stringify(GRUPPEN) + ";");
  console.log("const SUMMEN = " + JSON.stringify(S) + ";");
} else {
  console.log(
    `${S.gesamt} Referenzen · ${S.fertig} vollständig · ${S.ohneVideo} ohne Video · ` +
      `${S.ohneCredits} ohne Credits · ${S.ohneLeistungen} ohne Leistungen · ` +
      `${S.platzhalter} Platzhalter · ${S.importText} Text nie bestätigt\n`
  );
  for (const g of GRUPPEN) {
    if (!g.eintraege.length) continue;
    console.log(`── ${g.titel} (${g.eintraege.length})`);
    for (const e of g.eintraege) {
      const bal = e.felder.map((f) => "·-█"[f.s]).join("");
      const luecken = e.felder.filter((f) => f.s < 2).map((f) => `${f.k}: ${f.v}`).join(", ");
      console.log(
        `   ${String(e.punkte).padStart(2)}/8 ${bal} ${e.prominent ? "★" : " "} ` +
          `${e.slug.padEnd(38)} ${luecken || "—"}`
      );
    }
    console.log("");
  }
}
