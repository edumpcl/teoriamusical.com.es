const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/build-dominant-seventh-chord-all-positions/",
  esPath: "/ejercicios/acordes/construir-septima-de-dominante-todas-las-posiciones/",
  title: "Build Dominant 7th Chords: All Positions",
  description: "Practice writing dominant seventh chords on the staff in root position and all three inversions. Free exercise with printable worksheets.",
  h1: "Build Dominant Seventh Chords: All Positions",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>You are given one note of a dominant seventh chord (chosen at random) and place the other three on the staff, in whichever position the question asks for: root position or any of the three inversions. The chord is dominant seventh: <strong>M3 + P5 + m7</strong> above the root. The question shows which note of the chord you are given, and which ones you have to add depend on the inversion that comes up.</p>

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
<div id="tmac_dom_tds"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_dom_tds", { test: "construir", tipo: "dominante", inversion: "todas" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. If a note needs an accidental, choose it first with the accidental buttons (double flat, flat, natural, sharp, double sharp). <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The magnifier shows the note you are about to place at a larger size.</p>

<p>In every inversion the chord still contains the same four notes. If you get stuck, find the interval of a second (or its inversion, a seventh) among the notes: the <strong>root is the upper note of that second</strong> when the chord is written in close position.</p>

<p>Other positions of the dominant seventh chord: <a href="/ejercicios/acordes/construir-septima-de-dominante/">root position</a>, <a href="/ejercicios/acordes/construir-septima-de-dominante-primera-inversion/">first inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-dominante-segunda-inversion/">second inversion</a>, <a href="/ejercicios/acordes/construir-septima-de-dominante-tercera-inversion/">third inversion</a>. You can also <a href="/ejercicios/acordes/septimas-todas-las-posiciones/">practice recognizing them</a> (together with <a href="/ejercicios/acordes/construir-septima-de-sensible-todas-las-posiciones/">Half-diminished (leading-tone) seventh</a> and <a href="/ejercicios/acordes/construir-septima-disminuida-todas-las-posiciones/">Diminished seventh</a> chords in the same position) or review the theory on the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a> page.</p>

<!-- ficha-septimas -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>21 chords</strong> of the dominant seventh, with the lowest note given, on one side of A4. The student writes the other three. With a separate <strong>answer sheet</strong>.</p>
<figure class="tm-staff">
  <a href="/assets/img/acordes/fichas-septimas/ficha-escribir-septimas-dominante.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/acordes/fichas-septimas/preview-ficha-escribir-septimas-dominante.webp"><img src="/assets/img/acordes/fichas-septimas/preview-ficha-escribir-septimas-dominante.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to write dominant seventh chords"></picture></a>
  <figcaption>A4 sheet with 21 chords.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/acordes/fichas-septimas/ficha-escribir-septimas-dominante.pdf" target="_blank" rel="noopener">Download the worksheet (PDF, A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/acordes/fichas-septimas/ficha-escribir-septimas-dominante-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy it freely for the classroom.</p>
<!-- /ficha-septimas -->

<h2>More worksheets</h2>
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
      <div class="tm-faq-q">How is the dominant seventh chord labeled in each position?</div>
      <div class="tm-faq-a">In root position it is labeled <strong>7</strong>. The inversions use figured bass: <strong>6/5</strong> (first inversion), <strong>4/3</strong> (second inversion) and <strong>4/2</strong> (third inversion). The numbers are the intervals counted from the bass note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which note is given and which ones do I have to draw?</div>
      <div class="tm-faq-a">One note of the chord is given on the staff, together with the chord type and the position. You draw the other three. Which note is given changes from question to question.</div>
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
