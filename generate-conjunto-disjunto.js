'use strict';
// Movimiento conjunto (grados contiguos) vs disjunto (salto), en VexFlow.
// Salida: assets/img/intervalos/{conjunto,disjunto,conjunto-melodia}.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  // Conjunto: Do-Re (2ª, contiguo)
  { file: 'intervalo-conjunto', notes: [{ keys: ['c/4'], dur: 'h' }, { keys: ['d/4'], dur: 'h' }], beats: 4 },
  // Disjunto: Do-Sol (salto de 5ª)
  { file: 'intervalo-disjunto', notes: [{ keys: ['c/4'], dur: 'h' }, { keys: ['g/4'], dur: 'h' }], beats: 4 },
  // Melodía por grados conjuntos: Do-Re-Mi-Fa-Sol
  { file: 'movimiento-conjunto', notes: [{ keys: ['c/4'], dur: 'q' }, { keys: ['d/4'], dur: 'q' }, { keys: ['e/4'], dur: 'q' }, { keys: ['f/4'], dur: 'q' }], beats: 4 },
  // Melodía por saltos (disjunto): Do-Sol-Mi-Do
  { file: 'movimiento-disjunto', notes: [{ keys: ['c/4'], dur: 'q' }, { keys: ['g/4'], dur: 'q' }, { keys: ['e/4'], dur: 'q' }, { keys: ['c/5'], dur: 'q' }], beats: 4 },
];

const RENDER_FN = `
function renderIv(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 24);
  stave.addClef('treble'); stave.setContext(ctx).draw();
  const notes = def.notes.map(function (n) { return new StaveNote({ keys: n.keys, duration: n.dur, clef: 'treble' }); });
  const voice = new Voice({ num_beats: def.beats, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 80);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = (def.notes.length > 2) ? 300 : 240; def.vh = 200;
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
    console.log('  ok ' + def.file + ' (' + def.vw + 'x' + def.vh + ')');
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
