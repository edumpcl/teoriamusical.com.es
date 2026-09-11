'use strict';
/**
 * Recorta una muestra suelta para que encaje con las demas de su carpeta.
 *
 *   npm install lamejs            (package.json no va en git: hay que instalarlo)
 *   node tools/serve.js                                   (en otra terminal)
 *   node tools/recortar-muestra-audio.js trompeta Gs5     -> escribe el MP3
 *   node tools/recortar-muestra-audio.js trompeta Gs5 --dry
 *
 * Nace de un caso real: trompeta/Gs5.mp3 venia sin recortar de la libreria y
 * duraba 34 segundos, asi que al pulsar Sol#5 la nota no paraba. Lo detecta
 * tools/verificar-audio-notas.js.
 *
 * El formato de salida NO se elige a mano: se mide en las demas muestras de la
 * misma carpeta (silencio de entrada, duracion y nivel medianos) y se copia, que
 * es lo que hace que todas las notas del diagrama suenen igual de fuerte y
 * respondan igual de rapido.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

/* El paquete lamejs 1.2.1 esta roto por require() ("MPEGMode is not defined"):
   su index.js no declara los globales que usa. El bundle lame.min.js si
   funciona, pero se instala en el global en vez de exportarse, asi que se
   ejecuta en un contexto aparte y se recoge de ahi. */
const lamejs = (() => {
  const caja = { console };
  vm.createContext(caja);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../node_modules/lamejs/lame.min.js'), 'utf8'), caja);
  return caja.lamejs;
})();

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const SR = 44100;        // los MP3 de la web son 44,1 kHz mono
const KBPS = 64;         // la media real de las muestras de la web, no los 128 de una trama suelta
const FUNDIDO = 0.25;      // segundos de cierre; sin el, el corte hace "clic"

const instrumento = process.argv[2];
const objetivo = process.argv[3];
const dry = process.argv.includes('--dry');
if (!instrumento || !objetivo) {
  console.log('Uso: node tools/recortar-muestra-audio.js <instrumento> <nota>   (p. ej. trompeta Gs5)');
  process.exit(1);
}

const DIR = path.join(ROOT, 'assets/audio', instrumento);
const NOMBRE = objetivo.replace(/\.mp3$/, '') + '.mp3';

(async () => {
  const archivos = fs.readdirSync(DIR).filter(f => f.endsWith('.mp3')).sort();
  if (!archivos.includes(NOMBRE)) { console.log('  ! no existe ' + NOMBRE); process.exit(1); }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  /* Todo el trabajo con audio se hace dentro del navegador y solo vuelve el
     recorte ya hecho: el original son 1,5 millones de muestras y pasarlas por
     el puente de Playwright seria absurdo. */
  const r = await page.evaluate(async ({ base, instrumento, archivos, nombre, sr, fundido }) => {
    const ctx = new OfflineAudioContext(1, sr, sr);
    const cargar = async f =>
      (await ctx.decodeAudioData(await (await fetch(`${base}/assets/audio/${instrumento}/${f}`)).arrayBuffer())).getChannelData(0);

    const medir = d => {
      let pico = 0, suma = 0;
      for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > pico) pico = a; suma += d[i] * d[i]; }
      let ini = 0; while (ini < d.length && Math.abs(d[ini]) < pico * 0.02) ini++;
      return { pico, rms: Math.sqrt(suma / d.length), entrada: ini / sr, dur: d.length / sr };
    };
    const mediana = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];

    // Patron: como son las OTRAS muestras de la carpeta.
    const otras = [];
    for (const f of archivos) if (f !== nombre) otras.push(medir(await cargar(f)));
    const patron = {
      entrada: mediana(otras.map(o => o.entrada)),
      dur: mediana(otras.map(o => o.dur)),
      rms: mediana(otras.map(o => o.rms)),
    };

    const d = await cargar(nombre);
    const antes = medir(d);

    const nEntrada = Math.round(patron.entrada * sr);
    const total = Math.round(patron.dur * sr);
    const nSonido = total - nEntrada;
    const desde = Math.max(0, Math.round(antes.entrada * sr));

    const out = new Float32Array(total);            // arranca en silencio, como las demas
    for (let i = 0; i < nSonido && desde + i < d.length; i++) out[nEntrada + i] = d[desde + i];

    // Cierre progresivo: la nota original sigue sonando en el punto de corte.
    const nF = Math.min(Math.round(fundido * sr), nSonido);
    for (let i = 0; i < nF; i++) {
      const k = (nF - i) / nF;
      out[total - nF + i] *= k * k;                 // curva cuadratica: mas natural que la recta
    }

    // Mismo nivel que el resto de la carpeta.
    let s = 0; for (let i = 0; i < out.length; i++) s += out[i] * out[i];
    const rms = Math.sqrt(s / out.length);
    const g = rms > 0 ? patron.rms / rms : 1;
    let pico = 0;
    for (let i = 0; i < out.length; i++) { out[i] *= g; pico = Math.max(pico, Math.abs(out[i])); }

    // A entero de 16 bits para el codificador, en base64 (el puente no pasa binario).
    const pcm = new Int16Array(out.length);
    for (let i = 0; i < out.length; i++) pcm[i] = Math.max(-32768, Math.min(32767, Math.round(out[i] * 32767)));
    let bin = '';
    const bytes = new Uint8Array(pcm.buffer);
    for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
    return { patron, antes, pico, b64: btoa(bin) };
  }, { base: BASE, instrumento, archivos, nombre: NOMBRE, sr: SR, fundido: FUNDIDO });

  await browser.close();

  const pcm = new Int16Array(Buffer.from(r.b64, 'base64').buffer);
  const enc = new lamejs.Mp3Encoder(1, SR, KBPS);
  const trozos = [];
  for (let i = 0; i < pcm.length; i += 1152) {
    const b = enc.encodeBuffer(pcm.subarray(i, Math.min(i + 1152, pcm.length)));
    if (b.length) trozos.push(Buffer.from(b));
  }
  const fin = enc.flush();
  if (fin.length) trozos.push(Buffer.from(fin));
  const mp3 = Buffer.concat(trozos);

  const destino = path.join(DIR, NOMBRE);
  console.log(`\n  ${instrumento}/${NOMBRE}`);
  console.log(`    antes:   ${r.antes.dur.toFixed(2)}s · entra a ${(r.antes.entrada * 1000).toFixed(0)} ms · ${(fs.statSync(destino).size / 1024).toFixed(0)} KB`);
  console.log(`    patron:  ${r.patron.dur.toFixed(2)}s · entra a ${(r.patron.entrada * 1000).toFixed(0)} ms · RMS ${r.patron.rms.toFixed(3)}`);
  console.log(`    despues: ${(pcm.length / SR).toFixed(2)}s · pico ${r.pico.toFixed(2)} · ${(mp3.length / 1024).toFixed(0)} KB`);

  if (r.pico >= 0.999) { console.log('  ! el recorte satura; revisa el nivel'); process.exit(1); }
  if (dry) { console.log('\n  (--dry: no se ha escrito nada)'); return; }
  fs.writeFileSync(destino, mp3);
  console.log('\n  ✓ escrito. Comprueba con: node tools/verificar-audio-notas.js ' + instrumento);
})().catch(e => { console.error(e); process.exit(1); });
