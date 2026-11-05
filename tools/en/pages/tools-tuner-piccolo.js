const tunerInstrument = require('../tuner-instrument');

// Spanish page: window.AFIN_TRANSP=-12 (written = sounding - 12), correct. The Spanish page tells you to play
// "written A3" and see A4, but a piccolo's lowest written note is D4, so A3 does not exist on it.
module.exports = tunerInstrument({
  slug: 'piccolo', esSlug: 'flautin', name: 'Piccolo',
  title: 'Free Online Piccolo Tuner — Sounds an Octave Higher',
  description: 'Tune your piccolo online with your microphone. It sounds an octave above the written note, and the tuner shows both. A4 adjustable. Free, no install.',
  swDescription: 'Tune your piccolo online with your device’s microphone. The piccolo sounds an octave higher than written, and the tuner shows the written note and the sounding note.',
  h1: 'Online Piccolo Tuner',
  intro: [
    'The piccolo tuner works right in your browser. Play a long, steady note and it shows the sounding note and the note you read in the music, so you can tune without doing the octave math in your head.',
    'The piccolo is small and very sensitive to air, embouchure and temperature, so a tuner is especially useful. The A4 reference is adjustable.',
  ],
  transp: -12,
  sections: [
    {
      h2: 'The piccolo sounds an octave higher than written',
      html: `<p>The piccolo is a half-size flute. It sounds <strong>one octave higher</strong> than the note written in the score. Music for piccolo is written an octave lower than it sounds, to avoid a pile of ledger lines. The tuner shows both notes, and the transposing setting is already on.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (what you read)</th>
    <th>Sounding note (tuner)</th>
    <th>Frequency</th>
  </tr></thead>
  <tbody>
    <tr><td>D4 (lowest note)</td><td>D5</td><td>587.3 Hz</td></tr>
    <tr><td>A4 (tuning note)</td><td>A5</td><td>880.0 Hz</td></tr>
    <tr><td>C6</td><td>C7</td><td>2093.0 Hz</td></tr>
    <tr><td>C7 (top of the standard range)</td><td>C8</td><td>4186.0 Hz</td></tr>
  </tbody>
</table>
</div>
<p>To tune, play a <strong>written A4</strong> and center the needle on a sounding <strong>A5</strong>, which is 880 Hz when A4 = 440 Hz.</p>
<p>The tuner reads up to about 4200 Hz, so the sounding C8 (4186 Hz) is right at its upper limit. The very highest notes may not register reliably.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your piccolo',
      html: `<ul>
<li><strong>Headjoint:</strong> pulling it out lowers the pitch and pushing it in raises it, as on the flute. The piccolo is much smaller, so even a tiny movement changes the pitch a lot. Adjust very gently.</li>
<li><strong>Warm up first:</strong> the piccolo reacts strongly to temperature. Warm it before you tune, and check again after a few minutes of playing.</li>
<li><strong>High register:</strong> the top notes tend to go sharp, especially when you play loudly. Use a gentler air stream and good breath support instead of pinching the lips.</li>
<li><strong>Compact embouchure:</strong> the piccolo shows every flaw in your embouchure. Small changes in lip position change the pitch noticeably.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: piccolo tuner',
  faq: [
    ['Is the piccolo a transposing instrument?',
      'Yes, by an octave. The piccolo is written an octave lower than it sounds, so a written A4 sounds A5. The tuner shows the sounding note and the written note, so you can read whichever you need.'],
    ['Which note should I use to tune the piccolo?',
      'Play a written A4, which sounds A5 at 880 Hz. The sounding-note display should read A5. Do not look for a written A3: the piccolo’s lowest written note is D4, so A3 does not exist on it.'],
    ['Why is the piccolo so hard to tune?',
      'It is very small, so small changes in air speed, embouchure or temperature move the pitch a lot. The top notes also tend to be sharp. A tuner helps you find which notes on your instrument need correction.'],
    ['Do wooden and metal piccolos tune the same way?',
      'The basic adjustment is the same: the headjoint. Wooden piccolos have a warmer tone and may differ slightly in the highest notes, but the method does not change.'],
  ],
  closing: 'Once your piccolo is in tune, work on clean articulation at speed with the <a href="/en/tools/metronome/">online metronome</a>.',
});
