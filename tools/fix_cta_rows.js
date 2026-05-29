const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGETS = [
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/cuartas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/octavas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/quintas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/segundas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/semitono-y-enarmonicas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/sextas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/terceras/index.html',
];

const REPLACEMENTS = [
  // flex container variants
  [/style="display:flex;gap:12px;flex-wrap:wrap;margin-top:\d+px;"/g, 'class="tm-cta-row"'],
  // teal button
  [/style="background:#2a7a6e;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:700;"/g, 'class="tm-cta tm-cta--teal"'],
  // gold button
  [/style="background:#8b6914;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:700;"/g, 'class="tm-cta tm-cta--gold"'],
  // gray button
  [/style="background:#555;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:700;"/g, 'class="tm-cta tm-cta--gray"'],
];

let updated = 0;
for (const rel of TARGETS) {
  const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;
  for (const [pat, rep] of REPLACEMENTS) {
    const next = html.replace(pat, rep);
    if (next !== html) { html = next; changed = true; }
  }
  if (changed) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log('Updated:', rel);
    updated++;
  }
}
console.log('\nTotal files updated:', updated);
