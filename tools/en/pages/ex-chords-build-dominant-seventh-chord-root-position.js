const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-dominant-seventh-chord-root-position/",
  esPath: "/ejercicios/acordes/construir-septima-de-dominante/",
  title: "Build Dominant 7th Chords in Root Position",
  description: "Write a dominant seventh chord in root position: you get one note and add the other three on the staff. Free exercise with printable worksheets.",
  h1: "Build Dominant Seventh Chords in Root Position",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>You are given the root of a <strong>dominant seventh chord</strong> (M3 + P5 + m7 above the root), in root position. Your task is to place the other three notes of the chord on the staff: the third, fifth and seventh.</p>

<h2>Structure of the dominant seventh chord</h2>
<p>A dominant seventh chord is built on the fifth degree (the dominant) of a key: a major triad with a minor seventh added on top. It contains a tritone (between the third and the seventh), which makes it sound tense and pull toward the tonic.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Position</th><th>Symbol / figured bass</th><th>Intervals above the bass</th></tr></thead>
  <tbody>
    <tr><td><strong>Root position</strong></td><td>7</td><td>M3 + P5 + m7</td></tr>
    <tr><td><strong>First inversion</strong></td><td>6/5</td><td>m3 + d5 + m6</td></tr>
    <tr><td><strong>Second inversion</strong></td><td>4/3</td><td>m3 + P4 + M6</td></tr>
    <tr><td><strong>Third inversion</strong></td><td>4/2</td><td>M2 + A4 + M6</td></tr>
  </tbody>
</table>
</div>

<h2>Exercise</h2>
<div id="tmac_dom_fundamental"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_dom_fundamental", { test: "construir", tipo: "dominante", inversion: "fundamental" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. If a note needs an accidental, choose it first with the accidental buttons (double flat, flat, natural, sharp, double sharp). <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The magnifier shows the note you are about to place at a larger size.</p>

<p>In every inversion the chord still contains the same four notes. If you get stuck, find the interval of a second (or its inversion, a seventh) among the notes: the <strong>root is the upper note of that second</strong> when the chord is written in close position.</p>

<p>Other positions of the dominant seventh chord: <a href="/ejercicios/acordes/construir-septima-de-dominante-primera-inversion/">first inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-dominante-segunda-inversion/">second inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-dominante-tercera-inversion/">third inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-dominante-todas-las-posiciones/">all positions mixed</a>. You can also <a href="/ejercicios/acordes/septimas-en-fundamental/">practice recognizing them</a> (together with <a href="/ejercicios/acordes/construir-septima-de-sensible/">Half-diminished (leading-tone) seventh</a> and <a href="/ejercicios/acordes/construir-septima-disminuida/">Diminished seventh</a> chords in the same position) or review the theory on the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a> page.</p>

<h2>Printable worksheets</h2>
<p>Need more practice on paper? Generate as many <strong>worksheets</strong> as you like, each one with different chords, and print them straight from your browser.</p>
<div id="tmfs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmFichaSeptimas) tmFichaSeptimas("tmfs", {"modo":"escribir","tiposIds":["dominante"],"invs":[0,1,2,3]});
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
      <div class="tm-faq-q">How is the dominant seventh chord labeled in root position?</div>
      <div class="tm-faq-a">The chord symbol is <strong>7</strong>, and the intervals above the bass are M3 + P5 + m7.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which note is given and which ones do I have to draw?</div>
      <div class="tm-faq-a">The root is given on the staff. You draw the other three: the third, fifth and seventh.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is a double accidental sometimes needed?</div>
      <div class="tm-faq-a">Depending on the starting note, one of the chord notes may need a double sharp or a double flat to keep the correct letter name (for example, a dominant seventh chord on A♯ contains C𝄪). This appears mostly on the hard level.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
