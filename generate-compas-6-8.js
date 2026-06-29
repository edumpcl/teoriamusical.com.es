'use strict';
// Ejemplos del compas de 6/8 en pentagrama (VexFlow 5 + Playwright).
// Salida: assets/img/compases/compas-6-8-*.png
// (luego convert_to_webp.py / dimensiones a mitad para el <picture>)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// n(key, dur, {dots, beam}) -> nota de un compas
const n = (key, dur, o = {}) => ({ key, dur, dots: o.dots || 0, beam: o.beam });

const EX = [
  // 1) El pulso: el 6/8 se cuenta en DOS negras con puntillo
  { file: 'compas-6-8-pulso', vw: 260, bars: [
    [ n('g/4', 'q', { dots: 1 }), n('g/4', 'q', { dots: 1 }) ],
  ] },

  // 2) La subdivision: cada pulso = 3 corcheas (6 corcheas agrupadas 3+3)
  { file: 'compas-6-8-subdivision', vw: 300, bars: [
    [ n('g/4','8',{beam:0}), n('g/4','8',{beam:0}), n('g/4','8',{beam:0}),
      n('g/4','8',{beam:1}), n('g/4','8',{beam:1}), n('g/4','8',{beam:1}) ],
  ] },

  // 3) Melodia idiomatica en 6/8 (4 compases, Do mayor, caracter de barcarola)
  { file: 'compas-6-8-melodia', vw: 620, bars: [
    [ n('g/4','8',{beam:0}), n('a/4','8',{beam:0}), n('g/4','8',{beam:0}),
      n('e/4','q'), n('e/4','8') ],
    [ n('f/4','8',{beam:1}), n('g/4','8',{beam:1}), n('f/4','8',{beam:1}),
      n('d/4','q'), n('d/4','8') ],
    [ n('e/4','8',{beam:2}), n('f/4','8',{beam:2}), n('g/4','8',{beam:2}),
      n('a/4','8',{beam:3}), n('b/4','8',{beam:3}), n('c/5','8',{beam:3}) ],
    [ n('g/4','q',{dots:1}), n('c/4','q',{dots:1}) ],
  ] },
];

const RENDER_FN = `
function renderEx(def) {
  const { Renderer, Stave, StaveNote, Dot, Beam, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();

  const nBars = def.bars.length;
  const sx = 10;
  const totalW = def.vw - sx - 12;
  const firstExtra = 56; // clef + timesignature en el primer compas
  const barW = (totalW - firstExtra) / nBars;

  let x = sx;
  def.bars.forEach(function (barNotes, bi) {
    const w = (bi === 0 ? barW + firstExtra : barW);
    const stave = new Stave(x, 14, w);
    if (bi === 0) { stave.addClef('treble'); stave.addTimeSignature('6/8'); }
    stave.setContext(ctx).draw();

    const notes = barNotes.map(function (d) {
      const sn = new StaveNote({ keys: [d.key], duration: d.dur, clef: 'treble' });
      for (let i = 0; i < d.dots; i++) Dot.buildAndAttach([sn], { all: true });
      return sn;
    });

    const beamGroups = {};
    barNotes.forEach(function (d, i) {
      if (d.beam === undefined) return;
      (beamGroups[d.beam] = beamGroups[d.beam] || []).push(notes[i]);
    });

    // Direccion de plica UNIFORME por grupo barrado (la define la nota mas
    // alejada de la 3a linea / Si4); las notas sueltas, segun su propia linea.
    const groupDir = {};
    Object.keys(beamGroups).forEach(function (g) {
      let farDist = -1, dir = 1;
      beamGroups[g].forEach(function (sn) {
        const line = sn.getKeyProps()[0].line;
        const dist = Math.abs(line - 3);
        if (dist > farDist) { farDist = dist; dir = line >= 3 ? -1 : 1; }
      });
      groupDir[g] = dir;
    });
    notes.forEach(function (sn, i) {
      const g = barNotes[i].beam;
      if (g !== undefined) { sn.setStemDirection(groupDir[g]); return; }
      const line = sn.getKeyProps()[0].line;
      sn.setStemDirection(line >= 3 ? -1 : 1);
    });
    const beams = Object.keys(beamGroups)
      .filter(function (g) { return beamGroups[g].length > 1; })
      .map(function (g) { return new Beam(beamGroups[g]); });

    const voice = new Voice({ num_beats: 6, beat_value: 8 });
    voice.setMode(Voice.Mode.SOFT);
    voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], w - (bi === 0 ? firstExtra + 16 : 24));
    voice.draw(ctx, stave);
    beams.forEach(function (b) { b.setContext(ctx).draw(); });

    x += w;
  });
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
  console.log('Done: ' + EX.length + ' imagenes.');
}
main().catch((e) => { console.error(e); process.exit(1); });
