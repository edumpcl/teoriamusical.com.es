'use strict';
/**
 * Los modos (de iglesia, griegos descendentes y gregorianos) para gen-escalas-verovio.js.
 * Todos son escalas SIN alteraciones (teclas blancas): lo que cambia es donde empiezan, hacia
 * donde van y, en los gregorianos, que notas son la finalis (F) y la repercusion (R).
 *
 * Cada imagen se lee de su alt («Modo dorio griego descendente, Mi a Mi»), se construye con una
 * tabla propia y se COMPRUEBA contra lo que dice el alt y contra los patrones de tonos y
 * semitonos de cada modo, que son otra tabla distinta.
 */
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const LETRA_DE = { Do: 'c', Re: 'd', Mi: 'e', Fa: 'f', Sol: 'g', La: 'a', Si: 'b' };
const COLOR_F = '#9a6700';      // finalis (ocre oscuro: contraste 4,9:1 sobre blanco)
const COLOR_R = '#1d4ed8';      // repercusion (azul: contraste 6,7:1)

const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* ---- patrones de tonos y semitonos de cada modo (ascendente, desde su primera nota) ---- */
const PATRON_IGLESIA = {
  jonico: [2, 2, 1, 2, 2, 2, 1], dorico: [2, 1, 2, 2, 2, 1, 2], frigio: [1, 2, 2, 2, 1, 2, 2],
  lidio: [2, 2, 2, 1, 2, 2, 1], mixolidio: [2, 2, 1, 2, 2, 1, 2], eolico: [2, 1, 2, 2, 1, 2, 2],
  locrio: [1, 2, 2, 1, 2, 2, 2],
};
// primera nota natural de cada modo de iglesia, y patron que le corresponde a cada nota blanca
const IGLESIA = { jonico: 'c', dorico: 'd', frigio: 'e', lidio: 'f', mixolidio: 'g', eolico: 'a', locrio: 'b' };
const PATRON_DE_LETRA = {};
Object.entries(IGLESIA).forEach(([m, l]) => { PATRON_DE_LETRA[l] = PATRON_IGLESIA[m]; });

// modos griegos (descendentes): nota de la que arrancan, en la octava en que se dibujaban
const GRIEGO = {
  mixolidio: { l: 'b', o: 4 }, lidio: { l: 'c', o: 5 }, frigio: { l: 'd', o: 5 }, dorio: { l: 'e', o: 5 },
  hipolidio: { l: 'f', o: 5 }, hipofrigio: { l: 'g', o: 5 }, hipodorio: { l: 'a', o: 5 },
};

// modos gregorianos: primera nota del ambito (autenticos: la finalis; plagales: una cuarta debajo)
const GREGORIANO = {
  1: { n: 'dórico', tipo: 'protus auténtico', finalis: 'd', tenor: 'a', ini: { l: 'd', o: 4 } },
  2: { n: 'hipodórico', tipo: 'protus plagal', finalis: 'd', tenor: 'f', ini: { l: 'a', o: 3 } },
  3: { n: 'frigio', tipo: 'deuterus auténtico', finalis: 'e', tenor: 'c', ini: { l: 'e', o: 4 } },
  4: { n: 'hipofrigio', tipo: 'deuterus plagal', finalis: 'e', tenor: 'a', ini: { l: 'b', o: 3 } },
  5: { n: 'lidio', tipo: 'tritus auténtico', finalis: 'f', tenor: 'c', ini: { l: 'f', o: 4 } },
  6: { n: 'hipolidio', tipo: 'tritus plagal', finalis: 'f', tenor: 'a', ini: { l: 'c', o: 4 } },
  7: { n: 'mixolidio', tipo: 'tetrardus auténtico', finalis: 'g', tenor: 'd', ini: { l: 'g', o: 4 } },
  8: { n: 'hipomixolidio', tipo: 'tetrardus plagal', finalis: 'g', tenor: 'c', ini: { l: 'd', o: 4 } },
};
const ROMANO = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };

/** Lee el alt: devuelve null si no es un modo. */
function leerModo(alt) {
  const a = sinTildes(alt);
  let m = /^modo (jonico|dorico|frigio|lidio|mixolidio|eolico|locrio) desde (do|re|mi|fa|sol|la|si)\b/.exec(a);
  if (m) return { clase: 'iglesia', nombre: m[1], letra: LETRA_DE[m[2][0].toUpperCase() + m[2].slice(1)] };
  m = /^modo (\w+) griego descendente, (do|re|mi|fa|sol|la|si) a (do|re|mi|fa|sol|la|si)\b/.exec(a);
  if (m) return { clase: 'griego', nombre: m[1], letra: LETRA_DE[m[2][0].toUpperCase() + m[2].slice(1)], letraFinal: LETRA_DE[m[3][0].toUpperCase() + m[3].slice(1)] };
  m = /^modo (i|ii|iii|iv|v|vi|vii|viii) (\w+)(?: \(([^)]*)\))?: finalis (do|re|mi|fa|sol|la|si), repercusion (do|re|mi|fa|sol|la|si)\b/.exec(a);
  if (m) {
    const cap = (x) => x[0].toUpperCase() + x.slice(1);
    return { clase: 'gregoriano', numero: ROMANO[m[1].toUpperCase()], nombre: m[2], tipoTxt: m[3], letra: LETRA_DE[cap(m[4])], tenor: LETRA_DE[cap(m[5])] };
  }
  return null;
}

const clave = (m) => (m.clase === 'iglesia' ? `modo-${m.nombre}-${NOMBRE[m.letra].toLowerCase()}`
  : m.clase === 'griego' ? `modo-griego-${m.nombre}-${NOMBRE[m.letra].toLowerCase()}`
  : `modo-gregoriano-${m.numero}`);

const nota = (pos, k, extra) => ({ letra: LETRAS[pos % 7], octava: Math.floor(pos / 7), alt: 0, muestra: false, rojo: false, k, ...extra });

/** Las 8 notas del modo y las etiquetas que lleva. */
function construir(m) {
  const idx = (l) => LETRAS.indexOf(l);
  let notas = [], etiquetas = [];
  if (m.clase === 'iglesia') {
    const ini = IGLESIA[m.nombre];
    if (!ini) throw new Error('modo de iglesia desconocido: ' + m.nombre);
    notas = Array.from({ length: 8 }, (_, k) => nota(4 * 7 + idx(ini) + k, k, { dir: 'sube' }));
  } else if (m.clase === 'griego') {
    const g = GRIEGO[m.nombre];
    if (!g) throw new Error('modo griego desconocido: ' + m.nombre);
    notas = Array.from({ length: 8 }, (_, k) => nota(g.o * 7 + idx(g.l) - k, k, { dir: 'baja' }));
  } else {
    const g = GREGORIANO[m.numero];
    if (!g) throw new Error('modo gregoriano desconocido: ' + m.numero);
    notas = Array.from({ length: 8 }, (_, k) => nota(g.ini.o * 7 + idx(g.ini.l) + k, k, { dir: 'sube' }));
    const iF = notas.findIndex((n) => n.letra === g.finalis);
    const iR = notas.findIndex((n, k) => k > iF && n.letra === g.tenor);
    if (iF < 0 || iR < 0) throw new Error('el ambito no contiene la finalis o la repercusion');
    notas[iF].color = COLOR_F; notas[iR].color = COLOR_R;
    etiquetas = [{ indice: iF, texto: 'F', color: COLOR_F }, { indice: iR, texto: 'R', color: COLOR_R }];
  }
  return { notas, etiquetas };
}

const semitonos = (n) => (n.octava + 1) * 12 + PC[n.letra];

/** Comprobacion independiente: patrones de cada modo, tabla de modos y lo que dice el alt. */
function verificar(m, notas, etiquetas) {
  const err = [];
  if (notas.length !== 8) err.push(`${notas.length} notas, debian ser 8`);
  if (notas.some((n) => n.alt !== 0)) err.push('un modo en teclas blancas no lleva alteraciones');
  // letras consecutivas: hacia arriba (+1 letra) o hacia abajo (-1 letra, los griegos)
  notas.forEach((n, k) => {
    if (!k) return;
    const salto = (LETRAS.indexOf(n.letra) - LETRAS.indexOf(notas[k - 1].letra) + 7) % 7;
    if (salto !== (m.clase === 'griego' ? 6 : 1)) err.push(`la nota ${k + 1} no es contigua a la anterior`);
  });
  // patron de tonos y semitonos leido de ARRIBA a ABAJO o de abajo a arriba segun el caso
  const asc = m.clase === 'griego' ? [...notas].reverse() : notas;
  const dist = asc.slice(1).map((n, k) => semitonos(n) - semitonos(asc[k]));
  const quiere = PATRON_DE_LETRA[asc[0].letra];
  if (JSON.stringify(dist) !== JSON.stringify(quiere)) err.push(`patron ${dist} no es el de un modo que empiece en ${NOMBRE[asc[0].letra]} (${quiere})`);
  if (m.clase === 'iglesia') {
    if (asc[0].letra !== m.letra) err.push(`el modo ${m.nombre} no empieza en ${NOMBRE[m.letra]}`);
    if (JSON.stringify(dist) !== JSON.stringify(PATRON_IGLESIA[m.nombre])) err.push(`el patron no es el del modo ${m.nombre}`);
  }
  if (m.clase === 'griego') {
    if (notas[0].letra !== m.letra || notas[7].letra !== m.letraFinal || m.letra !== m.letraFinal) err.push('«X a X» no coincide con las notas');
    if (GRIEGO[m.nombre].l !== m.letra) err.push(`el modo ${m.nombre} griego es de ${NOMBRE[GRIEGO[m.nombre].l]}, no de ${NOMBRE[m.letra]}`);
  }
  if (m.clase === 'gregoriano') {
    const g = GREGORIANO[m.numero];
    if (sinTildes(g.n) !== m.nombre) err.push(`el modo ${m.numero} es ${g.n}, no ${m.nombre}`);
    if (m.tipoTxt && sinTildes(g.tipo) !== m.tipoTxt) err.push(`el modo ${m.numero} es ${g.tipo}, no ${m.tipoTxt}`);
    if (g.finalis !== m.letra) err.push(`la finalis del modo ${m.numero} es ${NOMBRE[g.finalis]}, no ${NOMBRE[m.letra]}`);
    if (g.tenor !== m.tenor) err.push(`la repercusion del modo ${m.numero} es ${NOMBRE[g.tenor]}, no ${NOMBRE[m.tenor]}`);
    // autentico (impar): ambito desde la finalis; plagal (par): empieza una cuarta (3 grados) por debajo
    const dif = (LETRAS.indexOf(g.finalis) - LETRAS.indexOf(notas[0].letra) + 7) % 7;
    if (m.numero % 2 === 1 && dif !== 0) err.push('un modo autentico empieza en la finalis');
    if (m.numero % 2 === 0 && dif !== 3) err.push('un modo plagal empieza una cuarta bajo la finalis');
    if (etiquetas.length !== 2) err.push('faltan las etiquetas F y R');
    else {
      if (notas[etiquetas[0].indice].letra !== m.letra) err.push('la F no esta sobre la finalis');
      if (notas[etiquetas[1].indice].letra !== m.tenor) err.push('la R no esta sobre la repercusion');
    }
  }
  return err;
}

const nom = (n) => NOMBRE[n.letra];

function describir(m, notas) {
  const lista = notas.map(nom).join(', ');
  if (m.clase === 'iglesia') return `Modo ${m.nombre.replace('jonico', 'jónico').replace('dorico', 'dórico').replace('eolico', 'eólico')} desde ${NOMBRE[m.letra]}: ${lista}.`;
  if (m.clase === 'griego') return `Modo ${m.nombre} griego descendente, ${NOMBRE[m.letra]} a ${NOMBRE[m.letra]}: ${lista}.`;
  const g = GREGORIANO[m.numero];
  const tag = notas.map((n) => nom(n) + (n.color === COLOR_F ? ' (finalis, F)' : n.color === COLOR_R ? ' (repercusión, R)' : '')).join(', ');
  return `Modo ${Object.keys(ROMANO)[m.numero - 1]} ${g.n} (${g.tipo}): finalis ${NOMBRE[g.finalis]}, repercusión ${NOMBRE[g.tenor]}. Notas: ${tag}.`;
}

module.exports = { leerModo, construir, verificar, describir, clave };
