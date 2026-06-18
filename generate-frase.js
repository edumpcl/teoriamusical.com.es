'use strict';
// Notación para el cluster "La frase musical":
//  - comienzo: tético / anacrúsico / acéfalo
//  - terminación: masculina / femenina
//  - diagrama de estructura (frase > semifrases > incisos) para el hub
// VexFlow + Playwright. Salida: assets/img/frase/*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/frase');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// seq: tokens "c/5:q" (nota), "r:q" (silencio), "|" (barra). dur: q,h,w,e
const ITEMS = [
  { file: 'comienzo-tetico',     ts: '4/4', seq: ['c/5:q','d/5:q','e/5:q','f/5:q','|','g/5:h','e/5:h'] },
  { file: 'comienzo-anacrusico', ts: '4/4', seq: ['g/4:q','|','c/5:q','d/5:q','e/5:q','f/5:q','|','g/5:h.','e/5:q'] },
  { file: 'comienzo-acefalo',    ts: '4/4', seq: ['r:q','c/5:q','d/5:q','e/5:q','|','f/5:h','d/5:h'] },
  { file: 'final-tiempo-fuerte', ts: '4/4', seq: ['e/5:q','d/5:q','e/5:q','d/5:q','|','c/5:w'], endBar: true },
  { file: 'final-tiempo-debil',  ts: '4/4', seq: ['e/5:q','d/5:q','e/5:q','d/5:q','|','d/5:h','c/5:h'], endBar: true },
];

const RENDER_FN = `
function acc(k){ var p=k.split('/')[0]; return p.length>1 ? p.slice(1) : ''; }
function durOf(spec){ // returns {d, dots}
  var d = spec; var dots = 0;
  while(d.slice(-1)==='.'){ dots++; d=d.slice(0,-1); }
  var map = {q:'q', h:'h', w:'w', e:'8'};
  return { d: map[d]||d, dots: dots };
}
function render(def){
  const { Renderer, Stave, StaveNote, Accidental, Dot, BarNote, Barline, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const stave = new Stave(8, 28, def.vw - 16, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble'); stave.addTimeSignature(def.ts);
  if (def.endBar) stave.setEndBarType(Barline.type.END);
  stave.setContext(ctx).draw();
  const tickables = def.seq.map(function(tok){
    if (tok === '|') return new BarNote();
    var parts = tok.split(':');
    var info = durOf(parts[1]);
    if (parts[0] === 'r'){
      var rest = new StaveNote({ keys:['b/4'], duration: info.d + 'r' });
      for (var i=0;i<info.dots;i++){ Dot.buildAndAttach([rest], { all:true }); }
      return rest;
    }
    var n = new StaveNote({ keys:[parts[0]], duration: info.d, clef:'treble' });
    var a = acc(parts[0]); if (a) n.addModifier(new Accidental(a), 0);
    for (var j=0;j<info.dots;j++){ Dot.buildAndAttach([n], { all:true }); }
    var line = n.getKeyProps()[n.getKeyProps().length-1].line;
    n.setStemDirection(line>=3?-1:1);
    return n;
  });
  const voice = new Voice({ num_beats: 40, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(tickables);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 95);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 360; def.vh = 170;
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
    console.log('  ok ' + def.file);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
