'use strict';
/**
 * Fichas imprimibles de figuras y ritmo (A4, una cara) con su hoja de soluciones.
 *
 *   node tools/generate-fichas-figuras.js
 *
 * Cinco fichas, una por ejercicio de /ejercicios/figuras/:
 *   identificar    24 figuras y silencios (con puntillo y doble puntillo)
 *   valor          18 figuras en un compás: 9 en simples y 9 en compuestos
 *   equivalencias  18 preguntas: 9 «¿cuántas caben?» y 9 «¿qué figura es?»
 *   sumar          12 fragmentos: 6 en simples y 6 en compuestos
 *   ligaduras      12 ligaduras: 6 en simples y 6 en compuestos
 *
 * Las preguntas, los dibujos y las respuestas salen de assets/js/figuras-engine.js,
 * el mismo motor que los tests en pantalla: papel y pantalla no pueden decir cosas
 * distintas. La teoría se audita con tools/verificar-figuras.js, que incluye las
 * semillas de estas fichas.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const ENGINE = path.join(ROOT, 'assets/js/figuras-engine.js');
const OUT_DIR = path.join(ROOT, 'assets/img/figuras/fichas');

const FICHAS = {
  identificar: {
    titulo: 'Identificar figuras y silencios', cols: 4, ancho: 96,
    lotes: [['identificar', { modo: 'mezcla', n: 24 }, 7101]],
    instr: 'Escribe debajo de cada símbolo qué es: la figura o el silencio, y si lleva puntillo o doble puntillo.',
  },
  valor: {
    titulo: 'El valor de las figuras en el compás', cols: 3, ancho: 150,
    lotes: [['valor', { grupo: 'simples', n: 9 }, 7201], ['valor', { grupo: 'compuestos', n: 9 }, 7202]],
    instr: 'Escribe cuánto vale cada figura o silencio en el compás indicado, en tiempos. En los compases compuestos el tiempo es la negra con puntillo: usa fracciones (en 6/8 la corchea vale ⅓ de tiempo).',
  },
  equivalencias: {
    titulo: 'Equivalencias entre figuras', cols: 2, ancho: 96,
    lotes: [['equivalencias', { clase: 'cuantas', n: 9 }, 7301], ['equivalencias', { clase: 'que', n: 9 }, 7302]],
    instr: 'Responde a cada pregunta. Las equivalencias entre figuras no dependen del compás.',
  },
  sumar: {
    titulo: 'Sumar las figuras de un compás', cols: 2, ancho: 330,
    lotes: [['sumar', { grupo: 'simples', n: 6 }, 7401], ['sumar', { grupo: 'compuestos', n: 6 }, 7402]],
    instr: 'Suma lo que valen las figuras y los silencios de cada fragmento en su compás y escribe el resultado en tiempos. Los silencios también cuentan.',
  },
  ligaduras: {
    titulo: 'Ligadura de unión o de expresión', cols: 2, ancho: 300,
    lotes: [['ligaduras', { grupo: 'simples', n: 6 }, 7501], ['ligaduras', { grupo: 'compuestos', n: 6 }, 7502]],
    instr: 'Escribe si cada ligadura es de unión o de expresión y cuánto dura la primera nota que abarca, en tiempos. La de unión suma las duraciones; la de expresión no.',
  },
};

module.exports = { FICHAS };
if (require.main !== module) return;

const { chromium } = require('playwright');
const sharp = require('sharp');
const LOGO_DATA_URI = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'assets/img/2026/04/bach_favicon.png')).toString('base64');

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
  .rejilla { display: grid; gap: 5px 8px; }
  .celda { position: relative; border: 1px solid #e8e0cc; border-radius: 6px; padding: 3px 6px 5px; page-break-inside: avoid; }
  .celda svg { display: block; margin: 0 auto; }
  .num { position: absolute; top: 3px; left: 6px; font-size: 8.5pt; font-weight: 700; color: #9a7b28; }
  .fila { display: flex; align-items: center; gap: 8px; }
  .fila .svg { width: 80px; flex: none; }
  .pide { font-size: 9.5pt; margin: 0; line-height: 1.3; padding-left: 14px; }
  .linea { display: flex; align-items: baseline; gap: 5px; font-size: 9pt; margin: 3px 2px 0; }
  .linea b { font-weight: 600; white-space: nowrap; }
  .linea > span { flex: 1; border-bottom: 1px solid #9a9a9a; min-height: 13px; }
  .linea .val { border: 0; color: #c0392b; font-weight: 700; font-size: 9.5pt; text-align: center; }
  .tm-fg-fr { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1; font-size: .78em; }
  .tm-fg-fr sup, .tm-fg-fr sub { position: static; font-size: 1em; line-height: 1.05; }
  .tm-fg-fr sup { border-bottom: 1.2px solid currentColor; padding: 0 1px; }
  .pie { margin-top: 6px; border-top: 1px solid #ddd; padding-top: 4px; font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt; font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

/* Alto de cada dibujo en la hoja. Sin fijarlo, el SVG crecía con el ancho de la
   celda y la mitad de las fichas saltaban a una segunda cara. */
const ALTO = { identificar: 80, valor: 80, equivalencias: 60, sumar: 92, ligaduras: 84 };

function html(id, cfg, solucion) {
  const alto = `.celda .svg svg { height: ${ALTO[id]}px !important; width: auto !important; max-width: 100% !important; }`;
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}${alto}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE RITMO</div>
        <h1>${cfg.titulo}${solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO_DATA_URI}" width="34" height="35" alt="">
    </div>
    <p class="instr">${cfg.instr}</p>
    ${solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  <div class="rejilla" style="grid-template-columns:repeat(${cfg.cols},1fr)"></div>
  <div class="pie"><span>Figuras y ritmo &middot; ${cfg.titulo.toLowerCase()}${solucion ? ' &middot; soluciones' : ''}</span><span>teoriamusical.com.es</span></div>
</div></body></html>`;
}

/* Se ejecuta dentro de la página, con el motor ya cargado. */
function montar({ id, cfg, solucion }) {
  const T = window.tmFiguras;
  const rej = document.querySelector('.rejilla');
  const items = [];
  cfg.lotes.forEach(([tipo, o, semilla]) => T.generar(tipo, o, semilla).forEach(it => items.push(it)));
  const hueco = v => (solucion ? `<span class="val">${v}</span>` : '<span></span>');
  items.forEach((it, i) => {
    const c = document.createElement('div');
    c.className = 'celda';
    let h = `<span class="num">${i + 1}</span>`;
    if (id === 'identificar') {
      h += '<div class="svg"></div><p class="linea">' + hueco(T.nombre(it.sim)) + '</p>';
    } else if (id === 'valor') {
      h += '<div class="svg"></div><p class="linea"><b>Vale:</b>' + hueco(T.enTiempos(it.correcta, true)) + '</p>';
    } else if (id === 'equivalencias') {
      const resp = it.clase === 'cuantas' ? String(it.correcta) : 'una ' + T.frase(it.correcta);
      h += '<div class="fila"><div class="svg"></div><p class="pide">' + T.enunciado(it, true) + '</p></div><p class="linea"><b>Respuesta:</b>' + hueco(resp) + '</p>';
    } else if (id === 'sumar') {
      h += '<div class="svg"></div><p class="linea"><b>Suman:</b>' + hueco(T.enTiempos(it.correcta, true)) + '</p>';
    } else {
      h += '<div class="svg"></div><p class="linea"><b>Ligadura de:</b>' + hueco(it.clase === 'union' ? 'unión' : 'expresión') + '</p>'
        + '<p class="linea"><b>La 1ª nota dura:</b>' + hueco(T.enTiempos(it.correcta, true)) + '</p>';
    }
    c.innerHTML = h;
    rej.appendChild(c);
    const spec = T.specDe(it);
    // Las ligaduras que cruzan la barra llevan más figuras: esas se dibujan a su ancho.
    if (spec.barra == null) spec.w = cfg.ancho;
    T.dibujar(c.querySelector('.svg'), spec);
  });
  return items.length;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  let avisos = 0;
  for (const [id, cfg] of Object.entries(FICHAS)) {
    for (const solucion of [false, true]) {
      const page = await browser.newPage({ deviceScaleFactor: 3 });
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.setViewportSize({ width: 850, height: 1200 });
      await page.setContent(html(id, cfg, solucion));
      await page.addScriptTag({ path: VF5 });
      await page.addScriptTag({ path: ENGINE });
      await page.evaluate(() => document.fonts.ready);
      const n = await page.evaluate(montar, { id, cfg, solucion });
      await page.evaluate(() => document.fonts.ready);

      const nombre = `ficha-${id}${solucion ? '-soluciones' : ''}`;
      const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
      const sobra = await page.evaluate(() => Math.round(document.querySelector('.hoja').scrollHeight - 297 / 25.4 * 96));
      await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
      const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);

      // Glifos cortados: tinta en el borde de arriba o de abajo de cada dibujo.
      const svgs = await page.$$('.celda svg');
      const cortes = [];
      for (let i = 0; i < svgs.length; i++) {
        const { data, info } = await sharp(await svgs[i].screenshot()).greyscale().raw().toBuffer({ resolveWithObject: true });
        const tinta = f => { for (let x = 0; x < info.width; x++) if (data[f * info.width + x] < 160) return true; return false; };
        if (tinta(0) || tinta(1) || tinta(info.height - 1) || tinta(info.height - 2)) cortes.push(i + 1);
      }

      // --png=carpeta: captura de cada hoja (también las soluciones) para revisarla a ojo.
      const png = (process.argv.find(a => a.startsWith('--png=')) || '').slice(6);
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
      if (cortes.length) problemas.push(`dibujos cortados: ${cortes.slice(0, 6).join(', ')}`);
      if (errs.length) problemas.push('errores: ' + errs.slice(0, 2).join(' | '));
      avisos += problemas.length;
      console.log(`  ${problemas.length ? '!' : '✓'} ${nombre}.pdf  ${n} ejercicios` + (problemas.length ? '  ATENCIÓN: ' + problemas.join('; ') : `  (margen ${-sobra}px)`));
    }
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · fichas en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
