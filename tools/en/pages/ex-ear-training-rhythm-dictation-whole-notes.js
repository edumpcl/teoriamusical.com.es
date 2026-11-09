const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas/',
  title: "Rhythmic Dictation with Whole Notes and Rests",
  description: "Free rhythmic dictation: hear two measures in 4/4 and write them with whole notes, dotted half notes and rests, bar lines included. Instant check.",
  h1: "Rhythmic Dictation with Whole Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","completar-compas-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and <strong>write it</strong> with cards for whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets) and their rests. You place the bar lines yourself: a bar line at the end of the first measure and a final double bar line.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "redondas" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the audio begins, the cards become active, and each card is written after the previous one. You place the <strong>bar lines</strong> yourself: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last item and <em>Clear all</em> starts over. Once the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to Write a Rhythmic Dictation with Whole Notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> One measure of metronome clicks plays first, at the dictation's tempo and with a stronger first beat. Count along ("1, 2…") and keep counting silently until the end, including the moments when nothing sounds.</li>
  <li><strong>Count the four beats of each measure.</strong> "1, 2, 3, 4" and start again. A whole note begins on 1 and is still sounding on 4.</li>
  <li><strong>Measure each note against the beats.</strong> A quarter note lasts one beat, a half note two, a dotted half note three and a whole note four. A whole note differs from a dotted half note in that it is still sounding on beat 4.</li>
  <li><strong>Listen in parts.</strong> Both measures play each time, but you do not have to catch everything at once: on the first listen follow the pulse and the first measure; on the second, the second measure; on the third, check the whole dictation.</li>
</ol>

<p>The hardest part is keeping the pulse during a long note or a whole measure of rest: if your inner pulse speeds up, the note seems shorter. Keep counting all four beats to the end, even when nothing happens.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> (a whole note lasts four beats and does not fit in 2/4 or 3/4) with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. There is always <strong>a whole note or a whole rest</strong>, and either one fills a measure. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. A whole rest can only be the second measure, because the first measure is never entirely silent. Up to four beats of rest can follow one another.</p>

<p>In the written rhythms, consecutive rests that fit into one are shown together; when you write the dictation, any combination that adds up to the same length is accepted, because it sounds the same. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the notes and rests, the bar line and the number of beats in each measure. If you miss, you are told which measure has too many or too few beats; if the total length is right, the parts that sound different are shown in red in what you wrote, and below it you see the rhythm that played so you can listen again while reading it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you place them yourself, and it is how you show that you counted the beats of each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and whether the bar line is missing. Without the final double bar line the exercise is not checked: it is your signal that you have finished.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can I write a measure of rest with smaller rests?</div><div class="tm-faq-a">Yes. One whole rest, two half rests or any combination adding up to four beats lasts the same and sounds the same, so all of them are accepted. In the written rhythms shown in the multiple-choice exercises, a whole measure of rest always appears as a whole rest.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks at the beginning for?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a metronome click sounds on every beat, stronger on the first, at the dictation's tempo. Count with it and keep counting silently while the rhythm plays, including the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-ritmo-suena/">which rhythm is playing?</a> or <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-audio-es/">which audio is it?</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation index</a>.</p>
`,
});
