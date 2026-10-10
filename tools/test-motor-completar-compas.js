'use strict';
/**
 * Banco de pruebas de «Completar el compás» (completar-compas-engine.js): el ejercicio, las cartas de respuesta y el módulo
 * compartido tmCompletarCompasData (que usan otros motores).
 *
 *   node tools/servidor-estatico.js                              (en otra terminal)
 *   node tools/test-motor-completar-compas.js --version=vexflow  # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-completar-compas.js --version=verovio  # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * Con el azar sembrado se vuelven a generar los mismos compases (tmCompletarCompasData.generar) y se comprueba, en cada
 * pregunta y para los 3 niveles y los 3 grupos de compases:
 *   - lo que el modulo dice haber dibujado (__tmDibujo) es lo esperado: figuras, silencios, hueco, barras;
 *   - con Verovio, ademas, SE LEE EL DIBUJO: cifra, cada figura (cabeza, corchetes, puntillos, silencio), las barras por
 *     tiempos, el color rojo solo donde toca, y la linea roja del hueco entre la figura anterior y la siguiente;
 *   - las cartas de respuesta dibujan lo que dice su etiqueta;
 *   - contestar bien da «Correcto» (y el compas se rehace con lo contestado) y contestar mal da «No es correcto» (y el hueco
 *     sale en rojo con lo que faltaba).
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/ejercicios/compases/completar-compas/';
const MOTORES = ['assets/js/completar-compas-engine.js', 'assets/js/ficha-completar-compas-engine.js'];
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

/** Compara lo que se lee del dibujo con la secuencia esperada [{f, s, rojo}] (las figuras visibles, sin huecos). */
function compararLectura(lec, esperadas, cifra, etiqueta, enHuecoIdx) {
  const mal = [];
  if (lec.cifra !== cifra) mal.push(`${etiqueta}: cifra dibujada ${lec.cifra} y esperada ${cifra}`);
  if (lec.figuras.length !== esperadas.length) return mal.concat(`${etiqueta}: ${lec.figuras.length} figuras dibujadas y ${esperadas.length} esperadas`);
  const tiempo = COMPASES[cifra];
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

async function probar(browser, nivel, grupoBtn, grupo, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} ${grupo} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector('#tmcc .tm-cc-modo');
    if (grupoBtn >= 0) await page.locator('#tmcc .tm-cc-grupo button').nth(grupoBtn).click();
    await page.evaluate(sembrar, semilla);
    const items = await page.evaluate(([n, g]) => window.tmCompletarCompasData.generar({ nivel: n, grupo: g, n: 8 }), [nivel, grupo]);
    await page.evaluate(sembrar, semilla);
    await page.locator('#tmcc .tm-cc-modo').nth(nivel - 1).click();
    for (let q = 1; q <= items.length; q++) {
      preguntas++;
      const it = items[q - 1];
      await page.waitForSelector('#tmcc .tm-cc-dibujo svg');
      const { desde, hasta } = it.hueco;
      // --- estado inicial: figuras fuera del hueco, hueco invisible
      const visibles = [];
      let t0 = 0;
      it.elems.forEach((e, k) => { if (k < desde || k > hasta) visibles.push({ f: e.f, s: e.s, t0, pos: k }); t0 += FIG[e.f].u; });
      const dib = await page.evaluate(() => { const d = document.querySelector('#tmcc .tm-cc-dibujo > div'); return d.__tmDibujo; });
      const esperadoAuto = it.elems.map((e, k) => ({ f: e.f, s: !!e.s, fantasma: k >= desde && k <= hasta }));
      const propio = dib.notas.map((n) => ({ f: n.f, s: !!n.s, fantasma: !!n.fantasma }));
      if (JSON.stringify(propio) !== JSON.stringify(esperadoAuto)) falla(q, 'el modulo dice haber dibujado otra cosa que el compas generado');
      if (verovio) {
        const lec = await page.evaluate(() => window.__leer(document.querySelector('#tmcc .tm-cc-dibujo svg')));
        for (const m of compararLectura(lec, visibles, it.compas, `inicial`)) falla(q, m);
        if (lec.hueco.length !== 1) falla(q, `${lec.hueco.length} marcas de hueco y deberia haber 1`);
        else {
          const h = lec.hueco[0];
          const ant = lec.figuras.filter((_, k) => visibles[k].pos < desde).pop();
          const sig = lec.figuras.filter((_, k) => visibles[k].pos > hasta)[0];
          if (ant && h.izq < ant.der - 6) falla(q, 'la marca del hueco empieza antes de acabar la figura anterior');
          if (sig && h.der > sig.izq) falla(q, 'la marca del hueco llega hasta la figura siguiente');
          if (h.arriba < lec.lineasStaff[4]) falla(q, 'la marca del hueco no esta debajo del pentagrama');
        }
      }
      // --- las cartas
      const cartas = await page.locator('#tmcc .tm-cc-carta').evaluateAll((els) => els.map((e) => ({ nombre: e.querySelector('small').textContent.trim(), leer: window.__leer(e.querySelector('svg')) })));
      if (verovio) {
        cartas.forEach((c, i) => {
          const sil = /^silencio de /.test(c.nombre), base = NOMBRES[c.nombre.replace(/^silencio de /, '')];
          if (!base) { falla(q, 'carta ' + c.nombre + ' sin figura'); return; }
          const f = c.leer.figuras;
          if (f.length !== 1) { falla(q, `carta ${c.nombre}: ${f.length} figuras`); return; }
          const F = FIG[base];
          if (sil ? (!f[0].silencio || f[0].glifoSilencio !== F.silencio) : (f[0].silencio || f[0].cabeza !== F.cabeza)) falla(q, `carta ${c.nombre} dibuja otra figura`);
          if (f[0].puntillos !== F.puntillos) falla(q, `carta ${c.nombre}: ${f[0].puntillos} puntillos y esperaba ${F.puntillos}`);
          if (!sil && base !== 'r' && base !== 'rP' && (f[0].corchetes.length !== (F.corchetes.length ? 1 : 0) || (F.corchetes.length && !F.corchetes.includes(f[0].corchetes[0])) || f[0].plicaArriba !== true)) falla(q, `carta ${c.nombre}: corchetes [${f[0].corchetes}] / [${F.corchetes}], plica arriba ${f[0].plicaArriba}`);
        });
      }
      const idx = (f, s) => cartas.findIndex((c) => c.nombre === (s ? 'silencio de ' : '') + Object.keys(NOMBRES).find((k) => NOMBRES[k] === f));
      // --- contestar: impares bien, pares mal
      const bien = q % 2 === 1;
      let respuesta;   // lo que se pone [{f, s}]
      if (nivel === 3) {
        if (bien) respuesta = it.faltan.map((e) => ({ f: e.f, s: !!e.s }));
        else respuesta = [{ f: 'sc', s: false }];
        // si "mal" sumara lo mismo (hueco de una semicorchea), se pone otra cosa
        if (!bien && it.valor === 4) respuesta = [{ f: 'c', s: false }];
        for (const x of respuesta) await page.locator('#tmcc .tm-cc-carta').nth(idx(x.f, x.s)).click();
      } else {
        const e = it.faltan[0];
        if (bien) respuesta = [{ f: e.f, s: !!e.s }];
        else { const otra = cartas.findIndex((c) => c.nombre !== cartas[idx(e.f, !!e.s)].nombre); respuesta = [{ f: 'otra', s: false, i: otra }]; }
        await page.locator('#tmcc .tm-cc-carta').nth(bien ? idx(e.f, !!e.s) : respuesta[0].i).click();
      }
      await page.locator('#tmcc .tm-cc-btn').click();
      const ok = await page.locator('#tmcc .tm-cc-fb').evaluate((e) => e.classList.contains('tm-ok'));
      const suma = nivel === 3 ? respuesta.reduce((a, x) => a + FIG[x.f].u, 0) : null;
      const debeOk = nivel === 3 ? suma === it.valor : bien;
      if (ok !== debeOk) falla(q, `la respuesta ${debeOk ? 'correcta' : 'incorrecta'} se corrige como ${ok ? 'acierto' : 'fallo'}`);
      // --- el compas corregido
      const dib2 = await page.evaluate(() => document.querySelector('#tmcc .tm-cc-dibujo > div').__tmDibujo);
      let esperado2;
      if (debeOk) {
        const puestas = nivel === 3 ? respuesta : [{ f: it.faltan[0].f, s: !!it.faltan[0].s }];
        esperado2 = [];
        it.elems.forEach((e, k) => { if (k < desde || k > hasta) esperado2.push({ f: e.f, s: !!e.s, rojo: false }); else if (k === desde) puestas.forEach((x) => esperado2.push({ f: x.f, s: !!x.s, rojo: false })); });
      } else {
        esperado2 = it.elems.map((e, k) => ({ f: e.f, s: !!e.s, rojo: k >= desde && k <= hasta }));
      }
      const propio2 = dib2.notas.map((n) => ({ f: n.f, s: !!n.s }));
      if (JSON.stringify(propio2) !== JSON.stringify(esperado2.map((e) => ({ f: e.f, s: e.s })))) falla(q, 'el compas corregido no es el esperado');
      if (verovio) {
        let t = 0;
        esperado2.forEach((e, k) => { e.t0 = t; e.pos = k; t += FIG[e.f].u; });
        const lec2 = await page.evaluate(() => window.__leer(document.querySelector('#tmcc .tm-cc-dibujo svg')));
        for (const m of compararLectura(lec2, esperado2, it.compas, 'corregido')) falla(q, m);
        if (lec2.hueco.length) falla(q, 'al corregir sigue la marca del hueco');
      }
      await page.locator('#tmcc .tm-cc-btn').click();   // Siguiente / Ver resultado
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  const casos = [[1, 0, 'simples'], [2, 1, 'compuestos'], [3, -1, 'mezcla'], [1, -1, 'mezcla'], [2, -1, 'mezcla'], [3, 0, 'simples']];
  for (const [nivel, btn, grupo] of casos) {
    let p = 0; const fs = [];
    for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, nivel, btn, grupo, s * 7919); p += r.preguntas; fs.push(...r.fallos); }
    total += p; mal += fs.length;
    console.log(`${fs.length ? '✗' : '✓'} nivel ${nivel} ${grupo.padEnd(10)} ${String(p).padStart(3)} compases · ${fs.length} discrepancias`);
    fs.slice(0, 6).forEach((x) => console.log('     - ' + x));
    if (fs.length > 6) console.log(`     … y ${fs.length - 6} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} compases`);
  process.exit(mal ? 1 : 0);
})();
