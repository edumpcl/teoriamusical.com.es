'use strict';
// Ornamentos: "como se escribe" (símbolo) | "como se toca" (realización).
// VexFlow 5 + Playwright. Salida: assets/img/ornamentos/*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/ornamentos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const r = (key, dur, o = {}) => ({ key, dur, dots: o.dots || 0, beam: o.beam });

// def: main{key,dur} con ornament o grace; realization = notas tocadas
const EX = [
  { file: 'apoyatura', main: { key: 'g/4', dur: 'q' }, grace: { key: 'a/4', slash: false },
    realization: [r('a/4', '8', { beam: 0 }), r('g/4', '8', { beam: 0 })] },
  { file: 'acciaccatura', main: { key: 'g/4', dur: 'q' }, grace: { key: 'a/4', slash: true },
    realization: [r('a/4', '16'), r('g/4', 'q')] },
  // Mordente superior: línea ondulada lisa (ornamentShortTrill). Realización Sol-La-Sol.
  { file: 'mordente', main: { key: 'g/4', dur: 'q', ornament: 'mordent' },
    realization: [r('g/4', '16', { beam: 0 }), r('a/4', '16', { beam: 0 }), r('g/4', '8', { beam: 0 })] },
  // Mordente inferior: línea ondulada con rayita vertical (ornamentMordent). Realización Sol-Fa-Sol.
  { file: 'mordente-inferior', main: { key: 'g/4', dur: 'q', ornament: 'mordentInverted' },
    realization: [r('g/4', '16', { beam: 0 }), r('f/4', '16', { beam: 0 }), r('g/4', '8', { beam: 0 })] },
  // Grupeto directo (superior primero): La-Sol-Fa-Sol.
  { file: 'grupeto', main: { key: 'g/4', dur: 'q', ornament: 'turn' },
    realization: [r('a/4', '16', { beam: 0 }), r('g/4', '16', { beam: 0 }), r('f/4', '16', { beam: 0 }), r('g/4', '16', { beam: 0 })] },
  // Grupeto inverso (inferior primero): Fa-Sol-La-Sol. Signo: ese tumbada con rayita (turnInverted, glifo limpio).
  { file: 'grupeto-inferior', main: { key: 'g/4', dur: 'q', ornament: 'turnInverted' },
    realization: [r('f/4', '16', { beam: 0 }), r('g/4', '16', { beam: 0 }), r('a/4', '16', { beam: 0 }), r('g/4', '16', { beam: 0 })] },
  { file: 'trino', main: { key: 'g/4', dur: 'h', ornament: 'tr' },
    realization: [r('g/4', '16', { beam: 0 }), r('a/4', '16', { beam: 0 }), r('g/4', '16', { beam: 0 }), r('a/4', '16', { beam: 0 }),
                  r('g/4', '16', { beam: 1 }), r('a/4', '16', { beam: 1 }), r('g/4', '16', { beam: 1 }), r('a/4', '16', { beam: 1 })] },
];

const RENDER_FN = `
function renderEx(def) {
  const { Renderer, Stave, StaveNote, GraceNote, GraceNoteGroup, Ornament, Beam, Formatter, Voice, BarNote } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(10, 40, def.vw - 24);
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  function mkStem(sn) { const line = sn.getKeyProps()[0].line; sn.setStemDirection(line >= 3 ? -1 : 1); return sn; }

  const real = def.realization.map(function (d) {
    const sn = mkStem(new StaveNote({ keys: [d.key], duration: d.dur, clef: 'treble' }));
    return sn;
  });

  const main = mkStem(new StaveNote({ keys: [def.main.key], duration: def.main.dur, clef: 'treble' }));
  if (def.main.ornament) main.addModifier(new Ornament(def.main.ornament), 0);
  if (def.grace) {
    const g = new GraceNote({ keys: [def.grace.key], duration: '8', slash: def.grace.slash });
    main.addModifier(new GraceNoteGroup([g], true).beamNotes(), 0);
  }
  const tickables = [main, new BarNote()].concat(real);
  const voice = new Voice({ num_beats: 8, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(tickables);

  // barras de las corcheas/semicorcheas de la realización
  const beamGroups = {};
  def.realization.forEach(function (d, i) { if (d.beam === undefined) return; (beamGroups[d.beam] = beamGroups[d.beam] || []).push(real[i]); });
  const beams = Object.keys(beamGroups).filter(function (g) { return beamGroups[g].length > 1; }).map(function (g) { return new Beam(beamGroups[g]); });

  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);
  beams.forEach(function (b) { b.setContext(ctx).draw(); });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of EX) {
    def.vw = 380; def.vh = 150;
    const c = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await c.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderEx(d), def);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await c.close();
  }
  await browser.close();
  console.log('Done: ' + EX.length + ' imagenes.');
}
main().catch((e) => { console.error(e); process.exit(1); });
