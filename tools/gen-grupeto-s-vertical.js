'use strict';
/**
 * El grupeto «en S vertical» (/diccionario-musical/ornamentos-musicales/): un signo suelto, sin pentagrama.
 *
 *   node tools/gen-grupeto-s-vertical.js              # genera y verifica; no toca la pagina
 *   node tools/gen-grupeto-s-vertical.js --poner      # ademas sustituye el <img> PNG de la pagina
 *   node tools/gen-grupeto-s-vertical.js --sabotaje   # comprueba que la verificacion SABE fallar
 *
 * El dibujo es el glifo SMuFL «ornamentTurnUpS» (U+E56B) de la misma fuente (Leland) que usa Verovio para el resto de
 * la web. Se le pide a Verovio que lo dibuje como adorno de un grupeto (`<turn glyph.name="ornamentTurnUpS">`), se extrae
 * su contorno del SVG y se guarda solo, recortado a su caja, sin pentagrama ni texto (no depende de ninguna fuente).
 * Se comprueba que: Verovio dibuja el glifo E56B (y no otro), el SVG final tiene exactamente ese contorno, que el alt de la
 * pagina habla de una S vertical y que el dibujo no es el de la «ese tumbada» (E567).
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, OPCIONES, hash, escAttr } = G;

const PAGINA = 'diccionario-musical/ornamentos-musicales';
const SLUG = 'grupeto-s-vertical';
const SALIDA = 'assets/img/notacion/ornamentos';
const GLIFO = 'E56B';
const ALTO_PX = 62;   // alto con el que se muestra (el PNG antiguo era de 63×62)

const mei = (nombre) => '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp><staffDef n="1" lines="5" clef.shape="G" clef.line="2"/></staffGrp></scoreDef><section><measure n="1"><staff n="1"><layer n="1"><note xml:id="n0" pname="g" oct="4" dur="4" stem.dir="up"/></layer></staff>'
  + `<turn xml:id="o1" startid="#n0" glyph.name="${nombre}" glyph.auth="smufl" place="above"/></measure></section></score></mdiv></body></music></mei>`;

/** El contorno del glifo que Verovio dibuja como adorno: { codigo, contorno }. */
function glifoDeVerovio(tk, nombre) {
  tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: 5 }));
  if (!tk.loadData(mei(nombre))) throw new Error('Verovio no lee el MEI');
  const svg = tk.renderToSVG(1);
  const dibujado = (/class="turn">\s*<use [^>]*href="#(E[0-9A-F]{3})-/.exec(svg) || [])[1];
  const def = new RegExp('<g id="' + dibujado + '-[^"]*">\\s*<path transform="scale\\(1,-1\\)" d="([^"]+)"').exec(svg);
  if (!dibujado || !def) throw new Error('no encuentro el glifo del grupeto en el SVG de Verovio');
  return { codigo: dibujado, contorno: def[1] };
}

async function medir(contorno) {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(`<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="-1000 -1000 2000 2000"><path id="g" transform="scale(1,-1)" d="${contorno}"/></svg>`);
  const r = await p.evaluate(() => { const x = document.getElementById('g').getBBox(); return { x: x.x, y: x.y, w: x.width, h: x.height }; });
  await b.close();
  // el bbox se mide ya con scale(1,-1) aplicado en coordenadas del propio path: y crece hacia abajo
  return r;
}

function construirSVG(contorno, caja, alt) {
  const m = Math.round(Math.max(caja.w, caja.h) * 0.06);
  const x = Math.floor(caja.x - m), y = Math.floor(-caja.y - caja.h - m), w = Math.ceil(caja.w + 2 * m), h = Math.ceil(caja.h + 2 * m);
  const alto = ALTO_PX, ancho = Math.round((w / h) * alto);
  const id = 'tm-g' + hash(SLUG);
  const svg = `<svg id="${id}" viewBox="${x} ${y} ${w} ${h}" width="${ancho}" height="${alto}" role="img" xmlns="http://www.w3.org/2000/svg"><title>${escAttr(alt)}</title><path transform="scale(1,-1)" fill="#000" d="${contorno}"/></svg>\n`;
  return { svg, ancho, alto };
}

function verificar(svg, glifoVerovio, alt, esperado) {
  const err = [];
  if (glifoVerovio.codigo !== esperado) err.push(`Verovio dibuja el glifo ${glifoVerovio.codigo} y la S vertical es ${esperado}`);
  const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  if (d.length !== 1 || d[0] !== glifoVerovio.contorno) err.push('el SVG no contiene exactamente el contorno del glifo');
  if ((svg.match(/<path/g) || []).length !== 1) err.push('el SVG deberia tener un solo trazo');
  if (/<text|<use|font/.test(svg)) err.push('el SVG no debe depender de texto ni de fuentes');
  if (!/S vertical/.test(alt)) err.push('el alt de la pagina ya no habla de una «S vertical»');
  if (glifoVerovio.codigo === 'E567') err.push('ese es el glifo de la ese tumbada, no el de la S vertical');
  const vb = /viewBox="(-?\d+) (-?\d+) (\d+) (\d+)"/.exec(svg);
  if (!vb || Number(vb[3]) <= 0 || Number(vb[4]) <= 0) err.push('viewBox ilegible');
  return err;
}

async function main() {
  const poner = process.argv.includes('--poner');
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const ruta = path.join(RAIZ, PAGINA, 'index.html');
  let html = fs.readFileSync(ruta, 'utf8');
  const re = /<picture>(?:<source[^>]*>)*<img\b[^>]*grupeto-s-vertical[^>]*><\/picture>|<img\b[^>]*grupeto-s-vertical[^>]*>/;
  const trozo = (re.exec(html) || [])[0];
  if (!trozo) throw new Error('no encuentro la imagen del grupeto en S vertical en la pagina');
  const alt = ((/alt="([^"]*)"/.exec(trozo) || [])[1] || '');

  if (sabotaje) {
    let mal = 0;
    const prueba = (nombre, nombreGlifo, altPrueba, esperado) => {
      const g = glifoDeVerovio(tk, nombreGlifo);
      const e = verificar(`<svg viewBox="0 0 10 10"><path d="${g.contorno}"/></svg>`, g, altPrueba, esperado);
      const ok = e.length > 0;
      console.log(`${ok ? '✓' : '✗'} sabotaje «${nombre}»: ${e[0] || 'NO SE DETECTO'}`); if (!ok) mal++;
    };
    prueba('glifo de la ese tumbada', 'ornamentTurn', alt, GLIFO);
    prueba('glifo de otra ornamentacion', 'ornamentTurnUp', alt, GLIFO);
    prueba('alt que ya no habla de S vertical', 'ornamentTurnUpS', 'Grafía alternativa del grupeto', GLIFO);
    const g = glifoDeVerovio(tk, 'ornamentTurnUpS');
    const e0 = verificar(`<svg viewBox="0 0 10 10"><path d="${g.contorno}"/></svg>`, g, alt, GLIFO);
    console.log(`${e0.length ? '✗' : '✓'} control sin sabotaje: ${e0.length ? e0.join(' / ') : 'sin errores'}`);
    const e1 = verificar(`<svg viewBox="0 0 10 10"><path d="${g.contorno}M0 0"/></svg>`, g, alt, GLIFO);
    console.log(`${e1.length ? '✓' : '✗'} sabotaje «contorno alterado»: ${e1[0] || 'NO SE DETECTO'}`);
    process.exit(mal || e0.length || !e1.length ? 1 : 0);
  }

  const g = glifoDeVerovio(tk, 'ornamentTurnUpS');
  const caja = await medir(g.contorno);
  const { svg, ancho, alto } = construirSVG(g.contorno, caja, alt);
  const err = verificar(svg, g, alt, GLIFO);
  if (err.length) { console.log('✗ ' + SLUG + '\n   - ' + err.join('\n   - ')); process.exit(1); }
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, SALIDA, SLUG + '.svg'), svg);
  console.log(`✓ ${SLUG}  glifo ${g.codigo} · ${svg.length} B · ${ancho}×${alto}`);
  if (poner) {
    const nuevo = `<img src="/${SALIDA}/${SLUG}.svg" width="${ancho}" height="${alto}" alt="${escAttr(alt)}" loading="lazy" decoding="async">`;
    html = html.replace(trozo, () => nuevo);
    fs.writeFileSync(ruta, html);
    console.log(`escrito ${PAGINA}/index.html`);
  }
}

main().catch((e) => { console.error('✗', e.message); process.exit(1); });
