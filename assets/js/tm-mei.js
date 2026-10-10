/**
 * tm-mei.js — de una descripcion musical (una «fila»: clave, armadura, compas, notas, silencios, barras, grupos de valoracion
 * especial, ligaduras, articulaciones, ornamentos...) a MEI, el formato que lee Verovio.
 *
 * Es el MISMO codigo que usa el generador de imagenes (tools/gen-compases-verovio.js, en Node) y los motores de ejercicios
 * (en el navegador): asi un ejercicio dibuja exactamente lo que ya esta verificado en las imagenes del diccionario.
 * No depende de nada; sirve con require() y como global `tmMEI`.
 *
 * Una nota se escribe 'c/4', 'eb/4', 'f#/5', 'gbb/4'; una figura {key, d:'q', puntillo, barra, plica, acento...} (ver el generador).
 */
(function (raiz, fabrica) {
  if (typeof module === 'object' && module.exports) module.exports = fabrica();
  else raiz.tmMEI = fabrica();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const ESPACIO = 180;   // separacion entre lineas del pentagrama, en las unidades internas de Verovio

const DUR = { w: 64, h: 32, q: 16, 8: 8, 16: 4, 32: 2, 64: 1 };
const DUR_MEI = { w: 1, h: 2, q: 4, 8: 8, 16: 16, 32: 32, 64: 64 };
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
const durTotal = (e) => (e.gracia ? 0 : DUR[e.d] * (e.puntillo ? 1.5 : 1));   // una nota de adorno no ocupa tiempo
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
      if (x.espacio) return `<space xml:id="${id}" ${dur}/>`;   // hueco invisible que ocupa tiempo (el ejercicio lo rellena el alumno)
      if (x.silencio) return `<rest xml:id="${id}" ${dur}${x.color ? ` color="${x.color}"` : ''}/>`;
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
    + `<staffDef n="1" lines="5" clef.shape="${claveDe(fila).shape}" clef.line="${claveDe(fila).line}"${fila.sinClave ? ' clef.visible="false"' : ''}${armaduraMEI(fila.armadura || 0)}${metro}/></staffGrp></scoreDef><section>${medidas}</section></score></mdiv></body></music></mei>`;
}

/**
 * Un SISTEMA de varios pentagramas (piano: clave de sol y de fa con llave) con ACORDES.
 *   { armadura, num?, den?, llave: true, barraFinal: 'end'?,
 *     pentagramas: [{ clave: 'sol', compases: [[ev, ev], [ev]] }, { clave: 'fa', compases: [...] }] }
 * ev = { notas: ['c/4', 'e/4'], d: 'w', puntillo?, silencio?, color?, plica? }   (una sola nota: notas con un elemento).
 * Las notas se escriben con la alteracion que dice la armadura ('bb/4' en Si bemol mayor); la regla del compas (una alteracion
 * vale hasta la barra) se aplica por pentagrama.
 */
function aMEIsistema(s) {
  let k = 0;
  const arm = s.armadura || 0;
  const claves = s.pentagramas.map((p) => CLAVES[p.clave || 'sol']);
  const nMed = s.pentagramas[0].compases.length;
  const metro = !s.num ? '' : ` meter.count="${s.num}" meter.unit="${s.den}"`;
  const defs = claves.map((c, i) => `<staffDef n="${i + 1}" lines="5" clef.shape="${c.shape}" clef.line="${c.line}"${armaduraMEI(arm)}${metro}/>`).join('');
  const grupo = `<staffGrp${s.llave ? ' symbol="brace" bar.thru="true"' : ''}>${defs}</staffGrp>`;
  const pentagrama = (p, n, i) => {
    const estado = {};
    const evs = p.compases[i].map((x) => {
      const dur = `dur="${DUR_MEI[x.d]}"${x.puntillo ? ' dots="1"' : ''}`;
      if (x.silencio) return `<rest xml:id="n${k++}" ${dur}${x.color ? ` color="${x.color}"` : ''}/>`;
      const notas = x.notas.map((key) => {
        const q = parseKey(key), id = q.letra + q.oct;
        const vigente = id in estado ? estado[id] : altArmadura(arm, q.letra);
        const muestra = q.alt !== vigente || !!x.becuadro;
        estado[id] = q.alt;
        const comun = `pname="${q.letra}" oct="${q.oct}"${muestra ? ` accid="${ACC_MEI[q.alt]}"` : ''}${x.color ? ` color="${x.color}"` : ''}`;
        return x.notas.length > 1 ? `<note xml:id="n${k++}" ${comun}/>` : `<note xml:id="n${k++}" ${comun} ${dur}${x.plica ? ` stem.dir="${x.plica}"` : ''}/>`;
      }).join('');
      return x.notas.length > 1 ? `<chord xml:id="n${k++}" ${dur}${x.plica ? ` stem.dir="${x.plica}"` : ''}>${notas}</chord>` : notas;
    }).join('');
    return `<staff n="${n}"><layer n="1">${evs}</layer></staff>`;
  };
  const medidas = Array.from({ length: nMed }, (_, i) => {
    const b = (s.barras || [])[i] || {};
    const ultimo = i === nMed - 1;
    const der = b.fin === 'end' ? ' right="end"' : ultimo && s.barraFinal === 'end' ? ' right="end"' : '';
    return `<measure n="${i + 1}"${der}>${s.pentagramas.map((p, j) => pentagrama(p, j + 1, i)).join('')}</measure>`;
  }).join('');
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef>'
    + grupo + `</scoreDef><section>${medidas}</section></score></mdiv></body></music></mei>`;
}


  return { DUR, DUR_MEI, LETRAS, PASO_Y, ESPACIO, REF_CLAVE, mkClave, CLAVES, claveDe, ACC_MEI, MEI_ACC, ACC_TXT, ACC_GLIFO, durTotal, parseKey, pasoDe, ORDEN_SOSTENIDOS, ORDEN_BEMOLES, altArmadura, armaduraMEI, alteraciones, GLIFO_ARTIC, ORNA, ornaMEI, ornaLeida, articDe, tuplasDe, factorEvento, duracionBarra, aMEI, aMEIsistema };
});
