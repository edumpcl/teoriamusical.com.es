const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-eighths/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas/',
  title: 'Rhythm Dictation With Eighth Notes and Quarter Notes',
  description: 'Free online rhythm dictation: hear two measures in 2/4, 3/4 or 4/4 and write them with quarter notes, eighth note pairs and quarter rests.',
  h1: 'Rhythm Dictation With Eighth Notes',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'completar-compas-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) on the note G4 and <strong>write it</strong> with the cards: quarter notes (UK: crotchets), pairs of eighth notes (UK: quavers) and quarter rests, in <strong>2/4, 3/4 or 4/4</strong>. The eighth-note card is <strong>a single eighth note</strong>: to make a pair, place two in a row and they join with a beam. You place the bar lines and the final double bar line yourself.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "negras-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the sound begins the cards are active: each one is written right after the previous one. <strong>You place the bar lines</strong>: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last card and <em>Clear all</em> starts over. When the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to take a rhythm dictation with eighth notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before the dictation, one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count along ("1, 2…") and keep counting silently through the whole dictation, even when nothing sounds.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Listen to what happens inside each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes that split it into halves are two eighth notes. If nothing sounds, it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play on every listen, but you do not need to catch everything at once: in the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<p>The most frequent mistake with eighth notes is <strong>rushing the pulse</strong>: a pair of eighth notes followed by a quarter note can make the quarter sound shorter than it is. A pair of eighth notes lasts exactly as long as one quarter note. Tap your foot on the beat and say "ti-ti" on the eighth notes and "ta" on the quarter note, and the difference becomes clear.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">quarter notes, pairs of eighth notes and quarter rests</a>, all on the note G4 at a piano tempo between 72 and 90 quarter notes per minute. <strong>Eighth notes always come in pairs</strong>, joined by a beam and filling one beat: never a single one and never three. Every dictation has at least <strong>one pair of eighth notes</strong> and some quarter rest. One <strong>measure of metronome clicks</strong> plays first, at the same tempo and with a stronger first beat. A dictation may begin with a rest, but never has more than two beats of rest in a row or a completely silent measure.</p>

<p>Every note sounds for almost its full length, so a pair of eighth notes is heard as two short notes that divide the beat into two equal halves. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the note values, the bar line and the beats in each measure. If you miss, you are told which measure has too many or too few beats and, when the total length is right, whatever sounds different appears in red in what you wrote. Below it you see the rhythm that played, so you can hear it again while you read it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you add them yourself, and it is how you prove that you counted each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and it also tells you if a bar line is missing. Without the final double bar line nothing is checked: it is the sign that you are done.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why is the card a single eighth note?</div><div class="tm-faq-a">So that you build the pair yourself: two eighth notes in a row that start on a beat are joined by a beam and fill that beat. If you place only one, it shows with its flag, and when you check, that beat will not sound like the dictation, because here eighth notes always come in pairs.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the metronome measure at the start used?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a click plays on every beat, louder on the first, at the same tempo as the dictation. Count along with it and keep counting silently while the rhythm plays, rests included.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-ritmo-suena/">Which rhythm is playing?</a> or with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-audio-es/">Which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas/">half notes with eighth notes</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythm dictation index</a>.</p>
`,
});
