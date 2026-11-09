const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-rests-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/',
  title: 'Rhythm Dictation: Which Rhythm Is Playing? Quarters',
  description: 'Free ear training with quarter notes and quarter rests: hear a two-measure rhythm on G4 in 2/4, 3/4 or 4/4 and pick the written one. Up to 3 listens.',
  h1: 'Rhythm Dictation With Quarter Notes: Which Rhythm Is Playing?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on the note G4 and choose which of the <strong>four written rhythms</strong> you heard. There are only <strong>quarter notes</strong> (UK: crotchets) and <strong>quarter rests</strong>, in <strong>2/4, 3/4 or 4/4</strong>. It is the first step of rhythm dictation, before you write one entirely on your own.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "negras" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times.</p>

<h2>How to take a rhythm dictation</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Count the beats of each measure.</strong> Say "1, 2" in 2/4, "1, 2, 3" in 3/4 or "1, 2, 3, 4" in 4/4, then start again at 1 in the next measure. Keep counting even if the first beat is silent, because a dictation can begin with a rest.</li>
  <li><strong>For each beat, ask: sound or silence?</strong> If a note sounds, it is a quarter note. If nothing sounds, it is a quarter rest. A rest is not heard, it is counted, which is why your inner pulse matters more than anything else here.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>The classic slip is a rest between two quarter notes: if your inner pulse speeds up, the second note seems to arrive "on time" and the rest vanishes. The other trap is a rest on the last beat. The rhythm stops one beat early, and you have to keep counting until the end of the measure.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using only <a href="/diccionario-musical/figuras-musicales/">quarter notes and quarter rests</a>, all on the note G4 played by a piano at a tempo between 72 and 90 quarter notes per minute. Before the audio, one <strong>measure of metronome clicks</strong> plays at the same tempo, with a stronger first beat, so you know the speed and where the measure begins. Because of that count-in, a dictation may start with a rest. It never has more than two rests in a row and never a completely silent measure.</p>

<p>Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What is a rhythm dictation?</div><div class="tm-faq-a">You listen to a rhythm and either write it or recognize its notation: the note values and rests, in their measure. It is practiced in music theory classes from the first years. Here the dictation uses quarter notes and quarter rests, and you choose among four written rhythms.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How does a quarter rest sound?</div><div class="tm-faq-a">It does not sound: you count it. It is a beat in which nothing plays. If you keep the pulse going inside, you will notice that no note arrives on that beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>Once you get most of them right, take the next step: <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/">write the rhythm dictation</a> with cards, with no options to choose from. For the opposite road, from score to sound, try <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/">Which audio is it?</a></p>
`,
});
