const tunerInstrument = require('../tuner-instrument');

// Facts checked against the Spanish page (trompeta): B♭ trumpet sounds a major second below written (transp = +2 as in
// afinador.js: written = sounding + 2). The Spanish page says pushing the tuning slide in lowers the pitch (wrong: it raises it),
// says to select "B♭ (−2 semitones)" (the panel pill is +2 st) and that the tuner "always shows the sounding note" (it shows both).
module.exports = tunerInstrument({
  slug: 'trumpet', esSlug: 'trompeta', name: 'Trumpet',
  title: 'Free Online Trumpet Tuner — B♭ Transposing',
  description: 'Tune your trumpet online with your microphone. Shows the sounding and the written note for a B♭ trumpet, A4 adjustable. Free, no install.',
  swDescription: 'Tune your B♭ trumpet online with your device’s microphone. The tuner shows the sounding note and the written note, with an adjustable A4 reference.',
  h1: 'Online Trumpet Tuner',
  transp: 2,
  intro: [
    'This trumpet tuner works in your browser with your device’s microphone. It is set up for the B♭ trumpet, the most common one: it shows the note that actually sounds and, next to it, the note you read in your part.',
    'Play a steady note, hold it for a second or two, and watch the cents meter. If the needle is left of center, the note is flat. If it is right of center, the note is sharp.',
  ],
  sections: [
    {
      h2: 'The trumpet is a B♭ transposing instrument',
      html: `<p>When a trumpet player reads and plays a written C, the pitch that sounds is B♭, a major second lower. The tuner shows the <em>sounding</em> note (concert pitch) in large letters and the <em>written</em> note beside it. Here are some pairs:</p>
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
    <tr><td>G4</td><td>F4 (349.2 Hz)</td></tr>
    <tr><td>A4</td><td>G4 (392.0 Hz)</td></tr>
    <tr><td>B4 ← common tuning note</td><td>A4 (440 Hz)</td></tr>
    <tr><td>C5</td><td>B♭4 (466.2 Hz)</td></tr>
  </tbody>
</table>
</div>
<p>To tune to A4 = 440 Hz, play a written B4 and bring the needle to 0¢. Most bands and orchestras tune to a concert B♭ or A, so play the written C or the written B that matches the note your group is using.</p>
<p>A <strong>C trumpet</strong> is not transposing: what you read is what sounds. If you play one, choose “C (concert)” in the Transposing instrument box, and the written and sounding notes will match.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your trumpet',
      html: `<ul>
<li><strong>Main tuning slide:</strong> it sets the overall pitch. <strong>Pushing it in</strong> makes the tube shorter and the pitch <strong>higher</strong>. <strong>Pulling it out</strong> makes the tube longer and the pitch <strong>lower</strong>.</li>
<li><strong>First and third valve slides:</strong> notes played with valve combinations (such as 1+3 or 2+3) tend to sound sharp, because the added tubing is proportionally too short. Pull the first and third valve slides out slightly to correct this, and use the slide ring or saddle on notes that need it.</li>
<li><strong>Open fifth partial:</strong> the open E5 (written) is about 14 cents flat compared with equal temperament, so a player must lip it up. Watch the meter on this note and correct it with your embouchure.</li>
<li><strong>Warm up first:</strong> a cold trumpet plays flat, and the pitch rises as warm air fills the tubing. Blow warm air through the horn for a few minutes, empty the water key, and tune only after that.</li>
<li><strong>Transposition in the tuner:</strong> the transposing box is already set to B♭ (+2 semitones). The written note is the sounding note raised by a major second.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: trumpet tuner',
  faq: [
    ['Why does the tuner show B♭ when I play a C on my trumpet?',
      'The trumpet is a B♭ transposing instrument. When you read and play a C, the sound that comes out is a B♭, a major second lower. The large note on the tuner is the sounding note (concert pitch). The written note, the one in your part, is shown beside it.'],
    ['How do I use the tuning slide and the valve slides?',
      'The main tuning slide sets the overall pitch: pull it out to lower the pitch and push it in to raise it. The first and third valve slides correct the sharp tendency of valve combinations. Pull them out slightly for notes that use those valves together.'],
    ['Should I warm up the trumpet before tuning?',
      'Yes. A cold instrument plays flat. Blow warm air through it for a few minutes and empty the water key before you tune. Check again after a long rest.'],
    ['Does the tuner work with a C trumpet, a piccolo trumpet or a flugelhorn?',
      'Yes. The tuner reads any pitch from about 40 Hz to 4200 Hz. A C trumpet sounds as written, so set the transposing box to “C (concert)”. A flugelhorn is also in B♭ and uses the same setting as the B♭ trumpet. Piccolo trumpets are pitched higher, in B♭ or A: choose the transposition that matches your instrument.'],
  ],
  closing: 'Once your trumpet is in tune, practice your articulation and your sense of time with the <a href="/en/tools/metronome/">online metronome</a>. Slow, steady tempos are the best way to train clean attacks and even sound.',
});
