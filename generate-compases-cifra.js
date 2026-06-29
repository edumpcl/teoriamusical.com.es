'use strict';
// Imagenes en pentagrama del cluster "compases por cifra" (VexFlow 5 + Playwright).
// Salida: assets/img/compases/compas-<cifra>-{pulso,subdivision,melodia}.png
// Plica UNIFORME por grupo barrado (la define la nota mas alejada de la 3a linea).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// n(key, dur, {dots, beam, acc}) -> nota de un compas (acc = acento >)
const n = (key, dur, o = {}) => ({ key, dur, dots: o.dots || 0, beam: o.beam, acc: o.acc });

const EX = [
  // ---------- 2/4 (simple, 2 tiempos de negra) ----------
  { file: 'compas-2-4-pulso', ts: '2/4', vw: 240, bars: [
    [ n('g/4','q'), n('g/4','q') ] ] },
  { file: 'compas-2-4-subdivision', ts: '2/4', vw: 280, bars: [
    [ n('g/4','8',{beam:0}), n('g/4','8',{beam:0}), n('g/4','8',{beam:1}), n('g/4','8',{beam:1}) ] ] },
  { file: 'compas-2-4-melodia', ts: '2/4', vw: 560, bars: [
    [ n('c/4','q'), n('e/4','q') ],
    [ n('g/4','8',{beam:0}), n('a/4','8',{beam:0}), n('g/4','8',{beam:1}), n('f/4','8',{beam:1}) ],
    [ n('e/4','q'), n('d/4','q') ],
    [ n('c/4','h') ] ] },

  // ---------- 4/4 (simple, 4 tiempos de negra) ----------
  { file: 'compas-4-4-pulso', ts: '4/4', vw: 320, bars: [
    [ n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q') ] ] },
  { file: 'compas-4-4-subdivision', ts: '4/4', vw: 380, bars: [
    [ n('g/4','8',{beam:0}), n('g/4','8',{beam:0}), n('g/4','8',{beam:1}), n('g/4','8',{beam:1}),
      n('g/4','8',{beam:2}), n('g/4','8',{beam:2}), n('g/4','8',{beam:3}), n('g/4','8',{beam:3}) ] ] },
  { file: 'compas-4-4-melodia', ts: '4/4', vw: 660, bars: [
    [ n('c/4','q'), n('e/4','q'), n('g/4','q'), n('e/4','q') ],
    [ n('f/4','q'), n('d/4','8',{beam:0}), n('e/4','8',{beam:0}), n('f/4','q'), n('g/4','q') ],
    [ n('e/4','q'), n('d/4','q'), n('c/4','q'), n('d/4','q') ],
    [ n('c/4','w') ] ] },

  // ---------- 3/4 (simple, 3 tiempos de negra) ----------
  { file: 'compas-3-4-pulso', ts: '3/4', vw: 280, bars: [
    [ n('g/4','q'), n('g/4','q'), n('g/4','q') ] ] },
  { file: 'compas-3-4-subdivision', ts: '3/4', vw: 320, bars: [
    [ n('g/4','8',{beam:0}), n('g/4','8',{beam:0}), n('g/4','8',{beam:1}),
      n('g/4','8',{beam:1}), n('g/4','8',{beam:2}), n('g/4','8',{beam:2}) ] ] },
  { file: 'compas-3-4-melodia', ts: '3/4', vw: 540, bars: [
    [ n('c/4','q'), n('e/4','q'), n('g/4','q') ],
    [ n('a/4','q'), n('g/4','q'), n('e/4','q') ],
    [ n('f/4','q'), n('d/4','q'), n('g/4','q') ],
    [ n('c/4','h',{dots:1}) ] ] },

  // ---------- 3/8 (simple, 3 tiempos de corchea) ----------
  { file: 'compas-3-8-pulso', ts: '3/8', vw: 240, bars: [
    [ n('g/4','8'), n('g/4','8'), n('g/4','8') ] ] },
  { file: 'compas-3-8-subdivision', ts: '3/8', vw: 300, bars: [
    [ n('g/4','16',{beam:0}), n('g/4','16',{beam:0}), n('g/4','16',{beam:1}),
      n('g/4','16',{beam:1}), n('g/4','16',{beam:2}), n('g/4','16',{beam:2}) ] ] },
  { file: 'compas-3-8-melodia', ts: '3/8', vw: 520, bars: [
    [ n('c/4','8',{beam:0}), n('d/4','8',{beam:0}), n('e/4','8',{beam:0}) ],
    [ n('f/4','8',{beam:1}), n('e/4','8',{beam:1}), n('d/4','8',{beam:1}) ],
    [ n('e/4','8',{beam:2}), n('f/4','8',{beam:2}), n('g/4','8',{beam:2}) ],
    [ n('c/4','q',{dots:1}) ] ] },

  // ---------- 9/8 (compuesto, 3 tiempos de negra con puntillo) ----------
  { file: 'compas-9-8-pulso', ts: '9/8', vw: 340, bars: [
    [ n('g/4','q',{dots:1}), n('g/4','q',{dots:1}), n('g/4','q',{dots:1}) ] ] },
  { file: 'compas-9-8-subdivision', ts: '9/8', vw: 380, bars: [
    [ n('g/4','8',{beam:0}), n('g/4','8',{beam:0}), n('g/4','8',{beam:0}),
      n('g/4','8',{beam:1}), n('g/4','8',{beam:1}), n('g/4','8',{beam:1}),
      n('g/4','8',{beam:2}), n('g/4','8',{beam:2}), n('g/4','8',{beam:2}) ] ] },
  { file: 'compas-9-8-melodia', ts: '9/8', vw: 700, bars: [
    [ n('c/4','8',{beam:0}), n('e/4','8',{beam:0}), n('g/4','8',{beam:0}),
      n('a/4','8',{beam:1}), n('g/4','8',{beam:1}), n('f/4','8',{beam:1}),
      n('e/4','q',{dots:1}) ],
    [ n('d/4','8',{beam:2}), n('e/4','8',{beam:2}), n('f/4','8',{beam:2}),
      n('e/4','8',{beam:3}), n('d/4','8',{beam:3}), n('c/4','8',{beam:3}),
      n('c/4','q',{dots:1}) ] ] },

  // ---------- 12/8 (compuesto, 4 tiempos de negra con puntillo) ----------
  { file: 'compas-12-8-pulso', ts: '12/8', vw: 420, bars: [
    [ n('g/4','q',{dots:1}), n('g/4','q',{dots:1}), n('g/4','q',{dots:1}), n('g/4','q',{dots:1}) ] ] },
  { file: 'compas-12-8-subdivision', ts: '12/8', vw: 460, bars: [
    [ n('g/4','8',{beam:0}), n('g/4','8',{beam:0}), n('g/4','8',{beam:0}),
      n('g/4','8',{beam:1}), n('g/4','8',{beam:1}), n('g/4','8',{beam:1}),
      n('g/4','8',{beam:2}), n('g/4','8',{beam:2}), n('g/4','8',{beam:2}),
      n('g/4','8',{beam:3}), n('g/4','8',{beam:3}), n('g/4','8',{beam:3}) ] ] },
  { file: 'compas-12-8-melodia', ts: '12/8', vw: 860, bars: [
    [ n('c/4','8',{beam:0}), n('e/4','8',{beam:0}), n('g/4','8',{beam:0}),
      n('f/4','8',{beam:1}), n('e/4','8',{beam:1}), n('d/4','8',{beam:1}),
      n('e/4','8',{beam:2}), n('g/4','8',{beam:2}), n('c/5','8',{beam:2}),
      n('b/4','8',{beam:3}), n('a/4','8',{beam:3}), n('g/4','8',{beam:3}) ],
    [ n('a/4','8',{beam:4}), n('f/4','8',{beam:4}), n('d/4','8',{beam:4}),
      n('g/4','8',{beam:5}), n('e/4','8',{beam:5}), n('c/4','8',{beam:5}),
      n('d/4','8',{beam:6}), n('e/4','8',{beam:6}), n('f/4','8',{beam:6}),
      n('c/4','q',{dots:1}) ] ] },

  // ---------- 6/4 (compuesto, 2 tiempos de blanca con puntillo) ----------
  { file: 'compas-6-4-pulso', ts: '6/4', vw: 320, bars: [
    [ n('g/4','h',{dots:1}), n('g/4','h',{dots:1}) ] ] },
  { file: 'compas-6-4-subdivision', ts: '6/4', vw: 380, bars: [
    [ n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q') ] ] },
  { file: 'compas-6-4-melodia', ts: '6/4', vw: 600, bars: [
    [ n('c/4','q'), n('d/4','8',{beam:0}), n('e/4','8',{beam:0}), n('f/4','q'),
      n('g/4','q'), n('a/4','8',{beam:1}), n('g/4','8',{beam:1}), n('e/4','q') ],
    [ n('g/4','h',{dots:1}), n('c/4','h',{dots:1}) ] ] },

  // ---------- Hemiolia: un 6/4 reacentuado 2+2+2 (suena como 3/2) ----------
  { file: 'compas-6-4-hemiolia', ts: '6/4', vw: 480, bars: [
    [ n('c/4','q',{acc:1}), n('d/4','q'), n('e/4','q',{acc:1}),
      n('f/4','q'), n('g/4','q',{acc:1}), n('a/4','q') ] ] },

  // ---------- 3/2 (simple, 3 tiempos de blanca) ----------
  { file: 'compas-3-2-pulso', ts: '3/2', vw: 340, bars: [
    [ n('g/4','h'), n('g/4','h'), n('g/4','h') ] ] },
  { file: 'compas-3-2-subdivision', ts: '3/2', vw: 380, bars: [
    [ n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q') ] ] },
  { file: 'compas-3-2-melodia', ts: '3/2', vw: 560, bars: [
    [ n('c/4','h'), n('e/4','h'), n('g/4','h') ],
    [ n('a/4','q'), n('g/4','q'), n('f/4','q'), n('e/4','q'), n('c/4','h') ] ] },

  // ---------- Compas partido / alla breve (2/2) ----------
  { file: 'compas-partido-pulso', ts: 'C|', num: 2, den: 2, vw: 260, bars: [
    [ n('g/4','h'), n('g/4','h') ] ] },
  { file: 'compas-partido-subdivision', ts: 'C|', num: 2, den: 2, vw: 300, bars: [
    [ n('g/4','q'), n('g/4','q'), n('g/4','q'), n('g/4','q') ] ] },
  { file: 'compas-partido-melodia', ts: 'C|', num: 2, den: 2, vw: 540, bars: [
    [ n('g/4','q'), n('e/4','q'), n('c/4','q'), n('e/4','q') ],
    [ n('g/4','h'), n('c/5','h') ] ] },
];

const RENDER_FN = `
function renderEx(def) {
  const { Renderer, Stave, StaveNote, Dot, Beam, Formatter, Voice, Articulation, Modifier } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();

  const parts = def.ts.split('/');
  const num = def.num !== undefined ? def.num : parseInt(parts[0]);
  const den = def.den !== undefined ? def.den : parseInt(parts[1]);

  const nBars = def.bars.length;
  const sx = 10;
  const totalW = def.vw - sx - 12;
  const firstExtra = 56; // clave + cifra de compas en el primer compas
  const barW = (totalW - firstExtra) / nBars;

  let x = sx;
  def.bars.forEach(function (barNotes, bi) {
    const w = (bi === 0 ? barW + firstExtra : barW);
    const stave = new Stave(x, 14, w);
    if (bi === 0) { stave.addClef('treble'); stave.addTimeSignature(def.ts); }
    stave.setContext(ctx).draw();

    const notes = barNotes.map(function (d) {
      const sn = new StaveNote({ keys: [d.key], duration: d.dur, clef: 'treble' });
      for (let i = 0; i < d.dots; i++) Dot.buildAndAttach([sn], { all: true });
      if (d.acc) sn.addModifier(new Articulation('a>').setPosition(Modifier.Position.ABOVE), 0);
      return sn;
    });

    const beamGroups = {};
    barNotes.forEach(function (d, i) {
      if (d.beam === undefined) return;
      (beamGroups[d.beam] = beamGroups[d.beam] || []).push(notes[i]);
    });

    // Direccion de plica UNIFORME por grupo barrado; sueltas, segun su linea.
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

    const voice = new Voice({ num_beats: num, beat_value: den });
    voice.setMode(Voice.Mode.SOFT);
    voice.addTickables(notes);
    // Margen derecho holgado para que la ultima nota no quede sobre la barra.
    new Formatter().joinVoices([voice]).format([voice], w - (bi === 0 ? firstExtra + 30 : 44));
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
