'use strict';
/**
 * Figuras de /diccionario-musical/cualidades-del-sonido/:
 *   duracion          redonda, blanca, negra y corchea sobre el mismo Sol4 (Verovio)
 *   intensidad-ondas  dos ondas de la misma frecuencia y distinta amplitud (SVG generado por fórmula)
 *
 *   node tools/gen-cualidades-figuras.js              # genera y verifica
 *   node tools/gen-cualidades-figuras.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * (La altura reutiliza los pentagramas de una nota ya verificados, assets/img/digitaciones/notas/sol-c4|c5|c6.svg.)
 *
 * VERIFICACIÓN
 *  duracion:  el MEI releído (figuras en orden y misma nota); en el dibujo, los cuatro glifos de cabeza (redonda E0A2, blanca
 *             E0A3, negra E0A4, negra E0A4), las plicas (ninguna en la redonda, una en cada una de las otras), una bandera en la
 *             corchea, todas las cabezas en la misma línea del pentagrama (Sol4 = 2.ª línea) y que el alt nombra las cuatro
 *             figuras en ese orden.
 *  ondas:     releyendo las dos curvas: misma frecuencia (mismo número de cruces por cero), amplitudes en la proporción
 *             prevista, la primera pequeña y la segunda grande, y que el alt dice «poca» y «mucha» amplitud.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const M = require('../assets/js/tm-mei.js');
const { RAIZ, OPCIONES, hash, preparar, escAttr } = G;

/* ---------- duración ---------- */
const DURACIONES = [['w', 'redonda', 'E0A2'], ['h', 'blanca', 'E0A3'], ['q', 'negra', 'E0A4'], ['8', 'corchea', 'E0A4']];
const ALT_DURACION = 'Cuatro figuras sobre el mismo Sol: redonda, blanca, negra y corchea. Cuanto más corta es la figura, menos dura el sonido.';

function filaDuracion(duraciones) {
  return { compases: [duraciones.map((d) => ({ key: 'g/4', d }))], sinBarraFinal: true };
}

function verificarDuracion(fila, mei, svg, esperado, alt) {
  const err = [];
  const leidas = [...mei.matchAll(/<note [^>]*pname="(\w)" oct="(\d)"[^>]*dur="(\d+)"/g)].map((m) => [m[1] + m[2], m[3]]);
  const quiereMei = esperado.map(([d]) => ['g4', { w: '1', h: '2', q: '4', 8: '8' }[d]]);
  if (JSON.stringify(leidas) !== JSON.stringify(quiereMei)) err.push(`el MEI escribe ${JSON.stringify(leidas)} y tenía que ser ${JSON.stringify(quiereMei)}`);
  const cabezas = [...svg.matchAll(/<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)-[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], y: Number(m[3]) }));
  if (cabezas.map((c) => c.g).join(' ') !== esperado.map((e) => e[2]).join(' ')) err.push(`cabezas ${cabezas.map((c) => c.g).join(' ')} y tenían que ser ${esperado.map((e) => e[2]).join(' ')}`);
  const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== 5) err.push(`${lineas.length} líneas de pentagrama`);
  else cabezas.forEach((c, i) => { if (c.y !== lineas[3]) err.push(`la figura ${i + 1} no está en la 2.ª línea (Sol): y=${c.y}, línea=${lineas[3]}`); });
  const plicas = (svg.match(/class="stem"/g) || []).length;
  const quierePlicas = esperado.filter(([d]) => d !== 'w').length;
  if (plicas !== quierePlicas) err.push(`${plicas} plicas y tenían que ser ${quierePlicas} (todas menos la redonda)`);
  const banderas = (svg.match(/href="#E24[0-7]-/g) || []).length;
  const quiereBanderas = esperado.filter(([d]) => d === '8').length;
  if (banderas !== quiereBanderas) err.push(`${banderas} banderas y tenían que ser ${quiereBanderas}`);
  const nombres = [...alt.matchAll(/\b(redonda|blanca|negra|corchea)\b/g)].map((m) => m[1]);
  if (nombres.join(' ') !== esperado.map((e) => e[1]).join(' ')) err.push(`el alt nombra ${nombres.join(' ')} y el dibujo lleva ${esperado.map((e) => e[1]).join(' ')}`);
  return err;
}

/* ---------- ondas de intensidad ---------- */
const ONDAS = { w: 600, ciclos: 5, A1: 14, A2: 46, y1: 40, y2: 120, x0: 20, x1: 580 };
const ALT_ONDAS = 'Dos ondas de la misma frecuencia: la de arriba, de poca amplitud, representa un sonido suave; la de abajo, de mucha amplitud, un sonido fuerte.';

function curva(cy, A, ciclos, x0, x1) {
  const pts = [];
  const n = 240;
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    const y = cy - A * Math.sin(2 * Math.PI * ciclos * i / n);
    pts.push(`${x.toFixed(1)},${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

function svgOndas(o) {
  const t = escAttr(ALT_ONDAS);
  return `<svg id="tm-ondas" viewBox="0 0 ${o.w} 170" width="${o.w}" height="170" role="img" xmlns="http://www.w3.org/2000/svg"><title>${t}</title>`
    + `<line x1="${o.x0}" y1="${o.y1}" x2="${o.x1}" y2="${o.y1}" stroke="#c9bfa4" stroke-width="1"/>`
    + `<line x1="${o.x0}" y1="${o.y2}" x2="${o.x1}" y2="${o.y2}" stroke="#c9bfa4" stroke-width="1"/>`
    + `<polyline class="onda-suave" fill="none" stroke="#8b6914" stroke-width="2.4" stroke-linejoin="round" points="${curva(o.y1, o.A1, o.ciclos, o.x0, o.x1)}"/>`
    + `<polyline class="onda-fuerte" fill="none" stroke="#8b6914" stroke-width="2.4" stroke-linejoin="round" points="${curva(o.y2, o.A2, o.ciclos, o.x0, o.x1)}"/>`
    + `<text x="${o.x0}" y="14" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="#1a1a1a">Poca amplitud: suena suave</text>`
    + `<text x="${o.x0}" y="${o.y2 - o.A2 - 8}" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="#1a1a1a">Mucha amplitud: suena fuerte</text>`
    + '</svg>\n';
}

function verificarOndas(svg, alt, esperado) {
  const err = [];
  const curvas = [...svg.matchAll(/<polyline class="(onda-\w+)"[^>]*points="([^"]+)"/g)].map((m) => ({ clase: m[1], pts: m[2].trim().split(/\s+/).map((p) => p.split(',').map(Number)) }));
  if (curvas.length !== 2) return [`${curvas.length} curvas y tenían que ser 2`];
  const info = curvas.map((c) => {
    const ys = c.pts.map((p) => p[1]);
    const centro = (Math.max(...ys) + Math.min(...ys)) / 2;
    const amp = (Math.max(...ys) - Math.min(...ys)) / 2;
    // cruces por cero: cambios de signo, saltando los puntos que caen exactamente en el centro
    let cruces = 0, previo = 0;
    for (const y of ys) { const sg = Math.sign(Math.round((y - centro) * 10) / 10); if (sg !== 0) { if (previo !== 0 && sg !== previo) cruces++; previo = sg; } }
    return { clase: c.clase, amp, cruces };
  });
  if (info[0].clase !== 'onda-suave' || info[1].clase !== 'onda-fuerte') err.push('las ondas no están en el orden suave, fuerte');
  if (Math.abs(info[0].cruces - info[1].cruces) > 0) err.push(`distinta frecuencia: ${info[0].cruces} y ${info[1].cruces} cruces por cero`);
  if (Math.abs(info[0].cruces - esperado.ciclos * 2) > 1) err.push(`${info[0].cruces} cruces y para ${esperado.ciclos} ciclos tenían que ser ${esperado.ciclos * 2}`);
  const prop = info[1].amp / info[0].amp;
  if (Math.abs(prop - esperado.A2 / esperado.A1) > 0.1) err.push(`la proporción de amplitudes es ${prop.toFixed(2)} y tenía que ser ${(esperado.A2 / esperado.A1).toFixed(2)}`);
  if (!(info[0].amp < info[1].amp)) err.push('la onda «suave» no es la de menor amplitud');
  if (!/poca amplitud/.test(alt) || !/mucha amplitud/.test(alt)) err.push('el alt no dice poca y mucha amplitud');
  if (alt.indexOf('poca') > alt.indexOf('mucha')) err.push('el alt nombra las ondas en otro orden');
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const dibujaDuracion = (duraciones) => {
    const fila = filaDuracion(duraciones);
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash('cualidades-duracion'), spacingLinear: 0.3 }));
    const mei = M.aMEI(fila);
    if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
    return { mei, svg: tk.renderToSVG(1), fila };
  };
  const esperadoDuracion = DURACIONES;

  if (sabotaje) {
    const pruebas = [
      ['duración: una figura cambiada (negra por blanca)', () => { const d = dibujaDuracion(['w', 'h', 'h', '8']); return verificarDuracion(d.fila, d.mei, d.svg, esperadoDuracion, ALT_DURACION); }],
      ['duración: orden distinto (corchea antes)', () => { const d = dibujaDuracion(['8', 'h', 'q', 'w']); return verificarDuracion(d.fila, d.mei, d.svg, esperadoDuracion, ALT_DURACION); }],
      ['duración: el alt nombra otro orden', () => { const d = dibujaDuracion(DURACIONES.map((x) => x[0])); return verificarDuracion(d.fila, d.mei, d.svg, esperadoDuracion, ALT_DURACION.replace('redonda, blanca', 'blanca, redonda')); }],
      ['ondas: misma amplitud', () => verificarOndas(svgOndas({ ...ONDAS, A2: ONDAS.A1 }), ALT_ONDAS, ONDAS)],
      ['ondas: frecuencia distinta', () => { const s = svgOndas(ONDAS).replace(/(<polyline class="onda-fuerte"[^>]*points=")[^"]*"/, (m, a) => a + curva(ONDAS.y2, ONDAS.A2, 8, ONDAS.x0, ONDAS.x1) + '"'); return verificarOndas(s, ALT_ONDAS, ONDAS); }],
      ['ondas: el alt dice otra cosa', () => verificarOndas(svgOndas(ONDAS), ALT_ONDAS.replace('poca amplitud', 'mucha amplitud'), ONDAS)],
    ];
    let mal = 0;
    for (const [nombre, f] of pruebas) {
      const errores = f();
      console.log(`  ${errores.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${nombre}${errores.length ? ' → ' + errores[0] : ''}`);
      if (!errores.length) mal++;
    }
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }

  let fallos = 0;
  // duración
  const d = dibujaDuracion(DURACIONES.map((x) => x[0]));
  const e1 = verificarDuracion(d.fila, d.mei, d.svg, esperadoDuracion, ALT_DURACION);
  if (e1.length) { fallos++; console.log('  ✗ duracion: ' + e1.join('; ')); }
  else {
    const listo = preparar(d.svg, ALT_DURACION);
    fs.mkdirSync(path.join(RAIZ, 'assets/img/notacion/cualidades'), { recursive: true });
    fs.writeFileSync(path.join(RAIZ, 'assets/img/notacion/cualidades/duracion.svg'), listo.svg);
    console.log(`  ✓ duracion  ${listo.w}×${listo.h}px · ${(listo.svg.length / 1024).toFixed(1)} KB`);
  }
  // ondas
  const svg = svgOndas(ONDAS);
  const e2 = verificarOndas(svg, ALT_ONDAS, ONDAS);
  if (e2.length) { fallos++; console.log('  ✗ intensidad-ondas: ' + e2.join('; ')); }
  else {
    fs.mkdirSync(path.join(RAIZ, 'assets/img/cualidades'), { recursive: true });
    fs.writeFileSync(path.join(RAIZ, 'assets/img/cualidades/intensidad-ondas.svg'), svg);
    console.log(`  ✓ intensidad-ondas  ${ONDAS.w}×170px · ${(svg.length / 1024).toFixed(1)} KB`);
  }
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
