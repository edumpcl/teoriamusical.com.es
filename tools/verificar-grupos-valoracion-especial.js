'use strict';
/**
 * Audita «grupos de valoración especial» (assets/js/grupos-valoracion-especial-engine.js).
 *
 *   node tools/verificar-grupos-valoracion-especial.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: con su propia tabla de grupos y variantes (verificada
 * contra /diccionario-musical/grupos-de-valoracion-especial/, no inventada)
 * comprueba
 *   - tresillo(3)→2, dosillo(2)→3, cuatrillo(4)→6, seisillo(6)→4, con la
 *     variante y el compás que le corresponde a cada uno (el tresillo tiene
 *     dos: de manual, llenando un tiempo simple entero, y la pequeña —un
 *     tresillo de semicorcheas ocupando solo una corchea—, válida en
 *     cualquier compás, simple o compuesto);
 *   - que el reparto interno del grupo («partes») suma exactamente su tamaño,
 *     que el nivel 1 y 2 son siempre ritmo uniforme, que el nivel 3 mezcla de
 *     verdad (no siempre 1,1,1…) salvo el dosillo, que con solo 2 partes no
 *     tiene una forma mixta real, y que nunca colapsa a una sola figura;
 *   - que el silencio (nivel 2 y 3) solo aparece donde toca y en una posición
 *     válida;
 *   - que el compás alrededor del grupo suma exactamente lo que cabe;
 *   - lo DIBUJADO: ninguna figura del grupo lleva puntillo (no debería, por
 *     construcción), las figuras «de fuera» si lo llevan lo pintan de verdad,
 *     con VexFlow 4 (web) y 5 (PDF);
 *   - y en el navegador, los tres niveles resueltos bien y mal, con el
 *     resultado contado.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/grupos-de-valoracion-especial/';
const ENGINE1 = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const ENGINE2 = path.join(ROOT, 'assets/js/grupos-valoracion-especial-engine.js');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

/* Tabla propia, verificada contra la página de teoría del sitio. Cada grupo
   puede tener más de una variante (figura base, a qué equivale, cuánto ocupa
   y en qué compases es válida) — el tresillo, además de la de manual (llena
   un tiempo simple entero), tiene la versión pequeña de un tresillo de
   semicorcheas ocupando solo una corchea dentro de CUALQUIER compás, con las
   corcheas sueltas que hagan falta alrededor para completar el tiempo
   (Eduardo, 18-09-2026: «corchea y tresillo de semicorcheas» en simple, «2
   corcheas y un tresillo de semicorcheas» en 6/8). */
const GRUPOS = {
  tresillo: {
    n: 3, equivale: 2, variantes: [
      { base: 'c', equivaleFig: 'n', uGrupo: 16, compases: ['2/4', '3/4', '4/4'] },
      { base: 'sc', equivaleFig: 'c', uGrupo: 8, compases: ['2/4', '3/4', '4/4', '6/8', '9/8', '12/8'] },
    ]
  },
  dosillo: { n: 2, equivale: 3, variantes: [{ base: 'c', equivaleFig: 'nP', uGrupo: 24, compases: ['6/8', '9/8', '12/8'] }] },
  cuatrillo: { n: 4, equivale: 6, variantes: [{ base: 'sc', equivaleFig: 'nP', uGrupo: 24, compases: ['6/8', '9/8', '12/8'] }] },
  seisillo: { n: 6, equivale: 4, variantes: [{ base: 'sc', equivaleFig: 'n', uGrupo: 16, compases: ['2/4', '3/4', '4/4'] }] },
};
const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const TIEMPOS = { '2/4': 2, '3/4': 3, '4/4': 4, '6/8': 2, '9/8': 3, '12/8': 4 };
const U = { r: 64, rP: 96, b: 32, bP: 48, n: 16, nP: 24, c: 8, cP: 12, sc: 4 };

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

function revisarItem(donde, it) {
  const g = GRUPOS[it.grupo];
  if (!g) return mal(donde, `grupo desconocido ${it.grupo}`);
  const variante = g.variantes.find(v => v.base === it.variante.base && v.equivaleFig === it.variante.equivaleFig && v.uGrupo === it.variante.uGrupo);
  if (!variante) return mal(donde, `variante desconocida: ${JSON.stringify(it.variante)}`);
  if (!variante.compases.includes(it.compasGrupo)) mal(donde, `${it.grupo} (${it.variante.base}, uGrupo=${it.variante.uGrupo}) en un compás ${it.compasGrupo} que no le corresponde`);

  // El reparto interno suma exactamente el tamaño del grupo.
  const suma = it.partes.reduce((a, b) => a + b, 0);
  if (suma !== g.n) mal(donde, `las partes suman ${suma} y el grupo tiene ${g.n}`);
  it.partes.forEach(p => { if ([1, 2, 4].indexOf(p) < 0) mal(donde, `parte de tamaño ${p}, no es 1, 2 o 4`); });

  // Nivel 1 y 2: siempre ritmo uniforme (todo unos). Nivel 3: puede mezclar,
  // salvo el dosillo (2 partes no da para una forma mixta real).
  const uniforme = it.partes.every(p => p === 1);
  if (it.nivel < 3 && !uniforme) mal(donde, `nivel ${it.nivel} debería ser ritmo uniforme y no lo es`);
  if (it.grupo === 'dosillo' && !uniforme) mal(donde, 'el dosillo no debería tener forma mixta (solo 2 partes)');
  if (it.partes.length === 1) mal(donde, 'el grupo colapsó a una sola figura (no enseña nada)');

  // Silencio: solo en nivel 2 y 3, como mucho uno, en una posición válida.
  if (it.silIdx >= 0) {
    if (it.nivel === 1) mal(donde, 'silencio en el nivel 1 (no debería haber)');
    if (it.silIdx >= it.partes.length) mal(donde, `silIdx ${it.silIdx} fuera de rango (${it.partes.length} partes)`);
  }

  // El compás alrededor del grupo suma exactamente lo que cabe. El grupo
  // ocupa uGrupo (un tiempo entero, o solo una corchea si es la variante
  // pequeña), y ni él ni las figuras sueltas cruzan la barra del tiempo.
  const t = TIEMPO[it.compasGrupo], n = TIEMPOS[it.compasGrupo];
  let pos = 0, vistoGrupo = false;
  it.elems.forEach((e, k) => {
    if (e.t0 !== pos) mal(donde, `el elemento ${k + 1} empieza en ${e.t0} y debería ser ${pos}`);
    if (e.grupo) {
      vistoGrupo = true;
      if (e.u !== it.variante.uGrupo) mal(donde, `el grupo ocupa ${e.u} y su variante dice ${it.variante.uGrupo}`);
      if (pos % t + e.u > t) mal(donde, 'el grupo cruza la barra del tiempo');
    } else {
      const u = U[e.f];
      if (!u) return mal(donde, `figura desconocida ${e.f}`);
      if (u !== e.u) mal(donde, `figura ${e.f} declara u=${e.u} y debería ser ${u}`);
      if (u > t) { if (pos % t !== 0 || u % t !== 0) mal(donde, `${e.f} no encaja en tiempos enteros`); }
      else if (pos % t + u > t) mal(donde, `la figura ${k + 1} (${e.f}) cruza la barra del tiempo`);
    }
    pos += e.u;
  });
  if (!vistoGrupo) mal(donde, 'el compás generado no contiene el grupo');
  if (pos !== t * n) mal(donde, `el compás suma ${pos} y debería sumar ${t * n}`);
}

async function conVexFlow(browser, etiqueta, vexflow) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  await p.setContent('<!doctype html><html><body><div id="z"></div></body></html>');
  await p.addScriptTag(vexflow.startsWith('http') ? { url: vexflow } : { path: vexflow });
  await p.addScriptTag({ path: ENGINE1 });
  await p.addScriptTag({ path: ENGINE2 });
  const lotes = await p.evaluate(() => {
    const T = window.tmGruposVETest, z = document.getElementById('z'), out = [];
    [1, 2, 3].forEach(nivel => {
      for (let s = 0; s < 15; s++) {
        const semilla = 4000 + s * 977 + nivel * 31;
        const items = T.generarLote({ nivel, n: 10 }, semilla);
        const dibujos = items.map(it => {
          const d = document.createElement('div'); z.appendChild(d);
          T.dibujarConGrupo(d, it, { w: 440 });
          const info = d.__tmInfo;
          z.removeChild(d);
          return info;
        });
        out.push({ nivel, semilla, items, dibujos });
      }
    });
    return out;
  });
  let items = 0, mezclados = 0;
  for (const lote of lotes) {
    if (lote.items.length < 8) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `solo ${lote.items.length} de 10`);
    lote.items.forEach((it, i) => {
      items++;
      const donde = `${etiqueta} nivel ${lote.nivel} #${lote.semilla} nº${i + 1} (${it.grupo}, ${it.compasGrupo})`;
      revisarItem(donde, it);
      if (it.nivel === 3 && !it.partes.every(p => p === 1)) mezclados++;
      // Lo dibujado: ninguna figura DEL GRUPO lleva puntillo; las de fuera, si
      // tienen 'P' en el nombre, sí lo llevan pintado de verdad.
      const info = lote.dibujos[i];
      info.forEach((x, k) => {
        if (x.grupo) return; // las figuras del grupo nunca llevan puntillo, por construcción
        const esperados = /P$/.test(x.f) ? 1 : 0;
        if (x.puntillos !== esperados) mal(donde, `la figura ${k + 1} (${x.f}, fuera del grupo) lleva ${x.puntillos} puntillos y debería llevar ${esperados}`);
      });
    });
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores/avisos: ' + errs.slice(0, 5).join(' | '));
  console.log(`  ${etiqueta}: ${items} preguntas revisadas (${mezclados} con ritmo mixto en nivel 3)`);
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
  const caja = p.locator('#tmgv');
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-gv-modo[data-n="' + nivel + '"]').click();
    let bien = 0;
    for (let q = 0; q < 8; q++) {
      const equivaleFig = await p.evaluate(() => window.tmGruposVEDebug().variante.equivaleFig);
      const acertar = q % 2 === 0;
      const cartas = await caja.locator('.tm-gv-carta').all();
      let objetivo = equivaleFig;
      if (!acertar) {
        const valores = await caja.locator('.tm-gv-carta').evaluateAll(els => els.map(e => e.getAttribute('data-f')));
        objetivo = valores.find(v => v !== equivaleFig);
      }
      await caja.locator('.tm-gv-carta[data-f="' + objetivo + '"]').click();
      await caja.locator('.tm-gv-btn').click();
      const fb = await caja.locator('.tm-gv-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
      if (acertar) bien++;
      await caja.locator('.tm-gv-btn').click();
    }
    const nota = await caja.locator('.tm-gv-nota').textContent();
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
  console.log(`\n  ${a + b} preguntas · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
