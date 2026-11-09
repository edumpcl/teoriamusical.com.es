const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-eighth-rest-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-ritmo-suena/',
  title: "Which Rhythm Plays? Whole Notes & Eighth Rests Dictation",
  description: "Free rhythmic dictation with whole notes, eighth rests and sixteenths: hear two measures in 4/4 and pick the matching one of four written rhythms.",
  h1: "Which Rhythm Is Playing? Dictation with Whole Notes and Eighth Rests",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and choose which of the <strong>four written rhythms</strong> you heard. Now comes the <strong>off-beat</strong>: an <strong>eighth rest followed by an eighth note</strong>, a single note that enters in the middle of the beat. The rhythms use whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), eighth notes (UK: quavers), sixteenth notes (UK: semiquavers), eighth rest and eighth note, and their rests. The key is to hear whether each note falls on the beat or between two beats.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "redondas-sc" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, then <em>Listen</em>, and pick rhythm A, B, C or D, even while the audio is still playing. The correct rhythm is marked in green; if you missed, the beats where your choice differs are shown. Expect near-identical options that differ by one or two beats, for example an eighth rest and eighth note in place of a quarter note. Up to three listens.</p>

<h2>How to Pick the Right Rhythm with Whole Notes and Eighth Rests</h2>

<ol>
  <li><strong>Keep your foot moving.</strong> Off-beat notes only make sense against a steady pulse. Count the beats during the count-in measure, then keep tapping them: your foot goes down on the beat and up in the middle of it.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Listen for where each note falls in the beat.</strong> A note that starts on the beat and fills it is a quarter note; two notes make two eighths; four notes, four sixteenths; and a single note that arrives halfway through the beat, between two pulses, is an eighth rest followed by an eighth note. A note that keeps sounding into later beats is a longer value, and silence is a rest.</li>
  <li><strong>Use your three listens.</strong> Both measures play each time. Take the pulse and measure 1 on the first listen, measure 2 on the second, and on the third compare the whole rhythm with the four written options. You can answer while it plays.</li>
</ol>

<p>The usual mistake is <strong>hearing the off-beat eighth note as if it fell on the beat</strong>: without the pulse in your head, a single note in a beat sounds like a quarter note. Tap the beat and say "(sh)-ti" for an eighth rest and eighth note, "ti-ti" for two eighths and "ta" for a quarter note: if the note lands with your foot, it is a quarter note; if it lands as your foot comes up, it is the eighth note after its rest.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and their rests</a>, all on the note G on the piano at a tempo between 60 and 72 quarter notes per minute, a little slower because of the sixteenth notes. The <strong>eighth rest and eighth note</strong> always fills one beat: the beat starts in silence and the note enters in its second half, off the beat. The other eighth notes come in pairs and the <strong>sixteenth notes in fours</strong>, each group filling a beat. Every dictation has at least <strong>one eighth rest followed by an eighth note</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so an eighth note after its rest is heard as a short note arriving in the middle of the beat, between two pulses. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell an eighth rest and eighth note from a quarter note?</div><div class="tm-faq-a">Both are a single note in the beat, but they do not fall in the same place: the quarter note starts on the beat and the eighth note arrives in the middle of the beat, between two pulses. If you tap your foot, a quarter note lands as your foot goes down and the eighth note as it comes up.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is an off-beat?</div><div class="tm-faq-a">A note that enters on the weak part of the beat, its second half, while the strong part is silent. The eighth rest followed by an eighth note is the simplest off-beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you can answer while it plays. After you answer you can listen again as often as you like.</div></div>
</div>

<p>When you get it right almost every time, try <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea/">writing the dictation</a>. If it is too much, go back to the group before it, <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-ritmo-suena/">whole notes and sixteenth notes</a>.</p>
`,
});
