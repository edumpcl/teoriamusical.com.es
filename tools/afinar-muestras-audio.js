'use strict';
/**
 * Corrige la afinacion de las muestras de un instrumento.
 *
 *   npm install lamejs            (package.json no va en git: hay que instalarlo)
 *   node tools/serve.js                                          (otra terminal)
 *   node tools/afinar-muestras-audio.js trompeta --transposicion=-2 --dry
 *   node tools/afinar-muestras-audio.js trompeta --transposicion=-2
 *
 * Mide la frecuencia real de cada archivo y lo remuestrea lo justo para que
 * quede en la nota que dice su nombre (temperamento igual, La4 = 440). Un
 * desvio de 37 cents se corrige con un factor de 1,02: la duracion cambia un 2%,
 * que no se nota, y el timbre queda intacto.
 *
 * Solo toca lo que se sale de --umbral cents; lo que ya esta bien no se vuelve a
 * codificar, para no gastar una generacion de MP3 sin motivo.
 *
 * SEGURIDAD: si la medida se aleja mas de 100 cents de lo esperado, el archivo
 * se DEJA como esta y se avisa. Un error de octava del detector aplicado a
 * ciegas destrozaria la muestra, y ese caso hay que mirarlo a mano.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

/* lamejs 1.2.1 esta roto por require(); el bundle funciona pero se instala en
   el global, asi que se ejecuta en un contexto aparte. */
const lamejs = (() => {
  const caja = { console };
  vm.createContext(caja);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../node_modules/lamejs/lame.min.js'), 'utf8'), caja);
  return caja.lamejs;
})();

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const SR = 44100;
const KBPS = 64;

const instrumento = process.argv[2];
if (!instrumento) { console.log('Uso: node tools/afinar-muestras-audio.js <instrumento> [--transposicion=N] [--umbral=5] [--dry]'); process.exit(1); }
const arg = (n, d) => { const a = process.argv.find(x => x.startsWith('--' + n + '=')); return a ? Number(a.split('=')[1]) : d; };
const TRANS = arg('transposicion', 0);
const UMBRAL = arg('umbral', 5);
const dry = process.argv.includes('--dry');

const DIR = path.join(ROOT, 'assets/audio', instrumento);
const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function midiDe(nombre) {
  const m = /^([A-G])(s?)(\d)$/.exec(nombre);
  return m ? SEMIS[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12 : null;
}
const freqDe = midi => 440 * Math.pow(2, (midi - 69) / 12);

/* El medidor es el mismo que el de tools/verificar-audio-notas.js: primero
   autocorrelacion para situarse y despues suma de armonicos para afinar la
   lectura al cent. Va como texto porque se ejecuta dentro del navegador. */
const MEDIDOR = `
  function medirF0(d, sr) {
    var ini = Math.floor(d.length * 0.30);
    var N = Math.min(Math.floor(sr * 0.15), d.length - ini);
    var w = d.subarray(ini, ini + N);
    var mejor = 0, mejorLag = -1;
    var lagMin = Math.floor(sr / 1400), lagMax = Math.ceil(sr / 70);
    var e0 = 0; for (var i = 0; i < N; i++) e0 += w[i] * w[i];
    for (var lag = lagMin; lag <= lagMax && lag < N; lag++) {
      var s = 0, e1 = 0;
      for (var j = 0; j + lag < N; j++) { s += w[j] * w[j + lag]; e1 += w[j + lag] * w[j + lag]; }
      var r = s / Math.sqrt(e0 * e1 + 1e-12);
      if (r > mejor) { mejor = r; mejorLag = lag; }
    }
    if (mejorLag <= 0) return 0;
    var grueso = sr / mejorLag;
    var M = Math.min(Math.floor(sr * 0.5), d.length - ini);
    var v = d.subarray(ini, ini + M);
    function energia(hz) {
      var k = 2 * Math.PI * hz / sr, c = 2 * Math.cos(k), s1 = 0, s2 = 0;
      for (var i = 0; i < M; i++) { var s0 = v[i] + c * s1 - s2; s2 = s1; s1 = s0; }
      return Math.sqrt(Math.abs(s1 * s1 + s2 * s2 - c * s1 * s2));
    }
    var best = -1, f0 = grueso;
    for (var c2 = -80; c2 <= 80; c2++) {
      var f = grueso * Math.pow(2, c2 / 1200), suma = 0;
      for (var k2 = 1; k2 <= 8 && k2 * f < sr / 2; k2++) suma += energia(k2 * f);
      if (suma > best) { best = suma; f0 = f; }
    }
    return f0;
  }
  function rmsDe(d) { var s = 0; for (var i = 0; i < d.length; i++) s += d[i] * d[i]; return Math.sqrt(s / d.length); }
`;

(async () => {
  const archivos = fs.readdirSync(DIR).filter(f => f.endsWith('.mp3')).sort();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.addScriptTag({ content: MEDIDOR });

  // Primera pasada: medir todo y decidir el nivel de referencia de la carpeta.
  const medidas = await page.evaluate(async ({ base, instrumento, archivos, sr }) => {
    const ctx = new OfflineAudioContext(1, sr, sr);
    const out = [];
    for (const f of archivos) {
      const buf = await ctx.decodeAudioData(await (await fetch(`${base}/assets/audio/${instrumento}/${f}`)).arrayBuffer());
      const d = buf.getChannelData(0);
      out.push({ f, f0: medirF0(d, sr), rms: rmsDe(d), dur: buf.duration });
    }
    return out;
  }, { base: BASE, instrumento, archivos, sr: SR });

  const rmsRef = medidas.map(m => m.rms).sort((a, b) => a - b)[Math.floor(medidas.length / 2)];

  const plan = medidas.map(m => {
    const objetivo = freqDe(midiDe(m.f.replace('.mp3', '')) + TRANS);
    const cents = 1200 * Math.log2(m.f0 / objetivo);
    return { ...m, objetivo, cents };
  });

  console.log(`\n  ${instrumento} · ${archivos.length} muestras · umbral ${UMBRAL} cents` + (TRANS ? ` · transposición ${TRANS}` : ''));
  console.log('  ' + '-'.repeat(58));

  let corregidas = 0, saltadas = 0, sospechosas = 0;
  for (const p of plan) {
    const nota = p.f.replace('.mp3', '');
    if (Math.abs(p.cents) > 100) {
      console.log(`  ${nota.padEnd(5)} ${p.cents.toFixed(0).padStart(6)} c   NO SE TOCA: medida dudosa, míralo a mano`);
      sospechosas++;
      continue;
    }
    if (Math.abs(p.cents) <= UMBRAL) { saltadas++; continue; }

    /* Remuestreo: playbackRate>1 acelera y SUBE la nota. Como aqui casi todo
       viene alto, el factor es objetivo/medida (<1: mas lento y mas grave).
       Al reves multiplica el error en vez de corregirlo. */
    const rate = p.objetivo / p.f0;
    const r = await page.evaluate(async ({ base, instrumento, f, sr, rate, rmsRef }) => {
      const medir = new OfflineAudioContext(1, sr, sr);
      const buf = await medir.decodeAudioData(await (await fetch(`${base}/assets/audio/${instrumento}/${f}`)).arrayBuffer());
      const ctx = new OfflineAudioContext(1, Math.ceil(buf.length / rate) + sr * 0.05, sr);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = rate;   // el remuestreo lo hace el propio navegador
      src.connect(ctx.destination);
      src.start();
      const salida = (await ctx.startRendering()).getChannelData(0);

      // Se recorta la cola de silencio que deja el margen del render.
      let fin = salida.length - 1;
      let pico = 0; for (let i = 0; i < salida.length; i++) pico = Math.max(pico, Math.abs(salida[i]));
      while (fin > 0 && Math.abs(salida[fin]) < pico * 0.0005) fin--;
      const util = salida.subarray(0, Math.min(salida.length, fin + Math.round(sr * 0.01)));

      const g = rmsRef / rmsDe(util);          // mismo nivel que el resto de la carpeta
      const pcm = new Int16Array(util.length);
      let picoFinal = 0;
      for (let i = 0; i < util.length; i++) {
        const v = util[i] * g;
        picoFinal = Math.max(picoFinal, Math.abs(v));
        pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
      }
      let bin = '';
      const bytes = new Uint8Array(pcm.buffer);
      for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
      return { b64: btoa(bin), pico: picoFinal, dur: util.length / sr, f0: medirF0(util, sr) };
    }, { base: BASE, instrumento, f: p.f, sr: SR, rate, rmsRef });

    const centsDespues = 1200 * Math.log2(r.f0 / p.objetivo);
    const aviso = r.pico >= 0.999 ? '  SATURA' : (Math.abs(centsDespues) > UMBRAL ? '  no ha cuadrado' : '');
    console.log(`  ${nota.padEnd(5)} ${p.cents.toFixed(0).padStart(6)} c  ->  ${centsDespues.toFixed(0).padStart(4)} c   ${p.dur.toFixed(2)}s -> ${r.dur.toFixed(2)}s${aviso}`);
    if (r.pico >= 0.999) { console.log('  ! saturaría; se deja como estaba'); continue; }

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
      fs.writeFileSync(path.join(DIR, p.f), Buffer.concat(trozos));
    }
    corregidas++;
  }

  await browser.close();
  console.log('  ' + '-'.repeat(58));
  console.log(`  ${corregidas} corregida(s) · ${saltadas} ya estaban dentro de ${UMBRAL} cents` +
    (sospechosas ? ` · ${sospechosas} sin tocar por medida dudosa` : '') + (dry ? '\n\n  (--dry: no se ha escrito nada)' : ''));
  if (!dry && corregidas) console.log(`\n  Comprueba: node tools/verificar-audio-notas.js ${instrumento}` + (TRANS ? ` --transposicion=${TRANS}` : ''));
})().catch(e => { console.error(e); process.exit(1); });
