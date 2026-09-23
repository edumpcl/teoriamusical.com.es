'use strict';
/* Inserta el bloque "Ficha para imprimir (PDF)" en las 21 páginas de
 * ejercicios de acordes de séptima, enlazando cada una con su ficha
 * correspondiente (generate-fichas-septimas.js):
 *   - construir-septima-<tipo>[-posicion]/  -> ficha-escribir-septimas-<tipo>
 *     (la ficha "escribir" es por TIPO, con las 4 posiciones mezcladas
 *     dentro, así que las 5 páginas de un mismo tipo comparten ficha)
 *   - construir-septimas-mezcladas/         -> ficha-escribir-septimas-mezcladas
 *   - septimas-<posicion>/                  -> ficha-analizar-septimas-<posicion>
 *
 * Uso: node tools/insert_fichas_septimas.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'ejercicios', 'acordes');
const IMG = '/assets/img/acordes/fichas-septimas';
const DRY = process.argv.includes('--dry');

const TIPO_INFO = {
  dominante: { archivo: 'dominante', titulo: 'la séptima de dominante', hoja: 'séptimas de dominante' },
  sensible: { archivo: 'sensible', titulo: 'la séptima de sensible', hoja: 'séptimas de sensible' },
  disminuida: { archivo: 'disminuida', titulo: 'la séptima disminuida', hoja: 'séptimas disminuidas' },
};

const POS_INFO = {
  fundamental: { archivo: 'fundamental', titulo: 'en fundamental' },
  'primera-inversion': { archivo: 'primera-inversion', titulo: 'en 1ª inversión' },
  'segunda-inversion': { archivo: 'segunda-inversion', titulo: 'en 2ª inversión' },
  'tercera-inversion': { archivo: 'tercera-inversion', titulo: 'en 3ª inversión' },
  'todas-las-posiciones': { archivo: 'todas-las-posiciones', titulo: 'con las cuatro posiciones mezcladas' },
};

function fichaBlock(modo, archivo, descripcion, alt) {
  const base = `ficha-${modo}-septimas-${archivo}`;
  return `<h2>Ficha para imprimir (PDF)</h2>
<p>${descripcion}</p>
<figure class="tm-staff">
  <a href="${IMG}/${base}.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${IMG}/preview-${base}.webp"><img src="${IMG}/preview-${base}.png" width="300" height="424" loading="lazy" alt="${alt}"></picture></a>
  <figcaption>Hoja A4 con 21 acordes.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${IMG}/${base}.pdf" target="_blank" rel="noopener">Descargar la ficha (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="${IMG}/${base}-soluciones.pdf" target="_blank" rel="noopener">Soluciones</a></p>
<p>Se puede imprimir y fotocopiar libremente para el aula.</p>

`;
}

/* Mapa explícito slug -> {modo, archivo, descripcion, alt} para no depender
   de heurísticas de nombre. */
const MAPA = {};

['dominante', 'sensible', 'disminuida'].forEach(tipoId => {
  const t = TIPO_INFO[tipoId];
  const prefijo = tipoId === 'dominante' ? 'construir-septima-de-dominante' : tipoId === 'sensible' ? 'construir-septima-de-sensible' : 'construir-septima-disminuida';
  const posSufijos = { '': 'en fundamental', '-primera-inversion': 'en 1ª inversión', '-segunda-inversion': 'en 2ª inversión', '-tercera-inversion': 'en 3ª inversión', '-todas-las-posiciones': 'con las cuatro posiciones mezcladas' };
  Object.keys(posSufijos).forEach(suf => {
    MAPA[prefijo + suf] = {
      modo: 'escribir', archivo: t.archivo,
      descripcion: `El mismo ejercicio en papel, para clase: <strong>21 acordes</strong> de ${t.titulo}, con la nota más grave dada, en una cara de A4. El alumno escribe las otras tres. Con <strong>hoja de soluciones</strong> aparte.`,
      alt: `Ficha imprimible en PDF para escribir ${t.hoja}`,
    };
  });
});

MAPA['construir-septimas-mezcladas'] = {
  modo: 'escribir', archivo: 'mezcladas',
  descripcion: 'El mismo ejercicio en papel, para clase: <strong>21 acordes</strong> de séptima (dominante, sensible o disminuida, y cualquiera de sus cuatro posiciones), con la nota más grave dada, en una cara de A4. El alumno escribe las otras tres. Con <strong>hoja de soluciones</strong> aparte.',
  alt: 'Ficha imprimible en PDF para escribir acordes de séptima mezclados',
};

Object.keys(POS_INFO).forEach(posKey => {
  const p = POS_INFO[posKey];
  const slug = 'septimas-' + (posKey === 'fundamental' ? 'en-fundamental'
    : posKey === 'primera-inversion' ? 'en-primera-inversion'
    : posKey === 'segunda-inversion' ? 'en-segunda-inversion'
    : posKey === 'tercera-inversion' ? 'en-tercera-inversion'
    : 'todas-las-posiciones');
  MAPA[slug] = {
    modo: 'analizar', archivo: p.archivo,
    descripcion: `El mismo ejercicio en papel, para clase: <strong>21 acordes</strong> de séptima ${p.titulo}, mezclando dominante, sensible y disminuida, en una cara de A4. El alumno escribe el tipo${posKey === 'todas-las-posiciones' ? ' y la posición' : ''}. Con <strong>hoja de soluciones</strong> aparte.`,
    alt: `Ficha imprimible en PDF para reconocer acordes de séptima ${p.titulo}`,
  };
});

let count = 0, faltan = [];
fs.readdirSync(DIR).filter(d => (d.startsWith('construir-septima') || d.startsWith('septimas-')) && fs.statSync(path.join(DIR, d)).isDirectory()).forEach(slug => {
  const info = MAPA[slug];
  if (!info) { faltan.push(slug); return; }
  const file = path.join(DIR, slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('Ficha para imprimir (PDF)')) { console.log('  (ya tenía ficha) ' + slug); return; }
  const marker = '<section class="tm-seccion">';
  if (!html.includes(marker)) { console.log('  ! marcador no encontrado en ' + slug); return; }
  const bloque = fichaBlock(info.modo, info.archivo, info.descripcion, info.alt);
  html = html.replace(marker, bloque + marker);
  if (!DRY) fs.writeFileSync(file, html, 'utf8');
  count++;
  console.log('  ✓ ' + slug + ' -> ficha-' + info.modo + '-septimas-' + info.archivo);
});

if (faltan.length) { console.log('\nSin mapa para:', faltan.join(', ')); }
console.log(`\n${count} página(s) actualizada(s)${DRY ? ' (dry-run, sin escribir)' : ''}.`);
