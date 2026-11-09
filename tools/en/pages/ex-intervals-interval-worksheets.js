const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/interval-worksheets/',
  esPath: '/ejercicios/ejercicios-de-intervalos-en-pdf/',
  title: 'Interval Worksheet Generator: Printable Intervals',
  description: 'Generate printable music interval worksheets with answer keys, or practice on screen. Choose 2nd to octave, treble clef, new sheet every time. Free.',
  h1: 'Interval Worksheets with Answer Keys',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'fichas-intervalos-engine'],
  body: `<p>Two ways to practice intervals, both with solutions: a <strong>generator</strong> that creates new exercises every time, to <strong>print</strong> or to <strong>solve on screen</strong> with automatic correction. Everything is in treble clef with melodic intervals, free, and you may photocopy the sheets for your class.</p>

<h2 id="generator">Generator: make your own worksheet or practice on screen</h2>
<p>Choose which intervals you want, whether they include accidentals and how many exercises, and the generator creates a <strong>new sheet every time</strong>, with its answer key, ready to print. The exercises are drawn on the spot with fixed rules, so they never run out: each student can take home a different sheet, and the test in June is not the same as the test in September.</p>

<div id="tmfg"></div>

<p>In <strong>practice on screen</strong> the exercises come one at a time: in <em>identify</em> mode you choose the number, the quality and whether it goes up or down, and in <em>write</em> mode you place the second note by clicking on the staff. Every answer is checked immediately and you get your score at the end.</p>

<p>Every sheet has its own number (<em>sheet no. 4821</em>). If you add <code>?hoja=4821</code> to the end of this page's address, that exact same sheet comes up again. That is handy for reprinting it or for giving the same sheet to a whole class.</p>

<h2>What the sheets look like</h2>
<p>Each sheet starts easy and ends hard, so a single page works from the first day to the exam review:</p>
<ul>
  <li><strong>The first exercises use natural, ascending notes.</strong> With no sharps or flats, the student only has to count and compare: the qualities that come straight out of the natural scale (major and minor 3rds, perfect 5ths and the diminished 5th B–F…).</li>
  <li><strong>Then the directions are mixed.</strong> Descending intervals appear, which is where almost everybody slips when counting.</li>
  <li><strong>The last part has accidentals.</strong> Sharps and flats, with some augmented or diminished intervals, in random order.</li>
  <li><strong>No two exercises on a sheet use the same notes</strong>, so the answers cannot be memorized.</li>
</ul>
<p>The notes stay between A3 and A5: two ledger lines at most, with no impossible reading. And there are no double accidentals.</p>

<h2>Single-interval and mixed sheets</h2>
<p>Use the generator in two ways, depending on where the class is:</p>
<ul>
  <li><strong>One interval at a time</strong> (for example only 3rds), when you have just explained an interval and it is time to fix it. The student only has to decide the quality.</li>
  <li><strong>Mixed intervals</strong> in cumulative levels: 2nd and 3rd, then up to the 4th, up to the 5th&hellip; up to the 8th. Knowing that every exercise on the sheet is a 3rd gives away half of the answer. With mixed numbers, the student has to do the whole job: first count how many positions the interval covers, then look at the half steps (UK: semitones). The 2nd-to-8th level is the general review before an exam.</li>
</ul>

<h2>How to use them in class</h2>
<p>They are designed for music theory classes in music schools and conservatories, and work just as well in private lessons:</p>
<ul>
  <li><strong>In blocks, not all at once.</strong> The first two staves (twelve exercises) are enough for an introductory session; keep the rest for later ones.</li>
  <li><strong>Single-interval sheet first, mixed sheet after.</strong> A sheet with one number fixes the quality; the mixed one checks that the student really can count the interval when nobody says which one it is.</li>
  <li><strong>Identify and write on the same day.</strong> Recognizing a written interval and building one are different skills: a student who spots a minor 6th at once can get stuck writing one downward.</li>
  <li><strong>Self-correction.</strong> Give the student the answer key at the end: seeing it next to the sheet shows at a glance where the mistakes were, which teaches more than a red number in the margin.</li>
  <li><strong>Timer for older students.</strong> A full sheet of 2nds or 3rds in five minutes is a good sight-reading goal for an advanced beginner.</li>
</ul>

<h2>The same exercises, on screen</h2>
<p id="tm-cierre">If you prefer automatic correction, every interval number has its own interactive quiz with three difficulty levels and notation generated on the fly. Start with the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a>, pick which intervals to include in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/a-medida/">custom interval quiz</a>, or go straight to the <a href="/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/">complete interval analysis</a>, which mixes number, quality and arrangement. To review the theory before printing anything, see the page on <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<script>
  document.addEventListener("DOMContentLoaded", function () { tmFichasGenerador("tmfg"); });
</script>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do the interval exercises come with solutions?</div>
      <div class="tm-faq-a">Yes. Every sheet has its own answer key with the same layout as the student sheet. On the identify sheets, the key shows the quality and the direction (M3 ascending, m3 descending…); on the write sheets, the correct note is drawn in.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between single-interval and mixed sheets?</div>
      <div class="tm-faq-a">On a single-interval sheet every exercise has the same number (all 3rds, all 5ths), so you only have to decide the quality. On a mixed sheet the numbers are combined by levels: 2nd and 3rd, then up to the 4th, up to the 5th&hellip; up to the 8th. There the student has to count first how many positions each interval covers, which is the step that gets skipped when the whole sheet has the same number.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are they suitable for beginners, or do you need to know accidentals?</div>
      <div class="tm-faq-a">They work from the very beginning. Almost half of every sheet is intervals between natural notes, with no sharps or flats, and ascending: you only have to count lines and spaces. Accidentals come in the second half, and there are never double sharps or double flats.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which clef are the exercises in?</div>
      <div class="tm-faq-a">All of them are in treble clef, and all the intervals are melodic (the two notes come one after the other, not together). The notes stay between A3 and A5, with two ledger lines at most.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many exercises does each sheet have?</div>
      <div class="tm-faq-a">A full sheet has forty-two intervals, in seven staves of six exercises, on one side of A4 paper. You can also make shorter sheets of 12 or 24. No exercise repeats the same pair of notes within a sheet.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I photocopy them for my students?</div>
      <div class="tm-faq-a">Yes, classroom use is free: print them, photocopy them and hand them out in class or send them home. We only ask that you do not republish them as your own on another website.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
