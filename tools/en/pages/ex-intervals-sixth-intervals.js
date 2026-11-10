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

<!-- ficha-intervalos -->
<h2>5. Printable sixth worksheets (PDF)</h2>
<p>The same two skills, on paper: one sheet to <strong>identify</strong> written sixths and another to <strong>write</strong> them. Each has <strong>42 melodic sixth intervals</strong> in treble clef spread over seven staves, starting with natural, ascending notes —the major and minor sixths that come out of the natural scale— and ending with sharps and flats and mixed directions. No exercise repeats the same two notes.</p>

<h3>Identify sixths</h3>
<p>Under each interval there is a line to write <strong>what kind of sixth it is and whether it ascends or descends</strong> (M6 ↑, m6 ↓…).</p>
<figure class="tm-staff">
  <a href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-sexta.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/intervalos/fichas/preview-ficha-analizar-intervalos-de-sexta.webp"><img src="/assets/img/intervalos/fichas/preview-ficha-analizar-intervalos-de-sexta.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet with 42 melodic sixth intervals in treble clef to identify"></picture></a>
  <figcaption>A4 sheet with 42 melodic sixths to identify.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-sexta.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/intervalos/fichas/ficha-analizar-intervalos-de-sexta-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<h3>Write sixths</h3>
<p>The reverse exercise: the first note and the interval to form are given, and the student places the second note on the staff, with its accidental if it needs one.</p>
<figure class="tm-staff">
  <a href="/assets/img/intervalos/fichas/ficha-escribir-intervalos-de-sexta.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/intervalos/fichas/preview-ficha-escribir-intervalos-de-sexta.webp"><img src="/assets/img/intervalos/fichas/preview-ficha-escribir-intervalos-de-sexta.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to write 42 melodic sixth intervals in treble clef"></picture></a>
  <figcaption>A4 sheet with 42 melodic sixths to write.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/intervalos/fichas/ficha-escribir-intervalos-de-sexta.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/intervalos/fichas/ficha-escribir-intervalos-de-sexta-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<p>You may print and photocopy them freely for the classroom. Each answer sheet is the same worksheet with the answers in red, so you correct by laying one over the other. The rest —including the sheets that mix several intervals— is in <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheets in PDF</a>, and if you want new sheets every time or to practice on screen choosing the intervals, in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>
<!-- /ficha-intervalos -->

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
