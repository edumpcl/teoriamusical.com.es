'use strict';
/**
 * Fichas imprimibles de digitaciones (A4, una cara) para los instrumentos de pistones.
 *
 *   node tools/generate-fichas-digitaciones.js trompeta
 *   node tools/generate-fichas-digitaciones.js --todos
 *   node tools/generate-fichas-digitaciones.js trompeta --png=DIR
 *
 * Dos hojas por instrumento:
 *   1. La tabla completa, para el atril.
 *   2. Para rellenar: la misma tabla con la columna de pistones vacia, para
 *      escribir la digitacion de cada nota. La primera hoja hace de solucion.
 *
 * A DOS COLUMNAS: 31 notas en una sola columna no caben en A4 con cabecera y
 * leyenda. Partidas en dos, sobra sitio y se lee mejor desde el atril.
 *
 * Los datos salen del MISMO sitio que la tabla de la pagina
 * (tools/gen_tabla_digitaciones.js, que a su vez los saca del motor del
 * diagrama), asi que las tres cosas no pueden contradecirse.
 */
const path = require('path');
const fs = require('fs');

const RAIZ = path.join(__dirname, '..');
const OUT_DIR = path.join(RAIZ, 'assets/img/digitaciones/fichas');

const INSTRUMENTOS = {
  trompeta:   { transpone: -2, clef: 'sol', nombre: 'la trompeta en Si♭', corto: 'trompeta',
                pagina: '/diccionario-musical/notas-de-la-trompeta/' },
  fliscorno:  { transpone: -2, clef: 'sol', nombre: 'el fliscorno en Si♭', corto: 'fliscorno',
                pagina: '/diccionario-musical/notas-del-fliscorno/' },
  // No transpone: en la tradicion española se lee a sonido real en clave de fa.
  bombardino: { transpone: 0,  clef: 'fa', nombre: 'el bombardino', corto: 'bombardino',
                pagina: '/diccionario-musical/notas-del-bombardino/' },
  tuba:       { transpone: 0,  clef: 'fa', nombre: 'la tuba', corto: 'tuba',
                pagina: '/diccionario-musical/notas-de-la-tuba/' },
  // Trompa DOBLE: dos digitaciones por nota (lado de Fa y de Si♭) y la clave cambia con la altura (fa por
  // debajo de Do4, sol desde Do4). Son 49 notas: dos hojas A4, una por clave. Suena una 5.ª justa mas grave.
  trompa:     { transpone: -7, doble: true, nombre: 'la trompa doble en Fa/Si♭', corto: 'trompa',
                pagina: '/diccionario-musical/notas-de-la-trompa/', mm: 1.7 },
};

const SHARP = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
const FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇' };
const sub = (n) => String(n).split('').map((c) => SUB[c] || c).join('');

function aMidi(clave) {
  const m = /^([A-Za-z]+)(#?)(-?\d+)$/.exec(clave);
  const base = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 }[m[1]];
  return (Number(m[3]) + 1) * 12 + base + (m[2] ? 1 : 0);
}
function nombre(midi) {
  const i = ((midi % 12) + 12) % 12;
  const o = sub(Math.floor(midi / 12) - 1);
  return SHARP[i] === FLAT[i] ? [SHARP[i] + o, null] : [SHARP[i] + o, FLAT[i] + o];
}

function leerMotor(inst) {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/digitaciones-' + inst + '-engine.js'), 'utf8');
  const caja = {};
  for (const [nom, re] of [['FING', /var FING = \{[\s\S]*?\n  \};/],
    ['ORDEN', /var ORDEN = \[[\s\S]*?\];/], ['KEYS', /var KEYS = \[[\s\S]*?\n  \];/]]) {
    // eslint-disable-next-line no-eval
    eval(src.match(re)[0].replace('var ' + nom, 'caja.' + nom));
  }
  return caja;
}

/* Trompa doble: CHART del motor = { 'Do2': '0|13', ... } (lado de Fa | lado de Si♭; '-' = no se toca por ese lado).
   El lado de Fa lleva SIEMPRE el pulgar (4.º rotor) pulsado; el de Si♭, suelto. Dibujo: rotores 1, 2, 3 y 4. */
function datosDoble(inst) {
  const cfg = INSTRUMENTOS[inst];
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/digitaciones-trompa-engine.js'), 'utf8');
  const caja = {};
  // eslint-disable-next-line no-eval
  eval(src.match(/var CHART = [{][^}]*[}];/)[0].replace('var CHART', 'caja.CHART'));
  const lado = (v, pulgar) => {
    if (v === '-') return null;
    const dedos = v === '0' ? [] : v.split('');
    return [dedos.indexOf('1') > -1, dedos.indexOf('2') > -1, dedos.indexOf('3') > -1, !!pulgar];
  };
  const filas = Object.keys(caja.CHART).map((clave) => {
    const midi = aMidi(clave);
    const [esc, escBem] = nombre(midi);
    const [pf, ps] = caja.CHART[clave].split('|');
    const [sue, sueBem] = nombre(midi + cfg.transpone);
    return { clave, esc, escBem, clef: midi < 60 ? 'fa' : 'sol', fa: lado(pf, true), sib: lado(ps, false), sue, sueBem };
  });
  pentagramasDe(inst, filas).forEach((p, i) => { filas[i].pent = p; });
  return { cfg, filas };
}

function datos(inst) {
  if (INSTRUMENTOS[inst].doble) return datosDoble(inst);
  const cfg = INSTRUMENTOS[inst];
  const { FING, ORDEN, KEYS } = leerMotor(inst);
  const orden = (ORDEN && ORDEN.length ? ORDEN : Object.keys(FING)).filter((k) => FING[k]);
  const filas = orden.map((clave) => {
      const midi = aMidi(clave);
      const [esc, escBem] = nombre(midi);
      const pulsados = pulsadosDe(FING[clave]);
      const nums = pulsados.map((k) => KEYS.findIndex((x) => x.id === k) + 1).sort((a, b) => a - b);
      const [sue, sueBem] = cfg.transpone ? nombre(midi + cfg.transpone) : [null, null];
      return { clave, esc, escBem, nums, dibujo: KEYS.map((k) => pulsados.indexOf(k.id) > -1), sue, sueBem };
    });
  pentagramasDe(inst, filas).forEach((p, i) => { filas[i].pent = p; });
  return { cfg, pistones: KEYS.length, filas };
}

/* Los motores no guardan la digitacion igual: trompeta y fliscorno usan
   {keys:[...]} y bombardino y tuba el array pelado. Sin esto, en los segundos
   .keys resuelve a Array.prototype.keys (una funcion) y revienta. */
function pulsadosDe(v) {
  if (Array.isArray(v)) return v;
  return (v && Array.isArray(v.keys)) ? v.keys : [];
}


/* ---- pentagramas (SVG de Verovio, los mismos de la tabla de la pagina) ----
   En la pagina todas las notas de una clave comparten lienzo para que la
   columna quede alineada. En una hoja A4 eso no cabe: con 31-37 notas en dos
   columnas cada fila tiene que ser baja, y el lienzo comun lo manda la nota mas
   extrema (3 lineas adicionales). Aqui cada pentagrama va recortado a su
   contenido y se centra en la celda: las notas del centro ocupan poco y solo
   las extremas piden mas alto. Todos con la MISMA separacion entre lineas. */
const PENT_DIR = path.join(RAIZ, 'assets/img/digitaciones/pentagramas');
const MM_ENTRE_LINEAS = 1.25; // separacion entre lineas del pentagrama en el papel
const UNIDADES_VIEWBOX = 25;  // el viewBox exterior del SVG es el interior / 25
const ESPACIO_SVG = 180;      // unidades internas entre dos lineas

function pentagramasDe(inst, filas) {
  const cfg = INSTRUMENTOS[inst];
  const indice = JSON.parse(fs.readFileSync(path.join(PENT_DIR, 'indice.json'), 'utf8'));
  const k = (cfg.mm || MM_ENTRE_LINEAS) / ESPACIO_SVG;                 // mm por unidad interna
  return filas.map((f) => {
    const clef = f.clef || cfg.clef;
    const e = indice[clef + '|' + f.clave];
    if (!e) throw new Error('falta el pentagrama de ' + f.clave + ' en clave de ' + clef + '; corre tools/gen-pentagramas-notas.js');
    let svg = fs.readFileSync(path.join(PENT_DIR, e.f), 'utf8');
    const vb = /<svg class="definition-scale"[^>]*viewBox="0 ([-\d.]+) (\d+) (\d+)"/.exec(svg);
    const ty = Number(/class="page-margin"[^>]*transform="translate\(([\d.]+), ([\d.]+)\)"/.exec(svg)[2]);
    const lineas = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
    // Recorta el lienzo al contenido de ESTA nota: el que dejo el generador es el comun de la clave.
    const cab = [...svg.matchAll(/<(?:use|path)[^>]*transform="translate\(([\d.]+), (-?[\d.]+)\)/g)].map((m) => Number(m[2]));
    const lad = [...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \d+" stroke-width="22"/g)].map((m) => Number(m[1]));
    const ys = [...lineas, ...cab, ...lad];
    const arriba = Math.min(...ys, lineas[0]) + ty - 270;       // ~hueco por encima de lo mas alto
    const abajo = Math.max(...ys, lineas[4]) + ty + 270;
    const alto = abajo - arriba;
    svg = svg
      .replace(/(<svg class="definition-scale"[^>]*viewBox=")0 [-\d.]+ (\d+) \d+"/, (m, p, w) => `${p}0 ${arriba} ${w} ${alto}"`)
      .replace(/^(<svg id="[^"]+" viewBox="0 0 [\d.]+ )[\d.]+" width="\d+" height="\d+"/, (m, p) => `${p}${alto / UNIDADES_VIEWBOX}" width="${(vb[2] * k).toFixed(2)}mm" height="${(alto * k).toFixed(2)}mm"`);
    return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
  });
}

const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(RAIZ, 'assets/img/2026/04/bach_favicon.png')).toString('base64');

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; background: #fff; }
  .hoja { width: 210mm; min-height: 297mm; padding: 9mm 11mm 5mm; }
  .cab { border-bottom: 2px solid #8b6914; padding-bottom: 6px; margin-bottom: 9px; }
  .cab-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .logo { width: 32px; height: 33px; flex: none; }
  .marca { font-size: 8.5pt; color: #8b6914; font-weight: bold; letter-spacing: .05em; }
  h1 { font-size: 16.5pt; margin: 3px 0; }
  .instr { font-size: 9pt; margin: 0; color: #333; line-height: 1.35; }
  .datos { display: flex; gap: 16px; font-size: 8.5pt; color: #555; margin-top: 6px; }
  .datos span { flex: 1; border-bottom: 1px solid #bbb; padding-bottom: 2px; }
  .datos span b { font-weight: normal; color: #888; }
  .cols { display: flex; gap: 7mm; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th, td { border: 1px solid #c9bfa4; text-align: center; padding: 1.6mm 1mm; font-size: 9pt; }
  thead th { background: #8b6914; color: #fff; font-size: 8.5pt; border-color: #6d5210; }
  thead th small { display: block; font-weight: normal; letter-spacing: .3em; font-size: 7pt; }
  td.nota { font-weight: bold; text-align: left; padding-left: 3mm; }
  td.nota small, td.suena small { display: block; font-size: 7pt; font-weight: normal; color: #8a7c5c; }
  td.pent { padding: .5mm 1mm; }
  td.pent img { display: block; margin: 0 auto; }
  td.dib { font-family: 'DejaVu Sans', Arial, sans-serif; letter-spacing: .22em; }
  td.suena { color: #555; font-size: 8.5pt; }
  td.hueco { background: #fff; }
  tr.aire td { background: #f6f1e4; }
  .leyenda { margin-top: 8px; font-size: 8.5pt; color: #444; line-height: 1.45; }
  .leyenda b { color: #8b6914; }
  .pie { margin-top: 7px; border-top: 1px solid #ddd; padding-top: 5px; font-size: 7.5pt; color: #888; display: flex; justify-content: space-between; }
  .sol-tag { display: inline-block; background: #8b6914; color: #fff; font-size: 8pt; font-weight: bold; padding: 1px 7px; border-radius: 3px; vertical-align: middle; margin-left: 8px; }
`;

function tablaHtml(filas, cfg, pistones, rellenar) {
  // En la hoja de referencia no hay «Cuáles»: el dibujo de los pistones lo dice todo.
  // En la de completar si, porque se rellena con los dos (dibujo y numeros).
  const anchos = rellenar ? (cfg.transpone ? [16, 28, 20, 23, 13] : [20, 28, 24, 28])
    : (cfg.transpone ? [18, 34, 28, 20] : [24, 40, 36]);
  const cab = `<thead><tr><th style="width:${anchos[0]}%">Nota</th>`
    + `<th style="width:${anchos[1]}%">Pentagrama<small>clave de ${cfg.clef}</small></th>`
    + `<th style="width:${anchos[2]}%">Pistones<small>${Array.from({ length: pistones }, (_, i) => i + 1).join(' ')}</small></th>`
    + (rellenar ? `<th style="width:${anchos[3]}%">Cuáles</th>` : '')
    + (cfg.transpone ? `<th style="width:${anchos[rellenar ? 4 : 3]}%">Suena</th>` : '') + '</tr></thead>';
  const tr = filas.map((f) => {
    const texto = f.nums.length === 0 ? 'al aire'
      : f.nums.length === 1 ? f.nums[0] + '.º'
        : f.nums.slice(0, -1).map((x) => x + '.º').join(', ') + ' y ' + f.nums[f.nums.length - 1] + '.º';
    const dib = f.dibujo.map((on) => (on ? '●' : '○')).join('');
    return `<tr${f.nums.length === 0 && !rellenar ? ' class="aire"' : ''}>`
      + `<td class="nota">${f.esc}${f.escBem ? `<small>${f.escBem}</small>` : ''}</td>`
      + `<td class="pent"><img src="${f.pent}" alt=""></td>`
      + `<td class="dib${rellenar ? ' hueco' : ''}">${rellenar ? '' : dib}</td>`
      + (rellenar ? '<td class="hueco"></td>' : '')
      + (cfg.transpone ? `<td class="suena">${f.sue}${f.sueBem ? `<small>${f.sueBem}</small>` : ''}</td>` : '')
      + '</tr>';
  });
  return `<table>${cab}<tbody>${tr.join('')}</tbody></table>`;
}

/* ---- trompa doble: dos hojas (clave de fa y clave de sol), cada una a dos columnas ---- */
function tablaDobleHtml(filas, rellenar) {
  const rot = '1 2 3 4';
  const cab = '<thead><tr><th style="width:14%">Nota</th>'
    + '<th style="width:28%">Pentagrama</th>'
    + `<th style="width:21%">Lado de Fa<small>pulgar pulsado</small><small>${rot}</small></th>`
    + `<th style="width:21%">Lado de Si♭<small>pulgar suelto</small><small>${rot}</small></th>`
    + '<th style="width:16%">Suena</th></tr></thead>';
  const dib = (l) => (l === null ? '<span class="na">—</span>' : l.map((on) => (on ? '●' : '○')).join(''));
  const tr = filas.map((f) => '<tr>'
    + `<td class="nota">${f.esc}${f.escBem ? `<small>${f.escBem}</small>` : ''}</td>`
    + `<td class="pent"><img src="${f.pent}" alt=""></td>`
    + (rellenar ? '<td class="dib hueco"></td><td class="dib hueco"></td>'
      : `<td class="dib">${dib(f.fa)}</td><td class="dib">${dib(f.sib)}</td>`)
    + `<td class="suena">${f.sue}${f.sueBem ? `<small>${f.sueBem}</small>` : ''}</td>`
    + '</tr>');
  return `<table>${cab}<tbody>${tr.join('')}</tbody></table>`;
}

function htmlDoble(inst, rellenar) {
  const { cfg, filas } = datos(inst);
  const grupos = [['fa', 'Notas graves, en clave de fa'], ['sol', 'Notas agudas, en clave de sol']]
    .map(([clef, rotulo]) => ({ rotulo, filas: filas.filter((f) => f.clef === clef) }));
  const titulo = rellenar ? `Digitaciones de ${cfg.nombre}: complétalas` : `Digitaciones de ${cfg.nombre}`;
  const instr = rellenar
    ? 'Escribe qué rotores hay que pulsar en cada nota, por el lado de Fa (pulgar pulsado) y por el de Si♭ (pulgar suelto): ● pulsado, ○ suelto. Si una nota no se toca por un lado, pon una raya. La columna «Suena» te la damos como pista.'
    : `Las ${filas.length} notas de la trompa doble, con sus dos digitaciones. ● es rotor pulsado y ○ suelto; 1, 2 y 3 son los de los dedos y 4 es el del pulgar, que cambia de lado. «—»: esa nota no se toca por ese lado.`;
  const hojas = grupos.map((g, i) => {
    const corte = Math.ceil(g.filas.length / 2);
    return `<div class="hoja${i ? ' ultima' : ''}">
  <div class="cab">
    <div class="cab-top">
      <div>
        <div class="marca">TEORÍA MUSICAL · HOJA ${i + 1} DE ${grupos.length}</div>
        <h1>${titulo}${rellenar ? '' : '<span class="sol-tag">referencia</span>'}</h1>
        <p class="instr"><b>${g.rotulo}</b> (${g.filas.length} notas). ${instr}</p>
      </div>
      <img class="logo" src="${LOGO}" alt="">
    </div>
    ${rellenar ? '<div class="datos"><span><b>Nombre:</b></span><span><b>Curso:</b></span><span><b>Fecha:</b></span></div>' : ''}
  </div>
  <div class="cols">
    <div style="flex:1">${tablaDobleHtml(g.filas.slice(0, corte), rellenar)}</div>
    <div style="flex:1">${tablaDobleHtml(g.filas.slice(corte), rellenar)}</div>
  </div>
  <div class="leyenda">
    <p><b>Es un instrumento transpositor:</b> la trompa en Fa suena una <b>quinta justa más grave</b> de lo escrito. Un <b>Do₄ escrito</b> suena un <b>Fa₃</b>.</p>
    <p><b>Fa♯ y Sol♭ son la misma nota</b>, solo cambia cómo se escribe según la tonalidad. Los subíndices son la octava. Es la digitación más afinada de cada lado; el intérprete elige la que suene mejor.</p>
  </div>
  <div class="pie"><span>Digitaciones de ${cfg.corto}${rellenar ? ' · para completar' : ''} · teoriamusical.com.es${cfg.pagina}</span><span>teoriamusical.com.es</span></div>
</div>`;
  }).join('');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${CSS} .hoja { page-break-after: always; } .hoja.ultima { page-break-after: auto; } td.dib .na { color: #aaa; }</style></head><body>${hojas}</body></html>`;
}

function html(inst, rellenar) {
  if (INSTRUMENTOS[inst].doble) return htmlDoble(inst, rellenar);
  const { cfg, filas, pistones } = datos(inst);
  const corte = Math.ceil(filas.length / 2);
  const titulo = rellenar
    ? `Digitaciones de ${cfg.nombre}: complétalas`
    : `Digitaciones de ${cfg.nombre}`;
  const instr = rellenar
    ? 'Escribe qué pistones hay que pulsar en cada nota: primero dibujándolos (● pulsado, ○ suelto) y luego con su número. La columna «Suena» te la damos como pista, porque es la que más cuesta.'
    : `Las ${filas.length} notas del registro habitual con su digitación. ● es pistón pulsado y ○ suelto, en el orden en que los tienes bajo los dedos.`;

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

  <div class="cols">
    <div style="flex:1">${tablaHtml(filas.slice(0, corte), cfg, pistones, rellenar)}</div>
    <div style="flex:1">${tablaHtml(filas.slice(corte), cfg, pistones, rellenar)}</div>
  </div>

  <div class="leyenda">
    <p><b>«Al aire»</b> es sin pulsar ningún pistón: la nota sale solo con los labios, ajustando el armónico. Son las filas resaltadas${rellenar ? ' en la hoja de referencia' : ''}.</p>
    ${cfg.transpone ? `<p><b>Es un instrumento transpositor:</b> lo que lees y lo que suena no son la misma nota. Un <b>Do escrito</b> suena un <b>Si♭</b>, un tono por debajo. En una banda esto importa: tu Do no es el Do del saxofón ni el de la tuba.</p>` : ''}
    <p><b>Fa♯ y Sol♭ son la misma nota</b>, solo cambia cómo se escribe según la tonalidad. Por eso las alteradas llevan los dos nombres. Los subíndices son la octava.</p>
  </div>

  <div class="pie"><span>Digitaciones de ${cfg.corto}${rellenar ? ' · para completar' : ''} · teoriamusical.com.es${cfg.pagina}</span><span>teoriamusical.com.es</span></div>
</div></body></html>`;
}

/* ---- el bloque de descarga en la pagina ---- */
const MARCA_INI = '<!-- FICHA-DIGITACIONES:inicio -->';
const MARCA_FIN = '<!-- FICHA-DIGITACIONES:fin -->';

function bloqueDoble(inst) {
  const cfg = INSTRUMENTOS[inst];
  const n = datos(inst).filas.length;
  const base = '/assets/img/digitaciones/fichas/ficha-digitaciones-' + inst;
  const prev = '/assets/img/digitaciones/fichas/preview-ficha-digitaciones-' + inst;
  return `${MARCA_INI}
<h2>Ficha para imprimir (PDF)</h2>
<p>La misma tabla en papel, en <strong>dos hojas de A4</strong> (las notas graves, en clave de fa, y las agudas, en clave de sol), con las dos digitaciones de cada nota: lado de Fa y lado de Si♭. Y otras <strong>dos hojas para completar</strong>: las ${n} notas con las columnas de los rotores en blanco, para escribir tú la digitación. Las hojas de referencia hacen de solucionario.</p>
<figure class="tm-staff">
  <a href="${base}.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${prev}.webp"><img src="${prev}.png" width="300" height="424" loading="lazy" alt="Ficha imprimible en PDF con las digitaciones de la trompa doble, lado de Fa y lado de Si bemol"></picture></a>
  <figcaption>Primera hoja de dos: las notas graves de la trompa con sus dos digitaciones.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${base}.pdf" target="_blank" rel="noopener">Descargar las digitaciones (PDF, 2 hojas)</a>
<a class="tm-btn" href="${base}-rellenar.pdf" target="_blank" rel="noopener">Descargar las hojas para completar (PDF, 2 hojas)</a></p>
${MARCA_FIN}`;
}

function bloque(inst) {
  if (INSTRUMENTOS[inst].doble) return bloqueDoble(inst);
  const cfg = INSTRUMENTOS[inst];
  const n = datos(inst).filas.length;
  const base = '/assets/img/digitaciones/fichas/ficha-digitaciones-' + inst;
  const prev = '/assets/img/digitaciones/fichas/preview-ficha-digitaciones-' + inst;
  return `${MARCA_INI}
<h2>Ficha para imprimir (PDF)</h2>
<p>La misma tabla en papel, en una cara de A4 a dos columnas, para el atril. Y una <strong>segunda hoja para completar</strong>: las ${n} notas con la columna de pistones en blanco, para escribir tú la digitación. La hoja de referencia hace de solución.</p>
<figure class="tm-staff">
  <a href="${base}.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${prev}.webp"><img src="${prev}.png" width="300" height="424" loading="lazy" alt="Ficha imprimible en PDF con las digitaciones de ${cfg.corto}"></picture></a>
  <figcaption>Hoja A4 con las ${n} notas y su digitación.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${base}.pdf" target="_blank" rel="noopener">Descargar las digitaciones (PDF)</a>
<a class="tm-btn" href="${base}-rellenar.pdf" target="_blank" rel="noopener">Descargar la hoja para completar (PDF)</a></p>
${MARCA_FIN}`;
}

/** Lo coloca DESPUES del diagrama interactivo: primero el dato, luego el juguete,
    luego el papel. Idempotente: si ya esta, lo sustituye en el sitio. */
function ponerBloque(inst) {
  const f = path.join(RAIZ, INSTRUMENTOS[inst].pagina.replace(/^\/+|\/+$/g, ''), 'index.html');
  let h = fs.readFileSync(f, 'utf8');
  const nuevo = bloque(inst);
  if (h.indexOf(MARCA_INI) > -1) {
    h = h.slice(0, h.indexOf(MARCA_INI)) + nuevo + h.slice(h.indexOf(MARCA_FIN) + MARCA_FIN.length);
    console.log(`  ${inst}: bloque de descarga sustituido`);
  } else {
    const motor = new RegExp('tm' + inst[0].toUpperCase() + inst.slice(1) + 'Engine', 'i');
    const m = motor.exec(h);
    if (!m) throw new Error(`${inst}: no encuentro el arranque del diagrama`);
    const sig = h.indexOf('<h2', m.index);
    const pos = sig > 0 ? sig : h.indexOf('</article>');
    h = h.slice(0, pos) + nuevo + String.fromCharCode(10, 10) + h.slice(pos);
    console.log(`  ${inst}: bloque de descarga insertado tras el diagrama`);
  }
  fs.writeFileSync(f, h);
}

if (require.main !== module) { module.exports = { html, datos }; return; }

const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
  const args = process.argv.slice(2);
  const quiere = args.includes('--todos') ? Object.keys(INSTRUMENTOS)
    : args.filter((a) => INSTRUMENTOS[a]);
  if (!quiere.length) { console.log('Instrumentos: ' + Object.keys(INSTRUMENTOS).join(', ') + ' (o --todos)'); process.exit(1); }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const png = (args.find((a) => a.startsWith('--png=')) || '').slice(6);
  const ALTO = Math.round(297 / 25.4 * 96);
  let avisos = 0;

  for (const inst of quiere) {
    for (const rellenar of [false, true]) {
      const page = await browser.newPage({ deviceScaleFactor: 3 });
      await page.setViewportSize({ width: 860, height: 1240 });
      await page.setContent(html(inst, rellenar));
      const nom = 'ficha-digitaciones-' + inst + (rellenar ? '-rellenar' : '');
      const pdfPath = path.join(OUT_DIR, nom + '.pdf');
      const esperadas = INSTRUMENTOS[inst].doble ? 2 : 1;
      const sobra = await page.evaluate((h) => Math.round(Math.max(...[...document.querySelectorAll('.hoja')].map((x) => x.scrollHeight)) - h), ALTO);
      await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
      const paginas = Number((fs.readFileSync(pdfPath).toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);
      if (png) await page.screenshot({ path: path.join(png, nom + '.png'), fullPage: true });
      if (!rellenar) {
        const buf = await page.screenshot({ fullPage: true });
        const base = sharp(buf).extract({ left: 0, top: 0, width: 794 * 3, height: ALTO * 3 }).resize({ width: 300 });
        await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'preview-' + nom + '.png'));
        await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, 'preview-' + nom + '.webp'));
      }
      await page.close();
      if (paginas !== esperadas) { console.log(`  ! ${nom}.pdf ocupa ${paginas} páginas y tenían que ser ${esperadas} (sobran ${sobra}px)`); avisos++; }
      else console.log(`  ✓ ${nom}.pdf  (margen ${-sobra}px)`);
    }
    if (args.includes('--poner')) ponerBloque(inst);
  }
  await browser.close();
  console.log(`\n${avisos ? avisos + ' aviso(s)' : 'Sin avisos'} · fichas en ${path.relative(RAIZ, OUT_DIR)}`);
  process.exit(avisos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
