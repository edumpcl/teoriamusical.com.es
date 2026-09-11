'use strict';
/**
 * Monta la carpeta de muestras de un instrumento a partir de la seleccion que
 * deja tools/elegir-muestras-philharmonia.js.
 *
 *   npm install lamejs            (package.json no va en git: hay que instalarlo)
 *   node tools/serve.js                                          (otra terminal)
 *   node tools/elegir-muestras-philharmonia.js trompeta --transposicion=-2 ...
 *   node tools/construir-muestras-audio.js trompeta --transposicion=-2 --dry
 *
 * De cada toma elegida saca una muestra lista para la web, y las cuatro cosas
 * que la hacen "de la misma familia" se hacen aqui:
 *
 *   1. AFINAR. Se mide la frecuencia real y se remuestrea para que caiga en la
 *      nota exacta. Esto mismo cubre el salto de semitono cuando la toma viene
 *      de una nota vecina: es una unica operacion, no dos.
 *   2. RECORTAR. Todas duran lo mismo y entran igual de rapido.
 *   3. CERRAR. Fundido al final, porque la toma sigue sonando donde se corta.
 *   4. IGUALAR EL NIVEL. Mismo RMS, o una sonaria mas fuerte que otra.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const lamejs = (() => {          // lamejs 1.2.1 no exporta por require(); ver recortar-muestra-audio.js
  const caja = { console };
  vm.createContext(caja);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../node_modules/lamejs/lame.min.js'), 'utf8'), caja);
  return caja.lamejs;
})();

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const POOL = 'assets/audio/.pool';
const SR = 44100, KBPS = 64;
const ENTRADA = 0.03;      // silencio antes del ataque: lo justo para no comerse el golpe de lengua
const FUNDIDO = 0.20;

const instrumento = process.argv[2];
if (!instrumento) { console.log('Uso: node tools/construir-muestras-audio.js <instrumento> [--transposicion=N] [--duracion=1.2] [--dry]'); process.exit(1); }
const argN = (n, d) => { const a = process.argv.find(x => x.startsWith('--' + n + '=')); return a ? Number(a.split('=')[1]) : d; };
const TRANS = argN('transposicion', 0);
const DURACION = argN('duracion', 1.2);
const RMS = argN('rms', 0.10);
const dry = process.argv.includes('--dry');

const DIR = path.join(ROOT, 'assets/audio', instrumento);
const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const midiDe = n => { const m = /^([A-G])(s?)(\d)$/.exec(n); return m ? SEMIS[m[1]] + (m[2] ? 1 : 0) + (+m[3] + 1) * 12 : null; };
const freqDe = midi => 440 * Math.pow(2, (midi - 69) / 12);

(async () => {
  const sel = JSON.parse(fs.readFileSync(path.join(ROOT, POOL, 'seleccion.json'), 'utf8'));
  const notas = Object.keys(sel).sort((a, b) => midiDe(a) - midiDe(b));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  console.log(`\n  ${instrumento} · ${notas.length} muestras · ${DURACION}s cada una\n`);
  console.log('  nota   origen                                afinación   pico');
  console.log('  ' + '-'.repeat(66));

  let fallos = 0;
  for (const nota of notas) {
    const objetivo = freqDe(midiDe(nota) + TRANS);
    const r = await page.evaluate(async ({ pool, archivo, objetivo, sr, duracion, entrada, fundido, rmsDiana }) => {
      const ctx0 = new OfflineAudioContext(1, sr, sr);
      const buf = await ctx0.decodeAudioData(await (await fetch(`/${pool}/${archivo}`)).arrayBuffer());
      const d0 = buf.getChannelData(0);

      // --- 1. medir la frecuencia real de la toma ---
      /* La busqueda va ANCLADA a la nota que toca (+-250 cents, que cubre de
         sobra el salto de semitono de una toma vecina). Dejando buscar libre, en
         las notas con la fundamental debil la autocorrelacion se engancha a un
         subarmonico y la muestra se construiria una octava baja. */
      const medirF0 = (d, desde) => {
        const grueso = objetivo;
        const M = Math.min(Math.round(sr * 0.4), d.length - desde);
        const v = d.subarray(desde, desde + M);
        const energia = hz => {
          const k = 2 * Math.PI * hz / sr, c = 2 * Math.cos(k); let s1 = 0, s2 = 0;
          for (let i = 0; i < M; i++) { const s0 = v[i] + c * s1 - s2; s2 = s1; s1 = s0; }
          return Math.sqrt(Math.abs(s1 * s1 + s2 * s2 - c * s1 * s2));
        };
        let best = -1, f0 = grueso;
        for (let c2 = -250; c2 <= 250; c2++) {
          const f = grueso * Math.pow(2, c2 / 1200);
          let suma = 0;
          for (let k = 1; k <= 8 && k * f < sr / 2; k++) suma += energia(k * f);
          if (suma > best) { best = suma; f0 = f; }
        }
        return f0;
      };
      let pico0 = 0; for (let i = 0; i < d0.length; i++) pico0 = Math.max(pico0, Math.abs(d0[i]));
      let on0 = 0; while (on0 < d0.length && Math.abs(d0[on0]) < pico0 * 0.02) on0++;
      const f0 = medirF0(d0, Math.min(on0 + Math.round(sr * 0.15), d0.length - Math.round(sr * 0.2)));
      if (!f0) return { error: 'no se puede medir la altura' };

      /* --- 2. remuestrear: afina Y aplica el salto de semitono de una vez --- */
      const rate = f0 / objetivo;            // >1 = suena mas agudo de lo que toca: hay que ir mas lento
      const ctx = new OfflineAudioContext(1, Math.ceil(buf.length / rate) + sr * 0.05, sr);
      const src = ctx.createBufferSource();
      src.buffer = buf; src.playbackRate.value = 1 / rate;
      src.connect(ctx.destination); src.start();
      const y = (await ctx.startRendering()).getChannelData(0);

      // --- 3. recortar a la misma longitud, con la misma entrada ---
      let pico = 0; for (let i = 0; i < y.length; i++) pico = Math.max(pico, Math.abs(y[i]));
      let on = 0; while (on < y.length && Math.abs(y[on]) < pico * 0.02) on++;
      const nEnt = Math.round(entrada * sr), nSon = Math.round(duracion * sr);
      if (y.length - on < nSon) return { error: 'la toma se queda corta tras remuestrear' };
      const out = new Float32Array(nEnt + nSon);
      for (let i = 0; i < nSon; i++) out[nEnt + i] = y[on + i];

      // --- 4. fundido de cierre ---
      const nF = Math.min(Math.round(fundido * sr), nSon);
      for (let i = 0; i < nF; i++) { const k = (nF - i) / nF; out[out.length - nF + i] *= k * k; }

      // --- 5. mismo nivel ---
      let s = 0; for (let i = 0; i < out.length; i++) s += out[i] * out[i];
      const g = rmsDiana / Math.sqrt(s / out.length);
      let picoFin = 0;
      const pcm = new Int16Array(out.length);
      for (let i = 0; i < out.length; i++) {
        const v = out[i] * g;
        picoFin = Math.max(picoFin, Math.abs(v));
        pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
      }
      const f0fin = medirF0(out, Math.round(entrada * sr) + Math.round(sr * 0.15));
      let bin = '';
      const bytes = new Uint8Array(pcm.buffer);
      for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
      return { b64: btoa(bin), pico: picoFin, cents: 1200 * Math.log2(f0fin / objetivo), dur: out.length / sr };
    }, { pool: POOL, archivo: sel[nota], objetivo, sr: SR, duracion: DURACION, entrada: ENTRADA, fundido: FUNDIDO, rmsDiana: RMS });

    if (r.error) { console.log(`  ${nota.padEnd(5)}  ${sel[nota].padEnd(38)} ! ${r.error}`); fallos++; continue; }
    const avisos = [];
    if (Math.abs(r.cents) > 5) avisos.push(`afinación ${r.cents.toFixed(0)}c`);
    if (r.pico >= 0.999) avisos.push('SATURA');
    console.log(`  ${nota.padEnd(5)}  ${sel[nota].replace(/^[a-z-]+_/, '').replace('.mp3', '').padEnd(36)} ${(r.cents >= 0 ? '+' : '') + r.cents.toFixed(0)}c`.padEnd(58)
      + `${r.pico.toFixed(2)}${avisos.length ? '   <-- ' + avisos.join(', ') : ''}`);
    if (r.pico >= 0.999) { fallos++; continue; }

    if (!dry) {
      const pcm = new Int16Array(Buffer.from(r.b64, 'base64').buffer);
      const enc = new lamejs.Mp3Encoder(1, SR, KBPS);
      const trozos = [];
      for (let i = 0; i < pcm.length; i += 1152) {
        const b = enc.encodeBuffer(pcm.subarray(i, Math.min(i + 1152, pcm.length)));
        if (b.length) trozos.push(Buffer.from(b));
      }
      const cola = enc.flush();
      if (cola.length) trozos.push(Buffer.from(cola));
      fs.writeFileSync(path.join(DIR, nota + '.mp3'), Buffer.concat(trozos));
    }
  }

  await browser.close();
  console.log('  ' + '-'.repeat(66));
  console.log(`  ${notas.length - fallos} muestra(s) montadas` + (fallos ? `, ${fallos} con problemas` : '') + (dry ? '\n\n  (--dry: no se ha escrito nada)' : ''));
  if (!dry) console.log(`\n  Comprueba: node tools/verificar-audio-notas.js ${instrumento}` + (TRANS ? ` --transposicion=${TRANS}` : ''));
})().catch(e => { console.error(e); process.exit(1); });
