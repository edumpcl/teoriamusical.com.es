const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/f-clef-3rd-line/",
  esPath: "/ejercicios/identificar-notas/clave-de-fa-en-3/",
  title: "F Clef on the 3rd Line: Note Reading Quiz",
  description: "Name the notes in the F clef on the third line, the baritone clef. Real staff, 10 questions, instant feedback, free and without sign-up.",
  h1: "What Note Is It? F Clef on the 3rd Line",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>This quiz uses the <strong>F clef on the 3rd line</strong>, often called the baritone clef. You see a note on the staff and choose its name. Because the clef is rare, it is a good test of reading by position instead of by habit. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"fa3"});});</script>

<p><strong>Tip:</strong> This is the same F clef as in the bass clef, but placed on the middle line instead of the fourth. The middle line is F3. From the bottom, the lines are B D F A C and the spaces are C E G B.</p>

<h2>How the F clef on the 3rd line works</h2>
<p>The two dots of the clef surround the middle line, which is <strong>F3</strong>. Compared with the bass clef, every position is a third higher: the bottom line is B2 here instead of G2. The staff runs from B2 on the bottom line to C4, which is middle C, on the top line.</p>

<h2>Where do you find this clef?</h2>
<p>It is rare today. It turns up mostly in older editions, especially of vocal music for the baritone voice, and in some historical parts. Most players will never need it, but knowing how the F clef moves from line to line makes it easy to read.</p>

<p>Need a refresher? Read about the <a href="/diccionario-musical/claves-musicales/clave-de-fa/">F clef on the 3rd line</a> in the music dictionary, and keep your sense of beat sharp with the <a href="/herramientas/metronomo/">online metronome</a>.</p>
<p>More note reading: <a href="/ejercicios/identificar-notas/">identify notes in all clefs →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is middle C in the F clef on the 3rd line?</div>
      <div class="tm-faq-a">On the fifth (top) line of the staff. A ledger line is not needed to write it.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the baritone clef the same as the bass clef?</div>
      <div class="tm-faq-a">Both are F clefs, so both fix F3. The difference is the line: the bass clef puts F3 on the fourth line and the baritone clef puts it on the third. That is why everything sits a third higher here.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
