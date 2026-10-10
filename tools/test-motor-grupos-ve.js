'use strict';
/**
 * Banco de pruebas de «Grupos de valoración especial» (grupos-valoracion-especial-engine.js): «¿A qué figura equivale el
 * grupo?» en sus 3 niveles y la ficha.
 *
 *   node tools/servidor-estatico.js                           (en otra terminal)
 *   node tools/test-motor-grupos-ve.js --version=vexflow      # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-grupos-ve.js --version=verovio      # el motor del arbol de trabajo
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se vuelven a generar los mismos compases (tmGruposVETest.generarLote). Se comprueba:
 *   - lo que el motor dice haber dibujado (__tmInfo) es lo generado;
 *   - con Verovio SE LEE EL DIBUJO: cifra, cada figura (cabeza, corchetes, puntillos, silencio), las barras (dentro del grupo
 *     y por tiempos fuera), y el grupo: el numero del corchete (3, 2, 4 o 6) y que el corchete abarca justo las figuras del
 *     grupo, ni una mas ni una menos;
 *   - las cartas de respuesta dibujan lo que dice su etiqueta;
 *   - contestar la figura correcta da «Correcto» y otra da «No es correcto».
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/grupos-de-valoracion-especial/';
const MOTORES = ['assets/js/grupos-valoracion-especial-engine.js', 'assets/js/completar-compas-engine.js', 'assets/js/ficha-grupos-ve-engine.js'];
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

// por duracion de dibujo
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

/** Lo esperado, en orden de dibujo: [{ dur, punt, silencio, viga (id o -1), grupo }] */
function esperadoDe(it) {
  const tiempo = COMPAS_TIEMPO[it.compasGrupo];
  const fig = [];
  let t = 0;
  it.elems.forEach((e) => {
    if (e.grupo) {
      it.partes.forEach((p, k) => fig.push({ dur: duracionDe(it.variante.base, p), punt: 0, silencio: k === it.silIdx, grupo: true, p, t0: t }));
      t += it.variante.uGrupo;
    } else {
      const [d, pu] = FIGDUR[e.f];
      fig.push({ dur: d, punt: pu, silencio: !!e.s, grupo: false, t0: t, u: U_FIG[e.f] });
      t += U_FIG[e.f];
    }
  });
  // barras: dentro del grupo, partes de 1 consecutivas y no silencio (>=2); fuera, figuras cortas del mismo tiempo (sin cruzar el grupo)
  let barra = 0, fuera = [];
  const cerrarFuera = () => { if (fuera.length > 1) { barra++; fuera.forEach((f) => { f.barra = barra; }); } fuera = []; };
  let dentro = [];
  const cerrarDentro = () => { if (dentro.length > 1) { barra++; dentro.forEach((f) => { f.barra = barra; }); } dentro = []; };
  const ultimoDelGrupo = fig.map((f) => f.grupo).lastIndexOf(true);
  fig.forEach((f, k) => {
    if (f.grupo) {
      if (f.p === 1 && !f.silencio) dentro.push(f); else cerrarDentro();
      // al acabar el grupo se cierra lo de fuera que lo precedia en su tiempo (como hace el motor)
      if (k === ultimoDelGrupo) { cerrarDentro(); cerrarFuera(); }
      return;
    }
    const corta = f.u < 16 && !f.silencio;
    if (!corta || (fuera.length && Math.floor(fuera[0].t0 / tiempo) !== Math.floor(f.t0 / tiempo))) cerrarFuera();
    if (corta) fuera.push(f);
  });
  cerrarDentro(); cerrarFuera();
  return fig;
}

function comparar(lec, it, etiqueta) {
  const mal = [];
  const esp = esperadoDe(it), g = it.grupo;
  if (lec.cifra !== it.compasGrupo) mal.push(`${etiqueta}: cifra ${lec.cifra} y esperada ${it.compasGrupo}`);
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
  // el corchete del grupo: numero y figuras que abarca
  if (lec.grupos.length !== 1) mal.push(`${etiqueta}: ${lec.grupos.length} grupos dibujados y deberia haber 1`);
  else {
    const gr = lec.grupos[0], idx = esp.map((e, k) => (e.grupo ? k : -1)).filter((k) => k >= 0);
    if (gr.num !== String(g === 'tresillo' ? 3 : g === 'dosillo' ? 2 : g === 'cuatrillo' ? 4 : 6)) mal.push(`${etiqueta}: el corchete lleva el numero ${gr.num} y es un ${g}`);
    if (gr.nFiguras !== idx.length) mal.push(`${etiqueta}: el grupo dibujado contiene ${gr.nFiguras} figuras y deberia contener ${idx.length}`);
    if (gr.bracket) {
      const primera = lec.figuras[idx[0]], ultima = lec.figuras[idx[idx.length - 1]];
      if (gr.bracket.izq > primera.izq + 3) mal.push(`${etiqueta}: el corchete empieza despues de la primera figura del grupo`);
      if (gr.bracket.der < ultima.der - 3) mal.push(`${etiqueta}: el corchete acaba antes de la ultima figura del grupo`);
      const antes = lec.figuras[idx[0] - 1], despues = lec.figuras[idx[idx.length - 1] + 1];
      if (antes && gr.bracket.izq < antes.der - 3) mal.push(`${etiqueta}: el corchete invade la figura anterior`);
      if (despues && gr.bracket.der > despues.izq + 3) mal.push(`${etiqueta}: el corchete invade la figura siguiente`);
    } else mal.push(`${etiqueta}: el grupo no tiene corchete`);
  }
  return mal;
}

async function probar(browser, nivel, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector('#tmgv .tm-gv-modo');
    await page.evaluate(sembrar, semilla);
    const items = await page.evaluate((n) => window.tmGruposVETest.generarLote({ nivel: n, n: 8 }), nivel);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmgv .tm-gv-modo').nth(nivel - 1).click();
    for (let q = 1; q <= items.length; q++) {
      preguntas++;
      const it = items[q - 1];
      await page.waitForSelector('#tmgv .tm-gv-dibujo svg');
      // lo que el motor dice haber dibujado
      const info = await page.evaluate(() => document.querySelector('#tmgv .tm-gv-dibujo > div').__tmInfo);
      const esperadoInfo = [];
      it.elems.forEach((e) => { if (e.grupo) it.partes.forEach((p, k) => esperadoInfo.push({ grupo: it.grupo, partes: p, silencio: k === it.silIdx })); else esperadoInfo.push({ f: e.f, s: !!e.s }); });
      const propio = info.map((x) => (x.grupo ? { grupo: x.grupo, partes: x.partes, silencio: x.silencio } : { f: x.f, s: !!x.s }));
      if (JSON.stringify(propio) !== JSON.stringify(esperadoInfo)) falla(q, 'el motor dice haber dibujado otra cosa que el compas generado');
      if (verovio) {
        const lec = await page.evaluate(() => window.__leer(document.querySelector('#tmgv .tm-gv-dibujo svg')));
        for (const m of comparar(lec, it, 'dibujo')) falla(q, m);
        const cartas = await page.locator('#tmgv .tm-gv-carta').evaluateAll((els) => els.map((e) => ({ nombre: e.querySelector('small').textContent.trim(), leer: window.__leer(e.querySelector('svg')) })));
        cartas.forEach((c) => {
          const base = NOMBRES[c.nombre];
          if (!base) { falla(q, 'carta ' + c.nombre + ' sin figura'); return; }
          const f = c.leer.figuras, [d, pu] = FIGDUR[base], D = DUR[d];
          if (f.length !== 1 || f[0].silencio || f[0].cabeza !== D.cabeza) falla(q, `carta ${c.nombre} dibuja otra figura`);
          else if (f[0].puntillos !== pu) falla(q, `carta ${c.nombre}: ${f[0].puntillos} puntillos y esperaba ${pu}`);
        });
      }
      // contestar: impares bien, pares mal
      const bien = q % 2 === 1, correcta = it.variante.equivaleFig;
      const cartasF = await page.locator('#tmgv .tm-gv-carta').evaluateAll((els) => els.map((e) => e.getAttribute('data-f')));
      const elegida = bien ? correcta : cartasF.find((f) => f !== correcta);
      await page.locator(`#tmgv .tm-gv-carta[data-f="${elegida}"]`).click();
      await page.locator('#tmgv .tm-gv-btn').click();
      const ok = await page.locator('#tmgv .tm-gv-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `respuesta ${bien ? 'correcta' : 'incorrecta'} corregida como ${ok ? 'acierto' : 'fallo'}`);
      await page.locator('#tmgv .tm-gv-btn').click();   // Siguiente / Ver resultado
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
