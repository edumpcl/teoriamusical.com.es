const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-melodic-minor-scale/',
  esPath: '/ejercicios/escalas/construir-escala-menor-melodica/',
  title: "Build Melodic Minor Scales on the Staff: Exercise",
  description: "Build the full melodic minor scale on the staff: up with a raised 6th and 7th, down as natural minor. Free interactive exercise, 15 notes.",
  h1: "Build the Melodic Minor Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>melodic minor scale</strong> appears. Your task is to draw the <strong>complete scale, up and down</strong>: <strong>15 notes</strong>. The melodic minor scale is one form that changes direction: <strong>ascending</strong> it raises the 6th and 7th; <strong>descending</strong> it undoes those accidentals and goes back to natural minor.</p>

<div id="tmec_menm"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_menm", { scales: TM_CONSTRUIR_SCALES["menor-melodica"], titulo: "la Escala Menor Melódica" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the melodic minor scale</h2>
<p>Going up, the pattern is <strong>W – H – W – W – W – W – H</strong> (6th and 7th raised; UK: tone and semitone). Going down, those two raises are undone and the scale follows the degrees of the <strong>natural minor</strong>. These are not two different scales: it is the same scale, written and sung going up and going down.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Ascending ↑</th><th>Descending ↓</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>A</td><td>A</td></tr>
    <tr><td><strong>2nd</strong></td><td>B</td><td>B</td></tr>
    <tr><td><strong>3rd</strong></td><td>C</td><td>C</td></tr>
    <tr><td><strong>4th</strong></td><td>D</td><td>D</td></tr>
    <tr><td><strong>5th</strong></td><td>E</td><td>E</td></tr>
    <tr><td><strong>6th</strong></td><td>F♯</td><td>F</td></tr>
    <tr><td><strong>7th</strong></td><td>G♯</td><td>G</td></tr>
    <tr><td><strong>8th</strong></td><td>A</td><td>A</td></tr>
  </tbody>
</table>
</div>
<h2>One scale that goes up and down</h2>
<p>The melodic minor scale is the only scale of this section that changes with the direction. <strong>Going up</strong> it raises the 6th and 7th (A melodic minor: A-B-C-D-E-F♯-G♯-A). <strong>Going down</strong> it undoes both raises and sounds like the natural minor scale (A-G-F-E-D-C-B-A). That is why the exercise asks you to place all 15 notes in order: first the ascent with the accidentals, then the descent with the natural notes.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the melodic minor scale?</div>
      <div class="tm-faq-a">It is the minor scale that, on the way up, raises the 6th and the 7th (pattern W-H-W-W-W-W-H) to smooth the approach to the tonic, and on the way down undoes those accidentals, matching the natural minor. It is one scale with two directions.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the melodic minor scale different going up and going down?</div>
      <div class="tm-faq-a">Going up, the 6th and 7th are raised to avoid the augmented second of the harmonic minor scale and to lead smoothly to the tonic. Going down, that lead is no longer needed, so the scale returns to natural minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the descending melodic minor scale look like?</div>
      <div class="tm-faq-a">It is exactly the natural minor scale read from the octave down to the tonic: 7th and 6th not raised. For example, A melodic minor descends A-G-F-E-D-C-B-A.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does it have 15 notes?</div>
      <div class="tm-faq-a">Because the melodic scale is understood as a complete round trip: 8 notes going up (from the tonic to the octave) and 7 going down (from the octave back to the tonic). The top note is shared, hence 15 notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the harmonic minor scale?</div>
      <div class="tm-faq-a">The harmonic minor raises only the 7th and keeps the augmented second in both directions. The melodic minor raises the 6th and the 7th going up (no augmented second) and lowers them going down.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
