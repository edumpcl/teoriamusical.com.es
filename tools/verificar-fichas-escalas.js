'use strict';
/**
 * Audita las fichas de escalas.
 *
 *   node tools/verificar-fichas-escalas.js
 *
 * Genera los mismos ejercicios que tools/generate-fichas-escalas.js y los revisa
 * SIN su teoría: parte de lo que se DIBUJA —clave VexFlow de cada nota, signo
 * escrito y armadura— y lo LEE como lo leería un alumno (armadura + arrastre de
 * alteraciones en el compás). De esas alturas deduce qué escala es con tablas
 * escritas aparte. Así se pillan a la vez errores de deletreo, de armadura y de
 * signos (un becuadro que falta, un sostenido redundante).
 *
 * Además compara el deletreo con los datos de los tests en pantalla
 * (assets/js/escalas-construir-data.js): papel y pantalla deben coincidir.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const G = require('./generate-fichas-escalas.js');

const ROOT = path.join(__dirname, '..');
const PASO = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 };
const ALTURA = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const GLIFO = { '#': 1, '##': 2, b: -1, bb: -2, n: 0 };
const ES = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
const TXT = { '-2': '𝄫', '-1': '♭', '0': '', '1': '♯', '2': '𝄪' };

/* Tablas propias. Patrón = semitonos desde la tónica de cada grado. */
const PATRONES = {
  '0,2,4,5,7,9,11,12': 'Mayor',
  '0,2,4,5,7,8,11,12': 'Mayor mixta principal',
  '0,2,4,5,7,8,10,12': 'Mayor mixta secundaria',
  '0,2,4,5,7,9,10,12': 'mixolidia',
  '0,2,3,5,7,8,10,12': 'menor natural',
  '0,2,3,5,7,8,11,12': 'menor armónica',
  '0,2,3,5,7,9,10,12': 'dórica',
  '0,2,3,5,7,9,11,12,10,8,7,5,3,2,0': 'menor melódica',
};
/* Armaduras de las tonalidades mayores, tecleadas: >0 sostenidos, <0 bemoles. */
const ARM_MAYOR = { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, 'F#': 6, 'C#': 7, F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5, Gb: -6, Cb: -7 };
const SOST = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
const BEM = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];
const LINEAS = { sol: [30, 38], fa: [18, 26] };

let fallos = 0;
const mal = (donde, msg) => { if (fallos < 60) console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

/* Nombre VexFlow de la tonalidad mayor con esa tónica ("eb" -> "Eb"). */
const claveMayor = (letra, alt) => letra.toUpperCase() + (alt === 1 ? '#' : alt === -1 ? 'b' : '');

/* Lee las notas como un músico: armadura + signos + arrastre en el compás. */
function leer(ej) {
  const porLetra = {};
  if (ej.conArmadura) {
    const n = ARM_MAYOR[ej.arm.vex];
    if (n === undefined) return { error: `armadura desconocida ${ej.arm.vex}` };
    (n > 0 ? SOST : BEM).slice(0, Math.abs(n)).forEach(l => { porLetra[l] = n > 0 ? 1 : -1; });
  }
  const activo = {};
  const notas = [];
  for (const nt of ej.notas) {
    const [letra, oct] = nt.key.split('/');
    const clave = letra + oct;
    const heredada = clave in activo ? activo[clave] : (porLetra[letra] || 0);
    let alt = heredada;
    if (nt.glyph) {
      alt = GLIFO[nt.glyph];
      if (alt === heredada) return { error: `signo redundante en ${nt.key} (${nt.glyph})` };
    }
    activo[clave] = alt;
    notas.push({ letra, oct: Number(oct), alt, diat: Number(oct) * 7 + PASO[letra], midi: Number(oct) * 12 + ALTURA[letra] + alt });
  }
  return { notas };
}

/* ---- 1. cada ficha ---- */
let revisadas = 0;
for (const familia of Object.keys(G.FAMILIAS)) {
  for (const modo of G.MODOS) {
    const hoja = `${modo} ${familia}`;
    const ej = G.generarEjercicios(G.TOTAL, G.semilla(familia, modo), familia, modo);
    if (ej.length !== G.TOTAL) mal(hoja, `tiene ${ej.length} escalas y deberían ser ${G.TOTAL}`);
    const vistos = new Set();
    const tiposVistos = new Set();

    ej.forEach((e, i) => {
      revisadas++;
      const donde = `${hoja} nº${i + 1} (${e.nombre})`;
      const r = leer(e);
      if (r.error) { mal(donde, r.error); return; }
      const n = r.notas;

      // Letras seguidas: sube de una en una (y la melódica baja igual).
      const largo = n.length;
      if (largo !== 8 && largo !== 15) mal(donde, `${largo} notas`);
      for (let k = 1; k < largo; k++) {
        const dir = k < 8 ? 1 : -1;
        if (n[k].diat - n[k - 1].diat !== dir) mal(donde, `la nota ${k + 1} no va por grado conjunto`);
        if (dir * (n[k].midi - n[k - 1].midi) <= 0) mal(donde, `la nota ${k + 1} no ${dir > 0 ? 'sube' : 'baja'}`);
      }

      // Qué escala es, desde las alturas leídas.
      const patron = n.map(x => x.midi - n[0].midi).join(',');
      const tipo = PATRONES[patron];
      if (!tipo) { mal(donde, `el patrón ${patron} no es ninguna escala conocida`); return; }
      const ton = ES[n[0].letra] + TXT[String(n[0].alt)];
      const menor = /menor|dórica/.test(tipo);
      const esperado = (menor ? ton.toLowerCase() : ton) + ' ' + tipo;
      if (esperado !== e.nombre) mal(donde, `lo dibujado es «${esperado}»`);
      tiposVistos.add(tipo);
      if (G.FAMILIAS[familia].tipos.indexOf(e.tipo.id) < 0) mal(donde, 'tipo que no toca en esta familia');

      // Armadura: la de la mayor para Mayor/mixtas/mixolidia, la de la menor para menores y dórica.
      let relMayor;
      if (menor) {
        // relativo mayor: una 3ª menor por encima (letra +2, +3 semitonos)
        const letras = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        const l = letras[(PASO[n[0].letra] + 2) % 7];
        const obj = ((ALTURA[n[0].letra] + n[0].alt + 3) % 12 + 12) % 12;
        let a = ((obj - ALTURA[l]) % 12 + 12) % 12; if (a > 6) a -= 12;
        relMayor = claveMayor(l, a);
      } else {
        relMayor = claveMayor(n[0].letra, n[0].alt);
      }
      if (!(relMayor in ARM_MAYOR)) mal(donde, `tonalidad ${relMayor} fuera de las 15 armaduras`);
      else {
        if (e.arm.vex !== relMayor) mal(donde, `armadura ${e.arm.vex}, tocaba ${relMayor}`);
        const nivel = Math.abs(ARM_MAYOR[relMayor]);
        const fase = i < 3 ? 0 : i < 6 ? 1 : 2;
        if (G.FASES[fase].niveles.indexOf(nivel) < 0) mal(donde, `armadura de ${nivel} alteraciones en la fase ${fase + 1}`);
        if (fase === 0 && e.clave === 'fa') mal(donde, 'clave de fa en el tramo inicial');
      }

      // Con o sin armadura según el ejercicio.
      if (modo === 'escribir' && e.conArmadura) mal(donde, 'lleva armadura en «escribir»');
      if (modo === 'escribir-con-armadura' && !e.conArmadura) mal(donde, 'sin armadura en «escribir con armadura»');

      // Como mucho una línea adicional.
      const [inf, sup] = LINEAS[e.clave];
      n.forEach(x => {
        const adic = x.diat < inf ? Math.floor((inf - x.diat) / 2) : x.diat > sup ? Math.floor((x.diat - sup) / 2) : 0;
        if (adic > 1) mal(donde, `una nota con ${adic} líneas adicionales`);
      });

      if (vistos.has(e.nombre)) mal(donde, 'escala repetida en la hoja');
      vistos.add(e.nombre);
    });

    if (modo === 'identificar') {
      const con = ej.filter(e => e.conArmadura).length;
      if (con < 3 || ej.length - con < 3) mal(hoja, `${con} con armadura y ${ej.length - con} sin: tiene que haber de las dos`);
    }
    const minTipos = familia === 'mayores-y-menores' ? 6 : G.FAMILIAS[familia].tipos.length;
    if (tiposVistos.size < minTipos) mal(hoja, `solo aparecen ${tiposVistos.size} tipos`);
  }
}

/* ---- 2. el deletreo coincide con el de los tests en pantalla ---- */
const caja = { window: {} };
vm.createContext(caja);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js/escalas-construir-data.js'), 'utf8'), caja);
const DATOS = caja.window.TM_CONSTRUIR_SCALES;
let comparadas = 0;
for (const tipo of G.TIPOS) {
  if (!DATOS[tipo.id]) continue;          // la Mayor vive dentro de su motor
  for (const d of DATOS[tipo.id]) {
    const secuencia = d.seq
      ? d.seq.map(t => t[0] + ':' + t[2])
      : d.notes.map(k => k.split('/')[0] + ':' + ({ '#': 1, b: -1 }[d.acc[k]] || 0));
    // Misma escala generada por la ficha (sin armadura, en clave de sol).
    const tonLetra = d.seq ? d.seq[0][0] : d.notes[0].split('/')[0];
    const tonAlt = d.seq ? d.seq[0][2] : ({ '#': 1, b: -1 }[d.acc[d.notes[0]]] || 0);
    const lista = tipo.familia === 'mayor' ? G.TONICAS_MAY : G.TONICAS_MEN;
    if (!lista.some(t => t[0] === tonLetra && t[1] === tonAlt)) { mal('web', `${d.name}: tónica que no está en la ficha`); continue; }
    let hojaEj = null;
    for (const fam of Object.keys(G.FAMILIAS)) {
      for (let s = 0; s < 400 && !hojaEj; s++) {
        const cand = G.generarEjercicios(G.TOTAL, 90000 + s, fam, 'escribir').find(x => x.tipo.id === tipo.id && x.notas[0].key[0] === tonLetra && x.notas[0].a === tonAlt);
        if (cand) hojaEj = cand;
      }
      if (hojaEj) break;
    }
    if (!hojaEj) continue;               // tonalidades de mucha armadura pueden no salir: no es error
    const propia = hojaEj.notas.map(x => x.key[0] + ':' + x.a);
    comparadas++;
    if (propia.join(' ') !== secuencia.join(' ')) mal('web', `${d.name}: la ficha deletrea ${propia.join(' ')} y el test ${secuencia.join(' ')}`);
  }
}

console.log(`\n  ${revisadas} escalas revisadas en ${Object.keys(G.FAMILIAS).length * G.MODOS.length} fichas · ${comparadas} deletreos comparados con los tests · ${fallos} problema(s).`);

/* --web: el generador a medida del navegador (/ejercicios/escalas/#fichas). Se
   prueban todas las combinaciones de opciones con varias semillas y se revisa
   cada escala igual que arriba, leyendo lo que se dibuja. Después se imprime de
   verdad (page.pdf) para contar páginas. Necesita node tools/serve.js en 8099. */
async function auditarWeb() {
  const { chromium } = require('playwright');
  const URL = 'http://localhost:8099/ejercicios/escalas/';
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL, { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => window.tmFichasEscalasTest, null, { timeout: 15000 });
  const DIF = await p.evaluate(() => window.tmFichasEscalasTest.DIFICULTADES);
  const antes = fallos;

  const TODOS = G.TIPOS.map(t => t.id);
  const SETS = [TODOS, TODOS.slice(0, 4), TODOS.slice(4), ['menor-melodica'], ['mayor'], ['mixolidia', 'menor-dorica']];
  const combos = [];
  for (const tipos of SETS) for (const modo of G.MODOS) for (const clave of ['sol', 'fa', 'ambas'])
    for (const dificultad of Object.keys(DIF)) for (const presentacion of modo === 'identificar' ? ['mezcla', 'armadura', 'alteraciones'] : ['mezcla'])
      for (const total of [8, 24]) for (let s = 0; s < 3; s++)
        combos.push({ tipos, modo, clave, dificultad, presentacion, total, semilla: 30000 + s * 7919 + total });

  let hojas = 0, escalas = 0, cortas = 0;
  for (let k = 0; k < combos.length; k += 60) {
    const lote = combos.slice(k, k + 60);
    const res = await p.evaluate(cs => cs.map(c => window.tmFichasEscalasTest.generarHoja(c)), lote);
    res.forEach((hoja, j) => {
      const c = lote[j];
      const ref = `[${c.tipos.length === 8 ? 'todas' : c.tipos.join('+')}/${c.modo}/${c.presentacion}/${c.clave}/${c.dificultad}/${c.total}/${c.semilla}]`;
      hojas++; escalas += hoja.length;
      const fases = DIF[c.dificultad];

      // ¿Corta con razón? Casos posibles contados aparte, con la tabla de armaduras propia.
      const niveles = new Set(fases.flatMap(f => f.niveles));
      let posibles = 0;
      for (const id of c.tipos) {
        const t = G.TIPOS.find(x => x.id === id);
        (t.familia === 'mayor' ? G.TONICAS_MAY : G.TONICAS_MEN).forEach((_, i) => {
          const nivel = i < 8 ? i : i - 7;
          if (!niveles.has(nivel)) return;
          posibles += c.clave !== 'ambas' ? 1 : (c.dificultad === 'progresiva' && nivel <= 2 ? 1 : 2);
        });
      }
      if (hoja.length < Math.min(c.total, posibles)) mal(ref, `${hoja.length} escalas con ${posibles} posibles`);
      if (hoja.length < c.total) cortas++;

      const vistos = new Set();
      let faseAnt = 0;
      hoja.forEach((e, i) => {
        const donde = `${ref} nº${i + 1} (${e.nombre})`;
        const r = leer(e);
        if (r.error) { mal(donde, r.error); return; }
        const n = r.notas;
        for (let q = 1; q < n.length; q++) {
          const dir = q < 8 ? 1 : -1;
          if (n[q].diat - n[q - 1].diat !== dir || dir * (n[q].midi - n[q - 1].midi) <= 0) { mal(donde, `la nota ${q + 1} no va por grado conjunto`); break; }
        }
        const tipo = PATRONES[n.map(x => x.midi - n[0].midi).join(',')];
        if (!tipo) { mal(donde, 'lo dibujado no es ninguna escala conocida'); return; }
        const menor = /menor|dórica/.test(tipo);
        const ton = ES[n[0].letra] + TXT[String(n[0].alt)];
        if ((menor ? ton.toLowerCase() : ton) + ' ' + tipo !== e.nombre) mal(donde, `lo dibujado es «${ton} ${tipo}»`);
        if (c.tipos.indexOf(e.tipo.id) < 0) mal(donde, 'tipo que no se ha pedido');

        let rel;
        if (menor) {
          const letras = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
          const l = letras[(PASO[n[0].letra] + 2) % 7];
          const obj = ((ALTURA[n[0].letra] + n[0].alt + 3) % 12 + 12) % 12;
          let a = ((obj - ALTURA[l]) % 12 + 12) % 12; if (a > 6) a -= 12;
          rel = claveMayor(l, a);
        } else rel = claveMayor(n[0].letra, n[0].alt);
        if (!(rel in ARM_MAYOR)) { mal(donde, `tonalidad ${rel} fuera de las 15`); return; }
        if (e.arm.vex !== rel) mal(donde, `armadura ${e.arm.vex}, tocaba ${rel}`);
        const nivel = Math.abs(ARM_MAYOR[rel]);
        if (!fases[e.fase] || fases[e.fase].niveles.indexOf(nivel) < 0) mal(donde, `armadura de ${nivel} alteraciones en la fase ${e.fase + 1}`);
        if (e.fase < faseAnt) mal(donde, 'vuelve a una fase más fácil');
        faseAnt = e.fase;

        if (c.clave !== 'ambas' && e.clave !== c.clave) mal(donde, `clave de ${e.clave}`);
        if (c.clave === 'ambas' && c.dificultad === 'progresiva' && e.fase === 0 && e.clave === 'fa') mal(donde, 'clave de fa en el tramo inicial');

        if (c.modo === 'escribir' && e.conArmadura) mal(donde, 'lleva armadura en «escribir»');
        if (c.modo === 'escribir-con-armadura' && !e.conArmadura) mal(donde, 'sin armadura en «con armadura»');
        if (c.modo === 'identificar' && c.presentacion === 'armadura' && !e.conArmadura) mal(donde, 'sin armadura y se pidieron todas con armadura');
        if (c.modo === 'identificar' && c.presentacion === 'alteraciones' && e.conArmadura) mal(donde, 'con armadura y se pidieron todas sin');

        const [inf, sup] = LINEAS[e.clave];
        if (n.some(x => (x.diat < inf ? Math.floor((inf - x.diat) / 2) : x.diat > sup ? Math.floor((x.diat - sup) / 2) : 0) > 1)) mal(donde, 'más de una línea adicional');

        if (vistos.has(e.nombre + e.clave)) mal(donde, 'escala repetida en la misma clave');
        vistos.add(e.nombre + e.clave);
        // La misma escala en otra clave solo vale si ya no quedaban escalas nuevas.
        if (hoja.filter(x => x.nombre === e.nombre).length > 1
          && new Set(hoja.map(x => x.nombre)).size < Math.min(hoja.length, distintasEscalas(c, niveles))) {
          mal(donde, 'repite escala pudiendo poner otra');
        }
      });
      if (c.modo === 'identificar' && c.presentacion === 'mezcla' && hoja.length > 1) {
        const con = hoja.filter(e => e.conArmadura).length;
        if (Math.abs(2 * con - hoja.length) > 1) mal(ref, `${con} con armadura de ${hoja.length}`);
      }
    });
  }

  // Misma semilla, misma hoja; otra semilla, otra hoja.
  const rep = await p.evaluate(() => {
    const T = window.tmFichasEscalasTest;
    const o = s => ({ tipos: T.TIPOS.map(t => t.id), modo: 'identificar', presentacion: 'mezcla', clave: 'ambas', dificultad: 'progresiva', total: 8, semilla: s });
    const k = h => JSON.stringify(h);
    return { igual: k(T.generarHoja(o(4821))) === k(T.generarHoja(o(4821))), distinta: k(T.generarHoja(o(4821))) !== k(T.generarHoja(o(4822))) };
  });
  if (!rep.igual) mal('web', 'la misma semilla no da la misma hoja');
  if (!rep.distinta) mal('web', 'dos semillas dan la misma hoja');

  /* Impresión real: ocho escalas en una cara de A4, dieciséis en dos. Se prueba lo
     que más ocupa (siete alteraciones y la melódica de 15 notas) y el botón de
     verdad, con el clon que cuelga de <body>. */
  const impresiones = [];
  for (const m of G.MODOS) for (const [t, n, esperadas] of [['menor-melodica', 8, 1], [TODOS.join(','), 8, 1], [TODOS.join(','), 16, 2], ['mayor', 4, 1]]) {
    const url = `${URL}?hoja=777&t=${t}&m=${m}&p=mezcla&c=ambas&d=muchas&n=${n}`;
    const pg = await b.newPage({ viewport: { width: 390, height: 800 } });
    pg.on('pageerror', e => errs.push(e.message));
    await pg.goto(url, { waitUntil: 'networkidle' });
    await pg.waitForSelector('#tmfe .tm-fe-fila svg');
    // Sin el banner de cookies, que tapa los botones en el móvil.
    await pg.evaluate(() => { window.print = () => {}; const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });
    for (const sol of [false, true]) {
      if (sol) await pg.click('#tmfe [data-a="soluciones"]');
      await pg.click('#tmfe [data-a="imprimir"]');
      const filas = await pg.evaluate(() => document.querySelectorAll('.tm-fe-impresion .tm-fe-fila').length);
      const pdf = await pg.pdf({ format: 'A4', preferCSSPageSize: true });
      const paginas = Number((pdf.toString('latin1').match(/\/Count\s+(\d+)/) || [])[1] || 0);
      const limpio = await pg.evaluate(() => !document.querySelector('.tm-fe-impresion') && !document.body.classList.contains('tm-fe-print'));
      const ok = paginas === esperadas && filas === n && limpio;
      impresiones.push(ok);
      if (!ok) mal(`imprimir ${m} ${t.length > 20 ? 'todas' : t} n=${n}${sol ? ' soluciones' : ''}`, `${paginas} página(s) (tocaban ${esperadas}), ${filas} filas, clon retirado: ${limpio}`);
    }
    await pg.close();
  }

  console.log('\n  === Generador del navegador ===');
  console.log(`  ${hojas} hojas y ${escalas} escalas revisadas (${cortas} hojas cortas por falta de escalas distintas)`);
  console.log(`  impresión: ${impresiones.filter(Boolean).length}/${impresiones.length} casos correctos`);
  if (errs.length) console.log('  errores de página: ' + errs.slice(0, 3).join(' | '));
  console.log(`  ${fallos - antes} problema(s) en el generador web.`);
  await b.close();
  return fallos - antes || errs.length ? 1 : 0;
}

/* Escalas distintas (sin contar la clave) que admiten las opciones. */
function distintasEscalas(c, niveles) {
  let n = 0;
  for (const id of c.tipos) {
    const t = G.TIPOS.find(x => x.id === id);
    (t.familia === 'mayor' ? G.TONICAS_MAY : G.TONICAS_MEN).forEach((_, i) => { if (niveles.has(i < 8 ? i : i - 7)) n++; });
  }
  return n;
}

if (process.argv.includes('--web')) {
  auditarWeb()
    .then(code => process.exit(fallos || code ? 1 : 0))
    .catch(e => { console.error('\n  No se pudo auditar el generador web:', e.message); process.exit(1); });
} else {
  process.exit(fallos ? 1 : 0);
}
