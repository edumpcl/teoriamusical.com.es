const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/tenor-clef/",
  esPath: "/ejercicios/identificar-notas/clave-de-do-en-4/",
  title: "Tenor Clef Note Reading Quiz: Name the Note",
  description: "Quiz on reading the tenor clef, the C clef on the fourth line. Name the notes on a real staff; 10 questions, instant answers, free.",
  h1: "What Note Is It? Tenor Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>The <strong>tenor clef</strong> is a C clef on the 4th line. Cellists, bassoonists and trombonists use it for high passages. A note appears and you choose its name. You answer <strong>10 questions</strong> and see your score at the end.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"do4"});});</script>

<p><strong>Tip:</strong> Middle C is on the fourth line, so most of the staff lies below it. From the bottom, the lines are D F A C E and the spaces are E G B D. Count down from the fourth line to find the lower notes.</p>

<h2>How the tenor clef works</h2>
<p>The tenor clef puts <strong>middle C (C4)</strong> on the fourth line, which leaves three lines below and one above. The staff runs from D3 on the bottom line to E4 on the top line. It lets music in the tenor range be written on the staff instead of on many ledger lines.</p>

<h2>Who reads the tenor clef?</h2>
<p>Cello, bassoon, euphonium and trombone parts switch to tenor clef when the music climbs high enough that bass clef would need many ledger lines. For still higher notes, the part moves on to treble clef. Tenor voices used it in older choral scores.</p>

<p>Need a refresher? Read about the <a href="/diccionario-musical/claves-musicales/clave-de-do/">tenor clef</a> in the music dictionary, and keep your sense of beat sharp with the <a href="/herramientas/metronomo/">online metronome</a>.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do cellists read the tenor clef?</div>
      <div class="tm-faq-a">To avoid ledger lines. When a cello part rises above the bass clef staff, it switches to tenor clef. For the very highest notes, it switches again to treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is middle C in the tenor clef?</div>
      <div class="tm-faq-a">On the fourth line of the staff. The line below it is A3 and the line above it is E4.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
