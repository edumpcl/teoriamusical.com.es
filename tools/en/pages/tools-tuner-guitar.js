const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'guitar', esSlug: 'guitarra', name: 'Guitar',
  title: 'Free Online Guitar Tuner — Standard E A D G B E',
  description: 'Tune your acoustic, electric or classical guitar online with your microphone. Standard tuning E-A-D-G-B-E and any alternate tuning. Free, no install.',
  swDescription: 'Tune your guitar online with your device’s microphone. Covers standard tuning E-A-D-G-B-E and any alternate tuning.',
  h1: 'Online Guitar Tuner',
  intro: [
    'Acoustic, electric or classical, you can tune your guitar right in your browser, with nothing to install. The tuner detects the note of each string automatically and shows, with a precise cents meter, whether the string is above or below the correct pitch.',
    'It works with any guitar: steel-string acoustic, nylon-string classical, electric (plugged in or not), with 6 or 12 strings. All you need is the microphone of your phone, tablet or laptop.',
  ],
  strings: [
    { name: 'E', oct: 2, midi: 40 }, { name: 'A', oct: 2, midi: 45 }, { name: 'D', oct: 3, midi: 50 },
    { name: 'G', oct: 3, midi: 55 }, { name: 'B', oct: 3, midi: 59 }, { name: 'E', oct: 4, midi: 64 },
  ],
  sections: [
    {
      h2: 'Standard tuning for guitar',
      html: `<p>Standard guitar tuning orders the six strings, from lowest to highest, like this:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>String</th>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
    <th>Position</th>
  </tr></thead>
  <tbody>
    <tr><td>1st (highest)</td><td>E4</td><td>329.6 Hz</td><td>The thinnest string, closest to the floor</td></tr>
    <tr><td>2nd</td><td>B3</td><td>246.9 Hz</td><td>Second from the bottom</td></tr>
    <tr><td>3rd</td><td>G3</td><td>196.0 Hz</td><td>Middle string</td></tr>
    <tr><td>4th</td><td>D3</td><td>146.8 Hz</td><td>—</td></tr>
    <tr><td>5th</td><td>A2</td><td>110.0 Hz</td><td>—</td></tr>
    <tr><td>6th (lowest)</td><td>E2</td><td>82.4 Hz</td><td>The thickest string, closest to the ceiling</td></tr>
  </tbody>
</table>
</div>
<p>To remember the order, from low to high: <strong>E-A-D-G-B-E</strong>. A well-known mnemonic is <em>“Eddie Ate Dynamite, Good Bye Eddie.”</em></p>`,
    },
    {
      h2: 'Alternate tunings for guitar',
      html: `<p>Besides standard tuning, there are many alternate tunings that change one or several strings to make certain chords easier or to get a particular sound:</p>
<ul>
<li><strong>Drop D (D-A-D-G-B-E):</strong> the 6th string goes down a whole step, from E to D. It makes power chords easy with one finger and is common in rock, metal and folk.</li>
<li><strong>Open G (D-G-D-G-B-D):</strong> strumming all the open strings gives a G major chord. Very popular in blues and slide guitar.</li>
<li><strong>Open D (D-A-D-F♯-A-D):</strong> an open D major chord. Common in acoustic folk and bottleneck playing.</li>
<li><strong>DADGAD (D-A-D-G-A-D):</strong> very popular in Celtic music. It gives an open, resonant sound.</li>
<li><strong>Drop C (C-G-C-F-A-D):</strong> the whole guitar a whole step below Drop D. Common in modern metal.</li>
</ul>
<p>The tuner detects any chromatic note, so it works with all of these tunings with no extra setup.</p>`,
    },
    {
      h2: 'Tips for tuning a guitar correctly',
      html: `<ul>
<li><strong>Always tune up to the note:</strong> bring the string a little below the pitch and turn up to the center. If you go past the pitch, loosen it all the way down and come up again. This keeps the tuning peg from slipping.</li>
<li><strong>Start with the 6th string:</strong> tune from low to high (6th → 1st). The low strings are the reference, and tuning the low E first gives you a stable starting point.</li>
<li><strong>Pluck the open string firmly:</strong> for the tuner to pick up the note well, pluck hard and let the string ring freely without touching the fretboard.</li>
<li><strong>Wait for the sound to settle:</strong> the most reliable moment to read the tuner is 1–2 seconds after you pluck, when the note no longer has the attack transient.</li>
<li><strong>Check the tuning after changing strings:</strong> new strings stretch and lose tension during the first days. Tune several times a day until they settle.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: guitar tuner',
  faq: [
    ['Can I tune an electric guitar without an amplifier with this tuner?',
      'Yes. Bring the microphone of your device close to the body of the guitar and pluck the string firmly. An unamplified electric guitar is quiet, so do it in a quiet place. Alternatively, if you have an audio interface connected through a jack, your computer’s microphone input picks up the signal better.'],
    ['How often should I tune my guitar?',
      'Before every practice session or rehearsal. Temperature, humidity and simply time make strings lose tension. If a session lasts more than an hour, check the tuning again halfway, especially if the temperature in the room changes.'],
    ['Why does my guitar go out of tune quickly after I tune it?',
      'The most common causes are new strings that are still settling (normal for 3–5 days), worn or badly adjusted tuning pegs, a nut or bridge that catches the string, or sudden temperature changes. If the problem continues with old strings, take the guitar to a luthier to check the hardware.'],
    ['Does the tuner work with a 12-string guitar?',
      'Yes. A 12-string guitar uses the same standard tuning: each pair has one string in unison or an octave higher. Tune each string of the pair separately. The tuner will detect the correct note in both cases.'],
    ['Is it better to tune before or during the warm-up?',
      'Tune once before the warm-up and again after 5–10 minutes, when the strings and the neck have settled. Temperature changes at the headstock and the bridge affect the tuning during the first minutes of playing.'],
  ],
  closing: 'Once your guitar is in tune, practice scales and chords with the <a href="/en/tools/metronome/">online metronome</a> to keep a steady tempo.',
});
