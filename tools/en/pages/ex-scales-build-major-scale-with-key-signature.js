const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-major-scale-with-key-signature/',
  esPath: '/ejercicios/escalas/construir-escala-mayor-con-armadura/',
  title: "Build a Major Scale with Key Signature: Exercise",
  description: "Write the key signature first, then the major scale, as in class. Interactive two-step exercise: key signature plus scale.",
  h1: "Build the Major Scale with Key Signature",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-armadura-engine'],
  body: `<p>The way it is done in class: first write the <strong>key signature</strong> of the key, then the <strong>major scale</strong>. With the key signature in place, every note inherits it and the scale is written with no added accidentals.</p>

<div id="tmesa_may"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsArmaduraEngine("tmesa_may", { titulo: "Escala mayor" });
  });
</script>

<p><strong>How to use the exercise:</strong> <strong>Step 1 (key signature):</strong> choose <em>Sharp</em> or <em>Flat</em> and click on the staff to place each accidental of the key signature in its order. <strong>Step 2 (scale):</strong> with the key signature in place, put in the notes of the scale. They <strong>inherit the key signature</strong> automatically; press ♮ / ♯ / ♭ only when a note needs an accidental of its own. <em>Undo</em> and <em>Clear</em> work in each step. The magnifier shows what you are about to place.</p>

<h2>The key signature defines the major scale</h2>
<p>Each major key has its own key signature, which shows which notes are altered throughout the piece. Once it is written, the major scale uses the seven natural note positions and each one <strong>takes the accidental of the key signature automatically</strong>: you never have to write another sharp or flat.</p>
<h2>How it is written, step by step</h2>
<p>First place the accidentals of the key signature in their standard order (sharps follow the order F-C-G-D-A-E-B; flats follow the reverse order). Then draw the eight notes, from tonic to tonic. The interval pattern of every major scale is <strong>W-W-H-W-W-W-H</strong> (UK: tone and semitone).</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Key</th><th>Key signature</th><th>Scale</th></tr></thead>
<tbody>
<tr><td><strong>G major</strong></td><td>1♯ (F♯)</td><td>G A B C D E F♯ G</td></tr>
<tr><td><strong>F major</strong></td><td>1♭ (B♭)</td><td>F G A B♭ C D E F</td></tr>
<tr><td><strong>D major</strong></td><td>2♯ (F♯ C♯)</td><td>D E F♯ G A B C♯ D</td></tr>
</tbody>
</table>
</div>

<h2>Frequently Asked Questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What is the key signature of a major scale?</div><div class="tm-faq-a">It is the set of sharps or flats written at the start of the staff, next to the clef, which affect those notes throughout the piece. Each major key has its own, following the circle of fifths.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Do I need to write accidentals on the notes?</div><div class="tm-faq-a">No. In a major scale, once the key signature is placed, all the notes inherit it and are written without added accidentals.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">In what order are sharps and flats placed?</div><div class="tm-faq-a">Sharps in the order F, C, G, D, A, E, B; flats in the reverse order: B, E, A, D, G, C, F.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why practice the key signature separately?</div><div class="tm-faq-a">Because that is how real scores are read and written: the key signature first and the notes afterwards. Knowing it well makes reading faster and avoids unnecessary accidentals.</div></div>
</div>

<p>Practice these scales with the <a href="/herramientas/metronomo/">online metronome</a> and check your tuning with the <a href="/herramientas/afinador/">online tuner</a>. You can also try the version <a href="/ejercicios/escalas/construir-escala-mayor/">with the accidentals written note by note</a>.</p>`,
});
