const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/c-clef-1st-line/",
  esPath: "/ejercicios/identificar-notas/clave-de-do-en-1/",
  title: "C Clef on the 1st Line: Soprano Clef Note Quiz",
  description: "Identify notes in the soprano clef, the C clef on the first line. Real staff, 10 questions, instant answers. Free, no sign-up.",
  h1: "What Note Is It? Soprano Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Here the notes are written in the <strong>C clef on the 1st line</strong>, known as the soprano clef. Name each note you see. The quiz has <strong>10 questions</strong> and shows your score at the end.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"do1"});});</script>

<p><strong>Tip:</strong> The center of the C clef marks middle C, which is the bottom line here. From the bottom, the lines are C E G B D and the spaces are D F A C. Count upward from the first line.</p>

<h2>How the soprano clef works</h2>
<p>All C clefs work in the same way: the point where the two curves meet marks <strong>middle C (C4)</strong>. In the soprano clef that is the first line, so the whole staff lies above middle C, from C4 up to D5 on the top line. Notes look like treble-clef notes shifted down a third: the bottom line is E4 in treble clef and C4 here.</p>

<h2>Where do you find the soprano clef?</h2>
<p>It was used for soprano parts in choral music from the 16th to the 18th century, and you still find it in editions that keep the original clefs. Today most soprano parts are printed in treble clef.</p>

<p>To review the theory behind this clef, see the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef on the 1st line (soprano clef)</a> guide in the dictionary. The <a href="/herramientas/metronomo/">online metronome</a> is handy for practicing sight-reading in time.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which line is middle C on in the soprano clef?</div>
      <div class="tm-faq-a">The first (bottom) line. Every other line and space is higher.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are there so many C clefs?</div>
      <div class="tm-faq-a">A C clef can be placed on any of the lines, and its position decides which range fits the staff without ledger lines. The soprano clef (1st line) suits high voices, while the tenor clef (4th line) suits the high register of low instruments.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
