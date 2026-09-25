'use strict';
/* Verificador independiente del motor de «contratiempo»: genera muchos
   fragmentos al azar (modo normal y difícil) y, para cada nota, recalcula
   desde cero (sin usar las etiquetas del propio motor) si está a
   contratiempo: la nota anterior en el mismo compás tiene que ser un
   silencio, y la fuerza métrica de ese silencio tiene que ser mayor que
   la de la nota. Compara el resultado contra frag.correctas. */
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const VF4_URL = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';
const ENGINE = path.join(ROOT, 'assets/js/contratiempo-engine.js');
const N_NORMAL = 400;
const N_DIFICIL = 200;

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

function comprobarFragmento(f, fuerzas) {
  const errores = [];
  const esperadas = [];
  for (let i = 1; i < f.notas.length; i++) {
    if (f.notas[i].measure !== f.notas[i - 1].measure) continue;
    if (esSilencio(f.notas[i])) continue;
    if (!esSilencio(f.notas[i - 1])) continue;
    const fA = fuerzaTiempo(f.notas, i - 1, fuerzas);
    const fB = fuerzaTiempo(f.notas, i, fuerzas);
    if (fA > fB) esperadas.push(i);
  }
  const marcadas = f.correctas.map(function (c) { return c[0]; });
  esperadas.forEach(function (i) {
    if (marcadas.indexOf(i) === -1) errores.push('falta marcar índice ' + i + ' como contratiempo');
  });
  marcadas.forEach(function (i) {
    if (esperadas.indexOf(i) === -1) errores.push('índice ' + i + ' marcado como contratiempo pero no lo es');
  });
  return errores;
}

// Comprueba también que la duración total de cada compás cuadra con su
// cifra (tiempos*2 corcheas), para detectar fragmentos mal formados.
function comprobarDuraciones(f, compas) {
  const errores = [];
  const porMedida = {};
  f.notas.forEach(function (n) { porMedida[n.measure] = (porMedida[n.measure] || 0) + corcheas(n.duration); });
  Object.keys(porMedida).forEach(function (m) {
    if (porMedida[m] !== compas.tiempos * 2) errores.push('compás ' + m + ' suma ' + porMedida[m] + ' corcheas, esperado ' + (compas.tiempos * 2));
  });
  return errores;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addScriptTag({ url: VF4_URL });
  await page.addScriptTag({ path: ENGINE });

  const { normales, dificiles, compases } = await page.evaluate(({ N_NORMAL, N_DIFICIL }) => {
    const ns = [], ds = [];
    for (let i = 0; i < N_NORMAL; i++) ns.push(window.tmContratiempoGenerar(Math.random));
    for (let i = 0; i < N_DIFICIL; i++) ds.push(window.tmContratiempoGenerarDificil(Math.random));
    return { normales: ns, dificiles: ds, compases: window.tmContratiempoCompases };
  }, { N_NORMAL, N_DIFICIL });
  const fuerzasDe = (txt) => compases.find(c => c.txt === txt).fuerzas;
  const compasDe = (txt) => compases.find(c => c.txt === txt);

  let errores = 0;
  const stats = { compases: {}, ninguna: 0, una: 0, varias: 0, max: 0, tipos: {} };

  function proceso(lista, etiqueta) {
    lista.forEach(function (f, i) {
      const n = i + 1;
      const fuerzas = fuerzasDe(f.compasTxt);
      const compas = compasDe(f.compasTxt);
      const errs = comprobarFragmento(f, fuerzas).concat(comprobarDuraciones(f, compas));
      if (errs.length) {
        console.log(`[${etiqueta}] #${n} ERROR (${f.compasTxt}): ${errs.join('; ')}`);
        errores += errs.length;
      }
      stats.compases[f.compasTxt] = (stats.compases[f.compasTxt] || 0) + 1;
      stats.tipos[f.tipo] = (stats.tipos[f.tipo] || 0) + 1;
      if (f.correctas.length === 0) stats.ninguna++;
      else if (f.correctas.length === 1) stats.una++;
      else stats.varias++;
      stats.max = Math.max(stats.max, f.correctas.length);
    });
  }
  proceso(normales, 'normal');
  proceso(dificiles, 'dificil');

  console.log('\nDistribución de compases:', JSON.stringify(stats.compases));
  console.log('Distribución de tipos:', JSON.stringify(stats.tipos));
  console.log(`Fragmentos: ${stats.ninguna} sin contratiempo, ${stats.una} con uno, ${stats.varias} con varios (máx ${stats.max}).`);
  console.log(`\n${errores ? errores + ' ERROR(ES)' : 'Sin errores'} de ${normales.length + dificiles.length} fragmentos comprobados.`);
  await browser.close();
  process.exit(errores ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
