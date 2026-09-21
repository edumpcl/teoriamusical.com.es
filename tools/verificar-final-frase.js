'use strict';
/**
 * Audita «¿cómo termina la melodía?» (assets/js/tipo-de-final-engine.js).
 *
 *   node tools/verificar-final-frase.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: mira solo lo dibujado en el último compás, calcula EN QUÉ
 * TIEMPO EMPIEZA la última nota (Q, contado desde el principio de ese compás) y
 * aplica la regla (Q = 0 → final en tiempo fuerte; cualquier otro Q → tiempo
 * débil; el único tiempo fuerte es el 1) para compararla con lo que declara el
 * motor. Comprueba además: que el primer compás está completo y el último
 * completo o incompleto según la forma (el incompleto acaba en la última nota,
 * sin silencios detrás); que los silencios tras la última nota solo salen desde
 * el nivel 2 y los previos solo en el nivel 3; que ninguna figura cruza la barra
 * de un tiempo (salvo las de varios tiempos alineadas); que cada nivel respeta
 * su tabla; que la melodía cabe en el pentagrama y acaba en la tónica; y que
 * cada lote reparte mitad y mitad. Y lo DIBUJADO: puntillos (también en
 * silencios), figuras y silencios tal cual, ticks de VexFlow, barras, y la doble
 * barra final, con VexFlow 4 (web) y 5 (PDF). En el navegador, los tres niveles
 * resueltos bien y mal, con el resultado contado.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/final-tiempo-fuerte-y-debil/';
const ENGINES = ['assets/js/completar-compas-engine.js', 'assets/js/tipo-de-comienzo-engine.js', 'assets/js/tipo-de-final-engine.js'].map(f => path.join(ROOT, f));
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const TIEMPOS = { '2/4': 2, '3/4': 3, '4/4': 4, '6/8': 2, '9/8': 3, '12/8': 4 };
const U = { r: 64, rP: 96, b: 32, bP: 48, n: 16, nP: 24, c: 8, cP: 12, sc: 4 };
const SIMPLES = ['2/4', '3/4', '4/4'];
const TONICA = { C: 'c', G: 'g', D: 'd', F: 'f', Bb: 'b', A: 'a', Eb: 'e' };

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

/* Posición (en el último compás) de la última nota que suena. */
function q(it) {
  const b2 = it.compases[1].elems;
  for (let i = b2.length - 1; i >= 0; i--) if (!b2[i].s) return { Q: b2[i].t0, i };
  return { Q: -1, i: -1 };
}

function revisarItem(donde, it) {
  const t = TIEMPO[it.compas], d = TIEMPOS[it.compas];
  if (!t) return mal(donde, `compás desconocido ${it.compas}`);
  const T = t * d;
  if (!(it.tonalidad in TONICA)) mal(donde, `tonalidad ${it.tonalidad}`);
  if (it.nivel === 1 && !SIMPLES.includes(it.compas)) mal(donde, `nivel 1 con compás ${it.compas}`);
  if (it.nivel === 1 && !['C', 'G', 'D', 'F'].includes(it.tonalidad)) mal(donde, `nivel 1 con tonalidad ${it.tonalidad}`);
  if (it.compases.length !== 2) return mal(donde, `${it.compases.length} compases en vez de 2`);

  const { Q, i: iUlt } = q(it);
  if (Q < 0) return mal(donde, 'el último compás no tiene ninguna nota');
  const visto = Q === 0 ? 'fuerte' : 'debil';
  if (visto !== it.tipo) mal(donde, `declara ${it.tipo} pero la última nota empieza en ${Q}, que es ${visto}`);

  const b1 = it.compases[0].elems, b2 = it.compases[1].elems;
  const suma = c => c.reduce((a, e) => a + e.u, 0);
  if (suma(b1) !== T) mal(donde, `el penúltimo compás suma ${suma(b1)} y deberían ser ${T}`);
  if (!['completo', 'incompleto'].includes(it.forma)) mal(donde, `forma desconocida ${it.forma}`);
  const ult = b2[iUlt];
  const fin = ult.t0 + ult.u;
  if (it.forma === 'completo' && suma(b2) !== T) mal(donde, `último compás completo suma ${suma(b2)} y deberían ser ${T}`);
  if (it.forma === 'incompleto') {
    if (suma(b2) >= T) mal(donde, 'último compás «incompleto» que está completo');
    if (iUlt !== b2.length - 1) mal(donde, 'el compás incompleto lleva silencios tras la última nota');
    if (it.nivel < 2) mal(donde, 'compás incompleto en el nivel 1');
    if (suma(b2) !== fin) mal(donde, 'compás incompleto que no acaba en la última nota');
  }
  // Silencios: solo detrás de la última nota (desde el nivel 2), o delante (nivel 3, todos o ninguno).
  const cola = b2.slice(iUlt + 1), antes = b2.slice(0, iUlt);
  if (cola.some(e => !e.s)) mal(donde, 'hay una nota después de la última nota');
  if (cola.length && it.nivel < 2) mal(donde, 'silencios tras la última nota en el nivel 1');
  if (it.nivel === 1 && fin !== T) mal(donde, `nivel 1: la última nota acaba en ${fin} y debería llegar al final (${T})`);
  if (it.nivel === 1 && Q % t !== 0) mal(donde, `nivel 1: la última nota empieza en ${Q}, no en un tiempo`);
  const restosAntes = antes.filter(e => e.s).length;
  if (restosAntes && it.nivel < 3) mal(donde, 'silencios antes de la última nota fuera del nivel 3');
  if (restosAntes && restosAntes !== antes.length) mal(donde, 'silencios mezclados con notas antes de la última nota');
  if (it.nivel === 2 && (ult.u === 4 || ult.u === 12)) mal(donde, `nivel 2: última nota de ${ult.u}`);
  if (it.nivel < 3 && Q > 0 && Q % 8 !== 0) mal(donde, `nivel ${it.nivel}: última nota en ${Q}`);
  b1.forEach((e, i) => { if (e.s && (it.nivel < 3 || i === 0)) mal(donde, `silencio en el penúltimo compás (elemento ${i + 1}) fuera de lugar`); });

  // Posiciones y figuras.
  it.compases.forEach((c, k) => {
    let pos = 0;
    c.elems.forEach((e, i) => {
      const u = U[e.f];
      if (!u) return mal(donde, `figura desconocida ${e.f}`);
      if (u !== e.u) mal(donde, `figura ${e.f} declara u=${e.u} y debería ser ${u}`);
      if (e.t0 !== pos) mal(donde, `c${k + 1} elemento ${i + 1} empieza en ${e.t0} y debería ser ${pos}`);
      if (u > t) {
        const ok = (u === 2 * t && pos % (2 * t) === 0) || (u % t === 0 && pos === 0);
        if (!ok) mal(donde, `c${k + 1}: ${e.f} en ${pos} no está alineada`);
      } else if (pos % t + u > t) mal(donde, `c${k + 1}: ${e.f} en ${pos} cruza la barra del tiempo`);
      if (e.s) { if (e.p !== null) mal(donde, 'un silencio lleva altura'); }
      else if (!Number.isInteger(e.p) || e.p < 29 || e.p > 39) mal(donde, `nota fuera de rango: ${e.p}`);
      pos += u;
    });
  });
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
  for (const e of ENGINES) await p.addScriptTag({ path: e });
  const lotes = await p.evaluate(() => {
    const T = window.tmFinalTest, z = document.getElementById('z'), out = [];
    [1, 2, 3].forEach(nivel => {
      for (let s = 0; s < 14; s++) {
        const semilla = 7000 + s * 761 + nivel * 53;
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
  const conteo = { fuerte: 0, debil: 0 }, formas = { completo: 0, incompleto: 0 };
  for (const lote of lotes) {
    if (lote.items.length !== 12) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `${lote.items.length} de 12`);
    const porTipo = { fuerte: 0, debil: 0 };
    lote.items.forEach((it, i) => {
      items++; porTipo[it.tipo]++; conteo[it.tipo]++; formas[it.forma]++;
      const donde = `${etiqueta} nivel ${lote.nivel} #${lote.semilla} nº${i + 1} (${it.tipo} ${it.compas} ${it.forma})`;
      revisarItem(donde, it);
      const { info, ancho } = lote.dibujos[i];
      if (!info.final) mal(donde, 'no se ha dibujado la doble barra final');
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
      // La melodía acaba en la tónica: la última nota dibujada lleva la letra de la tónica.
      const dib2 = info.barras[1];
      let ultimaClave = null;
      dib2.forEach(x => { if (!x.s) ultimaClave = x.key; });
      if (!ultimaClave || ultimaClave[0] !== TONICA[it.tonalidad]) mal(donde, `la última nota es ${ultimaClave} y la tónica de ${it.tonalidad} es ${TONICA[it.tonalidad]}`);
      if (info.vigas !== vigasEsperadas(it)) mal(donde, `${info.vigas} barras dibujadas y deberían ser ${vigasEsperadas(it)}`);
      const W = Number(ancho.split(' ')[2]);
      if (!(W > 200 && W < 900)) mal(donde, `ancho del dibujo raro: ${W}`);
    });
    if (porTipo.fuerte !== 6 || porTipo.debil !== 6) mal(`${etiqueta} nivel ${lote.nivel} #${lote.semilla}`, `reparto ${JSON.stringify(porTipo)} (esperado 6/6)`);
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores/avisos: ' + errs.slice(0, 5).join(' | '));
  console.log(`  ${etiqueta}: ${items} melodías revisadas (${JSON.stringify(conteo)}, ${JSON.stringify(formas)})`);
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
  const caja = p.locator('#tmfi');
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-fi-modo[data-n="' + nivel + '"]').click();
    let bien = 0;
    for (let q2 = 0; q2 < 8; q2++) {
      const acertar = q2 % 2 === 0;
      const elegir = await p.evaluate((acertar) => {
        const it = window.tmFinalDebug();
        return acertar ? it.tipo : (it.tipo === 'fuerte' ? 'debil' : 'fuerte');
      }, acertar);
      await caja.locator('.tm-fi-op[data-t="' + elegir + '"]').click();
      const fb = await caja.locator('.tm-fi-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q2 + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q2 + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
      if (!acertar && !/(tiempo 1|acento)/.test(fb)) mal(`nivel ${nivel} pregunta ${q2 + 1}`, 'sin pista tras el fallo: ' + fb.slice(0, 100));
      const bloqueados = await caja.locator('.tm-fi-op[disabled]').count();
      if (bloqueados !== 2) mal(`nivel ${nivel} pregunta ${q2 + 1}`, `tras responder hay ${bloqueados} botones bloqueados y deberían ser 2`);
      if (acertar) bien++;
      await caja.locator('.tm-fi-btn').click();
    }
    const nota = await caja.locator('.tm-fi-nota').textContent();
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
