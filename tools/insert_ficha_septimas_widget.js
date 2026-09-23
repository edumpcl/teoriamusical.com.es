'use strict';
/* Inserta el generador EN VIVO (assets/js/ficha-septimas-engine.js) en las
 * 21 páginas de ejercicios de acordes de séptima, justo debajo de la ficha
 * PDF estática que ya insertó insert_fichas_septimas.js.
 *
 * Uso: node tools/insert_ficha_septimas_widget.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'ejercicios', 'acordes');
const DRY = process.argv.includes('--dry');

const MAPA = {};

['dominante', 'sensible', 'disminuida'].forEach(tipoId => {
  const prefijo = tipoId === 'dominante' ? 'construir-septima-de-dominante' : tipoId === 'sensible' ? 'construir-septima-de-sensible' : 'construir-septima-disminuida';
  ['', '-primera-inversion', '-segunda-inversion', '-tercera-inversion', '-todas-las-posiciones'].forEach(suf => {
    MAPA[prefijo + suf] = { modo: 'escribir', tiposIds: [tipoId], invs: [0, 1, 2, 3] };
  });
});
MAPA['construir-septimas-mezcladas'] = { modo: 'escribir', tiposIds: ['dominante', 'sensible', 'disminuida'], invs: [0, 1, 2, 3] };

MAPA['septimas-en-fundamental'] = { modo: 'analizar', tiposIds: ['dominante', 'sensible', 'disminuida'], invs: [0] };
MAPA['septimas-en-primera-inversion'] = { modo: 'analizar', tiposIds: ['dominante', 'sensible', 'disminuida'], invs: [1] };
MAPA['septimas-en-segunda-inversion'] = { modo: 'analizar', tiposIds: ['dominante', 'sensible', 'disminuida'], invs: [2] };
MAPA['septimas-en-tercera-inversion'] = { modo: 'analizar', tiposIds: ['dominante', 'sensible', 'disminuida'], invs: [3] };
MAPA['septimas-todas-las-posiciones'] = { modo: 'analizar', tiposIds: ['dominante', 'sensible', 'disminuida'], invs: [0, 1, 2, 3] };

let count = 0, faltan = [];
fs.readdirSync(DIR).filter(d => (d.startsWith('construir-septima') || d.startsWith('septimas-')) && fs.statSync(path.join(DIR, d)).isDirectory()).forEach(slug => {
  const cfg = MAPA[slug];
  if (!cfg) { faltan.push(slug); return; }
  const file = path.join(DIR, slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('ficha-septimas-engine.js')) { console.log('  (ya tenía widget) ' + slug); return; }
  const marker = 'Se puede imprimir y fotocopiar libremente para el aula.</p>\n';
  if (!html.includes(marker)) { console.log('  ! marcador no encontrado en ' + slug); return; }
  const bloque = marker
    + '\n<p>¿Necesitas más de una hoja? Aquí puedes generar <strong>más fichas</strong>, cada una con acordes distintos, e imprimirlas directamente desde el navegador.</p>\n'
    + '<div id="tmfs"></div>\n'
    + '<script src="/assets/js/ficha-septimas-engine.js" defer></script>\n'
    + '<script>\n'
    + '  document.addEventListener("DOMContentLoaded", function () {\n'
    + '    if (window.tmFichaSeptimas) tmFichaSeptimas("tmfs", ' + JSON.stringify(cfg) + ');\n'
    + '  });\n'
    + '</script>\n';
  html = html.replace(marker, bloque);
  if (!DRY) fs.writeFileSync(file, html, 'utf8');
  count++;
  console.log('  ✓ ' + slug + ' -> ' + JSON.stringify(cfg));
});

if (faltan.length) console.log('\nSin mapa para:', faltan.join(', '));
console.log(`\n${count} página(s) actualizada(s)${DRY ? ' (dry-run)' : ''}.`);
