'use strict';
/**
 * Ejemplos de las paginas "compas de X/Y" del diccionario (pulso, subdivision, melodia, hemiolia).
 * Los datos NO se copian: se leen de los scripts que dibujaban los PNG con VexFlow
 * (generate-compases-cifra.js y generate-compas-6-8.js), asi la musica es la misma de siempre.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const RAIZ = path.join(__dirname, '..', '..', '..');

function leerEX(fichero) {
  const src = fs.readFileSync(path.join(RAIZ, fichero), 'utf8');
  const a = src.indexOf('const n = '), b = src.indexOf('const RENDER_FN');
  if (a < 0 || b < 0) throw new Error('no encuentro los datos en ' + fichero);
  const ctx = vm.createContext({});
  vm.runInContext(src.slice(a, b) + '\nthis.__r = EX;', ctx);
  return ctx.__r;
}

const todos = [...leerEX('generate-compases-cifra.js'), ...leerEX('generate-compas-6-8.js').map((e) => ({ ts: '6/8', ...e }))];

module.exports = todos.map((e) => ({
  slug: e.file,
  archivos: [e.file + '.png'],
  ts: e.ts,
  // 'C|' (compas partido) se escribe 2/2 con el simbolo del compas cortado
  num: e.num !== undefined ? e.num : Number(e.ts.split('/')[0]),
  den: e.den !== undefined ? e.den : Number(e.ts.split('/')[1]),
  corte: e.ts === 'C|',
  compases: e.bars.map((b) => b.map((x) => ({ key: x.key, d: x.dur, puntillo: x.dots || 0, barra: x.beam, acento: !!x.acc }))),
}));
