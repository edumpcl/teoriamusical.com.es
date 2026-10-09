'use strict';
/**
 * Figuras, silencios, figuras con puntillo y ligaduras de /diccionario-musical/figuras-musicales/, /puntillo/ y
 * /ligaduras/. Los datos son los de generate-figuras.js y generate-ligaduras.js (VexFlow), con el mismo modelo
 * que compases-cifra.js. Cada figura suelta va en un pentagrama sin cifra de compas y con la plica hacia arriba,
 * como antes; `escala` las dibuja a mayor tamano, que es como las muestra la pagina.
 */
const NOMBRES = [['redonda', 'w'], ['blanca', 'h'], ['negra', 'q'], ['corchea', '8'], ['semicorchea', '16'], ['fusa', '32'], ['semifusa', '64']];
const ev = (key, d, o = {}) => ({ key, d, puntillo: o.p ? 1 : 0, plica: o.plica, union: o.union });
const base = { carpeta: 'figuras', tipo: 'figura', escala: 1.8 };

const figuras = NOMBRES.map(([n, d]) => ({ ...base, slug: `figura-${n}`, archivos: [`figura-${n}.png`], filas: [{ compases: [[ev('g/4', d, { plica: 'up' })]] }] }));
const silencios = NOMBRES.map(([n, d]) => ({ ...base, slug: `silencio-${n}`, archivos: [`silencio-${n}.png`], filas: [{ compases: [[{ silencio: true, d, puntillo: 0 }]] }] }));
const puntillos = NOMBRES.map(([n, d]) => ({ ...base, slug: `figura-${n}-puntillo`, archivos: [`figura-${n}-puntillo.png`], filas: [{ compases: [[ev('g/4', d, { p: true, plica: 'up' })]] }] }));

const ligaduras = [
  {
    carpeta: 'figuras', tipo: 'ligadura-union', escala: 1.6, slug: 'ligadura-union', archivos: ['ligadura-union.png'],
    filas: [{ compases: [[ev('g/4', 'h', { plica: 'up', union: 'i' }), ev('g/4', 'h', { plica: 'up', union: 't' })]] }],
  },
  {
    carpeta: 'figuras', tipo: 'ligadura-expresion', escala: 1.6, slug: 'ligadura-expresion', archivos: ['ligadura-expresion.png'],
    filas: [{ compases: [['c/4', 'e/4', 'g/4', 'e/4'].map((k) => ev(k, 'q', { plica: 'up' }))], slurs: [{ de: [0, 0], a: [0, 3], curva: 'above' }] }],
  },
];

module.exports = [...figuras, ...silencios, ...puntillos, ...ligaduras];
