const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/phrase-endings/',
  esPath: '/ejercicios/final-tiempo-fuerte-y-debil/',
  title: 'Phrase Endings: Strong Beat or Weak Beat Exercise',
  description: 'Exercise: tell whether a melody ends on a strong beat (masculine) or a weak beat (feminine) from its last two measures. Three levels, worksheets.',
  h1: 'Phrase Endings on a Strong or Weak Beat',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'tipo-de-comienzo-engine', 'tipo-de-final-engine', 'ficha-final-frase-engine'],
  body: `<p>In this exercise you see the end of a melody (the last two measures, with their key signature and time signature) and you have to say whether it ends on a <strong>strong beat</strong> or on a <strong>weak beat</strong>. In Spanish-language teaching these are called <em>íctico</em> and <em>posíctico</em>; in English they are often called a masculine ending and a feminine ending. Three levels, instant answers and printable worksheets with solutions.</p>

<p>Look at the last measure, the one that ends at the double bar line: on which beat does the last note start? How long it lasts does not matter.</p>

<div id="tmfi"></div>

<h2>How to tell the ending</h2>

<ol>
  <li><strong>Find the last note that sounds</strong> in the last measure. Any rests after it do not count.</li>
  <li><strong>Look at which beat it starts on</strong>, not how long it lasts. If it starts on beat 1, the phrase ends <strong>on a strong beat</strong> (íctico).</li>
  <li><strong>If it starts anywhere else in the measure</strong> (beat 2, beat 3 or an off-beat), the phrase ends <strong>on a weak beat</strong> (posíctico).</li>
</ol>

<p>For example, in 4/4 a half note that starts on beat 3 is an ending on a weak beat even though it lasts two beats, and an eighth note on beat 1 followed by rests is an ending on a strong beat. From the medium level on, the last measure can be incomplete (it makes up for a pickup at the beginning): its strong beat is still the first one, at the start of that measure. The full explanation is on <a href="/diccionario-musical/la-frase-musical/final-tiempo-fuerte-y-debil/">phrase endings on a strong or weak beat</a>.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: you can generate <strong>worksheets of eighteen melody endings</strong>, six from each level, with three of each type at each level. The student ticks the matching box. Each sheet comes with its own solutions page. Generate as many sheets as you need, each with different melodies, and print them straight from your browser.</p>
<div id="tmff"></div>

<h2>Before and after this exercise</h2>

<p>To know which beat is the strong one in each measure, it helps to go through <a href="/ejercicios/compases/analizar-compas/">analyze time signatures</a> first. The other half of the phrase, its beginning, is practiced in <a href="/ejercicios/comienzo-tetico-anacrusico-acefalo/">starts on the downbeat, on a pickup or after a rest</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmFinal) tmFinal('tmfi');
    if (window.tmFichaFinalFrase) tmFichaFinalFrase('tmff');
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
      <div class="tm-faq-q">How can I tell whether a phrase ends on a strong or a weak beat?</div>
      <div class="tm-faq-a">Look at which beat the last note of the last measure starts on, not how long it lasts. If it starts on beat 1, the ending is on a strong beat (íctico). If it starts anywhere else in the measure, the ending is on a weak beat (posíctico).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the length of the last note matter?</div>
      <div class="tm-faq-a">No. A long or a short note can give a strong or a weak ending: what decides is whether it is attacked on the accent or after it. Rests after the last note do not count either.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is beat 3 in 4/4 a strong beat?</div>
      <div class="tm-faq-a">In this exercise, the only strong beat of the measure is beat 1. A last note that starts on beat 3 (or on beat 3 of a 12/8 measure) counts as an ending on a weak beat, just like one that starts off the beat inside beat 1.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What if the last measure is incomplete?</div>
      <div class="tm-faq-a">When a melody starts with a pickup, the last measure is usually left incomplete to make up for it. Its strong beat is still the first one, at the start of that measure, and the last note is counted from there.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the end of the phrase the same as the cadence?</div>
      <div class="tm-faq-a">No. The ending practiced here is rhythmic: on which beat the last note falls. The cadence is the harmonic ending, the sequence of chords that closes the phrase. A phrase has both at the same time.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signatures are in the exercise?</div>
      <div class="tm-faq-a">The simple meters 2/4, 3/4 and 4/4 at the easy level, and the compound meters 6/8, 9/8 and 12/8 as well from the medium level. The melodies always end on the tonic of a major key, with its key signature.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
