'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');

// H=harmonic(1 chord), M=melodic(2 notes)
const H = (files, keys, accs, vw=420, vh=120, sy=18) => ({ srcFiles:files, type:'harmonic', notes:[{keys,accs}], vw, vh, sy });
const M = (files, k1, k2, vw=420, vh=120, sy=18) => ({ srcFiles:files, type:'melodic', notes:[{keys:k1,accs:[]},{keys:k2,accs:[]}], vw, vh, sy });
const acc = (ki,t) => ({ki,t});

const INTERVALS = [
  // --- Ejemplos básicos ---
  H(['intervalo-armónico-1.png'], ['c/4','g/4'], []),
  M(['intervalo-melódico-1024x227.png','intervalo-melódico.png'], ['c/4'], ['g/4']),
  M(['ejemplo-de-contar-un-intervalo-2-1024x136.png', 'ejemplo-de-contar-un-intervalo-2.png'], ['e/4'], ['a/4'], 560, 170, 55),
  {
    srcFiles: ['ejemplo-de-contar-un-intervalo-1024x136.png', 'ejemplo-de-contar-un-intervalo.png'],
    type: 'counting',
    notes: [
      { keys: ['e/4'], accs: [], label: '1' },
      { keys: ['f/4'], accs: [], label: '2' },
      { keys: ['g/4'], accs: [], label: '3' },
      { keys: ['a/4'], accs: [], label: '4' }
    ],
    vw: 560, vh: 170, sy: 55
  },
  { srcFiles: ['intervalo-ascendente-1024x255.png','intervalo-ascendente.png'],
    type: 'ascending', notes:[{keys:['c/4'],accs:[]},{keys:['g/4'],accs:[]}], vw:380, vh:185, sy:42 },
  { srcFiles: ['intervalo-descendente-1024x255.png','intervalo-descendente.png'],
    type: 'descending', notes:[{keys:['g/4'],accs:[]},{keys:['c/4'],accs:[]}], vw:380, vh:185, sy:42 },

  // --- Segundas ---
  H(['2a-Aumentada-1024x239.png','2a-Aumentada.png'], ['c/4','d#/4'], [acc(1,'#')]),
  H(['2a-Mayor-1024x239.png','2a-Mayor.png'],         ['c/4','d/4'],  []),
  H(['2a-menor-1024x239.png','2a-menor.png'],         ['c/4','db/4'], [acc(1,'b')]),
  H(['enharmonía-1024x239.png','enharmonía.png'],     ['c#/4','db/4'], [acc(0,'#'),acc(1,'b')]),

  // --- Terceras ---
  H(['3º-Aumentada-1024x239.png','3º-Aumentada.png'], ['c/4','e#/4'], [acc(1,'#')]),
  H(['3ª-Mayor-1024x239.png','3ª-Mayor.png'],         ['c/4','e/4'],  []),
  H(['3ª-menor-1024x239.png','3ª-menor.png'],         ['c/4','eb/4'], [acc(1,'b')]),
  H(['3ª-disminuida-1024x239.png','3ª-disminuida.png'],['c/4','ebb/4'],[acc(1,'bb')]),

  // --- Cuartas ---
  H(['4ª-Aumentada-1024x239.png','4ª-Aumentada.png'], ['c/4','f#/4'], [acc(1,'#')]),
  H(['4ª-Disminuida-1024x239.png','4ª-Disminuida.png'],['c/4','fb/4'],[acc(1,'b')]),
  H(['4ª-Justa-1024x239.png','4ª-Justa.png'],         ['c/4','f/4'],  []),

  // --- Quintas ---
  H(['5ª-Aumentada-1024x239.png','5ª-Aumentada.png'], ['c/4','g#/4'], [acc(1,'#')]),
  H(['5ª-Disminuida-1024x239.png','5ª-Disminuida.png'],['c/4','gb/4'],[acc(1,'b')]),
  H(['5ª-Justa-1024x239.png','5ª-Justa.png'],         ['c/4','g/4'],  []),

  // --- Sextas ---
  H(['6ª-Aumentada-1024x239.png','6ª-Aumentada.png'], ['c/4','a#/4'], [acc(1,'#')]),
  H(['6ª-Mayor-1024x239.png','6ª-Mayor.png'],         ['c/4','a/4'],  []),
  H(['6ª-Disminuida-1024x239.png','6ª-Disminuida.png'],['c/4','abb/4'],[acc(1,'bb')]),
  H(['6ª-menor-1024x239.png','6ª-menor.png'],         ['c/4','ab/4'], [acc(1,'b')]),

  // --- Séptimas ---
  H(['7ª-Aumentada-1024x239.png','7ª-Aumentada.png'], ['c/4','b#/4'], [acc(1,'#')]),
  H(['7a-Mayor-1024x239.png','7a-Mayor.png'],         ['c/4','b/4'],  []),
  H(['7a-menor-1024x239.png','7a-menor.png'],         ['c/4','bb/4'], [acc(1,'b')]),
  H(['7ª-disminuida-1024x239.png','7ª-disminuida.png'],['c/4','bbb/4'],[acc(1,'bb')]),

  // --- Octavas ---
  H(['8ª-Disminuida-1024x239.png','8ª-Disminuida.png'],['c/4','cb/5'],[acc(1,'b')]),
  H(['8ª-Aumentada-1024x239.png','8ª-Aumentada.png'], ['c/4','c#/5'], [acc(1,'#')]),
  H(['8ª-Justa-1024x239.png','8ª-Justa.png'],         ['c/4','c/5'],  []),

  // --- Compuestos (12ª) ---
  H(['12ª-Justa-1024x239.png','12ª-Justa-1-1024x239.png'], ['c/4','g/5'], [], 310, 230, 58),
  { srcFiles: ['reducción-de-12ª-Justa-1024x239.png'], type: 'reduction12',
    notes: [{ keys: ['c/4','g/5'], accs: [] }], vw: 310, vh: 230, sy: 58 },
  H(['reducción-de-12ª-Justa-1-1024x239.png'], ['c/4','g/4'], [], 310, 230, 58),
];

const RENDER_FN = `
function renderInterval(def) {
  const { Renderer, Stave, StaveNote, Formatter, Accidental, Annotation, Voice } = VexFlow;

  const div = document.getElementById('vf');
  div.innerHTML = '';

  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const context = renderer.getContext();

  const sx = 10;
  const sw = def.vw - sx - 10;
  const stave = new Stave(sx, def.sy, sw);
  stave.addClef('treble');
  stave.setContext(context).draw();

  let staveNotes = [];

  if (def.type === 'harmonic' || def.type === 'reduction12') {
    const nd = def.notes[0];
    const sn = new StaveNote({ keys: nd.keys, duration: 'w', clef: 'treble' });
    for (const a of nd.accs) sn.addModifier(new Accidental(a.t), a.ki);
    staveNotes = [sn];
  } else {
    staveNotes = def.notes.map(nd => {
      const sn = new StaveNote({ keys: nd.keys, duration: 'w', clef: 'treble' });
      for (const a of nd.accs) sn.addModifier(new Accidental(a.t), a.ki);
      if (nd.label) {
        const ann = new Annotation(nd.label);
        ann.setFont('Arial', 15, 'bold');
        ann.setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
        sn.addModifier(ann);
      }
      return sn;
    });
  }

  const voice = new Voice({ num_beats: staveNotes.length * 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(staveNotes);
  new Formatter().joinVoices([voice]).format([voice], sw - 80);
  voice.draw(context, stave);

  // Ascending/descending label in the empty stave space
  if (def.type === 'ascending' || def.type === 'descending') {
    const svg = div.querySelector('svg');
    if (svg) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', def.vw - 60);
      text.setAttribute('y', def.sy + 30);
      text.setAttribute('font-family', 'Arial');
      text.setAttribute('font-size', '22');
      text.setAttribute('fill', '#555');
      text.textContent = def.type === 'ascending' ? '↗' : '↘';
      svg.appendChild(text);
    }
  }

  // For reduction: add bracket annotation
  if (def.type === 'reduction12') {
    const svg = div.querySelector('svg');
    if (svg) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', def.vw - 90);
      text.setAttribute('y', def.sy + 48);
      text.setAttribute('font-family', 'Arial');
      text.setAttribute('font-size', '13');
      text.setAttribute('fill', '#555');
      text.textContent = '− 8ª';
      svg.appendChild(text);
    }
  }
}
`;

async function main() {
  const browser = await chromium.launch();

  for (const def of INTERVALS) {
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });

    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>`);
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });

    await page.evaluate((d) => renderInterval(d), def);
    await page.waitForTimeout(200);

    const imgBuffer = await page.screenshot({ fullPage: true });

    for (const filename of def.srcFiles) {
      const outPath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(outPath, imgBuffer);
      console.log(`  ✓ ${filename}`);
    }

    await ctx.close();
  }

  await browser.close();
  console.log('\nDone! Generated', INTERVALS.reduce((s, d) => s + d.srcFiles.length, 0), 'images.');
}

main().catch(err => { console.error(err); process.exit(1); });
