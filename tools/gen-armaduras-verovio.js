'use strict';
/**
 * Armaduras (clave de sol + sostenidos o bemoles) dibujadas con Verovio y guardadas como SVG.
 *
 *   node tools/gen-armaduras-verovio.js <conjunto> [--poner]
 *   conjuntos: orden-armaduras (14 imagenes con el nombre de cada alteracion debajo)
 *              tabla-armaduras (15 tarjetas, una por tonalidad mayor)
 *
 * Se comprueba por vias independientes: (1) la posicion vertical EXACTA de cada alteracion en el
 * pentagrama contra una tabla de teoria (Fa5 Do5 Sol5 Re5 La4 Mi5 Si4 / Si4 Mi5 La4 Re5 Sol4 Do5 Fa4),
 * (2) el signo dibujado (♯ o ♭), (3) los nombres rotulados, (4) lo que dice la pagina (alt o titulo)
 * y, en la tabla, que la armadura asignada a cada tarjeta es la de la tonalidad que dice su titulo.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');

const { RAIZ, ESPACIO, PX_POR_UNIDAD, OPCIONES, hash, escAttr, quintasMayor, NOMBRE, LETRA_DE, preparar } = G;
const SALIDA = 'assets/img/armaduras';

/* teoria: posicion (paso diatonico absoluto, E4 = 30) de cada alteracion en clave de sol */
const SOSTENIDOS = { nombres: ['fa', 'do', 'sol', 're', 'la', 'mi', 'si'], pasos: [38, 35, 39, 36, 33, 37, 34], glifo: 'E262', palabra: ['sostenido', 'sostenidos'], signo: '♯' };
const BEMOLES    = { nombres: ['si', 'mi', 'la', 're', 'sol', 'do', 'fa'], pasos: [34, 37, 33, 36, 32, 35, 31], glifo: 'E260', palabra: ['bemol', 'bemoles'], signo: '♭' };
const PASO_E4 = 30, PASO_Y = ESPACIO / 2;
const SEPARACION = 720;                 // unidades internas entre alteraciones rotuladas (~44 px)
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/** Dibuja la armadura q (+ sostenidos, - bemoles, 0 ninguna). Devuelve el SVG de Verovio. */
function dibujar(tk, q, semilla) {
  const sig = q ? ` key.sig="${Math.abs(q)}${q > 0 ? 's' : 'f'}"` : '';
  const mei = '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="G" clef.line="2"${sig}/></staffGrp></scoreDef><section><measure n="1" right="invis"><staff n="1"><layer n="1"><space dur="1"/></layer></staff></measure></section></score></mdiv></body></music></mei>`;
  tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: semilla, spacingLinear: 0.25 }));
  if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
  if (tk.getPageCount() !== 1) throw new Error('sale en mas de una pagina');
  return tk.renderToSVG(1);
}

/** Las notas y lineas viven dentro de <g class="page-margin" transform="translate(mx, my)">: todo lo que se anade
 *  encima (rotulos, corchetes, numeros) tiene que llevar el MISMO desplazamiento o queda corrido. */
function conMargen(svg, grupo) {
  const pm = /class="page-margin"[^>]*transform="translate[(]([0-9.]+), ([0-9.]+)[)]"/.exec(svg);
  return pm ? '<g transform="translate(' + pm[1] + ' ' + pm[2] + ')">' + grupo + '</g>' : grupo;
}

/** Separa las alteraciones (solo en x; la altura la decide Verovio) y rotula debajo de cada una. */
function ajustar(svg, q, etiquetas, separar) {
  const t = q > 0 ? SOSTENIDOS : BEMOLES;
  let s = svg;
  const xs = [];
  if (separar) {
    const x0 = Number(/class="keyAccid">\s*<use [^>]*translate\(([\d.]+),/.exec(svg)[1]);
    let k = 0;
    s = s.replace(/(class="keyAccid">\s*<use [^>]*translate\()([\d.]+)(, [\d.]+\))/g, (m, a, x, c) => { const nx = x0 + k * SEPARACION; k++; return a + nx + c; });
    // mismo largo de pentagrama en las 14 imagenes: el que necesita la de 7 alteraciones (solo se alargan las lineas)
    const largo = x0 + 6 * SEPARACION + 900;
    s = s.replace(/(<path d="M0 \d+ L)\d+( \d+")/g, `$1${largo}$2`);
    s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 0 )\d+( )/, `$1${largo + 200}$2`).replace(/^(<svg viewBox="0 0 )\d+( )/, `$1${Math.round((largo + 200) / 25)}$2`);
  }
  [...s.matchAll(/class="keyAccid">\s*<use [^>]*translate\(([\d.]+), ([\d.]+)\)/g)].forEach((m) => xs.push({ x: Number(m[1]), y: Number(m[2]) }));
  if (!etiquetas) return { svg: s, xs };
  const yLinea = Math.max(...[...s.matchAll(/<path d="M0 (\d+) L\d+ \d+"/g)].map((m) => Number(m[1])));
  const base = yLinea + 4.4 * ESPACIO;
  const ts = xs.map((p, k) => `<text x="${Math.round(p.x + 85)}" y="${Math.round(base)}" fill="#1a1a1a">${t.nombres[k]}</text>`).join('');
  const grupo = `<g class="tm-etiquetas" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="300" text-anchor="middle">${ts}</g>`;
  const alto = Math.round(base + 300), altoExt = Math.round(alto / 25);
  s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 0 \d+ )\d+(")/, `$1${alto}$2`).replace(/^(<svg viewBox="0 0 \d+ )\d+(")/, `$1${altoExt}$2`);
  const i = s.lastIndexOf('</svg>', s.lastIndexOf('</svg>') - 1);
  return { svg: s.slice(0, i) + conMargen(s, grupo) + s.slice(i), xs };
}

function verificar(svg, q, etiquetas, separar) {
  const err = [];
  const t = q > 0 ? SOSTENIDOS : BEMOLES;
  const n = Math.abs(q);
  const cuenta = (re) => (svg.match(re) || []).length;
  const raiz = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!raiz || !new RegExp('#' + raiz + ' path').test(svg)) err.push('el estilo de Verovio no esta ligado al id de la raiz');
  if (cuenta(/<g[^>]* class="clef"/g) !== 1) err.push('falta la clave');
  if (cuenta(/<g class="notehead"/g) !== 0) err.push('hay notas');
  const acc = [...svg.matchAll(/class="keyAccid">\s*<use [^>]*href="#(E2[0-9A-F]+)[^>]*translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ g: m[1], x: Number(m[2]), y: Number(m[3]) }));
  if (acc.length !== n) err.push(`${acc.length} alteraciones, debian ser ${n}`);
  acc.forEach((a, k) => { if (a.g !== t.glifo) err.push(`la alteracion ${k + 1} es el glifo ${a.g}, debia ser ${t.glifo}`); });
  // posicion vertical exacta: la linea inferior sale de las lineas del pentagrama
  const lineas = [...new Set([...svg.matchAll(/<path d="M0 (\d+) L\d+ \d+"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
  if (lineas.length !== 5 || lineas.some((y, k) => k && y - lineas[k - 1] !== ESPACIO)) err.push('el pentagrama no tiene 5 lineas separadas por un espacio');
  const yE4 = lineas[lineas.length - 1];
  acc.forEach((a, k) => {
    const quiere = yE4 - (t.pasos[k] - PASO_E4) * PASO_Y;
    if (a.y !== quiere) err.push(`la alteracion ${k + 1} (${t.nombres[k]}) esta a y=${a.y}; en clave de sol le corresponde y=${quiere}`);
  });
  if (separar) acc.forEach((a, k) => { if (k && Math.round(a.x - acc[k - 1].x) !== SEPARACION) err.push('las alteraciones no estan equiespaciadas'); });
  // texto: solo los nombres rotulados
  const textos = (svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((x) => x.replace(/<[^>]+>/g, ''));
  const quiereT = etiquetas ? t.nombres.slice(0, n) : [];
  if (JSON.stringify(textos) !== JSON.stringify(quiereT)) err.push(`rotulos ${JSON.stringify(textos)}, previstos ${JSON.stringify(quiereT)}`);
  if (/color="#/.test(svg)) err.push('hay colores sin pedir');
  return err;
}

const palabra = (q) => (q > 0 ? SOSTENIDOS : BEMOLES).palabra[Math.abs(q) === 1 ? 0 : 1];
const listaNombres = (q) => (q > 0 ? SOSTENIDOS : BEMOLES).nombres.slice(0, Math.abs(q)).map((x) => cap(x) + (q > 0 ? '♯' : '♭')).join(', ');

/* ---------- paginas ---------- */
const CONJUNTOS = {
  'orden-armaduras': { pagina: 'diccionario-musical/tonalidades/orden-de-los-sostenidos-y-bemoles', rotulos: true },
  'tabla-armaduras': { pagina: 'diccionario-musical/tonalidades/tonalidades-y-armaduras', rotulos: false },
};
// tonalidad mayor (como la escribe VexFlow en data-vex) -> tonica; se compara con el titulo de cada tarjeta
const VEX = { C: ['c', 0], G: ['g', 0], D: ['d', 0], A: ['a', 0], E: ['e', 0], B: ['b', 0], 'F#': ['f', 1], 'C#': ['c', 1], F: ['f', 0], Bb: ['b', -1], Eb: ['e', -1], Ab: ['a', -1], Db: ['d', -1], Gb: ['g', -1], Cb: ['c', -1] };

function tonicaDeTitulo(t) {
  const m = /Armadura de (Do|Re|Mi|Fa|Sol|La|Si)(♯|♭)? mayor/.exec(t);
  return m ? [LETRA_DE[m[1]], m[2] === '♯' ? 1 : m[2] === '♭' ? -1 : 0] : null;
}
const nombreMayor = (l, a) => NOMBRE[l] + (a === 1 ? '♯' : a === -1 ? '♭' : '') + ' mayor';

async function main() {
  const nombre = process.argv[2];
  const poner = process.argv.includes('--poner');
  const cfg = CONJUNTOS[nombre];
  if (!cfg) { console.log('uso: node tools/gen-armaduras-verovio.js <' + Object.keys(CONJUNTOS).join('|') + '> [--poner]'); process.exit(1); }
  const htmlPath = path.join(RAIZ, cfg.pagina, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const trabajos = [];   // { q, clave, alt, trozo, extra }

  if (nombre === 'orden-armaduras') {
    const reImg = /(?:<a [^>]*>)?(?:<picture>(?:<source[^>]*>)*)?<img\b[^>]*>(?:<\/picture>)?(?:<\/a>)?/g;
    let m;
    while ((m = reImg.exec(html))) {
      const alt = ((/alt="([^"]*)"/.exec(m[0]) || [])[1] || '').replace(/&amp;/g, '&');
      const a = /^Armadura con (\d) (sostenidos?|bemol(?:es)?)/.exec(alt);
      if (!a) continue;
      const q = (a[2].startsWith('sost') ? 1 : -1) * Number(a[1]);
      // los nombres que dice la pagina (alt antiguo entre parentesis, o el nuevo tras los dos puntos)
      const zona = /\(([^)]*)\)/.exec(alt) || /: ([^.]*)\./.exec(alt);
      const nombresPagina = zona ? [...zona[1].matchAll(/(Sol|Si|Do|Re|Mi|Fa|La)(?:#|♯|b|♭)?/g)].map((x) => x[1].toLowerCase()) : [];
      trabajos.push({ q, clave: `orden-${Math.abs(q)}-${palabra(q)}`, trozo: m[0], nombresPagina, rotulos: true });
    }
  } else {
    const re = /(<div id="([a-z-]+)" class="tm-key-card" data-vex="([^"]+)"[^>]*>\s*<h3>([^<]*)<\/h3>[\s\S]*?<div class="tm-key-svg">)([\s\S]*?)(<\/div>)/g;
    let m;
    while ((m = re.exec(html))) {
      const [, , id, vex, titulo] = m;
      const v = VEX[vex], tt = tonicaDeTitulo(titulo);
      const err = [];
      if (!v) err.push(`data-vex="${vex}" desconocido`);
      else if (!tt || tt[0] !== v[0] || tt[1] !== v[1]) err.push(`la tarjeta «${titulo}» tiene data-vex="${vex}", que es otra tonalidad`);
      if (err.length) throw new Error(err.join('; '));
      const q = quintasMayor(v[0], v[1]);
      trabajos.push({ q, clave: `${NOMBRE[v[0]].toLowerCase()}${v[1] === 1 ? '-sostenido' : v[1] === -1 ? '-bemol' : ''}-mayor`, trozo: m[0], pre: m[1], interior: m[5], cierre: m[6], titulo: nombreMayor(v[0], v[1]), rotulos: false });
    }
  }
  if (!trabajos.length) throw new Error('no he encontrado ninguna armadura en la pagina');

  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });

  let fallos = 0;
  for (const j of trabajos) {
    try {
      const e = [];
      if (j.nombresPagina) {
        const quiere = (j.q > 0 ? SOSTENIDOS : BEMOLES).nombres.slice(0, Math.abs(j.q));
        if (JSON.stringify(j.nombresPagina) !== JSON.stringify(quiere)) e.push(`la pagina lista ${j.nombresPagina.join(', ')} y la teoria dice ${quiere.join(', ')}`);
      }
      const crudo = dibujar(tk, j.q, hash(j.clave));
      const { svg } = ajustar(crudo, j.q, j.rotulos, j.rotulos);
      e.push(...verificar(svg, j.q, j.rotulos, j.rotulos));
      const lista = j.q ? `${Math.abs(j.q)} ${palabra(j.q)} (${listaNombres(j.q)})` : 'sin alteraciones';
      j.alt = nombre === 'orden-armaduras'
        ? `Armadura con ${Math.abs(j.q)} ${palabra(j.q)} en clave de sol: ${listaNombres(j.q)}. Bajo cada alteración está escrito su nombre.`
        : `Armadura de ${j.titulo} en clave de sol: ${lista}.`;
      const listo = preparar(svg, j.alt);
      if (e.length) throw new Error(e.join('\n   - '));
      fs.writeFileSync(path.join(RAIZ, SALIDA, j.clave + '.svg'), listo.svg);
      j.w = listo.w; j.h = listo.h;
      console.log(`✓ ${j.clave.padEnd(24)} ${String(listo.svg.length).padStart(5)} B · ${listo.w}×${listo.h}  ${j.q ? listaNombres(j.q) : '—'}`);
    } catch (err) {
      fallos++;
      console.log(`✗ ${j.clave}\n   - ${err.message}`);
    }
  }
  if (fallos) { console.log(`\n${fallos} armadura(s) no pasan la verificacion: no se toca la pagina`); process.exit(1); }

  if (poner) {
    for (const j of trabajos) {
      // la tabla muestra una tarjeta cada vez: sin «lazy» para que el cambio de tarjeta sea inmediato (son ~4 KB)
      const img = `<img src="/${SALIDA}/${j.clave}.svg" width="${j.w}" height="${j.h}" alt="${escAttr(j.alt)}"${nombre === 'orden-armaduras' ? ' loading="lazy"' : ''} decoding="async">`;
      if (nombre === 'orden-armaduras') html = html.replace(j.trozo, () => img);
      else html = html.replace(j.trozo, () => j.pre + img + j.cierre);
    }
    fs.writeFileSync(htmlPath, html);
    console.log(`\nescrito ${cfg.pagina}/index.html: ${trabajos.length} armaduras`);
  } else console.log(`\n${trabajos.length} armaduras localizadas (usa --poner para sustituirlas)`);
}

main().catch((e) => { console.error('✗', e.message); process.exit(1); });
