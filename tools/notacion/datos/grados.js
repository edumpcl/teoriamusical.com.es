'use strict';
/**
 * Grados tonales y modales de la escala (/diccionario-musical/nombres-de-los-grados-de-la-escala/), en Do mayor y en
 * Do menor (natural, armadura de 3 bemoles): las ocho notas con su numero romano debajo, y en rojo los grados que
 * nombra la imagen (tonales I, IV y V; modales III, VI y VII). Antes WordPress 2021 (Grados-*-1024x131.png).
 */
const ROJO = '#d00000';
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'I'];
const MAYOR = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
const MENOR = ['c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5'];   // do menor natural: las alteraciones las pone la armadura
const TONALES = [0, 3, 4], MODALES = [2, 5, 6];

const imagen = (archivo, slug, notas, armadura, rojos) => ({
  slug, archivos: [`01/${archivo}-1024x131.png`], carpeta: 'grados', tipo: 'grados', modo: armadura ? 'menor' : 'mayor', grupo: rojos === TONALES ? 'tonales' : 'modales',
  filas: [{
    fino: 'compacto', holgura: 260, armadura, sinBarraFinal: true,
    compases: [notas.map((key, i) => ({ key, d: 'w', puntillo: 0, color: rojos.includes(i) ? ROJO : undefined }))],
    textos: ROMANOS.map((r, i) => ({ texto: r, ref: 'pie', nota: i, familia: 'Georgia, serif', size: 340 })),
  }],
});

module.exports = [
  imagen('Grados-tonales', 'grados-tonales-mayor', MAYOR, 0, TONALES),
  imagen('Grados-tonales-2', 'grados-tonales-menor', MENOR, -3, TONALES),
  imagen('Grados-modales', 'grados-modales-mayor', MAYOR, 0, MODALES),
  imagen('Grados-modales-2', 'grados-modales-menor', MENOR, -3, MODALES),
];
