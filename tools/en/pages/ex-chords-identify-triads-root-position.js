const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/identify-triads-root-position/",
  esPath: "/ejercicios/acordes/triadas-en-fundamental/",
  title: "Identify Triads in Root Position: Staff Quiz",
  description: "Identify major, minor, diminished and augmented triads in root position on the staff. Free interactive quiz with real notation, no sign-up.",
  h1: "Identify Triads in Root Position",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  scripts: ['tm-mei','tm-notacion','acordes-engine'],
  body: `<p>A <strong>triad</strong> is made of three notes stacked in thirds: the <strong>root</strong>, the <strong>third</strong> and the <strong>fifth</strong>. The quality of those thirds gives four different types of chord. In <strong>root position</strong> the root is the lowest note, so the chord looks like three notes on neighboring lines or neighboring spaces.</p>

<h2>1. The four types of triad</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Third</th><th>Fifth</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td>Major</td><td>Major 3rd (4 half steps)</td><td>Perfect 5th (7)</td><td>C – E – G</td></tr>
    <tr><td>Minor</td><td>minor 3rd (3 half steps)</td><td>Perfect 5th (7)</td><td>D – F – A</td></tr>
    <tr><td>Diminished</td><td>minor 3rd (3 half steps)</td><td>Diminished 5th (6)</td><td>B – D – F</td></tr>
    <tr><td>Augmented</td><td>Major 3rd (4 half steps)</td><td>Augmented 5th (8)</td><td>C – E – G♯</td></tr>
  </tbody>
</table>
</div>

<p>The names of the types are also written as "perfect major" and "perfect minor" in some textbooks, and the diminished and augmented triads are named after their fifth.</p>

<h2>2. How to analyze a triad</h2>
<p><strong>Quick method:</strong></p>
<ol>
  <li>Find the lowest note (the root).</li>
  <li>Count the half steps (UK: semitones) up to the middle note, the third: <strong>4 = major, 3 = minor</strong>.</li>
  <li>Count the half steps up to the top note, the fifth: <strong>7 = perfect, 6 = diminished, 8 = augmented</strong>.</li>
  <li>Combine: major third + perfect fifth = <em>major</em>; minor third + perfect fifth = <em>minor</em>; minor third + diminished fifth = <em>diminished</em>; major third + augmented fifth = <em>augmented</em>.</li>
</ol>

<h2>3. Interactive exercise</h2>
<p>A three-note chord appears on the staff. Your task is to identify its type by choosing one of the four options.</p>

<div id="tmac1"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAcEngine("tmac1", { inversion: 'fundamental' });
  });
</script>

<p>Next: <a href="/ejercicios/acordes/triadas-en-primera-inversion/">identify triads in first inversion</a>, or practice the opposite skill and <a href="/ejercicios/acordes/construir-triadas/">build triads in root position</a>.</p>

<p>If you practice these chords on an instrument, the <a href="/herramientas/metronomo/">online metronome</a> helps you build speed gradually: start slowly (50-60 BPM) and speed up a little at a time. The <a href="/herramientas/afinador/">online tuner</a> lets you check that every note of the chord is in tune.</p>

<p>For the full theory of each triad, see the page on <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>, with the <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished chord</a> and the <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented chord</a>.</p>

<!-- ficha-acordes -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>21 triads in root position</strong> on one side of A4, and under each one you write its type. With a separate <strong>answer sheet</strong>.</p>
<p>It goes from easier to harder: first chords with natural notes in treble clef, then with sharps and flats and the bass clef coming in gradually, and finally a few with a double accidental.</p>
<figure class="tm-staff">
  <a href="/assets/img/acordes/fichas/ficha-analizar-triadas-fundamental.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/acordes/fichas/preview-ficha-analizar-triadas-fundamental.webp"><img src="/assets/img/acordes/fichas/preview-ficha-analizar-triadas-fundamental.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet with 21 triads in root position to analyze"></picture></a>
  <figcaption>A4 sheet with 21 triads in root position to analyze.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/acordes/fichas/ficha-analizar-triadas-fundamental.pdf" target="_blank" rel="noopener">Download the worksheet (PDF, A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/acordes/fichas/ficha-analizar-triadas-fundamental-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy it freely for the classroom. To practice in the other direction, see the worksheet to <a href="/ejercicios/acordes/construir-triadas/">write triads in root position</a>.</p>
<!-- /ficha-acordes -->

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the root position of a chord?</div>
      <div class="tm-faq-a">Root position means that the lowest note of the chord (the bass) is the root, the note that gives the chord its name. In a C major chord in root position, C is in the bass and the upper notes are E and G.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a root-position triad on the staff?</div>
      <div class="tm-faq-a">The bass is the root, and the three notes form a stack of thirds with no inversion: root, third, fifth from the bottom up. On the staff the notes sit on three adjacent lines or three adjacent spaces. The interval between the bass and the middle note is always a third (major or minor, depending on the type).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the four types of triad?</div>
      <div class="tm-faq-a">1) Major: major third + perfect fifth (C–E–G). 2) Minor: minor third + perfect fifth (A–C–E). 3) Diminished: minor third + diminished fifth (B–D–F). 4) Augmented: major third + augmented fifth (C–E–G♯). Each type has its own characteristic sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do we study root position first?</div>
      <div class="tm-faq-a">It is the most basic and recognizable form of a chord. It lets you learn how each type of triad looks before you meet the inversions, which rearrange the notes but keep the same chord. Root position is the reference from which every other position is analyzed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I tell a major triad from a minor triad in root position?</div>
      <div class="tm-faq-a">Look at the interval between the bass (the root) and the middle note (the third). A major third has 4 half steps, and the chord is major. A minor third has 3 half steps, and the chord is minor. The fifth (the top note) is perfect in both cases.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
