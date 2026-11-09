const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/ascending-and-descending-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/',
  title: 'Ascending and Descending Intervals: Free Online Quiz',
  description: 'Practice melodic direction on the staff: decide whether an interval goes up or down. Free interactive quiz with real notation.',
  h1: 'Ascending and Descending Intervals',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>Reading the direction of a melodic line is the key to understanding how voices move.</p>

<h2>Ascending and descending direction</h2>
<p>Reading from left to right, look at where the second note is compared with the first:</p>
<ul>
  <li><strong>Ascending:</strong> the second note is higher on the staff.</li>
  <li><strong>Descending:</strong> the second note is lower on the staff.</li>
</ul>

<h2>Practice: up or down?</h2>

<div id="tmad"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmad", {test:"asc_des"});
  });
</script>

<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/">Conjunct and disjunct intervals →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is an ascending melodic interval?</div>
      <div class="tm-faq-a">An ascending melodic interval is one where the second note is higher than the first: on the staff, the line goes up. Examples: C→G (an ascending 5th) and E→A (an ascending 4th). Most melodies combine ascending and descending motion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a descending melodic interval?</div>
      <div class="tm-faq-a">A descending melodic interval is one where the second note is lower than the first: on the staff, the line goes down. To find its number and quality, take the lower and the higher note and analyze the interval from the lower one up, whichever sounds first.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does direction affect the analysis of an interval?</div>
      <div class="tm-faq-a">Direction does not change the number or the quality of an interval. C up to G is a perfect 5th, and G down to C is also a perfect 5th: both contain the same two notes. Be careful with the reverse pair: G up to the next C is a perfect 4th, and C down to the G below it is a perfect 4th too. In melodies, direction shows the contour and the expressive tension.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are stepwise (conjunct) and leaping (disjunct) motion?</div>
      <div class="tm-faq-a">Conjunct motion uses melodic intervals of a 2nd: the notes move step by step, to the neighboring position. Disjunct motion uses intervals of a 3rd or larger (leaps). Vocal melodies favor conjunct motion; large leaps (6ths, 7ths, octaves) add drama.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are oblique and contrary motion in harmony?</div>
      <div class="tm-faq-a">Contrary motion is when two voices move in opposite directions: one goes up while the other goes down. Oblique motion is when one voice stays on the same note while the other moves. Parallel motion is when both voices move in the same direction by the same interval.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
