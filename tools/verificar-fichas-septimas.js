'use strict';
/**
 * Audita la teoría de las fichas de acordes de séptima, sin reutilizar la
 * lógica del generador: re-deduce a mano, a partir de las notas (letra +
 * alteración) de cada ejercicio, los intervalos reales desde el bajo y
 * comprueba que coinciden con el tipo y la inversión que dice el ejercicio.
 *
 *   node tools/verificar-fichas-septimas.js
 */
const gen = require('./generate-fichas-septimas.js');

const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const ALTER = { '': 0, '#': 1, 'b': -1, '##': 2, 'bb': -2 };

/* Estructura esperada (semitonos desde la fundamental) por tipo. */
const ESTRUCTURA = {
  dominante: { third: 4, fifth: 7, seventh: 10 },
  sensible: { third: 3, fifth: 6, seventh: 10 },
  disminuida: { third: 3, fifth: 6, seventh: 9 },
};

function semi(key) {
  const [letra, oct] = key.split('/');
  const l = letra[0];
  const acc = letra.slice(1);
  return (parseInt(oct, 10)) * 12 + SEMI[l] + (ALTER[acc] || 0);
}

let errores = 0, comprobados = 0;

function revisar(nombre, ejercicios, tiposEsperados, invsEsperadas) {
  ejercicios.forEach((e, i) => {
    comprobados++;
    const etiqueta = `${nombre} #${i + 1}`;

    /* El tipo debe estar entre los permitidos para esta familia. */
    if (!tiposEsperados.includes(e.tipo.id)) {
      console.log(`  ✗ ${etiqueta}: tipo ${e.tipo.id} no está entre los permitidos (${tiposEsperados.join(',')})`); errores++;
    }
    if (!invsEsperadas.includes(e.inv)) {
      console.log(`  ✗ ${etiqueta}: inversión ${e.inv} no está entre las permitidas (${invsEsperadas.join(',')})`); errores++;
    }

    /* Reconstruir la fundamental real del acorde a partir de miembros[0]
       (el generador ya la guarda tal cual) y comparar los intervalos desde
       AHÍ contra la estructura esperada del tipo — no contra el bajo, que
       cambia según la inversión. */
    const fundKey = LETRAS[e.miembros[0].l] + (e.miembros[0].a === -1 ? 'b' : e.miembros[0].a === 1 ? '#' : e.miembros[0].a === -2 ? 'bb' : e.miembros[0].a === 2 ? '##' : '') + '/4';
    const fundSemi = semi(fundKey) % 12;
    const est = ESTRUCTURA[e.tipo.id];
    [['third', e.miembros[1]], ['fifth', e.miembros[2]], ['seventh', e.miembros[3]]].forEach(([campo, m]) => {
      const key = LETRAS[m.l] + (m.a === -1 ? 'b' : m.a === 1 ? '#' : m.a === -2 ? 'bb' : m.a === 2 ? '##' : '') + '/4';
      const dist = ((semi(key) % 12) - fundSemi + 12) % 12;
      if (dist !== est[campo]) {
        console.log(`  ✗ ${etiqueta}: ${campo} debería estar a ${est[campo]} semitonos de la fundamental y está a ${dist} (tipo ${e.tipo.id})`);
        errores++;
      }
    });

    /* El voicing (notas dibujadas) debe subir de altura sin saltos raros: cada
       nota estrictamente más aguda que la anterior. */
    for (let k = 1; k < e.notas.length; k++) {
      if (semi(e.notas[k].key) <= semi(e.notas[k - 1].key)) {
        console.log(`  ✗ ${etiqueta}: la nota ${k + 1} (${e.notas[k].key}) no es más aguda que la anterior (${e.notas[k - 1].key})`);
        errores++;
      }
    }

    /* El orden de las notas dibujadas debe empezar por el miembro que toca
       según la inversión: 0=fundamental,1=3ª,2=5ª,3=7ª. */
    const miembroBajo = e.miembros[e.inv];
    const bajoKeyEsperado = LETRAS[miembroBajo.l];
    if (e.notas[0].key[0] !== bajoKeyEsperado) {
      console.log(`  ✗ ${etiqueta}: la nota más grave dibujada (${e.notas[0].key}) no es la letra del miembro en el bajo para inv=${e.inv} (${bajoKeyEsperado})`);
      errores++;
    }
  });
}

console.log('Séptima de dominante/sensible/disminuida — comprobación de intervalos y voicing\n');

gen.TIPO_FAMILIAS.forEach(fam => {
  const tiposIds = fam.tipoId ? [fam.tipoId] : gen.TIPOS.map(t => t.id);
  const ejercicios = gen.generarEjercicios(gen.TOTAL, gen.semilla(fam.archivo, 'escribir'), tiposIds, [0, 1, 2, 3]);
  revisar('escribir-' + fam.archivo, ejercicios, tiposIds, [0, 1, 2, 3]);
});

gen.POSICIONES.forEach(pos => {
  const invs = pos.inv === null ? [0, 1, 2, 3] : [pos.inv];
  const ejercicios = gen.generarEjercicios(gen.TOTAL, gen.semilla(pos.archivo, 'analizar'), gen.TIPOS.map(t => t.id), invs);
  revisar('analizar-' + pos.archivo, ejercicios, gen.TIPOS.map(t => t.id), invs);
});

console.log(`\n${errores ? errores + ' error(es)' : 'Sin errores'} de ${comprobados} ejercicios comprobados en ${gen.TIPO_FAMILIAS.length + gen.POSICIONES.length} fichas.`);
process.exit(errores ? 1 : 0);
