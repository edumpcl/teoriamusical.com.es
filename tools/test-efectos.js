'use strict';
/**
 * Comprueba las páginas hijas de /diccionario-musical/efectos-de-ejecucion/: arpegiado, portamento, vibrato y trémolo
 * (el glissando y el hub tienen su prueba en tools/test-glissando.js).
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/test-efectos.js [--puerto=8910] [--sabotaje]
 *
 * 1. FIGURAS Y GRÁFICOS: existen, la página dice sus medidas, el texto alternativo es el del generador y están al día (regenerarlos no cambia nada).
 * 2. AUDIO, midiendo lo que SUENA (osciladores, rampas, curvas, moduladores y muestras de piano interceptados):
 *    - glissando/salto: sostiene la salida, desliza (o salta) con la duración dicha y llega a la frecuencia exacta;
 *    - portamento: curva suave con la duración dicha (y no una rampa recta);
 *    - vibrato: nota sostenida con un oscilador lento de la velocidad dicha y una amplitud en Hz que equivale a ±N cents; sin vibrato, sin modulador;
 *    - nota repetida: tantos golpes como dice el botón, equiespaciados;
 *    - piano: las notas y los instantes de cada botón; el arpegiado entra nota a nota SIN soltar las anteriores (todas acaban a la vez),
 *      el bloque entra de golpe, el arpegio suelta cada nota antes de la siguiente; el trémolo alterna Do y Mi a 1/16 s.
 *    - los números de los botones coinciden con los de los gráficos (que salen de la misma tabla en tools/gen-efectos-graficos.js).
 * 3. ENLACES: todos responden 200, y cada página está enlazada desde el hub, desde el índice del diccionario, desde las hermanas que la
 *    citan y está en el sitemap; migas de pan correctas.
 * 4. Sin desbordamiento en móvil ni errores de consola.
 * --sabotaje: cambia a propósito un dato del botón y un nombre y comprueba que se detecta.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const BASE = `http://localhost:${PUERTO}`;
const B = '/diccionario-musical/efectos-de-ejecucion/';
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 50) console.log('  ✗ ' + m); } };

const PC = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const pcNombre = (n) => PC[n];
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const midiDeFichero = (n) => { const m = /^([A-G])(s?)(\d)$/.exec(n); return { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12; };
const VOL = Number(/var VOL = ([\d.]+)/.exec(leer('assets/js/efectos-audio.js'))[1]);

const PAGINAS = {
  arpegiado: { figuras: ['acorde-bloque', 'arpegiado', 'arpegiado-descendente'], botones: 4, hermanas: ['glissando', 'tremolo'] },
  portamento: { graficos: ['portamento-curvas'], botones: 3, hermanas: ['glissando', 'vibrato'] },
  vibrato: { graficos: ['vibrato-curvas'], botones: 4, hermanas: ['tremolo', 'portamento'] },
  tremolo: { figuras: ['tremolo-rayas', 'tremolo-alternado'], botones: 3, hermanas: ['vibrato', 'arpegiado', 'glissando'] },
};

const INSTRUMENTACION = () => {
  window.__ev = [];
  const nombres = new WeakMap();
  const f0 = window.fetch;
  window.fetch = function (u, ...r) {
    const p = f0.call(this, u, ...r);
    if (!/audio\/piano\//.test(String(u))) return p;
    const nombre = String(u).split('/').pop().replace(/\.\w+$/, '');
    return p.then((res) => { const ab = res.arrayBuffer.bind(res); res.arrayBuffer = () => ab().then((buf) => { nombres.set(buf, nombre); return buf; }); return res; });
  };
  const dec = AudioContext.prototype.decodeAudioData;
  AudioContext.prototype.decodeAudioData = function (buf, ok, bad) {
    const nombre = nombres.get(buf);
    const envuelve = (cb) => (b) => { if (nombre && b) b.__nombre = nombre; if (cb) cb(b); return b; };
    const pr = dec.call(this, buf, ok ? envuelve(ok) : undefined, bad);
    return pr && pr.then ? pr.then((b) => { if (nombre && b) b.__nombre = nombre; return b; }) : pr;
  };
  const st = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (when) { window.__ev.push({ tipo: 'muestra', nombre: this.buffer && this.buffer.__nombre, rate: this.playbackRate.value, cuando: when }); return st.apply(this, arguments); };
  const er = AudioParam.prototype.exponentialRampToValueAtTime, sv = AudioParam.prototype.setValueAtTime, sc = AudioParam.prototype.setValueCurveAtTime, lr = AudioParam.prototype.linearRampToValueAtTime;
  AudioParam.prototype.exponentialRampToValueAtTime = function (v, t) { if (v > 20) window.__ev.push({ tipo: 'rampa', valor: v, hasta: t }); return er.apply(this, arguments); };
  AudioParam.prototype.setValueAtTime = function (v, t) { if (v > 20) window.__ev.push({ tipo: 'fijar', valor: v, cuando: t }); else if (v === 0.85) window.__ev.push({ tipo: 'sostiene', cuando: t }); return sv.apply(this, arguments); };
  AudioParam.prototype.setValueCurveAtTime = function (vals, t, d) { const n = vals.length - 1; window.__ev.push({ tipo: 'curva', primero: vals[0], ultimo: vals[n], medio: vals[n >> 1], octavo: vals[Math.round(n / 8)], cuando: t, dur: d }); return sc.apply(this, arguments); };
  AudioParam.prototype.linearRampToValueAtTime = function (v, t) { window.__ev.push({ tipo: 'rampaL', valor: v, hasta: t }); return lr.apply(this, arguments); };
  const so = OscillatorNode.prototype.start;
  OscillatorNode.prototype.start = function (when) { window.__ev.push({ tipo: 'oscilador', cuando: when, f: this.frequency.value, tipoOnda: this.type }); return so.apply(this, arguments); };
  const cn = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (dest) { if (dest instanceof AudioParam && this.gain) window.__ev.push({ tipo: 'modula', amplitud: this.gain.value }); return cn.apply(this, arguments); };
};

function comprobarFiguras(html, nombre, cfg) {
  const gen = leer('tools/gen-efectos-figuras.js'), gra = leer('tools/gen-efectos-graficos.js');
  for (const f of (cfg.figuras || []).concat(cfg.graficos || [])) {
    const esGrafico = (cfg.graficos || []).includes(f), ruta = esGrafico ? `assets/img/efectos/${f}.svg` : `assets/img/notacion/efectos/${f}.svg`;
    ok(fs.existsSync(path.join(RAIZ, ruta)), `${nombre}: ${ruta} no existe`);
    if (!fs.existsSync(path.join(RAIZ, ruta))) continue;
    const svg = leer(ruta), w = /<svg[^>]*\swidth="(\d+)"/.exec(svg), h = /<svg[^>]*\sheight="(\d+)"/.exec(svg);
    const img = new RegExp(`<img src="/${ruta.replace(/[/.]/g, (c) => '\\' + c)}" width="(\\d+)" height="(\\d+)" alt="([^"]*)"`).exec(html);
    ok(!!img, `${nombre}: la página no incrusta ${ruta}`);
    if (!img) continue;
    ok(w && h && Number(img[1]) === Number(w[1]) && Number(img[2]) === Number(h[1]), `${nombre}/${f}: la página dice ${img[1]}×${img[2]} y el SVG mide ${w && w[1]}×${h && h[1]}`);
    let altGen;
    if (esGrafico) altGen = new RegExp(`const ALT_${f.startsWith('vibrato') ? 'VIBRATO' : 'PORTAMENTO'} = '([^']*)'`).exec(gra);
    else altGen = new RegExp(`'${f}': \\{[^}]*alt: '([^']*)'`).exec(gen);
    ok(altGen && altGen[1] === img[3], `${nombre}/${f}: el alt de la página no es el del generador`);
  }
}

async function abre(b, ruta, ancho = 1100) {
  const p = await b.newPage({ viewport: { width: ancho, height: 900 } });
  await p.addInitScript(INSTRUMENTACION);
  const errores = []; p.on('pageerror', (e) => errores.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/consent|adsbygoogle|googlesyndication|googletagmanager|ERR_FAILED|Failed to load resource/.test(m.text())) errores.push(m.text()); });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${ruta}`, { waitUntil: 'load' });
  await p.waitForTimeout(600);
  return { p, errores };
}

function audioContinuo(bt, ev) {
  const de = Number(bt.de), a = Number(bt.a), dur = Number(bt.dur), hold1 = 0.5;
  const osc = ev.filter((e) => e.tipo === 'oscilador'), ramp = ev.filter((e) => e.tipo === 'rampa'), fijos = ev.filter((e) => e.tipo === 'fijar');
  ok(osc.length === 2 && ramp.length === 2, `«${bt.txt}»: deberían sonar 2 osciladores con rampa y hay ${osc.length}/${ramp.length}`);
  ramp.forEach((r, k) => {
    const f1 = fijos[2 * k], f2 = fijos[2 * k + 1];
    ok(f1 && Math.abs(f1.valor - hz(de)) < 0.01, `«${bt.txt}»: sale de ${f1 && f1.valor.toFixed(2)} Hz y debería salir de ${hz(de).toFixed(2)} Hz`);
    ok(Math.abs(r.valor - hz(a)) < 0.01, `«${bt.txt}»: llega a ${r.valor.toFixed(2)} Hz y debería llegar a ${hz(a).toFixed(2)} Hz`);
    ok(f2 && Math.abs((f2.cuando - f1.cuando) - hold1) < 0.001, `«${bt.txt}»: debería sostener la salida ${hold1} s`);
    ok(f2 && Math.abs((r.hasta - f2.cuando) - dur) < 0.001, `«${bt.txt}»: dura ${f2 && (r.hasta - f2.cuando).toFixed(3)} s y debería durar ${dur} s`);
  });
  const nombres = [...bt.txt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]);
  ok(nombres.length === 2 && pcNombre(nombres[0]) === ((de % 12) + 12) % 12 && pcNombre(nombres[1]) === ((a % 12) + 12) % 12, `«${bt.txt}»: los nombres no son las notas ${de} → ${a}`);
}

function audioPortamento(bt, ev) {
  const de = Number(bt.de), a = Number(bt.a), dur = Number(bt.dur), hold1 = 0.6;
  const osc = ev.filter((e) => e.tipo === 'oscilador'), curvas = ev.filter((e) => e.tipo === 'curva'), ramp = ev.filter((e) => e.tipo === 'rampa'), fijos = ev.filter((e) => e.tipo === 'fijar');
  ok(osc.length === 2 && curvas.length === 2 && ramp.length === 0, `«${bt.txt}»: deberían sonar 2 osciladores con curva suave (y ninguna rampa recta) y hay ${osc.length}/${curvas.length}/${ramp.length}`);
  curvas.forEach((cv, k) => {
    ok(Math.abs(cv.primero - hz(de)) < 0.01 && Math.abs(cv.ultimo - hz(a)) < 0.01, `«${bt.txt}»: la curva va de ${cv.primero.toFixed(2)} a ${cv.ultimo.toFixed(2)} Hz`);
    ok(Math.abs(cv.dur - dur) < 0.001 && fijos[k] && Math.abs((cv.cuando - fijos[k].cuando) - hold1) < 0.001, `«${bt.txt}»: no sostiene ${hold1} s y desliza ${dur} s`);
    const frac = (f) => Math.log(f / hz(de)) / Math.log(hz(a) / hz(de));
    ok(Math.abs(frac(cv.medio) - 0.5) < 0.01 && frac(cv.octavo) < 0.125 * 0.5, `«${bt.txt}»: la curva no es suave (mitad ${(frac(cv.medio) * 100).toFixed(0)} %, 1/8 ${(frac(cv.octavo) * 100).toFixed(1)} %)`);
  });
  const nombres = [...bt.txt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]);
  ok(nombres.length === 2 && pcNombre(nombres[0]) === de % 12 && pcNombre(nombres[1]) === a % 12, `«${bt.txt}»: los nombres no son las notas ${de} → ${a}`);
}

function audioVibrato(bt, ev) {
  const nota = Number(bt.nota), prof = Number(bt.prof), vel = Number(bt.vel), f = hz(nota);
  const osc = ev.filter((e) => e.tipo === 'oscilador'), mod = ev.filter((e) => e.tipo === 'modula'), fijos = ev.filter((e) => e.tipo === 'fijar');
  const lfo = osc.filter((o) => Math.abs(o.f - vel) < 1e-9 && o.tipoOnda === 'sine');
  if (prof === 0) {
    ok(osc.length === 2 && mod.length === 0, `«${bt.txt}»: sin vibrato debería haber 2 osciladores y ningún modulador (hay ${osc.length}/${mod.length})`);
  } else {
    ok(osc.length === 3 && mod.length === 2 && lfo.length === 1, `«${bt.txt}»: debería haber 2 osciladores de la nota, 1 lento de ${vel} Hz y 2 conexiones de modulación (hay ${osc.length} osciladores, ${lfo.length} lento, ${mod.length} modulaciones)`);
    const quiere = f * (Math.pow(2, prof / 1200) - 1);
    mod.forEach((m) => ok(Math.abs(m.amplitud - quiere) < 1e-6, `«${bt.txt}»: la amplitud de la modulación es ${m.amplitud.toFixed(4)} Hz y ±${prof} cents sobre ${f.toFixed(2)} Hz son ${quiere.toFixed(4)} Hz`));
    // la oscilación en cents que produce esa amplitud
    const cents = mod.length ? 1200 * Math.log2((f + mod[0].amplitud) / f) : NaN;
    ok(Math.abs(cents - prof) < 0.01, `«${bt.txt}»: la modulación produce ±${cents.toFixed(2)} cents y el botón dice ±${prof}`);
  }
  ok(fijos.length >= 2 && fijos.slice(0, 2).every((x) => Math.abs(x.valor - f) < 0.01), `«${bt.txt}»: la nota no es ${f.toFixed(2)} Hz (MIDI ${nota})`);
  ok(/La/.test(bt.txt) || /vibrato|trémolo|Nota|Rápido|Lento/i.test(bt.txt), 'etiqueta rara');
}

function audioRepetida(bt, ev) {
  const nota = Number(bt.nota), veces = Number(bt.veces), dur = Number(bt.dur);
  const osc = ev.filter((e) => e.tipo === 'oscilador'), golpes = ev.filter((e) => e.tipo === 'rampaL' && Math.abs(e.valor - VOL) < 1e-9);
  ok(osc.length === 2 && osc.every((o) => Math.abs(o.f - hz(nota)) < 0.01), `«${bt.txt}»: los osciladores deberían sonar a ${hz(nota).toFixed(2)} Hz`);
  ok(golpes.length === veces, `«${bt.txt}»: hay ${golpes.length} golpes y el botón dice ${veces}`);
  for (let k = 1; k < golpes.length; k++) ok(Math.abs((golpes[k].hasta - golpes[k - 1].hasta) - dur / veces) < 0.001, `«${bt.txt}»: los golpes ${k} y ${k + 1} están a ${(golpes[k].hasta - golpes[k - 1].hasta).toFixed(4)} s y deberían estar a ${(dur / veces).toFixed(4)} s`);
  const porSegundo = veces / dur;
  const dicho = /\((\d+) por segundo\)/.exec(bt.txt);
  ok(!dicho || Math.abs(Number(dicho[1]) - porSegundo) < 0.01, `«${bt.txt}»: dice ${dicho && dicho[1]} por segundo y son ${porSegundo}`);
}

function audioPiano(bt, ev, pagina) {
  const tokens = bt.eventos.trim().split(/\s+/).map((x) => x.split(':').map(Number));
  const mu = ev.filter((e) => e.tipo === 'muestra'), fin = ev.filter((e) => e.tipo === 'sostiene');
  const sonadas = mu.map((e) => (e.nombre ? midiDeFichero(e.nombre) + Math.round(12 * Math.log2(e.rate)) : null));
  ok(JSON.stringify(sonadas) === JSON.stringify(tokens.map((t) => t[0])), `«${bt.txt}»: suena ${JSON.stringify(sonadas.slice(0, 8))}… y el botón dice ${JSON.stringify(tokens.map((t) => t[0]).slice(0, 8))}…`);
  const t0 = mu.length ? mu[0].cuando : 0;
  tokens.forEach((t, i) => ok(mu[i] && Math.abs((mu[i].cuando - t0) - (t[1] - tokens[0][1])) < 0.002, `«${bt.txt}»: la nota ${i + 1} entra a los ${mu[i] && (mu[i].cuando - t0).toFixed(3)} s y el botón dice ${(t[1] - tokens[0][1]).toFixed(3)} s`));
  // fin de cada nota = cuando + duración (el módulo programa el sostenido en «end»)
  const finales = tokens.map((t) => t[1] + t[2]);
  fin.forEach((x, i) => ok(Math.abs((x.cuando - t0) - (finales[i] - tokens[0][1])) < 0.002, `«${bt.txt}»: la nota ${i + 1} acaba a los ${(x.cuando - t0).toFixed(3)} s y debería acabar a los ${(finales[i] - tokens[0][1]).toFixed(3)} s`));
  if (pagina === 'arpegiado') {
    const pcs = tokens.map((t) => t[0] % 12);
    ok(JSON.stringify(pcs.slice().sort((a, b) => a - b)) === JSON.stringify([0, 0, 4, 7]), `«${bt.txt}»: no son las notas de Do mayor (Do, Mi, Sol, Do)`);
    const inicios = tokens.map((t) => t[1]), notas = tokens.map((t) => t[0]);
    if (/bloque/i.test(bt.txt)) { ok(inicios.every((x) => x === inicios[0]), `«${bt.txt}»: las notas del bloque no entran a la vez`); ok(finales.every((x) => Math.abs(x - finales[0]) < 1e-9), `«${bt.txt}»: no acaban a la vez`); }
    if (/Arpegiado ascendente/.test(bt.txt)) { ok(notas.every((m, i) => i === 0 || m > notas[i - 1]), `«${bt.txt}»: no sube de la más grave a la más aguda`); ok(inicios.every((x, i) => i === 0 || x > inicios[i - 1]), `«${bt.txt}»: las notas no entran una tras otra`); ok(finales.every((x) => Math.abs(x - finales[0]) < 1e-9), `«${bt.txt}»: el arpegiado debería mantener las notas hasta el final (todas acaban a la vez)`); }
    if (/Arpegiado descendente/.test(bt.txt)) { ok(notas.every((m, i) => i === 0 || m < notas[i - 1]), `«${bt.txt}»: no baja de la más aguda a la más grave`); ok(inicios.every((x, i) => i === 0 || x > inicios[i - 1]), `«${bt.txt}»: las notas no entran una tras otra`); ok(finales.every((x) => Math.abs(x - finales[0]) < 1e-9), `«${bt.txt}»: no mantiene las notas hasta el final`); }
    if (/Arpegio \(nota a nota\)/.test(bt.txt)) { ok(notas.every((m, i) => i === 0 || m > notas[i - 1]), `«${bt.txt}»: no sube`); ok(tokens.every((t, i) => i === tokens.length - 1 || t[1] + t[2] <= tokens[i + 1][1] + 1e-9), `«${bt.txt}»: cada nota debería soltarse antes de entrar la siguiente`); }
    ok(!/arpegiado/i.test(bt.txt) || tokens.length === 4, `«${bt.txt}»: un acorde de cuatro notas`);
  }
  if (pagina === 'tremolo') {
    const alterna = tokens.every((t, i) => t[0] === (i % 2 === 0 ? 60 : 64));
    ok(alterna && /Do–Mi/.test(bt.txt), `«${bt.txt}»: debería alternar Do (60) y Mi (64)`);
    ok(tokens.every((t, i) => i === 0 || Math.abs((t[1] - tokens[i - 1][1]) - 0.0625) < 1e-9), `«${bt.txt}»: las notas deberían estar a 1/16 s (fusas a negra = 120)`);
    ok(tokens.slice(0, -1).every((t) => t[2] <= 2 * 0.0625 + 1e-9), `«${bt.txt}»: cada nota debería durar como mucho dos intervalos (0,125 s) para que el trémolo no se emborrone`);
  }
}

async function comprobarAudio(b, nombre, cfg) {
  const { p, errores } = await abre(b, `${B}${nombre}/`);
  if (SABOTAJE) await p.evaluate(() => { const bt = document.querySelector('.tm-gl-btn'); if (bt.dataset.a) bt.setAttribute('data-a', '71'); if (bt.dataset.prof) bt.setAttribute('data-prof', '40'); if (bt.dataset.eventos) bt.setAttribute('data-eventos', bt.dataset.eventos.replace('64:', '65:')); });
  const botones = await p.evaluate(() => [...document.querySelectorAll('.tm-gl-btn')].map((e, i) => ({ i, modo: e.dataset.modo, de: e.dataset.de, a: e.dataset.a, dur: e.dataset.dur, nota: e.dataset.nota, prof: e.dataset.prof, vel: e.dataset.vel, veces: e.dataset.veces, eventos: e.dataset.eventos, txt: e.textContent.trim() })));
  ok(botones.length === cfg.botones, `${nombre}: se esperaban ${cfg.botones} botones y hay ${botones.length}`);
  for (const bt of botones) {
    await p.evaluate(() => { window.__ev.length = 0; });
    await p.locator('.tm-gl-btn').nth(bt.i).click();
    await p.waitForTimeout(bt.modo === 'piano' ? 2000 : 700);
    const ev = await p.evaluate(() => window.__ev);
    if (bt.modo === 'continuo') audioContinuo(bt, ev);
    else if (bt.modo === 'portamento') audioPortamento(bt, ev);
    else if (bt.modo === 'vibrato') audioVibrato(bt, ev);
    else if (bt.modo === 'repetida') audioRepetida(bt, ev);
    else if (bt.modo === 'piano') audioPiano(bt, ev, nombre);
    else ok(false, `${nombre}: modo de botón desconocido «${bt.modo}»`);
    await p.locator('.tm-gl-btn').nth(bt.i).click(); await p.waitForTimeout(80);       // lo detiene para no solapar con el siguiente
  }
  // los números de los botones = los de los gráficos (misma tabla en el generador)
  const gra = leer('tools/gen-efectos-graficos.js');
  if (nombre === 'vibrato') {
    const tabla = [...gra.matchAll(/\{ id: '\w+', titulo: '[^']*', vel: ([\d.]+), prof: (\d+) \}/g)].map((m) => ({ vel: Number(m[1]), prof: Number(m[2]) }));
    botones.forEach((bt) => { ok(tabla.some((t) => t.vel === Number(bt.vel) && t.prof === Number(bt.prof)), `«${bt.txt}»: velocidad ${bt.vel} y ±${bt.prof} no están en el gráfico`); const m = /\(([\d,]+) oscilaciones\/s, ±(\d+) ¢\)/.exec(bt.txt); if (m) ok(Number(m[1].replace(',', '.')) === Number(bt.vel) && Number(m[2]) === Number(bt.prof), `«${bt.txt}»: la etiqueta no dice lo que hace el botón (${bt.vel} / s, ±${bt.prof})`); });
  }
  if (nombre === 'portamento') {
    const tabla = [...gra.matchAll(/\{ id: '(\w+)', titulo: '[^']*', tipo: '(\w+)', t0: ([\d.]+), dur: ([\d.]+) \}/g)].map((m) => ({ tipo: m[2], t0: Number(m[3]), dur: Number(m[4]) }));
    const cont = tabla.filter((t) => t.tipo !== 'suave'), suave = tabla.find((t) => t.tipo === 'suave');
    const modulo = leer('assets/js/efectos-audio.js'), hold = /tono\(hz\(de\), hz\(a\), cont \? ([\d.]+) : ([\d.]+)/.exec(modulo);
    botones.forEach((bt) => {
      const esPorta = bt.modo === 'portamento', t = esPorta ? suave : cont.find((c) => Math.abs(c.dur - Number(bt.dur)) < 1e-9);
      ok(!!t && Math.abs(t.dur - Number(bt.dur)) < 1e-9, `«${bt.txt}»: la duración ${bt.dur} s no está en el gráfico`);
      ok(!!t && Math.abs(t.t0 - Number(esPorta ? hold[2] : hold[1])) < 1e-9, `«${bt.txt}»: el gráfico empieza a deslizar a los ${t && t.t0} s y el audio sostiene ${esPorta ? hold[2] : hold[1]} s`);
    });
  }
  ok(errores.length === 0, `${nombre}: errores de consola: ${errores.slice(0, 2).join(' | ')}`);
  await p.close();
}

async function comprobarEnlaces(b, nombre, cfg) {
  const { p } = await abre(b, `${B}${nombre}/`);
  const hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('article a[href^="/"], .tm-related a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]))]);
  for (const h of hrefs) { const r = await p.request.get(BASE + h); ok(r.status() === 200, `${nombre}: el enlace ${h} responde ${r.status()}`); }
  for (const hno of cfg.hermanas) ok(hrefs.includes(`${B}${hno}/`), `${nombre}: no enlaza a su hermana ${hno}`);
  ok(hrefs.includes(B), `${nombre}: no enlaza al hub`);
  const html = leer(`diccionario-musical/efectos-de-ejecucion/${nombre}/index.html`);
  ok(/<a href="\/diccionario-musical\/">Diccionario Musical<\/a><span class="tm-crumb-sep">›<\/span><a href="\/diccionario-musical\/efectos-de-ejecucion\/">Efectos de ejecución<\/a><span class="tm-crumb-sep">›<\/span><span aria-current="page">/.test(html), `${nombre}: la miga de pan no es Diccionario › Efectos de ejecución › ${nombre}`);
  ok((html.match(/class="tm-credito-piano"/g) || []).length === (cfg.piano ? 1 : 0), `${nombre}: el crédito del piano ${cfg.piano ? 'falta o está repetido' : 'no debería estar (no suena piano)'}`);
  const piano = /data-modo="(piano|escalonado)"/.test(html);
  ok(piano === !!cfg.piano, `${nombre}: ${cfg.piano ? 'debería' : 'no debería'} tener botones de piano`);
  ok(/efectos-audio\.js/.test(html) && (!piano || /tm-piano-audio\.js/.test(html)), `${nombre}: faltan los scripts de audio`);
  await p.close();
  // entrantes
  const hub = leer('diccionario-musical/efectos-de-ejecucion/index.html');
  ok(new RegExp(`<a href="${B}${nombre}/">`).test(hub), `${nombre}: el hub no lo enlaza`);
  ok(leer('diccionario-musical/index.html').includes(`<a href="${B}${nombre}/">`), `${nombre}: el índice del diccionario no lo enlaza`);
  ok(leer('sitemap.xml').includes(`<loc>https://www.teoriamusical.com.es${B}${nombre}/</loc>`), `${nombre}: no está en el sitemap`);
  ok(fs.existsSync(path.join(RAIZ, `assets/img/og-pages/og-diccionario-musical-efectos-de-ejecucion-${nombre}.png`)), `${nombre}: falta la imagen para redes`);
  for (const hno of cfg.hermanas) ok(leer(`diccionario-musical/efectos-de-ejecucion/${hno}/index.html`).includes(`href="${B}${nombre}/"`) || hno === 'glissando' && leer('diccionario-musical/efectos-de-ejecucion/glissando/index.html').includes(`href="${B}${nombre}/"`), `${hno} no enlaza de vuelta a ${nombre}`);
}

/* Las preguntas frecuentes visibles y las del JSON-LD (FAQPage) son las mismas, palabra por palabra. */
function comprobarFaq(ruta) {
  const html = leer(ruta + '/index.html');
  const limpia = (t) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
  const visibles = [...html.matchAll(/<div class="tm-faq-q">([\s\S]*?)<\/div>\s*<div class="tm-faq-a">([\s\S]*?)<\/div>/g)].map((m) => [limpia(m[1]), limpia(m[2])]);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch (e) { return null; } }).find((j) => j && j['@type'] === 'FAQPage');
  ok(!!ld && visibles.length > 0, `${ruta}: faltan las preguntas visibles o el FAQPage`);
  if (!ld) return;
  const marcadas = ld.mainEntity.map((q) => [limpia(q.name), limpia(q.acceptedAnswer.text)]);
  ok(JSON.stringify(visibles) === JSON.stringify(marcadas), `${ruta}: las preguntas visibles y el JSON-LD no coinciden (${visibles.length} frente a ${marcadas.length})`);
}

/* Arpegiado: lo que describe la página es ESTE ejemplo, no una regla universal. */
function comprobarArpegiado() {
  const html = leer('diccionario-musical/efectos-de-ejecucion/arpegiado/index.html'), t = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  ok(/en este ejemplo/.test(t), 'arpegiado: no deja claro que lo de mantener las notas es «en este ejemplo»');
  ok(!/arpegiado va de abajo arriba/.test(t) && /Habitualmente el arpegiado asciende/.test(t), 'arpegiado: el sentido debería decirse con «habitualmente»');
  ok(!/calidez/.test(t), 'arpegiado: «calidez» es una valoración subjetiva');
  ok(/<title>Acorde arpegiado: qué es y cómo se escribe/.test(html), 'arpegiado: el título no es el acordado');
  ok(!/pequeña escalera/.test(t) && !/hace algo parecido con una escala/.test(t), 'arpegiado: sigue la comparación de la escalera con el glissando');
}

/* Trémolo: las rayas son la subdivisión (medido) y existe el no medido; el audio sintético es una demostración, no un trémolo de arco; la palanca de trémolo. */
function comprobarTremolo() {
  const html = leer('diccionario-musical/efectos-de-ejecucion/tremolo/index.html'), t = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  ok(/trémolo no medido/.test(t) && /subdivisión rítmica/.test(t), 'trémolo: falta la distinción entre trémolo medido y no medido');
  ok(!/no importa contarlas con exactitud/.test(t), 'trémolo: sigue diciendo que no importa contar las repeticiones');
  ok(/demostración del mecanismo, no una recreación del trémolo de arco/.test(t), 'trémolo: no aclara que el audio sintético no recrea el trémolo de arco');
  ok(/modifica la tensión de las cuerdas y cambia su altura/.test(t) && !/es decir, hace un vibrato/.test(t), 'trémolo: la palanca de trémolo no está descrita con el matiz');
  ok(/en fusas durante el valor conjunto de una redonda/.test(t), 'trémolo: falta la lectura del trémolo alternado (valor conjunto de una redonda)');
}

/* Vibrato: ni «normal» ni valores presentados como universales; la técnica depende del instrumento; el afinador. */
function comprobarVibrato() {
  const html = leer('diccionario-musical/efectos-de-ejecucion/vibrato/index.html'), t = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  ok(/Vibrato medio/.test(t) && /Lento y muy ancho/.test(t) && !/Vibrato normal|Lento y ancho/.test(t), 'vibrato: los nombres de los ejemplos deberían ser «medio» y «lento y muy ancho»');
  ok(/alrededor de una altura principal/.test(t) && !/calidad con la que suena/.test(t), 'vibrato: la definición debería hablar de una altura principal');
  ok(/depende del instrumento/.test(t) && !/nace de la laringe/.test(t), 'vibrato: la técnica por instrumento no debería presentarse como única');
  ok(/en lugar de intentar que la aguja permanezca inmóvil/.test(t) && !/altura media/.test(t), 'vibrato: la frase de la afinación debería ser la matizada');
  ok(/normalmente la superior/.test(t), 'vibrato: el trino debería decir «normalmente la superior»');
  ok(/El último ejemplo usa un vibrato especialmente ancho/.test(t), 'vibrato: falta explicar que el último ejemplo es deliberadamente ancho');
}

async function comprobarMovil(b, nombre) {
  const { p } = await abre(b, `${B}${nombre}/`, 390);
  const r = await p.evaluate(() => ({ sx: document.documentElement.scrollWidth, cx: document.documentElement.clientWidth }));
  ok(r.sx <= r.cx, `${nombre}: en móvil la página desborda (${r.sx} > ${r.cx})`);
  await p.close();
}

(async () => {
  const antes = {};
  for (const f of ['assets/img/notacion/efectos', 'assets/img/efectos']) for (const n of fs.readdirSync(path.join(RAIZ, f))) antes[f + '/' + n] = fs.readFileSync(path.join(RAIZ, f, n));
  execFileSync('node', [path.join(__dirname, 'gen-efectos-figuras.js')], { cwd: RAIZ, stdio: 'pipe' });
  execFileSync('node', [path.join(__dirname, 'gen-efectos-graficos.js')], { cwd: RAIZ, stdio: 'pipe' });
  for (const [k, v] of Object.entries(antes)) ok(fs.readFileSync(path.join(RAIZ, k)).equals(v), `${k} no está al día: regenerarlo cambia el SVG`);
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  for (const [nombre, cfg0] of Object.entries(PAGINAS)) {
    const cfg = Object.assign({}, cfg0, { piano: nombre === 'arpegiado' || nombre === 'tremolo' });
    comprobarFiguras(leer(`diccionario-musical/efectos-de-ejecucion/${nombre}/index.html`), nombre, cfg);
    await comprobarAudio(b, nombre, cfg);
    await comprobarEnlaces(b, nombre, cfg);
    await comprobarMovil(b, nombre);
    console.log(`  ${nombre}: revisado`);
  }
  for (const r of ['', '/glissando', '/arpegiado', '/portamento', '/vibrato', '/tremolo']) comprobarFaq('diccionario-musical/efectos-de-ejecucion' + r);
  comprobarArpegiado();
  comprobarTremolo();
  comprobarVibrato();
  // enlaces desde otras páginas
  for (const [pg, esperados] of Object.entries({ 'diccionario-musical/notas-de-la-viola': ['vibrato'], 'diccionario-musical/notas-del-violin': ['vibrato', 'portamento'], 'diccionario-musical/notas-del-vibrafono': ['tremolo', 'vibrato'], 'diccionario-musical/articulacion-musical': ['portamento'], 'diccionario-musical/instrumentos-de-cuerda-frotada': ['vibrato', 'glissando'] })) {
    for (const e of esperados) ok(leer(pg + '/index.html').includes(`href="${B}${e}/"`), `${pg} no enlaza a ${e}`);
  }
  await b.close();
  console.log(`\n${comprobaciones} comprobaciones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir varios)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
