'use strict';
// Genera miniaturas de previsualización de las plantillas de pentagrama (pentagramas
// vacíos con su clave) para la rejilla descargable. VexFlow + Playwright.
// Salida: assets/img/pentagramas/preview-*.png (+ webp con convert manual).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/pentagramas');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// file, clef VexFlow (o null), type ('single' | 'double' | 'doubleGF')
const ITEMS = [
  ['preview-pentagrama-en-blanco', null, 'single'],
  ['preview-pentagrama-clave-sol', 'treble', 'single'],
  ['preview-pentagrama-clave-fa-4', 'bass', 'single'],
  ['preview-pentagrama-clave-fa-3', 'baritone-f', 'single'],
  ['preview-pentagrama-clave-do-1', 'soprano', 'single'],
  ['preview-pentagrama-clave-do-2', 'mezzo-soprano', 'single'],
  ['preview-pentagrama-clave-do-3', 'alto', 'single'],
  ['preview-pentagrama-clave-do-4', 'tenor', 'single'],
  ['preview-pentagrama-doble', null, 'double'],
  ['preview-pentagrama-doble-sol-fa', null, 'doubleGF'],
];

const RENDER_FN = `
function renderPreview(def) {
  const { Renderer, Stave, StaveConnector } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const isDouble = def.type !== 'single';
  const x = isDouble ? 24 : 10;
  const w = def.vw - x - 10;
  function stave(y, clef) {
    const s = new Stave(x, y, w, { space_above_staff_ln: 1, space_below_staff_ln: 0 });
    if (clef) s.addClef(clef);
    s.setContext(ctx).draw();
    return s;
  }
  if (def.type === 'single') {
    [40, 130].forEach(y => stave(y, def.clef));
  } else {
    [[46, 118]].forEach(([yt, yb]) => {
      const top = stave(yt, def.type === 'doubleGF' ? 'treble' : null);
      const bot = stave(yb, def.type === 'doubleGF' ? 'bass' : null);
      new StaveConnector(top, bot).setType(StaveConnector.type.BRACE).setContext(ctx).draw();
      new StaveConnector(top, bot).setType(StaveConnector.type.SINGLE_LEFT).setContext(ctx).draw();
    });
  }
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const [file, clef, type] of ITEMS) {
    const def = { clef, type, vw: 300, vh: 220 };
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderPreview(d), def);
    await page.waitForTimeout(120);
    fs.writeFileSync(path.join(OUTPUT_DIR, file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' previews.');
}
main().catch((e) => { console.error(e); process.exit(1); });
