const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/c-clef-2nd-line/",
  esPath: "/ejercicios/identificar-notas/clave-de-do-en-2/",
  title: "C Clef on the 2nd Line: Mezzo-Soprano Clef Quiz",
  description: "Name notes in the mezzo-soprano clef, the C clef on the second line. Real notation, 10 questions, instant feedback. Free, no sign-up.",
  h1: "What Note Is It? Mezzo-Soprano Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>This exercise uses the <strong>C clef on the 2nd line</strong>, or mezzo-soprano clef. You see a note, you name it, and after <strong>10 questions</strong> you get your score. It is one of the least common clefs, so it rewards reading by position.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"do2"});});</script>

<p><strong>Tip:</strong> Middle C is on the second line. From the bottom, the lines are A C E G B and the spaces are B D F A. A useful comparison: each position is a fifth lower than in the treble clef.</p>

<h2>How the mezzo-soprano clef works</h2>
<p>The curves of the C clef meet on the second line, so that line is <strong>middle C (C4)</strong>. One line lies below it (A3) and three lie above it (E4, G4 and B4). The staff runs from A3 on the bottom line to B4 on the top line.</p>

<h2>Where do you find the mezzo-soprano clef?</h2>
<p>You find it mostly in older vocal scores and in editions that keep the original clefs. It is rare today, so reading it is mainly useful for studying scores and for theory courses that cover all the clefs.</p>

<p>Need a refresher? Read about the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef on the 2nd line (mezzo-soprano clef)</a> in the music dictionary, and keep your sense of beat sharp with the <a href="/herramientas/metronomo/">online metronome</a>.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many lines are below middle C in the mezzo-soprano clef?</div>
      <div class="tm-faq-a">One. Middle C sits on the second line, so only the bottom line (A3) is lower.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the mezzo-soprano clef related to the treble clef?</div>
      <div class="tm-faq-a">Each position on the staff is a fifth lower than in the treble clef. For example, the bottom line is E4 in treble clef and A3 here.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
