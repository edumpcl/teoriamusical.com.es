const tunerInstrument = require('../tuner-instrument');

// Facts checked against the Spanish page (trombon). Non-transposing (no transp). The Spanish slide-position table is one octave
// too low (it lists B♭1 F2 B♭2 D3 F3 for first position; the real notes are B♭2 F3 B♭3 D4 F4, pedal B♭1) and says
// that pushing the tuning slide in lowers the pitch (it raises it); "20-30 cents flat when cold" is unverified and left out.
// Tuner limit: 40 Hz. Tenor trombone pedals B♭1 (58.3 Hz) down to E1 (41.2 Hz) are readable; bass trombone pedals below E1 are not.
module.exports = tunerInstrument({
  slug: 'trombone', esSlug: 'trombon', name: 'Trombone',
  title: 'Free Online Trombone Tuner — Tenor and Bass Trombone',
  description: 'Tune your tenor or bass trombone online with your microphone. Concert pitch, slide positions and tuning slide tips, A4 adjustable. Free, no install.',
  swDescription: 'Tune your tenor or bass trombone online with your device’s microphone. Concert pitch display, slide position chart and tuning tips, with an adjustable A4 reference.',
  h1: 'Online Trombone Tuner',
  intro: [
    'This trombone tuner works in your browser with your device’s microphone. It is made for the tenor trombone and the bass trombone. The trombone is not a transposing instrument, so the note on the screen is the note you read in your part.',
    'Play a steady note and watch the cents meter. Left of center means flat, and right of center means sharp. On a trombone you can correct the pitch of each note with the slide, so the tuner is also a good way to check your slide positions.',
  ],
  sections: [
    {
      h2: 'Concert pitch and slide positions',
      html: `<p>The tenor trombone is pitched in B♭ and reads in bass clef (and often tenor clef). It does not transpose: what you read is what sounds. The pitch of the instrument is set by the tuning slide, and the pitch of each note is set by the slide position and your ear.</p>
<p>These are the notes of the harmonic series in each position (open notes of a tenor trombone in B♭, without the F trigger). The first position is the slide all the way in, and the seventh is the slide fully extended. Each position lowers the pitch by a half step:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Position</th>
    <th>Notes available (harmonic series)</th>
  </tr></thead>
  <tbody>
    <tr><td>1st (slide in)</td><td>B♭2 — F3 — B♭3 — D4 — F4</td></tr>
    <tr><td>2nd</td><td>A2 — E3 — A3 — C♯4 — E4</td></tr>
    <tr><td>3rd</td><td>A♭2 — E♭3 — A♭3 — C4 — E♭4</td></tr>
    <tr><td>4th</td><td>G2 — D3 — G3 — B3 — D4</td></tr>
    <tr><td>5th</td><td>F♯2 — C♯3 — F♯3 — A♯3 — C♯4</td></tr>
    <tr><td>6th</td><td>F2 — C3 — F3 — A3 — C4</td></tr>
    <tr><td>7th (slide extended)</td><td>E2 — B2 — E3 — G♯3 — B3</td></tr>
  </tbody>
</table>
</div>
<p>Below each of these series is a <strong>pedal tone</strong> an octave below the lowest note: B♭1 (58.3 Hz) in first position. Positions are approximate, and each note on a trombone needs a small adjustment by ear. The tuner shows you how far to move the slide.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your trombone',
      html: `<ul>
<li><strong>Tuning slide:</strong> it is the small slide in the bell section, not the hand slide. <strong>Pushing it in</strong> shortens the tube and raises the pitch. <strong>Pulling it out</strong> lowers the pitch.</li>
<li><strong>Tune in first position:</strong> play a B♭ with the slide in (B♭3 is 233.1 Hz) and set the main tuning slide first. Then check the other positions with the tuner and learn the tendencies of your instrument.</li>
<li><strong>Warm up first:</strong> a cold trombone plays flat. Blow warm air through it for a few minutes before you tune.</li>
<li><strong>Empty the water:</strong> open the water key now and then. Condensation in the tubing can change both the pitch and how the notes respond.</li>
</ul>`,
    },
    {
      h2: 'Bass trombone and the low notes',
      html: `<p>The tuner reads sounds from about 40 Hz up. A tenor trombone’s normal range is well above that, and the pedal tones from B♭1 (58.3 Hz) down to E1 (41.2 Hz) are inside the range. A bass trombone, with its two triggers, can play pedal notes below E1 (41.2 Hz). <strong>The tuner cannot read those notes directly.</strong></p>
<p>To check a very low note, play the same note one octave higher and tune that. Then play the low note and match it to the higher one by ear. If the higher note is in tune and the slide is in the right position, the low note will be close.</p>`,
    },
  ],
  faqH2: 'Frequently asked questions: trombone tuner',
  faq: [
    ['Is the trombone a transposing instrument?',
      'No. The tenor trombone is a B♭ instrument, but its part is written at concert pitch, in bass clef or tenor clef. The tuner shows exactly the note you are playing, with no conversion. (British brass band parts are different: they are written for a B♭ treble-clef trombone, which transposes.)'],
    ['How do the seven slide positions work?',
      'In first position the slide is all the way in, and the open series is B♭ — F — B♭ — D — F. Each next position lowers the pitch by a half step: second position gives A, third gives A♭, and so on. In seventh position the slide is fully extended and you play E. The tuner helps you find the exact spot for each note, especially in the middle positions.'],
    ['What is the trigger (F attachment) for?',
      'The trigger adds extra tubing that lowers the instrument by a perfect fourth, from B♭ to F. It makes low notes easier to reach and gives you shorter slide positions for them. Many tenor trombones have one trigger, and bass trombones have two.'],
    ['How do I tune a bass trombone?',
      'Tune with no trigger first: play a first-position B♭ and set the main tuning slide. Then tune each trigger separately by playing a note with it and adjusting its own tuning slide. The notes of a bass trombone below about 40 Hz are out of the tuner’s range, so check them an octave higher.'],
  ],
  closing: 'Once your trombone is in tune, practice legato and slide accuracy with the <a href="/en/tools/metronome/">online metronome</a>. Start slowly, so your slide positions have time to settle.',
});
