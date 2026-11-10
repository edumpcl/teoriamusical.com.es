const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/complete-interval-analysis/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/',
  title: 'Complete Interval Analysis: Advanced Interval Quiz',
  description: 'Full interval analysis quiz: number, quality, simple or compound, direction and harmonic or melodic. Four levels, up to double accidentals.',
  h1: 'The Master Challenge: Complete Interval Analysis',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>This quiz puts every interval skill together in one analysis. Follow the six steps below for each interval.</p>

<h2>Six-Step Guide to Analyzing an Interval</h2>
<div>
  <div>
    <h3>1. Measure the number</h3>
    <p>Count the lines and spaces between the notes, including both. On the easy and medium levels the intervals go up to the octave; on hard and pro they go up to the 15th.</p>
  </div>
  <div>
    <h3>2. Name the quality</h3>
    <p>Decide whether it is diminished, minor, perfect, major or augmented. On the pro level, doubly diminished and doubly augmented intervals can also appear.</p>
  </div>
  <div>
    <h3>3. Simple or compound</h3>
    <p>An interval is <strong>simple</strong> if it spans up to an octave (2nd to 8th) and <strong>compound</strong> if it is larger than an octave (9th to 15th).</p>
  </div>
  <div>
    <h3>4. Conjunct or disjunct</h3>
    <p>The motion is <strong>conjunct</strong> if the notes are a 2nd apart (a step) and <strong>disjunct</strong> if the leap is larger than a 2nd.</p>
  </div>
  <div>
    <h3>5. Harmonic or melodic</h3>
    <p>An interval is <strong>harmonic</strong> if the two notes sound together (they are written as a chord) and <strong>melodic</strong> if they sound one after the other.</p>
  </div>
  <div>
    <h3>6. Ascending or descending</h3>
    <p>Only for melodic intervals: it is <strong>ascending</strong> if the second note is higher than the first, and <strong>descending</strong> if it is lower.</p>
  </div>
</div>
<div>

<div id="tmcomp"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcomp", {test:"completo"});
  });
</script>

</div>

<h2>Build intervals: all numbers</h2>
<p>A root note appears on the staff. Place the note that completes the requested interval (any number and quality) on the staff.</p>
<div id="tmconstruir_comp"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmconstruir_comp", {test:"construir"});
  });
</script>

<div>
  This is the top level of interval analysis. Mastering it opens the door to the study of advanced harmony.
</div>

<p>If you would rather limit the challenge to certain intervals instead of all of them, use the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>, where you choose which ones appear.</p>

<p>The paper version of this challenge is the <a href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-2a-a-8a.pdf" target="_blank" rel="noopener">2nd-to-8th interval worksheet</a>, with its 42 mixed intervals and its <a href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-2a-a-8a-soluciones.pdf" target="_blank" rel="noopener">answer sheet</a>; the rest is in <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheets in PDF</a>, where the generator makes new sheets of 2nd to 8th intervals mixed together, with an answer key.</p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the steps of a complete interval analysis?</div>
      <div class="tm-faq-a">A complete analysis needs three pieces of information. 1) Number: count the staff positions from the lower note to the upper note, including both. 2) Quality: count the exact half steps (UK: semitones) to decide whether it is major, minor, perfect, augmented or diminished. 3) Arrangement: whether it is harmonic (together) or melodic (in sequence), and whether it is ascending or descending.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you work out the quality of an interval?</div>
      <div class="tm-faq-a">Count the exact number of half steps between the two notes and compare it with the reference values. For a 3rd, 4 half steps is major and 3 is minor. For 4ths and 5ths: 5 half steps = perfect 4th, 7 = perfect 5th. The key signature and the accidentals matter for deciding the quality.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">When is an interval augmented or diminished?</div>
      <div class="tm-faq-a">An augmented interval is one half step larger than the major or perfect interval. A diminished interval is one half step smaller than the minor or perfect interval. You make an interval augmented by raising the upper note or lowering the lower note, and diminished by doing the opposite. The tritone is an augmented 4th or a diminished 5th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the rule of complementary intervals?</div>
      <div class="tm-faq-a">Two intervals are complementary (inversions of each other) when their numbers add up to 9 and their half steps add up to 12. A major 3rd (4 half steps) inverted is a minor 6th (8 half steps): 4 + 8 = 12 and 3 + 6 = 9. Inversion turns major into minor, augmented into diminished and perfect into perfect. Knowing this rule lets you calculate inversions quickly.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you analyze intervals in a real score?</div>
      <div class="tm-faq-a">In a real score you must take the key signature into account: with two sharps in the key signature, every F and C is raised automatically even if no sign appears on the note. Accidentals written on a note change only that note, and only until the end of the measure (UK: bar).</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
