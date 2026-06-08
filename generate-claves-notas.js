'use strict';
// Genera el diagrama de "notas en la clave de X": pentagrama con las 9 notas
// (líneas y espacios) y su nombre debajo. VexFlow + Playwright.
// Salida: assets/img/claves/notas-clave-*.png (+ webp).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/claves');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, clef, [ [key, nombre], ... ] de grave a agudo (líneas y espacios)
const ITEMS = [
  ['notas-clave-sol', 'treble', [
    ['e/4','Mi'],['f/4','Fa'],['g/4','Sol'],['a/4','La'],['b/4','Si'],
    ['c/5','Do'],['d/5','Re'],['e/5','Mi'],['f/5','Fa']]],
  ['notas-clave-fa', 'bass', [
    ['g/2','Sol'],['a/2','La'],['b/2','Si'],['c/3','Do'],['d/3','Re'],
    ['e/3','Mi'],['f/3','Fa'],['g/3','Sol'],['a/3','La']]],
  ['notas-clave-do', 'alto', [
    ['f/3','Fa'],['g/3','Sol'],['a/3','La'],['b/3','Si'],['c/4','Do'],
    ['d/4','Re'],['e/4','Mi'],['f/4','Fa'],['g/4','Sol']]],
  ['notas-clave-do-1', 'soprano', [
    ['c/4','Do'],['d/4','Re'],['e/4','Mi'],['f/4','Fa'],['g/4','Sol'],
    ['a/4','La'],['b/4','Si'],['c/5','Do'],['d/5','Re']]],
  ['notas-clave-do-2', 'mezzo-soprano', [
    ['a/3','La'],['b/3','Si'],['c/4','Do'],['d/4','Re'],['e/4','Mi'],
    ['f/4','Fa'],['g/4','Sol'],['a/4','La'],['b/4','Si']]],
  ['notas-clave-do-4', 'tenor', [
    ['d/3','Re'],['e/3','Mi'],['f/3','Fa'],['g/3','Sol'],['a/3','La'],
    ['b/3','Si'],['c/4','Do'],['d/4','Re'],['e/4','Mi']]],
];

const RENDER_FN = `
function renderItem(def) {
  const { Renderer, Stave, StaveNote, Annotation, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 14, def.vw - 18);
  stave.addClef(def.clef);
  stave.setContext(ctx).draw();

  const notes = def.notes.map(([key, name]) => {
    const n = new StaveNote({ keys: [key], duration: 'w', clef: def.clef });
    const a = new Annotation(name);
    a.setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
    a.setFont('Arial', 13, 'bold');
    n.addModifier(a, 0);
    return n;
  });

  const voice = new Voice({ num_beats: def.notes.length * 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 95);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, clef, notes] of ITEMS) {
    const def = { clef, notes, vw: 620, vh: 200 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderItem(d), def);
    await page.waitForTimeout(140);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' diagramas.');
}
main().catch((e) => { console.error(e); process.exit(1); });
