'use strict';
/**
 * Audita los botones de «Escuchar» de /diccionario-musical/tempo-musical/.
 *
 *   node tools/verificar-tempo-audio.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía del motor: mide los PULSOS que se programan de verdad en el reloj de
 * Web Audio y comprueba que el intervalo es 60/bpm. Además revisa, con su propia
 * tabla de rangos leída del HTML, que el bpm que suena cae dentro del rango que
 * anuncia la fila, que el enlace al metrónomo lleva ese mismo bpm, y que solo
 * suena un tempo a la vez.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/diccionario-musical/tempo-musical/';
const HTML = path.join(ROOT, 'diccionario-musical/tempo-musical/index.html');

let fallos = 0;
const mal = (donde, msg) => { console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

/* 1. La tabla, leída del HTML: el bpm tiene que caer dentro del rango. */
const filas = [...fs.readFileSync(HTML, 'utf8').matchAll(
  /<tr><td><strong>([^<]+)<\/strong><\/td><td>[^<]*<\/td><td>([^<]+)<\/td><td class="tm-tempo-celda"><button class="tm-tempo-play" data-bpm="(\d+)" data-nombre="([^"]+)" hidden>([^<]+)<\/button><a class="tm-tempo-metro" href="\/herramientas\/metronomo\/\?bpm=(\d+)"/g)];
if (filas.length < 8) mal('html', `solo ${filas.length} filas con botón`);
for (const [, termino, rango, bpm, nombre, texto, bpmEnlace] of filas) {
  // Sin JavaScript el botón no suena: nace oculto y con su texto dentro, para que
  // no quede un botón mudo si el motor no arranca.
  if (!/escuchar/i.test(texto)) mal(termino, `el botón dice «${texto}» en el HTML`);
  const n = Number(bpm);
  if (nombre !== termino) mal(termino, `el botón dice «${nombre}»`);
  if (Number(bpmEnlace) !== n) mal(termino, `el metrónomo se abre a ${bpmEnlace} y el botón suena a ${n}`);
  const abierto = /^(\d+)\+$/.exec(rango.trim());
  const cerrado = /^(\d+)[–-](\d+)$/.exec(rango.trim());
  if (abierto) { if (n < Number(abierto[1])) mal(termino, `${n} bpm está por debajo de «${rango}»`); }
  else if (cerrado) { if (n < Number(cerrado[1]) || n > Number(cerrado[2])) mal(termino, `${n} bpm está fuera de «${rango}»`); }
  else mal(termino, `rango «${rango}» que no sé leer`);
}

/* 1 bis. La misma tabla en el metrónomo: los rangos vienen de ahí (Soundcorset),
   así que las dos páginas tienen que decir exactamente lo mismo. */
const METRO = path.join(ROOT, 'herramientas/metronomo/index.html');
const filasMetro = new Map([...fs.readFileSync(METRO, 'utf8').matchAll(
  /metronomoSetBpm\((\d+)\)[^>]*><strong>([^<]+)<\/strong><\/td><td>([^<]+)<\/td>/g)]
  .map(([, bpm, termino, rango]) => [termino.trim(), { bpm: Number(bpm), rango: rango.trim() }]));
if (filasMetro.size < 8) mal('metrónomo', `solo ${filasMetro.size} tempos en su tabla`);
for (const [, termino, rango, bpm] of filas) {
  const m = filasMetro.get(termino);
  if (!m) { mal(termino, 'no está en la tabla del metrónomo'); continue; }
  if (m.rango !== rango.trim()) mal(termino, `rango «${rango.trim()}» aquí y «${m.rango}» en el metrónomo`);
  if (m.bpm !== Number(bpm)) mal(termino, `suena a ${bpm} bpm y el metrónomo pone ${m.bpm}`);
}
for (const termino of filasMetro.keys()) {
  if (!filas.some(f => f[1] === termino)) mal(termino, 'está en el metrónomo y falta en la página de tempo');
}

/* 2. El navegador: los pulsos que se programan de verdad. */
(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
  const botones = p.locator('.tm-tempo-play');
  const n = await botones.count();
  if (n !== filas.length) mal('página', `${n} botones en pantalla y ${filas.length} en el HTML`);

  const ocultos = await p.locator('.tm-tempo-play:not([hidden])').count();
  if (ocultos !== n) mal('página', `${n - ocultos} botones siguen ocultos con el JS cargado`);

  let medidos = 0;
  for (let i = 0; i < n; i++) {
    const btn = botones.nth(i);
    const bpm = Number(await btn.getAttribute('data-bpm'));
    const nombre = await btn.getAttribute('data-nombre');
    await btn.click();
    // Se espera a que quepan al menos 3 pulsos: con el Grave (30 bpm) cada uno tarda 2 s.
    await p.waitForTimeout(Math.round(3 * 60000 / bpm + 350));
    const r = await p.evaluate(() => ({ pulsos: window.tmTempoAudio.pulsos(), sonando: window.tmTempoAudio.sonando() }));
    if (r.sonando !== bpm) mal(nombre, `dice estar sonando a ${r.sonando} y no a ${bpm}`);
    if (r.pulsos.length < 3) { mal(nombre, `solo ${r.pulsos.length} pulsos programados`); await btn.click(); continue; }
    const esperado = 60 / bpm;
    const huecos = r.pulsos.slice(1).map((t, k) => t - r.pulsos[k]);
    const peor = Math.max(...huecos.map(h => Math.abs(h - esperado)));
    if (peor > 0.002) mal(nombre, `el pulso se desvía ${(peor * 1000).toFixed(1)} ms (esperado ${(esperado * 1000).toFixed(0)} ms)`);
    else medidos++;
    // Solo uno a la vez: el anterior tiene que haberse apagado.
    const pulsados = await p.locator('.tm-tempo-play[aria-pressed="true"]').count();
    if (pulsados !== 1) mal(nombre, `${pulsados} botones marcados como sonando`);
    await btn.click();
    const tras = await p.evaluate(() => window.tmTempoAudio.sonando());
    if (tras !== null) mal(nombre, 'no se para al volver a pulsar');
  }

  // Pulsar uno y luego otro: el primero se calla.
  await botones.nth(0).click();
  await botones.nth(1).click();
  const pulsados = await p.locator('.tm-tempo-play[aria-pressed="true"]').count();
  if (pulsados !== 1) mal('dos a la vez', `${pulsados} botones sonando`);
  await p.evaluate(() => window.tmTempoAudio.parar());

  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log(`\n  ${filas.length} tempos revisados · ${medidos} con el pulso medido en el navegador · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
