'use strict';
// Símbolos de las 5 alteraciones sobre una nota (VexFlow + Playwright).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/alteraciones');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, tipo de alteración VexFlow
const ITEMS = [
  ['alteracion-sostenido', '#'],
  ['alteracion-bemol', 'b'],
  ['alteracion-becuadro', 'n'],
  ['alteracion-doble-sostenido', '##'],
  ['alteracion-doble-bemol', 'bb'],
];

const RENDER_FN = `
function renderItem(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice, Accidental } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 20, def.vw - 20);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  const note = new StaveNote({ keys: ['g/4'], duration: 'w', clef: 'treble' });
  note.addModifier(new Accidental(def.acc), 0);

  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 80);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, acc] of ITEMS) {
    const def = { acc, vw: 150, vh: 120 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderItem(d), def);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' alteraciones.');
}
main().catch((e) => { console.error(e); process.exit(1); });
