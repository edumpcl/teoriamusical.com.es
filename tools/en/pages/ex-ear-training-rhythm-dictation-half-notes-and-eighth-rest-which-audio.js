const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/half-notes-and-eighth-rest-which-audio/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-audio-es/',
  title: 'Which Audio Is It? Rhythm Reading: Half Notes, Eighth Rest',
  description: 'Free rhythm reading with half notes, eighth and sixteenth notes and the eighth rest: read two measures in 2/4, 3/4 or 4/4 and pick the matching audio.',
  h1: 'Which Audio Is It? Half Notes and the Eighth Rest',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'],
  body: `<p>Read a <strong>two-measure</strong> (UK: bar) rhythm with <strong>half notes</strong> (UK: minims), <strong>quarter notes</strong> (UK: crotchets), <strong>eighth and sixteenth notes</strong> (UK: quavers and semiquavers), <strong>an eighth rest followed by an eighth note</strong> and their rests, and listen to the <strong>four audios</strong>: only one sounds as written. Find each eighth rest on the page: in the right audio, that beat starts silent and the note arrives halfway through it.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "leer", grupo: "blancas-sc" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). When you know which one it is, press <em>This one</em> under that audio. You can only choose an audio you have listened to. After you answer, the right one is marked and, if you missed, you see written what the one you chose actually played, with the differing beats in red.</p>

<h2>How to take a rhythm dictation with half notes and the eighth rest</h2>

<ol>
  <li><strong>Set the pulse before you compare.</strong> Each audio starts with one measure of metronome clicks, with the first beat stressed. Count along and keep going silently while the rhythm plays, rests included, so that the notes on the page and the sounds line up.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Start again at 1 in every measure, even when the first beat does not sound.</li>
  <li><strong>Listen to where each note falls inside the beat.</strong> A note that starts with the pulse and lasts the whole beat is a quarter note. Two notes that share the beat in halves are two eighth notes; four notes are four sixteenth notes. A single note that arrives halfway through the beat, between two pulses, is an eighth rest plus an eighth note. If the note keeps sounding on the next beats it is a longer value, and if nothing sounds it is a rest.</li>
  <li><strong>Use your listens wisely.</strong> Every time you play an audio, both measures sound, and you get up to three listens of each. Check the pulse and the first measure first, then the second, then the whole rhythm; or rule out at once the audios that clearly do not match the score.</li>
</ol>

<p>The most common mistake is <strong>hearing the off-beat eighth note as if it fell on the beat</strong>: without the pulse inside you, a single note in a beat sounds like a quarter note. Tap your foot and say "(rest)-ti" for the eighth rest and eighth note, "ti-ti" for two eighth notes and "ta" for a quarter note. If the note lands as the foot goes down, it is a quarter note; if it lands as the foot comes up, it is the eighth note after its rest.</p>

<h2>What the exercises are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">half notes, quarter notes, eighth notes, sixteenth notes, the eighth rest plus eighth note, and their rests</a>, all on G4 played by a piano at 60 to 72 quarter notes per minute, a little slower because of the sixteenth notes. The <strong>eighth rest plus eighth note</strong> always fills exactly one beat: the beat starts silent and the note enters in its second half, off the beat. The other eighth notes come in pairs and the <strong>sixteenth notes in fours</strong>, each group filling one beat. Every dictation has at least <strong>one eighth rest plus eighth note</strong> and a half note or a half rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can begin with a rest, but never has more than two beats of rest in a row or a silent measure. Half notes and half rests go where they are normally written: in 4/4 they start on beat 1 or 3; in 3/4 the half note starts on beat 1 or 2 and the half rest on beat 1; in 2/4 the half note fills the measure (and its rest never appears, since the measure would be silent).</p>

<p>Every note sounds for nearly its full length, so the eighth note after its rest is heard as a short note that enters halfway through the beat, between two pulses. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do the four audios differ?</div><div class="tm-faq-a">All four have the same time signature and tempo. The wrong ones change one or two beats from the score, often the eighth rest plus eighth note in place of two eighth notes or a quarter note. Notice whether the note falls on the pulse or between two pulses.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How long is an eighth rest?</div><div class="tm-faq-a">Half a beat in 2/4, 3/4 and 4/4, the same as an eighth note. An eighth rest and an eighth note together fill one beat, just like a quarter note or two eighth notes.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the metronome measure at the start for?</div><div class="tm-faq-a">To give you the speed and the downbeat. Before every audio you hear one click per beat, with the first one stronger, at the tempo of the rhythm. Count with it, and keep counting inside your head while the audio plays, even through the rests.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each audio?</div><div class="tm-faq-a">Up to three times each before you answer. After answering you can play them as many times as you like.</div></div>
</div>

<p>For the road from sound to score there are <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-ritmo-suena/">Which rhythm is playing?</a> and the <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea/">dictation</a>, in which you write it yourself. The same exercise without the eighth rest is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-audio-es/">half notes and sixteenth notes</a>.</p>
`,
});
