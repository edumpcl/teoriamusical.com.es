'use strict';
// Imagen comparativa: los tres comienzos (tético, anacrúsico, acéfalo) en un
// solo gráfico, tres pentagramas apilados con etiqueta. VexFlow + Playwright.
// Salida: assets/img/frase/comienzo-comparativa.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/frase');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ROWS = [
  { label: 'Tético  ·  empieza en el tiempo fuerte', seq: ['c/5:q','d/5:q','e/5:q','f/5:q'] },
  { label: 'Anacrúsico  ·  antes del tiempo fuerte', seq: ['g/4:q','|','c/5:q','d/5:q','e/5:q'] },
  { label: 'Acéfalo  ·  tras un silencio en el tiempo fuerte', seq: ['r:q','c/5:q','d/5:q','e/5:q'] },
];

const RENDER_FN = `
function acc(k){ var p=k.split('/')[0]; return p.length>1 ? p.slice(1) : ''; }
function durOf(spec){ var d=spec, dots=0; while(d.slice(-1)==='.'){dots++;d=d.slice(0,-1);} var map={q:'q',h:'h',w:'w',e:'8'}; return {d:map[d]||d,dots:dots}; }
function render(def){
  const { Renderer, Stave, StaveNote, Accidental, Dot, BarNote, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const NS='http://www.w3.org/2000/svg';
  def.rows.forEach(function(row, idx){
    const y = def.y0 + idx*def.dy;
    const stave = new Stave(14, y, def.vw - 28, { space_above_staff_ln:0, space_below_staff_ln:0 });
    stave.addClef('treble'); stave.addTimeSignature('4/4');
    stave.setContext(ctx).draw();
    const ticks = row.seq.map(function(tok){
      if (tok === '|') return new BarNote();
      var parts = tok.split(':'); var info = durOf(parts[1]);
      if (parts[0] === 'r'){ var rest = new StaveNote({ keys:['b/4'], duration: info.d + 'r' }); return rest; }
      var n = new StaveNote({ keys:[parts[0]], duration: info.d, clef:'treble' });
      var a = acc(parts[0]); if (a) n.addModifier(new Accidental(a), 0);
      var line = n.getKeyProps()[n.getKeyProps().length-1].line; n.setStemDirection(line>=3?-1:1);
      return n;
    });
    const voice = new Voice({ num_beats: 40, beat_value: 4 });
    voice.setMode(Voice.Mode.SOFT); voice.addTickables(ticks);
    new Formatter().joinVoices([voice]).format([voice], def.vw - 150);
    voice.draw(ctx, stave);
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
  const def = { rows: ROWS, vw: 460, vh: 470, y0: 58, dy: 140 };
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: def.vw, height: def.vh });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((d) => render(d), def);
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
  await page.waitForTimeout(200);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'comienzo-comparativa.png'), await page.screenshot({ fullPage: true }));
  console.log('  ok comienzo-comparativa');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
