const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/',
  title: 'Rhythm Exercises: Note Values, Time Signatures, Tuplets',
  description: 'Free rhythm exercises: note values, time signatures, syncopation, off-beat notes, tuplets, phrase beginnings and endings. Instant answers, no sign-up.',
  h1: 'Rhythm Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  body: `<p>Exercises to learn and practice <strong>rhythm</strong>, from the value of each note to the time signature of a whole measure. They are grouped in four blocks that follow a sensible order. Answers are checked right away, and most exercises have printable worksheets with solutions.</p>

<h2>The four blocks</h2>

<style>
.ej-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; margin: 20px 0 36px; }
.ej-card { background: white; border-radius: 15px; padding: 26px; border: 1px solid #e8e0cc; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.ej-card h3 { margin: 0 0 10px; font-size: 1.2rem; }
.ej-card p { color: #555; font-size: 0.95rem; margin: 0 0 22px; }
.ej-card-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; color: #fff; font-weight: 800; font-size: 1.1rem; letter-spacing: .02em; }
.ej-btn { display: inline-block; margin-top: auto; align-self: flex-start; padding: 12px 24px; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
@media (max-width: 600px) {
  .ej-cards { grid-template-columns: 1fr; gap: 16px; }
  .ej-card { padding: 20px; }
  .ej-btn { display: block; text-align: center; align-self: stretch; }
}
</style>

<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2e7d32" aria-hidden="true">♩ ♪</div>
    <h3><a href="/ejercicios/figuras/" style="color:inherit;text-decoration:none">Note Values</a></h3>
    <p>Identify notes and rests, their equivalences, how long each lasts in a time signature, adding up a measure, ties and slurs, and why a dot is a tie. Six exercises.</p>
    <a href="/ejercicios/figuras/" class="ej-btn" style="background:#2e7d32">Start<span class="sr-only"> Note Values</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#5b4ea3" aria-hidden="true">3/4</div>
    <h3><a href="/ejercicios/compases/" style="color:inherit;text-decoration:none">Time Signatures</a></h3>
    <p>Analyze a time signature, complete a measure, recognize the time signature from the rhythm, and find syncopation and off-beat notes.</p>
    <a href="/ejercicios/compases/" class="ej-btn" style="background:#5b4ea3">Start<span class="sr-only"> Time Signatures</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#8b6914" aria-hidden="true">3</div>
    <h3><a href="/ejercicios/grupos-de-valoracion-especial/" style="color:inherit;text-decoration:none">Tuplets</a></h3>
    <p>What simple note value each triplet, duplet, quadruplet and sextuplet equals, in three levels, and then which time signature a measure of tuplets is in.</p>
    <a href="/ejercicios/grupos-de-valoracion-especial/" class="ej-btn" style="background:#8b6914">Start<span class="sr-only"> Tuplets</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#1f6f8b;font-size:.85rem" aria-hidden="true">▶ ■</div>
    <h3>Phrase Beginnings and Endings</h3>
    <p>Two exercises that look at the first and last measures of a melody: how it starts (<a href="/ejercicios/comienzo-tetico-anacrusico-acefalo/">on the downbeat, on a pickup or after a rest</a>) and how it ends (<a href="/ejercicios/final-tiempo-fuerte-y-debil/">on a strong or a weak beat</a>).</p>
    <a href="/ejercicios/comienzo-tetico-anacrusico-acefalo/" class="ej-btn" style="background:#1f6f8b">Start<span class="sr-only"> Phrase Beginnings</span></a>
  </div>
</section>

<h2>A sensible order</h2>

<ol>
  <li><strong>Note values.</strong> First recognize the notes and rests, then their equivalences (which do not depend on the time signature) and then their value in beats, which does.</li>
  <li><strong>Time signatures.</strong> With the note values clear, analyze time signatures, complete measures and recognize the time signature from the rhythm. Syncopation and off-beat notes come last, because they need a good sense of strong and weak beats.</li>
  <li><strong>Tuplets.</strong> Triplets, duplets, quadruplets and sextuplets. They need the value of notes in beats, and they lead to a harder exercise: naming the time signature of a measure made of tuplets.</li>
  <li><strong>Phrase beginnings and endings.</strong> These use everything above: you have to know which beat is the strong one before you can say where a melody starts and ends.</li>
</ol>

<p>The theory is in the dictionary: <a href="/diccionario-musical/figuras-musicales/">note values</a>, <a href="/diccionario-musical/compases/">time signatures</a>, <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplets</a> and <a href="/diccionario-musical/la-frase-musical/">the musical phrase</a>. To feel the pulse of each meter, use the <a href="/herramientas/metronomo/">online metronome</a>. To recognize a time signature by ear, there is the <a href="/ejercicios/auditivos/reconocer-el-compas/">ear-training exercise</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which rhythm exercises are there?</div>
      <div class="tm-faq-a">Four blocks: note values (six exercises), time signatures (five exercises, including syncopation and off-beat notes), tuplets (two exercises) and phrase beginnings and endings (two exercises). All of them are checked right away.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where should I start?</div>
      <div class="tm-faq-a">With note values: identify notes and rests, then their equivalences and their value in each time signature. Then move on to time signatures, tuplets and, last, phrase beginnings and endings.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are there printable worksheets?</div>
      <div class="tm-faq-a">Yes. Most exercises have worksheets with solutions, either as ready-made PDFs or generated in your browser, each with different questions, so you can print as many as you need for class.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
