'use strict';
/**
 * Datos de las imagenes de intervalos del diccionario (para tools/gen-pentagramas-verovio.js).
 *
 * Cada entrada: { slug, archivos:[nombres de archivo que usa la pagina], clave, compases:[[{n:[notas], d}]], ... }
 *   notas: 'c4', 'd#4', 'eb4', 'ebb4', 'cn4' (natural escrito); d: 'w' redonda, 'h' blanca, 'q' negra
 *   ancho: largo del pentagrama en px; etiquetas / flecha: extras de texto
 *
 * ORIGEN de los datos:
 *  - los de generate-intervalos*.js, generate-intervalo-tipos.js, generate-conjunto-disjunto.js y
 *    generate-simples-compuestos.js se leen de esos scripts (con vm), para no copiarlos a mano;
 *  - los de ampliacion/reduccion, semitonos, unisono y enarmonicas no tenian script: se han leido
 *    de las imagenes antiguas (ampliacion/reduccion, que eran coherentes entre si) o se han hecho
 *    a partir del nombre que dice la propia pagina (semitonos, unisono, enarmonicas: las imagenes
 *    antiguas de unisono y enarmonicas NO mostraban lo que decia su alt).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const RAIZ = path.join(__dirname, '..', '..', '..');

const quita = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const slugDe = (archivo) => quita(archivo.replace(/\.png$/i, '').replace(/-\d+x\d+$/, '')).replace(/[ªº]/g, 'a').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const clave = (k) => k.replace('/', '');             // 'd#/4' -> 'd#4'

/** Ejecuta el trozo de definiciones de un script de generacion y devuelve las constantes pedidas. */
function leerScript(fichero, desde, hasta, nombres) {
  const src = fs.readFileSync(path.join(RAIZ, fichero), 'utf8');
  const a = src.indexOf(desde), b = src.indexOf(hasta);
  if (a < 0 || b < 0) throw new Error(`no encuentro ${desde} / ${hasta} en ${fichero}`);
  const ctx = vm.createContext({});
  vm.runInContext(src.slice(a, b) + '\nthis.__r = {' + nombres.join(',') + '};', ctx);
  return ctx.__r;
}

const datos = [];
const meter = (d) => datos.push(d);

/* ---------- generate-intervalos.js ---------- */
const { INTERVALS } = leerScript('generate-intervalos.js', '// H=harmonic', 'const RENDER_FN', ['INTERVALS']);
for (const iv of INTERVALS) {
  const archivos = iv.srcFiles;
  const slug = slugDe(archivos[0]);
  const base = { slug, archivos, clave: 'sol' };
  const n = iv.notes;
  if (iv.type === 'harmonic') meter({ ...base, compases: [[{ n: n[0].keys.map(clave), d: 'w' }]], ancho: iv.vw >= 400 ? 420 : 310 });
  else if (iv.type === 'melodic') meter({ ...base, compases: [n.map((x) => ({ n: x.keys.map(clave), d: 'w' }))], ancho: iv.vw });
  else if (iv.type === 'counting') meter({ ...base, compases: [n.map((x) => ({ n: x.keys.map(clave), d: 'w' }))], ancho: iv.vw,
    etiquetas: n.map((x, k) => ({ nota: k, texto: x.label, dy: 800, size: 320 })) });
  else if (iv.type === 'ascending' || iv.type === 'descending') meter({ ...base, compases: [n.map((x) => ({ n: x.keys.map(clave), d: 'w' }))], ancho: iv.vw, flecha: iv.type === 'ascending' ? 'sube' : 'baja' });
  else if (iv.type === 'reduction12') meter({ ...base, compases: [[{ n: n[0].keys.map(clave), d: 'w' }]], ancho: iv.vw,
    etiquetas: [{ nota: 1, texto: '−8ª', ref: 'nota', dx: 650, dy: 0, size: 340 }] });
  else throw new Error('tipo desconocido en generate-intervalos.js: ' + iv.type);
}

/* ---------- generate-intervalos-ejemplos.js: Do - otra nota (melodico, redondas) ---------- */
const { ITEMS: EJEMPLOS } = leerScript('generate-intervalos-ejemplos.js', 'const ITEMS', 'const RENDER_FN', ['ITEMS']);
for (const [file, key2, acc] of EJEMPLOS) {
  const k = clave(key2);
  const n2 = k[0] + (acc === 'b' ? 'b' : acc === '#' ? '#' : '') + k.slice(1);
  meter({ slug: file, archivos: [file + '.png'], clave: 'sol', compases: [[{ n: ['c4'], d: 'w' }, { n: [n2], d: 'w' }]], ancho: 420 });
}

/* ---------- generate-intervalo-tipos / conjunto-disjunto / simples-compuestos ---------- */
const forma = (items, ancho) => items.map((it) => ({
  slug: it.file, archivos: [it.file + '.png'], clave: 'sol', ancho,
  compases: [it.notes.map((x) => ({ n: x.keys.map(clave), d: x.dur }))],
}));
forma(leerScript('generate-intervalo-tipos.js', 'const ITEMS', 'const RENDER_FN', ['ITEMS']).ITEMS, 320).forEach(meter);
forma(leerScript('generate-conjunto-disjunto.js', 'const ITEMS', 'const RENDER_FN', ['ITEMS']).ITEMS, 300).forEach(meter);
for (const it of leerScript('generate-simples-compuestos.js', 'const ITEMS', 'const RENDER_FN', ['ITEMS']).ITEMS) {
  meter({ slug: it.file, archivos: [it.file + '.png'], clave: 'sol', ancho: it.file === 'intervalo-simple' ? 320 : 330, compases: [[{ n: it.keys.map(clave), d: 'w' }]] });
}

/* ---------- ampliacion y reduccion (leidas de las imagenes, coherentes entre si) ---------- */
const M = (a, b) => [[{ n: [a], d: 'w' }, { n: [b], d: 'w' }]];
const amp = (slug, archivo, a, b) => meter({ slug, archivos: [archivo], clave: 'sol', compases: M(a, b), ancho: 420 });
amp('ampliacion-1-original', 'ampliación-intervalo-original-1024x229.png', 'e4', 'g4');
amp('ampliacion-1-subir-agudo', 'ampliación-intervalo-original-subir-nota-más-aguda-1024x229.png', 'e4', 'g5');
amp('ampliacion-2-original', 'ampliación-intervalo-original-2-1024x229.png', 'b4', 'g4');
amp('ampliacion-2-subir-agudo', 'ampliación-intervalo-original-subir-nota-más-aguda-2-1024x229.png', 'b5', 'g4');
amp('ampliacion-1-bajar-grave', 'ampliación-intervalo-original-bajar-nota-más-grave-1024x229.png', 'e3', 'g4');
amp('ampliacion-2-bajar-grave', 'ampliación-intervalo-original-bajar-nota-más-grave-2-1024x229.png', 'b4', 'g3');
amp('reduccion-1-original', 'reducción-intervalo-original-1024x229.png', 'f4', 'a5');
amp('reduccion-1-subir-grave', 'reducción-intervalo-original-subir-nota-más-grave-1024x229.png', 'f5', 'a5');
amp('reduccion-2-original', 'reducción-intervalo-original-2-1024x229.png', 'c6', 'a4');
amp('reduccion-2-subir-grave', 'reducción-intervalo-original-subir-nota-más-grave-2-1024x229.png', 'c6', 'a5');
amp('reduccion-1-bajar-agudo', 'reducción-intervalo-original-bajar-nota-más-aguda-1024x229.png', 'f4', 'a4');
amp('reduccion-2-bajar-agudo', 'reducción-intervalo-original-bajar-nota-más-aguda-2-1024x229.png', 'c5', 'a4');

/* ---------- semitonos: del nombre que dice la pagina ---------- */
const sem = (slug, archivo, a, b) => meter({ slug, archivos: [archivo], clave: 'sol', compases: M(a, b), ancho: 420 });
sem('semitono-diatonico-1', 'semitono-diatónico-1-1024x223.png', 'e4', 'f4');
sem('semitono-diatonico-2', 'semitono-diatónico-2-1024x223.png', 'g4', 'ab4');
sem('semitono-diatonico-3', 'semitono-diatónico-3-1024x223.png', 'a#4', 'b4');
sem('semitono-diatonico-4', 'semitono-diatónico-4-1024x223.png', 'd#5', 'e5');
sem('semitono-cromatico-1', 'semitono-cromático-1-1024x223.png', 'e4', 'eb4');
sem('semitono-cromatico-2', 'semitono-cromático-2-1024x223.png', 'g#4', 'gn4');
sem('semitono-cromatico-3', 'semitono-cromático-3-1024x223.png', 'c4', 'c#4');
sem('semitono-cromatico-4', 'semitono-cromático-4-1024x223.png', 'b4', 'b#4');

/* ---------- unisono y enarmonicas: las imagenes antiguas no coincidian con su alt ---------- */
sem('unisono-do', 'Unisono-2-1024x223.png', 'c4', 'c4');
sem('unisono-sol', 'Unisono-1-1024x223.png', 'g4', 'g4');
sem('enarmonicas-do-sostenido', 'notas-enarmonicas-1-1024x223.png', 'c#4', 'db4');
sem('enarmonicas-sol-sostenido', 'notas-enarmonicas-1024x223.png', 'g#4', 'ab4');

/* ---------- semitono cromatico vs diatonico (dos paneles en un solo pentagrama) ---------- */
meter({
  slug: 'semitono-cromatico-vs-diatonico', archivos: ['semitono-cromatico-vs-diatonico.png'], clave: 'sol', ancho: 480,
  compases: [[{ n: ['c4'], d: 'h' }, { n: ['c#4'], d: 'h' }], [{ n: ['c4'], d: 'h' }, { n: ['db4'], d: 'h' }]],
  etiquetas: [
    { nota: 0, texto: 'Cromático', ref: 'arriba', dy: 900, color: '#b0532a', size: 380, dx: 330 },
    { nota: 2, texto: 'Diatónico', ref: 'arriba', dy: 900, color: '#8a5f06', size: 380, dx: 330 },
    { nota: 0, texto: 'Do', dy: 700, size: 300 }, { nota: 1, texto: 'Do♯', dy: 700, size: 300 },
    { nota: 2, texto: 'Do', dy: 700, size: 300 }, { nota: 3, texto: 'Re♭', dy: 700, size: 300 },
  ],
});

/* ---------- inversion (metodo de Eduardo: la 1.a nota fija, la 2.a se mueve; ejemplos de su MusicXML) ---------- */
const inv = (slug, archivo, a, b, b2, octavas, n1, n2, claves) => meter({
  slug, archivos: [archivo], clave: 'sol', claves, ancho: 480,
  compases: [[{ n: [a], d: 'w' }, { n: [b], d: 'w' }], [{ n: [a], d: 'w' }, { n: [b2], d: 'w' }]],
  inversion: { octavas },
  etiquetas: [{ nota: 1, texto: n1, ref: 'arriba', dy: 650, size: 300, dx: -150 }, { nota: 3, texto: n2, ref: 'arriba', dy: 650, size: 300, dx: -150 }],
});
inv('inversion-simple-1', 'Inversion-intervalo-simple-2-2-1024x143.png', 'c5', 'e5', 'e4', 1, '3ª Mayor', '6ª menor', ['sol', 'sol']);
inv('inversion-simple-2', 'Inversion-intervalo-simple-3-1024x143.png', 'd5', 'a5', 'a4', 1, '5ª Justa', '4ª Justa', ['sol', 'sol']);
inv('inversion-compuesto-1', 'Inversion-intervalo-compuesto-2-1024x143.png', 'c5', 'e6', 'e3', 3, '10ª Mayor', '13ª menor', ['sol', 'sol']);
inv('inversion-compuesto-2', 'Inversion-intervalo-compuesto-1024x143.png', 'd5', 'a6', 'a3', 3, '12ª Justa', '11ª Justa', ['sol', 'sol']);

module.exports = datos;
