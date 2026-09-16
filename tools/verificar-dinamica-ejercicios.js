'use strict';
/**
 * Audita los ejercicios de dinámica (assets/js/dinamica-ejercicios.js).
 *
 *   node tools/verificar-dinamica-ejercicios.js     (necesita node tools/serve.js en 8099)
 *
 * Comprueba, leyendo la teoría de /diccionario-musical/dinamica-musical/:
 *   - que los ocho matices (signo, nombre italiano y significado) y su orden son
 *     EXACTAMENTE los de la tabla de esa página;
 *   - que todos los términos de cambio de intensidad aparecen explicados allí;
 *   - que en cada pregunta la correcta aparece una sola vez, con cuatro opciones
 *     distintas y distractores de la misma clase (signos con signos, nombres con
 *     nombres, significados con significados);
 *   - que en «ordenar» la solución va realmente de suave a fuerte o al revés;
 *   - y recorre los dos ejercicios en el navegador de principio a fin.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const URL = 'http://localhost:8099/ejercicios/dinamica/';
const TEORIA = path.join(ROOT, 'diccionario-musical/dinamica-musical/index.html');

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };
const norm = s => s.toLowerCase().replace(/<[^>]+>/g, '').trim();

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
  const datos = await p.evaluate(() => ({ grados: window.tmDinamicaEjercicios.GRADOS, cambios: window.tmDinamicaEjercicios.CAMBIOS }));

  /* 1. Los matices, contra la tabla de la teoría (signo | término | significado). */
  const html = fs.readFileSync(TEORIA, 'utf8');
  const filas = [...html.matchAll(/<tr>\s*<td>(?:<[^>]+>)*([pmf]{1,3})(?:<\/[^>]+>)*<\/td>\s*<td>(?:<[^>]+>)*([a-z]+)(?:<\/[^>]+>)*<\/td>\s*<td>([^<]+)<\/td>\s*<\/tr>/gi)]
    .map(m => ({ s: m[1], t: m[2], sig: m[3] }));
  if (filas.length !== 8) mal('teoría', `leo ${filas.length} matices en la tabla de dinámica, y deberían ser 8`);
  if (datos.grados.length !== filas.length) mal('matices', `${datos.grados.length} en el ejercicio y ${filas.length} en la teoría`);
  datos.grados.forEach((g, i) => {
    const f = filas[i];
    if (!f) return;
    if (g.s !== f.s) mal(g.s, `en la posición ${i + 1} la teoría pone ${f.s}: el orden no coincide`);
    if (norm(g.t) !== norm(f.t)) mal(g.s, `se llama «${g.t}» aquí y «${f.t}» en la teoría`);
    if (norm(g.sig) !== norm(f.sig)) mal(g.s, `significa «${g.sig}» aquí y «${f.sig}» en la teoría`);
  });

  /* 2. Los términos de cambio, explicados en la teoría. */
  const texto = html.toLowerCase();
  for (const c of datos.cambios) {
    if (!texto.includes(c.t.toLowerCase())) mal(c.t, 'no aparece en /diccionario-musical/dinamica-musical/');
    if (c.abr && !texto.includes(c.abr.toLowerCase())) mal(c.t, `la abreviatura «${c.abr}» no aparece en la teoría`);
  }

  /* 3. Las preguntas. */
  const lotes = await p.evaluate(() => {
    const T = window.tmDinamicaEjercicios, out = [];
    ['grados', 'cambios', 'mezcla'].forEach(nivel => {
      for (let s = 0; s < 40; s++) out.push({ clase: 'significados', nivel, items: T.generar('significados', { nivel, n: 10 }, 300 + s * 977) });
    });
    [['suave-fuerte', 4, false], ['fuerte-suave', 4, false], ['mezcla', 5, true]].forEach(([sentido, cuantos, nombres]) => {
      for (let s = 0; s < 40; s++) out.push({ clase: 'ordenar', sentido, nombres, items: T.generar('ordenar', { sentido, cuantos, nombres, n: 6 }, 700 + s * 977) });
    });
    return out;
  });

  const porSigno = new Map(datos.grados.map((g, i) => [g.s, { ...g, i }]));
  const porNombre = new Map(datos.grados.map((g, i) => [g.t, { ...g, i }]));
  const porCambio = new Map(datos.cambios.map(c => [c.t, c]));
  let preguntas = 0;
  for (const lote of lotes) {
    lote.items.forEach((it, n) => {
      preguntas++;
      const donde = `${lote.clase} ${lote.nivel || lote.sentido} nº${n + 1}`;
      if (lote.clase === 'significados') {
        if (it.opciones.length !== 4 || new Set(it.opciones).size !== 4) mal(donde, 'opciones repetidas o que no son 4');
        if (it.opciones.filter(o => o === it.correcta).length !== 1) mal(donde, 'la correcta no aparece una sola vez');
        if (it.tipo === 'cambio') {
          const c = porCambio.get(it.clave);
          if (!c) return mal(donde, `término desconocido «${it.clave}»`);
          if (c.sig !== it.correcta) mal(donde, 'el significado no es el suyo');
          if (!it.opciones.every(o => datos.cambios.some(x => x.sig === o))) mal(donde, 'distractores que no son cambios de intensidad');
          if (lote.nivel === 'grados') mal(donde, 'término de cambio en el nivel de matices');
        } else {
          const g = porSigno.get(it.clave);
          if (!g) return mal(donde, `matiz desconocido «${it.clave}»`);
          if (lote.nivel === 'cambios') mal(donde, 'matiz en el nivel de cambios');
          const campo = it.tipo === 'grado-significado' ? 'sig' : it.tipo === 'grado-nombre' ? 't' : 's';
          if (g[campo] !== it.correcta) mal(donde, `respuesta «${it.correcta}» y debería ser «${g[campo]}»`);
          if (!it.opciones.every(o => datos.grados.some(x => x[campo] === o))) mal(donde, 'distractores de otra clase');
        }
      } else {
        const mapa = it.nombres ? porNombre : porSigno;
        const idx = it.solucion.map(x => (mapa.get(x) || {}).i);
        if (idx.some(x => x === undefined)) return mal(donde, `algún matiz desconocido: ${it.solucion.join(', ')}`);
        if (new Set(it.solucion).size !== it.solucion.length) mal(donde, 'matices repetidos');
        if (it.solucion.slice().sort().join() !== it.fichas.slice().sort().join()) mal(donde, 'las fichas no son los matices de la solución');
        const sube = it.sentido === 'suave-fuerte';
        if (!idx.every((x, k) => k === 0 || (sube ? x > idx[k - 1] : x < idx[k - 1]))) mal(donde, `la solución no va de ${sube ? 'suave a fuerte' : 'fuerte a suave'}`);
        if (lote.sentido !== 'mezcla' && it.sentido !== lote.sentido) mal(donde, `sentido ${it.sentido} en el nivel ${lote.sentido}`);
        if (lote.nombres !== it.nombres) mal(donde, 'usa signos o nombres al revés de lo que pide el nivel');
      }
    });
  }

  /* 4. Los dos ejercicios en el navegador. */
  for (const [id, nombre] of [['tmdin1', 'significados'], ['tmdin2', 'ordenar']]) {
    const caja = p.locator('#' + id);
    const niveles = await caja.locator('.tm-di-modo').count();
    if (niveles !== 3) { mal(nombre, `${niveles} niveles`); continue; }
    await caja.locator('.tm-di-modo').last().click();
    for (let q = 0; q < 12; q++) {
      if (await caja.locator('.tm-di-nota').count()) break;
      if (nombre === 'significados') await caja.locator('.tm-di-op').first().click();
      else {
        const fichas = await caja.locator('.tm-di-ficha').count();
        for (let f = 0; f < fichas; f++) await caja.locator('.tm-di-ficha:not([disabled])').first().click();
      }
      await caja.locator('.tm-di-btn').click();
      const fb = await caja.locator('.tm-di-fb').textContent();
      if (!fb || fb.length < 15) mal(nombre, 'sin explicación al corregir');
      await caja.locator('.tm-di-btn').click();
    }
    if (!(await caja.locator('.tm-di-nota').count())) mal(nombre, 'no llega al resultado');
  }
  const ancho = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ancho > 0) mal('página', `desborda ${ancho}px`);
  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));

  await b.close();
  console.log(`\n  ${preguntas} preguntas revisadas · ${datos.grados.length} matices y ${datos.cambios.length} términos de cambio · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
