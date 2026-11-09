const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-sixteenths/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas/',
  title: "Rhythmic Dictation: Whole Notes and Sixteenth Notes",
  description: "Free rhythmic dictation: hear two measures in 4/4 and write them with whole notes, eighths and sixteenths, bar lines included. Instant check.",
  h1: "Rhythmic Dictation with Whole Notes and Sixteenth Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","completar-compas-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and <strong>write it</strong> with cards for whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), groups of eighth notes (UK: quavers) and of sixteenth notes (UK: semiquavers) and their rests. The eighth-note and sixteenth-note cards are <strong>single notes</strong>: for a group, place them in a row and they are joined by beams. You place the bar lines yourself: a bar line at the end of the first measure and a final double bar line.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "redondas-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the audio begins, the cards become active, and each card is written after the previous one. You place the <strong>bar lines</strong> yourself: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last item and <em>Clear all</em> starts over. Once the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to Write a Rhythmic Dictation with Whole Notes and Sixteenth Notes</h2>

<ol>
  <li><strong>Settle the pulse first.</strong> Sixteenth notes are fast, so take the count-in measure seriously: feel the beats ("1, 2, 3, 4") and keep tapping your foot. Everything you hear is placed against that steady beat.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Count the notes in each beat.</strong> One note is a quarter note, two are eighth notes and four are sixteenth notes. If a note keeps sounding into the following beats, it is a longer value, and if nothing sounds, it is a rest.</li>
  <li><strong>Listen in parts.</strong> Both measures play each time, but you do not have to catch everything at once: on the first listen follow the pulse and the first measure; on the second, the second measure; on the third, check the whole dictation.</li>
</ol>

<p>The usual mistakes are <strong>mixing up eighth notes and sixteenth notes</strong> and rushing through the sixteenths, so that the next beat seems to arrive early. Four sixteenth notes last as long as two eighth notes or one quarter note. Say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for a quarter note while you tap the beat, and every syllable lands where it should.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, groups of eighth notes and of sixteenth notes and their rests</a>, all on the note G on the piano at a tempo between 60 and 72 quarter notes per minute, a little slower because of the sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: there is never a loose one. Every dictation has at least <strong>one group of four sixteenth notes</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so four sixteenth notes are heard as four very short notes splitting the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the notes and rests, the bar line and the number of beats in each measure. If you miss, you are told which measure has too many or too few beats; if the total length is right, the parts that sound different are shown in red in what you wrote, and below it you see the rhythm that played so you can listen again while reading it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you place them yourself, and it is how you show that you counted the beats of each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and whether the bar line is missing. Without the final double bar line the exercise is not checked: it is your signal that you have finished.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are the cards single sixteenth notes?</div><div class="tm-faq-a">So that you build the group yourself: four sixteenth notes in a row that start on a beat are joined by a double beam and fill that beat (two eighth notes, by a single beam). If you place fewer, they are shown loose and, when checked, that beat will not sound like the dictation, because here sixteenth notes always come in fours.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks at the beginning for?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a metronome click sounds on every beat, stronger on the first, at the dictation's tempo. Count with it and keep counting silently while the rhythm plays, including the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-ritmo-suena/">which rhythm is playing?</a> or <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-audio-es/">which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea/">quarter notes, eighth notes and the eighth rest</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation index</a>.</p>
`,
});
