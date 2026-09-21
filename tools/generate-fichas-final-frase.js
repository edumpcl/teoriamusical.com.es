'use strict';
/**
 * Ficha imprimible de «¿cómo termina la melodía?» (A4, una cara) con su hoja de
 * soluciones.
 *
 *   node tools/generate-fichas-final-frase.js            -> ficha + soluciones + preview
 *   node tools/generate-fichas-final-frase.js --png=DIR  -> además, captura de cada hoja
 *
 * Dieciocho finales de melodía (los dos últimos compases, con doble barra), seis
 * de cada nivel (fácil/medio/difícil), con tres de cada tipo en cada nivel. El
 * alumno marca si termina en tiempo fuerte o en tiempo débil. Reutiliza
 * assets/js/completar-compas-engine.js, assets/js/tipo-de-comienzo-engine.js y
 * assets/js/tipo-de-final-engine.js (generarLote/dibujar). Se audita con
 * tools/verificar-final-frase.js.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const ENGINE1 = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const ENGINE2 = path.join(ROOT, 'assets/js/tipo-de-comienzo-engine.js');
const ENGINE3 = path.join(ROOT, 'assets/js/tipo-de-final-engine.js');
const OUT_DIR = path.join(ROOT, 'assets/img/final/fichas');

/* Los lotes de la ficha: nivel, cuántos, semilla. */
const LOTES = [
  [1, 6, 5101],
  [2, 6, 5102],
  [3, 6, 5103],
];
module.exports = { LOTES };
if (require.main !== module) return;

const { chromium } = require('playwright');
const sharp = require('sharp');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'assets/img/2026/04/bach_favicon.png')).toString('base64');

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 9mm 13mm 5mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 5px; margin-bottom: 8px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 34px; height: 35px; flex: none; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 16pt; margin: 3px 0; }
  .instr { font-size: 9.5pt; margin: 0 0 4px; color: #333; line-height: 1.35; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 5px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  h2 { font-size: 10.5pt; margin: 8px 0 4px; color: #8b6914; }
  .rejilla { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 10px; }
  .celda { position: relative; border: 1px solid #e8e0cc; border-radius: 6px; padding: 3px 6px 3px 22px; page-break-inside: avoid; }
  .celda svg { display: block; margin: 0 auto; height: auto !important; }
  .num { position: absolute; top: 3px; left: 6px; font-size: 8.5pt; font-weight: 700; color: #9a7b28; }
  .ops { display: flex; justify-content: space-between; gap: 6px; font-size: 8.5pt; color: #333; padding: 0 2px 1px; }
  .op { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
  .caja { display: inline-block; width: 10px; height: 10px; border: 1.3px solid #777; border-radius: 2px; text-align: center; line-height: 8px; font-size: 9pt; font-weight: 700; }
  .op.sol { color: #c0392b; font-weight: 700; }
  .op.sol .caja { border-color: #c0392b; background: #c0392b; color: #fff; }
  .pie { margin-top: 6px; border-top: 1px solid #ddd; padding-top: 4px; font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt; font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

const TIT = { 1: '1. Fácil (compases simples; la última nota llega hasta el final del compás)', 2: '2. Medio (simples y compuestos; silencios tras la última nota y último compás incompleto)', 3: '3. Difícil (contratiempos, figuras pequeñas y silencios antes de la última nota)' };

function html(solucion) {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE LA FRASE MUSICAL</div>
        <h1>¿Cómo termina la melodía?${solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO}" width="34" height="35" alt="">
    </div>
    <p class="instr">Marca cómo termina cada melodía. Fíjate en <b>en qué tiempo empieza la última nota</b> del último compás, no en cuánto dura ni en los silencios que haya detrás. <b>Tiempo fuerte (íctico):</b> empieza en el tiempo 1. <b>Tiempo débil (posíctico):</b> empieza en cualquier otro punto del compás. El último compás puede estar incompleto: su tiempo fuerte sigue siendo el primero.</p>
    ${solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  <div id="cuerpo"></div>
  <div class="pie"><span>Final de frase en tiempo fuerte y débil${solucion ? ' &middot; soluciones' : ''} &middot; teoriamusical.com.es/ejercicios/final-tiempo-fuerte-y-debil/</span></div>
</div></body></html>`;
}

/* Dentro de la página, con los motores cargados. */
function montar({ LOTES, solucion }) {
  const T = window.tmFinalTest;
  const cuerpo = document.getElementById('cuerpo');
  let n = 0;
  LOTES.forEach(([nivel, cuantos, semilla]) => {
    const h = document.createElement('h2'); h.textContent = window.__tmTit[nivel]; cuerpo.appendChild(h);
    const rej = document.createElement('div'); rej.className = 'rejilla'; cuerpo.appendChild(rej);
    T.generarLote({ nivel, n: cuantos }, semilla).forEach(it => {
      const c = document.createElement('div'); c.className = 'celda';
      const ops = T.TIPOS.map(t => {
        const nombre = T.ETIQUETA[t];
        const marcada = solucion && t === it.tipo;
        return `<span class="op${marcada ? ' sol' : ''}"><span class="caja">${marcada ? '&#10003;' : ''}</span>${nombre}</span>`;
      }).join('');
      c.innerHTML = `<span class="num">${++n}</span><div class="svg"></div><div class="ops">${ops}</div>`;
      rej.appendChild(c);
      T.dibujar(c.querySelector('.svg'), it, { compacto: 0.85 });
    });
  });
  // Misma escala dentro de cada nivel (si no, las cortas salen gigantes y las
  // largas diminutas); cada nivel aprovecha su propio hueco, hasta tamaño natural.
  const interior = document.querySelector('.celda').clientWidth - 28 - 2;
  Array.from(document.querySelectorAll('.rejilla')).forEach(rej => {
    const svgs = Array.from(rej.querySelectorAll('svg'));
    const anchos = svgs.map(s => Number(s.getAttribute('viewBox').split(' ')[2]));
    const K = Math.min(1, interior / Math.max.apply(null, anchos));
    svgs.forEach((s, i) => { s.style.width = (anchos[i] * K) + 'px'; s.style.maxWidth = 'none'; });
  });
  return n;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const png = (process.argv.find(a => a.startsWith('--png=')) || '').slice(6);
  let avisos = 0;
  for (const solucion of [false, true]) {
    const page = await browser.newPage({ deviceScaleFactor: 3 });
    await page.setViewportSize({ width: 850, height: 1200 });
    await page.setContent(html(solucion));
    await page.addScriptTag({ path: VF5 });
    await page.addScriptTag({ path: ENGINE1 });
    await page.addScriptTag({ path: ENGINE2 });
    await page.addScriptTag({ path: ENGINE3 });
    await page.evaluate((TIT) => { window.__tmTit = TIT; }, TIT);
    const n = await page.evaluate(montar, { LOTES, solucion });
    const nombre = 'ficha-final-frase' + (solucion ? '-soluciones' : '');
    const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
    const sobra = await page.evaluate(() => Math.round(document.querySelector('.hoja').scrollHeight - 297 / 25.4 * 96));
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
    const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);
    // Glifos cortados: tinta en los bordes de cada dibujo.
    const svgs = await page.$$('.celda svg');
    const cortes = [];
    for (let i = 0; i < svgs.length; i++) {
      const { data, info } = await sharp(await svgs[i].screenshot()).greyscale().raw().toBuffer({ resolveWithObject: true });
      const tinta = f => { for (let x = 0; x < info.width; x++) if (data[f * info.width + x] < 160) return true; return false; };
      if (tinta(0) || tinta(1) || tinta(info.height - 1) || tinta(info.height - 2)) cortes.push(i + 1);
    }
    if (png) await page.screenshot({ path: path.join(png, nombre + '.png'), fullPage: true });
    if (!solucion) {
      const buf = await page.screenshot({ fullPage: true });
      const base = sharp(buf).extract({ left: 0, top: 0, width: 794 * 3, height: Math.round(297 / 25.4 * 96) * 3 }).resize({ width: 300 });
      await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.png'));
      await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.webp'));
    }
    await page.close();
    const problemas = [];
    if (paginas !== 1) problemas.push(`ocupa ${paginas} páginas (sobran ${sobra}px)`);
    if (cortes.length) problemas.push(`dibujos cortados: ${cortes.join(', ')}`);
    avisos += problemas.length;
    console.log(`  ${problemas.length ? '!' : '✓'} ${nombre}.pdf  ${n} melodías` + (problemas.length ? '  ATENCIÓN: ' + problemas.join('; ') : `  (margen ${-sobra}px)`));
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · ficha en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
