const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/obstacle-race/',
  esPath: '/juegos/entonacion/carrera-de-obstaculos/',
  title: 'Obstacle Race: Interval Singing Game (Steeplechase)',
  description: 'Free singing game inspired by the steeplechase (3000 m obstacle race): sing 8 intervals in a row from a base note. You clear each one only when in tune.',
  h1: 'Obstacle Race: A Game to Sing Intervals',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing 8 obstacles in a row and run the race with your voice.</strong> The game combines two others: as in the <a href="/juegos/entonacion/vallas/">hurdles</a>, you do not move on to the next obstacle until you have cleared the current one; as in the <a href="/juegos/entonacion/salto-de-altura/">high jump</a>, each obstacle is cleared by singing an interval (a base note and a leap). The difference is that here <strong>the leap can go up or down</strong>: you do not know the direction in advance, so it is the hardest of the nine games and the last one. There are 6 hurdles and 2 water jumps, the 4th and the 8th (a water jump is a hurdle with a pool of water on the other side). It works in the browser on your phone or computer, with nothing to install.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/obstacle-race/play/" title="Singing game: Obstacle Race" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s run!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name, pick the difficulty and the intervals you want to practice.</li>
  <li><strong>Look at the preview.</strong> You see the 8 obstacles of the race (the interval of each one), but you do not hear them yet: there is nothing to memorize in advance.</li>
  <li><strong>Sing each obstacle in two steps, live.</strong> When you reach it, its base note plays; as soon as you tune it, the note of the leap plays so that you can chase it (in Master mode it does not play: you build it by ear from the interval already written). You have a window of about 4 seconds per obstacle to tune both notes.</li>
  <li><strong>If you do not complete the obstacle in time, you stumble</strong> and the race goes on to the next one, but a penalty is added to your time.</li>
  <li><strong>Check your final time.</strong> If you clear all 8 obstacles instantly, you run it in about 18.0 s; the benchmark for this game is 19.1 s. If you stumble on all 8, you are disqualified and no time is recorded.</li>
</ol>

<p>You can sing <strong>in whatever octave is comfortable</strong>: the game compares the note name, not the octave.</p>

<h2>The intervals, in both directions</h2>

<p>You choose which intervals can come up; the base note is always C, D, E, F, G or A. Unlike the <a href="/juegos/entonacion/salto-de-altura/">high jump</a>, here each obstacle also decides, at random, whether the leap goes up or down:</p>

<table>
  <thead><tr><th>Intervals</th><th>Which ones</th><th>Half steps</th></tr></thead>
  <tbody>
    <tr><td><strong>2nds &amp; 3rds</strong></td><td>minor 2nd, major 2nd, minor 3rd and major 3rd</td><td>1, 2, 3 and 4</td></tr>
    <tr><td><strong>4ths &amp; 5ths</strong></td><td>perfect 4th and perfect 5th</td><td>5 and 7</td></tr>
    <tr><td><strong>6ths &amp; 7ths</strong></td><td>minor 6th, major 6th, minor 7th and major 7th</td><td>8, 9, 10 and 11</td></tr>
    <tr><td><strong>All</strong></td><td>All of the above, from 1 to 11 half steps</td><td>1 to 11</td></tr>
  </tbody>
</table>

<p>If you do not remember how intervals are counted, review <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a> (UK: a half step is a semitone). It is best to start with 2nds and 3rds before taking on a whole race where the direction changes at every obstacle.</p>

<h2>The three difficulties</h2>

<p>They change how much help you get and how strict the tuning is (the margin is measured in cents; a half step is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Margin</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the names of the two notes of each obstacle (for example, G → E) before and during the race.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>You see the name of the interval and its direction (↑ or ↓) for each obstacle, and you hear both notes.</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>You still see the interval and its direction, but you hear only the base note: you have to build the note of the leap by ear.</td></tr>
  </tbody>
</table>

<h2>Why 8 obstacles: 6 hurdles and 2 water jumps</h2>

<p>The 3000-meter obstacle race, known in English as the <strong>steeplechase</strong>, is a real track and field event with 28 hurdles and 7 water jumps: in each lap, 4 hurdles and a water jump, which is a hurdle with a pool of water on the other side. Its hurdles are fixed and heavy, with a thick black-and-white striped bar, and lower than the 110-meter hurdles (91.4 cm for men): they do not fall over, and runners can step on them. In the game there are 8 obstacles: 3 hurdles and a water jump, twice. The game borrows that format, not its duration: the real race lasts several minutes, while here each obstacle is sung in a few seconds. That is why the 19.1 s &ldquo;benchmark&rdquo; is just a figure for this game, not a track and field record. It is scored by time, as in the <a href="/juegos/entonacion/vallas/">hurdles</a>: you have to clear each obstacle as fast as you can; the water jumps, the 4th and the 8th, are outlined in blue.</p>

<h2>What this game is for</h2>

<p>It is the most complete of the singing games: it combines singing an interval (as in the high jump) with not being able to move on without tuning (as in the hurdles), and adds the real difficulty of not knowing in advance whether the leap goes up or down. That forces you to listen carefully before you sing, instead of relying on a repeated pattern, just like reading intervals in a score: some go up and some go down, and you have to tell them apart by ear.</p>

<p>If you cannot yet sing rising intervals, start with the <a href="/juegos/entonacion/salto-de-altura/">high jump</a>, or practice the directed glissando in the <a href="/juegos/entonacion/lanzamiento-de-jabalina/">javelin throw</a>. To review interval theory on paper, try the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why 8 obstacles, and what is a water jump?</div>
      <div class="tm-faq-a">It is inspired by the 3000-meter steeplechase (the obstacle race), with 28 hurdles and 7 water jumps: in each lap, 4 hurdles and 1 water jump, which is a hurdle with a pool of water behind it. The hurdles are fixed and heavy: they do not fall over, unlike those of the 110-meter hurdles. Here there are 8 obstacles: 3 hurdles and a water jump, twice.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do the intervals go up or down?</div>
      <div class="tm-faq-a">Both, chosen at random at each obstacle: sometimes the leap goes above the base note and sometimes below it. That is the main difference from the high jump, where the intervals only go up.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What happens if I do not complete an obstacle in time?</div>
      <div class="tm-faq-a">You stumble: the race goes on to the next obstacle, but a penalty is added to your final time. If you stumble on all 8 obstacles, the race is disqualified and no time counts.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it scored, by meters or by time?</div>
      <div class="tm-faq-a">By time, like a race: you have to clear each obstacle as fast as you can. Fewer seconds is better. The 19.1 s benchmark is a reference for this game, not a real record: the real race is 3000 meters and lasts several minutes.</div>
    </div>
  </div>
</div>
</div>
</section>

<p class="tm-credito-piano" style="font-size:.8rem;color:#686868;margin-top:1.5rem">Piano audio: <em>Salamander Grand Piano</em> samples by Alexander Holm, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow noopener">CC BY 3.0</a>.</p>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/entonacion/salto-de-longitud/">Long jump: sing a note</a></li>
    <li><a href="/juegos/entonacion/salto-de-altura/">High jump: sing an interval</a></li>
    <li><a href="/juegos/entonacion/vallas/">Hurdles: sing a scale</a></li>
    <li><a href="/juegos/entonacion/lanzamiento-de-jabalina/">Javelin throw: sing a glissando</a></li>
    <li><a href="/juegos/entonacion/triple-salto/">Triple jump: sing a chord</a></li>
    <li><a href="/diccionario-musical/intervalos/intervalos-musicales/">Musical intervals</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
