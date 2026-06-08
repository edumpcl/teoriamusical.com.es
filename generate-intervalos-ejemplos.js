'use strict';
// Genera el ejemplo en pentagrama de cada intervalo desde Do: dos redondas
// (Do + nota destino) en clave de sol. VexFlow + Playwright, estilo de las figuras.
// Salida: assets/img/intervalos/ejemplo-*.png  (luego convert_to_webp.py)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, segunda nota (key), alteración ('b' | '#' | null)
const ITEMS = [
  ['ejemplo-do-do',   'c/4', null],  // unísono
  ['ejemplo-do-reb',  'd/4', 'b'],
  ['ejemplo-do-re',   'd/4', null],
  ['ejemplo-do-mib',  'e/4', 'b'],
  ['ejemplo-do-mi',   'e/4', null],
  ['ejemplo-do-fa',   'f/4', null],
  ['ejemplo-do-fas',  'f/4', '#'],
  ['ejemplo-do-sol',  'g/4', null],
  ['ejemplo-do-lab',  'a/4', 'b'],
  ['ejemplo-do-la',   'a/4', null],
  ['ejemplo-do-sib',  'b/4', 'b'],
  ['ejemplo-do-si',   'b/4', null],
  ['ejemplo-do-do8',  'c/5', null],  // octava
];

const RENDER_FN = `
function renderItem(def) {
  const { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(6, 18, def.vw - 14);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  const n1 = new StaveNote({ keys: ['c/4'], duration: 'w', clef: 'treble' });
  const n2 = new StaveNote({ keys: [def.key2], duration: 'w', clef: 'treble' });
  if (def.acc) n2.addModifier(new Accidental(def.acc), 0);

  const voice = new Voice({ num_beats: 8, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables([n1, n2]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 70);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, key2, acc] of ITEMS) {
    const def = { key2, acc, vw: 200, vh: 130 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderItem(d), def);
    await page.waitForTimeout(120);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' ejemplos.');
}
main().catch((e) => { console.error(e); process.exit(1); });
