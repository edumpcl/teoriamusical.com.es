const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-sixteenths-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-audio-es/',
  title: "Which Audio Is It? Whole Notes & Sixteenths Rhythm Reading",
  description: "Free rhythm reading with whole notes, eighths and sixteenths: read two measures in 4/4 and pick which of four audios plays them as written.",
  h1: "Which Audio Is It? Rhythm Reading with Whole Notes and Sixteenth Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Read a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong> with whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), groups of eighth notes (UK: quavers) and of sixteenth notes (UK: semiquavers) and their rests and listen to the <strong>four audios</strong>: only one sounds as written. Watch each group of sixteenth notes: in the correct audio, that beat contains four quick notes.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "redondas-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. When you answer, the right one is marked and, if you were wrong, you see written what your choice actually played, with the different beats in red.</p>

<h2>How to Match Audio to Score with Whole Notes and Sixteenth Notes</h2>

<ol>
  <li><strong>Settle the pulse first.</strong> Sixteenth notes are fast, so take the count-in measure seriously: feel the beats ("1, 2, 3, 4") and keep tapping your foot. Everything you hear is placed against that steady beat.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Count the notes in each beat.</strong> One note is a quarter note, two are eighth notes and four are sixteenth notes. If a note keeps sounding into the following beats, it is a longer value, and if nothing sounds, it is a rest.</li>
  <li><strong>Rule out audios.</strong> Each audio plays both measures, and you get up to three listens to each. Compare one measure at a time, or drop the audios that clearly disagree with the score and spend your listens on the rest.</li>
</ol>

<p>The usual mistakes are <strong>mixing up eighth notes and sixteenth notes</strong> and rushing through the sixteenths, so that the next beat seems to arrive early. Four sixteenth notes last as long as two eighth notes or one quarter note. Say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for a quarter note while you tap the beat, and every syllable lands where it should.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, groups of eighth notes and of sixteenth notes and their rests</a>, all on the note G on the piano at a tempo between 60 and 72 quarter notes per minute, a little slower because of the sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: there is never a loose one. Every dictation has at least <strong>one group of four sixteenth notes</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so four sixteenth notes are heard as four very short notes splitting the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the audios differ?</div><div class="tm-faq-a">The four audios share the same time signature and tempo. The wrong ones change one or two beats of the score, often four sixteenth notes in place of two eighths, or the reverse: count how many notes fall in each beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is a sixteenth note?</div><div class="tm-faq-a">A quarter of a beat when the beat is a quarter note: four sixteenth notes last as long as one quarter note, and two of them as long as one eighth note. Here they always come in groups of four.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks before each audio?</div><div class="tm-faq-a">A count-in at the same tempo as the audio, with a stronger click on the first beat. Count along with it and keep the pulse going silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After you answer you can play them as often as you like.</div></div>
</div>

<p>To go from sound to score, use <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-ritmo-suena/">which rhythm is playing?</a> and <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas/">the written dictation</a>, where you write the rhythm yourself. For an easier round of reading, try the same exercise with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-audio-es/">whole notes and eighth notes</a>.</p>
`,
});
