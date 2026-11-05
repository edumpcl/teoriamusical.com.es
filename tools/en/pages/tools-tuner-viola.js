const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'viola', esSlug: 'viola', name: 'Viola',
  title: 'Free Online Viola Tuner — C G D A, Adjustable A4',
  description: 'Tune your viola with your microphone. Standard tuning in fifths C-G-D-A, a fifth below the violin, with an adjustable A4 reference. Free, no install.',
  swDescription: 'Tune your viola online with your device’s microphone. Standard tuning in fifths, C-G-D-A, with an adjustable A4 reference.',
  h1: 'Online Viola Tuner',
  intro: [
    'The viola tuner works right in your browser, with no app to install. It listens through your device’s microphone and shows in real time, on a cents meter, whether each string is above or below the pitch.',
    'It works with acoustic and electric violas, and also with the viola da gamba. All you need is the microphone of your phone, tablet or laptop.',
  ],
  strings: [
    { name: 'C', oct: 3, midi: 48 }, { name: 'G', oct: 3, midi: 55 }, { name: 'D', oct: 4, midi: 62 }, { name: 'A', oct: 4, midi: 69 },
  ],
  sections: [
    {
      h2: 'Standard tuning for viola',
      html: `<p>The viola is tuned a <strong>perfect fifth below the violin</strong>. Its four strings, from lowest to highest, are C-G-D-A:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>String</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>4th (lowest)</td><td>C3</td><td>130.8 Hz</td></tr>
    <tr><td>3rd</td><td>G3</td><td>196.0 Hz</td></tr>
    <tr><td>2nd</td><td>D4</td><td>293.7 Hz</td></tr>
    <tr><td>1st (highest)</td><td>A4</td><td>440.0 Hz</td></tr>
  </tbody>
</table>
</div>
<p>The three upper strings, G, D and A, are the same notes as the three lower strings of the violin. Viola music is usually written in the alto clef.</p>
<p>The <strong>A4 reference</strong> control of the tuner lets you move the reference from 435 to 450 Hz. For solo practice use 440 Hz. In an orchestra, match the A given by the oboe or the concertmaster, often 442 Hz.</p>`,
    },
    {
      h2: 'Tips for tuning a viola',
      html: `<ul>
<li><strong>Use the fine tuners when you can:</strong> the screws on the tailpiece make small adjustments without touching the wooden pegs.</li>
<li><strong>Tune up to the pitch:</strong> bring the string slightly below the pitch, then raise it slowly. This helps keep the peg from slipping.</li>
<li><strong>Tune with the bow, not with pizzicato:</strong> the bowed note is the one you play in an ensemble, and it gives the tuner a steadier signal.</li>
<li><strong>Wait for the sound to settle:</strong> read the meter one or two seconds after you start the bow stroke, once the attack has passed.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: viola tuner',
  faq: [
    ['How is the viola tuned differently from the violin?',
      'The viola is tuned a perfect fifth lower. The violin has G-D-A-E and the viola has C-G-D-A. In practice the viola is lower and has a darker tone.'],
    ['Should I tune my viola to 440 Hz or 442 Hz?',
      'For individual practice, use 440 Hz. In an orchestra, match the A of the oboe or the concertmaster, usually 442–443 Hz in Europe. The tuner lets you set A4 anywhere from 435 to 450 Hz.'],
    ['Why do the pegs of my viola slip?',
      'The thicker strings need more pressure to hold. Pegs are usually treated with peg compound, or with soap (which lubricates) and chalk (which adds grip). If the problem continues, ask a luthier to check the pegs. The fine tuners on the tailpiece are more precise and more comfortable for small corrections.'],
    ['Does the tuner work with an electric viola or a viola da gamba?',
      'Yes, with both. The viola da gamba is tuned differently (usually D-G-C-E-A-D, from lowest to highest, on six strings), but the chromatic tuner reads any note.'],
  ],
  closing: 'With your viola in tune, practice scales and shifting with the <a href="/en/tools/metronome/">online metronome</a>. Because the viola has no frets, steady time and a good ear go together when you work on intonation.',
});
