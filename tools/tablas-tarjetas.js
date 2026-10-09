'use strict';
/**
 * Tablas con imagenes de notacion -> «tarjetas» en el movil (sin desplazamiento horizontal).
 *
 *   node tools/tablas-tarjetas.js            # pone/actualiza la marca en las paginas listadas
 *   node tools/tablas-tarjetas.js --quitar   # la deshace (inverso exacto)
 *
 * Que hace: a cada tabla de la lista le pone la clase `tm-table--tarjetas`, a cada celda con imagen la clase
 * `tm-celda-img`, y a cada celda un `data-label` con el texto de su columna (de <thead>). El CSS (style.css, bloque
 * «Tablas en tarjetas») solo actua por debajo de 640 px: la imagen a la izquierda, a tamano legible, y los datos a
 * su derecha con su etiqueta. En escritorio no cambia nada. La tabla sigue siendo una tabla (accesible, indexable).
 */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

// pagina -> tablas (por orden de aparicion en la pagina, contando solo las que llevan imagenes)
const PAGINAS = [
  'diccionario-musical/figuras-musicales',
  'diccionario-musical/puntillo',
  'diccionario-musical/alteraciones',
  'diccionario-musical/grupos-de-valoracion-especial',
  'diccionario-musical/notas-de-la-flauta-travesera',
  'diccionario-musical/notas-del-oboe',
];
const quitar = process.argv.includes('--quitar');
const limpia = (t) => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

let tablas = 0;
for (const pag of PAGINAS) {
  const f = path.join(RAIZ, pag, 'index.html');
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/<table class="tm-table( tm-table--tarjetas)?">([\s\S]*?)<\/table>/g, (todo, marca, cuerpo) => {
    if (!/<img /.test(cuerpo)) return todo;   // solo las tablas con imagenes
    const cabeceras = [...cuerpo.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => limpia(m[1]));
    if (quitar) {
      return todo.replace(' tm-table--tarjetas', '').replace(/ data-label="[^"]*"/g, '').replace(/<td class="tm-celda-img">/g, '<td>');
    }
    tablas++;
    const conCeldas = cuerpo.replace(/<tbody>([\s\S]*?)<\/tbody>/, (t, filas) => '<tbody>' + filas.replace(/<tr>([\s\S]*?)<\/tr>/g, (tr, celdas) => {
      let i = 0;
      return '<tr>' + celdas.replace(/<td(?: class="tm-celda-img")?(?: data-label="[^"]*")?>([\s\S]*?)<\/td>/g, (td, interior) => {
        const etiqueta = cabeceras[i++] || '';
        const clase = /<img /.test(interior) ? ' class="tm-celda-img"' : '';
        return `<td${clase} data-label="${esc(etiqueta)}">${interior}</td>`;
      }) + '</tr>';
    }) + '</tbody>');
    if (cabeceras.length === 0) throw new Error('tabla sin cabecera en ' + pag);
    return `<table class="tm-table tm-table--tarjetas">${conCeldas}</table>`;
  });
  fs.writeFileSync(f, html);
}
console.log(quitar ? 'marcas quitadas' : `${tablas} tablas marcadas en ${PAGINAS.length} paginas`);
