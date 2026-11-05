const tunerInstrument = require('../tuner-instrument');

// Facts checked against the Spanish page (tuba). Non-transposing in bass clef (no transp).
// Pedal tones (fundamentals): CC C1 32.7 Hz, BB♭ B♭0 29.1 Hz, E♭ E♭1 38.9 Hz, F F1 43.7 Hz. The tuner ignores sounds below 40 Hz,
// so the first three cannot be read. The Spanish page says B♭0 (29.1 Hz) is "at the limit of many microphones"; in fact it is out of the
// tuner's range, and so are C1 and E♭1 (both below 40 Hz). Warm-up "10-15 minutes" is unverified; pushing the tuning slide in raises the pitch.
module.exports = tunerInstrument({
  slug: 'tuba', esSlug: 'tuba', name: 'Tuba',
  title: 'Free Online Tuba Tuner — BB♭, CC, E♭ and F Tubas',
  description: 'Tune your tuba online with your microphone. Concert pitch for BB♭, CC, E♭ and F tubas, with tips for the lowest notes. A4 adjustable. Free, no install.',
  swDescription: 'Tune your tuba online with your device’s microphone. Concert pitch display for BB♭, CC, E♭ and F tubas, with tips for the lowest notes and an adjustable A4 reference.',
  h1: 'Online Tuba Tuner',
  intro: [
    'This tuba tuner works in your browser with your device’s microphone. It is made for the BB♭, CC, E♭ and F tubas. The tuba is not a transposing instrument in bass clef, so the note on the screen is the note you read in your part.',
    'Very low notes need some care. The tuner reads sounds from about 40 Hz up, and the lowest notes of the tuba are below that. The sections below explain what the tuner can and cannot read, and how to tune the low notes with the octave above.',
  ],
  sections: [
    {
      h2: 'Types of tuba and their open notes',
      html: `<p>In an orchestra or concert band, the tuba reads in bass clef at concert pitch, so the tuner shows exactly the written note. The four common types differ in the lowest open note (the pedal tone, or fundamental) of the instrument:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
    <th>Tuba</th>
    <th>Pedal tone (fundamental)</th>
    <th>Second partial (one octave up)</th>
    <th>Can the tuner read the pedal tone?</th>
  </tr></thead>
  <tbody>
    <tr><td>CC tuba</td><td>C1 (32.7 Hz)</td><td>C2 (65.4 Hz)</td><td>No, below 40 Hz</td></tr>
    <tr><td>BB♭ tuba</td><td>B♭0 (29.1 Hz)</td><td>B♭1 (58.3 Hz)</td><td>No, below 40 Hz</td></tr>
    <tr><td>E♭ tuba</td><td>E♭1 (38.9 Hz)</td><td>E♭2 (77.8 Hz)</td><td>No, just below 40 Hz</td></tr>
    <tr><td>F tuba</td><td>F1 (43.7 Hz)</td><td>F2 (87.3 Hz)</td><td>Yes, just inside the range</td></tr>
  </tbody>
</table>
</div>
<p>In British brass bands, the E♭ and B♭ basses are written in treble clef as transposing instruments. The tuner always shows the <em>sounding</em> note, whatever notation you use.</p>`,
    },
    {
      h2: 'Tuning the lowest notes: use the octave above',
      html: `<p>The tuner ignores sounds below about 40 Hz. That means <strong>it cannot read the pedal tones of the CC, BB♭ and E♭ tubas</strong>, and it cannot read other notes below E1 (41.2 Hz). Even notes close to this limit can be hard for a phone microphone to pick up. It is better to say so than to give you a false reading.</p>
<p>To tune, use the second partial instead, one octave higher. It is a clear note, well inside the range:</p>
<ul>
<li><strong>BB♭ tuba:</strong> play B♭1 (58.3 Hz) or B♭2 (116.5 Hz).</li>
<li><strong>CC tuba:</strong> play C2 (65.4 Hz) or C3 (130.8 Hz).</li>
<li><strong>E♭ tuba:</strong> play E♭2 (77.8 Hz) or E♭3 (155.6 Hz).</li>
<li><strong>F tuba:</strong> play F2 (87.3 Hz) or F3 (174.6 Hz).</li>
</ul>
<p>Set the main tuning slide with one of these notes. For the pedal tone or another note below 40 Hz, play it and then play the same note an octave higher. If the upper note is in tune, listen to the two together and adjust the low note by ear.</p>`,
    },
    {
      h2: 'How to adjust the pitch of your tuba',
      html: `<ul>
<li><strong>Main tuning slide:</strong> <strong>pushing it in</strong> shortens the tube and raises the pitch. <strong>Pulling it out</strong> lowers the pitch.</li>
<li><strong>Valve slides:</strong> each valve has its own slide. Valve combinations tend to sound sharp, so pull the slides out for the combinations you use. Many tubas have a fourth valve (or rotor), which helps with low notes.</li>
<li><strong>Warm up first:</strong> the tuba has the most tubing of any brass instrument, so it takes longer to warm up. Blow warm air through it for several minutes and empty the water keys before tuning.</li>
<li><strong>Microphone:</strong> place the device close to the bell, in a quiet room. Low notes are hard for a phone microphone to pick up.</li>
</ul>`,
    },
  ],
  faqH2: 'Frequently asked questions: tuba tuner',
  faq: [
    ['Is the tuba a transposing instrument?',
      'In orchestral and concert band music, no: the tuba reads in bass clef at concert pitch. In the British brass band tradition, the E♭ and B♭ basses are written in treble clef and transpose. The tuner always shows the sounding note, whatever the notation.'],
    ['What is the difference between BB♭, CC, E♭ and F tubas?',
      'They differ in the length of tubing, so in their lowest open note: C1 for the CC tuba, B♭0 for the BB♭ tuba, E♭1 for the E♭ tuba and F1 for the F tuba. The CC tuba is common in orchestras, and the BB♭ tuba, the largest of the four, is common in bands. E♭ and F tubas are smaller and are used for higher parts.'],
    ['How do I tune a tuba with piston valves or rotary valves?',
      'The process is the same. The main tuning slide sets the overall pitch, and the slide of each valve corrects the sharp tendency of valve combinations. A fourth valve or rotor, found on many tubas, helps with the low register.'],
    ['Can the tuner read the lowest notes of my tuba?',
      'Not all of them. The tuner ignores sounds below about 40 Hz, so it cannot read the pedal tones of a CC tuba (C1, 32.7 Hz), a BB♭ tuba (B♭0, 29.1 Hz) or an E♭ tuba (E♭1, 38.9 Hz). Play the note an octave higher instead, tune that, and then match the low note to it by ear. Notes from F1 (43.7 Hz) up are in range, but a phone microphone may still need to be close to the bell.'],
  ],
  closing: 'Once your tuba is in tune, work on a steady pulse with the <a href="/en/tools/metronome/">online metronome</a>. The tuba is the bass of the band, and a firm tempo keeps everyone together.',
});
