const tunerInstrument = require('../tuner-instrument');

module.exports = tunerInstrument({
  "slug": "timpani",
  "esSlug": "timbales",
  "name": "Timpani",
  "title": "Free Online Timpani Tuner — Pedal Tuning and Ranges",
  "description": "Tune your orchestral timpani online with your microphone. Pitch ranges of the 32, 29, 26 and 23 inch drums, and how to read a drum’s pitch. Free.",
  "swDescription": "Tune orchestral timpani online with your device’s microphone. Shows the note and the cents of each drum, with the tuning range of each size.",
  "h1": "Online Timpani Tuner",
  "intro": [
    "The timpani tuner works right in your browser, with no app to install. Timpani (also called kettledrums) are percussion instruments with definite pitch, so you can tune each drum to a note. The tuner listens to the drum and shows the note and how many cents it is above or below it.",
    "This page is about orchestral pedal timpani, not Latin timbales. Timbales are small, shallow metal drums with no pedal, and they are not tuned to notes the way timpani are. The A4 reference is adjustable."
  ],
  "sections": [
    {
      "h2": "Timpani sizes and pitch ranges",
      "html": "<p>A standard orchestral set has four drums. Each drum covers about a <strong>perfect fifth</strong>, and neighboring drums overlap a little, so the set covers D2 to A3 with no gaps. A smaller piccolo drum (20 inches) is often added for high parts. These ranges are typical. They vary a little with the maker, the model and the head.</p>\n<div class=\"tm-table-wrap\">\n<table class=\"tm-table\">\n  <thead>\n    <tr>\n    <th>Drum (diameter)</th>\n    <th>Typical range</th>\n    <th>Frequency (A4 = 440 Hz)</th>\n  </tr></thead>\n  <tbody>\n    <tr><td>32″ (81 cm)</td><td>D2–A2</td><td>73.4–110.0 Hz</td></tr>\n    <tr><td>29″ (74 cm)</td><td>F2–C3</td><td>87.3–130.8 Hz</td></tr>\n    <tr><td>26″ (66 cm)</td><td>B♭2–F3</td><td>116.5–174.6 Hz</td></tr>\n    <tr><td>23″ (58 cm)</td><td>D3–A3</td><td>146.8–220.0 Hz</td></tr>\n  </tbody>\n</table>\n</div>\n<p>A drum sounds best in the middle of its range. At the bottom of the range the head is loose and the note loses definition. At the top the head is tight and the sound gets choked. If a note falls near the end of one drum’s range, use the neighboring drum if the note sits closer to its middle.</p>\n<p><strong>Tuner limits:</strong> the tuner reads notes from about 40 Hz up to about 4,200 Hz. Even the lowest note of the 32-inch drum, D2 at 73.4 Hz, is above that limit, so every note in the table can be read. Low notes are still quiet and soft on a phone microphone, so bring the device close to the drum (see the tips below). Some extra-large drums go lower than D2. If a note on your drum is below about 40 Hz, the tuner cannot read it. Use a keyboard or a tuning fork and your ear instead.</p>"
    },
    {
      "h2": "How pedal tuning works",
      "html": "<p>A pedal timpano changes the tension of the whole head at once. The pedal is connected to a mechanism that tightens or loosens all the tension rods together, so the player can change the pitch quickly, even in the middle of a piece. A tuning gauge next to the pedal shows its position. Most drums also have a <strong>fine-tuning handle</strong> to correct small differences.</p>\n<ul>\n<li><strong>Clear the head first:</strong> before you use the pedal, tap the head an inch or two (3-5 cm) from the rim, next to each tension rod. Every spot should give the same pitch. If one is higher or lower, adjust that rod. An uneven head gives a different pitch depending on where you strike.</li>\n<li><strong>Tune up to the note:</strong> start slightly below the target note, then raise the pitch until it arrives. If you go too high, go below the note and come up again. This keeps the pedal mechanism tight, so the pitch stays put.</li>\n<li><strong>Check each note with the tuner:</strong> the gauge helps you find the note quickly, but the head and the room change the pitch, so confirm with the tuner or your ear.</li>\n</ul>"
    },
    {
      "h2": "How to read the pitch of a timpano",
      "html": "<ol>\n<li><strong>Press Start</strong> and allow the microphone.</li>\n<li><strong>Strike the head gently</strong>, about a quarter of the diameter from the rim, with a normal timpani mallet. This spot gives the clearest note. A strike in the center adds more overtones and can confuse the tuner.</li>\n<li><strong>Wait one or two seconds</strong> after the strike. The pitch of the first instant is unstable. Read the tuner when the note has settled.</li>\n<li><strong>Read the note and the needle.</strong> The big letter is the note the drum is closest to. If the needle is to the left, the drum is flat (too low). If it is to the right, the drum is sharp (too high). Center it at 0¢ for the note you want.</li>\n</ol>\n<p>The pitch you hear from a timpano is not a simple tone. It comes from several overtones that blend together, so the tuner can sometimes read a wrong note, or jump between two notes. If that happens, strike more softly, away from the center, and stop the other drums with your hand so they do not ring in sympathy. Trust your ear as well: compare the drum with a keyboard or with the reference notes on the panel.</p>"
    },
    {
      "h2": "Tips for tuning timpani",
      "html": "<ul>\n<li><strong>Keep the microphone close:</strong> hold the device near the head, not directly above it, and keep it still.</li>\n<li><strong>Use a quiet room:</strong> the other drums ring when you hit one, and noise confuses the low notes. Mute the other drums with your hand.</li>\n<li><strong>Heads and weather:</strong> plastic (Mylar) heads are more stable than calfskin when the temperature and humidity change, but they still need a check before each rehearsal.</li>\n<li><strong>Check by ear:</strong> in a performance, tap softly near the rim and listen. It is easier to hear a soft tap than a full strike.</li>\n</ul>"
    }
  ],
  "faqH2": "Frequently asked questions: timpani tuner",
  "faq": [
    [
      "How does the timpani pedal work?",
      "The pedal moves a mechanism that tightens or loosens the head at all tension points at the same time. Moving the pedal in one direction raises the pitch and moving it the other way lowers it. Which way is up depends on the design of your drum, so check the gauge and the tuner. Each drum covers about a perfect fifth."
    ],
    [
      "What range does a standard set of timpani have?",
      "A standard set of four drums covers about D2 to A3. The 32-inch drum covers about D2 to A2, the 29-inch F2 to C3, the 26-inch B♭2 to F3 and the 23-inch D3 to A3. Ranges vary a little with the maker."
    ],
    [
      "Why does the tuner take a moment to settle with timpani?",
      "The note of a struck timpano changes slightly in the first moment, then settles. Wait one or two seconds after the strike before you read the tuner, and strike gently near the rim, about a quarter of the diameter from the edge."
    ],
    [
      "Can the tuner read the lowest notes?",
      "The tuner reads from about 40 Hz up. The lowest note of a standard set, D2 at 73.4 Hz, is above that, so the tuner can read it. It can be weak on a phone microphone, so bring the device closer. A note under 40 Hz on an extra-large drum cannot be read by this tuner."
    ],
    [
      "Are orchestral timpani tuned in equal temperament?",
      "Modern orchestras generally tune the timpani in equal temperament, with A4 at 440 Hz or a little higher (many orchestras use 442 Hz). In some pieces a player adjusts a note by ear to fit the chord. The A4 reference of this tuner is adjustable."
    ],
    [
      "How precise should the tuning be?",
      "Tune as close to 0¢ as you can, and then listen. A timpano is heard against other instruments, so being in tune with them matters more than the number on the meter. 100 cents equal one half step."
    ]
  ],
  "closing": "Once your timpani are in tune, practice your counting and rolls with the <a href=\"/en/tools/metronome/\">online metronome</a>."
});
