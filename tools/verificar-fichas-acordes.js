'use strict';
/**
 * Audita las fichas de acordes triada.
 *
 *   node tools/verificar-fichas-acordes.js
 *
 * Genera los mismos ejercicios que tools/generate-fichas-acordes.js (mismas
 * semillas) y los revisa SIN usar su teoria: parte de lo que se dibuja —las
 * claves de VexFlow ("e/4") y sus alteraciones ("bb")— y vuelve a deducir que
 * acorde es con una tabla escrita aparte. Si coinciden, la hoja dice la verdad.
 *
 * Tambien comprueba que los nombres de los tipos son los mismos que usa el test
 * en pantalla (assets/js/acordes-engine.js): papel y pantalla no pueden llamar
 * distinto al mismo acorde.
 */
const fs = require('fs');
const path = require('path');
const G = require('./generate-fichas-acordes.js');

const ROOT = path.join(__dirname, '..');

/* Tabla propia: semitonos fundamental->3ª y fundamental->5ª. */
const ESPECIE = { '4-7': 'Perfecta Mayor', '3-7': 'Perfecta menor', '3-6': '5ª Disminuida', '4-8': '5ª Aumentada' };
const PASO = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 };
const ALTURA = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const ALT = { '': 0, '#': 1, '##': 2, b: -1, bb: -2 };
/* Lineas del pentagrama como indice diatonico (oct*7 + paso). */
const LINEAS = { sol: [30, 38], fa: [18, 26] };   // Mi4-Fa5 / Sol2-La3

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 60) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

/* ---- 1. nombres iguales que en el test en pantalla ---- */
const motor = fs.readFileSync(path.join(ROOT, 'assets/js/acordes-engine.js'), 'utf8');
const bloque = motor.slice(motor.indexOf('var TRIADS'), motor.indexOf('];', motor.indexOf('var TRIADS')));
const enMotor = [...bloque.matchAll(/third:\s*(\d+),\s*fifth:\s*(\d+),\s*label:\s*'([^']*)'/g)]
  .map(m => ({ clave: m[1] + '-' + m[2], nombre: m[3].replace(/\\x([0-9a-f]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))) }));
if (enMotor.length !== 4) mal('motor', `se esperaban 4 tipos en acordes-engine.js y se leen ${enMotor.length}`);
enMotor.forEach(t => {
  if (ESPECIE[t.clave] !== t.nombre) mal('motor', `el test llama "${t.nombre}" a ${t.clave} y la tabla dice "${ESPECIE[t.clave]}"`);
  const g = G.TIPOS.find(x => x.t3 + '-' + x.t5 === t.clave);
  if (!g || g.nombre !== t.nombre) mal('ficha', `la ficha llama "${g && g.nombre}" a lo que el test llama "${t.nombre}"`);
});

/* ---- 2. cada ficha ---- */
let revisados = 0;
for (const pos of G.POSICIONES) {
  for (const modo of ['analizar', 'escribir']) {
    const hoja = `${modo} ${pos.id}`;
    const ej = G.generarEjercicios(G.TOTAL, G.semilla(pos.id, modo), pos.id);
    if (ej.length !== G.TOTAL) mal(hoja, `tiene ${ej.length} ejercicios y deberian ser ${G.TOTAL}`);
    const vistos = new Set();

    ej.forEach((e, i) => {
      revisados++;
      const donde = `${hoja} nº${i + 1}`;
      const notas = e.notas.map(n => {
        const [letra, oct] = n.key.split('/');
        return { letra, diat: Number(oct) * 7 + PASO[letra], alt: ALT[n.acc], midi: Number(oct) * 12 + ALTURA[letra] + ALT[n.acc] };
      });

      // Orden: de grave a agudo, sin notas repetidas.
      for (let k = 1; k < 3; k++) {
        if (!(notas[k].midi > notas[k - 1].midi)) mal(donde, 'las notas no van de grave a agudo');
      }

      // Fundamental: la nota desde la que las otras dos estan a 3ª y 5ª (en letras).
      const raiz = notas.find(r => {
        const otras = notas.filter(x => x !== r).map(x => ((PASO[x.letra] - PASO[r.letra]) % 7 + 7) % 7).sort();
        return otras[0] === 2 && otras[1] === 4;
      });
      if (!raiz) { mal(donde, 'las tres notas no forman una triada por terceras'); return; }
      const tercera = notas.find(x => ((PASO[x.letra] - PASO[raiz.letra]) % 7 + 7) % 7 === 2);
      const quinta = notas.find(x => ((PASO[x.letra] - PASO[raiz.letra]) % 7 + 7) % 7 === 4);

      const s3 = ((tercera.midi - raiz.midi) % 12 + 12) % 12;
      const s5 = ((quinta.midi - raiz.midi) % 12 + 12) % 12;
      const especie = ESPECIE[s3 + '-' + s5];
      if (especie !== e.tipo.nombre) mal(donde, `se dibuja ${especie || s3 + '/' + s5 + ' semitonos'} y la ficha dice ${e.tipo.nombre}`);

      // Posicion: que miembro esta en el bajo.
      const inv = notas[0] === raiz ? 0 : notas[0] === tercera ? 1 : notas[0] === quinta ? 2 : -1;
      if (inv !== e.inv) mal(donde, `la nota grave indica posicion ${inv} y la ficha dice ${e.inv}`);
      if (pos.inv !== null && e.inv !== pos.inv) mal(donde, `hay un acorde en posicion ${e.inv} en una ficha de posicion ${pos.inv}`);

      // En "escribir" el enunciado nombra la fundamental: tiene que ser esta.
      const m0 = e.miembros[0];
      if (PASO[raiz.letra] !== ['c', 'd', 'e', 'f', 'g', 'a', 'b'].indexOf(['c', 'd', 'e', 'f', 'g', 'a', 'b'][m0.l]) || raiz.alt !== m0.a) {
        mal(donde, 'el nombre de la fundamental del enunciado no coincide con la dibujada');
      }

      // Alteraciones y fase: la hoja va de naturales a dobles.
      const nivel = Math.max(...notas.map(x => Math.abs(x.alt)));
      const fase = Math.floor(i / (G.TOTAL / 3));
      if (nivel !== G.FASES[fase].nivel) mal(donde, `lleva nivel de alteracion ${nivel} en la fase ${fase + 1} (tocaba ${G.FASES[fase].nivel})`);
      if (e.clave === 'fa' && fase === 0) mal(donde, 'clave de fa en la primera fase');

      // Como mucho una linea adicional.
      const [inf, sup] = LINEAS[e.clave];
      notas.forEach(x => {
        const adicionales = x.diat < inf ? Math.floor((inf - x.diat) / 2) : x.diat > sup ? Math.floor((x.diat - sup) / 2) : 0;
        if (adicionales > 1) mal(donde, `una nota necesita ${adicionales} lineas adicionales`);
      });

      // La firma lleva la ESCRITURA (letra y alteración), no solo la altura: Do♯–Mi♯–Sol♯♯
      // y Re♭–Fa–La suenan igual pero son dos ejercicios distintos, y con solo la altura
      // el verificador los daba por repetidos.
      const firma = e.notas.map(n => n.key + n.acc).join(',') + e.clave;
      if (vistos.has(firma)) mal(donde, 'acorde repetido exactamente en la misma hoja');
      vistos.add(firma);
    });

    const tipos = new Set(ej.map(e => e.tipo.id));
    if (tipos.size < 4) mal(hoja, `solo aparecen ${tipos.size} de los 4 tipos`);
    if (pos.inv === null) {
      const invs = ej.map(e => e.inv);
      [0, 1, 2].forEach(v => { if (invs.filter(x => x === v).length < 5) mal(hoja, `la posicion ${v} sale solo ${invs.filter(x => x === v).length} veces`); });
    }
    const fa = ej.filter(e => e.clave === 'fa').length;
    if (fa < 3) mal(hoja, `solo ${fa} acordes en clave de fa`);
  }
}

console.log(`\n  ${revisados} acordes revisados en 8 fichas, ${fallos} problema(s).`);

/* --web: el generador del navegador (/ejercicios/acordes/), que sortea con las
   opciones que elija el profesor. Se prueban muchas combinaciones y semillas
   con las mismas comprobaciones, deduciendo el acorde de lo que se dibuja.
   Necesita el sitio servido en localhost:8099 (node tools/serve.js). */
async function auditarWeb() {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8099/ejercicios/acordes/', { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => window.tmFichasAcordesTest, null, { timeout: 15000 });

  const res = await p.evaluate(({ ESPECIE, PASO, ALTURA, ALT, LINEAS }) => {
    const ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    const TXT = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };
    const combos = [];
    [['mayor', 'menor', 'dis', 'aum'], ['mayor'], ['dis', 'aum'], ['aum']].forEach(tipos =>
      [[0], [1], [2], [0, 1, 2], [1, 2]].forEach(invs =>
        ['sol', 'fa', 'ambas'].forEach(clave =>
          ['naturales', 'progresiva', 'alteradas'].forEach(dificultad =>
            [12, 21, 60].forEach(total => combos.push({ tipos, invs, clave, dificultad, total }))))));

    const fallos = [];
    let hojas = 0, acordes = 0, cortas = 0, vacias = 0;
    combos.forEach(c => {
      for (let s = 0; s < 4; s++) {
        const o = Object.assign({}, c, { semilla: 20000 + s * 7919 });
        const hoja = window.tmFichasAcordesTest.generarHoja(o);
        hojas++; acordes += hoja.length;
        if (!hoja.length) vacias++; else if (hoja.length < c.total) cortas++;
        const ref = `[${c.tipos}/${c.invs}/${c.clave}/${c.dificultad}/${c.total}/${o.semilla}]`;
        const vistos = new Set();
        let nivelPrevio = 0;
        if (hoja.length > c.total) fallos.push(`${ref} tiene ${hoja.length} acordes y se pidieron ${c.total}`);

        hoja.forEach((e, i) => {
          const donde = `${ref} nº${i + 1}`;
          const notas = e.notas.map(n => {
            const [letra, oct] = n.key.split('/');
            return { letra, alt: ALT[n.acc], diat: Number(oct) * 7 + PASO[letra], midi: Number(oct) * 12 + ALTURA[letra] + ALT[n.acc] };
          });
          for (let k = 1; k < 3; k++) if (!(notas[k].midi > notas[k - 1].midi)) fallos.push(`${donde} no va de grave a agudo`);
          const d = (x, r) => ((PASO[x.letra] - PASO[r.letra]) % 7 + 7) % 7;
          const raiz = notas.find(r => { const o2 = notas.filter(x => x !== r).map(x => d(x, r)).sort(); return o2[0] === 2 && o2[1] === 4; });
          if (!raiz) { fallos.push(`${donde} no es una tríada por terceras`); return; }
          const t3 = notas.find(x => d(x, raiz) === 2), t5 = notas.find(x => d(x, raiz) === 4);
          const especie = ESPECIE[((t3.midi - raiz.midi) % 12 + 12) % 12 + '-' + ((t5.midi - raiz.midi) % 12 + 12) % 12];
          if (especie !== e.tipo.nombre) fallos.push(`${donde} se dibuja ${especie} y dice ${e.tipo.nombre}`);
          if (c.tipos.indexOf(e.tipo.id) < 0) fallos.push(`${donde} tipo ${e.tipo.id} no pedido`);
          const inv = notas[0] === raiz ? 0 : notas[0] === t3 ? 1 : 2;
          if (inv !== e.inv) fallos.push(`${donde} posición dibujada ${inv} y dice ${e.inv}`);
          if (c.invs.indexOf(inv) < 0) fallos.push(`${donde} posición ${inv} no pedida`);
          if (e.raiz !== ES[PASO[raiz.letra]] + TXT[String(raiz.alt)]) fallos.push(`${donde} el enunciado nombra ${e.raiz} y la fundamental es otra`);
          if (c.clave !== 'ambas' && e.clave !== c.clave) fallos.push(`${donde} clave ${e.clave} no pedida`);

          const nivel = Math.max(...notas.map(x => Math.abs(x.alt)));
          if (nivel > 2) fallos.push(`${donde} alteración triple`);
          if (c.dificultad === 'naturales' && nivel !== 0) fallos.push(`${donde} alteraciones en "sin alteraciones"`);
          if (c.dificultad === 'alteradas' && nivel === 0) fallos.push(`${donde} acorde natural en "con alteraciones"`);
          if (c.dificultad === 'progresiva') {
            if (nivel < nivelPrevio) fallos.push(`${donde} baja la dificultad (${nivelPrevio}→${nivel})`);
            if (c.clave === 'ambas' && nivel === 0 && e.clave === 'fa') fallos.push(`${donde} clave de fa en el tramo inicial`);
          }
          nivelPrevio = nivel;

          const [inf, sup] = LINEAS[e.clave];
          notas.forEach(x => {
            const adic = x.diat < inf ? Math.floor((inf - x.diat) / 2) : x.diat > sup ? Math.floor((x.diat - sup) / 2) : 0;
            if (adic > 1) fallos.push(`${donde} ${adic} líneas adicionales`);
            if (x.diat > sup + 1) fallos.push(`${donde} nota por encima de la quinta línea (se cortarían los bemoles)`);
          });
          const firma = e.notas.map(n => n.key + n.acc).join(',') + e.clave;
          if (vistos.has(firma)) fallos.push(`${donde} acorde repetido`);
          vistos.add(firma);
        });
      }
    });

    const clave = h => JSON.stringify(h.map(e => e.notas.map(n => n.key + n.acc).join() + e.clave + e.tipo.id));
    const base = { tipos: ['mayor', 'menor', 'dis', 'aum'], invs: [0, 1, 2], clave: 'ambas', dificultad: 'progresiva', total: 21 };
    const igual = clave(window.tmFichasAcordesTest.generarHoja(Object.assign({ semilla: 4821 }, base)))
      === clave(window.tmFichasAcordesTest.generarHoja(Object.assign({ semilla: 4821 }, base)));
    const distinta = clave(window.tmFichasAcordesTest.generarHoja(Object.assign({ semilla: 4821 }, base)))
      !== clave(window.tmFichasAcordesTest.generarHoja(Object.assign({ semilla: 4822 }, base)));
    return { hojas, acordes, cortas, vacias, nFallos: fallos.length, fallos: fallos.slice(0, 12), igual, distinta };
  }, { ESPECIE, PASO, ALTURA, ALT, LINEAS });

  console.log('\n  === Generador del navegador ===');
  console.log(`  ${res.hojas} hojas · ${res.acordes} acordes · ${res.nFallos} fallo(s)`);
  res.fallos.forEach(f => console.log('    · ' + f));
  console.log(`  Hojas cortas (repertorio agotado, se avisa en pantalla): ${res.cortas} · vacías: ${res.vacias}`);
  console.log(`  Misma semilla → misma hoja: ${res.igual} · semilla distinta → hoja distinta: ${res.distinta}`);
  console.log(`  Errores JS: ${errs.length ? errs.join(' | ') : 'ninguno'}`);
  await b.close();
  return res.nFallos || !res.igual || !res.distinta || errs.length ? 1 : 0;
}

if (process.argv.includes('--web')) {
  auditarWeb()
    .then(code => process.exit(fallos || code ? 1 : 0))
    .catch(e => { console.error('\n  No se pudo auditar el generador web:', e.message); process.exit(1); });
} else {
  process.exit(fallos ? 1 : 0);
}
