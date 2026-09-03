'use strict';
/**
 * Inserta el bloque de descarga de las fichas PDF de intervalos en las paginas
 * de ejercicios. Idempotente: si la pagina ya tiene el bloque, no hace nada.
 *
 *   node tools/insert_fichas_intervalos.js            -> aplica los cambios
 *   node tools/insert_fichas_intervalos.js --dry      -> solo informa
 *
 * Cada pagina lleva SU ficha (la de analizar en la pagina de analisis, la de
 * escribir en la de construir) y un enlace de texto a la otra: duplicar las dos
 * descargas en las dos paginas no aporta nada y canibaliza la intencion de cada
 * una.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'ejercicios/ejercicios-de-intervalos-musicales';
const IMG = '/assets/img/intervalos/fichas';

const NUMS = [2, 3, 4, 5, 6, 7, 8];
const ORDINAL = { 2: 'segunda', 3: 'tercera', 4: 'cuarta', 5: 'quinta', 6: 'sexta', 7: 'septima', 8: 'octava' };
const ORD_ACC = { 2: 'segunda', 3: 'tercera', 4: 'cuarta', 5: 'quinta', 6: 'sexta', 7: 'séptima', 8: 'octava' };
const PLURAL = { 2: 'segundas', 3: 'terceras', 4: 'cuartas', 5: 'quintas', 6: 'sextas', 7: 'septimas', 8: 'octavas' };
const PLURAL_ACC = { 2: 'segundas', 3: 'terceras', 4: 'cuartas', 5: 'quintas', 6: 'sextas', 7: 'séptimas', 8: 'octavas' };
/* Que calidades salen de la escala natural en cada numero: es lo que el alumno
   se encuentra en el primer bloque de la ficha. */
const NATURALES = {
  2: 'mayores y menores', 3: 'mayores y menores', 4: 'justas (y la cuarta aumentada Fa-Si)',
  5: 'justas (y la quinta disminuida Si-Fa)', 6: 'mayores y menores', 7: 'mayores y menores', 8: 'justas',
};
const TOTAL = { analizar: 42, escribir: 42 };

/* El bloque va entre marcas para poder regenerarlo cuando cambia el texto o el
   numero de ejercicios de la ficha, sin tener que editar 14 paginas a mano. */
const MARCA_INI = '<!-- ficha-intervalos -->';
const MARCA_FIN = '<!-- /ficha-intervalos -->';

const url = (modo, num, sol) =>
  `${IMG}/ficha-${modo}-intervalos-de-${ORDINAL[num]}${sol ? '-soluciones' : ''}.pdf`;
const preview = (modo, num, ext) =>
  `${IMG}/preview-ficha-${modo}-intervalos-de-${ORDINAL[num]}.${ext}`;

function bloque(modo, num, h2) {
  const esAnalizar = modo === 'analizar';
  const total = TOTAL[modo];
  const otra = esAnalizar
    ? `/${BASE}/construir-intervalos/${PLURAL[num]}/`
    : `/${BASE}/${PLURAL[num]}/`;
  const otraTexto = esAnalizar
    ? `ficha de escribir ${PLURAL_ACC[num]}`
    : `ficha de analizar ${PLURAL_ACC[num]}`;

  const intro = esAnalizar
    ? `<p>La misma práctica, en papel. La ficha reúne <strong>${total} intervalos melódicos de ${ORD_ACC[num]}</strong> en clave de sol repartidos en siete pentagramas, con una línea debajo de cada uno para escribir <strong>qué tipo de ${ORD_ACC[num]} es y si es ascendente o descendente</strong> (${num}ª M ↑, ${num}ª m ↓…). Los primeros son de notas naturales y ascendentes —las ${PLURAL_ACC[num]} ${NATURALES[num]} que salen de la escala natural— y a partir de la mitad se mezclan las direcciones y aparecen sostenidos y bemoles, con alguna ${ORD_ACC[num]} aumentada o disminuida. Ningún ejercicio repite las mismas dos notas.</p>`
    : `<p>El ejercicio inverso, para imprimir: <strong>${total} intervalos melódicos de ${ORD_ACC[num]}</strong> en clave de sol de los que solo se da la primera nota. Debajo de cada uno está el intervalo que hay que formar y una flecha con la dirección (${num}ª M ↑, ${num}ª m ↓…); el alumno escribe la segunda nota en el pentagrama, con su alteración si la necesita. Empieza por ${PLURAL_ACC[num]} de notas naturales y ascendentes y termina con alteraciones y direcciones mezcladas.</p>`;

  const alt = esAnalizar
    ? `Ficha imprimible en PDF con ${total} intervalos melódicos de ${ORD_ACC[num]} en clave de sol para analizar`
    : `Ficha imprimible en PDF para escribir ${total} intervalos melódicos de ${ORD_ACC[num]} en clave de sol`;
  const pie = esAnalizar
    ? `Hoja A4 con ${total} ${PLURAL_ACC[num]} melódicas para analizar.`
    : `Hoja A4 con ${total} ${PLURAL_ACC[num]} melódicas para escribir.`;

  return `
${MARCA_INI}
<h2>${h2}</h2>
${intro}
<figure class="tm-staff">
  <a href="${url(modo, num, false)}" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${preview(modo, num, 'webp')}"><img src="${preview(modo, num, 'png')}" width="300" height="424" loading="lazy" alt="${alt}"></picture></a>
  <figcaption>${pie}</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${url(modo, num, false)}" target="_blank" rel="noopener">Descargar la ficha (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="${url(modo, num, true)}" target="_blank" rel="noopener">Soluciones</a></p>
<p>Se puede imprimir y fotocopiar libremente para el aula. La hoja de soluciones es esta misma ficha con la respuesta en rojo, así que se corrige superponiéndolas. También está la <a href="${otra}">${otraTexto}</a>, y el resto en <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">ejercicios de intervalos en PDF</a>.</p>
${MARCA_FIN}
`;
}

/* Donde empieza y acaba el bloque ya insertado. Las primeras paginas se
   escribieron sin marcas, asi que tambien se reconoce por su forma: el <h2> de
   la ficha y el parrafo final que enlaza con la otra. */
function limitesBloque(html, modo, num) {
  const conMarcas = html.indexOf(MARCA_INI);
  if (conMarcas >= 0) {
    const fin = html.indexOf(MARCA_FIN, conMarcas);
    if (fin >= 0) return { ini: conMarcas, fin: fin + MARCA_FIN.length + 1 };
  }
  const pdf = url(modo, num, false);
  if (!html.includes(pdf)) return null;
  const h2 = html.lastIndexOf('<h2>', html.indexOf(pdf));
  if (h2 < 0) return null;
  const cierre = html.indexOf('</p>', html.indexOf(url(modo, num, true)));
  if (cierre < 0) return null;
  const ultimo = html.indexOf('</p>', cierre + 4);          // parrafo de "se puede imprimir…"
  return { ini: h2, fin: (ultimo < 0 ? cierre : ultimo) + 5 };
}

/* El h2 se numera solo si la pagina ya numera sus secciones ("3. Ejercicios…"). */
function titulo(html, modo, num) {
  const texto = modo === 'analizar'
    ? `Ficha para imprimir: analizar ${PLURAL_ACC[num]} (PDF)`
    : `Ficha para imprimir: escribir ${PLURAL_ACC[num]} (PDF)`;
  const nums = [...html.matchAll(/<h2[^>]*>\s*(\d+)\./g)].map(m => Number(m[1]));
  return nums.length ? `${Math.max(...nums) + 1}. ${texto}` : texto;
}

const dry = process.argv.includes('--dry');
let tocados = 0;

for (const num of NUMS) {
  const destinos = [
    { modo: 'analizar', file: `${BASE}/${PLURAL[num]}/index.html`, ancla: '  <p><a href="/diccionario-musical/intervalos/intervalos-musicales/">' },
    { modo: 'escribir', file: `${BASE}/construir-intervalos/${PLURAL[num]}/index.html`, ancla: '<div class="tm-cta-row">' },
  ];

  for (const d of destinos) {
    const p = path.join(ROOT, d.file);
    let html = fs.readFileSync(p, 'utf8');

    // Si la pagina ya tiene bloque, se sustituye entero (asi cambiar el texto o
    // el numero de ejercicios de la ficha no obliga a editar 14 paginas). El
    // numero del h2 se calcula sobre la pagina SIN el bloque viejo, o iria
    // subiendo una posicion en cada pasada.
    const viejo = limitesBloque(html, d.modo, num);
    const sinBloque = viejo ? html.slice(0, viejo.ini) + html.slice(viejo.fin) : html;
    const nuevo = bloque(d.modo, num, titulo(sinBloque, d.modo, num));

    if (viejo) {
      if (html.slice(viejo.ini, viejo.fin).trim() === nuevo.trim()) { console.log('  = igual: ' + d.file); continue; }
      html = html.slice(0, viejo.ini) + nuevo.replace(/^\n/, '') + html.slice(viejo.fin);
      if (!dry) fs.writeFileSync(p, html);
      tocados++;
      console.log('  ↻ actualizado: ' + d.file);
      continue;
    }

    const i = html.indexOf(d.ancla);
    if (i < 0) { console.log('  ! sin ancla: ' + d.file); continue; }

    html = html.slice(0, i) + nuevo + '\n' + html.slice(i);
    if (!dry) fs.writeFileSync(p, html);
    tocados++;
    console.log('  ✓ ' + d.file);
  }
}

console.log(`\n${tocados} páginas ${dry ? 'se modificarían' : 'modificadas'}.`);
