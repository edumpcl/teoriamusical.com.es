'use strict';
// Genera los símbolos de las figuras musicales y silencios (VexFlow + Playwright).
// Salida: assets/img/figuras/*.png  (luego add_img_dimensions.py + convert_to_webp.py)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/figuras');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, duration, isRest, dotted
const ITEMS = [
  ['figura-redonda', 'w', false, false],
  ['figura-blanca', 'h', false, false],
  ['figura-negra', 'q', false, false],
  ['figura-corchea', '8', false, false],
  ['figura-semicorchea', '16', false, false],
  ['figura-fusa', '32', false, false],
  ['figura-semifusa', '64', false, false],
  ['silencio-redonda', 'w', true, false],
  ['silencio-blanca', 'h', true, false],
  ['silencio-negra', 'q', true, false],
  ['silencio-corchea', '8', true, false],
  ['silencio-semicorchea', '16', true, false],
  ['silencio-fusa', '32', true, false],
  ['silencio-semifusa', '64', true, false],
  ['figura-redonda-puntillo', 'w', false, true],
  ['figura-blanca-puntillo', 'h', false, true],
  ['figura-negra-puntillo', 'q', false, true],
  ['figura-corchea-puntillo', '8', false, true],
  ['figura-semicorchea-puntillo', '16', false, true],
  ['figura-fusa-puntillo', '32', false, true],
  ['figura-semifusa-puntillo', '64', false, true],
];

const RENDER_FN = `
function renderItem(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice, Dot } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 20, def.vw - 20);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  const dur = def.isRest ? def.duration + 'r' : def.duration;
  const key = def.isRest ? 'b/4' : 'g/4';
  const note = new StaveNote({ keys: [key], duration: dur, clef: 'treble' });
  if (!def.isRest) note.setStemDirection(1);  // plica arriba (figura grave aislada)
  if (def.dotted) Dot.buildAndAttach([note], { all: true });

  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 80);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, duration, isRest, dotted] of ITEMS) {
    const def = { duration, isRest, dotted, vw: 150, vh: 120 };
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
  console.log('Done: ' + ITEMS.length + ' figuras.');
}
main().catch((e) => { console.error(e); process.exit(1); });
