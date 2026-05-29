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

let updated = 0;
for (const rel of TARGETS) {
  const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
  let html = fs.readFileSync(fp, 'utf8');
  const next = html
    .replace(/class="tm-cta tm-cta--teal"/g, 'class="tm-cta-btn tm-cta-btn--teal"')
    .replace(/class="tm-cta tm-cta--gold"/g, 'class="tm-cta-btn tm-cta-btn--gold"')
    .replace(/class="tm-cta tm-cta--gray"/g, 'class="tm-cta-btn tm-cta-btn--gray"');
  if (next !== html) {
    fs.writeFileSync(fp, next, 'utf8');
    console.log('Updated:', rel);
    updated++;
  }
}
console.log('\nTotal files updated:', updated);
