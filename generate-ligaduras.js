'use strict';
// Ligadura de unión (tie, misma altura) y de expresión (slur, distinta altura).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/figuras');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [['ligadura-union', 'union'], ['ligadura-expresion', 'expresion']];

const RENDER_FN = `
function render(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice, StaveTie, Curve } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 20);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  var notes, beats;
  if (def.type === 'union') {
    notes = [
      new StaveNote({ keys: ['g/4'], duration: 'h', clef: 'treble' }),
      new StaveNote({ keys: ['g/4'], duration: 'h', clef: 'treble' })
    ];
    beats = 4;
  } else {
    notes = ['c/4','e/4','g/4','e/4'].map(function(k){
      return new StaveNote({ keys: [k], duration: 'q', clef: 'treble' });
    });
    beats = 4;
  }
  notes.forEach(function(n){ n.setStemDirection(1); });

  const voice = new Voice({ num_beats: beats, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);

  if (def.type === 'union') {
    new StaveTie({ firstNote: notes[0], lastNote: notes[1],
      firstIndices: [0], lastIndices: [0] }).setContext(ctx).draw();
  } else {
    new Curve(notes[0], notes[notes.length-1], {}).setContext(ctx).draw();
  }
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, type] of ITEMS) {
    const def = { type: type, vw: 320, vh: 150 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => render(d), def);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
