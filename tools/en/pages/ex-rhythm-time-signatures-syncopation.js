const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/syncopation/',
  esPath: '/ejercicios/compases/sincopa/',
  title: 'Syncopation Exercises Online: Find the Syncopation',
  description: 'Free syncopation exercise: tap the note where the syncopation starts, or "no syncopation". Beat, half-beat and measure syncopation. Worksheets.',
  h1: 'Syncopation Exercises',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Time Signature Exercises', '/ejercicios/compases/']],
  scripts: ['tm-mei', 'tm-notacion', 'sincopa-engine', 'ficha-sincopa-engine'],
  body: `<p>A rhythm excerpt appears in 2/4, 3/4 or 4/4, with quarter notes, eighth notes, sixteenth notes and dotted rhythms. You have to <strong>tap on the staff</strong> the note where the <strong>syncopation</strong> starts (the one that is attacked on a weak beat or weak part of the beat and tied over to the next strong beat), or press "No syncopation" if the excerpt has none.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Where it starts</th><th>What it absorbs</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Beat syncopation</strong></td><td>A weak beat (beat 2 in 4/4)</td><td>The next medium-strong beat (beat 3 in 4/4)</td></tr>
    <tr><td><strong>Half-beat syncopation</strong></td><td>The weak part of a beat (the "and")</td><td>The whole next beat</td></tr>
    <tr><td><strong>Measure syncopation</strong></td><td>The last beat of the measure (weak)</td><td>The first beat of the next measure</td></tr>
  </tbody>
</table>
</div>

<h2>Syncopation quiz</h2>
<div id="tmsi"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.tmSincopaEngine) tmSincopaEngine("tmsi");
    if (window.tmFichaSincopa) tmFichaSincopa("tmfs");
    if (window.tmFichaSincopa) tmFichaSincopa("tmfsd", { dificil: true });
  });
</script>

<p><strong>How to use the exercise:</strong> choose between the <strong>normal</strong> mode (an excerpt of one or two measures, with no syncopation or at most one) and the <strong>hard</strong> mode (excerpts of 2 measures, where there can be several syncopations at once, or none). Tap the note or notes where you think each syncopation starts, or "No syncopation" if the excerpt has none, and press Check. The app corrects right away and explains why it is or is not a syncopation. Each test has 10 computer-generated questions with random notes, so the same excerpt almost never comes up twice.</p>

<p><strong>What you practice:</strong> telling a real syncopation from two classic distractors: a long note written with a tie that starts on a <em>strong</em> beat (not a syncopation), and an <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat note</a> (attacked on a weak part but with no tie, so the strong beat is attacked again). <strong>Hint:</strong> do not look only for a tie; first find where the note starts. If it starts on a weak part and carries over a strong part, there may be a syncopation.</p>

<p>The full theory, with staff examples of the three types, is in <a href="/diccionario-musical/compases/sincopa/">syncopation</a>.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: you can generate <strong>more worksheets</strong>, each with different excerpts, and print them straight from your browser. The student circles the note where the syncopation starts, or ticks the "No syncopation" box. Each sheet comes with its own solutions page.</p>
<div id="tmfs"></div>

<h2>Hard mode worksheets</h2>
<p>The advanced version on paper: excerpts of 2 measures, where there can be several syncopations at once, or none. The student circles every note where a syncopation starts, or ticks "No syncopation". Generate as many sheets as you need, each with different excerpts.</p>
<div id="tmfsd"></div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does a tie always make a syncopation?</div>
      <div class="tm-faq-a">No. For a syncopation, the note has to start on a weak part and be tied over a strong part. A tie that starts on a strong part (for example, from beat 1 to beat 2) only shows that a note is held through the next beat: it is a long note written in two pieces, not a syncopation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which types of syncopation appear?</div>
      <div class="tm-faq-a">All three: beat syncopation (beat 2 tied to beat 3), half-beat syncopation (the "and" of a beat tied to the whole next beat) and measure syncopation (the last beat of a measure tied to the first beat of the next one).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are some excerpts with a tie not syncopation?</div>
      <div class="tm-faq-a">Because the tie starts on a strong beat, not a weak one: that is only a long note written in two pieces, not a syncopation. The opposite case is also included, the off-beat note: a note attacked on a weak part but not tied to the next strong beat.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between syncopation and an off-beat note?</div>
      <div class="tm-faq-a">In syncopation the weak note is held with a tie over the strong beat, which is absorbed. In an off-beat note the note is attacked on the weak part but the strong beat is attacked again (or there is a rest), with no tie.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are there printable worksheets?</div>
      <div class="tm-faq-a">Yes. You can generate as many different worksheets as you want directly in your browser, in a normal and a hard version, each with its own solutions page, and print them freely for class.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the hard mode different from the normal one?</div>
      <div class="tm-faq-a">In the normal mode each excerpt has at most one syncopation. In the hard mode the excerpt lasts 2 measures and can have several syncopations at once (or none): you have to tap every note where one starts.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
