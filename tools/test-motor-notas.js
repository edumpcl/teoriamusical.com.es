'use strict';
/**
 * Banco de pruebas de los ejercicios «¿Qué nota es?» (identificar) y «Escribe la nota» (escribir): lectura-notas-engine.js.
 *
 *   (antes: node tools/servidor-estatico.js)
 *   node tools/test-motor-notas.js --version=vexflow     # el motor tal y como esta en git (HEAD), con VexFlow
 *   node tools/test-motor-notas.js --version=verovio     # el motor del arbol de trabajo (Verovio)
 *   opciones: --semillas=5 --base=http://127.0.0.1:8910
 *
 * Con el azar SEMBRADO (Math.random determinista) el motor plantea las mismas preguntas en las dos versiones. Para cada una se
 * LEE EL DIBUJO (lineas del pentagrama y cabeza de la nota, en el DOM) y, con la definicion de la clave (nota de referencia y
 * linea; no las tablas del motor), se deduce que nota esta dibujada. Se comprueba:
 *   identificar: que la nota que se VE es la que el motor da por buena (al contestar lo que se ve, tiene que decir «Correcto»);
 *   escribir: que al tocar el pentagrama en cada linea o espacio la nota se coloca ahi (y no en otro sitio), y que colocar la
 *             pedida se corrige como acertada.
 * Imprime un resumen y sale con codigo 1 si hay alguna discrepancia.
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 4));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const MOTOR = 'assets/js/lectura-notas-engine.js';

// definicion de las claves: nota de referencia y linea (Sol 4 en la 2.ª; Do 4 en la n; Fa 3 en la n)
const REF = { sol: [4 * 7 + 4, 2], do1: [28, 1], do2: [28, 2], do3: [28, 3], do4: [28, 4], fa3: [3 * 7 + 3, 3], fa4: [3 * 7 + 3, 4] };
const paso0 = (c) => REF[c][0] - 2 * (REF[c][1] - 1);   // nota de la linea inferior
const NOMBRES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const ETIQUETA = { 'Clave de Sol': 'sol', 'Clave de Fa en 3ª': 'fa3', 'Clave de Fa en 4ª': 'fa4', 'Clave de Do en 1ª': 'do1', 'Clave de Do en 2ª': 'do2', 'Clave de Do en 3ª': 'do3', 'Clave de Do en 4ª': 'do4' };
const URL_CLAVE = { 'clave-de-sol': 'sol', 'clave-de-do-en-1': 'do1', 'clave-de-do-en-2': 'do2', 'clave-de-do-en-3': 'do3', 'clave-de-do-en-4': 'do4', 'clave-de-fa-en-3': 'fa3', 'clave-de-fa-en-4': 'fa4' };

const PAGINAS = [
  { url: '/ejercicios/identificar-notas/clave-de-sol/', modo: 'identificar', clave: 'sol' },
  { url: '/ejercicios/identificar-notas/clave-de-do-en-3/', modo: 'identificar', clave: 'do3' },
  { url: '/ejercicios/identificar-notas/todas-las-claves/', modo: 'identificar', clave: 'todas' },
  { url: '/ejercicios/escribir-notas/clave-de-fa-en-4/', modo: 'escribir', clave: 'fa4' },
  { url: '/ejercicios/escribir-notas/clave-de-do-en-1/', modo: 'escribir', clave: 'do1' },
  { url: '/ejercicios/escribir-notas/todas-las-claves/', modo: 'escribir', clave: 'todas' },
];

const gitShow = (ruta) => execFileSync('git', ['show', 'HEAD:' + ruta], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

/** Se ejecuta DENTRO de la pagina: lee el pentagrama dibujado (lineas y cabezas), sea de VexFlow o de Verovio. */
function leerDibujoEnPagina(selContenedor) {
  const cont = document.querySelector(selContenedor);
  const svg = cont && cont.querySelector('svg');
  if (!svg) return null;
  const caja = svg.getBoundingClientRect();
  const horiz = [...svg.querySelectorAll('path, rect, line')].map((e) => e.getBoundingClientRect())
    .filter((b) => b.height < 2.5 && b.width > caja.width * 0.6).map((b) => Math.round((b.top + b.height / 2) * 100) / 100);
  const unicas = [...new Set(horiz)].sort((a, b) => a - b);
  let lineas = null;
  for (let i = 0; i + 4 < unicas.length && !lineas; i++) {
    const d = unicas[i + 1] - unicas[i];
    if ([2, 3, 4].every((k) => Math.abs(unicas[i + k] - unicas[i + k - 1] - d) < 0.7)) lineas = unicas.slice(i, i + 5);
  }
  const cabezas = [...svg.querySelectorAll('.vf-notehead, .notehead')].map((e) => { const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
  return { lineas, cabezas, izq: caja.left, ancho: caja.width, arriba: caja.top, alto: caja.height };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function nuevaPagina(browser, pag, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  // fuera banner de cookies y anuncios (tapan el pentagrama); solo se deja pasar lo propio y VexFlow
  await page.route('**/*', (r) => {
    const u = r.request().url();
    if (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick|adsbygoogle/.test(u)) return r.abort();
    return r.fallback();
  });
  if (VERSION === 'vexflow') {   // la pagina y el motor tal y como estan en git: el punto de comparacion
    const html = gitShow(pag.url.replace(/^\//, '') + 'index.html');
    await page.route(BASE + pag.url, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
    await page.route('**/' + MOTOR + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(MOTOR) }));
  }
  await page.goto(BASE + pag.url, { waitUntil: 'load' });
  return { ctx, page };
}

const claveDe = async (page, pag) => {
  if (pag.clave !== 'todas') return pag.clave;
  const t = (await page.locator('[id$="_tag"]').first().textContent() || '').trim();
  return ETIQUETA[t] || null;
};

async function dibujoListo(page, sel) {
  await page.waitForFunction((s) => { const c = document.querySelector(s); return c && c.querySelector('svg'); }, sel, { timeout: 30000 });
  await page.waitForTimeout(60);
}

async function probarIdentificar(browser, pag, semilla) {
  const { ctx, page } = await nuevaPagina(browser, pag, semilla);
  const res = [];
  try {
    await dibujoListo(page, '[id$="_not"]');
    for (let q = 0; q < 10; q++) {
      await dibujoListo(page, '[id$="_not"]');
      const clave = await claveDe(page, pag);
      const d = await page.evaluate(leerDibujoEnPagina, '[id$="_not"]');
      const r = { q: q + 1, clave };
      if (!d || !d.lineas || d.cabezas.length !== 1) { r.error = 'no se ve exactamente una nota con un pentagrama de 5 lineas'; res.push(r); break; }
      const esp = (d.lineas[4] - d.lineas[0]) / 4;
      const paso = paso0(clave) + Math.round((d.lineas[4] - d.cabezas[0].y) / (esp / 2));
      r.dibujada = NOMBRES[((paso % 7) + 7) % 7] + Math.floor(paso / 7);
      await page.locator('[id$="_opts"] .tm-opt[data-i="' + (((paso % 7) + 7) % 7) + '"]').click();
      await page.locator('[id$="_btn"]').click();
      r.ok = await page.locator('[id$="_fb"]').evaluate((e) => e.classList.contains('tm-ok'));
      res.push(r);
      await page.locator('[id$="_nxt"]').click();
    }
  } catch (e) { res.push({ error: String(e).slice(0, 200) }); }
  await ctx.close();
  return res;
}

async function probarEscribir(browser, pag, semilla) {
  const { ctx, page } = await nuevaPagina(browser, pag, semilla);
  const res = [];
  try {
    for (let q = 0; q < 10; q++) {
      await dibujoListo(page, '[id$="_not"]');
      const clave = await claveDe(page, pag);
      const pedida = (await page.locator('[id$="_tgt"] strong').textContent()).trim();
      const d0 = await page.evaluate(leerDibujoEnPagina, '[id$="_not"]');
      const r = { q: q + 1, clave, pedida, mapeo: [] };
      if (!d0 || !d0.lineas) { r.error = 'no se ve el pentagrama de 5 lineas'; res.push(r); break; }
      const esp = (d0.lineas[4] - d0.lineas[0]) / 4;
      const x = d0.izq + d0.ancho * 0.45;
      let elegido = null;
      for (let k = -3; k <= 11; k++) {          // medios espacios desde la linea inferior (k=0) hasta 3 por encima de la superior (k=8) y por debajo
        const y = d0.lineas[4] - k * (esp / 2);
        await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.up();
        await page.waitForTimeout(40);
        const d = await page.evaluate(leerDibujoEnPagina, '[id$="_not"]');
        if (!d || !d.lineas || d.cabezas.length !== 1) { r.mapeo.push({ k, error: 'no hay exactamente una nota colocada' }); continue; }
        const paso = paso0(clave) + Math.round((d.lineas[4] - d.cabezas[0].y) / (esp / 2));
        const dibujadaK = Math.round((d.lineas[4] - d.cabezas[0].y) / (esp / 2));
        const nombre = NOMBRES[((paso % 7) + 7) % 7];
        const desviacion = Math.abs(d.cabezas[0].y - y) / esp;
        r.mapeo.push({ k, dibujadaK, desviacion: Math.round(desviacion * 100) / 100, nombre });
        if (nombre === pedida && !elegido && k >= 0 && k <= 8) elegido = k;
      }
      const y = d0.lineas[4] - (elegido === null ? 0 : elegido) * (esp / 2);
      await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(40);
      await page.locator('[id$="_btn"]').click();
      r.ok = await page.locator('[id$="_fb"]').evaluate((e) => e.classList.contains('tm-ok'));
      res.push(r);
      await page.locator('[id$="_nxt"]').click();
    }
  } catch (e) { res.push({ error: String(e).slice(0, 200) }); }
  await ctx.close();
  return res;
}

(async () => {
  const browser = await chromium.launch();
  let fallos = 0;
  const resumen = [];
  for (const pag of PAGINAS) {
    let preguntas = 0, mal = [];
    for (let s = 1; s <= SEMILLAS; s++) {
      const res = pag.modo === 'identificar' ? await probarIdentificar(browser, pag, s * 7919) : await probarEscribir(browser, pag, s * 7919);
      for (const r of res) {
        preguntas++;
        if (r.error) { mal.push(`semilla ${s}: ${r.error}`); continue; }
        if (pag.modo === 'identificar') { if (!r.ok) mal.push(`semilla ${s} p${r.q} (${r.clave}): se ve ${r.dibujada} y el motor lo da por incorrecto`); }
        else {
          // cada toque tiene que dejar la nota donde se toco: en ese medio espacio exacto (k), sin desviarse mas de 1/4 de espacio
          for (const m of r.mapeo) {
            if (m.error) { mal.push(`semilla ${s} p${r.q} (${r.clave}) k=${m.k}: ${m.error}`); continue; }
            const dentro = m.k >= -1.5 * 2 + 0 && m.k <= 8 + 3;   // el motor admite hasta 1,5 lineas fuera del pentagrama (3 medios espacios)
            if (dentro && m.k >= -3 && m.k <= 11 && (m.dibujadaK !== m.k || m.desviacion > 0.26)) mal.push(`semilla ${s} p${r.q} (${r.clave}) toque k=${m.k}: la nota se dibuja en k=${m.dibujadaK} (desviacion ${m.desviacion})`);
          }
          if (!r.ok) mal.push(`semilla ${s} p${r.q} (${r.clave}): colocar la ${r.pedida} (que se ve bien colocada) no da «Correcto»`);
        }
      }
    }
    fallos += mal.length;
    resumen.push({ pagina: pag.url, modo: pag.modo, preguntas, discrepancias: mal.length });
    console.log(`${mal.length ? '✗' : '✓'} ${pag.url.padEnd(52)} ${pag.modo.padEnd(11)} ${String(preguntas).padStart(3)} preguntas · ${mal.length} discrepancias`);
    for (const m of mal.slice(0, 6)) console.log('     - ' + m);
    if (mal.length > 6) console.log(`     … y ${mal.length - 6} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${fallos} discrepancias en ${resumen.reduce((a, r) => a + r.preguntas, 0)} preguntas`);
  process.exit(fallos ? 1 : 0);
})();
