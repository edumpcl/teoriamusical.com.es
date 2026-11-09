const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-eighths-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-ritmo-suena/',
  title: 'Rhythm Dictation: Half Notes and Eighths, Which Rhythm?',
  description: 'Free ear training with half notes, quarter notes, eighth note pairs and rests: hear two measures on G4 and choose the matching written rhythm.',
  h1: 'Rhythm Dictation: Half Notes and Eighths, Which Rhythm?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on G4 and choose which of the <strong>four written rhythms</strong> it is. Now the beat divides: <strong>pairs of eighth notes</strong> (UK: quavers) split one beat in half, and they mix with half notes (UK: minims), quarter notes (UK: crotchets) and their rests, in <strong>2/4, 3/4 or 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "blancas-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times. Often a quarter note is swapped for two eighth notes, or the reverse.</p>

<h2>How to take a rhythm dictation with half notes and eighth notes</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Begin again at 1 in each measure, even when the first beat is silent.</li>
  <li><strong>Listen to what happens inside each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes that share it in halves are two eighth notes. If the note is still sounding on the following beats, it is a longer value (a half note), and if nothing sounds, it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>Eighth notes tempt you to <strong>speed up the pulse</strong>: a pair of eighth notes followed by a quarter note can make the quarter seem shorter. Two eighth notes last exactly as long as one quarter note. Say "ti-ti" for the eighths and "ta" for the quarter while your foot keeps the beat, and the difference shows right away.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, pairs of eighth notes and their rests</a>, all on G4 played by a piano at 72 to 90 quarter notes per minute. <strong>Eighth notes always come in pairs</strong>, joined by a beam and filling one beat: in this group there is never a single eighth note or three (a lone eighth note appears only in the groups with an eighth rest). There is always at least <strong>one pair of eighth notes</strong> plus a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first, at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests sit where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 a half note starts on beat 1 or 2 and a half rest on beat 1; in 2/4 a half note fills the measure (and a half rest never appears, since it would leave the measure completely silent).</p>

<p>Each note sounds for nearly its whole value, so two eighth notes are heard as two short notes dividing the beat into equal halves. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How can I tell two eighth notes from a quarter note?</div><div class="tm-faq-a">Count the notes in the beat. A quarter note is one note that lasts the full beat; two eighth notes are two notes sharing it in equal halves. Both take exactly one beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can there be a lone eighth note?</div><div class="tm-faq-a">No, not in these dictations: eighth notes are always paired, beamed together, and fill one beat. There is never one on its own or three.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>Once you answer correctly almost every time, <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas/">write the dictation</a> with cards. If it is still difficult, return to the group without eighth notes: <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/">half notes, quarter notes and their rests</a>.</p>
`,
});
