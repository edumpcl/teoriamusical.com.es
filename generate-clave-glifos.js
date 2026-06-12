'use strict';
// Glifos de clave en notación limpia (VexFlow/Bravura): solo la clave sobre un
// pentagrama corto, sin notas. Reemplaza los antiguos clave_*-150x150.png.
// Salida: assets/img/claves/glifo-clave-{sol,fa,do}.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/claves');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  { file: 'glifo-clave-sol', clef: 'treble' }, // Sol en 2ª
  { file: 'glifo-clave-fa',  clef: 'bass' },   // Fa en 4ª
  { file: 'glifo-clave-do',  clef: 'alto' },   // Do en 3ª (viola)
];

const RENDER_FN = `
function renderClef(def) {
  const { Renderer, Stave } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(6, 22, def.vw - 12, { space_above_staff_ln: 0, space_below_staff_ln: 0 });
  stave.addClef(def.clef);
  stave.setContext(ctx).draw();
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 66; def.vh = 130;
    const ctx = await browser.newContext({ deviceScaleFactor: 3 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderClef(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(250);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' glifos de clave.');
}
main().catch((e) => { console.error(e); process.exit(1); });
