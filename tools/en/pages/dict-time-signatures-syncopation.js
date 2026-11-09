const fs = require('fs');
const path = require('path');
const dictionaryPage = require('../dictionary-page');

// The three staff examples are Verovio SVGs inlined in the Spanish page (notation has no language);
// they are taken from there and only the accessible label (aria-label) is replaced with an English one.
const esHtml = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'diccionario-musical', 'compases', 'sincopa', 'index.html'), 'utf8');
const blocks = [...esHtml.matchAll(/<!--VEROVIO-->([\s\S]*?)<!--\/VEROVIO-->/g)].map(m => m[1]);
if (blocks.length < 3) throw new Error('syncopation: expected 3 Verovio SVGs in the Spanish page');
const vero = (i, label) => blocks[i].replace(/aria-label="[^"]*"/, 'aria-label="' + label + '"');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/syncopation/',
  esPath: '/diccionario-musical/compases/sincopa/',
  title: 'Syncopation in Music: Types, Examples and Notation',
  description: 'Syncopation shifts the accent: a note starts on a weak beat and sounds through the next strong one. Types, staff examples and the off-beat difference.',
  h1: 'Syncopation in Music',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  body: `<p><strong>Syncopation</strong> is a displacement of the natural rhythmic accent of the measure: a note starts on a <em>weak</em> beat or weak part of a beat and keeps sounding through the next <em>strong</em> beat, usually written with a tie. The strong beat is "swallowed": it is not attacked again, and the accent is felt earlier than the meter would lead you to expect. Syncopation is a key idea for understanding <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">rhythmic accents</a> and an essential expressive tool in jazz, blues, Latin music and pop.</p>

<h2>Formal definition</h2>

<p>In classical theory, syncopation happens when a note:</p>
<ol>
  <li>Starts on a <strong>weak beat or weak part</strong> of the measure.</li>
  <li>Continues, usually through a tie, into the <strong>strong beat or strong part</strong> that follows immediately.</li>
  <li>Is <strong>not attacked again</strong> on that strong beat or part: the natural accent is covered by the earlier note.</li>
</ol>

<p>What matters is the sound, not the spelling. A tie (the curved line joining two notes of the same pitch) is the usual way to write a note that crosses a strong position, but a single longer note value does the same job. The key point is that the strong position is <strong>covered by a sustained note</strong>. If the strong position is instead a <strong>rest</strong>, the figure is an <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat note</a>, not syncopation.</p>

<h2>Types of syncopation</h2>

<p>Depending on the metrical level where the displacement happens, there are three types:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Where it starts</th>
      <th>What it covers</th>
      <th>Typical example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Measure syncopation</strong></td>
      <td>Weak beat of measure N</td>
      <td>Strong beat of measure N+1</td>
      <td>A note at the end of a measure tied to the start of the next</td>
    </tr>
    <tr>
      <td><strong>Beat syncopation</strong></td>
      <td>Weak or medium beat inside the measure</td>
      <td>The next strong or medium beat</td>
      <td>A note on beat 2 tied to beat 3 in 4/4</td>
    </tr>
    <tr>
      <td><strong>Part-of-beat syncopation</strong></td>
      <td>Weak part of a beat</td>
      <td>The strong part of the next beat</td>
      <td>A note on the "and" of a beat tied to the whole next beat</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Beat syncopation in 4/4: staff example</h2>

<p>The most frequent example in quadruple meter (4/4) is <strong>beat syncopation</strong>: a note starts on weak beat 2 and is tied to beat 3, a medium (secondary strong) beat, which is covered.</p>

<figure>
  <div id="ex-sincopa-tiempo" style="background:#faf8f4;border-radius:6px;padding:8px 4px;display:inline-block;max-width:100%;overflow-x:auto;"><!--VEROVIO-->${vero(0, 'Staff in 4/4, treble clef. C quarter note, D quarter note tied to the next, D quarter note, E quarter note.')}<!--/VEROVIO--></div>
  <figcaption>Beat syncopation in 4/4: C on beat 1, D tied from beat 2 to beat 3 (the syncopation), E on beat 4. Beat 3 is covered.</figcaption>
</figure>

<h2>Part-of-beat syncopation in 4/4: staff example</h2>

<p>In <strong>part-of-beat syncopation</strong>, the note starts on the weak part of a beat (the "and" when the beat is divided into eighth notes) and is tied across the strong part of the next beat.</p>

<figure>
  <div id="ex-sincopa-parte" style="background:#faf8f4;border-radius:6px;padding:8px 4px;display:inline-block;max-width:100%;overflow-x:auto;"><!--VEROVIO-->${vero(1, 'Staff in 4/4, treble clef. C quarter note, D eighth note, E eighth note tied to the next, E quarter note, F quarter note.')}<!--/VEROVIO--></div>
  <figcaption>Part-of-beat syncopation: a note on the "and" of beat 2 is tied to beat 3. Beat 3 is covered.</figcaption>
</figure>

<h2>Measure syncopation: staff example</h2>

<p><strong>Measure syncopation</strong> crosses the bar line: a note on a weak beat of the measure is tied to the first, strong beat of the next measure.</p>

<figure>
  <div id="ex-sincopa-compas" style="background:#faf8f4;border-radius:6px;padding:8px 4px;display:inline-block;max-width:100%;overflow-x:auto;"><!--VEROVIO-->${vero(2, 'Staff in 4/4, treble clef. Measure 1: C quarter note, D quarter note, E quarter note, F quarter note tied to the next. Measure 2: F half note, E quarter note, D quarter note.')}<!--/VEROVIO--></div>
  <figcaption>Measure syncopation in 4/4: beat 4 of the first measure is tied to beat 1 of the next, covering the strong accent.</figcaption>
</figure>

<h2>Syncopation in triple and compound meters</h2>

<p>In <strong>3/4</strong>, the most common syncopation is a note that starts on beat 2 and is tied to beat 3, or a note on beat 3 tied to beat 1 of the next measure. The waltz and the minuet have moments of syncopation that briefly break the regular strong-weak-weak pattern.</p>

<p>In <strong>compound meters</strong> (6/8, 9/8...) syncopation also happens between the parts of a compound beat. A note that starts on a weak eighth note (the 2nd or 3rd of a group of three) and is tied across the next strong eighth is syncopated. This includes a note on the last eighth of a beat tied to the first eighth of the next beat, or a note on the last eighth of the measure tied across the bar line.</p>

<h2>Difference between syncopation and off-beat notes</h2>

<p>The two ideas are related but distinct:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th></th>
      <th>Syncopation</th>
      <th>Off-beat note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Attack</strong></td>
      <td>On a weak beat or weak part</td>
      <td>On a weak beat or weak part</td>
    </tr>
    <tr>
      <td><strong>Strong beat</strong></td>
      <td>Covered (the note is sustained into it)</td>
      <td>Silent (there is a rest)</td>
    </tr>
    <tr>
      <td><strong>Tie</strong></td>
      <td>Needed (or one long note)</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Effect</strong></td>
      <td>The accent is shifted to the weak position</td>
      <td>Accent on the weak position, strong beat left silent</td>
    </tr>
  </tbody>
</table>
</div>

<p>In practice, both create a similar effect of "displaced energy", but syncopation tends to sound more flowing because there is no rest on the strong beat, while an off-beat note has a sharper, more detached character. See the page on <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat notes</a> for more.</p>

<h2>Syncopation in popular music</h2>

<p>Syncopation is the basis of the rhythmic character of <strong>jazz</strong>, <strong>funk</strong> and <strong>bossa nova</strong>. In jazz, the melody rarely follows the strong beats of the measure: musicians anticipate harmonic changes by attacking on the "and" before the chord change, which creates a feeling of forward drive. In bossa nova, the guitar pattern is built on syncopations that keep challenging the listener's expectations. <strong>Reggae</strong> is a related case: the guitar "skank" on the "and" of each beat is mostly a matter of off-beats (rests on the beat) rather than syncopation in the strict sense, while the bass lines often use true syncopation.</p>

<p><strong>Practice:</strong> test whether you can find the syncopation with our <a href="/ejercicios/compases/sincopa/">interactive exercise</a>: tap the note where it starts on the staff, or choose "no syncopation" if the excerpt has none.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is syncopation in music?</div>
    <div class="tm-faq-a">Syncopation is a displacement of the natural rhythmic accent of the measure: a note starts on a weak beat or weak part and keeps sounding through the next strong beat, usually written with a tie. The strong beat is "swallowed" by the note that came before it.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What are the types of syncopation?</div>
    <div class="tm-faq-a">There are three main types. Measure syncopation: the weak-beat note crosses the bar line into the strong beat of the next measure. Beat syncopation: the weak-beat note crosses into a strong or medium beat inside the same measure. Part-of-beat syncopation: the weak-part note crosses into the strong part of a subdivided beat.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How is syncopation written in a score?</div>
    <div class="tm-faq-a">Syncopation is written by placing a note on a weak beat or weak part and tying it to the next note, which falls on the strong beat. The tie means the note is not attacked again: the weak-beat note keeps sounding through the strong beat. A single longer note value gives the same sound.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between syncopation and an off-beat note?</div>
    <div class="tm-faq-a">In syncopation, the weak-beat note keeps sounding through the strong beat, so the strong beat is covered. In an off-beat note, the note is attacked on the weak part of the beat and does not reach the strong beat, which stays silent (a rest). They are related but different.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Which musical styles use syncopation a lot?</div>
    <div class="tm-faq-a">Syncopation is essential in jazz, blues, funk, bossa nova and Latin music. In modern pop and rock it appears constantly in drum, bass and rhythm guitar lines. It is also common in classical music of many periods.</div>
  </div>
</div>
</div>
</div>
</section>`,
});
