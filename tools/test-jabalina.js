'use strict';
/**
 * Comprueba el juego «Lanzamiento de jabalina» (/juegos/entonacion/lanzamiento-de-jabalina/): se canta un glissando entre dos
 * notas (1 s la primera, 2 s deslizando, 1 s la segunda) y la voz tiene que ir por un pasillo; cada segundo dentro suma metros.
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/test-jabalina.js [--puerto=8910] [--sabotaje]
 *
 * 1. LAS CIFRAS DEL TEXTO = LAS DEL CÓDIGO (metros por segundo de cada fase, récord, nulo, anchuras del pasillo, intervalos).
 * 2. LOS INTERVALOS Y SU SENTIDO SON LOS QUE DICEN SER (nombres con ♯/♭ por letras, semitonos por nombres y por frecuencias,
 *    cualidad por una tabla aparte) y EL CAMINO DEL PASILLO empieza en la nota A, desliza en línea recta en cents y acaba en B.
 * 3. EL DETECTOR SIGUE UN GLISSANDO. Se fabrica la voz (fundamental + armónicos + vibrato) deslizando por el camino ideal, se pasa
 *    por el YIN del propio juego fotograma a fotograma (como hace el micrófono) y se mide cuánto tiempo cae dentro del pasillo, para los
 *    10 intervalos subiendo y bajando. Se exige que un cantante perfecto esté dentro casi siempre incluso con el pasillo más estrecho.
 * 4. SE JUEGA DE VERDAD con una voz fabricada puesta en lugar del micrófono: perfecta (cualquier octava), plana (sin deslizar),
 *    que empieza tarde y desafinada +40 cents; y con el modo demostración. Y los eventos de medición.
 * --sabotaje: comparar sin el desfase del detector, cambiar cifras del texto y la cualidad esperada, y comprobar que se detecta.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const BASE = `http://localhost:${PUERTO}`;
const DIR = 'juegos/entonacion/lanzamiento-de-jabalina';
const URL = '/' + DIR + '/';

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 40) console.log('  ✗ ' + m); } };
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');
const texto = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const coma = (n, d) => n.toFixed(d).replace('.', ',');
const lista = (xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1];

// --- referencia escrita aparte del juego
const CUALIDAD = { '2-1': 'menor', '2-2': 'mayor', '3-3': 'menor', '3-4': 'mayor', '4-5': 'justa', '5-7': 'justa', '6-8': 'menor', '6-9': 'mayor', '7-10': 'menor', '7-11': 'mayor' };
const PC = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const LETRAS = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const ALT = { '': 0, '♯': 1, '♭': -1 };
const pcDe = (n) => { const m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭]?)$/.exec(n); return m ? { letra: m[1], pc: (PC[m[1]] + ALT[m[2]] + 12) % 12 } : null; };
const GRUPOS_ESPERADOS = { segundas_terceras: [2, 3], cuartas_quintas: [4, 5], sextas_septimas: [6, 7], todos: [2, 3, 4, 5, 6, 7] };

function fuente() {
  const g = leer(DIR + '/juego/index.html');
  const m = (re, n) => { const r = re.exec(g); if (!r) throw new Error('no encuentro ' + re); return r[n || 1]; };
  return {
    p: [Number(m(/const P1 = (\d+)/)), Number(m(/P2 = (\d+)/)), Number(m(/P3 = (\d+)/))], rate: JSON.parse(m(/const RATE = (\[[^\]]+\])/)), rec: Number(m(/REC = ([\d.]+)/)),
    nulo: Number(m(/S\.nulo = S\.tuned < ([\d.]+)/)), lag: Number(m(/const LAG_VOZ = ([\d.]+)/)),
    dif: (() => { const r = /const DIF = \{ facil: (\d+), normal: (\d+), maestro: (\d+) \}/.exec(g); return r.slice(1, 4).map(Number); })(),
    ints: [...g.matchAll(/\{ id: '(\w+)', n: '([^']+)', num: (\d), st: (\d+) \}/g)].map((r) => ({ id: r[1], n: r[2], num: Number(r[3]), st: Number(r[4]) })),
    grupos: Object.fromEntries([...g.matchAll(/(segundas_terceras|cuartas_quintas|sextas_septimas|todos): \[([\d, ]+)\]/g)].map((r) => [r[1], r[2].split(',').map((x) => Number(x.trim()))])),
  };
}

function comprobarTexto(f) {
  let pag = texto(leer(DIR + '/index.html'));
  if (SABOTAJE) pag = pag.replace(/25 m/g, '26 m').replace('±30 cents', '±35 cents');
  const tiene = (s, m) => ok(pag.includes(s), `texto: falta «${s}» (${m})`);
  const max = f.p.reduce((a, d, i) => a + d * f.rate[i], 0);
  ['Carrera', 'Glissando', 'Remate'].forEach((nombre, i) => {
    tiene(`${nombre} ${f.p[i]} s ${f.rate[i]} m ${f.p[i] * f.rate[i]} m`, `fila de la tabla: ${nombre}`);
    tiene(`${f.rate[i]} m`, `metros por segundo (${nombre})`);
  });
  tiene(`se lanzan ${max} m`, 'máximo'); tiene(coma(f.rec, 2) + ' m', 'récord');
  tiene('menos de ' + coma(f.nulo, 1) + ' segundos', 'nulo');
  f.dif.forEach((m) => tiene('±' + m + ' cents', 'anchura del pasillo'));
  const filas = { segundas_terceras: '2ªs y 3ªs', cuartas_quintas: '4ªs y 5ªs', sextas_septimas: '6ªs y 7ªs' };
  for (const [k, et] of Object.entries(filas)) {
    const ivs = f.ints.filter((i) => f.grupos[k].includes(i.num));
    tiene(lista(ivs.map((i) => i.n)), `intervalos de ${et}`); tiene(lista(ivs.map((i) => String(i.st))), `semitonos de ${et}`);
  }
  const todos = f.ints.map((i) => i.st); tiene('de ' + Math.min(...todos) + ' a ' + Math.max(...todos), 'semitonos de «Todos»');
  ok(JSON.stringify(f.grupos) === JSON.stringify(GRUPOS_ESPERADOS), `grupos del código ${JSON.stringify(f.grupos)} ≠ los pedidos`);
  ok(max > f.rec && max < f.rec * 1.05, `el máximo (${max}) debería superar el récord (${f.rec}) por poco`);
  ok(f.p.reduce((a, b) => a + b, 0) === 4, 'la ronda debería durar 4 s');
}

async function abre(b, ruta) {
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${ruta}`, { waitUntil: 'load' });
  return p;
}

async function comprobarIntervalos(b, f) {
  const p = await abre(b, URL + 'juego/');
  const tabla = SABOTAJE ? Object.assign({}, CUALIDAD, { '3-4': 'menor' }) : CUALIDAD;
  for (const grupo of Object.keys(GRUPOS_ESPERADOS)) {
    const muestras = await p.evaluate((g) => {
      const { S, setState, camino, fCamino } = window.__salto; const r = [];
      S.gru = g; S.dif = 'normal';
      for (let i = 0; i < 600; i++) {
        setState('listen');
        r.push({ nombre: S.chord.iv.n, id: S.chord.iv.id, dir: S.dir, mostrado: document.getElementById('chordName').textContent, notas: S.targets.map((t) => ({ n: t.n, f: t.f })),
          cam: [0, 1, 2, 3, 4].map((t) => camino(t)), razon: fCamino(3) / fCamino(0), f0: fCamino(0) });
      }
      return r;
    }, grupo);
    const vistos = new Set(), sentidos = new Set();
    for (const m of muestras) {
      const a = pcDe(m.notas[0].n), z = pcDe(m.notas[1].n);
      if (!a || !z) { ok(false, `${grupo}: nombre de nota raro ${JSON.stringify(m.notas)}`); continue; }
      const num = m.dir > 0 ? ((LETRAS.indexOf(z.letra) - LETRAS.indexOf(a.letra) + 7) % 7) + 1 : ((LETRAS.indexOf(a.letra) - LETRAS.indexOf(z.letra) + 7) % 7) + 1;
      const stNombres = m.dir > 0 ? (z.pc - a.pc + 12) % 12 : (a.pc - z.pc + 12) % 12;
      const stSonido = Math.round(12 * Math.log2(m.notas[1].f / m.notas[0].f));
      const cualidad = tabla[num + '-' + stNombres];
      const dicho = /^(\d)ª (\w+)$/.exec(m.nombre);
      ok(stSonido === m.dir * stNombres, `${grupo}: ${m.notas[0].n}→${m.notas[1].n} suena a ${stSonido} semitonos y por los nombres son ${m.dir * stNombres}`);
      ok(cualidad && dicho && Number(dicho[1]) === num && dicho[2] === cualidad, `${grupo}: ${m.notas[0].n}→${m.notas[1].n} (${m.dir > 0 ? 'sube' : 'baja'}) es una ${num}ª de ${stNombres} semitonos (${cualidad}) y el juego dice «${m.nombre}»`);
      ok(GRUPOS_ESPERADOS[grupo].includes(num), `${grupo}: salió una ${num}ª que no es de este grupo`);
      ok(m.mostrado === m.nombre + (m.dir > 0 ? ' · sube' : ' · baja'), `${grupo}: la pantalla dice «${m.mostrado}» y la ronda es ${m.nombre} ${m.dir > 0 ? 'sube' : 'baja'}`);
      // el camino: plano, rampa recta en cents, plano; la nota A es la de la pantalla
      const L = m.dir * stNombres * 100;
      ok(m.cam[0] === 0 && m.cam[1] === 0 && Math.abs(m.cam[2] - L / 2) < 1e-9 && Math.abs(m.cam[3] - L) < 1e-9 && m.cam[4] === L, `${grupo}: camino ${JSON.stringify(m.cam)} para ${L} cents`);
      ok(Math.abs(Math.log2(m.razon) * 12 - m.dir * stNombres) < 1e-9, `${grupo}: el camino acaba a ${(Math.log2(m.razon) * 12).toFixed(4)} semitonos de A y debería ser ${m.dir * stNombres}`);
      ok(Math.abs(m.f0 - m.notas[0].f) < 1e-9, `${grupo}: el camino no empieza en la nota A`);
      vistos.add(m.id); sentidos.add(m.dir);
    }
    const quiere = f.ints.filter((i) => GRUPOS_ESPERADOS[grupo].includes(i.num)).map((i) => i.id).sort();
    ok(JSON.stringify([...vistos].sort()) === JSON.stringify(quiere), `${grupo}: salieron ${[...vistos].sort().join(',')} y tenían que salir ${quiere.join(',')}`);
    ok(sentidos.size === 2, `${grupo}: el glissando debería salir subiendo y bajando`);
  }
  await p.close();
}

/* La voz fabricada: fundamental y dos armónicos, con vibrato, deslizando por el camino ideal (o por una variante). */
const FABRICA_VOZ = () => {
  window.__voz = function (S, camino, N, sr, tau0, formaCents) {
    const out = new Float32Array(N); let ph = 0;
    for (let i = 0; i < N; i++) {
      const tau = tau0 - (N - 1 - i) / sr;
      if (tau < 0) continue;
      const c = formaCents(tau) + 8 * Math.sin(2 * Math.PI * 5.5 * tau);       // vibrato de ±8 cents a 5,5 Hz
      ph += 2 * Math.PI * (S.fA * Math.pow(2, c / 1200)) / sr;
      out[i] = 0.25 * (Math.sin(ph) + 0.5 * Math.sin(2 * ph) + 0.3 * Math.sin(3 * ph));
    }
    return out;
  };
};

async function comprobarDetector(b, f) {
  const p = await abre(b, URL + 'juego/');
  await p.evaluate(FABRICA_VOZ);
  await p.click('#btnDemo'); await p.click('#btnStart');          // crea el contexto de audio (sampleRate)
  await p.waitForSelector('#btnSing', { state: 'visible' });
  const lag = SABOTAJE ? 0 : f.lag;
  const res = await p.evaluate(({ lag, intervalos }) => {
    const { S, setState, camino, fCamino, sr } = window.__salto; const fs = sr();
    const salida = [];
    for (const iv of intervalos) for (const dir of [1, -1]) for (const root of [0, 5]) {
      S.forzar = { r: root, iv, dir }; S.gru = 'todos'; setState('listen');
      let dentro = 0, perdidas = 0, n = 0, peor = 0;
      for (let t = 0.2; t <= 3.9; t += 1 / 60) {
        const buf = window.__voz(S, camino, 2048, fs, t, (tau) => camino(tau));
        const r = yin(buf, fs);
        n++;
        if (!r) { perdidas++; continue; }
        const err = Math.abs(centsOff(r.freq, fCamino(Math.max(0, t - lag))));
        if (err <= 15) dentro++; peor = Math.max(peor, err);
      }
      salida.push({ iv, dir, root, dentro: dentro / n, perdidas: perdidas / n, peor });
    }
    return salida;
  }, { lag, intervalos: f.ints.map((i) => i.id) });
  let minDentro = 1, maxPerdidas = 0;
  for (const r of res) {
    minDentro = Math.min(minDentro, r.dentro); maxPerdidas = Math.max(maxPerdidas, r.perdidas);
    ok(r.dentro >= 0.95, `detector: ${r.iv} ${r.dir > 0 ? 'sube' : 'baja'} (raíz ${r.root}): solo ${(r.dentro * 100).toFixed(0)} % del tiempo dentro de ±15 cents (peor error ${r.peor.toFixed(0)})`);
    ok(r.perdidas <= 0.03, `detector: ${r.iv} ${r.dir > 0 ? 'sube' : 'baja'}: se pierde la voz en el ${(r.perdidas * 100).toFixed(0)} % de los fotogramas`);
  }
  console.log(`  detector: ${res.length} glissandos (10 intervalos × subir/bajar × 2 raíces); el peor tiene ${(minDentro * 100).toFixed(1)} % del tiempo dentro de ±15 cents y se pierde la voz como máximo el ${(maxPerdidas * 100).toFixed(1)} %`);
  await p.close();
}

/* Una ronda entera con una voz fabricada en lugar del micrófono. */
async function ronda(b, f, { nivel = 'maestro', iv, dir, root, forma }) {
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${URL}`, { waitUntil: 'load' });
  const fr = p.frameLocator('iframe.tm-juego');
  await fr.locator(`input[name=dif][value=${nivel}]`).check({ force: true });
  await fr.locator(`input[name=gru][value=todos]`).check({ force: true });
  const marco = p.frames().find((x) => x !== p.mainFrame());
  await marco.evaluate(FABRICA_VOZ);
  await marco.evaluate(({ iv, dir, root, forma }) => { window.__salto.S.forzar = { r: root, iv, dir }; window.__forma = forma; }, { iv, dir, root, forma });
  await fr.locator('#btnStart').click();                        // micrófono falso del navegador
  await fr.locator('#btnSing').waitFor({ state: 'visible', timeout: 10000 });
  await marco.evaluate(() => {
    const { S, camino } = window.__salto; const F = window.__forma;
    const forma = (tau) => (F.octava || 0) + (F.cents || 0) + (F.plano ? 0 : camino(Math.max(0, tau - (F.tarde || 0))));
    S.fake = (now) => {
      if (S.state !== 'sing') return new Float32Array(2048);
      return window.__voz(S, camino, 2048, window.__salto.sr(), (now - S.t0) / 1000, forma);
    };
  });
  await fr.locator('#btnSing').click();
  await fr.locator('#resDist').waitFor({ state: 'visible', timeout: 40000 });
  const out = await marco.evaluate(() => { const { S } = window.__salto; return { dist: S.dist, tp: S.tp.slice(), nulo: S.nulo, tol: S.tol }; });
  await p.close();
  return out;
}

async function comprobarRondas(b, f) {
  const max = f.p.reduce((a, d, i) => a + d * f.rate[i], 0);
  const tipos = [
    ['voz perfecta, subiendo una 7ª mayor (el glissando más rápido)', { iv: 'septima_mayor', dir: 1, root: 0, forma: {} }, (r) => r.dist >= 0.9 * max, 'debería estar casi siempre en el pasillo de ±15 cents'],
    ['voz perfecta, bajando una 7ª menor', { iv: 'septima_menor', dir: -1, root: 5, forma: {} }, (r) => r.dist >= 0.9 * max, 'debería estar casi siempre en el pasillo'],
    ['voz perfecta una octava más grave', { iv: 'quinta_justa', dir: 1, root: 2, forma: { octava: -1200 } }, (r) => r.dist >= 0.9 * max, 'cantar en otra octava debe valer igual'],
    ['voz plana (no desliza, se queda en la nota A)', { iv: 'sexta_mayor', dir: 1, root: 1, forma: { plano: true } }, (r) => r.tp[0] >= 0.9 * f.p[0] && r.tp[2] <= 0.1 && r.dist < 0.35 * max, 'solo debería puntuar en la carrera'],
    ['voz que empieza el glissando 0,8 s tarde', { iv: 'cuarta_justa', dir: 1, root: 0, forma: { tarde: 0.8 } }, (r) => r.tp[1] < 0.75 * f.p[1] && r.tp[1] > 0 && r.dist < 0.85 * max, 'debería perder parte del glissando'],
    ['voz +40 cents (pasillo estrecho ±15)', { iv: 'tercera_mayor', dir: 1, root: 3, forma: { cents: 40 } }, (r) => r.nulo && r.dist === 0, 'debería ser lanzamiento nulo'],
    ['voz +40 cents (pasillo ancho ±50)', { iv: 'tercera_mayor', dir: 1, root: 3, nivel: 'facil', forma: { cents: 40 } }, (r) => r.dist >= 0.85 * max, 'dentro de ±50 cents debería puntuar casi todo'],
  ];
  for (const [etq, cfg, cond, que] of tipos) {
    const r = await ronda(b, f, cfg);
    ok(cond(r), `ronda «${etq}»: ${r.dist} m (carrera ${r.tp[0].toFixed(1)}, glissando ${r.tp[1].toFixed(1)}, remate ${r.tp[2].toFixed(1)} s): ${que}`);
    console.log(`  ${etq.padEnd(62)} ${String(r.dist).padStart(6)} m · carrera ${r.tp[0].toFixed(1)} · glissando ${r.tp[1].toFixed(1)} · remate ${r.tp[2].toFixed(1)}`);
  }
}

async function comprobarDificultades(b, f) {
  for (const [i, dif] of ['facil', 'normal', 'maestro'].entries()) {
    const p = await abre(b, URL + 'juego/');
    await p.check(`input[name=dif][value=${dif}]`, { force: true });
    await p.click('#btnDemo'); await p.click('#btnStart');
    await p.waitForSelector('#btnSing', { state: 'visible', timeout: 8000 });
    const r = await p.evaluate(() => ({ tol: window.__salto.S.tol, notas: document.getElementById('chordNotes').textContent, nombre: document.getElementById('chordName').textContent, txt: document.getElementById('listenTxt').textContent, n: window.__salto.S.chord.n, iv: window.__salto.S.chord.iv.n, dir: window.__salto.S.dir }));
    ok(r.tol === f.dif[i], `${dif}: el pasillo mide ±${r.tol} y el código dice ±${f.dif[i]}`);
    ok(r.nombre === r.iv + (r.dir > 0 ? ' · sube' : ' · baja'), `${dif}: la pantalla dice «${r.nombre}»`);
    if (dif === 'facil') ok(r.notas === r.n[0] + ' → ' + r.n[1], `${dif}: debería enseñar las notas y enseña «${r.notas}»`);
    else ok(r.notas === '', `${dif}: no debería enseñar las notas y enseña «${r.notas}»`);
    ok(dif === 'maestro' ? /Solo oyes la primera nota/.test(r.txt) : /Escucha la salida, el glissando y la llegada/.test(r.txt), `${dif}: el texto de escuchar dice «${r.txt.slice(0, 50)}»`);
    await p.close();
  }
}

async function jugarDemo(b, cents) {
  const p = await abre(b, URL);
  const fr = p.frameLocator('iframe.tm-juego');
  await fr.locator('#btnDemo').click(); await fr.locator('#btnStart').click();
  await fr.locator('#btnSing').waitFor({ state: 'visible', timeout: 8000 }); await fr.locator('#btnSing').click();
  await fr.locator('#demoHold').waitFor({ state: 'visible', timeout: 8000 });
  await fr.locator('#demoCents').evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, String(cents));
  await p.waitForTimeout(3600);
  await fr.locator('#demoHold').click();
  await fr.locator('#resDist').waitFor({ state: 'visible', timeout: 40000 });
  const dist = Number((await fr.locator('#resDist').textContent()).replace(',', '.'));
  const titulo = await fr.locator('#resTitle').textContent();
  const detalle = await fr.locator('#resBrk').innerText();
  const eventos = await p.evaluate(() => (window.dataLayer || []).filter((a) => a && a[0] === 'event' && /^juego_/.test(a[1])).map((a) => ({ evento: a[1], params: Object.assign({}, a[2]) })));
  await p.close();
  return { dist, titulo, detalle, eventos };
}

async function comprobarEventos(b, f) {
  const PERMITIDOS = ['juego', 'dificultad', 'intervalos', 'modo', 'resultado', 'intervalo', 'sentido', 'metros', 'carrera', 'glissando', 'remate', 'motivo'];
  const max = f.p.reduce((a, d, i) => a + d * f.rate[i], 0);
  const bien = await jugarDemo(b, 0), mal = await jugarDemo(b, 200);
  ok(bien.dist >= 0.6 * max && bien.dist <= max + 0.01, `demo afinada: ${bien.dist} m (máximo ${max})`);
  ok(mal.dist === 0 && /nulo/i.test(mal.titulo), `demo desafinada 200 cents: ${mal.dist} m («${mal.titulo}»)`);
  const seg = [...bien.detalle.matchAll(/([\d,]+) de \d s/g)].map((m) => Number(m[1].replace(',', '.')));
  const esperado = seg.reduce((a, s, i) => a + s * f.rate[i], 0);
  ok(seg.length === 3 && Math.abs(esperado - bien.dist) <= 4, `con ${seg.join(', ')} s dentro la distancia debería rondar ${esperado.toFixed(2)} (±4 m: los segundos se enseñan con un decimal) y es ${bien.dist}`);
  for (const [r, esp] of [[bien, 'valido'], [mal, 'nulo']]) {
    const ini = r.eventos.filter((e) => e.evento === 'juego_inicio'), fin = r.eventos.filter((e) => e.evento === 'juego_fin');
    ok(ini.length === 1 && fin.length === 1, `eventos por ronda ${ini.length}/${fin.length}`);
    const e = fin[0] && fin[0].params;
    ok(e && e.juego === 'lanzamiento_jabalina' && e.dificultad === 'normal' && e.intervalos === 'segundas_terceras' && e.modo === 'demo' && e.resultado === esp, `fin = ${JSON.stringify(e)}`);
    ok(e && e.metros === Math.round(r.dist * 100) / 100, `metros del evento ${e && e.metros} y la pantalla ${r.dist}`);
    ok(e && f.ints.some((i) => i.id === e.intervalo) && (e.sentido === 'sube' || e.sentido === 'baja'), `intervalo/sentido del evento ${e && e.intervalo}/${e && e.sentido}`);
    ok(e && [e.carrera, e.glissando, e.remate].every((x, i) => typeof x === 'number' && x <= f.p[i]), `fases del evento ${e && [e.carrera, e.glissando, e.remate]}`);
    r.eventos.forEach((ev) => ok(Object.keys(ev.params).every((k) => PERMITIDOS.includes(k)), `parámetro no permitido en ${JSON.stringify(ev.params)}`));
    ok(!/nombre|Músico/i.test(JSON.stringify(r.eventos)), 'el evento lleva el nombre del jugador');
  }
  console.log(`  demo: afinada ${bien.dist} m (máx ${max}) · desafinada ${mal.dist} m («${mal.titulo}»)`);
}

(async () => {
  const f = fuente();
  console.log(`Código: fases ${f.p.join('+')} s a ${f.rate.join('/')} m/s, récord ${f.rec}, nulo < ${f.nulo} s, desfase del detector ${f.lag} s, pasillo ±${f.dif.join('/')}`);
  comprobarTexto(f);
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });
  await comprobarIntervalos(b, f);
  await comprobarDetector(b, f);
  await comprobarDificultades(b, f);
  await comprobarRondas(b, f);
  await comprobarEventos(b, f);
  await b.close();
  console.log(`\n${comprobaciones} comprobaciones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir varios)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
