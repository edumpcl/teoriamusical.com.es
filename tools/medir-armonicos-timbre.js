'use strict';
/**
 * Mide los armónicos de la MISMA nota (La₄ = 440 Hz) en las muestras de cinco instrumentos, para la demostración del
 * timbre de /diccionario-musical/cualidades-del-sonido/ (assets/js/timbre-engine.js).
 *
 *   node tools/serve.js                                    (otra terminal, puerto 8099)
 *   node tools/medir-armonicos-timbre.js                   # mide y escribe assets/js/timbre-datos.js
 *   node tools/medir-armonicos-timbre.js --solo-ver        # mide y lo enseña, sin escribir
 *
 * Los archivos de un instrumento transpositor van nombrados por la nota ESCRITA: el clarinete y la trompeta en Si♭
 * suenan un tono por debajo, así que el La₄ que suena sale del Si₄ escrito (B4.mp3).
 *
 * MEDICIÓN: se decodifica cada muestra en Chromium (el decodificador que usa el visitante), se toma un trozo de 0,6 s
 * desde 0,2 s después del ataque (la parte sostenida), se aplica ventana de Hann y una FFT de 32768 puntos. Para cada
 * armónico k = 1..12 se busca el máximo del espectro en ±2 % alrededor de k·f0 (el piano tiene una ligera inarmonicidad)
 * y se guarda su amplitud, normalizada a la del armónico más fuerte. También se mide la frecuencia real del
 * fundamental, para comprobar que la muestra es de verdad un La₄.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const NARM = 12, F0 = 440;
/* id, nombre, archivo (según el nombre del fichero), nota que SUENA en el archivo = La4 */
const INSTRUMENTOS = [
  { id: 'piano', nombre: 'Piano', ruta: '/assets/audio/piano/A4.ogg' },
  { id: 'flauta', nombre: 'Flauta', ruta: '/assets/audio/flauta/A4.mp3' },
  { id: 'oboe', nombre: 'Oboe', ruta: '/assets/audio/oboe/A4.mp3' },
  { id: 'clarinete', nombre: 'Clarinete en Si♭', ruta: '/assets/audio/clarinete/B4.mp3' },   // escrito Si4 = suena La4
  { id: 'trompeta', nombre: 'Trompeta en Si♭', ruta: '/assets/audio/trompeta/B4.mp3' },    // escrito Si4 = suena La4
];

/* Se ejecuta DENTRO del navegador. */
async function medir({ ruta, narm, f0 }) {
  const ctx = new OfflineAudioContext(1, 48000, 48000);
  const buf = await ctx.decodeAudioData(await (await fetch(ruta)).arrayBuffer());
  const sr = buf.sampleRate, d = buf.getChannelData(0);
  let pico = 0; for (let i = 0; i < d.length; i++) pico = Math.max(pico, Math.abs(d[i]));
  let on = 0; while (on < d.length && Math.abs(d[on]) < pico * 0.05) on++;
  const ini = on + Math.round(0.2 * sr), largo = Math.round(0.6 * sr);
  if (ini + largo > d.length) return { error: 'muestra demasiado corta: ' + (d.length / sr).toFixed(2) + ' s' };
  const N = 32768;
  const re = new Float64Array(N), im = new Float64Array(N);
  for (let i = 0; i < Math.min(largo, N); i++) re[i] = d[ini + i] * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / (Math.min(largo, N) - 1)));
  // FFT radix-2 iterativa
  for (let i = 1, j = 0; i < N; i++) { let bit = N >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; } }
  for (let len = 2; len <= N; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < N; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = i + k + len / 2;
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr;
      }
    }
  }
  const mag = new Float64Array(N / 2);
  for (let i = 0; i < N / 2; i++) mag[i] = Math.hypot(re[i], im[i]);
  const bin = (f) => Math.round(f * N / sr);
  const picos = [];
  for (let k = 1; k <= narm; k++) {
    const lo = bin(k * f0 * 0.98), hi = bin(k * f0 * 1.02);
    let m = 0, mi = lo; for (let i = lo; i <= hi; i++) if (mag[i] > m) { m = mag[i]; mi = i; }
    picos.push({ k, amp: m, f: mi * sr / N });
  }
  return { picos, sr, duracion: d.length / sr };
}

(async () => {
  const soloVer = process.argv.includes('--solo-ver');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const salida = {};
  console.log('\n  instrumento           fundamental   armónicos 1..12 (normalizados al mayor)                      impares/pares');
  for (const ins of INSTRUMENTOS) {
    const r = await page.evaluate(medir, { ruta: ins.ruta, narm: NARM, f0: F0 });
    if (r.error) throw new Error(ins.id + ': ' + r.error);
    const max = Math.max(...r.picos.map((p) => p.amp));
    const norm = r.picos.map((p) => Number((p.amp / max).toFixed(3)));
    const fund = r.picos[0].f;
    const cents = 1200 * Math.log2(fund / F0);
    if (Math.abs(cents) > 25) throw new Error(`${ins.id}: el fundamental mide ${fund.toFixed(1)} Hz (${cents.toFixed(0)} cents) y tenía que ser un La4`);
    const imp = [0, 2, 4, 6, 8, 10].reduce((s, i) => s + r.picos[i].amp ** 2, 0);
    const par = [1, 3, 5, 7, 9, 11].reduce((s, i) => s + r.picos[i].amp ** 2, 0);
    salida[ins.id] = { nombre: ins.nombre, ruta: ins.ruta, armonicos: norm, fundamentalHz: Number(fund.toFixed(1)), imparesSobrePares: Number((imp / par).toFixed(2)) };
    console.log(`  ${ins.nombre.padEnd(20)} ${fund.toFixed(1).padStart(7)} Hz   ${norm.map((v) => v.toFixed(2)).join(' ')}   ${(imp / par).toFixed(1)}`);
  }
  await browser.close();
  if (soloVer) return;
  const js = `/* GENERADO por tools/medir-armonicos-timbre.js: no editar a mano.
   Armónicos 1 a ${NARM} del La₄ (440 Hz) medidos en nuestras muestras, normalizados al armónico más fuerte de cada una.
   «imparesSobrePares» = energía de los armónicos impares entre la de los pares. */
window.tmTimbreDatos = ${JSON.stringify({ nota: 'La₄', f0: F0, armonicos: NARM, instrumentos: salida }, null, 2)};
`;
  fs.writeFileSync(path.join(ROOT, 'assets/js/timbre-datos.js'), js);
  console.log('\n  escrito assets/js/timbre-datos.js');
})().catch((e) => { console.error(e); process.exit(1); });
