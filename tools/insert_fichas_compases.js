'use strict';
/**
 * Mete (o actualiza) el bloque de la ficha PDF de compases en la pagina del
 * test. Idempotente: si el bloque ya esta, se quita y se vuelve a poner.
 *
 *   node tools/insert_fichas_compases.js         -> aplica
 *   node tools/insert_fichas_compases.js --dry   -> solo informa
 *
 * Va en /ejercicios/compases/analizar-compas/ y no en una URL nueva: la ficha es
 * ese mismo test en papel, y esa pagina ya se pisa con la de teoria
 * /diccionario-musical/compases/analizar-compases/ en "analizar compases". Una
 * tercera URL empeoraria el reparto; el PDF, en cambio, le da a la de ejercicios
 * algo que la de teoria no tiene.
 *
 * OJO con el ancla: aqui <section class="tm-seccion"> (el ancla que se uso en
 * armaduras) queda DESPUES de </article>. Se usa el parrafo de cierre.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGINA = 'ejercicios/compases/analizar-compas/index.html';
const IMG = '/assets/img/compases/fichas';
const ANCLA = '<p>La teoría completa está en';

const MARCA_INI = '<!-- ficha-compases -->';
const MARCA_FIN = '<!-- /ficha-compases -->';

const PDF = `${IMG}/ficha-analizar-compases.pdf`;
const SOL = `${IMG}/ficha-analizar-compases-soluciones.pdf`;

const BLOQUE = `
${MARCA_INI}
<h2>Ficha de compases para imprimir (PDF)</h2>
<p>El mismo ejercicio en papel, para clase: <strong>20 indicaciones de compás</strong> en una sola cara de A4, con una columna para cada cosa que hay que deducir —tipo, tiempos, subdivisión, unidad de tiempo, unidad de subdivisión y unidad de compás— y su <strong>hoja de soluciones</strong> aparte.</p>
<p>Las cifras van de lo corriente a lo infrecuente: primero los compases simples de siempre (2/4, 3/4, 4/4…), después los compuestos habituales (6/8, 9/8, 12/8…) y al final los de denominador poco frecuente (2/1, 9/4, 9/16…), que son los que de verdad obligan a razonar la regla en vez de recordarla de memoria.</p>
<figure class="tm-staff">
  <a href="${PDF}" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${IMG}/preview-ficha-analizar-compases.webp"><img src="${IMG}/preview-ficha-analizar-compases.png" width="300" height="424" loading="lazy" alt="Ficha imprimible en PDF con 20 compases para analizar: tipo, tiempos, subdivisión y unidades"></picture></a>
  <figcaption>Hoja A4 con 20 compases para analizar.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${PDF}" target="_blank" rel="noopener">Descargar la ficha (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="${SOL}" target="_blank" rel="noopener">Soluciones</a></p>
<p>Se puede imprimir y fotocopiar libremente para el aula. La hoja de soluciones es la misma ficha con las respuestas en rojo, así que se corrige superponiéndolas. Las unidades se escriben con la figura, no con su nombre: la tabla de referencia de arriba sirve de recordatorio mientras se rellena.</p>
${MARCA_FIN}
`;

const dry = process.argv.includes('--dry');
const p = path.join(ROOT, PAGINA);
let html = fs.readFileSync(p, 'utf8');
const original = html;

/* El bloque se coloca SIEMPRE al principio de una linea. El parrafo que sirve
   de ancla va sangrado, y si se inserta justo delante de la etiqueta, esa
   sangria se queda huerfana antes del bloque y cada pasada deja una linea mas:
   el archivo cambiaba sin que cambiara el contenido. */
const inicioDeLinea = pos => {
  while (pos > 0 && (html[pos - 1] === ' ' || html[pos - 1] === '\t')) pos--;
  return pos;
};

const ini = html.indexOf(MARCA_INI);
if (ini >= 0) {
  const fin = html.indexOf(MARCA_FIN, ini) + MARCA_FIN.length;
  let desde = inicioDeLinea(ini);
  while (desde > 0 && html[desde - 1] === '\n' && html[desde - 2] === '\n') desde--;
  html = html.slice(0, desde) + html.slice(fin).replace(/^\n+/, '\n');
}

const encontrado = html.indexOf(ANCLA);
if (encontrado < 0) {
  console.log('  ! no encuentro el ancla en ' + PAGINA);
  process.exit(1);
}
const i = inicioDeLinea(encontrado);
const sangria = html.slice(i, encontrado);
html = html.slice(0, i) + BLOQUE.replace(/^\n/, '') + '\n' + sangria + html.slice(encontrado);

// Comprobacion explicita: el bloque tiene que quedar dentro del <article>.
const art = html.indexOf('<article');
const finArt = html.indexOf('</article>');
const pos = html.indexOf(MARCA_INI);
if (!(pos > art && pos < finArt)) {
  console.log('  ! el bloque quedaría fuera del <article>; revisa el ancla');
  process.exit(1);
}

if (html === original) {
  console.log('  = ya estaba igual: ' + PAGINA);
} else {
  if (!dry) fs.writeFileSync(p, html);
  console.log('  ✓ ' + (ini >= 0 ? 'recolocado' : 'insertado') + ' en ' + PAGINA + ' (dentro del artículo)');
}
