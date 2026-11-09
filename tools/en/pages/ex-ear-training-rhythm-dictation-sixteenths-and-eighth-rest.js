const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/sixteenths-and-eighth-rest/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea/',
  title: 'Rhythm Dictation: Sixteenth Notes and the Eighth Rest',
  description: 'Free online rhythm dictation: hear two measures in 2/4, 3/4 or 4/4 and write them with quarters, eighths, sixteenths and the eighth rest.',
  h1: 'Rhythm Dictation With Sixteenth Notes and Eighth Rests',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythm Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'completar-compas-engine', 'dictado-ritmico-engine'],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) on the note G4 and <strong>write it</strong> with the cards: quarter notes (UK: crotchets), eighth notes (UK: quavers), sixteenth notes (UK: semiquavers), the eighth rest followed by an eighth note, and quarter rests, in <strong>2/4, 3/4 or 4/4</strong>. The cards include an <strong>eighth rest</strong> and a <strong>single eighth note</strong> and a <strong>single sixteenth note</strong>: for the off-beat, place the rest first and then the note; for a group, place two eighth notes or four sixteenth notes in a row and a beam joins them. You place the bar lines and the final double bar line yourself.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "escribir", grupo: "semicorcheas-sc" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. As soon as the sound begins the cards are active: each one is written right after the previous one. <strong>You place the bar lines</strong>: the <em>bar line</em> when you finish the first measure and the <em>final double bar line</em> at the end. Nothing stops you from putting more beats in a measure than fit, or fewer: you have to count them yourself, as in a classroom dictation. <em>Undo</em> removes the last card and <em>Clear all</em> starts over. When the double bar line is in place, press <em>Check</em>. You can listen up to three times and write while it plays.</p>

<h2>How to take a rhythm dictation with sixteenth notes and the eighth rest</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before the dictation, one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count along ("1, 2…") and keep counting silently through the whole dictation, even when nothing sounds.</li>
  <li><strong>Find the time signature and count its beats.</strong> Count them from the metronome measure. Begin again at 1 in each measure, even if the first beat is silent.</li>
  <li><strong>Listen to where each note falls inside the beat.</strong> A note that starts with the pulse and lasts the whole beat is a quarter note. Two notes that share the beat in halves are two eighth notes; four notes are four sixteenth notes. A single note that arrives halfway through the beat, between two pulses, is an eighth rest plus an eighth note. If the note keeps sounding on the next beats it is a longer value, and if nothing sounds it is a rest.</li>
  <li><strong>Split your listenings.</strong> Both measures play on every listen, but you do not need to catch everything at once: in the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<p>The most common mistake is <strong>hearing the off-beat eighth note as if it fell on the beat</strong>: without the pulse inside you, a single note in a beat sounds like a quarter note. Tap your foot and say "(rest)-ti" for the eighth rest and eighth note, "ti-ti" for two eighth notes and "ta" for a quarter note. If the note lands as the foot goes down, it is a quarter note; if it lands as the foot comes up, it is the eighth note after its rest.</p>

<h2>What the dictations are like</h2>

<p>Every dictation is generated on the spot: <strong>two measures of 2/4, 3/4 or 4/4</strong> using <a href="/diccionario-musical/figuras-musicales/">quarter notes, eighth notes, sixteenth notes, the eighth rest plus eighth note, and quarter rests</a>, all on G4 played by a piano at 60 to 72 quarter notes per minute, a little slower because of the sixteenth notes. The <strong>eighth rest plus eighth note</strong> always fills exactly one beat: the beat starts silent and the note enters in its second half, off the beat. The other eighth notes come in pairs and the <strong>sixteenth notes in fours</strong>, each filling one beat. Every dictation has at least <strong>one eighth rest plus eighth note</strong> and some group of four sixteenth notes. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat. A dictation can start with a rest, but it never has more than two beats of rest in a row or a completely silent measure.</p>

<p>Every note sounds for nearly its full length, so the eighth note after its rest is heard as a short note that enters halfway through the beat, between two pulses. Each test has 10 dictations: 3 in 2/4, 4 in 3/4 and 3 in 4/4, none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How is the dictation checked?</div><div class="tm-faq-a">It counts as correct only if everything is right: the note values, the bar line and the beats in each measure. If you miss, you are told which measure has too many or too few beats and, when the total length is right, whatever sounds different appears in red in what you wrote. Below it you see the rhythm that played, so you can hear it again while you read it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why do I have to place the bar lines myself?</div><div class="tm-faq-a">Because in a written dictation you add them yourself, and it is how you prove that you counted each measure correctly. If a measure has too many or too few beats, the check tells you how many it has and how many fit, and it also tells you if a bar line is missing. Without the final double bar line nothing is checked: it is the sign that you are done.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I write an eighth rest followed by an eighth note?</div><div class="tm-faq-a">With two cards, at the start of the beat: first the eighth rest, then the eighth note. The eighth note stays single, with its flag, because a rest cannot be beamed. If you put them the other way around (eighth note, then rest), the note would sound on the beat and, when you check, that beat will not match the dictation.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How is the metronome measure at the start used?</div><div class="tm-faq-a">It tells you the speed and where the measure begins: before each audio, a click plays on every beat, louder on the first, at the same tempo as the dictation. Count along with it and keep counting silently while the rhythm plays, rests included.</div></div>
</div>

<p>If you find it hard, start with <a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea-que-ritmo-suena/">Which rhythm is playing?</a> or with <a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea-que-audio-es/">Which audio is it?</a>. The next group is <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea/">half notes and the eighth rest</a>. All the groups are in the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythm dictation index</a>.</p>
`,
});
