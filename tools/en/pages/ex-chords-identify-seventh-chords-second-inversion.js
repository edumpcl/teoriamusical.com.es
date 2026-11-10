const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/identify-seventh-chords-second-inversion/",
  esPath: "/ejercicios/acordes/septimas-en-segunda-inversion/",
  title: "Identify Seventh Chords in Second Inversion: Quiz",
  description: "Look at a seventh chord in second inversion on the staff and name it: dominant, half-diminished or diminished. Free interactive quiz.",
  h1: "Identify Seventh Chords in Second inversion",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Chord exercises', '/ejercicios/acordes/']],
  scripts: ['tm-mei', 'tm-notacion', 'septimas-engine', 'ficha-septimas-engine'],
  body: `<p>A <strong>seventh chord</strong> is drawn on the staff, in second inversion. Your task is to identify its type: <strong>dominant seventh</strong>, <strong>half-diminished</strong> (leading-tone) seventh or <strong>diminished seventh</strong>.</p>

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

<h2>How to recognize the second inversion</h2>
<p>In second inversion the fifth is in the bass and the chord is labeled 4/3. The interval of a second sits between the two middle notes, and the root is the upper note of that second.</p>

<h2>Exercise</h2>
<div id="tmac_r_2a"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmSe7Engine("tmac_r_2a", { inversion: "2a" });
  });
</script>

<p><strong>How to use the exercise:</strong> Choose one of the three possible types and press Check. The app corrects your answer right away and, if you miss, shows the correct one.</p>

<p>Other positions: <a href="/ejercicios/acordes/septimas-en-fundamental/">Root position</a>, <a href="/ejercicios/acordes/septimas-en-primera-inversion/">First inversion</a>, <a href="/ejercicios/acordes/septimas-en-tercera-inversion/">Third inversion</a>, <a href="/ejercicios/acordes/septimas-todas-las-posiciones/">All positions</a>. To practice writing them instead of recognizing them, try <a href="/ejercicios/acordes/construir-septima-de-dominante-segunda-inversion/">building seventh chords</a>. For the full theory, see the pages on the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh</a>, the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">half-diminished seventh</a> and the <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh</a>.</p>

<!-- ficha-septimas -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>21 seventh chords</strong> in second inversion, mixing dominant, leading-tone and diminished, on one side of A4. The student writes the type. With a separate <strong>answer sheet</strong>.</p>
<figure class="tm-staff">
  <a href="/assets/img/acordes/fichas-septimas/ficha-analizar-septimas-segunda-inversion.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/acordes/fichas-septimas/preview-ficha-analizar-septimas-segunda-inversion.webp"><img src="/assets/img/acordes/fichas-septimas/preview-ficha-analizar-septimas-segunda-inversion.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to identify seventh chords in second inversion"></picture></a>
  <figcaption>A4 sheet with 21 chords.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/acordes/fichas-septimas/ficha-analizar-septimas-segunda-inversion.pdf" target="_blank" rel="noopener">Download the worksheet (PDF, A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/acordes/fichas-septimas/ficha-analizar-septimas-segunda-inversion-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy it freely for the classroom.</p>
<!-- /ficha-septimas -->

<h2>More worksheets</h2>
<p>Need more practice on paper? Generate as many <strong>worksheets</strong> as you like, each one with different chords, and print them straight from your browser.</p>
<div id="tmfs"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmFichaSeptimas) tmFichaSeptimas("tmfs", {"modo":"analizar","tiposIds":["dominante","sensible","disminuida"],"invs":[2]});
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
      <div class="tm-faq-a">The type of chord (dominant, half-diminished or diminished). The position is fixed: always second inversion.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
