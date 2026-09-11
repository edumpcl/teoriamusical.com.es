'use strict';
/**
 * Elige, para cada nota, la toma de Philharmonia que mejor encaja en timbre con
 * las demas, y deja el juego listo en assets/audio/<instrumento>/.
 *
 *   node tools/serve.js                                        (otra terminal)
 *   node tools/elegir-muestras-philharmonia.js trompeta --transposicion=-2 --dry
 *   node tools/elegir-muestras-philharmonia.js trompeta --transposicion=-2
 *
 * De donde salen las candidatas: descargar Brass.zip / Woodwind.zip... de
 * philharmonia.co.uk/resources/sound-samples/, extraer las de un instrumento y
 * dejarlas en assets/audio/.pool con su nombre original
 * (trumpet_<nota real>_<duracion>_<dinamica>_<articulacion>.mp3).
 *
 * POR QUE ELEGIR Y NO COPIAR UNA DINAMICA ENTERA: la libreria no tiene todas las
 * notas en todas las dinamicas. En la trompeta faltan F#4 y F#5 en forte, y al
 * montar la carpeta se rellenaron con tomas en pianissimo: sonaban a otro
 * instrumento. Ninguna combinacion fija de duracion+dinamica cubre el registro,
 * asi que se mide el timbre de las 375 tomas y se elige nota a nota.
 *
 * El criterio es el CENTROIDE ESPECTRAL (el centro de gravedad del sonido en
 * Hz), que es lo que el oido lee como "mas brillante" o "mas apagado". Se ajusta
 * una recta centroide-vs-nota y se coge la toma mas cercana a ella, penalizando
 * de paso los ataques raros y las tomas demasiado cortas.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const BASE = 'http://localhost:8099';
const POOL = 'assets/audio/.pool';

const instrumento = process.argv[2];
if (!instrumento) { console.log('Uso: node tools/elegir-muestras-philharmonia.js <instrumento> [--transposicion=N] [--dry]'); process.exit(1); }
const argN = (n, d) => { const a = process.argv.find(x => x.startsWith('--' + n + '=')); return a ? Number(a.split('=')[1]) : d; };
const TRANS = argN('transposicion', 0);
const DURACION = argN('duracion', 1.2);   // segundos de sonido que tendra cada nota
const SALTO = argN('salto', 2);           // semitonos que se permite remuestrear una toma vecina
const BRILLO = argN('brillo', 0);         // centroide objetivo en Hz; 0 = el que salga de los datos
const PEAJE = argN('peaje', 350);         // Hz de penalizacion por semitono remuestreado
const DERIVA = argN('deriva', 20);        // cents de recorrido tolerados dentro de la nota
const PDERIVA = argN('pderiva', 40);      // Hz de penalizacion por cent que se pase de ahi
const DERIVAMAX = argN('derivamax', 25);  // cents de recorrido a partir de los cuales la toma se descarta
const dry = process.argv.includes('--dry');

const DIR = path.join(ROOT, 'assets/audio', instrumento);
const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const NOM = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
const midiDe = n => { const m = /^([A-G])(s?)(\d)$/.exec(n); return m ? SEMIS[m[1]] + (m[2] ? 1 : 0) + (+m[3] + 1) * 12 : null; };
const nomDe = k => NOM[((k % 12) + 12) % 12] + (Math.floor(k / 12) - 1);

(async () => {
  const poolDir = path.join(ROOT, POOL);
  if (!fs.existsSync(poolDir)) { console.log('  ! falta ' + POOL + ' (lee la cabecera del script)'); process.exit(1); }
  const candidatas = fs.readdirSync(poolDir).filter(f => f.endsWith('.mp3'));
  // Las notas que hay que cubrir son las de la carpeta actual: el motor de
  // digitaciones pide exactamente esos nombres.
  const objetivo = fs.readdirSync(DIR).filter(f => f.endsWith('.mp3')).map(f => f.replace('.mp3', '')).sort((a, b) => midiDe(a) - midiDe(b));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  /* Medir 375 tomas cuesta un minuto largo y hay que probar varios criterios de
     seleccion, asi que se cachea en disco. --remedir fuerza volver a medir. */
  const CACHE = path.join(poolDir, 'medidas.json');
  let med = null;
  if (fs.existsSync(CACHE) && !process.argv.includes('--remedir')) {
    const c = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
    if (c.n === candidatas.length && c.duracion === DURACION) { med = c.med; console.log(`\n  medidas leídas de la caché (${med.length} tomas)`); }
  }
  if (!med) console.log(`\n  midiendo ${candidatas.length} tomas...`);
  if (!med) med = await page.evaluate(async ({ pool, candidatas, duracion }) => {
    const ctx = new OfflineAudioContext(1, 44100, 44100);
    const out = [];
    for (const f of candidatas) {
      const buf = await ctx.decodeAudioData(await (await fetch(`/${pool}/${f}`)).arrayBuffer());
      const d = buf.getChannelData(0), sr = 44100;
      let pico = 0; for (let i = 0; i < d.length; i++) pico = Math.max(pico, Math.abs(d[i]));
      let on = 0; while (on < d.length && Math.abs(d[on]) < pico * 0.02) on++;

      // Ventana en la parte estable, justo despues del ataque.
      const ini = on + Math.round(sr * 0.12), M = Math.min(Math.round(sr * 0.18), d.length - ini);
      if (M < sr * 0.08) { out.push({ f, corta: true }); continue; }
      const v = d.subarray(ini, ini + M);
      const mag = hz => {
        const k = 2 * Math.PI * hz / sr, c = 2 * Math.cos(k); let s1 = 0, s2 = 0;
        for (let i = 0; i < M; i++) { const s0 = v[i] + c * s1 - s2; s2 = s1; s1 = s0; }
        return Math.sqrt(Math.abs(s1 * s1 + s2 * s2 - c * s1 * s2)) / M;
      };
      let num = 0, den = 0;
      for (let hz = 100; hz <= 12000; hz += 50) { const m = mag(hz); num += hz * m; den += m; }

      // Ataque 10%-90%, para descartar entradas lentisimas o golpes secos.
      const paso = Math.round(sr * 0.01), env = [];
      for (let i = 0; i + paso <= d.length; i += paso) { let s = 0; for (let j = i; j < i + paso; j++) s += d[j] * d[j]; env.push(Math.sqrt(s / paso)); }
      const pk = Math.max(...env);
      const i10 = env.findIndex(x => x >= pk * 0.1), i90 = env.findIndex(x => x >= pk * 0.9);

      /* Estabilidad de la altura dentro de la propia toma. Hay notas largas en
         las que el interprete se va +-30 cents, y por buena que sea de timbre no
         sirve: al pulsarla se oye desafinar. Se mide el recorrido en cents. */
      /* La altura de referencia se saca UNA vez del nombre del archivo, y cada
         ventana solo se busca a +-70 cents de ella. Estimar la f0 libre en cada
         ventana daba saltos de octava y el "recorrido" medido salia de 1200
         cents: media medida rota que ensuciaba la seleccion entera. */
      const nombreNota = /^[a-z-]+_([A-G])(s?)(\d)_/.exec(f);
      const SEM = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      const refHz = nombreNota
        ? 440 * Math.pow(2, (SEM[nombreNota[1]] + (nombreNota[2] ? 1 : 0) + (+nombreNota[3] + 1) * 12 - 69) / 12)
        : 0;
      const f0en = (desde, L) => {
        if (!refHz) return 0;
        const w = d.subarray(desde, desde + L);
        const e = hz => { const k = 2 * Math.PI * hz / sr, c = 2 * Math.cos(k); let s1 = 0, s2 = 0;
          for (let i = 0; i < L; i++) { const s0 = w[i] + c * s1 - s2; s2 = s1; s1 = s0; }
          return Math.sqrt(Math.abs(s1 * s1 + s2 * s2 - c * s1 * s2)); };
        let best = -1, f0 = refHz;
        for (let c2 = -70; c2 <= 70; c2 += 2) {
          const fq = refHz * Math.pow(2, c2 / 1200);
          let s = 0; for (let k = 1; k <= 6 && k * fq < sr / 2; k++) s += e(k * fq);
          if (s > best) { best = s; f0 = fq; }
        }
        return f0;
      };
      /* Solo se mira el trozo que la muestra final va a usar: el primer tramo
         desde el ataque. Midiendo la toma entera, una nota que se estabiliza al
         final salia "estable" y luego en la web se oia desafinar. */
      const L = Math.round(sr * 0.09), serie = [];
      const hasta = Math.min(d.length - L, on + Math.round(sr * (duracion + 0.1)));
      for (let t = on + Math.round(sr * 0.1); t < hasta; t += Math.round(sr * 0.1)) serie.push(f0en(t, L));
      // Recorrido = del punto mas grave al mas agudo. Es lo que se oye; medir la
      // desviacion respecto a la mediana escondia la mitad del movimiento.
      let recorrido = 0;
      const val = serie.filter(x => x > 0);
      if (val.length > 1) recorrido = 1200 * Math.log2(Math.max(...val) / Math.min(...val));
      out.push({ f, centroide: num / (den || 1), ataque: (i90 - i10) * 0.01, dur: buf.duration, util: (d.length - on) / sr, pico, recorrido });
    }
    return out;
  }, { pool: POOL, candidatas, duracion: DURACION });
  fs.writeFileSync(CACHE, JSON.stringify({ n: candidatas.length, duracion: DURACION, med }));   // siempre, o --remedir no serviria de nada

  await browser.close();

  /* Filtro duro de duracion: todas las notas del juego tienen que durar lo
     mismo, asi que solo valen las tomas con sonido suficiente. Es un filtro y no
     una penalizacion porque una toma corta NO se puede alargar. */
  const porNota = {};
  med.forEach(m => {
    /* Descarte duro por inestabilidad: una toma que se va mas de DERIVAMAX se
       oye desafinar al pulsarla, por bien que encaje de timbre. Es filtro y no
       penalizacion porque no hay timbre que compense una nota que no se sostiene. */
    if (m.corta || m.util < DURACION + 0.05 || (m.recorrido || 0) > DERIVAMAX) return;
    const real = /^[a-z-]+_([A-G]s?\d)_/.exec(m.f);
    if (!real) return;
    const k = midiDe(real[1]);
    /* Cada toma se ofrece tambien a las notas vecinas, remuestreada. Es lo que
       hace cualquier sampler y aqui es imprescindible: de F#4 y F#5 la libreria
       solo tiene tomas en pianissimo, y de F#3 ninguna. Un semitono mueve los
       formantes un 6%, que no se nota; se penaliza para preferir la nota real. */
    for (let s = -SALTO; s <= SALTO; s++) {
      const escrita = nomDe(k + s - TRANS);
      (porNota[escrita] = porNota[escrita] || []).push({ ...m, salto: s });
    }
  });

  /* Recta objetivo centroide-vs-nota, afinada por iteracion: se parte de la
     mediana de cada nota, se ajusta la recta y se vuelve a elegir. Sin iterar,
     las notas con solo tomas oscuras arrastran la recta hacia abajo. */
  let elegidas = {};
  Object.entries(porNota).forEach(([n, arr]) => {
    elegidas[n] = arr.slice().sort((a, b) => a.centroide - b.centroide)[Math.floor(arr.length / 2)];
  });
  let recta = { m: 0, c: 0 };
  for (let iter = 0; iter < 6; iter++) {
    if (BRILLO) { recta.m = 0; recta.c = BRILLO; }   // brillo impuesto: no se ajusta a los datos
    const pts = Object.entries(elegidas).map(([n, m]) => ({ x: midiDe(n), y: m.centroide }));
    if (!BRILLO) {
      const N = pts.length, sx = pts.reduce((s, p) => s + p.x, 0), sy = pts.reduce((s, p) => s + p.y, 0);
      const sxy = pts.reduce((s, p) => s + p.x * p.y, 0), sxx = pts.reduce((s, p) => s + p.x * p.x, 0);
      recta.m = (N * sxy - sx * sy) / (N * sxx - sx * sx);
      recta.c = (sy - recta.m * sx) / N;
    }
    Object.entries(porNota).forEach(([n, arr]) => {
      const diana = recta.m * midiDe(n) + recta.c;
      elegidas[n] = arr.slice().sort((a, b) => coste(a, diana) - coste(b, diana))[0];
    });
  }
  function coste(m, diana) {
    let c = Math.abs(m.centroide - diana);
    if (m.ataque > 0.25) c += (m.ataque - 0.25) * 3000;   // entradas lentas: suenan a otra articulacion
    if (m.recorrido > DERIVA) c += (m.recorrido - DERIVA) * PDERIVA;   // la nota se va de afinacion mientras suena
    c += Math.abs(m.salto || 0) * PEAJE;                    // preferir la nota real antes que remuestrear
    return c;
  }

  const faltan = objetivo.filter(n => !elegidas[n]);
  const resid = objetivo.filter(n => elegidas[n]).map(n => elegidas[n].centroide - (recta.m * midiDe(n) + recta.c));
  const sd = Math.sqrt(resid.reduce((s, x) => s + x * x, 0) / resid.length);

  console.log(`\n  nota   toma elegida                                  centroide   desvío`);
  console.log('  ' + '-'.repeat(72));
  objetivo.forEach(n => {
    const e = elegidas[n];
    if (!e) { console.log(`  ${n.padEnd(5)}  -- sin ninguna toma en la librería --`); return; }
    const d = e.centroide - (recta.m * midiDe(n) + recta.c);
    const marca = e.salto ? `  (${e.salto > 0 ? '+' : ''}${e.salto} semitono${Math.abs(e.salto) > 1 ? 's' : ''})` : '';
    console.log(`  ${n.padEnd(5)}  ${e.f.replace(/^[a-z-]+_/, '').replace('.mp3', '').padEnd(34)} ${e.centroide.toFixed(0).padStart(6)} Hz ${(d > 0 ? '+' : '') + d.toFixed(0).padStart(6)} Hz${marca}`);
  });
  console.log('  ' + '-'.repeat(72));
  const nSalto = objetivo.filter(n => elegidas[n] && elegidas[n].salto).length;
  const repes = Object.values(objetivo.filter(n => elegidas[n]).reduce((a, n) => { a[elegidas[n].f] = (a[elegidas[n].f] || 0) + 1; return a; }, {})).filter(v => v > 1).length;
  const maxDes = Math.max(...resid.map(Math.abs));
  const derMax = Math.max(...objetivo.filter(n => elegidas[n]).map(n => elegidas[n].recorrido || 0));
  console.log(`  dispersión ${sd.toFixed(0)} Hz · peor nota ${maxDes.toFixed(0)} Hz · deriva máx ${derMax.toFixed(0)}c · ${nSalto} remuestreada(s) · ${repes} repetida(s)`);
  console.log(`  dispersión del juego elegido: ${sd.toFixed(0)} Hz` + (faltan.length ? `  ·  sin toma: ${faltan.join(', ')}` : ''));

  if (dry) { console.log('\n  (--dry: no se ha escrito nada)'); return; }
  fs.writeFileSync(path.join(ROOT, 'assets/audio/.pool/seleccion.json'),
    JSON.stringify(Object.fromEntries(objetivo.filter(n => elegidas[n]).map(n => [n, elegidas[n].f])), null, 2));
  console.log('\n  ✓ selección guardada en ' + POOL + '/seleccion.json');
})().catch(e => { console.error(e); process.exit(1); });
