'use strict';
/**
 * Notacion de las entradas del blog que no son intervalos ni acordes:
 *  - dos armaduras (Sol mayor y Si bemol mayor), solo la clave y la armadura;
 *  - siete ejercicios de metronomo (escala de Do con distintos ritmos, cada patron cuadra EXACTO en un 4/4).
 * Datos de generate-blog-notacion.js y generate-metronomo-ejercicios.js (VexFlow), con el modelo de compases-cifra.js.
 */
const ev = (key, d, o = {}) => ({ key, d, puntillo: o.p ? 1 : 0, barra: o.barra });

/* ---- armaduras ---- */
const armaduras = [['armadura-sol-mayor', 1], ['armadura-sib-mayor', -2]].map(([slug, armadura]) => ({
  slug, archivos: [slug + '.png'], carpeta: 'escalas', tipo: 'armadura', escala: 1.3,
  filas: [{ armadura, compases: [[]] }],
}));

/* ---- ejercicios de metronomo ---- */
const SC = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
const DESC = ['c/5', 'b/4', 'a/4', 'g/4', 'f/4', 'e/4', 'd/4', 'c/4'];
const tresillos = [0, 1, 2, 3].map((g) => ({ c: 0, ini: 3 * g, fin: 3 * g + 2, num: 3, numbase: 2 }));
const EJ = [
  ['ej-ritmo-negras', ['c/4', 'd/4', 'e/4', 'f/4'].map((k) => ev(k, 'q'))],
  ['ej-ritmo-corcheas', SC.map((k, i) => ev(k, '8', { barra: i >> 1 }))],
  ['ej-ritmo-corcheas-repetidas', ['c/4', 'c/4', 'd/4', 'd/4', 'e/4', 'e/4', 'f/4', 'f/4'].map((k, i) => ev(k, '8', { barra: i >> 1 }))],
  ['ej-ritmo-tresillos', ['c/4', 'd/4', 'e/4', 'f/4'].flatMap((k, g) => [0, 1, 2].map(() => ev(k, '8', { barra: g }))), tresillos],
  ['ej-ritmo-semicorcheas', SC.concat(DESC).map((k, i) => ev(k, '16', { barra: i >> 2 }))],
  ['ej-ritmo-galopa', SC.map((k, i) => (i % 2 === 0 ? ev(k, '8', { p: true, barra: i >> 1 }) : ev(k, '16', { barra: i >> 1 })))],
  ['ej-subdivisiones-piramide', [
    ev('g/4', 'q'), ev('g/4', '8', { barra: 1 }), ev('g/4', '8', { barra: 1 }),
    ev('g/4', '8', { barra: 2 }), ev('g/4', '8', { barra: 2 }), ev('g/4', '8', { barra: 2 }),
    ev('g/4', '16', { barra: 3 }), ev('g/4', '16', { barra: 3 }), ev('g/4', '16', { barra: 3 }), ev('g/4', '16', { barra: 3 }),
  ], [{ c: 0, ini: 3, fin: 5, num: 3, numbase: 2 }]],
];
const ejercicios = EJ.map(([slug, notas, tuplets]) => ({
  slug, archivos: [slug + '.png'], carpeta: 'metronomo', tipo: 'ejercicio-ritmo', escala: 1.1,
  filas: [{ num: 4, den: 4, compases: [notas], tuplets: tuplets || [] }],
}));

module.exports = [...armaduras, ...ejercicios];
