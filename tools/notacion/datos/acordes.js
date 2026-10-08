'use strict';
/**
 * Datos de las imagenes de acordes del diccionario (para tools/gen-pentagramas-verovio.js).
 * Se leen de los scripts generate-acordes-triadas.js, generate-acordes-septima.js,
 * generate-triadas-notacion.js y generate-cifrado.js (con vm), para no copiarlos a mano.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const RAIZ = path.join(__dirname, '..', '..', '..');

function leerScript(fichero, desde, hasta, nombres) {
  const src = fs.readFileSync(path.join(RAIZ, fichero), 'utf8');
  const a = src.indexOf(desde), b = src.indexOf(hasta);
  if (a < 0 || b < 0) throw new Error(`no encuentro ${desde} / ${hasta} en ${fichero}`);
  const ctx = vm.createContext({});
  vm.runInContext(src.slice(a, b) + '\nthis.__r = {' + nombres.join(',') + '};', ctx);
  return ctx.__r;
}
const clave = (k) => k.replace('/', '');
const datos = [];

/* triadas y septimas sueltas: un acorde en redonda, de grave a agudo */
for (const [fichero, dir] of [['generate-acordes-triadas.js', 'acordes'], ['generate-acordes-septima.js', 'acordes']]) {
  const { CHORDS } = leerScript(fichero, 'const CHORDS', 'const RENDER_FN', ['CHORDS']);
  for (const c of CHORDS) datos.push({ slug: c.file, archivos: [c.file + '.png'], clave: 'sol', ancho: 220, compases: [[{ n: c.keys.map(clave), d: 'w' }]] });
}

/* generate-triadas-notacion.js: tipos, quintas, terceras e inversiones */
for (const c of leerScript('generate-triadas-notacion.js', 'const ITEMS', 'const RENDER_FN', ['ITEMS']).ITEMS) {
  datos.push({ slug: c.file, archivos: [c.file + '.png'], clave: 'sol', ancho: 220, compases: [[{ n: c.keys.map(clave), d: 'w' }]] });
}

/* generate-cifrado.js: acorde + cifra (numeros) debajo; accs = signo que se escribe en cada nota */
const { ITEMS: CIFRADOS } = leerScript('generate-cifrado.js', "const S = '", 'const RENDER_FN', ['ITEMS']);
for (const c of CIFRADOS) {
  const notas = c.keys.map((k, i) => { const kk = clave(k); return kk[0] + (c.accs[i] || '') + kk.slice(1); });
  const cifrado = c.figures.map((f) => ({ t: f.t, tachado: !!f.crossed }));
  datos.push({
    slug: c.file, archivos: [c.file + '.png'], clave: 'sol', ancho: 220, sinAlt: false, sensible: /sensible/.test(c.file) ? 'fundamental' : 'tercera',
    compases: [[{ n: notas, d: 'w' }]],
    cifrado,
    etiquetas: cifrado.map((f, k) => ({ nota: 0, texto: f.t, tachado: f.tachado, dy: 1000 + 560 * k, size: 460, weight: 700, family: 'Georgia, &quot;Times New Roman&quot;, serif' })),
  });
}

module.exports = datos;
