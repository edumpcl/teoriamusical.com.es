'use strict';
/**
 * Verificador de musica escrita en MEI (o en MusicXML, que Verovio convierte a MEI antes).
 *
 *   node tools/verificar-mei.js sincopa        -> verifica todos los ejemplos de ese conjunto
 *   require('./verificar-mei').verificar(mei, espera)        -> lista de problemas ([] = bien)
 *   require('./verificar-mei').verificarSVG(svg, mei, espera)
 *
 * POR QUE: esta es la razon de pasar de VexFlow a Verovio. Con VexFlow la musica era codigo que
 * dibujaba, y comprobar que estaba bien exigia MIRAR el dibujo. Con MEI la musica es un DATO y
 * se puede comprobar sin dibujar nada: ¿suman los compases?, ¿cada ligadura une dos notas de la
 * misma altura?, ¿las corcheas contiguas de un mismo tiempo estan agrupadas?
 *
 * QUE ENTIENDE (porque el que escribe en MuseScore usa todo esto, no solo notas sueltas):
 *   notas · silencios · acordes · puntillos · tresillos y demas grupos irregulares ·
 *   anacrusa (compas incompleto al inicio) · compases de silencio · cambios de compas ·
 *   ligaduras como atributo (tie="i"/"t") Y como elemento (<tie startid endid>) · notas de adorno
 *
 * LA COMPROBACION NO SALE DEL MISMO SITIO QUE EL DIBUJO. `espera` declara lo que se AFIRMA que hay
 * (compases, ligaduras, barras), y puede venir de un fichero .json junto a la musica. Es opcional:
 * sin el, se comprueba la coherencia interna y que lo dibujado sea lo descrito, pero no se puede
 * comparar con una afirmacion externa.
 *   espera.ligaduras: un numero (cuantas) o una lista de pares de ids (solo si los ids los pones tu)
 *
 * LIMITE: comprueba coherencia y fidelidad del dibujo. NO sabe si las notas elegidas son las que
 * la explicacion pide: eso lo decide quien escribe la musica y quien revisa el texto.
 */
const { DOMParser } = require('@xmldom/xmldom');

const UNIDADES_POR_REDONDA = 64;

/* ---------- utilidades del arbol ---------- */

function descendientes(nodo, nombre) {
  const out = [];
  (function ir(n) {
    for (let c = n.firstChild; c; c = c.nextSibling) {
      if (c.nodeType !== 1) continue;
      if (c.localName === nombre) out.push(c);
      ir(c);
    }
  })(nodo);
  return out;
}

function ancestro(nodo, nombres, hasta) {
  for (let p = nodo.parentNode; p && p !== hasta; p = p.parentNode) {
    if (p.nodeType === 1 && nombres.includes(p.localName)) return p;
  }
  return null;
}

/** Duracion en 1/64 de redonda, con puntillos y con la correccion de los grupos irregulares. */
function duracion(nodo, tope) {
  const d = Number(nodo.getAttribute('dur'));
  if (!d) return null;
  const puntos = Number(nodo.getAttribute('dots') || 0);
  let u = (UNIDADES_POR_REDONDA / d) * (2 - Math.pow(2, -puntos));
  // un tresillo (num=3, numbase=2) dura 2/3 de lo escrito; se aplica por cada grupo que envuelve
  for (let p = nodo.parentNode; p && p !== tope; p = p.parentNode) {
    if (p.nodeType === 1 && p.localName === 'tuplet') {
      const num = Number(p.getAttribute('num'));
      const base = Number(p.getAttribute('numbase'));
      if (num && base) u *= base / num;
    }
  }
  return u;
}

/**
 * Los "eventos" de una capa, en orden: lo que ocupa tiempo. Un acorde cuenta UNA vez (sus notas
 * comparten duracion) y las notas de adorno no ocupan tiempo.
 */
function eventos(capa) {
  const out = [];
  (function ir(n) {
    for (let c = n.firstChild; c; c = c.nextSibling) {
      if (c.nodeType !== 1) continue;
      const nom = c.localName;
      if (nom === 'graceGrp') continue;
      if (nom === 'chord') { if (!c.getAttribute('grace')) out.push(c); continue; }
      if (nom === 'note') { if (!c.getAttribute('grace')) out.push(c); continue; }
      if (nom === 'rest' || nom === 'space' || nom === 'mRest' || nom === 'mSpace') { out.push(c); continue; }
      ir(c);
    }
  })(capa);
  return out;
}

const esNota = (e) => e.localName === 'note' || e.localName === 'chord';

function altura(n) {
  const hijoAccid = descendientes(n, 'accid')[0];
  const alt = n.getAttribute('accid') || n.getAttribute('accid.ges')
    || (hijoAccid && (hijoAccid.getAttribute('accid') || hijoAccid.getAttribute('accid.ges'))) || '';
  return `${n.getAttribute('pname')}${alt}${n.getAttribute('oct')}`;
}

function limpiaId(s) { return (s || '').replace(/^#/, ''); }

/* ---------- verificacion del MEI ---------- */

function verificar(mei, espera) {
  const p = [];
  const errores = [];
  const doc = new DOMParser({ onError: (nivel, msg) => errores.push(msg) }).parseFromString(mei, 'text/xml');
  if (errores.length) return errores.map((e) => 'XML mal formado: ' + e);
  const raiz = doc.documentElement;
  if (!raiz || raiz.localName !== 'mei') return ['el documento no es MEI'];

  // 1) ids unicos
  const ids = [];
  (function ir(n) {
    for (let c = n.firstChild; c; c = c.nextSibling) {
      if (c.nodeType !== 1) continue;
      const id = c.getAttribute('xml:id');
      if (id) ids.push(id);
      ir(c);
    }
  })(raiz);
  const vistos = new Set();
  for (const id of ids) { if (vistos.has(id)) p.push(`xml:id repetido: ${id}`); vistos.add(id); }

  // 2) compases. Se recorre el documento EN ORDEN para saber que compas (metrica) rige en cada uno:
  //    un cambio de compas a mitad de pieza no es un error.
  let cuenta = 4;
  let unidad = 4;
  let hayMetrica = false;
  const medidas = [];
  (function ir(n) {
    for (let c = n.firstChild; c; c = c.nextSibling) {
      if (c.nodeType !== 1) continue;
      const nom = c.localName;
      if (nom === 'meterSig' && c.getAttribute('count')) {
        cuenta = Number(c.getAttribute('count')); unidad = Number(c.getAttribute('unit')) || 4; hayMetrica = true;
      } else if ((nom === 'staffDef' || nom === 'scoreDef') && c.getAttribute('meter.count')) {
        cuenta = Number(c.getAttribute('meter.count')); unidad = Number(c.getAttribute('meter.unit')) || 4; hayMetrica = true;
      }
      if (nom === 'measure') { medidas.push({ nodo: c, cuenta, unidad, hayMetrica }); continue; }
      ir(c);
    }
  })(raiz);

  if (espera && espera.compases != null && medidas.length !== espera.compases) {
    p.push(`se afirma ${espera.compases} compas(es) y la musica tiene ${medidas.length}`);
  }

  for (const m of medidas) {
    const objetivo = m.cuenta * (UNIDADES_POR_REDONDA / m.unidad);
    // la anacrusa (compas incompleto al principio) es legitima: MEI la marca con metcon="false"
    const incompleto = m.nodo.getAttribute('metcon') === 'false' || m.nodo.getAttribute('type') === 'pickup';
    for (const capa of descendientes(m.nodo, 'layer')) {
      let suma = 0;
      let medidaCompleta = false;
      for (const e of eventos(capa)) {
        if (e.localName === 'mRest' || e.localName === 'mSpace') { medidaCompleta = true; continue; }
        const d = duracion(e, capa);
        if (d == null) p.push(`compas ${m.nodo.getAttribute('n')}: elemento sin duracion (${e.getAttribute('xml:id')})`);
        else suma += d;
      }
      if (medidaCompleta || !m.hayMetrica || incompleto) continue;
      if (Math.abs(suma - objetivo) > 1e-6) {
        p.push(`compas ${m.nodo.getAttribute('n')}: suma ${Math.round(suma * 100) / 100}/64 de redonda y deberia sumar ${objetivo}/64 (${m.cuenta}/${m.unidad})`);
      }
    }
  }

  // 3) ligaduras: valen las dos formas de escribirlas
  const notas = descendientes(raiz, 'note');
  const porId = new Map(notas.map((n) => [n.getAttribute('xml:id'), n]));
  const pares = [];

  // 3a) como atributo: tie="i" ... tie="t" (cada inicio se une a la nota SIGUIENTE)
  notas.forEach((n, i) => {
    const t = n.getAttribute('tie');
    if (t === 'i' || t === 'm') {
      const sig = notas[i + 1];
      if (!sig) { p.push(`ligadura abierta sin nota que la cierre (${n.getAttribute('xml:id')})`); return; }
      const ts = sig.getAttribute('tie');
      if (ts !== 't' && ts !== 'm') p.push(`la ligadura de ${n.getAttribute('xml:id')} no termina en la nota siguiente`);
      if (altura(n) !== altura(sig)) p.push(`ligadura entre alturas distintas: ${altura(n)} y ${altura(sig)}`);
      pares.push([n.getAttribute('xml:id'), sig.getAttribute('xml:id')]);
    }
    if ((t === 't' || t === 'm') && !(notas[i - 1] && ['i', 'm'].includes(notas[i - 1].getAttribute('tie')))) {
      p.push(`ligadura que termina en ${n.getAttribute('xml:id')} y no empieza en la nota anterior`);
    }
  });

  // 3b) como elemento: <tie startid="#a" endid="#b"/>  (asi las deja Verovio al leer MusicXML)
  for (const t of descendientes(raiz, 'tie')) {
    const a = porId.get(limpiaId(t.getAttribute('startid')));
    const b = porId.get(limpiaId(t.getAttribute('endid')));
    if (!a || !b) { p.push('una ligadura apunta a una nota que no existe'); continue; }
    if (altura(a) !== altura(b)) p.push(`ligadura entre alturas distintas: ${altura(a)} y ${altura(b)}`);
    if (notas.indexOf(b) <= notas.indexOf(a)) p.push('una ligadura termina antes de empezar');
    pares.push([a.getAttribute('xml:id'), b.getAttribute('xml:id')]);
  }

  if (espera && espera.ligaduras != null) {
    if (typeof espera.ligaduras === 'number') {
      if (pares.length !== espera.ligaduras) p.push(`se afirman ${espera.ligaduras} ligadura(s) y la musica tiene ${pares.length}`);
    } else if (JSON.stringify(pares) !== JSON.stringify(espera.ligaduras)) {
      p.push(`ligaduras: se afirma ${JSON.stringify(espera.ligaduras)} y la musica tiene ${JSON.stringify(pares)}`);
    }
  }

  // 4) barras: las corcheas (o menores) contiguas del MISMO tiempo deben ir agrupadas.
  //    Es justo el fallo que paso en la pagina de la sincopa: dos corcheas sueltas.
  const barras = descendientes(raiz, 'beam');
  if (espera && espera.barras != null && barras.length !== espera.barras) {
    p.push(`se afirma ${espera.barras} barra(s) y la musica tiene ${barras.length}`);
  }
  for (const b of barras) {
    const dentro = eventos(b).filter(esNota);
    if (dentro.length < 2) p.push('barra con menos de dos notas');
    if (dentro.some((n) => Number(n.getAttribute('dur')) < 8)) p.push('barra con una nota que no admite barra (negra o mayor)');
  }
  for (const m of medidas) {
    // compas compuesto (6/8, 9/8, 12/8): el pulso es la negra con puntillo = 3 corcheas
    const compuesto = m.unidad === 8 && m.cuenta % 3 === 0 && m.cuenta > 3;
    const porTiempo = compuesto ? (UNIDADES_POR_REDONDA / 8) * 3 : UNIDADES_POR_REDONDA / m.unidad;
    for (const capa of descendientes(m.nodo, 'layer')) {
      let t = 0;
      let previa = null;
      for (const e of eventos(capa)) {
        const d = duracion(e, capa) || 0;
        const pequena = esNota(e) && Number(e.getAttribute('dur')) >= 8;
        const tiempo = Math.floor(t / porTiempo + 1e-9);
        if (pequena && previa && previa.pequena && previa.tiempo === tiempo
          && !(ancestro(e, ['beam'], capa) && ancestro(previa.nodo, ['beam'], capa))) {
          p.push(`dos notas contiguas del tiempo ${tiempo + 1} sin agrupar (${previa.nodo.getAttribute('xml:id')} y ${e.getAttribute('xml:id')})`);
        }
        previa = { nodo: e, pequena, tiempo };
        t += d;
      }
    }
  }
  return p;
}

/* ---------- verificacion del DIBUJO ---------- */

/** ¿Lo DIBUJADO es lo DESCRITO? Cuenta lo que Verovio ha pintado y lo compara con el MEI. */
function verificarSVG(svg, mei, espera) {
  const p = [];
  const doc = new DOMParser().parseFromString(mei, 'text/xml');
  const raiz = doc.documentElement;
  const con = (re) => (svg.match(re) || []).length;

  const notas = descendientes(raiz, 'note');
  const pintadas = con(/class="note"/g);
  if (pintadas !== notas.length) p.push(`se han pintado ${pintadas} notas y la musica tiene ${notas.length}`);

  // Una plica por EVENTO (un acorde comparte la suya) con duracion de blanca o menor.
  let conPlica = 0;
  for (const capa of descendientes(raiz, 'layer')) {
    for (const e of eventos(capa)) if (esNota(e) && Number(e.getAttribute('dur')) >= 2) conPlica++;
  }
  const plicas = con(/class="stem"/g);
  if (plicas !== conPlica) p.push(`se han pintado ${plicas} plicas y hacen falta ${conPlica}`);

  const barras = descendientes(raiz, 'beam').length;
  const barrasPintadas = con(/class="beam"/g);
  if (barrasPintadas !== barras) p.push(`se han pintado ${barrasPintadas} barras y la musica tiene ${barras}`);

  const ligaduras = notas.filter((n) => n.getAttribute('tie') === 'i' || n.getAttribute('tie') === 'm').length
    + descendientes(raiz, 'tie').length;
  const ligPintadas = con(/class="tie"/g);
  if (ligPintadas !== ligaduras) p.push(`se han pintado ${ligPintadas} ligaduras y la musica tiene ${ligaduras}`);

  if (!/class="clef"/.test(svg)) p.push('no se ha pintado la clave');
  if (descendientes(raiz, 'meterSig').length || descendientes(raiz, 'staffDef').some((s) => s.getAttribute('meter.count'))) {
    if (!/class="meterSig"/.test(svg)) p.push('no se ha pintado el compas');
  }

  // Un <text> con glifos musicales (zona privada U+E000-F8FF) depende de una fuente externa y se
  // veria roto sin ella. El texto normal (letra, indicaciones) no es problema.
  for (const m of svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)) {
    if (/[-]/.test(m[1])) { p.push('el SVG usa glifos musicales como <text>: depende de una fuente externa'); break; }
  }

  // El trazo (lineas del pentagrama, plicas, barras de compas) lo da un <style> ligado al id del
  // <svg> raiz. Si ese id no esta en la raiz, la regla no aplica y todo lo que es trazo (y no
  // relleno) desaparece SIN que falte ningun elemento en el DOM: contarlos no lo detecta.
  const ref = (svg.match(/#([A-Za-z0-9_-]+)\s+(?:ellipse|path)/) || [])[1];
  const raizSvg = (svg.match(/^\s*<svg [^>]*>/) || [''])[0];
  if (!ref) p.push('el SVG no trae la regla de trazo (stroke) de Verovio');
  else if (!new RegExp('\\bid="' + ref + '"').test(raizSvg)) {
    p.push(`la regla de trazo apunta a #${ref} y el <svg> raiz no tiene ese id: las lineas no se veran`);
  }
  return p;
}

// Las utilidades del arbol las reutiliza tools/descripcion-mei.js: un solo sitio que sabe
// recorrer MEI (acordes, grupos irregulares, notas de adorno...) y no dos que puedan discrepar.
module.exports = { verificar, verificarSVG, util: { descendientes, eventos, esNota, duracion } };

if (require.main === module) {
  const nombre = process.argv[2];
  if (!nombre) { console.log('uso: node tools/verificar-mei.js <conjunto>   (p. ej. sincopa)'); process.exit(1); }
  const { EJEMPLOS } = require('./notacion/' + nombre + '.mei.js');
  let mal = 0;
  for (const e of EJEMPLOS) {
    const pr = verificar(e.mei, e.espera);
    console.log(`${pr.length ? '✗' : '✓'} ${e.id}${pr.length ? '' : '  (MEI coherente)'}`);
    pr.forEach((x) => console.log('     - ' + x));
    mal += pr.length;
  }
  process.exit(mal ? 1 : 0);
}
