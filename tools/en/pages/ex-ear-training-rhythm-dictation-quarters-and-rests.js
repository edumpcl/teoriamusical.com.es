const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-rests/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/',
  title: 'Rhythm Dictation: Quarter Notes and Quarter Rests',
  description: 'Free online rhythm dictation: hear a two-measure rhythm in 2/4, 3/4 or 4/4 and write it with quarter note and quarter rest cards. Beat-by-beat feedback.',
  h1: 'Rhythm Dictation With Quarter Notes and Rests',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'completar-compas-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) played on the note G4 and <strong>write it down</strong> with the cards for <strong>quarter notes</strong> (UK: crotchets) and <strong>quarter rests</strong>. You place the <strong>bar line</strong> and the <strong>final double bar line</strong> yourself, in <strong>2/4, 3/4 and 4/4</strong>. This is rhythm dictation in its plainest form: no options to pick from, only what you hear.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "negras" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the sound begins the cards are active: each one is written right after the previous one. <strong>You place the bar lines</strong>: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last card and <em>Clear all</em> starts over. When the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to take a rhythm dictation</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before the dictation, one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count along ("1, 2…") and keep counting silently through the whole dictation, even when nothing sounds.</li>
  <li><strong>Count the beats of each measure.</strong> Say "1, 2" in 2/4, "1, 2, 3" in 3/4 or "1, 2, 3, 4" in 4/4, then start again at 1 in the next measure. Keep counting even if the first beat is silent, because a dictation can begin with a rest.</li>
  <li><strong>For each beat, ask: sound or silence?</strong> If a note sounds, it is a quarter note. If nothing sounds, it is a quarter rest. A rest is not heard, it is counted, which is why your inner pulse matters more than anything else here.</li>
  <li><strong>Split your listenings.</strong> Both measures play on every listen, but you do not need to catch everything at once: in the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<p>The classic slip is a rest between two quarter notes: if your inner pulse speeds up, the second note seems to arrive "on time" and the rest vanishes. The other trap is a rest on the last beat. The rhythm stops one beat early, and you have to keep counting until the end of the measure.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using only <a href="/diccionario-musical/figuras-musicales/">quarter notes and quarter rests</a>, all on the note G4 played by a piano at a tempo between 72 and 90 quarter notes per minute. Before the audio, one <strong>measure of metronome clicks</strong> plays at the same tempo, with a stronger first beat, so you know the speed and where the measure begins. Because of that count-in, a dictation may start with a rest. It never has more than two rests in a row and never a completely silent measure.</p>

<p>Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do you do a rhythm dictation?</div><div class="tm-faq-a">First find the pulse with the metronome measure that plays before the dictation, and keep counting silently. Then count the beats of each measure and decide, beat by beat, whether something sounds (quarter note) or not (quarter rest). Spread your three listens out: the first measure, the second measure, and one to check.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why only quarter notes and quarter rests?</div><div class="tm-faq-a">Because this is the first rhythm dictation: one beat, one symbol. It trains the essentials, which are keeping the pulse inside and counting the rests, without having to think about different durations.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the metronome measure at the start used?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a click plays on every beat, louder on the first, at the same tempo as the dictation. Count along with it and keep counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the note values, the bar line and the beats in each measure. If you miss, you are told which measure has too many or too few beats and, when the total length is right, whatever sounds different appears in red in what you wrote. Below it you see the rhythm that played, so you can hear it again while you read it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you add them yourself, and it is how you prove that you counted each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and it also tells you if a bar line is missing. Without the final double bar line nothing is checked: it is the sign that you are done.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/">Which rhythm is playing?</a>, where you choose among four written rhythms, or with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/">Which audio is it?</a>, which goes from the score to the sound. The cards are the same ones used in <a href="/ejercicios/compases/completar-compas/">Complete the Measure</a>, where you practice writing rhythm with every note value.</p>
`,
});
