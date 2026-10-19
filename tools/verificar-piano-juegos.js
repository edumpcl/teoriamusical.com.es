'use strict';
/**
 * Comprueba que en los tres juegos de entonación la nota (o notas) de referencia suena con las MUESTRAS DE PIANO y que son las
 * notas que toca el juego, en el orden y número correctos.
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/verificar-piano-juegos.js [--puerto=8910] [--sabotaje]
 *
 * CÓMO: se interceptan la descarga y la decodificación de las muestras (para saber de qué fichero viene cada buffer) y los arranques
 * de AudioBufferSourceNode y OscillatorNode. Cada nota que suena = nota del fichero + semitonos de la velocidad de reproducción.
 * Se compara con las notas del juego por dos vías: su frecuencia (midi calculado aparte) y el NOMBRE que enseña la pantalla.
 * Esperado: salto de longitud, 1 nota; triple salto, el arpegio (3) y el acorde (3); salto de altura, las 2 notas y las 2 juntas
 * (o solo la primera con «solo la primera nota»). Y NINGÚN oscilador: si suena la voz sintética, es que el piano no se está usando.
 * --sabotaje: bloquea las muestras (cae la voz sintética) y comprueba que la verificación lo detecta.
 */
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const BASE = `http://localhost:${PUERTO}`;

const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9 };
const PCNOM = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const ALT = { '': 0, '♯': 1, '♭': -1 };
const midiDeFichero = (n) => { const m = /^([A-G])(s?)(\d)$/.exec(n); const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]]; return base + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12; };
const pcDeNombre = (n) => { const m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭]?)$/.exec(n); return (PCNOM[m[1]] + ALT[m[2]] + 12) % 12; };

const INSTRUMENTACION = () => {
  window.__ev = [];
  const nombres = new WeakMap();
  const f0 = window.fetch;
  window.fetch = function (u, ...r) {
    const p = f0.call(this, u, ...r);
    if (!/audio\/piano\//.test(String(u))) return p;
    const nombre = String(u).split('/').pop().replace(/\.\w+$/, '');
    return p.then((res) => { const ab = res.arrayBuffer.bind(res); res.arrayBuffer = () => ab().then((buf) => { nombres.set(buf, nombre); return buf; }); return res; });
  };
  const dec = AudioContext.prototype.decodeAudioData;
  AudioContext.prototype.decodeAudioData = function (buf, ok, bad) {
    const nombre = nombres.get(buf);
    const envuelve = (cb) => (b) => { if (nombre && b) b.__nombre = nombre; if (cb) cb(b); return b; };
    const pr = dec.call(this, buf, ok ? envuelve(ok) : undefined, bad);
    return pr && pr.then ? pr.then((b) => { if (nombre && b) b.__nombre = nombre; return b; }) : pr;
  };
  const st = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (when) { window.__ev.push({ tipo: 'muestra', nombre: this.buffer && this.buffer.__nombre, rate: this.playbackRate.value, cuando: when }); return st.apply(this, arguments); };
  const so = OscillatorNode.prototype.start;
  OscillatorNode.prototype.start = function (when) { window.__ev.push({ tipo: 'oscilador', f: this.frequency.value, cuando: when }); return so.apply(this, arguments); };
};

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 30) console.log('  ✗ ' + m); } };

async function escucha(b, ruta, preparar, esperaN) {
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  await p.addInitScript(INSTRUMENTACION);
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  if (SABOTAJE) await p.route(/audio\/piano\//, (r) => r.abort());
  await p.goto(`${BASE}${ruta}`, { waitUntil: 'load' });
  if (preparar) await preparar(p);
  await p.click('#btnDemo'); await p.click('#btnStart');
  await p.waitForSelector('#btnSing', { state: 'visible', timeout: 8000 });
  const t0 = Date.now();
  while (Date.now() - t0 < 7000) { if ((await p.evaluate(() => window.__ev.length)) >= esperaN) break; await p.waitForTimeout(150); }
  await p.waitForTimeout(500);
  const ev = await p.evaluate(() => window.__ev);
  const info = await p.evaluate(() => { const { S } = window.__salto; return { notas: S.targets ? S.targets.map((t) => ({ n: t.n, f: t.f })) : [{ n: S.note.n, f: S.note.f }] }; });
  await p.close();
  return { ev, notas: info.notas };
}

function compara(etq, r, esperadoOrden) {
  const osc = r.ev.filter((e) => e.tipo === 'oscilador'), mu = r.ev.filter((e) => e.tipo === 'muestra');
  ok(osc.length === 0, `${etq}: suenan ${osc.length} osciladores (voz sintética) en vez de piano`);
  const sonadas = mu.map((e) => (e.nombre ? midiDeFichero(e.nombre) + Math.round(12 * Math.log2(e.rate)) : null));
  const esperadas = esperadoOrden.map((i) => 60 + Math.round(12 * Math.log2(r.notas[i].f / 261.6256)));
  ok(JSON.stringify(sonadas) === JSON.stringify(esperadas), `${etq}: suena ${JSON.stringify(sonadas)} y el juego toca ${JSON.stringify(esperadas)}`);
  // segunda vía: el nombre que enseña la pantalla
  sonadas.forEach((m, k) => { const nom = r.notas[esperadoOrden[k]].n; ok(m !== null && ((m % 12) + 12) % 12 === pcDeNombre(nom), `${etq}: la nota ${k + 1} suena como ${m} y la pantalla dice «${nom}»`); });
  // las dos mitades (arpegio y acorde) empiezan en tiempos distintos; el acorde va junto
  console.log(`  ${etq}: ${mu.length} muestras de piano, ${osc.length} osciladores · ${JSON.stringify(sonadas)}`);
}

(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  compara('salto de longitud', await escucha(b, '/juegos/entonacion/salto-de-longitud/juego/', null, 1), [0]);
  compara('triple salto (3 notas, arpegio y acorde)', await escucha(b, '/juegos/entonacion/triple-salto/juego/', null, 6), [0, 1, 2, 0, 1, 2]);
  for (const grupo of ['segundas_terceras', 'cuartas_quintas', 'sextas_septimas', 'todos']) {
    compara(`salto de altura · ${grupo} (2 notas, arpegio y juntas)`, await escucha(b, '/juegos/entonacion/salto-de-altura/juego/', async (p) => { await p.check(`input[name=gru][value=${grupo}]`, { force: true }); }, 4), [0, 1, 0, 1]);
  }
  compara('salto de altura · Maestro (solo la primera nota)', await escucha(b, '/juegos/entonacion/salto-de-altura/juego/', async (p) => { await p.check('input[name=dif][value=maestro]', { force: true }); }, 1), [0]);
  await b.close();
  console.log(`\n${comprobaciones} comprobaciones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir varios)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
