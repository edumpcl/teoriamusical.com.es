'use strict';
/**
 * Ficha imprimible de tempo y agógica (A4, una cara) con su hoja de soluciones.
 *
 *   node tools/generate-fichas-tempo.js            -> ficha + soluciones + preview
 *   node tools/generate-fichas-tempo.js --png=DIR  -> además, captura de cada hoja
 *
 * Dos partes, las mismas que los ejercicios de /ejercicios/tempo/:
 *   1. Unir cada término con su significado (se escribe la letra).
 *   2. Ordenar velocidades: seis series, numerando del 1 al 4.
 *
 * Las preguntas salen de assets/js/tempo-ejercicios.js, el mismo motor que los
 * tests en pantalla, así que papel y pantalla no pueden decir cosas distintas.
 * La teoría se audita con tools/verificar-tempo-ejercicios.js.
 */
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets/img/tempo/fichas');
const SEMILLA_UNIR = 9101;
const SEMILLA_ORDEN = 9202;

/* El motor es un IIFE de navegador: se carga con un window de mentira. */
const caja = { window: {}, document: undefined };
caja.self = caja;
vm.createContext(caja);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js/tempo-ejercicios.js'), 'utf8'), caja);
const MOTOR = caja.window.tmTempoEjercicios;

const LETRAS = 'abcdefghijklmnopqrstuvwxyz'.split('');

function barajarCon(semilla, arr) {
  let a = semilla >>> 0;
  const rnd = () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const c = arr.slice();
  for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
  return c;
}

/* Parte 1: 12 términos (6 de velocidad y 6 de agógica) con sus significados mezclados. */
function unir() {
  const vel = barajarCon(SEMILLA_UNIR, MOTOR.VELOCIDADES).slice(0, 6);
  const ago = barajarCon(SEMILLA_UNIR + 1, MOTOR.AGOGICA).slice(0, 6);
  const terminos = barajarCon(SEMILLA_UNIR + 2, vel.concat(ago));
  const significados = barajarCon(SEMILLA_UNIR + 3, terminos);
  return {
    terminos: terminos.map((x, i) => ({
      n: i + 1, t: x.t,
      letra: LETRAS[significados.findIndex(y => y.t === x.t)]
    })),
    significados: significados.map((x, i) => ({ letra: LETRAS[i], sig: x.sig }))
  };
}

const FICHA = {
  titulo: 'Tempo y agógica',
  instr: 'Primera parte: escribe al lado de cada término la letra de su significado. Segunda parte: numera cada serie según el orden que se pide.',
};

module.exports = { unir, SEMILLA_ORDEN };
if (require.main !== module) return;

const { chromium } = require('playwright');
const sharp = require('sharp');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'assets/img/2026/04/bach_favicon.png')).toString('base64');

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 10mm 14mm 6mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 6px; margin-bottom: 10px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 34px; height: 35px; flex: none; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 17pt; margin: 3px 0; }
  .instr { font-size: 9.5pt; margin: 0; color: #333; line-height: 1.35; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 6px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  h2 { font-size: 11.5pt; margin: 12px 0 7px; color: #8b6914; }
  .cols { display: grid; grid-template-columns: 1fr 1.35fr; gap: 14px; }
  .lista { margin: 0; padding: 0; list-style: none; }
  .lista li { font-size: 10pt; padding: 4px 0; border-bottom: 1px dotted #ddd; display: flex; align-items: baseline; gap: 7px; }
  .lista .num { color: #9a7b28; font-weight: 700; min-width: 16px; }
  .lista .hueco { display: inline-block; min-width: 26px; border-bottom: 1px solid #9a9a9a; text-align: center; }
  .lista .val { color: #c0392b; font-weight: 700; border: 0; }
  .sig li { font-size: 9.5pt; }
  .sig .let { color: #9a7b28; font-weight: 700; min-width: 16px; }
  .series { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; }
  .serie { border: 1px solid #e8e0cc; border-radius: 6px; padding: 6px 9px; page-break-inside: avoid; }
  .serie p { margin: 0 0 4px; font-size: 9pt; color: #555; }
  .serie .fichas { display: flex; flex-wrap: wrap; gap: 6px; }
  .ficha { border: 1px solid #d8d0b8; border-radius: 5px; padding: 3px 7px; font-size: 9.5pt; display: flex; align-items: center; gap: 5px; }
  .ficha .caja { display: inline-block; width: 16px; height: 15px; border: 1px solid #9a9a9a; border-radius: 3px; text-align: center; font-size: 9pt; line-height: 14px; }
  .ficha .caja.val { color: #c0392b; font-weight: 700; border-color: #c0392b; }
  .pie { margin-top: 8px; border-top: 1px solid #ddd; padding-top: 5px; font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt; font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function html(solucion) {
  const u = unir();
  const series = MOTOR.generar('ordenar', { sentido: 'mezcla', cuantos: 4, n: 6 }, SEMILLA_ORDEN);
  const hueco = v => (solucion ? `<span class="hueco val">${v}</span>` : '<span class="hueco"></span>');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE TEMPO</div>
        <h1>${FICHA.titulo}${solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO}" width="34" height="35" alt="">
    </div>
    <p class="instr">${FICHA.instr}</p>
    ${solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>

  <h2>1. Cada término con su significado</h2>
  <div class="cols">
    <ul class="lista">
      ${u.terminos.map(x => `<li><span class="num">${x.n}.</span> <strong>${x.t}</strong> ${hueco(x.letra)}</li>`).join('\n      ')}
    </ul>
    <ul class="lista sig">
      ${u.significados.map(x => `<li><span class="let">${x.letra})</span> ${x.sig}</li>`).join('\n      ')}
    </ul>
  </div>

  <h2>2. Ordena las velocidades</h2>
  <div class="series">
    ${series.map((s, i) => {
      const orden = {};
      s.solucion.forEach((t, k) => { orden[t] = k + 1; });
      return `<div class="serie"><p>${i + 1}. De más ${s.sentido === 'lento-rapido' ? 'lento a más rápido' : 'rápido a más lento'}:</p>
      <div class="fichas">${s.fichas.map(t => `<span class="ficha"><span class="caja${solucion ? ' val' : ''}">${solucion ? orden[t] : ''}</span>${t}</span>`).join('')}</div></div>`;
    }).join('\n    ')}
  </div>

  <div class="pie"><span>Tempo y agógica${solucion ? ' &middot; soluciones' : ''} &middot; teoriamusical.com.es/ejercicios/tempo/</span><span>teoriamusical.com.es</span></div>
</div></body></html>`;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  let avisos = 0;
  const png = (process.argv.find(a => a.startsWith('--png=')) || '').slice(6);
  for (const solucion of [false, true]) {
    const page = await browser.newPage({ deviceScaleFactor: 3 });
    await page.setViewportSize({ width: 850, height: 1200 });
    await page.setContent(html(solucion));
    const nombre = 'ficha-tempo' + (solucion ? '-soluciones' : '');
    const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
    const sobra = await page.evaluate(() => Math.round(document.querySelector('.hoja').scrollHeight - 297 / 25.4 * 96));
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
    const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);
    if (png) await page.screenshot({ path: path.join(png, nombre + '.png'), fullPage: true });
    if (!solucion) {
      const buf = await page.screenshot({ fullPage: true });
      const base = sharp(buf).extract({ left: 0, top: 0, width: 794 * 3, height: Math.round(297 / 25.4 * 96) * 3 }).resize({ width: 300 });
      await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.png'));
      await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.webp'));
    }
    await page.close();
    if (paginas !== 1) { console.log(`  ! ${nombre}.pdf ocupa ${paginas} páginas (sobran ${sobra}px)`); avisos++; }
    else console.log(`  ✓ ${nombre}.pdf  (margen ${-sobra}px)`);
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · ficha en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
