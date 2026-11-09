const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-mixolydian-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-mixolidia-con-armadura/',
  title: "Build the Mixolydian Scale with Key Signature",
  description: "Write the major key signature, then build the Mixolydian scale with its lowered 7th. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Mixolydian Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The <strong>Mixolydian scale</strong> uses the <strong>key signature of the major scale</strong> on its tonic. First write that key signature, then the scale: because it is a major scale with a <strong>lowered 7th</strong>, that 7th gets a natural (or flat) sign that lowers it against the key signature.</p>

<div id="tmesa_mix"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_mix", { scales: TM_CONSTRUIR_SCALES["mixolidia"], titulo: "Escala mixolidia" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>A major mode with a minor 7th</h2>
<p>The Mixolydian scale is written with the <strong>key signature of the major scale</strong> on its tonic, but with the <strong>7th degree lowered</strong> by a half step. That lowering is not in the key signature: it is written as an accidental (a natural or a flat) on the affected note.</p>
<h2>The lowered 7th as an accidental</h2>
<p>In G Mixolydian the key signature is the one of G major (F♯), but the 7th degree is lowered to F♮: it is written with a natural sign. In C Mixolydian, with no key signature, the 7th (B) is lowered to B♭. This is the color of the Mixolydian mode, common in blues, rock and folk music.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>G Mixolydian</strong></td><td>1♯ (F♯)</td><td>G A B C D E F♮ G</td></tr>
<tr><td><strong>C Mixolydian</strong></td><td>none</td><td>C D E F G A B♭ C</td></tr>
<tr><td><strong>D Mixolydian</strong></td><td>2♯ (F♯ C♯)</td><td>D E F♯ G A B C♮ D</td></tr>
</tbody>
</table>
</div>

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What key signature does the Mixolydian scale use?</div><div class="tm-faq-a">The one of the major scale on its tonic. G Mixolydian uses the key signature of G major (one sharp).</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I write the lowered 7th?</div><div class="tm-faq-a">As an accidental on the note: a natural sign if the key signature raised it (G Mixolydian: F♮) or a flat if the key signature did not alter it (C Mixolydian: B♭).</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is it different from the major scale?</div><div class="tm-faq-a">Only in the 7th degree: Mixolydian lowers it by a half step. The rest is identical to the major scale.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Where is the Mixolydian scale used?</div><div class="tm-faq-a">It is common in blues, rock, funk and many folk traditions, because of its minor 7th.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-mixolidia/">with the accidentals written note by note</a>.</p>`,
});
