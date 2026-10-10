'use strict';
/**
 * Banco de pruebas de «¿Cómo empieza la melodía?» (tipo-de-comienzo-engine.js) y de su ficha.
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-comienzo.js --version=vexflow    # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-comienzo.js --version=verovio    # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se vuelven a generar las mismas melodias (tmComienzoTest.generarLote). Se comprueba:
 *   - lo que el motor dice haber dibujado (__tmInfo) es lo generado (figuras, notas, duraciones);
 *   - con Verovio SE LEE EL DIBUJO: la armadura (cuantas alteraciones y de que tipo), la cifra del compas, y cada figura:
 *     en su compas, a su altura (clave de Sol), con su cabeza, corchetes, puntillos y silencios, las barras por tiempos y
 *     SIN ninguna alteracion suelta (la nota en la tonalidad la lleva la armadura);
 *   - elegir el tipo correcto da «Correcto» y otro da «No es correcto».
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/comienzo-tetico-anacrusico-acefalo/';
const MOTORES = ['assets/js/tipo-de-comienzo-engine.js', 'assets/js/completar-compas-engine.js', 'assets/js/ficha-comienzo-engine.js'];
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const DUR = {
  w: { cabeza: 'E0A2', silencio: 'E4E3', corchetes: [] }, h: { cabeza: 'E0A3', silencio: 'E4E4', corchetes: [] },
  q: { cabeza: 'E0A4', silencio: 'E4E5', corchetes: [] }, '8': { cabeza: 'E0A4', silencio: 'E4E6', corchetes: ['E240', 'E241'] },
  '16': { cabeza: 'E0A4', silencio: 'E4E7', corchetes: ['E242', 'E243'] },
};
const FIGDUR = { r: ['w', 0], rP: ['w', 1], b: ['h', 0], bP: ['h', 1], n: ['q', 0], nP: ['q', 1], c: ['8', 0], cP: ['8', 1], sc: ['16', 0] };
const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const ARMADURA = { C: 0, G: 1, D: 2, F: -1, Bb: -2, A: 3, Eb: -3 };

/** Dentro de la pagina: lee un <svg> de Verovio con dos compases. */
function leerMelodia(svg) {
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const centro = (e) => { const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; };
  const lineas = [...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; });
  const unicas = [...new Set(lineas)].sort((a, b) => a - b);
  const medidas = [...svg.querySelectorAll('.measure')];
  const dig = (usos) => {
    if (!usos.length) return null;
    const arr = usos.map((u) => { const b = u.getBoundingClientRect(); return { g: id(u), cx: b.left, cy: b.top }; });
    const medio = (Math.min(...arr.map((u) => u.cy)) + Math.max(...arr.map((u) => u.cy))) / 2;
    const num = (l) => l.sort((a, b) => a.cx - b.cx).map((u) => String(Number('0x' + u.g) - 0xE080)).join('');
    return num(arr.filter((u) => u.cy < medio)) + '/' + num(arr.filter((u) => u.cy >= medio));
  };
  const vigas = [...svg.querySelectorAll('.beam')];
  const figuras = [...svg.querySelectorAll('.note, .rest')].map((g) => {
    const cab = g.querySelector('.notehead use');
    return {
      silencio: g.classList.contains('rest'),
      cabeza: cab ? id(cab) : null,
      y: cab ? centro(cab).y : null,
      glifoSilencio: g.classList.contains('rest') ? id(g.querySelector('use')) : null,
      corchetes: [...g.querySelectorAll('.flag use')].map(id),
      puntillos: g.querySelectorAll('.dots ellipse').length,
      alteraciones: g.querySelectorAll('.accid use').length,
      viga: vigas.findIndex((v) => v.contains(g)),
      medida: medidas.indexOf(g.closest('.measure')),
    };
  });
  return {
    lineas: unicas, figuras,
    armadura: [...svg.querySelectorAll('.keySig use')].map(id),
    cifra: dig([...svg.querySelectorAll('.meterSig use')]),
    barras: svg.querySelectorAll('.barLine').length,
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
  await page.addInitScript(`window.__leer = ${leerMelodia.toString()};`);
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
  const arm = ARMADURA[it.tonalidad];
  // armadura
  const glifos = lec.armadura;
  const tipoEsp = arm > 0 ? 'E262' : 'E260';
  if (glifos.length !== Math.abs(arm) || glifos.some((g) => g !== tipoEsp)) mal.push(`armadura dibujada [${glifos}] y esperada ${Math.abs(arm)} x ${arm === 0 ? 'ninguna' : tipoEsp} (${it.tonalidad})`);
  if (lec.cifra !== it.compas) mal.push(`cifra ${lec.cifra} y esperada ${it.compas}`);
  const esp = [];
  it.compases.forEach((c, m) => c.elems.forEach((e) => esp.push({ m, e })));
  if (lec.figuras.length !== esp.length) return mal.concat(`${lec.figuras.length} figuras y ${esp.length} esperadas`);
  if (lec.lineas.length !== 5) return mal.concat('no se ven 5 lineas de pentagrama');
  const sp = (lec.lineas[4] - lec.lineas[0]) / 4;
  const tiempo = TIEMPO[it.compas];
  // barras esperadas por compas
  const enBarra = new Map(); let nb = 0;
  it.compases.forEach((c, m) => {
    let grupo = [];
    const cerrar = () => { if (grupo.length > 1) { nb++; grupo.forEach((x) => enBarra.set(x, nb)); } grupo = []; };
    c.elems.forEach((e, k) => {
      const corta = e.u < 16 && !e.s;
      const clave = m + ':' + k;
      if (!corta || (grupo.length && Math.floor(c.elems[grupo[0].split(':')[1]].t0 / tiempo) !== Math.floor(e.t0 / tiempo))) cerrar();
      if (corta) grupo.push(clave);
    });
    cerrar();
  });
  const vigaDe = new Map();
  let idx = 0;
  it.compases.forEach((c, m) => c.elems.forEach((e, k) => {
    const f = lec.figuras[idx], [dur, pu] = FIGDUR[e.f], D = DUR[dur], etq = `figura ${idx + 1}`;
    idx++;
    if (f.medida !== m) mal.push(`${etq}: esta en el compas ${f.medida + 1} y deberia estar en el ${m + 1}`);
    if (f.silencio !== !!e.s) { mal.push(`${etq} ${e.s ? 'debia ser silencio' : 'debia ser nota'}`); return; }
    if (e.s) { if (f.glifoSilencio !== D.silencio) mal.push(`${etq}: silencio ${f.glifoSilencio} y esperado ${D.silencio}`); }
    else {
      if (f.cabeza !== D.cabeza) mal.push(`${etq}: cabeza ${f.cabeza} y esperada ${D.cabeza}`);
      const paso = 30 + Math.round((lec.lineas[4] - f.y) / (sp / 2));   // clave de Sol: la linea inferior es Mi 4
      if (paso !== e.p) mal.push(`${etq}: dibujada en el paso ${paso} y la nota es ${e.p}`);
      if (f.alteraciones) mal.push(`${etq}: lleva una alteracion suelta (deberia ir solo la armadura)`);
      const b = enBarra.get(m + ':' + k);
      const hay = b ? 0 : (D.corchetes.length ? 1 : 0);
      if (f.corchetes.length !== hay || (hay && !D.corchetes.includes(f.corchetes[0]))) mal.push(`${etq}: corchete [${f.corchetes}] y esperaba ${hay ? '[' + D.corchetes + ']' : 'ninguno'}`);
    }
    if (f.puntillos !== pu) mal.push(`${etq}: ${f.puntillos} puntillo(s) y esperaba ${pu}`);
    const b2 = enBarra.get(m + ':' + k);
    if (b2) {
      if (f.viga < 0) mal.push(`${etq}: deberia ir en una barra`);
      else if (vigaDe.has(b2) && vigaDe.get(b2) !== f.viga) mal.push(`${etq}: no comparte barra con su grupo`);
      else vigaDe.set(b2, f.viga);
    } else if (f.viga >= 0) mal.push(`${etq}: no deberia ir en una barra`);
  }));
  return mal;
}

async function probar(browser, nivel, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector('#tmcm .tm-cm-modo');
    await page.evaluate(sembrar, semilla);
    const items = await page.evaluate((n) => window.tmComienzoTest.generarLote({ nivel: n, n: 8 }), nivel);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmcm .tm-cm-modo').nth(nivel - 1).click();
    for (let q = 1; q <= items.length; q++) {
      preguntas++;
      const it = items[q - 1];
      await page.waitForSelector('#tmcm .tm-cm-dibujo svg');
      const info = await page.evaluate(() => document.querySelector('#tmcm .tm-cm-dibujo > div').__tmInfo);
      const propio = info.barras.map((b) => b.map((x) => ({ f: x.f, s: x.s, key: x.key })));
      const esperado = it.compases.map((c) => c.elems.map((e) => {
        const L = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        return { f: e.f, s: !!e.s, key: e.s ? null : L[((e.p % 7) + 7) % 7] + '/' + Math.floor(e.p / 7) };
      }));
      if (JSON.stringify(propio) !== JSON.stringify(esperado)) falla(q, 'el motor dice haber dibujado otra melodia que la generada');
      if (verovio) {
        const lec = await page.evaluate(() => window.__leer(document.querySelector('#tmcm .tm-cm-dibujo svg')));
        for (const m of comparar(lec, it)) falla(q, m);
      }
      const bien = q % 2 === 1;
      const elegido = bien ? it.tipo : ['tetico', 'acefalo', 'anacrusico'].find((t) => t !== it.tipo);
      await page.locator(`#tmcm .tm-cm-op[data-t="${elegido}"]`).click();
      const ok = await page.locator('#tmcm .tm-cm-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `elegir ${elegido} (era ${it.tipo}) se corrige como ${ok ? 'acierto' : 'fallo'}`);
      await page.locator('#tmcm .tm-cm-btn').click();
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
    console.log(`${fs.length ? '✗' : '✓'} nivel ${nivel}  ${String(p).padStart(3)} melodias · ${fs.length} discrepancias`);
    fs.slice(0, 8).forEach((x) => console.log('     - ' + x));
    if (fs.length > 8) console.log(`     … y ${fs.length - 8} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} melodias`);
  process.exit(mal ? 1 : 0);
})();
