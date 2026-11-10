const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/note-values/identify-notes-and-rests/',
  esPath: '/ejercicios/figuras/identificar-figuras-y-silencios/',
  title: 'Identify Notes and Rests: Free Note Value Quiz',
  description: 'Quiz to identify whole, half, quarter, eighth and sixteenth notes and their rests, with dots and double dots. Instant answers, no sign-up.',
  h1: 'Identify Notes and Rests',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Note Value and Rhythm Exercises', '/ejercicios/figuras/']],
  scripts: ['tm-mei', 'tm-notacion', 'figuras-engine'],
  body: `<p>An exercise to recognize at a glance the <a href="/diccionario-musical/figuras-musicales/">note values</a> (whole, half, quarter, eighth and sixteenth notes) and their <strong>rests</strong>, also with a <a href="/diccionario-musical/puntillo/">dot</a> and a double dot. Choose a level, answer and press <strong>Check</strong>: each answer is corrected right away, and each round has ten questions.</p>

<div id="tmfg"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFigurasEjercicio) tmFigurasEjercicio('tmfg', 'identificar'); });
</script>

<h2>How to recognize each note and its rest</h2>

<p>A note is recognized by three details: whether the note head is <strong>hollow or filled</strong>, whether it has a <strong>stem</strong> (the vertical line), and how many <strong>flags</strong> it has. Every note has a rest that lasts exactly the same. The names are whole note (UK: semibreve), half note (UK: minim), quarter note (UK: crotchet), eighth note (UK: quaver) and sixteenth note (UK: semiquaver).</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Note</th><th>How it is drawn</th><th>Its rest</th></tr></thead>
  <tbody>
    <tr><td><strong>Whole note</strong></td><td>Hollow head, no stem</td><td>A small rectangle hanging from the fourth line</td></tr>
    <tr><td><strong>Half note</strong></td><td>Hollow head with a stem</td><td>A small rectangle sitting on the third (middle) line</td></tr>
    <tr><td><strong>Quarter note</strong></td><td>Filled head with a stem</td><td>A vertical zigzag stroke</td></tr>
    <tr><td><strong>Eighth note</strong></td><td>Filled head, stem and one flag</td><td>A slanted stroke with one hook</td></tr>
    <tr><td><strong>Sixteenth note</strong></td><td>Filled head, stem and two flags</td><td>A slanted stroke with two hooks</td></tr>
  </tbody>
</table>
</div>

<p>The most confused are the <strong>whole rest</strong> and the <strong>half rest</strong>, because both are rectangles. The whole rest <strong>hangs</strong> from the fourth line and the half rest <strong>sits</strong> on the third line. A trick to remember it: the whole note lasts longer, it is "heavier", so its rest hangs down.</p>

<p>A <strong>dot</strong> is a point to the right of the note or rest, and a <strong>double dot</strong> is two points in a row. To practice how much each one adds, see the exercise on <a href="/ejercicios/figuras/valor-de-las-figuras/">note values in each time signature</a>.</p>

<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>24 mixed notes and rests</strong>, with and without dots, on one A4 sheet. The student writes under each symbol what it is. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<figure class="tm-staff">
  <a href="/assets/img/figuras/fichas/ficha-identificar.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/figuras/fichas/preview-ficha-identificar.webp"><img src="/assets/img/figuras/fichas/preview-ficha-identificar.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to identify notes and rests"></picture></a>
  <figcaption>A4 sheet with 24 notes and rests to identify.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/figuras/fichas/ficha-identificar.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/figuras/fichas/ficha-identificar-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<p>You can print and photocopy it freely for class. There is more rhythm practice in <a href="/ejercicios/figuras/">note value and rhythm exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the note values?</div>
      <div class="tm-faq-a">There are seven: whole, half, quarter, eighth, sixteenth, thirty-second and sixty-fourth notes. Each one lasts half as long as the one before. This exercise practices them from the whole note to the sixteenth note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you tell the whole rest from the half rest?</div>
      <div class="tm-faq-a">Both are rectangles, but the whole rest hangs from the fourth line of the staff and the half rest sits on the third line.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a double dot?</div>
      <div class="tm-faq-a">It is two dots to the right of the note or rest. The first adds half of its value and the second adds half of what the first adds.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
