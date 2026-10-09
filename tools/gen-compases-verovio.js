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

const SALIDA = 'assets/img/notacion';
const carpetaDe = (spec) => spec.carpeta || 'compases';   // assets/img/notacion/<carpeta>/<slug>.svg
const aFilas = (s) => (s.filas ? s : { ...s, tipo: 'cifra', filas: [{ num: s.num, den: s.den, simbolo: s.corte ? 'cut' : null, compases: s.compases }] });
const DATOS = [...require('./notacion/datos/compases-cifra.js'), ...require('./notacion/datos/compases-rotulados.js'), ...require('./notacion/datos/ritmo-figuras.js'), ...require('./notacion/datos/ritmo-grupos.js'), ...require('./notacion/datos/ritmo-signos.js'), ...require('./notacion/datos/ritmo-ornamentos.js')].map(aFilas);
// todas las paginas del diccionario (el generador solo toca las que llevan imagenes suyas)
const PAGINAS = (function buscar(dir) {
  const res = [];
  for (const d of fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const r = dir + '/' + d.name;
    if (fs.existsSync(path.join(RAIZ, r, 'index.html'))) res.push(r);
    res.push(...buscar(r));
  }
  return res;
})('diccionario-musical');

const DUR = { w: 64, h: 32, q: 16, 8: 8, 16: 4, 32: 2, 64: 1 };
const DUR_MEI = { w: 1, h: 2, q: 4, 8: 8, 16: 16, 32: 32, 64: 64 };
const GLIFO_CABEZA = { w: 'E0A2', h: 'E0A3', q: 'E0A4', 8: 'E0A4', 16: 'E0A4', 32: 'E0A4', 64: 'E0A4' };
const GLIFO_SILENCIO = { w: 'E4E3', h: 'E4E4', q: 'E4E5', 8: 'E4E6', 16: 'E4E7', 32: 'E4E8', 64: 'E4E9' };
const BANDERA = { arriba: { 8: 'E240', 16: 'E242', 32: 'E244', 64: 'E246' }, abajo: { 8: 'E241', 16: 'E243', 32: 'E245', 64: 'E247' } };
const TUPLA_GLIFO = (n) => String(n).split('').map((d) => 'E88' + d);
const ANCHO_CABEZA = { E0A2: 304, E0A3: 212, E0A4: 212 };   // anchura de cada cabeza, en unidades del dibujo
const anchoCab = (g) => ANCHO_CABEZA[g] || 250;              // (un silencio mide unos 250)
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const PASO_Y = ESPACIO / 2;
const PASO_E4 = 4 * 7 + 2;   // linea inferior de la clave de sol
const ACC_MEI = { 1: 's', '-1': 'f', 0: 'n', 2: 'x', '-2': 'ff' };   // OJO: «ss» en MEI son dos sostenidos juntos; el doble sostenido es «x»
const MEI_ACC = { s: 1, f: -1, n: 0, x: 2, ff: -2 };
const ACC_TXT = { 1: '#', '-1': 'b', 0: '', 2: '##', '-2': 'bb' };
const ACC_GLIFO = { 1: 'E262', '-1': 'E260', 0: 'E261', 2: 'E263', '-2': 'E264' };
const norm = (s) => String(s).normalize('NFC');
const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const durTotal = (e) => (e.gracia ? 0 : DUR[e.d] * (e.puntillo ? 1.5 : 1));   // una nota de adorno no ocupa tiempo
const NUM = { un: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, doce: 12 };
const FIGURA_ALT = { negra: 'q', corchea: '8', blanca: 'h', semicorchea: '16', redonda: 'w' };

/** 'd#/5' -> { letra: 'd', alt: 1, oct: 5 } */
function parseKey(key) {
  const m = /^([a-g])(##|bb|#|b)?\/(\d)$/.exec(key);
  if (!m) throw new Error('nota mal escrita: ' + key);
  return { letra: m[1], alt: { '##': 2, '#': 1, '': 0, b: -1, bb: -2 }[m[2] || ''], oct: Number(m[3]) };
}
const pasoDe = (key) => { const k = parseKey(key); return k.oct * 7 + LETRAS.indexOf(k.letra); };

/** Alteracion que se escribe en cada nota (regla del compas: vale hasta la barra). [compas][evento] -> 's' | 'f' | 'n' | null */
function alteraciones(fila) {
  return fila.compases.map((c) => {
    const estado = {};
    return c.map((e) => {
      if (e.silencio) return null;
      const k = parseKey(e.key), id = k.letra + k.oct;
      const vigente = id in estado ? estado[id] : 0;
      const muestra = k.alt !== vigente || !!e.becuadro;
      estado[id] = k.alt;
      return muestra ? ACC_MEI[k.alt] : null;
    });
  });
}

/** Tresillos, seisillos...: fila.tuplets = [{ c: compas, ini, fin, num, numbase }] (ini..fin = eventos del compas). */
const GLIFO_ARTIC = { acc: { above: 'E4A0', below: 'E4A1' }, stacc: { above: 'E4A2', below: 'E4A3' }, ten: { above: 'E4A4', below: 'E4A5' }, marc: { above: 'E4AC', below: 'E4AD' } };
/** Ornamentos: lo que se escribe en el MEI y el glifo que tiene que salir. */
const ORNA = {
  mordente: { tag: 'mordent', form: 'upper', glifo: 'E56C' },
  'mordente-inf': { tag: 'mordent', form: 'lower', glifo: 'E56D' },
  grupeto: { tag: 'turn', form: 'upper', glifo: 'E567' },
  'grupeto-inf': { tag: 'turn', form: 'lower', glifo: 'E568' },
  'grupeto-inf-raya': { tag: 'turn', form: 'lower', glyphName: 'ornamentTurnSlash', glifo: 'E569' },
  trino: { tag: 'trill', glifo: 'E566' },
};
const ornaMEI = (k) => { const o = ORNA[k]; return `<${o.tag} startid="#@ID@"${o.form ? ` form="${o.form}"` : ''}${o.glyphName ? ` glyph.name="${o.glyphName}" glyph.auth="smufl"` : ''} place="above"/>`; };
const ornaLeida = (tag, form, glyphName) => Object.keys(ORNA).find((k) => ORNA[k].tag === tag && (ORNA[k].form || undefined) === (form || undefined) && (ORNA[k].glyphName || undefined) === (glyphName || undefined)) || ('desconocido:' + tag + ':' + form + ':' + glyphName);
const articDe = (e) => (e.artic ? e.artic : e.acento ? { tipo: 'acc', lugar: 'above' } : null);
const tuplasDe = (fila, c) => (fila.tuplets || []).filter((t) => t.c === c);
const factorEvento = (fila, c, j) => { const t = tuplasDe(fila, c).find((x) => j >= x.ini && j <= x.fin); return t ? t.numbase / t.num : 1; };
const duracionBarra = (fila, c) => Math.round(fila.compases[c].reduce((a, e, j) => a + durTotal(e) * factorEvento(fila, c, j), 0) * 1e6) / 1e6;

/* ---------- MEI ---------- */
function aMEI(fila) {
  let k = 0;
  const acc = alteraciones(fila);
  const ids = {};
  const ornamentos = [];
  const total = fila.num ? fila.num * (64 / fila.den) : null;
  const ms = fila.compases.map((c, i) => {
    const evento = (x, j) => {
      const id = `n${k++}`;
      ids[`${i},${j}`] = id;
      if (x.orna) ornamentos.push({ en: i, txt: ornaMEI(x.orna).replace('@ID@', id) });
      const dur = `dur="${DUR_MEI[x.d]}"${x.puntillo ? ' dots="1"' : ''}${x.gracia ? ` grace="${x.gracia}"` : ''}`;
      if (x.silencio) return `<rest xml:id="${id}" ${dur}/>`;
      const p = parseKey(x.key), a = acc[i][j];
      return `<note xml:id="${id}" pname="${p.letra}" oct="${p.oct}" ${dur}${a ? ` accid="${a}"` : ''}${x.plica ? ` stem.dir="${x.plica}"` : ''}${x.union ? ` tie="${x.union}"` : ''}>${articDe(x) ? `<artic artic="${articDe(x).tipo}" place="${articDe(x).lugar}"/>` : ''}</note>`;
    };
    // unidades: un evento suelto o un grupo con barra
    const unidades = [];
    for (let j = 0; j < c.length;) {
      const e = c[j];
      if (e.barra === undefined) { unidades.push({ ini: j, fin: j, txt: evento(e, j) }); j++; continue; }
      let f = j; const grupo = [];
      while (f < c.length && c[f].barra === e.barra) { grupo.push(evento(c[f], f)); f++; }
      unidades.push({ ini: j, fin: f - 1, txt: grupo.length > 1 ? `<beam>${grupo.join('')}</beam>` : grupo[0] });
      j = f;
    }
    // tresillos: envuelven las unidades que cubren; no pueden partir un grupo con barra
    let cuerpo = unidades;
    for (const t of tuplasDe(fila, i)) {
      const dentro = cuerpo.filter((u) => u.ini >= t.ini && u.fin <= t.fin && !u.envuelto);
      const parte = cuerpo.filter((u) => u.fin >= t.ini && u.ini <= t.fin);
      if (!dentro.length || dentro.length !== parte.length) throw new Error('el grupo de valoracion especial parte un grupo con barra');
      const abre = `<tuplet num="${t.num}" numbase="${t.numbase}" num.visible="true" num.place="above" bracket.visible="${t.corchete === false ? 'false' : 'true'}" bracket.place="above">`;
      const nuevo = { ini: dentro[0].ini, fin: dentro[dentro.length - 1].fin, txt: abre + dentro.map((u) => u.txt).join('') + '</tuplet>', envuelto: true };
      const pos = cuerpo.indexOf(dentro[0]);
      cuerpo = [...cuerpo.slice(0, pos), nuevo, ...cuerpo.slice(pos + dentro.length)];
    }
    let texto = cuerpo.map((u) => u.txt).join('');
    if (!c.length) texto = '<space dur="1"/>';
    const ultimo = i === fila.compases.length - 1;
    const der = ultimo ? (fila.sinBarraFinal ? ' right="invis"' : fila.barraFinal === 'end' ? ' right="end"' : '') : '';
    const incompleto = total && c.length && duracionBarra(fila, i) !== total ? ' metcon="false"' : '';
    return { i, der, incompleto, texto };
  });
  // ligaduras de expresion: eventos de control que apuntan a las notas
  const slurs = (fila.slurs || []).map((s) => ({ en: s.de[0], txt: `<slur startid="#${ids[s.de.join(',')]}" endid="#${ids[s.a.join(',')]}" curvedir="${s.curva || 'above'}"/>` }));
  const medidas = ms.map((m) => `<measure n="${m.i + 1}"${m.der}${m.incompleto}><staff n="1"><layer n="1">${m.texto}</layer></staff>${slurs.filter((s) => s.en === m.i).map((s) => s.txt).join('')}${ornamentos.filter((o) => o.en === m.i).map((o) => o.txt).join('')}</measure>`).join('');
  const metro = !fila.num ? '' : fila.simbolo ? ` meter.count="${fila.num}" meter.unit="${fila.den}" meter.sym="${fila.simbolo}"` : ` meter.count="${fila.num}" meter.unit="${fila.den}"`;
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="G" clef.line="2"${metro}/></staffGrp></scoreDef><section>${medidas}</section></score></mdiv></body></music></mei>`;
}

/**
 * Lee el MEI como lo leeria un musico: por compas, [{id, silencio, key, d, puntillo, acento, grupo, plica, union, tupla}]
 * (grupo = n.º de <beam> o -1; tupla = n.º de <tuplet> o -1). El array lleva ademas .tuplas ([{num, numbase}]) y .slurs ([{de, a}] por id).
 */
function leerMEI(mei) {
  const compases = [];
  const tuplas = [];
  let nb = 0;
  for (const m of mei.match(/<measure [\s\S]*?<\/measure>/g) || []) {
    const evs = [];
    const estado = {};
    const re = /<beam>|<\/beam>|<tuplet [^>]*>|<\/tuplet>|<rest [^>]*?\/>|<note [^>]*?(?:\/>|>[\s\S]*?<\/note>)/g;
    let x, dentro = -1;
    const pila = [];
    while ((x = re.exec(m))) {
      const t = x[0];
      if (t === '<beam>') { dentro = nb++; continue; }
      if (t === '</beam>') { dentro = -1; continue; }
      if (t === '</tuplet>') { pila.pop(); continue; }
      const a = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(t) || [])[1];
      if (t.startsWith('<tuplet')) { tuplas.push({ num: Number(a('num')), numbase: Number(a('numbase')), corchete: a('bracket.visible') !== 'false' }); pila.push(tuplas.length - 1); continue; }
      const d = Object.keys(DUR_MEI).find((q) => DUR_MEI[q] === Number(a('dur')));
      const base = { id: a('xml:id'), d, puntillo: Number(a('dots') || 0), grupo: dentro, tupla: pila.length ? pila[pila.length - 1] : -1 };
      if (t.startsWith('<rest')) { evs.push({ ...base, silencio: true }); continue; }
      const id = a('pname') + a('oct');
      if (a('accid') !== undefined) estado[id] = MEI_ACC[a('accid')];
      evs.push({ ...base, key: a('pname') + ACC_TXT[id in estado ? estado[id] : 0] + '/' + a('oct'), artic: /<artic /.test(t) ? { tipo: (/artic artic="(\w+)"/.exec(t) || [])[1], lugar: (/place="(\w+)"/.exec(t.slice(t.indexOf('<artic'))) || [])[1] } : null, acento: /artic="acc"/.test(t), plica: a('stem.dir'), union: a('tie'), gracia: a('grace') });
    }
    // ornamentos: eventos de control que apuntan a una nota (startid)
    for (const c of m.match(/<(?:mordent|turn|trill) [^>]*\/>/g) || []) {
      const at = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(c) || [])[1];
      const ev = evs.find((e) => '#' + e.id === at('startid'));
      if (ev) ev.orna = ornaLeida(/^<(\w+)/.exec(c)[1], at('form'), at('glyph.name'));
    }
    compases.push(evs);
  }
  compases.tuplas = tuplas;
  compases.slurs = [...mei.matchAll(/<slur [^>]*>/g)].map((s) => ({ de: (/startid="#([^"]+)"/.exec(s[0]) || [])[1], a: (/endid="#([^"]+)"/.exec(s[0]) || [])[1] }));
  return compases;
}
const meiMeter = (mei) => ({ count: (/meter\.count="(\d+)"/.exec(mei) || [])[1], unit: (/meter\.unit="(\d+)"/.exec(mei) || [])[1], sym: (/meter\.sym="(\w+)"/.exec(mei) || [])[1] });
const eventoTxt = (e) => (e.silencio ? `r:${e.d}${e.puntillo ? '.' : ''}` : `${e.key}:${e.d}${e.puntillo ? '.' : ''}`);
/** Rangos de cada grupo de valoracion especial de un compas, como [ini, fin, num, numbase] (a partir de lo LEIDO). */
function tuplasLeidas(leido, c) {
  const res = {};
  leido[c].forEach((e, j) => { if (e.tupla >= 0) { const r = res[e.tupla] = res[e.tupla] || [j, j, leido.tuplas[e.tupla].num, leido.tuplas[e.tupla].numbase]; r[1] = j; } });
  return Object.values(res);
}

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
const NOMBRE_FIGURA = { redonda: 'w', blanca: 'h', negra: 'q', corchea: '8', semicorchea: '16', fusa: '32', semifusa: '64' };
const REVISORES = {
  cifra: revisarCifra,
  figura(spec, leido, alt) {
    const err = [], evs = leido[0].flat();
    const m = /^(Figura |Silencio de )?(semicorchea|semifusa|redonda|blanca|negra|corchea|fusa)( con puntillo)?/i.exec(alt);
    if (!m) return ['el alt no empieza nombrando una figura o un silencio'];
    if (evs.length !== 1) err.push('deberia haber una sola figura');
    const e = evs[0] || {};
    if (!!e.silencio !== /^Silencio/i.test(m[1] || '')) err.push(`el alt habla de ${/^Silencio/i.test(m[1] || '') ? 'un silencio' : 'una figura'} y el dibujo es ${e.silencio ? 'un silencio' : 'una figura'}`);
    if (e.d !== NOMBRE_FIGURA[m[2].toLowerCase()]) err.push(`el alt dice «${m[2]}» y el dibujo es «${e.d}»`);
    if (!!e.puntillo !== !!m[3]) err.push(`el alt ${m[3] ? 'dice' : 'no dice'} «con puntillo» y el dibujo ${e.puntillo ? 'lo lleva' : 'no lo lleva'}`);
    return err;
  },
  grupo(spec, leido, alt) {
    const err = [], evs = leido[0].flat(), t = leido[0].tuplas;
    const NOMBRES = { tresillo: [3, 2], dosillo: [2, 3], cuatrillo: [4, 6], seisillo: [6, 4], quintillo: [5, null], septillo: [7, null] };   // numero y equivalencia (la de la pagina)
    const m = /^(Tresillo|Dosillo|Cuatrillo|Quintillo|Seisillo|Septillo)/i.exec(alt);
    if (!m) return ['el alt no empieza nombrando el grupo'];
    const [n, nb] = NOMBRES[m[1].toLowerCase()];
    if (evs.length !== n) err.push(`el alt habla de un ${m[1].toLowerCase()} (${n} figuras) y hay ${evs.length}`);
    if (t.length !== 1 || t[0].num !== n) err.push('el grupo deberia ser un unico grupo de ' + n);
    else if (nb && t[0].numbase !== nb) err.push(`el ${m[1].toLowerCase()} equivale a ${n}:${nb} segun la pagina y el dibujo dice ${n}:${t[0].numbase}`);
    const f = /(corcheas|semicorcheas)/.exec(alt);
    if (f && evs.some((e) => e.d !== (f[1] === 'corcheas' ? '8' : '16'))) err.push(`el alt dice «${f[1]}» y alguna figura es otra`);
    const num = /con el n[uú]mero (\d)/.exec(alt);
    if (num && Number(num[1]) !== n) err.push(`el alt dice «número ${num[1]}» y el grupo es de ${n}`);
    if (tamanosDeBarra(leido[0]).join() !== String(n)) err.push('las figuras del grupo deberian ir unidas por una sola barra');
    if (evs.some((e) => e.plica !== 'up')) err.push('las plicas deberian ir hacia arriba (para que el numero quede encima)');
    return err;
  },
  comparacion(spec, leido, alt) {
    const err = [], f = spec.filas[0], t = leido[0].tuplas, evs = leido[0].flat();
    const c = /compás de (\d+)\/(\d+)/.exec(alt);
    if (!c || Number(c[1]) !== f.num || Number(c[2]) !== f.den) err.push(`el alt habla de ${c ? c[0] : 'otro compas'} y el dibujo es ${f.num}/${f.den}`);
    const g = /con (dos|tres) corcheas normales|con (tres) corcheas normales/.exec(alt);
    const tup = /un (tresillo|dosillo) de (dos|tres) corcheas/.exec(alt);
    if (!tup) return err.concat('el alt ya no describe «un tresillo/dosillo de N corcheas»');
    const nTup = NUM[tup[2]];
    const nNormal = NUM[(g[1] || g[2])];
    if (t.length !== 1 || t[0].num !== nTup || evs.length !== nNormal + nTup) err.push(`el alt dice ${nNormal} corcheas normales y ${tup[1]} de ${nTup}; el dibujo tiene ${evs.length - (t[0] ? t[0].num : 0)} y ${t.length ? t[0].num : 0}`);
    if (tup[1] === 'tresillo' ? t[0].numbase !== 2 : t[0].numbase !== 3) err.push('la equivalencia del grupo no es la de la pagina');
    const n = /marcado con el n[uú]mero (\d)/.exec(alt);
    if (!n || Number(n[1]) !== nTup) err.push('el numero que dice el alt no es el del grupo');
    if (evs.some((e) => e.d !== '8')) err.push('todas las figuras deberian ser corcheas');
    if (f.textos.map((x) => x.texto).join('|') !== (nNormal === 2 ? 'dos corcheas' : 'tres corcheas') + '|' + tup[1]) err.push('los rotulos no son los del alt');
    return err;
  },
  'tipos-de-grupo'(spec, leido, alt) {
    const err = [];
    if (!new RegExp('^Tres tipos de ' + spec.nombre).test(alt)) err.push('el alt no habla de los tres tipos de ' + spec.nombre);
    const N = spec.nombre === 'tresillo' ? 3 : 2, base = spec.nombre === 'tresillo' ? 2 : 3;
    const trozos = [...alt.matchAll(/de (negra|corchea|semicorchea) \((\w+) (negras|corcheas|semicorcheas)\)/g)];
    if (trozos.length !== 3 || spec.filas.length !== 3) err.push('hay que describir y dibujar tres grupos, uno por fila');
    trozos.forEach((x, i) => {
      const quiere = FIGURA_ALT[x[1]], t = (leido[i] || []).tuplas || [], ev = (leido[i] || []).flat();
      if (NUM[x[2]] !== N || ev.length !== N || ev.some((e) => e.d !== quiere)) err.push(`el grupo ${i + 1} deberia ser de ${N} ${x[3]}`);
      if (t.length !== 1 || t[0].num !== N || t[0].numbase !== base) err.push(`el grupo ${i + 1} deberia ser ${N}:${base}`);
      if (!spec.filas[i] || spec.filas[i].rotulo !== 'de ' + x[1]) err.push(`el rotulo del grupo ${i + 1} deberia ser «de ${x[1]}»`);
    });
    const n = /su n[uú]mero (\d)/.exec(alt);
    if (!n || Number(n[1]) !== N) err.push('el numero que dice el alt no es el del grupo');
    return err;
  },
  'tresillo-latino'(spec, leido, alt) {
    const err = [], f = spec.filas[0], evs = leido[0].flat();
    if (!/compás de 4\/4/.test(alt) || f.num !== 4 || f.den !== 4) err.push('el alt y el dibujo no coinciden en el compas 4/4');
    if (leido[0].tuplas.length) err.push('el tresillo latino NO es un grupo de valoracion especial');
    if (evs.map(eventoTxt).join() !== 'a/4:q.,a/4:q.,a/4:q') err.push('deberian ser dos negras con puntillo y una negra');
    const grupos = (/en (\d(?:\+\d)+)/.exec(alt) || [])[1];
    if (grupos !== f.textos.map((x) => x.texto).join('+')) err.push('los rotulos no son el reparto 3+3+2 del alt');
    // cada rotulo = numero de corcheas que dura su figura
    evs.forEach((e, i) => { if (durTotal(e) / 8 !== Number(f.textos[i].texto)) err.push(`el rotulo ${f.textos[i].texto} no es la duracion en corcheas de la figura ${i + 1}`); });
    return err;
  },
  ornamento(spec, leido, alt) {
    const err = [], [escrito, tocado] = leido[0], evs = leido[0].flat();
    const LETRA = { Do: 'c', Re: 'd', Mi: 'e', Fa: 'f', Sol: 'g', La: 'a', Si: 'b' };
    const letras = (txt) => [...txt.matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => LETRA[m[1]]);
    const TIPOS = [[/^Apoyatura/, 'apoyatura'], [/^Acciaccatura/, 'acciaccatura'], [/^Mordente superior/, 'mordente'], [/^Mordente inferior/, 'mordente-inf'], [/^Grupeto directo/, 'grupeto'], [/^Grupeto inverso/, 'grupeto-inf-raya'], [/^Trino/, 'trino']];
    const tipo = (TIPOS.find(([re]) => re.test(alt)) || [])[1];
    if (!tipo) return ['el alt no empieza nombrando un ornamento conocido'];
    const i = alt.search(/realizaci[oó]n/);
    if (i < 0) return ['el alt ya no habla de la realizacion'];
    const antes = alt.slice(0, i), despues = alt.slice(i);
    const principal = escrito.find((e) => !e.gracia), adorno = escrito.find((e) => e.gracia);
    if (tipo === 'apoyatura' || tipo === 'acciaccatura') {
      if (!adorno || adorno.gracia !== (tipo === 'apoyatura' ? 'acc' : 'unacc')) err.push(`la ${tipo} lleva ${adorno ? 'una nota de adorno ' + (adorno.gracia === 'unacc' ? 'tachada' : 'sin tachar') : 'ninguna nota de adorno'}`);
      if (tipo === 'acciaccatura' && !/tachada/.test(antes)) err.push('el alt de la acciaccatura ya no dice «tachada»');
      const [l1, l2] = letras(antes);   // «nota pequeña La … Sol»
      if (!adorno || !principal || adorno.key[0] !== l1 || principal.key[0] !== l2) err.push(`el alt dice adorno ${l1} y nota principal ${l2}; el dibujo ${adorno && adorno.key[0]} y ${principal && principal.key[0]}`);
      if (/ligada/.test(antes) && leido[0].slurs.length !== 1) err.push('el alt dice «ligada» y no hay ligadura');
      if (tipo === 'apoyatura') {
        if (tocado.length !== 2 || tocado.some((e) => e.d !== '8') || !/corcheas/.test(despues)) err.push('la apoyatura se toca con dos corcheas');
      } else if (tocado.length !== 2 || tocado[0].d !== '16' || !/r[aá]pida/.test(despues)) err.push('la acciaccatura se toca con una nota breve (semicorchea) antes de la principal');
      if (tocado.map((e) => e.key[0]).join() !== [l1, l2].join()) err.push('la realizacion deberia ser ' + [l1, l2].join(' y '));
      return err;
    }
    if (!principal || principal.orna !== tipo) err.push(`el ornamento dibujado es «${principal && principal.orna}» y el alt dice «${tipo}»`);
    if (adorno) err.push('este ornamento no lleva nota de adorno');
    if (principal && principal.key[0] !== letras(antes)[0]) err.push(`el alt dice que va sobre ${letras(antes)[0]} y la nota es ${principal.key[0]}`);
    if (tipo === 'mordente-inf' && !/rayita/.test(antes + despues)) err.push('el alt del mordente inferior ya no habla de la rayita vertical');
    if (tipo === 'grupeto-inf-raya' && !/rayita/.test(antes)) err.push('el alt del grupeto inverso ya no habla de la rayita vertical');
    if (tipo === 'trino') {
      if (principal.d !== 'h' || !/blanca/.test(antes)) err.push('el trino va sobre una blanca');
      const par = letras(despues);   // «Sol-La»: alternancia rapida
      const quiere = Array.from({ length: tocado.length }, (_, k) => par[k % par.length]).join();
      if (par.length !== 2 || tocado.length !== 8 || tocado.some((e) => e.d !== '16') || tocado.map((e) => e.key[0]).join() !== quiere) err.push('la realizacion del trino deberia ser una alternancia de semicorcheas ' + par.join('-'));
    } else {
      const quiere = letras(despues).join();
      if (tocado.map((e) => e.key[0]).join() !== quiere) err.push(`la realizacion del alt es ${quiere} y el dibujo ${tocado.map((e) => e.key[0]).join()}`);
      if (/muy r[aá]pido/.test(despues) && tocado.some((e) => DUR[e.d] > 8)) err.push('«muy rapido»: la realizacion deberia ser de notas breves');
    }
    return err;
  },
  alteracion(spec, leido, alt) {
    const err = [], evs = leido[0].flat();
    const NOMBRES = { 'doble sostenido': 2, 'doble bemol': -2, sostenido: 1, bemol: -1, becuadro: 0 };
    const m = /^(doble sostenido|doble bemol|sostenido|bemol|becuadro) sobre una nota/i.exec(alt);
    if (!m) return ['el alt ya no empieza «<signo> sobre una nota»'];
    const quiere = NOMBRES[m[1].toLowerCase()];
    if (evs.length !== 1) err.push('deberia haber una sola nota');
    else {
      const k = parseKey(evs[0].key);
      if (k.alt !== quiere) err.push(`el alt dice «${m[1]}» (${quiere > 0 ? '+' : ''}${quiere}) y la nota lleva ${k.alt > 0 ? '+' : ''}${k.alt}`);
      if (k.letra + k.oct !== 'g4') err.push('la nota deberia ser un Sol 4');
    }
    return err;
  },
  articulacion(spec, leido, alt) {
    const err = [], evs = leido[0].flat();
    if (!/^Cuatro notas/.test(alt) || evs.length !== 4) err.push('el alt habla de cuatro notas y el dibujo tiene ' + evs.length);
    const TIPOS = { acento: 'acc', staccato: 'stacc', tenuto: 'ten', marcato: 'marc' };
    const nombre = Object.keys(TIPOS).find((k) => alt.includes(k));
    if (/legato/.test(alt)) {
      const sl = leido[0].slurs;
      if (!/ligadura de expresi[oó]n/.test(alt) || sl.length !== 1 || sl[0].de !== evs[0].id || sl[0].a !== evs[evs.length - 1].id) err.push('el legato es una ligadura de expresion de la primera a la ultima nota');
      if (evs.some((e) => e.artic)) err.push('el legato no lleva signos sobre las notas');
    } else if (!nombre) err.push('el alt no nombra la articulacion');
    else {
      if (evs.some((e) => !e.artic || e.artic.tipo !== TIPOS[nombre])) err.push(`el alt dice «${nombre}» y alguna nota lleva otro signo`);
      if (evs.some((e) => e.artic && e.artic.lugar !== 'below')) err.push('el signo deberia ir debajo de la cabeza (las plicas van hacia arriba)');
      if (leido[0].slurs.length) err.push('hay una ligadura que la pagina no menciona');
    }
    if (evs.some((e) => e.plica !== 'up')) err.push('las plicas deberian ir hacia arriba');
    return err;
  },
  'ligadura-union'(spec, leido, alt) {
    const err = [], evs = leido[0].flat();
    if (!/ligadura de uni[oó]n/i.test(alt) || !/misma altura/.test(alt)) err.push('el alt ya no describe una ligadura de union entre notas de la misma altura');
    if (evs.length !== 2 || evs[0].key !== evs[1].key) err.push('una ligadura de union une dos notas de la MISMA altura');
    if (!/dos notas/.test(alt) || evs.length !== 2) err.push('el alt habla de dos notas');
    return err;
  },
  'ligadura-expresion'(spec, leido, alt) {
    const err = [], evs = leido[0].flat();
    if (!/ligadura de expresi[oó]n/i.test(alt) || !/varias notas de distinta altura/.test(alt)) err.push('el alt ya no describe una ligadura de expresion sobre varias notas de distinta altura');
    if (evs.length < 3 || evs.some((x, i) => i && x.key === evs[i - 1].key)) err.push('una ligadura de expresion abarca varias notas y cada una cambia de altura respecto a la anterior');
    const ids = leido[0].slurs;
    if (ids.length !== 1 || ids[0].de !== evs[0].id || ids[0].a !== evs[evs.length - 1].id) err.push('la ligadura de expresion deberia ir de la primera a la ultima nota');
    return err;
  },
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
/** Una entrada por nota o silencio, en orden: glifo de la cabeza (o del silencio) y su posicion. */
function cabezas(svg) { return detalle(svg).map((d) => ({ id: d.id, g: d.cabeza || d.glifo, x: d.x, y: d.y })); }
/** Cada nota o silencio del dibujo, en orden: cabeza, plica (sube/baja), corchete, silencio. */
function detalle(svg) {
  const marcas = [...svg.matchAll(/<g id="(n\d+)" class="(note|rest)"/g)];
  return marcas.map((m, i) => {
    const trozo = svg.slice(m.index, i + 1 < marcas.length ? marcas[i + 1].index : svg.length);
    const d = { id: Number(m[1].slice(1)), tipo: m[2] };
    if (m[2] === 'rest') { const r = /href="#(E4E[0-9A-F])[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/.exec(trozo) || []; d.glifo = r[1]; d.x = Number(r[2]); d.y = Number(r[3]); return d; }
    const cab = /<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/.exec(trozo);
    if (cab) { d.cabeza = cab[1]; d.x = Number(cab[2]); d.y = Number(cab[3]); }
    const tr = /class="stem">((?:\s*<path[^>]*\/>)+)/.exec(trozo);
    d.tachada = tr ? (tr[1].match(/<path/g) || []).length > 1 : false;
    const pl = /class="stem">\s*<path d="M([\d.]+) ([\d.]+) L[\d.]+ ([\d.]+)"/.exec(trozo);
    if (pl) d.plica = Number(pl[3]) < Number(pl[2]) ? 'arriba' : 'abajo';
    d.bandera = (/class="flag">\s*<use [^>]*href="#(E2[0-9A-F]+)/.exec(trozo) || [])[1];
    return d;
  });
}
const lineas = (svg) => [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);

function verificarDatos(fila) {
  const err = [];
  const total = fila.num ? totalDe(fila) : null;
  const sumas = fila.sumas || (total ? fila.compases.map(() => total) : null);
  if (sumas && sumas.length !== fila.compases.length) err.push('hay que declarar la duracion de cada compas');
  fila.compases.forEach((c, i) => {
    if (!c.length) return;
    if (sumas) { const s = duracionBarra(fila, i); if (s !== sumas[i]) err.push(`el compas ${i + 1} suma ${s}/64 y deberia sumar ${sumas[i]}/64${total ? ` (${fila.num}/${fila.den} = ${total}/64)` : ''}`); }
    c.forEach((e) => { if (e.barra !== undefined && DUR[e.d] > 8) err.push(`en el compas ${i + 1} hay una figura con barra que no es corchea ni menor`); });
  });
  (fila.tuplets || []).forEach((t) => {
    const c = fila.compases[t.c];
    if (!c || t.ini < 0 || t.fin >= c.length || t.fin < t.ini) err.push('un grupo de valoracion especial se sale del compas');
    else if (t.fin - t.ini + 1 !== t.num) err.push(`un grupo de valoracion especial de ${t.num} tiene ${t.fin - t.ini + 1} figuras`);
  });
  const planas = fila.compases.flat();
  planas.forEach((e, k) => { if (e.gracia && (!planas[k + 1] || planas[k + 1].gracia)) err.push('una nota de adorno tiene que ir seguida de la nota a la que adorna'); });
  planas.forEach((e, k) => { if (e.union === 'i' || e.union === 'm') { const s = planas[k + 1]; if (!s || !(s.union === 't' || s.union === 'm') || s.key !== e.key) err.push('una ligadura de union no acaba en la misma nota'); } });
  const n = (c, j) => (c >= 0 && fila.compases[c] ? fila.compases[c][j] : null);
  (fila.slurs || []).forEach((s) => { if (!n(s.de[0], s.de[1]) || !n(s.a[0], s.a[1])) err.push('una ligadura de expresion apunta a una nota que no existe'); });
  if (fila.cierra && fila.compases.length > 1 && total && sumaBarra(fila.compases[0]) + sumaBarra(fila.compases[fila.compases.length - 1]) !== total) err.push('la anacrusa y el ultimo compas deberian sumar un compas completo');
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
  const quiereMetro = !fila.num ? [] : fila.simbolo === 'cut' ? ['E08B'] : fila.simbolo === 'common' ? ['E08A'] : [...dig(fila.num), ...dig(fila.den)];
  if (JSON.stringify(glifosMetro) !== JSON.stringify(quiereMetro)) err.push('cifra dibujada ' + JSON.stringify(glifosMetro) + ', prevista ' + JSON.stringify(quiereMetro));
  const det = detalle(svg);
  if (det.length !== evs.length) err.push(`${det.length} notas y silencios dibujados, debian ser ${evs.length}`);
  const ls = lineas(svg);
  const grupos = {};
  evs.forEach((e) => { if (e.barra !== undefined) grupos[e.barra] = (grupos[e.barra] || 0) + 1; });
  const enBarra = (e) => e.barra !== undefined && grupos[e.barra] > 1;
  if (ls.length !== 5 || ls.some((y, k) => k && y - ls[k - 1] !== ESPACIO)) err.push('el pentagrama no tiene 5 lineas');
  else {
    det.forEach((d, k) => {
      const e = evs[k]; if (!e) return;
      if (e.silencio) {
        if (d.tipo !== 'rest') err.push(`el evento ${k + 1} deberia ser un silencio`);
        else if (d.glifo !== GLIFO_SILENCIO[e.d]) err.push(`el silencio ${k + 1} es ${d.glifo} y para «${e.d}» deberia ser ${GLIFO_SILENCIO[e.d]}`);
        return;
      }
      if (d.tipo !== 'note') { err.push(`el evento ${k + 1} deberia ser una nota`); return; }
      const quiere = ls[4] - (pasoDe(e.key) - PASO_E4) * PASO_Y;
      if (d.y !== quiere) err.push(`la nota ${k + 1} (${e.key}) esta a y=${d.y} y le corresponde y=${quiere}`);
      if (d.cabeza !== GLIFO_CABEZA[e.d]) err.push(`la cabeza de la nota ${k + 1} es ${d.cabeza} y para «${e.d}» deberia ser ${GLIFO_CABEZA[e.d]}`);
      if (e.d === 'w') { if (d.plica) err.push(`la nota ${k + 1} es una redonda y lleva plica`); return; }
      if (!d.plica) { err.push(`la nota ${k + 1} no lleva plica`); return; }
      if (e.plica && d.plica !== (e.plica === 'up' ? 'arriba' : 'abajo')) err.push(`la plica de la nota ${k + 1} va hacia ${d.plica} y deberia ir hacia ${e.plica === 'up' ? 'arriba' : 'abajo'}`);
      if (d.tachada !== (e.gracia === 'unacc')) err.push(`la nota ${k + 1} ${e.gracia === 'unacc' ? 'deberia llevar' : 'no deberia llevar'} la rayita de las notas de adorno breves (acciaccatura)`);
      const quiereBandera = DUR[e.d] <= 8 && !enBarra(e) ? BANDERA[d.plica][e.d] : undefined;
      if (d.bandera !== quiereBandera) err.push(`la nota ${k + 1} lleva el corchete ${d.bandera || 'ninguno'} y deberia llevar ${quiereBandera || 'ninguno'}`);
    });
  }
  // alteraciones: numero y signo
  const quiereAcc = {};
  alteraciones(fila).flat().forEach((a) => { if (a) { const g = ACC_GLIFO[MEI_ACC[a]]; quiereAcc[g] = (quiereAcc[g] || 0) + 1; } });
  const dibAcc = {};
  (svg.match(/class="accid"[^>]*>\s*<use [^>]*href="#E2[0-9A-F]+/g) || []).forEach((g) => { const c = /#(E2[0-9A-F]+)/.exec(g)[1]; dibAcc[c] = (dibAcc[c] || 0) + 1; });
  if (JSON.stringify(Object.entries(dibAcc).sort()) !== JSON.stringify(Object.entries(quiereAcc).sort())) err.push(`alteraciones dibujadas ${JSON.stringify(dibAcc)}, previstas ${JSON.stringify(quiereAcc)}`);
  if (cuenta(svg, /class="dots"/g) !== evs.filter((e) => e.puntillo).length) err.push('numero de puntillos distinto del previsto');
  const nBarras = Object.values(grupos).filter((n) => n > 1).length;
  if (cuenta(svg, /class="beam"/g) !== nBarras) err.push(`${cuenta(svg, /class="beam"/g)} barras, debian ser ${nBarras}`);
  const quiereArtic = evs.filter((e) => articDe(e)).map((e) => GLIFO_ARTIC[articDe(e).tipo][articDe(e).lugar]);
  const dibArtic = [...svg.matchAll(/class="artic"[\s\S]{0,200}?href="#(E4[0-9A-F]{2})/g)].map((m) => m[1]);
  if (JSON.stringify(dibArtic) !== JSON.stringify(quiereArtic)) err.push(`acentos y articulaciones dibujados ${JSON.stringify(dibArtic)}, previstos ${JSON.stringify(quiereArtic)} (o no estan donde toca)`);
  // grupos de valoracion especial: corchete (si lo hay) y numero
  const tup = fila.tuplets || [];
  if (cuenta(svg, /class="tuplet"/g) !== tup.length) err.push(`${cuenta(svg, /class="tuplet"/g)} grupos de valoracion especial, debian ser ${tup.length}`);
  if (cuenta(svg, /class="tupletBracket"/g) !== tup.filter((t) => t.corchete !== false).length) err.push('corchetes de grupo distintos de los previstos');
  const numeros = [...svg.matchAll(/class="tupletNum">([\s\S]*?)<\/g>/g)].map((m) => [...m[1].matchAll(/href="#(E88\d)/g)].map((x) => x[1]));
  if (JSON.stringify(numeros) !== JSON.stringify(tup.map((t) => TUPLA_GLIFO(t.num)))) err.push(`numeros de grupo dibujados ${JSON.stringify(numeros)}, previstos ${JSON.stringify(tup.map((t) => TUPLA_GLIFO(t.num)))}`);
  // ornamentos: el glifo de cada uno, en orden
  const quiereOrna = evs.filter((e) => e.orna).map((e) => ORNA[e.orna].glifo);
  const dibOrna = [...svg.matchAll(/class="(?:mordent|turn|trill)">\s*<use [^>]*href="#(E56[0-9A-F])/g)].map((m) => m[1]);
  if (JSON.stringify(dibOrna) !== JSON.stringify(quiereOrna)) err.push(`ornamentos dibujados ${JSON.stringify(dibOrna)}, previstos ${JSON.stringify(quiereOrna)}`);
  // ligaduras
  if (cuenta(svg, /class="tie"/g) !== evs.filter((e) => e.union === 'i' || e.union === 'm').length) err.push('ligaduras de union dibujadas distintas de las previstas');
  if (cuenta(svg, /class="slur"/g) !== (fila.slurs || []).length) err.push('ligaduras de expresion dibujadas distintas de las previstas');
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
    const ancho = (c) => anchoCab(c.g) / 2;
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
  const c = (k) => cabs[k].x + anchoCab(cabs[k].g) / 2;
  return t.grupo ? t.grupo.map(c).reduce((a, b) => a + b, 0) / t.grupo.length : c(t.nota);
};
/** Que los rotulos no se pisen entre si ni se salgan del dibujo. Devuelve el motivo, o '' si caben. */
function rotulosCaben(fila, cabs, W) {
  const ts = textosDeFila(fila).map((t) => { const c = centroDe(t, cabs), w = anchoTexto(t); return { t, ini: t.izq ? c : c - w / 2, fin: t.izq ? c + w : c + w / 2 }; });
  for (const a of ts) if (a.ini < 0 || a.fin + 200 > W) return `el rotulo «${a.t.texto}» no cabe en el ancho del dibujo`;
  for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
    if (ts[i].t.ref !== ts[j].t.ref) continue;
    if (ts[i].fin + (fila.holgura || 80) > ts[j].ini && ts[j].fin + (fila.holgura || 80) > ts[i].ini) return `los rotulos «${ts[i].t.texto}» y «${ts[j].t.texto}» se pisan`;
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
      if (t.nota !== undefined && Math.abs(d.x - (cabs[t.nota].x + anchoCab(cabs[t.nota].g) / 2)) > 1) err.push(`el rotulo «${t.texto}» no esta centrado bajo su nota`);
      if (t.grupo) {
        const c = t.grupo.map((i) => cabs[i].x + anchoCab(cabs[i].g) / 2);
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
  if ((m.count ? Number(m.count) : undefined) !== fila.num || (m.unit ? Number(m.unit) : undefined) !== fila.den || (m.sym || null) !== (fila.simbolo || null)) e.push('el MEI escribe otra cifra de compas');
  if (leido.length !== fila.compases.length) e.push(`el MEI tiene ${leido.length} compases y debian ser ${fila.compases.length}`);
  fila.compases.forEach((c, i) => {
    const l = leido[i] || [];
    if (l.length !== c.length || c.some((x, j) => !l[j] || eventoTxt(l[j]) !== eventoTxt(x) || JSON.stringify(articDe(x)) !== JSON.stringify(l[j].artic || null) || (l[j].plica || null) !== (x.plica || null) || (l[j].union || null) !== (x.union || null) || (l[j].gracia || null) !== (x.gracia || null) || (l[j].orna || null) !== (x.orna || null))) e.push(`el MEI escribe mal el compas ${i + 1}`);
    const quiere = JSON.stringify(tuplasDe(fila, i).map((t) => [t.ini, t.fin, t.num, t.numbase]).sort()), tiene = JSON.stringify(leido.length > i ? tuplasLeidas(leido, i).sort() : []);
    if (quiere !== tiene) e.push(`el MEI escribe mal los grupos de valoracion especial del compas ${i + 1}`);
    c.forEach((x, j) => { if (l[j] && (l[j].grupo >= 0) !== (x.barra !== undefined && c.filter((y) => y.barra === x.barra).length > 1)) e.push(`el MEI agrupa mal la figura ${j + 1} del compas ${i + 1}`); });
  });
  const ids = {};
  leido.forEach((c, i) => c.forEach((x, j) => { ids[x.id] = i + ',' + j; }));
  const slurQuiere = JSON.stringify((fila.slurs || []).map((x) => [x.de.join(','), x.a.join(',')]));
  const slurTiene = JSON.stringify(leido.slurs.map((x) => [ids[x.de], ids[x.a]]));
  if (slurQuiere !== slurTiene) e.push('el MEI escribe mal las ligaduras de expresion');
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
function componer(filasSvg, alt, slug, escala) {
  const hojas = filasSvg.map((s) => preparar(s, ''));
  if (hojas.length === 1) {
    const u = preparar(filasSvg[0], alt);
    if (!escala || escala === 1) return u;
    const w = Math.round(u.w * escala), h = Math.round(u.h * escala);
    return { svg: u.svg.replace(/^(<svg [^>]*?) width="\d+" height="\d+"/, `$1 width="${w}" height="${h}"`), w, h };
  }
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
  const lista = spec.filas.some((f) => f.fino) ? FINAS : SEPARACIONES;   // `fino`: imagen ancha de rotulos, que en el movil se encoge: se busca el ancho justo
  for (const sep of hayRotulos ? lista : [0.25]) {
    const rs = spec.filas.map((f, i) => construirFila(tk, f, hash(spec.filas.length > 1 ? spec.slug + '#' + i : spec.slug), tocar, soloDibujo, sep));
    const cabe = rs.every((r) => !r.motivoAncho);
    if (cabe || sep === lista[lista.length - 1] || !hayRotulos) {
      rs.forEach((r, i) => { errores.push(...r.errores.map((x) => (spec.filas.length > 1 ? `fila ${i + 1}: ` : '') + x)); filasSvg.push(r.svg); leidos.push(r.leido); });
      break;
    }
  }
  if (alt !== null) {
    const rev = REVISORES[spec.tipo];
    if (!rev) errores.push('no hay revisor del alt para el tipo ' + spec.tipo);
    else errores.push(...rev(spec, leidos, alt, melodia));
  }
  const listo = errores.length ? null : componer(filasSvg, alt || '', spec.slug, spec.escala);
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
const FINAS = Array.from({ length: 33 }, (_, i) => Math.round((0.25 + i * 0.03) * 100) / 100);
const SABOTAJES = [
  ['otra nota', (mei) => mei.replace('pname="g"', 'pname="a"'), /MEI escribe mal|esta a y|alt|melodia/i, 'compas-4-4-pulso'],
  ['sin puntillo', (mei) => mei.replace(' dots="1"', ''), /MEI escribe mal|puntillos|figuras|alt/i, 'compas-6-8-pulso'],
  ['figura de otro valor', (mei) => mei.replace('dur="4"', 'dur="2"'), /MEI escribe mal|suma|alt|plicas|cabeza/i, 'compas-4-4-pulso'],
  ['sin barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /agrupa mal|barras|corchetes/i, 'compas-6-8-subdivision'],
  ['sin acento', (mei) => mei.replace('<artic artic="acc" place="above"/>', ''), /MEI escribe mal|acentos|alt/i, 'compas-6-4-hemiolia'],
  ['otra cifra', (mei) => mei.replace('meter.count="6"', 'meter.count="3"'), /cifra/i, 'compas-6-8-pulso'],
  ['melodia distinta', (mei) => mei.replace('pname="e"', 'pname="f"'), /MEI escribe mal|melodia|esta a y/i, 'compas-4-4-melodia'],
  ['alteracion perdida', (mei) => mei.replace(' accid="s"', ''), /MEI escribe mal|alteraciones/i, 'anacrusa-famosas'],
  ['grupo sin barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /agrupa mal|barras/i, 'grupo-tresillo'],
  ['grupo de otro numero', (mei) => mei.replace('num="3"', 'num="5"'), /grupos de valoracion/i, 'grupo-tresillo'],
  ['ligadura de union perdida', (mei) => mei.replace(' tie="t"', ''), /MEI escribe mal/i, 'ligadura-union'],
  ['silencio de otro valor', (mei) => mei.replace('dur="8"', 'dur="16"'), /MEI escribe mal/i, 'silencio-corchea'],
  ['plica al reves', (mei) => mei.replace('stem.dir="up"', 'stem.dir="down"'), /MEI escribe mal/i, 'figura-negra'],
  ['bemol perdido', (mei) => mei.replace(' accid="f"', ''), /MEI escribe mal|alteraciones/i, 'alteracion-bemol'],
  ['otra articulacion', (mei) => mei.replace('artic="ten"', 'artic="stacc"'), /MEI escribe mal/i, 'tenuto'],
  ['acciaccatura sin rayita', (mei) => mei.replace('grace="unacc"', 'grace="acc"'), /MEI escribe mal/i, 'acciaccatura'],
  ['otro mordente', (mei) => mei.replace('form="upper"', 'form="lower"'), /MEI escribe mal/i, 'mordente'],
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
  ['sin corchete de grupo', (mei) => mei.replace('bracket.visible="true"', 'bracket.visible="false"'), /corchetes de grupo/, 'grupo-seisillo'],
  ['numero de grupo cambiado', (mei) => mei.replace('num="6"', 'num="5"'), /numeros de grupo dibujados/, 'grupo-seisillo'],
  ['plica hacia abajo', (mei) => mei.replace('stem.dir="up"', 'stem.dir="down"'), /plica de la nota/, 'figura-negra'],
  ['sin ligadura de union', (mei) => mei.replace(' tie="i"', ''), /ligaduras de union dibujadas/, 'ligadura-union'],
  ['sin ligadura de expresion', (mei) => mei.replace(/<slur [^>]*\/>/, ''), /ligaduras de expresion dibujadas/, 'ligadura-expresion'],
  ['silencio de otro valor', (mei) => mei.replace('dur="4"', 'dur="8"'), /silencio 1 es/, 'silencio-negra'],
  ['corchete en vez de barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /barras|corchete/, 'grupo-quintillo'],
  ['otra alteracion', (mei) => mei.replace(' accid="s"', ' accid="f"'), /alteraciones dibujadas/, 'alteracion-sostenido'],
  ['becuadro perdido', (mei) => mei.replace(' accid="n"', ''), /alteraciones dibujadas/, 'alteracion-becuadro'],
  ['articulacion encima', (mei) => mei.split('place="below"').join('place="above"'), /acentos y articulaciones/, 'marcato'],
  ['acciaccatura sin rayita', (mei) => mei.replace('grace="unacc"', 'grace="acc"'), /rayita de las notas de adorno/, 'acciaccatura'],
  ['apoyatura con rayita', (mei) => mei.replace('grace="acc"', 'grace="unacc"'), /rayita de las notas de adorno/, 'apoyatura'],
  ['otro grupeto', (mei) => mei.replace('form="upper"', 'form="lower"'), /ornamentos dibujados/, 'grupeto'],
  ['trino perdido', (mei) => mei.replace(new RegExp('<trill [^>]*/>'), ''), /ornamentos dibujados/, 'trino'],
];
// sabotajes de los DATOS: la pagina dice una cosa y el dato otra; los revisores del alt tienen que saltar
const SABOTAJES_DATOS = [
  ['rotulo cambiado', (s) => { s.filas[0].textos[1].texto = 'Fuerte'; }, /el alt dice|rotulos/, 'acentuacion-3-4'],
  ['acento donde no toca', (s) => { s.filas[0].compases[0][1].acento = true; }, /acento de la nota|MEI/, 'acentuacion-4-4'],
  ['grupos distintos', (s) => { s.filas[1].compases[0].forEach((e, i) => { e.barra = i < 2 ? 0 : i < 4 ? 1 : 2; }); }, /grupos/, 'seis-corcheas-34-vs-68'],
  ['anacrusa mas larga', (s) => { s.filas[0].compases[0].push({ key: 'g/4', d: 'q', puntillo: 0, acento: false }); s.filas[0].sumas = [32, 64, 48]; }, /anacrusa|un tiempo|suman/, 'anacrusa-compas'],
  ['numero bajo la barra', (s) => { s.filas[0].textos[1].texto = '3'; }, /numeros bajo las barras/, 'seis-corcheas-34-vs-68'],
  ['pulso de mas', (s) => { s.filas[0].compases[0].push({ key: 'b/4', d: 'q', puntillo: 0, acento: false }); }, /suma|pulsos|nota/, 'acentuacion-2-4'],
  ['silencio que el alt llama fusa', (s) => { s.filas[0].compases[0][0].d = '16'; }, /el alt dice «fusa»/, 'silencio-fusa'],
  ['figura con puntillo sin decirlo', (s) => { s.filas[0].compases[0][0].puntillo = 1; }, /no dice «con puntillo»/, 'figura-corchea'],
  ['tresillo con equivalencia equivocada', (s) => { s.filas[0].tuplets[0].numbase = 3; }, /equivale a 3:2/, 'grupo-tresillo'],
  ['cuatrillo como 4:3', (s) => { s.filas[0].tuplets[0].numbase = 3; }, /equivale a 4:6/, 'grupo-cuatrillo'],
  ['rotulo del tresillo latino', (s) => { s.filas[0].textos[2].texto = '3'; }, /rotulos|duracion en corcheas/, 'tresillo-latino'],
  ['ligadura de union entre notas distintas', (s) => { s.filas[0].compases[0][1].key = 'a/4'; }, /MISMA altura|misma nota/, 'ligadura-union'],
  ['tipo de tresillo mal rotulado', (s) => { s.filas[1].rotulo = 'de negra'; }, /el rotulo del grupo 2/, 'tipos-de-tresillo'],
  ['dosillo de cuatro figuras', (s) => { const f = s.filas[2]; f.compases[0].push({ ...f.compases[0][0] }); f.tuplets[0].fin = 2; f.tuplets[0].num = 3; }, /deberia ser de 2|dosillo/, 'tipos-de-dosillo'],
  ['alt dice becuadro', (s) => { s.filas[0].compases[0][0].key = 'g#/4'; s.filas[0].compases[0][0].becuadro = false; }, /el alt dice «becuadro»/i, 'alteracion-becuadro'],
  ['marcato como tenuto', (s) => { s.filas[0].compases[0].forEach((e) => { e.artic.tipo = 'ten'; }); }, /el alt dice «marcato»/, 'marcato'],
  ['trino sobre negra', (s) => { s.filas[0].compases[0][0].d = 'q'; }, /el trino va sobre una blanca/, 'trino'],
  ['mordente inferior mal dibujado', (s) => { s.filas[0].compases[0][0].orna = 'mordente'; }, /el ornamento dibujado es/, 'mordente-inferior'],
  ['apoyatura tachada', (s) => { s.filas[0].compases[0][0].gracia = 'unacc'; }, /la apoyatura lleva/, 'apoyatura'],
  ['realizacion del grupeto cambiada', (s) => { s.filas[0].compases[1][1].key = 'e/4'; }, /la realizacion del alt/, 'grupeto'],
  ['dosillo de tres', (s) => { const f = s.filas[0]; f.compases[0].push({ ...f.compases[0][0] }); f.tuplets[0].fin = 2; f.tuplets[0].num = 3; }, /dosillo|grupo|figuras/, 'grupo-dosillo'],
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
  for (const c of new Set(DATOS.map(carpetaDe))) fs.mkdirSync(path.join(RAIZ, SALIDA, c), { recursive: true });

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
          fs.writeFileSync(path.join(RAIZ, SALIDA, carpetaDe(im.spec), slug + '.svg'), r.listo.svg);
          hechos.set(slug, { slug, carpeta: carpetaDe(im.spec), w: r.listo.w, h: r.listo.h });
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
        const nuevo = `<img src="/${SALIDA}/${im.hecho.carpeta}/${im.hecho.slug}.svg" width="${im.hecho.w}" height="${im.hecho.h}" ${alt}${loading} decoding="async">`;
        html = html.replace(im.trozo, () => nuevo);
      }
      fs.writeFileSync(p.ruta, html);
      console.log(`escrito ${p.pag}/index.html: ${p.imgs.length} imagenes`);
    }
  }
}

if (require.main === module) main().catch((e) => { console.error('✗', e.message); process.exit(1); });
