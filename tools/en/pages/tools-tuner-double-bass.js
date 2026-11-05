const tunerInstrument = require('../tuner-instrument');

// Fixes vs the Spanish page: the double bass sounds the SAME as the electric bass (E1 = 41.2 Hz), not an octave lower;
// the tuner ignores sounds below 40 Hz, so the 5th string (C1 / B0) and a low-C extension are tuned by harmonic.
module.exports = tunerInstrument({
  slug: 'double-bass', esSlug: 'contrabajo', name: 'Double Bass',
  title: 'Free Online Double Bass Tuner — E A D G, Low Notes',
  description: 'Tune your double bass with your microphone. Standard tuning in fourths E-A-D-G, plus how to tune the low C or B of a 5-string bass with a harmonic. Free.',
  swDescription: 'Tune your double bass online with your device’s microphone. Standard tuning in fourths, E-A-D-G, with tips for very low notes.',
  h1: 'Online Double Bass Tuner',
  intro: [
    'The double bass tuner works right in your browser, with no app to install. It listens through your device’s microphone and shows in real time, in cents, whether each string is above or below the pitch. It covers the four strings of a standard double bass, from the low E up.',
    'It works with orchestral and jazz double basses. All you need is the microphone of your device and a reasonably quiet room.',
  ],
  strings: [
    { name: 'E', oct: 1, midi: 28 }, { name: 'A', oct: 1, midi: 33 }, { name: 'D', oct: 2, midi: 38 }, { name: 'G', oct: 2, midi: 43 },
  ],
  sections: [
    {
      h2: 'Standard tuning for double bass',
      html: `<p>The four-string double bass is tuned in <strong>perfect fourths</strong>, unlike the violin, viola and cello, which are tuned in fifths. From lowest to highest it is E-A-D-G:</p>
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
<p>These are the same pitches as the four strings of a standard electric bass guitar. Double bass parts are written an octave higher than they sound, so the written note is not the one the tuner shows. The tuner displays the sounding note.</p>
<p>The tuner reads notes from about 40 Hz up, so it covers all four strings, although the E1 (41.2 Hz) is close to the limit. Play it firmly and keep the microphone near the instrument.</p>`,
    },
    {
      h2: 'Five-string basses and low-C extensions',
      html: `<p>A <strong>5-string</strong> double bass adds a lower string, usually <strong>C1 (32.7 Hz)</strong>, or <strong>B0 (30.9 Hz)</strong> on some instruments. A low-C extension on a 4-string bass reaches the same C1.</p>
<p>Both notes are below the tuner’s range of about 40 Hz, so it cannot read them directly. Tune them with the <strong>octave harmonic</strong>: touch the string lightly at its midpoint and play it. It sounds one octave higher, C2 (65.4 Hz) or B1 (61.7 Hz), which the tuner reads easily. Bring the meter to 0¢, and the open string is in tune.</p>`,
    },
    {
      h2: 'Solo tuning',
      html: `<p>Many soloists raise every string by a whole step, to F♯-B-E-A (F♯1, B1, E2, A2). The strings project more, but they carry more tension. The tuner reads all four of these notes.</p>`,
    },
    {
      h2: 'Tips for tuning a double bass',
      html: `<ul>
<li><strong>Machine heads:</strong> most double basses have geared machine heads, as on an electric bass, which are much more precise than the wooden pegs of a violin or viola.</li>
<li><strong>Be patient with very low notes:</strong> the tuner needs more cycles to measure notes around 40–55 Hz. Pluck or bow firmly and wait about two seconds before you read the meter.</li>
<li><strong>Bring the device close:</strong> place the microphone 8–12 inches (20–30 cm) from the f-holes and keep background noise low. Very low frequencies are harder to pick up in a noisy room.</li>
<li><strong>Check the tuning during rehearsal:</strong> the double bass is very sensitive to changes in temperature and humidity.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: double bass tuner',
  faq: [
    ['Is the double bass tuned like the bass guitar?',
      'Yes. The notes are the same, E-A-D-G, and they sound at the same pitch: the lowest E of both instruments is E1, at 41.2 Hz. Both parts are written an octave higher than they sound, so on paper the two read alike.'],
    ['What is solo tuning on the double bass?',
      'Solo tuning raises all the strings by a whole step: F♯-B-E-A. It is used for solo concertos because the instrument projects more, but the strings carry more tension. The chromatic tuner works in both tunings.'],
    ['How do I tune a 5-string double bass?',
      'The fifth string is usually C1 (32.7 Hz), or B0 (30.9 Hz) on some basses. Both are below the tuner’s range of about 40 Hz, so tune them with the octave harmonic (touch the string lightly at its midpoint), which sounds C2 (65.4 Hz) or B1 (61.7 Hz).'],
    ['Can a phone microphone pick up the low notes of a double bass?',
      'Yes, but put the microphone near the body of the instrument, about 8–12 inches (20–30 cm) from the f-holes, and keep background noise as low as possible. Very low frequencies (40–100 Hz) are picked up less well in a noisy room.'],
  ],
  closing: 'With your double bass in tune, work on your time feel with the <a href="/en/tools/metronome/">online metronome</a>. The bass anchors the rhythm of the whole ensemble, so a steady tempo matters most here.',
});
