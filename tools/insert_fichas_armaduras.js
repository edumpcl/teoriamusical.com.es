'use strict';
/**
 * Mete (o actualiza) el bloque de fichas PDF de armaduras en la pagina de
 * ejercicios de tonalidades. Idempotente: sustituye el bloque si ya esta.
 *
 *   node tools/insert_fichas_armaduras.js         -> aplica
 *   node tools/insert_fichas_armaduras.js --dry   -> solo informa
 *
 * Las fichas van en /ejercicios/tonalidades/ y no en una URL propia: esa pagina
 * ya recibe "ejercicios de tonalidades con soluciones" (pos 7,4), que es justo
 * la intencion que atienden las fichas. Una pagina nueva con dos PDF competiria
 * con ella sin aportar nada.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGINA = 'ejercicios/tonalidades/index.html';
const IMG = '/assets/img/tonalidades/fichas';
/* Antes de la seccion de preguntas frecuentes, que es lo ultimo del articulo.
   OJO: "Teoría relacionada" NO sirve de ancla, vive en el <aside> y el bloque
   acabaria fuera del <article>. */
const ANCLA = '<section class="tm-seccion">';

const MARCA_INI = '<!-- fichas-armaduras -->';
const MARCA_FIN = '<!-- /fichas-armaduras -->';

const pdf = (modo, sol) => `${IMG}/ficha-${modo}-armaduras${sol ? '-soluciones' : ''}.pdf`;
const preview = (modo, ext) => `${IMG}/preview-ficha-${modo}-armaduras.${ext}`;

function ficha(modo) {
  const esIdentificar = modo === 'identificar';
  const alt = esIdentificar
    ? 'Ficha imprimible en PDF con 21 armaduras para identificar la tonalidad Mayor o menor'
    : 'Ficha imprimible en PDF para dibujar la armadura de 21 tonalidades';
  const pie = esIdentificar
    ? 'Hoja A4 con 21 armaduras para identificar.'
    : 'Hoja A4 con 21 tonalidades cuya armadura hay que escribir.';

  return `<figure class="tm-staff">
  <a href="${pdf(modo, false)}" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${preview(modo, 'webp')}"><img src="${preview(modo, 'png')}" width="300" height="424" loading="lazy" alt="${alt}"></picture></a>
  <figcaption>${pie}</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${pdf(modo, false)}" target="_blank" rel="noopener">Descargar la ficha (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="${pdf(modo, true)}" target="_blank" rel="noopener">Soluciones</a></p>`;
}

const BLOQUE = `
${MARCA_INI}
<h2>Fichas de armaduras para imprimir (PDF)</h2>
<p>Las mismas dos destrezas de arriba, en papel y con <strong>hoja de soluciones</strong>: una ficha para <strong>identificar</strong> la tonalidad de una armadura escrita y otra para <strong>escribir</strong> la armadura de la tonalidad que se pide. Cada hoja trae <strong>21 ejercicios</strong> en una sola cara de A4, y las tres cosas van de menos a más:</p>
<ul>
  <li><strong>De pocas alteraciones a muchas.</strong> Empiezan por armaduras de una o dos y terminan con las de seis y siete.</li>
  <li><strong>Primero en clave de sol.</strong> La de fa aparece a partir del segundo tercio, cuando ya se ha cogido el mecanismo.</li>
  <li><strong>Alternando Mayor y menor.</strong> Cada ejercicio dice cuál de las dos hay que poner, así que hay que pasar por la relativa.</li>
</ul>

<h3>Identificar armaduras</h3>
<p>Se ve la armadura escrita y debajo se anota la tonalidad que pide el ejercicio: <em>Mayor:</em> o <em>menor:</em>.</p>
${ficha('identificar')}

<h3>Escribir armaduras</h3>
<p>El ejercicio inverso: se da el nombre de la tonalidad —Mi♭ Mayor, sol menor…— y hay que dibujar sus alteraciones en el pentagrama, en su orden y en su sitio.</p>
${ficha('escribir')}

<p>Se pueden imprimir y fotocopiar libremente para el aula. Cada hoja de soluciones es la misma ficha con la respuesta en rojo, así que se corrige superponiéndolas. Si necesitas repasar la teoría antes, está la página de <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">tonalidades y armaduras</a> y el <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">círculo de quintas</a>.</p>
${MARCA_FIN}
`;

const dry = process.argv.includes('--dry');
const p = path.join(ROOT, PAGINA);
let html = fs.readFileSync(p, 'utf8');

const original = html;

// Si ya hay bloque se quita y se vuelve a colocar en el ancla: así, además de
// actualizar el texto, se corrige su sitio si quedó donde no debía.
const ini = html.indexOf(MARCA_INI);
if (ini >= 0) {
  const fin = html.indexOf(MARCA_FIN, ini) + MARCA_FIN.length;
  // Se recorta también el salto que el bloque dejó delante y detrás; si no, cada
  // pasada añade una línea en blanco y el archivo cambia aunque el bloque sea el
  // mismo (diffs de ruido en cada ejecución).
  let desde = ini;
  while (desde > 0 && html[desde - 1] === '\n' && html[desde - 2] === '\n') desde--;
  html = html.slice(0, desde) + html.slice(fin).replace(/^\n+/, '\n');
}

const i = html.indexOf(ANCLA);
if (i < 0) {
  console.log('  ! no encuentro el ancla en ' + PAGINA);
  process.exit(1);
}
html = html.slice(0, i) + BLOQUE.replace(/^\n/, '') + '\n' + html.slice(i);

// El bloque tiene que quedar DENTRO del artículo.
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
