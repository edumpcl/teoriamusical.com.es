'use strict';
/**
 * Genera la tabla HTML de digitaciones de un instrumento de pistones y la mete
 * en su pagina, encima del diagrama interactivo.
 *
 *   node tools/gen_tabla_digitaciones.js trompeta          -> imprime la tabla
 *   node tools/gen_tabla_digitaciones.js trompeta --poner  -> la inserta
 *   node tools/gen_tabla_digitaciones.js --todos --poner   -> los cuatro
 *
 * POR QUE EXISTE: la pagina ya tiene un diagrama mucho mejor que una tabla
 * (foto real del instrumento, pistones que se iluminan, sonido), pero vive
 * dentro de <div id="tmtrompeta"></div> y lo pinta JavaScript. Google ve un div
 * vacio, la IA no puede citar las digitaciones y el lector no puede imprimirlas
 * ni hacerles una captura. La tabla NO sustituye al diagrama: va encima.
 *
 * LOS DATOS SALEN DEL PROPIO MOTOR (FING y ORDEN de
 * assets/js/digitaciones-<instrumento>-engine.js), asi que tabla y diagrama no
 * pueden contradecirse. Si el motor cambia una digitacion, se regenera y ya.
 *
 * SOLO SIRVE para los motores con la forma KEYS + FING + ORDEN: trompeta,
 * bombardino, tuba y fliscorno. La trompa (doble, en Fa y Si♭) y la corneta
 * guardan los datos de otra manera, y el trombon usa posiciones de vara en vez
 * de pistones: esos necesitan su propio tratamiento.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const PENT_DIR = path.join(RAIZ, 'assets/img/digitaciones/pentagramas');
/* Los pentagramas los graba Verovio (tools/gen-pentagramas-notas.js) y se
   ENLAZAN con <img>: son SVG autonomos (clave y nota son trazados, no texto con
   una fuente), asi que no pesan en el HTML y se cachean entre las 4 paginas. */
const PENT_INDICE = JSON.parse(fs.readFileSync(path.join(PENT_DIR, 'indice.json'), 'utf8'));
const CLAVE_ES = { sol: 'clave de sol', fa: 'clave de fa' };
/* Escala de pantalla: el SVG nace con ~11 px entre lineas; en la tabla basta con ~6. */
const ESCALA_PENT = 0.55;
function pentagrama(nota, clave) {
  const e = PENT_INDICE[clave + '|' + nota];
  if (!e) throw new Error(`falta el pentagrama de ${nota} en ${clave}; corre tools/gen-pentagramas-notas.js`);
  return `<img src="/assets/img/digitaciones/pentagramas/${e.f}" width="${Math.round(e.w * ESCALA_PENT)}" height="${Math.round(e.h * ESCALA_PENT)}" alt="${e.alt}" loading="lazy" decoding="async">`;
}

/* Cada instrumento: su motor, su pagina y cuanto transpone (semitonos que
   SUENA por debajo de lo escrito). */
const INSTRUMENTOS = {
  trompeta:   { pagina: 'diccionario-musical/notas-de-la-trompeta',   transpone: -2,  clave: 'sol', nombre: 'la trompeta en Si♭' },
  fliscorno:  { pagina: 'diccionario-musical/notas-del-fliscorno',    transpone: -2,  clave: 'sol', nombre: 'el fliscorno en Si♭' },
    // En Si♭, pero en la tradicion española se lee a SONIDO REAL en clave de fa:
  // NO transpone. Lo dice la cabecera de su propio motor.
  bombardino: { pagina: 'diccionario-musical/notas-del-bombardino',   transpone: 0,   clave: 'fa',  nombre: 'el bombardino' },
  tuba:       { pagina: 'diccionario-musical/notas-de-la-tuba',       transpone: 0,   clave: 'fa',  nombre: 'la tuba' },
  // Trompa DOBLE: dos digitaciones por nota (lado de Fa y lado de Si♭), y la clave cambia con la altura.
  // Suena una 5.ª justa (7 semitonos) por debajo de lo escrito. Datos: CHART del motor ('fa|sib').
  trompa:     { pagina: 'diccionario-musical/notas-de-la-trompa',     transpone: -7,  doble: true, nombre: 'la trompa doble en Fa/Si♭' },
  // Trombones de VARA: no hay pistones; la nota se elige con la posicion de la vara (1.ª a 7.ª) y el armonico
  // de los labios. No transponen (lo escrito es lo que suena, clave de fa). El bajo anade dos valvulas.
  trombon:      { pagina: 'diccionario-musical/notas-del-trombon',      transpone: 0, vara: true, clave: 'fa', nombre: 'trombón de varas (tenor, en Si♭)',
                  antes: /<h2>Las posiciones del trombón<\/h2>/ },
  // Corneta de palometa (Do/Re♭): sin pistones; 16 notas = armonicos 3.º a 10.º de dos series (Do y Re♭). La tabla
  // REEMPLAZA a la que ya tenia la pagina (la misma, sin pentagramas): armonico x serie, con la nota dibujada.
  corneta:    { pagina: 'diccionario-musical/notas-de-la-corneta',    transpone: 0, corneta: true, clave: 'solc', nombre: 'la corneta Do/Re♭' },
  'trombon-bajo': { pagina: 'diccionario-musical/notas-del-trombon-bajo', transpone: 0, vara: true, valvulas: true, clave: 'fa', nombre: 'trombón bajo' },
};

const OCULTO = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';

const MARCA_INI = '<!-- TABLA-DIGITACIONES:inicio (generada por tools/gen_tabla_digitaciones.js) -->';
const MARCA_FIN = '<!-- TABLA-DIGITACIONES:fin -->';

/* ---- nombres de nota ---- */
const SHARP = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
const FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇' };
const sub = (n) => String(n).split('').map((c) => SUB[c] || c).join('');

/** 'Fa#3' / 'Sol3' -> numero MIDI. Es la notacion que usan los motores. */
function aMidi(clave) {
  const m = /^([A-Za-z]+)(#?)(-?\d+)$/.exec(clave);
  if (!m) throw new Error('no entiendo la nota "' + clave + '"');
  const base = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 }[m[1]];
  if (base === undefined) throw new Error('nota desconocida: ' + clave);
  return (Number(m[3]) + 1) * 12 + base + (m[2] ? 1 : 0);
}
function nombre(midi) {
  const i = ((midi % 12) + 12) % 12;
  const o = sub(Math.floor(midi / 12) - 1);
  return SHARP[i] === FLAT[i] ? [SHARP[i] + o, null] : [SHARP[i] + o, FLAT[i] + o];
}

/** Saca FING, ORDEN y KEYS del motor sin ejecutarlo entero (es un IIFE cerrado). */
function leerMotor(inst) {
  const f = path.join(RAIZ, 'assets/js/digitaciones-' + inst + '-engine.js');
  const src = fs.readFileSync(f, 'utf8');
  const caja = {};
  for (const [nom, re] of [['FING', /var FING = \{[\s\S]*?\n  \};/],
    ['ORDEN', /var ORDEN = \[[\s\S]*?\];/],
    ['KEYS', /var KEYS = \[[\s\S]*?\n  \];/]]) {
    const m = src.match(re);
    if (!m) throw new Error(`${inst}: no encuentro ${nom} en el motor`);
    // eslint-disable-next-line no-eval
    eval(m[0].replace('var ' + nom, 'caja.' + nom));
  }
  return caja;
}

/* Los motores no guardan la digitacion igual: trompeta y fliscorno usan
   {keys:[...]} y bombardino y tuba el array pelado. Sin esto, en los segundos
   .keys resuelve a Array.prototype.keys (una funcion) y revienta. */
function pulsadosDe(v) {
  if (Array.isArray(v)) return v;
  return (v && Array.isArray(v.keys)) ? v.keys : [];
}

/* Los pistones, dibujados: ● pulsado, ○ suelto. Se lee de un golpe. */
function dibujo(pulsados, todos) {
  return todos.map((k) => (pulsados.indexOf(k.id) > -1
    ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>')).join('');
}

/* ---- trompa doble ----
   El motor guarda CHART = { 'Do2': '0|13', ... }: «lado de Fa | lado de Si♭». 0 = al aire, dígitos = rotores
   de los dedos, '-' = esa nota no se toca por ese lado. En el lado de Fa el pulgar va SIEMPRE pulsado; en el de
   Si♭, suelto. Los cuatro rotores se dibujan en el orden de la foto (1, 2, 3 y 4 = pulgar). */
function leerChartTrompa() {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/digitaciones-trompa-engine.js'), 'utf8');
  const m = src.match(/var CHART = \{[\s\S]*?\n  \};/);
  if (!m) throw new Error('trompa: no encuentro CHART en el motor');
  const caja = {};
  // eslint-disable-next-line no-eval
  eval(m[0].replace('var CHART', 'caja.CHART'));
  return caja.CHART;
}
/** '13' -> ['1','3'] · '0' -> [] · '-' -> null */
function dedosDe(s) { return s === '-' ? null : s === '0' ? [] : s.split(''); }
function lado(dedos, pulgar) {
  if (dedos === null) return { dib: '<span class="tm-dg-na">—</span>', texto: 'esta nota no se toca por este lado' };
  const todos = ['1', '2', '3', 'T'];
  const lit = dedos.concat(pulgar ? ['T'] : []);
  const dib = todos.map((k) => (lit.indexOf(k) > -1 ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>')).join('');
  const nums = dedos.map((d) => d + '.º');
  const lista = nums.length === 0 ? '' : nums.length === 1 ? nums[0] : nums.slice(0, -1).join(', ') + ' y ' + nums[nums.length - 1];
  const texto = pulgar ? (lista ? 'pulgar y ' + lista : 'solo el pulgar') : (lista || 'al aire');
  return { dib, texto };
}

function tablaDoble(inst) {
  const cfg = INSTRUMENTOS[inst];
  const CHART = leerChartTrompa();
  const filas = Object.keys(CHART).map((clave) => {
    const midi = aMidi(clave);
    const [esc, escBem] = nombre(midi);
    const [pf, ps] = CHART[clave].split('|');
    const fa = lado(dedosDe(pf), true), sib = lado(dedosDe(ps), false);
    const clef = midi < 60 ? 'fa' : 'sol';   // la misma regla que el motor: por debajo de Do₄, clave de fa
    const [s, sb] = nombre(midi + cfg.transpone);
    const suena = sb ? `${s}<small>${sb}</small>` : s;
    return '<tr>'
      + `<th scope="row">${esc}${escBem ? `<small>${escBem}</small>` : ''}</th>`
      + `<td class="tm-dg-pent">${pentagrama(clave, clef)}</td>`
      + `<td class="tm-dg-dib">${fa.dib}<span style="${OCULTO}">${fa.texto}</span></td>`
      + `<td class="tm-dg-dib">${sib.dib}<span style="${OCULTO}">${sib.texto}</span></td>`
      + `<td class="tm-dg-suena">${suena}</td>`
      + '</tr>';
  });
  const rot = '<abbr title="1.er rotor (dedo)">1</abbr> <abbr title="2.º rotor (dedo)">2</abbr> <abbr title="3.er rotor (dedo)">3</abbr> <abbr title="4.º rotor (pulgar)">4</abbr>';
  return [MARCA_INI,
    '<div class="tm-table-wrap">',
    '<table class="tm-table tm-digitaciones">',
    `<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">Todas las digitaciones de ${cfg.nombre}: ${filas.length} notas</caption>`,
    `<thead><tr><th scope="col">Nota escrita</th><th scope="col">En el pentagrama<small>fa · sol</small></th><th scope="col">Lado de Fa<small>pulgar pulsado</small><small>${rot}</small></th><th scope="col">Lado de Si♭<small>pulgar suelto</small><small>${rot}</small></th><th scope="col">Suena<small>en Fa</small></th></tr></thead>`,
    '<tbody>', filas.join('\n'), '</tbody></table></div>',
    '<p class="tm-nota-tabla"><strong>●</strong> es rotor pulsado y <strong>○</strong> suelto. Los rotores <strong>1, 2 y 3</strong> son los de los dedos y el <strong>4</strong> es el del pulgar, el que cambia de un lado al otro: pulsado, tocas por el <strong>lado de Fa</strong>; suelto, por el <strong>lado de Si♭</strong>. <strong>—</strong> significa que esa nota no se toca por ese lado. Es la digitación más afinada de cada lado: el intérprete elige la que suene mejor en cada pasaje. Desde el Do₄ la nota va en clave de sol y por debajo, en clave de fa.</p>',
    '<p class="tm-nota-tabla">La trompa en Fa es un instrumento <strong>transpositor</strong>: suena una <strong>quinta justa por debajo</strong> de lo escrito. Si tocas un <strong>Do₄ escrito</strong> suena un <strong>Fa₃</strong>. Por eso la última columna.</p>',
    MARCA_FIN].join('\n');
}

/* ---- trombones de vara ----
   El motor guarda FING = { 'Mi2': { pos: 7, harm: 2 }, ... } y, en el bajo, { pos: 3, valves: 'both' } para el registro grave
   (ahi el armonico no se indica). FUND = nota de la serie al aire de cada posicion. */
function leerVara(inst) {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/digitaciones-' + inst + '-engine.js'), 'utf8');
  const caja = {};
  for (const [nom, re] of [['FING', /var FING = \{[\s\S]*?\n  \};/], ['ORDEN', /var ORDEN = \[[\s\S]*?\];/], ['FUND', /var FUND = \{[^}]*\};/]]) {
    const m = src.match(re);
    if (!m) throw new Error(`${inst}: no encuentro ${nom} en el motor`);
    // eslint-disable-next-line no-eval
    eval(m[0].replace('var ' + nom, 'caja.' + nom));
  }
  return caja;
}
const VALV_TXT = { F: 'F', Gb: 'G♭', both: 'F + G♭' };

function tablaVara(inst) {
  const cfg = INSTRUMENTOS[inst];
  const { FING, ORDEN, FUND } = leerVara(inst);
  const filas = ORDEN.map((clave) => {
    const d = FING[clave];
    const midi = aMidi(clave);
    const [esc, escBem] = nombre(midi);
    const dib = [1, 2, 3, 4, 5, 6, 7].map((k) => (k === d.pos ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>')).join('');
    const arm = d.harm ? `${d.harm}.º` : '<span class="tm-dg-na">—</span>';
    const texto = `${d.pos}.ª posición`
      + (d.valves ? `, con ${d.valves === 'both' ? 'las dos válvulas (F y G♭, que juntas dan Re)' : 'la válvula ' + VALV_TXT[d.valves]}` : '')
      + (d.harm ? `, ${d.harm}.º armónico sobre el ${FUND[d.pos]}` : '');
    return '<tr>'
      + `<th scope="row">${esc}${escBem ? `<small>${escBem}</small>` : ''}</th>`
      + `<td class="tm-dg-pent">${pentagrama(clave, cfg.clave)}</td>`
      + `<td class="tm-dg-dib">${dib}<span style="${OCULTO}">${texto}</span></td>`
      + `<td class="tm-dg-suena">${arm}</td>`
      + (cfg.valvulas ? `<td class="tm-dg-suena">${d.valves ? VALV_TXT[d.valves] : '<span class="tm-dg-na">—</span>'}</td>` : '')
      + '</tr>';
  });
  const cab = '<abbr title="1.ª posición: la vara recogida">1</abbr> 2 3 4 5 6 <abbr title="7.ª posición: la vara más extendida">7</abbr>';
  return [MARCA_INI,
    '<div class="tm-table-wrap">',
    '<table class="tm-table tm-digitaciones">',
    `<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">Todas las posiciones del ${cfg.nombre}: ${filas.length} notas</caption>`,
    `<thead><tr><th scope="col">Nota escrita</th><th scope="col">En el pentagrama<small>clave de fa</small></th><th scope="col">Posición de la vara<small>${cab}</small></th><th scope="col">Armónico</th>${cfg.valvulas ? '<th scope="col">Válvulas</th>' : ''}</tr></thead>`,
    '<tbody>', filas.join('\n'), '</tbody></table></div>',
    `<p class="tm-nota-tabla"><strong>●</strong> marca la posición de la vara: la <strong>1.ª</strong> es la vara recogida y la <strong>7.ª</strong>, la más extendida; cada posición baja la nota un semitono. La columna <strong>Armónico</strong> dice con cuál de los armónicos de esa posición se toca la nota, ajustándolo con los labios${cfg.valvulas ? '. Las notas del registro grave se tocan con las <strong>válvulas</strong> del trombón bajo (F, G♭ o las dos a la vez, que dan Re), y por eso no llevan armónico' : ''}. <strong>—</strong>: no hay dato.</p>`,
    `<p class="tm-nota-tabla">${cfg.valvulas ? 'El trombón bajo' : 'El trombón'} <strong>no transpone</strong>: lo escrito es lo que suena.</p>`,
    MARCA_FIN].join('\n');
}

/* ---- corneta ---- */
function leerNotasCorneta() {
  const src = fs.readFileSync(path.join(RAIZ, 'assets/js/digitaciones-corneta-engine.js'), 'utf8');
  const m = src.match(/var NOTES = \[[\s\S]*?\n  \];/);
  if (!m) throw new Error('corneta: no encuentro NOTES en el motor');
  const caja = {};
  // eslint-disable-next-line no-eval
  eval(m[0].replace('var NOTES', 'caja.NOTES'));
  return caja.NOTES;
}
function tablaCorneta(inst) {
  const cfg = INSTRUMENTOS[inst];
  const NOTES = leerNotasCorneta();
  const celda = (o) => `<td class="tm-dg-corneta">${pentagrama(o.n, cfg.clave)}<strong>${o.lbl}</strong>${o.calante ? '<small>calante</small>' : ''}</td>`;
  const filas = [];
  for (let h = 3; h <= 10; h++) {
    const doo = NOTES.find((o) => o.h === h && o.s === 'do'), reb = NOTES.find((o) => o.h === h && o.s === 'reb');
    if (!doo || !reb) throw new Error('corneta: falta una nota del armónico ' + h);
    filas.push(`<tr><th scope="row">${h}.º</th>${celda(doo)}${celda(reb)}</tr>`);
  }
  return [MARCA_INI,
    '<div class="tm-table-wrap">',
    '<table class="tm-table tm-digitaciones">',
    `<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">Las ${NOTES.length} notas de ${cfg.nombre}, con su pentagrama</caption>`,
    '<thead><tr><th scope="col">Armónico</th><th scope="col">Palometa en do<small>serie de Do</small></th><th scope="col">Palometa girada<small>serie de Re♭</small></th></tr></thead>',
    '<tbody>', filas.join('\n'), '</tbody></table></div>',
    '<p class="tm-nota-tabla">Las notas de las dos series se <strong>alternan</strong>: cada una está a un semitono de la otra. El <strong>7.º armónico</strong> suena naturalmente bajo (<em>calante</em>) y apenas se usa. La corneta se escribe en clave de sol y no transpone.</p>',
    MARCA_FIN].join('\n');
}

function tabla(inst) {
  if (INSTRUMENTOS[inst].corneta) return tablaCorneta(inst);
  if (INSTRUMENTOS[inst].vara) return tablaVara(inst);
  if (INSTRUMENTOS[inst].doble) return tablaDoble(inst);
  const cfg = INSTRUMENTOS[inst];
  const { FING, ORDEN, KEYS } = leerMotor(inst);
  const orden = (ORDEN && ORDEN.length ? ORDEN : Object.keys(FING)).filter((k) => FING[k]);
  const n = KEYS.length;
  const cab = KEYS.map((k, i) => `<abbr title="${i + 1}.º pistón">${i + 1}</abbr>`).join(' ');
  // Las medidas se calculan con TODAS las notas a la vez: asi el pentagrama cae
  // a la misma altura en cada fila y la columna no queda como una sierra.


  const filas = orden.map((clave) => {
    const midi = aMidi(clave);
    const [esc, escBem] = nombre(midi);
    const pulsados = pulsadosDe(FING[clave]);
    // "1.º y 3.º", no "1 + 3.º": se lee en voz alta sin tropezar.
    const nums = pulsados.map((k) => KEYS.findIndex((x) => x.id === k) + 1).sort((a, b) => a - b)
      .map((x) => x + '.º');
    const texto = nums.length === 0 ? 'al aire'
      : nums.length === 1 ? nums[0]
        : nums.slice(0, -1).join(', ') + ' y ' + nums[nums.length - 1];
    const suena = cfg.transpone
      ? (() => { const [s, sb] = nombre(midi + cfg.transpone); return sb ? `${s}<small>${sb}</small>` : s; })()
      : null;
    return '<tr>'
      + `<th scope="row">${esc}${escBem ? `<small>${escBem}</small>` : ''}</th>`
      + `<td class="tm-dg-pent">${pentagrama(clave, cfg.clave)}</td>`
      // «Cuales» ya no es columna (el dibujo lo dice todo), pero el texto se queda
      // en el HTML, oculto a la vista, para lectores de pantalla y buscadores.
      + `<td class="tm-dg-dib">${dibujo(pulsados, KEYS)}<span style="${OCULTO}">${texto}</span></td>`
      + (suena !== null ? `<td class="tm-dg-suena">${suena}</td>` : '')
      + '</tr>';
  });

  const trasp = cfg.transpone
    ? `<p class="tm-nota-tabla">Es un instrumento <strong>transpositor</strong>: lo que lees y lo que suena no son la misma nota. Si tocas un <strong>Do₄ escrito</strong> suena un <strong>Si♭₃</strong>, un tono por debajo. Por eso la última columna. En una banda esto importa: tu Do no es el Do del saxofón ni el del bombardino.</p>`
    : '';

  return [MARCA_INI,
    '<div class="tm-table-wrap">',
    '<table class="tm-table tm-digitaciones">',
    `<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">Todas las digitaciones de ${cfg.nombre}: ${orden.length} notas</caption>`,
    `<thead><tr><th scope="col">Nota escrita</th><th scope="col">En el pentagrama<small>${CLAVE_ES[cfg.clave]}</small></th><th scope="col">Pistones<small>${cab}</small></th>${cfg.transpone ? '<th scope="col">Suena</th>' : ''}</tr></thead>`,
    '<tbody>', filas.join('\n'), '</tbody></table></div>',
    `<p class="tm-nota-tabla"><strong>●</strong> es pistón pulsado y <strong>○</strong> suelto, en el orden en que los tienes bajo los dedos (${n === 3 ? '1.º, 2.º y 3.º' : '1.º a ' + n + '.º'}). «Al aire» significa ningún pistón: solo los labios. Las notas alteradas llevan debajo su nombre equivalente, porque <strong>Fa♯ y Sol♭ son la misma nota</strong> y según la tonalidad verás escrita una u otra.</p>`,
    trasp,
    MARCA_FIN].filter(Boolean).join('\n');
}

const CSS = `
.tm-dg-pent img { display: block; margin: 0 auto; max-width: none; }
.tm-digitaciones th, .tm-digitaciones td { text-align: center; white-space: nowrap; padding: 5px 10px; }
.tm-digitaciones th[scope="row"] { text-align: left; font-weight: 600; }
.tm-digitaciones small { display: block; font-size: .78em; opacity: .75; font-weight: 400; }
.tm-digitaciones thead small { letter-spacing: .35em; opacity: .85; }
.tm-digitaciones abbr { text-decoration: none; border: 0; }
/* El dibujo de los pistones en monoespaciada para que las columnas cuadren. */
.tm-dg-dib { font-family: ui-monospace, 'SF Mono', Menlo, monospace; letter-spacing: .28em; font-size: 1.05em; }
.tm-dg-on { color: var(--brand); }
.tm-dg-off { color: #b9b2a4; }
.tm-dg-suena { color: #686868; }
.tm-dg-na { color: #b9b2a4; }
.tm-digitaciones td.tm-dg-corneta { padding: 4px 10px; }
.tm-dg-corneta img { display: block; margin: 0 auto 2px; max-width: none; }
.tm-dg-corneta strong { display: block; }
.tm-dg-pent { padding: 2px 6px; }
.tm-nota-tabla { font-size: .94rem; }
`;

function poner(inst) {
  const p = path.join(RAIZ, INSTRUMENTOS[inst].pagina, 'index.html');
  let html = fs.readFileSync(p, 'utf8');
  const nueva = tabla(inst);

  if (html.indexOf(MARCA_INI) > -1) {
    html = html.slice(0, html.indexOf(MARCA_INI)) + nueva
      + html.slice(html.indexOf(MARCA_FIN) + MARCA_FIN.length);
    console.log(`  ${inst}: tabla sustituida`);
  } else if (INSTRUMENTOS[inst].corneta) {
    // la pagina ya trae su tabla (armonico x serie, sin pentagramas): se sustituye por la nueva
    const ini = html.indexOf('<thead><tr><th>Armónico</th>');
    if (ini < 0) throw new Error('corneta: no encuentro la tabla antigua de armónicos');
    const a = html.lastIndexOf('<div class="tm-table-wrap">', ini);
    const b = html.indexOf('</table></div>', ini) + '</table></div>'.length;
    html = html.slice(0, a) + nueva + html.slice(b);
    console.log(`  ${inst}: tabla antigua sustituida`);
  } else {
    // Justo antes del diagrama interactivo: primero el dato, luego el juguete.
    const m = (INSTRUMENTOS[inst].antes || /<h[23][^>]*>[^<]*(?:diagrama|Pru[eé]balo|digitaci)[^<]*<\/h[23]>/i).exec(html);
    if (!m) throw new Error(`${inst}: no encuentro dónde meter la tabla`);
    html = html.slice(0, m.index) + nueva + '\n' + html.slice(m.index);
    console.log(`  ${inst}: tabla insertada antes de «${m[0].replace(/<[^>]*>/g, '').trim()}»`);
  }
  // El estilo se SUSTITUYE, no solo se pone si falta. Si solo se pusiera la
  // primera vez, al ampliar la tabla (como con la columna del pentagrama) las
  // paginas se quedarian con el CSS viejo y lo nuevo saldria sin pintar: las
  // lineas del pentagrama, sin stroke, son directamente invisibles.
  const bloque = `<style data-tm="digitaciones">${CSS.trim()}</style>`;
  const marcado = /<style data-tm="digitaciones">[\s\S]*?<\/style>/;
  if (marcado.test(html)) {
    html = html.replace(marcado, bloque);
    console.log(`  ${inst}: estilos actualizados`);
  } else {
    // limpia el bloque sin marcar que dejaron las primeras versiones
    html = html.replace(/<style>\s*\.tm-digitaciones[\s\S]*?<\/style>\n?/, '');
    html = html.replace('</head>', `${bloque}\n</head>`);
    console.log(`  ${inst}: estilos puestos`);
  }
  fs.writeFileSync(p, html);
}

const args = process.argv.slice(2);
const quiere = args.includes('--todos') ? Object.keys(INSTRUMENTOS)
  : args.filter((a) => INSTRUMENTOS[a]);
if (!quiere.length) {
  console.log('Instrumentos: ' + Object.keys(INSTRUMENTOS).join(', ') + '  (o --todos)');
  process.exit(1);
}
for (const i of quiere) {
  if (args.includes('--poner')) poner(i);
  else console.log(tabla(i));
}
