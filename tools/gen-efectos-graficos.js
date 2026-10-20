'use strict';
/**
 * Gráficos de las páginas de efectos de ejecución (SVG, de la altura de una nota en el tiempo, en cents):
 *   vibrato-curvas.svg      sin vibrato y tres vibratos (velocidad y anchura distintas)       → /efectos-de-ejecucion/vibrato/
 *   portamento-curvas.svg   salto directo, portamento (curva suave) y glissando (recta)        → /efectos-de-ejecucion/portamento/
 * Las cifras (velocidad, anchura, momentos y duraciones) son las MISMAS de los botones de audio de cada página (data-...).
 *
 *   node tools/gen-efectos-graficos.js              # genera y verifica
 *   node tools/gen-efectos-graficos.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN: se relee el SVG y de cada curva se mide lo que se ve: cuántas veces oscila y hasta cuántos cents (vibrato); cuándo salta o
 * empieza y acaba de subir, y qué fracción del recorrido lleva a 1/8 y a la mitad del tiempo (portamento: curva suave; glissando: recta;
 * salto: escalón). Se compara con las cifras de la tabla, y los rótulos y el texto alternativo dicen lo mismo.
 */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');
const SALIDA = 'assets/img/efectos';

const W = 480, PH = 104, TOP = 26, ML = 52, MR = 14, PLOT_H = 58;
const f1 = (n) => Number(n.toFixed(1));
const FUENTE = 'font-family="Arial, Helvetica, sans-serif"';

/* ---------------------------------------------------------------- vibrato */
const VIBRATOS = [
  { id: 'sin', titulo: 'Sin vibrato', vel: 0, prof: 0 },
  { id: 'normal', titulo: 'Vibrato medio: 5,5 veces por segundo, ±25 cents', vel: 5.5, prof: 25 },
  { id: 'rapido', titulo: 'Rápido y estrecho: 7 veces por segundo, ±12 cents', vel: 7, prof: 12 },
  { id: 'lento', titulo: 'Lento y muy ancho: 4 veces por segundo, ±50 cents', vel: 4, prof: 50 },
];
const ALT_VIBRATO = 'Cuatro gráficas de la altura de una nota durante un segundo: sin vibrato, una línea recta; vibrato medio, 5,5 oscilaciones por segundo de ±25 cents; vibrato rápido y estrecho, 7 por segundo de ±12 cents; y vibrato lento y muy ancho, 4 por segundo de ±50 cents.';
const ESC_V = PLOT_H / 2 / 60;      // px por cent: el eje va de −60 a +60 cents

/* ---------------------------------------------------------------- portamento */
const T_TOTAL = 3.2, DO_MI = 400;
const PORTAMENTOS = [
  { id: 'salto', titulo: 'Salto directo, sin deslizar', tipo: 'salto', t0: 0.5, dur: 0.01 },
  { id: 'porta', titulo: 'Portamento: 0,3 s, curva suave', tipo: 'suave', t0: 0.6, dur: 0.3 },
  { id: 'gliss', titulo: 'Glissando: 2 s, velocidad constante', tipo: 'recta', t0: 0.5, dur: 2 },
];
const ALT_PORTAMENTO = 'Tres gráficas de la altura al pasar de Do a Mi: un salto directo, sin deslizar; un portamento de 0,3 segundos con curva suave, que sale despacio, acelera y frena al llegar; y un glissando de 2 segundos a velocidad constante, una línea recta.';
const ESC_P = PLOT_H / DO_MI;

const fraccion = (c, t) => (c.tipo === 'suave' ? (1 - Math.cos(Math.PI * Math.min(1, Math.max(0, (t - c.t0) / c.dur)))) / 2 : Math.min(1, Math.max(0, (t - c.t0) / c.dur)));

function panel(i, titulo, cuerpo) {
  return `<g id="g-${i}" transform="translate(0,${i * PH})"><text x="${ML}" y="16" ${FUENTE} font-size="15" font-weight="700" fill="#1a1a1a">${titulo}</text>${cuerpo}</g>`;
}
const ejes = (etqArriba, etqAbajo, etqCentro, segundos) =>
  `<line x1="${ML}" y1="${TOP}" x2="${ML}" y2="${TOP + PLOT_H}" stroke="#1a1a1a" stroke-width="1.2"/>` +
  (etqCentro ? `<line x1="${ML}" y1="${TOP + PLOT_H / 2}" x2="${W - MR}" y2="${TOP + PLOT_H / 2}" stroke="#9a9a9a" stroke-width="1" stroke-dasharray="4 4"/><text x="${ML - 6}" y="${TOP + PLOT_H / 2 + 5}" ${FUENTE} font-size="13" text-anchor="end" fill="#1a1a1a">${etqCentro}</text>` : '') +
  `<text x="${ML - 6}" y="${TOP + 5}" ${FUENTE} font-size="${etqCentro ? 12 : 13}" text-anchor="end" fill="${etqCentro ? '#444' : '#1a1a1a'}">${etqArriba}</text>` +
  `<text x="${ML - 6}" y="${TOP + PLOT_H + 3}" ${FUENTE} font-size="${etqCentro ? 12 : 13}" text-anchor="end" fill="${etqCentro ? '#444' : '#1a1a1a'}">${etqAbajo}</text>` +
  `<text x="${W - MR}" y="${TOP + PLOT_H + 14}" ${FUENTE} font-size="12" text-anchor="end" fill="#444">${segundos}</text>`;
const trazo = (id, pts) => `<polyline id="c-${id}" fill="none" stroke="#8c6609" stroke-width="2.4" stroke-linejoin="round" points="${pts.map((p) => p.join(',')).join(' ')}"/>`;
const envuelve = (casos, partes, alt) => { const h = casos.length * PH; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" role="img" aria-label="${alt}"><title>${alt}</title><rect width="${W}" height="${h}" fill="#fff"/>${partes.join('')}</svg>`; };

function construyeVibrato(casos) {
  const partes = casos.map((c, i) => {
    const cy = TOP + PLOT_H / 2, pts = [];
    for (let k = 0; k <= 240; k++) { const t = k / 240; pts.push([f1(ML + t * (W - MR - ML)), f1(cy - c.prof * Math.sin(2 * Math.PI * c.vel * t) * ESC_V)]); }
    return panel(i, c.titulo, ejes('+60 ¢', '−60 ¢', 'nota', '1 segundo') + trazo(c.id, pts));
  });
  return envuelve(casos, partes, ALT_VIBRATO);
}

function construyePortamento(casos) {
  const partes = casos.map((c, i) => {
    const pts = [];
    for (let k = 0; k <= 320; k++) { const t = k * 0.01; pts.push([f1(ML + (t / T_TOTAL) * (W - MR - ML)), f1(TOP + PLOT_H - DO_MI * fraccion(c, t) * ESC_P)]); }
    return panel(i, c.titulo, ejes('Mi', 'Do', '', '3,2 segundos') + trazo(c.id, pts));
  });
  return envuelve(casos, partes, ALT_PORTAMENTO);
}

const leePuntos = (svg, id) => { const m = new RegExp(`<polyline id="c-${id}"[^>]*points="([^"]*)"`).exec(svg); return m ? m[1].split(' ').map((p) => p.split(',').map(Number)) : null; };

function verificaVibrato(svg, casos, alt) {
  const err = [];
  casos.forEach((c) => {
    const pts = leePuntos(svg, c.id);
    if (!pts) { err.push(`${c.id}: no se dibuja la curva`); return; }
    const cy = TOP + PLOT_H / 2, cents = pts.map(([, y]) => (cy - y) / ESC_V), amp = Math.max(...cents.map(Math.abs));
    let picos = 0; for (let k = 1; k < cents.length - 1; k++) if (cents[k] > cents[k - 1] && cents[k] >= cents[k + 1] && cents[k] > amp * 0.5) picos++;
    if (c.prof === 0) { if (amp > 0.5) err.push(`${c.id}: la curva sin vibrato oscila ${amp.toFixed(1)} cents`); }
    else {
      if (Math.abs(amp - c.prof) > 1.5) err.push(`${c.id}: la curva sube ${amp.toFixed(1)} cents y la cifra dice ±${c.prof}`);
      if (Math.abs(picos - c.vel) > 1) err.push(`${c.id}: la curva oscila ${picos} veces en el segundo y la cifra dice ${c.vel}`);
    }
    const rot = new RegExp(`<g id="g-${casos.indexOf(c)}"[^>]*>\\s*<text[^>]*>([^<]*)</text>`).exec(svg);
    const esperado = c.prof === 0 ? 'Sin vibrato' : `${String(c.vel).replace('.', ',')} veces por segundo, ±${c.prof} cents`;
    if (!rot || !rot[1].includes(esperado)) err.push(`${c.id}: el rótulo «${rot && rot[1]}» no dice «${esperado}»`);
    if (c.prof > 0 && !alt.includes(`±${c.prof} cents`)) err.push(`${c.id}: el texto alternativo no recoge ±${c.prof} cents`);
  });
  return err;
}

function verificaPortamento(svg, casos, alt) {
  const err = [];
  casos.forEach((c, i) => {
    const pts = leePuntos(svg, c.id);
    if (!pts) { err.push(`${c.id}: no se dibuja la curva`); return; }
    const t = (x) => ((x - ML) / (W - MR - ML)) * T_TOTAL, frac = (y) => (TOP + PLOT_H - y) / (DO_MI * ESC_P);
    const serie = pts.map(([x, y]) => [t(x), frac(y)]);
    const en = (tt) => serie.reduce((m, p) => (Math.abs(p[0] - tt) < Math.abs(m[0] - tt) ? p : m))[1];
    const inicio = serie.find((p) => p[1] > 0.02), fin = serie.find((p) => p[1] > 0.98);
    if (!inicio || !fin) { err.push(`${c.id}: la curva no llega a subir`); return; }
    if (Math.abs(inicio[0] - c.t0) > 0.06) err.push(`${c.id}: empieza a subir a los ${inicio[0].toFixed(2)} s y la cifra dice ${c.t0}`);
    if (Math.abs(fin[0] - (c.t0 + c.dur)) > 0.06) err.push(`${c.id}: acaba de subir a los ${fin[0].toFixed(2)} s y la cifra dice ${(c.t0 + c.dur).toFixed(2)}`);
    if (en(0.1) > 0.02 || en(T_TOTAL) < 0.98) err.push(`${c.id}: no sale de Do o no acaba en Mi`);
    if (c.tipo === 'recta') { if (Math.abs(en(c.t0 + c.dur / 8) - 0.125) > 0.02 || Math.abs(en(c.t0 + c.dur / 2) - 0.5) > 0.02) err.push(`${c.id}: no es una recta (1/8: ${en(c.t0 + c.dur / 8).toFixed(3)}, 1/2: ${en(c.t0 + c.dur / 2).toFixed(3)})`); }
    if (c.tipo === 'suave') { if (!(en(c.t0 + c.dur / 8) < 0.125 * 0.6) || Math.abs(en(c.t0 + c.dur / 2) - 0.5) > 0.03) err.push(`${c.id}: no es una curva suave (a 1/8 lleva ${en(c.t0 + c.dur / 8).toFixed(3)}, a la mitad ${en(c.t0 + c.dur / 2).toFixed(3)})`); }
    if (c.tipo === 'salto' && fin[0] - inicio[0] > 0.05) err.push(`${c.id}: el salto directo tarda ${(fin[0] - inicio[0]).toFixed(2)} s en subir`);
    const rot = new RegExp(`<g id="g-${i}"[^>]*>\\s*<text[^>]*>([^<]*)</text>`).exec(svg);
    if (!rot || rot[1] !== c.titulo) err.push(`${c.id}: el rótulo no es «${c.titulo}»`);
  });
  if (!/0,3 segundos/.test(alt) || !/2 segundos/.test(alt) || !/curva suave/.test(alt) || !/línea recta/.test(alt)) err.push('el texto alternativo no recoge los tres casos');
  return err;
}

const TRABAJOS = [
  { archivo: 'vibrato-curvas.svg', casos: VIBRATOS, construye: construyeVibrato, verifica: verificaVibrato, alt: ALT_VIBRATO },
  { archivo: 'portamento-curvas.svg', casos: PORTAMENTOS, construye: construyePortamento, verifica: verificaPortamento, alt: ALT_PORTAMENTO },
];

(() => {
  if (process.argv.includes('--sabotaje')) {
    const pruebas = [
      [0, 'vibrato medio con 8 oscilaciones', (c) => (c.id === 'normal' ? Object.assign({}, c, { vel: 8 }) : c)],
      [0, 'vibrato lento con ±25 cents en lugar de ±50', (c) => (c.id === 'lento' ? Object.assign({}, c, { prof: 25 }) : c)],
      [0, 'la «sin vibrato» con vibrato', (c) => (c.id === 'sin' ? Object.assign({}, c, { vel: 5, prof: 20 }) : c)],
      [1, 'portamento que sube en línea recta', (c) => (c.id === 'porta' ? Object.assign({}, c, { tipo: 'recta' }) : c)],
      [1, 'glissando de 1 s en vez de 2 s', (c) => (c.id === 'gliss' ? Object.assign({}, c, { dur: 1 }) : c)],
      [1, 'salto directo que tarda medio segundo', (c) => (c.id === 'salto' ? Object.assign({}, c, { tipo: 'recta', dur: 0.5 }) : c)],
    ];
    let mal = 0;
    for (const [n, desc, f] of pruebas) {
      const T = TRABAJOS[n], svg = T.construye(T.casos.map(f));     // se dibuja con la cifra cambiada y se verifica contra la tabla
      const e = T.verifica(svg, T.casos, T.alt);
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0] : ''}`);
      if (!e.length) mal++;
    }
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  let fallos = 0;
  for (const T of TRABAJOS) {
    const svg = T.construye(T.casos), err = T.verifica(svg, T.casos, T.alt);
    if (err.length) { fallos++; console.log(`  ✗ ${T.archivo}: ${err.join('; ')}`); continue; }
    fs.writeFileSync(path.join(RAIZ, SALIDA, T.archivo), svg);
    console.log(`  ✓ ${T.archivo}  ${W}×${T.casos.length * PH}px · ${(svg.length / 1024).toFixed(1)} KB`);
  }
  process.exit(fallos ? 1 : 0);
})();
