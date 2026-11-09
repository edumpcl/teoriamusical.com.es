const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/tuplets/',
  esPath: '/ejercicios/grupos-de-valoracion-especial/',
  title: 'Tuplet Exercises: Triplets, Duplets, Quadruplets, Sextuplets',
  description: 'Free tuplet exercises: what simple note value each triplet, duplet, quadruplet and sextuplet equals. Three levels, worksheets with solutions.',
  h1: 'Tuplet Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'grupos-valoracion-especial-engine', 'ficha-grupos-ve-engine'],
  body: `<p>This exercise on <strong>tuplets</strong> (irregular groups) shows a triplet, a duplet, a quadruplet or a sextuplet written inside a measure, and you must say which simple note value the whole group equals. Three levels: easy (even rhythm), medium (with a rest) and hard (mixed rhythm inside the group). Answers are checked right away and you can generate printable worksheets with solutions.</p>

<div id="tmgv"></div>

<h2>How to work out what a tuplet equals</h2>

<p>A tuplet puts more (or fewer) notes than normal in the same span of time. The whole group <strong>always lasts as long as the number of notes it replaces</strong>, and that time is shared equally among its notes. The four groups in this exercise are worked with their usual equivalence, the one used by most methods:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Tuplet</th><th>Notes</th><th>Equals</th><th>Meter</th></tr></thead>
  <tbody>
    <tr><td>Triplet</td><td>3</td><td>2 notes</td><td>Simple</td></tr>
    <tr><td>Duplet</td><td>2</td><td>3 notes</td><td>Compound</td></tr>
    <tr><td>Quadruplet</td><td>4</td><td>6 notes</td><td>Compound</td></tr>
    <tr><td>Sextuplet</td><td>6</td><td>4 notes</td><td>Simple</td></tr>
  </tbody>
</table>
</div>

<p>For example, a <strong>triplet of eighth notes</strong> puts three eighth notes where two fit, so the three together last as long as two eighth notes: a quarter note. A <strong>duplet of eighth notes</strong> puts two where three fit, so it equals a dotted quarter note. When the rhythm inside the group is not even (for example, a quarter note and an eighth note inside a triplet, instead of three equal eighth notes) the whole group still lasts the same: the quarter note takes two thirds of the beat and the eighth note the remaining third, and together they still add up to a quarter note.</p>

<p><strong>A note on the quadruplet.</strong> This site uses the convention of the Spanish-language tradition: a quadruplet is four notes in the place of six, which is the same as a duplet with each note subdivided, and it is typical of compound meters. Many English-language sources instead define a quadruplet as four notes in the time of three (4:3). When in doubt, look for a written ratio. The <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplet theory page</a> explains both readings; unlike the quintuplet and the septuplet, which depend on the context, the four groups here have a fixed equivalence in this exercise.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: you can generate <strong>worksheets of eighteen measures</strong>, each with one tuplet, six from each level. The student writes the note value the marked group equals. Each sheet comes with its own solutions page. Generate as many sheets as you need, each with different measures, and print them straight from your browser.</p>
<div id="tmfg"></div>

<h2>Before and after this exercise</h2>

<p>It helps to be comfortable with <a href="/ejercicios/figuras/valor-de-las-figuras/">note values in each time signature</a> before you start. The full theory, with the quintuplet and septuplet included, is in <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplets</a>. The next step is <a href="/ejercicios/grupos-de-valoracion-especial/que-compas-es/">Which time signature is it?</a>: use that equivalence to work out the time signature of a whole measure made of irregular groups.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmGruposVE) tmGruposVE('tmgv');
    if (window.tmFichaGruposVE) tmFichaGruposVE('tmfg');
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
      <div class="tm-faq-q">What does a triplet equal?</div>
      <div class="tm-faq-a">A triplet puts three equal notes where two fit, so the three together last as long as two notes of the same value. A triplet of eighth notes equals a quarter note. It can also be smaller: a triplet of sixteenth notes takes up only an eighth note, and fits next to loose eighth notes inside a single beat, simple or compound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does a duplet equal?</div>
      <div class="tm-faq-a">A duplet puts two notes where three fit, so it equals three notes of the same value. A duplet of eighth notes equals a dotted quarter note, and it is typical of compound meters.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What about the quadruplet and the sextuplet?</div>
      <div class="tm-faq-a">The quadruplet puts four notes where six fit (typical of compound meter) and the sextuplet puts six where four fit (typical of simple meter). This is the usual reading in the Spanish-language tradition and the convention of this exercise; many English-language sources define a quadruplet as four notes in the time of three instead, so look for a written ratio when in doubt. Unlike the quintuplet and the septuplet, which depend on the context, here the equivalence is fixed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What happens when the rhythm inside the group is not even?</div>
      <div class="tm-faq-a">The whole group still lasts the same. For example, inside a triplet, a quarter note and an eighth note (instead of three equal eighth notes) still add up to exactly a quarter note: the quarter note takes two thirds of the beat and the eighth note the remaining third.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
