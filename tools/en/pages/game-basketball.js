const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/theory/basketball/',
  esPath: '/juegos/teoria/baloncesto/',
  title: 'Basketball: Free Scale Recognition Game',
  description: 'Free music theory game, no microphone: name the full scale on the staff before time runs out. Choose a free throw, a 2-pointer or a three-pointer.',
  h1: 'Basketball: A Game to Recognize Scales',
  crumbs: [['Games', '/juegos/'], ['Theory games', '/juegos/teoria/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Recognize the scale written on the staff before time runs out.</strong> The game draws a complete scale, ascending and descending (major, natural minor, harmonic minor or melodic minor, always on a different tonic), and you press, among four options, exactly which one it is: its tonic and its type, for example &ldquo;D harmonic minor&rdquo;. Before each shot you choose whether to take a free throw, a 2-pointer or a three-pointer, and the more you risk, the more points you earn if you answer in time. You need no microphone and nothing to install: you play with the mouse, your finger or the keyboard. You can play alone or in a group (for example in class), passing the turn from player to player as in a real game.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/theory/basketball/play/" title="Music theory game: Basketball" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>

<h2>How to play</h2>

<ol>
  <li><strong>Say how many players you are</strong> (1 to play alone, or more to play as a group). If several of you play, type each player&rsquo;s name and pick your musicians.</li>
  <li><strong>Choose your musician.</strong></li>
  <li><strong>Before each shot, choose the type.</strong> Free throw (1 point, simple keys and more time), 2-pointer (2 points, more accidentals) or three-pointer (3 points, any key and less time): you decide how much to risk on each of the 9 shots.</li>
  <li><strong>Look at the staff.</strong> A complete scale appears written note by note, ascending and descending, with four answer options that give the full tonic and type (for example &ldquo;D harmonic minor&rdquo;): only one matches exactly what you see.</li>
  <li><strong>Press the correct answer as soon as you can.</strong> The circular timer shows how much time you have left for that shot.</li>
  <li><strong>If you answer correctly in time, you score the full points</strong> of the shot you chose (1, 2 or 3). If you answer wrong or time runs out, you score nothing, whatever the shot.</li>
  <li><strong>Complete the game.</strong> There are three rounds of three shots each (nine shots in all). In a group, each player takes their three shots of every round and then passes the turn: a scoreboard shows everyone&rsquo;s points at all times, and at the end you see the full ranking.</li>
</ol>

<h2>The four scales and the types of shot</h2>

<p>The game works with the four basic scales that the <a href="/ejercicios/escalas/">scale exercises</a> already cover: major, natural minor, harmonic minor and melodic minor. Every question is drawn complete, ascending and descending, so the length gives no clue: the only way to get it right is to look at the actual accidentals. Only the melodic minor scale comes down differently from how it goes up (it returns to the natural minor, with the 6th and 7th degrees unaltered); the other three come down the same way they go up.</p>

<p>The type of shot does not change which scales can appear (all four can come up on any shot) but how many accidentals the tonic can have, how much time you get to answer and how many points you earn if you are right, just like in real basketball: it does not matter how the ball goes in, what counts is the points of the type of shot.</p>

<table>
  <thead><tr><th>Shot</th><th>What changes</th><th>Points if you answer correctly</th></tr></thead>
  <tbody>
    <tr><td><strong>Free throw</strong></td><td>Tonics with few accidentals and more time to answer (15 s).</td><td>1</td></tr>
    <tr><td><strong>2-pointer</strong></td><td>Tonics with more accidentals and less time (11 s).</td><td>2</td></tr>
    <tr><td><strong>Three-pointer</strong></td><td>Any tonic, including those with the most exotic key signatures, with the shortest timer (8 s).</td><td>3</td></tr>
  </tbody>
</table>

<p>The four answer options are not random either: one shares the correct tonic but has another type (to check that you really tell the type apart), another has a nearby tonic with the same type (to check that you really read the tonic) and the last combines both. You have to get the tonic and the type right at the same time. Names follow the usual English form: C major, B&#9837; natural minor, F&#9839; melodic minor.</p>

<h2>What this game is for</h2>

<p>Recognizing a scale at a glance, by its pattern of accidentals and without working it out note by note, is the same skill you need to identify the key of a piece or to build scales with confidence in an exam. This game adds the time factor: it is not enough to be right, you have to be right fast.</p>

<p>If you prefer to work it out calmly, without a timer, there are the <a href="/ejercicios/escalas/">scale exercises</a>, with a test for each type and printable PDF worksheets. And if you want to train your ear instead of your eyes, try the <a href="/juegos/entonacion/">singing games</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is each shot scored?</div>
      <div class="tm-faq-a">Before each shot you choose a free throw (1 point), a 2-pointer (2 points) or a three-pointer (3 points): the harder it is, the more keys can come up and the less time you have, but the more points you earn if you answer correctly. Answering correctly in time scores the full points of that shot; a wrong answer or running out of time scores nothing.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many shots are in a game?</div>
      <div class="tm-faq-a">Nine per player: three rounds of three shots each. If several people play, each one takes their own nine shots on their turn.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which scales do I have to recognize?</div>
      <div class="tm-faq-a">The four basic scales: major, natural minor, harmonic minor and melodic minor, each on a different tonic in every question and always drawn complete, ascending and descending. You have to get the tonic and the type right at the same time: the answer options are full scale names, such as &ldquo;D harmonic minor&rdquo;, never just the bare type.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I need a microphone to play?</div>
      <div class="tm-faq-a">No. Basketball never uses the microphone: you play by pressing the answer with the mouse, your finger or the keyboard.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I play in a group, for example in class?</div>
      <div class="tm-faq-a">Yes. Before you start you can say how many people are playing and type each name. The game goes by turns: each player takes their three shots of every round and passes the turn to the next. A scoreboard on screen shows everyone&rsquo;s points at all times, and at the end you see the ranking and who won.</div>
    </div>
  </div>
</div>
</div>
</section>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/teoria/">All music theory games</a></li>
    <li><a href="/juegos/teoria/dardos/">Darts: recognize intervals at full speed</a></li>
    <li><a href="/ejercicios/escalas/">Scale exercises</a></li>
    <li><a href="/juegos/entonacion/">Singing games</a></li>
  </ul>
</aside>
`,
});
