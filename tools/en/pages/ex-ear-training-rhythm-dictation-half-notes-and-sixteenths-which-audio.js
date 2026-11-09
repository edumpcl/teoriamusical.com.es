const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-sixteenths-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-audio-es/',
  title: 'Rhythm Reading: Half Notes and Sixteenths, Which Audio?',
  description: 'Free rhythm reading with half notes, quarters, eighth and sixteenth note groups and rests: read two measures and pick the matching audio of four.',
  h1: 'Rhythm Reading: Half Notes and Sixteenths, Which Audio?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Read a <strong>two-measure</strong> (UK: bar) rhythm with <strong>half notes</strong> (UK: minims), <strong>quarter notes</strong> (UK: crotchets), <strong>groups of eighth notes</strong> (UK: quavers) and <strong>sixteenth notes</strong> (UK: semiquavers), and their rests, and listen to the <strong>four audios</strong>: only one sounds as written. Find each group of sixteenth notes on the page: in the right audio that beat has four notes, and an eighth-note group has two.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "blancas-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. After you answer, the right one is marked and, if you missed, you see written what the one you chose actually played, with the differing beats in red.</p>

<h2>How to take a rhythm dictation with half notes and sixteenth notes</h2>

<ol>
  <li><strong>Set the pulse before you compare.</strong> Each audio starts with one measure of metronome clicks, with the first beat stressed. Count along and keep going silently while the rhythm plays, rests included, so that the notes on the page and the sounds line up.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Go back to 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Count the notes in each beat.</strong> A note that lasts the whole beat is a quarter note; two notes, two eighth notes; four notes, four sixteenth notes. If the note is still sounding on later beats, it is a longer value, and if nothing sounds, a rest.</li>
  <li><strong>Use your listens wisely.</strong> Every time you play an audio, both measures sound, and you get up to three listens of each. Check the pulse and the first measure first, then the second, then the whole rhythm; or rule out at once the audios that clearly do not match the score.</li>
</ol>

<p>The classic slip is <strong>confusing eighth notes with sixteenth notes</strong>, or hurrying the sixteenths and arriving at the next beat early. Four sixteenth notes take the same time as two eighth notes or one quarter note. With your foot on the beat, say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for the quarter, and every syllable falls into place.</p>

<h2>What the exercises are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, groups of eighth notes and sixteenth notes, and their rests</a>, all on G4 played by a piano at 60 to 72 quarter notes per minute, a little slower than without sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: never a single one. There is always at least <strong>one group of four sixteenth notes</strong> and a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests go where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 the half note starts on beat 1 or 2 and the half rest on beat 1; in 2/4 the half note fills the measure (a half rest does not appear there, since it would be a silent measure).</p>

<p>Each note sounds for almost its full duration, so four sixteenth notes are heard as four very short notes that divide the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the four audios differ?</div><div class="tm-faq-a">All four share the time signature and tempo. The wrong ones change one or two beats from the score, often four sixteenth notes in place of two eighth notes or one quarter note: count the notes in each beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is a sixteenth note?</div><div class="tm-faq-a">A quarter of a beat in 2/4, 3/4 and 4/4. Four sixteenth notes last the same as two eighth notes or one quarter note, which is why here they always come in fours and fill a beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the metronome measure at the start for?</div><div class="tm-faq-a">To give you the speed and the downbeat. Before every audio you hear one click per beat, with the first one stronger, at the tempo of the rhythm. Count with it, and keep counting inside your head while the audio plays, even through the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After answering you can play them as many times as you like.</div></div>
</div>

<p>For the road from sound to score there are <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-ritmo-suena/">Which rhythm is playing?</a> and the <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas/">dictation</a>, in which you write the rhythm yourself. The same exercise without sixteenth notes uses <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-audio-es/">half notes and eighth notes</a>.</p>
`,
});
