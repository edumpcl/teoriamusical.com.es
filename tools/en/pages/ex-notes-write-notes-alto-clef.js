const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/alto-clef/",
  esPath: "/ejercicios/escribir-notas/clave-de-do-en-3/",
  title: "Write Notes in Alto Clef: Interactive Staff Exercise",
  description: "Write notes in the alto clef, the viola's clef: you get a note name and place it on the staff. 10 free questions, checked instantly.",
  h1: "Write the Note: Alto Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice <strong>writing notes</strong> in the <strong>alto clef</strong>. You are told a note name, such as A, and you place it on the staff. Click or tap in the right spot; <strong>any octave is accepted</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"do3"});});</script>

<p><strong>Tip:</strong> A C always goes on the middle line (C4). One step above it is D (the space), then E (the fourth line). One step below is B (the space), then A (the second line).</p>

<h2>Placing notes in the alto clef</h2>
<p>The middle line is C4, and the other lines are a third apart: F3, A3, C4, E4 and G4. Because the clef is symmetrical, the notes above and below the middle line mirror each other. Start from the middle line and count outward.</p>

<p>If this feels hard, first practice <a href="/ejercicios/identificar-notas/clave-de-do-en-3/">reading notes in the alto clef</a>, and check the dictionary entry for the <a href="/diccionario-musical/claves-musicales/clave-de-do/">alto clef</a>.</p>
<p>More practice: <a href="/ejercicios/escribir-notas/">write notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you place a note in the alto clef?</div>
      <div class="tm-faq-a">Start from the middle line, which is middle C (C4). Count up or down to the letter you were given, click or tap the position and press Check.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does any octave count as correct?</div>
      <div class="tm-faq-a">Only the letter name is checked. A C can go on the middle line (C4) or above the staff (C5), for example, and both answers are accepted.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
