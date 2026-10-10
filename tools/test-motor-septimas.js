'use strict';
/**
 * Banco de pruebas de los ejercicios de acordes de septima (septimas-engine.js): «¿que acorde de septima es?» (dominante, sensible,
 * disminuida) y «construir el acorde» (colocar con el raton las tres notas que faltan), en las cuatro posiciones.
 *
 *   node tools/servidor-estatico.js                          (en otra terminal)
 *   node tools/test-motor-septimas.js --version=verovio      # el motor del arbol de trabajo
 *   node tools/test-motor-septimas.js --version=vexflow      # el de git (HEAD); solo sirve mientras HEAD conserve VexFlow
 *   opciones: --semillas=1 --base=http://127.0.0.1:8910 --paginas=reconocer|construir|todas
 *
 * Como en el banco de las triadas, la pregunta se deduce DEL DIBUJO:
 *   reconocer: se leen las cuatro notas (altura y alteracion), con sus propias tablas se decide que acorde de septima es y en que
 *     posicion esta; se contesta eso y el motor tiene que decir «Correcto» (y «Incorrecto» si se contesta otra cosa); ademas el
 *     tipo coincide con el que el motor tiene guardado (gancho tmSe7Debug_<id>);
 *   construir: se lee el enunciado, se calcula (con la distancia en letras de cada posicion) donde van las tres notas y con que
 *     alteracion, se coloca cada una con el raton y su herramienta, la lupa muestra el acorde con la nota nueva en ambar, y al fallar
 *     el pentagrama ensena la solucion; lo calculado aqui coincide con lo que el motor espera.
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 1));
const BASE = arg('base', 'http://127.0.0.1:8910');
const SOLO = arg('paginas', 'todas');
const FILTRO = arg('filtro', '');   // solo las paginas cuyo id contiene este texto
const RAIZ = path.join(__dirname, '..');
const MOTOR = 'assets/js/septimas-engine.js';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const NS = [0, 2, 4, 5, 7, 9, 11];
const NOMBRE_LETRA = { Do: 0, Re: 1, Mi: 2, Fa: 3, Sol: 4, La: 5, Si: 6 };
const TIPOS = { dominante: [4, 7, 10], sensible: [3, 6, 10], disminuida: [3, 6, 9] };
const POR_SIMBOLO = { '7': 'dominante', 'ø7': 'sensible', '°7': 'disminuida' };
const GLIFO_ACC = { E262: 1, E260: -1, E263: 2, E264: -2, E261: 0 };
const pc = (letra, acc) => (((NS[letra] + acc) % 12) + 12) % 12;
const letraDe = (paso) => ((paso % 7) + 7) % 7;
// letras desde el bajo hasta cada nota superior, segun la posicion (tercera, quinta, septima, y la fundamental sobre la septima = una segunda)
const SUBIDA = { fundamental: [2, 4, 6], '1a': [2, 4, 5], '2a': [2, 3, 5], '3a': [1, 3, 5] };
const MIEMBROS = { fundamental: [0, 2, 4, 6], '1a': [2, 4, 6, 0], '2a': [4, 6, 0, 2], '3a': [6, 0, 2, 4] };   // posicion en letras desde la fundamental, de abajo arriba

const TIPOS_PAG = [['dominante', 'construir-septima-de-dominante', 'tmac_dom'], ['sensible', 'construir-septima-de-sensible', 'tmac_sen'], ['disminuida', 'construir-septima-disminuida', 'tmac_dis']];
const POSICIONES = [['fundamental', '', '_fundamental'], ['1a', '-primera-inversion', '_1a'], ['2a', '-segunda-inversion', '_2a'], ['3a', '-tercera-inversion', '_3a'], ['todas', '-todas-las-posiciones', '_tds']];
const PAGINAS = { reconocer: [], construir: [] };
[['fundamental', 'septimas-en-fundamental', 'tmac_r_fundamental'], ['1a', 'septimas-en-primera-inversion', 'tmac_r_1a'], ['2a', 'septimas-en-segunda-inversion', 'tmac_r_2a'],
  ['3a', 'septimas-en-tercera-inversion', 'tmac_r_3a'], ['todas', 'septimas-todas-las-posiciones', 'tmac_r_tds']].forEach(([inv, url, id]) => PAGINAS.reconocer.push({ url: `/ejercicios/acordes/${url}/`, id, inv, tipo: null }));
for (const [tipo, base, pre] of TIPOS_PAG) for (const [inv, suf, sid] of POSICIONES) PAGINAS.construir.push({ url: `/ejercicios/acordes/${base}${suf}/`, id: pre + sid, inv, tipo });
PAGINAS.construir.push({ url: '/ejercicios/acordes/construir-septimas-mezcladas/', id: 'tmac_sep_mix', inv: 'todas', tipo: null });

/** Dentro de la pagina: las notas de un pentagrama con un acorde (Verovio o VexFlow). */
function leerAcorde(svg) {
  const caja = svg.getBoundingClientRect();
  const verovio = !!svg.querySelector('.measure');
  let lineas = null;
  if (verovio) lineas = [...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return b.top + b.height / 2; });
  else {
    const horiz = [...svg.querySelectorAll('path, rect, line')].map((e) => e.getBoundingClientRect()).filter((b) => b.height < 2.5 && b.width > caja.width * 0.6).map((b) => Math.round((b.top + b.height / 2) * 100) / 100);
    const u = [...new Set(horiz)].sort((a, b) => a - b);
    for (let i = 0; i + 4 < u.length && !lineas; i++) { const d = u[i + 1] - u[i]; if ([2, 3, 4].every((k) => Math.abs(u[i + k] - u[i + k - 1] - d) < 0.7)) lineas = u.slice(i, i + 5); }
  }
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const notas = verovio
    ? [...svg.querySelectorAll('.note')].map((n) => { const c = n.querySelector('.notehead use'), b = c.getBoundingClientRect(), a = n.querySelector('.accid use'); return { y: b.top + b.height / 2, acc: a ? id(a) : null, ambar: /8b6914/i.test(n.outerHTML) }; })
    : [...svg.querySelectorAll('.vf-notehead')].map((c) => { const b = c.getBoundingClientRect(); return { y: b.top + b.height / 2, acc: null, ambar: /8b6914/i.test(c.outerHTML) }; });
  return { verovio, lineas, notas };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function abrir(browser, url, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leerAcorde.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + url, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(url.replace(/^\//, '') + 'index.html') }));
    await page.route('**/' + MOTOR + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(MOTOR) }));
  }
  await page.goto(BASE + url, { waitUntil: 'load' });
  return { ctx, page };
}

function aNotas(lec) {
  const esp = (lec.lineas[4] - lec.lineas[0]) / 4;
  return lec.notas.map((n) => ({ paso: 30 + Math.round((lec.lineas[4] - n.y) / (esp / 2)), acc: n.acc ? GLIFO_ACC[n.acc] : 0, ambar: n.ambar })).sort((a, b) => a.paso - b.paso);
}
const leerId = (page, id) => page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id);

/** { tipo, inv } de cuatro notas ordenadas de grave a agudo, o null */
function clasificar(notas) {
  for (let r = 0; r < 4; r++) {
    const raiz = notas[r];
    const otras = notas.filter((_, i) => i !== r);
    const rel = otras.map((n) => ((letraDe(n.paso) - letraDe(raiz.paso)) + 7) % 7).sort((a, b) => a - b);
    if (rel.join() !== '2,4,6') continue;
    const dist = otras.map((n) => (((pc(letraDe(n.paso), n.acc) - pc(letraDe(raiz.paso), raiz.acc)) % 12) + 12) % 12).sort((a, b) => a - b);
    for (const [tipo, ds] of Object.entries(TIPOS)) {
      if (dist.join() !== ds.join()) continue;
      const bajoRel = ((letraDe(notas[0].paso) - letraDe(raiz.paso)) + 7) % 7;
      return { tipo, inv: { 0: 'fundamental', 2: '1a', 4: '2a', 6: '3a' }[bajoRel] };
    }
  }
  return null;
}

async function probarReconocer(browser, pag, nivel, semilla) {
  const { ctx, page } = await abrir(browser, pag.url, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${pag.inv} nivel ${nivel} p${q}: ${m}`);
  const id = pag.id;
  try {
    await page.waitForSelector(`#${id} .tm-iv-mode-btn`);
    await page.locator(`#${id} .tm-iv-mode-btn`).nth(nivel).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++;
      await page.waitForSelector(`#${id}_not svg`);
      const lec = await leerId(page, id);
      if (!lec.lineas || lec.lineas.length !== 5 || lec.notas.length !== 4) { falla(q, `se leen ${lec.notas.length} notas y ${lec.lineas ? lec.lineas.length : 0} lineas (4 y 5 esperadas)`); break; }
      const notas = aNotas(lec);
      const c = clasificar(notas);
      if (!c) { falla(q, 'las cuatro notas dibujadas no forman un acorde de septima: ' + JSON.stringify(notas)); await page.locator(`#${id}_opts .tm-opt`).first().click(); await page.locator(`#${id}_btn`).click(); await page.locator(`#${id}_nxt`).click(); continue; }
      if (pag.inv !== 'todas' && c.inv !== pag.inv) falla(q, `la pagina es de ${pag.inv} y el acorde dibujado esta en ${c.inv}`);
      const dep = await page.evaluate((i) => (window['tmSe7Debug_' + i] ? window['tmSe7Debug_' + i]() : null), id);
      if (dep && dep.chord && dep.chord.id !== c.tipo) falla(q, `el dibujo es un acorde ${c.tipo} y el motor guarda ${dep.chord.id}`);
      if (dep && VERSION === 'verovio' && dep.inv !== undefined && ['fundamental', '1a', '2a', '3a'][dep.inv] !== c.inv) falla(q, `el dibujo esta en ${c.inv} y el motor guarda la posicion ${dep.inv}`);
      const bien = q % 2 === 1;
      const botones = await page.locator(`#${id}_opts .tm-opt`).evaluateAll((els) => els.map((e) => e.dataset.v));
      const elegido = bien ? c.tipo : botones.find((v) => v !== c.tipo);
      await page.locator(`#${id}_opts .tm-opt[data-v="${elegido}"]`).click();
      await page.locator(`#${id}_btn`).click();
      const ok = await page.locator(`#${id}_fb`).evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `se dibuja un acorde ${c.tipo} (${c.inv}), se contesta ${elegido} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      await page.locator(`#${id}_nxt`).click();
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

function leerEnunciado(html) {
  const m = /<strong>(Do|Re|Mi|Fa|Sol|La|Si)(♯♯|♭♭|♯|♭)?\s*—\s*([^\s<—]+)/.exec(html);
  if (!m) throw new Error('enunciado ilegible: ' + html);
  const acc = { '♯♯': 2, '♯': 1, '♭': -1, '♭♭': -2 }[m[2]] || 0;
  const tipo = POR_SIMBOLO[m[3]];
  if (!tipo) throw new Error('simbolo de acorde desconocido: ' + m[3]);
  const inv = /1ª inv/.test(html) ? '1a' : /2ª inv/.test(html) ? '2a' : /3ª inv/.test(html) ? '3a' : 'fundamental';
  return { raiz: { letra: NOMBRE_LETRA[m[1]], acc }, tipo, inv };
}
function esperadas(en, pasoBajo) {
  const [t, q, s] = TIPOS[en.tipo];
  const semis = { 0: 0, 2: t, 4: q, 6: s };
  const raizPc = pc(en.raiz.letra, en.raiz.acc);
  const miembros = MIEMBROS[en.inv];
  const subida = [0].concat(SUBIDA[en.inv]);
  return miembros.map((rel, k) => {
    const paso = pasoBajo + subida[k];
    const letra = letraDe(paso);
    if (letra !== (en.raiz.letra + rel) % 7) throw new Error(`el bajo dibujado esta en el paso ${pasoBajo} y la letra ${letra} no es la del miembro ${rel} (${(en.raiz.letra + rel) % 7})`);
    let acc = (((raizPc + semis[rel]) % 12) - NS[letra] + 12) % 12; if (acc > 6) acc -= 12;
    return { paso, acc };
  });
}

async function probarConstruir(browser, pag, nivel, semilla) {
  const { ctx, page } = await abrir(browser, pag.url, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${pag.tipo || 'mezcla'} ${pag.inv} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  const id = pag.id;
  try {
    await page.waitForSelector(`#${id} .tm-iv-mode-btn`);
    await page.locator(`#${id} .tm-iv-mode-btn`).nth(nivel).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++;
      await page.waitForSelector(`#${id}_not svg`);
      await page.locator(`#${id}_wrap`).scrollIntoViewIfNeeded();
      const en = leerEnunciado(await page.locator(`#${id}_q`).innerHTML());
      if (pag.inv !== 'todas' && en.inv !== pag.inv) falla(q, `la pagina es de ${pag.inv} y el enunciado pide ${en.inv}`);
      if (pag.tipo && en.tipo !== pag.tipo) falla(q, `la pagina es de ${pag.tipo} y el enunciado pide ${en.tipo}`);
      const bajo = aNotas(await leerId(page, id));
      if (bajo.length !== 1) { falla(q, `al empezar hay ${bajo.length} notas y deberia haber 1`); break; }
      let exp;
      try { exp = esperadas(en, bajo[0].paso); } catch (e) { falla(q, e.message); break; }
      if (verovio && bajo[0].acc !== exp[0].acc) falla(q, `la nota dada lleva alteracion ${bajo[0].acc} y el enunciado implica ${exp[0].acc}`);
      // lo que espera el motor = lo que calculamos aqui
      const dep = await page.evaluate((i) => (window['tmSe7Debug_' + i] ? window['tmSe7Debug_' + i]() : null), id);
      if (dep && dep.exp) {
        const suyas = dep.exp.map((e) => `${e.oct * 7 + 'cdefgab'.indexOf(e.vfn)}/${e.a}`).join(' ');
        const mias = exp.slice(1).map((e) => `${e.paso}/${e.acc}`).join(' ');
        if (suyas !== mias) falla(q, `el motor espera [${suyas}] y el calculo del banco da [${mias}]`);
      }
      const bien = q % 2 === 1;
      const aColocar = exp.slice(1).map((e) => ({ ...e }));
      if (!bien) aColocar[2] = { paso: aColocar[2].paso + (aColocar[2].paso + 1 <= 42 ? 1 : -1), acc: aColocar[2].acc };
      const caja = await page.evaluate((i) => { const w = document.getElementById(i + '_wrap').getBoundingClientRect(); return { x: w.left + w.width / 2 }; }, id);
      const colocar = async (nota, comprobarLupa, k) => {
        const herr = page.locator(`#${id}_card .tm-tool[data-acc="${nota.acc}"]`);
        if (!(await herr.count())) { falla(q, `no hay herramienta para la alteracion ${nota.acc}`); return; }
        await herr.click();
        const l = await leerId(page, id);
        const esp = (l.lineas[4] - l.lineas[0]) / 4;
        const y = l.lineas[0] + (38 - nota.paso) * esp / 2;   // la linea superior es Fa 5 (38)
        await page.mouse.move(caja.x, y); await page.mouse.down();
        if (verovio && comprobarLupa) {
          const lupa = await page.evaluate(() => { const s = document.querySelector('.tm-iv-loupe-staff svg'); return s ? window.__leer(s) : null; });
          if (!lupa) falla(q, 'no hay lupa al arrastrar');
          else {
            const ln = aNotas(lupa), ambar = ln.filter((n) => n.ambar);
            if (ln.length !== k + 2) falla(q, `la lupa muestra ${ln.length} notas y deberian ser ${k + 2}`);
            if (ambar.length !== 1 || ambar[0].paso !== nota.paso || ambar[0].acc !== nota.acc) falla(q, `la lupa no marca en ambar la nota ${nota.paso}/${nota.acc}: ${JSON.stringify(ambar)}`);
          }
        }
        await page.mouse.up();
        const dib = aNotas(await leerId(page, id));
        if (dib.length !== k + 2) falla(q, `tras colocar ${k + 1} nota(s) hay ${dib.length} dibujadas`);
        else if (!dib.some((n) => n.paso === nota.paso && (!verovio || n.acc === nota.acc))) falla(q, `la nota colocada (${nota.paso}, alt ${nota.acc}) no esta donde se toco: ${JSON.stringify(dib)}`);
      };
      for (let k = 0; k < 3; k++) await colocar(aColocar[k], true, k);
      const nc = await page.locator(`#${id}_nc`).textContent();
      if (!/3 \/ 3/.test(nc)) falla(q, 'el contador dice «' + nc + '»');
      if (q === 1) {   // deshacer y limpiar, una vez por serie
        await page.locator(`#${id}_undo`).click();
        const t1 = aNotas(await leerId(page, id)).length;
        if (t1 !== 3) falla(q, `tras Deshacer hay ${t1} notas y deberian ser 3`);
        await page.locator(`#${id}_clear`).click();
        const t2 = aNotas(await leerId(page, id)).length;
        if (t2 !== 1) falla(q, `tras Limpiar hay ${t2} notas y deberia ser 1`);
        for (let k = 0; k < 3; k++) await colocar(aColocar[k], false, k);
      }
      await page.locator(`#${id}_btn`).click();
      const ok = await page.locator(`#${id}_fb`).evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `se colocan ${bien ? 'las notas correctas' : 'una nota mal'} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      if (!bien && verovio) {
        const sol = aNotas(await leerId(page, id));
        const esperado = exp.map((e) => `${e.paso}/${e.acc}`).join(' '), visto = sol.map((e) => `${e.paso}/${e.acc}`).join(' ');
        if (esperado !== visto) falla(q, `la solucion dibujada es [${visto}] y deberia ser [${esperado}]`);
      }
      await page.locator(`#${id}_nxt`).click();
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  const niveles = VERSION === 'vexflow' ? [0] : [0, 1, 2];
  for (const [modo, fn] of [['reconocer', probarReconocer], ['construir', probarConstruir]]) {
    if (SOLO !== 'todas' && SOLO !== modo) continue;
    for (const pag of PAGINAS[modo].filter((x) => !FILTRO || x.id.includes(FILTRO))) {
      let p = 0; const fs = [];
      for (const nivel of niveles) for (let s = 1; s <= SEMILLAS; s++) { const r = await fn(browser, pag, nivel, s * 7919 + nivel); p += r.preguntas; fs.push(...r.fallos); }
      total += p; mal += fs.length;
      console.log(`${fs.length ? '✗' : '✓'} ${modo.padEnd(9)} ${(pag.tipo || 'mezcla').padEnd(10)} ${pag.inv.padEnd(11)} ${String(p).padStart(3)} preguntas · ${fs.length} discrepancias`);
      fs.slice(0, 5).forEach((x) => console.log('     - ' + x));
      if (fs.length > 5) console.log(`     … y ${fs.length - 5} mas`);
    }
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
