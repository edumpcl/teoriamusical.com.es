'use strict';
/**
 * Comprueba que las muestras de audio de un instrumento suenan lo que dice su
 * nombre de archivo.
 *
 *   node tools/serve.js                              (en otra terminal)
 *   node tools/verificar-audio-notas.js trompeta
 *
 * Decodifica cada MP3 en Chromium —el mismo decodificador que usa el navegador
 * del visitante— y mide tres cosas: duracion, nivel (RMS) y frecuencia
 * fundamental por autocorrelacion. Despues compara la fundamental con la que
 * corresponde al nombre del archivo y avisa si se desvia mas de medio tono.
 *
 * Se mide el sonido de verdad y no se da por bueno el nombre del archivo: un
 * sample mal etiquetado suena perfectamente, solo que no es la nota que toca.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const instrumento = process.argv[2] || 'trompeta';
const DIR = path.join(ROOT, 'assets/audio', instrumento);

/* Los archivos de un instrumento transpositor van nombrados por la nota
   ESCRITA, que es como los pide el motor de digitaciones, pero suenan otra
   cosa: la trompeta en Si♭ suena un tono por debajo. Sin decirselo, el
   verificador daria por desafinada toda la carpeta.
   --transposicion=-2  ->  suena 2 semitonos por debajo de lo que dice el nombre */
const argTrans = process.argv.find(a => a.startsWith('--transposicion='));
const TRANS = argTrans ? Number(argTrans.split('=')[1]) : 0;

const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/* "As3" -> La#3 -> MIDI 58. La s del nombre es sostenido. */
function midiDe(nombre) {
  const m = /^([A-G])(s?)(\d)$/.exec(nombre);
  if (!m) return null;
  return SEMIS[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
}
const freqDe = midi => 440 * Math.pow(2, (midi - 69) / 12);
const NOMBRES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const nombreDe = midi => NOMBRES[((Math.round(midi) % 12) + 12) % 12] + (Math.floor(Math.round(midi) / 12) - 1);

(async () => {
  if (!fs.existsSync(DIR)) { console.log('No existe ' + path.relative(ROOT, DIR)); process.exit(1); }
  const archivos = fs.readdirSync(DIR).filter(f => f.endsWith('.mp3')).sort();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  const esperadas = {};
  archivos.forEach(f => { esperadas[f] = freqDe(midiDe(f.replace('.mp3', '')) + TRANS); });

  const medidas = await page.evaluate(async ({ base, instrumento, archivos, esperadas }) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const out = [];
    for (const f of archivos) {
      const resp = await fetch(`${base}/assets/audio/${instrumento}/${f}`);
      const buf = await ctx.decodeAudioData(await resp.arrayBuffer());
      const d = buf.getChannelData(0);
      const sr = buf.sampleRate;
      const esperada = esperadas[f];

      let pico = 0, suma = 0;
      for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > pico) pico = a; suma += d[i] * d[i]; }
      const rms = Math.sqrt(suma / d.length);

      /* La fundamental se mide en la parte sostenida, no en el ataque: el
         ataque de un metal es ruido y la autocorrelacion se despista. */
      const ini = Math.floor(d.length * 0.30);
      const N = Math.min(Math.floor(sr * 0.15), d.length - ini);
      const w = d.subarray(ini, ini + N);

      let mejor = 0, mejorLag = -1;
      const lagMin = Math.floor(sr / 1400), lagMax = Math.ceil(sr / 70);
      let e0 = 0; for (let i = 0; i < N; i++) e0 += w[i] * w[i];
      for (let lag = lagMin; lag <= lagMax && lag < N; lag++) {
        let s = 0, e1 = 0;
        for (let i = 0; i + lag < N; i++) { s += w[i] * w[i + lag]; e1 += w[i + lag] * w[i + lag]; }
        const r = s / Math.sqrt(e0 * e1 + 1e-12);
        if (r > mejor) { mejor = r; mejorLag = lag; }
      }
      const grueso = mejorLag > 0 ? sr / mejorLag : 0;

      /* La autocorrelacion sola no basta para juzgar afinacion: con un lag
         entero, a 800 Hz un solo sample son ya 30 cents. Se afina la medida
         probando frecuencias cada cent alrededor y quedandose con la que
         concentra mas energia en sus 8 primeros armonicos (los parciales de un
         metal caen en k*f0, asi que el maximo es nitido). */
      let freq = grueso;
      if (grueso > 0) {
        const M = Math.min(Math.floor(sr * 0.5), d.length - ini);
        const v = d.subarray(ini, ini + M);
        const energiaEn = hz => {  // Goertzel: una sola frecuencia, sin FFT entera
          const k = 2 * Math.PI * hz / sr, c = 2 * Math.cos(k);
          let s1 = 0, s2 = 0;
          for (let i = 0; i < M; i++) { const s0 = v[i] + c * s1 - s2; s2 = s1; s1 = s0; }
          return s1 * s1 + s2 * s2 - c * s1 * s2;
        };
        const puntuar = f0 => {
          let s = 0;
          for (let k = 1; k <= 8 && k * f0 < sr / 2; k++) s += Math.sqrt(energiaEn(k * f0));
          return s;
        };
        /* La medida va ANCLADA a la nota que dice el nombre del archivo: se
           busca solo a +-90 cents de ella. La autocorrelacion sola se engancha a
           un subarmonico cuando la fundamental es debil (hay notas de trompeta
           con casi toda la energia en el 2º y el 4º armonico), y dejarle probar
           multiplos no arregla nada: los armonicos de f/2 incluyen los de f, asi
           que la puntuacion nunca decide la octava. */
        let mejorPuntuacion = -1;
        for (let cents = -90; cents <= 90; cents++) {
          const f0 = esperada * Math.pow(2, cents / 1200);
          const s = puntuar(f0);
          if (s > mejorPuntuacion) { mejorPuntuacion = s; freq = f0; }
        }
        /* Y aparte, la comprobacion de que el archivo contiene la nota que toca:
           si la estimacion libre explica el sonido MUCHO mejor que la esperada,
           es que dentro hay otra nota. Es lo que pillaria un archivo mal puesto. */
        var libre = grueso, mejorLibre = -1;
        for (let cents = -80; cents <= 80; cents++) {
          const f0 = grueso * Math.pow(2, cents / 1200);
          const s = puntuar(f0);
          if (s > mejorLibre) { mejorLibre = s; libre = f0; }
        }
        var sospecha = (mejorPuntuacion < mejorLibre * 0.55) ? libre : 0;
      }
      out.push({ f, dur: buf.duration, sr, rms, pico, freq, conf: mejor, sospecha: typeof sospecha !== 'undefined' ? sospecha : 0 });
    }
    return out;
  }, { base: BASE, instrumento, archivos, esperadas });

  await browser.close();

  console.log(`\n  ${archivos.length} muestras de ${instrumento}\n`);
  console.log('  archivo   dur(s)     sr   RMS   pico    Hz     nota medida   desvío');
  console.log('  ' + '-'.repeat(62));

  const duraciones = medidas.map(m => m.dur).sort((a, b) => a - b);
  const durMediana = duraciones[Math.floor(duraciones.length / 2)];
  const problemas = [];

  medidas.forEach(m => {
    const midiEsperado = midiDe(m.f.replace('.mp3', '')) + TRANS;
    const midiMedido = 69 + 12 * Math.log2(m.freq / 440);
    const cents = Math.round((midiMedido - midiEsperado) * 100);
    const avisos = [];
    if (Math.abs(cents) > 30) avisos.push(`desafinada: ${cents > 0 ? '+' : ''}${cents} cents respecto a ${nombreDe(midiEsperado)}`);
    if (m.sospecha) avisos.push(`parece contener otra nota (${nombreDe(69 + 12 * Math.log2(m.sospecha / 440))}), no ${nombreDe(midiEsperado)}`);
    if (m.dur > durMediana * 2) avisos.push(`dura ${m.dur.toFixed(1)}s (la mediana es ${durMediana.toFixed(1)}s)`);
    if (m.pico >= 0.999) avisos.push('recortado (clipping)');
    if (m.rms < 0.01) avisos.push('practicamente mudo');

    console.log(`  ${m.f.replace('.mp3', '').padEnd(8)} ${m.dur.toFixed(2).padStart(6)} ${String(m.sr).padStart(6)} ${m.rms.toFixed(3).padStart(6)} ${m.pico.toFixed(2).padStart(5)} ${m.freq.toFixed(1).padStart(7)}  ${nombreDe(midiMedido).padEnd(6)} ${(cents >= 0 ? '+' : '') + cents} cents${avisos.length ? '   <-- ' + avisos.join('; ') : ''}`);
    if (avisos.length) problemas.push({ f: m.f, avisos });
  });

  console.log('\n  ' + (problemas.length
    ? problemas.length + ' muestra(s) con problemas:\n' + problemas.map(p => '    ' + p.f + ': ' + p.avisos.join('; ')).join('\n')
    : 'Todas las muestras correctas.'));
  process.exit(problemas.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
