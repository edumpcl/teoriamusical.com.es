'use strict';
// Bajo cifrado de las tríadas (VexFlow + cifra en SVG debajo). Todo normalizado a
// Do mayor (sin armadura), reproduciendo cada cifra del material original.
// Salida: assets/img/acordes/triadas/cif-*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/acordes/triadas');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const S = '♯', B = '♭', N = '♮'; // ♯ ♭ ♮

// keys: posición natural (letra/8ª). accs: glifo a mostrar por nota ('', '#','b','n','##','bb').
// figures: filas de arriba a abajo; cada fila {t:'texto'} o {t:'5',crossed:true}.
const ITEMS = [
  // ---- Estado fundamental (Do-Mi-Sol) ----
  { file: 'cif-fund',           keys: ['c/4','e/4','g/4'], accs: ['','',''],   figures: [] },
  { file: 'cif-fund-dominante', keys: ['g/4','b/4','d/5'], accs: ['','',''],   figures: [{t:'+'}] },
  { file: 'cif-fund-sensible',  keys: ['b/4','d/5','f/5'], accs: ['','',''],   figures: [{t:'5',crossed:true}] },
  { file: 'cif-fund-5s', keys: ['c/4','e/4','g/4'], accs: ['','','#'], figures: [{t:S+'5'}] },
  { file: 'cif-fund-5b', keys: ['c/4','e/4','g/4'], accs: ['','','b'], figures: [{t:B+'5'}] },
  { file: 'cif-fund-5n', keys: ['c/4','e/4','g/4'], accs: ['','','n'], figures: [{t:N+'5'}] },
  { file: 'cif-fund-3s', keys: ['c/4','e/4','g/4'], accs: ['','#',''], figures: [{t:S}] },
  { file: 'cif-fund-3b', keys: ['c/4','e/4','g/4'], accs: ['','b',''], figures: [{t:B}] },
  { file: 'cif-fund-3n', keys: ['c/4','e/4','g/4'], accs: ['','n',''], figures: [{t:N}] },
  { file: 'cif-fund-2n-1', keys: ['c/4','e/4','g/4'], accs: ['','#','b'], figures: [{t:B+'5'},{t:S}] },
  { file: 'cif-fund-2n-2', keys: ['c/4','e/4','g/4'], accs: ['','#','#'], figures: [{t:S+'5'},{t:S}] },
  { file: 'cif-fund-2n-3', keys: ['c/4','e/4','g/4'], accs: ['','n','#'], figures: [{t:S+'5'},{t:N}] },

  // ---- 1ª inversión (Mi-Sol-Do) ----
  { file: 'cif-1a',          keys: ['e/4','g/4','c/5'], accs: ['','',''], figures: [{t:'6'}] },
  { file: 'cif-1a-sensible', keys: ['d/4','f/4','b/4'], accs: ['','',''], figures: [{t:'+6'},{t:'3'}] },
  { file: 'cif-1a-6s', keys: ['e/4','g/4','c/5'], accs: ['','','#'], figures: [{t:S+'6'}] },
  { file: 'cif-1a-6b', keys: ['e/4','g/4','c/5'], accs: ['','','b'], figures: [{t:B+'6'}] },
  { file: 'cif-1a-6n', keys: ['e/4','g/4','c/5'], accs: ['','','n'], figures: [{t:N+'6'}] },
  { file: 'cif-1a-3s', keys: ['e/4','g/4','c/5'], accs: ['','#',''], figures: [{t:'6'},{t:S}] },
  { file: 'cif-1a-3b', keys: ['e/4','g/4','c/5'], accs: ['','b',''], figures: [{t:'6'},{t:B}] },
  { file: 'cif-1a-3n', keys: ['e/4','g/4','c/5'], accs: ['','n',''], figures: [{t:'6'},{t:N}] },
  { file: 'cif-1a-2n-1', keys: ['e/4','g/4','c/5'], accs: ['','##','##'], figures: [{t:'x6'},{t:'x'}] },
  { file: 'cif-1a-2n-2', keys: ['e/4','g/4','c/5'], accs: ['','n','n'],   figures: [{t:N+'6'},{t:N}] },
  { file: 'cif-1a-2n-3', keys: ['e/4','g/4','c/5'], accs: ['','n','b'],   figures: [{t:B+'6'},{t:N}] },

  // ---- 2ª inversión (Sol-Do-Mi) ----
  { file: 'cif-2a',          keys: ['g/4','c/5','e/5'], accs: ['','',''], figures: [{t:'6'},{t:'4'}] },
  { file: 'cif-2a-dominante', keys: ['d/4','g/4','b/4'], accs: ['','',''], figures: [{t:'+6'},{t:'4'}] },
  { file: 'cif-2a-sensible',  keys: ['f/4','b/4','d/5'], accs: ['','',''], figures: [{t:'6'},{t:'+4'}] },
  { file: 'cif-2a-6s', keys: ['g/4','c/5','e/5'], accs: ['','','#'], figures: [{t:S+'6'},{t:'4'}] },
  { file: 'cif-2a-6b', keys: ['g/4','c/5','e/5'], accs: ['','','b'], figures: [{t:B+'6'},{t:'4'}] },
  { file: 'cif-2a-6n', keys: ['g/4','c/5','e/5'], accs: ['','','n'], figures: [{t:N+'6'},{t:'4'}] },
  { file: 'cif-2a-4s', keys: ['g/4','c/5','e/5'], accs: ['','#',''], figures: [{t:'6'},{t:S+'4'}] },
  { file: 'cif-2a-4b', keys: ['g/4','c/5','e/5'], accs: ['','b',''], figures: [{t:'6'},{t:B+'4'}] },
  { file: 'cif-2a-4n', keys: ['g/4','c/5','e/5'], accs: ['','n',''], figures: [{t:'6'},{t:N+'4'}] },
  { file: 'cif-2a-2n-1', keys: ['g/4','c/5','e/5'], accs: ['','#','#'],  figures: [{t:S+'6'},{t:S+'4'}] },
  { file: 'cif-2a-2n-2', keys: ['g/4','c/5','e/5'], accs: ['','bb','b'], figures: [{t:B+'6'},{t:B+B+'4'}] },
  { file: 'cif-2a-2n-3', keys: ['g/4','c/5','e/5'], accs: ['','n','#'],  figures: [{t:S+'6'},{t:N+'4'}] },
];

const RENDER_FN = `
function renderCif(def) {
  const { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 28, def.vw - 24);
  stave.addClef('treble'); stave.setContext(ctx).draw();
  const note = new StaveNote({ keys: def.keys, duration: 'w', clef: 'treble' });
  def.accs.forEach(function (a, i) { if (a) note.addModifier(new Accidental(a), i); });
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT); voice.addTickables([note]);
  new Formatter().joinVoices([voice]).format([voice], def.vw - 90);
  voice.draw(ctx, stave);

  const noteX = note.getAbsoluteX() + 8;
  const svg = div.querySelector('svg');
  const NS = 'http://www.w3.org/2000/svg';
  let y = def.figBaseY;
  def.figures.forEach(function (row) {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', noteX); t.setAttribute('y', y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', 'Georgia, "Times New Roman", serif');
    t.setAttribute('font-size', '29'); t.setAttribute('font-weight', '700');
    t.setAttribute('fill', '#000'); t.textContent = row.t;
    svg.appendChild(t);
    if (row.crossed) {
      const w = 13;
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', noteX - w); ln.setAttribute('y1', y - 2);
      ln.setAttribute('x2', noteX + w); ln.setAttribute('y2', y - 20);
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
    def.vw = 200; def.vh = 240; def.figBaseY = 188;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderCif(d), def);
    await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
    await page.waitForTimeout(180);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file);
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + ITEMS.length + ' cifrados.');
}
main().catch((e) => { console.error(e); process.exit(1); });
