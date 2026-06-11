'use strict';
// Ejercicios de metronomo en pentagrama (VexFlow 5 + Playwright).
// Una escala de Do mayor repetida con distintos ritmos; cada patron cuadra
// EXACTO en un compas de 4/4. Salida: assets/img/metronomo/*.png
// (luego add_img_dimensions.py + convert_to_webp.py)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/metronomo');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// n(key, dur, {dots, beam, tup}) -> nota
const n = (key, dur, o = {}) => ({ key, dur, dots: o.dots || 0, beam: o.beam, tup: o.tup });

// Escala de Do mayor (referencia)
const SC = ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'];
const DESC = ['c/5','b/4','a/4','g/4','f/4','e/4','d/4','c/4'];

const EX = [
  // 1) Negras: tetracordo Do-Re-Mi-Fa (4 pulsos)
  { file: 'ej-ritmo-negras', vw: 300, notes:
    ['c/4','d/4','e/4','f/4'].map(k => n(k, 'q')) },

  // 2) Corcheas: escala octava (8 corcheas, barradas por pulso)
  { file: 'ej-ritmo-corcheas', vw: 360, notes:
    SC.map((k, i) => n(k, '8', { beam: i >> 1 })) },

  // 3) Corcheas repitiendo nota: Do Do Re Re Mi Mi Fa Fa
  { file: 'ej-ritmo-corcheas-repetidas', vw: 360, notes:
    ['c/4','c/4','d/4','d/4','e/4','e/4','f/4','f/4'].map((k, i) => n(k, '8', { beam: i >> 1 })) },

  // 4) Tresillos repitiendo nota: Do x3, Re x3, Mi x3, Fa x3
  { file: 'ej-ritmo-tresillos', vw: 380, notes:
    ['c/4','d/4','e/4','f/4'].flatMap((k, g) => [0,1,2].map(() => n(k, '8', { beam: g, tup: g }))) },

  // 5) Semicorcheas: octava asc + desc (16 semicorcheas, barradas por pulso de 4)
  { file: 'ej-ritmo-semicorcheas', vw: 520, notes:
    SC.concat(DESC).map((k, i) => n(k, '16', { beam: i >> 2 })) },

  // 6) Galopa: corchea con puntillo + semicorchea por pulso, escala octava
  { file: 'ej-ritmo-galopa', vw: 400, notes:
    SC.flatMap((k, i) => i % 2 === 0
      ? [n(k, '8', { dots: 1, beam: i >> 1 })]
      : [n(k, '16', { beam: i >> 1 })]) },

  // 7) Piramide de subdivisiones en un pulso cada una (negra, 2 corcheas, tresillo, 4 semis)
  { file: 'ej-subdivisiones-piramide', vw: 420, notes: [
    n('g/4', 'q'),
    n('g/4', '8', { beam: 1 }), n('g/4', '8', { beam: 1 }),
    n('g/4', '8', { beam: 2, tup: 2 }), n('g/4', '8', { beam: 2, tup: 2 }), n('g/4', '8', { beam: 2, tup: 2 }),
    n('g/4', '16', { beam: 3 }), n('g/4', '16', { beam: 3 }), n('g/4', '16', { beam: 3 }), n('g/4', '16', { beam: 3 }),
  ] },
];

const RENDER_FN = `
function renderEx(def) {
  const { Renderer, Stave, StaveNote, Dot, Beam, Tuplet, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();

  const sx = 10;
  const sw = def.vw - sx - 12;
  const stave = new Stave(sx, 14, sw);
  stave.addClef('treble');
  stave.addTimeSignature('4/4');
  stave.setContext(ctx).draw();

  const notes = def.notes.map(function (d) {
    const sn = new StaveNote({ keys: [d.key], duration: d.dur, clef: 'treble' });
    for (let i = 0; i < d.dots; i++) Dot.buildAndAttach([sn], { all: true });
    return sn;
  });

  // Tresillos: agrupar por def.notes[i].tup
  const tupGroups = {};
  def.notes.forEach(function (d, i) {
    if (d.tup === undefined) return;
    (tupGroups[d.tup] = tupGroups[d.tup] || []).push(notes[i]);
  });
  const tuplets = Object.keys(tupGroups).map(function (g) {
    return new Tuplet(tupGroups[g], { num_notes: 3, notes_occupied: 2, bracketed: true });
  });

  // Barras (beams) por def.notes[i].beam
  const beamGroups = {};
  def.notes.forEach(function (d, i) {
    if (d.beam === undefined) return;
    (beamGroups[d.beam] = beamGroups[d.beam] || []).push(notes[i]);
  });
  const beams = Object.keys(beamGroups)
    .filter(function (g) { return beamGroups[g].length > 1; })
    .map(function (g) { return new Beam(beamGroups[g]); });

  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], sw - 80);
  voice.draw(ctx, stave);
  beams.forEach(function (b) { b.setContext(ctx).draw(); });
  tuplets.forEach(function (t) { t.setContext(ctx).draw(); });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of EX) {
    def.vh = 130;
    const c = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await c.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderEx(d), def);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png  (' + def.vw + 'x' + def.vh + ' @2x)');
    await c.close();
  }
  await browser.close();
  console.log('Done: ' + EX.length + ' ejercicios.');
}
main().catch((e) => { console.error(e); process.exit(1); });
