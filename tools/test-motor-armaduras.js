'use strict';
/**
 * Banco de pruebas de los ejercicios de armaduras (assets/js/armaduras-engine.js, pagina /ejercicios/tonalidades/):
 *   «identificar»: se ve una armadura y hay que decir la tonalidad mayor o menor;
 *   «dibujar»: se pide la armadura de una tonalidad y se colocan, una a una y con el raton, los sostenidos o bemoles (con lupa).
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-armaduras.js --version=verovio   # el motor del arbol de trabajo
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * El motor no expone sus preguntas: el banco las deduce DEL DIBUJO.
 *   identificar: se cuentan las alteraciones del dibujo y su signo (glifo), con sus propias tablas se calcula la tonalidad (mayor o
 *     menor segun diga la pregunta) y se contesta esa opcion («Correcto»); contestando otra, «Incorrecto». En clave de sol tambien se
 *     comprueba la posicion de cada alteracion (el orden F C G D A E B / B E A D G C F).
 *   dibujar: se lee la tonalidad pedida, se calcula la secuencia de alteraciones (orden y altura), se colocan con el raton (la lupa
 *     tiene que mostrar las ya puestas y la nueva en ambar) y se comprueba lo dibujado; la secuencia correcta da «Perfecto» y una mal
 *     (orden cambiado, una de menos, una de mas) «Incorrecto».
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const MOTOR = 'assets/js/armaduras-engine.js';
const URL = '/ejercicios/tonalidades/';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

/* tonalidades por numero de alteraciones (indice) */
const MAYOR_S = ['Do', 'Sol', 'Re', 'La', 'Mi', 'Si', 'Fa#', 'Do#'], MAYOR_B = ['Do', 'Fa', 'Sib', 'Mib', 'Lab', 'Reb', 'Solb', 'Dob'];
const MENOR_S = ['La', 'Mi', 'Si', 'Fa#', 'Do#', 'Sol#', 'Re#', 'La#'], MENOR_B = ['La', 'Re', 'Sol', 'Do', 'Fa', 'Sib', 'Mib', 'Lab'];
const nombre = (n, signo, menor) => (menor ? (signo > 0 ? MENOR_S : MENOR_B)[n] + ' menor' : (signo > 0 ? MAYOR_S : MAYOR_B)[n] + ' Mayor');
/* altura (media linea desde la linea inferior, clave de sol) de la 1.ª, 2.ª... alteracion */
const LOC_S = [8, 5, 9, 6, 3, 7, 4], LOC_B = [4, 7, 3, 6, 2, 5, 1];
const LETRA_S = 'fcgdaeb', LETRA_B = 'beadgcf';
const ES_LETRA = { f: 'Fa', c: 'Do', g: 'Sol', d: 'Re', a: 'La', e: 'Mi', b: 'Si' };
/* tonalidad mayor pedida -> { n, signo } */
function datosDe(mayor) {
  const i = MAYOR_S.indexOf(mayor), j = MAYOR_B.indexOf(mayor);
  if (i >= 0 && (i > 0 || j < 0)) return { n: i, signo: 1 };
  return { n: j, signo: -1 };
}

/** Dentro de la pagina: las alteraciones de la armadura de un dibujo (Verovio) */
function leerArmadura(svg) {
  const lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; }))].sort((a, b) => a - b);
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const acc = [...svg.querySelectorAll('.keySig .keyAccid')].map((k) => {
    const u = k.querySelector('use'), b = u.getBoundingClientRect();
    return { glifo: id(u), y: b.top + b.height / 2, x: b.left, ambar: /8b6914/i.test(k.outerHTML) };
  }).sort((a, b) => a.x - b.x);
  const clave = svg.querySelector('.clef use') ? id(svg.querySelector('.clef use')) : null;
  return { lineas, acc, clave };
}
const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};
async function abrir(browser, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leerArmadura.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + URL, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(URL.slice(1) + 'index.html') }));
    await page.route('**/' + MOTOR + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(MOTOR) }));
  }
  await page.goto(BASE + URL, { waitUntil: 'load' });
  return { ctx, page };
}

/* altura de una alteracion: el centro de la caja del bemol queda media linea por encima de su cabeza, por eso se resta 1 con E260 */
const locDe = (lec, y, glifo) => Math.round((lec.lineas[4] - y) / ((lec.lineas[4] - lec.lineas[0]) / 4 / 2)) - (glifo === 'E260' ? 1 : 0);

async function probarIdentificar(browser, nivel, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0, ultima = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${nivel} p${q}: ${m}`);
  try {
    const raiz = '#tmar_identificar';
    await page.waitForSelector(raiz + ' .tm-opt');
    await page.locator(`${raiz} [id$="_d_${nivel}"]`).click();
    for (let q = 1; q <= 12; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector(raiz + ' .tm-opt');
      await page.locator(raiz + ' .tm-card').scrollIntoViewIfNeeded();
      const pregunta = await page.locator(raiz + ' [id$="_quest"], ' + raiz + ' .tm-qtxt').first().innerText();
      const menor = /MENOR/.test(pregunta);
      let n, signo, clave = null;
      if (VERSION === 'verovio') {
        const lec = await page.evaluate((r) => window.__leer(document.querySelector(r + ' .tm-staff-wrap svg')), raiz);
        n = lec.acc.length;
        const glifos = new Set(lec.acc.map((a) => a.glifo));
        if (glifos.size > 1) { falla(q, 'la armadura mezcla sostenidos y bemoles: ' + [...glifos]); break; }
        signo = glifos.has('E260') ? -1 : 1;
        clave = lec.clave;
        if (n && !glifos.has('E262') && !glifos.has('E260')) { falla(q, 'glifo desconocido ' + [...glifos]); break; }
        // en clave de sol (E050) las alteraciones van en su sitio
        if (n && clave === 'E050') {
          const pos = lec.acc.map((a) => locDe(lec, a.y, a.glifo)), esperado = (signo > 0 ? LOC_S : LOC_B).slice(0, n);
          if (pos.join() !== esperado.join()) falla(q, `en clave de sol las alteraciones estan en ${pos} y deberian estar en ${esperado}`);
        }
        if (nivel !== 'hard' && clave !== 'E050') falla(q, 'fuera del nivel dificil sale una clave que no es de sol: ' + clave);
        if (nivel === 'easy' && menor) falla(q, 'en el nivel facil se pregunta por la menor');
      } else { throw new Error("la linea base con VexFlow no se lee (la armadura de VexFlow no se puede deducir del SVG): usa --version=verovio"); }
      const esperado = nombre(n, signo, menor);
      const bien = q % 2 === 1;
      const opciones = await page.locator(raiz + ' .tm-opt').allInnerTexts();
      if (!opciones.includes(esperado)) { falla(q, `la tonalidad ${esperado} (${n} ${signo > 0 ? 'sostenidos' : 'bemoles'}) no esta entre las opciones: ${opciones}`); await page.locator(raiz + ' .tm-opt').first().click(); await page.locator(raiz + ' .tm-nxt').click(); continue; }
      const elegido = bien ? esperado : opciones.find((o) => o !== esperado);
      await page.locator(raiz + ' .tm-opt', { hasText: new RegExp('^' + elegido.replace(/[#]/g, '\\#') + '$') }).click();
      const ok = await page.locator(raiz + ' .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `armadura de ${n} ${signo > 0 ? 'sostenidos' : 'bemoles'} (${esperado}); se contesta ${elegido} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      await page.locator(raiz + ' .tm-nxt').click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 600)); }
  await ctx.close();
  return { preguntas, fallos };
}

async function probarDibujar(browser, semilla) {
  const { ctx, page } = await abrir(browser, semilla);
  const fallos = []; let preguntas = 0, ultima = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} dibujar p${q}: ${m}`);
  const raiz = '#tmdib_dibujar';
  /* se pulsa la herramienta por el DOM y se centra el pentagrama: un click de Playwright desplazaria la pagina y el raton caeria fuera */
  const elegirHerramienta = (signo) => page.evaluate(([r, s]) => { document.querySelector(r + (s > 0 ? ' [id$="_tool_sharp"]' : ' [id$="_tool_flat"]')).click(); document.querySelector(r + ' .tm-staff-wrap').scrollIntoView({ block: 'center', behavior: 'instant' }); }, [raiz, signo]);
  const leerMain = () => page.evaluate((r) => window.__leer(document.querySelector(r + ' .tm-notacion svg')), raiz);
  try {
    await page.waitForSelector(raiz + ' .tm-notacion svg');
    for (let q = 1; q <= 14; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector(raiz + ' .tm-notacion svg');
      await page.locator(raiz + ' .tm-staff-wrap').scrollIntoViewIfNeeded();
      const txt = await page.locator(raiz + ' [id$="_quest"]').innerText();
      const m = /armadura de: (.+) Mayor/.exec(txt);
      if (!m) { falla(q, 'enunciado ilegible: ' + txt); break; }
      const { n, signo } = datosDe(m[1]);
      const loc = (signo > 0 ? LOC_S : LOC_B).slice(0, n);
      const bien = q % 3 !== 0;
      let aColocar = loc.map((l) => ({ loc: l, signo }));
      let motivo = '';
      if (!bien) {   // una secuencia mal: orden cambiado (si hay 2 o mas), una de menos, o una de mas
        if (n >= 2 && q % 2 === 0) { [aColocar[0], aColocar[1]] = [aColocar[1], aColocar[0]]; motivo = 'orden cambiado'; }
        else if (n >= 1) { aColocar = aColocar.slice(0, -1); motivo = 'una de menos'; }
        else { aColocar = [{ loc: 8, signo: 1 }]; motivo = 'una de mas'; }
      }
      for (let k = 0; k < aColocar.length; k++) {
        const a = aColocar[k];
        await elegirHerramienta(a.signo);
        const lec = await leerMain();
        const caja = await page.locator(raiz + ' .tm-staff-wrap').boundingBox();
        const sp = (lec.lineas[4] - lec.lineas[0]) / 4;
        const y = lec.lineas[4] - a.loc * sp / 2;
        const x = caja.x + caja.width / 2;
        await page.mouse.move(x, y); await page.mouse.down();
        await page.mouse.move(x + 3, y);
        if (VERSION === 'verovio') {   // la lupa: lo ya puesto y la nueva en ambar
          const lupa = await page.evaluate((r) => { const s = document.querySelector(r + ' .tm-loupe svg'); return s && getComputedStyle(s.closest('.tm-loupe')).display !== 'none' ? window.__leer(s) : null; }, raiz);
          if (!lupa) falla(q, 'no hay lupa al arrastrar');
          else {
            const amb = lupa.acc.filter((z) => z.ambar);
            if (lupa.acc.length !== k + 1 || amb.length !== 1) falla(q, `la lupa muestra ${lupa.acc.length} alteraciones (${k + 1} esperadas) y ${amb.length} en ambar`);
            else if (locDe(lupa, amb[0].y, amb[0].glifo) !== a.loc) falla(q, `la lupa pone la nueva en la altura ${locDe(lupa, amb[0].y, amb[0].glifo)} y se toco la ${a.loc}`);
          }
        }
        await page.mouse.up();
        const dib = await leerMain();
        if (dib.acc.length !== k + 1) { falla(q, `tras colocar ${k + 1} hay ${dib.acc.length} dibujadas`); break; }
        const ult = dib.acc[dib.acc.length - 1];
        if (locDe(dib, ult.y, ult.glifo) !== a.loc || ult.glifo !== (a.signo > 0 ? 'E262' : 'E260')) falla(q, `la ultima alteracion esta en ${locDe(dib, ult.y, ult.glifo)}/${ult.glifo} y se coloco ${a.loc}/${a.signo > 0 ? 'E262' : 'E260'}`);
      }
      if (q === 2 && aColocar.length >= 2) {   // deshacer y borrar
        await page.locator(raiz + ' [id$="_undo"]').click();
        if ((await leerMain()).acc.length !== aColocar.length - 1) falla(q, 'Deshacer no quita una');
        await page.locator(raiz + ' [id$="_clear"]').click();
        if ((await leerMain()).acc.length !== 0) falla(q, 'Borrar todo no deja el pentagrama vacio');
        for (let k = 0; k < aColocar.length; k++) {
          const a = aColocar[k];
          await elegirHerramienta(a.signo);
          const lec = await leerMain(), caja = await page.locator(raiz + ' .tm-staff-wrap').boundingBox();
          const y = lec.lineas[4] - a.loc * ((lec.lineas[4] - lec.lineas[0]) / 4) / 2;
          await page.mouse.move(caja.x + caja.width / 2, y); await page.mouse.down(); await page.mouse.up();
        }
      }
      await page.locator(raiz + ' .tm-submit').click();
      const ok = await page.locator(raiz + ' .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `${m[1]} Mayor (${n} ${signo > 0 ? 'sostenidos' : 'bemoles'}); se coloca ${bien ? 'la secuencia correcta' : motivo} y el motor dice ${ok ? 'Perfecto' : 'Incorrecto'}`);
      await page.locator(raiz + ' .tm-nxt').click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 600)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  const trabajos = [['identificar easy', (s) => probarIdentificar(browser, 'easy', s)], ['identificar med', (s) => probarIdentificar(browser, 'med', s)], ['identificar hard', (s) => probarIdentificar(browser, 'hard', s)]];
  if (VERSION === 'verovio') trabajos.push(['dibujar', (s) => probarDibujar(browser, s)]);
  for (const [nombreT, fn] of trabajos) {
    let n = 0; const fs = [];
    for (let s = 1; s <= SEMILLAS; s++) { const r = await fn(s * 7919); n += r.preguntas; fs.push(...r.fallos); }
    total += n; mal += fs.length;
    console.log(`${fs.length ? '✗' : '✓'} ${nombreT.padEnd(17)} ${String(n).padStart(3)} preguntas · ${fs.length} discrepancias`);
    fs.slice(0, 14).forEach((x) => console.log('     - ' + x));
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
