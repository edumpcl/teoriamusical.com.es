const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  slug: 'bassoon', esSlug: 'fagot', name: 'Bassoon',
  title: 'Free Online Bassoon Tuner — Concert Pitch, Adjustable A4',
  description: 'Tune your bassoon online with your microphone. A non-transposing instrument that reads from B♭1 up, fully inside the tuner’s range. Free, no install.',
  swDescription: 'Tune your bassoon online with your device’s microphone. The bassoon is not a transposing instrument, so the tuner shows the note you read. A4 is adjustable.',
  h1: 'Online Bassoon Tuner',
  intro: [
    'The bassoon tuner works right in your browser, with no app to install. Play a long, steady note and it shows the note name, the frequency, and on a cents meter whether you are flat or sharp.',
    'The lowest bassoon note, B♭1, is about 58 Hz, which is above the tuner’s lower limit of about 40 Hz. The whole range can be read. The A4 reference is adjustable.',
  ],
  sections: [
    {
      h2: 'The bassoon: a non-transposing instrument',
      html: `<p>The bassoon is <strong>not a transposing instrument</strong>: the written note is the note that sounds. The tuner shows the sounding note with no adjustment. Bassoon music is written in bass clef, with tenor clef and sometimes treble clef for the high register.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Note</th>
    <th>Frequency (A4 = 440 Hz)</th>
    <th>Where it sits on the bassoon</th>
  </tr></thead>
  <tbody>
    <tr><td>B♭1</td><td>58.3 Hz</td><td>Lowest note</td></tr>
    <tr><td>A3</td><td>220.0 Hz</td><td>Middle register, good for tuning</td></tr>
    <tr><td>A4</td><td>440.0 Hz</td><td>Upper register</td></tr>
    <tr><td>E5</td><td>659.3 Hz</td><td>Top of the usual range</td></tr>
  </tbody>
</table>
</div>
<p>The bassoon covers more than three octaves. Advanced players can go above E5.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your bassoon',
      html: `<ul>
<li><strong>Bocal:</strong> the curved metal tube that connects the reed to the body. Pushing the bocal in raises the pitch, and pulling it out lowers the pitch. This is the main tuning adjustment. Different bocals also change the tone.</li>
<li><strong>Reed:</strong> the double reed affects pitch a lot. Keep a few spares and check each one with the tuner.</li>
<li><strong>Warm up and wet the reed:</strong> blow warm air through the instrument and soak the reed for two to three minutes before you tune.</li>
<li><strong>Low register:</strong> the lowest notes are hard for a phone microphone to pick up, especially in a noisy room. Hold the device near the bell, or turn down the background noise.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: bassoon tuner',
  faq: [
    ['Is the bassoon a transposing instrument?',
      'No. The bassoon is a non-transposing instrument: the note you read is the note that sounds. The tuner shows that note directly. The contrabassoon is different: it sounds an octave lower than written, so see the <a href="/en/tools/tuner/contrabassoon/">contrabassoon tuner</a>.'],
    ['How does the bocal affect the pitch?',
      'The bocal is the curved metal tube between the reed and the body. Pushing it in makes the instrument shorter and raises the pitch. Pulling it out lowers the pitch. Different bocals also change the tone and the tuning tendencies of the instrument.'],
    ['Which notes are hard to keep in tune on the bassoon?',
      'It differs from one instrument to another, which is why a tuner helps. Play slowly through the whole range, write down the notes that are off, and correct them with the embouchure and fingerings your teacher suggests. The highest notes tend to be sharp.'],
    ['How does the reed affect the pitch?',
      'The double reed is the most variable part. A hard reed tends to play sharp and a soft one flat. Scraping a reed changes both the pitch and the tone, so check each new reed with the tuner before rehearsal.'],
  ],
  closing: 'Once your bassoon is in tune, work on clean staccato and steady rhythm with the <a href="/en/tools/metronome/">online metronome</a>.',
});
