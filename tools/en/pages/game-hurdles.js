const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/hurdles/',
  esPath: '/juegos/entonacion/vallas/',
  title: '110-Meter Hurdles: Free Scale Singing Game',
  description: 'Free ear-training game: sing a major or minor scale note by note. Each note is a hurdle you clear only when it is in tune. Run the 110-meter hurdles.',
  h1: '110-Meter Hurdles: A Game to Sing a Scale',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing a whole scale, note by note, and run a hurdles race with your voice.</strong> The game gives you a major or minor scale, you hear it, and then you sing it degree by degree: tonic, 2nd, 3rd, 4th, 5th, 6th, 7th and octave. <strong>Each note is a hurdle you only clear when you tune it</strong>: if you do not tune it in time, you stumble and move on to the next one, but with a penalty. Unlike most of the other games, what matters here is not how far you get but how little time you take: it is a speed race. It works in the browser on your phone or computer, with nothing to install.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/hurdles/play/" title="Singing game: 110-Meter Hurdles" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s run!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name, pick the difficulty and whether you want major scales, minor scales or both.</li>
  <li><strong>Listen to the scale.</strong> All eight notes play in order, from the tonic to the octave. You can replay it as often as you like.</li>
  <li><strong>Sing note by note.</strong> Each note is a hurdle: you have up to 3 seconds to tune it (it does not have to be in one go; the accumulated time in tune counts). As soon as you tune it, you clear the hurdle and move on to the next one without waiting.</li>
  <li><strong>If you do not tune it in time, you stumble</strong> and the race goes on to the next note, but 1.5 s of penalty is added to your time.</li>
  <li><strong>Check your final time.</strong> If you clear all eight hurdles instantly, you run it in 12.3 s; the 110-meter hurdles world record is 12.80 s (Aries Merritt, 2012). If you stumble on all eight hurdles, you are disqualified and no time is recorded.</li>
</ol>

<p>You can sing <strong>in whatever octave is comfortable</strong>: the game compares the note name, not the octave.</p>

<h2>The scales in the game</h2>

<p>There are twelve scales, six major and six natural minor, on the notes C, D, E, F, G and A:</p>

<table>
  <thead><tr><th>Scale</th><th>Notes (tonic to octave)</th></tr></thead>
  <tbody>
    <tr><td>C major</td><td>C · D · E · F · G · A · B · C</td></tr>
    <tr><td>D major</td><td>D · E · F♯ · G · A · B · C♯ · D</td></tr>
    <tr><td>E major</td><td>E · F♯ · G♯ · A · B · C♯ · D♯ · E</td></tr>
    <tr><td>F major</td><td>F · G · A · B♭ · C · D · E · F</td></tr>
    <tr><td>G major</td><td>G · A · B · C · D · E · F♯ · G</td></tr>
    <tr><td>A major</td><td>A · B · C♯ · D · E · F♯ · G♯ · A</td></tr>
    <tr><td>C minor</td><td>C · D · E♭ · F · G · A♭ · B♭ · C</td></tr>
    <tr><td>D minor</td><td>D · E · F · G · A · B♭ · C · D</td></tr>
    <tr><td>E minor</td><td>E · F♯ · G · A · B · C · D · E</td></tr>
    <tr><td>F minor</td><td>F · G · A♭ · B♭ · C · D♭ · E♭ · F</td></tr>
    <tr><td>G minor</td><td>G · A · B♭ · C · D · E♭ · F · G</td></tr>
    <tr><td>A minor</td><td>A · B · C · D · E · F · G · A</td></tr>
  </tbody>
</table>

<p>These are natural minor scales (with the 6th and 7th degrees unaltered), so you can concentrate on the pitch of each note without the extra complication of the harmonic or melodic form. You can review the theory in the <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">major scales</a> and the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">natural minor scales</a>.</p>

<h2>The three difficulties</h2>

<p>They change how much help you get and how strict the tuning is (the margin is measured in cents; a half step (UK: semitone) is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Margin</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the list of notes before you start and the name of each note while you sing it.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>You see the name of the scale and you hear all eight notes.</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>Only the tonic plays; you have to remember the rest of the scale yourself.</td></tr>
  </tbody>
</table>

<h2>Why it is scored by time, not by meters</h2>

<p>The 110-meter hurdles is a speed event, not a distance event: the real goal is to take as little time as possible, not to get far. That is why this game works the opposite way from the long jump, the triple jump or the high jump: instead of adding meters for every second you hold a note in tune, each hurdle has a time window and you have to clear it as soon as you can. Tuning quickly improves your time; hesitating or stumbling makes it worse.</p>

<h2>What this game is for</h2>

<p>Singing a whole scale, degree by degree, is one of the most classic ear-training and solfège exercises: it makes you place each note in relation to the tonic and to the previous note, without leaps. Because you cannot move on without tuning the current note, it also trains precision under time pressure, as in a real race.</p>

<p>If you cannot yet hold a single note, start with the <a href="/juegos/entonacion/salto-de-longitud/">long jump</a>. And if you want to review scale theory on paper, try the <a href="/ejercicios/escalas/">scale exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which scales come up in the hurdles?</div>
      <div class="tm-faq-a">Twelve scales: six major and six natural minor, on the notes C, D, E, F, G and A. You can choose only major, only minor or both.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are there 8 hurdles and not 10 as in the real race?</div>
      <div class="tm-faq-a">Because each hurdle is a note of the scale: from the tonic to the octave there are 8 notes. It does not match the 10 hurdles of the real 110-meter race, but it lets you sing the whole scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What happens if I do not tune a hurdle in time?</div>
      <div class="tm-faq-a">You stumble: the race goes on to the next note, but a penalty is added to your final time. If you stumble on all eight hurdles, the race is disqualified and no time counts.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it scored, by meters or by time?</div>
      <div class="tm-faq-a">By time, as in a real race: you have to run as fast as you can. Fewer seconds is better, unlike in the jumping games.</div>
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
    <li><a href="/juegos/entonacion/salto-de-altura/">High jump: sing an interval</a></li>
    <li><a href="/juegos/entonacion/lanzamiento-de-jabalina/">Javelin throw: sing a glissando</a></li>
    <li><a href="/juegos/entonacion/carrera-de-obstaculos/">Obstacle race: sing rising and falling intervals</a></li>
    <li><a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">Major scales</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
