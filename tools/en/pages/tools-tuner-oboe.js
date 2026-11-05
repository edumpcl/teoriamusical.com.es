const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'oboe', esSlug: 'oboe', name: 'Oboe',
  title: 'Free Online Oboe Tuner — Concert Pitch, Adjustable A4',
  description: 'Tune your oboe online with your microphone. A non-transposing instrument, and the one that gives the orchestra its A. A4 adjustable. Free, no install.',
  swDescription: 'Tune your oboe online with your device’s microphone. The oboe is not a transposing instrument, so the tuner shows the note you read. A4 is adjustable.',
  h1: 'Online Oboe Tuner',
  intro: [
    'The oboe tuner works right in your browser, with no app to install. Play a long, steady note and it shows the note name, the frequency, and on a cents meter whether you are flat or sharp.',
    'The A4 reference is adjustable, which is handy because orchestras do not all tune to the same A.',
  ],
  sections: [
    {
      h2: 'The oboe: a non-transposing instrument and the orchestra’s A',
      html: `<p>The oboe is <strong>not a transposing instrument</strong>: the written note is the note that sounds. The tuner shows the sounding note with no adjustment.</p>
<p>The orchestra tunes to the <strong>oboe’s A</strong> (A4) before a rehearsal or concert. The oboe has a clear, penetrating tone that is easy to hear over the other instruments, and its pitch cannot be changed much on the fly, so the other players match it.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
    <th>Where it sits on the oboe</th>
  </tr></thead>
  <tbody>
    <tr><td>B♭3</td><td>233.1 Hz</td><td>Lowest note</td></tr>
    <tr><td>A4</td><td>440.0 Hz</td><td>The orchestra’s tuning note</td></tr>
    <tr><td>A5</td><td>880.0 Hz</td><td>Upper middle register</td></tr>
  </tbody>
</table>
</div>
<p>The oboe plays up to about A6 or a little higher, and all of it is within the tuner’s range.</p>`,
    },
    {
      h2: 'How to tune the oboe',
      html: `<ul>
<li><strong>Reed position:</strong> the reed fits into the top of the oboe. Pulling the reed out slightly makes the instrument longer and lowers the pitch. Pushing it in raises the pitch. Move it only a little at a time.</li>
<li><strong>Warm up and wet the reed:</strong> blow warm air through the oboe for a few minutes. The reed needs to be moist, so soak it briefly in water before you play.</li>
<li><strong>Embouchure:</strong> more lip pressure raises the pitch, especially in the upper register. Use it for small corrections only.</li>
<li><strong>Room temperature:</strong> the oboe plays lower in a cold room and higher in a warm one. Check your tuning at the start of every rehearsal.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: oboe tuner',
  faq: [
    ['Why does the oboe give the orchestra its A?',
      'Its tone is clear and penetrating, so everyone can hear it, and its pitch is hard to change quickly, so it makes a steady reference. The other instruments match it, and each can then adjust itself.'],
    ['Is the English horn tuned like the oboe?',
      'No. The English horn (UK: cor anglais) is a transposing instrument in F: when it reads C, it sounds F, a perfect fifth lower. Use the <a href="/en/tools/tuner/english-horn/">English horn tuner</a>, which shows both the written and the sounding note.'],
    ['How does the reed affect the pitch?',
      'The reed is the biggest factor in both pitch and tone. A reed that is too hard tends to play sharp, and one that is too soft tends to play flat and may close up. Each reed is different, so test new ones with the tuner.'],
    ['What A do oboists tune to?',
      'It depends on the orchestra. 440 Hz is the standard, but many orchestras use 441 to 443 Hz, and some go a little higher. Set the A4 in the tuner to the value your group uses.'],
  ],
  closing: 'Once your oboe is in tune, work on steady long tones and rhythm with the <a href="/en/tools/metronome/">online metronome</a>.',
});
