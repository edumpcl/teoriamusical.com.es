'use strict';
/**
 * Banco de pruebas de «¿Qué compás es?» de reconocer compases (reconocer-compas-engine.js) y de su ficha.
 *
 *   node tools/servidor-estatico.js                              (en otra terminal)
 *   node tools/test-motor-reconocer-compas.js --version=vexflow  # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-reconocer-compas.js --version=verovio  # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se vuelven a generar los mismos compases (tmReconocerCompasTest.generarLote). Se comprueba:
 *   - lo que el modulo dice haber dibujado (__tmInfo) es lo generado;
 *   - con Verovio SE LEE EL DIBUJO: el compas SIN cifra mientras se responde (ni una indicacion de compas), cada figura
 *     (cabeza, corchetes, puntillos, silencios, plica abajo) y las barras por tiempos; y al corregir, la cifra REAL;
 *   - contestar una cifra valida da «Correcto» y una que no lo es da «No es correcto».
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/compases/reconocer-compas/';
const MOTORES = ['assets/js/reconocer-compas-engine.js', 'assets/js/completar-compas-engine.js', 'assets/js/ficha-reconocer-compas-engine.js'];
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const FIG = {
  r: { u: 64, cabeza: 'E0A2', silencio: 'E4E3', corchetes: [], puntillos: 0 }, rP: { u: 96, cabeza: 'E0A2', silencio: 'E4E3', corchetes: [], puntillos: 1 },
  b: { u: 32, cabeza: 'E0A3', silencio: 'E4E4', corchetes: [], puntillos: 0 }, bP: { u: 48, cabeza: 'E0A3', silencio: 'E4E4', corchetes: [], puntillos: 1 },
  n: { u: 16, cabeza: 'E0A4', silencio: 'E4E5', corchetes: [], puntillos: 0 }, nP: { u: 24, cabeza: 'E0A4', silencio: 'E4E5', corchetes: [], puntillos: 1 },
  c: { u: 8, cabeza: 'E0A4', silencio: 'E4E6', corchetes: ['E240', 'E241'], puntillos: 0 }, cP: { u: 12, cabeza: 'E0A4', silencio: 'E4E6', corchetes: ['E240', 'E241'], puntillos: 1 },
  sc: { u: 4, cabeza: 'E0A4', silencio: 'E4E7', corchetes: ['E242', 'E243'], puntillos: 0 },
};
const NOMBRES = { 'semicorchea': 'sc', 'corchea': 'c', 'corchea con puntillo': 'cP', 'negra': 'n', 'negra con puntillo': 'nP', 'blanca': 'b', 'blanca con puntillo': 'bP', 'redonda': 'r', 'redonda con puntillo': 'rP' };
const COMPASES = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };

/** Dentro de la pagina: lee un <svg> de Verovio con un compas. */
function leerCompas(svg) {
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const caja = svg.getBoundingClientRect();
  const rect = (e) => { const b = e.getBoundingClientRect(); return { izq: b.left, der: b.right, arriba: b.top, abajo: b.bottom }; };
  const lineasStaff = [...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return b.top + b.height / 2; });
  const usos = [...svg.querySelectorAll('.meterSig use')].map((u) => { const b = u.getBoundingClientRect(); return { g: id(u), cy: b.top + b.height / 2, cx: b.left }; });
  let cifra = null;
  if (usos.length) {
    const medio = (Math.min(...usos.map((u) => u.cy)) + Math.max(...usos.map((u) => u.cy))) / 2;
    const dig = (l) => l.sort((a, b) => a.cx - b.cx).map((u) => String(Number('0x' + u.g) - 0xE080)).join('');
    cifra = dig(usos.filter((u) => u.cy < medio)) + '/' + dig(usos.filter((u) => u.cy >= medio));
  }
  const vigas = [...svg.querySelectorAll('.beam')];
  const figuras = [...svg.querySelectorAll('.note, .rest')].map((g) => {
    const cab = g.querySelector('.notehead use');
    const r = rect(g);
    return {
      silencio: g.classList.contains('rest'),
      cabeza: cab ? id(cab) : null,
      glifoSilencio: g.classList.contains('rest') ? id(g.querySelector('use')) : null,
      corchetes: [...g.querySelectorAll('.flag use')].map(id),
      puntillos: g.querySelectorAll('.dots ellipse').length,
      viga: vigas.findIndex((v) => v.contains(g)),
      rojo: /c0392b/i.test(g.outerHTML),
      plicaArriba: (() => { const st = g.querySelector('.stem path'); if (!st) return null; const sb = st.getBoundingClientRect(); const hb = cab.getBoundingClientRect(); return sb.top < hb.top + hb.height / 2 - 5; })(),
      izq: r.izq, der: r.der,
    };
  });
  const hueco = [...svg.querySelectorAll('.tm-cc-hueco')].map((l) => rect(l));
  const barras = [...svg.querySelectorAll('.barLine path')].map((p) => p.getBoundingClientRect());
  return { cifra, figuras, hueco, lineasStaff, finIzq: barras.length ? Math.min(...barras.map((b) => b.left)) : caja.right, cabIzq: caja.left };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

/** Compara lo que se lee del dibujo con la secuencia esperada [{f, s, rojo}] (las figuras visibles, sin huecos). */
function compararLectura(lec, esperadas, cifra, etiqueta, enHuecoIdx) {
  const mal = [];
  if (lec.cifra !== (cifra.sinCifra ? null : cifra.sig)) mal.push(`${etiqueta}: cifra dibujada ${lec.cifra} y esperada ${cifra.sinCifra ? 'ninguna' : cifra.sig}`);
  if (lec.figuras.length !== esperadas.length) return mal.concat(`${etiqueta}: ${lec.figuras.length} figuras dibujadas y ${esperadas.length} esperadas`);
  const tiempo = COMPASES[cifra.sig];
  // barras esperadas: figuras cortas y no silencios, seguidas, dentro del mismo tiempo (huecos incluidos como corte)
  const grupos = []; let g = [];
  const cerrar = () => { if (g.length > 1) grupos.push(g); g = []; };
  let prevIdx = -1;
  esperadas.forEach((e, k) => {
    const corta = FIG[e.f].u < 16 && !e.s;
    const t = Math.floor(e.t0 / tiempo);
    const contiguo = prevIdx === -1 || e.pos === prevIdx + 1;
    if (!corta || !contiguo || (g.length && Math.floor(esperadas[g[0]].t0 / tiempo) !== t)) cerrar();
    if (corta) g.push(k);
    prevIdx = e.pos;
  });
  cerrar();
  const enGrupo = new Map(); grupos.forEach((gr, i) => gr.forEach((k) => enGrupo.set(k, i)));
  const vigaDe = new Map();
  esperadas.forEach((e, k) => {
    const f = lec.figuras[k], F = FIG[e.f];
    if (f.silencio !== !!e.s) { mal.push(`${etiqueta}: figura ${k + 1} ${e.s ? 'debia ser silencio' : 'debia ser nota'}`); return; }
    if (e.s) { if (f.glifoSilencio !== F.silencio) mal.push(`${etiqueta}: figura ${k + 1} silencio ${f.glifoSilencio} y esperado ${F.silencio}`); }
    else {
      if (f.cabeza !== F.cabeza) mal.push(`${etiqueta}: figura ${k + 1} cabeza ${f.cabeza} y esperada ${F.cabeza}`);
      if (e.f !== 'r' && e.f !== 'rP' && f.plicaArriba !== false) mal.push(`${etiqueta}: figura ${k + 1} deberia llevar la plica hacia abajo`);
      const hayCorchete = enGrupo.has(k) ? 0 : (F.corchetes.length ? 1 : 0);   // un solo glifo: el de 1 o el de 2 corchetes
      if (f.corchetes.length !== hayCorchete || (hayCorchete && !F.corchetes.includes(f.corchetes[0]))) mal.push(`${etiqueta}: figura ${k + 1} lleva corchete [${f.corchetes}] y esperaba ${hayCorchete ? '[' + F.corchetes + ']' : 'ninguno'}`);
    }
    if (f.puntillos !== F.puntillos) mal.push(`${etiqueta}: figura ${k + 1} ${f.puntillos} puntillo(s) y esperaba ${F.puntillos}`);
    if (enGrupo.has(k)) {
      if (f.viga < 0) mal.push(`${etiqueta}: figura ${k + 1} deberia ir en una barra`);
      else if (vigaDe.has(enGrupo.get(k)) && vigaDe.get(enGrupo.get(k)) !== f.viga) mal.push(`${etiqueta}: figura ${k + 1} no comparte barra con su grupo`);
      else vigaDe.set(enGrupo.get(k), f.viga);
    } else if (f.viga >= 0) mal.push(`${etiqueta}: figura ${k + 1} no deberia ir en una barra`);
    if (f.rojo !== !!e.rojo) mal.push(`${etiqueta}: figura ${k + 1} ${f.rojo ? 'esta en rojo y no deberia' : 'deberia estar en rojo'}`);
  });
  return mal;
}


async function abrir(browser, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leerCompas.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + URL, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(URL.replace(/^\//, '') + 'index.html') }));
    for (const f of MOTORES) await page.route('**/' + f + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(f) }));
  }
  await page.goto(BASE + URL, { waitUntil: 'load' });
  return { ctx, page };
}

const NUMERADORES = [2, 3, 4, 6, 9, 12], DENOMINADORES = [1, 2, 4, 8, 16, 32];

async function probar(browser, grupoBtn, grupo, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${grupo} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector('#tmrc .tm-rc-empezar');
    await page.locator('#tmrc .tm-rc-grupo button').nth(grupoBtn).click();
    await page.evaluate(sembrar, semilla);
    const items = await page.evaluate((g) => window.tmReconocerCompasTest.generarLote({ grupo: g, n: 8 }), grupo);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmrc .tm-rc-empezar').click();
    for (let q = 1; q <= items.length; q++) {
      preguntas++;
      const it = items[q - 1];
      await page.waitForSelector('#tmrc .tm-rc-dibujo svg');
      const esp = []; let t = 0;
      it.elems.forEach((e, k) => { esp.push({ f: e.f, s: !!e.s, t0: t, pos: k }); t += FIG[e.f].u; });
      const dib = await page.evaluate(() => document.querySelector('#tmrc .tm-rc-dibujo > div').__tmInfo);
      const propio = dib.notas.map((n) => ({ f: n.f, s: !!n.s }));
      if (JSON.stringify(propio) !== JSON.stringify(esp.map((e) => ({ f: e.f, s: e.s })))) falla(q, 'el modulo dice haber dibujado otra cosa que el compas generado');
      if (verovio) {
        const lec = await page.evaluate(() => window.__leer(document.querySelector('#tmrc .tm-rc-dibujo svg')));
        for (const m of compararLectura(lec, esp, { sig: it.compasBase, sinCifra: true }, 'sin cifra')) falla(q, m);
      }
      // contestar: impares bien (una cifra valida), pares mal (una que no lo sea)
      const bien = q % 2 === 1;
      let cifra;
      if (bien) cifra = it.validos[q % it.validos.length];
      else {
        cifra = null;
        for (const n of NUMERADORES) for (const d of DENOMINADORES) if (!cifra && it.validos.indexOf(n + '/' + d) < 0) cifra = n + '/' + d;
      }
      const [n, d] = cifra.split('/');
      await page.locator(`#tmrc .tm-rc-fichas[data-g="num"] .tm-rc-cifra[data-v="${n}"]`).click();
      await page.locator(`#tmrc .tm-rc-fichas[data-g="den"] .tm-rc-cifra[data-v="${d}"]`).click();
      await page.locator('#tmrc .tm-rc-btn').click();
      const ok = await page.locator('#tmrc .tm-rc-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `la cifra ${cifra} (${bien ? 'valida' : 'no valida'}) se corrige como ${ok ? 'acierto' : 'fallo'}`);
      // al corregir se revela la cifra real
      if (verovio) {
        await page.waitForTimeout(30);
        const lec2 = await page.evaluate(() => window.__leer(document.querySelector('#tmrc .tm-rc-dibujo svg')));
        for (const m of compararLectura(lec2, esp, { sig: it.compasBase, sinCifra: false }, 'con cifra')) falla(q, m);
      }
      await page.locator('#tmrc .tm-rc-btn').click();   // Siguiente / Ver resultado
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const [btn, grupo] of [[0, 'simples'], [1, 'compuestos'], [2, 'mezcla']]) {
    let p = 0; const fs = [];
    for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, btn, grupo, s * 7919); p += r.preguntas; fs.push(...r.fallos); }
    total += p; mal += fs.length;
    console.log(`${fs.length ? '✗' : '✓'} ${grupo.padEnd(10)} ${String(p).padStart(3)} compases · ${fs.length} discrepancias`);
    fs.slice(0, 8).forEach((x) => console.log('     - ' + x));
    if (fs.length > 8) console.log(`     … y ${fs.length - 8} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} compases`);
  process.exit(mal ? 1 : 0);
})();
