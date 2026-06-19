'use strict';
// Imagen compacta: la anacrusa en melodías famosas (incipits cortos etiquetados).
// VexFlow + Playwright. Salida: assets/img/compases/anacrusa-famosas.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Cada fila: incipit con su compás. La 1.ª agrupación (antes del primer '|') es la anacrusa.
const ROWS = [
  { label: 'Cumpleaños feliz', ts: '3/4', seq: ['g/4:e.','g/4:s','|','a/4:q','g/4:q','c/5:q'] },
  { label: 'Para Elisa (Beethoven)', ts: '3/8', seq: ['e/5:s','d#/5:s','|','e/5:s','d#/5:s','e/5:s','b/4:s','d/5:s','c/5:s','|','a/4:e'] },
];

const RENDER_FN = `
function acc(k){ var p=k.split('/')[0]; return p.length>1 ? p.slice(1) : ''; }
function letterOct(k){ var parts=k.split('/'); return parts[0].charAt(0)+'/'+parts[1]; }
function durOf(spec){ var d=spec, dots=0; while(d.slice(-1)==='.'){dots++;d=d.slice(0,-1);} var map={q:'q',h:'h',w:'w',e:'8',s:'16'}; return {d:map[d]||d,dots:dots}; }
function buildTicks(seq, noAcc){
  const { StaveNote, Accidental, Dot, BarNote } = VexFlow;
  var measAcc = {};
  return seq.map(function(tok){
    if (tok === '|'){ measAcc = {}; return new BarNote(); }
    var parts = tok.split(':'); var info = durOf(parts[1]);
    if (parts[0] === 'r'){ var rest = new StaveNote({ keys:['b/4'], duration: info.d + 'r' });
      for (var i=0;i<info.dots;i++){ Dot.buildAndAttach([rest], { all:true }); } return rest; }
    var n = new StaveNote({ keys:[parts[0]], duration: info.d, clef:'treble' });
    if (!noAcc){
      var a = acc(parts[0]); var key = letterOct(parts[0]);
      if (a){ if (measAcc[key] !== a){ n.addModifier(new Accidental(a), 0); measAcc[key] = a; } }
      else if (measAcc[key] && measAcc[key] !== 'n'){ n.addModifier(new Accidental('n'), 0); measAcc[key] = 'n'; }
    }
    for (var j=0;j<info.dots;j++){ Dot.buildAndAttach([n], { all:true }); }
    var line = n.getKeyProps()[n.getKeyProps().length-1].line; n.setStemDirection(line>=3?-1:1);
    return n;
  });
}
function drawRow(ctx, vw, y, ts, seq, keySig){
  const { Stave, Barline, Formatter, Voice, Beam, BarNote } = VexFlow;
  const stave = new Stave(14, y, vw - 28, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble');
  if (keySig) stave.addKeySignature(keySig);
  stave.addTimeSignature(ts);
  stave.setEndBarType(Barline.type.NONE);
  stave.setContext(ctx).draw();
  const ticks = buildTicks(seq, !!keySig);
  const voice = new Voice({ num_beats: 40, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(ticks);
  new Formatter().joinVoices([voice]).format([voice], vw - 150);
  const groups = []; var cur = [];
  ticks.forEach(function(t){
    var beamable = !(t instanceof BarNote) && !t.isRest() && ['8','16','32'].indexOf(t.getDuration()) !== -1;
    if (beamable) { cur.push(t); } else { if (cur.length > 1) groups.push(cur); cur = []; }
  });
  if (cur.length > 1) groups.push(cur);
  const beams = groups.map(function(g){ return new Beam(g); });
  voice.draw(ctx, stave);
  beams.forEach(function(b){ b.setContext(ctx).draw(); });
}
function render(def){
  const { Renderer } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const NS='http://www.w3.org/2000/svg';
  def.rows.forEach(function(row, idx){
    const y = 56 + idx*138;
    drawRow(ctx, def.vw, y, row.ts, row.seq, row.key);
    const svg = div.querySelector('svg');
    const t = document.createElementNS(NS,'text');
    t.setAttribute('x', 14); t.setAttribute('y', y - 8);
    t.setAttribute('font-family','Arial, Helvetica, sans-serif'); t.setAttribute('font-size','17'); t.setAttribute('font-weight','400');
    t.setAttribute('fill','#1a1a1a'); t.textContent = row.label; svg.appendChild(t);
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  const def = { rows: ROWS, vw: 460, vh: 330 };
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: def.vw, height: def.vh });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((d) => render(d), def);
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
  await page.waitForTimeout(200);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'anacrusa-famosas.png'), await page.screenshot({ fullPage: true }));
  console.log('  ok anacrusa-famosas');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
