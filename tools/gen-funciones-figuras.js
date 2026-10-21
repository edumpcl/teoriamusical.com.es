'use strict';
/**
 * Figuras de /diccionario-musical/funciones-tonales/ dibujadas con Verovio (SVG), con sus textos alternativos:
 *   acordes-do-mayor     los 6 acordes que se estudian (I, VI, IV, II, V, VII) con su función (T, S, D)
 *   regla-sensible       tres acordes con la sensible (dominante), el 4.º grado (subdominante) y ninguno de los dos (tónica)
 *   prog-i-iv-v-i        I – IV – V – I en Do mayor            (T S D T)
 *   prog-i-vi-ii-v       I – VI – II – V en Do mayor           (T T S D)
 *   prog-menor           i – iv – V – i en La menor            (T S D T)
 *
 *   node tools/gen-funciones-figuras.js              # genera y verifica
 *   node tools/gen-funciones-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN (vías que no salen del mismo sitio):
 *   1. la FUNCIÓN escrita bajo cada acorde se recalcula desde las notas con la regla de la sensible y del 4.º grado (sin mirar
 *      la etiqueta): si el acorde lleva la sensible es D; si no, y lleva el 4.º grado, S; si no, T;
 *   2. el MEI releído: los acordes, nota a nota, y los textos (letra de función encima, número romano debajo);
 *   3. el dibujo: 5 líneas, clave de sol, las cabezas en el paso del pentagrama que toca por su nombre, tantas alteraciones en la
 *      armadura como pide la tonalidad, los textos dibujados en el orden de lectura y encima/debajo del pentagrama;
 *   4. el texto alternativo nombra todos los acordes por sus notas y por su función.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = 'assets/img/notacion/funciones';
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const paso = (k) => { const m = /^([a-g])[#b]?\/(\d)$/.exec(k); return Number(m[2]) * 7 + LETRAS.indexOf(m[1]); };
const pcDe = (k) => { const m = /^([a-g])([#b]?)\/(\d)$/.exec(k); return (SEMI[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + 12) % 12; };

// armadura: n.º de alteraciones y su signo (tonalidad en la que está escrito el acorde)
const FIGURAS = [
  {
    id: 'acordes-do-mayor', tonica: 'c', modo: 'mayor', sig: '0',
    acordes: [
      { r: 'I', f: 'T', n: ['c/4', 'e/4', 'g/4'] }, { r: 'VI', f: 'T', n: ['a/4', 'c/5', 'e/5'] },
      { r: 'IV', f: 'S', n: ['f/4', 'a/4', 'c/5'] }, { r: 'II', f: 'S', n: ['d/4', 'f/4', 'a/4'] },
      { r: 'V', f: 'D', n: ['g/4', 'b/4', 'd/5'] }, { r: 'VII', f: 'D', n: ['b/4', 'd/5', 'f/5'] },
    ],
    alt: 'Seis acordes de Do mayor con su función: encima, la letra de la función, y debajo, el grado. I (Do, Mi, Sol) y VI (La, Do, Mi), tónica; IV (Fa, La, Do) y II (Re, Fa, La), subdominante; V (Sol, Si, Re) y VII (Si, Re, Fa), dominante.',
  },
  {
    id: 'regla-sensible', tonica: 'c', modo: 'mayor', sig: '0',
    acordes: [
      { r: 'V', f: 'D', n: ['g/4', 'b/4', 'd/5'], rojo: ['b/4'], etq: 'lleva Si' },
      { r: 'II', f: 'S', n: ['d/4', 'f/4', 'a/4'], rojo: ['f/4'], etq: 'lleva Fa' },
      { r: 'VI', f: 'T', n: ['a/4', 'c/5', 'e/5'], rojo: [], etq: 'ni Si ni Fa' },
    ],
    alt: 'Tres acordes de Do mayor con la nota clave marcada en rojo: Sol, Si, Re lleva la sensible (Si), dominante; Re, Fa, La lleva el cuarto grado (Fa) y no la sensible, subdominante; La, Do, Mi no lleva ni Si ni Fa, tónica.',
  },
  {
    id: 'prog-i-iv-v-i', tonica: 'c', modo: 'mayor', sig: '0',
    acordes: [
      { r: 'I', f: 'T', n: ['c/4', 'e/4', 'g/4'] }, { r: 'IV', f: 'S', n: ['f/4', 'a/4', 'c/5'] },
      { r: 'V', f: 'D', n: ['g/4', 'b/4', 'd/5'] }, { r: 'I', f: 'T', n: ['c/4', 'e/4', 'g/4'] },
    ],
    alt: 'Progresión I, IV, V, I en Do mayor: Do, Mi, Sol (tónica); Fa, La, Do (subdominante); Sol, Si, Re (dominante); y otra vez Do, Mi, Sol (tónica).',
  },
  {
    id: 'prog-i-vi-ii-v', tonica: 'c', modo: 'mayor', sig: '0',
    acordes: [
      { r: 'I', f: 'T', n: ['c/4', 'e/4', 'g/4'] }, { r: 'VI', f: 'T', n: ['a/4', 'c/5', 'e/5'] },
      { r: 'II', f: 'S', n: ['d/4', 'f/4', 'a/4'] }, { r: 'V', f: 'D', n: ['g/4', 'b/4', 'd/5'] },
    ],
    alt: 'Progresión I, VI, II, V en Do mayor: Do, Mi, Sol (tónica); La, Do, Mi (tónica); Re, Fa, La (subdominante); Sol, Si, Re (dominante).',
  },
  {
    id: 'prog-menor', tonica: 'a', modo: 'menor', sig: '0',
    acordes: [
      { r: 'i', f: 'T', n: ['a/3', 'c/4', 'e/4'] }, { r: 'iv', f: 'S', n: ['d/4', 'f/4', 'a/4'] },
      { r: 'V', f: 'D', n: ['e/4', 'g#/4', 'b/4'] }, { r: 'i', f: 'T', n: ['a/3', 'c/4', 'e/4'] },
    ],
    alt: 'Progresión i, iv, V, i en La menor: La, Do, Mi (tónica); Re, Fa, La (subdominante); Mi, Sol sostenido, Si (dominante, con la sensible Sol sostenido); y otra vez La, Do, Mi (tónica).',
  },
];
const NSOST = { '0': 0 };
const FUNC_NOMBRE = { T: 'tónica', S: 'subdominante', D: 'dominante' };

// Regla de la sensible y del 4.º grado, desde las notas (semitonos sobre la tónica de la figura).
function funcionPorRegla(f, ac) {
  const tonicaPc = SEMI[f.tonica];
  const sens = (tonicaPc + 11) % 12, cuarto = (tonicaPc + 5) % 12;
  const pcs = ac.n.map(pcDe);
  return pcs.includes(sens) ? 'D' : pcs.includes(cuarto) ? 'S' : 'T';
}

function nota(k, color) {
  const m = /^([a-g])([#b]?)\/(\d)$/.exec(k);
  const acc = m[2] === '#' ? ' accid="s"' : m[2] === 'b' ? ' accid="f"' : '';
  return `<note pname="${m[1]}" oct="${m[3]}"${acc}${color ? ` color="${color}"` : ''}/>`;
}

function construye(fig, sab = {}) {
  const acordes = sab.acordes || fig.acordes;
  const compases = acordes.map((ac, i) => {
    const sec = (ac.etq || '');
    const rojo = new Set(ac.rojo || []);
    const notas = ac.n.map((k) => nota(k, rojo.has(k) ? '#c0392b' : '')).join('');
    const arriba = `<dir xml:id="f${i}" staff="1" tstamp="1" place="above" fontweight="bold">${ac.f}</dir>`;
    const abajo = `<dir xml:id="r${i}" staff="1" tstamp="1" place="below">${ac.r}${sec ? ' ' + sec : ''}</dir>`;
    return `<measure n="${i + 1}"><staff n="1"><layer n="1"><chord xml:id="c${i}" dur="1">${notas}</chord></layer></staff>${arriba}${abajo}</measure>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef meter.count="4" meter.unit="4" meter.visible="false" key.sig="${sab.sig || fig.sig}"><staffGrp><staffDef n="1" lines="5" clef.shape="G" clef.line="2"/></staffGrp></scoreDef><section>${compases}</section></score></mdiv></body></music></mei>`;
}

function verificar(fig, mei, svg, alt) {
  const err = [];
  // 1. la función de cada acorde, por la regla
  fig.acordes.forEach((ac) => {
    const r = funcionPorRegla(fig, ac);
    if (r !== ac.f) err.push(`${ac.r}: la etiqueta dice ${ac.f} y por la regla de la sensible es ${r}`);
  });
  // 2. MEI releído
  const acMei = [...mei.matchAll(/<chord [^>]*>([\s\S]*?)<\/chord>/g)].map((m) => [...m[1].matchAll(/<note pname="(\w)" oct="(\d)"(?: accid="(\w)")?/g)].map((n) => `${n[1]}${n[3] === 's' ? '#' : n[3] === 'f' ? 'b' : ''}/${n[2]}`));
  if (JSON.stringify(acMei) !== JSON.stringify(fig.acordes.map((a) => a.n))) err.push(`el MEI escribe ${JSON.stringify(acMei)}`);
  const dirs = [...mei.matchAll(/<dir [^>]*place="(above|below)"[^>]*>([^<]*)<\/dir>/g)].map((m) => ({ lugar: m[1], t: m[2] }));
  const quiereDirs = []; fig.acordes.forEach((a) => { quiereDirs.push({ lugar: 'above', t: a.f }); quiereDirs.push({ lugar: 'below', t: a.r + (a.etq ? ' ' + a.etq : '') }); });
  if (JSON.stringify(dirs) !== JSON.stringify(quiereDirs)) err.push(`los textos del MEI son ${JSON.stringify(dirs.map((d) => d.t))}`);
  // 3. dibujo
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  if (!/href="#E050-/.test(svg)) err.push('falta la clave de sol');
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  const quiere = fig.acordes.flatMap((a) => a.n);
  if (cabezas.length !== quiere.length) err.push(`${cabezas.length} cabezas y tenían que ser ${quiere.length}`);
  else if (lineas.length === 5) {
    const dib = cabezas.map((c) => 30 + Math.round((lineas[4] - c.y) / (ESPACIO / 2))).sort((a, b) => a - b);
    const esp = quiere.map(paso).sort((a, b) => a - b);
    if (JSON.stringify(dib) !== JSON.stringify(esp)) err.push(`las cabezas están en los pasos ${dib} y tocan ${esp}`);
    if (!cabezas.every((c) => c.g === 'E0A2')) err.push('las cabezas no son de redonda');
  }
  const iKs = svg.indexOf('class="keySig"');
  let nAlt = 0;
  if (iKs >= 0 && !/^[^>]*\/>/.test(svg.slice(iKs))) nAlt = (svg.slice(iKs, svg.indexOf('class="meterSig"', iKs)).match(/<use /g) || []).length;
  if (nAlt !== Math.abs(Number(fig.sig.replace(/\D/g, '') || 0))) err.push(`la armadura lleva ${nAlt} alteraciones y ${fig.id} pide ${fig.sig}`);
  const textos = [...svg.matchAll(/<g id="(\w+)" class="dir"[^>]*>\s*<text x="(\d+)" y="(\d+)"[^>]*>([\s\S]*?)<\/text>/g)].map((m) => ({ id: m[1], x: Number(m[2]), y: Number(m[3]), t: m[4].replace(/<[^>]+>/g, '').trim() }));
  if (textos.length !== quiereDirs.length) err.push(`${textos.length} textos dibujados y tenían que ser ${quiereDirs.length}`);
  else if (lineas.length === 5) {
    textos.forEach((t, i) => {
      const q = quiereDirs[i];
      if (t.t !== q.t) err.push(`texto ${i + 1}: «${t.t}» y tocaba «${q.t}»`);
      if (q.lugar === 'above' && !(t.y < lineas[0])) err.push(`«${t.t}» debería ir encima del pentagrama`);
      if (q.lugar === 'below' && !(t.y > lineas[4])) err.push(`«${t.t}» debería ir debajo del pentagrama`);
    });
    const porX = fig.acordes.map((_, i) => textos.filter((t) => t.id === `f${i}`)[0]).map((t) => t && t.x);
    if (porX.some((x, i) => i && !(x > porX[i - 1]))) err.push('los acordes no van de izquierda a derecha en el orden pedido');
  }
  // 4. alt
  fig.acordes.forEach((a) => {
    const nombres = a.n.map((k) => NOMBRE[k[0]] + (k[1] === '#' ? ' sostenido' : '')).join(', ');
    if (!alt.includes(nombres)) err.push(`el alt no nombra las notas «${nombres}» de ${a.r}`);
    if (!alt.includes(FUNC_NOMBRE[a.f])) err.push(`el alt no nombra la función ${FUNC_NOMBRE[a.f]}`);
  });
  return err;
}

if (require.main === module) (async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (fig, nombre, sab) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('funciones-' + nombre), spacingLinear: 0.5 }));
    const mei = construye(fig, sab);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
    return { mei, svg: tk.renderToSVG(1) };
  };
  if (sabotaje) {
    const f = FIGURAS[0], g = FIGURAS[4];
    const pruebas = [
      ['una nota cambiada en V', f, { acordes: f.acordes.map((a) => (a.r === 'V' ? Object.assign({}, a, { n: ['g/4', 'b/4', 'e/5'] }) : a)) }, f.alt],
      ['VII etiquetado como T', Object.assign({}, f, { acordes: f.acordes.map((a) => (a.r === 'VII' ? Object.assign({}, a, { f: 'T' }) : a)) }), null, f.alt],
      ['armadura equivocada', f, { sig: '2s' }, f.alt],
      ['sensible sin sostenido (Sol en lugar de Sol#)', g, { acordes: g.acordes.map((a) => (a.r === 'V' ? Object.assign({}, a, { n: ['e/4', 'g/4', 'b/4'] }) : a)) }, g.alt],
      ['alt con la función cambiada', f, null, f.alt.replace('IV (Fa, La, Do) y II (Re, Fa, La), subdominante', 'IV (Fa, La, Do) y II (Re, Fa, La), dominante')],
    ];
    let mal = 0;
    for (const [desc, fig, sab, alt] of pruebas) {
      const { mei, svg } = dibuja(fig, 'sab', sab || {});
      const e = verificar(fig, mei, svg, alt);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  let malo = 0;
  for (const fig of FIGURAS) {
    const { mei, svg } = dibuja(fig, fig.id, {});
    const err = verificar(fig, mei, svg, fig.alt);
    if (err.length) { console.log(`  ✗ ${fig.id}: ${err.join('; ')}`); malo++; continue; }
    const listo = preparar(svg, fig.alt);
    fs.writeFileSync(path.join(RAIZ, SALIDA, fig.id + '.svg'), listo.svg);
    console.log(`  ✓ ${fig.id}  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB`);
  }
  process.exit(malo ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });

module.exports = { FIGURAS, funcionPorRegla };
