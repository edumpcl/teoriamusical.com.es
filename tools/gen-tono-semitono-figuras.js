'use strict';
/**
 * Figuras de /diccionario-musical/intervalos/tono-y-semitono/ dibujadas con Verovio (SVG):
 *   tono       Do–Re  (2 semitonos)
 *   semitono   Mi–Fa  (1 semitono)
 *
 *   node tools/gen-tono-semitono-figuras.js              # genera y verifica
 *   node tools/gen-tono-semitono-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN (cada figura, por vías que no salen del mismo sitio):
 *   1. el MEI releído: las dos notas pedidas, en orden;
 *   2. la DISTANCIA en semitonos se calcula desde las notas (clase de altura + octava) y tiene que ser la que dice la figura:
 *      2 = tono, 1 = semitono (y el nombre de la figura, y su texto alternativo, dicen lo mismo);
 *   3. el dibujo: dos cabezas de blanca sobre su línea o espacio, la segunda UNA posición del pentagrama más arriba
 *      (Do→Re y Mi→Fa son segundas) y el pentagrama con 5 líneas y clave de sol.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const M = require('../assets/js/tm-mei.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = 'assets/img/notacion/tono-semitono';
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const midi = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return PC[m[1]] + (Number(m[2]) + 1) * 12; };
const paso = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return Number(m[2]) * 7 + LETRAS.indexOf(m[1]); };
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };

const FIGURAS = {
  tono: { notas: ['c/4', 'd/4'], semitonos: 2, clase: 'tono', alt: 'Do y Re en el pentagrama: de Do a Re hay un tono, dos semitonos (Do♯ queda en medio).' },
  semitono: { notas: ['e/4', 'f/4'], semitonos: 1, clase: 'semitono', alt: 'Mi y Fa en el pentagrama: de Mi a Fa hay un semitono, sin ninguna nota en medio.' },
};

const aFila = (notas) => ({ compases: [notas.map((key) => ({ key, d: 'h' }))], sinBarraFinal: true });

function verificar(nombre, f, notas, mei, svg, alt) {
  const err = [];
  const leidas = [...mei.matchAll(/<note [^>]*pname="(\w)" oct="(\d)"/g)].map((m) => m[1] + '/' + m[2]);
  if (JSON.stringify(leidas) !== JSON.stringify(f.notas)) err.push(`el MEI escribe ${leidas.join(' ')} y tenía que ser ${f.notas.join(' ')}`);
  const dist = Math.abs(midi(notas[1]) - midi(notas[0]));
  if (dist !== f.semitonos) err.push(`las notas ${notas.join('–')} están a ${dist} semitonos y la figura «${nombre}» dice ${f.semitonos}`);
  const clase = dist === 1 ? 'semitono' : dist === 2 ? 'tono' : '?';
  if (clase !== f.clase) err.push(`la distancia (${dist}) es un ${clase} y la figura se llama ${f.clase}`);
  // el alt nombra las dos notas y la clase correcta
  const nombres = [...alt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]).slice(0, 2);
  const quiere = notas.map((k) => NOMBRE[k[0]]);
  if (nombres.join(' ') !== quiere.join(' ')) err.push(`el alt nombra ${nombres.join(' ')} y la figura lleva ${quiere.join(' ')}`);
  if (!new RegExp('hay un ' + f.clase).test(alt)) err.push(`el alt no dice «hay un ${f.clase}»`);
  if (f.clase === 'tono' && !/dos semitonos/.test(alt)) err.push('el alt de un tono no dice «dos semitonos»');
  // el dibujo
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], y: Number(m[3]) }));
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  if (!/href="#E050-/.test(svg)) err.push('falta la clave de sol');
  if (cabezas.length !== 2) err.push(`${cabezas.length} cabezas y tenían que ser 2`);
  else {
    if (!cabezas.every((c) => c.g === 'E0A3')) err.push('las cabezas no son de blanca');
    if (lineas.length === 5) {
      const BASE = 4 * 7 + 2;   // línea inferior de la clave de sol = Mi4
      cabezas.forEach((c, i) => { const p = BASE + (lineas[4] - c.y) / (ESPACIO / 2); if (p !== paso(notas[i])) err.push(`la nota ${i + 1} está en el paso ${p} y se pedía ${paso(notas[i])}`); });
    }
    const subida = (cabezas[0].y - cabezas[1].y) / (ESPACIO / 2);
    if (subida !== paso(notas[1]) - paso(notas[0])) err.push(`la segunda nota sube ${subida} posiciones y por los nombres debería subir ${paso(notas[1]) - paso(notas[0])}`);
  }
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (nombre, notas) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('tono-semitono-' + nombre), spacingLinear: 0.45 }));
    const mei = M.aMEI(aFila(notas));
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI de ' + nombre);
    return { mei, svg: tk.renderToSVG(1) };
  };

  if (sabotaje) {
    const pruebas = [
      ['Mi–Fa♯ dibujado en vez de Mi–Fa (dos notas distintas)', 'semitono', ['e/4', 'g/4']],
      ['Do–Re llamado «semitono»', 'tono', ['c/4', 'c/4']],
      ['las notas en otro orden', 'semitono', ['f/4', 'e/4']],
      ['nota en otra octava', 'tono', ['c/4', 'd/5']],
    ];
    let mal = 0;
    for (const [desc, nombre, notas] of pruebas) {
      const f = FIGURAS[nombre];
      const { mei, svg } = dibuja(nombre + '-sab', notas);
      const e = verificar(nombre, f, notas, mei, svg, f.alt);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    // el alt que cambia de clase
    const f = FIGURAS.tono, { mei, svg } = dibuja('tono', f.notas);
    const e = verificar('tono', f, f.notas, mei, svg, f.alt.replace('hay un tono, dos semitonos', 'hay un semitono'));
    console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: el alt dice «semitono» en la figura del tono${e.length ? ' → ' + e[0] : ''}`);
    if (!e.length) mal++;
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }

  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  let fallos = 0;
  for (const [nombre, f] of Object.entries(FIGURAS)) {
    const { mei, svg } = dibuja(nombre, f.notas);
    const err = verificar(nombre, f, f.notas, mei, svg, f.alt);
    if (err.length) { fallos++; console.log(`  ✗ ${nombre}: ${err.join('; ')}`); continue; }
    const listo = preparar(svg, f.alt);
    fs.writeFileSync(path.join(RAIZ, SALIDA, nombre + '.svg'), listo.svg);
    console.log(`  ✓ ${nombre}  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB · ${f.notas.join('–')} = ${f.semitonos} semitono(s)`);
  }
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
