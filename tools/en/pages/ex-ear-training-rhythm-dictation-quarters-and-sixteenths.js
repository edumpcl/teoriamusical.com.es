const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-sixteenths/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas/',
  title: 'Rhythm Dictation With Sixteenth Notes and Quarters',
  description: 'Free online rhythm dictation: hear two measures in 2/4, 3/4 or 4/4 and write them with quarter notes, eighth and sixteenth note groups and rests.',
  h1: 'Rhythm Dictation With Sixteenth Notes',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'completar-compas-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) on the note G4 and <strong>write it</strong> with the cards: quarter notes (UK: crotchets), groups of eighth notes (UK: quavers) and sixteenth notes (UK: semiquavers), and quarter rests, in <strong>2/4, 3/4 or 4/4</strong>. The eighth-note and sixteenth-note cards are <strong>single notes</strong>: to make a group, place them one after another and a beam joins them. You place the bar lines and the final double bar line yourself.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "negras-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the sound begins the cards are active: each one is written right after the previous one. <strong>You place the bar lines</strong>: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last card and <em>Clear all</em> starts over. When the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to take a rhythm dictation with sixteenth notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before the dictation, one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count along ("1, 2…") and keep counting silently through the whole dictation, even when nothing sounds.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in each measure, even if the first beat does not sound.</li>
  <li><strong>Count the notes in each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes are two eighth notes. Four notes are four sixteenth notes. If the note keeps sounding on the following beats it is a longer value, and if nothing sounds it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play on every listen, but you do not need to catch everything at once: in the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<p>The most common error is <strong>mixing up eighth notes and sixteenth notes</strong>, or rushing the sixteenths and reaching the next beat early. Four sixteenth notes last as long as two eighth notes or one quarter note. Keep your foot on the beat and say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for the quarter: each syllable lands where it should.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">quarter notes, groups of eighth notes and sixteenth notes, and quarter rests</a>, all on G4 played by a piano at a tempo between 60 and 72 quarter notes per minute, a little slower than in the groups without sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: there is never a loose one. Every dictation has at least <strong>one group of four sixteenth notes</strong> and some quarter rest. A <strong>measure of metronome clicks</strong> plays first, at the same tempo and with a stronger first beat. A dictation may start with a rest, but it never has more than two beats of rest in a row or a completely silent measure.</p>

<p>Each note sounds for nearly its full length, so four sixteenth notes are heard as four very short notes dividing the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the note values, the bar line and the beats in each measure. If you miss, you are told which measure has too many or too few beats and, when the total length is right, whatever sounds different appears in red in what you wrote. Below it you see the rhythm that played, so you can hear it again while you read it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you add them yourself, and it is how you prove that you counted each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and it also tells you if a bar line is missing. Without the final double bar line nothing is checked: it is the sign that you are done.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why is the card a single sixteenth note?</div><div class="tm-faq-a">So that you build the group. Four sixteenth notes in a row that start on a beat are joined by a double beam and fill the beat (two eighth notes use a single beam). If you place fewer, they show up as loose notes, and when you check, that beat will not sound like the dictation, because sixteenth notes here always come in fours.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the metronome measure at the start used?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a click plays on every beat, louder on the first, at the same tempo as the dictation. Count along with it and keep counting silently while the rhythm plays, rests included.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-ritmo-suena/">Which rhythm is playing?</a> or with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-audio-es/">Which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas/">half notes with sixteenth notes</a>. All the groups are in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythm dictation index</a>.</p>
`,
});
