/**
 * Sammelläufer: startet alle Suiten nacheinander und fasst zusammen.
 *
 *   npm run build && npm run start   # in einem zweiten Terminal
 *   npm run e2e
 *
 * Jede Suite läuft als eigener Prozess — eine abstürzende Suite reißt die
 * anderen nicht mit, und die Browser-Instanzen behindern sich nicht.
 * Exit-Code 1, sobald irgendein Check fehlschlägt (CI-tauglich).
 */

import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { BASE } from "./config.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

const SUITES = [
  ["verify-fix.mjs", "Scrollverhalten, Modal-Lock, Konsole über alle Routen"],
  ["verify-anchor.mjs", "Deep-Links, Anker aus Menü und Header, /work"],
  ["journey.mjs", "Vor und zurück zwischen Landing und Leistungsseiten"],
  ["leistungen-weg.mjs", "#service-Anker, Brotkrume, Weiterleitung von /leistungen"],
  ["selected-work.mjs", "Selected-Work-Kacheln, Case-Fenster, Filter, Mobile"],
];

// Ohne laufenden Server bricht jede Suite mit demselben Fehler ab — einmal
// vorher prüfen spart fünf identische Stacktraces.
try {
  const res = await fetch(BASE, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error(
    `\nKein Server unter ${BASE} (${err.message}).\n` +
      `  npm run build && npm run start\n` +
      `Der Dev-Server taugt nicht: die Suiten messen Ladezeiten und ` +
      `Einblend-Verhalten am Production-Build.\n`
  );
  process.exit(2);
}

const run = (file) =>
  new Promise((done) => {
    const child = spawn(process.execPath, [resolve(HERE, file)], {
      stdio: ["ignore", "pipe", "inherit"],
    });
    let out = "";
    child.stdout.on("data", (d) => {
      out += d;
      process.stdout.write(d);
    });
    child.on("close", (code) => {
      const m = out.match(/=== (\d+)\/(\d+) bestanden ===/);
      done({
        file,
        code,
        passed: m ? Number(m[1]) : 0,
        total: m ? Number(m[2]) : 0,
        ok: !!m && m[1] === m[2] && code === 0,
      });
    });
  });

const results = [];
for (const [file, was] of SUITES) {
  console.log(`\n\n${"─".repeat(72)}\n▶  ${file} — ${was}\n${"─".repeat(72)}`);
  results.push(await run(file));
}

console.log(`\n\n${"═".repeat(72)}\nZUSAMMENFASSUNG\n${"═".repeat(72)}`);
let passed = 0;
let total = 0;
for (const r of results) {
  passed += r.passed;
  total += r.total;
  console.log(
    `${r.ok ? "✓" : "✗"}  ${r.file.padEnd(22)} ${String(r.passed).padStart(2)}/${r.total}` +
      (r.code === 0 ? "" : `   (Exit ${r.code})`)
  );
}
const failed = results.filter((r) => !r.ok);
console.log(`\n${passed}/${total} Checks bestanden, ${results.length - failed.length}/${results.length} Suiten grün`);
process.exit(failed.length ? 1 : 0);
