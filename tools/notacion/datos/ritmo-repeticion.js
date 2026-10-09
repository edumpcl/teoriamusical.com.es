'use strict';
/**
 * Signos de repeticion de /diccionario-musical/signos-de-repeticion/: barras de repeticion, casillas de 1.ª y 2.ª vez,
 * Fine y D.C. al Fine, y segno con coda. Datos de generate-repeticion.js (VexFlow) con el modelo de compases-cifra.js.
 * Siempre en 4/4, cuatro negras por compas. Los signos (segno, coda) y las barras, las casillas y su numero los dibuja
 * Verovio; las palabras («Fine», «D.C. al Fine», «To», «D.S. al», «Coda») son rotulos nuestros, pegados al signo o a
 * la barra a la que pertenecen (`antesDeSigno` / `despuesDeSigno`: n.º de signo de su fila, por orden; `finDeCompas`: n.º de compas).
 */
const q = (key, o = {}) => ({ key, d: 'q', puntillo: 0, signo: o.signo });
const compas = (keys, signos = {}) => keys.map((k, i) => q(k, { signo: signos[i] }));
const base = { carpeta: 'compases', tipo: 'repeticion' };
const A = ['c/4', 'e/4', 'g/4', 'e/4'], B = ['f/4', 'e/4', 'd/4', 'c/4'], C = ['g/4', 'a/4', 'g/4', 'e/4'];

module.exports = [
  {
    ...base, slug: 'repeticion-barras', archivos: ['repeticion-barras.png'],
    filas: [{ num: 4, den: 4, compases: [compas(['c/4', 'd/4', 'e/4', 'f/4']), compas(['g/4', 'a/4', 'g/4', 'e/4'])], barras: [{ ini: 'rpt' }, { fin: 'rpt' }] }],
  },
  {
    ...base, slug: 'repeticion-casillas', archivos: ['repeticion-casillas.png'],
    filas: [{
      num: 4, den: 4, compases: [compas(A), compas(B), compas(['g/4', 'g/4', 'c/5', 'c/5'])],
      barras: [{}, { fin: 'rpt', casilla: { n: '1', label: '1.' } }, { fin: 'end', casilla: { n: '2', label: '2.' } }],
    }],
  },
  {
    ...base, slug: 'repeticion-dc-fine', archivos: ['repeticion-dc-fine.png'],
    filas: [{
      num: 4, den: 4, compases: [compas(A), compas(B), compas(C)], barras: [{}, {}, { fin: 'end' }],
      textos: [{ texto: 'Fine', ref: 'arriba', finDeCompas: 1 }, { texto: 'D.C. al Fine', ref: 'arriba', finDeCompas: 2 }],
    }],
  },
  {
    // Dos sistemas: arriba el segno y «To Coda»; abajo «D.S. al Coda» y la Coda (el 2.º sistema no repite la cifra, como en una partitura)
    ...base, slug: 'repeticion-segno-coda', archivos: ['repeticion-segno-coda.png'],
    filas: [
      {
        num: 4, den: 4, barras: [{}, {}], compases: [compas(A, { 0: 'segno' }), compas(B, { 3: 'coda' })],
        textos: [{ texto: 'To', ref: 'arriba', antesDeSigno: 1, dy: -100 }],
      },
      {
        barras: [{}, { fin: 'end' }], compases: [compas(C, { 3: 'coda' }), compas(['c/5', 'b/4', 'c/5', 'c/5'], { 0: 'coda' })],
        textos: [{ texto: 'D.S. al', ref: 'arriba', antesDeSigno: 0, dy: -100 }, { texto: 'Coda', ref: 'arriba', despuesDeSigno: 1, dy: -100 }],
      },
    ],
  },
];
