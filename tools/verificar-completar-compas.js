'use strict';
/**
 * Audita «completar el compás» (assets/js/completar-compas-engine.js).
 *
 *   node tools/verificar-completar-compas.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: con sus propias tablas de compases y valores comprueba
 *   - que cada compás generado suma exactamente lo que cabe;
 *   - que el ritmo está agrupado por tiempos: cada figura cabe dentro de un tiempo
 *     o empieza en un tiempo y ocupa tiempos enteros (y las largas, donde toca);
 *   - que los silencios no van seguidos, son como mucho dos y solo en el nivel 2;
 *   - que el hueco cumple el nivel (1: una figura; 2: figura o silencio; 3: dos o
 *     tres figuras) y que en los niveles 1 y 2 la respuesta es ÚNICA en la paleta;
 *   - lo DIBUJADO: tantos huecos invisibles como elementos faltan, ninguna barra
 *     de corcheas une notas de tiempos distintos, y con VexFlow 4 (web) y 5 (PDF);
 *   - y en el navegador, cada nivel se resuelve bien y mal: la corrección acierta
 *     en ambos casos.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/compases/completar-compas/';
const ENGINE = path.join(ROOT, 'assets/js/completar-compas-engine.js');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

/* Tablas propias, en semifusas. */
const U = { r: 64, rP: 96, b: 32, bP: 48, n: 16, nP: 24, c: 8, cP: 12, sc: 4 };
const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const TIEMPOS = { '2/4': 2, '3/4': 3, '4/4': 4, '6/8': 2, '9/8': 3, '12/8': 4 };
const SIMPLES = ['2/4', '3/4', '4/4'], COMPUESTOS = ['6/8', '9/8', '12/8'];

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

function revisarCompas(donde, it) {
  const t = TIEMPO[it.compas], n = TIEMPOS[it.compas];
  if (!t) return mal(donde, `compás desconocido ${it.compas}`);
  let pos = 0, silencios = 0;
  it.elems.forEach((e, k) => {
    const u = U[e.f];
    if (!u) return mal(donde, `figura desconocida ${e.f}`);
    if (e.t0 !== pos) mal(donde, `la figura ${k + 1} empieza en ${e.t0} y debería ser ${pos}`);
    const tiempoIni = Math.floor(pos / t), dentro = pos % t;
    if (u > t) {
      // Larga: empieza en tiempo y ocupa tiempos enteros, y solo donde se escribe así.
      if (dentro !== 0 || u % t !== 0) mal(donde, `${e.f} no empieza en tiempo o no ocupa tiempos enteros`);
      const ocupa = u / t;
      if (t === 16 && e.f === 'b' && tiempoIni % 2 !== 0) mal(donde, 'blanca empezando en un tiempo par (debería ir ligada)');
      if (t === 16 && (e.f === 'bP' || e.f === 'r') && tiempoIni !== 0) mal(donde, `${e.f} fuera del primer tiempo`);
      if (t === 24 && e.f === 'bP' && tiempoIni % 2 !== 0) mal(donde, 'blanca con puntillo empezando en tiempo par');
      if (t === 24 && e.f === 'rP' && tiempoIni !== 0) mal(donde, 'redonda con puntillo fuera del primer tiempo');
      if (tiempoIni + ocupa > n) mal(donde, `${e.f} se sale del compás`);
      if (e.s) mal(donde, 'silencio de más de un tiempo');
    } else if (u === t && dentro === 8) {
      // Síncopa de manual: empieza una corchea después de la frontera del tiempo
      // y dura un tiempo entero (corchea-negra-corchea, o con puntillo en compuesto).
      if (e.s) mal(donde, 'síncopa convertida en silencio');
    } else if (dentro + u > t) {
      mal(donde, `la figura ${k + 1} (${e.f}) cruza la barra del tiempo`);
    }
    if (e.s) { silencios++; if (k && it.elems[k - 1].s) mal(donde, 'dos silencios seguidos'); }
    pos += u;
  });
  if (pos !== t * n) mal(donde, `el compás suma ${pos} y debería sumar ${t * n}`);
  if (silencios > 2) mal(donde, `${silencios} silencios`);
  if (it.nivel !== 2 && silencios) mal(donde, 'silencios fuera del nivel 2');

  const { desde, hasta } = it.hueco;
  const largo = hasta - desde + 1;
  if (it.nivel < 3 && largo !== 1) mal(donde, `hueco de ${largo} elementos en el nivel ${it.nivel}`);
  if (it.nivel === 3 && (largo < 2 || largo > 3)) mal(donde, `hueco de ${largo} elementos en el nivel 3`);
  const faltan = it.elems.slice(desde, hasta + 1);
  if (it.nivel === 1 && faltan[0].s) mal(donde, 'falta un silencio en el nivel 1');
  if (it.nivel === 3 && faltan.some(e => e.s)) mal(donde, 'silencio dentro del hueco del nivel 3');
  const valor = faltan.reduce((a, e) => a + U[e.f], 0);
  if (valor !== it.valor) mal(donde, `el motor dice que falta ${it.valor} y lo que falta suma ${valor}`);
  if (JSON.stringify(it.faltan) !== JSON.stringify(faltan.map(e => ({ f: e.f, s: e.s })))) mal(donde, '«faltan» no coincide con el hueco');
}

async function conVexFlow(browser, etiqueta, vexflow) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setContent('<!doctype html><html><body><div id="z"></div></body></html>');
  await p.addScriptTag(vexflow.startsWith('http') ? { url: vexflow } : { path: vexflow });
  await p.addScriptTag({ path: ENGINE });
  const lotes = await p.evaluate(() => {
    const T = window.tmCompletarCompasData, z = document.getElementById('z'), out = [];
    const cartasFig = T.CARTAS_FIG.map(f => T.FIG[f].u), cartasSil = T.CARTAS_SIL.map(f => T.FIG[f].u);
    [1, 2, 3].forEach(nivel => ['simples', 'compuestos', 'mezcla'].forEach(grupo => {
      for (let s = 0; s < 12; s++) {
        const items = T.generar({ nivel, grupo, n: 8 }, 2000 + s * 977 + nivel * 31);
        const dibujos = items.map(it => {
          const d = document.createElement('div'); z.appendChild(d);
          T.dibujar(d, it, { w: 440 });
          const oculto = d.__tmDibujo;
          T.dibujar(d, it, { w: 440, revelar: true });
          const revelado = d.__tmDibujo;
          // Con la respuesta del alumno: el hueco se rellena con semicorcheas que suman lo mismo.
          const resp = Array.from({ length: it.valor / 4 }, () => ({ f: 'sc', s: false }));
          T.dibujar(d, it, { w: 440, respuesta: resp });
          const conRespuesta = d.__tmDibujo;
          // Respuesta a medias: solo la primera figura de lo que falta.
          T.dibujar(d, it, { w: 440, respuesta: [it.faltan[0]], parcial: true });
          const parcial = d.__tmDibujo;
          z.removeChild(d);
          return { oculto, revelado, conRespuesta, parcial };
        });
        out.push({ nivel, grupo, semilla: 2000 + s * 977 + nivel * 31, items, dibujos });
      }
    }));
    return { lotes: out, cartasFig, cartasSil };
  });
  let compases = 0;
  const cartas = lotes.cartasFig;
  if (new Set(cartas).size !== cartas.length) mal(etiqueta, 'dos cartas de figura con el mismo valor: la respuesta no sería única');
  for (const lote of lotes.lotes) {
    if (lote.items.length < 6) mal(`${etiqueta} nivel ${lote.nivel} ${lote.grupo} #${lote.semilla}`, `solo ${lote.items.length} compases de 8`);
    lote.items.forEach((it, i) => {
      compases++;
      const donde = `${etiqueta} nivel ${lote.nivel} ${lote.grupo} #${lote.semilla} nº${i + 1} (${it.compas})`;
      if (lote.grupo === 'simples' && !SIMPLES.includes(it.compas)) mal(donde, 'compás compuesto en «simples»');
      if (lote.grupo === 'compuestos' && !COMPUESTOS.includes(it.compas)) mal(donde, 'compás simple en «compuestos»');
      revisarCompas(donde, it);
      // Respuesta única en la paleta (niveles 1 y 2).
      if (it.nivel < 3) {
        const e = it.faltan[0];
        const lista = e.s ? lotes.cartasSil : cartas;
        if (lista.filter(u => u === U[e.f]).length !== 1) mal(donde, `${e.f} aparece ${lista.filter(u => u === U[e.f]).length} veces en la paleta`);
      }
      // Lo dibujado.
      const { oculto, revelado, conRespuesta } = lote.dibujos[i];
      // Al dibujar la respuesta del alumno, en el hueco tiene que estar SU respuesta, no la de la partitura.
      const enHueco = conRespuesta.notas.filter(x => x.hueco);
      if (enHueco.length !== it.valor / 4 || enHueco.some(x => x.f !== 'sc')) mal(donde, 'al dibujar la respuesta del alumno no aparece lo que ha puesto');
      if (conRespuesta.notas.reduce((a, x) => a + x.u, 0) !== TIEMPO[it.compas] * TIEMPOS[it.compas]) mal(donde, 'con la respuesta del alumno el compás no suma lo que cabe');
      // A medias: la figura puesta se ve, y lo que queda sigue siendo hueco y suma justo lo que falta.
      const { parcial } = lote.dibujos[i];
      const puestas = parcial.notas.filter(x => x.hueco && !x.fantasma), restos = parcial.notas.filter(x => x.fantasma);
      if (puestas.length !== 1 || puestas[0].f !== it.faltan[0].f) mal(donde, 'con respuesta parcial no se ve la figura puesta');
      const queda = it.valor - U[it.faltan[0].f];
      if (restos.reduce((a, x) => a + x.u, 0) !== queda) mal(donde, `con respuesta parcial el hueco restante suma ${restos.reduce((a, x) => a + x.u, 0)} y debería ${queda}`);
      if (queda > 0 && !restos.length) mal(donde, 'con respuesta parcial desaparece el hueco');
      if (queda === 0 && restos.length) mal(donde, 'con la respuesta completa sigue habiendo hueco');
      const fantasmas = oculto.notas.filter(x => x.fantasma).length;
      if (fantasmas !== it.faltan.length) mal(donde, `${fantasmas} huecos dibujados y faltan ${it.faltan.length}`);
      if (revelado.notas.some(x => x.fantasma)) mal(donde, 'al revelar sigue habiendo huecos');
      if (revelado.notas.length !== it.elems.length) mal(donde, 'al revelar no salen todas las figuras');
      // Cada figura con puntillo tiene que llevar su puntillo DIBUJADO (Eduardo vio que faltaban).
      revelado.notas.forEach((x, k) => {
        const esperados = /P$/.test(x.f) ? 1 : 0;
        if (x.puntillos !== esperados) mal(donde, `la figura ${k + 1} (${x.f}) lleva ${x.puntillos} puntillos dibujados y debería llevar ${esperados}`);
      });
      const t = TIEMPO[it.compas];
      [oculto, revelado].forEach(dib => dib.barras.forEach(g => {
        const tiempos = new Set(g.map(t0 => Math.floor(t0 / t)));
        if (tiempos.size !== 1) mal(donde, 'una barra une notas de tiempos distintos');
      }));
    });
  }
  await p.close();
  if (errs.length) mal(etiqueta, 'errores: ' + errs.slice(0, 3).join(' | '));
  console.log(`  ${etiqueta}: ${compases} compases revisados`);
  return compases;
}

/* En la página: resolver bien y mal en cada nivel. */
async function enPagina(browser) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
  const caja = p.locator('#tmcc');
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-cc-modo[data-n="' + nivel + '"]').click();
    let bien = 0, malas = 0;
    for (let q = 0; q < 8; q++) {
      if (await caja.locator('.tm-cc-nota').count()) break;
      // Lo que falta, según el propio dibujo (no según la solución escondida).
      const objetivo = await p.evaluate(() => {
        const d = document.querySelector('#tmcc .tm-cc-dibujo > div').__tmDibujo;
        return d.notas.filter(x => x.fantasma).map(x => ({ f: x.f, s: x.s }));
      });
      const cartas = await caja.locator('.tm-cc-carta small').allTextContents();
      const nombreDe = (f, s) => (s ? 'silencio de ' : '') + { r: 'redonda', rP: 'redonda con puntillo', b: 'blanca', bP: 'blanca con puntillo', n: 'negra', nP: 'negra con puntillo', c: 'corchea', cP: 'corchea con puntillo', sc: 'semicorchea' }[f];
      const acertar = q % 2 === 0;
      if (acertar) {
        for (const e of objetivo) {
          const i = cartas.indexOf(nombreDe(e.f, e.s));
          if (i < 0) { mal(`nivel ${nivel}`, `no hay carta para ${nombreDe(e.f, e.s)}`); break; }
          await caja.locator('.tm-cc-carta').nth(i).click();
        }
      } else {
        // Una respuesta mal a propósito. En el nivel 3 faltan al menos dos figuras
        // (8 semifusas o más), así que una semicorchea sola (4) nunca suma lo que
        // falta; en los otros niveles, cualquier carta distinta de la que falta.
        const e = objetivo[0];
        const i = nivel === 3 ? cartas.indexOf('semicorchea') : cartas.findIndex(c => c !== nombreDe(e.f, e.s));
        await caja.locator('.tm-cc-carta').nth(i).click();
      }
      await caja.locator('.tm-cc-btn').click();
      const fb = await caja.locator('.tm-cc-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 80));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 80));
      if (acertar) bien++; else malas++;
      await caja.locator('.tm-cc-btn').click();
    }
    const nota = await caja.locator('.tm-cc-nota').textContent();
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
  console.log(`\n  ${a + b} compases · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
