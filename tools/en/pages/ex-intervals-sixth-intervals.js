const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/sixth-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/sextas/',
  title: "Sixth Intervals: Major and Minor 6th Quiz on the Staff",
  description: "Recognize major and minor sixths on the staff, then build them. One of the most expressive and melodic intervals. Free interactive quiz.",
  h1: "Intervals of a Sixth",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>sixth</strong> is one of the most expressive and melodic intervals. This page covers how to spot it on the staff and how it is classified harmonically.</p>

<h2>1. Visual shortcut: spotting a sixth on the staff</h2>
<p><strong>The crossing rule:</strong> a sixth always changes the kind of position.</p>
<ul>
  <li>If the lower note is on a <strong>line</strong>, the upper note is in a <strong>space</strong>.</li>
  <li>If the lower note is in a <strong>space</strong>, the upper note is on a <strong>line</strong>.</li>
</ul>
<p>A sixth covers 6 positions: 3 lines and 3 spaces, with four free positions between the notes. Example in treble clef: E4 (first line) and C5 (third space).</p>

<h2>2. Reference table</h2>
<p>Sixths are the inversions of thirds. Here are the exact half-step counts (UK: semitones) and the harmonic character of each:</p>
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
      <td>Diminished 6th (d6)</td>
      <td>7</td>
      <td>Conditional dissonance (enharmonic to a perfect 5th)</td>
    </tr>
    <tr>
      <td>Minor 6th (m6)</td>
      <td>8</td>
      <td>Imperfect consonance</td>
    </tr>
    <tr>
      <td>Major 6th (M6)</td>
      <td>9</td>
      <td>Imperfect consonance</td>
    </tr>
    <tr>
      <td>Augmented 6th (A6)</td>
      <td>10</td>
      <td>Conditional dissonance (enharmonic to a minor 7th)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify sixths</h2>
<p>These exercises identify sixths in treble and bass clef. Apply the visual rule before you answer.</p>
<div id="tmg6"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg6", {test:"grupo",val:"6"});
  });
</script>

<h2>4. Build sixths</h2>
<p>A root note appears on the staff. Choose the type of sixth and click the position of the second note.</p>
<div id="tmcs6"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs6", {test:"construir", val:"6"});
  });
</script>

<h2>5. Printable worksheets</h2>
<p>Prefer paper? The <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a> creates a new sheet of sixths each time, to identify or to write, with an answer key. You can also pick exactly which intervals to practice in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/quintas/">← Fifths</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/septimas/">Sevenths →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many half steps does a sixth have?</div>
      <div class="tm-faq-a">The major 6th has 9 half steps (UK: semitones) and the minor 6th has 8. The augmented 6th (the one used in augmented-sixth chords) has 10. Major and minor sixths are consonant and are often used to harmonize a melody in two voices.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are thirds and sixths related?</div>
      <div class="tm-faq-a">They are inversions of each other: a major third turned upside down becomes a minor sixth, and the other way around. If C–E is a major 3rd (4 half steps), then E–C (the inversion) is a minor 6th (8 half steps). A third and its inversion, a sixth, always add up to 9 in number.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a sixth on the staff?</div>
      <div class="tm-faq-a">A sixth covers 6 positions: the two notes are of different kinds (line to space or space to line), with four positions between them.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What role do sixths play in counterpoint and harmonization?</div>
      <div class="tm-faq-a">In two-voice counterpoint, thirds and sixths are the preferred intervals for parallel motion, because they are consonant and blend well. Harmonizing a melody in parallel sixths is a classic technique that gives a full, warm sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which sixths in the C major scale are major and which are minor?</div>
      <div class="tm-faq-a">Major sixths: C–A, D–B, F–D and G–E. Minor sixths: E–C, A–F and B–G. A memory aid: a sixth is the inversion of a third, so where a third is major, its inverted sixth is minor.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
