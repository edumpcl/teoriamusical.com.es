'use strict';
/**
 * Banco de /diccionario-musical/cualidades-del-sonido/:
 *   1. los DATOS del timbre (assets/js/timbre-datos.js) y las frases que el motor dice de cada instrumento
 *      (clarinete: impares ≫ pares; oboe: el 3.º es el más fuerte y el fundamental queda por debajo del 2.º; ...);
 *   2. el motor en la página: cada botón pide SU muestra, pinta las barras con los valores medidos y dice la estadística;
 *   3. las figuras de altura y duración: lo que se oye (data-tm-melody) es lo que se dibuja (SVG) y las frecuencias que
 *      rotulan las figuras son las de esas notas (f = 440·2^((midi-69)/12)).
 *
 *   node tools/test-cualidades.js [--puerto=8080] [--sabotaje]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');

let fallos = 0;
const falla = (m) => { fallos++; if (fallos <= 25) console.log('  ✗ ' + m); };

/* ---- 1. datos ---- */
const caja = { window: {} };
vm.createContext(caja);
vm.runInContext(fs.readFileSync(path.join(RAIZ, 'assets/js/timbre-datos.js'), 'utf8'), caja);
const D = caja.window.tmTimbreDatos;
if (SABOTAJE) { D.instrumentos.clarinete.armonicos[1] = 1; D.instrumentos.oboe.armonicos[2] = 0.2; }   // datos que contradicen las frases
const energia = (a, idx) => idx.reduce((s, i) => s + a[i] ** 2, 0);
const ins = D.instrumentos;
const ids = ['piano', 'flauta', 'oboe', 'clarinete', 'trompeta'];
if (JSON.stringify(Object.keys(ins)) !== JSON.stringify(ids)) falla('los instrumentos no son los cinco previstos');
for (const id of ids) {
  const d = ins[id], a = d.armonicos;
  if (a.length !== D.armonicos) falla(`${id}: ${a.length} armónicos y tenían que ser ${D.armonicos}`);
  if (Math.max(...a) !== 1) falla(`${id}: el armónico más fuerte no vale 1`);
  if (Math.abs(1200 * Math.log2(d.fundamentalHz / D.f0)) > 25) falla(`${id}: el fundamental mide ${d.fundamentalHz} Hz, no es un La4`);
  const imp = energia(a, [0, 2, 4, 6, 8, 10]), par = energia(a, [1, 3, 5, 7, 9, 11]);
  if (Math.abs(imp / par - d.imparesSobrePares) / d.imparesSobrePares > 0.1) falla(`${id}: impares/pares guardado ${d.imparesSobrePares} y recalculado ${(imp / par).toFixed(2)}`);
}
const a = (id) => ins[id].armonicos;
const total = (v) => energia(v, v.map((_, i) => i));
if (energia(a('piano'), [0, 1, 2, 3]) / total(a('piano')) < 0.9) falla('piano: los 4 primeros armónicos no llevan casi toda la energía');
if (!(a('flauta').slice(0, 3).every((v) => v > 0.5) && a('flauta').slice(3).every((v) => v <= 0.15))) falla('flauta: no dominan los 3 primeros armónicos con el resto casi vacío');
if (!(a('oboe')[0] < a('oboe')[1] && a('oboe')[1] < a('oboe')[2] && a('oboe')[2] === 1)) falla('oboe: el fundamental no es menor que el 2.º y el 3.º el más fuerte');
if (ins.clarinete.imparesSobrePares < 5) falla(`clarinete: impares/pares ${ins.clarinete.imparesSobrePares} y la frase dice «mucho más»`);
const fuertes = (id) => a(id).filter((v) => v >= 0.1).length;
if (fuertes('trompeta') < 11) falla(`trompeta: ${fuertes('trompeta')} armónicos fuertes y la frase dice «hasta el 11.º»`);
if (!ids.filter((i) => i !== 'trompeta').every((i) => fuertes(i) < fuertes('trompeta'))) falla('trompeta: no es la de más armónicos fuertes («la más rica de los cinco»)');

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
  const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errores.push(m.text()); });
  const pedidas = []; p.on('request', (r) => { if (/\/assets\/audio\//.test(r.url())) pedidas.push(new URL(r.url()).pathname); });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`http://localhost:${PUERTO}/diccionario-musical/cualidades-del-sonido/`, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  await p.evaluate(() => document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; }));
  await p.waitForTimeout(800);

  /* ---- 2. motor del timbre en la página ---- */
  const botones = await p.evaluate(() => [...document.querySelectorAll('#tmtimbre .tm-tm-btn')].map((x) => x.textContent.trim()));
  if (botones.length !== 5) falla(`${botones.length} botones de instrumento y tenían que ser 5`);
  for (let i = 0; i < ids.length; i++) {
    pedidas.length = 0;
    await p.evaluate((i) => document.querySelectorAll('#tmtimbre .tm-tm-btn')[i].click(), i);
    await p.waitForTimeout(250);
    const r = await p.evaluate(() => ({
      barras: [...document.querySelectorAll('#tmtimbre .tm-tm-bar')].map((x) => Number(x.getAttribute('height'))),
      pulsado: [...document.querySelectorAll('#tmtimbre .tm-tm-btn')].map((x) => x.getAttribute('aria-pressed')),
      stat: document.querySelector('#tmtimbre [data-r="stat"]').textContent,
      desc: document.querySelector('#tmtimbre [data-r="desc"]').textContent,
    }));
    const d = ins[ids[i]];
    if (!pedidas.some((u) => u === d.ruta)) falla(`${ids[i]}: pidió ${JSON.stringify(pedidas)} y tenía que pedir ${d.ruta}`);
    if (r.pulsado.filter((x) => x === 'true').length !== 1 || r.pulsado[i] !== 'true') falla(`${ids[i]}: el botón pulsado no es el suyo`);
    d.armonicos.forEach((v, k) => { if (Math.abs(r.barras[k] - v * 150) > 0.2) falla(`${ids[i]}: barra ${k + 1} mide ${r.barras[k]} y tenía que ser ${(v * 150).toFixed(1)}`); });
    if (!r.stat.includes(String(d.imparesSobrePares).replace('.', ','))) falla(`${ids[i]}: la estadística dice «${r.stat}»`);
    if (!r.desc || r.desc.length < 40) falla(`${ids[i]}: sin descripción`);
  }

  /* ---- 3. figuras de altura y duración ---- */
  const figs = await p.evaluate(() => [...document.querySelectorAll('figure[data-tm-melody]')].map((f) => ({
    melodia: f.getAttribute('data-tm-melody'), alt: f.querySelector('img').alt, pie: f.querySelector('figcaption').textContent.trim(),
    src: f.querySelector('img').getAttribute('src'), ok: f.querySelector('img').complete && f.querySelector('img').naturalWidth > 0, boton: !!f.querySelector('.tm-play-scale'),
  })));
  const altura = figs.filter((f) => /\/sol-c\d\.svg/.test(f.src)), duracion = figs.filter((f) => /duracion\.svg/.test(f.src));
  if (altura.length !== 3) falla(`${altura.length} figuras de altura y tenían que ser 3`);
  if (duracion.length !== 1) falla(`${duracion.length} figuras de duración y tenían que ser 1`);
  const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' }, SUB = '₀₁₂₃₄₅₆₇₈';
  const midi = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return ({ c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 })[m[1]] + (Number(m[2]) + 1) * 12; };
  const nombreDe = (k) => { const m = /^([a-g])\/(\d)$/.exec(k); return NOMBRE[m[1]] + SUB[Number(m[2])]; };
  const fmt = (hz) => hz.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: true }).replace(/^(\d)(\d{3})/, '$1.$2');
  altura.forEach((f) => {
    const k = f.melodia.split(':')[0];
    const hz = 440 * Math.pow(2, (midi(k) - 69) / 12);
    if (!f.pie.startsWith(nombreDe(k))) falla(`altura ${k}: el pie dice «${f.pie}» y la nota es ${nombreDe(k)}`);
    if (!f.pie.includes(fmt(hz) + ' Hz')) falla(`altura ${k}: el pie dice «${f.pie}» y la frecuencia es ${fmt(hz)} Hz`);
    if (!f.alt.startsWith(nombreDe(k))) falla(`altura ${k}: el alt dice «${f.alt}»`);
    if (!f.ok || !f.boton) falla(`altura ${k}: imagen ${f.ok} y botón ▶ ${f.boton}`);
  });
  const rel = altura.map((f) => midi(f.melodia.split(':')[0]));
  if (rel[1] - rel[0] !== 12 || rel[2] - rel[1] !== 12) falla('las tres figuras de altura no están a una octava una de otra');
  if (duracion[0]) {
    const toks = duracion[0].melodia.split(' ');
    if (toks.map((t) => t.split(':')[1]).join(' ') !== 'w h q 8' || new Set(toks.map((t) => t.split(':')[0])).size !== 1) falla('la melodía de la duración no es redonda, blanca, negra y corchea sobre una sola nota');
    if (!duracion[0].ok || !duracion[0].boton) falla('duración: imagen o botón ▶ ausentes');
    if (!duracion[0].alt.includes('redonda, blanca, negra y corchea')) falla('duración: el alt no nombra las figuras en orden');
  }
  const ondas = await p.evaluate(() => { const i = document.querySelector('img[src*="intensidad-ondas"]'); return i ? [i.alt, i.complete && i.naturalWidth > 0] : null; });
  if (!ondas || !ondas[1] || !/poca amplitud/.test(ondas[0])) falla('la figura de las ondas no carga o no tiene su alt');
  await b.close();

  console.log(`datos del timbre + motor (5 instrumentos) + figuras de altura/duración/intensidad · ${errores.length ? errores.length + ' error(es) de consola: ' + errores.join(' | ') : 'sin errores de consola'} · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tiene que salir 1+)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos || errores.length ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
