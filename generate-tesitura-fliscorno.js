'use strict';
// Un mini-pentagrama por registro de la fliscorno en Si♭ (notas ESCRITAS, clave de sol).
// Registros: grave Fa♯3–Si3; medio Do4–Si4; agudo Do5–Do6.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/fliscorno');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  ['tesitura-grave', ['f#/3', 'b/3'],  95],
  ['tesitura-medio', ['c/4', 'b/4'],  110],
  ['tesitura-agudo', ['c/5', 'c/6'],  120],
];

const RENDER_FN = `
function renderReg(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice, Accidental } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
  const stave = new Stave(6, def.staveY, def.vw - 12);
  stave.addClef('treble');
  stave.setContext(ctx).draw();
  const notes = def.keys.map(function (k) {
    const n = new StaveNote({ keys: [k], duration: 'w', clef: 'treble' });
    if (k.indexOf('#') > -1) n.addModifier(new Accidental('#'), 0);
    else if (/^[a-g]b\\//.test(k)) n.addModifier(new Accidental('b'), 0);
    return n;
  });
  const voice = new Voice({ num_beats: 8, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 95);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, keys, staveY] of ITEMS) {
    const def = { keys, vw: 175, vh: 260, staveY };
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
