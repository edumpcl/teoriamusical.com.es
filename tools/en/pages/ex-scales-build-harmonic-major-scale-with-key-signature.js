const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-harmonic-major-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-mayor-mixta-principal-con-armadura/',
  title: "Build the Harmonic Major Scale with Key Signature",
  description: "Write the major key signature, then build the harmonic major scale. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Harmonic Major Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The <strong>harmonic major scale</strong> (in Spanish-language theory, the <em>escala mayor mixta principal</em>) uses the <strong>key signature of the major scale</strong> on its tonic. First write that key signature, then the scale, marking with accidentals the degree borrowed from the minor.</p>

<div id="tmesa_mxp"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_mxp", { scales: TM_CONSTRUIR_SCALES["mixta-principal"], titulo: "Escala mayor mixta principal" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>The harmonic major scale lowers the 6th</h2>
<p>The harmonic major scale is written with the <strong>key signature of the major scale</strong> on its tonic, with the <strong>6th degree lowered</strong> by a half step, a degree borrowed from the minor. The lowered 6th is not in the key signature: it is written as an accidental on the note.</p>
<h2>The lowered 6th as an accidental</h2>
<p>In C harmonic major, with no key signature, the 6th degree (A) is lowered to A♭. In G harmonic major, with the key signature of G major (F♯), the 6th (E) is lowered to E♭. An augmented second appears between the lowered 6th and the 7th, the sound that marks this scale.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>C harmonic major</strong></td><td>none</td><td>C D E F G A♭ B C</td></tr>
<tr><td><strong>G harmonic major</strong></td><td>1♯ (F♯)</td><td>G A B C D E♭ F♯ G</td></tr>
<tr><td><strong>F harmonic major</strong></td><td>1♭ (B♭)</td><td>F G A B♭ C D♭ E F</td></tr>
</tbody>
</table>
</div>

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What key signature does the harmonic major scale use?</div><div class="tm-faq-a">The key signature of the major scale on its tonic.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which degree is lowered?</div><div class="tm-faq-a">Only the 6th, borrowed from the minor scale. It is written as an accidental (flat or natural) on the note, not in the key signature.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why is there an augmented second?</div><div class="tm-faq-a">Between the lowered 6th and the unaltered 7th there are three half steps: an augmented second.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is it different from the melodic major scale?</div><div class="tm-faq-a">The harmonic major scale lowers only the 6th; the melodic major scale lowers the 6th and the 7th.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-mayor-mixta-principal/">with the accidentals written note by note</a>.</p>`,
});
