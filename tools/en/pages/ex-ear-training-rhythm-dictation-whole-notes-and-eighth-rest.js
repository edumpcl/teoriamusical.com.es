const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-eighth-rest/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea/',
  title: "Rhythmic Dictation: Whole Notes and Eighth Rests",
  description: "Free rhythmic dictation: hear two measures in 4/4 and write them with whole notes, eighth rests and sixteenths, bar lines included. Instant check.",
  h1: "Rhythmic Dictation with Whole Notes and Eighth Rests",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","completar-compas-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and <strong>write it</strong> with cards for whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), eighth notes (UK: quavers), sixteenth notes (UK: semiquavers), eighth rest and eighth note, and their rests. There is a card for the <strong>eighth rest</strong>, and cards for a <strong>single eighth note</strong> and a <strong>single sixteenth note</strong>: for an off-beat, place the rest and then the eighth note; for a group, place two eighths or four sixteenths in a row and they are joined by beams. You place the bar lines yourself: a bar line at the end of the first measure and a final double bar line.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "redondas-sc" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, then <em>Listen</em>: the cards unlock when the audio starts. Add a bar line after the first measure and the final double bar line at the end, and count the beats yourself, because the exercise will not stop you from writing too many or too few. <em>Undo</em> removes the last card, <em>Clear all</em> starts over and <em>Check</em> grades your answer. You get up to three listens and can write while the rhythm plays.</p>

<h2>How to Write a Rhythmic Dictation with Whole Notes and Eighth Rests</h2>

<ol>
  <li><strong>Keep your foot moving.</strong> Off-beat notes only make sense against a steady pulse. Count the beats during the count-in measure, then keep tapping them: your foot goes down on the beat and up in the middle of it.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Listen for where each note falls in the beat.</strong> A note that starts on the beat and fills it is a quarter note; two notes make two eighths; four notes, four sixteenths; and a single note that arrives halfway through the beat, between two pulses, is an eighth rest followed by an eighth note. A note that keeps sounding into later beats is a longer value, and silence is a rest.</li>
  <li><strong>Listen in parts.</strong> Both measures play each time, but you do not have to catch everything at once: on the first listen follow the pulse and the first measure; on the second, the second measure; on the third, check the whole dictation.</li>
</ol>

<p>The usual mistake is <strong>hearing the off-beat eighth note as if it fell on the beat</strong>: without the pulse in your head, a single note in a beat sounds like a quarter note. Tap the beat and say "(sh)-ti" for an eighth rest and eighth note, "ti-ti" for two eighths and "ta" for a quarter note: if the note lands with your foot, it is a quarter note; if it lands as your foot comes up, it is the eighth note after its rest.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, eighth rest and eighth note, and their rests</a>, all on the note G on the piano at a tempo between 60 and 72 quarter notes per minute, a little slower because of the sixteenth notes. The <strong>eighth rest and eighth note</strong> always fills one beat: the beat starts in silence and the note enters in its second half, off the beat. The other eighth notes come in pairs and the <strong>sixteenth notes in fours</strong>, each group filling a beat. Every dictation has at least <strong>one eighth rest followed by an eighth note</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so an eighth note after its rest is heard as a short note arriving in the middle of the beat, between two pulses. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the notes and rests, the bar line and the number of beats in each measure. If you miss, you are told which measure has too many or too few beats; if the total length is right, the parts that sound different are shown in red in what you wrote, and below it you see the rhythm that played so you can listen again while reading it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you place them yourself, and it is how you show that you counted the beats of each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and whether the bar line is missing. Without the final double bar line the exercise is not checked: it is your signal that you have finished.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I write an off-beat eighth note?</div><div class="tm-faq-a">Place the eighth rest card first and then a single eighth note: together they fill one beat, with the note falling in the middle of it. A lone eighth note without its rest, or an eighth rest in another place, will not match what played.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the measure of clicks at the beginning for?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a metronome click sounds on every beat, stronger on the first, at the dictation's tempo. Count with it and keep counting silently while the rhythm plays, including the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-ritmo-suena/">which rhythm is playing?</a> or <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-audio-es/">which audio is it?</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation index</a>.</p>
`,
});
