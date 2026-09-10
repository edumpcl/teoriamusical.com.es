'use strict';
/**
 * Fichas imprimibles de armaduras y tonalidades (A4, 1 hoja).
 *
 *   node tools/generate-fichas-armaduras.js            -> las fichas + soluciones
 *   node tools/generate-fichas-armaduras.js --png      -> + vista previa (a 3x)
 *
 * Genera:
 *   ficha-identificar-armaduras.pdf   (+ -soluciones.pdf)
 *   ficha-escribir-armaduras.pdf      (+ -soluciones.pdf)
 *
 * Tres progresiones dentro de la misma hoja, como pidio Eduardo:
 *   - de pocas alteraciones a muchas (de 0 a 7),
 *   - primero clave de sol y la de fa entrando poco a poco,
 *   - alternando lo que se pide (tonalidad Mayor o su relativa menor).
 *
 * La ficha y su solucion se dibujan igual: solo cambia si se pinta la respuesta.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const VEXFLOW_PATH = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUT_DIR = path.join(ROOT, 'assets/img/tonalidades/fichas');

/* ---------------------------------------------------------------- teoria */

/* alt: numero de alteraciones (negativo = bemoles). vf: nombre que entiende
   VexFlow para dibujar la armadura. */
const ARMADURAS = [
  { alt: 0, vf: 'C', mayor: 'Do Mayor', menor: 'la menor' },
  { alt: 1, vf: 'G', mayor: 'Sol Mayor', menor: 'mi menor' },
  { alt: 2, vf: 'D', mayor: 'Re Mayor', menor: 'si menor' },
  { alt: 3, vf: 'A', mayor: 'La Mayor', menor: 'fa♯ menor' },
  { alt: 4, vf: 'E', mayor: 'Mi Mayor', menor: 'do♯ menor' },
  { alt: 5, vf: 'B', mayor: 'Si Mayor', menor: 'sol♯ menor' },
  { alt: 6, vf: 'F#', mayor: 'Fa♯ Mayor', menor: 're♯ menor' },
  { alt: 7, vf: 'C#', mayor: 'Do♯ Mayor', menor: 'la♯ menor' },
  { alt: -1, vf: 'F', mayor: 'Fa Mayor', menor: 're menor' },
  { alt: -2, vf: 'Bb', mayor: 'Si♭ Mayor', menor: 'sol menor' },
  { alt: -3, vf: 'Eb', mayor: 'Mi♭ Mayor', menor: 'do menor' },
  { alt: -4, vf: 'Ab', mayor: 'La♭ Mayor', menor: 'fa menor' },
  { alt: -5, vf: 'Db', mayor: 'Re♭ Mayor', menor: 'si♭ menor' },
  { alt: -6, vf: 'Gb', mayor: 'Sol♭ Mayor', menor: 'mi♭ menor' },
  { alt: -7, vf: 'Cb', mayor: 'Do♭ Mayor', menor: 'la♭ menor' },
];

const CLAVES = { sol: 'treble', fa: 'bass' };

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Las tres fases de la hoja. 'fa' es la proporcion de ejercicios en clave de
   fa: entra poco a poco, no de golpe. */
const FASES = [
  { nombre: 'facil', alteraciones: [0, 1, 2], fa: 0 },
  { nombre: 'medio', alteraciones: [3, 4], fa: 0.35 },
  { nombre: 'dificil', alteraciones: [5, 6, 7], fa: 0.5 },
];

function generarEjercicios(total, seed, modo) {
  const rnd = mulberry32(seed);
  const barajar = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const out = [];
  const base = Math.floor(total / FASES.length);
  const resto = total % FASES.length;

  FASES.forEach((f, i) => {
    const meta = base + (i < resto ? 1 : 0);
    const enFa = Math.round(meta * f.fa);              // cuántos de esta fase en clave de fa

    const armaduras = barajar(ARMADURAS.filter(a => f.alteraciones.indexOf(Math.abs(a.alt)) >= 0));
    const casos = [];
    armaduras.forEach(a => {
      Object.keys(CLAVES).forEach(clave => {
        // Se pide unas veces la tonalidad Mayor y otras su relativa menor. En
        // "escribir" pedir la armadura de una menor obliga a pasar por la
        // relativa, que es justo donde se falla.
        ['mayor', 'menor'].forEach(pide => {
          casos.push({ armadura: a, clave, pide });
        });
      });
    });

    // Se elige por prioridades en vez de con cortes: interesa respetar la cuota
    // de clave de fa y no repetir armadura, pero ninguna de las dos cosas puede
    // dejar la hoja corta. Con 0-2 alteraciones solo existen cinco armaduras, y
    // todas en la misma clave si la cuota de fa es cero: ahí hay que repetir.
    const elegidos = [];
    const libres = barajar(casos);
    while (elegidos.length < meta && libres.length) {
      const faltanFa = enFa - elegidos.filter(x => x.clave === 'fa').length;
      const faltanSol = (meta - enFa) - elegidos.filter(x => x.clave === 'sol').length;
      let mejor = 0, mejorCoste = Infinity;
      libres.forEach((c, idx) => {
        let coste = 0;
        if (c.clave === 'fa' && faltanFa <= 0) coste += 2;
        if (c.clave === 'sol' && faltanSol <= 0) coste += 2;
        if (elegidos.some(x => x.armadura === c.armadura)) coste += 1;
        if (coste < mejorCoste) { mejorCoste = coste; mejor = idx; }
      });
      elegidos.push(libres.splice(mejor, 1)[0]);
    }
    barajar(elegidos).forEach(c => out.push(c));
  });

  return out.slice(0, total);
}

/* --------------------------------------------------------------- render */

const RENDER_FN = `
/* Una celda = un mini pentagrama con su clave y, si toca, su armadura. */
function dibujarCelda(divId, ej, opts) {
  const { Renderer, Stave } = VexFlow;
  const div = document.getElementById(divId);
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(opts.w, opts.h);
  const ctx = renderer.getContext();

  const stave = new Stave(2, 2, opts.w - 8, { spaceAboveStaffLn: 2 });
  stave.addClef(opts.clef);
  // En "identificar" la armadura se ve; en "escribir" el alumno la dibuja y solo
  // aparece en la hoja de soluciones.
  if (opts.mostrarArmadura) stave.addKeySignature(opts.keySig);
  stave.setContext(ctx).draw();

  const svg = div.querySelector('svg');

  if (opts.mostrarArmadura && opts.colorArmadura) {
    // La armadura de la solución, en rojo: se recolorean sus glifos.
    Array.prototype.forEach.call(svg.querySelectorAll('.vf-keysignature *'), function (el) {
      el.setAttribute('fill', opts.colorArmadura);
      el.setAttribute('stroke', opts.colorArmadura);
    });
  }

}
`;

/* ----------------------------------------------------------------- html */

const LOGO = path.join(ROOT, 'assets/img/2026/04/bach_favicon.png');
const LOGO_DATA_URI = 'data:image/png;base64,' + fs.readFileSync(LOGO).toString('base64');

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 10mm 14mm 6mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 6px; margin-bottom: 10px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 34px; height: 35px; flex: none; margin-top: 1px; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 16pt; margin: 3px 0; }
  .instr { font-size: 9.5pt; margin: 0 0 5px; color: #333; line-height: 1.35; }
  .leyenda { font-size: 8.5pt; color: #555; margin: 0; line-height: 1.3; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 7px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  .rejilla { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 10px; }
  /* Cada ejercicio en su recuadro: sin él, la respuesta de una celda queda
     visualmente pegada al enunciado de la siguiente. */
  .celda { position: relative; page-break-inside: avoid; border: 1px solid #e8e0cc; border-radius: 6px; padding: 3px 4px 5px; }
  .num { position: absolute; top: 2px; left: 5px; font-size: 8.5pt; font-weight: 700; color: #9a7b28; }
  .pide { font-size: 9.5pt; text-align: center; margin: 0 0 1px; color: #1a1a1a; min-height: 13px; }
  .linea { display: flex; align-items: baseline; gap: 5px; font-size: 9.5pt; margin: 2px 4px 0; }
  .linea b { font-weight: 600; }
  .linea > span { flex: 1; border-bottom: 1px solid #9a9a9a; height: 14px; }
  .linea .val { border: 0; color: #c0392b; font-weight: 600; font-size: 10.5pt; height: auto; text-align: center; }
  .pie { margin-top: 8px; border-top: 1px solid #ddd; padding-top: 4px;
         font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt;
             font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function construirHtml(cfg) {
  const celdas = cfg.ejercicios.map((e, i) => {
    const nombre = e.pide === 'mayor' ? e.armadura.mayor : e.armadura.menor;

    // En "identificar" la etiqueta va pegada a la línea de respuesta ("Mayor: ___"),
    // no suelta sobre el pentagrama: así se ve de qué ejercicio es cada hueco.
    if (cfg.modo === 'identificar') {
      const respuesta = cfg.solucion ? `<span class="val">${nombre}</span>` : '<span></span>';
      return `<div class="celda"><span class="num">${i + 1}</span><div id="c${i}"></div>`
        + `<p class="linea"><b>${e.pide === 'mayor' ? 'Mayor' : 'menor'}:</b>${respuesta}</p></div>`;
    }
    return `<div class="celda"><span class="num">${i + 1}</span><p class="pide"><b>${nombre}</b></p><div id="c${i}"></div></div>`;
  }).join('');

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE ARMADURAS</div>
        <h1>${cfg.titulo}${cfg.solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO_DATA_URI}" width="34" height="35" alt="">
    </div>
    <p class="instr">${cfg.instrucciones}</p>
    <p class="leyenda">${cfg.leyenda}</p>
    ${cfg.solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  <div class="rejilla">${celdas}</div>
  <div class="pie"><span>${cfg.pie}</span><span>teoriamusical.com.es</span></div>
</div>
</body></html>`;
}

/* ----------------------------------------------------------------- main */

async function generarFicha(browser, opts) {
  const { modo, solucion, ejercicios, png } = opts;
  const esIdentificar = modo === 'identificar';

  const titulo = esIdentificar ? 'Identificar armaduras' : 'Escribir armaduras';
  const instrucciones = esIdentificar
    ? 'Debajo de cada armadura, escribe la tonalidad que te piden: <b>Mayor</b> o <b>menor</b>. Fíjate primero en la clave, que no todas son de sol.'
    : 'Dibuja en cada pentagrama la <b>armadura</b> de la tonalidad indicada, con las alteraciones en su orden y en su sitio. Fíjate en la clave.';
  const leyenda = 'Las primeras armaduras llevan pocas alteraciones y están en clave de sol; '
    + 'después aumentan las alteraciones y aparece la clave de fa.';
  const pie = `Armaduras &middot; ${esIdentificar ? 'identificar' : 'escribir'}`
    + (solucion ? ' &middot; soluciones' : '') + ` &middot; ${ejercicios.length} ejercicios`;

  const page = await browser.newPage({ deviceScaleFactor: png ? 3 : 1 });
  await page.setViewportSize({ width: 850, height: 1200 });
  await page.setContent(construirHtml({ titulo, instrucciones, leyenda, pie, solucion, modo, ejercicios }));
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });

  for (let i = 0; i < ejercicios.length; i++) {
    const e = ejercicios[i];
    await page.evaluate(a => dibujarCelda(a[0], a[1], a[2]), [
      'c' + i, {},
      {
        w: 205, h: 82, clef: CLAVES[e.clave], keySig: e.armadura.vf,
        mostrarArmadura: esIdentificar || !!solucion,
        colorArmadura: (!esIdentificar && solucion) ? '#c0392b' : null,
        numero: String(i + 1),
      },
    ]);
  }

  const nombre = `ficha-${modo}-armaduras${solucion ? '-soluciones' : ''}`;
  const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
  await page.pdf({
    path: pdfPath, format: 'A4', printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });

  const overflow = await page.evaluate(() =>
    document.querySelector('.hoja').getBoundingClientRect().height - (297 / 25.4 * 96));

  /* ¿Se sale algo de su pentagrama? La cola de la clave de sol baja bajo la
     quinta línea y el 5º sostenido sube sobre ella: si la caja se queda corta,
     el glifo aparece cortado en el PDF. Se mide en vez de mirarlo a ojo. */
  /* Se mira la TINTA, no las cajas: VexFlow pinta los glifos como <text> con la
     fuente Bravura y su caja tipográfica es mucho mayor que el dibujo, así que
     medirla da falsos cortes. Si hay píxeles oscuros pegados al borde de la
     caja del pentagrama, el glifo está saliéndose. */
  const svgs = await page.$$('.celda svg');
  const cortes = [];
  for (let i = 0; i < svgs.length; i++) {
    // Se captura el SVG por separado: recortarlo de la hoja metería dentro el
    // número del ejercicio, que va sobre la celda, y daría cortes falsos.
    const raw = await sharp(await svgs[i].screenshot())
      .greyscale().raw().toBuffer({ resolveWithObject: true });
    const { data, info } = raw;
    const tinta = fila => {
      for (let x = 0; x < info.width; x++) if (data[fila * info.width + x] < 160) return true;
      return false;
    };
    const arriba = tinta(0) || tinta(1);
    const abajo = tinta(info.height - 1) || tinta(info.height - 2);
    if (arriba || abajo) cortes.push({ celda: i + 1, arriba, abajo });
  }

  if (png) await page.screenshot({ path: path.join(OUT_DIR, nombre + '.png'), fullPage: true });

  if (!solucion) {
    const buf = await page.screenshot({ fullPage: true });
    const altoA4 = Math.round(297 / 25.4 * 96) * (png ? 3 : 1);
    const anchoA4 = 794 * (png ? 3 : 1);
    const base = sharp(buf).extract({ left: 0, top: 0, width: anchoA4, height: altoA4 }).resize({ width: 300 });
    await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.png'));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.webp'));
  }

  await page.close();
  return { pdfPath, overflow, cortes };
}

module.exports = { generarEjercicios, ARMADURAS };

if (require.main !== module) return;

(async () => {
  const png = process.argv.includes('--png');
  const TOTAL = 21;                       // 3 columnas x 7 filas

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  for (const modo of ['identificar', 'escribir']) {
    const ejercicios = generarEjercicios(TOTAL, modo === 'identificar' ? 4001 : 4002, modo);
    for (const solucion of [false, true]) {
      const r = await generarFicha(browser, { modo, solucion, ejercicios, png });
      console.log('  ✓ ' + path.basename(r.pdfPath)
        + (r.overflow > 0 ? `  ATENCION: la hoja se sale ${Math.round(r.overflow)}px` : '')
        + (r.cortes.length ? `  ATENCION: ${r.cortes.length} pentagramas con glifos cortados` : ''));
      r.cortes.slice(0, 5).forEach(c => console.log(`      · celda ${c.celda}: se corta ${[c.arriba ? 'por arriba' : '', c.abajo ? 'por abajo' : ''].filter(Boolean).join(' y ')}`));
    }
  }

  await browser.close();
  console.log('\nFichas en ' + path.relative(ROOT, OUT_DIR));
})().catch(e => { console.error(e); process.exit(1); });
