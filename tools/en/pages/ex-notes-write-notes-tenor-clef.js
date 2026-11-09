const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/tenor-clef/",
  esPath: "/ejercicios/escribir-notas/clave-de-do-en-4/",
  title: "Write Notes in Tenor Clef: Place the Note on the Staff",
  description: "Write notes in the tenor clef: you get a letter name and place the note on the staff in the C clef on the fourth line. 10 free questions.",
  h1: "Write the Note: Tenor Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice <strong>writing notes</strong> in the <strong>tenor clef</strong>. You get a note name, for example D, and you place the note on the staff. Click or tap the staff to place it; <strong>any octave is accepted</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"do4"});});</script>

<p><strong>Tip:</strong> A C goes on the fourth line (C4). B is the space below it, A is the third line, and D is the space above it, with E on the top line. For lower letters, keep counting down by lines and spaces.</p>

<h2>Placing notes in the tenor clef</h2>
<p>The lines hold D3, F3, A3, C4 and E4, and the spaces hold E3, G3, B3 and D4. As middle C is the fourth line, most of the notes you place will be below it. A note below the bottom line, such as C3, goes in the space under it.</p>

<p>Not there yet? Start with <a href="/ejercicios/identificar-notas/clave-de-do-en-4/">naming the notes in the tenor clef</a> or review the <a href="/diccionario-musical/claves-musicales/clave-de-do/">tenor clef</a> in the dictionary.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the tenor clef?</div>
      <div class="tm-faq-a">Start from the fourth line, which is middle C (C4). Count down or up to the letter you were asked for, click or tap that position and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is any octave accepted?</div>
      <div class="tm-faq-a">The exercise checks the letter only. A C can be written on the fourth line (C4) or in the space below the bottom line (C3), for example, and both are right.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
