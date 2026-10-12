'use strict';
/**
 * Banco de pruebas de los ejercicios de «¿qué escala es esta?» (assets/js/escalas-{mayores,mayores-mixta,menores,todas}-engine.js; paginas
 * de /ejercicios/escalas/): mayores, mixolidia, mixtas principal y secundaria, menores natural / armonica / melodica / dorica y «todas».
 *
 *   node tools/servidor-estatico.js                        (en otra terminal)
 *   node tools/test-motor-escalas.js [--semillas=3] [--solo=melodica] [--base=http://127.0.0.1:8910]
 *
 * El motor no expone sus preguntas: el banco las deduce DEL DIBUJO. Se lee el pentagrama (armadura: cuantas alteraciones y de que
 * signo; cada nota: altura contra las lineas y signo propio), con la regla del compas se saca la alteracion REAL de cada nota
 * (armadura -> signo escrito -> lo que ya valia para esa altura en el compas), se pasa a semitonos sobre la primera nota y se
 * reconoce la escala por su patron de intervalos (mayor, mixolidia, menor natural/armonica/melodica con su bajada, dorica, mixta
 * principal o secundaria) y por su tonica. Se contesta eso (en facil, la opcion con ese nombre; en dificil, la nota raiz y su
 * alteracion) y el motor tiene que decir «Correcto»; si se contesta otra cosa, «Incorrecto». Ademas la etiqueta «Con armadura» /
 * «Con alteraciones» tiene que corresponderse con lo dibujado.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const SEMILLAS = Number(arg('semillas', 3));
const BASE = arg('base', 'http://127.0.0.1:8910');
const SOLO = arg('solo', '');
const RAIZ = path.join(__dirname, '..');

const NS = [0, 2, 4, 5, 7, 9, 11];
const ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const GLIFO_ACC = { E262: 1, E260: -1, E263: 2, E264: -2, E261: 0 };
const PATRONES = [
  ['Mayor', [0, 2, 4, 5, 7, 9, 11, 12]],
  ['Mixolidia', [0, 2, 4, 5, 7, 9, 10, 12]],
  ['menor natural', [0, 2, 3, 5, 7, 8, 10, 12]],
  ['menor armónica', [0, 2, 3, 5, 7, 8, 11, 12]],
  ['menor dórica', [0, 2, 3, 5, 7, 9, 10, 12]],
  ['Mayor mixta principal', [0, 2, 4, 5, 7, 8, 11, 12]],
  ['Mayor mixta secundaria', [0, 2, 4, 5, 7, 8, 10, 12]],
  ['menor melódica', [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0]],
];

function paginas() {
  const dir = path.join(RAIZ, 'ejercicios/escalas');
  const out = [];
  for (const d of fs.readdirSync(dir)) {
    const f = path.join(dir, d, 'index.html');
    if (!fs.existsSync(f)) continue;
    const t = fs.readFileSync(f, 'utf8');
    for (const m of t.matchAll(/tmEsc(\w+)\(\s*["']([^"']+)["'](?:\s*,\s*["']([^"']+)["'])?\s*\)/g)) out.push({ url: `/ejercicios/escalas/${d}/`, motor: m[1], id: m[2], tipo: m[3] || '' });
  }
  return out.filter((p) => !SOLO || p.url.includes(SOLO) || p.tipo.includes(SOLO));
}

/** Dentro de la pagina: armadura (glifos) y notas (cabeza, signo) del pentagrama */
function leer(svg) {
  const lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((p) => { const b = p.getBoundingClientRect(); return Math.round((b.top + b.height / 2) * 100) / 100; }))].sort((a, b) => a - b);
  const id = (u) => (u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*$/, '');
  const armadura = [...svg.querySelectorAll('.keySig .keyAccid use')].map((u) => id(u));
  const notas = [...svg.querySelectorAll('.note')].map((n) => {
    const c = n.querySelector('.notehead use'), b = c.getBoundingClientRect(), a = n.querySelector('.accid use');
    return { y: b.top + b.height / 2, x: b.left + b.width / 2, acc: a ? id(a) : null };
  }).sort((p, q) => p.x - q.x);
  return { lineas, armadura, notas };
}
const sembrar = (semilla) => {
  let a = semilla >>> 0;
  Math.random = function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

/** lo dibujado -> { tonica: 'Fa#', patron, nombre, n } o { error } */
function reconocer(lec) {
  if (lec.lineas.length !== 5) return { error: `${lec.lineas.length} lineas` };
  const glifos = new Set(lec.armadura);
  if (glifos.size > 1) return { error: 'armadura mezclada' };
  const n = lec.armadura.length, signo = glifos.has('E260') ? -1 : 1;
  const letrasArm = n ? (signo > 0 ? 'fcgdaeb' : 'beadgcf').slice(0, n) : '';
  const esp = (lec.lineas[4] - lec.lineas[0]) / 4;
  const estado = {};
  const notas = lec.notas.map((x) => {
    const paso = 30 + Math.round((lec.lineas[4] - x.y) / (esp / 2));
    const letra = 'cdefgab'[((paso % 7) + 7) % 7], oct = Math.floor(paso / 7), id = letra + oct;
    let alt;
    if (x.acc) alt = GLIFO_ACC[x.acc];
    else if (id in estado) alt = estado[id];
    else alt = letrasArm.includes(letra) ? signo : 0;
    estado[id] = alt;
    return { letra, alt, paso, semis: oct * 12 + NS[((paso % 7) + 7) % 7] + alt };
  });
  const base = notas[0];
  const intervalos = notas.map((x) => x.semis - base.semis);
  const patron = PATRONES.find(([, p]) => p.join() === intervalos.join());
  const tonica = ES['cdefgab'.indexOf(base.letra)] + (base.alt > 0 ? '#'.repeat(base.alt) : base.alt < 0 ? 'b'.repeat(-base.alt) : '');
  if (!patron) return { error: `patron desconocido ${intervalos} (tonica ${tonica})`, n, signo };
  return { tonica, nombre: `${tonica} ${patron[0]}`, patron: patron[0], n, signo };
}

async function probar(browser, p, nivel, semilla) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript(sembrar, semilla);
  await page.addInitScript(`window.__leer = ${leer.toString()};`);
  await page.route('**/*', (r) => (/consent\.js|googletagmanager|googlesyndication|google-analytics|doubleclick/.test(r.request().url()) ? r.abort() : r.fallback()));
  const fallos = []; let preguntas = 0, ultima = 0;
  const etiqueta = `${p.tipo || p.motor}`;
  const falla = (q, m) => fallos.push(`semilla ${semilla} ${nivel} p${q}: ${m}`);
  const R = '#' + p.id;
  try {
    await page.goto(BASE + p.url, { waitUntil: 'load' });
    await page.waitForSelector(R + ' svg');
    if (nivel === 'hard') await page.locator(R + ' [id$="_hard"]').click();
    for (let q = 1; q <= 14; q++) {
      preguntas++; ultima = q;
      await page.waitForSelector(R + ' [id$="_staff"] svg');
      await page.evaluate((r) => document.querySelector(r + ' .tm-card').scrollIntoView({ block: 'center', behavior: 'instant' }), R);
      const lec = await page.evaluate((r) => window.__leer(document.querySelector(r + ' [id$="_staff"] svg')), R);
      const rec = reconocer(lec);
      if (rec.error) { falla(q, 'el dibujo no se reconoce: ' + rec.error); break; }
      const tag = (await page.locator(R + ' [id$="_modetag"]').innerText()).trim();
      if ((tag === 'Con armadura') !== (lec.armadura.length > 0) && !(tag === 'Con armadura' && rec.n === 0)) falla(q, `la etiqueta dice «${tag}» y el dibujo tiene ${lec.armadura.length} alteraciones en la armadura`);
      if (tag === 'Con alteraciones' && lec.armadura.length) falla(q, 'etiqueta «Con alteraciones» pero hay armadura');
      // la pagina pide un tipo: el dibujo tiene que ser de ese tipo
      const esperaTipo = { mixolidia: 'Mixolidia', natural: 'menor natural', 'armónica': 'menor armónica', 'melódica': 'menor melódica', 'dórica': 'menor dórica', principal: 'Mayor mixta principal', secundaria: 'Mayor mixta secundaria' }[p.tipo || ''];
      if (p.motor === 'Mayores' && !p.tipo && rec.patron !== 'Mayor') falla(q, `la pagina es de mayores y el dibujo es ${rec.nombre}`);
      if (esperaTipo && p.motor !== 'MixtasMayores' && rec.patron !== esperaTipo) falla(q, `la pagina es de ${p.tipo} y el dibujo es ${rec.nombre}`);
      if (p.motor === 'MixtasMayores' && rec.patron !== esperaTipo) falla(q, `la pagina es de mixta ${p.tipo} y el dibujo es ${rec.nombre}`);
      const bien = q % 2 === 1;
      let ok;
      if (nivel === 'easy') {
        const opciones = await page.locator(R + ' .tm-opt').allInnerTexts();
        const buena = opciones.find((o) => o === rec.nombre);
        if (!buena) { falla(q, `el dibujo es «${rec.nombre}» y no esta entre las opciones: ${opciones.join(' | ')}`); await page.locator(R + ' .tm-opt').first().click(); await page.locator(R + ' .tm-nxt').click(); continue; }
        const elegida = bien ? buena : opciones.find((o) => o !== rec.nombre);
        await page.locator(R + ' .tm-opt', { hasText: new RegExp('^' + elegida.replace(/[#]/g, '\\#') + '$') }).click();
      } else {
        const raiz = rec.tonica.replace(/[#b]+$/, ''), alt = rec.tonica.slice(raiz.length);
        const altBoton = { '': '', '#': '#', b: 'b' }[alt];
        if (altBoton === undefined) { falla(q, `la tonica ${rec.tonica} lleva una alteracion que no se puede elegir`); await page.evaluate((r) => document.querySelector(r + ' .tm-hn').click(), R); break; }
        await page.locator(R + ` .tm-hn[data-note="${raiz}"]`).click();
        const eleg = bien ? altBoton : ['', '#', 'b'].find((a) => a !== altBoton);
        await page.locator(R + ` .tm-ha[data-acc="${eleg}"]`).click();
      }
      ok = await page.locator(R + ' .tm-fb').evaluate((e) => e.classList.contains('tm-ok'));
      if (ok !== bien) falla(q, `el dibujo es «${rec.nombre}» (${rec.n} ${rec.signo > 0 ? 'sost.' : 'bem.'}); se contesta ${bien ? 'eso' : 'otra cosa'} y el motor dice ${ok ? 'Correcto' : 'Incorrecto'}`);
      await page.locator(R + ' .tm-nxt').click();
    }
  } catch (e) { falla('?(tras p' + ultima + ')', String(e).slice(0, 500)); }
  await ctx.close();
  return { preguntas, fallos };
}

(async () => {
  const browser = await chromium.launch();
  let total = 0, mal = 0;
  for (const p of paginas()) {
    for (const nivel of ['easy', 'hard']) {
      if (nivel === 'hard' && p.motor === 'Todas') continue;   // el dificil de «todas» tiene mas pasos (modo y tipo): se prueba en facil
      let n = 0; const fs2 = [];
      for (let s = 1; s <= SEMILLAS; s++) { const r = await probar(browser, p, nivel, s * 7919 + (nivel === 'hard' ? 1 : 0)); n += r.preguntas; fs2.push(...r.fallos); }
      total += n; mal += fs2.length;
      console.log(`${fs2.length ? '✗' : '✓'} ${(p.tipo || p.motor).padEnd(12)} ${nivel.padEnd(5)} ${p.id.padEnd(16)} ${String(n).padStart(3)} preguntas · ${fs2.length} discrepancias`);
      fs2.slice(0, 5).forEach((x) => console.log('     - ' + x));
    }
  }
  await browser.close();
  console.log(`\n${mal} discrepancias en ${total} preguntas`);
  process.exit(mal ? 1 : 0);
})();
