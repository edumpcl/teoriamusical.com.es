const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/alto-clef/",
  esPath: "/ejercicios/identificar-notas/clave-de-do-en-3/",
  title: "Alto Clef Note Reading Quiz: Name the Note",
  description: "Practice the alto clef, the C clef on the third line used by the viola. Name each note on a real staff in a free 10-question quiz.",
  h1: "What Note Is It? Alto Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Learn to read the <strong>alto clef</strong>, the C clef on the 3rd line and the standard clef of the viola. A note appears and you name it. The quiz has <strong>10 questions</strong> and gives you a score at the end.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"do3"});});</script>

<p><strong>Tip:</strong> Middle C is the middle line, and every other note is counted from it. From the bottom, the lines are F A C E G and the spaces are G B D F. If you play the viola, this should feel familiar.</p>

<h2>How the alto clef works</h2>
<p>In the alto clef the two curves meet on the middle line, which makes it <strong>middle C (C4)</strong>. The staff is centered on middle C, with two lines below and two above, so it is symmetrical: from F3 on the bottom line to G4 on the top line. That is why it suits the middle register of the viola so well.</p>

<h2>Who reads the alto clef?</h2>
<p>The viola uses it as its main clef and switches to treble clef for very high passages. The alto trombone also reads it, and alto voices used it in older choral scores.</p>

<p>To review the theory behind this clef, see the <a href="/diccionario-musical/claves-musicales/clave-de-do/">alto clef</a> guide in the dictionary. The <a href="/herramientas/metronomo/">online metronome</a> is handy for practicing sight-reading in time.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instrument uses the alto clef?</div>
      <div class="tm-faq-a">The viola. Viola parts are written in alto clef, with treble clef for high passages. The alto trombone also reads alto clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which notes are on the lines of the alto clef?</div>
      <div class="tm-faq-a">F3, A3, C4, E4 and G4 from bottom to top. The spaces are G3, B3, D4 and F4.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
