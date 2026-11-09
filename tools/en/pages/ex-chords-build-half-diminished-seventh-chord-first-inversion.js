const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-half-diminished-seventh-chord-first-inversion/",
  esPath: "/ejercicios/acordes/construir-septima-de-sensible-primera-inversion/",
  title: "Build Half-Diminished 7th Chords in First Inversion",
  description: "Write a half-diminished 7th chord in first inversion: you get one note and add the other three on the staff. Free exercise with printable worksheets.",
  h1: "Build Half-Diminished Seventh Chords in First Inversion",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>You are given the third (in the bass) of a <strong>half-diminished (leading-tone) seventh chord</strong> (m3 + d5 + m7 above the root), in first inversion. Your task is to place the other three notes of the chord on the staff: the fifth, seventh and root.</p>

<h2>Structure of the half-diminished (leading-tone) seventh chord</h2>
<p>The half-diminished seventh chord, also called the leading-tone seventh chord, is built on the seventh degree (the leading tone) of a major key. It is a diminished triad with a minor seventh (not a diminished one) added on top, so it is not symmetrical like the fully diminished seventh chord.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Position</th><th>Symbol / figured bass</th><th>Intervals above the bass</th></tr></thead>
  <tbody>
    <tr><td><strong>Root position</strong></td><td>ø7</td><td>m3 + d5 + m7</td></tr>
    <tr><td><strong>First inversion</strong></td><td>6/5</td><td>m3 + P5 + M6</td></tr>
    <tr><td><strong>Second inversion</strong></td><td>4/3</td><td>M3 + A4 + M6</td></tr>
    <tr><td><strong>Third inversion</strong></td><td>4/2</td><td>M2 + P4 + m6</td></tr>
  </tbody>
</table>
</div>

<h2>Exercise</h2>
<div id="tmac_sen_1a"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_sen_1a", { test: "construir", tipo: "sensible", inversion: "1a" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. If a note needs an accidental, choose it first with the accidental buttons (double flat, flat, natural, sharp, double sharp). <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The magnifier shows the note you are about to place at a larger size.</p>

<p>In every inversion the chord still contains the same four notes. If you get stuck, find the interval of a second (or its inversion, a seventh) among the notes: the <strong>root is the upper note of that second</strong> when the chord is written in close position.</p>

<p>Other positions of the half-diminished (leading-tone) seventh chord: <a href="/ejercicios/acordes/construir-septima-de-sensible/">root position</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible-segunda-inversion/">second inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible-tercera-inversion/">third inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible-todas-las-posiciones/">all positions mixed</a>. You can also <a href="/ejercicios/acordes/septimas-en-primera-inversion/">practice recognizing them</a> (together with <a href="/ejercicios/acordes/construir-septima-de-dominante-primera-inversion/">Dominant seventh</a> and <a href="/ejercicios/acordes/construir-septima-disminuida-primera-inversion/">Diminished seventh</a> chords in the same position) or review the theory on the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">half-diminished (leading-tone) seventh chord</a> page.</p>

<h2>Printable worksheets</h2>
<p>Need more practice on paper? Generate as many <strong>worksheets</strong> as you like, each one with different chords, and print them straight from your browser.</p>
<div id="tmfs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmFichaSeptimas) tmFichaSeptimas("tmfs", {"modo":"escribir","tiposIds":["sensible"],"invs":[0,1,2,3]});
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
      <div class="tm-faq-q">What is a half-diminished (leading-tone) seventh chord?</div>
      <div class="tm-faq-a">The half-diminished seventh chord, also called the leading-tone seventh chord, is built on the seventh degree (the leading tone) of a major key. It is a diminished triad with a minor seventh (not a diminished one) added on top, so it is not symmetrical like the fully diminished seventh chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the half-diminished (leading-tone) seventh chord labeled in first inversion?</div>
      <div class="tm-faq-a">It is labeled <strong>6/5</strong>, with the intervals m3 + P5 + M6 counted from the bass note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which note is given and which ones do I have to draw?</div>
      <div class="tm-faq-a">The third is given on the staff (in the bass). You draw the other three: the fifth, seventh and root.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is a double accidental sometimes needed?</div>
      <div class="tm-faq-a">Depending on the starting note, one of the chord notes may need a double sharp or a double flat to keep the correct letter name (for example, a half-diminished seventh chord on D♭ contains A𝄫). This appears mostly on the hard level.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
