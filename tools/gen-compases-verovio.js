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
const DATOS = [...require('./notacion/datos/compases-cifra.js'), ...require('./notacion/datos/compases-rotulados.js'), ...require('./notacion/datos/ritmo-figuras.js'), ...require('./notacion/datos/ritmo-grupos.js'), ...require('./notacion/datos/ritmo-signos.js'), ...require('./notacion/datos/ritmo-ornamentos.js'), ...require('./notacion/datos/ritmo-repeticion.js'), ...require('./notacion/datos/ritmo-frase.js'), ...require('./notacion/datos/tesituras.js'), ...require('./notacion/datos/claves.js'), ...require('./notacion/datos/grados.js')].map(aFilas);
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
/**
 * Las claves se definen por lo que SON: una clave de Sol en la linea L pone el Sol 4 en esa linea; una de Do, el Do 4; una de Fa, el Fa 3.
 * De ahi sale la nota de la linea inferior (`paso` = octava*7 + letra, con Do = 0), que es contra lo que se mide el dibujo.
 */
const REF_CLAVE = { sol: { shape: 'G', glifo: 'E050', ref: 4 * 7 + 4, texto: 'sol' }, do: { shape: 'C', glifo: 'E05C', ref: 4 * 7, texto: 'do' }, fa: { shape: 'F', glifo: 'E062', ref: 3 * 7 + 3, texto: 'fa' } };
const mkClave = (tipo, linea, nombre) => ({ shape: REF_CLAVE[tipo].shape, line: linea, glifo: REF_CLAVE[tipo].glifo, paso: REF_CLAVE[tipo].ref - 2 * (linea - 1), nombre, tipo });
const CLAVES = {
  sol: mkClave('sol', 2, 'clave de sol'),
  do1: mkClave('do', 1, 'clave de do en primera'), do2: mkClave('do', 2, 'clave de do en segunda'), do3: mkClave('do', 3, 'clave de do en tercera'), do4: mkClave('do', 4, 'clave de do en cuarta'),
  fa3: mkClave('fa', 3, 'clave de fa en tercera'), fa: mkClave('fa', 4, 'clave de fa en cuarta'),
};
CLAVES.tenor = CLAVES.do4;   // nombre antiguo (fagot y contrafagot)
const claveDe = (fila) => CLAVES[fila.clave || 'sol'];
const ACC_MEI = { 1: 's', '-1': 'f', 0: 'n', 2: 'x', '-2': 'ff' };   // OJO: «ss» en MEI son dos sostenidos juntos; el doble sostenido es «x»
const MEI_ACC = { s: 1, f: -1, n: 0, x: 2, ff: -2 };
const ACC_TXT = { 1: '#', '-1': 'b', 0: '', 2: '##', '-2': 'bb' };
const ACC_GLIFO = { 1: 'E262', '-1': 'E260', 0: 'E261', 2: 'E263', '-2': 'E264' };
// paginas con cambios sin commit de Eduardo (digitaciones): el generador no las toca salvo con --incluir-pausadas
const PAUSADAS = ['notas-de-la-trompeta', 'notas-de-la-tuba', 'notas-del-bombardino', 'notas-del-fliscorno'];
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

const ORDEN_SOSTENIDOS = 'fcgdaeb', ORDEN_BEMOLES = 'beadgcf';
/** Alteracion que la armadura da a una letra (+1 sostenido, -1 bemol, 0 ninguna). */
const altArmadura = (n, letra) => (n > 0 && ORDEN_SOSTENIDOS.slice(0, n).includes(letra) ? 1 : n < 0 && ORDEN_BEMOLES.slice(0, -n).includes(letra) ? -1 : 0);
const armaduraMEI = (n) => (n > 0 ? ` key.sig="${n}s"` : n < 0 ? ` key.sig="${-n}f"` : '');
/** Alteracion que se escribe en cada nota (regla del compas: vale hasta la barra). [compas][evento] -> 's' | 'f' | 'n' | null */
function alteraciones(fila) {
  return fila.compases.map((c) => {
    const estado = {};
    return c.map((e) => {
      if (e.silencio) return null;
      const k = parseKey(e.key), id = k.letra + k.oct;
      const vigente = id in estado ? estado[id] : altArmadura(fila.armadura || 0, k.letra);
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
      if (x.signo) ornamentos.push({ en: i, txt: `<repeatMark func="${x.signo}" startid="#${id}" place="above"/>` });
      const dur = `dur="${DUR_MEI[x.d]}"${x.puntillo ? ' dots="1"' : ''}${x.gracia ? ` grace="${x.gracia}"` : ''}`;
      if (x.silencio) return `<rest xml:id="${id}" ${dur}/>`;
      const p = parseKey(x.key), a = acc[i][j];
      return `<note xml:id="${id}" pname="${p.letra}" oct="${p.oct}" ${dur}${a ? ` accid="${a}"` : ''}${x.color ? ` color="${x.color}"` : ''}${x.plica ? ` stem.dir="${x.plica}"` : ''}${x.union ? ` tie="${x.union}"` : ''}>${articDe(x) ? `<artic artic="${articDe(x).tipo}" place="${articDe(x).lugar}"/>` : ''}</note>`;
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
    const b = (fila.barras || [])[i] || {};
    const izq = i === 0 && b.ini === 'rpt' ? ' left="rptstart"' : '';
    const derB = b.fin === 'rpt' ? ' right="rptend"' : b.fin === 'end' ? ' right="end"' : ultimo ? (fila.sinBarraFinal ? ' right="invis"' : fila.barraFinal === 'end' ? ' right="end"' : '') : '';
    const der = izq + derB;
    const incompleto = total && c.length && duracionBarra(fila, i) !== total ? ' metcon="false"' : '';
    return { i, der, incompleto, texto, casilla: b.casilla };
  });
  // ligaduras de expresion: eventos de control que apuntan a las notas
  const slurs = (fila.slurs || []).map((s) => ({ en: s.de[0], txt: `<slur startid="#${ids[s.de.join(',')]}" endid="#${ids[s.a.join(',')]}" curvedir="${s.curva || 'above'}"/>` }));
  const medidas = ms.map((m) => {
    const medida = `<measure n="${m.i + 1}"${m.der}${m.incompleto}><staff n="1"><layer n="1">${m.texto}</layer></staff>${slurs.filter((s) => s.en === m.i).map((s) => s.txt).join('')}${ornamentos.filter((o) => o.en === m.i).map((o) => o.txt).join('')}</measure>`;
    return m.casilla ? `<ending xml:id="casilla${m.i}" n="${m.casilla.n}" label="${m.casilla.label}">${medida}</ending>` : medida;
  }).join('');
  const metro = !fila.num ? '' : fila.simbolo ? ` meter.count="${fila.num}" meter.unit="${fila.den}" meter.sym="${fila.simbolo}"` : ` meter.count="${fila.num}" meter.unit="${fila.den}"`;
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="${claveDe(fila).shape}" clef.line="${claveDe(fila).line}"${armaduraMEI(fila.armadura || 0)}${metro}/></staffGrp></scoreDef><section>${medidas}</section></score></mdiv></body></music></mei>`;
}

/**
 * Lee el MEI como lo leeria un musico: por compas, [{id, silencio, key, d, puntillo, acento, grupo, plica, union, tupla}]
 * (grupo = n.º de <beam> o -1; tupla = n.º de <tuplet> o -1). El array lleva ademas .tuplas ([{num, numbase}]) y .slurs ([{de, a}] por id).
 */
function leerMEI(mei) {
  const ks = /key\.sig="(\d)([sf])"/.exec(mei);
  const armadura = ks ? (ks[2] === 's' ? 1 : -1) * Number(ks[1]) : 0;
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
      evs.push({ ...base, key: a('pname') + ACC_TXT[id in estado ? estado[id] : altArmadura(armadura, a('pname'))] + '/' + a('oct'), artic: /<artic /.test(t) ? { tipo: (/artic artic="(\w+)"/.exec(t) || [])[1], lugar: (/place="(\w+)"/.exec(t.slice(t.indexOf('<artic'))) || [])[1] } : null, acento: /artic="acc"/.test(t), plica: a('stem.dir'), union: a('tie'), gracia: a('grace'), color: a('color') });
    }
    // ornamentos: eventos de control que apuntan a una nota (startid)
    for (const c of m.match(/<(?:mordent|turn|trill) [^>]*\/>/g) || []) {
      const at = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(c) || [])[1];
      const ev = evs.find((e) => '#' + e.id === at('startid'));
      if (ev) ev.orna = ornaLeida(/^<(\w+)/.exec(c)[1], at('form'), at('glyph.name'));
    }
    for (const c of m.match(/<repeatMark [^>]*\/>/g) || []) {
      const at = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(c) || [])[1];
      const ev = evs.find((e) => '#' + e.id === at('startid'));
      if (ev) ev.signo = at('func');
    }
    compases.push(evs);
  }
  // barras de repeticion y casillas (<ending> que envuelve a un compas)
  compases.barras = [];
  let casilla = null;
  for (const t of mei.match(/<ending [^>]*>|<\/ending>|<measure [^>]*>/g) || []) {
    if (t.startsWith('<ending')) casilla = (/\bn="([^"]*)"/.exec(t) || [])[1] + '|' + (/label="([^"]*)"/.exec(t) || [])[1];
    else if (t === '</ending>') casilla = null;
    else compases.barras.push({ ini: /left="rptstart"/.test(t), fin: (/right="(\w+)"/.exec(t) || [])[1] || null, casilla });
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

const NOMBRE_NOTA = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
/** La clave que dice el alt («Clave de Sol», «clave de do en 3ª», «Símbolo de la clave de Fa en 4ª línea») contra la del dibujo. */
function revisarClaveDeAlt(fila, alt) {
  const m = /[Cc]lave de (Sol|Do|Fa|do|fa|sol)(?: en (\d)ª)?/.exec(alt);
  if (!m) return ['el alt no nombra la clave'];
  const tipo = m[1].toLowerCase();
  const linea = m[2] ? Number(m[2]) : tipo === 'sol' ? 2 : tipo === 'fa' ? 4 : null;
  const c = CLAVES[fila.clave || 'sol'];
  const err = [];
  if (c.tipo !== tipo) err.push(`el alt habla de la clave de ${tipo} y el dibujo es ${c.nombre}`);
  else if (linea && c.line !== linea) err.push(`el alt habla de la clave de ${tipo} en ${linea}.ª linea y el dibujo la lleva en la ${c.line}.ª`);
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
  'nombres-notas'(spec, leido, alt) {
    const err = [], f = spec.filas[0], evs = leido[0].flat();
    err.push(...revisarClaveDeAlt(f, alt));
    if (evs.map((e) => e.key[0]).join('') !== 'cdefgabc') err.push('deberia ser la escala de Do: do re mi fa sol la si do');
    // el primer Do: el Do central en las claves de Sol y de Do; el de una octava mas grave en las de Fa
    const octava = CLAVES[f.clave].tipo === 'fa' ? 3 : 4;
    if (evs[0].key !== 'c/' + octava || evs[7].key !== 'c/' + (octava + 1)) err.push(`la escala deberia ir de Do${octava} a Do${octava + 1} en ${CLAVES[f.clave].nombre}`);
    evs.forEach((e, i) => { if (!f.textos[i] || f.textos[i].texto !== NOMBRE_NOTA[e.key[0]]) err.push(`el rotulo de la nota ${i + 1} no es su nombre (${NOMBRE_NOTA[e.key[0]]})`); });
    evs.forEach((e, i) => { if (i && pasoDe(e.key) !== pasoDe(evs[i - 1].key) + (e.key[0] === 'c' && i === 7 ? 1 : 1)) err.push('las notas tienen que subir de grado en grado'); });
    return err;
  },
  'clave-glifo'(spec, leido, alt) {
    const err = [], f = spec.filas[0];
    err.push(...revisarClaveDeAlt(f, alt));
    if (leido[0].flat().length) err.push('el glifo de la clave va solo, sin notas');
    return err;
  },
  'notas-clave'(spec, leido, alt) {
    const err = [], f = spec.filas[0], evs = leido[0].flat();
    err.push(...revisarClaveDeAlt(f, alt));
    const lista = (alt.split(':')[1] || '').split(/,| y /).map((x) => x.trim()).filter(Boolean);
    if (lista.length !== 9 || evs.length !== 9) err.push('la clave lleva nueve notas: las cinco lineas y los cuatro espacios mas el de encima');
    if (lista.join('|') !== evs.map((e) => NOMBRE_NOTA[e.key[0]]).join('|')) err.push(`el alt dice ${lista.join(', ')} y el dibujo ${evs.map((e) => NOMBRE_NOTA[e.key[0]]).join(', ')}`);
    if (lista.join('|') !== f.textos.map((t) => t.texto).join('|')) err.push('los rotulos no son los nombres que dice el alt');
    if (evs[0] && pasoDe(evs[0].key) !== CLAVES[f.clave].paso) err.push('la primera nota deberia ser la de la linea inferior del pentagrama');
    evs.forEach((e, i) => { if (i && pasoDe(e.key) !== pasoDe(evs[i - 1].key) + 1) err.push('las notas tienen que subir de grado en grado (linea, espacio, linea...)'); });
    const APODO = { viola: 3, soprano: 1, mezzosoprano: 2, tenor: 4 };
    const ap = /\((viola|soprano|mezzosoprano|tenor)\)/.exec(alt);
    if (ap && CLAVES[f.clave].line !== APODO[ap[1]]) err.push(`el alt dice «${ap[1]}» (clave de do en ${APODO[ap[1]]}.ª) y el dibujo es otra`);
    return err;
  },
  'lineas-adicionales'(spec, leido, alt) {
    const err = [], f = spec.filas[0], evs = leido[0].flat();
    err.push(...revisarClaveDeAlt(f, alt));
    const SUBS = '₀₁₂₃₄₅₆₇₈₉';
    const notas = (txt) => [...txt.matchAll(/(Do|Re|Mi|Fa|Sol|La|Si)([₀-₉])/g)].map((m) => ({ nombre: m[0], letra: Object.keys(NOMBRE_NOTA).find((k) => NOMBRE_NOTA[k] === m[1]), oct: SUBS.indexOf(m[2]) }));
    // el alt reparte las notas en: «por debajo del pentagrama», «en la primera línea», «en la quinta línea» y «por encima»
    const trozos = (alt.split(':').slice(1).join(':')).split(';').map((x) => x.trim());
    const grupos = { debajo: [], primera: [], quinta: [], encima: [] };
    for (const t of trozos) {
      const clase = /por debajo del pentagrama/.test(t) ? 'debajo' : /en la primera línea/.test(t) ? 'primera' : /en la quinta línea/.test(t) ? 'quinta' : /por encima/.test(t) ? 'encima' : null;
      if (!clase) return ['el alt ya no reparte las notas en «por debajo / primera línea / quinta línea / por encima»'];
      grupos[clase].push(...notas(t));
    }
    const base = CLAVES[f.clave].paso, tope = base + 8;
    const clasifica = (e) => { const q = pasoDe(e.key); return q < base ? 'debajo' : q === base ? 'primera' : q > tope ? 'encima' : q === tope ? 'quinta' : 'dentro'; };
    const aKey = (n) => n.letra + '/' + n.oct;
    for (const clase of ['debajo', 'primera', 'quinta', 'encima']) {
      const dibujo = evs.filter((e) => clasifica(e) === clase).map((e) => e.key);
      if (grupos[clase].map(aKey).join() !== dibujo.join()) err.push(`el alt dice ${clase} = [${grupos[clase].map((n) => n.nombre).join(', ')}] y en el dibujo hay [${dibujo.join(', ')}]`);
    }
    if (evs.some((e) => clasifica(e) === 'dentro')) err.push('hay una nota dentro del pentagrama que el alt no menciona');
    const debajo = grupos.debajo, encima = grupos.encima;
    void debajo; void encima;
    const todas = [...grupos.debajo, ...grupos.primera, ...grupos.quinta, ...grupos.encima].sort((x, y) => (x.oct * 7 + 'cdefgab'.indexOf(x.letra)) - (y.oct * 7 + 'cdefgab'.indexOf(y.letra)));
    const rotulos = f.textos.map((t) => t.texto).join();
    if (rotulos !== todas.map((n) => n.nombre).join()) err.push('los rotulos no son los nombres (con su octava) que dice el alt');
    return err;
  },
  'equivalencia-claves'(spec, leido, alt) {
    const err = [];
    if (!/siete claves/.test(alt) || spec.filas.length !== 7) err.push('son siete claves');
    const ORDEN = ['sol', 'do1', 'do2', 'do3', 'do4', 'fa3', 'fa'];
    const TIPO = { sol: 'Sol', do: 'Do', fa: 'Fa' };
    spec.filas.forEach((f, i) => {
      if (f.clave !== ORDEN[i]) err.push(`la clave ${i + 1} deberia ser ${ORDEN[i]}`);
      const ev = leido[i].flat();
      if (ev.length !== 1 || ev[0].key !== 'c/4') err.push(`la clave ${i + 1} lleva un solo Do central (Do4)`);
      const c = CLAVES[f.clave];
      if (f.textos[0].texto !== `${TIPO[c.tipo]} en ${c.line}ª`) err.push(`el rotulo de la clave ${i + 1} deberia ser «${TIPO[c.tipo]} en ${c.line}ª»`);
    });
    if (!/clave de Sol en 2ª, Do en 1ª, 2ª, 3ª y 4ª, y Fa en 3ª y 4ª/.test(alt)) err.push('el alt ya no enumera las claves en ese orden');
    return err;
  },
  grados(spec, leido, alt) {
    const err = [], f = spec.filas[0], evs = leido[0].flat();
    const gm = /Grados (tonales|modales)/.exec(alt), mm = /modo (mayor|menor)/.exec(alt);
    if (!gm || !mm) return ['el alt tiene que decir «Grados tonales/modales … en modo mayor/menor»'];
    if (gm[1] !== spec.grupo || mm[1] !== spec.modo) err.push(`el alt habla de ${gm[1]} en modo ${mm[1]} y la imagen es de ${spec.grupo} en modo ${spec.modo}`);
    // la escala: tonica Do y distancias de la escala mayor o menor natural, medidas en semitonos (no con una tabla de alturas del dibujo)
    const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
    const semis = (key) => { const k = parseKey(key); return (k.oct + 1) * 12 + PC[k.letra] + k.alt; };
    const pasos = evs.slice(1).map((e, i) => semis(e.key) - semis(evs[i].key)).join();
    const quiere = spec.modo === 'mayor' ? '2,2,1,2,2,2,1' : '2,1,2,2,1,2,2';
    if (evs.length !== 8 || evs[0].key !== 'c/4' || pasos !== quiere) err.push(`la escala de Do ${spec.modo} tiene los pasos ${quiere} y el dibujo ${pasos}`);
    // la armadura: tantas alteraciones como notas alteradas tiene la escala
    const alteradas = new Set(evs.slice(0, 7).filter((e) => parseKey(e.key).alt !== 0).map((e) => parseKey(e.key).letra)).size;
    if (Math.abs(f.armadura || 0) !== alteradas || (spec.modo === 'menor') !== ((f.armadura || 0) < 0)) err.push(`la armadura (${f.armadura || 0}) no corresponde a las ${alteradas} notas alteradas de la escala`);
    // los grados en rojo: tonales I IV V, modales III VI VII
    const rojos = evs.map((e, i) => (e.color ? i : -1)).filter((i) => i >= 0).join();
    if (rojos !== (spec.grupo === 'tonales' ? '0,3,4' : '2,5,6')) err.push(`los grados en rojo deberian ser ${spec.grupo === 'tonales' ? 'I, IV y V' : 'III, VI y VII'}`);
    const ROM = { I: 0, IV: 3, V: 4, III: 2, VI: 5, VII: 6 };
    const enAlt = [...alt.matchAll(/\((I|II|III|IV|V|VI|VII)\)/g)].map((x) => ROM[x[1]]).sort().join();
    if (enAlt && enAlt !== rojos.split(',').map(Number).sort().join()) err.push(`el alt nombra los grados ${enAlt} y el dibujo pinta ${rojos}`);
    if (f.textos.map((t) => t.texto).join(' ') !== 'I II III IV V VI VII I') err.push('los rotulos deberian ser los numeros romanos I a VII y otra vez I');
    return err;
  },
  tesitura(spec, leido, alt, melodia, leyenda) {
    const err = [], f = spec.filas[0], evs = leido[0].flat();
    const NOTAS = { Do: 'c', Re: 'd', Mi: 'e', Fa: 'f', Sol: 'g', La: 'a', Si: 'b' };
    const SUB = '₀₁₂₃₄₅₆₇₈₉';
    const notaDe = (m) => NOTAS[m[1]] + (m[2] === ' sostenido' ? '#' : m[2] === ' bemol' ? 'b' : '') + '/' + (SUB.includes(m[3]) ? SUB.indexOf(m[3]) : m[3]);
    const rx = /(Do|Re|Mi|Fa|Sol|La|Si)( bemol| sostenido)? ?([0-9₀-₉])/g;
    const [d0, d1] = [...alt.matchAll(rx)].map(notaDe);
    if (!d0) return ['el alt no nombra ninguna nota con su octava'];
    if (evs.length !== 2 || evs.some((e) => e.d !== 'w')) err.push('un registro se dibuja con dos redondas: la mas grave y la mas aguda');
    else {
      if (evs[0].key !== d0) err.push(`el alt dice que el registro empieza en ${d0} y el dibujo en ${evs[0].key}`);
      if (/por encima de/.test(alt)) { if (pasoDe(evs[1].key) <= pasoDe(evs[0].key)) err.push('el registro «por encima de» sube'); }
      else if (!d1 || evs[1].key !== d1) err.push(`el alt dice que el registro acaba en ${d1} y el dibujo en ${evs[1].key}`);
      if (pasoDe(evs[1].key) <= pasoDe(evs[0].key)) err.push('la nota aguda tiene que estar por encima de la grave');
    }
    const clave = /clave de do en cuarta/.test(alt) ? 'tenor' : /clave de fa/.test(alt) ? 'fa' : 'sol';
    if ((f.clave || 'sol') !== clave) err.push(`el alt habla de ${CLAVES[clave].nombre} y el dibujo lleva ${CLAVES[f.clave || 'sol'].nombre}`);
    // la leyenda de la pagina (figcaption «Chalumeau (Mi♭₃–Fa♯₄)» o la celda «Rango» de la tabla) tiene que decir las mismas notas
    if (leyenda) {
      const SIGNO = { '♯': '#', '♭': 'b', '': '' };
      const ns = [...leyenda.matchAll(/(Do|Re|Mi|Fa|Sol|La|Si)([♭♯]?)([₀-₉])/g)].map((x) => NOTAS[x[1]] + SIGNO[x[2]] + '/' + SUB.indexOf(x[3]));
      if (ns.length && evs.length === 2) {
        if (ns[0] !== evs[0].key) err.push(`la leyenda de la pagina dice que empieza en ${ns[0]} y el dibujo en ${evs[0].key}`);
        if (ns.length > 1 && !/por encima de/.test(alt) && ns[1] !== evs[1].key) err.push(`la leyenda de la pagina dice que acaba en ${ns[1]} y el dibujo en ${evs[1].key}`);
      }
    }
    const REGISTRO = { grave: /grave/, medio: /medio/, agudo: /agudo/, sobreagudo: /sobreagudo/, chalumeau: /chalumeau/, garganta: /garganta/, clarin: /clar[ií]n/ };
    const registro = spec.registro;
    const otrosAgudos = registro === 'agudo' && /sobreagudo/.test(alt);
    if (!REGISTRO[registro] || !REGISTRO[registro].test(alt) || otrosAgudos) err.push(`el alt no habla del registro ${registro}`);
    return err;
  },
  frase(spec, leido, alt) {
    const err = [];
    const total = (f) => f.num * (64 / f.den);
    const suma = (c) => c.reduce((a, e) => a + durTotal(e), 0);
    // tipo de comienzo segun CUANDO entra la musica (no segun si el compas esta completo)
    const comienzo = (f, l) => (suma(l[0]) < total(f) ? 'anacrusico' : l[0][0].silencio ? 'acefalo' : 'tetico');
    // el final es fuerte si la ultima nota EMPIEZA en el primer tiempo de su compas
    const final = (f, l) => { const c = l[l.length - 1]; return suma(c.slice(0, -1)) === 0 ? 'fuerte' : 'debil'; };
    const sinTilde = (t) => sinTildes(t);
    if (spec.slug === 'comienzo-comparativa') {
      const orden = ['tetico', 'anacrusico', 'acefalo'];
      if (spec.filas.length !== 3) err.push('la comparativa tiene tres filas');
      spec.filas.forEach((f, i) => {
        if (comienzo(f, leido[i]) !== orden[i]) err.push(`la fila ${i + 1} deberia ser un comienzo ${orden[i]} y es ${comienzo(f, leido[i])}`);
        if (!sinTilde(f.rotulo).startsWith(orden[i])) err.push(`el rotulo de la fila ${i + 1} deberia empezar por «${orden[i]}»`);
      });
      const pos = orden.map((o) => sinTilde(alt).indexOf(o));
      if (pos.some((x) => x < 0) || !(pos[0] < pos[1] && pos[1] < pos[2])) err.push('el alt deberia hablar de tetico, anacrusico y acefalo, por ese orden');
      return err;
    }
    const f = spec.filas[0], l = leido[0];
    if (f.num !== 4 || f.den !== 4) err.push('los ejemplos de frase van en 4/4');
    const m = /^Comienzo (tético|anacrúsico|acéfalo)/.exec(alt);
    if (m) {
      const quiere = sinTilde(m[1]);
      if (comienzo(f, l) !== quiere) err.push(`el alt dice comienzo ${quiere} y el dibujo es ${comienzo(f, l)}`);
      if (quiere === 'anacrusico' && (l[0].length !== 1 || !/una nota de anacrusa/.test(alt))) err.push('el comienzo anacrusico del ejemplo lleva UNA nota de anacrusa');
      if (quiere === 'acefalo' && !(l[0][0].silencio && /un silencio ocupa el tiempo fuerte/.test(alt))) err.push('el comienzo acefalo empieza con un silencio en el tiempo fuerte');
      if (quiere === 'tetico' && (l[0][0].silencio || !/primer tiempo fuerte de un compás de 4\/4/.test(alt))) err.push('el comienzo tetico suena en el primer tiempo fuerte');
      return err;
    }
    const fm = /^Final en tiempo (fuerte|débil)/.exec(alt);
    if (fm) {
      const quiere = sinTilde(fm[1]);
      if (final(f, l) !== quiere) err.push(`el alt dice final en tiempo ${quiere} y la ultima nota empieza en el tiempo ${final(f, l)}`);
      const ultima = l[l.length - 1][l[l.length - 1].length - 1];
      if (quiere === 'fuerte' && (ultima.d !== 'w' || !/una redonda/.test(alt))) err.push('el final en tiempo fuerte termina en una redonda');
      if (ultima.silencio) err.push('la frase termina en una nota, no en un silencio');
      return err;
    }
    return ['el alt no empieza como un comienzo ni como un final conocido'];
  },
  repeticion(spec, leido, alt) {
    const err = [], f = spec.filas[0], l = leido[0], b = l.barras, evs = l.flat();
    if (f.num !== 4 || f.den !== 4) err.push('los ejemplos de repeticion van en 4/4');
    if (spec.slug === 'repeticion-barras') {
      if (!/barra de repetici[oó]n de apertura y otra de cierre/.test(alt)) err.push('el alt ya no habla de una barra de apertura y otra de cierre');
      const dos = /^Dos compases/.test(alt) ? 2 : 0;
      if (l.length !== dos) err.push(`el alt dice ${dos} compases y hay ${l.length}`);
      if (!b[0].ini || b[l.length - 1].fin !== 'rptend' || b.slice(0, -1).some((x) => x.fin === 'rptend')) err.push('deberia haber una barra de apertura al principio y una de cierre al final, y ninguna mas');
    } else if (spec.slug === 'repeticion-casillas') {
      if (!/Un compás común y dos casillas/.test(alt) || l.length !== 3) err.push('el alt habla de un compas comun y dos casillas (3 compases)');
      if (b[0].casilla || b[0].fin) err.push('el primer compas es comun: sin casilla ni repeticion');
      if (b[1].casilla !== '1|1.' || b[1].fin !== 'rptend' || !/la 1\.ª con barra de repetición/.test(alt)) err.push('la 1.ª casilla lleva la barra de repeticion');
      if (b[2].casilla !== '2|2.' || b[2].fin !== 'end' || !/la 2\.ª como final/.test(alt)) err.push('la 2.ª casilla es la final');
    } else if (spec.slug === 'repeticion-dc-fine') {
      if (!/palabra Fine sobre un compás y D\.C\. al Fine al final/.test(alt)) err.push('el alt ya no habla de Fine sobre un compas y D.C. al Fine al final');
      const [fine, dc] = f.textos;
      if (fine.texto !== 'Fine' || dc.texto !== 'D.C. al Fine') err.push('los rotulos deberian ser «Fine» y «D.C. al Fine»');
      if (fine.finDeCompas >= l.length - 1 || dc.finDeCompas !== l.length - 1) err.push('«Fine» va sobre un compas intermedio y «D.C. al Fine» al final de la partitura');
      if (evs.some((e) => e.signo)) err.push('no lleva segno ni coda');
    } else if (spec.slug === 'repeticion-segno-coda') {
      if (!/signo \(segno\), la marca To Coda, D\.S\. al Coda y la sección Coda/.test(alt)) err.push('el alt ya no describe segno, To Coda, D.S. al Coda y la Coda');
      // la partitura se lee de arriba abajo: todos los compases de todas las filas, en orden
      const barrasTodas = leido.flatMap((x) => x.map((c) => c));
      const posiciones = [];
      barrasTodas.forEach((c, i) => c.forEach((e, j) => { if (e.signo) posiciones.push([i, j, e.signo]); }));
      if (posiciones.map((x) => x[2]).join() !== 'segno,coda,coda,coda') err.push('deberia haber un segno y tres codas (To Coda, D.S. al Coda y la Coda)');
      const textos = spec.filas.flatMap((x) => x.textos.map((t) => t.texto)).join('|');
      if (textos !== 'To|D.S. al|Coda') err.push('los rotulos deberian ser To, D.S. al y Coda');
      if (posiciones[0][0] !== 0 || posiciones[0][1] !== 0) err.push('el segno va al principio de la partitura');
      if (posiciones[3][0] !== barrasTodas.length - 1 || posiciones[3][1] !== 0) err.push('la seccion Coda empieza en el ultimo compas');
      if (!(posiciones[1][0] < posiciones[2][0] && posiciones[2][0] < posiciones[3][0])) err.push('el orden deberia ser: To Coda, luego D.S. al Coda y por ultimo la Coda');
      // cada rotulo esta pegado al signo que le toca: To -> la 1.ª coda; D.S. al -> la 2.ª; Coda -> la 3.ª
      const sigFila = leido.map((x) => x.flat().filter((e) => e.signo));
      const t1 = spec.filas[0].textos[0], t2 = spec.filas[1].textos[0], t3 = spec.filas[1].textos[1];
      if (!(sigFila[0][t1.antesDeSigno] && sigFila[0][t1.antesDeSigno].signo === 'coda' && sigFila[1][t2.antesDeSigno] && sigFila[1][t2.antesDeSigno].signo === 'coda' && sigFila[1][t3.despuesDeSigno] && sigFila[1][t3.despuesDeSigno].signo === 'coda' && t2.antesDeSigno === 0 && t3.despuesDeSigno === 1)) err.push('los rotulos To, D.S. al y Coda tienen que ir junto a su coda');
    } else err.push('repeticion desconocida');
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
  const marcas = [...svg.matchAll(/<g id="(n\d+)" class="(note|rest)"([^>]*)>/g)];
  return marcas.map((m, i) => {
    const trozo = svg.slice(m.index, i + 1 < marcas.length ? marcas[i + 1].index : svg.length);
    const d = { id: Number(m[1].slice(1)), tipo: m[2], color: (/color="([^"]+)"/.exec(m[3]) || [])[1] };
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
const lineas = (svg) => {
  // las 5 lineas del pentagrama: horizontales de trazo 13, a distancia ESPACIO una de otra (el corchete de una casilla tambien es horizontal y de trazo 13)
  const ys = [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);
  const y0 = ys.find((y) => [1, 2, 3, 4].every((k) => ys.includes(y + k * ESPACIO)));
  return y0 === undefined ? ys : [0, 1, 2, 3, 4].map((k) => y0 + k * ESPACIO);
};

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
  if (JSON.stringify(claves) !== JSON.stringify([claveDe(fila).glifo])) err.push('clave dibujada ' + JSON.stringify(claves) + ', prevista ' + claveDe(fila).nombre + ' (' + claveDe(fila).glifo + ')');
  const yClave = (/class="clef"[\s\S]{0,300}?href="#E0[0-9A-F]+[^>]*translate\([\d.]+, ([\d.]+)\)/.exec(svg) || [])[1];
  const lsC = lineas(svg);
  if (lsC.length === 5 && Number(yClave) !== lsC[5 - claveDe(fila).line]) err.push(`la clave esta a y=${yClave} y deberia estar en la linea ${claveDe(fila).line} (y=${lsC[5 - claveDe(fila).line]})`);
  const kn = fila.armadura || 0;
  const kAcc = [...svg.matchAll(/class="keyAccid"[\s\S]{0,200}?href="#(E2[0-9A-F]+)/g)].map((x) => x[1]);
  if (JSON.stringify(kAcc) !== JSON.stringify(Array(Math.abs(kn)).fill(kn > 0 ? 'E262' : 'E260'))) err.push(`armadura dibujada ${JSON.stringify(kAcc)}, prevista de ${Math.abs(kn)} ${kn > 0 ? 'sostenidos' : 'bemoles'}`);
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
      if ((d.color || null) !== (e.color || null)) err.push(`la nota ${k + 1} ${e.color ? 'deberia ir en ' + e.color : 'no deberia llevar color'} y lleva ${d.color || 'ninguno'}`);
      const quiere = ls[4] - (pasoDe(e.key) - claveDe(fila).paso) * PASO_Y;
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
  // lineas adicionales: una por cada nota y por cada linea que se sale del pentagrama (arriba o abajo)
  const abajoP = claveDe(fila).paso, arribaP = abajoP + 8;
  const quiereAdic = evs.filter((e) => !e.silencio).reduce((a, e) => { const q = pasoDe(e.key); return a + (q > arribaP ? Math.floor((q - arribaP) / 2) : 0) + (q < abajoP ? Math.floor((abajoP - q) / 2) : 0); }, 0);
  if (cuenta(svg, /stroke-width="22"/g) !== quiereAdic) err.push(`${cuenta(svg, /stroke-width="22"/g)} lineas adicionales dibujadas, debian ser ${quiereAdic}`);
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
  // barras de compas, de izquierda a derecha: {trazos, puntos}. Las invisibles salen como <g class="barLine"/> vacio;
  // «final» lleva dos trazos y la de repeticion dos trazos y dos puntos.
  const ultimo = fila.compases.length - 1;
  const quiereBarras = [];
  fila.compases.forEach((_, i) => {
    const b = (fila.barras || [])[i] || {};
    if (i === 0 && b.ini === 'rpt') quiereBarras.push({ trazos: 2, puntos: 2 });
    if (i === ultimo && fila.sinBarraFinal && !b.fin) return;
    quiereBarras.push(b.fin === 'rpt' ? { trazos: 2, puntos: 2 } : (b.fin === 'end' || (i === ultimo && fila.barraFinal === 'end')) ? { trazos: 2, puntos: 0 } : { trazos: 1, puntos: 0 });
  });
  const dibBarras = [...svg.matchAll(/class="barLine">\s*((?:<(?:path|use)[^>]*\/>\s*)+)/g)]
    .map((m) => ({ x: Number((/M(\d+) /.exec(m[1]) || [])[1]), trazos: (m[1].match(/<path/g) || []).length, puntos: (m[1].match(/<use /g) || []).length }))
    .sort((u, v) => u.x - v.x).map((m) => ({ trazos: m.trazos, puntos: m.puntos }));
  if (JSON.stringify(dibBarras) !== JSON.stringify(quiereBarras)) err.push(`barras de compas ${JSON.stringify(dibBarras)}, previstas ${JSON.stringify(quiereBarras)}`);
  // signos de repeticion (segno, coda): el glifo de cada uno, en orden, y por encima del pentagrama
  const quiereSignos = evs.filter((e) => e.signo).map((e) => (e.signo === 'segno' ? 'E047' : 'E048'));
  const dibSignos = signosDibujados(svg);
  if (JSON.stringify(dibSignos.map((x) => x.glifo)) !== JSON.stringify(quiereSignos)) err.push(`signos de repeticion dibujados ${JSON.stringify(dibSignos.map((x) => x.glifo))}, previstos ${JSON.stringify(quiereSignos)}`);
  else if (ls.length === 5 && dibSignos.some((x) => x.y >= ls[0])) err.push('un signo de repeticion no esta encima del pentagrama');
  // casillas (voltas): una por compas con casilla, con su corchete
  const casillas = (fila.barras || []).filter((b) => b.casilla);
  if (cuenta(svg, /class="ending /g) !== casillas.length || cuenta(svg, /class="voltaBracket"/g) !== casillas.length) err.push(`casillas dibujadas ${cuenta(svg, /class="ending /g)}, previstas ${casillas.length}`);
  const etiquetas = [...svg.matchAll(/class="labelAttr">([^<]*)</g)].map((m) => m[1]);
  if (JSON.stringify(etiquetas) !== JSON.stringify(casillas.map((b) => b.casilla.label))) err.push(`numeros de casilla ${JSON.stringify(etiquetas)}, previstos ${JSON.stringify(casillas.map((b) => b.casilla.label))}`);
  return err;
}

/* ---------- rotulos encima del dibujo ---------- */
function textosDeFila(fila) { return (fila.rotulo ? [{ texto: fila.rotulo, ref: 'arriba', izq: true }] : []).concat(fila.textos || []); }

/** Distancias (en unidades del dibujo) del pentagrama al borde de arriba y de abajo de la imagen. */
function medidasDe(svg) {
  const ls = lineas(svg);
  const m = /<svg class="definition-scale"[^>]*viewBox="0 (-?\d+) \d+ (\d+)"/.exec(svg);
  return { top: ls[0] - Number(m[1]), bot: Number(m[1]) + Number(m[2]) - ls[4] };
}
/** Ensancha el borde de arriba / de abajo hasta que el pentagrama quede a las distancias del marco (multiplos de 25). */
function conMarco(svg, marco) {
  const m = /(<svg class="definition-scale"[^>]*viewBox="0 )(-?\d+)( \d+ )(\d+)(")/.exec(svg);
  const { top, bot } = medidasDe(svg);
  const dTop = Math.ceil(Math.max(0, marco.top - top) / 25) * 25, dBot = Math.ceil(Math.max(0, marco.bot - bot) / 25) * 25;
  if (!dTop && !dBot) return svg;
  let s2 = svg.replace(m[0], m[1] + (Number(m[2]) - dTop) + m[3] + (Number(m[4]) + dTop + dBot) + m[5]);
  s2 = s2.replace(/^(<svg viewBox="0 0 \d+ )(\d+)(")/, (x, a, h, c) => a + (Number(h) + (dTop + dBot) / 25) + c);
  return s2;
}

/** Signos de repeticion dibujados por Verovio (segno/coda), de izquierda a derecha: [{glifo, x, y}]. */
function signosDibujados(svg) {
  return [...svg.matchAll(/class="repeatMark">\s*<use [^>]*href="#(E04[78])[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g)].map((m) => ({ glifo: m[1], x: Number(m[2]), y: Number(m[3]) })).sort((u, v) => u.x - v.x);
}
/** El signo n-esimo (por orden de aparicion en los eventos) de la fila. */
const signoDe = (svg, fila, n) => signosDibujados(svg)[n];
/** x de las barras de compas visibles (la mas a la derecha de cada una), de izquierda a derecha. */
function barrasX(svg) {
  return [...svg.matchAll(/class="barLine">\s*((?:<path[^>]*\/>\s*)+)/g)].map((m) => Math.max(...[...m[1].matchAll(/M(\d+) /g)].map((x) => Number(x[1])))).sort((u, v) => u - v);
}
/** x de la barra que cierra el compas n (se salta la barra de repeticion inicial si la hay). */
const barraDe = (svg, fila, n) => barrasX(svg)[n + (((fila.barras || [])[0] || {}).ini === 'rpt' ? 1 : 0)];

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
    else if (t.antesDeSigno !== undefined) x = signoDe(svg, fila, t.antesDeSigno).x - (t.hueco || 70);
    else if (t.despuesDeSigno !== undefined) x = signoDe(svg, fila, t.despuesDeSigno).x + ANCHO_SIGNO + (t.hueco || 60);
    else if (t.finDeCompas !== undefined) x = barraDe(svg, fila, t.finDeCompas) - (t.hueco || 100);
    else if (t.grupo) { const xs = t.grupo.map((i) => cabs[i].x + ancho(cabs[i])); x = Math.round(xs.reduce((a, b) => a + b, 0) / xs.length); }
    else x = Math.round(cabs[t.nota].x + ancho(cabs[t.nota]));
    const y = t.antesDeSigno !== undefined ? signoDe(svg, fila, t.antesDeSigno).y + (t.dy || 0) : t.despuesDeSigno !== undefined ? signoDe(svg, fila, t.despuesDeSigno).y + (t.dy || 0) : t.ref === 'arriba' ? yTop - (t.dy || 640) : t.ref === 'pie' ? Math.max(yBot, ...cabs.map((c) => c.y)) + (t.dy || 750) : yBot + (t.dy || 850);
    if (t.ref === 'arriba') arriba = Math.min(arriba, y - 300); else abajo = Math.max(abajo, y);
    return `<text x="${x}" y="${y}"${t.familia ? ` font-family="${t.familia}"` : ''}${t.peso ? ` font-weight="${t.peso}"` : ''} text-anchor="${(t.izq || t.despuesDeSigno !== undefined) ? 'start' : (t.antesDeSigno !== undefined || t.finDeCompas !== undefined) ? 'end' : 'middle'}"${t.size ? ` font-size="${t.size}"` : ''}>${escAttr(t.texto)}</text>`;
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
  if (t.antesDeSigno !== undefined || t.despuesDeSigno !== undefined || t.finDeCompas !== undefined) return null;   // van pegados a un signo o a una barra: no compiten con las notas
  const c = (k) => cabs[k].x + anchoCab(cabs[k].g) / 2;
  return t.grupo ? t.grupo.map(c).reduce((a, b) => a + b, 0) / t.grupo.length : c(t.nota);
};
/** Que los rotulos no se pisen entre si ni se salgan del dibujo. Devuelve el motivo, o '' si caben. */
function rotulosCaben(fila, cabs, W, svg) {
  const ts = textosDeFila(fila).filter((t) => centroDe(t, cabs) !== null).map((t) => { const c = centroDe(t, cabs), w = anchoTexto(t); return { t, ini: t.izq ? c : c - w / 2, fin: t.izq ? c + w : c + w / 2 }; });
  for (const a of ts) if (a.ini < 0 || a.fin + 200 > W) return `el rotulo «${a.t.texto}» no cabe en el ancho del dibujo`;
  for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
    if ((ts[i].t.ref === 'pie' ? 'abajo' : ts[i].t.ref) !== (ts[j].t.ref === 'pie' ? 'abajo' : ts[j].t.ref)) continue;
    if (ts[i].fin + (fila.holgura || 80) > ts[j].ini && ts[j].fin + (fila.holgura || 80) > ts[i].ini) return `los rotulos «${ts[i].t.texto}» y «${ts[j].t.texto}» se pisan`;
  }
  // rotulos pegados a un signo (To, D.S. al, Coda) o a una barra (Fine, D.C.): ni se pisan entre si ni tapan otro signo
  if (svg && textosDeFila(fila).some((t) => t.antesDeSigno !== undefined || t.despuesDeSigno !== undefined || t.finDeCompas !== undefined)) {
    const signos = signosDibujados(svg);
    const cajas = textosDeFila(fila).filter((t) => t.antesDeSigno !== undefined || t.despuesDeSigno !== undefined || t.finDeCompas !== undefined).map((t) => {
      if (t.despuesDeSigno !== undefined) { const ini = signos[t.despuesDeSigno].x + ANCHO_SIGNO + (t.hueco || 60); return { t, ini, fin: ini + anchoTexto(t) }; }
      const fin = t.antesDeSigno !== undefined ? signos[t.antesDeSigno].x - (t.hueco || 70) : barraDe(svg, fila, t.finDeCompas) - (t.hueco || 100);
      return { t, ini: fin - anchoTexto(t), fin };
    });
    for (const c of cajas) {
      if (c.ini < 0) return `el rotulo «${c.t.texto}» se sale por la izquierda`;
      if (c.fin + 200 > W) return `el rotulo «${c.t.texto}» no cabe en el ancho del dibujo`;
      for (const sg of signos) if (c.t.despuesDeSigno === undefined || sg !== signos[c.t.despuesDeSigno]) if (c.fin > sg.x - 30 && c.ini < sg.x + ANCHO_SIGNO) return `el rotulo «${c.t.texto}» tapa un signo de repeticion`;
    }
    for (let i = 0; i < cajas.length; i++) for (let j = i + 1; j < cajas.length; j++) if (cajas[i].fin + 60 > cajas[j].ini && cajas[j].fin + 60 > cajas[i].ini) return `los rotulos «${cajas[i].t.texto}» y «${cajas[j].t.texto}» se pisan`;
  }
  return '';
}
const ANCHO_SIGNO = 480;   // segno y coda miden unas 480 unidades de ancho
const anchoInterior = (svg) => Number(/class="definition-scale"[^>]*viewBox="0 -?\d+ (\d+) /.exec(svg)[1]);

function verificarRotulos(svg, fila, cabs) {
  const err = [];
  const textos = textosDeFila(fila);
  const motivo = textos.length ? rotulosCaben(fila, cabs, anchoInterior(svg), svg) : '';
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
      if (t.ref === 'pie' && cabs.some((c) => d.y <= c.y)) err.push(`el rotulo «${t.texto}» no esta debajo de todas las notas`);
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
    if (l.length !== c.length || c.some((x, j) => !l[j] || eventoTxt(l[j]) !== eventoTxt(x) || JSON.stringify(articDe(x)) !== JSON.stringify(l[j].artic || null) || (l[j].plica || null) !== (x.plica || null) || (l[j].union || null) !== (x.union || null) || (l[j].gracia || null) !== (x.gracia || null) || (l[j].color || null) !== (x.color || null) || (l[j].orna || null) !== (x.orna || null))) e.push(`el MEI escribe mal el compas ${i + 1}`);
    const quiere = JSON.stringify(tuplasDe(fila, i).map((t) => [t.ini, t.fin, t.num, t.numbase]).sort()), tiene = JSON.stringify(leido.length > i ? tuplasLeidas(leido, i).sort() : []);
    if (quiere !== tiene) e.push(`el MEI escribe mal los grupos de valoracion especial del compas ${i + 1}`);
    c.forEach((x, j) => { if (l[j] && (l[j].grupo >= 0) !== (x.barra !== undefined && c.filter((y) => y.barra === x.barra).length > 1)) e.push(`el MEI agrupa mal la figura ${j + 1} del compas ${i + 1}`); });
  });
  const ids = {};
  leido.forEach((c, i) => c.forEach((x, j) => { ids[x.id] = i + ',' + j; }));
  const slurQuiere = JSON.stringify((fila.slurs || []).map((x) => [x.de.join(','), x.a.join(',')]));
  const slurTiene = JSON.stringify(leido.slurs.map((x) => [ids[x.de], ids[x.a]]));
  if (slurQuiere !== slurTiene) e.push('el MEI escribe mal las ligaduras de expresion');
  const quiereB = fila.compases.map((_, i) => {
    const b = (fila.barras || [])[i] || {};
    const ultimo = i === fila.compases.length - 1;
    const fin = b.fin === 'rpt' ? 'rptend' : b.fin === 'end' ? 'end' : ultimo ? (fila.sinBarraFinal ? 'invis' : fila.barraFinal === 'end' ? 'end' : null) : null;
    return [i === 0 && b.ini === 'rpt', fin, b.casilla ? b.casilla.n + '|' + b.casilla.label : null];
  });
  if (JSON.stringify(quiereB) !== JSON.stringify(leido.barras.map((x) => [x.ini, x.fin, x.casilla]))) e.push('el MEI escribe otra barra final, otras barras de repeticion u otras casillas');
  tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: semilla, spacingLinear: separacion || 0.25, spacingNonLinear: 0.6 }));
  if (!tk.loadData(meiDibujo)) throw new Error('Verovio no lee el MEI');
  if (tk.getPageCount() !== 1) e.push('sale en mas de una pagina');
  let svg = tk.renderToSVG(1);
  e.push(...verificarSVG(svg, fila, leido));
  const cabs = cabezas(svg);
  const motivoAncho = textosDeFila(fila).length ? rotulosCaben(fila, cabs, anchoInterior(svg), svg) : '';
  svg = conRotulos(svg, fila, cabs);
  e.push(...verificarRotulos(svg, fila, cabs));
  if (fila.marco) svg = conMarco(svg, fila.marco);
  return { svg, errores: e, leido, motivoAncho, medidas: medidasDe(svg) };
}

/** Apila las filas (una imagen de Verovio por fila) en un solo SVG. */
function componer(filasSvg, alt, slug, escala, columnas) {
  const hojas = filasSvg.map((s) => preparar(s, ''));
  if (hojas.length === 1) {
    const u = preparar(filasSvg[0], alt);
    if (!escala || escala === 1) return u;
    const w = Math.round(u.w * escala), h = Math.round(u.h * escala);
    return { svg: u.svg.replace(/^(<svg [^>]*?) width="\d+" height="\d+"/, `$1 width="${w}" height="${h}"`), w, h };
  }
  if (columnas) {
    const cw = Math.max(...hojas.map((h) => h.w)), ch = Math.max(...hojas.map((h) => h.h)), hueco = 10;
    const filasN = Math.ceil(hojas.length / columnas);
    const W2 = columnas * cw + (columnas - 1) * hueco, H2 = filasN * ch + (filasN - 1) * hueco;
    const hijos2 = hojas.map((h, i) => h.svg.replace(/<title>[\s\S]*?<\/title>/, '').replace(/^<svg ([^>]*?) viewBox="([^"]*)" width="\d+" height="\d+"[^>]*>/, (m, ant, vb) => `<svg ${ant} x="${(i % columnas) * (cw + hueco)}" y="${Math.floor(i / columnas) * (ch + hueco)}" width="${h.w}" height="${h.h}" viewBox="${vb}">`).trim());
    const svg2 = `<svg id="tm-c${hash(slug)}" viewBox="0 0 ${W2} ${H2}" width="${W2}" height="${H2}" role="img" xmlns="http://www.w3.org/2000/svg"><title>${escAttr(alt)}</title>${hijos2.join('')}</svg>\n`;
    return { svg: svg2, w: W2, h: H2 };
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

function construir(tk, spec, alt, melodia, tocar, soloDibujo, leyenda) {
  const errores = [], filasSvg = [], leidos = [];
  let medidasDe0 = null;
  const medidasTodas = [];
  // misma separacion en todas las filas: la primera con la que todos los rotulos caben (sin rotulos, la de siempre)
  const hayRotulos = spec.filas.some((f) => textosDeFila(f).length);
  const lista = spec.filas.some((f) => f.fino === 'compacto') ? COMPACTAS : spec.filas.some((f) => f.fino) ? FINAS : SEPARACIONES;   // `fino`: imagen ancha de rotulos, que en el movil se encoge: se busca el ancho justo
  for (const sep of hayRotulos ? lista : [0.25]) {
    const rs = spec.filas.map((f, i) => construirFila(tk, f, hash(spec.filas.length > 1 ? spec.slug + '#' + i : spec.slug), tocar, soloDibujo, f.separacion || sep));
    const cabe = rs.every((r) => !r.motivoAncho);
    if (cabe || sep === lista[lista.length - 1] || !hayRotulos) {
      rs.forEach((r, i) => { if (!i) medidasDe0 = r.medidas; medidasTodas.push(r.medidas); errores.push(...r.errores.map((x) => (spec.filas.length > 1 ? `fila ${i + 1}: ` : '') + x)); filasSvg.push(r.svg); leidos.push(r.leido); });
      break;
    }
  }
  if (alt !== null) {
    const rev = REVISORES[spec.tipo];
    if (!rev) errores.push('no hay revisor del alt para el tipo ' + spec.tipo);
    else errores.push(...rev(spec, leidos, alt, melodia, leyenda));
  }
  const listo = errores.length ? null : componer(filasSvg, alt || '', spec.slug, spec.escala, spec.columnas);
  if (listo && spec.filas.length > 1) {
    // la composicion: una imagen por fila, en orden, y todos los rotulos
    const n = cuenta(listo.svg, /<svg id="[^"]+" x="\d+" y="\d+"/g);
    if (n !== spec.filas.length) errores.push(`la composicion tiene ${n} filas y debian ser ${spec.filas.length}`);
    const quiere = spec.filas.flatMap((f) => textosDeFila(f).map((t) => t.texto));
    const dib = (listo.svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((t) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'));
    if (JSON.stringify(dib) !== JSON.stringify(quiere)) errores.push('los rotulos de la composicion no son los previstos');
  }
  return { listo, errores, medidas: medidasDe0, medidasTodas };
}

/* ---------- sabotajes: la verificacion tiene que fallar, y por la razon prevista ---------- */
const SEPARACIONES = [0.25, 0.3, 0.36, 0.43, 0.5, 0.6, 0.72, 0.86, 1.0, 1.2];
const COMPACTAS = Array.from({ length: 60 }, (_, i) => Math.round((0.03 + i * 0.02) * 100) / 100);   // desde muy apretado: redondas con rotulo, que en el movil se encogen
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
  ['silencio convertido en nota', (mei) => mei.replace(new RegExp('<rest [^>]*/>'), '<note xml:id="x0" pname="c" oct="5" dur="4"/>'), /MEI escribe mal/i, 'comienzo-acefalo'],
  ['barra de apertura perdida', (mei) => mei.replace(' left="rptstart"', ''), /MEI escribe otra barra/i, 'repeticion-barras'],
  ['casilla con otro numero', (mei) => mei.replace('label="2."', 'label="3."'), /MEI escribe otra barra/i, 'repeticion-casillas'],
  ['nota de la tesitura cambiada', (mei) => mei.replace('pname="g"', 'pname="a"'), /MEI escribe mal/i, 'oboe-tesitura-medio'],
  ['alteracion de la tesitura perdida', (mei) => mei.replace(' accid="s"', ''), /MEI escribe mal|alteraciones/i, 'clarinete-tesitura-chalumeau'],
  ['segno cambiado por coda', (mei) => mei.replace('func="segno"', 'func="coda"'), /MEI escribe mal|un segno y tres codas/i, 'repeticion-segno-coda'],
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
  ['clave en otra linea', (mei) => mei.replace('clef.line="3"', 'clef.line="2"'), /la clave esta a y|esta a y|clave dibujada/, 'nombres-clave-de-do-en-3'],
  ['clave de fa dibujada como de sol', (mei) => mei.replace('clef.shape="F"', 'clef.shape="G"').replace('clef.line="4"', 'clef.line="2"'), /clave dibujada/, 'glifo-clave-fa'],
  ['sin armadura', (mei) => mei.replace(' key.sig="3f"', ''), /armadura dibujada|alteraciones dibujadas/, 'grados-tonales-menor'],
  ['sin color rojo', (mei) => mei.split(' color="#d00000"').join(''), /deberia ir en/, 'grados-modales-mayor'],
  ['armadura de sostenidos', (mei) => mei.replace(' key.sig="3f"', ' key.sig="3s"'), /armadura dibujada/, 'grados-tonales-menor'],
  ['tesitura con otra clave', (mei) => mei.replace('clef.shape="C"', 'clef.shape="G"'), /clave dibujada/, 'fagot-tesitura-agudo'],
  ['tesitura con la nota movida', (mei) => mei.replace('pname="g"', 'pname="a"'), /esta a y/, 'oboe-tesitura-medio'],
  ['tesitura sin una nota', (mei) => mei.replace(new RegExp('<note [^>]*></note>'), ''), /cabezas|notas y silencios/, 'oboe-tesitura-medio'],
  ['sin barra de cierre de repeticion', (mei) => mei.replace(' right="rptend"', ''), /barras de compas/, 'repeticion-barras'],
  ['sin barra de apertura', (mei) => mei.replace(' left="rptstart"', ''), /barras de compas/, 'repeticion-barras'],
  ['casilla con otro numero', (mei) => mei.replace('label="1."', 'label="9."'), /numeros de casilla/, 'repeticion-casillas'],
  ['sin casillas', (mei) => mei.split('<ending ').join('<sinending ').split('</ending>').join('</sinending>'), /casillas dibujadas|Verovio/, 'repeticion-casillas'],
  ['segno donde iba una coda', (mei) => mei.replace('func="coda"', 'func="segno"'), /signos de repeticion dibujados/, 'repeticion-segno-coda'],
];
// sabotajes de los DATOS: la pagina dice una cosa y el dato otra; los revisores del alt tienen que saltar
const SABOTAJES_LEYENDA = [
  ['leyenda con otra nota aguda', 'Clarín (Si₄–Re₆)', /la leyenda de la pagina dice que acaba en d\/6/, 'clarinete-tesitura-clarin'],
  ['leyenda con otra nota grave', 'Chalumeau (Mi♭₃–Fa♯₄)', /la leyenda de la pagina dice que empieza en eb\/3/, 'clarinete-tesitura-chalumeau'],
  ['leyenda de tabla con otro rango', 'Medio | Do₅–Re₆ | | Brillante', /la leyenda de la pagina dice que acaba en d\/6/, 'flauta-tesitura-medio'],
];
const SABOTAJES_DATOS = [
  ['nombres: la clave de Sol dibujada en Do 3', (s) => { s.filas[0].clave = 'do3'; }, /el alt habla de la clave de sol/, 'nombres-clave-de-sol'],
  ['nombres: una nota de la escala cambiada', (s) => { s.filas[0].compases[0][3].key = 'g/4'; }, /deberia ser la escala de Do/, 'nombres-clave-de-do-en-3'],
  ['nombres: rotulo de otra nota', (s) => { s.filas[0].textos[2].texto = 'Re'; }, /el rotulo de la nota 3/, 'nombres-clave-de-do-en-3'],
  ['nombres: escala una octava mas alta', (s) => { s.filas[0].compases[0].forEach((e) => { e.key = e.key.replace('/3', '/4').replace('/4', '/5'); }); }, /deberia ir de Do/, 'nombres-clave-de-fa-en-4'],
  ['glifo de clave con una nota', (s) => { s.filas[0].compases[0].push({ key: 'c/4', d: 'w', puntillo: 0 }); }, /va solo, sin notas/, 'glifo-clave-fa'],
  ['glifo de la clave de fa en tercera', (s) => { s.filas[0].clave = 'fa3'; }, /en 4\.ª linea|la clave de fa/, 'glifo-clave-fa'],
  ['notas-clave que no empieza en la linea inferior', (s) => { s.filas[0].compases[0][0].key = 'd/3'; }, /linea inferior|el alt dice/, 'notas-clave-do'],
  ['notas-clave con la clave de do en primera', (s) => { s.filas[0].clave = 'do1'; }, /clave de do en 3\.ª|linea inferior/, 'notas-clave-do'],
  ['notas-clave con una nota que salta', (s) => { s.filas[0].compases[0][4].key = 'e/4'; }, /subir de grado en grado|el alt dice/, 'notas-clave-sol'],
  ['lineas adicionales con una nota dentro del pentagrama', (s) => { s.filas[0].compases[0][2].key = 'c/4'; s.filas[0].textos[2].texto = 'Do₄'; }, /dentro del pentagrama|el alt dice/, 'lineas-adicionales-clave-do'],
  ['lineas adicionales con el rotulo sin octava', (s) => { s.filas[0].textos[0].texto = 'La'; }, /los rotulos no son los nombres/, 'lineas-adicionales-clave-sol'],
  ['equivalencia con las claves en otro orden', (s) => { const t = s.filas[1]; s.filas[1] = s.filas[2]; s.filas[2] = t; }, /deberia ser|rotulo de la clave/, 'equivalencia-claves-do-central'],
  ['equivalencia con un Do que no es el central', (s) => { s.filas[3].compases[0][0].key = 'c/5'; }, /un solo Do central/, 'equivalencia-claves-do-central'],
  ['grados: el rojo en otro grado', (s) => { s.filas[0].compases[0][1].color = '#d00000'; }, /grados en rojo/, 'grados-tonales-mayor'],
  ['grados menores sin armadura', (s) => { s.filas[0].armadura = 0; }, /armadura/, 'grados-tonales-menor'],
  ['grados: la escala con el tercer grado mayor', (s) => { s.filas[0].compases[0][2].key = 'e/4'; }, /los pasos|la armadura/, 'grados-modales-menor'],
  ['grados modales llamados tonales', (s) => { s.grupo = 'tonales'; }, /el alt habla de modales/, 'grados-modales-mayor'],
  ['tesitura con la nota aguda cambiada', (s) => { s.filas[0].compases[0][1].key = 'd/6'; }, /el alt dice que el registro acaba/, 'clarinete-tesitura-clarin'],
  ['tesitura con la nota grave cambiada', (s) => { s.filas[0].compases[0][0].key = 'a/4'; }, /el alt dice que el registro empieza/, 'clarinete-tesitura-clarin'],
  ['fagot agudo en clave de sol', (s) => { s.filas[0].clave = 'sol'; }, /clave de do en cuarta/, 'fagot-tesitura-agudo'],
  ['trombon en clave de sol', (s) => { s.filas[0].clave = 'sol'; }, /clave de fa en cuarta/, 'trombon-tesitura-grave'],
  ['registro con la grave por encima de la aguda', (s) => { s.filas[0].compases[0].reverse(); }, /la nota aguda tiene que estar por encima|el alt dice/, 'oboe-tesitura-medio'],
  ['registro con una sola nota', (s) => { s.filas[0].compases[0].pop(); }, /dos redondas/, 'oboe-tesitura-medio'],
  ['registro de otro nombre', (s) => { s.registro = 'agudo'; }, /no habla del registro agudo/, 'oboe-tesitura-medio'],
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
  ['tetico que empieza con silencio', (s) => { s.filas[0].compases[0][0] = { silencio: true, d: 'q', puntillo: 0 }; }, /el alt dice comienzo tetico/, 'comienzo-tetico'],
  ['acefalo sin silencio', (s) => { s.filas[0].compases[0][0] = { key: 'c/5', d: 'q', puntillo: 0 }; }, /el alt dice comienzo acefalo/, 'comienzo-acefalo'],
  ['anacrusa de dos notas', (s) => { s.filas[0].compases[0].push({ key: 'a/4', d: 'q', puntillo: 0 }); s.filas[0].sumas = [32, 64, 64]; }, /UNA nota de anacrusa/, 'comienzo-anacrusico'],
  ['final fuerte en el tercer tiempo', (s) => { s.filas[0].compases[1] = [{ key: 'd/5', d: 'h', puntillo: 0 }, { key: 'c/5', d: 'h', puntillo: 0 }]; }, /el alt dice final en tiempo fuerte/, 'final-tiempo-fuerte'],
  ['final debil en el primer tiempo', (s) => { s.filas[0].compases[1] = [{ key: 'c/5', d: 'w', puntillo: 0 }]; }, /el alt dice final en tiempo debil/, 'final-tiempo-debil'],
  ['comparativa con las filas cambiadas', (s) => { s.filas.reverse(); }, /deberia ser un comienzo/, 'comienzo-comparativa'],
  ['Fine en el ultimo compas', (s) => { s.filas[0].textos[0].finDeCompas = 2; }, /«Fine» va sobre un compas intermedio/, 'repeticion-dc-fine'],
  ['D.C. al Fine en otro sitio', (s) => { s.filas[0].textos[1].finDeCompas = 0; }, /«D\.C\. al Fine» al final/, 'repeticion-dc-fine'],
  ['la 1.ª casilla sin repeticion', (s) => { delete s.filas[0].barras[1].fin; }, /1\.ª casilla lleva la barra/, 'repeticion-casillas'],
  ['To Coda junto al segno', (s) => { s.filas[0].textos[0].antesDeSigno = 0; }, /tienen que ir junto a su coda/, 'repeticion-segno-coda'],
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
      const partes = decodeURIComponent(src).split('/');
      const spec = porArchivo.get(norm(partes.slice(-2).join('/'))) || porArchivo.get(norm(partes.pop()));
      if (!spec) continue;
      const alt = ((/alt="([^"]*)"/.exec(m[0]) || [])[1] || '').replace(/&amp;/g, '&');
      const fig = html.lastIndexOf('<figure', m.index);
      const tag = fig >= 0 ? html.slice(fig, html.indexOf('>', fig) + 1) : '';
      // leyenda: el <figcaption> que sigue a la imagen o, si esta en una tabla, el texto de las demas celdas de su fila
      let leyenda = null;
      const resto = html.slice(m.index + m[0].length, m.index + m[0].length + 600);
      const fc = /^\s*(?:<\/picture>)?\s*<figcaption>([\s\S]*?)<\/figcaption>/.exec(resto);
      if (fc) leyenda = fc[1].replace(/<[^>]+>/g, ' ');
      else {
        const ini = html.lastIndexOf('<tr', m.index), fin = html.indexOf('</tr>', m.index);
        if (ini >= 0 && fin > m.index && ini > html.lastIndexOf('</tr>', m.index)) leyenda = [...html.slice(ini, fin).matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].filter((c) => !/<img /.test(c[1])).map((c) => c[1].replace(/<[^>]+>/g, ' ')).join(' | ');
      }
      imgs.push({ trozo: m[0], spec, alt, melodia: (/data-tm-melody="([^"]*)"/.exec(tag) || [])[1] || null, leyenda });
    }
    if (PAUSADAS.some((x) => pag.endsWith('/' + x)) && !process.argv.includes('--incluir-pausadas')) { if (imgs.length) console.log(`(pagina en pausa, no se toca: ${pag})`); continue; }
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
    // sabotajes de la LEYENDA de la pagina (figcaption o celda de la tabla): el dibujo y el alt estan bien, la leyenda no
    for (const [nombre, leyenda, esperado, slug] of SABOTAJES_LEYENDA) {
      const im = buscar(slug); if (!im) { informa('de la leyenda', nombre, slug, false, 'no encuentro la imagen'); continue; }
      const r = construir(tk, im.spec, im.alt, im.melodia, null, false, leyenda);
      informa('de la leyenda', nombre, slug, r.errores.some((x) => esperado.test(x)), r.errores[0] || 'NO SE DETECTO');
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
  // tesituras: todas las imagenes de un instrumento comparten marco (mismo hueco encima y debajo del pentagrama), como
  // los PNG antiguos: asi los registros salen alineados en la fila. Primero se miden, luego se construyen con el marco comun.
  const tesituras = [...new Set(paginas.flatMap((p) => p.imgs.map((i) => i.spec)))].filter((sp) => sp.tipo === 'tesitura');
  const marcos = new Map();
  for (const sp of tesituras) {
    const r0 = construir(tk, sp, null, null, null, false);
    const m = marcos.get(sp.instrumento) || { top: 0, bot: 0 };
    marcos.set(sp.instrumento, { top: Math.max(m.top, r0.medidas.top), bot: Math.max(m.bot, r0.medidas.bot) });
  }
  for (const sp of tesituras) sp.filas[0].marco = marcos.get(sp.instrumento);
  // imagenes de varias filas que tienen que quedar alineadas entre si (marcoComun): mismo hueco encima y debajo en todas
  for (const sp of new Set(paginas.flatMap((p) => p.imgs.map((i) => i.spec)))) {
    if (!sp.marcoComun) continue;
    const r0 = construir(tk, sp, null, null, null, false);
    const m = { top: Math.max(...r0.medidasTodas.map((x) => x.top)), bot: Math.max(...r0.medidasTodas.map((x) => x.bot)) };
    sp.filas.forEach((f) => { f.marco = m; });
  }
  const hechos = new Map();
  let fallos = 0;
  for (const p of paginas) {
    for (const im of p.imgs) {
      const slug = im.spec.slug;
      try {
        const r = construir(tk, im.spec, im.alt, im.melodia, null, false, im.leyenda);
        if (r.errores.length) throw new Error(r.errores.join('\n   - '));
        if (!hechos.has(slug)) {
          fs.writeFileSync(path.join(RAIZ, SALIDA, carpetaDe(im.spec), slug + '.svg'), r.listo.svg);
          hechos.set(slug, { slug, carpeta: carpetaDe(im.spec), w: r.listo.w, h: r.listo.h });
          im.spec.medidasFinales = r.medidas;
          // version para movil (spec.movil = n.º de columnas de la rejilla): otra imagen, verificada igual, que la pagina elige con <picture>
          if (im.spec.movil) {
            const copia = { ...im.spec, slug: slug + '-movil', columnas: im.spec.movil, movil: undefined };
            const r2 = construir(tk, copia, im.alt, im.melodia, null, false, im.leyenda);
            if (r2.errores.length) throw new Error('(version movil) ' + r2.errores.join('\n   - '));
            fs.writeFileSync(path.join(RAIZ, SALIDA, carpetaDe(im.spec), slug + '-movil.svg'), r2.listo.svg);
            hechos.set(slug + '-movil', { slug: slug + '-movil', carpeta: carpetaDe(im.spec), w: r2.listo.w, h: r2.listo.h });
            console.log(`✓ ${(slug + '-movil').padEnd(32)} ${String(r2.listo.svg.length).padStart(5)} B · ${r2.listo.w}×${r2.listo.h}  (para movil, ${im.spec.movil} columnas)`);
          }
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
  // el marco comun: el pentagrama queda a la misma distancia del borde en todas las imagenes de un instrumento (±1 px)
  for (const instr of new Set(tesituras.map((sp) => sp.instrumento))) {
    const ms = tesituras.filter((sp) => sp.instrumento === instr && sp.medidasFinales).map((sp) => sp.medidasFinales);
    const dTop = Math.max(...ms.map((x) => x.top)) - Math.min(...ms.map((x) => x.top)), dBot = Math.max(...ms.map((x) => x.bot)) - Math.min(...ms.map((x) => x.bot));
    if (dTop > 24 || dBot > 24) { console.log(`✗ ${instr}: los registros no comparten marco (arriba ${dTop}, abajo ${dBot})`); fallos++; }
  }
  // tesituras de un mismo instrumento: sus registros van subiendo (el grave mas grave que el medio, etc.)
  const ORDEN_REG = ['grave', 'chalumeau', 'medio', 'garganta', 'agudo', 'clarin', 'sobreagudo'];
  const porInstrumento = new Map();
  for (const sp of new Set(paginas.flatMap((p) => p.imgs.map((i) => i.spec)))) if (sp.tipo === 'tesitura') { if (!porInstrumento.has(sp.instrumento)) porInstrumento.set(sp.instrumento, []); porInstrumento.get(sp.instrumento).push(sp); }
  for (const [instr, lista] of porInstrumento) {
    lista.sort((a, b) => ORDEN_REG.indexOf(a.registro) - ORDEN_REG.indexOf(b.registro));
    lista.forEach((sp, k) => {
      if (!k) return;
      const [a0, a1] = lista[k - 1].filas[0].compases[0].map((e) => pasoDe(e.key)), [b0, b1] = sp.filas[0].compases[0].map((e) => pasoDe(e.key));
      if (!(b0 > a0 && b1 > a1)) { console.log(`✗ ${instr}: el registro ${sp.registro} no sube respecto al ${lista[k - 1].registro}`); fallos++; }
    });
  }
  if (fallos) { console.log(`${fallos} no pasan la verificacion: no se toca ninguna pagina`); process.exit(1); }

  if (poner) {
    for (const p of paginas) {
      let html = p.html;
      for (const im of p.imgs) {
        const alt = (/alt="([^"]*)"/.exec(im.trozo) || [])[0] || 'alt=""';
        const resto = (/<img\b([^>]*)>/.exec(im.trozo) || [])[1] || '';
        const loading = /loading="lazy"/.test(resto) ? ' loading="lazy"' : '';
        const mv = im.spec.movil ? hechos.get(im.hecho.slug + '-movil') : null;
        const img = `<img src="/${SALIDA}/${im.hecho.carpeta}/${im.hecho.slug}.svg" width="${im.hecho.w}" height="${im.hecho.h}" ${alt}${loading} decoding="async">`;
        const nuevo = mv ? `<picture><source media="(max-width: 600px)" srcset="/${SALIDA}/${mv.carpeta}/${mv.slug}.svg" width="${mv.w}" height="${mv.h}">${img}</picture>` : img;
        html = html.replace(im.trozo, () => nuevo);
      }
      fs.writeFileSync(p.ruta, html);
      console.log(`escrito ${p.pag}/index.html: ${p.imgs.length} imagenes`);
    }
  }
}

if (require.main === module) main().catch((e) => { console.error('✗', e.message); process.exit(1); });
