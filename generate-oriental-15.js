'use strict';
// Regenera SOLO las 15 imagenes oriental-*.png (ahora menor hungara) desde
// tools/scale_keys.json. Mismo render que generate-escalas.js. webp aparte.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/escalas');
const all = JSON.parse(fs.readFileSync(path.join(__dirname, 'tools/scale_keys.json'), 'utf8'));
const SCALES = all.filter(d => /^oriental-/.test(d.file));

const RENDER_FN = `
function renderScale(def) {
  const { Renderer, Stave, StaveNote, Formatter, Accidental, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const context = renderer.getContext();
  const sx = 10, sw = def.vw - sx - 12;
  const stave = new Stave(sx, 14, sw); stave.addClef('treble'); stave.setContext(context).draw();
  const notes = def.keys.map(k => new StaveNote({ keys: [k], duration: 'w', clef: 'treble' }));
  const active = {};
  notes.forEach(function (sn, i) {
    const parts = def.keys[i].split('/');
    const letter = parts[0][0];
    let acc = parts[0].slice(1) || 'n';
    const pos = letter + parts[1];
    const cur = active[pos] || 'n';
    if (acc !== cur) { sn.addModifier(new Accidental(acc), 0); active[pos] = acc; }
  });
  const voice = new Voice({ num_beats: notes.length * 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], sw - 70);
  voice.draw(context, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of SCALES) {
    def.vw = 70 + def.keys.length * 62; def.vh = 120;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderScale(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(200);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + SCALES.length + ' imagenes.');
}
main().catch((e) => { console.error(e); process.exit(1); });
