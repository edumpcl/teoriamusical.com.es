'use strict';
/**
 * Describe en castellano una musica escrita en MEI, para el texto alternativo (aria-label) del
 * dibujo: lo que oye un lector de pantalla, lo que lee Google y lo que leen las IAs.
 *
 *   describir(mei) -> "Pentagrama en 4/4, clave de sol. Do negra, Re corchea, ..."
 *
 * POR QUE: hasta ahora cada descripcion la escribia yo a mano al lado de cada ejemplo. Si quien
 * escribe la musica es quien la dibuja en MuseScore, no debe tener ademas que escribirla otra vez
 * con palabras: se genera de la propia partitura, y asi nunca puede contradecirla.
 *
 * Se puede pisar con un `alt` propio en el .json que acompaña a cada ejemplo cuando haga falta
 * decir algo que la partitura no dice (el «por qué» pedagogico). Normalmente lo explica ya el
 * pie de foto de la pagina.
 *
 * No dice la octava (Do, no Do5): para una descripcion corta es ruido, y el dibujo la da.
 */
const { DOMParser } = require('@xmldom/xmldom');
const { util } = require('./verificar-mei.js');
const { descendientes, eventos } = util;

const NOTA = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const ALTERACION = { s: ' sostenido', f: ' bemol', n: ' becuadro', x: ' doble sostenido', ff: ' doble bemol', ss: ' doble sostenido' };
const FIGURA = { 1: 'redonda', 2: 'blanca', 4: 'negra', 8: 'corchea', 16: 'semicorchea', 32: 'fusa', 64: 'semifusa' };
const PUNTILLO = { 1: ' con puntillo', 2: ' con doble puntillo', 3: ' con triple puntillo' };

function nombreNota(n) {
  const hijo = descendientes(n, 'accid')[0];
  const acc = n.getAttribute('accid') || (hijo && hijo.getAttribute('accid')) || '';
  return (NOTA[n.getAttribute('pname')] || '?') + (ALTERACION[acc] || '');
}

function figura(e) {
  const d = Number(e.getAttribute('dur'));
  const pt = Number(e.getAttribute('dots') || 0);
  return (FIGURA[d] || `figura de 1/${d}`) + (PUNTILLO[pt] || '');
}

function clave(raiz) {
  const c = descendientes(raiz, 'clef')[0];
  const sf = descendientes(raiz, 'staffDef')[0];
  const forma = (c && c.getAttribute('shape')) || (sf && sf.getAttribute('clef.shape')) || 'G';
  const linea = (c && c.getAttribute('line')) || (sf && sf.getAttribute('clef.line')) || '';
  if (forma === 'G') return 'clave de sol';
  if (forma === 'F') return 'clave de fa';
  if (forma === 'C') return linea === '4' ? 'clave de do en cuarta' : 'clave de do';
  return 'clave de ' + forma;
}

function armadura(raiz) {
  const k = descendientes(raiz, 'keySig')[0];
  const sf = descendientes(raiz, 'staffDef')[0];
  const sig = (k && k.getAttribute('sig')) || (sf && sf.getAttribute('key.sig')) || '0';
  const m = /^(\d+)([sf])$/.exec(sig);
  if (!m || m[1] === '0') return '';
  const n = Number(m[1]);
  return `, armadura de ${n} ${m[2] === 's' ? (n === 1 ? 'sostenido' : 'sostenidos') : (n === 1 ? 'bemol' : 'bemoles')}`;
}

function metrica(raiz) {
  const m = descendientes(raiz, 'meterSig')[0];
  if (m && m.getAttribute('count')) return `${m.getAttribute('count')}/${m.getAttribute('unit')}`;
  const sf = descendientes(raiz, 'staffDef')[0];
  if (sf && sf.getAttribute('meter.count')) return `${sf.getAttribute('meter.count')}/${sf.getAttribute('meter.unit')}`;
  return null;
}

function nombreGrupo(t) {
  const num = Number(t.getAttribute('num'));
  const base = Number(t.getAttribute('numbase'));
  if (num === 3 && base === 2) return 'tresillo';
  if (num === 2 && base === 3) return 'dosillo';
  if (num === 4 && base === 6) return 'cuatrillo';
  if (num === 5) return 'quintillo';
  if (num === 6) return 'seisillo';
  if (num === 7) return 'septillo';
  return `grupo irregular de ${num}`;
}

function describir(mei) {
  const doc = new DOMParser().parseFromString(mei, 'text/xml');
  const raiz = doc.documentElement;
  const notas = descendientes(raiz, 'note');

  // ligaduras: que notas EMPIEZAN una (de las dos formas de escribirlas)
  const empiezaLigadura = new Set();
  for (const n of notas) if (['i', 'm'].includes(n.getAttribute('tie'))) empiezaLigadura.add(n);
  const porId = new Map(notas.map((n) => [n.getAttribute('xml:id'), n]));
  for (const t of descendientes(raiz, 'tie')) {
    const a = porId.get((t.getAttribute('startid') || '').replace(/^#/, ''));
    if (a) empiezaLigadura.add(a);
  }

  const evento = (e) => {
    if (e.localName === 'mRest' || e.localName === 'mSpace') return 'compás de silencio';
    if (e.localName === 'rest' || e.localName === 'space') return `silencio de ${figura(e)}`;
    let txt;
    if (e.localName === 'chord') {
      const ns = descendientes(e, 'note').map(nombreNota);
      txt = `acorde de ${ns.join(', ')} (${figura(e)})`;
      if (descendientes(e, 'note').some((n) => empiezaLigadura.has(n))) txt += ' ligado con el siguiente';
      return txt;
    }
    txt = `${nombreNota(e)} ${figura(e)}`;
    if (empiezaLigadura.has(e)) txt += ' ligada con la siguiente';
    return txt;
  };

  const medidas = descendientes(raiz, 'measure');
  const partes = medidas.map((m, i) => {
    const capa = descendientes(m, 'layer')[0];
    const lista = [];
    const vistos = new Set();
    for (const e of eventos(capa)) {
      // un grupo irregular se nombra una vez, delante de sus notas
      const t = (function () { for (let p = e.parentNode; p && p !== capa; p = p.parentNode) if (p.localName === 'tuplet') return p; return null; })();
      if (t && !vistos.has(t)) { vistos.add(t); lista.push(`${nombreGrupo(t)}:`); }
      lista.push(evento(e));
    }
    const anacrusa = m.getAttribute('metcon') === 'false' ? ' (anacrusa)' : '';
    const texto = lista.join(', ').replace(/:, /g, ': ');
    // tras el punto de la cabecera la frase empieza en mayuscula, sea nota, acorde o silencio
    const capital = texto.charAt(0).toUpperCase() + texto.slice(1);
    return medidas.length > 1 ? `Compás ${m.getAttribute('n') || i + 1}${anacrusa}: ${texto}` : capital;
  });

  const m = metrica(raiz);
  const cab = `Pentagrama${m ? ' en ' + m : ''}, ${clave(raiz)}${armadura(raiz)}.`;
  return `${cab} ${partes.join('. ')}.`.replace(/\.\.$/, '.');
}

module.exports = { describir };

if (require.main === module) {
  const nombre = process.argv[2];
  if (!nombre) { console.log('uso: node tools/descripcion-mei.js <conjunto>'); process.exit(1); }
  for (const e of require('./notacion/' + nombre + '.mei.js').EJEMPLOS) {
    console.log(e.id + '\n   ' + describir(e.mei) + '\n');
  }
}
