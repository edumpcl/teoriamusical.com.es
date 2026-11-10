const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-melodic-minor-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-menor-melodica-con-armadura/',
  title: "Build the Melodic Minor Scale with Key Signature",
  description: "Write the key signature, then the melodic minor scale up and down, as in class. Interactive two-step exercise with 15 notes.",
  h1: "Build the Melodic Minor Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The way it is done in class: first write the <strong>key signature</strong>, then the <strong>melodic minor scale</strong>, up and down (15 notes). <strong>Ascending</strong>, the 6th and 7th are raised (with a sharp or a natural, depending on the key signature) and <strong>descending</strong> those accidentals are undone.</p>

<div id="tmesa_mmel"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_mmel", { scales: TM_CONSTRUIR_SCALES["menor-melodica"], titulo: "Escala menor melódica" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>Up and down over the key signature</h2>
<p>The melodic minor scale starts from the key signature of the natural minor. <strong>Ascending</strong> it raises the 6th and 7th (with a sharp or a natural, depending on the key signature) and <strong>descending</strong> it undoes those raises, returning to natural minor. It is one form of 15 notes that changes direction.</p>
<h2>The cancelling naturals</h2>
<p>Everything is written within a single measure (UK: bar), so when a note raised on the way up goes back to its natural state on the way down, you have to <strong>cancel the accidental</strong> with the matching natural (or flat) sign. In A melodic minor you go up with F♯ and G♯ and come down with G♮ and F♮.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>A melodic minor</strong></td><td>none</td><td>↑ A B C D E F♯ G♯ A · ↓ A G♮ F♮ E D C B A</td></tr>
<tr><td><strong>D melodic minor</strong></td><td>1♭ (B♭)</td><td>↑ D E F G A B♮ C♯ D · ↓ D C♮ B♭ A G F E D</td></tr>
</tbody>
</table>
</div>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight melodic minor scales to write with a key signature: first the key signature, then the scale, with only the accidentals that depart from it. With a separate <strong>answer sheet</strong>, with the answers in red. The melodic minor is written in full, ascending and descending.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-melodica.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-melodica.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-con-armadura-escalas-menor-melodica.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing melodic minor scales with a key signature"></picture></a>
  <figcaption>A4 sheet for writing melodic minor scales with a key signature.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-melodica.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-con-armadura-escalas-menor-melodica-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-menores-melodica/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-menor-melodica/">writing</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">Why are there naturals on the way down?</div><div class="tm-faq-a">Because accidentals last through the measure. On the way down, the raised notes return to their natural pitch, and that is shown with a natural (or flat) sign that cancels the earlier accidental.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Are the raised 6th and 7th in the key signature?</div><div class="tm-faq-a">No. The key signature is the one of the natural minor; the raises of the melodic minor are written as accidentals on the notes.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there 15 notes?</div><div class="tm-faq-a">Because the melodic minor is one form that goes up (8 notes) and comes down (7 more), sharing the top note.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is it different from the harmonic minor scale?</div><div class="tm-faq-a">The harmonic minor raises only the 7th and keeps the augmented second; the melodic minor raises the 6th and the 7th going up to smooth the ascent, and cancels them going down.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-menor-melodica/">with the accidentals written note by note</a>.</p>`,
});
