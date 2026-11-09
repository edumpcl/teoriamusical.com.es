const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/fourth-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/cuartas/',
  title: "Fourth Intervals: Perfect and Augmented 4th Quiz",
  description: "Practice perfect fourths and augmented fourths (the tritone) on the staff: identify them by half steps, then build them. Free interactive quiz.",
  h1: "Intervals of a Fourth",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>fourth</strong> is a basic distance in harmony. It is the interval between the tonic and the subdominant of a key, and it appears everywhere in classical music, jazz and folk music.</p>

<h2>1. Visual shortcut: spotting a fourth on the staff</h2>
<p><strong>The crossing rule:</strong> a fourth always changes the kind of position.</p>
<ul>
  <li>If the lower note is on a <strong>line</strong>, the upper note is in a <strong>space</strong>.</li>
  <li>If the lower note is in a <strong>space</strong>, the upper note is on a <strong>line</strong>.</li>
</ul>
<p>Between the two notes there are two free positions (a line and a space, or a space and a line). Example in treble clef: E4 (first line) and A4 (second space), with F4 and G4 skipped.</p>

<h2>2. Reference table</h2>
<p>The perfect 4th is one of the most stable and powerful intervals in music. Here are the three types:</p>
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
      <td>Diminished 4th (d4)</td>
      <td>4</td>
      <td>Conditional dissonance (enharmonic to a major 3rd)</td>
    </tr>
    <tr>
      <td>Perfect 4th (P4)</td>
      <td>5</td>
      <td>Perfect consonance</td>
    </tr>
    <tr>
      <td>Augmented 4th (A4)</td>
      <td>6</td>
      <td>Semi-consonance (tritone)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify fourths</h2>
<p>These exercises train quick recognition of perfect fourths and tell them apart from augmented fourths (the tritone).</p>
<div id="tmg4"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg4", {test:"grupo",val:"4"});
  });
</script>

<h2>4. Build fourths</h2>
<p>A root note appears on the staff. Choose the type of fourth and click the position of the second note.</p>
<div id="tmcs4"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs4", {test:"construir", val:"4"});
  });
</script>

<h2>5. Printable worksheets</h2>
<p>Prefer paper? The <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a> creates a new sheet of fourths each time, to identify or to write, with an answer key. You can also pick exactly which intervals to practice in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/terceras/">← Thirds</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/quintas/">Fifths →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many half steps does a perfect 4th have?</div>
      <div class="tm-faq-a">A perfect 4th has 5 half steps (UK: semitones). In a major key it appears between degrees 1–4, 2–5, 3–6, 5–1 (upward), 6–2 and 7–3. The augmented 4th (tritone) has 6 half steps and the diminished 4th has 4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a fourth on the staff?</div>
      <div class="tm-faq-a">A fourth covers 4 positions of the staff: one note on a line and the other in a space (or the other way around). There are two positions between the notes, one line and one space.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the tritone?</div>
      <div class="tm-faq-a">The tritone is the augmented 4th (or diminished 5th): 6 half steps, exactly half of an octave. In C major it occurs between F and B (an augmented 4th). On this site it is classed as a semi-consonance: a very unstable interval that, in the tonal style, usually asks to resolve.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is a fourth consonant or dissonant?</div>
      <div class="tm-faq-a">It depends on the context. On its own, and in melodies, the perfect 4th sounds stable, and these exercises classify it as a perfect consonance. But in strict counterpoint, a perfect 4th between the bass and an upper voice is treated as a dissonance that needs to resolve.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many perfect fourths are in the C major scale?</div>
      <div class="tm-faq-a">Six: C–F, D–G, E–A, G–C, A–D and B–E. The only fourth that is not perfect is F–B, an augmented 4th (tritone) with 6 half steps instead of 5.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
