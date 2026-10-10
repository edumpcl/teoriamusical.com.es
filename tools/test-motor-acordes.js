'use strict';
/**
 * Banco de pruebas de los ejercicios de tríadas (acordes-engine.js): «¿qué tríada es?» (fundamental, 1.ª, 2.ª inversión y las tres
 * mezcladas) y «construir la tríada» (colocar con el ratón las dos notas que faltan, con alteraciones y lupa).
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-acordes.js --version=vexflow     # el motor tal y como esta en git (HEAD); solo notas naturales
 *   node tools/test-motor-acordes.js --version=verovio     # el motor del arbol de trabajo
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *   opciones: --semillas=3 --base=http://127.0.0.1:8910
 *
 * El motor no expone sus preguntas: el banco las deduce DEL DIBUJO.
 *   identificar: se leen las notas del acorde (altura contra las lineas y alteracion, esta con Verovio) y, con sus propias
 *     tablas, se decide que triada es y en que posicion esta; se contesta eso y el motor tiene que decir «Correcto» (y «Incorrecto»
 *     si se contesta otra cosa); ademas la posicion tiene que ser la de la pagina;
 *   construir: se lee el enunciado («Dibuja la 3.ª y la 5.ª del acorde: Re♯ — PM») y la nota dada; se calcula donde van las otras
 *     dos y con que alteracion, se colocan con el ratón (cada una con su herramienta) y se comprueba, durante el arrastre, que la
 *     lupa muestra el acorde con la nota nueva en ambar, y despues del toque que la nota queda donde se toco; acertar da
 *     «Correcto»; fallar una nota da «Incorrecto» y entonces el pentagrama enseña la solucion (que se lee y se comprueba).
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const RAIZ = path.join(__dirname, '..');
const MOTOR = 'assets/js/acordes-engine.js';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const NS = [0, 2, 4, 5, 7, 9, 11];                      // do re mi fa sol la si
const NOMBRE_LETRA = { Do: 0, Re: 1, Mi: 2, Fa: 3, Sol: 4, La: 5, Si: 6 };
const TRIADAS = { mayor: [4, 7], menor: [3, 7], dis: [3, 6], aum: [4, 8] };
const CORTO = { PM: 'mayor', Pm: 'menor', '5dis': 'dis', '5Aum': 'aum' };
const GLIFO_ACC = { E262: 1, E260: -1, E263: 2, E264: -2, E261: 0 };
const pc = (letra, acc) => (((NS[letra] + acc) % 12) + 12) % 12;

const PAGINAS = {
  identificar: [['/ejercicios/acordes/triadas-en-fundamental/', 'tmac1', 'fundamental'], ['/ejercicios/acordes/triadas-en-primera-inversion/', 'tmac2', '1a'],
    ['/ejercicios/acordes/triadas-en-segunda-inversion/', 'tmac3', '2a'], ['/ejercicios/acordes/triadas-todas-las-posiciones/', 'tmac4', 'todas']],
  construir: [['/ejercicios/acordes/construir-triadas/', 'tmac_ct', 'fundamental'], ['/ejercicios/acordes/construir-triadas-primera-inversion/', 'tmac_ct1', '1a'],
    ['/ejercicios/acordes/construir-triadas-segunda-inversion/', 'tmac_ct2', '2a'], ['/ejercicios/acordes/construir-triadas-todas-posiciones/', 'tmac_cta', 'todas']],
};

/** Dentro de la pagina: las notas de un pentagrama con un acorde (Verovio o VexFlow). */
function leerAcorde(svg) {
  const caja = svg.getBoundingClientRect();
  const verovio = !!svg.querySelector('.measure');
  let lineas = null;
  if (verovio) {
    lineas = [...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return b.top + b.height / 2; });
  } else {
    const horiz = [...svg.querySelectorAll('path, rect, line')].map((e) => e.getBoundingClientRect()).filter((b) => b.height < 2.5 && b.width > caja.width * 0.6).map((b) => Math.round((b.top + b.height / 2) * 100) / 100);
    const u = [...new Set(horiz)].sort((a, b) => a - b);
    for (let i = 0; i + 4 < u.length && !lineas; i++) { const d = u[i + 1] - u[i]; if ([2, 3, 4].every((k) => Math.abs(u[i + k] - u[i + k - 1] - d) < 0.7)) lineas = u.slice(i, i + 5); }
  }
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  let notas;
  if (verovio) {
    notas = [...svg.querySelectorAll('.note')].map((n) => {
      const c = n.querySelector('.notehead use'), b = c.getBoundingClientRect(), a = n.querySelector('.accid use');
      return { y: b.top + b.height / 2, x: b.left + b.width / 2, acc: a ? id(a) : null, ambar: /8b6914/i.test(n.outerHTML) };
    });
  } else {
    notas = [...svg.querySelectorAll('.vf-notehead')].map((c) => { const b = c.getBoundingClientRect(); return { y: b.top + b.height / 2, x: b.left + b.width / 2, acc: null, ambar: /8b6914/i.test(c.outerHTML) }; });
  }
  return { verovio, lineas, notas, izq: caja.left, ancho: caja.width, arriba: caja.top };
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

/** pasos diatonicos (octava*7 + letra) y alteraciones de las notas leidas; la linea inferior del pentagrama en clave de Sol es Mi 4 (30). */
function aNotas(lec) {
  const esp = (lec.lineas[4] - lec.lineas[0]) / 4;
  return lec.notas.map((n) => ({ paso: 30 + Math.round((lec.lineas[4] - n.y) / (esp / 2)), acc: n.acc ? GLIFO_ACC[n.acc] : 0, ambar: n.ambar })).sort((a, b) => a.paso - b.paso);
}
const letraDe = (paso) => ((paso % 7) + 7) % 7;

/** ¿Que triada es? (notas ordenadas de grave a agudo) -> { tipo, posicion } o null */
function clasificar(notas) {
  for (let r = 0; r < 3; r++) {
    const raiz = notas[r];
    const otras = notas.filter((_, i) => i !== r);
    const letras = otras.map((n) => ((letraDe(n.paso) - letraDe(raiz.paso)) + 7) % 7).sort((a, b) => a - b);
    if (letras[0] !== 2 || letras[1] !== 4) continue;
    const dist = otras.map((n) => (((pc(letraDe(n.paso), n.acc) - pc(letraDe(raiz.paso), raiz.acc)) % 12) + 12) % 12).sort((a, b) => a - b);
    for (const [tipo, [t, q]] of Object.entries(TRIADAS)) if (dist[0] === t && dist[1] === q) return { tipo, posicion: ['fundamental', '1a', '2a'][[0, 1, 2].indexOf(((notas.indexOf(raiz) === 0) ? 0 : (notas.indexOf(raiz) === 1 ? 2 : 1)))] };
  }
  return null;
}
// la posicion se deduce de que nota del acorde esta en el bajo: la fundamental -> fundamental; la tercera -> 1.ª; la quinta -> 2.ª
function posicionDe(notas, tipo) {
  const bajo = notas[0];
  const letras = notas.map((n) => letraDe(n.paso));
  for (let r = 0; r < 3; r++) {
    const raiz = notas[r];
    const otras = notas.filter((_, i) => i !== r);
    const rel = otras.map((n) => ((letraDe(n.paso) - letraDe(raiz.paso)) + 7) % 7).sort((a, b) => a - b);
    if (rel[0] !== 2 || rel[1] !== 4) continue;
    const dist = otras.map((n) => (((pc(letraDe(n.paso), n.acc) - pc(letraDe(raiz.paso), raiz.acc)) % 12) + 12) % 12).sort((a, b) => a - b);
    if (dist[0] !== TRIADAS[tipo][0] || dist[1] !== TRIADAS[tipo][1]) continue;
    const bajoRel = ((letraDe(bajo.paso) - letraDe(raiz.paso)) + 7) % 7;
    return bajoRel === 0 ? 'fundamental' : bajoRel === 2 ? '1a' : '2a';
  }
  return null;
}
function tipoDe(notas) {
  for (let r = 0; r < 3; r++) {
    const raiz = notas[r];
    const otras = notas.filter((_, i) => i !== r);
    const rel = otras.map((n) => ((letraDe(n.paso) - letraDe(raiz.paso)) + 7) % 7).sort((a, b) => a - b);
    if (rel[0] !== 2 || rel[1] !== 4) continue;
    const dist = otras.map((n) => (((pc(letraDe(n.paso), n.acc) - pc(letraDe(raiz.paso), raiz.acc)) % 12) + 12) % 12).sort((a, b) => a - b);
    for (const [tipo, [t, q]] of Object.entries(TRIADAS)) if (dist[0] === t && dist[1] === q) return tipo;
  }
  return null;
}

async function probarIdentificar(browser, [url, id, inv], nivel, semilla) {
  const { ctx, page } = await abrir(browser, url, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${inv} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector(`#${id} .tm-iv-mode-btn`);
    await page.locator(`#${id} .tm-iv-mode-btn`).nth(nivel).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++;
      await page.waitForSelector(`#${id}_not svg`);
      const lec = await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id);
      if (!lec.lineas || lec.lineas.length !== 5 || lec.notas.length !== 3) { falla(q, `se leen ${lec.notas.length} notas y ${lec.lineas ? lec.lineas.length : 0} lineas (3 y 5 esperadas)`); break; }
      const notas = aNotas(lec);
      const tipo = tipoDe(notas);
      if (!tipo) { falla(q, 'las tres notas dibujadas no forman una triada: ' + JSON.stringify(notas)); await page.locator(`#${id}_opts .tm-opt`).first().click(); await page.locator(`#${id}_btn`).click(); await page.locator(`#${id}_nxt`).click(); continue; }
      const pos = posicionDe(notas, tipo);
      if (inv !== 'todas' && pos !== inv) falla(q, `la pagina es de ${inv} y la triada dibujada esta en ${pos}`);
      if (nivel === 0 && notas.some((n) => n.acc)) falla(q, 'en el nivel facil hay alteraciones');
      if (nivel === 1 && notas.some((n) => Math.abs(n.acc) > 1)) falla(q, 'en el nivel medio hay dobles alteraciones');
      const bien = q % 2 === 1;
      const botones = await page.locator(`#${id}_opts .tm-opt`).evaluateAll((els) => els.map((e) => e.dataset.v));
      const elegido = bien ? tipo : botones.find((v) => v !== tipo);
      await page.locator(`#${id}_opts .tm-opt[data-v="${elegido}"]`).click();
      await page.locator(`#${id}_btn`).click();
      const ok = await page.locator(`#${id}_fb`).evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `se dibuja una triada ${tipo} (${pos}), se contesta ${elegido} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      await page.locator(`#${id}_nxt`).click();
    }
  } catch (e) { falla('?', String(e).slice(0, 250)); }
  await ctx.close();
  return { preguntas, fallos };
}

/** Lo que pide el enunciado de construir: { raiz: {letra, acc}, tipo, inv } */
function leerEnunciado(html) {
  const m = /<strong>(Do|Re|Mi|Fa|Sol|La|Si)(♯♯|♭♭|♯|♭)?\s*—\s*(PM|Pm|5dis|5Aum)<\/strong>/.exec(html);
  if (!m) throw new Error('enunciado ilegible: ' + html);
  const acc = { '♯♯': 2, '♯': 1, '♭': -1, '♭♭': -2 }[m[2]] || 0;
  const inv = /1ª inv/.test(html) ? '1a' : /2ª inv/.test(html) ? '2a' : 'fundamental';
  return { raiz: { letra: NOMBRE_LETRA[m[1]], acc }, tipo: CORTO[m[3]], inv };
}
/** Las tres notas del acorde pedido en orden de abajo arriba, dado el paso del bajo dibujado. */
function esperadas(en, pasoBajo) {
  const [t, q] = TRIADAS[en.tipo];
  const miembros = { fundamental: [0, 2, 4], '1a': [2, 4, 0], '2a': [4, 0, 2] }[en.inv];   // posicion (en letras desde la raiz) de cada nota, de abajo arriba
  const semis = { 0: 0, 2: t, 4: q };
  const raizPc = pc(en.raiz.letra, en.raiz.acc);
  // distancia en letras de cada nota al bajo: terceras en fundamental (0,2,4); en 1.ª la fundamental queda una cuarta sobre la quinta (0,2,5); en 2.ª la quinta y la fundamental estan a una cuarta (0,3,5)
  const subida = { fundamental: [0, 2, 4], '1a': [0, 2, 5], '2a': [0, 3, 5] }[en.inv];
  return miembros.map((rel, k) => {
    const paso = pasoBajo + subida[k];
    const letra = letraDe(paso);
    const esperadaLetra = (en.raiz.letra + rel) % 7;
    if (letra !== esperadaLetra) throw new Error(`el bajo dibujado esta en el paso ${pasoBajo} y la letra ${letra} no es la del miembro ${rel} (${esperadaLetra})`);
    let acc = (((raizPc + semis[rel]) % 12) - NS[letra] + 12) % 12; if (acc > 6) acc -= 12;
    return { paso, acc };
  });
}

async function probarConstruir(browser, [url, id, inv], nivel, semilla) {
  const { ctx, page } = await abrir(browser, url, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${inv} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  try {
    await page.waitForSelector(`#${id} .tm-iv-mode-btn`);
    await page.locator(`#${id} .tm-iv-mode-btn`).nth(nivel).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++;
      await page.waitForSelector(`#${id}_not svg`);
      await page.locator(`#${id}_wrap`).scrollIntoViewIfNeeded();
      const en = leerEnunciado(await page.locator(`#${id}_q`).innerHTML());
      if (inv !== 'todas' && en.inv !== inv) falla(q, `la pagina es de ${inv} y el enunciado pide ${en.inv}`);
      const lec0 = await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id);
      const nBajo = aNotas(lec0);
      if (nBajo.length !== 1) { falla(q, `al empezar hay ${nBajo.length} notas y deberia haber 1 (la dada)`); break; }
      let exp;
      try { exp = esperadas(en, nBajo[0].paso); } catch (e) { falla(q, e.message); break; }
      // el bajo dibujado es el que dice el enunciado (letra y alteracion)
      if (verovio && nBajo[0].acc !== exp[0].acc) falla(q, `la nota dada lleva alteracion ${nBajo[0].acc} y el enunciado implica ${exp[0].acc}`);
      const bien = q % 2 === 1;
      const aColocar = [exp[1], exp[2]].map((e) => ({ ...e }));
      if (!bien) aColocar[1] = { paso: aColocar[1].paso + (aColocar[1].paso + 1 <= 39 ? 1 : -1), acc: aColocar[1].acc };   // la ultima, una letra mas arriba (o abajo si no hay fila: el pentagrama llega hasta Sol 5)
      const caja = await page.evaluate((i) => { const w = document.getElementById(i + '_wrap').getBoundingClientRect(); return { x: w.left + w.width / 2, y: w.top }; }, id);
      for (let k = 0; k < 2; k++) {
        const nota = aColocar[k];
        const herr = page.locator(`#${id}_card .tm-tool[data-acc="${nota.acc}"]`);
        if (await herr.count()) await herr.click();
        else { falla(q, `no hay herramienta para la alteracion ${nota.acc}`); continue; }
        const l = await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id);
        const esp = (l.lineas[4] - l.lineas[0]) / 4;
        const y = l.lineas[0] + (38 - nota.paso) * esp / 2;   // la linea superior es Fa 5 (38)
        await page.mouse.move(caja.x, y); await page.mouse.down();
        if (verovio) {   // la lupa, mientras se arrastra: el acorde con la nota nueva en ambar
          const lupa = await page.evaluate(() => { const s = document.querySelector('.tm-iv-loupe-staff svg'); return s ? window.__leer(s) : null; });
          if (!lupa) falla(q, 'no hay lupa al arrastrar');
          else {
            const ln = aNotas(lupa);
            if (ln.length !== 1 + k + 1) falla(q, `la lupa muestra ${ln.length} notas y deberian ser ${k + 2}`);
            const ambar = ln.filter((n) => n.ambar);
            if (ambar.length !== 1 || ambar[0].paso !== nota.paso || ambar[0].acc !== nota.acc) falla(q, `la lupa no marca en ambar la nota ${nota.paso}/${nota.acc}: ${JSON.stringify(ambar)}`);
          }
        }
        await page.mouse.up();
        const dib = aNotas(await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id));
        if (dib.length !== k + 2) falla(q, `tras colocar ${k + 1} nota(s) hay ${dib.length} dibujadas`);
        else if (!dib.some((n) => n.paso === nota.paso && (!verovio || n.acc === nota.acc))) falla(q, `la nota colocada (${nota.paso}, alt ${nota.acc}) no esta donde se toco: ${JSON.stringify(dib)}`);
      }
      // deshacer / limpiar, una vez por serie
      if (q === 1) {
        await page.locator(`#${id}_undo`).click();
        const t1 = aNotas(await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id)).length;
        if (t1 !== 2) falla(q, `tras Deshacer hay ${t1} notas y deberian ser 2`);
        await page.locator(`#${id}_clear`).click();
        const t2 = aNotas(await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id)).length;
        if (t2 !== 1) falla(q, `tras Limpiar hay ${t2} notas y deberia ser 1`);
        for (const nota of aColocar) {
          await page.locator(`#${id}_card .tm-tool[data-acc="${nota.acc}"]`).click();
          const l = await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id);
          const y = l.lineas[0] + (38 - nota.paso) * ((l.lineas[4] - l.lineas[0]) / 4) / 2;
          await page.mouse.move(caja.x, y); await page.mouse.down(); await page.mouse.up();
        }
      }
      await page.locator(`#${id}_btn`).click();
      const ok = await page.locator(`#${id}_fb`).evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `se colocan ${bien ? 'las notas correctas' : 'una nota mal'} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      if (!bien && verovio) {   // al fallar, el pentagrama ensena la solucion
        const sol = aNotas(await page.evaluate((i) => window.__leer(document.querySelector('#' + i + '_not svg')), id));
        const esperado = exp.map((e) => `${e.paso}/${e.acc}`).join(' ');
        const visto = sol.map((e) => `${e.paso}/${e.acc}`).join(' ');
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
  for (const [modo, fn] of [['identificar', probarIdentificar], ['construir', probarConstruir]]) {
    for (const pag of PAGINAS[modo]) {
      let p = 0; const fs = [];
      for (const nivel of niveles) for (let s = 1; s <= SEMILLAS; s++) { const r = await fn(browser, pag, nivel, s * 7919 + nivel); p += r.preguntas; fs.push(...r.fallos); }
      total += p; mal += fs.length;
      console.log(`${fs.length ? '✗' : '✓'} ${modo.padEnd(11)} ${pag[2].padEnd(11)} ${String(p).padStart(3)} preguntas · ${fs.length} discrepancias`);
      fs.slice(0, 6).forEach((x) => console.log('     - ' + x));
      if (fs.length > 6) console.log(`     … y ${fs.length - 6} mas`);
    }
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
