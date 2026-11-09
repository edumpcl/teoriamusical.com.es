const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-melodic-major-scale/',
  esPath: '/ejercicios/escalas/construir-escala-mayor-mixta-secundaria/',
  title: "Build Melodic Major Scales on the Staff: Exercise",
  description: "Build melodic major scales on the staff: the major scale with a lowered 6th and 7th. Free interactive exercise, 8 notes per scale.",
  h1: "Build the Melodic Major Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>melodic major scale</strong> appears (in Spanish-language theory, the <em>escala mayor mixta secundaria</em>). Your task is to draw its <strong>8 notes</strong> on the staff. It is the major scale with the <strong>6th and 7th lowered</strong> (♭6 and ♭7): a major scale "softened" by its two lowered upper degrees.</p>

<div id="tmec_mixs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_mixs", { scales: TM_CONSTRUIR_SCALES["mixta-secundaria"], titulo: "la Escala Mayor Mixta Secundaria" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the melodic major scale</h2>
<p>The pattern is <strong>W – W – H – W – H – W – W</strong> (UK: tone and semitone). Because the 6th and the 7th are lowered together, there is no augmented second (unlike the harmonic major scale): the scale moves by whole steps and half steps.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Step</th><th>C major</th><th>G major</th><th>F major</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>&mdash;</td><td>C</td><td>G</td><td>F</td></tr>
    <tr><td><strong>2nd</strong></td><td>W</td><td>D</td><td>A</td><td>G</td></tr>
    <tr><td><strong>3rd</strong></td><td>W</td><td>E</td><td>B</td><td>A</td></tr>
    <tr><td><strong>4th</strong></td><td>H</td><td>F</td><td>C</td><td>B♭</td></tr>
    <tr><td><strong>5th</strong></td><td>W</td><td>G</td><td>D</td><td>C</td></tr>
    <tr><td><strong>6th</strong></td><td>H</td><td>A♭</td><td>E♭</td><td>D♭</td></tr>
    <tr><td><strong>7th</strong></td><td>W</td><td>B♭</td><td>F</td><td>E♭</td></tr>
    <tr><td><strong>8th</strong></td><td>W</td><td>C</td><td>G</td><td>F</td></tr>
  </tbody>
</table>
</div>
<h2>Two lowered degrees, no augmented second</h2>
<p>The melodic major scale keeps the major 3rd but lowers the 6th and the 7th. It is a major scale whose upper tetrachord (the top four notes) has the minor form. It has the same notes as the Mixolydian scale with a lowered 6th, and it differs from the harmonic major scale exactly in having no augmented second.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start. The <a href="/diccionario-musical/tonalidades/">dictionary of keys and scales</a> has the full theory.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the melodic major scale?</div>
      <div class="tm-faq-a">It is a variant of the major scale in which the 6th and the 7th are lowered by a half step (♭6 and ♭7). Its pattern is W-W-H-W-H-W-W. It keeps the major 3rd but softens the two upper degrees.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the harmonic major scale?</div>
      <div class="tm-faq-a">The harmonic major scale lowers only the 6th and has an augmented second. The melodic major scale also lowers the 7th, which removes that augmented second and leaves a scale made of whole steps and half steps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does it have no augmented second?</div>
      <div class="tm-faq-a">Because lowering the 7th too brings the distance between the 6th and the 7th degree back to a whole step. The augmented second of the harmonic major scale disappears.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it related to the Mixolydian mode?</div>
      <div class="tm-faq-a">The Mixolydian scale lowers only the 7th; the melodic major scale lowers the 6th and the 7th. It is a Mixolydian scale with its 6th lowered too.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I build it step by step?</div>
      <div class="tm-faq-a">Start from the major scale on the tonic and lower the 6th and the 7th degrees by a half step, keeping the letter name of each note. The rest stays as in the major scale.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
