'use strict';
/**
 * Dibuja con Verovio un pentagrama por nota (clave + redonda + alteración) y lo
 * guarda como SVG suelto, para las tablas de digitaciones de las páginas y para
 * las fichas PDF.
 *
 *   node tools/gen-pentagramas-notas.js
 *
 * UN FICHERO POR CLAVE Y NOTA, compartido entre instrumentos: el Fa♯3 en clave
 * de sol es el mismo dibujo para la trompeta y para el fliscorno.
 *
 * LOS SVG SON AUTÓNOMOS: Verovio dibuja la clave y la cabeza de nota como
 * trazados, no como texto con una fuente. Se cargan con <img> y no hace falta
 * ninguna fuente musical en la página (la versión de VexFlow necesitaba Leland
 * y el SVG incrustado dentro del HTML).
 *
 * ALTURA COMÚN POR CLAVE: Verovio recorta cada dibujo a su contenido. Aquí se
 * amplía el lienzo de todos los de una clave hasta el de la nota más extrema,
 * con el pentagrama a la misma altura. Si no, la columna de la tabla queda como
 * una sierra.
 *
 * CONVENCIÓN DE LA CASA: redonda, sin plica.
 *
 * COMPROBACIÓN (si algo no cuadra, se para): lee el MEI como lo leería un
 * músico y lo compara con la nota pedida; y en el SVG ya dibujado mide dónde
 * cae la cabeza respecto a las cinco líneas, qué clave hay y cuántas
 * alteraciones se han pintado.
 */
const path = require('path');
const fs = require('fs');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = path.join(RAIZ, 'assets/img/digitaciones/pentagramas');

/* Los cuatro instrumentos y su clave. Las notas salen de su propio motor. */
const INSTRUMENTOS = {
  trompeta: 'sol', fliscorno: 'sol', bombardino: 'fa', tuba: 'fa',
};
const CLAVES = {
  sol: { shape: 'G', line: 2, glifo: 'E050', base: 4 * 7 + 2, nombre: 'clave de sol' },   // línea inferior: Mi4
  fa:  { shape: 'F', line: 4, glifo: 'E062', base: 2 * 7 + 4, nombre: 'clave de fa' },    // línea inferior: Sol2
};
const LETRA = { Do: 'c', Re: 'd', Mi: 'e', Fa: 'f', Sol: 'g', La: 'a', Si: 'b' };
const GRADO = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 };
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇' };

function pulsadosDe(v) {
  if (Array.isArray(v)) return v;
  return (v && Array.isArray(v.keys)) ? v.keys : [];
}

/** 'Fa#3' -> { letra:'f', alt:1, oct:3, paso, fichero:'f3s', texto:'Fa♯₃' } */
function analizar(clave) {
  const m = /^([A-Za-z]+)(#)?(-?\d+)$/.exec(clave);
  if (!m || !LETRA[m[1]]) throw new Error('nota rara: ' + clave);
  const letra = LETRA[m[1]], oct = Number(m[3]), alt = m[2] ? 1 : 0;
  return {
    letra, alt, oct,
    paso: oct * 7 + GRADO[letra],
    fichero: letra + (alt ? 's' : '') + oct,
    texto: m[1] + (alt ? '♯' : '') + String(oct).split('').map((c) => SUB[c] || c).join(''),
  };
}

function notasDe(inst) {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/digitaciones-' + inst + '-engine.js'), 'utf8');
  const caja = {};
  for (const [nom, re] of [['FING', /var FING = \{[\s\S]*?\n  \};/], ['ORDEN', /var ORDEN = \[[\s\S]*?\];/]]) {
    // eslint-disable-next-line no-eval
    eval(src.match(re)[0].replace('var ' + nom, 'caja.' + nom));
  }
  const orden = (caja.ORDEN && caja.ORDEN.length ? caja.ORDEN : Object.keys(caja.FING));
  return orden.filter((k) => caja.FING[k] !== undefined && pulsadosDe(caja.FING[k]) !== null);
}

function aMEI(a, clave) {
  const c = CLAVES[clave];
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="${c.shape}" clef.line="${c.line}"/></staffGrp></scoreDef><section>`
    + `<measure n="1" right="invis"><staff n="1"><layer n="1"><note pname="${a.letra}" oct="${a.oct}" dur="1"${a.alt ? ' accid="s"' : ''}/></layer></staff></measure>`
    + '</section></score></mdiv></body></music></mei>';
}

/** Lo que dice el MEI, leído como lo leería un músico. */
function leerMEI(mei) {
  const t = mei.match(/<note [^>]*\/>/g) || [];
  if (t.length !== 1) return null;
  const a = (n) => (new RegExp('\\b' + n + '="([^"]*)"').exec(t[0]) || [])[1];
  return { letra: a('pname'), oct: Number(a('oct')), alt: a('accid') === 's' ? 1 : 0, dur: a('dur') };
}

/** Mide el SVG ya dibujado. */
function medir(svg) {
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)]
    .map((m) => ({ g: m[1], y: Number(m[3]) }));
  const glifos = (g) => (svg.match(new RegExp('<use [^>]*href="#' + g + '-', 'g')) || []).length;
  const pm = /class="page-margin"[^>]*transform="translate\(([\d.]+), ([\d.]+)\)"/.exec(svg);
  const vb = /<svg class="definition-scale"[^>]*viewBox="0 0 (\d+) (\d+)"/.exec(svg);
  return { lineas, cabezas, glifos, ty: Number(pm[2]), w: Number(vb[1]), h: Number(vb[2]) };
}

function verificar(clave, a, mei, svg) {
  const err = [];
  const c = CLAVES[clave];
  const leido = leerMEI(mei);
  if (!leido || leido.letra !== a.letra || leido.oct !== a.oct || leido.alt !== a.alt || leido.dur !== '1') err.push('el MEI no escribe la nota pedida');
  const m = medir(svg);
  if (m.lineas.length !== 5) err.push(`${m.lineas.length} líneas de pentagrama`);
  if (m.cabezas.length !== 1 || m.cabezas[0].g !== 'E0A2') err.push('no hay exactamente una redonda');
  else {
    const dif = (m.lineas[4] - m.cabezas[0].y) / (ESPACIO / 2);          // medias líneas por encima de la línea inferior
    if (!Number.isInteger(dif)) err.push('la cabeza no cae ni en línea ni en espacio');
    else if (c.base + dif !== a.paso) err.push(`la cabeza está en el paso ${c.base + dif} y se pedía el ${a.paso}`);
  }
  if (m.glifos(c.glifo) !== 1) err.push('la clave dibujada no es la de ' + clave);
  if (m.glifos(clave === 'sol' ? 'E062' : 'E050') !== 0) err.push('hay una clave de más');
  if (m.glifos('E262') !== (a.alt ? 1 : 0)) err.push(`${m.glifos('E262')} sostenido(s) dibujado(s) y se esperaban ${a.alt}`);
  if (m.glifos('E260') + m.glifos('E261') + m.glifos('E263') !== 0) err.push('alteración que no es un sostenido');
  if (/class="stem"/.test(svg)) err.push('lleva plica');
  return err;
}

/** Amplía el lienzo: mismo alto y pentagrama a la misma altura para todo el grupo. */
function igualar(items) {
  const cab = items.map((i) => {
    const m = medir(i.svg);
    return { i, a: m.lineas[0] + m.ty, b: m.h - (m.lineas[4] + m.ty) };
  });
  const maxA = Math.max(...cab.map((x) => x.a)), maxB = Math.max(...cab.map((x) => x.b));
  for (const { i, a } of cab) {
    const minY = a - maxA, alto = maxA + 4 * ESPACIO + maxB;
    i.svg = i.svg
      .replace(/(<svg class="definition-scale"[^>]*viewBox=")0 0 (\d+) \d+"/, (s, p, w) => `${p}0 ${minY} ${w} ${alto}"`)
      .replace(/^(<svg viewBox="0 0 [\d.]+ )[\d.]+"/, (s, p) => `${p}${alto / 25}"`);
  }
  return { maxA, maxB };
}

module.exports = { INSTRUMENTOS, CLAVES, analizar, medir, verificar, aMEI };
if (require.main !== module) return;

(async () => {
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());

  /* Reúne, por clave, todas las notas que hacen falta. */
  const porClave = { sol: new Set(), fa: new Set() };
  for (const [inst, clave] of Object.entries(INSTRUMENTOS)) for (const n of notasDe(inst)) porClave[clave].add(n);

  fs.mkdirSync(SALIDA, { recursive: true });
  for (const f of fs.readdirSync(SALIDA)) if (f.endsWith('.svg')) fs.unlinkSync(path.join(SALIDA, f));   // sin restos de VexFlow

  const indice = {};
  let n = 0, total = 0;
  for (const [clave, set] of Object.entries(porClave)) {
    const items = [];
    for (const nota of [...set].sort((x, y) => analizar(x).paso - analizar(y).paso || analizar(x).alt - analizar(y).alt)) {
      const a = analizar(nota);
      const mei = aMEI(a, clave);
      tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash(clave + '-' + a.fichero) }));
      if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI de ' + nota);
      if (tk.getPageCount() !== 1) throw new Error(nota + ': sale en más de una página');
      const svg = tk.renderToSVG(1);
      const err = verificar(clave, a, mei, svg);
      if (err.length) throw new Error(`${nota} en ${CLAVES[clave].nombre}: ${err.join('; ')}`);
      items.push({ nota, a, svg });
    }
    const { maxA, maxB } = igualar(items);
    for (const it of items) {
      const alt = `${it.a.texto} en ${CLAVES[clave].nombre}`;
      const listo = preparar(it.svg, alt);
      const nom = clave + '-' + it.a.fichero + '.svg';
      fs.writeFileSync(path.join(SALIDA, nom), listo.svg);
      indice[clave + '|' + it.nota] = { f: nom, w: listo.w, h: listo.h, alt };
      total += listo.svg.length; n++;
    }
    console.log(`  ${CLAVES[clave].nombre}: ${items.length} notas · ${Math.round(maxA)} unidades sobre la 5.ª línea y ${Math.round(maxB)} bajo la 1.ª`);
  }
  fs.writeFileSync(path.join(SALIDA, 'indice.json'), JSON.stringify(indice, null, 1));
  console.log(`\n${n} SVG · ${(total / 1024).toFixed(0)} KB en total · ${path.relative(RAIZ, SALIDA)}`);
})().catch((e) => { console.error(e); process.exit(1); });
