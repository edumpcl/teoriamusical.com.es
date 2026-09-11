'use strict';
/**
 * Mete (o actualiza) los dos ejercicios de grados en la pagina de teoria.
 *
 *   node tools/insert_ejercicios_grados.js         -> aplica
 *   node tools/insert_ejercicios_grados.js --dry   -> solo informa
 *
 * Van DENTRO de la pagina de teoria y no en una URL propia de /ejercicios/:
 * esa pagina recibe 13.000 impresiones en posicion 7,8 y ni una sola consulta
 * con intencion de ejercicio ("ejercicios de grados" no lo busca nadie). Una
 * URL nueva no tendria a quien atraer; el ejercicio, en cambio, le da a esta
 * pagina justo lo que no tiene.
 *
 * Se colocan tras el ejemplo completo en Do mayor, que es donde el lector acaba
 * de ver la tabla entera y toca probar.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGINA = 'diccionario-musical/nombres-de-los-grados-de-la-escala/index.html';
const ANCLA = '<h2>¿Para qué sirven los grados de la escala?</h2>';

const MARCA_INI = '<!-- ejercicios-grados -->';
const MARCA_FIN = '<!-- /ejercicios-grados -->';

const BLOQUE = `
${MARCA_INI}
<h2>Ejercicios de grados de la escala</h2>
<p>Los nombres se aprenden usándolos. Estos dos ejercicios van en las dos direcciones: uno parte de la nota escrita y pide el grado, y el otro parte del grado y pide la nota. Cada uno tiene tres niveles, y el último mezcla <strong>mayores y menores</strong> para practicar lo único que de verdad cambia de nombre: el VII grado, que es <strong>sensible</strong> cuando está a un semitono de la tónica y <strong>subtónica</strong> cuando está a un tono.</p>

<h3>¿Qué grado es esta nota?</h3>
<p>Se muestra una tonalidad y una nota en el pentagrama. Hay que decir qué grado ocupa —en número romano— y cómo se llama.</p>
<div id="tmgrados1"></div>

<h3>¿Qué nota es este grado?</h3>
<p>El ejercicio inverso: se da la tonalidad y se pide un grado, unas veces por su número y otras por su nombre. Al corregir aparece la nota escrita en el pentagrama.</p>
<div id="tmgrados2"></div>

<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js" defer></script>
<script src="/assets/js/grados-engine.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmGradosIdentificar) tmGradosIdentificar('tmgrados1');
    if (window.tmGradosNota) tmGradosNota('tmgrados2');
  });
</script>
${MARCA_FIN}
`;

const dry = process.argv.includes('--dry');
const p = path.join(ROOT, PAGINA);
let html = fs.readFileSync(p, 'utf8');
const original = html;

/* El bloque se coloca siempre al principio de una linea: si se inserta pegado a
   una etiqueta sangrada, la sangria se queda huerfana delante y cada pasada deja
   una linea mas. */
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
if (encontrado < 0) { console.log('  ! no encuentro el ancla en ' + PAGINA); process.exit(1); }
const i = inicioDeLinea(encontrado);
const sangria = html.slice(i, encontrado);
html = html.slice(0, i) + BLOQUE.replace(/^\n/, '') + '\n' + sangria + html.slice(encontrado);

// El bloque tiene que quedar DENTRO del articulo.
const art = html.indexOf('<article');
const finArt = html.indexOf('</article>');
const pos = html.indexOf(MARCA_INI);
if (!(pos > art && pos < finArt)) { console.log('  ! el bloque quedaría fuera del <article>; revisa el ancla'); process.exit(1); }

if (html === original) {
  console.log('  = ya estaba igual: ' + PAGINA);
} else {
  if (!dry) fs.writeFileSync(p, html);
  console.log('  ✓ ' + (ini >= 0 ? 'recolocado' : 'insertado') + ' en ' + PAGINA + ' (dentro del artículo)');
}
