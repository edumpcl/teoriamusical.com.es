const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'cello', esSlug: 'violonchelo', name: 'Cello',
  title: 'Free Online Cello Tuner — C G D A, Adjustable A4',
  description: 'Tune your cello with your microphone. Standard tuning in fifths C-G-D-A, an octave below the viola, with an adjustable A4 reference. Free, no install.',
  swDescription: 'Tune your cello online with your device’s microphone. Standard tuning in fifths, C-G-D-A, with an adjustable A4 reference.',
  h1: 'Online Cello Tuner',
  intro: [
    'The cello tuner works right in your browser, with no app to install. It listens through your device’s microphone and shows in real time, in cents, whether each string is above or below the pitch.',
    'It works with acoustic and electric cellos. All you need is the microphone of your phone, tablet or laptop.',
  ],
  strings: [
    { name: 'C', oct: 2, midi: 36 }, { name: 'G', oct: 2, midi: 43 }, { name: 'D', oct: 3, midi: 50 }, { name: 'A', oct: 3, midi: 57 },
  ],
  sections: [
    {
      h2: 'Standard tuning for cello',
      html: `<p>The cello has four strings tuned in perfect fifths. From lowest to highest they are C-G-D-A, the same notes as the viola, one octave lower:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>String</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>4th (lowest)</td><td>C2</td><td>65.4 Hz</td></tr>
    <tr><td>3rd</td><td>G2</td><td>98.0 Hz</td></tr>
    <tr><td>2nd</td><td>D3</td><td>146.8 Hz</td></tr>
    <tr><td>1st (highest)</td><td>A3</td><td>220.0 Hz</td></tr>
  </tbody>
</table>
</div>
<p>All four open strings are above the tuner’s lower limit of about 40 Hz, so the tuner can read each of them directly.</p>`,
    },
    {
      h2: 'Tips for tuning a cello',
      html: `<ul>
<li><strong>Start with the A:</strong> tune the A string first (A3 = 220 Hz), then check the others in fifths: A with D, D with G, G with C.</li>
<li><strong>Use the fine tuners for small corrections:</strong> most cellos have a fine tuner on every string.</li>
<li><strong>Stretch new strings:</strong> new strings keep stretching for days. Press them gently a few times and retune until they hold their pitch.</li>
<li><strong>Be patient with the low strings:</strong> the C and G are low (65–98 Hz), so the tuner needs a little longer to settle. Use a firm bow stroke and wait a moment before you read the meter.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: cello tuner',
  faq: [
    ['Is the cello tuned like the viola?',
      'Yes, the notes are the same, C-G-D-A, but the cello sounds an octave lower. The lowest string of the cello (C2) is 65.4 Hz, while the C3 of the viola is 130.8 Hz.'],
    ['How do I tune a cello with stiff pegs?',
      'Peg compound, or a mix of soap and chalk, helps the pegs turn and hold. Use the fine tuners for small corrections. If the pegs are badly stuck, take the cello to a luthier.'],
    ['Does the wolf tone affect the tuning?',
      'The wolf tone is an unstable, growling resonance of the cello body on certain notes, often around F♯ or G. It does not mean the string is out of tune, although the tuner may flutter on that note. Tune the open strings as usual, and ask a luthier about a wolf eliminator if the problem is severe.'],
    ['How far should the microphone be from the cello?',
      'About 8–16 inches (20–40 cm) from the instrument, pointed at the body or the f-holes. In a noisy room, move it closer. The cello projects well, so a phone placed on the music stand is usually enough.'],
  ],
  closing: 'With your cello in tune, practice scales and bowing with the <a href="/en/tools/metronome/">online metronome</a>. Start slowly and raise the tempo only when the intonation stays clean.',
});
