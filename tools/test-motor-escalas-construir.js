'use strict';
/**
 * Banco de pruebas de los ejercicios de CONSTRUIR escalas (assets/js/escalas-construir-engine.js y escalas-armadura-engine.js; paginas de
 * /ejercicios/escalas/construir-* y escalas-con-armadura-*): el alumno coloca con el raton (y su lupa) las notas de una escala y, en el
 * motor con armadura, antes la armadura.
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-escalas-construir.js [--semillas=2] [--solo=melodica] [--base=http://127.0.0.1:8910]
 *
 * El motor no expone sus preguntas: el banco las deduce DEL ENUNCIADO («Dibuja la escala completa: Fa♯ Menor Armónica»). Con sus propias
 * tablas de teoria (tonica + patron de intervalos; en la cromatica, los datos de la pagina) calcula las notas de la escala y su
 * alteracion; las coloca con el raton, cada una con su herramienta, comprobando durante el arrastre que la lupa muestra lo ya puesto con
 * la nota nueva en ambar, y despues del toque que la nota queda DONDE SE TOCO (altura y signo, leidos del dibujo con la regla del
 * compas); acertar da «Correcto», una nota mal da «Incorrecto» y el pentagrama enseña la escala correcta (se lee y se comprueba).
 * En el motor con armadura se coloca primero la armadura (a veces mal, y entonces el motor corrige) y las notas solo llevan signo
 * cuando se desvian de ella.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const SEMILLAS = Number(arg('semillas', 2));
const BASE = arg('base', 'http://127.0.0.1:8910');
const SOLO = arg('solo', '');
const RAIZ = path.join(__dirname, '..');

const NS = [0, 2, 4, 5, 7, 9, 11];
const LETRAS = 'cdefgab';
const ES = { Do: 0, Re: 1, Mi: 2, Fa: 3, Sol: 4, La: 5, Si: 6 };
const GLIFO_ACC = { E262: 1, E260: -1, E263: 2, E264: -2, E261: 0 };
const PATRONES = {
  'mayor': [0, 2, 4, 5, 7, 9, 11, 12], 'mixolidia': [0, 2, 4, 5, 7, 9, 10, 12],
  'menor natural': [0, 2, 3, 5, 7, 8, 10, 12], 'menor armónica': [0, 2, 3, 5, 7, 8, 11, 12], 'menor dórica': [0, 2, 3, 5, 7, 9, 10, 12],
  'mayor mixta principal': [0, 2, 4, 5, 7, 8, 11, 12], 'mayor mixta secundaria': [0, 2, 4, 5, 7, 8, 10, 12],
  'menor melódica': [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0],
};
/* armadura (alteraciones con signo) de una tonica: mayor/mixolidia/mixtas -> la de la tonica mayor; menor/dorica -> la del relativo mayor */
const QUINTAS = { f: -1, c: 0, g: 1, d: 2, a: 3, e: 4, b: 5 };
const LOC_S = [8, 5, 9, 6, 3, 7, 4], LOC_B = [4, 7, 3, 6, 2, 5, 1];
const LETRA_S = 'fcgdaeb', LETRA_B = 'beadgcf';

function paginas() {
  const dir = path.join(RAIZ, 'ejercicios/escalas');
  const out = [];
  for (const d of fs.readdirSync(dir)) {
    const f = path.join(dir, d, 'index.html');
    if (!fs.existsSync(f)) continue;
    const t = fs.readFileSync(f, 'utf8');
    for (const m of t.matchAll(/tmEs(Constr|Armadura)Engine\(\s*["']([^"']+)["']/g)) out.push({ url: `/ejercicios/escalas/${d}/`, motor: m[1] === 'Constr' ? 'construir' : 'armadura', id: m[2] });
  }
  return out.filter((p) => !SOLO || p.url.includes(SOLO));
}

function leer(svg) {
  const lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; }))].sort((a, b) => a - b);
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const armadura = [...svg.querySelectorAll('.keySig .keyAccid')].map((k) => { const u = k.querySelector('use'), b = u.getBoundingClientRect(); return { glifo: id(u), y: b.top + b.height / 2, x: b.left, ambar: /8b6914/i.test(k.outerHTML) }; }).sort((a, b) => a.x - b.x);
  const notas = [...svg.querySelectorAll('.note')].map((n) => {
    const c = n.querySelector('.notehead use'), b = c.getBoundingClientRect(), a = n.querySelector('.accid use');
    return { y: b.top + b.height / 2, x: b.left + b.width / 2, acc: a ? id(a) : null, ambar: /8b6914/i.test(n.outerHTML) };
  }).sort((p, q) => p.x - q.x);
  const caja = svg.getBoundingClientRect();
  return { lineas, armadura, notas, izq: caja.left, ancho: caja.width };
}
const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

/** lo dibujado -> notas { paso, alt, mostrada } con la alteracion REAL (armadura -> signo -> compas) */
function interpretar(lec) {
  const glifos = new Set(lec.armadura.map((a) => a.glifo));
  const n = lec.armadura.length, signo = glifos.has('E260') ? -1 : 1;
  const letrasArm = n ? (signo > 0 ? LETRA_S : LETRA_B).slice(0, n) : '';
  const esp = (lec.lineas[4] - lec.lineas[0]) / 4;
  const estado = {};
  return lec.notas.map((x) => {
    const paso = 30 + Math.round((lec.lineas[4] - x.y) / (esp / 2));
    const letra = LETRAS[((paso % 7) + 7) % 7], oct = Math.floor(paso / 7), id = letra + oct;
    let alt;
    if (x.acc) alt = GLIFO_ACC[x.acc]; else if (id in estado) alt = estado[id]; else alt = letrasArm.includes(letra) ? signo : 0;
    const vigente = id in estado ? estado[id] : (letrasArm.includes(letra) ? signo : 0);
    estado[id] = alt;
    return { paso, letra, oct, alt, mostrada: !!x.acc, ambar: x.ambar, vigente };
  });
}
const locDe = (lec, y, glifo) => Math.round((lec.lineas[4] - y) / ((lec.lineas[4] - lec.lineas[0]) / 8)) - (glifo === 'E260' ? 1 : 0);

/** el enunciado -> la escala a escribir: { notas: [{letra, oct, alt}], seq, tonica, tipo, nombre } */
function escalaDe(nombre, datos) {
  const m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭#b]?)\s+(.+)$/.exec(nombre.trim());
  if (!m) throw new Error('nombre ilegible: ' + nombre);
  const l = ES[m[1]], alt = m[2] === '♯' || m[2] === '#' ? 1 : m[2] === '♭' || m[2] === 'b' ? -1 : 0;
  const tipo = m[3].toLowerCase();
  const out = { tonica: { l, alt }, tipo, nombre };
  if (/crom/.test(tipo)) {
    const s = (datos.cromatica || []).find((x) => x.name === nombre);
    if (!s) throw new Error('cromatica sin datos: ' + nombre);
    out.notas = s.seq.map((x) => ({ letra: x[0], oct: Number(x[1]), alt: x[2] })); out.seq = true; out.cromatica = true;
    return out;
  }
  const p = PATRONES[tipo];
  if (!p) throw new Error('tipo desconocido: ' + tipo);
  const abs = 4 * 12 + NS[l] + alt;
  const grados = p.length === 15 ? [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  out.notas = grados.map((g, i) => {
    const li = (l + g) % 7, oct = 4 + Math.floor((l + g) / 7);
    return { letra: LETRAS[li], oct, alt: abs + p[i] - (oct * 12 + NS[li]) };
  });
  out.seq = p.length === 15;
  const fifths = (QUINTAS[LETRAS[l]] + 7 * alt) - (/menor|dórica/.test(tipo) ? 3 : 0);
  out.armadura = fifths;   // + sostenidos, - bemoles
  return out;
}

async function probar(browser, p, nivel, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leer.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  const fallos = []; let preguntas = 0, ultima = 0, saltadas = 0;
  const falla = (q, m) => fallos.push(`semilla ${semilla} nivel ${nivel} p${q}: ${m}`);
  const R = '#' + p.id, conArm = p.motor === 'armadura';
  const leerStaff = () => page.evaluate((r) => window.__leer(document.querySelector(r + ' [id$="_not"] svg')), R);
  const centrar = () => page.evaluate((r) => document.querySelector(r + ' [id$="_wrap"]').scrollIntoView({ block: 'center', behavior: 'instant' }), R);
  const herramienta = (sel) => page.evaluate(([r, s]) => { const b = document.querySelector(r + ' ' + s); if (b) b.click(); return !!b; }, [R, sel]);
  /* coloca algo en la fila de una altura (paso) con el raton; devuelve la lupa vista durante el arrastre */
  async function colocar(paso, comprobarLupa) {
    await centrar();
    const lec = await leerStaff();
    const caja = await page.locator(R + ' [id$="_wrap"]').boundingBox();
    const sp = (lec.lineas[4] - lec.lineas[0]) / 4;
    const y = lec.lineas[4] - (paso - 30) * sp / 2;
    const x = caja.x + caja.width / 2 + 20;
    await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x + 3, y);
    let lupa = null;
    if (comprobarLupa) lupa = await page.evaluate((r) => { const s = document.querySelector(r + ' .tm-iv-loupe svg'); return s && getComputedStyle(s.closest('.tm-iv-loupe')).display !== 'none' ? window.__leer(s) : null; }, R);
    await page.mouse.up();
    return lupa;
  }
  try {
    await page.goto(BASE + p.url, { waitUntil: 'load' });
    await page.waitForSelector(R + ' .tm-iv-mode-btn');
    const nBotones = await page.locator(R + ' .tm-iv-mode-btn').count();
    await page.locator(R + ` .tm-iv-mode-btn`).nth(Math.min(nivel, nBotones - 1)).click();
    const datos = await page.evaluate(() => window.TM_CONSTRUIR_SCALES || {});
    for (let q = 1; q <= 8; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector(R + ' [id$="_not"] svg');
      const enunciado = (await page.locator(R + ' [id$="_q"] strong').last().innerText()).trim();
      let esc;
      try { esc = escalaDe(enunciado, datos); } catch (e) { falla(q, e.message); break; }
      const bien = q % 3 !== 0;
      let malArm = false;
      if (conArm) {
        // fase 1: la armadura
        const n = esc.armadura, signo = n >= 0 ? 1 : -1;
        const locs = (signo > 0 ? LOC_S : LOC_B).slice(0, Math.abs(n));
        let aPoner = locs.map((l) => ({ loc: l, signo }));
        malArm = q % 4 === 0 && aPoner.length >= 2;
        if (malArm) [aPoner[0], aPoner[1]] = [aPoner[1], aPoner[0]];
        for (const a of aPoner) {
          await herramienta(a.signo > 0 ? ' [data-tool="#"]' : ' [data-tool="b"]');
          await colocar(30 + Math.round(a.loc), false);
        }
        const dibA = await leerStaff();
        if (dibA.armadura.length !== aPoner.length) falla(q, `tras colocar la armadura hay ${dibA.armadura.length} alteraciones y se pusieron ${aPoner.length}`);
        await page.locator(R + ' [id$="_btn"]').click();
        // fase 2: el pentagrama ya lleva la armadura correcta (si se puso mal, el motor la corrige)
        const dibB = await leerStaff();
        if (dibB.armadura.length !== Math.abs(n)) { falla(q, `tras la fase 1 la armadura dibujada tiene ${dibB.armadura.length} alteraciones y la de ${enunciado} es de ${Math.abs(n)}`); break; }
        const pos = dibB.armadura.map((a) => locDe(dibB, a.y, a.glifo));
        if (pos.join() !== locs.join()) falla(q, `la armadura de ${enunciado} esta en ${pos} y deberia estar en ${locs}`);
      }
      // notas
      const objetivo = esc.notas.map((x) => ({ ...x }));
      if (objetivo.some((x) => Math.abs(x.alt) > 1)) { saltadas++; await page.locator(R + ' [id$="_btn"]').click({ force: true }).catch(() => {}); await page.locator(R + ' [id$="_nxt"]').click({ force: true }).catch(() => {}); continue; }
      let colocarLista = objetivo.map((x, i) => ({ ...x, i }));
      if (!esc.seq && q % 2 === 0) colocarLista = colocarLista.slice().reverse();   // en 8 notas el motor ordena por altura: se prueba colocar al reves
      if (!bien) { const k = colocarLista.length - 1; const o = colocarLista[k]; colocarLista[k] = { ...o, alt: o.alt + (o.alt < 1 ? 1 : -1) }; }   // una nota con otra alteracion (sin repetir altura)
      let estadoMed = {};
      const armN = conArm ? esc.armadura : 0;
      const sigAlt = (letra) => (armN > 0 && LETRA_S.slice(0, armN).includes(letra) ? 1 : armN < 0 && LETRA_B.slice(0, -armN).includes(letra) ? -1 : 0);
      const puestas = [];
      for (let k = 0; k < colocarLista.length; k++) {
        const x = colocarLista[k];
        const paso = x.oct * 7 + LETRAS.indexOf(x.letra);
        const id = x.letra + x.oct;
        const vigente = conArm ? (esc.seq || true ? (id in estadoMed ? estadoMed[id] : sigAlt(x.letra)) : sigAlt(x.letra)) : 0;
        if (conArm) {
          if (x.alt !== vigente) await herramienta(` [data-tool="${x.alt}"]`);
        } else {
          await herramienta(` [data-acc="${x.alt}"]`);
        }
        const lupa = await colocar(paso, k === 0 || k === colocarLista.length - 1);
        estadoMed[id] = x.alt;
        puestas.push({ ...x, paso });
        if (lupa === null && (k === 0 || k === colocarLista.length - 1)) falla(q, 'no hay lupa al arrastrar');
        else if (lupa) {
          const ln = interpretar(lupa);
          const amb = ln.filter((z) => z.ambar);
          if (amb.length !== 1 || amb[0].paso !== paso) falla(q, `la lupa no marca en ambar la altura ${paso}: ${JSON.stringify(amb.map((z) => z.paso))}`);
          else if (k < 8 && amb[0].alt !== x.alt && !(conArm && x.alt === vigente))   /* con mas de 8 notas la lupa solo enseña una ventana: sin las anteriores no se puede leer el signo que el compas ya no pide */ falla(q, `la lupa marca la nota con alteracion ${amb[0].alt} y se coloca ${x.alt}`);
          if (ln.length !== Math.min(k + 1, esc.seq ? 8 : 99)) falla(q, `la lupa muestra ${ln.length} notas (las ya puestas y la nueva) y deberian ser ${Math.min(k + 1, esc.seq ? 8 : 99)}`);
        }
        const dib = interpretar(await leerStaff());
        if (dib.length !== k + 1) { falla(q, `tras colocar ${k + 1} notas hay ${dib.length} dibujadas`); break; }
      }
      // lo dibujado = lo colocado (en 8 notas, ordenado por altura)
      const dib = interpretar(await leerStaff());
      const esperadoDib = esc.seq ? puestas : puestas.slice().sort((a, b) => a.paso - b.paso);
      const visto = dib.map((z) => `${z.paso}/${z.alt}`).join(' ');
      const esp = esperadoDib.map((z) => `${z.paso}/${z.alt}`).join(' ');
      if (visto !== esp) falla(q, `lo dibujado [${visto}] no es lo colocado [${esp}]`);
      // regla de los signos: en construir sin armadura lleva signo toda nota alterada (y en secuencia, la regla del compas)
      if (!conArm) {
        const estado = {};
        dib.forEach((z, i) => {
          const id = z.letra + z.oct;
          const debe = esc.seq ? z.alt !== (id in estado ? estado[id] : 0) : z.alt !== 0;
          estado[id] = z.alt;
          if (debe !== z.mostrada) falla(q, `la nota ${i + 1} (${z.letra}${z.oct}, alt ${z.alt}) ${z.mostrada ? 'lleva' : 'no lleva'} signo y ${debe ? 'deberia llevarlo' : 'no deberia'}`);
        });
      }
      // deshacer / limpiar una vez
      if (q === 1) {
        await page.locator(R + ' [id$="_undo"]').click();
        if ((await leerStaff()).notas.length !== colocarLista.length - 1) falla(q, 'Deshacer no quita una nota');
        await page.locator(R + ' [id$="_clear"]').click();
        if ((await leerStaff()).notas.length !== 0) falla(q, 'Limpiar no deja el pentagrama sin notas');
        estadoMed = {};
        for (const x of colocarLista) {
          const paso = x.oct * 7 + LETRAS.indexOf(x.letra), id = x.letra + x.oct;
          const vigente = conArm ? (id in estadoMed ? estadoMed[id] : sigAlt(x.letra)) : 0;
          if (conArm) { if (x.alt !== vigente) await herramienta(` [data-tool="${x.alt}"]`); } else await herramienta(` [data-acc="${x.alt}"]`);
          await colocar(paso, false);
          estadoMed[id] = x.alt;
        }
      }
      await page.locator(R + ' [id$="_btn"]').click();
      const ok = await page.locator(R + ' .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
      const debeOk = bien && !malArm;   // con la armadura mal puesta el ejercicio entero es incorrecto (aunque la escala este bien)
      if (ok !== debeOk) falla(q, `${enunciado}: se coloca ${bien ? 'la escala correcta' : 'una nota mal'}${malArm ? ' con la armadura mal' : ''} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'} (${(await page.locator(R + ' .tm-fb').innerText()).replace(/s+/g, ' ').slice(0, 160)})`);
      if (malArm && !/armadura estaba mal/.test(await page.locator(R + ' .tm-fb').innerText())) falla(q, 'con la armadura mal no lo dice');
      if (!debeOk) {   // al fallar, el pentagrama enseña la escala correcta
        const sol = interpretar(await leerStaff());
        const solFinal = sol.map((z) => z.alt).join();
        const objAlt = objetivo.map((z) => z.alt).join();
        const solLet = sol.map((z) => z.letra).join(''), objLet = objetivo.map((z) => z.letra).join('');
        if (solLet !== objLet || solFinal !== objAlt) falla(q, `la solucion dibujada (${solLet} ${solFinal}) no es la escala (${objLet} ${objAlt})`);
      }
      await page.locator(R + ' [id$="_nxt"]').click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 700)); }
  await ctx.close();
  return { preguntas, fallos, saltadas };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0, salt = 0;
  for (const p of paginas()) {
    let n = 0; const fs2 = []; let sk = 0;
    for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, p, s % 3, s * 7919); n += r.preguntas; fs2.push(...r.fallos); sk += r.saltadas; }
    total += n; mal += fs2.length; salt += sk;
    console.log(`${fs2.length ? '✗' : '✓'} ${p.motor.padEnd(9)} ${p.id.padEnd(12)} ${String(n).padStart(3)} preguntas${sk ? ` (${sk} con doble alteracion, saltadas)` : ''} · ${fs2.length} discrepancias`);
    fs2.slice(0, 12).forEach((x) => console.log('     - ' + x));
  }
  await browser.close();
  console.log(`\n${mal} discrepancias en ${total} preguntas${salt ? ` (${salt} saltadas por pedir dobles alteraciones, que el motor no ofrece)` : ''}`);
  process.exit(mal ? 1 : 0);
})();
