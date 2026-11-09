const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/octave-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/octavas/',
  title: "Octave Intervals: Perfect Octave Quiz on the Staff",
  description: "Practice finding perfect octaves on the staff, and their augmented and diminished variants. Identify them, then build them. Free interactive quiz.",
  h1: "Intervals of an Octave",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>octave</strong> is the most consonant interval. It doubles the frequency, and it is the foundation of the Western musical system: two notes an octave apart share the same name and are heard as the same note in different registers.</p>

<h2>1. Visual shortcut: spotting a octave on the staff</h2>
<p>Octaves are a matter of recognizing spatial patterns on the staff.</p>
<p><strong>The mirror rule:</strong> an octave always changes the kind of position, like fourths and sixths.</p>
<ul>
  <li>If the lower note is on a <strong>line</strong>, the upper note is in a <strong>space</strong>.</li>
  <li>If the lower note is in a <strong>space</strong>, the upper note is on a <strong>line</strong>.</li>
</ul>
<p>An octave covers exactly 4 lines and 4 spaces, with six free positions between the notes. It is a wide, balanced distance. Example in treble clef: C4 (first ledger line below) and C5 (third space).</p>

<h2>2. Reference table</h2>
<p>The octave is usually perfect, but in advanced theory its variants are also considered:</p>
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
      <td>Diminished 8th (d8)</td>
      <td>11</td>
      <td>Conditional dissonance (enharmonic to a major 7th)</td>
    </tr>
    <tr>
      <td>Perfect octave (P8)</td>
      <td>12</td>
      <td>Perfect consonance</td>
    </tr>
    <tr>
      <td>Augmented 8th (A8)</td>
      <td>13</td>
      <td>Conditional dissonance (enharmonic to a minor 9th)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify octaves</h2>
<p>These exercises identify perfect octaves and their variants. The note name stays the same while the register changes a lot.</p>
<div id="tmg8"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg8", {test:"grupo",val:"8"});
  });
</script>

<h2>4. Build octaves</h2>
<p>A root note appears on the staff. Choose the type of octave and click the position of the second note.</p>
<div id="tmcs8"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs8", {test:"construir", val:"8"});
  });
</script>

<h2>5. Printable worksheets</h2>
<p>Prefer paper? The <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a> creates a new sheet of octaves each time, to identify or to write, with an answer key. You can also pick exactly which intervals to practice in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/septimas/">← Sevenths</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/">All interval exercises →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many half steps does a perfect octave have?</div>
      <div class="tm-faq-a">Exactly 12 half steps (UK: semitones). It is the interval of repetition: the same note in a different register. Two notes with the same name, 12 half steps apart, form a perfect octave.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize an octave on the staff?</div>
      <div class="tm-faq-a">An octave covers 8 positions. Both notes have the same name, but they sit on different kinds of position (one on a line and the other in a space, or the other way around), with six positions between them. In treble clef, C4 (first ledger line below the staff) and C5 (third space) are an octave apart.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the octave sound so consonant?</div>
      <div class="tm-faq-a">Because the two notes have a frequency ratio of 2:1, the simplest ratio after the unison. The octave is also the first overtone of every note: when you play C3, the strongest extra pitch it produces is C4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the 8va sign mean?</div>
      <div class="tm-faq-a">The 8va sign above a note or passage means that it is played one octave higher than written. The 8vb sign (ottava bassa) below means one octave lower. Both signs avoid too many ledger lines.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What types of octaves exist?</div>
      <div class="tm-faq-a">The perfect octave (12 half steps) is the common one. The augmented octave (13 half steps, enharmonic to a minor 9th) and the diminished octave (11 half steps, enharmonic to a major 7th) are possible in theory but very rare. When an "octave" appears in analysis, it is almost always perfect.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
