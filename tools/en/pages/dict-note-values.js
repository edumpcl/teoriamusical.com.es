const dictionaryPage = require('../dictionary-page');

const IMG = '/assets/img/notacion/figuras/';
const names = [
  ['whole note', 'semibreve', 'figura-redonda', 288, '4 beats', '2 half notes', 'whole rest', 'silencio-redonda', 288, 'Whole rest'],
  ['half note', 'minim', 'figura-blanca', 230, '2 beats', '2 quarter notes', 'half rest', 'silencio-blanca', 245, 'Half rest'],
  ['quarter note', 'crotchet', 'figura-negra', 189, '1 beat', '2 eighth notes', 'quarter rest', 'silencio-negra', 245, 'Quarter rest'],
  ['eighth note', 'quaver', 'figura-corchea', 173, '½ beat', '2 sixteenth notes', 'eighth rest', 'silencio-corchea', 245, 'Eighth rest'],
  ['sixteenth note', 'semiquaver', 'figura-semicorchea', 171, '¼ beat', '2 thirty-second notes', 'sixteenth rest', 'silencio-semicorchea', 245, 'Sixteenth rest'],
  ['thirty-second note', 'demisemiquaver', 'figura-fusa', 171, '⅛ beat', '2 sixty-fourth notes', 'thirty-second rest', 'silencio-fusa', 245, 'Thirty-second rest'],
  ['sixty-fourth note', 'hemidemisemiquaver', 'figura-semifusa', 171, '1/16 beat', '—', 'sixty-fourth rest', 'silencio-semifusa', 245, 'Sixty-fourth rest'],
];
const cap = s => s[0].toUpperCase() + s.slice(1);
const noteRows = names.map(n => `    <tr><td data-label="Note"><strong>${cap(n[0])}</strong></td><td data-label="UK name">${n[1]}</td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}${n[2]}.svg" width="${n[3]}" height="220" alt="${cap(n[0])} on the staff" decoding="async"></td><td data-label="Duration">${n[4]}</td><td data-label="Equals">${n[5]}</td></tr>`).join('\n');
const restRows = names.map(n => `    <tr><td data-label="Rest"><strong>${n[9]}</strong></td><td class="tm-celda-img" data-label="Symbol"><img src="${IMG}${n[7]}.svg" width="${n[8]}" height="220" alt="${n[9]} on the staff" decoding="async"></td><td data-label="Duration">${n[4]}</td></tr>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/note-values/',
  esPath: '/diccionario-musical/figuras-musicales/',
  title: 'Note Values and Rests: Names, Durations and Chart',
  description: 'The 7 note values (whole, half, quarter, eighth, sixteenth…), their duration in beats, equivalences and matching rests, with a chart and symbols.',
  h1: 'Note Values and Rests',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `<p><strong>Note values</strong> are the symbols that show the <strong>duration</strong> of musical sounds. The position of a note on the <a href="/diccionario-musical/pentagramas/">staff</a> shows its pitch (how high or low it is), and the note value shows how long it lasts. There are <strong>seven note values</strong>, and each one is worth exactly half of the one before it.</p>

<h2>What is a note value?</h2>

<p>A note value is the shape of the note: whether its head is hollow or filled, whether it has a stem (the vertical line) and whether it has flags or beams. These three features show its duration. Every note value also has a matching <strong>rest</strong> of the same length. The <a href="/diccionario-musical/nombres-de-las-notas-musicales/">pitch of the note</a> and its note value together define each written note completely.</p>

<h2>The 7 note values and their durations</h2>

<p>The length of a note value is <strong>relative</strong>: each one is worth twice the next one, whatever the time signature. To give concrete numbers, we use a <strong>4/4</strong> <a href="/diccionario-musical/compases/">measure</a> (UK: bar) as the example. In 4/4 the <strong>quarter note</strong> (UK: crotchet) is the beat (1 beat). Here are the seven note values from longest to shortest. The American names are used on this page; the UK names are in the second column.</p>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
  <thead>
    <tr><th>Note</th><th>UK name</th><th>Symbol</th><th>Duration</th><th>Equals</th></tr>
  </thead>
  <tbody>
${noteRows}
  </tbody>
</table>
</div>

<p>These numbers apply to time signatures where the quarter note gets the beat (4/4, 3/4, 2/4…). If the beat unit is different, the value of one beat changes. In <a href="/diccionario-musical/compases/compas-partido/">cut time</a> (<strong>2/2</strong>, also called alla breve), where the half note gets the beat, the half note is worth 1 beat and the whole note 2. What <strong>never changes</strong> is the proportion between note values: a whole note is always equal to two half notes.</p>

<h2>Equivalences between note values</h2>

<p>Because each note value is worth twice the next one, they are all related by simple proportions. Starting from the whole note:</p>

<p style="text-align:center;font-size:1.1rem"><strong>1 whole note = 2 half notes = 4 quarter notes = 8 eighth notes = 16 sixteenth notes = 32 thirty-second notes = 64 sixty-fourth notes</strong></p>

<p>That is why a 4/4 measure (four quarter-note beats) can hold one whole note, or two half notes, or four quarter notes, or any combination that adds up to four beats.</p>

<h2>Rests</h2>

<p>A <strong>rest</strong> is a silence of a set length. Every note value has a rest that lasts exactly the same time:</p>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
  <thead>
    <tr><th>Rest</th><th>Symbol</th><th>Duration</th></tr>
  </thead>
  <tbody>
${restRows}
  </tbody>
</table>
</div>

<h2>The dot</h2>

<p>A <strong>dot</strong> is a point placed to the right of a note and it <strong>lengthens the note by half of its value</strong>. Any note value, and any rest, can have a dot: a dotted quarter note, for example, lasts 1.5 beats. <a href="/diccionario-musical/puntillo/">More about the dot and the double dot →</a></p>

<figure class="tm-staff"><img src="${IMG}figura-negra-puntillo.svg" width="212" height="220" alt="Dotted quarter note on the staff" decoding="async"><figcaption>Dotted quarter note = 1.5 beats (quarter note + eighth note).</figcaption></figure>

<h2>The tie</h2>

<p>A <strong>tie</strong> joins two notes of the <strong>same pitch</strong> and adds their durations into one sustained sound (it is used, for example, to hold a note across the bar line). It should not be confused with a <strong>slur</strong> (<em>legato</em> mark), which joins notes of different pitches. <a href="/diccionario-musical/ligaduras/">More about ties and slurs →</a></p>

<h2>Tuplets</h2>

<p>Sometimes a beat is divided into a number of notes that does not fit the usual division: three eighth notes in the space of two (the <strong>triplet</strong>), two in the space of three (the <strong>duplet</strong>), and the same idea with the quadruplet, quintuplet and sextuplet. These are <strong>tuplets</strong> (irregular groups), which briefly change the normal division of a note value. <a href="/diccionario-musical/grupos-de-valoracion-especial/">More about tuplets →</a></p>

<h2>Note value exercises</h2>

<p>To practice what is explained here, try the <a href="/ejercicios/figuras/">note value and rhythm exercises</a> with instant feedback and PDF worksheets: <a href="/ejercicios/figuras/identificar-figuras-y-silencios/">identify notes and rests</a>, <a href="/ejercicios/figuras/equivalencias-de-figuras/">equivalences between note values</a>, the <a href="/ejercicios/figuras/valor-de-las-figuras/">value of notes in each time signature</a> and <a href="/ejercicios/figuras/sumar-figuras-en-un-compas/">adding up the notes in a measure</a>. To recognize them by ear, try <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation</a>, organized by note value: from the quarter note and its rest to the whole note and groups of two eighth notes.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What are note values?</div>
<div class="tm-faq-a">Note values are the symbols that show how long a sound lasts. Each one tells you how long a note is held. Combined with pitch (its position on the staff), they define each written note completely.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What are the 7 note values?</div>
<div class="tm-faq-a">From longest to shortest: whole note, half note, quarter note, eighth note, sixteenth note, thirty-second note and sixty-fourth note. Each lasts half as long as the one before: a half note is worth half a whole note, a quarter note half a half note, and so on.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How long does each note value last?</div>
<div class="tm-faq-a">In a time signature where the quarter note gets the beat (such as 4/4), a whole note lasts 4 beats, a half note 2, a quarter note 1, an eighth note half a beat, a sixteenth note a quarter, a thirty-second note an eighth and a sixty-fourth note a sixteenth. In other time signatures the beat unit changes (in 2/2 the half note gets the beat), but the proportion between note values stays the same. A whole note equals 2 half notes, 4 quarter notes, 8 eighth notes, 16 sixteenth notes, 32 thirty-second notes or 64 sixty-fourth notes.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is a rest in music?</div>
<div class="tm-faq-a">A rest is a silence of a set length. Every note value has a rest that lasts the same time: whole rest, half rest, quarter rest, eighth rest, sixteenth rest, thirty-second rest and sixty-fourth rest.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What does a dot do to a note?</div>
<div class="tm-faq-a">A dot placed to the right of a note lengthens it by half of its value. A dotted quarter note lasts a quarter note and a half (1.5 beats), the same as a quarter note plus an eighth note.</div>
</div>
</div>
</div>
</div>
</section>`,
});
