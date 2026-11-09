const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/whole-notes-and-eighths-which-rhythm/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-ritmo-suena/',
  title: "Which Rhythm Is Playing? Whole & Eighth Notes Dictation",
  description: "Free rhythmic dictation with whole notes and eighth-note pairs: hear two measures in 4/4 and pick the matching one of four written rhythms.",
  h1: "Which Rhythm Is Playing? Dictation with Whole Notes and Eighth Notes",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', '/ejercicios/auditivos/dictado-ritmico/']],
  scripts: ["tm-mei","tm-notacion","tm-piano-audio","auditivo-modo-engine","dictado-ritmico-engine"],
  body: `<p>Listen to a rhythm of <strong>two measures</strong> (UK: bars) in <strong>4/4</strong>, played on the note G, and choose which of the <strong>four written rhythms</strong> you heard. The beat is now divided: there are <strong>pairs of eighth notes</strong>, which split one beat into two equal halves. The rhythms use whole notes (UK: semibreves), dotted half notes (UK: dotted minims), half notes (UK: minims), quarter notes (UK: crotchets), groups of two eighth notes (UK: quavers) and their rests. The key is to count how many notes fall in each beat.</p>

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "oir", grupo: "redondas-c" });
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Start</em>, then <em>Listen</em>, and pick rhythm A, B, C or D, even while the audio is still playing. The correct rhythm is marked in green; if you missed, the beats where your choice differs are shown. Expect near-identical options that differ by one or two beats, for example two eighth notes in place of a quarter note. Up to three listens.</p>

<h2>How to Pick the Right Rhythm with Whole Notes and Eighth Notes</h2>

<ol>
  <li><strong>Use the count-in measure.</strong> It tells you the tempo and where the strong beat falls. Say the beats with it, then keep the pulse going in your head (or tap your foot) through the whole dictation.</li>
  <li><strong>Know the meter and count its beats.</strong> Every measure has four beats ("1, 2, 3, 4"). Start again at 1 in every measure, even if beat 1 is silent.</li>
  <li><strong>Listen inside each beat.</strong> One note that fills the whole beat is a quarter note; two notes that share it equally are two eighth notes. If a note keeps sounding into the following beats, it is a longer value, and if nothing sounds, it is a rest.</li>
  <li><strong>Use your three listens.</strong> Both measures play each time. Take the pulse and measure 1 on the first listen, measure 2 on the second, and on the third compare the whole rhythm with the four written options. You can answer while it plays.</li>
</ol>

<p>With eighth notes the usual mistake is <strong>rushing</strong>: two eighth notes followed by a quarter note can make the quarter note feel short. Two eighth notes last exactly as long as one quarter note. Say "ti-ti" for the eighths and "ta" for the quarter while you tap the beat, and the difference becomes clear.</p>

<h2>What the Dictations Are Like</h2>

<p>Each dictation is generated on the spot: <strong>two measures in 4/4</strong> with <a href="/diccionario-musical/figuras-musicales/">whole notes, dotted half notes, half notes, quarter notes, groups of two eighth notes and their rests</a>, all on the note G on the piano at a tempo between 72 and 90 quarter notes per minute. Eighth notes always come <strong>in pairs</strong>, joined by a beam and filling one beat: in this group there is never a single eighth note, or three (a lone eighth note appears only in the groups with an eighth rest). Every dictation has at least <strong>one pair of eighth notes</strong> and a whole note or a whole rest. A <strong>measure of metronome clicks</strong> plays first at the same tempo, with a stronger first beat, so you know the speed and where the measure starts. A dictation can begin with a rest. The whole note and the whole rest fill a 4/4 measure (the rest only as the second measure), and up to four beats of rest can follow one another.</p>

<p>Each note sounds for almost its full value, so two eighth notes are heard as two short notes splitting the beat into equal halves. Each test has 10 dictations: 10 in 4/4, with none repeated.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell two eighth notes from a quarter note?</div><div class="tm-faq-a">By the number of notes in the beat: a quarter note is one note that lasts the whole beat, and two eighth notes are two notes that split it into equal halves. Both fill exactly one beat.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Can there be a single eighth note?</div><div class="tm-faq-a">Not in these dictations: eighth notes always come in pairs, joined by a beam and filling one beat. There is never a single one, or three.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why are there only 4/4 dictations?</div><div class="tm-faq-a">Because a whole note lasts four beats and does not fit in a measure of 2/4 or 3/4. It could be split across two measures with a tie, but these dictations contain no ties.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to the dictation?</div><div class="tm-faq-a">Up to three times, and you can answer while it plays. After you answer you can listen again as often as you like.</div></div>
</div>

<p>When you get it right almost every time, try <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas/">writing the dictation</a>. If it is too much, go back to the group before it, <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-ritmo-suena/">whole notes</a>.</p>
`,
});
