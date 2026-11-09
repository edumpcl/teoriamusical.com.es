const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/',
  esPath: '/ejercicios/compases/',
  title: 'Time Signature Exercises: Free Online Quizzes',
  description: 'Time signature exercises: analyze a time signature, complete measures with a missing note, recognize the time signature from rhythm, find syncopation.',
  h1: 'Time Signature Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  body: `<p>Exercises to practice <a href="/diccionario-musical/compases/">time signatures</a>: understanding what a time signature says, completing measures that are missing a note, recognizing the time signature from the written rhythm, finding syncopation and finding off-beat notes. Answers are checked right away.</p>

<h2>The exercises</h2>

<ol>
  <li><strong><a href="/ejercicios/compases/analizar-compas/">Analyze time signatures</a></strong>: you see a time signature (2/4, 6/8, 9/16, 3/2…) and say whether it is simple or compound, how many beats it has, how it subdivides, and what its beat, subdivision and measure units are.</li>
  <li><strong><a href="/ejercicios/compases/completar-compas/">Complete the measure</a></strong>: a measure of 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8 is missing something at a marked spot, and you say which note, which rest or which notes are missing. Three levels.</li>
  <li><strong><a href="/ejercicios/compases/reconocer-compas/">Recognize the time signature</a></strong>: you see a measure written without its time signature and tap the top and bottom numbers that belong to it. When the rhythm can be written in more than one way (3/4 and 6/8 last the same), both are accepted.</li>
  <li><strong><a href="/ejercicios/compases/sincopa/">Syncopation</a></strong>: you see a rhythmic excerpt and tap the note where the syncopation starts (or "no syncopation" if there is none), telling it apart from a long tied note and from an off-beat note.</li>
  <li><strong><a href="/ejercicios/compases/contratiempo/">Off-beat notes</a></strong>: you see a rhythmic excerpt and tap the note that is off the beat (or "no off-beat" if there is none), telling it apart from a normal entrance and from true syncopation.</li>
</ol>

<p>To recognize the time signature <strong>by ear</strong>, without seeing the score, there is the ear-training exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature by ear</a>.</p>

<p>The recommended order is the one above: first understand the time signature, then complete measures, and finally recognize it from the rhythm when it is not written. In between, the <a href="/ejercicios/figuras/">note value and rhythm exercises</a> help, especially <a href="/ejercicios/figuras/valor-de-las-figuras/">the value of note values in each measure</a> and <a href="/ejercicios/figuras/sumar-figuras-en-un-compas/">adding up the note values in a measure</a>.</p>

<p>The theory is in the dictionary: <a href="/diccionario-musical/compases/">time signatures</a>, <a href="/diccionario-musical/compases/compas-simple-y-compuesto/">simple and compound meter</a> and <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">beat unit and measure unit</a>. To internalize the pulse of each meter, use the <a href="/herramientas/metronomo/">online metronome</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signature exercises are there?</div>
      <div class="tm-faq-a">Five: analyze time signatures, where you see a time signature and say whether it is simple or compound, its beats and its units; complete the measure, where a measure is missing a note or a rest and you say which; recognize the time signature, where you see the written rhythm without its time signature and work it out; syncopation, where you tap on the staff the note where the syncopation starts; and off-beat notes, where you tap the note that is off the beat. All five are checked right away.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signatures are included?</div>
      <div class="tm-faq-a">In analyze time signatures, twenty different time signatures, from common to uncommon ones (2/1, 9/16…). In complete the measure and recognize the time signature, the six most common: 2/4, 3/4, 4/4, 6/8, 9/8 and 12/8.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
