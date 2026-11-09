const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/which-time-signature/',
  esPath: '/ejercicios/grupos-de-valoracion-especial/que-compas-es/',
  title: 'Which Time Signature? Quiz With Triplets and Tuplets',
  description: 'Name the time signature of a measure filled with triplets, duplets, quadruplets and sextuplets by simplifying each tuplet. Three levels, worksheets.',
  h1: 'Which Time Signature Is It?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Time Signature Exercises', '/ejercicios/compases/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'grupos-valoracion-especial-engine', 'que-compas-es-engine', 'ficha-que-compas-es-engine'],
  body: `<p>This exercise shows a measure <strong>full of tuplets</strong> (triplets, duplets, quadruplets, sextuplets), without its time signature, and you must work it out. You solve it by <strong>simplifying</strong>: seeing which simple note value each irregular group equals and adding up. Three levels, from a single group inside the measure to a whole measure made of groups.</p>

<p>Choose the top number and the bottom number that match the measure you see: to get it right, first reduce each tuplet in your head to the duration it stands for.</p>

<div id="tmqc"></div>

<h2>How to "simplify" a measure with irregular groups</h2>

<ol>
  <li><strong>Identify each group</strong> by its bracket and its number: 3 is a triplet, 2 a duplet, 4 a quadruplet, 6 a sextuplet.</li>
  <li><strong>Replace it in your head</strong> with the simple note value it stands for in this exercise (a triplet of eighth notes becomes a quarter note, a duplet of eighth notes becomes a dotted quarter note, and so on, following the equivalence table).</li>
  <li><strong>Add up everything</strong> that is written: the simplified groups and the notes that are not part of any group. Count how many beats it fills, and that gives the time signature.</li>
</ol>

<p>This kind of exercise makes you reduce the irregular note values in your head before you recognize the metric structure. The more beats of the measure are taken up by groups, the harder it is to "see" the time signature at a glance, and the more you need to simplify calmly.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: <strong>eighteen measures</strong> without a time signature, six from each level, on one A4 sheet. The student writes the time signature in the box. Each sheet comes with its own solutions page, including the cases where two time signatures are correct. Generate as many sheets as you need, each with different measures, and print them straight from your browser.</p>
<div id="tmfq"></div>

<h2>Before this exercise</h2>

<p>First learn <a href="/ejercicios/grupos-de-valoracion-especial/">what each tuplet equals</a> on its own, and get comfortable recognizing time signatures with ordinary rhythm in <a href="/ejercicios/compases/reconocer-compas/">recognize the time signature</a>. The full theory is on the page about <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplets</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmQueCompasEs) tmQueCompasEs('tmqc');
    if (window.tmFichaQueCompasEs) tmFichaQueCompasEs('tmfq');
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
      <div class="tm-faq-q">How do you recognize the time signature when there are tuplets?</div>
      <div class="tm-faq-a">By simplifying: in this exercise, each tuplet (triplet, duplet, quadruplet, sextuplet) is reduced to the simple note value it stands for. You replace each group in your head with that note value, add up everything that is written and count how many beats the measure fills.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can there be more than one irregular group in the same measure?</div>
      <div class="tm-faq-a">Yes. At the easy level there is a single group; at the medium level, two; at the hard level, the whole measure is made of irregular groups, with no ordinary note values at all.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know which time signature it is when there are triplets or other tuplets?</div>
      <div class="tm-faq-a">Simplify each group to the note value it stands for in this exercise (a triplet of eighth notes becomes a quarter note, a duplet of eighth notes becomes a dotted quarter note, and so on) and add up all the resulting note values: that total tells you how many beats the measure fills. A 4/4 always also accepts 2/2, and a 2/4 always also accepts 4/8, because in each case both time signatures fit exactly the same. Apart from those two cases, unlike recognize the time signature, other alternative readings are not checked here.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signatures are in the exercise?</div>
      <div class="tm-faq-a">The six common ones: 2/4, 3/4, 4/4, 6/8, 9/8 and 12/8.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
