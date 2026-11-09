const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/fifth-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/quintas/',
  title: "Fifth Intervals: Perfect and Diminished 5th Quiz",
  description: "Practice perfect and diminished fifths on the staff: identify them by half steps, then build them. Free interactive quiz with real notation.",
  h1: "Intervals of a Fifth",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>perfect fifth</strong> is the most stable interval after the octave. It is the basis of most scales and triads, and its open sound is unmistakable in every kind of music.</p>

<h2>1. Visual shortcut: spotting a fifth on the staff</h2>
<p><strong>The symmetry rule:</strong> a fifth keeps the same kind of position, just like a third.</p>
<ul>
  <li>If the lower note is on a <strong>line</strong>, the upper note is on a <strong>line</strong>, two lines higher.</li>
  <li>If the lower note is in a <strong>space</strong>, the upper note is in a <strong>space</strong>, two spaces higher.</li>
</ul>
<p>Between the two notes there are three free positions. Example in treble clef: E4 (first line) and B4 (third line); or F4 (first space) and C5 (third space).</p>

<h2>2. Reference table</h2>
<p>The perfect fifth is the backbone of tonal harmony. Here are the three types:</p>
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
      <td>Diminished 5th (d5)</td>
      <td>6</td>
      <td>Semi-consonance (tritone)</td>
    </tr>
    <tr>
      <td>Perfect 5th (P5)</td>
      <td>7</td>
      <td>Perfect consonance</td>
    </tr>
    <tr>
      <td>Augmented 5th (A5)</td>
      <td>8</td>
      <td>Conditional dissonance (enharmonic to a minor 6th)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify fifths</h2>
<p>These exercises train the identification of fifths. Pay special attention to the diminished 5th: it is the key to resolving seventh chords.</p>
<div id="tmg5"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg5", {test:"grupo",val:"5"});
  });
</script>

<h2>4. Build fifths</h2>
<p>A root note appears on the staff. Choose the type of fifth and click the position of the second note.</p>
<div id="tmcs5"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs5", {test:"construir", val:"5"});
  });
</script>

<h2>5. Printable worksheets</h2>
<p>Prefer paper? The <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a> creates a new sheet of fifths each time, to identify or to write, with an answer key. You can also pick exactly which intervals to practice in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/cuartas/">← Fourths</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/sextas/">Sixths →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many half steps does a perfect 5th have?</div>
      <div class="tm-faq-a">A perfect 5th has 7 half steps (UK: semitones). It is one of the most consonant and stable intervals of tonal music. The diminished 5th (tritone) has 6 half steps and the augmented 5th has 8.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the fifth so important in music?</div>
      <div class="tm-faq-a">The perfect 5th is the strongest relationship after the octave, and the basis of the key system. The circle of fifths organizes the 12 major keys by this interval. It also has an acoustic reason: the second harmonic of any note is its octave, and the third harmonic is a perfect fifth above that octave.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a fifth on the staff?</div>
      <div class="tm-faq-a">A fifth covers 5 positions: both notes are of the same kind (both on lines or both in spaces), with three positions between them. For example, E4 on the first line and B4 on the third line, or F4 in the first space and C5 in the third space.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a diminished 5th and an augmented 4th?</div>
      <div class="tm-faq-a">They are enharmonic: both have 6 half steps (the tritone). On the staff they sit on different positions: the diminished 5th spans 5 positions, while the augmented 4th spans 4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many perfect fifths are in the C major scale?</div>
      <div class="tm-faq-a">Six: C–G, D–A, E–B, F–C, G–D and A–E. The only fifth that is not perfect is B–F, a diminished 5th (tritone). It is the same tritone as F–B, seen upside down.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
