'use strict';
// Genera el diagrama de equivalencia entre claves: el MISMO Do central escrito
// en las 7 claves, mostrando cómo cambia de posición. VexFlow + Playwright.
// Salida: assets/img/claves/equivalencia-claves-do-central.png (+ webp).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/claves');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Orden ascendente del Do central: de bajo el pentagrama (Sol) a encima (Fa 4ª)
const CLEFS = [
  ['treble', 'Sol en 2ª'],
  ['soprano', 'Do en 1ª'],
  ['mezzo-soprano', 'Do en 2ª'],
  ['alto', 'Do en 3ª'],
  ['tenor', 'Do en 4ª'],
  ['baritone-f', 'Fa en 3ª'],
  ['bass', 'Fa en 4ª'],
];

const RENDER_FN = `
function renderItem(def) {
  const { Renderer, Stave, StaveNote, Annotation, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const panelW = 152, staveW = 122, y = 44;
  def.clefs.forEach((c, i) => {
    const x = 12 + i * panelW;
    const stave = new Stave(x, y, staveW);
    stave.addClef(c[0]);
    stave.setContext(ctx).draw();
    const note = new StaveNote({ keys: ['c/4'], duration: 'w', clef: c[0] });
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setMode(Voice.Mode.SOFT);
    voice.addTickables([note]);
    new Formatter().joinVoices([voice]).format([voice], staveW - 48);
    voice.draw(ctx, stave);
    // Nombre de la clave debajo
    ctx.save();
    ctx.setFont('Arial', 13, 'bold');
    ctx.fillText(c[1], x + 6, y + 112);
    ctx.restore();
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  const def = { clefs: CLEFS, vw: 12 + CLEFS.length * 152 + 4, vh: 168 };
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: def.vw, height: def.vh });
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.evaluate((d) => renderItem(d), def);
  await page.waitForTimeout(160);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'equivalencia-claves-do-central.png'), await page.screenshot({ fullPage: true }));
  console.log('  ok equivalencia-claves-do-central.png (' + def.vw + 'x' + def.vh + ')');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
