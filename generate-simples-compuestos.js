'use strict';
// Intervalo simple (dentro de la 8ª) vs compuesto (mayor que la 8ª), en VexFlow.
// Armónicos para que se vea la amplitud. Salida: assets/img/intervalos/*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  { file: 'intervalo-simple',    keys: ['c/4', 'g/4'] },  // 5ª justa (simple)
  { file: 'intervalo-compuesto', keys: ['c/4', 'g/5'] },  // 12ª (8ª + 5ª)
  { file: 'intervalo-novena',    keys: ['c/4', 'd/5'] },  // 9ª (8ª + 2ª)
];

const RENDER_FN = `
function renderIv(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 70, def.vw - 24);
  stave.addClef('treble'); stave.setContext(ctx).draw();
  const note = new StaveNote({ keys: def.keys, duration: 'w', clef: 'treble' });
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 220; def.vh = 280;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderIv(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(200);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
