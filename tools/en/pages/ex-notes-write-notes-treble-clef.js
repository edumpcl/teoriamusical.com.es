const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/treble-clef/",
  esPath: "/ejercicios/escribir-notas/clave-de-sol/",
  title: "Write Notes in Treble Clef: Interactive Exercise",
  description: "Practice writing notes in the treble clef: you get a note name and place it on the staff. 10 free questions with instant checking.",
  h1: "Write the Note: Treble Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice <strong>writing notes</strong> in the <strong>treble clef</strong>. You are given a letter name, such as E, and you place that note on the staff. Click or tap the staff to put it in the right place; <strong>any octave is accepted</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"sol2"});});</script>

<p><strong>Tip:</strong> Find the G first: it is the line the clef curls around (the second line). The space below it is F and the space above it is A. Then move up or down by steps until you reach the letter you were given.</p>

<h2>Placing notes in the treble clef</h2>
<p>The notes in this exercise run from middle C, on a ledger line below the staff, up to the A on the first ledger line above it. To write a note, work out its distance from G4: one step up is A, one step down is F. Remember that the letters repeat every seven steps, so each letter has more than one possible position.</p>

<p>Not there yet? Start with <a href="/ejercicios/identificar-notas/clave-de-sol/">naming the notes in the treble clef</a> or review the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> in the dictionary.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the treble clef?</div>
      <div class="tm-faq-a">Start from G4 on the second line, then count lines and spaces up or down until you reach the letter you were asked for. Click or tap that position on the staff and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is any octave accepted?</div>
      <div class="tm-faq-a">The exercise checks the letter name, and a letter appears in several places on the staff. For example, a C can go on the ledger line below the staff (C4) or in the third space (C5). Both answers are correct.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
