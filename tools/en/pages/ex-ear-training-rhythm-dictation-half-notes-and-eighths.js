const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-eighths/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas/',
  title: 'Rhythm Dictation: Half Notes and Eighth Notes',
  description: 'Free online rhythm dictation: hear two measures in 2/4, 3/4 or 4/4 and write them with half notes, quarter notes, eighth note pairs and rests.',
  h1: 'Rhythm Dictation With Half Notes and Eighth Notes',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'completar-compas-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) on the note G4 and <strong>write it</strong> with the cards: half notes (UK: minims), quarter notes (UK: crotchets), pairs of eighth notes (UK: quavers) and their rests, in <strong>2/4, 3/4 or 4/4</strong>. The eighth-note card is <strong>one single eighth note</strong>: for a pair, place two in a row and a beam joins them. The bar lines and the final double bar line are yours to place.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "blancas-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the sound begins the cards are active: each one is written right after the previous one. <strong>You place the bar lines</strong>: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last card and <em>Clear all</em> starts over. When the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to take a rhythm dictation with half notes and eighth notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before the dictation, one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count along ("1, 2…") and keep counting silently through the whole dictation, even when nothing sounds.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Begin again at 1 in each measure, even when the first beat is silent.</li>
  <li><strong>Listen to what happens inside each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes that share it in halves are two eighth notes. If the note is still sounding on the following beats, it is a longer value (a half note), and if nothing sounds, it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play on every listen, but you do not need to catch everything at once: in the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<p>Eighth notes tempt you to <strong>speed up the pulse</strong>: a pair of eighth notes followed by a quarter note can make the quarter seem shorter. Two eighth notes last exactly as long as one quarter note. Say "ti-ti" for the eighths and "ta" for the quarter while your foot keeps the beat, and the difference shows right away.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, pairs of eighth notes and their rests</a>, all on G4 played by a piano at 72 to 90 quarter notes per minute. <strong>Eighth notes always come in pairs</strong>, joined by a beam and filling one beat: in this group there is never a single eighth note or three (a lone eighth note appears only in the groups with an eighth rest). There is always at least <strong>one pair of eighth notes</strong> plus a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first, at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests sit where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 a half note starts on beat 1 or 2 and a half rest on beat 1; in 2/4 a half note fills the measure (and a half rest never appears, since it would leave the measure completely silent).</p>

<p>Each note sounds for nearly its whole value, so two eighth notes are heard as two short notes dividing the beat into equal halves. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the note values, the bar line and the beats in each measure. If you miss, you are told which measure has too many or too few beats and, when the total length is right, whatever sounds different appears in red in what you wrote. Below it you see the rhythm that played, so you can hear it again while you read it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you add them yourself, and it is how you prove that you counted each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and it also tells you if a bar line is missing. Without the final double bar line nothing is checked: it is the sign that you are done.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why is the card a single eighth note?</div><div class="tm-faq-a">So that you build the group yourself. Two eighth notes in a row that start on a beat are beamed together and fill the beat. With a single one, you see its flag, and the check will mark that beat as different from the dictation, since eighth notes here always come in pairs.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the metronome measure at the start used?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a click plays on every beat, louder on the first, at the same tempo as the dictation. Count along with it and keep counting silently while the rhythm plays, rests included.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-ritmo-suena/">Which rhythm is playing?</a> or with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-audio-es/">Which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas/">dotted half notes and eighth notes</a>. All the groups are in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythm dictation index</a>.</p>
`,
});
