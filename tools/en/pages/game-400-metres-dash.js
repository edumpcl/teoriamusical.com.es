const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/400-metres-dash/',
  esPath: '/juegos/entonacion/400-metros-lisos/',
  title: '400-Meter Dash: Free Very Long Melody Singing Game',
  description: 'Free ear-training game: sing a very long melody of four phrases from memory, note by note. Move on only when you hit each pitch. Run the 400-meter dash.',
  h1: '400-Meter Dash: A Game to Sing a Very Long Melody',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing a very long melody from memory, note by note, and run the 400-meter dash with your voice</strong> (UK: 400 metres). It is the continuation of the <a href="/juegos/entonacion/100-metros-lisos/">100-meter dash</a> and the <a href="/juegos/entonacion/200-metros-lisos/">200-meter dash</a>: instead of one or two melodic shapes, the game draws four different shapes from the same table and chains them, one after the other, in the same key, like four musical phrases in a row (19 to 24 notes in total). As in the shorter dashes, you do not move on to the next note until you have tuned the current one, and <strong>rhythm does not count here either, only pitch</strong>: each note is accepted as soon as you hold it in tune for the minimum time, no matter when you start it. It works in the browser on your phone or computer, with nothing to install.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/400-metres-dash/play/" title="Singing game: 400-Meter Dash" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s run!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name, pick the difficulty and the kind of melodies you want to practice.</li>
  <li><strong>Listen to the whole melody</strong>, all four phrases in a row. It plays from start to finish in a major or minor key that changes every round (and stays the same for all four shapes). You can replay it as often as you like (in Master mode you hear it only once).</li>
  <li><strong>Sing it note by note, in the same order.</strong> There is no beat to follow: each note is cleared as soon as you hold it in tune for the minimum time, within a window of about 4 seconds.</li>
  <li><strong>If you do not tune a note in time, you stumble.</strong> The race goes on to the next note, but a penalty is added to your time.</li>
  <li><strong>Check your final time.</strong> If you clear the 19 notes of the shortest melody instantly, you run it in 21.5 s; the benchmark for this game is 23.2 s. If you stumble on every note, you are disqualified and no time is recorded.</li>
</ol>

<p>You can sing <strong>in whatever octave is comfortable</strong>: the game compares the note name, not the octave.</p>

<h2>The melodies, from simple to leaps</h2>

<p>Each round draws a tonic (C, D, E, F, G or A) and a key (major or natural minor), as in the <a href="/juegos/entonacion/100-metros-lisos/">100-meter dash</a>. The difference is that here four different melodic &ldquo;shapes&rdquo; are drawn (the same shape never comes up twice) from the same table of 10 shapes, and you sing them chained, one right after the other, always as scale degrees (1 = tonic). You choose which group the four shapes can come from:</p>

<table>
  <thead><tr><th>Melodies</th><th>What they add</th><th>Shapes (scale degrees)</th></tr></thead>
  <tbody>
    <tr><td><strong>Simple</strong></td><td>Steps only, with a 3rd as the largest leap (this group has exactly 4 shapes, so all of them always come up)</td><td>1-2-3-2-1 · 1-2-1-3-1 · 3-2-1-2-3 · 1-3-2-1</td></tr>
    <tr><td><strong>With leaps</strong></td><td>Adds arpeggio shapes (1-3-5) and a leap of a 5th</td><td>1-3-5-3-1 · 1-2-3-5-3-1 · 5-3-1-2-3 · 1-5-4-3-2-1</td></tr>
    <tr><td><strong>All</strong></td><td>Also adds a leap of a 4th and of a 6th (any of the 10 shapes can come up)</td><td>1-3-2-5-4-1 · 1-6-5-3-2-1</td></tr>
  </tbody>
</table>

<p>The shapes are exactly the same 10 as in the <a href="/juegos/entonacion/100-metros-lisos/">100-meter dash</a>; here they are combined four at a time to make a very long melody that you can sing from memory in any major or minor key. If you are not sure what a scale degree is, review the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">degrees of the scale</a>.</p>

<h2>The three difficulties</h2>

<p>They change how much help you get and how strict the tuning is (the margin is measured in cents; a half step (UK: semitone) is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Margin</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the name of each note while you sing it.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>Before you start, you see the scale degrees of the melody (for example, 1-3-5-3-1 + 1-2-3-2-1).</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>The melody plays only once, with no written help: you have to remember it by ear, note by note.</td></tr>
  </tbody>
</table>

<h2>Why a game benchmark and not Van Niekerk&rsquo;s record</h2>

<p>The real <strong>400-meter dash</strong> takes 43.03 s (Wayde van Niekerk, Rio 2016). This game borrows the name of the event, not its duration or its speed: it cannot be compared with a real race. It is the time needed to sing a very long melody with a realistic margin so that the microphone can detect each note. With the shortest possible melody (the four simple shapes, of 4, 5, 5 and 5 notes; 19 notes in total, the only possible result when the 4 shapes of that group are drawn without repeats) sung perfectly, the calculation gives a 1.2 s start + 19 × 1.0 s per note + 1.3 s finish = 21.5 s. The <strong>23.2 s benchmark</strong> uses the same proportional margin as the 100-meter dash (×1.08). It is a reference for this game, not a track and field record.</p>

<h2>What this game is for</h2>

<p>It is the longest version of singing real music: instead of one or two phrases, you sing four in a row, with steps and a few leaps, just like a real melody from a method book or a score, but four times as long. It trains the same thing as the 100-meter and 200-meter dashes and, in addition, it tests the endurance of your melodic memory: you have to remember and chain four musical ideas without losing the reference of the key. Because rhythm is not required, you focus on pitch alone, note by note. If you want to practice rhythm separately, it has its own <a href="/ejercicios/figuras/">note value and rhythm exercises</a> and its <a href="/herramientas/metronomo/">metronome</a>.</p>

<p>If you have not tried the shorter melodies yet, start with the <a href="/juegos/entonacion/100-metros-lisos/">100-meter dash</a> and the <a href="/juegos/entonacion/200-metros-lisos/">200-meter dash</a>. If you cannot yet sing a whole scale, start with the <a href="/juegos/entonacion/vallas/">hurdles</a>, or practice a single chord in the <a href="/juegos/entonacion/triple-salto/">triple jump</a>. To review scales and degrees on paper, try the <a href="/ejercicios/escalas/">scale exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why such a long melody?</div>
      <div class="tm-faq-a">It is the continuation of the 100-meter and 200-meter dashes: instead of drawing one or two melodic shapes, the game draws four different shapes from the same table and chains them, one after the other, in the same key (like two halves of the 200-meter dash back to back). That way you sing a melody four times as long as the original (19 to 24 notes) without a new pattern to learn.</div>
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
      <div class="tm-faq-q">Why is the benchmark not Wayde van Niekerk&rsquo;s 43.03 s?</div>
      <div class="tm-faq-a">Because the two cannot be compared: this game measures the time it takes to sing many notes, with the margin the microphone needs to detect them, not to run a real 400 meters. The 23.2 s benchmark uses the same proportional margin as the 100-meter dash (×1.08 over the theoretical minimum): it is this game&rsquo;s own reference, not a track and field record.</div>
    </div>
  </div>
</div>
</div>
</section>

<p class="tm-credito-piano" style="font-size:.8rem;color:#686868;margin-top:1.5rem">Piano audio: <em>Salamander Grand Piano</em> samples by Alexander Holm, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow noopener">CC BY 3.0</a>.</p>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/entonacion/100-metros-lisos/">100-meter dash: sing a short melody</a></li>
    <li><a href="/juegos/entonacion/200-metros-lisos/">200-meter dash: sing a long melody</a></li>
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
