'use strict';
/**
 * Serie armonica sobre Do2: imagen del pentagrama doble (clave de sol + clave de fa) con los 16 primeros
 * armonicos y su numero encima. Cabeza RELLENA en los armonicos que no encajan en el temperamento igual
 * (|cents| >= 30), como en la notacion clasica.
 *
 *   node tools/gen-serie-armonica-verovio.js [--poner]
 *
 * Los datos (nota de cada armonico) se leen de assets/js/serie-armonica-engine.js, el MISMO que usa el audio
 * del explorador: una sola fuente. Se comprueba aparte contra la frecuencia (f = 65,406 Hz x n): la nota mas
 * cercana del temperamento igual tiene que ser la que se dibuja, y los «desafinados» salen de los cents.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, ESPACIO, PX_POR_UNIDAD, OPCIONES, hash, escAttr, preparar, GLIFO, LETRAS } = G;

const PAGINA = 'diccionario-musical/serie-armonica';
const SALIDA_SVG = 'assets/img/serie-armonica/serie-completa.svg';
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const PASO_Y = ESPACIO / 2;
const BASE = { treble: 4 * 7 + 2, bass: 2 * 7 + 4 };      // linea inferior: E4 / G2
const ALT_MEI = { '-1': 'f', 1: 's' };

/** HARM tal como lo usa el motor (con freq, cents y det ya calculados). */
function leerArmonicos() {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/serie-armonica-engine.js'), 'utf8');
  const a = src.indexOf('var F1 ='), b = src.indexOf('// interpretación');
  if (a < 0 || b < 0) throw new Error('no encuentro los datos en serie-armonica-engine.js');
  const ctx = vm.createContext({ Math });
  vm.runInContext(src.slice(a, b) + '\nthis.__r = HARM;', ctx);
  return ctx.__r;
}
/** 'bb/4' + acc -> {letra, alt, oct} */
function parseKey(h) {
  const m = /^([a-g])(bb|b|#)?\/(\d)$/.exec(h.key);
  if (!m) throw new Error('clave rara: ' + h.key);
  const alt = m[2] === '#' ? 1 : m[2] ? -1 : 0;
  return { letra: m[1], alt, oct: Number(m[3]) };
}
const semitonos = (n) => (n.oct + 1) * 12 + PC[n.letra] + n.alt;

/** Comprobaciones INDEPENDIENTES de los datos (frecuencia -> nota). */
function verificarDatos(HARM) {
  const err = [];
  if (HARM.length !== 16) err.push('no son 16 armonicos');
  HARM.forEach((h, k) => {
    const n = parseKey(h);
    if (h.n !== k + 1) err.push(`el armonico ${k + 1} dice ser el ${h.n}`);
    const freq = 65.40639 * h.n;
    const midiExacto = 69 + 12 * Math.log2(freq / 440);
    if (Math.round(midiExacto) !== semitonos(n)) err.push(`armonico ${h.n}: la frecuencia ${freq.toFixed(1)} Hz esta mas cerca de MIDI ${Math.round(midiExacto)} y se dibuja MIDI ${semitonos(n)}`);
    if (h.midi !== semitonos(n)) err.push(`armonico ${h.n}: el dato midi ${h.midi} no es la nota dibujada (${semitonos(n)})`);
    const cents = Math.round(100 * (midiExacto - semitonos(n)));
    if (Math.abs(cents - h.cents) > 1) err.push(`armonico ${h.n}: ${h.cents} cents en el dato y ${cents} medidos`);
    const clef = semitonos(n) < 60 ? 'bass' : 'treble';
    if (clef !== h.clef) err.push(`armonico ${h.n}: la clave ${h.clef} no es la que le toca por altura (${clef})`);
  });
  const rellenos = HARM.filter((h) => Math.abs(h.cents) >= 30).map((h) => h.n);
  if (JSON.stringify(rellenos) !== JSON.stringify([7, 11, 13, 14])) err.push('los armonicos desafinados deberian ser 7, 11, 13 y 14 y salen ' + rellenos.join(','));
  return err;
}

function aMEI(HARM) {
  const nota = (h) => {
    const n = parseKey(h);
    return `<note xml:id="n${h.n}" pname="${n.letra}" oct="${n.oct}" dur="1"${n.alt ? ` accid="${ALT_MEI[n.alt]}"` : ''}${Math.abs(h.cents) >= 30 ? ' head.fill="solid"' : ''}/>`;
  };
  const capa = (clef) => HARM.map((h) => (h.clef === clef ? nota(h) : '<space dur="1"/>')).join('');
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef>'
    + '<staffGrp symbol="brace" bar.thru="true"><staffDef n="1" lines="5" clef.shape="G" clef.line="2"/><staffDef n="2" lines="5" clef.shape="F" clef.line="4"/></staffGrp></scoreDef>'
    + `<section><measure n="1" right="invis"><staff n="1"><layer n="1">${capa('treble')}</layer></staff><staff n="2"><layer n="1">${capa('bass')}</layer></staff></measure></section></score></mdiv></body></music></mei>`;
}

function cabezas(svg) {
  const res = [];
  const re = /<g id="n(\d+)" class="note"[^>]*>[\s\S]*?<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g;
  let m;
  while ((m = re.exec(svg))) res.push({ n: Number(m[1]), g: m[2], x: Number(m[3]), y: Number(m[4]) });
  return res.sort((a, b) => a.n - b.n);
}

function verificarSVG(svg, HARM, cabs) {
  const err = [];
  const cuenta = (re) => (svg.match(re) || []).length;
  const raiz = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!raiz || !new RegExp('#' + raiz + ' path').test(svg)) err.push('el estilo de Verovio no esta ligado al id de la raiz');
  const claves = [...svg.matchAll(/class="clef"[\s\S]{0,260}?href="#(E0[0-9A-F]+)/g)].map((m) => m[1]);
  if (JSON.stringify(claves) !== JSON.stringify(['E050', 'E062'])) err.push('claves ' + JSON.stringify(claves) + ', previstas sol y fa');
  if (!/class="grpSym"/.test(svg)) err.push('falta la llave del sistema');
  if (cabs.length !== 16) err.push(`${cabs.length} cabezas, debian ser 16`);
  // altura de cada nota contra las lineas de SU pentagrama (las 5 primeras son la clave de sol; las 5 ultimas, la de fa)
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== 10 || lineas.some((y, k) => k % 5 && y - lineas[k - 1] !== ESPACIO)) err.push('no hay dos pentagramas de 5 lineas');
  else {
    const yb = { treble: lineas[4], bass: lineas[9] };
    HARM.forEach((h) => {
      const c = cabs.find((x) => x.n === h.n); if (!c) return;
      const n = parseKey(h);
      const quiere = yb[h.clef] - ((n.oct * 7 + LETRAS.indexOf(n.letra)) - BASE[h.clef]) * PASO_Y;
      if (c.y !== quiere) err.push(`armonico ${h.n}: esta a y=${c.y} y en clave de ${h.clef === 'bass' ? 'fa' : 'sol'} le corresponde y=${quiere}`);
      const rellena = Math.abs(h.cents) >= 30;
      if (c.g !== (rellena ? 'E0FA' : 'E0A2')) err.push(`armonico ${h.n}: cabeza ${c.g}, debia ser ${rellena ? 'rellena' : 'blanca'}`);
    });
  }
  const acc = {};
  (svg.match(/class="accid"[^>]*>\s*<use [^>]*href="#E2[0-9A-F]+/g) || []).forEach((g) => { const c = /#(E2[0-9A-F]+)/.exec(g)[1]; acc[c] = (acc[c] || 0) + 1; });
  const quiereAcc = {};
  HARM.forEach((h) => { const a = parseKey(h).alt; if (a) quiereAcc[GLIFO[a]] = (quiereAcc[GLIFO[a]] || 0) + 1; });
  if (JSON.stringify(Object.entries(acc).sort()) !== JSON.stringify(Object.entries(quiereAcc).sort())) err.push('alteraciones ' + JSON.stringify(acc) + ', previstas ' + JSON.stringify(quiereAcc));
  const textos = (svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((t) => t.replace(/<[^>]+>/g, ''));
  if (JSON.stringify(textos) !== JSON.stringify(HARM.map((h) => String(h.n)))) err.push('los numeros de armonico no son 1..16');
  return err;
}

/** Numeros encima de cada nota (1..16), en las coordenadas internas, y sitio para ellos. */
function conNumeros(svg, cabs, HARM) {
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const yTope = lineas[0];
  const num = cabs.map((c) => `<text x="${Math.round(c.x + 152)}" y="${Math.round(yTope - 1000)}" fill="#8a5a00" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="340">${c.n}</text>`).join('');
  const d = 200 - (yTope - 1000 - 340);          // cuanto hay que ampliar por arriba
  let s = svg;
  if (d > 0) {
    s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 )0( \d+ )(\d+)(")/, (m, a, b, h, c) => `${a}${-Math.round(d)}${b}${Number(h) + Math.round(d)}${c}`);
    s = s.replace(/^(<svg viewBox="0 0 \d+ )(\d+)(")/, (m, a, h, c) => `${a}${Number(h) + Math.round(d / 25)}${c}`);
  }
  const i = s.lastIndexOf('</svg>', s.lastIndexOf('</svg>') - 1);
  const pm = /class="page-margin"[^>]*transform="translate[(]([0-9.]+), ([0-9.]+)[)]"/.exec(s);
  const dx = pm ? Number(pm[1]) : 0, dy = pm ? Number(pm[2]) : 0;   // los numeros van con el mismo desplazamiento de margen que las notas
  return s.slice(0, i) + `<g class="tm-numeros" transform="translate(${dx} ${dy})">${num}</g>` + s.slice(i);
}

async function main() {
  const poner = process.argv.includes('--poner');
  const HARM = leerArmonicos();
  const errores = verificarDatos(HARM);
  const mei = aMEI(HARM);
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  let svg;
  for (const sep of [0.2, 0.16, 0.13, 0.11, 0.09]) {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('serie-armonica'), spacingLinear: sep, spacingNonLinear: 0.6, pageMarginTop: 10, pageMarginBottom: 10, pageMarginLeft: 45 }));
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
    if (tk.getPageCount() !== 1) errores.push('sale en mas de una pagina');
    svg = tk.renderToSVG(1);
    if (Number(/viewBox="0 0 ([\d.]+) /.exec(svg)[1]) * PX_POR_UNIDAD <= 940) break;
  }
  const cabs = cabezas(svg);
  svg = conNumeros(svg, cabs, HARM);
  errores.push(...verificarSVG(svg, HARM, cabs));
  const pagina = path.join(RAIZ, PAGINA, 'index.html');
  let html = fs.readFileSync(pagina, 'utf8');
  const alt = (/<img src="\/assets\/img\/serie-armonica\/serie-completa\.(?:png|svg)"[^>]*alt="([^"]*)"/.exec(html) || [])[1];
  if (!alt) errores.push('no encuentro la imagen en la pagina');
  else {
    // el alt de la pagina es la segunda fuente: nombra las 16 notas en orden
    const nombres = [...alt.replace(/^[^:]*sobre Do 2[^:]*:/, alt).matchAll(/(Do|Re|Mi|Fa|Sol|La|Si)(?: (sostenido|bemol))?/g)].map((m) => m[1] + (m[2] === 'sostenido' ? '♯' : m[2] === 'bemol' ? '♭' : ''));
    const dibujadas = HARM.map((h) => h.es);
    const quiere = nombres.slice(-16);
    if (JSON.stringify(quiere) !== JSON.stringify(dibujadas)) errores.push(`el alt nombra ${quiere.join(' ')} y se dibuja ${dibujadas.join(' ')}`);
  }
  const listo = preparar(svg, alt || 'Los 16 primeros armónicos sobre Do 2');
  if (errores.length) { console.log('✗ serie armonica\n   - ' + errores.join('\n   - ')); process.exit(1); }
  fs.writeFileSync(path.join(RAIZ, SALIDA_SVG), listo.svg);
  console.log(`✓ serie-completa.svg ${listo.svg.length} B · ${listo.w}×${listo.h} · 16 armonicos (rellenos: ${HARM.filter((h) => Math.abs(h.cents) >= 30).map((h) => h.n).join(', ')})`);
  if (poner) {
    const re = /(?:<picture>(?:<source[^>]*>)?)?<img src="\/assets\/img\/serie-armonica\/serie-completa\.(?:png|svg)"[^>]*>(?:<\/picture>)?/;
    if (!re.test(html)) throw new Error('no puedo sustituir la imagen');
    html = html.replace(re, () => `<img src="/assets/img/serie-armonica/serie-completa.svg" width="${listo.w}" height="${listo.h}" loading="lazy" alt="${escAttr(alt)}" style="max-width:100%;height:auto">`);
    fs.writeFileSync(pagina, html);
    console.log('escrito ' + PAGINA + '/index.html');
  }
}
main().catch((e) => { console.error('✗', e.message); process.exit(1); });
