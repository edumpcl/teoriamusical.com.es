const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-eighths-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-audio-es/',
  title: 'Rhythm Reading: Half Notes and Eighths, Which Audio?',
  description: 'Free rhythm reading with half notes, quarter notes, eighth note pairs and rests: read two measures in 2/4, 3/4 or 4/4 and pick the matching audio.',
  h1: 'Rhythm Reading: Half Notes and Eighths, Which Audio?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Read a <strong>two-measure</strong> (UK: bar) rhythm with <strong>half notes</strong> (UK: minims), <strong>quarter notes</strong> (UK: crotchets), <strong>pairs of eighth notes</strong> (UK: quavers) and their rests, and listen to the <strong>four audios</strong>: only one matches the score. Find each pair of eighth notes on the page: in the right audio, that beat has two notes.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "blancas-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. After you answer, the right one is marked and, if you missed, you see written what the one you chose actually played, with the differing beats in red.</p>

<h2>How to take a rhythm dictation with half notes and eighth notes</h2>

<ol>
  <li><strong>Set the pulse before you compare.</strong> Each audio starts with one measure of metronome clicks, with the first beat stressed. Count along and keep going silently while the rhythm plays, rests included, so that the notes on the page and the sounds line up.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Begin again at 1 in each measure, even when the first beat is silent.</li>
  <li><strong>Listen to what happens inside each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes that share it in halves are two eighth notes. If the note is still sounding on the following beats, it is a longer value (a half note), and if nothing sounds, it is a rest.</li>
  <li><strong>Use your listens wisely.</strong> Every time you play an audio, both measures sound, and you get up to three listens of each. Check the pulse and the first measure first, then the second, then the whole rhythm; or rule out at once the audios that clearly do not match the score.</li>
</ol>

<p>Eighth notes tempt you to <strong>speed up the pulse</strong>: a pair of eighth notes followed by a quarter note can make the quarter seem shorter. Two eighth notes last exactly as long as one quarter note. Say "ti-ti" for the eighths and "ta" for the quarter while your foot keeps the beat, and the difference shows right away.</p>

<h2>What the exercises are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, pairs of eighth notes and their rests</a>, all on G4 played by a piano at 72 to 90 quarter notes per minute. <strong>Eighth notes always come in pairs</strong>, joined by a beam and filling one beat: in this group there is never a single eighth note or three (a lone eighth note appears only in the groups with an eighth rest). There is always at least <strong>one pair of eighth notes</strong> plus a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first, at the same tempo, with a stronger first beat. A dictation can start with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests sit where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 a half note starts on beat 1 or 2 and a half rest on beat 1; in 2/4 a half note fills the measure (and a half rest never appears, since it would leave the measure completely silent).</p>

<p>Each note sounds for nearly its whole value, so two eighth notes are heard as two short notes dividing the beat into equal halves. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the four audios differ?</div><div class="tm-faq-a">They share the time signature and the tempo. The wrong ones change one or two beats of the score, often two eighth notes in place of a quarter note, or the other way around. Count the notes in each beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is an eighth note?</div><div class="tm-faq-a">Half a beat in 2/4, 3/4 and 4/4. Two eighth notes last the same as one quarter note, so in these dictations they always come in pairs and fill one beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the metronome measure at the start for?</div><div class="tm-faq-a">To give you the speed and the downbeat. Before every audio you hear one click per beat, with the first one stronger, at the tempo of the rhythm. Count with it, and keep counting inside your head while the audio plays, even through the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After answering you can play them as many times as you like.</div></div>
</div>

<p>For the road from sound to score, try <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-ritmo-suena/">Which rhythm is playing?</a> and the <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas/">written dictation</a>. The same exercise without eighth notes is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-audio-es/">half notes, quarter notes and their rests</a>.</p>
`,
});
