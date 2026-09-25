'use strict';
/* Verificador independiente de la ficha «contratiempo — nivel difícil»:
   regenera los mismos 10 fragmentos (misma semilla que generate-fichas-
   contratiempo-dificil.js) y comprueba cada uno contra la fuerza métrica
   real del compás. */
const path = require('path');
const { chromium } = require('playwright');
const { SEMILLA, N_FRAGMENTOS } = require('./generate-fichas-contratiempo-dificil.js');

const ROOT = path.join(__dirname, '..');
const VF4_URL = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';
const ENGINE = path.join(ROOT, 'assets/js/contratiempo-engine.js');

function corcheas(d) {
  if (d.slice(-1) === 'd') return corcheas(d.slice(0, -1)) * 1.5;
  return { q: 2, h: 4, w: 8, '8': 1, '16': 0.5, qr: 2, hr: 4, '8r': 1, '16r': 0.5 }[d];
}
function esSilencio(n) { return n.duration.slice(-1) === 'r'; }
function fuerzaTiempo(notas, idx, fuerzas) {
  var pos = 0;
  var medida = notas[idx].measure;
  for (var i = 0; i < idx; i++) { if (notas[i].measure === medida) pos += corcheas(notas[i].duration); }
  var tiempo = Math.floor(pos / 2);
  var esParte = (pos % 2) !== 0;
  if (esParte) return 0;
  return fuerzas[tiempo];
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addScriptTag({ url: VF4_URL });
  await page.addScriptTag({ path: ENGINE });

  const { fragmentos, compases } = await page.evaluate(({ SEMILLA, N_FRAGMENTOS }) => {
    const rng = window.tmContratiempoMulberry32(SEMILLA);
    const frags = [];
    for (let i = 0; i < N_FRAGMENTOS; i++) frags.push(window.tmContratiempoGenerarDificil(rng));
    return { fragmentos: frags, compases: window.tmContratiempoCompases };
  }, { SEMILLA, N_FRAGMENTOS });
  const fuerzasDe = (txt) => compases.find(c => c.txt === txt).fuerzas;

  let errores = 0;
  fragmentos.forEach(function (f, i) {
    const n = i + 1;
    const fuerzas = fuerzasDe(f.compasTxt);
    const esperadas = [];
    for (let j = 1; j < f.notas.length; j++) {
      if (f.notas[j].measure !== f.notas[j - 1].measure) continue;
      if (esSilencio(f.notas[j]) || !esSilencio(f.notas[j - 1])) continue;
      if (fuerzaTiempo(f.notas, j - 1, fuerzas) > fuerzaTiempo(f.notas, j, fuerzas)) esperadas.push(j);
    }
    const marcadas = f.correctas.map(c => c[0]);
    const errs = [];
    esperadas.forEach(j => { if (marcadas.indexOf(j) === -1) errs.push('falta marcar ' + j); });
    marcadas.forEach(j => { if (esperadas.indexOf(j) === -1) errs.push('marcado de más ' + j); });
    if (errs.length) { console.log(`#${n} ERROR (${f.compasTxt}): ${errs.join('; ')}`); errores += errs.length; }
    else console.log(`#${n} OK  (${f.compasTxt})  ${f.correctas.length} contratiempo(s)`);
  });

  console.log(`\n${errores ? errores + ' ERROR(ES)' : 'Sin errores'} de ${fragmentos.length} fragmentos comprobados.`);
  await browser.close();
  process.exit(errores ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
