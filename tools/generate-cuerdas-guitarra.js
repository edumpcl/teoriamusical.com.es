/**
 * ⚠️ NO USAR TAL CUAL — DESCARTADO EL 2026-09-07 (decision de Eduardo).
 *
 * La imagen que genera NO esta publicada en ninguna pagina y NO debe publicarse
 * sin resolver antes esto: la ORIENTACION de las cuerdas en mastil.jpg quedo sin
 * confirmar. La medicion (brillo + grosor, sobre mastil.jpg e instrumento.jpg)
 * dice que arriba esta la 1a (Mi agudo) y abajo la 6a. Pero la convencion del
 * sitio es la contraria: el SVG que ya vive en notas-de-la-guitarra rotula "la
 * 6a (Mi grave) arriba", y afinador/guitarra describe la 6a como "la mas cercana
 * al techo". Publicar el orden invertido seria un error musical real.
 *
 * La pagina YA tiene un diagrama SVG correcto de las seis cuerdas: esa es la
 * version buena. Este script se conserva solo por si algun dia se consigue una
 * foto con la orientacion verificada.
 *
 * Si se retoma: confirmar primero cual es el Mi grave en la foto y, si hace
 * falta, voltearla verticalmente antes de rotular.
 */

/**
 * Diagrama de LAS 6 CUERDAS AL AIRE de la guitarra.
 *   node tools/generate-cuerdas-guitarra.js
 * Salida: assets/img/guitarra/cuerdas-al-aire.png  (+ .webp con convert_to_webp.py)
 *
 * Por que existe: "notas de las cuerdas de la guitarra" y sus variantes suman
 * ~800 impresiones/mes con CERO clics (GSC, sep-2026). Es una consulta VISUAL y
 * la pagina solo tenia texto. Este diagrama es la respuesta en una imagen.
 *
 * Sigue el patron de la casa (ver project-digitaciones-fotos-reales):
 * FOTO REAL del instrumento + la senalizacion encima, no un dibujo generico.
 *
 * OJO: la premisa de partida era falsa. Se dijo que la pagina "solo tenia texto"
 * contando etiquetas <img>, y resulta que YA tiene un diagrama SVG en linea de
 * las seis cuerdas. La pagina no estaba tan falta de visual.
 *
 * Las posiciones de las cuerdas NO estan puestas a ojo: se detectaron sobre
 * mastil.jpg (1190x430) buscando las lineas claras del perfil vertical en
 * x=250/450/650/850 y ajustando una recta por cuerda (residuo maximo 0,4 px).
 *
 * ORDEN DE LAS CUERDAS — SIN CONFIRMAR (ver el aviso de arriba). La medicion
 * dice que de ARRIBA a ABAJO en la foto van 1a->6a, por dos vias que coinciden
 * entre si pero que NO zanjan el asunto (ambas leen reflectancia, no la nota):
 *  - Sobre el diapason oscuro las tres de arriba salen a brillo ~220 y las de
 *    abajo a ~130: nylon liso (1a-2a-3a) frente a entorchado metalico (4a-5a-6a).
 *  - En instrumento.jpg, sobre la tapa clara, se invierte el contraste (el nylon
 *    casi desaparece y el metal destaca) y ademas se ve que las de abajo son
 *    mas gruesas. Las dos fotos coinciden.
 *
 * Etiquetas en Arial alto contraste #1a1a1a (ver feedback-etiquetas-imagenes:
 * NADA de dorado pequeno, se ve hueco).
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// La foto va incrustada como data URI: con page.setContent() las rutas
// relativas no resuelven contra el disco, y la captura salia sin imagen.
const FOTO_B64 = 'data:image/jpeg;base64,' + fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'img', 'guitarra', 'mastil.jpg')
).toString('base64');

// Recta y = m*x + b de cada cuerda sobre mastil.jpg, de la 1a (arriba) a la 6a.
const CUERDAS = [
  { n: '1.ª', nota: 'Mi₄',  m: -0.0950, b: 190.75, tipo: 'nylon' },
  { n: '2.ª', nota: 'Si₃',  m: -0.0915, b: 218.08, tipo: 'nylon' },
  { n: '3.ª', nota: 'Sol₃', m: -0.0865, b: 243.83, tipo: 'nylon' },
  { n: '4.ª', nota: 'Re₃',  m: -0.0815, b: 269.58, tipo: 'entorchada' },
  { n: '5.ª', nota: 'La₂',  m: -0.0765, b: 296.33, tipo: 'entorchada' },
  { n: '6.ª', nota: 'Mi₂',  m: -0.0735, b: 323.68, tipo: 'entorchada' },
];

const FOTO_W = 1190, FOTO_H = 430;
// La foto trae mucho blanco arriba y abajo. Las cuerdas ocupan y=83..324, asi
// que se recorta a esa banda: en movil el diagrama se ve el doble de grande.
const RECORTE_Y = 52;            // px que se suben de la foto
const VISIBLE_H = 300;           // alto util tras el recorte
const MARGEN = 250;              // columna de etiquetas a la izquierda
const CABECERA = 58;
const ANCHO = MARGEN + FOTO_W;
const ALTO = CABECERA + VISIBLE_H;

const filas = CUERDAS.map((c) => {
  const y = CABECERA + c.b - RECORTE_Y;        // y de la cuerda ya con el recorte aplicado
  return { ...c, y };
}).map((c) => `
  <div class="fila" style="top:${(c.y - 15).toFixed(1)}px">
    <span class="num">${c.n}</span><span class="nota">${c.nota}</span>
  </div>
  <div class="guia" style="top:${c.y.toFixed(1)}px"></div>`).join('');

const HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
  body { margin:0; background:#fff; }
  #wrap { position:relative; width:${ANCHO}px; height:${ALTO}px;
          font-family: Arial, Helvetica, sans-serif; background:#fff; }
  #titulo { position:absolute; left:0; top:14px; width:${ANCHO}px; text-align:center;
            font-size:26px; font-weight:700; color:#1a1a1a; letter-spacing:.2px; }
  #ventana { position:absolute; left:${MARGEN}px; top:${CABECERA}px;
             width:${FOTO_W}px; height:${VISIBLE_H}px; overflow:hidden; }
  #foto { position:absolute; left:0; top:${-RECORTE_Y}px;
          width:${FOTO_W}px; height:${FOTO_H}px; }
  .fila { position:absolute; left:0; width:${MARGEN - 26}px; height:30px;
          display:flex; align-items:center; justify-content:flex-end; gap:10px; }
  .num  { font-size:19px; color:#5b5b5b; }
  .nota { font-size:25px; font-weight:700; color:#1a1a1a; min-width:74px; text-align:right; }
  /* Linea guia desde la etiqueta hasta el arranque de la cuerda */
  .guia { position:absolute; left:${MARGEN - 22}px; width:26px; height:2px;
          background:#1a1a1a; }
</style></head><body>
<div id="wrap">
  <div id="titulo">Las 6 cuerdas de la guitarra al aire</div>
  <div id="ventana"><img id="foto" src="${FOTO_B64}"></div>
  ${filas}
</div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setContent(HTML);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => {
    const i = document.getElementById('foto');
    return i && i.complete && i.naturalWidth > 0;
  });
  const salida = path.join(__dirname, '..', 'assets', 'img', 'guitarra', 'cuerdas-al-aire.png');
  await page.locator('#wrap').screenshot({ path: salida });
  console.log('OK -> assets/img/guitarra/cuerdas-al-aire.png');
  await browser.close();
})();
