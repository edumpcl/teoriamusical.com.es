'use strict';
/**
 * Convierte los ejemplos escritos en MEI (tools/notacion/<conjunto>.js) a MusicXML, y los pasa
 * por MuseScore para que queden EXACTAMENTE como si los hubieras exportado tu.
 *
 *   node tools/notacion/mei-a-musicxml.js sincopa
 *       -> tools/notacion/sincopa/<id>.musicxml   (uno por ejemplo, abribles en MuseScore)
 *
 * POR QUE: para reutilizar lo que ya habiamos escrito. Quien escribe la musica ahora es quien la
 * dibuja en MuseScore; los tres ejemplos de la sincopa los habia tecleado yo en MEI, que nadie
 * puede abrir y retocar. Asi pasan a ser ficheros editables, y a partir de aqui la fuente de
 * verdad es la carpeta de MusicXML y no el .js.
 *
 * El paso por MuseScore (`MuseScore4.exe -o salida entrada`) normaliza el fichero: pone sus
 * propios marcadores de plica, posiciones, version... Es lo que recibiria el constructor cuando
 * exportes tu, asi que probar con eso es probar de verdad.
 *
 * ALCANCE: un pentagrama en clave de sol con notas, puntillos, alteraciones, ligaduras y barras de
 * corcheas. Es lo que usan los ejemplos que habia. Para cualquier otra cosa, se escribe en
 * MuseScore directamente y no hace falta este conversor.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { DOMParser } = require('@xmldom/xmldom');

const MUSESCORE = process.env.MUSESCORE || 'C:/Program Files/MuseScore 4/bin/MuseScore4.exe';
const TIPO = { 1: 'whole', 2: 'half', 4: 'quarter', 8: 'eighth', 16: '16th' };
const ALTER = { s: 1, f: -1, n: 0 };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function aMusicXML(mei, titulo) {
  const doc = new DOMParser().parseFromString(mei, 'text/xml');
  const sf = doc.getElementsByTagName('staffDef')[0];
  if ((sf.getAttribute('clef.shape') || 'G') !== 'G') throw new Error('este conversor solo escribe clave de sol');
  const cuenta = sf.getAttribute('meter.count') || '4';
  const unidad = sf.getAttribute('meter.unit') || '4';

  const compases = Array.from(doc.getElementsByTagName('measure')).map((m, i) => {
    const notas = [];
    (function ir(n, beam) {
      for (let c = n.firstChild; c; c = c.nextSibling) {
        if (c.nodeType !== 1) continue;
        if (c.localName === 'beam') { ir(c, []); notas.push(...[]); continue; }
        if (c.localName === 'note') notas.push(c);
        else ir(c, beam);
      }
    })(m.getElementsByTagName('layer')[0]);

    // a que barra pertenece cada nota, y que lugar ocupa dentro de ella
    const grupos = Array.from(m.getElementsByTagName('beam')).map((b) => Array.from(b.getElementsByTagName('note')));
    const posicion = (nota) => {
      for (const g of grupos) {
        const k = g.indexOf(nota);
        if (k > -1) return k === 0 ? 'begin' : (k === g.length - 1 ? 'end' : 'continue');
      }
      return null;
    };

    const xml = notas.map((n) => {
      const dur = Number(n.getAttribute('dur'));
      const puntos = Number(n.getAttribute('dots') || 0);
      if (!TIPO[dur]) throw new Error('duracion no soportada: ' + dur);
      const unidades = (16 * 4 / dur) * (2 - Math.pow(2, -puntos));        // divisions = 16 por negra
      const acc = n.getAttribute('accid');
      const tie = n.getAttribute('tie');
      const pos = posicion(n);
      return '      <note>\n'
        + '        <pitch><step>' + n.getAttribute('pname').toUpperCase() + '</step>'
        + (acc ? '<alter>' + ALTER[acc] + '</alter>' : '') + '<octave>' + n.getAttribute('oct') + '</octave></pitch>\n'
        + '        <duration>' + unidades + '</duration>\n'
        + (['t', 'm'].includes(tie) ? '        <tie type="stop"/>\n' : '')
        + (['i', 'm'].includes(tie) ? '        <tie type="start"/>\n' : '')
        + '        <type>' + TIPO[dur] + '</type>\n'
        + (puntos ? '        <dot/>\n'.repeat(puntos) : '')
        + (acc ? '        <accidental>' + ({ s: 'sharp', f: 'flat', n: 'natural' })[acc] + '</accidental>\n' : '')
        + (pos ? '        <beam number="1">' + pos + '</beam>\n' : '')
        + ((tie) ? '        <notations>'
          + (['t', 'm'].includes(tie) ? '<tied type="stop"/>' : '')
          + (['i', 'm'].includes(tie) ? '<tied type="start"/>' : '') + '</notations>\n' : '')
        + '      </note>';
    }).join('\n');

    const atributos = i === 0
      ? '      <attributes><divisions>16</divisions><key><fifths>0</fifths></key>'
        + '<time><beats>' + cuenta + '</beats><beat-type>' + unidad + '</beat-type></time>'
        + '<clef><sign>G</sign><line>2</line></clef></attributes>\n'
      : '';
    return '    <measure number="' + (m.getAttribute('n') || i + 1) + '">\n' + atributos + xml + '\n    </measure>';
  }).join('\n');

  return '<?xml version="1.0" encoding="UTF-8"?>\n<score-partwise version="4.0">\n'
    + '  <work><work-title>' + esc(titulo) + '</work-title></work>\n'
    + '  <part-list><score-part id="P1"><part-name>Pentagrama</part-name></score-part></part-list>\n'
    + '  <part id="P1">\n' + compases + '\n  </part>\n</score-partwise>\n';
}

module.exports = { aMusicXML };

if (require.main === module) {
  const nombre = process.argv[2];
  if (!nombre) { console.log('uso: node tools/notacion/mei-a-musicxml.js <conjunto>'); process.exit(1); }
  const { EJEMPLOS } = require('./' + nombre + '.mei.js');
  const destino = path.join(__dirname, nombre);
  const tmp = path.join(destino, '_tmp');
  fs.mkdirSync(tmp, { recursive: true });
  for (const e of EJEMPLOS) {
    const entrada = path.join(tmp, e.id + '.musicxml');
    const salida = path.join(destino, e.id + '.musicxml');
    fs.writeFileSync(entrada, aMusicXML(e.mei, e.id));
    const r = spawnSync(MUSESCORE, ['-o', salida, entrada], { timeout: 90000, encoding: 'utf8' });
    if (r.status !== 0 || !fs.existsSync(salida)) {
      console.error(`✗ ${e.id}: MuseScore no ha podido convertirlo (${(r.stderr || r.error || '').toString().slice(0, 120)})`);
      process.exit(1);
    }
    console.log(`✓ ${e.id}.musicxml  (${fs.statSync(salida).size} bytes, pasado por MuseScore)`);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}
