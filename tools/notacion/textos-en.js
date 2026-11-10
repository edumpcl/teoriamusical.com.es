'use strict';
/**
 * Textos ingleses de las imagenes de notacion con rotulos (edicion inglesa, `--lang=en`).
 * Los generadores dibujan y VERIFICAN la imagen espanola de siempre (contra el alt de la pagina espanola) y, solo al
 * escribir en assets/img/en/..., pasan el SVG por traducir(): se cambian los <text> de rotulo y el <title>.
 * Si una imagen lleva un rotulo sin traduccion, falla (no se escribe nada con espanol dentro).
 */
const NOTA = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
const nota = (t) => { const m = /^(Do|Re|Mi|Fa|Sol|La|Si)(.*)$/.exec(t); return m ? NOTA[m[1]] + m[2] : null; };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const ROTULOS = {
  Fuerte: 'Strong', 'Débil': 'Weak', Semifuerte: 'Medium',
  'Sol en 2ª': 'G on line 2', 'Do en 1ª': 'C on line 1', 'Do en 2ª': 'C on line 2', 'Do en 3ª': 'C on line 3', 'Do en 4ª': 'C on line 4', 'Fa en 3ª': 'F on line 3', 'Fa en 4ª': 'F on line 4',
  'Sin anacrusa · comienzo tético': 'No pickup · starts on the downbeat', 'Con anacrusa': 'With pickup',
  'Cumpleaños feliz': 'Happy Birthday', 'Para Elisa (Beethoven)': 'Für Elise (Beethoven)',
  'de negra': 'quarter notes', 'de corchea': 'eighth notes', 'de semicorchea': 'sixteenth notes',
  'Tético · empieza en el tiempo fuerte': 'Thetic · starts on the strong beat',
  'Anacrúsico · antes del tiempo fuerte': 'Anacrusic · before the strong beat',
  'Acéfalo · tras un silencio en el tiempo fuerte': 'Acephalous · after a rest on the strong beat',
  'tres corcheas': 'three eighth notes', dosillo: 'duplet', 'dos corcheas': 'two eighth notes', tresillo: 'triplet',
  '3/4 · tres tiempos, cada uno en dos': '3/4 · three beats, each divided in two',
  '6/8 · dos tiempos, cada uno en tres': '6/8 · two beats, each divided in three',
  '−8ª': '−1 octave',
};

const CLAVE_EN = { 'clave-de-sol': 'G clef (treble clef)', 'clave-de-do-en-1': 'C clef on line 1 (soprano clef)', 'clave-de-do-en-2': 'C clef on line 2 (mezzo-soprano clef)', 'clave-de-do-en-3': 'C clef on line 3 (alto clef)', 'clave-de-do-en-4': 'C clef on line 4 (tenor clef)', 'clave-de-fa-en-3': 'F clef on line 3 (baritone clef)', 'clave-de-fa-en-4': 'F clef on line 4 (bass clef)' };
const CLAVE_NOTAS = { 'notas-clave-sol': 'the G clef (treble clef)', 'notas-clave-fa': 'the F clef on line 4 (bass clef)', 'notas-clave-do': 'the C clef on line 3 (alto clef)', 'notas-clave-do-1': 'the C clef on line 1 (soprano clef)', 'notas-clave-do-2': 'the C clef on line 2 (mezzo-soprano clef)', 'notas-clave-do-4': 'the C clef on line 4 (tenor clef)' };

/** <title> en ingles por imagen. `titEs` es el <title> espanol (de el se sacan las listas de notas). */
function titulo(slug, titEs) {
  let m;
  if (/^nombres-clave-/.test(slug)) {
    const k = slug.replace(/^nombres-/, '');
    if (!CLAVE_EN[k]) throw new Error('sin titulo ingles: ' + slug);
    return `Note names in the ${CLAVE_EN[k]}: C, D, E, F, G, A, B, C`;
  }
  if (CLAVE_NOTAS[slug]) {
    m = /: ([^:]*)$/.exec(titEs);
    return `Notes in ${CLAVE_NOTAS[slug]} on the staff: ` + m[1].split(', ').map(nota).join(', ');
  }
  const T = {
    'equivalencia-claves-do-central': 'The same middle C written in the seven clefs: G clef on line 2, C clef on lines 1, 2, 3 and 4, and F clef on lines 3 and 4',
    'equivalencia-claves-do-central-movil': 'The same middle C written in the seven clefs: G clef on line 2, C clef on lines 1, 2, 3 and 4, and F clef on lines 3 and 4',
    'lineas-adicionales-clave-sol': 'Ledger lines in the treble clef: A₃, B₃ and C₄ below the staff; G₅, A₅, B₅ and C₆ above',
    'lineas-adicionales-clave-fa': 'Ledger lines in the bass clef: C₂, D₂, E₂ and F₂ below the staff; B₃, C₄, D₄ and E₄ above',
    'lineas-adicionales-clave-do': 'Ledger lines in the alto clef (C clef on line 3): D₃ and E₃ below the staff; F₃ on the first line; G₄ on the fifth line; A₄, B₄ and C₅ above',
    'acentuacion-12-8': 'Accents in 12/8: strong, weak, medium and weak',
    'acentuacion-2-4': 'Accents in 2/4: beat 1 is strong and beat 2 is weak',
    'acentuacion-3-4': 'Accents in 3/4: beat 1 is strong and beats 2 and 3 are weak',
    'acentuacion-4-4': 'Accents in 4/4: strong, weak, medium and weak',
    'acentuacion-6-8': 'Accents in 6/8: beat 1 is strong and beat 2 is weak',
    'acentuacion-9-8': 'Accents in 9/8: beat 1 is strong and beats 2 and 3 are weak',
    'anacrusa-comparacion': 'Comparison of a melody without a pickup (it starts on the strong beat) and with a pickup (one lead-in note before the first strong beat)',
    'anacrusa-famosas': 'The pickup at the start of two famous melodies: Happy Birthday and Beethoven’s Für Elise, with the notes that come before the first strong beat',
    'tipos-de-dosillo': 'Three kinds of duplet: quarter-note (two quarter notes), eighth-note (two eighth notes) and sixteenth-note (two sixteenth notes), each with its number 2',
    'tipos-de-tresillo': 'Three kinds of triplet: quarter-note (three quarter notes), eighth-note (three eighth notes) and sixteenth-note (three sixteenth notes), each with its number 3',
    'comienzo-comparativa': 'The three kinds of phrase beginning compared: thetic (on the strong beat), anacrusic (with a pickup before the strong beat) and acephalous (after a rest on the strong beat)',
    'dosillo-comparacion': 'In 6/8, one beat with three regular eighth notes next to another beat with a duplet of two eighth notes, marked with the number 2',
    'tresillo-comparacion': 'In 2/4, one beat with two regular eighth notes next to another beat with a triplet of three eighth notes, marked with the number 3',
    'seis-corcheas-34-vs-68': 'The same six eighth notes grouped as 3/4 (three beats, 2+2+2) and as 6/8 (two beats, 3+3)',
    'reduccion-de-12a-justa': 'Reduction of a perfect 12th to a perfect 5th',
  };
  if (!T[slug]) throw new Error('sin titulo ingles: ' + slug);
  return T[slug];
}

/** Slugs que tienen texto traducible (los demas no se escriben en la carpeta inglesa). */
const SLUGS = new Set(['nombres-clave-de-sol', 'nombres-clave-de-do-en-1', 'nombres-clave-de-do-en-2', 'nombres-clave-de-do-en-3', 'nombres-clave-de-do-en-4', 'nombres-clave-de-fa-en-3', 'nombres-clave-de-fa-en-4',
  'notas-clave-sol', 'notas-clave-fa', 'notas-clave-do', 'notas-clave-do-1', 'notas-clave-do-2', 'notas-clave-do-4',
  'equivalencia-claves-do-central', 'equivalencia-claves-do-central-movil',
  'lineas-adicionales-clave-sol', 'lineas-adicionales-clave-fa', 'lineas-adicionales-clave-do',
  'acentuacion-12-8', 'acentuacion-2-4', 'acentuacion-3-4', 'acentuacion-4-4', 'acentuacion-6-8', 'acentuacion-9-8',
  'anacrusa-comparacion', 'anacrusa-famosas', 'tipos-de-dosillo', 'tipos-de-tresillo', 'comienzo-comparativa',
  'dosillo-comparacion', 'tresillo-comparacion', 'seis-corcheas-34-vs-68', 'reduccion-de-12a-justa']);

function traducir(slug, svg) {
  const tit = (/<title>([^<]*)<\/title>/.exec(svg) || [])[1] || '';
  const tEs = tit.replace(/&amp;/g, '&');
  let s = svg.replace(/(<text[^>]*>)([^<]*)(<\/text>)/g, (x, a, t, c) => {
    const d = t.replace(/&amp;/g, '&');
    const r = ROTULOS[d] || nota(d) || (/^[\d\s.·/+−-]+$/.test(d) ? d : null);
    if (!r) throw new Error(`${slug}: rotulo sin traduccion «${d}»`);
    return a + esc(r) + c;
  });
  s = s.replace(/<title>[^<]*<\/title>/, () => '<title>' + esc(titulo(slug, tEs)) + '</title>');
  return s;
}

module.exports = { traducir, SLUGS, nota, titulo, ROTULOS };
