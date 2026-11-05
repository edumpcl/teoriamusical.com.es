const tunerInstrument = require('../tuner-instrument');

// The tuner ignores sounds below 40 Hz, so the lowest strings of a concert harp (C1 32.7 Hz, D1 36.7 Hz)
// cannot be read directly; the page says so. The Spanish page does not mention this.
module.exports = tunerInstrument({
  slug: 'harp', esSlug: 'arpa', name: 'Harp',
  title: 'Free Online Harp Tuner — Pedal and Lever Harps',
  description: 'Tune your harp with your microphone. Reads the sounding note at concert pitch, with an adjustable A4. Pedal harps are tuned in natural. Free, no install.',
  swDescription: 'Tune your harp online with your device’s microphone. Concert pitch, adjustable A4, for pedal and lever harps.',
  h1: 'Online Harp Tuner',
  intro: [
    'The harp tuner works right in your browser, with no app to install. The harp is a non-transposing instrument, so the tuner shows exactly the note that sounds. A pedal harp is always tuned with all the pedals in the natural position (the middle one).',
    'It works with concert pedal harps, Celtic harps and lever harps. All you need is the microphone of your device.',
  ],
  sections: [
    {
      h2: 'Harp tuning: pedals and strings',
      html: `<p>A concert harp has 47 strings covering about six and a half octaves, from C1 to G7 with the pedals in natural. Every string is a note of the C major scale. The C strings are usually colored red and the F strings black (or blue), so you can find your place.</p>
<p>Seven pedals change the notes. There is one pedal for each note name: D, C and B for the left foot, and E, F, G and A for the right foot. Each pedal has three positions. When you move a pedal, discs press on the strings of that note name and shorten them, which raises the pitch:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Pedal</th>
    <th>Natural (tuning position)</th>
    <th>Up (flat)</th>
    <th>Down (sharp)</th>
  </tr></thead>
  <tbody>
    <tr><td>D</td><td>D</td><td>D♭</td><td>D♯</td></tr>
    <tr><td>C</td><td>C</td><td>C♭</td><td>C♯</td></tr>
    <tr><td>B</td><td>B</td><td>B♭</td><td>B♯</td></tr>
    <tr><td>E</td><td>E</td><td>E♭</td><td>E♯</td></tr>
    <tr><td>F</td><td>F</td><td>F♭</td><td>F♯</td></tr>
    <tr><td>G</td><td>G</td><td>G♭</td><td>G♯</td></tr>
    <tr><td>A</td><td>A</td><td>A♭</td><td>A♯</td></tr>
  </tbody>
</table>
</div>
<p>Lever harps and Celtic harps have no pedals. They are tuned to a major key, usually C or E♭, with all the levers down (open). Check the instructions for your harp.</p>`,
    },
    {
      h2: 'What the tuner can and cannot read',
      html: `<p>The tuner reads notes from about 40 Hz up to about 4200 Hz. That covers almost the whole harp, but the two lowest strings of a concert harp, C1 (32.7 Hz) and D1 (36.7 Hz), are below the range, so the tuner cannot read them directly. For those strings, play the harmonic at the midpoint of the string, which sounds one octave higher (C2 at 65.4 Hz, D2 at 73.4 Hz), and bring that note to 0¢.</p>`,
    },
    {
      h2: 'Tips for tuning a harp',
      html: `<ul>
<li><strong>Set the pedals to natural first:</strong> put all the pedals in the middle position before you start. Tuning with a pedal in flat or sharp leaves the strings wrong for every other key.</li>
<li><strong>Tune by octaves:</strong> tune A4 (440 Hz) first, then use the octaves to tune the other strings by ear, and use the tuner to check them.</li>
<li><strong>New strings:</strong> new strings, especially gut, stretch a lot during the first days. Retune several times a day until they settle.</li>
<li><strong>Temperature and humidity:</strong> the harp is very sensitive to its surroundings. A hygrometer and a humidifier help keep the tuning steady between sessions.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: harp tuner',
  faq: [
    ['How long does it take to tune a harp?',
      'A 47-string concert harp can take half an hour or more when the strings are new or the harp has not been played for a while. When the harp is stable and you are practiced, it is much faster. Always tune with all the pedals in the natural position (the middle one).'],
    ['What does a harp pedal do?',
      'A pedal harp has 7 pedals, one for each note name: C, D, E, F, G, A and B. Each pedal has three positions: flat (pedal up), natural (middle) and sharp (down). Discs press on the strings to shorten them and raise the pitch. Tuning is always done with the pedals in natural.'],
    ['Why do so many strings break on a harp?',
      'Gut strings (the middle strings of many concert harps) are very sensitive to changes in humidity and temperature. A room that is too dry or too damp raises the risk of breaking a string. Keep the harp at about 45–60% relative humidity and away from direct drafts.'],
    ['Are nylon strings tuned the same as gut strings?',
      'Yes, the tuning process with the tuner is identical. Nylon strings are more stable with changes in humidity, but they still need frequent tuning, especially when they are new.'],
  ],
  closing: 'With your harp in tune, practice arpeggios and scales with the <a href="/en/tools/metronome/">online metronome</a>. A steady tempo helps keep your hands even from one string to the next.',
});
