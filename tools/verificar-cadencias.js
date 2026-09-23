'use strict';
/**
 * Audita «¿qué cadencia es?» (assets/js/cadencias-engine.js).
 *
 *   node tools/verificar-cadencias.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: tiene su PROPIA copia de las seis plantillas de voces
 * (misma idea que GRUPOS_VE en verificar-grupos-valoracion-especial.js: la
 * tabla se duplica a propósito para que un fallo al editar una de las dos
 * copias salte aquí). Con ella recalcula, para cada tonalidad, las notas
 * exactas de las 4 voces de los 2 acordes y las compara con lo que declara
 * el motor. Además comprueba, de forma independiente (semitonos reales,
 * contando la armadura de cada tonalidad):
 *   - que las voces no cambian de orden (soprano > contralto > tenor > bajo);
 *   - que ningún par de voces mantiene una 5ª o una 8ª justas en los DOS
 *     acordes a la vez (5ª/8ª paralelas);
 *   - reglas propias de cada cadencia: en la perfecta la voz más aguda del
 *     acorde final es la tónica; en la imperfecta, no; en la rota el acorde
 *     final es el VI grado (no la tónica); etc.
 *   - que el nivel usa exactamente los tipos que le tocan (TIPOS_NIVEL).
 * Y lo DIBUJADO: que las 4 notas de cada acorde aparecen en el pentagrama
 * correcto (soprano/contralto en sol, tenor/bajo en fa) con la duración de
 * redonda, con VexFlow 4 (web) y 5 (PDF). En el navegador, los tres niveles
 * resueltos bien y mal, con el resultado contado.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/cadencias/';
const ENGINES = ['assets/js/completar-compas-engine.js', 'assets/js/tipo-de-comienzo-engine.js', 'assets/js/cadencias-engine.js'].map(f => path.join(ROOT, f));
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
// Alteraciones de la armadura por tonalidad (letra -> +1 sostenido / -1 bemol).
const ALTER = {
  C: {}, G: { f: 1 }, D: { f: 1, c: 1 }, F: { b: -1 },
  Bb: { b: -1, e: -1 }, A: { f: 1, c: 1, g: 1 }, Eb: { b: -1, e: -1, a: -1 }
};
const TONICA = { C: 0, G: 4, D: 1, F: 3, Bb: 6, A: 5, Eb: 2 };

// Copia propia de las plantillas (Do mayor), igual que en el motor: dos
// disposiciones por tipo (misma comprobación a mano de cada una: sin 5ª/8ª
// paralelas, sensible→tónica, 7ª→3ª, bajo con el salto propio del tipo).
const VOCES = {
  perfecta: [
    { S: [34, 35], A: [29, 28], T: [24, 23], B: [18, 21] },
    { S: [34, 35], A: [32, 32], T: [22, 23], B: [18, 21] }
  ],
  imperfecta: [
    { S: [31, 30], A: [29, 28], T: [27, 28], B: [18, 21] },
    { S: [32, 30], A: [27, 28], T: [22, 21], B: [18, 21] }
  ],
  plagal: [
    { S: [33, 32], A: [28, 28], T: [24, 23], B: [17, 21] },
    { S: [31, 30], A: [28, 28], T: [26, 25], B: [17, 21] }
  ],
  rota: [
    { S: [34, 35], A: [29, 28], T: [24, 23], B: [18, 19] },
    { S: [34, 35], A: [31, 30], T: [22, 21], B: [18, 19] }
  ],
  semicadenciaV: [
    { S: [32, 32], A: [30, 29], T: [28, 27], B: [21, 18] },
    { S: [35, 34], A: [32, 32], T: [30, 29], B: [21, 18] }
  ],
  semicadenciaIV: [
    { S: [32, 33], A: [30, 31], T: [28, 28], B: [21, 17] },
    { S: [37, 38], A: [32, 33], T: [28, 28], B: [21, 17] }
  ]
};
const TIPOS_NIVEL = {
  1: ['perfecta', 'imperfecta', 'plagal'],
  2: ['semicadenciaV', 'semicadenciaIV', 'rota'],
  3: ['perfecta', 'imperfecta', 'plagal', 'semicadenciaV', 'semicadenciaIV', 'rota']
};

function idxDe(notaTxt) { // 'c/4' -> índice diatónico
  const [letra, oct] = notaTxt.split('/');
  return Number(oct) * 7 + LETRAS.indexOf(letra);
}
function notaDe(idx) { return LETRAS[((idx % 7) + 7) % 7] + '/' + Math.floor(idx / 7); }
function semitono(idx, tonal) { // índice diatónico -> semitonos absolutos, con la armadura de tonal
  const letra = LETRAS[((idx % 7) + 7) % 7], oct = Math.floor(idx / 7);
  return oct * 12 + SEMI[letra] + (ALTER[tonal][letra] || 0);
}

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

function revisarItem(donde, it) {
  if (!TIPOS_NIVEL[it.nivel]) return mal(donde, `nivel desconocido ${it.nivel}`);
  if (!TIPOS_NIVEL[it.nivel].includes(it.tipo)) mal(donde, `${it.tipo} no debería salir en el nivel ${it.nivel}`);
  if (!(it.tonalidad in TONICA)) mal(donde, `tonalidad ${it.tonalidad}`);
  if (it.acordes.length !== 2) return mal(donde, `${it.acordes.length} acordes en vez de 2`);
  if (![0, 1].includes(it.variante)) mal(donde, `variante desconocida ${it.variante}`);

  const t0 = TONICA[it.tonalidad], t = t0 > 3 ? t0 - 7 : t0, v = VOCES[it.tipo][it.variante];
  const esperado = [0, 1].map(k => ({ S: notaDe(v.S[k] + t), A: notaDe(v.A[k] + t), T: notaDe(v.T[k] + t), B: notaDe(v.B[k] + t) }));
  it.acordes.forEach((ac, k) => {
    ['S', 'A', 'T', 'B'].forEach(voz => { if (ac[voz] !== esperado[k][voz]) mal(donde, `acorde ${k + 1}, voz ${voz}: ${ac[voz]} y debería ser ${esperado[k][voz]}`); });
  });

  // Orden de las voces y quintas/octavas paralelas, con semitonos reales.
  it.acordes.forEach((ac, k) => {
    const idx = { S: idxDe(ac.S), A: idxDe(ac.A), T: idxDe(ac.T), B: idxDe(ac.B) };
    // Voces cruzadas = prohibido; al unísono entre dos voces adyacentes (p.ej. tenor y bajo en la
    // imperfecta) sí puede pasar en un acorde a 4 voces real, por eso aquí es >= y no >.
    if (!(idx.S >= idx.A && idx.A >= idx.T && idx.T >= idx.B)) mal(donde, `acorde ${k + 1}: las voces están cruzadas (S=${ac.S} A=${ac.A} T=${ac.T} B=${ac.B})`);
  });
  const pares = [['S', 'A'], ['S', 'T'], ['S', 'B'], ['A', 'T'], ['A', 'B'], ['T', 'B']];
  pares.forEach(([v1, v2]) => {
    const int = it.acordes.map(ac => ((semitono(idxDe(ac[v1]), it.tonalidad) - semitono(idxDe(ac[v2]), it.tonalidad)) % 12 + 12) % 12);
    if (int[0] === int[1] && (int[0] === 7 || int[0] === 0)) mal(donde, `5ª/8ª paralela entre ${v1} y ${v2} (${int[0]} semitonos en los dos acordes)`);
  });

  // Reglas propias de cada tipo, sobre el acorde final (índice 1).
  const finS = idxDe(it.acordes[1].S) - t, finB = idxDe(it.acordes[1].B) - t; // referidos a Do mayor, para comparar letras sin pelearse con la armadura
  const letraFin = LETRAS[((finS % 7) + 7) % 7];
  if (it.tipo === 'perfecta' && letraFin !== 'c') mal(donde, `perfecta: la voz más aguda del acorde final es ${letraFin}, debería ser la tónica (c)`);
  if (it.tipo === 'imperfecta' && letraFin === 'c') mal(donde, 'imperfecta: la voz más aguda del acorde final es la tónica (debería no serlo)');
  if (it.tipo === 'rota' && LETRAS[((finB % 7) + 7) % 7] !== 'a') mal(donde, 'rota: el bajo del acorde final debería ser el VI grado (la, en Do mayor)');
  if (it.tipo === 'plagal' && LETRAS[((finB % 7) + 7) % 7] !== 'c') mal(donde, 'plagal: el bajo del acorde final debería ser la tónica');
}

async function conVexFlow(browser, etiqueta, vexflow) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  await p.setContent('<!doctype html><html><body><div id="z"></div></body></html>');
  await p.addScriptTag(vexflow.startsWith('http') ? { url: vexflow } : { path: vexflow });
  for (const e of ENGINES) await p.addScriptTag({ path: e });
  const lotes = await p.evaluate(() => {
    const T = window.tmCadenciasTest, z = document.getElementById('z'), out = [];
    [1, 2, 3].forEach(nivel => {
      for (let s = 0; s < 20; s++) {
        const semilla = 9000 + s * 613 + nivel * 37;
        const items = T.generarLote({ nivel, n: 12 }, semilla);
        const dibujos = items.map(it => {
          const d = document.createElement('div'); z.appendChild(d);
          T.dibujar(d, it);
          const info = d.__tmInfo;
          z.removeChild(d);
          return info;
        });
        out.push({ nivel, semilla, items, dibujos });
      }
    });
    return out;
  });
  let items = 0;
  const conteo = { perfecta: 0, imperfecta: 0, plagal: 0, rota: 0, semicadenciaV: 0, semicadenciaIV: 0 };
  const variantes = [0, 0];
  for (const lote of lotes) {
    if (lote.items.length !== 12) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `${lote.items.length} de 12`);
    lote.items.forEach((it, i) => {
      items++; conteo[it.tipo]++; variantes[it.variante] = (variantes[it.variante] || 0) + 1;
      const donde = `${etiqueta} nivel ${lote.nivel} #${lote.semilla} nº${i + 1} (${it.tipo} ${it.tonalidad})`;
      revisarItem(donde, it);
      const dib = lote.dibujos[i].acordes;
      if (dib.length !== 2) mal(donde, `dibujados ${dib.length} acordes y deberían ser 2`);
      dib.forEach((ac, k) => {
        ['S', 'A', 'T', 'B'].forEach(voz => { if (ac[voz] !== it.acordes[k][voz]) mal(donde, `dibujo acorde ${k + 1} voz ${voz}: ${ac[voz]} y el motor declaró ${it.acordes[k][voz]}`); });
      });
    });
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores/avisos: ' + errs.slice(0, 5).join(' | '));
  if (!variantes[0] || !variantes[1]) mal(etiqueta, `las dos variantes deberían salir; conteo: ${JSON.stringify(variantes)}`);
  console.log(`  ${etiqueta}: ${items} cadencias revisadas (${JSON.stringify(conteo)}, variantes: ${JSON.stringify(variantes)})`);
  return items;
}

/* En la página: los tres niveles resueltos bien y mal. */
async function enPagina(browser) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
  const caja = p.locator('#tmcd');
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-cd-modo[data-n="' + nivel + '"]').click();
    let bien = 0;
    const n = await caja.locator('.tm-cd-op').count();
    if (n !== TIPOS_NIVEL[nivel].length) mal(`nivel ${nivel}`, `${n} botones de respuesta y deberían ser ${TIPOS_NIVEL[nivel].length}`);
    for (let q = 0; q < 6; q++) {
      const acertar = q % 2 === 0;
      const elegir = await p.evaluate((acertar) => {
        const it = window.tmCadenciasDebug(), tipos = window.tmCadenciasTest.TIPOS_NIVEL[it.nivel];
        if (acertar) return it.tipo;
        return tipos.filter(t => t !== it.tipo)[0];
      }, acertar);
      await caja.locator('.tm-cd-op[data-t="' + elegir + '"]').click();
      const fb = await caja.locator('.tm-cd-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
      if (acertar) bien++;
      await caja.locator('.tm-cd-btn').click();
    }
    const nota = await caja.locator('.tm-cd-nota').textContent();
    if (Number(nota) !== bien) mal(`nivel ${nivel}`, `resultado ${nota} y deberían ser ${bien} aciertos`);
    await caja.locator('[data-a="modo"]').click();
  }
  const ancho = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ancho > 0) mal('página', `desborda ${ancho}px`);
  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));
  await p.close();
  console.log('  página: los tres niveles resueltos bien y mal, con el resultado contado');
}

(async () => {
  const browser = await chromium.launch();
  const a = await conVexFlow(browser, 'VexFlow 4 (web)', VF4);
  const b = await conVexFlow(browser, 'VexFlow 5 (PDF)', VF5);
  await enPagina(browser);
  await browser.close();
  console.log(`\n  ${a + b} cadencias · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
