'use strict';
/**
 * Compases del diccionario (cifra, acentuacion, anacrusa, unidad de tiempo, compasillo...) dibujados con
 * Verovio y guardados como SVG.
 *
 *   node tools/gen-compases-verovio.js              # prueba: genera y verifica todo, no toca las paginas
 *   node tools/gen-compases-verovio.js --poner      # ademas sustituye los <img> PNG de las paginas
 *   node tools/gen-compases-verovio.js --sabotaje   # comprueba que la verificacion SABE fallar
 *
 * Los datos son los de los generate-*.js de VexFlow de siempre (tools/notacion/datos/compases-cifra.js y
 * compases-rotulados.js). Verovio decide plicas, barras y espaciado; los rotulos («Fuerte», «1», «Con
 * anacrusa») se anaden encima, colocados sobre las cabezas reales, y las imagenes de varias filas se
 * componen apilando una imagen de Verovio por fila.
 *
 * Cada imagen se comprueba por varias vias que no salen del mismo sitio:
 *   1. los datos: cada compas suma lo que dice la cifra (o lo que dice la anacrusa);
 *   2. el MEI releido por un interprete aparte = los datos;
 *   3. lo que AFIRMA LA PAGINA: el alt (numero de compases, cuantas figuras y de que tipo, grupos 3+3,
 *      cifra, tiempos fuertes y debiles, duracion de la anacrusa) y el data-tm-melody que usa el audio;
 *   4. el dibujo: cifra, cabezas (glifo y altura contra las lineas del pentagrama), alteraciones, puntillos,
 *      plicas, barras, corchetes, acentos, barras de compas y rotulos (texto y posicion).
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, ESPACIO, OPCIONES, hash, preparar, escAttr } = G;

const SALIDA = 'assets/img/notacion/compases';
const aFilas = (s) => (s.filas ? s : { ...s, tipo: 'cifra', filas: [{ num: s.num, den: s.den, simbolo: s.corte ? 'cut' : null, compases: s.compases }] });
const DATOS = [...require('./notacion/datos/compases-cifra.js'), ...require('./notacion/datos/compases-rotulados.js')].map(aFilas);
const PAGINAS = fs.readdirSync(path.join(RAIZ, 'diccionario-musical/compases'), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => 'diccionario-musical/compases/' + d.name);

const DUR = { w: 64, h: 32, q: 16, 8: 8, 16: 4 };
const DUR_MEI = { w: 1, h: 2, q: 4, 8: 8, 16: 16 };
const GLIFO_CABEZA = { w: 'E0A2', h: 'E0A3', q: 'E0A4', 8: 'E0A4', 16: 'E0A4' };
const ANCHO_CABEZA = { E0A2: 304, E0A3: 212, E0A4: 212 };   // anchura de cada cabeza, en unidades del dibujo
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const PASO_Y = ESPACIO / 2;
const PASO_E4 = 4 * 7 + 2;   // linea inferior de la clave de sol
const ACC_MEI = { 1: 's', '-1': 'f', 0: 'n' };
const MEI_ACC = { s: 1, f: -1, n: 0 };
const ACC_TXT = { 1: '#', '-1': 'b', 0: '' };
const ACC_GLIFO = { 1: 'E262', '-1': 'E260', 0: 'E261' };
const norm = (s) => String(s).normalize('NFC');
const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const durTotal = (e) => DUR[e.d] * (e.puntillo ? 1.5 : 1);
const NUM = { un: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, doce: 12 };
const FIGURA_ALT = { negra: 'q', corchea: '8', blanca: 'h', semicorchea: '16', redonda: 'w' };

/** 'd#/5' -> { letra: 'd', alt: 1, oct: 5 } */
function parseKey(key) {
  const m = /^([a-g])(#|b)?\/(\d)$/.exec(key);
  if (!m) throw new Error('nota mal escrita: ' + key);
  return { letra: m[1], alt: m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0, oct: Number(m[3]) };
}
const pasoDe = (key) => { const k = parseKey(key); return k.oct * 7 + LETRAS.indexOf(k.letra); };

/** Alteracion que se escribe en cada nota (regla del compas: vale hasta la barra). [compas][evento] -> 's' | 'f' | 'n' | null */
function alteraciones(fila) {
  return fila.compases.map((c) => {
    const estado = {};
    return c.map((e) => {
      const k = parseKey(e.key), id = k.letra + k.oct;
      const vigente = id in estado ? estado[id] : 0;
      const muestra = k.alt !== vigente;
      estado[id] = k.alt;
      return muestra ? ACC_MEI[k.alt] : null;
    });
  });
}

/* ---------- MEI ---------- */
function aMEI(fila) {
  let k = 0;
  const acc = alteraciones(fila);
  const total = fila.num * (64 / fila.den);
  const ms = fila.compases.map((c, i) => {
    let cuerpo = '';
    const nota = (x, j) => {
      const p = parseKey(x.key);
      const a = acc[i][j];
      return `<note xml:id="n${k++}" pname="${p.letra}" oct="${p.oct}" dur="${DUR_MEI[x.d]}"${x.puntillo ? ' dots="1"' : ''}${a ? ` accid="${a}"` : ''}>${x.acento ? '<artic artic="acc" place="above"/>' : ''}</note>`;
    };
    for (let j = 0; j < c.length;) {
      const e = c[j];
      if (e.barra === undefined) { cuerpo += nota(e, j); j++; continue; }
      let f = j; const grupo = [];
      while (f < c.length && c[f].barra === e.barra) { grupo.push(nota(c[f], f)); f++; }
      cuerpo += grupo.length > 1 ? `<beam>${grupo.join('')}</beam>` : grupo[0];
      j = f;
    }
    if (!c.length) cuerpo = '<space dur="1"/>';
    const ultimo = i === fila.compases.length - 1;
    const der = ultimo ? (fila.sinBarraFinal ? ' right="invis"' : fila.barraFinal === 'end' ? ' right="end"' : '') : '';
    const suma = c.reduce((a, e) => a + durTotal(e), 0);
    const incompleto = c.length && suma !== total ? ' metcon="false"' : '';
    return `<measure n="${i + 1}"${der}${incompleto}><staff n="1"><layer n="1">${cuerpo}</layer></staff></measure>`;
  }).join('');
  const metro = fila.simbolo ? `meter.count="${fila.num}" meter.unit="${fila.den}" meter.sym="${fila.simbolo}"` : `meter.count="${fila.num}" meter.unit="${fila.den}"`;
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="G" clef.line="2" ${metro}/></staffGrp></scoreDef><section>${ms}</section></score></mdiv></body></music></mei>`;
}

/** Lee el MEI como lo leeria un musico: por compas, [{key, d, puntillo, acento, grupo}] (grupo = n.º de <beam> o -1). */
function leerMEI(mei) {
  const compases = [];
  let nb = 0;
  for (const m of mei.match(/<measure [\s\S]*?<\/measure>/g) || []) {
    const evs = [];
    const estado = {};
    const re = /<beam>|<\/beam>|<note [^>]*?(?:\/>|>[\s\S]*?<\/note>)/g;
    let x, dentro = -1;
    while ((x = re.exec(m))) {
      if (x[0] === '<beam>') { dentro = nb++; continue; }
      if (x[0] === '</beam>') { dentro = -1; continue; }
      const a = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(x[0]) || [])[1];
      const d = Object.keys(DUR_MEI).find((q) => DUR_MEI[q] === Number(a('dur')));
      const id = a('pname') + a('oct');
      if (a('accid') !== undefined) estado[id] = MEI_ACC[a('accid')];
      evs.push({ key: a('pname') + ACC_TXT[id in estado ? estado[id] : 0] + '/' + a('oct'), d, puntillo: Number(a('dots') || 0), acento: /artic="acc"/.test(x[0]), grupo: dentro });
    }
    compases.push(evs);
  }
  return compases;
}
const meiMeter = (mei) => ({ count: (/meter\.count="(\d+)"/.exec(mei) || [])[1], unit: (/meter\.unit="(\d+)"/.exec(mei) || [])[1], sym: (/meter\.sym="(\w+)"/.exec(mei) || [])[1] });
const eventoTxt = (e) => `${e.key}:${e.d}${e.puntillo ? '.' : ''}`;

/* ---------- lo que afirma la pagina ---------- */
function melodiaDeData(txt) {
  return txt.split('|').map((c) => c.trim().split(/\s+/).map((t) => {
    const m = /^([a-g]\/\d):(w|h|q|8|16)(\.?)$/.exec(t);
    if (!m) throw new Error('data-tm-melody ilegible: ' + t);
    return m[1] + ':' + m[2] + m[3];
  }));
}
const tamanosDeBarra = (leido) => {
  const t = [];
  leido.forEach((c) => { const cuenta = {}; c.forEach((e) => { if (e.grupo >= 0) cuenta[e.grupo] = (cuenta[e.grupo] || 0) + 1; }); t.push(...Object.values(cuenta)); });
  return t;
};

/** Imagenes de una fila sin rotulos: pulso, subdivision, melodia, hemiolia, unidad de tiempo... */
function revisarCifra(spec, leido, alt, melodia) {
  const fila = spec.filas[0], l = leido[0];
  const err = [];
  const esMel = /melod/i.test(alt);
  const nc = /de (\w+) compases/.exec(alt);
  const quiereComp = nc ? NUM[nc[1]] : 1;
  if (l.length !== quiereComp) err.push(`el alt dice ${quiereComp} compas(es) y el dibujo tiene ${l.length}`);
  const cif = /\b(\d+)\/(\d+)\b/.exec(alt);
  if (cif && (Number(cif[1]) !== fila.num || Number(cif[2]) !== fila.den)) err.push(`el alt habla de ${cif[0]} y el compas es ${fila.num}/${fila.den}`);
  if (/partido|alla breve/i.test(alt) !== (fila.simbolo === 'cut')) err.push('el alt y el dibujo no coinciden en si es compas partido (2/2 cortado)');
  if (/compasillo/i.test(alt) !== (fila.simbolo === 'common')) err.push('el alt y el dibujo no coinciden en si es compasillo (C)');
  const cu = /(?:\bcon |: |^)(un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|doce) (negras?|corcheas?|blancas?|semicorcheas?|redondas?)( con puntillo)?/i.exec(alt);
  if (cu && !esMel) {
    const evs = l.flat();
    const n = NUM[cu[1].toLowerCase()], d = FIGURA_ALT[cu[2].toLowerCase().replace(/s$/, '')], p = cu[3] ? 1 : 0;
    if (evs.length !== n) err.push(`el alt dice ${n} figuras y hay ${evs.length}`);
    if (evs.some((e) => e.d !== d || e.puntillo !== p)) err.push(`el alt dice «${cu[2]}${cu[3] || ''}» y alguna figura es otra`);
  }
  const tamanos = tamanosDeBarra(l);
  const gr = /(\d(?:\+\d)+)/.exec(alt);
  if (gr) {
    const lista = gr[1].split('+').map(Number);
    if (!esMel && /agrupad/.test(alt) && tamanos.length && JSON.stringify(tamanos) !== JSON.stringify(lista)) err.push(`el alt dice grupos ${lista.join('+')} y las barras son ${tamanos.join('+')}`);
    if (esMel && tamanos.some((t) => !lista.includes(t))) err.push(`el alt dice grupos ${lista.join('+')} y hay una barra de ${tamanos.find((t) => !lista.includes(t))} figuras`);
  }
  const en = /de (dos|tres|cuatro) en (dos|tres|cuatro)\b/.exec(alt);
  if (en && !gr && tamanos.length && tamanos.some((t) => t !== NUM[en[1]])) err.push(`el alt dice «de ${en[1]} en ${en[2]}» y hay barras de ${[...new Set(tamanos)].join(', ')} figuras`);
  const ng = /en (dos|tres|cuatro) grupos/.exec(alt);
  if (ng && tamanos.length !== NUM[ng[1]]) err.push(`el alt dice ${NUM[ng[1]]} grupos y hay ${tamanos.length} barras`);
  if (/hemiolia/i.test(alt)) {
    const acc = l.flat().map((e, i) => (e.acento ? i + 1 : 0)).filter(Boolean);
    const dice = (/tiempos ([\d, y]+)/.exec(alt) || [])[1];
    const q = dice ? dice.split(/[, y]+/).filter(Boolean).map(Number) : [];
    if (JSON.stringify(acc) !== JSON.stringify(q)) err.push(`el alt dice acentos en ${q} y el dibujo los lleva en ${acc}`);
  } else if (l.flat().some((e) => e.acento)) err.push('hay acentos que la pagina no menciona');
  if (esMel) {
    if (!melodia) err.push('es una melodia y la figura no tiene data-tm-melody (no se puede contrastar con el audio)');
    else if (JSON.stringify(melodiaDeData(melodia)) !== JSON.stringify(l.map((c) => c.map(eventoTxt)))) err.push('la melodia del audio (data-tm-melody) no es la que se dibuja');
  }
  return err;
}

const sumaBarra = (c) => c.reduce((a, e) => a + durTotal(e), 0);
const totalDe = (f) => f.num * (64 / f.den);
const compuesto = (f) => f.den >= 8 && f.num % 3 === 0 && f.num > 3;
const REVISORES = {
  cifra: revisarCifra,
  acentuacion(spec, leido, alt) {
    const err = [], f = spec.filas[0], l = leido[0];
    const m = /compás de (\d+)\/(\d+)/.exec(alt);
    if (!m || Number(m[1]) !== f.num || Number(m[2]) !== f.den) err.push(`el alt habla de ${m ? m[0] : 'otro compas'} y el dibujo es ${f.num}/${f.den}`);
    // un pulso por nota: negra en los simples, negra con puntillo en los compuestos
    const pulso = compuesto(f) ? 3 * (64 / f.den) : 64 / f.den;
    if (l[0].some((e) => durTotal(e) !== pulso)) err.push('alguna nota no dura un pulso');
    if (l[0].length * pulso !== totalDe(f)) err.push('los pulsos no llenan el compas');
    const quiere = f.textos.map((t) => sinTildes(t.texto));
    const resto = alt.split(':').slice(1).join(':');
    let dice = [];
    if (/tiempo/.test(resto)) {
      for (const x of resto.matchAll(/tiempos? (\d+(?: y \d+)*)[, ]+(?:es |son )?(semifuerte|fuerte|d[ée]bil)/g)) x[1].split(' y ').forEach((n) => { dice[Number(n) - 1] = sinTildes(x[2]); });
    } else dice = [...resto.matchAll(/(semifuerte|fuerte|d[ée]bil)/g)].map((x) => sinTildes(x[1]));
    if (JSON.stringify(dice) !== JSON.stringify(quiere)) err.push(`el alt dice ${JSON.stringify(dice)} y los rotulos son ${JSON.stringify(quiere)}`);
    l[0].forEach((e, i) => { if (e.acento !== (quiere[i] === 'fuerte')) err.push(`el acento de la nota ${i + 1} no corresponde a «${quiere[i]}»`); });
    return err;
  },
  'anacrusa-comparacion'(spec, leido, alt) {
    const err = [], [a, b] = spec.filas;
    if (!(alt.indexOf('sin anacrusa') >= 0 && alt.indexOf('sin anacrusa') < alt.indexOf('con anacrusa'))) err.push('el alt deberia hablar primero de «sin anacrusa» y luego de «con anacrusa»');
    if (!/^sin anacrusa/i.test(a.rotulo) || !/^con anacrusa/i.test(b.rotulo)) err.push('los rotulos de las filas no son «Sin anacrusa» / «Con anacrusa»');
    if (sumaBarra(a.compases[0]) !== totalDe(a)) err.push('la fila «sin anacrusa» tendria que empezar con un compas completo');
    if (leido[1][0].length !== 1 || sumaBarra(b.compases[0]) >= totalDe(b)) err.push('la fila «con anacrusa» tendria que empezar con una sola nota de impulso (compas incompleto)');
    if (/una nota de impulso/.test(alt) === false) err.push('el alt ya no habla de «una nota de impulso»');
    return err;
  },
  'anacrusa-compas'(spec, leido, alt) {
    const err = [], f = spec.filas[0];
    const t = [...alt.matchAll(/de (un|dos|tres|cuatro) tiempos?/g)].map((x) => NUM[x[1]]);
    const cm = /de (\w+) por (\w+)/.exec(alt);
    if (!cm || NUM[cm[1]] !== f.num || NUM[cm[2]] !== f.den) err.push('el alt no habla de un compas de cuatro por cuatro');
    const pulso = 64 / f.den, c = f.compases;
    if (t.length !== 2 || sumaBarra(c[0]) !== t[0] * pulso) err.push(`el alt dice que la anacrusa dura ${t[0]} tiempo(s) y el dibujo ${sumaBarra(c[0]) / pulso}`);
    if (t.length === 2 && sumaBarra(c[c.length - 1]) !== t[1] * pulso) err.push(`el alt dice que el ultimo compas dura ${t[1]} tiempos y el dibujo ${sumaBarra(c[c.length - 1]) / pulso}`);
    if (sumaBarra(c[0]) + sumaBarra(c[c.length - 1]) !== totalDe(f)) err.push('la anacrusa y el ultimo compas no suman un compas completo');
    return err;
  },
  'anacrusa-cumpleanos'(spec, leido, alt) {
    const err = [], f = spec.filas[0], l = leido[0];
    if (!/en 3\/4/.test(alt) || f.num !== 3 || f.den !== 4) err.push('el alt y el dibujo no coinciden en el compas 3/4');
    const quiere = ['g/4:8.', 'g/4:16'];
    if (JSON.stringify(l[0].map(eventoTxt)) !== JSON.stringify(quiere)) err.push('la anacrusa deberia ser una corchea con puntillo y una semicorchea (Cum-ple)');
    if (!/corchea con puntillo y una semicorchea/.test(alt)) err.push('el alt ya no describe la anacrusa como corchea con puntillo y semicorchea');
    if (sumaBarra(f.compases[0]) + sumaBarra(f.compases[f.compases.length - 1]) !== totalDe(f)) err.push('la anacrusa y el ultimo compas no suman un compas completo');
    return err;
  },
  'anacrusa-famosas'(spec, leido, alt) {
    const err = [];
    spec.filas.forEach((f, i) => {
      const nombre = f.rotulo.replace(/ \(.*\)$/, '');
      if (!alt.includes(nombre)) err.push(`el alt no nombra «${nombre}»`);
      if (sumaBarra(f.compases[0]) >= totalDe(f)) err.push(`la fila ${i + 1} deberia empezar con un compas incompleto (anacrusa)`);
    });
    if (!/Beethoven/.test(alt) || !/Beethoven/.test(spec.filas[1].rotulo)) err.push('falta Beethoven en el alt o en el rotulo');
    if (spec.filas[0].num !== 3 || spec.filas[0].den !== 4 || spec.filas[1].num !== 3 || spec.filas[1].den !== 8) err.push('las cifras de las dos melodias deberian ser 3/4 y 3/8');
    return err;
  },
  'seis-corcheas'(spec, leido, alt) {
    const err = [];
    const trozos = [...alt.matchAll(/(\d)\/(\d) \((\w+) tiempos, ([\d+]+)\)/g)];
    if (trozos.length !== spec.filas.length) err.push('el alt no describe las dos filas con «N/M (n tiempos, a+b)»');
    trozos.forEach((x, i) => {
      const f = spec.filas[i]; if (!f) return;
      if (Number(x[1]) !== f.num || Number(x[2]) !== f.den) err.push(`la fila ${i + 1} es ${f.num}/${f.den} y el alt dice ${x[1]}/${x[2]}`);
      if (JSON.stringify(tamanosDeBarra(leido[i])) !== JSON.stringify(x[4].split('+').map(Number))) err.push(`la fila ${i + 1}: el alt dice grupos ${x[4]} y las barras son ${tamanosDeBarra(leido[i]).join('+')}`);
      const nums = f.textos.filter((t) => /^\d$/.test(t.texto)).map((t) => Number(t.texto));
      if (nums.length !== NUM[x[3]] || nums.some((n, k) => n !== k + 1)) err.push(`la fila ${i + 1}: el alt dice ${x[3]} tiempos y los numeros bajo las barras son ${nums.join(',')}`);
      if (leido[i].flat().length !== 6 || leido[i].flat().some((e) => e.d !== '8')) err.push(`la fila ${i + 1} no son seis corcheas`);
    });
    return err;
  },
};

/* ---------- el dibujo ---------- */
const cuenta = (svg, re) => (svg.match(re) || []).length;
function cabezas(svg) {
  const res = [];
  const re = /<g id="(n\d+)" class="note"[^>]*>[\s\S]*?<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g;
  let m;
  while ((m = re.exec(svg))) res.push({ id: Number(m[1].slice(1)), g: m[2], x: Number(m[3]), y: Number(m[4]) });
  return res.sort((a, b) => a.id - b.id);
}
const lineas = (svg) => [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);

function verificarDatos(fila) {
  const err = [];
  const total = totalDe(fila);
  const sumas = fila.sumas || fila.compases.map(() => total);
  if (sumas.length !== fila.compases.length) err.push('hay que declarar la duracion de cada compas');
  fila.compases.forEach((c, i) => {
    if (!c.length) return;
    const s = sumaBarra(c);
    if (s !== sumas[i]) err.push(`el compas ${i + 1} suma ${s}/64 y deberia sumar ${sumas[i]}/64 (${fila.num}/${fila.den} = ${total}/64)`);
    c.forEach((e) => { if (e.barra !== undefined && DUR[e.d] > 8) err.push(`en el compas ${i + 1} hay una figura con barra que no es corchea ni menor`); });
  });
  if (fila.cierra && fila.compases.length > 1 && sumaBarra(fila.compases[0]) + sumaBarra(fila.compases[fila.compases.length - 1]) !== total) err.push('la anacrusa y el ultimo compas deberian sumar un compas completo');
  return err;
}

function verificarSVG(svg, fila, leido) {
  void leido;
  const err = [];
  const evs = fila.compases.flat();
  const raiz = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!raiz || !new RegExp('#' + raiz + ' path').test(svg)) err.push('el estilo de Verovio no esta ligado al id de la raiz');
  const claves = [...svg.matchAll(/class="clef"[\s\S]{0,260}?href="#(E0[0-9A-F]+)/g)].map((m) => m[1]);
  if (JSON.stringify(claves) !== JSON.stringify(['E050'])) err.push('clave dibujada ' + JSON.stringify(claves) + ', prevista clave de sol');
  const metro = (svg.match(/<g[^>]* class="meterSig"[\s\S]*?<\/g>\s*<\/g>/) || [''])[0];
  const glifosMetro = [...metro.matchAll(/href="#(E08[0-9A-F])/g)].map((m) => m[1]);
  const dig = (n) => String(n).split('').map((d) => 'E08' + d);
  const quiereMetro = fila.simbolo === 'cut' ? ['E08B'] : fila.simbolo === 'common' ? ['E08A'] : [...dig(fila.num), ...dig(fila.den)];
  if (JSON.stringify(glifosMetro) !== JSON.stringify(quiereMetro)) err.push('cifra dibujada ' + JSON.stringify(glifosMetro) + ', prevista ' + JSON.stringify(quiereMetro));
  const cabs = cabezas(svg);
  if (cabs.length !== evs.length) err.push(`${cabs.length} cabezas, debian ser ${evs.length}`);
  const ls = lineas(svg);
  if (ls.length !== 5 || ls.some((y, k) => k && y - ls[k - 1] !== ESPACIO)) err.push('el pentagrama no tiene 5 lineas');
  else {
    cabs.forEach((c, k) => {
      const e = evs[k]; if (!e) return;
      const quiere = ls[4] - (pasoDe(e.key) - PASO_E4) * PASO_Y;
      if (c.y !== quiere) err.push(`la nota ${k + 1} (${e.key}) esta a y=${c.y} y le corresponde y=${quiere}`);
      if (c.g !== GLIFO_CABEZA[e.d]) err.push(`la cabeza de la nota ${k + 1} es ${c.g} y para «${e.d}» deberia ser ${GLIFO_CABEZA[e.d]}`);
    });
  }
  // alteraciones: numero y signo
  const quiereAcc = {};
  alteraciones(fila).flat().forEach((a) => { if (a) { const g = ACC_GLIFO[MEI_ACC[a]]; quiereAcc[g] = (quiereAcc[g] || 0) + 1; } });
  const dibAcc = {};
  (svg.match(/class="accid"[^>]*>\s*<use [^>]*href="#E2[0-9A-F]+/g) || []).forEach((g) => { const c = /#(E2[0-9A-F]+)/.exec(g)[1]; dibAcc[c] = (dibAcc[c] || 0) + 1; });
  if (JSON.stringify(Object.entries(dibAcc).sort()) !== JSON.stringify(Object.entries(quiereAcc).sort())) err.push(`alteraciones dibujadas ${JSON.stringify(dibAcc)}, previstas ${JSON.stringify(quiereAcc)}`);
  if (cuenta(svg, /class="dots"/g) !== evs.filter((e) => e.puntillo).length) err.push('numero de puntillos distinto del previsto');
  const conPlica = evs.filter((e) => e.d !== 'w').length;
  if (cuenta(svg, /class="stem"/g) !== conPlica) err.push(`${cuenta(svg, /class="stem"/g)} plicas, debian ser ${conPlica}`);
  const grupos = {};
  evs.forEach((e) => { if (e.barra !== undefined) grupos[e.barra] = (grupos[e.barra] || 0) + 1; });
  const nBarras = Object.values(grupos).filter((n) => n > 1).length;
  if (cuenta(svg, /class="beam"/g) !== nBarras) err.push(`${cuenta(svg, /class="beam"/g)} barras, debian ser ${nBarras}`);
  const sueltas = evs.filter((e) => DUR[e.d] <= 8 && (e.barra === undefined || grupos[e.barra] < 2)).length;
  if (cuenta(svg, /class="flag"/g) !== sueltas) err.push(`${cuenta(svg, /class="flag"/g)} corchetes de figura suelta, debian ser ${sueltas}`);
  const acentos = evs.filter((e) => e.acento).length;
  if (cuenta(svg, /class="artic"/g) !== acentos || cuenta(svg, /class="artic"[\s\S]{0,200}?href="#E4A0/g) !== acentos) err.push('acentos dibujados distintos de los previstos (o no estan encima)');
  // barras de compas: las invisibles salen como <g class="barLine"/> vacio; la barra final «end» lleva dos trazos
  const quiereBarras = fila.compases.length - (fila.sinBarraFinal ? 1 : 0);
  const trazosBarra = (svg.match(/class="barLine">\s*(?:<path[^>]*\/>\s*)+/g) || []).map((g) => (g.match(/<path/g) || []).length);
  const quiereTrazos = Array.from({ length: quiereBarras }, (_, i) => (fila.barraFinal === 'end' && i === fila.compases.length - 1 ? 2 : 1));
  if (JSON.stringify(trazosBarra) !== JSON.stringify(quiereTrazos)) err.push(`barras de compas con trazos ${JSON.stringify(trazosBarra)}, previstas ${JSON.stringify(quiereTrazos)}`);
  return err;
}

/* ---------- rotulos encima del dibujo ---------- */
function textosDeFila(fila) { return (fila.rotulo ? [{ texto: fila.rotulo, ref: 'arriba', izq: true }] : []).concat(fila.textos || []); }

/** Los rotulos van dentro del grupo que lleva el margen de pagina, y se alarga el lienzo para que quepan. */
function conRotulos(svg, fila, cabs) {
  const textos = textosDeFila(fila);
  if (!textos.length) return svg;
  const ls = lineas(svg), yTop = ls[0], yBot = ls[4];
  let arriba = yTop, abajo = yBot;
  const trozos = textos.map((t) => {
    const ancho = (c) => ANCHO_CABEZA[c.g] / 2;
    let x;
    if (t.izq) x = 60;
    else if (t.grupo) { const xs = t.grupo.map((i) => cabs[i].x + ancho(cabs[i])); x = Math.round(xs.reduce((a, b) => a + b, 0) / xs.length); }
    else x = Math.round(cabs[t.nota].x + ancho(cabs[t.nota]));
    const y = t.ref === 'arriba' ? yTop - (t.dy || 640) : yBot + (t.dy || 850);
    if (t.ref === 'arriba') arriba = Math.min(arriba, y - 300); else abajo = Math.max(abajo, y);
    return `<text x="${x}" y="${y}" text-anchor="${t.izq ? 'start' : 'middle'}"${t.size ? ` font-size="${t.size}"` : ''}>${escAttr(t.texto)}</text>`;
  }).join('');
  const grupo = `<g class="tm-rotulos" font-family="Arial, Helvetica, sans-serif" font-size="300" fill="#1a1a1a">${trozos}</g>`;
  let s = svg;
  const h0 = Number(/class="definition-scale"[^>]*viewBox="0 0 \d+ (\d+)"/.exec(s)[1]);
  const necesita = Math.round(Math.max(h0, abajo + 340));
  s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 0 \d+ )\d+(")/, `$1${necesita}$2`).replace(/^(<svg viewBox="0 0 \d+ )\d+(")/, `$1${Math.round(necesita / 25)}$2`);
  if (arriba < 200) {
    const d = Math.round(200 - arriba);
    s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 )0( \d+ )(\d+)(")/, (m, a, b, h, c) => `${a}${-d}${b}${Number(h) + d}${c}`);
    s = s.replace(/^(<svg viewBox="0 0 \d+ )(\d+)(")/, (m, a, h, c) => `${a}${Math.round(Number(h) + d / 25)}${c}`);
  }
  const pm = /class="page-margin"[^>]*transform="translate[(]([0-9.]+), ([0-9.]+)[)]"/.exec(s);
  const envuelto = pm ? `<g class="tm-margen" transform="translate(${pm[1]} ${pm[2]})">${grupo}</g>` : grupo;
  const i = s.lastIndexOf('</svg>', s.lastIndexOf('</svg>') - 1);
  return s.slice(0, i) + envuelto + s.slice(i);
}

/** Anchura aproximada de un rotulo (Arial ~0.52 em por letra), en unidades del dibujo. */
const anchoTexto = (t) => Math.round(t.texto.length * 0.52 * (t.size || 300));
const centroDe = (t, cabs) => {
  if (t.izq) return 60;
  const c = (k) => cabs[k].x + ANCHO_CABEZA[cabs[k].g] / 2;
  return t.grupo ? t.grupo.map(c).reduce((a, b) => a + b, 0) / t.grupo.length : c(t.nota);
};
/** Que los rotulos no se pisen entre si ni se salgan del dibujo. Devuelve el motivo, o '' si caben. */
function rotulosCaben(fila, cabs, W) {
  const ts = textosDeFila(fila).map((t) => { const c = centroDe(t, cabs), w = anchoTexto(t); return { t, ini: t.izq ? c : c - w / 2, fin: t.izq ? c + w : c + w / 2 }; });
  for (const a of ts) if (a.ini < 0 || a.fin + 200 > W) return `el rotulo «${a.t.texto}» no cabe en el ancho del dibujo`;
  for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
    if (ts[i].t.ref !== ts[j].t.ref) continue;
    if (ts[i].fin + 80 > ts[j].ini && ts[j].fin + 80 > ts[i].ini) return `los rotulos «${ts[i].t.texto}» y «${ts[j].t.texto}» se pisan`;
  }
  return '';
}
const anchoInterior = (svg) => Number(/class="definition-scale"[^>]*viewBox="0 -?\d+ (\d+) /.exec(svg)[1]);

function verificarRotulos(svg, fila, cabs) {
  const err = [];
  const textos = textosDeFila(fila);
  const motivo = textos.length ? rotulosCaben(fila, cabs, anchoInterior(svg)) : '';
  if (motivo) err.push(motivo);
  const dibujados = (svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((t) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&quot;/g, '"'));
  const previstos = textos.map((t) => t.texto);
  if (JSON.stringify(dibujados) !== JSON.stringify(previstos)) err.push(`texto ${JSON.stringify(dibujados)}, previsto ${JSON.stringify(previstos)}`);
  if (textos.length) {
    const pm = /class="page-margin"[^>]*transform="translate[(]([0-9.]+), ([0-9.]+)[)]"/.exec(svg);
    const tm = /class="tm-margen" transform="translate[(]([0-9.]+) ([0-9.]+)[)]"/.exec(svg);
    if (pm && (!tm || tm[1] !== pm[1] || tm[2] !== pm[2])) err.push('los rotulos no llevan el margen de pagina de Verovio');
    // cada rotulo, centrado bajo su nota (o bajo el centro de su grupo de notas)
    const xs = [...svg.matchAll(/<text x="(-?\d+)" y="(-?\d+)" text-anchor="(\w+)"/g)].map((m) => ({ x: Number(m[1]), y: Number(m[2]), a: m[3] }));
    const ls = lineas(svg);
    textos.forEach((t, k) => {
      const d = xs[k]; if (!d) return;
      if (t.nota !== undefined && Math.abs(d.x - (cabs[t.nota].x + ANCHO_CABEZA[cabs[t.nota].g] / 2)) > 1) err.push(`el rotulo «${t.texto}» no esta centrado bajo su nota`);
      if (t.grupo) {
        const c = t.grupo.map((i) => cabs[i].x + ANCHO_CABEZA[cabs[i].g] / 2);
        if (Math.abs(d.x - c.reduce((a, b) => a + b, 0) / c.length) > 1) err.push(`el rotulo «${t.texto}» no esta centrado bajo su grupo`);
      }
      if (t.ref === 'abajo' && d.y <= ls[4]) err.push(`el rotulo «${t.texto}» esta dentro del pentagrama`);
      if (t.ref === 'arriba' && d.y >= ls[0]) err.push(`el rotulo «${t.texto}» no esta encima del pentagrama`);
    });
  }
  return err;
}

/* ---------- construir una fila / una imagen ---------- */
function construirFila(tk, fila, semilla, tocar, soloDibujo, separacion) {
  const e = verificarDatos(fila);
  let mei = aMEI(fila);
  const meiDibujo = tocar && soloDibujo ? tocar(mei) : mei;   // sabotaje del dibujo, sin tocar lo que lee el verificador del MEI
  if (tocar && !soloDibujo) mei = tocar(mei);
  const leido = leerMEI(mei);
  const m = meiMeter(mei);
  if (Number(m.count) !== fila.num || Number(m.unit) !== fila.den || (m.sym || null) !== (fila.simbolo || null)) e.push('el MEI escribe otra cifra de compas');
  if (leido.length !== fila.compases.length) e.push(`el MEI tiene ${leido.length} compases y debian ser ${fila.compases.length}`);
  fila.compases.forEach((c, i) => {
    const l = leido[i] || [];
    if (l.length !== c.length || c.some((x, j) => !l[j] || eventoTxt(l[j]) !== eventoTxt(x) || l[j].acento !== x.acento)) e.push(`el MEI escribe mal el compas ${i + 1}`);
    c.forEach((x, j) => { if (l[j] && (l[j].grupo >= 0) !== (x.barra !== undefined && c.filter((y) => y.barra === x.barra).length > 1)) e.push(`el MEI agrupa mal la figura ${j + 1} del compas ${i + 1}`); });
  });
  const right = (/<measure n="\d+"([^>]*)>(?![\s\S]*<measure )/.exec(mei) || [])[1] || '';
  if ((/right="invis"/.test(right)) !== !!fila.sinBarraFinal || (/right="end"/.test(right)) !== (fila.barraFinal === 'end')) e.push('el MEI escribe otra barra final');
  tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: semilla, spacingLinear: separacion || 0.25, spacingNonLinear: 0.6 }));
  if (!tk.loadData(meiDibujo)) throw new Error('Verovio no lee el MEI');
  if (tk.getPageCount() !== 1) e.push('sale en mas de una pagina');
  let svg = tk.renderToSVG(1);
  e.push(...verificarSVG(svg, fila, leido));
  const cabs = cabezas(svg);
  const motivoAncho = textosDeFila(fila).length ? rotulosCaben(fila, cabs, anchoInterior(svg)) : '';
  svg = conRotulos(svg, fila, cabs);
  e.push(...verificarRotulos(svg, fila, cabs));
  return { svg, errores: e, leido, motivoAncho };
}

/** Apila las filas (una imagen de Verovio por fila) en un solo SVG. */
function componer(filasSvg, alt, slug) {
  const hojas = filasSvg.map((s) => preparar(s, ''));
  if (hojas.length === 1) return preparar(filasSvg[0], alt);
  const W = Math.max(...hojas.map((h) => h.w)), H = hojas.reduce((a, h) => a + h.h, 0);
  let y = 0;
  const hijos = hojas.map((h) => {
    const interior = h.svg.replace(/<title>[\s\S]*?<\/title>/, '').replace(/^<svg ([^>]*?) viewBox="([^"]*)" width="\d+" height="\d+"[^>]*>/, (m, ant, vb) => `<svg ${ant} x="0" y="${y}" width="${h.w}" height="${h.h}" viewBox="${vb}">`).trim();
    y += h.h;
    return interior;
  });
  const svg = `<svg id="tm-c${hash(slug)}" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" xmlns="http://www.w3.org/2000/svg"><title>${escAttr(alt)}</title>${hijos.join('')}</svg>\n`;
  return { svg, w: W, h: H };
}

function construir(tk, spec, alt, melodia, tocar, soloDibujo) {
  const errores = [], filasSvg = [], leidos = [];
  // misma separacion en todas las filas: la primera con la que todos los rotulos caben (sin rotulos, la de siempre)
  const hayRotulos = spec.filas.some((f) => textosDeFila(f).length);
  for (const sep of hayRotulos ? SEPARACIONES : [0.25]) {
    const rs = spec.filas.map((f, i) => construirFila(tk, f, hash(spec.filas.length > 1 ? spec.slug + '#' + i : spec.slug), tocar, soloDibujo, sep));
    const cabe = rs.every((r) => !r.motivoAncho);
    if (cabe || sep === SEPARACIONES[SEPARACIONES.length - 1] || !hayRotulos) {
      rs.forEach((r, i) => { errores.push(...r.errores.map((x) => (spec.filas.length > 1 ? `fila ${i + 1}: ` : '') + x)); filasSvg.push(r.svg); leidos.push(r.leido); });
      break;
    }
  }
  if (alt !== null) {
    const rev = REVISORES[spec.tipo];
    if (!rev) errores.push('no hay revisor del alt para el tipo ' + spec.tipo);
    else errores.push(...rev(spec, leidos, alt, melodia));
  }
  const listo = errores.length ? null : componer(filasSvg, alt || '', spec.slug);
  if (listo && spec.filas.length > 1) {
    // la composicion: una imagen por fila, en orden, y todos los rotulos
    const n = cuenta(listo.svg, /<svg [^>]*x="0" y="\d+"/g);
    if (n !== spec.filas.length) errores.push(`la composicion tiene ${n} filas y debian ser ${spec.filas.length}`);
    const quiere = spec.filas.flatMap((f) => textosDeFila(f).map((t) => t.texto));
    const dib = (listo.svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((t) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'));
    if (JSON.stringify(dib) !== JSON.stringify(quiere)) errores.push('los rotulos de la composicion no son los previstos');
  }
  return { listo, errores };
}

/* ---------- sabotajes: la verificacion tiene que fallar, y por la razon prevista ---------- */
const SEPARACIONES = [0.25, 0.3, 0.36, 0.43, 0.5, 0.6, 0.72, 0.86, 1.0, 1.2];
const SABOTAJES = [
  ['otra nota', (mei) => mei.replace('pname="g"', 'pname="a"'), /MEI escribe mal|esta a y|alt|melodia/i, 'compas-4-4-pulso'],
  ['sin puntillo', (mei) => mei.replace(' dots="1"', ''), /MEI escribe mal|puntillos|figuras|alt/i, 'compas-6-8-pulso'],
  ['figura de otro valor', (mei) => mei.replace('dur="4"', 'dur="2"'), /MEI escribe mal|suma|alt|plicas|cabeza/i, 'compas-4-4-pulso'],
  ['sin barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /agrupa mal|barras|corchetes/i, 'compas-6-8-subdivision'],
  ['sin acento', (mei) => mei.replace('<artic artic="acc" place="above"/>', ''), /MEI escribe mal|acentos|alt/i, 'compas-6-4-hemiolia'],
  ['otra cifra', (mei) => mei.replace('meter.count="6"', 'meter.count="3"'), /cifra/i, 'compas-6-8-pulso'],
  ['melodia distinta', (mei) => mei.replace('pname="e"', 'pname="f"'), /MEI escribe mal|melodia|esta a y/i, 'compas-4-4-melodia'],
  ['alteracion perdida', (mei) => mei.replace(' accid="s"', ''), /MEI escribe mal|alteraciones/i, 'anacrusa-famosas'],
];
const SABOTAJES_DIBUJO = [
  ['nota movida', (mei) => mei.replace('pname="g"', 'pname="a"'), /esta a y/, 'compas-4-4-pulso'],
  ['sin puntillo', (mei) => mei.replace(' dots="1"', ''), /puntillos/, 'compas-6-8-pulso'],
  ['figura de otro valor', (mei) => mei.replace('dur="4"', 'dur="2"'), /cabeza|plicas/, 'compas-4-4-pulso'],
  ['sin barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /barras|corchetes/, 'compas-6-8-subdivision'],
  ['sin acento', (mei) => mei.replace('<artic artic="acc" place="above"/>', ''), /acentos/, 'compas-6-4-hemiolia'],
  ['otra cifra', (mei) => mei.replace('meter.count="6"', 'meter.count="3"'), /cifra dibujada/, 'compas-6-8-pulso'],
  ['sin cifra de compas', (mei) => mei.replace(/ meter\.count="\d+" meter\.unit="\d+"/, ''), /cifra dibujada/, 'compas-4-4-pulso'],
  ['sin alteracion', (mei) => mei.replace(' accid="s"', ''), /alteraciones dibujadas/, 'anacrusa-famosas'],
  ['sin barra final', (mei) => mei.replace(' right="end"', ''), /barras de compas|MEI escribe otra barra/, 'anacrusa-compas'],
];
// sabotajes de los DATOS: la pagina dice una cosa y el dato otra; los revisores del alt tienen que saltar
const SABOTAJES_DATOS = [
  ['rotulo cambiado', (s) => { s.filas[0].textos[1].texto = 'Fuerte'; }, /el alt dice|rotulos/, 'acentuacion-3-4'],
  ['acento donde no toca', (s) => { s.filas[0].compases[0][1].acento = true; }, /acento de la nota|MEI/, 'acentuacion-4-4'],
  ['grupos distintos', (s) => { s.filas[1].compases[0].forEach((e, i) => { e.barra = i < 2 ? 0 : i < 4 ? 1 : 2; }); }, /grupos/, 'seis-corcheas-34-vs-68'],
  ['anacrusa mas larga', (s) => { s.filas[0].compases[0].push({ key: 'g/4', d: 'q', puntillo: 0, acento: false }); s.filas[0].sumas = [32, 64, 48]; }, /anacrusa|un tiempo|suman/, 'anacrusa-compas'],
  ['numero bajo la barra', (s) => { s.filas[0].textos[1].texto = '3'; }, /numeros bajo las barras/, 'seis-corcheas-34-vs-68'],
  ['pulso de mas', (s) => { s.filas[0].compases[0].push({ key: 'b/4', d: 'q', puntillo: 0, acento: false }); }, /suma|pulsos|nota/, 'acentuacion-2-4'],
];

/* ---------- main ---------- */
async function main() {
  const poner = process.argv.includes('--poner');
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const porArchivo = new Map();
  DATOS.forEach((d) => { d.archivos.forEach((a) => porArchivo.set(norm(a), d)); porArchivo.set(norm(d.slug + '.svg'), d); });   // tambien las paginas que ya llevan el SVG
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });

  // 1. localizar las imagenes en las paginas (con su alt y su data-tm-melody)
  const reImg = /(?:<a [^>]*>)?(?:<picture>(?:<source[^>]*>)*)?<img\b[^>]*>(?:<\/picture>)?(?:<\/a>)?/g;
  const paginas = [];
  for (const pag of PAGINAS) {
    const ruta = path.join(RAIZ, pag, 'index.html');
    if (!fs.existsSync(ruta)) continue;
    const html = fs.readFileSync(ruta, 'utf8');
    const imgs = [];
    let m;
    while ((m = reImg.exec(html))) {
      const src = (/src="([^"]+)"/.exec(m[0]) || [])[1] || '';
      const spec = porArchivo.get(norm(decodeURIComponent(src.split('/').pop())));
      if (!spec) continue;
      const alt = ((/alt="([^"]*)"/.exec(m[0]) || [])[1] || '').replace(/&amp;/g, '&');
      const fig = html.lastIndexOf('<figure', m.index);
      const tag = fig >= 0 ? html.slice(fig, html.indexOf('>', fig) + 1) : '';
      imgs.push({ trozo: m[0], spec, alt, melodia: (/data-tm-melody="([^"]*)"/.exec(tag) || [])[1] || null });
    }
    if (imgs.length) paginas.push({ pag, ruta, html, imgs });
  }
  const buscar = (slug) => paginas.flatMap((p) => p.imgs).find((i) => i.spec.slug === slug);

  if (sabotaje) {
    let mal = 0;
    const informa = (tipo, nombre, slug, ok, txt) => { console.log(`${ok ? '✓' : '✗'} sabotaje ${tipo} «${nombre}» en ${slug}: ${txt}`); if (!ok) mal++; };
    for (const [nombre, tocar, esperado, slug] of SABOTAJES) {
      const im = buscar(slug); if (!im) { informa('del MEI', nombre, slug, false, 'no encuentro la imagen'); continue; }
      const r = construir(tk, im.spec, im.alt, im.melodia, tocar, false);
      informa('del MEI', nombre, slug, r.errores.some((x) => esperado.test(x)), r.errores[0] || 'NO SE DETECTO');
    }
    for (const [nombre, tocar, esperado, slug] of SABOTAJES_DIBUJO) {
      const im = buscar(slug); if (!im) { informa('del dibujo', nombre, slug, false, 'no encuentro la imagen'); continue; }
      const r = construir(tk, im.spec, im.alt, im.melodia, tocar, true);
      informa('del dibujo', nombre, slug, r.errores.some((x) => esperado.test(x)), r.errores[0] || 'NO SE DETECTO');
    }
    for (const [nombre, muta, esperado, slug] of SABOTAJES_DATOS) {
      const im = buscar(slug); if (!im) { informa('de los datos', nombre, slug, false, 'no encuentro la imagen'); continue; }
      const copia = JSON.parse(JSON.stringify(im.spec)); muta(copia);
      const r = construir(tk, copia, im.alt, im.melodia, null, false);
      informa('de los datos', nombre, slug, r.errores.some((x) => esperado.test(x)), r.errores[0] || 'NO SE DETECTO');
    }
    // control positivo: sin sabotaje todo pasa (una imagen de cada tipo)
    for (const tipo of Object.keys(REVISORES)) {
      const im = paginas.flatMap((p) => p.imgs).find((i) => i.spec.tipo === tipo);
      if (!im) continue;
      const r = construir(tk, im.spec, im.alt, im.melodia, null, false);
      informa('(control)', 'sin sabotaje', im.spec.slug, !r.errores.length, r.errores.length ? r.errores.join(' / ') : 'sin errores');
    }
    process.exit(mal ? 1 : 0);
  }

  // 2. construir cada imagen una vez, verificar TODAS las apariciones (cada una con su alt) y escribirla
  const hechos = new Map();
  let fallos = 0;
  for (const p of paginas) {
    for (const im of p.imgs) {
      const slug = im.spec.slug;
      try {
        const r = construir(tk, im.spec, im.alt, im.melodia, null, false);
        if (r.errores.length) throw new Error(r.errores.join('\n   - '));
        if (!hechos.has(slug)) {
          fs.writeFileSync(path.join(RAIZ, SALIDA, slug + '.svg'), r.listo.svg);
          hechos.set(slug, { slug, w: r.listo.w, h: r.listo.h });
          console.log(`✓ ${slug.padEnd(32)} ${String(r.listo.svg.length).padStart(5)} B · ${r.listo.w}×${r.listo.h}${im.spec.filas.length > 1 ? `  (${im.spec.filas.length} filas)` : ''}`);
        }
        im.hecho = hechos.get(slug);
      } catch (err) {
        fallos++;
        console.log(`✗ ${slug}  (alt: ${im.alt.slice(0, 70)})\n   - ${err.message}`);
      }
    }
  }
  const total = new Set(paginas.flatMap((p) => p.imgs.map((i) => i.spec.slug))).size;
  const apariciones = paginas.reduce((a, p) => a + p.imgs.length, 0);
  console.log(`\n${hechos.size}/${total} imagenes distintas verificadas (${apariciones} apariciones, cada una contra su alt) en ${paginas.length} paginas`);
  if (fallos) { console.log(`${fallos} no pasan la verificacion: no se toca ninguna pagina`); process.exit(1); }

  if (poner) {
    for (const p of paginas) {
      let html = p.html;
      for (const im of p.imgs) {
        const alt = (/alt="([^"]*)"/.exec(im.trozo) || [])[0] || 'alt=""';
        const resto = (/<img\b([^>]*)>/.exec(im.trozo) || [])[1] || '';
        const loading = /loading="lazy"/.test(resto) ? ' loading="lazy"' : '';
        const nuevo = `<img src="/${SALIDA}/${im.hecho.slug}.svg" width="${im.hecho.w}" height="${im.hecho.h}" ${alt}${loading} decoding="async">`;
        html = html.replace(im.trozo, () => nuevo);
      }
      fs.writeFileSync(p.ruta, html);
      console.log(`escrito ${p.pag}/index.html: ${p.imgs.length} imagenes`);
    }
  }
}

if (require.main === module) main().catch((e) => { console.error('✗', e.message); process.exit(1); });
