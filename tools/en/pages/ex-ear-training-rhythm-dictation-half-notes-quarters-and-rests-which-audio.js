const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-quarters-and-rests-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-audio-es/',
  title: 'Rhythm Reading With Half Notes: Which Audio Is It?',
  description: 'Free rhythm reading with half notes, quarter notes and their rests: read two measures in 2/4, 3/4 or 4/4 and choose which of four audios sounds as written.',
  h1: 'Rhythm Reading With Half Notes: Which Audio Is It?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Read a <strong>two-measure</strong> (UK: bar) rhythm made of <strong>half notes</strong> (UK: minims), <strong>quarter notes</strong> (UK: crotchets) and their rests, and listen to the <strong>four audios</strong>: only one sounds as written. It is rhythm dictation backwards, from the score to the sound. Look at each half note on the page: in the right audio, that note keeps sounding for two beats.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "blancas" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. After you answer, the right one is marked and, if you missed, you see written what the one you chose actually played, with the differing beats in red.</p>

<h2>How to take a rhythm dictation with half notes</h2>

<ol>
  <li><strong>Set the pulse before you compare.</strong> Each audio starts with one measure of metronome clicks, with the first beat stressed. Count along and keep going silently while the rhythm plays, rests included, so that the notes on the page and the sounds line up.</li>
  <li><strong>Find the time signature and count its beats.</strong> It is announced before you listen: count "1, 2", "1, 2, 3" or "1, 2, 3, 4" from the metronome measure, and start again in every measure, even if the first beat is silent.</li>
  <li><strong>Listen to what happens on each beat.</strong> If a note starts and is still sounding on the next beat, it is a half note. If it sounds for one beat and stops as the next begins, it is a quarter note followed by a rest. If nothing sounds for two beats, it is a two-beat rest: one half rest or two quarter rests, which sound identical.</li>
  <li><strong>Use your listens wisely.</strong> Every time you play an audio, both measures sound, and you get up to three listens of each. Check the pulse and the first measure first, then the second, then the whole rhythm; or rule out at once the audios that clearly do not match the score.</li>
</ol>

<p>The easiest mix-up is a <strong>half note</strong> with a <strong>quarter note followed by a quarter rest</strong>. Both start the same way and take two beats. The difference is on the second beat: with the half note the sound continues, with the quarter note and rest it is cut off. Pay attention to the moment the sound stops, not only to when the note starts.</p>

<h2>What the exercises are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, half rests and quarter rests</a>, all on G4 played by a piano at a tempo between 72 and 90 quarter notes per minute. There is <strong>always at least one half note</strong>, which is what is new in this group. One <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a whole silent measure. Notes keep sounding almost to the end of their value, which is how you tell a half note (it lasts through two beats) from a quarter note (it is cut after the first).</p>

<p>Two-beat values follow the usual grouping of each meter. In 4/4, a half note or half rest starts on beat 1 or beat 3. In 3/4, a half note can start on beat 1 or 2, while a half rest only starts on beat 1 (two beats of rest on beats 2 and 3 are shown as two quarter rests). In 2/4, a half note fills the whole measure, and a half rest never appears because it would be a completely silent measure. When writing, one half rest and two quarter rests are worth the same and sound the same. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the four audios differ?</div><div class="tm-faq-a">All four have the same time signature and tempo. The wrong ones change one or two beats from the score, most often a half note in place of a quarter note and a rest, or the reverse. That is why you must listen to how long each note lasts.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How does a half note sound?</div><div class="tm-faq-a">It lasts two beats: it starts on one beat and is still sounding through the next. A quarter note lasts one: if a rest follows it, the sound is cut and a beat goes by with nothing.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the metronome measure at the start for?</div><div class="tm-faq-a">To give you the speed and the downbeat. Before every audio you hear one click per beat, with the first one stronger, at the tempo of the rhythm. Count with it, and keep counting inside your head while the audio plays, even through the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After answering you can play them as many times as you like.</div></div>
</div>

<p>For the road from sound to score there are <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/">Which rhythm is playing?</a> and the <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios/">half-note dictation</a>, in which you write the rhythm yourself. To review, the same exercise with <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/">quarter notes and quarter rests</a> only.</p>
`,
});
