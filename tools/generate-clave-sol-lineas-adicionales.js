/**
 * Genera el diagrama de LINEAS ADICIONALES en clave de Sol.
 *   node tools/generate-clave-sol-lineas-adicionales.js
 * Salida: assets/img/claves/lineas-adicionales-clave-sol.png (+ .webp aparte con PIL)
 *
 * Reglas de notacion del sitio:
 *  - Redondas ('w'): sin plica, asi no hay que decidir direccion.
 *  - Etiquetas en Arial 16px #1a1a1a (alto contraste), NO dorado pequeno.
 */
const { chromium } = require('playwright');
const path = require('path');

// Notas con lineas adicionales: 3 por debajo y 3 por encima del pentagrama.
const NOTAS = [
  { key: 'a/3', nombre: 'La₃' },
  { key: 'b/3', nombre: 'Si₃' },
  { key: 'c/4', nombre: 'Do₄' },
  { key: 'g/5', nombre: 'Sol₅' },
  { key: 'a/5', nombre: 'La₅' },
  { key: 'b/5', nombre: 'Si₅' },
  { key: 'c/6', nombre: 'Do₆' },
];

const HTML = `<!doctype html><html><head><meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js"></script>
<style>
  body { margin:0; background:#fff; font-family:Arial, sans-serif; }
  #wrap { position:relative; width:660px; padding:28px 0 42px; background:#fff; }
  .lbl { position:absolute; font:bold 16px Arial, sans-serif; color:#1a1a1a;
         transform:translateX(-50%); white-space:nowrap; }
</style></head><body><div id="wrap"><div id="out"></div></div>
<script>
window.render = function (notas) {
  const VF = Vex.Flow;
  const r = new VF.Renderer(document.getElementById('out'), VF.Renderer.Backends.SVG);
  r.resize(660, 220);
  const ctx = r.getContext();
  const stave = new VF.Stave(10, 40, 630);
  stave.addClef('treble').setContext(ctx).draw();

  const notes = notas.map(n => new VF.StaveNote({ keys: [n.key], duration: 'w' }));
  const voice = new VF.Voice({ num_beats: notas.length, beat_value: 1 });
  voice.addTickables(notes);
  new VF.Formatter().joinVoices([voice]).format([voice], 540);
  voice.draw(ctx, stave);

  // Etiquetas HTML por debajo, alineadas al centro real de cada cabeza de nota.
  const wrap = document.getElementById('wrap');
  notes.forEach((nota, i) => {
    const d = document.createElement('div');
    d.className = 'lbl';
    d.textContent = notas[i].nombre;
    d.style.left = (nota.getAbsoluteX() + 6) + 'px';
    d.style.top = '196px';
    wrap.appendChild(d);
  });
  return true;
};
</script></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setContent(HTML);
  await page.waitForFunction(() => typeof window.Vex !== 'undefined');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(notas => window.render(notas), NOTAS);
  const salida = path.join(__dirname, '..', 'assets', 'img', 'claves',
                           'lineas-adicionales-clave-sol.png');
  await page.locator('#wrap').screenshot({ path: salida });
  await browser.close();
  console.log('OK ->', salida);
})();
