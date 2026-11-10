const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/note-values/add-up-notes-in-a-measure/',
  esPath: '/ejercicios/figuras/sumar-figuras-en-un-compas/',
  title: 'Add Up Notes in a Measure: Free Rhythm Quiz',
  description: 'Quiz to add up the value of notes and rests in a measure of 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8. Instant answers, no sign-up.',
  h1: 'Add Up the Notes in a Measure',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Note Value and Rhythm Exercises', '/ejercicios/figuras/']],
  scripts: ['tm-mei', 'tm-notacion', 'figuras-engine'],
  body: `<p>In this exercise you see several notes and rests in a row inside a measure (UK: bar), and you say <strong>how many beats they add up to</strong>. It is the step before <a href="/ejercicios/compases/completar-compas/">completing measures</a>: before you can tell which note is missing, you have to be able to add up what is already there.</p>

<div id="tmfg"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFigurasEjercicio) tmFigurasEjercicio('tmfg', 'sumar'); });
</script>

<h2>How to add up the notes of a measure</h2>

<ol>
  <li><strong>Look at the time signature.</strong> In 2/4, 3/4 and 4/4 each beat is a quarter note (UK: crotchet). In 6/8, 9/8 and 12/8 each beat groups three eighth notes (UK: quavers), so it equals a dotted quarter note.</li>
  <li><strong>Work out how long each note and each rest lasts</strong> in that time signature. Rests count the same as notes.</li>
  <li><strong>Add.</strong> In simple meters you get halves and quarters of a beat; in compound meters, thirds and sixths.</li>
</ol>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th></th><th>Simple meters</th><th>Compound meters</th></tr></thead>
  <tbody>
    <tr><td><strong>Time signatures</strong></td><td>2/4, 3/4 and 4/4</td><td>6/8, 9/8 and 12/8</td></tr>
    <tr><td><strong>One beat is</strong></td><td>a quarter note</td><td>a dotted quarter note (three eighth notes)</td></tr>
    <tr><td><strong>A quarter note lasts</strong></td><td>1 beat</td><td>⅔ of a beat</td></tr>
    <tr><td><strong>An eighth note lasts</strong></td><td>½ a beat</td><td>⅓ of a beat</td></tr>
    <tr><td><strong>A sixteenth note lasts</strong></td><td>¼ of a beat</td><td>⅙ of a beat</td></tr>
  </tbody>
</table>
</div>

<p>For example, in <strong>6/8</strong>: a quarter note (⅔) + an eighth note (⅓) + a dotted quarter note (1) = <strong>2 beats</strong>, which is exactly one full measure. In <strong>3/4</strong>: a dotted quarter note (1½ beats) + an eighth note (½) + a quarter rest (1) = <strong>3 beats</strong>.</p>

<p>A trick for compound meters is to <strong>count in eighth notes</strong>: each beat is three. In the 6/8 example, the quarter note is 2 eighth notes, the eighth note is 1 and the dotted quarter note is 3: in total 6 eighth notes, which is two beats. To review the value of each note in each time signature, there is the exercise on <a href="/ejercicios/figuras/valor-de-las-figuras/">note values</a>.</p>

<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper: <strong>12 excerpts</strong> to add up, six in simple and six in compound time signatures, on one A4 sheet. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<figure class="tm-staff">
  <a href="/assets/img/figuras/fichas/ficha-sumar.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/figuras/fichas/preview-ficha-sumar.webp"><img src="/assets/img/figuras/fichas/preview-ficha-sumar.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to add up the notes in a measure"></picture></a>
  <figcaption>A4 sheet with 12 excerpts to add up in simple and compound time signatures.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/figuras/fichas/ficha-sumar.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/figuras/fichas/ficha-sumar-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>

<p>You can print and photocopy it freely for class. There are more rhythm exercises in <a href="/ejercicios/figuras/">note value and rhythm exercises</a>, and to practice time signatures, the <a href="/ejercicios/compases/analizar-compas/">analyze time signatures</a> exercise.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do rests count when adding up a measure?</div>
      <div class="tm-faq-a">Yes. A rest lasts exactly the same as its note, so it is added up in the same way.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you add up notes in 6/8?</div>
      <div class="tm-faq-a">The easiest way is to count in eighth notes: each beat is three eighth notes. A quarter note is two eighth notes, a dotted quarter note is three and a dotted half note is six, which is a whole measure.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does a quarter note not last a whole beat in 6/8?</div>
      <div class="tm-faq-a">Because in 6/8 each beat groups three eighth notes. The quarter note lasts two eighth notes, so it lasts two thirds of a beat; the dotted quarter note lasts three eighth notes and lasts one whole beat.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
