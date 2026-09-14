'use strict';
/**
 * Mete (o actualiza) el generador de fichas de acordes en /ejercicios/acordes/.
 *
 *   node tools/insert_generador_acordes.js         -> aplica
 *   node tools/insert_generador_acordes.js --dry   -> solo informa
 *
 * Va en el índice de acordes y no en una URL nueva: es la página que aparece
 * por «ejercicios de acordes», y «ejercicios de acordes pdf» apenas se busca
 * (decisión de Eduardo, 14-09-2026). Se coloca tras las tarjetas de «Construir».
 *
 * Idempotente: quitar el bloque es el inverso exacto de ponerlo.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGINA = 'ejercicios/acordes/index.html';
const ANCLA = '<p>Para consolidar los cambios de acorde';
const MARCA_INI = '<!-- generador-fichas-acordes -->';
const MARCA_FIN = '<!-- /generador-fichas-acordes -->';

const BLOQUE = `${MARCA_INI}
<h2 id="generador">Generador de fichas de acordes para imprimir</h2>
<p>Además de los tests, aquí puedes crear <strong>fichas nuevas en papel</strong>: eliges los tipos de tríada, las posiciones, si hay que analizar o escribir el acorde, la clave, la dificultad y cuántos acordes, y sale una hoja distinta cada vez, con sus <strong>soluciones</strong> y lista para imprimir. Los acordes se sortean con las mismas reglas que las fichas en PDF de cada test, así que no se acaban nunca: cada alumno puede llevarse una hoja diferente.</p>
<p>Cada hoja lleva su número. Debajo de los botones aparece un enlace que vuelve a sacar exactamente esa misma ficha, que es lo práctico para reimprimirla o para dar la misma a toda la clase.</p>
<div id="tmfa"></div>
<p>Si prefieres fichas ya preparadas, cada test tiene la suya en PDF con soluciones: analizar en <a href="/ejercicios/acordes/triadas-en-fundamental/">fundamental</a>, <a href="/ejercicios/acordes/triadas-en-primera-inversion/">1ª</a> y <a href="/ejercicios/acordes/triadas-en-segunda-inversion/">2ª inversión</a> o <a href="/ejercicios/acordes/triadas-todas-las-posiciones/">las tres mezcladas</a>, y escribir en <a href="/ejercicios/acordes/construir-triadas/">fundamental</a>, <a href="/ejercicios/acordes/construir-triadas-primera-inversion/">1ª</a> y <a href="/ejercicios/acordes/construir-triadas-segunda-inversion/">2ª inversión</a> o <a href="/ejercicios/acordes/construir-triadas-todas-posiciones/">las tres mezcladas</a>.</p>
<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js" defer></script>
<script src="/assets/js/fichas-acordes-engine.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFichasAcordes) tmFichasAcordes('tmfa'); });
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
