const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-eighths-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-audio-es/',
  title: "Which Audio Is It? Whole & Eighth Notes Rhythm Reading",
  description: "Free rhythm reading with whole notes and eighth-note pairs: read two measures in 4/4 and pick which of four audios plays them as written.",
  h1: "Which Audio Is It? Rhythm Reading with Whole Notes and Eighth Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Read a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong> with whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), groups of two eighth notes (UK: quavers) and their rests and listen to the <strong>four audios</strong>: only one sounds as written. Watch each pair of eighth notes in the score: in the correct audio, that beat contains two notes.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "redondas-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and read the written rhythm. Play audios A to D (up to three times each, in any order), then press <em>This one</em> under your choice; only audios you have heard can be chosen. After you answer, a wrong choice is shown written out, with the beats that differ in red.</p>

<h2>How to Match Audio to Score with Whole Notes and Eighth Notes</h2>

<ol>
  <li><strong>Use the count-in measure.</strong> It tells you the tempo and where the strong beat falls. Say the beats with it, then keep the pulse going in your head (or tap your foot) through the whole dictation.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Listen inside each beat.</strong> One note that fills the whole beat is a quarter note; two notes that share it equally are two eighth notes. If a note keeps sounding into the following beats, it is a longer value, and if nothing sounds, it is a rest.</li>
  <li><strong>Rule out audios.</strong> Each audio plays both measures, and you get up to three listens to each. Compare one measure at a time, or drop the audios that clearly disagree with the score and spend your listens on the rest.</li>
</ol>

<p>With eighth notes the usual mistake is <strong>rushing</strong>: two eighth notes followed by a quarter note can make the quarter note feel short. Two eighth notes last exactly as long as one quarter note. Say "ti-ti" for the eighths and "ta" for the quarter while you tap the beat, and the difference becomes clear.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, groups of two eighth notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. Eighth notes always come <strong>in pairs</strong>, joined by a beam and filling one beat: in this group there is never a single eighth note, or three (a lone eighth note appears only in the groups with an eighth rest). Every dictation has at least <strong>one pair of eighth notes</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so two eighth notes are heard as two short notes splitting the beat into equal halves. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the audios differ?</div><div class="tm-faq-a">The four audios share the same time signature and tempo. The wrong ones change one or two beats of the score, often two eighth notes in place of a quarter note, or the reverse: count how many notes fall in each beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is an eighth note?</div><div class="tm-faq-a">Half a beat when the beat is a quarter note: two eighth notes last as long as one quarter note. That is why they always come in pairs here, filling one beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks before each audio?</div><div class="tm-faq-a">A count-in at the same tempo as the audio, with a stronger click on the first beat. Count along with it and keep the pulse going silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After you answer you can play them as often as you like.</div></div>
</div>

<p>To go from sound to score, use <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-ritmo-suena/">which rhythm is playing?</a> and <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas/">the written dictation</a>, where you write the rhythm yourself. For an easier round of reading, try the same exercise with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-audio-es/">whole notes</a>.</p>
`,
});
