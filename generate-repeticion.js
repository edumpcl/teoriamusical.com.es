'use strict';
// Signos de repetición en pentagrama (VexFlow 5 + Playwright).
// Salida: assets/img/compases/repeticion-*.png
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/compases');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// m(notes, opts) -> compás. notes = array de claves (negras). opts: begRepeat, endRepeat, endBar, volta{label}, rep
const Q = keys => keys.map(k => ({ key: k }));

const EX = [
  // 1) Barras de repetición  |:  ...  :|
  { file: 'repeticion-barras', vw: 540, bars: [
    { notes: Q(['c/4','d/4','e/4','f/4']), begRepeat: true },
    { notes: Q(['g/4','a/4','g/4','e/4']), endRepeat: true },
  ] },

  // 2) Casillas de 1.ª y 2.ª vez (voltas) con repetición
  { file: 'repeticion-casillas', vw: 700, bars: [
    { notes: Q(['c/4','e/4','g/4','e/4']) },
    { notes: Q(['f/4','e/4','d/4','c/4']), volta: '1.', endRepeat: true },
    { notes: Q(['g/4','g/4','c/5','c/5']), volta: '2.', endBar: true },
  ] },

  // 3) Da Capo: "Fine" y "D.C. al Fine"
  { file: 'repeticion-dc-fine', vw: 680, bars: [
    { notes: Q(['c/4','e/4','g/4','e/4']) },
    { notes: Q(['f/4','e/4','d/4','c/4']), rep: 'FINE' },
    { notes: Q(['g/4','a/4','g/4','e/4']), rep: 'DC_AL_FINE', endBar: true },
  ] },

  // 4) Dal Segno con Coda: Segno, "To Coda", "D.S. al Coda", Coda
  { file: 'repeticion-segno-coda', vw: 880, bars: [
    { notes: Q(['c/4','e/4','g/4','e/4']), rep: 'SEGNO_LEFT' },
    { notes: Q(['f/4','e/4','d/4','c/4']), rep: 'TO_CODA' },
    { notes: Q(['g/4','a/4','g/4','e/4']), rep: 'DS_AL_CODA' },
    { notes: Q(['c/5','b/4','c/5','c/5']), rep: 'CODA_LEFT', endBar: true },
  ] },
];

const RENDER_FN = `
function renderEx(def) {
  const { Renderer, Stave, StaveNote, Beam, Formatter, Voice, Barline, Volta, Repetition } = VexFlow;
  const div = document.getElementById('vf'); div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const ctx = renderer.getContext();

  const nBars = def.bars.length;
  const sx = 10, topY = 48;
  const totalW = def.vw - sx - 14;
  const firstExtra = 56;
  const barW = (totalW - firstExtra) / nBars;

  let x = sx;
  def.bars.forEach(function (bar, bi) {
    const w = (bi === 0 ? barW + firstExtra : barW);
    const stave = new Stave(x, topY, w);
    if (bi === 0) { stave.addClef('treble'); stave.addTimeSignature('4/4'); }
    if (bar.begRepeat) stave.setBegBarType(Barline.type.REPEAT_BEGIN);
    if (bar.endRepeat) stave.setEndBarType(Barline.type.REPEAT_END);
    else if (bar.endBar) stave.setEndBarType(Barline.type.END);
    if (bar.volta) stave.setVoltaType(Volta.type.BEGIN_END, bar.volta, 0);
    if (bar.rep) stave.setRepetitionType(Repetition.type[bar.rep], 0);
    stave.setContext(ctx).draw();

    const notes = bar.notes.map(function (d) {
      const sn = new StaveNote({ keys: [d.key], duration: 'q', clef: 'treble' });
      const line = sn.getKeyProps()[0].line;
      sn.setStemDirection(line >= 3 ? -1 : 1);
      return sn;
    });
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setMode(Voice.Mode.SOFT); voice.addTickables(notes);
    // Margen derecho holgado; extra si la barra de cierre es ancha (repetición/final).
    let rightPad = (bi === 0 ? firstExtra + 34 : 50);
    if (bar.endRepeat || bar.endBar) rightPad += 22;
    new Formatter().joinVoices([voice]).format([voice], w - rightPad);
    voice.draw(ctx, stave);
    x += w;
  });
}
`;

async function main() {
  const browser = await chromium.launch();
  for (const def of EX) {
    def.vh = 170;
    const c = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await c.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderEx(d), def);
    await page.waitForTimeout(150);
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), await page.screenshot({ fullPage: true }));
    console.log('  ok ' + def.file + '.png');
    await c.close();
  }
  await browser.close();
  console.log('Done: ' + EX.length + ' imagenes.');
}
main().catch((e) => { console.error(e); process.exit(1); });
