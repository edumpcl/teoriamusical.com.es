const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/dotted-half-notes-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-ritmo-suena/',
  title: "Which Rhythm Is Playing? Dotted Half Notes Dictation",
  description: "Free rhythmic dictation with dotted half notes and rests: hear two measures in 3/4 or 4/4 and pick the matching one of four written rhythms.",
  h1: "Which Rhythm Is Playing? Dictation with Dotted Half Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>3/4 or 4/4</strong>, played on the note G, and choose which of the <strong>four written rhythms</strong> you heard. Now there are three-beat values: the <strong>dotted half note</strong> and the <strong>dotted half rest</strong>. The rhythms use dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets) and their rests. The key is to count how long each note lasts.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "puntillo" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. You can already choose a rhythm (A, B, C or D) while it plays. When you answer, the right one turns green and, if you were wrong, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats, for example a dotted half note in place of a half note and a rest. You can listen up to three times.</p>

<h2>How to Pick the Right Rhythm with Dotted Half Notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> One measure of metronome clicks plays first, at the dictation's tempo and with a stronger first beat. Count along ("1, 2…") and keep counting silently until the end, including the moments when nothing sounds.</li>
  <li><strong>Count the beats of each measure.</strong> The time signature is announced before you listen: "1, 2, 3" in 3/4 or "1, 2, 3, 4" in 4/4. Start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Measure each note against the beats.</strong> A quarter note lasts one beat, a half note two and a dotted half note three. A dotted half note is not the same as a half note followed by a quarter rest: it is still sounding on the third beat.</li>
  <li><strong>Use your three listens.</strong> Both measures play each time. Take the pulse and measure 1 on the first listen, measure 2 on the second, and on the third compare the whole rhythm with the four written options. You can answer while it plays.</li>
</ol>

<p>The most common mix-up is a <strong>dotted half note</strong> with a <strong>half note followed by a quarter rest</strong>: both take three beats, but the dotted half note is still sounding on the third beat. During a dotted half rest you must count three silent beats; if your inner pulse rushes, the next note seems to arrive early.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 3/4 or 4/4</strong> (a dotted half note lasts three beats and does not fit in a measure of 2/4) with <a href="/diccionario-musical/figuras-musicales/">dotted half notes, half notes, quarter notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. There is always <strong>a three-beat figure</strong>: a dotted half note or its rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. Up to three beats of rest can follow one another, the length of a dotted half rest.</p>

<p>Where the three-beat figures go: in 3/4 a dotted half note fills the whole measure (a dotted half rest can only be the second measure, because the first is never entirely silent); in 4/4 it starts on beat 1 or beat 2. In the written rhythms, consecutive rests that fit into one are shown together: two beats on beat 1 (or beat 3 in 4/4) as a half rest, three beats as a dotted half rest. When you write the dictation, any combination that adds up to the same length is accepted, because it sounds the same. Each test has 10 dictations: 5 in 3/4 and 5 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell a dotted half note from a half note?</div><div class="tm-faq-a">By how long it lasts: a dotted half note sounds for three beats and a half note for two. If the note is still sounding on the third beat, it is a dotted half note; if it stops, it is a half note followed by a rest or by another note.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there no dictations in 2/4?</div><div class="tm-faq-a">Because a dotted half note lasts three beats and does not fit in a measure of two beats. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you can answer while it plays. After you answer you can listen again as often as you like.</div></div>
</div>

<p>Once you get most of them right, try <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo/">writing the dictation with dotted half notes</a>. If counting the durations is hard, go back to <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/">half notes, quarter notes and rests</a>.</p>
`,
});
