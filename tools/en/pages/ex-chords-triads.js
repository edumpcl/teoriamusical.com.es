const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/triads/",
  esPath: "/ejercicios/acordes/triadas/",
  title: "Triad Exercises: Identify and Build Triads on the Staff",
  description: "Free triad exercises: identify and write major, minor, diminished and augmented triads in root position and inversions, plus a worksheet generator.",
  h1: "Triad Exercises",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  articleClass: "tm-article tm-article--wide",
  scripts: ['tm-mei','tm-notacion','fichas-acordes-engine'],
  body: `<p>Identifying triads on the staff, and writing them.</p>

<p>A <strong>triad</strong> is the most basic chord: three notes stacked in thirds. The four types are <em>major, minor, diminished and augmented</em>. Each one looks different depending on the position it appears in.</p>

<style>
.tm-ruta { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 16px 0 24px; }
.tm-ruta a { display: block; background: #fff; border: 1px solid #e8e0cc; border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; transition: border-color .2s, box-shadow .2s; }
.tm-ruta a:hover { border-color: #8b6914; box-shadow: 0 4px 10px rgba(0,0,0,.06); }
.tm-ruta a > div:first-child { font-size: 1.8rem; margin-bottom: 8px; }
.tm-ruta h3 { margin: 0 0 6px; font-size: 1.05rem; color: #1a1a2e; }
.tm-ruta p { margin: 0; color: #666; font-size: .88rem; }
@media (max-width: 600px) { .tm-ruta { grid-template-columns: 1fr; } }
</style>

<h2>Learning path: identify</h2>
<div class="tm-ruta">

    <a href="/ejercicios/acordes/triadas-en-fundamental/">
      <div>①</div>
      <h3>Root position</h3>
      <p>The triad in its natural position: the root in the bass.</p>
    </a>

    <a href="/ejercicios/acordes/triadas-en-primera-inversion/">
      <div>②</div>
      <h3>First inversion</h3>
      <p>The third of the chord moves to the bass.</p>
    </a>

    <a href="/ejercicios/acordes/triadas-en-segunda-inversion/">
      <div>③</div>
      <h3>Second inversion</h3>
      <p>The fifth of the chord moves to the bass.</p>
    </a>

    <a href="/ejercicios/acordes/triadas-todas-las-posiciones/">
      <div>🏆</div>
      <h3>Final challenge</h3>
      <p>All three positions mixed. The top level.</p>
    </a>

</div>

<h2>Build</h2>
<div class="tm-ruta">

    <a href="/ejercicios/acordes/construir-triadas/">
      <div>①</div>
      <h3>Build: root position</h3>
      <p>Given the bass and the type, write the third and the fifth on the staff.</p>
    </a>

    <a href="/ejercicios/acordes/construir-triadas-primera-inversion/">
      <div>②</div>
      <h3>Build: first inversion</h3>
      <p>The third is in the bass. Write the fifth and the root on the staff.</p>
    </a>

    <a href="/ejercicios/acordes/construir-triadas-segunda-inversion/">
      <div>③</div>
      <h3>Build: second inversion</h3>
      <p>The fifth is in the bass. Write the root and the third on the staff.</p>
    </a>

    <a href="/ejercicios/acordes/construir-triadas-todas-posiciones/">
      <div>🏆</div>
      <h3>Build: final challenge</h3>
      <p>All three positions mixed. Triads in any inversion.</p>
    </a>

</div>

<h2 id="generator">Chord worksheet generator</h2>
<p>Besides the quizzes, you can create <strong>new worksheets for paper</strong> here. You choose the triad types, the positions, whether the student has to analyze or write the chord, the clef, the difficulty and how many chords, and a different sheet comes out every time, with its <strong>answer key</strong>, ready to print. The chords are drawn with the same rules as the PDF worksheets of each quiz, so they never run out: every student can take home a different sheet.</p>
<p>Each sheet has its own number. Under the buttons there is a link that brings back exactly the same sheet, which is handy for reprinting it or for giving the same one to the whole class.</p>
<div id="tmfa"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFichasAcordes) tmFichasAcordes('tmfa'); });
</script>

<p>If you practice these chords on an instrument, the <a href="/herramientas/metronomo/">online metronome</a> helps you build speed gradually, starting slowly (50-60 BPM).</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a triad in music?</div>
      <div class="tm-faq-a">A triad is the most basic chord: three notes stacked in thirds. The four types are the major triad (major 3rd + perfect 5th), the minor triad (minor 3rd + perfect 5th), the diminished triad (minor 3rd + diminished 5th) and the augmented triad (major 3rd + augmented 5th).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of triad are there?</div>
      <div class="tm-faq-a">Four: major (bright and stable), minor (more intimate or sad), diminished (tense and unstable) and augmented (ambiguous, unresolved). In tonal harmony, every degree of the scale has one of these four types assigned to it.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the inversion of a chord?</div>
      <div class="tm-faq-a">An inversion puts a note other than the root in the bass. Root position: the root is in the bass. First inversion: the third is in the bass. Second inversion: the fifth is in the bass. Inversions change the harmonic color without changing the notes of the chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a major and a minor chord?</div>
      <div class="tm-faq-a">They differ only in the third: the major chord has a major third (4 half steps) and the minor chord a minor third (3 half steps). Both share the perfect fifth (7 half steps). Example: C–E–G is C major; C–E♭–G is C minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a triad on the staff?</div>
      <div class="tm-faq-a">Write the root on any line or space. Add a third by counting two staff positions up (skipping the line or space in between). Then add another third the same way to get the fifth. The accidentals decide whether each third is major or minor.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
