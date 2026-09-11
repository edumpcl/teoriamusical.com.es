'use strict';
/**
 * Repasa la seleccion de muestras y sustituye las que se salen de timbre por una
 * nota vecina remuestreada.
 *
 *   node tools/serve.js                                        (otra terminal)
 *   node tools/sanear-seleccion-audio.js trompeta --transposicion=-2 --dry
 *
 * Hasta las librerias buenas tienen alguna muestra rara: en FluidR3 el Fa5 de la
 * trompeta es 800 Hz mas apagado que sus dos vecinas, y al pulsarlo suena a otro
 * instrumento. Aqui se detecta comparando cada nota con la TENDENCIA LOCAL (la
 * mediana de sus vecinas, no una recta: el brillo sube con el registro y una
 * recta global no lo describe bien) y, si se sale, se busca entre las notas de
 * al lado la que mejor encaje.
 *
 * El centroide se promedia a lo largo de toda la nota. Medido en una sola
 * ventana varia cientos de Hz por el vibrato y la evolucion del sonido: es
 * ruido del mismo tamano que lo que se quiere corregir.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const POOL = 'assets/audio/.pool';

const instrumento = process.argv[2];
if (!instrumento) { console.log('Uso: node tools/sanear-seleccion-audio.js <instrumento> [--transposicion=N] [--umbral=400] [--dry]'); process.exit(1); }
const argN = (n, d) => { const a = process.argv.find(x => x.startsWith('--' + n + '=')); return a ? Number(a.split('=')[1]) : d; };
const TRANS = argN('transposicion', 0);
const UMBRAL = argN('umbral', 400);      // Hz de desvio respecto a las vecinas que se consideran demasiado
const SALTO = argN('salto', 2);
const dry = process.argv.includes('--dry');

const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const midiDe = n => { const m = /^([A-G])(s?)(\d)$/.exec(n); return m ? SEMIS[m[1]] + (m[2] ? 1 : 0) + (+m[3] + 1) * 12 : null; };

(async () => {
  const selPath = path.join(ROOT, POOL, 'seleccion.json');
  const sel = JSON.parse(fs.readFileSync(selPath, 'utf8'));
  const notas = Object.keys(sel).sort((a, b) => midiDe(a) - midiDe(b));
  const archivos = fs.readdirSync(path.join(ROOT, POOL)).filter(f => f.endsWith('.mp3'));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  const cen = await page.evaluate(async ({ pool, archivos }) => {
    const ctx = new OfflineAudioContext(1, 44100, 44100);
    const out = {};
    for (const f of archivos) {
      const buf = await ctx.decodeAudioData(await (await fetch(`/${pool}/${f}`)).arrayBuffer());
      const d = buf.getChannelData(0), sr = 44100;
      let pico = 0; for (let i = 0; i < d.length; i++) pico = Math.max(pico, Math.abs(d[i]));
      let on = 0; while (on < d.length && Math.abs(d[on]) < pico * 0.02) on++;
      const M = Math.round(sr * 0.12), vals = [];
      for (let t = on + Math.round(sr * 0.08); t + M < d.length - Math.round(sr * 0.15); t += Math.round(sr * 0.05)) {
        const v = d.subarray(t, t + M);
        const mag = hz => {
          const k = 2 * Math.PI * hz / sr, c = 2 * Math.cos(k); let s1 = 0, s2 = 0;
          for (let i = 0; i < M; i++) { const s0 = v[i] + c * s1 - s2; s2 = s1; s1 = s0; }
          return Math.sqrt(Math.abs(s1 * s1 + s2 * s2 - c * s1 * s2)) / M;
        };
        let num = 0, den = 0;
        for (let hz = 100; hz <= 12000; hz += 100) { const m = mag(hz); num += hz * m; den += m; }
        vals.push(num / (den || 1));
      }
      out[f] = vals.length ? vals.reduce((a, x) => a + x, 0) / vals.length : 0;
    }
    return out;
  }, { pool: POOL, archivos });

  await browser.close();

  // Tendencia local: mediana de las vecinas (sin contarse a si misma).
  const mediana = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
  const valor = n => cen[sel[n]] || 0;
  const tendencia = i => {
    const v = [];
    for (let j = Math.max(0, i - 3); j <= Math.min(notas.length - 1, i + 3); j++) if (j !== i) v.push(valor(notas[j]));
    return mediana(v);
  };

  console.log(`\n  ${instrumento} · ${notas.length} notas · umbral ${UMBRAL} Hz\n`);
  let cambios = 0;
  notas.forEach((n, i) => {
    const t = tendencia(i), d = valor(n) - t;
    if (Math.abs(d) <= UMBRAL) return;

    // Buscar entre las vecinas la que mas se acerque a la tendencia.
    const midi = midiDe(n);
    let mejor = null;
    for (let s = -SALTO; s <= SALTO; s++) {
      if (!s) continue;
      const vecina = notas.find(x => midiDe(x) === midi + s);
      if (!vecina) continue;
      const cand = sel[vecina];
      const dc = Math.abs((cen[cand] || 0) - t);
      if (mejor === null || dc < mejor.d) mejor = { archivo: cand, d: dc, salto: s };
    }
    if (!mejor || mejor.d >= Math.abs(d)) {
      console.log(`  ${n.padEnd(5)} ${valor(n).toFixed(0).padStart(5)} Hz vs ${t.toFixed(0)} Hz de sus vecinas (${d > 0 ? '+' : ''}${d.toFixed(0)})  — no hay recambio mejor`);
      return;
    }
    console.log(`  ${n.padEnd(5)} ${valor(n).toFixed(0).padStart(5)} Hz vs ${t.toFixed(0)} Hz de sus vecinas (${d > 0 ? '+' : ''}${d.toFixed(0)})  ->  ${mejor.archivo} (${mejor.salto > 0 ? '+' : ''}${mejor.salto} semitono${Math.abs(mejor.salto) > 1 ? 's' : ''})`);
    sel[n] = mejor.archivo;
    cambios++;
  });

  console.log('\n  ' + (cambios ? `${cambios} nota(s) sustituidas` : 'ninguna nota se sale del umbral'));
  if (cambios && !dry) { fs.writeFileSync(selPath, JSON.stringify(sel, null, 2)); console.log('  ✓ seleccion.json actualizado'); }
  if (dry) console.log('\n  (--dry: no se ha escrito nada)');
})().catch(e => { console.error(e); process.exit(1); });
