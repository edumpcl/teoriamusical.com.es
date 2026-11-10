const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-harmonic-minor-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-menor-armonica-con-armadura/',
  title: "Build the Harmonic Minor Scale with Key Signature",
  description: "Write the key signature first, then the harmonic minor scale, as in class. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Harmonic Minor Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The way it is done in class: first write the <strong>key signature</strong> of the key, then the <strong>harmonic minor scale</strong>. The notes inherit the key signature, so you only mark the <strong>raised 7th</strong>, the leading tone, with a natural (or sharp), because it is not part of the key signature.</p>

<div id="tmesa_mena"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_mena", { scales: TM_CONSTRUIR_SCALES["menor-armonica"], titulo: "Escala menor armónica" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>The leading tone is not in the key signature</h2>
<p>The harmonic minor scale is the natural minor scale with the <strong>7th raised</strong> to create a leading tone. That raise <strong>is not part of the key signature</strong>: it is written as an accidental on the note. So you first place the key signature of the minor key and then raise the 7th degree with a sharp or, if the key signature already lowered it, with a natural sign.</p>
<h2>Sharp or natural, depending on the key signature</h2>
<p>In A harmonic minor the 7th degree (G) is raised with a sharp (G♯), because the key signature does not alter it. In C harmonic minor the key signature includes B♭, so to raise the 7th (B) you use a <strong>natural sign</strong> (B♮). The letter name of the note never changes.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>A harmonic minor</strong></td><td>none</td><td>A B C D E F G♯ A</td></tr>
<tr><td><strong>D harmonic minor</strong></td><td>1♭ (B♭)</td><td>D E F G A B♭ C♯ D</td></tr>
<tr><td><strong>C harmonic minor</strong></td><td>3♭ (B♭ E♭ A♭)</td><td>C D E♭ F G A♭ B♮ C</td></tr>
</tbody>
</table>
</div>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight harmonic minor scales to write with a key signature: first the key signature, then the scale, with only the accidentals that depart from it. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-armonica.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-armonica.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-armonica.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing harmonic minor scales with a key signature"></picture></a>
  <figcaption>A4 sheet for writing harmonic minor scales with a key signature.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-armonica.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-armonica-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-menores-armonica/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-menor-armonica/">writing</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">Why is the raised 7th not in the key signature?</div><div class="tm-faq-a">Because the key signature belongs to the natural minor scale. The leading tone is an accidental of the harmonic minor scale, so it is written note by note, not in the key signature.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">When do I use a natural sign for the leading tone?</div><div class="tm-faq-a">When the key signature already lowers that note. In C minor (B♭ in the key signature), raising the 7th (B) needs a natural sign: B♮.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Where is the augmented second?</div><div class="tm-faq-a">Between the 6th degree (unaltered) and the raised 7th. In A harmonic minor, between F and G♯.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Does the note name change when I raise it?</div><div class="tm-faq-a">No. It is still the 7th degree; it only goes up a half step, with a sharp or a natural sign.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-menor-armonica/">with the accidentals written note by note</a>.</p>`,
});
