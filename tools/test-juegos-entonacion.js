'use strict';
/**
 * Comprueba /juegos/entonacion/ (hub + salto de longitud + triple salto):
 *
 *   node tools/servidor-estatico.js 8910 &      # servidor en la raíz
 *   node tools/test-juegos-entonacion.js [--puerto=8910] [--sabotaje]
 *
 * 1. LAS CIFRAS DEL TEXTO = LAS DEL CÓDIGO. Se lee la fuente del juego (metros por segundo, duración, márgenes de afinación, récord,
 *    umbral de salto nulo, lista de acordes) y se exige que la página explique exactamente eso.
 * 2. SE JUEGA DE VERDAD. En modo demostración se canta la nota afinada y desafinada y se comprueba que los metros salen de las
 *    fórmulas (afinado → metros > 0 y ≈ lo esperado; desafinado 200 cents → salto nulo).
 * 3. SIN MARCA: ni «CIUM», «Sot de Chera», «Centenario» ni «100 años» en el juego ni en las páginas.
 * 4. INCRUSTADO: el iframe es del mismo origen, permite el micrófono, el juego carga sus fuentes y la altura se ajusta (sin barra
 *    interna) en ordenador y en móvil, sin desbordamiento horizontal.
 * --sabotaje: reintroduce errores (marca, cifra cambiada en el texto) y comprueba que la prueba los detecta.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const BASE = `http://localhost:${PUERTO}`;

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; console.log('  ✗ ' + m); } };
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');
const texto = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const coma = (n) => String(n).replace('.', ',');

const JUEGOS = {
  salto: { dir: 'juegos/entonacion/salto-de-longitud', url: '/juegos/entonacion/salto-de-longitud/', t: 'Salto de longitud', demoSecs: 5.6 },
  triple: { dir: 'juegos/entonacion/triple-salto', url: '/juegos/entonacion/triple-salto/', t: 'Triple salto', demoSecs: 9.6 },
  // el salto de altura tiene su propia prueba (tools/test-salto-altura.js): aquí solo se comprueba lo común (incrustado, marca, micrófono)
  altura: { dir: 'juegos/entonacion/salto-de-altura', url: '/juegos/entonacion/salto-de-altura/', t: 'Salto de altura', propio: true },
};

function cifras() {
  const a = leer(JUEGOS.salto.dir + '/juego/index.html'), b = leer(JUEGOS.triple.dir + '/juego/index.html');
  const num = (s, re) => { const m = re.exec(s); if (!m) throw new Error('no encuentro ' + re); return m[1]; };
  const dif = (s) => { const m = /const DIF = \{ facil: (\d+), normal: (\d+), maestro: (\d+) \}/.exec(s); return m.slice(1, 4).map(Number); };
  const c = {
    sSing: Number(num(a, /const SING = (\d+)/)), sRate: Number(num(a, /M_PER_S = ([\d.]+)/)), sRec: Number(num(a, /REC = ([\d.]+)/)),
    sNulo: Number(num(a, /S\.nulo = S\.tuned < ([\d.]+)/)), sDif: dif(a),
    tPhase: Number(num(b, /const PHASE = (\d+)/)), tRate: JSON.parse(num(b, /const RATE = (\[[^\]]+\])/)), tRec: Number(num(b, /REC = ([\d.]+)/)),
    tNulo: Number(num(b, /S\.nulo = S\.tuned < ([\d.]+)/)), tDif: dif(b),
    tNotas: [...b.matchAll(/\{ r: '(\w+)', q: '(\w+)', s: \[[^\]]+\], n: \[([^\]]+)\] \}/g)].map((m) => ({ r: m[1], q: m[2], n: m[3].split(',').map((x) => x.trim().replace(/'/g, '')) })),
    sNotas: [...a.matchAll(/\{ n: '(\w+)', f: ([\d.]+) \}/g)].map((m) => m[1]),
  };
  c.sMax = Math.round(c.sSing * c.sRate * 100) / 100;
  c.tMax = Math.round(c.tRate.reduce((x, r) => x + r * c.tPhase, 0) * 100) / 100;
  return c;
}

function comprobarTextos(c) {
  let salto = texto(leer(JUEGOS.salto.dir + '/index.html')), triple = texto(leer(JUEGOS.triple.dir + '/index.html'));
  if (SABOTAJE) { salto = salto.replace(/1,90 metros/g, '2,00 metros').replace(/±30 cents/g, '±35 cents'); triple = triple.replace(/18,60 m/g, '19,00 m'); }
  const tiene = (t, s, m) => ok(t.includes(s), `${m}: falta «${s}»`);
  tiene(salto, coma(c.sRate.toFixed(2)) + ' metros', 'salto: metros por segundo');
  tiene(salto, coma(c.sMax.toFixed(2)) + ' m', 'salto: máximo');
  tiene(salto, coma(c.sRec) + ' m', 'salto: récord');
  tiene(salto, c.sSing + ' segundos', 'salto: duración');
  tiene(salto, 'menos de ' + coma(c.sNulo) + ' segundos', 'salto: umbral nulo');
  c.sDif.forEach((d) => tiene(salto, '±' + d + ' cents', 'salto: margen'));
  c.sNotas.forEach((n) => tiene(salto, n, 'salto: nota ' + n));
  tiene(triple, coma(c.tMax.toFixed(2)) + ' m', 'triple: máximo');
  tiene(triple, coma(c.tRec) + ' m', 'triple: récord');
  tiene(triple, 'menos de ' + coma(c.tNulo) + ' segundos', 'triple: umbral nulo');
  c.tRate.forEach((r) => tiene(triple, coma(r.toFixed(1)) + ' m', 'triple: ritmo ' + r));
  tiene(triple, c.tPhase + ' segundos', 'triple: duración por nota');
  c.tDif.forEach((d) => tiene(triple, '±' + d + ' cents', 'triple: margen'));
  ok(c.tNotas.length === 12, 'triple: se esperaban 12 acordes y hay ' + c.tNotas.length);
  // tabla de acordes de la página = lista del código
  const filas = [...leer(JUEGOS.triple.dir + '/index.html').matchAll(/<tr><td>(\w+) (mayor|menor)<\/td><td>([^<]+)<\/td><\/tr>/g)].map((m) => ({ r: m[1], q: m[2], n: m[3].split('·').map((x) => x.trim()) }));
  ok(filas.length === 12, 'triple: la tabla tiene ' + filas.length + ' filas');
  c.tNotas.forEach((a) => { const f = filas.find((x) => x.r === a.r && x.q === a.q); ok(f && f.n.join(' ') === a.n.join(' '), `triple: ${a.r} ${a.q}: código ${a.n.join(' ')} y la tabla ${f ? f.n.join(' ') : 'no existe'}`); });
  // las cifras no se repiten mal en la FAQ (JSON-LD)
  tiene(leer(JUEGOS.salto.dir + '/index.html'), coma(c.sRate.toFixed(2)) + ' metros', 'salto (FAQ/JSON-LD)');
}

// El piano de los juegos son las muestras del Salamander (CC BY 3.0): la licencia obliga a citar al autor en cada página que lo usa
function comprobarCredito() {
  for (const j of Object.values(JUEGOS)) {
    const t = leer(j.dir + '/index.html');
    ok(/Salamander Grand Piano/.test(t) && /Alexander Holm/.test(t) && /creativecommons\.org\/licenses\/by\/3\.0/.test(t), `${j.dir}: falta el crédito del piano (Salamander, Alexander Holm, CC BY 3.0)`);
    ok((t.match(/Salamander/g) || []).length === 1, `${j.dir}: el crédito del piano sale más de una vez`);
  }
}

function comprobarMarca() {
  let todo = [JUEGOS.salto.dir + '/juego/index.html', JUEGOS.triple.dir + '/juego/index.html', JUEGOS.salto.dir + '/index.html', JUEGOS.triple.dir + '/index.html', JUEGOS.altura.dir + '/juego/index.html', JUEGOS.altura.dir + '/index.html', 'juegos/entonacion/index.html'].map(leer);
  if (SABOTAJE) todo.push('<p>CIUM Sot de Chera · 100 AÑOS</p>');
  todo.forEach((t, i) => ok(!/CIUM|Sot de Chera|centenar|100\s*A[ÑN]OS|>100</i.test(t), 'queda marca en el archivo ' + i));
}

async function jugar(browser, j, cents) {
  const p = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`${BASE}${j.url}`, { waitUntil: 'load' });
  const fr = p.frameLocator('iframe.tm-juego');
  await fr.locator('#btnDemo').click();
  await fr.locator('#btnStart').click();
  await fr.locator('#btnSing').waitFor({ state: 'visible', timeout: 8000 });
  await fr.locator('#btnSing').click();
  await fr.locator('#demoHold').waitFor({ state: 'visible', timeout: 8000 });
  await fr.locator('#demoCents').evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, String(cents));
  await p.waitForTimeout(3600 + 300);          // cuenta atrás: ya está en «cantar»
  await fr.locator('#demoHold').click();         // empieza a cantar
  await fr.locator('#resDist').waitFor({ state: 'visible', timeout: 40000 });
  const dist = Number((await fr.locator('#resDist').textContent()).replace(',', '.'));
  const titulo = await fr.locator('#resTitle').textContent();
  const eventos = await p.evaluate(() => (window.dataLayer || []).filter((a) => a && a[0] === 'event' && /^juego_/.test(a[1])).map((a) => ({ evento: a[1], params: Object.assign({}, a[2]) })));
  await p.close();
  return { dist, titulo, eventos };
}

(async () => {
  const c = cifras();
  console.log(`Cifras del código: salto ${c.sRate} m/s × ${c.sSing} s = ${c.sMax} m (récord ${c.sRec}); triple ${c.tRate.join('/')} × ${c.tPhase} s = ${c.tMax} m (récord ${c.tRec})`);
  comprobarTextos(c);
  comprobarMarca();
  comprobarCredito();

  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-fake-ui-for-media-stream'] });

  // 4. incrustado: iframe, fuentes, altura, desbordamiento
  for (const [clave, j] of Object.entries(JUEGOS)) {
    for (const [anch, nombre] of [[1100, 'ordenador'], [390, 'móvil']]) {
      const p = await b.newPage({ viewport: { width: anch, height: 900 } });
      const errores = [];
      p.on('pageerror', (e) => errores.push(e.message));
      p.on('console', (m) => { if (m.type() === 'error' && !/consent|adsbygoogle|googlesyndication|googletagmanager|ERR_FAILED|Failed to load resource/.test(m.text())) errores.push(m.text()); });
      await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
      const resp = await p.goto(`${BASE}${j.url}`, { waitUntil: 'load' });
      ok(resp.status() === 200, `${clave} ${nombre}: la página responde ${resp.status()}`);
      await p.waitForTimeout(1200);
      const r = await p.evaluate(() => {
        const f = document.querySelector('iframe.tm-juego'); const d = f && f.contentDocument;
        return {
          h1: (document.querySelector('h1') || {}).textContent, allow: f && f.getAttribute('allow'), mismo: !!d,
          titulo: d && d.title, fuentes: d && d.fonts && ['Lilita One', 'Nunito'].map((n) => d.fonts.check('16px "' + n + '"')),
          ifH: f && Math.round(f.getBoundingClientRect().height), docH: d && Math.max(d.documentElement.scrollHeight, d.body.scrollHeight),
          sx: document.documentElement.scrollWidth, cx: document.documentElement.clientWidth,
          isx: d && d.documentElement.scrollWidth, icx: d && d.documentElement.clientWidth, canvas: !!(d && d.getElementById('scene')),
          robots: d && (d.querySelector('meta[name=robots]') || {}).content,
        };
      });
      ok(r.h1 && r.h1.includes(j.t), `${clave}: H1 «${r.h1}»`);
      ok(/microphone/.test(r.allow || ''), `${clave}: el iframe no permite el micrófono`);
      ok(r.mismo && r.canvas, `${clave} ${nombre}: el juego no carga dentro del iframe`);
      ok(r.fuentes && r.fuentes.every(Boolean), `${clave} ${nombre}: fuentes ${JSON.stringify(r.fuentes)}`);
      ok(r.ifH >= r.docH - 2 && r.ifH <= r.docH + 40, `${clave} ${nombre}: el iframe mide ${r.ifH} y el juego ${r.docH} (se cortaría o sobraría hueco)`);
      ok(r.sx <= r.cx, `${clave} ${nombre}: la página desborda en horizontal (${r.sx} > ${r.cx})`);
      ok(r.isx <= r.icx + 1, `${clave} ${nombre}: el juego desborda en horizontal (${r.isx} > ${r.icx})`);
      ok(/noindex/.test(r.robots || ''), `${clave}: el juego incrustado debería ser noindex`);
      ok(errores.length === 0, `${clave} ${nombre}: errores de consola: ${errores.slice(0, 2).join(' | ')}`);
      await p.close();
    }
  }

  // 2. se juega de verdad
  for (const [clave, j] of Object.entries(JUEGOS)) {
    if (j.propio) continue;
    const max = clave === 'salto' ? c.sMax : c.tMax;
    const bien = await jugar(b, j, 0);
    ok(bien.dist > max * 0.6 && bien.dist <= max + 0.01, `${clave}: cantando afinado salta ${bien.dist} m (máximo ${max})`);
    const mal = await jugar(b, j, 200);
    ok(mal.dist === 0 && /nulo/i.test(mal.titulo), `${clave}: desafinado 200 cents debería ser salto nulo y dio ${mal.dist} m («${mal.titulo}»)`);
    // MEDICIÓN: un inicio y un fin por ronda, con los parámetros conocidos y sin nada que identifique a nadie
    const PERMITIDOS = ['juego', 'dificultad', 'modo', 'resultado', 'acordes', 'motivo', 'metros'];
    for (const [r, esperado] of [[bien, 'valido'], [mal, 'nulo']]) {
      const ini = r.eventos.filter((e) => e.evento === 'juego_inicio'), fin = r.eventos.filter((e) => e.evento === 'juego_fin');
      ok(ini.length === 1 && fin.length === 1, `${clave}: eventos por ronda: ${ini.length} inicio y ${fin.length} fin (tiene que ser 1 y 1)`);
      const f = fin[0] && fin[0].params, i0 = ini[0] && ini[0].params;
      ok(f && f.juego === (clave === 'salto' ? 'salto_longitud' : 'triple_salto'), `${clave}: parámetro juego = ${f && f.juego}`);
      ok(f && f.resultado === esperado && f.modo === 'demo' && f.dificultad === 'normal', `${clave}: fin = ${JSON.stringify(f)}`);
      ok(f && f.metros === Math.round(r.dist * 10) / 10, `${clave}: metros del evento ${f && f.metros} y la pantalla ${r.dist}`);
      ok(i0 && i0.modo === 'demo' && i0.dificultad === 'normal', `${clave}: inicio = ${JSON.stringify(i0)}`);
      r.eventos.forEach((e) => ok(Object.keys(e.params).every((k) => PERMITIDOS.includes(k)), `${clave}: parámetro no permitido en ${JSON.stringify(e.params)}`));
      ok(!/nombre|Músico/i.test(JSON.stringify(r.eventos)), `${clave}: el evento lleva el nombre del jugador`);
    }
    console.log(`  ${clave}: afinado ${bien.dist} m (máx ${max}) · desafinado ${mal.dist} m («${mal.titulo}»)`);
  }
  await b.close();

  // si el micrófono no está disponible (sin dispositivo ni permiso), se mide el fallo
  const b2 = await chromium.launch();
  for (const [clave, j] of Object.entries(JUEGOS)) {
    const p = await b2.newPage({ viewport: { width: 1100, height: 900 } });
    await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
    await p.goto(`${BASE}${j.url}`, { waitUntil: 'load' });
    await p.frameLocator('iframe.tm-juego').locator('#btnStart').click();
    await p.waitForTimeout(2500);
    const ev = await p.evaluate(() => (window.dataLayer || []).filter((a) => a && a[0] === 'event' && /^juego_/.test(a[1])).map((a) => ({ evento: a[1], params: Object.assign({}, a[2]) })));
    ok(ev.length === 1 && ev[0].evento === 'juego_mic_error' && /^[A-Za-z]+$/.test(ev[0].params.motivo || ''), `${clave}: sin micrófono debería salir un juego_mic_error y salió ${JSON.stringify(ev)}`);
    await p.close();
  }
  await b2.close();

  console.log(`\n${comprobaciones} comprobaciones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir varios)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
