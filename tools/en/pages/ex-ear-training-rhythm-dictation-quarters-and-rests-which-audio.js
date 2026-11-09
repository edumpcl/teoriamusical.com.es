const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-rests-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/',
  title: 'Rhythm Reading: Which Audio Is It? Quarters and Rests',
  description: 'Free rhythm reading with quarter notes and quarter rests: read a two-measure rhythm in 2/4, 3/4 or 4/4 and pick the audio that matches.',
  h1: 'Rhythm Reading With Quarter Notes: Which Audio Is It?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Read a <strong>two-measure</strong> (UK: bar) rhythm written with <strong>quarter notes</strong> (UK: crotchets) and <strong>quarter rests</strong>, then listen to the <strong>four audios</strong>: only one sounds the way it is written. It is rhythm dictation in reverse, from the page to the sound, and it trains the same two skills: feeling the pulse and counting the rests. Measures of <strong>2/4, 3/4 and 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "negras" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. After you answer, the right one is marked and, if you missed, you see written what the one you chose actually played, with the differing beats in red.</p>

<h2>How to take a rhythm dictation</h2>

<ol>
  <li><strong>Set the pulse before you compare.</strong> Each audio starts with one measure of metronome clicks, with the first beat stressed. Count along and keep going silently while the rhythm plays, rests included, so that the notes on the page and the sounds line up.</li>
  <li><strong>Count the beats of each measure.</strong> Say "1, 2" in 2/4, "1, 2, 3" in 3/4 or "1, 2, 3, 4" in 4/4, then start again at 1 in the next measure. Keep counting even if the first beat is silent, because a dictation can begin with a rest.</li>
  <li><strong>For each beat, ask: sound or silence?</strong> If a note sounds, it is a quarter note. If nothing sounds, it is a quarter rest. A rest is not heard, it is counted, which is why your inner pulse matters more than anything else here.</li>
  <li><strong>Use your listens wisely.</strong> Every time you play an audio, both measures sound, and you get up to three listens of each. Check the pulse and the first measure first, then the second, then the whole rhythm; or rule out at once the audios that clearly do not match the score.</li>
</ol>

<p>The classic slip is a rest between two quarter notes: if your inner pulse speeds up, the second note seems to arrive "on time" and the rest vanishes. The other trap is a rest on the last beat. The rhythm stops one beat early, and you have to keep counting until the end of the measure.</p>

<h2>What the exercises are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using only <a href="/diccionario-musical/figuras-musicales/">quarter notes and quarter rests</a>, all on the note G4 played by a piano at a tempo between 72 and 90 quarter notes per minute. Before the audio, one <strong>measure of metronome clicks</strong> plays at the same tempo, with a stronger first beat, so you know the speed and where the measure begins. Because of that count-in, a dictation may start with a rest. It never has more than two rests in a row and never a completely silent measure.</p>

<p>Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What is rhythm reading?</div><div class="tm-faq-a">It means reading a written rhythm and knowing how it sounds: how many beats each symbol lasts and where the silences are. It is the other side of rhythm dictation. In a dictation you go from sound to score, and in reading you go from score to sound.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do the four audios differ?</div><div class="tm-faq-a">All four are in the same time signature at the same tempo, and they are very alike. The wrong ones differ from the right one by one or two beats, where a note sounds in place of a rest or the other way around.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the metronome measure at the start for?</div><div class="tm-faq-a">To give you the speed and the downbeat. Before every audio you hear one click per beat, with the first one stronger, at the tempo of the rhythm. Count with it, and keep counting inside your head while the audio plays, even through the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After answering you can play them as many times as you like.</div></div>
</div>

<p>For the road from sound to score, try <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/">Which rhythm is playing?</a>, with four rhythms to choose from, and the full <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/">rhythm dictation</a>, in which you write it yourself.</p>
`,
});
