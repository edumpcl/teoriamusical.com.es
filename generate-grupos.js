'use strict';
// Genera los grupos de valoración especial (tresillo, dosillo, cuatrillo, quintillo,
// seisillo, septillo) con VexFlow + Playwright, mismo estilo que generate-figuras.js.
// Salida: assets/img/figuras/grupo-*.png  (luego add_img_dimensions.py + convert_to_webp.py)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/figuras');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, duration, numNotes, notesOccupied, vw
const ITEMS = [
  ['grupo-tresillo',  '8',  3, 2, 190],
  ['grupo-dosillo',   '8',  2, 3, 170],
  ['grupo-cuatrillo', '8',  4, 3, 210],
  ['grupo-quintillo', '16', 5, 4, 220],
  ['grupo-seisillo',  '16', 6, 4, 240],
  ['grupo-septillo',  '16', 7, 4, 260],
];

const RENDER_FN = `
function renderItem(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice, Beam, Tuplet } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 20, def.vw - 20);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  const notes = [];
  for (let i = 0; i < def.numNotes; i++) {
    const n = new StaveNote({ keys: ['a/4'], duration: def.duration, clef: 'treble' });
    n.setStemDirection(1); // plicas arriba: el corchete/número del grupo queda encima
    notes.push(n);
  }

  const beam = new Beam(notes);
  const tuplet = new Tuplet(notes, {
    num_notes: def.numNotes,
    notes_occupied: def.notesOccupied,
    bracketed: true,
    ratioed: false,
    location: 1, // encima
  });

  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 80);
  voice.draw(ctx, stave);
  beam.setContext(ctx).draw();
  tuplet.setContext(ctx).draw();
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, duration, numNotes, notesOccupied, vw] of ITEMS) {
    const def = { duration, numNotes, notesOccupied, vw, vh: 130 };
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
  console.log('Done: ' + ITEMS.length + ' grupos.');
}
main().catch((e) => { console.error(e); process.exit(1); });
