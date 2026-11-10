const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/theory/billiards/',
  esPath: '/juegos/teoria/billar/',
  title: 'Billiards: Free Triad-Building Music Theory Game',
  description: 'Free music theory game, no microphone: pick a ball, write its triad on the staff, and sink it if the chord is right. Solo or in class.',
  h1: 'Billiards: A Game to Build Triads',
  crumbs: [['Games', '/juegos/'], ['Music theory games', '/juegos/teoria/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Build the chord and sink the ball.</strong> Every ball on the table carries a triad: you choose which one to shoot at, and the shot is building that chord on the staff. If the notes are right, the ball drops into the pocket. If not, it stays on the table and you can try again. Five balls and five shots per game, all four kinds of triad and, depending on the level, inversions too. There is no microphone and nothing to install, and you can play alone or in a group, taking turns.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/theory/billiards/play/" title="Music theory game: Billiards" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>

<h2>How to play</h2>

<ol>
  <li><strong>Say how many players there are</strong> and choose the level: Easy, Medium or Hard. If several of you are playing, type each player&rsquo;s name and pick your musicians.</li>
  <li><strong>Choose a ball.</strong> Each one has its chord written in the list under the table; tap it in the list or on the table. Start with the chords you know best how to build.</li>
  <li><strong>Build the chord.</strong> The bass note is already on the staff: write the other two notes above it, as close to the bass as possible. If a note needs an accidental, choose &flat; &natural; &sharp; before you tap. On a phone, touch and drag your finger to fine-tune the note while you watch the magnifier, and let go to write it.</li>
  <li><strong>Shoot.</strong> If the whole chord is right, the ball drops. If not, it stays on the table: you will see the wrong notes in red, but not the solution, and you can shoot at it again.</li>
  <li><strong>Use your 5 shots.</strong> If you play as a group, you take turns and, if there is a tie, it is settled with a new ball each round.</li>
</ol>

<h2>How scoring works</h2>

<p>Each <strong>ball that drops is worth 1 point</strong>, and it only drops if the chord is <strong>completely right</strong>: both notes in the right place and with the exact accidental. There is no half a ball. With 5 balls and 5 shots, the maximum is <strong>5 points</strong>, and to get them you cannot miss a single one. On the world leaderboard, your points add up from game to game.</p>

<p>Time does not score: you get 45 seconds per shot on Easy, 40 on Medium and 35 on Hard, only so the game does not stall.</p>

<h2>The chords at each level</h2>

<p>All four kinds of <a href="/diccionario-musical/acordes/acordes-triadas/">triad</a> come up at all three levels: <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major</a>, <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor</a>, <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented</a> and <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished</a>. What changes is the position:</p>

<ul>
  <li><strong>Easy:</strong> all in root position. The bass note is the root and you write the 3rd and the 5th.</li>
  <li><strong>Medium:</strong> adds 1st inversion. The bass note is the 3rd and you write the 5th and the root above it.</li>
  <li><strong>Hard:</strong> adds 2nd inversion, with the 5th in the bass, and double accidentals can appear.</li>
</ul>

<h2>What this game is for</h2>

<p>Building chords from a given note is a standard harmony and ear-and-theory exam exercise at conservatories, and with inversions it makes you think twice: first which note is the root, then which notes go above the bass. Here is the trick: think of the chord as stacked thirds from the root (a major 3rd plus a minor 3rd makes a major triad; minor plus major, a minor triad; two major 3rds, an augmented triad; two minor 3rds, a diminished triad), and then place it in the position you are asked for. If you would rather practice without a scoreboard, there is the <a href="/ejercicios/acordes/construir-triadas/">build triads exercise</a> and the one on <a href="/ejercicios/acordes/construir-triadas-todas-posiciones/">building triads in all positions</a>. And if you like games, also try <a href="/juegos/teoria/bolos/">Bowling</a>, where you recognize chords instead of building them.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you play Billiards?</div>
      <div class="tm-faq-a">Each player has 5 balls on the table and every ball carries a chord, for example &ldquo;D minor triad&rdquo; or &ldquo;B&flat; augmented triad in 1st inversion&rdquo;. On each shot you choose any ball and build its chord on the staff: the bass note is already written and you write the other two notes. If the chord is right, the ball drops into the pocket.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does scoring work?</div>
      <div class="tm-faq-a">Each ball that drops is worth 1 point, and there are 5 shots, so the maximum is 5 points. Only the whole chord counts: with one wrong note, the ball does not drop. On the world leaderboard, points add up from game to game.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What happens if I get a chord wrong?</div>
      <div class="tm-faq-a">The ball stays on the table with the same chord, and you can shoot at it again on another shot. The game does not show you the solution: it only marks the notes that were right in green and the wrong ones in red, so you can fix it yourself next time.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which chords come up at each level?</div>
      <div class="tm-faq-a">All four kinds of triad at every level: major, minor, augmented and diminished. What changes is the position: on Easy, everything is in root position; Medium adds 1st inversion, and Hard adds 2nd inversion too, with the occasional double accidental.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I play in a group, for example in class?</div>
      <div class="tm-faq-a">Yes. Say how many players there are and type each player&rsquo;s name. Everyone plays on the same table, each with their own balls (solids or stripes), and you take turns. If the leaders tie at the end, the tie is settled with a new ball each round until one player sinks it and the others do not.</div>
    </div>
  </div>
</div>
</div>
</section>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/teoria/">All music theory games</a></li>
    <li><a href="/diccionario-musical/acordes/acordes-triadas/">Triads</a></li>
    <li><a href="/ejercicios/acordes/construir-triadas/">Exercise: build triads</a></li>
    <li><a href="/juegos/teoria/bolos/">Bowling: recognize chords</a></li>
    <li><a href="/juegos/teoria/tiro-al-plato/">Clay target shooting: write scales</a></li>
  </ul>
</aside>
`,
});
