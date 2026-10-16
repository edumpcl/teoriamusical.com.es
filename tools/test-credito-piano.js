'use strict';
/**
 * Comprueba que TODA página con audio de piano cita las muestras (Salamander Grand Piano, de Alexander Holm, CC BY 3.0):
 * las que cargan tm-piano-audio.js (el crédito se añade solo si hay botones ▶) y la del teclado completo (crédito fijo).
 * Y que ninguna lo cita DOS veces ni da errores, y que una página sin piano no lo cita.
 *
 *   node tools/test-credito-piano.js [--puerto=8080]
 */
const { execSync } = require('child_process');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));
const PUERTO = ((process.argv.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1]);
const paginas = execSync('git grep -l -e tm-piano-audio.js -e teclado-engine.js -- "*.html"', { cwd: path.join(__dirname, '..') }).toString().trim().split('\n');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  let sinBotones = 0, fallos = 0; const falla = (m) => { fallos++; console.log('  ✗ ' + m); };
  const errores = []; p.on('pageerror', (e) => errores.push(e.message));
  for (const f of paginas) {
    const url = '/' + f.replace(/index\.html$/, '');
    errores.length = 0;
    await p.goto(`http://localhost:${PUERTO}${url}`, { waitUntil: 'load' }); await p.waitForTimeout(500);
    const r = await p.evaluate(() => ({
      botones: document.querySelectorAll('.tm-play-scale').length,
      citas: (document.body.textContent.match(/Salamander Grand Piano/g) || []).length,
      teclado: !!document.getElementById('tmteclado'),
    }));
    if (r.botones === 0 && !r.teclado) { sinBotones++; if (r.citas) falla(`${url}: cita el piano pero no suena nada`); continue; }
    if (r.citas !== 1) falla(`${url}: ${r.citas} citas del piano (botones ▶: ${r.botones})`);
    if (errores.length) falla(`${url}: errores de JS ${errores.join(' | ')}`);
  }
  // una página sin audio de piano no debe citarlo
  await p.goto(`http://localhost:${PUERTO}/herramientas/metronomo/`, { waitUntil: 'load' }); await p.waitForTimeout(400);
  if (await p.evaluate(() => /Salamander/.test(document.body.textContent))) falla('el metrónomo cita un piano que no usa');
  await b.close();
  console.log(`${paginas.length} páginas con el módulo · ${sinBotones} sin botones ▶ (no suena piano, no se cita) · ${fallos ? fallos + ' FALLO(S)' : 'todas las que suenan citan el piano exactamente una vez'}`);
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
