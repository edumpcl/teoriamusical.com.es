const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/second-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/segundas/',
  title: "Second Intervals: Major, Minor and Augmented Quiz",
  description: "Practice major, minor and augmented seconds on the staff: identify them by half steps, then build them. Free interactive quiz with real notation.",
  h1: "Intervals of a Second",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>second</strong> is the smallest distance between two different scale degrees. Melodies and scales are built from seconds, so recognizing them instantly is the first skill to train in interval reading.</p>

<h2>1. Visual shortcut: spotting a second on the staff</h2>
<p><strong>The adjacency rule:</strong> the two notes of a second always sit on neighboring positions of the staff, so one note is on a line and the other is in the space right above or below it.</p>
<ul>
  <li>Example in treble clef: E4 (first line) and F4 (first space).</li>
  <li>The two noteheads touch each other, or one is shifted slightly sideways so they do not overlap. There is never a gap between them.</li>
</ul>

<h2>2. Reference table</h2>
<p>Here are the exact half-step counts (UK: semitones) and the harmonic classification of every second:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Interval quality</th>
      <th>Half steps</th>
      <th>Harmonic classification</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Diminished 2nd (d2)</td>
      <td>0</td>
      <td>Conditional dissonance (enharmonic to a perfect unison)</td>
    </tr>
    <tr>
      <td>Minor 2nd (m2)</td>
      <td>1</td>
      <td>Absolute dissonance</td>
    </tr>
    <tr>
      <td>Major 2nd (M2)</td>
      <td>2</td>
      <td>Absolute dissonance</td>
    </tr>
    <tr>
      <td>Augmented 2nd (A2)</td>
      <td>3</td>
      <td>Conditional dissonance (enharmonic to a minor 3rd)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify seconds</h2>
<p>These exercises train you to identify major and minor seconds. Accidentals (♯ and ♭) matter: always use them to count the half steps correctly.</p>
<div id="tmg2"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg2", {test:"grupo",val:"2"});
  });
</script>

<h2>4. Build seconds</h2>
<p>A root note appears on the staff. Choose the type of second and click the position of the second note.</p>
<div id="tmcs2"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs2", {test:"construir", val:"2"});
  });
</script>

<!-- ficha-intervalos -->
<h2>5. Printable second worksheets (PDF)</h2>
<p>The same two skills, on paper: one sheet to <strong>identify</strong> written seconds and another to <strong>write</strong> them. Each has <strong>42 melodic second intervals</strong> in treble clef spread over seven staves, starting with natural, ascending notes —the major and minor seconds that come out of the natural scale— and ending with sharps and flats and mixed directions. No exercise repeats the same two notes.</p>

<h3>Identify seconds</h3>
<p>Under each interval there is a line to write <strong>what kind of second it is and whether it ascends or descends</strong> (M2 ↑, m2 ↓…).</p>
<figure class="tm-staff">
  <a href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-segunda.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/intervalos/fichas/preview-ficha-analizar-intervalos-de-segunda.webp"><img src="/assets/img/intervalos/fichas/preview-ficha-analizar-intervalos-de-segunda.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet with 42 melodic second intervals in treble clef to identify"></picture></a>
  <figcaption>A4 sheet with 42 melodic seconds to identify.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-segunda.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-segunda-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<h3>Write seconds</h3>
<p>The reverse exercise: the first note and the interval to form are given, and the student places the second note on the staff, with its accidental if it needs one.</p>
<figure class="tm-staff">
  <a href="/assets/img/intervalos/fichas/ficha-escribir-intervalos-de-segunda.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/intervalos/fichas/preview-ficha-escribir-intervalos-de-segunda.webp"><img src="/assets/img/intervalos/fichas/preview-ficha-escribir-intervalos-de-segunda.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to write 42 melodic second intervals in treble clef"></picture></a>
  <figcaption>A4 sheet with 42 melodic seconds to write.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/intervalos/fichas/ficha-escribir-intervalos-de-segunda.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/intervalos/fichas/ficha-escribir-intervalos-de-segunda-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<p>You may print and photocopy them freely for the classroom. Each answer sheet is the same worksheet with the answers in red, so you correct by laying one over the other. The rest —including the sheets that mix several intervals— is in <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheets in PDF</a>, and if you want new sheets every time or to practice on screen choosing the intervals, in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>
<!-- /ficha-intervalos -->

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/terceras/">Thirds →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of seconds are there?</div>
      <div class="tm-faq-a">There are two main types: the major 2nd (2 half steps, such as C–D, D–E, F–G, G–A and A–B) and the minor 2nd (1 half step, such as E–F and B–C). The augmented 2nd (3 half steps) also exists. It is typical of the harmonic minor scale and some other modes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a second on the staff?</div>
      <div class="tm-faq-a">A second covers two neighboring positions of the staff: one note on a line and the other in the adjacent space, or the other way around. It is the smallest step in the unaltered diatonic system.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which minor seconds are in the C major scale?</div>
      <div class="tm-faq-a">The C major scale has two minor seconds: E–F (scale degrees 3 and 4) and B–C (degrees 7 and 8). The other neighboring pairs (C–D, D–E, F–G, G–A, A–B) are major seconds.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is an augmented second?</div>
      <div class="tm-faq-a">An augmented 2nd is 3 half steps between two notes with different letter names. It appears between the 6th and 7th degrees of the harmonic minor scale: in A harmonic minor, it is F–G♯. It has a distinctive, almost exotic sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are seconds called stepwise (conjunct) motion?</div>
      <div class="tm-faq-a">Because they connect neighboring positions of the staff, moving step by step without skipping. Stepwise motion is the most natural for the human voice and the most common in melodies worldwide. Scales are sequences of major and minor seconds.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
