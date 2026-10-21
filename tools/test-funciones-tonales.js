'use strict';
/**
 * Comprueba las tres páginas de funciones tonales y modulación:
 *   /diccionario-musical/funciones-tonales/   /diccionario-musical/modulacion/   /ejercicios/funciones-tonales/
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/test-funciones-tonales.js [--puerto=8910] [--sabotaje]
 *
 * 1. FIGURAS: cada <img> existe, trae las medidas del SVG y el texto alternativo del generador, y las figuras están REGENERADAS
 *    (se vuelven a ejecutar los dos generadores y no cambia ni un byte).
 * 2. AUDIO: se intercepta tmPiano.playEvents y se pulsa cada ▶; lo que suena (notas MIDI y orden de acordes) es exactamente lo
 *    escrito en el pentagrama según los generadores (calculado aparte desde sus alturas).
 * 3. FAQ: las preguntas visibles son las del JSON-LD, con la misma respuesta.
 * 4. TEORÍA DEL TEXTO: la tabla de funciones (grados por función) se contrasta con una tabla escrita aparte; el III no se asigna a
 *    ninguna función; la tabla de tonalidades vecinas de Do mayor se contrasta con el cálculo por armadura.
 * 5. ENLACES: todos los internos responden 200; las páginas están en el sitemap, en los índices y enlazadas de vuelta desde las
 *    páginas relacionadas (grados, cadencias, tonalidades vecinas, ejercicio de cadencias).
 * 6. Sin desbordamiento horizontal en móvil y sin errores de consola.
 * --sabotaje: se estropean una función, una nota sonora, una respuesta de FAQ y un enlace, y se comprueba que se detecta.
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
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 40) console.log('  ✗ ' + m); } };

const PAGINAS = [
  { url: '/diccionario-musical/funciones-tonales/', f: 'diccionario-musical/funciones-tonales/index.html', gen: 'funciones', dir: 'funciones' },
  { url: '/diccionario-musical/modulacion/', f: 'diccionario-musical/modulacion/index.html', gen: 'modulacion', dir: 'modulacion' },
];
const GEN = { funciones: require('./gen-funciones-figuras.js'), modulacion: require('./gen-modulacion-figuras.js') };
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const midi = (k) => { const m = /^([a-g])([#b]?)\/(\d)$/.exec(k); return (Number(m[3]) + 1) * 12 + PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0); };
const sin = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const texto = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

(async () => {
  // 1. figuras regeneradas
  for (const g of ['gen-funciones-figuras.js', 'gen-modulacion-figuras.js']) {
    const dir = g.includes('funciones') ? 'funciones' : 'modulacion';
    const fdir = path.join(RAIZ, 'assets/img/notacion', dir);
    const antes = Object.fromEntries(fs.readdirSync(fdir).map((f) => [f, fs.readFileSync(path.join(fdir, f))]));
    execFileSync('node', ['tools/' + g], { cwd: RAIZ, stdio: 'pipe' });
    for (const f of Object.keys(antes)) ok(Buffer.compare(antes[f], fs.readFileSync(path.join(fdir, f))) === 0, `${dir}/${f} no está regenerado (el generador lo cambia)`);
  }

  const nav = await chromium.launch();
  for (const pg of PAGINAS) {
    let html = leer(pg.f);
    if (SABOTAJE) {
      html = html.replace('<td>V (y V7)</td><td>VII</td>', '<td>V (y V7)</td><td>II</td>')
        .replace(', g/4 b/4 d/5, ', ', g/4 b/4 e/5, ')
        .replace('Es una tendencia, no una norma', 'Es una norma, no una tendencia')
        .replace('href="/diccionario-musical/cadencias/"', 'href="/diccionario-musical/no-existe/"');
    }
    const figs = GEN[pg.gen].FIGURAS;
    const imgs = [...html.matchAll(/<img src="\/assets\/img\/notacion\/(\w+)\/([\w-]+)\.svg" width="(\d+)" height="(\d+)" alt="([^"]*)"/g)];
    ok(imgs.length === figs.length, `${pg.url}: ${imgs.length} figuras en la página y ${figs.length} en el generador`);
    for (const f of figs) {
      const m = imgs.find((x) => x[2] === f.id);
      ok(!!m, `${pg.url}: falta la figura ${f.id}`);
      if (!m) continue;
      const svg = leer(`assets/img/notacion/${pg.dir}/${f.id}.svg`);
      const w = /<svg [^>]*width="(\d+)" height="(\d+)"/.exec(svg);
      ok(m[3] === w[1] && m[4] === w[2], `${f.id}: medidas ${m[3]}×${m[4]} y el SVG mide ${w[1]}×${w[2]}`);
      ok(m[5] === f.alt, `${f.id}: el alt de la página no es el del generador`);
    }

    // 2. audio: lo que suena es lo escrito
    const p = await nav.newPage({ viewport: { width: 1100, height: 900 } });
    const errs = [];
    p.on('console', (c) => { if (c.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication|doubleclick/i.test(c.text())) errs.push(c.text()); });
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.route('**/*', (r) => (/googlesyndication|doubleclick|googletagmanager|google-analytics|consent\.js/.test(r.request().url()) ? r.abort() : r.continue()));
    await p.goto(BASE + pg.url, { waitUntil: 'networkidle' });
    await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
    await p.evaluate(() => { window.__ev = []; window.tmPiano.playEvents = (ev) => { window.__ev.push(ev); return Promise.resolve(1); }; });
    const conAudio = figs.filter((f) => html.includes(`data-tm-prog="${f.acordes.map((a) => a.n.join(' ')).join(', ')}"`) || true);
    const botones = await p.locator('figure[data-tm-prog] .tm-play-scale').count();
    const esperadas = await p.evaluate(() => [...document.querySelectorAll('figure[data-tm-prog]')].map((f) => f.querySelector('img').src.split('/').pop().replace('.svg', '')));
    ok(botones === esperadas.length && botones > 0, `${pg.url}: ${botones} botones ▶ y ${esperadas.length} figuras con audio`);
    for (let i = 0; i < botones; i++) {
      await p.evaluate(() => { window.__ev.length = 0; });
      await p.locator('figure[data-tm-prog] .tm-play-scale').nth(i).click();
      const ev = await p.evaluate(() => window.__ev[0] || null);
      const fig = figs.find((f) => f.id === esperadas[i]);
      ok(!!ev && !!fig, `${esperadas[i]}: el ▶ no llama a playEvents`);
      if (!ev || !fig) continue;
      // por acorde (orden de entrada): conjunto de notas MIDI
      const cuando = [...new Set(ev.map((e) => e.when))].sort((a, b) => a - b);
      const sonaron = cuando.map((t) => ev.filter((e) => e.when === t).map((e) => e.midi).sort((a, b) => a - b));
      const escrito = fig.acordes.map((a) => a.n.map(midi).sort((x, y) => x - y));
      if (SABOTAJE && i === 0) escrito[0][0]++;   // sabotaje: el pentagrama «pide» otra nota de la que suena
      ok(JSON.stringify(sonaron) === JSON.stringify(escrito), `${esperadas[i]}: suena ${JSON.stringify(sonaron)} y está escrito ${JSON.stringify(escrito)}`);
      ok(ev.every((e) => e.dur > 0), `${esperadas[i]}: nota sin duración`);
    }

    // 3. FAQ visible = JSON-LD
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => JSON.parse(x[1]));
    const faq = ld.flatMap((j) => (j['@graph'] || [j])).find((j) => j['@type'] === 'FAQPage');
    ok(!!faq && faq.mainEntity.length === 6, `${pg.url}: FAQPage con 6 preguntas`);
    const vis = sin(texto(html));
    if (faq) for (const q of faq.mainEntity) {
      ok(vis.includes(sin(q.name)), `${pg.url}: la pregunta «${q.name}» no está visible`);
      ok(vis.includes(sin(q.acceptedAnswer.text)), `${pg.url}: la respuesta de «${q.name}» no coincide con la visible`);
    }

    // 5. enlaces
    const enlaces = [...new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((x) => x[1]))].filter((u) => !/\.(css|js|png|svg|webp|ico|json|xml)$/.test(u));
    for (const u of enlaces) {
      let r; try { r = await fetch(BASE + u); } catch (e) { r = { status: 0 }; }
      ok(r.status === 200, `${pg.url}: ${u} responde ${r.status}`);
    }

    // 6. móvil
    await p.setViewportSize({ width: 375, height: 800 });
    await p.goto(BASE + pg.url, { waitUntil: 'networkidle' });
    const d = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    ok(d.sw <= d.cw, `${pg.url}: desbordamiento horizontal en móvil (${d.sw} > ${d.cw})`);
    ok(errs.length === 0, `${pg.url}: errores de consola: ${errs.join(' | ').slice(0, 200)}`);
    await p.close();
  }
  await nav.close();

  // 4. teoría del texto
  let ft = leer('diccionario-musical/funciones-tonales/index.html');
  if (SABOTAJE) ft = ft.replace('<td>V (y V7)</td><td>VII</td>', '<td>V (y V7)</td><td>II</td>');
  const fila = (nombre) => { const m = new RegExp(`<tr><td><strong>${nombre}</strong>[^<]*</td>([\\s\\S]*?)</tr>`).exec(ft); return m ? m[1].replace(/<[^>]+>/g, '|').replace(/\|+/g, '|') : ''; };
  const TABLA = { 'Tónica': { p: 'I', s: 'VI' }, 'Subdominante': { p: 'IV', s: 'II' }, 'Dominante': { p: 'V', s: 'VII' } };
  for (const [nom, v] of Object.entries(TABLA)) {
    const f = fila(nom).split('|').filter(Boolean);
    ok(f.length >= 3, `tabla de funciones: no se lee la fila de ${nom}`);
    ok(f[1] && f[1].startsWith(v.p), `${nom}: acorde principal «${f[1]}» y debe ser ${v.p}`);
    ok(f[2] && f[2].startsWith(v.s), `${nom}: sustituto «${f[2]}» y debe ser ${v.s}`);
  }
  ok(/VI \(y, según el contexto, III\)/.test(ft), 'el III debe aparecer solo como posible sustituto de la tónica según el contexto');
  ok(!/<td>[^<]*\bIII\b[^<]*<\/td><td>Subdominante/.test(ft), 'el III no puede ser subdominante');
  // vecinas de Do mayor (calculadas por armadura): G (1♯), F (1♭), Am (0), Em (1♯), Dm (1♭)
  const mod = leer('diccionario-musical/modulacion/index.html');
  const VEC = [['Sol mayor', 'Dominante', '1 sostenido'], ['Fa mayor', 'Subdominante', '1 bemol'], ['La menor', 'Relativa menor', 'Ninguna'], ['Mi menor', 'Relativa de la dominante', '1 sostenido'], ['Re menor', 'Relativa de la subdominante', '1 bemol']];
  for (const [t, r, a] of VEC) ok(new RegExp(`<tr><td>${t}</td><td>${r}</td><td>${a}</td></tr>`).test(mod), `tonalidades vecinas: falta «${t} · ${r} · ${a}»`);

  // enlaces entrantes + sitemap
  const sm = leer('sitemap.xml');
  for (const u of ['/diccionario-musical/funciones-tonales/', '/diccionario-musical/modulacion/', '/ejercicios/funciones-tonales/']) ok(sm.includes(`<loc>https://www.teoriamusical.com.es${u}</loc>`), `${u} no está en el sitemap`);
  const entrantes = [
    ['diccionario-musical/index.html', '/diccionario-musical/funciones-tonales/'], ['diccionario-musical/index.html', '/diccionario-musical/modulacion/'],
    ['ejercicios/index.html', '/ejercicios/funciones-tonales/'], ['diccionario-musical/cadencias/index.html', '/diccionario-musical/funciones-tonales/'],
    ['diccionario-musical/nombres-de-los-grados-de-la-escala/index.html', '/diccionario-musical/funciones-tonales/'],
    ['diccionario-musical/tonalidades/tonalidades-vecinas/index.html', '/diccionario-musical/modulacion/'], ['ejercicios/cadencias/index.html', '/ejercicios/funciones-tonales/'],
    ['ejercicios/funciones-tonales/index.html', '/diccionario-musical/funciones-tonales/'], ['diccionario-musical/funciones-tonales/index.html', '/ejercicios/funciones-tonales/'],
    ['diccionario-musical/funciones-tonales/index.html', '/diccionario-musical/modulacion/'], ['diccionario-musical/modulacion/index.html', '/diccionario-musical/funciones-tonales/'],
  ];
  for (const [f, u] of entrantes) ok(leer(f).includes(`href="${u}"`), `${f} no enlaza ${u}`);

  console.log(`${comprobaciones} comprobaciones, ${fallos} fallos${SABOTAJE ? ' (con sabotaje)' : ''}`);
  process.exit(SABOTAJE ? (fallos >= 4 ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
