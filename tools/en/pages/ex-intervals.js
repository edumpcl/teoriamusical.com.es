const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/',
  title: 'Interval Exercises: Free Online Quizzes on the Staff',
  description: 'Free music interval exercises: seconds to octaves with real notation. Number, quality, direction, consonance, and a full analysis challenge.',
  h1: 'Interval Academy',
  crumbs: [['Music Exercises', '/ejercicios/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: [],
  body: `<p>A learning path for musical intervals, from counting positions on the staff to a complete analysis.</p>

<h2>1. The theory foundations</h2>
<div>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/distancia/">
    <h3>Distance (number)</h3>
    <p>Basic counting of lines and spaces on the staff.</p>
  </a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/">
    <h3>Arrangement</h3>
    <p>Analysis of harmonic (vertical) and melodic (horizontal) intervals.</p>
  </a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/">
    <h3>Direction</h3>
    <p>Identifying the direction of melodic motion.</p>
  </a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/">
    <h3>Steps and leaps</h3>
    <p>Telling conjunct (stepwise) motion from disjunct motion (leaps).</p>
  </a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/">
    <h3>Harmonic stability</h3>
    <p>Classifying intervals by tension (consonance vs dissonance).</p>
  </a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/">
    <h3>Half steps and enharmonics</h3>
    <p>Recognizing the diatonic half step, the chromatic half step, the enharmonic note or the unison between two notes.</p>
  </a>
</div>

<h2>2. Practice by number</h2>
<div>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/segundas/">2nd Seconds</a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/terceras/">3rd Thirds</a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/cuartas/">4th Fourths</a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/quintas/">5th Fifths</a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/sextas/">6th Sixths</a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/septimas/">7th Sevenths</a>
  <a href="/ejercicios/ejercicios-de-intervalos-musicales/octavas/">8th Octaves</a>
</div>

<h2>Choose your own intervals</h2>
<p>Only 3rds and 5ths? From the 2nd to the 6th, which is as far as your class has gone? In the custom quiz you tick the intervals that appear and practice just those, on screen or on a printable sheet.</p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">Open the custom interval quiz</a></p>

<h2>The final challenge</h2>
<p>Have you passed all the levels above? Prove it in the complete test: number, quality and arrangement at the same time.</p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/">Start the complete analysis</a></p>

<h2>For working on paper</h2>
<p>The same skills, without a screen: 26 A4 worksheets with 42 melodic intervals each (one interval at a time, or mixed by level, from 2nd and 3rd up to all seven together), plus a generator that makes new sheets, each with an answer key.</p>
<p><a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">Go to the interval worksheets</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What interval exercises does this section include?</div>
      <div class="tm-faq-a">Exercises to identify the number (2nd to octave), the quality (major, minor, perfect, augmented, diminished), the direction (ascending or descending), the arrangement (harmonic or melodic), consonance or dissonance, half steps and enharmonic notes. There are also exercises to build intervals on the staff from the requested type.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of musical intervals are there?</div>
      <div class="tm-faq-a">There are melodic intervals (notes in sequence, forming a melody) and harmonic intervals (notes at the same time, forming harmony). They are classified by number (2nd to octave) and by quality (perfect, major, minor, augmented, diminished).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you calculate the number of an interval?</div>
      <div class="tm-faq-a">Count the lines and spaces from the lower note to the upper note, including both. From C to G: C (1), D (2), E (3), F (4), G (5), so it is a 5th. Then count the half steps (UK: semitones) to find the quality.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order should you practice the interval exercises?</div>
      <div class="tm-faq-a">Start with the number of the interval, then its quality (by counting half steps), then consonance and dissonance, then direction and arrangement, and finally construction. Within each group, practice the simplest intervals first (2nds, 3rds) and move on to the more complex ones (7ths, augmented and diminished).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a diatonic and a chromatic half step?</div>
      <div class="tm-faq-a">A diatonic half step joins two notes with different letter names (E–F, B–C). A chromatic half step joins two notes with the same letter name and different accidentals (C–C♯, F–F♯). On the staff, the diatonic one occupies a new position, and the chromatic one stays on the same line or space.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
