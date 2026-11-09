const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/c-clef-2nd-line/",
  esPath: "/ejercicios/escribir-notas/clave-de-do-en-2/",
  title: "Write Notes in Mezzo-Soprano Clef (C Clef, 2nd Line)",
  description: "Write notes in the mezzo-soprano clef: you are given a letter and place the note on the staff in the C clef on the second line.",
  h1: "Write the Note: Mezzo-Soprano Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice <strong>writing notes</strong> in the <strong>C clef on the 2nd line</strong>, the mezzo-soprano clef. A letter name is given, for example F, and you place it on the staff. Click or tap where it belongs; <strong>any octave is accepted</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"do2"});});</script>

<p><strong>Tip:</strong> Put the C on the second line, then move step by step. D is the space above, E is the third line, and B is the first space.</p>

<h2>Placing notes in the mezzo-soprano clef</h2>
<p>The lines hold A3, C4, E4, G4 and B4, and the spaces hold B3, D4, F4 and A4. Since middle C is on the second line, you have one line below it and three above. Practice moving from line to line in thirds: C, E, G, B.</p>

<p>Not there yet? Start with <a href="/ejercicios/identificar-notas/clave-de-do-en-2/">naming the notes in the C clef on the 2nd line (mezzo-soprano clef)</a> or review the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef on the 2nd line (mezzo-soprano clef)</a> in the dictionary.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the mezzo-soprano clef?</div>
      <div class="tm-faq-a">Find the second line, where the clef marks middle C (C4). Then count up or down to the letter you were given, click or tap that position and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is any octave valid?</div>
      <div class="tm-faq-a">The exercise checks the letter name. A C can be written on the second line (C4) or in the space above the top line (C5), for example, and both are accepted.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
