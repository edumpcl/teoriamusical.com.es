'use strict';
/**
 * Alteraciones (/diccionario-musical/alteraciones/) y articulaciones (/diccionario-musical/articulacion-musical/).
 * Datos de generate-alteraciones.js y generate-articulacion.js (VexFlow), con el modelo de compases-cifra.js.
 *  - alteraciones: una redonda en Sol con el signo delante (el becuadro hay que forzarlo: `becuadro: true`).
 *  - articulaciones: cuatro negras (Mi, Sol, La, Sol) con plicas hacia arriba y el signo debajo de cada cabeza;
 *    el legato es una ligadura de expresion por debajo, de la primera a la ultima nota.
 */
const ALTERACIONES = [
  ['alteracion-sostenido', 'g#/4', false], ['alteracion-bemol', 'gb/4', false], ['alteracion-becuadro', 'g/4', true],
  ['alteracion-doble-sostenido', 'g##/4', false], ['alteracion-doble-bemol', 'gbb/4', false],
];
const alteraciones = ALTERACIONES.map(([slug, key, becuadro]) => ({
  slug, archivos: [slug + '.png'], carpeta: 'alteraciones', tipo: 'alteracion', escala: 1.8,
  filas: [{ compases: [[{ key, d: 'w', puntillo: 0, becuadro }]] }],
}));

const NOTAS = ['e/4', 'g/4', 'a/4', 'g/4'];
const cuatro = (artic) => NOTAS.map((key) => ({ key, d: 'q', puntillo: 0, plica: 'up', artic: artic ? { tipo: artic, lugar: 'below' } : undefined }));
const ARTICULACIONES = [['staccato', 'stacc'], ['acento', 'acc'], ['tenuto', 'ten'], ['marcato', 'marc']];
const articulaciones = ARTICULACIONES.map(([slug, tipo]) => ({
  slug, archivos: [slug + '.png'], carpeta: 'articulacion', tipo: 'articulacion', escala: 1.2, filas: [{ compases: [cuatro(tipo)] }],
}));
articulaciones.push({
  slug: 'legato', archivos: ['legato.png'], carpeta: 'articulacion', tipo: 'articulacion', escala: 1.2,
  filas: [{ compases: [cuatro(null)], slurs: [{ de: [0, 0], a: [0, 3], curva: 'below' }] }],
});

module.exports = [...alteraciones, ...articulaciones];
