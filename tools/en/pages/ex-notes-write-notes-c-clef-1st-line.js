const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/c-clef-1st-line/",
  esPath: "/ejercicios/escribir-notas/clave-de-do-en-1/",
  title: "Write Notes in Soprano Clef (C Clef on 1st Line)",
  description: "Write notes in the soprano clef: you get a note name and place it on the staff in the C clef on the first line. 10 free questions.",
  h1: "Write the Note: Soprano Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice <strong>writing notes</strong> in the <strong>C clef on the 1st line</strong>, the soprano clef. You are given a letter, such as B, and you place that note on the staff. Click or tap to place it; <strong>any octave counts</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"do1"});});</script>

<p><strong>Tip:</strong> Middle C is the bottom line. A C goes there, D is the first space, E is the second line, and so on, each step one letter higher. A lower B goes in the space under the first line, and a lower A on the ledger line below that.</p>

<h2>Placing notes in the soprano clef</h2>
<p>The staff holds C4, E4, G4, B4 and D5 on its lines, and D4, F4, A4 and C5 in its spaces. Because the clef sits on the bottom line, there is only room above middle C; for notes below it, the quiz uses the space under the first line and a ledger line.</p>

<p>If this feels hard, first practice <a href="/ejercicios/identificar-notas/clave-de-do-en-1/">reading notes in the C clef on the 1st line (soprano clef)</a>, and check the dictionary entry for the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef on the 1st line (soprano clef)</a>.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the soprano clef?</div>
      <div class="tm-faq-a">The middle of the clef points to the first line, which is middle C (C4). Count up from there until you reach the letter you were given, click or tap that position and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the octave matter?</div>
      <div class="tm-faq-a">No. The exercise checks the letter only. A C, for example, can be placed on the first line (C4) or in the fourth space (C5).</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
