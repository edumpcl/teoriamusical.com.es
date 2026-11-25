/* Auditoría de assets/js/cifrado-romano-engine.js. NO se fía del motor: recalcula cada acorde con SU PROPIA aritmética de semitonos
   (escala mayor y menor armónica desde la tónica), deduce el cifrado del método del sitio y lo compara. Las cifras de las séptimas se
   leen del fichero de datos de las páginas de séptimas (tools/notacion/datos/acordes-septimas.js), no de una copia.
   Uso: node tools/verificar-cifrado-romano.js */
const fs = require('fs');
const path = require('path');
const E = require('../assets/js/cifrado-romano-engine.js');

const SEMI_MAYOR = [0, 2, 4, 5, 7, 9, 11], SEMI_MENOR_ARM = [0, 2, 3, 5, 7, 8, 11];
const NATURAL = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const LET = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
let fallos = 0, comprobaciones = 0;
const mal = (m) => { fallos++; if (fallos <= 40) console.log('✗', m); };
const ok = (c, m) => { comprobaciones++; if (!c) mal(m); };

// ---- cifras de las séptimas: las del fichero de datos de las páginas
const fuente = fs.readFileSync(path.join(__dirname, 'notacion/datos/acordes-septimas.js'), 'utf8');
const Tch = (t) => ({ t, tachado: true });
function cifrasDelFichero(id) {
  const m = new RegExp(id + ': \\{[\\s\\S]*?cifras: (\\[\\[[\\s\\S]*?\\]\\]),').exec(fuente);
  if (!m) throw new Error('no encuentro las cifras de ' + id + ' en el fichero de datos');
  return new Function('T', 'return ' + m[1])(Tch);
}
const CIFRAS_SEPTIMA = { D7: cifrasDelFichero('dominante'), 'ø7': cifrasDelFichero('sensible'), o7: cifrasDelFichero('disminuida') };
const txtFig = (fs_) => fs_.map((f) => (f.tachado ? '~' : '') + f.t).join('/');

function tonicaPc(t) { return ((NATURAL[LET[t.tonica]] + E.altArm(t.arm, t.tonica)) % 12 + 12) % 12; }

// ---- 1) los 7 grados de cada tonalidad
for (const t of E.TONALIDADES) {
  const semis = t.modo === 'M' ? SEMI_MAYOR : SEMI_MENOR_ARM, tpc = tonicaPc(t);
  for (let g = 1; g <= 7; g++) {
    const gr = E.grado(t, g);
    ok(gr.pc === (tpc + semis[g - 1]) % 12, `${t.id} grado ${g}: pc`);
    ok(LET[gr.letra] === LET[(t.tonica + g - 1) % 7], `${t.id} grado ${g}: letra`);
    ok(((NATURAL[LET[gr.letra]] + gr.alt) % 12 + 12) % 12 === gr.pc, `${t.id} grado ${g}: letra+alteración no da el pc`);
    ok(Math.abs(gr.alt) <= 1, `${t.id} grado ${g}: alteración ${gr.alt}`);
  }
}

// ---- 2) todos los acordes que se preguntan
let items = 0;
for (const t of E.TONALIDADES) {
  const semis = t.modo === 'M' ? SEMI_MAYOR : SEMI_MENOR_ARM, tpc = tonicaPc(t);
  const sensiblePc = (tpc + 11) % 12;   // la sensible está siempre a un semitono de la tónica (también en menor armónica)
  for (const sept of [false, true]) {
    const grados = sept ? [5, 7] : [1, 2, 4, 5, 6, 7];
    for (const g of grados) {
      for (let inv = 0; inv < (sept ? 4 : 3); inv++) {
        const it = E.generarUno({ nivel: 5, tonalidad: t.id, grado: g, septima: sept, inversion: inv }, E.mulberry32(g * 100 + inv));
        items++;
        const etq = `${t.id} ${g}${sept ? '7' : ''} inv${inv}`;
        const idx = sept ? [0, 2, 4, 6] : [0, 2, 4];
        const pcs = idx.map((k) => (tpc + semis[(g - 1 + k) % 7]) % 12);
        const interv = pcs.slice(1).map((p) => ((p - pcs[0]) % 12 + 12) % 12).join(',');
        const calEsp = (sept ? { '4,7,10': 'D7', '3,7,10': 'm7', '3,6,10': 'ø7', '3,6,9': 'o7' } : { '4,7': 'M', '3,7': 'm', '3,6': 'd', '4,8': 'a' })[interv];
        ok(it.calidad === calEsp, `${etq}: calidad ${it.calidad} ≠ ${calEsp}`);
        if (sept && g === 5) ok(calEsp === 'D7', `${etq}: V7 debe ser de dominante`);
        if (sept && g === 7) ok(calEsp === (t.modo === 'M' ? 'ø7' : 'o7'), `${etq}: VII7 mayor=sensible, menor=disminuida`);
        if (!sept && g === 5) ok(calEsp === 'M', `${etq}: V mayor también en menor armónica`);
        if (!sept && g === 7) ok(calEsp === 'd', `${etq}: VII disminuido`);
        // notas, orden de la inversión y bajo
        const ordenEsp = pcs.slice(inv).concat(pcs.slice(0, inv));
        const reales = it.notas.map((n) => ((NATURAL[LET[n.letra]] + n.alt) % 12 + 12) % 12);
        ok(reales.join() === ordenEsp.join(), `${etq}: notas ${reales} ≠ ${ordenEsp}`);
        ok(it.notas[0].rol === inv, `${etq}: el bajo debe ser la nota ${inv}`);
        const l0 = (t.tonica + g - 1) % 7;
        ok(it.notas.slice().sort((a, b) => a.rol - b.rol).map((n) => n.letra).join() === idx.map((k) => (l0 + k) % 7).join(), `${etq}: letras (terceras apiladas)`);
        // registro
        const pasos = it.notas.map((n) => n.paso);
        ok(pasos.every((p, i) => i === 0 || p > pasos[i - 1]), `${etq}: no ascienden ${pasos}`);
        ok(pasos[0] >= 27 && pasos[0] <= 33 && pasos[pasos.length - 1] <= 39, `${etq}: registro ${pasos}`);
        ok(it.notas.every((n) => n.paso % 7 === n.letra && n.oct === Math.floor(n.paso / 7)), `${etq}: paso/letra/octava`);
        // ---- CIFRADO
        const c = it.cif;
        ok(c.num === ROM[g - 1], `${etq}: el número romano debe ser ${ROM[g - 1]} (siempre en mayúscula), es ${c.num}`);
        ok(c.num === c.num.toUpperCase(), `${etq}: número romano en minúscula`);
        let esp;
        if (sept) esp = CIFRAS_SEPTIMA[calEsp][inv];
        else {
          const raizPc = pcs[0], terceraPc = pcs[1], quintaPc = pcs[2];
          const rS = raizPc === sensiblePc, tS = terceraPc === sensiblePc, qS = quintaPc === sensiblePc;
          if (inv === 0) esp = calEsp === 'd' ? [Tch('5')] : (rS || tS || qS) ? [{ t: '+' }] : [];
          else if (inv === 1) esp = rS ? [{ t: '+6' }, { t: '3' }] : [{ t: '6' }];
          else esp = rS ? [{ t: '6' }, { t: '+4' }] : tS ? [{ t: '+6' }, { t: '4' }] : [{ t: '6' }, { t: '4' }];
        }
        ok(txtFig(c.fig) === txtFig(esp), `${etq}: cifras ${txtFig(c.fig)} ≠ ${txtFig(esp)}`);
        // el tachado solo aparece en acordes disminuidos
        if (c.fig.some((f) => f.tachado)) ok(calEsp === 'd' || calEsp === 'ø7' || calEsp === 'o7' || (calEsp === 'D7' && inv === 1), `${etq}: tachado en un acorde que no es disminuido`);
        // alternativas
        for (let s = 1; s <= 3; s++) {
          const ops = E.alternativas(it, E.mulberry32(s * 7 + g), 6);
          const textos = ops.map((o) => o.t);
          ok(new Set(textos).size === textos.length, `${etq}: alternativas repetidas ${textos}`);
          ok(ops.filter((o) => o.ok).length === 1, `${etq}: debe haber una sola correcta`);
          ok(ops.find((o) => o.ok).t === E.cifTexto(it.cif), `${etq}: la correcta no coincide`);
          ok(ops.length >= 4, `${etq}: pocas alternativas (${ops.length})`);
          ok(ops.every((o) => o.ok || o.t !== E.cifTexto(it.cif)), `${etq}: una distractora igual a la correcta`);
          ok(ops.every((o) => o.cf.num === o.cf.num.toUpperCase()), `${etq}: alternativa con número romano en minúscula`);
        }
      }
    }
  }
}

// ---- 3) casos concretos conocidos (por nombre de nota sin octava) y cifra
function caso(tid, g, sept, inv) { return E.generarUno({ nivel: 5, tonalidad: tid, grado: g, septima: sept, inversion: inv }, E.mulberry32(1)); }
const sinOct = (it) => it.notas.map((n) => E.notaClave(n).split('/')[0]).join(' ');
const conocidos = [
  ['C', 5, true, 0, 'g b d f', 'V 7/+', 'V7 en Do mayor'],
  ['a', 5, false, 0, 'e g# b', 'V +', 'V en La menor lleva sol♯ y se cifra +'],
  ['a', 7, false, 0, 'g# b d', 'VII 5̸', 'VII en La menor: sol♯–si–re, 5 tachado'],
  ['c', 7, true, 0, 'b d f ab', 'VII 7̸/5̸', 'VII7 disminuida en Do menor'],
  ['G', 7, true, 0, 'f# a c e', 'VII 7/5̸', 'VII7 de sensible en Sol mayor'],
  ['fs', 5, false, 1, 'e# g# c#', 'V 6', 'V6 en Fa♯ menor'],
  ['C', 1, false, 0, 'c e g', 'I', 'I en Do mayor no lleva cifra'],
  ['C', 7, false, 1, 'd f b', 'VII +6/3', 'VII6 en Do mayor: +6/3'],
  ['C', 7, false, 2, 'f b d', 'VII 6/+4', 'VII6/4 en Do mayor: 6/+4'],
  ['C', 5, false, 2, 'd g b', 'V +6/4', 'V6/4 en Do mayor: +6/4'],
  ['C', 5, true, 2, 'd f g b', 'V +6', 'V7 en 2.ª inversión: +6'],
  ['C', 5, true, 3, 'f g b d', 'V +4', 'V7 en 3.ª inversión: +4']
];
for (const [tid, g, s, inv, notasEsp, cifEsp, txt] of conocidos) {
  const it = caso(tid, g, s, inv);
  ok(sinOct(it) === notasEsp, `caso «${txt}»: notas ${sinOct(it)} ≠ ${notasEsp}`);
  ok(E.cifTexto(it.cif) === cifEsp, `caso «${txt}»: cifrado «${E.cifTexto(it.cif)}» ≠ «${cifEsp}»`);
}

// ---- 4) lotes por nivel
for (const lv of E.NIVELES) {
  for (let semilla = 1; semilla <= 60; semilla++) {
    const lote = E.generarLote({ nivel: lv.n, n: 6 }, semilla);
    ok(lote.length === 6, `nivel ${lv.n} semilla ${semilla}: ${lote.length} preguntas`);
    const claves = lote.map((x) => `${x.tonalidad}|${x.grado}|${x.septima}|${x.inversion}`);
    ok(new Set(claves).size === claves.length, `nivel ${lv.n}: acordes repetidos`);
    lote.forEach((x, i) => {
      if (i) ok(x.tonalidad !== lote[i - 1].tonalidad, `nivel ${lv.n}: tonalidad repetida seguida`);
      ok(lv.invs.indexOf(x.inversion) >= 0, `nivel ${lv.n}: inversión ${x.inversion} no permitida`);
      if (lv.n <= 2) ok(!x.septima, `nivel ${lv.n}: séptima no permitida`);
      if (lv.n === 3 || lv.n === 4) ok(x.septima, `nivel ${lv.n}: debe ser séptima`);
      ok(x.grado !== 3, `el III grado no se pregunta`);
      if (x.septima) ok(x.grado === 5 || x.grado === 7, `séptimas: solo V7 y VII7`);
    });
  }
}

console.log(`\n${items} acordes comprobados (todas las tonalidades × grados × inversiones) · ${comprobaciones} comprobaciones · ${fallos} fallos`);
process.exit(fallos ? 1 : 0);
