const tunerInstrument = require('../tuner-instrument');

// Spanish page: "-3 st" is the AFIN_TRANSP value (written = sounding - 3); its text says "+3 semitonos".
module.exports = tunerInstrument({
  slug: 'eb-clarinet', esSlug: 'requinto', name: 'E♭ Clarinet', transp: -3,
  title: 'Free Online E♭ Clarinet Tuner — Written Note (Requinto)',
  description: 'Tune your E♭ clarinet (sopranino clarinet, “requinto”) online with your microphone. Shows the sounding and the written note. Free, no install.',
  swDescription: 'Tune your E♭ clarinet online with your device’s microphone. Shows both the sounding note and the written note.',
  h1: 'Online E♭ Clarinet Tuner',
  intro: [
    'The E♭ clarinet tuner works right in your browser, with no app to install. The E♭ clarinet, also called the sopranino clarinet, is a transposing instrument: the tuner shows the <em>sounding note</em> (concert pitch), which is a <strong>minor third higher</strong> than the note the player reads. It also shows the written note.',
    'It is the highest voice of the clarinet family and a regular member of the concert band and the orchestra. In the wind bands of Spain it is called the <em>requinto</em>. All you need is the microphone of your device.',
  ],
  sections: [
    {
      h2: 'The E♭ clarinet: a transposing instrument in E♭',
      html: `<p>The E♭ clarinet transposes a minor third <strong>up</strong>, the opposite of the B♭ clarinet, which sounds lower than written. A written C sounds as an E♭:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (your part)</th>
    <th>Sounding note (tuner)</th>
    <th>Frequency (A4 = 440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>E3 (lowest written note)</td><td>G3</td><td>196.0 Hz</td></tr>
    <tr><td>C4</td><td>E♭4</td><td>311.1 Hz</td></tr>
    <tr><td>D4</td><td>F4</td><td>349.2 Hz</td></tr>
    <tr><td><strong>F♯4 ← reference</strong></td><td><strong>A4</strong></td><td><strong>440.0 Hz</strong></td></tr>
  </tbody>
</table>
</div>
<p>This page is already set up for the E♭ clarinet: the tuner shows the sounding note and the written note (a minor third below). To tune to concert A, play a <strong>written F♯4</strong> (sounding A4 = 440 Hz) and bring the needle to 0¢.</p>`,
    },
    {
      h2: 'How to adjust the tuning of an E♭ clarinet',
      html: `<ul>
<li><strong>Barrel:</strong> the main adjustment. <strong>Pulling the barrel out lowers the pitch; pushing it in raises the pitch.</strong> Set it with the instrument already warm.</li>
<li><strong>Warm up first:</strong> blow warm air through the instrument for a couple of minutes before you tune. A cold clarinet plays flat.</li>
<li><strong>Embouchure:</strong> on a short instrument, small changes in your lip and air have a large effect on the pitch. The E♭ clarinet has a reputation for being harder to play in tune than the B♭ clarinet, so check many notes with the tuner, not only one.</li>
<li><strong>Transposing box:</strong> this page already starts with E♭ (the box shows −3 st), so you see the written note as well as the sounding note.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: E♭ clarinet tuner',
  faq: [
    ['Why does the tuner show E♭ when I play a C on my E♭ clarinet?',
      'The E♭ clarinet is a transposing instrument. When you play a written C, an E♭ sounds, a minor third higher. The tuner always shows the sounding note (concert pitch), and the written note appears next to it.'],
    ['What is the difference between the E♭ clarinet and the requinto?',
      'They are the same instrument. “Requinto” is the name used in Spanish wind bands. In English it is the E♭ clarinet, or the sopranino clarinet.'],
    ['How do I use the barrel to tune my E♭ clarinet?',
      'Pulling the barrel out lengthens the instrument and lowers the pitch; pushing it in shortens the instrument and raises the pitch. The instrument is small, so make very small moves and check the tuner after each one.'],
    ['Is the E♭ clarinet harder to tune than the B♭ clarinet?',
      'Many players find it so. The shorter tube means that small changes in embouchure, air or temperature move the pitch more. Fingerings and barrel use are the same as on the B♭ clarinet, and the chromatic tuner works the same way.'],
  ],
  closing: 'Once your E♭ clarinet is in tune, practice your rhythm and tempo with the <a href="/en/tools/metronome/">online metronome</a>. Also see the tuners for the <a href="/en/tools/tuner/clarinet/">B♭ clarinet</a> and the <a href="/en/tools/tuner/bass-clarinet/">bass clarinet</a>.',
});
