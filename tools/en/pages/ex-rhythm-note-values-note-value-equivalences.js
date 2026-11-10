const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/note-values/note-value-equivalences/',
  esPath: '/ejercicios/figuras/equivalencias-de-figuras/',
  title: 'Note Value Equivalences: Free Online Rhythm Quiz',
  description: 'Quiz on note value equivalences: how many eighth notes in a dotted half note, which note equals three quarter notes. With dots and double dots.',
  h1: 'Note Value Equivalences',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Note Value and Rhythm Exercises', '/ejercicios/figuras/']],
  scripts: ['tm-mei', 'tm-notacion', 'figuras-engine'],
  body: `<p>The <strong>equivalences between note values</strong> tell you how many notes of one kind fit in another: two quarter notes (UK: crotchets) fit in a half note (UK: minim), and three eighth notes (UK: quavers) fit in a dotted quarter note. This exercise practices them in both directions, how many fit and which note equals a group, and also with dots and double dots.</p>

<div id="tmfg"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFigurasEjercicio) tmFigurasEjercicio('tmfg', 'equivalencias'); });
</script>

<h2>Note value equivalence chart</h2>

<p>Each note lasts twice as long as the next one. These equivalences <strong>do not depend on the time signature</strong>: a half note equals two quarter notes in <a href="/diccionario-musical/compases/compas-de-2-4/">2/4</a> as well as in <a href="/diccionario-musical/compases/compas-de-6-8/">6/8</a>. What does change with the time signature is how many beats each note lasts, because in 2/4 the beat is the quarter note and in 6/8 it is the dotted quarter note.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Note</th><th>Half notes</th><th>Quarter notes</th><th>Eighth notes</th><th>Sixteenth notes</th><th>32nd notes</th><th>64th notes</th></tr></thead>
  <tbody>
    <tr><td><strong>Whole note</strong></td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><td>64</td></tr>
    <tr><td><strong>Half note</strong></td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td></tr>
    <tr><td><strong>Quarter note</strong></td><td>—</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td></tr>
    <tr><td><strong>Eighth note</strong></td><td>—</td><td>—</td><td>1</td><td>2</td><td>4</td><td>8</td></tr>
    <tr><td><strong>Sixteenth note</strong></td><td>—</td><td>—</td><td>—</td><td>1</td><td>2</td><td>4</td></tr>
    <tr><td><strong>32nd note</strong></td><td>—</td><td>—</td><td>—</td><td>—</td><td>1</td><td>2</td></tr>
  </tbody>
</table>
</div>

<p>The thirty-second and sixty-fourth notes are in the charts for reference; the exercise goes as far as the sixteenth note.</p>

<h3>With dots and double dots</h3>

<p>A dot adds half of the value, so the note comes to last <strong>three</strong> of the notes that used to make two: a quarter note is two eighth notes, and a dotted quarter note is three. A double dot adds a second dot, which adds <strong>half of what the first one adds</strong>: a quarter note is four sixteenth notes, the first dot adds two and the second adds one. In total, 4 + 2 + 1 = <strong>seven</strong> sixteenth notes.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Note</th><th>Equals</th></tr></thead>
  <tbody>
    <tr><td><strong>Dotted whole note</strong></td><td>3 half notes = 6 quarter notes = 12 eighth notes</td></tr>
    <tr><td><strong>Dotted half note</strong></td><td>3 quarter notes = 6 eighth notes = 12 sixteenth notes</td></tr>
    <tr><td><strong>Dotted quarter note</strong></td><td>3 eighth notes = 6 sixteenth notes</td></tr>
    <tr><td><strong>Dotted eighth note</strong></td><td>3 sixteenth notes = 6 32nd notes</td></tr>
    <tr><td><strong>Dotted sixteenth note</strong></td><td>3 32nd notes = 6 64th notes</td></tr>
    <tr><td><strong>Dotted 32nd note</strong></td><td>3 64th notes</td></tr>
    <tr><td><strong>Double-dotted whole note</strong></td><td>7 quarter notes = 14 eighth notes</td></tr>
    <tr><td><strong>Double-dotted half note</strong></td><td>7 eighth notes = 14 sixteenth notes</td></tr>
    <tr><td><strong>Double-dotted quarter note</strong></td><td>7 sixteenth notes = 14 32nd notes</td></tr>
    <tr><td><strong>Double-dotted eighth note</strong></td><td>7 32nd notes = 14 64th notes</td></tr>
    <tr><td><strong>Double-dotted sixteenth note</strong></td><td>7 64th notes</td></tr>
  </tbody>
</table>
</div>

<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper: <strong>18 questions</strong> on one A4 sheet, nine of "how many fit?" and nine of "which note is it?". With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<figure class="tm-staff">
  <a href="/assets/img/figuras/fichas/ficha-equivalencias.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/figuras/fichas/preview-ficha-equivalencias.webp"><img src="/assets/img/figuras/fichas/preview-ficha-equivalencias.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet on note value equivalences"></picture></a>
  <figcaption>A4 sheet with 18 questions on note value equivalences.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/figuras/fichas/ficha-equivalencias.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/figuras/fichas/ficha-equivalencias-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<p>You can print and photocopy it freely for class. The theory is in <a href="/diccionario-musical/figuras-musicales/">note values</a>, and there is more practice in <a href="/ejercicios/figuras/">note value and rhythm exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many eighth notes are in a dotted half note?</div>
      <div class="tm-faq-a">Six. The half note equals four eighth notes and the dot adds half of that, two more.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which note equals three quarter notes?</div>
      <div class="tm-faq-a">The dotted half note: the half note equals two quarter notes and the dot adds one more.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do note value equivalences change with the time signature?</div>
      <div class="tm-faq-a">No. A half note is always two quarter notes, whatever the time signature. What changes with the time signature is how many beats each note lasts.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
