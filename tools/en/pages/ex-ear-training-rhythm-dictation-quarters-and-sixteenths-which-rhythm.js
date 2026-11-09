const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-sixteenths-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-ritmo-suena/',
  title: 'Rhythm Dictation With Sixteenth Notes: Which Rhythm?',
  description: 'Free ear training with quarter notes, eighth and sixteenth note groups and quarter rests: hear two measures on G4 and choose the matching written rhythm.',
  h1: 'Rhythm Dictation With Sixteenth Notes: Which Rhythm?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on G4 and choose which of the <strong>four written rhythms</strong> it is. Now the beat divides into four: there are <strong>groups of four sixteenth notes</strong> (UK: semiquavers), as well as pairs of eighth notes (UK: quavers), with quarter notes (UK: crotchets) and quarter rests, in <strong>2/4, 3/4 or 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "negras-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times. Often sixteenth notes are swapped for eighth notes or for a quarter note.</p>

<h2>How to take a rhythm dictation with sixteenth notes</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in each measure, even if the first beat does not sound.</li>
  <li><strong>Count the notes in each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes are two eighth notes. Four notes are four sixteenth notes. If the note keeps sounding on the following beats it is a longer value, and if nothing sounds it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>The most common error is <strong>mixing up eighth notes and sixteenth notes</strong>, or rushing the sixteenths and reaching the next beat early. Four sixteenth notes last as long as two eighth notes or one quarter note. Keep your foot on the beat and say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for the quarter: each syllable lands where it should.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">quarter notes, groups of eighth notes and sixteenth notes, and quarter rests</a>, all on G4 played by a piano at a tempo between 60 and 72 quarter notes per minute, a little slower than in the groups without sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: in this group there is never a loose one (a lone eighth note appears only in the groups with an eighth rest). Every dictation has at least <strong>one group of four sixteenth notes</strong> and some quarter rest. A <strong>measure of metronome clicks</strong> plays first, at the same tempo and with a stronger first beat. A dictation may start with a rest, but it never has more than two beats of rest in a row or a completely silent measure.</p>

<p>Each note sounds for nearly its full length, so four sixteenth notes are heard as four very short notes dividing the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How can I tell sixteenth notes from eighth notes?</div><div class="tm-faq-a">By the number of notes in the beat. Two eighth notes share the beat into two halves, and four sixteenth notes are four notes twice as fast. Both groups fill exactly one beat, just like a quarter note.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can there be a loose sixteenth note?</div><div class="tm-faq-a">Not here. Sixteenth notes always come in fours, joined by a double beam and filling one beat, and eighth notes come in pairs.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>When you answer correctly almost every time, <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas/">write the dictation</a> yourself. If it is still hard, go back to the group without sixteenth notes: <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-ritmo-suena/">quarter notes and eighth notes</a>.</p>
`,
});
