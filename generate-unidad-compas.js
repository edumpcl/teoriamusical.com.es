'use strict';
// Ejemplos para "unidad de tiempo y unidad de compás": la unidad de compás (redonda
// en 4/4), la unidad de tiempo (4 negras) y un compás compuesto 6/8 subdividido.
// Salida: assets/img/compases/*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  { file: 'unidad-de-compas', ts: '4/4', notes: [{ keys: ['b/4'], dur: 'w' }] },
  { file: 'unidad-de-tiempo', ts: '4/4', notes: [{ keys: ['b/4'], dur: 'q' }, { keys: ['b/4'], dur: 'q' }, { keys: ['b/4'], dur: 'q' }, { keys: ['b/4'], dur: 'q' }] },
  { file: 'compas-compuesto-68', ts: '6/8',
    notes: [{ keys: ['b/4'], dur: '8' }, { keys: ['b/4'], dur: '8' }, { keys: ['b/4'], dur: '8' }, { keys: ['b/4'], dur: '8' }, { keys: ['b/4'], dur: '8' }, { keys: ['b/4'], dur: '8' }],
    beams: [[0, 1, 2], [3, 4, 5]], beats: 6, beatValue: 8 },
];

const RENDER_FN = `
function renderC(def) {
  const { Renderer, Stave, StaveNote, Beam, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 30, def.vw - 16);
  stave.addClef('treble'); stave.addTimeSignature(def.ts);
  stave.setContext(ctx).draw();
  const notes = def.notes.map(function (n) {
    const sn = new StaveNote({ keys: n.keys, duration: n.dur, clef: 'treble' });
    const props = sn.getKeyProps();
    const topLine = props[props.length - 1].line; // línea central (3ª) = 2.0
    sn.setStemDirection(topLine >= 3 ? -1 : 1);    // 3ª línea o por encima => plica abajo
    return sn;
  });
  const voice = new Voice({ num_beats: def.beats || 4, beat_value: def.beatValue || 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 110);
  let beams = [];
  if (def.beams) beams = def.beams.map(function (g) { return new Beam(g.map(function (i) { return notes[i]; })); });
  voice.draw(ctx, stave);
  beams.forEach(function (b) { b.setContext(ctx).draw(); });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 260; def.vh = 180;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderC(d), def);
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
