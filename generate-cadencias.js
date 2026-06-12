'use strict';
// Pentagramas de las cadencias (progresiones de 2 acordes en Do Mayor, VexFlow).
// Salida: assets/img/cadencias/*.png  (webp aparte)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/cadencias');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, [acorde1, acorde2]  (cada acorde = lista de claves de grave a agudo). Do M: sin alteraciones.
const CAD = [
  { file: 'cadencia-autentica', chords: [['g/4','b/4','d/5','f/5'], ['c/4','e/4','g/4','c/5']] }, // V7 -> I
  { file: 'cadencia-plagal',    chords: [['f/4','a/4','c/5'],       ['c/4','e/4','g/4']] },        // IV -> I
  { file: 'cadencia-rota',      chords: [['g/4','b/4','d/5','f/5'], ['a/4','c/5','e/5']] },        // V7 -> vi
  { file: 'cadencia-semicadencia-dominante',    chords: [['c/4','e/4','g/4'], ['g/4','b/4','d/5']] }, // I -> V (semicadencia sobre la dominante)
  { file: 'cadencia-semicadencia-subdominante', chords: [['c/4','e/4','g/4'], ['f/4','a/4','c/5']] }, // I -> IV (semicadencia sobre la subdominante)
];

const RENDER_FN = `
function renderCad(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 24);
  stave.addClef('treble');
  stave.setContext(ctx).draw();
  const notes = def.chords.map(function (keys) {
    return new StaveNote({ keys: keys, duration: 'w', clef: 'treble' });   // redondas: sin plica
  });
  const voice = new Voice({ num_beats: 8, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 110);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of CAD) {
    def.vw = 320; def.vh = 200;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderCad(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(250);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + CAD.length + ' cadencias.');
}
main().catch((e) => { console.error(e); process.exit(1); });
