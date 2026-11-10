const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-dorian-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-menor-dorica-con-armadura/',
  title: "Build the Dorian Scale with Key Signature: Exercise",
  description: "Write the minor key signature, then build the Dorian scale with its raised 6th. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Dorian Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The <strong>Dorian scale</strong> uses the <strong>key signature of the minor scale</strong> on its tonic. First write that key signature, then the scale: because it is a minor scale with a <strong>raised 6th</strong>, that 6th gets a natural (or sharp) sign that raises it against the key signature.</p>

<div id="tmesa_dor"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_dor", { scales: TM_CONSTRUIR_SCALES["menor-dorica"], titulo: "Escala dórica" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>A minor mode with a major 6th</h2>
<p>The Dorian scale is written with the <strong>key signature of the minor scale</strong> on its tonic, but with the <strong>6th degree raised</strong> by a half step. That raise is not in the key signature: it is written as an accidental (a natural or a sharp) on the affected note.</p>
<h2>The raised 6th as an accidental</h2>
<p>In D Dorian the key signature is the one of D minor (B♭), but the 6th degree is raised to B♮: it is written with a natural sign. In A Dorian, with no key signature, the 6th (F) is raised to F♯. This is the color of the Dorian mode, common in folk, modal jazz and Celtic music.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>D Dorian</strong></td><td>1♭ (B♭)</td><td>D E F G A B♮ C D</td></tr>
<tr><td><strong>A Dorian</strong></td><td>none</td><td>A B C D E F♯ G A</td></tr>
<tr><td><strong>G Dorian</strong></td><td>2♭ (B♭ E♭)</td><td>G A B♭ C D E♮ F G</td></tr>
</tbody>
</table>
</div>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight Dorian scales to write with a key signature: first the key signature, then the scale, with only the accidentals that depart from it. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-dorica.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-dorica.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-dorica.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing Dorian scales with a key signature"></picture></a>
  <figcaption>A4 sheet for writing Dorian scales with a key signature.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-dorica.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-dorica-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-menores-dorica/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-menor-dorica/">writing</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What key signature does the Dorian scale use?</div><div class="tm-faq-a">The one of the minor scale on its tonic. D Dorian uses the key signature of D minor (one flat).</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I write the raised 6th?</div><div class="tm-faq-a">As an accidental on the note: a natural sign if the key signature lowered it (D Dorian: B♮) or a sharp if the key signature did not alter it (A Dorian: F♯).</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is it different from the natural minor scale?</div><div class="tm-faq-a">Only in the 6th degree: Dorian raises it by a half step. The rest matches the natural minor scale.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Where is the Dorian scale used?</div><div class="tm-faq-a">In folk, Celtic music, modal jazz and a lot of early repertoire, because of its major 6th over a minor mode.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-menor-dorica/">with the accidentals written note by note</a>.</p>`,
});
