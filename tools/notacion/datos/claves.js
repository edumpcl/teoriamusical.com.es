'use strict';
/**
 * Claves musicales (/diccionario-musical/claves-musicales/ y /nombres-de-las-notas-musicales/):
 *  - nombres: la escala de Do con el nombre de cada nota, en las 7 claves (antes 2020/01/clave-de-*-1024x174.png);
 *  - glifos: la clave sola sobre un pentagrama corto (glifo-clave-sol/fa/do);
 *  - notas-clave: las 9 notas (lineas y espacios) de la clave, con su nombre (notas-clave-*);
 *  - lineas-adicionales: las notas con lineas adicionales por encima y por debajo, en Sol, Fa y Do en 3.ª;
 *  - equivalencia: el mismo Do central en las 7 claves (rejilla 4 + 3).
 * Datos de generate-clave-glifos.js, generate-claves-notas.js, tools/generate-lineas-adicionales.js y
 * generate-claves-equivalencia.js (VexFlow), con el modelo de compases-cifra.js. Redondas sin plica y rotulos en Arial.
 * Las claves se definen en gen-compases-verovio.js (CLAVES) por su nota de referencia y su linea, no por tablas de alturas.
 */
const w = (key) => ({ key, d: 'w', puntillo: 0 });
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const nombreDe = (key) => NOMBRE[key[0]];
const base = { carpeta: 'claves' };
const AJUSTE = { fino: 'compacto', holgura: 260 };   // rotulos pegados a notas: la separacion justa para que quepan (la imagen se encoge menos en el movil)

/* ---- nombres de las notas en cada clave (antes WordPress 2020) ---- */
const NOMBRES = [
  ['clave-de-Sol', 'sol', 4], ['clave-de-do-en-1ª', 'do1', 4], ['clave-de-do-en-2ª', 'do2', 4], ['clave-de-do-en-3ª', 'do3', 4],
  ['clave-de-do-en-4ª', 'do4', 4], ['clave-de-fa-en-3ª', 'fa3', 3], ['clave-de-fa-en-4ª', 'fa', 3],
];
const ESCALA_DO = ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c'];
const nombres = NOMBRES.map(([archivo, clave, oct]) => ({
  ...base, slug: 'nombres-' + archivo.replace('ª', '').replace(/[A-Z]/g, (c) => c.toLowerCase()), archivos: [`01/${archivo}-1024x174.png`], tipo: 'nombres-notas',
  filas: [{ ...AJUSTE, clave, sinBarraFinal: true, compases: [ESCALA_DO.map((l, i) => w(`${l}/${i === 7 ? oct + 1 : oct}`))], textos: ESCALA_DO.map((l, i) => ({ texto: NOMBRE[l], ref: 'pie', nota: i })) }],
}));

/* ---- glifos de clave: solo la clave y un pentagrama corto ---- */
const glifos = [['glifo-clave-sol', 'sol'], ['glifo-clave-fa', 'fa'], ['glifo-clave-do', 'do3']].map(([slug, clave]) => ({
  ...base, slug, archivos: [slug + '.png'], tipo: 'clave-glifo', filas: [{ clave, sinBarraFinal: true, compases: [[]] }],
}));

/* ---- las 9 notas de la clave, de la linea inferior al espacio de encima de la superior ---- */
const NOTAS_CLAVE = [
  ['notas-clave-sol', 'sol', 'e/4'], ['notas-clave-fa', 'fa', 'g/2'], ['notas-clave-do', 'do3', 'f/3'],
  ['notas-clave-do-1', 'do1', 'c/4'], ['notas-clave-do-2', 'do2', 'a/3'], ['notas-clave-do-4', 'do4', 'd/3'],
];
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const subir = (key, pasos) => { const [l, o] = key.split('/'); const p = Number(o) * 7 + LETRAS.indexOf(l) + pasos; return LETRAS[p % 7] + '/' + Math.floor(p / 7); };
const notasClave = NOTAS_CLAVE.map(([slug, clave, primera]) => {
  const keys = Array.from({ length: 9 }, (_, i) => subir(primera, i));
  return { ...base, slug, archivos: [slug + '.png'], tipo: 'notas-clave', filas: [{ ...AJUSTE, clave, sinBarraFinal: true, compases: [keys.map(w)], textos: keys.map((k, i) => ({ texto: nombreDe(k), ref: 'pie', nota: i, peso: '700' })) }] };
});

/* ---- lineas adicionales ---- */
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const nombreOct = (key) => nombreDe(key) + SUB[Number(key.split('/')[1])];
const LINEAS = [
  ['lineas-adicionales-clave-sol', 'sol', ['a/3', 'b/3', 'c/4', 'g/5', 'a/5', 'b/5', 'c/6']],
  ['lineas-adicionales-clave-fa', 'fa', ['c/2', 'd/2', 'e/2', 'f/2', 'b/3', 'c/4', 'd/4', 'e/4']],
  ['lineas-adicionales-clave-do', 'do3', ['d/3', 'e/3', 'f/3', 'g/4', 'a/4', 'b/4', 'c/5']],
];
const lineasAdicionales = LINEAS.map(([slug, clave, keys]) => ({
  ...base, slug, archivos: [slug + '.png'], tipo: 'lineas-adicionales',
  filas: [{ ...AJUSTE, clave, sinBarraFinal: true, compases: [keys.map(w)], textos: keys.map((k, i) => ({ texto: nombreOct(k), ref: 'pie', nota: i, peso: '700' })) }],
}));

/* ---- el mismo Do central en las siete claves ---- */
const EQUIV = [['sol', 'Sol en 2ª'], ['do1', 'Do en 1ª'], ['do2', 'Do en 2ª'], ['do3', 'Do en 3ª'], ['do4', 'Do en 4ª'], ['fa3', 'Fa en 3ª'], ['fa', 'Fa en 4ª']];
const equivalencia = {
  ...base, slug: 'equivalencia-claves-do-central', archivos: ['equivalencia-claves-do-central.png'], tipo: 'equivalencia-claves', columnas: 4, movil: 2, marcoComun: true,
  filas: EQUIV.map(([clave, texto]) => ({ clave, sinBarraFinal: true, compases: [[w('c/4')]], textos: [{ texto, ref: 'abajo', nota: 0, peso: '700' }] })),
};

module.exports = [...nombres, ...glifos, ...notasClave, ...lineasAdicionales, equivalencia];
