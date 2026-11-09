const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/treble-clef/",
  esPath: "/ejercicios/identificar-notas/clave-de-sol/",
  title: "Treble Clef Notes Quiz: What Note Is It?",
  description: "Free treble clef note reading quiz: a note appears on a real staff and you name it. 10 questions, instant feedback, no sign-up.",
  h1: "What Note Is It? Treble Clef",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Test your <strong>note reading</strong> in the <strong>treble clef</strong>, the clef you will meet most often in written music. A single note appears on the staff and you choose its letter name. There are <strong>10 questions</strong>, and you see your score at the end.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"sol2"});});</script>

<p><strong>Tip:</strong> Anchor yourself on the G. The curl of the treble clef wraps around the second line, which is G4. Count up or down from there, one line or space at a time. From the bottom, the lines are E G B D F (Every Good Boy Does Fine) and the spaces are F A C E (they spell FACE).</p>

<h2>How the treble clef works</h2>
<p>The treble clef is also called the <strong>G clef</strong> because its spiral circles the second line of the staff and marks it as G4, the G above middle C. Every other note follows from that one. The bottom line is E4 and the top line is F5. Middle C (C4) sits on a ledger line just below the staff, so counting ledger lines is part of the skill.</p>

<h2>Who reads the treble clef?</h2>
<p>Violin, flute, oboe, clarinet, saxophone and trumpet parts are written in treble clef, and so is the right hand of the piano. Guitar music uses it too, written an octave higher than it sounds. Horn parts are usually in treble clef as well.</p>

<p>Need a refresher? Read about the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> in the music dictionary, and keep your sense of beat sharp with the <a href="/herramientas/metronomo/">online metronome</a>.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which notes are on the lines of the treble clef?</div>
      <div class="tm-faq-a">From the bottom up, the five lines are E4, G4, B4, D5 and F5. The four spaces are F4, A4, C5 and E5.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the treble clef called the G clef?</div>
      <div class="tm-faq-a">The symbol is a decorated letter G. Its spiral curls around the second line of the staff and fixes G4 on that line.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
