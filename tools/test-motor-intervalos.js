'use strict';
/**
 * Banco de pruebas de los ejercicios de intervalos (assets/js/intervalos-engine.js): numero, tipo (2.ª-8.ª), completo, armonico/melodico,
 * ascendente/descendente, conjunto/disjunto, consonancia, semitonos y los tres «construir» (por tipo, por semitono y por numero).
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-intervalos.js --version=verovio  # el motor del arbol de trabajo
 *   node tools/test-motor-intervalos.js --version=vexflow  # el motor tal y como esta en git (HEAD); solo el nivel facil (notas naturales)
 *   opciones: --semillas=2 --base=http://127.0.0.1:8910 --solo=quintas   (fragmento de la URL)
 *   (--version=vexflow solo sirve mientras HEAD conserve el motor con VexFlow: es la linea base con la que se comprobo la migracion)
 *
 * El motor no expone sus preguntas: el banco las deduce DEL DIBUJO. Se lee el pentagrama (altura de cada nota contra las lineas,
 * alteracion por el glifo, acorde o notas sueltas por la x), con sus propias tablas se calcula el intervalo (numero, tipo, direccion,
 * simple/compuesto, conjunto/disjunto, consonancia, clase de semitono), se contesta eso y el motor tiene que decir «Correcto»; si se
 * contesta otra cosa, «Incorrecto». En los «construir» se lee el enunciado y la nota dada, se calcula donde va la otra nota y con que
 * alteracion, se coloca con el raton (lupa incluida: la nota nueva en ambar) y se comprueba que queda donde se toco; al fallar, el
 * pentagrama enseña la solucion y se comprueba que es la correcta.
 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const VERSION = arg('version', 'verovio');
const SEMILLAS = Number(arg('semillas', 2));
const BASE = arg('base', 'http://127.0.0.1:8910');
const SOLO = arg('solo', '');
const RAIZ = path.join(__dirname, '..');
const MOTOR = 'assets/js/intervalos-engine.js';
const gitShow = (r) => execFileSync('git', ['show', 'HEAD:' + r], { cwd: RAIZ, maxBuffer: 1 << 26 }).toString('utf8');

const NS = [0, 2, 4, 5, 7, 9, 11];                      // do re mi fa sol la si
const GLIFO_ACC = { E262: 1, E260: -1, E263: 2, E264: -2, E261: 0 };
const TIPO_SUFIJO = { Disminuida: 'd', menor: 'm', Mayor: 'M', Justa: 'j', Aumentada: 'A', 'Doble Aumentada': 'AA', 'Doble Disminuida': 'dd' };
/* Clasificacion en consonancias y disonancias del propio temario (la que usa el motor) */
const CONSONANCIA = {
  '1j': 'Perfecta', '4j': 'Perfecta', '5j': 'Perfecta', '8j': 'Perfecta', '3m': 'Imperfecta', '3M': 'Imperfecta', '6m': 'Imperfecta', '6M': 'Imperfecta',
  '1A': 'Absoluta', '2m': 'Absoluta', '2M': 'Absoluta', '3d': 'Absoluta', '3dd': 'Absoluta', '6AA': 'Absoluta', '7m': 'Absoluta', '7M': 'Absoluta',
  '4A': 'Semi', '5d': 'Semi', '3AA': 'Semi',
};
const CONS_BOTON = { Perfecta: 'Consonancia Perfecta', Imperfecta: 'Consonancia Imperfecta', Semi: 'Semiconsonancia', Absoluta: 'Disonancia Absoluta', Condicional: 'Disonancia Condicional' };
const SEMI_BOTON = { unisono: 'Unísono', diatonico: 'Semitono diatónico', cromatico: 'Semitono cromático', enarmonicas: 'Enarmónicas' };

/** Las paginas y sus ejercicios, leidos de la propia pagina: tmIvEngine("id", {test:"grupo", val:"5"}) */
function paginas() {
  const dir = path.join(RAIZ, 'ejercicios/ejercicios-de-intervalos-musicales');
  const out = [];
  for (const d of fs.readdirSync(dir)) {
    const f = path.join(dir, d, 'index.html');
    if (!fs.existsSync(f)) continue;
    const t = fs.readFileSync(f, 'utf8');
    for (const m of t.matchAll(/tmIvEngine\(\s*["']([^"']+)["']\s*,\s*(\{[^}]*\})\s*\)/g)) {
      const cfg = new Function('return ' + m[2])();
      out.push({ url: `/ejercicios/ejercicios-de-intervalos-musicales/${d}/`, id: m[1], cfg });
    }
  }
  return out.filter((p) => !SOLO || p.url.includes(SOLO));
}

/** Dentro de la pagina: las notas de un pentagrama (Verovio o VexFlow). */
function leer(svg) {
  const caja = svg.getBoundingClientRect();
  const verovio = !!svg.querySelector('.measure');
  let lineas = null;
  if (verovio) {
    lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; }))].sort((a, b) => a - b);   // con varios compases las lineas se repiten
  } else {
    const horiz = [...svg.querySelectorAll('path, rect, line')].map((e) => e.getBoundingClientRect()).filter((b) => b.height < 2.5 && b.width > caja.width * 0.5).map((b) => Math.round((b.top + b.height / 2) * 100) / 100);
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
  return { verovio, lineas, notas, izq: caja.left, ancho: caja.width };
}

const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function abrir(browser, url, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leer.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  if (VERSION === 'vexflow') {
    await page.route(BASE + url, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: gitShow(url.replace(/^\//, '') + 'index.html') }));
    await page.route('**/' + MOTOR + '*', (r) => r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: gitShow(MOTOR) }));
  }
  await page.goto(BASE + url, { waitUntil: 'load' });
  return { ctx, page };
}

/** paso diatonico (octava*7 + letra; Mi 4 = 30) y semitonos absolutos de cada nota leida, de grave a aguda segun la altura */
function aNotas(lec) {
  const esp = (lec.lineas[4] - lec.lineas[0]) / 4;
  return lec.notas.map((n) => {
    const paso = 30 + Math.round((lec.lineas[4] - n.y) / (esp / 2));
    const acc = n.acc ? GLIFO_ACC[n.acc] : 0;
    return { paso, acc, x: n.x, ambar: n.ambar, semis: Math.floor(paso / 7) * 12 + NS[((paso % 7) + 7) % 7] + acc };
  });
}
const letraDe = (paso) => ((paso % 7) + 7) % 7;

/** (distancia diatonica d, semitonos s) -> { numero, tipo } con las tablas del temario */
function clasificar(d, s) {
  const tamano = Math.floor(d / 7) * 12 + NS[d % 7];
  const dif = s - tamano;
  const perfecta = [0, 3, 4].includes(d % 7);
  let tipo;
  if (perfecta) tipo = { '-2': 'Doble Disminuida', '-1': 'Disminuida', 0: 'Justa', 1: 'Aumentada', 2: 'Doble Aumentada' }[dif];
  else tipo = { '-3': 'Doble Disminuida', '-2': 'Disminuida', '-1': 'menor', 0: 'Mayor', 1: 'Aumentada', 2: 'Doble Aumentada' }[dif];
  return { numero: d + 1, tipo };
}
/** el inverso: semitonos de un intervalo (d, tipo) */
function semitonos(d, tipo) {
  const perfecta = [0, 3, 4].includes(d % 7);
  const dif = perfecta ? { 'Doble Disminuida': -2, Disminuida: -1, Justa: 0, Aumentada: 1, 'Doble Aumentada': 2 }[tipo] : { 'Doble Disminuida': -3, Disminuida: -2, menor: -1, Mayor: 0, Aumentada: 1, 'Doble Aumentada': 2 }[tipo];
  return Math.floor(d / 7) * 12 + NS[d % 7] + dif;
}

/** lo que dice el dibujo de una pregunta de reconocer: intervalo entre las dos notas */
function analizar(notas) {
  if (notas.length !== 2) return null;
  const [p, q] = notas;
  const armonico = Math.abs(p.x - q.x) < 25;   // en un acorde de segunda las dos cabezas se desplazan una anchura de cabeza
  // orden de lectura: en un acorde, de grave a aguda; en notas sueltas, de izquierda a derecha
  const primera = armonico ? (p.paso * 100 + p.semis <= q.paso * 100 + q.semis ? p : q) : (p.x < q.x ? p : q);
  const segunda = primera === p ? q : p;
  const inferior = (primera.paso < segunda.paso || (primera.paso === segunda.paso && primera.semis <= segunda.semis)) ? primera : segunda;
  const superior = inferior === primera ? segunda : primera;
  const d = superior.paso - inferior.paso, s = superior.semis - inferior.semis;
  const cl = clasificar(d, s);
  return { armonico, ascendente: !armonico && segunda.paso >= primera.paso && segunda.semis >= primera.semis, ...cl, d, s, mismoPaso: primera.paso === segunda.paso, primera, segunda };
}

const botones = (page, id) => page.locator(`#${id} .tm-opt`).evaluateAll((els) => els.map((e) => ({ g: e.dataset.g, v: e.dataset.v })));

async function responder(page, id, grupos) {
  for (const [g, v] of grupos) {
    const b = page.locator(`#${id} .tm-opt[data-g="${g}"][data-v="${v}"]`);
    if (!(await b.count())) throw new Error(`el motor no ofrece la opcion ${g}=${v}`);
    await b.click();
  }
  await page.locator(`#${id} .tm-submit`).click();
  return page.locator(`#${id} .tm-fb`).evaluate((e) => e.classList.contains('tm-ok'));
}

/** Lo que hay que contestar a una pregunta de reconocer, segun el dibujo; { grupos, malo(grupos, botones) } */
function respuestaCorrecta(test, cfg, a, botonesPag) {
  const key = a.numero + (TIPO_SUFIJO[a.tipo] || '?');
  switch (test) {
    case 'numero': return [['ans', String(a.numero)]];
    case 'grupo': return [['ans', a.tipo]];
    case 'arm_mel': return [['ans', a.armonico ? 'Armónico' : 'Melódico']];
    case 'asc_des': return [['ans', a.ascendente ? 'Ascendente' : 'Descendente']];
    case 'con_dis': return [['ans', a.numero === 2 ? 'Conjunto' : 'Disjunto']];
    case 'consonancia': return [['ans', CONS_BOTON[CONSONANCIA[key] || 'Condicional']]];
    case 'semitono': {
      const dif = Math.abs(a.s);
      let t;
      if (a.primera.paso === a.segunda.paso && a.primera.acc === a.segunda.acc) t = 'unisono';
      else if (a.primera.paso === a.segunda.paso) t = 'cromatico';
      else if (a.s === 0) t = 'enarmonicas';
      else t = 'diatonico';
      return [['ans', SEMI_BOTON[t]]];
    }
    case 'completo': {
      const g = [['num', String(a.numero)], ['tipo', a.tipo], ['simcomp', a.numero <= 8 ? 'Simple' : 'Compuesto'], ['conjdis', a.numero === 2 ? 'Conjunto' : 'Disjunto'], ['arm_mel', a.armonico ? 'Armónico' : 'Melódico']];
      if (!a.armonico) g.push(['asc_des', a.ascendente ? 'Ascendente' : 'Descendente']);
      return g;
    }
    default: throw new Error('test desconocido ' + test);
  }
}

async function probarReconocer(browser, p, nivel, semilla) {
  const { id, cfg } = p;
  let conNiveles = true, ultima = 0;
  const { ctx, page } = await abrir(browser, p.url, semilla);
  const fallos = []; let preguntas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  try {
    await page.waitForSelector(`#${id} .tm-iv-mode-btn, #${id} .tm-staff svg`);
    conNiveles = (await page.locator(`#${id} .tm-iv-mode-btn`).count()) > 0;
    if (conNiveles) await page.locator(`#${id} .tm-iv-mode-btn`).nth(nivel).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector(`#${id} .tm-staff svg`);
      await page.locator(`#${id} .tm-staff`).scrollIntoViewIfNeeded();
      const lec = await page.evaluate((i) => window.__leer(document.querySelector('#' + i + ' .tm-staff svg')), id);
      const notas = lec.lineas && lec.lineas.length === 5 ? aNotas(lec) : [];
      const a = analizar(notas);
      if (!a || !a.tipo) { falla(q, `el dibujo no se puede leer como intervalo: ${JSON.stringify(notas)}`); break; }
      if (VERSION === 'verovio' && conNiveles && nivel === 0 && cfg.test !== 'completo' && notas.some((n) => n.acc)) falla(q, 'en el nivel facil hay alteraciones');
      if (cfg.test === 'grupo' && String(a.numero) !== cfg.val) falla(q, `la pagina es de ${cfg.val}.as y el dibujo es una ${a.numero}.a`);
      if (cfg.test === 'arm_mel' || cfg.test === 'consonancia') { if (cfg.test === 'consonancia' && !a.armonico) falla(q, 'consonancia deberia dibujar siempre un acorde'); }
      let correcta;
      try { correcta = respuestaCorrecta(cfg.test, cfg, a); } catch (e) { falla(q, e.message); break; }
      const bien = q % 2 === 1;
      let grupos = correcta;
      if (!bien) {
        // cambiar UN grupo por otra opcion distinta de las que ofrece el motor
        const ops = await botones(page, id);
        const k = cfg.test === 'completo' ? 0 : correcta.length - 1;   // en completo se cambia el numero: cambiar armonico/melodico abriria otra fila obligatoria
        const g = correcta[k][0];
        const otra = ops.find((o) => o.g === g && o.v !== correcta[k][1]);
        if (!otra) { falla(q, `no hay opcion alternativa para el grupo ${g}`); break; }
        grupos = correcta.map((c, i) => (i === k ? [g, otra.v] : c));
      }
      let ok;
      try { ok = await responder(page, id, grupos); } catch (e) { falla(q, `${e.message} (dibujo: ${a.numero}.a ${a.tipo})`); break; }
      if (ok !== bien) falla(q, `intervalo dibujado ${a.numero}.a ${a.tipo}${a.armonico ? ' armonico' : a.ascendente ? ' asc' : ' desc'}; se contesta ${JSON.stringify(grupos)} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      await page.locator(`#${id} .tm-nxt`).click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 900)); }
  await ctx.close();
  return { preguntas, fallos, sinNiveles: !conNiveles };
}

/** Enunciado de construir -> lo que se pide */
function leerPeticion(test, texto) {
  if (test === 'construir') {
    const m = /(\d+)ª\s+(.+?)\s+—\s+([↑↓])/.exec(texto.replace(/\s+/g, ' '));
    if (!m) throw new Error('enunciado ilegible: ' + texto);
    return { numero: Number(m[1]), tipo: m[2], asc: m[3] === '↑' };
  }
  if (test === 'construir_numero') {
    const m = /(\d+)ª\s+—\s+([↑↓])/.exec(texto.replace(/\s+/g, ' '));
    if (!m) throw new Error('enunciado ilegible: ' + texto);
    return { numero: Number(m[1]), asc: m[2] === '↑' };
  }
  const t = texto.replace(/\s+/g, ' ');
  const tipo = /Unísono/.test(t) ? 'unisono' : /diatónico ↑/.test(t) ? 'diaton_asc' : /diatónico ↓/.test(t) ? 'diaton_desc' : /cromático ↑/.test(t) ? 'cromatico_asc' : /cromático ↓/.test(t) ? 'cromatico_desc' : /Enarmónica/.test(t) ? 'enarmonicas' : null;
  if (!tipo) throw new Error('enunciado ilegible: ' + texto);
  return { tipo };
}

/** Donde va la nota que se pide: { paso, acc } a partir de la nota dada */
function objetivo(test, pet, dada) {
  if (test === 'construir' || test === 'construir_numero') {
    const d = pet.numero - 1;
    const paso = dada.paso + (pet.asc ? d : -d);
    const letra = letraDe(paso);
    const semis = pet.asc ? dada.semis + (test === 'construir' ? semitonos(d, pet.tipo) : null) : dada.semis - (test === 'construir' ? semitonos(d, pet.tipo) : null);
    if (test === 'construir_numero') return { paso, acc: 0 };
    return { paso, acc: semis - (Math.floor(paso / 7) * 12 + NS[letra]) };
  }
  const p = dada.paso, sm = dada.semis;
  const con = (paso, semis) => ({ paso, acc: semis - (Math.floor(paso / 7) * 12 + NS[letraDe(paso)]) });
  switch (pet.tipo) {
    case 'unisono': return { paso: p, acc: dada.acc };
    case 'cromatico_asc': return { paso: p, acc: dada.acc + 1 };
    case 'cromatico_desc': return { paso: p, acc: dada.acc - 1 };
    case 'diaton_asc': return con(p + 1, sm + 1);
    case 'diaton_desc': return con(p - 1, sm - 1);
    default: return { enarmonica: [con(p + 1, sm), con(p - 1, sm)] };   // la misma altura con la letra de arriba o la de abajo
  }
}

async function probarConstruir(browser, p, nivel, semilla) {
  const { id, cfg } = p;
  let conNiveles = true, ultima = 0;
  const { ctx, page } = await abrir(browser, p.url, semilla);
  const fallos = []; let preguntas = 0, ambiguas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  const verovio = VERSION === 'verovio';
  const leerStaff = () => page.evaluate((i) => window.__leer(document.querySelector('#' + i + ' .tm-staff svg')), id);
  try {
    await page.waitForSelector(`#${id} .tm-iv-mode-btn, #${id} .tm-staff svg`);
    conNiveles = (await page.locator(`#${id} .tm-iv-mode-btn`).count()) > 0;
    if (conNiveles) await page.locator(`#${id} .tm-iv-mode-btn`).nth(nivel).click();
    for (let q = 1; q <= 10; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector(`#${id} .tm-staff svg`);
      await page.locator(`#${id} .tm-staff`).scrollIntoViewIfNeeded();
      const texto = await page.locator(`#${id} .tm-construir-dir`).innerText();
      let pet;
      try { pet = leerPeticion(cfg.test, texto); } catch (e) { falla(q, e.message); break; }
      if (cfg.test === 'construir' && cfg.val && String(pet.numero) !== cfg.val) falla(q, `la pagina es de ${cfg.val}.as y el enunciado pide una ${pet.numero}.a`);
      const l0 = await leerStaff();
      const dadas = l0.lineas && l0.lineas.length === 5 ? aNotas(l0) : [];
      if (dadas.length !== 1) { falla(q, `al empezar hay ${dadas.length} notas y deberia haber 1 (la dada)`); break; }
      const dada = dadas[0];
      let obj = objetivo(cfg.test, pet, dada);
      const maxAcc = (await page.locator(`#${id} .tm-cs-acc-btn`).evaluateAll((els) => els.map((e) => Math.abs(Number(e.dataset.acc))))).reduce((m, v) => Math.max(m, v), 0);
      let enarmonica = false, solValidas = null;
      if (obj.enarmonica) {
        // las que caben en los botones del nivel: si solo cabe una, es la unica respuesta; si caben las dos, el motor da por buena una sola (ambiguedad del enunciado)
        const validas = obj.enarmonica.filter((e) => Math.abs(e.acc) <= maxAcc);
        if (!validas.length) { falla(q, 'ninguna enarmonica cabe en los botones del nivel: ' + JSON.stringify(obj.enarmonica)); break; }
        solValidas = validas;
        obj = validas[(q >> 1) % validas.length];   // la enarmonica vale con la letra de arriba Y con la de abajo: se prueban las dos
      }
      const bien = q % 2 === 1;
      let colocar = { ...obj };
      if (!bien) colocar = { paso: obj.paso + (obj.paso + 1 <= 38 ? 1 : -1), acc: obj.acc };
      // la herramienta de alteracion
      const btn = page.locator(`#${id} .tm-cs-acc-btn[data-acc="${colocar.acc}"]`);
      if (cfg.test !== 'construir_numero') {
        if (!(await btn.count())) { falla(q, `el motor no ofrece la alteracion ${colocar.acc} (nota dada ${dada.paso}/${dada.acc}, peticion ${JSON.stringify(pet)})`); break; }
        if (await btn.isVisible()) await btn.click();   // en el nivel facil no hay botones (solo naturales)
        else if (colocar.acc !== 0) { falla(q, 'sin botones de alteracion y la nota pide ' + colocar.acc); break; }
      }
      const filas = await leerStaff();
      const esp = (filas.lineas[4] - filas.lineas[0]) / 4;
      const y = filas.lineas[0] + (38 - colocar.paso) * esp / 2;
      const cx = filas.izq + filas.ancho / 2 + 15;
      await page.mouse.move(cx, y);
      if (verovio) {   // la lupa: las dos notas, la nueva en ambar
        const lupa = await page.evaluate(() => { const s = document.querySelector('.tm-iv-loupe svg'); return s && s.offsetParent !== null || (s && getComputedStyle(s.closest('.tm-iv-loupe')).display !== 'none') ? window.__leer(s) : null; });
        if (!lupa) falla(q, 'no hay lupa al pasar el raton');
        else {
          const ln = aNotas(lupa);
          const amb = ln.filter((n) => n.ambar);
          if (ln.length !== 2) falla(q, `la lupa muestra ${ln.length} notas y deberian ser 2`);
          else if (amb.length !== 1 || amb[0].paso !== colocar.paso || (cfg.test !== 'construir_numero' && amb[0].acc !== colocar.acc)) falla(q, `la lupa no marca en ambar la nota ${colocar.paso}/${colocar.acc}: ${JSON.stringify(amb)}`);
        }
      }
      await page.mouse.click(cx, y);
      const dib = aNotas(await leerStaff());
      if (dib.length !== 2) falla(q, `tras colocar la nota hay ${dib.length} dibujadas y deberian ser 2`);
      else if (!dib.some((n) => n !== dib[0] && n.paso === colocar.paso) && !dib.filter((n) => n.paso === colocar.paso).length) falla(q, `la nota colocada (${colocar.paso}) no esta donde se toco: ${JSON.stringify(dib)}`);
      else if (verovio && cfg.test !== 'construir_numero' && !dib.some((n) => n.paso === colocar.paso && n.acc === colocar.acc)) falla(q, `la nota colocada lleva otra alteracion (${colocar.acc} esperada): ${JSON.stringify(dib)}`);
      await page.locator(`#${id} .tm-submit`).click();
      const ok = await page.locator(`#${id} .tm-fb`).evaluate((e) => e.classList.contains('tm-ok'));
      if (enarmonica) {
        ambiguas++;
        // hay dos enarmonicas validas (arriba o abajo): el motor solo da por buena una; se comprueba que la solucion que dibuja es de verdad enarmonica
        if (!ok && verovio) {
          const sol = aNotas(await leerStaff());
          const otra = sol.find((n) => !(n.paso === dada.paso && n.acc === dada.acc));
          if (!otra || otra.semis !== dada.semis || otra.paso === dada.paso) falla(q, `la solucion dibujada de la enarmonica no es enarmonica: ${JSON.stringify(sol)} (dada ${JSON.stringify(dada)})`);
        }
      } else {
        if (ok !== bien) falla(q, `peticion ${JSON.stringify(pet)} sobre ${dada.paso}/${dada.acc}: se coloca ${bien ? 'la nota correcta' : 'una mal'} (${colocar.paso}/${colocar.acc}) y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
        if (!bien && verovio) {   // al fallar, el pentagrama enseña la solucion
          const sol = aNotas(await leerStaff());
          const nueva = sol.filter((n) => (solValidas || [obj]).some((o) => n.paso === o.paso && (cfg.test === 'construir_numero' || n.acc === o.acc)));
          if (sol.length !== 2 || !nueva.length) falla(q, `la solucion dibujada es ${JSON.stringify(sol.map((n) => n.paso + '/' + n.acc))} y deberia incluir ${obj.paso}/${obj.acc}`);
        }
      }
      await page.locator(`#${id} .tm-nxt`).click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 900)); }
  await ctx.close();
  return { preguntas, fallos, ambiguas, sinNiveles: !conNiveles };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0, amb = 0;
  for (const p of paginas()) {
    const construir = /^construir/.test(p.cfg.test);
    const fn = construir ? probarConstruir : probarReconocer;
    const niveles = VERSION === 'vexflow' ? [0] : [0, 1, 2];
    let n = 0; const fs2 = [];
    for (const nivel of niveles) for (let s = 1; s <= SEMILLAS; s++) {
      const r = await fn(browser, p, nivel, s * 7919 + nivel);
      n += r.preguntas; fs2.push(...r.fallos); amb += r.ambiguas || 0;
      if (r.sinNiveles) break;
    }
    total += n; mal += fs2.length;
    const nombre = `${p.cfg.test}${p.cfg.val ? ' ' + p.cfg.val : ''}`;
    console.log(`${fs2.length ? '✗' : '✓'} ${nombre.padEnd(20)} ${p.id.padEnd(24)} ${String(n).padStart(3)} preguntas · ${fs2.length} discrepancias`);
    fs2.slice(0, 5).forEach((x) => console.log('     - ' + x));
    if (fs2.length > 5) console.log(`     … y ${fs2.length - 5} mas`);
  }
  await browser.close();
  console.log(`\nversion ${VERSION}: ${mal} discrepancias en ${total} preguntas` + (amb ? ` (${amb} enarmonicas con dos soluciones validas, sin dar por mala la del motor)` : ''));
  process.exit(mal ? 1 : 0);
})();
