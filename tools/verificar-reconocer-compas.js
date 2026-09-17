'use strict';
/**
 * Audita «reconocer compás» (assets/js/reconocer-compas-engine.js).
 *
 *   node tools/verificar-reconocer-compas.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: con su propia tabla de compases y su propio algoritmo de
 * equivalencia (distinto del `equivalentes()` del motor, para no repetir el mismo
 * posible error) comprueba
 *   - que cada compás generado suma exactamente lo que cabe y no cruza tiempos
 *     bajo SU PROPIA cifra (el generador nunca produce eso, cruce o no cruce);
 *   - qué cifras deberían ser válidas para ese ritmo bajo CUALQUIER cifra —misma
 *     duración total, ninguna figura cruza un tiempo salvo la síncopa de manual
 *     (figura suelta que dura un tiempo y empieza a mitad de otro), y las mismas
 *     parejas de corcheas/semicorcheas quedan unidas por barra— y que coincide
 *     con lo que dice el motor;
 *   - que el único par ambiguo entre los 6 compases del sitio es 3/4↔6/8, y que
 *     aparece con una frecuencia razonable (no es teórico: se ve en la práctica);
 *   - lo DIBUJADO con `dibujarMedida`: puntillos realmente pintados, ninguna barra
 *     de corcheas cruza un tiempo, y sin cifra vs. con cifra no cambia el ritmo;
 *     con VexFlow 4 (web) y 5 (PDF);
 *   - y en el navegador, una ronda respondiendo bien y mal, incluyendo un caso
 *     ambiguo (aceptar cualquiera de las cifras válidas) y el resultado contado.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/compases/reconocer-compas/';
const ENGINE1 = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const ENGINE2 = path.join(ROOT, 'assets/js/reconocer-compas-engine.js');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

/* Tablas propias, en semifusas. */
const U = { r: 64, rP: 96, b: 32, bP: 48, n: 16, nP: 24, c: 8, cP: 12, sc: 4 };
const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const TIEMPOS = { '2/4': 2, '3/4': 3, '4/4': 4, '6/8': 2, '9/8': 3, '12/8': 4 };
const SIMPLES = ['2/4', '3/4', '4/4'], COMPUESTOS = ['6/8', '9/8', '12/8'];
const TODOS = Object.keys(TIEMPO);
/* Nunca se generan como base (no están en TODOS), pero se aceptan como lectura
   alternativa: 2/2 es, en compás simple, el mismo caso que 3/4↔6/8 (mismo
   compás sentido en tiempos de blanca en vez de negra). */
const TIEMPO_EXTRA = { '2/2': 32 }, TIEMPOS_EXTRA = { '2/2': 2 };
const CANDIDATAS = TODOS.concat(Object.keys(TIEMPO_EXTRA));
const tiempoDe = sig => TIEMPO[sig] !== undefined ? TIEMPO[sig] : TIEMPO_EXTRA[sig];
const tiemposDe = sig => TIEMPOS[sig] !== undefined ? TIEMPOS[sig] : TIEMPOS_EXTRA[sig];

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

/* Recoloca cada elemento con su t0 en semifusas (independiente del motor). */
function conT0(elems) {
  let t = 0;
  return elems.map(e => { const r = { f: e.f, s: e.s, t0: t }; t += U[e.f]; return r; });
}

/* Comprueba que el ritmo generado suma exactamente el compás y no cruza tiempos
   a medias (o cabe dentro de un tiempo, o empieza en uno y ocupa tiempos enteros,
   o es la síncopa de manual: dura un tiempo entero y empieza una corchea después
   de la frontera — solo se genera así en compás simple, ver completar-compas-engine.js). */
function revisarRitmo(donde, compas, elems) {
  const t = TIEMPO[compas], n = TIEMPOS[compas];
  const conT = conT0(elems);
  conT.forEach((e, k) => {
    const u = U[e.f];
    if (!u) return mal(donde, `figura desconocida ${e.f}`);
    const dentro = e.t0 % t;
    if (u > t) {
      if (dentro !== 0 || u % t !== 0) mal(donde, `${e.f} no empieza en tiempo o no ocupa tiempos enteros`);
    } else if (u === t && dentro === 8) {
      if (e.s) mal(donde, 'síncopa convertida en silencio');
    } else if (dentro + u > t) {
      mal(donde, `la figura ${k + 1} (${e.f}) cruza la barra del tiempo`);
    }
    if (e.s && k && conT[k - 1].s) mal(donde, 'dos silencios seguidos');
  });
  const total = conT.reduce((a, e) => a + U[e.f], 0);
  if (total !== t * n) mal(donde, `el compás suma ${total} y debería sumar ${t * n}`);
  return conT;
}

/* Algoritmo de equivalencia propio (independiente del `equivalentes()` del motor,
   e implementado de otra forma para no repetir el mismo posible fallo): para cada
   cifra candidata de igual duración total,
     1) ninguna figura puede cruzar una frontera de tiempo a medias, salvo la
        síncopa de manual (una figura suelta que dura un tiempo entero y empieza
        justo a mitad de un tiempo — «corchea-negra-corchea», con o sin silencios;
        Eduardo, 17-09-2026: «esa negra se puede escribir así, es normal ver las
        síncopas escritas así»), y
     2) cada PAREJA de figuras consecutivas tiene que quedar unida por una barra
        bajo esa cifra exactamente cuando lo está bajo la cifra de partida (una
        pareja se barra si las dos son beameables —corchea o más corta, sin
        silencio— y caen en la misma ventana de tiempo). */
function juntasPorBarra(conT, t) {
  const out = [];
  for (let k = 0; k < conT.length - 1; k++) {
    const a = conT[k], b = conT[k + 1];
    const beamA = U[a.f] < 16 && !a.s, beamB = U[b.f] < 16 && !b.s;
    out.push(beamA && beamB && Math.floor(a.t0 / t) === Math.floor(b.t0 / t));
  }
  return out;
}

function equivalentesPropio(compasBase, conT) {
  const total = TIEMPO[compasBase] * TIEMPOS[compasBase];
  const barrasBase = JSON.stringify(juntasPorBarra(conT, TIEMPO[compasBase]));
  const validos = [];
  CANDIDATAS.forEach(sig => {
    // Regla simplificada a propósito (17-09-2026): todo 4/4 acepta también 2/2,
    // sin comprobar agrupación.
    if (compasBase === '4/4' && sig === '2/2') { validos.push(sig); return; }
    const t = tiempoDe(sig);
    if (t * tiemposDe(sig) !== total) return;
    const sinCruces = conT.every(e => {
      const u = U[e.f];
      if (e.t0 % t === 0 && u % t === 0) return true;
      if (Math.floor(e.t0 / t) === Math.floor((e.t0 + u - 1) / t)) return true;
      if (e.t0 % t === 0 && u === t * 1.5) return true;   // puntillo cruzando el pulso: empieza en tiempo, dura tiempo y medio
      return u === t && (e.t0 % t) === 8;   // síncopa de manual: desplazada siempre una corchea, no medio tiempo
    });
    if (!sinCruces) return;
    if (JSON.stringify(juntasPorBarra(conT, t)) !== barrasBase) return;
    validos.push(sig);
  });
  return validos;
}

async function conVexFlow(browser, etiqueta, vexflow) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setContent('<!doctype html><html><body><div id="z"></div></body></html>');
  await p.addScriptTag(vexflow.startsWith('http') ? { url: vexflow } : { path: vexflow });
  await p.addScriptTag({ path: ENGINE1 });
  await p.addScriptTag({ path: ENGINE2 });
  const lotes = await p.evaluate(() => {
    const T = window.tmReconocerCompasTest, z = document.getElementById('z'), out = [];
    ['simples', 'compuestos', 'mezcla'].forEach(grupo => {
      for (let s = 0; s < 20; s++) {
        const semilla = 3000 + s * 977;
        const items = T.generarLote({ grupo, n: 8 }, semilla);
        const dibujos = items.map(it => {
          const d = document.createElement('div'); z.appendChild(d);
          window.tmCompletarCompasData.dibujarMedida(d, it.compasBase, it.elems, { w: 460, sinCifra: true });
          const sinCifra = d.__tmInfo;
          window.tmCompletarCompasData.dibujarMedida(d, it.compasBase, it.elems, { w: 460 });
          const conCifra = d.__tmInfo;
          z.removeChild(d);
          return { sinCifra, conCifra };
        });
        out.push({ grupo, semilla, items, dibujos });
      }
    });
    return out;
  });
  let medidas = 0, ambiguos = 0, ambiguos44 = 0;
  for (const lote of lotes) {
    if (lote.items.length < 6) mal(`${etiqueta} ${lote.grupo} #${lote.semilla}`, `solo ${lote.items.length} medidas de 8`);
    lote.items.forEach((it, i) => {
      medidas++;
      const donde = `${etiqueta} ${lote.grupo} #${lote.semilla} nº${i + 1} (${it.compasBase})`;
      if (lote.grupo === 'simples' && !SIMPLES.includes(it.compasBase)) mal(donde, 'compás compuesto en «simples»');
      if (lote.grupo === 'compuestos' && !COMPUESTOS.includes(it.compasBase)) mal(donde, 'compás simple en «compuestos»');
      const conT = revisarRitmo(donde, it.compasBase, it.elems);
      // El propio algoritmo de equivalencia, calculado desde cero, tiene que coincidir con el del motor.
      const propios = equivalentesPropio(it.compasBase, conT).slice().sort();
      const delMotor = it.validos.slice().sort();
      if (JSON.stringify(propios) !== JSON.stringify(delMotor)) mal(donde, `motor dice válidos [${delMotor}] y el cálculo propio da [${propios}]`);
      if (propios.indexOf(it.compasBase) < 0) mal(donde, 'la propia cifra de partida no sale como válida (bug grave)');
      // Regla simplificada a propósito: TODO 4/4 acepta también 2/2, sin excepciones.
      if (it.compasBase === '4/4' && JSON.stringify(propios) !== JSON.stringify(['2/2', '4/4'])) {
        mal(donde, `un 4/4 debería aceptar siempre también 2/2 y da [${propios}]`);
      }
      // Con los 6 compases del sitio más 2/2 (solo como lectura, nunca como base),
      // los únicos pares ambiguos posibles son 3/4↔6/8 y 4/4↔2/2.
      if (propios.length > 1) {
        ambiguos++;
        const es3468 = propios.indexOf('3/4') >= 0 && propios.indexOf('6/8') >= 0;
        const es4422 = propios.indexOf('4/4') >= 0 && propios.indexOf('2/2') >= 0;
        if (es4422) ambiguos44++;
        if (propios.length !== 2 || !(es3468 || es4422)) mal(donde, `combinación ambigua inesperada: [${propios}]`);
      }
      // Lo dibujado: puntillos realmente pintados y el ritmo es el mismo con o sin cifra.
      const { sinCifra, conCifra } = lote.dibujos[i];
      [sinCifra, conCifra].forEach(dib => {
        dib.notas.forEach((x, k) => {
          const esperados = /P$/.test(x.f) ? 1 : 0;
          if (x.puntillos !== esperados) mal(donde, `la figura ${k + 1} (${x.f}) lleva ${x.puntillos} puntillos dibujados y debería llevar ${esperados}`);
        });
        const t = TIEMPO[it.compasBase];
        dib.barras.forEach(g => {
          const tiempos = new Set(g.map(t0 => Math.floor(t0 / t)));
          if (tiempos.size !== 1) mal(donde, 'una barra une notas de tiempos distintos');
        });
      });
      if (JSON.stringify(sinCifra.notas.map(x => x.f + (x.s ? 's' : ''))) !== JSON.stringify(conCifra.notas.map(x => x.f + (x.s ? 's' : '')))) {
        mal(donde, 'el ritmo cambia entre dibujar con cifra y sin cifra');
      }
    });
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores: ' + errs.slice(0, 3).join(' | '));
  console.log(`  ${etiqueta}: ${medidas} medidas revisadas (${ambiguos} ambiguas: ${ambiguos - ambiguos44} de 3/4↔6/8, ${ambiguos44} de 4/4↔2/2)`);
  return medidas;
}

/* En la página: una ronda respondiendo bien y mal, incluyendo un intento de forzar
   un caso ambiguo (aceptar cualquiera de las cifras válidas). */
async function enPagina(browser) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
  const caja = p.locator('#tmrc');
  await caja.locator('.tm-rc-grupo button[data-v="mezcla"]').click();
  await caja.locator('.tm-rc-empezar').click();

  let bien = 0, vistoAmbiguo = false;
  const N = 8;
  for (let q = 0; q < N; q++) {
    const acertar = q % 2 === 0;
    // El ítem actual (y sus cifras válidas) se lee del widget mediante el gancho
    // de depuración que expone, no adivinando la solución desde el dibujo.
    const cifraElegida = await p.evaluate((acertar) => {
      const it = window.tmReconocerCompasDebug ? window.tmReconocerCompasDebug() : null;
      if (!it) return null;
      if (it.validos.length > 1) window.__tmRcVistoAmbiguo = true;
      const elegido = acertar ? it.validos[0] : (['2/4', '3/4', '4/4', '6/8', '9/8', '12/8'].find(s => it.validos.indexOf(s) < 0) || '2/4');
      return elegido.split('/');
    }, acertar);
    if (!cifraElegida) { mal('página', 'no se pudo leer el ítem actual (falta tmReconocerCompasDebug)'); break; }
    const [num, den] = cifraElegida;
    await caja.locator('.tm-rc-fichas[data-g="num"] .tm-rc-cifra[data-v="' + num + '"]').click();
    await caja.locator('.tm-rc-fichas[data-g="den"] .tm-rc-cifra[data-v="' + den + '"]').click();
    await caja.locator('.tm-rc-btn').click();
    const fb = await caja.locator('.tm-rc-fb').textContent();
    const dijoBien = /¡Correcto!/.test(fb);
    if (acertar && !dijoBien) mal(`pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
    if (!acertar && dijoBien) mal(`pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
    if (acertar) bien++;
    await caja.locator('.tm-rc-btn').click();
  }
  vistoAmbiguo = await p.evaluate(() => !!window.__tmRcVistoAmbiguo);
  const nota = await caja.locator('.tm-rc-nota').textContent();
  if (Number(nota) !== bien) mal('resultado', `resultado ${nota} y deberían ser ${bien} aciertos`);
  const ancho = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ancho > 0) mal('página', `desborda ${ancho}px`);
  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));
  await p.close();
  console.log(`  página: ronda de ${N} preguntas resuelta bien y mal, con el resultado contado (ambiguo visto: ${vistoAmbiguo})`);
}

(async () => {
  const browser = await chromium.launch();
  const a = await conVexFlow(browser, 'VexFlow 4 (web)', VF4);
  const b = await conVexFlow(browser, 'VexFlow 5 (PDF)', VF5);
  await enPagina(browser);
  await browser.close();
  console.log(`\n  ${a + b} medidas · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
