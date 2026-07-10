'use strict';
// Notación clásica de la serie armónica sobre Do₂ (16 armónicos) en pentagrama doble
// (sistema de clave de sol + clave de fa), con el número de cada armónico encima.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/serie-armonica');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// [key, accidental|null, stave('t'|'b')]
const SERIE = [
  ['c/2', null, 'b'], ['c/3', null, 'b'], ['g/3', null, 'b'],
  ['c/4', null, 't'], ['e/4', null, 't'], ['g/4', null, 't'], ['bb/4', 'b', 't'],
  ['c/5', null, 't'], ['d/5', null, 't'], ['e/5', null, 't'], ['f#/5', '#', 't'],
  ['g/5', null, 't'], ['ab/5', 'b', 't'], ['bb/5', 'b', 't'], ['b/5', null, 't'], ['c/6', null, 't']
];

const RENDER_FN = `
function renderSerie(SERIE) {
  const { Renderer, Stave, StaveNote, GhostNote, Accidental, Voice, Formatter, StaveConnector } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const W = 920, H = 300;
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(W, H);
  const ctx = renderer.getContext();
  ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
  const treble = new Stave(10, 60, W - 20).addClef('treble');
  const bass = new Stave(10, 165, W - 20).addClef('bass');
  treble.setContext(ctx).draw();
  bass.setContext(ctx).draw();
  new StaveConnector(treble, bass).setType('brace').setContext(ctx).draw();
  new StaveConnector(treble, bass).setType('singleLeft').setContext(ctx).draw();

  function mk(entry) {
    const [key, acc, st] = entry;
    const clef = st === 't' ? 'treble' : 'bass';
    const n = new StaveNote({ keys: [key], duration: 'w', clef });
    if (acc) n.addModifier(new Accidental(acc), 0);
    return n;
  }
  const tNotes = SERIE.map(e => e[2] === 't' ? mk(e) : new GhostNote({ duration: 'w' }));
  const bNotes = SERIE.map(e => e[2] === 'b' ? mk(e) : new GhostNote({ duration: 'w' }));

  const tVoice = new Voice({ num_beats: SERIE.length * 4, beat_value: 4 }).setMode(Voice.Mode.SOFT).addTickables(tNotes);
  const bVoice = new Voice({ num_beats: SERIE.length * 4, beat_value: 4 }).setMode(Voice.Mode.SOFT).addTickables(bNotes);
  new Formatter().joinVoices([tVoice, bVoice]).format([tVoice, bVoice], W - 120);
  tVoice.draw(ctx, treble);
  bVoice.draw(ctx, bass);

  // números de armónico encima
  // Convención: los armónicos que no encajan en el temperamento igual (7, 11, 13, 14;
  // |desviación| ≥ 30 cents) se dibujan con la CABEZA RELLENA (negra) para distinguirlos.
  const DET = [6, 10, 12, 13];
  const svg = ctx.svg;
  DET.forEach(function (i) {
    const note = tNotes[i];
    const head = note.noteHeads[0];
    const cx = head.getAbsoluteX() + head.getWidth() / 2;
    const cy = note.getYs()[0];
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    e.setAttribute('cx', cx); e.setAttribute('cy', cy);
    e.setAttribute('rx', 6.6); e.setAttribute('ry', 5);
    e.setAttribute('fill', '#1a1a1a');
    svg.appendChild(e);
  });

  ctx.save(); ctx.setFont('Arial', 13, 'bold'); ctx.setFillStyle('#8b6914');
  for (let i = 0; i < SERIE.length; i++) {
    const note = SERIE[i][2] === 't' ? tNotes[i] : bNotes[i];
    const x = note.getAbsoluteX();
    ctx.fillText(String(i + 1), x - 4, 45);
  }
  ctx.restore();
}
`;

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 940, height: 320 });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:10px;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((s) => renderSerie(s), SERIE);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const el = await page.$('#vf');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'serie-completa.png'), await el.screenshot());
  console.log('  ok serie-completa.png');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
