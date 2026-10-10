'use strict';
/**
 * Banco de pruebas del test de articulación (articulacion-engine.js): «nombre → signo», «signo → nombre» y mezclado.
 *
 *   node tools/servidor-estatico.js                          (en otra terminal)
 *   node tools/test-motor-articulacion.js --version=vexflow  # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-articulacion.js --version=verovio  # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=4 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se pasan los tres modos. Con Verovio se LEE EL DIBUJO de cada signo (no los datos del motor):
 *   - dos negras, mi4 y sol4, con plica arriba;
 *   - staccato, acento, tenuto y marcato: el glifo correspondiente debajo de CADA cabeza; legato: una ligadura por debajo
 *     que une las dos notas y ningun signo suelto;
 * y se comprueba que el signo que se ve es el que el motor da por bueno: se contesta lo que se ve (y debe decir «Correcto»)
 * y se contesta otra cosa (y debe decir «Incorrecto»). Con VexFlow solo se pueden comprobar los flujos (el dibujo son trazados).
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 4));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/articulacion/';
const MOTOR = 'assets/js/articulacion-engine.js';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const GLIFO_A_ID = { E4A3: 'staccato', E4A1: 'acento', E4A5: 'tenuto', E4AD: 'marcato' };
const NOMBRE_A_ID = { Legato: 'legato', Staccato: 'staccato', Acento: 'acento', Tenuto: 'tenuto', Marcato: 'marcato' };

/** Dentro de la pagina: lee un <svg> de Verovio. */
function leerMini(svg) {
  const lineas = [...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return b.top + b.height / 2; });
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const notas = [...svg.querySelectorAll('.note')].map((n) => {
    const hb = n.querySelector('.notehead use').getBoundingClientRect();
    const st = n.querySelector('.stem path');
    const sb = st && st.getBoundingClientRect();
    return {
      x: hb.left + hb.width / 2, y: hb.top + hb.height / 2,
      plicaArriba: !!sb && sb.top < hb.top + hb.height / 2 - 5,
      glifos: [...n.querySelectorAll('.artic use')].map((u) => ({ id: id(u), y: u.getBoundingClientRect().top + u.getBoundingClientRect().height / 2 })),
    };
  });
  const lig = [...svg.querySelectorAll('.slur')].map((s) => { const b = s.getBoundingClientRect(); return { izq: b.left, der: b.right, y: b.top + b.height / 2 }; });
  return { lineas, notas, lig, anchoVisible: svg.getBoundingClientRect().width };
}

/** Qué articulación dice el dibujo (o un error). */
function interpretar(d) {
  if (d.lineas.length !== 5) throw new Error('no se ven las 5 lineas');
  const esp = (d.lineas[4] - d.lineas[0]) / 4;
  if (d.notas.length !== 2) throw new Error(`hay ${d.notas.length} notas y deberian ser 2`);
  const pasos = d.notas.map((n) => 30 + Math.round((d.lineas[4] - n.y) / (esp / 2)));
  if (pasos[0] !== 30 || pasos[1] !== 32) throw new Error(`las notas estan en los pasos ${pasos} y deberian ser mi4 (30) y sol4 (32)`);
  if (!d.notas.every((n) => n.plicaArriba)) throw new Error('las plicas no van hacia arriba');
  const todos = d.notas.map((n) => n.glifos);
  if (todos.every((g) => g.length === 0)) {
    if (d.lig.length !== 1) throw new Error(`legato esperado: ${d.lig.length} ligaduras en vez de 1`);
    const l = d.lig[0];
    if (!(l.izq <= d.notas[0].x + esp && l.der >= d.notas[1].x - esp)) throw new Error('la ligadura no une las dos notas');
    if (!(l.y > Math.max(d.notas[0].y, d.notas[1].y))) throw new Error('la ligadura no va por debajo');
    return 'legato';
  }
  if (d.lig.length) throw new Error('hay signo de articulacion y ligadura a la vez');
  if (!todos.every((g) => g.length === 1)) throw new Error('cada nota debe llevar un solo signo');
  if (todos[0][0].id !== todos[1][0].id) throw new Error('las dos notas llevan signos distintos');
  d.notas.forEach((n, i) => { if (!(n.glifos[0].y > n.y)) throw new Error(`el signo de la nota ${i + 1} no esta debajo de la cabeza`); });
  const a = GLIFO_A_ID[todos[0][0].id];
  if (!a) throw new Error('glifo desconocido ' + todos[0][0].id);
  return a;
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function probar(browser, modo, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leerMini = ${leerMini.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + URL, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(URL.replace(/^\//, '') + 'index.html') }));
    await page.route('**/' + MOTOR + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(MOTOR) }));
  }
  await page.goto(BASE + URL, { waitUntil: 'load' });
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} modo ${modo} p${q}: ${m}`);
  try {
    await page.locator('#tmart .tm-iv-mode-btn').nth(modo).click();
    const total = await page.locator('#tmart .tm-iv-counter').textContent().then((t) => Number(t.split('/')[1]));
    const vistas = new Set();
    for (let q = 1; q <= total; q++) {
      preguntas++;
      const texto = await page.locator('#tmart .tm-construir-q').textContent();
      const n2s = /signo de/.test(texto);
      const verovio = VERSION === 'verovio';
      let respuesta, otra;   // data-v de la opcion correcta y de una incorrecta
      if (n2s) {
        const nombre = /signo de ([^\s?]+)/.exec(texto)[1];
        const objetivo = NOMBRE_A_ID[nombre[0] + nombre.slice(1).toLowerCase()];
        const opciones = await page.locator('#tmart .tm-opt-signo').evaluateAll((els) => els.map((e) => ({ v: e.dataset.v, d: window.__leerMini(e.querySelector('svg')) })));
        if (opciones.length !== 5) falla(q, `${opciones.length} opciones y deberian ser 5`);
        const vistos = [];
        opciones.forEach((o) => {
          if (!verovio) { vistos.push(o.v); return; }
          try { const k = interpretar(o.d); vistos.push(k); if (k !== o.v) falla(q, `la opcion ${o.v} dibuja ${k}`); } catch (e) { falla(q, `opcion ${o.v}: ${e.message}`); }
        });
        if (new Set(vistos).size !== 5) falla(q, 'las 5 opciones no dibujan 5 signos distintos');
        respuesta = verovio ? (opciones.find((o) => { try { return interpretar(o.d) === objetivo; } catch (e) { return false; } }) || {}).v : objetivo;
        otra = opciones.map((o) => o.v).find((v) => v !== objetivo);
        vistas.add(objetivo + '>s');
        if (q % 2 === 0) { respuesta = otra; }
        await page.locator(`#tmart .tm-opt-signo[data-v="${respuesta}"]`).click();
        await page.locator('#tmart .tm-submit').click();
        const bien = await page.locator('#tmart .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
        if (q % 2 === 0 ? bien : !bien) falla(q, q % 2 === 0 ? 'se contesta mal y el motor dice «Correcto»' : 'se contesta lo que se ve y el motor no dice «Correcto»');
      } else {
        const d = await page.evaluate(() => window.__leerMini(document.querySelector('#tmart .tm-staff svg')));
        let visto = null;
        if (verovio) { try { visto = interpretar(d); } catch (e) { falla(q, e.message); } }
        const botones = await page.locator('#tmart .tm-opt').evaluateAll((els) => els.map((e) => ({ v: e.dataset.v, t: e.textContent })));
        if (botones.length !== 5) falla(q, `${botones.length} botones y deberian ser 5`);
        if (!verovio) {   // sin leer el dibujo: se contesta por orden y se comprueba que el motor corrige coherentemente
          visto = botones[0].v;
          await page.locator(`#tmart .tm-opt[data-v="${visto}"]`).click();
          await page.locator('#tmart .tm-submit').click();
          const ok = await page.locator('#tmart .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
          const era = await page.locator('#tmart .tm-fb strong').first().textContent();
          if (!ok && !/Incorrecto/.test(era)) falla(q, 'corrección incoherente');
        } else {
          const elegido = q % 2 === 0 ? botones.find((b) => b.v !== visto).v : visto;
          await page.locator(`#tmart .tm-opt[data-v="${elegido}"]`).click();
          await page.locator('#tmart .tm-submit').click();
          const bien = await page.locator('#tmart .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
          if (q % 2 === 0 ? bien : !bien) falla(q, q % 2 === 0 ? 'se contesta mal y el motor dice «Correcto»' : `se ve ${visto}, se contesta ${visto} y el motor no dice «Correcto»`);
          vistas.add(visto + '>n');
        }
      }
      await page.locator('#tmart .tm-nxt').click();
    }
    if (modo === 2 && VERSION === 'verovio' && vistas.size !== 10) falla('fin', `en el modo mezclado salen ${vistas.size} combinaciones distintas y deberian ser 10`);
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const [modo, nombre] of [[0, 'nombre → signo'], [1, 'signo → nombre'], [2, 'mezclado']]) {
    let p = 0; const fs = [];
    for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, modo, s * 7919); p += r.preguntas; fs.push(...r.fallos); }
    total += p; mal += fs.length;
    console.log(`${fs.length ? '✗' : '✓'} ${nombre.padEnd(15)} ${String(p).padStart(3)} preguntas · ${fs.length} discrepancias`);
    fs.slice(0, 8).forEach((x) => console.log('     - ' + x));
    if (fs.length > 8) console.log(`     … y ${fs.length - 8} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
