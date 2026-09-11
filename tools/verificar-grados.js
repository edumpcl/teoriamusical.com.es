'use strict';
/**
 * Audita las escalas del ejercicio de grados.
 *
 *   node tools/verificar-grados.js
 *
 * NO reutiliza la logica de assets/js/grados-engine.js: vuelve a comprobar cada
 * escala contra el patron de tonos y semitonos escrito aparte, y contra una
 * lista de tonalidades tecleada a mano. Si las dos coinciden, lo que enseña el
 * ejercicio es correcto.
 *
 * Lo que se comprueba de cada escala:
 *   - usa las siete letras una sola vez y en orden desde la tonica
 *   - el patron de semitonos es el del modo (mayor, menor natural, armonica)
 *   - el VII se llama Sensible si esta a un semitono y Subtonica si esta a un tono
 *   - la tonica coincide con la tonalidad que dice la armadura
 */
const path = require('path');

/* Contexto minimo: el motor solo toca window/document al cargarse. */
global.window = {};
global.document = { getElementById: () => null, createElement: () => ({}), head: { appendChild: () => {} } };
require(path.join(__dirname, '../assets/js/grados-engine.js'));
const D = global.window.tmGradosData;

const LETRAS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const SEMIS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const alturaDe = n => SEMIS[n.letra] + (n.acc === '#' ? 1 : n.acc === '##' ? 2 : n.acc === 'b' ? -1 : 0);

/* Patrones escritos aparte, en semitonos desde la tonica. */
const PATRON = {
  mayor:    [0, 2, 4, 5, 7, 9, 11],
  natural:  [0, 2, 3, 5, 7, 8, 10],
  armonica: [0, 2, 3, 5, 7, 8, 11],
};

/* Tonalidades tecleadas a mano, para no fiarse de como las genera el motor. */
const ESPERADAS = {
  '0#':  { mayor: 'Do Mayor',  menor: 'la menor'  },
  '1#':  { mayor: 'Sol Mayor', menor: 'mi menor'  },
  '2#':  { mayor: 'Re Mayor',  menor: 'si menor'  },
  '3#':  { mayor: 'La Mayor',  menor: 'fa♯ menor' },
  '4#':  { mayor: 'Mi Mayor',  menor: 'do♯ menor' },
  '5#':  { mayor: 'Si Mayor',  menor: 'sol♯ menor'},
  '1b':  { mayor: 'Fa Mayor',  menor: 're menor'  },
  '2b':  { mayor: 'Si♭ Mayor', menor: 'sol menor' },
  '3b':  { mayor: 'Mi♭ Mayor', menor: 'do menor'  },
  '4b':  { mayor: 'La♭ Mayor', menor: 'fa menor'  },
  '5b':  { mayor: 'Re♭ Mayor', menor: 'si♭ menor' },
};

let fallos = 0;
const mal = (donde, msg) => { console.log(`  ✗ ${donde}: ${msg}`); fallos++; };

let revisadas = 0;
D.TONALIDADES.forEach(ton => {
  ['mayor', 'natural', 'armonica'].forEach(modo => {
    const esc = D.escala(ton, modo);
    const clave = ton.alt + (ton.alt === 0 ? '#' : ton.tipo);
    const etiqueta = `${ton.alt}${ton.tipo} ${modo}`;
    if (!esc) { mal(etiqueta, 'el motor no genera esta escala'); return; }
    revisadas++;

    // 1. las siete letras, una vez cada una, en orden desde la tonica
    const letras = esc.notas.map(n => n.letra);
    if (new Set(letras).size !== 7) mal(etiqueta, 'repite o se salta letras: ' + letras.join(' '));
    const i0 = LETRAS.indexOf(letras[0]);
    letras.forEach((l, g) => {
      if (l !== LETRAS[(i0 + g) % 7]) mal(etiqueta, `el grado ${g + 1} deberia ser ${LETRAS[(i0 + g) % 7]} y es ${l}`);
    });

    // 2. patron de semitonos
    const base = alturaDe(esc.notas[0]);
    esc.notas.forEach((n, g) => {
      const dist = ((alturaDe(n) - base) % 12 + 12) % 12;
      if (dist !== PATRON[modo][g]) {
        mal(etiqueta, `grado ${g + 1} (${n.letra}${n.acc}) a ${dist} semitonos, deberian ser ${PATRON[modo][g]}`);
      }
    });

    // 3. sensible / subtonica
    const distVII = (base + 12 - alturaDe(esc.notas[6])) % 12;
    const toca = distVII === 1 ? 'Sensible' : distVII === 2 ? 'Subtónica' : null;
    if (!toca) mal(etiqueta, `el VII esta a ${distVII} semitonos de la tonica`);
    else if (D.nombreGrado(esc, 6) !== toca) mal(etiqueta, `el VII se llama ${D.nombreGrado(esc, 6)} y deberia ser ${toca}`);

    // 4. el nombre de la tonalidad coincide con la lista escrita a mano
    const nom = D.nombreTonalidad(esc);
    const esperado = modo === 'mayor' ? ESPERADAS[clave].mayor
      : ESPERADAS[clave].menor + (modo === 'armonica' ? ' armónica' : ' natural');
    if (nom !== esperado) mal(etiqueta, `se llama "${nom}" y deberia ser "${esperado}"`);
  });
});

// 5. los nombres de los grados, en el orden de la pagina de teoria
const NOMBRES_OK = ['Tónica', 'Supertónica', 'Mediante', 'Subdominante', 'Dominante', 'Superdominante', 'Sensible'];
NOMBRES_OK.forEach((n, i) => {
  if (D.NOMBRES[i] !== n) mal('nombres', `el grado ${i + 1} se llama "${D.NOMBRES[i]}" y deberia ser "${n}"`);
});

console.log(`\n  ${revisadas} escalas revisadas, ${fallos} problema(s).`);
process.exit(fallos ? 1 : 0);
