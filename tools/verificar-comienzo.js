'use strict';
/**
 * Audita «¿cómo empieza la melodía?» (assets/js/tipo-de-comienzo-engine.js).
 *
 *   node tools/verificar-comienzo.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: mira solo lo dibujado en el primer compás, calcula CUÁNDO
 * entra la música (regla de Eduardo, 21-09-2026: en el tiempo 1 = tético; tras
 * el tiempo fuerte pero antes de la mitad del compás = acéfalo; en la mitad o
 * después = anacrúsico, con el silencio inicial escrito o no) y lo compara con
 * lo que el motor declara. Comprueba además la forma del primer compás
 * (entero, con silencio inicial escrito, o incompleto sin silencios) y las
 * tablas de anacrusa y de silencio inicial de cada compás y nivel,
 * que el segundo compás está completo, que ninguna figura cruza la
 * barra de un tiempo (salvo blanca / blanca con puntillo alineadas), que los
 * silencios «que despistan» solo salen en el nivel 3 y nunca al principio, que
 * cada nivel respeta su tabla (compases, anacrusas, silencios), que la melodía
 * cabe en el pentagrama y que cada lote reparte los tres tipos. Y lo DIBUJADO:
 * puntillos pintados de verdad (también en silencios), figuras y silencios tal
 * cual, la duración que VexFlow entiende de cada figura (ticks) igual a la
 * que declara el motor —en los seis compases, simples y compuestos—, y las barras (solo figuras más cortas que la negra, del mismo tiempo,
 * sin silencios en medio), con VexFlow 4 (web) y 5 (PDF). En el navegador, los
 * tres niveles resueltos bien y mal, con el resultado contado.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/comienzo-tetico-anacrusico-acefalo/';
const ENGINE1 = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const ENGINE2 = path.join(ROOT, 'assets/js/tipo-de-comienzo-engine.js');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const TIEMPOS = { '2/4': 2, '3/4': 3, '4/4': 4, '6/8': 2, '9/8': 3, '12/8': 4 };
const U = { r: 64, rP: 96, b: 32, bP: 48, n: 16, nP: 24, c: 8, cP: 12, sc: 4 };
const SIMPLES = ['2/4', '3/4', '4/4'];
const SIL = { // silencio inicial del acéfalo (< mitad del compás)
  '2/4': { 2: [8], 3: [8, 4] }, '3/4': { 1: [16], 2: [16, 8], 3: [16, 8, 4] }, '4/4': { 1: [16], 2: [16, 8], 3: [16, 8, 4] },
  '6/8': { 2: [16, 8], 3: [16, 8] }, '9/8': { 2: [24, 16, 8], 3: [24, 16, 8] }, '12/8': { 2: [24, 16, 8], 3: [24, 16, 8] },
};
const ANA = { // anacrusa: lo escrito antes de la barra (<= mitad del compás)
  '2/4': { 1: [16], 2: [16, 8], 3: [16, 8, 4, 12] }, '3/4': { 1: [16], 2: [16, 8, 24], 3: [16, 8, 4, 24, 12] },
  '4/4': { 1: [16], 2: [16, 8, 24], 3: [16, 8, 4, 24, 12, 32] }, '6/8': { 1: [24], 2: [24, 16, 8], 3: [24, 16, 8] },
  '9/8': { 1: [24], 2: [24, 16, 8], 3: [24, 16, 8] }, '12/8': { 1: [24], 2: [24, 16, 8], 3: [24, 16, 8, 48] },
};
const TONAL = ['C', 'G', 'D', 'F', 'Bb', 'A', 'Eb'];

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

/* Cuándo entra la música: posición de la 1.ª nota (no silencio) del primer compás. */
function entrada(it) {
  const e = it.compases[0].elems.find(x => !x.s);
  return e ? e.t0 : -1;
}
function reconocer(it) {
  const total = TIEMPO[it.compas] * TIEMPOS[it.compas], P = entrada(it);
  if (P === 0) return 'tetico';
  return P < total / 2 ? 'acefalo' : 'anacrusico';
}

function revisarItem(donde, it) {
  const t = TIEMPO[it.compas], d = TIEMPOS[it.compas];
  if (!t) return mal(donde, `compás desconocido ${it.compas}`);
  const total = t * d, mitad = total / 2;
  if (!TONAL.includes(it.tonalidad)) mal(donde, `tonalidad ${it.tonalidad}`);
  if (it.nivel === 1 && !SIMPLES.includes(it.compas)) mal(donde, `nivel 1 con compás ${it.compas}`);
  if (it.nivel === 1 && !['C', 'G', 'D', 'F'].includes(it.tonalidad)) mal(donde, `nivel 1 con tonalidad ${it.tonalidad}`);
  if (it.compases.length !== 2) return mal(donde, `${it.compases.length} compases en vez de 2`);

  const b1 = it.compases[0].elems, b2 = it.compases[1].elems;
  const suma1 = b1.reduce((a, e) => a + e.u, 0);
  const P = entrada(it);
  if (P < 0) return mal(donde, 'el primer compás no tiene ninguna nota');
  const visto = reconocer(it);
  if (visto !== it.tipo) mal(donde, `declara ${it.tipo} pero la música entra en ${P} de ${total}, que es ${visto}`);

  // Forma del primer compás.
  if (!['entero', 'silencio', 'incompleto'].includes(it.forma)) mal(donde, `forma desconocida ${it.forma}`);
  if (it.forma === 'entero') {
    if (it.tipo !== 'tetico') mal(donde, `forma «entero» en un ${it.tipo}`);
    if (suma1 !== total || b1[0].s || b1[0].t0 !== 0) mal(donde, 'tético mal formado');
  }
  if (it.forma === 'silencio') {
    const r = b1[0];
    if (it.tipo !== 'acefalo') mal(donde, `silencio inicial escrito en un ${it.tipo}`);
    if (!r.s || r.t0 !== 0) mal(donde, 'forma «silencio» sin silencio en el tiempo 1');
    if (suma1 !== total) mal(donde, `compás con silencio inicial suma ${suma1} y deberían ser ${total}`);
    if (!(SIL[it.compas][it.nivel] || []).includes(r.u)) mal(donde, `silencio inicial ${r.u} no vale en ${it.compas} nivel ${it.nivel}`);
    if (b1.length < 2 || b1[1].s) mal(donde, 'tras el silencio inicial no entra una nota');
    if (b1.slice(1).some(e => e.s)) mal(donde, 'silencio de más en el primer compás del acéfalo');
    if (P !== r.u) mal(donde, `la música entra en ${P} y el silencio dura ${r.u}`);
  }
  if (it.forma === 'incompleto') {
    if (it.tipo === 'tetico') mal(donde, 'tético con el primer compás incompleto');
    if (suma1 !== total - P) mal(donde, `compás incompleto suma ${suma1} y con entrada en ${P} deberían ser ${total - P}`);
    if (b1.some(e => e.s)) mal(donde, 'el compás incompleto lleva silencios');
    if (b1[0].t0 !== P) mal(donde, 'el compás incompleto no empieza en la entrada');
    if (it.tipo === 'anacrusico') {
      if (!(ANA[it.compas][it.nivel] || []).includes(suma1)) mal(donde, `anacrusa de ${suma1} no vale en ${it.compas} nivel ${it.nivel}`);
      if (suma1 > mitad) mal(donde, `anacrusa de ${suma1}, más de la mitad del compás (${mitad})`);
    }
    if (it.tipo === 'acefalo') {
      if (!(SIL[it.compas][it.nivel] || []).includes(P)) mal(donde, `acéfalo incompleto con entrada ${P}, no vale en ${it.compas} nivel ${it.nivel}`);
      if (it.nivel === 1) mal(donde, 'acéfalo incompleto en el nivel 1 (solo se escribe el silencio)');
    }
  }
  if (it.nivel === 1 && it.tipo === 'acefalo' && it.forma !== 'silencio') mal(donde, 'nivel 1: acéfalo sin silencio escrito');
  if (it.nivel === 1 && it.tipo === 'acefalo' && !['3/4', '4/4'].includes(it.compas)) mal(donde, `nivel 1: acéfalo en ${it.compas}`);

  // Cada compás suma lo que cabe; nada cruza la barra de un tiempo.
  it.compases.forEach((c, k) => {
    const suma = c.elems.reduce((a, e) => a + e.u, 0);
    if (k === 1 && suma !== total) mal(donde, `el 2.º compás suma ${suma} y deberían ser ${total}`);
    let pos = k === 0 ? total - suma : 0;
    if (k === 0 && it.forma !== 'incompleto' && suma !== total) mal(donde, `el 1.er compás suma ${suma} y deberían ser ${total}`);
    c.elems.forEach((e, i) => {
      const u = U[e.f];
      if (!u) return mal(donde, `figura desconocida ${e.f}`);
      if (u !== e.u) mal(donde, `figura ${e.f} declara u=${e.u} y debería ser ${u}`);
      if (e.t0 !== pos) mal(donde, `c${k + 1} elemento ${i + 1} empieza en ${e.t0} y debería ser ${pos}`);
      if (u > t) {
        if (pos % (2 * t) !== 0 || u !== 2 * t) mal(donde, `c${k + 1}: ${e.f} en ${pos} no está alineada`);
      } else if (pos % t + u > t) mal(donde, `c${k + 1}: ${e.f} en ${pos} cruza la barra del tiempo`);
      if (e.s) {
        if (e.p !== null) mal(donde, 'un silencio lleva altura');
      } else if (!Number.isInteger(e.p) || e.p < 29 || e.p > 39) mal(donde, `nota fuera de rango: ${e.p}`);
      pos += u;
    });
    if (pos !== total) mal(donde, `c${k + 1} termina en ${pos} y debería terminar en ${total}`);
  });
  if (b2[0].s && it.nivel < 3) mal(donde, 'el compás 2 empieza en silencio fuera del nivel 3');

  // Silencios: solo el inicial escrito del acéfalo, salvo los «que despistan» del nivel 3 (nunca el 1.er elemento).
  it.compases.forEach((c, k) => c.elems.forEach((e, i) => {
    if (!e.s) return;
    if (k === 0 && i === 0 && it.forma === 'silencio') return;
    if (it.nivel < 3) mal(donde, `silencio suelto (c${k + 1}, elemento ${i + 1}) en el nivel ${it.nivel}`);
    if (i === 0) mal(donde, `silencio «que despista» al principio del c${k + 1}`);
    if (k === 0 && it.tipo !== 'tetico') mal(donde, `silencio suelto en el c1 de un ${it.tipo}`);
  }));
  // Cada nivel su ritmo.
  if (it.nivel === 1) it.compases.forEach(c => c.elems.forEach(e => { if (e.u === 4 || e.u === 12) mal(donde, `nivel 1 con figura de ${e.u}`); }));
  if (it.nivel === 2) it.compases.forEach(c => c.elems.forEach(e => { if (e.u === 12) mal(donde, 'nivel 2 con corchea con puntillo'); }));
}

function vigasEsperadas(it) {
  const t = TIEMPO[it.compas];
  let n = 0;
  it.compases.forEach(c => {
    let grupo = [];
    const cerrar = () => { if (grupo.length > 1) n++; grupo = []; };
    c.elems.forEach(e => {
      const corta = e.u < 16 && !e.s;
      if (!corta || (grupo.length && Math.floor(grupo[0].t0 / t) !== Math.floor(e.t0 / t))) cerrar();
      if (corta) grupo.push(e);
    });
    cerrar();
  });
  return n;
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
    const T = window.tmComienzoTest, z = document.getElementById('z'), out = [];
    [1, 2, 3].forEach(nivel => {
      for (let s = 0; s < 14; s++) {
        const semilla = 3000 + s * 887 + nivel * 41;
        const items = T.generarLote({ nivel, n: 12 }, semilla);
        const dibujos = items.map(it => {
          const d = document.createElement('div'); z.appendChild(d);
          T.dibujar(d, it);
          const info = d.__tmInfo;
          const ancho = d.querySelector('svg').getAttribute('viewBox');
          z.removeChild(d);
          return { info, ancho };
        });
        out.push({ nivel, semilla, items, dibujos });
      }
    });
    return out;
  });
  let items = 0;
  const conteo = { tetico: 0, anacrusico: 0, acefalo: 0 };
  for (const lote of lotes) {
    if (lote.items.length !== 12) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `${lote.items.length} de 12`);
    const porTipo = { tetico: 0, anacrusico: 0, acefalo: 0 };
    lote.items.forEach((it, i) => {
      items++; porTipo[it.tipo]++; conteo[it.tipo]++;
      const donde = `${etiqueta} nivel ${lote.nivel} #${lote.semilla} nº${i + 1} (${it.tipo} ${it.compas})`;
      revisarItem(donde, it);
      const { info, ancho } = lote.dibujos[i];
      it.compases.forEach((c, k) => {
        const dib = info.barras[k];
        if (dib.length !== c.elems.length) return mal(donde, `c${k + 1}: ${dib.length} dibujadas y ${c.elems.length} en los datos`);
        c.elems.forEach((e, j) => {
          const x = dib[j];
          if (x.f !== e.f || x.s !== !!e.s) mal(donde, `c${k + 1} figura ${j + 1}: dibujada ${x.f}${x.s ? ' silencio' : ''} y debería ser ${e.f}${e.s ? ' silencio' : ''}`);
          if (x.ticks !== U[e.f] * 256) mal(donde, `c${k + 1} figura ${j + 1} (${e.f}${e.s ? ' silencio' : ''}): VexFlow la cuenta como ${x.ticks} ticks y deberían ser ${U[e.f] * 256}`);
          const esperados = /P$/.test(e.f) ? 1 : 0;
          if (x.puntillos !== esperados) mal(donde, `c${k + 1} figura ${j + 1} (${e.f}${e.s ? ' silencio' : ''}) lleva ${x.puntillos} puntillos y debería llevar ${esperados}`);
        });
      });
      if (info.vigas !== vigasEsperadas(it)) mal(donde, `${info.vigas} barras dibujadas y deberían ser ${vigasEsperadas(it)}`);
      const W = Number(ancho.split(' ')[2]);
      if (!(W > 200 && W < 900)) mal(donde, `ancho del dibujo raro: ${W}`);
    });
    ['tetico', 'anacrusico', 'acefalo'].forEach(tp => { if (Math.abs(porTipo[tp] - 4) > 0) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `reparto de tipos ${JSON.stringify(porTipo)} (esperado 4/4/4)`); });
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores/avisos: ' + errs.slice(0, 5).join(' | '));
  console.log(`  ${etiqueta}: ${items} melodías revisadas (${JSON.stringify(conteo)})`);
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
  const caja = p.locator('#tmcm');
  const TIPOS = ['tetico', 'anacrusico', 'acefalo'];
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-cm-modo[data-n="' + nivel + '"]').click();
    let bien = 0;
    for (let q = 0; q < 8; q++) {
      const acertar = q % 2 === 0;
      const elegir = await p.evaluate(([acertar, TIPOS]) => {
        const it = window.tmComienzoDebug();
        if (acertar) return it.tipo;
        const otros = TIPOS.filter(t => t !== it.tipo);
        return otros[Math.floor(Math.random() * otros.length)];
      }, [acertar, TIPOS]);
      await caja.locator('.tm-cm-op[data-t="' + elegir + '"]').click();
      const fb = await caja.locator('.tm-cm-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
      if (!acertar && !/mitad/.test(fb)) mal(`nivel ${nivel} pregunta ${q + 1}`, 'sin pista tras el fallo: ' + fb.slice(0, 100));
      const deshabilitados = await caja.locator('.tm-cm-op[disabled]').count();
      if (deshabilitados !== 3) mal(`nivel ${nivel} pregunta ${q + 1}`, `tras responder hay ${deshabilitados} botones bloqueados y deberían ser 3`);
      if (acertar) bien++;
      await caja.locator('.tm-cm-btn').click();
    }
    const nota = await caja.locator('.tm-cm-nota').textContent();
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
  console.log(`\n  ${a + b} melodías · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
