'use strict';
/**
 * Banco de pruebas de «¿Qué cadencia es?» (cadencias-engine.js) y de su ficha: dos acordes a cuatro voces en un pentagrama de
 * piano (clave de sol y de fa con llave).
 *
 *   node tools/servidor-estatico.js                          (en otra terminal)
 *   node tools/test-motor-cadencias.js --version=vexflow     # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-cadencias.js --version=verovio     # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se vuelven a generar las mismas cadencias (tmCadenciasTest.generarLote). Se comprueba:
 *   - lo que el motor dice haber dibujado (__tmInfo) son los acordes generados;
 *   - con Verovio SE LEE EL DIBUJO, pentagrama por pentagrama: las claves (sol arriba, fa abajo), la armadura en los dos,
 *     la llave, y en cada compas las dos notas de cada voz (altura contra las 5 lineas de SU pentagrama; soprano y contralto
 *     arriba, tenor y bajo abajo), todas redondas, sin alteraciones sueltas, y la doble barra final;
 *   - elegir el tipo de cadencia correcto da «Correcto» y otro da «No es correcto».
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/cadencias/';
const MOTORES = ['assets/js/cadencias-engine.js', 'assets/js/tipo-de-comienzo-engine.js', 'assets/js/completar-compas-engine.js', 'assets/js/ficha-cadencias-engine.js'];
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const ARMADURA = { C: 0, G: 1, D: 2, F: -1, Bb: -2, A: 3, Eb: -3 };
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const pasoDe = (key) => { const [l, o] = key.split('/'); return Number(o) * 7 + LETRAS.indexOf(l); };
const BASE_PASO = { sol: 30, fa: 18 };   // nota de la linea inferior: Mi 4 en clave de Sol, Sol 2 en clave de Fa

/** Dentro de la pagina: lee un <svg> de Verovio con un sistema de dos pentagramas. */
function leerSistema(svg) {
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const medidas = [...svg.querySelectorAll('.measure')].map((m) => ({
    pentagramas: [...m.querySelectorAll(':scope > .staff')].map((st) => ({
      lineas: [...st.querySelectorAll(':scope > path')].map((p) => { const b = p.getBoundingClientRect(); return b.top + b.height / 2; }),
      notas: [...st.querySelectorAll('.note')].map((n) => {
        const c = n.querySelector('.notehead use'), b = c.getBoundingClientRect();
        return { cabeza: id(c), y: b.top + b.height / 2, alteraciones: n.querySelectorAll('.accid use').length, plica: !!n.querySelector('.stem') };
      }),
      claves: [...st.querySelectorAll('.clef use')].map(id),
      armadura: [...st.querySelectorAll('.keySig use')].map(id),
    })),
    barras: [...m.querySelectorAll('.barLine')].map((g) => g.querySelectorAll('path').length),
  }));
  return { medidas, llave: !!svg.querySelector('.grpSym') };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function abrir(browser, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leerSistema.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + URL, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(URL.replace(/^\//, '') + 'index.html') }));
    for (const f of MOTORES) await page.route('**/' + f + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(f) }));
  }
  await page.goto(BASE + URL, { waitUntil: 'load' });
  return { ctx, page };
}

function comparar(lec, it) {
  const mal = [];
  const arm = ARMADURA[it.tonalidad], tipo = arm > 0 ? 'E262' : 'E260';
  if (!lec.llave) mal.push('falta la llave del piano');
  if (lec.medidas.length !== 2) return mal.concat(`${lec.medidas.length} compases dibujados y deberian ser 2`);
  lec.medidas.forEach((m, i) => {
    if (m.pentagramas.length !== 2) { mal.push(`compas ${i + 1}: ${m.pentagramas.length} pentagramas`); return; }
    const voces = [[it.acordes[i].A, it.acordes[i].S], [it.acordes[i].B, it.acordes[i].T]];
    ['sol', 'fa'].forEach((clave, s) => {
      const p = m.pentagramas[s], etq = `compas ${i + 1} ${clave === 'sol' ? 'clave de sol' : 'clave de fa'}`;
      if (i === 0) {
        const esp = clave === 'sol' ? 'E050' : 'E062';
        if (p.claves.length !== 1 || p.claves[0] !== esp) mal.push(`${etq}: clave ${p.claves} y esperada ${esp}`);
        if (p.armadura.length !== Math.abs(arm) || p.armadura.some((g) => g !== tipo)) mal.push(`${etq}: armadura [${p.armadura}] y esperada ${Math.abs(arm)} x ${arm === 0 ? 'ninguna' : tipo} (${it.tonalidad})`);
      }
      if (p.lineas.length !== 5) { mal.push(`${etq}: ${p.lineas.length} lineas en vez de 5`); return; }
      const sp = (p.lineas[4] - p.lineas[0]) / 4;
      const obtenidas = p.notas.map((n) => BASE_PASO[clave] + Math.round((p.lineas[4] - n.y) / (sp / 2))).sort((a, b) => a - b);
      const esperadas = voces[s].map(pasoDe).sort((a, b) => a - b);
      if (JSON.stringify(obtenidas) !== JSON.stringify(esperadas)) mal.push(`${etq}: notas dibujadas ${obtenidas} y esperadas ${esperadas}`);
      p.notas.forEach((n) => {
        if (n.cabeza !== 'E0A2') mal.push(`${etq}: cabeza ${n.cabeza} y esperada redonda (E0A2)`);
        if (n.alteraciones) mal.push(`${etq}: alteracion suelta (deberia ir solo la armadura)`);
        if (n.plica) mal.push(`${etq}: la redonda lleva plica`);
      });
    });
  });
  // barras: una sencilla tras el primer acorde y la doble final tras el segundo (dos trazos por cada uno de la sencilla)
  const ultimas = lec.medidas.map((m) => m.barras[m.barras.length - 1]);
  if (!(ultimas[0] >= 1 && ultimas[1] === 2 * ultimas[0])) mal.push(`barras de compas [${lec.medidas.map((m) => m.barras)}]: se esperaba una sencilla y una doble final`);
  return mal;
}

async function probar(browser, nivel, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector('#tmcd .tm-cd-modo');
    await page.evaluate(sembrar, semilla);
    const items = await page.evaluate((n) => window.tmCadenciasTest.generarLote({ nivel: n }), nivel);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmcd .tm-cd-modo').nth(nivel - 1).click();
    for (let q = 1; q <= items.length; q++) {
      preguntas++;
      const it = items[q - 1];
      await page.waitForSelector('#tmcd .tm-cd-dibujo svg');
      const info = await page.evaluate(() => document.querySelector('#tmcd .tm-cd-dibujo > div').__tmInfo);
      if (JSON.stringify(info.acordes) !== JSON.stringify(it.acordes)) falla(q, 'el motor dice haber dibujado otros acordes que los generados');
      if (verovio) {
        const lec = await page.evaluate(() => window.__leer(document.querySelector('#tmcd .tm-cd-dibujo svg')));
        for (const m of comparar(lec, it)) falla(q, m);
      }
      const opciones = await page.locator('#tmcd .tm-cd-op').evaluateAll((els) => els.map((e) => e.getAttribute('data-t')));
      const bien = q % 2 === 1;
      const elegido = bien ? it.tipo : opciones.find((t) => t !== it.tipo);
      await page.locator(`#tmcd .tm-cd-op[data-t="${elegido}"]`).click();
      const ok = await page.locator('#tmcd .tm-cd-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `elegir ${elegido} (era ${it.tipo}) se corrige como ${ok ? 'acierto' : 'fallo'}`);
      await page.locator('#tmcd .tm-cd-btn').click();
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const nivel of [1, 2, 3]) {
    let p = 0; const fs = [];
    for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, nivel, s * 7919); p += r.preguntas; fs.push(...r.fallos); }
    total += p; mal += fs.length;
    console.log(`${fs.length ? '✗' : '✓'} nivel ${nivel}  ${String(p).padStart(3)} cadencias · ${fs.length} discrepancias`);
    fs.slice(0, 8).forEach((x) => console.log('     - ' + x));
    if (fs.length > 8) console.log(`     … y ${fs.length - 8} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} cadencias`);
  process.exit(mal ? 1 : 0);
})();
