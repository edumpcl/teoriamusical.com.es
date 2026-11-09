const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'banjo', esSlug: 'banjo', name: 'Banjo',
  title: 'Free Online Banjo Tuner — Open G and Other Tunings',
  description: 'Tune your banjo with your microphone. Open G (gDGBD) for the 5-string banjo, plus 4-string tenor, plectrum and 6-string tunings. Free, no install.',
  swDescription: 'Tune your banjo online with your device’s microphone. Open G for the 5-string banjo, plus 4- and 6-string tunings.',
  h1: 'Online Banjo Tuner',
  intro: [
    'Standard tuning for the 5-string banjo is Open G: with all the strings open, you hear a G major chord. From the 5th string (the short one) to the 1st, the notes are G4 – D3 – G3 – B3 – D4. Below you will also find the tunings for 4- and 6-string banjos, and you can check each string with the tuner.',
    'The banjo tuner works right in your browser, with no app to install. It shows whether each string is above or below the pitch, in cents. It works with the 5-string banjo (bluegrass and clawhammer), the 4-string tenor, the 6-string banjo and the banjo ukulele. All you need is the microphone of your device.',
  ],
  strings: [
    { name: 'D', oct: 3, midi: 50 }, { name: 'G', oct: 3, midi: 55 }, { name: 'B', oct: 3, midi: 59 }, { name: 'D', oct: 4, midi: 62 }, { name: 'G', oct: 4, midi: 67 },
  ],
  sections: [
    {
      h2: 'Open G tuning for the 5-string banjo',
      html: `<p>The standard tuning for the 5-string banjo is Open G: when you play all the open strings, they sound a G major chord.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>String</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>5th (drone, short)</td><td>G4</td><td>392.0 Hz</td></tr>
    <tr><td>4th (lowest)</td><td>D3</td><td>146.8 Hz</td></tr>
    <tr><td>3rd</td><td>G3</td><td>196.0 Hz</td></tr>
    <tr><td>2nd</td><td>B3</td><td>246.9 Hz</td></tr>
    <tr><td>1st (highest)</td><td>D4</td><td>293.7 Hz</td></tr>
  </tbody>
</table>
</div>
<p>The 5th string is not the lowest in pitch, even though it is the one nearest your chin. It is a high G, which gives the banjo its bright, open sound.</p>`,
    },
    {
      h2: 'Tunings for 4- and 6-string banjos',
      html: `<p>Not every banjo has five strings. The tuning depends on the type:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Banjo</th>
    <th>Tuning (lowest string to highest)</th>
    <th>Used in</th>
  </tr></thead>
  <tbody>
    <tr><td>5-string</td><td>D3 – G3 – B3 – D4 (and G4 on the 5th string)</td><td>Bluegrass, folk, clawhammer</td></tr>
    <tr><td>4-string, tenor</td><td>C3 – G3 – D4 – A4</td><td>Dixieland jazz</td></tr>
    <tr><td>4-string, Irish tenor</td><td>G2 – D3 – A3 – E4</td><td>Irish music</td></tr>
    <tr><td>4-string, plectrum</td><td>C3 – G3 – B3 – D4</td><td>Jazz and early 20th-century music</td></tr>
    <tr><td>6-string (guitar banjo)</td><td>E2 – A2 – D3 – G3 – B3 – E4</td><td>Same as the guitar, for guitar players</td></tr>
  </tbody>
</table>
</div>
<p>The 4-string tenor banjo is tuned like the mandola.</p>`,
    },
    {
      h2: 'Tuning the 5-string banjo without a tuner',
      html: `<p>With one reference, the D3 of the 4th string (from a tuning fork or a piano), you can tune the rest by pressing frets:</p>
<ol>
<li>Tune the open 4th string to D3.</li>
<li>Press the 4th string at the 5th fret: it sounds G3, the open 3rd string. Adjust the 3rd until they match.</li>
<li>Press the 3rd string at the 4th fret: it sounds B3, the open 2nd string. Adjust the 2nd.</li>
<li>Press the 2nd string at the 3rd fret: it sounds D4, the open 1st string. Adjust the 1st.</li>
<li>Press the 1st string at the 5th fret: it sounds G4, which is the open 5th string. Adjust the 5th.</li>
</ol>
<p>It is the same method as on the guitar, except the distances are 5, 4, 3 and 5 frets. When you finish, check each string with the tuner, because tuning one string can slightly change the others.</p>`,
    },
    {
      h2: 'Other tunings for the 5-string banjo',
      html: `<p>Popular alternatives, from the 5th string to the 1st, include:</p>
<ul>
<li><strong>Open D:</strong> F♯4 – D3 – F♯3 – A3 – D4, which sounds a D major chord.</li>
<li><strong>Double C:</strong> G4 – C3 – G3 – C4 – D4.</li>
<li><strong>G modal (sawmill):</strong> G4 – D3 – G3 – C4 – D4.</li>
</ul>`,
    },
    {
      h2: 'Tips for tuning a banjo',
      html: `<ul>
<li><strong>Tune the 5th string on its own:</strong> its tuning peg is on the side of the neck, at the 5th fret. Tune it separately from the other four strings.</li>
<li><strong>Tune string by string, then check again:</strong> adjusting one string can slightly change the pitch of the others, so go around the banjo a second time.</li>
<li><strong>Use the capo with care:</strong> if a capo clamps too hard it can raise the pitch of the strings slightly. Put it on and check the tuning again.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: banjo tuner',
  faq: [
    ['How do I tune a 5-string banjo?',
      'In Open G: from the 5th string (the short one) to the 1st, G4, D3, G3, B3 and D4. With one reference for the 4th string (D3), press the 5th fret of the 4th string to tune the 3rd, the 4th fret of the 3rd for the 2nd, the 3rd fret of the 2nd for the 1st, and the 5th fret of the 1st for the 5th.'],
    ['How do I tune a 4-string banjo?',
      'It depends on the type. The jazz tenor banjo is tuned C3-G3-D4-A4; the Irish tenor, G2-D3-A3-E4; and the plectrum banjo, C3-G3-B3-D4. Check which one you have before you tune.'],
    ['Why is the 5th string of the banjo shorter?',
      'The 5th string (the drone string) is shorter because it starts at the 5th fret, not at the nut. It is tuned to G4 (392 Hz) and gives the banjo its bright, open, ringing sound.'],
    ['Can I tune my banjo to something other than Open G?',
      'Yes. Alternatives include Open D, Double C and G modal. The chromatic tuner reads any of them, with no setting to change.'],
    ['What is the difference between a 4-string tenor banjo and a 5-string banjo?',
      'The tenor banjo has 4 strings (C-G-D-A) and is played with a pick, in jazz and Irish music. The 5-string banjo (Open G) has the extra drone string and is the banjo of bluegrass and American folk music.'],
    ['Is a resonator banjo tuned like an open-back banjo?',
      'Yes, the tuning is the same. The resonator only affects how the sound projects (more volume and brightness toward the audience). It does not change the target notes.'],
  ],
  closing: 'With your banjo in tune, practice your rolls and clawhammer patterns with the <a href="/en/tools/metronome/">online metronome</a>. Start slowly and raise the tempo only when every note stays clean.',
});
