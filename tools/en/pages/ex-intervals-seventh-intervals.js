const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/seventh-intervals/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/septimas/',
  title: "Seventh Intervals: Major, Minor and Diminished 7th Quiz",
  description: "Practice major, minor and diminished sevenths on the staff: identify them, then build them. The interval of maximum tension. Free interactive quiz.",
  h1: "Intervals of a Seventh",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'intervalos-engine'],
  body: `<p>The <strong>seventh</strong> is the main source of tension in Western music. Its need to resolve toward the octave or the sixth drives the harmonic motion in cadences.</p>

<h2>1. Visual shortcut: spotting a seventh on the staff</h2>
<p>Sevenths need a little more visual practice because the notes are far apart, but there is a reliable shortcut.</p>
<p><strong>The same-kind rule:</strong> in a seventh, both notes are of the same kind, like thirds and fifths.</p>
<ul>
  <li>If the lower note is on a <strong>line</strong>, the upper note is on a <strong>line</strong> (far above).</li>
  <li>If the lower note is in a <strong>space</strong>, the upper note is in a <strong>space</strong>.</li>
</ul>
<p><strong>Shortcut:</strong> picture the octave and take one step away. If it looks like an octave but one note is one position closer, it is a seventh. Example in treble clef: E4 (first line) and D5 (fourth line).</p>

<h2>2. Reference table</h2>
<p>The tension of a seventh depends on its size: the minor 7th is a mild dissonance and the major 7th is a sharp one.</p>
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
      <td>Diminished 7th (d7)</td>
      <td>9</td>
      <td>Conditional dissonance (enharmonic to a major 6th)</td>
    </tr>
    <tr>
      <td>Minor 7th (m7)</td>
      <td>10</td>
      <td>Absolute dissonance</td>
    </tr>
    <tr>
      <td>Major 7th (M7)</td>
      <td>11</td>
      <td>Absolute dissonance</td>
    </tr>
    <tr>
      <td>Augmented 7th (A7)</td>
      <td>12</td>
      <td>Conditional dissonance (enharmonic to a perfect octave)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>3. Identify sevenths</h2>
<p>The goal is to identify sevenths at a glance. Accidentals should not confuse you: count the half steps (UK: semitones) from the letter names.</p>
<div id="tmg7"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmg7", {test:"grupo",val:"7"});
  });
</script>

<h2>4. Build sevenths</h2>
<p>A root note appears on the staff. Choose the type of seventh and click the position of the second note.</p>
<div id="tmcs7"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmIvEngine("tmcs7", {test:"construir", val:"7"});
  });
</script>

<h2>5. Printable worksheets</h2>
<p>Prefer paper? The <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a> creates a new sheet of sevenths each time, to identify or to write, with an answer key. You can also pick exactly which intervals to practice in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>.</p>

<p><a href="/diccionario-musical/intervalos/intervalos-musicales/">Music dictionary: intervals →</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/sextas/">← Sixths</a></p>
<p><a href="/ejercicios/ejercicios-de-intervalos-musicales/octavas/">Octaves →</a></p>

<p>To train your ear as well, use the <a href="/herramientas/afinador/">reference tones of the online tuner</a> and compare the sound of each interval with a pure tone. The <a href="/herramientas/metronomo/">online metronome</a> helps you build sight-reading speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many half steps does a seventh have?</div>
      <div class="tm-faq-a">The major 7th has 11 half steps (UK: semitones) and the minor 7th has 10. The diminished 7th has 9. Sevenths are dissonant intervals that ask to resolve to a sixth or to the octave.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are sevenths dissonant?</div>
      <div class="tm-faq-a">They sit very close to the octave (a consonance) without reaching it, and that creates a strong tension that looks for resolution. The minor 7th is the most common dissonance in dominant seventh chords (such as G–F in C major), which resolve to the tonic chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the identify and build exercises?</div>
      <div class="tm-faq-a">In the identify exercises, an interval is shown on the staff and you recognize its quality (major, minor, diminished). In the build exercises, you get a root note and place the note that forms the requested seventh, adding the accidental it needs. One trains visual recognition and the other trains construction.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are seconds and sevenths related?</div>
      <div class="tm-faq-a">They are inversions of each other. A major 2nd inverted is a minor 7th (2 + 10 = 12 half steps). A minor 2nd inverted is a major 7th (1 + 11 = 12). Complementary intervals always add up to 9 in number and 12 in half steps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a seventh on the staff?</div>
      <div class="tm-faq-a">A seventh covers 7 positions. Both notes are of the same kind (both on lines or both in spaces), with five positions between them. A second is also a pair of notes on neighboring positions, but in a second the notes are right next to each other, and in a seventh they are almost an octave apart.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
