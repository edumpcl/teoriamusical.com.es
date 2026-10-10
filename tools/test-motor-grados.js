'use strict';
/**
 * Banco de pruebas de los ejercicios de grados (grados-engine.js): «¿Qué grado es esta nota?» y «¿Qué nota es este grado?».
 *
 *   node tools/servidor-estatico.js                      (en otra terminal)
 *   node tools/test-motor-grados.js --version=vexflow    # el motor tal y como esta en git (HEAD)
 *   node tools/test-motor-grados.js --version=verovio    # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=5 --base=http://127.0.0.1:8910
 *
 * Azar sembrado. Las escalas se calculan AQUI, aparte del motor (por semitonos, no por armadura), y se lee el DIBUJO en el DOM:
 *   - la nota dibujada (altura contra las 5 lineas, clave de Sol) y su alteracion (con Verovio: el glifo de la nota o, si no lo
 *     hay, la armadura; con VexFlow solo se lee la altura);
 *   - con Verovio, la armadura dibujada: cuantas alteraciones y de que tipo, contra la tonalidad que anuncia el ejercicio.
 * Se contesta lo que se ve (identificar) o lo que se pide (nota) y el motor tiene que decir «Correcto»; en «nota», ademas, la
 * nota que se enseña al corregir tiene que ser la pedida.
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 4));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const URL = '/diccionario-musical/nombres-de-los-grados-de-la-escala/';
const MOTOR = 'assets/js/grados-engine.js';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

// ---- escalas, calculadas aparte por semitonos ----
const LETRAS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const ES = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
const PATRON = { mayor: [0, 2, 4, 5, 7, 9, 11], natural: [0, 2, 3, 5, 7, 8, 10], armonica: [0, 2, 3, 5, 7, 8, 11] };
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const NOMBRES = ['Tónica', 'Supertónica', 'Mediante', 'Subdominante', 'Dominante', 'Superdominante', 'Sensible'];
const CLASIF = ['tonal', 'ninguno', 'modal', 'tonal', 'tonal', 'modal', 'modal'];
const accDe = (d) => (d === 0 ? '' : d === 1 ? '#' : d === -1 ? 'b' : d === 2 ? '##' : 'bb');
function construir(letra, acc, modo) {
  const t = SEMI[letra] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0);
  const i0 = LETRAS.indexOf(letra);
  return PATRON[modo].map((s, g) => {
    const l = LETRAS[(i0 + g) % 7];
    let d = (((t + s - SEMI[l]) % 12) + 18) % 12 - 6;   // alteracion que da esa altura sobre la letra
    return { letra: l, acc: accDe(d) };
  });
}
/** 'La Mayor' | 'fa♯ menor natural' | 'sol♯ menor armónica' -> { notas, tipoArm, nArm } */
function tonalidad(texto) {
  const m = /^(Do|Re|Mi|Fa|Sol|La|Si)(♯|♭)?\s+(Mayor|menor)(?:\s+(natural|armónica))?$/i.exec(texto.trim());
  if (!m) throw new Error('tonalidad ilegible: ' + texto);
  const letra = ES[m[1][0].toUpperCase() + m[1].slice(1).toLowerCase()];
  const acc = m[2] === '♯' ? '#' : m[2] === '♭' ? 'b' : '';
  const modo = /mayor/i.test(m[3]) ? 'mayor' : m[4] === 'armónica' ? 'armonica' : 'natural';
  const notas = construir(letra, acc, modo);
  // armadura = la del relativo mayor
  const rel = modo === 'mayor' ? construir(letra, acc, 'mayor') : construir(LETRAS[(LETRAS.indexOf(letra) + 2) % 7], accDe(((SEMI[letra] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0) + 3 - SEMI[LETRAS[(LETRAS.indexOf(letra) + 2) % 7]]) % 12 + 18) % 12 - 6), 'mayor');
  const alt = rel.filter((n) => n.acc);
  return { notas, modo, arm: alt.length ? (alt[0].acc === '#' ? alt.length : -alt.length) : 0 };
}
const ORDEN_S = 'FCGDAEB', ORDEN_B = 'BEADGCF';
const accArmadura = (arm, letra) => (arm > 0 && ORDEN_S.slice(0, arm).includes(letra) ? '#' : arm < 0 && ORDEN_B.slice(0, -arm).includes(letra) ? 'b' : '');
const dist7 = (notas) => ((SEMI[notas[0].letra] + (notas[0].acc === '#' ? 1 : notas[0].acc === 'b' ? -1 : 0) + 12 - (SEMI[notas[6].letra] + (notas[6].acc === '##' ? 2 : notas[6].acc === '#' ? 1 : notas[6].acc === 'b' ? -1 : 0))) % 12 + 12) % 12;
const nombreGrado = (notas, g) => (g === 6 ? (dist7(notas) === 1 ? 'Sensible' : 'Subtónica') : NOMBRES[g]);

// ---- lectura del dibujo, dentro de la pagina ----
function leerEnPagina(sel) {
  const svg = document.querySelector(sel + ' svg');
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
  const cabezas = [...svg.querySelectorAll('.vf-notehead, .notehead')].map((e) => { const b = e.getBoundingClientRect(); return b.top + b.height / 2; });
  const glifo = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const verovio = !!svg.querySelector('.keySig, .notehead');
  return {
    lineas, cabezas, verovio,
    armadura: [...svg.querySelectorAll('.keySig use, .keyAccid use')].map(glifo),
    alteracionNota: [...svg.querySelectorAll('.note .accid use')].map(glifo),
  };
}
const GLIFO = { E262: '#', E260: 'b', E261: 'n', E263: '##', E264: 'bb' };
/** Nota dibujada: { letra, acc|null, armDibujada|null } */
function interpretar(d) {
  if (!d || !d.lineas || d.cabezas.length !== 1) throw new Error('no se ve un pentagrama con exactamente una nota');
  const esp = (d.lineas[4] - d.lineas[0]) / 4;
  const paso = 4 * 7 + 2 + Math.round((d.lineas[4] - d.cabezas[0]) / (esp / 2));   // clave de Sol: la linea inferior es Mi 4
  const letra = LETRAS[((paso % 7) + 7) % 7];
  let arm = null, acc = null;
  if (d.verovio) {
    const gl = d.armadura.map((g) => GLIFO[g]);
    if (gl.some((g) => g !== gl[0])) throw new Error('armadura con alteraciones de distinto tipo');
    arm = gl.length ? (gl[0] === '#' ? gl.length : -gl.length) : 0;
    const a = d.alteracionNota.map((g) => GLIFO[g]);
    if (a.length > 1) throw new Error('mas de una alteracion en la nota');
    acc = a.length ? (a[0] === 'n' ? '' : a[0]) : accArmadura(arm, letra);
  }
  return { letra, acc, arm, paso };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function abrir(browser, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    const html = gitShow(URL.replace(/^\//, '') + 'index.html');
    await page.route(BASE + URL, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
    await page.route('**/' + MOTOR + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(MOTOR) }));
  }
  await page.goto(BASE + URL, { waitUntil: 'load' });
  return { ctx, page };
}

async function probar(browser, tipo, modo, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const cont = tipo === 'grado' ? '#tmgrados1' : '#tmgrados2';
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${tipo}/${modo} p${q}: ${m}`);
  try {
    await page.locator(cont + ' .tm-gr-mode-btn').nth(modo).click();
    for (let q = 1; q <= 10; q++) {
      await page.waitForSelector(cont + ' .tm-gr-btn');
      preguntas++;
      const ton = tonalidad(await page.locator(cont + ' .tm-gr-ton').textContent());
      let g, esperada;
      if (tipo === 'grado') {
        const d = await page.evaluate(leerEnPagina, cont);
        let n;
        try { n = interpretar(d); } catch (e) { falla(q, e.message); await page.locator(cont + ' .tm-gr-btn').evaluate((b) => b.click()).catch(() => {}); break; }
        if (n.arm !== null && n.arm !== ton.arm) falla(q, `armadura dibujada ${n.arm} y la tonalidad (${await page.locator(cont + ' .tm-gr-ton').textContent()}) lleva ${ton.arm}`);
        g = ton.notas.findIndex((x) => x.letra === n.letra && (n.acc === null || x.acc === n.acc));
        if (g < 0) { falla(q, `la nota dibujada (${n.letra}${n.acc || ''}) no pertenece a la escala`); g = 0; }
        else if (n.acc === null && ton.notas.filter((x) => x.letra === n.letra).length !== 1) falla(q, 'ambiguo');
      } else {
        const texto = await page.locator(cont + ' .tm-gr-pedido').textContent();
        const rom = /grado\s+(I|II|III|IV|V|VI|VII)\b/.exec(texto);
        if (rom) g = ROMANOS.indexOf(rom[1]);
        else { const nom = /la\s+(\S+)\?/.exec(texto)[1]; g = nom === 'Sensible' || nom === 'Subtónica' ? 6 : NOMBRES.indexOf(nom); }
        if (g < 0) { falla(q, 'pedido ilegible: ' + texto); break; }
        if (/Sensible|Subtónica/.test(texto) && nombreGrado(ton.notas, 6) !== /(Sensible|Subtónica)/.exec(texto)[1]) falla(q, 'el nombre del VII pedido no es el que le toca a esta escala');
        esperada = ton.notas[g];
      }
      const n = ton.notas[g];
      if (tipo === 'grado') {
        await page.locator(cont + ` .tm-gr-pill[data-q="grado"][data-val="${g}"]`).click();
        await page.locator(cont + ` .tm-gr-pill[data-q="nombre"][data-val="${nombreGrado(ton.notas, g)}"]`).click();
      } else {
        await page.locator(cont + ` .tm-gr-pill[data-q="letra"][data-val="${n.letra}"]`).click();
        await page.locator(cont + ` .tm-gr-pill[data-q="acc"][data-val="${n.acc === 'b' ? 'b' : n.acc === '#' ? '#' : ''}"]`).click();
      }
      await page.locator(cont + ` .tm-gr-pill[data-q="clasif"][data-val="${CLASIF[g]}"]`).click();
      await page.locator(cont + ' .tm-gr-btn').click();
      const bien = await page.locator(cont + ' .tm-gr-fb').evaluate((e) => e.classList.contains('tm-bien'));
      if (!bien) falla(q, `se contesta lo correcto (grado ${ROMANOS[g]}, ${n.letra}${n.acc}) y el motor lo da por incorrecto`);
      if (tipo === 'nota') {   // la nota que se enseña al corregir
        await page.waitForTimeout(40);
        const d = await page.evaluate(leerEnPagina, cont);
        try {
          const x = interpretar(d);
          if (x.letra !== esperada.letra) falla(q, `se pidio ${esperada.letra}${esperada.acc} y el pentagrama muestra la letra ${x.letra}`);
          if (x.acc !== null && x.acc !== esperada.acc) falla(q, `se pidio ${esperada.letra}${esperada.acc} y el pentagrama muestra ${x.letra}${x.acc}`);
          if (x.arm !== null && x.arm !== ton.arm) falla(q, `armadura dibujada ${x.arm}, deberia ser ${ton.arm}`);
        } catch (e) { falla(q, e.message); }
      }
      await page.locator(cont + ' .tm-gr-btn').click();   // Siguiente / Ver resultado
    }
  } catch (e) { falla('?', String(e).slice(0, 200)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const tipo of ['grado', 'nota']) {
    for (const modo of [0, 1, 2]) {
      let p = 0; const fs = [];
      for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, tipo, modo, s * 7919); p += r.preguntas; fs.push(...r.fallos); }
      total += p; mal += fs.length;
      console.log(`${fs.length ? '✗' : '✓'} ${tipo.padEnd(5)} modo ${modo}  ${String(p).padStart(3)} preguntas · ${fs.length} discrepancias`);
      fs.slice(0, 6).forEach((f) => console.log('     - ' + f));
      if (fs.length > 6) console.log(`     … y ${fs.length - 6} mas`);
    }
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
