const fs = require('fs');
const path = require('path');

const files = [
  'diccionario-musical/tonalidades/index.html',
  'diccionario-musical/tonalidades/tonalidades-vecinas/index.html',
  'ejercicios/acordes/index.html',
  'ejercicios/acordes/triadas-en-fundamental/index.html',
  'ejercicios/acordes/triadas-en-primera-inversion/index.html',
  'ejercicios/acordes/triadas-en-segunda-inversion/index.html',
  'ejercicios/acordes/triadas-todas-las-posiciones/index.html',
  'ejercicios/compases/analizar-compas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/cuartas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/distancia/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/octavas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/quintas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/segundas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/sextas/index.html',
  'ejercicios/ejercicios-de-intervalos-musicales/terceras/index.html',
  'ejercicios/escalas/construir-escala-mayor/index.html',
  'ejercicios/escalas/escalas-mayores-mixta-principal/index.html',
  'ejercicios/escalas/escalas-mayores-mixta-secundaria/index.html',
  'ejercicios/escalas/escalas-mayores/index.html',
  'ejercicios/escalas/escalas-menores-armonica/index.html',
  'ejercicios/escalas/escalas-menores-melodica/index.html',
  'ejercicios/escalas/escalas-menores-natural/index.html',
  'ejercicios/escalas/todas-las-escalas/index.html',
  'ejercicios/tonalidades/index.html',
  'ejercicios/tonalidades/tonalidades-vecinas/index.html',
];

const NEW_DATE = '2026-05-29';
const ROOT = path.join(__dirname, '..');
let updated = 0;
let skipped = 0;

for (const rel of files) {
  const fp = path.join(ROOT, rel);
  let html = fs.readFileSync(fp, 'utf8');
  const match = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/);
  if (!match) { console.log('No dateModified found:', rel); skipped++; continue; }
  if (match[1] === NEW_DATE) { skipped++; continue; }
  html = html.replace(/"dateModified":"[^"]*"/, `"dateModified":"${NEW_DATE}"`);
  fs.writeFileSync(fp, html);
  console.log(`Updated ${match[1]} → ${NEW_DATE}: ${rel}`);
  updated++;
}
console.log(`\nUpdated: ${updated}, Already current: ${skipped}`);
