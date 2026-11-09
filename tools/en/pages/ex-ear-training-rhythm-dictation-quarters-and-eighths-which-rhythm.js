const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-eighths-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-ritmo-suena/',
  title: 'Rhythm Dictation With Eighth Notes: Which Rhythm Plays?',
  description: 'Free ear training with quarter notes, eighth note pairs and quarter rests: hear two measures on G4 and choose the matching written rhythm out of four.',
  h1: 'Rhythm Dictation With Eighth Notes: Which Rhythm Plays?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a <strong>two-measure</strong> (UK: bar) rhythm played on G4 and choose which of the <strong>four written rhythms</strong> it is. Now the beat divides: there are <strong>pairs of eighth notes</strong> (UK: quavers), which split one beat into two halves, along with quarter notes (UK: crotchets) and quarter rests, in <strong>2/4, 3/4 or 4/4</strong>.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "negras-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). After you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times. Often a quarter note is swapped for two eighth notes, or the reverse.</p>

<h2>How to take a rhythm dictation with eighth notes</h2>

<ol>
  <li><strong>Lock in the pulse first.</strong> The metronome measure before the audio gives you the speed and the downbeat. Count with it, then keep counting in your head while the rhythm plays, rests included.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Listen to what happens inside each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes that split it into halves are two eighth notes. If nothing sounds, it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play each time, but you can focus on one thing per listen: the pulse and the first measure first, then the second measure, and finally the whole dictation as a check. You may answer while it is still playing.</li>
</ol>

<p>The most frequent mistake with eighth notes is <strong>rushing the pulse</strong>: a pair of eighth notes followed by a quarter note can make the quarter sound shorter than it is. A pair of eighth notes lasts exactly as long as one quarter note. Tap your foot on the beat and say "ti-ti" on the eighth notes and "ta" on the quarter note, and the difference becomes clear.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">quarter notes, pairs of eighth notes and quarter rests</a>, all on the note G4 at a piano tempo between 72 and 90 quarter notes per minute. <strong>Eighth notes always come in pairs</strong>, joined by a beam and filling one beat: never a single one and never three. Every dictation has at least <strong>one pair of eighth notes</strong> and some quarter rest. One <strong>measure of metronome clicks</strong> plays first, at the same tempo and with a stronger first beat. A dictation may begin with a rest, but never has more than two beats of rest in a row or a completely silent measure.</p>

<p>Every note sounds for almost its full length, so a pair of eighth notes is heard as two short notes that divide the beat into two equal halves. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell two eighth notes from a quarter note?</div><div class="tm-faq-a">By the number of notes in the beat. A quarter note is one note lasting the whole beat, while two eighth notes are two notes dividing it into equal halves. Both fill exactly one beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can an eighth note appear alone?</div><div class="tm-faq-a">Not in these dictations. Eighth notes always come in pairs, joined by a beam and filling one beat. You will never hear a single one or three.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does a metronome measure play first?</div><div class="tm-faq-a">So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the rhythm. Count with the clicks and go on counting silently while the rhythm plays, rests included.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you may answer while it plays. After answering you can listen again as often as you want to compare it with the written rhythm.</div></div>
</div>

<p>When you get nearly all of them right, try <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas/">writing the dictation</a> yourself. If it is still hard, go back to the group without eighth notes: <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/">quarter notes and quarter rests</a>.</p>
`,
});
