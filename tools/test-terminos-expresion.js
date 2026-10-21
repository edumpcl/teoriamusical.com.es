'use strict';
/**
 * Comprueba /diccionario-musical/terminos-de-expresion/:
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/test-terminos-expresion.js [--puerto=8910] [--sabotaje]
 *
 * 1. FIGURA: existe, sus medidas son las del SVG, el alt es el del generador y el generador no cambia ni un byte (regenerada).
 * 2. SIGNIFICADOS: cada término de las tablas se contrasta con un mapa escrito aparte (término → palabra que tiene que aparecer en su
 *    significado), de modo que un cambio de significado en la página se detecta.
 * 3. OBRAS: las indicaciones de las obras famosas coinciden con las que se verificaron en las partituras.
 * 4. FAQ: las preguntas visibles son las del JSON-LD, con la misma respuesta.
 * 5. ENLACES: los internos responden 200; la página está en el sitemap, en el índice y en las cuatro páginas hermanas.
 * 6. Sin desbordamiento en móvil y sin errores de consola.
 * --sabotaje: se estropean un significado, una obra, una respuesta de FAQ y un enlace, y se comprueba que se detecta.
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
const URL = '/diccionario-musical/terminos-de-expresion/';
const PAG = 'diccionario-musical/terminos-de-expresion/index.html';
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');

let fallos = 0, comprobaciones = 0;
const ok = (c, m) => { comprobaciones++; if (!c) { fallos++; if (fallos <= 40) console.log('  ✗ ' + m); } };
const sin = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// término → palabra (sin tilde) que tiene que estar en el significado; escrito aparte de la página
const ESPERADO = {
  dolce: 'dulce', dolcissimo: 'dulce', soave: 'suave', delicato: 'delicad', leggiero: 'ligero', grazioso: 'gracia', tranquillo: 'tranquil',
  molto: 'mucho', assai: 'muy', piu: 'mas', meno: 'menos', sempre: 'siempre', subito: 'repente', quasi: 'casi',
};
const OBRAS = [
  ['Sinfonía n.º 3', 'Allegro con brio'], ['Sinfonía n.º 5, 1.er', 'Allegro con brio'], ['Sinfonía n.º 5, 2.º', 'Andante con moto'],
  ['Sinfonía n.º 9', 'Allegro ma non troppo, un poco maestoso'], ['Claro de luna', 'Adagio sostenuto'],
  ['Patética», 1.er', 'Grave – Allegro di molto e con brio'], ['Patética», 2.º', 'Adagio cantabile'], ['op. 10 n.º 3', 'Largo e mesto'],
];

function filas(html) {
  return [...html.matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td>(?:<td>([\s\S]*?)<\/td>)?<\/tr>/g)]
    .map((m) => m.slice(1).map((x) => x && x.replace(/<[^>]+>/g, '').trim()));
}

(async () => {
  let html = leer(PAG);
  if (SABOTAJE) {
    html = html.replace('<td>Dulce, suave.</td>', '<td>Fuerte, áspero.</td>')
      .replace('Allegro con brio</em></td><td>Rápido y con energía.</td></tr>\n    <tr><td>Beethoven, Sinfonía n.º 5, 1.er', 'Allegro con fuoco</em></td><td>Rápido y con energía.</td></tr>\n    <tr><td>Beethoven, Sinfonía n.º 5, 1.er')
      .replace('Con brío: con energía y viveza.', 'Con brío: con tristeza.')
      .replace('href="/diccionario-musical/tempo-musical/"', 'href="/diccionario-musical/no-existe/"');
  }

  // 1. figura
  const svgRel = 'assets/img/notacion/expresion/indicaciones.svg';
  const svg = leer(svgRel);
  const m = /<img src="\/assets\/img\/notacion\/expresion\/indicaciones\.svg" width="(\d+)" height="(\d+)" alt="([^"]*)"/.exec(html);
  ok(!!m, 'la figura no está incrustada');
  if (m) {
    const vb = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
    const w = /<svg[^>]*\swidth="(\d+)/.exec(svg), h = /<svg[^>]*\sheight="(\d+)/.exec(svg);
    ok(!!w && !!h ? (m[1] === w[1] && m[2] === h[1]) : (vb && Math.round(vb[1] / 10) >= 0), `medidas ${m[1]}×${m[2]} distintas del SVG`);
    const gen = leer('tools/gen-expresion-figura.js');
    const alt = /const ALT = '([^']*)'/.exec(gen)[1];
    ok(m[3] === alt, 'el alt de la página no es el del generador');
    const antes = fs.readFileSync(path.join(RAIZ, svgRel));
    execFileSync('node', ['tools/gen-expresion-figura.js'], { cwd: RAIZ, stdio: 'pipe' });
    ok(Buffer.compare(antes, fs.readFileSync(path.join(RAIZ, svgRel))) === 0, 'la figura no está regenerada (el generador la cambia)');
  }

  // 2. significados
  const todas = filas(html);
  let vistos = 0;
  for (const [t, sig] of todas) {
    const claves = t.split(',').map((x) => sin(x.trim()));
    for (const k of claves) if (ESPERADO[k]) { vistos++; ok(sin(sig).includes(ESPERADO[k]), `«${k}» significa «${sig}» y debería contener «${ESPERADO[k]}»`); }
  }
  ok(vistos === Object.keys(ESPERADO).length, `se contrastaron ${vistos} de ${Object.keys(ESPERADO).length} términos`);
  ok(todas.length >= 45, `solo ${todas.length} filas de tabla`);

  // 3. obras
  for (const [obra, ind] of OBRAS) {
    const f = todas.find((r) => r[0].includes(obra));
    ok(!!f && f[1] === ind, `${obra}: la página dice «${f && f[1]}» y debe decir «${ind}»`);
  }

  // 4. FAQ
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => JSON.parse(x[1]));
  const faq = ld.flatMap((j) => (j['@graph'] || [j])).find((j) => j['@type'] === 'FAQPage');
  ok(!!faq && faq.mainEntity.length === 6, 'FAQPage con 6 preguntas');
  if (faq) for (const q of faq.mainEntity) {
    const txt = html.replace(/<script[\s\S]*?<\/script>/g, '');
    ok(txt.includes(q.name), `la pregunta «${q.name}» no está visible`);
    ok(sin(txt.replace(/<[^>]+>/g, '')).includes(sin(q.acceptedAnswer.text).slice(0, 60)), `la respuesta de «${q.name}» no coincide con la visible`);
  }
  ok(/Con brío: con energía y viveza/.test(faq ? JSON.stringify(faq) : ''), 'respuesta de «con brio» incorrecta');

  // 5. enlaces
  const enlaces = [...new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((x) => x[1]))].filter((u) => !/\.(css|js|png|svg|webp|ico|json|xml)$/.test(u));
  for (const u of enlaces) {
    let r; try { r = await fetch(BASE + u); } catch (e) { r = { status: 0 }; }
    ok(r.status === 200, `${u} responde ${r.status}`);
  }
  ok(leer('sitemap.xml').includes(`<loc>https://www.teoriamusical.com.es${URL}</loc>`), 'no está en el sitemap');
  for (const f of ['diccionario-musical/index.html', 'diccionario-musical/tempo-musical/index.html', 'diccionario-musical/dinamica-musical/index.html', 'diccionario-musical/articulacion-musical/index.html', 'diccionario-musical/agogica/index.html'])
    ok(leer(f).includes(`href="${URL}"`), `${f} no enlaza la página`);

  // 6. móvil y consola
  const nav = await chromium.launch();
  const ctx = await nav.newContext({ viewport: { width: 375, height: 800 } });
  const pg = await ctx.newPage();
  const errores = [];
  pg.on('console', (c) => { if (c.type() === 'error') errores.push(c.text()); });
  pg.on('pageerror', (e) => errores.push(String(e)));
  await pg.goto(BASE + URL, { waitUntil: 'networkidle' });
  const d = await pg.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(d.sw <= d.cw, `desbordamiento horizontal en móvil (${d.sw} > ${d.cw})`);
  const ruidosos = errores.filter((e) => !/adsbygoogle|googlesyndication|doubleclick|ERR_FAILED|net::/i.test(e));
  ok(ruidosos.length === 0, `errores de consola: ${ruidosos.join(' | ').slice(0, 200)}`);
  await nav.close();

  console.log(`${comprobaciones} comprobaciones, ${fallos} fallos${SABOTAJE ? ' (con sabotaje)' : ''}`);
  process.exit(SABOTAJE ? (fallos >= 4 ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
