'use strict';
/**
 * Paginas de acordes de septima con 32 imagenes cada una (dominante, sensible y disminuida).
 * Cada pagina trae, por inversion (fundamental, 1.a, 2.a y 3.a): el acorde, tres imagenes con dos notas
 * resaltadas y cuatro ejemplos de cifrado. Todo se DERIVA de la definicion del acorde:
 *
 *  - ejemplo 1 de cada pagina: el acorde que escribio Eduardo (dominante: Sol7; sensible: Si-Re-Fa-La;
 *    disminuida: Si-Re-Fa-La♭, de su MusicXML «acordes sensible y disminuido»);
 *  - ejemplos 2-4 de cifrado: acordes de ejemplo libres (decision de Eduardo) con otras alteraciones;
 *  - cada inversion se obtiene subiendo una octava la nota mas grave y, si la mas aguda pasa de La5,
 *    bajando todo una octava;
 *  - los pares resaltados son siempre «nota grave + otra»: la mas aguda, la tercera y la segunda;
 *  - las imagenes de una pagina se asignan por POSICION (acorde, 3 resaltadas, 4 de cifrado, por inversion).
 */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const LET = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

const parse = (n) => { const m = /^([a-g])(bb|b|##|#)?(\d)$/.exec(n); return { l: m[1], a: m[2] || '', o: Number(m[3]) }; };
const texto = (x) => x.l + x.a + x.o;
const paso = (x) => x.o * 7 + LET.indexOf(x.l);

/** Posicion de la inversion k de un acorde dado en estado fundamental (de grave a agudo). */
function voz(fundamental, k) {
  let ns = fundamental.map(parse);
  for (let i = 0; i < k; i++) { const [bajo, ...resto] = ns; ns = [...resto, { ...bajo, o: bajo.o + 1 }]; }
  while (Math.max(...ns.map(paso)) > 5 * 7 + LET.indexOf('a')) ns = ns.map((x) => ({ ...x, o: x.o - 1 }));
  return ns.map(texto);
}

const T = (t) => ({ t, tachado: true });
const ACORDES = {
  dominante: {
    pagina: 'acorde-de-septima-de-dominante', id: 'dom', sensible: 'tercera',
    ejemplos: [['g4', 'b4', 'd5', 'f5'], ['eb4', 'g4', 'bb4', 'db5'], ['d4', 'f#4', 'a4', 'c5'], ['f4', 'a4', 'c5', 'eb5']],
    cifras: [[{ t: '7' }, { t: '+' }], [{ t: '6' }, T('5')], [{ t: '+6' }], [{ t: '+4' }]],
  },
  sensible: {
    pagina: 'acorde-de-septima-de-sensible', id: 'sen', sensible: 'fundamental',
    ejemplos: [['b3', 'd4', 'f4', 'a4'], ['f#3', 'a3', 'c4', 'e4'], ['c#4', 'e4', 'g4', 'b4'], ['e4', 'g4', 'bb4', 'd5']],
    cifras: [[{ t: '7' }, T('5')], [{ t: '+6' }, { t: '5' }], [{ t: '+4' }, { t: '3' }], [{ t: '4' }, { t: '+2' }]],
  },
  disminuida: {
    pagina: 'acorde-de-septima-disminuida', id: 'dis', sensible: 'fundamental',
    ejemplos: [['b3', 'd4', 'f4', 'ab4'], ['f#3', 'a3', 'c4', 'eb4'], ['c#4', 'e4', 'g4', 'bb4'], ['e4', 'g4', 'bb4', 'db5']],
    cifras: [[T('7'), T('5')], [{ t: '+6' }, T('5')], [{ t: '+4' }, { t: '♭3' }], [{ t: '+2' }]],
  },
};

function archivosDe(pagina) {
  const s = fs.readFileSync(path.join(RAIZ, 'diccionario-musical/acordes', pagina, 'index.html'), 'utf8');
  return [...s.matchAll(/<img[^>]*src="([^"]+[.](?:png|svg))"/g)].map((m) => decodeURIComponent(m[1].split('/').pop())).filter((n) => !/favicon|logo/.test(n));
}

const SERIF = 'Georgia, &quot;Times New Roman&quot;, serif';
const CAPTION = { nota: 0, texto: 'auto', centro: true, dy: 900, size: 500, weight: 400, family: SERIF };
const PARES = [[0, 3], [0, 2], [0, 1]];

function septimas(D) {
  const archivos = archivosDe(D.pagina);
  if (archivos.length !== 32) throw new Error(`${D.pagina}: ${archivos.length} imagenes, esperaba 32`);
  const datos = [];
  for (let k = 0; k < 4; k++) {
    const bloque = archivos.slice(8 * k, 8 * k + 8);
    const base = voz(D.ejemplos[0], k);
    const nom = ['fundamental', '1a', '2a', '3a'][k];
    datos.push({ slug: `${D.id}-${nom}-acorde`, archivos: [bloque[0]], clave: 'sol', ancho: 260, compases: [[{ n: base, d: 'w' }]] });
    PARES.forEach((par, j) => datos.push({ slug: `${D.id}-${nom}-par${j + 1}`, archivos: [bloque[1 + j]], clave: 'sol', ancho: 260,
      compases: [[{ n: base, d: 'w' }]], resaltar: true, par, etiquetas: [CAPTION] }));
    D.ejemplos.forEach((ej, e) => {
      const cifra = D.cifras[k];
      datos.push({ slug: `${D.id}-${nom}-cifrado-${e + 1}`, archivos: [bloque[4 + e]], clave: 'sol', ancho: 260, sensible: D.sensible,
        compases: [[{ n: voz(ej, k), d: 'w' }]], cifrado: cifra,
        etiquetas: cifra.map((f, r) => ({ nota: 0, texto: f.t, tachado: !!f.tachado, dy: 1000 + 560 * r, size: 460, weight: 700, family: SERIF })) });
    });
  }
  return datos;
}

module.exports = [...septimas(ACORDES.dominante), ...septimas(ACORDES.sensible), ...septimas(ACORDES.disminuida)];
