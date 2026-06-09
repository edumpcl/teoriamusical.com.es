'use strict';
// Diagrama-comparación semitono cromático vs diatónico: el mismo sonido (Do#/Reb)
// escrito de dos formas. Cromático = mismo nombre (Do–Do#); diatónico = distinto
// nombre (Do–Reb). VexFlow + Playwright.
// Salida: assets/img/intervalos/semitono-cromatico-vs-diatonico.png (+ webp).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// panel: [titulo, color, [ [key, acc|null, nombre], [key, acc|null, nombre] ] ]
const PANELS = [
  ['Cromático', 'mismo nombre', '#b0532a', [['c/4', null, 'Do'], ['c/4', '#', 'Do♯']]],
  ['Diatónico', 'distinto nombre', '#9a6f08', [['c/4', null, 'Do'], ['d/4', 'b', 'Re♭']]],
];

const RENDER_FN = `
function render(def) {
  const { Renderer, Stave, StaveNote, Accidental, Annotation, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const panelW = def.panelW;
  def.panels.forEach((p, i) => {
    const x = 12 + i * panelW;
    // Título del panel (encima del pentagrama)
    ctx.save();
    ctx.setFont('Arial', 16, 'bold');
    ctx.setFillStyle(p[2]);
    ctx.fillText(p[0], x + 30, 22);
    ctx.setFont('Arial', 12.5, 'normal');
    ctx.setFillStyle('#666');
    ctx.fillText('(' + p[1] + ')', x + 30, 40);
    ctx.restore();
    const stave = new Stave(x, 50, panelW - 28);
    stave.addClef('treble');
    stave.setContext(ctx).draw();
    const notes = p[3].map(([key, acc, name]) => {
      const n = new StaveNote({ keys: [key], duration: 'h', clef: 'treble' });
      if (acc) n.addModifier(new Accidental(acc), 0);
      const a = new Annotation(name);
      a.setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
      a.setFont('Arial', 13, 'bold');
      n.addModifier(a, 0);
      return n;
    });
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setMode(Voice.Mode.SOFT);
    voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], panelW - 90);
    voice.draw(ctx, stave);
  });
  // Separador vertical
  ctx.save();
  ctx.setStrokeStyle('#e0d8c4');
  ctx.beginPath();
  ctx.moveTo(def.panelW + 12, 14);
  ctx.lineTo(def.panelW + 12, 184);
  ctx.stroke();
  ctx.restore();
}
`;

async function main() {
  const browser = await chromium.launch();
  const def = { panels: PANELS, panelW: 250, vw: 12 + PANELS.length * 250 + 12, vh: 188 };
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: def.vw, height: def.vh });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((d) => render(d), def);
  await page.waitForTimeout(160);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'semitono-cromatico-vs-diatonico.png'), await page.screenshot({ fullPage: true }));
  console.log('  ok semitono-cromatico-vs-diatonico.png (' + def.vw + 'x' + def.vh + ')');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
