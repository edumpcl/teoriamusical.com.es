'use strict';
/**
 * Figuras de /diccionario-musical/glissando/ dibujadas con Verovio (SVG): dos notas unidas por la línea del glissando
 * y la indicación «gliss.».
 *
 *   node tools/gen-glissando-figuras.js              # genera y verifica
 *   node tools/gen-glissando-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * FIGURAS: ascendente (Do4 → Do5), descendente (Sol4 → Do4) y «piano»: el mismo glissando de piano ESCRITO (dos Do unidos por la línea)
 * junto a lo que SUENA sobre las teclas blancas (la escala de Do mayor en corcheas), para ver de un vistazo qué es un glissando escalonado.
 *
 * VERIFICACIÓN (cada figura, por vías que no salen del mismo sitio):
 *   1. el MEI releído: las dos notas pedidas, en orden, y el elemento gliss que va de la primera a la segunda;
 *   2. el dibujo: pentagrama de 5 líneas con clave de sol, dos cabezas de blanca en el paso del pentagrama que toca por su nombre
 *      (se calcula a mano desde la letra y la octava), y la línea del glissando que SALE de la primera cabeza y LLEGA a la segunda
 *      (sus extremos, a una distancia de las cabezas menor que una cabeza), subiendo (la y baja) si la figura sube y al revés;
 *   3. el texto «gliss.» dibujado, el texto alternativo que nombra las dos notas y la dirección correcta.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const M = require('../assets/js/tm-mei.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = 'assets/img/notacion/glissando';
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const paso = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return Number(m[2]) * 7 + LETRAS.indexOf(m[1]); };
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };

const FIGURAS = {
  ascendente: { notas: ['c/4', 'c/5'], sube: true, alt: 'Glissando ascendente: una línea recta une un Do grave con el Do una octava más aguda, con la indicación gliss.' },
  descendente: { notas: ['g/4', 'c/4'], sube: false, alt: 'Glissando descendente: una línea recta baja del Sol al Do grave, con la indicación gliss.' },
};

const aMEI = (notas) => {
  let mei = M.aMEI({ compases: [notas.map((key) => ({ key, d: 'h' }))], sinBarraFinal: true });
  const ids = [...mei.matchAll(/<note xml:id="(\w+)"/g)].map((m) => m[1]);
  mei = mei.replace('</staff></measure>', `</staff><gliss xml:id="gl0" staff="1" startid="#${ids[0]}" endid="#${ids[1]}" lform="solid"/><dir xml:id="dr0" staff="1" startid="#${ids[0]}" place="above" fontstyle="italic">gliss.</dir></measure>`);
  return { mei, ids };
};

/* Figura «piano»: compás 1 = glissando escrito (2 blancas Do4 y Do5 con la línea); compás 2 = las 8 notas de la escala de Do mayor en corcheas. */
const ESCALA = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
const ALT_PIANO = 'Un glissando de piano escrito y lo que suena: a la izquierda, dos Do unidos por una línea con la indicación gliss.; a la derecha, las notas que se oyen sobre las teclas blancas: Do, Re, Mi, Fa, Sol, La, Si, Do.';
function aMEIPiano(escala) {
  let mei = M.aMEI({ compases: [[{ key: 'c/4', d: 'h' }, { key: 'c/5', d: 'h' }], escala.map((key) => ({ key, d: '8' }))], sinBarraFinal: false });
  const ids = [...mei.matchAll(/<note xml:id="(\w+)"/g)].map((m) => m[1]);
  mei = mei.replace('</staff></measure><measure n="2">', `</staff><gliss xml:id="gl0" staff="1" startid="#${ids[0]}" endid="#${ids[1]}" lform="solid"/><dir xml:id="dr0" staff="1" startid="#${ids[0]}" place="above" fontstyle="italic">gliss.</dir></measure><measure n="2">`);
  mei = mei.replace(/(<measure n="2"><staff n="1"><layer n="1">)((?:<note [^>]*><\/note>){8})/, '$1<beam>$2</beam>');
  return { mei, ids };
}
function verificarPiano(escala, mei, ids, svg, alt) {
  const err = [];
  const leidas = [...mei.matchAll(/<note [^>]*pname="(\w)" oct="(\d)" dur="(\w+)"/g)].map((m) => m[1] + '/' + m[2] + ':' + m[3]);
  const esperadas = ['c/4:2', 'c/5:2', ...ESCALA.map((k) => k + ':8')];
  if (JSON.stringify(leidas) !== JSON.stringify(esperadas)) err.push(`el MEI escribe ${leidas.join(' ')} y tenía que ser ${esperadas.join(' ')}`);
  const pcs = escala.map((k) => PC[k[0]]);
  if (JSON.stringify(pcs.slice(0, 7)) !== JSON.stringify([0, 2, 4, 5, 7, 9, 11]) || pcs[7] !== 0 || paso(escala[7]) - paso(escala[0]) !== 7) err.push('las 8 notas no son la escala de Do mayor de Do a Do');
  const g = /<gliss [^>]*startid="#(\w+)" endid="#(\w+)"/.exec(mei);
  if (!g || g[1] !== ids[0] || g[2] !== ids[1]) err.push('el glissando del MEI no va de la primera nota a la segunda');
  if ((mei.match(/<gliss /g) || []).length !== 1) err.push('debería haber un solo glissando');
  if (!/<beam>/.test(mei)) err.push('las corcheas no van unidas por una barra');
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  if (cabezas.length !== 10) err.push(`${cabezas.length} cabezas y tenían que ser 10`);
  else if (lineas.length === 5) {
    const BASE = 4 * 7 + 2;
    const claves = ['c/4', 'c/5', ...escala];
    cabezas.forEach((c, i) => { const p = BASE + (lineas[4] - c.y) / (ESPACIO / 2); if (p !== paso(claves[i])) err.push(`la cabeza ${i + 1} está en el paso ${p} y se pedía ${paso(claves[i])}`); });
    if (!(cabezas[0].g === 'E0A3' && cabezas[1].g === 'E0A3')) err.push('las dos primeras cabezas no son de blanca');
    if (!cabezas.slice(2).every((c) => c.g === 'E0A4')) err.push('las corcheas no tienen cabeza de negra');
    if (!(cabezas[2].x > cabezas[1].x)) err.push('la escala no queda a la derecha del glissando');
    const gl = /<g id="gl0" class="gliss">\s*<path d="M([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+)"/.exec(svg);
    if (!gl) err.push('no se dibuja la línea del glissando');
    else {
      const [x1, y1, x2, y2] = gl.slice(1, 5).map(Number);
      if (Math.hypot(x1 - cabezas[0].x, y1 - cabezas[0].y) > 600 || Math.hypot(x2 - cabezas[1].x, y2 - cabezas[1].y) > 600) err.push('el glissando no une las dos primeras cabezas');
      if (!(y2 < y1)) err.push('el glissando debería subir');
    }
  }
  if (!/class="beam"/.test(svg)) err.push('no se dibuja la barra de corcheas');
  if (!/>gliss\.</.test(svg.replace(/<tspan[^>]*>/g, '>').replace(/<\/tspan>/g, '<'))) err.push('no se dibuja el texto «gliss.»');
  const nombres = [...alt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]);
  const quiere = ['Do', ...ESCALA.map((k) => NOMBRE[k[0]])];   // «dos Do unidos» nombra el Do una vez, y después la escala
  if (JSON.stringify(nombres) !== JSON.stringify(quiere)) err.push(`el alt nombra ${nombres.join(' ')} y la figura lleva ${quiere.join(' ')}`);
  if (!/gliss\./.test(alt)) err.push('el alt no nombra la indicación gliss.');
  return err;
}

function verificar(nombre, f, notas, mei, ids, svg, alt) {
  const err = [];
  // 1. el MEI releído
  const leidas = [...mei.matchAll(/<note [^>]*pname="(\w)" oct="(\d)"/g)].map((m) => m[1] + '/' + m[2]);
  if (JSON.stringify(leidas) !== JSON.stringify(f.notas)) err.push(`el MEI escribe ${leidas.join(' ')} y tenía que ser ${f.notas.join(' ')}`);
  const g = /<gliss [^>]*startid="#(\w+)" endid="#(\w+)"/.exec(mei);
  if (!g || g[1] !== ids[0] || g[2] !== ids[1]) err.push('el glissando del MEI no va de la primera nota a la segunda');
  // 2. el dibujo
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  if (!/href="#E050-/.test(svg)) err.push('falta la clave de sol');
  if (cabezas.length !== 2) err.push(`${cabezas.length} cabezas y tenían que ser 2`);
  else {
    if (!cabezas.every((c) => c.g === 'E0A3')) err.push('las cabezas no son de blanca');
    if (lineas.length === 5) {
      const BASE = 4 * 7 + 2;   // línea inferior de la clave de sol = Mi4
      cabezas.forEach((c, i) => { const p = BASE + (lineas[4] - c.y) / (ESPACIO / 2); if (p !== paso(notas[i])) err.push(`la nota ${i + 1} está en el paso ${p} y se pedía ${paso(notas[i])}`); });
    }
    const gl = /<g id="gl0" class="gliss">\s*<path d="M([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+)"/.exec(svg);
    if (!gl) err.push('no se dibuja la línea del glissando');
    else {
      const [x1, y1, x2, y2] = gl.slice(1, 5).map(Number);
      const cab = 300;   // anchura aproximada de una cabeza de blanca en unidades de Verovio
      const sale = Math.hypot(x1 - cabezas[0].x, y1 - cabezas[0].y), llega = Math.hypot(x2 - cabezas[1].x, y2 - cabezas[1].y);
      if (sale > 2 * cab) err.push(`el glissando sale a ${Math.round(sale)} de la primera cabeza`);
      if (llega > 2 * cab) err.push(`el glissando llega a ${Math.round(llega)} de la segunda cabeza`);
      if (f.sube && !(y2 < y1)) err.push('la figura sube pero la línea baja');
      if (!f.sube && !(y2 > y1)) err.push('la figura baja pero la línea sube');
      if (!(x2 > x1)) err.push('la línea no avanza hacia la derecha');
    }
  }
  // 3. el texto «gliss.» y el alt
  if (!/>gliss\.</.test(svg.replace(/<tspan[^>]*>/g, '>').replace(/<\/tspan>/g, '<'))) err.push('no se dibuja el texto «gliss.»');
  const nombres = [...alt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]);
  const quiere = notas.map((k) => NOMBRE[k[0]]);
  if (JSON.stringify(nombres) !== JSON.stringify(quiere)) err.push(`el alt nombra ${nombres.join(' ')} y la figura lleva ${quiere.join(' ')}`);
  if (!new RegExp(f.sube ? 'ascendente|sube' : 'descendente|baja').test(alt)) err.push('el alt no dice la dirección');
  if (new RegExp(f.sube ? 'descendente|baja' : 'ascendente|sube').test(alt)) err.push('el alt dice la dirección contraria');
  if (!/gliss\./.test(alt)) err.push('el alt no nombra la indicación gliss.');
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (nombre, notas, conGliss = true) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('glissando-' + nombre), spacingLinear: 0.6 }));
    const { mei, ids } = aMEI(notas);
    const mei2 = conGliss ? mei : mei.replace(/<gliss [^>]*\/>/, '');
    if (!tk.loadData(mei2)) throw new Error('Verovio no lee el MEI de ' + nombre);
    return { mei: mei2, ids, svg: tk.renderToSVG(1) };
  };

  if (sabotaje) {
    const pruebas = [
      ['la figura ascendente dibujada hacia abajo', 'ascendente', ['c/5', 'c/4'], null],
      ['una nota en otra octava', 'ascendente', ['c/4', 'c/6'], null],
      ['sin la línea del glissando', 'descendente', ['g/4', 'c/4'], false],
      ['alt con la dirección contraria', 'ascendente', ['c/4', 'c/5'], 'alt'],
    ];
    let mal = 0;
    for (const [desc, nombre, notas, modo] of pruebas) {
      const f = FIGURAS[nombre];
      const { mei, ids, svg } = dibuja(nombre + '-sab', notas, modo !== false);
      const e = verificar(nombre, f, notas, mei, ids, svg, modo === 'alt' ? f.alt.replace('ascendente', 'descendente') : f.alt);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    // figura «piano»
    const sabPiano = [
      ['la escala con un Fa una octava más arriba', ESCALA.map((k) => (k === 'f/4' ? 'f/5' : k))],
      ['la escala sin la octava final', ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'b/4']],
      ['las notas en otro orden', ['c/4', 'e/4', 'd/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5']],
    ];
    for (const [desc, esc] of sabPiano) {
      tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('glissando-piano-sab'), spacingLinear: 0.45 }));
      const { mei, ids } = aMEIPiano(esc);
      tk.loadData(mei);
      const e = verificarPiano(esc, mei, ids, tk.renderToSVG(1), ALT_PIANO);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: piano, ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }

  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  let fallos = 0;
  {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('glissando-piano'), spacingLinear: 0.45 }));
    const { mei, ids } = aMEIPiano(ESCALA);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI de piano');
    const svg = tk.renderToSVG(1);
    const err = verificarPiano(ESCALA, mei, ids, svg, ALT_PIANO);
    if (err.length) { fallos++; console.log(`  ✗ piano: ${err.join('; ')}`); }
    else { const listo = preparar(svg, ALT_PIANO); fs.writeFileSync(path.join(RAIZ, SALIDA, 'piano.svg'), listo.svg); console.log(`  ✓ piano  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB · glissando escrito + escala de Do mayor`); }
  }
  for (const [nombre, f] of Object.entries(FIGURAS)) {
    const { mei, ids, svg } = dibuja(nombre, f.notas);
    const err = verificar(nombre, f, f.notas, mei, ids, svg, f.alt);
    if (err.length) { fallos++; console.log(`  ✗ ${nombre}: ${err.join('; ')}`); continue; }
    const listo = preparar(svg, f.alt);
    fs.writeFileSync(path.join(RAIZ, SALIDA, nombre + '.svg'), listo.svg);
    console.log(`  ✓ ${nombre}  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB · ${f.notas.join(' → ')} · ${f.sube ? 'sube' : 'baja'}`);
  }
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
