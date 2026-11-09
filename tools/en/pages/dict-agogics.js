const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/agogics/',
  esPath: '/diccionario-musical/agogica/',
  title: 'Agogics: Tempo Changes (rit., accel., a tempo, fermata)',
  description: 'What agogics are and what accelerando, ritardando, rallentando, ritenuto, a tempo, più mosso, rubato and the fermata mean, and how they differ.',
  h1: 'Agogics: Tempo Changes in Music',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: [],
  body: `
<p><strong>Agogics</strong> are the <strong>changes of speed</strong> during a performance (speeding up, slowing down, pausing for a moment or bending the tempo for expression) and the markings that ask for them. If the <a href="/diccionario-musical/tempo-musical/">tempo</a> says how fast the music goes, agogics say <strong>how that speed changes</strong> while you play.</p>

<p>These terms are easier to understand once you have heard them, so try each one on the metronome or with an instrument as you read. The list below describes exactly what happens to the beat in each case.</p>

<!-- NEEDS ENGINE agogica-audio: the Spanish page has six audio demos (accelerando, ritardando, ritenuto, a tempo, fermata, rubato). Left out until the script is supported. -->
<h2>The six basic ideas at a glance</h2>

<ul>
  <li><strong>Accelerando:</strong> the beat speeds up little by little (for example from 60 to 132 beats per minute over eight seconds).</li>
  <li><strong>Ritardando:</strong> the opposite. The beat slows down gradually (for example from 120 to 60). <em>Rallentando</em> is just as gradual.</li>
  <li><strong>Ritenuto:</strong> the slowing is usually not gradual. The tempo is held back <strong>at once</strong> and stays there. Compare it with ritardando.</li>
  <li><strong>A tempo:</strong> after slowing down, <strong>the earlier speed</strong> returns, all at once rather than gradually.</li>
  <li><strong>Fermata:</strong> the beat stops on a note for as long as the performer decides, then the music continues as before.</li>
  <li><strong>Rubato:</strong> the tempo "breathes". Time is taken from some notes and given back to others. How much depends on style and performer.</li>
</ul>

<h2>Speeding up: accelerando and stringendo</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Term</th><th>Abbreviation</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><strong>Accelerando</strong></td><td>accel.</td><td>Speed up gradually and continuously.</td></tr>
    <tr><td><strong>Stringendo</strong></td><td>string.</td><td>"Pressing": speed up while building tension, often together with an increase in volume.</td></tr>
    <tr><td><strong>Affrettando</strong></td><td>—</td><td>"Hurrying": speed up with an agitated character.</td></tr>
    <tr><td><strong>Doppio movimento</strong></td><td>—</td><td>Move at once to a doubled speed, usually understood as <strong>twice</strong> the previous speed. It is not gradual.</td></tr>
  </tbody>
</table>
</div>

<h2>Slowing down: ritardando, rallentando and ritenuto</h2>

<p>All three slow the music, but not in the same way. This is the most common source of confusion:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Term</th><th>Abbreviation</th><th>How it slows</th></tr></thead>
  <tbody>
    <tr><td><strong>Ritardando</strong></td><td>rit. / ritard.</td><td><strong>Gradually</strong>: each note a little slower than the one before.</td></tr>
    <tr><td><strong>Rallentando</strong></td><td>rall.</td><td>Also <strong>gradually</strong>. In many scores it is a synonym of ritardando, though it often suggests a broader, wider slowing.</td></tr>
    <tr><td><strong>Ritenuto</strong></td><td>riten.</td><td>Usually <strong>at once</strong>: the tempo is held back and the music continues at that new speed.</td></tr>
    <tr><td><strong>Allargando</strong></td><td>allarg.</td><td>"Broadening": slow down while widening the character of the phrase, with a feeling of weight. It often comes with a crescendo, though that is not required.</td></tr>
    <tr><td><strong>Morendo</strong> / <strong>perdendosi</strong></td><td>—</td><td>"Dying away" or "losing itself": the music fades gradually, usually losing volume and often movement as well.</td></tr>
  </tbody>
</table>
</div>

<p><strong>A warning about abbreviations:</strong> the usual forms are <em>rit.</em> for ritardando, <em>rall.</em> for rallentando and <em>riten.</em> for ritenuto, but not every edition follows them, and many write <em>rit.</em> for both ritardando and ritenuto. When in doubt, let the music decide: if it slows from the next note and then continues at that speed, it is a ritenuto. If it eases off note by note, it is a ritardando.</p>

<h2>Returning to the tempo or changing to a new one</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><strong>A tempo</strong></td><td>Return to the speed before the change.</td></tr>
    <tr><td><strong>Tempo primo</strong> (Tempo I)</td><td>Return to the tempo <strong>at the beginning</strong> of the piece, even if other tempos came in between.</td></tr>
    <tr><td><strong>Più mosso</strong></td><td>"More motion": a new, faster tempo <strong>starting right now</strong>, not gradually.</td></tr>
    <tr><td><strong>Meno mosso</strong></td><td>"Less motion": a new, slower tempo, also immediate.</td></tr>
    <tr><td><strong>L&rsquo;istesso tempo</strong></td><td>The same tempo, even though the time signature or the note carrying the beat changes: the notation changes, not the speed of the movement.</td></tr>
  </tbody>
</table>
</div>

<p>The difference from accelerando and ritardando matters: <em>più mosso</em> and <em>meno mosso</em> <strong>are not transitions</strong>. They are a change of speed that starts on that very note. In short: with an <strong>accelerando</strong> you arrive gradually at another tempo, while with <strong>più mosso</strong> you start in it directly.</p>

<h2>The performer's freedom: rubato, a piacere, ad libitum</h2>

<p><strong>Tempo rubato</strong> ("stolen time") lets the performer stretch some notes and squeeze others for expression. In its traditional sense, what is taken is given back, so the phrase breathes without losing the overall pulse. In practice, how much freedom is taken depends on style and context. <em>A piacere</em>, <em>a capriccio</em> and <em>ad libitum</em> leave the tempo to the performer's taste in an even more open way.</p>

<h2>The fermata</h2>

<p>The <strong>fermata</strong> (𝄐) neither speeds up nor slows down: it <strong>stops the beat</strong>. The note it sits on lasts longer than its written value, and the performer decides how much longer. It can go over a note, over a rest, and also over a bar line, where it marks a short suspension before the music continues.</p>

<h2>Exercises</h2>

<p>To check what you know, try the <a href="/ejercicios/tempo/">tempo and agogics exercises</a>: a quiz on meanings with a level devoted to agogics, another one for ordering speeds, and a PDF worksheet with answers.</p>

<h2>How to practice</h2>

<p>Agogics are much easier to control once the basic tempo feels solid, so practice them with the <a href="/herramientas/metronomo/">online metronome</a>. Its <strong>practice mode</strong> goes from a starting tempo to an ending tempo over a set number of measures (UK: bars), which is exactly a controlled accelerando or ritardando. To review the speed terms and their BPM, see the page on <a href="/diccionario-musical/tempo-musical/">musical tempo</a>. For the other great expressive tool, see <a href="/diccionario-musical/dinamica-musical/">musical dynamics</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are agogics in music?</div>
      <div class="tm-faq-a">Agogics are the markings and practices that change the speed of a piece while it is performed: speeding up (accelerando), slowing down (ritardando, rallentando, ritenuto), returning to the previous tempo (a tempo), pausing (fermata) or taking expressive liberties (rubato).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between ritardando and ritenuto?</div>
      <div class="tm-faq-a">Ritardando slows gradually: each note is a little slower than the one before. Ritenuto holds the tempo back at once, and the music continues at that new speed. Many editions abbreviate both as rit., so look at the musical context.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are ritardando and rallentando the same?</div>
      <div class="tm-faq-a">Practically yes: both slow down gradually, and many editions use them interchangeably. The usual difference is one of character: rallentando tends to feel broader, as if the music were widening.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does a tempo mean?</div>
      <div class="tm-faq-a">Return to the speed that was in place before the change, and do it at once. If you need to return to the tempo from the start of the piece, it is written Tempo primo or Tempo I.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is più mosso the same as accelerando?</div>
      <div class="tm-faq-a">No. Accelerando is a transition: the speed rises little by little. Più mosso is a new, faster tempo that starts on that very note, with no transition. Meno mosso works the same way, but slower.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long does a fermata last?</div>
      <div class="tm-faq-a">As long as the performer decides. The fermata extends the note it sits on beyond its written length, and it can go over a note, a rest or a bar line.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
