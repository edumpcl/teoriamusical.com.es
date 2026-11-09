const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-que-audio-es/',
  title: "Which Audio Is It? Whole Notes Rhythm Reading",
  description: "Free rhythm reading with whole notes, dotted half notes and rests: read two measures in 4/4 and pick which of four audios plays them as written.",
  h1: "Which Audio Is It? Rhythm Reading with Whole Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Read a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong> with whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets) and their rests and listen to the <strong>four audios</strong>: only one sounds as written. Watch the whole note: in the correct audio it keeps sounding for all four beats of the measure.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "redondas" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. When you answer, the right one is marked and, if you were wrong, you see written what your choice actually played, with the different beats in red.</p>

<h2>How to Match Audio to Score with Whole Notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> One measure of metronome clicks plays first, at the dictation's tempo and with a stronger first beat. Count along ("1, 2…") and keep counting silently until the end, including the moments when nothing sounds.</li>
  <li><strong>Count the four beats of each measure.</strong> "1, 2, 3, 4" and start again. A whole note begins on 1 and is still sounding on 4.</li>
  <li><strong>Measure each note against the beats.</strong> A quarter note lasts one beat, a half note two, a dotted half note three and a whole note four. A whole note differs from a dotted half note in that it is still sounding on beat 4.</li>
  <li><strong>Rule out audios.</strong> Each audio plays both measures, and you get up to three listens to each. Compare one measure at a time, or drop the audios that clearly disagree with the score and spend your listens on the rest.</li>
</ol>

<p>The hardest part is keeping the pulse during a long note or a whole measure of rest: if your inner pulse speeds up, the note seems shorter. Keep counting all four beats to the end, even when nothing happens.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> (a whole note lasts four beats and does not fit in 2/4 or 3/4) with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. There is always <strong>a whole note or a whole rest</strong>, and either one fills a measure. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. A whole rest can only be the second measure, because the first measure is never entirely silent. Up to four beats of rest can follow one another.</p>

<p>In the written rhythms, consecutive rests that fit into one are shown together; when you write the dictation, any combination that adds up to the same length is accepted, because it sounds the same. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the audios differ?</div><div class="tm-faq-a">The four audios share the same time signature and tempo. The wrong ones change one or two beats of the score, often a whole note in place of a dotted half note and a rest, or the other way around.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is a whole note?</div><div class="tm-faq-a">Four beats in 4/4: the whole measure. It is the longest note value in common use.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks before each audio?</div><div class="tm-faq-a">A count-in at the same tempo as the audio, with a stronger click on the first beat. Count along with it and keep the pulse going silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After you answer you can play them as often as you like.</div></div>
</div>

<p>To go from sound to score, use <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-ritmo-suena/">which rhythm is playing?</a> and <a href="/ejercicios/auditivos/dictado-ritmico/redondas/">the written dictation</a>, where you write the rhythm yourself. For an easier round of reading, try the same exercise with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-audio-es/">dotted half notes</a>.</p>
`,
});
