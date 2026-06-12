'use strict';
// Notación limpia (VexFlow) para la página de acordes tríadas: los 4 tipos en
// estado fundamental con sus intervalos de 3ª y 5ª, las inversiones y el ejemplo.
// Salida: assets/img/acordes/triadas/*.png  (+ webp aparte con tools PIL)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/acordes/triadas');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Cada item: file + keys (1 acorde de 1+ notas, de grave a agudo).
const ITEMS = [
  // Ejemplo genérico
  { file: 'ejemplo-triada', keys: ['c/4', 'e/4', 'g/4'] },

  // Tipos en estado fundamental: acorde completo + 5ª + 3ª
  { file: 'mayor-acorde',     keys: ['c/4', 'e/4',  'g/4'] },
  { file: 'mayor-quinta',     keys: ['c/4', 'g/4'] },
  { file: 'mayor-tercera',    keys: ['c/4', 'e/4'] },

  { file: 'menor-acorde',     keys: ['c/4', 'eb/4', 'g/4'] },
  { file: 'menor-quinta',     keys: ['c/4', 'g/4'] },
  { file: 'menor-tercera',    keys: ['c/4', 'eb/4'] },

  { file: 'aumentada-acorde', keys: ['c/4', 'e/4',  'g#/4'] },
  { file: 'aumentada-quinta', keys: ['c/4', 'g#/4'] },
  { file: 'aumentada-tercera',keys: ['c/4', 'e/4'] },

  { file: 'disminuida-acorde',keys: ['c/4', 'eb/4', 'gb/4'] },
  { file: 'disminuida-quinta',keys: ['c/4', 'gb/4'] },
  { file: 'disminuida-tercera',keys: ['c/4', 'eb/4'] },

  // Inversiones de Do mayor (Do-Mi-Sol)
  { file: 'inv1-acorde', keys: ['e/4', 'g/4', 'c/5'] }, // 1ª inv: Mi-Sol-Do
  { file: 'inv1-sexta',  keys: ['e/4', 'c/5'] },        // 6ª (Mi-Do)
  { file: 'inv1-tercera',keys: ['e/4', 'g/4'] },        // 3ª (Mi-Sol)

  { file: 'inv2-acorde', keys: ['g/4', 'c/5', 'e/5'] }, // 2ª inv: Sol-Do-Mi
  { file: 'inv2-sexta',  keys: ['g/4', 'e/5'] },        // 6ª (Sol-Mi)
  { file: 'inv2-cuarta', keys: ['g/4', 'c/5'] },        // 4ª (Sol-Do)
];

const RENDER_FN = `
function renderChord(def) {
  const { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 24);
  stave.addClef('treble');
  stave.setContext(ctx).draw();
  const note = new StaveNote({ keys: def.keys, duration: 'w', clef: 'treble' });
  def.keys.forEach(function (k, i) {
    const acc = k.split('/')[0].slice(1);   // '', 'b', 'bb', '#'
    if (acc) note.addModifier(new Accidental(acc), i);
  });
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of ITEMS) {
    def.vw = 200; def.vh = 200;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderChord(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(200);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' imágenes.');
}
main().catch((e) => { console.error(e); process.exit(1); });
