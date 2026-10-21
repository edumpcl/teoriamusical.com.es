'use strict';
/**
 * Audita «¿qué función tonal tiene este acorde?» (assets/js/funciones-tonales-engine.js).
 *
 *   node tools/verificar-funciones-tonales.js [--sabotaje] [--puerto=8910]     (la parte de la página necesita node tools/servidor-estatico.js)
 *
 * No se fía del motor. Para cada acorde que genera, desde las NOTAS (y la armadura de la tonalidad):
 *   1. pasa las notas a semitonos reales; deduce la tonalidad (la escala mayor de su tónica) y comprueba que todas las notas del
 *      acorde son de la escala (excepto ninguna: son diatónicos);
 *   2. ordena el acorde por terceras para hallar su FUNDAMENTAL (da igual la inversión), y de ahí el grado que ocupa en la escala;
 *   3. comprueba el tipo de acorde con los semitonos (I, IV, V: mayor; II, VI: menor; VII: disminuido; V7: de séptima de dominante);
 *   4. calcula la función por DOS caminos distintos que no salen del motor: (a) una tabla de grados escrita aquí, (b) la regla de
 *      la sensible y el 4.º grado; y exige que coincidan entre sí y con la función declarada por el motor;
 *   5. comprueba que el nivel solo usa los acordes y las tonalidades que le tocan, que el III grado no sale nunca, que las
 *      inversiones solo salen en el nivel 3, y que las notas caben entre si3 y sol5;
 *   6. lee el DIBUJO (Verovio): 5 líneas, las cabezas de nota en el paso del pentagrama que toca por su nombre, y la armadura con
 *      el número de alteraciones de la tonalidad.
 * Y en la página real, los tres niveles resueltos bien y mal, con el resultado contado.
 * --sabotaje: se estropean la tabla de grados, una nota, la armadura y la función declarada, y se comprueba que se detecta.
 */
const { chromium } = require('playwright');
const { cargarFicha } = require('./lib-ficha-verovio.js');
const path = require('path');

const args = process.argv.slice(2);
const SABOTAJE = args.includes('--sabotaje');
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const URL = `http://localhost:${PUERTO}/ejercicios/funciones-tonales/`;

const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
// Tonalidades: pitch class de la tónica y alteraciones de la armadura (letra -> ±1), escritas aquí aparte del motor.
const TONAL = {
  C: { pc: 0, alt: {} }, G: { pc: 7, alt: { f: 1 } }, D: { pc: 2, alt: { f: 1, c: 1 } }, F: { pc: 5, alt: { b: -1 } },
  Bb: { pc: 10, alt: { b: -1, e: -1 } }, A: { pc: 9, alt: { f: 1, c: 1, g: 1 } }, Eb: { pc: 3, alt: { b: -1, e: -1, a: -1 } }
};
const NSOST = { C: 0, G: 1, D: 2, F: -1, Bb: -2, A: 3, Eb: -3 };
const MAYOR = [0, 2, 4, 5, 7, 9, 11];
// Tabla de grados → función (escrita aparte; el III no se pregunta).
const FUNCION_GRADO = { 1: 'T', 2: 'S', 4: 'S', 5: 'D', 6: 'T', 7: 'D' };
const NIVEL_ACORDES = { 1: ['I', 'IV', 'V'], 2: ['I', 'II', 'IV', 'V', 'VI', 'VII'], 3: ['I', 'II', 'IV', 'V', 'V7', 'VI', 'VII'] };
const NIVEL_TONALES = { 1: ['C', 'G', 'D', 'F'], 2: Object.keys(TONAL), 3: Object.keys(TONAL) };

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

const idxDe = (k) => { const [l, o] = k.split('/'); return Number(o) * 7 + LETRAS.indexOf(l); };
const semi = (k, tonal) => { const [l, o] = k.split('/'); return Number(o) * 12 + SEMI[l] + (TONAL[tonal].alt[l] || 0); };

function revisarItem(donde, it, tabla) {
  const T = TONAL[it.tonalidad];
  if (!T) return mal(donde, `tonalidad ${it.tonalidad}`);
  const escala = MAYOR.map((s) => (T.pc + s) % 12);
  const pcs = it.notas.map((k) => ((semi(k, it.tonalidad) % 12) + 12) % 12);
  pcs.forEach((pc, i) => { if (!escala.includes(pc)) mal(donde, `la nota ${it.notas[i]} no es de la escala de ${it.tonalidad}`); });
  // fundamental: la nota desde la que el resto del acorde se apila por terceras (en letras: +2, +4, (+6)) sin salirse
  const letras = it.notas.map((k) => LETRAS.indexOf(k.split('/')[0]));
  let raizLetra = -1;
  for (const cand of letras) {
    const apilado = [0, 2, 4, 6].map((p) => (cand + p) % 7).filter((l) => letras.includes(l));
    if (apilado.length === letras.length && new Set(letras).size === letras.length) { raizLetra = cand; break; }
  }
  if (raizLetra < 0) return mal(donde, `las notas ${it.notas.join(' ')} no forman un acorde por terceras`);
  const tonicaLetra = LETRAS.indexOf(NOMBRE_TONICA[it.tonalidad]);
  const grado = ((raizLetra - tonicaLetra + 7) % 7) + 1;
  if (grado !== it.grado) mal(donde, `el acorde es del grado ${grado} y el motor dice ${it.grado}`);
  // tipo de acorde, con semitonos reales sobre la fundamental
  const raizPc = ((SEMI[LETRAS[raizLetra]] + (T.alt[LETRAS[raizLetra]] || 0)) % 12 + 12) % 12;
  const intervalos = [...new Set(pcs.map((pc) => (pc - raizPc + 12) % 12))].sort((a, b) => a - b);
  const esp = { I: [0, 4, 7], IV: [0, 4, 7], V: [0, 4, 7], II: [0, 3, 7], VI: [0, 3, 7], VII: [0, 3, 6], V7: [0, 4, 7, 10] }[it.acorde];
  if (!esp) mal(donde, `acorde desconocido ${it.acorde}`);
  else if (JSON.stringify(intervalos) !== JSON.stringify(esp)) mal(donde, `${it.acorde} tiene los intervalos ${intervalos} y tocaban ${esp}`);
  // función por dos caminos
  const porTabla = tabla[grado];
  const sens = escala[6], cuarto = escala[3];
  const porRegla = pcs.includes(sens) ? 'D' : pcs.includes(cuarto) ? 'S' : 'T';
  if (porTabla !== porRegla) mal(donde, `la tabla dice ${porTabla} y la regla de la sensible dice ${porRegla}`);
  if (it.funcion !== porTabla) mal(donde, `el motor declara ${it.funcion} y el acorde es ${porTabla}`);
  // nivel
  if (!NIVEL_ACORDES[it.nivel].includes(it.acorde)) mal(donde, `${it.acorde} no debería salir en el nivel ${it.nivel}`);
  if (!NIVEL_TONALES[it.nivel].includes(it.tonalidad)) mal(donde, `${it.tonalidad} no debería salir en el nivel ${it.nivel}`);
  if (it.grado === 3) mal(donde, 'el III grado no se pregunta');
  if (it.inversion && it.nivel !== 3) mal(donde, 'inversión fuera del nivel 3');
  // inversión: el bajo es la nota que toca
  const baja = it.notas.reduce((m, k) => (idxDe(k) < idxDe(m) ? k : m));
  const bajoLetra = LETRAS.indexOf(baja.split('/')[0]);
  const esperadoBajo = (raizLetra + 2 * it.inversion) % 7;
  if (bajoLetra !== esperadoBajo) mal(donde, `inversión ${it.inversion}: el bajo es ${baja} y debería ser la letra ${LETRAS[esperadoBajo]}`);
  if (it.notas.length !== (it.acorde === 'V7' ? 4 : 3)) mal(donde, `${it.notas.length} notas`);
  // registro
  const ids = it.notas.map(idxDe);
  if (Math.min(...ids) < 27 || Math.max(...ids) > 39) mal(donde, `fuera de registro: ${it.notas.join(' ')}`);
  if (JSON.stringify(ids) !== JSON.stringify(ids.slice().sort((a, b) => a - b))) mal(donde, `notas desordenadas ${it.notas.join(' ')}`);
}
// la letra de la tónica: la que tiene el mismo pitch class que la tónica y es la «tónica» de la tonalidad (nombre de la tonalidad)
const NOMBRE_TONICA = { C: 'c', G: 'g', D: 'd', F: 'f', Bb: 'b', A: 'a', Eb: 'e' };

async function conVerovio(browser, tabla) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  await cargarFicha(p, '<!doctype html><html><body><div id="z"></div></body></html>', ['assets/js/funciones-tonales-engine.js']);
  const lotes = await p.evaluate((sab) => {
    const T = window.tmFuncionesTonalesTest, z = document.getElementById('z'), out = [];
    [1, 2, 3].forEach((nivel) => {
      for (let s = 0; s < 40; s++) {
        const semilla = 4100 + s * 389 + nivel * 71;
        const items = T.generarLote({ nivel, n: 12 }, semilla);
        const dib = items.map((it) => {
          if (sab === 'nota' && s === 0 && nivel === 3) it = Object.assign({}, it, { notas: it.notas.map((k, i) => (i === 1 ? 'c/5' : k)) });
          if (sab === 'armadura' && s === 0 && nivel === 3) it = Object.assign({}, it, { tonalidad: it.tonalidad === 'C' ? 'G' : 'C' });
          const d = document.createElement('div'); z.appendChild(d);
          T.dibujar(d, it);
          const svg = d.querySelector('svg');
          const lineas = [...new Set([...svg.querySelectorAll('.staff > path')].map((pp) => Math.round(Number(/M0 (\d+)/.exec(pp.getAttribute('d'))[1]))))].sort((a, b) => a - b);
          const cabezas = [...svg.querySelectorAll('.note .notehead use')].map((u) => { const m = /translate\(([\d.]+),\s*([\d.]+)\)/.exec(u.getAttribute('transform')); return { x: Number(m[1]), y: Number(m[2]), g: (u.getAttribute('xlink:href') || u.getAttribute('href') || '').replace(/^#/, '').replace(/-.*/, '') }; });
          const armGlifos = svg.querySelectorAll('.keySig use').length;
          const accid = svg.querySelectorAll('.note .accid').length;
          z.removeChild(d);
          return { lineas, cabezas, armGlifos, accid };
        });
        out.push({ nivel, semilla, items, dib });
      }
    });
    return out;
  }, SABOTAJE ? process.env.SAB || null : null);
  let n = 0; const cuenta = { T: 0, S: 0, D: 0 };
  for (const lote of lotes) {
    if (lote.items.length !== 12) mal(`nivel ${lote.nivel} #${lote.semilla}`, `${lote.items.length} de 12`);
    lote.items.forEach((it, i) => {
      n++; cuenta[it.funcion]++;
      const donde = `nivel ${lote.nivel} #${lote.semilla} nº${i + 1} (${it.acorde} ${it.tonalidad} inv${it.inversion})`;
      revisarItem(donde, it, tabla);
      const d = lote.dib[i];
      if (d.lineas.length !== 5) return mal(donde, `${d.lineas.length} líneas de pentagrama`);
      const sp = (d.lineas[4] - d.lineas[0]) / 4;
      if (d.cabezas.length !== it.notas.length) return mal(donde, `${d.cabezas.length} cabezas dibujadas y ${it.notas.length} notas`);
      const dibujadas = d.cabezas.map((c) => 30 + Math.round((d.lineas[4] - c.y) / (sp / 2))).sort((a, b) => a - b);
      const quiere = it.notas.map(idxDe).sort((a, b) => a - b);
      if (JSON.stringify(dibujadas) !== JSON.stringify(quiere)) mal(donde, `dibujado en los pasos ${dibujadas} y las notas piden ${quiere}`);
      if (d.cabezas.some((c) => c.g !== 'E0A2')) mal(donde, 'las cabezas no son de redonda');
      if (d.accid) mal(donde, `${d.accid} alteraciones sueltas (la armadura ya las pone)`);
      if (d.armGlifos !== Math.abs(NSOST[it.tonalidad])) mal(donde, `${d.armGlifos} alteraciones en la armadura y ${it.tonalidad} lleva ${Math.abs(NSOST[it.tonalidad])}`);
    });
  }
  await p.close();
  if (errs.length) mal('Verovio', 'errores/avisos: ' + errs.slice(0, 5).join(' | '));
  for (const f of ['T', 'S', 'D']) if (!cuenta[f]) mal('reparto', `la función ${f} no sale nunca`);
  console.log(`  ${n} acordes revisados (${JSON.stringify(cuenta)})`);
  return n;
}

async function enPagina(browser) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
  const caja = p.locator('#tmft');
  for (const nivel of [1, 2, 3]) {
    await caja.locator('.tm-ft-modo[data-n="' + nivel + '"]').click();
    let bien = 0;
    if ((await caja.locator('.tm-ft-op').count()) !== 3) mal(`nivel ${nivel}`, 'no hay 3 botones');
    for (let q = 0; q < 6; q++) {
      const acertar = q % 2 === 0;
      const elegir = await p.evaluate((a) => { const it = window.tmFuncionesTonalesDebug(); return a ? it.funcion : ['T', 'S', 'D'].filter((f) => f !== it.funcion)[0]; }, acertar);
      await caja.locator('.tm-ft-op[data-f="' + elegir + '"]').click();
      const fb = await caja.locator('.tm-ft-fb').textContent();
      const dijoBien = /¡Correcto!/.test(fb);
      if (acertar && !dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta correcta dada por mala: ' + fb.slice(0, 100));
      if (!acertar && dijoBien) mal(`nivel ${nivel} pregunta ${q + 1}`, 'respuesta incorrecta dada por buena: ' + fb.slice(0, 100));
      if (acertar) bien++;
      await caja.locator('.tm-ft-btn').click();
    }
    const nota = await caja.locator('.tm-ft-nota').textContent();
    if (Number(nota) !== bien) mal(`nivel ${nivel}`, `resultado ${nota} y deberían ser ${bien} aciertos`);
    await caja.locator('[data-a="modo"]').click();
  }
  const ancho = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ancho > 0) mal('página', `desborda ${ancho}px`);
  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));
  await p.close();
  console.log('  página: los tres niveles resueltos bien y mal, con el resultado contado');
}

(async () => {
  const tabla = Object.assign({}, FUNCION_GRADO);
  if (SABOTAJE && process.env.SAB === 'tabla') tabla[2] = 'D';
  const browser = await chromium.launch();
  const n = await conVerovio(browser, tabla);
  if (!SABOTAJE && !args.includes('--sin-pagina')) await enPagina(browser);
  await browser.close();
  console.log(`\n  ${n} acordes · ${fallos} problema(s).`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
