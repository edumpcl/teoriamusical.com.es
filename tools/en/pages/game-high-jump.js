const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/high-jump/',
  esPath: '/juegos/entonacion/salto-de-altura/',
  title: 'High Jump: Free Interval Singing Game',
  description: 'Free ear-training game: sing two notes, the first is the run and the second the jump. Three difficulties and the intervals you choose, from 2nds to 7ths.',
  h1: 'High Jump: A Game to Sing Intervals',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing two notes: the first is the run and the second is the jump.</strong> The game gives you an interval (for example, a major 3rd). You sing the first note for 3 seconds to build up speed, then the second note, at that distance, for another 3 seconds to take off. <strong>The longer you stay in tune, the higher the bar goes</strong> and the higher your musician clears it. There is nothing to install: it works in the browser on your phone or computer.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/high-jump/play/" title="Singing game: High Jump" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s jump!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name and pick the difficulty and the intervals you want to practice.</li>
  <li><strong>Listen to the interval.</strong> The two notes play one after the other (a melodic interval). In Easy mode you also see their names.</li>
  <li><strong>Sing the run:</strong> the first note, for 3 seconds. A needle tells you whether you are too low, in tune or too high.</li>
  <li><strong>Sing the jump:</strong> the second note, for another 3 seconds. The bar rises while you are in tune.</li>
  <li><strong>See how high you jump.</strong> You start at 0.50 m; every second in tune on the run adds 0.30 m and every second in tune on the jump adds 0.40 m. With both notes perfect you clear 2.60 m, and the high jump world record is 2.45 m. If you are in tune for less than 0.6 seconds in total, it is a no jump.</li>
</ol>

<p>You can sing <strong>in whichever octave is comfortable</strong>: the game compares the note name, not the octave, so the second note counts whether you sing it above or below the first. That is why only intervals from a 2nd to a 7th appear: an octave would mean singing the same note again.</p>

<h2>The intervals</h2>

<p>You choose which intervals can come up. They are all measured from the first note, which is C, D, E, F, G or A:</p>

<table>
  <thead><tr><th>Intervals</th><th>Which ones</th><th>Half steps</th></tr></thead>
  <tbody>
    <tr><td><strong>2nds and 3rds</strong></td><td>minor 2nd, major 2nd, minor 3rd and major 3rd</td><td>1, 2, 3 and 4</td></tr>
    <tr><td><strong>4ths and 5ths</strong></td><td>perfect 4th and perfect 5th</td><td>5 and 7</td></tr>
    <tr><td><strong>6ths and 7ths</strong></td><td>minor 6th, major 6th, minor 7th and major 7th</td><td>8, 9, 10 and 11</td></tr>
    <tr><td><strong>All</strong></td><td>All of the above</td><td>1 to 11</td></tr>
  </tbody>
</table>

<p>If you do not remember how intervals are counted, review <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a> and the difference between a <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole step and a half step</a> (UK: tone and semitone). The best approach is to start with 2nds and 3rds and work your way up.</p>

<h2>The three difficulties</h2>

<p>The difficulty changes the help you get and how strict the tuning is, measured in <strong>cents</strong> (a half step is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Margin</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the note names (for example, C → E) and hear both notes.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>You see the name of the interval and hear both notes.</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>Only the first note plays; you have to work out the rest yourself.</td></tr>
  </tbody>
</table>

<p>With ±50 cents, any note within half a half step of the right one counts; with ±15 you have to nail it and hold it. In Master mode you build the interval by ear, which is the most demanding way to train.</p>

<h2>What this game is for</h2>

<p>Singing an interval makes you <strong>measure a distance with your voice</strong>, not just repeat a note. It is a classic ear-training exercise: first you hear and sing 2nds and 3rds, then 4ths and 5ths, and last 6ths and 7ths, which are the hardest to sing in tune. Here you have it as a game, with a needle that tells you at once whether you are above or below the pitch.</p>

<p>If you would rather practice one note at a time, start with the <a href="/juegos/entonacion/salto-de-longitud/">long jump</a>; and if you prefer to sing the three notes of a chord, try the <a href="/juegos/entonacion/triple-salto/">triple jump</a>. To review intervals on paper, there are the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a>.</p>

<h2>Tips for singing in tune</h2>

<ul>
  <li><strong>Listen to the distance, not just the notes.</strong> Notice how far the second note moves from the first.</li>
  <li><strong>Hold each note with steady air.</strong> If your intensity changes, the pitch moves.</li>
  <li><strong>Sing &ldquo;ah&rdquo;, &ldquo;oh&rdquo; or &ldquo;oo&rdquo;</strong> instead of consonants: the microphone detects a long vowel better.</li>
  <li><strong>Find a quiet place.</strong> A TV or several voices at once confuse the pitch detector.</li>
  <li><strong>Start with Easy and the 2nds and 3rds</strong> and move up when you have mastered them.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which intervals appear in the high jump?</div>
      <div class="tm-faq-a">Ascending 2nds, 3rds, 4ths, 5ths, 6ths and 7ths (minor, major or perfect as appropriate). You can choose only 2nds and 3rds, 4ths and 5ths, 6ths and 7ths, or all of them.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the height of the jump calculated?</div>
      <div class="tm-faq-a">You start at 0.50 m. Every second in tune on the first note (the run) adds 0.30 m and every second in tune on the second (the jump) adds 0.40 m. With both notes perfect you clear 2.60 m; the world record is 2.45 m.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What changes between Easy, Normal and Master?</div>
      <div class="tm-faq-a">The tuning margin (±50, ±30 or ±15 cents) and the help: in Easy you see the note names, in Normal the name of the interval, and in Master only the first note plays and you build the interval by ear.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I have to sing the second note above the first?</div>
      <div class="tm-faq-a">Not necessarily. The game compares the note name, not the octave, so you can sing the second note in whichever octave is comfortable, above or below the first.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are there no octaves or unisons?</div>
      <div class="tm-faq-a">Because the game ignores the octave: an octave would mean singing the same note again, and it would not train the size of any interval.</div>
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
    <li><a href="/juegos/entonacion/triple-salto/">Triple jump: sing a chord</a></li>
    <li><a href="/juegos/entonacion/lanzamiento-de-jabalina/">Javelin throw: sing a glissando</a></li>
    <li><a href="/diccionario-musical/intervalos/intervalos-musicales/">Musical intervals</a></li>
    <li><a href="/ejercicios/ejercicios-de-intervalos-musicales/">Interval exercises</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
