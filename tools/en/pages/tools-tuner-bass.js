const tunerInstrument = require('../tuner-instrument');

// The tuner ignores frequencies below 40 Hz (afinador.js), so the low B of a 5-string bass (30.9 Hz),
// the low D of Drop D (36.7 Hz) and E♭ (38.9 Hz) cannot be read directly. The page says so and
// teaches the 12th-fret harmonic. (The Spanish page says B0 is "at the limit"; in fact it is out of range.)
module.exports = tunerInstrument({
  slug: 'bass', esSlug: 'bajo', name: 'Bass Guitar',
  title: 'Free Online Bass Guitar Tuner — E A D G (4 and 5 Strings)',
  description: 'Tune your electric or acoustic bass online with your microphone. Standard E-A-D-G tuning for 4-string bass, plus tips for 5-string bass. Free, no install.',
  swDescription: 'Tune your electric or acoustic bass online with your device’s microphone. Standard E-A-D-G tuning, with tips for 5-string basses.',
  h1: 'Online Bass Guitar Tuner',
  intro: [
    'The bass tuner works right in your browser for electric, acoustic or fretless bass. It detects low frequencies precisely, from the E1 of a 4-string bass up, and shows in real time whether each string is above or below the pitch.',
    'It is compatible with 4-, 5- and 6-string basses, active or passive. All you need is the microphone of your phone, tablet or laptop, and a reasonably quiet room.',
  ],
  strings: [
    { name: 'E', oct: 1, midi: 28 }, { name: 'A', oct: 1, midi: 33 }, { name: 'D', oct: 2, midi: 38 }, { name: 'G', oct: 2, midi: 43 },
  ],
  sections: [
    {
      h2: 'Standard tuning for bass',
      html: `<p>A standard 4-string bass is tuned one octave below the four lowest strings of a guitar. From lowest to highest:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>String</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>4th (lowest)</td><td>E1</td><td>41.2 Hz</td></tr>
    <tr><td>3rd</td><td>A1</td><td>55.0 Hz</td></tr>
    <tr><td>2nd</td><td>D2</td><td>73.4 Hz</td></tr>
    <tr><td>1st (highest)</td><td>G2</td><td>98.0 Hz</td></tr>
  </tbody>
</table>
</div>
<p>A <strong>5-string</strong> bass adds a lower string: <strong>B0 at 30.9 Hz</strong>. A 6-string bass also adds a high string, C3.</p>
<p>This tuner reads notes from about 40 Hz up, so it covers all four strings of a standard bass. The low B of a 5-string bass is below that range: tune it with the 12th-fret harmonic, which sounds B1 (61.7 Hz), one octave higher.</p>`,
    },
    {
      h2: 'Alternate tunings for bass',
      html: `<ul>
<li><strong>Drop D (D-A-D-G):</strong> the 4th string goes down to D1 (36.7 Hz). It makes one-note power chords easy in the low register and is common in rock and metal.</li>
<li><strong>Half step down (E♭-A♭-D♭-G♭):</strong> everything a half step lower. It reduces string tension and is common in blues and some metal bands.</li>
<li><strong>D standard (D-G-C-F):</strong> everything a whole step below standard tuning. Used in grunge, doom and some jazz-rock styles.</li>
</ul>
<p>Some of these low notes (such as the D1 of Drop D and the E♭1 of half step down) are below the tuner’s range of about 40 Hz. Tune them with the 12th-fret harmonic, one octave higher, which the tuner reads easily.</p>`,
    },
    {
      h2: 'Tips for tuning a bass',
      html: `<ul>
<li><strong>Bring the device close to the instrument:</strong> very low frequencies (under 50 Hz) are hard for a phone microphone to pick up. Place the device near the body of the bass or near the amplifier.</li>
<li><strong>Pluck near the bridge:</strong> plucking close to the bridge gives a brighter sound with more harmonics, which makes it easier to detect the fundamental note.</li>
<li><strong>Use a quiet room:</strong> the low frequencies of the bass mix easily with background noise. Turn off the TV and the air conditioning and close the windows before you tune.</li>
<li><strong>Use the 12th-fret harmonic when the tuner does not respond:</strong> touch the string lightly above the 12th fret and pluck. It sounds one octave higher, with a clean tone, and it is easy for the tuner to read. Center the meter at 0¢, and the open string will be in tune.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: bass tuner',
  faq: [
    ['Can I tune the bass directly without an amplifier?',
      'Yes, but the acoustic volume of an electric bass is very low. Put your device’s microphone very close to the body or the strings. In a quiet room the tuner will detect the note correctly from A1 up; for E1 you may need to pluck harder or bring the microphone closer.'],
    ['Why does the tuner sometimes detect the note an octave higher?',
      'The microphones of mobile devices pick up harmonics (higher frequencies) better than the fundamental frequency of very low notes. If the tuner says A2 when you play the A1 string, just get the cents meter to 0: the tuning is the same in any octave.'],
    ['When should I tune my bass?',
      'Always before rehearsing or recording. Electric basses are fairly stable, but temperature changes and the tension of the neck can pull them out of tune between sessions. A quick 2-minute check at the start of each practice prevents bad listening habits.'],
    ['What is the standard tuning of a 4-string bass?',
      'From lowest to highest, standard tuning is E1-A1-D2-G2. It is identical to the four lowest strings of the guitar, but sounding an octave lower. A 5-string bass adds a B0 as its lowest string.'],
  ],
  closing: 'Once your bass is in tune, work on your groove and tempo with the <a href="/en/tools/metronome/">online metronome</a>. The bass has the most responsibility for time in a band: a firm tempo makes the difference between sounding professional and amateur.',
});
