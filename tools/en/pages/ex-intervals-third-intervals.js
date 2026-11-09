const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/third-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/terceras/',
  title: "Third Intervals: Major and Minor 3rd Quiz on the Staff",
  description: "Learn to tell major thirds from minor thirds on the staff, then build them. Thirds are the key to major and minor chords. Free interactive quiz.",
  h1: "Intervals of a Third",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>third</strong> is the heart of tonal harmony. Chords are built by stacking thirds, and the quality of the third decides whether a chord sounds major (bright) or minor (darker).</p>

<h2>1. Visual shortcut: spotting a third on the staff</h2>
<p><strong>The skip rule:</strong> in a third, the two notes skip exactly one position, so both notes are of the same kind.</p>
<ul>
  <li>If the lower note is on a <strong>line</strong>, the upper note is on the <strong>next line</strong> (above or below).</li>
  <li>If the lower note is in a <strong>space</strong>, the upper note is in the <strong>next space</strong>.</li>
</ul>
<p>There is one free position (a line or a space) between the two notes. Example in treble clef: E4 (first line) and G4 (second line), with F4 between them.</p>

<h2>2. Reference table</h2>
<p>There are four types of thirds, according to the number of half steps (UK: semitones) they contain:</p>
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
      <td>Diminished 3rd (d3)</td>
      <td>2</td>
      <td>Conditional dissonance (enharmonic to a major 2nd)</td>
    </tr>
    <tr>
      <td>Minor 3rd (m3)</td>
      <td>3</td>
      <td>Imperfect consonance</td>
    </tr>
    <tr>
      <td>Major 3rd (M3)</td>
      <td>4</td>
      <td>Imperfect consonance</td>
    </tr>
    <tr>
      <td>Augmented 3rd (A3)</td>
      <td>5</td>
      <td>Conditional dissonance (enharmonic to a perfect 4th)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify thirds</h2>
<p>These exercises train the difference between major and minor thirds in different key signatures and clefs.</p>
<div id="tmg3"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg3", {test:"grupo",val:"3"});
  });
</script>

<h2>4. Build thirds</h2>
<p>A root note appears on the staff. Choose the type of third and click the position of the second note.</p>
<div id="tmcs3"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs3", {test:"construir", val:"3"});
  });
</script>

<h2>5. Printable worksheets</h2>
<p>Prefer paper? The <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a> creates a new sheet of thirds each time, to identify or to write, with an answer key. You can also pick exactly which intervals to practice in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/segundas/">← Seconds</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/cuartas/">Fourths →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of thirds are there?</div>
      <div class="tm-faq-a">The two common ones are the major 3rd (4 half steps, such as C–E, F–A and G–B) and the minor 3rd (3 half steps, such as D–F, E–G, A–C and B–D). There are also the diminished 3rd (2 half steps, enharmonic to a major 2nd) and the augmented 3rd (5 half steps, enharmonic to a perfect 4th). Both are rare in tonal music.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a third on the staff?</div>
      <div class="tm-faq-a">A third joins two positions of the same kind (line to line or space to space) with one position skipped in between. It is one of the easiest intervals to spot, because the notes sit close together but are separated by one position.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are thirds so important in harmony?</div>
      <div class="tm-faq-a">Because triads are built by stacking thirds: root, third and fifth. A major third plus a minor third makes a major triad (C–E–G). Two minor thirds make a diminished triad. The mix of major and minor thirds decides the character of the chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which thirds in the C major scale are major?</div>
      <div class="tm-faq-a">The major thirds are C–E (degrees 1–3), F–A (4–6) and G–B (5–7). The other thirds of the scale (D–F, E–G, A–C, B–D) are minor thirds.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are thirds related to chords?</div>
      <div class="tm-faq-a">Every triad is two stacked thirds. Major third below and minor third above: major triad. Minor below and major above: minor triad. Two minor thirds: diminished triad. Two major thirds: augmented triad.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
