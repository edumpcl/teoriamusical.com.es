'use strict';
// Renderiza en pentagrama (VexFlow 5 + Playwright) las escalas de las paginas
// nuevas de /tonalidades/. Mismo metodo que generate-intervalos.js.
// Salida: assets/img/escalas/*.png  (luego add_img_dimensions.py + convert_to_webp.py)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_DIR = path.join(__dirname, 'assets/img/escalas');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// a(indice, tipo) -> alteracion en esa nota
const a = (ki, t) => ({ ki, t });
// S(file, keys, accs) -> escala
const S = (file, keys, accs = []) => ({ file, keys, accs });

const SCALES = [
  // Cromatica ascendente desde Do
  S('escala-cromatica-do', ['c/4','c#/4','d/4','d#/4','e/4','f/4','f#/4','g/4','g#/4','a/4','a#/4','b/4','c/5'],
    [a(1,'#'),a(3,'#'),a(6,'#'),a(8,'#'),a(10,'#')]),

  // Pentatonicas
  S('pentatonica-mayor-do', ['c/4','d/4','e/4','g/4','a/4','c/5']),
  S('pentatonica-menor-la', ['a/4','c/5','d/5','e/5','g/5','a/5']),

  // Blues menor (La) con blue note Mi bemol
  S('blues-menor-la', ['a/4','c/5','d/5','eb/5','e/5','g/5','a/5'], [a(3,'b')]),

  // Tonos enteros desde Do
  S('tonos-enteros-do', ['c/4','d/4','e/4','f#/4','g#/4','a#/4','c/5'], [a(3,'#'),a(4,'#'),a(5,'#')]),

  // Escala hispano-arabe / andaluza / frigio dominante (sobre Mi)
  S('escala-hispano-arabe-mi', ['e/4','f/4','g#/4','a/4','b/4','c/5','d/5','e/5'], [a(2,'#')]),

  // Escala oriental / doble armonica / bizantina (sobre Do)
  S('escala-oriental-do', ['c/4','db/4','e/4','f/4','g/4','ab/4','b/4','c/5'], [a(1,'b'),a(5,'b')]),

  // Modos griegos (teclas blancas)
  S('modo-jonico',    ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5']),
  S('modo-dorico',    ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5']),
  S('modo-frigio',    ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5']),
  S('modo-lidio',     ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5']),
  S('modo-mixolidio', ['g/4','a/4','b/4','c/5','d/5','e/5','f/5','g/5']),
  S('modo-eolico',    ['a/4','b/4','c/5','d/5','e/5','f/5','g/5','a/5']),
  S('modo-locrio',    ['b/4','c/5','d/5','e/5','f/5','g/5','a/5','b/5']),

  // Especies de octava griegas (sistema antiguo), DESCENDENTES de agudo a grave
  S('modo-mixolidio-griego-descendente', ['b/4','a/4','g/4','f/4','e/4','d/4','c/4','b/3']),
  S('modo-lidio-griego-descendente',     ['c/5','b/4','a/4','g/4','f/4','e/4','d/4','c/4']),
  S('modo-frigio-griego-descendente',    ['d/5','c/5','b/4','a/4','g/4','f/4','e/4','d/4']),
  S('modo-dorio-griego-descendente',     ['e/5','d/5','c/5','b/4','a/4','g/4','f/4','e/4']),
  S('modo-hipolidio-griego-descendente', ['f/5','e/5','d/5','c/5','b/4','a/4','g/4','f/4']),
  S('modo-hipofrigio-griego-descendente',['g/5','f/5','e/5','d/5','c/5','b/4','a/4','g/4']),
  S('modo-hipodorio-griego-descendente', ['a/5','g/5','f/5','e/5','d/5','c/5','b/4','a/4']),
];

const RENDER_FN = `
function renderScale(def) {
  const { Renderer, Stave, StaveNote, Formatter, Accidental, Voice } = VexFlow;
  const div = document.getElementById('vf');
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(def.vw, def.vh);
  const context = renderer.getContext();

  const sx = 10;
  const sw = def.vw - sx - 12;
  const stave = new Stave(sx, 14, sw);
  stave.addClef('treble');
  stave.setContext(context).draw();

  // Redondas (whole notes): sin plica -> evita la regla de direccion de plicas.
  const notes = def.keys.map(function (k) {
    return new StaveNote({ keys: [k], duration: 'w', clef: 'treble' });
  });
  // Alteraciones automaticas con la regla de compas: una alteracion se arrastra
  // hasta el final del compas en su linea/espacio; al volver a natural hay que
  // escribir becuadro. active[letra+octava] = alteracion vigente ('n','b','#'...).
  const active = {};
  notes.forEach(function (sn, i) {
    const parts = def.keys[i].split('/');     // 'eb/5' -> ['eb','5']
    const letter = parts[0][0];
    let acc = parts[0].slice(1) || 'n';        // '', 'b', '#', 'bb', '##' -> 'n'/...
    const pos = letter + parts[1];
    const cur = active[pos] || 'n';
    if (acc !== cur) {
      sn.addModifier(new Accidental(acc), 0);  // 'n' dibuja el becuadro
      active[pos] = acc;
    }
  });

  const voice = new Voice({ num_beats: notes.length * 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], sw - 70);
  voice.draw(context, stave);
}
`;

async function main() {
  // Pentagramas por tonalidad calculados por tools/scale_keys.py
  let extra = [];
  const jsonPath = path.join(__dirname, 'tools/scale_keys.json');
  if (fs.existsSync(jsonPath)) extra = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const ALL = SCALES.concat(extra);

  const browser = await chromium.launch();
  for (const def of ALL) {
    def.vw = 70 + def.keys.length * 62;
    def.vh = 120;
    const ctx = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.setViewportSize({ width: def.vw, height: def.vh });
    await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0;background:white;"><div id="vf"></div></body></html>');
    await page.addScriptTag({ path: VEXFLOW_PATH });
    await page.addScriptTag({ content: RENDER_FN });
    await page.evaluate((d) => renderScale(d), def);
    await page.waitForTimeout(150);
    const buf = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(OUTPUT_DIR, def.file + '.png'), buf);
    console.log('  ok ' + def.file + '.png  (' + def.vw + 'x' + def.vh + ' @2x)');
    await ctx.close();
  }
  await browser.close();
  console.log('Done: ' + SCALES.length + ' imagenes.');
}
main().catch((e) => { console.error(e); process.exit(1); });
