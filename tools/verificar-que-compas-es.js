'use strict';
/**
 * Audita «¿qué compás es?» (assets/js/que-compas-es-engine.js).
 *
 *   node tools/verificar-que-compas-es.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: con su propia tabla de grupos y variantes (la misma
 * regla ya verificada para grupos-valoracion-especial-engine.js) comprueba
 *   - que el número de tiempos con grupo irregular coincide con el nivel
 *     (1, 2, o TODOS los tiempos del compás);
 *   - que cada grupo usa una variante válida para el compás en el que
 *     aparece, que su reparto interno suma su tamaño, que nivel 1/2 son
 *     ritmo uniforme y el 3 puede mezclar (salvo el dosillo), y que el
 *     silencio (nivel 2 y 3) está donde toca;
 *   - que el compás entero (grupos + figuras normales) suma exactamente lo
 *     que cabe y ninguna figura cruza la barra del tiempo;
 *   - lo DIBUJADO: puntillos de las figuras «de fuera» pintados de verdad,
 *     con VexFlow 4 (web) y 5 (PDF), y que dibujar con y sin cifra da el
 *     mismo ritmo;
 *   - y en el navegador, los tres niveles resueltos bien y mal, con el
 *     resultado contado.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/grupos-de-valoracion-especial/que-compas-es/';
const ENGINE1 = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const ENGINE2 = path.join(ROOT, 'assets/js/grupos-valoracion-especial-engine.js');
const ENGINE3 = path.join(ROOT, 'assets/js/que-compas-es-engine.js');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

/* Tabla propia, la misma regla de grupos-valoracion-especial (verificada
   contra /diccionario-musical/grupos-de-valoracion-especial/). */
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

function revisarGrupo(donde, g) {
  const grupoTabla = GRUPOS[g.grupo];
  if (!grupoTabla) return mal(donde, `grupo desconocido ${g.grupo}`);
  const variante = grupoTabla.variantes.find(v => v.base === g.variante.base && v.equivaleFig === g.variante.equivaleFig && v.uGrupo === g.variante.uGrupo);
  if (!variante) return mal(donde, `variante desconocida: ${JSON.stringify(g.variante)}`);

  const suma = g.partes.reduce((a, b) => a + b, 0);
  if (suma !== grupoTabla.n) mal(donde, `las partes de ${g.grupo} suman ${suma} y el grupo tiene ${grupoTabla.n}`);
  g.partes.forEach(p => { if ([1, 2, 4].indexOf(p) < 0) mal(donde, `parte de tamaño ${p} en ${g.grupo}, no es 1, 2 o 4`); });
  if (g.partes.length === 1) mal(donde, `${g.grupo} colapsó a una sola figura`);
  if (g.grupo === 'dosillo' && !g.partes.every(p => p === 1)) mal(donde, 'el dosillo no debería tener forma mixta');
  return variante;
}

function revisarItem(donde, it) {
  const d = TIEMPOS[it.compas], t = TIEMPO[it.compas];
  if (!t) return mal(donde, `compás desconocido ${it.compas}`);

  // Cuántos tiempos llevan grupo, según el nivel.
  const esperados = it.nivel === 1 ? 1 : it.nivel === 2 ? Math.min(2, d) : d;
  if (it.grupos.length !== esperados) mal(donde, `nivel ${it.nivel}: ${it.grupos.length} grupos y deberían ser ${esperados}`);

  it.grupos.forEach((g, i) => {
    const variante = revisarGrupo(`${donde} grupo${i + 1}(${g.grupo})`, g);
    if (variante && !variante.compases.includes(it.compas)) mal(donde, `${g.grupo} (${g.variante.base}) no vale en ${it.compas}`);
    const uniforme = g.partes.every(p => p === 1);
    if (it.nivel < 3 && !uniforme) mal(donde, `nivel ${it.nivel}: ${g.grupo} debería ser uniforme y no lo es`);
    if (g.silIdx >= 0 && it.nivel === 1) mal(donde, `silencio en ${g.grupo} en el nivel 1 (no debería haber)`);
    if (g.silIdx >= g.partes.length) mal(donde, `silIdx fuera de rango en ${g.grupo}`);
  });

  // El compás entero suma lo que cabe; nada cruza la barra del tiempo.
  let pos = 0, gruposVistos = 0;
  it.elems.forEach((e, k) => {
    if (e.t0 !== pos) mal(donde, `el elemento ${k + 1} empieza en ${e.t0} y debería ser ${pos}`);
    if (e.grupo) {
      gruposVistos++;
      const variante = GRUPOS[e.datos.grupo].variantes.find(v => v.uGrupo === e.datos.variante.uGrupo && v.base === e.datos.variante.base);
      if (variante && e.u !== variante.uGrupo) mal(donde, `el grupo ocupa ${e.u} y su variante dice ${variante.uGrupo}`);
      if (pos % t + e.u > t) mal(donde, 'un grupo cruza la barra del tiempo');
    } else {
      const u = U[e.f];
      if (!u) return mal(donde, `figura desconocida ${e.f}`);
      if (u !== e.u) mal(donde, `figura ${e.f} declara u=${e.u} y debería ser ${u}`);
      if (u > t) { if (pos % t !== 0 || u % t !== 0) mal(donde, `${e.f} no encaja en tiempos enteros`); }
      else if (pos % t + u > t) mal(donde, `la figura ${k + 1} (${e.f}) cruza la barra del tiempo`);
    }
    pos += e.u;
  });
  if (gruposVistos !== it.grupos.length) mal(donde, `${gruposVistos} grupos dibujados en los elementos y ${it.grupos.length} en it.grupos`);
  if (pos !== t * d) mal(donde, `el compás suma ${pos} y debería sumar ${t * d}`);
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
  await p.addScriptTag({ path: ENGINE3 });
  const lotes = await p.evaluate(() => {
    const T = window.tmQueCompasEsTest, z = document.getElementById('z'), out = [];
    [1, 2, 3].forEach(nivel => {
      for (let s = 0; s < 12; s++) {
        const semilla = 5000 + s * 977 + nivel * 31;
        const items = T.generarLote({ nivel, n: 10 }, semilla);
        const dibujos = items.map(it => {
          const d = document.createElement('div'); z.appendChild(d);
          T.dibujarCompas(d, it, { w: 460, sinCifra: true });
          const sinCifra = d.__tmInfo;
          T.dibujarCompas(d, it, { w: 460 });
          const conCifra = d.__tmInfo;
          z.removeChild(d);
          return { sinCifra, conCifra };
        });
        out.push({ nivel, semilla, items, dibujos });
      }
    });
    return out;
  });
  let items = 0;
  for (const lote of lotes) {
    if (lote.items.length < 8) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `solo ${lote.items.length} de 10`);
    lote.items.forEach((it, i) => {
      items++;
      const donde = `${etiqueta} nivel ${lote.nivel} #${lote.semilla} nº${i + 1} (${it.compas})`;
      revisarItem(donde, it);
      const { sinCifra, conCifra } = lote.dibujos[i];
      [sinCifra, conCifra].forEach(dib => {
        dib.forEach((x, k) => {
          if (x.grupo) return; // las figuras del grupo nunca llevan puntillo, por construcción
          const esperados = /P$/.test(x.f) ? 1 : 0;
          if (x.puntillos !== esperados) mal(donde, `la figura ${k + 1} (${x.f}, fuera de un grupo) lleva ${x.puntillos} puntillos y debería llevar ${esperados}`);
        });
      });
      const claveDe = dib => dib.map(x => x.grupo ? 'G' + x.grupo[0] + x.partes + (x.silencio ? 's' : '') : x.f + (x.s ? 's' : '')).join();
      if (claveDe(sinCifra) !== claveDe(conCifra)) mal(donde, 'el ritmo cambia entre dibujar con cifra y sin cifra');
    });
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores/avisos: ' + errs.slice(0, 5).join(' | '));
  console.log(`  ${etiqueta}: ${items} preguntas revisadas`);
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
  const caja = p.locator('#tmqc');
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-qc-modo[data-n="' + nivel + '"]').click();
    let bien = 0;
    for (let q = 0; q < 8; q++) {
      const acertar = q % 2 === 0;
      const [num, den] = await p.evaluate((acertar) => {
        const it = window.tmQueCompasEsDebug();
        if (acertar) return it.compas.split('/');
        const otros = ['2/4', '3/4', '4/4', '6/8', '9/8', '12/8'].filter(c => c !== it.compas);
        return otros[Math.floor(Math.random() * otros.length)].split('/');
      }, acertar);
      await caja.locator('.tm-qc-fichas[data-g="num"] .tm-qc-cifra[data-v="' + num + '"]').click();
      await caja.locator('.tm-qc-fichas[data-g="den"] .tm-qc-cifra[data-v="' + den + '"]').click();
      await caja.locator('.tm-qc-btn').click();
      const fb = await caja.locator('.tm-qc-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
      if (acertar) bien++;
      await caja.locator('.tm-qc-btn').click();
    }
    const nota = await caja.locator('.tm-qc-nota').textContent();
    if (Number(nota) !== bien) mal(`nivel ${nivel}`, `resultado ${nota} y deberían ser ${bien} aciertos`);
    await caja.locator('[data-a="modo"]').click();
  }

  // Reglas fijas de doblado: 4/4↔2/2 y 2/4↔4/8 («caben lo mismo»), 3/4↔6/8 NO
  // (el 3/4 doblado es un compás compuesto de verdad, depende del ritmo).
  await caja.locator('.tm-qc-modo[data-n="1"]').click();
  const dobladas = [['4/4', '2', '2'], ['2/4', '4', '8']];
  for (const [base, num, den] of dobladas) {
    await p.evaluate((base) => { window.tmQueCompasEsDebug().compas = base; }, base);
    await caja.locator('.tm-qc-fichas[data-g="num"] .tm-qc-cifra[data-v="' + num + '"]').click();
    await caja.locator('.tm-qc-fichas[data-g="den"] .tm-qc-cifra[data-v="' + den + '"]').click();
    await caja.locator('.tm-qc-btn').click();
    const fb = await caja.locator('.tm-qc-fb').textContent();
    if (!/¡Correcto!/.test(fb)) mal(`regla ${base}↔${num}/${den}`, `responder ${num}/${den} a un ${base} debería darse por correcto: ` + fb.slice(0, 120));
    await caja.locator('.tm-qc-btn').click(); // siguiente pregunta, para dejar el widget limpio
  }
  // El 3/4 NO debe aceptar 6/8 aquí (a diferencia de 4/4↔2/2 y 2/4↔4/8): esa
  // equivalencia depende del ritmo, no es un doblado trivial.
  await p.evaluate(() => { window.tmQueCompasEsDebug().compas = '3/4'; });
  await caja.locator('.tm-qc-fichas[data-g="num"] .tm-qc-cifra[data-v="6"]').click();
  await caja.locator('.tm-qc-fichas[data-g="den"] .tm-qc-cifra[data-v="8"]').click();
  await caja.locator('.tm-qc-btn').click();
  const fb34 = await caja.locator('.tm-qc-fb').textContent();
  if (/¡Correcto!/.test(fb34)) mal('regla 3/4↔6/8', 'responder 6/8 a un 3/4 NO debería darse por correcto (no es un doblado trivial): ' + fb34.slice(0, 120));
  await caja.locator('.tm-qc-btn').click();

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
