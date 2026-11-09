const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/intervals/custom-interval-quiz/',
  esPath: '/ejercicios/ejercicios-de-intervalos-musicales/a-medida/',
  title: 'Custom Interval Quiz: Choose Which Intervals to Practice',
  description: 'Build your own interval quiz: pick the intervals (2nd to octave), choose to identify or write the second note, and get instant feedback.',
  h1: 'Custom Interval Quiz',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Interval exercises', '/ejercicios/ejercicios-de-intervalos-musicales/']],
  scripts: ['tm-mei', 'tm-notacion', 'fichas-intervalos-engine'],
  body: `<p>The other quizzes on this site are fixed: you either practice <strong>one interval at a time</strong> (only 3rds, only 5ths) or face <strong>all of them at once</strong>. Here you choose. Tick the numbers you want, say whether you prefer to identify intervals or write them, and the quiz is built from those and nothing else.</p>

<div id="tmfg"></div>

<h2>Why choose your own intervals?</h2>
<p>A class does not move through all the intervals at once. Seconds and thirds are explained and practiced for a few weeks, and only then do fourths come in. An "all intervals" quiz arrives too early, and a thirds-only quiz is too short as soon as you have seen more than one number.</p>
<ul>
  <li><strong>Review what you have covered so far.</strong> If you have reached the 5th, tick 2nd, 3rd, 4th and 5th and the quiz asks only those.</li>
  <li><strong>Drill what goes wrong.</strong> If you mix up 6ths and 7ths, tick those two and nothing else: twenty exercises in a row on exactly that doubt.</li>
  <li><strong>Prepare for an exam.</strong> Tick the intervals that will be on the test and share the link, so students can practice at home as often as they like.</li>
</ul>

<h2>How it works</h2>
<p>The exercises are drawn at random each time, so they are <strong>never the same</strong>: you can repeat the set as often as you like and give each student a different one. They are melodic intervals in treble clef, between A3 and A5, and no pair of notes is repeated within a set.</p>
<ul>
  <li><strong>Identify</strong>: you see the written interval and give its number, its quality and whether it is ascending or descending.</li>
  <li><strong>Write</strong>: you get the first note and the interval to form, and you place the second note by clicking on the staff.</li>
  <li><strong>Difficulty</strong>: natural notes only to begin with, progressive (starts without accidentals and ends with them, like the paper worksheets), or with accidentals from the start.</li>
</ul>
<p>Every answer is checked immediately, with the right answer shown when you miss, and you get your score at the end. To work on the same material on paper, see the <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheet generator</a>, which makes printable sheets with these same options.</p>

<h2>The other interval exercises</h2>
<p>If you prefer the guided route, the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a> section has the quizzes broken into parts: <a href="/ejercicios/ejercicios-de-intervalos-musicales/distancia/">interval number</a>, <a href="/ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/">harmonic and melodic</a>, <a href="/ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/">direction</a> and one for each number, from <a href="/ejercicios/ejercicios-de-intervalos-musicales/segundas/">seconds</a> to <a href="/ejercicios/ejercicios-de-intervalos-musicales/octavas/">octaves</a>. When everything feels solid, the <a href="/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/">complete interval analysis</a> mixes it all together. And for work away from the screen, there are the printable <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval worksheets</a> with answer keys.</p>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmFichasGenerador("tmfg", { nums: [2, 3], modo: "analizar", total: 12, soloPractica: true });
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
      <div class="tm-faq-q">Can I choose which intervals are in the quiz?</div>
      <div class="tm-faq-a">Yes, that is the point of this page: tick the numbers you want (only 3rds and 5ths, or 2nd to 6th, or all seven) and the quiz asks only those. The single-interval quizzes and the complete analysis do not allow that.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are the exercises always the same?</div>
      <div class="tm-faq-a">No. They are drawn at random every time you start a set, so you can repeat it as often as you like and each student can get a different one. No pair of notes repeats within a set, so you cannot answer from memory.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I print this quiz?</div>
      <div class="tm-faq-a">This page is for solving on screen. If you want paper, the interval worksheets page has 26 ready-made sheets and a generator that creates printable sheets with the same options: you choose the intervals, how many exercises and the difficulty, and you get the sheet with its answer key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What level are the exercises?</div>
      <div class="tm-faq-a">You choose. In the natural-notes option only natural notes appear, which is how most students start. In the progressive option the set begins without accidentals and adds them gradually, like the paper worksheets. With accidentals, every interval has a sharp or a flat. There are never double accidentals.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
