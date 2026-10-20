'use strict';
/**
 * Comprueba la página /diccionario-musical/glissando/:
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/test-glissando.js [--puerto=8910] [--sabotaje]
 *
 * 1. FIGURAS: las dos imágenes existen, sus medidas width/height son las del SVG, el texto alternativo es el del generador y las
 *    figuras están regeneradas (se vuelve a ejecutar el generador y no cambia ni un byte).
 * 2. AUDIO, midiendo lo que SUENA (se interceptan los osciladores, sus rampas de frecuencia y las muestras de piano):
 *    - continuo: sostiene la nota de salida 0,5 s, desliza en la duración dicha hasta la nota de llegada y la sostiene, con la
 *      frecuencia exacta de data-de y data-a; portamento igual con 0,6 s y 0,2 s;
 *    - escalonado: las notas que suenan son las del atributo (calculadas aparte desde sus nombres), una cada 1/32 de redonda;
 *    - lo que DICE cada botón (nombres de nota, «sube/baja», «una octava», «5ª») coincide con lo que toca.
 * 3. TEORÍA DEL TEXTO: las teclas blancas son la escala de Do mayor, las negras son las cinco notas que cita el texto (pentatónica).
 * 4. ENLACES: todos los enlaces internos de la página responden 200, y la página está enlazada desde el índice del diccionario, desde
 *    las páginas que hablan del glissando, y está en el sitemap.
 * 5. Sin desbordamiento horizontal en móvil y sin errores de consola.
 * --sabotaje: se cambia una frecuencia de llegada, un nombre de nota y una cifra del texto, y se comprueba que se detecta.
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
const URL = '/diccionario-musical/efectos-de-ejecucion/glissando/';
const PAG = 'diccionario-musical/efectos-de-ejecucion/glissando/index.html';
const HUB = 'diccionario-musical/efectos-de-ejecucion/index.html';
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 40) console.log('  ✗ ' + m); } };

const PC = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
const LET = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const midiDeClave = (k) => { const m = /^([a-g])(#|b)?\/(\d)$/.exec(k); return LET[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (Number(m[3]) + 1) * 12; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const pcNombre = (n) => { const m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭]?)$/.exec(n); return m ? (PC[m[1]] + (m[2] === '♯' ? 1 : m[2] === '♭' ? -1 : 0) + 12) % 12 : null; };
const midiDeFichero = (n) => { const m = /^([A-G])(s?)(\d)$/.exec(n); return { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12; };

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
  const er = AudioParam.prototype.exponentialRampToValueAtTime, sv = AudioParam.prototype.setValueAtTime, sc = AudioParam.prototype.setValueCurveAtTime, lr = AudioParam.prototype.linearRampToValueAtTime, os = OscillatorNode.prototype.stop;
  AudioParam.prototype.exponentialRampToValueAtTime = function (v, t) { if (v > 20) window.__ev.push({ tipo: 'rampa', valor: v, hasta: t }); else if (v === 0.0001) window.__ev.push({ tipo: 'fundido', hasta: t }); return er.apply(this, arguments); };
  AudioParam.prototype.setValueCurveAtTime = function (vals, t, d) { const n = vals.length - 1; window.__ev.push({ tipo: 'curva', primero: vals[0], ultimo: vals[n], medio: vals[n >> 1], octavo: vals[Math.round(n / 8)], n: n, cuando: t, dur: d }); return sc.apply(this, arguments); };
  AudioParam.prototype.linearRampToValueAtTime = function (v, t) { window.__ev.push({ tipo: 'rampaL', valor: v, hasta: t }); return lr.apply(this, arguments); };
  OscillatorNode.prototype.stop = function (t) { window.__ev.push({ tipo: 'stop', cuando: t }); return os.apply(this, arguments); };
  AudioParam.prototype.setValueAtTime = function (v, t) { if (v > 20) window.__ev.push({ tipo: 'fijar', valor: v, cuando: t }); return sv.apply(this, arguments); };
  const so = OscillatorNode.prototype.start;
  OscillatorNode.prototype.start = function (when) { window.__ev.push({ tipo: 'oscilador', cuando: when }); return so.apply(this, arguments); };
};

/* El gráfico del portamento (salto directo / portamento / glissando) se reutiliza en el glissando, el hub y la página del portamento, y sus cifras son las de los botones. */
function comprobarGraficoPortamento() {
  const gra = leer('tools/gen-efectos-graficos.js'), alt = /const ALT_PORTAMENTO = '([^']*)'/.exec(gra);
  const svg = leer('assets/img/efectos/portamento-curvas.svg'), w = /<svg[^>]*\swidth="(\d+)"/.exec(svg), h = /<svg[^>]*\sheight="(\d+)"/.exec(svg);
  for (const ruta of [PAG, HUB, 'diccionario-musical/efectos-de-ejecucion/portamento/index.html']) {
    const img = /<img src="\/assets\/img\/efectos\/portamento-curvas\.svg" width="(\d+)" height="(\d+)" alt="([^"]*)"/.exec(leer(ruta));
    ok(!!img, `${ruta}: no incrusta el gráfico del portamento`);
    if (img) ok(alt && alt[1] === img[3] && Number(img[1]) === Number(w[1]) && Number(img[2]) === Number(h[1]), `${ruta}: el gráfico del portamento no coincide con el SVG ni con su alt`);
  }
  // los botones del glissando dicen lo mismo que el gráfico: salto directo, portamento y glissando con sus duraciones
  const tabla = [...gra.matchAll(/\{ id: '(\w+)', titulo: '[^']*', tipo: '(\w+)', t0: ([\d.]+), dur: ([\d.]+) \}/g)].map((m) => ({ tipo: m[2], dur: Number(m[4]) }));
  const html = leer(PAG), duraciones = [...html.matchAll(/data-modo="(continuo|portamento)" data-de="60" data-a="64" data-dur="([\d.]+)"/g)].map((m) => Number(m[2]));
  ok(JSON.stringify(duraciones) === JSON.stringify(tabla.map((t) => t.dur)), `los botones del glissando (${duraciones}) no coinciden con las duraciones del gráfico (${tabla.map((t) => t.dur)})`);
}

function comprobarFiguras() {
  comprobarGraficoPortamento();
  const html = leer(PAG);
  const gen = leer('tools/gen-glissando-figuras.js');
  for (const nombre of ['ascendente', 'descendente']) {
    const f = `assets/img/notacion/glissando/${nombre}.svg`;
    ok(fs.existsSync(path.join(RAIZ, f)), `${f} no existe`);
    if (!fs.existsSync(path.join(RAIZ, f))) continue;
    const svg = leer(f);
    const w = /<svg[^>]*\swidth="(\d+)px?"/.exec(svg) || /<svg[^>]*\swidth="(\d+)"/.exec(svg), h = /<svg[^>]*\sheight="(\d+)px?"/.exec(svg) || /<svg[^>]*\sheight="(\d+)"/.exec(svg);
    const img = new RegExp(`<img src="/${f.replace(/[/.]/g, (c) => '\\' + c)}" width="(\\d+)" height="(\\d+)" alt="([^"]*)"`).exec(html);
    ok(!!img, `la página no incrusta ${f}`);
    if (!img) continue;
    ok(w && h && Number(img[1]) === Number(w[1]) && Number(img[2]) === Number(h[1]), `${nombre}: la página dice ${img[1]}×${img[2]} y el SVG mide ${w && w[1]}×${h && h[1]}`);
    const altGen = new RegExp(`${nombre}: \\{[^}]*alt: '([^']*)'`).exec(gen);
    ok(altGen && altGen[1] === img[3], `${nombre}: el alt de la página no es el del generador`);
  }
  // la figura «piano»: escrito + lo que suena; mide lo que dice la página y el alt es el del generador
  {
    const f = 'assets/img/notacion/glissando/piano.svg';
    ok(fs.existsSync(path.join(RAIZ, f)), 'piano.svg no existe');
    if (fs.existsSync(path.join(RAIZ, f))) {
      const svg = leer(f), w = /<svg[^>]*\swidth="(\d+)"/.exec(svg), h = /<svg[^>]*\sheight="(\d+)"/.exec(svg);
      const img = /<img src="\/assets\/img\/notacion\/glissando\/piano\.svg" width="(\d+)" height="(\d+)" alt="([^"]*)"/.exec(html);
      ok(!!img, 'la página no incrusta piano.svg');
      if (img) {
        ok(w && h && Number(img[1]) === Number(w[1]) && Number(img[2]) === Number(h[1]), `piano: la página dice ${img[1]}×${img[2]} y el SVG mide ${w && w[1]}×${h && h[1]}`);
        const altGen = /const ALT_PIANO = '([^']*)'/.exec(gen);
        ok(altGen && altGen[1] === img[3], 'piano: el alt de la página no es el del generador');
      }
    }
  }
  // figuras al día: regenerarlas no cambia nada
  const antes = ['ascendente', 'descendente', 'piano'].map((n) => fs.readFileSync(path.join(RAIZ, `assets/img/notacion/glissando/${n}.svg`)));
  execFileSync('node', [path.join(__dirname, 'gen-glissando-figuras.js')], { cwd: RAIZ, stdio: 'pipe' });
  const despues = ['ascendente', 'descendente', 'piano'].map((n) => fs.readFileSync(path.join(RAIZ, `assets/img/notacion/glissando/${n}.svg`)));
  ok(antes.every((b, i) => b.equals(despues[i])), 'las figuras no están al día: regenerarlas cambia los SVG');
}

async function abre(b, ancho = 1100) {
  const p = await b.newPage({ viewport: { width: ancho, height: 900 } });
  await p.addInitScript(INSTRUMENTACION);
  const errores = []; p.on('pageerror', (e) => errores.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/consent|adsbygoogle|googlesyndication|googletagmanager|ERR_FAILED|Failed to load resource/.test(m.text())) errores.push(m.text()); });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${URL}`, { waitUntil: 'load' });
  await p.waitForTimeout(600);
  return { p, errores };
}

async function comprobarAudio(b) {
  const { p, errores } = await abre(b);
  if (SABOTAJE) await p.evaluate(() => { const bt = document.querySelector('.tm-gl-btn[data-modo=continuo]'); bt.setAttribute('data-a', '71'); document.querySelectorAll('.tm-gl-btn')[1].textContent = '▶ Re → Do (baja una 5ª)'; });
  const botones = await p.evaluate(() => [...document.querySelectorAll('.tm-gl-btn')].map((e, i) => ({ i, modo: e.dataset.modo, de: e.dataset.de, a: e.dataset.a, dur: e.dataset.dur, melodia: e.dataset.melodia, bpm: e.dataset.bpm, txt: e.textContent.trim() })));
  ok(botones.length === 7, `se esperaban 7 botones de audio y hay ${botones.length}`);
  for (const bt of botones) {
    await p.evaluate(() => { window.__ev.length = 0; });
    await p.locator('.tm-gl-btn').nth(bt.i).click();
    await p.waitForTimeout(bt.modo === 'escalonado' ? 2200 : 700);
    const ev = await p.evaluate(() => window.__ev);
    if (bt.modo === 'continuo' || bt.modo === 'portamento') {
      const de = Number(bt.de), a = Number(bt.a), dur = Number(bt.dur), hold1 = bt.modo === 'continuo' ? 0.5 : 0.6;
      const osc = ev.filter((e) => e.tipo === 'oscilador'), ramp = ev.filter((e) => e.tipo === 'rampa'), fijos = ev.filter((e) => e.tipo === 'fijar');
      if (bt.modo === 'continuo') {
        ok(osc.length === 2 && ramp.length === 2, `«${bt.txt}»: deberían sonar 2 osciladores con rampa y hay ${osc.length}/${ramp.length}`);
        ramp.forEach((r, k) => {
          const f1 = fijos[2 * k], f2 = fijos[2 * k + 1];
          ok(f1 && Math.abs(f1.valor - hz(de)) < 0.01, `«${bt.txt}»: sale de ${f1 && f1.valor.toFixed(2)} Hz y debería salir de ${hz(de).toFixed(2)} Hz (MIDI ${de})`);
          ok(Math.abs(r.valor - hz(a)) < 0.01, `«${bt.txt}»: llega a ${r.valor.toFixed(2)} Hz y debería llegar a ${hz(a).toFixed(2)} Hz (MIDI ${a})`);
          ok(f2 && Math.abs(f2.valor - hz(de)) < 0.01 && Math.abs((f2.cuando - f1.cuando) - hold1) < 0.001, `«${bt.txt}»: debería sostener la nota de salida ${hold1} s`);
          ok(f2 && Math.abs((r.hasta - f2.cuando) - dur) < 0.001, `«${bt.txt}»: el deslizamiento dura ${f2 && (r.hasta - f2.cuando).toFixed(3)} s y debería durar ${dur} s`);
        });
      } else {
        // PORTAMENTO: no es un glissando acelerado: mismo recorrido en cents, pero con curva suave (sale despacio, acelera y frena al llegar)
        const curvas = ev.filter((e) => e.tipo === 'curva');
        ok(osc.length === 2 && curvas.length === 2 && ramp.length === 0, `«${bt.txt}»: deberían sonar 2 osciladores con curva suave y hay ${osc.length}/${curvas.length} (y ${ramp.length} rampas rectas)`);
        curvas.forEach((cv, k) => {
          const f1 = fijos[k];
          ok(Math.abs(cv.primero - hz(de)) < 0.01 && Math.abs(cv.ultimo - hz(a)) < 0.01, `«${bt.txt}»: la curva va de ${cv.primero.toFixed(2)} a ${cv.ultimo.toFixed(2)} Hz y debería ir de ${hz(de).toFixed(2)} a ${hz(a).toFixed(2)}`);
          ok(Math.abs(cv.dur - dur) < 0.001, `«${bt.txt}»: la curva dura ${cv.dur} s y debería durar ${dur} s`);
          ok(f1 && Math.abs(f1.valor - hz(de)) < 0.01 && Math.abs((cv.cuando - f1.cuando) - hold1) < 0.001, `«${bt.txt}»: debería sostener la nota de salida ${hold1} s antes de deslizar`);
          const frac = (f) => Math.log(f / hz(de)) / Math.log(hz(a) / hz(de));      // fracción del recorrido en cents
          ok(Math.abs(frac(cv.medio) - 0.5) < 0.01, `«${bt.txt}»: a mitad de tiempo lleva ${(frac(cv.medio) * 100).toFixed(0)} % del recorrido y debería llevar el 50 %`);
          ok(frac(cv.octavo) < 0.125 * 0.5, `«${bt.txt}»: al 1/8 del tiempo lleva ${(frac(cv.octavo) * 100).toFixed(1)} % del recorrido: no sale despacio (curva suave)`);
        });
      }
      // lo que DICE el botón
      const nombres = [...bt.txt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]);
      ok(nombres.length === 2 && pcNombre(nombres[0]) === ((de % 12) + 12) % 12 && pcNombre(nombres[1]) === ((a % 12) + 12) % 12, `«${bt.txt}»: los nombres no son las notas ${de} → ${a}`);
      if (/sube/.test(bt.txt)) ok(a > de, `«${bt.txt}» dice que sube y ${de} → ${a} baja`);
      if (/baja/.test(bt.txt)) ok(a < de, `«${bt.txt}» dice que baja y ${de} → ${a} sube`);
      if (/octava/.test(bt.txt)) ok(Math.abs(a - de) === 12, `«${bt.txt}» dice una octava y son ${Math.abs(a - de)} semitonos`);
      if (/5ª/.test(bt.txt)) ok(Math.abs(a - de) === 7, `«${bt.txt}» dice una 5ª y son ${Math.abs(a - de)} semitonos`);
    } else {
      const claves = bt.melodia.trim().split(/\s+/).map((t) => t.split(':')[0]);
      const esperadas = claves.map(midiDeClave);
      const mu = ev.filter((e) => e.tipo === 'muestra');
      const sonadas = mu.map((e) => (e.nombre ? midiDeFichero(e.nombre) + Math.round(12 * Math.log2(e.rate)) : null));
      ok(JSON.stringify(sonadas) === JSON.stringify(esperadas), `«${bt.txt}»: suena ${JSON.stringify(sonadas)} y el atributo dice ${JSON.stringify(esperadas)}`);
      const paso = 0.125 * 60 / Number(bt.bpm);
      for (let k = 1; k < claves.length - 1 && mu.length === claves.length; k++) ok(Math.abs((mu[k].cuando - mu[k - 1].cuando) - paso) < 0.002, `«${bt.txt}»: las notas ${k} y ${k + 1} están a ${(mu[k].cuando - mu[k - 1].cuando).toFixed(3)} s y deberían estar a ${paso.toFixed(3)} s`);
      // teoría: blancas = escala de Do mayor; negras = las cinco notas que cita el texto
      const nat = claves.slice(0, -1).every((k) => /^[a-g]\/\d$/.test(k)), suste = claves.every((k) => /^[a-g]#\/\d$/.test(k));
      if (/blancas/.test(bt.txt)) {
        ok(nat && JSON.stringify(esperadas.slice(0, -1).map((m) => m % 12)) === JSON.stringify([0, 2, 4, 5, 7, 9, 11]) && esperadas[esperadas.length - 1] === esperadas[0] + 12, `«${bt.txt}»: no es la escala de Do mayor de Do a Do`);
      }
      if (/negras/.test(bt.txt)) {
        ok(suste && new Set(esperadas.map((m) => m % 12)).size === 5 && [...new Set(esperadas.map((m) => m % 12))].sort((x, y) => x - y).join() === [1, 3, 6, 8, 10].join(), `«${bt.txt}»: no son las cinco teclas negras`);
        const citadas = (leer(PAG).match(/\(Fa♯, Sol♯, La♯, Do♯, Re♯\)/) || [])[0];
        ok(!!citadas && ['Fa♯', 'Sol♯', 'La♯', 'Do♯', 'Re♯'].map(pcNombre).sort((x, y) => x - y).join() === [1, 3, 6, 8, 10].join(), 'el texto de las teclas negras no cita las cinco notas correctas');
      }
    }
  }
  ok(errores.length === 0, `errores de consola: ${errores.slice(0, 2).join(' | ')}`);
  await p.close();
}

/* Solo suena un ejemplo a la vez; pulsar otro corta el anterior; volver a pulsar el que suena lo detiene; los estados aria-pressed dicen la verdad. */
async function comprobarControl(b) {
  const { p, errores } = await abre(b);
  const estados = () => p.evaluate(() => [...document.querySelectorAll('.tm-gl-btn')].map((e) => e.getAttribute('aria-pressed') + ':' + e.classList.contains('tm-gl-sonando')));
  const ev = () => p.evaluate(() => window.__ev);
  const btn = (i) => p.locator('.tm-gl-btn').nth(i);
  // 0 y 1 = continuos (2 s), 2 y 3 = piano
  await p.evaluate(() => { window.__ev.length = 0; });
  await btn(0).click(); await p.waitForTimeout(300);
  let st = await estados();
  ok(st[0] === 'true:true' && st.filter((x) => x === 'true:true').length === 1, `tras pulsar el 1.º solo debería estar activo el 1.º: ${st}`);
  const inicioA = (await ev()).filter((e) => e.tipo === 'oscilador')[0].cuando;
  await btn(1).click(); await p.waitForTimeout(200);
  st = await estados();
  ok(st[0] === 'false:false' && st[1] === 'true:true' && st.filter((x) => x === 'true:true').length === 1, `al pulsar el 2.º se debería apagar el 1.º: ${st}`);
  let e2 = await ev();
  const paradasA = e2.filter((e) => e.tipo === 'stop' && e.cuando < inicioA + 1.5);
  ok(paradasA.length >= 2, `al pulsar otro botón no se paran los 2 osciladores del anterior (paradas anticipadas: ${paradasA.length})`);
  ok(e2.some((e) => e.tipo === 'fundido' && e.hasta < inicioA + 1.5), 'al cortar el anterior no hay fundido de salida');
  // volver a pulsar el que suena lo detiene
  await p.evaluate(() => { window.__ev.length = 0; });
  await btn(1).click(); await p.waitForTimeout(150);
  st = await estados();
  ok(st.every((x) => x === 'false:false'), `al pulsar otra vez el que suena debería detenerse y no quedar ninguno activo: ${st}`);
  ok((await ev()).filter((e) => e.tipo === 'stop').length >= 2, 'al detenerlo no se paran los osciladores');
  // piano: pulsar y parar al instante no deja sonar nada; después de parar, el siguiente ejemplo suena
  await p.evaluate(() => { window.__ev.length = 0; const b = document.querySelectorAll('.tm-gl-btn')[2]; b.click(); b.click(); });
  await p.waitForTimeout(1500);
  ok((await ev()).filter((e) => e.tipo === 'muestra').length === 0, 'pulsar y parar el piano al instante no debería dejar sonar ninguna nota');
  await p.evaluate(() => { window.__ev.length = 0; });
  await btn(2).click(); await p.waitForTimeout(900);
  ok((await ev()).filter((e) => e.tipo === 'muestra').length === 8, 'después de parar, el piano no suena entero');
  st = await estados(); ok(st[2] === 'true:true', `el piano debería figurar como activo mientras suena: ${st}`);
  await btn(0).click(); await p.waitForTimeout(150);
  st = await estados();
  ok(st[0] === 'true:true' && st[2] === 'false:false', `al pasar del piano al glissando se debería apagar el piano: ${st}`);
  ok((await ev()).some((e) => e.tipo === 'rampaL' && e.valor === 0), 'al cortar el piano no se apaga su salida con un fundido');
  // al terminar, el botón se apaga solo
  await p.waitForTimeout(3800);
  st = await estados(); ok(st.every((x) => x === 'false:false'), `al acabar el sonido deberían apagarse los botones: ${st}`);
  // atributos que faltan: no se programa nada inválido
  await p.evaluate(() => { window.__ev.length = 0; const b = document.querySelectorAll('.tm-gl-btn')[0]; b.removeAttribute('data-a'); });
  await btn(0).click(); await p.waitForTimeout(300);
  const e3 = await ev();
  ok(e3.filter((e) => e.tipo === 'oscilador' || e.tipo === 'rampa').length === 0, 'con un atributo que falta se ha programado un sonido');
  st = await estados(); ok(st.every((x) => x === 'false:false'), `con un atributo que falta el botón no debería quedar activo: ${st}`);
  ok(errores.length === 0, `errores de consola: ${errores.slice(0, 2).join(' | ')}`);
  await p.close();
}

async function comprobarEnlaces(b) {
  const { p } = await abre(b);
  const hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('article a[href^="/"], .tm-related a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]))]);
  for (const h of hrefs) { const r = await p.request.get(BASE + h); ok(r.status() === 200, `el enlace ${h} responde ${r.status()}`); }
  await p.close();
  const index = leer('diccionario-musical/index.html');
  ok(/class="tm-card-dic-titulo" href="\/diccionario-musical\/efectos-de-ejecucion\/">Efectos de Ejecución<\/a>/.test(index) && /<div class="tm-card-dic-sub"><a href="\/diccionario-musical\/efectos-de-ejecucion\/glissando\/">Glissando<\/a>/.test(index), 'el índice del diccionario no tiene la tarjeta de efectos de ejecución con el subenlace al glissando');
  ok(!index.includes('href="/diccionario-musical/glissando/"'), 'el índice todavía enlaza a la URL antigua /diccionario-musical/glissando/');
  for (const pg of ['diccionario-musical/instrumentos-de-viento-metal', 'diccionario-musical/notas-del-trombon', 'diccionario-musical/notas-de-la-viola', 'diccionario-musical/notas-del-violin', 'diccionario-musical/tonalidades/escala-de-blues', 'juegos/entonacion/lanzamiento-de-jabalina']) {
    ok(leer(pg + '/index.html').includes('href="/diccionario-musical/efectos-de-ejecucion/glissando/"'), `${pg} no enlaza a glissando`);
    ok(!leer(pg + '/index.html').includes('href="/diccionario-musical/glissando/"'), `${pg} enlaza a la URL antigua del glissando`);
  }
  const sm = leer('sitemap.xml');
  ok(sm.includes('<loc>https://www.teoriamusical.com.es/diccionario-musical/efectos-de-ejecucion/glissando/</loc>') && sm.includes('<loc>https://www.teoriamusical.com.es/diccionario-musical/efectos-de-ejecucion/</loc>'), 'el glissando y su hub no están los dos en el sitemap');
  ok(!sm.includes('/diccionario-musical/glissando/'), 'el sitemap conserva la URL antigua del glissando');
  ok(!fs.existsSync(path.join(RAIZ, 'diccionario-musical/glissando')), 'queda la carpeta antigua diccionario-musical/glissando');
}

/* El hub «Efectos de ejecución» y la jerarquía: miga de pan, enlaces cruzados y la tabla. */
async function comprobarHub(b) {
  const hub = leer(HUB), gl = leer(PAG);
  ok(/<a href="\/diccionario-musical\/">Diccionario Musical<\/a><span class="tm-crumb-sep">›<\/span><a href="\/diccionario-musical\/efectos-de-ejecucion\/">Efectos de ejecución<\/a><span class="tm-crumb-sep">›<\/span><span aria-current="page">Glissando<\/span>/.test(gl), 'la miga de pan del glissando no es Diccionario › Efectos de ejecución › Glissando');
  ok(/<a href="\/diccionario-musical\/efectos-de-ejecucion\/glissando\/">Glissando<\/a>/.test(hub), 'el hub no enlaza al glissando desde la tabla');
  ok(/href="\/diccionario-musical\/efectos-de-ejecucion\/"/.test(gl.replace(/<nav[\s\S]*?<\/nav>/, '').replace(/<div class="tm-crumbs?[\s\S]*?<\/div>/, '')), 'la página del glissando no enlaza al hub desde su contenido');
  const filas = [...hub.matchAll(/<tr><td><strong>(?:<a [^>]*>)?([^<]+)(?:<\/a>)?<\/strong><\/td>/g)].map((m) => m[1]);
  ok(JSON.stringify(filas) === JSON.stringify(['Glissando', 'Portamento', 'Arpegiado', 'Vibrato', 'Trémolo']), `la tabla del hub tiene ${JSON.stringify(filas)}`);
  ok(/piano/.test(hub) && /violín|trombón/.test(hub) && /continuo/.test(gl) && /escalonado/.test(gl), 'el hub y la página del glissando no recogen que el resultado depende del instrumento (piano frente a violín/trombón)');
  ok(!/por todas las alturas intermedias/.test(hub), 'el hub todavía define el glissando «por todas las alturas intermedias» (no sirve para el piano)');
  ok(/glissando y portamento/i.test(hub.replace(/<[^>]+>/g, '')), 'el hub no tiene la pregunta sobre glissando y portamento');
  const p2 = await b.newPage();
  await p2.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  const r = await p2.goto(`${BASE}/diccionario-musical/efectos-de-ejecucion/`, { waitUntil: 'load' });
  ok(r.status() === 200, `el hub responde ${r.status()}`);
  const hrefs = await p2.evaluate(() => [...new Set([...document.querySelectorAll('article a[href^="/"], .tm-related a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]))]);
  for (const h of hrefs) { const rr = await p2.request.get(BASE + h); ok(rr.status() === 200, `el enlace ${h} del hub responde ${rr.status()}`); }
  const ov = await p2.evaluate(() => ({ sx: document.documentElement.scrollWidth, cx: document.documentElement.clientWidth }));
  ok(ov.sx <= ov.cx, 'el hub desborda en horizontal');
  await p2.setViewportSize({ width: 390, height: 800 });
  const om = await p2.evaluate(() => ({ sx: document.documentElement.scrollWidth, cx: document.documentElement.clientWidth }));
  ok(om.sx <= om.cx, `el hub desborda en móvil (${om.sx} > ${om.cx})`);
  await p2.close();
}

async function comprobarMovil(b) {
  const { p } = await abre(b, 390);
  const r = await p.evaluate(() => ({ sx: document.documentElement.scrollWidth, cx: document.documentElement.clientWidth }));
  ok(r.sx <= r.cx, `en móvil la página desborda (${r.sx} > ${r.cx})`);
  await p.close();
}

(async () => {
  comprobarFiguras();
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  await comprobarAudio(b);
  await comprobarControl(b);
  await comprobarEnlaces(b);
  await comprobarHub(b);
  await comprobarMovil(b);
  await b.close();
  console.log(`\n${comprobaciones} comprobaciones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir varios)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
