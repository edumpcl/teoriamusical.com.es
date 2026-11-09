const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/conjunct-and-disjunct-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/',
  title: 'Conjunct and Disjunct Intervals: Steps vs Leaps Quiz',
  description: 'Practice telling stepwise (conjunct) motion from leaps (disjunct) on the staff. A key skill for melody analysis. Free interactive quiz.',
  h1: 'Conjunct and Disjunct Intervals',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The distance between consecutive notes decides whether a melody moves smoothly (step by step) or leaps.</p>

<h2>Conjunct and disjunct motion</h2>

<h3>Conjunct motion (steps)</h3>
<p>These are intervals of a <strong>2nd</strong>. The notes are immediate neighbors: no staff position is skipped. This is the motion typical of scales and of vocal melodies.</p>

<h3>Disjunct motion (leaps)</h3>
<p>These are intervals of a <strong>3rd or larger</strong>. The melody jumps over one or more staff positions. Leaps are the basis of arpeggios and expressive melodic shapes.</p>

<h2>Practice: step or leap?</h2>

<div id="tmcd"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcd", {test:"con_dis"});
  });
</script>

<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/">Consonant and dissonant intervals →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is conjunct motion in music?</div>
      <div class="tm-faq-a">Conjunct motion means melodic intervals of a 2nd: the notes move from one staff position to the immediately neighboring one. It is the most natural motion for the human voice and the most frequent in melodies. A scale is a perfect example of purely conjunct motion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is disjunct motion in music?</div>
      <div class="tm-faq-a">Disjunct motion means melodic intervals of a 3rd or larger: the melody leaps over one or more staff positions. Leaps add expression and energy, but they are harder to sing. Intervals of a 6th, 7th and octave are large leaps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you tell conjunct from disjunct motion on the staff?</div>
      <div class="tm-faq-a">If two consecutive notes sit on neighboring positions (a line and the next space, with nothing skipped), the motion is conjunct (a 2nd). If one or more positions are skipped between the two notes, it is disjunct (a 3rd or larger).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">When should you use conjunct or disjunct motion when composing?</div>
      <div class="tm-faq-a">Conjunct motion creates fluency and a natural feel, ideal for vocal melodies and calm passages. Disjunct motion brings energy and surprise, useful to stress a climax or to give a melody an instrumental character. Most good melodies mix both.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a 2nd and what types does it have?</div>
      <div class="tm-faq-a">A 2nd is the interval of number 2 (two neighboring staff positions). The types are the major 2nd (2 half steps, such as C–D) and the minor 2nd (1 half step, such as E–F or B–C). The augmented 2nd (3 half steps) is rare in diatonic melodies: it appears in the harmonic minor scale, for example F–G♯ in A harmonic minor.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
