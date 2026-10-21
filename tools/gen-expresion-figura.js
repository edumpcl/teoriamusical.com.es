'use strict';
/**
 * Figura de /diccionario-musical/terminos-de-expresion/ dibujada con Verovio (SVG): dos compases con las indicaciones de tempo y de
 * expresión escritas donde van en la partitura: «Andante con moto» (tempo + carácter) encima del principio, «dolce» debajo de la primera
 * nota, y «espressivo» y «poco rit.» encima del segundo compás.
 *
 *   node tools/gen-expresion-figura.js              # genera y verifica
 *   node tools/gen-expresion-figura.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN (vías que no salen del mismo sitio):
 *   1. el MEI releído: las 8 notas, en orden, y los textos (con su posición encima/debajo y a qué tiempo van);
 *   2. el dibujo: pentagrama de 5 líneas con clave de sol y compás 4/4; las 8 cabezas en el paso del pentagrama que toca por su nombre
 *      (calculado a mano desde la letra y la octava); los cuatro textos dibujados, escritos TAL CUAL (sin faltas), en el orden de lectura
 *      de izquierda a derecha, y colocados encima o debajo del pentagrama según el MEI (la «y» del texto frente a las líneas); y cada
 *      texto empieza a la altura de la nota a la que se refiere (o a la derecha de la barra del segundo compás);
 *   3. el texto alternativo nombra exactamente esos cuatro textos.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = 'assets/img/notacion/expresion';
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const paso = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return Number(m[2]) * 7 + LETRAS.indexOf(m[1]); };
const NOTAS = ['e/4', 'g/4', 'c/5', 'b/4', 'a/4', 'd/5', 'c/5', 'g/4'];
const TEXTOS = [
  { id: 'tempo', texto: 'Andante con moto', tipo: 'tempo', lugar: 'above', compas: 1, tiempo: 1 },
  { id: 'dolce', texto: 'dolce', tipo: 'dir', lugar: 'below', compas: 1, tiempo: 1 },
  { id: 'espressivo', texto: 'espressivo', tipo: 'dir', lugar: 'above', compas: 2, tiempo: 1 },
  { id: 'rit', texto: 'poco rit.', tipo: 'dir', lugar: 'above', compas: 2, tiempo: 3 },
];
const ALT = 'Dos compases con indicaciones de expresión escritas en la partitura: encima del principio, «Andante con moto»; debajo de la primera nota, «dolce»; y encima del segundo compás, «espressivo» y «poco rit.».';

function construye(sab = {}) {
  const notas = sab.notas || NOTAS, textos = sab.textos || TEXTOS;
  const n = (i, k) => { const m = /^([a-g])\/(\d)$/.exec(k); return `<note xml:id="n${i}" pname="${m[1]}" oct="${m[2]}" dur="4"/>`; };
  const tx = (c) => textos.filter((t) => t.compas === c).map((t) => t.tipo === 'tempo'
    ? `<tempo xml:id="${t.id}" staff="1" tstamp="${t.tiempo}" place="${t.lugar}">${t.texto}</tempo>`
    : `<dir xml:id="${t.id}" staff="1" tstamp="${t.tiempo}" place="${t.lugar}" fontstyle="italic">${t.texto}</dir>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef meter.count="4" meter.unit="4"><staffGrp><staffDef n="1" lines="5" clef.shape="G" clef.line="2"></staffDef></staffGrp></scoreDef><section>` +
    `<measure n="1"><staff n="1"><layer n="1">${notas.slice(0, 4).map((k, i) => n(i, k)).join('')}</layer></staff>${tx(1)}</measure>` +
    `<measure n="2"><staff n="1"><layer n="1">${notas.slice(4).map((k, i) => n(i + 4, k)).join('')}</layer></staff>${tx(2)}</measure></section></score></mdiv></body></music></mei>`;
}

function verificar(mei, svg, alt) {
  const err = [];
  // 1. MEI
  const leidas = [...mei.matchAll(/<note [^>]*pname="(\w)" oct="(\d)"/g)].map((m) => m[1] + '/' + m[2]);
  if (JSON.stringify(leidas) !== JSON.stringify(NOTAS)) err.push(`el MEI escribe ${leidas.join(' ')} y tenía que ser ${NOTAS.join(' ')}`);
  const enMei = [...mei.matchAll(/<(tempo|dir) [^>]*place="(above|below)"[^>]*>([^<]*)<\/\1>/g)].map((m) => ({ tipo: m[1], lugar: m[2], texto: m[3] }));
  if (JSON.stringify(enMei) !== JSON.stringify(TEXTOS.map((t) => ({ tipo: t.tipo, lugar: t.lugar, texto: t.texto })))) err.push(`los textos del MEI son ${JSON.stringify(enMei.map((t) => t.texto + ':' + t.lugar))}`);
  // 2. dibujo
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  if (!/href="#E050-/.test(svg)) err.push('falta la clave de sol');
  if ((svg.match(/href="#E084-/g) || []).length < 2) err.push('falta el compás 4/4 (dos cuatros)');
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  if (cabezas.length !== 8) err.push(`${cabezas.length} cabezas y tenían que ser 8`);
  else if (lineas.length === 5) {
    const BASE = 4 * 7 + 2;
    cabezas.forEach((c, i) => { const p = BASE + (lineas[4] - c.y) / (ESPACIO / 2); if (p !== paso(NOTAS[i])) err.push(`la nota ${i + 1} está en el paso ${p} y se pedía ${paso(NOTAS[i])}`); });
    if (!cabezas.every((c) => c.g === 'E0A4')) err.push('las cabezas no son de negra');
  }
  const textos = [...svg.matchAll(/<g id="(\w+)" class="(tempo|dir)"[^>]*>\s*<text x="(\d+)" y="(\d+)"[^>]*>([\s\S]*?)<\/text>/g)].map((m) => ({ id: m[1], x: Number(m[3]), y: Number(m[4]), texto: m[5].replace(/<[^>]+>/g, '').trim() }));
  const quieren = TEXTOS.map((t) => t.texto);
  if (JSON.stringify(textos.map((t) => t.texto)) !== JSON.stringify(quieren)) err.push(`se dibujan los textos ${JSON.stringify(textos.map((t) => t.texto))} y tocan ${JSON.stringify(quieren)}`);
  const porX = textos.slice().sort((a, b) => a.x - b.x).map((t) => t.texto);
  if (JSON.stringify(porX) !== JSON.stringify(quieren)) err.push(`el orden de lectura (izquierda a derecha) es ${JSON.stringify(porX)} y debería ser ${JSON.stringify(quieren)}`);
  if (lineas.length === 5 && textos.length === 4) {
    const arriba = lineas[0], abajo = lineas[4];
    textos.forEach((t, i) => {
      const ref = TEXTOS[i];
      if (ref.lugar === 'above' && !(t.y < arriba)) err.push(`«${t.texto}» debería ir encima del pentagrama y está en y=${t.y} (línea superior ${arriba})`);
      if (ref.lugar === 'below' && !(t.y > abajo)) err.push(`«${t.texto}» debería ir debajo del pentagrama y está en y=${t.y} (línea inferior ${abajo})`);
    });
    // cada texto parte de la nota a la que se refiere: «Andante con moto» y «dolce», de la 1.ª; «espressivo», de la 5.ª; «poco rit.», de la 7.ª
    const nota = { tempo: 0, dolce: 0, espressivo: 4, rit: 6 };
    textos.forEach((t, i) => { const k = nota[TEXTOS[i].id], c = cabezas[k]; if (c && Math.abs(t.x - c.x) > 1500) err.push(`«${t.texto}» empieza en x=${t.x} y la nota ${k + 1} está en x=${c.x}`); });
  }
  // 3. alt
  for (const q of quieren) if (!alt.includes(`«${q}»`)) err.push(`el alt no nombra «${q}»`);
  if (!/encima/.test(alt) || !/debajo/.test(alt)) err.push('el alt no dice dónde van (encima / debajo)');
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (nombre, sab) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('expresion-' + nombre), spacingLinear: 0.5 }));
    const mei = construye(sab);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
    return { mei, svg: tk.renderToSVG(1) };
  };
  if (sabotaje) {
    const pruebas = [
      ['«dolce» escrito encima en lugar de debajo', { textos: TEXTOS.map((t) => (t.id === 'dolce' ? Object.assign({}, t, { lugar: 'above' }) : t)) }],
      ['«espresivo» con una sola s', { textos: TEXTOS.map((t) => (t.id === 'espressivo' ? Object.assign({}, t, { texto: 'espresivo' }) : t)) }],
      ['«poco rit.» en el primer compás', { textos: TEXTOS.map((t) => (t.id === 'rit' ? Object.assign({}, t, { compas: 1, tiempo: 4 }) : t)) }],
      ['una nota cambiada', { notas: NOTAS.map((k, i) => (i === 3 ? 'a/4' : k)) }],
    ];
    let mal = 0;
    for (const [desc, sab] of pruebas) {
      const { mei, svg } = dibuja('sab', sab);
      const e = verificar(mei, svg, ALT);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    const { mei, svg } = dibuja('sab2', {});
    const e = verificar(mei, svg, ALT.replace('«dolce»', '«dulce»'));
    console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: el alt nombra «dulce» en vez de «dolce»${e.length ? ' → ' + e[0] : ''}`);
    if (!e.length) mal++;
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }
  const { mei, svg } = dibuja('principal', {});
  const err = verificar(mei, svg, ALT);
  if (err.length) { console.log('  ✗ ' + err.join('; ')); process.exit(1); }
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  const listo = preparar(svg, ALT);
  fs.writeFileSync(path.join(RAIZ, SALIDA, 'indicaciones.svg'), listo.svg);
  console.log(`  ✓ indicaciones  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB`);
})().catch((e) => { console.error(e); process.exit(1); });
