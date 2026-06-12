'use strict';
// Pentagramas de los 4 tipos de acorde tríada sobre Do (VexFlow + Playwright).
// Salida: assets/img/acordes/triada-*.png  (webp aparte)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/acordes');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, keys (de grave a agudo). El acc se deduce de la clave (eb -> b, g# -> #).
const CHORDS = [
  { file: 'triada-mayor',      keys: ['c/4', 'e/4',  'g/4'] },   // Do Mi Sol     (Do M)
  { file: 'triada-menor',      keys: ['c/4', 'eb/4', 'g/4'] },   // Do Mi♭ Sol    (Do m)
  { file: 'triada-aumentada',  keys: ['c/4', 'e/4',  'g#/4'] },  // Do Mi Sol♯    (Do aum)
  { file: 'triada-disminuida', keys: ['c/4', 'eb/4', 'gb/4'] },  // Do Mi♭ Sol♭   (Do dim)
];

const RENDER_FN = `
function renderChord(def) {
  const { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 24);
  stave.addClef('treble');
  stave.setContext(ctx).draw();
  const note = new StaveNote({ keys: def.keys, duration: 'w', clef: 'treble' });
  def.keys.forEach(function (k, i) {
    const acc = k.split('/')[0].slice(1);   // '', 'b', 'bb', '#'
    if (acc) note.addModifier(new Accidental(acc), i);
  });
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of CHORDS) {
    def.vw = 200; def.vh = 200;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderChord(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(250);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + CHORDS.length + ' tríadas.');
}
main().catch((e) => { console.error(e); process.exit(1); });
