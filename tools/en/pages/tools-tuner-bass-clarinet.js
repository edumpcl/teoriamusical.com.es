const tunerInstrument = require('../tuner-instrument');

// Lowest notes: written E♭3 sounds D♭2 (69.3 Hz); with the low-C extension, written C3 sounds B♭1 (58.3 Hz).
// Both are above the 40 Hz limit of the tuner. The tuner's transposition box tops out at ±12 st, so it shows the
// written letter one octave lower than a treble-clef part (+2 instead of +14). The Spanish page does not say this.
module.exports = tunerInstrument({
  slug: 'bass-clarinet', esSlug: 'clarinete-bajo', name: 'Bass Clarinet', transp: 2,
  title: 'Free Online Bass Clarinet Tuner — B♭, Written Note',
  description: 'Tune your bass clarinet online with your microphone. Shows the sounding note and the written note, with an adjustable A4 reference. Free, no install.',
  swDescription: 'Tune your bass clarinet online with your device’s microphone. Shows the sounding note and the written note for the B♭ bass clarinet.',
  h1: 'Online Bass Clarinet Tuner',
  intro: [
    'The bass clarinet tuner works right in your browser, with no app to install. The bass clarinet is a transposing instrument in B♭: the tuner shows the <em>sounding note</em> (concert pitch), which is a major ninth (a major second plus an octave) below the note written in treble clef.',
    'All you need is the microphone of your device. Its lowest notes, about 58 to 69 Hz, are inside the range of the tuner, but they are hard for a phone microphone to pick up, so keep the device close to the bell.',
  ],
  sections: [
    {
      h2: 'Bass clarinet: transposition in B♭',
      html: `<p>When the bass clarinet is written in <strong>treble clef</strong>, the most common way today, it sounds a <strong>major ninth</strong> (major second plus octave) lower than written. It sounds one octave lower than the B♭ clarinet playing the same written note:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (treble clef)</th>
    <th>Sounding note (tuner)</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>E♭3 (lowest note, standard low E♭)</td><td>D♭2</td><td>69.3 Hz</td></tr>
    <tr><td>C4</td><td>B♭2</td><td>116.5 Hz</td></tr>
    <tr><td><strong>B4 ← reference</strong></td><td><strong>A3</strong></td><td><strong>220.0 Hz</strong></td></tr>
    <tr><td><strong>B5 ← high reference</strong></td><td><strong>A4</strong></td><td><strong>440.0 Hz</strong></td></tr>
  </tbody>
</table>
</div>
<p>Many instruments have an extension down to written low C, which sounds B♭1 (58.3 Hz). That is still above the 40 Hz limit of the tuner, so every note of the instrument can be read.</p>
<p><strong>Reading the written note on the screen:</strong> this page starts with B♭ (+2 st), so the tuner shows the right letter for the written note, but the octave on the screen is one octave lower than in a treble-clef part (the transposition box cannot go as far as 14 semitones). A sounding A3 appears as written B3, and you read it as B4 in your part. The sounding note is always shown correctly.</p>`,
    },
    {
      h2: 'How to adjust the tuning of a bass clarinet',
      html: `<ul>
<li><strong>Neck and barrel:</strong> the bass clarinet has a curved metal neck between the mouthpiece and the body. Many models also have a barrel. Pulling the mouthpiece or the barrel out makes the instrument longer and <strong>lowers</strong> the pitch; pushing it in <strong>raises</strong> it.</li>
<li><strong>Warm up first:</strong> blow warm air through the whole instrument for a few minutes before you tune. The long tube takes more time than the B♭ clarinet to reach a stable temperature, and a cold bass clarinet plays flat.</li>
<li><strong>Low register:</strong> the lowest notes are weak on a phone microphone. Hold the device close to the bell. If the tuner does not respond, check the same note an octave higher, which is easier to read.</li>
<li><strong>Transposing box:</strong> this page starts with B♭ (+2 st). The box shows letters for the written note, as explained above.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: bass clarinet tuner',
  faq: [
    ['Is the bass clarinet tuned like a regular clarinet?',
      'The transposition is related: both are in B♭. The B♭ clarinet sounds a major second below written, and the bass clarinet sounds a major second plus an octave (a major ninth) below written in treble clef. So the bass clarinet sounds one octave lower than the soprano clarinet. Tuning with the tuner works the same way.'],
    ['Which note do I play to tune the bass clarinet to 440 Hz?',
      'Play a written B5 in treble clef: it sounds A4 = 440 Hz. A written B4 sounds A3 (220 Hz), which is also fine, because the cents meter works in any octave. A written B3 sounds A2 = 110 Hz.'],
    ['Is the bass clarinet written in treble clef or bass clef?',
      'Today, the usual way is treble clef, sounding a major ninth lower. Some older parts, especially in German-style notation, are written in bass clef with a different transposition. If you are not sure, check with your director or compare one written note with the sounding note on the tuner.'],
    ['Does the bass clarinet need a warm-up before tuning?',
      'Yes. Blow warm air through the instrument, including the neck, for a few minutes. A cold bass clarinet will be flat, and the pitch rises as the tube warms up, so check the tuning again after a few minutes of playing.'],
    ['Can the tuner read the lowest note of the bass clarinet?',
      'Yes. The lowest note of a standard instrument, D♭2, is about 69 Hz, and the low-C extension reaches B♭1 at about 58 Hz. The tuner reads notes above about 40 Hz. The problem is the microphone, not the tuner: hold the device close to the bell.'],
  ],
  closing: 'Once your bass clarinet is in tune, practice your rhythm and tempo with the <a href="/en/tools/metronome/">online metronome</a>. Also see the tuners for the <a href="/en/tools/tuner/clarinet/">B♭ clarinet</a> and the <a href="/en/tools/tuner/eb-clarinet/">E♭ clarinet</a>.',
});
