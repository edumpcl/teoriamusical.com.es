'use strict';
/**
 * Banco de pruebas de «¿Qué compás es?» con grupos de valoración especial (que-compas-es-engine.js) y de su ficha.
 *
 *   node tools/servidor-estatico.js                           (en otra terminal)
 *   node tools/test-motor-que-compas-es.js --version=vexflow  # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-que-compas-es.js --version=verovio  # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se vuelven a generar los mismos compases (tmQueCompasEsTest.generarLote). Se comprueba:
 *   - lo que el motor dice haber dibujado (__tmInfo) es lo generado;
 *   - con Verovio SE LEE EL DIBUJO: el compas sin cifra mientras se responde y con la cifra real al corregir; cada figura
 *     (cabeza, corchetes, puntillos, silencios, plica abajo); las barras; y CADA grupo: su numero (3, 2, 4 o 6) y que su
 *     corchete abarca justo sus figuras, sin invadir las vecinas (en el nivel dificil el compas entero son grupos);
 *   - una cifra valida (la generada, o el 2/2 de un 4/4, o el 4/8 de un 2/4) da «Correcto» y otra da «No es correcto».
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/grupos-de-valoracion-especial/que-compas-es/';
const MOTORES = ['assets/js/que-compas-es-engine.js', 'assets/js/grupos-valoracion-especial-engine.js', 'assets/js/completar-compas-engine.js', 'assets/js/ficha-que-compas-es-engine.js'];
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const DUR = {
  w: { u: 64, cabeza: 'E0A2', silencio: 'E4E3', corchetes: [] }, h: { u: 32, cabeza: 'E0A3', silencio: 'E4E4', corchetes: [] },
  q: { u: 16, cabeza: 'E0A4', silencio: 'E4E5', corchetes: [] }, '8': { u: 8, cabeza: 'E0A4', silencio: 'E4E6', corchetes: ['E240', 'E241'] },
  '16': { u: 4, cabeza: 'E0A4', silencio: 'E4E7', corchetes: ['E242', 'E243'] },
};
const FIGDUR = { r: ['w', 0], rP: ['w', 1], b: ['h', 0], bP: ['h', 1], n: ['q', 0], nP: ['q', 1], c: ['8', 0], cP: ['8', 1], sc: ['16', 0] };
const NOMBRES = { 'semicorchea': 'sc', 'corchea': 'c', 'corchea con puntillo': 'cP', 'negra': 'n', 'negra con puntillo': 'nP', 'blanca': 'b', 'blanca con puntillo': 'bP', 'redonda': 'r', 'redonda con puntillo': 'rP' };
const COMPAS_TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const ESCALA = { c: ['8', 'q', 'h'], sc: ['16', '8', 'q'] };
const duracionDe = (base, partes) => ESCALA[base][Math.round(Math.log2(partes))];
const U_FIG = { r: 64, rP: 96, b: 32, bP: 48, n: 16, nP: 24, c: 8, cP: 12, sc: 4 };

/** Dentro de la pagina: lee un <svg> de Verovio con un compas. */
function leerCompas(svg) {
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const rect = (e) => { const b = e.getBoundingClientRect(); return { izq: b.left, der: b.right, arriba: b.top, abajo: b.bottom }; };
  const digitos = (usos) => {
    if (!usos.length) return null;
    return usos.map((u) => { const b = u.getBoundingClientRect(); return { g: id(u), cx: b.left, cy: b.top }; });
  };
  const sig = digitos([...svg.querySelectorAll('.meterSig use')]);
  let cifra = null;
  if (sig) {
    const medio = (Math.min(...sig.map((u) => u.cy)) + Math.max(...sig.map((u) => u.cy))) / 2;
    const dig = (l) => l.sort((a, b) => a.cx - b.cx).map((u) => String(Number('0x' + u.g) - 0xE080)).join('');
    cifra = dig(sig.filter((u) => u.cy < medio)) + '/' + dig(sig.filter((u) => u.cy >= medio));
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
      plicaArriba: (() => { const st = g.querySelector('.stem path'); if (!st) return null; const sb = st.getBoundingClientRect(); const hb = cab.getBoundingClientRect(); return sb.top < hb.top + hb.height / 2 - 5; })(),
      izq: r.izq, der: r.der,
    };
  });
  const grupos = [...svg.querySelectorAll('.tuplet')].map((t) => {
    const num = [...t.querySelectorAll('.tupletNum use')].map((u) => { const b = u.getBoundingClientRect(); return { g: id(u), cx: b.left }; }).sort((a, b) => a.cx - b.cx).map((u) => String(Number('0x' + u.g) - 0xE880)).join('');
    const br = t.querySelector('.tupletBracket');
    return { num, bracket: br ? rect(br) : null, nFiguras: t.querySelectorAll('.note, .rest').length };
  });
  const lin = [...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return b.top + b.height / 2; });
  return { cifra, figuras, grupos, lineas: lin };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};


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

/** Lo esperado, en orden de dibujo: figuras [{ dur, punt, silencio, grupo (indice o -1), p, t0, u, barra }] */
function esperadoDe(it) {
  const tiempo = COMPAS_TIEMPO[it.compas];
  const fig = [];
  let t = 0, ng = -1;
  it.elems.forEach((e) => {
    if (e.grupo) {
      ng++;
      const g = e.datos;
      g.partes.forEach((p, k) => fig.push({ dur: duracionDe(g.variante.base, p), punt: 0, silencio: k === g.silIdx, grupo: ng, p, t0: t, ultimo: k === g.partes.length - 1 }));
      t += g.variante.uGrupo;
    } else {
      const [d, pu] = FIGDUR[e.f];
      fig.push({ dur: d, punt: pu, silencio: !!e.s, grupo: -1, t0: t, u: U_FIG[e.f] });
      t += U_FIG[e.f];
    }
  });
  let barra = 0, fuera = [], dentro = [];
  const cerrarFuera = () => { if (fuera.length > 1) { barra++; fuera.forEach((f) => { f.barra = barra; }); } fuera = []; };
  const cerrarDentro = () => { if (dentro.length > 1) { barra++; dentro.forEach((f) => { f.barra = barra; }); } dentro = []; };
  fig.forEach((f) => {
    if (f.grupo >= 0) {
      if (f.p === 1 && !f.silencio) dentro.push(f); else cerrarDentro();
      if (f.ultimo) { cerrarDentro(); cerrarFuera(); }
      return;
    }
    const corta = f.u < 16 && !f.silencio;
    if (!corta || (fuera.length && Math.floor(fuera[0].t0 / tiempo) !== Math.floor(f.t0 / tiempo))) cerrarFuera();
    if (corta) fuera.push(f);
  });
  cerrarDentro(); cerrarFuera();
  return fig;
}

function comparar(lec, it, etiqueta, conCifra) {
  const mal = [];
  const esp = esperadoDe(it);
  const cifraEsperada = conCifra ? it.compas : null;
  if (lec.cifra !== cifraEsperada) mal.push(`${etiqueta}: cifra ${lec.cifra} y esperada ${cifraEsperada}`);
  if (lec.figuras.length !== esp.length) return mal.concat(`${etiqueta}: ${lec.figuras.length} figuras y ${esp.length} esperadas`);
  const vigaDe = new Map();
  esp.forEach((e, k) => {
    const f = lec.figuras[k], D = DUR[e.dur];
    if (f.silencio !== e.silencio) { mal.push(`${etiqueta}: figura ${k + 1} ${e.silencio ? 'debia ser silencio' : 'debia ser nota'}`); return; }
    if (e.silencio) { if (f.glifoSilencio !== D.silencio) mal.push(`${etiqueta}: figura ${k + 1} silencio ${f.glifoSilencio} y esperado ${D.silencio}`); }
    else {
      if (f.cabeza !== D.cabeza) mal.push(`${etiqueta}: figura ${k + 1} cabeza ${f.cabeza} y esperada ${D.cabeza}`);
      if (e.dur !== 'w' && f.plicaArriba !== false) mal.push(`${etiqueta}: figura ${k + 1} deberia llevar la plica hacia abajo`);
      const hay = e.barra ? 0 : (D.corchetes.length ? 1 : 0);
      if (f.corchetes.length !== hay || (hay && !D.corchetes.includes(f.corchetes[0]))) mal.push(`${etiqueta}: figura ${k + 1} corchete [${f.corchetes}] y esperaba ${hay ? '[' + D.corchetes + ']' : 'ninguno'}`);
    }
    if (f.puntillos !== e.punt) mal.push(`${etiqueta}: figura ${k + 1} ${f.puntillos} puntillo(s) y esperaba ${e.punt}`);
    if (e.barra) {
      if (f.viga < 0) mal.push(`${etiqueta}: figura ${k + 1} deberia ir en una barra`);
      else if (vigaDe.has(e.barra) && vigaDe.get(e.barra) !== f.viga) mal.push(`${etiqueta}: figura ${k + 1} no comparte barra con su grupo`);
      else vigaDe.set(e.barra, f.viga);
    } else if (f.viga >= 0) mal.push(`${etiqueta}: figura ${k + 1} no deberia ir en una barra`);
  });
  // los grupos: uno por grupo generado, en orden, con su numero y abarcando justo sus figuras
  const NUM = { tresillo: '3', dosillo: '2', cuatrillo: '4', seisillo: '6' };
  const generados = it.grupos;
  if (lec.grupos.length !== generados.length) { mal.push(`${etiqueta}: ${lec.grupos.length} grupos dibujados y ${generados.length} esperados`); return mal; }
  const dibujados = lec.grupos.slice().sort((a, b) => (a.bracket ? a.bracket.izq : 0) - (b.bracket ? b.bracket.izq : 0));
  generados.forEach((g, n) => {
    const gr = dibujados[n], idx = esp.map((e, k) => (e.grupo === n ? k : -1)).filter((k) => k >= 0);
    if (gr.num !== NUM[g.grupo]) mal.push(`${etiqueta}: grupo ${n + 1} lleva el numero ${gr.num} y es un ${g.grupo}`);
    if (gr.nFiguras !== idx.length) mal.push(`${etiqueta}: grupo ${n + 1} contiene ${gr.nFiguras} figuras y deberia contener ${idx.length}`);
    if (!gr.bracket) { mal.push(`${etiqueta}: grupo ${n + 1} sin corchete`); return; }
    const primera = lec.figuras[idx[0]], ultima = lec.figuras[idx[idx.length - 1]];
    if (gr.bracket.izq > primera.izq + 3) mal.push(`${etiqueta}: el corchete del grupo ${n + 1} empieza despues de su primera figura`);
    if (gr.bracket.der < ultima.der - 3) mal.push(`${etiqueta}: el corchete del grupo ${n + 1} acaba antes de su ultima figura`);
    const antes = lec.figuras[idx[0] - 1], despues = lec.figuras[idx[idx.length - 1] + 1];
    if (antes && gr.bracket.izq < antes.der - 3) mal.push(`${etiqueta}: el corchete del grupo ${n + 1} invade la figura anterior`);
    if (despues && gr.bracket.der > despues.izq + 3) mal.push(`${etiqueta}: el corchete del grupo ${n + 1} invade la figura siguiente`);
  });
  return mal;
}

const NUMERADORES = [2, 3, 4, 6, 9, 12], DENOMINADORES = [1, 2, 4, 8, 16, 32];
const VALIDAS = { '4/4': ['4/4', '2/2'], '2/4': ['2/4', '4/8'] };

async function probar(browser, nivel, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector('#tmqc .tm-qc-modo');
    await page.evaluate(sembrar, semilla);
    const items = await page.evaluate((n) => window.tmQueCompasEsTest.generarLote({ nivel: n, n: 8 }), nivel);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmqc .tm-qc-modo').nth(nivel - 1).click();
    for (let q = 1; q <= items.length; q++) {
      preguntas++;
      const it = items[q - 1];
      await page.waitForSelector('#tmqc .tm-qc-dibujo svg');
      const info = await page.evaluate(() => document.querySelector('#tmqc .tm-qc-dibujo > div').__tmInfo);
      const esperadoInfo = [];
      it.elems.forEach((e) => { if (e.grupo) e.datos.partes.forEach((p, k) => esperadoInfo.push({ grupo: e.datos.grupo, partes: p, silencio: k === e.datos.silIdx })); else esperadoInfo.push({ f: e.f, s: !!e.s }); });
      const propio = info.map((x) => (x.grupo ? { grupo: x.grupo, partes: x.partes, silencio: x.silencio } : { f: x.f, s: !!x.s }));
      if (JSON.stringify(propio) !== JSON.stringify(esperadoInfo)) falla(q, 'el motor dice haber dibujado otra cosa que el compas generado');
      if (verovio) {
        const lec = await page.evaluate(() => window.__leer(document.querySelector('#tmqc .tm-qc-dibujo svg')));
        for (const m of comparar(lec, it, 'sin cifra', false)) falla(q, m);
      }
      const bien = q % 2 === 1;
      const validas = VALIDAS[it.compas] || [it.compas];
      let cifra;
      if (bien) cifra = validas[q % validas.length];
      else { cifra = null; for (const n of NUMERADORES) for (const d of DENOMINADORES) if (!cifra && validas.indexOf(n + '/' + d) < 0) cifra = n + '/' + d; }
      const [n, d] = cifra.split('/');
      await page.locator(`#tmqc .tm-qc-fichas[data-g="num"] .tm-qc-cifra[data-v="${n}"]`).click();
      await page.locator(`#tmqc .tm-qc-fichas[data-g="den"] .tm-qc-cifra[data-v="${d}"]`).click();
      await page.locator('#tmqc .tm-qc-btn').click();
      const ok = await page.locator('#tmqc .tm-qc-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `la cifra ${cifra} (${bien ? 'valida' : 'no valida'}) se corrige como ${ok ? 'acierto' : 'fallo'}`);
      if (verovio) {
        await page.waitForTimeout(30);
        const lec2 = await page.evaluate(() => window.__leer(document.querySelector('#tmqc .tm-qc-dibujo svg')));
        for (const m of comparar(lec2, it, 'con cifra', true)) falla(q, m);
      }
      await page.locator('#tmqc .tm-qc-btn').click();
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
    console.log(`${fs.length ? '✗' : '✓'} nivel ${nivel}  ${String(p).padStart(3)} compases · ${fs.length} discrepancias`);
    fs.slice(0, 8).forEach((x) => console.log('     - ' + x));
    if (fs.length > 8) console.log(`     … y ${fs.length - 8} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} compases`);
  process.exit(mal ? 1 : 0);
})();
