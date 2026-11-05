const tunerInstrument = require('../tuner-instrument');

// Spanish page errors fixed here: barrel direction (pushing in raises pitch), "−2 st" vs the +2 shown by the tuner,
// and unsupported numbers (cents per mm, cents when cold) removed.
module.exports = tunerInstrument({
  slug: 'clarinet', esSlug: 'clarinete', name: 'Clarinet', transp: 2,
  title: 'Free Online Clarinet Tuner — B♭ Clarinet, Written Note',
  description: 'Tune your B♭ clarinet online with your microphone. Shows the sounding note and the written note, with an adjustable A4 reference. Free, no install.',
  swDescription: 'Tune your clarinet online with your device’s microphone. Shows both the sounding note and the written note for the B♭ clarinet.',
  h1: 'Online Clarinet Tuner',
  intro: [
    'The clarinet tuner works right in your browser, with no app to install. The B♭ clarinet is a transposing instrument: the tuner shows the <em>sounding note</em> (concert pitch), which is a major second lower than the note the clarinetist reads. It also shows the written note, so you can compare it with your part.',
    'It works with the B♭ clarinet, the A clarinet and other clarinets. All you need is the microphone of your device. The transposition box is already set to B♭ (+2 semitones) for this page.',
  ],
  sections: [
    {
      h2: 'The clarinet: a transposing instrument in B♭',
      html: `<p>Like the trumpet, the B♭ clarinet sounds a <strong>major second lower</strong> than written. A written C sounds as a B♭:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (your part)</th>
    <th>Sounding note (tuner)</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>E3 (lowest written note)</td><td>D3</td><td>146.8 Hz</td></tr>
    <tr><td>C4</td><td>B♭3</td><td>233.1 Hz</td></tr>
    <tr><td>D4</td><td>C4</td><td>261.6 Hz</td></tr>
    <tr><td><strong>B4 ← reference</strong></td><td><strong>A4</strong></td><td><strong>440.0 Hz</strong></td></tr>
    <tr><td>C5</td><td>B♭4</td><td>466.2 Hz</td></tr>
  </tbody>
</table>
</div>
<p>To tune to concert A, play a <strong>written B4</strong> (sounding A4 = 440 Hz) and bring the needle to 0¢. All the notes of the clarinet are far above 40 Hz, so the tuner reads them without trouble.</p>
<p>The A clarinet, used in many orchestral parts, is a different instrument: it sounds a <em>minor third</em> lower than written (a written C sounds as an A). The chromatic tuner works for it as well. In the transposing box, choose A (+3 st) to see its written note.</p>`,
    },
    {
      h2: 'How to adjust the tuning of a clarinet',
      html: `<ul>
<li><strong>Barrel:</strong> the main adjustment. The barrel is the short piece between the mouthpiece and the upper joint. <strong>Pulling it out makes the clarinet longer and lowers the pitch; pushing it in raises the pitch.</strong> Set it before you play, with the instrument warm.</li>
<li><strong>Warm up first:</strong> blow warm air through the instrument for a couple of minutes before you tune. A cold clarinet plays noticeably flat, and the pitch rises as the instrument warms.</li>
<li><strong>Embouchure:</strong> more lip pressure raises the pitch. It is useful for small corrections in the moment, not for the general tuning.</li>
<li><strong>Transposing box:</strong> this page starts with B♭ (+2 st), so you see the written note next to the sounding note. If you play an A clarinet, choose A (+3 st).</li>
</ul>
<p>Check more than one note. The clarinet is often not equally in tune in all registers: tune the barrel to a note in the middle of the instrument, then use the tuner to find which notes are high or low on your own instrument.</p>`,
    },
  ],
  faqH2: 'Frequently asked questions: clarinet tuner',
  faq: [
    ['Why does the tuner show B♭ when I play a C on my clarinet?',
      'The B♭ clarinet is a transposing instrument. When you play a written C, a B♭ sounds, a major second lower. The tuner always shows the sounding note (concert pitch), and the written note appears next to it.'],
    ['How do I use the barrel to tune my clarinet?',
      'The barrel is the short cylinder between the mouthpiece and the upper joint. Pulling it out lengthens the instrument and lowers the pitch; pushing it in shortens the instrument and raises the pitch. Make small moves and check the tuner after each one.'],
    ['Does the reed affect the tuning of a clarinet?',
      'Yes, indirectly. The reed, the mouthpiece and the pressure of your lip all change the sound and the pitch. If the same note is always high or low, check your embouchure and your reed before you blame the instrument, and use the tuner to find the notes that need care.'],
    ['What is the difference between a B♭ clarinet and an A clarinet?',
      'The A clarinet is slightly longer and sounds a minor third lower than written: a written C sounds as an A. The B♭ clarinet sounds a major second lower. It is common in orchestral music, for keys with many sharps. The chromatic tuner works with both.'],
  ],
  closing: 'Once your clarinet is in tune, practice your rhythm and tempo with the <a href="/en/tools/metronome/">online metronome</a>. Also see the tuners for the <a href="/en/tools/tuner/bass-clarinet/">bass clarinet</a> and the <a href="/en/tools/tuner/eb-clarinet/">E♭ clarinet</a>.',
});
