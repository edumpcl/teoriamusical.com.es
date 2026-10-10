/**
 * tm-notacion.js — dibuja partituras en el navegador con Verovio (los motores de ejercicios lo usan en lugar de VexFlow).
 *
 * Verovio pesa ~1,7 MB (brotli): se carga BAJO DEMANDA, la primera vez que un motor pide dibujar, y se cachea para siempre
 * (/assets es inmutable). Hasta entonces la pagina solo carga este fichero (unos pocos KB).
 *
 *   tmNotacion.dibujar(contenedor, fila, opciones)  ->  Promise<{ svg, ancho, alto, lineas, ... }>
 *
 * `fila` es la misma descripcion musical que usa el generador de imagenes del diccionario (ver tm-mei.js): clave, armadura,
 * compas, notas ('c/4', 'eb/4'...), silencios, barras, grupos de valoracion especial, etc. El MEI lo construye tm-mei.js, que es
 * el MISMO codigo que ya esta verificado en las imagenes: lo que un ejercicio dibuja sale del mismo camino.
 *
 * Opciones: semilla (fija los ids; solo para pruebas), separacion (spacingLinear), escala (multiplica el tamano), alt (texto
 * alternativo para lectores de pantalla), id (prefijo para ids unicos), color (de las notas dibujadas).
 */
(function (raiz) {
  'use strict';
  var VERSION = '6.3.0';
  var BASE = '/assets/vendor/verovio/';
  var PX_POR_UNIDAD = 11 / 7.2;   // ~11 px entre lineas (igual que las imagenes del diccionario)
  var OPCIONES = {
    font: 'Leland', scale: 40, adjustPageWidth: true, adjustPageHeight: true,
    header: 'none', footer: 'none', breaks: 'none', svgViewBox: true, svgRemoveXlink: true,
    pageMarginLeft: 10, pageMarginRight: 10, pageMarginTop: 10, pageMarginBottom: 10,
    spacingNonLinear: 0.6
  };
  var cargando = null, toolkit = null, contador = 0;

  /** Carga Verovio (una sola vez). Devuelve una promesa del toolkit. */
  function listo() {
    if (cargando) return cargando;
    cargando = (async function () {
      var v = VERSION.replace(/\./g, '');   // «630»: sin puntos en la URL (algunos navegadores/servidores lo toman por extension)
      var mod = await import(BASE + 'verovio-module.mjs?v=' + v);
      var env = await import(BASE + 'verovio.mjs?v=' + v);
      var wasm = await mod.default();
      toolkit = new env.VerovioToolkit(wasm);
      return toolkit;
    })();
    return cargando;
  }

  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 2147483000; return h + 1; }
  var escAttr = function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); };

  /** MEI de una fila. */
  function mei(fila) { return fila.pentagramas ? raiz.tmMEI.aMEIsistema(fila) : raiz.tmMEI.aMEI(fila); }

  /** SVG de una fila (sin tocar el DOM): { svg, ancho, alto } con ancho/alto en px. */
  async function svg(fila, op) { await listo(); return svgSync(fila, op); }

  /** Lo mismo, SIN esperar: solo vale cuando Verovio ya esta cargado (tmNotacion.cargado()). Los motores lo usan tras `await listo()`. */
  function svgSync(fila, op) {
    op = op || {};
    var tk = toolkit;
    if (!tk) throw new Error('Verovio todavia no esta cargado: espera a tmNotacion.listo()');
    var semilla = op.semilla || hash((op.id || 'tm') + '#' + (++contador));   // ids unicos: varios dibujos conviven en la misma pagina
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: semilla, spacingLinear: op.separacion || 0.25, pageMarginLeft: op.margenIzq || OPCIONES.pageMarginLeft }));
    if (!tk.loadData(mei(fila))) throw new Error('Verovio no lee el MEI');
    var s = tk.renderToSVG(1);
    var vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(s);
    var k = PX_POR_UNIDAD * (op.escala || 1);
    var w = Math.round(Number(vb[1]) * k), h = Math.round(Number(vb[2]) * k);
    var id = (/<svg [^>]* id="([^"]+)"/.exec(s) || [])[1];
    s = s.replace(/<desc>[\s\S]*?<\/desc>\s*/, '').replace(/xlink:href=/g, 'href=').replace(/\s*xmlns:xlink="[^"]*"/, '');
    s = s.replace(/<svg [^>]*>/, '<svg id="' + id + '" viewBox="0 0 ' + vb[1] + ' ' + vb[2] + '" width="' + w + '" height="' + h + '" role="img" xmlns="http://www.w3.org/2000/svg"><title>' + escAttr(op.alt || '') + '</title>');
    return { svg: s.trim(), ancho: w, alto: h };
  }

  /** Dibuja una fila dentro de `contenedor` y devuelve la geometria medida en el DOM (px CSS, relativos al contenedor). */
  async function dibujar(contenedor, fila, op) { await listo(); return dibujarSync(contenedor, fila, op); }

  function dibujarSync(contenedor, fila, op) {
    var r = svgSync(fila, op);
    contenedor.innerHTML = r.svg;
    var el = contenedor.querySelector('svg');
    el.style.maxWidth = '100%'; el.style.height = 'auto';
    r.elemento = el;
    r.geometria = function () { return geometria(el); };
    return r;
  }

  /**
   * Geometria del dibujo, en px CSS relativos a la esquina superior izquierda del <svg>:
   *   lineas: la y de cada una de las 5 lineas (de arriba abajo), y de aqui la posicion de cualquier altura;
   *   cabezas: [{ x, y, ancho }] en orden.
   * Se mide con getBoundingClientRect, asi que vale a cualquier tamano y con cualquier escala.
   */
  function geometria(el) {
    var caja = el.getBoundingClientRect();
    // solo las lineas del pentagrama (hijas directas de .staff): las lineas adicionales de una nota, equiespaciadas con ellas, no cuentan
    var lineasStaff = el.querySelectorAll('.staff > path[stroke-width="13"]');
    var horizontales = Array.prototype.slice.call(lineasStaff.length ? lineasStaff : el.querySelectorAll('path[stroke-width="13"]')).map(function (p) {
      var b = p.getBoundingClientRect();
      return b.width > 4 * b.height ? { y: b.top + b.height / 2 - caja.top } : null;
    }).filter(Boolean).map(function (o) { return Math.round(o.y * 100) / 100; });
    var unicas = horizontales.filter(function (y, i) { return horizontales.indexOf(y) === i; }).sort(function (a, b) { return a - b; });
    // las 5 lineas: equiespaciadas
    var lineas = null;
    for (var i = 0; i + 4 < unicas.length && !lineas; i++) {
      var d = unicas[i + 1] - unicas[i];
      if ([2, 3, 4].every(function (k) { return Math.abs(unicas[i + k] - unicas[i + k - 1] - d) < 0.6; })) lineas = unicas.slice(i, i + 5);
    }
    var cabezas = Array.prototype.slice.call(el.querySelectorAll('.notehead use')).map(function (u) {
      var b = u.getBoundingClientRect();
      return { x: b.left - caja.left, y: b.top + b.height / 2 - caja.top, ancho: b.width };
    });
    return { lineas: lineas, cabezas: cabezas, ancho: caja.width, alto: caja.height };
  }

  /**
   * Como dibujarSync, pero con la linea SUPERIOR del pentagrama siempre a op.top px del borde del contenedor, sea cual sea la altura
   * del contenido (Verovio recorta el SVG: una nota con lineas adicionales lo alarga y moveria el pentagrama). El contenedor debe tener
   * altura fija. Para el primer pentagrama de un sistema.
   */
  function dibujarAlineado(contenedor, fila, op) {
    var r = dibujarSync(contenedor, fila, op);
    var g = r.geometria();
    r.elemento.style.display = 'block'; r.elemento.style.margin = '0 auto';
    if (g.lineas) r.elemento.style.marginTop = Math.round(op.top - g.lineas[0]) + 'px';
    return r;
  }

  raiz.tmNotacion = {
    listo: listo, cargado: function () { return !!toolkit; }, mei: mei,
    svg: svg, svgSync: svgSync, dibujar: dibujar, dibujarSync: dibujarSync, dibujarAlineado: dibujarAlineado, geometria: geometria, VERSION: VERSION
  };
})(typeof self !== 'undefined' ? self : this);
