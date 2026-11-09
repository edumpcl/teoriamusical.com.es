const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/all-clefs/",
  esPath: "/ejercicios/escribir-notas/todas-las-claves/",
  title: "Write Notes in All Clefs: Treble, Bass and C Clefs",
  description: "Place notes on the staff in all seven clefs, from treble and bass to the C clefs. You get a letter and click its position. Free quiz, no sign-up.",
  h1: "Write the Note: All Clefs",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Write notes","/ejercicios/escribir-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Write notes in <strong>every clef</strong>. Each question gives you a letter name and an empty staff, and the clef can change from one question to the next: treble, bass, alto, tenor, the F clef on the 3rd line and the C clefs on the 1st and 2nd lines. Click or tap the staff to place the note; <strong>any octave is accepted</strong>. There are <strong>10 questions</strong>.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{mode:"escribir",clave:"todas"});});</script>

<p><strong>Tip:</strong> Before you place anything, identify the clef and its anchor note. Then count from the anchor to the letter you need. If you are given a C in any C clef, you can place it right away: it goes where the center of the clef points.</p>

<h2>Where each clef marks a note</h2>
<p>This table gives the anchor of every clef and the range of its five lines. Use it to check yourself after a wrong answer.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>Clef</th><th>Where it marks a note</th><th>Bottom line to top line</th></tr></thead>
<tbody>
<tr><td>Treble clef</td><td>G4 on the 2nd line</td><td>E4 to F5</td></tr>
<tr><td>Bass clef</td><td>F3 on the 4th line</td><td>G2 to A3</td></tr>
<tr><td>F clef on the 3rd line</td><td>F3 on the 3rd line</td><td>B2 to C4</td></tr>
<tr><td>C clef on the 1st line (soprano)</td><td>C4 on the 1st line</td><td>C4 to D5</td></tr>
<tr><td>C clef on the 2nd line (mezzo-soprano)</td><td>C4 on the 2nd line</td><td>A3 to B4</td></tr>
<tr><td>Alto clef (C clef on the 3rd line)</td><td>C4 on the 3rd line</td><td>F3 to G4</td></tr>
<tr><td>Tenor clef (C clef on the 4th line)</td><td>C4 on the 4th line</td><td>D3 to E4</td></tr>
</tbody>
</table>
</div>

<p>Not ready for the mix? Practice one clef at a time with the <a href="/ejercicios/escribir-notas/">single-clef writing exercises</a>, or first learn to <a href="/ejercicios/identificar-notas/todas-las-claves/">name notes in all clefs</a>. Letters here follow English usage; in fixed-do countries, C is Do, D is Re, E is Mi, F is Fa, G is Sol, A is La and B is Si.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you write a note when the clef keeps changing?</div>
      <div class="tm-faq-a">Identify the clef, find its anchor note, and count from there. The anchor is G4 on the 2nd line for the treble clef, F3 on the 4th line (bass) or the 3rd line (baritone), and middle C where a C clef points.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is any octave accepted?</div>
      <div class="tm-faq-a">The exercise checks the letter name, and each letter can be placed in more than one spot on the staff. A C in the treble clef, for example, can go on the ledger line below the staff or in the third space.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I write notes with sharps or flats?</div>
      <div class="tm-faq-a">Not in this exercise. The notes are natural: C, D, E, F, G, A and B. The point is to learn the positions on the staff in every clef.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
