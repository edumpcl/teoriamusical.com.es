'use strict';
/**
 * Cadencias de la pagina /diccionario-musical/cadencias/ (dos acordes en Do mayor, en redondas).
 * Los acordes se leen de generate-cadencias.js; la progresion (V7-I, IV-I...) la dice el alt de la pagina
 * y el motor comprueba que cada acorde es ese grado en Do mayor.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const RAIZ = path.join(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(RAIZ, 'generate-cadencias.js'), 'utf8');
const a = src.indexOf('const CAD = ['), b = src.indexOf('const RENDER_FN');
const ctx = vm.createContext({});
vm.runInContext(src.slice(a, b) + '\nthis.__r = CAD;', ctx);
const clave = (k) => k.replace('/', '');
module.exports = ctx.__r.map((c) => ({
  slug: c.file, archivos: [c.file + '.png'], clave: 'sol', ancho: 320, progresion: true, sinNombres: true,
  compases: [c.chords.map((ch) => ({ n: ch.map(clave), d: 'w' }))],
}));
