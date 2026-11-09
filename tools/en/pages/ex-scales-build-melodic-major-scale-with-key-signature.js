const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-melodic-major-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-mayor-mixta-secundaria-con-armadura/',
  title: "Build the Melodic Major Scale with Key Signature",
  description: "Write the major key signature, then build the melodic major scale. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Melodic Major Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The <strong>melodic major scale</strong> (in Spanish-language theory, the <em>escala mayor mixta secundaria</em>) uses the <strong>key signature of the major scale</strong> on its tonic. First write that key signature, then the scale, marking with accidentals the degrees borrowed from the minor.</p>

<div id="tmesa_mxs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_mxs", { scales: TM_CONSTRUIR_SCALES["mixta-secundaria"], titulo: "Escala mayor mixta secundaria" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>The melodic major scale lowers the 6th and the 7th</h2>
<p>The melodic major scale is written with the <strong>key signature of the major scale</strong> on its tonic, with the <strong>6th and 7th degrees lowered</strong> by a half step, both borrowed from the minor. These lowered degrees are not in the key signature: they are written as accidentals.</p>
<h2>Two lowered degrees</h2>
<p>In C melodic major, with no key signature, the 6th (A♭) and the 7th (B♭) are lowered. In G melodic major, with the key signature of G major (F♯), the 6th is lowered to E♭ and the 7th (F♯) to F♮. The result sounds like the Mixolydian scale with its 6th also lowered.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>C melodic major</strong></td><td>none</td><td>C D E F G A♭ B♭ C</td></tr>
<tr><td><strong>G melodic major</strong></td><td>1♯ (F♯)</td><td>G A B C D E♭ F♮ G</td></tr>
<tr><td><strong>F melodic major</strong></td><td>1♭ (B♭)</td><td>F G A B♭ C D♭ E♭ F</td></tr>
</tbody>
</table>
</div>

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What key signature does the melodic major scale use?</div><div class="tm-faq-a">The key signature of the major scale on its tonic.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which degrees are lowered?</div><div class="tm-faq-a">The 6th and the 7th, both borrowed from the minor. They are written as accidentals (flat or natural), not in the key signature.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is it different from the harmonic major scale?</div><div class="tm-faq-a">The harmonic major scale lowers only the 6th; the melodic major scale lowers the 6th and the 7th.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Does it resemble any mode?</div><div class="tm-faq-a">With the 7th lowered it resembles the Mixolydian mode; lowering the 6th as well makes its character darker.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-mayor-mixta-secundaria/">with the accidentals written note by note</a>.</p>`,
});
