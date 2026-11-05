const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'mandolin', esSlug: 'mandolina', name: 'Mandolin',
  title: 'Free Online Mandolin Tuner — G D A E, Paired Strings',
  description: 'Tune your mandolin with your microphone. Standard tuning G-D-A-E in fifths, same as the violin, with 8 strings in 4 pairs, plus how to tune it by ear. Free.',
  swDescription: 'Tune your mandolin online with your device’s microphone. Standard tuning G-D-A-E, with eight strings in four pairs.',
  h1: 'Online Mandolin Tuner',
  intro: [
    'Standard mandolin tuning is G-D-A-E (G3, D4, A4 and E5, from lowest to highest), in perfect fifths, the same as the violin. Each note is played on two strings tuned in unison, so there are 8 strings in 4 pairs. With the tuner below you can check each string with your microphone.',
    'The mandolin tuner works right in your browser, with no app to install. It shows in real time, in cents, whether each string is above or below the pitch. It works with A-style and F-style mandolins, and with the mandola. All you need is the microphone of your phone, tablet or laptop.',
  ],
  strings: [
    { name: 'G', oct: 3, midi: 55 }, { name: 'D', oct: 4, midi: 62 }, { name: 'A', oct: 4, midi: 69 }, { name: 'E', oct: 5, midi: 76 },
  ],
  sections: [
    {
      h2: 'Standard tuning for mandolin',
      html: `<p>The mandolin has 8 strings grouped in 4 pairs. The two strings of each pair sound in unison. From lowest to highest the notes are G-D-A-E, the same as the open strings of the violin:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Pair</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>1st pair (highest)</td><td>E5</td><td>659.3 Hz</td></tr>
    <tr><td>2nd pair</td><td>A4</td><td>440.0 Hz</td></tr>
    <tr><td>3rd pair</td><td>D4</td><td>293.7 Hz</td></tr>
    <tr><td>4th pair (lowest)</td><td>G3</td><td>196.0 Hz</td></tr>
  </tbody>
</table>
</div>
<p>If your mandolin has single strings instead of pairs, the tuning is the same: G-D-A-E.</p>`,
    },
    {
      h2: 'Tips for tuning a mandolin',
      html: `<ul>
<li><strong>Tune each string of a pair separately:</strong> pluck only one of the two strings while you tune, or mute the other with your finger. If both ring at once, the interference makes the meter harder to read.</li>
<li><strong>Remove the beating:</strong> once both strings read 0¢, play them together. If you hear a rhythmic pulsing (beating), adjust one of the two until it disappears.</li>
<li><strong>Steel strings go flat:</strong> the mandolin uses steel strings that slacken as you play. Tune before every session and check again halfway through if you play for more than 30 minutes.</li>
</ul>`,
    },
    {
      h2: 'Tuning the mandolin without a tuner: by fifths',
      html: `<p>Because the strings are a perfect fifth apart, you only need one reference (a tuning fork or a piano giving A4) and the frets:</p>
<ol>
<li>Tune the A pair to the reference.</li>
<li>Press the D pair at the 7th fret: it should sound the same as the A you just tuned. Adjust the D until they match.</li>
<li>Press the G pair at the 7th fret: it should sound the same as the D. Adjust the G.</li>
<li>Press the A pair at the 7th fret: it should sound the same as the E. Adjust the E.</li>
<li>Finish by matching the second string of each pair to the first, until there is no beating.</li>
</ol>
<p>The 7th fret is seven half steps above the open string, which is a perfect fifth. That is why each pair “sings” the note of the next one. Afterward, check the cents with the tuner.</p>`,
    },
    {
      h2: 'How the mandolin is written: treble clef, not transposed',
      html: `<p>Mandolin music is written in the treble clef and sounds where it is written: the mandolin is not a transposing instrument. Its open strings are the same as the violin’s, so a passage written for violin in this range uses the same fingering on each string, one fret per half step.</p>`,
    },
    {
      h2: 'The mandolin family: mandola and mandocello',
      html: `<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Instrument</th>
    <th>Tuning (lowest to highest)</th>
    <th>Relation to the mandolin</th>
  </tr></thead>
  <tbody>
    <tr><td>Mandolin</td><td>G3 – D4 – A4 – E5</td><td>Same as the violin</td></tr>
    <tr><td>Mandola</td><td>C3 – G3 – D4 – A4</td><td>A fifth lower</td></tr>
    <tr><td>Mandocello</td><td>C2 – G2 – D3 – A3</td><td>An octave below the mandola</td></tr>
  </tbody>
</table>
</div>
<p>The chromatic tuner works for all three with no extra setting.</p>`,
    },
  ],
  faqH2: 'Frequently asked questions: mandolin tuner',
  faq: [
    ['What are the notes of the mandolin?',
      'G, D, A and E, from lowest to highest (G3, D4, A4 and E5), in perfect fifths. They are the same notes as the open strings of the violin, and each is played with a pair of strings in unison.'],
    ['How do I tune a mandolin without a tuner?',
      'Tune the A pair with a tuning fork or a piano (A4 = 440 Hz), then tune the others by fifths: the 7th fret of each pair should sound the same as the next pair. Then match the second string of each pair to the first until there is no beating.'],
    ['Is the mandolin tuned like the violin?',
      'Yes. Both share the same tuning, G-D-A-E from lowest to highest. The difference is that the mandolin has 8 strings in 4 pairs in unison, while the violin has 4 single strings.'],
    ['How do I tune the pairs of strings?',
      'First tune one string of the pair until it reads 0¢. Then tune the second string until you hear no beating (a wavering sound) when you play both together. The tuner lets you center each string on its own.'],
    ['What is the difference between a mandolin and a mandola?',
      'The mandola is tuned a fifth below the mandolin: C-G-D-A. The chromatic tuner works for both with no extra setting.'],
    ['Can I use the tuner for both A-style and F-style mandolins?',
      'Yes. The body shape, scrolled F-style or rounded A-style, does not change the standard tuning. Both use G-D-A-E with 4 pairs of strings.'],
  ],
  closing: 'With your mandolin in tune, practice your tremolo and fast picking patterns with the <a href="/en/tools/metronome/">online metronome</a>. Start slowly and raise the tempo only when every note stays clean.',
});
