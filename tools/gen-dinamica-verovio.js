'use strict';
/**
 * Figuras de la página /diccionario-musical/dinamica-musical/ dibujadas con Verovio (SVG):
 *   grados      los ocho matices, de ppp a fff, bajo ocho negras
 *   reguladores crescendo (p → f) y diminuendo (f → p) con su regulador
 *   subitos     sfz, fp y rf sobre sus notas
 *
 *   node tools/gen-dinamica-verovio.js              # genera y verifica
 *   node tools/gen-dinamica-verovio.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * Los matices los dibuja Verovio con los glifos SMuFL de la fuente musical (no son texto con fuente). Se comprueba:
 *   1. el MEI releído por un intérprete aparte (matices en orden, reguladores y su forma, notas);
 *   2. que el orden de los ocho grados es el MISMO que el de los ejercicios (assets/js/dinamica-ejercicios.js);
 *   3. el dibujo: un glifo por matiz y el glifo correcto (SMuFL), cada regulador con el vértice del lado que toca
 *      (se abre = crescendo, se cierra = diminuendo) y colocado bajo el pentagrama, y las notas sobre sus líneas;
 *   4. que el texto alternativo nombra lo mismo que el dibujo.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, escAttr } = G;

const SALIDA = 'assets/img/notacion/dinamica';
/* Glifos SMuFL de cada matiz (Verovio los pinta con estos símbolos). p, f y m son los básicos; el resto, compuestos. */
const GLIFO = { ppp: 'E52A', pp: 'E52B', p: 'E520', mp: 'E52C', mf: 'E52D', f: 'E522', ff: 'E52F', fff: 'E530', fp: 'E534', sfz: 'E539', rf: 'E53C' };

const nota = (id, dur) => `<note xml:id="${id}" pname="g" oct="4" dur="${dur}"/>`;
const cuatroNegras = (m) => [0, 1, 2, 3].map((i) => nota(`m${m}n${i}`, 4)).join('');

/* Cada figura: compases (en MEI ya hecho) y lo que tiene que haber (para verificar). */
function figura(nombre) {
  if (nombre === 'grados') {
    const gr = [['ppp', 'pp', 'p', 'mp'], ['mf', 'f', 'ff', 'fff']];
    return {
      nombre, compas: [4, 4], separacion: 0.5, alt: 'Los ocho matices de intensidad escritos bajo ocho negras: ppp, pp, p, mp, mf, f, ff y fff, de lo más suave a lo más fuerte.',
      medidas: gr.map((fila, i) => `<measure n="${i + 1}"${i === 1 ? ' right="invis"' : ''}><staff n="1"><layer n="1">${cuatroNegras(i + 1)}</layer></staff>`
        + fila.map((t, k) => `<dynam tstamp="${k + 1}" staff="1" place="below">${t}</dynam>`).join('') + '</measure>').join(''),
      esperado: { dinamicas: gr.flat(), reguladores: [], notas: 8 },
    };
  }
  if (nombre === 'reguladores') {
    return {
      nombre, compas: [4, 4], separacion: 0.5, alt: 'Crescendo y diminuendo: en el primer compás, de p a f con un regulador que se abre; en el segundo, de f a p con un regulador que se cierra.',
      medidas: `<measure n="1"><staff n="1"><layer n="1">${cuatroNegras(1)}</layer></staff><dynam tstamp="1" staff="1" place="below" vgrp="1">p</dynam><hairpin form="cres" startid="#m1n1" endid="#m1n2" staff="1" place="below" vgrp="1"/><dynam tstamp="4" staff="1" place="below" vgrp="1">f</dynam></measure>`
        + `<measure n="2" right="invis"><staff n="1"><layer n="1">${cuatroNegras(2)}</layer></staff><dynam tstamp="1" staff="1" place="below" vgrp="2">f</dynam><hairpin form="dim" startid="#m2n1" endid="#m2n2" staff="1" place="below" vgrp="2"/><dynam tstamp="4" staff="1" place="below" vgrp="2">p</dynam></measure>`,
      esperado: { dinamicas: ['p', 'f', 'f', 'p'], reguladores: ['cres', 'dim'], notas: 8 },
    };
  }
  if (nombre === 'subitos') {
    return {
      nombre, compas: [2, 4], separacion: 0.35, alt: 'Tres ejemplos de cambio súbito: sfz sobre una negra, fp sobre una blanca y rf sobre una negra.',
      medidas: `<measure n="1"><staff n="1"><layer n="1">${nota('m1n0', 4)}${nota('m1n1', 4)}</layer></staff><dynam tstamp="1" staff="1" place="below">sfz</dynam></measure>`
        + `<measure n="2"><staff n="1"><layer n="1">${nota('m2n0', 2)}</layer></staff><dynam tstamp="1" staff="1" place="below">fp</dynam></measure>`
        + `<measure n="3" right="invis"><staff n="1"><layer n="1">${nota('m3n0', 4)}${nota('m3n1', 4)}</layer></staff><dynam tstamp="1" staff="1" place="below">rf</dynam></measure>`,
      esperado: { dinamicas: ['sfz', 'fp', 'rf'], reguladores: [], notas: 5 },
    };
  }
  throw new Error('figura desconocida: ' + nombre);
}

function aMEI(f) {
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="G" clef.line="2" meter.count="${f.compas[0]}" meter.unit="${f.compas[1]}"/></staffGrp></scoreDef><section>${f.medidas}</section></score></mdiv></body></music></mei>`;
}

/** Lo que dice el MEI, leído aparte: matices en orden, forma de los reguladores y número de notas. */
function leerMEI(mei) {
  return {
    dinamicas: [...mei.matchAll(/<dynam [^>]*>([^<]*)<\/dynam>/g)].map((m) => m[1]),
    reguladores: [...mei.matchAll(/<hairpin [^>]*form="(\w+)"/g)].map((m) => m[1]),
    notas: (mei.match(/<note /g) || []).length,
  };
}

/** Orden de los grados que usan los ejercicios (otra fuente distinta del dato de esta figura). */
function gradosDeLosEjercicios() {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/dinamica-ejercicios.js'), 'utf8');
  const bloque = src.slice(src.indexOf('var GRADOS = ['), src.indexOf('];', src.indexOf('var GRADOS = [')));
  return [...bloque.matchAll(/s: '([a-z]+)'/g)].map((m) => m[1]);
}

function verificar(f, mei, svg, esp) {
  const err = [];
  const leido = leerMEI(mei);
  if (JSON.stringify(leido.dinamicas) !== JSON.stringify(esp.dinamicas)) err.push(`el MEI escribe los matices ${leido.dinamicas.join(' ')} y tenian que ser ${esp.dinamicas.join(' ')}`);
  if (JSON.stringify(leido.reguladores) !== JSON.stringify(esp.reguladores)) err.push(`reguladores ${leido.reguladores.join(',') || 'ninguno'} en el MEI y tenian que ser ${esp.reguladores.join(',') || 'ninguno'}`);
  if (leido.notas !== esp.notas) err.push(`${leido.notas} notas en el MEI y tenian que ser ${esp.notas}`);
  if (f.nombre === 'grados' && JSON.stringify(esp.dinamicas) !== JSON.stringify(gradosDeLosEjercicios())) err.push('el orden de los grados no es el de los ejercicios');

  // el dibujo: un glifo por matiz y el glifo SMuFL que toca
  const glifos = [...svg.matchAll(/<g id="[^"]*" class="dynam">\s*<use [^>]*href="#(E[0-9A-F]+)-/g)].map((m) => m[1]);
  if (glifos.length !== esp.dinamicas.length) err.push(`${glifos.length} matices dibujados y se esperaban ${esp.dinamicas.length}`);
  esp.dinamicas.forEach((t, i) => { if (glifos[i] !== GLIFO[t]) err.push(`el matiz ${i + 1} (${t}) se ha dibujado con ${glifos[i]} y le toca ${GLIFO[t]}`); });
  if (new Set(esp.dinamicas.map((t) => GLIFO[t])).size !== new Set(esp.dinamicas).size) err.push('dos matices distintos comparten glifo');

  // lineas del pentagrama y notas: Sol4 = 2.ª linea (clave de sol) -> y de la 4.ª linea contando desde arriba
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== 5) err.push(`${lineas.length} lineas de pentagrama`);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => Number(m[2]));
  if (cabezas.length !== esp.notas) err.push(`${cabezas.length} cabezas y se esperaban ${esp.notas}`);
  if (lineas.length === 5) cabezas.forEach((y, i) => { if (y !== lineas[3]) err.push(`la nota ${i + 1} no está en la 2.ª línea (Sol): y=${y}, línea=${lineas[3]}`); });
  // los matices van debajo del pentagrama
  [...svg.matchAll(/<g id="[^"]*" class="dynam">\s*<use [^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].forEach((m, i) => { if (lineas.length === 5 && Number(m[2]) < lineas[4]) err.push(`el matiz ${i + 1} no está bajo el pentagrama`); });

  // reguladores: vértice a la izquierda si se abre (crescendo) y a la derecha si se cierra (diminuendo)
  const rg = [...svg.matchAll(/<g id="[^"]*" class="hairpin">\s*<polyline [^>]*points="(\d+),(\d+) (\d+),(\d+) (\d+),(\d+) ?"/g)].map((m) => m.slice(1).map(Number));
  if (rg.length !== esp.reguladores.length) err.push(`${rg.length} reguladores dibujados y se esperaban ${esp.reguladores.length}`);
  rg.forEach((p, i) => {
    const [x1, , xv, , x3] = p;
    const forma = xv < x1 && xv < x3 ? 'cres' : xv > x1 && xv > x3 ? 'dim' : '?';
    if (forma !== esp.reguladores[i]) err.push(`el regulador ${i + 1} es «${forma}» en el dibujo y tenia que ser «${esp.reguladores[i]}»`);
    if (lineas.length === 5 && Math.min(p[1], p[3], p[5]) < lineas[4]) err.push(`el regulador ${i + 1} no está bajo el pentagrama`);
  });

  // el texto alternativo nombra los mismos matices (en orden) y las mismas formas
  const enAlt = [...f.alt.matchAll(/\b(ppp|pp|mp|mf|fff|ff|fp|sfz|rf|p|f)\b/g)].map((m) => m[1]);
  const base = f.nombre === 'grados' ? esp.dinamicas : f.nombre === 'reguladores' ? ['p', 'f', 'f', 'p'] : esp.dinamicas;
  if (JSON.stringify(enAlt) !== JSON.stringify(base)) err.push(`el alt nombra ${enAlt.join(' ')} y el dibujo lleva ${base.join(' ')}`);
  if (f.nombre === 'reguladores' && !(/crescendo/i.test(f.alt) && /diminuendo/i.test(f.alt))) err.push('el alt no nombra crescendo y diminuendo');
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (f) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('dinamica-' + f.nombre), spacingLinear: f.separacion || 0.25 }));
    const mei = aMEI(f);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI de ' + f.nombre);
    return { mei, svg: tk.renderToSVG(1) };
  };

  if (sabotaje) {
    // cada manipulación tiene que producir al menos un error
    const pruebas = [
      ['dos matices intercambiados en el MEI', (f) => ({ ...f, medidas: f.medidas.replace('>mp<', '>@@<').replace('>mf<', '>mp<').replace('>@@<', '>mf<') }), 'grados'],
      ['un crescendo convertido en diminuendo', (f) => ({ ...f, medidas: f.medidas.replace('form="cres"', 'form="dim"') }), 'reguladores'],
      ['falta un matiz', (f) => ({ ...f, medidas: f.medidas.replace(/<dynam tstamp="4"[^>]*>f<\/dynam>/, '') }), 'reguladores'],
      ['una nota en otra altura', (f) => ({ ...f, medidas: f.medidas.replace('xml:id="m1n2" pname="g"', 'xml:id="m1n2" pname="a"') }), 'grados'],
      ['el alt dice otro matiz', (f) => ({ ...f, alt: f.alt.replace('mp, mf', 'mf, mp') }), 'grados'],
    ];
    let mal = 0;
    for (const [nombre, manipular, fig] of pruebas) {
      const orig = figura(fig);
      const f = manipular(orig);
      const { mei, svg } = dibuja(f);
      const errores = verificar(f, mei, svg, orig.esperado);
      console.log(`  ${errores.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${nombre}${errores.length ? ' → ' + errores[0] : ''}`);
      if (!errores.length) mal++;
    }
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }

  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  let fallos = 0;
  for (const nombre of ['grados', 'reguladores', 'subitos']) {
    const f = figura(nombre);
    const { mei, svg } = dibuja(f);
    const errores = verificar(f, mei, svg, f.esperado);
    if (errores.length) { fallos++; console.log(`  ✗ ${nombre}: ${errores.join('; ')}`); continue; }
    const listo = preparar(svg, f.alt);
    fs.writeFileSync(path.join(RAIZ, SALIDA, nombre + '.svg'), listo.svg);
    console.log(`  ✓ ${nombre}  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB · ${f.esperado.dinamicas.length} matices${f.esperado.reguladores.length ? ' · ' + f.esperado.reguladores.length + ' reguladores' : ''}`);
  }
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
