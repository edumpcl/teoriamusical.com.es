'use strict';
/**
 * Verifica que la notacion de las paginas se DIBUJA completa.
 *
 *   node tools/verificar-notacion-paginas.js                    -> las 146 paginas con VexFlow
 *   node tools/verificar-notacion-paginas.js ruta1 ruta2        -> solo esas
 *   node tools/verificar-notacion-paginas.js --lento            -> espera mas a cada pagina
 *
 * POR QUE EXISTE: el 08-10-2026 Eduardo señalo que en /diccionario-musical/compases/sincopa/
 * dos corcheas salian como cabezas sueltas, sin plica ni barra. La causa: se llamaba a
 * `VF.Beam.generateBeams(...)` y se tiraba el resultado. En VexFlow las plicas de las notas
 * agrupadas las pinta la propia barra, y la barra nunca se dibujaba. Ningun verificador del
 * proyecto miraba eso: los que hay comprueban DATOS (escalas, tempo, compases), no que lo
 * dibujado sea lo que se queria dibujar.
 *
 * COMO: se intercepta la descarga de vexflow.js (la CDN, la misma que usan las paginas) y se
 * le añade al final una instrumentacion minima. Asi se mira lo que VexFlow hace de verdad, no
 * lo que el codigo de la pagina "parece" hacer. Cubre, sea cual sea la forma de escribirlo:
 *   - barras asignadas a una nota que no se dibujaron nunca
 *   - excepciones de JavaScript durante la carga
 *
 * NO MIRA LIGADURAS. La primera version intentaba apuntar las StaveTie que se creaban sin
 * dibujarse, sustituyendo su constructor, y eso rompia otras paginas (error 'int64' en
 * /ejercicios/escalas/, que sin el instrumento no existia): un falso positivo causado por el
 * propio verificador. Una herramienta que inventa fallos es peor que no tenerla.
 *
 * LIMITES (para no creerselo mas de lo que es): ve lo que se pinta al CARGAR la pagina. Los
 * ejercicios que dibujan tras pulsar un boton o con contenido aleatorio solo se miran en su
 * primera pregunta. Un resultado limpio no demuestra que toda la musica sea correcta, solo
 * que no hay fallos de ESTE tipo.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const CDN = /vexflow@4\.2\.2\/build\/cjs\/vexflow\.js/;

/* Se ejecuta DENTRO de la pagina, justo despues de que VexFlow se defina. */
const INSTRUMENTO = `
;(function () {
  try {
    var VF = (typeof Vex !== 'undefined' && Vex.Flow) || (self.Vex && self.Vex.Flow);
    if (!VF) return;
    var T = window.__tm = { notas: 0, beams: [] };

    var bd = VF.Beam.prototype.draw;
    VF.Beam.prototype.draw = function () { this.__dib = true; return bd.apply(this, arguments); };

    var nd = VF.StaveNote.prototype.draw;
    VF.StaveNote.prototype.draw = function () {
      var r = nd.apply(this, arguments);
      T.notas++;
      var b = this.getBeam && this.getBeam();
      if (b && T.beams.indexOf(b) < 0) T.beams.push(b);
      return r;
    };

  } catch (e) { /* si no se puede instrumentar, el verificador lo dira */ }
})();
`;

function servidor() {
  const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2',
    '.json': 'application/json', '.pdf': 'application/pdf', '.mp3': 'audio/mpeg', '.jpg': 'image/jpeg' };
  return new Promise((ok) => {
    const s = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(RAIZ, p);
      if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
      fs.readFile(f, (e, d) => {
        if (e) { res.writeHead(404); return res.end('no'); }
        res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(d);
      });
    }).listen(0, '127.0.0.1', () => ok({ s, puerto: s.address().port }));
  });
}

function paginasConVexFlow() {
  const fuera = new Set(['.git', 'node_modules', '.playwright-mcp', 'panel', 'assets', 'tools', 'embed']);
  const out = [];
  (function ir(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (!fuera.has(e.name)) ir(path.join(dir, e.name)); continue; }
      if (e.name !== 'index.html') continue;
      const h = fs.readFileSync(path.join(dir, e.name), 'utf8');
      if (/<script[^>]+src="[^"]*vexflow[^"]*"/i.test(h)) {
        out.push('/' + path.relative(RAIZ, dir).split(path.sep).join('/') + '/');
      }
    }
  })(RAIZ);
  return out.map((p) => p.replace(/^\/\/$/, '/')).sort();
}

(async () => {
  const { chromium } = require('playwright');
  const args = process.argv.slice(2);
  const lento = args.includes('--lento');
  // Git Bash convierte '/ruta/' en 'C:/Program Files/Git/ruta/' antes de que llegue aqui.
  const limpio = (a) => a.split('\\').join('/').replace(/^[A-Za-z]:\/Program Files\/Git/i, '');
  const rutas = args.filter((a) => !a.startsWith('--')).map(limpio).map((a) => (a.startsWith('/') ? a : '/' + a));
  const paginas = rutas.length ? rutas : paginasConVexFlow();

  const { s, puerto } = await servidor();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });

  // vexflow.js se descarga UNA vez y se reparte instrumentado a todas las paginas.
  let cuerpo = null;
  await ctx.route(CDN, async (route) => {
    if (!cuerpo) {
      const r = await route.fetch();
      cuerpo = (await r.text()) + '\n' + INSTRUMENTO;
    }
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: cuerpo });
  });

  const resultados = [];
  const cola = paginas.slice();
  async function trabajador() {
    const page = await ctx.newPage();
    while (cola.length) {
      const ruta = cola.shift();
      const errores = [];
      const onErr = (e) => errores.push(String(e.message || e).slice(0, 140));
      page.on('pageerror', onErr);
      let r = { ruta, notas: 0, beamsSinDibujar: 0, errores, sinInstrumento: false };
      try {
        await page.goto(`http://127.0.0.1:${puerto}${ruta}`, { waitUntil: 'load', timeout: 30000 });
        await page.waitForTimeout(lento ? 3500 : 1500);
        // Muchos motores solo dibujan cuando su bloque entra en pantalla
        // (IntersectionObserver). Sin recorrer la pagina, esas notas ni se pintan
        // y el verificador no veria nada: daria "limpio" sin haber mirado.
        await page.evaluate(async () => {
          const alto = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          for (let y = 0; y < alto(); y += 500) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(lento ? 2500 : 1200);
        const t = await page.evaluate(() => {
          const T = window.__tm;
          if (!T) return null;
          return {
            notas: T.notas,
            beams: T.beams.filter((b) => !b.__dib).length,
          };
        });
        if (!t) r.sinInstrumento = true;
        else { r.notas = t.notas; r.beamsSinDibujar = t.beams; }
      } catch (e) { r.errores.push('no cargo: ' + String(e.message).slice(0, 80)); }
      page.off('pageerror', onErr);
      resultados.push(r);
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: 4 }, trabajador));
  await browser.close();
  s.close();

  resultados.sort((a, b) => a.ruta.localeCompare(b.ruta));
  const mal = resultados.filter((r) => r.beamsSinDibujar || r.errores.length);
  const vacias = resultados.filter((r) => !r.sinInstrumento && r.notas === 0 && !r.errores.length);
  const sinInstr = resultados.filter((r) => r.sinInstrumento);

  console.log(`\nPaginas revisadas: ${resultados.length}`);
  console.log(`  con notacion dibujada al cargar:   ${resultados.filter((r) => r.notas > 0).length}`);
  console.log(`  sin notas al cargar (interactivas): ${vacias.length}`);
  if (sinInstr.length) console.log(`  SIN poder instrumentar VexFlow:    ${sinInstr.length}  <- mirar a mano`);
  console.log(`  notas dibujadas en total:          ${resultados.reduce((s2, r) => s2 + r.notas, 0)}`);
  if (args.includes('--vacias')) {
    console.log('\nSin notas al cargar:');
    for (const r of vacias) console.log('  ' + r.ruta);
  }
  console.log(`\nDEFECTOS: ${mal.length}`);
  for (const r of mal) {
    console.log(`  ${r.ruta}`);
    if (r.beamsSinDibujar) console.log(`     ${r.beamsSinDibujar} barra(s) asignada(s) a notas y NUNCA dibujada(s)`);
    for (const e of r.errores) console.log(`     error JS: ${e}`);
  }
  process.exit(mal.length || sinInstr.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
