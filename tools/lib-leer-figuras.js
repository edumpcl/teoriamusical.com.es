'use strict';
/**
 * Lectura de lo que DIBUJA Verovio en un ejercicio de figuras (assets/js/figuras-engine.js), para las auditorias:
 *   - tools/verificar-figuras.js  (recalcula respuestas con tablas propias a partir de lo dibujado)
 *   - tools/test-motor-figuras.js (banco de los ejercicios en pantalla)
 *
 *   const { leerFiguras, fuente } = require('./lib-leer-figuras.js');
 *   // dentro de la pagina:  window.__leerFiguras = <fuente>;   despues  window.__leerFiguras(svg)
 *
 * leerFiguras(svg) -> { cifra: '6/8' | null, compases: 1 | 2, primeroLleva: n (notas del 1.er compas),
 *                       notas: [{ duracion: 'w'|'h'|'q'|'8'|'16', silencio, puntillos, plica: 1|-1|0, clave: 'a/4', x, y }],
 *                       curvas: [{ clase: 'union'|'expresion', desde, hasta }] }
 * La duracion sale de la cabeza (blanca/negra), de la bandera o del numero de barras que cubren la plica; los puntillos, de los puntos
 * dibujados; la altura, de la posicion contra las 5 lineas (Mi4 = 1.ª linea); la cifra, de los digitos del compas.
 */
function leerFiguras(svg) {
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; }))].sort((a, b) => a - b);
  const esp = lineas.length === 5 ? (lineas[4] - lineas[0]) / 4 : 0;
  const LETRAS = 'cdefgab';
  const clave = (y) => { const paso = 30 + Math.round((lineas[4] - y) / (esp / 2)); return LETRAS[((paso % 7) + 7) % 7] + '/' + Math.floor(paso / 7); };
  const centro = (el) => { const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, l: b.left, r: b.right, t: b.top, b: b.bottom }; };
  // barras: cada polygon es un tramo; los tramos que se tocan (el borde derecho de uno es el izquierdo del siguiente) son UNA misma barra
  const tramos = [...svg.querySelectorAll('.beam polygon')].map((p) => {
    const m = p.getScreenCTM(), pts = [...p.points].map((q) => { const s = svg.createSVGPoint(); s.x = q.x; s.y = q.y; return s.matrixTransform(m); });
    const xs = pts.map((q) => q.x), x0 = Math.min(...xs), x1 = Math.max(...xs);
    const borde = (x) => { const v = pts.filter((q) => Math.abs(q.x - x) < 1.5); return v.reduce((a, q) => a + q.y, 0) / v.length; };
    return { l: x0, r: x1, yl: borde(x0), yr: borde(x1), grupo: null };
  });
  tramos.forEach((a, i) => { a.grupo = i; });
  for (let k = 0; k < tramos.length; k++) tramos.forEach((a) => tramos.forEach((b) => {
    if (a !== b && Math.abs(a.r - b.l) <= 2 && Math.abs(a.yr - b.yl) <= 2.5) { const g = Math.min(a.grupo, b.grupo); a.grupo = g; b.grupo = g; }
  }));
  const barras = [];
  [...new Set(tramos.map((x) => x.grupo))].forEach((g) => { const t = tramos.filter((x) => x.grupo === g); barras.push({ l: Math.min(...t.map((x) => x.l)), r: Math.max(...t.map((x) => x.r)) }); });
  const notas = [];
  [...svg.querySelectorAll('.note, .rest')].forEach((g) => {
    const esSilencio = g.classList.contains('rest');
    const cab = esSilencio ? g.querySelector('use') : g.querySelector('.notehead use');
    const c = centro(cab), glifo = id(cab);
    const puntillos = g.querySelectorAll('.dots ellipse, .dots use').length;
    const x = {};
    x.silencio = esSilencio; x.puntillos = puntillos; x.x = c.x; x.y = c.y;
    if (esSilencio) {
      x.duracion = { E4E3: 'w', E4E4: 'h', E4E5: 'q', E4E6: '8', E4E7: '16' }[glifo] || ('?' + glifo);
      x.plica = 0; x.clave = null;
    } else {
      x.clave = clave(c.y);
      const plica = g.querySelector('.stem path, .stem');
      let sx = c.x, sentido = 0;
      if (plica) { const s = centro(plica); sx = s.x; sentido = s.y < c.y ? 1 : -1; }
      x.plica = sentido;
      if (glifo === 'E0A2') x.duracion = 'w';
      else if (glifo === 'E0A3') x.duracion = 'h';
      else {
        const banderas = g.querySelectorAll('.flag use');
        if (banderas.length) { const f = id(banderas[0]); x.duracion = (f === 'E240' || f === 'E241') ? '8' : (f === 'E242' || f === 'E243') ? '16' : ('?' + f); }
        else if (!plica) x.duracion = '?sin-plica';
        else { const n = barras.filter((b) => sx >= b.l - 1.5 && sx <= b.r + 1.5).length; x.duracion = n === 0 ? 'q' : n === 1 ? '8' : n === 2 ? '16' : ('?' + n + ' barras'); }
      }
    }
    notas.push(x);
  });
  // cifra: digitos de la armadura de compas, por filas (numerador arriba)
  const digs = [...svg.querySelectorAll('.meterSig use')].map((u) => { const c = centro(u); return { n: Number(id(u).replace('E08', '')), x: c.x, y: c.y }; });
  let cifra = null;
  if (digs.length) {
    const ys = [...new Set(digs.map((d) => Math.round(d.y)))].sort((a, b) => a - b);
    const fila = (y) => digs.filter((d) => Math.round(d.y) === y).sort((a, b) => a.x - b.x).map((d) => d.n).join('');
    cifra = fila(ys[0]) + '/' + fila(ys[ys.length - 1]);
  }
  const compases = svg.querySelectorAll('.measure').length;
  const primeroLleva = compases > 1 ? svg.querySelector('.measure').querySelectorAll('.note, .rest').length : notas.length;
  // curvas (ligaduras de union y de expresion): de que nota a que nota van, por la posicion en x
  const curvas = [];
  const cercana = (x, desdeIzq) => {
    let mejor = 0, d = Infinity;
    notas.forEach((n, i) => { const dd = Math.abs(n.x - x); if (dd < d) { d = dd; mejor = i; } });
    return mejor;
  };
  [...svg.querySelectorAll('.tie, .slur')].forEach((g) => {
    const b = centro(g.querySelector('path') || g);
    let i0 = -1, i1 = -1;
    notas.forEach((n, i) => { if (n.x <= b.l + 6) i0 = i; });
    notas.forEach((n, i) => { if (i1 < 0 && n.x >= b.r - 6) i1 = i; });
    if (i0 < 0) i0 = cercana(b.l); if (i1 < 0) i1 = cercana(b.r);
    curvas.push({ clase: g.classList.contains('tie') ? 'union' : 'expresion', desde: i0, hasta: i1 });
  });
  return { cifra, compases, primeroLleva, notas, curvas, lineas: lineas.length };
}

module.exports = { leerFiguras, fuente: leerFiguras.toString() };
