'use strict';
/* Verificador independiente del nivel difícil (2 compases, 0 a varias
   síncopas, compás y figuras variables): genera 300 fragmentos al azar y
   comprueba, sin fiarse del motor, que cada ligadura está clasificada
   correctamente según la fuerza métrica real del compás del fragmento. */
const { chromium } = require('playwright');
const VF4_URL = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';
const path = require('path');
const ENGINE = path.join(__dirname, '..', 'assets/js/sincopa-engine.js');

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

  const N = 300;
  const { resultados, compases } = await page.evaluate((N) => {
    var out = [];
    for (var i = 0; i < N; i++) out.push(window.tmSincopaGenerarDificil(Math.random));
    return { resultados: out, compases: window.tmSincopaCompases };
  }, N);
  const fuerzasDe = (txt) => compases.find(c => c.txt === txt).fuerzas;

  let errores = 0;
  let totalSincopas = 0, conCero = 0, conVarias = 0, maxVistas = 0, con16 = 0, conPuntillo = 0;
  const distribMedidas = {}, distribCompas = {};

  resultados.forEach(function (f, fi) {
    var numMedidas = 1 + Math.max.apply(null, f.notas.map(function (n) { return n.measure; }));
    distribMedidas[numMedidas] = (distribMedidas[numMedidas] || 0) + 1;
    distribCompas[f.compasTxt] = (distribCompas[f.compasTxt] || 0) + 1;
    if (f.notas.some(function (n) { return n.duration.indexOf('16') === 0; })) con16++;
    if (f.notas.some(function (n) { return n.duration.slice(-1) === 'd'; })) conPuntillo++;

    var fuerzas = fuerzasDe(f.compasTxt);

    // 1) cada ligadura conecta notas de igual altura (VexFlow lo exige)
    f.ligaduras.forEach(function (par) {
      var k1 = f.notas[par[0]].keys[0], k2 = f.notas[par[1]].keys[0];
      if (k1 !== k2) { console.log(`#${fi} ERROR (${f.compasTxt}): ligadura ${JSON.stringify(par)} une alturas distintas (${k1} vs ${k2})`); errores++; }
    });

    // 1b) ninguna ligadura conecta con un silencio (bug real: se vio en
    //     producción una ligadura "de compás" cayendo sobre el silencio
    //     inicial del distractor "contratiempo" cuando ese molde empezaba
    //     justo en el primer tiempo del compás siguiente)
    f.ligaduras.forEach(function (par) {
      if (f.notas[par[0]].duration.slice(-1) === 'r' || f.notas[par[1]].duration.slice(-1) === 'r') {
        console.log(`#${fi} ERROR (${f.compasTxt}): ligadura ${JSON.stringify(par)} conecta con un silencio`); errores++;
      }
    });

    // 2) cada ligadura en "correctas" es realmente síncopa, y viceversa
    var correctasSet = f.correctas.map(function (p) { return p[0] + ',' + p[1]; });
    f.ligaduras.forEach(function (par) {
      var fA = fuerzaTiempo(f.notas, par[0], fuerzas);
      var fB = fuerzaTiempo(f.notas, par[1], fuerzas);
      var esSincopaReal = fA < fB;
      var marcada = correctasSet.indexOf(par[0] + ',' + par[1]) !== -1;
      if (esSincopaReal !== marcada) {
        console.log(`#${fi} ERROR (${f.compasTxt}): ligadura ${JSON.stringify(par)} fuerza ${fA}->${fB} esSincopaReal=${esSincopaReal} pero marcada=${marcada}`);
        errores++;
      }
    });

    // 3) todo par en "correctas" tiene que estar también en "ligaduras"
    f.correctas.forEach(function (par) {
      var enLigaduras = f.ligaduras.some(function (l) { return l[0] === par[0] && l[1] === par[1]; });
      if (!enLigaduras) { console.log(`#${fi} ERROR (${f.compasTxt}): correctas ${JSON.stringify(par)} no está en ligaduras`); errores++; }
    });

    // 4) índices dentro de rango (ligaduras/correctas: pares; beams: grupos de N)
    var n = f.notas.length;
    f.ligaduras.concat(f.correctas).forEach(function (par) {
      if (par[0] < 0 || par[0] >= n || par[1] < 0 || par[1] >= n) {
        console.log(`#${fi} ERROR (${f.compasTxt}): índice fuera de rango ${JSON.stringify(par)} (n=${n})`); errores++;
      }
    });
    (f.beams || []).forEach(function (grupo) {
      grupo.forEach(function (idx) {
        if (idx < 0 || idx >= n) { console.log(`#${fi} ERROR (${f.compasTxt}): índice de beam fuera de rango ${idx} (n=${n})`); errores++; }
      });
    });

    totalSincopas += f.correctas.length;
    if (f.correctas.length === 0) conCero++;
    if (f.correctas.length >= 2) conVarias++;
    maxVistas = Math.max(maxVistas, f.correctas.length);
  });

  console.log(`\nDistribución de compases del fragmento (nº de compases musicales): ${JSON.stringify(distribMedidas)}`);
  console.log(`Distribución de cifra de compás: ${JSON.stringify(distribCompas)}`);
  console.log(`Fragmentos con semicorcheas: ${con16}/${N}`);
  console.log(`Fragmentos con ritmo de puntillo: ${conPuntillo}/${N}`);
  console.log(`Fragmentos con 0 síncopas: ${conCero}/${N}`);
  console.log(`Fragmentos con 2+ síncopas: ${conVarias}/${N}`);
  console.log(`Máximo de síncopas visto en un fragmento: ${maxVistas}`);
  console.log(`Media de síncopas por fragmento: ${(totalSincopas / N).toFixed(2)}`);
  console.log(`\n${errores ? errores + ' ERROR(ES)' : 'Sin errores'} de ${N} fragmentos difíciles comprobados.`);
  await browser.close();
  process.exit(errores ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
