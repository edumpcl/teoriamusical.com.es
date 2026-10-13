'use strict';
/**
 * Pasa a Verovio los pentagramas de la maqueta preview-pentatonica.html (antes VexFlow en vivo).
 *
 *   node tools/gen-maqueta-pentatonica.js
 *
 * Usa el mismo constructor de MEI que el resto del sitio (assets/js/tm-mei.js). Cada dibujo se
 * comprueba midiendo el SVG ya pintado: las cabezas, en orden, caen en el paso que dice la melodia
 * (contra las 5 lineas) y el tresillo lleva su «3». El audio sigue leyendo data-tm-melody.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const M = require('../assets/js/tm-mei.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const PAGINA = path.join(RAIZ, 'preview-pentatonica.html');
const SALIDA = path.join(RAIZ, 'assets/img/notacion/pentatonica');   // los mismos SVG que usa la pagina de la escala pentatonica
const PASO_E4 = 4 * 7 + 2;   // linea inferior de la clave de sol
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const ev = (key, d, o) => Object.assign({ key, d }, o || {});

/**
 * Lee la partitura MusicXML de Eduardo (una voz, un pentagrama): armadura, cifra, notas con su duracion y puntillo.
 * El compas 0 implicito es la anacrusa. Los silencios finales se descartan (el ultimo compas queda incompleto a proposito)
 * y no se pone barra final doble.
 */
function desdeMusicXML(ruta) {
  const xml = fs.readFileSync(ruta, 'utf8');
  const tag = (t, n) => { const m = new RegExp('<' + n + '>([^<]*)</' + n + '>').exec(t); return m ? m[1] : null; };
  const DUR = { quarter: 'q', half: 'h', whole: 'w', eighth: '8', '16th': '16' };
  const compases = [...xml.matchAll(/<measure [^>]*>([\s\S]*?)<\/measure>/g)].map((m) => {
    const evs = [];
    for (const n of m[1].matchAll(/<note[ >][\s\S]*?<\/note>/g)) {
      if (/<rest\/>/.test(n[0])) continue;                      // sin silencios
      const tipo = tag(n[0], 'type');
      if (!DUR[tipo]) throw new Error('figura no prevista en la partitura: ' + tipo);
      evs.push(ev(tag(n[0], 'step').toLowerCase() + '/' + tag(n[0], 'octave'), DUR[tipo], /<dot[ \/]/.test(n[0]) ? { puntillo: 1 } : {}));
    }
    return evs;
  });
  return { armadura: Number(tag(xml, 'fifths')), num: Number(tag(xml, 'beats')), den: Number(tag(xml, 'beat-type')), compases };
}

const MELODIAS = {
  vf1: {
    slug: 'amazing-grace-sol-mayor',
    alt: 'Amazing Grace, en Sol mayor, anacrusa y cuatro compases en 3/4: Re, Sol blanca, tresillo Si La Sol, Si blanca La, Sol blanca Mi, Re blanca.',
    fila: {
      armadura: 1, num: 3, den: 4,
      compases: [
        [ev('d/4', 'q')],
        [ev('g/4', 'h'), ev('b/4', '8', { barra: 0 }), ev('a/4', '8', { barra: 0 }), ev('g/4', '8', { barra: 0 })],
        [ev('b/4', 'h'), ev('a/4', 'q')],
        [ev('g/4', 'h'), ev('e/4', 'q')],
        [ev('d/4', 'h')],   // el ultimo compas queda incompleto a proposito (sin la negra final) y sin doble barra
      ],
      tuplets: [{ c: 1, ini: 1, fin: 3, num: 3, numbase: 2 }],
    },
    tresillos: 1, sostenidos: 1, bemoles: 0,
    esperadas: ['d/4', 'g/4', 'b/4', 'a/4', 'g/4', 'b/4', 'a/4', 'g/4', 'e/4', 'd/4'],   // leidas a mano de la partitura
  },
  vf2: {
    slug: 'auld-lang-syne-fa-mayor',
    alt: 'Auld Lang Syne, fragmento en Fa mayor y 4/4: anacrusa Do, y cuatro compases: Fa con puntillo, Fa, Fa, La; Sol con puntillo, Fa, Sol, La; Fa con puntillo, Fa, La, Do; Re blanca con puntillo.',
    fila: desdeMusicXML(path.join(RAIZ, 'tools/notacion/pentatonica/auld-lang-syne.musicxml')),
    tresillos: 0, sostenidos: 0, bemoles: 1,
    esperadas: ['c/4', 'f/4', 'f/4', 'f/4', 'a/4', 'g/4', 'f/4', 'g/4', 'a/4', 'f/4', 'f/4', 'a/4', 'c/5', 'd/5'],   // leidas a mano de la partitura
  },
};

function cabezas(svg) {
  return [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)]
    .map((m) => ({ g: m[1], y: Number(m[3]) }));
}
const lineas = (svg) => [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);

function verificar(nombre, def, svg) {
  const err = [];
  const aPaso = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return LETRAS.indexOf(m[1]) + 7 * Number(m[2]); };
  const esperadas = (def.esperadas || def.fila.compases.flat().map((e) => e.key)).map(aPaso);
  if (def.esperadas && JSON.stringify(def.fila.compases.flat().map((e) => aPaso(e.key))) !== JSON.stringify(esperadas)) err.push('la lectura de la partitura no coincide con lo leido a mano');
  const ls = lineas(svg), cs = cabezas(svg);
  if (ls.length !== 5) err.push(`${ls.length} lineas de pentagrama`);
  if (cs.length !== esperadas.length) err.push(`${cs.length} cabezas y la melodia tiene ${esperadas.length}`);
  cs.forEach((c, i) => {
    const paso = PASO_E4 + (ls[4] - c.y) / (ESPACIO / 2);
    if (paso !== esperadas[i]) err.push(`nota ${i + 1}: dibujada en el paso ${paso}, la melodia pide ${esperadas[i]}`);
  });
  const tres = (svg.match(/href="#E883-/g) || []).length;
  if (tres !== def.tresillos) err.push(`${tres} numero(s) «3» y se esperaban ${def.tresillos}`);
  const bem = (svg.match(/href="#E260-/g) || []).length;
  if (bem !== def.bemoles) err.push(`${bem} bemol(es) y se esperaban ${def.bemoles}`);
  const sost = (svg.match(/href="#E262-/g) || []).length;
  if (sost !== def.sostenidos) err.push(`${sost} sostenido(s) en la armadura y se esperaban ${def.sostenidos}`);
  if (!/<use [^>]*href="#E050-/.test(svg)) err.push('falta la clave de sol');
  if (!/href="#E08[0-9A-F]-/.test(svg)) err.push('falta la cifra del compas');
  return err;
}

(async () => {
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  // la maqueta es opcional: sin ella solo se generan los SVG de la pagina real
  const hayMaqueta = fs.existsSync(PAGINA);
  let html = hayMaqueta ? fs.readFileSync(PAGINA, 'utf8') : '';

  for (const [nombre, def] of Object.entries(MELODIAS)) {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('maqueta-' + nombre), spacingLinear: 0.25 }));
    if (!tk.loadData(M.aMEI(def.fila))) throw new Error(nombre + ': Verovio no lee el MEI');
    const svg = tk.renderToSVG(1);
    const err = verificar(nombre, def, svg);
    if (err.length) throw new Error(nombre + ': ' + err.join('; '));
    const listo = preparar(svg, def.alt);
    fs.mkdirSync(SALIDA, { recursive: true });
    fs.writeFileSync(path.join(SALIDA, def.slug + '.svg'), listo.svg);
    console.log(`  ${path.relative(RAIZ, path.join(SALIDA, def.slug + '.svg'))}  ${listo.w}x${listo.h}`);
    if (hayMaqueta) {
      const marca = new RegExp(`<div class="${nombre}">[\\s\\S]*?</div>`);
      if (!marca.test(html)) throw new Error('no encuentro el contenedor ' + nombre);
      html = html.replace(marca, () => `<div class="${nombre}">${listo.svg.trim()}</div>`);
    }
    console.log(`  ${nombre}: ${cabezas(svg).length} notas · ${listo.w}x${listo.h}px · comprobado`);
  }

  if (!hayMaqueta) { console.log('sin maqueta: solo SVG'); return; }
  // fuera VexFlow y el dibujo en vivo
  html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/vexflow[^>]*><\/script>\s*/, '');
  html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>\s*/, '');
  html = html.replace('El pentagrama se dibuja en vivo con VexFlow solo para la prueba.', 'Los pentagramas son SVG de Verovio (tools/gen-maqueta-pentatonica.js); el audio sigue leyendo data-tm-melody.');
  fs.writeFileSync(PAGINA, html);
  console.log('maqueta actualizada');
})().catch((e) => { console.error(e); process.exit(1); });
