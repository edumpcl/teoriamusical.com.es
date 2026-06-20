'use strict';
// Imagen comparativa 3/4 vs 6/8: las mismas seis corcheas agrupadas distinto.
// VexFlow + Playwright. Salida: assets/img/compases/seis-corcheas-34-vs-68.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ROWS = [
  { label: '3/4 · tres tiempos, cada uno en dos', ts: '3/4', groups: [[0,1],[2,3],[4,5]], beats: ['1','2','3'] },
  { label: '6/8 · dos tiempos, cada uno en tres', ts: '6/8', groups: [[0,1,2],[3,4,5]], beats: ['1','2'] },
];

const RENDER_FN = `
function render(def){
  const { Renderer, Stave, StaveNote, Articulation, Modifier, Beam, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const NS='http://www.w3.org/2000/svg';
  def.rows.forEach(function(row, idx){
    const y = def.y0 + idx*def.dy;
    const stave = new Stave(14, y, def.vw - 28, { space_above_staff_ln:0, space_below_staff_ln:0 });
    stave.addClef('treble'); stave.addTimeSignature(row.ts);
    stave.setContext(ctx).draw();
    const notes = [];
    for (var i=0;i<6;i++){
      const n = new StaveNote({ keys:['b/4'], duration:'8', clef:'treble' });
      n.setStemDirection(-1);
      if (i===0) n.addModifier(new Articulation('a>').setPosition(Modifier.Position.ABOVE), 0);
      notes.push(n);
    }
    const voice = new Voice({ num_beats:6, beat_value:8 });
    voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], def.vw - 150);
    const beams = row.groups.map(function(g){ return new Beam(g.map(function(i){ return notes[i]; })); });
    voice.draw(ctx, stave);
    beams.forEach(function(b){ b.setContext(ctx).draw(); });
    const svg = div.querySelector('svg');
    // etiqueta de la fila
    const t = document.createElementNS(NS,'text');
    t.setAttribute('x', 14); t.setAttribute('y', y - 8); t.setAttribute('font-family','Arial, Helvetica, sans-serif');
    t.setAttribute('font-size','17'); t.setAttribute('fill','#1a1a1a'); t.textContent = row.label; svg.appendChild(t);
    // número de tiempo bajo cada grupo
    row.groups.forEach(function(g, gi){
      var xs = g.map(function(i){ return notes[i].getAbsoluteX(); });
      var cx = xs.reduce(function(a,b){return a+b;},0)/xs.length + 6;
      const bt = document.createElementNS(NS,'text');
      bt.setAttribute('x', cx); bt.setAttribute('y', y + 108); bt.setAttribute('text-anchor','middle');
      bt.setAttribute('font-family','Arial, Helvetica, sans-serif'); bt.setAttribute('font-size','15'); bt.setAttribute('fill','#555');
      bt.textContent = row.beats[gi]; svg.appendChild(bt);
    });
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  const def = { rows: ROWS, vw: 440, vh: 380, y0: 56, dy: 172 };
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: def.vw, height: def.vh });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((d) => render(d), def);
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
  await page.waitForTimeout(200);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'seis-corcheas-34-vs-68.png'), await page.screenshot({ fullPage: true }));
  console.log('  ok seis-corcheas-34-vs-68');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
