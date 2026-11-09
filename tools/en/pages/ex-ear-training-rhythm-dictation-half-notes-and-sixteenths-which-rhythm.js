const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-sixteenths-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-ritmo-suena/',
  title: 'Rhythm Dictation: Half Notes and Sixteenths, Which Rhythm?',
  description: 'Free ear training with half notes, quarters, eighth and sixteenth note groups and rests: hear two measures on G4 and pick the written rhythm.',
  h1: 'Rhythm Dictation: Half Notes and Sixteenths, Which Rhythm?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on G4 and choose which of the <strong>four written rhythms</strong> it is. Now the beat divides into four: <strong>groups of four sixteenth notes</strong> (UK: semiquavers) appear next to pairs of eighth notes (UK: quavers), half notes (UK: minims) and quarter notes (UK: crotchets), in <strong>2/4, 3/4 or 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "blancas-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times. Often sixteenth notes are swapped for eighth notes or for a quarter note.</p>

<h2>How to take a rhythm dictation with half notes and sixteenth notes</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Go back to 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Count the notes in each beat.</strong> A note that lasts the whole beat is a quarter note; two notes, two eighth notes; four notes, four sixteenth notes. If the note is still sounding on later beats, it is a longer value, and if nothing sounds, a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>The classic slip is <strong>confusing eighth notes with sixteenth notes</strong>, or hurrying the sixteenths and arriving at the next beat early. Four sixteenth notes take the same time as two eighth notes or one quarter note. With your foot on the beat, say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for the quarter, and every syllable falls into place.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, groups of eighth notes and sixteenth notes, and their rests</a>, all on G4 played by a piano at 60 to 72 quarter notes per minute, a little slower than without sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: never a single one. There is always at least <strong>one group of four sixteenth notes</strong> and a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests go where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 the half note starts on beat 1 or 2 and the half rest on beat 1; in 2/4 the half note fills the measure (a half rest does not appear there, since it would be a silent measure).</p>

<p>Each note sounds for almost its full duration, so four sixteenth notes are heard as four very short notes that divide the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell sixteenth notes from eighth notes?</div><div class="tm-faq-a">By counting the notes in the beat: two eighth notes are two notes sharing the beat in halves, and four sixteenth notes are four notes twice as fast. The two groups take exactly one beat, just like a quarter note.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can sixteenth notes appear loose?</div><div class="tm-faq-a">In these dictations, no. Sixteenth notes always come in fours, joined by a double beam and filling one beat, and eighth notes come in pairs.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>When you get almost all of them right, <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas/">write the dictation</a> yourself. If it is still hard, go back to the group without sixteenth notes: <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-ritmo-suena/">half notes and eighth notes</a>.</p>
`,
});
