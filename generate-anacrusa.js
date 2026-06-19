'use strict';
// Notación para la página de Anacrusa. VexFlow + Playwright.
//  - anacrusa-comparacion: 2 pentagramas (sin anacrusa / con anacrusa)
//  - anacrusa-compas: anacrusa (1 tiempo) + ... + último compás (3) = compás completo
//  - anacrusa-cumpleanos: primer inciso de "Cumpleaños feliz" (anacrusa de 2 corcheas)
// Salida: assets/img/compases/anacrusa-*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  { file: 'anacrusa-comparacion', ts: '4/4', vw: 460, vh: 320, rows: [
      { label: 'Sin anacrusa  ·  comienzo tético', seq: ['c/5:q','d/5:q','e/5:q','f/5:q'] },
      { label: 'Con anacrusa', seq: ['g/4:q','|','c/5:q','d/5:q','e/5:q','f/5:q'] },
  ] },
  { file: 'anacrusa-compas', ts: '4/4', vw: 460, vh: 175, endBar: true,
    seq: ['g/4:q','|','c/5:q','d/5:q','e/5:q','f/5:q','|','g/5:h','e/5:q'] },
  // "Cumpleaños feliz", 1.ª frase. Arranque = corchea con puntillo + semicorchea (barradas).
  // Última nota = blanca (2 t.); compás final SIN cerrar (sin barra) = la melodía continúa.
  { file: 'anacrusa-cumpleanos', ts: '3/4', vw: 380, vh: 175, noEndBar: true,
    seq: ['g/4:e.','g/4:s','|','a/4:q','g/4:q','c/5:q','|','b/4:h'] },
];

const RENDER_FN = `
function acc(k){ var p=k.split('/')[0]; return p.length>1 ? p.slice(1) : ''; }
function durOf(spec){ var d=spec, dots=0; while(d.slice(-1)==='.'){dots++;d=d.slice(0,-1);} var map={q:'q',h:'h',w:'w',e:'8',s:'16'}; return {d:map[d]||d,dots:dots}; }
function buildTicks(seq){
  const { StaveNote, Accidental, Dot, BarNote } = VexFlow;
  return seq.map(function(tok){
    if (tok === '|') return new BarNote();
    var parts = tok.split(':'); var info = durOf(parts[1]);
    if (parts[0] === 'r'){ var rest = new StaveNote({ keys:['b/4'], duration: info.d + 'r' });
      for (var i=0;i<info.dots;i++){ Dot.buildAndAttach([rest], { all:true }); } return rest; }
    var n = new StaveNote({ keys:[parts[0]], duration: info.d, clef:'treble' });
    var a = acc(parts[0]); if (a) n.addModifier(new Accidental(a), 0);
    for (var j=0;j<info.dots;j++){ Dot.buildAndAttach([n], { all:true }); }
    var line = n.getKeyProps()[n.getKeyProps().length-1].line; n.setStemDirection(line>=3?-1:1);
    return n;
  });
}
function drawStave(ctx, def, y, seq, fmtW){
  const { Stave, Barline, Formatter, Voice, Beam, BarNote } = VexFlow;
  const stave = new Stave(12, y, def.vw - 24, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble'); stave.addTimeSignature(def.ts);
  if (def.endBar) stave.setEndBarType(Barline.type.END);
  else if (def.noEndBar) stave.setEndBarType(Barline.type.NONE);
  stave.setContext(ctx).draw();
  const ticks = buildTicks(seq);
  const voice = new Voice({ num_beats: 40, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(ticks);
  new Formatter().joinVoices([voice]).format([voice], fmtW);
  // Barrado manual: agrupa corcheas/semicorcheas consecutivas dentro del mismo compás.
  const groups = []; var cur = [];
  ticks.forEach(function(t){
    var beamable = !(t instanceof BarNote) && !t.isRest() && ['8','16','32'].indexOf(t.getDuration()) !== -1;
    if (beamable) { cur.push(t); }
    else { if (cur.length > 1) groups.push(cur); cur = []; }
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
  if (def.rows){
    def.rows.forEach(function(row, idx){
      const y = 56 + idx*138;
      drawStave(ctx, def, y, row.seq, def.vw - 150);
      const svg = div.querySelector('svg');
      const t = document.createElementNS(NS,'text');
      t.setAttribute('x', 12); t.setAttribute('y', y - 8);
      t.setAttribute('font-family','Inter, Arial, sans-serif'); t.setAttribute('font-size','15'); t.setAttribute('font-weight','700');
      t.setAttribute('fill','#b8860b'); t.textContent = row.label; svg.appendChild(t);
    });
  } else {
    drawStave(ctx, def, 30, def.seq, def.vw - 110);
  }
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => render(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(200);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
