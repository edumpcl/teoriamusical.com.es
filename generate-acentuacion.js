'use strict';
// Diagramas de acentuación rítmica: un pulso por tiempo con su etiqueta
// (Fuerte / Débil / Semifuerte) bajo cada nota. VexFlow + Playwright.
// Salida: assets/img/compases/acentuacion-{2-4,3-4,4-4,6-8,9-8,12-8}.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const F = { t: 'Fuerte', k: 'f' };
const D = { t: 'Débil', k: 'd' };
const S = { t: 'Semifuerte', k: 's' };

// dotted: el pulso es negra con puntillo (compases compuestos)
const ITEMS = [
  { file: 'acentuacion-2-4', ts: '2/4', beats: [F, D] },
  { file: 'acentuacion-3-4', ts: '3/4', beats: [F, D, D] },
  { file: 'acentuacion-4-4', ts: '4/4', beats: [F, D, S, D] },
  { file: 'acentuacion-6-8', ts: '6/8', dotted: true, beats: [F, D] },
  { file: 'acentuacion-9-8', ts: '9/8', dotted: true, beats: [F, D, D] },
  { file: 'acentuacion-12-8', ts: '12/8', dotted: true, beats: [F, D, S, D] },
];

const RENDER_FN = `
function render(def){
  const { Renderer, Stave, StaveNote, Dot, Articulation, Modifier, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const stave = new Stave(8, 24, def.vw - 16, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble'); stave.addTimeSignature(def.ts);
  stave.setContext(ctx).draw();
  const notes = def.beats.map(function(b){
    const n = new StaveNote({ keys:['b/4'], duration:'q', clef:'treble' });
    if (def.dotted) Dot.buildAndAttach([n], { all:true });
    var line = n.getKeyProps()[n.getKeyProps().length-1].line; n.setStemDirection(line>=3?-1:1);
    if (b.k === 'f') n.addModifier(new Articulation('a>').setPosition(Modifier.Position.ABOVE), 0);
    return n;
  });
  const beatsTotal = def.beats.length * (def.dotted ? 3 : 2);
  const voice = new Voice({ num_beats: beatsTotal, beat_value: def.dotted ? 8 : 8 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 95);
  voice.draw(ctx, stave);
  const svg = div.querySelector('svg');
  const NS='http://www.w3.org/2000/svg';
  const COL = { f:'#1a1a1a', s:'#1a1a1a', d:'#555' };
  def.beats.forEach(function(b,i){
    const x = notes[i].getAbsoluteX() + 6;
    const t = document.createElementNS(NS,'text');
    t.setAttribute('x', x); t.setAttribute('y', def.yLabel); t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','Arial, Helvetica, sans-serif'); t.setAttribute('font-size','18');
    t.setAttribute('font-weight','400'); t.setAttribute('fill', COL[b.k]);
    t.textContent = b.t; svg.appendChild(t);
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 90 + def.beats.length * 92;
    def.vh = 200; def.yLabel = 168;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => render(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(180);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + ' (' + def.vw + 'x' + def.vh + ')');
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
