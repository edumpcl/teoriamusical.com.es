'use strict';
/**
 * Ficha imprimible de «completar compases» (A4, una cara) con su hoja de soluciones.
 *
 *   node tools/generate-fichas-completar-compases.js            -> ficha + soluciones + preview
 *   node tools/generate-fichas-completar-compases.js --png=DIR  -> además, captura de cada hoja
 *
 * Doce compases con un hueco marcado con una línea: el alumno escribe encima lo que
 * falta. Cuatro de cada nivel: una figura, una figura o un silencio, varias figuras.
 * Los compases salen del mismo motor que el test en pantalla
 * (assets/js/completar-compas-engine.js), dibujados con VexFlow 5.
 * La teoría se audita con tools/verificar-completar-compas.js.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const ENGINE = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const OUT_DIR = path.join(ROOT, 'assets/img/compases/fichas');

/* Los lotes de la ficha: nivel, grupo, cuántos, semilla. El verificador los reutiliza. */
const LOTES = [
  [1, 'mezcla', 6, 8101],
  [2, 'mezcla', 6, 8102],
  [3, 'mezcla', 6, 8103],
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
  .celda { position: relative; border: 1px solid #e8e0cc; border-radius: 6px; padding: 3px 6px 2px 6px; page-break-inside: avoid; }
  .celda svg { display: block; margin: 0 auto; height: 74px !important; width: auto !important; max-width: 100% !important; }
  .num { position: absolute; top: 3px; left: 6px; font-size: 8.5pt; font-weight: 700; color: #9a7b28; }
  .pie { margin-top: 6px; border-top: 1px solid #ddd; padding-top: 4px; font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt; font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function html(solucion) {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE COMPASES</div>
        <h1>Completar compases${solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO}" width="34" height="35" alt="">
    </div>
    <p class="instr">A cada compás le falta algo en el sitio marcado con la línea roja. Escribe encima de la línea lo que falta. En la primera parte falta una figura; en la segunda, una figura o un silencio; en la tercera faltan varias figuras (vale cualquier combinación que sume lo que falta).</p>
    ${solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  <div id="cuerpo"></div>
  <div class="pie"><span>Compases &middot; completar compases${solucion ? ' &middot; soluciones' : ''} &middot; teoriamusical.com.es/ejercicios/compases/</span><span>teoriamusical.com.es</span></div>
</div></body></html>`;
}

/* Dentro de la página, con el motor cargado. */
function montar({ LOTES, solucion }) {
  const T = window.tmCompletarCompasData;
  const cuerpo = document.getElementById('cuerpo');
  const TIT = { 1: '1. Falta una figura', 2: '2. Falta una figura o un silencio', 3: '3. Faltan varias figuras' };
  let n = 0;
  LOTES.forEach(([nivel, grupo, cuantos, semilla]) => {
    const h = document.createElement('h2'); h.textContent = TIT[nivel]; cuerpo.appendChild(h);
    const rej = document.createElement('div'); rej.className = 'rejilla'; cuerpo.appendChild(rej);
    T.generar({ nivel, grupo, n: cuantos }, semilla).forEach(it => {
      const c = document.createElement('div'); c.className = 'celda';
      c.innerHTML = `<span class="num">${++n}</span><div class="svg"></div>`;
      rej.appendChild(c);
      T.dibujar(c.querySelector('.svg'), it, { w: 400, revelar: solucion });
    });
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
    await page.addScriptTag({ path: ENGINE });
    const n = await page.evaluate(montar, { LOTES, solucion });
    const nombre = 'ficha-completar-compases' + (solucion ? '-soluciones' : '');
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
    console.log(`  ${problemas.length ? '!' : '✓'} ${nombre}.pdf  ${n} compases` + (problemas.length ? '  ATENCIÓN: ' + problemas.join('; ') : `  (margen ${-sobra}px)`));
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · ficha en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
