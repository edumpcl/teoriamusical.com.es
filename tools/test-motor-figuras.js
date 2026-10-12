'use strict';
/**
 * Banco de pruebas de los ejercicios de figuras y ritmo en pantalla (assets/js/figuras-engine.js; /ejercicios/figuras/): identificar figuras y
 * silencios, valor en el compas, equivalencias, sumar figuras, ligaduras de union y expresion, y puntillo = ligadura.
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-figuras.js [--semillas=2] [--solo=valor] [--base=http://127.0.0.1:8910]
 *
 * El motor no expone sus preguntas: el banco las deduce DEL DIBUJO (tools/lib-leer-figuras.js: duracion por cabeza, bandera o barras, puntillos,
 * silencios, cifra, ligaduras) y de los dibujos de las opciones; con sus propias tablas calcula la respuesta, pulsa esa opcion y el motor
 * tiene que decir «¡Correcto!»; si se pulsa otra, «No es correcto.». Las opciones con numeros o fracciones se leen por su texto (se
 * convierten a valor) y las que son dibujos (figuras, grupos ligados) por su propio dibujo.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { fuente } = require('./lib-leer-figuras.js');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const SEMILLAS = Number(arg('semillas', 2));
const BASE = arg('base', 'http://127.0.0.1:8910');
const SOLO = arg('solo', '');
const RAIZ = path.join(__dirname, '..');

const DUR = { w: 64, h: 32, q: 16, '8': 8, '16': 4 };
const PUNT = [1, 1.5, 1.75];
const NOMBRE = { w: 'redonda', h: 'blanca', q: 'negra', '8': 'corchea', '16': 'semicorchea' };
const PLURAL = { redondas: 'w', blancas: 'h', negras: 'q', corcheas: '8', semicorcheas: '16' };
const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const valor = (x) => DUR[x.duracion] * PUNT[x.puntillos];
const ORDEN = ['w', 'h', 'q', '8', '16'];

function paginas() {
  const dir = path.join(RAIZ, 'ejercicios/figuras');
  const out = [];
  for (const d of fs.readdirSync(dir)) {
    const f = path.join(dir, d, 'index.html');
    if (!fs.existsSync(f)) continue;
    const t = fs.readFileSync(f, 'utf8');
    const m = /tmFigurasEjercicio\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/.exec(t);
    if (m) out.push({ url: `/ejercicios/figuras/${d}/`, id: m[1], tipo: m[2] });
  }
  return out.filter((p) => !SOLO || p.url.includes(SOLO) || p.tipo.includes(SOLO));
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

/** «1 tiempo y 2/3 de tiempo», «¾ de tiempo», «2 tiempos y medio», «½ tiempo» -> [n, d] */
function valorTexto(html) {
  let t = html.replace(/<span[^>]*aria-label="(\d+)\/(\d+)"[^>]*>[\s\S]*?<\/span>/g, ' $1/$2 ').replace(/<[^>]+>/g, ' ').replace(/&#8239;|&nbsp;| | /g, ' ');
  t = t.replace(/½/g, ' 1/2 ').replace(/¼/g, ' 1/4 ').replace(/¾/g, ' 3/4 ').replace(/\s+/g, ' ').trim();
  let n = 0, d = 1;
  const suma = (a, b) => { n = n * b + a * d; d = d * b; const g = (x, y) => (y ? g(y, x % y) : x); const k = g(Math.abs(n), d) || 1; n /= k; d /= k; };
  const ent = /(?<![\/\d])(\d+)\s+tiempos?/.exec(t);   // sin pillar el denominador de «1/2 tiempo»
  if (ent) suma(Number(ent[1]), 1);
  if (/y medio/.test(t)) suma(1, 2);
  for (const m of t.matchAll(/(\d+)\/(\d+)/g)) suma(Number(m[1]), Number(m[2]));
  return [n, d];
}
const red = (n, d) => { const g = (x, y) => (y ? g(y, x % y) : x); const k = g(Math.abs(n), d) || 1; return [n / k, d / k]; };
const igual = (a, b) => a[0] * b[1] === b[0] * a[1];

async function probar(browser, p, nivel, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1100 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  const fallos = []; let preguntas = 0, ultima = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} modo ${nivel} p${q}: ${m}`);
  const R = '#' + p.id;
  try {
    await page.goto(BASE + p.url, { waitUntil: 'load' });
    await page.evaluate(`window.__leerFiguras = ${fuente};`);
    await page.waitForSelector(R + ' .tm-fg-modo');
    const nModos = await page.locator(R + ' .tm-fg-modo').count();
    await page.locator(R + ' .tm-fg-modo').nth(Math.min(nivel, nModos - 1)).click();
    for (let q = 1; q <= 10; q++) {
      await page.waitForSelector(R + ' .tm-fg-dibujo svg, ' + R + ' .tm-fg-res');
      if (await page.locator(R + ' .tm-fg-res').count()) { if (q <= 5) falla(q, 'la ronda termina en la pregunta ' + q); break; }   // el test de puntillo tiene pocas preguntas distintas y acaba antes de las 10
      preguntas++; ultima = q;
      await page.evaluate((r) => document.querySelector(r + ' .tm-fg-card').scrollIntoView({ block: 'center', behavior: 'instant' }), R);
      const enun = (await page.locator(R + ' .tm-fg-preg').innerText()).replace(/\s+/g, ' ');
      const dib = await page.evaluate((r) => window.__leerFiguras(document.querySelector(r + ' .tm-fg-dibujo svg')), R);
      const notas = dib.notas;
      // las opciones de cada seccion: texto, y dibujo si lo tienen
      const secs = await page.evaluate((r) => [...document.querySelectorAll(r + ' .tm-fg-seccion')].map((s) => ({
        g: s.getAttribute('data-g'),
        ops: [...s.querySelectorAll('.tm-fg-op')].map((b) => ({ html: b.innerHTML, texto: b.innerText.replace(/\s+/g, ' ').trim(), dibujos: [...b.querySelectorAll('svg.definition-scale, svg')].filter((v) => v.parentElement && v.getAttribute('role') === 'img').map((v) => window.__leerFiguras(v)) })),
      })), R);
      const eleg = {};   // seccion -> indice a pulsar
      let esperado = null;
      const fr = (nn, dd) => red(nn, dd);
      switch (p.tipo) {
        case 'identificar': {
          if (notas.length !== 1) { falla(q, `${notas.length} simbolos dibujados`); break; }
          const x = notas[0];
          for (const s of secs) {
            if (s.g === 'clase') eleg.clase = x.silencio ? 1 : 0;
            if (s.g === 'cual') eleg.cual = ORDEN.indexOf(x.duracion);
            if (s.g === 'punt') eleg.punt = x.puntillos;
          }
          break;
        }
        case 'valor': case 'sumar': case 'ligaduras': {
          const c = dib.cifra;
          if (!TIEMPO[c]) { falla(q, `cifra ilegible «${c}»`); break; }
          if (!new RegExp(c.replace('/', '\\/')).test(enun)) falla(q, `el enunciado «${enun}» no nombra el compas dibujado ${c}`);
          let total;
          if (p.tipo === 'valor') total = valor(notas[0]);
          else if (p.tipo === 'sumar') total = notas.reduce((a, x) => a + valor(x), 0);
          else {
            const cv = dib.curvas[0];
            if (!cv) { falla(q, 'sin ligadura dibujada'); break; }
            const alt = notas.slice(cv.desde, cv.hasta + 1).map((x) => x.clave);
            const union = cv.hasta - cv.desde === 1 && alt.every((a) => a === alt[0]);
            eleg.clase = union ? 0 : 1;
            total = union ? valor(notas[cv.desde]) + valor(notas[cv.hasta]) : valor(notas[cv.desde]);
          }
          esperado = fr(total, TIEMPO[c]);
          break;
        }
        case 'equivalencias': {
          if (notas.length !== 1) { falla(q, `${notas.length} simbolos dibujados`); break; }
          const x = notas[0];
          if (/Cuántas/.test(enun)) {
            const b = PLURAL[Object.keys(PLURAL).find((k) => new RegExp('Cuántas ' + k).test(enun))];
            esperado = [valor(x) / DUR[b], 1];
            if (!b) falla(q, 'no se lee que figura se cuenta: ' + enun);
          } else {
            const m = /equivale a (\d+) (\w+)/.exec(enun);
            if (!m) { falla(q, 'enunciado ilegible: ' + enun); break; }
            esperado = [Number(m[1]) * DUR[PLURAL[m[2]]], 1];   // valor total en semifusas
            esperado.opcionesFigura = true;
          }
          break;
        }
        case 'puntillo': {
          if (/pareja de figuras ligadas/.test(enun)) {
            if (notas.length !== 1) { falla(q, `${notas.length} simbolos dibujados`); break; }
            esperado = [valor(notas[0]), 1]; esperado.opcionesDibujo = 'suma';
          } else {
            esperado = [notas.reduce((a, x) => a + DUR[x.duracion], 0), 1]; esperado.opcionesDibujo = 'figura';
          }
          break;
        }
      }
      if (esperado) {
        // en la unica seccion con opciones de valor
        const sv = secs.find((s) => !['clase', 'cual', 'punt'].includes(s.g)) || secs[secs.length - 1];
        if (!sv) { falla(q, 'sin seccion de valor'); }
        else {
          let buenas = [];
          sv.ops.forEach((o, i) => {
            let v;
            if (esperado.opcionesFigura) { const m = /(una|un|\d+)?\s*(redonda|blanca|negra|corchea|semicorchea)( con (doble )?puntillo)?/.exec(o.texto); v = m ? [DUR[Object.keys(NOMBRE).find((k) => NOMBRE[k] === m[2])] * (m[4] ? 1.75 : m[3] ? 1.5 : 1), 1] : null; }
            else if (esperado.opcionesDibujo === 'suma') v = o.dibujos.length ? [o.dibujos[0].notas.reduce((a, x) => a + DUR[x.duracion], 0), 1] : null;
            else if (esperado.opcionesDibujo === 'figura') v = o.dibujos.length ? [valor(o.dibujos[0].notas[0]), 1] : null;
            else v = /^\d+$/.test(o.texto) && !/tiempo/.test(o.texto) ? [Number(o.texto), 1] : valorTexto(o.html);
            if (v && igual(red(v[0] * (v[1] === 1 ? 1 : 1), v[1]), red(esperado[0], esperado[1]))) buenas.push(i);
          });
          if (buenas.length !== 1) falla(q, `la respuesta ${esperado[0]}/${esperado[1]} aparece ${buenas.length} veces entre las opciones: ${sv.ops.map((o) => o.texto || '(dibujo)').join(' | ')}`);
          else eleg[sv.g] = buenas[0];
        }
      }
      const completas = secs.every((s) => s.g in eleg);
      if (!completas) { falla(q, `no se puede decidir la respuesta de las secciones ${secs.filter((s) => !(s.g in eleg)).map((s) => s.g)}`); break; }
      const bien = q % 2 === 1;
      if (!bien) {   // una seccion cualquiera, otra opcion
        const s0 = secs[secs.length - 1];
        eleg[s0.g] = (eleg[s0.g] + 1) % s0.ops.length;
      }
      for (const s of secs) await page.locator(R + ` .tm-fg-seccion[data-g="${s.g}"] .tm-fg-op[data-i="${eleg[s.g]}"]`).click();
      await page.locator(R + ' .tm-fg-btn').click();
      const ok = await page.locator(R + ' .tm-fg-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `«${enun}» (${notas.map((x) => (x.silencio ? 's' : '') + x.duracion + '.'.repeat(x.puntillos)).join(' ')}); se pulsa ${bien ? 'lo correcto' : 'otra opcion'} y el motor dice ${ok ? 'Correcto' : 'No es correcto'}`);
      await page.locator(R + ' .tm-fg-btn').click();   // Siguiente
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 700)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const p of paginas()) {
    let n = 0; const fs2 = [];
    for (const nivel of [0, 1, 2]) for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, p, nivel, s * 7919 + nivel); n += r.preguntas; fs2.push(...r.fallos); }
    total += n; mal += fs2.length;
    console.log(`${fs2.length ? '✗' : '✓'} ${p.tipo.padEnd(14)} ${String(n).padStart(3)} preguntas · ${fs2.length} discrepancias`);
    fs2.slice(0, 8).forEach((x) => console.log('     - ' + x.slice(0, 400)));
  }
  await browser.close();
  console.log(`\n${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
