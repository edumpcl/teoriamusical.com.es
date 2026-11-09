const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-que-ritmo-suena/',
  title: "Which Rhythm Is Playing? Whole Notes Dictation",
  description: "Free rhythmic dictation with whole notes, dotted half notes and rests: hear two measures in 4/4 and pick the matching one of four written rhythms.",
  h1: "Which Rhythm Is Playing? Dictation with Whole Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and choose which of the <strong>four written rhythms</strong> you heard. Now the longest note value appears: the <strong>whole note</strong>, which fills the whole measure, together with its rest. The rhythms use whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets) and their rests. The key is to count all four beats while it plays.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "redondas" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. You can already choose a rhythm (A, B, C or D) while it plays. When you answer, the right one turns green and, if you were wrong, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats, for example a whole note in place of a dotted half note and a rest. You can listen up to three times.</p>

<h2>How to Pick the Right Rhythm with Whole Notes</h2>

<ol>
  <li><strong>Count with the metronome.</strong> One measure of metronome clicks plays first, at the dictation's tempo and with a stronger first beat. Count along ("1, 2…") and keep counting silently until the end, including the moments when nothing sounds.</li>
  <li><strong>Count the four beats of each measure.</strong> "1, 2, 3, 4" and start again. A whole note begins on 1 and is still sounding on 4.</li>
  <li><strong>Measure each note against the beats.</strong> A quarter note lasts one beat, a half note two, a dotted half note three and a whole note four. A whole note differs from a dotted half note in that it is still sounding on beat 4.</li>
  <li><strong>Use your three listens.</strong> Both measures play each time. Take the pulse and measure 1 on the first listen, measure 2 on the second, and on the third compare the whole rhythm with the four written options. You can answer while it plays.</li>
</ol>

<p>The hardest part is keeping the pulse during a long note or a whole measure of rest: if your inner pulse speeds up, the note seems shorter. Keep counting all four beats to the end, even when nothing happens.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> (a whole note lasts four beats and does not fit in 2/4 or 3/4) with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. There is always <strong>a whole note or a whole rest</strong>, and either one fills a measure. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. A whole rest can only be the second measure, because the first measure is never entirely silent. Up to four beats of rest can follow one another.</p>

<p>In the written rhythms, consecutive rests that fit into one are shown together; when you write the dictation, any combination that adds up to the same length is accepted, because it sounds the same. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell a whole note from a dotted half note?</div><div class="tm-faq-a">By how long it lasts: a whole note sounds for all four beats of the measure, a dotted half note for three. If the note stops before beat 4, it is not a whole note.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you can answer while it plays. After you answer you can listen again as often as you like.</div></div>
</div>

<p>Once you get most of them right, try <a href="/ejercicios/auditivos/dictado-ritmico/redondas/">writing the dictation with whole notes</a>. If counting the durations is hard, go back to <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-ritmo-suena/">dotted half notes</a>.</p>
`,
});
