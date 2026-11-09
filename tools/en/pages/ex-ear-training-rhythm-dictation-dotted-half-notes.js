const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/dotted-half-notes/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo/',
  title: "Rhythmic Dictation with Dotted Half Notes",
  description: "Free rhythmic dictation: hear two measures in 3/4 or 4/4 and write them with dotted half notes and rests, bar lines included. Instant check.",
  h1: "Rhythmic Dictation with Dotted Half Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","completar-compas-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>3/4 or 4/4</strong>, played on the note G, and <strong>write it</strong> with cards for dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets) and their rests. You place the bar lines yourself: a bar line at the end of the first measure and a final double bar line.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "puntillo" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the audio begins, the cards become active, and each card is written after the previous one. You place the <strong>bar lines</strong> yourself: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last item and <em>Clear all</em> starts over. Once the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to Write a Rhythmic Dictation with Dotted Half Notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> One measure of metronome clicks plays first, at the dictation's tempo and with a stronger first beat. Count along ("1, 2…") and keep counting silently until the end, including the moments when nothing sounds.</li>
  <li><strong>Count the beats of each measure.</strong> The time signature is announced before you listen: "1, 2, 3" in 3/4 or "1, 2, 3, 4" in 4/4. Start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Measure each note against the beats.</strong> A quarter note lasts one beat, a half note two and a dotted half note three. A dotted half note is not the same as a half note followed by a quarter rest: it is still sounding on the third beat.</li>
  <li><strong>Listen in parts.</strong> Both measures play each time, but you do not have to catch everything at once: on the first listen follow the pulse and the first measure; on the second, the second measure; on the third, check the whole dictation.</li>
</ol>

<p>The most common mix-up is a <strong>dotted half note</strong> with a <strong>half note followed by a quarter rest</strong>: both take three beats, but the dotted half note is still sounding on the third beat. During a dotted half rest you must count three silent beats; if your inner pulse rushes, the next note seems to arrive early.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 3/4 or 4/4</strong> (a dotted half note lasts three beats and does not fit in a measure of 2/4) with <a href="/diccionario-musical/figuras-musicales/">dotted half notes, half notes, quarter notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. There is always <strong>a three-beat figure</strong>: a dotted half note or its rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. Up to three beats of rest can follow one another, the length of a dotted half rest.</p>

<p>Where the three-beat figures go: in 3/4 a dotted half note fills the whole measure (a dotted half rest can only be the second measure, because the first is never entirely silent); in 4/4 it starts on beat 1 or beat 2. In the written rhythms, consecutive rests that fit into one are shown together: two beats on beat 1 (or beat 3 in 4/4) as a half rest, three beats as a dotted half rest. When you write the dictation, any combination that adds up to the same length is accepted, because it sounds the same. Each test has 10 dictations: 5 in 3/4 and 5 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the notes and rests, the bar line and the number of beats in each measure. If you miss, you are told which measure has too many or too few beats; if the total length is right, the parts that sound different are shown in red in what you wrote, and below it you see the rhythm that played so you can listen again while reading it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you place them yourself, and it is how you show that you counted the beats of each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and whether the bar line is missing. Without the final double bar line the exercise is not checked: it is your signal that you have finished.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can I write a measure of rest with smaller rests?</div><div class="tm-faq-a">Yes. A dotted half rest, or a half rest plus a quarter rest, lasts three beats and sounds the same, so any combination that adds up to the same length is accepted.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks at the beginning for?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a metronome click sounds on every beat, stronger on the first, at the dictation's tempo. Count with it and keep counting silently while the rhythm plays, including the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there no dictations in 2/4?</div><div class="tm-faq-a">Because a dotted half note lasts three beats and does not fit in a measure of two beats. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-ritmo-suena/">which rhythm is playing?</a> or <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-audio-es/">which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/redondas/">whole notes</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation index</a>.</p>
`,
});
