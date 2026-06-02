'use strict';
// Pentagrama de cada uno de los 8 modos gregorianos, con su ambitus y marcando
// la FINALIS (dorado) y la REPERCUSIÓN/tenor (azul) con etiquetas F y R.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/escalas');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const GOLD = '#b8860b', BLUE = '#1d4ed8';

// file, keys (ambitus, redondas), iFinalis, iRepercusio
const MODES = [
  ['modo-gregoriano-1', ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], 0, 4], // I Dórico/Protus, fin Re ten La
  ['modo-gregoriano-2', ['a/3','b/3','c/4','d/4','e/4','f/4','g/4','a/4'], 3, 5], // II Hipodórico, fin Re ten Fa
  ['modo-gregoriano-3', ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], 0, 5], // III Frigio/Deuterus, fin Mi ten Do
  ['modo-gregoriano-4', ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], 3, 6], // IV Hipofrigio, fin Mi ten La
  ['modo-gregoriano-5', ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], 0, 4], // V Lidio/Tritus, fin Fa ten Do
  ['modo-gregoriano-6', ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], 3, 5], // VI Hipolidio, fin Fa ten La
  ['modo-gregoriano-7', ['g/4','a/4','b/4','c/5','d/5','e/5','f/5','g/5'], 0, 4], // VII Mixolidio/Tetrardus, fin Sol ten Re
  ['modo-gregoriano-8', ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], 3, 6], // VIII Hipomixolidio, fin Sol ten Do
];

const RENDER_FN = `
function renderMode(def) {
  const { Renderer, Stave, StaveNote, Formatter, Voice, Annotation } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const sx = 10, sw = def.vw - sx - 12;
  const stave = new Stave(sx, 24, sw);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  const notes = def.keys.map(function (k, i) {
    const sn = new StaveNote({ keys: [k], duration: 'w', clef: 'treble' });
    if (i === def.fin || i === def.rep) {
      const color = i === def.fin ? '${GOLD}' : '${BLUE}';
      sn.setStyle({ fillStyle: color, strokeStyle: color });
      const ann = new Annotation(i === def.fin ? 'F' : 'R');
      ann.setFont('Arial', 14, 'bold');
      ann.setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
      sn.addModifier(ann);
    }
    return sn;
  });
  const voice = new Voice({ num_beats: notes.length * 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], sw - 70);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, keys, fin, rep] of MODES) {
    const def = { keys: keys, fin: fin, rep: rep, vw: 70 + keys.length * 62, vh: 140 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderMode(d), def);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + MODES.length + ' modos.');
}
main().catch((e) => { console.error(e); process.exit(1); });
