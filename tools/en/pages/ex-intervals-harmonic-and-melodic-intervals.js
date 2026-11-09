const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/harmonic-and-melodic-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/',
  title: 'Harmonic and Melodic Intervals: Free Interactive Quiz',
  description: 'Tell harmonic intervals (notes together) from melodic intervals (notes in sequence) on a real staff. Free quiz, no sign-up.',
  h1: 'Harmonic and Melodic Intervals',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>How the two notes are placed in time decides whether an interval is harmonic (together) or melodic (in sequence).</p>

<h2>Harmonic interval and melodic interval</h2>

<h3>Harmonic interval</h3>
<p>The two notes sound <strong>at the same time</strong>: they are stacked on the staff at the same horizontal position. This is the basic unit of harmony.</p>

<h3>Melodic interval</h3>
<p>The notes sound <strong>one after the other</strong>: you read them from left to right. This is the basic unit of melody. A melodic interval can be ascending or descending.</p>

<h2>Practice: harmonic or melodic?</h2>

<div id="tmam"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmam", {test:"arm_mel"});
  });
</script>

<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/">Ascending and descending intervals →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a harmonic and a melodic interval?</div>
      <div class="tm-faq-a">In a harmonic interval, the two notes sound together (stacked vertically on the staff) and form harmony. In a melodic interval, the notes come in sequence (horizontally) and form a melody. The number and quality of the interval are the same in both cases; only the way it is presented changes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you spot harmonic intervals on the staff?</div>
      <div class="tm-faq-a">Harmonic intervals look like two notes stacked at the same horizontal position, one above the other. You analyze them by counting from the lower note to the upper note, exactly as you do for melodic intervals.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are ascending and descending melodic intervals?</div>
      <div class="tm-faq-a">An ascending melodic interval goes from a lower note to a higher one (the second note is higher on the staff). A descending interval goes the other way: from a higher note to a lower one. The number and quality are always measured between the lower and the higher note, no matter which one sounds first.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can a harmonic interval be turned into a melodic one?</div>
      <div class="tm-faq-a">Yes. The notes are the same; only the timing changes (together or apart). In analysis it is common to "unfold" a harmonic interval to see it as a melodic one and understand its role in the melody.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does it matter to tell them apart?</div>
      <div class="tm-faq-a">Harmonic intervals decide the consonance or dissonance of the vertical sound, while melodic intervals shape the contour and expression of a melody. In counterpoint, for example, you study which melodic intervals work best in each voice and which harmonic intervals create tension or rest.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
