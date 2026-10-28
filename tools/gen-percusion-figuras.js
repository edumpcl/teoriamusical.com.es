'use strict';
/**
 * Figuras de /diccionario-musical/instrumentos-de-percusion-no-afinada/ dibujadas con Verovio (SVG):
 *   1. «una-linea»: un ritmo de caja escrito en un pentagrama de UNA línea con clave de percusión;
 *   2. «bateria»: un compás de 4/4 de batería en el pentagrama de cinco líneas con clave de percusión: charles (cabeza en aspa, sobre
 *      el pentagrama, plica arriba), bombo (espacio inferior, plica abajo) y caja (tercer espacio, plica abajo).
 *
 *   node tools/gen-percusion-figuras.js              # genera y verifica
 *   node tools/gen-percusion-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN (vías que no salen del mismo sitio):
 *   1. el MEI releído: nº de notas, duración y posición (loc) de cada una, y la cabeza (aspa o normal);
 *   2. el dibujo: las líneas del pentagrama (1 o 5), la clave de percusión (glifo E069), el compás 4/4 donde toca, y cada cabeza
 *      en la altura que le corresponde a su loc (calculada desde la línea inferior que se mide en el SVG), con el glifo de aspa
 *      (E0A9) o de negra (E0A4) que tocan y en el orden de lectura (izquierda a derecha);
 *   3. el texto alternativo nombra lo que se ve.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar } = G;

const SALIDA = 'assets/img/notacion/percusion';
const MEDIO = 90;   // media separación de línea en las unidades internas del SVG (ESPACIO / 2)

// loc: 0 = línea inferior; 1 = primer espacio; 2 = segunda línea… (cada unidad es media separación)
const FIGURAS = {
  'una-linea': {
    lineas: 1, compas: false,
    alt: 'Un ritmo de caja escrito en un pentagrama de una sola línea con clave de percusión: una negra, dos corcheas, una negra y otra negra. Se lee solo el ritmo, porque la línea no representa una nota sino el instrumento.',
    // cada evento: [dur, loc, cabeza]
    capas: [[['4', 0, 'n'], ['8', 0, 'n'], ['8', 0, 'n'], ['4', 0, 'n'], ['4', 0, 'n']]],
  },
  'bateria': {
    lineas: 5, compas: true,
    alt: 'Un compás de 4/4 de batería en un pentagrama de cinco líneas con clave de percusión. Arriba, con cabeza en aspa y la plica hacia arriba, ocho corcheas del charles; abajo, con la plica hacia abajo, el bombo en el espacio inferior en el primer y el tercer tiempo, y la caja en el tercer espacio en el segundo y el cuarto tiempo.',
    capas: [
      [['8', 9, 'x'], ['8', 9, 'x'], ['8', 9, 'x'], ['8', 9, 'x'], ['8', 9, 'x'], ['8', 9, 'x'], ['8', 9, 'x'], ['8', 9, 'x']],
      [['4', 1, 'n'], ['4', 5, 'n'], ['4', 1, 'n'], ['4', 5, 'n']],
    ],
  },
};

function construye(id, sab = {}) {
  const f = Object.assign({}, FIGURAS[id], sab);
  const lay = f.capas.map((capa, c) => {
    const notas = capa.map(([dur, loc, cab], i) =>
      `<note xml:id="${id}-${c}-${i}" dur="${dur}" loc="${loc}"${cab === 'x' ? ' head.shape="x"' : ''}${f.capas.length > 1 ? ` stem.dir="${c === 0 ? 'up' : 'down'}"` : ''}/>`);
    // las corcheas del charles van unidas de cuatro en cuatro
    const cuerpo = capa[0][0] === '8' ? [0, 4].map((a) => `<beam>${notas.slice(a, a + 4).join('')}</beam>`).join('')
      : (id === 'una-linea' ? `${notas[0]}<beam>${notas[1]}${notas[2]}</beam>${notas.slice(3).join('')}` : notas.join(''));
    return `<layer n="${c + 1}">${cuerpo}</layer>`;
  }).join('');
  const meter = f.compas ? ' meter.count="4" meter.unit="4"' : '';
  return `<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef${meter}><staffGrp><staffDef n="1" lines="${f.lineas}" clef.shape="perc"/></staffGrp></scoreDef><section><measure n="1"><staff n="1">${lay}</staff></measure></section></score></mdiv></body></music></mei>`;
}

function verificar(id, mei, svg, alt, ref = FIGURAS[id]) {
  const err = [];
  // 1. MEI
  const leidas = [...mei.matchAll(/<layer n="(\d)">([\s\S]*?)<\/layer>/g)].map((l) =>
    [...l[2].matchAll(/<note [^>]*dur="(\d+)" loc="(\d+)"( head\.shape="x")?/g)].map((m) => [m[1], Number(m[2]), m[3] ? 'x' : 'n']));
  if (JSON.stringify(leidas) !== JSON.stringify(ref.capas)) err.push(`el MEI escribe ${JSON.stringify(leidas)} y tenía que ser ${JSON.stringify(ref.capas)}`);
  // 2. dibujo
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== ref.lineas) err.push(`${lineas.length} líneas de pentagrama y tenían que ser ${ref.lineas}`);
  if (!/href="#E069-/.test(svg)) err.push('falta la clave de percusión');
  if (/href="#E050-|href="#E062-/.test(svg)) err.push('hay una clave de sol o de fa');
  const cuatros = (svg.match(/href="#E084-/g) || []).length;
  if (ref.compas ? cuatros < 2 : cuatros !== 0) err.push(`hay ${cuatros} cuatros en el compás y ${ref.compas ? 'debía ir 4/4' : 'no debía haber compás'}`);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  const quieren = ref.capas.flat();
  if (cabezas.length !== quieren.length) { err.push(`${cabezas.length} cabezas y tenían que ser ${quieren.length}`); return err; }
  const base = lineas[0] !== undefined ? Math.max(...lineas) : 0;   // la línea inferior es la de mayor y
  // orden de lectura: por x y, a igual x, por altura (arriba antes)
  const porLectura = quieren.map((q, i) => ({ q, i })).sort((a, b) => 0);
  const esperadas = [];
  ref.capas.forEach((capa, c) => {
    let t = 0;
    capa.forEach(([dur, loc, cab]) => { esperadas.push({ t, loc, cab }); t += 1 / Number(dur); });
  });
  esperadas.sort((a, b) => a.t - b.t || b.loc - a.loc);
  const dibujadas = cabezas.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  dibujadas.forEach((c, k) => {
    const e = esperadas[k];
    const locDib = Math.round((base - c.y) / MEDIO);
    if (locDib !== e.loc) err.push(`la cabeza ${k + 1} está en loc ${locDib} y se pedía ${e.loc}`);
    const g = e.cab === 'x' ? 'E0A9' : 'E0A4';
    if (c.g !== g) err.push(`la cabeza ${k + 1} es ${c.g} y tenía que ser ${g}`);
  });
  void porLectura;
  // 3. alt
  const palabras = id === 'bateria' ? ['charles', 'bombo', 'caja', 'cinco líneas', 'clave de percusión'] : ['una sola línea', 'clave de percusión', 'caja'];
  for (const p of palabras) if (!alt.includes(p)) err.push(`el alt no dice «${p}»`);
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (id, sab) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('percusion-' + id), spacingLinear: 0.5 }));
    const mei = construye(id, sab);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
    return { mei, svg: tk.renderToSVG(1) };
  };
  if (sabotaje) {
    const B = FIGURAS.bateria;
    const pruebas = [
      ['la caja en el espacio de abajo (loc 1 en vez de 5)', 'bateria', { capas: [B.capas[0], [['4', 1, 'n'], ['4', 1, 'n'], ['4', 1, 'n'], ['4', 5, 'n']]] }],
      ['un charles con cabeza normal en vez de aspa', 'bateria', { capas: [[['8', 9, 'n'], ...B.capas[0].slice(1)], B.capas[1]] }],
      ['faltan dos corcheas del charles', 'bateria', { capas: [B.capas[0].slice(0, 6), B.capas[1]] }],
      ['el bombo en el segundo tiempo', 'bateria', { capas: [B.capas[0], [['4', 5, 'n'], ['4', 1, 'n'], ['4', 1, 'n'], ['4', 5, 'n']]] }],
      ['una nota de más en el ritmo de la caja', 'una-linea', { capas: [[['4', 0, 'n'], ['8', 0, 'n'], ['8', 0, 'n'], ['4', 0, 'n'], ['4', 0, 'n'], ['4', 0, 'n']]] }],
    ];
    let mal = 0;
    for (const [desc, id, sab] of pruebas) {
      const { mei, svg } = dibuja(id, sab);
      const e = verificar(id, mei, svg, FIGURAS[id].alt);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0].slice(0, 90) : ''}`);
      if (!e.length) mal++;
      // el MEI limpio con el DIBUJO saboteado: tiene que saltar la vía del dibujo, que no mira el MEI
      const e2 = verificar(id, construye(id, {}), svg, FIGURAS[id].alt);
      console.log(`      ${e2.length ? '✓' : '✗ NO SE DETECTA'} por el dibujo${e2.length ? ' → ' + e2[0].slice(0, 90) : ''}`);
      if (!e2.length) mal++;
    }
    { const { mei, svg } = dibuja('bateria', {}); const e = verificar('bateria', mei, svg, FIGURAS.bateria.alt.replace('charles', 'plato'));
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: el alt no nombra el charles${e.length ? ' → ' + e[0] : ''}`); if (!e.length) mal++; }
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  for (const id of Object.keys(FIGURAS)) {
    const { mei, svg } = dibuja(id, {});
    const err = verificar(id, mei, svg, FIGURAS[id].alt);
    if (err.length) { console.log(`  ✗ ${id}: ${err.join('; ')}`); process.exit(1); }
    const listo = preparar(svg, FIGURAS[id].alt);
    fs.writeFileSync(path.join(RAIZ, SALIDA, id + '.svg'), listo.svg);
    console.log(`  ✓ ${id}  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB`);
  }
})().catch((e) => { console.error(e); process.exit(1); });
