'use strict';
/**
 * La frase musical (/diccionario-musical/la-frase-musical/): tipos de comienzo (tetico, anacrusico, acefalo), su
 * comparativa y el final en tiempo fuerte o debil. Datos de generate-frase.js y generate-frase-comparativa.js (VexFlow),
 * con el modelo de compases-cifra.js. Todo en 4/4.
 * El tipo de comienzo lo decide CUANDO entra la musica, no si el compas esta completo (criterio de las paginas y de los
 * ejercicios): tetico = suena en el 1.er tiempo; anacrusico = entra antes del tiempo fuerte, en un compas incompleto;
 * acefalo = un silencio ocupa el tiempo fuerte. El final es fuerte si la ultima nota EMPIEZA en el 1.er tiempo.
 */
const n = (key, d, o = {}) => ({ key, d, puntillo: o.p ? 1 : 0 });
const r = (d) => ({ silencio: true, d, puntillo: 0 });
const q = (...keys) => keys.map((k) => n(k, 'q'));
const base = { carpeta: 'frase', tipo: 'frase' };
const f44 = (compases, extra = {}) => ({ num: 4, den: 4, compases, ...extra });

const tetico = [q('c/5', 'd/5', 'e/5', 'f/5'), [n('g/5', 'h'), n('e/5', 'h')]];
const anacrusico = [q('g/4'), q('c/5', 'd/5', 'e/5', 'f/5'), [n('g/5', 'h', { p: true }), n('e/5', 'q')]];
const acefalo = [[r('q'), ...q('c/5', 'd/5', 'e/5')], [n('f/5', 'h'), n('d/5', 'h')]];

module.exports = [
  { ...base, slug: 'comienzo-tetico', archivos: ['comienzo-tetico.png'], filas: [f44(tetico)] },
  { ...base, slug: 'comienzo-anacrusico', archivos: ['comienzo-anacrusico.png'], filas: [f44(anacrusico, { sumas: [16, 64, 64] })] },
  { ...base, slug: 'comienzo-acefalo', archivos: ['comienzo-acefalo.png'], filas: [f44(acefalo)] },
  { ...base, slug: 'final-tiempo-fuerte', archivos: ['final-tiempo-fuerte.png'], filas: [f44([q('e/5', 'd/5', 'e/5', 'd/5'), [n('c/5', 'w')]], { barraFinal: 'end' })] },
  { ...base, slug: 'final-tiempo-debil', archivos: ['final-tiempo-debil.png'], filas: [f44([q('e/5', 'd/5', 'e/5', 'd/5'), [n('d/5', 'h'), n('c/5', 'h')]], { barraFinal: 'end' })] },
  {
    ...base, slug: 'comienzo-comparativa', archivos: ['comienzo-comparativa.png'],
    filas: [
      f44([q('c/5', 'd/5', 'e/5', 'f/5')], { rotulo: 'Tético · empieza en el tiempo fuerte' }),
      f44([q('g/4'), q('c/5', 'd/5', 'e/5')], { rotulo: 'Anacrúsico · antes del tiempo fuerte', sumas: [16, 48] }),
      f44([[r('q'), ...q('c/5', 'd/5', 'e/5')]], { rotulo: 'Acéfalo · tras un silencio en el tiempo fuerte' }),
    ],
  },
];
