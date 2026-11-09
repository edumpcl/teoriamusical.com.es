const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/beat-unit-and-measure-unit/',
  esPath: '/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/',
  title: 'Beat Unit and Measure Unit: What They Are, With Examples',
  description: 'The beat unit is the note value of one beat; the measure unit is the note value that fills a whole measure. Learn how to read time signature numbers.',
  h1: 'Beat Unit and Measure Unit',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  body: `<p>The two numbers at the start of a <a href="/diccionario-musical/compases/">measure</a> (UK: bar) are not a fraction. They tell you <strong>how many parts</strong> the measure has and <strong>which note value</strong> fills each one. To understand them, you need two ideas: the <strong>measure unit</strong> and the <strong>beat unit</strong>.</p>

<h2>Measure unit</h2>
<p>The <strong>measure unit</strong> is the note value (or sum of note values) that <strong>fills one whole measure</strong>. In <strong>4/4</strong> the measure unit is the <strong>whole note</strong> (UK: semibreve), because a whole note lasts exactly four beats. (In English this term is less common than in Spanish-language theory, but the idea is useful.)</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/compases/unidad-de-compas.svg" width="191" height="122" alt="A measure of 4/4 with one whole note, which is the measure unit" loading="lazy" decoding="async">
<figcaption>In 4/4, the <strong>whole note</strong> fills the measure: it is the measure unit.</figcaption>
</figure>

<h2>Beat unit</h2>
<p>The <strong>beat unit</strong> is the note value that represents <strong>one beat</strong>, the pulse you tap with your foot or hear on the <a href="/herramientas/metronomo/">metronome</a>. In 4/4 the beat unit is the <strong>quarter note</strong> (UK: crotchet): the measure holds four quarter notes, one per beat.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/compases/unidad-de-tiempo.svg" width="263" height="122" alt="A measure of 4/4 with four quarter notes, one for each beat" loading="lazy" decoding="async">
<figcaption>In 4/4 there are four <strong>quarter notes</strong>: the quarter note is the beat unit.</figcaption>
</figure>

<h2>How to read the time signature numbers</h2>
<p>In <strong>simple meters</strong> (the most common), the two numbers are read like this:</p>
<ul>
  <li>The <strong>top number</strong> tells you <strong>how many beats</strong> are in each measure.</li>
  <li>The <strong>bottom number</strong> tells you <strong>which note value</strong> is the beat unit: <strong>2</strong> = half note, <strong>4</strong> = quarter note, <strong>8</strong> = eighth note.</li>
</ul>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Time signature</th><th>Beats</th><th>Beat unit</th><th>Measure unit</th></tr>
  </thead>
  <tbody>
    <tr><td>2/4</td><td>2</td><td>Quarter note</td><td>Half note</td></tr>
    <tr><td>3/4</td><td>3</td><td>Quarter note</td><td>Dotted half note</td></tr>
    <tr><td>4/4</td><td>4</td><td>Quarter note</td><td>Whole note</td></tr>
    <tr><td>2/2</td><td>2</td><td>Half note</td><td>Whole note</td></tr>
    <tr><td>3/8</td><td>3</td><td>Eighth note</td><td>Dotted quarter note</td></tr>
  </tbody>
</table>
</div>

<h2>Subdivision</h2>
<p>The <strong>subdivision</strong> is the number of parts each beat is divided into. This is where the two main kinds of meter differ:</p>
<ul>
  <li>In <strong>simple meters</strong>, each beat divides into <strong>two</strong> (a quarter note into two eighth notes). The beat unit is an <strong>undotted</strong> note.</li>
  <li>In <strong>compound meters</strong>, each beat divides into <strong>three</strong>. The beat unit is a <strong>dotted</strong> note.</li>
</ul>

<p>That is why the numbers of a compound meter such as <strong>6/8</strong> are read differently. The 8 does not give the beat. It gives the <strong>subdivision</strong> (the eighth note). The six eighth notes are grouped in threes, forming <strong>two beats</strong> of <strong>dotted quarter note</strong>:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/compases/compas-compuesto-68.svg" width="257" height="122" alt="A measure of 6/8 with six eighth notes grouped in threes, forming two beats" loading="lazy" decoding="async">
<figcaption>In 6/8 there are <strong>two beats</strong> (not six): the beat unit is the dotted quarter note.</figcaption>
</figure>

<p>To find the beats and accents of any time signature, see <a href="/diccionario-musical/compases/analizar-compases/">how to analyze time signatures</a> and <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">rhythmic accents</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the measure unit?</div>
      <div class="tm-faq-a">The measure unit is the note value (or group of note values) whose duration exactly fills one measure. In 4/4 the measure unit is the whole note, because a whole note equals the four beats of the measure.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the beat unit?</div>
      <div class="tm-faq-a">The beat unit is the note value that represents a single beat, that is, the pulse. In 4/4 the beat unit is the quarter note: the measure has four quarter notes, one per beat.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you read the numbers of a time signature?</div>
      <div class="tm-faq-a">In simple meters, the top number is how many beats are in each measure and the bottom number is the note value of each beat (2 = half note, 4 = quarter note, 8 = eighth note). For example, 3/4 means three quarter-note beats.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the beat unit in a compound meter such as 6/8?</div>
      <div class="tm-faq-a">In compound meters the beat unit is a dotted note. In 6/8 the bottom number (8) gives the subdivision (the eighth note). Each beat groups three eighth notes, so the beat unit is the dotted quarter note and the measure has two beats, not six.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
