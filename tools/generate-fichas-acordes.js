'use strict';
/**
 * Fichas imprimibles de acordes triada (A4, 1 hoja).
 *
 *   node tools/generate-fichas-acordes.js            -> las 8 fichas + soluciones
 *   node tools/generate-fichas-acordes.js --png      -> + capturas a 3x para revisar
 *
 * Genera, para fundamental, 1ª inversion, 2ª inversion y las tres mezcladas:
 *   ficha-analizar-triadas-<posicion>.pdf   (+ -soluciones.pdf)
 *   ficha-escribir-triadas-<posicion>.pdf   (+ -soluciones.pdf)
 *
 * Mismo planteamiento que los tests de /ejercicios/acordes/:
 *   - analizar: se ve el acorde y se escribe su tipo (y su posicion, en la
 *     ficha que mezcla las tres; en las demas la posicion la dice el titulo).
 *   - escribir: como en "construir", se da la nota MAS GRAVE y el alumno añade
 *     las otras dos. Asi no hay ambiguedad de octava ni de posicion.
 *
 * Progresion dentro de la hoja, como pidio Eduardo: primero solo notas
 * naturales y clave de sol, despues sostenidos y bemoles con la clave de fa
 * entrando poco a poco, y al final alguna doble alteracion.
 *
 * La ficha y su solucion comparten maqueta: solo cambia si se pinta la respuesta.
 * La teoria se audita aparte con tools/verificar-fichas-acordes.js.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const VEXFLOW_PATH = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUT_DIR = path.join(ROOT, 'assets/img/acordes/fichas');

/* ---------------------------------------------------------------- teoria */

const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const SEMI = [0, 2, 4, 5, 7, 9, 11];
const ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const ACC_TXT = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };
const ACC_VF = { '-2': 'bb', '-1': 'b', '0': '', '1': '#', '2': '##' };

/* Los mismos cuatro tipos y los mismos nombres que el test en pantalla
   (assets/js/acordes-engine.js). El verificador comprueba que no divergen. */
const TIPOS = [
  { id: 'mayor', t3: 4, t5: 7, nombre: 'Perfecta Mayor', corto: 'PM' },
  { id: 'menor', t3: 3, t5: 7, nombre: 'Perfecta menor', corto: 'Pm' },
  { id: 'dis', t3: 3, t5: 6, nombre: '5ª Disminuida', corto: '5dis' },
  { id: 'aum', t3: 4, t5: 8, nombre: '5ª Aumentada', corto: '5Aum' },
];

const POSICIONES = [
  { id: 'fundamental', inv: 0, archivo: 'fundamental', titulo: 'en posición fundamental' },
  { id: '1a', inv: 1, archivo: 'primera-inversion', titulo: 'en 1ª inversión' },
  { id: '2a', inv: 2, archivo: 'segunda-inversion', titulo: 'en 2ª inversión' },
  { id: 'todas', inv: null, archivo: 'todas-las-posiciones', titulo: 'en las tres posiciones' },
];
const INV_NOMBRE = ['Fundamental', '1ª inversión', '2ª inversión'];
const INV_CORTO = ['fund.', '1ª inv.', '2ª inv.'];

const CLAVES = { sol: 'treble', fa: 'bass' };

/* Las tres fases de la hoja. nivel = alteracion mas fuerte del acorde
   (0 naturales, 1 sostenidos/bemoles, 2 alguna doble). fa = proporcion de
   ejercicios en clave de fa en esa fase. */
const FASES = [
  { nivel: 0, fa: 0 },
  { nivel: 1, fa: 0.35 },
  { nivel: 2, fa: 0.5 },
];

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Todas las triadas posibles: fundamental con como mucho una alteracion (una
   tonica con doble alteracion no la pide nadie en un ejercicio de este nivel) y
   tercera y quinta con como mucho dos. */
function acordesPosibles() {
  const out = [];
  for (let l = 0; l < 7; l++) {
    for (let a = -1; a <= 1; a++) {
      TIPOS.forEach(tipo => {
        const l3 = (l + 2) % 7, l5 = (l + 4) % 7;
        const n3 = (SEMI[l3] - SEMI[l] + 12) % 12;
        const n5 = (SEMI[l5] - SEMI[l] + 12) % 12;
        const a3 = tipo.t3 - n3 + a;
        const a5 = tipo.t5 - n5 + a;
        if (Math.abs(a3) > 2 || Math.abs(a5) > 2) return;
        out.push({
          tipo,
          miembros: [{ l, a }, { l: l3, a: a3 }, { l: l5, a: a5 }],   // fundamental, 3ª, 5ª
          nivel: Math.max(Math.abs(a), Math.abs(a3), Math.abs(a5)),
        });
      });
    }
  }
  return out;
}

/* Coloca el acorde en el pentagrama. La nota grave va en la zona baja (desde
   una linea adicional por debajo: Si3 en sol, Re2 en fa) y las otras dos se
   apilan por encima. Asi la nota aguda no pasa nunca de la quinta linea: con la
   zona un escalon mas alta, un Sol5 con bemol en una inversion sacaba el palo
   del bemol por encima de la celda y salia cortado en el PDF. */
function voicing(miembros, inv, clave) {
  const base = clave === 'sol' ? 27 : 15;   // indice diatonico: Si3 = 3*7+6, Re2 = 2*7+1
  const orden = [0, 1, 2].map(k => miembros[(inv + k) % 3]);
  const notas = [];
  let previo = -Infinity;
  orden.forEach((m, k) => {
    let idx = m.l + 7 * Math.ceil(((k === 0 ? base : previo + 1) - m.l) / 7);
    previo = idx;
    const oct = Math.floor(idx / 7);
    notas.push({ l: m.l, a: m.a, oct, key: LETRAS[m.l] + '/' + oct, acc: ACC_VF[String(m.a)] });
  });
  return notas;
}

const nombreNota = m => ES[m.l] + ACC_TXT[String(m.a)];

function semilla(posId, modo) {
  return 5100 + POSICIONES.findIndex(p => p.id === posId) * 10 + (modo === 'analizar' ? 1 : 2);
}

function generarEjercicios(total, seed, posId) {
  const rnd = mulberry32(seed);
  const barajar = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pos = POSICIONES.find(p => p.id === posId);
  const invs = pos.inv === null ? [0, 1, 2] : [pos.inv];
  const todos = acordesPosibles();
  const out = [];
  const base = Math.floor(total / FASES.length);
  const resto = total % FASES.length;

  FASES.forEach((f, fi) => {
    const meta = base + (fi < resto ? 1 : 0);
    const enFa = Math.round(meta * f.fa);

    const casos = [];
    todos.filter(c => c.nivel === f.nivel).forEach(c => {
      Object.keys(CLAVES).forEach(clave => invs.forEach(inv => casos.push({ ...c, clave, inv })));
    });

    /* Se elige por costes y no con cortes: hay que respetar la cuota de clave de
       fa, repartir los cuatro tipos (y las posiciones, en la ficha mixta) y no
       repetir acorde, pero nada de eso puede dejar la hoja corta. Con notas
       naturales solo hay siete triadas y ninguna aumentada: ahi se repite. */
    const elegidos = [];
    const libres = barajar(casos);
    while (elegidos.length < meta && libres.length) {
      const hoja = out.concat(elegidos);
      const faltanFa = enFa - elegidos.filter(x => x.clave === 'fa').length;
      const faltanSol = (meta - enFa) - elegidos.filter(x => x.clave === 'sol').length;
      let mejor = 0, mejorCoste = Infinity;
      libres.forEach((c, idx) => {
        let coste = 0;
        if (c.clave === 'fa' && faltanFa <= 0) coste += 6;
        if (c.clave === 'sol' && faltanSol <= 0) coste += 6;
        coste += hoja.filter(x => x.tipo.id === c.tipo.id).length * 1.5;
        if (invs.length > 1) coste += hoja.filter(x => x.inv === c.inv).length * 1.5;
        const mismaRaiz = x => x.tipo.id === c.tipo.id && x.miembros[0].l === c.miembros[0].l && x.miembros[0].a === c.miembros[0].a;
        if (hoja.some(mismaRaiz)) coste += 4;
        if (hoja.some(x => mismaRaiz(x) && x.inv === c.inv && x.clave === c.clave)) coste += 40;
        if (coste < mejorCoste) { mejorCoste = coste; mejor = idx; }
      });
      elegidos.push(libres.splice(mejor, 1)[0]);
    }
    barajar(elegidos).forEach(c => out.push({ ...c, fase: fi, notas: voicing(c.miembros, c.inv, c.clave) }));
  });

  return out.slice(0, total);
}

/* --------------------------------------------------------------- render */

const RENDER_FN = `
/* Una celda = un mini pentagrama con su clave y el acorde (o solo su nota
   grave, en la ficha de escribir). Se coloca a mano con TickContext, como en
   las fichas de intervalos: todas las celdas quedan con la misma maqueta. */
function dibujarCelda(divId, ej, opts) {
  const { Renderer, Stave, StaveNote, Accidental, TickContext, ModifierContext } = VexFlow;
  const div = document.getElementById(divId);
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(opts.w, opts.h);
  const ctx = renderer.getContext();

  const stave = new Stave(2, opts.y, opts.w - 8, { spaceAboveStaffLn: opts.arriba });
  stave.addClef(opts.clef).setContext(ctx).draw();

  const notas = opts.soloGrave ? ej.notas.slice(0, 1) : ej.notas;
  const sn = new StaveNote({ keys: notas.map(n => n.key), duration: 'w', clef: opts.clef });
  const accs = [];
  notas.forEach((n, i) => {
    if (!n.acc) return;
    accs[i] = new Accidental(n.acc);
    sn.addModifier(accs[i], i);
  });
  sn.setStave(stave);
  sn.addToModifierContext(new ModifierContext());
  const tc = new TickContext();
  tc.addTickable(sn);
  tc.preFormat();
  const x0 = stave.getNoteStartX();
  const fin = stave.getX() + stave.getWidth();
  // Un poco a la derecha del centro: a la izquierda van las alteraciones.
  tc.setX(x0 + (fin - x0) * 0.52 - x0);

  // En la solucion de escribir, las dos notas añadidas van en rojo y la dada
  // se queda en negro: se ve de un vistazo que parte habia que escribir.
  (opts.rojo || []).forEach(function (i) {
    const estilo = { fillStyle: '#c0392b', strokeStyle: '#c0392b' };
    if (typeof sn.setKeyStyle === 'function') sn.setKeyStyle(i, estilo);
    if (accs[i]) accs[i].setStyle(estilo);
  });
  sn.setContext(ctx).drawWithStyle();
}
`;

/* ----------------------------------------------------------------- html */

const LOGO = path.join(ROOT, 'assets/img/2026/04/bach_favicon.png');
const LOGO_DATA_URI = 'data:image/png;base64,' + fs.readFileSync(LOGO).toString('base64');

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 8mm 14mm 4mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 5px; margin-bottom: 7px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 34px; height: 35px; flex: none; margin-top: 1px; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 16pt; margin: 3px 0; }
  .instr { font-size: 9.5pt; margin: 0 0 5px; color: #333; line-height: 1.35; }
  .leyenda { font-size: 8.5pt; color: #555; margin: 0; line-height: 1.3; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 5px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  .rejilla { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 10px; }
  .celda { position: relative; page-break-inside: avoid; border: 1px solid #e8e0cc; border-radius: 6px; padding: 2px 4px 3px; }
  .num { position: absolute; top: 2px; left: 5px; font-size: 8.5pt; font-weight: 700; color: #9a7b28; }
  .pide { font-size: 9.5pt; text-align: center; margin: 0 0 1px; color: #1a1a1a; min-height: 13px; }
  .linea { display: flex; align-items: baseline; gap: 5px; font-size: 9.5pt; margin: 1px 4px 0; }
  .linea b { font-weight: 600; }
  .linea > span { flex: 1; border-bottom: 1px solid #9a9a9a; height: 12px; }
  .linea .val { border: 0; color: #c0392b; font-weight: 600; font-size: 10pt; height: auto; text-align: center; }
  .pie { margin-top: 7px; border-top: 1px solid #ddd; padding-top: 4px;
         font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt;
             font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function textos(modo, pos) {
  const mixta = pos.inv === null;
  const tipos = 'Perfecta Mayor (PM), Perfecta menor (Pm), 5ª Disminuida (5dis) o 5ª Aumentada (5Aum)';
  if (modo === 'analizar') {
    return {
      titulo: 'Analizar tríadas ' + pos.titulo,
      instrucciones: mixta
        ? `Escribe debajo de cada acorde su <b>tipo</b> —${tipos}— y su <b>posición</b>: fundamental, 1ª o 2ª inversión. Fíjate primero en la clave.`
        : `Todos los acordes están ${pos.titulo}. Escribe debajo de cada uno su <b>tipo</b>: ${tipos}. Fíjate primero en la clave.`,
    };
  }
  const dada = {
    0: 'la nota dada es la <b>fundamental</b>: añade la 3ª y la 5ª por encima',
    1: 'la nota dada es la <b>3ª</b>: añade la 5ª y la fundamental por encima',
    2: 'la nota dada es la <b>5ª</b>: añade la fundamental y la 3ª por encima',
  };
  return {
    titulo: 'Escribir tríadas ' + pos.titulo,
    instrucciones: mixta
      ? 'Cada pentagrama trae la <b>nota más grave</b> del acorde. Añade las otras dos para formar la tríada indicada en la posición que se pide: en fundamental la nota dada es la fundamental, en 1ª inversión es la 3ª y en 2ª inversión es la 5ª.'
      : `Cada pentagrama trae la nota más grave de un acorde ${pos.titulo}: ${dada[pos.inv]}, para formar la tríada indicada.`,
  };
}

function construirHtml(cfg) {
  const mixta = cfg.pos.inv === null;
  const celdas = cfg.ejercicios.map((e, i) => {
    const hueco = v => (cfg.solucion ? `<span class="val">${v}</span>` : '<span></span>');
    if (cfg.modo === 'analizar') {
      return `<div class="celda"><span class="num">${i + 1}</span><div id="c${i}"></div>`
        + `<p class="linea"><b>Tipo:</b>${hueco(e.tipo.nombre)}</p>`
        + (mixta ? `<p class="linea"><b>Posición:</b>${hueco(INV_NOMBRE[e.inv])}</p>` : '')
        + '</div>';
    }
    return `<div class="celda"><span class="num">${i + 1}</span>`
      + `<p class="pide"><b>${nombreNota(e.miembros[0])} — ${e.tipo.corto}</b>${mixta ? ' · ' + INV_CORTO[e.inv] : ''}</p>`
      + `<div id="c${i}"></div></div>`;
  }).join('');

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE ACORDES</div>
        <h1>${cfg.titulo}${cfg.solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO_DATA_URI}" width="34" height="35" alt="">
    </div>
    <p class="instr">${cfg.instrucciones}</p>
    <p class="leyenda">De menos a más: notas naturales en clave de sol, después sostenidos, bemoles y clave de fa, y al final dobles alteraciones.</p>
    ${cfg.solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  <div class="rejilla">${celdas}</div>
  <div class="pie"><span>${cfg.pie}</span><span>teoriamusical.com.es</span></div>
</div>
</body></html>`;
}

/* ----------------------------------------------------------------- main */

/* Alto justo: por encima, la cabeza de la clave de sol y los bemoles de la nota
   aguda; por debajo, el Do4 con su línea adicional y los sostenidos dobles. */
const CELDA = { w: 205, h: 85, y: 3, arriba: 2 };

async function generarFicha(browser, opts) {
  const { modo, pos, solucion, ejercicios, png } = opts;
  const { titulo, instrucciones } = textos(modo, pos);
  const pie = `Tríadas ${pos.titulo} &middot; ${modo}` + (solucion ? ' &middot; soluciones' : '') + ` &middot; ${ejercicios.length} ejercicios`;

  const page = await browser.newPage({ deviceScaleFactor: 3 });
  await page.setViewportSize({ width: 850, height: 1200 });
  await page.setContent(construirHtml({ titulo, instrucciones, pie, solucion, modo, pos, ejercicios }));
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });

  for (let i = 0; i < ejercicios.length; i++) {
    const e = ejercicios[i];
    await page.evaluate(a => dibujarCelda(a[0], a[1], a[2]), ['c' + i, { notas: e.notas }, {
      ...CELDA,
      clef: CLAVES[e.clave],
      soloGrave: modo === 'escribir' && !solucion,
      rojo: modo === 'escribir' && solucion ? [1, 2] : null,
    }]);
  }

  const nombre = `ficha-${modo}-triadas-${pos.archivo}${solucion ? '-soluciones' : ''}`;
  const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
  // Solo informativo, para saber cuánto recortar si no cabe: quien decide es el
  // número de páginas del PDF.
  const sobra = await page.evaluate(() => Math.round(document.querySelector('.hoja').scrollHeight - 297 / 25.4 * 96));
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });

  /* Una cara: se cuentan las paginas del PDF, no el alto del div (Chromium
     pagina con un pixel de desbordamiento). */
  const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);

  /* Glifos cortados: se mira la tinta pegada al borde de cada SVG, no las cajas
     (la caja tipografica de Bravura es mucho mayor que el dibujo). */
  const svgs = await page.$$('.celda svg');
  const cortes = [];
  for (let i = 0; i < svgs.length; i++) {
    const { data, info } = await sharp(await svgs[i].screenshot()).greyscale().raw().toBuffer({ resolveWithObject: true });
    const tinta = fila => { for (let x = 0; x < info.width; x++) if (data[fila * info.width + x] < 160) return true; return false; };
    const arriba = tinta(0) || tinta(1);
    const abajo = tinta(info.height - 1) || tinta(info.height - 2);
    if (arriba || abajo) cortes.push({ celda: i + 1, arriba, abajo });
  }

  if (png) await page.screenshot({ path: path.join(OUT_DIR, nombre + '.png'), fullPage: true });

  if (!solucion) {
    const buf = await page.screenshot({ fullPage: true });
    const base = sharp(buf).extract({ left: 0, top: 0, width: 794 * 3, height: Math.round(297 / 25.4 * 96) * 3 }).resize({ width: 300 });
    await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.png'));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nombre + '.webp'));
  }

  await page.close();
  return { pdfPath, paginas, cortes, sobra };
}

module.exports = { generarEjercicios, acordesPosibles, voicing, semilla, TIPOS, POSICIONES, FASES, CLAVES, TOTAL: 21 };

if (require.main !== module) return;

(async () => {
  const png = process.argv.includes('--png');
  const TOTAL = 21;                       // 3 columnas x 7 filas
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  let avisos = 0;

  for (const pos of POSICIONES) {
    for (const modo of ['analizar', 'escribir']) {
      const ejercicios = generarEjercicios(TOTAL, semilla(pos.id, modo), pos.id);
      for (const solucion of [false, true]) {
        const r = await generarFicha(browser, { modo, pos, solucion, ejercicios, png });
        const problemas = [];
        if (r.paginas !== 1) problemas.push(`ocupa ${r.paginas} páginas (sobran ${r.sobra}px)`);
        if (r.cortes.length) problemas.push(`${r.cortes.length} pentagramas con glifos cortados`);
        avisos += problemas.length;
        console.log('  ' + (problemas.length ? '!' : '✓') + ' ' + path.basename(r.pdfPath) + (problemas.length ? '  ATENCION: ' + problemas.join('; ') : ''));
        r.cortes.slice(0, 4).forEach(c => console.log(`      · celda ${c.celda}: se corta ${[c.arriba ? 'por arriba' : '', c.abajo ? 'por abajo' : ''].filter(Boolean).join(' y ')}`));
      }
    }
  }

  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · fichas en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
