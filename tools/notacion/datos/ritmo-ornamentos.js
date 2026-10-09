'use strict';
/**
 * Ornamentos de /diccionario-musical/ornamentos-musicales/: «como se escribe» (compas 1) y «como se toca» (compas 2).
 * Datos de generate-ornamentos.js (VexFlow), con el modelo de compases-cifra.js. Sin cifra de compas.
 *  - apoyatura (nota de adorno SIN rayita) y acciaccatura (CON rayita): nota pequena ligada a la principal;
 *  - mordente superior (linea ondulada lisa) e inferior (con rayita), grupeto directo (∾) e inverso (∾ con rayita), trino (tr).
 * El grupeto «en S vertical» (grupeto-s-vertical.png) es un signo suelto, sin pentagrama, y no se genera aqui.
 */
const n = (key, d, o = {}) => ({ key, d, puntillo: 0, barra: o.barra, orna: o.orna, gracia: o.gracia });
const base = { carpeta: 'ornamentos', tipo: 'ornamento', escala: 1.25 };
const sol = (d, o) => n('g/4', d, o);

const EX = [
  ['apoyatura', [n('a/4', '8', { gracia: 'acc' }), sol('q')], [n('a/4', '8', { barra: 0 }), n('g/4', '8', { barra: 0 })], true],
  ['acciaccatura', [n('a/4', '8', { gracia: 'unacc' }), sol('q')], [n('a/4', '16'), sol('q')], true],
  ['mordente', [sol('q', { orna: 'mordente' })], [n('g/4', '16', { barra: 0 }), n('a/4', '16', { barra: 0 }), n('g/4', '8', { barra: 0 })]],
  ['mordente-inferior', [sol('q', { orna: 'mordente-inf' })], [n('g/4', '16', { barra: 0 }), n('f/4', '16', { barra: 0 }), n('g/4', '8', { barra: 0 })]],
  ['grupeto', [sol('q', { orna: 'grupeto' })], ['a/4', 'g/4', 'f/4', 'g/4'].map((k) => n(k, '16', { barra: 0 }))],
  ['grupeto-inferior', [sol('q', { orna: 'grupeto-inf-raya' })], ['f/4', 'g/4', 'a/4', 'g/4'].map((k) => n(k, '16', { barra: 0 }))],
  ['trino', [sol('h', { orna: 'trino' })], ['g/4', 'a/4', 'g/4', 'a/4', 'g/4', 'a/4', 'g/4', 'a/4'].map((k, i) => n(k, '16', { barra: i < 4 ? 0 : 1 }))],
];

module.exports = EX.map(([slug, escrito, tocado, ligada]) => ({
  ...base, slug, archivos: [slug + '.png'],
  filas: [{ compases: [escrito, tocado], slurs: ligada ? [{ de: [0, 0], a: [0, 1], curva: 'below' }] : [] }],
}));
