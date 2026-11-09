const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-eighths/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas/',
  title: "Rhythmic Dictation: Whole Notes and Eighth Notes",
  description: "Free rhythmic dictation: hear two measures in 4/4 and write them with whole notes and eighth-note pairs, bar lines included. Instant check.",
  h1: "Rhythmic Dictation with Whole Notes and Eighth Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","completar-compas-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and <strong>write it</strong> with cards for whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), groups of two eighth notes (UK: quavers) and their rests. The eighth-note card is a <strong>single eighth note</strong>: for a pair, place two in a row and they are joined by a beam. You place the bar lines yourself: a bar line at the end of the first measure and a final double bar line.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "redondas-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, then <em>Listen</em>: the cards unlock when the audio starts. Add a bar line after the first measure and the final double bar line at the end, and count the beats yourself, because the exercise will not stop you from writing too many or too few. <em>Undo</em> removes the last card, <em>Clear all</em> starts over and <em>Check</em> grades your answer. You get up to three listens and can write while the rhythm plays.</p>

<h2>How to Write a Rhythmic Dictation with Whole Notes and Eighth Notes</h2>

<ol>
  <li><strong>Use the count-in measure.</strong> It tells you the tempo and where the strong beat falls. Say the beats with it, then keep the pulse going in your head (or tap your foot) through the whole dictation.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Listen inside each beat.</strong> One note that fills the whole beat is a quarter note; two notes that share it equally are two eighth notes. If a note keeps sounding into the following beats, it is a longer value, and if nothing sounds, it is a rest.</li>
  <li><strong>Listen in parts.</strong> Both measures play each time, but you do not have to catch everything at once: on the first listen follow the pulse and the first measure; on the second, the second measure; on the third, check the whole dictation.</li>
</ol>

<p>With eighth notes the usual mistake is <strong>rushing</strong>: two eighth notes followed by a quarter note can make the quarter note feel short. Two eighth notes last exactly as long as one quarter note. Say "ti-ti" for the eighths and "ta" for the quarter while you tap the beat, and the difference becomes clear.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, groups of two eighth notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. Eighth notes always come <strong>in pairs</strong>, joined by a beam and filling one beat: there is never a single eighth note, or three. Every dictation has at least <strong>one pair of eighth notes</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so two eighth notes are heard as two short notes splitting the beat into equal halves. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the notes and rests, the bar line and the number of beats in each measure. If you miss, you are told which measure has too many or too few beats; if the total length is right, the parts that sound different are shown in red in what you wrote, and below it you see the rhythm that played so you can listen again while reading it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you place them yourself, and it is how you show that you counted the beats of each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and whether the bar line is missing. Without the final double bar line the exercise is not checked: it is your signal that you have finished.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why is the eighth-note card a single eighth note?</div><div class="tm-faq-a">So that you build the group yourself: two eighth notes in a row that start on a beat are joined by a beam and fill that beat. If you place just one, it is shown with its flag and, when checked, that beat will not sound like the dictation, because here eighth notes always come in pairs.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks at the beginning for?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a metronome click sounds on every beat, stronger on the first, at the dictation's tempo. Count with it and keep counting silently while the rhythm plays, including the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-ritmo-suena/">which rhythm is playing?</a> or <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-audio-es/">which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas/">quarter notes and sixteenth notes</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation index</a>.</p>
`,
});
