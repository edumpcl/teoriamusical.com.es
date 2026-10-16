'use strict';
/**
 * Comprueba que el ▶ de cada figura con melodía (figure[data-tm-melody]) TOCA LAS NOTAS QUE DICE EL ATRIBUTO.
 *
 *   node tools/verificar-melodias-audio.js                 # todas las páginas que tienen data-tm-melody
 *   node tools/verificar-melodias-audio.js ruta1 ruta2     # solo esas (p. ej. /diccionario-musical/intervalos/tono-y-semitono/)
 *   (necesita un servidor estático en la raíz: python -m http.server 8080 o node tools/servidor-estatico.js; --puerto=N)
 *
 * POR QUÉ EXISTE: otras pruebas miraban el atributo data-tm-melody y que hubiera un botón ▶, pero no lo que SUENA. Si la página
 * lleva otro atributo que también cablea botones (por ejemplo data-tm-intervals en el <article>, que pone un ▶ en cada imagen
 * cuyo alt nombre notas), ese botón llega antes, la melodía no se cablea y suena otra cosa: la escala de Do mayor salía
 * «Do4 Do5 Re5 Mi5…» porque el alt empieza por «Do Mayor Natural».
 *
 * CÓMO: se interceptan la descarga y la decodificación de las muestras de piano (para saber de qué fichero viene cada
 * buffer) y los arranques de AudioBufferSourceNode (para saber a qué velocidad se reproduce). Cada nota que suena = nota del
 * fichero + semitonos de la velocidad. Se pulsa el ▶ de cada figura y se compara en orden con los midi de sus notas.
 */
const { execSync } = require('child_process');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2);
const PUERTO = ((args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1]);
// Git Bash convierte «/ruta» en «C:/Program Files/Git/ruta»: se deshace, y se acepta también sin la barra inicial
let paginas = args.filter((a) => !a.startsWith('--')).map((a) => '/' + a.replace(/^[A-Za-z]:\/Program Files\/Git/, '').replace(/^\/+/, ''));
if (!paginas.length) {
  paginas = execSync('git grep -l data-tm-melody -- "*.html"', { cwd: RAIZ }).toString().trim().split('\n').map((f) => '/' + f.replace(/index\.html$/, ''));
}

const SABOTAJE = args.includes('--sabotaje');
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const midiDeToken = (k) => { const m = /^([a-gA-G])(##|bb|#|b)?\/(-?\d+)$/.exec(k); if (!m) return null; return (Number(m[3]) + 1) * 12 + PC[m[1].toLowerCase()] + ({ '#': 1, b: -1, '##': 2, bb: -2 }[m[2]] || 0); };
const midiDeFichero = (n) => { const m = /^([A-G])(s?)(\d)$/.exec(n); return PC[m[1].toLowerCase()] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12; };

const INSTRUMENTACION = () => {
  window.__arranques = [];
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
  AudioBufferSourceNode.prototype.start = function (when) {
    window.__arranques.push({ nombre: this.buffer && this.buffer.__nombre, rate: this.playbackRate.value, cuando: when });
    return st.apply(this, arguments);
  };
};

(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  let figuras = 0, fallos = 0;
  const falla = (m) => { fallos++; if (fallos <= 30) console.log('  ✗ ' + m); };
  for (const url of paginas) {
    const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
    await p.addInitScript(INSTRUMENTACION);
    if (SABOTAJE) await p.addInitScript(() => new MutationObserver((_, ob) => { const a = document.querySelector('article.tm-article'); if (a) { a.setAttribute('data-tm-intervals', ''); ob.disconnect(); } }).observe(document, { childList: true, subtree: true }));   // el fallo original: otro cableado se adelanta
    await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
    try { await p.goto(`http://localhost:${PUERTO}${url}`, { waitUntil: 'load' }); } catch (e) { falla(`${url}: no carga`); await p.close(); continue; }
    await p.waitForTimeout(700);
    const n = await p.locator('figure[data-tm-melody]').count();
    for (let i = 0; i < n; i++) {
      const fig = p.locator('figure[data-tm-melody]').nth(i);
      const mel = await fig.getAttribute('data-tm-melody');
      const toks = mel.trim().split(/\s+/).filter((t) => t && t !== '|');
      const esperadas = toks.map((t) => t.split(':')).filter(([k]) => k !== 'r').map(([k]) => midiDeToken(k));
      const botones = await fig.locator('.tm-play-scale').count();
      if (botones !== 1) { falla(`${url} figura ${i + 1}: ${botones} botones ▶`); continue; }
      // se pulsa y se espera a que hayan arrancado todas las notas; si el servidor local va lento y no arranca nada, un 2.º intento
      for (let intento = 0; intento < 2; intento++) {
        await p.evaluate(() => { window.__arranques.length = 0; });
        await fig.locator('.tm-play-scale').first().click();
        const t0 = Date.now();
        while (Date.now() - t0 < 15000) { if ((await p.evaluate(() => window.__arranques.length)) >= esperadas.length) break; await p.waitForTimeout(150); }
        if ((await p.evaluate(() => window.__arranques.length)) > 0) break;
        await p.waitForTimeout(1500);
      }
      const tocadas = (await p.evaluate(() => window.__arranques)).map((a) => (a.nombre ? midiDeFichero(a.nombre) + Math.round(12 * Math.log2(a.rate)) : null));
      figuras++;
      if (JSON.stringify(tocadas) !== JSON.stringify(esperadas)) falla(`${url} figura ${i + 1}: suena ${JSON.stringify(tocadas)} y el atributo dice ${JSON.stringify(esperadas)}  («${mel.slice(0, 50)}»)`);
      await p.waitForTimeout(400);
    }
    await p.close();
  }
  await b.close();
  console.log(`${paginas.length} páginas · ${figuras} figuras con ▶ comprobadas · ${fallos ? fallos + ' FALLO(S)' : 'todas suenan lo que dicen'}${SABOTAJE ? ' (con sabotaje: tiene que salir 1+)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
