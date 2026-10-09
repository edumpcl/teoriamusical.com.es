'use strict';
/**
 * Grupos de valoracion especial (tresillo, dosillo, cuatrillo, quintillo, seisillo, septillo) de
 * /diccionario-musical/grupos-de-valoracion-especial/ y de sus paginas hijas (tresillo, dosillo).
 * Datos de generate-grupos.js, generate-tresillo.js y generate-dosillo.js (VexFlow), con el modelo de compases-cifra.js.
 * La equivalencia es la de la pagina (tradicion espanola): tresillo 3:2, dosillo 2:3, cuatrillo 4:6, seisillo 6:4;
 * quintillo y septillo no tienen equivalencia unica (depende del contexto) y se escriben como en el generador antiguo.
 * Todas las plicas hacia arriba, para que el corchete y el numero del grupo queden encima.
 */
const ev = (d, o = {}) => ({ key: 'a/4', d, puntillo: o.p ? 1 : 0, plica: 'up', barra: o.barra });

/** Un grupo: `n` figuras iguales en un solo compas (con barra si son corcheas o menores). */
function grupoSolo(n, d, numbase) {
  return { compases: [Array.from({ length: n }, () => ev(d, { barra: 0 }))], tuplets: [{ c: 0, ini: 0, fin: n - 1, num: n, numbase }] };
}
const GRUPOS = [
  ['grupo-tresillo', 3, '8', 2], ['grupo-dosillo', 2, '8', 3], ['grupo-cuatrillo', 4, '8', 6],
  ['grupo-quintillo', 5, '16', 4], ['grupo-seisillo', 6, '16', 4], ['grupo-septillo', 7, '16', 4],
];
const grupos = GRUPOS.map(([slug, n, d, nb]) => ({ slug, archivos: [slug + '.png'], carpeta: 'figuras', tipo: 'grupo', escala: 1.5, filas: [grupoSolo(n, d, nb)] }));

/** Varios grupos seguidos con su rotulo debajo. Cada grupo: { d, n, tupla: numbase | undefined, p: puntillo, barra, rotulo } */
function fila(grupos, cifra) {
  const compas = [], tuplets = [], textos = [];
  grupos.forEach((g, gi) => {
    const ini = compas.length;
    for (let i = 0; i < g.n; i++) compas.push(ev(g.d, { p: g.p, barra: DUR_BARRA.has(g.d) && g.n > 1 ? gi : undefined }));
    if (g.tupla) tuplets.push({ c: 0, ini, fin: compas.length - 1, num: g.n, numbase: g.tupla });
    textos.push({ texto: g.rotulo, ref: 'abajo', grupo: Array.from({ length: g.n }, (_, i) => ini + i) });
  });
  return { ...(cifra || {}), compases: [compas], tuplets, textos };
}
const DUR_BARRA = new Set(['8', '16', '32']);
const base = { carpeta: 'compases' };

const comparaciones = [
  { ...base, slug: 'tresillo-comparacion', archivos: ['tresillo-comparacion.png'], tipo: 'comparacion', filas: [fila([{ d: '8', n: 2, rotulo: 'dos corcheas' }, { d: '8', n: 3, tupla: 2, rotulo: 'tresillo' }], { num: 2, den: 4 })] },
  { ...base, slug: 'dosillo-comparacion', archivos: ['dosillo-comparacion.png'], tipo: 'comparacion', filas: [fila([{ d: '8', n: 3, rotulo: 'tres corcheas' }, { d: '8', n: 2, tupla: 3, rotulo: 'dosillo' }], { num: 6, den: 8 })] },
];
const tipos = ['tresillo', 'dosillo'].map((nombre) => {
  const tupla = nombre === 'tresillo' ? 2 : 3, n = nombre === 'tresillo' ? 3 : 2;
  // tres filas apiladas (una por tipo, con su rotulo encima): asi el rotulo se lee grande tambien en el movil
  const fila1 = (d, rotulo) => ({ ...fila([{ d, n, tupla, rotulo: '' }]), textos: [], rotulo });
  return { ...base, slug: 'tipos-de-' + nombre, archivos: ['tipos-de-' + nombre + '.png'], tipo: 'tipos-de-grupo', nombre, filas: [fila1('q', 'de negra'), fila1('8', 'de corchea'), fila1('16', 'de semicorchea')] };
});
// el «tresillo latino» NO es un grupo de valoracion especial: es el patron 3+3+2 de corcheas (negra con puntillo, negra con puntillo, negra)
const latino = {
  ...base, slug: 'tresillo-latino', archivos: ['tresillo-latino.png'], tipo: 'tresillo-latino',
  filas: [{
    num: 4, den: 4,
    compases: [[ev('q', { p: true }), ev('q', { p: true }), ev('q')]],
    textos: [{ texto: '3', ref: 'abajo', nota: 0 }, { texto: '3', ref: 'abajo', nota: 1 }, { texto: '2', ref: 'abajo', nota: 2 }],
  }],
};

module.exports = [...grupos, ...comparaciones, ...tipos, latino];
