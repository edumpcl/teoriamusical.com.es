const tunerInstrument = require('../tuner-instrument');

// The tuner ignores sounds below 40 Hz (afinador.js). Sounding B♭0 (29.1 Hz) to E♭1 (38.9 Hz) cannot be read.
// The Spanish page says the tuner can read 30-60 Hz in a quiet room and that modern editions write at sounding pitch:
// both are wrong. Spanish AFIN_TRANSP=12 is correct (written = sounding + 12).
module.exports = tunerInstrument({
  slug: 'contrabassoon', esSlug: 'contrafagot', name: 'Contrabassoon',
  title: 'Free Online Contrabassoon Tuner — Sounds an Octave Lower',
  description: 'Tune your contrabassoon online with your microphone. It sounds an octave below written. Learn which low notes the tuner can read, and how to tune the rest.',
  swDescription: 'Tune your contrabassoon online with your device’s microphone. The contrabassoon sounds an octave lower than written; the tuner shows both notes, but it cannot read sounds below about 40 Hz.',
  h1: 'Online Contrabassoon Tuner',
  intro: [
    'The contrabassoon tuner works in your browser. Play a steady note and it shows the sounding note and the note you read in the music. The contrabassoon sounds an octave lower than written, and the transposing setting is already on.',
    'One honest limit: this tuner does not read sounds below about 40 Hz, and the lowest contrabassoon notes are lower than that. Below, you can see which notes the tuner can read and how to tune the others.',
  ],
  transp: 12,
  sections: [
    {
      h2: 'The contrabassoon sounds an octave lower than written',
      html: `<p>The contrabassoon is the lowest standard orchestral woodwind, and it is always <strong>written an octave higher than it sounds</strong>. This avoids a pile of ledger lines below the staff. The tuner shows both notes.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Written note (what you read)</th>
    <th>Sounding note (tuner)</th>
    <th>Frequency</th>
    <th>Can this tuner read it?</th>
  </tr></thead>
  <tbody>
    <tr><td>B♭1 (lowest note)</td><td>B♭0</td><td>29.1 Hz</td><td>No, below 40 Hz</td></tr>
    <tr><td>D2</td><td>D1</td><td>36.7 Hz</td><td>No, below 40 Hz</td></tr>
    <tr><td>E2</td><td>E1</td><td>41.2 Hz</td><td>Barely, in a quiet room</td></tr>
    <tr><td>A2 (tuning note)</td><td>A1</td><td>55.0 Hz</td><td>Yes</td></tr>
    <tr><td>B♭2</td><td>B♭1</td><td>58.3 Hz</td><td>Yes</td></tr>
    <tr><td>C3</td><td>C2</td><td>65.4 Hz</td><td>Yes</td></tr>
  </tbody>
</table>
</div>
<p>The tuner ignores sounds below about 40 Hz. That means the sounding notes from <strong>B♭0 up to E♭1</strong> (29.1 to 38.9 Hz) cannot be read directly. Some contrabassoons have an extension down to a low A (27.5 Hz), which is lower still. Notes from about E1 (41.2 Hz) upward can be read.</p>`,
    },
    {
      h2: 'How to tune a contrabassoon with this tuner',
      html: `<ul>
<li><strong>Tune on a note the tuner can read:</strong> play a written A2, which sounds A1 (55.0 Hz), and center the needle by moving the bocal. Then check a written B♭2 (sounding B♭1, 58.3 Hz) and a written C3 (sounding C2, 65.4 Hz).</li>
<li><strong>For the lowest notes, use the octave above:</strong> the tuner cannot read a sounding B♭0, but it can read the B♭1 an octave higher. Tune that note first, then play the low and the high note one after the other and listen to the octave. If the low note sounds out of tune with it, adjust the low note by ear.</li>
<li><strong>Use a reference you can hear:</strong> for the lowest notes, play along with a piano or a reference tone one or two octaves higher. Listen for slow beating between the two notes, which means they are not quite in tune.</li>
<li><strong>Bocal:</strong> this is the main adjustment. The contrabassoon reacts strongly to how far the bocal is inserted, so small changes make a big difference in pitch.</li>
<li><strong>Warm up well:</strong> the contrabassoon holds a large volume of air and needs longer to warm up than a bassoon. Give it several minutes before you tune seriously.</li>
<li><strong>Microphone and room:</strong> hold the device close to the bell and keep the room quiet. A phone microphone does not pick up low frequencies well, and the tuner may show a harmonic an octave or more above the note you play. If the display jumps to a higher note, check the frequency shown before you adjust.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: contrabassoon tuner',
  faq: [
    ['Is the contrabassoon a transposing instrument?',
      'Yes. The contrabassoon always sounds an octave lower than written, so a written A2 sounds A1 (55 Hz). The tuner shows the sounding note and the written note.'],
    ['What is the lowest note of the contrabassoon?',
      'The standard lowest note is B♭0 at 29.1 Hz, written B♭1. It is one of the lowest notes in the standard orchestra, near the edge of where we hear a clear pitch. Some instruments have an extension down to a low A at 27.5 Hz.'],
    ['Can this tuner read the lowest contrabassoon notes?',
      'No, not directly. The tuner ignores sounds below about 40 Hz, so it cannot read the sounding notes from B♭0 up to E♭1. Tune on notes it can read, such as A1 at 55 Hz, and check the lowest notes against the same note an octave higher, or by ear.'],
    ['How is the contrabassoon different from the bassoon?',
      'It is about twice the size, with roughly 18 to 19 feet (nearly 6 meters) of tubing folded several times, compared with about 8 feet for the bassoon. It sounds an octave lower, has a darker and heavier tone, uses a larger reed and needs more air. The bassoon is not a transposing instrument: see the <a href="/en/tools/tuner/bassoon/">bassoon tuner</a>.'],
    ['Which bocal should I use to tune the contrabassoon?',
      'Contrabassoon bocals are larger than bassoon bocals and strongly affect pitch and tone. Check the pitch with the tuner at the start of each session, because temperature affects this instrument a lot.'],
  ],
  closing: 'Once your contrabassoon is in tune, work on timing with the <a href="/en/tools/metronome/">online metronome</a>.',
});
