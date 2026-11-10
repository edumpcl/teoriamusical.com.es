const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/theory/darts/',
  esPath: '/juegos/teoria/dardos/',
  title: 'Darts: Free Interval Recognition Game',
  description: 'Free music theory game: read the two notes on the staff and pick the interval. The faster you answer, the closer your dart lands to the bullseye.',
  h1: 'Darts: A Game to Recognize Intervals',
  crumbs: [['Games', '/juegos/'], ['Theory games', '/juegos/teoria/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Recognize the interval written on the staff before time runs out.</strong> The game draws two notes and you press, among several options, the correct interval: the faster you answer, the closer to the center of the board your dart lands. You need no microphone and nothing to install: you play with the mouse, your finger or the keyboard. You can play alone or in a group (for example in class), passing the turn from player to player as in a real game of darts.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/theory/darts/play/" title="Music theory game: Darts" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>

<h2>How to play</h2>

<ol>
  <li><strong>Say how many players you are</strong> (1 to play alone, or more to play as a group). If several of you play, type each player&rsquo;s name; the musician and the difficulty are the same for everyone, so the comparison is fair.</li>
  <li><strong>Choose your musician</strong> and pick the difficulty.</li>
  <li><strong>Look at the staff.</strong> Two notes appear, the interval they form, and four answer options (for example Major 3rd or Perfect 5th).</li>
  <li><strong>Press the correct answer as soon as you can.</strong> The circular timer shows how much time you have left for that dart.</li>
  <li><strong>Watch where the dart lands.</strong> If you answer correctly in the first quarter of the time, it lands in the bullseye (50 points); if you take longer, in the triple ring (25), the double ring (15) or the outer zone (5). If you answer wrong or time runs out, the dart goes off the board and scores nothing.</li>
  <li><strong>Complete the game.</strong> There are three rounds of three darts each (nine darts in all), just like real darts. In a group, each player throws their three darts of every round and then passes the turn: a scoreboard shows everyone&rsquo;s points at all times, and at the end you see the full ranking.</li>
</ol>

<h2>The three difficulties</h2>

<p>They follow the same three levels as the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a> on this site:</p>

<table>
  <thead><tr><th>Difficulty</th><th>What it includes</th><th>Answer time</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>Natural notes only, no sharps or flats; major, minor and perfect intervals.</td><td>12 s</td></tr>
    <tr><td><strong>Medium</strong></td><td>Simple sharps and flats; augmented and diminished intervals are added.</td><td>9 s</td></tr>
    <tr><td><strong>Hard</strong></td><td>Double accidentals (double sharp, double flat) and doubly augmented or diminished intervals.</td><td>7 s</td></tr>
  </tbody>
</table>

<p>Answers are named quality first, as in the <a href="/diccionario-musical/intervalos/intervalos-musicales/">interval dictionary</a>: Major 3rd, Perfect 5th, Diminished 5th, Augmented 4th, and so on. The intervals go from the 2nd to the octave, and each one can appear ascending or descending.</p>

<h2>What this game is for</h2>

<p>Recognizing an interval at a glance, without counting note by note, is the same skill you need to sight-read or to understand a new score quickly. This game adds the time factor: it is not enough to be right, you have to be right fast, just as when you read a piece at tempo without stopping to analyze every measure.</p>

<p>If you prefer to work it out calmly, without a timer, there are the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">musical interval exercises</a>, with a test for each interval number and printable PDF worksheets. And if you want to train your ear by singing intervals, try the <a href="/juegos/entonacion/salto-de-altura/">high jump</a> game.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is each dart scored?</div>
      <div class="tm-faq-a">If you answer correctly in the first quarter of the time, the dart lands in the bullseye (50 points). If you take longer, it lands in the triple ring (25), the double ring (15) or the outer zone (5). If you answer wrong or time runs out, the dart goes off the board and scores nothing.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many darts are in a game?</div>
      <div class="tm-faq-a">Nine per player: three rounds of three darts each, as in real darts. If several people play, each one throws their own nine darts on their turn.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I need a microphone to play?</div>
      <div class="tm-faq-a">No. Darts never uses the microphone: you play by pressing the answer with the mouse, your finger or the keyboard.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What difficulties are there?</div>
      <div class="tm-faq-a">Easy (natural notes, major, minor and perfect intervals), Medium (with sharps and flats, adding augmented and diminished intervals) and Hard (with double accidentals), the same three levels used by the interval exercises on this site.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I play in a group, for example in class?</div>
      <div class="tm-faq-a">Yes. Before you start you can say how many people are playing and type each name. The game goes by turns, as in real darts: each player throws their three darts of every round and passes the turn to the next. A scoreboard on screen shows everyone&rsquo;s points at all times, and at the end you see the ranking and who won.</div>
    </div>
  </div>
</div>
</div>
</section>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/teoria/">All music theory games</a></li>
    <li><a href="/ejercicios/ejercicios-de-intervalos-musicales/">Musical interval exercises</a></li>
    <li><a href="/diccionario-musical/intervalos/intervalos-musicales/">Interval dictionary</a></li>
    <li><a href="/juegos/entonacion/salto-de-altura/">High jump: sing an interval</a></li>
    <li><a href="/juegos/teoria/bolos/">Bowling: recognize triads</a></li>
    <li><a href="/juegos/entonacion/">Singing games</a></li>
  </ul>
</aside>
`,
});
