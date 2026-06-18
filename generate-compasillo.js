'use strict';
// Símbolos de compasillo (C = 4/4) y compás partido / alla breve (¢ = 2/2), VexFlow.
// Salida: assets/img/compases/{compasillo,alla-breve}.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ITEMS = [
  { file: 'compasillo', ts: 'C' },
  { file: 'alla-breve', ts: 'C|' },
];

const RENDER_FN = `
function render(def){
  const { Renderer, Stave } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML='';
  const r = new Renderer(div, Renderer.Backends.SVG); r.resize(def.vw, def.vh);
  const ctx = r.getContext();
  const stave = new Stave(8, 24, def.vw - 16, { space_above_staff_ln:0, space_below_staff_ln:0 });
  stave.addClef('treble'); stave.addTimeSignature(def.ts);
  stave.setContext(ctx).draw();
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 150; def.vh = 170;
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
    console.log('  ok ' + def.file);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
