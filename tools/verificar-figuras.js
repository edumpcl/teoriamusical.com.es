'use strict';
/**
 * Audita los ejercicios de figuras y ritmo (assets/js/figuras-engine.js).
 *
 *   node tools/verificar-figuras.js
 *
 * No se fía de la teoría del motor: genera muchas preguntas de cada tipo y nivel,
 * las DIBUJA con VexFlow 4 (el de la web) y con VexFlow 5 (el de las fichas en
 * PDF) y lee lo dibujado —duración, puntillos, silencio, altura, plica, ligadura
 * y cifra de compás— para recalcular la respuesta con tablas escritas aparte.
 *
 * Comprueba:
 *   - que el nombre, el valor, la equivalencia o la suma que da el motor coinciden
 *     con lo que se ve;
 *   - que la respuesta correcta está una sola vez entre las opciones y que no hay
 *     dos opciones iguales;
 *   - que ninguna figura se sale del compás y que el silencio de redonda solo
 *     aparece donde vale un compás entero (4/4);
 *   - la regla de plicas: de la 3ª línea hacia arriba, abajo; por debajo, arriba;
 *   - que la ligadura de unión une notas iguales y la de expresión, distintas;
 *   - que las fracciones se escriben bien («⅔ de tiempo», «1 ½ tiempos»).
 *
 * Necesita red para cargar VexFlow 4.2.2 desde jsDelivr (como la web).
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ENGINE = path.join(ROOT, 'assets/js/figuras-engine.js');
const VF5 = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const VF4 = 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

/* Tablas propias, en dieciseisavos de negra (la semicorchea con doble puntillo = 7). */
const DUR = { w: 64, h: 32, q: 16, '8': 8, '16': 4 };
const NOMBRE = { w: 'redonda', h: 'blanca', q: 'negra', '8': 'corchea', '16': 'semicorchea' };
const PLURAL = { w: 'redondas', h: 'blancas', q: 'negras', '8': 'corcheas', '16': 'semicorcheas' };
const LETRA_FIG = { r: 'w', b: 'h', n: 'q', c: '8', sc: '16' };
const TIEMPO = { '2/4': 16, '3/4': 16, '4/4': 16, '6/8': 24, '9/8': 24, '12/8': 24 };
const TIEMPOS = { '2/4': 2, '3/4': 3, '4/4': 4, '6/8': 2, '9/8': 3, '12/8': 4 };
/* Línea del pentagrama de cada altura (Mi4 = 1ª línea, Si4 = 3ª). */
const LINEA = { 'e/4': 1, 'f/4': 1.5, 'g/4': 2, 'a/4': 2.5, 'b/4': 3, 'c/5': 3.5, 'd/5': 4 };

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const red = (n, d) => { const g = gcd(n, d) || 1; return [n / g, d / g]; };
const mismo = (a, b) => a.n * b.d === b.n * a.d;
const GLIFO = { '1/2': '½', '1/4': '¼', '3/4': '¾' };
/* «⅔ de tiempo», «½ tiempo», «2 tiempos», «1 tiempo y ⅔ de tiempo». */
function tiempoTexto(n, d) {
  [n, d] = red(n, d);
  const ent = Math.floor(n / d), resto = n % d;
  const parte = resto ? (GLIFO[resto + '/' + d] || resto + '/' + d) + (2 * resto === d ? ' tiempo' : ' de tiempo') : '';
  const entero = ent ? ent + (ent === 1 ? ' tiempo' : ' tiempos') : '';
  if (ent && 2 * resto === d) return entero + ' y medio';
  return [entero, parte].filter(Boolean).join(' y ');
}

const valorDibujado = x => DUR[x.duracion] * [1, 1.5, 1.75][x.puntillos];
const nombreDibujado = x => (x.silencio ? 'silencio de ' : '') + NOMBRE[x.duracion]
  + (x.puntillos === 1 ? ' con puntillo' : x.puntillos === 2 ? ' con doble puntillo' : '');

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 40) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

const CASOS = [
  ['identificar', [{ modo: 'figuras' }, { modo: 'silencios' }, { modo: 'mezcla' }]],
  ['valor', [{ grupo: 'simples' }, { grupo: 'compuestos' }, { grupo: 'mezcla' }]],
  ['equivalencias', [{ clase: 'cuantas' }, { clase: 'que' }, { clase: 'mezcla' }]],
  ['sumar', [{ grupo: 'simples' }, { grupo: 'compuestos' }, { grupo: 'mezcla' }]],
  ['ligaduras', [{ grupo: 'simples' }, { grupo: 'compuestos' }, { grupo: 'mezcla' }]],
];
const SEMILLAS = 12;

function revisarOpcionesFr(donde, item, correcta) {
  const ops = item.opciones;
  if (!ops || ops.length !== 4) mal(donde, `${ops ? ops.length : 0} opciones`);
  const veces = ops.filter(o => mismo(o, correcta)).length;
  if (veces !== 1) mal(donde, `la respuesta correcta aparece ${veces} veces entre las opciones`);
  for (let i = 0; i < ops.length; i++) {
    if (ops[i].n <= 0) mal(donde, 'opción no positiva');
    for (let j = i + 1; j < ops.length; j++) if (mismo(ops[i], ops[j])) mal(donde, 'dos opciones iguales');
  }
}

function revisarPlicas(donde, notas) {
  notas.forEach((x, i) => {
    if (x.silencio || x.duracion === 'w') return;
    const esperada = LINEA[x.claves[0]] >= 3 ? -1 : 1;
    if (x.plica !== esperada) mal(donde, `nota ${i + 1} (${x.claves[0]}) con la plica ${x.plica === 1 ? 'arriba' : 'abajo'}`);
  });
}

async function auditar(browser, etiqueta, vexflow) {
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setContent('<!doctype html><html><body><div id="z"></div></body></html>');
  await p.addScriptTag(vexflow.startsWith('http') ? { url: vexflow } : { path: vexflow });
  await p.addScriptTag({ path: ENGINE });

  const lotes = await p.evaluate(({ CASOS, SEMILLAS, FICHAS }) => {
    const T = window.tmFiguras, z = document.getElementById('z'), out = [];
    function lote(tipo, nivel, semilla, origen) {
      const o = Object.assign({ n: 24 }, nivel);
      const items = T.generar(tipo, o, semilla);
      const dibujos = items.map(it => {
        const d = document.createElement('div');
        z.appendChild(d);
        T.dibujar(d, T.specDe(it));
        const r = { notas: d.__tmNotas, curvas: d.__tmCurvas, cifra: d.__tmCifra, barra: d.__tmBarra };
        z.removeChild(d);
        return r;
      });
      const textos = items.map(it => ({
        correcta: it.correcta && it.correcta.n !== undefined ? T.enTiempos(it.correcta, false) : null,
        explicacion: T.explicar(it, false),
        enunciado: T.enunciado(it, false),
      }));
      out.push({ tipo, nivel, n: o.n, semilla, origen, items, dibujos, textos });
    }
    CASOS.forEach(([tipo, niveles]) => niveles.forEach(nivel => {
      for (let s = 0; s < SEMILLAS; s++) lote(tipo, nivel, 5000 + s * 977, 'web');
    }));
    // Las preguntas exactas de las fichas en PDF, con sus semillas.
    FICHAS.forEach(([tipo, nivel, semilla]) => lote(tipo, nivel, semilla, 'ficha'));
    return out;
  }, { CASOS, SEMILLAS, FICHAS: Object.values(require('./generate-fichas-figuras.js').FICHAS).flatMap(f => f.lotes) });

  let preguntas = 0, barrasVistas = 0;
  for (const lote of lotes) {
    const ref = `${etiqueta} ${lote.tipo} ${JSON.stringify(lote.nivel)} #${lote.semilla}`;
    // Un lote puede quedarse corto si no hay bastantes preguntas distintas, pero no mucho.
    if (lote.items.length < Math.min(20, lote.n)) mal(ref, `solo ${lote.items.length} preguntas de ${lote.n}`);
    lote.items.forEach((it, i) => {
      preguntas++;
      const dib = lote.dibujos[i], tx = lote.textos[i];
      const donde = `${ref} nº${i + 1}`;
      const notas = dib.notas;
      if (!tx.explicacion || !tx.enunciado) mal(donde, 'sin enunciado o sin explicación');
      revisarPlicas(donde, notas);

      if (it.tipo === 'identificar') {
        if (notas.length !== 1) return mal(donde, `${notas.length} símbolos dibujados`);
        const leido = nombreDibujado(notas[0]);
        if (leido !== it.correcta) mal(donde, `se dibuja «${leido}» y la respuesta es «${it.correcta}»`);
        if (lote.nivel.modo === 'figuras' && notas[0].silencio) mal(donde, 'silencio en el nivel de figuras');
        if (lote.nivel.modo === 'silencios' && !notas[0].silencio) mal(donde, 'figura en el nivel de silencios');
        if (notas[0].silencio && notas[0].duracion === 'w' && notas[0].puntillos) mal(donde, 'silencio de redonda con puntillo');
        return;
      }

      if (it.tipo === 'valor' || it.tipo === 'sumar' || it.tipo === 'ligaduras') {
        const c = dib.cifra;
        if (!TIEMPO[c]) return mal(donde, `cifra de compás «${c}»`);
        if (c !== it.compas) mal(donde, `se dibuja ${c} y el enunciado dice ${it.compas}`);
        const grupo = lote.nivel.grupo;
        if (grupo === 'simples' && TIEMPO[c] !== 16) mal(donde, `${c} en compases simples`);
        if (grupo === 'compuestos' && TIEMPO[c] !== 24) mal(donde, `${c} en compases compuestos`);
        const largo = TIEMPO[c] * TIEMPOS[c];
        const total = notas.reduce((a, x) => a + valorDibujado(x), 0);
        if (dib.barra == null) {
          if (total > largo) mal(donde, `lo dibujado dura ${total}/16 de negra y no cabe en ${c}`);
        } else {
          // Con barra de compás, el primer compás tiene que estar justo completo.
          const primero = notas.slice(0, dib.barra).reduce((a, x) => a + valorDibujado(x), 0);
          if (primero !== largo) mal(donde, `antes de la barra hay ${primero}/16 de negra y un compás de ${c} son ${largo}`);
          if (total - primero > largo) mal(donde, 'el segundo compás no cabe');
          if (it.tipo !== 'ligaduras') mal(donde, 'barra de compás fuera del ejercicio de ligaduras');
          barrasVistas++;
        }

        let n;
        if (it.tipo === 'valor') {
          if (notas.length !== 1) return mal(donde, `${notas.length} símbolos dibujados`);
          if (notas[0].silencio && notas[0].duracion === 'w' && c !== '4/4') mal(donde, `silencio de redonda en ${c}`);
          n = valorDibujado(notas[0]);
        } else if (it.tipo === 'sumar') {
          if (notas.length < 3) mal(donde, `solo ${notas.length} figuras`);
          n = total;
        } else {
          const cv = dib.curvas;
          if (cv.length !== 1) return mal(donde, `${cv.length} ligaduras dibujadas`);
          const { clase, desde, hasta } = cv[0];
          const alturas = notas.slice(desde, hasta + 1).map(x => x.claves[0]);
          const iguales = alturas.every(a => a === alturas[0]);
          const leida = hasta - desde === 1 && iguales ? 'union' : 'expresion';
          if (clase === 'union' && !iguales) mal(donde, 'ligadura de unión entre notas distintas');
          if (clase === 'expresion' && new Set(alturas).size !== alturas.length) mal(donde, 'ligadura de expresión con notas repetidas');
          if (leida !== it.clase) mal(donde, `se ve una ligadura de ${leida} y la respuesta dice ${it.clase}`);
          if (notas.slice(desde, hasta + 1).some(x => x.silencio)) mal(donde, 'silencio dentro de la ligadura');
          if (notas.slice(0, desde).some(x => !x.silencio)) mal(donde, 'hay notas antes de la ligadura: «la primera nota» sería ambiguo');
          if (dib.barra != null && !(desde < dib.barra && hasta >= dib.barra)) mal(donde, 'hay barra de compás pero la ligadura no la cruza');
          n = leida === 'union' ? valorDibujado(notas[desde]) + valorDibujado(notas[hasta]) : valorDibujado(notas[desde]);
        }
        const [a, b] = red(n, TIEMPO[c]);
        const esperada = { n: a, d: b };
        if (!mismo(esperada, it.correcta)) mal(donde, `lo dibujado vale ${tiempoTexto(a, b)} y el motor dice ${tx.correcta}`);
        if (tx.correcta !== tiempoTexto(a, b)) mal(donde, `se escribe «${tx.correcta}» y debería ser «${tiempoTexto(a, b)}»`);
        if (!tx.explicacion.includes(tiempoTexto(a, b))) mal(donde, `la explicación no llega a «${tiempoTexto(a, b)}»`);
        revisarOpcionesFr(donde, it, esperada);
        return;
      }

      // equivalencias
      if (notas.length !== 1) return mal(donde, `${notas.length} símbolos dibujados`);
      const x = notas[0];
      if (x.silencio) mal(donde, 'silencio en equivalencias');
      const b = LETRA_FIG[it.b];
      if (it.clase === 'cuantas') {
        const k = valorDibujado(x) / DUR[b];
        if (k !== it.correcta) mal(donde, `en una ${nombreDibujado(x)} hay ${k} ${PLURAL[b]}, el motor dice ${it.correcta}`);
        if (!tx.enunciado.includes(nombreDibujado(x))) mal(donde, `el enunciado no nombra la figura dibujada (${nombreDibujado(x)})`);
        if (it.opciones.filter(o => o === k).length !== 1 || new Set(it.opciones).size !== it.opciones.length || it.opciones.length !== 4) mal(donde, `opciones ${it.opciones}`);
      } else {
        if (x.duracion !== b || x.puntillos) mal(donde, `se dibuja ${nombreDibujado(x)} y se pregunta por ${PLURAL[b]}`);
        const total = it.k * DUR[b];
        const valorDe = s => DUR[LETRA_FIG[s.f]] * [1, 1.5, 1.75][s.p];
        const buenas = it.opciones.filter(s => valorDe(s) === total);
        if (buenas.length !== 1) mal(donde, `${buenas.length} opciones valen ${it.k} ${PLURAL[b]}`);
        if (valorDe(it.correcta) !== total) mal(donde, `la respuesta no vale ${it.k} ${PLURAL[b]}`);
        if (new Set(it.opciones.map(valorDe)).size !== it.opciones.length || it.opciones.length !== 4) mal(donde, 'opciones repetidas o que no son 4');
      }
    });
  }
  if (!barrasVistas) mal(etiqueta, 'ninguna ligadura cruza la barra de compás');
  await p.close();
  console.log(`  ${etiqueta}: ${preguntas} preguntas revisadas · ${barrasVistas} ligaduras que cruzan la barra${errs.length ? ' · errores de página: ' + errs.slice(0, 3).join(' | ') : ''}`);
  return { preguntas, errs: errs.length };
}

(async () => {
  const browser = await chromium.launch();
  const r4 = await auditar(browser, 'VexFlow 4 (web)', VF4);
  const r5 = await auditar(browser, 'VexFlow 5 (PDF)', VF5);
  await browser.close();
  console.log(`\n  ${r4.preguntas + r5.preguntas} preguntas · ${fallos} problema(s).`);
  process.exit(fallos || r4.errs || r5.errs ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
