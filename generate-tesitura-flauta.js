'use strict';
// Un mini-pentagrama por registro de la flauta (mismo marco, notas en su altura real).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/flauta');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, [nota grave, nota aguda] del registro
const ITEMS = [
  ['tesitura-grave',      ['c/4', 'c/5']],
  ['tesitura-medio',      ['c/5', 'c/6']],
  ['tesitura-agudo',      ['c/6', 'c/7']],
  ['tesitura-sobreagudo', ['c/7', 'e/7']],
];

const RENDER_FN = `
function renderReg(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
  const stave = new Stave(6, def.staveY, def.vw - 12);
  stave.addClef('treble');
  stave.setContext(ctx).draw();
  const n1 = new StaveNote({ keys: [def.keys[0]], duration: 'w', clef: 'treble' });
  const n2 = new StaveNote({ keys: [def.keys[1]], duration: 'w', clef: 'treble' });
  const voice = new Voice({ num_beats: 8, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables([n1, n2]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 95);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, keys] of ITEMS) {
    const def = { keys, vw: 175, vh: 235, staveY: 108 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderReg(d), def);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' registros.');
}
main().catch((e) => { console.error(e); process.exit(1); });
