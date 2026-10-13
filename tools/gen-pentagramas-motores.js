'use strict';
/**
 * Pentagramas de UNA nota (clave + redonda + alteración) para los diagramas interactivos de las páginas
 * «notas de la [instrumento]» (assets/js/digitaciones-*-engine.js). Antes los dibujaba VexFlow en el navegador
 * a cada clic; ahora son SVG de Verovio hechos al construir y el motor solo pone un <img>.
 *
 *   node tools/gen-pentagramas-motores.js
 *
 * ENTRADA: tools/notacion/datos/digitaciones-pentagramas.json = las combinaciones (clave, nota) que dibujan los 27
 * motores, sacadas de los propios motores con VexFlow (cada botón, uno a uno). Es lo que VexFlow pintaba.
 * SALIDA:  assets/img/digitaciones/notas/<clave>-<letra><s|f><octava>.svg y assets/js/tm-pent-nota.js
 *          (la tabla de tamaños que el motor necesita para reservar el sitio de la imagen sin saltos).
 *
 * DISTINTO DE tools/gen-pentagramas-notas.js: aquel alinea todos los dibujos de una clave en un lienzo común
 * (para las tablas de digitaciones, donde cada fila debe caer a la misma altura). Aquí cada nota va recortada a
 * su contenido, como hacía el SVG de VexFlow (ajustado a su caja): el diagrama muestra una sola nota a la vez.
 *
 * COMPROBACIÓN (si algo no cuadra, se para): el MEI releído = la nota pedida; en el SVG ya dibujado, la cabeza cae en
 * el paso que dice la nota respecto a las cinco líneas; una sola clave y es la pedida; los signos de alteración son
 * exactamente los que tocan; sin plica.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const DATOS = path.join(__dirname, 'notacion/datos/digitaciones-pentagramas.json');
const SALIDA = path.join(RAIZ, 'assets/img/digitaciones/notas');
const HELPER = path.join(RAIZ, 'assets/js/tm-pent-nota.js');
const ESCALA_PANTALLA = 0.85;   // el SVG nace con ~11 px entre lineas; el diagrama antiguo (VexFlow) tenia ~9

/* clave: forma de la clave, linea, glifo SMuFL y paso diatonico de la LINEA INFERIOR (octava*7 + letra; Do=0) */
const CLAVES = {
  sol: { shape: 'G', line: 2, glifo: 'E050', base: 4 * 7 + 2, nombre: 'clave de sol' },
  fa:  { shape: 'F', line: 4, glifo: 'E062', base: 2 * 7 + 4, nombre: 'clave de fa' },
  do3: { shape: 'C', line: 3, glifo: 'E05C', base: 3 * 7 + 3, nombre: 'clave de do en tercera' },   // viola: la linea central es el Do central
  do4: { shape: 'C', line: 4, glifo: 'E05C', base: 3 * 7 + 1, nombre: 'clave de do en cuarta' },    // fagot y contrafagot (tenor)
};
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const ES = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈' };
const GLIFO_ALT = { 1: 'E262', '-1': 'E260' };

/** 'f#/3' | 'ab/4' | 'b/3' (clave de VexFlow) -> { letra, alt, oct, paso, fichero, texto } */
function analizar(nota) {
  const m = /^([a-g])(#|b)?\/(\d)$/.exec(nota);
  if (!m) throw new Error('nota rara: ' + nota);
  const alt = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0, oct = Number(m[3]);
  return {
    letra: m[1], alt, oct, paso: oct * 7 + LETRAS.indexOf(m[1]),
    fichero: m[1] + (alt === 1 ? 's' : alt === -1 ? 'f' : '') + oct,
    texto: ES[m[1]] + (alt === 1 ? '♯' : alt === -1 ? '♭' : '') + SUB[oct],
  };
}

function aMEI(a, clave) {
  const c = CLAVES[clave];
  const acc = a.alt === 1 ? ' accid="s"' : a.alt === -1 ? ' accid="f"' : '';
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="${c.shape}" clef.line="${c.line}"/></staffGrp></scoreDef><section>`
    + `<measure n="1" right="invis"><staff n="1"><layer n="1"><note pname="${a.letra}" oct="${a.oct}" dur="1"${acc}/></layer></staff></measure>`
    + '</section></score></mdiv></body></music></mei>';
}

function leerMEI(mei) {
  const t = mei.match(/<note [^>]*\/>/g) || [];
  if (t.length !== 1) return null;
  const a = (n) => (new RegExp('\\b' + n + '="([^"]*)"').exec(t[0]) || [])[1];
  return { letra: a('pname'), oct: Number(a('oct')), alt: a('accid') === 's' ? 1 : a('accid') === 'f' ? -1 : 0, dur: a('dur') };
}

function medir(svg) {
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)]
    .map((m) => ({ g: m[1], y: Number(m[3]) }));
  const glifos = (g) => (svg.match(new RegExp('<use [^>]*href="#' + g + '-', 'g')) || []).length;
  return { lineas, cabezas, glifos };
}

function verificar(clave, a, mei, svg) {
  const err = [], c = CLAVES[clave];
  const leido = leerMEI(mei);
  if (!leido || leido.letra !== a.letra || leido.oct !== a.oct || leido.alt !== a.alt || leido.dur !== '1') err.push('el MEI no escribe la nota pedida');
  const m = medir(svg);
  if (m.lineas.length !== 5) err.push(`${m.lineas.length} lineas de pentagrama`);
  if (m.cabezas.length !== 1 || m.cabezas[0].g !== 'E0A2') err.push('no hay exactamente una redonda');
  else {
    const dif = (m.lineas[4] - m.cabezas[0].y) / (ESPACIO / 2);
    if (!Number.isInteger(dif)) err.push('la cabeza no cae ni en linea ni en espacio');
    else if (c.base + dif !== a.paso) err.push(`la cabeza esta en el paso ${c.base + dif} y se pedia el ${a.paso}`);
  }
  for (const [k, v] of Object.entries(CLAVES)) {
    const n = m.glifos(v.glifo);
    // sol, fa y las dos de do: do3 y do4 comparten glifo, asi que la LINEA de la clave la fija el MEI releido arriba
    if (k === clave && n !== 1) err.push('falta la clave de ' + clave);
    if (v.glifo !== c.glifo && n !== 0) err.push('hay una clave que no es la pedida (' + v.glifo + ')');
  }
  for (const [s, g] of Object.entries(GLIFO_ALT)) {
    const quiere = Number(s) === a.alt ? 1 : 0;
    if (m.glifos(g) !== quiere) err.push(`${m.glifos(g)} signo(s) ${g} y se esperaban ${quiere}`);
  }
  if (m.glifos('E261') + m.glifos('E263') + m.glifos('E264') !== 0) err.push('alteracion de mas');
  if (/class="stem"/.test(svg)) err.push('lleva plica');
  return err;
}

module.exports = { CLAVES, analizar, aMEI, verificar, medir };
if (require.main !== module) return;

(async () => {
  const datos = JSON.parse(fs.readFileSync(DATOS, 'utf8'));
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());

  fs.mkdirSync(SALIDA, { recursive: true });
  for (const f of fs.readdirSync(SALIDA)) if (f.endsWith('.svg')) fs.unlinkSync(path.join(SALIDA, f));

  const tabla = {};
  let total = 0;
  for (const { clave, nota } of datos) {
    if (!CLAVES[clave]) throw new Error('clave desconocida: ' + clave);
    const a = analizar(nota);
    const mei = aMEI(a, clave);
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash(clave + '-' + a.fichero), spacingLinear: 0.25 }));
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI de ' + clave + ' ' + nota);
    if (tk.getPageCount() !== 1) throw new Error(nota + ': sale en mas de una pagina');
    const svg = tk.renderToSVG(1);
    const err = verificar(clave, a, mei, svg);
    if (err.length) throw new Error(`${a.texto} en ${CLAVES[clave].nombre}: ${err.join('; ')}`);
    const alt = `${a.texto} en ${CLAVES[clave].nombre}`;
    const listo = preparar(svg, alt);
    const nom = clave + '-' + a.fichero;
    if (tabla[nom]) throw new Error('dos notas con el mismo fichero: ' + nom);
    fs.writeFileSync(path.join(SALIDA, nom + '.svg'), listo.svg);
    tabla[nom] = [listo.w, listo.h, alt];
    total += listo.svg.length;
  }

  const filas = Object.keys(tabla).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(tabla[k])}`).join(',\n');
  fs.writeFileSync(HELPER, `/* tm-pent-nota.js — GENERADO por tools/gen-pentagramas-motores.js: no editar a mano.
   Pone en un contenedor el pentagrama de UNA nota (SVG de Verovio hecho al construir) para los diagramas
   interactivos «notas de la [instrumento]». Antes lo dibujaba VexFlow en el navegador a cada clic.
     tmPentNota(contenedor, clave, nota)   clave: 'treble' | 'bass' | 'alto' | 'tenor' (nombres de VexFlow)
                                           nota:  'f#/3', 'bb/4', 'c/5' (clave de VexFlow: letra, alteracion, octava)
   Devuelve true si la dibujo. La tabla da [ancho, alto, alt] de cada imagen para reservar el sitio sin saltos. */
(function () {
  'use strict';
  var BASE = '/assets/img/digitaciones/notas/';
  var ESCALA = ${ESCALA_PANTALLA};
  var CLAVES = { treble: 'sol', bass: 'fa', alto: 'do3', tenor: 'do4' };
  var T = {
${filas}
  };
  function fichero(clave, nota) {
    var c = CLAVES[clave], m = /^([a-g])(#|b)?\\/(\\d)$/.exec(nota || '');
    if (!c || !m) return null;
    return c + '-' + m[1] + (m[2] === '#' ? 's' : m[2] === 'b' ? 'f' : '') + m[3];
  }
  window.tmPentNota = function (el, clave, nota) {
    el.innerHTML = '';
    var f = fichero(clave, nota), t = f && T[f];
    if (!t) { if (window.console) console.warn('tmPentNota: no hay pentagrama para', clave, nota); return false; }
    var img = new Image();
    img.src = BASE + f + '.svg';
    img.width = Math.round(t[0] * ESCALA);
    img.height = Math.round(t[1] * ESCALA);
    img.alt = t[2];
    img.decoding = 'async';
    img.style.cssText = 'display:block;margin:0 auto;max-width:100%;height:auto';
    el.appendChild(img);
    return true;
  };
})();
`);
  console.log(`${Object.keys(tabla).length} SVG · ${(total / 1024).toFixed(0)} KB · ${path.relative(RAIZ, SALIDA)} · helper ${(fs.statSync(HELPER).size / 1024).toFixed(1)} KB`);
})().catch((e) => { console.error(e); process.exit(1); });
