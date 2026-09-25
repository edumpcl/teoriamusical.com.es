'use strict';
/* Verificador independiente de la ficha «síncopa — nivel difícil»: regenera
   los mismos 10 fragmentos (misma semilla que generate-fichas-sincopa-
   dificil.js) y comprueba, para cada ligadura de cada fragmento, que está
   clasificada correctamente según la fuerza métrica real del compás. */
const path = require('path');
const { chromium } = require('playwright');
const { SEMILLA, N_FRAGMENTOS } = require('./generate-fichas-sincopa-dificil.js');

const ROOT = path.join(__dirname, '..');
const VF4_URL = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';
const ENGINE = path.join(ROOT, 'assets/js/sincopa-engine.js');

function corcheas(d) {
  if (d.slice(-1) === 'd') return corcheas(d.slice(0, -1)) * 1.5;
  return { q: 2, h: 4, w: 8, '8': 1, '16': 0.5, '8r': 1, '16r': 0.5 }[d];
}
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
    const rng = window.tmSincopaMulberry32(SEMILLA);
    const frags = [];
    for (let i = 0; i < N_FRAGMENTOS; i++) frags.push(window.tmSincopaGenerarDificil(rng));
    return { fragmentos: frags, compases: window.tmSincopaCompases };
  }, { SEMILLA, N_FRAGMENTOS });
  const fuerzasDe = (txt) => compases.find(c => c.txt === txt).fuerzas;

  let errores = 0;
  fragmentos.forEach(function (f, i) {
    const n = i + 1;
    const fuerzas = fuerzasDe(f.compasTxt);
    let malFragmento = false;
    f.ligaduras.forEach(function (par) {
      const fA = fuerzaTiempo(f.notas, par[0], fuerzas);
      const fB = fuerzaTiempo(f.notas, par[1], fuerzas);
      const esSincopaReal = fA < fB;
      const marcada = f.correctas.some(c => c[0] === par[0] && c[1] === par[1]);
      if (esSincopaReal !== marcada) {
        console.log(`#${n} ERROR (${f.compasTxt}): ligadura ${JSON.stringify(par)} fuerza ${fA}->${fB} esSincopaReal=${esSincopaReal} marcada=${marcada}`);
        errores++; malFragmento = true;
      }
    });
    // todo par en correctas tiene que estar en ligaduras
    f.correctas.forEach(function (par) {
      const enLigaduras = f.ligaduras.some(l => l[0] === par[0] && l[1] === par[1]);
      if (!enLigaduras) { console.log(`#${n} ERROR: correctas ${JSON.stringify(par)} no está en ligaduras`); errores++; malFragmento = true; }
    });
    if (!malFragmento) console.log(`#${n} OK  (${f.compasTxt})  ${f.correctas.length} síncopa(s)  ligaduras=${JSON.stringify(f.ligaduras)}`);
  });

  console.log(`\n${errores ? errores + ' ERROR(ES)' : 'Sin errores'} de ${fragmentos.length} fragmentos comprobados.`);
  await browser.close();
  process.exit(errores ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
