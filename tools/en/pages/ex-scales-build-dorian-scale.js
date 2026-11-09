const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-dorian-scale/',
  esPath: '/ejercicios/escalas/construir-escala-menor-dorica/',
  title: "Build Dorian Scales on the Staff: Interactive Exercise",
  description: "Build Dorian scales on the staff: the natural minor with a raised 6th. Free interactive exercise: place the 8 notes with the pattern W-H-W-W-W-H-W.",
  h1: "Build the Dorian Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>Dorian scale</strong> appears. Your task is to draw its <strong>8 notes</strong> on the staff. The Dorian scale is the natural minor scale with the <strong>6th raised</strong> by a half step: a "brighter" minor, symmetrical, widely used in jazz, folk and modal music.</p>

<div id="tmec_mend"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_mend", { scales: TM_CONSTRUIR_SCALES["menor-dorica"], titulo: "la Escala Menor Dórica" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the Dorian scale</h2>
<p>The pattern is <strong>W – H – W – W – W – H – W</strong> (UK: tone and semitone). It is symmetrical (it reads the same from the top down) and differs from the natural minor only in its raised 6th, which gives it a more open color.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Step</th><th>D Dorian</th><th>A Dorian</th><th>E Dorian</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>&mdash;</td><td>D</td><td>A</td><td>E</td></tr>
    <tr><td><strong>2nd</strong></td><td>W</td><td>E</td><td>B</td><td>F♯</td></tr>
    <tr><td><strong>3rd</strong></td><td>H</td><td>F</td><td>C</td><td>G</td></tr>
    <tr><td><strong>4th</strong></td><td>W</td><td>G</td><td>D</td><td>A</td></tr>
    <tr><td><strong>5th</strong></td><td>W</td><td>A</td><td>E</td><td>B</td></tr>
    <tr><td><strong>6th</strong></td><td>W</td><td>B</td><td>F♯</td><td>C♯</td></tr>
    <tr><td><strong>7th</strong></td><td>H</td><td>C</td><td>G</td><td>D</td></tr>
    <tr><td><strong>8th</strong></td><td>W</td><td>D</td><td>A</td><td>E</td></tr>
  </tbody>
</table>
</div>
<h2>The raised 6th, the mark of the Dorian mode</h2>
<p>Compared with the natural minor, the Dorian scale raises the 6th by a half step. That makes it the second mode of the major scale: <strong>D Dorian</strong> uses the white keys (the notes of C major starting on D). Its minor 3rd with a major 6th gives it a character that is both melancholy and bright.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Dorian scale?</div>
      <div class="tm-faq-a">It is the second mode of the major scale: a natural minor scale with the 6th raised by a half step. Its pattern is W-H-W-W-W-H-W and it is symmetrical. It has a minor 3rd but a major 6th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the natural minor scale?</div>
      <div class="tm-faq-a">Only in the 6th, which is raised by a half step in Dorian. That single change gives it a brighter, more open color than the natural minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does D Dorian have no accidentals?</div>
      <div class="tm-faq-a">Because the Dorian mode is built on the 2nd degree of the major scale, and D is the 2nd degree of C major. D Dorian uses the white keys: D-E-F-G-A-B-C-D, with B natural as the raised 6th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Dorian scale used for?</div>
      <div class="tm-faq-a">It is common in modal jazz, rock, Celtic folk and medieval music. It works well over minor seventh chords (m7) and gives a minor sound that is not dark.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I build it step by step?</div>
      <div class="tm-faq-a">Start from the natural minor scale on the tonic and raise only the 6th degree by a half step, keeping the letter name of that note. All the other degrees stay the same.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
