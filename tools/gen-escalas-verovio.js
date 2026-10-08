'use strict';
/**
 * Escalas de las paginas del diccionario, dibujadas con Verovio y guardadas como SVG.
 *
 *   node tools/gen-escalas-verovio.js <conjunto>            # prueba: genera, verifica y escribe los SVG
 *   node tools/gen-escalas-verovio.js <conjunto> --poner     # ademas sustituye los <img> PNG de la pagina
 *   node tools/gen-escalas-verovio.js --lista                # conjuntos disponibles
 *
 * POR QUE: eran PNG antiguos (WordPress, 2020) que nadie habia verificado y que no se pueden
 * revisar por codigo. Aqui cada escala sale de su DEFINICION (tonica + grados del tipo), y se
 * comprueba por tres vias independientes entre si:
 *   1. la teoria: letras consecutivas, semitonos reales entre notas, armadura;
 *   2. el MEI ya escrito: un interprete lee el fichero (armadura + alteraciones del compas) y la
 *      altura que sale tiene que ser la prevista;
 *   3. la tabla de notas de la propia pagina (cuando la hay): las 7 notas tienen que coincidir.
 * Y despues se comprueba el dibujo (cabezas, armadura, alteraciones, notas en rojo, corchetes).
 */
const fs = require('fs');
const path = require('path');
const Modos = require('./escalas-modos.js');

const RAIZ = path.join(__dirname, '..');
const SALIDA = 'assets/img/escalas';

/* ======================= teoria ======================= */
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const PC_NATURAL = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const LETRA_DE = { Do: 'c', Re: 'd', Mi: 'e', Fa: 'f', Sol: 'g', La: 'a', Si: 'b' };
// OJO: en MEI «ss» son DOS sostenidos juntos (glifo ##); el doble sostenido (x) es «x»
const ALT_MEI = { '-2': 'ff', '-1': 'f', 0: 'n', 1: 's', 2: 'x' };
const MEI_ALT = { ff: -2, f: -1, n: 0, s: 1, x: 2 };
// glifos SMuFL de cada alteracion
const GLIFO = { '-2': 'E264', '-1': 'E260', 0: 'E261', 1: 'E262', 2: 'E263' };
const ALT_TXT = { '-2': '♭♭', '-1': '♭', 0: '', 1: '♯', 2: '𝄪' };
const ALT_ARCHIVO = { '-1': '-bemol', 0: '', 1: '-sostenido' };
const QUINTAS_BASE = { f: -1, c: 0, g: 1, d: 2, a: 3, e: 4, b: 5 };   // sostenidos (+) / bemoles (-) de la mayor sin alterar
const ORDEN_SOSTENIDOS = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
const ORDEN_BEMOLES = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];
const ROJO = '#d00000';

const pcDe = (letra, alt) => (PC_NATURAL[letra] + alt + 120) % 12;
const nombreNota = (n) => NOMBRE[n.letra] + ALT_TXT[n.alt];
const semitonosAbs = (n) => (n.octava + 1) * 12 + PC_NATURAL[n.letra] + n.alt;

/**
 * TIPOS: cada escala es una lista de semitonos desde la tonica (`offs`, ya con la octava) y, si
 * es diatonica de verdad, la letra de cada nota (`pasos`: una letra por grado, asi sale la
 * ortografia correcta). Las cromaticas y de tonos enteros no tienen letras fijas: la ortografia
 * se lee de la tabla de la propia pagina (`tabla: true`).
 * `fam` decide de que escala "natural" cuelga (mayor o menor natural): de ella salen la armadura y
 * las notas que van en rojo (las que cambian respecto a esa escala). `fam: 'otra'`: sin armadura.
 */
const MAYOR = [0, 2, 4, 5, 7, 9, 11];
const MENOR = [0, 2, 3, 5, 7, 8, 10];
const PASOS7 = [0, 1, 2, 3, 4, 5, 6, 7];
const TIPOS = {
  'mayor':           { fam: 'mayor', nombre: 'Mayor Natural',          grados: MAYOR, notas: 8 },
  'mixta-principal': { fam: 'mayor', nombre: 'Mayor Mixta Principal',  grados: [0, 2, 4, 5, 7, 8, 11], notas: 8 },
  'mixta-secundaria':{ fam: 'mayor', nombre: 'Mayor Mixta Secundaria', grados: [0, 2, 4, 5, 7, 8, 10], notas: 8 },
  'mixolidia':       { fam: 'mayor', nombre: 'Mayor Mixolidia',        grados: [0, 2, 4, 5, 7, 9, 10], notas: 8 },
  'menor-natural':   { fam: 'menor', nombre: 'menor natural',          grados: MENOR, notas: 8 },
  'menor-armonica':  { fam: 'menor', nombre: 'menor armónica',         grados: [0, 2, 3, 5, 7, 8, 11], notas: 8 },
  'menor-melodica':  { fam: 'menor', nombre: 'menor melódica',         grados: [0, 2, 3, 5, 7, 9, 11], baja: MENOR, notas: 15 },
  'menor-dorica':    { fam: 'menor', nombre: 'menor dórica',           grados: [0, 2, 3, 5, 7, 9, 10], notas: 8 },
  // ---- otras escalas: sin armadura, sin notas en rojo ----
  'pentatonica-mayor': { fam: 'otra', nombre: 'pentatónica mayor', pasos: [0, 1, 2, 4, 5, 7], offs: [0, 2, 4, 7, 9, 12], notas: 6 },
  'pentatonica-menor': { fam: 'otra', nombre: 'pentatónica menor', pasos: [0, 2, 3, 4, 6, 7], offs: [0, 3, 5, 7, 10, 12], notas: 6 },
  'blues-menor':     { fam: 'otra', nombre: 'de blues menor',        pasos: [0, 2, 3, 4, 4, 6, 7], offs: [0, 3, 5, 6, 7, 10, 12], notas: 7 },
  'hispano-arabe':   { fam: 'otra', nombre: 'hispano-árabe',         grados: [0, 1, 4, 5, 7, 8, 10], notas: 8 },
  'oriental':        { fam: 'otra', nombre: 'oriental (húngara)',    grados: [0, 2, 3, 6, 7, 8, 11], notas: 8 },
  'oriental-doble':  { fam: 'otra', nombre: 'oriental mayor (doble armónica)', grados: [0, 1, 4, 5, 7, 8, 11], notas: 8 },
  'oriental-persichetti': { fam: 'otra', nombre: 'oriental según Persichetti', grados: [0, 1, 4, 5, 6, 9, 10], notas: 8 },
  'cromatica':       { fam: 'otra', nombre: 'cromática',             tabla: true, offs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], notas: 13 },
  // La tabla de la pagina solo trae las 2 escalas distintas (desde Do y desde Do♯); el resto se escribe con
  // la regla de «las menos alteraciones posibles» (ver ortografiaMinima), que reproduce esas dos filas.
  'tonos-enteros':   { fam: 'otra', nombre: 'de tonos enteros',      tabla: true, minima: true, offs: [0, 2, 4, 6, 8, 10, 12], notas: 7 },
};
for (const t of Object.values(TIPOS)) {
  if (!t.offs) { t.offs = [...t.grados, 12]; t.pasos = PASOS7; }
}

/**
 * Segunda definicion, INDEPENDIENTE de la primera y escrita como distancias entre notas contiguas
 * (en semitonos) en vez de grados. Solo se usa para comprobar: si una de las dos tiene una errata,
 * no coinciden. (Una unica definicion no puede detectar su propio error.)
 */
const DISTANCIAS = {
  'mayor': [2, 2, 1, 2, 2, 2, 1], 'mixta-principal': [2, 2, 1, 2, 1, 3, 1], 'mixta-secundaria': [2, 2, 1, 2, 1, 2, 2],
  'mixolidia': [2, 2, 1, 2, 2, 1, 2], 'menor-natural': [2, 1, 2, 2, 1, 2, 2], 'menor-armonica': [2, 1, 2, 2, 1, 3, 1],
  'menor-melodica': [2, 1, 2, 2, 2, 2, 1], 'menor-dorica': [2, 1, 2, 2, 2, 1, 2],
  'pentatonica-mayor': [2, 2, 3, 2, 3], 'pentatonica-menor': [3, 2, 2, 3, 2], 'blues-menor': [3, 2, 1, 1, 3, 2],
  'hispano-arabe': [1, 3, 1, 2, 1, 2, 2], 'oriental': [2, 1, 3, 1, 1, 3, 1], 'oriental-doble': [1, 3, 1, 2, 1, 3, 1],
  'oriental-persichetti': [1, 3, 1, 1, 3, 1, 2], 'cromatica': Array(12).fill(1), 'tonos-enteros': Array(6).fill(2),
};

/** Lista de notas (paso diatonico desde la tonica + semitonos) de una escala. */
function secuencia(tipo) {
  const t = TIPOS[tipo];
  const sube = t.offs.map((off, k) => ({ paso: t.pasos ? t.pasos[k] : undefined, off, dir: 'sube' }));
  if (!t.baja) return sube;
  const baja = [...t.baja].reverse().map((off, k) => ({ paso: 6 - k, off, dir: 'baja' }));   // 7 notas: del 7.º grado a la tonica final
  return sube.concat(baja);
}

/** Alteracion (-2..2) que necesita una nota de esa letra para sonar en ese pc. */
const alteracion = (letra, pcObjetivo) => ((pcObjetivo - PC_NATURAL[letra] + 6 + 12) % 12) - 6;

/**
 * Ortografia de «las menos alteraciones posibles» para escalas sin letras fijas (tonos enteros):
 * cada nota natural si puede serlo; si no, con sostenido si la tonica es natural o sostenida, y con
 * bemol si la tonica es bemol. Nunca dobles alteraciones. Reproduce las filas de la pagina de tonos enteros.
 */
function ortografiaMinima(tonica, alt, offs) {
  const pcT = pcDe(tonica, alt);
  return offs.slice(0, -1).map((off, k) => {
    if (k === 0) return { letra: tonica, alt };
    const pc = (pcT + off) % 12;
    const natural = LETRAS.find((l) => PC_NATURAL[l] === pc);
    if (natural) return { letra: natural, alt: 0 };
    const sost = LETRAS.find((l) => PC_NATURAL[l] === (pc + 11) % 12);
    const bem = LETRAS.find((l) => PC_NATURAL[l] === (pc + 1) % 12);
    return alt < 0 ? { letra: bem, alt: -1 } : { letra: sost, alt: 1 };
  });
}

/** `fila`: ortografia leida de la tabla de la pagina (solo para los tipos con `tabla`). */
function construir(tonica, alt, tipo, fila) {
  const t = TIPOS[tipo];
  const i0 = LETRAS.indexOf(tonica);
  const octT = tonica === 'b' ? 3 : 4;
  const base = octT * 7 + i0;
  const pcT = pcDe(tonica, alt);
  if (t.tabla && t.minima && !(fila && fila.length >= t.offs.length - 1)) fila = ortografiaMinima(tonica, alt, t.offs);
  if (t.tabla && (!fila || fila.length < t.offs.length - 1)) throw new Error('la tabla de la pagina no trae la ortografia de esta tonica');
  return secuencia(tipo).map((s, k) => {
    if (t.tabla) {
      // letra y alteracion vienen de la tabla (la octava final repite la tonica); la octava sale de la altura
      const c = k === t.offs.length - 1 ? { letra: tonica, alt } : fila[k];
      const abs = (octT + 1) * 12 + PC_NATURAL[tonica] + alt + s.off;
      const o = (abs - c.alt - PC_NATURAL[c.letra]) / 12 - 1;
      if (!Number.isInteger(o)) throw new Error(`la tabla escribe ${NOMBRE[c.letra]}${ALT_TXT[c.alt]} donde deberia sonar otra altura`);
      return { letra: c.letra, octava: o, alt: c.alt, paso: undefined, off: s.off, dir: s.dir };
    }
    const pos = base + s.paso;
    const letra = LETRAS[pos % 7];
    const a = alteracion(letra, (pcT + s.off) % 12);
    if (Math.abs(a) > 2) throw new Error(`${NOMBRE[tonica]}${ALT_TXT[alt]}: ${NOMBRE[letra]} necesitaria ${a} alteraciones`);
    return { letra, octava: Math.floor(pos / 7), alt: a, paso: s.paso, off: s.off, dir: s.dir };
  });
}

/** Quintas (sostenidos + / bemoles -) de una tonica mayor; null si pasa de 7. */
function quintasMayor(letra, alt) {
  const q = QUINTAS_BASE[letra] + 7 * alt;
  return Math.abs(q) <= 7 ? q : null;
}

/** Armadura (en quintas) de la escala "natural" de la que cuelga este tipo. */
function armaduraDe(tonica, alt, tipo) {
  if (TIPOS[tipo].fam === 'otra') return null;
  if (TIPOS[tipo].fam === 'mayor') return quintasMayor(tonica, alt);
  const rl = LETRAS[(LETRAS.indexOf(tonica) + 2) % 7];                      // la relativa mayor: 3 semitonos arriba
  return quintasMayor(rl, alteracion(rl, (pcDe(tonica, alt) + 3) % 12));
}

function alteracionesArmadura(q) {
  const m = {};
  if (q > 0) ORDEN_SOSTENIDOS.slice(0, q).forEach((l) => { m[l] = 1; });
  if (q < 0) ORDEN_BEMOLES.slice(0, -q).forEach((l) => { m[l] = -1; });
  return m;
}

/** Que notas van en rojo: las que cambian respecto a la escala natural de la familia. */
function conRojo(notas, tipo) {
  const t = TIPOS[tipo];
  if (tipo === 'mayor' || tipo === 'menor-natural' || t.fam === 'otra') return notas.map((n) => ({ ...n, rojo: false }));
  const padre = t.fam === 'mayor' ? MAYOR : MENOR;
  return notas.map((n) => {
    const natural = n.paso === 7 ? 12 : padre[n.paso];
    let rojo = n.off !== natural;
    if (tipo === 'menor-melodica' && (n.paso === 5 || n.paso === 6)) rojo = true;   // sube Y baja: 6.º y 7.º
    return { ...n, rojo };
  });
}

/**
 * Decide que alteraciones se escriben junto a las notas.
 *  - regla del compas: una alteracion vale para esa altura hasta el final del compas;
 *  - en modo "dentro" (sin armadura) las notas en rojo que vuelven a natural se escriben con ♮,
 *    como en las imagenes originales (marca que ese grado ha cambiado respecto a la natural).
 */
function conAlteraciones(notas, modo, q) {
  const estado = {};
  const arm = alteracionesArmadura(modo === 'armadura' ? q : 0);
  return notas.map((n) => {
    const clave = n.letra + n.octava;
    const vigente = clave in estado ? estado[clave] : (arm[n.letra] || 0);
    let muestra = n.alt !== vigente;
    if (!muestra && n.rojo && n.alt === 0 && modo === 'dentro') muestra = true;     // ♮ de cortesia
    estado[clave] = n.alt;
    return { ...n, muestra };
  });
}

/* ======================= MEI ======================= */
function aMEI(notas, q) {
  const llave = q ? ` key.sig="${Math.abs(q)}${q > 0 ? 's' : 'f'}"` : '';
  const xs = notas.map((n, k) => {
    const acc = n.muestra ? ` accid="${ALT_MEI[n.alt]}"` : '';
    const colorN = n.rojo ? ROJO : n.color;
    const col = colorN ? ` color="${colorN}"` : '';
    return `<note xml:id="n${k}" pname="${n.letra}" oct="${n.octava}" dur="1"${acc}${col}/>`;
  }).join('');
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0">'
    + '<meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="G" clef.line="2"${llave}/></staffGrp></scoreDef><section>`
    + `<measure n="1" right="invis"><staff n="1"><layer n="1">${xs}</layer></staff></measure></section></score></mdiv></body></music></mei>`;
}

/** Lee un MEI como lo leeria un musico y devuelve la altura de cada nota (verificacion independiente). */
function leerAlturas(mei) {
  const sig = (/key\.sig="(\d)([sf])"/.exec(mei) || []);
  const arm = alteracionesArmadura(sig[1] ? (sig[2] === 's' ? 1 : -1) * Number(sig[1]) : 0);
  const estado = {};
  const out = [];
  const re = /<note [^>]*>/g;
  let m;
  while ((m = re.exec(mei))) {
    const a = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(m[0]) || [])[1];
    const letra = a('pname'), oct = Number(a('oct')), acc = a('accid');
    const clave = letra + oct;
    if (acc !== undefined) estado[clave] = MEI_ALT[acc];
    const alt = clave in estado ? estado[clave] : (arm[letra] || 0);
    out.push({ letra, octava: oct, alt, color: a('color') });
  }
  return out;
}

/* ======================= verificacion ======================= */
function verificarEscala(notas, tonica, alt, tipo, mei, tabla) {
  const err = [];
  const t = TIPOS[tipo];
  const esperadas = t.notas;                              // cifra fija de la definicion del tipo, no de la lista generada
  if (notas.length !== esperadas) err.push(`${notas.length} notas, debian ser ${esperadas}`);

  // 1. teoria: letra de cada nota = tonica + paso; altura = tonica + semitonos del grado
  const pcT = pcDe(tonica, alt);
  notas.forEach((n, k) => {
    if (n.paso !== undefined && n.letra !== LETRAS[(LETRAS.indexOf(tonica) + n.paso) % 7]) err.push(`la nota ${k + 1} no tiene la letra esperada`);
    if (pcDe(n.letra, n.alt) !== (pcT + n.off) % 12) err.push(`la nota ${k + 1} (${nombreNota(n)}) no suena ${n.off} semitonos sobre la tonica`);
  });
  const sube = notas.filter((n) => n.dir === 'sube');
  const baja = notas.filter((n) => n.dir === 'baja');
  sube.forEach((n, k) => { if (k && semitonosAbs(n) <= semitonosAbs(sube[k - 1])) err.push('la escala no sube'); });
  baja.forEach((n, k) => { if (k && semitonosAbs(n) >= semitonosAbs(baja[k - 1])) err.push('la escala no baja'); });
  if (!sube.length || sube[0].letra !== tonica) err.push('no empieza en la tonica');
  const ultima = notas[notas.length - 1];
  if (ultima.letra !== tonica || ultima.alt !== alt) err.push('no termina en la tonica');
  if (sube.length && semitonosAbs(sube[sube.length - 1]) - semitonosAbs(sube[0]) !== 12) err.push('la octava no esta a 12 semitonos');
  const grados = t.offs;
  if (sube.length !== grados.length) err.push('la subida no tiene las notas del tipo');
  // segunda definicion (distancias): lo dibujado tiene que cuadrar con ella tambien
  const dist = DISTANCIAS[tipo];
  if (!dist) err.push('no hay definicion independiente de este tipo');
  else if (sube.length === dist.length + 1) {
    sube.slice(1).forEach((n, k) => {
      const d = semitonosAbs(n) - semitonosAbs(sube[k]);
      if (d !== dist[k]) err.push(`distancia ${k + 1}→${k + 2}: ${d} semitonos; la definicion independiente dice ${dist[k]}`);
    });
  } else err.push('la subida no tiene las notas de la definicion independiente');
  for (let k = 0; k < grados.length - 1 && k < sube.length - 1; k++) {
    const d = semitonosAbs(sube[k + 1]) - semitonosAbs(sube[k]);
    if (d !== grados[k + 1] - grados[k]) err.push(`grado ${k + 1}→${k + 2}: ${d} semitonos, debia ser ${grados[k + 1] - grados[k]}`);
  }
  if (t.baja) {
    const bajada = [...t.baja, 12].reverse();
    for (let k = 0; k < baja.length; k++) {
      const previa = k === 0 ? sube[sube.length - 1] : baja[k - 1];
      const d = semitonosAbs(previa) - semitonosAbs(baja[k]);
      if (d !== bajada[k] - bajada[k + 1]) err.push(`bajada ${k + 1}: ${d} semitonos, debia ser ${bajada[k] - bajada[k + 1]}`);
    }
  }
  // armadura: lo que sale al escribir las notas naturales de la familia tiene que cuadrar con ella
  const q = t.fam === 'otra' ? 0 : armaduraDe(tonica, alt, tipo);
  if (q === null) err.push('tonica sin armadura posible');
  else if (t.fam !== 'otra') {
    const arm = alteracionesArmadura(q);
    const padre = t.fam === 'mayor' ? MAYOR : MENOR;
    notas.forEach((n, k) => {
      const natural = n.paso === 7 ? 12 : padre[n.paso];
      if (n.off === natural && n.alt !== (arm[n.letra] || 0)) err.push(`nota ${k + 1} (${nombreNota(n)}) no encaja con la armadura de ${q}`);
    });
  }

  // 2. el MEI ya escrito, leido como lo leeria un musico
  const leidas = leerAlturas(mei);
  if (leidas.length !== notas.length) err.push('el MEI no tiene las mismas notas');
  leidas.forEach((l, k) => {
    const n = notas[k];
    if (!n) return;
    if (l.letra !== n.letra || l.octava !== n.octava || l.alt !== n.alt) err.push(`el MEI escribe la nota ${k + 1} como ${NOMBRE[l.letra]}${ALT_TXT[l.alt]}${l.octava}, debia ser ${nombreNota(n)}${n.octava}`);
    if (l.color !== (n.rojo ? ROJO : n.color)) err.push(`el color de la nota ${k + 1} no es el previsto`);
  });

  // 3. la tabla de notas de la pagina
  const fila = tabla && tabla[tonica + alt];
  if (fila) {
    fila.forEach((c, k) => {
      const n = notas[k];
      if (!n) return;
      if (n.letra !== c.letra || n.alt !== c.alt) err.push(`la tabla de la pagina dice ${NOMBRE[c.letra]}${ALT_TXT[c.alt] || '♮'} en el grado ${k + 1} y aqui sale ${nombreNota(n)}`);
    });
  }
  return err;
}

function verificarSVG(svg, notas, tonica, alt, tipo, modo, corch, etiquetas) {
  const err = [];
  const cuenta = (re) => (svg.match(re) || []).length;
  const raiz = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!raiz || !new RegExp('#' + raiz + ' path').test(svg)) err.push('el estilo de Verovio no esta ligado al id de la raiz: se pintarian solo las cabezas');
  if (cuenta(/<g class="notehead"/g) !== notas.length) err.push(`no hay ${notas.length} cabezas de nota`);
  if (cuenta(/<g id="n\d+" class="note"/g) !== notas.length) err.push('no hay todas las notas');
  if (cuenta(/class="stem"/g) !== 0) err.push('una redonda lleva plica');
  if (cuenta(/<g[^>]* class="clef"/g) !== 1) err.push('falta la clave');
  if (cuenta(/<g[^>]* class="meterSig"/g) !== 0) err.push('hay indicacion de compas');
  const q = modo === 'armadura' ? armaduraDe(tonica, alt, tipo) : 0;
  if (cuenta(/class="keyAccid"/g) !== Math.abs(q || 0)) err.push(`la armadura dibuja ${cuenta(/class="keyAccid"/g)} alteraciones, debian ser ${Math.abs(q || 0)}`);
  const quiereAcc = notas.filter((n) => n.muestra).length;
  if (cuenta(/<g[^>]* class="accid"/g) !== quiereAcc) err.push(`${cuenta(/<g[^>]* class="accid"/g)} alteraciones junto a las notas, debian ser ${quiereAcc}`);
  // y que cada una sea el SIGNO correcto (♭ ♮ ♯ doble♯ doble♭), no solo que haya el numero justo
  const glifos = (re) => { const o = {}; (svg.match(re) || []).forEach((g) => { const c = /#(E2[0-9A-F]+)/.exec(g)[1]; o[c] = (o[c] || 0) + 1; }); return o; };
  const dibujados = glifos(/class="accid"[^>]*>\s*<use [^>]*href="#E2[0-9A-F]+/g);
  const previstos = {};
  notas.filter((n) => n.muestra).forEach((n) => { previstos[GLIFO[n.alt]] = (previstos[GLIFO[n.alt]] || 0) + 1; });
  if (JSON.stringify(Object.entries(dibujados).sort()) !== JSON.stringify(Object.entries(previstos).sort())) err.push(`signos de alteracion dibujados ${JSON.stringify(dibujados)}, previstos ${JSON.stringify(previstos)}`);
  const arm = alteracionesArmadura(q || 0);
  const glArm = glifos(/class="keyAccid"[^>]*>\s*<use [^>]*href="#E2[0-9A-F]+/g);
  const quiereArm = Object.values(arm).length ? { [GLIFO[Object.values(arm)[0]]]: Object.values(arm).length } : {};
  if (JSON.stringify(glArm) !== JSON.stringify(quiereArm)) err.push(`armadura con signos ${JSON.stringify(glArm)}, prevista ${JSON.stringify(quiereArm)}`);
  // colores: cada color previsto tiene que salir en el SVG, y ninguno que no se haya previsto
  const previstosColor = [...new Set(notas.map((n) => (n.rojo ? ROJO : n.color)).filter(Boolean))];
  const usados = [...new Set((svg.match(/color="#[0-9a-fA-F]{6}"/g) || []).map((c) => c.slice(7, 14).toLowerCase()))];
  previstosColor.forEach((c) => { if (!usados.includes(c.toLowerCase())) err.push(`falta el color ${c} en el dibujo`); });
  usados.forEach((c) => { if (!previstosColor.map((x) => x.toLowerCase()).includes(c)) err.push(`aparece el color ${c} sin que se haya pedido`); });
  // texto: solo las etiquetas previstas (F, R...), en su grupo; nada mas
  const textos = (svg.match(/<text[^>]*>[^<]*<\/text>/g) || []).map((t) => t.replace(/<[^>]+>/g, ''));
  const quiereTextos = (etiquetas || []).map((e) => e.texto);
  if (JSON.stringify(textos) !== JSON.stringify(quiereTextos)) err.push(`texto en el SVG ${JSON.stringify(textos)}, previsto ${JSON.stringify(quiereTextos)}`);
  if (textos.length && !/<g class="tm-etiquetas"[^>]*>(?:<text[^>]*>[^<]*<\/text>)+<\/g>/.test(svg)) err.push('las etiquetas no estan en su grupo');
  const tonos = cuenta(/class="tm-tono"/g), semi = cuenta(/class="tm-semitono"/g);
  let quiere = [0, 0];
  if (corch) for (let k = 0; k < notas.length - 1; k++) { const d = semitonosAbs(notas[k + 1]) - semitonosAbs(notas[k]); quiere[d === 2 ? 0 : 1]++; }
  if (tonos !== quiere[0] || semi !== quiere[1]) err.push(`corchetes ${tonos}/${semi}, debian ser ${quiere[0]}/${quiere[1]}`);
  return err;
}

/* ======================= dibujo ======================= */
const OPCIONES = {
  font: 'Leland', scale: 40, adjustPageWidth: true, adjustPageHeight: true,
  header: 'none', footer: 'none', breaks: 'none', svgViewBox: true, svgRemoveXlink: true,
  pageMarginLeft: 10, pageMarginRight: 10, pageMarginTop: 10, pageMarginBottom: 10,
  spacingNonLinear: 0.6,
};
const PX_POR_UNIDAD = 11 / 7.2;        // ~11 px entre lineas, igual que el resto de ejemplos
const ESPACIO = 180;                   // separacion entre lineas en las unidades internas del SVG
const ANCHO_REDONDA = 304;             // 1,688 espacios
const ANCHO_MAX = 1100;                // px: por encima de esto algo va mal (cabe encogido en la columna)
// Misma separacion para todas las escalas de un tipo: asi todas las imagenes de una pagina se ven igual
const separacionDe = (tipo) => (TIPOS[tipo].notas >= 13 ? 0.13 : 0.25);

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const hash = (s) => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 2147483000; return h + 1; };

function cabezas(svg) {
  const res = [];
  const re = /<g id="(n\d+)" class="note"[^>]*>[\s\S]*?<g class="notehead"[^>]*>\s*<use [^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g;
  let m;
  while ((m = re.exec(svg))) res.push({ id: m[1], x: Number(m[2]) + ANCHO_REDONDA / 2, y: Number(m[3]) });
  return res;
}
const PASO_Y = ESPACIO / 2;
const paso = (n) => n.octava * 7 + LETRAS.indexOf(n.letra);
const PASO_E4 = 4 * 7 + LETRAS.indexOf('e');

function conCorchetes(svg, notas, corch, etiquetas) {
  const pos = cabezas(svg);
  if (pos.length !== notas.length) throw new Error(`Verovio ha dibujado ${pos.length} cabezas, no ${notas.length}`);
  const ys = pos.map((p, k) => p.y + (paso(notas[k]) - PASO_E4) * PASO_Y);
  if (Math.max(...ys) - Math.min(...ys) > 1) throw new Error('las notas no estan a la altura que les corresponde en el pentagrama');
  const hayEt = etiquetas && etiquetas.length;
  if (!corch && !hayEt) return svg;
  const yL = ys[0];
  const yTope = yL + 3 * ESPACIO, yBase = yL + 4 * ESPACIO, yV = yL + 5 * ESPACIO, hueco = 40;
  let grupo = '', fondo = yL + 4 * ESPACIO;
  if (corch) {
    const trazos = [];
    for (let k = 0; k < notas.length - 1; k++) {
      const d = semitonosAbs(notas[k + 1]) - semitonosAbs(notas[k]);
      const x1 = Math.round(pos[k].x + hueco), x2 = Math.round(pos[k + 1].x - hueco);
      if (d === 2) trazos.push(`<path class="tm-tono" d="M${x1} ${yTope}V${yBase}H${x2}V${yTope}"/>`);
      else if (d === 1) trazos.push(`<path class="tm-semitono" d="M${x1} ${yTope}L${Math.round((x1 + x2) / 2)} ${yV}L${x2} ${yTope}"/>`);
      else throw new Error(`distancia de ${d} semitonos entre dos notas: no hay corchete para eso`);
    }
    grupo += `<g class="tm-intervalos" fill="none" stroke="currentcolor" stroke-width="16" stroke-linejoin="miter">${trazos.join('')}</g>`;
    fondo = yV;
  }
  if (hayEt) {
    // letra bajo la nota (Arial en negrita, ~18 px): unico texto que lleva el SVG
    const base = yL + 4.4 * ESPACIO;
    const ts = etiquetas.map((e) => `<text x="${Math.round(pos[e.indice].x)}" y="${Math.round(base)}" fill="${e.color}">${e.texto}</text>`).join('');
    grupo += `<g class="tm-etiquetas" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="300" text-anchor="middle">${ts}</g>`;
    fondo = Math.max(fondo, base);
  }
  const alto = Math.round(fondo + 240), altoExt = Math.round(alto / 25);
  let s = svg.replace(/(<svg class="definition-scale"[^>]*viewBox="0 0 \d+ )\d+(")/, `$1${alto}$2`);
  s = s.replace(/^(<svg viewBox="0 0 \d+ )\d+(")/, `$1${altoExt}$2`);
  const i = s.lastIndexOf('</svg>', s.lastIndexOf('</svg>') - 1);
  return s.slice(0, i) + grupo + s.slice(i);
}

function preparar(svg, alt) {
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const w = Math.round(Number(vb[1]) * PX_POR_UNIDAD), h = Math.round(Number(vb[2]) * PX_POR_UNIDAD);
  const id = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!id) throw new Error('el SVG no trae id en la raiz');
  let s = svg.replace(/<desc>[\s\S]*?<\/desc>\s*/, '').replace(/xlink:href=/g, 'href=').replace(/\s*xmlns:xlink="[^"]*"/, '');
  s = s.replace(/<svg [^>]*>/, `<svg id="${id}" viewBox="0 0 ${vb[1]} ${vb[2]}" width="${w}" height="${h}" role="img" xmlns="http://www.w3.org/2000/svg"><title>${escAttr(alt)}</title>`);
  return { svg: s.trim() + '\n', w, h };
}

/* ======================= texto alternativo ======================= */
function describir(notas, tonica, alt, tipo, modo) {
  const t = TIPOS[tipo];
  const q = armaduraDe(tonica, alt, tipo);
  const nom = (n) => nombreNota(n) + (n.alt === 0 && n.muestra && n.rojo ? '♮' : '');
  const tn = `${NOMBRE[tonica]}${ALT_TXT[alt]}`;
  // mayores y menores: «Sol Mayor Natural…» (el audio de la pagina identifica la escala por el principio)
  const nombre = t.fam === 'otra' ? `Escala ${t.nombre} de ${tn}` : `${tn} ${t.nombre}`;
  const arm = modo === 'armadura'
    ? (q ? ` con armadura de ${Math.abs(q)} ${q > 0 ? (q === 1 ? 'sostenido' : 'sostenidos') : (q === -1 ? 'bemol' : 'bemoles')}` : ' sin alteraciones en la armadura')
    : (notas.some((n) => n.alt !== 0) ? ', con las alteraciones escritas junto a cada nota' : ', sin alteraciones');
  const lista = t.baja
    ? `ascendente: ${notas.filter((n) => n.dir === 'sube').map(nom).join(', ')}; descendente: ${notas.filter((n) => n.dir === 'baja').map(nom).join(', ')}`
    : notas.map(nom).join(', ');
  const rojas = [...new Set(notas.filter((n) => n.rojo).map(nom))];
  const padre = t.fam === 'mayor' ? 'mayor natural' : 'menor natural';
  const rojoTxt = rojas.length ? ` En rojo, ${rojas.length === 1 ? 'la nota que cambia' : 'las notas que cambian'} respecto a la escala ${padre}: ${rojas.join(', ')}.` : '';
  const tonos = (tipo === 'mayor' || tipo === 'menor-natural')
    ? ` Entre una nota y la siguiente: ${t.offs.slice(1).map((g, k) => (g - t.offs[k] === 2 ? 'tono' : 'semitono')).join(', ')}.` : '';
  const blue = tipo === 'blues-menor' ? ` La blue note (♭5) es ${nom(notas[3])}.` : '';
  return `${nombre}${arm}: ${lista}.${rojoTxt}${modo === 'dentro' ? tonos : ''}${blue}`;
}

/* ======================= paginas ======================= */
const base = 'diccionario-musical/tonalidades/';
const CONJUNTOS = {
  'mayores-naturales':   { pagina: base + 'escalas-mayores/escalas-mayores-naturales', corchetes: ['mayor'], tabla: 'mayor' },
  'mixtas-principales':  { pagina: base + 'escalas-mayores/escalas-mayores-mixtas-principales', tabla: 'mixta-principal' },
  'mixtas-secundarias':  { pagina: base + 'escalas-mayores/escalas-mayores-mixtas-secundarias', tabla: 'mixta-secundaria' },
  'mixolidias':          { pagina: base + 'escalas-mayores/escalas-mayores-mixolidias', tabla: 'mixolidia' },
  'comparar-mayores':    { pagina: base + 'escalas-mayores/comparar-los-tipos-de-escalas-mayores' },
  'menores-naturales':   { pagina: base + 'escalas-menores/escalas-menores-naturales', corchetes: ['menor-natural'], tabla: 'menor-natural' },
  'menores-armonicas':   { pagina: base + 'escalas-menores/escalas-menores-armonicas', tabla: 'menor-armonica' },
  'menores-melodicas':   { pagina: base + 'escalas-menores/escalas-menores-melodicas' },
  'menores-doricas':     { pagina: base + 'escalas-menores/escalas-menores-doricas', tabla: 'menor-dorica' },
  'comparar-menores':    { pagina: base + 'escalas-menores/comparar-los-tipos-de-escalas-menores' },
  'pentatonica':         { pagina: base + 'escala-pentatonica' },
  'blues':               { pagina: base + 'escala-de-blues' },
  'cromatica':           { pagina: base + 'escala-cromatica', tablaTipo: 'cromatica' },
  'tonos-enteros':       { pagina: base + 'escala-de-tonos-enteros', tablaTipo: 'tonos-enteros' },
  'hispano-arabe':       { pagina: base + 'escala-hispano-arabe', tablaTipo: 'hispano-arabe' },
  'oriental':            { pagina: base + 'escala-oriental', tablaTipo: 'oriental' },
  'modos-griegos':       { pagina: base + 'modos-griegos' },
  'modos-gregorianos':   { pagina: base + 'modos-gregorianos' },
};

/** Tonica del alt: "Sol Mayor…", "Fa# Mayor…", "Si bemol menor…", "Escala de La menor…". */
function leerTonica(alt) {
  const re = /(?:^|\b(?:[Dd]e|[Dd]esde|[Ss]obre)\s+)(Do|Re|Mi|Fa|Sol|La|Si)(?:\s*(♯|♭|#)|\s+(sostenido|bemol))?(?![a-záéíóúñ])/;
  const m = re.exec(alt);
  if (!m) return null;
  const s = m[2] || m[3] || '';
  return { tonica: LETRA_DE[m[1]], alt: s === '♯' || s === '#' || s === 'sostenido' ? 1 : s === '♭' || s === 'bemol' ? -1 : 0 };
}

/** Tipo de escala segun el alt (paginas de mayores y menores). */
function leerTipo(alt) {
  const a = alt.toLowerCase();
  if (/pentat[óo]nica/.test(a)) return /menor/.test(a) ? 'pentatonica-menor' : /mayor/.test(a) ? 'pentatonica-mayor' : null;
  if (/blues/.test(a)) return /menor/.test(a) ? 'blues-menor' : null;
  if (/crom[áa]tica/.test(a)) return 'cromatica';
  if (/tonos enteros/.test(a)) return 'tonos-enteros';
  if (/hispano/.test(a)) return 'hispano-arabe';
  if (/persichetti/.test(a)) return 'oriental-persichetti';
  if (/oriental/.test(a)) return /doble arm[óo]nica|oriental mayor/.test(a) ? 'oriental-doble' : 'oriental';
  if (/mixta principal/.test(a)) return 'mixta-principal';
  if (/mixta secundaria/.test(a)) return 'mixta-secundaria';
  if (/mixolidi/.test(a)) return 'mixolidia';
  if (/mayor/.test(a)) return 'mayor';
  if (/menor/.test(a)) {
    if (/arm[óo]nica/.test(a)) return 'menor-armonica';
    if (/mel[óo]dica/.test(a)) return 'menor-melodica';
    if (/d[óo]rica/.test(a)) return 'menor-dorica';
    if (/natural/.test(a)) return 'menor-natural';
  }
  return null;
}

const ALT_DE_SIGNO = { '♭♭': -2, '♭': -1, '♯': 1, '♯♯': 2, '𝄪': 2, '♮': 0 };
const NOTA_RE = /^(Do|Re|Mi|Fa|Sol|La|Si)(♭♭|♭|♯♯|♯|𝄪|♮)?$/;

/**
 * Tablas de notas de la pagina: una fila por tonica. Dos formas: una celda por nota, o una sola
 * celda con las notas separadas por espacios o puntos medios. Devuelve { 'tonica+alt': [{letra,alt}] }.
 */
function leerTabla(html, soloClase) {
  const tabla = {};
  for (const m of html.match(/<table[^>]*>[\s\S]*?<\/table>/g) || []) {
    if (soloClase && !new RegExp(soloClase).test(m.slice(0, 120))) continue;
    for (const f of m.match(/<tr>[\s\S]*?<\/tr>/g) || []) {
      const celdas = (f.match(/<td[^>]*>[\s\S]*?<\/td>/g) || []).map((c) => c.replace(/<[^>]+>/g, '').trim());
      if (celdas.length < 2) continue;
      const ton = leerTonica(celdas[0]);
      if (!ton) continue;
      const nombres = celdas.length >= 8 ? celdas.slice(1, 8) : celdas[1].split(/[\s·,]+/).filter(Boolean);
      const notas = nombres.map((x) => NOTA_RE.exec(x)).map((mm) => mm && { letra: LETRA_DE[mm[1]], alt: ALT_DE_SIGNO[mm[2]] || 0 });
      if (notas.length >= 6 && notas.every(Boolean)) tabla[ton.tonica + ton.alt] = notas;
    }
  }
  return Object.keys(tabla).length ? tabla : null;
}

async function main() {
  const nombre = process.argv[2];
  const poner = process.argv.includes('--poner');
  if (nombre === '--lista' || !CONJUNTOS[nombre]) {
    console.log('conjuntos: ' + Object.keys(CONJUNTOS).join(', '));
    process.exit(nombre === '--lista' ? 0 : 1);
  }
  const cfg = CONJUNTOS[nombre];
  const htmlPath = path.join(RAIZ, cfg.pagina, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const tablaPagina = leerTabla(html, cfg.tabla ? 'tm-scales' : null);
  if (!tablaPagina) console.log('(aviso: la pagina no tiene tabla de notas legible: se salta esa comprobacion)');

  // cada <img> de escala (PNG antiguo o SVG ya puesto), con su <a>/<picture> alrededor
  const reImg = /(?:<a [^>]*>)?(?:<picture>(?:<source[^>]*>)*)?<img\b[^>]*>(?:<\/picture>)?(?:<\/a>)?/g;
  const figuras = [];
  let m;
  while ((m = reImg.exec(html))) {
    const src = (/src="([^"]+)"/.exec(m[0]) || [])[1] || '';
    const alt = ((/alt="([^"]*)"/.exec(m[0]) || [])[1] || '').replace(/&amp;/g, '&');
    if (!/\.(png|svg)$/.test(src) || !/(2020|escalas)\//.test(src)) continue;
    const modoEsp = Modos.leerModo(alt);
    if (modoEsp) { figuras.push({ trozo: m[0], src, especial: modoEsp, modo: 'dentro' }); continue; }
    const ton = leerTonica(alt), tipo = leerTipo(alt);
    if (!ton || !tipo) continue;
    figuras.push({ trozo: m[0], src, tipo, modo: /con armadura/i.test(alt) ? 'armadura' : 'dentro', ...ton });
  }
  if (!figuras.length) throw new Error('no he encontrado ninguna imagen de escala en la pagina');

  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });

  const hechos = new Map();
  let fallos = 0;
  for (const f of figuras) {
    const clave = f.especial ? Modos.clave(f.especial) : `${NOMBRE[f.tonica].toLowerCase()}${ALT_ARCHIVO[f.alt]}-${f.tipo}-${f.modo}`;
    f.clave = clave;
    if (hechos.has(clave)) { f.hecho = hechos.get(clave); continue; }
    try {
      if (f.especial) {                       // modos: escalas en teclas blancas con sus propias comprobaciones
        const { notas, etiquetas } = Modos.construir(f.especial);
        const mei = aMEI(notas, 0);
        const errores = Modos.verificar(f.especial, notas, etiquetas);
        leerAlturas(mei).forEach((l, k) => {
          const n = notas[k];
          if (!n || l.letra !== n.letra || l.octava !== n.octava || l.alt !== 0 || l.color !== n.color) errores.push(`el MEI escribe mal la nota ${k + 1}`);
        });
        tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash(clave), spacingLinear: 0.25 }));
        if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
        if (tk.getPageCount() !== 1) errores.push('sale en mas de una pagina');
        const svg = conCorchetes(tk.renderToSVG(1), notas, false, etiquetas);
        errores.push(...verificarSVG(svg, notas, undefined, 0, undefined, 'dentro', false, etiquetas));
        const altNuevo = Modos.describir(f.especial, notas);
        const listo = preparar(svg, altNuevo);
        if (errores.length) throw new Error(errores.join('\n   - '));
        fs.writeFileSync(path.join(RAIZ, SALIDA, clave + '.svg'), listo.svg);
        const hecho = { clave, w: listo.w, h: listo.h, alt: altNuevo, bytes: listo.svg.length };
        hechos.set(clave, hecho); f.hecho = hecho;
        console.log(`✓ ${clave.padEnd(38)} ${String(listo.svg.length).padStart(5)} B · ${listo.w}×${listo.h}  ${notas.map((n) => NOMBRE[n.letra] + (n.color ? '*' : '')).join(' ')}`);
        continue;
      }
      const q = f.modo === 'armadura' ? armaduraDe(f.tonica, f.alt, f.tipo) : 0;
      if (f.modo === 'armadura' && q === null) throw new Error('no existe armadura para esta tonica/tipo');
      const fila = tablaPagina && tablaPagina[f.tonica + f.alt];
      const notas = conAlteraciones(conRojo(construir(f.tonica, f.alt, f.tipo, fila), f.tipo), f.modo, q);
      const corch = f.modo === 'dentro' && (cfg.corchetes || []).includes(f.tipo);
      const mei = aMEI(notas, q);
      const tabla = (cfg.tablaTipo || cfg.tabla) === f.tipo ? tablaPagina : null;
      const e1 = verificarEscala(notas, f.tonica, f.alt, f.tipo, mei, tabla);
      tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash(clave), spacingLinear: separacionDe(f.tipo) }));
      if (!tk.loadData(mei)) throw new Error('Verovio no lee el MEI');
      if (tk.getPageCount() !== 1) e1.push('sale en mas de una pagina');
      const dibujo = tk.renderToSVG(1);
      if (Number(/viewBox="0 0 ([\d.]+) /.exec(dibujo)[1]) * PX_POR_UNIDAD > ANCHO_MAX) e1.push('el dibujo es demasiado ancho');
      const svg = conCorchetes(dibujo, notas, corch);
      const e2 = verificarSVG(svg, notas, f.tonica, f.alt, f.tipo, f.modo, corch);
      const altNuevo = describir(notas, f.tonica, f.alt, f.tipo, f.modo);
      const listo = preparar(svg, altNuevo);
      const errores = e1.concat(e2);
      if (errores.length) throw new Error(errores.join('\n   - '));
      fs.writeFileSync(path.join(RAIZ, SALIDA, clave + '.svg'), listo.svg);
      const hecho = { clave, w: listo.w, h: listo.h, alt: altNuevo, bytes: listo.svg.length };
      hechos.set(clave, hecho); f.hecho = hecho;
      console.log(`✓ ${clave.padEnd(38)} ${String(listo.svg.length).padStart(5)} B · ${listo.w}×${listo.h}  ${notas.map((n) => nombreNota(n) + (n.rojo ? '*' : '')).join(' ')}`);
    } catch (e) {
      fallos++;
      console.log(`✗ ${clave}\n   - ${e.message}`);
    }
  }
  if (fallos) { console.log(`\n${fallos} escala(s) no pasan la verificacion: no se toca la pagina`); process.exit(1); }

  if (poner) {
    for (const f of figuras) {
      const h = f.hecho;
      const nuevo = `<img src="/${SALIDA}/${h.clave}.svg" width="${h.w}" height="${h.h}" alt="${escAttr(h.alt)}" loading="lazy" decoding="async">`;
      html = html.replace(f.trozo, () => nuevo);
    }
    fs.writeFileSync(htmlPath, html);
    const quedan = (html.match(/<img\b[^>]*src="[^"]*2020\/[^"]*\.png"/g) || []).length;
    console.log(`\nescrito ${cfg.pagina}/index.html: ${figuras.length} imagenes sustituidas por SVG · PNG de 2020 que quedan en la pagina: ${quedan}`);
  } else {
    console.log(`\n${figuras.length} imagenes localizadas en la pagina (usa --poner para sustituirlas)`);
  }
}

if (require.main === module) main().catch((e) => { console.error('✗', e.message); process.exit(1); });
module.exports = { construir, conRojo, conAlteraciones, aMEI, leerAlturas, verificarEscala, TIPOS };
