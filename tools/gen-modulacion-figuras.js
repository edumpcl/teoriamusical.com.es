'use strict';
/**
 * Figuras de /diccionario-musical/modulacion/ dibujadas con Verovio (SVG), con sus textos alternativos:
 *   mod-diatonica   Do mayor → Sol mayor por acorde común:  Do: I – vi (= Sol: ii, pivote) – V7 de Sol – I de Sol
 *   mod-cromatica   Do mayor → Re mayor por cromatismo:     Do: I – vi – V7 de Re (do→do♯) – I de Re
 *   mod-enarmonica  el mismo acorde de séptima disminuida escrito de dos maneras: vii°7 de Do menor y vii°7 de La menor
 *
 *   node tools/gen-modulacion-figuras.js              # genera y verifica
 *   node tools/gen-modulacion-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN (vías que no salen del mismo sitio):
 *   1. el NÚMERO ROMANO de cada acorde se recalcula desde sus notas (fundamental por patrón de semitonos, grado en la escala de la
 *      tonalidad que se dice) y se compara con el escrito: «vi = ii» exige que el mismo acorde sea vi en Do y ii en Sol;
 *   2. en la figura enarmónica, los dos acordes suenan IGUAL (mismas alturas en semitonos) y están escritos DISTINTO;
 *   3. el MEI releído (acordes nota a nota, con sus alteraciones; textos encima y debajo);
 *   4. el dibujo: 5 líneas, clave de sol, cabezas en el paso que toca por su nombre, alteraciones dibujadas, textos en orden de
 *      lectura, encima/debajo del pentagrama;
 *   5. el texto alternativo nombra los acordes por sus notas y las tonalidades.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = 'assets/img/notacion/modulacion';
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const paso = (k) => { const m = /^([a-g])[#b]?\/(\d)$/.exec(k); return Number(m[2]) * 7 + LETRAS.indexOf(m[1]); };
const semi = (k) => { const m = /^([a-g])([#b]?)\/(\d)$/.exec(k); return (Number(m[3]) + 1) * 12 + SEMI[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0); };
const nombreNota = (k) => NOMBRE[k[0]] + (k[1] === '#' ? ' sostenido' : k[1] === 'b' && k[2] === '/' ? ' bemol' : '');

const TON = {
  do: { nombre: 'Do mayor', pc: 0, modo: 'mayor' }, sol: { nombre: 'Sol mayor', pc: 7, modo: 'mayor' }, re: { nombre: 'Re mayor', pc: 2, modo: 'mayor' },
  dom: { nombre: 'Do menor', pc: 0, modo: 'menor' }, lam: { nombre: 'La menor', pc: 9, modo: 'menor' },
};
const ESCALA = { mayor: [0, 2, 4, 5, 7, 9, 11], menor: [0, 2, 3, 5, 7, 8, 11] }; // el menor, en su forma armónica (con sensible)

const FIGURAS = [
  {
    id: 'mod-diatonica',
    acordes: [
      { n: ['c/4', 'e/4', 'g/4'], num: [['do', 'I']], enTon: 'do' },
      { n: ['a/4', 'c/5', 'e/5'], num: [['do', 'vi'], ['sol', 'ii']], etq: ' (pivote)' },
      { n: ['d/4', 'f#/4', 'a/4', 'c/5'], num: [['sol', 'V7']], enTon: 'sol' },
      { n: ['g/4', 'b/4', 'd/5'], num: [['sol', 'I']] },
    ],
    alt: 'Modulación de Do mayor a Sol mayor por acorde común: Do, Mi, Sol (I de Do mayor); La, Do, Mi (vi de Do mayor y ii de Sol mayor, el acorde pivote); Re, Fa sostenido, La, Do (V7 de Sol mayor); y Sol, Si, Re (I de Sol mayor).',
  },
  {
    id: 'mod-cromatica',
    acordes: [
      { n: ['c/4', 'e/4', 'g/4'], num: [['do', 'I']], enTon: 'do' },
      { n: ['a/4', 'c/5', 'e/5'], num: [['do', 'vi']] },
      { n: ['a/4', 'c#/5', 'e/5', 'g/5'], num: [['re', 'V7']], enTon: 're' },
      { n: ['d/4', 'f#/4', 'a/4'], num: [['re', 'I']] },
    ],
    alt: 'Modulación de Do mayor a Re mayor por cromatismo: Do, Mi, Sol (I de Do mayor); La, Do, Mi (vi de Do mayor); La, Do sostenido, Mi, Sol (V7 de Re mayor, con el Do alterado cromáticamente); y Re, Fa sostenido, La (I de Re mayor).',
  },
  {
    id: 'mod-enarmonica',
    acordes: [
      { n: ['b/3', 'd/4', 'f/4', 'ab/4'], num: [['dom', 'vii°7']], enTon: 'dom' },
      { n: ['b/3', 'd/4', 'f/4', 'g#/4'], num: [['lam', 'vii°7']], enTon: 'lam' },
    ],
    enarmonico: true,
    alt: 'El mismo acorde de séptima disminuida escrito de dos maneras: Si, Re, Fa, La bemol (vii°7 de Do menor) y Si, Re, Fa, Sol sostenido (vii°7 de La menor). Suenan igual, pero se escriben distinto y conducen a tonalidades distintas.',
  },
];

// Número romano de un acorde en una tonalidad, desde las alturas reales.
function romanoEn(notas, tonKey) {
  const T = TON[tonKey];
  const pcs = [...new Set(notas.map((k) => ((semi(k) % 12) + 12) % 12))];
  const PATRONES = [[[0, 4, 7], (r) => r], [[0, 3, 7], (r) => r.toLowerCase()], [[0, 3, 6], (r) => r.toLowerCase() + '°'], [[0, 4, 7, 10], (r) => r + '7'], [[0, 3, 6, 9], (r) => r.toLowerCase() + '°7']];
  const candidatos = [];
  for (const raiz of pcs) {
    const ints = pcs.map((p) => (p - raiz + 12) % 12).sort((x, y) => x - y);
    const pat = PATRONES.find(([p]) => JSON.stringify(p) === JSON.stringify(ints));
    if (!pat) continue;
    const grado = ESCALA[T.modo].indexOf(((raiz - T.pc) % 12 + 12) % 12);
    candidatos.push({ pat, grado });
  }
  // el acorde de séptima disminuida es simétrico (tres terceras menores): cualquiera de sus notas puede ser la «fundamental».
  // En una tonalidad se lee sobre la SENSIBLE (7.º grado) si la tiene.
  const sens = candidatos.find((c) => c.grado === 6 && c.pat[0].length === 4 && c.pat[0][3] === 9);
  const c = sens || candidatos.find((x) => x.grado >= 0);
  if (c) return c.pat[1](ROMANOS[c.grado]);
  if (candidatos.length) return `(fuera de ${T.nombre})`;
  return '(no es un acorde por terceras)';
}

function nota(k) {
  const m = /^([a-g])([#b]?)\/(\d)$/.exec(k);
  const acc = m[2] === '#' ? ' accid="s"' : m[2] === 'b' ? ' accid="f"' : '';
  return `<note pname="${m[1]}" oct="${m[3]}"${acc}/>`;
}
const etiquetaAbajo = (ac) => ac.num.map(([, r]) => r).join(' = ') + (ac.etq || '');

function construye(fig, sab = {}) {
  const acordes = sab.acordes || fig.acordes;
  const compases = acordes.map((ac, i) => {
    const arriba = ac.enTon ? `<dir xml:id="t${i}" staff="1" tstamp="1" place="above">${TON[ac.enTon].nombre}</dir>` : '';
    const abajo = `<dir xml:id="r${i}" staff="1" tstamp="1" place="below">${etiquetaAbajo(ac)}</dir>`;
    return `<measure n="${i + 1}"><staff n="1"><layer n="1"><chord xml:id="c${i}" dur="1">${ac.n.map(nota).join('')}</chord></layer></staff>${arriba}${abajo}</measure>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef meter.count="4" meter.unit="4" meter.visible="false" key.sig="0"><staffGrp><staffDef n="1" lines="5" clef.shape="G" clef.line="2"/></staffGrp></scoreDef><section>${compases}</section></score></mdiv></body></music></mei>`;
}

function verificar(fig, mei, svg, alt) {
  const err = [];
  // 1. números romanos recalculados
  fig.acordes.forEach((ac, i) => ac.num.forEach(([t, r]) => {
    const real = romanoEn(ac.n, t);
    if (real !== r) err.push(`acorde ${i + 1}: escrito ${r} en ${TON[t].nombre} y por las notas es ${real}`);
  }));
  // 2. enarmonía: suenan igual, se escriben distinto
  if (fig.enarmonico) {
    const [a, b] = fig.acordes;
    const sa = a.n.map(semi).sort((x, y) => x - y).join(), sb = b.n.map(semi).sort((x, y) => x - y).join();
    if (sa !== sb) err.push(`los dos acordes no suenan igual (${sa} frente a ${sb})`);
    if (a.n.join() === b.n.join()) err.push('los dos acordes están escritos igual');
  }
  // 3. MEI releído
  const acMei = [...mei.matchAll(/<chord [^>]*>([\s\S]*?)<\/chord>/g)].map((m) => [...m[1].matchAll(/<note pname="(\w)" oct="(\d)"(?: accid="(\w)")?/g)].map((n) => `${n[1]}${n[3] === 's' ? '#' : n[3] === 'f' ? 'b' : ''}/${n[2]}`));
  if (JSON.stringify(acMei) !== JSON.stringify(fig.acordes.map((a) => a.n))) err.push(`el MEI escribe ${JSON.stringify(acMei)}`);
  // 4. dibujo
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
  }
  const nAcc = (svg.match(/class="accid"/g) || []).length, nAccQuiere = quiere.filter((k) => /^[a-g][#b]/.test(k)).length;
  if (nAcc !== nAccQuiere) err.push(`${nAcc} alteraciones dibujadas y se escribieron ${nAccQuiere}`);
  const textos = [...svg.matchAll(/<g id="(\w+)" class="dir"[^>]*>\s*<text x="(\d+)" y="(\d+)"[^>]*>([\s\S]*?)<\/text>/g)].map((m) => ({ id: m[1], x: Number(m[2]), y: Number(m[3]), t: m[4].replace(/<[^>]+>/g, '').trim() }));
  const quiereT = [];
  fig.acordes.forEach((ac, i) => { if (ac.enTon) quiereT.push({ id: 't' + i, lugar: 'above', t: TON[ac.enTon].nombre }); quiereT.push({ id: 'r' + i, lugar: 'below', t: etiquetaAbajo(ac).trim() }); });
  const porId = (id) => textos.filter((t) => t.id === id)[0];
  quiereT.forEach((q) => {
    const t = porId(q.id);
    if (!t) return err.push(`falta el texto «${q.t}»`);
    if (t.t.replace(/\s+/g, ' ') !== q.t) err.push(`texto «${t.t}» y tocaba «${q.t}»`);
    if (lineas.length === 5 && q.lugar === 'above' && !(t.y < lineas[0])) err.push(`«${t.t}» debería ir encima`);
    if (lineas.length === 5 && q.lugar === 'below' && !(t.y > lineas[4])) err.push(`«${t.t}» debería ir debajo`);
  });
  const xs = fig.acordes.map((_, i) => (porId('r' + i) || {}).x);
  if (xs.some((x, i) => i && !(x > xs[i - 1]))) err.push('los acordes no van de izquierda a derecha');
  // 5. alt
  fig.acordes.forEach((a, i) => {
    const nombres = a.n.map(nombreNota).join(', ');
    if (!alt.includes(nombres)) err.push(`el alt no nombra las notas «${nombres}» del acorde ${i + 1}`);
    a.num.forEach(([t, r]) => { if (!alt.includes(`${r} de ${TON[t].nombre}`)) err.push(`el alt no dice «${r} de ${TON[t].nombre}»`); });
  });
  return err;
}

if (require.main === module) (async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (fig, nombre, sab) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('modulacion-' + nombre), spacingLinear: 0.5 }));
    const mei = construye(fig, sab);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
    return { mei, svg: tk.renderToSVG(1) };
  };
  if (sabotaje) {
    const [d, c, e] = FIGURAS;
    const cambia = (fig, i, f) => ({ acordes: fig.acordes.map((a, j) => (j === i ? f(a) : a)) });
    const pruebas = [
      ['el pivote deja de ser ii de Sol (La, Do, Mi → La, Do, Mi♭)', d, cambia(d, 1, (a) => Object.assign({}, a, { n: ['a/4', 'c/5', 'eb/5'] })), d.alt],
      ['V7 de Sol sin el Fa sostenido', d, cambia(d, 2, (a) => Object.assign({}, a, { n: ['d/4', 'f/4', 'a/4', 'c/5'] })), d.alt],
      ['la cromática sin alterar el Do', c, cambia(c, 2, (a) => Object.assign({}, a, { n: ['a/4', 'c/5', 'e/5', 'g/5'] })), c.alt],
      ['enarmónica: el segundo acorde suena distinto', e, cambia(e, 1, (a) => Object.assign({}, a, { n: ['b/3', 'd/4', 'f/4', 'g/4'] })), e.alt],
      ['enarmónica: los dos escritos igual', e, cambia(e, 1, (a) => Object.assign({}, a, { n: ['b/3', 'd/4', 'f/4', 'ab/4'] })), e.alt],
      ['alt con la tonalidad cambiada', d, null, d.alt.replace('V7 de Sol mayor', 'V7 de Re mayor')],
    ];
    let mal = 0;
    for (const [desc, fig, sab, alt] of pruebas) {
      const { mei, svg } = dibuja(fig, 'sab', sab || {});
      const err = verificar(fig, mei, svg, alt);
      console.log(`  ${err.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${err.length ? ' → ' + err[0] : ''}`);
      if (!err.length) mal++;
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

module.exports = { FIGURAS, romanoEn };
