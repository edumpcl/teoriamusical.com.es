const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  "slug": "tenor-saxophone",
  "esSlug": "saxofon-tenor",
  "name": "Tenor Saxophone",
  "title": "Free Online Tenor Saxophone Tuner — B♭ Transposing",
  "description": "Tune your tenor saxophone online with your microphone. B♭ transposing: shows the written and the sounding note. Adjustable A4. Free, no install.",
  "swDescription": "Tune your tenor saxophone online with your device’s microphone. B♭ transposing instrument: shows the written and the sounding note.",
  "h1": "Online Tenor Saxophone Tuner",
  "intro": [
    "The tenor saxophone tuner works right in your browser, with no app to install. It listens through your microphone and shows in real time, on a cents meter, how far your note is above or below the pitch.",
    "Because the tenor saxophone is a B♭ transposing instrument, the tuner shows both the <strong>sounding note</strong> and the <strong>written note</strong> you read on the page. The A4 reference is adjustable."
  ],
  "transp": 2,
  "sections": [
    {
      "h2": "The tenor saxophone: a B♭ transposing instrument",
      "html": "<p>The tenor saxophone is pitched in B♭. When the player reads a written C, the sounding note is B♭, a major ninth below the written pitch. The tuner shows the <strong>sounding note</strong> (concert pitch) and, because the transposing box is on, the <strong>written note</strong> too.</p>\n<div class=\"tm-table-wrap\">\n<table class=\"tm-table\">\n  <thead>\n    <tr>\n    <th>Written note (sheet music)</th>\n    <th>Sounding note (what the tuner shows)</th>\n    <th>Frequency</th>\n  </tr></thead>\n  <tbody>\n    <tr><td>B♭3</td><td>A♭2</td><td>103.8 Hz</td></tr>\n    <tr><td>C5</td><td>B♭3</td><td>233.1 Hz</td></tr>\n    <tr><td>B4</td><td>A3</td><td>220.0 Hz</td></tr>\n    <tr><td>B5</td><td>A4</td><td>440.0 Hz</td></tr>\n    <tr><td>F6</td><td>E♭5</td><td>622.3 Hz</td></tr>\n  </tbody>\n</table>\n</div>\n<p>To tune to A = 440 Hz, play the <strong>written B4</strong> (it sounds A3, 220.0 Hz) and center the needle at 0¢. The tuner works in any octave, so the cents meter reads the same for A3 as for the A one octave higher. Concert A is the note most bands and orchestras use as a tuning reference.</p>\n<p>The lowest sounding note of a tenor is about 103.8 Hz (written low B♭), and the highest regular note (written F) is about 622.3 Hz. Everything is inside the tuner’s range of about 40 to 4,200 Hz.</p>\n<p><strong>About the Written note column:</strong> the panel shows the right letter, but its octave number can read one octave lower than sheet music, because the transposition control stops at 12 semitones and your instrument sounds more than an octave below written pitch. Use the table above for the written octave.</p>"
    },
    {
      "h2": "Which saxophone is which?",
      "html": "<p>The four main saxophones differ in size, key and register:</p>\n<ul>\n<li><a href=\"/en/tools/tuner/soprano-saxophone/\">Soprano</a>: B♭, the smallest of the four. Most are straight, like a metal clarinet. Sounds a major second below written.</li>\n<li><a href=\"/en/tools/tuner/alto-saxophone/\">Alto</a>: E♭, the most common saxophone and the usual first one. Sounds a major sixth below written.</li>\n<li><strong>Tenor</strong>: B♭, larger, with a curved neck. Sounds a major ninth below written (an octave plus a major second).</li>\n<li><a href=\"/en/tools/tuner/baritone-saxophone/\">Baritone</a>: E♭, the largest of the four, with an extra loop of tubing at the top. Sounds a major thirteenth below written (an octave plus a major sixth).</li>\n</ul>\n<p>The four use the same fingerings and are written in treble clef in about the same written range (low B♭ up to high F, plus a high F♯ key on most modern instruments). Because each size sounds lower, the same written note comes out in a different register. Soprano and tenor are an octave apart, and so are alto and baritone. Sopranino and bass saxophones also exist, but this site has no tuner page for them. For the general saxophone tuner, see the <a href=\"/en/tools/tuner/saxophone/\">saxophone tuner</a>.</p>"
    },
    {
      "h2": "How to adjust the tuning of a tenor saxophone",
      "html": "<ul>\n<li><strong>Mouthpiece position:</strong> this is the main adjustment. Slide the mouthpiece farther onto the neck cork and the pitch goes up. Pull it out and the pitch goes down. Mark a line on the cork once you find your spot.</li>\n<li><strong>Warm up first:</strong> play for a few minutes before you tune. A saxophone goes sharp as the air inside it warms up, so tuning cold gives a wrong result.</li>\n<li><strong>Embouchure and air:</strong> biting harder raises the pitch and a loose embouchure lowers it. Tune with a relaxed, steady sound, and do not “fix” the pitch with your lip.</li>\n<li><strong>Check more than one note:</strong> after the reference note, test a low note and a high one. If they are far from each other, the cause is usually the embouchure or the reed, not the mouthpiece position.</li>\n<li><strong>Transposing box is on:</strong> this page already uses the B♭ setting, so you see the written and the sounding note at the same time.</li>\n</ul>"
    }
  ],
  "faqH2": "Frequently asked questions: tenor saxophone tuner",
  "faq": [
    [
      "Why does the tuner show B♭ when I play a C on the tenor saxophone?",
      "The tenor saxophone is a B♭ transposing instrument. A written C sounds B♭, a major ninth lower. The tuner always shows the sounding note (concert pitch) and, with the transposing box on, the written note too."
    ],
    [
      "Which note do I play to tune the tenor saxophone to A = 440 Hz?",
      "Play the written B4. It sounds concert A in a lower octave (A3, 220.0 Hz). Center the needle at 0¢ and adjust the mouthpiece position until it stays there."
    ],
    [
      "How is the tenor different from the soprano?",
      "Both are B♭ instruments and use the same written notes and fingerings. The tenor sounds an octave lower than the soprano and has a larger body and neck. The tuner setting is the same for both."
    ],
    [
      "Does the tuner read the low notes of the tenor?",
      "Yes. The lowest tenor note (written low B♭, sounding A♭2) is about 103.8 Hz, well above the tuner’s limit of about 40 Hz. For the lowest notes, bring the bell close to the microphone and keep the room quiet."
    ],
    [
      "Does the tuner work with any mouthpiece?",
      "Yes. The mouthpiece and reed change the tone and the general pitch, but the tuner reads the fundamental frequency whatever the material. A reed in good condition gives a clearer reading."
    ]
  ],
  "closing": "Once your saxophone is in tune, work on your time and articulation with the <a href=\"/en/tools/metronome/\">online metronome</a>."
});
