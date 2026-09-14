'use strict';
/**
 * Fichas imprimibles de escalas (A4, 1 hoja).
 *
 *   node tools/generate-fichas-escalas.js            -> 9 fichas + 9 soluciones
 *   node tools/generate-fichas-escalas.js --png      -> + capturas a 3x para revisar
 *
 * Tres familias × tres ejercicios:
 *   familias:   mayores (Mayor, mixta principal, mixta secundaria, mixolidia)
 *               menores (natural, armónica, melódica, dórica)
 *               mayores-y-menores (las ocho mezcladas)
 *   ejercicios: identificar            se ve la escala y se escribe su nombre
 *               escribir               se escribe con las alteraciones delante de cada nota
 *               escribir-con-armadura  se escribe la armadura y la escala, solo con lo
 *                                      que se aparta de la armadura
 *
 * Mismas reglas que los tests de /ejercicios/escalas/ (decisiones de Eduardo):
 *   - las mismas 15 tónicas por tipo que el deletreo de tools/scale_keys.py;
 *   - armadura de la tonalidad MAYOR para Mayor, mixtas y mixolidia, y de la
 *     MENOR para las menores y la dórica (como escalas-armadura-engine.js);
 *   - las alteraciones se arrastran dentro del compás por letra y octava, y solo
 *     se escribe el signo cuando la nota se aparta de lo activo (con becuadro);
 *   - la melódica es UNA escala de 15 notas: sube con 6ª y 7ª elevadas y baja
 *     como la natural;
 *   - de menos a más alteraciones en la armadura, primero clave de sol y la de
 *     fa entrando a partir del segundo tercio.
 *
 * La teoría se audita aparte con tools/verificar-fichas-escalas.js.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const VEXFLOW_PATH = path.join(ROOT, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUT_DIR = path.join(ROOT, 'assets/img/escalas/fichas');

/* ---------------------------------------------------------------- teoria */

const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const NAT = [0, 2, 4, 5, 7, 9, 11];
const ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const ACC_TXT = { '-2': '𝄫', '-1': '♭', '0': '', '1': '♯', '2': '𝄪' };

/* 15 tónicas, como tools/scale_keys.py. ARM va en paralelo: nº de alteraciones
   de la armadura y si son sostenidos o bemoles. */
const TONICAS_MAY = [['c', 0], ['g', 0], ['d', 0], ['a', 0], ['e', 0], ['b', 0], ['f', 1], ['c', 1],
  ['f', 0], ['b', -1], ['e', -1], ['a', -1], ['d', -1], ['g', -1], ['c', -1]];
const TONICAS_MEN = [['a', 0], ['e', 0], ['b', 0], ['f', 1], ['c', 1], ['g', 1], ['d', 1], ['a', 1],
  ['d', 0], ['g', 0], ['c', 0], ['f', 0], ['b', -1], ['e', -1], ['a', -1]];
const ARM = [[0, '#'], [1, '#'], [2, '#'], [3, '#'], [4, '#'], [5, '#'], [6, '#'], [7, '#'],
  [1, 'b'], [2, 'b'], [3, 'b'], [4, 'b'], [5, 'b'], [6, 'b'], [7, 'b']];
const VEX_SOST = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
const VEX_BEM = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
const ORDEN_SOST = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
const ORDEN_BEM = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];

const TIPOS = [
  { id: 'mayor', familia: 'mayor', nombre: 'Mayor', offsets: [0, 2, 4, 5, 7, 9, 11, 12] },
  { id: 'mixta-principal', familia: 'mayor', nombre: 'Mayor mixta principal', offsets: [0, 2, 4, 5, 7, 8, 11, 12] },
  { id: 'mixta-secundaria', familia: 'mayor', nombre: 'Mayor mixta secundaria', offsets: [0, 2, 4, 5, 7, 8, 10, 12] },
  { id: 'mixolidia', familia: 'mayor', nombre: 'mixolidia', offsets: [0, 2, 4, 5, 7, 9, 10, 12] },
  { id: 'menor-natural', familia: 'menor', nombre: 'menor natural', offsets: [0, 2, 3, 5, 7, 8, 10, 12] },
  { id: 'menor-armonica', familia: 'menor', nombre: 'menor armónica', offsets: [0, 2, 3, 5, 7, 8, 11, 12] },
  { id: 'menor-melodica', familia: 'menor', nombre: 'menor melódica', melodica: true },
  { id: 'menor-dorica', familia: 'menor', nombre: 'dórica', offsets: [0, 2, 3, 5, 7, 9, 10, 12] },
];

const FAMILIAS = {
  mayores: { tipos: ['mayor', 'mixta-principal', 'mixta-secundaria', 'mixolidia'], titulo: 'escalas mayores' },
  menores: { tipos: ['menor-natural', 'menor-armonica', 'menor-melodica', 'menor-dorica'], titulo: 'escalas menores' },
  'mayores-y-menores': { tipos: TIPOS.map(t => t.id), titulo: 'escalas mayores y menores' },
  /* Un solo tipo, para la página de cada escala. Van DETRÁS de las tres de arriba:
     la semilla depende del orden, y así las 18 fichas ya publicadas no cambian. */
  'mayor': { tipos: ['mayor'], titulo: 'escalas mayores naturales' },
  'mixta-principal': { tipos: ['mixta-principal'], titulo: 'escalas mayores mixtas principales' },
  'mixta-secundaria': { tipos: ['mixta-secundaria'], titulo: 'escalas mayores mixtas secundarias' },
  'mixolidia': { tipos: ['mixolidia'], titulo: 'escalas mixolidias' },
  'menor-natural': { tipos: ['menor-natural'], titulo: 'escalas menores naturales' },
  'menor-armonica': { tipos: ['menor-armonica'], titulo: 'escalas menores armónicas' },
  'menor-melodica': { tipos: ['menor-melodica'], titulo: 'escalas menores melódicas' },
  'menor-dorica': { tipos: ['menor-dorica'], titulo: 'escalas dóricas' },
};
const MODOS = ['identificar', 'escribir', 'escribir-con-armadura'];
const CLAVES = { sol: 'treble', fa: 'bass' };

/* nivel = alteraciones de la armadura. fa = proporción en clave de fa. */
const FASES = [
  { niveles: [0, 1, 2], fa: 0 },
  { niveles: [3, 4], fa: 0.35 },
  { niveles: [5, 6, 7], fa: 0.5 },
];

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Grado a 'off' semitonos y 'paso' letras de la tónica (como scale_keys.note_for). */
function nota(ton, off, paso) {
  const l = (ton.l + paso) % 7;
  const objetivo = ((NAT[ton.l] + ton.a + off) % 12 + 12) % 12;
  let a = ((objetivo - NAT[l]) % 12 + 12) % 12;
  if (a > 6) a -= 12;
  return { l, a, paso };
}

function escala(tipo, ton) {
  if (tipo.melodica) {
    const sube = [0, 2, 3, 5, 7, 9, 11, 12];   // 6ª y 7ª elevadas
    const nat = [0, 2, 3, 5, 7, 8, 10, 12];    // al bajar, como la natural
    return sube.map((o, i) => nota(ton, o, i)).concat([6, 5, 4, 3, 2, 1, 0].map(i => nota(ton, nat[i], i)));
  }
  return tipo.offsets.map((o, i) => nota(ton, o, i));
}

/* Tónica desde una línea adicional por debajo (Si3 en sol, Re2 en fa): así la
   octava de arriba no pasa de una línea adicional y los bemoles agudos no se
   salen de la celda. */
function colocar(notas, ton, clave) {
  const base = clave === 'sol' ? 27 : 15;
  const idx0 = ton.l + 7 * Math.ceil((base - ton.l) / 7);
  return notas.map(n => {
    const oct = Math.floor((idx0 + n.paso) / 7);
    return { l: n.l, a: n.a, paso: n.paso, oct, key: LETRAS[n.l] + '/' + oct };
  });
}

function armaduraDe(tipo, ton) {
  const lista = tipo.familia === 'mayor' ? TONICAS_MAY : TONICAS_MEN;
  const i = lista.findIndex(t => t[0] === LETRAS[ton.l] && t[1] === ton.a);
  const [n, acc] = ARM[i];
  const porLetra = {};
  (acc === '#' ? ORDEN_SOST : ORDEN_BEM).slice(0, n).forEach(l => { porLetra[l] = acc === '#' ? 1 : -1; });
  return { n, acc, vex: acc === '#' ? VEX_SOST[n] : VEX_BEM[n], porLetra };
}

/* Signo a escribir en cada nota: el compás arrastra las alteraciones por letra y
   octava, partiendo de la armadura (o de natural, si no hay). */
function glifos(notas, porLetra) {
  const activo = {};
  return notas.map(n => {
    const cur = n.key in activo ? activo[n.key] : (porLetra[LETRAS[n.l]] || 0);
    activo[n.key] = n.a;
    const glyph = n.a === cur ? '' : n.a === 2 ? '##' : n.a === 1 ? '#' : n.a === -1 ? 'b' : n.a === -2 ? 'bb' : 'n';
    return { key: n.key, a: n.a, glyph };
  });
}

function nombreEscala(tipo, ton) {
  const t = ES[ton.l] + ACC_TXT[String(ton.a)];
  return (tipo.familia === 'menor' ? t.toLowerCase() : t) + ' ' + tipo.nombre;
}

function semilla(familia, modo) {
  return 6100 + Object.keys(FAMILIAS).indexOf(familia) * 10 + MODOS.indexOf(modo);
}

function generarEjercicios(total, seed, familia, modo) {
  const rnd = mulberry32(seed);
  const barajar = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const tipos = TIPOS.filter(t => FAMILIAS[familia].tipos.indexOf(t.id) >= 0);
  const out = [];
  const base = Math.floor(total / FASES.length), resto = total % FASES.length;

  FASES.forEach((f, fi) => {
    const meta = base + (fi < resto ? 1 : 0);
    const enFa = Math.round(meta * f.fa);
    const casos = [];
    tipos.forEach(tipo => {
      (tipo.familia === 'mayor' ? TONICAS_MAY : TONICAS_MEN).forEach((t, i) => {
        if (f.niveles.indexOf(ARM[i][0]) < 0) return;
        Object.keys(CLAVES).forEach(clave => {
          if (clave === 'fa' && f.fa === 0) return;   // regla dura: nada de fa en el tramo inicial
          casos.push({ tipo, ton: { l: LETRAS.indexOf(t[0]), a: t[1] }, clave, fase: fi });
        });
      });
    });

    /* Por costes: cuota de clave de fa, reparto de tipos y no repetir tónica.
       Repetido exacto no puede haber: cada caso sale una vez del montón. */
    const elegidos = [];
    const libres = barajar(casos);
    while (elegidos.length < meta && libres.length) {
      const hoja = out.concat(elegidos);
      const nFa = elegidos.filter(x => x.clave === 'fa').length;
      let mejor = 0, mejorCoste = Infinity;
      libres.forEach((c, idx) => {
        let coste = 0;
        if (c.clave === 'fa' && nFa >= enFa) coste += 6;
        if (c.clave === 'sol' && elegidos.length - nFa >= meta - enFa) coste += 6;
        coste += hoja.filter(x => x.tipo.id === c.tipo.id).length * 2;
        if (hoja.some(x => x.ton.l === c.ton.l && x.ton.a === c.ton.a)) coste += 3;
        if (hoja.some(x => x.tipo.id === c.tipo.id && x.ton.l === c.ton.l && x.ton.a === c.ton.a)) coste += 40;
        if (coste < mejorCoste) { mejorCoste = coste; mejor = idx; }
      });
      elegidos.push(libres.splice(mejor, 1)[0]);
    }
    barajar(elegidos).forEach(c => out.push(c));
  });

  // En identificar, la mitad con armadura y la mitad con alteraciones, como los tests.
  const conArm = modo === 'identificar'
    ? barajar(out.map((_, i) => i % 2 === 0))
    : out.map(() => modo === 'escribir-con-armadura');

  return out.slice(0, total).map((c, i) => {
    const arm = armaduraDe(c.tipo, c.ton);
    return {
      tipo: { id: c.tipo.id, familia: c.tipo.familia, nombre: c.tipo.nombre },
      nombre: nombreEscala(c.tipo, c.ton),
      clave: c.clave, fase: c.fase, conArmadura: conArm[i],
      arm: { n: arm.n, acc: arm.acc, vex: arm.vex },
      notas: glifos(colocar(escala(c.tipo, c.ton), c.ton, c.clave), conArm[i] ? arm.porLetra : {}),
    };
  });
}

/* --------------------------------------------------------------- render */

const RENDER_FN = `
/* Un pentagrama por escala, a ancho completo. Las notas se colocan a mano, a
   paso fijo, con TickContext: así una escala de 8 notas y la melódica de 15
   quedan igual de ordenadas, y ficha y solución comparten maqueta. */
function dibujarEscala(divId, ej, opts) {
  const { Renderer, Stave, StaveNote, Accidental, TickContext, ModifierContext } = VexFlow;
  const ROJO = '#c0392b';
  const div = document.getElementById(divId);
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(opts.w, opts.h);
  const ctx = renderer.getContext();
  const clef = ej.clave === 'sol' ? 'treble' : 'bass';

  const stave = new Stave(4, opts.y, opts.w - 10, { spaceAboveStaffLn: opts.arriba });
  stave.addClef(clef);
  if (opts.firma && ej.arm.n > 0) stave.addKeySignature(ej.arm.vex);
  stave.setContext(ctx).draw();
  const svg = div.querySelector('svg');
  if (opts.firma && opts.rojo) {
    Array.prototype.forEach.call(svg.querySelectorAll('.vf-keysignature *'), function (el) {
      el.setAttribute('fill', ROJO); el.setAttribute('stroke', ROJO);
    });
  }

  if (opts.notas) {
    const x0 = stave.getNoteStartX();
    // Aire al final: con 15 notas la última quedaba pegada a la barra final.
    const fin = stave.getX() + stave.getWidth() - 22;
    const paso = (fin - x0) / ej.notas.length;
    ej.notas.forEach(function (n, i) {
      const sn = new StaveNote({ keys: [n.key], duration: 'w', clef: clef });
      let acc = null;
      if (n.glyph) { acc = new Accidental(n.glyph); sn.addModifier(acc, 0); }
      sn.setStave(stave);
      sn.addToModifierContext(new ModifierContext());
      const tc = new TickContext();
      tc.addTickable(sn);
      tc.preFormat();
      tc.setX(x0 + paso * (i + 0.5) - x0);
      if (opts.rojo) {
        sn.setStyle({ fillStyle: ROJO, strokeStyle: ROJO });
        if (acc) acc.setStyle({ fillStyle: ROJO, strokeStyle: ROJO });
      }
      sn.setContext(ctx).drawWithStyle();
    });
  }
  svg.setAttribute('viewBox', '0 0 ' + opts.w + ' ' + opts.h);
  svg.style.width = '100%';
  svg.style.height = 'auto';
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
  .instr { font-size: 9.5pt; margin: 0 0 4px; color: #333; line-height: 1.35; }
  .leyenda { font-size: 8.5pt; color: #555; margin: 0; line-height: 1.3; }
  .datos { display: flex; gap: 18px; font-size: 9pt; color: #555; margin-top: 5px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  .fila { position: relative; page-break-inside: avoid; border: 1px solid #e8e0cc; border-radius: 6px; padding: 2px 6px 3px; margin-bottom: 3px; }
  .fila svg { display: block; }
  .num { position: absolute; top: 3px; left: 7px; font-size: 8.5pt; font-weight: 700; color: #9a7b28; }
  /* Con margen inferior: sin él, los rabitos de «p» o «y» del enunciado invadían
     la caja del pentagrama y el detector de glifos cortados daba falsos avisos. */
  .pide { font-size: 10pt; margin: 0 0 3px 22px; line-height: 1.3; color: #1a1a1a; }
  .linea { display: flex; align-items: baseline; gap: 6px; font-size: 9.5pt; margin: 0 6px 1px; }
  .linea b { font-weight: 600; }
  .linea > span { flex: 1; border-bottom: 1px solid #9a9a9a; height: 13px; }
  .linea .val { border: 0; color: #c0392b; font-weight: 600; font-size: 10.5pt; height: auto; }
  .pie { margin-top: 5px; border-top: 1px solid #ddd; padding-top: 4px;
         font-size: 8pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #c0392b; color: #fff; font-size: 8.5pt;
             font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function textos(familia, modo) {
  const fam = FAMILIAS[familia];
  const tipos = TIPOS.filter(t => fam.tipos.indexOf(t.id) >= 0);
  const hayMelodica = tipos.some(t => t.melodica);
  const melodica = hayMelodica ? ' La menor melódica se escribe subiendo y bajando: 15 notas.' : '';
  const titulo = { identificar: 'Identificar ', escribir: 'Escribir ', 'escribir-con-armadura': 'Escribir con armadura ' }[modo] + fam.titulo;
  const lista = tipos.map(t => t.nombre).join(', ').replace(/, ([^,]*)$/, ' y $1');
  if (modo === 'identificar') {
    const que = tipos.length === 1
      ? `Todas son ${fam.titulo}: escribe debajo de cada una su nombre, con la tónica.`
      : `Escribe debajo de cada escala su nombre: la tónica y el tipo (${lista}).`;
    return {
      titulo,
      instrucciones: `${que} Unas llevan armadura y otras las alteraciones delante de cada nota. Fíjate primero en la clave.`,
    };
  }
  if (modo === 'escribir') {
    return {
      titulo,
      instrucciones: `Escribe en cada pentagrama la escala indicada, subiendo desde la tónica, sin armadura: cada alteración delante de su nota.${melodica}`,
    };
  }
  const familias = new Set(tipos.map(t => t.familia));
  const regla = familias.size === 2
    ? 'Las mayores, las mixtas y la mixolidia llevan la armadura de su tonalidad mayor; las menores y la dórica, la de su tonalidad menor.'
    : familias.has('menor') ? 'Todas llevan la armadura de su tonalidad menor.' : 'Todas llevan la armadura de su tonalidad mayor.';
  return {
    titulo,
    instrucciones: `Escribe primero la armadura y después la escala, subiendo desde la tónica. Escribe solo las alteraciones que no estén en la armadura. ${regla}${melodica}`,
  };
}

function construirHtml(cfg) {
  const filas = cfg.ejercicios.map((e, i) => {
    if (cfg.modo === 'identificar') {
      const resp = cfg.solucion ? `<span class="val">${e.nombre}</span>` : '<span></span>';
      return `<div class="fila"><span class="num">${i + 1}</span><div id="c${i}"></div><p class="linea"><b>Escala:</b>${resp}</p></div>`;
    }
    return `<div class="fila"><span class="num">${i + 1}</span><p class="pide"><b>${e.nombre}</b></p><div id="c${i}"></div></div>`;
  }).join('');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="hoja">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORIAMUSICAL.COM.ES &middot; FICHA DE ESCALAS</div>
        <h1>${cfg.titulo}${cfg.solucion ? '<span class="sol-tag">SOLUCIONES</span>' : ''}</h1>
      </div>
      <img class="logo" src="${LOGO_DATA_URI}" width="34" height="35" alt="">
    </div>
    <p class="instr">${cfg.instrucciones}</p>
    <p class="leyenda">De menos a más: armaduras con pocas alteraciones en clave de sol, y después más alteraciones y la clave de fa.</p>
    ${cfg.solucion ? '' : '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>'}
  </div>
  ${filas}
  <div class="pie"><span>${cfg.pie}</span><span>teoriamusical.com.es</span></div>
</div>
</body></html>`;
}

/* ----------------------------------------------------------------- main */

/* Alto justo: por encima, el bemol de un La5; por debajo, un Si3 con su línea
   adicional y un sostenido. Ancho lógico mayor que el real: se reduce al ancho
   de la hoja y la melódica de 15 notas cabe sin apretar las alteraciones. */
const PENTA = { w: 860, h: 104, y: 2, arriba: 3 };

async function generarFicha(browser, opts) {
  const { familia, modo, solucion, ejercicios, png } = opts;
  const { titulo, instrucciones } = textos(familia, modo);
  const pie = `Escalas &middot; ${titulo.toLowerCase()}` + (solucion ? ' &middot; soluciones' : '') + ` &middot; ${ejercicios.length} ejercicios`;

  const page = await browser.newPage({ deviceScaleFactor: 3 });
  await page.setViewportSize({ width: 850, height: 1200 });
  await page.setContent(construirHtml({ titulo, instrucciones, pie, solucion, modo, ejercicios }));
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });

  for (let i = 0; i < ejercicios.length; i++) {
    const e = ejercicios[i];
    const escribir = modo !== 'identificar';
    await page.evaluate(a => dibujarEscala(a[0], a[1], a[2]), ['c' + i, e, {
      ...PENTA,
      notas: !escribir || solucion,
      firma: escribir ? (solucion && e.conArmadura) : e.conArmadura,
      rojo: escribir && solucion,
    }]);
  }

  const nombre = `ficha-${modo}-escalas-${familia}${solucion ? '-soluciones' : ''}`;
  const pdfPath = path.join(OUT_DIR, nombre + '.pdf');
  const sobra = await page.evaluate(() => Math.round(document.querySelector('.hoja').scrollHeight - 297 / 25.4 * 96));
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
  const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);

  const svgs = await page.$$('.fila svg');
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

module.exports = { generarEjercicios, semilla, TIPOS, FAMILIAS, MODOS, FASES, TONICAS_MAY, TONICAS_MEN, TOTAL: 8 };

if (require.main !== module) return;

(async () => {
  const png = process.argv.includes('--png');
  const TOTAL = 8;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  let avisos = 0;
  for (const familia of Object.keys(FAMILIAS)) {
    for (const modo of MODOS) {
      const ejercicios = generarEjercicios(TOTAL, semilla(familia, modo), familia, modo);
      for (const solucion of [false, true]) {
        const r = await generarFicha(browser, { familia, modo, solucion, ejercicios, png });
        const problemas = [];
        if (r.paginas !== 1) problemas.push(`ocupa ${r.paginas} páginas (sobran ${r.sobra}px)`);
        if (r.cortes.length) problemas.push(`${r.cortes.length} pentagramas con glifos cortados`);
        avisos += problemas.length;
        console.log('  ' + (problemas.length ? '!' : '✓') + ' ' + path.basename(r.pdfPath) + (problemas.length ? '  ATENCION: ' + problemas.join('; ') : `  (margen ${-r.sobra}px)`));
        r.cortes.slice(0, 4).forEach(c => console.log(`      · pentagrama ${c.celda}: se corta ${[c.arriba ? 'por arriba' : '', c.abajo ? 'por abajo' : ''].filter(Boolean).join(' y ')}`));
      }
    }
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · fichas en ${path.relative(ROOT, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
