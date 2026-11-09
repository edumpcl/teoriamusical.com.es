const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/f-clef-3rd-line/",
  esPath: "/ejercicios/escribir-notas/clave-de-fa-en-3/",
  title: "Write Notes in the F Clef on the 3rd Line: Exercise",
  description: "Write notes in the baritone clef (F clef on the 3rd line): you get a note name and place it on the staff. 10 free questions.",
  h1: "Write the Note: F Clef on the 3rd Line",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice <strong>writing notes</strong> in the <strong>F clef on the 3rd line</strong> (the baritone clef). A letter name appears, for example G, and you place that note on the staff. Click or tap to place it; <strong>any octave is valid</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"fa3"});});</script>

<p><strong>Tip:</strong> Count from the middle line, F3. G is the space above it and A is the next line up. E is the space below it and D is the line below that. The top line is C4, middle C, so a C there is always a good first guess.</p>

<h2>Placing notes in the F clef on the 3rd line</h2>
<p>Each line of the staff is the note a third above the line beneath it: B2, D3, F3, A3 and C4. The spaces between are C3, E3, G3 and B3. Find the nearest line and step by one position to reach the space.</p>

<p>Not there yet? Start with <a href="/ejercicios/identificar-notas/clave-de-fa-en-3/">naming the notes in the F clef on the 3rd line</a> or review the <a href="/diccionario-musical/claves-musicales/clave-de-fa/">F clef on the 3rd line</a> in the dictionary.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the F clef on the 3rd line?</div>
      <div class="tm-faq-a">Start from F3 on the middle line, between the dots of the clef. Count up or down to the letter you were given, click or tap that spot and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why can a note be written in any octave?</div>
      <div class="tm-faq-a">The exercise checks the letter name only. A C, for example, fits on the top line (C4) or in the first space (C3). Both are right.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
