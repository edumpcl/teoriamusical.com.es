const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/complete-the-measure/',
  esPath: '/ejercicios/compases/completar-compas/',
  title: 'Complete the Measure: Missing Note or Rest Quiz',
  description: 'Find the missing note or rest in a measure of 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8. Three levels, instant feedback, and a worksheet generator with solutions.',
  h1: 'Complete the Measure',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Time Signature Exercises', '/ejercicios/compases/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'ficha-completar-compas-engine'],
  body: `<p>These <strong>exercises to complete measures</strong> ask you to find what is missing: at the spot marked with a <strong>red line</strong> there is a gap, and you must say which note or rest goes there. It is the classic music-reading exercise, with three levels: <strong>one note</strong> is missing, <strong>one note or one rest</strong> is missing, or <strong>several notes</strong> are missing. Answers are checked right away, the feedback explains the count, and you can generate <strong>printable worksheets</strong> with solutions.</p>

<div id="tmcc"></div>

<h2>How to complete a measure</h2>

<ol>
  <li><strong>Look at the time signature.</strong> In 2/4, 3/4 and 4/4 the beat unit is the quarter note (UK: crotchet); in 6/8, 9/8 and 12/8 it is the dotted quarter note, which equals three eighth notes (UK: quavers).</li>
  <li><strong>Add up what is written</strong>, counting the rests too. What is missing is the difference up to a full measure (UK: bar).</li>
  <li><strong>Check where the gap is.</strong> If it is in the middle of a beat, what is missing must complete that beat; if it starts on a beat, it can be a note value that fills a whole beat.</li>
</ol>

<p>For example, in <strong>3/4</strong> with a quarter note, a gap and two eighth notes: what is written adds up to 2 beats, so 1 beat is missing, a quarter note. In <strong>6/8</strong> with a gap and three eighth notes: what is written adds up to 1 beat and another is missing, a dotted quarter note, or a quarter note and an eighth note if the gap allows two notes.</p>

<p>The measures are generated from real rhythms, grouped by beats: eighth notes are beamed by beat, and long note values start where they are actually written (a half note in 4/4 goes on beat 1 or beat 3). When several notes are missing, <strong>there can be more than one correct answer</strong>: any combination that exactly fills the missing duration is accepted, even if the score had it written another way. The feedback also shows how it was written.</p>

<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: <strong>eighteen measures</strong> with the gap marked, six from each level, on one A4 sheet. The student writes what is missing above the line. With a separate <strong>answer sheet</strong>, with the missing part in red.</p>
<figure class="tm-staff">
  <a href="/assets/img/compases/fichas/ficha-completar-compases.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/compases/fichas/preview-ficha-completar-compases.webp"><img src="/assets/img/compases/fichas/preview-ficha-completar-compases.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet to complete measures"></picture></a>
  <figcaption>A4 sheet with eighteen measures to complete.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/compases/fichas/ficha-completar-compases.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/compases/fichas/ficha-completar-compases-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You can print and photocopy it freely for class.</p>

<h2>More worksheets</h2>
<p>The same exercise on paper, for class: <strong>eighteen measures</strong> with the gap marked, six from each level, on one A4 sheet. The student writes what is missing above the line. Each sheet comes with its own answer sheet, with the missing part in red. Generate as many sheets as you need, each with different measures, and print them straight from your browser.</p>
<div id="tmfc"></div>

<h2>Before this exercise</h2>

<p>If you find it hard, first go through <a href="/ejercicios/figuras/valor-de-las-figuras/">the value of note values in each measure</a> and <a href="/ejercicios/figuras/sumar-figuras-en-un-compas/">adding up the note values in a measure</a>. To understand what a time signature says, there is the exercise on <a href="/ejercicios/compases/analizar-compas/">analyzing time signatures</a>, and the theory is on the page about <a href="/diccionario-musical/compases/">time signatures</a>. Once this goes well, <a href="/ejercicios/compases/reconocer-compas/">recognize the time signature</a> tests what you learned the other way around: working out the time signature from the written rhythm.</p>

<p>And if you want to write rhythm by ear, with the same note cards, try the <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/">rhythmic dictation</a>: you hear a rhythm of quarter notes and quarter rests and write it beat by beat.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmCompletarCompas) tmCompletarCompas('tmcc');
    if (window.tmFichaCompletarCompas) tmFichaCompletarCompas('tmfc');
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
      <div class="tm-faq-q">How do you know which note is missing in a measure?</div>
      <div class="tm-faq-a">Add up what is written, rests included, and subtract it from what fits in the measure. In 3/4 there is room for three quarter notes: if two are written, one quarter note is missing. In 6/8 the measure has two dotted-quarter-note beats (three eighth notes each): if a whole beat is missing, it can be filled with a dotted quarter note, with a quarter note and an eighth note, or with three eighth notes, depending on where the gap is.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which time signatures are in the exercise?</div>
      <div class="tm-faq-a">The simple meters 2/4, 3/4 and 4/4, where the beat is the quarter note, and the compound meters 6/8, 9/8 and 12/8, where the beat is the dotted quarter note. You can practice each group separately or mixed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can a rest be missing?</div>
      <div class="tm-faq-a">Yes, at the second level. Rests last as long as the note of the same name, so they are counted the same way; the only difference is that you choose the rest instead of the note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">When several notes are missing, is any combination accepted?</div>
      <div class="tm-faq-a">Yes, as long as it exactly fills the missing duration. A one-beat gap in 6/8 can be filled with a dotted quarter note, with a quarter note and an eighth note, or with three eighth notes, and all three answers are accepted. The feedback also shows how it was written in the score.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
