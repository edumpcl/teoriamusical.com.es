const fs = require('fs');
const path = require('path');
const dictionaryPage = require('../dictionary-page');

// The two staff examples are Verovio SVGs inlined in the Spanish page (notation has no language);
// they are taken from there and only the accessible label (aria-label) is replaced with an English one.
const esHtml = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'diccionario-musical', 'compases', 'notas-a-contratiempo', 'index.html'), 'utf8');
const blocks = [...esHtml.matchAll(/<!--VEROVIO-->([\s\S]*?)<!--\/VEROVIO-->/g)].map(m => m[1]);
if (blocks.length < 2) throw new Error('off-beat notes: expected 2 Verovio SVGs in the Spanish page');
const vero = (i, label) => blocks[i].replace(/aria-label="[^"]*"/, 'aria-label="' + label + '"');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/off-beat-notes/',
  esPath: '/diccionario-musical/compases/notas-a-contratiempo/',
  title: 'Off-Beat Notes: What They Are and How to Write Them',
  description: 'An off-beat note starts on a weak beat or weak part of a beat, right after a rest. Definition, staff examples and how it differs from syncopation.',
  h1: 'Off-Beat Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  body: `<p>An <strong>off-beat note</strong> (Spanish: <em>nota a contratiempo</em>) is a note that starts on a weak beat or a weak part of a beat, such as the "and" between two beats, with a <strong>rest</strong> immediately before it. The result is a displaced accent that pushes the rhythm forward: the note arrives exactly where the listener does not expect it. It is the main rhythmic device of reggae, ska, bossa nova and many Latin American rhythms. It is closely related to <a href="/diccionario-musical/compases/sincopa/">syncopation</a>, but the two are different things.</p>

<p><strong>A note on terms.</strong> In everyday English, "off-beat" often just means "not on the beat", and "syncopation" is used for almost any displaced accent. This page follows the stricter distinction taught in Spanish-language theory (<em>contratiempo</em> versus <em>síncopa</em>), because it is precise and easy to test: what happens on the strong position, a rest or a sustained note?</p>

<h2>Formal definition</h2>

<p>A note is off-beat when:</p>
<ol>
  <li>There is a <strong>rest</strong> immediately before the note. The rest does not have to be on the strongest possible position. It only has to be there.</li>
  <li>The note starts on a <strong>weak beat or weak part of a beat</strong>.</li>
  <li>The note does <strong>not sound through the next strong beat</strong>: it ends before the next strong pulse arrives, or that pulse is simply silent (a rest).</li>
</ol>

<p>The key difference from syncopation is what happens on the strong position. In an off-beat figure, the strong position is a <strong>rest</strong>. In syncopation, the strong position is <strong>covered by a note that began earlier</strong> (written with a tie, or as one longer note value).</p>

<p><strong>Practice:</strong> test whether you can find the off-beat note with our <a href="/ejercicios/compases/contratiempo/">interactive exercise</a>: tap the off-beat note on the staff, or choose "no off-beat" if the excerpt has none.</p>

<h2>Simple off-beat pattern in 4/4: staff example</h2>

<p>The most basic off-beat pattern in 4/4 is an eighth note on the "and" (the weak part of the beat) while the beat itself (the strong part) is a rest.</p>

<figure>
  <div id="ex-ct-simple" style="background:#faf8f4;border-radius:6px;padding:8px 4px;display:inline-block;max-width:100%;overflow-x:auto;"><!--VEROVIO-->${vero(0, 'Staff in 4/4, treble clef. Eighth rest, C eighth note, eighth rest, D eighth note, eighth rest, E eighth note, eighth rest, F eighth note.')}<!--/VEROVIO--></div>
  <figcaption>Simple off-beat pattern in 4/4: eighth rests on beats 1, 2, 3 and 4 (the strong parts) and notes on the "and" of each beat (the weak parts).</figcaption>
</figure>

<h2>A common mistake: the note that lasts too long</h2>

<p>It is easy to think that an off-beat note can be as long as you like as long as no tie is written. That is wrong. If the note that starts on the "and" lasts long enough to keep sounding into the next strong beat, even when it is written as a single note value with no tie, that strong beat is covered anyway. A strong beat covered by a note that began on a weak part is, by definition, <a href="/diccionario-musical/compases/sincopa/">syncopation</a>, not an off-beat note. A tie is only the usual way to write that extension when the note has to be split into two note values. The sound, and the classification, are the same with or without a tie.</p>

<p>So in a true off-beat figure the note always <strong>ends before the next strong beat arrives</strong>. That strong beat is left literally silent, not covered by the previous note. In 4/4, for example, an eighth rest on beat 1 followed by a note that fills only the "and" (another eighth note) is off-beat. The same note stretched to cover beat 2 without being re-attacked is no longer off-beat.</p>

<h2>Off-beat notes in 3/4: staff example</h2>

<p>In triple meters, a common off-beat figure is a note that starts on a weak beat while the strong beat 1 is a rest.</p>

<figure>
  <div id="ex-ct-34" style="background:#faf8f4;border-radius:6px;padding:8px 4px;display:inline-block;max-width:100%;overflow-x:auto;"><!--VEROVIO-->${vero(1, 'Staff in 3/4, treble clef. Quarter rest, D quarter note, E quarter note.')}<!--/VEROVIO--></div>
  <figcaption>Off-beat note in 3/4: a rest on beat 1 (strong) and the first note on beat 2 (weak). That first note is the off-beat note.</figcaption>
</figure>

<h2>Off-beat notes in compound meters</h2>

<p>In <strong>6/8</strong>, each beat is made of three eighth notes. The weak parts of each beat are its 2nd and 3rd eighth notes. An off-beat figure appears when a rest sits on the first eighth of a beat (the 1st and 4th eighths of the measure) and the note is attacked on a weak eighth, for example the 2nd and 5th.</p>

<p>In jazz, bossa nova and samba, the pattern of off-beats over 6/8 or 12/8 defines the particular groove. The <a href="/herramientas/metronomo/">online metronome</a> set to 6/8 is an effective tool for practicing these off-beats.</p>

<h2>Off-beats in musical practice</h2>

<p>Off-beat notes appear structurally in several styles:</p>

<ul>
  <li><strong>Reggae and ska:</strong> the rhythm guitar plays chords on the off-beats (the "and" of each beat), the "skank", while the bass and drums mark the pulse. The guitar sits "in the gap".</li>
  <li><strong>Bossa nova:</strong> the guitar pattern alternates attacks on the beat with attacks off the beat, creating its characteristic rocking feel.</li>
  <li><strong>Flamenco:</strong> shouts (<em>jaleos</em>), hand claps (<em>palmas</em>) and footwork (<em>zapateado</em>) often use off-beat accents to "break" the meter and build tension before a resolution.</li>
  <li><strong>Swing jazz:</strong> a soloist's notes often fall on the off-beats, giving the feeling of playing "behind" or "ahead of" the beat.</li>
</ul>

<h2>Difference between off-beat notes and syncopation</h2>

<p>The distinction is precise:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th></th>
      <th>Off-beat note</th>
      <th>Syncopation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Strong beat</strong></td>
      <td>Silent (a rest)</td>
      <td>Covered (a note sustained into it)</td>
    </tr>
    <tr>
      <td><strong>Tie</strong></td>
      <td>None</td>
      <td>Needed (or a single long note)</td>
    </tr>
    <tr>
      <td><strong>The weak-beat note</strong></td>
      <td>Ends before the next strong beat</td>
      <td>Continues into the next strong beat</td>
    </tr>
    <tr>
      <td><strong>Sound</strong></td>
      <td>Sharp, detached, "in the gap"</td>
      <td>Flowing, continuous, "ahead of the beat"</td>
    </tr>
  </tbody>
</table>
</div>

<p>In practice, many musicians use "syncopation" for any displacement of the accent, off-beat notes included. In music theory, however, they are separate concepts.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is an off-beat note?</div>
    <div class="tm-faq-a">An off-beat note starts on a weak beat or weak part of a beat, such as the "and", with a rest immediately before it. The rest does not have to be the strongest in the measure, it just has to sit right before the note. Unlike syncopation, the note does not sound through the next strong beat: that beat is silent.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How are off-beat notes written in a score?</div>
    <div class="tm-faq-a">An off-beat is written with an eighth rest on the strong part of the beat and an eighth note (or the matching note value) on the weak part. For example, in 4/4: eighth rest, eighth note, eighth rest, eighth note fills beats 1 and 2.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between off-beat notes and syncopation?</div>
    <div class="tm-faq-a">In an off-beat figure there is a real rest on the strong position, just before the weak-beat note. In syncopation the weak-beat note keeps sounding through the next strong beat, so that beat is covered by the note rather than silent. Off-beats sound sharper and syncopation sounds more flowing.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Which musical styles use off-beat notes?</div>
    <div class="tm-faq-a">Off-beats are essential in reggae (the guitar plays the "skank" on the off-beat), ska, calypso and many Latin American rhythms such as bossa nova. In flamenco, shouts and hand claps use off-beat accents structurally. In rock, a guitarist may hit chords between the drum beats.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What are off-beat notes in triple and compound meters?</div>
    <div class="tm-faq-a">In 3/4, a common off-beat note is an attack on the "and" of a beat (the second eighth of that beat) when the first eighth is a rest. In 6/8, off-beats can fall on the weak eighths of each compound beat, for example the 2nd and 5th eighth notes of the measure, when the eighths on the beats are rests.</div>
  </div>
</div>
</div>
</div>
</section>`,
});
