const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  "slug": "alto-saxophone",
  "esSlug": "saxofon-alto",
  "name": "Alto Saxophone",
  "title": "Free Online Alto Saxophone Tuner — E♭ Transposing",
  "description": "Tune your alto saxophone online with your microphone. E♭ transposing: shows the written and the sounding note. Adjustable A4. Free, no install.",
  "swDescription": "Tune your alto saxophone online with your device’s microphone. E♭ transposing instrument: shows the written and the sounding note.",
  "h1": "Online Alto Saxophone Tuner",
  "intro": [
    "The alto saxophone tuner works right in your browser, with no app to install. It listens through your microphone and shows in real time, on a cents meter, how far your note is above or below the pitch.",
    "Because the alto saxophone is a E♭ transposing instrument, the tuner shows both the <strong>sounding note</strong> and the <strong>written note</strong> you read on the page. The A4 reference is adjustable."
  ],
  "transp": 9,
  "sections": [
    {
      "h2": "The alto saxophone: a E♭ transposing instrument",
      "html": "<p>The alto saxophone is pitched in E♭. When the player reads a written C, the sounding note is E♭, a major sixth below the written pitch. The tuner shows the <strong>sounding note</strong> (concert pitch) and, because the transposing box is on, the <strong>written note</strong> too.</p>\n<div class=\"tm-table-wrap\">\n<table class=\"tm-table\">\n  <thead>\n    <tr>\n    <th>Written note (sheet music)</th>\n    <th>Sounding note (what the tuner shows)</th>\n    <th>Frequency</th>\n  </tr></thead>\n  <tbody>\n    <tr><td>B♭3</td><td>D♭3</td><td>138.6 Hz</td></tr>\n    <tr><td>C5</td><td>E♭4</td><td>311.1 Hz</td></tr>\n    <tr><td>F♯5</td><td>A4</td><td>440.0 Hz</td></tr>\n    <tr><td>G5</td><td>B♭4</td><td>466.2 Hz</td></tr>\n    <tr><td>F6</td><td>A♭5</td><td>830.6 Hz</td></tr>\n  </tbody>\n</table>\n</div>\n<p>To tune to A = 440 Hz, play the <strong>written F♯5</strong> (it sounds A4, 440.0 Hz) and center the needle at 0¢. Concert A is the note most bands and orchestras use as a tuning reference.</p>\n<p>The lowest sounding note of an alto is about 138.6 Hz (written low B♭), and the highest regular note (written F) is about 830.6 Hz. Everything is inside the tuner’s range of about 40 to 4,200 Hz.</p>\n"
    },
    {
      "h2": "Which saxophone is which?",
      "html": "<p>The four main saxophones differ in size, key and register:</p>\n<ul>\n<li><a href=\"/en/tools/tuner/soprano-saxophone/\">Soprano</a>: B♭, the smallest of the four. Most are straight, like a metal clarinet. Sounds a major second below written.</li>\n<li><strong>Alto</strong>: E♭, the most common saxophone and the usual first one. Sounds a major sixth below written.</li>\n<li><a href=\"/en/tools/tuner/tenor-saxophone/\">Tenor</a>: B♭, larger, with a curved neck. Sounds a major ninth below written (an octave plus a major second).</li>\n<li><a href=\"/en/tools/tuner/baritone-saxophone/\">Baritone</a>: E♭, the largest of the four, with an extra loop of tubing at the top. Sounds a major thirteenth below written (an octave plus a major sixth).</li>\n</ul>\n<p>The four use the same fingerings and are written in treble clef in about the same written range (low B♭ up to high F, plus a high F♯ key on most modern instruments). Because each size sounds lower, the same written note comes out in a different register. Soprano and tenor are an octave apart, and so are alto and baritone. Sopranino and bass saxophones also exist, but this site has no tuner page for them. For the general saxophone tuner, see the <a href=\"/en/tools/tuner/saxophone/\">saxophone tuner</a>.</p>"
    },
    {
      "h2": "How to adjust the tuning of a alto saxophone",
      "html": "<ul>\n<li><strong>Mouthpiece position:</strong> this is the main adjustment. Slide the mouthpiece farther onto the neck cork and the pitch goes up. Pull it out and the pitch goes down. Mark a line on the cork once you find your spot.</li>\n<li><strong>Warm up first:</strong> play for a few minutes before you tune. A saxophone goes sharp as the air inside it warms up, so tuning cold gives a wrong result.</li>\n<li><strong>Embouchure and air:</strong> biting harder raises the pitch and a loose embouchure lowers it. Tune with a relaxed, steady sound, and do not “fix” the pitch with your lip.</li>\n<li><strong>Check more than one note:</strong> after the reference note, test a low note and a high one. If they are far from each other, the cause is usually the embouchure or the reed, not the mouthpiece position.</li>\n<li><strong>Transposing box is on:</strong> this page already uses the E♭ setting, so you see the written and the sounding note at the same time.</li>\n</ul>"
    }
  ],
  "faqH2": "Frequently asked questions: alto saxophone tuner",
  "faq": [
    [
      "Why does the tuner show E♭ when I play a C on the alto saxophone?",
      "The alto saxophone is a E♭ transposing instrument. A written C sounds E♭, a major sixth lower. The tuner always shows the sounding note (concert pitch) and, with the transposing box on, the written note too."
    ],
    [
      "Which note do I play to tune the alto saxophone to A = 440 Hz?",
      "Play the written F♯5. It sounds concert A (440 Hz). Center the needle at 0¢ and adjust the mouthpiece position until it stays there."
    ],
    [
      "How is the alto different from the baritone?",
      "Both are E♭ instruments and use the same written notes and fingerings. The baritone sounds an octave lower than the alto and is much larger. The tuner setting is the same for both."
    ],
    [
      "How does lip pressure change the pitch?",
      "More pressure from the lower lip makes the pitch go up, and less pressure makes it go down. For a stable result, keep a relaxed embouchure and use the mouthpiece position as your main adjustment."
    ],
    [
      "Does the tuner work with any mouthpiece?",
      "Yes. The mouthpiece and reed change the tone and the general pitch, but the tuner reads the fundamental frequency whatever the material. A reed in good condition gives a clearer reading."
    ]
  ],
  "closing": "Once your saxophone is in tune, work on your time and articulation with the <a href=\"/en/tools/metronome/\">online metronome</a>."
});
