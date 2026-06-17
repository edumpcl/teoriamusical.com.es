'use strict';
// Notación para las entradas de blog: ejemplos de intervalos (melódicos), el
// power chord C5 y dos armaduras reales. VexFlow + Playwright.
// Salidas: assets/img/intervalos/blog-iv-*.png, assets/img/acordes/acorde-c5.png,
//          assets/img/escalas/armadura-*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');

// type: 'melodic' (notes 2 medias), 'chord' (redonda), 'keysig' (clave+armadura)
const ITEMS = [
  { type: 'melodic', out: 'assets/img/intervalos', file: 'blog-iv-do-la',  notes: ['c/4', 'a/4'] },
  { type: 'melodic', out: 'assets/img/intervalos', file: 'blog-iv-re-fa',  notes: ['d/4', 'f/4'] },
  { type: 'melodic', out: 'assets/img/intervalos', file: 'blog-iv-fa-si',  notes: ['f/4', 'b/4'] },
  { type: 'melodic', out: 'assets/img/intervalos', file: 'blog-iv-do-mib', notes: ['c/4', 'eb/4'] },
  { type: 'chord',   out: 'assets/img/acordes',    file: 'acorde-c5',      notes: ['c/4', 'g/4'] },
  { type: 'keysig',  out: 'assets/img/escalas',    file: 'armadura-sol-mayor', key: 'G' },
  { type: 'keysig',  out: 'assets/img/escalas',    file: 'armadura-sib-mayor', key: 'Bb' },
];

const RENDER_FN = `
function acc(k){ return k.split('/')[0].slice(1); }
function render(def){
  const { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const stave = new Stave(8, 28, def.vw - 16, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble');
  if (def.type === 'keysig') stave.addKeySignature(def.key);
  stave.setContext(ctx).draw();
  if (def.type === 'keysig') return;
  const dur = def.type === 'chord' ? 'w' : 'h';
  const mk = function(k){
    const n = new StaveNote({ keys:[k], duration:dur, clef:'treble' });
    if (acc(k)) n.addModifier(new Accidental(acc(k)), 0);
    return n;
  };
  let notes;
  if (def.type === 'chord') {
    const n = new StaveNote({ keys:def.notes, duration:'w', clef:'treble' });
    def.notes.forEach(function(k,i){ if(acc(k)) n.addModifier(new Accidental(acc(k)), i); });
    notes=[n];
  } else {
    notes = def.notes.map(mk);
    notes.forEach(function(n){ const l=n.getKeyProps()[n.getKeyProps().length-1].line; n.setStemDirection(l>=3?-1:1); });
  }
  const beats = def.type==='chord' ? 4 : notes.length*2;
  const voice = new Voice({ num_beats:beats, beat_value:4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - (def.type==='chord'?90:80));
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = def.type === 'melodic' ? 230 : (def.type === 'keysig' ? 180 : 200);
    def.vh = 170;
    fs.mkdirSync(path.join(__dirname, def.out), { recursive: true });
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => render(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(180);
    fs.writeFileSync(path.join(__dirname, def.out, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.out + '/' + def.file);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
