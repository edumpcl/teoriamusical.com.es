const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/dotted-half-notes-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-audio-es/',
  title: "Which Audio Is It? Dotted Half Notes Rhythm Reading",
  description: "Free rhythm reading with dotted half notes and rests: read two measures in 3/4 or 4/4 and pick which of four audios plays them as written.",
  h1: "Which Audio Is It? Rhythm Reading with Dotted Half Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Read a rhythm of <strong>two measures</strong> (UK: bars) in <strong>3/4 or 4/4</strong> with dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets) and their rests and listen to the <strong>four audios</strong>: only one sounds as written. Watch every three-beat figure: a dotted half note sounds for three beats in a row, and its rest is three beats of silence.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "puntillo" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. When you answer, the right one is marked and, if you were wrong, you see written what your choice actually played, with the different beats in red.</p>

<h2>How to Match Audio to Score with Dotted Half Notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> One measure of metronome clicks plays first, at the dictation's tempo and with a stronger first beat. Count along ("1, 2…") and keep counting silently until the end, including the moments when nothing sounds.</li>
  <li><strong>Count the beats of each measure.</strong> The time signature is announced before you listen: "1, 2, 3" in 3/4 or "1, 2, 3, 4" in 4/4. Start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Measure each note against the beats.</strong> A quarter note lasts one beat, a half note two and a dotted half note three. A dotted half note is not the same as a half note followed by a quarter rest: it is still sounding on the third beat.</li>
  <li><strong>Rule out audios.</strong> Each audio plays both measures, and you get up to three listens to each. Compare one measure at a time, or drop the audios that clearly disagree with the score and spend your listens on the rest.</li>
</ol>

<p>The most common mix-up is a <strong>dotted half note</strong> with a <strong>half note followed by a quarter rest</strong>: both take three beats, but the dotted half note is still sounding on the third beat. During a dotted half rest you must count three silent beats; if your inner pulse rushes, the next note seems to arrive early.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 3/4 or 4/4</strong> (a dotted half note lasts three beats and does not fit in a measure of 2/4) with <a href="/diccionario-musical/figuras-musicales/">dotted half notes, half notes, quarter notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. There is always <strong>a three-beat figure</strong>: a dotted half note or its rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. Up to three beats of rest can follow one another, the length of a dotted half rest.</p>

<p>Where the three-beat figures go: in 3/4 a dotted half note fills the whole measure (a dotted half rest can only be the second measure, because the first is never entirely silent); in 4/4 it starts on beat 1 or beat 2. In the written rhythms, consecutive rests that fit into one are shown together: two beats on beat 1 (or beat 3 in 4/4) as a half rest, three beats as a dotted half rest. When you write the dictation, any combination that adds up to the same length is accepted, because it sounds the same. Each test has 10 dictations: 5 in 3/4 and 5 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the audios differ?</div><div class="tm-faq-a">The four audios share the same time signature and tempo. The wrong ones change one or two beats of the score, often a dotted half note in place of a half note and a rest, or the other way around.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is a dotted half note?</div><div class="tm-faq-a">Three beats in 3/4 and 4/4: the two beats of a half note plus one more from the dot, which adds half of the note's value.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks before each audio?</div><div class="tm-faq-a">A count-in at the same tempo as the audio, with a stronger click on the first beat. Count along with it and keep the pulse going silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After you answer you can play them as often as you like.</div></div>
</div>

<p>To go from sound to score, use <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-ritmo-suena/">which rhythm is playing?</a> and <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo/">the written dictation</a>, where you write the rhythm yourself. For an easier round of reading, try the same exercise with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-audio-es/">half notes, quarter notes and rests</a>.</p>
`,
});
