'use strict';
/**
 * Figuras de las páginas de efectos de ejecución dibujadas con Verovio (SVG):
 *   arpegiado:  acorde en bloque · acorde arpegiado (línea ondulada, de abajo arriba) · arpegiado descendente (con flecha hacia abajo)
 *   trémolo:    una, dos y tres rayas en la plica (corcheas, semicorcheas, fusas) · trémolo alternado entre dos notas
 *
 *   node tools/gen-efectos-figuras.js              # genera y verifica
 *   node tools/gen-efectos-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN (por vías que no salen del mismo sitio):
 *   1. el MEI releído: las notas pedidas, en orden, y los atributos del efecto (orden y flecha del arpegiado, unitdur de cada trémolo);
 *   2. el dibujo: pentagrama de 5 líneas con clave de sol, las cabezas en el paso del pentagrama que toca por su nombre (se calcula a mano
 *      desde la letra y la octava); en el arpegiado, la línea ondulada está A LA IZQUIERDA del acorde, cubre desde la nota más grave hasta
 *      la más aguda y lleva punta de flecha solo si se pide (hacia arriba o hacia abajo según el orden); en el trémolo, el número de rayas
 *      dibujadas (glifos de 1, 2 y 3 rayas, o los 3 trazos del trémolo alternado) es el que dice la cifra de unitdur;
 *   3. el texto alternativo nombra las notas y el efecto, y no dice lo contrario.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, preparar, ESPACIO } = G;

const SALIDA = 'assets/img/notacion/efectos';
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const paso = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return Number(m[2]) * 7 + LETRAS.indexOf(m[1]); };
const partes = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return { pname: m[1], oct: m[2] }; };

const base = (inner, extra = '') => `<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp><staffDef n="1" lines="5" clef.shape="G" clef.line="2"></staffDef></staffGrp></scoreDef><section><measure n="1" right="invis"><staff n="1"><layer n="1">${inner}</layer></staff>${extra}</measure></section></score></mdiv></body></music></mei>`;
const nota = (id, k, dur) => { const p = partes(k); return `<note xml:id="${id}" pname="${p.pname}" oct="${p.oct}"${dur ? ` dur="${dur}"` : ''}/>`; };

const ACORDE = ['c/4', 'e/4', 'g/4', 'c/5'];
const FIGURAS = {
  'acorde-bloque': { tipo: 'bloque', notas: ACORDE, alt: 'Acorde de Do mayor escrito de la forma habitual: una blanca con cuatro notas, Do, Mi, Sol y Do, que suenan a la vez.' },
  'arpegiado': { tipo: 'arpegiado', notas: ACORDE, orden: 'up', flecha: false, alt: 'Acorde de Do mayor arpegiado (Do, Mi, Sol y Do): el mismo acorde con una línea ondulada vertical delante; las notas se tocan una tras otra, de la más grave a la más aguda.' },
  'arpegiado-descendente': { tipo: 'arpegiado', notas: ACORDE, orden: 'down', flecha: true, alt: 'Acorde de Do mayor (Do, Mi, Sol y Do) arpegiado hacia abajo: la línea ondulada delante del acorde termina en una flecha hacia abajo; las notas se tocan de la más aguda a la más grave.' },
  'tremolo-rayas': { tipo: 'rayas', notas: ['c/5', 'c/5', 'c/5'], unidades: [8, 16, 32], alt: 'Trémolo de una nota con una, dos y tres rayas en la plica de tres blancas Do: la nota se repite en corcheas, en semicorcheas o en fusas.' },
  'tremolo-alternado': { tipo: 'alternado', notas: ['c/4', 'e/4'], unidad: 32, alt: 'Trémolo alternado entre dos notas, Do y Mi, unidas por tres barras: se alternan las dos notas en fusas durante la duración de las dos blancas.' },
};

function construye(f, sab = {}) {
  const notas = sab.notas || f.notas;
  if (f.tipo === 'bloque' || f.tipo === 'arpegiado') {
    const ids = ['a', 'b', 'c', 'd'];
    const ch = `<chord xml:id="c1" dur="2">${notas.map((k, i) => nota(ids[i], k)).join('')}</chord>`;
    const orden = sab.orden || f.orden, flecha = sab.flecha !== undefined ? sab.flecha : f.flecha;
    const extra = f.tipo === 'arpegiado' ? `<arpeg xml:id="ar" staff="1" plist="${ids.map((i) => '#' + i).join(' ')}" order="${orden}"${flecha ? ' arrow="true"' : ''}/>` : '';
    return base(ch, extra);
  }
  if (f.tipo === 'rayas') return base(notas.map((k, i) => `<bTrem xml:id="bt${i}" unitdur="${(sab.unidades || f.unidades)[i]}">${nota('n' + i, k, 2)}</bTrem>`).join(''));
  return base(`<fTrem xml:id="ft" unitdur="${sab.unidad || f.unidad}" beams="3">${nota('n1', notas[0], 2)}${nota('n2', notas[1], 2)}</fTrem>`);
}

function verificar(nombre, f, mei, svg, alt, sab = {}) {
  const err = [];
  // 1. MEI
  const leidas = [...mei.matchAll(/<note [^>]*pname="(\w)" oct="(\d)"/g)].map((m) => m[1] + '/' + m[2]);
  if (JSON.stringify(leidas) !== JSON.stringify(f.notas)) err.push(`el MEI escribe ${leidas.join(' ')} y tenía que ser ${f.notas.join(' ')}`);
  // 2. dibujo común
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  if (!/href="#E050-/.test(svg)) err.push('falta la clave de sol');
  if (cabezas.length !== f.notas.length) err.push(`${cabezas.length} cabezas y tenían que ser ${f.notas.length}`);
  else if (lineas.length === 5) {
    const BASE = 4 * 7 + 2;   // línea inferior de la clave de sol = Mi4
    cabezas.forEach((c, i) => { const p = BASE + (lineas[4] - c.y) / (ESPACIO / 2); if (p !== paso(f.notas[i])) err.push(`la cabeza ${i + 1} está en el paso ${p} y se pedía ${paso(f.notas[i])}`); });
    if (!cabezas.every((c) => c.g === 'E0A3')) err.push('las cabezas no son de blanca');
  }
  // 2b. lo propio de cada efecto
  if (f.tipo === 'bloque' && /class="arpeg"/.test(svg)) err.push('el acorde en bloque no debería llevar línea de arpegiado');
  if (f.tipo === 'arpegiado') {
    const orden = /<arpeg [^>]*order="(\w+)"/.exec(mei), flecha = /<arpeg [^>]*arrow="true"/.test(mei);
    if (!orden || orden[1] !== f.orden) err.push(`el MEI arpegia ${orden && orden[1]} y la figura es «${f.orden}»`);
    if (flecha !== f.flecha) err.push(`la flecha del MEI (${flecha}) no es la de la figura (${f.flecha})`);
    const plist = (/<arpeg [^>]*plist="([^"]*)"/.exec(mei) || [])[1];
    if (!plist || plist.split(/\s+/).length !== f.notas.length) err.push('la línea de arpegiado no incluye todas las notas del acorde');
    const g = /<g id="ar" class="arpeg" transform="rotate\(-90\.0+ ([\d.]+),([\d.]+)\)">([\s\S]*?)<\/g>/.exec(svg);
    if (!g) err.push('no se dibuja la línea de arpegiado');
    else {
      const cx = Number(g[1]), cy = Number(g[2]);
      const glifos = [...g[3].matchAll(/href="#(\w+)-[^"]*" transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ id: m[1], x: Number(m[2]) }));
      const maxx = Math.max(...glifos.map((q) => q.x));
      if (cabezas.length) {
        if (!(cx < Math.min(...cabezas.map((c) => c.x)))) err.push('la línea de arpegiado no está a la izquierda del acorde');
        const yAbajo = cy, yArriba = cy - (maxx - cx) - 158;     // el giro de -90° vuelca la línea hacia arriba
        const yMin = Math.min(...cabezas.map((c) => c.y)), yMax = Math.max(...cabezas.map((c) => c.y));
        if (!(yArriba <= yMin + 150 && yAbajo >= yMax)) err.push(`la línea de arpegiado (${Math.round(yArriba)}–${Math.round(yAbajo)}) no cubre las notas (${yMin}–${yMax})`);
      }
      const ids = glifos.map((q) => q.id);
      const flechaArriba = ids.includes('EAAD'), flechaAbajo = ids.includes('EAAE');
      if (f.flecha && f.orden === 'up' && !flechaArriba) err.push('falta la punta de flecha hacia arriba');
      if (f.flecha && f.orden === 'down' && !flechaAbajo) err.push('falta la punta de flecha hacia abajo');
      if (!f.flecha && (flechaArriba || flechaAbajo)) err.push('hay una flecha que no se pidió');
      if (f.flecha && f.orden === 'up' && flechaAbajo) err.push('la flecha apunta hacia abajo y el arpegiado es ascendente');
      if (f.flecha && f.orden === 'down' && flechaArriba) err.push('la flecha apunta hacia arriba y el arpegiado es descendente');
    }
  }
  if (f.tipo === 'rayas') {
    const unidades = [...mei.matchAll(/<bTrem [^>]*unitdur="(\d+)"/g)].map((m) => Number(m[1]));
    if (JSON.stringify(unidades) !== JSON.stringify(f.unidades)) err.push(`el MEI pone trémolos de ${unidades.join(', ')} y la figura es de ${f.unidades.join(', ')}`);
    const grupos = [...svg.matchAll(/<g id="bt\d" class="bTrem">\s*<use href="#(E22\d)-/g)].map((m) => m[1]);
    const rayas = grupos.map((g) => Number(g.slice(3)) + 1);        // E220 = 1 raya, E221 = 2, E222 = 3
    const quiere = f.unidades.map((u) => Math.log2(u) - 2);          // 8 → 1, 16 → 2, 32 → 3
    if (JSON.stringify(rayas) !== JSON.stringify(quiere)) err.push(`se dibujan ${rayas.join(', ')} rayas y por las cifras (${f.unidades.join(', ')}) tocan ${quiere.join(', ')}`);
  }
  if (f.tipo === 'alternado') {
    const u = /<fTrem [^>]*unitdur="(\d+)"/.exec(mei);
    if (!u || Number(u[1]) !== f.unidad) err.push(`el MEI pone un trémolo de ${u && u[1]} y la figura es de ${f.unidad}`);
    const barras = (svg.match(/<g id="ft" class="fTrem">\s*(?:<polygon [^>]*\/>\s*)+/) || [''])[0].match(/<polygon /g) || [];
    if (barras.length !== Math.log2(f.unidad) - 2) err.push(`se dibujan ${barras.length} barras y por la cifra (${f.unidad}) tocan ${Math.log2(f.unidad) - 2}`);
  }
  // 3. alt
  const nombres = [...alt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]);
  const quieren = new Set(f.notas.map((k) => NOMBRE[k[0]]));
  for (const n of quieren) if (!nombres.includes(n)) err.push(`el alt no nombra ${n}`);
  if (nombres.some((n) => !quieren.has(n))) err.push('el alt nombra una nota que no está en la figura');
  const dice = (re) => re.test(alt);
  if (f.tipo === 'arpegiado' && !dice(/arpegiad/i)) err.push('el alt no dice arpegiado');
  if (f.tipo === 'arpegiado' && f.orden === 'down' && !(dice(/hacia abajo/) && dice(/aguda a la más grave/))) err.push('el alt no dice que baja');
  if (f.tipo === 'arpegiado' && f.orden === 'up' && !(dice(/más grave a la más aguda/) && !dice(/hacia abajo/))) err.push('el alt no dice que sube');
  if (f.tipo === 'bloque' && !(dice(/a la vez/) && !dice(/arpegiad/i))) err.push('el alt del bloque debería decir que suenan a la vez');
  if (f.tipo === 'rayas' && !(dice(/una, dos y tres rayas/) && dice(/corcheas/) && dice(/semicorcheas/) && dice(/fusas/))) err.push('el alt no explica las tres rayas');
  if (f.tipo === 'alternado' && !(dice(/alternan/) && dice(/tres barras/) && dice(/fusas/))) err.push('el alt no explica el trémolo alternado');
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibuja = (nombre, f, sab) => {
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('efectos-' + nombre), spacingLinear: f.tipo === 'alternado' ? 0.5 : 0.6 }));
    const mei = construye(f, sab);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI de ' + nombre);
    return { mei, svg: tk.renderToSVG(1) };
  };

  if (sabotaje) {
    const pruebas = [
      ['arpegiado descendente sin la flecha', 'arpegiado-descendente', { flecha: false }],
      ['arpegiado que dice «down» en la figura ascendente', 'arpegiado', { orden: 'down' }],
      ['acorde con una nota cambiada', 'acorde-bloque', { notas: ['c/4', 'e/4', 'a/4', 'c/5'] }],
      ['trémolos con las cifras cambiadas', 'tremolo-rayas', { unidades: [8, 8, 32] }],
      ['trémolo alternado de semicorcheas en vez de fusas', 'tremolo-alternado', { unidad: 16 }],
    ];
    let mal = 0;
    for (const [desc, nombre, sab] of pruebas) {
      const f = FIGURAS[nombre];
      const { mei, svg } = dibuja(nombre + '-sab', f, sab);
      const e = verificar(nombre, f, mei, svg, f.alt, sab);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    // alt que dice lo contrario
    const f = FIGURAS['arpegiado'], { mei, svg } = dibuja('arpegiado', f);
    const e = verificar('arpegiado', f, mei, svg, f.alt.replace('de la más grave a la más aguda', 'de la más aguda a la más grave, hacia abajo'));
    console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: el alt dice que el arpegiado baja${e.length ? ' → ' + e[0] : ''}`);
    if (!e.length) mal++;
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }

  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  let fallos = 0;
  for (const [nombre, f] of Object.entries(FIGURAS)) {
    const { mei, svg } = dibuja(nombre, f);
    const err = verificar(nombre, f, mei, svg, f.alt);
    if (err.length) { fallos++; console.log(`  ✗ ${nombre}: ${err.join('; ')}`); continue; }
    const listo = preparar(svg, f.alt);
    fs.writeFileSync(path.join(RAIZ, SALIDA, nombre + '.svg'), listo.svg);
    console.log(`  ✓ ${nombre}  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB`);
  }
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
