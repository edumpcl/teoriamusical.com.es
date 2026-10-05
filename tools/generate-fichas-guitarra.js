'use strict';
/**
 * Fichas imprimibles del mástil de la guitarra (A4 apaisado, una cara).
 *
 *   node tools/generate-fichas-guitarra.js            -> mapa + para rellenar + preview
 *   node tools/generate-fichas-guitarra.js --png=DIR  -> además, captura de cada hoja
 *
 * Dos hojas:
 *   1. El mapa completo: las 6 cuerdas por los 12 primeros trastes. Sirve de
 *      referencia para colgar y de solución de la segunda.
 *   2. Para rellenar: la misma rejilla vacía, con las cuerdas al aire dadas.
 *
 * APAISADA A PROPÓSITO: el resto de fichas del sitio son A4 vertical, pero un
 * mástil es horizontal y la rejilla tiene 14 columnas. En vertical saldría
 * apretada y, sobre todo, dejaría de parecerse al instrumento.
 *
 * Los datos salen de las mismas constantes que
 * assets/js/digitaciones-guitarra-engine.js y que la tabla de la página
 * (tools/gen_tabla_guitarra.py). El script aborta si la afinación del motor
 * deja de coincidir: las tres cosas no pueden contradecirse.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets/img/guitarra/fichas');
const MOTOR = path.join(ROOT, 'assets/js/digitaciones-guitarra-engine.js');

/* Cuerdas al aire en MIDI real: 6.ª (Mi grave) -> 1.ª (Mi agudo). */
const OPEN = [40, 45, 50, 55, 59, 64];
const CUERDAS = ['6.ª', '5.ª', '4.ª', '3.ª', '2.ª', '1.ª'];
const NFRETS = 12;
const SHARP = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
const FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇' };
/* Trastes con marcador en el mástil; el 12 lleva dos. */
const PUNTO = new Set([3, 5, 7, 9]);

function comprobarMotor() {
  const m = fs.readFileSync(MOTOR, 'utf8').match(/var OPEN = \[([^\]]+)\]/);
  if (!m) { console.log('  aviso: no he podido leer OPEN del motor'); return; }
  const suyo = m[1].split(',').map(x => parseInt(x.trim(), 10));
  if (suyo.join() !== OPEN.join()) {
    console.error(`El motor usa OPEN=[${suyo}] y esta ficha [${OPEN}]. Cuadrarlos antes de generar.`);
    process.exit(1);
  }
  console.log('  afinación comprobada contra el motor: coincide');
}

const sub = n => String(n).split('').map(c => SUB[c] || c).join('');
const octava = m => Math.floor(m / 12) - 1;
function nombre(m) {
  const i = ((m % 12) + 12) % 12;
  const o = sub(octava(m));
  return SHARP[i] === FLAT[i] ? [SHARP[i] + o, null] : [SHARP[i] + o, FLAT[i] + o];
}

const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'assets/img/2026/04/bach_favicon.png')).toString('base64');

const CSS = `
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 297mm; min-height: 210mm; padding: 9mm 12mm 5mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 6px; margin-bottom: 9px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 32px; height: 33px; flex: none; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 17pt; margin: 3px 0; }
  .instr { font-size: 9.5pt; margin: 0; color: #333; line-height: 1.35; max-width: 210mm; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 6px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  /* table-layout: fixed es imprescindible: en la hoja de rellenar las casillas
     vacias no tienen contenido, se encogen y la columna "Al aire" se come media
     hoja. Con anchos fijos las dos hojas salen identicas. */
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  col.c-cuerda { width: 32mm; } col.c-aire { width: 22mm; }
  th, td { border: 1px solid #c9bfa4; text-align: center; padding: 0; }
  thead th { background: #8b6914; color: #fff; font-size: 10pt; padding: 4px 0 2px; border-color: #6d5210; vertical-align: top; }
  thead th.aire { background: #6d5210; }
  .cuerda { background: #f6f1e4; font-size: 10pt; font-weight: bold; text-align: left; padding: 0 8px; white-space: nowrap; width: 30mm; }
  .cuerda small { display: block; font-weight: normal; color: #7a6a44; font-size: 8pt; }
  td.nota { height: 17mm; font-size: 11.5pt; font-weight: 600; }
  td.nota small { display: block; font-size: 8.5pt; font-weight: normal; color: #8a7c5c; margin-top: 1px; }
  td.aire { background: #f6f1e4; }
  /* El traste 12 se separa con doble línea, como el doble marcador del mástil. */
  td.oct, thead th.oct { border-left: 3px double #8b6914; }
  /* Altura reservada SIEMPRE, lleve marcador o no, o los numeros bailan. */
  .marcas { font-size: 8pt; color: #e8c766; letter-spacing: .08em; height: 11px; line-height: 11px; }
  .vacia { background: #fff; }
  .leyenda { margin-top: 9px; font-size: 8.8pt; color: #444; line-height: 1.45; column-count: 2; column-gap: 16mm; }
  .leyenda b { color: #8b6914; }
  .pie { margin-top: 7px; border-top: 1px solid #ddd; padding-top: 5px; font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #8b6914; color: #fff; font-size: 8.5pt; font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function rejilla(rellenar) {
  const cols = ['<colgroup><col class="c-cuerda"><col class="c-aire">'];
  for (let n = 1; n <= NFRETS; n++) cols.push('<col>');
  cols.push('</colgroup>');
  const hueco = '<div class="marcas"></div>';
  const cab = [`<thead><tr><th>Cuerda${hueco}</th><th class="aire">Al aire${hueco}</th>`];
  for (let n = 1; n <= NFRETS; n++) {
    const cls = n === 12 ? ' class="oct"' : '';
    const marca = `<div class="marcas">${PUNTO.has(n) ? '•' : (n === 12 ? '• •' : '')}</div>`;
    cab.push(`<th${cls}>${n}${marca}</th>`);
  }
  cab.push('</tr></thead>');

  const filas = [];
  for (let i = 0; i < 6; i++) {           // 6.ª arriba, como la foto del mástil
    const [raiz] = nombre(OPEN[i]);
    filas.push(`<tr><th class="cuerda">${CUERDAS[i]}<small>al aire: ${raiz}</small></th>`);
    for (let n = 0; n <= NFRETS; n++) {
      const [alt, bem] = nombre(OPEN[i] + n);
      const cls = ['nota'];
      if (n === 0) cls.push('aire');
      if (n === 12) cls.push('oct');
      // En la hoja de rellenar solo se dan las cuerdas al aire: sin un punto de
      // partida el ejercicio no se puede hacer.
      const vacia = rellenar && n > 0;
      if (vacia) cls.push('vacia');
      const dentro = vacia ? '' : (bem ? `${alt}<small>${bem}</small>` : alt);
      filas.push(`<td class="${cls.join(' ')}">${dentro}</td>`);
    }
    filas.push('</tr>');
  }
  return `<table>${cols.join('')}${cab.join('')}<tbody>${filas.join('')}</tbody></table>`;
}

function html(rellenar) {
  const titulo = rellenar ? 'El mástil de la guitarra: complétalo' : 'El mástil de la guitarra';
  const instr = rellenar
    ? 'Escribe la nota de cada casilla. Te damos las cuerdas al aire: a partir de ahí, <b>cada traste sube un semitono</b>. Cuando llegues al traste 12 deberías haber vuelto a la nota de la cuerda al aire, una octava más aguda; si no te cuadra, revisa esa fila.'
    : 'Todas las notas de las seis cuerdas en los doce primeros trastes. Se lee como la guitarra en posición de tocar: la 6.ª cuerda (la más gruesa y grave) arriba y la 1.ª abajo.';
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORÍA MUSICAL</div>
        <h1>${titulo}${rellenar ? '' : '<span class="sol-tag">referencia</span>'}</h1>
        <p class="instr">${instr}</p>
      </div>
      <img class="logo" src="${LOGO}" alt="">
    </div>
    ${rellenar ? '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>' : ''}
  </div>

  ${rejilla(rellenar)}

  <div class="leyenda">
    <p><b>Cada traste, un semitono.</b> Por eso en el <b>traste 12</b> vuelve la nota de la cuerda al aire una octava más aguda: ahí el mástil «se repite», y por eso esa columna va separada.</p>
    <p><b>Los puntos</b> (trastes 3, 5, 7, 9 y el doble del 12) son los marcadores del mástil, los que sirven para orientarse sin mirar.</p>
    <p><b>Fa♯ y Sol♭ son la misma nota</b>, solo cambia cómo se escribe. Por eso las casillas alteradas llevan los dos nombres.</p>
    <p><b>Los subíndices son la octava:</b> el Mi₂ de la sexta cuerda suena dos octavas por debajo del Mi₄ de la primera. Ojo: esto es lo que <i>suena</i>; en la partitura la guitarra se escribe una octava más aguda.</p>
  </div>

  <div class="pie"><span>El mástil de la guitarra${rellenar ? ' &middot; para completar' : ''} &middot; teoriamusical.com.es/diccionario-musical/notas-de-la-guitarra/</span><span>teoriamusical.com.es</span></div>
</div></body></html>`;
}

if (require.main !== module) { module.exports = { html, nombre }; return; }

const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
  comprobarMotor();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const png = (process.argv.find(a => a.startsWith('--png=')) || '').slice(6);
  const ANCHO = Math.round(297 / 25.4 * 96);     // A4 apaisado a 96 dpi
  const ALTO = Math.round(210 / 25.4 * 96);
  let avisos = 0;

  for (const rellenar of [false, true]) {
    const page = await browser.newPage({ deviceScaleFactor: 3 });
    await page.setViewportSize({ width: ANCHO + 60, height: ALTO + 120 });
    await page.setContent(html(rellenar));
    const nom = 'ficha-mastil-guitarra' + (rellenar ? '-rellenar' : '');
    const pdfPath = path.join(OUT_DIR, nom + '.pdf');
    const sobra = await page.evaluate(h => Math.round(document.querySelector('.hoja').scrollHeight - h), ALTO);
    await page.pdf({ path: pdfPath, format: 'A4', landscape: true, printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' } });
    const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);
    if (png) await page.screenshot({ path: path.join(png, nom + '.png'), fullPage: true });
    if (!rellenar) {
      const buf = await page.screenshot({ fullPage: true });
      const base = sharp(buf).extract({ left: 0, top: 0, width: ANCHO * 3, height: ALTO * 3 }).resize({ width: 400 });
      await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nom + '.png'));
      await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nom + '.webp'));
    }
    await page.close();
    if (paginas !== 1) { console.log(`  ! ${nom}.pdf ocupa ${paginas} páginas (sobran ${sobra}px)`); avisos++; }
    else console.log(`  ✓ ${nom}.pdf  (margen ${-sobra}px)`);
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · fichas en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
