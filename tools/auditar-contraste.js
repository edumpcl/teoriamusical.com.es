'use strict';
/**
 * Auditoría de contraste de color (WCAG AA) de páginas locales, con el mismo criterio que Lighthouse/axe:
 * 4,5:1 para texto normal y 3:1 para texto grande (≥24 px, o ≥18,66 px en negrita).
 *
 *   node tools/servidor-estatico.js 8910 &
 *   node tools/auditar-contraste.js /juegos/entonacion/ /juegos/entonacion/salto-de-longitud/ ...   [--puerto=8910] [--movil]
 *   node tools/auditar-contraste.js --juego /juegos/entonacion/salto-de-longitud/juego/            # recorre menú, escucha, cantar y resultado
 *
 * Para cada elemento con texto visible: color del texto y fondo EFECTIVO (se compone, de dentro a fuera, la opacidad de los fondos
 * de los ancestros; un fondo con degradado o imagen no se puede calcular y se avisa aparte). Un color solo se juzga con el fondo
 * que tiene detrás.
 * También se revisa el estado HOVER de los enlaces con fondo propio (botones y tarjetas): el reposo puede pasar y el color de
 * `a:hover` del sitio (dorado oscuro) dejar el texto ilegible sobre ese fondo. Se espera 350 ms por la transición de color.
 * Se exige margen (≥ 4,8 en texto normal): Lighthouse mide algo por debajo de lo que sale a mano.
 */
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));

const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8910').split('=')[1];
const MOVIL = args.includes('--movil');
const JUEGO = args.includes('--juego');
const urls = args.filter((a) => !a.startsWith('--')).map((a) => '/' + a.replace(/^[A-Za-z]:\/Program Files\/Git/, '').replace(/^\/+/, ''));

const AUDITA = () => {
  const num = (s) => s.match(/[\d.]+/g).map(Number);
  const parse = (s) => { if (!s || s === 'transparent') return [0, 0, 0, 0]; const n = num(s); return [n[0], n[1], n[2], n.length > 3 ? n[3] : 1]; };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const over = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };
  function fondo(el) {
    const capas = []; let incalculable = '';
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') incalculable = cs.backgroundImage.slice(0, 40);
      const c = parse(cs.backgroundColor);
      if (c[3] > 0) { capas.push(c); if (c[3] === 1) break; }
    }
    let base = [255, 255, 255, 1];
    for (let i = capas.length - 1; i >= 0; i--) base = over(capas[i], base);
    return { base, incalculable };
  }
  const visible = (el) => { const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; for (let e = el; e; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false; } return true; };
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement; if (!el || vistos.has(el)) continue;
    if (/^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName) || !visible(el)) continue;
    vistos.add(el);
    const cs = getComputedStyle(el);
    const { base, incalculable } = fondo(el);
    let fg = parse(cs.color); fg = over([fg[0], fg[1], fg[2], fg[3] * (Number(cs.opacity) || 1)], base);
    const px = parseFloat(cs.fontSize), peso = Number(cs.fontWeight) || 400;
    const grande = px >= 24 || (px >= 18.66 && peso >= 700);
    out.push({ txt: n.nodeValue.trim().slice(0, 40), tag: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''), r: Math.round(ratio(fg, base) * 100) / 100, grande, fg: fg.slice(0, 3).map(Math.round).join(','), bg: base.slice(0, 3).map(Math.round).join(','), incalculable });
  }
  return out;
};

let problemas = 0, textos = 0;

const lumR = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratioR = (a, b) => { const x = lumR(a), y = lumR(b); return Math.round((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) * 100) / 100; };
async function auditaHover(p, pag) {
  const sel = 'main a, article a, .tm-article a';
  const n = await p.locator(sel).count();
  const vistos = new Set();
  for (let i = 0; i < n; i++) {
    const a = p.locator(sel).nth(i);
    if (!(await a.isVisible())) continue;
    const bg = await a.evaluate((e) => getComputedStyle(e).backgroundColor);
    if (/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) continue;                // solo enlaces con fondo propio
    const clave = (await a.evaluate((e) => e.className)) + '|' + bg;
    if (vistos.has(clave)) continue; vistos.add(clave); textos++;
    await a.hover({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(350);
    const d = await a.evaluate((e) => { const c = getComputedStyle(e); return [c.color, c.backgroundColor]; });
    const rgb = (x) => x.match(/[\d.]+/g).slice(0, 3).map(Number);
    const r = ratioR(rgb(d[0]), rgb(d[1]));
    if (r < 4.5) { problemas++; console.log(`  ✗ ${pag} (hover): «${(await a.textContent()).trim().slice(0, 30)}» ${r}:1 texto ${d[0]} sobre ${d[1]}`); }
    await p.mouse.move(0, 0);
  }
}
function informa(pag, lista) {
  textos += lista.length;
  const vistos = new Set();
  for (const t of lista) {
    const minimo = t.grande ? 3.2 : 4.8, critico = t.grande ? 3 : 4.5;
    const clave = t.tag + t.fg + t.bg;
    if (t.incalculable) { if (!vistos.has('i' + clave)) { vistos.add('i' + clave); console.log(`  ? ${pag}: «${t.txt}» (${t.tag}) sobre fondo con ${t.incalculable}: no calculable, revisar a ojo`); } continue; }
    if (t.r < minimo && !vistos.has(clave)) {
      vistos.add(clave);
      const grave = t.r < critico;
      if (grave) problemas++;
      console.log(`  ${grave ? '✗' : '~'} ${pag}: «${t.txt}» (${t.tag}) ${t.r}:1 ${t.grande ? '(grande, mín. 3)' : '(mín. 4,5)'} texto rgb(${t.fg}) sobre rgb(${t.bg})${grave ? '' : '  ← aprobado pero sin margen'}`);
    }
  }
}

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: MOVIL ? { width: 390, height: 800 } : { width: 1100, height: 900 } });
  for (const u of urls) {
    const p = await ctx.newPage();
    await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
    await p.goto(`http://localhost:${PUERTO}${u}`, { waitUntil: 'load' });
    await p.waitForTimeout(1000);
    if (!JUEGO) {
      informa(u, await p.evaluate(AUDITA));
      await auditaHover(p, u);
      const marcos = p.frames().filter((f) => f !== p.mainFrame());
      for (const f of marcos) { await f.waitForLoadState('load'); informa(u + ' [juego incrustado]', await f.evaluate(AUDITA)); }
    } else {
      // recorre las pantallas del juego en modo demostración
      informa(u + ' · menú', await p.evaluate(AUDITA));
      await p.click('#btnDemo'); informa(u + ' · menú (demo)', await p.evaluate(AUDITA));
      await p.click('#btnStart'); await p.waitForSelector('#btnSing', { state: 'visible' }); informa(u + ' · escuchar', await p.evaluate(AUDITA));
      await p.click('#btnSing'); await p.waitForSelector('#demoHold', { state: 'visible' });
      await p.waitForTimeout(3900); await p.click('#demoHold'); await p.waitForTimeout(1200);
      informa(u + ' · cantando (afinado)', await p.evaluate(AUDITA));
      await p.evaluate(() => { const e = document.getElementById('demoCents'); e.value = '200'; e.dispatchEvent(new Event('input', { bubbles: true })); });
      await p.waitForTimeout(700); informa(u + ' · cantando (desafinado)', await p.evaluate(AUDITA));
      await p.waitForSelector('#resDist', { state: 'visible', timeout: 40000 }); await p.waitForTimeout(400);
      informa(u + ' · resultado', await p.evaluate(AUDITA));
    }
    await p.close();
  }
  await b.close();
  console.log(`\n${textos} textos revisados · ${problemas ? problemas + ' SUSPENDEN el contraste AA' : 'ninguno suspende el contraste AA'}`);
  process.exit(problemas ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
