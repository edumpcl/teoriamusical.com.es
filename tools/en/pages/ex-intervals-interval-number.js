const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/interval-number/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/distancia/',
  title: 'Interval Number: Count the Distance on the Staff Quiz',
  description: 'Learn to measure the number of an interval (2nd to 8th) by counting lines and spaces on the staff. Free interactive quiz and build exercise.',
  h1: 'Interval Number: How to Count the Distance',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>Counting the number of an interval is the basic operation of all music theory. The number tells you how many staff positions the interval covers, whatever the accidentals are.</p>

<h2>1. The counting method</h2>
<p>To find the number of an interval, count the positions (lines and spaces) from the lower note to the upper note, <strong>always including both notes</strong>.</p>
<p><strong>Example: from F to B</strong></p>
<ul>
  <li>F (1), G (2), A (3), B (4)</li>
  <li>Result: an interval of a <strong>4th</strong>. Its quality is not decided yet: F–B is an augmented 4th, and F–B♭ is a perfect 4th. The quality comes from counting half steps (UK: semitones).</li>
</ul>

<h2>Interval number quiz</h2>

<div id="tmnum"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmnum", {test:"numero"});
  });
</script>

<h2>2. Build intervals by number</h2>
<p>A note appears on the staff together with a number and a direction. Place the second note by counting diatonic steps.</p>
<div id="tmconstruir_num"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmconstruir_num", {test:"construir_numero"});
  });
</script>

<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/">Harmonic and melodic intervals →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the number of an interval measure?</div>
      <div class="tm-faq-a">The number (or distance) of an interval says how many staff positions there are between two notes, counting both notes. For example, from C to G there are 5 positions (C-D-E-F-G), so it is a 5th. The number ignores accidentals: it only depends on the letter names.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you count the number of an interval?</div>
      <div class="tm-faq-a">Count every note from the lower one to the upper one, including both. The total gives the name: 2 positions = 2nd, 3 = 3rd, 4 = 4th, 5 = 5th, 6 = 6th, 7 = 7th, 8 = octave.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the number and the quality of an interval?</div>
      <div class="tm-faq-a">The number says how many positions separate the notes (2nd, 3rd, 4th…). The quality says the exact size in half steps (major, minor, perfect, augmented, diminished). To describe an interval completely you need both: for example, "major 3rd" or "perfect 5th".</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a unison?</div>
      <div class="tm-faq-a">A unison is the interval of number 1: the same note twice, in the same staff position. A unison can be perfect (exactly the same note) or augmented (one note with an accidental and the other without, both on the same line or space, such as C and C♯).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is an octave interval?</div>
      <div class="tm-faq-a">An octave is the interval of number 8: the same note name one register higher or lower. On the staff, an octave spans 8 positions: one note on a line and the other in a space (or the other way around), such as C4 on the first ledger line below the staff and C5 in the third space. A perfect octave has 12 half steps.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
