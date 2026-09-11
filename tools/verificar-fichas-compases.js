'use strict';
/**
 * Audita la tabla de compases del motor (y por tanto la ficha PDF, que la usa).
 *
 *   node tools/verificar-fichas-compases.js
 *
 * NO reutiliza nada de compases-engine.js ni del generador: vuelve a deducir el
 * tipo, los tiempos, la subdivision y las tres unidades a partir de la cifra,
 * con una tabla escrita aparte. Si las dos coinciden, la hoja dice la verdad;
 * si divergen, una de las dos esta mal y hay que mirar cual.
 */
const { chromium } = require('playwright');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ENGINE = path.join(ROOT, 'assets/js/compases-engine.js');

/* Duracion de cada figura medida en redondas. */
const DUR = { r: 1, b: 1 / 2, n: 1 / 4, c: 1 / 8, sc: 1 / 16, f: 1 / 32, sf: 1 / 64 };
const POR_DENOM = { 1: 'r', 2: 'b', 4: 'n', 8: 'c', 16: 'sc', 32: 'f', 64: 'sf' };
const dur = id => DUR[id.replace('P', '')] * (id.endsWith('P') ? 1.5 : 1);
const doble = id => POR_DENOM[1 / (DUR[id] * 2)];   // la figura que vale el doble

/* Una sola figura que valga exactamente `v`, con puntillo si hace falta. */
function figuraDe(v) {
  for (const id of Object.keys(DUR)) {
    if (Math.abs(DUR[id] - v) < 1e-9) return { n1: id, n2: null };
    if (Math.abs(DUR[id] * 1.5 - v) < 1e-9) return { n1: id + 'P', n2: null };
  }
  return null;
}

/* Unidad de compas: la figura que dura el compas entero. Si no existe (2/1,
   9/8...) se escriben DOS ligadas, y cada una tiene que ser un numero entero de
   tiempos: 9/8 es blanca con puntillo + negra con puntillo (2 tiempos + 1), no
   redonda + corchea, que suma lo mismo pero no se lee. */
function unidadCompas(total, tiempos, uT) {
  const una = figuraDe(total);
  if (una) return una;
  for (let k = tiempos - 1; k >= 1; k--) {
    const a = figuraDe(dur(uT) * k);
    const b = figuraDe(dur(uT) * (tiempos - k));
    if (a && b && !a.n2 && !b.n2 && dur(a.n1) >= dur(b.n1)) return { n1: a.n1, n2: b.n1 };
  }
  return null;
}

function esperado(sig) {
  const [num, den] = sig.split('/').map(Number);
  const compuesto = num % 3 === 0 && num > 3;
  const total = num / den;
  if (compuesto) {
    const uS = POR_DENOM[den];
    return { tipo: 'c', tiempos: num / 3, subdiv: 't', uT: doble(uS) + 'P', uS, uC: unidadCompas(total, num / 3, doble(uS) + 'P') };
  }
  const uT = POR_DENOM[den];
  return { tipo: 's', tiempos: num, subdiv: 'b', uT, uS: POR_DENOM[1 / (DUR[uT] / 2)], uC: unidadCompas(total, num, uT) };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<div id="raiz"></div>');
  await page.addScriptTag({ path: ENGINE });
  const compases = await page.evaluate(() => window.tmCompasesData);
  await browser.close();

  let fallos = 0;
  compases.forEach(c => {
    const e = esperado(c.sig);
    const errores = [];
    ['tipo', 'tiempos', 'subdiv', 'uT', 'uS'].forEach(k => {
      if (String(c[k]) !== String(e[k])) errores.push(`${k}: motor ${c[k]} / esperado ${e[k]}`);
    });
    const uc = a => (a ? a.n1 + (a.n2 ? '+' + a.n2 : '') : '?');
    if (uc(c.uC) !== uc(e.uC)) errores.push(`uC: motor ${uc(c.uC)} / esperado ${uc(e.uC)}`);
    // Coherencia interna: la unidad de compas tiene que valer tiempos x unidad de tiempo.
    if (c.uC) {
      const suma = dur(c.uC.n1) + (c.uC.n2 ? dur(c.uC.n2) : 0);
      const [num, den] = c.sig.split('/').map(Number);
      if (Math.abs(suma - num / den) > 1e-9) errores.push(`uC no suma el compas entero (${suma} != ${num / den})`);
    }
    if (errores.length) { fallos++; console.log(`  ✗ ${c.sig}\n      ${errores.join('\n      ')}`); }
  });

  console.log(`\n${compases.length} compases revisados, ${fallos} con problemas.`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
