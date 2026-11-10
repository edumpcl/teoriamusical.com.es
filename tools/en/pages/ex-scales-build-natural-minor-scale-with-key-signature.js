const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-natural-minor-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-menor-natural-con-armadura/',
  title: "Build the Natural Minor Scale with Key Signature",
  description: "Write the key signature first, then the natural minor scale, as in class. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Natural Minor Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The way it is done in class: first write the <strong>key signature</strong> of the minor key, then the <strong>natural minor scale</strong>. With the key signature in place, every note inherits it; the natural minor scale adds no accidentals of its own.</p>

<div id="tmesa_mnat"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_mnat", { scales: TM_CONSTRUIR_SCALES["menor-natural"], titulo: "Escala menor natural" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>The natural minor uses the key signature of its relative</h2>
<p>Each natural minor scale shares its key signature with its <strong>relative major</strong> (the major key whose tonic is a minor third above). For example, A minor has no accidentals (like C major) and E minor has one sharp (like G major). Once the key signature is written, the scale is built with the natural note positions, which inherit it.</p>
<h2>No accidentals of its own</h2>
<p>Unlike the harmonic or melodic minor, the natural minor scale <strong>does not raise any degree</strong>: its pattern is W-H-W-W-H-W-W (UK: tone and semitone) and all its notes are defined by the key signature. You do not add any sharp or natural sign.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>A minor</strong></td><td>none</td><td>A B C D E F G A</td></tr>
<tr><td><strong>E minor</strong></td><td>1♯ (F♯)</td><td>E F♯ G A B C D E</td></tr>
<tr><td><strong>D minor</strong></td><td>1♭ (B♭)</td><td>D E F G A B♭ C D</td></tr>
</tbody>
</table>
</div>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight natural minor scales to write with a key signature: first the key signature, then the scale, with only the accidentals that depart from it. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-natural.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-natural.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-natural.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing natural minor scales with a key signature"></picture></a>
  <figcaption>A4 sheet for writing natural minor scales with a key signature.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-natural.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-natural-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-menores-natural/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-menor-natural/">writing</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What key signature does a natural minor scale have?</div><div class="tm-faq-a">The same as its relative major: A minor has no accidentals, E minor has 1 sharp, D minor has 1 flat, and so on.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Do I write any accidentals on the notes?</div><div class="tm-faq-a">No. The natural minor scale inherits its whole key signature and raises no degree, so it is written with no added accidentals.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the difference from the harmonic and melodic minor scales?</div><div class="tm-faq-a">The natural minor does not alter any degree; the harmonic minor raises the 7th, and the melodic minor raises the 6th and the 7th when ascending. Those raised degrees are not in the key signature; they are written as accidentals.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I find the relative major?</div><div class="tm-faq-a">Go up a minor third (three half steps) from the minor tonic: the relative of A minor is C major; the relative of E minor is G major.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-menor-natural/">with the accidentals written note by note</a>.</p>`,
});
