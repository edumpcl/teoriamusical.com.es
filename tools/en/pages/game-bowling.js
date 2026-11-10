const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/theory/bowling/',
  esPath: '/juegos/teoria/bolos/',
  title: 'Bowling: Free Triad Chord Recognition Game',
  description: 'Free music theory game, no microphone: name each triad’s position and type to knock down pins. Play solo or in turns, and chain strikes for a top score.',
  h1: 'Bowling: A Game to Recognize Triads',
  crumbs: [['Games', '/juegos/'], ['Theory games', '/juegos/teoria/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Recognize triads written on the staff and knock down the pins.</strong> Each frame shows a three-note chord: with the first ball you name its <strong>position</strong> (root position, 1st inversion or 2nd inversion) and with the second its <strong>type</strong> (major, minor, diminished or augmented triad). Every correct answer knocks down 5 pins, and if you get both right it is a strike. Speed does not score here, only accuracy. You need no microphone and nothing to install, and you can play alone or in a group, taking turns.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/theory/bowling/play/" title="Music theory game: Bowling" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>

<h2>How to play</h2>

<ol>
  <li><strong>Say how many players you are and choose the level:</strong> Easy, Medium or Hard. If several of you play, type each player&rsquo;s name and pick your musicians.</li>
  <li><strong>First ball: the position.</strong> Look at the lowest note of the chord and press whether it is in root position, 1st inversion or 2nd inversion.</li>
  <li><strong>Second ball: the type.</strong> With the same chord, press whether it is a major, minor, diminished or augmented triad.</li>
  <li><strong>Each correct answer knocks down 5 pins.</strong> If you miss, or time runs out on that ball, the ball goes into the gutter.</li>
  <li><strong>Complete the 5 frames.</strong> In a group, each player plays a whole frame and then passes the turn on, as in a real bowling alley. The score sheet above the lane keeps count.</li>
</ol>

<h2>How scoring works</h2>

<p>Scoring follows the logic of real bowling, adapted to two questions per frame:</p>

<table>
  <thead><tr><th>In the frame</th><th>Pins</th><th>Frame points</th></tr></thead>
  <tbody>
    <tr><td>You miss both balls</td><td>0</td><td>0</td></tr>
    <tr><td>You get one of the two right</td><td>5</td><td>5</td></tr>
    <tr><td>You get both right (strike, X)</td><td>10</td><td>10 + the pins of the next two balls</td></tr>
  </tbody>
</table>

<p>That is why chaining strikes pays off: a strike followed by another is worth 20 points. If the fifth frame is a strike, you get two extra balls with a new chord, which only count to complete that bonus. The maximum, all strikes, is 100 points. Answering fast earns no extra points: the time for each ball (20 s on Easy, 15 s on Medium and 12 s on Hard) is only there so the game does not drag on.</p>

<h2>The chords at each level</h2>

<p>The chords come from the same engine as the <a href="/ejercicios/acordes/triadas-todas-las-posiciones/">triads in all positions exercises</a>, always written in close position, from the bottom up:</p>

<ul>
  <li><strong>Easy:</strong> <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major</a> and <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor</a> triads, in treble clef, with at most one accidental on each note.</li>
  <li><strong>Medium:</strong> the <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented</a> and <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished</a> triads are added.</li>
  <li><strong>Hard:</strong> all four types with up to two accidentals per note, and half of the chords in bass clef.</li>
</ul>

<p>The trick for both balls: <strong>the position is told by the bass.</strong> Arrange the three notes in thirds, like a tower: the note at the bottom of the tower is the root. If the chord already has the root at the bottom, it is in root position; if the 3rd is at the bottom, it is in 1st inversion; if the 5th is, it is in 2nd inversion. And once the tower is in order, the type comes from its two thirds. It is explained step by step in the page on <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>.</p>

<h2>What this game is for</h2>

<p>Knowing at a glance which chord is in front of you and what position it is in is the basis of harmonic analysis, of chord symbols and of the chord dictation you are asked for at a conservatory. This game turns it into a quick routine: one chord, two decisions. If you prefer to practice without a scoreboard, there are the <a href="/ejercicios/acordes/">chord exercises</a>, with printable PDF worksheets. And if you like games, also try <a href="/juegos/teoria/dardos/">Darts</a> (intervals) and <a href="/juegos/teoria/baloncesto/">Basketball</a> (scales).</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does scoring work in Bowling?</div>
      <div class="tm-faq-a">Each frame is one chord and two balls. With the first you name the position of the chord and with the second its type: each correct answer knocks down 5 pins and each miss goes into the gutter. If you get both right it is a strike, worth 10 pins plus the pins of the next two balls. A game has 5 frames and the maximum is 100 points.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does speed count?</div>
      <div class="tm-faq-a">No. Unlike Darts, answering fast earns no extra points: only accuracy counts. Each ball has a time limit (20 seconds on Easy, 15 on Medium and 12 on Hard) so the game does not drag on; if it runs out, the ball goes into the gutter.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which chords appear at each level?</div>
      <div class="tm-faq-a">On Easy, major and minor triads in treble clef, with at most one accidental per note. On Medium, augmented and diminished triads are added. On Hard, all four types appear with up to two accidentals per note, and half of the chords are in bass clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know the position of a chord?</div>
      <div class="tm-faq-a">By the lowest note. If the bass is the root, the chord is in root position; if it is the 3rd, in 1st inversion; if it is the 5th, in 2nd inversion. To find the root, arrange the notes in thirds: the bottom note of that tower is the root.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I play in a group, for example in class?</div>
      <div class="tm-faq-a">Yes. Say how many players you are and type each player&rsquo;s name. As in a bowling alley, each player takes a whole frame (both balls) and passes to the next. The scoreboard shows everyone&rsquo;s points and at the end you see who won.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I need a microphone?</div>
      <div class="tm-faq-a">No. Bowling never uses the microphone: you play by pressing the answer with the mouse, your finger or the keyboard.</div>
    </div>
  </div>
</div>
</div>
</section>

<p>Would you rather build the chords yourself? In <a href="/juegos/teoria/billar/">Billiards</a>, each ball carries a chord and, to pocket it, you have to write its notes on the staff.</p>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/teoria/">All music theory games</a></li>
    <li><a href="/diccionario-musical/acordes/acordes-triadas/">Triads</a></li>
    <li><a href="/ejercicios/acordes/triadas-todas-las-posiciones/">Exercise: triads in all positions</a></li>
    <li><a href="/juegos/teoria/dardos/">Darts: recognize intervals</a></li>
    <li><a href="/juegos/teoria/baloncesto/">Basketball: recognize scales</a></li>
  </ul>
</aside>
`,
});
