const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-eighth-rest-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-audio-es/',
  title: "Which Audio Is It? Whole Notes & Eighth Rests Rhythm Reading",
  description: "Free rhythm reading with whole notes, eighth rests and sixteenths: read two measures in 4/4 and pick which of four audios plays them as written.",
  h1: "Which Audio Is It? Rhythm Reading with Whole Notes and Eighth Rests",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Read a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong> with whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), eighth notes (UK: quavers), sixteenth notes (UK: semiquavers), eighth rest and eighth note, and their rests and listen to the <strong>four audios</strong>: only one sounds as written. Watch each eighth rest in the score: in the correct audio, that beat starts silent and the note arrives in the middle of the beat.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "redondas-sc" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and read the written rhythm. Play audios A to D (up to three times each, in any order), then press <em>This one</em> under your choice; only audios you have heard can be chosen. After you answer, a wrong choice is shown written out, with the beats that differ in red.</p>

<h2>How to Match Audio to Score with Whole Notes and Eighth Rests</h2>

<ol>
  <li><strong>Keep your foot moving.</strong> Off-beat notes only make sense against a steady pulse. Count the beats during the count-in measure, then keep tapping them: your foot goes down on the beat and up in the middle of it.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Listen for where each note falls in the beat.</strong> A note that starts on the beat and fills it is a quarter note; two notes make two eighths; four notes, four sixteenths; and a single note that arrives halfway through the beat, between two pulses, is an eighth rest followed by an eighth note. A note that keeps sounding into later beats is a longer value, and silence is a rest.</li>
  <li><strong>Rule out audios.</strong> Each audio plays both measures, and you get up to three listens to each. Compare one measure at a time, or drop the audios that clearly disagree with the score and spend your listens on the rest.</li>
</ol>

<p>The usual mistake is <strong>hearing the off-beat eighth note as if it fell on the beat</strong>: without the pulse in your head, a single note in a beat sounds like a quarter note. Tap the beat and say "(sh)-ti" for an eighth rest and eighth note, "ti-ti" for two eighths and "ta" for a quarter note: if the note lands with your foot, it is a quarter note; if it lands as your foot comes up, it is the eighth note after its rest.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and their rests</a>, all on the note G on the piano at a tempo between 60 and 72 quarter notes per minute, a little slower because of the sixteenth notes. The <strong>eighth rest and eighth note</strong> always fills one beat: the beat starts in silence and the note enters in its second half, off the beat. The other eighth notes come in pairs and the <strong>sixteenth notes in fours</strong>, each group filling a beat. Every dictation has at least <strong>one eighth rest followed by an eighth note</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so an eighth note after its rest is heard as a short note arriving in the middle of the beat, between two pulses. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the audios differ?</div><div class="tm-faq-a">The four audios share the same time signature and tempo. The wrong ones change one or two beats of the score, often an eighth rest and eighth note in place of two eighths or a quarter note: listen for whether the note falls on the beat or between two beats.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is an eighth rest?</div><div class="tm-faq-a">Half a beat, the same as an eighth note: an eighth rest and an eighth note together fill one beat, like a quarter note or two eighth notes.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks before each audio?</div><div class="tm-faq-a">A count-in at the same tempo as the audio, with a stronger click on the first beat. Count along with it and keep the pulse going silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After you answer you can play them as often as you like.</div></div>
</div>

<p>To go from sound to score, use <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-ritmo-suena/">which rhythm is playing?</a> and <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea/">the written dictation</a>, where you write the rhythm yourself. For an easier round of reading, try the same exercise with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-audio-es/">whole notes and sixteenth notes</a>.</p>
`,
});
