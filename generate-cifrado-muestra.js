'use strict';
// MUESTRA de estilo de bajo cifrado (VexFlow + texto debajo del pentagrama).
// Genera 2 ejemplos para validar: 5ª disminuida (5 tachado) y dominante (+).
// Salida: C:/tmp/cifrado-muestra-*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');

// figure: filas de cifra; cada fila = {text, crossed?}.  '#','b','n' => alteraciones.
const ITEMS = [
  { file: 'C:/tmp/cifrado-muestra-sensible', keys: ['b/4', 'd/5', 'f/5'], accs: ['', '', ''],
    figures: [{ text: '5', crossed: true }] },
  { file: 'C:/tmp/cifrado-muestra-dominante', keys: ['g/4', 'b/4', 'd/5'], accs: ['', '', ''],
    figures: [{ text: '+' }] },
];

const RENDER_FN = `
function renderCifrado(def) {
  const { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 24);
  stave.addClef('treble');
  stave.setContext(ctx).draw();
  const note = new StaveNote({ keys: def.keys, duration: 'w', clef: 'treble' });
  def.accs.forEach(function (a, i) { if (a) note.addModifier(new Accidental(a), i); });
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);

  // Cifra debajo del pentagrama, centrada bajo la cabeza del acorde.
  const noteX = note.getAbsoluteX() + 6;
  const svg = div.querySelector('svg');
  const SVGNS = 'http://www.w3.org/2000/svg';
  let y = def.figBaseY;
  def.figures.forEach(function (row) {
    const t = document.createElementNS(SVGNS, 'text');
    t.setAttribute('x', noteX);
    t.setAttribute('y', y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', 'Georgia, serif');
    t.setAttribute('font-size', '30');
    t.setAttribute('font-weight', '700');
    t.setAttribute('fill', '#000');
    t.textContent = row.text;
    svg.appendChild(t);
    if (row.crossed) {
      const ln = document.createElementNS(SVGNS, 'line');
      ln.setAttribute('x1', noteX - 11); ln.setAttribute('y1', y - 4);
      ln.setAttribute('x2', noteX + 11); ln.setAttribute('y2', y - 20);
      ln.setAttribute('stroke', '#000'); ln.setAttribute('stroke-width', '2.4');
      svg.appendChild(ln);
    }
    y += 30;
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 200; def.vh = 230; def.figBaseY = 185;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderCifrado(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(200);
    fs.writeFileSync(def.file + '.png', await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
