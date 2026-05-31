const fs = require('fs');
const path = require('path');

const files = [
  'diccionario-musical/intervalos/intervalos-musicales/index.html',
  'ejercicios/acordes/construir-triadas/index.html',
  'ejercicios/acordes/construir-triadas-primera-inversion/index.html',
  'ejercicios/acordes/construir-triadas-segunda-inversion/index.html',
  'ejercicios/acordes/construir-triadas-todas-posiciones/index.html',
  'ejercicios/acordes/triadas-en-fundamental/index.html',
  'ejercicios/acordes/triadas-en-primera-inversion/index.html',
  'ejercicios/acordes/triadas-en-segunda-inversion/index.html',
  'ejercicios/acordes/triadas-todas-las-posiciones/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/cuartas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/octavas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/quintas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/segundas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/sextas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/terceras/index.html',
];

const ROOT = path.join(__dirname, '..');
let totalFixed = 0;

for (const rel of files) {
  const fp = path.join(ROOT, rel);
  let html = fs.readFileSync(fp, 'utf8');
  let count = 0;

  // Match <table ... > ... </table> blocks not already preceded by tm-table-wrap
  // We replace occurrences of <table class="tm-table"> ... </table>
  // that are NOT preceded (within 200 chars) by tm-table-wrap
  html = html.replace(/(<table class="tm-table">[\s\S]*?<\/table>)/g, (match, tableHtml, offset) => {
    const before = html.slice(Math.max(0, offset - 200), offset);
    if (before.includes('tm-table-wrap')) return match;
    count++;
    return `<div class="tm-table-wrap">\n${tableHtml}\n</div>`;
  });

  if (count > 0) {
    fs.writeFileSync(fp, html);
    console.log(`Fixed ${count} table(s) in: ${rel}`);
    totalFixed += count;
  } else {
    console.log(`No unwrapped tables found in: ${rel}`);
  }
}

console.log(`\nTotal tables wrapped: ${totalFixed}`);
