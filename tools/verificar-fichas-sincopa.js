'use strict';
/* Verificador independiente de la ficha de síncopa: regenera los mismos
   17 fragmentos (misma semilla que generate-fichas-sincopa.js) y
   comprueba, para cada uno, que "correctas" es coherente con la regla de
   la síncopa: si hay ligadura, es síncopa SOLO cuando el primer extremo
   ataca en una posición más débil que el segundo (según la tabla de
   fuerza métrica del compás real del fragmento — 2/4, 3/4 o 4/4, cada
   uno con su propia tabla); si no, tiene que ser tipo "ninguna" con
   correctas=[]. */
const path = require('path');
const { chromium } = require('playwright');
const { SEMILLA, N_FRAGMENTOS } = require('./generate-fichas-sincopa.js');

const ROOT = path.join(__dirname, '..');
const VF4_URL = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';
const ENGINE = path.join(ROOT, 'assets/js/sincopa-engine.js');

// duración -> tamaño en corcheas (con puntillo = *1.5)
function corcheas(d) {
  if (d.slice(-1) === 'd') return corcheas(d.slice(0, -1)) * 1.5;
  return { q: 2, h: 4, w: 8, '8': 1, '16': 0.5, '8r': 1, '16r': 0.5 }[d];
}

// fuerza relativa de la posición de la nota idx, según la tabla de fuerzas
// del compás (0 = parte, no es un tiempo entero).
function fuerzaTiempo(notas, idx, fuerzas) {
  var pos = 0;
  var medida = notas[idx].measure;
  for (var i = 0; i < idx; i++) {
    if (notas[i].measure !== medida) continue;
    pos += corcheas(notas[i].duration);
  }
  var tiempo = Math.floor(pos / 2); // negra = 1 tiempo = 2 corcheas
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
    for (let i = 0; i < N_FRAGMENTOS; i++) frags.push(window.tmSincopaGenerar(rng));
    return { fragmentos: frags, compases: window.tmSincopaCompases };
  }, { SEMILLA, N_FRAGMENTOS });

  const fuerzasDe = (txt) => compases.find(c => c.txt === txt).fuerzas;

  let errores = 0;
  fragmentos.forEach(function (f, i) {
    const n = i + 1;
    const fuerzas = fuerzasDe(f.compasTxt);
    if (!f.ligaduras || f.ligaduras.length === 0) {
      if (f.tipo !== 'ninguna' || f.correctas.length !== 0) {
        console.log(`#${n} ERROR (${f.compasTxt}): sin ligaduras pero tipo=${f.tipo} correctas=${JSON.stringify(f.correctas)}`);
        errores++;
      } else console.log(`#${n} OK  ninguna (${f.compasTxt}, sin ligadura)`);
      return;
    }
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
    if (!malFragmento) console.log(`#${n} OK  ${f.tipo} (${f.compasTxt})  ligaduras=${JSON.stringify(f.ligaduras)} correctas=${JSON.stringify(f.correctas)}`);
  });

  console.log(`\n${errores ? errores + ' ERROR(ES)' : 'Sin errores'} de ${fragmentos.length} fragmentos comprobados.`);
  await browser.close();
  process.exit(errores ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
