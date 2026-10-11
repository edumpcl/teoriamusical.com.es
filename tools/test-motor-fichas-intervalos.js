'use strict';
/**
 * Banco de pruebas de la PRACTICA EN PANTALLA del generador de fichas de intervalos (assets/js/fichas-intervalos-engine.js, pagina
 * /ejercicios/ejercicios-de-intervalos-musicales/a-medida/): «analizar» (que intervalo es) y «escribir» (colocar la 2.ª nota con el raton,
 * lupa incluida).
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-fichas-intervalos.js [--semillas=2] [--base=http://127.0.0.1:8910]
 *
 * El motor no expone sus preguntas: el banco las deduce DEL DIBUJO (altura de cada nota contra las lineas, alteracion por el glifo),
 * calcula el intervalo con sus propias tablas, contesta eso y comprueba «¡Correcto!»; si se contesta otra cosa, «Era una...».
 * En «escribir» se lee el enunciado («Si — 3.ª menor — ↑»), se calcula donde va la nota y con que alteracion, se coloca con el raton y se
 * comprueba la lupa (nota nueva en ambar) y, al corregir, que el pentagrama ensena la solucion.
 */
const { chromium } = require('playwright');
const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const SEMILLAS = Number(arg('semillas', 2));
const BASE = arg('base', 'http://127.0.0.1:8910');
const URL = '/ejercicios/ejercicios-de-intervalos-musicales/a-medida/';

const NS = [0, 2, 4, 5, 7, 9, 11];
const GLIFO_ACC = { E262: 1, E260: -1, E263: 2, E264: -2, E261: 0 };
const CAL = { d: 'disminuida', m: 'menor', J: 'justa', M: 'Mayor', A: 'aumentada' };
const CAL_INV = { disminuida: 'd', menor: 'm', justa: 'J', Mayor: 'M', aumentada: 'A' };

function leer(svg) {
  const verovio = !!svg.querySelector('.measure');
  const lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; }))].sort((a, b) => a - b);
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const notas = [...svg.querySelectorAll('.note')].map((n) => {
    const c = n.querySelector('.notehead use'), b = c.getBoundingClientRect(), a = n.querySelector('.accid use');
    return { y: b.top + b.height / 2, x: b.left + b.width / 2, acc: a ? id(a) : null, ambar: /8b6914/i.test(n.outerHTML) };
  });
  const caja = svg.getBoundingClientRect();
  return { verovio, lineas, notas, izq: caja.left, ancho: caja.width };
}
const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};
function aNotas(lec) {
  const esp = (lec.lineas[4] - lec.lineas[0]) / 4;
  return lec.notas.map((n) => {
    const paso = 30 + Math.round((lec.lineas[4] - n.y) / (esp / 2));
    const acc = n.acc ? GLIFO_ACC[n.acc] : 0;
    return { paso, acc, x: n.x, ambar: n.ambar, semis: Math.floor(paso / 7) * 12 + NS[((paso % 7) + 7) % 7] + acc };
  });
}
const tamano = (d) => Math.floor(d / 7) * 12 + NS[d % 7];
/** (d, semitonos) -> { numero, q } */
function clasificar(d, s) {
  const dif = s - tamano(d);
  const perfecta = [0, 3, 4].includes(d % 7);
  const q = perfecta ? { '-1': 'd', 0: 'J', 1: 'A' }[dif] : { '-2': 'd', '-1': 'm', 0: 'M', 1: 'A' }[dif];
  return { numero: d + 1, q };
}
function semitonos(d, q) {
  const perfecta = [0, 3, 4].includes(d % 7);
  return tamano(d) + (perfecta ? { d: -1, J: 0, A: 1 } : { d: -2, m: -1, M: 0, A: 1 })[q];
}

async function probar(browser, modo, dificultad, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leer.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  const fallos = []; let preguntas = 0, ultima = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${modo}/${dificultad} p${q}: ${m}`);
  try {
    await page.goto(BASE + URL, { waitUntil: 'load' });
    await page.waitForSelector('.tm-fg-ops[data-g="nums"]');
    for (const n of [4, 5, 6, 7, 8]) await page.locator(`.tm-fg-ops[data-g="nums"] [data-v="${n}"]`).click();
    await page.locator(`.tm-fg-ops[data-g="modo"] [data-v="${modo}"]`).click();
    await page.locator(`.tm-fg-ops[data-g="dificultad"] [data-v="${dificultad}"]`).click();
    await page.locator('.tm-fg-ops[data-g="total"] [data-v="12"]').click();
    await page.locator('.tm-fg-btn[data-a="empezar"]').click();
    const leerStaff = () => page.evaluate(() => window.__leer(document.querySelector('.tm-fg-staff svg')));
    for (let q = 1; q <= 12; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector('.tm-fg-staff svg');
      await page.locator('.tm-fg-staff').scrollIntoViewIfNeeded();
      const lec = await leerStaff();
      const notas = lec.lineas.length === 5 ? aNotas(lec) : [];
      const bien = q % 2 === 1;
      if (modo === 'analizar') {
        if (notas.length !== 2) { falla(q, `el dibujo tiene ${notas.length} notas`); break; }
        const [a, b] = notas[0].x < notas[1].x ? notas : [notas[1], notas[0]];
        const asc = b.paso > a.paso || (b.paso === a.paso && b.semis > a.semis);
        const inf = asc ? a : b, sup = asc ? b : a;
        const cl = clasificar(sup.paso - inf.paso, sup.semis - inf.semis);
        if (!cl.q) { falla(q, 'intervalo no clasificable ' + JSON.stringify(notas)); break; }
        let numero = cl.numero, esp = cl.q, dir = asc ? 1 : -1;
        if (!bien) { const ofrecidas = await page.locator('.tm-fg-grid[data-r="esp"] .tm-fg-resp').evaluateAll((els) => els.map((e) => e.dataset.v)); esp = ofrecidas.find((x) => x !== esp) || esp; }
        // Con varios numeros hay fila de numero; la especie y la direccion siempre
        const filaNum = page.locator('.tm-fg-grid[data-r="num"] .tm-fg-resp[data-v="' + numero + '"]');
        if (await filaNum.count()) await filaNum.click();
        const boton = page.locator('.tm-fg-grid[data-r="esp"] .tm-fg-resp[data-v="' + esp + '"]');
        if (!(await boton.count())) { falla(q, `el motor no ofrece la especie ${esp} para ${numero}.a`); break; }
        await boton.click();
        await page.locator('.tm-fg-grid[data-r="dir"] .tm-fg-resp[data-v="' + dir + '"]').click();
        await page.locator('.tm-fg-btn[data-a="comprobar"]').click();
        const ok = await page.locator('.tm-fg-fb').evaluate((e) => e.classList.contains('bien'));
        if (ok !== (bien || esp === cl.q)) falla(q, `dibujo ${numero}.a ${cl.q} ${asc ? 'asc' : 'desc'}; se contesta ${esp} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      } else {
        if (notas.length !== 1) { falla(q, `al empezar hay ${notas.length} notas y deberia haber 1`); break; }
        const dada = notas[0];
        const txt = (await page.locator('.tm-fg-dir').innerText()).replace(/\s+/g, ' ');
        const m = /(\d)ª (\S+) — ([↑↓])/.exec(txt);
        if (!m) { falla(q, 'enunciado ilegible: ' + txt); break; }
        const d = Number(m[1]) - 1, qq = CAL_INV[m[2]], asc = m[3] === '↑';
        if (!qq) { falla(q, 'especie ilegible: ' + m[2]); break; }
        const sem = semitonos(d, qq);
        const paso = dada.paso + (asc ? d : -d);
        const letra = ((paso % 7) + 7) % 7;
        const semis = asc ? dada.semis + sem : dada.semis - sem;
        const obj = { paso, acc: semis - (Math.floor(paso / 7) * 12 + NS[letra]) };
        if (Math.abs(obj.acc) > 1) { falla(q, `el motor pide una nota con alteracion ${obj.acc}`); break; }
        let col = { ...obj };
        if (!bien) col = { paso: obj.paso + (obj.paso + 1 <= 38 ? 1 : -1), acc: obj.acc };
        await page.locator(`.tm-fg-grid[data-r="alt"] .tm-fg-resp[data-v="${col.acc}"]`).click();
        const l0 = await leerStaff();
        const esp2 = (l0.lineas[4] - l0.lineas[0]) / 4;
        const y = l0.lineas[0] + (38 - col.paso) * esp2 / 2;
        const cx = l0.izq + l0.ancho / 2 + 15;
        await page.mouse.move(cx, y);
        const lupa = await page.evaluate(() => { const s = document.querySelector('.tm-fg-loupe svg'); return s && getComputedStyle(s.closest('.tm-fg-loupe')).display !== 'none' ? window.__leer(s) : null; });
        if (!lupa) falla(q, 'no hay lupa al pasar el raton');
        else {
          const ln = aNotas(lupa), amb = ln.filter((n) => n.ambar);
          if (ln.length !== 2 || amb.length !== 1 || amb[0].paso !== col.paso || amb[0].acc !== col.acc) falla(q, `la lupa no marca en ambar ${col.paso}/${col.acc}: ${JSON.stringify(ln)}`);
        }
        await page.mouse.click(cx, y);
        const dib = aNotas(await leerStaff());
        if (dib.length !== 2 || !dib.some((n) => n.paso === col.paso && n.acc === col.acc)) falla(q, `la nota colocada (${col.paso}/${col.acc}) no esta donde se toco: ${JSON.stringify(dib)}`);
        await page.locator('.tm-fg-btn[data-a="comprobar"]').click();
        const ok = await page.locator('.tm-fg-fb').evaluate((e) => e.classList.contains('bien'));
        if (ok !== bien) falla(q, `se coloca ${bien ? 'la nota correcta' : 'una mal'} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
        const sol = aNotas(await leerStaff());
        if (sol.length !== 2 || !sol.some((n) => n.paso === obj.paso && n.acc === obj.acc)) falla(q, `la solucion dibujada ${JSON.stringify(sol.map((n) => n.paso + '/' + n.acc))} no incluye ${obj.paso}/${obj.acc}`);
      }
      await page.locator('.tm-fg-btn[data-a="siguiente"]').click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 600)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const modo of ['analizar', 'escribir']) {
    for (const dif of ['naturales', 'alteradas']) {
      let n = 0; const fs = [];
      for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, modo, dif, s * 7919); n += r.preguntas; fs.push(...r.fallos); }
      total += n; mal += fs.length;
      console.log(`${fs.length ? '✗' : '✓'} ${modo.padEnd(9)} ${dif.padEnd(10)} ${String(n).padStart(3)} preguntas · ${fs.length} discrepancias`);
      fs.slice(0, 5).forEach((x) => console.log('     - ' + x));
    }
  }
  await browser.close();
  console.log(`\n${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
