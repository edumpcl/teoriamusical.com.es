'use strict';
/**
 * Audita los ejercicios de tempo y agógica (assets/js/tempo-ejercicios.js).
 *
 *   node tools/verificar-tempo-ejercicios.js     (necesita node tools/serve.js en 8099)
 *
 * Comprueba, con tablas y reglas escritas aparte:
 *   - que los términos de velocidad, sus BPM y sus rangos son EXACTAMENTE los de la
 *     tabla del metrónomo (de donde salen, siguiendo a Soundcorset);
 *   - que todos los términos de agógica están explicados en /diccionario-musical/agogica/;
 *   - que en cada pregunta la respuesta correcta aparece una sola vez, que hay cuatro
 *     opciones distintas y que los distractores son de la misma familia;
 *   - en el ejercicio de ordenar: que la solución está realmente ordenada por BPM en el
 *     sentido que pide el enunciado, que no se repiten términos y que NUNCA salen dos
 *     vecinos de la escala (sus rangos se tocarían y el orden sería discutible);
 *   - y recorre los dos ejercicios en el navegador de principio a fin.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/tempo/';
const METRO = path.join(ROOT, 'herramientas/metronomo/index.html');
const AGOGICA = path.join(ROOT, 'diccionario-musical/agogica/index.html');

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });

  const datos = await p.evaluate(() => ({
    vel: window.tmTempoEjercicios.VELOCIDADES,
    ago: window.tmTempoEjercicios.AGOGICA,
    oido: window.tmTempoEjercicios.OIDO,
    demos: Object.keys(window.tmAgogicaAudio ? window.tmAgogicaAudio.DEMOS : {}),
  }));

  /* 1. Los términos de velocidad tienen que ser los del metrónomo. */
  const metro = new Map([...fs.readFileSync(METRO, 'utf8').matchAll(
    /metronomoSetBpm\((\d+)\)[^>]*><strong>([^<]+)<\/strong><\/td><td>([^<]+)<\/td>/g)]
    .map(([, bpm, t, rango]) => [t.trim(), { bpm: Number(bpm), rango: rango.trim() }]));
  if (metro.size < 8) mal('metrónomo', `solo ${metro.size} tempos en su tabla`);
  for (const v of datos.vel) {
    const m = metro.get(v.t);
    if (!m) { mal(v.t, 'no está en la tabla del metrónomo'); continue; }
    if (m.bpm !== v.bpm) mal(v.t, `bpm ${v.bpm} aquí y ${m.bpm} en el metrónomo`);
    if (m.rango !== v.rango) mal(v.t, `rango «${v.rango}» aquí y «${m.rango}» en el metrónomo`);
  }
  for (const t of metro.keys()) if (!datos.vel.some(v => v.t === t)) mal(t, 'está en el metrónomo y falta en el ejercicio');
  // Ordenados de más lento a más rápido, sin empates.
  datos.vel.forEach((v, i) => { if (i && v.bpm <= datos.vel[i - 1].bpm) mal(v.t, 'la lista no va de más lento a más rápido'); });

  /* 2. Los términos de agógica tienen que estar explicados en su página. */
  const textoAgogica = fs.readFileSync(AGOGICA, 'utf8');
  for (const a of datos.ago) {
    const nombre = a.t.replace(/’/g, '&rsquo;');
    if (!textoAgogica.includes(a.t) && !textoAgogica.includes(nombre)) mal(a.t, 'no aparece en /diccionario-musical/agogica/');
  }

  /* 2 bis. Las cifras de la página no pueden quedarse viejas. */
  const htmlPagina = fs.readFileSync(path.join(ROOT, 'ejercicios/tempo/index.html'), 'utf8');
  const NUM = { 11: 'once', 15: 'quince', 6: 'seis' };
  if (!htmlPagina.includes(NUM[datos.vel.length] + ' términos de velocidad')) mal('página', `dice otra cosa que «${NUM[datos.vel.length]} términos de velocidad»`);
  if (!htmlPagina.includes(NUM[datos.ago.length] + ' de agógica')) mal('página', `dice otra cosa que «${NUM[datos.ago.length]} de agógica»`);

  /* 2 ter. El ejercicio de oído usa demostraciones que existen de verdad. */
  for (const x of datos.oido) {
    if (datos.demos.indexOf(x.tipo) < 0) mal(x.t, `la demostración «${x.tipo}» no existe en agogica-audio.js`);
  }

  /* 3. Las preguntas. */
  const SEMILLAS = 40;
  const lotes = await p.evaluate(n => {
    const T = window.tmTempoEjercicios, out = [];
    ['velocidad', 'agogica', 'mezcla'].forEach(nivel => {
      for (let s = 0; s < n; s++) out.push({ clase: 'significados', nivel, items: T.generar('significados', { nivel, n: 10 }, 400 + s * 977) });
    });
    [['lento-rapido', 4], ['rapido-lento', 4], ['mezcla', 5]].forEach(([sentido, cuantos]) => {
      for (let s = 0; s < n; s++) out.push({ clase: 'ordenar', sentido, items: T.generar('ordenar', { sentido, cuantos, n: 6 }, 800 + s * 977) });
    });
    for (let s = 0; s < n; s++) out.push({ clase: 'oido', items: T.generar('oido', { n: 8 }, 1200 + s * 977) });
    return out;
  }, SEMILLAS);

  const porTermino = new Map(datos.vel.map(v => [v.t, v]));
  const indice = new Map(datos.vel.map((v, i) => [v.t, i]));
  let preguntas = 0;
  for (const lote of lotes) {
    lote.items.forEach((it, i) => {
      preguntas++;
      const donde = `${lote.clase} ${lote.nivel || lote.sentido} nº${i + 1}`;
      if (lote.clase === 'oido') {
        const x = datos.oido.find(y => y.tipo === it.demo);
        if (!x) return mal(donde, `demostración desconocida «${it.demo}»`);
        if (x.t !== it.correcta) mal(donde, `suena «${it.demo}» y la respuesta dice «${it.correcta}»`);
        if (it.opciones.length !== 4 || new Set(it.opciones).size !== 4) mal(donde, 'opciones repetidas o distintas de 4');
        if (it.opciones.filter(o => o === it.correcta).length !== 1) mal(donde, 'la correcta no aparece una sola vez');
        if (!it.opciones.every(o => datos.oido.some(y => y.t === o))) mal(donde, 'alguna opción no es un cambio de tempo');
        return;
      }
      if (lote.clase === 'significados') {
        if (it.opciones.length !== 4) mal(donde, `${it.opciones.length} opciones`);
        if (new Set(it.opciones).size !== it.opciones.length) mal(donde, 'opciones repetidas');
        if (it.opciones.filter(o => o === it.correcta).length !== 1) mal(donde, 'la correcta no aparece una sola vez');
        if (!it.enunciado.includes(it.termino)) mal(donde, 'el enunciado no nombra el término');
        const v = porTermino.get(it.termino);
        if (it.tipo === 'bpm') {
          if (!v) mal(donde, 'pregunta por el BPM de un término que no es de velocidad');
          else if (v.rango !== it.correcta) mal(donde, `dice ${it.correcta} y el rango es ${v.rango}`);
          if (!it.opciones.every(o => datos.vel.some(x => x.rango === o))) mal(donde, 'alguna opción no es un rango real');
        } else {
          const fuente = it.familia === 'velocidad' ? datos.vel : datos.ago;
          const x = fuente.find(y => y.t === it.termino);
          if (!x) mal(donde, 'término fuera de su familia');
          else if (x.sig !== it.correcta) mal(donde, 'el significado no es el suyo');
          if (!it.opciones.every(o => fuente.some(y => y.sig === o))) mal(donde, 'distractores de otra familia');
          if (lote.nivel === 'velocidad' && it.familia !== 'velocidad') mal(donde, 'término de agógica en el nivel de velocidad');
          if (lote.nivel === 'agogica' && it.familia !== 'agogica') mal(donde, 'término de velocidad en el nivel de agógica');
        }
      } else {
        const sol = it.solucion;
        if (new Set(sol).size !== sol.length) mal(donde, 'términos repetidos');
        if (sol.slice().sort().join() !== it.fichas.slice().sort().join()) mal(donde, 'las fichas no son los términos de la solución');
        const bpms = sol.map(t => (porTermino.get(t) || {}).bpm);
        if (bpms.some(x => x === undefined)) mal(donde, 'algún término no es de velocidad');
        else {
          const sube = it.sentido === 'lento-rapido';
          const ordenado = bpms.every((x, k) => k === 0 || (sube ? x > bpms[k - 1] : x < bpms[k - 1]));
          if (!ordenado) mal(donde, `la solución no va de ${sube ? 'lento a rápido' : 'rápido a lento'}`);
          if (lote.sentido !== 'mezcla' && it.sentido !== lote.sentido) mal(donde, `sentido ${it.sentido} en el nivel ${lote.sentido}`);
        }
        // Nunca dos vecinos de la escala: sus rangos se tocan.
        const idx = sol.map(t => indice.get(t)).sort((a, c) => a - c);
        idx.forEach((x, k) => { if (k && x - idx[k - 1] < 2) mal(donde, `${sol.join(', ')}: hay dos términos vecinos`); });
      }
    });
  }

  /* 4. Los dos ejercicios, de principio a fin en el navegador. */
  for (const [id, nombre] of [['tmtempo1', 'significados'], ['tmtempo2', 'ordenar'], ['tmtempo3', 'oido']]) {
    const caja = p.locator('#' + id);
    const niveles = await caja.locator('.tm-te-modo').count();
    if (!niveles) { mal(nombre, 'no aparecen los niveles'); continue; }
    await caja.locator('.tm-te-modo').first().click();
    let rondas = 0;
    for (let q = 0; q < 12; q++) {
      if (await caja.locator('.tm-te-nota').count()) break;
      if (nombre === 'oido') {
        // Suena lo que dice la pregunta: se comprueba en el propio motor de audio.
        await caja.locator('.tm-te-oir').click();
        await p.waitForTimeout(150);
        const suena = await p.evaluate(() => window.tmAgogicaAudio.sonando());
        if (!suena) mal(nombre, 'al pulsar «Escuchar el ejemplo» no suena nada');
        await caja.locator('.tm-te-op').first().click();
      } else if (nombre === 'significados') await caja.locator('.tm-te-op').first().click();
      else {
        const fichas = await caja.locator('.tm-te-ficha').count();
        for (let f = 0; f < fichas; f++) await caja.locator('.tm-te-ficha:not([disabled])').first().click();
      }
      await caja.locator('.tm-te-btn').click();
      const fb = await caja.locator('.tm-te-fb').textContent();
      if (!fb || fb.length < 15) mal(nombre, 'sin explicación al corregir');
      await caja.locator('.tm-te-btn').click();
      rondas++;
    }
    if (!(await caja.locator('.tm-te-nota').count())) mal(nombre, `no llega al resultado tras ${rondas} preguntas`);
  }

  const ancho = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ancho > 0) mal('página', `desborda ${ancho}px`);
  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));

  await b.close();
  console.log(`\n  ${preguntas} preguntas revisadas · ${datos.vel.length} tempos y ${datos.ago.length} términos de agógica · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
