const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  "slug": "soprano-saxophone",
  "esSlug": "saxofon-soprano",
  "name": "Soprano Saxophone",
  "title": "Free Online Soprano Saxophone Tuner — B♭ Transposing",
  "description": "Tune your soprano saxophone online with your microphone. B♭ transposing: shows the written and the sounding note. Adjustable A4. Free, no install.",
  "swDescription": "Tune your soprano saxophone online with your device’s microphone. B♭ transposing instrument: shows the written and the sounding note.",
  "h1": "Online Soprano Saxophone Tuner",
  "intro": [
    "The soprano saxophone tuner works right in your browser, with no app to install. It listens through your microphone and shows in real time, on a cents meter, how far your note is above or below the pitch.",
    "Because the soprano saxophone is a B♭ transposing instrument, the tuner shows both the <strong>sounding note</strong> and the <strong>written note</strong> you read on the page. The A4 reference is adjustable."
  ],
  "transp": 2,
  "sections": [
    {
      "h2": "The soprano saxophone: a B♭ transposing instrument",
      "html": "<p>The soprano saxophone is pitched in B♭. When the player reads a written C, the sounding note is B♭, a major second below the written pitch. The tuner shows the <strong>sounding note</strong> (concert pitch) and, because the transposing box is on, the <strong>written note</strong> too.</p>\n<div class=\"tm-table-wrap\">\n<table class=\"tm-table\">\n  <thead>\n    <tr>\n    <th>Written note (sheet music)</th>\n    <th>Sounding note (what the tuner shows)</th>\n    <th>Frequency</th>\n  </tr></thead>\n  <tbody>\n    <tr><td>B♭3</td><td>A♭3</td><td>207.7 Hz</td></tr>\n    <tr><td>C5</td><td>B♭4</td><td>466.2 Hz</td></tr>\n    <tr><td>B4</td><td>A4</td><td>440.0 Hz</td></tr>\n    <tr><td>B5</td><td>A5</td><td>880.0 Hz</td></tr>\n    <tr><td>F6</td><td>E♭6</td><td>1244.5 Hz</td></tr>\n  </tbody>\n</table>\n</div>\n<p>To tune to A = 440 Hz, play the <strong>written B4</strong> (it sounds A4, 440.0 Hz) and center the needle at 0¢. Concert A is the note most bands and orchestras use as a tuning reference.</p>\n<p>The lowest sounding note of a soprano is about 207.7 Hz (written low B♭), and the highest regular note (written F) is about 1,244.5 Hz. Everything is inside the tuner’s range of about 40 to 4,200 Hz.</p>\n"
    },
    {
      "h2": "Which saxophone is which?",
      "html": "<p>The four main saxophones differ in size, key and register:</p>\n<ul>\n<li><strong>Soprano</strong>: B♭, the smallest of the four. Most are straight, like a metal clarinet. Sounds a major second below written.</li>\n<li><a href=\"/en/tools/tuner/alto-saxophone/\">Alto</a>: E♭, the most common saxophone and the usual first one. Sounds a major sixth below written.</li>\n<li><a href=\"/en/tools/tuner/tenor-saxophone/\">Tenor</a>: B♭, larger, with a curved neck. Sounds a major ninth below written (an octave plus a major second).</li>\n<li><a href=\"/en/tools/tuner/baritone-saxophone/\">Baritone</a>: E♭, the largest of the four, with an extra loop of tubing at the top. Sounds a major thirteenth below written (an octave plus a major sixth).</li>\n</ul>\n<p>The four use the same fingerings and are written in treble clef in about the same written range (low B♭ up to high F, plus a high F♯ key on most modern instruments). Because each size sounds lower, the same written note comes out in a different register. Soprano and tenor are an octave apart, and so are alto and baritone. Sopranino and bass saxophones also exist, but this site has no tuner page for them. For the general saxophone tuner, see the <a href=\"/en/tools/tuner/saxophone/\">saxophone tuner</a>.</p>"
    },
    {
      "h2": "How to adjust the tuning of a soprano saxophone",
      "html": "<ul>\n<li><strong>Mouthpiece position:</strong> this is the main adjustment. Slide the mouthpiece farther onto the neck cork and the pitch goes up. Pull it out and the pitch goes down. Mark a line on the cork once you find your spot.</li>\n<li><strong>Warm up first:</strong> play for a few minutes before you tune. A saxophone goes sharp as the air inside it warms up, so tuning cold gives a wrong result.</li>\n<li><strong>Embouchure and air:</strong> biting harder raises the pitch and a loose embouchure lowers it. Tune with a relaxed, steady sound, and do not “fix” the pitch with your lip.</li>\n<li><strong>Check more than one note:</strong> after the reference note, test a low note and a high one. If they are far from each other, the cause is usually the embouchure or the reed, not the mouthpiece position.</li>\n<li><strong>Transposing box is on:</strong> this page already uses the B♭ setting, so you see the written and the sounding note at the same time.</li>\n</ul>"
    }
  ],
  "faqH2": "Frequently asked questions: soprano saxophone tuner",
  "faq": [
    [
      "Why does the tuner show B♭ when I play a C on the soprano saxophone?",
      "The soprano saxophone is a B♭ transposing instrument. A written C sounds B♭, a major second lower. The tuner always shows the sounding note (concert pitch) and, with the transposing box on, the written note too."
    ],
    [
      "Which note do I play to tune the soprano saxophone to A = 440 Hz?",
      "Play the written B4. It sounds concert A (440 Hz). Center the needle at 0¢ and adjust the mouthpiece position until it stays there."
    ],
    [
      "How is the soprano different from the tenor?",
      "Both are B♭ instruments and use the same written notes and fingerings. The soprano sounds an octave higher than the tenor, and it is much smaller. The tuner setting is the same for both."
    ],
    [
      "Is the soprano saxophone harder to play in tune?",
      "Many players find it so. The instrument is small, so a small change in embouchure or air moves the pitch more. Use the cents meter on several notes, not only the reference note."
    ],
    [
      "Does the tuner work with any mouthpiece?",
      "Yes. The mouthpiece and reed change the tone and the general pitch, but the tuner reads the fundamental frequency whatever the material. A reed in good condition gives a clearer reading."
    ]
  ],
  "closing": "Once your saxophone is in tune, work on your time and articulation with the <a href=\"/en/tools/metronome/\">online metronome</a>."
});
