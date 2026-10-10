'use strict';
/**
 * Banco de pruebas del ejercicio de síncopas (sincopa-engine.js): el test interactivo (normal y difícil) y la variante de
 * impresión que usa la ficha.
 *
 *   node tools/servidor-estatico.js                      (en otra terminal)
 *   node tools/test-motor-sincopa.js --version=vexflow   # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-sincopa.js --version=verovio   # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=4 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado el motor plantea fragmentos que se vuelven a generar aqui con el mismo generador (window.tmSincopaGenerar),
 * y se comprueba que el DIBUJO dice lo mismo que los datos:
 *   - cada figura esta en su altura (clave de Sol), es nota o silencio, y con Verovio ademas: cabeza, corchetes, puntillos, barras y compas;
 *   - las ligaduras unen las notas que tienen que unir (y solo esas);
 *   - la cifra del compas dibujada es la del fragmento;
 *   - cada nota (y silencio) esta DENTRO de su carril de clic (elementFromPoint), y cada carril es de su grupo;
 *   - contestar lo correcto da «Correcto» y contestar mal da «Incorrecto»;
 *   - en la variante de impresion con soluciones, en rojo estan las notas y ligaduras de las sincopas y nada mas.
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 4));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/compases/sincopa/';
const MOTOR = 'assets/js/sincopa-engine.js';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const pasoDe = (key) => { const [l, o] = key.split('/'); return Number(o) * 7 + LETRAS.indexOf(l); };

/** Dentro de la pagina: lee un <svg> de Verovio o de VexFlow. */
function leerEnPagina(svg) {
  const caja = svg.getBoundingClientRect();
  const verovio = !svg.querySelector('.vf-stavenote');
  const horiz = [...svg.querySelectorAll('path, rect, line')].map((e) => e.getBoundingClientRect())
    .filter((b) => b.height < 2.5 && b.width > caja.width * 0.3 && b.width > 20).map((b) => Math.round((b.top + b.height / 2) * 100) / 100);
  const unicas = [...new Set(horiz)].sort((a, b) => a - b);
  let lineas = null;
  for (let i = 0; i + 4 < unicas.length && !lineas; i++) {
    const d = unicas[i + 1] - unicas[i];
    if ([2, 3, 4].every((k) => Math.abs(unicas[i + k] - unicas[i + k - 1] - d) < 0.7)) lineas = unicas.slice(i, i + 5);
  }
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const medidas = [...svg.querySelectorAll('.measure')];
  const figuras = [...svg.querySelectorAll(verovio ? '.note, .rest' : '.vf-stavenote')].map((g) => {
    const cabeza = g.querySelector(verovio ? '.notehead use' : '.vf-notehead');
    const cb = cabeza && cabeza.getBoundingClientRect();
    const gb = g.getBoundingClientRect();
    const r = {
      silencio: verovio ? g.classList.contains('rest') : null,   // VexFlow dibuja el silencio como una «cabeza» mas: no se distingue
      y: cb ? cb.top + cb.height / 2 : null, x: cb ? cb.left + cb.width / 2 : gb.left + gb.width / 2,
      cx: gb.left + gb.width / 2, cy: gb.top + gb.height / 2,
      rojo: /c0392b/i.test(g.outerHTML),
    };
    if (verovio) {
      r.cabeza = cabeza ? id(cabeza) : null;
      r.glifoSilencio = g.classList.contains('rest') ? id(g.querySelector('use')) : null;
      r.corchetes = [...g.querySelectorAll('.flag use')].map(id);
      r.puntillos = g.querySelectorAll('.dots ellipse').length;
      r.enBarra = !!g.closest('.beam');
      r.medida = medidas.indexOf(g.closest('.measure'));
    }
    return r;
  });
  const ligaduras = [...svg.querySelectorAll(verovio ? '.tie' : '.vf-stavetie')].map((t) => { const b = t.getBoundingClientRect(); return { izq: b.left, der: b.right, rojo: /c0392b/i.test(t.outerHTML) }; });
  return {
    verovio, lineas, figuras, ligaduras,
    cifra: [...svg.querySelectorAll('.meterSig use')].map(id),
    carriles: [...svg.querySelectorAll('.tm-si-lane')].map((r) => { const b = r.getBoundingClientRect(); return { idx: Number(r.dataset.idx), izq: b.left, der: b.right, trazo: getComputedStyle(r).stroke }; }),
  };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function abrir(browser, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + URL, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(URL.replace(/^\//, '') + 'index.html') }));
    for (const f of ['assets/js/sincopa-engine.js', 'assets/js/ficha-sincopa-engine.js']) {
      await page.route('**/' + f + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(f) }));
    }
  }
  await page.goto(BASE + URL, { waitUntil: 'load' });
  return { ctx, page };
}

/** Compara el dibujo con los datos del fragmento. Devuelve la lista de discrepancias. */
function compararDibujo(frag, d) {
  const mal = [];
  if (!d.lineas) return ['no se ven las 5 lineas del pentagrama'];
  const esp = (d.lineas[4] - d.lineas[0]) / 4;
  if (d.figuras.length !== frag.notas.length) return [`el dibujo tiene ${d.figuras.length} figuras y el fragmento ${frag.notas.length}`];
  const enBarra = new Set((frag.beams || []).flat());
  frag.notas.forEach((n, i) => {
    const f = d.figuras[i], rest = n.duration === '8r';
    if (f.silencio !== null && f.silencio !== rest) { mal.push(`figura ${i + 1}: ${rest ? 'debia ser silencio' : 'debia ser nota'}`); return; }
    if (!rest) {
      const paso = 30 + Math.round((d.lineas[4] - f.y) / (esp / 2));
      if (paso !== pasoDe(n.keys[0])) mal.push(`figura ${i + 1}: se pide ${n.keys[0]} y el dibujo la pone en el paso ${paso} (esperado ${pasoDe(n.keys[0])})`);
    }
    if (d.verovio) {
      if (f.medida !== n.measure) mal.push(`figura ${i + 1}: esta en el compas ${f.medida + 1} y deberia estar en el ${n.measure + 1}`);
      if (rest) { if (f.glifoSilencio !== 'E4E6') mal.push(`figura ${i + 1}: silencio de corchea esperado (E4E6) y es ${f.glifoSilencio}`); return; }
      if (f.cabeza !== 'E0A4') mal.push(`figura ${i + 1}: cabeza de negra esperada (E0A4) y es ${f.cabeza}`);
      const base = n.duration.replace('d', '');
      const nBarras = base === '8' ? 1 : base === '16' ? 2 : 0;
      if (enBarra.has(i) !== f.enBarra) mal.push(`figura ${i + 1}: ${enBarra.has(i) ? 'deberia ir en una barra' : 'no deberia ir en una barra'}`);
      const esperadoCorchetes = enBarra.has(i) ? 0 : nBarras;
      if (f.corchetes.length !== esperadoCorchetes) mal.push(`figura ${i + 1}: ${esperadoCorchetes} corchete(s) esperados y hay ${f.corchetes.length}`);
      else if (esperadoCorchetes) {
        const ok = base === '8' ? ['E240', 'E241'] : ['E242', 'E243'];
        if (!ok.includes(f.corchetes[0])) mal.push(`figura ${i + 1}: corchete ${f.corchetes[0]} y esperado uno de ${ok}`);
      }
      const puntillos = n.duration.endsWith('d') ? 1 : 0;
      if (f.puntillos !== puntillos) mal.push(`figura ${i + 1}: ${puntillos} puntillo(s) esperados y hay ${f.puntillos}`);
    }
  });
  // ligaduras: cada una une la nota de salida con la de llegada
  const esperadas = (frag.ligaduras || []).slice().sort((a, b) => a[0] - b[0]);
  if (d.ligaduras.length !== esperadas.length) mal.push(`${esperadas.length} ligadura(s) esperadas y se dibujan ${d.ligaduras.length}`);
  else {
    const mas = (x) => d.figuras.reduce((m, f, i) => (Math.abs(f.x - x) < Math.abs(d.figuras[m].x - x) ? i : m), 0);
    const dibujadas = d.ligaduras.slice().sort((a, b) => a.izq - b.izq);
    esperadas.forEach((par, k) => {
      const a = mas(dibujadas[k].izq), b = mas(dibujadas[k].der);
      if (a !== par[0] || b !== par[1]) mal.push(`ligadura ${k + 1}: une las figuras ${a + 1}-${b + 1} y debia unir ${par[0] + 1}-${par[1] + 1}`);
    });
  }
  return mal;
}

function compararCifra(frag, d) {
  if (!d.verovio) return [];
  const [num, den] = frag.compasTxt.split('/').map(Number);
  const esperado = ['E08' + num, 'E08' + den];
  return JSON.stringify(d.cifra.slice(0, 2)) === JSON.stringify(esperado) ? [] : [`cifra dibujada ${d.cifra} y esperada ${esperado}`];
}

const gruposDe = (frag) => {
  const g = []; let saltar = -1;
  for (let i = 0; i < frag.notas.length; i++) {
    if (i === saltar) continue;
    const par = (frag.ligaduras || []).find((p) => p[0] === i);
    if (par) { g.push([i, par[1]]); saltar = par[1]; } else g.push([i]);
  }
  return g;
};

async function probarTest(browser, modo, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${modo ? 'dificil' : 'normal'} p${q}: ${m}`);
  try {
    await page.waitForSelector('#tmsi .tm-si-mode-btn');
    // se reinicia el azar justo antes de elegir el modo: asi los fragmentos se pueden volver a generar igual
    await page.evaluate(sembrar, semilla);
    const frags = await page.evaluate(([s, dif]) => {
      const f = []; for (let i = 0; i < 10; i++) f.push(dif ? tmSincopaGenerarDificil(Math.random) : tmSincopaGenerar(Math.random)); return f;
    }, [semilla, modo]);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmsi .tm-si-mode-btn').nth(modo).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++;
      const frag = frags[q - 1];
      await page.waitForSelector('#tmsi .tm-si-staff svg');
      const d = await page.evaluate(() => { const s = document.querySelector('#tmsi .tm-si-staff svg'); return window.__leer(s); });
      for (const m of compararDibujo(frag, d)) falla(q, m);
      for (const m of compararCifra(frag, d)) falla(q, m);
      if (d.carriles.some((c) => c.trazo !== 'none')) falla(q, 'los carriles de clic tienen borde visible (stroke ' + d.carriles.find((c) => c.trazo !== 'none').trazo + ')');
      const grupos = gruposDe(frag);
      if (d.carriles.length !== grupos.length) falla(q, `${grupos.length} carriles esperados y hay ${d.carriles.length}`);
      else {
        // cada figura cae dentro del carril de su grupo
        const dentro = await page.evaluate(() => [...document.querySelectorAll('#tmsi .tm-si-staff svg')].map((svg) => {
          const verovio = !svg.querySelector('.vf-stavenote');
          return [...svg.querySelectorAll(verovio ? '.note, .rest' : '.vf-stavenote')].map((g) => {
            const b = g.getBoundingClientRect();
            const e = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
            return e && e.classList.contains('tm-si-lane') ? Number(e.dataset.idx) : null;
          });
        })[0]);
        grupos.forEach((g, gi) => g.forEach((i) => { if (dentro[i] !== gi) falla(q, `la figura ${i + 1} cae en el carril ${dentro[i]} y es del grupo ${gi}`); }));
      }
      // contestar: bien en las impares?? -> pares bien, impares mal
      const correctos = [...new Set(frag.correctas.map((par) => grupos.findIndex((g) => g.includes(par[0]))))];
      const hacerBien = q % 2 === 0;
      const clicLane = async (gi) => {
        const fig = grupos[gi][0];
        await page.mouse.click(d.figuras[fig].cx, d.figuras[fig].cy);
      };
      let elegidos;
      if (hacerBien) {
        if (!correctos.length) await page.locator('#tmsi .tm-si-none').click();
        else for (const gi of correctos) await clicLane(gi);
      } else {
        const otros = grupos.map((_, gi) => gi).filter((gi) => !correctos.includes(gi));
        if (!correctos.length) await clicLane(0);                       // hay que decir «no hay» y se toca una nota
        else if (otros.length) await clicLane(otros[0]);                // se toca una que no es
        else await page.locator('#tmsi .tm-si-none').click();           // todas lo son: se dice «no hay»
      }
      await page.locator('#tmsi .tm-submit').click();
      const clases = await page.locator('#tmsi .tm-fb').evaluate((e) => e.className);
      if (hacerBien && !/tm-ok/.test(clases)) falla(q, 'se contesta lo correcto y el motor no dice «Correcto»');
      if (!hacerBien && !/tm-ko/.test(clases)) falla(q, 'se contesta mal y el motor no dice «Incorrecto»');
      await page.locator('#tmsi .tm-nxt').click();
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

async function probarImpresion(browser, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let n = 0;
  try {
    await page.waitForSelector('#tmsi .tm-si-mode-btn');
    for (const dif of [false, true]) {
      const frags = await page.evaluate(([s, dif]) => { const rng = tmSincopaMulberry32(s); const f = []; for (let i = 0; i < 12; i++) f.push(dif ? tmSincopaGenerarDificil(rng) : tmSincopaGenerar(rng)); return f; }, [semilla, dif]);
      for (const solucion of [false, true]) {
        for (let i = 0; i < frags.length; i++) {
          n++;
          const frag = frags[i];
          const d = await page.evaluate(([f, sol]) => {
            const div = document.createElement('div'); div.style.width = '700px'; document.body.appendChild(div);
            const svg = tmSincopaDibujarImpresion(div, f, sol);
            const r = window.__leer(svg); div.remove(); return r;
          }, [frag, solucion]);
          const etiqueta = `semilla ${semilla} impresion ${dif ? 'dificil' : 'normal'}${solucion ? '+sol' : ''} #${i + 1}`;
          for (const m of compararDibujo(frag, d)) fallos.push(`${etiqueta}: ${m}`);
          for (const m of compararCifra(frag, d)) fallos.push(`${etiqueta}: ${m}`);
          const rojasEsp = new Set(solucion ? frag.correctas.flat() : []);
          d.figuras.forEach((f, k) => { if (f.rojo !== rojasEsp.has(k)) fallos.push(`${etiqueta}: la figura ${k + 1} ${f.rojo ? 'esta en rojo y no deberia' : 'deberia estar en rojo'}`); });
          const esp = (frag.ligaduras || []).slice().sort((a, b) => a[0] - b[0]);
          const dib = d.ligaduras.slice().sort((a, b) => a.izq - b.izq);
          esp.forEach((par, k) => {
            const debe = solucion && frag.correctas.some((c) => c[0] === par[0] && c[1] === par[1]);
            if (dib[k] && dib[k].rojo !== debe) fallos.push(`${etiqueta}: la ligadura ${k + 1} ${dib[k].rojo ? 'esta en rojo y no deberia' : 'deberia estar en rojo'}`);
          });
        }
      }
    }
  } catch (e) { fallos.push('impresion: ' + String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas: n, fallos };
}

(async () => {
  const browser = await chromium.launch();
  // la funcion de lectura se inyecta como global en cada pagina
  const fuente = leerEnPagina.toString();
  const origNueva = browser.newContext.bind(browser);
  browser.newContext = async (o) => { const c = await origNueva(o); await c.addInitScript(`window.__leer = ${fuente};`); return c; };
  let total = 0, mal = 0;
  const bloques = [['test normal', (s) => probarTest(browser, 0, s)], ['test dificil', (s) => probarTest(browser, 1, s)], ['impresion', (s) => probarImpresion(browser, s)]];
  for (const [nombre, f] of bloques) {
    let p = 0; const fs = [];
    for (let s = 1; s <= SEMILLAS; s++) { const r = await f(s * 7919); p += r.preguntas; fs.push(...r.fallos); }
    total += p; mal += fs.length;
    console.log(`${fs.length ? '✗' : '✓'} ${nombre.padEnd(12)} ${String(p).padStart(4)} fragmentos · ${fs.length} discrepancias`);
    fs.slice(0, 8).forEach((x) => console.log('     - ' + x));
    if (fs.length > 8) console.log(`     … y ${fs.length - 8} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} fragmentos`);
  process.exit(mal ? 1 : 0);
})();
