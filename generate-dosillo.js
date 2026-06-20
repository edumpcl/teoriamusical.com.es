'use strict';
// Notación para la página del Dosillo (2 figuras en el tiempo de 3). VexFlow + Playwright.
//  - dosillo-comparacion: tres corcheas (normal en compuesto) frente a un dosillo de dos corcheas
//  - tipos-de-dosillo: dosillo de negra, de corchea y de semicorchea
// Salida: assets/img/compases/dosillo-*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// groups: [{ dur, count, tuplet:bool, label }]; el tuplet del dosillo es 2 en el espacio de 3
const ITEMS = [
  { file: 'dosillo-comparacion', ts: '6/8', vw: 360, groups: [
      { dur: '8', count: 3, label: 'tres corcheas' },
      { dur: '8', count: 2, tuplet: true, label: 'dosillo' },
  ] },
  { file: 'tipos-de-dosillo', vw: 460, groups: [
      { dur: 'q',  count: 2, tuplet: true, label: 'de negra' },
      { dur: '8',  count: 2, tuplet: true, label: 'de corchea' },
      { dur: '16', count: 2, tuplet: true, label: 'de semicorchea' },
  ] },
];

const RENDER_FN = `
function render(def){
  const { Renderer, Stave, StaveNote, Beam, Tuplet, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const stave = new Stave(8, 26, def.vw - 16, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble'); if (def.ts) stave.addTimeSignature(def.ts);
  stave.setContext(ctx).draw();
  const all = []; const groupRanges = []; const beams = []; const tuplets = [];
  def.groups.forEach(function(g){
    const start = all.length; const gnotes = [];
    for (var i=0;i<g.count;i++){
      const n = new StaveNote({ keys:['a/4'], duration: g.dur, clef:'treble' });
      n.setStemDirection(1);
      all.push(n); gnotes.push(n);
    }
    groupRanges.push({ start: start, end: all.length, label: g.label });
    if (g.count > 1 && (g.dur === '8' || g.dur === '16')) beams.push(new Beam(gnotes));
    if (g.tuplet) tuplets.push(new Tuplet(gnotes, { num_notes:2, notes_occupied:3, bracketed:true, ratioed:false, location:1 }));
  });
  const voice = new Voice({ num_beats: 40, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(all);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 80);
  voice.draw(ctx, stave);
  beams.forEach(function(b){ b.setContext(ctx).draw(); });
  tuplets.forEach(function(t){ t.setContext(ctx).draw(); });
  const svg = div.querySelector('svg'); const NS='http://www.w3.org/2000/svg';
  groupRanges.forEach(function(gr){
    var xs = []; for (var i=gr.start;i<gr.end;i++) xs.push(all[i].getAbsoluteX());
    var cx = xs.reduce(function(a,b){return a+b;},0)/xs.length + 6;
    const t = document.createElementNS(NS,'text');
    t.setAttribute('x', cx); t.setAttribute('y', def.yLabel); t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','Arial, Helvetica, sans-serif'); t.setAttribute('font-size','16'); t.setAttribute('fill','#1a1a1a');
    t.textContent = gr.label; svg.appendChild(t);
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vh = 180; def.yLabel = 150;
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
