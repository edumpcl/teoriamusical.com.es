const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-seventh-chords-mixed/",
  esPath: "/ejercicios/acordes/construir-septimas-mezcladas/",
  title: "Build Seventh Chords: Mixed Types and Positions",
  description: "Write dominant, half-diminished and diminished seventh chords on the staff in any position. Free final-review exercise with printable worksheets.",
  h1: "Build Seventh Chords: Mixed Types and Positions",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>The final review: you are given one note of a seventh chord, with the <strong>type and the position chosen at random</strong> from the dominant seventh, the half-diminished (leading-tone) seventh and the diminished seventh, in root position and all three inversions. You place the other three notes on the staff.</p>

<h2>The three types of seventh chord</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Type</th><th>Symbol</th><th>Structure above the root</th></tr></thead>
  <tbody>
    <tr><td><strong>Dominant seventh</strong></td><td>V7</td><td>M3 + P5 + m7</td></tr>
    <tr><td><strong>Half-diminished (leading-tone) seventh</strong></td><td>ø7</td><td>m3 + d5 + m7</td></tr>
    <tr><td><strong>Diminished seventh</strong></td><td>°7</td><td>m3 + d5 + d7</td></tr>
  </tbody>
</table>
</div>
<p>Each type has its own page where you can practice it separately before mixing them here: <a href="/ejercicios/acordes/construir-septima-de-dominante/">dominant seventh</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible/">half-diminished seventh</a> and <a href="/ejercicios/acordes/construir-septima-disminuida/">diminished seventh</a>.</p>

<h2>Exercise</h2>
<div id="tmac_sep_mix"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_sep_mix", { test: "construir", inversion: "todas" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. If a note needs an accidental, choose it first with the accidental buttons (double flat, flat, natural, sharp, double sharp). <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The magnifier shows the note you are about to place at a larger size.</p>

<p>If one of them gives you trouble, practice it on its own first. You can also <a href="/ejercicios/acordes/septimas-todas-las-posiciones/">practice recognizing them</a> instead of writing them.</p>

<h2>Printable worksheets</h2>
<p>Need more practice on paper? Generate as many <strong>worksheets</strong> as you like, each one with different chords, and print them straight from your browser.</p>
<div id="tmfs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmFichaSeptimas) tmFichaSeptimas("tmfs", {"modo":"escribir","tiposIds":["dominante","sensible","disminuida"],"invs":[0,1,2,3]});
  });
</script>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a dominant seventh chord?</div>
      <div class="tm-faq-a">A dominant seventh chord is built on the fifth degree (the dominant) of a key: a major triad with a minor seventh added on top. It contains a tritone (between the third and the seventh), which makes it sound tense and pull toward the tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a half-diminished (leading-tone) seventh chord?</div>
      <div class="tm-faq-a">The half-diminished seventh chord, also called the leading-tone seventh chord, is built on the seventh degree (the leading tone) of a major key. It is a diminished triad with a minor seventh (not a diminished one) added on top, so it is not symmetrical like the fully diminished seventh chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a diminished seventh chord?</div>
      <div class="tm-faq-a">The diminished seventh chord is built on the seventh degree of the harmonic minor scale: three minor thirds stacked on top of each other (m3 + d5 + d7 above the root). It is symmetrical, and because its notes repeat every three half steps, it is a favorite chord for modulating.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know which type of chord to draw?</div>
      <div class="tm-faq-a">The question always tells you: next to the given note you see the chord type (dominant, half-diminished or diminished) and, if the note is not the root, the inversion in parentheses.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
