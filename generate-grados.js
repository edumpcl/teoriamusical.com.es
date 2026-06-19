'use strict';
// Escala de Do mayor con cada grado rotulado (número romano + nombre) bajo cada nota.
// VexFlow + etiquetas SVG. Salida: assets/img/escalas/grados-escala-do.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/escalas');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const KEYS = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const NAMES = ['Tónica', 'Supertónica', 'Mediante', 'Subdominante', 'Dominante', 'Superdominante', 'Sensible', 'Tónica'];

const RENDER_FN = `
function render(def){
  const { Renderer, Stave, StaveNote, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const stave = new Stave(8, 24, def.vw - 20, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble'); stave.setContext(ctx).draw();
  const notes = def.keys.map(function(k){ return new StaveNote({ keys:[k], duration:'w', clef:'treble' }); });
  const voice = new Voice({ num_beats: def.keys.length, beat_value: 1 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);
  const svg = div.querySelector('svg');
  const NS='http://www.w3.org/2000/svg';
  notes.forEach(function(n,i){
    const x = n.getAbsoluteX() + 7;
    const rt = document.createElementNS(NS,'text');
    rt.setAttribute('x',x); rt.setAttribute('y',def.yRoman); rt.setAttribute('text-anchor','middle');
    rt.setAttribute('font-family','Georgia, serif'); rt.setAttribute('font-size','23'); rt.setAttribute('font-weight','400');
    rt.setAttribute('fill','#8a6a00'); rt.textContent = def.roman[i]; svg.appendChild(rt);
    const nm = document.createElementNS(NS,'text');
    nm.setAttribute('x',x); nm.setAttribute('y',def.yName); nm.setAttribute('text-anchor','middle');
    nm.setAttribute('font-family','Arial, Helvetica, sans-serif'); nm.setAttribute('font-size','14'); nm.setAttribute('font-weight','400');
    nm.setAttribute('fill','#1a1a1a'); nm.textContent = def.names[i]; svg.appendChild(nm);
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  const def = { keys: KEYS, roman: ROMAN, names: NAMES, vw: 980, vh: 210, yRoman: 165, yName: 188 };
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: def.vw, height: def.vh });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((d) => render(d), def);
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
  await page.waitForTimeout(250);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'grados-escala-do.png'), await page.screenshot({ fullPage: true }));
  console.log('  ok grados-escala-do.png');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
