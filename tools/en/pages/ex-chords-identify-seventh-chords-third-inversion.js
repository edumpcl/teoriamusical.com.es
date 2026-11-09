const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/identify-seventh-chords-third-inversion/",
  esPath: "/ejercicios/acordes/septimas-en-tercera-inversion/",
  title: "Identify Seventh Chords in Third Inversion: Quiz",
  description: "Look at a seventh chord in third inversion on the staff and name it: dominant, half-diminished or diminished. Free interactive quiz.",
  h1: "Identify Seventh Chords in Third inversion",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>A <strong>seventh chord</strong> is drawn on the staff, in third inversion. Your task is to identify its type: <strong>dominant seventh</strong>, <strong>half-diminished</strong> (leading-tone) seventh or <strong>diminished seventh</strong>.</p>

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

<h2>How to recognize the third inversion</h2>
<p>In third inversion the seventh is in the bass and the chord is labeled 4/2. The interval of a second sits between the two lowest notes, and the root is the upper note of that second.</p>

<h2>Exercise</h2>
<div id="tmac_r_3a"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_r_3a", { inversion: "3a" });
  });
</script>

<p><strong>How to use the exercise:</strong> Choose one of the three possible types and press Check. The app corrects your answer right away and, if you miss, shows the correct one.</p>

<p>Other positions: <a href="/ejercicios/acordes/septimas-en-fundamental/">Root position</a>, <a href="/ejercicios/acordes/septimas-en-primera-inversion/">First inversion</a>, <a href="/ejercicios/acordes/septimas-en-segunda-inversion/">Second inversion</a>, <a href="/ejercicios/acordes/septimas-todas-las-posiciones/">All positions</a>. To practice writing them instead of recognizing them, try <a href="/ejercicios/acordes/construir-septima-de-dominante-tercera-inversion/">building seventh chords</a>. For the full theory, see the pages on the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh</a>, the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">half-diminished seventh</a> and the <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh</a>.</p>

<h2>Printable worksheets</h2>
<p>Need more practice on paper? Generate as many <strong>worksheets</strong> as you like, each one with different chords, and print them straight from your browser.</p>
<div id="tmfs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmFichaSeptimas) tmFichaSeptimas("tmfs", {"modo":"analizar","tiposIds":["dominante","sensible","disminuida"],"invs":[3]});
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
      <div class="tm-faq-q">How do I recognize a dominant seventh chord?</div>
      <div class="tm-faq-a">It is built on the fifth degree (the dominant) of a key: a major triad with a minor seventh added. It contains the tritone between its third and its seventh, which makes it sound tense and ready to resolve to the tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I recognize a half-diminished seventh chord?</div>
      <div class="tm-faq-a">It is built on the seventh degree (the leading tone) of a major key: a diminished triad with a minor seventh added. Because the seventh is minor, not diminished, it is not symmetrical like the diminished seventh chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I recognize a diminished seventh chord?</div>
      <div class="tm-faq-a">It is built on the seventh degree of the harmonic minor scale: three minor thirds stacked (m3 + d5 + d7). It is symmetrical, and its notes repeat every three half steps (UK: semitones), which makes it a favorite chord for modulating.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do I have to identify in this exercise?</div>
      <div class="tm-faq-a">The type of chord (dominant, half-diminished or diminished). The position is fixed: always third inversion.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
