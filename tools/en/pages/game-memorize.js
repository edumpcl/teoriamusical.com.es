const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/games/ear-training/memorize/',
  esPath: '/juegos/auditivos/memoriza/',
  title: 'Memorize: Free Musical Memory Game',
  description: 'Free ear training game: listen to a sequence of notes and repeat it on the board. It grows by one note each time. Three levels, from colors to ear only.',
  h1: 'Memorize: A Musical Memory Game',
  crumbs: [['Games', '/juegos/'], ['Ear training games', '/juegos/auditivos/']],
  scripts: ['juego-embed'],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `
<p><strong>Listen, remember and repeat.</strong> The board plays a sequence of notes and you repeat it by pressing the sectors in the same order. Each time you get the whole sequence right, it grows by one note, and the game lasts until your first mistake. It is a game to train your <strong>auditory memory</strong> with the seven natural notes, in three levels: from color and light to ear only. You do not need a microphone or to install anything, and you can play alone or in a group, taking turns.</p>

<div class="tm-juego-wrap" style="margin:18px 0">
<iframe class="tm-juego" src="/en/games/ear-training/memorize/play/" title="Ear training game: Memorize" style="display:block;width:100%;min-height:640px;border:0;border-radius:14px;background:#14213d"></iframe>
<noscript><p>This game needs JavaScript turned on in your browser.</p></noscript>
</div>

<h2>How to play</h2>

<ol>
  <li><strong>Turn up the volume</strong> or put on headphones. Before you start you can tap the board to hear how each note sounds.</li>
  <li><strong>Say how many players there are</strong> and choose the level: Easy, Medium or Hard. If several of you play, type each person&rsquo;s name and choose your musicians.</li>
  <li><strong>Listen to the sequence.</strong> In the first round it is a single note; on Easy and Medium, the sector that sounds also lights up.</li>
  <li><strong>Repeat it</strong> by pressing the sectors in the same order. You have 5 seconds for each note. On a computer you can also use the keys 1 to 7 (or A S D F G H J), from C to B.</li>
  <li><strong>The sequence grows.</strong> If you repeat all of it, it plays again with one more note. At the first mistake your turn ends, and the game shows you in green the note you needed.</li>
</ol>

<h2>The three levels</h2>

<ul>
  <li><strong>Easy:</strong> each note has its name and its color (the ones used by Boomwhackers tuned percussion tubes: C red, D orange, E yellow, F light green, G dark green, A purple and B pink) and the sector lights up as it sounds. You can remember the sequence by color and by sound at the same time.</li>
  <li><strong>Medium:</strong> all the sectors are white, with their names, and the one that sounds lights up. There is no color to help you any more: you remember the position and the sound.</li>
  <li><strong>Hard:</strong> you see the names, but nothing lights up. You only hear the sequence, so you have to recognize each note by its pitch, as in a musical dictation.</li>
</ul>

<h2>How scoring works</h2>

<p>Your score is the <strong>longest sequence you repeated in full</strong>: if you miss on the 8-note sequence, your score is 7. Each answer is either right or wrong, with nothing in between, and time does not give points: the 5 seconds per note are only there so the game does not sit idle. On the world leaderboard your <strong>best sequence</strong> counts, so a worse game does not lower your score.</p>

<p>If several of you play, each player gets <strong>their own sequence</strong>, new on every turn, so the players who go later have not heard it already; whoever gets furthest wins. If two players reach the same length, they tie.</p>

<h2>What this game is for</h2>

<p>Remembering a series of sounds and knowing which one is which is the basis of <strong>musical dictation</strong> and of playing by ear: holding a phrase long enough to write it down or repeat it on your instrument. Memorize trains it step by step: on Easy you lean on color, on Medium on position and on Hard only on your ear. A trick that works: sing the name of each note in your head while it sounds, and group the sequence into chunks of three or four notes, like the motifs of a melody. If you want to review the notes first, see the page on the <a href="/diccionario-musical/nombres-de-las-notas-musicales/">names of musical notes</a>. To keep training your ear without a scoreboard, try the ear training exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a> And if singing is more your thing, try the <a href="/juegos/entonacion/">singing games</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you play Memorize?</div>
      <div class="tm-faq-a">The board plays a sequence of notes and you repeat it by pressing the sectors in the same order. The first sequence has one note; each time you repeat all of it, another note is added. The game ends as soon as you press a wrong note or 5 seconds pass without a press. Your score is the longest sequence you managed to repeat.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What changes in each level?</div>
      <div class="tm-faq-a">On Easy each note has its name and its color, and the sector lights up when it sounds. On Medium all the sectors are white, with their names, and the one that sounds lights up. On Hard you see the names, but nothing lights up: you only hear the sequence and have to recognize each note by its sound. On all three levels the same seven notes sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which notes come up?</div>
      <div class="tm-faq-a">The seven natural notes of the middle octave (C, D, E, F, G, A and B, from C4 to B4), with no accidentals, with a marimba sound. The sequence is random and the same note never comes up more than twice in a row.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I need a microphone?</div>
      <div class="tm-faq-a">No. Memorize does not use the microphone: you listen through the speaker or headphones and answer with your finger, the mouse or the keyboard (keys 1 to 7, or A S D F G H J). It helps to turn up the volume or use headphones, especially on the Hard level.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I play in a group, for example in class?</div>
      <div class="tm-faq-a">Yes. Say how many players there are and type each person&rsquo;s name. Each player takes a full turn with a new sequence, so nobody has heard it before another player, and whoever gets furthest wins.</div>
    </div>
  </div>
</div>
</div>
</section>

<aside class="tm-related">
  <h2>Related pages</h2>
  <ul>
    <li><a href="/juegos/auditivos/">All ear training games</a></li>
    <li><a href="/diccionario-musical/nombres-de-las-notas-musicales/">The names of musical notes</a></li>
    <li><a href="/juegos/auditivos/ciclismo-en-pista/">Track Cycling: major or minor?</a></li>
    <li><a href="/juegos/entonacion/">Singing games</a></li>
    <li><a href="/juegos/teoria/">Music theory games</a></li>
  </ul>
</aside>
`,
});
