const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/bass-clef/",
  esPath: "/ejercicios/identificar-notas/clave-de-fa-en-4/",
  title: "Bass Clef Notes Quiz: Name the Note on the Staff",
  description: "Practice reading the bass clef: a note appears on the staff and you name it. Free 10-question quiz with real notation and instant answers.",
  h1: "What Note Is It? Bass Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Practice reading the <strong>bass clef</strong>, the clef of low instruments and of the left hand of the piano. A note appears on the staff and you pick its name. Each quiz has <strong>10 questions</strong>, and your score appears at the end.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"fa4"});});</script>

<p><strong>Tip:</strong> The two dots of the bass clef surround the fourth line, which is F3. Start from that line. From the bottom, the lines are G B D F A (Good Boys Do Fine Always) and the spaces are A C E G (All Cows Eat Grass).</p>

<h2>How the bass clef works</h2>
<p>The bass clef is the <strong>F clef</strong>: its two dots sit on either side of the fourth line and fix it as F3, the F below middle C. The bottom line is G2 and the top line is A3. Middle C (C4) is written on the first ledger line above the staff, which is the same pitch as the first ledger line below the treble staff.</p>

<h2>Who reads the bass clef?</h2>
<p>Cello, double bass, bassoon, trombone, euphonium and tuba parts are written in bass clef, and so is the left hand of the piano. The double bass sounds an octave lower than written. Low male voices also read it.</p>

<p>To review the theory behind this clef, see the <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a> guide in the dictionary. The <a href="/herramientas/metronomo/">online metronome</a> is handy for practicing sight-reading in time.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which notes are on the lines of the bass clef?</div>
      <div class="tm-faq-a">From the bottom up, the five lines are G2, B2, D3, F3 and A3. The four spaces are A2, C3, E3 and G3.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the bass clef different from the treble clef?</div>
      <div class="tm-faq-a">The bass clef puts F3 on the fourth line, while the treble clef puts G4 on the second line. The same position on the staff is therefore a different note in each clef: the bottom line is G2 in bass clef and E4 in treble clef.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
