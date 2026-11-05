const tunerInstrument = require('../tuner-instrument');

// Facts checked against the Spanish page (bombardino). B♭ euphonium; in treble clef (British brass band style) it sounds a major
// ninth below written, in bass clef (US band/orchestral) it is written at concert pitch.
// transp: 2 copied from the Spanish page, but the real treble-clef offset is +14 (the tuner only allows +-12), so the
// panel's written note has the right LETTER and is one octave lower than the printed part: the page says to go by the letter.
// Spanish page errors: FAQ says sounding A4 is written B4 in treble clef (it is B5; B4 is A3 = 220 Hz); "select B♭ (-2 semitones)"
// should be +2 in the panel and a ninth in reality; claimed range "B♭1-B♭4 same as the tenor trombone" is unverified (left out);
// pushing the tuning slide in does not lower the pitch.
module.exports = tunerInstrument({
  slug: 'euphonium', esSlug: 'bombardino', name: 'Euphonium',
  title: 'Free Online Euphonium Tuner — B♭, Bass or Treble Clef',
  description: 'Tune your euphonium online with your microphone. Shows sounding and written notes for bass clef or treble clef parts, A4 adjustable. Free, no install.',
  swDescription: 'Tune your euphonium online with your device’s microphone. The tuner shows the sounding note and the written note for treble-clef B♭ parts, with an adjustable A4 reference.',
  h1: 'Online Euphonium Tuner',
  transp: 2,
  intro: [
    'This euphonium tuner works in your browser with your device’s microphone. The euphonium is a B♭ instrument, and its music is written in two different ways. The tuner shows the sounding note and the note for treble-clef B♭ parts, so you can use it with either one.',
    'Play a steady note, hold it, and watch the cents meter. Left of center means flat, and right of center means sharp.',
  ],
  sections: [
    {
      h2: 'Euphonium notation and sounding pitch',
      html: `<p>There are two common ways to write euphonium music. Which one you read depends on your band or country:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Notation</th>
    <th>Clef</th>
    <th>Written note for a sounding A4 (440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td>Concert pitch (US bands, orchestral)</td><td>Bass clef</td><td>A4 (as it sounds)</td></tr>
    <tr><td>B♭ transposing (British brass band style)</td><td>Treble clef</td><td>B5 (a major ninth higher)</td></tr>
  </tbody>
</table>
</div>
<p>In treble clef, the euphonium part is written a <strong>major ninth</strong> (a major second plus an octave) above the sound. A written C5 sounds B♭3 (233.1 Hz), and a written B4 sounds A3 (220 Hz).</p>
<p>The transposing box is set to B♭ for treble-clef parts. The tuner shows the correct letter name of the written note, but it may show it one octave lower than your part, so go by the letter name. For bass-clef parts at concert pitch, choose “C (concert)”.</p>`,
    },
    {
      h2: 'Euphonium or baritone horn?',
      html: `<p>In the United States the names are often mixed up. The two instruments are close in size and pitch, both in B♭, and the tuner treats them the same way. They are not the same instrument:</p>
<ul>
<li><strong>Euphonium:</strong> a wider, more conical bore, a larger bell, and usually three or four valves. It has a fuller, rounder sound.</li>
<li><strong>Baritone horn:</strong> a narrower bore that is more cylindrical, and normally three valves. It sounds a bit brighter and lighter.</li>
</ul>
<p>In many US school bands the part is simply called “baritone” and is played on either instrument. In British brass bands, the “baritone” is a smaller B♭ instrument, different from the euphonium.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your euphonium',
      html: `<ul>
<li><strong>Main tuning slide:</strong> <strong>pushing it in</strong> shortens the tube and raises the pitch. <strong>Pulling it out</strong> lowers the pitch.</li>
<li><strong>Fourth valve:</strong> the fourth valve lowers the pitch by a perfect fourth, the same as valves 1 and 3 together. It is more in tune than the 1+3 combination, which sounds sharp, so use it for low notes.</li>
<li><strong>Warm up first:</strong> blow warm air through the instrument for a few minutes and empty the water keys before you tune. A cold euphonium plays flat.</li>
<li><strong>Good notes to tune on:</strong> a concert B♭ (B♭3 is 233.1 Hz, written C5 in treble clef) or a concert A (A3 is 220 Hz, written B4 in treble clef).</li>
</ul>
<p>The tuner reads sounds from about 40 Hz up, so the whole normal range of the euphonium is inside it.</p>`,
    },
  ],
  faqH2: 'Frequently asked questions: euphonium tuner',
  faq: [
    ['Is a euphonium the same as a baritone horn?',
      'No, but they are close. Both are B♭ instruments. The euphonium has a wider, more conical bore and a fuller sound, and it often has a fourth valve. The baritone horn has a narrower bore and a brighter sound, and normally three valves. In US school bands the terms are often used for either one.'],
    ['Is the euphonium a transposing instrument?',
      'It depends on the notation. In bass clef at concert pitch, as in US bands, it is not transposing. In treble clef, as in British brass bands, it is a B♭ instrument and sounds a major ninth lower than written. The large note on the tuner is always the sounding note.'],
    ['Which note should I use to tune my euphonium to 440 Hz?',
      'Players usually tune to a concert B♭ or a concert A. A3 (220 Hz) is a written B4 in treble clef, and A4 (440 Hz) is a written B5. In bass clef at concert pitch, simply play the A that your part shows.'],
    ['What does a compensating euphonium do?',
      'On a normal four-valve euphonium, the fourth valve combined with other valves makes the low register sharp. A compensating euphonium sends the air through extra tubing when you press the fourth valve with the others, which corrects that tendency. This helps most in the low register.'],
  ],
  closing: 'Once your euphonium is in tune, work on smooth lines and even sound with the <a href="/en/tools/metronome/">online metronome</a>. Slow tempos are the best way to train breath control.',
});
