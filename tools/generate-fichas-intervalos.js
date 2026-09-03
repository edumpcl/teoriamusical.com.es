'use strict';
/**
 * Fichas imprimibles de intervalos melodicos (clave de sol, A4, 1 hoja).
 *
 *   node tools/generate-fichas-intervalos.js              -> las 14 fichas + soluciones
 *   node tools/generate-fichas-intervalos.js 3            -> solo las terceras
 *   node tools/generate-fichas-intervalos.js 3 --png      -> + vista previa PNG
 *
 * Por cada numero de intervalo (2a..8a) se generan 4 PDF:
 *   ficha-analizar-intervalos-de-<ordinal>.pdf            (+ -soluciones.pdf)
 *   ficha-escribir-intervalos-de-<ordinal>.pdf             (+ -soluciones.pdf)
 *
 * La ficha y su solucion se renderizan EXACTAMENTE igual: en la ficha se
 * ocultan los grupos SVG de la respuesta, asi el alumno escribe justo donde
 * esta la nota correcta y las dos hojas se pueden superponer al corregir.
 *
 * Progresion pedida: los primeros ejercicios son notas naturales y ascendentes
 * (la calidad sale sola de la escala natural: 3M y 3m, 5J y 5d...), despues se
 * mezclan las direcciones y la ultima parte es aleatoria con alteraciones,
 * incluidos aumentados y disminuidos. Nunca se repite el mismo par de notas
 * dentro de una hoja.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const VEXFLOW_PATH = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUT_DIR = path.join(ROOT, 'assets/img/intervalos/fichas');

/* ---------------------------------------------------------------- teoria */

const LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const NS = [0, 2, 4, 5, 7, 9, 11];
const ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

/* Semitonos de cada calidad, coherente con DEFS de assets/js/intervalos-engine.js.
   'peso' es la frecuencia relativa en la parte aleatoria: las calidades naturales
   salen mas que las aumentadas/disminuidas, que en la practica son excepcionales. */
const CALIDADES = {
  2: [{ q: 'm', s: 1, peso: 4 }, { q: 'M', s: 2, peso: 4 }, { q: 'd', s: 0, peso: 1 }, { q: 'A', s: 3, peso: 1 }],
  3: [{ q: 'm', s: 3, peso: 4 }, { q: 'M', s: 4, peso: 4 }, { q: 'd', s: 2, peso: 1 }, { q: 'A', s: 5, peso: 1 }],
  4: [{ q: 'J', s: 5, peso: 6 }, { q: 'A', s: 6, peso: 2 }, { q: 'd', s: 4, peso: 1 }],
  5: [{ q: 'J', s: 7, peso: 6 }, { q: 'd', s: 6, peso: 2 }, { q: 'A', s: 8, peso: 1 }],
  6: [{ q: 'm', s: 8, peso: 4 }, { q: 'M', s: 9, peso: 4 }, { q: 'd', s: 7, peso: 1 }, { q: 'A', s: 10, peso: 1 }],
  7: [{ q: 'm', s: 10, peso: 4 }, { q: 'M', s: 11, peso: 4 }, { q: 'd', s: 9, peso: 1 }, { q: 'A', s: 12, peso: 1 }],
  8: [{ q: 'J', s: 12, peso: 6 }, { q: 'd', s: 11, peso: 1 }, { q: 'A', s: 13, peso: 1 }],
};

const ORDINAL = { 2: 'segunda', 3: 'tercera', 4: 'cuarta', 5: 'quinta', 6: 'sexta', 7: 'septima', 8: 'octava' };
const ORDINAL_ACC = { 2: 'segunda', 3: 'tercera', 4: 'cuarta', 5: 'quinta', 6: 'sexta', 7: 'séptima', 8: 'octava' };
const NOMBRE_CAL = { M: 'Mayor', m: 'menor', J: 'justa', A: 'aumentada', d: 'disminuida' };

/* Rango: la3 (57) .. la5 (81). Como mucho dos lineas adicionales en clave de sol. */
const MIN_MIDI = 57;
const MAX_MIDI = 81;

const midi = n => 12 * (n.oct + 1) + NS[n.l] + n.alt;
const vexKey = n => LETTERS[n.l] + (n.alt > 0 ? '#'.repeat(n.alt) : n.alt < 0 ? 'b'.repeat(-n.alt) : '') + '/' + n.oct;
const accGlyph = n => (n.alt > 0 ? '#'.repeat(n.alt) : n.alt < 0 ? 'b'.repeat(-n.alt) : null);
const nombreEs = n => ES[n.l] + (n.alt === 1 ? '♯' : n.alt === -1 ? '♭' : '');

/* Segunda nota del intervalo. dir: +1 asciende, -1 desciende. */
function segundaNota(base, num, semis, dir) {
  const abs = base.l + (num - 1) * dir;
  const oct = base.oct + Math.floor(abs / 7);
  const l = ((abs % 7) + 7) % 7;
  const natSemis = (12 * Math.floor(abs / 7) + NS[l]) - NS[base.l];   // con signo
  const alt = base.alt + dir * semis - natSemis;
  return { l, oct, alt };
}

/* Calidad que resulta entre dos notas separadas 'num' grados. */
function calidadDe(n1, n2, num) {
  const s = Math.abs(midi(n2) - midi(n1));
  return CALIDADES[num].find(c => c.s === s) || null;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Los intervalos posibles se ENUMERAN, no se sortean a ciegas: con notas
   naturales solo existen unas pocas octavas o septimas dentro del pentagrama,
   y un bucle de rechazo se quedaria sin combinaciones nuevas. Enumerando se
   garantiza que ninguna hoja repite el mismo par de notas. */
function enumerarIntervalos(num) {
  const nat = [], alt = {};
  CALIDADES[num].forEach(c => { alt[c.q] = []; });

  for (let oct = 2; oct <= 6; oct++) {
    for (let l = 0; l < 7; l++) {
      for (const a1 of [-1, 0, 1]) {
        const base = { l, oct, alt: a1 };
        const m1 = midi(base);
        if (m1 < MIN_MIDI || m1 > MAX_MIDI) continue;
        for (const dir of [1, -1]) {
          for (const cal of CALIDADES[num]) {
            const n2 = segundaNota(base, num, cal.s, dir);
            if (Math.abs(n2.alt) > 1) continue;              // sin dobles alteraciones
            const m2 = midi(n2);
            if (m2 < MIN_MIDI || m2 > MAX_MIDI) continue;
            const ej = {
              n1: { key: vexKey(base), acc: accGlyph(base), nombre: nombreEs(base) },
              n2: { key: vexKey(n2), acc: accGlyph(n2), nombre: nombreEs(n2) },
              dir,
              etiqueta: num + 'ª ' + cal.q,
              etiquetaLarga: num + 'ª ' + NOMBRE_CAL[cal.q],
            };
            if (a1 === 0 && n2.alt === 0) nat.push(ej);
            else alt[cal.q].push(ej);
          }
        }
      }
    }
  }
  return { nat, alt };
}

function barajarCon(rnd) {
  return arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
}

function generarEjercicios(num, total, seed) {
  const rnd = mulberry32(seed);
  const barajar = barajarCon(rnd);

  const { nat, alt } = enumerarIntervalos(num);
  const natAsc = barajar(nat.filter(e => e.dir > 0));
  const natMix = barajar(nat.filter(e => e.dir < 0)).concat(natAsc.slice());   // se rellena con lo que sobre
  const porCal = {};
  CALIDADES[num].forEach(c => { porCal[c.q] = barajar(alt[c.q]); });

  const nAsc = Math.min(Math.round(total * 0.28), natAsc.length);  // arranque: naturales ascendentes
  const nNat = Math.min(Math.round(total * 0.45), nat.length);     // bloque sin alteraciones
  const out = [];
  const usados = new Set();
  const meter = (e, fase) => {
    if (!e) return false;
    const k = e.n1.key + '>' + e.n2.key;
    if (usados.has(k)) return false;
    usados.add(k);
    e.fase = fase;                    // para poder intercalar las fichas mixtas por fase
    out.push(e);
    return true;
  };

  for (let i = 0; out.length < nAsc && i < natAsc.length; i++) meter(natAsc[i], 'natAsc');
  for (let i = 0; out.length < nNat && i < natMix.length; i++) meter(natMix[i], 'nat');

  // Resto: aleatorio con alteraciones. El reparto se hace por CUPOS y contando
  // lo que ya han aportado los naturales: la escala natural da muchas mas 2as
  // Mayores que menores (o mas 7as menores que Mayores), y sin compensarlo la
  // hoja se queda coja de una de las dos calidades basicas.
  const totPesos = CALIDADES[num].reduce((s, c) => s + c.peso, 0);
  const yaHay = q => out.filter(e => e.etiqueta.endsWith(' ' + q)).length;
  const cupos = [];
  CALIDADES[num].forEach(c => {
    const objetivo = Math.round((c.peso / totPesos) * total);
    for (let i = yaHay(c.q); i < objetivo; i++) cupos.push(c.q);
  });
  const cola = barajar(cupos);
  const orden = CALIDADES[num].slice().sort((a, b) => b.peso - a.peso);
  let guard = 0;
  while (out.length < total && guard++ < 20000) {
    const q = cola.pop();
    let e = q && porCal[q].length ? porCal[q].pop() : null;
    if (!e) {                                   // cupo agotado: se tira de lo que quede
      const c = orden.find(c => porCal[c.q].length);
      if (!c) break;
      e = porCal[c.q].pop();
    }
    meter(e, 'alt');
  }

  if (out.length < total) throw new Error('Solo hay ' + out.length + ' intervalos distintos de ' + num + 'a (pedidos ' + total + ')');
  return out;
}

/* Ficha acumulativa: varios numeros en la misma hoja (2a y 3a; de 2a a 4a...),
   que es como se avanza en clase. Se genera la cuota de cada numero por
   separado y luego se intercalan POR FASE, no de corrido: si se concatenaran
   las listas, la hoja empezaria con todas las segundas y acabaria con todas las
   quintas, y se perderia lo unico que importa, que la dificultad crezca. */
function generarEjerciciosMixtos(nums, total, seed) {
  const barajar = barajarCon(mulberry32(seed));
  const base = Math.floor(total / nums.length);
  const resto = total % nums.length;

  const porFase = { natAsc: [], nat: [], alt: [] };
  nums.forEach((num, i) => {
    const cuota = base + (i < resto ? 1 : 0);
    generarEjercicios(num, cuota, seed + num * 17).forEach(e => porFase[e.fase].push(e));
  });

  return [...barajar(porFase.natAsc), ...barajar(porFase.nat), ...barajar(porFase.alt)];
}

/* --------------------------------------------------------------- render */

const RENDER_FN = `
/* Cada sistema se dibuja a mano (sin Formatter): la hoja necesita casillas de
   ancho identico y las dos notas del intervalo juntas dentro de su casilla,
   no un reparto proporcional a lo largo del pentagrama. Ademas asi la ficha y
   su solucion salen con la misma maqueta exacta: lo unico que cambia es si la
   nota respuesta se dibuja o no. */
function dibujarSistema(divId, ejercicios, opts) {
  const { Renderer, Stave, StaveNote, Accidental, TickContext, ModifierContext } = VexFlow;
  const div = document.getElementById(divId);
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(opts.w, opts.h);
  const ctx = renderer.getContext();

  const stave = new Stave(0, 0, opts.w - 2, { spaceAboveStaffLn: opts.arriba });
  stave.addClef('treble');
  stave.setContext(ctx).draw();

  const yLineaSup = stave.getYForLine(0);
  const yLineaInf = stave.getYForLine(4);
  const x0 = stave.getNoteStartX();
  const ancho = (stave.getX() + stave.getWidth()) - x0;
  const casilla = ancho / ejercicios.length;

  const svg = div.querySelector('svg');
  const NSVG = 'http://www.w3.org/2000/svg';
  const texto = function (x, y, s, size, fill, weight, anchor) {
    const t = document.createElementNS(NSVG, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y);
    t.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
    t.setAttribute('font-size', size);
    t.setAttribute('fill', fill);
    t.setAttribute('text-anchor', anchor || 'middle');
    if (weight) t.setAttribute('font-weight', weight);
    t.textContent = s;
    svg.appendChild(t);
  };
  const linea = function (x1, y1, x2, y2, color, ancho) {
    const l = document.createElementNS(NSVG, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', color); l.setAttribute('stroke-width', ancho);
    svg.appendChild(l);
  };
  const dibujarNota = function (n, x, color) {
    const sn = new StaveNote({ keys: [n.key], duration: 'w', clef: 'treble' });
    if (n.acc) sn.addModifier(new Accidental(n.acc), 0);
    sn.setStave(stave);
    sn.addToModifierContext(new ModifierContext());
    const tc = new TickContext();
    tc.addTickable(sn);
    tc.preFormat();
    tc.setX(x - x0);
    if (color) sn.setStyle({ fillStyle: color, strokeStyle: color });
    sn.setContext(ctx).drawWithStyle();
  };

  const yNum = yLineaSup - opts.arriba * 10 + 9;       // numero, sobre el pentagrama
  const yPie = yLineaInf + opts.gap;                   // respuesta o enunciado

  ejercicios.forEach(function (e, i) {
    const izq = x0 + casilla * i;
    const cx = izq + casilla / 2;
    if (i > 0) linea(izq, yLineaSup, izq, yLineaInf, '#888', 1);   // separacion entre ejercicios

    dibujarNota(e.n1, izq + casilla * 0.30, null);
    if (opts.modo === 'analizar') {
      dibujarNota(e.n2, izq + casilla * 0.66, null);
    } else if (opts.solucion) {
      dibujarNota(e.n2, izq + casilla * 0.66, '#c0392b');
    }

    texto(izq + 5, yNum, String(opts.desde + i), 10.5, '#9a7b28', null, 'start');

    if (opts.modo === 'analizar') {
      // La respuesta completa incluye la direccion: un intervalo melodico no
      // esta leido hasta decir si sube o baja.
      const flecha = e.dir > 0 ? '\\u2191' : '\\u2193';
      if (opts.solucion) texto(cx, yPie + 4, e.etiqueta + ' ' + flecha, 15, '#c0392b', '600');
      else linea(cx - casilla * 0.34, yPie, cx + casilla * 0.34, yPie, '#9a9a9a', 1);
    } else {
      texto(cx, yPie + 4, e.etiqueta + ' ' + (e.dir > 0 ? '\\u2191' : '\\u2193'), 14.5, '#1a1a1a', null);
    }
  });
}
`;

/* ----------------------------------------------------------------- html */

const LOGO = path.join(ROOT, 'assets/img/2026/04/bach_favicon.png');   // el mismo Bach del sitio
const LOGO_DATA_URI = 'data:image/png;base64,' + fs.readFileSync(LOGO).toString('base64');

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 10mm 14mm 6mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 6px; margin-bottom: 8px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  /* El logo va incrustado en base64: el PDF se genera con setContent, sin
     servidor, y una ruta /assets/... no cargaria. 102 px de original a 34 de
     ancho = 3x, suficiente para que imprima limpio. */
  .logo { width: 34px; height: 35px; flex: none; margin-top: 1px; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 16pt; margin: 3px 0 3px; }
  .instr { font-size: 9.5pt; margin: 0 0 5px; color: #333; line-height: 1.35; }
  .leyenda { font-size: 8.5pt; color: #555; margin: 0; line-height: 1.3; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 7px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  .sistema { page-break-inside: avoid; }
  .pie { margin-top: 6px; border-top: 1px solid #ddd; padding-top: 4px;
         font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt;
             font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle;
             margin-left: 8px; }
`;

function construirHtml(cfg) {
  const sistemas = cfg.sistemas.map((_, i) => `<div class="sistema"><div id="s${i}"></div></div>`).join('');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE INTERVALOS</div>
        <h1>${cfg.titulo}${cfg.solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO_DATA_URI}" width="34" height="35" alt="">
    </div>
    <p class="instr">${cfg.instrucciones}</p>
    <p class="leyenda">${cfg.leyenda}</p>
    ${cfg.solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  <div class="sistemas">${sistemas}</div>
  <div class="pie"><span>${cfg.pie}</span><span>teoriamusical.com.es</span></div>
</div>
</body></html>`;
}

/* ----------------------------------------------------------------- main */

const ANCHO = 688;          // A4 menos margenes, en px de pantalla (96 dpi)

async function generarFicha(browser, opts) {
  const { nums, modo, solucion, ejercicios, porSistema, png } = opts;
  const sistemas = [];
  for (let i = 0; i < ejercicios.length; i += porSistema) sistemas.push(ejercicios.slice(i, i + porSistema));

  const esAnalizar = modo === 'analizar';
  const unica = nums.length === 1;
  const num = nums[0];
  const ultimo = nums[nums.length - 1];
  // "de tercera" en las de un solo numero; "de 2ª a 5ª" en las acumulativas.
  const rotulo = unica ? ORDINAL_ACC[num] : `${nums[0]}ª a ${ultimo}ª`;
  const slug = unica ? ORDINAL[num] : `${nums[0]}a-a-${ultimo}a`;

  const titulo = (esAnalizar ? 'Analizar intervalos de ' : 'Escribir intervalos de ') + rotulo;
  const ejemplo = unica ? `${num}ª M` : `${nums[0]}ª M`;
  const instrucciones = esAnalizar
    ? `Todos los intervalos son <b>mel&oacute;dicos</b>${unica ? ` y de <b>${rotulo}</b>` : `, <b>mezclados de ${rotulo}</b>`}, en clave de sol. Escribe debajo de cada uno <b>qu&eacute; intervalo es y si es ascendente o descendente</b>, as&iacute;: ${ejemplo} &uarr; / ${ejemplo} &darr;.`
    : `Escribe la <b>segunda nota</b> de cada intervalo mel&oacute;dico${unica ? ` de <b>${rotulo}</b>` : `, <b>mezclados de ${rotulo}</b>`}, en clave de sol. La flecha indica si es ascendente (&uarr;) o descendente (&darr;). No olvides la alteraci&oacute;n cuando haga falta.`;
  // En las acumulativas la lista de especies por numero seria kilometrica: se
  // explican las abreviaturas una sola vez.
  const tipos = unica
    ? CALIDADES[num].map(c => `${num}ª ${c.q} = ${num}ª ${NOMBRE_CAL[c.q]}`).join(' &middot; ')
    : 'M = Mayor &middot; m = menor &middot; J = justa &middot; A = aumentada &middot; d = disminuida';
  const leyenda = `${tipos} &middot; &uarr; ascendente &middot; &darr; descendente. `
    + `Los primeros ejercicios son de notas naturales; despu&eacute;s aparecen sostenidos y bemoles.`;
  const pie = `Intervalos de ${rotulo} &middot; ${esAnalizar ? 'analizar' : 'escribir'}`
    + (solucion ? ' &middot; soluciones' : '') + ` &middot; ${ejercicios.length} ejercicios`;

  // Con --png la captura va a 3x: a 1x el texto sale emborronado y parece mas
  // grueso de lo que es, y no se puede juzgar la tipografia de la ficha.
  const page = await browser.newPage({ deviceScaleFactor: png ? 3 : 1 });
  await page.setViewportSize({ width: 850, height: 1200 });
  await page.setContent(construirHtml({ titulo, instrucciones, leyenda, pie, solucion, sistemas }));
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });

  // 'arriba' son lineas de espacio sobre el pentagrama (VexFlow: 10 px cada una);
  // el hueco de abajo tiene que dejar sitio a las lineas adicionales graves.
  const arriba = 2;
  const gap = esAnalizar ? 42 : 44;
  const alto = arriba * 10 + 40 + gap + 18;
  let desde = 1;
  for (let i = 0; i < sistemas.length; i++) {
    await page.evaluate(a => dibujarSistema(a[0], a[1], a[2]), [
      's' + i, sistemas[i],
      { w: ANCHO, h: alto, arriba, gap, modo, solucion: !!solucion, desde },
    ]);
    desde += sistemas[i].length;
  }

  const nombre = `ficha-${modo}-intervalos-de-${slug}${solucion ? '-soluciones' : ''}`;
  const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
  await page.pdf({
    path: pdfPath, format: 'A4', printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });

  const overflow = await page.evaluate(() =>
    document.querySelector('.hoja').getBoundingClientRect().height - (297 / 25.4 * 96));

  if (png) await page.screenshot({ path: path.join(OUT_DIR, nombre + '.png'), fullPage: true });

  // Miniatura para la web (solo la hoja del alumno; las soluciones no se anuncian
  // con imagen). Se recorta a la caja A4 exacta antes de reducir: la captura de
  // pantalla lleva el resto del viewport en blanco y descuadraria la proporcion.
  if (!solucion) {
    const buf = await page.screenshot({ fullPage: true });
    const altoA4 = Math.round(297 / 25.4 * 96);
    const base = sharp(buf).extract({ left: 0, top: 0, width: 794, height: altoA4 }).resize({ width: 300 });
    await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.png'));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.webp'));
  }

  await page.close();
  return { pdfPath, overflow };
}

module.exports = { generarEjercicios, generarEjerciciosMixtos, enumerarIntervalos };  // tests y auditorias

if (require.main !== module) return;

/* Las hojas acumulativas, como se avanza en clase: primero 2as y 3as, y cada
   nivel anade el siguiente numero sin soltar los anteriores. */
const NIVELES = [[2, 3], [2, 3, 4], [2, 3, 4, 5], [2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 7], [2, 3, 4, 5, 6, 7, 8]];

(async () => {
  const args = process.argv.slice(2);
  const png = args.includes('--png');
  const soloSueltas = args.includes('--sueltas');
  const soloMixtas = args.includes('--mixtas');
  const pedidos = args.filter(a => /^[2-8]$/.test(a)).map(Number);
  const lista = pedidos.length ? pedidos : [2, 3, 4, 5, 6, 7, 8];
  // Cuantos intervalos entran en cada pentagrama de la ficha de escribir; con
  // --esc=5 sale mas aireada (35 ejercicios en vez de 42).
  const esc = Number((args.find(a => /^--esc=\d$/.test(a)) || '--esc=6').slice(6));

  // Una entrada por hoja: los numeros que lleva y la semilla (fija, para que
  // regenerar no cambie los ejercicios de una ficha ya publicada).
  const hojas = [];
  if (!soloMixtas) lista.forEach(n => hojas.push({ nums: [n], seed: n * 1000 }));
  if (!soloSueltas && !pedidos.length) NIVELES.forEach((ns, i) => hojas.push({ nums: ns, seed: 90000 + i * 1000 }));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  for (const hoja of hojas) {
    for (const modo of ['analizar', 'escribir']) {
      const porSistema = modo === 'analizar' ? 6 : esc;
      const total = porSistema * 7;
      const seed = hoja.seed + (modo === 'analizar' ? 7 : 13);
      const ejercicios = hoja.nums.length === 1
        ? generarEjercicios(hoja.nums[0], total, seed)
        : generarEjerciciosMixtos(hoja.nums, total, seed);
      for (const solucion of [false, true]) {
        const r = await generarFicha(browser, { nums: hoja.nums, modo, solucion, ejercicios, porSistema, png });
        console.log('  ✓ ' + path.basename(r.pdfPath)
          + (r.overflow > 0 ? `  ATENCION: se sale ${Math.round(r.overflow)}px` : ''));
      }
    }
  }

  await browser.close();
  console.log('\nFichas en ' + path.relative(ROOT, OUT_DIR));
})().catch(e => { console.error(e); process.exit(1); });
