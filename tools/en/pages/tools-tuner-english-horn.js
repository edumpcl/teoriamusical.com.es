const tunerInstrument = require('../tuner-instrument');

// Spanish page: window.AFIN_TRANSP=-5. In afinador.js written = sounding + transp. English horn written C5 sounds F4,
// i.e. written = sounding + 7. -5 is the same pitch class but shows the written note an octave too low (C4 instead of C5).
// +7 is correct and inside the allowed -12..12, so it is used here (it simply highlights no pill in the selector).
module.exports = tunerInstrument({
  slug: 'english-horn', esSlug: 'corno-ingles', name: 'English Horn',
  title: 'Free Online English Horn Tuner — Transposing in F',
  description: 'Tune your English horn (UK: cor anglais) online with your microphone. It is in F and sounds a fifth below written; the tuner shows both. Free.',
  swDescription: 'Tune your English horn (cor anglais) online with your device’s microphone. The English horn is in F, and the tuner shows the written note and the sounding note.',
  h1: 'Online English Horn Tuner',
  intro: [
    'The English horn (UK: cor anglais) tuner works right in your browser. Play a long, steady note and it shows the sounding note and the note you read in the music, so you do not have to work out the transposition yourself.',
    'The A4 reference is adjustable, and the transposing setting is already on for the English horn.',
  ],
  transp: 7,
  sections: [
    {
      h2: 'The English horn: a transposing instrument in F',
      html: `<p>The English horn is an alto oboe, pitched a perfect fifth below the oboe. It is a transposing instrument in F: the written note sounds <strong>a perfect fifth lower</strong>.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (what you read)</th>
    <th>Sounding note (tuner)</th>
    <th>Frequency</th>
  </tr></thead>
  <tbody>
    <tr><td>C5</td><td>F4</td><td>349.2 Hz</td></tr>
    <tr><td>D5</td><td>G4</td><td>392.0 Hz</td></tr>
    <tr><td>E5 (tuning note)</td><td>A4</td><td>440.0 Hz</td></tr>
    <tr><td>G5</td><td>C5</td><td>523.3 Hz</td></tr>
  </tbody>
</table>
</div>
<p>To tune to A4 = 440 Hz, play a <strong>written E5</strong> and center the needle on a sounding <strong>A4</strong>.</p>
<p>The lowest written note is E3, which sounds A2 (110 Hz). That is above the tuner’s lower limit of about 40 Hz, so the whole range can be read.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your English horn',
      html: `<ul>
<li><strong>Bocal:</strong> the metal tube that holds the reed. Pulling the bocal out lengthens the instrument and lowers the pitch. Pushing it in raises the pitch.</li>
<li><strong>Warm up and wet the reed:</strong> blow warm air through the instrument for a few minutes before you tune. The double reed needs to be moist, so soak it briefly before you play.</li>
<li><strong>Written and sounding note:</strong> the panel above already has the transposing setting on. If you change it, choose <em>F</em> in the transposing instrument box to see the written note.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: English horn tuner',
  faq: [
    ['Why is it called an English horn if it is not English?',
      'The name is a puzzle: the instrument is not English, and it is not a horn. It is an alto oboe. In French it is <em>cor anglais</em>, which is the name used in the UK. In Italian it is <em>corno inglese</em> and in German <em>Englischhorn</em>.'],
    ['Is the English horn tuned like the French horn?',
      'Both are transposing instruments in F, so a written note sounds a perfect fifth lower on each. But they are different instruments: the English horn is a double-reed woodwind, and the French horn is a brass instrument.'],
    ['How do I tune the English horn to A = 440 Hz?',
      'Play a written E5. The sounding-note display should read A4, 440 Hz. The English horn sounds a fifth lower than written, so E5 sounds as A4.'],
    ['How is the English horn different from the oboe?',
      'It is larger, has a bulb-shaped bell and a bocal, and plays a fifth lower. The oboe is not a transposing instrument, so use the <a href="/en/tools/tuner/oboe/">oboe tuner</a> for it.'],
  ],
  closing: 'Once your English horn is in tune, work on long, steady phrases with the <a href="/en/tools/metronome/">online metronome</a>.',
});
