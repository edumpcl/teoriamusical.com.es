const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/phrase-beginnings/',
  esPath: '/ejercicios/comienzo-tetico-anacrusico-acefalo/',
  title: 'Phrase Beginnings: Downbeat, Pickup or Off-Beat Start',
  description: 'Exercise: tell whether a melody starts on the downbeat, on a pickup (anacrusis) or after a rest, from its first two measures. Three levels, worksheets.',
  h1: 'Starts on the Downbeat, on a Pickup or After a Rest',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'tipo-de-comienzo-engine', 'ficha-comienzo-engine'],
  body: `<p>In this exercise you see the beginning of a melody (two measures, with their key signature and time signature) and you have to identify how it starts. In Spanish-language teaching there are three names: <strong>tético</strong> (the melody starts on the downbeat), <strong>anacrúsico</strong> (it starts on a pickup, or anacrusis, a short note or notes before the first strong beat) and <strong>acéfalo</strong> (it starts after the downbeat, with the "head" of the measure missing). Three levels, instant answers and printable worksheets with solutions.</p>

<p>Pay attention to when the music enters inside the first measure: on the strong beat, shortly after it, or already in the second half? Choose the type of beginning that matches.</p>

<div id="tmcm"></div>

<h2>How to tell each beginning</h2>

<ol>
  <li><strong>Look at where the first note enters.</strong> If it falls on beat 1, the melody starts on the downbeat (<strong>tético</strong>).</li>
  <li><strong>If it enters after the strong beat but before the middle of the measure, it is acéfalo:</strong> the "head" is missing. It makes no difference whether the initial rest is written (the measure looks complete, starting with a rest) or not (the measure looks incomplete).</li>
  <li><strong>If it enters at the middle of the measure or later, it is anacrúsico (a pickup):</strong> the first measure is left incomplete, and those notes, the pickup (UK: upbeat), lead to the strong beat.</li>
</ol>

<p>For example, in 4/4: a quarter note on beat 4, or two quarter notes on beats 3 and 4 (exactly half of the measure), are a pickup. Three quarter notes on beats 2, 3 and 4 are an acéfalo beginning, even if the rest on beat 1 is not written.</p>

<p>At the hard level there are rests inside the measure, once the melody has started. Do not confuse them with the initial rest of the acéfalo beginning: all that counts is when the music enters in the first measure. The full explanation, with well-known examples, is on <a href="/diccionario-musical/la-frase-musical/comienzo-tetico-anacrusico-acefalo/">beginnings: downbeat, pickup and off-beat start</a>.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: you can generate <strong>worksheets of eighteen melodies</strong>, six from each level, with two of each type of beginning at each level. The student ticks the matching box. Each sheet comes with its own solutions page. Generate as many sheets as you need, each with different melodies, and print them straight from your browser.</p>
<div id="tmfm"></div>

<h2>Before this exercise</h2>

<p>To know which beat is the strong one in each measure, it helps to go through <a href="/ejercicios/compases/analizar-compas/">analyze time signatures</a> first, and to handle the length of each measure well, through <a href="/ejercicios/compases/completar-compas/">complete the measure</a>. The other half of the phrase, its ending, is practiced in <a href="/ejercicios/final-tiempo-fuerte-y-debil/">phrase endings on a strong or weak beat</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmComienzo) tmComienzo('tmcm');
    if (window.tmFichaComienzo) tmFichaComienzo('tmfm');
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
      <div class="tm-faq-q">How can I tell whether a melody starts on the downbeat, on a pickup or after a rest?</div>
      <div class="tm-faq-a">Look at when the music enters inside the first measure. If it enters on beat 1, it starts on the downbeat (tético). If it enters after the strong beat but before the middle of the measure, it is acéfalo, whether the initial rest is written or the measure looks incomplete. If it enters at the middle of the measure or later, it is a pickup (anacrúsico).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I tell a pickup from an acéfalo beginning?</div>
      <div class="tm-faq-a">By the moment the music enters, not by whether the measure is complete. In a pickup the music enters at the middle of the measure or later: what is written before the bar line lasts half the measure or less. In an acéfalo beginning it enters after the strong beat but before the middle, and the initial rest may or may not be written. In 4/4, three quarter notes before the bar line are an acéfalo beginning; two or fewer are a pickup.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long can a pickup be?</div>
      <div class="tm-faq-a">It depends on the melody and the time signature. What matters is that it comes before the first strong beat and leaves the first measure incomplete. With the criterion of this exercise, a pickup lasts at most half the measure (exactly half counts as a pickup); if what is written lasts longer, the music enters before the middle and the beginning is acéfalo.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where is the measure of the pickup completed?</div>
      <div class="tm-faq-a">In the last measure of the phrase: the beats of the pickup and those of the final measure add up to one whole measure. Since the exercise only shows the beginning of the melody, you only see the incomplete measure at the start.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does a rest inside the measure change the type of beginning?</div>
      <div class="tm-faq-a">No. All that counts is when the music enters in the first measure. At the hard level there are rests in the middle of the melody to throw you off, but they do not change the type of beginning.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signatures and keys are in the exercise?</div>
      <div class="tm-faq-a">The simple meters 2/4, 3/4 and 4/4 at the easy level, and the compound meters 6/8, 9/8 and 12/8 as well from the medium level. The melodies are in major keys, with their key signature.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
