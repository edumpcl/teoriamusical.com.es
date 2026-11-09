const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-quarters-and-rests-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/',
  title: 'Rhythm Dictation With Half Notes: Which Rhythm Plays?',
  description: 'Free ear training with half notes, quarter notes and their rests: hear two measures on G4 in 2/4, 3/4 or 4/4 and pick the matching written rhythm.',
  h1: 'Rhythm Dictation With Half Notes: Which Rhythm Plays?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on G4 and choose which of the <strong>four written rhythms</strong> it is. The new ingredient is the <strong>half note</strong> (UK: minim), alongside quarter notes (UK: crotchets) and both kinds of rest, in <strong>2/4, 3/4 or 4/4</strong>. The key is to hear how long each note lasts: a half note is still sounding on the second beat, a quarter note is not.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "blancas" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times. Most often a half note is swapped for a quarter note and a rest.</p>

<h2>How to take a rhythm dictation with half notes</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Find the time signature and count its beats.</strong> It is announced before you listen: count "1, 2", "1, 2, 3" or "1, 2, 3, 4" from the metronome measure, and start again in every measure, even if the first beat is silent.</li>
  <li><strong>Listen to what happens on each beat.</strong> If a note starts and is still sounding on the next beat, it is a half note. If it sounds for one beat and stops as the next begins, it is a quarter note followed by a rest. If nothing sounds for two beats, it is a two-beat rest: one half rest or two quarter rests, which sound identical.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>The easiest mix-up is a <strong>half note</strong> with a <strong>quarter note followed by a quarter rest</strong>. Both start the same way and take two beats. The difference is on the second beat: with the half note the sound continues, with the quarter note and rest it is cut off. Pay attention to the moment the sound stops, not only to when the note starts.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, half rests and quarter rests</a>, all on G4 played by a piano at a tempo between 72 and 90 quarter notes per minute. There is <strong>always at least one half note</strong>, which is what is new in this group. One <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a whole silent measure. Notes keep sounding almost to the end of their value, which is how you tell a half note (it lasts through two beats) from a quarter note (it is cut after the first).</p>

<p>Two-beat values follow the usual grouping of each meter. In 4/4, a half note or half rest starts on beat 1 or beat 3. In 3/4, a half note can start on beat 1 or 2, while a half rest only starts on beat 1 (two beats of rest on beats 2 and 3 are shown as two quarter rests). In 2/4, a half note fills the whole measure, and a half rest never appears because it would be a completely silent measure. When writing, one half rest and two quarter rests are worth the same and sound the same. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell a half note from a quarter note followed by a rest?</div><div class="tm-faq-a">By when the sound stops. Both start on the same beat and fill two beats, but the half note keeps sounding through the second beat, while the quarter note stops at the end of the first and the second beat is silent.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Is one half rest the same as two quarter rests?</div><div class="tm-faq-a">Yes. Both are two beats with no sound. In the written rhythms of this exercise, two beats of rest that begin on beat 1 of the measure (or on beat 3 in 4/4) appear as a half rest, and anywhere else as two quarter rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>When you get almost all of them right, try <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios/">writing the dictation with half notes</a> using cards. If the pulse still gives you trouble, go back to <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/">quarter notes and quarter rests</a>.</p>
`,
});
