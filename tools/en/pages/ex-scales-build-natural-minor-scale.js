const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-natural-minor-scale/',
  esPath: '/ejercicios/escalas/construir-escala-menor-natural/',
  title: "Build Natural Minor Scales on the Staff: Exercise",
  description: "Build the 15 natural minor scales on the staff, degree by degree. Free interactive exercise: place the 8 notes with the pattern W-H-W-W-H-W-W.",
  h1: "Build the Natural Minor Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>natural minor scale</strong> appears. Your task is to draw its <strong>8 notes</strong> on the staff. The natural minor scale (the Aeolian mode) is the "pure" minor scale, with no raised leading tone: it is what you get by playing the notes of its relative major starting from the 6th degree.</p>

<div id="tmec_menn"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_menn", { scales: TM_CONSTRUIR_SCALES["menor-natural"], titulo: "la Escala Menor Natural" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the natural minor scale</h2>
<p>The pattern is <strong>W – H – W – W – H – W – W</strong> (whole step, half step, whole step, whole step, half step, whole step, whole step; UK: tone and semitone). The half step between the 2nd and the 3rd degree gives the scale its minor 3rd and its character, in contrast to the major 3rd of the major scale.</p>
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
    <tr><td><strong>7th</strong></td><td>W</td><td>G</td><td>D</td><td>C</td></tr>
    <tr><td><strong>8th</strong></td><td>W</td><td>A</td><td>E</td><td>D</td></tr>
  </tbody>
</table>
</div>
<h2>The natural minor and its relative major</h2>
<p>Each natural minor scale shares its key signature with a major scale: they are <strong>relative</strong> keys. The minor tonic is a minor third below the major tonic (or the 6th degree of the major scale). That is why <strong>A minor</strong> uses only the white keys, just like C major, but with A as the tonal center.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight natural minor scales to write without a key signature, with each accidental before its note. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-escalas-menor-natural.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-escalas-menor-natural.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-escalas-menor-natural.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing natural minor scales"></picture></a>
  <figcaption>A4 sheet for writing natural minor scales.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-escalas-menor-natural.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-escalas-menor-natural-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-menores-natural/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-menor-natural-con-armadura/">writing with a key signature</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the natural minor scale?</div>
      <div class="tm-faq-a">It is the minor scale that uses the key signature of its relative major, with no accidentals added. It is also called the Aeolian mode. Its pattern is W-H-W-W-H-W-W. It has a minor 3rd, a minor 6th and a minor 7th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it related to the major scale?</div>
      <div class="tm-faq-a">Every natural minor scale is the relative of a major scale: they share the same key signature. The minor scale starts on the 6th degree of its relative major. A minor and C major, for example, use the same notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it called "natural"?</div>
      <div class="tm-faq-a">Because it does not raise the 7th degree, as the harmonic and melodic minor scales do. It keeps the degrees given by the key signature of the minor key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the natural minor scale have a leading tone?</div>
      <div class="tm-faq-a">Not in the strict sense. Its 7th degree is a whole step below the tonic (a subtonic), not a half step. To get a true leading tone you have to raise the 7th degree, which gives the harmonic minor scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I build it step by step?</div>
      <div class="tm-faq-a">Place the tonic and apply the pattern W-H-W-W-H-W-W going up, using the accidentals of the matching minor key signature. Each of the 7 letter names appears exactly once.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
