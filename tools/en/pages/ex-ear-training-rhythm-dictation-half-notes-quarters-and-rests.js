const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-quarters-and-rests/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios/',
  title: 'Rhythm Dictation: Half Notes, Quarter Notes and Rests',
  description: 'Free online rhythm dictation: hear two measures in 2/4, 3/4 or 4/4 and write them with half note, quarter note, half rest and quarter rest cards.',
  h1: 'Rhythm Dictation With Half Notes',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'completar-compas-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) on the note G4 and <strong>write it</strong> with the cards for <strong>half notes</strong> (UK: minims), <strong>quarter notes</strong> (UK: crotchets), <strong>half rests</strong> and <strong>quarter rests</strong>. You add the bar line and the final double bar line yourself, in <strong>2/4, 3/4 and 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "blancas" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the sound begins the cards are active: each one is written right after the previous one. <strong>You place the bar lines</strong>: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last card and <em>Clear all</em> starts over. When the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to take a rhythm dictation with half notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before the dictation, one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count along ("1, 2…") and keep counting silently through the whole dictation, even when nothing sounds.</li>
  <li><strong>Find the time signature and count its beats.</strong> It is announced before you listen: count "1, 2", "1, 2, 3" or "1, 2, 3, 4" from the metronome measure, and start again in every measure, even if the first beat is silent.</li>
  <li><strong>Listen to what happens on each beat.</strong> If a note starts and is still sounding on the next beat, it is a half note. If it sounds for one beat and stops as the next begins, it is a quarter note followed by a rest. If nothing sounds for two beats, it is a two-beat rest: one half rest or two quarter rests, which sound identical.</li>
  <li><strong>Split your listenings.</strong> Both measures play on every listen, but you do not need to catch everything at once: in the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<p>The easiest mix-up is a <strong>half note</strong> with a <strong>quarter note followed by a quarter rest</strong>. Both start the same way and take two beats. The difference is on the second beat: with the half note the sound continues, with the quarter note and rest it is cut off. Pay attention to the moment the sound stops, not only to when the note starts.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, half rests and quarter rests</a>, all on G4 played by a piano at a tempo between 72 and 90 quarter notes per minute. There is <strong>always at least one half note</strong>, which is what is new in this group. One <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a whole silent measure. Notes keep sounding almost to the end of their value, which is how you tell a half note (it lasts through two beats) from a quarter note (it is cut after the first).</p>

<p>Two-beat values follow the usual grouping of each meter. In 4/4, a half note or half rest starts on beat 1 or beat 3. In 3/4, a half note can start on beat 1 or 2, while a half rest only starts on beat 1 (two beats of rest on beats 2 and 3 are shown as two quarter rests). In 2/4, a half note fills the whole measure, and a half rest never appears because it would be a completely silent measure. When writing, one half rest and two quarter rests are worth the same and sound the same. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the note values, the bar line and the beats in each measure. If you miss, you are told which measure has too many or too few beats and, when the total length is right, whatever sounds different appears in red in what you wrote. Below it you see the rhythm that played, so you can hear it again while you read it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you add them yourself, and it is how you prove that you counted each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and it also tells you if a bar line is missing. Without the final double bar line nothing is checked: it is the sign that you are done.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What if I write two quarter rests where a half rest belongs?</div><div class="tm-faq-a">That is fine: they last the same and sound the same. The check counts what you hear, so two beats of silence can be written as a half rest or as two quarter rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell a half note from a quarter note followed by a rest?</div><div class="tm-faq-a">By when the sound stops. The half note is still sounding on the second beat, while the quarter note is cut at the end of the first one.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the metronome measure at the start used?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a click plays on every beat, louder on the first, at the same tempo as the dictation. Count along with it and keep counting silently while the rhythm plays, rests included.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/">Which rhythm is playing?</a>, where you choose among four written rhythms, or with <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-audio-es/">Which audio is it?</a>. The previous group is <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/">quarter notes and quarter rests</a> and the next one is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo/">dotted half notes</a>. Every group is listed in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythm dictation index</a>.</p>
`,
});
