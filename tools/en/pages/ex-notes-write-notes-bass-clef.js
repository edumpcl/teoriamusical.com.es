const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/bass-clef/",
  esPath: "/ejercicios/escribir-notas/clave-de-fa-en-4/",
  title: "Write Notes in Bass Clef: Place the Note on the Staff",
  description: "Write notes in the bass clef: you receive a note name and click its position on the staff. 10 free questions, checked instantly.",
  h1: "Write the Note: Bass Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Learn to <strong>write notes</strong> in the <strong>bass clef</strong>. We give you a note name, such as D, and you put it on the staff. Click or tap where it belongs; <strong>any octave counts as correct</strong>. Each exercise has <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"fa4"});});</script>

<p><strong>Tip:</strong> The clef marks F3 on the fourth line. For a given F, go to that line. For the other letters, step up or down: G is the space above it, A is the top line, and E is the space below it.</p>

<h2>Placing notes in the bass clef</h2>
<p>The staff in this exercise runs from E2, below the bottom line, up to C4, the ledger line above the staff. Use F3 as your anchor and count in steps. The notes under the bottom line (G2) need care: F2 is the space just below it, and E2 hangs from a ledger line.</p>

<p>If this feels hard, first practice <a href="/ejercicios/identificar-notas/clave-de-fa-en-4/">reading notes in the bass clef</a>, and check the dictionary entry for the <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the bass clef?</div>
      <div class="tm-faq-a">Start from F3 on the fourth line, between the two dots of the clef. Count lines and spaces up or down to the letter you were given, click or tap that position and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does any octave work?</div>
      <div class="tm-faq-a">Because the exercise checks the letter only. A C, for example, can be written in the second space (C3) or on the first ledger line above the staff (C4), and either one is accepted.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
