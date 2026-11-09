const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-eighth-rest-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-ritmo-suena/',
  title: 'Which Rhythm Plays? Half Notes and the Eighth Rest',
  description: 'Free ear training with half notes, eighth and sixteenth notes and off-beat eighths: hear two measures on G4 and choose the written rhythm that matches.',
  h1: 'Which Rhythm Plays? Half Notes and the Eighth Rest',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on G4 and choose which of the <strong>four written rhythms</strong> it is. Here comes the <strong>off-beat</strong>: an eighth rest followed by an eighth note (UK: quaver), a note that enters halfway through the beat, mixed with half notes (UK: minims), pairs of eighth notes and groups of four sixteenth notes, in <strong>2/4, 3/4 or 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "blancas-sc" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times. Often the eighth rest and eighth note are swapped for two eighth notes or for a quarter note.</p>

<h2>How to take a rhythm dictation with half notes and the eighth rest</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in every measure, even when the first beat does not sound.</li>
  <li><strong>Listen to where each note falls inside the beat.</strong> A note that starts with the pulse and lasts the whole beat is a quarter note. Two notes that share the beat in halves are two eighth notes; four notes are four sixteenth notes. A single note that arrives halfway through the beat, between two pulses, is an eighth rest plus an eighth note. If the note keeps sounding on the next beats it is a longer value, and if nothing sounds it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>The most common mistake is <strong>hearing the off-beat eighth note as if it fell on the beat</strong>: without the pulse inside you, a single note in a beat sounds like a quarter note. Tap your foot and say "(rest)-ti" for the eighth rest and eighth note, "ti-ti" for two eighth notes and "ta" for a quarter note. If the note lands as the foot goes down, it is a quarter note; if it lands as the foot comes up, it is the eighth note after its rest.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, eighth notes, sixteenth notes, the eighth rest plus eighth note, and their rests</a>, all on G4 played by a piano at 60 to 72 quarter notes per minute, a little slower because of the sixteenth notes. The <strong>eighth rest plus eighth note</strong> always fills exactly one beat: the beat starts silent and the note enters in its second half, off the beat. The other eighth notes come in pairs and the <strong>sixteenth notes in fours</strong>, each group filling one beat. Every dictation has at least <strong>one eighth rest plus eighth note</strong> and a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can begin with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests go where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 the half note starts on beat 1 or 2 and the half rest on beat 1; in 2/4 the half note fills the measure (and its rest never appears, since the measure would be silent).</p>

<p>Every note sounds for nearly its full length, so the eighth note after its rest is heard as a short note that enters halfway through the beat, between two pulses. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell an eighth rest plus eighth note from a quarter note?</div><div class="tm-faq-a">Each is a single note in the beat, but in different places: the quarter note begins on the beat, and the eighth note comes halfway through it, between two beats. With your foot tapping the pulse, the quarter note lands on the down-tap and the eighth note on the up-tap.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is an off-beat?</div><div class="tm-faq-a">A note that enters on the weak part of the beat, its second half, while the strong part stays silent. An eighth rest followed by an eighth note is the simplest off-beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>When you get almost all of them right, <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea/">write the dictation</a> yourself. If it is still hard, go back to the group without the eighth rest: <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-ritmo-suena/">half notes and sixteenth notes</a>.</p>
`,
});
