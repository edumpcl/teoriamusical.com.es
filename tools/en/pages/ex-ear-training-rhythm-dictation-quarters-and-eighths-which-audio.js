const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/quarters-and-eighths-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-audio-es/',
  title: 'Rhythm Reading With Eighth Notes: Which Audio Is It?',
  description: 'Free rhythm reading with quarter notes, pairs of eighth notes and quarter rests: read two measures in 2/4, 3/4 or 4/4 and pick the matching audio.',
  h1: 'Rhythm Reading With Eighth Notes: Which Audio Is It?',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Read a <strong>two-measure</strong> (UK: bar) rhythm made of <strong>quarter notes</strong> (UK: crotchets), <strong>pairs of eighth notes</strong> (UK: quavers) and <strong>quarter rests</strong>, and listen to the <strong>four audios</strong>: only one sounds as written. Look at every pair of eighth notes in the score: in the right audio, that beat holds two notes.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "negras-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. After you answer, the right one is marked and, if you missed, you see written what the one you chose actually played, with the differing beats in red.</p>

<h2>How to take a rhythm dictation with eighth notes</h2>

<ol>
  <li><strong>Set the pulse before you compare.</strong> Each audio starts with one measure of metronome clicks, with the first beat stressed. Count along and keep going silently while the rhythm plays, rests included, so that the notes on the page and the sounds line up.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Listen to what happens inside each beat.</strong> One note that lasts the whole beat is a quarter note. Two notes that split it into halves are two eighth notes. If nothing sounds, it is a rest.</li>
  <li><strong>Use your listens wisely.</strong> Every time you play an audio, both measures sound, and you get up to three listens of each. Check the pulse and the first measure first, then the second, then the whole rhythm; or rule out at once the audios that clearly do not match the score.</li>
</ol>

<p>The most frequent mistake with eighth notes is <strong>rushing the pulse</strong>: a pair of eighth notes followed by a quarter note can make the quarter sound shorter than it is. A pair of eighth notes lasts exactly as long as one quarter note. Tap your foot on the beat and say "ti-ti" on the eighth notes and "ta" on the quarter note, and the difference becomes clear.</p>

<h2>What the exercises are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">quarter notes, pairs of eighth notes and quarter rests</a>, all on the note G4 at a piano tempo between 72 and 90 quarter notes per minute. <strong>Eighth notes always come in pairs</strong>, joined by a beam and filling one beat: in this group there is never a single one and never three (a lone eighth note appears only in the groups with an eighth rest). Every dictation has at least <strong>one pair of eighth notes</strong> and some quarter rest. One <strong>measure of metronome clicks</strong> plays first, at the same tempo and with a stronger first beat. A dictation may begin with a rest, but never has more than two beats of rest in a row or a completely silent measure.</p>

<p>Every note sounds for almost its full length, so a pair of eighth notes is heard as two short notes that divide the beat into two equal halves. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the four audios differ?</div><div class="tm-faq-a">All four share the same time signature and tempo. The wrong ones change one or two beats from the score, often two eighth notes in place of a quarter note or the reverse, so count how many notes each beat holds.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is an eighth note?</div><div class="tm-faq-a">Half a beat in 2/4, 3/4 and 4/4: two eighth notes last as long as one quarter note. That is why they always come in pairs here, filling a beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the metronome measure at the start for?</div><div class="tm-faq-a">To give you the speed and the downbeat. Before every audio you hear one click per beat, with the first one stronger, at the tempo of the rhythm. Count with it, and keep counting inside your head while the audio plays, even through the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After answering you can play them as many times as you like.</div></div>
</div>

<p>For the road from sound to score, there are <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-ritmo-suena/">Which rhythm is playing?</a> and the <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas/">dictation</a>, in which you write the rhythm yourself. And the same exercise without eighth notes is <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/">quarter notes and quarter rests</a>.</p>
`,
});
