'use strict';
/**
 * Imagenes de /diccionario-musical/compases/ con rotulos o varias filas: acentuacion ritmica, anacrusa,
 * 3/4 contra 6/8, unidad de tiempo y de compas, compasillo y alla breve.
 * Los datos son los de generate-acentuacion.js, generate-anacrusa.js, generate-anacrusa-famosas.js,
 * generate-68-vs-34.js, generate-unidad-compas.js y generate-compasillo.js (VexFlow), escritos con el mismo
 * modelo que compases-cifra.js. `sumas` declara cuanto dura cada compas cuando no es el compas entero
 * (la anacrusa, el final abierto); el verificador comprueba que es verdad.
 */
const ev = (key, d, o = {}) => ({ key, d, puntillo: o.p ? 1 : 0, barra: o.barra, acento: !!o.acento });

/* ---- acentuacion ritmica: un pulso por tiempo, con «Fuerte / Débil / Semifuerte» debajo de cada nota ---- */
const F = 'Fuerte', D = 'Débil', S = 'Semifuerte';
const ACENT = [
  ['acentuacion-2-4', 2, 4, false, [F, D]],
  ['acentuacion-3-4', 3, 4, false, [F, D, D]],
  ['acentuacion-4-4', 4, 4, false, [F, D, S, D]],
  ['acentuacion-6-8', 6, 8, true, [F, D]],
  ['acentuacion-9-8', 9, 8, true, [F, D, D]],
  ['acentuacion-12-8', 12, 8, true, [F, D, S, D]],
];
const acentuacion = ACENT.map(([slug, num, den, punt, tiempos]) => ({
  slug, archivos: [slug + '.png'], tipo: 'acentuacion',
  filas: [{
    num, den,
    compases: [tiempos.map((t) => ev('b/4', 'q', { p: punt, acento: t === F }))],
    textos: tiempos.map((t, i) => ({ texto: t, ref: 'abajo', nota: i })),
  }],
}));

/* ---- anacrusa ---- */
const q = (k) => ev(k, 'q');
const anacrusa = [
  {
    slug: 'anacrusa-comparacion', archivos: ['anacrusa-comparacion.png'], tipo: 'anacrusa-comparacion',
    filas: [
      { num: 4, den: 4, rotulo: 'Sin anacrusa · comienzo tético', compases: [[q('c/5'), q('d/5'), q('e/5'), q('f/5')]] },
      { num: 4, den: 4, rotulo: 'Con anacrusa', sumas: [16, 64], compases: [[q('g/4')], [q('c/5'), q('d/5'), q('e/5'), q('f/5')]] },
    ],
  },
  {
    slug: 'anacrusa-compas', archivos: ['anacrusa-compas.png'], tipo: 'anacrusa-compas',
    filas: [{
      num: 4, den: 4, sumas: [16, 64, 48], cierra: true, barraFinal: 'end',
      compases: [[q('g/4')], [q('c/5'), q('d/5'), q('e/5'), q('f/5')], [ev('g/5', 'h'), q('e/5')]],
    }],
  },
  {
    // «Cumpleaños feliz»: arranque = corchea con puntillo + semicorchea (barradas); el compas final queda abierto
    slug: 'anacrusa-cumpleanos', archivos: ['anacrusa-cumpleanos.png'], tipo: 'anacrusa-cumpleanos',
    filas: [{
      num: 3, den: 4, sumas: [16, 48, 32], cierra: true, sinBarraFinal: true,
      compases: [[ev('g/4', '8', { p: 1, barra: 0 }), ev('g/4', '16', { barra: 0 })], [q('a/4'), q('g/4'), q('c/5')], [ev('b/4', 'h')]],
    }],
  },
  {
    slug: 'anacrusa-famosas', archivos: ['anacrusa-famosas.png'], tipo: 'anacrusa-famosas',
    filas: [
      {
        num: 3, den: 4, sumas: [16, 48], sinBarraFinal: true, rotulo: 'Cumpleaños feliz',
        compases: [[ev('g/4', '8', { p: 1, barra: 0 }), ev('g/4', '16', { barra: 0 })], [q('a/4'), q('g/4'), q('c/5')]],
      },
      {
        num: 3, den: 8, sumas: [8, 24, 8], sinBarraFinal: true, rotulo: 'Para Elisa (Beethoven)',
        compases: [
          [ev('e/5', '16', { barra: 0 }), ev('d#/5', '16', { barra: 0 })],
          [ev('e/5', '16', { barra: 1 }), ev('d#/5', '16', { barra: 1 }), ev('e/5', '16', { barra: 1 }), ev('b/4', '16', { barra: 1 }), ev('d/5', '16', { barra: 1 }), ev('c/5', '16', { barra: 1 })],
          [ev('a/4', '8')],
        ],
      },
    ],
  },
];

/* ---- las mismas seis corcheas agrupadas como 3/4 (2+2+2) y como 6/8 (3+3) ---- */
const seis = (grupos) => [Array.from({ length: 6 }, (_, i) => ev('b/4', '8', { barra: grupos[i], acento: i === 0 }))];
const comparacion68 = {
  slug: 'seis-corcheas-34-vs-68', archivos: ['seis-corcheas-34-vs-68.png'], tipo: 'seis-corcheas',
  filas: [
    {
      num: 3, den: 4, rotulo: '3/4 · tres tiempos, cada uno en dos', compases: seis([0, 0, 1, 1, 2, 2]),
      textos: [{ texto: '1', ref: 'abajo', grupo: [0, 1], dy: 950 }, { texto: '2', ref: 'abajo', grupo: [2, 3], dy: 950 }, { texto: '3', ref: 'abajo', grupo: [4, 5], dy: 950 }],
    },
    {
      num: 6, den: 8, rotulo: '6/8 · dos tiempos, cada uno en tres', compases: seis([0, 0, 0, 1, 1, 1]),
      textos: [{ texto: '1', ref: 'abajo', grupo: [0, 1, 2], dy: 950 }, { texto: '2', ref: 'abajo', grupo: [3, 4, 5], dy: 950 }],
    },
  ],
};

/* ---- unidad de compas, unidad de tiempo, 6/8 subdividido ---- */
const sueltos = [
  { slug: 'unidad-de-compas', archivos: ['unidad-de-compas.png'], tipo: 'cifra', filas: [{ num: 4, den: 4, compases: [[ev('b/4', 'w')]] }] },
  { slug: 'unidad-de-tiempo', archivos: ['unidad-de-tiempo.png'], tipo: 'cifra', filas: [{ num: 4, den: 4, compases: [[q('b/4'), q('b/4'), q('b/4'), q('b/4')]] }] },
  {
    slug: 'compas-compuesto-68', archivos: ['compas-compuesto-68.png'], tipo: 'cifra',
    filas: [{ num: 6, den: 8, compases: [Array.from({ length: 6 }, (_, i) => ev('b/4', '8', { barra: i < 3 ? 0 : 1 }))] }],
  },
  // solo la clave y el simbolo de compas: compasillo (C = 4/4) y compas partido (¢ = 2/2)
  { slug: 'compasillo', archivos: ['compasillo.png'], tipo: 'cifra', filas: [{ num: 4, den: 4, simbolo: 'common', sinBarraFinal: true, compases: [[]] }] },
  { slug: 'alla-breve', archivos: ['alla-breve.png'], tipo: 'cifra', filas: [{ num: 2, den: 2, simbolo: 'cut', sinBarraFinal: true, compases: [[]] }] },
];

module.exports = [...acentuacion, ...anacrusa, comparacion68, ...sueltos];
