const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/dotted-half-notes-and-sixteenths-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas-que-ritmo-suena/',
  title: "Which Rhythm Plays? Dotted Half Notes & Sixteenths Dictation",
  description: "Free rhythmic dictation with dotted half notes, eighths and sixteenths: hear two measures in 3/4 or 4/4 and pick the matching one of four written rhythms.",
  h1: "Which Rhythm Is Playing? Dictation with Dotted Half Notes and Sixteenth Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>3/4 or 4/4</strong>, played on the note G, and choose which of the <strong>four written rhythms</strong> you heard. The beat is now divided into four: <strong>groups of four sixteenth notes</strong> appear next to the pairs of eighths. The rhythms use dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), groups of eighth notes (UK: quavers) and of sixteenth notes (UK: semiquavers) and their rests. The key is to count how many notes fall in each beat.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "puntillo-s" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em> and then <em>Listen</em>. You can already choose a rhythm (A, B, C or D) while it plays. When you answer, the right one turns green and, if you were wrong, you see on which beats your choice differs. The four rhythms look very much alike: the wrong ones change one or two beats, for example four sixteenths in place of two eighths. You can listen up to three times.</p>

<h2>How to Pick the Right Rhythm with Dotted Half Notes and Sixteenth Notes</h2>

<ol>
  <li><strong>Settle the pulse first.</strong> Sixteenth notes are fast, so take the count-in measure seriously: feel the beats ("1, 2, 3, 4") and keep tapping your foot. Everything you hear is placed against that steady beat.</li>
  <li><strong>Identify the meter and count its beats.</strong> The time signature, 3/4 or 4/4, is announced before you listen: count its beats from the count-in measure and start again at 1 in every measure, even if the first beat is silent.</li>
  <li><strong>Count the notes in each beat.</strong> One note is a quarter note, two are eighth notes and four are sixteenth notes. If a note keeps sounding into the following beats, it is a longer value, and if nothing sounds, it is a rest.</li>
  <li><strong>Use your three listens.</strong> Both measures play each time. Take the pulse and measure 1 on the first listen, measure 2 on the second, and on the third compare the whole rhythm with the four written options. You can answer while it plays.</li>
</ol>

<p>The usual mistakes are <strong>mixing up eighth notes and sixteenth notes</strong> and rushing through the sixteenths, so that the next beat seems to arrive early. Four sixteenth notes last as long as two eighth notes or one quarter note. Say "ti-ri-ti-ri" for sixteenths, "ti-ti" for eighths and "ta" for a quarter note while you tap the beat, and every syllable lands where it should.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 3/4 or 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">dotted half notes, half notes, quarter notes, groups of eighth notes and of sixteenth notes and their rests</a>, all on the note G on the piano at a tempo between 60 and 72 quarter notes per minute, a little slower because of the sixteenth notes. <strong>Sixteenth notes always come in fours</strong>, joined by a double beam and filling one beat, and <strong>eighth notes in pairs</strong>: there is never a loose one. Every dictation has at least <strong>one group of four sixteenth notes</strong> and a dotted half note or its rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. Up to three beats of rest can follow one another, the length of a dotted half rest. A dotted half note lasts three beats and does not fit in a measure of 2/4, so there are no dictations in 2/4.</p>

<p>Each note sounds for almost its full value, so four sixteenth notes are heard as four very short notes splitting the beat into four equal parts, twice as fast as eighth notes. Each test has 10 dictations: 5 in 3/4 and 5 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell four sixteenth notes from two eighth notes?</div><div class="tm-faq-a">Count the notes in the beat: two notes are eighth notes, four notes are sixteenth notes, which are twice as fast. Both fill exactly one beat, so the pulse stays the same and only the number of notes changes.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can there be a single eighth or sixteenth note?</div><div class="tm-faq-a">Not in these dictations: sixteenth notes always come in fours and eighth notes in pairs, each group filling one beat. There are no loose notes.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there no dictations in 2/4?</div><div class="tm-faq-a">Because a dotted half note lasts three beats and does not fit in a measure of two beats. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you can answer while it plays. After you answer you can listen again as often as you like.</div></div>
</div>

<p>When you get it right almost every time, try <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas/">writing the dictation</a>. If it is too much, go back to the group before it, <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas-que-ritmo-suena/">dotted half notes and eighth notes</a>.</p>
`,
});
