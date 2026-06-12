'use strict';
// Pentagramas de las articulaciones (VexFlow + Playwright): legato (ligadura),
// staccato, acento, tenuto, marcato. Salida: assets/img/articulacion/*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/articulacion');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, art (codigo VexFlow o 'slur' para legato)
const ITEMS = [
  { file: 'legato',   art: 'slur' },
  { file: 'staccato', art: 'a.' },
  { file: 'acento',   art: 'a>' },
  { file: 'tenuto',   art: 'a-' },
  { file: 'marcato',  art: 'a^' },
];

const RENDER_FN = `
function renderArt(def) {
  const { Renderer, Stave, StaveNote, Articulation, Curve, Beam, Formatter, Voice, Modifier } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 30, def.vw - 24);
  stave.addClef('treble'); stave.setContext(ctx).draw();
  // Notas todas bajo la 3.ª línea => plicas arriba => articulaciones bajo la cabeza (lado opuesto a la plica).
  const keys = ['e/4','g/4','a/4','g/4'];
  const notes = keys.map(function (k) { return new StaveNote({ keys: [k], duration: 'q', clef: 'treble' }); });
  if (def.art !== 'slur') {
    notes.forEach(function (n) {
      n.addModifier(new Articulation(def.art).setPosition(Modifier.Position.BELOW));
    });
  }
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 80);
  voice.draw(ctx, stave);
  if (def.art === 'slur') {
    new Curve(notes[0], notes[notes.length - 1], { cps: [{ x: 0, y: 18 }, { x: 0, y: 18 }] }).setContext(ctx).draw();
  }
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 300; def.vh = 170;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderArt(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(250);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' articulaciones.');
}
main().catch((e) => { console.error(e); process.exit(1); });
