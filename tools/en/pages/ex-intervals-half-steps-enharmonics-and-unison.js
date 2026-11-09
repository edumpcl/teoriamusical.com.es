const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/half-steps-enharmonics-and-unison/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/',
  title: 'Half Steps, Enharmonic Notes and Unison: Online Quiz',
  description: 'Exercises on diatonic and chromatic half steps, enharmonic notes and the unison on the staff. Learn to tell them apart. Free interactive quiz.',
  h1: 'Diatonic Half Step, Chromatic Half Step, Enharmonic Notes and Unison',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<h2 id="diatonic-and-chromatic-half-steps">Diatonic and chromatic half steps</h2>

<p>The half step (UK: semitone) is the smallest distance between two notes in Western music. But not every half step is written the same way, which gives two categories you must tell apart when you analyze a score:</p>

<ul>
<li><strong>Diatonic half step</strong>: two notes with different, consecutive letter names. It can happen between natural notes (E–F, B–C) or with accidentals (C–D♭, F♯–G). On the staff it always moves from a line to the adjacent space, or the other way around.</li>

<li><strong>Chromatic half step</strong>: two notes with the same letter name and different accidentals (C–C♯, G♭–G). On the staff both notes sit on the same line or space. Note that the accidentals must differ by exactly one step: C♭ to C♯, for example, is two half steps.</li>
</ul>

<h2 id="unison-and-enharmonic-notes">Unison and enharmonic notes</h2>

<p>When the distance between two sounds is minimal or zero, two concepts are easily confused:</p>

<ul>
<li><strong>Unison</strong>: two notes with exactly the same name and the same sound (for example, two violins playing the same middle C). The distance is zero half steps.</li>

<li><strong>Enharmonic notes</strong>: notes with different names that stand for the same sound on a piano or on the frets of a guitar. For example, C♯ and D♭, or E♯ and F, sound the same but are written differently for harmonic reasons. On the staff they appear at different heights.</li>
</ul>

<h2 id="reference-table">Reference table: half steps and zero distances</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Concept</th>
      <th>Note names</th>
      <th>Resulting sound</th>
      <th>Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Diatonic half step</td>
      <td>Different and consecutive</td>
      <td>1 half step apart</td>
      <td>E–F, G♯–A</td>
    </tr>
    <tr>
      <td>Chromatic half step</td>
      <td>Same letter name</td>
      <td>1 half step apart</td>
      <td>C–C♯, D–D♭</td>
    </tr>
    <tr>
      <td>Unison</td>
      <td>Same</td>
      <td>Same sound (0 half steps)</td>
      <td>D–D, F–F</td>
    </tr>
    <tr>
      <td>Enharmonic notes</td>
      <td>Different</td>
      <td>Same sound (0 half steps)</td>
      <td>F♯–G♭, B♯–C</td>
    </tr>
  </tbody>
</table>
</div>

<h2 id="visual-tips">Tips for spotting them visually</h2>

<p>When you do the exercises, do not try to hear the difference at first. Rely on how the notes look on the staff:</p>

<ul>
<li>Are the notes in the <strong>same place on the staff</strong>? If they have different accidentals, it is a <strong>chromatic half step</strong>. If they have no accidentals, or the same one, it is a <strong>unison</strong>.</li>

<li>Are the notes in <strong>different, adjacent places</strong> (line to space)? Then it can be a <strong>diatonic half step</strong>, or even <strong>enharmonic notes</strong> if their accidentals cancel the visual distance (such as E♯ and F).</li>
</ul>

<div id="tm_intervalos_semitono"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tm_intervalos_semitono", {test:"semitono"});
  });
</script>

<h2>Build half steps and enharmonic notes</h2>
<p>A note appears on the staff. Following the instruction, write the matching note: the diatonic half step, the chromatic half step, the enharmonic note or the unison.</p>
<div>
<div id="tmconstruir_semitono_b"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmconstruir_semitono_b", {test:"construir_semitono"});
  });
</script>
</div>

<h2>More practice</h2>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a diatonic and a chromatic half step?</div>
      <div class="tm-faq-a">A diatonic half step joins two notes with different letter names and covers two neighboring staff positions (E–F, B–C). A chromatic half step joins two notes with the same letter name and different accidentals, so it stays on the same position (C–C♯, F–F♯). Both are the smallest distance in the Western tonal system.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where do enharmonic notes and unisons appear in practice?</div>
      <div class="tm-faq-a">Enharmonic notes are notes that sound the same (same pitch in equal temperament) but are written differently. For example C♯ and D♭, F♯ and G♭, B and C♭. On fixed-pitch instruments (piano, guitar) they are identical; on instruments with flexible intonation (strings, winds) there can be a slight difference.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a unison in music?</div>
      <div class="tm-faq-a">The unison is the interval of number 1: two notes with the same letter name in the same octave. A perfect unison is two C's or two A's that are exactly the same. An augmented unison would be, for example, C and C♯ (same line or space, different accidentals), a chromatic half step apart.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are half steps written on the staff?</div>
      <div class="tm-faq-a">A diatonic half step appears between neighboring positions of the staff (E and F, B and C). A chromatic half step appears at the same position with a different accidental: for example, A and A♯ on the same line or space, told apart only by the sharp.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are enharmonic notes useful for?</div>
      <div class="tm-faq-a">Enharmonics let you write the same sound with the most readable spelling for the key. For example, in D♭ major you write G♭ even though it sounds like F♯, because G♭ fits that key better. They also make enharmonic modulation possible: changing key by using the identical sound.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
