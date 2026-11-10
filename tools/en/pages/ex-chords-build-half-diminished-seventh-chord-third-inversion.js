const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-half-diminished-seventh-chord-third-inversion/",
  esPath: "/ejercicios/acordes/construir-septima-de-sensible-tercera-inversion/",
  title: "Build Half-Diminished 7th Chords in Third Inversion",
  description: "Write a half-diminished 7th chord in third inversion: you get one note and add the other three on the staff. Free exercise with printable worksheets.",
  h1: "Build Half-Diminished Seventh Chords in Third Inversion",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>You are given the seventh (in the bass) of a <strong>half-diminished (leading-tone) seventh chord</strong> (m3 + d5 + m7 above the root), in third inversion. Your task is to place the other three notes of the chord on the staff: the root, third and fifth.</p>

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
<div id="tmac_sen_3a"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_sen_3a", { test: "construir", tipo: "sensible", inversion: "3a" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. If a note needs an accidental, choose it first with the accidental buttons (double flat, flat, natural, sharp, double sharp). <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The magnifier shows the note you are about to place at a larger size.</p>

<p>In every inversion the chord still contains the same four notes. If you get stuck, find the interval of a second (or its inversion, a seventh) among the notes: the <strong>root is the upper note of that second</strong> when the chord is written in close position.</p>

<p>Other positions of the half-diminished (leading-tone) seventh chord: <a href="/ejercicios/acordes/construir-septima-de-sensible/">root position</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible-primera-inversion/">first inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible-segunda-inversion/">second inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-sensible-todas-las-posiciones/">all positions mixed</a>. You can also <a href="/ejercicios/acordes/septimas-en-tercera-inversion/">practice recognizing them</a> (together with <a href="/ejercicios/acordes/construir-septima-de-dominante-tercera-inversion/">Dominant seventh</a> and <a href="/ejercicios/acordes/construir-septima-disminuida-tercera-inversion/">Diminished seventh</a> chords in the same position) or review the theory on the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">half-diminished (leading-tone) seventh chord</a> page.</p>

<!-- ficha-septimas -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>21 chords</strong> of the leading-tone seventh, with the lowest note given, on one side of A4. The student writes the other three. With a separate <strong>answer sheet</strong>.</p>
<figure class="tm-staff">
  <a href="/assets/img/acordes/fichas-septimas/ficha-escribir-septimas-sensible.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/acordes/fichas-septimas/preview-ficha-escribir-septimas-sensible.webp"><img src="/assets/img/acordes/fichas-septimas/preview-ficha-escribir-septimas-sensible.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to write leading-tone seventh chords"></picture></a>
  <figcaption>A4 sheet with 21 chords.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/acordes/fichas-septimas/ficha-escribir-septimas-sensible.pdf" target="_blank" rel="noopener">Download the worksheet (PDF, A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/acordes/fichas-septimas/ficha-escribir-septimas-sensible-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy it freely for the classroom.</p>
<!-- /ficha-septimas -->

<h2>More worksheets</h2>
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
      <div class="tm-faq-q">How is the half-diminished (leading-tone) seventh chord labeled in third inversion?</div>
      <div class="tm-faq-a">It is labeled <strong>4/2</strong>, with the intervals M2 + P4 + m6 counted from the bass note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which note is given and which ones do I have to draw?</div>
      <div class="tm-faq-a">The seventh is given on the staff (in the bass). You draw the other three: the root, third and fifth.</div>
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
