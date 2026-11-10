const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/100-metres-dash/',
  esPath: '/juegos/entonacion/100-metros-lisos/',
  title: '100-Meter Dash: Free Melody Singing Game',
  description: 'Free ear-training game: sing a short melody from memory, note by note. You only move on when you hit each pitch. Run the 100-meter dash with your voice.',
  h1: '100-Meter Dash: A Game to Sing a Melody',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing a short melody from memory, note by note, and run the 100-meter dash with your voice</strong> (UK: 100 metres). It is not a scale, as in the <a href="/juegos/entonacion/vallas/">hurdles</a>, or an arpeggio, as in the <a href="/juegos/entonacion/triple-salto/">triple jump</a>: it is a real short phrase of 4 to 6 notes, made of steps and a few small leaps. As in the hurdles, you do not move on to the next note until you have tuned the current one. Unlike every other game in this section, <strong>rhythm does not count here, only pitch</strong>: each note is accepted as soon as you hold it in tune for the minimum time, no matter when you start it. It works in the browser on your phone or computer, with nothing to install.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/100-metres-dash/play/" title="Singing game: 100-Meter Dash" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s run!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name, pick the difficulty and the kind of melodies you want to practice.</li>
  <li><strong>Listen to the whole melody.</strong> It plays from start to finish in a major or minor key that changes every round. You can replay it as often as you like (in Master mode you hear it only once).</li>
  <li><strong>Sing it note by note, in the same order.</strong> There is no beat to follow: each note is cleared as soon as you hold it in tune for the minimum time, within a window of about 4 seconds.</li>
  <li><strong>If you do not tune a note in time, you stumble.</strong> The race goes on to the next note, but a penalty is added to your time.</li>
  <li><strong>Check your final time.</strong> If you clear the 4 notes of the shortest melody instantly, you run it in 6.5 s; the benchmark for this game is 7.0 s. If you stumble on every note, you are disqualified and no time is recorded.</li>
</ol>

<p>You can sing <strong>in whatever octave is comfortable</strong>: the game compares the note name, not the octave.</p>

<h2>The melodies, from simple to leaps</h2>

<p>Each round draws a tonic (C, D, E, F, G or A), a key (major or natural minor) and a melodic &ldquo;shape&rdquo;, always written as scale degrees (1 = tonic). You choose which shapes can come up:</p>

<table>
  <thead><tr><th>Melodies</th><th>What they add</th><th>Shapes (scale degrees)</th></tr></thead>
  <tbody>
    <tr><td><strong>Simple</strong></td><td>Steps only, with a 3rd as the largest leap</td><td>1-2-3-2-1 · 1-2-1-3-1 · 3-2-1-2-3 · 1-3-2-1</td></tr>
    <tr><td><strong>With leaps</strong></td><td>Adds arpeggio shapes (1-3-5) and a leap of a 5th</td><td>1-3-5-3-1 · 1-2-3-5-3-1 · 5-3-1-2-3 · 1-5-4-3-2-1</td></tr>
    <tr><td><strong>All</strong></td><td>Also adds a leap of a 4th and of a 6th (any of the 10 shapes can come up)</td><td>1-3-2-5-4-1 · 1-6-5-3-2-1</td></tr>
  </tbody>
</table>

<p>These are short melodies, made to be sung from memory in any major or minor key. If you are not sure what a scale degree is, review the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">degrees of the scale</a>.</p>

<h2>The three difficulties</h2>

<p>They change how much help you get and how strict the tuning is (the margin is measured in cents; a half step (UK: semitone) is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Margin</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the name of each note while you sing it.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>Before you start, you see the scale degrees of the melody (for example, 1-3-5-3-1).</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>The melody plays only once, with no written help: you have to remember it by ear, note by note.</td></tr>
  </tbody>
</table>

<h2>Why a game benchmark and not Bolt&rsquo;s record</h2>

<p>The real <strong>100-meter dash</strong> takes 9.58 s (Usain Bolt, Berlin 2009). This game borrows the name of the event, not its duration or its speed: it cannot be compared with a real race. It is the time needed to sing a short melody with a realistic margin so that the microphone can detect each note. With the shortest melody (4 notes, the 1-3-2-1 shape) sung perfectly, with every note in tune from its very first instant, the calculation gives a 1.2 s start + 4 × 1.0 s per note + 1.3 s finish = 6.5 s. The <strong>7.0 s benchmark</strong> is set a little above that theoretical minimum, as in the <a href="/juegos/entonacion/vallas/">hurdles</a> and the <a href="/juegos/entonacion/carrera-de-obstaculos/">obstacle race</a>, so that it is demanding but reachable. It is a reference for this game, not a track and field record.</p>

<h2>What this game is for</h2>

<p>It is the game closest to singing real music: instead of a scale or a chord, you sing a short phrase with steps and a few leaps, just like any melody in a method book or a score. Because rhythm is not required, you can focus on pitch, note by note. If you want to practice rhythm separately, it has its own <a href="/ejercicios/figuras/">note value and rhythm exercises</a> and its <a href="/herramientas/metronomo/">metronome</a>.</p>

<p>If you cannot yet sing a whole scale, start with the <a href="/juegos/entonacion/vallas/">hurdles</a>, or practice a single chord in the <a href="/juegos/entonacion/triple-salto/">triple jump</a>. To review scales and degrees on paper, try the <a href="/ejercicios/escalas/">scale exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why a melody and not a scale or a chord?</div>
      <div class="tm-faq-a">The hurdles already train the whole scale and the triple jump trains the arpeggio. Here you sing a real short phrase, with steps and a few small leaps, like an actual melody: not as predictable as a scale and not as open as a chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I have to sing in time, with rhythm?</div>
      <div class="tm-faq-a">No. This game measures pitch only, not rhythm. Each note is accepted as soon as it sounds in tune for the minimum time inside its window, no matter when it starts.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What happens if I do not tune a note in time?</div>
      <div class="tm-faq-a">You stumble: the race goes on to the next note, but a penalty is added to your final time. If you stumble on every note of the melody, the race is disqualified and no time counts.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the benchmark not Usain Bolt&rsquo;s 9.58 s?</div>
      <div class="tm-faq-a">Because the two cannot be compared: this game measures the time it takes to sing several notes, with the margin the microphone needs to detect them, not to run a real 100 meters. The 7.0 s benchmark is this game&rsquo;s own reference, not a track and field record.</div>
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
    <li><a href="/juegos/entonacion/carrera-de-obstaculos/">Obstacle race: sing rising and falling intervals</a></li>
    <li><a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">Scale degrees</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
