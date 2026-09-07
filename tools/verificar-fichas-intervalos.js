'use strict';
/**
 * Verifica que las fichas de intervalos cumplen lo que la página promete.
 *
 *   node tools/verificar-fichas-intervalos.js
 *
 * Comprueba las 26 hojas (las mismas semillas que usa el generador de PDF) y,
 * si se le pasa --web, también unas cuantas hojas del generador del navegador.
 *
 * Las comprobaciones se hacen RECALCULANDO el intervalo desde las dos notas
 * dibujadas, sin reutilizar la lógica que las generó: si el motor se equivocara
 * al etiquetar, esta comprobación lo vería. Es justo el fallo que arrastra la
 * competencia (fichas con la solución mal puesta).
 */
const { generarEjercicios, generarEjerciciosMixtos } = require('./generate-fichas-intervalos.js');

const LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const NS = [0, 2, 4, 5, 7, 9, 11];
const NIVELES = [[2, 3], [2, 3, 4], [2, 3, 4, 5], [2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 7], [2, 3, 4, 5, 6, 7, 8]];
const NUMS = [2, 3, 4, 5, 6, 7, 8];

/* Semitonos de cada especie, escritos aparte a propósito: si alguien tocara la
   tabla del generador, esta copia lo delataría en vez de validar el error. */
const ESPECIE = {
  2: { 0: 'd', 1: 'm', 2: 'M', 3: 'A' },
  3: { 2: 'd', 3: 'm', 4: 'M', 5: 'A' },
  4: { 4: 'd', 5: 'J', 6: 'A' },
  5: { 6: 'd', 7: 'J', 8: 'A' },
  6: { 7: 'd', 8: 'm', 9: 'M', 10: 'A' },
  7: { 9: 'd', 10: 'm', 11: 'M', 12: 'A' },
  8: { 11: 'd', 12: 'J', 13: 'A' },
};

/* 'c#/4' -> {l:0, alt:1, oct:4} */
function parseKey(key) {
  const m = /^([a-g])(#{1,2}|b{1,2})?\/(-?\d+)$/.exec(key);
  if (!m) throw new Error('clave ilegible: ' + key);
  const alt = !m[2] ? 0 : (m[2][0] === '#' ? m[2].length : -m[2].length);
  return { l: LETTERS.indexOf(m[1]), alt: alt, oct: Number(m[3]) };
}
const midi = n => 12 * (n.oct + 1) + NS[n.l] + n.alt;
const diatonico = n => n.oct * 7 + n.l;      // posición en el pentagrama

/* Recalcula número y especie a partir de las dos notas. */
function analizar(k1, k2) {
  const a = parseKey(k1), b = parseKey(k2);
  const grados = Math.abs(diatonico(b) - diatonico(a)) + 1;
  const semis = Math.abs(midi(b) - midi(a));
  const tabla = ESPECIE[grados];
  return {
    num: grados,
    especie: tabla ? tabla[semis] : undefined,
    semis: semis,
    // La dirección se mide por el GRADO, no por la altura sonora: una 2ª
    // disminuida (Do♯→Re♭) sube en el pentagrama aunque suene igual, y la
    // flecha de la ficha describe lo que el alumno ve escrito.
    dir: diatonico(b) > diatonico(a) ? 1 : -1,
    alteradas: a.alt !== 0 || b.alt !== 0,
    dobles: Math.abs(a.alt) > 1 || Math.abs(b.alt) > 1,
    fuera: [midi(a), midi(b)].some(m => m < 57 || m > 81),
  };
}

function verificarHoja(nombre, ejercicios, numsEsperados) {
  const fallos = [];
  const vistos = new Set();

  ejercicios.forEach((e, i) => {
    const ref = nombre + ' #' + (i + 1);
    const r = analizar(e.n1.key, e.n2.key);

    // 1. la etiqueta dice exactamente lo que son las dos notas
    const esperada = r.num + 'ª ' + r.especie;
    if (!r.especie) fallos.push(ref + ': ' + e.n1.key + '→' + e.n2.key + ' no es un intervalo catalogado (' + r.semis + ' st)');
    else if (e.etiqueta !== esperada) fallos.push(ref + ': etiquetado "' + e.etiqueta + '" pero es ' + esperada);

    // 2. la flecha coincide con la dirección real
    if (e.dir !== r.dir) fallos.push(ref + ': la flecha dice ' + (e.dir > 0 ? 'ascendente' : 'descendente') + ' y no lo es');

    // 3. el número está entre los que la hoja anuncia
    if (numsEsperados.indexOf(r.num) < 0) fallos.push(ref + ': es una ' + r.num + 'ª y la hoja no la incluye');

    // 4. promesas del texto: rango, sin dobles alteraciones, sin repetir notas
    if (r.fuera) fallos.push(ref + ': se sale del rango La3-La5');
    if (r.dobles) fallos.push(ref + ': lleva doble alteración');
    const par = e.n1.key + '>' + e.n2.key;
    if (vistos.has(par)) fallos.push(ref + ': repite las notas ' + par);
    vistos.add(par);
  });

  const naturales = ejercicios.filter(e => !analizar(e.n1.key, e.n2.key).alteradas).length;
  // Cuántos ejercicios seguidos, desde el primero, son naturales y ascendentes.
  // No se exige un número fijo: de octavas naturales ascendentes solo existen
  // ocho dentro del rango del pentagrama, así que el arranque es más corto.
  let arranque = 0;
  for (const e of ejercicios) {
    const r = analizar(e.n1.key, e.n2.key);
    if (r.alteradas || r.dir < 0) break;
    arranque++;
  }
  const arranqueLimpio = arranque >= 8;

  return { fallos, naturales, total: ejercicios.length, arranqueLimpio, arranque };
}

const hojas = [];
NUMS.forEach(n => {
  hojas.push({ nombre: n + 'ª analizar', nums: [n], ej: generarEjercicios(n, 42, n * 1000 + 7) });
  hojas.push({ nombre: n + 'ª escribir', nums: [n], ej: generarEjercicios(n, 42, n * 1000 + 13) });
});
NIVELES.forEach((ns, i) => {
  const et = '2ª-' + ns[ns.length - 1] + 'ª';
  hojas.push({ nombre: et + ' analizar', nums: ns, ej: generarEjerciciosMixtos(ns, 42, 90000 + i * 1000 + 7) });
  hojas.push({ nombre: et + ' escribir', nums: ns, ej: generarEjerciciosMixtos(ns, 42, 90000 + i * 1000 + 13) });
});

let fallos = 0, ejercicios = 0, arranquesMal = 0;
const proporciones = [];

console.log('Hoja                     ejerc.  naturales  arranque  etiquetas');
console.log('─'.repeat(70));
for (const h of hojas) {
  const r = verificarHoja(h.nombre, h.ej, h.nums);
  fallos += r.fallos.length;
  ejercicios += r.total;
  if (!r.arranqueLimpio) arranquesMal++;
  proporciones.push(r.naturales / r.total);
  console.log('%s %s %s %s %s',
    h.nombre.padEnd(24),
    String(r.total).padStart(5),
    (r.naturales + ' (' + Math.round(100 * r.naturales / r.total) + '%)').padStart(11),
    (r.arranqueLimpio ? String(r.arranque) : 'REVISAR ' + r.arranque).padStart(9),
    (r.fallos.length ? r.fallos.length + ' FALLOS' : 'ok').padStart(10));
  r.fallos.slice(0, 5).forEach(f => console.log('      · ' + f));
}

const media = proporciones.reduce((s, p) => s + p, 0) / proporciones.length;
console.log('─'.repeat(70));
console.log('%d ejercicios verificados en %d hojas', ejercicios, hojas.length);
console.log('Etiquetas y flechas incorrectas: %d', fallos);
console.log('Hojas con un arranque de menos de 8 naturales ascendentes: %d', arranquesMal);
console.log('Media de ejercicios sin alteraciones: %s%% (la página dice "casi la mitad")',
  (100 * media).toFixed(1));

/* --web: las mismas comprobaciones sobre el generador del navegador, que no
   usa semillas fijas. Necesita el sitio servido en localhost:8099
   (node tools/serve.js). */
async function auditarWeb() {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8099/ejercicios/ejercicios-de-intervalos-en-pdf/', { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => window.tmFichasGeneradorTest, null, { timeout: 10000 });

  const res = await p.evaluate(({ ESPECIE }) => {
    const LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    const NS = [0, 2, 4, 5, 7, 9, 11];
    function parse(k) {
      const m = /^([a-g])(#{1,2}|b{1,2})?\/(-?\d+)$/.exec(k);
      const alt = !m[2] ? 0 : (m[2][0] === '#' ? m[2].length : -m[2].length);
      return { l: LETTERS.indexOf(m[1]), alt: alt, oct: Number(m[3]) };
    }
    const midi = n => 12 * (n.oct + 1) + NS[n.l] + n.alt;
    const diat = n => n.oct * 7 + n.l;

    const combos = [];
    [[2, 3], [3], [8], [2, 3, 4, 5], [2, 3, 4, 5, 6, 7, 8], [5, 7]].forEach(nums => {
      ['naturales', 'progresivo', 'alteradas'].forEach(dif => {
        [12, 24, 42].forEach(total => combos.push({ nums: nums, dif: dif, total: total }));
      });
    });

    const fallos = [];
    let hojas = 0, ejercicios = 0, cortas = 0;

    combos.forEach(c => {
      for (let s = 0; s < 12; s++) {
        const semilla = 10000 + s * 4177;
        const hoja = window.tmFichasGeneradorTest.generarHoja(c.nums, c.total, semilla, c.dif);
        hojas++; ejercicios += hoja.length;
        if (hoja.length < c.total) cortas++;

        const vistos = {};
        hoja.forEach((e, i) => {
          const a = parse(e.n1.key), z = parse(e.n2.key);
          const grados = Math.abs(diat(z) - diat(a)) + 1;
          const semis = Math.abs(midi(z) - midi(a));
          const esp = ESPECIE[grados] ? ESPECIE[grados][semis] : undefined;
          const ref = '[' + c.nums.join(',') + '/' + c.dif + '/' + c.total + '/' + semilla + '] #' + (i + 1);

          if (!esp) fallos.push(ref + ' ' + e.n1.key + '→' + e.n2.key + ' no catalogado');
          else if (e.etiqueta !== grados + 'ª ' + esp) fallos.push(ref + ' etiqueta ' + e.etiqueta + ' pero es ' + grados + 'ª ' + esp);
          if (e.dir !== (diat(z) > diat(a) ? 1 : -1)) fallos.push(ref + ' flecha equivocada');
          if (c.nums.indexOf(grados) < 0) fallos.push(ref + ' número ' + grados + ' no pedido');
          if (midi(a) < 57 || midi(a) > 81 || midi(z) < 57 || midi(z) > 81) fallos.push(ref + ' fuera de rango');
          if (Math.abs(a.alt) > 1 || Math.abs(z.alt) > 1) fallos.push(ref + ' doble alteración');
          const par = e.n1.key + '>' + e.n2.key;
          if (vistos[par]) fallos.push(ref + ' repite ' + par);
          vistos[par] = 1;
          if (c.dif === 'naturales' && (a.alt !== 0 || z.alt !== 0)) fallos.push(ref + ' alteración en modo sin alteraciones');
        });
      }
    });

    const clave = h => JSON.stringify(h.map(e => e.n1.key + e.n2.key + e.etiqueta));
    const igual = clave(window.tmFichasGeneradorTest.generarHoja([2, 3], 24, 4821, 'progresivo'))
      === clave(window.tmFichasGeneradorTest.generarHoja([2, 3], 24, 4821, 'progresivo'));
    const distinta = clave(window.tmFichasGeneradorTest.generarHoja([2, 3], 24, 4821, 'progresivo'))
      !== clave(window.tmFichasGeneradorTest.generarHoja([2, 3], 24, 4822, 'progresivo'));

    return { hojas: hojas, ejercicios: ejercicios, cortas: cortas, nFallos: fallos.length, fallos: fallos.slice(0, 10), igual: igual, distinta: distinta };
  }, { ESPECIE });

  console.log('\n=== Generador del navegador ===');
  console.log('%d hojas · %d ejercicios · %d fallos', res.hojas, res.ejercicios, res.nFallos);
  res.fallos.forEach(f => console.log('   · ' + f));
  console.log('Hojas con menos ejercicios de los pedidos (repertorio agotado, se avisa en pantalla): %d', res.cortas);
  console.log('Misma semilla → misma hoja: %s · semilla distinta → hoja distinta: %s', res.igual, res.distinta);
  console.log('Errores JS: %s', errs.length ? errs.join(' | ') : 'ninguno');
  await b.close();
  return res.nFallos || !res.igual || !res.distinta || errs.length ? 1 : 0;
}

if (process.argv.includes('--web')) {
  auditarWeb()
    .then(code => process.exit(fallos || arranquesMal || code ? 1 : 0))
    .catch(e => { console.error('\nNo se pudo auditar el generador web:', e.message); process.exit(1); });
} else {
  process.exit(fallos || arranquesMal ? 1 : 0);
}
