const tunerInstrument = require('../tuner-instrument');

// The Spanish saxophone page has no window.AFIN_TRANSP (the box starts at 0). Errors fixed here: the alto FAQ says to
// play "written B" but then F♯; the tuner's E♭ button (-3) only gives the right letters for alto/baritone; neck direction.
// Lowest notes: baritone low A sounds C2 (65.4 Hz), low B♭ D♭2 (69.3 Hz); tenor low B♭ sounds A♭2 (103.8 Hz): all above 40 Hz.
module.exports = tunerInstrument({
  slug: 'saxophone', esSlug: 'saxofon', name: 'Saxophone',
  title: 'Free Online Saxophone Tuner — Alto, Tenor, Soprano, Bari',
  description: 'Tune your saxophone online with your microphone. Written note to play for concert A on soprano, alto, tenor and baritone sax. Free, no install.',
  swDescription: 'Tune your saxophone online with your device’s microphone. Shows the sounding note, with the transposition for soprano, alto, tenor and baritone saxophones.',
  h1: 'Online Saxophone Tuner',
  intro: [
    'The saxophone tuner works right in your browser, with no app to install. The saxophone is a transposing instrument: the tuner shows the <em>sounding note</em> (concert pitch). The soprano and tenor saxophones are in B♭, and the alto and baritone saxophones are in E♭.',
    'It works with soprano, alto, tenor, baritone and bass saxophones. All you need is the microphone of your device. The chromatic tuner does not need to change for each size: you only need to know which written note gives the sounding note you want.',
  ],
  sections: [
    {
      h2: 'Saxophone transposition: what the tuner shows',
      html: `<p>The tuner shows the sounding note. This table tells you what each saxophone sounds when you play a written C, and which written note to play to get concert A (A = 440 Hz):</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Saxophone</th>
    <th>Key</th>
    <th>Sounds</th>
    <th>Written C4 sounds</th>
    <th>Written note for concert A</th>
  </tr></thead>
  <tbody>
    <tr><td><a href="/en/tools/tuner/soprano-saxophone/">Soprano</a></td><td>B♭</td><td>Major second lower</td><td>B♭3</td><td>B4 → A4 (440 Hz)</td></tr>
    <tr><td><a href="/en/tools/tuner/alto-saxophone/">Alto</a></td><td>E♭</td><td>Major sixth lower</td><td>E♭3</td><td>F♯5 → A4 (440 Hz)</td></tr>
    <tr><td><a href="/en/tools/tuner/tenor-saxophone/">Tenor</a></td><td>B♭</td><td>Major ninth lower</td><td>B♭2</td><td>B4 → A3 (220 Hz)</td></tr>
    <tr><td><a href="/en/tools/tuner/baritone-saxophone/">Baritone</a></td><td>E♭</td><td>Octave plus major sixth lower</td><td>E♭2</td><td>F♯5 → A3 (220 Hz)</td></tr>
  </tbody>
</table>
</div>
<p>The bass saxophone is also in B♭ and sounds an octave below the tenor. The cents meter works in any octave, so it does not matter whether you tune A3 or A4. Choose the written note that is comfortable on your instrument.</p>
<p>The lowest notes of the common saxophones are all above the 40 Hz limit of the tuner: the low B♭ of the tenor sounds A♭2 (about 104 Hz), and the lowest notes of the baritone sound C2 and D♭2 (about 65 and 69 Hz). Low notes are weaker on a phone microphone, so hold the device close to the bell.</p>`,
    },
    {
      h2: 'Using the transposition box',
      html: `<p>Open the “Transposing instrument” box to see the written note next to the sounding note. The buttons give the right <em>letter</em> for your part:</p>
<ul>
<li><strong>Soprano:</strong> choose B♭ (+2 st). The written note is exact.</li>
<li><strong>Alto:</strong> use the + button to set +9 st. The written note is exact. The E♭ button (−3 st) shows the same letter one octave lower.</li>
<li><strong>Tenor:</strong> choose B♭ (+2 st). The letter is right, but the written octave is shown one octave too low, because the box cannot reach +14 st.</li>
<li><strong>Baritone:</strong> choose E♭ (−3 st). The letter is right, but the written octave is shown two octaves too low, because the box cannot reach +21 st.</li>
</ul>
<p>The sounding note is always correct, whatever you choose.</p>`,
    },
    {
      h2: 'How to adjust the tuning of a saxophone',
      html: `<ul>
<li><strong>Neck:</strong> the main adjustment. The neck is the curved tube between the mouthpiece and the body. <strong>Pulling the mouthpiece out of the cork lowers the pitch; pushing it in raises the pitch.</strong> Loosen the neck screw only as much as you need to slide the mouthpiece.</li>
<li><strong>Warm up first:</strong> blow warm air through the saxophone for a few minutes before you tune. Differences in temperature change the pitch noticeably.</li>
<li><strong>Mouthpiece and reed:</strong> the position of the mouthpiece on the neck cork matters, and so do the reed and your embouchure. Biting harder raises the pitch, and loosening your lip lowers it.</li>
<li><strong>Tune more than one note:</strong> check a low note and a middle note. If one is high and the other low, the problem is the embouchure and air support more than the neck.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: saxophone tuner',
  faq: [
    ['Which note do I play to tune an alto saxophone?',
      'Play a written F♯ (F♯5 in the part). It sounds A4 = 440 Hz. The alto sax is in E♭: a written C sounds as an E♭, a major sixth lower.'],
    ['How is the transposition of the alto and the tenor saxophone different?',
      'The alto is in E♭: a written C sounds as an E♭ (a major sixth lower, or a minor third plus an octave). The tenor is in B♭: a written C sounds as a B♭, a major ninth lower, which is a major second plus an octave. The soprano is in B♭ too, but it sounds only a major second lower, like the clarinet and the trumpet.'],
    ['Does the neck change the tuning a lot?',
      'Yes. Pushing the mouthpiece further onto the neck shortens the instrument and raises the pitch; pulling it out lowers the pitch. Make small changes, and check with the tuner after each. The reed and your embouchure change the pitch as well.'],
    ['Does the tuner work with soprano, baritone and bass saxophones?',
      'Yes. The soprano is in B♭, like the tenor. The baritone is in E♭, like the alto, and sounds an octave lower. The bass is in B♭ and sounds an octave below the tenor. The chromatic tuner reads all of them. You only need to know which sounding note matches the written note of your instrument.'],
    ['How many cents out of tune is acceptable for a saxophone?',
      'For individual practice, within ±10 cents is a reasonable goal. For an ensemble or a recording, aim for ±5 cents or less. 100 cents equal one full semitone.'],
  ],
  closing: 'Once your saxophone is in tune, practice your rhythm and tempo with the <a href="/en/tools/metronome/">online metronome</a>.',
});
