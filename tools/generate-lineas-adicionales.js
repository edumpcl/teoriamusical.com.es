/**
 * Diagramas de LINEAS ADICIONALES por clave.
 *   node tools/generate-lineas-adicionales.js sol
 *   node tools/generate-lineas-adicionales.js fa
 *   node tools/generate-lineas-adicionales.js do
 *   node tools/generate-lineas-adicionales.js            (las tres)
 * Salida: assets/img/claves/lineas-adicionales-clave-<x>.png (+ .webp con PIL)
 *
 * Reglas de notacion del sitio:
 *  - Redondas ('w'): sin plica, asi no hay que decidir direccion.
 *  - Etiquetas en Arial 16px #1a1a1a (alto contraste), NO dorado pequeno.
 *
 * Se eligen notas que enseñen las dos cosas que confunden: cual es la primera
 * que NECESITA linea adicional, y donde cae el Do central en cada clave.
 */
const { chromium } = require('playwright');
const path = require('path');

const CLAVES = {
  sol: {
    vex: 'treble', archivo: 'lineas-adicionales-clave-sol',
    notas: [
      { key: 'a/3', nombre: 'La₃' }, { key: 'b/3', nombre: 'Si₃' },
      { key: 'c/4', nombre: 'Do₄' }, { key: 'g/5', nombre: 'Sol₅' },
      { key: 'a/5', nombre: 'La₅' }, { key: 'b/5', nombre: 'Si₅' },
      { key: 'c/6', nombre: 'Do₆' },
    ],
  },
  fa: {
    vex: 'bass', archivo: 'lineas-adicionales-clave-fa',
    notas: [
      { key: 'c/2', nombre: 'Do₂' }, { key: 'd/2', nombre: 'Re₂' },
      { key: 'e/2', nombre: 'Mi₂' }, { key: 'f/2', nombre: 'Fa₂' },
      { key: 'b/3', nombre: 'Si₃' }, { key: 'c/4', nombre: 'Do₄' },
      { key: 'd/4', nombre: 'Re₄' }, { key: 'e/4', nombre: 'Mi₄' },
    ],
  },
  do: {
    vex: 'alto', archivo: 'lineas-adicionales-clave-do',
    notas: [
      { key: 'd/3', nombre: 'Re₃' }, { key: 'e/3', nombre: 'Mi₃' },
      { key: 'f/3', nombre: 'Fa₃' }, { key: 'g/4', nombre: 'Sol₄' },
      { key: 'a/4', nombre: 'La₄' }, { key: 'b/4', nombre: 'Si₄' },
      { key: 'c/5', nombre: 'Do₅' },
    ],
  },
};

const HTML = `<!doctype html><html><head><meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js"></script>
<style>
  body { margin:0; background:#fff; font-family:Arial, sans-serif; }
  #wrap { position:relative; width:700px; padding:28px 0 42px; background:#fff; }
  .lbl { position:absolute; font:bold 16px Arial, sans-serif; color:#1a1a1a;
         transform:translateX(-50%); white-space:nowrap; }
</style></head><body><div id="wrap"><div id="out"></div></div>
<script>
window.render = function (notas, clave) {
  const VF = Vex.Flow;
  document.getElementById('out').innerHTML = '';
  [...document.querySelectorAll('.lbl')].forEach(e => e.remove());
  const r = new VF.Renderer(document.getElementById('out'), VF.Renderer.Backends.SVG);
  r.resize(700, 230);
  const ctx = r.getContext();
  const stave = new VF.Stave(10, 45, 670);
  stave.addClef(clave).setContext(ctx).draw();

  const notes = notas.map(n => new VF.StaveNote({ clef: clave, keys: [n.key], duration: 'w' }));
  const voice = new VF.Voice({ num_beats: notas.length, beat_value: 1 });
  voice.addTickables(notes);
  new VF.Formatter().joinVoices([voice]).format([voice], 570);
  voice.draw(ctx, stave);

  const wrap = document.getElementById('wrap');
  notes.forEach((nota, i) => {
    const d = document.createElement('div');
    d.className = 'lbl';
    d.textContent = notas[i].nombre;
    d.style.left = (nota.getAbsoluteX() + 6) + 'px';
    d.style.top = '205px';
    wrap.appendChild(d);
  });
  return true;
};
</script></body></html>`;

(async () => {
  const cuales = process.argv.slice(2).filter(a => CLAVES[a]);
  const lista = cuales.length ? cuales : Object.keys(CLAVES);

  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setContent(HTML);
  await page.waitForFunction(() => typeof window.Vex !== 'undefined');
  await page.evaluate(() => document.fonts.ready);

  for (const c of lista) {
    const cfg = CLAVES[c];
    await page.evaluate(([n, v]) => window.render(n, v), [cfg.notas, cfg.vex]);
    const salida = path.join(__dirname, '..', 'assets', 'img', 'claves', cfg.archivo + '.png');
    await page.locator('#wrap').screenshot({ path: salida });
    console.log('OK ->', cfg.archivo + '.png');
  }
  await browser.close();
})();
