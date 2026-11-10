const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/javelin-throw/',
  esPath: '/juegos/entonacion/lanzamiento-de-jabalina/',
  title: 'Javelin Throw: Free Glissando Singing Game',
  description: 'Free ear-training game: sing a glissando between two notes and throw the javelin. Stay inside the lane to make it fly farther. Uses your microphone.',
  body: `
<p><strong>Sing a glissando between two notes and throw the javelin as far as you can.</strong> The game gives you an interval: you hold the first note (the run-up), slide your voice to the second (the throw) and hold it (the finish). A <strong>lane</strong> shows you where your voice should go, and <strong>the longer you stay inside it, the farther the javelin flies</strong>. There is nothing to install: it works in the browser on your phone or computer.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/javelin-throw/play/" title="Singing game: Javelin Throw" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s throw!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name and pick the difficulty and the intervals you want to practice.</li>
  <li><strong>Listen to the example.</strong> You hear the starting note on the piano, then a glissando that slides up or down to the arrival note, and finally the arrival note on the piano. You also see the lane drawn on screen.</li>
  <li><strong>Run-up (1 second):</strong> sing the first note and hold it.</li>
  <li><strong>Throw (2 seconds):</strong> slide your voice, without leaps and at a constant speed, to the second note.</li>
  <li><strong>Finish (1 second):</strong> hold the second note until the end. The javelin takes off.</li>
</ol>

<p>The interval can go up or down, and the game tells you which. You can sing <strong>in whichever octave is comfortable</strong>: the lane moves relative to the note you sing, not to a fixed pitch.</p>

<h2>The lane and the scoring</h2>

<p>The lane is the ideal path for your voice: a flat line during the run-up, a straight ramp during the glissando and another flat line in the finish. Your voice is drawn on top of it: <strong>green when you are inside</strong> and orange when you drift out. Every second inside the lane adds meters, and it counts for more as the throw goes on:</p>

<table>
  <thead><tr><th>Phase</th><th>Length</th><th>Meters per second inside</th><th>Maximum</th></tr></thead>
  <tbody>
    <tr><td><strong>Run-up</strong></td><td>1 s</td><td>20 m</td><td>20 m</td></tr>
    <tr><td><strong>Glissando</strong></td><td>2 s</td><td>25 m</td><td>50 m</td></tr>
    <tr><td><strong>Finish</strong></td><td>1 s</td><td>30 m</td><td>30 m</td></tr>
  </tbody>
</table>

<p>With a perfect 4 seconds you throw 100 m, and the javelin world record is 98.48 m. If you are inside the lane for less than 0.6 seconds in total, it is a no throw.</p>

<h2>The three difficulties</h2>

<p>The difficulty changes the help you get and the width of the lane, measured in <strong>cents</strong> (a half step (UK: semitone) is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Lane width</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the note names (for example, C → E) and hear the whole example.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>You see the name of the interval and whether it goes up or down, and hear the whole example.</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>Only the first note plays; you have to do the glissando by ear.</td></tr>
  </tbody>
</table>

<h2>The intervals</h2>

<p>You choose which intervals can come up. The first note is C, D, E, F, G or A, and the glissando can go up or down:</p>

<table>
  <thead><tr><th>Intervals</th><th>Which ones</th><th>Half steps</th></tr></thead>
  <tbody>
    <tr><td><strong>2nds and 3rds</strong></td><td>minor 2nd, major 2nd, minor 3rd and major 3rd</td><td>1, 2, 3 and 4</td></tr>
    <tr><td><strong>4ths and 5ths</strong></td><td>perfect 4th and perfect 5th</td><td>5 and 7</td></tr>
    <tr><td><strong>6ths and 7ths</strong></td><td>minor 6th, major 6th, minor 7th and major 7th</td><td>8, 9, 10 and 11</td></tr>
    <tr><td><strong>All</strong></td><td>All of the above</td><td>1 to 11</td></tr>
  </tbody>
</table>

<p>If you do not remember how intervals are counted, review <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a> and the difference between a <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole step and a half step</a> (UK: tone and semitone).</p>

<h2>What is a glissando?</h2>

<p>A <strong><a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a></strong> is a continuous slide from one note to another, passing through all the pitches in between instead of jumping from one to the other. The voice does it naturally, and so do instruments without fixed pitches, such as the violin or the <a href="/diccionario-musical/notas-del-trombon/">slide trombone</a>. It is hard to sing well because you have to control the pitch at every instant, not just at the two ends: the ramp of the lane is a straight line in cents, that is, a slide at a constant speed.</p>

<p>If you would rather practice a single note, start with the <a href="/juegos/entonacion/salto-de-longitud/">long jump</a>; if you want to sing two separate notes, try the <a href="/juegos/entonacion/salto-de-altura/">high jump</a>; and for a whole chord, the <a href="/juegos/entonacion/triple-salto/">triple jump</a>.</p>

<h2>Tips for the glissando</h2>

<ul>
  <li><strong>Start sliding right at second 1</strong> and reach the second note at 3 seconds. Watch the cursor on the graph.</li>
  <li><strong>Slide at a constant speed.</strong> Large intervals need more air and a faster slide; do not slow down at the start or rush at the end.</li>
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
      <div class="tm-faq-q">What is the lane in the game?</div>
      <div class="tm-faq-a">It is the ideal path your voice should follow: flat during the run-up (first note), a straight ramp during the glissando and flat during the finish (second note). Every second you stay inside adds meters to the throw.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many meters does each phase add?</div>
      <div class="tm-faq-a">Each second inside the lane adds 20 m in the run-up, 25 m in the glissando and 30 m in the finish. With a perfect 4 seconds you throw 100 m; the world record is 98.48 m.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What changes between Easy, Normal and Master?</div>
      <div class="tm-faq-a">The width of the lane (±50, ±30 or ±15 cents) and the help: in Easy you see the note names, in Normal the name of the interval and whether it goes up or down, and in Master only the first note plays.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I have to sing in the same octave I hear?</div>
      <div class="tm-faq-a">No. The lane moves relative to the note you sing, so you can use whichever octave is comfortable.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a glissando?</div>
      <div class="tm-faq-a">A continuous slide from one note to another, passing through all the pitches in between instead of jumping from one to the other. The voice, the violin or the slide trombone can do it.</div>
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
    <li><a href="/juegos/entonacion/triple-salto/">Triple jump: sing a chord</a></li>
    <li><a href="/diccionario-musical/intervalos/intervalos-musicales/">Musical intervals</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
