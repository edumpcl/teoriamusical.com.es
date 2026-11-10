const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/long-jump/',
  esPath: '/juegos/entonacion/salto-de-longitud/',
  title: 'Long Jump: Free Note Singing Game',
  description: 'Free ear-training game: listen to a note, sing it for 5 seconds and jump farther the more in tune you are. Works with your phone or computer microphone.',
  h1: 'Long Jump: A Game to Sing a Note in Tune',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing the note you hear and jump as far as you can.</strong> The game plays you a note (C, D, E, F, G or A), you sing it for 5 seconds and the microphone checks whether you are in tune: <strong>every second on the right pitch adds 1.90 meters</strong> to your jump. There is nothing to install: it works in the browser on your phone or computer.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/long-jump/play/" title="Singing game: Long Jump" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s jump!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong> (there are 21 band and orchestra instruments), type your name and pick the difficulty.</li>
  <li><strong>Listen to the note</strong> and memorize the sound. You can replay it as often as you like, and the &ldquo;Test your voice&rdquo; bar confirms that the microphone can hear you.</li>
  <li><strong>Sing it</strong> when you are ready. A needle moves on screen: if it lands in the marked zone you are in tune; if it stays on the left you are too low, and on the right, too high.</li>
  <li><strong>See how far you jump.</strong> The more seconds in tune, the farther your musician lands. The long jump world record, 8.95 m, is worth about 4.7 seconds in tune; with a perfect 5 seconds you reach 9.50 m. If you are in tune for less than 0.3 seconds in total, it is a no jump.</li>
</ol>

<p>You can sing <strong>in your own octave</strong>: low or high voices are both fine. The game compares the note name, not the octave, so singing the C an octave higher or lower counts the same.</p>

<h2>The three difficulties</h2>

<p>They change how strict the tuning is, measured in <strong>cents</strong> (a half step (UK: semitone) is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Tuning margin</th><th>What it means</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>Anything within half a half step on either side counts; good for getting started.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>You have to hit the note clearly.</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>Very fine tuning: you have to nail the note and hold it.</td></tr>
  </tbody>
</table>

<h2>What this game is for</h2>

<p><strong>Intonation</strong> is the ability to sing or play a note at exactly the right pitch. You train it like any other skill: listen to a reference, try to reproduce it and get immediate feedback. Here the feedback comes from the needle, which shows at once whether you are above or below the pitch.</p>

<p>It is a good warm-up before rehearsal. If you want to check your tuning on your instrument instead of your voice, try the <a href="/herramientas/afinador/">online tuner</a>, which uses the same microphone. To move from a single note to an interval, the next challenge is the <a href="/juegos/entonacion/salto-de-altura/">high jump</a>; for the three notes of a chord, there is the <a href="/juegos/entonacion/triple-salto/">triple jump</a>.</p>

<h2>Tips for singing in tune</h2>

<ul>
  <li><strong>Listen to the whole note before you sing.</strong> The better you have it in your head, the less you will have to correct on the fly.</li>
  <li><strong>Hold the note with steady air.</strong> If your intensity keeps changing, the pitch moves.</li>
  <li><strong>Sing &ldquo;ah&rdquo;, &ldquo;oh&rdquo; or &ldquo;oo&rdquo;</strong> instead of consonants: the microphone detects a long vowel better.</li>
  <li><strong>Find a quiet place.</strong> A TV or several voices at once confuse the pitch detector.</li>
  <li><strong>Do not worry if the needle moves.</strong> It is normal: what matters is getting back to the zone and staying there.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you gain meters in the long jump?</div>
      <div class="tm-faq-a">Every second you sing the note inside the tuning margin adds 1.90 meters to the jump. With a perfect 5 seconds you reach 9.50 meters.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I have to sing in the same octave I hear?</div>
      <div class="tm-faq-a">No. The game compares the note name, not the octave, so you can sing in whichever octave is comfortable for you.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does a margin of ±50, ±30 or ±15 cents mean?</div>
      <div class="tm-faq-a">A cent is one hundredth of a half step. With ±50 cents, any note within half a half step of the right one counts; with ±15 cents you have to tune very precisely.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a &ldquo;no jump&rdquo;?</div>
      <div class="tm-faq-a">If you are in tune for less than 0.3 seconds in total, the jump does not count and adds no meters. You can listen to the note again and try once more.</div>
    </div>
  </div>
</div>
</div>
</section>

<p class="tm-credito-piano" style="font-size:.8rem;color:#686868;margin-top:1.5rem">Piano audio: <em>Salamander Grand Piano</em> samples by Alexander Holm, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow noopener">CC BY 3.0</a>.</p>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/entonacion/triple-salto/">Triple jump: sing the arpeggio of a chord</a></li>
    <li><a href="/juegos/entonacion/salto-de-altura/">High jump: sing an interval</a></li>
    <li><a href="/juegos/entonacion/lanzamiento-de-jabalina/">Javelin throw: sing a glissando</a></li>
    <li><a href="/herramientas/afinador/">Online tuner</a></li>
    <li><a href="/diccionario-musical/intervalos/tono-y-semitono/">Whole step and half step</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
