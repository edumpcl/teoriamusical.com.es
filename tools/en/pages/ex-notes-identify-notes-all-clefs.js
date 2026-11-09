const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/all-clefs/",
  esPath: "/ejercicios/identificar-notas/todas-las-claves/",
  title: "All Clefs Note Reading Quiz: Treble, Bass and C Clefs",
  description: "Name notes in seven different clefs: treble, bass, alto, tenor and the rarer C and F clefs. Free 10-question quiz on real notation.",
  h1: "What Note Is It? All Clefs",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"],["Identify notes","/ejercicios/identificar-notas/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>This quiz mixes <strong>all seven clefs</strong>: treble, bass, alto, tenor, the F clef on the 3rd line and the C clefs on the 1st and 2nd lines. Each question can use a different clef, so you must check which one it is before you read the note. There are <strong>10 questions</strong>, and your score appears at the end.</p>

<div id="tmnotas"></div>
<script>document.addEventListener("DOMContentLoaded",function(){tmNotasEngine("tmnotas",{clave:"todas"});});</script>

<p><strong>Tip:</strong> Look at the clef first, then find its anchor note. The treble clef marks G4 on the 2nd line, the bass clef marks F3 on the 4th line, and the F clef on the 3rd line marks F3 on the middle line. Every C clef marks middle C (C4) where its center points: the 1st line (soprano), the 2nd line (mezzo-soprano), the 3rd line (alto) or the 4th line (tenor).</p>

<h2>The seven clefs at a glance</h2>
<p>Each clef shifts the five lines of the staff to a different range, so music fits on the staff without too many ledger lines. Treble and bass cover most of today's music. The others serve the viola, the high register of low instruments, and older vocal music.</p>
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

<h2>How to read a mixed set</h2>
<p>When the clef changes from one question to the next, resist reading by habit. First name the anchor note, then count from it. Seeing a clef as a rule ("the center of this C clef is on the fourth line") works better than trying to remember each staff by sight. If one clef keeps tripping you up, practice it alone with the exercises in the <a href="/ejercicios/identificar-notas/">list of clefs</a>.</p>

<p>To review the theory, see the <a href="/diccionario-musical/claves-musicales/">musical clefs</a> page in the dictionary. A letter in this quiz is a note name as used in English-speaking countries; in fixed-do countries, C is Do, D is Re, E is Mi, F is Fa, G is Sol, A is La and B is Si.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are there seven clefs?</div>
      <div class="tm-faq-a">Each clef moves the staff to a different range. The treble and bass clefs cover most music today. The C and F clefs on other lines exist for voices and instruments in between, and for older music.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which clefs should I learn first?</div>
      <div class="tm-faq-a">Treble and bass first. After that, learn the alto clef if you play viola, and the tenor clef if you play cello, bassoon or trombone. The soprano, mezzo-soprano and baritone clefs are rare and mostly appear in older editions.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I have to name the octave?</div>
      <div class="tm-faq-a">No. You only name the letter. The octave comes from the position and the clef, and you learn it with practice.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
