'use strict';
/**
 * Ayudante de los generadores de fichas PDF: abre una pagina de Playwright con la ficha (HTML a medida) y con tm-mei.js, tm-notacion.js
 * (Verovio) y los motores que hagan falta, SIN servidor: las rutas http://tm.local/... se sirven desde el repositorio.
 *
 *   const { cargarFicha } = require('./lib-ficha-verovio.js');
 *   await cargarFicha(page, html, ['assets/js/completar-compas-engine.js']);   // despues, page.evaluate(...) con tmNotacion ya cargado
 *
 * Tambien exporta escalarUniforme(), que se ejecuta DENTRO de la pagina: pone todos los dibujos de una rejilla a la misma
 * escala (la mayor, hasta `maximo`, que quepa en las casillas): Verovio recorta cada SVG a su contenido y su ancho natural varia.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };

async function cargarFicha(page, html, scripts) {
  await page.route('http://tm.local/**', (r) => {
    const u = new URL(r.request().url());
    if (u.pathname === '/_ficha.html') return r.fulfill({ contentType: TIPOS['.html'], body: html });
    const f = path.join(RAIZ, decodeURIComponent(u.pathname));
    if (!f.startsWith(RAIZ) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return r.fulfill({ status: 404, body: '404' });
    return r.fulfill({ contentType: TIPOS[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
  });
  await page.goto('http://tm.local/_ficha.html', { waitUntil: 'load' });
  for (const s of ['assets/js/tm-mei.js', 'assets/js/tm-notacion.js'].concat(scripts || [])) await page.addScriptTag({ url: 'http://tm.local/' + s });
  await page.evaluate(() => window.tmNotacion.listo());
}

/** Dentro de la pagina: todos los <svg> de las rejillas dadas a la misma escala. relleno = px que no son dibujo en cada casilla. */
function escalarUniforme(selectorRejilla, selectorCasilla, relleno, maximo) {
  document.querySelectorAll(selectorRejilla).forEach((rej) => {
    const svgs = [...rej.querySelectorAll('svg')].filter((s) => s.getAttribute('width'));
    if (!svgs.length) return;
    // primero se encogen todos: con su ancho natural los dibujos ensanchan las columnas de la rejilla y la casilla se mediria de mas
    svgs.forEach((s) => { s.style.width = '10px'; s.style.maxWidth = 'none'; });
    // cada dibujo cabe en SU casilla (las anchas ocupan dos columnas); la escala es la menor de todas
    let K = maximo;
    svgs.forEach((s) => { K = Math.min(K, (s.closest(selectorCasilla).clientWidth - relleno) / Number(s.getAttribute('width'))); });
    svgs.forEach((s) => { s.style.width = (Number(s.getAttribute('width')) * K) + 'px'; s.style.height = 'auto'; s.style.maxWidth = 'none'; });
  });
}

module.exports = { cargarFicha, escalarUniforme, RAIZ };
