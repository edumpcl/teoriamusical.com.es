'use strict';
/**
 * Ejemplos de intervalos de la entrada del blog «Cómo calcular intervalos paso a paso»: dos notas seguidas (melodico), en
 * blancas, clave de sol. Datos de generate-blog-notacion.js (VexFlow), con el modelo de compases-cifra.js.
 * El alt dice las notas («de Do a La») y el intervalo («6ª mayor»): el verificador calcula el intervalo de lo dibujado
 * (grados y semitonos) y tiene que dar exactamente ese nombre.
 */
const h = (key) => ({ key, d: 'h', puntillo: 0 });
const IV = [['blog-iv-do-la', 'c/4', 'a/4'], ['blog-iv-re-fa', 'd/4', 'f/4'], ['blog-iv-fa-si', 'f/4', 'b/4'], ['blog-iv-do-mib', 'c/4', 'eb/4']];
module.exports = IV.map(([slug, a, b]) => ({
  slug, archivos: [slug + '.png'], carpeta: 'intervalos', tipo: 'intervalo-melodico', escala: 1.3,
  filas: [{ compases: [[h(a), h(b)]] }],
}));
