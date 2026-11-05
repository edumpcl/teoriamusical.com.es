const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'violin', esSlug: 'violin', name: 'Violin',
  title: 'Free Online Violin Tuner — G D A E, Adjustable A4',
  description: 'Tune your violin with your microphone. Standard tuning in fifths G-D-A-E, with an adjustable A4 reference (440 Hz standard, 442 Hz in many orchestras). Free.',
  swDescription: 'Tune your violin online with your device’s microphone. Standard tuning in fifths, G-D-A-E, with an adjustable A4 reference.',
  h1: 'Online Violin Tuner',
  intro: [
    'The violin tuner works right in your browser, with no app to install. It detects the four strings of the violin — G, D, A and E — precisely, and shows in real time, on a cents meter, whether each string is above or below the pitch.',
    'The A4 reference is adjustable, so you can match a modern orchestra (440–442 Hz) or an early-music ensemble (around 415 Hz).',
  ],
  strings: [
    { name: 'G', oct: 3, midi: 55 }, { name: 'D', oct: 4, midi: 62 }, { name: 'A', oct: 4, midi: 69 }, { name: 'E', oct: 5, midi: 76 },
  ],
  sections: [
    {
      h2: 'Standard tuning for violin',
      html: `<p>The violin is tuned in <strong>perfect fifths</strong>, which gives it its characteristic resonance between strings. From lowest to highest:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>String</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>G (lowest)</td><td>G3</td><td>196.0 Hz</td></tr>
    <tr><td>D</td><td>D4</td><td>293.7 Hz</td></tr>
    <tr><td>A (reference)</td><td>A4</td><td>440–442 Hz</td></tr>
    <tr><td>E (highest)</td><td>E5</td><td>659.3 Hz</td></tr>
  </tbody>
</table>
</div>
<p>The <strong>A string</strong> is the usual reference at the start of a rehearsal: in an orchestra the oboe gives the A, and the other strings are tuned from it in fifths.</p>`,
    },
    {
      h2: 'The A4 reference: 440 Hz, 442 Hz or 415 Hz',
      html: `<p>The frequency of A4 changes depending on the musical setting:</p>
<ul>
<li><strong>440 Hz:</strong> the international standard (ISO 16) since 1955. Most popular and chamber musicians use this reference.</li>
<li><strong>442 Hz:</strong> common in many European orchestras (especially German and Austrian ones). It sounds slightly brighter.</li>
<li><strong>415 Hz:</strong> Baroque pitch, about a half step below modern 440 Hz. Used in historically informed performance.</li>
<li><strong>432 Hz:</strong> preferred by some jazz and world-music players. It has no formal scientific backing, but it has some tradition.</li>
</ul>
<p>The <strong>A4 reference</strong> control of the tuner lets you set the value your ensemble uses.</p>`,
    },
    {
      h2: 'Tips for tuning a violin',
      html: `<ul>
<li><strong>Always start with the A string:</strong> it is the universal reference. Tune it first and use it as the starting point for the others.</li>
<li><strong>Use the fine tuners for small adjustments:</strong> violin pegs are sensitive and move in jumps. For small corrections of a few cents, use the fine tuners on the tailpiece.</li>
<li><strong>Warm up the instrument before tuning:</strong> temperature affects string tension, especially on gut strings. Play gently for a few minutes before you tune seriously.</li>
<li><strong>Rosin the bow first:</strong> a well-rosined bow gives a clearer, steadier sound, which makes it easier for the tuner to read.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: violin tuner',
  faq: [
    ['Should I tune my violin before every practice session?',
      'Yes, always. The violin is especially sensitive to changes in temperature and humidity. Gut or synthetic strings can vary by several cents between sessions. Making a habit of tuning before you play also trains your ear.'],
    ['Why does a violin go out of tune so fast compared with a guitar?',
      'Violin pegs work by friction, not by gears like the tuning machines of a guitar. They are more sensitive to temperature and humidity, and over time they can slip. Good peg maintenance (peg compound, a check by a luthier) reduces the problem.'],
    ['Can I tune a violin by ear, without a tuner?',
      'Yes, and it is a basic skill for any violinist. With the A string as a reference (given by a tuning fork or the oboe), you can tune the others in perfect fifths by listening for the absence of beats. A tuner is a help, especially for beginners or when no outside reference is available.'],
    ['Which A4 reference does an orchestra use?',
      'A symphony orchestra usually uses A4 = 442 Hz, although the international standard is 440 Hz. Early-music groups may use 415 Hz or lower. The A4 control of the tuner lets you set the reference to match.'],
  ],
  closing: 'With your violin in tune, practice scales with the <a href="/en/tools/metronome/">online metronome</a> to build rhythmic accuracy. The violin has no frets, so a combination of good tempo and a good ear is essential for correct intonation.',
});
