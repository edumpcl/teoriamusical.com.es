'use strict';
/**
 * Ficha imprimible de análisis de compases (A4, 1 hoja).
 *
 *   node tools/generate-fichas-compases.js            -> ficha + soluciones
 *   node tools/generate-fichas-compases.js --png      -> + vista previa
 *
 * Es la version en papel del test de /ejercicios/compases/analizar-compas/: una
 * tabla con la cifra de cada compas y columnas para el tipo, los tiempos, la
 * subdivision y las tres unidades.
 *
 * Los datos NO se copian aqui: se leen de assets/js/compases-engine.js
 * (window.tmCompasesData y window.tmNotaSVG), que es lo que usa el test. Asi la
 * hoja y la pantalla no pueden decir cosas distintas.
 */
const { chromium } = require('playwright');
const path = require('path');
const EN = process.argv.includes('--lang=en');   // edicion inglesa: textos en ingles, salida en assets/img/en/...
const TL = (es, en) => (EN ? en : es);
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const ENGINE = path.join(ROOT, 'assets/js/compases-engine.js');
/* --salida=DIR escribe los PDF en otra carpeta (para revisarlos antes de sustituir los publicados). */
const OUT_DIR = (process.argv.find(a => a.startsWith('--salida=')) || '').slice(9) || path.join(ROOT, 'assets/img/' + (EN ? 'en/' : '') + 'compases/fichas');
const LOGO = path.join(ROOT, 'assets/img/2026/04/bach_favicon.png');
const LOGO_DATA_URI = 'data:image/png;base64,' + fs.readFileSync(LOGO).toString('base64');

/* La fuente de las figuras va incrustada: el motor la pide como /assets/fonts/…,
   que sin servidor detrás no resuelve y las figuras salen como cuadraditos. */
const LELAND = fs.readFileSync(path.join(ROOT, 'assets/fonts/Leland.woff2')).toString('base64');
const FUENTE = '@font-face{font-family:Leland;src:url(data:font/woff2;base64,' + LELAND + ') format(woff2);}';

/* La hoja va de lo corriente a lo raro: primero los compases que se ven todos
   los dias, despues los compuestos y al final los denominadores infrecuentes. */
const FASES = [
  ['2/4', '3/4', '4/4', '2/2', '3/2'],
  ['6/8', '9/8', '12/8', '3/8', '6/4'],
  ['2/8', '4/8', '2/1', '6/2', '9/4', '12/4', '3/16', '4/16', '6/16', '9/16', '12/16'],
];

const NOMBRE_SUBDIV = { b: TL('Binaria', 'Binary'), t: TL('Ternaria', 'Ternary') };
const NOMBRE_TIPO = { s: TL('Simple', 'Simple'), c: TL('Compuesto', 'Compound') };

/* Textos de la hoja (en la edicion inglesa, los mismos que el test en pantalla). */
const L = {
  marca: TL('FICHA DE COMPASES', 'TIME SIGNATURES WORKSHEET'),
  titulo: TL('Analizar compases', 'Analyze time signatures'),
  sol: TL('SOLUCIONES', 'ANSWERS'),
  instr: TL('Completa la tabla para cada cifra de compás: si es <b>simple o compuesto</b>, cuántos <b>tiempos</b> tiene, cómo es su <b>subdivisión</b> y qué figura es la <b>unidad de tiempo</b>, la <b>de subdivisión</b> y la <b>de compás</b>.', 'Complete the table for each time signature: <b>simple or compound</b>, number of <b>beats</b>, type of <b>subdivision</b>, and the <b>beat</b>, <b>subdivision</b> and <b>measure</b> units.'),
  leyenda: TL('Recuerda: en los compases compuestos el numerador se divide entre tres para saber los tiempos, y la unidad de tiempo lleva puntillo. Las unidades se escriben con la figura, no con su nombre.', 'Remember: in compound time signatures the numerator is divided by three to get the beats, and the beat unit is dotted. Units are drawn as notes.'),
  nombre: TL('Nombre:', 'Name:'), curso: TL('Curso:', 'Class:'), fecha: TL('Fecha:', 'Date:'),
  th: [TL('Compás', 'Time sig.'), TL('Tipo', 'Type'), TL('Tiempos', 'Beats'), TL('Subdivisión', 'Subdivision'), TL('U. de tiempo', 'Beat unit'), TL('U. de subdivisión', 'Subdiv. unit'), TL('U. de compás', 'Measure unit')],
  pie: TL('Compases', 'Time signatures') + ' &middot; ' + TL('analizar', 'analyze'),
  pieSol: TL('soluciones', 'answers'), pieEj: TL('ejercicios', 'exercises')
};

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function elegir(compases, total, seed) {
  const rnd = mulberry32(seed);
  const barajar = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const porSig = {};
  compases.forEach(c => { porSig[c.sig] = c; });

  /* Se reparte a partes iguales, pero si una fase no tiene suficientes compases
     el hueco pasa a la SIGUIENTE, nunca a un sorteo general: así la hoja no se
     llena de rarezas (6/32) y sigue yendo de lo corriente a lo infrecuente. */
  const out = [];
  let pendiente = 0;
  FASES.forEach((fase, i) => {
    const meta = Math.floor(total / FASES.length) + (i < total % FASES.length ? 1 : 0) + pendiente;
    const hay = fase.filter(s => porSig[s]);
    // Se barajan para que no salga siempre la misma hoja, pero se colocan en el
    // orden en que estan escritos en FASES, que va de mas facil a mas raro.
    const elegidos = barajar(hay).slice(0, meta);
    pendiente = meta - elegidos.length;
    hay.filter(s => elegidos.indexOf(s) >= 0).forEach(s => out.push(porSig[s]));
  });
  return out.slice(0, total);
}

const CSS = FUENTE + `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 9mm 14mm 5mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 6px; margin-bottom: 10px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 34px; height: 35px; flex: none; margin-top: 1px; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 16pt; margin: 3px 0; }
  .instr { font-size: 9.5pt; margin: 0 0 5px; color: #333; line-height: 1.35; }
  .leyenda { font-size: 8.5pt; color: #555; margin: 0; line-height: 1.3; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 7px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  /* Anchos fijos: si no, la hoja en blanco encoge las columnas vacias (en "Tipo"
     no cabria escribir "Compuesto") y no coincide con la de soluciones. */
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  col.c-num { width: 4%; } col.c-sig { width: 8%; } col.c-tipo { width: 13%; }
  col.c-tiempos { width: 9%; } col.c-subdiv { width: 13%; }
  th { font-size: 8pt; text-transform: uppercase; letter-spacing: .03em; color: #6b5010;
       background: #f5f2ea; border: 1px solid #d8d0b8; padding: 4px 3px; }
  td { border: 1px solid #d8d0b8; height: 38px; text-align: center; vertical-align: middle; padding: 2px; }
  .num { width: 22px; color: #9a7b28; font-size: 8.5pt; font-weight: 700; }
  .sig { width: 52px; }
  /* La cifra como en una partitura: los dos números uno encima del otro. */
  .cifra { display: inline-flex; flex-direction: column; line-height: .95; font-weight: 700; font-size: 15pt; }
  .val { color: #c0392b; font-size: 10pt; font-weight: 600; }
  .fig svg { height: 26px; width: auto; }
  .fig .liga { font-size: 11pt; color: #c0392b; margin: 0 2px; }
  .pie { margin-top: 8px; border-top: 1px solid #ddd; padding-top: 4px;
         font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  ${EN ? 'th { white-space: nowrap; } col.c-sig { width: 10%; } col.c-subdiv { width: 12%; }' : ''}
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt;
             font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

async function generar(browser, opts) {
  const { solucion, png } = opts;
  /* Siempre a 3x: la vista previa se reduce a 300 px y, capturada a 1x, las
     lineas y el texto salen mas gruesos de lo que son en el PDF. */
  const page = await browser.newPage({ deviceScaleFactor: 3 });
  await page.setViewportSize({ width: 850, height: 1200 });
  await page.setContent('<!DOCTYPE html><html lang="' + (EN ? 'en' : 'es') + '"><body><div id="raiz"></div></body></html>');
  await page.addScriptTag({ path: ENGINE });

  const compases = await page.evaluate(() => window.tmCompasesData);
  const ejercicios = elegir(compases, 20, 7301);

  const html = await page.evaluate(({ ejercicios, solucion, css, logo, nombreTipo, nombreSubdiv, L }) => {
    const fig = id => (id ? window.tmNotaSVG(id) : '');
    const celda = contenido => `<td>${solucion ? contenido : ''}</td>`;

    const filas = ejercicios.map((c, i) => {
      const uc = c.uC.n2
        ? `<span class="fig">${fig(c.uC.n1)}<span class="liga">+</span>${fig(c.uC.n2)}</span>`
        : `<span class="fig">${fig(c.uC.n1)}</span>`;
      const sp = c.sig.split('/');
      return `<tr>
        <td class="num">${i + 1}</td>
        <td class="sig"><span class="cifra"><span>${sp[0]}</span><span>${sp[1]}</span></span></td>
        ${celda(`<span class="val">${nombreTipo[c.tipo]}</span>`)}
        ${celda(`<span class="val">${c.tiempos}</span>`)}
        ${celda(`<span class="val">${nombreSubdiv[c.subdiv]}</span>`)}
        ${celda(`<span class="fig">${fig(c.uT)}</span>`)}
        ${celda(`<span class="fig">${fig(c.uS)}</span>`)}
        ${celda(uc)}
      </tr>`;
    }).join('');

    return `<style>${css}</style>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; ${L.marca}</div>
        <h1>${L.titulo}${solucion ? '<span class="sol-tag">' + L.sol + '</span>' : ''}</h1>
      </div>
      <img class="logo" src="${logo}" width="34" height="35" alt="">
    </div>
    <p class="instr">${L.instr}</p>
    <p class="leyenda">${L.leyenda}</p>
    ${solucion ? '' : '<div class="datos"><span><b>' + L.nombre + '</b></span><span><b>' + L.curso + '</b></span><span><b>' + L.fecha + '</b></span></div>'}
  </div>
  <table>
    <colgroup><col class="c-num"><col class="c-sig"><col class="c-tipo"><col class="c-tiempos"><col class="c-subdiv"><col><col><col></colgroup>
    <thead><tr>
      <th></th><th>${L.th[0]}</th><th>${L.th[1]}</th><th>${L.th[2]}</th><th>${L.th[3]}</th>
      <th>${L.th[4]}</th><th>${L.th[5]}</th><th>${L.th[6]}</th>
    </tr></thead>
    <tbody>${filas}</tbody>
  </table>
  <div class="pie"><span>${L.pie}${solucion ? ' &middot; ' + L.pieSol : ''} &middot; ${ejercicios.length} ${L.pieEj}</span><span>teoriamusical.com.es</span></div>
</div>`;
  }, { ejercicios, solucion: !!solucion, css: CSS, logo: LOGO_DATA_URI, nombreTipo: NOMBRE_TIPO, nombreSubdiv: NOMBRE_SUBDIV, L });

  await page.setContent(html);
  await page.evaluate(() => document.fonts.load('36px Leland').then(() => document.fonts.ready));

  const nombre = `ficha-analizar-compases${solucion ? '-soluciones' : ''}`;
  const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });

  /* Que la ficha ocupe UNA cara. Se cuentan las paginas del PDF ya escrito y no
     la altura del div: Chromium pagina con un pixel de desbordamiento, asi que
     medir el alto en pantalla daba "cabe" en hojas que salian a dos caras. */
  const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);

  if (png) await page.screenshot({ path: path.join(OUT_DIR, nombre + '.png'), fullPage: true });

  if (!solucion) {
    const buf = await page.screenshot({ fullPage: true });
    const escala = 3;
    const base = sharp(buf)
      .extract({ left: 0, top: 0, width: 794 * escala, height: Math.round(297 / 25.4 * 96) * escala })
      .resize({ width: 300 });
    await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.png'));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.webp'));
  }

  await page.close();
  return { pdfPath, paginas, ejercicios };
}

module.exports = { elegir, FASES };

if (require.main !== module) return;

(async () => {
  const png = process.argv.includes('--png');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  for (const solucion of [false, true]) {
    const r = await generar(browser, { solucion, png });
    console.log('  ✓ ' + path.basename(r.pdfPath)
      + (r.paginas > 1 ? `  ATENCION: ocupa ${r.paginas} paginas, deberia ser 1` : ''));
  }
  await browser.close();
  console.log('\nFicha en ' + path.relative(ROOT, OUT_DIR));
})().catch(e => { console.error(e); process.exit(1); });
