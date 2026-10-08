'use strict';
/**
 * Pentagramas sencillos (intervalos, acordes...) dibujados con Verovio y guardados como SVG.
 *
 *   node tools/gen-pentagramas-verovio.js <conjunto>            # prueba: genera y verifica
 *   node tools/gen-pentagramas-verovio.js <conjunto> --poner     # ademas sustituye los <img> de la pagina
 *   node tools/gen-pentagramas-verovio.js --lista
 *
 * Los datos de cada imagen (que notas, en que clave) estan en tools/notacion/datos/<familia>.js.
 * El ALT DE LA PAGINA NO SE TOCA: el audio (tm-piano-audio.js) lee de el las notas, y ademas es la
 * segunda fuente con la que se comprueba cada imagen: las notas que nombra el alt tienen que ser
 * las que se dibujan, y el nombre del intervalo («5ª Justa», «Tercera mayor») tiene que cumplirse
 * (letras que separan las notas y semitonos reales).
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, ESPACIO, PX_POR_UNIDAD, OPCIONES, hash, escAttr, preparar, NOMBRE, LETRA_DE, LETRAS, GLIFO } = G;

const SALIDA = 'assets/img/notacion';
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const ALT_MEI = { '-2': 'ff', '-1': 'f', 0: 'n', 1: 's', 2: 'x' };
const MEI_ALT = { ff: -2, f: -1, n: 0, s: 1, x: 2 };
const ALT_TXT = { '-2': '♭♭', '-1': '♭', 0: '', 1: '♯', 2: '𝄪' };
const DUR_MEI = { w: 1, h: 2, q: 4 };
const BASE_CLAVE = { sol: { paso: 4 * 7 + 2, shape: 'G', line: 2, glifo: 'E050' }, fa: { paso: 2 * 7 + 4, shape: 'F', line: 4, glifo: 'E062' } };   // linea inferior: E4 / G2
const PASO_Y = ESPACIO / 2;
const norm = (s) => String(s).normalize('NFC');

/* ---------- notas: 'c4', 'd#5', 'eb4', 'ebb4', 'cn4' ---------- */
function nota(s) {
  const m = /^([a-g])(bb|b|##|#|x|n)?(\d)$/.exec(s);
  if (!m) throw new Error('nota mal escrita: ' + s);
  const alt = { bb: -2, b: -1, '': 0, n: 0, '#': 1, x: 2, '##': 2 }[m[2] || ''];
  return { letra: m[1], alt, octava: Number(m[3]), natural: m[2] === 'n' };
}
const paso = (n) => n.octava * 7 + LETRAS.indexOf(n.letra);
const semis = (n) => (n.octava + 1) * 12 + PC[n.letra] + n.alt;
const nombre = (n) => NOMBRE[n.letra] + ALT_TXT[n.alt];

/** Normaliza los compases del dato: [[{n:[..], d:'w'}]] y pone el orden de las notas de cada acorde de grave a agudo. */
function preparaSpec(spec) {
  const compases = spec.compases.map((c, i) => c.map((e) => {
    const notas = e.n.map(nota).sort((a, b) => semis(a) - semis(b) || paso(a) - paso(b));
    return { notas, d: e.d || 'w', clave: (spec.claves && spec.claves[i]) || spec.clave };
  }));
  return { ...spec, compases };
}

/** Que alteraciones se escriben: regla del compas (valen para esa altura hasta la barra). */
function conAlteraciones(compases) {
  return compases.map((c) => {
    const estado = {};
    return c.map((e) => ({
      ...e,
      notas: e.notas.map((n) => {
        const k = n.letra + n.octava;
        const vigente = k in estado ? estado[k] : 0;
        const muestra = n.alt !== vigente || (n.natural && n.alt === 0 && !(k in estado));
        estado[k] = n.alt;
        return { ...n, muestra, clave: e.clave };
      }),
    }));
  });
}

function aMEI(compases, clave, hueco) {
  const c = BASE_CLAVE[compases[0][0].clave || clave];
  let k = 0;
  const ms = compases.map((m, i) => {
    const evs = m.map((e) => {
      const ns = e.notas.map((n) => `<note xml:id="n${k++}" pname="${n.letra}" oct="${n.octava}"${n.muestra ? ` accid="${ALT_MEI[n.alt]}"` : ''}${n.color ? ` color="${n.color}"` : ''}${e.notas.length > 1 ? '' : ` dur="${DUR_MEI[e.d]}"`}/>`).join('');
      return e.notas.length > 1 ? `<chord dur="${DUR_MEI[e.d]}">${ns}</chord>` : ns;
    }).join('');
    const der = i === compases.length - 1 ? ' right="invis"' : '';
    const prev = i > 0 ? compases[i - 1][0].clave : m[0].clave;
    const cambio = m[0].clave !== prev ? `<clef shape="${BASE_CLAVE[m[0].clave].shape}" line="${BASE_CLAVE[m[0].clave].line}"/>` : '';
    return `<measure n="${i + 1}"${der}><staff n="1"><layer n="1">${i === 0 && hueco ? '<space dur="2"/>' : ''}${cambio}${evs}</layer></staff></measure>`;
  }).join('');
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="${c.shape}" clef.line="${c.line}"/></staffGrp></scoreDef><section>${ms}</section></score></mdiv></body></music></mei>`;
}

/** Lee el MEI como lo leeria un musico (acordes y compases incluidos): [[notas del evento]] por compas. */
function leerMEI(mei) {
  const compases = [];
  for (const m of mei.match(/<measure [\s\S]*?<\/measure>/g) || []) {
    const estado = {};
    const evs = [];
    const re = /<chord [^>]*>([\s\S]*?)<\/chord>|<note [^>]*\/>/g;
    let x;
    while ((x = re.exec(m))) {
      const trozo = x[1] !== undefined ? x[1] : x[0];
      const notas = (trozo.match(/<note [^>]*\/>/g) || []).map((t) => {
        const a = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(t) || [])[1];
        const letra = a('pname'), oct = Number(a('oct')), acc = a('accid'), k = letra + oct;
        if (acc !== undefined) estado[k] = MEI_ALT[acc];
        return { letra, octava: oct, alt: k in estado ? estado[k] : 0, color: a('color') };
      });
      evs.push(notas);
    }
    compases.push(evs);
  }
  return compases;
}

/* ---------- comprobaciones contra lo que dice la pagina (alt) ---------- */
const NOTA_ALT = /(Do|Re|Mi|Fa|Sol|La|Si)(?:\s*(♯♯|♭♭|𝄪|𝄫|♯|♭|#)|\s+(doble sostenido|doble bemol|sostenido|bemol))?(?![a-záéíóúñ])/g;
const SIGNO_ALT = { '♯♯': 2, '𝄪': 2, 'doble sostenido': 2, '♭♭': -2, '𝄫': -2, 'doble bemol': -2, '♯': 1, '#': 1, sostenido: 1, '♭': -1, bemol: -1 };
/** Notas que nombra el alt. Si lleva «…: Do, Mi y Sol», solo cuentan las de despues de los dos puntos. */
function notasDelAlt(alt) {
  const i = alt.lastIndexOf(':');
  const texto = i >= 0 && /(Do|Re|Mi|Fa|Sol|La|Si)/.test(alt.slice(i)) ? alt.slice(i + 1) : alt;
  return [...texto.matchAll(NOTA_ALT)].map((m) => ({ letra: LETRA_DE[m[1]], alt: SIGNO_ALT[m[2] || m[3]] || 0 }));
}
const ORDINAL = { 'unísono': 1, unisono: 1, segunda: 2, tercera: 3, cuarta: 4, quinta: 5, sexta: 6, 'séptima': 7, septima: 7, octava: 8, novena: 9, 'décima': 10, 'undécima': 11, 'duodécima': 12 };
const BASE_INT = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
const JUSTOS = new Set([1, 4, 5]);
/** Semitonos que le corresponden a (numero, calidad). */
function semitonosDe(numero, calidad) {
  const octavas = Math.floor((numero - 1) / 7), simple = ((numero - 1) % 7) + 1;
  const base = BASE_INT[simple];
  let d;
  if (JUSTOS.has(simple)) d = { justa: 0, aumentada: 1, disminuida: -1 }[calidad];
  else d = { mayor: 0, menor: -1, aumentada: 1, disminuida: -2 }[calidad];
  return d === undefined ? null : base + d + 12 * octavas;
}
/** Intervalo que nombra el alt: {numero, calidad} o null. */
function intervaloDelAlt(alt) {
  const a = alt.toLowerCase();
  let numero = null, calidad = null;
  const m1 = /(\d+)\s*[ªº]\s*(aumentada|disminuida|mayor|menor|justa)/.exec(a);
  const m2 = /(un[ií]sono|segunda|tercera|cuarta|quinta|sexta|s[eé]ptima|octava|novena|d[eé]cima)\s+(aumentada|disminuida|mayor|menor|justa)/.exec(a);
  if (m1) { numero = Number(m1[1]); calidad = m1[2]; }
  else if (m2) { numero = ORDINAL[m2[1]]; calidad = m2[2]; }
  else if (/^un[ií]sono\b/.test(a)) { numero = 1; calidad = 'justa'; }
  return numero ? { numero, calidad } : null;
}

/** Calidad (mayor, menor, justa...) de un intervalo dado por numero y semitonos. */
function calidadDe(numero, sem) {
  const octavas = Math.floor((numero - 1) / 7), simple = ((numero - 1) % 7) + 1;
  const d = sem - 12 * octavas - BASE_INT[simple];
  const t = JUSTOS.has(simple) ? { 0: 'Justa', 1: 'Aumentada', '-1': 'Disminuida' } : { 0: 'Mayor', '-1': 'menor', 1: 'Aumentada', '-2': 'Disminuida' };
  return t[d] || null;
}
const nombreIntervalo = (a, b) => {
  const num = Math.abs(paso(b) - paso(a)) + 1;
  const c = calidadDe(num, Math.abs(semis(b) - semis(a)));
  return { num, calidad: c, texto: num + 'ª ' + c };
};
const COMPLEMENTO = { Mayor: 'menor', menor: 'Mayor', Justa: 'Justa', Aumentada: 'Disminuida', Disminuida: 'Aumentada' };
/**
 * Inversion (metodo de la pagina): la PRIMERA nota queda fija y se mueve la SEGUNDA, N octavas hacia el otro lado
 * (si el intervalo asciende, la segunda baja; si desciende, sube). N = 1 en los simples (numeros suman 9) y
 * N = 3 en los compuestos (suman 23). La calidad se complementa.
 */
function coherenciaInversion(spec, compasesAlt) {
  const err = [];
  if (!spec.inversion) return err;
  const [c1, c2] = compasesAlt.map((c) => c.flatMap((e) => e.notas));
  if (!c2) return ['la inversion necesita dos compases'];
  const sube = semis(c1[1]) > semis(c1[0]);
  const esperada = { ...c1[1], octava: c1[1].octava + (sube ? -1 : 1) * spec.inversion.octavas };
  const mismo = (x, y) => x.letra === y.letra && x.alt === y.alt && x.octava === y.octava;
  if (!mismo(c2[0], c1[0])) err.push('la primera nota tiene que quedarse fija');
  if (!mismo(c2[1], esperada)) err.push('la segunda nota tiene que ' + (sube ? 'bajar' : 'subir') + ' ' + spec.inversion.octavas + ' octava(s)');
  const i1 = nombreIntervalo(c1[0], c1[1]), i2 = nombreIntervalo(c2[0], c2[1]);
  const quiereSuma = spec.inversion.octavas === 1 ? 9 : spec.inversion.octavas === 3 ? 23 : null;
  if (quiereSuma && i1.num + i2.num !== quiereSuma) err.push('los numeros ' + i1.num + ' y ' + i2.num + ' no suman ' + quiereSuma);
  if (COMPLEMENTO[i1.calidad] !== i2.calidad) err.push('la calidad ' + i1.calidad + ' no se complementa con ' + i2.calidad);
  const et = (spec.etiquetas || []).map((e) => e.texto);
  if (et.length === 2 && (et[0] !== i1.texto || et[1] !== i2.texto)) err.push('los rotulos dicen «' + et.join(' → ') + '» y las notas son «' + i1.texto + ' → ' + i2.texto + '»');
  return err;
}

/** Errores de coherencia entre el dibujo previsto y el alt de la pagina. */
function coherenciaConAlt(spec, notasPlanas, alt) {
  const err = [];
  const nombradas = notasDelAlt(alt);
  const unison = /un[ií]sono/i.test(alt) && !/\d+\s*[ªº]/.test(alt);
  const esperadas = notasPlanas.map((n) => ({ letra: n.letra, alt: n.alt }));
  if (spec.sinAlt) return err;
  if (unison && nombradas.length === 1) {
    if (!esperadas.every((n) => n.letra === nombradas[0].letra && n.alt === nombradas[0].alt)) err.push(`el alt dice unisono de ${NOMBRE[nombradas[0].letra]} y el dibujo es ${esperadas.map(nombre).join(', ')}`);
  } else if (nombradas.length >= 2 && !spec.altLibre) {
    if (JSON.stringify(nombradas) !== JSON.stringify(esperadas)) err.push(`el alt nombra ${nombradas.map(nombre).join(', ')} y el dibujo es ${esperadas.map(nombre).join(', ')}`);
  }
  err.push(...coherenciaAcorde(spec, notasPlanas, alt));
  err.push(...coherenciaCifrado(spec, notasPlanas));
  const iv = intervaloDelAlt(alt);
  if (iv && (spec.par || notasPlanas.length === 2) && !spec.altLibre && spec.regla !== 'sin-intervalo') {
    const a = spec.par ? notasPlanas[spec.par[0]] : notasPlanas[0], b = spec.par ? notasPlanas[spec.par[1]] : notasPlanas[notasPlanas.length - 1];
    const letras = Math.abs(paso(b) - paso(a)), sem = Math.abs(semis(b) - semis(a));
    const quiere = semitonosDe(iv.numero, iv.calidad);
    if (letras !== iv.numero - 1) err.push(`el alt dice ${iv.numero}ª y las notas estan a ${letras + 1}ª`);
    if (quiere === null) err.push(`calidad desconocida: ${iv.calidad}`);
    else if (sem !== quiere) err.push(`una ${iv.numero}ª ${iv.calidad} tiene ${quiere} semitonos y el dibujo tiene ${sem}`);
  }
  return err;
}

/* ---------- acordes: estructura, calidad e inversion ---------- */
const CALIDADES = {
  mayor: [0, 4, 7], menor: [0, 3, 7], aumentada: [0, 4, 8], disminuida: [0, 3, 6],
  'septima-dominante': [0, 4, 7, 10], 'septima-mayor': [0, 4, 7, 11], 'septima-menor': [0, 3, 7, 10],
  'septima-sensible': [0, 3, 6, 10], 'septima-disminuida': [0, 3, 6, 9],
};
/** Busca la nota que, tomada como fundamental, apila las demas de tercera en tercera. */
function analizarAcorde(notas) {
  const n = notas.length;
  const orden = [...notas].sort((a, b) => semis(a) - semis(b) || paso(a) - paso(b));
  for (let k = 0; k < n; k++) {
    const raiz = orden[k];
    const letras = orden.map((x) => (paso(x) - paso(raiz) + 70) % 7).sort((a, b) => a - b);
    if (JSON.stringify(letras) === JSON.stringify([0, 2, 4, 6].slice(0, n))) {
      const semitonos = orden.map((x) => (semis(x) - semis(raiz) + 120) % 12).sort((a, b) => a - b);
      return { raiz, inversion: (n - k) % n, semitonos };
    }
  }
  return null;
}
const nombreCalidad = (sem) => Object.keys(CALIDADES).find((k) => JSON.stringify(CALIDADES[k]) === JSON.stringify(sem)) || null;

/** Lo que el alt dice del acorde: {calidad, inversion} (cualquiera puede ser null). */
function acordeDelAlt(alt) {
  const a = alt.toLowerCase();
  let calidad = null;
  if (/s[eé]ptima disminuida/.test(a)) calidad = 'septima-disminuida';
  else if (/s[eé]ptima de sensible|semidisminuid/.test(a)) calidad = 'septima-sensible';
  else if (/s[eé]ptima de dominante/.test(a)) calidad = 'septima-dominante';
  else if (/s[eé]ptima mayor/.test(a)) calidad = 'septima-mayor';
  else if (/s[eé]ptima menor/.test(a)) calidad = 'septima-menor';
  else if (/perfecto mayor|tr[ií]ada mayor/.test(a)) calidad = 'mayor';
  else if (/perfecto menor|tr[ií]ada menor/.test(a)) calidad = 'menor';
  else if (/acorde aumentado|acorde de quinta aumentada|tr[ií]ada aumentada/.test(a)) calidad = 'aumentada';
  else if (/acorde disminuido|acorde de quinta disminuida|tr[ií]ada disminuida/.test(a)) calidad = 'disminuida';
  let inversion = null;
  if (/estado fundamental|\bfundamental\b/.test(a)) inversion = 0;
  else if (/primera inversi[oó]n|1[ªº]\s*inversi[oó]n/.test(a)) inversion = 1;
  else if (/segunda inversi[oó]n|2[ªº]\s*inversi[oó]n/.test(a)) inversion = 2;
  else if (/tercera inversi[oó]n|3[ªº]\s*inversi[oó]n/.test(a)) inversion = 3;
  return { calidad, inversion };
}

/** Comprobaciones de un acorde (>=3 notas) contra el alt. */
function coherenciaAcorde(spec, notas, alt) {
  const err = [];
  if (notas.length < 3 || spec.altLibre) return err;
  const an = analizarAcorde(notas);
  const dice = acordeDelAlt(alt);
  if (!an) { if (dice.calidad || dice.inversion !== null) err.push('las notas no forman un acorde de terceras apiladas'); return err; }
  if (dice.calidad) {
    const real = nombreCalidad(an.semitonos);
    if (real !== dice.calidad) err.push(`el alt dice «${dice.calidad}» y las notas forman «${real || 'ningun acorde conocido'}» (${an.semitonos.join('-')})`);
  }
  if (dice.inversion !== null && dice.inversion !== an.inversion) err.push(`el alt dice inversion ${dice.inversion} y el dibujo esta en inversion ${an.inversion}`);
  return err;
}

const GLIFO_CIFRA = { '♯': '#', '♭': 'b', '♮': 'n', x: '##', '♭♭': 'bb' };
/** Cifrado (numeros bajo el acorde): cada alteracion que dice la cifra tiene que estar en la nota que le toca. */
function coherenciaCifrado(spec, notas) {
  const err = [];
  if (!spec.cifrado) return err;
  const bajo = notas[0];
  const ordinal = (nota) => ((paso(nota) - paso(bajo)) % 7) + 1;       // 1 = bajo, 3 = tercera, 5 = quinta...
  const en = (num) => notas.find((n) => ordinal(n) === num || (num === 8 && ordinal(n) === 1 && n !== bajo));
  const numerales = [];
  spec.cifrado.forEach((f) => {
    const m = /^(♭♭|[♯♭♮x])?(\+)?(\d)?$/.exec(f.t);
    if (!m) { err.push(`cifra «${f.t}» no reconocida`); return; }
    const glifo = m[1], mas = m[2], num = m[3] ? Number(m[3]) : null;
    const objetivo = en(num || 3);
    if (num) numerales.push(num);
    if (!objetivo) { err.push(`la cifra «${f.t}» habla de una ${num || 3}ª que no esta en el acorde`); return; }
    if (glifo) {
      const quiere = GLIFO_CIFRA[glifo];
      const real = ({ '-2': 'bb', '-1': 'b', 0: 'n', 1: '#', 2: '##' })[objetivo.alt];
      if (real !== quiere || (quiere === 'n' && !objetivo.natural)) err.push(`la cifra «${f.t}» pide ${quiere} en la ${num || 3}ª y la nota es ${nombre(objetivo)}${objetivo.natural ? ' (con natural)' : ''}`);
    }
    if (mas) {
      const an0 = analizarAcorde(notas);
      const grado = spec.sensible === 'fundamental' ? 0 : 2;
      const marcada = an0 && notas.find((x) => ((paso(x) - paso(an0.raiz)) % 7 + 7) % 7 === grado);
      if (!marcada || objetivo !== marcada) err.push('la cifra «' + f.t + '» marca la sensible y esa nota no es ' + (grado ? 'la tercera' : 'la fundamental') + ' del acorde');
    }
    if (f.tachado && nombreIntervalo(bajo, objetivo).calidad !== 'Disminuida') err.push('una cifra tachada es un intervalo disminuido y ' + f.t + ' es ' + nombreIntervalo(bajo, objetivo).texto);
  });
  // el numero base de cada inversion (6 en 1.ª; 6 y 4 en 2.ª)
  const an = analizarAcorde(notas);
  if (an && notas.length === 3) {
    if (an.inversion === 1 && !numerales.includes(6)) err.push('una primera inversion lleva 6 en la cifra');
    if (an.inversion === 2 && !(numerales.includes(6) && numerales.includes(4))) err.push('una segunda inversion lleva 6 y 4 en la cifra');
    if (an.inversion === 0 && (numerales.includes(6) || numerales.includes(4))) err.push('un acorde en estado fundamental no lleva 6 ni 4');
  }
  return err;
}

/* ---------- dibujo ---------- */
function cabezas(svg) {
  const res = [];
  const re = /<g id="(n\d+)" class="note"[^>]*>[\s\S]*?<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g;
  let m;
  while ((m = re.exec(svg))) res.push({ id: m[1], g: m[2], x: Number(m[3]), y: Number(m[4]) });
  return res;
}
function lineasPentagrama(svg) {
  // las lineas del pentagrama tienen grosor 13 (las adicionales, 22; las plicas y barras, otros)
  return [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);
}

/** Alarga las lineas del pentagrama hasta `anchoPx` y deja sitio para las etiquetas/flechas; devuelve el svg. */
function ajustar(svg, anchoPx, extraAbajo, extraArriba) {
  let s = svg;
  const vb = /^<svg viewBox="0 0 (\d+) (\d+)"/.exec(s);
  const anchoNat = Number(vb[1]) * PX_POR_UNIDAD;
  if (anchoPx && anchoPx > anchoNat) {
    // se alarga solo el ULTIMO compas: sus 5 lineas son las ultimas 5 de grosor 13
    const delta = Math.round((anchoPx - anchoNat) / PX_POR_UNIDAD * 25);
    const total = (s.match(/<path d="M\d+ \d+ L\d+ \d+" stroke-width="13"/g) || []).length;
    let k = 0;
    s = s.replace(/(<path d="M\d+ \d+ L)(\d+)( \d+" stroke-width="13")/g, (m, a1, x, c) => (k++ >= total - 5 ? a1 + (Number(x) + delta) + c : m));
    s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 0 )(\d+)( )/, (m, a1, w, c) => a1 + (Number(w) + delta) + c);
    s = s.replace(/^(<svg viewBox="0 0 )(\d+)( )/, (m, a1, w, c) => a1 + (Number(w) + Math.round(delta / 25)) + c);
  }
  return s;
}

function conExtras(svg, spec, notas, cabs) {
  // etiquetas de texto y flechas: se colocan sobre las cabezas reales
  const lineas = lineasPentagrama(svg);
  const yTop = lineas[0], yBot = lineas[lineas.length - 1];
  let grupo = '', abajo = yBot, arriba = yTop;
  const et = spec.etiquetas || [];
  if (et.length) {
    const ts = et.map((e) => {
      const anchoNested = Number(/class="definition-scale"[^>]*viewBox="0 0 ([0-9]+) /.exec(svg)[1]);
      const x = e.centro ? Math.round(anchoNested / 2) : Math.round(cabs[e.nota].x + 152);
      const y = e.ref === 'nota' ? Math.round(cabs[e.nota].y + (e.dy || 0)) : e.ref === 'arriba' ? Math.round(Math.min(yTop - (e.dy || 360), Math.min(...cabs.map((c) => c.y)) - 560)) : Math.round(yBot + (e.dy || 800));
      if (e.ref === 'arriba') arriba = Math.min(arriba, y - 300); else abajo = Math.max(abajo, y);
      const estilo = (e.size ? ` font-size="${e.size}"` : '') + (e.weight ? ` font-weight="${e.weight}"` : '') + (e.family ? ` font-family="${e.family}"` : '');
      const tach = e.tachado ? `<path class="tm-tachado" fill="none" stroke="${e.color || '#1a1a1a'}" stroke-width="40" stroke-linecap="round" d="M${x - 180} ${y - 20}L${x + 180} ${y - 320}"/>` : '';
      return `<text x="${x + (e.dx || 0)}" y="${y}" fill="${e.color || '#1a1a1a'}"${estilo}>${e.texto}</text>${tach}`;
    }).join('');
    grupo += `<g class="tm-etiquetas" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="300" text-anchor="middle">${ts}</g>`;
  }
  if (spec.flecha) {   // flecha de sentido (ascendente/descendente), dibujada como trazo
    const x = Math.round(cabs[cabs.length - 1].x + 700), sube = spec.flecha === 'sube';
    const y1 = sube ? yTop - 150 : yTop - 700, y2 = sube ? yTop - 700 : yTop - 150;
    const x1 = x - 220, x2 = x + 220;
    const punta = sube ? `M${x2 - 190} ${y2}H${x2}V${y2 + 190}` : `M${x2 - 190} ${y2}H${x2}V${y2 - 190}`;
    grupo += `<g class="tm-flecha" fill="none" stroke="#1a1a1a" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"><path d="M${x1} ${sube ? y1 : y1}L${x2} ${y2}"/><path d="${punta}"/></g>`;
    arriba = Math.min(arriba, yTop - 800);
  }
  if (spec.resaltar) {
    const [i, j] = spec.par;
    const yy = [cabs[i].y, cabs[j].y];
    const accX = [...svg.matchAll(/class="accid"[^>]*>[^<]*<use [^>]*translate[(]([0-9.]+),/g)].map((m) => Number(m[1]));
    const xIzq = Math.min(...cabs.map((c) => c.x), ...accX) - 210;
    const y1 = Math.round(Math.min(...yy) - 150), y2 = Math.round(Math.max(...yy) + 150);
    grupo += `<path class="tm-corchete" fill="none" stroke="#1a1a1a" stroke-width="34" stroke-linejoin="miter" d="M${Math.round(xIzq + 130)} ${y1}H${Math.round(xIzq)}V${y2}H${Math.round(xIzq + 130)}"/>`;
  }
  if (!grupo) return svg;
  // sitio: debajo y encima del pentagrama
  let s = svg;
  const h0 = Number(/class="definition-scale"[^>]*viewBox="0 0 \d+ (\d+)"/.exec(s)[1]);
  const necesitaAbajo = Math.round(Math.max(h0, abajo + 340));
  s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 0 \d+ )\d+(")/, `$1${necesitaAbajo}$2`).replace(/^(<svg viewBox="0 0 \d+ )\d+(")/, `$1${Math.round(necesitaAbajo / 25)}$2`);
  if (arriba < 200) {   // se sale por arriba: se desplaza todo hacia abajo
    const d = Math.round(200 - arriba);
    s = s.replace(/(<svg class="definition-scale"[^>]*viewBox="0 )0( \d+ )(\d+)(")/, (m, a, b, h, c) => `${a}${-d}${b}${Number(h) + d}${c}`);
    s = s.replace(/^(<svg viewBox="0 0 \d+ )(\d+)(")/, (m, a, h, c) => `${a}${Math.round((Number(h) + d / 25))}${c}`);
  }
  const i = s.lastIndexOf('</svg>', s.lastIndexOf('</svg>') - 1);
  return s.slice(0, i) + grupo + s.slice(i);
}

/* ---------- verificacion del SVG ---------- */
function verificarSVG(svg, spec, planas, compasesAlt, cabs) {
  const err = [];
  const cuenta = (re) => (svg.match(re) || []).length;
  const raiz = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!raiz || !new RegExp('#' + raiz + ' path').test(svg)) err.push('el estilo de Verovio no esta ligado al id de la raiz');
  const clavesEsperadas = [];
  compasesAlt.forEach((c, i) => { const k = c[0].clave; if (!i) clavesEsperadas.push(BASE_CLAVE[k].glifo); else if (k !== compasesAlt[i - 1][0].clave) clavesEsperadas.push(k === 'fa' ? 'E07C' : 'E07A'); });   // cambio de clave: glifo pequeño
  const clavesDibujadas = [...svg.matchAll(/class="clef"[\s\S]{0,260}?href="#(E0[0-9A-F]+)/g)].map((m) => m[1]);
  if (JSON.stringify(clavesDibujadas) !== JSON.stringify(clavesEsperadas)) err.push('claves dibujadas ' + JSON.stringify(clavesDibujadas) + ', previstas ' + JSON.stringify(clavesEsperadas));
  if (cuenta(/<g[^>]* class="meterSig"/g) || cuenta(/class="keyAccid"/g)) err.push('hay compas o armadura sin pedir');
  if (cabs.length !== planas.length) err.push(`${cabs.length} cabezas, debian ser ${planas.length}`);
  // altura de cada nota: contra las lineas del propio pentagrama (independiente de Verovio)
  const lineas = lineasPentagrama(svg);
  if (lineas.length !== 5 || lineas.some((y, k) => k && y - lineas[k - 1] !== ESPACIO)) err.push('el pentagrama no tiene 5 lineas');
  else {
    const yb = lineas[4];
    const orden = [...cabs].sort((a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1)));
    orden.forEach((c, k) => {
      const n = planas[k];
      const quiere = yb - (paso(n) - BASE_CLAVE[n.clave || spec.clave].paso) * PASO_Y;
      if (n && c.y !== quiere) err.push(`la nota ${k + 1} (${nombre(n)}${n.octava}) esta a y=${c.y} y le corresponde y=${quiere}`);
    });
  }
  // plicas: una por evento que no sea redonda
  const eventos = spec.compases.flat();
  const plicas = eventos.filter((e) => e.d !== 'w').length;
  if (cuenta(/class="stem"/g) !== plicas) err.push(`${cuenta(/class="stem"/g)} plicas, debian ser ${plicas}`);
  // alteraciones: numero y signo
  const quiereAcc = {};
  let nAcc = 0;
  compasesAlt.flat().forEach((e) => e.notas.forEach((n) => { if (n.muestra) { quiereAcc[GLIFO[n.alt]] = (quiereAcc[GLIFO[n.alt]] || 0) + 1; nAcc++; } }));
  const dib = {};
  (svg.match(/class="accid"[^>]*>\s*<use [^>]*href="#E2[0-9A-F]+/g) || []).forEach((g) => { const c = /#(E2[0-9A-F]+)/.exec(g)[1]; dib[c] = (dib[c] || 0) + 1; });
  if (JSON.stringify(Object.entries(dib).sort()) !== JSON.stringify(Object.entries(quiereAcc).sort())) err.push(`signos dibujados ${JSON.stringify(dib)}, previstos ${JSON.stringify(quiereAcc)}`);
  // texto: solo las etiquetas previstas
  const textos = (svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((t) => t.replace(/<[^>]+>/g, ''));
  const quiereT = (spec.etiquetas || []).map((e) => e.texto);
  if (JSON.stringify(textos) !== JSON.stringify(quiereT)) err.push(`texto ${JSON.stringify(textos)}, previsto ${JSON.stringify(quiereT)}`);
  if (cuenta(/class="tm-tachado"/g) !== (spec.etiquetas || []).filter((e) => e.tachado).length) err.push('numero de cifras tachadas distinto del previsto');
  const colores = [...new Set((svg.match(/color="#[0-9a-fA-F]{6}"/g) || []).map((c) => c.slice(7, 14).toLowerCase()))];
  const quiereColor = spec.resaltar ? ['#d00000'] : [];
  if (JSON.stringify(colores) !== JSON.stringify(quiereColor)) err.push('colores en el dibujo ' + JSON.stringify(colores) + ', previstos ' + JSON.stringify(quiereColor));
  if (cuenta(/class="tm-corchete"/g) !== (spec.resaltar ? 1 : 0)) err.push('corchete: numero distinto del previsto');
  return err;
}

/* ---------- conjuntos ---------- */
function cargarDatos(familia) { return require('./notacion/datos/' + familia + '.js'); }

const CONJUNTOS = {
  'intervalos-musicales':     { pagina: 'diccionario-musical/intervalos/intervalos-musicales', datos: 'intervalos' },
  'intervalos-armonicos':     { pagina: 'diccionario-musical/intervalos/intervalos-armonicos-y-melodicos', datos: 'intervalos' },
  'intervalos-conjuntos':     { pagina: 'diccionario-musical/intervalos/intervalos-conjuntos-y-disjuntos', datos: 'intervalos' },
  'intervalos-simples':       { pagina: 'diccionario-musical/intervalos/intervalos-simples-y-compuestos', datos: 'intervalos' },
  'ampliacion-reduccion':     { pagina: 'diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos', datos: 'intervalos' },
  'semitonos':                { pagina: 'diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico', datos: 'intervalos' },
  'inversion':                { pagina: 'diccionario-musical/intervalos/inversion', datos: 'intervalos' },
  'unisono-enarmonicas':      { pagina: 'diccionario-musical/intervalos/unisono-y-notas-enarmonicas', datos: 'intervalos' },
  'acorde-mayor':             { pagina: 'diccionario-musical/acordes/acorde-perfecto-mayor', datos: 'acordes' },
  'acorde-menor':             { pagina: 'diccionario-musical/acordes/acorde-perfecto-menor', datos: 'acordes' },
  'acorde-aumentado':         { pagina: 'diccionario-musical/acordes/acorde-aumentado', datos: 'acordes' },
  'acorde-disminuido':        { pagina: 'diccionario-musical/acordes/acorde-disminuido', datos: 'acordes' },
  'septima-mayor':            { pagina: 'diccionario-musical/acordes/acorde-de-septima-mayor', datos: 'acordes' },
  'septima-menor':            { pagina: 'diccionario-musical/acordes/acorde-de-septima-menor', datos: 'acordes' },
  'acordes-septima':          { pagina: 'diccionario-musical/acordes/acordes-de-septima', datos: 'acordes' },
  'septima-dominante':        { pagina: 'diccionario-musical/acordes/acorde-de-septima-de-dominante', datos: 'acordes-septimas' },
  'septima-sensible':         { pagina: 'diccionario-musical/acordes/acorde-de-septima-de-sensible', datos: 'acordes-septimas' },
  'septima-disminuida':       { pagina: 'diccionario-musical/acordes/acorde-de-septima-disminuida', datos: 'acordes-septimas' },
  'acordes-triadas':          { pagina: 'diccionario-musical/acordes/acordes-triadas', datos: 'acordes' },
};

async function main() {
  const nombreC = process.argv[2];
  const poner = process.argv.includes('--poner');
  if (nombreC === '--lista' || !CONJUNTOS[nombreC]) {
    console.log('conjuntos: ' + Object.keys(CONJUNTOS).join(', '));
    process.exit(nombreC === '--lista' ? 0 : 1);
  }
  const cfg = CONJUNTOS[nombreC];
  const datos = cargarDatos(cfg.datos);
  const porArchivo = new Map();
  datos.forEach((d) => (d.archivos || []).forEach((a) => porArchivo.set(norm(a), d)));

  const htmlPath = path.join(RAIZ, cfg.pagina, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const reImg = /(?:<a [^>]*>)?(?:<picture>(?:<source[^>]*>)*)?<img\b[^>]*>(?:<\/picture>)?(?:<\/a>)?/g;
  const imgs = [];
  let m;
  while ((m = reImg.exec(html))) {
    const src = (/src="([^"]+)"/.exec(m[0]) || [])[1] || '';
    const alt = ((/alt="([^"]*)"/.exec(m[0]) || [])[1] || '').replace(/&amp;/g, '&');
    const base = norm(decodeURIComponent(src.split('/').pop()));
    const yaSvg = /\.svg$/.test(src);
    const clave = yaSvg ? norm(base.replace(/\.svg$/, '')) : null;
    const spec = yaSvg ? datos.find((d) => d.slug === clave) : porArchivo.get(base);
    if (!spec) { if (/assets\/img\/(intervalos|20)/.test(src) && !/favicon/.test(src)) console.log(`(sin datos, se deja: ${base})`); continue; }
    imgs.push({ trozo: m[0], spec, alt, src });
  }
  if (!imgs.length) throw new Error('no hay imagenes de esta familia en la pagina');

  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  fs.mkdirSync(path.join(RAIZ, SALIDA, cfg.datos), { recursive: true });

  const hechos = new Map();
  let fallos = 0;
  for (const im of imgs) {
    const spec = preparaSpec(im.spec);
    const clave = spec.slug;
    if (hechos.has(clave)) { im.hecho = hechos.get(clave); continue; }
    try {
      const compasesAlt = conAlteraciones(spec.compases);
      const planas = compasesAlt.flat().flatMap((e) => e.notas);
      if (spec.resaltar) {
        planas.forEach((n, k) => { n.color = spec.par.includes(k) ? '#d00000' : undefined; });
        const iv = nombreIntervalo(planas[spec.par[0]], planas[spec.par[1]]);
        spec.etiquetas = (spec.etiquetas || []).map((e) => (e.texto === 'auto' ? { ...e, texto: iv.texto } : e));
        if (im.spec.etiquetas) im.spec.etiquetas = spec.etiquetas;
      }
      const mei = aMEI(compasesAlt, spec.clave, !!spec.resaltar);
      const e = coherenciaConAlt(im.spec, planas, im.alt);
      e.push(...coherenciaInversion(im.spec, compasesAlt));
      // MEI releido = lo previsto
      const leido = leerMEI(mei);
      compasesAlt.forEach((c, i) => c.forEach((ev, j) => {
        const l = (leido[i] && leido[i][j]) || [];
        if (l.length !== ev.notas.length || ev.notas.some((n, k) => !l[k] || l[k].letra !== n.letra || l[k].octava !== n.octava || l[k].alt !== n.alt)) e.push(`el MEI escribe mal el evento ${j + 1} del compas ${i + 1}`);
      }));
      tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash(clave), spacingLinear: spec.separacion || 0.25, spacingNonLinear: 0.6 }));
      if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
      if (tk.getPageCount() !== 1) e.push('sale en mas de una pagina');
      let svg = ajustar(tk.renderToSVG(1), spec.ancho || 420);
      const cabs = cabezas(svg).sort((a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1)));
      svg = conExtras(svg, spec, planas, cabs);
      e.push(...verificarSVG(svg, spec, planas, compasesAlt, cabs));
      const listo = preparar(svg, im.alt);
      if (e.length) throw new Error(e.join('\n   - '));
      fs.writeFileSync(path.join(RAIZ, SALIDA, cfg.datos, clave + '.svg'), listo.svg);
      const hecho = { clave, w: listo.w, h: listo.h };
      hechos.set(clave, hecho); im.hecho = hecho;
      console.log(`✓ ${clave.padEnd(34)} ${String(listo.svg.length).padStart(5)} B · ${listo.w}×${listo.h}  ${compasesAlt.map((c) => c.map((ev) => ev.notas.map((n) => nombre(n) + n.octava).join('+')).join(' ')).join(' | ')}`);
    } catch (err) {
      fallos++;
      console.log(`✗ ${clave}  (alt: ${im.alt.slice(0, 60)})\n   - ${err.message}`);
    }
  }
  if (fallos) { console.log(`\n${fallos} imagen(es) no pasan la verificacion: no se toca la pagina`); process.exit(1); }

  if (poner) {
    for (const im of imgs) {
      const h = im.hecho;
      const alt = (/alt="([^"]*)"/.exec(im.trozo) || [])[0] || 'alt=""';
      const resto = (/<img\b([^>]*)>/.exec(im.trozo) || [])[1] || '';
      const loading = /loading="lazy"/.test(resto) ? ' loading="lazy"' : '';
      const nuevo = `<img src="/${SALIDA}/${cfg.datos}/${h.clave}.svg" width="${h.w}" height="${h.h}" ${alt}${loading} decoding="async">`;
      html = html.replace(im.trozo, () => nuevo);
    }
    fs.writeFileSync(htmlPath, html);
    console.log(`\nescrito ${cfg.pagina}/index.html: ${imgs.length} imagenes`);
  } else console.log(`\n${imgs.length} imagenes localizadas (usa --poner para sustituirlas)`);
}

if (require.main === module) main().catch((e) => { console.error('✗', e.message); process.exit(1); });
module.exports = { nota, semitonosDe, intervaloDelAlt, notasDelAlt, coherenciaConAlt };
