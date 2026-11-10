const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/theory/soccer/',
  esPath: '/juegos/teoria/futbol/',
  title: 'Soccer: Free Interval-Building Music Theory Game',
  description: 'Free music theory game, no microphone: each pass is an interval you write on the staff, and the passes chain into a goal. Solo or in class.',
  h1: 'Soccer: A Game to Build Intervals',
  crumbs: [['Games', '/juegos/'], ['Music theory games', '/juegos/teoria/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Build intervals on the staff and reach the goal.</strong> This is soccer (UK: football) played on a field whose lines are the lines of a staff. Every pass is an interval: the game asks for, for example, an <strong>ascending minor 6th from D</strong> and you write the other note, with its accidental. The note you write is the one of the <strong>teammate who receives the ball</strong>, so the next interval starts from it: the passes chain together and draw a melody across the field. Three passes and a shot per attack, and <strong>only goals count</strong>. There is no microphone and nothing to install, and you can play alone or in a group, taking turns.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/theory/soccer/play/" title="Music theory game: Soccer" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>

<h2>How to play</h2>

<ol>
  <li><strong>Say how many players there are</strong> and choose the level: Easy, Medium or Hard. If several of you are playing, type each player&rsquo;s name and pick your musicians.</li>
  <li><strong>Read the interval you are asked for</strong>: quality, number, direction and starting note, which you also see written on the staff.</li>
  <li><strong>Write the other note</strong> by tapping its line or space on the staff and choosing the accidental (sharp, flat or natural). While you place it, your teammate runs to that height on the field. On a computer you can also use the arrow keys and the Enter key.</li>
  <li><strong>Pass or shoot.</strong> If the note is exact, the ball reaches your teammate (or goes into the goal). If not, the opponent steals the ball or the goalkeeper saves it, and the game shows you the right note in green.</li>
  <li><strong>Play all 5 attacks.</strong> If you play as a group, the attacks alternate, as in a real match: after a goal or a steal, the ball goes to the other player.</li>
</ol>

<h2>How scoring works</h2>

<p>As in real soccer, <strong>only goals count</strong>. Passes earn no points, but without them you never reach the goal: a goal takes <strong>four intervals in a row with no mistakes</strong>, three passes and the shot. A match has 5 attacks, so the maximum is <strong>5 goals</strong>.</p>

<p>Every answer is <strong>right or wrong, with nothing in between</strong>: the note and the accidental must be exact. An enharmonic note does not count (if you are asked for a major 3rd up from E, the answer is G&sharp;, not A&flat;), just as in a theory exam. Answering fast does not score more goals: the time for each interval (25 s on Easy, 20 s on Medium and 15 s on Hard) is only there so the match does not drag on.</p>

<p>If several of you play and the leaders tie on goals, there is a <strong>penalty shootout</strong>: each player takes one interval per round and, if in a round some score and others miss, only those who scored go on, until one is left. The shootout decides who wins, but its goals do not count toward the leaderboard.</p>

<h2>The intervals at each level</h2>

<p>The intervals are the same as in the <a href="/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/">build intervals exercise</a>: simple intervals, from the 2nd to the octave, ascending and descending, in treble clef and between the A below the staff and the B above it.</p>

<ul>
  <li><strong>Easy:</strong> <a href="/diccionario-musical/intervalos/">major, minor and perfect intervals</a> between natural notes, with no accidentals.</li>
  <li><strong>Medium:</strong> adds augmented and diminished intervals, and notes with one sharp or flat.</li>
  <li><strong>Hard:</strong> also double sharps and double flats, and notes such as E&sharp; or C&flat;.</li>
</ul>

<p><strong>The trick to build an interval in two steps:</strong> first the number, then the quality. For the number, count the letter names including the starting note (a 6th up from D reaches B: D, E, F, G, A, B). Then adjust the half steps with the accidental: from D to B natural is 9 half steps, a major 6th; a minor 6th needs 8, so the answer is B&flat;.</p>

<h2>What this game is for</h2>

<p>Building intervals is the other side of recognizing them, and it is what written conservatory exercises ask for: writing a diminished 7th or an augmented 4th above any note without hesitating over the accidental. Because the passes chain, each one starts from a different note, sometimes altered, just as in a real melody. If you would rather practice without a scoreboard, there are the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a>. And if you like games, also try <a href="/juegos/teoria/dardos/">Darts</a>, where you recognize intervals instead of building them.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you play Soccer?</div>
      <div class="tm-faq-a">Each attack is three passes and a shot, and each one is an interval: the game tells you, for example, &ldquo;ascending minor 6th from D&rdquo; and you write the other note on the staff, with its accidental. The note you write is the one of the teammate who receives the ball, so the next interval is built from it. If you miss a pass, the opponent steals the ball; if you miss the shot, the goalkeeper saves it.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does scoring work?</div>
      <div class="tm-faq-a">Only goals count, as in real soccer. A goal takes four intervals in a row with no mistakes (three passes and the shot). A match has 5 attacks, so the maximum is 5 goals. The answer is right or wrong, with nothing in between: the note and the accidental must be exact, and an enharmonic note does not count.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does speed count?</div>
      <div class="tm-faq-a">No. Answering fast does not score more goals. Each interval has a time limit (25 seconds on Easy, 20 on Medium and 15 on Hard) so the match does not drag on; if it runs out, the pass or the shot counts as missed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which intervals come up at each level?</div>
      <div class="tm-faq-a">On Easy, major, minor and perfect intervals between natural notes. Medium adds augmented and diminished intervals and notes with one sharp or flat. Hard also brings double sharps and double flats and notes such as E&sharp; or C&flat;. All of them are simple intervals, from the 2nd to the octave, ascending and descending.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I play in a group, for example in class?</div>
      <div class="tm-faq-a">Yes. Say how many players there are and type each player&rsquo;s name. The attacks alternate, as in a real match: after a goal or a steal, the ball goes to the other player. If the leaders tie on goals at the end, it is decided in a sudden-death penalty shootout.</div>
    </div>
  </div>
</div>
</div>
</section>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/teoria/">All music theory games</a></li>
    <li><a href="/diccionario-musical/intervalos/">Musical intervals</a></li>
    <li><a href="/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/">Exercise: build intervals</a></li>
    <li><a href="/juegos/teoria/dardos/">Darts: recognize intervals</a></li>
    <li><a href="/juegos/teoria/bolos/">Bowling: recognize triads</a></li>
  </ul>
</aside>
`,
});
