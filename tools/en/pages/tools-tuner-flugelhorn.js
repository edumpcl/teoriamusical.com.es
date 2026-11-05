const tunerInstrument = require('../tuner-instrument');

// Facts checked against the Spanish page (fliscorno). Same B♭ transposition as the trumpet (transp = +2).
// Spanish page errors: pushing the tuning slide in does not lower the pitch (it raises it); "B♭ (−2 semitones)" should be +2;
// the claim that Mahler, Vaughan Williams and Janacek wrote orchestral flugelhorn parts could not be verified (only
// Vaughan Williams's Ninth Symphony is certain), so it is left out.
module.exports = tunerInstrument({
  slug: 'flugelhorn', esSlug: 'fliscorno', name: 'Flugelhorn',
  title: 'Free Online Flugelhorn Tuner — B♭ Transposing',
  description: 'Tune your flugelhorn online with your microphone. Shows the sounding and the written note for a B♭ flugelhorn, A4 adjustable. Free, no install.',
  swDescription: 'Tune your B♭ flugelhorn online with your device’s microphone. The tuner shows the sounding note and the written note, with an adjustable A4 reference.',
  h1: 'Online Flugelhorn Tuner',
  transp: 2,
  intro: [
    'This flugelhorn tuner works in your browser with your device’s microphone. The flugelhorn is a B♭ instrument, like the trumpet, so the tuner shows both the note that sounds and the note you read in your part.',
    'Play a steady, relaxed note and watch the cents meter. Left of center means flat, and right of center means sharp.',
  ],
  sections: [
    {
      h2: 'The flugelhorn is a B♭ transposing instrument',
      html: `<p>The flugelhorn has the same transposition as the trumpet. Its tubing is more conical and its bell is wider, which gives it a softer, warmer sound. When you read a written C, a B♭ sounds, a major second lower:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (your part)</th>
    <th>Sounding note (concert pitch)</th>
  </tr></thead>
  <tbody>
    <tr><td>C4 (middle C)</td><td>B♭3 (233.1 Hz)</td></tr>
    <tr><td>D4</td><td>C4 (261.6 Hz)</td></tr>
    <tr><td>B4 ← common tuning note</td><td>A4 (440 Hz)</td></tr>
    <tr><td>E5</td><td>D5 (587.3 Hz)</td></tr>
  </tbody>
</table>
</div>
<p>To tune to A4 = 440 Hz, play a written B4 and bring the needle to 0¢.</p>`,
    },
    {
      h2: 'Differences between the flugelhorn and the trumpet',
      html: `<ul>
<li><strong>Bore:</strong> the flugelhorn’s tubing widens steadily along its length (conical). The trumpet’s tubing is mostly cylindrical and flares out only at the bell.</li>
<li><strong>Bell:</strong> wider and more open on the flugelhorn, which gives a warmer, less bright sound.</li>
<li><strong>Mouthpiece:</strong> the flugelhorn uses a deeper, more conical mouthpiece. A trumpet mouthpiece may not seat correctly, and it changes the sound, so use one made for the flugelhorn.</li>
<li><strong>Where you hear it:</strong> the trumpet is common in orchestras, fanfares and pop. The flugelhorn is common in jazz, brass bands and concert bands, for melodic solos and ballads. Vaughan Williams scored it in his Ninth Symphony.</li>
</ul>`,
    },
    {
      h2: 'How to adjust the pitch of your flugelhorn',
      html: `<ul>
<li><strong>Main tuning slide:</strong> <strong>pushing it in</strong> shortens the tube and raises the pitch. <strong>Pulling it out</strong> lengthens the tube and lowers the pitch.</li>
<li><strong>First and third valve slides:</strong> valve combinations tend to sound sharp. Pull these slides out slightly to compensate.</li>
<li><strong>Warm up first:</strong> blow warm air through the horn for a few minutes and empty the water keys before tuning. A cold instrument plays flat.</li>
<li><strong>Transposition in the tuner:</strong> the transposing box is already set to B♭ (+2 semitones), so the written note is the sounding note raised by a major second.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: flugelhorn tuner',
  faq: [
    ['Do the flugelhorn and the trumpet have the same transposition?',
      'Yes. Both are in B♭: when you read a C, a B♭ sounds, a major second lower. To tune to A4 (440 Hz), play a written B. The large note on the tuner is the sounding note, and the written note is shown beside it.'],
    ['How is the flugelhorn different from the trumpet?',
      'The flugelhorn has more conical tubing and a wider bell, so its sound is softer, darker and rounder. That suits melodies, solos and ballads in jazz and brass band music. The trumpet sounds brighter and more penetrating.'],
    ['Is the flugelhorn used in the orchestra?',
      'Rarely. It is a regular member of brass bands and jazz groups, and it also appears in concert bands. In orchestral music it is occasional: Vaughan Williams’s Ninth Symphony includes a flugelhorn part.'],
    ['Can I use a trumpet mouthpiece on a flugelhorn?',
      'It is not recommended. The flugelhorn is built for a deeper, more conical mouthpiece, and a mouthpiece made for it supports the warm sound and helps the intonation across the registers. A trumpet mouthpiece may also not seat correctly in the receiver.'],
  ],
  closing: 'Once your flugelhorn is in tune, work on smooth, connected playing with the <a href="/en/tools/metronome/">online metronome</a>. Slow tempos help you shape long melodic lines.',
});
