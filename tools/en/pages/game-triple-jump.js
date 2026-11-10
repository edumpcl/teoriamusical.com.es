const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/singing/triple-jump/',
  esPath: '/juegos/entonacion/triple-salto/',
  title: 'Triple Jump: Free Chord Arpeggio Singing Game',
  description: 'Free ear-training game: hear a major or minor chord and sing its arpeggio (root, third and fifth). Each note you tune adds meters to your triple jump.',
  h1: 'Triple Jump: A Game to Sing Chords',
  crumbs: [['Games', '/juegos/'], ['Singing games', '/juegos/entonacion/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Sing the three notes of a chord as an arpeggio and jump as far as you can.</strong> The game gives you a major or minor triad, you listen to it, and then you sing the <strong>root, the third and the fifth</strong>, one after the other, 3 seconds each. Each note you tune adds meters to one of the three jumps of the triple jump (hop, step and jump). It works in the browser on your phone or computer, with nothing to install.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/singing/triple-jump/play/" title="Singing game: Triple Jump" allow="microphone" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>
<p><small>When you press &ldquo;Let&rsquo;s jump!&rdquo;, your browser will ask for permission to use the microphone. The audio is not recorded or sent anywhere: it is analyzed on your own device.</small></p>

<h2>How to play</h2>

<ol>
  <li><strong>Choose a musician</strong>, type your name, pick the difficulty and whether you want major chords, minor chords or both.</li>
  <li><strong>Listen to the chord.</strong> You hear the arpeggio (the three notes one after the other) and then all three together. You can replay it as many times as you like.</li>
  <li><strong>Sing the arpeggio:</strong> root, third and fifth, 3 seconds for each note. A needle tells you whether you are too low, in tune or too high.</li>
  <li><strong>See how far you jump.</strong> Each note powers one jump: the root adds 2.0 m per second in tune, the third 1.7 m and the fifth 2.5 m. With all three notes perfect you jump 18.60 m; the triple jump world record is 18.29 m. If you are in tune for less than 0.6 seconds in total, it is a no jump.</li>
</ol>

<p>You can sing <strong>in whichever octave is comfortable</strong>: the game compares the note name, not the octave.</p>

<h2>The chords in the game</h2>

<p>There are twelve triads in root position, six major and six minor, built on C, D, E, F, G and A:</p>

<table>
  <thead><tr><th>Chord</th><th>Notes (root, third, fifth)</th></tr></thead>
  <tbody>
    <tr><td>C major</td><td>C · E · G</td></tr>
    <tr><td>D major</td><td>D · F♯ · A</td></tr>
    <tr><td>E major</td><td>E · G♯ · B</td></tr>
    <tr><td>F major</td><td>F · A · C</td></tr>
    <tr><td>G major</td><td>G · B · D</td></tr>
    <tr><td>A major</td><td>A · C♯ · E</td></tr>
    <tr><td>C minor</td><td>C · E♭ · G</td></tr>
    <tr><td>D minor</td><td>D · F · A</td></tr>
    <tr><td>E minor</td><td>E · G · B</td></tr>
    <tr><td>F minor</td><td>F · A♭ · C</td></tr>
    <tr><td>G minor</td><td>G · B♭ · D</td></tr>
    <tr><td>A minor</td><td>A · C · E</td></tr>
  </tbody>
</table>

<p>The difference between a major and a minor chord is the <strong>third</strong>: in a major chord it sits 2 whole steps above the root (a major 3rd), and in a minor chord a whole step and a half above it (a minor 3rd). The middle note is exactly the one you have to adjust when you sing. You can review how they are built in <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">the major triad</a> and <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">the minor triad</a>.</p>

<h2>The three difficulties</h2>

<p>They change the help you get and how strict the tuning is (the margin is measured in cents; a half step (UK: semitone) is 100 cents):</p>

<table>
  <thead><tr><th>Difficulty</th><th>Margin</th><th>Help</th></tr></thead>
  <tbody>
    <tr><td><strong>Easy</strong></td><td>±50 cents</td><td>You see the name of each note you have to sing.</td></tr>
    <tr><td><strong>Normal</strong></td><td>±30 cents</td><td>You see the name of the chord and hear the whole arpeggio.</td></tr>
    <tr><td><strong>Master</strong></td><td>±15 cents</td><td>Only the first note plays; you have to work out the rest yourself.</td></tr>
  </tbody>
</table>

<h2>What this game is for</h2>

<p>Singing an arpeggio is one of the most direct ways to <strong>internalize a chord</strong>: it makes you hear the three notes separately and put the third in its place. It is a standard exercise in ear-training and solfège classes, and it is useful for any instrumentalist, not just singers.</p>

<p>If you cannot yet sing a single note in tune, start with the <a href="/juegos/entonacion/salto-de-longitud/">long jump</a>, where you sing one note at a time. And if you want to practice chord theory on paper, there are the <a href="/ejercicios/acordes/">chord exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which chords appear in the triple jump?</div>
      <div class="tm-faq-a">Twelve triads in root position: C, D, E, F, G and A, each in its major and its minor version. You can choose only major, only minor, or both.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many notes do I have to sing?</div>
      <div class="tm-faq-a">Three, one after the other and 3 seconds each: the root, the third and the fifth of the chord, that is, the arpeggio.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does the third change between a major and a minor chord?</div>
      <div class="tm-faq-a">In a major chord the third is two whole steps above the root (a major 3rd); in a minor chord it is a whole step and a half above (a minor 3rd). That middle note is the one to adjust when you sing.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What happens if I do not sing any note in tune?</div>
      <div class="tm-faq-a">If you are in tune for less than 0.6 seconds in total, the jump does not count and adds no meters. You can listen to the chord again and try once more.</div>
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
    <li><a href="/juegos/entonacion/lanzamiento-de-jabalina/">Javelin throw: sing a glissando</a></li>
    <li><a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">The major triad</a></li>
    <li><a href="/diccionario-musical/acordes/acorde-perfecto-menor/">The minor triad</a></li>
    <li><a href="/juegos/entonacion/">All singing games</a></li>
  </ul>
</aside>
`,
});
