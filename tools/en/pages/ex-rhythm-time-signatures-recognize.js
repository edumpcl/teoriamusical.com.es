const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/recognize-time-signature/',
  esPath: '/ejercicios/compases/reconocer-compas/',
  title: 'Recognize the Time Signature: Quiz With Answers',
  description: 'Work out the time signature (2/4, 3/4, 4/4, 6/8, 9/8, 12/8) from the written rhythm. Instant feedback, worksheet generator and explanations.',
  h1: 'Recognize the Time Signature',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Time Signature Exercises', '/ejercicios/compases/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'reconocer-compas-engine', 'ficha-reconocer-compas-engine'],
  body: `<p>In this exercise to <strong>recognize time signatures</strong> you see a measure written without its time signature: you tap the <strong>top number</strong> (numerator) and the <strong>bottom number</strong> (denominator) that belong to it. Answers are checked right away, and the feedback explains how many beats the measure has and what its beat unit is. You can also generate <strong>printable worksheets</strong> with solutions.</p>

<p>Want to do it by ear? In the ear-training exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature by ear</a> you listen to a melody with the first beat accented and choose the time signature without seeing the score.</p>

<div id="tmrc"></div>

<style>
  .tm-rc-ejemplo{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;margin:14px 0 18px;}
  .tm-rc-ejemplo > div{text-align:center;}
  .tm-rc-ejemplo p{font-size:.85rem;color:#514232;margin:4px 0 0;}
</style>

<h2>How to recognize a time signature</h2>

<ol>
  <li><strong>Look at how the notes are grouped.</strong> In simple meters the beats usually divide into two parts; in compound meters, into three. The clearest clue is the eighth notes: beamed in twos they point to a simple meter, in threes to a compound one.</li>
  <li><strong>Count the top number.</strong> In simple meters (2/4, 3/4, 4/4) the top number is simply the number of beats. In compound meters (6/8, 9/8, 12/8) the top number counts the eighth notes in the whole measure, which are grouped in threes to form the beats: 6/8 has 2 beats, 9/8 has 3 and 12/8 has 4.</li>
  <li><strong>Work out the bottom number.</strong> It gives the reference note value: 4 is the quarter note (UK: crotchet) and 8 is the eighth note (UK: quaver). In simple meters that note value is the beat unit. In compound meters, the bottom number gives the note value that is grouped in threes (the eighth note, if it is 8), but the beat unit is the next larger note value with a dot: a dotted quarter note, not a dotted eighth note. Among the answer options there are also other valid bottom numbers: whole note (1), half note (2), sixteenth note (16) and thirty-second note (32). In the exercise these are wrong answers, except that 2/2 is always accepted as an alternative to 4/4 (see the questions below).</li>
</ol>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Time signature</th><th>Top number</th><th>Grouping</th><th>Beats</th></tr></thead>
  <tbody>
    <tr><td>2/4</td><td>2</td><td>2 quarter notes</td><td>2</td></tr>
    <tr><td>3/4</td><td>3</td><td>3 quarter notes</td><td>3</td></tr>
    <tr><td>4/4</td><td>4</td><td>4 quarter notes</td><td>4</td></tr>
    <tr><td>6/8</td><td>6</td><td>2 groups of 3 eighth notes</td><td>2</td></tr>
    <tr><td>9/8</td><td>9</td><td>3 groups of 3 eighth notes</td><td>3</td></tr>
    <tr><td>12/8</td><td>12</td><td>4 groups of 3 eighth notes</td><td>4</td></tr>
  </tbody>
</table>
</div>

<p>Some measures <strong>last exactly the same</strong> when written in another way: three quarter notes (3/4) take up the same time as two dotted quarter notes (6/8). The difference is in how the eighth notes are grouped, not in the total length:</p>

<div class="tm-rc-ejemplo">
  <div><div id="tm-rc-ej-34"></div><p>3/4: three quarter-note beats</p></div>
  <div><div id="tm-rc-ej-68"></div><p>6/8: two dotted-quarter-note beats</p></div>
</div>

<p>If the written rhythm has no eighth notes to show that grouping (for example, a dotted half note filling the whole measure), there is no way to tell them apart just by looking at the rhythm: <strong>both time signatures are correct</strong>, and the exercise accepts both. Nothing is missing from your knowledge: the written rhythm simply gives no more information to choose between the two.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: <strong>eighteen measures</strong> without a time signature, six simple, six compound and six mixed, on one A4 sheet. The student writes the time signature in the box. Each sheet comes with its own solutions page, including the cases where two time signatures are correct. Generate as many sheets as you need, each with different measures, and print them straight from your browser.</p>
<div id="tmfr"></div>

<h2>Before this exercise</h2>

<p>If you find the beats hard to recognize, first go through <a href="/ejercicios/compases/analizar-compas/">analyzing time signatures</a>, which explains what each time signature says, and <a href="/ejercicios/figuras/valor-de-las-figuras/">the value of note values in each measure</a>. The full theory is on the page about <a href="/diccionario-musical/compases/">time signatures</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmFichaReconocerCompas) tmFichaReconocerCompas('tmfr');
    if (window.tmReconocerCompas) tmReconocerCompas('tmrc');
    if (window.tmCompletarCompasData) {
      var D = window.tmCompletarCompasData;
      var ejemplos = function () {
      D.dibujarMedida(document.getElementById('tm-rc-ej-34'), '3/4', [{ f: 'n', s: false }, { f: 'n', s: false }, { f: 'n', s: false }], { w: 180 });
      D.dibujarMedida(document.getElementById('tm-rc-ej-68'), '6/8', [{ f: 'c', s: false }, { f: 'c', s: false }, { f: 'c', s: false }, { f: 'c', s: false }, { f: 'c', s: false }, { f: 'c', s: false }], { w: 180 });
      };
      if (window.tmNotacion) window.tmNotacion.listo().then(ejemplos); else ejemplos();
    }
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
      <div class="tm-faq-q">How do you find the top number of a time signature?</div>
      <div class="tm-faq-a">In simple meters, the top number is the number of beats. In compound meters, the top number counts the eighth notes in the whole measure (6, 9 or 12), which are grouped in threes to form the beats: 6/8 has 2 beats, 9/8 has 3 and 12/8 has 4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the bottom number?</div>
      <div class="tm-faq-a">The bottom number gives the reference note value: 4 is the quarter note and 8 is the eighth note. In simple meters, that note value is the beat unit. In compound meters, the bottom number gives the note value that is grouped in threes (the eighth note, if it is 8), but the beat unit is the next larger note value with a dot: a dotted quarter note, not a dotted eighth note. The answer options also include other valid bottom numbers (1, 16 and 32), which in this exercise are never the correct answer and are there so that you cannot get it right by elimination. The 2 is different: any 4/4 also accepts 2/2 (two half-note beats instead of four quarter-note beats), so both are always correct. For the same reason, any 2/4 also accepts 4/8: both fit exactly the same.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are two time signatures sometimes correct?</div>
      <div class="tm-faq-a">For two different reasons. Sometimes the measure lasts exactly the same when written another way (three quarter notes in 3/4 take up the same time as two dotted quarter notes in 6/8) and the written rhythm has no short note value to show how the beats are grouped; then you cannot tell one from the other just by looking at the rhythm, and both are accepted. Separately, any 4/4 measure also accepts 2/2 (two half-note beats instead of four quarter-note beats), and any 2/4 also accepts 4/8: in practice they are used interchangeably, so in those two cases both time signatures are always correct. In neither case is something missing from your knowledge: the written rhythm simply does not allow a single answer.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signatures are in the exercise?</div>
      <div class="tm-faq-a">The simple meters 2/4, 3/4 and 4/4, and the compound meters 6/8, 9/8 and 12/8. You can practice each group separately or mixed. The time signatures 2/2 and 4/8 are never asked, but they are always accepted as a second correct answer for any 4/4 and 2/4, respectively.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
