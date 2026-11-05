const tunerInstrument = require('../tuner-instrument');

// Facts checked against the Spanish page (trompa). Horn in F sounds a perfect fifth below written.
// transp: 7 (the Spanish page has -5, which shows the written note one octave below modern treble-clef horn parts:
// written = sounding + 7). Same choice as the English horn page.
// Spanish page errors: the table says written E4 sounds A4 = 440 Hz (it sounds A3, 220 Hz; written E5 = A4); pushing the tuning
// slide in does not lower the pitch; hand-stopping does not lower the pitch by a semitone (a fully stopped note sounds about a half step higher; a
// cupped hand lowers it a little); "warm up 10-15 minutes" and the notes said to be flat/sharp are unverified and left out.
module.exports = tunerInstrument({
  slug: 'french-horn', esSlug: 'trompa', name: 'French Horn',
  title: 'Free Online French Horn Tuner — Horn in F',
  description: 'Tune your French horn online with your microphone. Shows the sounding and written note for a horn in F, A4 adjustable. Free, no install.',
  swDescription: 'Tune your horn in F online with your device’s microphone. The tuner shows the sounding note and the written note, with an adjustable A4 reference.',
  h1: 'Online French Horn Tuner',
  transp: 7,
  intro: [
    'This tuner works in your browser with your device’s microphone. It is set for the horn in F, the transposition used for the horn (French horn) in orchestra and band. The tuner shows the note that sounds and the note you read in your part.',
    'Play a steady note, hold it, and watch the cents meter. Left of center means flat, and right of center means sharp.',
  ],
  sections: [
    {
      h2: 'The horn is a transposing instrument in F',
      html: `<p>When a horn player reads a written C, an F sounds, a perfect fifth lower. In treble clef, the written note is always a perfect fifth above the sounding note:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (treble clef)</th>
    <th>Sounding note (concert pitch)</th>
  </tr></thead>
  <tbody>
    <tr><td>C4 (middle C)</td><td>F3 (174.6 Hz)</td></tr>
    <tr><td>F4</td><td>B♭3 (233.1 Hz)</td></tr>
    <tr><td>G4</td><td>C4 (261.6 Hz)</td></tr>
    <tr><td>E5 ← common tuning note</td><td>A4 (440 Hz)</td></tr>
  </tbody>
</table>
</div>
<p>To tune to A4 = 440 Hz, play a written E5 and bring the needle to 0¢. The tuner shows the same letter name (E) as the written note. It may place the note in a different octave than your part, so go by the letter name and the cents meter.</p>`,
    },
    {
      h2: 'The double horn: F side and B♭ side',
      html: `<p>Most modern horns are <strong>double horns</strong>. They have two sets of tubing, one in F and one in B♭, and a thumb valve switches between them. The B♭ side is a perfect fourth higher than the F side, which makes high notes more secure.</p>
<ul>
<li>Each side has its own tuning slide and its own set of valve slides, so tune each side separately.</li>
<li>Start with the F side, with no thumb valve pressed, then check the same notes on the B♭ side.</li>
<li>The tuner works on both sides, because it reads the sounding pitch.</li>
</ul>`,
    },
    {
      h2: 'How to adjust the pitch of your horn',
      html: `<ul>
<li><strong>Main tuning slide:</strong> <strong>pushing it in</strong> shortens the tube and raises the pitch. <strong>Pulling it out</strong> lengthens the tube and lowers the pitch.</li>
<li><strong>Valve slides:</strong> each valve has its own slide. Valve combinations tend to sound sharp, so adjust the slides for the combinations you use most.</li>
<li><strong>Keep the right hand in your normal position:</strong> your right hand sits inside the bell, and its shape changes the pitch. Closing it more lowers the pitch a little, and opening it raises the pitch. A fully stopped note sounds about a half step higher. When you tune, keep the hand in your usual playing position.</li>
<li><strong>Warm up first:</strong> a cold horn plays flat. Blow warm air through it and play for several minutes before you tune.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: French horn tuner',
  faq: [
    ['Why is the horn called “in F”, and what does that mean for the tuner?',
      'The horn in F is a transposing instrument. When you read a written C, an F sounds, a perfect fifth lower. The large note on the tuner is the sounding note. To tune to A4 (440 Hz), play a written E5 in treble clef.'],
    ['How does my hand in the bell affect the pitch?',
      'The shape of the right hand inside the bell changes the pitch. Closing it more lowers the pitch slightly, and opening it raises the pitch. When you tune, keep your hand in the position you normally use while playing, so the reading matches how you play.'],
    ['Do I tune a double horn differently?',
      'A double horn has two sets of tubing, F and B♭, and a thumb valve switches between them. Each side has its own tuning slide. Tune the F side first, then check the B♭ side. The tuner works with both, because it shows the sounding pitch.'],
    ['Which notes are hard to keep in tune on the horn?',
      'The horn’s intonation depends strongly on the instrument, the player and the hand position, so there is no single list. Use the tuner to find your own horn’s tendencies: play a slow scale and note which pitches are high or low. Then correct them with the valve slides, your right hand or your embouchure.'],
  ],
  closing: 'Once your horn is in tune, practice slurs and clean entrances with the <a href="/en/tools/metronome/">online metronome</a>. Slow, steady practice helps with accuracy on the horn.',
});
