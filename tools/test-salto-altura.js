'use strict';
/**
 * Comprueba el juego «Salto de altura» (/juegos/entonacion/salto-de-altura/): canta dos notas, la primera es la carrera y la
 * segunda el salto; el nivel decide qué intervalos salen.
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/test-salto-altura.js [--puerto=8910] [--sabotaje]
 *
 * 1. LOS INTERVALOS SON LOS QUE DICEN SER. Para cada nivel se sortean cientos de rondas y cada pareja de notas se comprueba por
 *    una vía independiente del código del juego: el número del intervalo sale de la distancia entre las LETRAS (Do→Mi = 3ª), los
 *    semitonos de las alturas de los nombres (con ♯/♭) y de las FRECUENCIAS que suenan, y la cualidad (menor/mayor/justa) de una
 *    tabla escrita aparte. Además: solo salen los intervalos del nivel y salen todos.
 * 2. LAS CIFRAS DEL TEXTO = LAS DEL CÓDIGO (altura de salida, metros por segundo, récord, nulo, márgenes, niveles, semitonos).
 * 3. SE JUEGA: afinado sube el listón; a 200 cents es nulo; los eventos de medición llevan los parámetros esperados y nada más.
 * --sabotaje: cambia un intervalo, una cifra del texto y la cualidad esperada, y comprueba que la prueba lo detecta.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const BASE = `http://localhost:${PUERTO}`;
const DIR = 'juegos/entonacion/salto-de-altura';
const URL = '/' + DIR + '/';

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 40) console.log('  ✗ ' + m); } };
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');
const texto = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const coma = (n, d) => n.toFixed(d).replace('.', ',');

// --- tabla de referencia, escrita aparte del juego: (número, semitonos) -> cualidad
const CUALIDAD = { '2-1': 'menor', '2-2': 'mayor', '3-3': 'menor', '3-4': 'mayor', '4-5': 'justa', '5-7': 'justa', '6-8': 'menor', '6-9': 'mayor', '7-10': 'menor', '7-11': 'mayor' };
const PC = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const LETRAS = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const ALT = { '': 0, '♯': 1, '♭': -1 };
const pcDe = (n) => { const m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭]?)$/.exec(n); return m ? { letra: m[1], pc: (PC[m[1]] + ALT[m[2]] + 12) % 12 } : null; };
const NIVELES_ESPERADOS = { facil: [2, 3], medio: [4, 5], dificil: [6, 7], maestro: [2, 3, 4, 5, 6, 7] };

function fuente() {
  const g = leer(DIR + '/juego/index.html');
  const m = (re, n) => { const r = re.exec(g); if (!r) throw new Error('no encuentro ' + re); return r[n || 1]; };
  return {
    base: Number(m(/const BASE = ([\d.]+)/)), rate: JSON.parse(m(/const RATE = (\[[^\]]+\])/)), rec: Number(m(/REC = ([\d.]+)/)),
    nulo: Number(m(/S\.nulo = S\.tuned < ([\d.]+)/)), phase: Number(m(/const PHASE = (\d+)/)),
    margen: (() => { const r = /const MARGEN = \{ amplio: (\d+), normal: (\d+), fino: (\d+) \}/.exec(g); return r.slice(1, 4).map(Number); })(),
    ints: [...g.matchAll(/\{ id: '(\w+)', n: '([^']+)', num: (\d), st: (\d+) \}/g)].map((r) => ({ id: r[1], n: r[2], num: Number(r[3]), st: Number(r[4]) })),
    niveles: Object.fromEntries([...g.matchAll(/(facil|medio|dificil|maestro): \[([\d, ]+)\]/g)].map((r) => [r[1], r[2].split(',').map((x) => Number(x.trim()))])),
  };
}
const lista = (xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1];

function comprobarTexto(f) {
  let pag = texto(leer(DIR + '/index.html'));
  if (SABOTAJE) pag = pag.replace(/0,30 m/g, '0,35 m').replace('2ª menor, 2ª mayor, 3ª menor y 3ª mayor', '2ª mayor, 3ª menor y 3ª mayor');
  const tiene = (s, m) => ok(pag.includes(s), `texto: falta «${s}» (${m})`);
  const max = f.base + f.phase * f.rate[0] + f.phase * f.rate[1];
  tiene(coma(f.base, 2) + ' m', 'altura de salida');
  tiene(coma(f.rate[0], 2) + ' m', 'carrera'); tiene(coma(f.rate[1], 2) + ' m', 'salto');
  tiene(coma(max, 2) + ' m', 'máximo'); tiene(coma(f.rec, 2) + ' m', 'récord');
  tiene('menos de ' + coma(f.nulo, 1) + ' segundos', 'nulo');
  tiene(f.phase + ' segundos', 'duración de cada nota');
  f.margen.forEach((m) => tiene('±' + m + ' cents', 'margen'));
  // la tabla de niveles = NIVELES del código
  const filas = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil' };
  for (const [k, etiqueta] of Object.entries(filas)) {
    const ivs = f.ints.filter((i) => f.niveles[k].includes(i.num));
    tiene(lista(ivs.map((i) => i.n)), `intervalos del nivel ${etiqueta}`);
    tiene(lista(ivs.map((i) => String(i.st))), `semitonos del nivel ${etiqueta}`);
  }
  const todos = f.ints.map((i) => i.st);
  tiene('de ' + Math.min(...todos) + ' a ' + Math.max(...todos), 'semitonos de Maestro');
  ok(JSON.stringify(f.niveles) === JSON.stringify(NIVELES_ESPERADOS), `niveles del código ${JSON.stringify(f.niveles)} ≠ los pedidos ${JSON.stringify(NIVELES_ESPERADOS)}`);
  // récord y máximo coherentes con el mundo real: el máximo supera por poco al récord
  ok(max > f.rec && max < f.rec * 1.1, `el máximo (${max}) debería superar el récord (${f.rec}) por poco`);
}

async function comprobarIntervalos(b, f) {
  const p = await b.newPage();
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${URL}juego/`, { waitUntil: 'load' });
  const tabla = SABOTAJE ? Object.assign({}, CUALIDAD, { '3-4': 'menor' }) : CUALIDAD;
  for (const nivel of Object.keys(NIVELES_ESPERADOS)) {
    const muestras = await p.evaluate((n) => {
      const { S, setState } = window.__salto; const r = [];
      S.niv = n; S.ayuda = 'dos';
      for (let i = 0; i < 600; i++) { setState('listen'); r.push({ nombre: S.chord.iv.n, id: S.chord.iv.id, notas: S.targets.map((t) => ({ n: t.n, f: t.f })), mostrado: S.chord.q }); }
      return r;
    }, nivel);
    const vistos = new Set();
    for (const m of muestras) {
      const a = pcDe(m.notas[0].n), z = pcDe(m.notas[1].n);
      if (!a || !z) { ok(false, `${nivel}: nombre de nota raro ${JSON.stringify(m.notas)}`); continue; }
      const num = ((LETRAS.indexOf(z.letra) - LETRAS.indexOf(a.letra) + 7) % 7) + 1;
      const stNombres = (z.pc - a.pc + 12) % 12;
      const stSonido = Math.round(12 * Math.log2(m.notas[1].f / m.notas[0].f));
      const cualidad = tabla[num + '-' + stNombres];
      const dicho = /^(\d)ª (\w+)$/.exec(m.nombre);
      ok(stNombres === stSonido, `${nivel}: ${m.notas[0].n}→${m.notas[1].n} suena a ${stSonido} semitonos y por los nombres son ${stNombres}`);
      ok(cualidad && dicho && Number(dicho[1]) === num && dicho[2] === cualidad, `${nivel}: ${m.notas[0].n}→${m.notas[1].n} es una ${num}ª de ${stNombres} semitonos (${cualidad}) y el juego dice «${m.nombre}»`);
      ok(NIVELES_ESPERADOS[nivel].includes(num), `${nivel}: salió una ${num}ª que no es de este nivel`);
      ok(Math.abs(m.notas[0].f - 261.63 * Math.pow(2, PC[a.letra] / 12)) < 0.01, `${nivel}: la primera nota ${m.notas[0].n} no suena a ${PC[a.letra]} semitonos sobre el Do`);
      vistos.add(m.id);
    }
    const quiere = f.ints.filter((i) => NIVELES_ESPERADOS[nivel].includes(i.num)).map((i) => i.id).sort();
    ok(JSON.stringify([...vistos].sort()) === JSON.stringify(quiere), `${nivel}: salieron ${[...vistos].sort().join(',')} y tenían que salir ${quiere.join(',')}`);
  }
  await p.close();
}

async function jugar(b, cents, nivel) {
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${URL}`, { waitUntil: 'load' });
  const fr = p.frameLocator('iframe.tm-juego');
  if (nivel) await fr.locator(`input[name=niv][value=${nivel}]`).check({ force: true });
  await fr.locator('#btnDemo').click();
  await fr.locator('#btnStart').click();
  await fr.locator('#btnSing').waitFor({ state: 'visible', timeout: 8000 });
  await fr.locator('#btnSing').click();
  await fr.locator('#demoHold').waitFor({ state: 'visible', timeout: 8000 });
  await fr.locator('#demoCents').evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, String(cents));
  await p.waitForTimeout(3900);
  await fr.locator('#demoHold').click();
  await fr.locator('#resDist').waitFor({ state: 'visible', timeout: 40000 });
  const dist = Number((await fr.locator('#resDist').textContent()).replace(',', '.'));
  const titulo = await fr.locator('#resTitle').textContent();
  const detalle = await fr.locator('#resBrk').innerText();
  const eventos = await p.evaluate(() => (window.dataLayer || []).filter((a) => a && a[0] === 'event' && /^juego_/.test(a[1])).map((a) => ({ evento: a[1], params: Object.assign({}, a[2]) })));
  await p.close();
  return { dist, titulo, detalle, eventos };
}

(async () => {
  const f = fuente();
  console.log(`Código: salida ${f.base} m + ${f.rate[0]} m/s (carrera) + ${f.rate[1]} m/s (salto), ${f.phase} s por nota, récord ${f.rec}, nulo < ${f.nulo} s, márgenes ${f.margen.join('/')}`);
  comprobarTexto(f);
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  await comprobarIntervalos(b, f);

  const max = f.base + f.phase * (f.rate[0] + f.rate[1]);
  const PERMITIDOS = ['juego', 'nivel', 'margen', 'ayuda', 'modo', 'resultado', 'intervalo', 'metros', 'carrera', 'salto', 'motivo'];
  for (const nivel of ['facil', 'maestro']) {
    const bien = await jugar(b, 0, nivel), mal = await jugar(b, 200, nivel);
    ok(bien.dist >= f.base + 0.6 * f.phase * f.rate[1] && bien.dist <= max + 0.01, `${nivel}: afinado salta ${bien.dist} m (máximo ${max})`);
    ok(mal.dist === 0 && /nulo/i.test(mal.titulo), `${nivel}: desafinado debería ser nulo y dio ${mal.dist} m («${mal.titulo}»)`);
    // la altura = salida + carrera×0,30 + salto×0,40 (los segundos afinados salen de la propia pantalla de resultado)
    const seg = [...bien.detalle.matchAll(/([\d,]+) de \d s afinado/g)].map((m) => Number(m[1].replace(',', '.')));
    const esperado = Math.round((f.base + seg[0] * f.rate[0] + seg[1] * f.rate[1]) * 100) / 100;
    ok(seg.length === 2 && Math.abs(esperado - bien.dist) <= 0.05, `${nivel}: con ${seg.join(' y ')} s afinados la altura debería rondar ${esperado} y es ${bien.dist}`);
    for (const [r, esp] of [[bien, 'valido'], [mal, 'nulo']]) {
      const ini = r.eventos.filter((e) => e.evento === 'juego_inicio'), fin = r.eventos.filter((e) => e.evento === 'juego_fin');
      ok(ini.length === 1 && fin.length === 1, `${nivel}: eventos por ronda ${ini.length}/${fin.length}`);
      const e = fin[0] && fin[0].params, i0 = ini[0] && ini[0].params;
      ok(e && e.juego === 'salto_altura' && e.nivel === nivel && e.margen === 'normal' && e.ayuda === 'dos_notas' && e.modo === 'demo' && e.resultado === esp, `${nivel}: fin = ${JSON.stringify(e)}`);
      ok(e && e.metros === Math.round(r.dist * 100) / 100, `${nivel}: metros del evento ${e && e.metros} y la pantalla ${r.dist}`);
      ok(e && f.ints.some((i) => i.id === e.intervalo && f.niveles[nivel].includes(i.num)), `${nivel}: intervalo del evento «${e && e.intervalo}» no es del nivel`);
      ok(e && typeof e.carrera === 'number' && typeof e.salto === 'number' && e.carrera <= f.phase && e.salto <= f.phase, `${nivel}: carrera/salto del evento ${e && e.carrera}/${e && e.salto}`);
      ok(i0 && i0.nivel === nivel && i0.modo === 'demo', `${nivel}: inicio = ${JSON.stringify(i0)}`);
      r.eventos.forEach((ev) => ok(Object.keys(ev.params).every((k) => PERMITIDOS.includes(k)), `${nivel}: parámetro no permitido en ${JSON.stringify(ev.params)}`));
      ok(!/nombre|Músico/i.test(JSON.stringify(r.eventos)), `${nivel}: el evento lleva el nombre del jugador`);
    }
    console.log(`  ${nivel}: afinado ${bien.dist} m (máx ${max}) · desafinado ${mal.dist} m («${mal.titulo}»)`);
  }
  await b.close();
  console.log(`\n${comprobaciones} comprobaciones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir varios)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
