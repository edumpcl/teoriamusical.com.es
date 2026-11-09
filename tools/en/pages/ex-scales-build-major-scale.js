const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-major-scale/',
  esPath: '/ejercicios/escalas/construir-escala-mayor/',
  title: "Build Major Scales on the Staff: Interactive Exercise",
  description: "Build the 15 major scales on the staff: given the scale name, place the 8 notes with the right accidentals. Free interactive exercise.",
  h1: "Build Major Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a major scale appears. Your task is to draw its <strong>8 notes</strong> on the staff from scratch: tonic, 2nd, 3rd, 4th, 5th, 6th, 7th and octave. Use the accidental buttons (♭ ♮ ♯) to add sharps or flats where they are needed.</p>

<div id="tmec_mayor"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_mayor", {});
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the major scale</h2>
<p>All major scales follow the same pattern of intervals: <strong>W – W – H – W – W – W – H</strong> (whole step, whole step, half step, whole step, whole step, whole step, half step; UK: tone and semitone). Applying this pattern to any starting note gives the major scale on that note. The "Step" column shows the distance from the previous note.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Step</th><th>C major</th><th>G major</th><th>F major</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>&mdash;</td><td>C</td><td>G</td><td>F</td></tr>
    <tr><td><strong>2nd</strong></td><td>W</td><td>D</td><td>A</td><td>G</td></tr>
    <tr><td><strong>3rd</strong></td><td>W</td><td>E</td><td>B</td><td>A</td></tr>
    <tr><td><strong>4th</strong></td><td>H</td><td>F</td><td>C</td><td><strong>B♭</strong></td></tr>
    <tr><td><strong>5th</strong></td><td>W</td><td>G</td><td>D</td><td>C</td></tr>
    <tr><td><strong>6th</strong></td><td>W</td><td>A</td><td>E</td><td>D</td></tr>
    <tr><td><strong>7th</strong></td><td>W</td><td>B</td><td><strong>F♯</strong></td><td>E</td></tr>
    <tr><td><strong>8th</strong></td><td>H</td><td>C</td><td>G</td><td>F</td></tr>
  </tbody>
</table>
</div>
<h2>Tricks for remembering the scales</h2>
<p>The <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a> is the most useful tool. Each sharp-side scale has one more ♯ than the previous one (C → G → D → A → E → B → F♯ → C♯) and each flat-side scale has one more ♭ (C → F → B♭ → E♭ → A♭ → D♭ → G♭ → C♭). If you know the key signature, finding the altered notes is immediate.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a major scale on the staff?</div>
      <div class="tm-faq-a">Write the tonic on the staff and apply the pattern W-W-H-W-W-W-H going up. A whole step is 2 half steps and a half step is 1, so add a sharp or a flat to a note whenever the natural note gives the wrong distance. End on the octave of the tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know which accidentals a major scale needs?</div>
      <div class="tm-faq-a">Apply the pattern and compare it with the natural notes. If the pattern needs 2 half steps but the natural notes give only 1, add a sharp. If the natural notes give 2 but the pattern needs 1, add a flat. The result must use all 7 letter names exactly once.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">When do I use sharps and when flats in a major scale?</div>
      <div class="tm-faq-a">The scales that go up the circle of fifths (G, D, A, E, B, F♯, C♯) use sharps. The ones that go down (F, B♭, E♭, A♭, D♭, G♭, C♭) use flats. Sharps and flats are never mixed in the same major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the most common mistake when building scales?</div>
      <div class="tm-faq-a">Using the same letter name twice (for example F and F♯ in the same scale), which means the construction is wrong. A major scale has seven different letter names (C, D, E, F, G, A, B), each with the accidental it needs, and none repeated.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I check a major scale I built?</div>
      <div class="tm-faq-a">Count the half steps between each pair of consecutive notes and compare them with the pattern 2-2-1-2-2-2-1. If every interval matches, the scale is correct. You can also check that the key signature matches the key on the circle of fifths.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
