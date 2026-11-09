const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-harmonic-minor-scale/',
  esPath: '/ejercicios/escalas/construir-escala-menor-armonica/',
  title: "Build Harmonic Minor Scales on the Staff: Exercise",
  description: "Build harmonic minor scales on the staff: the natural minor with a raised 7th and its augmented second. Free interactive exercise.",
  h1: "Build the Harmonic Minor Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>harmonic minor scale</strong> appears. Your task is to draw its <strong>8 notes</strong> on the staff. It is the natural minor scale with the <strong>7th raised</strong> by a half step to create a true leading tone; that raise produces an <strong>augmented second</strong> between the 6th and the 7th degree.</p>

<div id="tmec_mena"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_mena", { scales: TM_CONSTRUIR_SCALES["menor-armonica"], titulo: "la Escala Menor Armónica" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the harmonic minor scale</h2>
<p>The pattern is <strong>W – H – W – W – H – A2 – H</strong> (UK: tone and semitone; A2 = augmented second). The raised leading tone leaves a distance of three half steps (an augmented second) between the unaltered 6th degree and the raised 7th: the unmistakable sound of this scale.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Step</th><th>A minor</th><th>E minor</th><th>D minor</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>&mdash;</td><td>A</td><td>E</td><td>D</td></tr>
    <tr><td><strong>2nd</strong></td><td>W</td><td>B</td><td>F♯</td><td>E</td></tr>
    <tr><td><strong>3rd</strong></td><td>H</td><td>C</td><td>G</td><td>F</td></tr>
    <tr><td><strong>4th</strong></td><td>W</td><td>D</td><td>A</td><td>G</td></tr>
    <tr><td><strong>5th</strong></td><td>W</td><td>E</td><td>B</td><td>A</td></tr>
    <tr><td><strong>6th</strong></td><td>H</td><td>F</td><td>C</td><td>B♭</td></tr>
    <tr><td><strong>7th</strong></td><td>A2</td><td>G♯</td><td>D♯</td><td>C♯</td></tr>
    <tr><td><strong>8th</strong></td><td>H</td><td>A</td><td>E</td><td>D</td></tr>
  </tbody>
</table>
</div>
<h2>The raised leading tone and the augmented second</h2>
<p>Compared with the natural minor, the harmonic minor raises only the 7th degree. That note is written with a <strong>sharp or a natural sign</strong> (depending on the key signature) without changing its letter name. Because the 6th stays where it is, the augmented second appears between the two, as in the harmonic major scale but with a minor 3rd.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the harmonic minor scale?</div>
      <div class="tm-faq-a">It is the natural minor scale with the 7th degree raised by a half step to obtain a leading tone. Its pattern is W-H-W-W-H-A2-H. The raise creates an augmented second between the 6th and the 7th degree.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the 7th raised?</div>
      <div class="tm-faq-a">To get a true leading tone, a half step below the tonic, which strengthens the cadence into it. The natural minor does not have one, so its harmonic resolution is weaker.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is the augmented second?</div>
      <div class="tm-faq-a">Between the 6th degree (unaltered) and the 7th degree (raised). In A harmonic minor it is the leap from F to G♯: three half steps written between two notes with neighboring letter names.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I write the raised 7th?</div>
      <div class="tm-faq-a">With a sharp if the key signature does not alter the note, or with a natural sign if the key signature had it flat. The letter name never changes: it is still the 7th degree, only raised.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the melodic minor scale?</div>
      <div class="tm-faq-a">The harmonic minor raises only the 7th and keeps the augmented second. The melodic minor also raises the 6th, to remove that augmented second and smooth the ascent.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
