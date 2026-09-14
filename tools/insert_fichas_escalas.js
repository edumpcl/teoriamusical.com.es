'use strict';
/**
 * Mete (o actualiza) las fichas PDF de escalas en /ejercicios/escalas/.
 *
 *   node tools/insert_fichas_escalas.js         -> aplica
 *   node tools/insert_fichas_escalas.js --dry   -> solo informa
 *
 * Van en el índice de escalas: es la página del bloque con más tráfico (916
 * impresiones en posición 8) y la que recibe «ejercicios de escalas». Se colocan
 * tras las tarjetas de «Construir escalas», antes de «Cómo practicar las escalas».
 *
 * Idempotente: quitar el bloque es el inverso exacto de ponerlo.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGINA = 'ejercicios/escalas/index.html';
const IMG = '/assets/img/escalas/fichas';
const ANCLA = '<h2>Cómo practicar las escalas</h2>';
const MARCA_INI = '<!-- fichas-escalas -->';
const MARCA_FIN = '<!-- /fichas-escalas -->';

const FAMILIAS = [
  { id: 'mayores', nombre: 'Escalas mayores', tipos: 'Mayor, mixta principal, mixta secundaria y mixolidia' },
  { id: 'menores', nombre: 'Escalas menores', tipos: 'natural, armónica, melódica y dórica' },
  { id: 'mayores-y-menores', nombre: 'Mayores y menores', tipos: 'los ocho tipos mezclados' },
];
const MODOS = [
  { id: 'identificar', nombre: 'Identificar' },
  { id: 'escribir', nombre: 'Escribir' },
  { id: 'escribir-con-armadura', nombre: 'Escribir con armadura' },
];

const pdf = (modo, fam, sol) => `${IMG}/ficha-${modo}-escalas-${fam}${sol ? '-soluciones' : ''}.pdf`;
const celda = (modo, fam) => `<a href="${pdf(modo, fam, false)}" target="_blank" rel="noopener">Ficha</a> · <a href="${pdf(modo, fam, true)}" target="_blank" rel="noopener">Soluciones</a>`;

/* Decisión de Eduardo (14-09-2026): aquí, en vez de la tabla de fichas fijas, el
   generador a medida. Las fichas en PDF de un solo tipo siguen en la página de
   cada ejercicio (tools/insert_fichas_escalas_por_tipo.js). */
const BLOQUE = `${MARCA_INI}
<h2 id="fichas">Fichas de escalas a medida para imprimir</h2>
<p>Además de los tests, aquí puedes <strong>crear tu propia ficha en papel</strong>. Eliges qué escalas entran (todas las mayores, todas las menores, las dos cosas o solo los tipos que quieras), si hay que <strong>identificarlas</strong>, <strong>escribirlas con alteraciones</strong> o <strong>escribirlas con armadura</strong>, la clave, cuántas alteraciones lleva la armadura y cuántas escalas. Sale una hoja nueva cada vez, con sus <strong>soluciones</strong> y lista para imprimir.</p>
<p>Cada escala va en su propio pentagrama y la <strong>menor melódica</strong> se escribe completa, subiendo y bajando. Cada hoja lleva su número: debajo de los botones aparece un enlace que vuelve a sacar exactamente esa misma ficha, para reimprimirla o dar la misma a toda la clase. Se pueden fotocopiar libremente para el aula.</p>
<div id="tmfe"></div>
<p>Si prefieres fichas ya preparadas de un solo tipo, cada ejercicio tiene la suya en PDF con soluciones. Por ejemplo, <a href="/ejercicios/escalas/escalas-menores-armonica/">identificar escalas menores armónicas</a>, <a href="/ejercicios/escalas/construir-escala-mayor/">escribir escalas mayores</a> o <a href="/ejercicios/escalas/construir-escala-menor-dorica-con-armadura/">escribir la dórica con armadura</a>.</p>
<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js" defer></script>
<script src="/assets/js/fichas-escalas-engine.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFichasEscalas) tmFichasEscalas('tmfe'); });
</script>
${MARCA_FIN}`;

const dry = process.argv.includes('--dry');
const file = path.join(ROOT, PAGINA);
let html = fs.readFileSync(file, 'utf8');
const original = html;
const inicioDeLinea = pos => { while (pos > 0 && (html[pos - 1] === ' ' || html[pos - 1] === '\t')) pos--; return pos; };

const ini = html.indexOf(MARCA_INI);
if (ini >= 0) {
  const fin = html.indexOf(MARCA_FIN, ini) + MARCA_FIN.length;
  html = html.slice(0, inicioDeLinea(ini)) + html.slice(fin).replace(/^\n\n/, '');
}
const encontrado = html.indexOf(ANCLA);
if (encontrado < 0) { console.log('  ! no encuentro el ancla en ' + PAGINA); process.exit(1); }
const i = inicioDeLinea(encontrado);
html = html.slice(0, i) + BLOQUE + '\n\n' + html.slice(i);

const art = html.indexOf('<article'), finArt = html.indexOf('</article>'), pos = html.indexOf(MARCA_INI);
if (!(pos > art && pos < finArt)) { console.log('  ! quedaría fuera del <article>'); process.exit(1); }

if (html === original) console.log('  = ya estaba igual: ' + PAGINA);
else { if (!dry) fs.writeFileSync(file, html); console.log('  ✓ ' + (ini >= 0 ? 'recolocado' : 'insertado') + ' en ' + PAGINA); }
