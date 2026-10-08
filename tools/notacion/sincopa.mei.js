'use strict';
/**
 * Los tres ejemplos de /diccionario-musical/compases/sincopa/ escritos como MEI.
 *
 * ESTO ES UN PILOTO (08-10-2026). Hasta ahora estos ejemplos los dibujaba VexFlow desde el
 * navegador con codigo imperativo, y en uno de ellos se olvido dibujar la barra: las dos
 * corcheas salieron como cabezas sueltas, sin plica. Aqui la musica se DESCRIBE y Verovio
 * decide plicas, barras y ligaduras: ese tipo de olvido ya no existe.
 *
 * Que se escribe aqui y que no:
 *   - SI: notas, duraciones, ligaduras (tie="i"/"t"), que notas van agrupadas (<beam>).
 *   - NO: direccion de plicas, posicion de las barras, espaciado. Eso es del motor.
 *
 * Cada ejemplo lleva su descripcion en prosa (`alt`) y lo que SE ESPERA de el (`espera`), que
 * es lo que luego comprueba tools/verificar-mei.js contra el MEI: la comprobacion no sale del
 * mismo sitio que el dibujo, sale de lo que la pagina afirma.
 */

const CAB = (titulo, compases) => `<?xml version="1.0" encoding="UTF-8"?>
<mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0">
  <meiHead><fileDesc><titleStmt><title>${titulo}</title></titleStmt><pubStmt/></fileDesc></meiHead>
  <music><body><mdiv><score>
    <scoreDef>
      <staffGrp>
        <staffDef n="1" lines="5" clef.shape="G" clef.line="2" meter.count="4" meter.unit="4"/>
      </staffGrp>
    </scoreDef>
    <section>
${compases}
    </section>
  </score></mdiv></body></music>
</mei>`;

const compas = (n, notas) => `      <measure n="${n}"><staff n="1"><layer n="1">
${notas}
      </layer></staff></measure>`;

const nota = (id, pname, oct, dur, extra) =>
  `        <note xml:id="${id}" pname="${pname}" oct="${oct}" dur="${dur}"${extra ? ' ' + extra : ''}/>`;

const EJEMPLOS = [
  {
    // Do en el tiempo 1 · Re en el tiempo 2 ligado al 3 · Mi en el tiempo 4.
    id: 'ex-sincopa-tiempo',
    alt: 'Pentagrama en 4/4: Do negra, Re negra ligada a otro Re negra, y Mi negra. La ligadura une el tiempo 2 con el 3.',
    mei: CAB('Síncopa de tiempo', compas(1, [
      nota('t1', 'c', 5, 4),
      nota('t2', 'd', 5, 4, 'tie="i"'),
      nota('t3', 'd', 5, 4, 'tie="t"'),
      nota('t4', 'e', 5, 4),
    ].join('\n'))),
    espera: { compases: 1, ligaduras: [['t2', 't3']], barras: 0 },
  },
  {
    // Do negra · Re corchea + Mi corchea (el "y" del 2) ligada a Mi negra del tiempo 3 · Fa negra.
    // Es el ejemplo que salio mal: las dos corcheas sin plica ni barra.
    id: 'ex-sincopa-parte',
    alt: 'Pentagrama en 4/4: Do negra; dos corcheas unidas por una barra, Re y Mi; el Mi está ligado a un Mi negra; y Fa negra. La nota del "y" del tiempo 2 se liga al tiempo 3.',
    mei: CAB('Síncopa de parte', compas(1, [
      nota('p1', 'c', 5, 4),
      '        <beam>',
      nota('p2', 'd', 5, 8).replace('        ', '          '),
      nota('p3', 'e', 5, 8, 'tie="i"').replace('        ', '          '),
      '        </beam>',
      nota('p4', 'e', 5, 4, 'tie="t"'),
      nota('p5', 'f', 5, 4),
    ].join('\n'))),
    espera: { compases: 1, ligaduras: [['p3', 'p4']], barras: 1 },
  },
  {
    // Dos compases: el Fa del tiempo 4 se liga al Fa blanca del compas siguiente.
    id: 'ex-sincopa-compas',
    alt: 'Dos compases en 4/4. Primero: Do, Re, Mi y Fa negras; el Fa del tiempo 4 se liga, a través de la barra de compás, a un Fa blanca. Segundo compás: Fa blanca, Mi negra y Re negra.',
    mei: CAB('Síncopa de compás', [
      compas(1, [
        nota('c1', 'c', 5, 4),
        nota('c2', 'd', 5, 4),
        nota('c3', 'e', 5, 4),
        nota('c4', 'f', 5, 4, 'tie="i"'),
      ].join('\n')),
      compas(2, [
        nota('c5', 'f', 5, 2, 'tie="t"'),
        nota('c6', 'e', 5, 4),
        nota('c7', 'd', 5, 4),
      ].join('\n')),
    ].join('\n')),
    espera: { compases: 2, ligaduras: [['c4', 'c5']], barras: 0 },
  },
];

module.exports = { EJEMPLOS };
