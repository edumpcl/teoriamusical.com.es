const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'ukulele', esSlug: 'ukelele', name: 'Ukulele',
  title: 'Free Online Ukulele Tuner — G C E A (Soprano, Concert, Tenor)',
  description: 'Tune your ukulele online for free with your microphone. G-C-E-A tuning for soprano, concert and tenor, and D-G-B-E for baritone. No install.',
  swDescription: 'Tune your ukulele online with your device’s microphone. G-C-E-A standard tuning for soprano, concert and tenor, and D-G-B-E for baritone.',
  h1: 'Online Ukulele Tuner',
  intro: [
    'The ukulele tuner for soprano, concert or tenor works right in your browser, with no app to install. It detects the four strings of the ukulele — G, C, E and A — and shows in real time whether each string is above or below the correct pitch.',
    'It works with any size of ukulele (soprano, concert, tenor and baritone) and with nylon or fluorocarbon strings.',
  ],
  strings: [
    { name: 'G', oct: 4, midi: 67 }, { name: 'C', oct: 4, midi: 60 }, { name: 'E', oct: 4, midi: 64 }, { name: 'A', oct: 4, midi: 69 },
  ],
  sections: [
    {
      h2: 'Standard tuning for ukulele',
      html: `<p>Soprano, concert and tenor ukuleles all use the same standard tuning, <strong>G-C-E-A</strong>, with one important peculiarity: the G string (the 4th, closest to the ceiling) is <strong>re-entrant</strong>, which means it sounds higher than the C string below it. This is what gives the ukulele its characteristic sound.</p>
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
    <tr><td>4th</td><td>G4</td><td>392.0 Hz</td><td>Re-entrant: higher than the 3rd string!</td></tr>
    <tr><td>3rd</td><td>C4</td><td>261.6 Hz</td><td>The lowest note of a soprano ukulele</td></tr>
    <tr><td>2nd</td><td>E4</td><td>329.6 Hz</td><td>—</td></tr>
    <tr><td>1st (highest)</td><td>A4</td><td>440.0 Hz</td><td>The thinnest string, closest to the floor</td></tr>
  </tbody>
</table>
</div>`,
    },
    {
      h2: 'Tuning for baritone ukulele',
      html: `<p>The <strong>baritone</strong> ukulele is different: it is tuned <strong>D-G-B-E</strong>, exactly like the four highest strings of a guitar. Its tuning is linear (not re-entrant). If your ukulele is a baritone, the tuner will correctly detect D3 (146.8 Hz), G3 (196.0 Hz), B3 (246.9 Hz) and E4 (329.6 Hz).</p>`,
    },
    {
      h2: 'Tips for tuning a ukulele',
      html: `<ul>
<li><strong>The G sounds higher than the C: that is normal.</strong> The re-entrant tuning of the soprano, concert and tenor ukulele makes the 4th string (G4) higher than the 3rd (C4). Do not lower the G until it sounds like the lowest note.</li>
<li><strong>New strings stretch a lot:</strong> nylon and fluorocarbon take several days to settle. Stretch each string gently after tuning and check the tuning again. Repeat this several times on the first day.</li>
<li><strong>Pluck the string near the bridge:</strong> it gives a brighter, more sustained sound that is easier for the tuner to detect.</li>
<li><strong>Temperature and humidity matter:</strong> a wooden ukulele is sensitive to changes in the air around it. If you bring the instrument from a cold place to a warm one, let it adjust for a few minutes before tuning.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: ukulele tuner',
  faq: [
    ['Why is the G string higher than the C string?',
      'It is the re-entrant tuning, typical of the soprano, concert and tenor ukulele. G4 (392 Hz) is higher than C4 (261.6 Hz), which is the lowest note. This gives the ukulele its bright, jangly sound. If the tuner shows G4 when you play the 4th string, the tuning is correct.'],
    ['When should I tune my ukulele?',
      'Before every session. A ukulele, especially a nylon-string one, goes out of tune easily because of changes in temperature and humidity. In the first days with new strings you will need to tune several times in the same session until they settle.'],
    ['Is G-C-E-A tuning the same for every size of ukulele?',
      'For soprano, concert and tenor, yes: all use G-C-E-A (re-entrant). The baritone is the exception: it is tuned D-G-B-E, like the four highest strings of the guitar. The tuner detects both tunings with no setup.'],
    ['Does the tuner work with an 8-string ukulele (with double strings)?',
      'Yes. An 8-string ukulele has its strings in pairs, like a mandolin. The tuner detects the note produced by each pair. The tuning is the same G-C-E-A with doubled strings.'],
  ],
  closing: 'With your ukulele in tune, practice chord changes with the <a href="/en/tools/metronome/">online metronome</a>, starting slowly (50–60 BPM) until the changes are smooth.',
});
