const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'flute', esSlug: 'flauta', name: 'Flute',
  title: 'Free Online Flute Tuner — Concert Pitch, Adjustable A4',
  description: 'Tune your concert flute online with your microphone. A non-transposing instrument in C, with adjustable A4 (440 Hz standard). Free, no install.',
  swDescription: 'Tune your flute online with your device’s microphone. The flute is not a transposing instrument, so the tuner shows the note you read. A4 is adjustable.',
  h1: 'Online Flute Tuner',
  intro: [
    'The flute tuner works right in your browser, with no app to install. Play a long, steady note and it shows the note name, the frequency, and on a cents meter whether you are flat or sharp.',
    'The A4 reference is adjustable, so you can match 440 Hz or the slightly higher pitch used by many orchestras. For a piccolo, use the <a href="/en/tools/tuner/piccolo/">piccolo tuner</a>.',
  ],
  sections: [
    {
      h2: 'The flute is a non-transposing instrument',
      html: `<p>The concert flute is <strong>not a transposing instrument</strong>: the note written in the score is the note that sounds. The tuner shows the sounding note, with no adjustment needed.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
    <th>Where it sits on the flute</th>
  </tr></thead>
  <tbody>
    <tr><td>B3</td><td>246.9 Hz</td><td>Lowest note, only with a B foot joint</td></tr>
    <tr><td>C4</td><td>261.6 Hz</td><td>Lowest note with a C foot joint</td></tr>
    <tr><td>A4</td><td>440.0 Hz</td><td>Common tuning note</td></tr>
    <tr><td>C6</td><td>1046.5 Hz</td><td>Start of the third octave</td></tr>
    <tr><td>C7</td><td>2093.0 Hz</td><td>Top of the standard range</td></tr>
  </tbody>
</table>
</div>
<p>The whole range of the flute is well inside the tuner’s range of about 40 Hz to 4200 Hz.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your flute',
      html: `<ul>
<li><strong>Headjoint:</strong> the main tuning adjustment. Pulling the headjoint out of the body makes the flute longer and lowers the pitch. Pushing it in raises the pitch. Move it a little at a time and check again.</li>
<li><strong>Warm up first:</strong> a cold flute plays flat. Play for a few minutes, or blow warm air through it, before you tune. Check again after about five minutes of playing, because the flute keeps warming up.</li>
<li><strong>Embouchure:</strong> rolling the flute inward covers more of the embouchure hole and lowers the pitch. Rolling it outward raises the pitch. Use this for small, note-by-note corrections, not to fix the overall tuning.</li>
<li><strong>Dynamics and register:</strong> the flute tends to go sharp when you play louder and flat when you play softer. The third octave is often sharp, so check it as well as the low notes.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: flute tuner',
  faq: [
    ['Is the flute a transposing instrument?',
      'No. The concert flute in C is a non-transposing instrument: the note you read is the note that sounds. The tuner shows that note directly. Other members of the family are different: the alto flute is in G and sounds a fourth lower than written, and the bass flute sounds an octave lower.'],
    ['How does the embouchure affect the pitch?',
      'Rolling the flute inward lowers the pitch, and rolling it outward raises it. The position of your lower lip on the headjoint matters too. Set the headjoint first, then use the embouchure for fine corrections.'],
    ['Why is my flute flat when it is cold?',
      'Cold air inside the tube makes the instrument play lower. Warm the flute with your breath for a few minutes before you tune, and check again later.'],
    ['Does the tuner work with a piccolo or a recorder?',
      'Yes, it reads any note in its range. A piccolo sounds an octave higher than written, so use the <a href="/en/tools/tuner/piccolo/">piccolo tuner</a> to see the written note too. A soprano recorder also works: the tuner shows the note that actually sounds.'],
    ['How accurate does a flute need to be?',
      'For solo practice, within about ±10 cents is fine. In chamber music or with a piano, aim for ±5 cents or less. 100 cents equal one semitone. Your embouchure can move the pitch by 20 cents or more, so match the other players by ear as well.'],
  ],
  closing: 'Once your flute is in tune, practice steady tone and even rhythm with the <a href="/en/tools/metronome/">online metronome</a>.',
});
