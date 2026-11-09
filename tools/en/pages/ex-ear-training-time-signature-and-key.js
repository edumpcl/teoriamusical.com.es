const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/time-signature-and-key/',
  esPath: '/ejercicios/auditivos/compas-y-tonalidad/',
  title: 'Time Signature and Key by Ear: Ear Training Test',
  description: 'Free ear training like a conservatory entrance exam: an A4 and a piano melody play, and you name its time signature and its key. Three levels.',
  h1: 'Recognize the Time Signature and Key by Ear',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'auditivo-compas-engine', 'auditivo-tonalidad-engine'],
  body: `<p>Listen to the reference <strong>A4</strong> and then a piano melody, and say which <a href="/diccionario-musical/compases/">time signature</a> and which <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key</a> it is in. It combines the <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature</a> and <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key</a> exercises, and it is the kind of question found in the <strong>entrance exam for professional-level conservatories in Spain</strong>: it only counts as correct if both the time signature and the key are right. All six time signatures appear at every level; what changes is the key: <strong>easy</strong> (up to 2 accidentals), <strong>medium</strong> (up to 4) and <strong>hard</strong> (all).</p>

<div id="tmaud_comp_ton"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAudTonalidadEngine("tmaud_comp_ton", { compas: true });
  });
</script>

<p><strong>How to use the exercise:</strong> choose the level and press <em>Listen</em>. As soon as it starts playing you can choose the time signature and, with the builder, the note, the accidental and the mode of the key, in any order; when you have everything, press <em>Check</em>. The feedback says separately whether the time signature and the key were right, and then you see the melody written out. There are 10 melodies per test: 5 major and 5 minor, with the six time signatures spread across them.</p>

<h2>How to recognize the time signature and the key</h2>

<p>It is best to do it in parts, making the most of each listen:</p>
<ol>
  <li><strong>The beats.</strong> The first beat of each measure (UK: bar) sounds louder: count the beats from one accent to the next. If there are 2, 3 or 4, you know how many beats the measure has.</li>
  <li><strong>Simple or compound.</strong> Listen to how each beat divides: into two eighth notes it is a simple meter (2/4, 3/4, 4/4); into three, compound (6/8, 9/8, 12/8). Watch out for 3/4 and 6/8: they last the same, but 3/4 has three beats of two eighth notes and 6/8 has two beats of three.</li>
  <li><strong>The mode.</strong> Notice the 3rd above the tonic, which you hear in the opening arpeggio: major (two whole steps, like C–E) or minor (a whole step and a half step, like A–C). This is what you practice in <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a></li>
  <li><strong>The tonic.</strong> It is the note where the melody rests, which it reaches from the leading tone at the end. Compare it with the reference A4 to name it, and think of its key signature: a key and its relative have the same one, but a different tonic.</li>
</ol>

<p>The most common mistakes are mixing up 3/4 and 6/8, which last the same but group the eighth notes differently; not telling a simple meter from its compound counterpart with the same number of beats (2/4 and 6/8, 3/4 and 9/8, 4/4 and 12/8), which differ in how the beat divides, in two or in three; and answering the relative key. If this happens often, first practice each part separately.</p>

<h2>What the melodies are like</h2>

<p>Each melody is made up on the spot and has <strong>8 measures</strong>. The rhythm comes from the <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature</a> exercise: the first beat of each measure accented, the subdivision of the beat clearly marked, sixteenth notes in at least two measures and, in 3/4 and 6/8, rhythms that make the grouping clear: written in the other time signature, they would all sound syncopated. The melody follows the rules of the key exercise: it starts with the tonic arpeggio, the first phrase ends on the dominant, the second ends with the leading tone rising to the tonic, and the minor ones use the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a>. An automatic analysis of the notes checks that the intended key is, clearly, the one you hear.</p>

<p>The tonics are between A3 and G♯4, in the middle of the treble clef, and the tempo changes a little from one melody to the next: the point is not to guess from how high or how fast it is, but to hear the time signature and compare the tonic with the A4.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">In what order should I recognize the time signature and the key?</div><div class="tm-faq-a">The time signature first, because you hear it from the first measure: count the beats from one accent to the next and listen to whether each beat divides in two or in three. Then the key: the mode by the 3rd above the tonic, and the tonic by comparing it with the reference A. In the exercise you can choose your answers while the melody plays, in any order.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does it only count if both are right?</div><div class="tm-faq-a">Because that is what a dictation or a listening test asks for: the time signature and the key together. When it is checked, you are told separately what was right and what was not, so you know what to practice.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which time signatures and keys appear?</div><div class="tm-faq-a">All six time signatures (2/4, 3/4, 4/4, 6/8, 9/8 and 12/8) at every level, evenly spread in each test: each one appears once or twice in the 10 melodies. What changes with the level is the key: at the easy level, up to 2 accidentals; at the medium level, up to 4; and at the hard level, all of them. Always 5 major and 5 minor melodies.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Are enharmonic keys accepted?</div><div class="tm-faq-a">Yes. C♯ major and D♭ major, or G♯ minor and A♭ minor, sound the same, so either one is accepted. If you write a key that is not used in practice, such as G♯ major, it is also accepted, but you are shown how it is written.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Is it like the dictation in the entrance exam?</div><div class="tm-faq-a">It is part of it. In the entrance exam for professional-level music studies in Spain, in the music language (solfège) test, candidates are usually asked, depending on the call, to recognize by ear the time signature, the mode and the key of a melody, as well as to write it down. This exercise trains that first part, with new melodies every time.</div></div>
</div>

<p>To practice each part separately: the time signature in <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature by ear</a>, the mode in <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a> and the key in <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>. And to review the theory, see <a href="/diccionario-musical/compases/">time signatures</a> and <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a>.</p>
`,
});
