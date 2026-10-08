'use strict';
/**
 * Un pentagrama pequeno por armonico (1..16) para el explorador de /diccionario-musical/serie-armonica/.
 * Los datos son los de assets/js/serie-armonica-engine.js (el mismo que da el audio). Cabeza RELLENA en los
 * armonicos que no encajan en el temperamento igual (|cents| >= 30), como en la notacion clasica.
 * Salida: assets/img/notacion/serie-armonica/armonico-N.svg (los carga el explorador; no estan en el HTML).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const RAIZ = path.join(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(RAIZ, 'assets/js/serie-armonica-engine.js'), 'utf8');
const a = src.indexOf('var F1 ='), b = src.indexOf('// interpretación');
if (a < 0 || b < 0) throw new Error('no encuentro los datos en serie-armonica-engine.js');
const ctx = vm.createContext({ Math });
vm.runInContext(src.slice(a, b) + '\nthis.__r = HARM;', ctx);

module.exports = ctx.__r.map((h) => ({
  slug: `armonico-${h.n}`, archivos: [], clave: h.clef === 'bass' ? 'fa' : 'sol', ancho: 140,
  compases: [[{ n: [h.key.replace('/', '')], d: 'w' }]],
  rellena: Math.abs(h.cents) >= 30,
  alt: `Armónico ${h.n}: ${h.es} en el pentagrama`,
}));
